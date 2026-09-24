# NCC Infraspace website rebuild — project handover

**Prepared:** 10 September 2026
**Repo:** `NCC website rebuild/` (git, 26 commits, `main`, working tree clean)
**Status:** Phase 4 (rebuild) in progress — sub-phases A–E complete, F–H outstanding
**Verified at time of writing:** `npm run typecheck` clean · `npm run content:check` 1 valid project, 1 draft skipped

This document is written for someone — or something — picking the project up cold. It
covers what the project is, what exists, why the non-obvious decisions were made, what is
deliberately *not* built, and what is blocked on the client.

---

## 1. What this project is

A from-scratch rebuild of **https://nccinfraspace.com/**, the website of **NCC Infraspace
Private Limited**, a civil and infrastructure contractor in Mehsana, Gujarat, India.

**There is no access to the original codebase.** No Git repo, no design files, no CMS, no
database, no developer docs, no contact with the original developer. The live public
website was the only source of truth about what currently exists, which is why the project
opened with a forensic extraction phase rather than a design phase.

### The client

| | |
|---|---|
| Legal name | NCC Infraspace Private Limited |
| CIN | U45200GJ2015PTC082845 |
| Founded | 1987, as the partnership firm **Natraj Construction Company**; incorporated as a private limited company 09-Apr-2015 |
| Work | Civil and infrastructure construction — primarily **roads and bridges**, plus irrigation and river protection |
| Registration | **Class AA** contractor, Government of Gujarat |
| Base | Mehsana, Gujarat |
| Promoters | Kantibhai K Patel, Akshay Kantilal Patel (30+ years) |
| FY24 | Operating income ₹302.42 cr · PAT ₹7.50 cr · net worth ₹69.92 cr |
| Credit | Crisil BBB-/Stable and Crisil A3, reaffirmed Feb 2025 |

Company facts above were verified **off-site** (MCA filings, Crisil, Dun & Bradstreet).
They are background. **Where the live site's own copy differs, the site wins** — it is the
artifact being reconstructed.

Two facts remain unresolved and are flagged wherever they appear:
- **Registered address** — Orbit Business Hub and Empire Business Hub appear on the live
  site; Royal House appears in MCA records. Royal House is *also* the competitor's
  registered address, which makes guessing actively dangerous.
- **Headcount** — 54 in statutory filings vs 101–500 self-reported.

### Who the site is for, and what it must do

Customers are predominantly **government agencies**. The site's job is **credibility,
credentials and recruitment** — not commercial lead generation. The primary reader is a
tender evaluator or a departmental officer checking whether this firm is real, solvent and
capable of the package on their desk. The second reader is a prospective engineer.

That audience shapes every decision below. It is why the numbers are computed rather than
typed, why contact fields render nothing rather than a placeholder, and why an empty
completed-projects page is treated as a serious commercial problem rather than a cosmetic
one.

---

## 2. Why the old site had to be replaced

The existing site is a **client-rendered Create React App SPA with no server-side
rendering**. Every route returns an identical ~1 KB shell:

```html
<div id="root"></div>
<noscript>You need to enable JavaScript to run this app.</noscript>
```

Consequences that shaped the whole project:

- `curl`, `fetch`, `wget` and every non-browser HTTP tool return **nothing useful**. All
  extraction had to go through a real browser (Playwright + Chromium). If you pick this up
  and are tempted to `curl` the live site, don't — the empty shell is not a finding.
- Per-route `<title>` is set client-side, so route titles only exist after JS executes.
- **SEO is critically broken**: no server-rendered content, only two URLs indexed anywhere,
  one shared meta description sitewide, no discoverable sitemap.
- Contact email of record is a **Yahoo address**, not a domain address.
- The 1987 heritage is reduced to a meta-description tagline.
- The brand name collides in search with NCC Limited (Nagarjuna) and NCC AB (Sweden).

The rebuild therefore treats SSR/SSG, per-route metadata, an XML sitemap and structured
data as non-negotiable rather than as nice-to-haves.

---

## 3. Repository layout

