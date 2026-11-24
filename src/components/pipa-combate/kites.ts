import type { KiteDef, KiteId } from "./types";

/** Todas as pipas disponíveis no Pipa Combate. */
export const KITES: KiteDef[] = [
  {
    id: "pombo",
    name: "Pipa-de-pombo",
    nickname: "Pombo",
    color: "#e8590c",
    accent: "#f8bd6f",
    description: "Grande e pesada. Empuxa muita terra, mas responde com força nas mergulhadas.",
    maxTension: 130,
    turnRate: 160,
    thrust: 950,
    tensionPower: 1.15,
    topSpeed: 250,
    size: 17,
    hp: 90,
  },
  {
    id: "asa",
    name: "Pipa-asa",
    nickname: "Asa",
    color: "#2563eb",
    accent: "#bfdbfe",
    description: "A pipa clássica. Equilíbrio entre potência e agilidade para quem domina a linha.",
    maxTension: 100,
    turnRate: 230,
    thrust: 720,
    tensionPower: 1,
    topSpeed: 245,
    size: 13,
    hp: 100,
  },
  {
    id: "lanca",
    name: "Pipa-de-lança",
    nickname: "Lança",
    color: "#dc2626",
    accent: "#fecaca",
    description: "Bem pequena e veloz. Gira rápido demais para quem não puxa com precisão.",
    maxTension: 92,
    turnRate: 330,
    thrust: 780,
    tensionPower: 1.05,
    topSpeed: 320,
    size: 10,
    hp: 85,
  },
  {
    id: "mini",
    name: "Pipa-miúda",
    nickname: "Miúda",
    color: "#0d9488",
    accent: "#99f6e4",
    description: "Mininha e ágil. Frágil demais para choques frontais — use a velocidade a seu favor.",
    maxTension: 80,
    turnRate: 430,
    thrust: 700,
    tensionPower: 0.95,
    topSpeed: 300,
    size: 8,
    hp: 70,
  },
];

export function getKite(id: KiteId): KiteDef {
  return KITES.find((kite) => kite.id === id) ?? KITES[1];
}
