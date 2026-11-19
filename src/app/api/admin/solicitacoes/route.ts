/** Aprovação ou recusa de uma solicitação de cadastro. */
import { NextResponse, type NextRequest } from "next/server";
import { noStoreHeaders, requireSameOrigin } from "@/lib/security";
import { getUserFromRequest } from "@/lib/session";
import { decideSolicitacao } from "@/lib/users";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const invalidRequest = requireSameOrigin(request);
  if (invalidRequest) return invalidRequest;

  const user = await getUserFromRequest(request);
  if (!user) {
    return NextResponse.json(
      { ok: false, error: "Faça login para analisar solicitações." },
      { status: 401, headers: noStoreHeaders() },
    );
  }
  if (!user.admin) {
    return NextResponse.json(
      { ok: false, error: "Apenas o administrador pode analisar solicitações." },
      { status: 403, headers: noStoreHeaders() },
    );
  }

  const body = (await request.json().catch(() => null)) as
    | { id?: unknown; action?: unknown; role?: unknown }
    | null;

  const id = typeof body?.id === "string" ? body.id : "";
  const action = body?.action === "aprovar" || body?.action === "recusar" ? body.action : null;
  const role =
    body?.role === "professor" || body?.role === "aluno" ? body.role : undefined;

  if (!id || !action) {
    return NextResponse.json(
      { ok: false, error: "Solicitação ou ação inválida." },
      { status: 400, headers: noStoreHeaders() },
    );
  }

  try {
    const updated = await decideSolicitacao(id, action, role);
    return NextResponse.json(
      { ok: true, request: updated },
      { headers: noStoreHeaders() },
    );
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error:
          error instanceof Error
            ? error.message
            : "Não foi possível analisar a solicitação agora.",
      },
      { status: 409, headers: noStoreHeaders() },
    );
  }
}
