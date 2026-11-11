/**
 * Gerenciamento das senhas individuais (somente professores).
 *
 * - GET    → lista os usuários cadastrados e se cada um já tem senha.
 * - POST   → define ou troca a senha de um usuário.
 * - DELETE → remove a senha (o usuário deixa de entrar por senha).
 *
 * O hash scrypt nunca é devolvido para o navegador.
 */
import { NextResponse, type NextRequest } from "next/server";
import { listRegisteredUsers } from "@/lib/access";
import {
  deletePasswordHash,
  getPasswordHash,
  listPasswordRecords,
  setPasswordHash,
} from "@/lib/db";
import { hashPassword } from "@/lib/password";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { noStoreHeaders, requireSameOrigin } from "@/lib/security";
import { getUserFromRequest } from "@/lib/session";

export const runtime = "nodejs";

const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 200;

function professorOnly(request: NextRequest) {
  const user = getUserFromRequest(request);
  if (!user) {
    return {
      response: NextResponse.json(
        { ok: false, error: "Faça login para gerenciar as senhas." },
        { status: 401, headers: noStoreHeaders() },
      ),
    };
  }
  if (user.role !== "professor") {
    return {
      response: NextResponse.json(
        { ok: false, error: "Apenas professores podem gerenciar as senhas." },
        { status: 403, headers: noStoreHeaders() },
      ),
    };
  }
  return { user };
}

function checkRateLimit(request: NextRequest) {
  const limit = rateLimit(`senhas:ip:${clientIp(request)}`, 40, 10 * 60 * 1000);
  if (limit.allowed) return null;
  return NextResponse.json(
    { ok: false, error: "Muitas alterações em pouco tempo. Aguarde alguns minutos." },
    {
      status: 429,
      headers: { ...noStoreHeaders(), "Retry-After": String(limit.retryAfter) },
    },
  );
}

export async function GET(request: NextRequest) {
  const access = professorOnly(request);
  if (access.response) return access.response;

  try {
    const users = listRegisteredUsers();
    const records = await listPasswordRecords();
    const withPassword = new Map(records.map((record) => [record.email, record.updatedAt]));

    return NextResponse.json(
      {
        ok: true,
        users: users.map((user) => ({
          email: user.email,
          name: user.name,
          role: user.role,
          hasPassword: withPassword.has(user.email),
          updatedAt: withPassword.get(user.email) ?? null,
        })),
      },
      { headers: noStoreHeaders() },
    );
  } catch {
    return NextResponse.json(
      { ok: false, error: "Não foi possível carregar as senhas agora." },
      { status: 503, headers: noStoreHeaders() },
    );
  }
}

export async function POST(request: NextRequest) {
  const invalidRequest = requireSameOrigin(request);
  if (invalidRequest) return invalidRequest;

  const access = professorOnly(request);
  if (access.response) return access.response;

  const limited = checkRateLimit(request);
  if (limited) return limited;

  const body = (await request.json().catch(() => null)) as
    | { email?: unknown; password?: unknown }
    | null;

  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body?.password === "string" ? body.password : "";

  const registered = listRegisteredUsers().find((user) => user.email === email);
  if (!registered) {
    return NextResponse.json(
      { ok: false, error: "Este e-mail não está cadastrado na escola." },
      { status: 404, headers: noStoreHeaders() },
    );
  }

  if (password.length < MIN_PASSWORD_LENGTH) {
    return NextResponse.json(
      {
        ok: false,
        error: `A senha precisa ter pelo menos ${MIN_PASSWORD_LENGTH} caracteres.`,
      },
      { status: 400, headers: noStoreHeaders() },
    );
  }

  if (password.length > MAX_PASSWORD_LENGTH) {
    return NextResponse.json(
      { ok: false, error: "A senha é muito longa." },
      { status: 400, headers: noStoreHeaders() },
    );
  }

  try {
    await setPasswordHash(email, hashPassword(password));
    return NextResponse.json(
      { ok: true, email, name: registered.name },
      { headers: noStoreHeaders() },
    );
  } catch {
    return NextResponse.json(
      { ok: false, error: "Não foi possível salvar a senha agora." },
      { status: 503, headers: noStoreHeaders() },
    );
  }
}

export async function DELETE(request: NextRequest) {
  const invalidRequest = requireSameOrigin(request);
  if (invalidRequest) return invalidRequest;

  const access = professorOnly(request);
  if (access.response) return access.response;

  const limited = checkRateLimit(request);
  if (limited) return limited;

  const body = (await request.json().catch(() => null)) as
    | { email?: unknown }
    | null;

  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!email || !listRegisteredUsers().some((user) => user.email === email)) {
    return NextResponse.json(
      { ok: false, error: "Usuário não encontrado." },
      { status: 404, headers: noStoreHeaders() },
    );
  }

  try {
    await deletePasswordHash(email);
    const stillThere = await getPasswordHash(email);
    return NextResponse.json(
      { ok: true, email, removed: !stillThere },
      { headers: noStoreHeaders() },
    );
  } catch {
    return NextResponse.json(
      { ok: false, error: "Não foi possível remover a senha agora." },
      { status: 503, headers: noStoreHeaders() },
    );
  }
}
