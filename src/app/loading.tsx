export default function Loading() {
  return (
    <main className="mx-auto flex min-h-full w-full max-w-6xl flex-col gap-4 px-4 py-8">
      <p className="text-sm tracking-[0.18em]">PRODUCTION TERMINAL</p>
      <div className="aspect-[384/240] animate-pulse rounded-xl bg-card" />
      <p className="text-sm text-muted-foreground">Bringing the terminal up…</p>
    </main>
  );
}
