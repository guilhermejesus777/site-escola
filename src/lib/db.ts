/**
 * Conexão com o banco PostgreSQL (Neon) — fonte oficial dos dados do app.
 *
 * A connection string vem da variável de ambiente `DATABASE_URL`:
 *
 *   DATABASE_URL=postgresql://usuario:senha@host.neon.tech/dbname?sslmode=require
 *
 * Sem `DATABASE_URL` o app funciona em modo local (dados só no navegador);
 * com ela, reservas, atividades e bloqueios ficam persistidos no banco e
 * todos os usuários enxergam os mesmos dados.
 */
import { Pool } from "pg";

export const HAS_DB = Boolean(process.env.DATABASE_URL);

const TABLES = `
CREATE TABLE IF NOT EXISTS reservas (
  id TEXT PRIMARY KEY,
  space_id TEXT NOT NULL,
  date TEXT NOT NULL,
  slot_id TEXT NOT NULL,
  teacher TEXT,
  payload JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT 'now()'
);
CREATE TABLE IF NOT EXISTS atividades (
  id TEXT PRIMARY KEY,
  payload JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT 'now()'
);
CREATE TABLE IF NOT EXISTS bloqueios (
  id TEXT PRIMARY KEY,
  payload JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT 'now()'
);
CREATE TABLE IF NOT EXISTS senhas (
  email TEXT PRIMARY KEY,
  password_hash TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS usuarios (
  email TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS solicitacoes (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'pendente',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
`;

declare global {
  var __escolaPool: Pool | undefined;
}

function getPool(): Pool {
  if (!global.__escolaPool) {
    global.__escolaPool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
      max: 5,
    });
  }
  return global.__escolaPool;
}

let schemaReady = false;

async function ensureSchema() {
  if (schemaReady) return;
  await getPool().query(TABLES);
  schemaReady = true;
}

type Row = { id: string; payload: unknown; created_at: string };

export async function loadAll(): Promise<{
  reservations: unknown[];
  activities: unknown[];
  blocks: unknown[];
} | null> {
  if (!HAS_DB) return null;
  const pool = getPool();
  await ensureSchema();
  const [r, a, b] = await Promise.all([
    pool.query<Row>(
      "SELECT id, payload, created_at FROM reservas ORDER BY created_at",
    ),
    pool.query<Row>(
      "SELECT id, payload, created_at FROM atividades ORDER BY created_at DESC",
    ),
    pool.query<Row>("SELECT id, payload, created_at FROM bloqueios ORDER BY created_at"),
  ]);
  return {
    reservations: r.rows.map((row) => row.payload),
    activities: a.rows.map((row) => row.payload),
    blocks: b.rows.map((row) => row.payload),
  };
}

export async function insertRecord(kind: string, record: unknown) {
  if (!HAS_DB) return;
  const pool = getPool();
  await ensureSchema();
  const id = (record as { id?: string }).id;
  const table = kind === "reserva" ? "reservas" : kind === "atividade" ? "atividades" : "bloqueios";
  if (kind === "reserva") {
    await pool.query(
      "INSERT INTO reservas (id, space_id, date, slot_id, teacher, payload) VALUES ($1, $2, $3, $4, $5, $6)",
      [
        id,
        (record as { spaceId?: string }).spaceId,
        (record as { date?: string }).date,
        (record as { slotId?: string }).slotId,
        (record as { teacher?: string }).teacher,
        JSON.stringify(record),
      ],
    );
  } else {
    await pool.query(`INSERT INTO ${table} (id, payload) VALUES ($1, $2)`, [
      id,
      JSON.stringify(record),
    ]);
  }
}

export async function deleteRecord(kind: string, id: string) {
  if (!HAS_DB) return;
  const pool = getPool();
  await ensureSchema();
  const table = kind === "reserva" ? "reservas" : kind === "atividade" ? "atividades" : "bloqueios";
  await pool.query(`DELETE FROM ${table} WHERE id = $1`, [id]);
}

