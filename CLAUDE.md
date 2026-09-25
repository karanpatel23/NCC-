# CLAUDE.md — nccinfraspace.com rebuild

## What this repo is

A from-scratch rebuild of **https://nccinfraspace.com/**, the website of NCC Infraspace
Pvt Ltd (trading tagline: "Nataraj Construction Company").

**The original website source HAS been recovered** (September 2026, from `medley-main.zip`).
This supersedes the long-standing statement that no source existed. The recovered material is
the front-end Create React App project — components, routes, styling, a local copy of the
*On-hand* project dataset (57 records), the original logo artwork at full resolution, client
logos, director portraits and the Lambda handler sources. It is extracted, analysed and
inventoried at `~/Desktop/ncc-source-extraction/`; start with `pack/00-FINDINGS.md`.

**Be precise about what was NOT recovered.** There is still no access to the live database,
and the site's three remote datasets — `Completed-proj-data.json`, `Awarded-proj-data.json`
and `Gallery-data.json` — exist only as S3 **URLs** in `src/common/Constants.js`. Their
response data is absent. Completed-project records therefore remain unrecovered, and the
endpoints have deliberately never been called. There is also still no vector logo master and
no company-profile PDF.

The live public website remains the reference for what currently *renders*; the recovered
source is now the reference for what the site was *built from*.

## Current phase

**PHASE 4 — REBUILD.** The gates are cleared; building is now the work.

| Phase | Status | Gate to advance |
|---|---|---|
| 0 — Remote recon | ✅ Complete | `docs/00-phase0-forensic-report.md` |
| 1 — Browser extraction | ✅ Complete | `forensics/out/HANDOFF-INPUT.md` exists and is populated |
| 2 — Full forensic report | ⏭️ Skipped | Superseded — the owner went straight to requirements |
| 3 — Requirements | ✅ Complete | `docs/01-requirements.md`, written by the repo owner |
| 4 — Rebuild | 🔄 In progress | See the A–H sub-phases in `docs/01-requirements.md` §10 |

### Phase 4 sub-phases (`docs/01-requirements.md` §10)

| | Deliverable | Status |
|---|---|---|
| A | Scaffold, design tokens, fonts, layout primitives, header/footer | ✅ Complete |
| B | **No CMS (R6).** `content/` tree, Zod schemas, loader, `content:check` | ✅ Gate closed |
| C | Static homepage — hero, ongoing, capabilities, numbers | ✅ Complete |
| D | Projects index + detail template + milestone timeline | ✅ Built |
| D.5 | **Image corridor** — added by R3 §4, unblocked by R4 §2.2 | ✅ Built (gradients) |
| E | Motion: chainage rail, reveals, counters, card lift | ✅ Built (marquee blocked) |
| F | 3D project map — **optional since R3 §4**; the corridor took its job | ⬜ |
| G | Remaining pages — `/about` ✅ `/contact` ✅ `/capabilities` ✅ · `/credentials` `/careers` `/csr` ⛔ held, see R19 §3–4 | 🔄 |
| H | SEO, JSON-LD, OG images, sitemap, a11y, Lighthouse | ⬜ |

**R8 landed between E and G**: the original logo lockup, `/about`, `/contact`, and the
project-status reconciliation. See `docs/01-requirements-r8.md`.

### Requirements are layered — read all of them, latest wins
| File | Carries | Palette status |
|---|---|---|
| `docs/01-requirements.md` | the main brief | §4.1 "Signboard" — **superseded** |
| `docs/01-requirements-r2.md` | light-only, brand assets, Nataraja rules | §2 "Brass & Indigo" — **superseded** |
| `docs/01-requirements-r3.md` | replaces main §4.1 palette and §6.1 hero | §1 "Brass & Midnight" — **superseded** |
| `docs/01-requirements-r4.md` | deletes `--onyx`; corridor on gradients | §1 amendment — **superseded** |
| `docs/01-requirements-r5.md` | corridor gradients + scrim | §2 four-colour — **superseded** |
| `docs/01-requirements-r6.md` | **no CMS** — typed MDX in `content/`, Zod at build | — |
| `docs/01-requirements-r7.md` | **THE LIVE PALETTE**, closed by the owner | §1 five-colour — **LIVE** |
| `docs/01-requirements-r8.md` | **owner decisions** — logo, contact, completed status, no completion dates | — reaffirms R7 |
| `docs/01-requirements-r9.md` | **visual revision** — pure white, simplified logo, no location lead | §1 amends R7 |
| `docs/01-requirements-r10.md` | **logo refinement** — lossless master, `INFRASPACE PVT. LTD.`, larger mark | — amends R9 §2 |
| `docs/01-requirements-r11.md` | **full portfolio** — 57 projects, optional fields, no aggregate value | — |
| `docs/01-requirements-r12.md` | **homepage blueprint** — scroll-drawn road plan after the hero | — |
| `docs/01-requirements-r13.md` | **blueprint rework** — interchange composition, geometry-following reveal | — supersedes R12 artwork |
| `docs/01-requirements-r15.md` | **editorial section** — text + photograph, replacing the cancelled machinery animation | — |
| `docs/01-requirements-r16.md` | **the approved bridge composition** — full-bleed artwork, copy at 3.5%; provenance-comment fix | — |
| `docs/01-requirements-r17.md` | **responsive correction** — two-column tablet, single-column phone, asset recoloured onto the site navy | — palette untouched |
| `docs/01-requirements-r18.md` | **Projects = engineering files** — stacked dossier sheets, search + category filter, no decorative numbering | — |
| `docs/01-requirements-r19.md` | **approved navigation** — Projects · Expertise · Company ▾ · CSR · Contact; Expertise built, three pages held | — |
| `docs/01-requirements-r20.md` | **owner approvals applied** — capability registry, Careers, CSR; `/credentials` blocked on the missing certificate | — |
| `docs/01-requirements-r21.md` | **owner decisions** — canonical /projects, Clients page, About rebuild, India-wide positioning | — |
| `docs/01-requirements-r15.md` | **post-hero introduction** — editorial text + photograph, no animation | — R14 machinery was rejected, never built |

