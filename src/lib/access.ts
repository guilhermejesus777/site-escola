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

export const REGISTERED_TEACHERS: RegisteredTeacher[] = [
  { email: "ana.souza@escola.pr.gov.br", name: "Ana Souza" },
  { email: "carlos.lima@escola.pr.gov.br", name: "Carlos Lima" },
  { email: "mariana.alves@escola.pr.gov.br", name: "Mariana Alves" },
  { email: "rafael.costa@escola.pr.gov.br", name: "Rafael Costa" },
  { email: "juliana.reis@escola.pr.gov.br", name: "Juliana Reis" },
  { email: "pedro.martins@escola.pr.gov.br", name: "Pedro Martins" },
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
