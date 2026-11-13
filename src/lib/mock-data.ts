import type {
  ActivityKind,
  ClassGroup,
  DataState,
  Slot,
  Space,
} from "@/types";

export const SPACES: Space[] = [
  {
    id: "lab",
    name: "Laboratório de Informática",
    short: "Laboratório",
    description: "32 computadores · Projetor · Ar-condicionado",
    tone: "indigo",
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
  { id: "1dsb", name: "1°DSB", shift: "Tarde" },
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
  "Cesar Chauchuty",
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

/**
 * O app começa sem nenhuma reserva, bloqueio ou atividade.
 * Tudo o que aparece é criado pelos próprios usuários e fica no navegador.
 */
export function createInitialData(): DataState {
  return {
    reservations: [],
    blocks: [],
    activities: [],
  };
}
