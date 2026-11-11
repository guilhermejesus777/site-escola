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

/** Devolve apenas os e-mails com senha cadastrada e a data da última troca. */
export async function listPasswordRecords(): Promise<
  { email: string; updatedAt: string }[]
> {
  if (!HAS_DB) {
    return Array.from(memoryPasswords(), ([email, value]) => ({
      email,
      updatedAt: value.updatedAt,
    }));
  }

  const pool = getPool();
  await ensureSchema();
  const result = await pool.query<{ email: string; updated_at: Date | string }>(
    "SELECT email, updated_at FROM senhas ORDER BY email",
  );
  return result.rows.map((row) => ({
    email: row.email,
    updatedAt:
      row.updated_at instanceof Date ? row.updated_at.toISOString() : String(row.updated_at),
  }));
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

export async function setPasswordHash(email: string, hash: string) {
  const normalized = normalizeEmail(email);

  if (!HAS_DB) {
    memoryPasswords().set(normalized, {
      hash,
      updatedAt: new Date().toISOString(),
    });
    return;
  }

  const pool = getPool();
  await ensureSchema();
  await pool.query(
    `INSERT INTO senhas (email, password_hash, updated_at)
     VALUES ($1, $2, now())
     ON CONFLICT (email)
     DO UPDATE SET password_hash = EXCLUDED.password_hash, updated_at = now()`,
    [normalized, hash],
  );
}

export async function deletePasswordHash(email: string) {
  const normalized = normalizeEmail(email);

  if (!HAS_DB) {
    memoryPasswords().delete(normalized);
    return;
  }

  const pool = getPool();
  await ensureSchema();
  await pool.query("DELETE FROM senhas WHERE email = $1", [normalized]);
}
