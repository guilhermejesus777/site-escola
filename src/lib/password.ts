/**
 * Verificação de senha do app.
 *
 * Prefira APP_LOGIN_PASSWORD_HASH (scrypt) em produção. Se só existir
 * APP_LOGIN_PASSWORD, comparamos em tempo constante. O valor padrão abaixo
 * é público (está no repositório) e serve apenas para demonstração.
 */
import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";

const DEFAULT_PASSWORD = "cepk2026";

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `scrypt$${salt}$${hash}`;
}

function safeEqual(a: string, b: string): boolean {
  const hashA = scryptSync(a, "comparacao", 64);
  const hashB = scryptSync(b, "comparacao", 64);
  return timingSafeEqual(hashA, hashB);
}

function verifyScrypt(password: string, stored: string): boolean {
  const [algorithm, salt, hash] = stored.split("$");
  if (algorithm !== "scrypt" || !salt || !hash) return false;
  const expected = Buffer.from(hash, "hex");
  const actual = scryptSync(password, salt, expected.length);
  if (expected.length !== actual.length) return false;
  return timingSafeEqual(expected, actual);
}

/** Verifica uma senha contra um hash scrypt individual salvo no banco. */
export function verifyPasswordHash(password: string, stored: string): boolean {
  return verifyScrypt(password, stored);
}

export function isAppPasswordConfigured(): boolean {
  return Boolean(
    process.env.APP_LOGIN_PASSWORD_HASH?.trim() ||
      process.env.APP_LOGIN_PASSWORD?.trim(),
  );
}

export function verifyAppPassword(password: string): boolean {
  const hash = process.env.APP_LOGIN_PASSWORD_HASH?.trim();
  if (hash) return verifyScrypt(password, hash);

  const configured = process.env.APP_LOGIN_PASSWORD?.trim();
  if (configured) return safeEqual(password, configured);

  // Em produção a senha padrão (pública) não é aceita: é preciso configurar
  // APP_LOGIN_PASSWORD_HASH ou APP_LOGIN_PASSWORD no servidor.
  if (process.env.NODE_ENV === "production") return false;

  return safeEqual(password, DEFAULT_PASSWORD);
}
