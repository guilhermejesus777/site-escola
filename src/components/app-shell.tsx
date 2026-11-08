"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentType, ReactNode, SVGProps } from "react";
import {
  IconBook,
  IconCalendar,
  IconHome,
  IconLogOut,
  IconSettings,
} from "@/components/icons";
import { ThemeToggle } from "@/components/theme-toggle";
import { SchoolThemeToggle } from "@/components/school-theme-toggle";
import { PwaSupport } from "@/components/pwa";
import { useStore } from "@/lib/store";

type NavItem = {
  href: string;
  label: string;
  shortLabel?: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  professorOnly?: boolean;
};

const NAV: NavItem[] = [
  { href: "/", label: "Início", icon: IconHome },
  { href: "/reservas", label: "Reservas", icon: IconCalendar },
  { href: "/atividades", label: "Provas e atividades", shortLabel: "Atividades", icon: IconBook },
  { href: "/configuracoes", label: "Configurações", icon: IconSettings, professorOnly: true },
];

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

function initialsOf(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function Brand() {
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
  const { user, logout } = useStore();

  const isProfessor = user?.role === "professor";
  const name = user?.name ?? "Visitante";
  const roleLabel = isProfessor ? "Professor(a)" : "Aluno(a)";
  const navItems = NAV.filter((item) => !item.professorOnly || isProfessor);
  const initials = initialsOf(name);

  function handleLogout() {
    if (window.confirm("Sair da conta? Você precisará entrar novamente com seu e-mail.")) {
      logout();
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Barra lateral (desktop) */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-slate-200 bg-white lg:flex dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between gap-2 px-4 py-5">
          <Brand />
          <div className="flex items-center gap-1.5">
            <ThemeToggle />
            <SchoolThemeToggle />
          </div>
        </div>
        <nav className="flex-1 space-y-1 px-3">
          {navItems.map((item) => {
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

        <div className="m-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 dark:border-slate-700 dark:bg-slate-800/60">
          <p className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-700 dark:text-slate-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Dados salvos neste navegador
          </p>
          <p className="mt-1 text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
            Tudo o que você criar fica só neste dispositivo neste protótipo.
          </p>
          <div className="mt-2">
            <PwaSupport />
          </div>
        </div>

        <div className="flex items-center gap-2.5 border-t border-slate-100 px-4 py-3 dark:border-slate-800">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300">
            {initials}
          </span>
          <span className="min-w-0 flex-1 leading-tight">
            <span className="block truncate text-xs font-semibold text-slate-800 dark:text-slate-200">
              {name}
            </span>
            <span className="block text-[11px] text-slate-500 dark:text-slate-400">
              {roleLabel}
            </span>
          </span>
          <button
            type="button"
            onClick={handleLogout}
            aria-label="Sair da conta"
            title="Sair da conta"
            className="rounded-lg p-1.5 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600 dark:text-slate-500 dark:hover:bg-rose-500/10 dark:hover:text-rose-300"
          >
            <IconLogOut width={16} height={16} />
          </button>
        </div>
      </aside>

      {/* Cabeçalho (mobile) */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-200 bg-white/90 px-4 py-2.5 backdrop-blur lg:hidden dark:border-slate-800 dark:bg-slate-900/90">
        <Brand />
        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          <SchoolThemeToggle />
          <span
            className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-[11px] font-bold text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300"
            title={`${name} · ${roleLabel}`}
          >
            {initials}
          </span>
          <button
            type="button"
            onClick={handleLogout}
            aria-label="Sair da conta"
            title="Sair da conta"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-rose-50 hover:text-rose-600 dark:text-slate-500 dark:hover:bg-rose-500/10 dark:hover:text-rose-300"
          >
            <IconLogOut width={16} height={16} />
          </button>
        </div>
      </header>

      <main className="lg:pl-64">
        <div className="mx-auto w-full max-w-7xl px-4 pb-24 pt-5 sm:px-6 lg:px-8 lg:pb-10 lg:pt-8">
          {children}
        </div>
      </main>

      {/* Navegação inferior (mobile) */}
      <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden dark:border-slate-800 dark:bg-slate-900/95">
        <div
          className="grid"
          style={{ gridTemplateColumns: `repeat(${navItems.length}, minmax(0, 1fr))` }}
        >
          {navItems.map((item) => {
            const active = isActive(pathname, item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-1 py-2 text-[10px] font-medium ${
                  active
                    ? "text-indigo-600 dark:text-indigo-400"
                    : "text-slate-500 dark:text-slate-400"
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
