"use client";

import { useEffect, useState, type FormEvent } from "react";
import { FloorCanvas } from "@/components/floor-canvas";
import { PieceView } from "@/components/piece-view";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import {
  STAGES,
  autonomousOutput,
  clearDock,
  createSample,
  enqueue,
  jobsFor,
  lineActivity,
  lineById,
  loadState,
  pieceValue,
  narration,
  overallProgress,
  removeJob,
  retryJob,
  saveState,
  setHeld,
  setLinePaused,
  setSelected,
  tick,
  type FloorState,
  type LineId,
} from "@/lib/works";

const ACTIVITY_LABEL = {
  working: "Working",
  idle: "Idle",
  held: "Holding",
  paused: "Holding",
  jammed: "Jammed",
  queued: "Queued",
} as const;

function clock(value: number) {
  return new Date(value).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

function FloorSkeleton() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-4 px-4 py-6">
      <div className="h-16 animate-pulse rounded-xl bg-card" />
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(300px,0.8fr)]">
        <div className="aspect-[384/240] animate-pulse rounded-xl bg-card" />
        <div className="h-80 animate-pulse rounded-xl bg-card" />
      </div>
      <p className="text-sm text-muted-foreground">Bringing the terminal up…</p>
    </main>
  );
}

export function WorksApp() {
  const [state, setState] = useState<FloorState | null>(null);
  const [now, setNow] = useState(0);
  const [brief, setBrief] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    const started = Date.now();
    const initial = loadState() ?? createSample(started);
    // The floor is read from localStorage after mount so the server skeleton matches.
    /* eslint-disable react-hooks/set-state-in-effect -- one-time client hydrate */
    setNow(started);
    setState(initial);
    /* eslint-enable react-hooks/set-state-in-effect */
    const id = window.setInterval(() => {
      const next = Date.now();
      setNow(next);
      setState((current) => (current ? tick(current, next) : current));
    }, 200);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    if (state) saveState(state);
  }, [state]);

  if (!state) return <FloorSkeleton />;

  const line = lineById(state.selected);
  const activity = lineActivity(state, line.id);
  const queue = jobsFor(state, line.id);
  const head = queue[0];
  const openPiece = state.dock.find((piece) => piece.id === openId) ?? null;
  const moving = LINES_MOVING(state);
  const output = autonomousOutput(state.dock);
  const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(output);
  const dockNote =
    state.dock.length === 0 && state.jobs.length > 0
      ? "Nothing has finished yet. The belts are still carrying the sample briefs."
      : state.dock.length === 0
        ? "The dock is empty and the belts are clear."
        : null;

  function select(id: LineId) {
    setFormError(null);
    setState((current) => (current ? setSelected(current, id) : current));
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!state) return;
    const result = enqueue(state, state.selected, brief, Date.now());
    setFormError(result.error ?? null);
    if (!result.error) setBrief("");
    setState(result.state);
  }

  return (
    <div className="crt min-h-full">
      <header className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 pt-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[10px] tracking-[0.22em] text-primary">HEARTHLINE</p>
          <h1 className="text-xl tracking-wide text-foreground sm:text-2xl">PRODUCTION TERMINAL</h1>
          <p className="mt-1 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Six zones on one map. A brief rides the belt to the dock, and the tally on this screen is the only ledger.
          </p>
        </div>
        <div className="rounded-md border bg-card/80 px-4 py-3">
          <p className="text-[10px] tracking-[0.18em] text-primary">AUTONOMOUS OUTPUT</p>
          <p className="text-3xl leading-none text-foreground">{money}</p>
          <p className="mt-2 text-xs text-muted-foreground">
            {state.dock.length === 1 ? "1 piece" : `${state.dock.length} pieces`} · {moving} live
          </p>
          <p className="mt-1 max-w-xs text-xs text-muted-foreground">Priced on this terminal. Nothing is listed for sale.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button
            type="button"
            variant="secondary"
            onClick={() => setState((current) => (current ? setHeld(current, !current.held, Date.now()) : current))}
          >
            {state.held ? "Resume output" : "Halt output"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setOpenId(null);
              setBrief("");
              setFormError(null);
              setState(createSample(Date.now()));
            }}
          >
            Reset sample
          </Button>
        </div>
      </header>

      <main className="mx-auto grid w-full max-w-6xl gap-4 px-4 py-4 lg:grid-cols-[minmax(0,1.45fr)_minmax(300px,0.78fr)]">
        <section className="grid gap-3">
          <FloorCanvas state={state} now={now} onSelect={select} />
          <p className="sr-only" aria-live="polite">
            {narration(state, line.id)}
          </p>
          <p className="text-sm leading-relaxed text-foreground/90">{narration(state, line.id)}</p>
          <div>
            <p className="text-[10px] tracking-[0.18em] text-primary">PRODUCTION CAMERAS</p>
            {state.dock.length === 0 ? (
              <p className="mt-2 text-sm text-muted-foreground">The four cameras fill in when the first piece hits the dock.</p>
            ) : (
              <ul className="mt-2 grid grid-cols-2 gap-2">
                {state.dock.slice(0, 4).map((piece) => {
                  const owner = lineById(piece.lineId);
                  return (
                    <li key={piece.id}>
                      <button
                        type="button"
                        onClick={() => setOpenId(piece.id)}
                        className="flex h-full w-full flex-col justify-between rounded-md border bg-black/30 px-3 py-2 text-left hover:bg-muted"
                      >
                        <span className="text-[10px] tracking-wide text-primary uppercase">{owner.name}</span>
                        <span className="mt-2 line-clamp-2 text-sm">{piece.artifact.title}</span>
                        <span className="mt-2 text-xs text-muted-foreground">
                          {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(pieceValue(piece))}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
          <ul className="grid max-h-28 gap-1 overflow-auto text-xs text-muted-foreground">
            {state.log.slice(0, 8).map((entry) => (
              <li key={entry.id}>
                <span className="text-primary/80">{clock(entry.at)}</span> {entry.text}
              </li>
            ))}
          </ul>
        </section>

        <section className="flex flex-col gap-4 rounded-xl border bg-card p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-sm tracking-[0.16em] uppercase">{line.name}</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {line.agent} · {line.role}
              </p>
            </div>
            <Badge variant={activity === "jammed" ? "destructive" : "secondary"}>{ACTIVITY_LABEL[activity]}</Badge>
          </div>
          <p className="text-sm leading-relaxed">{line.blurb}</p>

          {head ? (
            <div className="rounded-lg border bg-background/40 p-3">
              <p className="text-xs text-muted-foreground">
                {head.fault ? "Stalled during pack" : STAGES[head.stageIndex].label}
              </p>
              <p className="mt-1 text-sm">{head.brief}</p>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full bg-primary"
                  style={{ width: `${head.fault ? 100 : Math.round(overallProgress(head, now) * 100)}%` }}
                />
              </div>
              <ol className="mt-2 grid grid-cols-4 gap-1 text-[10px] text-muted-foreground">
                {STAGES.map((stage, index) => (
                  <li key={stage.id} className={index <= head.stageIndex ? "text-foreground" : undefined}>
                    {stage.label}
                  </li>
                ))}
              </ol>
              {head.fault ? (
                <div className="mt-3 grid gap-2">
                  <p className="text-sm text-destructive">{head.fault}</p>
                  <div className="flex gap-2">
                    <Button type="button" size="sm" onClick={() => setState((current) => (current ? retryJob(current, head.id, Date.now()) : current))}>
                      Retry pack
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => setState((current) => (current ? removeJob(current, head.id, Date.now()) : current))}
                    >
                      Take it off
                    </Button>
                  </div>
                </div>
              ) : null}
            </div>
          ) : (
            <p className="rounded-lg border border-dashed px-3 py-3 text-sm leading-relaxed text-muted-foreground">
              This belt is clear. Write a brief and {line.agent} will take it through intake, draft, make, and pack.
            </p>
          )}

          <form onSubmit={submit} className="grid gap-2">
            <label htmlFor="brief" className="text-sm font-medium">
              Brief for {line.agent}
            </label>
            <Textarea
              id="brief"
              value={brief}
              placeholder={line.placeholder}
              aria-invalid={formError ? true : undefined}
              onChange={(event) => {
                setBrief(event.target.value);
                if (formError) setFormError(null);
              }}
            />
            {formError ? <p className="text-sm text-destructive">{formError}</p> : null}
            <div className="flex items-center justify-between gap-2">
              <Button type="submit">Put it on the belt</Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() =>
                  setState((current) =>
                    current ? setLinePaused(current, line.id, !current.paused[line.id], Date.now()) : current,
                  )
                }
              >
                {state.paused[line.id] ? `Let ${line.agent} run` : `Hold ${line.agent}`}
              </Button>
            </div>
          </form>

          {queue.length > 1 ? (
            <div>
              <h3 className="text-xs font-medium tracking-wide text-muted-foreground uppercase">Waiting</h3>
              <ul className="mt-2 grid gap-1">
                {queue.slice(1).map((job) => (
                  <li key={job.id} className="flex items-center justify-between gap-2 text-sm">
                    <span className="truncate">{job.brief}</span>
                    <Button type="button" variant="ghost" size="xs" onClick={() => setState((current) => (current ? removeJob(current, job.id, Date.now()) : current))}>
                      Remove
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <Separator />

          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-medium tracking-wide text-muted-foreground uppercase">On the dock</h3>
              <Button type="button" variant="ghost" size="xs" onClick={() => setState((current) => (current ? clearDock(current, Date.now()) : current))} disabled={state.dock.length === 0}>
                Clear
              </Button>
            </div>
            {dockNote ? <p className="text-sm text-muted-foreground">{dockNote}</p> : null}
            <ul className="grid max-h-64 gap-2 overflow-auto">
              {state.dock.map((piece) => {
                const owner = lineById(piece.lineId);
                return (
                  <li key={piece.id}>
                    <button
                      type="button"
                      onClick={() => setOpenId(piece.id)}
                      className="w-full rounded-lg border px-3 py-2 text-left hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                    >
                      <span className="block text-sm">{piece.artifact.title}</span>
                      <span className="text-xs text-muted-foreground">
                        {owner.name} · {owner.agent} · {clock(piece.finishedAt)}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      </main>

      <footer className="mx-auto w-full max-w-6xl px-4 pb-8 text-xs leading-relaxed text-muted-foreground">
        A bright border is the zone you are commanding. Dots leave a trail while they work. A brief containing the word “jam” stalls the pack so you can retry it.
      </footer>

      <Sheet open={openPiece != null} onOpenChange={(open) => { if (!open) setOpenId(null); }}>
        <SheetContent className="w-full overflow-y-auto sm:max-w-md" side="right">
          {openPiece ? (
            <>
              <SheetHeader>
                <SheetTitle>{openPiece.artifact.title}</SheetTitle>
                <SheetDescription>
                  {lineById(openPiece.lineId).name} · from “{openPiece.brief}”
                </SheetDescription>
              </SheetHeader>
              <div className="px-4 pb-6">
                <PieceView piece={openPiece} />
              </div>
            </>
          ) : null}
        </SheetContent>
      </Sheet>
    </div>
  );
}

function LINES_MOVING(state: FloorState) {
  return (["press", "booth", "marquee", "sprites", "gazette", "spotlight"] as const).filter(
    (id) => lineActivity(state, id) === "working",
  ).length;
}
