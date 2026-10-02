export const LINE_IDS = [
  "press",
  "candles",
  "supplements",
  "booth",
  "sprites",
  "marquee",
  "gazette",
  "research",
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
    name: "Printworks",
    agent: "Nia",
    role: "Print goods",
    blurb: "Towels, cards, and small editions. The sheet is designed on this bench. It is not listed for sale.",
    sample: "botanical indigo tea towel, two-color stripe, sold in pairs",
    placeholder: "botanical indigo tea towel, two-color stripe, sold in pairs",
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
    name: "Vibes",
    agent: "Sol",
    role: "Music sketches",
    blurb: "Sol records a loop you can play. No streaming account is connected.",
    sample: "deep house loop, 122 bpm, minor key, no vocals",
    placeholder: "deep house loop, 122 bpm, minor key, no vocals",
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
    name: "Frames",
    agent: "Remy",
    role: "Thumbnail frames",
    blurb: "One bold thumbnail from a title. Remy paints it here. Nobody is billed.",
    sample: "how a night kiln is fired, bold type, one thumbnail",
    placeholder: "how a night kiln is fired, bold type, one thumbnail",
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
    sample: "six market-stall creatures, one palette, game-ready",
    placeholder: "six market-stall creatures, one palette, game-ready",
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
    sample: "what the dock finished this week",
    placeholder: "what the dock finished this week",
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
    id: "candles",
    name: "Candle hall",
    agent: "Wynn",
    role: "Candle labels",
    blurb: "A label for scent, wax, and burn time. The candle is a picture, not a listing.",
    sample: "cedar and smoke soy candle, forty hour label",
    placeholder: "cedar and smoke soy candle, forty hour label",
    colors: {
      wall: "#8a5a28",
      floor: "#e7c27a",
      board: "#d4ae62",
      trim: "#4a3014",
      parcel: "#f0b429",
      hair: "#3a2414",
      cloth: "#c47a20",
      skin: "#f0c2a0",
    },
    stageLines: [
      (b) => `Wynn reads “${clip(b)}” and names the scent.`,
      () => "Wynn picks wax and a burn window.",
      () => "Wynn draws the label.",
      () => "Wynn sleeves the label and sends it to the dock.",
    ],
  },
  {
    id: "supplements",
    name: "Tin room",
    agent: "Ash",
    role: "Tin labels",
    blurb: "A tea or spice tin label only. This room does not make anything you swallow.",
    sample: "citrus peel tea tin, evening blend, label only",
    placeholder: "citrus peel tea tin, evening blend, label only",
    colors: {
      wall: "#2a6b62",
      floor: "#9fd0c4",
      board: "#87bfb2",
      trim: "#143832",
      parcel: "#3ddec4",
      hair: "#102824",
      cloth: "#1c7a6e",
      skin: "#f0c8a8",
    },
    stageLines: [
      (b) => `Ash sketches a tin for “${clip(b)}”.`,
      () => "Ash writes the front and refuses a health claim.",
      () => "Ash paints the label.",
      () => "Ash files the tin art on the dock.",
    ],
  },
  {
    id: "research",
    name: "Research",
    agent: "Quill",
    role: "Briefs",
    blurb: "Quill reads a niche and hands a tighter brief to the room that should make it.",
    sample: "study linen prints people already buy, then brief the printworks",
    placeholder: "study linen prints people already buy, then brief the printworks",
    colors: {
      wall: "#3d5a8a",
      floor: "#b7c7e6",
      board: "#a3b6d8",
      trim: "#1c2c4a",
      parcel: "#8eb6ff",
      hair: "#1a2030",
      cloth: "#2f5fbf",
      skin: "#f0c8a4",
    },
    stageLines: [
      (b) => `Quill opens “${clip(b)}” and looks for the room that fits.`,
      () => "Quill cuts the brief down to material and mood.",
      () => "Quill writes the handoff.",
      () => "Quill walks the note to that room's belt.",
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

export type CandleArtifact = {
  kind: "candles";
  title: string;
  scent: string;
  wax: string;
  burn: string;
  price: number;
  colors: [string, string, string];
};

export type TinArtifact = {
  kind: "supplements";
  title: string;
  front: string;
  note: string;
  price: number;
  colors: [string, string, string];
};

export type ResearchArtifact = {
  kind: "research";
  title: string;
  findings: string[];
  handoff: string;
  routedTo: LineId;
};

export type Artifact =
  | PressArtifact
  | BoothArtifact
  | MarqueeArtifact
  | SpriteArtifact
  | GazetteArtifact
  | SpotlightArtifact
  | CandleArtifact
  | TinArtifact
  | ResearchArtifact;

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

export type BossNote = {
  id: string;
  at: number;
  text: string;
};

export type FloorState = {
  held: boolean;
  paused: Record<LineId, boolean>;
  jobs: Job[];
  dock: Piece[];
  log: LogEntry[];
  selected: LineId;
  /** Lifetime file value per room. This is not money received. */
  scores: Record<LineId, number>;
  /** Next playbook brief index per room. */
  issued: Record<LineId, number>;
  bossLog: BossNote[];
};

export const BOSS = {
  name: "Voss",
  role: "Station chief",
};

export const PLAYBOOK: Record<LineId, readonly string[]> = {
  press: [
    "botanical indigo tea towel, two-color stripe, sold in pairs",
    "rust block-print kitchen linen, set of two",
    "black and cream dot scarf square, small edition",
  ],
  marquee: [
    "how a night kiln is fired, bold type, one thumbnail",
    "three mistakes on a first shop listing, bold type",
    "sixty-second studio tour, high contrast title",
  ],
  sprites: [
    "six market-stall creatures, one palette, game-ready",
    "six tiny shopkeepers, side view, shared palette",
    "six lantern spirits, one sheet, 16-pixel scale",
  ],
  booth: [
    "deep house loop, 122 bpm, minor key, no vocals",
    "late techno, 128 bpm, dry kick, short bass",
    "unhurried night train, minor key, four bars",
  ],
  candles: [
    "cedar and smoke soy candle, forty hour label",
    "linen and fig, coconut wax, evening burn",
    "black tea and orange peel, small tin label",
  ],
  supplements: [
    "citrus peel tea tin, evening blend, label only",
    "smoked salt tin, small batch, label only",
    "cocoa husk tea tin, label only",
  ],
  gazette: [
    "what the dock finished this week",
    "three files worth listing, and one to skip",
    "the week the indigo ran short",
  ],
  research: [
    "study linen prints people already buy, then brief the printworks",
    "study thumbnail titles that get the click, then brief frames",
    "study small pixel creature packs, then brief the sprite bay",
  ],
};

const STORAGE_KEY = "hearthline-v3";

function emptyScores(): Record<LineId, number> {
  return { press: 0, candles: 0, supplements: 0, booth: 0, sprites: 0, marquee: 0, gazette: 0, research: 0 };
}

function emptyIssued(): Record<LineId, number> {
  return { press: 0, candles: 0, supplements: 0, booth: 0, sprites: 0, marquee: 0, gazette: 0, research: 0 };
}

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
    candles: false,
    supplements: false,
    booth: false,
    sprites: false,
    marquee: false,
    gazette: false,
    research: false,
  };
}

