# Planejamento — App de Reservas de Espaços e Agenda Escolar

> **Projeto:** plataforma web para a escola reservar o laboratório de informática sem conflitos de horário e acompanhar provas e atividades a entregar.
> **Versão do documento:** 1.0
> **Data:** 07/11/2026
> **Status:** em validação com a coordenação

---

## 1. Resumo do projeto

Um site (funciona no computador e no celular, sem instalar nada) com dois pilares:

1. **Reserva de espaços** — calendário digital onde o professor vê os horários livres do laboratório de informática e reserva na hora. O sistema impede duas reservas no mesmo horário.
2. **Agenda de provas e atividades** — um quadro por turma mostrando datas de provas, trabalhos e entregas, com possibilidade de anexar arquivos (materiais de apoio e locais de entrega).

**Objetivo principal:** eliminar a bagunça de reservas por WhatsApp/ caderno e dar visibilidade de tudo o que está marcado na escola em um só lugar.

### Objetivos mensuráveis (primeiros 3 meses)

| Objetivo | Como medir | Meta |
|---|---|---|
| Acabar com conflitos de reserva | Nº de conflitos relatados por mês | 0 |
| Adesão dos professores | % de professores com ao menos 1 reserva no mês | ≥ 70% |
| Reduzir tempo de organização | Tempo médio para reservar um horário | < 1 minuto |
| Visibilidade das entregas | % de turmas com agenda atualizada | 100% |

---

## 2. Público e permissões

| Perfil | O que pode fazer |
|---|---|
| **Professor** | Ver calendário, reservar/cancelar seus horários, criar e editar suas provas/atividades, anexar arquivos. |
| **Aluno** | Ver o calendário de provas e entregas da própria turma e baixar anexos. Não reserva espaços. |
| **Coordenação / Administração** | Tudo dos professores + gerenciar salas, horários de aula, feriados, bloquear horários, ver relatórios e contas de usuários. |

Regras de acesso:
- Login obrigatório (e-mail institucional ou e-mail cadastrado pela coordenação).
- Aluno só enxerga a própria turma.
- Professor só edita as próprias reservas e atividades (coordenação edita qualquer uma).

---

## 3. Escopo

### 3.1 MVP (primeira entrega — deve estar pronto para uso real)

**Reservas de espaços**
- Cadastro de espaços (inicialmente o Laboratório de Informática; já preparado para adicionar outros, como quadra, auditório, sala de vídeo).
- Grade de horários configurável pela coordenação (ex.: 7h–7h50, 7h50–8h40, …), por dia da semana.
- Visualização em calendário: **semana** (padrão) e **dia**.
- Reserva automática: o professor clica no horário livre, informa turma e finalidade, e confirma. Sem aprovação manual.
- Bloqueio de horário já reservado, com nome de quem reservou e turma (transparência).
- Cancelamento pelo próprio professor (até X horas antes — valor configurável, padrão 2h).
- Coordenação pode bloquear horários (manutenção, prova, evento) e criar reservas fixas recorrentes (ex.: aula de informática de toda terça às 8h).
- Bloqueio de datas (feriados, recesso).

**Provas e atividades**
- Cadastro de prova/trabalho com: título, tipo (prova, trabalho, seminário, outro), turma, disciplina, data da prova e/ou prazo de entrega, descrição.
- Upload de arquivos (PDF, DOCX, imagens, links) até um limite definido.
- Visualização por turma em calendário mensal + lista "próximas entregas".
- Notificação interna (sininho) para a turma quando algo novo é publicado.

**Administração**
- Gestão de usuários (professores, alunos, turmas) por importação de planilha CSV.
- Configuração de horários, espaços e regras (antecedência de cancelamento, limite de reservas).

### 3.2 Fase 2 (depois do MVP validado)
- Aprovação de reservas para casos especiais (eventos, uso de múltiplos espaços).
- Relatório de uso por espaço/professor/turma (para justificar manutenção e compra de equipamentos).
- Notificações por e-mail e/ou WhatsApp.
- Lista de espera: avisar automaticamente quando um horário for liberado.
- Aplicativo instalável (PWA) com ícone no celular e funcionamento básico offline.
- Mural de avisos da coordenação.
- Integração com Google Agenda (exportar/importar .ics).

### 3.3 Fora de escopo (por enquanto)
- Notas, boletim e diário de classe completo.
- Chat entre professores e alunos.
- Correção/recebimento de trabalhos dos alunos pela plataforma (envio é apenas de material pelo professor).
- Pagamentos ou controle financeiro.

---

## 4. Fluxos principais

