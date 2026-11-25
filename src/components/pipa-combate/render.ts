import type { GameState, GameMap, KiteState } from "./types";
import { getMap } from "./maps";

export interface CanvasSize {
  width: number;
  height: number;
  dpr: number;
}

export function drawGame(
  ctx: CanvasRenderingContext2D,
  state: GameState,
  size: CanvasSize,
  time: number,
): void {
  const map = getMap(state.mapId);
  const { width, height, dpr } = size;
  const sx = width / map.width;
  const sy = height / map.height;
  const shakeX = (Math.random() - 0.5) * state.shake * 30;
  const shakeY = (Math.random() - 0.5) * state.shake * 30;
  ctx.setTransform(dpr * sx, 0, 0, dpr * sy, dpr * shakeX, dpr * shakeY);
  ctx.clearRect(0, 0, map.width, map.height);

  drawSky(ctx, map, time);
  drawGround(ctx, map);
  drawObstacles(ctx, map);
  drawKites(ctx, state);
  drawLines(ctx, state);
  drawParticles(ctx, state);
  drawHud(ctx, state, map, size);

  if (state.phase === "countdown") {
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = "rgba(15, 23, 42, 0.35)";
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = "#ffffff";
    ctx.font = "800 96px system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(String(Math.max(0, Math.ceil(state.countdown))), width / 2, height / 2);
    ctx.font = "700 30px system-ui, sans-serif";
    ctx.fillStyle = "#e0f2fe";
    ctx.fillText("bate a asa e prepare a linha!", width / 2, height / 2 + 70);
    ctx.restore();
  }
}

