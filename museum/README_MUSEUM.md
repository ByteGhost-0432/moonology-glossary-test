# The Moonology Art Gallery Museum — build notes (kept for future resale)

**What it is:** a walk-through Art Deco / Egyptian Revival gallery that runs in any modern browser.
One HTML file (`index.html`) + an `assets/` folder. No build step, no server code, no accounts.
Live copy: https://test.moonologyartgallery.com/museum/  ·  deep links: Moon Room `?room=2` · cactus gallery `?room=gallery` · elevator `?room=lift` · Room 03 `?room=3`

## Layout
Room 01 (the shabti + 4 Thoth/Ma'at pieces) → the Hall (lotus frieze, hanging signs)
→ side halls: **+x** runs into the **Cactus & Succulent Gallery** (9 plants modelled in code) → an Art Deco
**elevator** (call button, needle dial, security cameras, ding, music) → **Room 03 · The Hall of Ma'at** on the
lower level (y −8): 9 framed pieces + The Balance sculpture. **−x** still ends at the sealed **Room 04** door.
→ Room 02 · The Moons (7 moon hours, reflecting pool under an open sky).

## Rights (checked 2026-10-12; Room 03 wing 2026-10-16 — re-check before any sale or licence)
| Asset | Source | Licence |
|---|---|---|
| shabti.jpg | The Met 15.2.10 (object 544492) | Met Open Access, public domain |
| thoth_ibis_inlay / maat_figure / ibis_feather / ostracon_ramesses | The Met 26.7.992 · 59.26.1 · 26.7.873 · 14.6.215 | Met Open Access, public domain |
| moon.jpg, moon_luna.jpg | NASA SVS 4720 (CGI Moon Kit) | NASA, public domain |
| moon_europa / moon_mimas / moon_io | NASA PIA19048 · PIA12570 · PIA02308 | NASA, public domain |
| moon_titan / moon_enceladus / moon_ganymede | globes rendered by Moonology from NASA PIA22770 · PIA18435 · USGS colour mosaic | NASA / USGS, public domain |
| r3_nakhtamun / r3_ring / r3_maat / r3_scarab / r3_painedjem / r3_anubis | The Met 33.8.21 · 11.215.97 · 21.6.51 · 25.3.163 (Met image EGDP031780) · 22.2.24 · 69.105 — all checked at the Met collection API 2026-10-16 | Met Open Access, public domain |
| r3_thoth.jpg | Art Institute of Chicago 1894.190 (artwork 140921), checked at api.artic.edu 2026-10-16 | CC0 / public domain |
| r3_ani.jpg | Papyrus of Ani (British Museum EA10470,3), facsimile plate by E. A. Wallis Budge, 1913; printed caption column cropped | public domain |
| r3_hunefer.jpg | Papyrus of Hunefer, judgment scene, via Wikimedia Commons | public domain |
| elevator_calm_beatv2_loop31.m4a | "calm_beatv2", Lawrence Eubanks III's own composition (31 s seamless loop) | owned by Eubanks-Entertainment |
| three.js 0.160.0 (loaded from jsDelivr) | mrdoob/three.js | **MIT** — keep its copyright notice with any copy that is sold or redistributed |
| everything else (rooms, columns, bonsai, cacti, elevator, sculpture, signs, pool, ding, code) | written for Moonology Art Gallery | owned by Eubanks-Entertainment |

**Rules that travel with it:** never imply NASA or the Met endorse the museum or a buyer's use;
no NASA insignia/logotype; NASA refuses NFT use of its imagery. A buyer gets the code and the
public-domain files; the Moonology name, the ℠/™ marks and the curation text are not part of a sale
unless written into the deal.

## Swapping content (how a buyer would re-use it)
- Room 01 pieces: the `hang(...)` calls after "side-wall art" and the shabti block. Each takes an image,
  aspect ratio, position and a label `{ k, t, lines, watch? }`.
- Room 02: the `hang('moon_…')` calls. `watch` adds a "▶ Watch" button to the label.
- New rooms: open the sealed door at the end of a side hall (search "the sealed door").
- Mirrors: `mirror(parent, x, y, z, ry, w, h, zone)`. Each arrival picks a random piece from `MIRROR_POOL` (images already in `assets/`) that fades up in the glass, then a Like & Subscribe line breathes in and out. The elevator has one; any new mirror built with `mirror()` behaves the same.
- ↻ / T turns the visitor 180°.
- Room 03: the `hang('r3_…')` calls; the plants are the `SPEC` list (kind · plaque · facts). `?elevtest` runs a scripted ride for checking.
- Film mode: `?tour` renders the 76 s vertical tour (1080×1920, 25 fps) frame by frame.
