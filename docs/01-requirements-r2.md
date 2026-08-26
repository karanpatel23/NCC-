# NCC Infraspace — Brief Revision 2
### `docs/01-requirements-r2.md` · Supersedes §4.1, §4.2 (colour), §4.3 (rail colour), §9 (focus ring) of `01-requirements.md`
**Changes:** light theme only · palette rebuilt from the logo · brand asset spec added.

> ## ⚠️ READ THIS FIRST — §2 of this document is itself superseded
>
> R2 predates R3 and R4. The palette chain is:
>
> **main brief §4.1 "Signboard"** → *superseded by* **R2 §2 "Brass & Indigo"** →
> *superseded by* **R3 §1 "Brass & Midnight"** → *modified by* **R4 §1 (deletes `--onyx`)**
>
> **Do not implement §2's token values.** They are recorded here for provenance only.
> The live palette is R3 §1 as amended by R4 §1. The one value that survives unchanged
> through the whole chain is `--indigo: #3B498C`, the exact logo blue.
>
> Everything else in R2 — §1 (dark mode removal), §3 (typography addition), §4 (brand
> assets), §5 (21st.dev), §6 (repo bookkeeping), §7 (blocking items) — is **NOT
> superseded** and is implemented. See the notes at the foot of this file.

---

## 1. Dark mode is removed

Not a toggle set to default-light — **removed**. Delete it:

- All `.dark` / `[data-theme]` token blocks in `globals.css`
- Any `@media (prefers-color-scheme: dark)` rule
- `next-themes` / `ThemeProvider` / theme toggle component, if present
- The dark half of the `--color-focus` flip built in phase A

Add `color-scheme: light;` on `html` so form controls, scrollbars, and autofill don't render dark
regardless of OS setting.

**One thing that does *not* go away:** the site still has **dark bands** — the hero and footer sit on
deep indigo. That's a surface, not a theme. Foreground tokens still need to flip *by surface*, so keep
that mechanism but re-express it as `.on-dark` scoped to those sections, not as a global theme.
Getting this wrong is how the phase-A header bug happened (dark text on a dark hero), so it's worth
being explicit: **surface-scoped, not theme-scoped.**

---

## 2. Palette — "Brass & Indigo"  ⚠️ SUPERSEDED BY R3 §1 / R4 §1 — PROVENANCE ONLY

Sampled directly from the logo file, not estimated. The measured values:

| Element | Measured | Notes |
|---|---|---|
| NCC wordmark + "INFRASPACE PVT. LTD." | **`#3B498C`** | Consistent across both lines. This is the brand blue |
| Nataraja statue — deep shadow | `#473315` | |
| Nataraja statue — mid-dark | `#775F30` | |
| Nataraja statue — mid | `#A48C54` | The statue's characteristic tone |
| Nataraja statue — highlight | `#CEC08A` | |
| "NATRAJ CONSTRUCTION CO." subline | `#B3B4B3` | **2.08:1 on white — fails AA.** Do not reuse this grey for web text |
| Logo file background | `#ECEDEC` | Not transparent — see §4 |

The brass is a genuinely **antique, muted brass**, not bright gold. That's an advantage: bright gold on
blue reads as a cheap certificate border, while muted brass on deep indigo reads institutional. Keep it
muted — do not "correct" it toward `#FFD700`.

### Tokens

```css
:root {
  color-scheme: light;

  /* Brand — sampled from logo */
  --indigo:        #3B498C;   /* primary. wordmark blue, exact */
  --indigo-deep:   #232C5A;   /* derived. hero band, footer, deep surfaces */
  --indigo-wash:   #EDEFF6;   /* derived. tinted light surface, active filter chips */

  /* Accent — sampled from the Nataraja */
  --brass:         #A48C54;   /* markers, rules, icons, large type only */
  --brass-deep:    #6F5828;   /* the text-safe brass. use whenever brass must be readable */
  --brass-light:   #CEC08A;   /* accent on dark bands only */

  /* Neutrals */
  --paper:         #FFFFFF;   /* page background */
  --stone:         #F2F2F0;   /* alternating sections. echoes the letterhead's own ground */
  --ink:           #1B1E28;   /* body text — blue-black, not neutral black */
  --muted:         #5C6070;   /* secondary text, metadata */
  --rule:          #DADCE3;   /* hairlines, card borders (non-text) */

  /* Function */
  --focus:         #3B498C;   /* focus ring on light surfaces */
  --focus-on-dark: #CEC08A;   /* focus ring inside .on-dark sections */
}
```

### Measured contrast — all verified, not assumed

| Foreground | on `--paper` | on `--stone` | on `--indigo-deep` | Verdict |
|---|---|---|---|---|
| `--ink` | **16.63** | 14.83 | — | Body text ✓ AAA |
| `--muted` | **6.25** | 5.57 | — | Metadata ✓ AA |
| `--indigo` | **8.34** | 7.44 | — | Headings, links ✓ AAA |
| `--brass-deep` | **6.77** | 6.04 | — | Text-safe accent ✓ AA |
| `--brass` | 3.25 | 2.90 | 4.09 | ✗ body text. Large text (≥24px), icons, rules only |
| `--brass-light` | 1.82 | — | **7.30** | Dark bands only ✓ AA |
| `--paper` | — | — | **13.30** | Text on hero/footer ✓ AAA |
| `--rule` | 1.37 | — | — | Non-text, exempt |

