"use client";

import { useEffect, useState } from "react";
import { IconMoon, IconSun } from "@/components/icons";

const STORAGE_KEY = "site-escola:tema";

/** Evento disparado quando o tema do colégio é ligado/desligado. */
export const ESCOLA_CHANGE_EVENT = "site-escola:escola-change";

function escolaAtivo() {
  return typeof document !== "undefined" && document.documentElement.dataset.escola === "on";
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  // O AppShell só é renderizado no cliente (após carregar os dados),
  // então ler o <html> aqui não causa divergência de hidratação.
  const [dark, setDark] = useState(
    () => typeof document !== "undefined" && document.documentElement.classList.contains("dark"),
  );
  const [schoolMode, setSchoolMode] = useState(escolaAtivo);

  // Mantém o botão em sincronia quando o tema do colégio é ativado/desativado.
  useEffect(() => {
    function sync() {
      setSchoolMode(escolaAtivo());
      setDark(document.documentElement.classList.contains("dark"));
    }
    window.addEventListener(ESCOLA_CHANGE_EVENT, sync);
    return () => window.removeEventListener(ESCOLA_CHANGE_EVENT, sync);
  }, []);

  function toggle() {
    // O modo claro/escuro fica bloqueado enquanto o tema do colégio estiver ativo.
    if (escolaAtivo()) return;

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
      disabled={schoolMode}
      aria-disabled={schoolMode}
      aria-label={
        schoolMode
          ? "Desative o tema do colégio para alternar claro/escuro"
          : dark
            ? "Ativar modo claro"
            : "Ativar modo escuro"
      }
      title={
        schoolMode
          ? "Desative o tema do colégio para alternar claro/escuro"
          : dark
            ? "Modo claro"
            : "Modo escuro"
      }
      className={`flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white dark:disabled:hover:bg-slate-800 dark:disabled:hover:text-slate-300 ${className}`}
    >
      {dark ? <IconSun width={16} height={16} /> : <IconMoon width={16} height={16} />}
    </button>
  );
}