```
NCC website rebuild/
├── CLAUDE.md                  ← project charter. Read this second, after this file.
├── docs/                      ← analysis + specifications. Append and revise freely.
│   ├── 00-phase0-forensic-report.md
│   ├── 01-requirements.md              main brief (Phase 3, written by the repo owner)
│   ├── 01-requirements-r2.md … r7.md   six revisions, layered — see §4 below
│   ├── 01a-design-assumptions.md
│   ├── 02-content-salvage.md           8 real projects recovered from the live site
│   ├── 03-competitor-maxel.md          teardown + "best of both" synthesis
│   └── HANDOVER.md                     this file
├── forensics/                 ← WRITE ONCE, NEVER EDIT. This is evidence.
│   ├── forensic-crawl.mjs     Playwright + Chromium extractor
│   └── out/                   crawl output: HANDOFF-INPUT.md, pages/, raw/, shots/
├── design-system/             early token exploration (superseded by globals.css)
└── site/                      ← the rebuild. Next.js 16 + TypeScript + Tailwind v4.
```

**`forensics/` is evidence, not source.** Never hand-edit anything in `forensics/out/`. If
a crawl needs redoing, re-run the crawler and let it overwrite its own output. Do not
delete the directory to "clean up" — it is the only record of a site that cannot be read
without a browser. `out/shots/*.{1440,834,390}.png` carry the visual design information and
need to be *looked at*, not just listed.

**There is one app, at `site/`.** It was scaffolded as `next-app/` and renamed per R2 §6.
Older docs may still say `next-app/`; that path no longer exists.

**The separate construction-management software project for the same client is a different
project.** Do not merge concerns, share code, or assume this website should surface its
data.

---

## 4. The requirements are layered — read all of them, latest wins

This is the single easiest thing to get wrong. There are seven requirement documents and
they supersede each other in parts, not wholesale.

| File | Carries | Palette status |
|---|---|---|
| `docs/01-requirements.md` | the main brief | §4.1 "Signboard" — **superseded** |
| `docs/01-requirements-r2.md` | light-only, brand assets, Nataraja rules | §2 "Brass & Indigo" — **superseded** |
| `docs/01-requirements-r3.md` | replaces main §4.1 palette and §6.1 hero | §1 "Brass & Midnight" — **superseded** |
| `docs/01-requirements-r4.md` | deletes `--onyx`; corridor on gradients | §1 amendment — **superseded** |
| `docs/01-requirements-r5.md` | corridor gradients + scrim | §2 four-colour — **superseded** |
| `docs/01-requirements-r6.md` | **no CMS** — typed MDX in `content/`, Zod at build | — |
| `docs/01-requirements-r7.md` | **THE LIVE PALETTE**, closed by the owner | §1 five-colour — **LIVE** |

**R2 arrived after R3 and R4 were already built.** Its §2 palette was two revisions stale
by the time it landed and was deliberately **not** applied. Everything *else* in R2 is
live: dark-mode removal, the eyebrow treatment, the brand-asset and favicon spec, and the
Nataraja rules.

Two things worth knowing about the palette history: `--indigo` `#3B498C` is the one value
identical across every revision, and **every single palette revision contained at least one
value that failed the WCAG AA floor the same document mandated.** Which brings us to the
working rule that found them.

---

## 5. The design system

### 5.1 The live palette (R7) — five colours, closed by the owner

Defined in `site/app/globals.css` under a Tailwind v4 `@theme` block. There is no
`tailwind.config`.

| Token | Hex | Role |
|---|---|---|
| `--color-navy` | `#18202F` | Midnight Navy — executive premium dark surface |
| `--color-slate` | `#68748A` | Slate Blue — muted corporate secondary |
| `--color-mist` | `#DCE1E6` | Mist Gray — cool metal interface background |
| `--color-white` | `#FAF7F2` | Warm White — clean editorial light surface |
| `--color-copper` | `#B8734F` | Copper — warm mechanical **active-state** accent |

The five supplied values are used **exactly** as given; nothing was recoloured. What was
added are lightness-only variants of those same hues, because three of the five cannot
legally carry text:

`--color-copper-ink #8E5639` · `--color-slate-ink #5A6477` · `--color-copper-deep #A26241`
· `--color-copper-light #BA7754` · `--color-slate-light #7C879C` · `--color-rule-strong #6C8196`

Every earlier palette is withdrawn and **not aliased**, so stragglers fail loudly rather
than silently rendering an old colour.

The backbone is strong: navy on white is **15.28:1** both ways; navy on mist **12.40:1**.

### 5.2 Four enforcement rules — these are in `globals.css` as comments, keep them there

1. **`--slate` and `--copper` never carry body text on ANY ground.** Measured: slate
   4.41 / 3.58 / 3.46, copper 3.51 / 2.85 / 4.36 — six of six below AA. Use the `-ink`
   variants on light grounds, `-light` on dark.
2. **No text colour passes AA on raw `--copper`.** White 3.75, warm white 3.51, navy 4.36.
   A filled copper button must use `--copper-deep` with a `--white` label (4.51). This is
   the single likeliest bug in this palette, because copper reads as an obvious button fill
   and every label you instinctively reach for fails on it.
3. **`--mist` is a surface, never an interactive border** — 1.23:1. Use `--rule-strong`
   for anything WCAG 1.4.11 applies to.
4. **`--copper` is the active-state accent** — CTAs, hover/focus, current step, live
   status. Not decoration, not headings.

### 5.3 The working rule that matters more than the palette

**Verify contrast, never estimate it.** Computing the sRGB relative luminance ratio for
every specified pair found a genuine defect in *every* palette revision, including:

- `--rebar #8A8F98` on `--chalk` at **3.03:1**, specified for body text.
- `--retro #F5C518` as the **focus ring** on light surfaces at **1.52:1** — as literally
  specified, the keyboard focus indicator would have been invisible on every light surface
  on the site. This one was not anticipated by the brief and is the more serious of the two.
- `--rule-strong #9AA9B2` at **2.31:1** — failing the 3:1 threshold that was the token's
  entire reason for existing. Third revision in a row with that same bug. Corrected to
  `#778B98`, then to `#6C8196` under R7.

If you change a colour, compute the ratio. Do not eyeball it and do not trust the number
written in the brief.

### 5.4 Typography

`next/font`, self-hosted, no runtime request to `fonts.googleapis.com`.

- **Display:** Archivo (variable, `wdth` axis)
- **Sans:** IBM Plex Sans (400, 500)
- **Mono:** IBM Plex Mono (500) — used for `.measurement`, the chainage and figure style

Fluid `clamp()` scale from `--text-xs` to `--text-4xl` (40px → 72px). H1 measures 40.01px
at 390px and 72px at 1440px, matching main brief §4.2 exactly.

---

## 6. What is built — the code tour

### 6.1 Stack

Next.js **16.2.6** (App Router, Turbopack) · React **19.2.4** · TypeScript 5 · Tailwind
CSS **v4** · Zod 4 · gray-matter. `motion` (Framer Motion) is installed but **deliberately
unused** — see §7.1.

```bash
cd site && npm install && npm run dev
```

Scripts: `dev` · `build` · `start` · `lint` · `format` · `typecheck` · `content:check` ·
`sync:media`. `sync:media` is wired as both `prebuild` and `predev`.

### 6.2 Routes that exist

| Route | File |
|---|---|
| `/` | `site/app/page.tsx` |
| `/projects` | `site/app/projects/page.tsx` |
| `/projects/ongoing` | `site/app/projects/ongoing/page.tsx` |
| `/projects/completed` | `site/app/projects/completed/page.tsx` |
| `/projects/[slug]` | `site/app/projects/[slug]/page.tsx` |

`ongoing` and `completed` are **real routes, not filter state**. Per
`docs/03-competitor-maxel.md` §4.1, a tender evaluator wants "finished work of comparable
value" as a destination they can send to a committee — a URL they can paste into an email.
Every route has its own `<h1>` and `<title>`; the competitor ships one `<title>` sitewide.
`_index-view.tsx` is the shared view the three index routes render through.

**Routes in the nav that do NOT yet exist and currently 404:** `/capabilities`, `/about`,
`/credentials`, `/careers`, `/contact`. These are phase G. `lib/nav.ts` already links them.