export function routeResearch(brief: string): LineId {
  const text = brief.toLowerCase();
  if (/candle|wax|scent|wick/.test(text)) return "candles";
  if (/supplement|vitamin|gummy|tin|mineral|capsule|citrus/.test(text)) return "supplements";
  if (/music|song|techno|house|dj|loop|bpm|train/.test(text)) return "booth";
  if (/sprite|pixel|game|character|asset|creature/.test(text)) return "sprites";
  if (/thumbnail|youtube|frame|title|kiln|bold type/.test(text)) return "marquee";
  if (/newsletter|gazette|issue|weekly/.test(text)) return "gazette";
  return "press";
}

function handoffBrief(brief: string, target: LineId) {
  const cleaned = brief
    .replace(/^study\s+/i, "")
    .replace(/,?\s*then brief.+$/i, "")
    .trim();
  if (cleaned.length >= 8) return cleaned.slice(0, 140);
  return lineById(target).sample;
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
  if (piece.artifact.kind === "research") return 0;
  const base =
    piece.artifact.kind === "press" || piece.artifact.kind === "candles" || piece.artifact.kind === "supplements"
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

  if (lineId === "candles") {
    const palettes: [string, string, string][] = [
      ["#2a2118", "#f3e6c8", "#e07a3d"],
      ["#1b3d2c", "#f6efe4", "#c9a36e"],
      ["#3a1422", "#f7e7ea", "#e2b15a"],
    ];
    return {
      kind: "candles",
      title: name,
      scent: name,
      wax: /soy/i.test(brief) ? "Soy wax" : pick(rand, ["Soy wax", "Beeswax blend", "Coconut wax"]),
      burn: pick(rand, ["40 hours", "45 hours", "50 hours"]),
      price: 18 + Math.floor(rand() * 5) * 4,
      colors: pick(rand, palettes),
    };
  }

  if (lineId === "supplements") {
    const palettes: [string, string, string][] = [
      ["#10261c", "#e7f6ef", "#3ddec4"],
      ["#1b2430", "#f4efe4", "#e2b15a"],
      ["#241628", "#f7eef8", "#d0a0ff"],
    ];
    return {
      kind: "supplements",
      title: name,
      front: name,
      note: "Label art only. This is not a supplement, and it is not for sale.",
      price: 16 + Math.floor(rand() * 4) * 4,
      colors: pick(rand, palettes),
    };
  }

  if (lineId === "research") {
    const routedTo = routeResearch(brief);
    const room = lineById(routedTo);
    return {
      kind: "research",
      title: `Note for ${room.name}`,
      findings: [
        `The useful part of the note is “${clip(handoffBrief(brief, routedTo))}”.`,
        `${room.agent} in ${room.name} can make that without leaving the station.`,
        "Quill does not open a shop. The handoff is another brief on a belt.",
      ],
      handoff: handoffBrief(brief, routedTo),
      routedTo,
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
        text: "Terminal is up. Eight zones are already carrying the sample briefs.",
      },
    ],
    selected: "press",
    scores: emptyScores(),
    issued: {
      press: 1,
      candles: 1,
      supplements: 1,
      booth: 1,
      sprites: 1,
      marquee: 1,
      gazette: 1,
      research: 1,
    },
    bossLog: [
      {
        id: "boss-boot",
        at: now,
        text: "Voss has the floor. Every belt, jam, and purse is visible from this desk.",
      },
    ],
  };
}

