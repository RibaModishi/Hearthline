import { ROOMS, WORLD_H, WORLD_W } from "@/lib/map";
import {
  LINES,
  lineActivity,
  overallProgress,
  type FloorState,
  type LineId,
} from "@/lib/works";

const SPECKS = Array.from({ length: 70 }, (_, index) => {
  const x = (index * 47) % WORLD_W;
  const y = (index * 29) % WORLD_H;
  return { x, y, color: index % 2 === 0 ? "#243028" : "#1a261c" };
});

const AGENT = [
  "..hhh..",
  ".hhhhh.",
  ".hffh..",
  ".hfefh.",
  "..sss..",
  ".ccccc.",
  "ccccccc",
  "cc.c.cc",
  ".c...c.",
  ".l...l.",
  ".l...l.",
  "ll...ll",
];

const AGENT_STEP = [
  "..hhh..",
  ".hhhhh.",
  ".hffh..",
  ".hfefh.",
  "..sss..",
  ".ccccc.",
  "ccccccc",
  "c..c..c",
  ".c...c.",
  "l.....l",
  "l.....l",
  "ll...ll",
];

function agent(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  colors: { hair: string; cloth: string; skin: string },
  frame: number,
) {
  const rows = frame ? AGENT_STEP : AGENT;
  const map: Record<string, string> = {
    h: colors.hair,
    f: colors.skin,
    e: "#1b140f",
    s: colors.skin,
    c: colors.cloth,
    l: "#2a2420",
  };
  rows.forEach((row, rowIndex) => {
    for (let col = 0; col < row.length; col += 1) {
      const paint = map[row[col] ?? ""];
      if (!paint) continue;
      ctx.fillStyle = paint;
      ctx.fillRect(x + col, y + rowIndex, 1, 1);
    }
  });
}

function parcel(ctx: CanvasRenderingContext2D, x: number, y: number, color: string) {
  ctx.fillStyle = "#1b140f";
  ctx.fillRect(x + 1, y + 1, 8, 6);
  ctx.fillStyle = color;
  ctx.fillRect(x, y, 8, 6);
  ctx.fillStyle = "#f4efe6";
  ctx.fillRect(x, y + 2, 8, 1);
}

function tree(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.fillStyle = "#5a3a24";
  ctx.fillRect(x + 3, y + 7, 2, 5);
  ctx.fillStyle = "#1d5c34";
  ctx.fillRect(x, y + 1, 8, 7);
  ctx.fillStyle = "#2f8a4c";
  ctx.fillRect(x + 1, y, 6, 4);
}

function crate(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.fillStyle = "#a56b32";
  ctx.fillRect(x, y, 12, 10);
  ctx.fillStyle = "#6b4422";
  ctx.fillRect(x, y + 4, 12, 1);
  ctx.fillRect(x + 5, y, 1, 10);
}

function props(ctx: CanvasRenderingContext2D, id: LineId, x: number, y: number) {
  if (id === "press") {
    ctx.fillStyle = "#f4efe6";
    ctx.fillRect(x + 78, y + 22, 14, 16);
    ctx.fillStyle = "#d7d0c4";
    ctx.fillRect(x + 78, y + 26, 14, 1);
    ctx.fillRect(x + 78, y + 30, 14, 1);
    ctx.fillStyle = "#3e2618";
    ctx.fillRect(x + 92, y + 20, 8, 10);
  } else if (id === "booth") {
    ctx.fillStyle = "#1c2438";
    ctx.fillRect(x + 78, y + 28, 8, 10);
    ctx.fillRect(x + 90, y + 24, 8, 14);
    ctx.fillStyle = "#7aa2ff";
    ctx.fillRect(x + 81, y + 31, 2, 2);
    ctx.fillRect(x + 93, y + 28, 2, 2);
  } else if (id === "marquee") {
    ctx.fillStyle = "#4a1c2c";
    ctx.fillRect(x + 76, y + 18, 22, 16);
    ctx.fillStyle = "#ffd6e0";
    ctx.fillRect(x + 78, y + 20, 18, 12);
    ctx.fillStyle = "#a32048";
    ctx.fillRect(x + 82, y + 24, 10, 2);
  } else if (id === "sprites") {
    ctx.fillStyle = "#173024";
    ctx.fillRect(x + 76, y + 24, 24, 14);
    const dots = ["#5dca8a", "#f0d078", "#7aa2ff", "#ff6b8a"];
    dots.forEach((color, index) => {
      ctx.fillStyle = color;
      ctx.fillRect(x + 80 + (index % 4) * 5, y + 28, 3, 3);
    });
  } else if (id === "gazette") {
    ctx.fillStyle = "#4e3518";
    ctx.fillRect(x + 78, y + 26, 18, 8);
    ctx.fillStyle = "#f4efe6";
    ctx.fillRect(x + 80, y + 22, 12, 8);
    ctx.fillStyle = "#2a2118";
    ctx.fillRect(x + 82, y + 24, 8, 1);
    ctx.fillRect(x + 82, y + 26, 6, 1);
  } else {
    ctx.fillStyle = "#241628";
    ctx.fillRect(x + 86, y + 20, 4, 12);
    ctx.fillStyle = "#1b140f";
    ctx.fillRect(x + 82, y + 16, 12, 8);
    ctx.fillStyle = "#d0a0ff";
    ctx.fillRect(x + 90, y + 18, 3, 3);
  }
}