### 6.3 Components

| File | What it is |
|---|---|
| `components/milestone-portal-hero.tsx` | The live homepage hero. Wraps `ui/glyph-portal.tsx`. |
| `components/ui/glyph-portal.tsx` | Third-party, **MIT** (Christian Katzmann), used verbatim — keep the licence notice. |
| `components/image-stream-hero.tsx` | The "corridor" — z-axis card flight. Not on the homepage now; still available. |
| `components/project-reel-hero.tsx` | Video reel hero. Superseded by the portal; still available. |
| `components/project-card.tsx` | Maxel field order: scope → **Client** → **Project cost** in Cr, plus chainage and guarded progress. |
| `components/chainage-rail.tsx` | The signature element. See §7.2. |
| `components/reveal.tsx` | Scroll reveal. See §7.3 — read this one before touching it. |
| `components/counter.tsx` | Stat counter. See §7.4. |
| `components/container.tsx` | `Container`, `Section`, `Eyebrow` primitives. |
| `components/site-header.tsx` / `site-footer.tsx` | Shell. Header has a `data-solid` switch for dark heroes. |

### 6.4 Content system — typed MDX, no CMS (R6)

No Sanity, no Studio, no API keys, no hosted service. Content is MDX files under
`site/content/`, validated by Zod at build time.

- `lib/content/schema.ts` — the enforcement layer. Project, Milestone, Leader, Story,
  Capability, Client, Certification schemas.
- `lib/content/load.ts` — uses **`.parse()`, not `safeParse`**. A malformed project
  **fails the build** rather than rendering half a card. Do not "improve" this by catching
  and skipping; skipping is exactly how `Lorem ipsum` reaches production.
- `npm run content:check` — reports every problem at once and exits 1. This is the friendly
  view; the build is the strict one.
- Helpers: `getProject`, `projectsByStatus`, `projectTotals`.

Three schema decisions worth knowing:

- **`dateString` is a preprocessor, not `z.string().date()`.** An unquoted YAML date like
  `2026-08-01` is parsed by the YAML spec into a JavaScript `Date` object before Zod ever
  sees it, so a plain string schema rejects a date that looks perfectly correct in the
  file. The preprocessor accepts both and normalises. Applied to all eight date fields.
- **Alt text is `.min(10)`.** A one-word alt is worse than none.
- **`Leader` has no phone or email field, by design.** There is nowhere to accidentally
  publish a personal number.

Refinements enforced: progress percent requires a `progressUpdated` date; completed
projects require a `completionDate`; featured projects require a hero image.

**Drafts use an `_` directory prefix.** `content/projects/_bilodara-sihunj-road/` is skipped
by the loader and by media sync. This convention exists because Bilodara is missing
`contractValueCr` and `district`, and the choice was between weakening validation or
excluding the record — excluding it was correct.

**Project images live in `content/`, are served from `public/`.** `scripts/sync-media.ts`
copies them at build, skipping drafts. `public/content/` is **generated and gitignored** —
edit the originals beside their project, never the copies.

### 6.5 Content currently seeded

| Project | Status | Value | State |
|---|---|---|---|
| Bagodara–Dhandhuka–Fedra to Sarangpur Junction | ongoing | ₹138.19 Cr | **valid**, 4 images, featured |
| Bilodara to Sihunj Road | ongoing | — | **draft** — needs `contractValueCr`, `district` |

`docs/02-content-salvage.md` holds **eight further real projects** recovered from the live
site by the phase-1 crawl, with full tender scope text and awarding authority, totalling
₹394.10 Cr across the five that state a value. They are documented but **not yet seeded**
as MDX. That is the highest-value piece of remaining content work and it needs no new
information from the client — the copy is already confirmed.

---

## 7. The non-obvious decisions — read this section before changing anything

Everything here looks like something a tidy-minded developer would "fix". Each one is
load-bearing.

### 7.1 Motion is CSS + IntersectionObserver, NOT Framer Motion

