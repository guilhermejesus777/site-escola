import type { ReactNode } from "react";
import Link from "next/link";
import { IconBook, IconChevronLeft } from "@/components/icons";

/**
 * Moldura das páginas públicas de Privacidade e Termos.
 *
 * Ficam fora do login porque o Google exige uma URL pública de política de
 * privacidade para publicar o aplicativo OAuth.
 */
export function LegalPage({
  title,
  subtitle,
  updatedAt,
  children,
}: {
  title: string;
  subtitle: string;
  updatedAt: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <header className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-lime-600 text-white shadow-sm">
              <IconBook width={19} height={19} />
            </span>
            <span className="leading-tight">
              <span className="block text-sm font-semibold text-slate-900 dark:text-slate-100">
                Agenda Escolar CEPK
              </span>
              <span className="block text-[11px] text-slate-500 dark:text-slate-400">
                Colégio Estadual Presidente Kennedy
              </span>
            </span>
          </div>
          <Link
            href="/"
            className="flex items-center gap-1 text-[11px] font-semibold text-slate-500 transition hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
          >
            <IconChevronLeft width={13} height={13} />
            Voltar ao site
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-10">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
          Documento oficial
        </p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
          {title}
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>
        <p className="mt-1 text-[11px] text-slate-400 dark:text-slate-500">
          Última atualização: {updatedAt}
        </p>

        <article className="mt-6 space-y-5 rounded-2xl border border-slate-200 bg-white p-5 text-sm leading-relaxed text-slate-600 shadow-sm sm:p-7 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
          {children}
        </article>

        <p className="mt-6 text-center text-[11px] text-slate-400 dark:text-slate-600">
          Colégio Estadual Presidente Kennedy · Agenda Escolar CEPK
        </p>
      </main>
    </div>
  );
}

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section>
      <h2 className="mb-1.5 text-sm font-semibold text-slate-900 dark:text-slate-100">{title}</h2>
      <div className="space-y-2 text-[13px] leading-relaxed">{children}</div>
    </section>
  );
}
