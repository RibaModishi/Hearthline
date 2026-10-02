import type { LineId } from "@/lib/works";

export const WORLD_W = 420;
export const WORLD_H = 312;

export type RoomRect = { x: number; y: number; w: number; h: number };

function room(column: 0 | 1, row: number): RoomRect {
  return { x: column === 0 ? 8 : 292, y: 8 + row * 76, w: 120, h: 68 };
}

export const ROOMS: Record<LineId, RoomRect> = {
  research: room(0, 0),
  press: room(1, 0),
  candles: room(0, 1),
  booth: room(1, 1),
  supplements: room(0, 2),
  sprites: room(1, 2),
  gazette: room(0, 3),
  marquee: room(1, 3),
};
