import type { GameMap, GameState, KiteState, KiteId, PilotInput, Vec } from "./types";
import { getMap } from "./maps";
import { getKite } from "./kites";

const TENSION_PULL_RATE = 95;
const TENSION_RELEASE_RATE = 75;

export function createInitialState(): GameState {
  return {
    phase: "menu",
    mapId: "praia",
    mode: "pvp",
    kites: [],
    winner: null,
    result: null,
    countdown: 0,
    time: 0,
    particles: [],
    shake: 0,
  };
}

export function anchorOf(map: GameMap, owner: number): Vec {
  const side = owner === 0 ? 0.16 : 0.84;
  return { x: map.width * side, y: map.height - 70 };
}

export function spawnKites(map: GameMap, kiteA: KiteId, kiteB: KiteId): [KiteState, KiteState] {
  const a = getKite(kiteA);
  const b = getKite(kiteB);
  const anchorA = anchorOf(map, 0);
  const anchorB = anchorOf(map, 1);
  const kites: KiteState[] = [
    {
      def: a,
      owner: 0,
      x: anchorA.x,
      y: map.hasWater ? map.waterY - a.size * 3 - 8 : anchorA.y - a.size * 4,
      vx: 0,
      vy: 0,
      heading: -Math.PI / 2,
      tension: 0,
      anchorX: anchorA.x,
      anchorY: anchorA.y,
      hp: a.hp,
      maxHp: a.hp,
      active: true,
      trail: [],
    },
    {
      def: b,
      owner: 1,
      x: anchorB.x,
      y: map.hasWater ? map.waterY - b.size * 3 - 8 : anchorB.y - b.size * 4,
      vx: 0,
      vy: 0,
      heading: -Math.PI / 2,
      tension: 0,
      anchorX: anchorB.x,
      anchorY: anchorB.y,
      hp: b.hp,
      maxHp: b.hp,
      active: true,
      trail: [],
    },
  ];
  return [kites[0], kites[1]];
}

export function startFight(state: GameState, mapId: string, kiteA: KiteId, kiteB: KiteId, mode: "pvp" | "ai"): GameState {
  const map = getMap(mapId);
  const kites = spawnKites(map, kiteA, kiteB);
  return {
    ...state,
    phase: "countdown",
    mapId,
    mode,
    kites,
    winner: null,
    result: null,
    countdown: 3.2,
    time: 0,
    particles: [],
    shake: 0,
  };
}

function aiControl(kite: KiteState, enemy: KiteState): PilotInput {
  const dx = enemy.x - kite.x;
  const dy = enemy.y - kite.y;
  const dist = Math.max(1, Math.hypot(dx, dy));
  const desiredHeading = Math.atan2(dy, dx);
  let diff = desiredHeading - kite.heading;
  while (diff > Math.PI) diff -= Math.PI * 2;
  while (diff < -Math.PI) diff += Math.PI * 2;
  const desiredTension = dist < 150 ? kite.def.maxTension * 0.92 : dist < 320 ? kite.def.maxTension * 0.55 : kite.def.maxTension * 0.2;
  const steer = Math.max(-1, Math.min(1, diff / (kite.def.turnRate * 0.22)));
  const pull = dist > 150 ? 0 : 1;
  return { pull, steer, targetTension: desiredTension };
}

function stepKite(kite: KiteState, map: GameMap, input: PilotInput, dt: number): KiteState {
  if (!kite.active) return kite;

  let tension = kite.tension;
  if (input.targetTension !== undefined) {
    tension = Math.max(0, Math.min(kite.def.maxTension, tension + (input.targetTension - tension) * Math.min(1, dt * 2.5)));
  } else if (input.pull > 0) {
    tension = Math.min(kite.def.maxTension, tension + TENSION_PULL_RATE * dt);
  } else {
    tension = Math.max(0, tension - TENSION_RELEASE_RATE * dt);
  }

  const thrust = Math.pow(tension / 100, kite.def.tensionPower) * kite.def.thrust;
  const dirX = Math.cos(kite.heading);
  const dirY = Math.sin(kite.heading);
  const windX = map.wind.x * map.windStrength;
  const windY = map.wind.y * map.windStrength;

  const vx = kite.vx + dirX * thrust * dt + windX * dt;
  const vy = kite.vy + dirY * thrust * dt + windY * dt;
  const damp = Math.exp(-2.1 * dt);
  const nvx = vx * damp;
  const nvy = vy * damp;
  const speed = Math.hypot(nvx, nvy);
  const cappedX = speed > kite.def.topSpeed ? (nvx / speed) * kite.def.topSpeed : nvx;
  const cappedY = speed > kite.def.topSpeed ? (nvy / speed) * kite.def.topSpeed : nvy;

  const next: KiteState = { ...kite, x: kite.x + cappedX * dt, y: kite.y + cappedY * dt, vx: cappedX, vy: cappedY, heading: kite.heading + input.steer * (kite.def.turnRate * (Math.PI / 180)) * dt, tension };
  next.trail.push({ x: next.x, y: next.y });
  if (next.trail.length > 34) next.trail.shift();
  return next;
}

