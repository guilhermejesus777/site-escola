/**
 * Senha do próprio usuário (ativação de primeiro acesso).
 *
 * - GET  → informa se o usuário logado já tem senha individual.
 * - POST → cria a senha, somente se ainda não existir.
 *
 * O usuário chega aqui depois de entrar com o Google, que confirma que ele é
 * dono do e-mail. A senha existente nunca é sobrescrita por esta rota; para
 * redefinir, a coordenação usa o painel de senhas.
 */
import { NextResponse, type NextRequest } from "next/server";
import { createPasswordHashIfMissing, getPasswordHash } from "@/lib/db";
import { hashPassword } from "@/lib/password";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { noStoreHeaders, requireSameOrigin } from "@/lib/security";
import { getUserFromRequest } from "@/lib/session";

export const runtime = "nodejs";

const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 200;

export async function GET(request: NextRequest) {
  const user = getUserFromRequest(request);
  if (!user) {
    return NextResponse.json(
      { ok: false, error: "Faça login para consultar a sua senha." },
      { status: 401, headers: noStoreHeaders() },
    );
  }

  try {
    const hash = await getPasswordHash(user.email);
    return NextResponse.json(
      { ok: true, hasPassword: Boolean(hash) },
      { headers: noStoreHeaders() },
    );
  } catch {
    return NextResponse.json(
      { ok: false, error: "Não foi possível consultar a sua senha agora." },
      { status: 503, headers: noStoreHeaders() },
    );
  }
}

export async function POST(request: NextRequest) {
  const invalidRequest = requireSameOrigin(request);
  if (invalidRequest) return invalidRequest;

  const user = getUserFromRequest(request);
  if (!user) {
    return NextResponse.json(
      { ok: false, error: "Faça login para criar a sua senha." },
      { status: 401, headers: noStoreHeaders() },
    );
  }

  const limit = rateLimit(`minha-senha:ip:${clientIp(request)}`, 10, 10 * 60 * 1000);
  if (!limit.allowed) {
    return NextResponse.json(
      { ok: false, error: "Muitas tentativas. Aguarde alguns minutos." },
      {
        status: 429,
        headers: { ...noStoreHeaders(), "Retry-After": String(limit.retryAfter) },
      },
    );
  }

  const body = (await request.json().catch(() => null)) as
    | { password?: unknown }
    | null;
  const password = typeof body?.password === "string" ? body.password : "";

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
    const created = await createPasswordHashIfMissing(user.email, hashPassword(password));
    if (!created) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Este e-mail já tem uma senha de acesso. Entre com ela ou peça à coordenação para redefinir.",
        },
        { status: 409, headers: noStoreHeaders() },
      );
    }

    return NextResponse.json(
      { ok: true, email: user.email },
      { headers: noStoreHeaders() },
    );
  } catch {
    return NextResponse.json(
      { ok: false, error: "Não foi possível criar a sua senha agora." },
      { status: 503, headers: noStoreHeaders() },
    );
  }
}
