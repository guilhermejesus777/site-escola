import * as THREE from "three";

/* ==========================================================================
   ARENA NEON — motor 3D de luta (Three.js puro, sem assets externos)
   --------------------------------------------------------------------------
   Todo o cenário e os lutadores são montados com primitivas, e o combate é
   simulado com máquina de estados (idle / andar / golpe / bloqueio / nocaute).
   A HUD é React: o motor só publica um snapshot via callback.
   ========================================================================== */

export type Difficulty = "facil" | "normal" | "dificil";
export type GameStatus = "menu" | "intro" | "fight" | "roundEnd" | "matchEnd";
export type Side = "player" | "enemy";

export type HudState = {
  status: GameStatus;
  paused: boolean;
  difficulty: Difficulty;
  round: number;
  timer: number;
  message: string;
  submessage: string;
  combo: number;
  matchWinner: Side | null;
  player: { hp: number; maxHp: number; meter: number; wins: number };
  enemy: { hp: number; maxHp: number; meter: number; wins: number };
  impact: number;
  impactTarget: Side | null;
  impactKind: "hit" | "block" | null;
};

type AttackKind = "punch" | "kick" | "super";
type AttackDef = {
  startup: number;
  active: number;
  recovery: number;
  damage: number;
  reach: number;
  knockback: number;
  shake: number;
};

const ATTACKS: Record<AttackKind, AttackDef> = {
  punch: { startup: 0.1, active: 0.09, recovery: 0.17, damage: 6.5, reach: 1.3, knockback: 0.16, shake: 0.22 },
  kick: { startup: 0.2, active: 0.12, recovery: 0.32, damage: 11.5, reach: 1.85, knockback: 0.4, shake: 0.4 },
  super: { startup: 0.48, active: 0.3, recovery: 0.72, damage: 27, reach: 2.75, knockback: 1.3, shake: 0.95 },
};

const MAX_HP = 100;
const ROUND_TIME = 60;
const WINS_NEEDED = 2;
const BOUND_X = 4.55;
const BOUND_Z = 1.45;
const MIN_DIST = 0.95;

const DIFFICULTY: Record<
  Difficulty,
  {
    speed: number;
    minThink: number;
    maxThink: number;
    aggression: number;
    block: number;
    damage: number;
    reaction: number;
  }
> = {
  facil: { speed: 2.5, minThink: 0.65, maxThink: 1.25, aggression: 0.5, block: 0.16, damage: 0.75, reaction: 0.3 },
  normal: { speed: 3.05, minThink: 0.38, maxThink: 0.85, aggression: 0.68, block: 0.34, damage: 0.9, reaction: 0.18 },
  dificil: { speed: 3.6, minThink: 0.2, maxThink: 0.52, aggression: 0.86, block: 0.55, damage: 1.05, reaction: 0.1 },
};

type Rig = {
  body: THREE.Group;
  head: THREE.Group;
  shoulderL: THREE.Group;
  elbowL: THREE.Group;
  shoulderR: THREE.Group;
  elbowR: THREE.Group;
  hipL: THREE.Group;
  kneeL: THREE.Group;
  hipR: THREE.Group;
  kneeR: THREE.Group;
  suit: THREE.MeshStandardMaterial;
  trim: THREE.MeshStandardMaterial;
};

type Fighter = {
  side: Side;
  name: string;
  root: THREE.Group;
  rig: Rig;
  pos: THREE.Vector3;
  y: number;
  vy: number;
  facing: 1 | -1;
  hp: number;
  meter: number;
  wins: number;
  blocking: boolean;
  blockHeld: boolean;
  attack: { kind: AttackKind; t: number; hitDone: boolean } | null;
  hitTimer: number;
  ko: boolean;
  koTimer: number;
  moveX: number;
  moveZ: number;
  walkPhase: number;
  flash: number;
};

type Spark = { mesh: THREE.Mesh; life: number; max: number; grow: number };

type EngineCallbacks = { onHud: (hud: HudState) => void };

/* ------------------------------- Utilidades ------------------------------- */

function makeLimb(radius: number, length: number, material: THREE.Material) {
  const geo = new THREE.CapsuleGeometry(radius, Math.max(0.01, length - radius * 2), 5, 10);
  const mesh = new THREE.Mesh(geo, material);
  mesh.position.y = -length / 2;
  mesh.castShadow = true;
  return mesh;
}

function makeFighter(name: string, color: number, accent: number, side: Side): Fighter {
  const suit = new THREE.MeshStandardMaterial({
    color,
    emissive: new THREE.Color(color).multiplyScalar(0.22),
    emissiveIntensity: 1,
    roughness: 0.42,
    metalness: 0.45,
  });
  const trim = new THREE.MeshStandardMaterial({
    color: accent,
    emissive: accent,
    emissiveIntensity: 1.8,
    roughness: 0.3,
    metalness: 0.2,
  });
  const dark = new THREE.MeshStandardMaterial({ color: 0x111a2c, roughness: 0.55, metalness: 0.4 });
  const skin = new THREE.MeshStandardMaterial({ color: 0xd9a066, roughness: 0.65 });

  const root = new THREE.Group();
  const body = new THREE.Group();
  root.add(body);

  // Torso + quadril
  const torso = new THREE.Mesh(new THREE.CapsuleGeometry(0.235, 0.4, 6, 14), suit);
  torso.position.y = 1.2;
  torso.castShadow = true;
  body.add(torso);

  const belt = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.11, 0.3), dark);
  belt.position.y = 0.93;
  belt.castShadow = true;
  body.add(belt);

  const core = new THREE.Mesh(new THREE.SphereGeometry(0.075, 12, 12), trim);
  core.position.set(0, 1.32, 0.19);
  body.add(core);

  const collar = new THREE.Mesh(new THREE.TorusGeometry(0.15, 0.028, 6, 16), trim);
  collar.position.y = 1.5;
  collar.rotation.x = Math.PI / 2;
  body.add(collar);

  // Cabeça
  const head = new THREE.Group();
  head.position.y = 1.66;
  body.add(head);
  const skull = new THREE.Mesh(new THREE.SphereGeometry(0.155, 18, 16), skin);
  skull.castShadow = true;
  head.add(skull);
  const helmet = new THREE.Mesh(new THREE.SphereGeometry(0.168, 18, 12, 0, Math.PI * 2, 0, Math.PI * 0.55), dark);
  helmet.castShadow = true;
  head.add(helmet);
  const visor = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.055, 0.04), trim);
  visor.position.set(0, 0.02, 0.145);
  head.add(visor);
  const crest = new THREE.Mesh(new THREE.ConeGeometry(0.045, 0.22, 6), trim);
  crest.position.set(0, 0.21, -0.01);
  head.add(crest);

  // Braços
  function makeArm(z: number, mirror: 1 | -1) {
    const shoulder = new THREE.Group();
    shoulder.position.set(0.27 * mirror, 1.45, z);
    body.add(shoulder);

    const pad = new THREE.Mesh(new THREE.SphereGeometry(0.1, 12, 10), trim);
    pad.castShadow = true;
    shoulder.add(pad);

    shoulder.add(makeLimb(0.075, 0.37, suit));
    const elbow = new THREE.Group();
    elbow.position.y = -0.37;
    shoulder.add(elbow);
    elbow.add(makeLimb(0.066, 0.33, skin));
    const fist = new THREE.Mesh(new THREE.SphereGeometry(0.085, 12, 12), dark);
    fist.position.y = -0.35;
    fist.castShadow = true;
    elbow.add(fist);
    return { shoulder, elbow };
  }

  const leftArm = makeArm(-0.02, -1);
  const rightArm = makeArm(0.02, 1);

  // Pernas
  function makeLeg(mirror: 1 | -1) {
    const hip = new THREE.Group();
    hip.position.set(0.13 * mirror, 0.93, 0);
    body.add(hip);
    hip.add(makeLimb(0.085, 0.45, dark));
    const knee = new THREE.Group();
    knee.position.y = -0.45;
    hip.add(knee);
    knee.add(makeLimb(0.072, 0.42, suit));
    const foot = new THREE.Mesh(new THREE.BoxGeometry(0.17, 0.09, 0.3), trim);
    foot.position.set(0, -0.45, 0.06);
    foot.castShadow = true;
    knee.add(foot);
    return { hip, knee };
  }

  const leftLeg = makeLeg(-1);
  const rightLeg = makeLeg(1);

  const fighter: Fighter = {
    side,
    name,
    root,
    rig: {
      body,
      head,
      shoulderL: leftArm.shoulder,
      elbowL: leftArm.elbow,
      shoulderR: rightArm.shoulder,
      elbowR: rightArm.elbow,
      hipL: leftLeg.hip,
      kneeL: leftLeg.knee,
      hipR: rightLeg.hip,
      kneeR: rightLeg.knee,
      suit,
      trim,
    },
    pos: new THREE.Vector3(side === "player" ? -1.6 : 1.6, 0, 0),
    y: 0,
    vy: 0,
    facing: side === "player" ? 1 : -1,
    hp: MAX_HP,
    meter: 0,
    wins: 0,
    blocking: false,
    blockHeld: false,
    attack: null,
    hitTimer: 0,
    ko: false,
    koTimer: 0,
    moveX: 0,
    moveZ: 0,
    walkPhase: 0,
    flash: 0,
  };
  return fighter;
}

