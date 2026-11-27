"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { FightingEngine, type Difficulty, type HudState } from "./fighting-engine";

const DIFFICULTIES: { id: Difficulty; label: string; hint: string }[] = [
  { id: "facil", label: "Fácil", hint: "IA mais lenta e defensiva" },
  { id: "normal", label: "Normal", hint: "Equilíbrio entre ataque e defesa" },
  { id: "dificil", label: "Difícil", hint: "IA agressiva e veloz" },
];

function pct(value: number, max: number) {
  return Math.max(0, Math.min(1, value / Math.max(1, max)));
}

function HealthBar({ value, align }: { value: number; align: "left" | "right" }) {
  const amount = pct(value, 100);
  const tone =
    amount > 0.55 ? "from-emerald-400 to-cyan-400" : amount > 0.25 ? "from-amber-400 to-orange-500" : "from-rose-500 to-red-600";
  return (
    <div className={`h-3 w-full overflow-hidden rounded-full bg-slate-800/80 ring-1 ring-white/10 ${align === "right" ? "rotate-180" : ""}`}>
      <div
        className={`h-full rounded-full bg-gradient-to-r ${tone} transition-[width] duration-200 ease-out`}
        style={{ width: `${amount * 100}%` }}
      />
    </div>
  );
}

function SuperMeter({ value }: { value: number }) {
  const amount = pct(value, 100);
  const ready = amount >= 1;
  return (
    <div className="flex items-center gap-2">
      <span className={`text-[10px] font-bold uppercase tracking-widest ${ready ? "text-cyan-300" : "text-slate-500"}`}>
        Super
      </span>
      <div className="h-1.5 w-24 overflow-hidden rounded-full bg-slate-800/80 sm:w-40">
        <div
          className={`h-full rounded-full transition-[width] duration-150 ${
            ready ? "bg-gradient-to-r from-amber-300 via-yellow-200 to-white shadow-[0_0_12px_rgba(253,224,71,0.9)]" : "bg-gradient-to-r from-indigo-500 to-cyan-400"
          }`}
          style={{ width: `${amount * 100}%` }}
        />
      </div>
    </div>
  );
}

function RoundPips({ wins, align }: { wins: number; align: "left" | "right" }) {
  return (
    <div className={`flex gap-1.5 ${align === "right" ? "flex-row-reverse" : ""}`}>
      {[0, 1].map((index) => (
        <span
          key={index}
          className={`h-2.5 w-2.5 rotate-45 rounded-[2px] border ${
            index < wins ? "border-cyan-300 bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.9)]" : "border-slate-500/60 bg-slate-800"
          }`}
        />
      ))}
    </div>
  );
}

function HoldButton({
  label,
  className,
  onDown,
  onUp,
}: {
  label: string;
  className: string;
  onDown: () => void;
  onUp: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className={`select-none touch-none active:scale-95 ${className}`}
      onPointerDown={(event) => {
        event.preventDefault();
        onDown();
      }}
      onPointerUp={(event) => {
        event.preventDefault();
        onUp();
      }}
      onPointerLeave={onUp}
      onPointerCancel={onUp}
      onContextMenu={(event) => event.preventDefault()}
    >
      {label}
    </button>
  );
}

