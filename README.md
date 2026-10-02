# Hearthline

A small mill you can watch. Six specialists keep work moving on belts: print goods, a music loop, a title frame, a sprite bundle, a gazette, and a set of short notices.

Drop a brief on a line and follow it through intake, draft, make, and pack. Finished pieces land on the dock. Music loops play in the browser. Nothing is sent to a server, and no API key is required.

This is an original floor inspired by the idea in [@androo.agi’s “AI Ecosystem Tour”](https://www.instagram.com/reel/Dd7XBExRZQy/) — factory rooms and conveyor belts you can see working — built as a self-contained web app.

## Run it

```bash
npm install
npm run dev
```

Open [http://127.0.0.1:4317](http://127.0.0.1:4317).

The floor remembers briefs, the dock, and holds in `localStorage`. **Reset sample** brings back the six starter briefs.

A brief that contains the word “jam” stalls while packing, so the retry path is easy to find.