**R2 arrived after R3 and R4 were built.** Its §2 palette is two revisions stale and was deliberately
NOT applied. Everything else in R2 — dark-mode removal, the eyebrow treatment, the brand-asset and
favicon spec, and the Nataraja rules — is live. `--indigo` `#3B498C` is the one value identical across
every revision.

The live palette is R7's five **as amended by R9**: `--navy` `#18202F` · `--slate` `#68748A` ·
`--mist` `#DCE1E6` · `--white` **`#FFFFFF`** · `--copper` `#B8734F`, plus derived `-ink`, `-light`
and `-deep` variants. Every earlier palette is withdrawn and **not aliased**, so stragglers fail
loudly. The backbone is navy on white at **16.32:1** both ways.

**R9 withdrew Warm White `#FAF7F2`.** Cream, ivory, beige and warm-white are out of the interface
entirely — do not reintroduce a warm ground. No derived token needed changing when the ground
moved, because the `-ink` variants were solved against `--mist`, which did not move; pure white
only adds headroom on the easier ground. Rule 2 still binds: a `--white` label on raw `--copper`
went 3.51 → **3.75**, still short of AA.

**Four** enforcement rules, in `globals.css`:
1. `--slate` and `--copper` never carry body text on ANY ground (slate 4.41/3.58/3.46, copper
   3.51/2.85/4.36 — six of six below AA). Use `-ink` on light, `-light` on dark.
2. **No text colour passes AA on raw `--copper`** — white 3.75, warm white 3.51, navy 4.36. A filled
   copper button uses `--copper-deep` with a `--white` label (4.51). Likeliest bug in the palette,
   because copper reads as an obvious button fill.
3. `--mist` is a **surface, never an interactive border** — 1.23:1. Use `--rule-strong`.
4. `--copper` is the **active-state accent**: CTAs, hover/focus, current step, live status. Not
   decoration, not headings.

### Motion is CSS + IntersectionObserver, not Framer Motion
§9 names Framer Motion, but §9 also caps initial JS at **180 KB gzipped** and the client chunks
already measure ~199 KB. Adding ~50 KB for reveals that CSS transitions do natively fails the
harder constraint for no visual gain. `motion` stays installed but unused by the motion layer.

**Two invariants the motion layer must keep**, both verified in the built CSS and the SSR HTML:
- **Counters ship the true figure server-side.** §4.4: "the correct number is in the HTML from the
  start; JS only animates toward it." Both competitors render "0 +" in production because their
  counter animates from a hardcoded zero. Starting from the truth makes the worst case a number
  that does not animate, rather than one that is wrong.
- **Nothing is hidden by the stylesheet.** `[data-reveal=pending]` is set only by JS, and `Reveal`
  carries a **1.2s failsafe** that shows the element whether or not the observer ever fires.
  IntersectionObserver callbacks do not run in a hidden document, so without it a page opened in a
  background tab finishes loading with its whole body at opacity 0 — observed, not theoretical.

### Three constraints that will get "tidied away" — don't
- **The corridor is exempt from the global reduced-motion reset.** Without the exemption the blanket
  `animation-duration: 0.01ms` collapses every card onto the axis. It must *pause*, not disable.
  It has survived four palette migrations; do not sweep it up in a fifth.
- **`lib/fonts.ts` exports the PRIMARY family only.** next/font returns
  `Archivo, "Archivo Fallback"`, and the fallback never loads as a webfont. GlyphPortal decides
  whether to animate with `available.length < families.length`, so handing it the pair silently
  disables the entire hero effect with no error anywhere.
- **Never state a derived number twice on one page.** A hardcoded "thirty-eight years" heading
  already shipped next to a computed "39". Derive it once.
- **The logo carries `object-contain`, and it is not redundant.** `next/image` rounds derivative
  heights to whole pixels, so the browser default `object-fit: fill` squeezes the artwork ~1%
  horizontally. That is a distortion of a religious icon introduced by a rounding rule.
  `contain` makes it survive whichever derivative is picked.
- **The logo has NO plate, and must not get one back** (R9). R8 needed one because the supplied
  lockup inverts against itself — blue wordmark 1.96:1 on navy, grey legacy line 1.95:1 on white.
  R9 removed the legacy line and made the wordmark `currentColor`, so the mark now takes the
  page's own ink (16.32:1 either way) and needs no backing. No plate, badge, border or shadow.
