# NCC Infraspace — Brief Revision 10
### `docs/01-requirements-r10.md` · Logo refinement, 14 September 2026

**Closed by the owner.** Amends R9 §2 (the lockup) only. The palette, hero, page copy,
project records and navigation are unchanged.

---

## 1. The approved change

| | Before (R9) | After (R10) |
|---|---|---|
| Supporting line | `INFRASPACE PRIVATE LIMITED` | **`INFRASPACE PVT. LTD.`** |
| Source artwork | lossy WebP encode | **lossless PNG master** |
| Desktop mark height | 44 px, legal line 8.5 px | **48 px, legal line 11 px** |
| Mobile mark height | 32 px, legal line 8 px | **40 px, legal line 10 px** |
| Footer mark height | 56 px, legal line 10 px | **56 px, legal line 12 px** |

The wording change is to the **visual mark only**. The full legal name, *NCC Infraspace
Private Limited*, remains the accessible name of the logo, `COMPANY.legalName`, the footer
copyright, the `/about` identity rail and the CIN block.

---

## 2. Source artwork — verified, and one recommendation rejected

The archive recovered at R9.5 (`medley-main.zip`) contains the original site source. Two
candidate masters were inspected rather than taken on trust.

### Adopted: `NCC-logo.png`, 3208×1182, lossless

Copied into the repo as **`site/public/brand/ncc-lockup-master.png`**, unmodified, never
served. It supersedes the lossy WebP, which has been removed.

Measured over the figure's 513,290 opaque pixels, the WebP cost **PSNR 33.4 dB** — mean
error 4.69/255, peak 26/255, 9% of pixels off by more than 8. Visible in the brass
gradients and nowhere else.

**One honest qualification.** The WebP's **alpha channel was bit-identical** to the PNG's
(max delta 0). The cutout edge was never degraded, so the wordmark mask — which uses alpha
only — gains **nothing measurable** from the master. It is re-cut from the master anyway so
both derivatives share one provenance, not for a quality reason.

### Rejected: `NCC-icon.png`, 1245×1377

The R9.5 findings report recommended this as "the Nataraja alone… strictly better."
**That recommendation was wrong and is withdrawn.** Inspecting it against the figure in the
lockup shows:

1. **It is a different statue.** Round lotus base against the lockup's rectangular stepped
   base; a different lattice in the flame arch; aspect 0.867 against 0.819; only 66%
   silhouette agreement. Adopting it would have swapped the company's mark for another
   photograph of a different object.
2. **It is clipped.** Alpha reaches 255 on both its first and last row — the artwork runs
   off the canvas top and bottom.

The figure inside `ncc-lockup-master.png` touches no canvas edge and is complete.

The splash-animation frames (`logo-animation_*_rectangle.webp`) remain rejected: they carry
a **baked-in cream background**, which R9 withdrew.

### Derivatives created

| File | Derivation |
|---|---|
| `public/brand/ncc-lockup-master.png` | The lossless original, preserved. Not served. |
| `public/brand/nataraja.webp` | Straight crop `(18,2)–(955,1145)` → 737×900. Never redrawn, autotraced, stretched or recoloured. |
| `public/brand/ncc-wordmark-mask.png` | Alpha of the band `(1061,7)–(3172,717)` → 1400×471. That band holds **zero** non-blue opaque pixels, so its alpha reproduces the letterforms exactly. |

Still true: **no vector master exists.** The archive's `src/logo.svg` is the stock Create
React App mark.

---

## 3. Rendered result

| | figure | wordmark | supporting line | total |
|---|---|---|---|---|
| Desktop header (≥1024) | 39.3×**48** | 89.2×30 | **11 px** | 183.6×48 |
| Tablet / mobile (<1024) | 32.7×**40** | 74.3×25 | **10 px** | 160.9×40 |
| Footer | 45.8×**56** | 104.1×35 | **12 px** | 206.7×56 |

All three sit inside the approved starting ranges (desktop 44–52, mobile 36–44, footer
48–60) with the supporting line in the 10–12 px target band.

**Proportions hold.** Rendered figure ratio **0.8184** against the master's 0.8186;
wordmark **2.9729–2.9732** against 2.9732. `object-contain` is retained and is load-bearing:
`next/image` rounds derivative heights to whole pixels, and without it the browser default
`object-fit: fill` squeezes the artwork by about 1%.

**No plate.** Measured in header and footer: `background-color rgba(0,0,0,0)`,
`border-width 0px`, `box-shadow none`.

**Ink follows the surface** via `currentColor`: navy `rgb(24,32,47)` on white, pure white on
navy — 16.32:1 either way.

The supporting line runs wider than the three letters above it. That is the ordinary shape
of an acronym over its expansion; matching the widths would need stretched text or padded
tracking, which R10 rules out.

---

## 4. A regression this change introduced, and fixed

Sizing the mark up to 48 px at the `md` breakpoint **overflowed the header at 768 px**: the
Enquire CTA ran to x=782.6 in a 768 px viewport and was clipped.

It did not show up in an overflow check because **the header is `position: fixed`**, so the
content clips instead of extending the document and no scrollbar appears. R9 fitted with
about 6 px to spare; the wider mark consumed it.

Fixed by stepping the mark up at **`lg` rather than `md`** — between 768 and 1023 the bar
carries the mark, five nav items *and* the CTA — and by tightening the container and nav
gaps below `lg` (`gap-6`, restored to `gap-8` at `lg`).

Verified clean at 320 / 390 / 640 / 767 / 768 / 800 / 900 / 1023 / 1024 / 1440, and at 200%
and 250% browser zoom. At 768 the CTA now ends at 744 and the logo-to-nav gap is 32 px,
which clears R2 §4's clear-space rule (the height of the "N", 25 px at a 40 px mark).

**Flagged for the owner, not changed:** the primary nav appears at `md`, so 768–1023 must
fit a five-item nav, a CTA and the mark. It fits, but tightly. Moving the nav breakpoint to
`lg` would give all three room. That is a navigation-behaviour change and needs approval.

---

## 5. Accessibility

- **One accessible name.** The header link carries
  `aria-label="NCC Infraspace Private Limited, home"` and the lockup inside it is
  `aria-hidden`, so the company is announced once rather than by both the link and the
  image. In the footer, where nothing else names it, the lockup keeps its own
  `role="img"` label. A `decorative` prop selects between the two.
- **Touch target.** The home link is **199.6×48** on desktop and **176.9×44** on mobile —
  the mark itself is 40 px there, so the link carries `min-h-[44px]` with padding
  negative-margined back out so the larger hit area does not shift the mark.
- **Focus.** `#8E5639` copper-ink, 2 px solid, 2 px offset — 5.55:1 on white.

---

## 6. Unchanged, and still open

Unchanged by R10: pure-white/navy/slate/mist/copper palette, the MILESTONE hero, page copy,
project records, navigation structure.

**Not published, pending owner review** (R9.5 extraction): the 57 recovered project records
and their aggregate values, the 13 client logos, director portraits and biographies, the
historical milestone timeline, and any newly discovered contact details. The prior
completed-status approval does **not** extend to newly discovered records.

Still open: a vector master; `icon.svg` and `apple-icon.tsx` still carry `#3B498C`;
`/capabilities`, `/credentials` and `/careers` 404.