**Two rules that follow from the numbers, and must be enforced in review:**

1. `--brass` never carries body text on a light surface. If brass text has to be readable, it's
   `--brass-deep`. This is the single easiest way to accidentally ship an a11y failure here.
2. `--brass-light` never appears on a light surface — 1.82:1 is invisible. It exists only inside
   `.on-dark`.

### Usage rules

- **Indigo is the workhorse**, not the accent: headings, links, primary buttons, active states, the
  chainage rail line, filter chips.
- **Brass is ceremonial.** Under ~5% of any viewport. It marks: chainage tick numbers, the completed
  portion of a progress bar, section eyebrow rules, milestone dots on the timeline, the hero CTA
  underline. It never fills a large area.
- **No gradients on brand surfaces.** The only permitted gradient is the scrim over hero photography:
  `linear-gradient(180deg, rgb(35 44 90 / 0.75), rgb(35 44 90 / 0.45))` — indigo-tinted, so the
  photography sits in the brand rather than under a neutral black wash.
- **`--stone` alternation** carries the section rhythm. Paper → stone → paper, with indigo-deep
  reserved for exactly two moments: the hero and the footer. Using it a third time cheapens both.

### What changed from R1 and why

The signboard-green and retro-yellow palette is **withdrawn entirely**. It was derived from Indian
highway signage, which was a defensible starting point with no logo in hand — but green fights the
logo's blue, and a company whose letterhead is indigo-and-brass cannot have a green website. The logo
wins. The chainage-rail concept survives unchanged; only its colours move: the rail line is `--indigo`
at 25% opacity, ticks and chainage numerals are `--brass`, and the travelled portion fills `--indigo`.

---

## 3. Typography — unchanged, with one addition

Archivo (display) / IBM Plex Sans (body) / IBM Plex Mono (data) all still hold. Archivo's expanded
width sits comfortably next to the wordmark's heavy geometric letterforms.

**Addition:** the logo's "INFRASPACE PVT. LTD." line is set in **widely letterspaced caps**. Make that
the eyebrow treatment sitewide — `IBM Plex Sans, 500, 11px, letter-spacing: 0.18em, uppercase,
--brass-deep`. It's a detail lifted straight off the letterhead, so the site and the printed
stationery visibly belong to each other.

---

## 4. Brand assets

### The logo file you sent is a screenshot, not an asset

Background `#ECEDEC`, 422×184, raster. Before phase C you need:

1. **Vector source** (`.ai`, `.eps`, `.svg`, or `.cdr`) — whoever made the letterhead has it. Ask the
   printer if the office doesn't.
2. **Transparent-background PNG at 3×** as a fallback if no vector exists (~1266×552 minimum).
3. **A one-colour version** — the full lockup in solid `--indigo` — for the footer and any dark band,
   since the brass statue won't hold up reversed out of indigo-deep.

If no vector turns up, the statue can be traced, but budget real time for it — the Nataraja has fine
detail (the arch of flames, the individual arms) that a bad autotrace destroys.

### Favicon

**The statue cannot be the favicon.** At 16px and 32px that level of detail becomes noise. Spec:

| Asset | Size | Content |
|---|---|---|
| `favicon.ico` | 16, 32, 48 | `N` monogram, `--paper` on `--indigo`, square, no radius |
| `icon.svg` | vector | Same monogram, so it stays sharp and supports light/dark browser chrome |
| `apple-touch-icon.png` | 180×180 | Full `NCC` wordmark on `--indigo`, 20px padding |
| `icon-512.png` | 512×512 | Statue silhouette in `--brass` on `--indigo` — legible at this size |
| `og-image.png` | 1200×630 | Lockup + positioning line on `--indigo-deep`, generated per-page via `next/og` for projects |

### Handling the Nataraja respectfully

It's a religious icon, not a graphic element. Non-negotiable: never rotate, distort, recolour outside
its own brass range, animate, use as a loading spinner, crop it partially, or place it as a decorative
background watermark. It appears in the logo lockup, at full figure, with clear space equal to the
height of the "N", and nowhere else. Get this wrong and it reads as disrespectful to exactly the
regional audience the site is for.

---

## 5. On the 21st.dev Hero10 component you sent

**Park it.** Two reasons, and the second is the real one:

1. §10 of the brief puts 21st.dev at **phase E**. You're at the end of phase A.
2. More importantly, that component is a centred SaaS hero — `rounded-xl`, `shadow-xl`, `font-serif`,
   a fan of three rotated photo cards, centred text, `max-w-2xl`. Every one of those fights this
   brief: 2px radius, near-zero shadows, Archivo not a serif, left-aligned signage layout, full-bleed
   photography. Dropping it in would undo the visual identity in a single commit.

