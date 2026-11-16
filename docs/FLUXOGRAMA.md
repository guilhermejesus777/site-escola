# Fluxograma do site

Mapa dos caminhos que o usuário percorre no **Agenda Escolar** e das regras de
permissão aplicadas em cada etapa. Os diagramas usam **Mermaid** e são
renderizados automaticamente pelo GitHub.

> Legenda dos status usados no documento:
>
> - ✅ **Funcional** — grava ou consulta dados de verdade.
> - 👁️ **Somente leitura** — aluno visualiza, mas não altera.
> - 🧪 **Prévia** — tela de demonstração, ainda não salva alterações.

## Fluxogramas em imagem

Os dois fluxogramas abaixo foram desenhados com os **símbolos corretos de
fluxograma**: elipse para **início/fim**, retângulo para **processo**, losango
para **decisão**, paralelogramo para **entrada/saída** e setas para indicar o
**fluxo**. Todos os caminhos têm início, fim e as saídas **Sim/Não** das
decisões.

### 1. Login e acesso ao sistema

[![Fluxograma de login e acesso](fluxogramas/1-fluxo-login-e-acesso.png)](fluxogramas/1-fluxo-login-e-acesso.png)

### 2. Reservas de espaços e atividades

[![Fluxograma de reservas e atividades](fluxogramas/2-fluxo-reservas-e-atividades.png)](fluxogramas/2-fluxo-reservas-e-atividades.png)

Arquivos em tamanho original: [`docs/fluxogramas/`](./fluxogramas).

Os diagramas Mermaid abaixo repetem o mesmo conteúdo em formato de texto,
para facilitar a leitura e a edição.

---

## 1. Visão geral: da entrada até cada tela

```mermaid
flowchart TD
    A([Abrir o site]) --> B{"Sessão válida?"}
    B -- "Sim" --> C["Início / Painel ✅"]
    B -- "Não" --> D["Tela de login"]

    D --> E["Escolher perfil:<br/>Aluno ou Professor"]
    E --> F["E-mail + senha de acesso<br/>ou botão Google"]
    F --> G{"Credencial correta e<br/>e-mail autorizado?"}
    G -- "Não" --> H["Mensagem de erro"]
    H --> D
    G -- "Sim" --> I["Cookie de sessão<br/>HttpOnly · 8 horas"]
    I --> C

    C --> J["Reservas ✅"]
    C --> K["Provas e atividades ✅"]
    C --> L["Configurações 🧪<br/>(somente professor)"]

    J --> J1["Aluno 👁️<br/>vê o calendário"]
    J --> J2["Professor ✅<br/>reserva e cancela"]
    K --> K1["Aluno 👁️<br/>vê provas e entregas"]
    K --> K2["Professor ✅<br/>publica e exclui"]
    L --> L1["Espaços, horários,<br/>regras e permissões 🧪"]
    L --> L2["Apagar todos os dados ✅"]

    C --> M["Sair da conta"]
    M --> D

    D --> N["Política de Privacidade<br/>e Termos de Uso<br/>(páginas públicas)"]
```

---

## 2. Login, primeiro acesso e sessão

```mermaid
flowchart TD
    Start([Tela de login]) --> Role{"Qual perfil?"}
    Role -- "Aluno" --> Email["E-mail + senha de acesso"]
    Role -- "Professor" --> Email

    Email --> Valid{"E-mail está na lista<br/>da escola?"}
    Valid -- "Não" --> Denied["Acesso negado:<br/>falar com a coordenação"]
    Valid -- "Sim" --> Check{"Senha individual<br/>confere?"}

    Check -- "Sim" --> Ok["Cria cookie de sessão<br/>HttpOnly assinado"]
    Check -- "Não" --> Master{"É professor sem senha<br/>individual?"}
    Master -- "Sim, senha mestra confere" --> Ok
    Master -- "Não" --> Denied

    Role -- "Google" --> GLogin["Login com a conta Google"]
    GLogin --> GToken["Google confirma a identidade"]
    GToken --> GValid{"E-mail autorizado<br/>na lista da escola?"}
    GValid -- "Não" --> Denied
    GValid -- "Sim" --> Ok

    subgraph PrimeiroAcesso["Primeiro acesso (criar a própria senha)"]
        P1["Clicar em<br/>'Primeiro acesso? Criar a minha senha'"]
        P2["Entrar com o Google"]
        P3{"Google confirmou<br/>o e-mail?"}
        P4{"Já existe senha<br/>para esse e-mail?"}
        P5["Formulário:<br/>senha + confirmação"]
        P6["Salva o hash scrypt<br/>(nunca a senha original)"]
        P7["Aviso: senha já existe.<br/>Entrar com ela ou pelo Google"]

        P1 --> P2 --> P3
        P3 -- "Não" --> Denied
        P3 -- "Sim" --> P4
        P4 -- "Sim" --> P7
        P4 -- "Não" --> P5 --> P6
        P6 --> Ok
    end

    Ok --> Home["Início / Painel"]
```