/* --------------------------------- Som ------------------------------------ */

class SoundKit {
  private ctx: AudioContext | null = null;
  private noise: AudioBuffer | null = null;

  unlock() {
    if (typeof window === "undefined") return;
    if (!this.ctx) {
      const Ctx = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!Ctx) return;
      this.ctx = new Ctx();
      const length = Math.floor(this.ctx.sampleRate * 0.5);
      const buffer = this.ctx.createBuffer(1, length, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < length; i += 1) data[i] = Math.random() * 2 - 1;
      this.noise = buffer;
    }
    void this.ctx.resume();
  }

  private burst(freq: number, q: number, duration: number, gain: number, type: BiquadFilterType = "bandpass") {
    const ctx = this.ctx;
    if (!ctx || !this.noise) return;
    const src = ctx.createBufferSource();
    src.buffer = this.noise;
    const filter = ctx.createBiquadFilter();
    filter.type = type;
    filter.frequency.value = freq;
    filter.Q.value = q;
    const amp = ctx.createGain();
    const now = ctx.currentTime;
    amp.gain.setValueAtTime(gain, now);
    amp.gain.exponentialRampToValueAtTime(0.001, now + duration);
    src.connect(filter).connect(amp).connect(ctx.destination);
    src.start(now);
    src.stop(now + duration + 0.02);
  }

  private tone(from: number, to: number, duration: number, gain: number, type: OscillatorType = "sine") {
    const ctx = this.ctx;
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const amp = ctx.createGain();
    const now = ctx.currentTime;
    osc.type = type;
    osc.frequency.setValueAtTime(from, now);
    osc.frequency.exponentialRampToValueAtTime(Math.max(20, to), now + duration);
    amp.gain.setValueAtTime(gain, now);
    amp.gain.exponentialRampToValueAtTime(0.001, now + duration);
    osc.connect(amp).connect(ctx.destination);
    osc.start(now);
    osc.stop(now + duration + 0.02);
  }

  punch() {
    this.burst(1500, 1.1, 0.12, 0.35);
    this.tone(180, 70, 0.14, 0.28);
  }

  kick() {
    this.burst(800, 0.9, 0.2, 0.4);
    this.tone(120, 45, 0.22, 0.4);
  }

  superHit() {
    this.burst(500, 0.6, 0.5, 0.5, "lowpass");
    this.tone(90, 30, 0.5, 0.5, "sawtooth");
  }

  block() {
    this.burst(3000, 3, 0.09, 0.25);
    this.tone(420, 300, 0.08, 0.12, "square");
  }

  whoosh() {
    this.burst(900, 0.7, 0.16, 0.12, "highpass");
  }

  jump() {
    this.tone(320, 620, 0.12, 0.06, "triangle");
  }

  superCharge() {
    this.tone(80, 900, 0.55, 0.12, "sawtooth");
    this.burst(2000, 1.4, 0.55, 0.12);
  }

  bell() {
    this.tone(880, 870, 0.5, 0.14, "triangle");
    this.tone(1320, 1310, 0.45, 0.07, "sine");
  }

  ko() {
    this.tone(150, 50, 0.8, 0.35, "sawtooth");
    this.burst(400, 0.5, 0.7, 0.3, "lowpass");
  }

  dispose() {
    if (this.ctx) {
      void this.ctx.close();
      this.ctx = null;
    }
  }
}

/* ------------------------------- Motor ------------------------------------ */

export class FightingEngine {
  private container: HTMLElement;
  private callbacks: EngineCallbacks;
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private clock = new THREE.Clock();
  private observer: ResizeObserver;
  private sparkGeo: THREE.RingGeometry;
  private sparks: Spark[] = [];
  private hitLight: THREE.PointLight;
  private starField: THREE.Points;
  private shards: THREE.Mesh[] = [];
  private platformRing: THREE.Mesh;
  private floorGlow: THREE.Mesh;
  public sfx = new SoundKit();

  private player: Fighter;
  private enemy: Fighter;
  private held = { left: false, right: false, up: false, down: false, block: false };
  private queue: ("punch" | "kick" | "super" | "jump")[] = [];

  private status: GameStatus = "menu";
  private paused = false;
  private difficulty: Difficulty = "normal";
  private round = 1;
  private roundTimer = ROUND_TIME;
  private introTimer = 0;
  private roundEndTimer = 0;
  private matchWinner: Side | null = null;
  private message = "ARENA NEON";
  private submessage = "Escolha a dificuldade e entre na arena";
  private combo = 0;
  private comboTimer = 0;
  private lastImpact = 0;
  private impactTarget: Side | null = null;
  private impactKind: "hit" | "block" | null = null;

  private aiBlockTimer = 0;
  private aiThinkTimer = 0;
  private aiMoveX = 0;
  private aiMoveZ = 0;
  private aiZTarget = 0;

  private shake = 0;
  private timeScale = 1;
  private timeScaleTarget = 1;
  private camX = 0;
  private zoom = 0;
  private elapsed = 0;
  private hudTimer = 0;
  private disposed = false;
  private resizeRaf = 0;

