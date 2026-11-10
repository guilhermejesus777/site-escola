import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Política de Privacidade — Agenda Escolar CEPK",
  description:
    "Como o Agenda Escolar do Colégio Estadual Presidente Kennedy trata os dados de alunos e professores.",
};

export default function PrivacidadePage() {
  return (
    <LegalPage
      title="Política de Privacidade"
      subtitle="Agenda Escolar do Colégio Estadual Presidente Kennedy"
      updatedAt="09 de novembro de 2026"
    >
      <LegalSection title="1. Quem somos">
        <p>
          O Agenda Escolar CEPK é um aplicativo escolar sem fins comerciais, usado para organizar
          reservas de espaços e divulgar provas e atividades do Colégio Estadual Presidente
          Kennedy.
        </p>
      </LegalSection>

      <LegalSection title="2. Dados coletados">
        <p>O aplicativo coleta apenas o necessário para o funcionamento da agenda escolar:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <strong>Nome e e-mail</strong> da conta Google usada no login, para identificar o
            aluno ou professor;
          </li>
          <li>
            <strong>Perfil de acesso</strong> (aluno ou professor), para aplicar as permissões
            corretas;
          </li>
          <li>
            <strong>Reservas e atividades</strong> criadas no app (espaço, data, horário, título e
            descrição).
          </li>
        </ul>
        <p>
          Não coletamos senhas. A senha da conta Google é digitada diretamente no Google e nunca
          passa pelo aplicativo.
        </p>
      </LegalSection>

      <LegalSection title="3. Como os dados são usados">
        <p>
          Os dados são usados exclusivamente para permitir o login, exibir a agenda escolar,
          registrar reservas e publicar provas e atividades. Não usamos os dados para publicidade,
          venda ou compartilhamento comercial.
        </p>
      </LegalSection>

      <LegalSection title="4. Onde os dados ficam armazenados">
        <p>
          A sessão e as preferências (como o tema claro/escuro) ficam no navegador do usuário. As
          reservas e atividades são armazenadas em um banco de dados PostgreSQL contratado para
          hospedar o aplicativo. O acesso é restrito à coordenação da escola.
        </p>
      </LegalSection>

      <LegalSection title="5. Login com Google">
        <p>
          O acesso é feito com o serviço &quot;Fazer login com o Google&quot;. O Google confirma a
          identidade do usuário e informa apenas o nome e o e-mail da conta. O aplicativo não tem
          acesso à senha, a e-mails, a arquivos ou a qualquer outro dado da conta Google.
        </p>
      </LegalSection>

      <LegalSection title="6. Compartilhamento">
        <p>
          Os dados não são vendidos nem compartilhados com terceiros. Eles podem ser divulgados
          apenas se houver obrigação legal ou solicitação da direção da escola.
        </p>
      </LegalSection>

      <LegalSection title="7. Direitos dos usuários">
        <p>
          O aluno ou professor pode solicitar a correção ou a exclusão dos seus dados entrando em
          contato com a coordenação da escola. Também é possível sair da conta a qualquer momento
          pelo próprio aplicativo.
        </p>
      </LegalSection>

      <LegalSection title="8. Contato">
        <p>
          Dúvidas sobre esta política podem ser enviadas à coordenação do Colégio Estadual
          Presidente Kennedy pelo e-mail{" "}
          <a
            className="font-semibold text-emerald-700 underline-offset-2 hover:underline dark:text-emerald-400"
            href="mailto:cesar.chauchuty@escola.pr.gov.br"
          >
            cesar.chauchuty@escola.pr.gov.br
          </a>
          .
        </p>
      </LegalSection>
    </LegalPage>
  );
}
