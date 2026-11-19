"use client";

import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import {
  IconAlert,
  IconCheck,
  IconGraduationCap,
  IconLock,
  IconMail,
  IconPlus,
  IconPresentation,
  IconShield,
  IconUsers,
  IconX,
} from "@/components/icons";
import {
  Badge,
  Button,
  ConfirmDialog,
  Field,
  Modal,
  Toast,
  inputClass,
} from "@/components/ui";
import { useStore } from "@/lib/store";
import type { UserRole } from "@/types";

type AdminUser = {
  email: string;
  name: string;
  role: UserRole;
  admin: boolean;
  source: "escola" | "admin";
  hasPassword: boolean;
};

type AdminRequest = {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  message: string;
  status: "pendente" | "aprovada" | "recusada";
  createdAt: string;
};

function roleLabel(role: UserRole): string {
  return role === "professor" ? "Professor" : "Aluno";
}

function RoleBadge({ role }: { role: UserRole }) {
  const Icon = role === "professor" ? IconPresentation : IconGraduationCap;
  return (
    <Badge tone={role === "professor" ? "indigo" : "sky"}>
      <Icon width={11} height={11} />
      {roleLabel(role)}
    </Badge>
  );
}

function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AdminPage() {
  const { user, switchRole } = useStore();

  const [users, setUsers] = useState<AdminUser[]>([]);
  const [requests, setRequests] = useState<AdminRequest[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newRole, setNewRole] = useState<UserRole>("aluno");
  const [addError, setAddError] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);

  const [decidingId, setDecidingId] = useState<string | null>(null);
  const [grantedRoles, setGrantedRoles] = useState<Record<string, UserRole>>({});

  const [managed, setManaged] = useState<AdminUser | null>(null);
  const [manageName, setManageName] = useState("");
  const [manageRole, setManageRole] = useState<UserRole>("aluno");
  const [managePassword, setManagePassword] = useState("");
  const [manageError, setManageError] = useState<string | null>(null);
  const [manageBusy, setManageBusy] = useState(false);
  const [removeTarget, setRemoveTarget] = useState<AdminUser | null>(null);
  const [passwordRemoveTarget, setPasswordRemoveTarget] =
    useState<AdminUser | null>(null);
  const [switching, setSwitching] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [toastTone, setToastTone] = useState<"success" | "error">("success");

  const closeToast = useCallback(() => setToast(null), []);

  const load = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const response = await fetch("/api/admin/usuarios", { cache: "no-store" });
      const data = (await response.json().catch(() => null)) as {
        ok?: boolean;
        users?: AdminUser[];
        requests?: AdminRequest[];
        error?: string;
      } | null;

      if (!response.ok || !data?.ok) {
        setLoadError(data?.error ?? "Não foi possível carregar as contas agora.");
        return;
      }

      setUsers(Array.isArray(data.users) ? data.users : []);
      setRequests(Array.isArray(data.requests) ? data.requests : []);
    } catch {
      setLoadError("Falha de conexão ao carregar as contas.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!user?.admin) return;
    const timer = setTimeout(() => void load(), 0);
    return () => clearTimeout(timer);
  }, [user?.admin, load]);

  const pending = useMemo(
    () => requests.filter((request) => request.status === "pendente"),
    [requests],
  );

  const history = useMemo(
    () => requests.filter((request) => request.status !== "pendente"),
    [requests],
  );

  const filteredUsers = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return users;
    return users.filter(
      (item) =>
        item.name.toLowerCase().includes(term) ||
        item.email.toLowerCase().includes(term),
    );
  }, [users, search]);

  if (!user?.admin) {
    return (
      <div className="animate-fade-in flex min-h-[60vh] items-center justify-center">
        <div className="max-w-sm rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 dark:bg-amber-500/15 dark:text-amber-300">
            <IconAlert width={22} height={22} />
          </span>
          <h1 className="mt-3 text-lg font-semibold text-slate-900 dark:text-slate-100">
            Acesso restrito
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Somente o administrador pode abrir esta área.
          </p>
          <Link
            href="/"
            className="mt-4 inline-flex h-10 items-center justify-center rounded-xl bg-indigo-600 px-4 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            Voltar ao início
          </Link>
        </div>
      </div>
    );
  }

  async function handleAddUser(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAddError(null);
    setAdding(true);
    try {
      const response = await fetch("/api/admin/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName, email: newEmail, role: newRole }),
      });
      const data = (await response.json().catch(() => null)) as {
        ok?: boolean;
        error?: string;
      } | null;

      if (!response.ok || !data?.ok) {
        setAddError(data?.error ?? "Não foi possível cadastrar este e-mail.");
        return;
      }

      setNewName("");
      setNewEmail("");
      setNewRole("aluno");
      setToastTone("success");
      setToast("E-mail cadastrado com sucesso. A pessoa já pode entrar.");
      await load();
    } catch {
      setAddError("Falha de conexão ao cadastrar o e-mail.");
    } finally {
      setAdding(false);
    }
  }

  async function handleDecision(
    id: string,
    action: "aprovar" | "recusar",
    role?: UserRole,
  ) {
    setDecidingId(id);
    try {
      const response = await fetch("/api/admin/solicitacoes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(role ? { id, action, role } : { id, action }),
      });
      const data = (await response.json().catch(() => null)) as {
        ok?: boolean;
        error?: string;
      } | null;

      if (!response.ok || !data?.ok) {
        setToastTone("error");
        setToast(data?.error ?? "Não foi possível analisar a solicitação.");
        return;
      }

      setToastTone("success");
      setToast(
        action === "aprovar"
          ? "Solicitação aprovada! A pessoa já pode entrar."
          : "Solicitação recusada.",
      );
      setGrantedRoles((current) => {
        if (!(id in current)) return current;
        const next = { ...current };
        delete next[id];
        return next;
      });
      await load();
    } catch {
      setToastTone("error");
      setToast("Falha de conexão ao analisar a solicitação.");
    } finally {
      setDecidingId(null);
    }
  }

  async function handleSwitch(role: UserRole) {
    if (role === user?.role) return;
    setSwitching(true);
    const error = await switchRole(role);
    setSwitching(false);
    if (error) {
      setToastTone("error");
      setToast(error);
    } else {
      setToastTone("success");
      setToast(`Agora você está navegando como ${roleLabel(role).toLowerCase()}.`);
    }
  }

  /* ------------------- Gerenciamento das contas cadastradas ------------------ */

  function openManage(item: AdminUser) {
    setManaged(item);
    setManageName(item.name);
    setManageRole(item.role);
    setManagePassword("");
    setManageError(null);
    setManageBusy(false);
  }

  function closeManage() {
    if (manageBusy) return;
    setManaged(null);
    setManagePassword("");
    setManageError(null);
  }

  async function adminRequest(
    method: "PATCH" | "DELETE",
    payload: Record<string, unknown>,
    email?: string,
  ): Promise<{ ok: boolean; error?: string }> {
    try {
      const response = await fetch(
        `/api/admin/usuarios${email ? `?email=${encodeURIComponent(email)}` : ""}`,
        {
          method,
          headers: { "Content-Type": "application/json" },
          body: method === "DELETE" ? undefined : JSON.stringify(payload),
        },
      );
      const data = (await response.json().catch(() => null)) as {
        ok?: boolean;
        error?: string;
      } | null;
      if (!response.ok || !data?.ok) {
        return {
          ok: false,
          error: data?.error ?? "Não foi possível concluir esta ação.",
        };
      }
      return { ok: true };
    } catch {
      return { ok: false, error: "Falha de conexão. Tente novamente." };
    }
  }

  async function handleSaveProfile() {
    if (!managed) return;
    setManageBusy(true);
    setManageError(null);
    const result = await adminRequest("PATCH", {
      action: "editar",
      email: managed.email,
      name: manageName,
      role: manageRole,
    });
    setManageBusy(false);
    if (!result.ok) {
      setManageError(result.error ?? null);
      return;
    }
    setManaged({ ...managed, name: manageName.trim(), role: manageRole });
    setToastTone("success");
    setToast("Dados da conta atualizados.");
    await load();
  }

  async function handleSavePassword() {
    if (!managed) return;
    if (managePassword.length < 8) {
      setManageError("A senha precisa ter pelo menos 8 caracteres.");
      return;
    }
    setManageBusy(true);
    setManageError(null);
    const result = await adminRequest("PATCH", {
      action: "senha",
      email: managed.email,
      password: managePassword,
    });
    setManageBusy(false);
    if (!result.ok) {
      setManageError(result.error ?? null);
      return;
    }
    setManagePassword("");
    setManaged({ ...managed, hasPassword: true });
    setToastTone("success");
    setToast("Senha definida. A pessoa já pode entrar com este e-mail e ela.");
    await load();
  }

  async function handleRemovePassword(item: AdminUser) {
    setManageBusy(true);
    const result = await adminRequest("PATCH", {
      action: "remover-senha",
      email: item.email,
    });
    setManageBusy(false);
    setPasswordRemoveTarget(null);
    if (!result.ok) {
      setToastTone("error");
      setToast(result.error ?? "Não foi possível remover a senha.");
      return;
    }
    if (managed?.email === item.email) {
      setManaged({ ...managed, hasPassword: false });
    }
    setToastTone("success");
    setToast("Senha removida. Esta conta só entra com Google ou senha mestra.");
    await load();
  }

  async function handleRemoveUser(item: AdminUser) {
    setManageBusy(true);
    const result = await adminRequest("DELETE", {}, item.email);
    setManageBusy(false);
    setRemoveTarget(null);
    if (!result.ok) {
      setToastTone("error");
      setToast(result.error ?? "Não foi possível remover este e-mail.");
      return;
    }
    if (managed?.email === item.email) setManaged(null);
    setToastTone("success");
    setToast(`${item.email} foi removido do cadastro.`);
    await load();
  }

  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-400">
          Área restrita
        </p>
        <h1 className="mt-1 flex items-center gap-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
          <IconShield width={22} height={22} className="text-indigo-500 dark:text-indigo-400" />
          Admin
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Cadastre contas, escolha o perfil de cada pessoa e aprove solicitações de acesso.
        </p>
      </div>

      {/* Troca de perfil do administrador */}
      <section className="rounded-2xl border border-indigo-200 bg-indigo-50/60 p-5 shadow-sm dark:border-indigo-500/30 dark:bg-indigo-500/10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-sm font-semibold text-indigo-900 dark:text-indigo-100">
              Entrar como aluno ou professor
            </h2>
            <p className="mt-0.5 text-[11px] leading-relaxed text-indigo-700/80 dark:text-indigo-200/80">
              Sua conta é administradora. Escolha o perfil que quer usar agora — o menu Admin
              continua disponível nos dois modos.
            </p>
          </div>
          <div className="inline-flex shrink-0 rounded-xl bg-white p-1 shadow-sm dark:bg-slate-900">
            {(["aluno", "professor"] as UserRole[]).map((role) => {
              const active = user.role === role;
              const Icon = role === "professor" ? IconPresentation : IconGraduationCap;
              return (
                <button
                  key={role}
                  type="button"
                  onClick={() => handleSwitch(role)}
                  disabled={switching || active}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition disabled:cursor-default ${
                    active
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                  }`}
                >
                  <Icon width={14} height={14} />
                  {roleLabel(role)}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <div className="grid gap-5 lg:grid-cols-2">
        {/* Cadastro direto */}
        <section className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <header className="border-b border-slate-100 px-5 py-4 dark:border-slate-800">
            <h2 className="flex items-center gap-1.5 text-sm font-semibold text-slate-900 dark:text-slate-100">
              <IconPlus width={15} height={15} className="text-indigo-500 dark:text-indigo-400" />
              Cadastrar e-mail
            </h2>
            <p className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">
              Adicione uma conta escolhendo se a pessoa é aluno ou professor.
            </p>
          </header>
          <form onSubmit={handleAddUser} className="space-y-3 px-5 py-4">
            <Field label="Nome completo" required>
              <input
                type="text"
                required
                value={newName}
                onChange={(event) => setNewName(event.target.value)}
                placeholder="Ex.: Maria Oliveira"
                className={inputClass}
              />
            </Field>

            <Field label="E-mail" required hint="Domínios permitidos pelo app.">
              <input
                type="email"
                required
                inputMode="email"
                value={newEmail}
                onChange={(event) => setNewEmail(event.target.value)}
                placeholder="maria.oliveira@escola.pr.gov.br"
                className={inputClass}
              />
            </Field>

            <div>
              <span className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Perfil
              </span>
              <div className="grid grid-cols-2 gap-2">
                {(["aluno", "professor"] as UserRole[]).map((role) => {
                  const Icon = role === "professor" ? IconPresentation : IconGraduationCap;
                  const active = newRole === role;
                  return (
                    <button
                      key={role}
                      type="button"
                      onClick={() => setNewRole(role)}
                      aria-pressed={active}
                      className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 text-left text-xs font-semibold transition ${
                        active
                          ? "border-indigo-400 bg-indigo-50 text-indigo-700 dark:border-indigo-400/50 dark:bg-indigo-500/15 dark:text-indigo-200"
                          : "border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                      }`}
                    >
                      <Icon width={16} height={16} />
                      {roleLabel(role)}
                      {active ? (
                        <IconCheck width={13} height={13} className="ml-auto" />
                      ) : null}
                    </button>
                  );
                })}
              </div>
            </div>

            {addError ? (
              <div className="flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2.5 text-[11px] font-medium text-rose-700 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-300">
                <IconAlert width={14} height={14} className="mt-0.5 shrink-0" />
                {addError}
              </div>
            ) : null}

            <Button type="submit" disabled={adding} className="w-full">
              <IconPlus width={15} height={15} />
              {adding ? "Cadastrando…" : "Cadastrar e-mail"}
            </Button>
          </form>
        </section>

        {/* Solicitações pendentes */}
        <section className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <header className="flex items-center justify-between gap-3 border-b border-slate-100 px-5 py-4 dark:border-slate-800">
            <div>
              <h2 className="flex items-center gap-1.5 text-sm font-semibold text-slate-900 dark:text-slate-100">
                <IconMail width={15} height={15} className="text-amber-500 dark:text-amber-400" />
                Solicitações de acesso
              </h2>
              <p className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">
                Pedidos enviados por e-mails @escola que ainda não têm conta.
              </p>
            </div>
            <Badge tone={pending.length > 0 ? "amber" : "slate"}>
              {pending.length} pendente{pending.length === 1 ? "" : "s"}
            </Badge>
          </header>

          <div className="px-5 py-4">
            {loading ? (
              <p className="py-6 text-center text-xs text-slate-500 dark:text-slate-400">
                Carregando solicitações…
              </p>
            ) : loadError ? (
              <div className="flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2.5 text-[11px] font-medium text-rose-700 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-300">
                <IconAlert width={14} height={14} className="mt-0.5 shrink-0" />
                <span className="flex-1">{loadError}</span>
                <button
                  type="button"
                  onClick={() => void load()}
                  className="shrink-0 font-semibold underline underline-offset-2"
                >
                  Tentar de novo
                </button>
              </div>
            ) : pending.length === 0 ? (
              <div className="rounded-xl border border-dashed border-slate-200 px-4 py-8 text-center dark:border-slate-700">
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                  Nenhuma solicitação pendente
                </p>
                <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                  Quando alguém pedir cadastro pelo site, o pedido aparece aqui.
                </p>
              </div>
            ) : (
              <ul className="space-y-3">
                {pending.map((request) => (
                  <li
                    key={request.id}
                    className="rounded-xl border border-slate-200 p-3.5 dark:border-slate-700"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate text-xs font-semibold text-slate-900 dark:text-slate-100">
                          {request.name}
                        </p>
                        <p className="mt-0.5 flex items-center gap-1 truncate text-[11px] text-slate-500 dark:text-slate-400">
                          <IconMail width={11} height={11} />
                          {request.email}
                        </p>
                      </div>
                      <RoleBadge role={request.role} />
                    </div>

                    {request.message ? (
                      <p className="mt-2 rounded-lg bg-slate-50 px-2.5 py-2 text-[11px] leading-relaxed text-slate-600 dark:bg-slate-800/60 dark:text-slate-300">
                        {request.message}
                      </p>
                    ) : null}

                    <p className="mt-1.5 text-[10px] text-slate-400 dark:text-slate-500">
                      Enviada em {formatDate(request.createdAt)}
                    </p>

                    {(() => {
                      const granted = grantedRoles[request.id] ?? request.role;
                      return (
                        <div className="mt-3">
                          <span className="mb-1 block text-[10px] font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
                            Aprovar como
                          </span>
                          <div className="grid grid-cols-2 gap-2">
                            {(["aluno", "professor"] as UserRole[]).map((role) => {
                              const Icon =
                                role === "professor" ? IconPresentation : IconGraduationCap;
                              const active = granted === role;
                              return (
                                <button
                                  key={role}
                                  type="button"
                                  onClick={() =>
                                    setGrantedRoles((current) => ({
                                      ...current,
                                      [request.id]: role,
                                    }))
                                  }
                                  aria-pressed={active}
                                  disabled={decidingId === request.id}
                                  className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-left text-[11px] font-semibold transition disabled:cursor-default ${
                                    active
                                      ? "border-indigo-400 bg-indigo-50 text-indigo-700 dark:border-indigo-400/50 dark:bg-indigo-500/15 dark:text-indigo-200"
                                      : "border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                                  }`}
                                >
                                  <Icon width={14} height={14} />
                                  {roleLabel(role)}
                                  {active ? (
                                    <IconCheck width={12} height={12} className="ml-auto" />
                                  ) : null}
                                </button>
                              );
                            })}
                          </div>
                          {granted !== request.role ? (
                            <p className="mt-1 text-[10px] text-amber-600 dark:text-amber-400">
                              A pessoa pediu {roleLabel(request.role).toLowerCase()}; será
                              cadastrada como {roleLabel(granted).toLowerCase()}.
                            </p>
                          ) : null}
                        </div>
                      );
                    })()}

                    <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                      <Button
                        size="sm"
                        onClick={() =>
                          void handleDecision(
                            request.id,
                            "aprovar",
                            grantedRoles[request.id] ?? request.role,
                          )
                        }
                        disabled={decidingId === request.id}
                        className="flex-1"
                      >
                        <IconCheck width={13} height={13} />
                        Aprovar
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => void handleDecision(request.id, "recusar")}
                        disabled={decidingId === request.id}
                        className="flex-1"
                      >
                        <IconX width={13} height={13} />
                        Recusar
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </div>

      {/* Contas cadastradas */}
      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <header className="flex flex-col gap-3 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
          <div>
            <h2 className="flex items-center gap-1.5 text-sm font-semibold text-slate-900 dark:text-slate-100">
              <IconUsers width={15} height={15} className="text-indigo-500 dark:text-indigo-400" />
              Contas cadastradas
            </h2>
            <p className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">
              {users.length} conta{users.length === 1 ? "" : "s"} — alunos, professores e a lista
              fixa da escola.
            </p>
          </div>
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Buscar por nome ou e-mail"
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/15 sm:max-w-xs dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500"
          />
        </header>

        <div className="max-h-96 overflow-y-auto">
          {loading ? (
            <p className="px-5 py-8 text-center text-xs text-slate-500 dark:text-slate-400">
              Carregando contas…
            </p>
          ) : loadError ? (
            <p className="px-5 py-8 text-center text-xs text-slate-500 dark:text-slate-400">
              {loadError}
            </p>
          ) : filteredUsers.length === 0 ? (
            <p className="px-5 py-8 text-center text-xs text-slate-500 dark:text-slate-400">
              Nenhuma conta encontrada para “{search}”.
            </p>
          ) : (
            <ul className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredUsers.map((item) => (
                <li
                  key={item.email}
                  className="flex flex-wrap items-center gap-3 px-5 py-3"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[11px] font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                    {item.name
                      .trim()
                      .split(/\s+/)
                      .filter(Boolean)
                      .slice(0, 2)
                      .map((part) => part[0])
                      .join("")
                      .toUpperCase() || "?"}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="flex items-center gap-1.5 truncate text-xs font-semibold text-slate-900 dark:text-slate-100">
                      {item.name}
                      {item.admin ? (
                        <span className="inline-flex items-center gap-0.5 rounded-full bg-indigo-50 px-1.5 py-0.5 text-[9px] font-semibold text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300">
                          <IconShield width={9} height={9} />
                          Admin
                        </span>
                      ) : null}
                    </p>
                    <p className="mt-0.5 truncate text-[11px] text-slate-500 dark:text-slate-400">
                      {item.email}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <RoleBadge role={item.role} />
                    <Badge tone={item.hasPassword ? "emerald" : "slate"}>
                      <IconLock width={10} height={10} />
                      {item.hasPassword ? "Com senha" : "Sem senha"}
                    </Badge>
                    <span className="hidden text-[10px] text-slate-400 sm:inline dark:text-slate-500">
                      {item.source === "escola" ? "Lista da escola" : "Cadastro admin"}
                    </span>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => openManage(item)}
                    >
                      Gerenciar
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* Histórico de solicitações */}
      {history.length > 0 ? (
        <section className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <header className="border-b border-slate-100 px-5 py-4 dark:border-slate-800">
            <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              Solicitações já analisadas
            </h2>
            <p className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">
              Histórico de aprovações e recusas.
            </p>
          </header>
          <ul className="divide-y divide-slate-100 dark:divide-slate-800">
            {history.map((request) => (
              <li key={request.id} className="flex flex-wrap items-center gap-3 px-5 py-3">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-semibold text-slate-800 dark:text-slate-100">
                    {request.name}
                  </p>
                  <p className="truncate text-[11px] text-slate-500 dark:text-slate-400">
                    {request.email}
                  </p>
                </div>
                <RoleBadge role={request.role} />
                <Badge tone={request.status === "aprovada" ? "emerald" : "rose"}>
                  {request.status === "aprovada" ? "Aprovada" : "Recusada"}
                </Badge>
                <span className="text-[10px] text-slate-400 dark:text-slate-500">
                  {formatDate(request.createdAt)}
                </span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {/* Gerenciar conta */}
      <Modal
        open={Boolean(managed)}
        onClose={closeManage}
        title="Gerenciar conta"
        description={managed?.email}
        footer={
          managed ? (
            <>
              <Button
                variant="secondary"
                onClick={closeManage}
                disabled={manageBusy}
              >
                Fechar
              </Button>
              {managed.source === "admin" ? (
                <Button
                  onClick={() => void handleSaveProfile()}
                  disabled={manageBusy || !manageName.trim()}
                >
                  <IconCheck width={14} height={14} />
                  {manageBusy ? "Salvando…" : "Salvar nome e perfil"}
                </Button>
              ) : null}
            </>
          ) : null
        }
      >
        {managed ? (
          <div className="space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <RoleBadge role={managed.role} />
              <Badge tone={managed.hasPassword ? "emerald" : "slate"}>
                <IconLock width={10} height={10} />
                {managed.hasPassword ? "Senha individual ativa" : "Sem senha individual"}
              </Badge>
              <span className="text-[10px] text-slate-400 dark:text-slate-500">
                {managed.source === "escola" ? "Lista fixa da escola" : "Cadastro admin"}
              </span>
            </div>

            <Field label="Nome completo">
              <input
                type="text"
                value={manageName}
                onChange={(event) => setManageName(event.target.value)}
                disabled={managed.source === "escola" || manageBusy}
                className={`${inputClass} disabled:cursor-not-allowed disabled:opacity-60`}
              />
            </Field>

            <div>
              <span className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Perfil
              </span>
              <div className="grid grid-cols-2 gap-2">
                {(["aluno", "professor"] as UserRole[]).map((role) => {
                  const Icon =
                    role === "professor" ? IconPresentation : IconGraduationCap;
                  const active = manageRole === role;
                  return (
                    <button
                      key={role}
                      type="button"
                      onClick={() => setManageRole(role)}
                      disabled={managed.source === "escola" || manageBusy}
                      aria-pressed={active}
                      className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 text-left text-xs font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${
                        active
                          ? "border-indigo-400 bg-indigo-50 text-indigo-700 dark:border-indigo-400/50 dark:bg-indigo-500/15 dark:text-indigo-200"
                          : "border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                      }`}
                    >
                      <Icon width={16} height={16} />
                      {roleLabel(role)}
                      {active ? (
                        <IconCheck width={13} height={13} className="ml-auto" />
                      ) : null}
                    </button>
                  );
                })}
              </div>
              {managed.source === "escola" ? (
                <p className="mt-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                  Conta da lista fixa da escola: nome e perfil não podem ser
                  alterados por aqui. Você ainda pode definir a senha.
                </p>
              ) : null}
            </div>

            <div className="rounded-xl border border-slate-200 p-3.5 dark:border-slate-700">
              <p className="flex items-center gap-1.5 text-xs font-semibold text-slate-900 dark:text-slate-100">
                <IconLock width={14} height={14} className="text-indigo-500 dark:text-indigo-400" />
                Senha de acesso
              </p>
              <p className="mt-0.5 text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
                {managed.hasPassword
                  ? "Esta conta entra com e-mail e a senha definida aqui."
                  : "Esta conta ainda não tem senha individual — só entra com Google ou senha mestra."}
              </p>

              <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                <input
                  type="password"
                  value={managePassword}
                  onChange={(event) => setManagePassword(event.target.value)}
                  placeholder="Nova senha (mínimo 8 caracteres)"
                  autoComplete="new-password"
                  disabled={manageBusy}
                  className={`${inputClass} sm:flex-1`}
                />
                <Button
                  onClick={() => void handleSavePassword()}
                  disabled={manageBusy || managePassword.length < 8}
                  className="shrink-0"
                >
                  <IconCheck width={14} height={14} />
                  {managed.hasPassword ? "Redefinir" : "Definir senha"}
                </Button>
              </div>

              {managed.hasPassword ? (
                <button
                  type="button"
                  onClick={() => setPasswordRemoveTarget(managed)}
                  disabled={manageBusy}
                  className="mt-2 text-[11px] font-semibold text-rose-600 underline underline-offset-2 disabled:opacity-50 dark:text-rose-400"
                >
                  Remover senha desta conta
                </button>
              ) : null}
            </div>

            {manageError ? (
              <div className="flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2.5 text-[11px] font-medium text-rose-700 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-300">
                <IconAlert width={14} height={14} className="mt-0.5 shrink-0" />
                {manageError}
              </div>
            ) : null}

            {managed.source === "admin" && !managed.admin ? (
              <div className="rounded-xl border border-rose-200 p-3.5 dark:border-rose-500/30">
                <p className="text-xs font-semibold text-rose-700 dark:text-rose-300">
                  Remover cadastro
                </p>
                <p className="mt-0.5 text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
                  A conta deixa de poder entrar e a senha individual também é
                  apagada. Você pode cadastrar novamente depois.
                </p>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => setRemoveTarget(managed)}
                  disabled={manageBusy}
                  className="mt-2"
                >
                  Remover {managed.email}
                </Button>
              </div>
            ) : null}
          </div>
        ) : null}
      </Modal>

      <ConfirmDialog
        open={Boolean(removeTarget)}
        onClose={() => setRemoveTarget(null)}
        onConfirm={() => {
          if (removeTarget) void handleRemoveUser(removeTarget);
        }}
        title="Remover este e-mail?"
        description={`${removeTarget?.email ?? ""} perderá o acesso ao site e a senha individual será apagada.`}
        confirmLabel="Remover"
      />

      <ConfirmDialog
        open={Boolean(passwordRemoveTarget)}
        onClose={() => setPasswordRemoveTarget(null)}
        onConfirm={() => {
          if (passwordRemoveTarget) void handleRemovePassword(passwordRemoveTarget);
        }}
        title="Remover a senha?"
        description={`${passwordRemoveTarget?.email ?? ""} deixará de entrar com senha e precisará do login com Google ou da senha mestra.`}
        confirmLabel="Remover senha"
      />

      <Toast message={toast} tone={toastTone} onClose={closeToast} />
    </div>
  );
}