- **"NATRAJ CONSTRUCTION CO." is NOT displayed** (R9). The visual mark reads **NCC** over
  **`INFRASPACE PVT. LTD.`** (R10) — the wording on the original artwork, and it does not repeat
  NCC. The full legal name **NCC Infraspace Private Limited** stays everywhere else: the logo's
  accessible name, `COMPANY.legalName`, the footer and `/about`. The 1987 heritage is prose on
  `/about`, not a second company name in the mark.
- **`ncc-lockup-master.png` is the preserved master** — the lossless 3208×1182 original from the
  recovered source, never served. The lossy `ncc-lockup.webp` it replaced is gone. Both
  derivatives are raster, not vector: `nataraja.webp` is a straight crop; `ncc-wordmark-mask.png`
  is the alpha of the NCC band, whose region holds zero non-blue opaque pixels so it reproduces
  the letterforms exactly. Neither is an autotrace. Replace both if a vector master appears.
- **`public/NCC-icon.png` in the extraction pack is a DIFFERENT STATUE — do not adopt it.** An
  earlier findings report recommended it as a better standalone Nataraja; that was wrong and is
  withdrawn. It has a round lotus base where the real mark has a rectangular stepped base, a
  different flame-arch lattice, aspect 0.867 vs 0.819, and it is clipped at top and bottom.
- **The mark steps up at `lg`, not `md`, and that is load-bearing.** Between 768 and 1023 the
  header carries the mark, five nav items and the Enquire CTA. A 48px mark there overflows the
  bar and clips the CTA — silently, because the header is `fixed` and so never raises a
  scrollbar. Verified at 320/390/640/767/768/800/900/1023/1024/1440 and at 200% zoom.
- **The landing page carries no location lead** (R9). No "Mehsana, Gujarat" in the hero, no
  "Building Gujarat's roads" in the introduction or `<title>`. Nothing replaces it — a reach like
  "pan-India" would be the §2 failure in a new costume. Project geography, the office addresses
  and the Class AA registration all stay.
- **Completion dates are NOT required and must NOT be rendered** (R8). The R6 §3 refine is
  deleted deliberately — the alternative under deadline is an invented date. Nothing sorts by
  date; `loadProjects()` orders by `displayOrder`.
- **`heroImage`, `district` and `contractValueCr` are OPTIONAL** (R11) and must stay that way.
  51 of 57 projects have no cleared photograph, 31 no district, 1 no value. They were made
  required in R6 and that was the blocker on publishing the portfolio. Never substitute 0, an
  empty string, a fabricated date or "Unknown" — omit the field. `.positive()` still guards any
  value that IS given, so 0 cannot enter as a stand-in.
- **District is never inferred from the awarding authority's office.** "R and B Panchayat
  Division, Ahmedabad" is where the department sits, not where the road is.
- **Archive ids 1 and 27 are ONE project** at the owner-confirmed **₹158.27 Cr**. One page, one
  value. Both historical rows stay unchanged in the extraction evidence.
- **`Kheda-Dholka-Road.jpeg` belongs to archive id 16** (Kheda R&B various-road works), NOT the
  separate Kheda–Dholka Road project. The filename is misleading; the live dataset's association
  is authoritative. Do not "fix" it by filename.
- **The Gandhi-statue image is attached to nothing.** The live source mislabels it as
  "Gandhinagar City" — a monument, wrong city, wrong project type.

### The Projects page is a file of engineering sheets (R18)
`app/projects/_sheet-data.ts` (server view model) + `_projects-browser.tsx` (client) +
`_index-view.tsx` (shared shell). White ground, navy type, hairline rules, copper on the
value only.

- **NO decorative numbering.** No oversized 01/02, no corner sheet number, no 1-to-57
  ordinal. A position in a list a filter can reorder is not a fact about a project. The
  archive's own package numbers (`MP-MDR-50-03`) and chainage stay — those are real.
  The title occupies the space the reference gave the number; there is no blank column.
- **ONE COLUMN at every width.** Fifty-seven records in a card grid read as a gallery; the
  evaluator is scanning for a road name and a value. Verified at eight widths.
- **All 57 sheets are in the server HTML.** The browser is a client component only so
  filtering needs no round trip. A `<noscript>` rule forces the disclosure panels open, so
  no-JS loses filtering and nothing else.
- **`break-words` is load-bearing, not tidy-up.** Two archive tokens cannot fit a 320px
  measure: the word "Reconstruction" at title size, and a run-together `up to7.00mt.width`
  in one scope record. Without it they overflow the sheet.
- **Listing images are natural-ratio + bounded + `object-contain`.** Every approved hero is
  landscape so nothing letterboxes today; the bound guards the 660×1600 vertical in
  Bagodara's gallery and any future tall frame — letterbox, never crop.
- **The detail page prints the body OR the summary, never both.** Most MDX bodies open by
  restating `scopeSummary` nearly verbatim; printing the pair reads as a stutter.
- **Category counts are derived from the records being listed**, never a literal. The five
  in use are highways 39 · urban 9 · water 6 · industrial 2 · rail 1.

### Navigation is approved in full but published selectively (R19)
`lib/nav.ts` holds the owner-approved structure — Projects · Expertise · Company ▾ · CSR ·
Contact — and every entry carries `published`. Header and footer render only published
entries, so the approved shape is recorded while no visitor meets a 404.

