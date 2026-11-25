/** Tipos centrais do Pipa Combate - jogo de combate aereo com pipas e linhas. */

import type { LineDef } from "./lines";

export interface Vec {
  x: number;
  y: number;
}

/** Coordenadas do rabo da pipa no plano (Y vertical, Z lateral). */
export interface Vec2 {
  y: number;
  z: number;
}

/** Pontos do cabresto (anel) da pipa. */
export interface Cabresto {
  x: number;
  y: number;
  z: number;
  x2: number;
  y2: number;
  z2: number;
}

export type KiteId = string;

export interface KiteDef {
  id: KiteId;
  img: string;
  type: string;
  mat: string;
  nome: string;
  name: string;
  nickname: string;
  lg: string;
  color: string;
  accent: string;
  description: string;
  /** Tension max (0..maxTension). */
  maxTension: number;
  /** Potencia de torque do piloto (graus por segundo). */
  turnRate: number;
  /** Forca maxima de propulsao da linha. */
  thrust: number;
  /** Potencia da propulsao em relacao a tensao (0..1). */
  tensionPower: number;
  /** Velocidade maxima do voo. */
  topSpeed: number;
  /** Raio da pipa (para colisoes). */
  size: number;
  /** Pontos de vida. */
  hp: number;
  /** Pressao (0..1) da pipa no jogo original. */
  pressao: number;
  /** Velocidade de puxada (0..1) no jogo original. */
  velocidadePuxao: number;
  /** Desaceleracao de puxada (0..1). */
  desaceleracaoPuxao: number;
  /** Preco da pipa. */
  preco: number;
  /** Rotacao de disbica (disparo) no jogo original. */
  rotDisbige: number;
  /** Largura de disbica (disparo) no jogo original. */
  widthDisbige: number;
  /** Velocidade de rotacao de disbica. */
  velRotDisbige: number;
  /** Valor de rodar no jogo original. */
  valRodar: number;
  /** Velocidade lado-lado no jogo original. */
  velLadoLado: number;
  /** Velocidade de zigzag no jogo original. */
  velZigzag: number;
  /** Murchar (enferrujamento?) no jogo original. */
  murchar: number;
  /** fncMurchar (indice) no jogo original. */
  fncMurchar: number;
  /** Armatura no jogo original. */
  armação: number;
  iniRabi: Vec2;
  cabresto: Cabresto[];
  colorFitinha: string;
  totFitasRabiola: number;
  scale?: number;
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
  /** Linha d'agua (chao acima, agua abaixo). -1 quando nao ha agua. */
  waterY: number;
  /** Direcao para onde o vento sopra (normalizada). */
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
  line: LineDef;
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
  /** 0..1 - indica o botao de puxar a linha. */
  pull: number;
  /** -1..1 - indica inclinar para esquerda/direita. */
  steer: number;
  /** Alvo de tensao para pilotos automaticos (IA). */
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