export function drawFloor(ctx: CanvasRenderingContext2D, state: FloorState, now: number, time: number) {
  ctx.fillStyle = "#1a241c";
  ctx.fillRect(0, 0, WORLD_W, WORLD_H);

  for (const speck of SPECKS) {
    ctx.fillStyle = speck.color;
    ctx.fillRect(speck.x, speck.y, 2, 1);
  }

  for (let y = 0; y < WORLD_H; y += 4) {
    for (let x = 128; x < 256; x += 4) {
      const n = (x * 3 + y * 5) % 7;
      ctx.fillStyle = n === 0 ? "#3c352c" : "#2c2822";
      ctx.fillRect(x, y, 3, 3);
    }
  }

  for (const alley of [79, 157]) {
    ctx.fillStyle = "#4a3b2a";
    ctx.fillRect(6, alley, 372, 1);
    for (let x = 12; x < 372; x += 12) {
      const on = Math.sin(time / 280 + x * 0.2) > -0.15;
      ctx.fillStyle = on ? "#f2c56b" : "#6a5030";
      ctx.fillRect(x, alley + 1, 2, 2);
    }
  }

  tree(ctx, 132, 18);
  tree(ctx, 236, 18);
  tree(ctx, 132, 188);
  tree(ctx, 236, 188);

  ctx.fillStyle = "#243246";
  ctx.fillRect(178, 104, 28, 18);
  ctx.fillStyle = "#7eb6d6";
  ctx.fillRect(182, 108, 20, 10);
  ctx.fillStyle = "#d7e7f2";
  ctx.fillRect(184, 110, 4, 2);

  const crates = Math.min(4, state.dock.length);
  if (crates === 0) {
    ctx.fillStyle = "#3a3228";
    ctx.fillRect(176, 196, 32, 6);
  } else {
    for (let i = 0; i < crates; i += 1) {
      crate(ctx, 170 + (i % 2) * 16, 188 - Math.floor(i / 2) * 12);
    }
  }

  const tail = Math.sin(time / 380) > 0 ? 0 : 1;
  ctx.fillStyle = "#c47a3a";
  ctx.fillRect(206, 150, 10, 4);
  ctx.fillRect(214, 148, 4, 4);
  ctx.fillRect(204 - tail, 149, 3, 2);
  ctx.fillStyle = "#1b140f";
  ctx.fillRect(216, 149, 1, 1);

  for (const line of LINES) {
    const room = ROOMS[line.id];
    const activity = lineActivity(state, line.id);
    const working = activity === "working";
    const jobs = state.jobs.filter((job) => job.lineId === line.id).slice(0, 3);

    ctx.fillStyle = "rgba(0,0,0,0.35)";
    ctx.fillRect(room.x + 2, room.y + 3, room.w, room.h);

    ctx.fillStyle = line.colors.wall;
    ctx.fillRect(room.x, room.y, room.w, room.h);
    ctx.fillStyle = line.colors.trim;
    ctx.fillRect(room.x, room.y, room.w, 9);
    ctx.fillStyle = line.colors.floor;
    ctx.fillRect(room.x + 3, room.y + 12, room.w - 6, room.h - 16);
    ctx.fillStyle = line.colors.board;
    for (let y = room.y + 14; y < room.y + room.h - 8; y += 4) {
      ctx.fillRect(room.x + 3, y, room.w - 6, 1);
    }

    const doorX = line.id === "press" || line.id === "sprites" || line.id === "spotlight" ? room.x : room.x + room.w - 3;
    ctx.fillStyle = "#1a140f";
    ctx.fillRect(doorX, room.y + 28, 3, 16);
    ctx.fillStyle = "#e2b15a";
    ctx.fillRect(doorX + (doorX === room.x ? 1 : 0), room.y + 34, 1, 1);

    ctx.fillStyle = "#9ec9ea";
    ctx.fillRect(room.x + room.w - 22, room.y + 14, 12, 8);
    ctx.fillStyle = "#1b2438";
    ctx.fillRect(room.x + room.w - 16, room.y + 14, 1, 8);
    ctx.fillRect(room.x + room.w - 22, room.y + 18, 12, 1);

    const flicker = 0.65 + 0.35 * Math.sin(time / 160 + room.x);
    ctx.globalAlpha = working ? 0.28 * flicker : 0.12;
    ctx.fillStyle = "#ffc46b";
    ctx.fillRect(room.x + 8, room.y + 12, 18, 12);
    ctx.globalAlpha = 1;
    ctx.fillStyle = "#ffe3a3";
    ctx.fillRect(room.x + 14, room.y + 14, 3, 2);
    ctx.fillStyle = "#5c3b22";
    ctx.fillRect(room.x + 15, room.y + 16, 1, 5);

    props(ctx, line.id, room.x, room.y);

    ctx.fillStyle = "#6b4a32";
    ctx.fillRect(room.x + 8, room.y + 36, 26, 4);
    ctx.fillStyle = "#4a301f";
    ctx.fillRect(room.x + 10, room.y + 40, 2, 4);
    ctx.fillRect(room.x + 30, room.y + 40, 2, 4);

    const bob = working && Math.sin(time / 140) > 0 ? 1 : 0;
    agent(ctx, room.x + 16, room.y + 22 + bob, line.colors, bob);

    const beltY = room.y + room.h - 14;
    ctx.fillStyle = "#23272e";
    ctx.fillRect(room.x + 6, beltY, room.w - 12, 7);
    const offset = Math.floor(time / (working ? 90 : 240)) % 6;
    ctx.fillStyle = working ? "#e2b15a" : "#5c6370";
    for (let x = room.x + 8 + offset; x < room.x + room.w - 10; x += 6) {
      ctx.fillRect(x, beltY + 2, 2, 3);
    }

    jobs.forEach((job, index) => {
      let progress = 0.06 + index * 0.04;
      if (index === 0 && !job.fault && (job.stageStartedAt != null || job.frozenElapsed != null)) {
        progress = 0.08 + overallProgress(job, now) * 0.78;
      }
      if (job.fault) progress = 0.62;
      const px = room.x + 8 + progress * (room.w - 28);
      parcel(ctx, px, beltY - 5, line.colors.parcel);
    });

    if (working) {
      const puff = Math.floor(time / 180) % 5;
      ctx.globalAlpha = 0.8;
      ctx.fillStyle = "#f4efe6";
      ctx.fillRect(room.x + 20, room.y + 18 - puff, 1, 1);
      ctx.globalAlpha = 1;
    }

    if (state.selected === line.id) {
      ctx.fillStyle = "#f0c36a";
      ctx.fillRect(room.x - 1, room.y - 1, room.w + 2, 1);
      ctx.fillRect(room.x - 1, room.y + room.h, room.w + 2, 1);
      ctx.fillRect(room.x - 1, room.y, 1, room.h);
      ctx.fillRect(room.x + room.w, room.y, 1, room.h);
    }
  }
}
