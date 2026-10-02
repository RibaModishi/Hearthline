"use client";

import { useEffect, useRef, useState } from "react";
import {
  lineById,
  type BoothArtifact,
  type CandleArtifact,
  type GazetteArtifact,
  type MarqueeArtifact,
  type Piece,
  type PressArtifact,
  type ResearchArtifact,
  type SpotlightArtifact,
  type SpriteArtifact,
  type TinArtifact,
} from "@/lib/works";

function PressPoster({ artifact }: { artifact: PressArtifact }) {
  const [bg, ink, accent] = artifact.colors;
  const motif = artifact.motif;
  return (
    <svg viewBox="0 0 200 260" className="w-full max-w-[240px] rounded-md shadow-lg" role="img" aria-label={artifact.title}>
      <rect width="200" height="260" fill={bg} />
      {motif === "stripe" &&
        Array.from({ length: 9 }, (_, index) => (
          <rect key={index} x="0" y={18 + index * 18} width="200" height="8" fill={index % 2 ? accent : ink} opacity={index % 2 ? 0.95 : 0.18} />
        ))}
      {motif === "dot" &&
        Array.from({ length: 8 }, (_, row) =>
          Array.from({ length: 6 }, (_, col) => (
            <circle key={`${row}-${col}`} cx={22 + col * 30} cy={28 + row * 24} r={row % 2 ? 4 : 7} fill={col % 2 ? accent : ink} opacity="0.9" />
          )),
        )}
      {motif === "block" &&
        Array.from({ length: 6 }, (_, index) => (
          <rect
            key={index}
            x={16 + (index % 2) * 28}
            y={20 + index * 28}
            width={120 - (index % 3) * 16}
            height="16"
            fill={index % 2 ? accent : ink}
          />
        ))}
      {motif === "ring" &&
        Array.from({ length: 5 }, (_, index) => (
          <circle key={index} cx="100" cy="110" r={20 + index * 16} fill="none" stroke={index % 2 ? accent : ink} strokeWidth="6" />
        ))}
      <rect x="12" y="196" width="176" height="50" fill={ink} />
      <text x="22" y="218" fill={bg} fontFamily="Georgia, serif" fontSize="14">
        {artifact.title.length > 22 ? `${artifact.title.slice(0, 20)}…` : artifact.title}
      </text>
      <text x="22" y="236" fill={accent} fontFamily="ui-monospace, monospace" fontSize="10">
        {`$${artifact.price} · ${artifact.edition}`}
      </text>
    </svg>
  );
}

function PressView({ artifact }: { artifact: PressArtifact }) {
  return (
    <div className="grid gap-4">
      <PressPoster artifact={artifact} />
      <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-sm">
        <dt className="text-muted-foreground">Price</dt>
        <dd>${artifact.price}</dd>
        <dt className="text-muted-foreground">Edition</dt>
        <dd>{artifact.edition}</dd>
        <dt className="text-muted-foreground">Materials</dt>
        <dd>{artifact.materials}</dd>
      </dl>
      <p className="text-sm leading-relaxed">{artifact.blurb}</p>
    </div>
  );
}

const SCALE = [0, 3, 5, 7, 10];

