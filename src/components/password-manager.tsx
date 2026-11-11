"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  IconAlert,
  IconCheck,
  IconEye,
  IconEyeOff,
  IconLock,
  IconTrash,
  IconUsers,
} from "@/components/icons";
import { Badge, Button, ConfirmDialog, Modal, Toast, inputClass } from "@/components/ui";

type ManagedUser = {
  email: string;
  name: string;
  role: "professor" | "aluno";
  hasPassword: boolean;
  updatedAt: string | null;
};

type Target = { email: string; name: string } | null;

const GENERATED_CHARS =
  "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789@#$%&*";

function generatePassword(length = 12): string {
  const values = new Uint32Array(length);
  crypto.getRandomValues(values);
  return Array.from(values, (value) => GENERATED_CHARS[value % GENERATED_CHARS.length]).join(
    "",
  );
}

function initials(name: string): string {
  return (
    name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join("") || "?"
  );
}

function formatDate(value: string | null): string {
  if (!value) return "";
  try {
    return new Date(value).toLocaleDateString("pt-BR");
  } catch {
    return "";
  }
}

export function PasswordManager() {
  const [users, setUsers] = useState<ManagedUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [target, setTarget] = useState<Target>(null);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    name: string;
    email: string;
    password: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);
  const [removeTarget, setRemoveTarget] = useState<Target>(null);
  const [removing, setRemoving] = useState(false);
  const [toast, setToast] = useState<{ message: string; tone: "success" | "error" } | null>(
    null,
  );
  const closeToast = useCallback(() => setToast(null), []);

  const load = useCallback(async () => {
    try {
      const response = await fetch("/api/usuarios/senha", { cache: "no-store" });
      const data = (await response.json().catch(() => null)) as {
        ok?: boolean;
        users?: ManagedUser[];
        error?: string;
      } | null;

      if (!response.ok || !data?.ok || !Array.isArray(data.users)) {
        setLoadError(data?.error ?? "Não foi possível carregar as senhas.");
        return;
      }

      setUsers(data.users);
      setLoadError(null);
    } catch {
      setLoadError("Falha de conexão ao carregar as senhas.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- carga única ao abrir o painel
    void load();
  }, [load]);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return users;
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term) ||
        (user.role === "professor" ? "professor" : "aluno").includes(term),
    );
  }, [query, users]);

  const withPassword = users.filter((user) => user.hasPassword).length;

  function openEditor(user: ManagedUser) {
    setTarget({ email: user.email, name: user.name });
    setPassword("");
    setShowPassword(false);
    setFormError(null);
  }

  async function savePassword(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!target) return;

    if (password.length < 8) {
      setFormError("A senha precisa ter pelo menos 8 caracteres.");
      return;
    }

    setSaving(true);
    setFormError(null);
    try {
      const response = await fetch("/api/usuarios/senha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: target.email, password }),
      });
      const data = (await response.json().catch(() => null)) as {
        ok?: boolean;
        error?: string;
      } | null;

      if (!response.ok || !data?.ok) {
        setFormError(data?.error ?? "Não foi possível salvar a senha.");
        return;
      }

      setResult({ name: target.name, email: target.email, password });
      setTarget(null);
      setPassword("");
      setCopied(false);
      await load();
    } catch {
      setFormError("Falha de conexão. Tente novamente.");
    } finally {
      setSaving(false);
    }
  }

  async function removePassword() {
    if (!removeTarget) return;
    setRemoving(true);
    try {
      const response = await fetch("/api/usuarios/senha", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: removeTarget.email }),
      });
      const data = (await response.json().catch(() => null)) as {
        ok?: boolean;
        error?: string;
      } | null;

      if (!response.ok || !data?.ok) {
        setToast({
          message: data?.error ?? "Não foi possível remover a senha.",
          tone: "error",
        });
        return;
      }

      setToast({
        message: `Senha de ${removeTarget.name} removida. Essa pessoa não entra mais por senha.`,
        tone: "success",
      });
      setRemoveTarget(null);
      await load();
    } catch {
      setToast({ message: "Falha de conexão. Tente novamente.", tone: "error" });
    } finally {
      setRemoving(false);
    }
  }

  async function copyPassword() {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result.password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setToast({
        message: "Não foi possível copiar automaticamente. Selecione o texto e copie.",
        tone: "error",
      });
    }
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-4 dark:border-slate-800">
        <div>
          <h2 className="flex items-center gap-1.5 text-sm font-semibold text-slate-900 dark:text-slate-100">
            <IconLock width={15} height={15} className="text-slate-400 dark:text-slate-500" />
            Senhas de acesso
          </h2>
          <p className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">
            Cada aluno e professor entra com a própria senha. A coordenação define e troca.
          </p>
        </div>
        <Badge tone={withPassword === users.length && users.length > 0 ? "emerald" : "amber"}>
          {withPassword} de {users.length} com senha
        </Badge>
      </header>

      <div className="space-y-4 px-5 py-4">
        <div className="flex items-start gap-2.5 rounded-xl border border-indigo-100 bg-indigo-50/60 px-3.5 py-3 text-[11px] leading-relaxed text-indigo-800 dark:border-indigo-500/25 dark:bg-indigo-500/10 dark:text-indigo-200">
          <IconUsers width={15} height={15} className="mt-0.5 shrink-0" />
          <span>
            A senha do app é <strong className="font-semibold">diferente da senha do Google</strong>.
            Quem preferir continua entrando pelo botão Google, sem senha da escola.
          </span>
        </div>

        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Buscar por nome, e-mail ou perfil…"
          className={inputClass}
          aria-label="Buscar usuário"
        />

        {loading ? (
          <p className="py-6 text-center text-xs text-slate-500 dark:text-slate-400">
            Carregando usuários…
          </p>
        ) : loadError ? (
          <div className="flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2.5 text-[11px] font-medium text-rose-700 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-300">
            <IconAlert width={14} height={14} className="mt-0.5 shrink-0" />
            <span className="flex-1">{loadError}</span>
            <button
              type="button"
              onClick={() => {
                setLoading(true);
                void load();
              }}
              className="font-semibold underline underline-offset-2"
            >
              Tentar de novo
            </button>
          </div>
        ) : filtered.length === 0 ? (
          <p className="py-6 text-center text-xs text-slate-500 dark:text-slate-400">
            Nenhum usuário encontrado para “{query}”.
          </p>
        ) : (
          <ul className="max-h-[26rem] divide-y divide-slate-100 overflow-y-auto rounded-xl border border-slate-100 dark:divide-slate-800 dark:border-slate-800">
            {filtered.map((user) => (
              <li key={user.email} className="flex flex-wrap items-center gap-3 px-3.5 py-3">
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-[11px] font-bold ${
                    user.role === "professor"
                      ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-300"
                      : "bg-sky-50 text-sky-600 dark:bg-sky-500/15 dark:text-sky-300"
                  }`}
                >
                  {initials(user.name)}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="flex flex-wrap items-center gap-1.5 text-xs font-semibold text-slate-900 dark:text-slate-100">
                    {user.name}
                    <Badge tone={user.role === "professor" ? "indigo" : "sky"}>
                      {user.role === "professor" ? "Professor" : "Aluno"}
                    </Badge>
                    {user.hasPassword ? (
                      <Badge tone="emerald">
                        <IconCheck width={10} height={10} /> Com senha
                      </Badge>
                    ) : (
                      <Badge tone="amber">Sem senha</Badge>
                    )}
                  </p>
                  <p className="mt-0.5 truncate text-[11px] text-slate-500 dark:text-slate-400">
                    {user.email}
                    {user.hasPassword && user.updatedAt ? (
                      <span className="text-slate-400 dark:text-slate-500">
                        {" "}
                        · trocada em {formatDate(user.updatedAt)}
                      </span>
                    ) : null}
                  </p>
                </div>
                <div className="flex items-center gap-1.5">
                  <Button size="sm" variant="secondary" onClick={() => openEditor(user)}>
                    {user.hasPassword ? "Trocar senha" : "Definir senha"}
                  </Button>
                  {user.hasPassword ? (
                    <button
                      type="button"
                      onClick={() => setRemoveTarget({ email: user.email, name: user.name })}
                      aria-label={`Remover senha de ${user.name}`}
                      title="Remover senha"
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-500/10 dark:hover:text-rose-300"
                    >
                      <IconTrash width={14} height={14} />
                    </button>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        )}

        <p className="text-[10px] leading-relaxed text-slate-400 dark:text-slate-500">
          As senhas ficam salvas como hash scrypt no servidor — ninguém, nem a coordenação,
          consegue lê-las. Se alguém esquecer, basta definir uma nova aqui.
        </p>
      </div>

      <Modal
        open={target !== null}
        onClose={() => {
          setTarget(null);
          setFormError(null);
        }}
        title={users.find((user) => user.email === target?.email)?.hasPassword
          ? "Trocar senha"
          : "Definir senha"}
        description={target ? `${target.name} · ${target.email}` : undefined}
        footer={
          <>
            <Button
              variant="secondary"
              onClick={() => {
                setTarget(null);
                setFormError(null);
              }}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              form="form-senha-individual"
              disabled={saving || password.length < 8}
            >
              {saving ? "Salvando…" : "Salvar senha"}
            </Button>
          </>
        }
      >
        <form id="form-senha-individual" onSubmit={savePassword} className="space-y-3">
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
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="new-password"
                placeholder="Mínimo de 8 caracteres"
                className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-10 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-600"
              />
              <button
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
                className="absolute right-1.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:text-slate-500 dark:hover:bg-slate-800 dark:hover:text-slate-200"
              >
                {showPassword ? <IconEyeOff width={16} height={16} /> : <IconEye width={16} height={16} />}
              </button>
            </span>
          </label>

          <div className="flex flex-wrap items-center gap-2">
            <Button
              type="button"
              size="sm"
              variant="secondary"
              onClick={() => {
                setPassword(generatePassword());
                setShowPassword(true);
                setFormError(null);
              }}
            >
              Gerar senha forte
            </Button>
            <span className="text-[11px] text-slate-400 dark:text-slate-500">
              Depois de salvar, você poderá copiar e entregar ao usuário.
            </span>
          </div>

          {formError ? (
            <div className="flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2.5 text-[11px] font-medium text-rose-700 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-300">
              <IconAlert width={14} height={14} className="mt-0.5 shrink-0" />
              {formError}
            </div>
          ) : null}

          <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
            Evite senhas óbvias como o nome ou a data de nascimento. Esta senha não altera a
            conta Google.
          </p>
        </form>
      </Modal>

      <Modal
        open={result !== null}
        onClose={() => setResult(null)}
        title="Senha definida"
        description={result ? `${result.name} · ${result.email}` : undefined}
        footer={<Button onClick={() => setResult(null)}>Concluir</Button>}
      >
        <div className="space-y-3">
          <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
            Entregue esta senha para <strong className="font-semibold">{result?.name}</strong>.
            Ela não será mostrada de novo.
          </p>
          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 dark:border-slate-700 dark:bg-slate-950/60">
            <code className="min-w-0 flex-1 break-all text-sm font-semibold text-slate-900 dark:text-slate-100">
              {result?.password}
            </code>
            <Button size="sm" variant="secondary" onClick={copyPassword}>
              {copied ? "Copiado!" : "Copiar"}
            </Button>
          </div>
          <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
            Se perder esta senha, abra “Trocar senha” e defina outra.
          </p>
        </div>
      </Modal>

      <ConfirmDialog
        open={removeTarget !== null}
        onClose={() => setRemoveTarget(null)}
        onConfirm={() => void removePassword()}
        title="Remover a senha?"
        description={
          removeTarget
            ? `${removeTarget.name} deixará de entrar com e-mail e senha. O login com Google continua funcionando.`
            : ""
        }
        confirmLabel={removing ? "Removendo…" : "Sim, remover"}
      />

      <Toast
        message={toast?.message ?? null}
        tone={toast?.tone ?? "success"}
        onClose={closeToast}
      />
    </section>
  );
}
