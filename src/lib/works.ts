export const LINE_IDS = [
  "press",
  "booth",
  "marquee",
  "sprites",
  "gazette",
  "spotlight",
] as const;

export type LineId = (typeof LINE_IDS)[number];

export const STAGES = [
  { id: "intake", label: "Intake", ms: 2200 },
  { id: "draft", label: "Draft", ms: 2800 },
  { id: "make", label: "Make", ms: 3600 },
  { id: "pack", label: "Pack", ms: 1800 },
] as const;

export type StageIndex = 0 | 1 | 2 | 3;

type StageLine = (brief: string) => string;

export type LineDef = {
  id: LineId;
  name: string;
  agent: string;
  role: string;
  blurb: string;
  sample: string;
  placeholder: string;
  colors: {
    wall: string;
    floor: string;
    board: string;
    trim: string;
    parcel: string;
    hair: string;
    cloth: string;
    skin: string;
  };
  stageLines: [StageLine, StageLine, StageLine, StageLine];
};

const clip = (brief: string) => {
  const clean = brief.replace(/\s+/g, " ").trim();
  return clean.length > 42 ? `${clean.slice(0, 40)}…` : clean;
};

export const LINES: LineDef[] = [
  {
    id: "press",
    name: "Press",
    agent: "Nia",
    role: "Print goods",
    blurb: "Towels, cards, and small editions. The sheet hits the belt when the ink is dry.",
    sample: "linen tea towels, indigo stripe, sold in pairs",
    placeholder: "linen tea towels, indigo stripe, sold in pairs",
    colors: {
      wall: "#6d4630",
      floor: "#c9a36e",
      board: "#b08a58",
      trim: "#3e2618",
      parcel: "#e07a3d",
      hair: "#2b2118",
      cloth: "#c4552a",
      skin: "#e0b08a",
    },
    stageLines: [
      (b) => `Nia unrolls “${clip(b)}” on the bench.`,
      () => "Nia checks the repeat and mixes the dye.",
      () => "Nia runs a sheet through the press.",
      () => "Nia trims, tags, and slides it toward the dock.",
    ],
  },
  {
    id: "booth",
    name: "Booth",
    agent: "Sol",
    role: "Music sketches",
    blurb: "A short loop: kick, hat, and a bass line you can play back.",
    sample: "night train in a minor key, unhurried",
    placeholder: "night train in a minor key, unhurried",
    colors: {
      wall: "#3c4a78",
      floor: "#9aa3c4",
      board: "#848eb3",
      trim: "#232a48",
      parcel: "#7aa2ff",
      hair: "#1c2438",
      cloth: "#3d6adf",
      skin: "#f0c2a0",
    },
    stageLines: [
      (b) => `Sol listens to “${clip(b)}” and counts a tempo.`,
      () => "Sol sketches a bass figure on the keys.",
      () => "Sol records kick, hat, and the line.",
      () => "Sol bounces the loop and labels the tape.",
    ],
  },
  {
    id: "marquee",
    name: "Marquee",
    agent: "Remy",
    role: "Title frames",
    blurb: "One bold frame for a film, a firing, or a shop window.",
    sample: "dusk firing at the kiln, bold type",
    placeholder: "dusk firing at the kiln, bold type",
    colors: {
      wall: "#7a3148",
      floor: "#e0b2b4",
      board: "#d09aa0",
      trim: "#4a1c2c",
      parcel: "#ff6b8a",
      hair: "#f2d48a",
      cloth: "#a32048",
      skin: "#f3c7a4",
    },
    stageLines: [
      (b) => `Remy pins “${clip(b)}” above the light table.`,
      () => "Remy blocks the type and picks a second color.",
      () => "Remy paints the frame.",
      () => "Remy mats it and walks it to the dock.",
    ],
  },
  {
    id: "sprites",
    name: "Sprite bay",
    agent: "Pix",
    role: "Game bits",
    blurb: "A bundle of six little characters, drawn pixel by pixel.",
    sample: "market-stall creatures, six of them",
    placeholder: "market-stall creatures, six of them",
    colors: {
      wall: "#2d6a4e",
      floor: "#a9c8a2",
      board: "#93b48c",
      trim: "#1b3d2c",
      parcel: "#5dca8a",
      hair: "#173024",
      cloth: "#1f8a4c",
      skin: "#f0c8a4",
    },
    stageLines: [
      (b) => `Pix reads “${clip(b)}” and blocks out six poses.`,
      () => "Pix lays in silhouettes and a shared palette.",
      () => "Pix draws eyes, feet, and the odd hat.",
      () => "Pix packs the sheet and sends the bundle down.",
    ],
  },
  {
    id: "gazette",
    name: "Gazette",
    agent: "June",
    role: "The weekly",
    blurb: "A short issue: a headline, a dek, and three notes from the floor.",
    sample: "the week the indigo ran short",
    placeholder: "the week the indigo ran short",
    colors: {
      wall: "#8a6232",
      floor: "#ead7a8",
      board: "#dcc48e",
      trim: "#4e3518",
      parcel: "#f0d078",
      hair: "#6b3a28",
      cloth: "#8c4e2a",
      skin: "#efc3a0",
    },
    stageLines: [
      (b) => `June circles “${clip(b)}” in the notebook.`,
      () => "June drafts the headline and cuts a paragraph.",
      () => "June sets the issue in type.",
      () => "June folds a copy for the dock.",
    ],
  },
  {
    id: "spotlight",
    name: "Spotlight",
    agent: "Hart",
    role: "Short notices",
    blurb: "Three captions and a four-frame storyboard for something you want seen.",
    sample: "three notes about the dusk firing",
    placeholder: "three notes about the dusk firing",
    colors: {
      wall: "#5c3d78",
      floor: "#cbb6dc",
      board: "#b9a2ce",
      trim: "#322044",
      parcel: "#d0a0ff",
      hair: "#241628",
      cloth: "#7a45a8",
      skin: "#f0c6aa",
    },
    stageLines: [
      (b) => `Hart frames “${clip(b)}” as three notices.`,
      () => "Hart writes the captions out loud.",
      () => "Hart blocks four frames on the board.",
      () => "Hart clips the set and lays it on the dock.",
    ],
  },
];

