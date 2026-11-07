"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import {
  IconBook,
  IconCalendar,
  IconHome,
  IconSettings,
} from "@/components/icons";
import { ThemeToggle } from "@/components/theme-toggle";
import { CURRENT_USER } from "@/lib/mock-data";

const NAV = [
  { href: "/", label: "Início", icon: IconHome },
  { href: "/reservas", label: "Reservas", icon: IconCalendar },
  { href: "/atividades", label: "Provas e atividades", shortLabel: "Atividades", icon: IconBook },
  { href: "/configuracoes", label: "Configurações", icon: IconSettings },
];

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

function Brand() {
  return (
    <div className="flex items-center gap-2.5">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-sm">
        <IconBook width={19} height={19} />
      </span>
      <span className="leading-tight">
        <span className="block text-sm font-semibold text-slate-900 dark:text-slate-100">
          Agenda Escolar
        </span>
        <span className="block text-[11px] text-slate-500 dark:text-slate-400">
          Escola Municipal Horizonte
        </span>
      </span>
    </div>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Barra lateral (desktop) */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-slate-200 bg-white lg:flex dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between gap-2 px-4 py-5">
          <Brand />
          <ThemeToggle />
        </div>
        <nav className="flex-1 space-y-1 px-3">
          {NAV.map((item) => {
            const active = isActive(pathname, item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
                }`}
              >
                <Icon
                  width={18}
                  height={18}
                  className={
                    active
                      ? "text-indigo-600 dark:text-indigo-400"
                      : "text-slate-400 dark:text-slate-500"
                  }
                />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="m-3 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2.5 dark:border-amber-500/30 dark:bg-amber-500/10">
          <p className="flex items-center gap-1.5 text-[11px] font-semibold text-amber-800 dark:text-amber-300">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            Protótipo navegável
          </p>
          <p className="mt-1 text-[11px] leading-relaxed text-amber-700 dark:text-amber-200/80">
            Dados fictícios salvos apenas neste navegador.
          </p>
        </div>

        <div className="flex items-center gap-2.5 border-t border-slate-100 px-4 py-3 dark:border-slate-800">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300">
            AS
          </span>
          <span className="min-w-0 leading-tight">
            <span className="block truncate text-xs font-semibold text-slate-800 dark:text-slate-200">
              {CURRENT_USER}
            </span>
            <span className="block text-[11px] text-slate-500 dark:text-slate-400">
              Professora · Matemática
            </span>
          </span>
        </div>
      </aside>

      {/* Cabeçalho (mobile) */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-200 bg-white/90 px-4 py-2.5 backdrop-blur lg:hidden dark:border-slate-800 dark:bg-slate-900/90">
        <Brand />
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-[11px] font-bold text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300">
            AS
          </span>
        </div>
      </header>

      <main className="lg:pl-64">
        <div className="mx-auto w-full max-w-7xl px-4 pb-24 pt-5 sm:px-6 lg:px-8 lg:pb-10 lg:pt-8">
          {children}
        </div>
      </main>

      {/* Navegação inferior (mobile) */}
      <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden dark:border-slate-800 dark:bg-slate-900/95">
        <div className="grid grid-cols-4">
          {NAV.map((item) => {
            const active = isActive(pathname, item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-1 py-2 text-[10px] font-medium ${
                  active ? "text-indigo-600 dark:text-indigo-400" : "text-slate-500 dark:text-slate-400"
                }`}
              >
                <Icon width={20} height={20} />
                {item.shortLabel ?? item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
