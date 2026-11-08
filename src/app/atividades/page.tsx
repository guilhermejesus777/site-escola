"use client";

import { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import {
  IconAlert,
  IconBook,
  IconCheck,
  IconChevronLeft,
  IconChevronRight,
  IconDownload,
  IconPaperclip,
  IconPlus,
  IconTrash,
  IconUsers,
} from "@/components/icons";
import {
  Badge,
  Button,
  EmptyState,
  Field,
  Modal,
  Toast,
  ConfirmDialog,
  inputClass,
  type BadgeTone,
} from "@/components/ui";
import {
  addMonths,
  formatDateBR,
  formatFileSize,
  formatLongDate,
  formatMonthTitle,
  fromISO,
  isSameDay,
  monthMatrix,
  relativeDay,
  toISO,
  todayISO,
} from "@/lib/date";
import {
  CLASSES,
  KIND_LABEL,
  KIND_TONE,
  SUBJECTS,
} from "@/lib/mock-data";
import { useStore } from "@/lib/store";
import type { Activity, ActivityKind, Attachment } from "@/types";

const KIND_DOT: Record<ActivityKind, string> = {
  prova: "bg-rose-500",
  trabalho: "bg-amber-500",
  seminario: "bg-violet-500",
  outro: "bg-sky-500",
};

function classNameOf(classId: string): string {
  return CLASSES.find((item) => item.id === classId)?.name ?? classId;
}

function activityDate(activity: Activity): string {
  return activity.dueDate ?? activity.examDate ?? "";
}

function datesOf(activity: Activity): string[] {
  const values = new Set<string>();
  if (activity.examDate) values.add(activity.examDate);
  if (activity.dueDate) values.add(activity.dueDate);
  return [...values];
}

export default function AtividadesPage() {
  const { activities, addActivity, deleteActivity, user } = useStore();

  const isProfessor = user?.role === "professor";
  const userName = user?.name ?? "";

  const [month, setMonth] = useState<Date>(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const [classFilter, setClassFilter] = useState("all");
  const [selectedDay, setSelectedDay] = useState<string>(() => {
    const next = activities
      .map(activityDate)
      .filter((date) => date >= todayISO())
      .sort()[0];
    return next ?? todayISO();
  });
  const [detailId, setDetailId] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; tone: "success" | "error" } | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const [title, setTitle] = useState("");
  const [kind, setKind] = useState<ActivityKind>("prova");
  const [classId, setClassId] = useState("7a");
  const [subject, setSubject] = useState("Matemática");
  const [examDate, setExamDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [description, setDescription] = useState("");
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [formError, setFormError] = useState<string | null>(null);

  const closeToast = useCallback(() => setToast(null), []);
  const today = todayISO();

  const filtered = useMemo(
    () => activities.filter((item) => classFilter === "all" || item.classId === classFilter),
    [activities, classFilter],
  );

  const upcoming = useMemo(
    () =>
      filtered
        .filter((item) => activityDate(item) >= today)
        .sort((a, b) => activityDate(a).localeCompare(activityDate(b))),
    [filtered, today],
  );

  const dayActivities = useMemo(
    () =>
      filtered
        .filter((item) => datesOf(item).includes(selectedDay))
        .sort((a, b) => a.title.localeCompare(b.title)),
    [filtered, selectedDay],
  );

  const activitiesByDate = useMemo(() => {
    const map = new Map<string, ActivityKind[]>();
    for (const activity of filtered) {
      for (const date of datesOf(activity)) {
        const list = map.get(date) ?? [];
        list.push(activity.kind);
        map.set(date, list);
      }
    }
    return map;
  }, [filtered]);

  const detail = activities.find((item) => item.id === detailId) ?? null;
  const weeks = useMemo(() => monthMatrix(month.getFullYear(), month.getMonth()), [month]);

  const counts = useMemo(
    () => ({
      provas: filtered.filter((item) => item.kind === "prova" && activityDate(item) >= today).length,
      entregas: filtered.filter(
        (item) => item.kind !== "prova" && activityDate(item) >= today,
      ).length,
    }),
    [filtered, today],
  );

  function openForm() {
    setTitle("");
    setKind("prova");
    setClassId("7a");
    setSubject("Matemática");
    setExamDate("");
    setDueDate("");
    setDescription("");
    setAttachments([]);
    setFormError(null);
    setFormOpen(true);
  }

  function handleFiles(files: FileList | null) {
    if (!files) return;
    const next = Array.from(files).map((file) => ({ name: file.name, size: file.size }));
    setAttachments((current) => [...current, ...next]);
  }

  function submitActivity() {
    if (title.trim().length < 3) {
      setFormError("Informe um título com pelo menos 3 caracteres.");
      return;
    }
    if (!examDate && !dueDate) {
      setFormError("Informe a data da prova ou o prazo de entrega.");
      return;
    }
    addActivity({
      title: title.trim(),
      kind,
      classId,
      subject,
      teacher: userName,
      examDate: examDate || undefined,
      dueDate: dueDate || examDate || undefined,
      description: description.trim(),
      attachments,
    });
    setToast({ message: "Atividade publicada na agenda da turma.", tone: "success" });
    setFormOpen(false);
    if (dueDate || examDate) {
      setSelectedDay(dueDate || examDate);
    }
  }

  function handleDelete() {
    if (!detail) return;
    setConfirmDelete(true);
  }

  function confirmDeleteActivity() {
    if (!detail) return;
    deleteActivity(detail.id);
    setConfirmDelete(false);
    setDetailId(null);
    setToast({ message: "Atividade excluída.", tone: "success" });
  }

  function openDetail(id: string) {
    setDetailId(id);
  }

  return (
    <div className="animate-fade-in space-y-6">
      {/* Cabeçalho */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-400">
            Agenda pedagógica
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
            Provas e atividades
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {isProfessor
              ? "Publique provas, trabalhos e entregas das suas turmas."
              : "Consulte as datas de provas, trabalhos e entregas de todas as turmas."}
          </p>
        </div>
        {isProfessor ? (
          <Button onClick={openForm}>
            <IconPlus width={16} height={16} />
            Nova atividade
          </Button>
        ) : null}
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setClassFilter("all")}
          className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
            classFilter === "all"
              ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
              : "border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
          }`}
        >
          Todas as turmas
        </button>
        {CLASSES.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setClassFilter(item.id)}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
              classFilter === item.id
                ? "bg-indigo-600 text-white dark:bg-indigo-500"
                : "border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
            }`}
          >
            {item.name}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-rose-500" /> Provas: {counts.provas}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-amber-500" /> Entregas: {counts.entregas}
          </span>
        </div>
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        {/* Calendário */}
        <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white shadow-sm dark:bg-slate-900">
          <header className="flex items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 px-5 py-3.5">
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setMonth((current) => addMonths(current, -1))}
                className="rounded-lg p-1.5 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-slate-100"
                aria-label="Mês anterior"
              >
                <IconChevronLeft width={18} height={18} />
              </button>
              <p className="min-w-[9rem] text-center text-sm font-semibold text-slate-900 dark:text-slate-100">
                {formatMonthTitle(month)}
              </p>
              <button
                type="button"
                onClick={() => setMonth((current) => addMonths(current, 1))}
                className="rounded-lg p-1.5 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-slate-100"
                aria-label="Próximo mês"
              >
                <IconChevronRight width={18} height={18} />
              </button>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                const now = new Date();
                setMonth(new Date(now.getFullYear(), now.getMonth(), 1));
                setSelectedDay(todayISO());
              }}
            >
              Hoje
            </Button>
          </header>

          <div className="px-4 pb-2 pt-3 sm:px-5">
            <div className="grid grid-cols-7 gap-1 text-center">
              {["dom", "seg", "ter", "qua", "qui", "sex", "sáb"].map((label) => (
                <span
                  key={label}
                  className="pb-1 text-[10px] font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500"
                >
                  {label}
                </span>
              ))}
              {weeks.flat().map((day) => {
                const iso = toISO(day);
                const inMonth = day.getMonth() === month.getMonth();
                const isToday = isSameDay(day, new Date());
                const selected = iso === selectedDay;
                const kinds = activitiesByDate.get(iso) ?? [];
                return (
                  <button
                    key={iso}
                    type="button"
                    onClick={() => setSelectedDay(iso)}
                    className={`relative flex h-10 flex-col items-center justify-center rounded-lg text-xs transition sm:h-12 ${
                      selected
                        ? "bg-indigo-600 font-semibold text-white shadow-sm"
                        : isToday
                          ? "bg-indigo-50 dark:bg-indigo-500/15 font-semibold text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-500/25"
                          : inMonth
                            ? "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                            : "text-slate-300 dark:text-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800"
                    }`}
                    aria-label={`Ver atividades de ${formatDateBR(iso)}`}
                  >
                    <span>{day.getDate()}</span>
                    <span className="mt-0.5 flex h-1.5 items-center justify-center gap-0.5">
                      {kinds.slice(0, 3).map((kind, index) => (
                        <span
                          key={`${kind}-${index}`}
                          className={`h-1.5 w-1.5 rounded-full ${
                            selected ? "bg-white/80" : KIND_DOT[kind]
                          }`}
                        />
                      ))}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="border-t border-slate-100 dark:border-slate-800 px-5 py-3.5">
            <div className="mb-2 flex items-center justify-between gap-2">
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-100">
                {formatLongDate(selectedDay)}
              </p>
              <Badge tone={dayActivities.length ? "indigo" : "slate"}>
                {dayActivities.length} {dayActivities.length === 1 ? "atividade" : "atividades"}
              </Badge>
            </div>
            {dayActivities.length === 0 ? (
              <p className="rounded-lg bg-slate-50 dark:bg-slate-800/70 px-3 py-2.5 text-[11px] text-slate-500 dark:text-slate-400">
                Nenhuma prova ou entrega marcada para este dia.
              </p>
            ) : (
              <ul className="space-y-1.5">
                {dayActivities.map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => openDetail(item.id)}
                      className="flex w-full items-center gap-2 rounded-lg border border-slate-100 dark:border-slate-800 px-2.5 py-2 text-left transition hover:border-indigo-200 dark:hover:border-indigo-400/30 hover:bg-indigo-50/50 dark:hover:bg-indigo-500/10"
                    >
                      <span
                        className={`h-2 w-2 shrink-0 rounded-full ${KIND_DOT[item.kind]}`}
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[11px] font-semibold text-slate-800 dark:text-slate-100">
                          {item.title}
                        </span>
                        <span className="block text-[10px] text-slate-500 dark:text-slate-400">
                          {classNameOf(item.classId)} · {item.subject}
                        </span>
                      </span>
                      <IconChevronRight width={14} height={14} className="text-slate-300 dark:text-slate-600" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        {/* Próximas entregas */}
        <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white shadow-sm dark:bg-slate-900">
          <header className="flex items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 px-5 py-3.5">
            <div>
              <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Próximas entregas</h2>
              <p className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">
                Prova e trabalhos ordenados por data
              </p>
            </div>
            <Badge tone="slate">{upcoming.length}</Badge>
          </header>

          <div className="max-h-[520px] space-y-2 overflow-y-auto p-3 sm:p-4">
            {upcoming.length === 0 ? (
              <EmptyState
                icon={<IconBook />}
                title="Nada marcado por aqui"
                description="Quando um professor publicar uma prova ou entrega, ela aparece nesta lista."
                action={
                  isProfessor ? (
                    <Button size="sm" onClick={openForm}>
                      <IconPlus width={14} height={14} />
                      Publicar atividade
                    </Button>
                  ) : undefined
                }
              />
            ) : (
              upcoming.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => openDetail(item.id)}
                  className="flex w-full items-start gap-3 rounded-xl border border-slate-100 dark:border-slate-800 p-3 text-left transition hover:border-indigo-200 dark:hover:border-indigo-400/30 hover:bg-indigo-50/40 dark:hover:bg-indigo-500/10"
                >
                  <div className="flex w-12 shrink-0 flex-col items-center rounded-lg bg-slate-50 dark:bg-slate-800/70 px-1 py-1.5">
                    <span className="text-[9px] font-semibold uppercase text-slate-400 dark:text-slate-500">
                      {new Intl.DateTimeFormat("pt-BR", { month: "short" })
                        .format(fromISO(activityDate(item)))
                        .replace(".", "")}
                    </span>
                    <span className="text-base font-bold leading-tight text-slate-800 dark:text-slate-100">
                      {String(fromISO(activityDate(item)).getDate()).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <Badge tone={KIND_TONE[item.kind] as BadgeTone}>{KIND_LABEL[item.kind]}</Badge>
                      <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500">
                        {relativeDay(activityDate(item))}
                      </span>
                    </div>
                    <p className="mt-1 truncate text-xs font-semibold text-slate-900 dark:text-slate-100">
                      {item.title}
                    </p>
                    <p className="mt-0.5 flex items-center gap-2 text-[10px] text-slate-500 dark:text-slate-400">
                      <span>{classNameOf(item.classId)}</span>
                      <span>·</span>
                      <span>{item.subject}</span>
                      {item.attachments.length > 0 ? (
                        <span className="ml-auto flex items-center gap-0.5">
                          <IconPaperclip width={11} height={11} />
                          {item.attachments.length}
                        </span>
                      ) : null}
                    </p>
                  </div>
                </button>
              ))
            )}
          </div>
        </section>
      </div>

      <p className="text-center text-[11px] text-slate-400 dark:text-slate-500">
        {isProfessor ? "Você pode publicar e excluir as atividades que criar. " : ""}
        {isProfessor ? (
          <Link href="/configuracoes" className="font-medium text-indigo-600 dark:text-indigo-400 hover:underline">
            Ver permissões
          </Link>
        ) : (
          "Apenas professores podem publicar ou excluir atividades."
        )}
      </p>

      {/* Detalhe */}
      <Modal
        open={detail !== null}
        onClose={() => setDetailId(null)}
        title={detail?.title ?? ""}
        description={detail ? `${classNameOf(detail.classId)} · ${detail.subject}` : undefined}
        footer={
          <>
            {isProfessor && detail?.teacher === userName ? (
              <Button variant="danger" onClick={handleDelete}>
                <IconTrash width={15} height={15} />
                Excluir
              </Button>
            ) : null}
            <Button variant="secondary" onClick={() => setDetailId(null)}>
              Fechar
            </Button>
          </>
        }
      >
        {detail ? (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone={KIND_TONE[detail.kind] as BadgeTone}>{KIND_LABEL[detail.kind]}</Badge>
              <Badge tone="slate">
                <IconUsers width={11} height={11} />
                {classNameOf(detail.classId)}
              </Badge>
              <Badge tone="slate">{detail.subject}</Badge>
            </div>

            <div className="grid gap-2 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/70/70 dark:bg-slate-800/50 p-3 sm:grid-cols-2">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
                  Data da prova
                </p>
                <p className="mt-0.5 text-xs font-medium text-slate-800 dark:text-slate-100">
                  {detail.examDate ? formatDateBR(detail.examDate) : "Não se aplica"}
                </p>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
                  Prazo de entrega
                </p>
                <p className="mt-0.5 text-xs font-medium text-slate-800 dark:text-slate-100">
                  {detail.dueDate ? formatDateBR(detail.dueDate) : "Não se aplica"}
                </p>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
                  Professor(a)
                </p>
                <p className="mt-0.5 text-xs font-medium text-slate-800 dark:text-slate-100">{detail.teacher}</p>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
                  Publicado em
                </p>
                <p className="mt-0.5 text-xs font-medium text-slate-800 dark:text-slate-100">
                  {formatDateBR(detail.createdAt.slice(0, 10))}
                </p>
              </div>
            </div>

            <div>
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
                Orientações
              </p>
              <p className="whitespace-pre-line text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                {detail.description || "Sem orientações adicionais."}
              </p>
            </div>

            <div>
              <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
                Anexos
              </p>
              {detail.attachments.length === 0 ? (
                <p className="text-xs text-slate-400 dark:text-slate-500">Nenhum arquivo anexado.</p>
              ) : (
                <ul className="space-y-1.5">
                  {detail.attachments.map((file) => (
                    <li
                      key={file.name}
                      className="flex items-center gap-2 rounded-lg border border-slate-100 dark:border-slate-800 px-2.5 py-2"
                    >
                      <IconPaperclip width={14} height={14} className="text-slate-400 dark:text-slate-500" />
                      <span className="min-w-0 flex-1 truncate text-[11px] font-medium text-slate-700 dark:text-slate-300">
                        {file.name}
                      </span>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500">
                        {formatFileSize(file.size)}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setToast({
                            message: "Download simulado: no protótipo os arquivos não são reais.",
                            tone: "error",
                          })
                        }
                        className="rounded p-1 text-slate-400 dark:text-slate-500 transition hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-indigo-300"
                        aria-label={`Baixar ${file.name}`}
                      >
                        <IconDownload width={14} height={14} />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ) : null}
      </Modal>

      {/* Nova atividade */}
      <Modal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        title="Publicar prova ou atividade"
        description="Aparece no calendário da turma e nos próximos vencimentos."
        size="lg"
        footer={
          <>
            <Button variant="secondary" onClick={() => setFormOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={submitActivity}>
              <IconCheck width={15} height={15} />
              Publicar
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <Field label="Título" required>
            <input
              className={inputClass}
              placeholder="Ex.: Prova de Matemática — Frações"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              maxLength={80}
            />
          </Field>

          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Tipo" required>
              <select
                className={inputClass}
                value={kind}
                onChange={(event) => setKind(event.target.value as ActivityKind)}
              >
                <option value="prova">Prova</option>
                <option value="trabalho">Trabalho</option>
                <option value="seminario">Seminário</option>
                <option value="outro">Outra atividade</option>
              </select>
            </Field>
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
            <Field label="Data da prova" hint="Deixe vazio se for só entrega.">
              <input
                type="date"
                className={inputClass}
                value={examDate}
                onChange={(event) => setExamDate(event.target.value)}
              />
            </Field>
            <Field label="Prazo de entrega" hint="Obrigatório se não houver data de prova.">
              <input
                type="date"
                className={inputClass}
                value={dueDate}
                onChange={(event) => setDueDate(event.target.value)}
              />
            </Field>
          </div>

          <Field label="Orientações para os alunos">
            <textarea
              className={`${inputClass} min-h-[90px] resize-y`}
              placeholder="Conteúdo, formato de entrega, materiais permitidos…"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </Field>

          <Field label="Anexos" hint="PDF, DOCX, imagens ou links. Neste protótipo os arquivos não são enviados de verdade.">
            <div className="rounded-xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/70/70 dark:bg-slate-800/50 px-3 py-3">
              <input
                type="file"
                multiple
                onChange={(event) => handleFiles(event.target.files)}
                className="block w-full text-xs text-slate-500 dark:text-slate-400 file:mr-3 file:cursor-pointer file:rounded-lg file:border-0 file:bg-indigo-600 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-white hover:file:bg-indigo-700"
              />
              {attachments.length > 0 ? (
                <ul className="mt-2 space-y-1">
                  {attachments.map((file, index) => (
                    <li
                      key={`${file.name}-${index}`}
                      className="flex items-center gap-2 rounded-lg bg-white px-2.5 dark:bg-slate-800 py-1.5 text-[11px] text-slate-600 dark:text-slate-300 shadow-sm"
                    >
                      <IconPaperclip width={12} height={12} className="text-slate-400 dark:text-slate-500" />
                      <span className="min-w-0 flex-1 truncate">{file.name}</span>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500">
                        {formatFileSize(file.size)}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setAttachments((current) =>
                            current.filter((_, itemIndex) => itemIndex !== index),
                          )
                        }
                        className="rounded p-0.5 text-slate-400 dark:text-slate-500 hover:text-rose-600"
                        aria-label={`Remover ${file.name}`}
                      >
                        <IconTrash width={12} height={12} />
                      </button>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </Field>

          {formError ? (
            <div className="flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2.5 text-[11px] font-medium text-rose-700">
              <IconAlert width={14} height={14} className="mt-0.5 shrink-0" />
              {formError}
            </div>
          ) : null}
        </div>
      </Modal>

      <Toast message={toast?.message ?? null} tone={toast?.tone} onClose={closeToast} />

      <ConfirmDialog
        open={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        onConfirm={confirmDeleteActivity}
        title="Excluir atividade?"
        description={
          detail
            ? `"${detail.title}" será apagada do banco de dados e desaparecerá da agenda das turmas. Essa ação não pode ser desfeita.`
            : ""
        }
        confirmLabel="Sim, excluir"
      />
    </div>
  );
}
