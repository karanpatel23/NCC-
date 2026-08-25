# NCC Infraspace — Brief Revision 4
### `docs/01-requirements-r4.md` · Supersedes `--onyx` everywhere in R3, and R3 §2.2–2.3 (hero imagery)
**Two changes:** `--onyx` is deleted from the system · the corridor ships with generated gradients
instead of photography.

---

## 1. `--onyx` is removed

Delete the token. Every surface that used it moves to the blue family, so the site now has exactly
one dark hue and it's the brand's own.

```css
:root {
  /* Brand */
  --indigo:        #3B498C;   /* exact logo blue. Links, primary buttons, credentials strip */
  --midnight:      #2A3465;   /* the only deep surface. Hero, footer */

  /* Accent */
  --brass:         #B08D3F;
  --brass-deep:    #775C29;
  --brass-light:   #D9BE7A;

  /* Ground */
  --paper:         #FBFAF7;
  --cloud:         #F2F0EA;
  --sand:          #E6E3DA;
  --rule:          #DAD6CA;
  --rule-strong:   #9B9070;   /* keep — interactive borders, WCAG 1.4.11 */

  /* Type */
  --ink:           #23221E;
  --muted:         #5D5B54;

  /* Function */
  --focus:         #3B498C;
  --focus-on-dark: #D9BE7A;
}
```

`--ink` stays warm (`#23221E`). That's deliberate — the *text* keeps the warmth that made F worth
merging in, while the surfaces go blue. Warm ink on warm ground with cool brand surfaces is a
tighter system than the all-warm version, not a compromise of it.

### Revised surface hierarchy

| Surface | Where | Foreground | Verified |
|---|---|---|---|
| `--midnight` | Hero, footer | `--paper` / `--brass-light` | 11.32 / 6.52 |
| `--indigo` | Credentials strip, stat blocks | `--paper` / `--brass-light` | 7.99 / 4.61 |
| `--paper` | Default ground | `--ink` / `--muted` / `--indigo` | 15.25 / 6.51 / 7.99 |
| `--cloud` | Cards, panels | as paper | 13.97 / 5.96 / 7.32 |
| `--sand` | Alternating band | as paper | 12.41 / 5.30 / 6.50 |

The dark→mid→light step (midnight hero → indigo strip → paper body) now reads as one hue descending
in depth, which suits the corridor better than the old warm-black/blue mix ever did.

**One new prohibition:** `--brass` on `--indigo` is **2.67:1** — it was 5.21 on onyx. Brass marks
that used to sit on the deep band must move to `--brass-light` (4.61) on indigo. Add this to the
enforcement audit alongside the two existing rules.

> If you meant *no dark bands anywhere* rather than *not that particular black*, say so and I'll spec
> the light-hero variant instead — it's a real option with the corridor, just a different composition.
> The above assumes you wanted the brand blue rather than the brown-black.

---

## 2. Hero corridor — generated gradients

Photography is deferred. The corridor ships now with gradient cards, which **unblocks phase D.5
immediately** — the six-photo gate in R3 §2.3 no longer applies to the interim build.

### 2.1 Not `Math.random()`

Random per-render breaks server/client hydration (different gradient on server than on client → React
mismatch) and makes every reload look different, which reads as instability rather than variety.
**Deterministic by index.** Twelve gradients, assigned `GRADIENTS[i % 12]`, identical on every render.

### 2.2 The set

Every stop is drawn from the token palette — no hue exists here that isn't already in the system. That
is what stops this looking like generic AI gradient soup, and it means the corridor reads as branded
even though it's abstract.

```ts
// lib/corridor-gradients.ts
export const GRADIENTS = [
  'linear-gradient(145deg, #3B498C 0%, #2A3465 100%)',
  'linear-gradient(145deg, #2A3465 0%, #1C2447 100%)',
  'linear-gradient(145deg, #775C29 0%, #B08D3F 100%)',
  'linear-gradient(145deg, #3B498C 0%, #775C29 100%)',
  'linear-gradient(145deg, #4A5699 0%, #2A3465 100%)',
  'linear-gradient(145deg, #B08D3F 0%, #D9BE7A 100%)',
  'linear-gradient(145deg, #2A3465 0%, #775C29 100%)',
  'linear-gradient(145deg, #5A68A8 0%, #3B498C 100%)',
  'linear-gradient(145deg, #1C2447 0%, #3B498C 100%)',
  'linear-gradient(145deg, #775C29 0%, #2A3465 100%)',
  'linear-gradient(145deg, #D9BE7A 0%, #B08D3F 100%)',
  'linear-gradient(145deg, #3B498C 0%, #1C2447 100%)',
] as const;
```