  constructor(container: HTMLElement, callbacks: EngineCallbacks) {
    this.container = container;
    this.callbacks = callbacks;

    this.renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.setSize(container.clientWidth || 800, container.clientHeight || 480);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.05;
    this.renderer.domElement.style.display = "block";
    this.renderer.domElement.style.width = "100%";
    this.renderer.domElement.style.height = "100%";
    container.appendChild(this.renderer.domElement);

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x04050e);
    this.scene.fog = new THREE.Fog(0x04050e, 13, 34);

    this.camera = new THREE.PerspectiveCamera(42, 16 / 9, 0.1, 90);
    this.camera.position.set(0, 2.7, 9.4);
    this.camera.lookAt(0, 1.1, 0);

    this.sparkGeo = new THREE.RingGeometry(0.34, 0.5, 24);
    this.buildEnvironment();

    this.hitLight = new THREE.PointLight(0x9ff5ff, 0, 12, 2);
    this.hitLight.position.set(0, 1.4, 0.5);
    this.scene.add(this.hitLight);

    const { starField, shards, platformRing, floorGlow } = this.buildScenery();
    this.starField = starField;
    this.shards = shards;
    this.platformRing = platformRing;
    this.floorGlow = floorGlow;

    this.player = makeFighter("KAI", 0x1d6ff2, 0x22d3ee, "player");
    this.enemy = makeFighter("VEX", 0xc0265c, 0xf43f5e, "enemy");
    this.scene.add(this.player.root, this.enemy.root);
    this.enemy.root.position.set(1.6, 0, 0);
    this.player.root.rotation.y = Math.PI / 2;
    this.enemy.root.rotation.y = -Math.PI / 2;

    this.observer = new ResizeObserver(() => this.resize());
    this.observer.observe(container);

    window.addEventListener("keydown", this.onKeyDown);
    window.addEventListener("keyup", this.onKeyUp);
    window.addEventListener("blur", this.onBlur);

