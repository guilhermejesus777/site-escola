/**
 * Solicitação de cadastro feita por quem ainda não tem acesso.
 *
 * A pessoa informa o e-mail @escola.pr.gov.br e o perfil desejado. Nada é
 * liberado na hora: o administrador precisa aprovar a solicitação no painel.
 */
import { NextResponse, type NextRequest } from "next/server";
import { domainOf, normalizeEmail, validateEmail } from "@/lib/email";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { noStoreHeaders, requireSameOrigin } from "@/lib/security";
import { createSolicitacao } from "@/lib/users";

export const runtime = "nodejs";

const ESCOLA_DOMAIN = "escola.pr.gov.br";

export async function POST(request: NextRequest) {
  const invalidRequest = requireSameOrigin(request);
  if (invalidRequest) return invalidRequest;

  const limit = rateLimit(`solicitacao:ip:${clientIp(request)}`, 6, 10 * 60 * 1000);
  if (!limit.allowed) {
    return NextResponse.json(
      {
        ok: false,
        error: "Muitas solicitações. Aguarde alguns minutos e tente novamente.",
      },
      {
        status: 429,
        headers: { ...noStoreHeaders(), "Retry-After": String(limit.retryAfter) },
      },
    );
  }

  const body = (await request.json().catch(() => null)) as
    | { email?: unknown; name?: unknown; role?: unknown; message?: unknown }
    | null;

  const rawEmail = typeof body?.email === "string" ? body.email : "";
  const result = validateEmail(rawEmail);

  if (!result.ok) {
    return NextResponse.json(
      {
        ok: false,
        error:
          result.reason === "formato"
            ? "Digite um e-mail válido."
            : "Use um e-mail de um domínio permitido.",
      },
      { status: 400, headers: noStoreHeaders() },
    );
  }

  if (domainOf(result.email) !== ESCOLA_DOMAIN) {
    return NextResponse.json(
      {
        ok: false,
        error: "A solicitação precisa ser feita com um e-mail @escola.pr.gov.br.",
      },
      { status: 400, headers: noStoreHeaders() },
    );
  }

  const role =
    body?.role === "professor" ? "professor" : body?.role === "aluno" ? "aluno" : null;

  if (!role) {
    return NextResponse.json(
      { ok: false, error: "Escolha se o cadastro é de aluno ou professor." },
      { status: 400, headers: noStoreHeaders() },
    );
  }

  const name = typeof body?.name === "string" ? body.name.trim() : "";
  if (name.length < 2 || name.length > 100) {
    return NextResponse.json(
      { ok: false, error: "Informe o seu nome completo." },
      { status: 400, headers: noStoreHeaders() },
    );
  }

  const message = typeof body?.message === "string" ? body.message : "";

  try {
    await createSolicitacao({
      email: normalizeEmail(result.email),
      name,
      role,
      message,
    });

    return NextResponse.json(
      {
        ok: true,
        message:
          "Solicitação enviada! Aguarde a aprovação do administrador para entrar.",
      },
      { headers: noStoreHeaders() },
    );
  } catch (error) {
    const known =
      error instanceof Error &&
      (error.name === "AlreadyRegistered" || error.name === "AlreadyRequested");

    return NextResponse.json(
      {
        ok: false,
        error:
          error instanceof Error
            ? error.message
            : "Não foi possível enviar a solicitação agora.",
      },
      { status: known ? 409 : 503, headers: noStoreHeaders() },
    );
  }
}
