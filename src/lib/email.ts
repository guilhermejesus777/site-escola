/**
 * Validação de e-mail do protótipo.
 *
 * Só aceitamos e-mails de domínios conhecidos para evitar logins com
 * endereços inventados. Ajuste a lista abaixo para incluir outros domínios
 * da escola quando necessário.
 */
export const ALLOWED_DOMAINS = [
  "gmail.com",
  "hotmail.com",
  "outlook.com",
  "yahoo.com",
  "icloud.com",
  "escola.pr.gov.br",
] as const;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normalizeEmail(value: string): string {
  return value.trim().toLowerCase();
}

export function domainOf(email: string): string {
  return normalizeEmail(email).split("@")[1] ?? "";
}

export function isAllowedDomain(email: string): boolean {
  const domain = domainOf(email);
  return ALLOWED_DOMAINS.some(
    (allowed) => domain === allowed || domain.endsWith(`.${allowed}`),
  );
}

export type EmailValidation =
  | { ok: true; email: string }
  | { ok: false; reason: "formato" | "dominio" };

export function validateEmail(value: string): EmailValidation {
  const email = normalizeEmail(value);
  if (!EMAIL_PATTERN.test(email)) {
    return { ok: false, reason: "formato" };
  }
  if (!isAllowedDomain(email)) {
    return { ok: false, reason: "dominio" };
  }
  return { ok: true, email };
}

/** Lista formatada para mensagens: "@gmail.com, @hotmail.com…". */
export const ALLOWED_DOMAINS_LABEL = ALLOWED_DOMAINS.map((domain) => `@${domain}`).join(", ");
