/**
 * API central de dados do app (CRUD no banco PostgreSQL).
 *
 * - GET  → carrega reservas, atividades e bloqueios do banco.
 * - POST → cria / remove registros ou limpa tudo.
 *          Corpo: { op: "reserva.create" | "reserva.delete" |
 *                   "atividade.create" | "atividade.delete" |
 *                   "bloqueio.create" | "bloqueio.delete" | "reset",
 *                   record?, id? }
 */
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { clearAll, deleteRecord, HAS_DB, insertRecord, loadAll } from "@/lib/db";

export async function GET() {
  try {
    const data = await loadAll();
    return NextResponse.json({
      ok: true,
      hasDb: HAS_DB,
      data: data ?? { reservations: [], activities: [], blocks: [] },
    });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Erro no banco" },
      { status: 503 },
    );
  }
}

type Op =
  | "reserva.create"
  | "reserva.delete"
  | "atividade.create"
  | "atividade.delete"
  | "bloqueio.create"
  | "bloqueio.delete"
  | "reset";

export async function POST(request: NextRequest) {
  let body: { op?: Op; record?: unknown; id?: string };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ ok: false, error: "Corpo inválido" }, { status: 400 });
  }

  const { op, record, id } = body;
  if (!op || op === "reset" && record) {
    return NextResponse.json({ ok: false, error: "Operação inválida" }, { status: 400 });
  }

  try {
    switch (op) {
      case "reset":
        await clearAll();
        break;
      default:
        if (op.endsWith(".create")) {
          if (!record) {
            return NextResponse.json({ ok: false, error: "Registro ausente" }, { status: 400 });
          }
          await insertRecord(op.split(".")[0], record);
        } else if (op.endsWith(".delete")) {
          if (!id) {
            return NextResponse.json({ ok: false, error: "Id ausente" }, { status: 400 });
          }
          await deleteRecord(op.split(".")[0], id);
        } else {
          return NextResponse.json({ ok: false, error: "Operação desconhecida" }, { status: 400 });
        }
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Erro no banco" },
      { status: 503 },
    );
  }
}
