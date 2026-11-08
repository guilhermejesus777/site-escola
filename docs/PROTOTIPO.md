# Protótipo — roteiro de demonstração

Este documento serve para apresentar o app à coordenação e aos professores em **5 a 10 minutos**.

## Antes de começar

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000` no computador ou no celular (mesma rede: use o endereço `Network` que aparece no terminal).

> O app começa **vazio**: sem reservas, atividades ou bloqueios de exemplo. Tudo o que aparece é criado durante a demonstração e fica salvo **somente no navegador usado**. Para limpar tudo: **Configurações → Limpar dados**.

## Roteiro sugerido

### 1. Login (1 min)

1. Na tela inicial, escolha **Sou professor**.
2. Informe um e-mail de professor cadastrado (ex.: `cesar.chauchuty@escola.pr.gov.br`) e clique em **Entrar**. Só domínios conhecidos são aceitos e o perfil de professor exige um e-mail da lista de professores cadastrados.
3. Mostre que o nome do perfil é criado a partir do e-mail (Ana Souza) e que a sessão continua ativa ao recarregar a página.
4. No fim da demonstração, mostre o **Sair** e repita o login como **Sou aluno** para comparar as permissões.

> Alunos enxergam o calendário e a agenda em modo somente leitura: não há botões de reservar, cancelar, publicar ou excluir, e Configurações fica oculta. O perfil de professor só funciona com o e-mail cadastrado em `src/lib/access.ts` (`cesar.chauchuty@escola.pr.gov.br`).

### 2. Painel inicial (30 s)

- Mostra a próxima reserva do professor, quantas entregas e provas estão chegando.
- “Agenda da escola” dá a visão geral do que está reservado.
- Clique em **Reservar horário**.

### 3. Reservar o laboratório (2 min)

1. Escolha um horário **Livre** no calendário (célula pontilhada).
2. Selecione turma e disciplina, escreva a finalidade (ex.: “Pesquisa sobre biomas”).
3. Clique em **Confirmar reserva**.
4. Mostre que:
   - o horário vira uma reserva com o nome do professor;
   - aparece em **Minhas próximas reservas**;
   - o horário deixa de estar livre para os outros.

**Ponto-chave:** “Não existe risco de dois professores reservarem o mesmo horário.”

### 4. Conflito e bloqueio (1 min)

- Tente reservar o mesmo horário: o sistema não permite (o horário já está ocupado).
- Explique que células **Bloqueadas** (listradas) são bloqueios da coordenação, com motivo (ex.: manutenção dos computadores).

### 5. Cancelar (30 s)

- Em **Minhas próximas reservas**, clique em **Cancelar**.
- O horário volta a ficar livre imediatamente.

### 6. Publicar uma prova/atividade (2 min)

1. Vá em **Provas e atividades → Nova atividade**.
2. Preencha título, tipo (prova/trabalho/seminário), turma e disciplina.
3. Informe a data da prova e/ou o prazo de entrega.
4. Anexe um arquivo (no protótipo só o nome é registrado).
5. Publique e mostre:
   - o item no calendário mensal (bolinha colorida);
   - a lista **Próximas entregas**;
   - o detalhe com orientações e anexos.

### 7. Filtro por turma, permissões e tema (1 min)

- Filtre por “7º ano A” e mostre que a agenda muda.
- Use o botão de **sol/lua** no topo para alternar entre modo claro e escuro; mostre que o calendário, as turmas e o login acompanham o tema e que a escolha permanece ao recarregar.
- Abra **Configurações** (como professor) e mostre o painel da coordenação: espaços, grade de horários, regras e permissões.
- Explique que **reservas são automáticas** (a coordenação pode bloquear horários) e que **alunos só consultam**.
- Encerre com **Sair**, entre como aluno e mostre a mesma agenda sem os botões de escrita.

## Perguntas para colher no piloto

1. A grade de horários mostrada é a da escola? Falta algum bloco/turno?
2. Quais outros espaços devem entrar (sala de vídeo, quadra, auditório, laboratório de ciências)?
3. A antecedência de 2 horas para cancelar é justa?
4. Os alunos precisam de acesso ou basta o professor publicar?
5. Quem será a pessoa responsável por bloquear horários e cadastrar usuários?
6. Que tipos/tamanhos de arquivo os professores costumam usar?

## Limitações (dizer com transparência)

- O login é simulado: não há senha nem validação no servidor — basta um e-mail válido e a escolha do perfil. A lista de professores fica no código-fonte do protótipo, então não é segurança real.
- O app começa vazio; nenhuma reserva ou atividade é criada automaticamente.
- Os arquivos **não são enviados** de verdade.
- As configurações da tela de configurações **não são salvas** (a limpeza dos dados funciona).
- Os dados não são compartilhados entre dispositivos: cada navegador tem sua própria cópia.

## O que muda na versão de produção

| Protótipo | Produção |
|---|---|
| Dados no navegador | Banco PostgreSQL na nuvem |
| Login simulado por perfil e e-mail | Login real por e-mail + perfis |
| Anexos só com nome | Upload real em storage |
| Regras na tela | Regras validadas no servidor |
| Sem notificações | Avisos no app (e e-mail na fase 2) |

Veja o plano completo em [`../PLANEJAMENTO.md`](../PLANEJAMENTO.md).
