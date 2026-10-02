"use client";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="mx-auto flex min-h-full w-full max-w-lg flex-col justify-center gap-3 px-4 py-16">
      <p className="font-pixel text-xs text-[#e8a54b]">HEARTHLINE</p>
      <h1 className="font-pixel text-xl">The mill went dark</h1>
      <p className="text-sm leading-relaxed text-muted-foreground">
        Something on the floor failed to render. The benches are still there — light them again.
      </p>
      <button
        type="button"
        onClick={reset}
        className="h-9 w-fit rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground"
      >
        Light it again
      </button>
    </main>
  );
}
