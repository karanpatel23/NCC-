# Design assumptions — provisional, pending owner sign-off

**Status:** these are *my* assumptions, not the owner's requirements.
**Supersedes nothing.** When `docs/01-requirements.md` is written by the repo
owner, it wins over every line in this file.

---

## Why this file exists

`CLAUDE.md` gates design work behind Phase 3 (requirements), and Phase 2 (the
full forensic report) is not written yet either. On 2026-08-25 the repo owner
explicitly directed that design work begin anyway.

That is the owner's call and the work is proceeding. But the decisions that
requirements would normally settle still have to be settled *somehow*, so they
are recorded here as explicit assumptions rather than being made silently inside
a design file. Each one is a place where the owner may disagree, and disagreeing
is cheap now and expensive later.

**`CLAUDE.md`'s phase table now disagrees with what the repo is doing.** Either
amend it, or treat this file as the amendment of record.

---

## Assumptions being made

| # | Assumption | Confidence | If wrong |
|---|---|---|---|
| A1 | The brand palette is kept; this is a redesign, not a rebrand. | **High-confidence inference** — the client owns `#374991`/`#ee9a08` and never asked for new colours. | Whole palette section is rewritten. |
| A2 | The amber must change *usage* but not *identity* — derived tints preserve hue 38° / sat 93%. | **High-confidence inference** | If a rebrand is authorised, pick an accent that passes at full saturation instead. |
| A3 | Typography may be replaced outright. Montserrat/PT Sans/Roboto are not brand assets, just accumulated defaults. | **Possible** — no evidence either way. | Keep Montserrat as the display face and re-pair around it. |
| A4 | The audience is government tender officers first, job applicants second, general public third. | **High-confidence inference** — from `CLAUDE.md` company facts. | Section ordering changes materially. |
| A5 | The existing route taxonomy (`roads-highways`, `bridges`, `awarded`, `completed`, `on-going`) is meaningful to the client and is preserved. | **Confirmed** it exists; **Possible** that it is still wanted. | Information architecture changes. |
| A6 | The `/admin/project` CMS is retained in some form — the client edits their own project list. | **High-confidence inference** — the Lambda write path exists and is used. | Content model changes; may become static data. |
| A7 | Content is migrated as-is. No copy rewriting is authorised. | **Possible** | Copy deck becomes a deliverable. |
| A8 | Both offices (Mehsana + Ahmedabad) are current and both should be published. | **Unknown — cannot be determined.** See below. | Contact page changes. |

---

## Open questions the owner must answer

These are **not** assumptions — they cannot responsibly be guessed.

1. **Is `/admin/project` authenticated server-side?** The client sends no
   credentials with its write to `addProjectToJsonfileOnS3`. Whether API Gateway
   enforces anything is unverified and was not tested. If it does not, the
   project list is publicly writable. **This is the highest-priority item in the
   repo and it is a security question, not a design one.**

2. **Which addresses are current?** Three names are now in evidence:
   - Orbit Business Hub, Radhanpur Road, Mehsana — *on the live site*
   - Empire Business Hub, Sola, Ahmedabad 380060 — *on the live site*
   - Royal House — *in MCA records, nowhere on the site*

   `CLAUDE.md` recorded this as "Orbit / Royal House, unresolved". The live site
   evidence changes the question rather than answering it.

3. **Is the Yahoo contact address deliberate?** `CLAUDE.md` flags it. A
   domain-hosted address is a credibility signal for government buyers.

4. **Headcount:** 54 (statutory) vs 101–500 (self-reported). If any staff number
   is published, which is true?

5. **Stack for the rebuild.** Not chosen. The design system is stack-agnostic so
   far; SSR/SSG is a hard requirement given the SEO findings, which rules out
   another plain CRA SPA.

---

## Inherited defects this design explicitly fixes

Carried from the Phase 1 crawl. Each is a shipped bug on the live site.

| Defect | Evidence | Fix in design system |
|---|---|---|
| Amber text at 2.27:1 | 30px headings in `#ee9a08` | `--color-accent-display` / `--color-accent-text` |
| Grey text at 2.08:1 | `--secondary-gray-color` | demoted to non-text |
| Five font families | 291 `system-ui`, 15 **Times** | two variable families |
| Bootstrap **and** Tailwind together | `stack.bootstrapClasses` + `tailwindClasses` | pick one |
| Soft 404s (HTTP 200) | `/awards` + 6 image URLs | real 404 status |
| `/awards` linked but has no route | footer `<a href="/awards">` | route or remove |
| 10 raw `<a href>` internal links | full reload, re-downloads 421 KB | client-side nav |
| Broken relative lightbox links | gallery + project listing | absolute S3 URLs |
| `undefined_` in a stored filename | S3 asset name | validate before write |
| Default CRA `manifest.json` | "Create React App Sample" | real PWA manifest |
| No sitemap; `sitemap.xml` returns the SPA shell | `forensics/out/raw/sitemap.xml` | generated XML sitemap |