export function lineById(id: LineId): LineDef {
  const line = LINES.find((item) => item.id === id);
  if (!line) throw new Error(`Unknown line ${id}`);
  return line;
}

export type PressArtifact = {
  kind: "press";
  title: string;
  price: number;
  edition: string;
  materials: string;
  blurb: string;
  motif: "stripe" | "dot" | "block" | "ring";
  colors: [string, string, string];
};

export type BoothArtifact = {
  kind: "booth";
  title: string;
  bpm: number;
  keyName: string;
  root: number;
  kicks: boolean[];
  hats: boolean[];
  bass: number[];
};

export type MarqueeArtifact = {
  kind: "marquee";
  title: string;
  kicker: string;
  headline: string;
  sub: string;
  colors: [string, string, string];
};

export type SpriteSheet = { pixels: number[][]; palette: string[] };

export type SpriteArtifact = {
  kind: "sprites";
  title: string;
  note: string;
  sprites: SpriteSheet[];
};

export type GazetteArtifact = {
  kind: "gazette";
  title: string;
  issue: string;
  headline: string;
  dek: string;
  sections: { hed: string; body: string }[];
};

export type SpotlightArtifact = {
  kind: "spotlight";
  title: string;
  posts: { where: string; text: string }[];
  frames: { label: string; color: string }[];
};

export type Artifact =
  | PressArtifact
  | BoothArtifact
  | MarqueeArtifact
  | SpriteArtifact
  | GazetteArtifact
  | SpotlightArtifact;

export type Job = {
  id: string;
  lineId: LineId;
  brief: string;
  stageIndex: StageIndex;
  /** Set while the stage timer is running. */
  stageStartedAt: number | null;
  /** Set while the line or the floor is holding, so the stage can resume. */
  frozenElapsed: number | null;
  createdAt: number;
  fault?: string;
};

