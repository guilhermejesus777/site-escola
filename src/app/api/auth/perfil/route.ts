/**
 * Troca o perfil ativo do administrador (aluno ↔ professor).
 * Somente contas com `admin: true` podem usar esta rota.
 */
import { NextResponse, type NextRequest } from "next/server";
import { noStoreHeaders, requireSameOrigin } from "@/lib/security";
import { createSessionToken, getUserFromRequest, sessionCookie } from "@/lib/session";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const invalidRequest = requireSameOrigin(request);
  if (invalidRequest) return invalidRequest;

  const user = await getUserFromRequest(request);
  if (!user) {
    return NextResponse.json(
      { ok: false, error: "Faça login para trocar o perfil." },
      { status: 401, headers: noStoreHeaders() },
    );
  }

  if (!user.admin) {
    return NextResponse.json(
      { ok: false, error: "Apenas o administrador pode trocar de perfil." },
      { status: 403, headers: noStoreHeaders() },
    );
  }

  const body = (await request.json().catch(() => null)) as
    | { role?: unknown }
    | null;
  const role = body?.role === "professor" ? "professor" : body?.role === "aluno" ? "aluno" : null;

  if (!role) {
    return NextResponse.json(
      { ok: false, error: "Escolha o perfil aluno ou professor." },
      { status: 400, headers: noStoreHeaders() },
    );
  }

  const nextUser = {
    email: user.email,
    name: user.name,
    role,
    admin: true,
  } as const;

  return NextResponse.json(
    { ok: true, user: nextUser },
    {
      headers: {
        ...noStoreHeaders(),
        "Set-Cookie": sessionCookie(createSessionToken(nextUser)),
      },
    },
  );
}
