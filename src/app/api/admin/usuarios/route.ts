/**
 * Painel do administrador: lista de contas, cadastro direto e gerenciamento.
 *
 * GET    → contas cadastradas (+ se já têm senha) e solicitações.
 * POST   → cadastra um e-mail como aluno ou professor.
 * PATCH  → define/remove senha ou edita nome/perfil de uma conta.
 * DELETE → remove uma conta criada pelo administrador (?email=...).
 */
import { NextResponse, type NextRequest } from "next/server";
import { validateEmail } from "@/lib/email";
import { noStoreHeaders, requireSameOrigin } from "@/lib/security";
import { getUserFromRequest } from "@/lib/session";
import {
  addAppUser,
  listAppUsers,
  listSolicitacoesDoAdmin,
  removeAppUser,
  removeAppUserPassword,
  setAppUserPassword,
  updateAppUser,
} from "@/lib/users";

export const runtime = "nodejs";

async function requireAdmin(request: NextRequest) {
  const user = await getUserFromRequest(request);
  if (!user) {
    return {
      error: NextResponse.json(
        { ok: false, error: "Faça login para acessar o painel." },
        { status: 401, headers: noStoreHeaders() },
      ),
    };
  }
  if (!user.admin) {
    return {
      error: NextResponse.json(
        { ok: false, error: "Apenas o administrador pode acessar o painel." },
        { status: 403, headers: noStoreHeaders() },
      ),
    };
  }
  return { user };
}

export async function GET(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (auth.error) return auth.error;

  try {
    const [users, requests] = await Promise.all([
      listAppUsers(),
      listSolicitacoesDoAdmin(),
    ]);

    return NextResponse.json(
      { ok: true, users, requests },
      { headers: noStoreHeaders() },
    );
  } catch {
    return NextResponse.json(
      { ok: false, error: "Não foi possível carregar as contas agora." },
      { status: 503, headers: noStoreHeaders() },
    );
  }
}

export async function POST(request: NextRequest) {
  const invalidRequest = requireSameOrigin(request);
  if (invalidRequest) return invalidRequest;

  const auth = await requireAdmin(request);
  if (auth.error) return auth.error;

  const body = (await request.json().catch(() => null)) as
    | { email?: unknown; name?: unknown; role?: unknown }
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
            : "Use um e-mail de domínio permitido.",
      },
      { status: 400, headers: noStoreHeaders() },
    );
  }

  const role =
    body?.role === "professor" ? "professor" : body?.role === "aluno" ? "aluno" : null;
  if (!role) {
    return NextResponse.json(
      { ok: false, error: "Escolha se a conta é de aluno ou professor." },
      { status: 400, headers: noStoreHeaders() },
    );
  }

  const name = typeof body?.name === "string" ? body.name.trim() : "";
  if (name.length < 2 || name.length > 100) {
    return NextResponse.json(
      { ok: false, error: "Informe o nome completo da pessoa." },
      { status: 400, headers: noStoreHeaders() },
    );
  }

  try {
    const user = await addAppUser({ email: result.email, name, role });
    return NextResponse.json(
      { ok: true, user },
      { status: 201, headers: noStoreHeaders() },
    );
  } catch (error) {
    const duplicate = error instanceof Error && error.message.includes("já está cadastrado");
    return NextResponse.json(
      {
        ok: false,
        error:
          error instanceof Error
            ? error.message
            : "Não foi possível cadastrar este e-mail agora.",
      },
      { status: duplicate ? 409 : 503, headers: noStoreHeaders() },
    );
  }
}

export async function PATCH(request: NextRequest) {
  const invalidRequest = requireSameOrigin(request);
  if (invalidRequest) return invalidRequest;

  const auth = await requireAdmin(request);
  if (auth.error) return auth.error;

  const body = (await request.json().catch(() => null)) as
    | {
        action?: unknown;
        email?: unknown;
        password?: unknown;
        name?: unknown;
        role?: unknown;
      }
    | null;

  const action =
    body?.action === "senha" ||
    body?.action === "remover-senha" ||
    body?.action === "editar"
      ? body.action
      : null;

  const rawEmail = typeof body?.email === "string" ? body.email : "";
  const result = validateEmail(rawEmail);

  if (!action || !result.ok) {
    return NextResponse.json(
      { ok: false, error: "Ação ou e-mail inválido." },
      { status: 400, headers: noStoreHeaders() },
    );
  }

  try {
    if (action === "senha") {
      const password = typeof body?.password === "string" ? body.password : "";
      const user = await setAppUserPassword(result.email, password);
      return NextResponse.json(
        { ok: true, user: { ...user, hasPassword: true } },
        { headers: noStoreHeaders() },
      );
    }

    if (action === "remover-senha") {
      const user = await removeAppUserPassword(result.email);
      return NextResponse.json(
        { ok: true, user: { ...user, hasPassword: false } },
        { headers: noStoreHeaders() },
      );
    }

    const user = await updateAppUser(result.email, {
      name: typeof body?.name === "string" ? body.name : undefined,
      role:
        body?.role === "professor" || body?.role === "aluno"
          ? body.role
          : undefined,
    });
    return NextResponse.json(
      { ok: true, user },
      { headers: noStoreHeaders() },
    );
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error:
          error instanceof Error
            ? error.message
            : "Não foi possível atualizar esta conta agora.",
      },
      { status: 400, headers: noStoreHeaders() },
    );
  }
}

export async function DELETE(request: NextRequest) {
  const invalidRequest = requireSameOrigin(request);
  if (invalidRequest) return invalidRequest;

  const auth = await requireAdmin(request);
  if (auth.error) return auth.error;

  const rawEmail = request.nextUrl.searchParams.get("email") ?? "";
  const result = validateEmail(rawEmail);
  if (!result.ok) {
    return NextResponse.json(
      { ok: false, error: "E-mail inválido." },
      { status: 400, headers: noStoreHeaders() },
    );
  }

  try {
    const user = await removeAppUser(result.email);
    return NextResponse.json(
      { ok: true, email: user.email },
      { headers: noStoreHeaders() },
    );
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error:
          error instanceof Error
            ? error.message
            : "Não foi possível remover este e-mail agora.",
      },
      { status: 400, headers: noStoreHeaders() },
    );
  }
}
