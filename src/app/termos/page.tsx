import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Termos de Uso — Agenda Escolar CEPK",
  description:
    "Regras de uso do Agenda Escolar do Colégio Estadual Presidente Kennedy.",
};

export default function TermosPage() {
  return (
    <LegalPage
      title="Termos de Uso"
      subtitle="Agenda Escolar do Colégio Estadual Presidente Kennedy"
      updatedAt="09 de novembro de 2026"
    >
      <LegalSection title="1. Aceitação">
        <p>
          Ao entrar no Agenda Escolar CEPK, o usuário declara que leu e aceita estes Termos de Uso
          e a Política de Privacidade do aplicativo.
        </p>
      </LegalSection>

      <LegalSection title="2. Finalidade">
        <p>
          O aplicativo é uma ferramenta interna da escola para consultar e organizar reservas de
          espaços, provas, trabalhos e atividades. Não possui fins comerciais.
        </p>
      </LegalSection>

      <LegalSection title="3. Quem pode acessar">
        <p>
          O acesso é permitido apenas a alunos e professores cadastrados pela coordenação, usando
          a conta Google da escola. O perfil de aluno permite somente consulta. O perfil de
          professor permite reservar espaços, cancelar reservas, publicar e excluir atividades e
          acessar as configurações.
        </p>
      </LegalSection>

      <LegalSection title="4. Responsabilidades do usuário">
        <ul className="list-disc space-y-1 pl-5">
          <li>Usar o aplicativo apenas para fins escolares;</li>
          <li>Não compartilhar a sua conta Google com outras pessoas;</li>
          <li>Informar dados verdadeiros nas reservas e atividades;</li>
          <li>Respeitar os horários e as regras definidas pela coordenação.</li>
        </ul>
      </LegalSection>

      <LegalSection title="5. Reservas e atividades">
        <p>
          As reservas estão sujeitas à disponibilidade do espaço e à confirmação da coordenação. A
          escola pode cancelar reservas ou remover conteúdos que violem as regras internas ou a
          legislação.
        </p>
      </LegalSection>

      <LegalSection title="6. Disponibilidade">
        <p>
          O aplicativo é oferecido &quot;como está&quot;. A escola não garante funcionamento
          ininterrupto e pode fazer manutenções sem aviso prévio.
        </p>
      </LegalSection>

      <LegalSection title="7. Alterações">
        <p>
          Estes termos podem ser atualizados pela coordenação. A versão mais recente estará sempre
          disponível nesta página.
        </p>
      </LegalSection>

      <LegalSection title="8. Contato">
        <p>
          Em caso de dúvidas, procure a coordenação do Colégio Estadual Presidente Kennedy ou
          escreva para{" "}
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