function BoothView({ artifact }: { artifact: BoothArtifact }) {
  const [playing, setPlaying] = useState(false);
  const [bars, setBars] = useState<number[]>(Array.from({ length: 12 }, () => 4));
  const stopRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    return () => stopRef.current?.();
  }, []);

  function stop() {
    stopRef.current?.();
    stopRef.current = null;
    setPlaying(false);
  }

  function play() {
    stop();
    const ctx = new AudioContext();
    const master = ctx.createGain();
    master.gain.value = 0.35;
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 64;
    master.connect(analyser);
    analyser.connect(ctx.destination);
    const noise = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.08), ctx.sampleRate);
    const data = noise.getChannelData(0);
    for (let i = 0; i < data.length; i += 1) data[i] = Math.random() * 2 - 1;

    const step = 60 / artifact.bpm / 2;
    let next = ctx.currentTime + 0.05;
    let stepIndex = 0;
    let timer = 0;
    let raf = 0;

    const kick = (time: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(170, time);
      osc.frequency.exponentialRampToValueAtTime(48, time + 0.12);
      gain.gain.setValueAtTime(0.9, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.18);
      osc.connect(gain);
      gain.connect(master);
      osc.start(time);
      osc.stop(time + 0.2);
    };

    const hat = (time: number) => {
      const source = ctx.createBufferSource();
      source.buffer = noise;
      const filter = ctx.createBiquadFilter();
      filter.type = "highpass";
      filter.frequency.value = 6000;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.18, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.04);
      source.connect(filter);
      filter.connect(gain);
      gain.connect(master);
      source.start(time);
      source.stop(time + 0.05);
    };

    const bass = (time: number, degree: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const freq = 110 * 2 ** ((artifact.root + (SCALE[degree] ?? 0)) / 12);
      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, time);
      gain.gain.setValueAtTime(0.22, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + step * 0.9);
      osc.connect(gain);
      gain.connect(master);
      osc.start(time);
      osc.stop(time + step);
    };

    const pump = () => {
      const horizon = ctx.currentTime + 0.25;
      while (next < horizon) {
        const index = stepIndex % 16;
        if (artifact.kicks[index]) kick(next);
        if (artifact.hats[index]) hat(next);
        const note = artifact.bass[index] ?? -1;
        if (note >= 0) bass(next, note);
        next += step;
        stepIndex += 1;
      }
      timer = window.setTimeout(pump, 80);
    };

    const paint = () => {
      const bins = new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteFrequencyData(bins);
      setBars(Array.from({ length: 12 }, (_, index) => 4 + (bins[index] ?? 0) / 8));
      raf = window.requestAnimationFrame(paint);
    };

    pump();
    paint();
    setPlaying(true);
    stopRef.current = () => {
      window.clearTimeout(timer);
      window.cancelAnimationFrame(raf);
      void ctx.close();
    };
  }

  return (
    <div className="grid gap-4">
      <div className="flex h-16 items-end gap-1 rounded-md bg-black/40 px-3 py-2">
        {bars.map((height, index) => (
          <span
            key={index}
            className="w-full rounded-sm bg-[#7aa2ff]"
            style={{ height: `${Math.min(56, height)}px` }}
          />
        ))}
      </div>
      <div className="grid grid-cols-[repeat(16,minmax(0,1fr))] gap-1" aria-hidden>
        {artifact.kicks.map((on, index) => (
          <span key={index} className={`h-2 rounded-sm ${on ? "bg-[#e2b15a]" : "bg-white/10"}`} />
        ))}
      </div>
      <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-sm">
        <dt className="text-muted-foreground">Tempo</dt>
        <dd>{artifact.bpm} bpm</dd>
        <dt className="text-muted-foreground">Key</dt>
        <dd>{artifact.keyName}</dd>
      </dl>
      <button
        type="button"
        onClick={playing ? stop : play}
        className="h-9 rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground"
      >
        {playing ? "Stop the loop" : "Play the loop"}
      </button>
    </div>
  );
}

function MarqueeView({ artifact }: { artifact: MarqueeArtifact }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const [bg, ink, accent] = artifact.colors;
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = accent;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(180, 0);
    ctx.lineTo(0, 140);
    ctx.fill();
    ctx.fillStyle = ink;
    ctx.font = "600 13px ui-monospace, monospace";
    ctx.fillText(artifact.kicker, 28, 48);
    ctx.font = "700 34px Georgia, serif";
    const words = artifact.headline.split(" ");
    const lines: string[] = [];
    let current = "";
    for (const word of words) {
      const test = current ? `${current} ${word}` : word;
      if (ctx.measureText(test).width > 420 && current) {
        lines.push(current);
        current = word;
      } else {
        current = test;
      }
    }
    if (current) lines.push(current);
    lines.slice(0, 3).forEach((line, index) => {
      ctx.fillText(line, 28, 100 + index * 40);
    });
    ctx.globalAlpha = 0.8;
    ctx.font = "16px Georgia, serif";
    ctx.fillText(artifact.sub, 28, 250);
    ctx.globalAlpha = 1;
  }, [artifact]);

  return <canvas ref={ref} width={640} height={360} className="w-full rounded-md" aria-label={artifact.headline} />;
}

function SpriteView({ artifact }: { artifact: SpriteArtifact }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.imageSmoothingEnabled = false;
    ctx.fillStyle = "#14120e";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    artifact.sprites.forEach((sprite, index) => {
      const originX = 16 + index * 56;
      sprite.pixels.forEach((row, y) => {
        row.forEach((value, x) => {
          if (!value) return;
          ctx.fillStyle = sprite.palette[value] ?? "#fff";
          ctx.fillRect(originX + x * 3, 18 + y * 3, 3, 3);
        });
      });
    });
  }, [artifact]);

  return (
    <div className="grid gap-3">
      <canvas ref={ref} width={360} height={78} className="w-full rounded-md [image-rendering:pixelated]" aria-label={artifact.title} />
      <p className="text-sm leading-relaxed">{artifact.note}</p>
    </div>
  );
}

