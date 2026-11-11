/**
 * API central de dados do app (CRUD no banco PostgreSQL).
 *
 * Toda operação exige uma sessão válida (cookie HttpOnly assinado).
 * Somente professores podem criar/remover registros ou limpar os dados;
 * alunos têm acesso apenas de leitura.
 */
import { NextResponse, type NextRequest } from "next/server";
import { clearAll, deleteRecord, HAS_DB, insertRecord, loadAll } from "@/lib/db";
import { noStoreHeaders, requireSameOrigin } from "@/lib/security";
import { getUserFromRequest } from "@/lib/session";

export const runtime = "nodejs";

const OPS = [
  "reserva.create",
  "reserva.delete",
  "atividade.create",
  "atividade.delete",
  "bloqueio.create",
  "bloqueio.delete",
  "reset",
] as const;

type Op = (typeof OPS)[number];

const PROFESSOR_OPS = new Set<Op>(OPS);

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function text(
  value: unknown,
  maxLength: number,
  required = false,
): string | undefined | null {
  if (value === undefined || value === null) return required ? null : undefined;
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (required && trimmed.length === 0) return null;
  if (trimmed.length > maxLength) return null;
  return trimmed;
}

function textId(value: unknown): string | null {
  if (typeof value !== "string") return null;
  if (!/^[A-Za-z0-9._:-]{1,200}$/.test(value)) return null;
  return value;
}

function optionalDate(value: unknown): string | undefined | null {
  if (value === undefined || value === null || value === "") return undefined;
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  return value;
}

function sanitizeReservation(record: Record<string, unknown>, teacher: string) {
  const id = textId(record.id);
  const spaceId = textId(record.spaceId);
  const date = optionalDate(record.date);
  const slotId = textId(record.slotId);
  const classId = text(record.classId, 100, true);
  const subject = text(record.subject, 200, true);
  const purpose = text(record.purpose, 500);
  const createdAt = text(record.createdAt, 50);

  if (!id || !spaceId || !date || !slotId) return null;
  if (!classId || !subject || purpose === null) return null;

  return {
    id,
    spaceId,
    date,
    slotId,
    classId: classId ?? "",
    subject: subject ?? "",
    purpose: purpose ?? "",
    teacher,
    createdAt: createdAt ?? new Date().toISOString(),
  };
}

function sanitizeActivity(record: Record<string, unknown>, teacher: string) {
  const id = textId(record.id);
  const title = text(record.title, 200, true);
  const kind = text(record.kind, 30, true);
  const classId = text(record.classId, 100, true);
  const subject = text(record.subject, 200, true);
  const description = text(record.description, 5000);
  const examDate = optionalDate(record.examDate);
  const dueDate = optionalDate(record.dueDate);
  const createdAt = text(record.createdAt, 50);
  const attachments = Array.isArray(record.attachments) ? record.attachments.slice(0, 20) : [];

  if (!id || !title || !kind || !classId || !subject) return null;
  if (description === null || examDate === null || dueDate === null) return null;

  const cleanAttachments = attachments
    .filter(isRecord)
    .map((attachment) => ({
      name: typeof attachment.name === "string" ? attachment.name.slice(0, 200) : "Anexo",
      size:
        typeof attachment.size === "number" && Number.isFinite(attachment.size)
          ? Math.max(0, Math.floor(attachment.size))
          : 0,
    }));

  return {
    id,
    title,
    kind,
    classId,
    subject,
    teacher,
    examDate,
    dueDate,
    description: description ?? "",
    attachments: cleanAttachments,
    createdAt: createdAt ?? new Date().toISOString(),
  };
}

function sanitizeBlock(record: Record<string, unknown>) {
  const id = textId(record.id);
  const spaceId = textId(record.spaceId);
  const slotId = textId(record.slotId);
  const date = optionalDate(record.date);
  const reason = text(record.reason, 500, true);
  const weekdays = Array.isArray(record.weekdays)
    ? record.weekdays.filter(
        (day): day is number =>
          typeof day === "number" && Number.isInteger(day) && day >= 1 && day <= 5,
      )
    : undefined;

  if (!id || !spaceId || !slotId || !reason) return null;

  return {
    id,
    spaceId,
    slotId,
    ...(date ? { date } : {}),
    ...(weekdays && weekdays.length > 0 ? { weekdays } : {}),
    reason,
  };
}