- **Capabilities are an APPROVED LIST, not a count of projects** (R20). `lib/capabilities.ts`
  is the only thing that decides what NCC says it does; a project supplies an example, and can
  never create a capability. Bridges, irrigation and river protection are owner-confirmed and
  render with no count and no example list — never a zero, never an apology. The homepage and
  `/about` read the same registry, so the four headline build types cannot drift again (they
  already had: "ROB and RUB structures" vs "rail over- and under-bridges").
- **`/credentials` is held on a MISSING DOCUMENT, not on permission** (R20). The owner has
  approved displaying the Class AA certificate; `pack/00-FINDINGS.md` §8 lists that certificate
  as unavailable, and the only "certificate" file in the archive is a 1080x1080 decorative
  icon. The admin-lambda `uploads/` blobs are not certificates — one is a mailbox-provisioning
  screenshot carrying a staff address, and must not be published. Turnover and the Crisil
  rating remain barred by the standing R8 flag in `lib/company.ts`.
- **`/careers` and `/csr` are LIVE** (R20). Careers carries the approved mailto and nothing
  else — no vacancy, benefit, response-time promise, form or upload. CSR keeps company activity
  and the founder's personal trusteeships in two separately headed sections, and the personal
  one says so in words. "Thousands of students" and the 8000-student figure are the trust's,
  not NCC's, and are deliberately absent.
- **The earlier hold reasons are superseded** (R19 §3-4).
  Credentials is blocked by the standing R8 flag in `lib/company.ts` — turnover and the
  Crisil rating may not be copied onto a new page, and `/about` already declined them for
  that reason. Careers has no opening and no approved recruitment mailbox; the general
  office email is NOT a CV destination. CSR's source material is overwhelmingly the
  FOUNDER'S PERSONAL trusteeships, and `decisions-for-owner.md` item 9 is unanswered.
  Proposed CSR copy is drafted in R19 §4.3 and must not ship unapproved.
- **"Expertise" is a LABEL. The route stays `/capabilities`.** Do not "fix" the URL to match.
- **Company is a disclosure button, not a page.** There is no `/company` and none is planned.
  It currently holds one destination; that is the consequence of the two held pages, not a
  bug. Escape must close it AND return focus to the trigger.
- **`/capabilities` derives everything from the 57 project records** — categories, counts,
  states and example links. Bridges, irrigation and protection are absent because no record
  evidences them; they are not denied, and they appear on their own once one exists.

### India-wide positioning, Gujarat only as fact (R21)
NCC takes work anywhere in India. No copy, metadata, OG text or alt text may describe the
company as a Gujarat or Madhya Pradesh contractor. `COMPANY.positioning` is
"Infrastructure contractor since 1987." Project locations, client legal names, the Class AA
issuing authority and the office addresses keep their state names, because those are facts.
The `/about` footprint map is India-scale, generated from lon/lat so shape and markers share
one projection, and is framed as work delivered to date rather than an operating area.

### A client tile is a mark and a name (R23)
`app/clients/_clients-view.tsx`. No disclosure, no expanding panel, no per-client link —
the owner's instruction. The group filter and the group sections stay; only the per-tile
dropdown went.

- **The loader's check is NOT presentation and must not follow the panel out.**
  `lib/content/clients.ts` still FAILS THE BUILD when a project matches zero or more than
  one client. The records are loaded and validated, then simply not surfaced; `/projects`
  is where a record is read. Deleting the loader because the page stopped rendering its
  output would remove the only thing stopping a contract silently detaching from its
  authority.
- **Logos render in their own colour at rest.** They were greyscale-until-opened while a
  tile could be opened. With the disclosure gone that state has no resolution on touch,
  and a wall left permanently grey for every phone visitor is worse than one that just
  shows the marks.
- **`.client-glass` is out of the `:hover` and `:focus-within` rules in `globals.css`.**
  A tile that cannot be actioned must not paint an interactive state.
- The `/clients` intro no longer says "Open a card" — it said so, and cards no longer open.

### Data files the owner edits directly (R21)
`content/clients.ts` · `content/timeline.ts` · `content/footprint.ts` · `lib/capabilities.ts`.
None is layout. The client loader FAILS THE BUILD if a project matches zero or more than one
client, so a contract cannot silently detach from its authority. All 14 client logos are
owner-verified, including the national bodies; seven have no linked record yet and carry a
`todo`.

### Mobile below 768px is ONE gutter and full-bleed dark panels (R22)
Every rule lives in the single `@media(max-width:767px)` block in `globals.css`.
768/1024/1440 were verified **pixel-identical** before and after, on all nine
routes, so the block provably cannot reach tablet or desktop.

- **`--gutter` is 1.5rem and there is only one.** Mobile previously carried
  five left edges: header 16 · page shell 20 · `<Container>` 24 · sheet cards
  39 · glass cards 52. 24px wins because it is the §4.6 system gutter that
  `<Container>` already applies to the header, the footer and the whole
  homepage; `PAGE_SHELL`'s `px-5` was the drift. Only the shell moved, so those
  three are untouched. Section text now sits at 24 sitewide and card interiors
  at 43 (24 + 1px border + 18px), and 18px is the padding the project and
  capability sheets already used.
