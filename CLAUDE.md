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
| D.5 | **Image corridor** integration — added by R3 §4 | ⬜ |
| E | Remaining motion: rail, reveals, counters, marquee | ⬜ |
| F | 3D project map — **optional since R3 §4**; the corridor took its job | ⬜ |
| G–H | Remaining pages · SEO, JSON-LD, a11y, Lighthouse | ⬜ |

### Requirements are layered — read both
`docs/01-requirements.md` is the main brief. **`docs/01-requirements-r3.md` supersedes its §4.1
palette and §6.1 hero entirely.** Where they disagree, R3 wins. R2 is not in this repo; R3 replaces
its palette in full, but anything else R2 changed is unrecorded.

The live palette is **"Brass & Midnight"**, not "Signboard". Two rules are load-bearing and are
repeated in `globals.css` so they survive:
- `--brass` (`#B08D3F`) never carries body text on a light ground — 2.99:1.
- `--brass-light` (`#D9BE7A`) never appears on a light ground at all — 1.73:1. It is legal only
  inside `.on-dark`.

### Where the rebuild lives
**`next-app/`, not `site/`.** The directory contract below names `site/`; the owner scaffolded
`next-app/` instead and that is the real application. `site/` is a stale empty placeholder — delete
it or rename `next-app/` to match, but do not create a second app.

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
- `site/` — the rebuild. Empty until phase 4.

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