**What's worth taking from it:** the `Reveal` wrapper pattern, the `container`/`item` stagger variants,
and its `useReducedMotion()` guard are all clean and match §4.4's motion rules. Lift that structure at
phase E; leave the layout and styling behind.

When you send the rest of the 21st.dev prompts, I'll sort them the same way — which to use, which to
strip for parts, which to skip — so Claude Code isn't deciding that mid-build.

---

## 6. Repo bookkeeping from the phase-A report

Both flagged by Claude Code, both worth doing now:

- The app is at `next-app/`, the brief says `site/`. Pick one — I'd rename `next-app/` → `site/` to
  match `CLAUDE.md`'s directory contract — and delete the empty placeholder.
- `CLAUDE.md`'s phase table needs this revision noted so a future session doesn't rebuild the green
  palette from the R1 doc. Add: *"§4.1 colour tokens superseded by `docs/01-requirements-r2.md`."*

**Also worth crediting:** the phase-A contrast findings were right and caught a real defect in my own
spec. `--retro` at 1.52:1 would have made the focus ring invisible on every light surface — an
accessibility failure written into the accessibility section. The R2 palette above is contrast-checked
at the source for exactly that reason.

---

## 7. Still blocking

Unchanged from §11 and §12 of the main brief. In current priority order:

1. Logo vector source (this now blocks phase C, not just polish)
2. Project data — titles, clients, contract values, chainage, dates, ongoing %
3. Project photography
4. Real contact details + a domain email
5. **§12 Q1 — do the client's office staff edit the site, or only you?** Phase B's schema guardrailing
   depends on this and Claude Code is already waiting on it.

---

## Implementation notes (appended by Claude Code, not part of the owner's brief)

### §2 was NOT implemented — deliberately

R2 arrived after R3 and R4 had already been implemented, and both explicitly supersede its palette.
Applying §2's tokens now would have rolled the live design back two revisions. The values are recorded
above for provenance; nothing in `globals.css` changed.

Worth noting the chain agrees on the one thing that matters most: `--indigo: #3B498C`, sampled from
the wordmark, is identical in R2 and R4. The brand blue has been stable across every revision.

Two R2 observations are also independently confirmed by the phase-1 crawl:
- The `#B3B4B3` subline grey at **2.08:1** is the same failure mode as the live site's
  `--secondary-gray-color` `#b2b4b3`, measured at 2.08:1 in the forensic extraction. Same colour,
  same defect, already in production.
- R2's caution that `--brass` fails as body text (3.25:1 there, 2.99:1 in R4) is now enforcement
  rule 1.

### §1, §3, §4, §6 implemented

| Item | Status |
|---|---|
| §1 — `next-themes`, `ThemeProvider`, `suppressHydrationWarning` removed | ✅ |
| §1 — `color-scheme: light` on the root element | ✅ (already present from R3) |
| §1 — surface-scoped `.on-dark`, not theme-scoped | ✅ (already built; R2 confirms the approach) |
| §3 — eyebrow: Plex Sans 500 / 11px / 0.18em / caps / `--brass-deep` | ✅ verified at 1.98px = 0.18em × 11px |
| §4 — `favicon.ico` at 16/32/48, N monogram, paper on indigo, square | ✅ generated, 2.6 KB |
| §4 — `icon.svg`, same monogram, vector | ✅ |
| §4 — `apple-touch-icon` 180×180, wordmark, 20px padding | ✅ generated via `next/og` |
| §6 — rename `next-app/` → `site/`, delete placeholder | ✅ |
| §6 — note the supersession in `CLAUDE.md` | ✅ |

The eyebrow moves from Plex **Mono** to Plex **Sans**. Mono remains correct for measurements in body
content (main brief §4.2); the eyebrow is chrome, not a measurement, even when it carries a chainage
value.

The Next.js scaffold's default `favicon.ico` was still in place — 26 KB of Vercel's own mark being
served as NCC's icon. Replaced with the spec monogram.

### §4 — two assets that cannot be produced

Both depend on the blocked logo vector (§7 item 1):

- **`icon-512.png`** — specified as the statue silhouette in `--brass` on `--indigo`. Requires the
  Nataraja vector. Tracing it from the 422×184 raster screenshot would produce exactly the bad
  autotrace §4 warns against, on a religious icon where §4's handling rules make sloppiness a
  reputational problem rather than a cosmetic one. Not attempted.
- **`og-image.png`** — needs the lockup. Deferred to phase H, where §9 already schedules per-project
  OG generation via `next/og`.

The Nataraja handling rules are copied into `CLAUDE.md` verbatim, because they are the kind of
constraint that a future session with no access to this file would violate without ever knowing it
had.

### §5 — already the outcome

The three 21st.dev prompts sent during phase A were parked on the same reasoning, before R2 arrived:
§10 places 21st.dev at phase E, and no API key is configured. The `Reveal` / stagger / `useReducedMotion`
structure is noted for phase E.