Rhythm matters more than the individual values: the sequence alternates blue-dominant and
brass-dominant cards so the corridor pulses between the two brand colours as it rushes. Three
brass cards in twelve — the same restraint ratio as the rest of the site. Don't reorder them into
blue-blue-blue-brass-brass-brass; the interleave is the point.

**Depth cue.** Add a single radial highlight over each card so they don't read as flat rectangles at
exit size:

```css
.corridor-card::after {
  content: '';
  position: absolute; inset: 0;
  background: radial-gradient(120% 90% at 30% 15%, rgb(251 250 247 / .16), transparent 62%);
}
```

### 2.3 Component change

Replace the `<img>` branch with a `div` carrying the gradient. Keep the `images` prop signature intact
so photography drops in later with no rewrite:

```tsx
type StreamCard = { src?: string; gradient?: string; alt?: string };

// in the card body:
{card.src
  ? <img src={card.src} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
  : <div className="h-full w-full" style={{ background: card.gradient }} />}
```

**Three of R3 §2.1's six required changes now fall away** — CDN sizing, `saveData` fallback, and the
lazy-loading concern are all moot with zero network requests. What remains and still matters:

1. **Text must be the LCP element.** Now easy — with no images, the H1 is the only real candidate.
2. **Pause control.** Unchanged and still required. Vestibular triggers don't care that the moving
   objects are abstract; if anything, 18 rushing gradient panels are a stronger trigger than
   photographs, because there's no detail to fixate on.
3. **`cards={6}` and `speed={26}` on mobile.** Still a compositing cost even with no images.
4. **`will-change: transform`**, dropped on pause.

Genuine upside: the hero is now roughly **zero KB of media**, entirely CSS-composited. Phase D.5's
LCP gate should pass comfortably.

### 2.4 Scrim — rebuilt, and the numbers matter

The old scrim was onyx-based and Claude Code was right that it failed. With gradient cards the maths
changes twice over — the surround is midnight now, and we control how light the cards can get.

Measured, `--paper` text and the `--brass-light` eyebrow against midnight scrim at each alpha:

| Scrim alpha | `--paper` text | `--brass-light` eyebrow |
|---|---|---|
| 0.60 | 3.48 ✗ | 2.00 ✗ |
| 0.70 | 4.58 ~ | 2.64 ✗ |
| 0.85 | 7.21 ✓ | 4.16 ✗ |
| 0.90 | 8.42 ✓ | 4.85 ✓ |
| 1.00 (solid) | 11.32 ✓ | 6.52 ✓ |

**The eyebrow is the binding constraint, not the headline** — brass-light needs alpha ≥ 0.90 to clear
AA, where paper clears at 0.70. So:

```css
background: linear-gradient(180deg,
  rgb(42 52 101 / .40)  0%,
  rgb(42 52 101 / .70) 42%,
  rgb(42 52 101 / .96) 68%,
  var(--midnight)     100%);
```

**Content anchors below the 68% line**, where the wash is effectively solid. The corridor lives in the
top 60% and rushes *toward* the copy rather than behind it — which is a better composition than
text-over-motion anyway. Keep Claude Code's CSS comment recording this rule; it's the kind of
constraint that gets "tidied" away in six months.

---

## 3. Consequences worth being clear about

**The corridor no longer makes an argument.** R3's case for it was that a stream of real project
photography *is* the credibility claim. Gradients are decoration — handsome, on-brand decoration, but
they say nothing about NCC. Two things follow:

1. **The credentials strip has to carry the weight now.** `Est. 1987 · Class AA — Govt. of Gujarat ·
   ₹302 Cr FY24 · Crisil BBB-/A3`, immediately below the fold, in `--indigo`. It was important before;
   with an abstract hero it's the first substantive thing on the page.
2. **This is interim, not final.** Write it into the code as a comment and into the phase table as a
   task: *swap gradients → project photography before launch*. An abstract gradient hero on a road
   contractor's site is a placeholder that looks finished, which is exactly the kind of thing that
   ships by accident and stays for three years. Maruti's Lorem ipsum got there the same way.

