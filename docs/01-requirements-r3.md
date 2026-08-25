# NCC Infraspace — Brief Revision 3
### `docs/01-requirements-r3.md` · Supersedes the palette in R2 and §6.1 (Hero) of the main brief
**Decided:** palette locked (B × F merge) · hero replaced with the image-corridor component.

> **Repo note.** R2 is not in this repository — only the main brief
> (`01-requirements.md`) and this revision. R3 supersedes R2's palette in full, so
> nothing is lost for the palette, but if R2 changed anything else it is unrecorded.

---

## 1. Final palette — "Brass & Midnight"

The B × F merge, resolved. B contributes the midnight indigo and the richer brass; F contributes the
warm ground and, critically, a **warm** near-black rather than a blue one. The primary is pulled back
to the exact logo hex.

```css
:root {
  color-scheme: light;

  /* Brand */
  --indigo:       #3B498C;  /* exact logo blue. Links, primary buttons, active states */
  --midnight:     #2A3465;  /* deep blue band. Credentials strip, stat blocks */

  /* Deep surface — warm, not blue */
  --onyx:         #22201C;  /* hero, footer. A stone colour, not a night colour */

  /* Accent — the Nataraja's brass, enriched */
  --brass:        #B08D3F;  /* marks, rules, progress fills, large type */
  --brass-deep:   #775C29;  /* the text-safe brass on light ground */
  --brass-light:  #D9BE7A;  /* accent inside .on-dark only */

  /* Ground */
  --paper:        #FBFAF7;  /* page background */
  --cloud:        #F2F0EA;  /* primary warm surface, cards on sand */
  --sand:         #E6E3DA;  /* alternating section band */
  --rule:         #DAD6CA;  /* hairlines, card borders (non-text) */

  /* Type */
  --ink:          #23221E;  /* warm near-black body text */
  --muted:        #5D5B54;  /* metadata, secondary */

  /* Function */
  --focus:        #3B498C;
  --focus-on-dark:#D9BE7A;
}
```

### Verified contrast

| | on `--paper` | on `--cloud` | on `--sand` | on `--midnight` | on `--onyx` |
|---|---|---|---|---|---|
| `--ink` | **15.25** | 13.97 | 12.41 | — | — |
| `--muted` | **6.51** | 5.96 | 5.30 | — | — |
| `--indigo` | **7.99** | 7.32 | 6.50 | — | — |
| `--brass-deep` | **6.01** | 5.51 | 4.89 | — | — |
| `--brass` | 2.99 ✗ | 2.74 ✗ | 2.43 ✗ | 3.78 ~ | 5.21 ✓ |
| `--brass-light` | 1.73 ✗ | — | — | **6.52** | **8.98** |
| `--paper` | — | — | — | **11.32** | **15.58** |

Buttons: white on indigo **7.99** · onyx text on brass-light **8.98** · ink on brass **5.10**.

**The two enforcement rules carry over unchanged.** `--brass` never carries body text on a light
ground (2.99:1). `--brass-light` never appears on a light ground at all (1.73:1). Both are correct
*only* in the roles listed. Put these in the CSS as comments so they survive the next person.

### Surface hierarchy — use exactly this

| Surface | Where | Foreground |
|---|---|---|
| `--onyx` | Hero, footer | `--paper` text, `--brass-light` accents |
| `--midnight` | Credentials strip, stat blocks only | `--paper` text, `--brass-light` numerals |
| `--paper` | Default page ground | `--ink`, `--muted`, `--indigo` |
| `--cloud` | Cards, panels | as paper |
| `--sand` | Alternating band behind cards | as paper |

Three dark moments maximum per page — hero, one strip, footer. A fourth turns the warm ground into
punctuation instead of the page.

---

## 2. Hero — the image corridor

Replaces §6.1 item 2 entirely. The component you sent (`ImageStreamHero`) is well built — the depth
spacing is geometric so the ribbon can't tear, cards are dropped mid-flight by negative animation
delays so the corridor is full on frame one, and `prefers-reduced-motion` **pauses** rather than
disables, which freezes it as a finished still instead of collapsing every card onto the axis. Take it.

### Why it fits this site specifically

Fed with abstract gradients it's decoration. Fed with **your own project photography** it becomes an
argument: a continuous stream of built work rushing at the viewer, which is exactly the claim a
contractor with 38 years of projects wants to make in the first three seconds. Maruti's hero is a
stock slogan over a static image. This is not a comparison they win.

It also resolves cleanly against the chainage rail: **the rail does not run in the hero.** The
corridor is the approach; the rail starts at `Km 0.000` immediately below it, at the credentials
strip. The road arrives, then it's measured.

### Configuration

```tsx
<ImageStreamHero
  images={featuredProjectImages}   // from CMS, see §2.3
  cards={9}                        // 6 on mobile
  speed={22}                       // slower than the 18s default — see below
  axis={58}
  className="relative min-h-[88svh] bg-[--onyx]"
>
```