- **Dark panels are FULL-BLEED, not inset-with-padding.** The brief allowed
  either. Inset+padding would put dark-panel text 24px right of the light
  sections above and below it — the same misalignment in a new costume. They
  bleed with `margin-inline:calc(var(--gutter) * -1)`, NOT the 50vw trick, so
  no scrollbar can widen them. Applies to `.editorial-section.dark-panel`,
  `.contact-band` and `.enquiry-note`.
- **There was never a gradient fade.** The "fade cutting into HISTORY" was the
  panel's 64px empty bottom padding with grid lines still drawn in it. Measured:
  `mask:none`, no gradient overlay, `padding:64px 0px`. Fixed by tightening the
  block padding to 2.75rem, not by removing an effect that did not exist.
- **`.engineering-grid` is driven by `--grid-line`, `--grid-size` and
  `--grid-origin`.** Retune those; never restate the `background-image`, which
  is how the mobile and desktop textures would drift apart. Mobile starts the
  first line ON the gutter so it coincides with the text edge.
- **A `<br>` in a heading needs `{" "}` before it.** `display:none` on a `<br>`
  eats the adjacent whitespace, so the mobile reflow rendered "Experience
  formsour foundations". All five authored breaks now carry the explicit space:
  `/about`, `/csr`, `/careers`, `/contact` and `ContactBand`.
- **h2 was NOT scaled down.** The brief asked for 36-44px display headings and
  named two section h2s as oversized; those h2s measured **32px**, already under
  the floor. h1 came 44.8 -> 37/40/42 at 360/390/430. What made the h2s dominate
  was spanning the full 390px with no padding, which the bleed fixed.

### The plant plate is a category illustration, not an NCC plant record (R22)
`.expertise-plate` in `globals.css` + the `<section>` in `app/capabilities/page.tsx`.
`public/images/expertise-concrete-plant.png` is a GENERATED image supplied by the
owner. It is on `/capabilities` only.

- **The caption claims nothing about NCC's equipment.** Nothing approved says
  NCC owns or operates a batching plant, so the copy describes how road and
  bridge work is built in general. It stands on exactly the footing the
  engineering drawings on the same page already have.
- **The lg aspect ratio is the source's own, 1619/971.** Desktop applies no
  crop at all. Below 1024 the frame gets taller and `object-fit` crops width:
  16/9 from 640, 4/3 below, with `object-position:58%` biasing toward the silos
  and the mixer, the two things still legible at 390px.
- **The caption's `padding-inline` tracks `PAGE_SHELL` exactly** — 24/32/48
  against a 1280 column — so it lands ON the capability cards below it, not near
  them. Verified equal at seventeen widths from 320 to 1920.
- **It carries `data-rail-quiet`**, because it is full-bleed and the chainage
  rail owns the same left gutter above 1280.
- **Known, inherited:** the plate bleeds with `calc(50% - 50vw)`, matching
  `.page-heading`. On a platform with classic (non-overlay) scrollbars, `vw`
  counts the scrollbar and any element using this technique overhangs the client
  box by its width. Pre-existing and sitewide, not introduced here; the fix, if
  one is ever wanted, is `overflow-x:clip` on `body`, which is a desktop change.

### Routes and where content renders
`/` · `/projects` · `/projects/[slug]` · `/clients` ·
`/capabilities` · `/about` · `/contact`

**`/projects/completed` and `/projects/ongoing` are 301 redirects to `/projects`** (R21). All
57 records are completed, so they rendered a duplicate and an empty page. The `ongoing` status
stays in the schema. The original reasoning was that ongoing and completed should be real routes — `docs/03-competitor-maxel.md` §4.1:
an evaluator wants "finished work of comparable value" as a destination they can send to a
committee. Every route has its own `<h1>` and `<title>`; the competitor ships one `<title>` sitewide.

**Project images live in `content/`, are served from `public/`.** `scripts/sync-media.ts` copies them
at build (`prebuild`/`predev`), skipping drafts. `public/content/` is generated and gitignored — edit
the originals beside their project, never the copies.

**Numbers are counted, never typed.** Both competitors render "0 +" in production because a
hardcoded counter was never wired up. `projectTotals()` does arithmetic over real records. Do not
reintroduce a literal — and do not state a derived figure twice on one page, which already produced
a "thirty-eight years" heading beside a computed "39".

**NO AGGREGATE PORTFOLIO VALUE IS PUBLISHED** (R11). `projectTotals()` no longer exposes
`valueCr` — it was deleted from the loader so nothing can render it by accident. The published set
is a recovered 2018–2023 tender file, not a lifetime record, and a total over it reads as an order
book. Individual contract values appear on each project; their sum does not appear anywhere. The
surviving count tile is labelled *"Projects listed on this site"*.

### There is a ₹40 Cr publication floor on the portfolio (R24)
The owner's instruction: projects under ₹40 Cr are not visible on the site. **13 of 57
records publish; 44 are drafted.**

- **Drafted, NOT deleted.** Each withdrawn directory is prefixed `_`, the loader's own
  documented opt-out. The tender evidence stays on disk, `content:check` lists all 44
  separately as "valid — rename to publish", and the floor is reversed by renaming back.
  Nothing was destroyed to apply an editorial decision.
- **A record with NO value is NOT under the floor.** `bilodara-sihunj-road` has no
  `contractValueCr`, so it is not known to be under 40 and it stays published. R11 is
  explicit that an absent optional field is never read as 0, and that rule does not
  weaken because a filter would be tidier if it did. It is the one published record with
  no value, and it still carries its gallery.