**Regras importantes**

- Ninguém pode cadastrar o e-mail de outra pessoa: a senha própria só é criada
  depois que o **Google confirma** que a conta pertence àquele e-mail.
- A rota de criação **nunca sobrescreve** uma senha existente.
- A senha do Google é digitada **no Google** e nunca passa pelo site.
- Limite de tentativas por IP e por e-mail (proteção contra força bruta).
- Se o e-mail sair da lista da escola, a sessão deixa de valer na próxima
  requisição.

---

## 3. Reservas de espaços

```mermaid
flowchart TD
    R([Abrir Reservas]) --> Who{"Perfil do usuário"}

    Who -- "Aluno" --> View["Calendário semanal<br/>por espaço 👁️"]
    View --> Legend["Vê reservas, bloqueios<br/>e ocupação da semana"]

    Who -- "Professor" --> Cal["Calendário semanal<br/>por espaço ✅"]
    Cal --> Action{"O que deseja fazer?"}

    Action -- "Reservar" --> Slot["Escolher espaço,<br/>data e horário"]
    Slot --> Past{"Data/horário<br/>já passou?"}
    Past -- "Sim" --> Blocked1["Opção desabilitada"]
    Past -- "Não" --> Free{"Horário está livre?"}

    Free -- "Reservado" --> Conflict["Aviso de conflito:<br/>escolha outro horário"]
    Conflict --> Slot
    Free -- "Bloqueado" --> Blocked2["Aviso: horário bloqueado<br/>pela coordenação"]
    Blocked2 --> Slot

    Free -- "Sim" --> Form["Preencher turma,<br/>disciplina e finalidade"]
    Form --> Save["Salva no estado local<br/>e envia para POST /api/dados"]
    Save --> Show["Reserva aparece no calendário,<br/>no painel e na agenda da escola"]

    Action -- "Cancelar" --> Own{"É uma reserva<br/>do próprio professor?"}
    Own -- "Não" --> NoCancel["Não exibe a opção<br/>de cancelar"]
    Own -- "Sim" --> Cancel["Confirma o cancelamento"]
    Cancel --> Remove["Remove do estado local<br/>e envia reserva.delete"]

    Show --> DB[("PostgreSQL<br/>tabela reservas")]
    Remove --> DB
```

**Regras importantes**

- Só **professores** reservam, cancelam e veem o botão de ação.
- **Aluno** é somente leitura.
- Não é possível reservar no passado, em horário ocupado ou bloqueado.
- O servidor revalida a permissão: mesmo burlando a interface, o aluno recebe
  `403` ao tentar criar dados.

---

## 4. Provas e atividades

```mermaid
flowchart TD
    A([Abrir Provas e atividades]) --> B{"Perfil do usuário"}

    B -- "Aluno" --> C["Calendário mensal 👁️"]
    C --> D["Filtra por turma<br/>e vê próximas entregas"]
    D --> E["Abre o detalhe<br/>da atividade"]
    E --> F["Vê anexos, data,<br/>turma e disciplina"]

    B -- "Professor" --> G["Calendário mensal ✅"]
    G --> H{"O que deseja fazer?"}

    H -- "Publicar" --> I["Clicar em 'Nova atividade'"]
    I --> J["Preencher título, tipo,<br/>turma, disciplina, datas"]
    J --> K["Anexar arquivos<br/>(opcional)"]
    K --> L["Salva no estado local<br/>e envia atividade.create"]
    L --> M[("PostgreSQL<br/>tabela atividades")]

    H -- "Excluir" --> N{"Atividade criada<br/>por este professor?"}
    N -- "Não" --> O["Opção de excluir<br/>não aparece"]
    N -- "Sim" --> P["Confirma a exclusão"]
    P --> Q["Remove do estado local<br/>e envia atividade.delete"]
    Q --> M

    F --> R["Fim do fluxo"]
    M --> R
```