export async function clearAll() {
  if (!HAS_DB) return;
  const pool = getPool();
  await ensureSchema();
  await pool.query("DELETE FROM reservas");
  await pool.query("DELETE FROM atividades");
  await pool.query("DELETE FROM bloqueios");
}

/* --------------------------------- Senhas --------------------------------- */

type StoredPassword = { hash: string; updatedAt: string };

declare global {
  var __escolaSenhas: Map<string, StoredPassword> | undefined;
}

function memoryPasswords(): Map<string, StoredPassword> {
  if (!global.__escolaSenhas) global.__escolaSenhas = new Map();
  return global.__escolaSenhas;
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export async function getPasswordHash(email: string): Promise<string | null> {
  const normalized = normalizeEmail(email);

  if (!HAS_DB) {
    return memoryPasswords().get(normalized)?.hash ?? null;
  }

  const pool = getPool();
  await ensureSchema();
  const result = await pool.query<{ password_hash: string }>(
    "SELECT password_hash FROM senhas WHERE email = $1",
    [normalized],
  );
  return result.rows[0]?.password_hash ?? null;
}

/**
 * Cria a senha apenas se ainda não existir. Usado na ativação de primeiro
 * acesso, para que ninguém sobrescreva a senha de outra pessoa.
 */
export async function createPasswordHashIfMissing(
  email: string,
  hash: string,
): Promise<boolean> {
  const normalized = normalizeEmail(email);

  if (!HAS_DB) {
    const map = memoryPasswords();
    if (map.has(normalized)) return false;
    map.set(normalized, { hash, updatedAt: new Date().toISOString() });
    return true;
  }

  const pool = getPool();
  await ensureSchema();
  const result = await pool.query(
    `INSERT INTO senhas (email, password_hash, updated_at)
     VALUES ($1, $2, now())
     ON CONFLICT (email) DO NOTHING`,
    [normalized, hash],
  );
  return (result.rowCount ?? 0) > 0;
}

/* ------------------------- Usuários e solicitações ------------------------- */

export type StoredUser = {
  email: string;
  name: string;
  role: "professor" | "aluno";
  createdAt: string;
};

export type StoredRequest = {
  id: string;
  email: string;
  name: string;
  role: "professor" | "aluno";
  message: string;
  status: "pendente" | "aprovada" | "recusada";
  createdAt: string;
};

declare global {
  var __escolaUsuarios: Map<string, StoredUser> | undefined;
  var __escolaSolicitacoes: Map<string, StoredRequest> | undefined;
}

function memoryUsers(): Map<string, StoredUser> {
  if (!global.__escolaUsuarios) global.__escolaUsuarios = new Map();
  return global.__escolaUsuarios;
}

function memoryRequests(): Map<string, StoredRequest> {
  if (!global.__escolaSolicitacoes) global.__escolaSolicitacoes = new Map();
  return global.__escolaSolicitacoes;
}

function toIso(value: unknown): string {
  return value instanceof Date ? value.toISOString() : String(value);
}

export async function listExtraUsers(): Promise<StoredUser[]> {
  if (!HAS_DB) {
    return Array.from(memoryUsers().values());
  }

  const pool = getPool();
  await ensureSchema();
  const result = await pool.query<{
    email: string;
    name: string;
    role: string;
    created_at: Date | string;
  }>("SELECT email, name, role, created_at FROM usuarios ORDER BY name");

  return result.rows
    .filter((row) => row.role === "professor" || row.role === "aluno")
    .map((row) => ({
      email: row.email,
      name: row.name,
      role: row.role as "professor" | "aluno",
      createdAt: toIso(row.created_at),
    }));
}

export async function getExtraUser(email: string): Promise<StoredUser | null> {
  const normalized = normalizeEmail(email);

  if (!HAS_DB) {
    return memoryUsers().get(normalized) ?? null;
  }

  const pool = getPool();
  await ensureSchema();
  const result = await pool.query<{
    email: string;
    name: string;
    role: string;
    created_at: Date | string;
  }>("SELECT email, name, role, created_at FROM usuarios WHERE email = $1", [
    normalized,
  ]);
  const row = result.rows[0];
  if (!row || (row.role !== "professor" && row.role !== "aluno")) return null;

  return {
    email: row.email,
    name: row.name,
    role: row.role,
    createdAt: toIso(row.created_at),
  };
}

export async function insertExtraUser(user: StoredUser): Promise<void> {
  const normalized = normalizeEmail(user.email);

  if (!HAS_DB) {
    memoryUsers().set(normalized, { ...user, email: normalized });
    return;
  }

  const pool = getPool();
  await ensureSchema();
  await pool.query(
    `INSERT INTO usuarios (email, name, role)
     VALUES ($1, $2, $3)
     ON CONFLICT (email) DO NOTHING`,
    [normalized, user.name, user.role],
  );
}

export async function listSolicitacoes(): Promise<StoredRequest[]> {
  if (!HAS_DB) {
    return Array.from(memoryRequests().values()).sort((a, b) =>
      b.createdAt.localeCompare(a.createdAt),
    );
  }

  const pool = getPool();
  await ensureSchema();
  const result = await pool.query<{
    id: string;
    email: string;
    name: string;
    role: string;
    message: string | null;
    status: string;
    created_at: Date | string;
  }>(
    "SELECT id, email, name, role, message, status, created_at FROM solicitacoes ORDER BY created_at DESC",
  );

  return result.rows
    .filter(
      (row) =>
        (row.role === "professor" || row.role === "aluno") &&
        (row.status === "pendente" ||
          row.status === "aprovada" ||
          row.status === "recusada"),
    )
    .map((row) => ({
      id: row.id,
      email: row.email,
      name: row.name,
      role: row.role as "professor" | "aluno",
      message: row.message ?? "",
      status: row.status as StoredRequest["status"],
      createdAt: toIso(row.created_at),
    }));
}

export async function getSolicitacao(id: string): Promise<StoredRequest | null> {
  if (!HAS_DB) {
    return memoryRequests().get(id) ?? null;
  }

  const pool = getPool();
  await ensureSchema();
  const result = await pool.query<{
    id: string;
    email: string;
    name: string;
    role: string;
    message: string | null;
    status: string;
    created_at: Date | string;
  }>(
    "SELECT id, email, name, role, message, status, created_at FROM solicitacoes WHERE id = $1",
    [id],
  );
  const row = result.rows[0];
  if (!row) return null;

  return {
    id: row.id,
    email: row.email,
    name: row.name,
    role:
      row.role === "professor" || row.role === "aluno" ? row.role : "aluno",
    message: row.message ?? "",
    status:
      row.status === "aprovada" || row.status === "recusada"
        ? row.status
        : "pendente",
    createdAt: toIso(row.created_at),
  };
}

export async function insertSolicitacao(request: StoredRequest): Promise<void> {
  if (!HAS_DB) {
    memoryRequests().set(request.id, request);
    return;
  }

  const pool = getPool();
  await ensureSchema();
  await pool.query(
    `INSERT INTO solicitacoes (id, email, name, role, message, status, created_at)
     VALUES ($1, $2, $3, $4, $5, $6, $7)`,
    [
      request.id,
      request.email,
      request.name,
      request.role,
      request.message,
      request.status,
      request.createdAt,
    ],
  );
}

export async function setSolicitacaoStatus(
  id: string,
  status: "aprovada" | "recusada",
  role?: "professor" | "aluno",
): Promise<boolean> {
  if (!HAS_DB) {
    const current = memoryRequests().get(id);
    if (!current) return false;
    memoryRequests().set(id, { ...current, status, role: role ?? current.role });
    return true;
  }

  const pool = getPool();
  await ensureSchema();
  const result = role
    ? await pool.query(
        "UPDATE solicitacoes SET status = $1, role = $2 WHERE id = $3",
        [status, role, id],
      )
    : await pool.query("UPDATE solicitacoes SET status = $1 WHERE id = $2", [
        status,
        id,
      ]);
  return (result.rowCount ?? 0) > 0;
}