function GazetteView({ artifact }: { artifact: GazetteArtifact }) {
  return (
    <article className="rounded-md bg-[#f3ead7] p-5 text-[#2a2118]">
      <p className="font-pixel text-[10px] tracking-wide">HEARTHLINE GAZETTE · {artifact.issue}</p>
      <h3 className="mt-2 font-serif text-2xl leading-tight">{artifact.headline}</h3>
      <p className="mt-2 text-sm italic">{artifact.dek}</p>
      <div className="mt-4 grid gap-4">
        {artifact.sections.map((section) => (
          <section key={section.hed}>
            <h4 className="text-xs font-semibold tracking-wide uppercase">{section.hed}</h4>
            <p className="mt-1 text-sm leading-relaxed">{section.body}</p>
          </section>
        ))}
      </div>
    </article>
  );
}

function SpotlightView({ artifact }: { artifact: SpotlightArtifact }) {
  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-4 gap-2">
        {artifact.frames.map((frame) => (
          <div key={frame.label} className="flex aspect-[3/4] items-end rounded-md p-2 text-xs font-medium text-[#1a1208]" style={{ background: frame.color }}>
            {frame.label}
          </div>
        ))}
      </div>
      <ul className="grid gap-2">
        {artifact.posts.map((post) => (
          <li key={post.where} className="rounded-lg border px-3 py-2">
            <p className="text-xs text-muted-foreground">{post.where}</p>
            <p className="text-sm leading-relaxed">{post.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CandleView({ artifact }: { artifact: CandleArtifact }) {
  const [bg, paper, accent] = artifact.colors;
  return (
    <div className="grid gap-3">
      <svg viewBox="0 0 200 260" className="w-full max-w-[220px] rounded-md" role="img" aria-label={artifact.title}>
        <rect width="200" height="260" fill={bg} />
        <rect x="28" y="36" width="144" height="188" fill={paper} />
        <rect x="28" y="36" width="144" height="18" fill={accent} />
        <text x="40" y="90" fill={bg} fontFamily="ui-monospace, monospace" fontSize="12">
          {artifact.scent.slice(0, 22)}
        </text>
        <text x="40" y="130" fill={bg} fontFamily="Georgia, serif" fontSize="14">
          {artifact.wax}
        </text>
        <text x="40" y="156" fill={bg} fontFamily="Georgia, serif" fontSize="14">
          {artifact.burn}
        </text>
      </svg>
      <p className="text-sm">${artifact.price} on the station ledger. The label is a picture, not a candle you can buy.</p>
    </div>
  );
}

function TinView({ artifact }: { artifact: TinArtifact }) {
  const [bg, paper, accent] = artifact.colors;
  return (
    <div className="grid gap-3">
      <svg viewBox="0 0 220 140" className="w-full rounded-md" role="img" aria-label={artifact.title}>
        <rect width="220" height="140" rx="18" fill={bg} />
        <rect x="16" y="16" width="188" height="108" rx="12" fill={paper} />
        <rect x="16" y="16" width="188" height="16" fill={accent} />
        <text x="28" y="70" fill={bg} fontFamily="ui-monospace, monospace" fontSize="13">
          {artifact.front.slice(0, 24)}
        </text>
        <text x="28" y="96" fill={bg} fontFamily="Georgia, serif" fontSize="11">
          Label only
        </text>
      </svg>
      <p className="text-sm">{artifact.note}</p>
    </div>
  );
}

function ResearchView({ artifact }: { artifact: ResearchArtifact }) {
  const room = lineById(artifact.routedTo);
  return (
    <div className="grid gap-3 text-sm">
      <p>
        Handed to {room.agent} in {room.name}.
      </p>
      <p className="text-muted-foreground">“{artifact.handoff}”</p>
      <ul className="grid gap-2">
        {artifact.findings.map((finding) => (
          <li key={finding} className="rounded-md border px-3 py-2">
            {finding}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function PieceView({ piece }: { piece: Piece }) {
  const artifact = piece.artifact;
  if (artifact.kind === "press") return <PressView artifact={artifact} />;
  if (artifact.kind === "booth") return <BoothView artifact={artifact} />;
  if (artifact.kind === "marquee") return <MarqueeView artifact={artifact} />;
  if (artifact.kind === "sprites") return <SpriteView artifact={artifact} />;
  if (artifact.kind === "gazette") return <GazetteView artifact={artifact} />;
  if (artifact.kind === "candles") return <CandleView artifact={artifact} />;
  if (artifact.kind === "supplements") return <TinView artifact={artifact} />;
  if (artifact.kind === "research") return <ResearchView artifact={artifact} />;
  return <SpotlightView artifact={artifact} />;
}
