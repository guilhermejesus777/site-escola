/**
 * Limite de tentativas em memória (proteção contra força bruta).
 *
 * Serve para o plano gratuito do Render (uma instância). Em várias
 * instâncias, o ideal é migrar este contador para o banco/Redis.
 */
type Bucket = { count: number; resetAt: number };

declare global {
  var __cepkRateLimit: Map<string, Bucket> | undefined;
}

function store(): Map<string, Bucket> {
  if (!globalThis.__cepkRateLimit) globalThis.__cepkRateLimit = new Map();
  return globalThis.__cepkRateLimit;
}

export function rateLimit(
  key: string,
  limit: number,
  windowMs: number,
): { allowed: boolean; retryAfter: number } {
  const map = store();
  const now = Date.now();

  if (map.size > 5000) {
    for (const [entryKey, bucket] of map) {
      if (bucket.resetAt <= now) map.delete(entryKey);
    }
  }

  const bucket = map.get(key);
  if (!bucket || bucket.resetAt <= now) {
    map.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfter: 0 };
  }

  if (bucket.count >= limit) {
    return {
      allowed: false,
      retryAfter: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)),
    };
  }

  bucket.count += 1;
  return { allowed: true, retryAfter: 0 };
}

export function resetRateLimit(key: string) {
  store().delete(key);
}

export function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "desconhecido";
  return request.headers.get("x-real-ip")?.trim() || "local";
}

/** Limite agressivo para login: 8 tentativas por IP a cada 10 minutos. */
export function enforceLoginRateLimit(
  request: Request,
  scope: string,
  email?: string,
): { allowed: boolean; retryAfter: number } {
  const ip = clientIp(request);
  const byIp = rateLimit(`${scope}:ip:${ip}`, 8, 10 * 60 * 1000);
  if (!byIp.allowed) return byIp;

  if (email) {
    const normalized = email.trim().toLowerCase();
    return rateLimit(`${scope}:email:${normalized}`, 12, 15 * 60 * 1000);
  }

  return byIp;
}
