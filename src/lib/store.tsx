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
import type {
  Activity,
  Block,
  DataState,
  Reservation,
  SessionUser,
  UserRole,
} from "@/types";

const STORAGE_KEY = "site-escola:prototipo:v2";
const SESSION_KEY = "site-escola:sessao:v1";

type BookInput = Omit<Reservation, "id" | "createdAt">;
type ActivityInput = Omit<Activity, "id" | "createdAt">;

type StoreValue = DataState & {
  user: SessionUser | null;
  login: (email: string, role: UserRole) => void;
  logout: () => void;
  getReservation: (spaceId: string, date: string, slotId: string) => Reservation | undefined;
  getBlock: (spaceId: string, date: string, slotId: string) => Block | undefined;
  bookReservation: (input: BookInput) => string | null;
  cancelReservation: (id: string) => void;
  addActivity: (input: ActivityInput) => void;
  deleteActivity: (id: string) => void;
  clearData: () => void;
};

const StoreContext = createContext<StoreValue | null>(null);

function makeId(prefix: string): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `${prefix}-${crypto.randomUUID()}`;
  }
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

/** "ana.souza@escola.com" → "Ana Souza" */
export function nameFromEmail(email: string): string {
  const local = email
    .split("@")[0]
    .replace(/[._-]+/g, " ")
    .replace(/[0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (!local) return "Usuário";
  return local
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

function isSessionUser(value: unknown): value is SessionUser {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<SessionUser>;
  return (
    typeof candidate.email === "string" &&
    typeof candidate.name === "string" &&
    (candidate.role === "professor" || candidate.role === "aluno")
  );
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DataState>(() => createInitialData());
  const [user, setUser] = useState<SessionUser | null>(null);
  const [ready, setReady] = useState(false);

  // Carrega os dados salvos só no navegador — evita divergência entre
  // servidor e cliente na primeira renderização.
  useEffect(() => {
    try {
      const rawSession = window.localStorage.getItem(SESSION_KEY);
      if (rawSession) {
        const parsedSession: unknown = JSON.parse(rawSession);
        if (isSessionUser(parsedSession)) {
          // eslint-disable-next-line react-hooks/set-state-in-effect -- carga única da sessão após a hidratação
          setUser(parsedSession);
        }
      }

      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<DataState>;
        if (Array.isArray(parsed.reservations) && Array.isArray(parsed.activities)) {
          setState({
            reservations: parsed.reservations,
            blocks: Array.isArray(parsed.blocks) ? parsed.blocks : [],
            activities: parsed.activities,
          });
        }
      }
    } catch {
      // Se o armazenamento estiver indisponível, seguimos com os dados vazios.
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

  const login = useCallback((email: string, role: UserRole) => {
    const cleanEmail = email.trim().toLowerCase();
    const nextUser: SessionUser = {
      email: cleanEmail,
      name: nameFromEmail(cleanEmail),
      role,
    };
    setUser(nextUser);
    try {
      window.localStorage.setItem(SESSION_KEY, JSON.stringify(nextUser));
    } catch {
      // Sem armazenamento: a sessão vale só para esta aba.
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    try {
      window.localStorage.removeItem(SESSION_KEY);
    } catch {
      // Sem armazenamento: nada a limpar.
    }
  }, []);

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
      if (user?.role !== "professor") {
        return "Apenas professores podem reservar horários.";
      }
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
    [getBlock, getReservation, user],
  );

  const cancelReservation = useCallback(
    (id: string) => {
      if (user?.role !== "professor") return;
      setState((current) => ({
        ...current,
        reservations: current.reservations.filter((item) => item.id !== id),
      }));
    },
    [user],
  );

  const addActivity = useCallback(
    (input: ActivityInput) => {
      if (user?.role !== "professor") return;
      const activity: Activity = {
        ...input,
        id: makeId("atividade"),
        createdAt: new Date().toISOString(),
      };
      setState((current) => ({
        ...current,
        activities: [activity, ...current.activities],
      }));
    },
    [user],
  );

  const deleteActivity = useCallback(
    (id: string) => {
      if (user?.role !== "professor") return;
      setState((current) => ({
        ...current,
        activities: current.activities.filter((item) => item.id !== id),
      }));
    },
    [user],
  );

  const clearData = useCallback(() => {
    if (user?.role !== "professor") return;
    setState(createInitialData());
  }, [user]);

  const value = useMemo<StoreValue>(
    () => ({
      ...state,
      user,
      login,
      logout,
      getReservation,
      getBlock,
      bookReservation,
      cancelReservation,
      addActivity,
      deleteActivity,
      clearData,
    }),
    [
      state,
      user,
      login,
      logout,
      getReservation,
      getBlock,
      bookReservation,
      cancelReservation,
      addActivity,
      deleteActivity,
      clearData,
    ],
  );

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="flex items-center gap-3 text-sm font-medium text-slate-400 dark:text-slate-500">
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
