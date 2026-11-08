"use client";

import { useEffect, useState } from "react";

type InstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

/**
 * Registra o Service Worker e oferece o botão "Instalar aplicativo" (PWA).
 */
export function PwaSupport({ variant = "sidebar" }: { variant?: "sidebar" | "inline" }) {
  const [installEvent, setInstallEvent] = useState<InstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(
    () =>
      typeof document !== "undefined" &&
      (window.matchMedia("(display-mode: standalone)").matches ||
        ("standalone" in window.navigator &&
          (window.navigator as { standalone?: boolean }).standalone === true)),
  );

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // Sem HTTPS ou sem sw.js: o app continua funcionando normal.
      });
    }

    function handlePrompt(event: Event) {
      event.preventDefault();
      setInstallEvent(event as InstallPromptEvent);
    }
    function handleInstalled() {
      setInstalled(true);
      setInstallEvent(null);
    }

    window.addEventListener("beforeinstallprompt", handlePrompt);
    window.addEventListener("appinstalled", handleInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", handlePrompt);
      window.removeEventListener("appinstalled", handleInstalled);
    };
  }, []);

  async function install() {
    if (!installEvent) return;
    await installEvent.prompt();
    const choice = await installEvent.userChoice;
    if (choice.outcome === "accepted") setInstalled(true);
    setInstallEvent(null);
  }

  if (installed) {
    return (
      <p className="rounded-xl bg-emerald-50 px-3 py-2 text-[11px] font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
        ✅ Aplicativo instalado neste dispositivo.
      </p>
    );
  }

  if (!installEvent) {
    return (
      <p className="px-1 text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
        Dica: no celular, use “Adicionar à tela inicial” no menu do navegador para instalar.
      </p>
    );
  }

  if (variant === "inline") {
    return (
      <button
        type="button"
        onClick={install}
        className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-400"
      >
        📲 Instalar aplicativo
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={install}
      className="w-full rounded-xl bg-indigo-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-400"
    >
      📲 Instalar aplicativo
    </button>
  );
}
