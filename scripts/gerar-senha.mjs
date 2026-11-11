/**
 * Gera o hash scrypt da senha de acesso do app.
 *
 * Uso:
 *   npm run senha:hash -- "minha-senha-forte"
 *
 * Copie a linha APP_LOGIN_PASSWORD_HASH=... para o .env.local e para o
 * painel do Render. Assim a senha não fica salva em texto puro.
 */
import { randomBytes, scryptSync } from "node:crypto";

const password = process.argv[2];

if (!password || password.length < 8) {
  console.error('Uso: npm run senha:hash -- "sua-senha" (mínimo de 8 caracteres)');
  process.exit(1);
}

const salt = randomBytes(16).toString("hex");
const hash = scryptSync(password, salt, 64).toString("hex");

console.log(`APP_LOGIN_PASSWORD_HASH="scrypt$${salt}$${hash}"`);
