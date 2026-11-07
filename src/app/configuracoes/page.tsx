"use client";

import { useCallback, useState } from "react";
import {
  IconAlert,
  IconBall,
  IconCheck,
  IconClock,
  IconMapPin,
  IconMonitor,
  IconPlus,
  IconSettings,
  IconUsers,
  IconVideo,
  IconX,
} from "@/components/icons";
import { Badge, Button, Toast } from "@/components/ui";
import { SLOTS, SPACES } from "@/lib/mock-data";
import { useStore } from "@/lib/store";
import type { Space } from "@/types";

const SPACE_ICONS = {
  lab: IconMonitor,
  video: IconVideo,
  quadra: IconBall,
} as const;

const SPACE_TONE: Record<Space["tone"], string> = {
  indigo: "bg-indigo-50 text-indigo-600",
  sky: "bg-sky-50 text-sky-600",
  emerald: "bg-emerald-50 text-emerald-600",
};

function Toggle({
  checked,
  onChange,
  label,
  description,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  label: string;
  description: string;
}) {
  return (
    <div className="flex items-start justify-between gap-3 py-3 first:pt-0 last:pb-0">
      <div>
        <p className="text-xs font-semibold text-slate-800">{label}</p>
        <p className="mt-0.5 text-[11px] leading-relaxed text-slate-500">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={`relative mt-0.5 h-5 w-9 shrink-0 rounded-full transition-colors ${
          checked ? "bg-indigo-600" : "bg-slate-200"
        }`}
      >
        <span
          className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-all ${
            checked ? "left-[1.125rem]" : "left-0.5"
          }`}
        />
      </button>
    </div>
  );
}

const PERMISSIONS = [
  { label: "Ver calendário de reservas", teacher: true, student: true, admin: true },
  { label: "Reservar espaços", teacher: true, student: false, admin: true },
  { label: "Bloquear horários", teacher: false, student: false, admin: true },
  { label: "Publicar provas e atividades", teacher: true, student: false, admin: true },
  { label: "Gerenciar usuários e turmas", teacher: false, student: false, admin: true },
];

export default function ConfiguracoesPage() {
  const { resetDemo } = useStore();
  const [autoApprove, setAutoApprove] = useState(true);
  const [limitReservations, setLimitReservations] = useState(false);
  const [notifyStudents, setNotifyStudents] = useState(true);
  const [toast, setToast] = useState<string | null>(null);
  const closeToast = useCallback(() => setToast(null), []);

  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
          Painel da coordenação
        </p>
        <h1 className="mt-1 flex items-center gap-2 text-2xl font-semibold tracking-tight text-slate-900">
          <IconSettings width={22} height={22} className="text-slate-400" />
          Configurações
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Espaços, grade de horários, regras de reserva e permissões.
        </p>
      </div>

      <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
        <IconAlert width={16} height={16} className="mt-0.5 shrink-0 text-amber-600" />
        <p className="text-[11px] leading-relaxed text-amber-800">
          <strong className="font-semibold">Prévia do painel administrativo.</strong> Nesta
          demonstração os ajustes abaixo não são salvos de verdade e servem apenas para mostrar
          como a coordenação vai operar o sistema.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {/* Espaços */}
        <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <header className="flex items-center justify-between gap-3 border-b border-slate-100 px-5 py-4">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">Espaços reserváveis</h2>
              <p className="mt-0.5 text-[11px] text-slate-500">
                {SPACES.length} espaços cadastrados
              </p>
            </div>
            <Button variant="secondary" size="sm" onClick={() => setToast("Cadastro de espaços disponível na versão final.")}>
              <IconPlus width={13} height={13} />
              Adicionar
            </Button>
          </header>
          <ul className="divide-y divide-slate-100 px-5">
            {SPACES.map((space) => {
              const Icon = SPACE_ICONS[space.id as keyof typeof SPACE_ICONS] ?? IconMonitor;
              return (
                <li key={space.id} className="flex items-center gap-3 py-3.5">
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${SPACE_TONE[space.tone]}`}
                  >
                    <Icon width={17} height={17} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-slate-900">{space.name}</p>
                    <p className="mt-0.5 flex items-center gap-1 truncate text-[10px] text-slate-500">
                      <IconMapPin width={10} height={10} />
                      {space.description}
                    </p>
                  </div>
                  <Badge tone="emerald">Ativo</Badge>
                </li>
              );
            })}
          </ul>
        </section>

        {/* Grade de horários */}
        <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <header className="flex items-center justify-between gap-3 border-b border-slate-100 px-5 py-4">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">Grade de horários</h2>
              <p className="mt-0.5 text-[11px] text-slate-500">
                Blocos de aula usados nas reservas
              </p>
            </div>
            <Badge tone="slate">{SLOTS.length} blocos</Badge>
          </header>
          <div className="grid grid-cols-2 gap-2 p-4">
            {SLOTS.map((slot) => (
              <div
                key={slot.id}
                className="rounded-xl border border-slate-100 bg-slate-50/60 px-3 py-2"
              >
                <p className="text-[11px] font-semibold text-slate-700">{slot.label}</p>
                <p className="mt-0.5 flex items-center gap-1 text-[10px] text-slate-500">
                  <IconClock width={10} height={10} />
                  {slot.start} – {slot.end}
                </p>
              </div>
            ))}
          </div>
          <div className="border-t border-slate-100 px-5 py-3">
            <p className="text-[10px] text-slate-400">
              Intervalo de 09:30 às 09:50 e turno da tarde a partir das 13:30.
            </p>
          </div>
        </section>

        {/* Regras */}
        <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <header className="border-b border-slate-100 px-5 py-4">
            <h2 className="text-sm font-semibold text-slate-900">Regras de reserva</h2>
            <p className="mt-0.5 text-[11px] text-slate-500">Como o sistema trata os pedidos</p>
          </header>
          <div className="divide-y divide-slate-100 px-5">
            <Toggle
              checked={autoApprove}
              onChange={setAutoApprove}
              label="Reserva automática"
              description="Se o horário estiver livre, a reserva é confirmada na hora."
            />
            <Toggle
              checked={limitReservations}
              onChange={setLimitReservations}
              label="Limite de 5 reservas futuras por professor"
              description="Ajuda a dividir o laboratório em semanas de muita procura."
            />
            <Toggle
              checked={notifyStudents}
              onChange={setNotifyStudents}
              label="Avisar alunos sobre novas atividades"
              description="Envia notificação no app quando uma prova ou entrega é publicada."
            />
            <div className="flex items-center justify-between gap-3 py-3">
              <div>
                <p className="text-xs font-semibold text-slate-800">Cancelamento mínimo</p>
                <p className="mt-0.5 text-[11px] text-slate-500">
                  Antecedência para liberar o horário
                </p>
              </div>
              <select
                defaultValue="2"
                className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-[11px] font-medium text-slate-700 outline-none focus:border-indigo-400"
              >
                <option value="1">1 hora antes</option>
                <option value="2">2 horas antes</option>
                <option value="4">4 horas antes</option>
                <option value="24">24 horas antes</option>
              </select>
            </div>
          </div>
        </section>

        {/* Permissões */}
        <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <header className="border-b border-slate-100 px-5 py-4">
            <h2 className="flex items-center gap-1.5 text-sm font-semibold text-slate-900">
              <IconUsers width={15} height={15} className="text-slate-400" />
              Perfis e permissões
            </h2>
            <p className="mt-0.5 text-[11px] text-slate-500">
              O que cada tipo de usuário pode fazer
            </p>
          </header>
          <div className="overflow-x-auto px-5 py-3">
            <table className="w-full text-left text-[11px]">
              <thead>
                <tr className="text-[10px] uppercase tracking-wide text-slate-400">
                  <th className="py-2 pr-3 font-semibold">Permissão</th>
                  <th className="px-2 py-2 text-center font-semibold">Prof.</th>
                  <th className="px-2 py-2 text-center font-semibold">Aluno</th>
                  <th className="px-2 py-2 text-center font-semibold">Coord.</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {PERMISSIONS.map((row) => (
                  <tr key={row.label}>
                    <td className="py-2.5 pr-3 text-slate-600">{row.label}</td>
                    {[row.teacher, row.student, row.admin].map((allowed, index) => (
                      <td key={index} className="px-2 py-2.5 text-center">
                        {allowed ? (
                          <IconCheck
                            width={13}
                            height={13}
                            className="mx-auto text-emerald-600"
                          />
                        ) : (
                          <IconX width={13} height={13} className="mx-auto text-slate-300" />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-900">Dados de demonstração</p>
          <p className="mt-0.5 text-[11px] text-slate-500">
            Restaura as reservas e atividades de exemplo salvas neste navegador.
          </p>
        </div>
        <Button
          variant="secondary"
          onClick={() => {
            if (window.confirm("Restaurar os dados de exemplo? Suas alterações serão perdidas.")) {
              resetDemo();
              setToast("Dados de exemplo restaurados.");
            }
          }}
        >
          Restaurar dados
        </Button>
      </div>

      <Toast message={toast} onClose={closeToast} />
    </div>
  );
}
