/**
 * Professores autorizados a entrar com o perfil de professor.
 *
 * O app é um protótipo: esta lista fica no navegador. Em produção, os
 * professores devem ser cadastrados no banco e o acesso validado no servidor.
 */
export type RegisteredTeacher = {
  email: string;
  name: string;
};

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export const REGISTERED_TEACHERS: RegisteredTeacher[] = [
  // Cadastro real da coordenação. Adicione novos professores no mesmo formato:
  // { email: "nome.sobrenome@escola.pr.gov.br", name: "Nome Sobrenome" },
  { email: "cesar.chauchuty@escola.pr.gov.br", name: "Cesar Chauchuty" },
  { email: "guilherme.jesus24@escola.pr.gov.br", name: "Guilherme Jesus" },
];

export function findRegisteredTeacher(email: string): RegisteredTeacher | undefined {
  const normalized = email.trim().toLowerCase();
  return REGISTERED_TEACHERS.find((teacher) => teacher.email === normalized);
}

export function isRegisteredTeacher(email: string): boolean {
  return findRegisteredTeacher(email) !== undefined;
}

/** Lista de e-mails para exibir na tela de login durante a demonstração. */
export const REGISTERED_TEACHERS_LABEL = REGISTERED_TEACHERS.map(
  (teacher) => teacher.email,
).join(", ");

/**
 * Alunos autorizados a entrar com o perfil de aluno.
 *
 * O nome exibido vem da conta Google do aluno no momento do login.
 */
export const REGISTERED_STUDENTS: string[] = [
  "gelinski.renato@escola.pr.gov.br",
  "joel.gregorio.neto@escola.pr.gov.br",
  "dibner.garcia@escola.pr.gov.br",
  "ramos.bruno08@escola.pr.gov.br",
  "izabella.honorato.santos@escola.pr.gov.br",
  "ricardo.palhano@escola.pr.gov.br",
];

export function findRegisteredStudent(email: string): string | undefined {
  const normalized = email.trim().toLowerCase();
  return REGISTERED_STUDENTS.find((studentEmail) => studentEmail === normalized);
}

export function isRegisteredStudent(email: string): boolean {
  return findRegisteredStudent(email) !== undefined;
}

/**
 * Nome amigável a partir do e-mail (ex.: "joao.silva12" → "Joao Silva").
 * Usado para alunos, que não têm um nome próprio cadastrado.
 */
export function nameFromEmail(email: string): string {
  const local = normalizeEmail(email)
    .split("@")[0]
    .replace(/[._-]+/g, " ")
    .replace(/[0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const formatted = local
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  return formatted || "Aluno";
}

export type RegisteredUser = {
  email: string;
  name: string;
  role: "professor" | "aluno";
};

/** Todos os usuários que podem entrar no app (professores e alunos). */
export function listRegisteredUsers(): RegisteredUser[] {
  const teachers: RegisteredUser[] = REGISTERED_TEACHERS.map((teacher) => ({
    email: teacher.email,
    name: teacher.name,
    role: "professor",
  }));

  const students: RegisteredUser[] = REGISTERED_STUDENTS.map((email) => ({
    email,
    name: nameFromEmail(email),
    role: "aluno",
  }));

  return [...teachers, ...students].sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
}
