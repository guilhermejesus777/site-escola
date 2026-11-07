"use client";

import { useState } from "react";
import { IconMoon, IconSun } from "@/components/icons";

const STORAGE_KEY = "site-escola:tema";

export function ThemeToggle({ className = "" }: { className?: string }) {
  // O AppShell só é renderizado no cliente (após carregar os dados),
  // então ler o <html> aqui não causa divergência de hidratação.
  const [dark, setDark] = useState(
    () => typeof document !== "undefined" && document.documentElement.classList.contains("dark"),
  );

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    document.documentElement.style.colorScheme = next ? "dark" : "light";
    try {
      window.localStorage.setItem(STORAGE_KEY, next ? "dark" : "light");
    } catch {
      // Sem armazenamento: o tema vale só para esta sessão.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Ativar modo claro" : "Ativar modo escuro"}
      title={dark ? "Modo claro" : "Modo escuro"}
      className={`flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white ${className}`}
    >
      {dark ? <IconSun width={16} height={16} /> : <IconMoon width={16} height={16} />}
    </button>
  );
}
