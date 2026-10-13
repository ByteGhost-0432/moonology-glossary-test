# The Moon Museum — build notes (kept for future resale)

**What it is:** a walk-through Art Deco / Egyptian Revival gallery that runs in any modern browser.
One HTML file (`index.html`) + an `assets/` folder. No build step, no server code, no accounts.
Live copy: https://test.moonologyartgallery.com/museum/  ·  deep link to the Moon Room: `?room=2`

## Layout
Room 01 (the shabti + 4 Thoth/Ma'at pieces) → the Hall (lotus frieze, hanging signs)
→ side halls to sealed doors **Room 03** (+x) and **Room 04** (−x), ready for new rooms
→ Room 02 · The Moons (7 moon hours, reflecting pool under an open sky).

## Rights (checked 2026-10-12, re-check before any sale or licence)
| Asset | Source | Licence |
|---|---|---|
| shabti.jpg | The Met 15.2.10 (object 544492) | Met Open Access, public domain |
| thoth_ibis_inlay / maat_figure / ibis_feather / ostracon_ramesses | The Met 26.7.992 · 59.26.1 · 26.7.873 · 14.6.215 | Met Open Access, public domain |
| moon.jpg, moon_luna.jpg | NASA SVS 4720 (CGI Moon Kit) | NASA, public domain |
| moon_europa / moon_mimas / moon_io | NASA PIA19048 · PIA12570 · PIA02308 | NASA, public domain |
| moon_titan / moon_enceladus / moon_ganymede | globes rendered by Moonology from NASA PIA22770 · PIA18435 · USGS colour mosaic | NASA / USGS, public domain |
| three.js 0.160.0 (loaded from jsDelivr) | mrdoob/three.js | **MIT** — keep its copyright notice with any copy that is sold or redistributed |
| everything else (rooms, columns, bonsai, signs, pool, code) | written for Moonology Art Gallery | owned by Eubanks-Entertainment |

**Rules that travel with it:** never imply NASA or the Met endorse the museum or a buyer's use;
no NASA insignia/logotype; NASA refuses NFT use of its imagery. A buyer gets the code and the
public-domain files; the Moonology name, the ℠/™ marks and the curation text are not part of a sale
unless written into the deal.

## Swapping content (how a buyer would re-use it)
- Room 01 pieces: the `hang(...)` calls after "side-wall art" and the shabti block. Each takes an image,
  aspect ratio, position and a label `{ k, t, lines, watch? }`.
- Room 02: the `hang('moon_…')` calls. `watch` adds a "▶ Watch" button to the label.
- New rooms: open the sealed door at the end of a side hall (search "the sealed door").
- Film mode: `?tour` renders the 76 s vertical tour (1080×1920, 25 fps) frame by frame.
