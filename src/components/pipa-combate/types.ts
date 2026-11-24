/** Tipos centrais do Pipa Combate — jogo de combate aéreo com pipas e linhas. */

export interface Vec {
  x: number;
  y: number;
}

export type KiteId = "pombo" | "asa" | "lanca" | "mini";

export interface KiteDef {
  id: KiteId;
  name: string;
  nickname: string;
  color: string;
  accent: string;
  description: string;
  /** Tensão máxima da linha (0..maxTension). */
  maxTension: number;
  /** Potência de torque do piloto (graus por segundo). */
  turnRate: number;
  /** Fuerza máxima de propulsão da linha. */
  thrust: number;
  /** Potência da propulsão em relação à tensão (0..1). */
  tensionPower: number;
  /** Velocidade máxima do voo. */
  topSpeed: number;
  /** Raio da pipa (para colisões). */
  size: number;
  /** Pontos de vida. */
  hp: number;
}

export type ObstacleKind = "tree" | "building" | "umbrella" | "dune" | "fence";

export interface Obstacle {
  kind: ObstacleKind;
  x: number;
  y: number;
  r?: number;
  w?: number;
  h?: number;
}

export interface GameMap {
  id: string;
  name: string;
  width: number;
  height: number;
  /** Linha da água (céu acima, água abaixo). -1 quando não há água. */
  waterY: number;
  /** Direção para onde o vento sopra (normalizada). */
  wind: Vec;
  windStrength: number;
  obstacles: Obstacle[];
  skyTop: string;
  skyBottom: string;
  ground: string;
  hasWater: boolean;
}

export interface KiteState {
  def: KiteDef;
  owner: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  heading: number;
  tension: number;
  anchorX: number;
  anchorY: number;
  hp: number;
  maxHp: number;
  active: boolean;
  trail: Vec[];
}

export type Phase = "menu" | "countdown" | "fight" | "ko";

export interface MatchResult {
  winner: number;
  loser: number;
  reason: string;
}

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
  kind: "spark" | "ribbon";
}

export interface PilotInput {
  /** 0..1 — 1 segura o botão de puxar a linha. */
  pull: number;
  /** -1..1 — -1 = inclinar p/ esquerda, 1 = p/ direita. */
  steer: number;
  /** Alvo de tensão para pilotos automáticos (IA). */
  targetTension?: number;
}

export interface GameState {
  phase: Phase;
  mapId: string;
  mode: "pvp" | "ai";
  kites: KiteState[];
  winner: number | null;
  result: MatchResult | null;
  countdown: number;
  time: number;
  particles: Particle[];
  shake: number;
}
