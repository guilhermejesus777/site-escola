"use client";

import { useState } from "react";

const STORAGE_KEY = "site-escola:tema-escola";

/**
 * Alterna o tema do Colégio Kennedy (preto e verde).
 *
 * As cores ficam em `src/app/globals.css`, no bloco "TEMA DO COLÉGIO
 * PRESIDENTE KENNEDY". O botão usa o mascote do CEPK como ícone.
 */
export function SchoolThemeToggle({ className = "" }: { className?: string }) {
  // O AppShell só é renderizado no cliente (após carregar os dados),
  // então ler o <html> aqui não causa divergência de hidratação.
  const [active, setActive] = useState(
    () => typeof document !== "undefined" && document.documentElement.dataset.escola === "on",
  );

  function toggle() {
    const next = !active;
    setActive(next);
    const root = document.documentElement;
    try {
      window.localStorage.setItem(STORAGE_KEY, next ? "on" : "off");
    } catch {
      // Sem armazenamento: o tema vale só para esta sessão.
    }
    if (next) {
      // Tema do colégio é preto e verde: ativa junto o modo escuro.
      root.dataset.escola = "on";
      root.classList.add("dark");
      root.style.colorScheme = "dark";
      return;
    }
    // Ao desligar, restaura o modo claro/escuro salvo pelo ThemeToggle.
    root.removeAttribute("data-escola");
    let dark = false;
    try {
      const saved = window.localStorage.getItem("site-escola:tema");
      dark =
        saved === "dark" ||
        ((saved === null || saved === "system") &&
          window.matchMedia("(prefers-color-scheme: dark)").matches);
    } catch {
      // Sem armazenamento: volta para o modo claro.
    }
    root.classList.toggle("dark", dark);
    root.style.colorScheme = dark ? "dark" : "light";
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={active}
      aria-label={active ? "Desativar tema do colégio" : "Ativar tema do colégio"}
      title={active ? "Tema do colégio (preto e verde): ativado" : "Tema do colégio (preto e verde)"}
      className={`relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 transition ${
        active
          ? "border-[#5cc513] shadow-[0_0_10px_rgba(92,197,19,0.55)]"
          : "border-slate-300 opacity-80 hover:opacity-100 dark:border-slate-600"
      } ${className}`}
    >
      {/* Mascote do CEPK como ícone do tema do colégio */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/mascote-cepk.svg"
        alt=""
        width={30}
        height={30}
        className="h-7 w-7 rounded-full object-cover"
        draggable={false}
      />
    </button>
  );
}
