"use client";

import { useCallback, useMemo, useState } from "react";
import {
  IconAlert,
  IconBall,
  IconCalendar,
  IconCheck,
  IconChevronLeft,
  IconChevronRight,
  IconClock,
  IconMapPin,
  IconMonitor,
  IconPlus,
  IconTrash,
  IconVideo,
} from "@/components/icons";
import {
  Badge,
  Button,
  EmptyState,
  Field,
  Modal,
  Toast,
  inputClass,
} from "@/components/ui";
import {
  addDays,
  formatDateBR,
  formatLongDate,
  formatWeekTitle,
  fromISO,
  isPast,
  planningWeekStart,
  relativeDay,
  todayISO,
  toISO,
  WEEKDAY_SHORT,
} from "@/lib/date";
import { CLASSES, SLOTS, SPACES, SUBJECTS } from "@/lib/mock-data";
import { useStore } from "@/lib/store";
import type { Space } from "@/types";

const SPACE_ICONS = {
  lab: IconMonitor,
  video: IconVideo,
  quadra: IconBall,
} as const;

const SPACE_ACTIVE: Record<Space["tone"], string> = {
  indigo: "border-indigo-200 dark:border-indigo-400/30 bg-indigo-50 dark:bg-indigo-500/15 text-indigo-700 dark:text-indigo-300",
  sky: "border-sky-200 dark:border-sky-400/30 bg-sky-50 dark:bg-sky-500/15 text-sky-700 dark:text-sky-300",
  emerald: "border-emerald-200 dark:border-emerald-400/30 bg-emerald-50 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
};

const SPACE_SOFT: Record<Space["tone"], string> = {
  indigo: "bg-indigo-50 dark:bg-indigo-500/15 text-indigo-600 dark:text-indigo-400",
  sky: "bg-sky-50 dark:bg-sky-500/15 text-sky-600 dark:text-sky-400",
  emerald: "bg-emerald-50 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
};

function slotOrder(slotId: string): number {
  return SLOTS.findIndex((slot) => slot.id === slotId);
}

function classNameOf(classId: string): string {
  return CLASSES.find((item) => item.id === classId)?.name ?? classId;
}