Main brief §9 names Framer Motion. §9 also caps initial JS at **180 KB gzipped**, and the
client chunks **already measure ~199 KB**. Adding ~50 KB for reveals that CSS transitions
do natively fails the harder constraint for zero visual gain. This was measured before it
was decided. `motion` stays in `package.json` but is unused by the motion layer.

**Note the standing problem: the bundle is already over budget before phase H's Lighthouse
gate.** That needs addressing, and it is a reason not to add libraries casually.

### 7.2 The chainage rail reads its values off the DOM

Roads are measured in chainage — every NCC tender document reads `Km 88.565`, `Ch. 153.000`.
So the site's structural device is a road, and sections are `Km 0.000 / 1.200 / 2.450`
rather than `01 / 02 / 03`.

`chainage-rail.tsx` parses `Km x.xxx · Label` out of the section eyebrows **already
rendered on the page** rather than keeping a second list. The rail and the headings
therefore cannot disagree, a new section gets a tick for free, and a renamed section cannot
leave the rail pointing at a heading that no longer exists.

Desktop gutter rail at ≥1280px; collapses to a slim top progress bar below. `aria-hidden`
throughout — it is decorative, the headings carry the real semantics, and a screen reader
announcing "Km 2.450" as navigation would be noise.

### 7.3 The reveal has a 1.2 s failsafe, and it is not paranoia

Two invariants the motion layer must keep:

**Nothing is hidden by the stylesheet.** `[data-reveal="pending"]` is set only by JS. A
visitor with JS disabled sees content, because the hidden state never existed for them.

**But that is not sufficient**, and this was a real bug, not a theoretical one:
**IntersectionObserver callbacks do not fire in a hidden document.** Once JS sets `pending`,
the element is hidden; if the observer never fires it stays hidden **permanently, with no
error anywhere**. A page opened in a background tab finished loading with its entire body
at `opacity: 0`. Nine reveals, nine invisible.

Fixed two ways, both in `components/reveal.tsx`:
- elements already within the viewport at mount are **never hidden at all**
- a **1.2 s `setTimeout` reveals unconditionally**, whatever the observer is doing

The principle: *visible-but-unanimated always beats animated-but-invisible.*

### 7.4 Counters ship the true figure server-side

Main brief §4.4: "the correct number is in the HTML from the start; JS only animates toward
it." That second clause is the entire design. The final value is server-rendered as the
element's text; JS overwrites it while animating and then **restores the exact string**.

So crawlers and no-JS visitors read the true figure, a failed animation leaves the true
figure, and reduced motion leaves it untouched.

Why it matters: **both competitor sites render "0 +" in production**, because their counter
animates up from a hardcoded zero that was never wired to data. Starting from the truth
makes the worst case a number that doesn't animate, rather than a number that is wrong.

**Numbers are counted, never typed.** `projectTotals()` does arithmetic over real records.
Do not reintroduce a literal — and **never state a derived number twice on one page**, which
already produced a hardcoded "thirty-eight years" heading sitting beside a computed "39".

### 7.5 The corridor is exempt from the global reduced-motion reset

`globals.css` has the usual blanket `animation-duration: 0.01ms` under
`prefers-reduced-motion: reduce`. Applied to the corridor, that **collapses every card onto
the axis** — the animation *is* the layout. The corridor therefore must **pause**, not
disable:

```css
.corridor-card {
  animation-duration: var(--corridor-duration, 22s) !important;
  animation-play-state: paused !important;
}
```

This exemption has survived four palette migrations. Do not sweep it up in a fifth.

### 7.6 `lib/fonts.ts` exports the PRIMARY family only

`next/font` returns a **pair** — `Archivo, "Archivo Fallback"` — where the second is a
locally generated metric-adjusted fallback that never loads as a webfont and so reports
`unloaded` to the Font Loading API.

GlyphPortal decides whether to animate with `stalled = available.length < families.length`.
Hand it the pair and it counts 1 of 2 available, concludes the face is still pending, and
freezes the mount static — **the entire hero effect silently turns off, with no error
anywhere**. Hence:

```ts
export const DISPLAY_FAMILY = fontDisplay.style.fontFamily.split(",")[0].trim()
```

### 7.7 `lib/nav.ts` exists because of a prerender failure

