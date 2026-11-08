"use client";

import { useState } from "react";
import { IconPalette } from "@/components/icons";

const STORAGE_KEY = "site-escola:tema-escola";

/**
 * Alterna o tema visual da escola.
 *
 * As cores ficam em `src/app/globals.css`, no bloco "TEMA DA ESCOLA".
 * O botão apenas liga/desliga o atributo `data-escola="on"` no <html>.
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
    if (next) {
      document.documentElement.dataset.escola = "on";
    } else {
      document.documentElement.removeAttribute("data-escola");
    }
    try {
      window.localStorage.setItem(STORAGE_KEY, next ? "on" : "off");
    } catch {
      // Sem armazenamento: o tema vale só para esta sessão.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={active}
      aria-label={active ? "Desativar tema da escola" : "Ativar tema da escola"}
      title={active ? "Tema da escola: ativado" : "Tema da escola"}
      className={`flex h-8 w-8 items-center justify-center rounded-lg border transition ${
        active
          ? "border-indigo-600 bg-indigo-600 text-white hover:bg-indigo-700"
          : "border-slate-200 bg-white text-slate-500 hover:bg-slate-50 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white"
      } ${className}`}
    >
      <IconPalette width={16} height={16} />
    </button>
  );
}
