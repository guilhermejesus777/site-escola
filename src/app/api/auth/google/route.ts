import { NextResponse, type NextRequest } from "next/server";
import { findRegisteredStudent, findRegisteredTeacher } from "@/lib/access";
import { GOOGLE_CLIENT_ID } from "@/lib/google";
import { enforceLoginRateLimit } from "@/lib/rate-limit";
import { noStoreHeaders, requireSameOrigin } from "@/lib/security";
import { createSessionToken, sessionCookie } from "@/lib/session";

export const runtime = "nodejs";

type GoogleTokenInfo = {
  aud?: string;
  iss?: string;
  email?: string;
  email_verified?: boolean | string;
  name?: string;
  exp?: string | number;
};

/**
 * Valida o ID token do Google no servidor e libera o acesso apenas para
 * e-mails cadastrados. A senha da conta Google é digitada no próprio Google;
 * este app nunca recebe nem armazena a senha.
 */
export async function POST(request: NextRequest) {
  const invalidRequest = requireSameOrigin(request);
  if (invalidRequest) return invalidRequest;

  const clientId = GOOGLE_CLIENT_ID;
  if (!clientId) {
    return NextResponse.json(
      { error: "O login com Google ainda não foi configurado pela escola." },
      { status: 503, headers: noStoreHeaders() },
    );
  }

  const body = (await request.json().catch(() => null)) as
    | { credential?: unknown; role?: unknown }
    | null;

  const credential = body?.credential;
  const role = body?.role === "professor" ? "professor" : "aluno";

  if (typeof credential !== "string" || credential.length === 0 || credential.length > 5000) {
    return NextResponse.json(
      { error: "Credencial do Google ausente." },
      { status: 400, headers: noStoreHeaders() },
    );
  }

  const limit = enforceLoginRateLimit(request, "google");
  if (!limit.allowed) {
    return NextResponse.json(
      {
        error:
          "Muitas tentativas de login. Aguarde alguns minutos antes de tentar novamente.",
      },
      {
        status: 429,
        headers: { ...noStoreHeaders(), "Retry-After": String(limit.retryAfter) },
      },
    );
  }

  const tokenResponse = await fetch(
    `https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(credential)}`,
    { cache: "no-store" },
  );

  if (!tokenResponse.ok) {
    return NextResponse.json(
      { error: "Não foi possível validar sua conta Google. Tente novamente." },
      { status: 401, headers: noStoreHeaders() },
    );
  }

  const token = (await tokenResponse.json()) as GoogleTokenInfo;

  const issuer = token.iss;
  const validIssuer =
    issuer === "accounts.google.com" || issuer === "https://accounts.google.com";

  if (token.aud !== clientId || !validIssuer) {
    return NextResponse.json(
      { error: "Esta credencial não pertence a este aplicativo." },
      { status: 401, headers: noStoreHeaders() },
    );
  }

  const email = String(token.email ?? "").trim().toLowerCase();
  const verified = token.email_verified === true || token.email_verified === "true";

  if (!email || !verified) {
    return NextResponse.json(
      { error: "Confirme seu e-mail na conta Google antes de entrar." },
      { status: 403, headers: noStoreHeaders() },
    );
  }

  let name: string;
  if (role === "professor") {
    const teacher = findRegisteredTeacher(email);
    if (!teacher) {
      return NextResponse.json(
        {
          error:
            "Este e-mail não está cadastrado como professor. Fale com a coordenação.",
        },
        { status: 403, headers: noStoreHeaders() },
      );
    }
    name = teacher.name;
  } else {
    const student = findRegisteredStudent(email);
    if (!student) {
      return NextResponse.json(
        { error: "Este e-mail não está cadastrado como aluno. Fale com a coordenação." },
        { status: 403, headers: noStoreHeaders() },
      );
    }
    name = typeof token.name === "string" && token.name.trim() ? token.name.trim() : email;
  }

  const user = { email, name, role } as const;
  const tokenValue = createSessionToken(user);

  return NextResponse.json(
    { email: user.email, name: user.name, role: user.role },
    {
      headers: {
        ...noStoreHeaders(),
        "Set-Cookie": sessionCookie(tokenValue),
      },
    },
  );
}