- **Three categories lost their EVIDENCE, not their CLAIM.** water 6→0, industrial 2→0,
  rail 1→0. `/capabilities` reads the approved registry, so all three still render their
  title and description and then stop, exactly as bridges, irrigation and protection
  already do. Do not "tidy" them out of `lib/capabilities.ts` — NCC still does that work;
  the site simply no longer publishes a contract that evidences it.
- Madhya Pradesh survives on one record (₹158.27 Cr), so the `/about` footprint keeps
  both states. Distinct project clients 32→13; the `/clients` wall is unaffected because
  it lists owner-verified relationships, not derived records.

**Applying the floor exposed two counters that were TYPED, and both were live.** The hero
credentials panel and a duplicate list in `lib/company.ts` each carried
`{ label: "Project records", value: "57" }`, and `/projects` advertised "Explore 57
completed road, municipal, water, industrial and rail infrastructure project records" in
its meta description and its visible intro. After the cut the hero claimed 57 published
records when 13 were, and the description promoted water, industrial and rail work to a
search engine that would land the visitor on a list containing none of it — the §2
failure reached by neglect rather than by invention, which makes it no better.
- The hero is a client component, so `app/page.tsx` derives `projectTotals().count` and
  passes it in. That also keeps the §4.4 invariant: the true figure is in the SSR HTML.
- `lib/company.ts`'s `CREDENTIALS` was deleted, not corrected. Nothing imported it, and a
  second copy of a derived figure is the bug rather than its value.
- `/projects` now derives both the count and the list of types from the records it is
  actually listing, so the sentence cannot describe a portfolio the page is not showing.

### Content is typed MDX in `content/`, not a CMS (R6)
No Sanity, no Studio, no API keys. `lib/content/schema.ts` is the enforcement layer and
`lib/content/load.ts` uses `.parse()`, not `safeParse` — a malformed project **fails the build**
rather than rendering half a card. Do not "improve" that by catching and skipping; skipping is how
`Lorem ipsum` reaches production. `npm run content:check` reports everything at once and exits 1.

Verified: a deliberately broken project is rejected on all six rules and the loader throws.

**`load.ts` strips HTML comments from MDX bodies before rendering.** Provenance comments
(`<!-- provenance: archive on-hand ids ... -->`) were rendering as visible text on 55 of 57
project pages. Verified after the fix: 57 pages checked, 0 leaking, scope prose intact.

### The Nataraja is a religious icon, not a graphic element (R2 §4)
**Non-negotiable.** Never rotate, distort, recolour outside its own brass range, animate, use as a
loading spinner, crop it partially, or place it as a decorative background watermark. It appears in
the logo lockup, at full figure, with clear space equal to the height of the "N", and nowhere else.
Getting this wrong reads as disrespectful to exactly the regional audience the site is for.

Consequences already in force: the statue **cannot** be the favicon (detail becomes noise at 16px —
the `N` monogram carries small sizes instead), and `icon-512.png` is not attempted until the logo
vector exists, because a bad autotrace of the flame arch and the arms is worse than no asset.

### The homepage after the hero is the blueprint (R12, artwork reworked at R13)
`components/blueprint-section.tsx` + `lib/road-plan.ts`. Three things about it will look
wrong and are not:
- **The post-hero area is an editorial section, not an animation** (R15). A machinery
  animation was proposed at R14 and rejected before implementation; do not revive it.
  Two spacing traps live there: GlyphPortal's `align-content: center` wins by source order
  (out-specify it), and `margin: auto` on the arrival cancels grid stretch (use
  `margin-inline`). `--gp-height` and the portal's `margin-top` are mechanical — never
  shorten them to close a visual gap.
- **The credentials panel is INSIDE the hero.** GlyphPortal's "See our credentials" is an
  anchor to its own `children` container, and the component cannot retarget it. R12
  compacted that content and left the container alone — its `min-height` is `--gp-height`,
  which feeds the portal's `margin-top` maths. Shrinking it changes the hero's timing.
- **Solid lines draw along their own path; dashed lines are revealed through a MASK.** R12's
  single rectangular clip was rejected — it uncovered the picture without looking drawn. Lane
  markings already use `stroke-dasharray` for their pattern, so they cannot also use it for
  the reveal; the mask stroke must stay much wider than the line or curve edges get shaved.
- **Timing is defined by start/finish POSITION, not by drawing height.** A height-derived
  window finished the desktop plan only after it had scrolled off the top. 697px of drawing
  in a 900px viewport leaves no slack.
- **The stroke component lives at module scope.** Declared inside the plan component it got
  a new identity every render, remounting every line and discarding the dash offsets.
- **The chainage rail stands down inside `[data-rail-quiet]` sections.** Its ticks share the
  left gutter with the drawing. Behaviour elsewhere is unchanged.
Clip rects are authored at FULL extent so no-JS and reduced-motion show the finished
drawing; JS only narrows them. Offsets in the geometry are exact arc offsets, never
translated copies.

### The bridge introduction is responsive in three regimes (R17)
`[data-intro]` in `milestone-portal-hero.tsx`: one wrapper, a text container holding the
heading and ALL THREE paragraphs, and an artwork container. Below 768 it is a single column
in normal flow; from 768 a real two-column grid (`0.46fr / 0.54fr`); from 1200 the approved
desktop overlay. Percentage-positioned text exists only at >=1200.