function tooLarge(record: unknown): boolean {
  try {
    return JSON.stringify(record).length > 100_000;
  } catch {
    return true;
  }
}

export async function GET(request: NextRequest) {
  const user = getUserFromRequest(request);
  if (!user) {
    return NextResponse.json(
      { ok: false, error: "Faça login para acessar os dados." },
      { status: 401, headers: noStoreHeaders() },
    );
  }

  try {
    const data = await loadAll();
    return NextResponse.json(
      {
        ok: true,
        hasDb: HAS_DB,
        data: data ?? { reservations: [], activities: [], blocks: [] },
      },
      { headers: noStoreHeaders() },
    );
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Erro no banco" },
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
      { ok: false, error: "Faça login para alterar os dados." },
      { status: 401, headers: noStoreHeaders() },
    );
  }

  let body: { op?: unknown; record?: unknown; id?: unknown };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Corpo inválido" },
      { status: 400, headers: noStoreHeaders() },
    );
  }

  const op = body.op;
  if (typeof op !== "string" || !OPS.includes(op as Op)) {
    return NextResponse.json(
      { ok: false, error: "Operação desconhecida" },
      { status: 400, headers: noStoreHeaders() },
    );
  }

  const operation = op as Op;

  if (!PROFESSOR_OPS.has(operation)) {
    return NextResponse.json(
      { ok: false, error: "Operação não permitida" },
      { status: 400, headers: noStoreHeaders() },
    );
  }

  if (user.role !== "professor") {
    return NextResponse.json(
      { ok: false, error: "Apenas professores podem alterar os dados." },
      { status: 403, headers: noStoreHeaders() },
    );
  }

  try {
    if (operation === "reset") {
      await clearAll();
      return NextResponse.json({ ok: true }, { headers: noStoreHeaders() });
    }

    if (operation.endsWith(".create")) {
      if (!isRecord(body.record)) {
        return NextResponse.json(
          { ok: false, error: "Registro ausente" },
          { status: 400, headers: noStoreHeaders() },
        );
      }

      if (tooLarge(body.record)) {
        return NextResponse.json(
          { ok: false, error: "Registro muito grande" },
          { status: 413, headers: noStoreHeaders() },
        );
      }

      if (operation === "reserva.create") {
        const record = sanitizeReservation(body.record, user.name);
        if (!record) {
          return NextResponse.json(
            { ok: false, error: "Reserva inválida" },
            { status: 400, headers: noStoreHeaders() },
          );
        }
        await insertRecord("reserva", record);
      } else if (operation === "atividade.create") {
        const record = sanitizeActivity(body.record, user.name);
        if (!record) {
          return NextResponse.json(
            { ok: false, error: "Atividade inválida" },
            { status: 400, headers: noStoreHeaders() },
          );
        }
        await insertRecord("atividade", record);
      } else {
        const record = sanitizeBlock(body.record);
        if (!record) {
          return NextResponse.json(
            { ok: false, error: "Bloqueio inválido" },
            { status: 400, headers: noStoreHeaders() },
          );
        }
        await insertRecord("bloqueio", record);
      }

      return NextResponse.json({ ok: true }, { headers: noStoreHeaders() });
    }

    const id = textId(body.id);
    if (!id) {
      return NextResponse.json(
        { ok: false, error: "Id ausente" },
        { status: 400, headers: noStoreHeaders() },
      );
    }

    const kind =
      operation === "reserva.delete"
        ? "reserva"
        : operation === "atividade.delete"
          ? "atividade"
          : "bloqueio";

    await deleteRecord(kind, id);
    return NextResponse.json({ ok: true }, { headers: noStoreHeaders() });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Erro no banco" },
      { status: 503, headers: noStoreHeaders() },
    );
  }
}
