/**
 * Sessão assinada no servidor (cookie HttpOnly).
 *
 * O navegador guarda apenas um token assinado com HMAC-SHA256. O conteúdo
 * (e-mail, nome e perfil) não pode ser alterado sem a chave secreta do
 * servidor, então ninguém consegue "virar professor" editando o navegador.
 *
 * A chave vem de SESSION_SECRET. Se ela não estiver configurada, derivamos
 * uma chave da DATABASE_URL (também secreta); sem banco, geramos uma chave
 * aleatória por processo.
 */
import { createHash, createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import type { NextRequest } from "next/server";
import { findRegisteredStudent, findRegisteredTeacher } from "@/lib/access";
import type { SessionUser, UserRole } from "@/types";

export const SESSION_COOKIE = "cepk_sessao";
export const SESSION_TTL_SECONDS = 60 * 60 * 8;

type SessionPayload = SessionUser & { iat: number; exp: number };

declare global {
  var __cepkSessionSecret: string | undefined;
}

function secret(): string {
  const configured = process.env.SESSION_SECRET?.trim();
  if (configured && configured.length >= 32) return configured;

  // Sem SESSION_SECRET, deriva a chave da DATABASE_URL (que já é secreta).
  // Assim as sessões continuam válidas quando o Render reinicia.
  const databaseUrl = process.env.DATABASE_URL?.trim();
  if (databaseUrl) {
    return createHash("sha256").update(`cepk-sessao:${databaseUrl}`).digest("base64url");
  }

  if (!globalThis.__cepkSessionSecret) {
    globalThis.__cepkSessionSecret = randomBytes(48).toString("base64url");
  }
  return globalThis.__cepkSessionSecret;
}

function sign(data: string): string {
  return createHmac("sha256", secret()).update(data).digest("base64url");
}

function signaturesMatch(received: string, expected: string): boolean {
  const a = Buffer.from(received);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export function createSessionToken(user: SessionUser): string {
  const now = Math.floor(Date.now() / 1000);
  const payload: SessionPayload = {
    email: user.email,
    name: user.name,
    role: user.role,
    iat: now,
    exp: now + SESSION_TTL_SECONDS,
  };
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${body}.${sign(body)}`;
}

export function readSessionToken(token: string | undefined | null): SessionUser | null {
  if (!token) return null;

  const [body, signature] = token.split(".");
  if (!body || !signature) return null;
  if (!signaturesMatch(signature, sign(body))) return null;

  let parsed: SessionPayload;
  try {
    parsed = JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as SessionPayload;
  } catch {
    return null;
  }

  if (!parsed || typeof parsed !== "object") return null;
  if (typeof parsed.email !== "string" || typeof parsed.name !== "string") return null;
  if (parsed.role !== "aluno" && parsed.role !== "professor") return null;
  if (typeof parsed.exp !== "number" || parsed.exp <= Math.floor(Date.now() / 1000)) return null;

  const email = parsed.email.trim().toLowerCase();
  const role: UserRole = parsed.role;

  // Revalida a lista de acesso em toda requisição: se alguém sair da lista,
  // a sessão deixa de valer imediatamente.
  if (role === "professor") {
    const teacher = findRegisteredTeacher(email);
    if (!teacher) return null;
    return { email, name: teacher.name, role };
  }

  if (!findRegisteredStudent(email)) return null;
  return { email, name: parsed.name, role };
}

export function getUserFromRequest(request: NextRequest): SessionUser | null {
  return readSessionToken(request.cookies.get(SESSION_COOKIE)?.value);
}

export function sessionCookie(token: string): string {
  const parts = [
    `${SESSION_COOKIE}=${token}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    `Max-Age=${SESSION_TTL_SECONDS}`,
  ];
  if (process.env.NODE_ENV === "production") parts.push("Secure");
  return parts.join("; ");
}

export function clearSessionCookie(): string {
  const parts = [
    `${SESSION_COOKIE}=`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    "Max-Age=0",
  ];
  if (process.env.NODE_ENV === "production") parts.push("Secure");
  return parts.join("; ");
}
