# CLAUDE.md — nccinfraspace.com rebuild

## What this repo is

A from-scratch rebuild of **https://nccinfraspace.com/**, the website of NCC Infraspace
Pvt Ltd (trading tagline: "Nataraj Construction Company").

There is **no access** to the original Git repository, source code, design files, CMS,
database, or developer documentation. The live public website is the only source of
truth about what currently exists.

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
| B | Sanity project, schemas, Studio at `/studio`, seed projects | ⬜ Next |
| C | Static homepage + corridor's static poster (not the animation) | ⬜ |
| D | Projects index + detail template + milestone timeline | ⬜ |
| D.5 | **Image corridor** — added by R3 §4, unblocked by R4 §2.2 | ✅ Built (gradients) |
| E | Remaining motion: rail, reveals, counters, marquee | ⬜ |
| F | 3D project map — **optional since R3 §4**; the corridor took its job | ⬜ |
| G–H | Remaining pages · SEO, JSON-LD, a11y, Lighthouse | ⬜ |

### Requirements are layered — read all of them, latest wins
| File | Carries | Palette status |
|---|---|---|
| `docs/01-requirements.md` | the main brief | §4.1 "Signboard" — **superseded** |
| `docs/01-requirements-r2.md` | light-only, brand assets, Nataraja rules | §2 "Brass & Indigo" — **superseded** |
| `docs/01-requirements-r3.md` | replaces main §4.1 palette and §6.1 hero | §1 "Brass & Midnight" — **live** |
| `docs/01-requirements-r4.md` | **deletes `--onyx`**; corridor on gradients | §1 amendment — **live** |

**R2 arrived after R3 and R4 were built.** Its §2 palette is two revisions stale and was deliberately
NOT applied. Everything else in R2 — dark-mode removal, the eyebrow treatment, the brand-asset and
favicon spec, and the Nataraja rules — is live. `--indigo` `#3B498C` is the one value identical across
every revision.

The live palette is **"Brass & Midnight"**. `--onyx` no longer exists — one dark hue only, descending
midnight → indigo → paper. **Three** enforcement rules, repeated in `globals.css` so they survive:
- `--brass` (`#B08D3F`) never carries body text on a light ground — 2.99:1.
- `--brass-light` (`#D9BE7A`) never appears on a light ground at all — 1.73:1; legal only in `.on-dark`.
- `--brass` never sits on `--indigo` — 2.67:1. **New in R4 and the easiest to break by accident,**
  because it was legal (5.21:1) while the deep band was `--onyx`.

### Two constraints that will get "tidied away" — don't
- **Hero copy must stay below the 68% scrim line.** Above it the `--brass-light` eyebrow fails AA.
- **The corridor is exempt from the global reduced-motion reset.** Without the exemption the blanket
  `animation-duration: 0.01ms` collapses every card onto the axis. It must *pause*, not disable.

### The Nataraja is a religious icon, not a graphic element (R2 §4)
**Non-negotiable.** Never rotate, distort, recolour outside its own brass range, animate, use as a
loading spinner, crop it partially, or place it as a decorative background watermark. It appears in
the logo lockup, at full figure, with clear space equal to the height of the "N", and nowhere else.
Getting this wrong reads as disrespectful to exactly the regional audience the site is for.

Consequences already in force: the statue **cannot** be the favicon (detail becomes noise at 16px —
the `N` monogram carries small sizes instead), and `icon-512.png` is not attempted until the logo
vector exists, because a bad autotrace of the flame arch and the arms is worse than no asset.

### The gradient hero is INTERIM
R4 §3: swap to real project photography before launch. An abstract hero on a road contractor's site
is "a placeholder that looks finished" — the same way the competitor's Lorem ipsum shipped and stayed.

### Where the rebuild lives
**`site/`** — matching the directory contract below. The app was scaffolded as `next-app/` and was
renamed per R2 §6; the empty `site/` placeholder is gone. There is one app, at `site/`.

### Hard rules that still apply
- **Never invent project content.** `docs/01-requirements.md` §11 items 1–4 are outstanding, so
  contact details, project records, and photography do not exist yet. §7 is explicit: an incomplete
  field renders nothing rather than a placeholder. The §2 competitor teardown exists precisely
  because that site ships `+1 (859) 254-6589` and `Lorem ipsum` in production. Do not repeat it.
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