---

## 5. Configurações e permissões

```mermaid
flowchart TD
    A([Abrir Configurações]) --> B{"É professor?"}
    B -- "Não" --> C["Item não aparece no menu<br/>e acesso é bloqueado"]
    B -- "Sim" --> D["Painel da coordenação"]

    D --> E["Espaços reserváveis 🧪"]
    D --> F["Grade de horários 🧪"]
    D --> G["Regras de reserva 🧪"]
    D --> H["Permissões por perfil 🧪"]
    D --> I["Apagar todos os dados ✅"]

    E --> E1["Prévia: adicionar<br/>novo espaço não salva"]
    F --> F1["Prévia: blocos de aula<br/>apenas exibidos"]
    G --> G1["Prévia: toggles não<br/>alteram o funcionamento"]
    H --> H1["Prévia: matriz<br/>aluno / professor / admin"]

    I --> I1["Confirmação:<br/>'Apagar todos os dados?'"]
    I1 -- "Cancelar" --> D
    I1 -- "Confirmar" --> I2["Limpa estado local"]
    I2 --> I3["Envia reset para<br/>POST /api/dados"]
    I3 --> I4[("Banco zerado:<br/>reservas, atividades<br/>e bloqueios")]
```

**Matriz de permissões aplicada no servidor**

| Ação | Aluno | Professor |
|---|:---:|:---:|
| Ver reservas e atividades | ✅ | ✅ |
| Reservar / cancelar horários | ❌ | ✅ |
| Publicar / excluir atividades | ❌ | ✅ |
| Bloquear horários (coordenação) | ❌ | ✅ |
| Apagar todos os dados | ❌ | ✅ |

---

## 6. Persistência dos dados

```mermaid
flowchart LR
    UI["Telas do app<br/>(React)"] -->|"Leitura e escrita"| Store["Store do app<br/>(estado local)"]
    Store -->|"Cache rápido"| LS[("localStorage<br/>do navegador")]
    Store -->|"Operações assíncronas"| API["API /api/dados<br/>valida sessão e permissão"]
    API -->|"Professor"| DB[("PostgreSQL<br/>Neon")]
    API -->|"Aluno"| ReadOnly["Somente GET<br/>leitura"]

    API -->|"401"| Expire["Sessão expirada:<br/>volta para o login"]
    DB -->|"Carrega na abertura"| Store
```

**O que fica salvo no banco**

| Tabela | Conteúdo |
|---|---|
| `reservas` | Reservas de espaços feitas pelos professores |
| `atividades` | Provas, trabalhos e entregas |
| `bloqueios` | Horários bloqueados pela coordenação |
| `senhas` | Hash scrypt da senha individual de cada pessoa |

Sem `DATABASE_URL`, o app usa o `localStorage` e um armazenamento em memória no
servidor — útil para demonstração, mas os dados não sobrevivem a um reinício.

---

## 7. Resumo das rotas

| Rota | Acesso | Função |
|---|---|---|
| `/` | Público / logado | Login ou painel inicial |
| `/reservas` | Logado | Calendário e reservas de espaços |
| `/atividades` | Logado | Provas, trabalhos e entregas |
| `/configuracoes` | Professor | Painel da coordenação |
| `/privacidade` | Público | Política de Privacidade |
| `/termos` | Público | Termos de Uso |
| `/api/auth/senha` | Público | Login com e-mail + senha |
| `/api/auth/google` | Público | Login com Google |
| `/api/auth/session` | Logado | Consulta a sessão atual |
| `/api/auth/logout` | Logado | Encerra a sessão |
| `/api/usuarios/minha-senha` | Logado | Consulta / cria a própria senha |
| `/api/dados` | Logado | Leitura e escrita dos dados do app |

---

Voltar para o [README](../README.md).
