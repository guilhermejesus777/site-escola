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
  deleteExtraUser,
  deletePasswordHash,
  getExtraUser,
  getSolicitacao,
  insertExtraUser,
  insertSolicitacao,
  listExtraUsers,
  listPasswordEmails,
  listSolicitacoes,
  setPasswordHash,
  setSolicitacaoStatus,
  updateExtraUser,
  type StoredRequest,
  type StoredUser,
} from "@/lib/db";
import { normalizeEmail } from "@/lib/email";
import { hashPassword } from "@/lib/password";
import type { UserRole } from "@/types";

export type AppUser = {
  email: string;
  name: string;
  role: UserRole;
  admin: boolean;
  source: "escola" | "admin";
};

export type AdminUser = AppUser & { hasPassword: boolean };

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

export async function listAppUsers(): Promise<AdminUser[]> {
  const map = new Map<string, AdminUser>();
  const withPassword = new Set(await listPasswordEmails());

  for (const user of listRegisteredUsers()) {
    map.set(user.email, {
      ...withAdmin(user, "escola"),
      hasPassword: withPassword.has(user.email),
    });
  }

  for (const user of await listExtraUsers()) {
    if (!map.has(user.email)) {
      map.set(user.email, {
        ...withAdmin(user, "admin"),
        hasPassword: withPassword.has(user.email),
      });
    }
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
  roleOverride?: UserRole,
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

    // O administrador pode aprovar com um perfil diferente do que a pessoa
    // pediu (por exemplo, pediu professor, mas foi aprovada como aluno).
    const role: UserRole =
      roleOverride === "professor" || roleOverride === "aluno"
        ? roleOverride
        : request.role;

    await addAppUser({
      email: request.email,
      name: request.name,
      role,
    });
    await setSolicitacaoStatus(id, "aprovada", role);
    return { ...request, role, status: "aprovada" };
  }

  await setSolicitacaoStatus(id, "recusada");
  return { ...request, status: "recusada" };
}

/* ---------------------- Gerenciamento pelo administrador ---------------------- */

export const MIN_PASSWORD_LENGTH = 8;
export const MAX_PASSWORD_LENGTH = 200;

function checkPassword(password: string): void {
  if (password.length < MIN_PASSWORD_LENGTH) {
    throw new Error(
      `A senha precisa ter pelo menos ${MIN_PASSWORD_LENGTH} caracteres.`,
    );
  }
  if (password.length > MAX_PASSWORD_LENGTH) {
    throw new Error("A senha é muito longa.");
  }
}

/** Cria ou redefine a senha individual de um e-mail cadastrado. */
export async function setAppUserPassword(
  email: string,
  password: string,
): Promise<AppUser> {
  checkPassword(password);

  const user = await findAppUser(email);
  if (!user) throw new Error("Este e-mail não está cadastrado.");

  await setPasswordHash(user.email, hashPassword(password));
  return user;
}

/** Apaga a senha individual, voltando a exigir Google/senha mestra. */
export async function removeAppUserPassword(
  email: string,
): Promise<AppUser> {
  const user = await findAppUser(email);
  if (!user) throw new Error("Este e-mail não está cadastrado.");

  await deletePasswordHash(user.email);
  return user;
}

export type UpdateUserInput = {
  name?: string;
  role?: UserRole;
};

/** Edita nome/perfil de uma conta criada pelo administrador. */
export async function updateAppUser(
  email: string,
  input: UpdateUserInput,
): Promise<AppUser> {
  const user = await findAppUser(email);
  if (!user) throw new Error("Este e-mail não está cadastrado.");
  if (user.source === "escola") {
    throw new Error(
      "Contas da lista fixa da escola não podem ser editadas — só remover a senha ou cadastrar uma nova.",
    );
  }

  const name = (input.name ?? user.name).trim();
  if (name.length < 2 || name.length > 100) {
    throw new Error("Informe o nome completo da pessoa.");
  }

  const role: UserRole =
    input.role === "professor" || input.role === "aluno"
      ? input.role
      : user.role;

  const updated = await updateExtraUser(user.email, { name, role });
  if (!updated) throw new Error("Este e-mail não está mais cadastrado.");

  return { ...user, name, role };
}

/** Remove uma conta criada pelo administrador (e a senha dela). */
export async function removeAppUser(email: string): Promise<AppUser> {
  const user = await findAppUser(email);
  if (!user) throw new Error("Este e-mail não está cadastrado.");
  if (user.source === "escola") {
    throw new Error(
      "Contas da lista fixa da escola não podem ser removidas por aqui.",
    );
  }
  if (isAdminEmail(user.email)) {
    throw new Error("A conta do administrador não pode ser removida.");
  }

  const removed = await deleteExtraUser(user.email);
  if (!removed) throw new Error("Este e-mail não está mais cadastrado.");
  await deletePasswordHash(user.email);

  return user;
}
