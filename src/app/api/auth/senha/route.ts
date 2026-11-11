import { NextResponse, type NextRequest } from "next/server";
import { findRegisteredStudent, findRegisteredTeacher, nameFromEmail } from "@/lib/access";
import { getPasswordHash } from "@/lib/db";
import { validateEmail } from "@/lib/email";
import {
  isAppPasswordConfigured,
  verifyAppPassword,
  verifyPasswordHash,
} from "@/lib/password";
import { clientIp, enforceLoginRateLimit, resetRateLimit } from "@/lib/rate-limit";
import { noStoreHeaders, requireSameOrigin } from "@/lib/security";
import { createSessionToken, sessionCookie } from "@/lib/session";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const invalidRequest = requireSameOrigin(request);
  if (invalidRequest) return invalidRequest;

  const body = (await request.json().catch(() => null)) as
    | { email?: unknown; password?: unknown; role?: unknown }
    | null;

  const role = body?.role === "professor" ? "professor" : "aluno";
  const rawEmail = typeof body?.email === "string" ? body.email : "";
  const password = typeof body?.password === "string" ? body.password : "";

  const result = validateEmail(rawEmail);
  if (!result.ok) {
    return NextResponse.json(
      {
        error:
          result.reason === "formato"
            ? "Digite um e-mail válido."
            : "Use um e-mail de um domínio permitido (ex.: @escola.pr.gov.br).",
      },
      { status: 400, headers: noStoreHeaders() },
    );
  }

  if (!password) {
    return NextResponse.json(
      { error: "Digite a sua senha de acesso." },
      { status: 400, headers: noStoreHeaders() },
    );
  }

  const limit = enforceLoginRateLimit(request, "senha", result.email);
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

  // Senha individual cadastrada pela coordenação tem prioridade.
  // Sem ela, a senha mestra do servidor serve apenas como bootstrap de
  // professor; alunos precisam da senha individual.
  let storedHash: string | null = null;
  try {
    storedHash = await getPasswordHash(result.email);
  } catch {
    return NextResponse.json(
      { error: "Não foi possível verificar a senha agora. Tente novamente." },
      { status: 503, headers: noStoreHeaders() },
    );
  }

  let authenticated = false;

  if (storedHash) {
    authenticated = verifyPasswordHash(password, storedHash);
  } else if (role === "professor") {
    if (isAppPasswordConfigured() || process.env.NODE_ENV !== "production") {
      authenticated = verifyAppPassword(password);
    } else {
      return NextResponse.json(
        {
          error:
            "A senha de acesso ainda não foi configurada pela coordenação. Use o login com Google ou peça a configuração.",
        },
        { status: 503, headers: noStoreHeaders() },
      );
    }
  }

  if (!authenticated) {
    return NextResponse.json(
      {
        error:
          "E-mail ou senha de acesso incorretos. Se ainda não tem senha, fale com a coordenação.",
      },
      { status: 401, headers: noStoreHeaders() },
    );
  }

  let name: string;
  if (role === "professor") {
    const teacher = findRegisteredTeacher(result.email);
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
    if (!findRegisteredStudent(result.email)) {
      return NextResponse.json(
        { error: "Este e-mail não está cadastrado como aluno. Fale com a coordenação." },
        { status: 403, headers: noStoreHeaders() },
      );
    }
    name = nameFromEmail(result.email);
  }
  resetRateLimit(`senha:ip:${clientIp(request)}`);
  resetRateLimit(`senha:email:${result.email}`);

  const user = { email: result.email, name, role } as const;
  const token = createSessionToken(user);

  return NextResponse.json(
    { email: user.email, name: user.name, role: user.role },
    {
      headers: {
        ...noStoreHeaders(),
        "Set-Cookie": sessionCookie(token),
      },
    },
  );
}
