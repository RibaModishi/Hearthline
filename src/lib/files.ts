import type {
  BoothArtifact,
  CandleArtifact,
  GazetteArtifact,
  MarqueeArtifact,
  Piece,
  PressArtifact,
  ResearchArtifact,
  SpriteArtifact,
  TinArtifact,
} from "@/lib/works";
import { lineById } from "@/lib/works";

const SCALE = [0, 3, 5, 7, 10];

function xml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function slug(title: string) {
  const clean = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48);
  return clean || "piece";
}

function save(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = name;
  link.click();
  URL.revokeObjectURL(url);
}

export function fileLabel(piece: Piece) {
  switch (piece.artifact.kind) {
    case "press":
      return "SVG poster";
    case "candles":
    case "supplements":
      return "SVG label";
    case "marquee":
      return "PNG frame";
    case "sprites":
      return "PNG sheet";
    case "booth":
      return "WAV loop";
    case "gazette":
    case "research":
    case "spotlight":
      return "Text file";
    default:
      return "File";
  }
}

function pressSvg(artifact: PressArtifact) {
  const [bg, ink, accent] = artifact.colors;
  const title = artifact.title.length > 22 ? `${artifact.title.slice(0, 20)}…` : artifact.title;
  let motif = "";
  if (artifact.motif === "stripe") {
    motif = Array.from({ length: 9 }, (_, index) => {
      const fill = index % 2 ? accent : ink;
      const opacity = index % 2 ? 0.95 : 0.18;
      return `<rect x="0" y="${18 + index * 18}" width="200" height="8" fill="${fill}" opacity="${opacity}"/>`;
    }).join("");
  } else if (artifact.motif === "dot") {
    motif = Array.from({ length: 8 }, (_, row) =>
      Array.from({ length: 6 }, (_, col) => {
        const fill = col % 2 ? accent : ink;
        return `<circle cx="${22 + col * 30}" cy="${28 + row * 24}" r="${row % 2 ? 4 : 7}" fill="${fill}" opacity="0.9"/>`;
      }).join(""),
    ).join("");
  } else if (artifact.motif === "block") {
    motif = Array.from({ length: 6 }, (_, index) => {
      const fill = index % 2 ? accent : ink;
      return `<rect x="${16 + (index % 2) * 28}" y="${20 + index * 28}" width="${120 - (index % 3) * 16}" height="16" fill="${fill}"/>`;
    }).join("");
  } else {
    motif = Array.from({ length: 5 }, (_, index) => {
      const stroke = index % 2 ? accent : ink;
      return `<circle cx="100" cy="110" r="${20 + index * 16}" fill="none" stroke="${stroke}" stroke-width="6"/>`;
    }).join("");
  }
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 260" width="200" height="260">
  <rect width="200" height="260" fill="${bg}"/>
  ${motif}
  <rect x="12" y="196" width="176" height="50" fill="${ink}"/>
  <text x="22" y="218" fill="${bg}" font-family="Georgia, serif" font-size="14">${xml(title)}</text>
  <text x="22" y="236" fill="${accent}" font-family="ui-monospace, monospace" font-size="10">${xml(`$${artifact.price} · ${artifact.edition}`)}</text>
</svg>`;
}

function candleSvg(artifact: CandleArtifact) {
  const [bg, paper, accent] = artifact.colors;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 260" width="200" height="260">
  <rect width="200" height="260" fill="${bg}"/>
  <rect x="28" y="36" width="144" height="188" fill="${paper}"/>
  <rect x="28" y="36" width="144" height="18" fill="${accent}"/>
  <text x="40" y="90" fill="${bg}" font-family="ui-monospace, monospace" font-size="12">${xml(artifact.scent.slice(0, 22))}</text>
  <text x="40" y="130" fill="${bg}" font-family="Georgia, serif" font-size="14">${xml(artifact.wax)}</text>
  <text x="40" y="156" fill="${bg}" font-family="Georgia, serif" font-size="14">${xml(artifact.burn)}</text>
</svg>`;
}