export function tick(state: FloorState, now: number): FloorState {
  if (state.held) return state;
  let jobs = state.jobs;
  let dock = state.dock;
  let log = state.log;
  let scores = state.scores;
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
      const piece: Piece = { id: job.id, lineId: line.id, brief: job.brief, finishedAt: now, artifact };
      dock = [piece, ...dock].slice(0, 24);
      scores = { ...scores, [line.id]: roundMoney((scores[line.id] ?? 0) + pieceValue(piece)) };
      log = pushLog(log, line.id, `${line.agent} set “${artifact.title}” on the dock.`, now);
      if (artifact.kind === "research") {
        const target = artifact.routedTo;
        const targetLine = lineById(target);
        const waiting = jobs.filter((item) => item.lineId === target).length;
        if (waiting < 6) {
          const blocked = state.paused[target] || waiting > 0;
          jobs = [
            ...jobs,
            {
              id: uid(),
              lineId: target,
              brief: artifact.handoff,
              stageIndex: 0,
              stageStartedAt: blocked ? null : now,
              frozenElapsed: null,
              createdAt: now,
            },
          ];
          scores = { ...scores, research: roundMoney((scores.research ?? 0) + 4) };
          log = pushLog(
            log,
            target,
            `${line.agent} handed “${clip(artifact.handoff)}” to ${targetLine.agent}.`,
            now,
          );
        }
      }
    } catch {
      const fault = `${line.agent} jammed while packing this piece. Retry it, or take it off the belt.`;
      jobs = jobs.map((item, itemIndex) =>
        itemIndex === index ? { ...job, fault, stageStartedAt: now } : item,
      );
      log = pushLog(log, line.id, fault, now);
    }
  }

  const progressed = changed ? { ...state, jobs, dock, log, scores } : state;
  return bossReview(progressed, now);
}

function roundMoney(value: number) {
  return Math.round(value * 100) / 100;
}

export function standings(state: FloorState) {
  return [...LINE_IDS].sort((a, b) => (state.scores[b] ?? 0) - (state.scores[a] ?? 0) || a.localeCompare(b));
}

export function bossKnowledge(state: FloorState) {
  return LINE_IDS.map((id) => {
    const line = lineById(id);
    const job = state.jobs.find((item) => item.lineId === id);
    const latest = state.dock.find((piece) => piece.lineId === id);
    const status = job?.fault ? `Jammed: ${job.brief}` : job ? job.brief : "Belt clear";
    return {
      id,
      agent: line.agent,
      name: line.name,
      role: line.role,
      status,
      purse: state.scores[id] ?? 0,
      knows: latest ? `Last file “${latest.artifact.title}”. ${line.blurb}` : line.blurb,
    };
  });
}

