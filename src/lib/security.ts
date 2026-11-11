import type { NextRequest } from "next/server";

/**
 * Proteção CSRF simples e eficaz:
 * - exige Content-Type application/json em rotas que alteram dados;
 * - quando o navegador envia Origin, ele precisa ser o mesmo host do site.
 *
 * requisições fora do navegador (sem Origin) continuam permitidas para
 * facilitar testes, mas sem cookie de sessão elas não têm acesso.
 */
export function isJsonRequest(request: Request): boolean {
  const contentType = request.headers.get("content-type") ?? "";
  return contentType.toLowerCase().startsWith("application/json");
}

export function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true;

  const host = request.headers.get("host");
  if (!host) return false;

  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export function noStoreHeaders(): HeadersInit {
  return {
    "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
    Pragma: "no-cache",
    Expires: "0",
  };
}

export function requireSameOrigin(request: NextRequest): Response | null {
  if (!isJsonRequest(request) || !isSameOrigin(request)) {
    return Response.json(
      { error: "Requisição inválida." },
      { status: 403, headers: noStoreHeaders() },
    );
  }
  return null;
}