### 4.1 Reservar o laboratório
1. Professor entra e cai na tela **Calendário** (visão da semana).
2. Vê os horários: verde = livre, cinza = ocupado (com nome/turma), listrado = bloqueado pela coordenação.
3. Clica em um horário livre.
4. Preenche: turma, finalidade e (opcional) observação. Vê o resumo.
5. Confirma → reserva registrada na hora. O horário fica imediatamente indisponível para os outros.
6. Pode cancelar em "Minhas reservas" até a antecedência mínima.

### 4.2 Publicar uma prova/atividade
1. Professor acessa **Provas e Atividades → Nova**.
2. Escolhe turma, disciplina, tipo, data e prazo de entrega.
3. Escreve a descrição e anexa arquivos/links.
4. Publica → aparece no calendário da turma e dispara notificação.
5. Pode editar ou excluir depois.

### 4.3 Bloquear um horário (coordenação)
1. Coordenação clica no horário no calendário → **Bloquear**.
2. Informa motivo e se é pontual ou recorrente.
3. O horário passa a aparecer bloqueado e não pode ser reservado.

---

## 5. Regras de negócio

1. **Sem sobreposição:** um espaço só aceita uma reserva por horário. A verificação ocorre no servidor, dentro de uma transação, para impedir dupla reserva em cliques simultâneos.
2. **Horário = slot da grade:** as reservas usam os blocos de aula cadastrados (não horário livre), o que evita sobreposições parciais.
3. **Reserva no passado:** não permitida. Reservas para hoje só até o início do horário.
4. **Antecedência de cancelamento:** padrão 2 horas antes; configurável.
5. **Limite por professor:** inicialmente sem limite; a coordenação pode ativar um teto (ex.: 5 reservas futuras) se houver disputa.
6. **Reserva recorrente:** só a coordenação cria (aulas fixas). Professor cria reservas pontuais.
7. **Bloqueio tem prioridade:** horário bloqueado pela coordenação cancela reservas existentes, com aviso ao professor afetado.
8. **Exclusão de atividade:** só o autor ou a coordenação; exclusão fica registrada em log (quem, quando).
9. **Arquivos:** tipos permitidos e tamanho máximo definidos (ex.: 20 MB por arquivo); links externos também são aceitos.
10. **Privacidade (LGPD):** coletar o mínimo de dados de alunos (nome, turma). Não expor e-mail/telefone de alunos para outros perfis. Aceitar somente maiores de idade ou dados sob responsabilidade da escola.

---

## 6. Modelo de dados (resumido)

```
usuario        (id, nome, email, senha_hash, perfil, ativo)
turma          (id, nome, ano_letivo, turno)
disciplina     (id, nome)
espaco         (id, nome, descricao, ativo)
horario        (id, rotulo, hora_inicio, hora_fim, ordem)      -- blocos de aula
reserva        (id, espaco_id, horario_id, data, usuario_id, turma_id,
                finalidade, observacao, status, criado_em)
bloqueio       (id, espaco_id, horario_id, data, motivo, criado_por)
atividade      (id, titulo, tipo, turma_id, disciplina_id, usuario_id,
                data_prova, prazo_entrega, descricao, publicado_em)
anexo          (id, atividade_id, nome_arquivo, url, tipo, tamanho)
notificacao    (id, usuario_id, titulo, mensagem, lida, criado_em)
log_auditoria  (id, usuario_id, acao, entidade, entidade_id, dados, criado_em)
```

Regra de integridade: índice único em `reserva (espaco_id, horario_id, data)` para reservas ativas. Isso garante no banco que não exista dupla reserva, mesmo com falha na aplicação.

---

## 7. Telas

| # | Tela | Perfil | Prioridade |
|---|---|---|---|
| 1 | Login | Todos | MVP |
| 2 | Calendário de reservas (semana/dia) | Professor, Coordenação | MVP |
| 3 | Modal de nova reserva | Professor | MVP |
| 4 | Minhas reservas | Professor | MVP |
| 5 | Agenda de provas e atividades (calendário mensal) | Todos | MVP |
| 6 | Detalhe da atividade + anexos | Todos | MVP |
| 7 | Formulário de nova atividade | Professor | MVP |
| 8 | Painel administrativo: usuários e turmas | Coordenação | MVP |
| 9 | Configurações: horários, espaços, regras | Coordenação | MVP |
| 10 | Bloqueios e reservas recorrentes | Coordenação | MVP |
| 11 | Notificações | Todos | MVP |
| 12 | Relatórios de uso | Coordenação | Fase 2 |

Diretrizes de interface:
- Mobile-first: a maioria vai usar no celular.
- Cores consistentes para estados (livre / ocupado / bloqueado) e nunca depender só de cor (usar ícone/rótulo também).
- Poucos cliques: reservar em no máximo 3 toques após abrir o app.
- Linguagem simples, em português, sem termos técnicos.

---

## 8. Tecnologia sugerida

