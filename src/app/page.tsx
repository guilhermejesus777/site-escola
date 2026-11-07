"use client";

import Link from "next/link";
import {
  IconArrowRight,
  IconBook,
  IconCalendar,
  IconClock,
  IconMapPin,
  IconPlus,
  IconSparkles,
  IconUsers,
} from "@/components/icons";
import { Badge, SectionCard } from "@/components/ui";
import {
  addDays,
  formatDateShort,
  formatLongDate,
  fromISO,
  planningWeekStart,
  relativeDay,
  todayISO,
  toISO,
} from "@/lib/date";
import {
  CLASSES,
  CURRENT_USER,
  KIND_LABEL,
  KIND_TONE,
  SLOTS,
  SPACES,
} from "@/lib/mock-data";
import { useStore } from "@/lib/store";
import type { BadgeTone } from "@/components/ui";

function classNameOf(classId: string): string {
  return CLASSES.find((item) => item.id === classId)?.name ?? classId;
}

function daysUntil(dateISO: string): number {
  return Math.round(
    (fromISO(dateISO).getTime() - fromISO(todayISO()).getTime()) / 86_400_000,
  );
}

export default function HomePage() {
  const { reservations, activities, blocks, getReservation, getBlock } = useStore();
  const today = todayISO();
  const monday = planningWeekStart();

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Bom dia" : hour < 18 ? "Boa tarde" : "Boa noite";

  const myNext = reservations
    .filter((item) => item.teacher === CURRENT_USER && item.date >= today)
    .sort((a, b) =>
      a.date === b.date
        ? a.slotId.localeCompare(b.slotId)
        : a.date.localeCompare(b.date),
    )[0];

  const upcomingReservations = reservations
    .filter((item) => item.date >= today)
    .sort((a, b) =>
      a.date === b.date
        ? a.slotId.localeCompare(b.slotId)
        : a.date.localeCompare(b.date),
    )
    .slice(0, 5);

  const upcomingActivities = activities
    .filter((item) => (item.dueDate ?? item.examDate ?? "") >= today)
    .sort((a, b) =>
      (a.dueDate ?? a.examDate ?? "").localeCompare(b.dueDate ?? b.examDate ?? ""),
    )
    .slice(0, 4);

  const myFuture = reservations.filter(
    (item) => item.teacher === CURRENT_USER && item.date >= today,
  ).length;
  const deliveries7 = activities.filter((item) => {
    const date = item.dueDate ?? item.examDate;
    if (!date) return false;
    const diff = daysUntil(date);
    return diff >= 0 && diff <= 7;
  }).length;
  const exams30 = activities.filter((item) => {
    if (!item.examDate) return false;
    const diff = daysUntil(item.examDate);
    return diff >= 0 && diff <= 30;
  }).length;

  let labUsed = 0;
  const weekDays = Array.from({ length: 5 }, (_, index) => toISO(addDays(monday, index)));
  for (const date of weekDays) {
    for (const slot of SLOTS) {
      if (getReservation("lab", date, slot.id) || getBlock("lab", date, slot.id)) {
        labUsed += 1;
      }
    }
  }
  const labTotal = weekDays.length * SLOTS.length;
  const labPercent = Math.round((labUsed / labTotal) * 100);

  const stats = [
    {
      label: "Minhas reservas",
      value: myFuture,
      hint: "próximas",
      icon: IconCalendar,
      tone: "bg-indigo-50 text-indigo-600",
    },
    {
      label: "Entregas",
      value: deliveries7,
      hint: "nos próximos 7 dias",
      icon: IconBook,
      tone: "bg-amber-50 text-amber-600",
    },
    {
      label: "Provas",
      value: exams30,
      hint: "nos próximos 30 dias",
      icon: IconSparkles,
      tone: "bg-rose-50 text-rose-600",
    },
    {
      label: "Turmas",
      value: CLASSES.length,
      hint: "ativas no sistema",
      icon: IconUsers,
      tone: "bg-emerald-50 text-emerald-600",
    },
  ];

  return (
    <div className="animate-fade-in space-y-6">
      <header className="flex flex-col gap-1">
        <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
          {formatLongDate(today)}
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          {greeting}, {CURRENT_USER.split(" ")[0]} 👋
        </h1>
        <p className="text-sm text-slate-500">
          Veja o que está acontecendo na escola e organize sua semana.
        </p>
      </header>

      {/* Destaque */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-600 to-violet-700 px-5 py-5 text-white shadow-lg sm:px-6 sm:py-6">
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10" />
        <div className="pointer-events-none absolute -bottom-14 right-16 h-32 w-32 rounded-full bg-white/5" />
        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-indigo-200">
              Sua próxima reserva
            </p>
            {myNext ? (
              <>
                <p className="mt-1 text-lg font-semibold sm:text-xl">
                  {SPACES.find((item) => item.id === myNext.spaceId)?.name}
                </p>
                <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-indigo-100">
                  <span className="flex items-center gap-1.5">
                    <IconCalendar width={13} height={13} />
                    {formatDateShort(myNext.date)} · {relativeDay(myNext.date)}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <IconClock width={13} height={13} />
                    {SLOTS.find((slot) => slot.id === myNext.slotId)?.start}–
                    {SLOTS.find((slot) => slot.id === myNext.slotId)?.end}
                  </span>
                  <span>{classNameOf(myNext.classId)}</span>
                </div>
              </>
            ) : (
              <>
                <p className="mt-1 text-lg font-semibold">Nenhuma reserva futura</p>
                <p className="mt-1 text-xs text-indigo-100">
                  Que tal garantir o laboratório para a próxima aula?
                </p>
              </>
            )}
          </div>
          <div className="flex shrink-0 gap-2">
            <Link
              href="/reservas"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-white px-4 text-sm font-semibold text-indigo-700 shadow-sm transition hover:bg-indigo-50"
            >
              <IconPlus width={15} height={15} />
              Reservar horário
            </Link>
          </div>
        </div>
      </div>

      {/* Indicadores */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-xl ${stat.tone}`}
              >
                <Icon width={17} height={17} />
              </span>
              <p className="mt-3 text-2xl font-semibold tracking-tight text-slate-900">
                {stat.value}
              </p>
              <p className="text-[11px] font-medium text-slate-600">{stat.label}</p>
              <p className="text-[10px] text-slate-400">{stat.hint}</p>
            </div>
          );
        })}
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-2">
          {/* Próximas reservas */}
          <SectionCard
            title="Agenda da escola"
            description="Próximas reservas feitas pelos professores"
            action={
              <Link
                href="/reservas"
                className="flex items-center gap-1 text-[11px] font-semibold text-indigo-600 hover:text-indigo-800"
              >
                Ver calendário
                <IconArrowRight width={13} height={13} />
              </Link>
            }
          >
            {upcomingReservations.length === 0 ? (
              <p className="py-4 text-center text-xs text-slate-500">
                Nenhuma reserva futura registrada.
              </p>
            ) : (
              <ul className="divide-y divide-slate-100">
                {upcomingReservations.map((item) => {
                  const space = SPACES.find((spaceItem) => spaceItem.id === item.spaceId);
                  const slot = SLOTS.find((slotItem) => slotItem.id === item.slotId);
                  const mine = item.teacher === CURRENT_USER;
                  return (
                    <li key={item.id} className="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0">
                      <div className="flex w-12 shrink-0 flex-col items-center rounded-lg bg-slate-50 px-1 py-1">
                        <span className="text-[9px] font-semibold uppercase text-slate-400">
                          {new Intl.DateTimeFormat("pt-BR", { month: "short" })
                            .format(fromISO(item.date))
                            .replace(".", "")}
                        </span>
                        <span className="text-sm font-bold leading-tight text-slate-700">
                          {String(fromISO(item.date).getDate()).padStart(2, "0")}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-semibold text-slate-900">
                          {item.purpose}
                        </p>
                        <p className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[10px] text-slate-500">
                          <span className="flex items-center gap-1">
                            <IconMapPin width={10} height={10} />
                            {space?.short}
                          </span>
                          <span className="flex items-center gap-1">
                            <IconClock width={10} height={10} />
                            {slot?.start}
                          </span>
                          <span>{classNameOf(item.classId)}</span>
                          <span>· {item.teacher.split(" ")[0]}</span>
                        </p>
                      </div>
                      {mine ? <Badge tone="indigo">sua</Badge> : null}
                    </li>
                  );
                })}
              </ul>
            )}
          </SectionCard>

          {/* Próximas entregas */}
          <SectionCard
            title="Próximas entregas"
            description="Provas e trabalhos das turmas"
            action={
              <Link
                href="/atividades"
                className="flex items-center gap-1 text-[11px] font-semibold text-indigo-600 hover:text-indigo-800"
              >
                Ver agenda
                <IconArrowRight width={13} height={13} />
              </Link>
            }
          >
            {upcomingActivities.length === 0 ? (
              <p className="py-4 text-center text-xs text-slate-500">
                Nenhuma entrega marcada.
              </p>
            ) : (
              <ul className="divide-y divide-slate-100">
                {upcomingActivities.map((item) => {
                  const date = item.dueDate ?? item.examDate ?? "";
                  return (
                    <li key={item.id} className="flex items-start gap-3 py-2.5 first:pt-0 last:pb-0">
                      <div className="flex w-12 shrink-0 flex-col items-center rounded-lg bg-amber-50 px-1 py-1 text-amber-700">
                        <span className="text-[9px] font-semibold uppercase">
                          {new Intl.DateTimeFormat("pt-BR", { month: "short" })
                            .format(fromISO(date))
                            .replace(".", "")}
                        </span>
                        <span className="text-sm font-bold leading-tight">
                          {String(fromISO(date).getDate()).padStart(2, "0")}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <Badge tone={KIND_TONE[item.kind] as BadgeTone}>
                            {KIND_LABEL[item.kind]}
                          </Badge>
                          <span className="text-[10px] text-slate-400">
                            {relativeDay(date)}
                          </span>
                        </div>
                        <p className="mt-0.5 truncate text-xs font-semibold text-slate-900">
                          {item.title}
                        </p>
                        <p className="text-[10px] text-slate-500">
                          {classNameOf(item.classId)} · {item.subject}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </SectionCard>
        </div>

        {/* Coluna lateral */}
        <div className="space-y-5">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h2 className="text-sm font-semibold text-slate-900">Laboratório de Informática</h2>
                <p className="mt-0.5 text-[11px] text-slate-500">
                  Ocupação desta semana
                </p>
              </div>
              <Badge tone={labPercent > 70 ? "amber" : "emerald"}>{labPercent}%</Badge>
            </div>

            <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500"
                style={{ width: `${labPercent}%` }}
              />
            </div>
            <p className="mt-2 text-[11px] text-slate-500">
              {labUsed} de {labTotal} horários ocupados por reservas e bloqueios.
            </p>

            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              {SPACES.map((item) => {
                const count = weekDays.reduce(
                  (total, date) =>
                    total +
                    SLOTS.filter((slot) => getReservation(item.id, date, slot.id)).length,
                  0,
                );
                return (
                  <div key={item.id} className="rounded-lg bg-slate-50 px-1.5 py-2">
                    <p className="text-base font-semibold text-slate-800">{count}</p>
                    <p className="truncate text-[9px] text-slate-500">{item.short}</p>
                  </div>
                );
              })}
            </div>

            <Link
              href="/reservas"
              className="mt-4 flex h-9 items-center justify-center gap-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Gerenciar reservas
              <IconArrowRight width={13} height={13} />
            </Link>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-900">Acesso rápido</h2>
            <div className="mt-3 space-y-2">
              <Link
                href="/reservas"
                className="flex items-center gap-2.5 rounded-xl border border-slate-100 px-3 py-2.5 text-xs font-medium text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50/50"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                  <IconCalendar width={14} height={14} />
                </span>
                Reservar o laboratório
                <IconArrowRight width={13} height={13} className="ml-auto text-slate-300" />
              </Link>
              <Link
                href="/atividades"
                className="flex items-center gap-2.5 rounded-xl border border-slate-100 px-3 py-2.5 text-xs font-medium text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50/50"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                  <IconBook width={14} height={14} />
                </span>
                Publicar atividade
                <IconArrowRight width={13} height={13} className="ml-auto text-slate-300" />
              </Link>
              <Link
                href="/configuracoes"
                className="flex items-center gap-2.5 rounded-xl border border-slate-100 px-3 py-2.5 text-xs font-medium text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50/50"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                  <IconClock width={14} height={14} />
                </span>
                Horários e regras
                <IconArrowRight width={13} height={13} className="ml-auto text-slate-300" />
              </Link>
            </div>
          </section>

          <div className="rounded-2xl border border-dashed border-slate-300 bg-white/60 p-4">
            <p className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-700">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
              Modo demonstração
            </p>
            <p className="mt-1 text-[11px] leading-relaxed text-slate-500">
              As reservas e atividades abaixo são fictícias e ficam salvas somente neste
              navegador. Nada é enviado para a escola.
            </p>
          </div>
        </div>
      </div>

      <p className="pb-2 text-center text-[11px] text-slate-400">
        {blocks.length} bloqueios ativos · {reservations.length} reservas · {activities.length}{" "}
        atividades cadastradas
      </p>
    </div>
  );
}