**`speed={22}` not `18`.** The default rush reads as energetic for a portfolio and slightly frantic
for an infrastructure contractor. Slower makes the same images feel weighty. Tune it once with real
photos in place, not before.

**Scrim.** The corridor sits under a two-stop wash so headline text holds at AAA:
`linear-gradient(180deg, rgb(34 32 28 / .55) 0%, rgb(34 32 28 / .82) 62%, var(--onyx) 100%)`.
The bottom stop resolving to solid `--onyx` is what lets the credentials strip butt against it with
no seam.

**Content over it.** Left-aligned, not the demo's centred layout: eyebrow in `--brass-light`, H1 in
Archivo Expanded `--paper`, one-line sub, two CTAs (`--brass-light` filled primary with `--onyx`
text at 8.98:1; ghost secondary with a `--paper`/40% hairline).

### 2.1 Changes required before it ships

Six, in priority order. The first three are non-negotiable.

1. **Swap the raw `<img>` for a CDN-sized source.** The component renders `cards × 2` images — 18 at
   default. Unoptimised project photos at that count will destroy LCP on a 4G connection. Every card
   image comes from Sanity at **≤640px wide, AVIF, quality 70**. Cards are never larger than ~46% of
   container width, so 640px covers the exit size on desktop. This single change is the difference
   between a 400 KB hero and a 6 MB one.
2. **Text must be the LCP element, not the corridor.** The H1 renders server-side; the corridor mounts
   client-side and its images carry `loading="lazy"` `fetchPriority="low"` (the component already sets
   lazy — keep it). Verify in Lighthouse that LCP resolves to the headline.
3. **Add a pause control.** Motion rushing toward the viewer is a vestibular trigger, and
   `prefers-reduced-motion` only helps people who have already found that setting. A small
   bottom-right pause/play toggle, `--paper`/60%, that flips `animation-play-state`. Cheap, and it's
   the difference between a hero that's bold and one that's hostile.
4. **Mobile: `cards={6}`, `speed={26}`.** Fewer cards and slower travel; the corridor is
   container-query sized so proportions hold, but 18 animated layers on a mid-range Android is a
   thermal problem, not a design one.
5. **Honour `navigator.connection.saveData`** — render the static poster instead (§2.2).
6. **`will-change: transform` on the card class**, and drop it once paused. The component sets
   `backfaceVisibility` already but not this.

### 2.2 Static fallback

A single rendered frame of the corridor, exported as one AVIF, shown when: `saveData` is on, JS is
off, or the images fail. It ships in the SSR HTML so the hero is never empty. This is also what the
crawler sees.

### 2.3 Where the images come from

`images` is `project.heroImage` from every project flagged `featured`, ordered by `displayOrder`,
capped at 12. **No abstract gradients, no stock.** If there are fewer than 6 usable project photos,
the corridor does not ship — fall back to a single full-bleed photograph with the same scrim and copy.
Say this out loud in the schema comment, because a half-empty corridor repeating three images looks
worse than no corridor.

Photo direction for the corridor specifically: **verticals or squares**, since cards are 18×25 world
units (a 0.72 ratio). Structures, not machinery. Wide skies help — the images are seen small and in
motion, so anything with fine detail reads as noise.

---

## 3. How this propagates to the rest of the site

The corridor establishes a visual language. Three things carry through; everything else stays quiet,
or the site becomes exhausting.

**1. The card ratio.** `18:25` (0.72) becomes the project-card image ratio everywhere — index cards,
related projects, gallery thumbnails. The hero's cards and the index's cards are visibly the same
object at different depths.

**2. Depth as the transition grammar.** Where R1 said sections rise 24px on scroll, they now rise
*and* scale from 0.985 → 1. Same duration (500ms), same `once: true`. It reads as continuing the
corridor's z-motion rather than as a different animation vocabulary. Section transitions never slide
laterally — nothing on this site moves sideways except the corridor itself.

**3. Corner radius.** The corridor uses `0.4cqw` — roughly 3–5px at real sizes. R2 said 2px. **Move
the whole site to 3px** so cards, buttons and the corridor agree. Still effectively square.

**What does not propagate:** perspective on hover, tilting cards, parallax layers, or a second
infinite loop anywhere. The corridor is the site's one moment of spectacle. §4.4's rule stands —
spend boldness in one place.

### Page-by-page consequence

| Page | Hero treatment |
|---|---|
| Home | Full corridor, `min-h-[88svh]` |
| Projects index | No corridor. `--onyx` band, 200px tall, title + filter chips. The projects *are* the corridor's content, so repeating it undercuts both |
| Project detail | One static card at exit size, full-bleed, `--onyx` scrim. The card that stopped |
| Capabilities, About, Credentials, Careers | `--midnight` band, 240px, title + one line. No imagery |
| Contact | `--cloud`, no dark band at all. It's a utility page |