### Opção A — Sob medida (recomendada para crescer)
| Camada | Escolha | Por quê |
|---|---|---|
| Front-end + back-end | **Next.js** (React) | Um único projeto para site e API; ótimo em celular. |
| Banco de dados | **PostgreSQL** (via Supabase ou Neon) | Confiável; permite a regra de unicidade da reserva. |
| Login | **Supabase Auth** | Login por e-mail e recuperação de senha prontos. |
| Arquivos | **Supabase Storage** | Upload de anexos com controle de acesso. |
| Hospedagem | **Vercel** | Plano gratuito suficiente para uma escola. |
| Estilo | Tailwind CSS + componentes (shadcn/ui) | Rápido de montar e manter. |

Custo estimado: **R$ 0 a R$ 50/mês** no início. Precisa de alguém com conhecimento básico de programação (ou um professor/estagiário de TI) para manter.

### Opção B — Sem programação (validação rápida)
- **Google Planilhas + Google Agenda compartilhada** para reservas (com bloqueio manual).
- **Notion** ou **Google Sites** para a agenda de provas e anexos.
- Vantagem: começa em dias, custo zero. Desvantagem: não impede conflito automaticamente e depende de disciplina de uso.

> Recomendação: se o objetivo é realmente **impedir conflitos**, vá para a Opção A. A Opção B serve como protótipo para testar com os professores antes de desenvolver.

---

## 9. Cronograma sugerido

| Etapa | Duração | Entregas |
|---|---|---|
| **0. Validação** | 1 semana | Conversa com coordenação e 3–5 professores; confirmar grade de horários, regras e quem usa. Protótipo no papel/Figma. |
| **1. Fundação** | 1–2 semanas | Projeto no ar, login, cadastro de usuários/turmas/espaços/horários. |
| **2. Reservas** | 2 semanas | Calendário, reserva, cancelamento, bloqueios. Teste com 2 professores. |
| **3. Provas e atividades** | 2 semanas | Cadastro, upload, agenda por turma, notificações. |
| **4. Ajustes e lançamento** | 1 semana | Correções do teste-piloto, manual curto, treinamento de 30 min, lançamento. |

Total: **7 a 8 semanas** em ritmo part-time. Um MVP enxuto (só reservas) pode ficar pronto em **3–4 semanas**.

---

## 10. Riscos e como mitigar

| Risco | Impacto | Mitigação |
|---|---|---|
| Professores não aderem | Alto | Envolver 3–5 no teste; treinamento curto; mostrar que é mais rápido que o método atual. |
| Dependência de uma pessoa para manter | Alto | Documentar tudo; usar ferramentas gratuitas e populares; deixar a coordenação como "dona" das contas. |
| Dados de alunos (LGPD) | Médio | Coletar o mínimo; acesso restrito por turma; termo de uso interno com a escola. |
| Internet instável na escola | Médio | App leve; versão PWA com cache na fase 2; permitir imprimir a agenda da semana. |
| Escopo crescendo ("só falta mais isso…") | Alto | Congelar o MVP; ideias novas vão para a lista da Fase 2. |
| Conflito de reserva por clique simultâneo | Médio | Regra de unicidade no banco + mensagem clara de "horário acabou de ser ocupado". |

---

## 11. Métricas de sucesso (revisão mensal)

- Reservas feitas pelo app x reservas fora do app (deve migrar para 100% no app).
- Nº de conflitos relatados (meta: 0).
- Professores ativos por semana.
- Atividades publicadas por turma.
- Reclamações/elogios no canal de feedback.

---

## 12. Próximos passos imediatos

1. **Confirmar com a coordenação:** quantos espaços, quantidade de professores/turmas, grade de horários real.
2. **Definir a "regra da casa":** antecedência de cancelamento, limite de reservas, quem bloqueia horários.
3. **Escolher o caminho:** Opção A (sob medida) ou Opção B (validação rápida).
4. **Desenhar as 3 telas principais** (calendário, nova reserva, agenda de provas) em baixa fidelidade.
5. **Selecionar 3–5 professores-piloto** e uma data para o teste.
6. **Criar a lista da Fase 2** e combinar que nada entra no MVP sem passar por ela.

---

## 13. Checklist de decisões pendentes

- [ ] Nome do app
- [ ] Quantidade e nome dos espaços
- [ ] Grade de horários (blocos de aula) por turno
- [ ] Antecedência mínima para cancelar
- [ ] Limite de reservas futuras por professor
- [ ] Login: e-mail institucional, e-mail pessoal ou matrícula
- [ ] Alunos terão acesso ou só professores?
- [ ] Tamanho máximo e tipos de arquivo permitidos
- [ ] Quem será o administrador do sistema
- [ ] Canal de suporte (quem os professores procuram se der erro)
