"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { Button, SectionCard } from "@/components/ui";
import { IconArrowRight, IconBall, IconCheck, IconClock, IconMapPin, IconUsers } from "@/components/icons";
import { MAPS } from "./maps";
import { KITES } from "./kites";
import { LINES, DEFAULT_LINE_ID } from "./lines";
import { createInitialState, startFight, step } from "./engine";
import { drawGame } from "./render";
import type { GameState, KiteId } from "./types";

type Mode = "pvp" | "ai";

function TouchButton({
  onPress,
  onRelease,
  children,
  className = "",
  label,
}: {
  onPress: () => void;
  onRelease: () => void;
  children: ReactNode;
  className?: string;
  label: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onPointerDown={(event) => {
        event.preventDefault();
        onPress();
      }}
      onPointerUp={onRelease}
      onPointerLeave={onRelease}
      onPointerCancel={onRelease}
      onContextMenu={(event) => event.preventDefault()}
      className={`touch-btn select-none rounded-full border border-slate-300/70 bg-white/90 shadow-md backdrop-blur ${className}`}
    >
      {children}
    </button>
  );
}

export function PipaCombate() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const stateRef = useRef<GameState>(createInitialState());
  const phaseRef = useRef<GameState["phase"]>("menu");
  const inputsRef = useRef<{ pull: number[]; steer: number[] }>({ pull: [0, 0], steer: [0, 0] });
  const sizeRef = useRef({ width: 0, height: 0, dpr: 1 });

  const [screen, setScreen] = useState<"menu" | "game">("menu");
  const [phase, setPhase] = useState<GameState["phase"]>("menu");
  const [koInfo, setKoInfo] = useState<{ winnerName: string; loserName: string; reason: string } | null>(null);
  const [mapId, setMapId] = useState<string>("praia");
  const [kiteA, setKiteA] = useState<KiteId>(KITES[0].id);
  const [kiteB, setKiteB] = useState<KiteId>(KITES[1].id);
  const [lineA, setLineA] = useState<string>(DEFAULT_LINE_ID);
  const [lineB, setLineB] = useState<string>(DEFAULT_LINE_ID);
  const [mode, setMode] = useState<Mode>("pvp");
  const [kiteQuery, setKiteQuery] = useState("");

  const filteredKites = KITES.filter((kite) =>
    `${kite.nickname} ${kite.name} ${kite.type}`.toLowerCase().includes(kiteQuery.trim().toLowerCase()),
  );

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  useEffect(() => {
    if (screen !== "game") return;
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !wrap || !ctx) return;

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const w = Math.max(1, rect.width);
      const h = Math.max(1, rect.height);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      sizeRef.current = { width: w, height: h, dpr };
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(wrap);

    let raf = 0;
    let last = performance.now();
    const loop = (t: number) => {
      const dt = Math.min(0.033, Math.max(0, (t - last) / 1000));
      last = t;
      const state = stateRef.current;
      const next = step(state, inputsRef.current, dt);
      if (next.phase !== state.phase) {
        if (next.phase === "ko" && next.result) {
          const winnerKite = next.kites[next.result.winner];
          const loserKite = next.kites[next.result.loser];
          setKoInfo({
            winnerName: winnerKite.def.nickname,
            loserName: loserKite.def.nickname,
            reason: next.result.reason,
          });
        } else {
          setKoInfo(null);
        }
        setPhase(next.phase);
      }
      stateRef.current = next;
      drawGame(ctx, next, sizeRef.current, t / 1000);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, [screen]);

  useEffect(() => {
    const down = (event: KeyboardEvent) => {
      const key = event.code;
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Space"].includes(key)) event.preventDefault();
      if (event.repeat) return;
      if (key === "KeyW") inputsRef.current.pull[0] = 1;
      else if (key === "KeyS") inputsRef.current.pull[0] = 0;
      else if (key === "KeyA") inputsRef.current.steer[0] = -1;
      else if (key === "KeyD") inputsRef.current.steer[0] = 1;
      else if (key === "ArrowUp") inputsRef.current.pull[1] = 1;
      else if (key === "ArrowDown") inputsRef.current.pull[1] = 0;
      else if (key === "ArrowLeft") inputsRef.current.steer[1] = -1;
      else if (key === "ArrowRight") inputsRef.current.steer[1] = 1;
    };
    const up = (event: KeyboardEvent) => {
      const key = event.code;
      if (key === "KeyW") inputsRef.current.pull[0] = 0;
      else if (key === "KeyS") inputsRef.current.pull[0] = 0;
      else if (key === "KeyA") inputsRef.current.steer[0] = 0;
      else if (key === "KeyD") inputsRef.current.steer[0] = 0;
      else if (key === "ArrowUp") inputsRef.current.pull[1] = 0;
      else if (key === "ArrowDown") inputsRef.current.pull[1] = 0;
      else if (key === "ArrowLeft") inputsRef.current.steer[1] = 0;
      else if (key === "ArrowRight") inputsRef.current.steer[1] = 0;
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  const startFightWith = useCallback((nextMapId: string, nextKiteA: KiteId, nextKiteB: KiteId, nextMode: Mode, nextLineA?: string, nextLineB?: string) => {
    stateRef.current = startFight(stateRef.current, nextMapId, nextKiteA, nextKiteB, nextMode, nextLineA, nextLineB);
    setKoInfo(null);
    setPhase("countdown");
    setScreen("game");
  }, []);

  const goToMenu = useCallback(() => {
    setScreen("menu");
    setPhase("menu");
    setKoInfo(null);
  }, []);

  const rematch = useCallback(() => {
    startFightWith(mapId, kiteA, kiteB, mode, lineA, lineB);
  }, [mapId, kiteA, kiteB, mode, lineA, lineB, startFightWith]);

  const nextMap = useCallback(() => {
    const index = MAPS.findIndex((item) => item.id === mapId);
    const next = MAPS[(index + 1) % MAPS.length];
    setMapId(next.id);
    startFightWith(next.id, kiteA, kiteB, mode, lineA, lineB);
  }, [mapId, kiteA, kiteB, mode, lineA, lineB, startFightWith]);

  const nextKite = useCallback(
    (slot: "A" | "B") => {
      const current = slot === "A" ? kiteA : kiteB;
      const index = KITES.findIndex((kite) => kite.id === current);
      const next = KITES[(index + 1) % KITES.length];
      const nextLineId = LINES[(LINES.findIndex((l) => l.id === (slot === "A" ? lineA : lineB)) + 1) % LINES.length].id;
      if (slot === "A") setKiteA(next.id);
      else setKiteB(next.id);
      startFightWith(
        mapId,
        slot === "A" ? next.id : kiteA,
        slot === "B" ? next.id : kiteB,
        mode,
        slot === "A" ? nextLineId : lineA,
        slot === "B" ? nextLineId : lineB,
      );
    },
    [kiteA, kiteB, mapId, mode, lineA, lineB, startFightWith],
  );

  const setPilotPull = useCallback((owner: number, value: number) => {
    inputsRef.current.pull[owner] = value;
  }, []);
  const setPilotSteer = useCallback((owner: number, value: number) => {
    inputsRef.current.steer[owner] = value;
  }, []);

  if (screen === "menu") {
    return (
      <div className="space-y-6">
        <header className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 to-blue-600 text-white shadow-sm">
              <IconBall width={24} height={24} />
            </span>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">Pipa Combate</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">O jogo de combate aéreo de pipas da escola.</p>
            </div>
          </div>
        </header>

        <SectionCard title="Escolha o mapa" description="Cada mapa tem seu vento, obstáculos e tipo de água.">
          <div className="grid gap-3 sm:grid-cols-3">
            {MAPS.map((map) => (
              <button
                key={map.id}
                type="button"
                onClick={() => setMapId(map.id)}
                className={`rounded-2xl border p-4 text-left transition ${
                  mapId === map.id
                    ? "border-indigo-400 bg-indigo-50 dark:border-indigo-500 dark:bg-indigo-500/10"
                    : "border-slate-200 bg-white hover:border-indigo-200 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-500/40"
                }`}
              >
                <p className="flex items-center gap-1.5 text-sm font-semibold text-slate-900 dark:text-slate-100">
                  <IconMapPin width={14} height={14} className="text-indigo-600" />
                  {map.name}
                </p>
                <p className="mt-1 text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
                  {map.hasWater ? "Água no fundo — cai e perde!" : "Campo aberto com obstáculos."} Vento: {map.windStrength}.
                </p>
              </button>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Escolha as pipas" description="Cada pipa tem força, agilidade, potência e resistência diferentes.">
          <input
            type="search"
            value={kiteQuery}
            onChange={(event) => setKiteQuery(event.target.value)}
            placeholder="Buscar pipa por nome ou tipo…"
            className="mb-3 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-indigo-400 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
          />
          <p className="mb-3 text-[11px] text-slate-500 dark:text-slate-400">
            {filteredKites.length} de {KITES.length} pipas
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Sua pipa</p>
              <div className="flex max-h-72 flex-wrap content-start gap-2 overflow-y-auto pr-1">
                {filteredKites.map((kite) => (
                  <button
                    key={kite.id}
                    type="button"
                    title={`${kite.type} · ${kite.name}`}
                    onClick={() => setKiteA(kite.id)}
                    className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold transition ${
                      kiteA === kite.id
                        ? "border-indigo-400 bg-indigo-50 text-indigo-800 dark:border-indigo-500 dark:bg-indigo-500/10 dark:text-indigo-200"
                        : "border-slate-200 bg-white text-slate-700 hover:border-indigo-200 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
                    }`}
                  >
                    <span className="h-3 w-3 rounded-full" style={{ backgroundColor: kite.color }} />
                    {kite.nickname}
                    <span className="font-normal text-slate-500 dark:text-slate-400">({kite.hp} HP)</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                {mode === "ai" ? "Pipa do computador" : "Adversário"}
              </p>
              <div className="flex max-h-72 flex-wrap content-start gap-2 overflow-y-auto pr-1">
                {filteredKites.map((kite) => (
                  <button
                    key={kite.id}
                    type="button"
                    title={`${kite.type} · ${kite.name}`}
                    onClick={() => setKiteB(kite.id)}
                    className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold transition ${
                      kiteB === kite.id
                        ? "border-rose-400 bg-rose-50 text-rose-800 dark:border-rose-500 dark:bg-rose-500/10 dark:text-rose-200"
                        : "border-slate-200 bg-white text-slate-700 hover:border-rose-200 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
                    }`}
                  >
                    <span className="h-3 w-3 rounded-full" style={{ backgroundColor: kite.color }} />
                    {kite.nickname}
                    <span className="font-normal text-slate-500 dark:text-slate-400">({kite.hp} HP)</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Escolha as linhas" description="Cada linha muda a força do puxão, a liberação e o chute da pipa.">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Sua linha</p>
              <div className="flex max-h-72 flex-wrap content-start gap-2 overflow-y-auto pr-1">
                {LINES.map((line) => (
                  <button
                    key={line.id}
                    type="button"
                    onClick={() => setLineA(line.id)}
                    className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold transition ${
                      lineA === line.id
                        ? "border-indigo-400 bg-indigo-50 text-indigo-800 dark:border-indigo-500 dark:bg-indigo-500/10 dark:text-indigo-200"
                        : "border-slate-200 bg-white text-slate-700 hover:border-indigo-200 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
                    }`}
                  >
                    <span className="h-3 w-3 rounded-full" style={{ backgroundColor: line.cor }} />
                    {line.nom}
                    <span className="font-normal text-slate-500 dark:text-slate-400">({line.preco})</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Adversario</p>
              <div className="flex max-h-72 flex-wrap content-start gap-2 overflow-y-auto pr-1">
                {LINES.map((line) => (
                  <button
                    key={line.id}
                    type="button"
                    onClick={() => setLineB(line.id)}
                    className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold transition ${
                      lineB === line.id
                        ? "border-rose-400 bg-rose-50 text-rose-800 dark:border-rose-500 dark:bg-rose-500/10 dark:text-rose-200"
                        : "border-slate-200 bg-white text-slate-700 hover:border-rose-200 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
                    }`}
                  >
                    <span className="h-3 w-3 rounded-full" style={{ backgroundColor: line.cor }} />
                    {line.nom}
                    <span className="font-normal text-slate-500 dark:text-slate-400">({line.preco})</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Modo de jogo" description="Desafie o computador ou jogue com um amigo no mesmo teclado.">
          <div className="grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => setMode("pvp")}
              className={`rounded-2xl border p-4 text-left transition ${
                mode === "pvp"
                  ? "border-indigo-400 bg-indigo-50 dark:border-indigo-500 dark:bg-indigo-500/10"
                  : "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
              }`}
            >
              <p className="flex items-center gap-1.5 text-sm font-semibold text-slate-900 dark:text-slate-100">
                <IconUsers width={14} height={14} className="text-indigo-600" />
                1 × 1 — dois pilotos
              </p>
              <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">W/S puxar · A/D inclinar (Piloto 1). ↑/↓ puxar · ←/→ inclinar (Piloto 2).</p>
            </button>
            <button
              type="button"
              onClick={() => setMode("ai")}
              className={`rounded-2xl border p-4 text-left transition ${
                mode === "ai"
                  ? "border-indigo-400 bg-indigo-50 dark:border-indigo-500 dark:bg-indigo-500/10"
                  : "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
              }`}
            >
              <p className="flex items-center gap-1.5 text-sm font-semibold text-slate-900 dark:text-slate-100">
                <IconCheck width={14} height={14} className="text-indigo-600" />
                1 × 0 — contra o computador
              </p>
              <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">Você joga com a sua pipa; o computador usa a do adversário.</p>
            </button>
          </div>
        </SectionCard>

        <Button size="md" onClick={() => startFightWith(mapId, kiteA, kiteB, mode, lineA, lineB)}>
          Começar voo <IconArrowRight width={16} height={16} />
        </Button>

        <div className="rounded-2xl border border-dashed border-slate-300 bg-white/70 p-4 dark:border-slate-700 dark:bg-slate-900/60">
          <p className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-700 dark:text-slate-300">
            <IconClock width={13} height={13} />
            Como se joga
          </p>
          <p className="mt-1 text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
            Puxe a linha para gerar força de mergulho. Quanto mais forte o puxão, mais rápido a pipa voa e maior o choque de
            linhas contra o adversário. Bater em obstáculos ou cair na água encerra a sua asa. Desafie a pipa com mais
            HP quando precisar de mais resistência!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">Pipa Combate</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {MAPS.find((m) => m.id === mapId)?.name} · {KITES.find((k) => k.id === kiteA)?.name} × {KITES.find((k) => k.id === kiteB)?.name}
            {mode === "ai" ? " · você × computador" : ""}
          </p>
        </div>
        <Button variant="secondary" size="sm" onClick={goToMenu}>
          Menu
        </Button>
      </div>

      <div className="relative h-[68vh] min-h-[440px] w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-900 shadow-lg dark:border-slate-800">
        <div ref={wrapRef} className="absolute inset-0">
          <canvas ref={canvasRef} className="block" />
        </div>

        {/* Controles touch */}
        {mode === "pvp" ? (
          <>
            <div className="absolute left-2 top-2 flex flex-col gap-2">
              <TouchButton label="Inclinar para a esquerda" className="h-12 w-12 text-xl font-bold text-slate-700" onPress={() => setPilotSteer(0, -1)} onRelease={() => setPilotSteer(0, 0)}>
                ←
              </TouchButton>
              <TouchButton label="Inclinar para a direita" className="h-12 w-12 text-xl font-bold text-slate-700" onPress={() => setPilotSteer(0, 1)} onRelease={() => setPilotSteer(0, 0)}>
                →
              </TouchButton>
              <TouchButton label="Puxar a linha" className="h-14 w-14 text-xs font-bold text-white" onPress={() => setPilotPull(0, 1)} onRelease={() => setPilotPull(0, 0)}>
                PUXAR
              </TouchButton>
            </div>
            <div className="absolute right-2 top-2 flex flex-col gap-2">
              <TouchButton label="Inclinar para a esquerda" className="h-12 w-12 text-xl font-bold text-slate-700" onPress={() => setPilotSteer(1, -1)} onRelease={() => setPilotSteer(1, 0)}>
                ←
              </TouchButton>
              <TouchButton label="Inclinar para a direita" className="h-12 w-12 text-xl font-bold text-slate-700" onPress={() => setPilotSteer(1, 1)} onRelease={() => setPilotSteer(1, 0)}>
                →
              </TouchButton>
              <TouchButton label="Puxar a linha" className="h-14 w-14 text-xs font-bold text-white" onPress={() => setPilotPull(1, 1)} onRelease={() => setPilotPull(1, 0)}>
                PUXAR
              </TouchButton>
            </div>
          </>
        ) : (
          <div className="absolute right-2 top-2">
            <TouchButton label="Puxar a linha" className="h-14 w-14 text-xs font-bold text-white" onPress={() => setPilotPull(0, 1)} onRelease={() => setPilotPull(0, 0)}>
              PUXAR
            </TouchButton>
          </div>
        )}

        {phase === "ko" && koInfo ? (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-xl dark:border-slate-800 dark:bg-slate-900">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Fim de jogo</p>
              <h3 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">{koInfo.winnerName} venceu!</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                {koInfo.loserName} foi derrubado — {koInfo.reason}.
              </p>
              <div className="mt-5 grid gap-2 sm:grid-cols-2">
                <Button onClick={rematch}>Revanche</Button>
                <Button variant="secondary" onClick={() => nextKite("A")}>
                  Trocar pipa
                </Button>
                <Button variant="secondary" onClick={nextMap}>
                  Trocar mapa
                </Button>
                <Button variant="ghost" onClick={goToMenu}>
                  Menu
                </Button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
