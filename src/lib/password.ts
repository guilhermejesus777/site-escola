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

export function configuredPasswordDescription(): "hash" | "plain" | "default" {
  if (process.env.APP_LOGIN_PASSWORD_HASH?.trim()) return "hash";
  if (process.env.APP_LOGIN_PASSWORD?.trim()) return "plain";
  return "default";
}

export function verifyAppPassword(password: string): boolean {
  const hash = process.env.APP_LOGIN_PASSWORD_HASH?.trim();
  if (hash) return verifyScrypt(password, hash);

  const configured = process.env.APP_LOGIN_PASSWORD?.trim();
  return safeEqual(password, configured || DEFAULT_PASSWORD);
}