`NAV` was originally exported from `site-header.tsx`, which is `"use client"`.
`SiteFooter` is a server component, and a plain constant exported from a client module does
not survive the server/client boundary — the build failed at prerender with
`NAV is not iterable`. Shared data gets its own module.

### 7.8 The Nataraja is a religious icon, not a graphic element (R2 §4)

**Non-negotiable.** Never rotate, distort, recolour outside its own brass range, animate,
use as a loading spinner, crop partially, or place as a decorative background watermark. It
appears in the logo lockup, at full figure, with clear space equal to the height of the
"N", and nowhere else. Getting this wrong reads as disrespectful to exactly the regional
audience the site is for.

Two consequences already in force:
- the statue **cannot** be the favicon — detail becomes noise at 16px, so the `N` monogram
  carries small sizes
- `icon-512.png` is **not attempted** until the logo vector exists, because a bad autotrace
  of the flame arch and the arms is worse than no asset at all

### 7.9 The hero: no photography, by instruction

`components/milestone-portal-hero.tsx` renders the full slogan **EVERY MILESTONE IS OUR
VISION** as type, and the camera flies through the **O** of MILESTONE.

The owner has ruled out photography and video in the hero. That **reverses R4 §3**, which
argued that real project work *is* the credibility claim. So the credentials became the
content you arrive inside the letter — the evidence still lands first, it just lands
through the type instead of under a photograph. **Do not reintroduce a photo hero without
re-checking that decision with the owner.**

The homepage `<h1>` is `sr-only`, because the slogan is SVG `<text>` and would otherwise
leave the page with no heading at all.

### 7.10 Never invent project content

Main brief §11 items 1–4 are outstanding, so contact details, project records and
photography **do not exist yet**. §7 is explicit: an incomplete field renders **nothing**
rather than a placeholder.

The §2 competitor teardown exists precisely because that site ships `+1 (859) 254-6589` and
`Lorem ipsum` in production, on a Gujarat contractor's website, because a template default
was never replaced.

Applied consequences: `OFFICES` carry no phone or email; `status` was never guessed from
photographs; Bilodara's district was **not** filled in with the tempting "Mehsana".

### 7.11 Confidence labels in all analysis

**Confirmed** / **High-confidence inference** / **Possible** / **Unknown**. Never present
inference as fact. If something cannot be determined, write "Unknown — cannot be
determined" rather than filling the gap.

---

## 8. Phase state

| Phase | | Status |
|---|---|---|
| 0 | Remote recon | ✅ `docs/00-phase0-forensic-report.md` |
| 1 | Browser extraction | ✅ `forensics/out/HANDOFF-INPUT.md` |
| 2 | Full forensic report | ⏭️ Skipped — the owner went straight to requirements |
| 3 | Requirements | ✅ `docs/01-requirements.md` + six revisions |
| 4 | Rebuild | 🔄 In progress |

### Phase 4 sub-phases

| | Deliverable | Status |
|---|---|---|
| A | Scaffold, design tokens, fonts, layout primitives, header/footer | ✅ Complete |
| B | No CMS (R6). `content/` tree, Zod schemas, loader, `content:check` | ✅ Gate closed |
| C | Static homepage — hero, ongoing, capabilities, numbers | ✅ Complete |
| D | Projects index + detail template + milestone timeline | ✅ Built |
| D.5 | Image corridor | ✅ Built (on generated gradients) |
| E | Motion: chainage rail, reveals, counters, card lift | ✅ Built |
| F | 3D project map | ⬜ **Optional** since R3 §4 — the corridor took its job |
| G | Remaining pages | ⬜ **Not started** |
| H | SEO, JSON-LD, OG images, sitemap, a11y, Lighthouse | ⬜ **Not started** |

Phases run in order and each has a gate.

---

## 9. What is NOT built, and why

