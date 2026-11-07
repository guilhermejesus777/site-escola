/**
 * Código de acesso ao perfil de professor.
 *
 * No protótipo o código fica no código-fonte (qualquer pessoa com acesso ao
 * DevTools consegue vê-lo). Em produção, a validação deve acontecer no
 * servidor, junto com o login real.
 *
 * Troque o valor abaixo pelo código combinado com a coordenação.
 */
export const PROFESSOR_ACCESS_CODE = "1234";

export function isValidProfessorCode(code: string): boolean {
  return code.trim() === PROFESSOR_ACCESS_CODE;
}