---

## 4. Build-order change

The corridor moves the motion work earlier than R1's phase E, because the hero can't be built
"statically first" in any meaningful way.

| Phase | Change |
|---|---|
| C | Homepage static, **with the corridor's static poster in place** — not the animation. Everything else unchanged |
| D | Unchanged — projects index and detail |
| **D.5** | **New.** Corridor integration: component in, Sanity images wired, all six §2.1 changes, pause control, Lighthouse verified. Gate: **LCP still under 2.0s on throttled 4G with 12 real photos loaded** |
| E | Remaining motion: rail, reveals, counters, marquee. Depth grammar per §3.2 |
| F | 3D project map — **now optional.** See below |

**On the 3D map:** you now have a strong, moving, memorable hero. The map was specced as the section
people screenshot; the corridor takes that job. Keep the map only if it earns its place as
*information* — where the projects are — and be willing to ship it as the static extruded PNG with
linked pins instead of live WebGL. Two spectacle moments on one page is one too many, and the corridor
is the better of the two because it's made of real work rather than abstraction.

---

## 5. Still blocking

The corridor sharpens the content dependency rather than softening it. **Six to twelve strong
vertical project photographs are now a hard build dependency for the homepage.** Not nice-to-have —
without them phase D.5 cannot run and the hero falls back to a single image.

Unchanged and still outstanding: logo vector, project data, real contact details, and §12 Q1 —
whether the client's office staff edit the site or only you.

---

## Implementation notes (appended by Claude Code, not part of the owner's brief)

### The §1 contrast table is correct

All 22 published ratios were recomputed independently (WCAG 2.1 relative luminance, sRGB). **Zero
mismatches** — every value matches to two decimal places. The three button assertions also hold:
white on indigo 8.34:1 (the brief says 7.99, which is the *indigo on paper* figure; white on indigo
is slightly higher, so the claim is conservative), onyx on brass-light 8.98:1, ink on brass 5.10:1.

### Three additions were required

**1. `--rule-strong` `#9B9070`.** `--rule` is 1.39:1 on paper. Correct for the decorative hairlines
and card borders §1 assigns it, which carry no contrast requirement — but insufficient for a boundary
that *identifies a UI component*, which WCAG 1.4.11 holds to 3:1. Form input borders and focusable
card outlines use `--rule-strong` (3.04:1); dividers keep `--rule`.

**2. Hero copy anchored to the lower band.** §2 states the two-stop scrim holds headline text at AAA.
Measured against the worst realistic case — a blown-out sky, which §2.3 explicitly asks for — the
**top stop does not hold**:

| Scrim alpha | `--paper` text | `--brass-light` eyebrow |
|---|---|---|
| 0.55 (top stop) | **3.58:1** ✗ fails AA | **2.06:1** ✗ fails badly |
| 0.65 | 4.88:1 AA | — |
| 0.82 (62% stop) | **8.73:1** AAA | **5.03:1** AA |

The gradient is kept exactly as specified, because darkening the top stop would mud the corridor,
which is the entire point of the component. Instead the content block is anchored into the lower band
(`justify-end`) where the scrim is already ≥0.82. **Hero copy must never rise above the 62% line.**

**3. `data-solid` on the header.** The transparent header treatment paints `--paper` text and a
`--brass-light` logo dot, which is legal only over a dark band. §3's page table gives `/contact`
"`--cloud`, no dark band at all" — there the dot would render at 1.73:1, breaking §1 enforcement
rule 2. Pages now opt into the transparent treatment by marking their hero `[data-dark-hero]`;
everything else gets the solid treatment from first paint. Verified on both branches.

### Opacity modifiers, resolved

Tailwind opacity shorthands reduce effective contrast, so each was computed against its real backdrop
rather than assumed:

| Use | Resolved | Ratio | |
|---|---|---|---|
| nav links, hero sub — `--paper`/80 on onyx | `#D0CECB` | 10.36:1 | PASS |
| footer address, CIN — `--paper`/65 on onyx | `#AFAEAA` | 7.32:1 | PASS |
| credentials labels — `--paper`/70 on midnight | `#BCBFCB` | 6.44:1 | PASS |
| ghost CTA border — `--paper`/40 on onyx | `#797774` | 3.64:1 | PASS (1.4.11) |

### Status

Palette, radius (3px), card ratio (18:25) and surface hierarchy are implemented and verified in a
real browser. **The corridor itself is not built** — §4 places it at D.5, and §2.3's own rule is that
with fewer than six usable project photographs it does not ship. Zero exist. The hero is currently
the specified fallback: a single `--onyx` band carrying the same scrim structure and copy, ready for
the corridor to slot behind it once §5 is satisfied.