function drawSky(ctx: CanvasRenderingContext2D, map: GameMap, time: number) {
  const sky = ctx.createLinearGradient(0, 0, 0, map.height);
  sky.addColorStop(0, map.skyTop);
  sky.addColorStop(1, map.skyBottom);
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, map.width, map.height);

  // Sol
  const sunX = map.width * 0.78;
  const sunY = map.height * 0.16;
  const sun = ctx.createRadialGradient(sunX, sunY, 10, sunX, sunY, 70);
  sun.addColorStop(0, "rgba(255, 244, 200, 0.95)");
  sun.addColorStop(1, "rgba(255, 244, 200, 0)");
  ctx.fillStyle = sun;
  ctx.beginPath();
  ctx.arc(sunX, sunY, 70, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#fff7cc";
  ctx.beginPath();
  ctx.arc(sunX, sunY, 34, 0, Math.PI * 2);
  ctx.fill();

  // Nuvens
  ctx.fillStyle = "rgba(255,255,255,0.85)";
  for (let i = 0; i < 3; i++) {
    const speed = 9 + i * 5;
    const span = map.width + 300;
    const start = ((i * 420 - time * speed) % span + span) % span - 150;
    const cx = start;
    const cy = map.height * (0.12 + i * 0.07);
    ctx.beginPath();
    ctx.ellipse(cx, cy, 55, 20, 0, 0, Math.PI * 2);
    ctx.ellipse(cx + 38, cy + 5, 38, 16, 0, 0, Math.PI * 2);
    ctx.ellipse(cx - 40, cy + 6, 34, 14, 0, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawGround(ctx: CanvasRenderingContext2D, map: GameMap) {
  const landTop = map.hasWater ? map.waterY - 60 : map.height * 0.5;
  ctx.fillStyle = map.ground;
  ctx.fillRect(0, landTop, map.width, map.height - landTop);

  if (map.hasWater) {
    const sea = ctx.createLinearGradient(0, map.waterY, 0, map.height);
    sea.addColorStop(0, "#3d9be0");
    sea.addColorStop(1, "#9fd8ff");
    ctx.fillStyle = sea;
    ctx.fillRect(0, map.waterY, map.width, map.height - map.waterY);
  }
}

function drawObstacles(ctx: CanvasRenderingContext2D, map: GameMap) {
  for (const obs of map.obstacles) {
    if (obs.kind === "tree") {
      ctx.fillStyle = "#7c4a21";
      ctx.fillRect(obs.x - 6, obs.y - 14, 12, 18);
      ctx.fillStyle = "#3f8f3f";
      ctx.beginPath();
      ctx.arc(obs.x, obs.y - 30, obs.r ?? 40, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#57a857";
      ctx.beginPath();
      ctx.arc(obs.x + (obs.r ?? 40) * 0.45, obs.y - 22, (obs.r ?? 40) * 0.6, 0, Math.PI * 2);
      ctx.fill();
    }
    if (obs.kind === "dune") {
      ctx.fillStyle = "#e3c47e";
      ctx.beginPath();
      ctx.ellipse(obs.x, obs.y, (obs.r ?? 100) * 1.4, (obs.r ?? 100) * 0.5, 0, Math.PI, 0);
      ctx.fill();
    }
    if (obs.kind === "umbrella") {
      const r = obs.r ?? 16;
      ctx.strokeStyle = "#92400e";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(obs.x, obs.y);
      ctx.lineTo(obs.x, obs.y - 62);
      ctx.stroke();
      ctx.fillStyle = "#ef4444";
      ctx.beginPath();
      ctx.arc(obs.x, obs.y - 62, r + 8, Math.PI, 0);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(obs.x, obs.y - 62, r * 0.55, Math.PI, 0);
      ctx.closePath();
      ctx.fill();
    }
    if (obs.kind === "building") {
      const w = obs.w ?? 120;
      const h = obs.h ?? 120;
      ctx.fillStyle = "#8d99ae";
      ctx.fillRect(obs.x - w / 2, obs.y - h, w, h);
      ctx.fillStyle = "#c7d2e0";
      const cols = Math.floor((w - 20) / 26);
      const rows = Math.floor((h - 20) / 30);
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          if ((c + r) % 2 === 0) {
            ctx.fillRect(obs.x - w / 2 + 10 + c * 26, obs.y - h + 12 + r * 30, 12, 16);
          }
        }
      }
    }
    if (obs.kind === "fence") {
      const w = obs.w ?? 40;
      const h = obs.h ?? 100;
      ctx.strokeStyle = "#a8a29e";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(obs.x - w / 2, obs.y - h + 8);
      ctx.lineTo(obs.x + w / 2, obs.y - h + 8);
      ctx.moveTo(obs.x - w / 2, obs.y - 2);
      ctx.lineTo(obs.x + w / 2, obs.y - 2);
      ctx.stroke();
      const posts = Math.floor(w / 9);
      for (let i = 0; i <= posts; i++) {
        const px = obs.x - w / 2 + (i * w) / posts;
        ctx.fillStyle = "#78716c";
        ctx.fillRect(px - 2, obs.y - h, 4, h);
      }
    }
  }
}

function drawKites(ctx: CanvasRenderingContext2D, state: GameState) {
  for (const kite of state.kites) {
    if (!kite.active) continue;
    ctx.save();
    ctx.translate(kite.x, kite.y);
    ctx.rotate(kite.heading);
    const size = kite.def.size * 2;
    const halfLen = size * 1.7;
    const tailLen = 46 - kite.tension * 0.38;
    const dirX = Math.cos(kite.heading);
    const dirY = Math.sin(kite.heading);
    // Cauda
    ctx.strokeStyle = kite.def.accent;
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i = 1; i <= 6; i++) {
      const t = i / 6;
      const px = -dirX * tailLen * t;
      const py = -dirY * tailLen * t;
      if (i === 1) ctx.moveTo(0, 0);
      ctx.lineTo(px, py);
    }
    ctx.stroke();
    // Corpo
    ctx.fillStyle = kite.def.color;
    ctx.beginPath();
    ctx.moveTo(0, -halfLen);
    ctx.lineTo(size * 0.55, 0);
    ctx.lineTo(0, halfLen);
    ctx.lineTo(-size * 0.55, 0);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = kite.def.accent;
    ctx.beginPath();
    ctx.moveTo(0, -halfLen);
    ctx.lineTo(size * 0.34, -halfLen * 0.5);
    ctx.lineTo(0, -halfLen * 1.25);
    ctx.lineTo(-size * 0.34, -halfLen * 0.5);
    ctx.closePath();
    ctx.fill();
    // Ponta
    ctx.fillStyle = "#1e293b";
    ctx.beginPath();
    ctx.moveTo(0, -halfLen);
    ctx.lineTo(size * 0.18, -halfLen * 0.72);
    ctx.lineTo(0, -halfLen * 0.95);
    ctx.lineTo(-size * 0.18, -halfLen * 0.72);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // Trilha
    if (kite.trail.length > 1) {
      ctx.strokeStyle = kite.def.color;
      ctx.globalAlpha = 0.3;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(kite.trail[0].x, kite.trail[0].y);
      for (const p of kite.trail) ctx.lineTo(p.x, p.y);
      ctx.stroke();
      ctx.globalAlpha = 1;
    }
  }
}

function drawLines(ctx: CanvasRenderingContext2D, state: GameState) {
  for (const kite of state.kites) {
    if (!kite.active) continue;
    const alpha = 0.35 + (kite.tension / 100) * 0.65;
    ctx.strokeStyle = kite.owner === 0 ? "#1d4ed8" : "#b91c1c";
    ctx.globalAlpha = alpha;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(kite.anchorX, kite.anchorY);
    ctx.lineTo(kite.x, kite.y);
    ctx.stroke();
    // Mao do piloto
    ctx.fillStyle = "#475569";
    ctx.beginPath();
    ctx.arc(kite.anchorX, kite.anchorY, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

function drawParticles(ctx: CanvasRenderingContext2D, state: GameState) {
  for (const p of state.particles) {
    const alpha = Math.max(0, p.life / p.maxLife);
    ctx.globalAlpha = alpha;
    if (p.kind === "spark") {
      ctx.strokeStyle = p.color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(p.x - p.vx * 0.02, p.y - p.vy * 0.02);
      ctx.lineTo(p.x + p.vx * 0.02, p.y + p.vy * 0.02);
      ctx.stroke();
    } else {
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.globalAlpha = 1;
}

function drawHud(ctx: CanvasRenderingContext2D, state: GameState, map: GameMap, size: CanvasSize) {
  const width = size.width;
  const height = size.height;
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  // Vento
  ctx.strokeStyle = "rgba(15,23,42,0.7)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(width / 2 - 46, 34);
  ctx.lineTo(width / 2 - 14, 34);
  ctx.moveTo(width / 2 - 14, 27);
  ctx.lineTo(width / 2 - 14, 41);
  ctx.moveTo(width / 2 + 14, 27);
  ctx.lineTo(width / 2 + 14, 41);
  ctx.moveTo(width / 2 + 46, 34);
  ctx.lineTo(width / 2 + 14, 34);
  ctx.stroke();
  ctx.fillStyle = "rgba(15,23,42,0.85)";
  ctx.beginPath();
  ctx.moveTo(width / 2, 18);
  ctx.lineTo(width / 2 - 9, 34);
  ctx.lineTo(width / 2 + 9, 34);
  ctx.closePath();
  ctx.fill();
  ctx.font = "700 16px system-ui, sans-serif";
  ctx.fillStyle = "rgba(15,23,42,0.85)";
  ctx.textAlign = "center";
  ctx.fillText(`${Math.round(map.windStrength)}`, width / 2, 58);

  // Barras de tensão e vida
  state.kites.forEach((kite, index) => {
    if (!kite.active) return;
    const y = height - 46;
    const w = (width - 48) / 2;
    const x = index === 0 ? 16 : width / 2 + 8;
    const barH = 10;
    const t = ctx.createLinearGradient(x, y, x, y + barH);
    t.addColorStop(0, "#22c55e");
    t.addColorStop(1, "#ef4444");
    ctx.fillStyle = "rgba(15,23,42,0.55)";
    ctx.fillRect(x, y, w, barH);
    ctx.fillStyle = t;
    const tensionW = (kite.tension / (kite.def.maxTension || 1)) * w;
    ctx.fillRect(x, y, Math.max(0, tensionW), barH);
    const hpY = y + 22;
    ctx.fillStyle = "rgba(15,23,42,0.55)";
    ctx.fillRect(x, hpY, w, barH);
    ctx.fillStyle = "#38bdf8";
    ctx.fillRect(x, hpY, Math.max(0, (kite.hp / kite.maxHp) * w), barH);

    ctx.textAlign = "left";
    ctx.font = "700 14px system-ui, sans-serif";
    ctx.fillStyle = "#0f172a";
    ctx.fillText(kite.def.nickname, x, y - 12);
    ctx.textAlign = "right";
    ctx.fillStyle = "#f8fafc";
    ctx.fillText(`${Math.max(0, Math.ceil(kite.hp))}/${kite.maxHp}`, x + w, y - 12);
    ctx.textAlign = "left";
  });
  ctx.restore();
}

export function kiteByOwner(state: GameState, owner: number): KiteState | undefined {
  return state.kites[owner];
}