export function FightingArena({ playerName = "KAI", enemyName = "VEX" }: { playerName?: string; enemyName?: string }) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const engineRef = useRef<FightingEngine | null>(null);
  const [hud, setHud] = useState<HudState | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty>("normal");
  const [phase, setPhase] = useState<"menu" | "playing">("menu");
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    let engine: FightingEngine | null = null;
    try {
      engine = new FightingEngine(host, { onHud: setHud });
      engineRef.current = engine;
      setReady(true);
    } catch {
      setError("Não foi possível iniciar o WebGL. Tente outro navegador ou ative a aceleração de hardware.");
    }
    return () => {
      engine?.dispose();
      engineRef.current = null;
    };
  }, []);

  const startMatch = useCallback(
    (level: Difficulty) => {
      if (!engineRef.current) return;
      setDifficulty(level);
      engineRef.current.startMatch(level);
      setPhase("playing");
    },
    [],
  );

  const backToMenu = useCallback(() => {
    engineRef.current?.goToMenu();
    setPhase("menu");
  }, []);

  const hold = useCallback((control: "left" | "right" | "up" | "down" | "block") => {
    return {
      down: () => engineRef.current?.setControl(control, true),
      up: () => engineRef.current?.setControl(control, false),
    };
  }, []);

  const left = hold("left");
  const right = hold("right");
  const up = hold("up");
  const down = hold("down");
  const block = hold("block");

  const showMenu = phase === "menu";
  const showResult = !showMenu && hud?.status === "matchEnd";
  const showPaused = !showMenu && !showResult && hud?.paused;
  const playerWins = hud?.player.wins ?? 0;
  const enemyWins = hud?.enemy.wins ?? 0;

  return (
    <div className="relative w-full overflow-hidden rounded-3xl border border-slate-800 bg-[#04050e] shadow-2xl">
      <div className="relative h-[min(78vh,720px)] min-h-[440px] w-full">
        {/* Palco 3D */}
        <div ref={hostRef} className="absolute inset-0" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(2,6,23,0.65)_100%)]" />

        {/* HUD */}
        {!showMenu && (
          <div className="pointer-events-none absolute inset-x-0 top-0 p-3 sm:p-5">
            <div className="mx-auto flex max-w-4xl items-start gap-3 sm:gap-5">
              <div className="flex-1 space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-black uppercase tracking-widest text-cyan-300 drop-shadow sm:text-sm">{playerName}</span>
                  <RoundPips wins={playerWins} align="right" />
                </div>
                <HealthBar value={hud?.player.hp ?? 100} align="left" />
                <SuperMeter value={hud?.player.meter ?? 0} />
              </div>

              <div className="flex flex-col items-center pt-0.5">
                <span
                  className={`rounded-xl border px-3 py-1 font-mono text-2xl font-bold leading-none backdrop-blur sm:text-3xl ${
                    (hud?.timer ?? 60) <= 10 && hud?.status === "fight"
                      ? "border-rose-500/60 bg-rose-950/70 text-rose-300"
                      : "border-slate-700/70 bg-slate-950/70 text-white"
                  }`}
                >
                  {String(hud?.timer ?? 60).padStart(2, "0")}
                </span>
                <span className="mt-1 text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500">Round {hud?.round ?? 1}</span>
              </div>

              <div className="flex-1 space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <RoundPips wins={enemyWins} align="left" />
                  <span className="text-xs font-black uppercase tracking-widest text-rose-300 drop-shadow sm:text-sm">{enemyName}</span>
                </div>
                <HealthBar value={hud?.enemy.hp ?? 100} align="right" />
                <div className="flex justify-end">
                  <SuperMeter value={hud?.enemy.meter ?? 0} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Combo */}
        {!showMenu && (hud?.combo ?? 0) > 1 && (
          <div className="pointer-events-none absolute left-1/2 top-[38%] -translate-x-1/2">
            <span className="rounded-xl border border-cyan-400/40 bg-cyan-500/15 px-3 py-1 font-mono text-lg font-black text-cyan-200 backdrop-blur">
              {hud?.combo}x COMBO
            </span>
          </div>
        )}

        {/* Mensagens de round */}
        {!showMenu && !showResult && !showPaused && (hud?.message ?? "") !== "" && (
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-2">
            <span className="animate-pulse text-4xl font-black uppercase italic tracking-tight text-white drop-shadow-[0_0_20px_rgba(34,211,238,0.65)] sm:text-6xl">
              {hud?.message}
            </span>
            {hud?.submessage ? (
              <span className="rounded-full bg-slate-950/60 px-3 py-1 text-xs font-medium uppercase tracking-widest text-slate-300 backdrop-blur">
                {hud.submessage}
              </span>
            ) : null}
          </div>
        )}

        {error && (
          <div className="absolute inset-0 flex items-center justify-center p-6">
            <p className="max-w-sm rounded-2xl border border-rose-500/40 bg-rose-950/80 p-4 text-center text-sm text-rose-100">{error}</p>
          </div>
        )}

        {/* Controles de toque */}
        {!showMenu && !showResult && (
          <div className="absolute inset-x-0 bottom-0 p-2.5 sm:hidden">
            <div className="flex items-end justify-between gap-2">
              <div className="grid grid-cols-3 gap-1.5">
                <HoldButton label="◀" onDown={left.down} onUp={left.up} className="h-11 w-11 rounded-xl bg-slate-800/80 text-lg text-white backdrop-blur" />
                <div className="flex flex-col gap-1.5">
                  <HoldButton label="▲" onDown={up.down} onUp={up.up} className="h-11 w-11 rounded-xl bg-slate-800/80 text-lg text-white backdrop-blur" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <HoldButton label="▶" onDown={right.down} onUp={right.up} className="h-11 w-11 rounded-xl bg-slate-800/80 text-lg text-white backdrop-blur" />
                  <HoldButton label="▼" onDown={down.down} onUp={down.up} className="h-11 w-11 rounded-xl bg-slate-800/80 text-lg text-white backdrop-blur" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  type="button"
                  onClick={() => engineRef.current?.press("punch")}
                  className="h-11 w-14 rounded-xl bg-cyan-600/85 text-xs font-bold text-white active:scale-95"
                >
                  Soco
                </button>
                <button
                  type="button"
                  onClick={() => engineRef.current?.press("kick")}
                  className="h-11 w-14 rounded-xl bg-indigo-600/85 text-xs font-bold text-white active:scale-95"
                >
                  Chute
                </button>
                <button
                  type="button"
                  onClick={() => engineRef.current?.press("jump")}
                  className="h-11 w-14 rounded-xl bg-slate-800/85 text-xs font-bold text-white active:scale-95"
                >
                  Pular
                </button>
                <button
                  type="button"
                  onClick={() => engineRef.current?.press("super")}
                  className="h-11 w-14 rounded-xl bg-amber-500/85 text-xs font-bold text-slate-950 active:scale-95"
                >
                  Super
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Botão de pausa / menu */}
        {!showMenu && (
          <div className="absolute bottom-2.5 right-2.5 hidden gap-2 sm:flex">
            <button
              type="button"
              onClick={() => engineRef.current?.togglePause()}
              className="rounded-lg border border-slate-700/70 bg-slate-950/60 px-3 py-1.5 text-[11px] font-semibold text-slate-300 backdrop-blur transition hover:bg-slate-800"
            >
              {hud?.paused ? "Continuar" : "Pausar"}
            </button>
            <button
              type="button"
              onClick={backToMenu}
              className="rounded-lg border border-slate-700/70 bg-slate-950/60 px-3 py-1.5 text-[11px] font-semibold text-slate-300 backdrop-blur transition hover:bg-slate-800"
            >
              Menu
            </button>
          </div>
        )}

        {/* Menu inicial */}
        {showMenu && (
          <div className="absolute inset-0 flex items-center justify-center overflow-y-auto bg-slate-950/70 p-4 backdrop-blur-[2px]">
            <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-slate-950/85 p-5 shadow-[0_0_60px_rgba(34,211,238,0.15)] sm:p-7">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.35em] text-cyan-400">Arena 3D</p>
                  <h2 className="mt-1 text-3xl font-black italic tracking-tight text-white">
                    NEON <span className="text-cyan-300">FIST</span>
                  </h2>
                </div>
                <span className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-cyan-200">
                  Melhor de 3
                </span>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                {playerName} encara {enemyName} na arena neon. Socos, chutes, defesa e golpe especial —
                escolha a dificuldade e entre no ringue.
              </p>

              <div className="mt-4 grid gap-2">
                {DIFFICULTIES.map((item) => {
                  const active = difficulty === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setDifficulty(item.id)}
                      className={`flex items-center justify-between gap-3 rounded-xl border px-3.5 py-2.5 text-left transition ${
                        active
                          ? "border-cyan-400/70 bg-cyan-500/15 text-white shadow-[0_0_18px_rgba(34,211,238,0.2)]"
                          : "border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700 hover:bg-slate-800/60"
                      }`}
                    >
                      <span>
                        <span className="block text-sm font-bold">{item.label}</span>
                        <span className="block text-[11px] text-slate-400">{item.hint}</span>
                      </span>
                      <span className={`h-3 w-3 rounded-full border ${active ? "border-cyan-200 bg-cyan-300" : "border-slate-600"}`} />
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                disabled={!ready}
                onClick={() => startMatch(difficulty)}
                className="mt-4 flex h-12 w-full items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-sm font-black uppercase tracking-widest text-white shadow-lg transition hover:from-cyan-400 hover:to-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {ready ? "Entrar na arena" : "Carregando arena..."}
              </button>

              <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-1.5 text-[11px] text-slate-500 sm:grid-cols-3">
                <span><b className="text-slate-300">A / D</b> mover</span>
                <span><b className="text-slate-300">W</b> pular</span>
                <span><b className="text-slate-300">Shift</b> bloquear</span>
                <span><b className="text-slate-300">J</b> soco</span>
                <span><b className="text-slate-300">K</b> chute</span>
                <span><b className="text-slate-300">U</b> super</span>
                <span><b className="text-slate-300">P</b> pausar</span>
                <span className="sm:col-span-2">No celular, use os botões na tela.</span>
              </div>
            </div>
          </div>
        )}

        {/* Fim da luta */}
        {showResult && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-sm">
            <div className="w-full max-w-sm rounded-3xl border border-white/10 bg-slate-950/90 p-6 text-center">
              <p className="text-[10px] font-black uppercase tracking-[0.35em] text-slate-500">Resultado</p>
              <h3
                className={`mt-2 text-4xl font-black italic tracking-tight ${
                  hud?.matchWinner === "player" ? "text-cyan-300" : "text-rose-400"
                }`}
              >
                {hud?.matchWinner === "player" ? "VITÓRIA!" : "DERROTA"}
              </h3>
              <p className="mt-1 text-sm text-slate-400">
                Placar final: {playerWins} × {enemyWins}
              </p>
              <div className="mt-5 grid gap-2">
                <button
                  type="button"
                  onClick={() => startMatch(difficulty)}
                  className="h-11 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-sm font-black uppercase tracking-widest text-white transition hover:from-cyan-400 hover:to-blue-500"
                >
                  Revanche
                </button>
                <button
                  type="button"
                  onClick={backToMenu}
                  className="h-11 rounded-xl border border-slate-700 bg-slate-900 text-sm font-semibold text-slate-300 transition hover:bg-slate-800"
                >
                  Trocar dificuldade
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Pausa */}
        {showPaused && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-950/65 p-4 backdrop-blur-sm">
            <div className="w-full max-w-xs rounded-3xl border border-white/10 bg-slate-950/90 p-6 text-center">
              <h3 className="text-xl font-black uppercase tracking-widest text-white">Pausado</h3>
              <div className="mt-4 grid gap-2">
                <button
                  type="button"
                  onClick={() => engineRef.current?.resume()}
                  className="h-10 rounded-xl bg-cyan-500 text-sm font-bold text-slate-950 transition hover:bg-cyan-400"
                >
                  Continuar
                </button>
                <button
                  type="button"
                  onClick={backToMenu}
                  className="h-10 rounded-xl border border-slate-700 bg-slate-900 text-sm font-semibold text-slate-300 transition hover:bg-slate-800"
                >
                  Sair para o menu
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
