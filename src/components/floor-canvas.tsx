"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { drawFloor } from "@/lib/draw-floor";
import { ROOMS, WORLD_H, WORLD_W } from "@/lib/map";
import { LINES, lineActivity, type FloorState, type LineId } from "@/lib/works";

const STATUS_LABEL: Record<ReturnType<typeof lineActivity>, string> = {
  working: "working",
  idle: "idle",
  held: "holding",
  paused: "holding",
  jammed: "jammed",
  queued: "queued",
};

export function FloorCanvas({
  state,
  now,
  onSelect,
}: {
  state: FloorState;
  now: number;
  onSelect: (id: LineId) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef(state);
  const nowRef = useRef(now);
  useLayoutEffect(() => {
    stateRef.current = state;
    nowRef.current = now;
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let frame = 0;
    const loop = (time: number) => {
      ctx.imageSmoothingEnabled = false;
      drawFloor(ctx, stateRef.current, nowRef.current, time);
      frame = window.requestAnimationFrame(loop);
    };
    frame = window.requestAnimationFrame(loop);
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="rounded-xl border border-[#6b4a2e] bg-[#14110e] p-2 shadow-[0_24px_60px_rgba(0,0,0,0.35)]">
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={WORLD_W}
          height={WORLD_H}
          className="floor-canvas block h-auto w-full"
          aria-hidden
        />
        {LINES.map((line) => {
          const room = ROOMS[line.id];
          const activity = lineActivity(state, line.id);
          const selected = state.selected === line.id;
          return (
            <button
              key={line.id}
              type="button"
              aria-pressed={selected}
              aria-label={`${line.name}, ${line.agent}, ${STATUS_LABEL[activity]}`}
              onClick={() => onSelect(line.id)}
              className="absolute rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f0c36a]"
              style={{
                left: `${(room.x / WORLD_W) * 100}%`,
                top: `${(room.y / WORLD_H) * 100}%`,
                width: `${(room.w / WORLD_W) * 100}%`,
                height: `${(room.h / WORLD_H) * 100}%`,
              }}
            >
              <span className="pointer-events-none absolute top-1 left-1 bg-black/55 px-1 font-pixel text-[8px] leading-tight text-[#f6e7c1] sm:text-[10px]">
                {line.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