    this.emitHud();
    this.renderer.setAnimationLoop(this.tick);
  }

  /* ----------------------------- API pública ------------------------------ */

  startMatch(difficulty: Difficulty) {
    this.sfx.unlock();
    this.difficulty = difficulty;
    this.player.wins = 0;
    this.enemy.wins = 0;
    this.player.meter = 0;
    this.enemy.meter = 0;
    this.round = 1;
    this.matchWinner = null;
    this.paused = false;
    this.beginRound();
    this.sfx.bell();
    this.emitHud();
  }

  rematch() {
    this.startMatch(this.difficulty);
  }

  goToMenu() {
    this.status = "menu";
    this.paused = false;
    this.matchWinner = null;
    this.round = 1;
    this.resetFighters();
    this.message = "ARENA NEON";
    this.submessage = "Escolha a dificuldade e entre na arena";
    this.emitHud();
  }

  pause() {
    if (this.status === "menu" || this.status === "matchEnd") return;
    this.paused = true;
    this.queue = [];
    this.emitHud();
  }

  resume() {
    this.paused = false;
    this.clock.getDelta();
    this.emitHud();
  }

  togglePause() {
    if (this.paused) this.resume();
    else this.pause();
  }

  setControl(control: "left" | "right" | "up" | "down" | "block", pressed: boolean) {
    this.held[control] = pressed;
    if (pressed) this.sfx.unlock();
  }

  press(action: "punch" | "kick" | "super" | "jump") {
    this.sfx.unlock();
    if (this.status !== "fight" || this.paused) return;
    if (this.queue.length < 2) this.queue.push(action);
  }

  dispose() {
    this.disposed = true;
    this.renderer.setAnimationLoop(null);
    this.observer.disconnect();
    window.removeEventListener("keydown", this.onKeyDown);
    window.removeEventListener("keyup", this.onKeyUp);
    window.removeEventListener("blur", this.onBlur);
    if (this.resizeRaf) cancelAnimationFrame(this.resizeRaf);
    this.sfx.dispose();
    this.scene.traverse((object) => {
      const mesh = object as THREE.Mesh;
      if (mesh.geometry) mesh.geometry.dispose();
      const material = mesh.material;
      if (Array.isArray(material)) material.forEach((item) => item.dispose());
      else if (material) (material as THREE.Material).dispose();
    });
    this.sparkGeo.dispose();
    this.renderer.dispose();
    if (this.renderer.domElement.parentElement === this.container) {
      this.container.removeChild(this.renderer.domElement);
    }
  }

  /* ------------------------------ Cenário -------------------------------- */

  private buildEnvironment() {
    const hemi = new THREE.HemisphereLight(0x8ab4ff, 0x1a0a24, 1.15);
    this.scene.add(hemi);

    const key = new THREE.DirectionalLight(0xffffff, 2.4);
    key.position.set(4, 9, 6);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    key.shadow.camera.left = -8;
    key.shadow.camera.right = 8;
    key.shadow.camera.top = 8;
    key.shadow.camera.bottom = -8;
    key.shadow.camera.far = 30;
    key.shadow.bias = -0.0012;
    this.scene.add(key);

    const cyan = new THREE.PointLight(0x22d3ee, 45, 18, 2);
    cyan.position.set(-5.5, 2.6, 4);
    this.scene.add(cyan);

    const magenta = new THREE.PointLight(0xf43f5e, 45, 18, 2);
    magenta.position.set(5.5, 2.6, 3.5);
    this.scene.add(magenta);

    const rim = new THREE.DirectionalLight(0x7c3aed, 1.2);
    rim.position.set(-3, 4, -6);
    this.scene.add(rim);
  }

  private buildScenery() {
    const group = new THREE.Group();
    this.scene.add(group);

    // Piso infinito
    const groundMat = new THREE.MeshStandardMaterial({ color: 0x070a16, roughness: 0.75, metalness: 0.4 });
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(80, 80), groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.32;
    ground.receiveShadow = true;
    group.add(ground);

    // Plataforma
    const sideMat = new THREE.MeshStandardMaterial({ color: 0x0b1224, metalness: 0.8, roughness: 0.35 });
    const topMat = new THREE.MeshStandardMaterial({
      map: makeGridTexture(),
      color: 0xffffff,
      metalness: 0.65,
      roughness: 0.32,
    });
    const bottomMat = new THREE.MeshStandardMaterial({ color: 0x090d18 });
    const platform = new THREE.Mesh(new THREE.CylinderGeometry(6.3, 6.0, 0.62, 64), [sideMat, topMat, bottomMat]);
    platform.position.y = -0.31;
    platform.receiveShadow = true;
    group.add(platform);

    // Anéis neon
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x22d3ee, transparent: true, opacity: 0.85 });
    const ring = new THREE.Mesh(new THREE.TorusGeometry(6.18, 0.055, 8, 128), ringMat);
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 0.012;
    group.add(ring);

    const ring2 = new THREE.Mesh(
      new THREE.TorusGeometry(5.45, 0.025, 6, 128),
      new THREE.MeshBasicMaterial({ color: 0x7c3aed, transparent: true, opacity: 0.55 }),
    );
    ring2.rotation.x = -Math.PI / 2;
    ring2.position.y = 0.015;
    group.add(ring2);

    // Halo no centro
    const glow = new THREE.Mesh(
      new THREE.CircleGeometry(2.9, 64),
      new THREE.MeshBasicMaterial({
        color: 0x1e3a8a,
        transparent: true,
        opacity: 0.28,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );
    glow.rotation.x = -Math.PI / 2;
    glow.position.y = 0.02;
    group.add(glow);

    // Pilares ao redor
    const postMat = new THREE.MeshStandardMaterial({ color: 0x0d1526, metalness: 0.7, roughness: 0.4 });
    const stripMat = new THREE.MeshBasicMaterial({ color: 0x22d3ee });
    const stripMat2 = new THREE.MeshBasicMaterial({ color: 0xf43f5e });
    for (let i = 0; i < 10; i += 1) {
      const angle = (i / 10) * Math.PI * 2;
      const post = new THREE.Mesh(new THREE.BoxGeometry(0.32, 3.4, 0.32), postMat);
      post.position.set(Math.cos(angle) * 7.3, 1.55, Math.sin(angle) * 7.3);
      post.castShadow = true;
      group.add(post);
      const strip = new THREE.Mesh(new THREE.BoxGeometry(0.07, 2.6, 0.07), i % 2 ? stripMat2 : stripMat);
      strip.position.set(Math.cos(angle) * 7.13, 1.65, Math.sin(angle) * 7.13);
      group.add(strip);
    }

    // Placar de neon ao fundo
    const sign = new THREE.Mesh(
      new THREE.PlaneGeometry(7.6, 1.9),
      new THREE.MeshBasicMaterial({
        map: makeSignTexture(),
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );
    sign.position.set(0, 4.1, -7.3);
    group.add(sign);

    // Estrelas
    const starCount = 900;
    const positions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i += 1) {
      const radius = 16 + Math.random() * 24;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI * 0.55;
      positions[i * 3] = Math.cos(theta) * radius * Math.cos(phi);
      positions[i * 3 + 1] = 2 + Math.sin(phi) * radius * 0.55;
      positions[i * 3 + 2] = Math.sin(theta) * radius * Math.cos(phi);
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const starField = new THREE.Points(
      starGeo,
      new THREE.PointsMaterial({ color: 0x7dd3fc, size: 0.085, transparent: true, opacity: 0.75, sizeAttenuation: true }),
    );
    group.add(starField);

    // Cristais flutuantes
    const shards: THREE.Mesh[] = [];
    for (let i = 0; i < 9; i += 1) {
      const material = new THREE.MeshStandardMaterial({
        color: i % 2 ? 0x0e7490 : 0x9d174d,
        emissive: i % 2 ? 0x22d3ee : 0xf43f5e,
        emissiveIntensity: 0.55,
        roughness: 0.25,
        metalness: 0.7,
        transparent: true,
        opacity: 0.85,
      });
      const shard = new THREE.Mesh(new THREE.OctahedronGeometry(0.24 + Math.random() * 0.2), material);
      const angle = (i / 9) * Math.PI * 2;
      shard.position.set(Math.cos(angle) * (8.5 + Math.random() * 2), 1.4 + Math.random() * 3.4, Math.sin(angle) * (8.5 + Math.random() * 2));
      shard.userData.spin = 0.2 + Math.random() * 0.5;
      shard.userData.baseY = shard.position.y;
      shard.userData.phase = Math.random() * Math.PI * 2;
      shards.push(shard);
      group.add(shard);
    }

    return { starField, shards, platformRing: ring, floorGlow: glow };
  }

  /* ------------------------------ Combate -------------------------------- */

  private beginRound() {
    this.status = "intro";
    this.introTimer = 2.2;
    this.roundTimer = ROUND_TIME;
    this.roundEndTimer = 0;
    this.matchWinner = null;
    this.combo = 0;
    this.comboTimer = 0;
    this.resetFighters();
    this.player.hp = MAX_HP;
    this.enemy.hp = MAX_HP;
    this.aiThinkTimer = 1.15;
    this.aiBlockTimer = 0;
    this.aiMoveX = 0;
    this.aiMoveZ = 0;
    this.queue = [];
    this.message = `ROUND ${this.round}`;
    this.submessage = this.round === 1 ? "Melhor de 3 rounds" : "Quem vencer leva a luta";
  }

  private resetFighters() {
    for (const fighter of [this.player, this.enemy]) {
      fighter.pos.set(fighter.side === "player" ? -1.6 : 1.6, 0, 0);
      fighter.y = 0;
      fighter.vy = 0;
      fighter.facing = fighter.side === "player" ? 1 : -1;
      fighter.attack = null;
      fighter.hitTimer = 0;
      fighter.ko = false;
      fighter.koTimer = 0;
      fighter.blocking = false;
      fighter.blockHeld = false;
      fighter.moveX = 0;
      fighter.moveZ = 0;
      fighter.flash = 0;
      fighter.root.position.set(fighter.pos.x, 0, 0);
      fighter.rig.body.rotation.set(0, 0, 0);
      fighter.rig.body.position.set(0, 0, 0);
      fighter.root.rotation.y = fighter.facing === 1 ? Math.PI / 2 : -Math.PI / 2;
      fighter.rig.suit.emissiveIntensity = 1;
    }
  }

  private endRound(winner: Side | null, reason: "ko" | "time") {
    if (this.status !== "fight") return;
    this.status = "roundEnd";
    this.roundEndTimer = 3;
    const winnerFighter = winner === "player" ? this.player : winner === "enemy" ? this.enemy : null;
    if (winnerFighter) winnerFighter.wins += 1;
    this.message = reason === "ko" ? "K.O." : "TEMPO ESGOTADO";
    if (winnerFighter) {
      this.submessage = `${winnerFighter.name} venceu o round`;
      if (winnerFighter.wins >= WINS_NEEDED) this.matchWinner = winner;
    } else {
      this.submessage = "Empate — ninguém pontuou";
    }
    this.player.moveX = 0;
    this.player.moveZ = 0;
    this.enemy.moveX = 0;
    this.enemy.moveZ = 0;
    this.player.blocking = false;
    this.enemy.blocking = false;
    if (reason === "ko") this.sfx.ko();
    else this.sfx.bell();
    this.shake = Math.min(1.1, this.shake + 0.5);
    this.emitHud();
  }

  private startAttack(fighter: Fighter, kind: AttackKind) {
    if (fighter.attack || fighter.hitTimer > 0 || fighter.ko || fighter.y > 0.25) return;
    if (kind === "super") {
      if (fighter.meter < 100) return;
      fighter.meter = 0;
      this.sfx.superCharge();
      this.timeScaleTarget = 0.32;
      this.zoom = -1.15;
      this.shake = Math.max(this.shake, 0.35);
    } else if (kind === "punch") {
      this.sfx.whoosh();
    } else {
      this.sfx.whoosh();
    }
    fighter.attack = { kind, t: 0, hitDone: false };
    fighter.blocking = false;
  }

  private inRange(attacker: Fighter, target: Fighter, reach: number) {
    const dx = (target.pos.x - attacker.pos.x) * attacker.facing;
    const dz = Math.abs(target.pos.z - attacker.pos.z);
    if (dx <= 0 || dx > reach || dz > (attacker.attack?.kind === "super" ? 1 : 0.7)) return false;
    // Chute e soco acertam o corpo; no ar o alvo escapa dos golpes baixos.
    if (target.y > 1.05) return false;
    return true;
  }

  private applyHit(attacker: Fighter, target: Fighter, kind: AttackKind) {
    const def = ATTACKS[kind];
    const blocked = target.blocking && !target.attack && target.y < 0.3;
    const multiplier = attacker.side === "enemy" ? DIFFICULTY[this.difficulty].damage : 1;
    const damage = def.damage * multiplier * (blocked ? 0.18 : 1);

    target.hp = Math.max(0, target.hp - damage);
    target.hitTimer = blocked ? 0.14 : kind === "super" ? 0.85 : kind === "kick" ? 0.45 : 0.3;
    target.attack = null;
    target.flash = 1;
    target.meter = Math.min(100, target.meter + (blocked ? 3 : 7));
    attacker.meter = Math.min(100, attacker.meter + (blocked ? 1 : kind === "super" ? 0 : 8));
    target.pos.x += attacker.facing * def.knockback * (blocked ? 0.4 : 1);
    target.pos.x = THREE.MathUtils.clamp(target.pos.x, -BOUND_X, BOUND_X);

    this.shake = Math.min(1.2, this.shake + def.shake * (blocked ? 0.4 : 1));
    this.hitLight.position.set((attacker.pos.x + target.pos.x) / 2, 1.35, 0.4);
    this.hitLight.intensity = blocked ? 8 : kind === "super" ? 60 : 26;

    if (!blocked) {
      this.spawnSpark(
        (attacker.pos.x + target.pos.x) / 2,
        1.2 + Math.random() * 0.25,
        target.pos.z,
        kind === "super" ? 0xfff1a8 : attacker.side === "player" ? 0x67e8f9 : 0xfda4af,
        kind !== "punch",
      );
    } else {
      this.spawnSpark((attacker.pos.x + target.pos.x) / 2, 1.3, target.pos.z, 0xa5f3fc, false);
    }

    if (kind === "super") this.sfx.superHit();
    else if (kind === "kick") this.sfx.kick();
    else this.sfx.punch();
    if (blocked) this.sfx.block();

    this.impactTarget = target.side;
    this.impactKind = blocked ? "block" : "hit";
    this.lastImpact += 1;

    if (attacker.side === "player" && !blocked) {
      this.combo = this.comboTimer > 0 ? this.combo + 1 : 1;
      this.comboTimer = 1.4;
    }

    this.emitHud();

    if (target.hp <= 0 && !target.ko) {
      target.ko = true;
      target.koTimer = 0;
      target.attack = null;
      this.endRound(attacker.side, "ko");
    }
  }

  private updateAttack(fighter: Fighter, target: Fighter, dt: number) {
    const attack = fighter.attack;
    if (!attack) return;
    const def = ATTACKS[attack.kind];
    attack.t += dt;
    if (!attack.hitDone && attack.t >= def.startup && attack.t <= def.startup + def.active) {
      if (this.inRange(fighter, target, def.reach)) {
        attack.hitDone = true;
        this.applyHit(fighter, target, attack.kind);
      }
    }
    const total = def.startup + def.active + def.recovery;
    if (attack.t >= total) {
      fighter.attack = null;
      if (attack.kind === "super") this.timeScaleTarget = 1;
    }
  }

  private stepFighter(fighter: Fighter, dt: number) {
    if (fighter.ko) {
      fighter.koTimer += dt;
      fighter.moveX = 0;
      fighter.moveZ = 0;
      return;
    }
    if (fighter.hitTimer > 0) fighter.hitTimer = Math.max(0, fighter.hitTimer - dt);

    const config = DIFFICULTY[this.difficulty];
    let speed = fighter.side === "player" ? 3.5 : config.speed;
    if (fighter.blocking) speed *= 0.42;
    if (fighter.attack) speed *= 0.12;
    if (fighter.hitTimer > 0) speed = 0;

    const canMove = this.status === "fight" && !this.paused;
    if (canMove) {
      fighter.pos.x += fighter.moveX * speed * dt;
      fighter.pos.z += fighter.moveZ * speed * dt * 0.8;
      if (Math.abs(fighter.moveX) + Math.abs(fighter.moveZ) > 0.05) {
        fighter.walkPhase += dt * (fighter.side === "player" ? 8.5 : config.speed * 2.8);
      }
    }

    // Salto
    if (fighter.y > 0 || fighter.vy !== 0) {
      fighter.vy -= 15 * dt;
      fighter.y += fighter.vy * dt;
      if (fighter.y <= 0) {
        fighter.y = 0;
        fighter.vy = 0;
      }
    }

    fighter.pos.x = THREE.MathUtils.clamp(fighter.pos.x, -BOUND_X, BOUND_X);
    fighter.pos.z = THREE.MathUtils.clamp(fighter.pos.z, -BOUND_Z, BOUND_Z);
  }

  private separateFighters() {
    const dx = this.enemy.pos.x - this.player.pos.x;
    if (Math.abs(dx) < MIN_DIST) {
      const push = (MIN_DIST - Math.abs(dx)) / 2;
      const dir = dx >= 0 ? 1 : -1;
      this.player.pos.x -= push * dir;
      this.enemy.pos.x += push * dir;
      this.player.pos.x = THREE.MathUtils.clamp(this.player.pos.x, -BOUND_X, BOUND_X);
      this.enemy.pos.x = THREE.MathUtils.clamp(this.enemy.pos.x, -BOUND_X, BOUND_X);
    }
    this.player.facing = this.enemy.pos.x >= this.player.pos.x ? 1 : -1;
    this.enemy.facing = this.player.pos.x <= this.enemy.pos.x ? 1 : -1;
  }

  /* --------------------------------- IA ---------------------------------- */

  private updateAi(dt: number) {
    const enemy = this.enemy;
    const player = this.player;
    const config = DIFFICULTY[this.difficulty];

    enemy.blockHeld = false;
    this.aiMoveX = 0;
    this.aiMoveZ = 0;

    if (this.status !== "fight" || enemy.ko || enemy.hitTimer > 0) return;
    if (enemy.attack) return;

    const dist = Math.abs(player.pos.x - enemy.pos.x);

    if (this.aiBlockTimer > 0) {
      this.aiBlockTimer -= dt;
      enemy.blockHeld = true;
      return;
    }

    // Reação a golpe vindo do jogador
    if (player.attack && !player.attack.hitDone && dist < 2.5 && Math.random() < config.block * dt * 9) {
      this.aiBlockTimer = 0.32;
      this.aiThinkTimer = Math.max(this.aiThinkTimer, 0.2);
      return;
    }

    this.aiThinkTimer -= dt;
    if (this.aiThinkTimer > 0) {
      this.aiMoveX = this.aiMoveX || 0;
      return;
    }

    this.aiThinkTimer = config.minThink + Math.random() * (config.maxThink - config.minThink);

    if (enemy.meter >= 100 && dist < 2.4 && Math.random() < 0.45) {
      this.startAttack(enemy, "super");
      return;
    }

    if (dist > 3) {
      this.aiMoveX = 1;
      if (Math.random() < 0.18) {
        enemy.vy = 4.7;
        enemy.y = 0.01;
        this.sfx.jump();
      }
      if (Math.random() < 0.25) this.aiMoveZ = Math.random() < 0.5 ? -1 : 1;
    } else if (dist > 1.75) {
      if (Math.random() < config.aggression) {
        this.startAttack(enemy, "kick");
      } else {
        this.aiMoveX = 1;
        if (Math.random() < 0.3) this.aiMoveZ = Math.random() < 0.5 ? -1 : 1;
      }
    } else if (dist > 1.15) {
      const roll = Math.random();
      if (roll < config.aggression * 0.7) this.startAttack(enemy, "kick");
      else if (roll < config.aggression) this.startAttack(enemy, "punch");
      else this.aiMoveX = roll < 0.9 ? -1 : 1;
    } else {
      const roll = Math.random();
      if (roll < config.aggression) this.startAttack(enemy, "punch");
      else if (roll < config.aggression + 0.12) this.startAttack(enemy, "kick");
      else this.aiMoveX = -1;
      if (Math.random() < 0.2) this.aiBlockTimer = 0.25;
    }

    if (Math.random() < 0.25) this.aiZTarget = (Math.random() - 0.5) * 2;
    if (Math.abs(enemy.pos.z - this.aiZTarget) > 0.15) {
      this.aiMoveZ = enemy.pos.z > this.aiZTarget ? -1 : 1;
    }
  }

  /* ------------------------------ Simulação ------------------------------- */

  private simulate(dt: number) {
    // Tempo global dos efeitos e animações de palco
    this.elapsed += dt;

    if (this.status === "intro") {
      this.introTimer -= dt;
      if (this.introTimer <= 0.85 && this.introTimer > 0) {
        this.message = "LUTE!";
        this.submessage = "Boa sorte";
      }
      if (this.introTimer <= 0) {
        this.status = "fight";
        this.roundTimer = ROUND_TIME;
        this.message = "";
        this.submessage = "";
        this.sfx.bell();
        this.emitHud();
      }
    } else if (this.status === "fight") {
      this.roundTimer = Math.max(0, this.roundTimer - dt);

      // Entrada do jogador
      const player = this.player;
      player.moveX = (this.held.right ? 1 : 0) - (this.held.left ? 1 : 0);
      player.moveZ = (this.held.down ? 1 : 0) - (this.held.up ? 1 : 0);
      player.blockHeld = this.held.block;
      player.blocking = player.blockHeld && !player.attack && player.hitTimer <= 0 && !player.ko && player.y <= 0.05;

      while (this.queue.length > 0) {
        const action = this.queue.shift();
        if (!action) break;
        if (action === "jump") {
          if (player.y <= 0.01 && !player.attack) {
            player.vy = 4.9;
            player.y = 0.01;
            this.sfx.jump();
          }
        } else {
          this.startAttack(player, action);
        }
      }

      this.updateAi(dt);
      const enemy = this.enemy;
      enemy.moveX = this.aiMoveX;
      enemy.moveZ = this.aiMoveZ;
      enemy.blockHeld = enemy.blockHeld || this.aiBlockTimer > 0;
      enemy.blocking = enemy.blockHeld && !enemy.attack && enemy.hitTimer <= 0 && !enemy.ko && enemy.y <= 0.05;

      this.stepFighter(player, dt);
      this.stepFighter(enemy, dt);
      this.separateFighters();

      this.updateAttack(player, enemy, dt);
      this.updateAttack(enemy, player, dt);

      if (this.comboTimer > 0) {
        this.comboTimer -= dt;
        if (this.comboTimer <= 0) this.combo = 0;
      }

      if (this.roundTimer <= 0) {
        const playerHp = this.player.hp;
        const enemyHp = this.enemy.hp;
        this.endRound(playerHp === enemyHp ? null : playerHp > enemyHp ? "player" : "enemy", "time");
      }
    } else if (this.status === "roundEnd") {
      this.roundEndTimer -= dt;
      this.player.moveX = 0;
      this.player.moveZ = 0;
      this.enemy.moveX = 0;
      this.enemy.moveZ = 0;
      this.player.blocking = false;
      this.enemy.blocking = false;
      this.stepFighter(this.player, dt);
      this.stepFighter(this.enemy, dt);
      if (this.roundEndTimer <= 0) {
        if (this.matchWinner) {
          this.status = "matchEnd";
          this.message = this.matchWinner === "player" ? "VITÓRIA!" : "DERROTA";
          this.submessage =
            this.matchWinner === "player"
              ? "Você dominou a arena neon"
              : "VEX levou a melhor desta vez";
          this.emitHud();
        } else {
          this.round += 1;
          this.beginRound();
          this.sfx.bell();
          this.emitHud();
        }
      }
    }

    // Efeitos
    this.shake = Math.max(0, this.shake - dt * 2.4);
    this.timeScale = THREE.MathUtils.damp(this.timeScale, this.timeScaleTarget, 8, dt);
    if (!this.player.attack && !this.enemy.attack) this.timeScaleTarget = 1;
    this.zoom = THREE.MathUtils.damp(this.zoom, this.player.attack?.kind === "super" || this.enemy.attack?.kind === "super" ? -0.9 : 0, 4, dt);
    this.hitLight.intensity = THREE.MathUtils.damp(this.hitLight.intensity, 0, 12, dt);

    this.updateSparks(dt);
    this.updateStage(dt);
  }

  private updateStage(dt: number) {
    const time = this.elapsed;
    this.floorGlow.scale.setScalar(1 + Math.sin(time * 1.6) * 0.05);
    (this.platformRing.material as THREE.MeshBasicMaterial).opacity = 0.65 + Math.sin(time * 2.2) * 0.2;
    this.starField.rotation.y += dt * 0.008;
    for (const shard of this.shards) {
      shard.rotation.x += dt * (shard.userData.spin as number);
      shard.rotation.y += dt * (shard.userData.spin as number) * 0.7;
      shard.position.y = (shard.userData.baseY as number) + Math.sin(time * 0.9 + (shard.userData.phase as number)) * 0.25;
    }
  }

  private spawnSpark(x: number, y: number, z: number, color: number, big: boolean) {
    const material = new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 1,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const mesh = new THREE.Mesh(this.sparkGeo, material);
    mesh.position.set(x, y, z);
    mesh.scale.setScalar(big ? 0.55 : 0.32);
    mesh.quaternion.copy(this.camera.quaternion);
    this.scene.add(mesh);
    this.sparks.push({ mesh, life: 0, max: big ? 0.42 : 0.28, grow: big ? 3.4 : 2.4 });
    if (this.sparks.length > 14) {
      const old = this.sparks.shift();
      if (old) this.removeSpark(old);
    }
  }

  private removeSpark(spark: Spark) {
    this.scene.remove(spark.mesh);
    (spark.mesh.material as THREE.Material).dispose();
  }

  private updateSparks(dt: number) {
    for (let i = this.sparks.length - 1; i >= 0; i -= 1) {
      const spark = this.sparks[i];
      spark.life += dt;
      const k = Math.min(1, spark.life / spark.max);
      spark.mesh.scale.setScalar((spark.mesh.scale.x || 0.3) * (1 + dt * 4) + 0.0001);
      (spark.mesh.material as THREE.MeshBasicMaterial).opacity = 1 - k;
      spark.mesh.quaternion.copy(this.camera.quaternion);
      if (k >= 1) {
        this.removeSpark(spark);
        this.sparks.splice(i, 1);
      }
    }
  }

  /* ------------------------------ Visual --------------------------------- */

  private updateFighterVisual(fighter: Fighter, dt: number) {
    const rig = fighter.rig;
    const elapsed = this.elapsed;
    const speed = Math.min(1.4, Math.abs(fighter.moveX) + Math.abs(fighter.moveZ));

    let bob = Math.sin(elapsed * 2.1 + (fighter.side === "player" ? 0 : 1.4)) * 0.012;
    let pitch = 0;
    let roll = 0;

    let shLx = -0.72;
    let shLz = -0.16;
    let elLx = -1.95;
    let shRx = -0.95;
    let shRz = 0.2;
    let elRx = -1.9;
    let hipLx = 0.04;
    let hipRx = -0.04;
    let kneeLx = 0.28;
    let kneeRx = 0.28;

    if (this.status === "menu") {
      // Demonstração: pequenos passos de guarda
      const sway = Math.sin(elapsed * 0.9 + (fighter.side === "player" ? 0 : 2)) * 0.5;
      hipLx = 0.06 + sway * 0.1;
      hipRx = -0.06 - sway * 0.1;
      bob = Math.sin(elapsed * 1.6) * 0.02;
    } else if (fighter.ko) {
      const k = Math.min(1, fighter.koTimer / 0.75);
      const ease = 1 - Math.pow(1 - k, 3);
      pitch = -1.4 * ease;
      bob = -0.08 * ease;
      shLx = -2.4;
      shRx = -2.3;
      elLx = -0.4;
      elRx = -0.5;
      hipLx = -0.25;
      hipRx = -0.15;
      kneeLx = 0.7;
      kneeRx = 0.5;
    } else if (fighter.y > 0.03) {
      // No ar
      hipLx = -0.6;
      hipRx = -0.35;
      kneeLx = 1.1;
      kneeRx = 0.85;
      shLx = -1.4;
      shLz = -0.5;
      shRx = -1.5;
      shRz = 0.5;
      bob = 0;
    } else if (fighter.hitTimer > 0) {
      const strength = Math.min(1, fighter.hitTimer / 0.3);
      pitch = -0.32 * strength;
      shLx = -1.5;
      shLz = -0.55;
      elLx = -0.8;
      shRx = -1.35;
      shRz = 0.5;
      elRx = -0.9;
      kneeLx = 0.45;
      kneeRx = 0.45;
      bob = -0.02 * strength;
    } else if (fighter.blocking) {
      shLx = -1.28;
      shLz = -0.52;
      elLx = -1.95;
      shRx = -1.42;
      shRz = 0.52;
      elRx = -1.8;
      pitch = 0.12;
      kneeLx = 0.5;
      kneeRx = 0.5;
      bob = -0.035;
    } else if (fighter.attack) {
      const attack = fighter.attack;
      const def = ATTACKS[attack.kind];
      const total = def.startup + def.active + def.recovery;
      const t = Math.min(1, attack.t / total);
      const wind = Math.min(1, attack.t / Math.max(0.001, def.startup));
      const retract = Math.min(1, Math.max(0, (attack.t - def.startup - def.active) / Math.max(0.001, def.recovery)));
      const ext = Math.max(0, wind * (1 - retract));

      if (attack.kind === "punch") {
        shRx = THREE.MathUtils.lerp(-0.95, -1.62, ext);
        shRz = THREE.MathUtils.lerp(0.2, 0.05, ext);
        elRx = THREE.MathUtils.lerp(-1.9, -0.04, ext);
        pitch = -0.1 * ext;
        bob = -0.01 * ext;
        hipLx = 0.1 + 0.1 * t;
      } else if (attack.kind === "kick") {
        hipRx = THREE.MathUtils.lerp(-0.04, -1.62, ext);
        kneeRx = THREE.MathUtils.lerp(0.55, 0.06, ext);
        hipLx = 0.14;
        kneeLx = 0.42;
        pitch = -0.24 * ext;
        bob = -0.02;
        shLx = -1.15;
        shRx = -0.5;
      } else {
        const burst = Math.min(1, attack.t / (def.startup + def.active));
        shLx = THREE.MathUtils.lerp(-0.72, -1.86, burst);
        elLx = THREE.MathUtils.lerp(-1.95, -0.06, burst);
        shRx = THREE.MathUtils.lerp(-0.95, -1.9, burst);
        elRx = THREE.MathUtils.lerp(-1.9, -0.05, burst);
        shLz = -0.3;
        shRz = 0.3;
        pitch = -0.3 * burst;
        bob = 0.06 * burst;
        kneeLx = 0.5;
        kneeRx = 0.5;
        hipLx = -0.15 * burst;
        hipRx = -0.2 * burst;
      }
    } else if (speed > 0.05) {
      const s = Math.sin(fighter.walkPhase);
      const c = Math.cos(fighter.walkPhase);
      hipLx = s * 0.62;
      hipRx = -s * 0.62;
      kneeLx = 0.3 + Math.max(0, -s) * 0.55;
      kneeRx = 0.3 + Math.max(0, s) * 0.55;
      bob = Math.abs(c) * 0.035;
      shLx = -0.72 + s * 0.18;
      shRx = -0.95 - s * 0.18;
      roll = -fighter.moveZ * 0.08;
      pitch = fighter.moveX !== 0 ? 0.05 : 0;
    } else {
      bob = Math.sin(elapsed * 2.1 + (fighter.side === "player" ? 0 : 1.4)) * 0.014;
      shLx = -0.72 + Math.sin(elapsed * 2.1) * 0.02;
      shRx = -0.95 - Math.sin(elapsed * 2.1) * 0.02;
    }

    const fast = fighter.attack || fighter.ko || fighter.hitTimer > 0 ? 22 : 13;
    rig.body.position.y = THREE.MathUtils.damp(rig.body.position.y, bob, 12, dt);
    rig.body.rotation.x = THREE.MathUtils.damp(rig.body.rotation.x, pitch, fast, dt);
    rig.body.rotation.z = THREE.MathUtils.damp(rig.body.rotation.z, roll, 10, dt);

    rig.shoulderL.rotation.x = THREE.MathUtils.damp(rig.shoulderL.rotation.x, shLx, fast, dt);
    rig.shoulderL.rotation.z = THREE.MathUtils.damp(rig.shoulderL.rotation.z, shLz, fast, dt);
    rig.elbowL.rotation.x = THREE.MathUtils.damp(rig.elbowL.rotation.x, elLx, fast, dt);
    rig.shoulderR.rotation.x = THREE.MathUtils.damp(rig.shoulderR.rotation.x, shRx, fast, dt);
    rig.shoulderR.rotation.z = THREE.MathUtils.damp(rig.shoulderR.rotation.z, shRz, fast, dt);
    rig.elbowR.rotation.x = THREE.MathUtils.damp(rig.elbowR.rotation.x, elRx, fast, dt);

    rig.hipL.rotation.x = THREE.MathUtils.damp(rig.hipL.rotation.x, hipLx, 18, dt);
    rig.hipR.rotation.x = THREE.MathUtils.damp(rig.hipR.rotation.x, hipRx, 18, dt);
    rig.kneeL.rotation.x = THREE.MathUtils.damp(rig.kneeL.rotation.x, kneeLx, 18, dt);
    rig.kneeR.rotation.x = THREE.MathUtils.damp(rig.kneeR.rotation.x, kneeRx, 18, dt);

    rig.head.rotation.x = THREE.MathUtils.damp(rig.head.rotation.x, pitch * 0.35, 10, dt);

    // Flash ao levar golpe
    fighter.flash = Math.max(0, fighter.flash - dt * 4.5);
    rig.suit.emissiveIntensity = 1 + fighter.flash * 5;
    rig.trim.emissiveIntensity = 1.8 + fighter.flash * 3;

    // Posição / orientação
    fighter.root.position.set(fighter.pos.x, fighter.y, fighter.pos.z);
    const targetRotation = fighter.facing === 1 ? Math.PI / 2 : -Math.PI / 2;
    fighter.root.rotation.y = THREE.MathUtils.damp(fighter.root.rotation.y, targetRotation, 12, dt);
  }

  private updateCamera(dt: number) {
    if (this.status === "menu") {
      const t = this.elapsed * 0.18;
      this.camX = THREE.MathUtils.damp(this.camX, Math.sin(t) * 2.4, 2, dt);
      this.camera.position.set(this.camX, 2.5 + Math.sin(t * 0.7) * 0.2, 8.6);
      this.camera.lookAt(0, 1.15, 0);
      this.camera.fov = THREE.MathUtils.damp(this.camera.fov, 42, 3, dt);
      this.camera.updateProjectionMatrix();
      return;
    }

    const midX = (this.player.pos.x + this.enemy.pos.x) / 2;
    const targetX = THREE.MathUtils.clamp(midX * 0.42, -1.6, 1.6);
    this.camX = THREE.MathUtils.damp(this.camX, targetX, 4, dt);
    const shakeX = (Math.random() - 0.5) * this.shake * 0.22;
    const shakeY = (Math.random() - 0.5) * this.shake * 0.16;
    const zoom = 9.4 + this.zoom;

    this.camera.position.set(this.camX + shakeX, 2.65 + shakeY, zoom);
    this.camera.lookAt(midX * 0.5 + shakeX * 0.5, 1.08 + shakeY, 0);
    this.camera.fov = THREE.MathUtils.damp(this.camera.fov, 40 + Math.abs(this.zoom) * 8, 4, dt);
    this.camera.updateProjectionMatrix();
  }

  /* --------------------------------- Loop -------------------------------- */

  private tick = () => {
    if (this.disposed) return;
    const rawDt = Math.min(this.clock.getDelta(), 0.05);
    if (!this.paused) {
      // O slow motion da super só acelera a simulação; animações de palco seguem o tempo real
      this.simulate(rawDt * this.timeScale);
      this.updateFighterVisual(this.player, rawDt * this.timeScale);
      this.updateFighterVisual(this.enemy, rawDt * this.timeScale);
      this.updateCamera(rawDt);
    }
    this.renderer.render(this.scene, this.camera);

    this.hudTimer += rawDt;
    if (this.hudTimer >= 0.09) {
      this.hudTimer = 0;
      this.emitHud();
    }
  };

  public resize() {
    if (this.disposed) return;
    if (this.resizeRaf) cancelAnimationFrame(this.resizeRaf);
    this.resizeRaf = requestAnimationFrame(() => {
      const width = this.container.clientWidth;
      const height = this.container.clientHeight;
      if (width <= 0 || height <= 0) return;
      this.renderer.setSize(width, height, false);
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
    });
  }

  /* ------------------------------- Teclado -------------------------------- */

  public onKeyDown = (event: KeyboardEvent) => {
    const target = event.target as HTMLElement | null;
    if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)) return;
    if (event.ctrlKey || event.metaKey || event.altKey) return;

    const code = event.code;
    let handled = true;

    switch (code) {
      case "ArrowLeft":
      case "KeyA":
        this.held.left = true;
        break;
      case "ArrowRight":
      case "KeyD":
        this.held.right = true;
        break;
      case "ArrowUp":
      case "KeyW":
        this.held.up = true;
        break;
      case "ArrowDown":
      case "KeyS":
        this.held.down = true;
        break;
      case "KeyL":
      case "KeyC":
      case "ShiftLeft":
      case "ShiftRight":
        this.held.block = true;
        break;
      case "KeyJ":
      case "KeyZ":
        if (!event.repeat) this.press("punch");
        break;
      case "KeyK":
      case "KeyX":
        if (!event.repeat) this.press("kick");
        break;
      case "KeyU":
        if (!event.repeat) this.press("super");
        break;
      case "Space":
        if (!event.repeat) this.press("jump");
        break;
      case "KeyP":
      case "Escape":
        if (!event.repeat) this.togglePause();
        break;
      case "Enter":
        if (this.status === "matchEnd" && !event.repeat) this.rematch();
        break;
      default:
        handled = false;
    }

    if (handled) event.preventDefault();
  };

  public onKeyUp = (event: KeyboardEvent) => {
    switch (event.code) {
      case "ArrowLeft":
      case "KeyA":
        this.held.left = false;
        break;
      case "ArrowRight":
      case "KeyD":
        this.held.right = false;
        break;
      case "ArrowUp":
      case "KeyW":
        this.held.up = false;
        break;
      case "ArrowDown":
      case "KeyS":
        this.held.down = false;
        break;
      case "KeyL":
      case "KeyC":
      case "ShiftLeft":
      case "ShiftRight":
        this.held.block = false;
        break;
      default:
        break;
    }
  };

  private onBlur = () => {
    this.held = { left: false, right: false, up: false, down: false, block: false };
  };

  /* --------------------------------- HUD ---------------------------------- */

  private emitHud() {
    this.callbacks.onHud({
      status: this.status,
      paused: this.paused,
      difficulty: this.difficulty,
      round: this.round,
      timer: Math.max(0, Math.ceil(this.roundTimer)),
      message: this.message,
      submessage: this.submessage,
      combo: this.combo,
      matchWinner: this.matchWinner,
      player: { hp: this.player.hp, maxHp: MAX_HP, meter: this.player.meter, wins: this.player.wins },
      enemy: { hp: this.enemy.hp, maxHp: MAX_HP, meter: this.enemy.meter, wins: this.enemy.wins },
      impact: this.lastImpact,
      impactTarget: this.impactTarget,
      impactKind: this.impactKind,
    });
  }
}