function nextPlaybookBrief(state: FloorState, lineId: LineId, issued: Record<LineId, number>) {
  const book = PLAYBOOK[lineId];
  const start = issued[lineId] ?? 0;
  for (let offset = 0; offset < book.length; offset += 1) {
    const brief = book[(start + offset) % book.length] ?? book[0];
    const already = state.jobs.some((job) => job.lineId === lineId && job.brief === brief);
    if (!already) {
      issued[lineId] = start + offset + 1;
      return brief;
    }
  }
  issued[lineId] = start + 1;
  return book[start % book.length] ?? book[0];
}

export function bossReview(state: FloorState, now: number, force = false): FloorState {
  if (state.held) return state;
  let jobs = state.jobs;
  let log = state.log;
  let issued = state.issued;
  const notes: string[] = [];

  for (const job of [...jobs]) {
    if (!job.fault) continue;
    const line = lineById(job.lineId);
    if (/\bjam\b/i.test(job.brief)) {
      jobs = jobs.filter((item) => item.id !== job.id);
      const text = `${BOSS.name} pulled ${line.agent}'s brief. The word jam makes pack fail on purpose.`;
      notes.push(text);
      log = pushLog(log, job.lineId, text, now);
      continue;
    }
    jobs = jobs.map((item) =>
      item.id === job.id ? { ...item, fault: undefined, stageStartedAt: now, frozenElapsed: null } : item,
    );
    const text = `${BOSS.name} saw ${line.agent} jam and sent the pack through again.`;
    notes.push(text);
    log = pushLog(log, job.lineId, text, now);
  }

  const idle = LINE_IDS.filter((id) => !state.paused[id] && !jobs.some((job) => job.lineId === id)).sort(
    (a, b) => (state.scores[a] ?? 0) - (state.scores[b] ?? 0) || a.localeCompare(b),
  );

  if (idle.length > 0) issued = { ...issued };
  for (const id of idle) {
    const waiting = jobs.filter((job) => job.lineId === id).length;
    if (waiting >= 6) continue;
    const brief = nextPlaybookBrief(state, id, issued);
    const blocked = waiting > 0;
    jobs = [
      ...jobs,
      {
        id: uid(),
        lineId: id,
        brief,
        stageIndex: 0,
        stageStartedAt: blocked ? null : now,
        frozenElapsed: null,
        createdAt: now,
      },
    ];
  }

  if (idle.length > 0) {
    const ranked = [...LINE_IDS].sort((a, b) => (state.scores[b] ?? 0) - (state.scores[a] ?? 0));
    const lead = lineById(ranked[0] ?? "press");
    const last = lineById(ranked[ranked.length - 1] ?? "press");
    const fed = idle.map((id) => lineById(id).agent).join(", ");
    notes.push(
      `${BOSS.name} fed ${fed}. ${lead.name} leads the purse. ${last.name} is last, so that belt was filled first.`,
    );
    log = pushLog(log, idle[0] ?? "press", notes[notes.length - 1] ?? "", now);
  } else if (force && notes.length === 0) {
    const ranked = [...LINE_IDS].sort((a, b) => (state.scores[b] ?? 0) - (state.scores[a] ?? 0));
    const lead = lineById(ranked[0] ?? "press");
    notes.push(`${BOSS.name} walked the floor. Every belt is busy. ${lead.name} still leads the purse.`);
  }

  if (notes.length === 0 && issued === state.issued && jobs === state.jobs) return state;
  return {
    ...state,
    jobs,
    log,
    issued,
    bossLog: [...notes.map((text) => ({ id: uid(), at: now, text })), ...state.bossLog].slice(0, 12),
  };
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
    const scores = emptyScores();
    const issued = emptyIssued();
    if (parsed.scores && typeof parsed.scores === "object") {
      for (const id of LINE_IDS) scores[id] = Number(parsed.scores[id]) || 0;
    }
    if (parsed.issued && typeof parsed.issued === "object") {
      for (const id of LINE_IDS) issued[id] = Number(parsed.issued[id]) || 0;
    }
    const bossLog = Array.isArray(parsed.bossLog)
      ? parsed.bossLog.filter((note): note is BossNote => Boolean(note && typeof note.text === "string" && typeof note.id === "string")).slice(0, 12)
      : [];
    return {
      held: Boolean(parsed.held),
      paused,
      jobs,
      dock: dock.slice(0, 24),
      log: log.slice(0, 28),
      selected: isLineId(parsed.selected) ? parsed.selected : "press",
      scores,
      issued,
      bossLog,
    };
  } catch {
    return null;
  }
}

export function saveState(state: FloorState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}