The photo requirement therefore moves from **blocking** to **pre-launch**. Still needed: 6–12 vertical
project photographs, structures rather than machinery.

---

## 4. Repo notes

- **R2 isn't in the repo.** R3 replaced its palette, but R2 also carried the favicon and icon set spec,
  the logo vector requirement, and the Nataraja handling rules — none of which are superseded. Add it
  as `docs/01-requirements-r2.md` and mark its §2 palette section as replaced by R4.
- **Add R4's brass-on-indigo prohibition to the enforcement audit.** The existing script checks two
  rules; this is a third, and it's the one most likely to be violated by accident since brass on the
  deep band used to be legal.
- The `[data-dark-hero]` header branching stays as built — it's correct, and with onyx gone it simply
  resolves against midnight instead.

---

## 5. Outstanding

| Item | Status |
|---|---|
| §12 Q1 — do the client's staff edit the site, or only you? | **Still blocking phase B** |
| Logo vector source | Blocking phase C polish |
| Project data (titles, clients, values, chainage, dates, %) | Blocking phase D |
| Project photography | Now pre-launch, no longer blocking D.5 |
| Real contact details + domain email | Pre-launch |

---

## Implementation notes (appended by Claude Code, not part of the owner's brief)

### §1 and §2.4 both verify exactly

All six §1 surface-table values recomputed and matched. The new prohibition confirmed: `--brass` on
`--indigo` is **2.67:1**, against **3.78:1** on `--midnight` (large text only there, never body copy)
and the 5.21:1 it enjoyed on the deleted `--onyx`.

The §2.4 scrim table reproduces exactly against a **white** backdrop. Worth knowing: with gradient
cards the lightest surface the corridor can now produce is `#D9BE7A`, not white, so the published
figures are **conservative**. Real values at the specified stops:

| Stop | vs white (published) | vs `#D9BE7A` (actual worst case) |
|---|---|---|
| 0.40 | paper 2.24 · eyebrow 1.29 | paper **3.38** · eyebrow **1.95** |
| 0.70 | paper 4.58 · eyebrow 2.64 | paper **6.18** · eyebrow **3.56** |
| 0.96 | paper 10.44 · eyebrow 6.02 | paper **10.44** · eyebrow **6.02** |

The conclusion is unchanged — the eyebrow is the binding constraint and copy must sit below 68%.

### The reduced-motion exemption is load-bearing

`globals.css` carries a blanket `prefers-reduced-motion` reset that forces
`animation-duration: 0.01ms !important` on `*`. Left alone, that would have snapped every corridor
card to its 100% keyframe and **collapsed the whole corridor onto the axis** — the exact failure R3
§2 praised the component for avoiding. The corridor is explicitly exempted and set to
`animation-play-state: paused` instead, so it freezes mid-flight as a composed still.

**Do not delete that exemption when tidying the motion reset.** It is the difference between "pauses"
and "disables", which R3 §2 and R4 §2.3 both require.

### Verified in-browser

- Mobile branch engages correctly: at 673px, 12 cards (6×2) at 26s, per §2.3 item 3.
- All animation delays negative, spanning −23.8s→0 — the corridor is full on frame one.
- 12 distinct Z positions from −2240px to +437px; cards are distributed in depth, not stacked.
- 12 distinct gradients; deterministic assignment confirmed, no `Math.random`.
- Pause control: `animation-play-state` → `paused`, `will-change` released to `auto`, `aria-pressed`
  tracks state.
- Enforcement audit: rules 1 and 3 clean. Rule 2's single hit is a false positive — the audit walks
  the DOM for a background and cannot see through a transparent `position: fixed` header to the hero
  behind it. Confirmed directly: at scroll 0 the element behind the header is the hero at
  `rgb(42,52,101)`, where `--brass-light` is 6.52:1.

### R2 still cannot be added

§4 asks for R2 to be committed as `docs/01-requirements-r2.md`. **Its content has never been supplied
to this repo**, so it cannot be written without inventing it — and fabricating a favicon spec, an icon
set, and the Nataraja handling rules is precisely the failure mode this project exists to avoid.

Paste R2 and it will be committed verbatim with its §2 palette marked superseded. Until then the
following remain unrecorded anywhere in the repo:

- favicon and icon set specification
- logo vector requirement
- Nataraja handling rules
