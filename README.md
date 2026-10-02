# Hearthline

A command station you can watch. Eight rooms each have a terminal: research, printworks, candle labels, tin labels, a music booth called Vibes, sprite bundles, thumbnail frames, and a gazette. Research hands a tighter brief to the room that should make it. Finished pieces show up on the cameras.

The autonomous output tally is the sum of prices on this screen. Nothing is listed for sale, and nothing leaves the browser.

This is an original terminal inspired by [@androo.agi’s “AI Ecosystem Tour”](https://www.instagram.com/reel/Dd7XBExRZQy/): a zone map, a camera grid, a green log, and a running output figure.

## Run it

```bash
npm install
npm run dev
```

Open [http://127.0.0.1:4317](http://127.0.0.1:4317).

The floor remembers briefs, the dock, and holds in `localStorage`. **Reset sample** brings back the six starter briefs.

A brief that contains the word “jam” stalls while packing, so the retry path is easy to find.