- **The asset was adapted to the palette, never the reverse.** `bridge-construction-navy.png`
  moves the raster's baked ground `rgb(20,32,54)` onto `--color-navy` `#18202f` with a flat
  `(+4,0,-7)` on a distance ramp; foreground beyond distance 34 is bit-identical. A recolour,
  not an alpha key — a misjudged pixel shifts 8 levels instead of deleting a cable. The
  original `bridge-construction.png` is preserved and must stay.
- **The glow is the other half of the seam.** `[data-gp-field]` plus a radial slate/copper
  glow layer are pinned to the VIEWPORT while the artwork is not, so the tint slid under the
  raster. `[data-ncc-arrival]::before` paints `--color-navy` between them, feathered 160/180px.
  Do not remove the feather — it is what stops the backdrop drawing its own edge.
- **The crop is `object-fit` + `object-position` alone.** `next/image`'s `fill` writes
  width/inset as INLINE styles, so stylesheet width rules silently do nothing. A 21:20
  container against a 3:2 source shows exactly source x 30-100%; measured, the leftmost
  content in any band is x=30.5%, so only ground is lost.
- **`[data-ncc-arrival]` is `auto auto` + `align-content: start`, not `1fr auto`.** The `1fr`
  handed `--gp-height`'s surplus to the introduction, which centred inside it: 104px dead
  above the heading and 104px between artwork and divider at 768.
- **`aspect-ratio` needs a definite width.** Left to auto it resolved the other way round and
  derived a 918px width from the grid row's stretched height, inside a 661px column.
- **`display:none` on a `<br>` eats the whitespace too** — the heading rendered "journeyhas"
  below 1200 until an explicit `{" "}` was added.
- **One copper divider only.** `[data-ncc-creds]`'s `border-top`. The old `[data-intro-rule]`
  crossed the pier on desktop and is deleted.
- **Known, unclosed:** ~700px of blank scrolling before the introduction appears. That is
  GlyphPortal's `--gp-reveal` curve, not spacing; closing it means retiming the hero.

### The post-hero editorial section is the bridge composition (R16)
`[data-intro]` inside `milestone-portal-hero.tsx`. The artwork
(`public/images/bridge-construction.png`, owner-supplied, 1536×1024) runs across the WHOLE
composition full-bleed; the copy sits on the artwork's own empty left region at
`left: 3.5%, top: 19%`. At 1.5 aspect the frame matches the asset exactly, so desktop applies
no crop or scale — verified by overlay at mean 2.77/255 over the bridge-and-crane core.
Contrast was measured against the pixels actually under the copy: heading 14.99:1, body 10.10:1.

Four things will look wrong and are not:
- **The figure is `position: absolute; inset: 0`.** Left `static` it becomes a block in flow,
  the `fill` image anchors to `[data-intro]` instead, and the two decouple into a visible
  seam down the composition.
- **`[data-intro]` carries `data-rail-quiet`** — the chainage rail shares the left gutter and
  its tick labels landed on the last paragraph.
- **`[data-intro-rule]` is `display: none` below 900px**, because `[data-ncc-creds]` already
  draws a 2px copper `border-top` and the two stacked read as a duplicate.
- **The mobile figure is `width: 100%`, not `100vw`.** A nested full-bleed overflowed
  horizontally as soon as a vertical scrollbar existed.

**Delete superseded CSS, do not just add rules after it.** R15's two-column
`grid-template-columns: 36fr 64fr` survived the R16 rewrite and, sitting later in the
cascade, silently won — the figure rendered 639px wide inside a 1536px frame with a hard
seam, and the image looked broken rather than misconfigured. 91 dead lines.

### The hero is the MILESTONE glyph portal — and photography is OUT by instruction
`components/milestone-portal-hero.tsx` wraps `components/ui/glyph-portal.tsx` (MIT, keep the notice).
The full slogan is the type; the camera flies through the O of MILESTONE. The owner has ruled out
photography and video in the hero, which **reverses R4 §3** — so the credentials are the content you
arrive inside the letter, and that is where the evidence now lands. Do not reintroduce a photo hero
without checking that decision.

**GlyphPortal's touch letter-picker is switched OFF** (R23). The vendored component
ships a native `<select>` reading "Choose a letter" and shows it on every coarse pointer
via its own `any-pointer: coarse` rule, so touch users can pick the entry letter. Two
reasons it is hidden here, in the hero's own scoped style block:
- **The entry letter is not a choice.** `focusChar="O"` picks the O of MILESTONE because
  the milestone is the subject; the other two Os sit in "OUR" and "VISION". A dropdown
  offering a different letter contradicts a decision already made.
- **It landed ON the subtitle.** The component parks it at `--gp-word-bottom + 42px`,
  measured 124x48 at (133,354) on a 390px viewport — directly over the last word of
  "Roads, bridges, irrigation and river protection works."

Use `display: none`, **NOT** `interactive={false}` on the component: that prop also kills
the "Scroll to enter." hint and the desktop letter hover, both of which are wanted.
Nothing is lost to assistive tech — the letter buttons are already `inert` with
`tabIndex={-1}`, so the select was never anyone's only route anywhere. Verified after the
change on iPhone, iPad and desktop: hint present, CTA present, `--gp-field-scale` 1 -> 1.16
and `--gp-reveal` 0 -> 1 unchanged.