/* ---------------------------- Texturas geradas ---------------------------- */

function makeGridTexture(): THREE.Texture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.Texture();
  ctx.fillStyle = "#070b16";
  ctx.fillRect(0, 0, 512, 512);
  ctx.strokeStyle = "rgba(34, 211, 238, 0.16)";
  ctx.lineWidth = 2;
  for (let i = 0; i <= 512; i += 64) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, 512);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(512, i);
    ctx.stroke();
  }
  ctx.strokeStyle = "rgba(124, 58, 237, 0.35)";
  for (let i = 0; i <= 512; i += 256) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, 512);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(512, i);
    ctx.stroke();
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2.5, 2.5);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

function makeSignTexture(): THREE.Texture {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.Texture();
  ctx.clearRect(0, 0, 1024, 256);

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = "900 132px 'Arial Black', Impact, sans-serif";
  ctx.shadowColor = "#22d3ee";
  ctx.shadowBlur = 36;
  ctx.fillStyle = "#a5f3fc";
  ctx.fillText("NEON", 330, 128);
  ctx.shadowColor = "#f43f5e";
  ctx.fillStyle = "#fecdd3";
  ctx.fillText("FIST", 700, 128);

  ctx.shadowBlur = 0;
  ctx.font = "700 34px 'Segoe UI', sans-serif";
  ctx.fillStyle = "rgba(196, 181, 253, 0.9)";
  ctx.letterSpacing = "14px";
  ctx.fillText("ARENA  ·  3D", 512, 218);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}
