import { createRoot } from "react-dom/client";
import { FightingArena } from "../src/components/arena/FightingArena";

const root = document.getElementById("root");
if (root) {
  createRoot(root).render(<FightingArena playerName="KAI" enemyName="VEX" />);
}
