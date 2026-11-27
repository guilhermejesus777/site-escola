/**
 * Gera a versão estática do jogo de luta para o GitHub Pages.
 *
 * Saída em ./docs:
 *   - index.html  (cópia de jogo/index.html)
 *   - arena.js    (React + Three.js empacotados)
 *   - arena.css   (Tailwind compilado)
 *   - .nojekyll   (para o Pages não filtrar arquivos)
 *
 * Uso: npm run arena:build
 */
import { build } from "esbuild";
import { execFileSync } from "node:child_process";
import { cpSync, mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "docs");
const tailwindCli = path.join(root, "node_modules", "@tailwindcss", "cli", "dist", "index.mjs");

mkdirSync(outDir, { recursive: true });

console.log("• Empacotando React + Three.js...");
await build({
  entryPoints: [path.join(root, "jogo", "main.tsx")],
  bundle: true,
  minify: true,
  sourcemap: false,
  format: "iife",
  target: ["es2020"],
  jsx: "automatic",
  outfile: path.join(outDir, "arena.js"),
  alias: { "@": path.join(root, "src") },
  define: { "process.env.NODE_ENV": '"production"' },
  logLevel: "info",
});

console.log("• Compilando Tailwind CSS...");
execFileSync(process.execPath, [tailwindCli, "-i", path.join(root, "jogo", "arena.css"), "-o", path.join(outDir, "arena.css"), "--minify"], {
  stdio: "inherit",
  cwd: root,
});

cpSync(path.join(root, "jogo", "index.html"), path.join(outDir, "index.html"));
writeFileSync(path.join(outDir, ".nojekyll"), "");

console.log("✓ Pronto! Arquivos gerados em ./docs");
