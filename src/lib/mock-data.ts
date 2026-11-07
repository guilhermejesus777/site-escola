import type {
  Activity,
  ActivityKind,
  Block,
  ClassGroup,
  DataState,
  Reservation,
  Slot,
  Space,
} from "@/types";
import { addDays, planningWeekStart, toISO } from "@/lib/date";

export const CURRENT_USER = "Ana Souza";

export const SPACES: Space[] = [
  {
    id: "lab",
    name: "Laboratório de Informática",
    short: "Laboratório",
    description: "32 computadores · Projetor · Ar-condicionado",
    tone: "indigo",
  },
  {
    id: "video",
    name: "Sala de Vídeo",
    short: "Sala de Vídeo",
    description: "Projetor · Som · 40 lugares",
    tone: "sky",
  },
  {
    id: "quadra",
    name: "Quadra Poliesportiva",
    short: "Quadra",
    description: "Coberta · Vestuário · Materiais esportivos",
    tone: "emerald",
  },
];

export const SLOTS: Slot[] = [
  { id: "s1", label: "1ª aula", start: "07:00", end: "07:50" },
  { id: "s2", label: "2ª aula", start: "07:50", end: "08:40" },
  { id: "s3", label: "3ª aula", start: "08:40", end: "09:30" },
  { id: "s4", label: "4ª aula", start: "09:50", end: "10:40" },
  { id: "s5", label: "5ª aula", start: "10:40", end: "11:30" },
  { id: "s6", label: "6ª aula", start: "11:30", end: "12:20" },
  { id: "s7", label: "7ª aula", start: "13:30", end: "14:20" },
  { id: "s8", label: "8ª aula", start: "14:20", end: "15:10" },
];

export const CLASSES: ClassGroup[] = [
  { id: "6a", name: "6º ano A", shift: "Manhã" },
  { id: "6b", name: "6º ano B", shift: "Manhã" },
  { id: "7a", name: "7º ano A", shift: "Manhã" },
  { id: "7b", name: "7º ano B", shift: "Tarde" },
  { id: "8a", name: "8º ano A", shift: "Manhã" },
  { id: "9a", name: "9º ano A", shift: "Tarde" },
];

export const SUBJECTS = [
  "Matemática",
  "Português",
  "Ciências",
  "História",
  "Geografia",
  "Informática",
  "Educação Física",
  "Arte",
];

export const TEACHERS = [
  "Ana Souza",
  "Carlos Lima",
  "Mariana Alves",
  "Rafael Costa",
  "Juliana Reis",
  "Pedro Martins",
];

export const KIND_LABEL: Record<ActivityKind, string> = {
  prova: "Prova",
  trabalho: "Trabalho",
  seminario: "Seminário",
  outro: "Atividade",
};

export const KIND_TONE: Record<ActivityKind, "rose" | "amber" | "violet" | "sky"> = {
  prova: "rose",
  trabalho: "amber",
  seminario: "violet",
  outro: "sky",
};

type Seed = {
  spaceId: string;
  dayOffset: number; // dias a partir da segunda-feira
  slotId: string;
  classId: string;
  subject: string;
  purpose: string;
  teacher: string;
};

const WEEK_SEED: Seed[] = [
  { spaceId: "lab", dayOffset: 0, slotId: "s2", classId: "7a", subject: "Informática", purpose: "Planilhas e gráficos no Sheets", teacher: "Ana Souza" },
  { spaceId: "lab", dayOffset: 0, slotId: "s4", classId: "8a", subject: "Ciências", purpose: "Pesquisa sobre biomas brasileiros", teacher: "Carlos Lima" },
  { spaceId: "lab", dayOffset: 1, slotId: "s1", classId: "6a", subject: "Informática", purpose: "Introdução à programação em blocos", teacher: "Mariana Alves" },
  { spaceId: "lab", dayOffset: 2, slotId: "s3", classId: "7b", subject: "Matemática", purpose: "Simulado online de frações", teacher: "Ana Souza" },
  { spaceId: "lab", dayOffset: 3, slotId: "s2", classId: "6b", subject: "Português", purpose: "Produção de texto colaborativa", teacher: "Pedro Martins" },
  { spaceId: "lab", dayOffset: 4, slotId: "s4", classId: "9a", subject: "Matemática", purpose: "Simulado online — 2ª etapa", teacher: "Carlos Lima" },
  { spaceId: "video", dayOffset: 1, slotId: "s5", classId: "9a", subject: "História", purpose: "Documentário: Era Vargas", teacher: "Rafael Costa" },
  { spaceId: "video", dayOffset: 2, slotId: "s2", classId: "6b", subject: "Arte", purpose: "Curta-metragem sobre folclore", teacher: "Juliana Reis" },
  { spaceId: "quadra", dayOffset: 3, slotId: "s6", classId: "8a", subject: "Educação Física", purpose: "Treino de vôlei para o interclasse", teacher: "Juliana Reis" },
  { spaceId: "quadra", dayOffset: 4, slotId: "s2", classId: "7a", subject: "Educação Física", purpose: "Circuito de habilidades motoras", teacher: "Pedro Martins" },
  { spaceId: "lab", dayOffset: 7, slotId: "s1", classId: "6b", subject: "Informática", purpose: "Planilha de controle de gastos", teacher: "Ana Souza" },
  { spaceId: "lab", dayOffset: 8, slotId: "s4", classId: "8a", subject: "Ciências", purpose: "Laboratório virtual de ecossistemas", teacher: "Carlos Lima" },
  { spaceId: "quadra", dayOffset: 9, slotId: "s5", classId: "9a", subject: "Educação Física", purpose: "Torneio de basquete", teacher: "Juliana Reis" },
];

