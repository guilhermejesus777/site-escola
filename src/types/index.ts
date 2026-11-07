export type Space = {
  id: string;
  name: string;
  short: string;
  description: string;
  tone: "indigo" | "sky" | "emerald";
};

export type Slot = {
  id: string;
  label: string;
  start: string;
  end: string;
};

export type Reservation = {
  id: string;
  spaceId: string;
  date: string; // YYYY-MM-DD
  slotId: string;
  classId: string;
  subject: string;
  purpose: string;
  teacher: string;
  createdAt: string;
};

export type Block = {
  id: string;
  spaceId: string;
  slotId: string;
  /** Data específica (YYYY-MM-DD). */
  date?: string;
  /** Dias da semana recorrentes (1 = segunda ... 5 = sexta). */
  weekdays?: number[];
  reason: string;
};

export type ClassGroup = {
  id: string;
  name: string;
  shift: "Manhã" | "Tarde";
};

export type ActivityKind = "prova" | "trabalho" | "seminario" | "outro";

export type Attachment = {
  name: string;
  size: number;
};

export type Activity = {
  id: string;
  title: string;
  kind: ActivityKind;
  classId: string;
  subject: string;
  teacher: string;
  examDate?: string;
  dueDate?: string;
  description: string;
  attachments: Attachment[];
  createdAt: string;
};

export type DataState = {
  reservations: Reservation[];
  blocks: Block[];
  activities: Activity[];
};

export type UserRole = "professor" | "aluno";

export type SessionUser = {
  email: string;
  name: string;
  role: UserRole;
};
