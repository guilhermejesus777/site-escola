export const WEEKDAY_SHORT = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"];

export function todayISO(): string {
  return toISO(new Date());
}

export function toISO(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function fromISO(value: string): Date {
  const [y, m, d] = value.split("-").map(Number);
  return new Date(y, m - 1, d);
}

/** Segunda-feira da semana da data informada. */
export function startOfWeek(date: Date): Date {
  const base = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const offset = (base.getDay() + 6) % 7;
  base.setDate(base.getDate() - offset);
  return base;
}

/**
 * Semana usada como padrão na tela de reservas.
 * No fim de semana, abre já a semana seguinte (semana útil).
 */
export function planningWeekStart(): Date {
  const today = new Date();
  const monday = startOfWeek(today);
  return today.getDay() === 0 || today.getDay() === 6 ? addDays(monday, 7) : monday;
}

export function addDays(date: Date, amount: number): Date {
  const next = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  next.setDate(next.getDate() + amount);
  return next;
}

export function addMonths(date: Date, amount: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1);
}

export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function isPast(dateISO: string): boolean {
  return dateISO < todayISO();
}

/** 1 = segunda ... 5 = sexta (0 = domingo) */
export function weekdayIndex(dateISO: string): number {
  return fromISO(dateISO).getDay();
}

export function formatDateBR(dateISO: string): string {
  const date = fromISO(dateISO);
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

export function formatDateShort(dateISO: string): string {
  const date = fromISO(dateISO);
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
  })
    .format(date)
    .replace(".", "");
}

export function formatWeekTitle(start: Date): string {
  const end = addDays(start, 4);
  const startLabel = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
  })
    .format(start)
    .replace(".", "");
  const endLabel = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
    .format(end)
    .replace(".", "");
  return `${startLabel} – ${endLabel}`;
}

export function formatMonthTitle(date: Date): string {
  const label = new Intl.DateTimeFormat("pt-BR", {
    month: "long",
    year: "numeric",
  }).format(date);
  return label.charAt(0).toUpperCase() + label.slice(1);
}

export function formatLongDate(dateISO: string): string {
  const label = new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(fromISO(dateISO));
  return label.charAt(0).toUpperCase() + label.slice(1);
}

export function relativeDay(dateISO: string): string {
  const diff = Math.round(
    (fromISO(dateISO).getTime() - fromISO(todayISO()).getTime()) / 86_400_000,
  );
  if (diff === 0) return "Hoje";
  if (diff === 1) return "Amanhã";
  if (diff < 0) return `Há ${Math.abs(diff)} dia${Math.abs(diff) > 1 ? "s" : ""}`;
  return `Em ${diff} dias`;
}

/** Matriz do calendário mensal (semanas começando no domingo). */
export function monthMatrix(year: number, month: number): Date[][] {
  const first = new Date(year, month, 1);
  const start = addDays(first, -first.getDay());
  const weeks: Date[][] = [];
  let cursor = start;
  for (let w = 0; w < 6; w++) {
    const week: Date[] = [];
    for (let d = 0; d < 7; d++) {
      week.push(cursor);
      cursor = addDays(cursor, 1);
    }
    weeks.push(week);
  }
  return weeks;
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
