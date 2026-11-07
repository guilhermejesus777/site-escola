"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { createInitialData } from "@/lib/mock-data";
import { todayISO, weekdayIndex } from "@/lib/date";
import type { Activity, Block, DataState, Reservation } from "@/types";

const STORAGE_KEY = "site-escola:prototipo:v1";

type BookInput = Omit<Reservation, "id" | "createdAt">;
type ActivityInput = Omit<Activity, "id" | "createdAt">;

type StoreValue = DataState & {
  getReservation: (spaceId: string, date: string, slotId: string) => Reservation | undefined;
  getBlock: (spaceId: string, date: string, slotId: string) => Block | undefined;
  bookReservation: (input: BookInput) => string | null;
  cancelReservation: (id: string) => void;
  addActivity: (input: ActivityInput) => void;
  deleteActivity: (id: string) => void;
  resetDemo: () => void;
};

const StoreContext = createContext<StoreValue | null>(null);

function makeId(prefix: string): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `${prefix}-${crypto.randomUUID()}`;
  }
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DataState>(() => createInitialData());
  const [ready, setReady] = useState(false);

  // Carrega os dados salvos só no navegador — evita divergência entre
  // servidor e cliente na primeira renderização.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<DataState>;
        if (Array.isArray(parsed.reservations) && Array.isArray(parsed.activities)) {
          // eslint-disable-next-line react-hooks/set-state-in-effect -- carga única do armazenamento local após a hidratação
          setState({
            reservations: parsed.reservations,
            blocks: Array.isArray(parsed.blocks) ? parsed.blocks : [],
            activities: parsed.activities,
          });
        }
      }
    } catch {
      // Se o armazenamento estiver indisponível, seguimos com os dados de exemplo.
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Sem persistência: o protótipo continua funcionando em memória.
    }
  }, [state, ready]);

  const getReservation = useCallback(
    (spaceId: string, date: string, slotId: string) =>
      state.reservations.find(
        (item) =>
          item.spaceId === spaceId && item.date === date && item.slotId === slotId,
      ),
    [state.reservations],
  );

  const getBlock = useCallback(
    (spaceId: string, date: string, slotId: string) =>
      state.blocks.find((item) => {
        if (item.spaceId !== spaceId || item.slotId !== slotId) return false;
        if (item.date) return item.date === date;
        return item.weekdays?.includes(weekdayIndex(date)) ?? false;
      }),
    [state.blocks],
  );

  const bookReservation = useCallback(
    (input: BookInput): string | null => {
      if (input.date < todayISO()) {
        return "Não é possível reservar um horário que já passou.";
      }
      const block = getBlock(input.spaceId, input.date, input.slotId);
      if (block) {
        return `Horário bloqueado pela coordenação: ${block.reason}.`;
      }
      const existing = getReservation(input.spaceId, input.date, input.slotId);
      if (existing) {
        return `Este horário acabou de ser reservado por ${existing.teacher}. Escolha outro.`;
      }
      setState((current) => ({
        ...current,
        reservations: [
          ...current.reservations,
          {
            ...input,
            id: makeId("reserva"),
            createdAt: new Date().toISOString(),
          },
        ],
      }));
      return null;
    },
    [getBlock, getReservation],
  );

  const cancelReservation = useCallback((id: string) => {
    setState((current) => ({
      ...current,
      reservations: current.reservations.filter((item) => item.id !== id),
    }));
  }, []);

  const addActivity = useCallback((input: ActivityInput) => {
    const activity: Activity = {
      ...input,
      id: makeId("atividade"),
      createdAt: new Date().toISOString(),
    };
    setState((current) => ({
      ...current,
      activities: [activity, ...current.activities],
    }));
  }, []);

  const deleteActivity = useCallback((id: string) => {
    setState((current) => ({
      ...current,
      activities: current.activities.filter((item) => item.id !== id),
    }));
  }, []);

  const resetDemo = useCallback(() => {
    setState(createInitialData());
  }, []);

  const value = useMemo<StoreValue>(
    () => ({
      ...state,
      getReservation,
      getBlock,
      bookReservation,
      cancelReservation,
      addActivity,
      deleteActivity,
      resetDemo,
    }),
    [
      state,
      getReservation,
      getBlock,
      bookReservation,
      cancelReservation,
      addActivity,
      deleteActivity,
      resetDemo,
    ],
  );

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="flex items-center gap-3 text-sm font-medium text-slate-400">
          <span className="h-2 w-2 animate-ping rounded-full bg-indigo-500" />
          Carregando agenda…
        </div>
      </div>
    );
  }

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreValue {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore precisa estar dentro de StoreProvider.");
  }
  return context;
}
