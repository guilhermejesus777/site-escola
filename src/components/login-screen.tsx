"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Brand } from "@/components/app-shell";
import {
  IconAlert,
  IconArrowRight,
  IconChevronLeft,
  IconEye,
  IconEyeOff,
  IconGraduationCap,
  IconLock,
  IconMail,
  IconPresentation,
} from "@/components/icons";
import { ThemeToggle } from "@/components/theme-toggle";
import { SchoolThemeToggle } from "@/components/school-theme-toggle";
import { Button, Modal } from "@/components/ui";
import { GOOGLE_CLIENT_ID } from "@/lib/google";
import { useStore } from "@/lib/store";
import type { UserRole } from "@/types";

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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [activation, setActivation] = useState(false);
  const [activationUser, setActivationUser] = useState<{
    email: string;
    name: string;
  } | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [activationError, setActivationError] = useState<string | null>(null);
  const [savingPassword, setSavingPassword] = useState(false);
  const googleButtonRef = useRef<HTMLDivElement | null>(null);
  const activationRef = useRef(false);

  useEffect(() => {
    activationRef.current = activation;
  }, [activation]);

  function chooseRole(next: UserRole) {
    setRole(next);
    setError(null);
    setActivation(false);
  }

  async function handlePasswordLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!role) return;

    setError(null);
    setSubmitting(true);
    try {
      const response = await fetch("/api/auth/senha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });
      const data = (await response.json().catch(() => null)) as {
        email?: string;
        name?: string;
        error?: string;
      } | null;

      if (!response.ok || !data?.email) {
        setError(
          data?.error ??
            (response.status === 404
              ? "O servidor não encontrou a rota de login. Atualize a página e tente de novo."
              : "Não foi possível entrar com esse e-mail e senha."),
        );
        return;
      }

      if (!login(data.email, role, data.name)) {
        setError("Não foi possível entrar. Confira os dados com a coordenação.");
      }
    } catch {
      setError("Falha de conexão. Verifique a internet e tente novamente.");
    } finally {
      setSubmitting(false);
    }
  }

  async function saveMyPassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!activationUser || !role) return;

    if (newPassword.length < 8) {
      setActivationError("A senha precisa ter pelo menos 8 caracteres.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setActivationError("As duas senhas não são iguais.");
      return;
    }

    setSavingPassword(true);
    setActivationError(null);
    try {
      const response = await fetch("/api/usuarios/minha-senha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: newPassword }),
      });
      const data = (await response.json().catch(() => null)) as {
        ok?: boolean;
        error?: string;
      } | null;

      if (!response.ok || !data?.ok) {
        setActivationError(data?.error ?? "Não foi possível criar a sua senha.");
        return;
      }

      const user = activationUser;
      setActivationUser(null);
      setNewPassword("");
      setConfirmPassword("");
      setActivation(false);
      if (!login(user.email, role, user.name)) {
        setError("Senha criada, mas não foi possível entrar. Tente novamente.");
      }
    } catch {
      setActivationError("Falha de conexão. Tente novamente.");
    } finally {
      setSavingPassword(false);
    }
  }

  function skipActivation() {
    if (!activationUser || !role) return;
    const user = activationUser;
    setActivationUser(null);
    setNewPassword("");
    setConfirmPassword("");
    setActivation(false);
    if (!login(user.email, role, user.name)) {
      setError("Não foi possível entrar. Confira se o e-mail está cadastrado.");
    }
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

            // Ativação de primeiro acesso: o Google confirmou o e-mail.
            // Antes de entrar, a pessoa cria a própria senha de acesso.
            if (activationRef.current) {
              try {
                const statusResponse = await fetch("/api/usuarios/minha-senha", {
                  cache: "no-store",
                });
                const status = (await statusResponse.json().catch(() => null)) as {
                  hasPassword?: boolean;
                } | null;

                if (statusResponse.ok) {
                  if (status?.hasPassword) {
                    setActivation(false);
                    setError(
                      "Este e-mail já tem senha de acesso. Você entrou pelo Google; para trocar a senha, fale com a coordenação.",
                    );
                  } else {
                    setActivationUser({
                      email: data.email,
                      name: data.name ?? data.email,
                    });
                    return;
                  }
                }
              } catch {
                // Sem resposta do servidor: segue com o login normal.
              }
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
                Escolha o seu perfil para entrar com e-mail e senha ou com a conta Google.
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
                Você pode entrar com a senha de acesso fornecida pela coordenação ou com a sua conta
                Google da escola.
              </p>
            </section>
          ) : (
            <section className="animate-fade-in rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 dark:border-slate-800 dark:bg-slate-900">
              <button
                type="button"
                onClick={() => {
                  setRole(null);
                  setError(null);
                  setActivation(false);
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
                  ? "Entre com o e-mail e a senha de acesso cadastrados pela coordenação."
                  : "Entre com o seu e-mail e a senha de acesso fornecida pela escola."}
              </p>

              <form onSubmit={handlePasswordLogin} className="mt-5 space-y-3" noValidate>
                <label className="block">
                  <span className="mb-1.5 block text-[11px] font-semibold text-slate-600 dark:text-slate-300">
                    E-mail
                  </span>
                  <span className="relative block">
                    <IconMail
                      width={16}
                      height={16}
                      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500"
                    />
                    <input
                      type="email"
                      required
                      autoComplete="username"
                      inputMode="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="seu.email@escola.pr.gov.br"
                      className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-600"
                    />
                  </span>
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-[11px] font-semibold text-slate-600 dark:text-slate-300">
                    Senha de acesso
                  </span>
                  <span className="relative block">
                    <IconLock
                      width={16}
                      height={16}
                      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500"
                    />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      autoComplete="current-password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder="Digite a sua senha de acesso"
                      className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-10 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-600"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((value) => !value)}
                      aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
                      className="absolute right-1.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:text-slate-500 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                    >
                      {showPassword ? (
                        <IconEyeOff width={16} height={16} />
                      ) : (
                        <IconEye width={16} height={16} />
                      )}
                    </button>
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={submitting || loading}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:from-indigo-600 hover:to-violet-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {submitting ? "Entrando..." : "Entrar"}
                  {!submitting ? <IconArrowRight width={16} height={16} /> : null}
                </button>

                <p className="text-center text-[11px] leading-relaxed text-slate-400 dark:text-slate-500">
                  Esqueceu a senha? Fale com a coordenação.
                  <br />A senha de acesso não é a mesma da conta Google.
                </p>
              </form>

              <div className="my-5 flex items-center gap-3">
                <span className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
                <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
                  ou
                </span>
                <span className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
              </div>

              {activation ? (
                <div className="mb-3 flex items-start gap-2 rounded-xl border border-indigo-200 bg-indigo-50 px-3 py-2.5 text-[11px] leading-relaxed text-indigo-800 dark:border-indigo-500/30 dark:bg-indigo-500/10 dark:text-indigo-200">
                  <IconAlert width={14} height={14} className="mt-0.5 shrink-0" />
                  <span className="flex-1">
                    <strong className="font-semibold">Primeiro acesso:</strong> entre com o Google
                    para confirmar seu e-mail. Depois você cria a sua senha e passa a entrar dos
                    dois jeitos.
                  </span>
                  <button
                    type="button"
                    onClick={() => setActivation(false)}
                    className="shrink-0 font-semibold underline underline-offset-2"
                  >
                    Cancelar
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setActivation(true);
                    setError(null);
                  }}
                  className="mb-3 flex w-full items-center justify-center gap-1.5 rounded-xl border border-dashed border-slate-300 px-3 py-2 text-[11px] font-semibold text-slate-600 transition hover:border-indigo-300 hover:bg-indigo-50/50 hover:text-indigo-700 dark:border-slate-700 dark:text-slate-300 dark:hover:border-indigo-400/40 dark:hover:bg-indigo-500/10 dark:hover:text-indigo-300"
                >
                  <IconLock width={13} height={13} />
                  Primeiro acesso? Criar a minha senha
                </button>
              )}

              <p className="mb-3 text-center text-[11px] font-medium text-slate-500 dark:text-slate-400">
                Entrar com a conta Google da escola
              </p>

              {GOOGLE_CLIENT_ID ? (
                <div className="flex flex-col items-center">
                  <div ref={googleButtonRef} className="flex min-h-11 justify-center" />
                  {loading ? (
                    <p className="mt-3 text-[11px] font-medium text-slate-500 dark:text-slate-400">
                      Verificando sua conta Google...
                    </p>
                  ) : null}
                  <p className="mt-3 text-center text-[11px] leading-relaxed text-slate-400 dark:text-slate-500">
                    Sua senha do Google é digitada no Google, nunca neste site.
                  </p>
                </div>
              ) : (
                <div className="flex items-start gap-2.5 rounded-xl border border-amber-200 bg-amber-50 px-3.5 py-3 text-[11px] leading-relaxed text-amber-800 dark:border-amber-400/30 dark:bg-amber-400/10 dark:text-amber-200">
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
        Colégio Estadual Presidente Kennedy · Agenda Escolar
      </footer>

      <Modal
        open={activationUser !== null}
        onClose={skipActivation}
        title="Crie a sua senha de acesso"
        description={activationUser ? activationUser.email : undefined}
        footer={
          <>
            <Button variant="secondary" onClick={skipActivation}>
              Agora não
            </Button>
            <Button
              type="submit"
              form="form-primeiro-acesso"
              disabled={savingPassword || newPassword.length < 8}
            >
              {savingPassword ? "Criando…" : "Criar senha"}
            </Button>
          </>
        }
      >
        <form id="form-primeiro-acesso" onSubmit={saveMyPassword} className="space-y-3">
          <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
            O Google confirmou que este e-mail é seu. Crie uma senha para também entrar sem o
            Google. Ela é <strong className="font-semibold">diferente da senha do Google</strong>.
          </p>

          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Nova senha de acesso
            </span>
            <span className="relative block">
              <IconLock
                width={16}
                height={16}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500"
              />
              <input
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                autoComplete="new-password"
                placeholder="Mínimo de 8 caracteres"
                className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-10 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-600"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword((value) => !value)}
                aria-label={showNewPassword ? "Esconder senha" : "Mostrar senha"}
                className="absolute right-1.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:text-slate-500 dark:hover:bg-slate-800 dark:hover:text-slate-200"
              >
                {showNewPassword ? (
                  <IconEyeOff width={16} height={16} />
                ) : (
                  <IconEye width={16} height={16} />
                )}
              </button>
            </span>
          </label>

          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Repita a senha
            </span>
            <input
              type={showNewPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              autoComplete="new-password"
              placeholder="Digite a senha novamente"
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-600"
            />
          </label>

          {activationError ? (
            <div className="flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2.5 text-[11px] font-medium text-rose-700 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-300">
              <IconAlert width={14} height={14} className="mt-0.5 shrink-0" />
              {activationError}
            </div>
          ) : null}

          <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
            Se esquecer a senha depois, a coordenação pode definir outra no painel.
          </p>
        </form>
      </Modal>
    </div>
  );
}
