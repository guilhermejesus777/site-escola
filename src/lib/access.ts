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
  // Cadastro real da coordenação. Adicione novos professores no mesmo formato:
  // { email: "nome.sobrenome@escola.pr.gov.br", name: "Nome Sobrenome" },
  { email: "cesar.chauchuty@escola.pr.gov.br", name: "Cesar Chauchuty" },
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
  "guilherme.jesus24@escola.pr.gov.br",
];

export function findRegisteredStudent(email: string): string | undefined {
  const normalized = email.trim().toLowerCase();
  return REGISTERED_STUDENTS.find((studentEmail) => studentEmail === normalized);
}

export function isRegisteredStudent(email: string): boolean {
  return findRegisteredStudent(email) !== undefined;
}
