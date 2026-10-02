import { ROOMS, WORLD_H, WORLD_W } from "@/lib/map";
import { LINES, lineActivity, overallProgress, type FloorState, type LineId } from "@/lib/works";

const trails = new Map<LineId, { x: number; y: number }[]>();

function pushTrail(id: LineId, x: number, y: number) {
  const list = trails.get(id) ?? [];
  const last = list[list.length - 1];
  if (!last || Math.abs(last.x - x) + Math.abs(last.y - y) > 3) {
    list.push({ x, y });
    if (list.length > 16) list.shift();
    trails.set(id, list);
  }
}

function frame(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, color: string, thick: number) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, thick);
  ctx.fillRect(x, y + h - thick, w, thick);
  ctx.fillRect(x, y, thick, h);
  ctx.fillRect(x + w - thick, y, thick, h);
}

export function drawFloor(ctx: CanvasRenderingContext2D, state: FloorState, now: number, time: number) {
  ctx.fillStyle = "#03110a";
  ctx.fillRect(0, 0, WORLD_W, WORLD_H);

  ctx.fillStyle = "#0c2f1c";
  for (let x = 0; x < WORLD_W; x += 8) ctx.fillRect(x, 0, 1, WORLD_H);
  for (let y = 0; y < WORLD_H; y += 8) ctx.fillRect(0, y, WORLD_W, 1);

  ctx.fillStyle = "#124a2c";
  ctx.fillRect(190, 16, 3, 208);
  for (const line of LINES) {
    const room = ROOMS[line.id];
    const midY = room.y + Math.floor(room.h / 2);
    const fromLeft = room.x > 200;
    const x0 = fromLeft ? 193 : room.x + room.w;
    const x1 = fromLeft ? room.x : 193;
    ctx.fillRect(Math.min(x0, x1), midY, Math.abs(x1 - x0), 2);
  }
  const pulse = Math.floor((time / 30) % 200);
  ctx.fillStyle = "#c8ff8a";
  ctx.fillRect(189, 18 + pulse, 5, 4);

  ctx.fillStyle = "#062015";
  ctx.fillRect(168, 96, 48, 28);
  frame(ctx, 168, 96, 48, 28, "#7dff6a", 1);
  ctx.fillStyle = "#1f8a4c";
  for (let i = 0; i < Math.min(4, state.dock.length); i += 1) {
    ctx.fillRect(174 + (i % 4) * 9, 108, 6, 8);
  }

  for (const line of LINES) {
    const room = ROOMS[line.id];
    const activity = lineActivity(state, line.id);
    const working = activity === "working";
    const jobs = state.jobs.filter((job) => job.lineId === line.id).slice(0, 3);
    const neon = state.selected === line.id ? "#e7ffd4" : line.colors.parcel;

    ctx.fillStyle = "#07140e";
    ctx.fillRect(room.x, room.y, room.w, room.h);
    ctx.globalAlpha = working ? 0.22 : 0.1;
    ctx.fillStyle = line.colors.parcel;
    ctx.fillRect(room.x + 2, room.y + 2, room.w - 4, room.h - 4);
    ctx.globalAlpha = 1;
    frame(ctx, room.x, room.y, room.w, room.h, neon, state.selected === line.id ? 2 : 1);

    const beltY = room.y + room.h - 12;
    ctx.fillStyle = "#0b2416";
    ctx.fillRect(room.x + 8, beltY, room.w - 16, 5);
    const offset = Math.floor(time / (working ? 70 : 220)) % 8;
    ctx.fillStyle = working ? "#d6ff9a" : "#1d5c38";
    for (let x = room.x + 10 + offset; x < room.x + room.w - 12; x += 8) {
      ctx.fillRect(x, beltY + 1, 3, 3);
    }

    let agentX = room.x + 16;
    const agentY = beltY - 7;
    jobs.forEach((job, index) => {
      let progress = 0.08 + index * 0.05;
      if (index === 0 && !job.fault && (job.stageStartedAt != null || job.frozenElapsed != null)) {
        progress = 0.08 + overallProgress(job, now) * 0.78;
      }
      if (job.fault) progress = 0.62;
      const px = room.x + 10 + progress * (room.w - 28);
      ctx.fillStyle = "#04110a";
      ctx.fillRect(px + 1, beltY - 5, 7, 5);
      ctx.fillStyle = line.colors.parcel;
      ctx.fillRect(px, beltY - 6, 7, 5);
      if (index === 0) agentX = px - 2;
    });

    const trail = trails.get(line.id) ?? [];
    trail.forEach((point, index) => {
      ctx.globalAlpha = 0.15 + (index / trail.length) * 0.7;
      ctx.fillStyle = "#b6ff6a";
      ctx.fillRect(point.x, point.y, 2, 2);
    });
    ctx.globalAlpha = 1;
    if (working) pushTrail(line.id, agentX + 2, agentY + 2);

    ctx.fillStyle = working ? "#f4ffe8" : "#8fbf78";
    ctx.fillRect(agentX, agentY, 5, 5);
    ctx.fillStyle = line.colors.parcel;
    ctx.fillRect(agentX + 1, agentY + 1, 3, 3);

    if (activity === "jammed") {
      ctx.fillStyle = "#ff5a4a";
      ctx.fillRect(room.x + room.w - 8, room.y + 3, 4, 4);
    }
  }
}
