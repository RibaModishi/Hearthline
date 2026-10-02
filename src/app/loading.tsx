export default function Loading() {
  return (
    <main className="mx-auto flex min-h-full w-full max-w-6xl flex-col gap-4 px-4 py-8">
      <p className="font-pixel text-sm">Hearthline</p>
      <div className="aspect-[384/240] animate-pulse rounded-xl bg-card" />
      <p className="text-sm text-muted-foreground">Lighting the lamps…</p>
    </main>
  );
}