The corridor (`image-stream-hero.tsx`) and the project reel (`project-reel-hero.tsx`) both still
exist and can carry other pages.

### Where the rebuild lives
**`site/`** — matching the directory contract below. The app was scaffolded as `next-app/` and was
renamed per R2 §6; the empty `site/` placeholder is gone. There is one app, at `site/`.

### Hard rules that still apply
- **Never invent project content.** §7 is explicit: an incomplete field renders nothing rather
  than a placeholder. The §2 competitor teardown exists precisely because that site ships
  `+1 (859) 254-6589` and `Lorem ipsum` in production. Do not repeat it.
  **§11 item 4 (contact) is CLOSED by R8** — the two addresses, `02762-255962` and
  `ncc_infraspace2015@yahoo.in` are confirmed and published. Items 1–3 are still outstanding.
  The email is a Yahoo address by the owner's confirmation; do **not** "fix" it to a domain
  address, which would be the §2 failure verbatim.
- **Verify contrast, never estimate it.** Three specified token values failed WCAG and were
  corrected — see the implementation notes appended to `docs/01-requirements.md`.
- Phases run in order and each has a gate. Do not jump to motion (E) or the 3D map (F) before the
  static content templates (C, D) exist.

## Directory contract

- `forensics/` — **write once, never edit.** This is evidence. If a crawl needs redoing,
  re-run the crawler and let it overwrite its own output; never hand-edit files in
  `forensics/out/`. Do not delete `forensics/out/` to "clean up" — it is the only record
  of a site that cannot be read without a browser.
- `docs/` — analysis and specifications. Append and revise freely.
- `site/` — the rebuild. Next.js 16 + TypeScript + Tailwind v4. Live since phase A.

## Critical technical context

The existing site is a **client-rendered Create React App SPA with no server-side
rendering**. Every route returns an identical ~1 KB shell:

```html
<div id="root"></div>
<noscript>You need to enable JavaScript to run this app.</noscript>
```

Consequences:
- `curl`, `fetch`, `wget`, and any non-browser HTTP tool will return **nothing useful**.
  Do not attempt to analyse the site that way and do not report the empty shell as a finding.
- All extraction must go through a real browser. That is what `forensics/forensic-crawl.mjs`
  (Playwright + Chromium) exists for.
- Per-route `<title>` is set client-side, so route titles only appear after JS executes.
- Only `/` and `/contact` are confirmed to exist. The full route table lives inside
  `forensics/out/raw/main.*.js` and in the crawl output.

## How to run the extraction

```bash
cd forensics
npm install
npx playwright install chromium
node forensic-crawl.mjs https://nccinfraspace.com/
```

Output lands in `forensics/out/`. The file to read first is `out/HANDOFF-INPUT.md`.
Screenshots at `out/shots/*.{1440,834,390}.png` carry the visual design information —
they need to be looked at, not just listed.

## Known issues with the existing site (carry into requirements)

1. **SEO is critically broken.** No server-rendered content; only two URLs indexed
   anywhere; one shared meta description sitewide; no discoverable sitemap. Any rebuild
   should treat SSR/SSG, per-route metadata, an XML sitemap, and structured data as
   non-negotiable.
2. Contact email of record is a Yahoo address, not a domain address.
3. The 1987 heritage (originally the partnership firm Natraj Construction Company) is
   reduced to a meta description tagline.
4. Brand name collides in search with NCC Limited (Nagarjuna) and NCC AB (Sweden).

## Company facts (verified off-site — MCA, Crisil, D&B)

Treat these as background. **Where the live site's own copy differs, the site wins** —
it is the artifact being reconstructed.

- Legal name: NCC Infraspace Private Limited. CIN U45200GJ2015PTC082845.
- Founded 1987 as partnership firm Natraj Construction Company; incorporated as a
  private limited company 09-Apr-2015.
- Civil and infrastructure construction, primarily **roads and bridges**.
- Class AA contractor registered with the Government of Gujarat.
- Customers are predominantly **government agencies** — the site's job is credibility,
  credentials, and recruitment, not commercial lead generation.
- Based in Mehsana, Gujarat. Two addresses on record (Orbit Business Hub / Royal House)
  — unresolved, needs owner confirmation.
- Promoters: Kantibhai K Patel, Akshay Kantilal Patel. 30+ years' experience.
- FY24 operating income ₹302.42 cr; PAT ₹7.50 cr; net worth ₹69.92 cr.
- Crisil BBB-/Stable and Crisil A3, reaffirmed Feb 2025.
- Headcount conflict: 54 (statutory filings) vs 101–500 (self-reported). Unresolved.

## Related work

The repo owner is separately building a construction management software system for the
same client. That is a **different project** — do not merge concerns, share code, or
assume the website should surface data from it unless explicitly instructed.

## Working style

- Confidence labels in all analysis: **Confirmed** / **High-confidence inference** /
  **Possible** / **Unknown**. Never present inference as fact.
- If something cannot be determined from available evidence, write
  "Unknown — cannot be determined" rather than filling the gap.
- Prefer reusable components over per-page hard-coding in any eventual rebuild.
