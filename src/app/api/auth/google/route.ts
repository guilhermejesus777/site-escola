import { NextResponse } from "next/server";
import { findRegisteredStudent, findRegisteredTeacher } from "@/lib/access";
import { GOOGLE_CLIENT_ID } from "@/lib/google";

type GoogleTokenInfo = {
  aud?: string;
  email?: string;
  email_verified?: boolean | string;
  name?: string;
};

/**
 * Valida o ID token do Google no servidor e libera o acesso apenas para
 * e-mails cadastrados. A senha do aluno é digitada no próprio Google;
 * este app nunca recebe nem armazena a senha.
 */
export async function POST(request: Request) {
  const clientId = GOOGLE_CLIENT_ID;
  if (!clientId) {
    return NextResponse.json(
      { error: "O login com Google ainda não foi configurado pela escola." },
      { status: 503 },
    );
  }

  const body = (await request.json().catch(() => null)) as
    | { credential?: unknown; role?: unknown }
    | null;

  const credential = body?.credential;
  const role = body?.role === "professor" ? "professor" : "aluno";

  if (typeof credential !== "string" || credential.length === 0) {
    return NextResponse.json({ error: "Credencial do Google ausente." }, { status: 400 });
  }

  const tokenResponse = await fetch(
    `https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(credential)}`,
    { cache: "no-store" },
  );

  if (!tokenResponse.ok) {
    return NextResponse.json(
      { error: "Não foi possível validar sua conta Google. Tente novamente." },
      { status: 401 },
    );
  }

  const token = (await tokenResponse.json()) as GoogleTokenInfo;

  if (token.aud !== clientId) {
    return NextResponse.json(
      { error: "Esta credencial não pertence a este aplicativo." },
      { status: 401 },
    );
  }

  const email = String(token.email ?? "").trim().toLowerCase();
  const verified = token.email_verified === true || token.email_verified === "true";

  if (!email || !verified) {
    return NextResponse.json(
      { error: "Confirme seu e-mail na conta Google antes de entrar." },
      { status: 403 },
    );
  }

  const name = typeof token.name === "string" ? token.name : undefined;

  if (role === "professor") {
    const teacher = findRegisteredTeacher(email);
    if (!teacher) {
      return NextResponse.json(
        { error: "Este e-mail não está cadastrado como professor. Fale com a coordenação." },
        { status: 403 },
      );
    }
    return NextResponse.json({ email, name: teacher.name, role });
  }

  const student = findRegisteredStudent(email);
  if (!student) {
    return NextResponse.json(
      { error: "Este e-mail não está cadastrado como aluno. Fale com a coordenação." },
      { status: 403 },
    );
  }

  return NextResponse.json({ email, name, role });
}