function createReservations(): Reservation[] {
  const monday = planningWeekStart();
  return WEEK_SEED.map((seed, index) => ({
    id: `reserva-${index + 1}`,
    spaceId: seed.spaceId,
    date: toISO(addDays(monday, seed.dayOffset)),
    slotId: seed.slotId,
    classId: seed.classId,
    subject: seed.subject,
    purpose: seed.purpose,
    teacher: seed.teacher,
    createdAt: new Date().toISOString(),
  }));
}

const BLOCKS: Block[] = [
  {
    id: "block-1",
    spaceId: "lab",
    slotId: "s7",
    weekdays: [3],
    reason: "Manutenção preventiva dos computadores",
  },
  {
    id: "block-2",
    spaceId: "video",
    slotId: "s3",
    weekdays: [5],
    reason: "Reunião pedagógica da coordenação",
  },
];

type ActivitySeed = Omit<Activity, "id" | "createdAt"> & { dueIn?: number; examIn?: number };

const ACTIVITY_SEEDS: ActivitySeed[] = [
  {
    title: "Lista de exercícios — Frações",
    kind: "outro",
    classId: "6a",
    subject: "Matemática",
    teacher: "Ana Souza",
    dueIn: 2,
    description:
      "Resolver os exercícios 1 a 12 do capítulo 4 no caderno. Entrega na próxima aula.",
    attachments: [{ name: "lista-fracoes-6a.pdf", size: 384_000 }],
  },
  {
    title: "Simulado de Matemática",
    kind: "prova",
    classId: "7a",
    subject: "Matemática",
    teacher: "Ana Souza",
    examIn: 3,
    description:
      "Simulado com 20 questões de frações, porcentagem e equações do 1º grau. Trazer calculadora simples.",
    attachments: [{ name: "conteudos-simulado.pdf", size: 512_000 }],
  },
  {
    title: "Pesquisa: Biomas brasileiros",
    kind: "trabalho",
    classId: "8a",
    subject: "Ciências",
    teacher: "Carlos Lima",
    dueIn: 5,
    description:
      "Em grupos de 4, produzir um cartaz digital sobre um bioma brasileiro. Enviar pelo e-mail da turma.",
    attachments: [
      { name: "roteiro-pesquisa.docx", size: 128_000 },
      { name: "modelo-cartaz.pptx", size: 2_400_000 },
    ],
  },
  {
    title: "Apresentação sobre o Modernismo",
    kind: "seminario",
    classId: "9a",
    subject: "Português",
    teacher: "Mariana Alves",
    examIn: 7,
    dueIn: 7,
    description:
      "Seminário em duplas sobre autores da Semana de Arte Moderna. 10 minutos por dupla.",
    attachments: [],
  },
  {
    title: "Mapa das regiões do Brasil",
    kind: "trabalho",
    classId: "6b",
    subject: "Geografia",
    teacher: "Juliana Reis",
    dueIn: 9,
    description:
      "Colorir e identificar as cinco regiões, destacando duas características de cada uma.",
    attachments: [{ name: "mapa-mudo.pdf", size: 756_000 }],
  },
  {
    title: "Prova de História — Revolução Industrial",
    kind: "prova",
    classId: "8a",
    subject: "História",
    teacher: "Rafael Costa",
    examIn: 10,
    description:
      "Prova individual e sem consulta. Conteúdo: capítulos 5 e 6 do livro didático.",
    attachments: [],
  },
  {
    title: "Roteiro de programação em Scratch",
    kind: "trabalho",
    classId: "7b",
    subject: "Informática",
    teacher: "Pedro Martins",
    dueIn: 14,
    description:
      "Criar um jogo simples no Scratch seguindo o roteiro anexo. Publicar no estúdio da turma.",
    attachments: [
      { name: "roteiro-scratch.pdf", size: 640_000 },
      { name: "exemplo-jogo.sb3", size: 1_800_000 },
    ],
  },
  {
    title: "Prova de Ciências — Ecossistemas",
    kind: "prova",
    classId: "6a",
    subject: "Ciências",
    teacher: "Carlos Lima",
    examIn: 21,
    description:
      "Prova com questões objetivas e uma dissertativa sobre cadeias alimentares.",
    attachments: [],
  },
];

function createActivities(): Activity[] {
  const now = new Date();
  return ACTIVITY_SEEDS.map((seed, index) => {
    const { dueIn, examIn, ...base } = seed;
    const examDate = examIn !== undefined ? toISO(addDays(now, examIn)) : undefined;
    const dueDate =
      dueIn !== undefined ? toISO(addDays(now, dueIn)) : examDate;
    return {
      ...base,
      id: `atividade-${index + 1}`,
      examDate,
      dueDate,
      createdAt: now.toISOString(),
    };
  });
}

export function createInitialData(): DataState {
  return {
    reservations: createReservations(),
    blocks: BLOCKS,
    activities: createActivities(),
  };
}
