# R18 — the Projects page as engineering files

Implements the middle concept of the approved three-up ("02 — ENGINEERING FILES"): vertically
stacked, wide engineering-style project sheets. The later two-column mockup is not the selected
layout and is not built.

## 1. No decorative numbering, anywhere

No oversized 01/02, no corner sheet numbers, no "file 001", no 1-to-57 ordinal. A position in a
list that a visitor can reorder with a filter is not a fact about a project; printing it as one
in an engineering typeface would read as a drawing number. Verified: zero matches for a
numbering pattern anywhere in the rendered listing.

The archive's own identifiers stay — package numbers such as `MP-MDR-50-03` inside scope text,
and chainage such as `Km 82/300 – Km 133/200`, which are real and appear on the record.

The title takes the space the reference gave to the number. There is no blank column.

## 2. Structure

| | |
|---|---|
| `app/projects/_sheet-data.ts` | server-side view model; resolves images, formats the value, precomputes the search haystack, derives category counts from real records |
| `app/projects/_projects-browser.tsx` | client listing — search, category filter, per-sheet disclosure |
| `app/projects/_index-view.tsx` | shared shell for `/projects`, `/projects/completed`, `/projects/ongoing` |
| `app/projects/[slug]/page.tsx` | the same dossier language on the detail page |

The browser is a client component so filtering needs no round trip, but Next still renders it on
the server: **all 57 sheets are in the initial HTML**, with titles, values, scope and a
`View project` link each. With JavaScript off a `<noscript>` rule forces every disclosure panel
open, so nothing is locked behind a control that cannot run; only filtering is inert.

## 3. Page composition

Pure white, navy type, `--color-rule` hairlines, copper restricted to the value and active
controls. Max width 1120px; padding 40 / 28 / 20 / 16 at desktop / tablet / mobile / <360.
Heading `clamp(44px, 5vw, 72px)` on desktop and `clamp(32px, 8vw, 42px)` below — measured 32px
at 320 and 390, 72px at 1440 and 1536.

Categories are the five the content actually uses, with counts computed from the records being
listed: Highways 39 · Urban 9 · Water 6 · Industrial 2 · Rail 1, plus All 57. Below 768 they
become a labelled `<select>` rather than six controls squeezed across a phone.

## 4. The sheets

**One column at every viewport** — verified at 320, 390, 600, 768, 1024, 1280, 1440 and 1536:
one distinct left offset, 57 sheets, no horizontal overflow, no clipped text, zero text/image
overlap.

Square corners, 1px `--color-rule` border, no shadow, no radius, no texture. Padding 32 / 24 /
18. Content-driven height: a text-only sheet ends after its scope line, with no media frame and
no "image coming soon".

Titles 30px desktop / 22px mobile / 20px below 360, wrapping naturally — several road names run
past 90 characters and none is truncated. Body 16px at 1.6. Metadata labels 11px at 0.14–0.16em.
Contract value in `--color-copper-ink`; raw `--copper` is 3.51:1 on white and is barred from
carrying text.

`break-words` is on the title, scope and metadata values. Two tokens in the archive cannot fit a
320px measure — the word "Reconstruction" at title size, and a run-together `up to7.00mt.width`
in one scope record. Breaking them keeps every character readable; clipping would hide source
content.

## 5. Photography

The five approved associations are unchanged and nothing new was introduced: Bagodara (4
photographs), Bilodara (14), Chiloda NH-147, MP Major District Roads, and Kheda R&B various-road
works — whose file is named `Kheda-Dholka-Road.jpeg` and belongs to the R&B package, **not** the
separate Kheda–Dholka Road project.

Listing images render at their natural aspect ratio inside a bounded area with
`object-fit: contain`. Every approved hero is landscape (1.78 or 1.33), so nothing letterboxes
today; the bound is the guard for the one 660×1600 vertical in Bagodara's gallery and for any
future tall frame — it letterboxes rather than crops, and cannot dominate the file.

No invented road alignments, drawing identifiers, approval stamps, placeholder frames or
visitor-facing notes about missing content.

## 6. Interaction

Search matches title, scope, client, authority, location, highway and chainage, and combines
with the category filter — verified: "Sarangpur" → 1, "Kheda" → 3, "R and B Panchayat" → 17,
Water → 6, Water + "Surat" → 2. Empty result shows "No projects match your search." with a
working **Clear filters** action.

The disclosure is a real `<button>`: 44×44, `aria-expanded`, `aria-controls` pointing at an
existing panel, a project-specific accessible name ("Show record details for …"), plus when
collapsed and minus when expanded, and focus stays on the button through the toggle — all
verified, keyboard included. Transitions are 150ms colour only; no tilt, drag, page-curl or
scroll hijack. The title and **View project** stay ordinary links; no link is nested inside a
clickable sheet.

## 7. Detail pages

Back link, category · location · status, strong title, copper value when present, a fine-rule
Record table, scope, and the existing approved gallery. Desktop puts Record beside Scope; mobile
stacks them in normal flow.

The scope prints the MDX narrative when there is one and the summary when there is not — never
both. On most records the body opens by restating `scopeSummary` almost word for word, and
printing the pair reads as a stutter.

No fabricated technical tables, downloads or documents.

## 8. Data — unchanged

57 canonical projects, all Completed, all URLs preserved. One MP package at ₹158.27 Cr.
Bagodara's slug untouched. Bilodara published with no value, no district and no authority row —
verified on the rendered page, and no 0, "N/A" or guess anywhere. No completion dates, no
aggregate portfolio value, no district inferred from an awarding office. Currency is the stored
number printed verbatim, so the approved half-up rounding is preserved. Provenance comments
remain invisible: 57 pages checked, 0 leaking.