export default function ReservasPage() {
  const {
    reservations,
    getReservation,
    getBlock,
    bookReservation,
    cancelReservation,
    user,
  } = useStore();

  const isProfessor = user?.role === "professor";
  const userName = user?.name ?? "";

  const [spaceId, setSpaceId] = useState<string>(SPACES[0].id);
  const [weekStart, setWeekStart] = useState<Date>(() => planningWeekStart());
  const [selected, setSelected] = useState<{ date: string; slotId: string } | null>(null);
  const [classId, setClassId] = useState("7a");
  const [subject, setSubject] = useState("Matemática");
  const [purpose, setPurpose] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; tone: "success" | "error" } | null>(null);

  const closeToast = useCallback(() => setToast(null), []);

  const space = SPACES.find((item) => item.id === spaceId) ?? SPACES[0];
  const SpaceIcon = SPACE_ICONS[space.id as keyof typeof SPACE_ICONS] ?? IconMonitor;

  const days = useMemo(
    () => Array.from({ length: 5 }, (_, index) => addDays(weekStart, index)),
    [weekStart],
  );
  const dayISOs = useMemo(() => days.map((day) => toISO(day)), [days]);
  const today = todayISO();

  const occupancy = useMemo(() => {
    let used = 0;
    for (const date of dayISOs) {
      for (const slot of SLOTS) {
        if (getReservation(spaceId, date, slot.id) || getBlock(spaceId, date, slot.id)) {
          used += 1;
        }
      }
    }
    const total = dayISOs.length * SLOTS.length;
    return { used, total, percent: Math.round((used / total) * 100) };
  }, [dayISOs, getBlock, getReservation, spaceId]);

  const myReservations = useMemo(
    () =>
      (isProfessor
        ? reservations.filter((item) => item.teacher === userName)
        : reservations
      )
        .filter((item) => item.date >= today)
        .sort((a, b) =>
          a.date === b.date
            ? slotOrder(a.slotId) - slotOrder(b.slotId)
            : a.date.localeCompare(b.date),
        ),
    [reservations, today, isProfessor, userName],
  );

  function openBooking(date: string, slotId: string) {
    setSelected({ date, slotId });
    setClassId("7a");
    setSubject("Matemática");
    setPurpose("");
    setError(null);
  }

  function openNextFree() {
    for (const date of dayISOs) {
      if (date < today) continue;
      for (const slot of SLOTS) {
        if (!getReservation(spaceId, date, slot.id) && !getBlock(spaceId, date, slot.id)) {
          openBooking(date, slot.id);
          return;
        }
      }
    }
    setToast({ message: "Não há horários livres nesta semana para este espaço.", tone: "error" });
  }

  function submitBooking() {
    if (!selected) return;
    if (purpose.trim().length < 3) {
      setError("Descreva brevemente a finalidade da aula (mínimo 3 caracteres).");
      return;
    }
    const result = bookReservation({
      spaceId,
      date: selected.date,
      slotId: selected.slotId,
      classId,
      subject,
      purpose: purpose.trim(),
      teacher: userName,
    });
    if (result) {
      setError(result);
      return;
    }
    const slot = SLOTS.find((item) => item.id === selected.slotId);
    setToast({
      message: `Reserva confirmada: ${space.short}, ${formatDateBR(selected.date)} às ${slot?.start}.`,
      tone: "success",
    });
    setSelected(null);
  }

  function handleCancel(id: string, label: string) {
    if (window.confirm(`Cancelar a reserva de ${label}?`)) {
      cancelReservation(id);
      setToast({ message: "Reserva cancelada. O horário voltou a ficar livre.", tone: "success" });
    }
  }

  const selectedSlot = selected ? SLOTS.find((item) => item.id === selected.slotId) : null;

  return (
    <div className="animate-fade-in space-y-6">
      {/* Cabeçalho */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-400">
            Calendário de reservas
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
            Reservas de espaços
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {isProfessor
              ? "Escolha um horário livre e reserve na hora, sem conflito de agendas."
              : "Veja os horários livres e as reservas dos professores nos espaços da escola."}
          </p>
        </div>
        {isProfessor ? (
          <Button onClick={openNextFree}>
            <IconPlus width={16} height={16} />
            Nova reserva
          </Button>
        ) : null}
      </div>

      {/* Seletor de espaço */}
      <div className="grid gap-3 sm:grid-cols-3">
        {SPACES.map((item) => {
          const Icon = SPACE_ICONS[item.id as keyof typeof SPACE_ICONS] ?? IconMonitor;
          const active = item.id === spaceId;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setSpaceId(item.id)}
              className={`flex items-start gap-3 rounded-2xl border px-4 py-3 text-left transition ${
                active
                  ? `${SPACE_ACTIVE[item.tone]} shadow-sm`
                  : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:border-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
              }`}
            >
              <span
                className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                  active ? "bg-white/70 dark:bg-indigo-500/20" : SPACE_SOFT[item.tone]
                }`}
              >
                <Icon width={18} height={18} />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold">{item.name}</span>
                <span className="mt-0.5 block truncate text-[11px] opacity-80">
                  {item.description}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Calendário */}
      <section className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white shadow-sm dark:bg-slate-900">
        <div className="flex flex-col gap-3 border-b border-slate-100 dark:border-slate-800 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <div className="flex items-center gap-2">
            <div className="flex items-center rounded-xl border border-slate-200 dark:border-slate-700 bg-white shadow-sm dark:bg-slate-900">
              <button
                type="button"
                onClick={() => setWeekStart((current) => addDays(current, -7))}
                className="rounded-l-xl px-2.5 py-2 text-slate-500 dark:text-slate-400 transition hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-slate-100"
                aria-label="Semana anterior"
              >
                <IconChevronLeft width={18} height={18} />
              </button>
              <button
                type="button"
                onClick={() => setWeekStart(planningWeekStart())}
                className="border-x border-slate-200 dark:border-slate-700 px-3 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 transition hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                Semana atual
              </button>
              <button
                type="button"
                onClick={() => setWeekStart((current) => addDays(current, 7))}
                className="rounded-r-xl px-2.5 py-2 text-slate-500 dark:text-slate-400 transition hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-slate-100"
                aria-label="Próxima semana"
              >
                <IconChevronRight width={18} height={18} />
              </button>
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{formatWeekTitle(weekStart)}</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">{space.name}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-sm border border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-900" />
              Livre
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-sm border border-indigo-300 bg-indigo-100 dark:border-indigo-400/40 dark:bg-indigo-500/25" />
              {isProfessor ? "Sua reserva" : "Reserva"}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-sm border border-slate-300 bg-slate-100 dark:border-slate-600 dark:bg-slate-800" />
              Reservado
            </span>
            <span className="flex items-center gap-1.5">
              <span className="blocked-stripes h-2.5 w-2.5 rounded-sm border border-slate-300 bg-slate-100 dark:border-slate-600 dark:bg-slate-800" />
              Bloqueado
            </span>
          </div>
        </div>

        <div className="calendar-scroll overflow-x-auto">
          <p className="px-4 pt-2 text-[10px] text-slate-400 dark:text-slate-500 sm:hidden">
            Deslize o calendário para o lado para ver todos os dias.
          </p>
          <div className="min-w-[820px] p-3 sm:p-4">
            {/* Cabeçalho dos dias */}
            <div
              className="grid gap-1.5"
              style={{ gridTemplateColumns: "78px repeat(5, minmax(0, 1fr))" }}
            >
              <div />
              {days.map((day) => {
                const iso = toISO(day);
                const isToday = iso === today;
                return (
                  <div
                    key={iso}
                    className={`rounded-lg px-2 py-1.5 text-center ${
                      isToday ? "bg-indigo-600 text-white" : "bg-slate-50 dark:bg-slate-800/70 text-slate-600 dark:text-slate-300"
                    }`}
                  >
                    <p className="text-[10px] font-medium uppercase tracking-wide opacity-80">
                      {WEEKDAY_SHORT[day.getDay()]}
                    </p>
                    <p className="text-sm font-semibold">
                      {String(day.getDate()).padStart(2, "0")}/
                      {String(day.getMonth() + 1).padStart(2, "0")}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Linhas de horários */}
            <div className="mt-1.5 space-y-1.5">
              {SLOTS.map((slot) => (
                <div
                  key={slot.id}
                  className="grid gap-1.5"
                  style={{ gridTemplateColumns: "78px repeat(5, minmax(0, 1fr))" }}
                >
                  <div className="flex flex-col justify-center rounded-lg bg-slate-50 dark:bg-slate-800/70 px-2 py-1.5">
                    <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">{slot.label}</span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500">
                      {slot.start}–{slot.end}
                    </span>
                  </div>

                  {dayISOs.map((date) => {
                    const reservation = getReservation(spaceId, date, slot.id);
                    const block = getBlock(spaceId, date, slot.id);
                    const mine = isProfessor && reservation?.teacher === userName;
                    const past = isPast(date);

                    if (reservation) {
                      return (
                        <div
                          key={date}
                          className={`min-h-[70px] rounded-lg border px-2 py-1.5 ${
                            mine
                              ? "border-indigo-200 dark:border-indigo-400/30 bg-indigo-50 dark:bg-indigo-500/15"
                              : "border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/70"
                          } ${past ? "opacity-50" : ""}`}
                          title={`${reservation.purpose} — ${reservation.teacher} (${classNameOf(reservation.classId)})`}
                        >
                          <p
                            className={`line-clamp-2 text-[11px] font-semibold leading-snug ${
                              mine ? "text-indigo-900 dark:text-indigo-200" : "text-slate-700 dark:text-slate-300"
                            }`}
                          >
                            {reservation.purpose}
                          </p>
                          <p
                            className={`mt-1 truncate text-[10px] ${
                              mine ? "text-indigo-600 dark:text-indigo-400" : "text-slate-500 dark:text-slate-400"
                            }`}
                          >
                            {classNameOf(reservation.classId)} · {reservation.teacher.split(" ")[0]}
                          </p>
                          {mine ? (
                            <span className="mt-1 inline-flex items-center gap-0.5 text-[9px] font-semibold uppercase tracking-wide text-indigo-500 dark:text-indigo-400">
                              <IconCheck width={9} height={9} /> sua
                            </span>
                          ) : null}
                        </div>
                      );
                    }

                    if (block) {
                      return (
                        <div
                          key={date}
                          className="blocked-stripes min-h-[70px] rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100/70 dark:bg-slate-800/40 px-2 py-1.5"
                          title={`Bloqueado: ${block.reason}`}
                        >
                          <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                            Bloqueado
                          </p>
                          <p className="mt-0.5 line-clamp-2 text-[10px] leading-snug text-slate-500 dark:text-slate-400">
                            {block.reason}
                          </p>
                        </div>
                      );
                    }

                    return (
                      <button
                        key={date}
                        type="button"
                        disabled={past || !isProfessor}
                        onClick={() => openBooking(date, slot.id)}
                        className={`group flex min-h-[70px] flex-col items-center justify-center rounded-lg border border-dashed border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/40 px-2 py-1.5 text-slate-400 dark:text-slate-500 transition ${
                          past || !isProfessor
                            ? "cursor-default opacity-60"
                            : "hover:border-indigo-300 hover:bg-indigo-50/60 dark:hover:border-indigo-400/50 dark:hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:text-indigo-300"
                        }`}
                        aria-label={
                          isProfessor
                            ? `Reservar ${space.name} em ${formatDateBR(date)} às ${slot.start}`
                            : `Horário livre em ${formatDateBR(date)} às ${slot.start}`
                        }
                      >
                        <IconPlus
                          width={15}
                          height={15}
                          className={isProfessor ? "opacity-0 transition group-hover:opacity-100" : "hidden"}
                        />
                        <span className="text-[10px] font-medium">Livre</span>
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-slate-100 dark:border-slate-800 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <p className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
            <IconClock width={13} height={13} />
            {occupancy.used} de {occupancy.total} horários ocupados nesta semana
          </p>
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-32 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
              <div
                className="h-full rounded-full bg-indigo-500 transition-all"
                style={{ width: `${occupancy.percent}%` }}
              />
            </div>
            <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">{occupancy.percent}%</span>
          </div>
        </div>
      </section>

      {/* Minhas reservas */}
      <section className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white shadow-sm dark:bg-slate-900">
        <div className="flex items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 px-5 py-4">
          <div>
            <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              {isProfessor ? "Minhas próximas reservas" : "Próximas reservas da escola"}
            </h2>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              {isProfessor
                ? "Cancelamentos até 2 horas antes do horário."
                : "Horários já reservados pelos professores."}
            </p>
          </div>
          <Badge tone="indigo">{myReservations.length}</Badge>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {myReservations.length === 0 ? (
            <div className="p-5">
              <EmptyState
                icon={<IconCalendar />}
                title="Nenhuma reserva futura"
                description={
                  isProfessor
                    ? "Clique em um horário livre no calendário acima para fazer sua primeira reserva."
                    : "Quando os professores reservarem espaços, as reservas aparecem aqui."
                }
              />
            </div>
          ) : (
            myReservations.map((item) => {
              const itemSpace = SPACES.find((spaceItem) => spaceItem.id === item.spaceId);
              const slot = SLOTS.find((slotItem) => slotItem.id === item.slotId);
              return (
                <div
                  key={item.id}
                  className="flex flex-col gap-3 px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex w-14 shrink-0 flex-col items-center rounded-xl bg-indigo-50 dark:bg-indigo-500/15 px-2 py-1.5 text-indigo-700 dark:text-indigo-300">
                      <span className="text-[10px] font-semibold uppercase">
                        {WEEKDAY_SHORT[fromISO(item.date).getDay()]}
                      </span>
                      <span className="text-sm font-bold leading-tight">
                        {String(fromISO(item.date).getDate()).padStart(2, "0")}
                      </span>
                      <span className="text-[9px] uppercase">
                        {new Intl.DateTimeFormat("pt-BR", { month: "short" })
                          .format(fromISO(item.date))
                          .replace(".", "")}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{item.purpose}</p>
                      <p className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-500 dark:text-slate-400">
                        <span className="flex items-center gap-1">
                          <IconMapPin width={12} height={12} />
                          {itemSpace?.short}
                        </span>
                        <span className="flex items-center gap-1">
                          <IconClock width={12} height={12} />
                          {slot?.start}–{slot?.end}
                        </span>
                        <span>
                          {classNameOf(item.classId)} · {item.subject}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 pl-[4.25rem] sm:pl-0">
                    <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500">
                      {relativeDay(item.date)}
                    </span>
                    {isProfessor ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCancel(item.id, item.purpose)}
                        className="text-rose-600 hover:bg-rose-50 hover:text-rose-700 dark:text-rose-400 dark:hover:bg-rose-500/10 dark:hover:text-rose-300"
                      >
                        <IconTrash width={13} height={13} />
                        Cancelar
                      </Button>
                    ) : null}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* Modal de reserva */}
      <Modal
        open={selected !== null}
        onClose={() => setSelected(null)}
        title="Nova reserva"
        description={
          selected
            ? `${space.name} · ${formatLongDate(selected.date)} · ${selectedSlot?.start}–${selectedSlot?.end}`
            : undefined
        }
        footer={
          <>
            <Button variant="secondary" onClick={() => setSelected(null)}>
              Cancelar
            </Button>
            <Button onClick={submitBooking}>
              <IconCheck width={15} height={15} />
              Confirmar reserva
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <div className="flex items-start gap-3 rounded-xl border border-indigo-100 dark:border-indigo-400/30 bg-indigo-50 dark:bg-indigo-500/15 px-3.5 py-3">
            <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm">
              <SpaceIcon width={15} height={15} />
            </span>
            <div>
              <p className="text-xs font-semibold text-indigo-900 dark:text-indigo-200">{space.name}</p>
              <p className="mt-0.5 text-[11px] leading-relaxed text-indigo-700 dark:text-indigo-300">
                Reserva imediata: assim que confirmar, o horário fica indisponível para os outros
                professores.
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Turma" required>
              <select
                className={inputClass}
                value={classId}
                onChange={(event) => setClassId(event.target.value)}
              >
                {CLASSES.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name} — {item.shift}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Disciplina" required>
              <select
                className={inputClass}
                value={subject}
                onChange={(event) => setSubject(event.target.value)}
              >
                {SUBJECTS.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <Field
            label="Finalidade da aula"
            required
            hint="Aparece no calendário para os outros professores."
          >
            <textarea
              className={`${inputClass} min-h-[84px] resize-y`}
              placeholder="Ex.: pesquisa sobre biomas brasileiros no navegador"
              value={purpose}
              maxLength={100}
              onChange={(event) => setPurpose(event.target.value)}
            />
          </Field>

          {error ? (
            <div className="flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2.5 text-[11px] font-medium text-rose-700">
              <IconAlert width={14} height={14} className="mt-0.5 shrink-0" />
              {error}
            </div>
          ) : null}
        </div>
      </Modal>

      <Toast
        message={toast?.message ?? null}
        tone={toast?.tone}
        onClose={closeToast}
      />
    </div>
  );
}