export type Piece = {
  id: string;
  lineId: LineId;
  brief: string;
  finishedAt: number;
  artifact: Artifact;
};

export type LogEntry = {
  id: string;
  at: number;
  lineId: LineId;
  text: string;
};

export type FloorState = {
  held: boolean;
  paused: Record<LineId, boolean>;
  jobs: Job[];
  dock: Piece[];
  log: LogEntry[];
  selected: LineId;
};

const STORAGE_KEY = "hearthline-v1";

export function hashString(value: string) {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

export function mulberry32(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function uid() {
  return `${Math.random().toString(36).slice(2, 8)}${Date.now().toString(36).slice(-4)}`;
}

function productName(brief: string) {
  const bit = brief.split(/[,.;:!?]/)[0]?.trim() || brief;
  const named = bit.charAt(0).toUpperCase() + bit.slice(1);
  return named.length > 48 ? `${named.slice(0, 46)}…` : named;
}

function pick<T>(rand: () => number, items: readonly T[]): T {
  return items[Math.floor(rand() * items.length)] ?? items[0];
}

function pushLog(log: LogEntry[], lineId: LineId, text: string, at: number) {
  return [{ id: uid(), at, lineId, text }, ...log].slice(0, 28);
}

function emptyPaused(): Record<LineId, boolean> {
  return {
    press: false,
    booth: false,
    marquee: false,
    sprites: false,
    gazette: false,
    spotlight: false,
  };
}

function freeze(job: Job, now: number): Job {
  if (job.stageStartedAt == null) return job;
  return {
    ...job,
    frozenElapsed: now - job.stageStartedAt,
    stageStartedAt: null,
  };
}

function thaw(job: Job, now: number): Job {
  if (job.frozenElapsed == null) return job;
  return {
    ...job,
    stageStartedAt: now - job.frozenElapsed,
    frozenElapsed: null,
  };
}

export function stageFraction(job: Job, now: number) {
  const duration = STAGES[job.stageIndex].ms;
  if (job.stageStartedAt != null) {
    return Math.min(1, Math.max(0, (now - job.stageStartedAt) / duration));
  }
  if (job.frozenElapsed != null) {
    return Math.min(1, Math.max(0, job.frozenElapsed / duration));
  }
  return 0;
}

export function overallProgress(job: Job, now: number) {
  return (job.stageIndex + stageFraction(job, now)) / STAGES.length;
}

export type LineActivity = "working" | "idle" | "held" | "paused" | "jammed" | "queued";

export function lineActivity(state: FloorState, lineId: LineId): LineActivity {
  const head = state.jobs.find((job) => job.lineId === lineId);
  if (head?.fault) return "jammed";
  if (!head) return "idle";
  if (state.held) return "held";
  if (state.paused[lineId]) return "paused";
  if (head.stageStartedAt == null && head.frozenElapsed == null) return "queued";
  if (head.stageStartedAt == null) return "paused";
  return "working";
}

export function narration(state: FloorState, lineId: LineId) {
  const line = lineById(lineId);
  const head = state.jobs.find((job) => job.lineId === lineId);
  if (!head) {
    return `${line.agent} is at the bench. The belt is clear.`;
  }
  if (head.fault) return head.fault;
  const stage = STAGES[head.stageIndex].label.toLowerCase();
  if (state.held) {
    return `The floor is holding. ${line.agent} stays on ${stage}.`;
  }
  if (state.paused[lineId] || (head.stageStartedAt == null && head.frozenElapsed != null)) {
    return `${line.agent} is holding this line on ${stage}.`;
  }
  if (head.stageStartedAt == null) {
    return `${line.agent} has “${clip(head.brief)}” waiting on the belt.`;
  }
  return line.stageLines[head.stageIndex](head.brief);
}

export function jobsFor(state: FloorState, lineId: LineId) {
  return state.jobs.filter((job) => job.lineId === lineId);
}

export function pieceValue(piece: Piece) {
  const base =
    piece.artifact.kind === "press"
      ? piece.artifact.price
      : piece.artifact.kind === "marquee"
        ? 40
        : piece.artifact.kind === "sprites"
          ? 30
          : piece.artifact.kind === "spotlight"
            ? 22
            : piece.artifact.kind === "booth"
              ? 18
              : 8;
  const cents = (hashString(piece.id) % 100) / 100;
  return Math.round((base + cents) * 100) / 100;
}

export function autonomousOutput(dock: Piece[]) {
  return Math.round(dock.reduce((sum, piece) => sum + pieceValue(piece), 0) * 100) / 100;
}

function creature(rand: () => number): SpriteSheet {
  const pixels = Array.from({ length: 12 }, () => Array(12).fill(0));
  const fills = ["#e07a3d", "#3d6adf", "#1f8a4c", "#a32048", "#d0a0ff", "#e2b15a", "#2ec4b6"];
  const shades = ["#8a3e16", "#1d3f93", "#145c32", "#6d1230", "#6d4a8a", "#8a6420", "#146e68"];
  const index = Math.floor(rand() * fills.length);
  const palette = ["transparent", fills[index] ?? "#e07a3d", shades[index] ?? "#8a3e16", "#f7f1e4", "#1b140f"];
  const shape = Math.floor(rand() * 3);
  for (let y = 0; y < 12; y += 1) {
    for (let x = 0; x < 12; x += 1) {
      const dx = x - 5.5;
      const dy = y - 6;
      const round = dx * dx * 0.7 + dy * dy < 14 && y > 2 && y < 10;
      const tall = Math.abs(dx) < 3.2 && y > 1 && y < 10;
      const wide = Math.abs(dx) < 5 && y > 4 && y < 9;
      if ((shape === 0 && round) || (shape === 1 && tall) || (shape === 2 && wide)) {
        pixels[y][x] = y > 7 ? 2 : 1;
      }
    }
  }
  if (rand() > 0.35) {
    pixels[2][3] = 1;
    pixels[1][3] = 1;
    pixels[2][8] = 1;
    pixels[1][8] = 1;
  }
  if (rand() > 0.45) {
    for (let x = 3; x <= 8; x += 1) pixels[2][x] = 2;
  }
  pixels[5][4] = 4;
  pixels[5][7] = 4;
  pixels[4][4] = 3;
  pixels[4][7] = 3;
  pixels[10][4] = 2;
  pixels[10][7] = 2;
  pixels[9][4] = 2;
  pixels[9][7] = 2;
  return { pixels, palette };
}

export function makeArtifact(lineId: LineId, brief: string, id: string): Artifact {
  if (/\bjam\b/i.test(brief)) {
    throw new Error("jam");
  }
  const rand = mulberry32(hashString(`${lineId}:${id}:${brief}`));
  const name = productName(brief);

  if (lineId === "press") {
    const motifs = ["stripe", "dot", "block", "ring"] as const;
    const palettes: [string, string, string][] = [
      ["#1d3557", "#f1faee", "#e07a3d"],
      ["#1b3d2c", "#f3ead7", "#e2b15a"],
      ["#3d2b1f", "#f6efe4", "#c4552a"],
      ["#14213d", "#e5e5e5", "#f4d35e"],
    ];
    const materials = /mug|cup|clay|kiln|ceramic/i.test(brief)
      ? "Stoneware, underglaze"
      : /towel|linen|cloth|textile|cotton/i.test(brief)
        ? "Linen, fiber-reactive dye"
        : /card|print|poster|paper/i.test(brief)
          ? "Cotton paper, soy ink"
          : pick(rand, ["Cotton paper, soy ink", "Linen, fiber-reactive dye", "Stoneware, underglaze"]);
    const price = 16 + Math.floor(rand() * 9) * 4;
    return {
      kind: "press",
      title: name,
      price,
      edition: rand() > 0.55 ? "Open run" : `Edition of ${20 + Math.floor(rand() * 4) * 10}`,
      materials,
      blurb: `Pulled on the bench from the brief “${clip(brief)}”.`,
      motif: pick(rand, motifs),
      colors: pick(rand, palettes),
    };
  }

  if (lineId === "booth") {
    const keys = ["A minor", "D minor", "E minor", "F minor", "C minor"];
    const kicks = Array.from({ length: 16 }, (_, step) => step % 4 === 0 || (step === 10 && rand() > 0.45));
    const hats = Array.from({ length: 16 }, (_, step) => step % 2 === 1 && rand() > 0.15);
    const bass = Array.from({ length: 16 }, (_, step) => {
      if (step % 2 === 1 && rand() > 0.4) return -1;
      return Math.floor(rand() * 5);
    });
    return {
      kind: "booth",
      title: name,
      bpm: 96 + Math.floor(rand() * 32),
      keyName: pick(rand, keys),
      root: pick(rand, [0, 2, 5, 7]),
      kicks,
      hats,
      bass,
    };
  }

  if (lineId === "marquee") {
    const kickers = ["FIELD NOTE", "ON THE BENCH", "THIS WEEK", "OPEN STUDIO", "TONIGHT"];
    const palettes: [string, string, string][] = [
      ["#1b2430", "#f4efe4", "#e8a54b"],
      ["#3a1422", "#f7e7ea", "#ffb4c8"],
      ["#10261c", "#e7f2ea", "#f0d078"],
      ["#241628", "#f3e9f8", "#e2b15a"],
    ];
    return {
      kind: "marquee",
      title: name,
      kicker: pick(rand, kickers),
      headline: name,
      sub: clip(brief),
      colors: pick(rand, palettes),
    };
  }

  if (lineId === "sprites") {
    return {
      kind: "sprites",
      title: name,
      note: "Six figures, one palette family, ready to drop into a scene.",
      sprites: Array.from({ length: 6 }, (_, index) => creature(mulberry32(hashString(`${id}:${index}:${brief}`)))),
    };
  }

  if (lineId === "gazette") {
    const day = new Date();
    const start = new Date(day.getFullYear(), 0, 0);
    const issue = Math.floor((day.getTime() - start.getTime()) / 86400000);
    return {
      kind: "gazette",
      title: name,
      issue: `No. ${issue}`,
      headline: name,
      dek: `Notes from the floor on ${clip(brief)}.`,
      sections: [
        {
          hed: "From the floor",
          body: `The mill kept returning to ${clip(brief)}. The first pass was rough, the second one held, and the piece on the dock is the one worth keeping.`,
        },
        {
          hed: "What changed",
          body: pick(rand, [
            `The run got shorter. ${clip(brief)} reads better when the second color does less.`,
            `We kept the odd detail in “${clip(brief)}” and cut the explanation around it.`,
            `The hour of day mattered more than the mood word. Evening won.`,
          ]),
        },
        {
          hed: "On the bench next",
          body: "If you send another brief in this vein, name the material and the hour. Those two decide more than a mood word does.",
        },
      ],
    };
  }

  const frameColors = ["#e07a3d", "#1d3557", "#f0d078", "#2d6a4e", "#7a3148", "#3c4a78"];
  return {
    kind: "spotlight",
    title: name,
    posts: [
      {
        where: "Window card",
        text: `${name}. ${clip(brief)}. Come by while the lamps are still on.`,
      },
      {
        where: "Note to regulars",
        text: `We made a small thing this week: ${clip(brief)}. It is on the dock if you want to see it.`,
      },
      {
        where: "One-line letter",
        text: `Saving you a walk across the yard — ${clip(brief)} is finished.`,
      },
    ],
    frames: ["Open", "Close", "Hands", "Lamp"].map((label, index) => ({
      label,
      color: frameColors[(Math.floor(rand() * frameColors.length) + index) % frameColors.length] ?? "#e07a3d",
    })),
  };
}

export function createSample(now: number): FloorState {
  const jobs: Job[] = LINES.map((line, index) => ({
    id: `sample-${line.id}`,
    lineId: line.id,
    brief: line.sample,
    stageIndex: (index % 4) as StageIndex,
    stageStartedAt: now - 700,
    frozenElapsed: null,
    createdAt: now - 1000 * (index + 2),
  }));
  return {
    held: false,
    paused: emptyPaused(),
    jobs,
    dock: [],
    log: [
      {
        id: "boot",
        at: now,
        lineId: "press",
        text: "Terminal is up. Six zones are already carrying the sample briefs.",
      },
    ],
    selected: "press",
  };
}

export function tick(state: FloorState, now: number): FloorState {
  if (state.held) return state;
  let jobs = state.jobs;
  let dock = state.dock;
  let log = state.log;
  let changed = false;

  for (const line of LINES) {
    if (state.paused[line.id]) continue;
    const index = jobs.findIndex((job) => job.lineId === line.id);
    if (index < 0) continue;
    const job = jobs[index];
    if (!job || job.fault) continue;

    if (job.stageStartedAt == null) {
      if (job.frozenElapsed != null) {
        jobs = jobs.map((item, itemIndex) => (itemIndex === index ? thaw(item, now) : item));
        changed = true;
        continue;
      }
      jobs = jobs.map((item, itemIndex) =>
        itemIndex === index ? { ...item, stageStartedAt: now } : item,
      );
      log = pushLog(log, line.id, line.stageLines[0](job.brief), now);
      changed = true;
      continue;
    }

    const elapsed = now - job.stageStartedAt;
    if (elapsed < STAGES[job.stageIndex].ms) continue;

    changed = true;
    if (job.stageIndex < STAGES.length - 1) {
      const nextStage = (job.stageIndex + 1) as StageIndex;
      jobs = jobs.map((item, itemIndex) =>
        itemIndex === index ? { ...item, stageIndex: nextStage, stageStartedAt: now } : item,
      );
      log = pushLog(log, line.id, line.stageLines[nextStage](job.brief), now);
      continue;
    }

    try {
      const artifact = makeArtifact(line.id, job.brief, job.id);
      jobs = jobs.filter((_, itemIndex) => itemIndex !== index);
      dock = [
        { id: job.id, lineId: line.id, brief: job.brief, finishedAt: now, artifact },
        ...dock,
      ].slice(0, 16);
      log = pushLog(log, line.id, `${line.agent} set “${artifact.title}” on the dock.`, now);
    } catch {
      const fault = `${line.agent} jammed while packing this piece. Retry it, or take it off the belt.`;
      jobs = jobs.map((item, itemIndex) =>
        itemIndex === index ? { ...job, fault, stageStartedAt: now } : item,
      );
      log = pushLog(log, line.id, fault, now);
    }
  }

  if (!changed) return state;
  return { ...state, jobs, dock, log };
}

export function enqueue(
  state: FloorState,
  lineId: LineId,
  brief: string,
  now: number,
): { state: FloorState; error?: string } {
  const clean = brief.replace(/\s+/g, " ").trim();
  if (clean.length < 3) {
    return { state, error: "Give the line a little more to go on." };
  }
  if (clean.length > 140) {
    return { state, error: "Keep the brief under 140 characters." };
  }
  const waiting = state.jobs.some((job) => job.lineId === lineId);
  if (state.jobs.filter((job) => job.lineId === lineId).length >= 6) {
    return { state, error: "This belt is full. Let a piece finish first." };
  }
  const line = lineById(lineId);
  const blocked = state.held || state.paused[lineId] || waiting;
  const job: Job = {
    id: uid(),
    lineId,
    brief: clean,
    stageIndex: 0,
    stageStartedAt: blocked ? null : now,
    frozenElapsed: null,
    createdAt: now,
  };
  const text = blocked
    ? `${line.agent} queued “${clip(clean)}”.`
    : line.stageLines[0](clean);
  return {
    state: {
      ...state,
      jobs: [...state.jobs, job],
      log: pushLog(state.log, lineId, text, now),
    },
  };
}

export function setSelected(state: FloorState, selected: LineId): FloorState {
  if (state.selected === selected) return state;
  return { ...state, selected };
}

export function setLinePaused(state: FloorState, lineId: LineId, paused: boolean, now: number): FloorState {
  const line = lineById(lineId);
  const jobs = state.jobs.map((job) => {
    if (job.lineId !== lineId) return job;
    if (paused) return freeze(job, now);
    if (state.held) return job;
    return thaw(job, now);
  });
  return {
    ...state,
    paused: { ...state.paused, [lineId]: paused },
    jobs,
    log: pushLog(
      state.log,
      lineId,
      paused
        ? `${line.agent} holds the ${line.name.toLowerCase()} line.`
        : `${line.agent} starts the ${line.name.toLowerCase()} line again.`,
      now,
    ),
  };
}

export function setHeld(state: FloorState, held: boolean, now: number): FloorState {
  const jobs = state.jobs.map((job) => {
    if (held) return freeze(job, now);
    if (state.paused[job.lineId]) return job;
    return thaw(job, now);
  });
  return {
    ...state,
    held,
    jobs,
    log: pushLog(
      state.log,
      state.selected,
      held ? "The whole floor is holding." : "The floor is moving again.",
      now,
    ),
  };
}

export function retryJob(state: FloorState, id: string, now: number): FloorState {
  const job = state.jobs.find((item) => item.id === id);
  if (!job) return state;
  const line = lineById(job.lineId);
  const hold = state.held || state.paused[job.lineId];
  return {
    ...state,
    jobs: state.jobs.map((item) => {
      if (item.id !== id) return item;
      return {
        ...item,
        fault: undefined,
        stageStartedAt: hold ? null : now,
        frozenElapsed: hold ? 0 : null,
      };
    }),
    log: pushLog(state.log, job.lineId, `${line.agent} tries the pack again.`, now),
  };
}

export function removeJob(state: FloorState, id: string, now: number): FloorState {
  const job = state.jobs.find((item) => item.id === id);
  if (!job) return state;
  const line = lineById(job.lineId);
  return {
    ...state,
    jobs: state.jobs.filter((item) => item.id !== id),
    log: pushLog(state.log, job.lineId, `${line.agent} took the brief off the belt.`, now),
  };
}

export function clearDock(state: FloorState, now: number): FloorState {
  if (state.dock.length === 0) return state;
  return {
    ...state,
    dock: [],
    log: pushLog(state.log, state.selected, "The dock was cleared.", now),
  };
}

function isLineId(value: unknown): value is LineId {
  return typeof value === "string" && LINE_IDS.includes(value as LineId);
}

export function loadState(): FloorState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<FloorState>;
    if (!parsed || !Array.isArray(parsed.jobs) || !Array.isArray(parsed.dock) || !Array.isArray(parsed.log)) {
      return null;
    }
    const paused = emptyPaused();
    if (parsed.paused && typeof parsed.paused === "object") {
      for (const id of LINE_IDS) {
        paused[id] = Boolean(parsed.paused[id]);
      }
    }
    const jobs = parsed.jobs.filter((job): job is Job => {
      return Boolean(job && isLineId(job.lineId) && typeof job.brief === "string" && typeof job.id === "string");
    });
    const dock = parsed.dock.filter((piece): piece is Piece => {
      return Boolean(piece && isLineId(piece.lineId) && piece.artifact && typeof piece.id === "string");
    });
    const log = parsed.log.filter((entry): entry is LogEntry => {
      return Boolean(entry && isLineId(entry.lineId) && typeof entry.text === "string");
    });
    return {
      held: Boolean(parsed.held),
      paused,
      jobs,
      dock: dock.slice(0, 16),
      log: log.slice(0, 28),
      selected: isLineId(parsed.selected) ? parsed.selected : "press",
    };
  } catch {
    return null;
  }
}

export function saveState(state: FloorState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}
