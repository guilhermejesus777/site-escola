import type { GameMap } from "./types";

/**
 * Mapas do Pipa Combate.
 * O mundo é escalado em unidades logrítmicas; o canvas escala para o tamanho do retângulo.
 */
export const MAPS: GameMap[] = [
  {
    id: "praia",
    name: "Praia",
    width: 1000,
    height: 660,
    waterY: 430,
    wind: { x: 0.32, y: -0.95 },
    windStrength: 16,
    hasWater: true,
    skyTop: "#59b7e8",
    skyBottom: "#d8f1fc",
    ground: "#f2dfa8",
    obstacles: [
      { kind: "dune", x: 210, y: 560, r: 130 },
      { kind: "umbrella", x: 640, y: 545, r: 16 },
      { kind: "umbrella", x: 700, y: 552, r: 16 },
      { kind: "umbrella", x: 750, y: 545, r: 16 },
      { kind: "dune", x: 420, y: 575, r: 110 },
    ],
  },
  {
    id: "parque",
    name: "Parque",
    width: 1000,
    height: 660,
    waterY: -1,
    wind: { x: 0.18, y: -0.98 },
    windStrength: 11,
    hasWater: false,
    skyTop: "#7cc7ee",
    skyBottom: "#e8f9ff",
    ground: "#79b45a",
    obstacles: [
      { kind: "tree", x: 150, y: 470, r: 46 },
      { kind: "tree", x: 250, y: 520, r: 52 },
      { kind: "tree", x: 830, y: 480, r: 44 },
      { kind: "tree", x: 920, y: 540, r: 50 },
      { kind: "tree", x: 560, y: 560, r: 40 },
      { kind: "fence", x: 60, y: 120, w: 40, h: 320 },
      { kind: "fence", x: 900, y: 120, w: 40, h: 320 },
    ],
  },
  {
    id: "largo",
    name: "Largo",
    width: 1000,
    height: 620,
    waterY: -1,
    wind: { x: 0.55, y: -0.83 },
    windStrength: 20,
    hasWater: false,
    skyTop: "#8fd0ef",
    skyBottom: "#eafaff",
    ground: "#9a8f86",
    obstacles: [
      { kind: "building", x: 40, y: 120, w: 150, h: 300 },
      { kind: "building", x: 320, y: 220, w: 130, h: 220 },
      { kind: "building", x: 620, y: 160, w: 150, h: 260 },
      { kind: "building", x: 940, y: 240, w: 150, h: 180 },
      { kind: "building", x: 480, y: 180, w: 110, h: 130 },
    ],
  },
];

export function getMap(id: string): GameMap {
  return MAPS.find((map) => map.id === id) ?? MAPS[0];
}
