import type { LineId } from "@/lib/works";

export const WORLD_W = 384;
export const WORLD_H = 240;

export type RoomRect = { x: number; y: number; w: number; h: number };

export const ROOMS: Record<LineId, RoomRect> = {
  booth: { x: 8, y: 8, w: 114, h: 70 },
  press: { x: 262, y: 8, w: 114, h: 70 },
  marquee: { x: 8, y: 86, w: 114, h: 70 },
  sprites: { x: 262, y: 86, w: 114, h: 70 },
  gazette: { x: 8, y: 164, w: 114, h: 68 },
  spotlight: { x: 262, y: 164, w: 114, h: 68 },
};