| Not built | Reason |
|---|---|
| `/capabilities`, `/about`, `/credentials`, `/careers`, `/contact` | Phase G. Linked in `lib/nav.ts`, currently **404**. |
| `sitemap.ts`, `robots.ts`, JSON-LD, OG images | Phase H. None exist yet. |
| Client-logo marquee | **Blocked** — §11 item 7, no client logos supplied. A marquee of nothing is an empty strip. |
| 3D project map | Optional since R3 §4; the image corridor absorbed its role. |
| The eight salvaged projects, as MDX | Not blocked on the client — this is available work. |
| `icon-512.png` | Blocked on the logo vector. See §7.8. |
| Real contact details anywhere | Blocked — §11 item 4. |
| Photography swap in the corridor | Runs on generated gradients until real photography arrives. |

### Known debt

- **Client bundle ~199 KB gzipped against a 180 KB budget.** Over before the Lighthouse
  gate is even attempted.
- **`public/media/hero-reel.mp4` is 7.8 MB** and currently unused by the portal hero. It
  must be compressed or removed before launch.
- `docs/02-content-salvage.md` §"three findings" notes that the **live site's completed-
  projects page is empty** — and so is ours. Maxel publishes ₹761 Cr across nine completed
  projects. No amount of motion polish changes what a tender evaluator concludes from a
  blank page.

---

## 10. Blocked on the client — the critical path

Content, not code, sets the quality ceiling here.

**Blocking:**
1. **Completed project records** — highest value by a distance. Title, tender scope line,
   client/authority, contract value, chainage, length, district, dates. This is what makes
   the completed page exist.
2. Bilodara's `contractValueCr` and `district` — two fields promote a draft to a live record.
3. **Logo files, vector if one exists anywhere.**
4. **Real contact details** — resolve Orbit Business Hub vs Empire Business Hub vs Royal
   House, phone numbers, and a **domain email** to replace the Yahoo address on public
   record.

**Before launch:** certifications (Class AA certificate, ISO, NHAI/R&B/Railway
registrations) · leadership names, titles, photos, real bios · client list and logos ·
awards · company profile PDF for the hero CTA.

**Nice to have:** employee count, safety record, and a **plant and machinery list** —
genuinely persuasive to a tender evaluator, and something neither competitor publishes.

### Open questions still unanswered

1. Does the client's office staff need to edit the site, or only the owner?
2. Is there an existing project list in a document somewhere, or must it be compiled?
3. Who controls DNS for `nccinfraspace.com`, and can it point at Vercel?
4. Gujarati or Hindi version — now, later, or never? Cheap to plan for, expensive to retrofit.

---

## 11. Competitor context

Two teardowns exist and both informed the build.

- **`docs/01-requirements.md` §2 — marutiinfracreation.com.** The right *shape*, badly
  executed. Ships `Lorem ipsum` and a US phone number in production, and renders
  `Project Completed 0 +`.
- **`docs/03-competitor-maxel.md` — maxelprocon.com.** Better. The owner asked to "build
  the best of both". What was taken: the project-card field order (scope → client →
  project cost), completed work as a first-class destination, and the discipline of
  publishing contract values. Maxel publishes **₹761 Cr across nine completed projects**.
  Also renders `0 +`.

Both competitors ship a hardcoded zero counter. That is why §7.4 is written the way it is.

---

## 12. If you are picking this up now

Recommended order:

1. **Read `CLAUDE.md`** — the charter, shorter than this document and authoritative.
2. **Seed the eight salvaged projects** from `docs/02-content-salvage.md`. Not blocked on
   anyone, immediately improves the site's core credibility claim, and exercises the schema
   against real records. Note that six of the eight are `ongoing`/`awarded`, so the
   completed page still needs client input.
3. **Phase G** — build the five missing pages. `/contact` is the one users will look for
   first and it currently 404s. Guard every field: no invented contact details.
4. **Phase H** — `sitemap.ts`, `robots.ts`, JSON-LD (`Organization` + `Project`), OG images,
   full a11y audit, Lighthouse. Budget the bundle down from 199 KB on the way through.
5. Phase F only if the owner still wants it.

Before any change to colour, motion, fonts or the content loader, re-read §5.3 and §7. Each
of those constraints is there because the alternative was tried and broke something.

**Verification commands:**

```bash
cd site
npm install
npm run typecheck
npm run content:check
npm run build
npm run dev
```
