/**
 * Cadastro de usuários do app.
 *
 * Junta a lista fixa da escola (`access.ts`) com as contas criadas pelo
 * administrador e guardadas no PostgreSQL. Também cuida das solicitações de
 * cadastro enviadas por quem ainda não tem acesso.
 */
import { randomUUID } from "node:crypto";
import {
  findRegisteredUser,
  isAdminEmail,
  listRegisteredUsers,
  nameFromEmail,
  type RegisteredUser,
} from "@/lib/access";
import {
  getExtraUser,
  getSolicitacao,
  insertExtraUser,
  insertSolicitacao,
  listExtraUsers,
  listSolicitacoes,
  setSolicitacaoStatus,
  type StoredRequest,
  type StoredUser,
} from "@/lib/db";
import { normalizeEmail } from "@/lib/email";
import type { UserRole } from "@/types";

export type AppUser = {
  email: string;
  name: string;
  role: UserRole;
  admin: boolean;
  source: "escola" | "admin";
};

function withAdmin(user: RegisteredUser | StoredUser, source: AppUser["source"]): AppUser {
  return {
    email: user.email,
    name: user.name,
    role: user.role,
    admin: isAdminEmail(user.email),
    source,
  };
}

/** Procura primeiro na lista fixa da escola e depois nas contas do banco. */
export async function findAppUser(email: string): Promise<AppUser | null> {
  const normalized = normalizeEmail(email);

  const schoolUser = findRegisteredUser(normalized);
  if (schoolUser) return withAdmin(schoolUser, "escola");

  const stored = await getExtraUser(normalized);
  if (stored) return withAdmin(stored, "admin");

  return null;
}

export async function listAppUsers(): Promise<AppUser[]> {
  const map = new Map<string, AppUser>();

  for (const user of listRegisteredUsers()) {
    map.set(user.email, withAdmin(user, "escola"));
  }

  for (const user of await listExtraUsers()) {
    if (!map.has(user.email)) map.set(user.email, withAdmin(user, "admin"));
  }

  return Array.from(map.values()).sort((a, b) =>
    a.name.localeCompare(b.name, "pt-BR"),
  );
}

export function canUseRole(user: AppUser, role: UserRole): boolean {
  return user.admin || user.role === role;
}

export type NewUserInput = {
  email: string;
  name: string;
  role: UserRole;
};

/** Cadastro direto feito pelo administrador. */
export async function addAppUser(input: NewUserInput): Promise<AppUser> {
  const email = normalizeEmail(input.email);

  if (await findAppUser(email)) {
    throw new Error("Este e-mail já está cadastrado.");
  }

  const name = input.name.trim() || nameFromEmail(email);
  const user: StoredUser = {
    email,
    name,
    role: input.role,
    createdAt: new Date().toISOString(),
  };

  await insertExtraUser(user);
  return withAdmin(user, "admin");
}

export type NewRequestInput = {
  email: string;
  name: string;
  role: UserRole;
  message?: string;
};

/** Pedido de cadastro de quem ainda não está na lista da escola. */
export async function createSolicitacao(
  input: NewRequestInput,
): Promise<StoredRequest> {
  const email = normalizeEmail(input.email);

  if (await findAppUser(email)) {
    const error = new Error("Este e-mail já está cadastrado. Entre normalmente.");
    error.name = "AlreadyRegistered";
    throw error;
  }

  const pendentes = await listSolicitacoes();
  if (
    pendentes.some(
      (request) => request.email === email && request.status === "pendente",
    )
  ) {
    const error = new Error(
      "Já existe uma solicitação pendente para este e-mail. Aguarde a aprovação.",
    );
    error.name = "AlreadyRequested";
    throw error;
  }

  const request: StoredRequest = {
    id: `solicitacao-${randomUUID()}`,
    email,
    name: input.name.trim() || nameFromEmail(email),
    role: input.role,
    message: (input.message ?? "").trim().slice(0, 500),
    status: "pendente",
    createdAt: new Date().toISOString(),
  };

  await insertSolicitacao(request);
  return request;
}

export async function listSolicitacoesDoAdmin(): Promise<StoredRequest[]> {
  return listSolicitacoes();
}

export type RequestAction = "aprovar" | "recusar";

export async function decideSolicitacao(
  id: string,
  action: RequestAction,
): Promise<StoredRequest> {
  const request = await getSolicitacao(id);
  if (!request) throw new Error("Solicitação não encontrada.");
  if (request.status !== "pendente") {
    throw new Error("Esta solicitação já foi analisada.");
  }

  if (action === "aprovar") {
    if (await findAppUser(request.email)) {
      const error = new Error(
        "Este e-mail já está cadastrado. Recuse a solicitação.",
      );
      error.name = "AlreadyRegistered";
      throw error;
    }

    await addAppUser({
      email: request.email,
      name: request.name,
      role: request.role,
    });
    await setSolicitacaoStatus(id, "aprovada");
    return { ...request, status: "aprovada" };
  }

  await setSolicitacaoStatus(id, "recusada");
  return { ...request, status: "recusada" };
}