function finishWithKO(state: GameState, kites: KiteState[], index: number, reason: string): GameState {
  const kite = kites[index];
  if (!kite.active) return state;
  kite.active = false;
  kite.hp = 0;
  const winner = kite.owner === 0 ? 1 : 0;
  const result = { winner, loser: kite.owner, reason };
  const particles = [
    ...state.particles,
    {
      x: kite.x,
      y: kite.y,
      vx: (Math.random() - 0.5) * 160,
      vy: (Math.random() - 0.5) * 160 - 60,
      life: 0.9,
      maxLife: 0.9,
      size: 5,
      color: kite.def.color,
      kind: "ribbon" as const,
    },
  ];
  return { ...state, phase: "ko", result, winner, particles, shake: 16 };
}

function obstacleHit(kite: KiteState, obs: GameMap["obstacles"][number]): boolean {
  const radius = kite.def.size / 2 + (obs.r ?? obs.w ?? 20) / 2;
  const closestX = Math.max(obs.x, Math.min(kite.x, obs.x + (obs.w ?? (obs.r ?? 20) * 2)));
  const closestY = Math.max(obs.y, Math.min(kite.y, obs.y + (obs.h ?? (obs.r ?? 20) * 2)));
  const dx = kite.x - closestX;
  const dy = kite.y - closestY;
  return dx * dx + dy * dy < radius * radius;
}

function obstacleReason(kind: string): string {
  switch (kind) {
    case "tree":
      return "bateu numa árvore";
    case "building":
      return "bateu num prédio";
    case "umbrella":
      return "bateu numa barraca";
    case "dune":
      return "bateu na areia";
    case "fence":
      return "bateu na cerca";
    default:
      return "bateu num obstáculo";
  }
}

export function step(state: GameState, inputs: { pull: number[]; steer: number[] }, dt: number): GameState {
  if (state.phase === "menu") return { ...state, particles: [], shake: 0 };

  const map = getMap(state.mapId);
  const next: GameState = { ...state, kites: state.kites.map((k) => ({ ...k, trail: [...k.trail] })), particles: [...state.particles] };

  if (next.phase === "countdown") {
    next.countdown -= dt;
    if (next.countdown <= 0) next.phase = "fight";
    return next;
  }

  if (next.phase === "ko") {
    next.particles = next.particles.map((p) => ({ ...p, x: p.x + p.vx * dt, y: p.y + p.vy * dt, life: p.life - dt })).filter((p) => p.life > 0);
    next.shake = Math.max(0, next.shake - dt * 30);
    return next;
  }

  if (next.phase === "fight") {
    next.time += dt;

    const input0: PilotInput = { pull: inputs.pull[0] ?? 0, steer: inputs.steer[0] ?? 0 };
    const input1: PilotInput = state.mode === "ai" ? aiControl(next.kites[1], next.kites[0]) : { pull: inputs.pull[1] ?? 0, steer: inputs.steer[1] ?? 0 };

    const a = stepKite(next.kites[0], map, input0, dt);
    const b = stepKite(next.kites[1], map, input1, dt);
    next.kites[0] = a;
    next.kites[1] = b;

    for (const [i, kite] of next.kites.entries()) {
      if (!kite.active) continue;
      if (map.hasWater && kite.y > map.waterY) return finishWithKO(next, next.kites, i, "foi para a água");
      if (kite.y < -40 || kite.y > map.height + 60 || kite.x < -60 || kite.x > map.width + 60) return finishWithKO(next, next.kites, i, "caiu do mapa");
    }

    for (const [i, kite] of next.kites.entries()) {
      if (!kite.active) continue;
      for (const obs of map.obstacles) {
        if (obstacleHit(kite, obs)) return finishWithKO(next, next.kites, i, obstacleReason(obs.kind));
      }
    }

    // Colisão / choque de linhas entre as pipas
    const clash = clashKites(next.kites);
    if (clash) {
      const { attacker, defender, impact } = clash;
      defender.hp -= Math.min(40, Math.max(0, (impact - 55) * 0.55));
      next.particles = [
        ...next.particles,
        {
          x: defender.x,
          y: defender.y,
          vx: (Math.random() - 0.5) * 140,
          vy: (Math.random() - 0.5) * 140 - 40,
          life: 0.5,
          maxLife: 0.5,
          size: 4,
          color: attacker.def.color,
          kind: "spark" as const,
        },
      ];
      if (defender.hp <= 0) {
        const result = { winner: attacker.owner, loser: defender.owner, reason: "choque de linhas" };
        return finishWithKO(next, next.kites, defender.owner, result.reason);
      }
      next.shake = Math.max(next.shake, 8);
    }

    next.particles = next.particles.map((p) => ({ ...p, x: p.x + p.vx * dt, y: p.y + p.vy * dt, life: p.life - dt })).filter((p) => p.life > 0);
    next.shake = Math.max(0, next.shake - dt * 30);
  }

  return next;
}

interface ClashEvent {
  attacker: KiteState;
  defender: KiteState;
  impact: number;
}

function clashKites(kites: KiteState[]): ClashEvent | null {
  const a = kites[0];
  const b = kites[1];
  if (!a.active || !b.active) return null;
  const minDist = (a.def.size + b.def.size) / 2;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const dist = Math.hypot(dx, dy);
  if (dist > minDist || dist < 1e-4) return null;

  const nx = dx / dist;
  const ny = dy / dist;
  const overlap = minDist - dist;
  a.x -= nx * (overlap / 2);
  a.y -= ny * (overlap / 2);
  b.x += nx * (overlap / 2);
  b.y += ny * (overlap / 2);
  const impact = (b.vx - a.vx) * nx + (b.vy - a.vy) * ny;
  const attacker = a.tension >= b.tension ? b : a;
  const defender = attacker === a ? b : a;
  return { attacker, defender, impact };
}
