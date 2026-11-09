"use client";

import { useEffect, useRef, useState } from "react";
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
import { useStore } from "@/lib/store";
import type { UserRole } from "@/types";

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "";

type GoogleCredentialResponse = { credential?: string };
type GoogleIdentity = {
  initialize: (options: {
    client_id: string;
    callback: (response: GoogleCredentialResponse) => void;
    ux_mode?: "popup" | "redirect";
    auto_select?: boolean;
  }) => void;
  renderButton: (parent: HTMLElement, options: Record<string, unknown>) => void;
};

declare global {
  interface Window {
    google?: { accounts?: { id?: GoogleIdentity } };
  }
}

const ROLES: Record<
  UserRole,
  { label: string; description: string; icon: typeof IconGraduationCap; tone: string }
> = {
  aluno: {
    label: "Aluno",
    description: "Ver provas, trabalhos e a agenda da escola.",
    icon: IconGraduationCap,
    tone: "bg-sky-50 text-sky-600 dark:bg-sky-500/15 dark:text-sky-300",
  },
  professor: {
    label: "Professor",
    description: "Reservar espaços e publicar atividades. Requer e-mail cadastrado pela coordenação.",
    icon: IconPresentation,
    tone: "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-300",
  },
};

export function LoginScreen() {
  const { login } = useStore();
  const [role, setRole] = useState<UserRole | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const googleButtonRef = useRef<HTMLDivElement | null>(null);

  function chooseRole(next: UserRole) {
    setRole(next);
    setError(null);
  }

  useEffect(() => {
    if (!role || !GOOGLE_CLIENT_ID) return;
    const currentRole = role;
    let cancelled = false;

    function renderButton() {
      if (cancelled) return;
      const identity = window.google?.accounts?.id;
      const container = googleButtonRef.current;
      if (!identity || !container) return;

      container.innerHTML = "";
      identity.initialize({
        client_id: GOOGLE_CLIENT_ID,
        ux_mode: "popup",
        callback: async (response) => {
          if (!response.credential) {
            setError("Não foi possível obter sua conta Google. Tente novamente.");
            return;
          }
          setLoading(true);
          setError(null);
          try {
            const result = await fetch("/api/auth/google", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ credential: response.credential, role: currentRole }),
            });
            const data = (await result.json()) as {
              email?: string;
              name?: string;
              error?: string;
            };
            if (!result.ok || !data.email) {
              setError(data.error ?? "Não foi possível entrar com essa conta Google.");
              return;
            }
            if (!login(data.email, currentRole, data.name)) {
              setError("Não foi possível entrar. Confira se o e-mail está cadastrado.");
            }
          } catch {
            setError("Falha de conexão ao validar sua conta Google. Tente novamente.");
          } finally {
            setLoading(false);
          }
        },
      });
      identity.renderButton(container, {
        theme: "filled_black",
        size: "large",
        shape: "pill",
        text: "signin_with",
        locale: "pt-BR",
        width: 300,
      });
    }

    const existing = document.querySelector<HTMLScriptElement>(
      'script[data-google-gsi="true"]',
    );
    if (existing) {
      if (window.google?.accounts?.id) {
        renderButton();
      } else {
        existing.addEventListener("load", renderButton);
      }
      return () => {
        cancelled = true;
        existing.removeEventListener("load", renderButton);
      };
    }

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.dataset.googleGsi = "true";
    script.addEventListener("load", renderButton);
    document.head.appendChild(script);

    return () => {
      cancelled = true;
      script.removeEventListener("load", renderButton);
    };
  }, [role, login]);

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
          {/* Foto do colégio — visível apenas no tema do colégio */}
          <div className="escola-banner overflow-hidden rounded-2xl border border-slate-200 shadow-sm dark:border-slate-800">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/escola-cepk.svg"
              alt="Entrada do Colégio Estadual Presidente Kennedy"
              className="h-32 w-full object-cover sm:h-40"
              draggable={false}
            />
            <p className="bg-white px-4 py-2.5 text-center text-sm font-semibold text-slate-800 dark:bg-slate-900 dark:text-slate-100">
              Colégio Estadual Presidente Kennedy
            </p>
          </div>

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
                Escolha o seu perfil. O acesso é feito com a sua conta Google da escola.
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
                O acesso usa a sua conta Google. A senha é digitada no Google e não passa por este
                site.
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
                  ? "Entre com a conta Google cadastrada pela coordenação."
                  : "Entre com a sua conta Google da escola para acessar a agenda."}
              </p>

              {GOOGLE_CLIENT_ID ? (
                <div className="mt-6 flex flex-col items-center">
                  <div ref={googleButtonRef} className="flex min-h-11 justify-center" />
                  {loading ? (
                    <p className="mt-3 text-[11px] font-medium text-slate-500 dark:text-slate-400">
                      Verificando sua conta Google...
                    </p>
                  ) : null}
                  <p className="mt-3 text-center text-[11px] leading-relaxed text-slate-400 dark:text-slate-500">
                    Sua senha é digitada no Google, nunca neste site.
                  </p>
                </div>
              ) : (
                <div className="mt-5 flex items-start gap-2.5 rounded-xl border border-amber-200 bg-amber-50 px-3.5 py-3 text-[11px] leading-relaxed text-amber-800 dark:border-amber-400/30 dark:bg-amber-400/10 dark:text-amber-200">
                  <IconAlert width={15} height={15} className="mt-0.5 shrink-0" />
                  <span>
                    O login com Google ainda não foi configurado. A coordenação precisa definir a
                    variável <code className="font-semibold">NEXT_PUBLIC_GOOGLE_CLIENT_ID</code> com
                    o Client ID do Google Cloud.
                  </span>
                </div>
              )}

              {error ? (
                <div className="mt-4 flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2.5 text-[11px] font-medium text-rose-700 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-300">
                  <IconAlert width={14} height={14} className="mt-0.5 shrink-0" />
                  {error}
                </div>
              ) : null}
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