function tinSvg(artifact: TinArtifact) {
  const [bg, paper, accent] = artifact.colors;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 140" width="220" height="140">
  <rect width="220" height="140" rx="18" fill="${bg}"/>
  <rect x="16" y="16" width="188" height="108" rx="12" fill="${paper}"/>
  <rect x="16" y="16" width="188" height="16" fill="${accent}"/>
  <text x="28" y="70" fill="${bg}" font-family="ui-monospace, monospace" font-size="13">${xml(artifact.front.slice(0, 24))}</text>
  <text x="28" y="96" fill="${bg}" font-family="Georgia, serif" font-size="11">Label only</text>
</svg>`;
}

export function paintMarquee(ctx: CanvasRenderingContext2D, artifact: MarqueeArtifact) {
  const [bg, ink, accent] = artifact.colors;
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
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
}

export function paintSprites(ctx: CanvasRenderingContext2D, artifact: SpriteArtifact) {
  ctx.imageSmoothingEnabled = false;
  ctx.fillStyle = "#14120e";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
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
}

function canvasBlob(width: number, height: number, paint: (ctx: CanvasRenderingContext2D) => void) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("This browser cannot draw the file.");
  paint(ctx);
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error("The image did not save."))), "image/png");
  });
}

function gazetteText(artifact: GazetteArtifact) {
  const sections = artifact.sections.map((section) => `${section.hed.toUpperCase()}\n${section.body}`).join("\n\n");
  return `HEARTHLINE GAZETTE · ${artifact.issue}\n${artifact.headline}\n${artifact.dek}\n\n${sections}\n`;
}

function researchText(artifact: ResearchArtifact) {
  const room = lineById(artifact.routedTo);
  return `${artifact.title}\nHanded to ${room.agent} in ${room.name}.\n\n${artifact.handoff}\n\n${artifact.findings.map((finding) => `- ${finding}`).join("\n")}\n`;
}

function renderBooth(artifact: BoothArtifact) {
  const sampleRate = 44100;
  const step = 60 / artifact.bpm / 2;
  const steps = 32;
  const total = Math.ceil((step * steps + 0.3) * sampleRate);
  const mix = new Float32Array(total);

  const write = (start: number, seconds: number, sample: (time: number) => number) => {
    const from = Math.floor(start * sampleRate);
    const count = Math.floor(seconds * sampleRate);
    for (let i = 0; i < count; i += 1) {
      const index = from + i;
      if (index >= mix.length) break;
      mix[index] += sample(i / sampleRate);
    }
  };

  for (let stepIndex = 0; stepIndex < steps; stepIndex += 1) {
    const time = stepIndex * step;
    const index = stepIndex % 16;
    if (artifact.kicks[index]) {
      write(time, 0.2, (t) => {
        const freq = t < 0.12 ? 170 * (48 / 170) ** (t / 0.12) : 48;
        const amp = 0.9 * (0.001 / 0.9) ** (t / 0.18);
        return Math.sin(2 * Math.PI * freq * t) * amp;
      });
    }
    if (artifact.hats[index]) {
      let noise = 0;
      write(time, 0.05, (t) => {
        noise = noise * 0.4 + (Math.random() * 2 - 1) * 0.6;
        const amp = 0.18 * (0.001 / 0.18) ** (t / 0.04);
        return noise * amp;
      });
    }
    const degree = artifact.bass[index] ?? -1;
    if (degree >= 0) {
      const freq = 110 * 2 ** ((artifact.root + (SCALE[degree] ?? 0)) / 12);
      write(time, step, (t) => {
        const phase = (t * freq) % 1;
        const wave = phase < 0.5 ? 4 * phase - 1 : 3 - 4 * phase;
        const amp = 0.22 * (0.001 / 0.22) ** (t / (step * 0.9));
        return wave * amp;
      });
    }
  }

  let peak = 0.001;
  for (const sample of mix) peak = Math.max(peak, Math.abs(sample));
  const gain = Math.min(0.9 / peak, 0.45);
  const pcm = new Int16Array(mix.length);
  for (let i = 0; i < mix.length; i += 1) {
    const sample = Math.max(-1, Math.min(1, (mix[i] ?? 0) * gain));
    pcm[i] = sample < 0 ? sample * 0x8000 : sample * 0x7fff;
  }

  const buffer = new ArrayBuffer(44 + pcm.length * 2);
  const view = new DataView(buffer);
  const writeString = (offset: number, value: string) => {
    for (let i = 0; i < value.length; i += 1) view.setUint8(offset + i, value.charCodeAt(i));
  };
  writeString(0, "RIFF");
  view.setUint32(4, 36 + pcm.length * 2, true);
  writeString(8, "WAVE");
  writeString(12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeString(36, "data");
  view.setUint32(40, pcm.length * 2, true);
  for (let i = 0; i < pcm.length; i += 1) view.setInt16(44 + i * 2, pcm[i] ?? 0, true);
  return new Blob([buffer], { type: "audio/wav" });
}

export async function downloadPiece(piece: Piece) {
  const name = slug(piece.artifact.title);
  const artifact = piece.artifact;
  if (artifact.kind === "press") {
    save(new Blob([pressSvg(artifact)], { type: "image/svg+xml" }), `${name}.svg`);
    return;
  }
  if (artifact.kind === "candles") {
    save(new Blob([candleSvg(artifact)], { type: "image/svg+xml" }), `${name}.svg`);
    return;
  }
  if (artifact.kind === "supplements") {
    save(new Blob([tinSvg(artifact)], { type: "image/svg+xml" }), `${name}.svg`);
    return;
  }
  if (artifact.kind === "marquee") {
    save(await canvasBlob(640, 360, (ctx) => paintMarquee(ctx, artifact)), `${name}.png`);
    return;
  }
  if (artifact.kind === "sprites") {
    save(await canvasBlob(360, 78, (ctx) => paintSprites(ctx, artifact)), `${name}.png`);
    return;
  }
  if (artifact.kind === "booth") {
    save(renderBooth(artifact), `${name}.wav`);
    return;
  }
  if (artifact.kind === "gazette") {
    save(new Blob([gazetteText(artifact)], { type: "text/plain" }), `${name}.txt`);
    return;
  }
  if (artifact.kind === "research") {
    save(new Blob([researchText(artifact)], { type: "text/plain" }), `${name}.txt`);
    return;
  }
  const text = artifact.posts.map((post) => `${post.where}\n${post.text}`).join("\n\n");
  save(new Blob([`${artifact.title}\n\n${text}\n`], { type: "text/plain" }), `${name}.txt`);
}
