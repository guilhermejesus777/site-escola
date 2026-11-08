"use client";

import { useState, type FormEvent } from "react";
import { Brand } from "@/components/app-shell";
import {
  IconAlert,
  IconArrowRight,
  IconChevronLeft,
  IconGraduationCap,
  IconPresentation,
} from "@/components/icons";
import { ThemeToggle } from "@/components/theme-toggle";
import { SchoolThemeToggle } from "@/components/school-theme-toggle";
import { Button, Field, inputClass } from "@/components/ui";
import { isRegisteredTeacher } from "@/lib/access";
import { ALLOWED_DOMAINS_LABEL, validateEmail } from "@/lib/email";
import { useStore } from "@/lib/store";
import type { UserRole } from "@/types";

const ROLES: Record<
  UserRole,
  { label: string; article: string; description: string; icon: typeof IconGraduationCap; tone: string }
> = {
  aluno: {
    label: "Aluno",
    article: "o",
    description: "Ver provas, trabalhos e a agenda da escola.",
    icon: IconGraduationCap,
    tone: "bg-sky-50 text-sky-600 dark:bg-sky-500/15 dark:text-sky-300",
  },
  professor: {
    label: "Professor",
    article: "o",
    description: "Reservar espaços e publicar atividades. Requer e-mail cadastrado pela coordenação.",
    icon: IconPresentation,
    tone: "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-300",
  },
};

export function LoginScreen() {
  const { login } = useStore();
  const [role, setRole] = useState<UserRole | null>(null);
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  function chooseRole(next: UserRole) {
    setRole(next);
    setError(null);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!role) return;
    const result = validateEmail(email);
    if (!result.ok) {
      setError(
        result.reason === "dominio"
          ? `Domínio não aceito. Use um destes: ${ALLOWED_DOMAINS_LABEL}.`
          : "Digite um e-mail válido, como nome@gmail.com.",
      );
      return;
    }
    if (role === "professor" && !isRegisteredTeacher(result.email)) {
      setError("Este e-mail não está cadastrado como professor. Fale com a coordenação.");
      return;
    }
    if (!login(result.email, role)) {
      setError("Não foi possível entrar. Confira o e-mail e o perfil escolhido.");
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-950">
      <header className="flex items-center justify-between px-4 py-4 sm:px-8">
        <Brand />
        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          <SchoolThemeToggle />
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-4 pb-10 pt-2 sm:px-6">
        <div className="w-full max-w-md">
          {role === null ? (
            <section className="animate-fade-in rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 dark:border-slate-800 dark:bg-slate-900">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-2.5 py-1 text-[11px] font-semibold text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                Bem-vindo(a)
              </span>
              <h1 className="mt-3 text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                Como você vai acessar?
              </h1>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Escolha o seu perfil para continuar. Você poderá entrar com o e-mail da escola.
              </p>

              <div className="mt-5 space-y-3">
                {(Object.keys(ROLES) as UserRole[]).map((key) => {
                  const info = ROLES[key];
                  const Icon = info.icon;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => chooseRole(key)}
                      className="group flex w-full items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-left transition hover:border-indigo-300 hover:bg-indigo-50/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-indigo-400/40 dark:hover:bg-indigo-500/10"
                    >
                      <span
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${info.tone}`}
                      >
                        <Icon width={21} height={21} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-semibold text-slate-900 dark:text-slate-100">
                          Sou {key === "aluno" ? "aluno" : "professor"}
                        </span>
                        <span className="mt-0.5 block text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
                          {info.description}
                        </span>
                      </span>
                      <IconArrowRight
                        width={17}
                        height={17}
                        className="shrink-0 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-indigo-500 dark:text-slate-600 dark:group-hover:text-indigo-400"
                      />
                    </button>
                  );
                })}
              </div>

              <p className="mt-5 text-center text-[11px] leading-relaxed text-slate-400 dark:text-slate-500">
                Protótipo: o acesso é simulado e não pede senha. Seus dados ficam apenas neste
                navegador.
              </p>
            </section>
          ) : (
            <section className="animate-fade-in rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 dark:border-slate-800 dark:bg-slate-900">
              <button
                type="button"
                onClick={() => {
                  setRole(null);
                  setError(null);
                }}
                className="flex items-center gap-1 text-[11px] font-semibold text-slate-500 transition hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
              >
                <IconChevronLeft width={13} height={13} />
                Trocar perfil
              </button>

              <div className="mt-4 flex items-center gap-3">
                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${ROLES[role].tone}`}
                >
                  {(() => {
                    const Icon = ROLES[role].icon;
                    return <Icon width={21} height={21} />;
                  })()}
                </span>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-400">
                    Acesso de {ROLES[role].label.toLowerCase()}
                  </p>
                  <h1 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                    Entrar como {ROLES[role].label.toLowerCase()}
                  </h1>
                </div>
              </div>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                {role === "professor"
                  ? "Informe o e-mail cadastrado pela coordenação da escola."
                  : "Informe o seu e-mail da escola para acessar a agenda."}
              </p>

              <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                <Field
                  label="E-mail"
                  required
                  hint={
                    role === "professor"
                      ? "Use o e-mail de professor cadastrado pela coordenação."
                      : `Aceitos: ${ALLOWED_DOMAINS_LABEL}.`
                  }
                >
                  <input
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    autoFocus
                    className={inputClass}
                    placeholder={
                      role === "professor"
                        ? "nome.sobrenome@escola.pr.gov.br"
                        : "nome.sobrenome@gmail.com"
                    }
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      if (error) setError(null);
                    }}
                  />
                </Field>

                {error ? (
                  <div className="flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2.5 text-[11px] font-medium text-rose-700 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-300">
                    <IconAlert width={14} height={14} className="mt-0.5 shrink-0" />
                    {error}
                  </div>
                ) : null}

                <Button type="submit" className="w-full">
                  Entrar
                  <IconArrowRight width={15} height={15} />
                </Button>
              </form>

              <p className="mt-4 text-center text-[11px] leading-relaxed text-slate-400 dark:text-slate-500">
                Ainda não tem acesso? Fale com a coordenação da escola.
              </p>
            </section>
          )}
        </div>
      </main>

      <footer className="px-4 pb-6 text-center text-[11px] text-slate-400 dark:text-slate-600">
        Escola Municipal Horizonte · Agenda Escolar
      </footer>
    </div>
  );
}
