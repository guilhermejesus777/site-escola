# Protótipo — roteiro de demonstração

Este documento serve para apresentar o app à coordenação e aos professores em **5 a 10 minutos**.

## Antes de começar

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000` no computador ou no celular (mesma rede: use o endereço `Network` que aparece no terminal).

> Os dados são fictícios e ficam salvos **somente no navegador usado**. Para voltar ao estado inicial: **Configurações → Restaurar dados**.

## Roteiro sugerido

### 1. Painel inicial (30 s)

- Mostra a próxima reserva do professor, quantas entregas e provas estão chegando.
- “Agenda da escola” dá a visão geral do que está reservado.
- Clique em **Reservar horário**.

### 2. Reservar o laboratório (2 min)

1. Escolha um horário **Livre** no calendário (célula pontilhada).
2. Selecione turma e disciplina, escreva a finalidade (ex.: “Pesquisa sobre biomas”).
3. Clique em **Confirmar reserva**.
4. Mostre que:
   - o horário vira uma reserva com o nome do professor;
   - aparece em **Minhas próximas reservas**;
   - o horário deixa de estar livre para os outros.

**Ponto-chave:** “Não existe risco de dois professores reservarem o mesmo horário.”

### 3. Conflito e bloqueio (1 min)

- Tente reservar o mesmo horário: o sistema não permite (o horário já está ocupado).
- Mostre uma célula **Bloqueada** (listrada): é um bloqueio da coordenação, com motivo (ex.: manutenção dos computadores).

### 4. Cancelar (30 s)

- Em **Minhas próximas reservas**, clique em **Cancelar**.
- O horário volta a ficar livre imediatamente.

### 5. Publicar uma prova/atividade (2 min)

1. Vá em **Provas e atividades → Nova atividade**.
2. Preencha título, tipo (prova/trabalho/seminário), turma e disciplina.
3. Informe a data da prova e/ou o prazo de entrega.
4. Anexe um arquivo (no protótipo só o nome é registrado).
5. Publique e mostre:
   - o item no calendário mensal (bolinha colorida);
   - a lista **Próximas entregas**;
   - o detalhe com orientações e anexos.

### 6. Filtro por turma e permissões (1 min)

- Filtre por “7º ano A” e mostre que a agenda muda.
- Abra **Configurações** e mostre a prévia do painel da coordenação: espaços, grade de horários, regras e permissões.
- Explique que **alunos só veem a própria turma** e que **reservas são automáticas** (a coordenação pode bloquear horários).

## Perguntas para colher no piloto

1. A grade de horários mostrada é a da escola? Falta algum bloco/turno?
2. Quais outros espaços devem entrar (sala de vídeo, quadra, auditório, laboratório de ciências)?
3. A antecedência de 2 horas para cancelar é justa?
4. Os alunos precisam de acesso ou basta o professor publicar?
5. Quem será a pessoa responsável por bloquear horários e cadastrar usuários?
6. Que tipos/tamanhos de arquivo os professores costumam usar?

## Limitações (dizer com transparência)

- Não há login real: todos entram como “Ana Souza”.
- Os arquivos **não são enviados** de verdade.
- As configurações da última tela **não são salvas**.
- Os dados não são compartilhados entre dispositivos: cada navegador tem sua própria cópia.

## O que muda na versão de produção

| Protótipo | Produção |
|---|---|
| Dados no navegador | Banco PostgreSQL na nuvem |
| Usuário fixo | Login por e-mail + perfis |
| Anexos só com nome | Upload real em storage |
| Regras na tela | Regras validadas no servidor |
| Sem notificações | Avisos no app (e e-mail na fase 2) |

Veja o plano completo em [`../PLANEJAMENTO.md`](../PLANEJAMENTO.md).
