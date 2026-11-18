import { NextResponse, type NextRequest } from "next/server";
import { GOOGLE_CLIENT_ID } from "@/lib/google";
import { enforceLoginRateLimit } from "@/lib/rate-limit";
import { noStoreHeaders, requireSameOrigin } from "@/lib/security";
import { createSessionToken, sessionCookie } from "@/lib/session";
import { canUseRole, findAppUser } from "@/lib/users";

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

  let account: Awaited<ReturnType<typeof findAppUser>>;
  try {
    account = await findAppUser(email);
  } catch {
    return NextResponse.json(
      { error: "Não foi possível consultar o cadastro agora. Tente novamente." },
      { status: 503, headers: noStoreHeaders() },
    );
  }

  if (!account) {
    return NextResponse.json(
      {
        error:
          "Este e-mail ainda não está cadastrado. Peça o cadastro à coordenação ou envie uma solicitação de acesso.",
        code: "nao_cadastrado",
        email,
      },
      { status: 403, headers: noStoreHeaders() },
    );
  }

  if (!canUseRole(account, role)) {
    return NextResponse.json(
      {
        error: `Este e-mail está cadastrado como ${account.role === "professor" ? "professor" : "aluno"}. Escolha o perfil correto para entrar.`,
      },
      { status: 403, headers: noStoreHeaders() },
    );
  }

  const name =
    account.role === "professor"
      ? account.name
      : typeof token.name === "string" && token.name.trim()
        ? token.name.trim()
        : account.name;

  const user = { email: account.email, name, role, admin: account.admin } as const;
  const tokenValue = createSessionToken(user);

  return NextResponse.json(
    {
      email: user.email,
      name: user.name,
      role: user.role,
      admin: user.admin,
    },
    {
      headers: {
        ...noStoreHeaders(),
        "Set-Cookie": sessionCookie(tokenValue),
      },
    },
  );
}
