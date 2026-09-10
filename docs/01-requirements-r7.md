# NCC Infraspace — Brief Revision 7
### `docs/01-requirements-r7.md` · FINAL PALETTE
**Closed by the owner: "I want this colour palette and it's final, no changes after this."**
Supersedes R5 §2 in full, and with it Signboard (main §4.1), Brass & Indigo (R2 §2) and
Brass & Midnight (R3 §1 / R4 §1).

---

## 1. The five, as supplied

| Name | Hex | Stated role |
|---|---|---|
| Midnight Navy | `#18202F` | Executive premium tech dark shade |
| Slate Blue | `#68748A` | Muted corporate professional secondary |
| Mist Gray | `#DCE1E6` | Cool metal digital interface background |
| Warm White | `#FAF7F2` | Clean contrast editorial light surface |
| Copper Accent | `#B8734F` | Warm glowing mechanical active-state accent |

**All five are used exactly as given. Nothing was recoloured.**

---

## 2. Verification

### 2.1 The backbone is the strongest of any revision

| | ratio |
|---|---|
| `--navy` on `--white` | **15.28:1** |
| `--white` on `--navy` | **15.28:1** |
| `--navy` on `--mist` | **12.40:1** |
| `--mist` on `--navy` | **12.40:1** |

For comparison: R5's best light-ground pairing was 15.03, R3's 15.25. This palette's light/dark
spine is excellent and needs no help.

### 2.2 Slate and copper are both mid-tones and cannot carry body text anywhere

| | on `--white` | on `--mist` | on `--navy` |
|---|---|---|---|
| `--slate` | 4.41 ✗ | 3.58 ✗ | 3.46 ✗ |
| `--copper` | 3.51 ✗ | 2.85 ✗ | 4.36 ✗ |

Six of six below AA. Slate misses by 0.09 on warm white, which is the most dangerous kind of
near-miss — it looks fine and it is not.

### 2.3 The trap: no text colour passes AA on raw copper

| label on `--copper` | ratio |
|---|---|
| white `#FFFFFF` | 3.75 ✗ |
| `--white` | 3.51 ✗ |
| `--navy` | 4.36 ✗ |

Copper's own definition is "active-state accent", which means buttons. Every label anyone would
reach for fails on it. This is the equivalent of R5's white-on-orange, but worse — in R5 navy-on-
orange worked at 4.61; here nothing works.

### 2.4 Mist as an interactive border fails

`--mist` on `--white` is **1.23:1**. Fine as a surface, not as a boundary that identifies a UI
component (WCAG 1.4.11, 3:1). Fourth revision running where the border token needed this fix.

---

## 3. Derived variants — lightness only, same hues

Solved against `--mist`, the harder of the two light grounds, so each works on both.

| Token | Hex | Measured | For |
|---|---|---|---|
| `--copper-ink` | `#8E5639` | 5.55 white · 4.51 mist | copper as TEXT on light |
| `--slate-ink` | `#5A6477` | 5.58 white · 4.53 mist | secondary text on light |
| `--copper-deep` | `#A26241` | `--white` label = **4.51** | **filled CTA** |
| `--copper-light` | `#BA7754` | 4.55 on navy | accent inside `.on-dark` |
| `--slate-light` | `#7C879C` | 4.51 on navy | muted inside `.on-dark` |
| `--rule-strong` | `#6C8196` | 3.77 white · 3.06 mist | interactive borders |

---

## 4. Enforcement rules

1. **`--slate` and `--copper` never carry body text on any ground.** Use `-ink` on light,
   `-light` on dark.
2. **No text colour passes AA on raw `--copper`.** A filled copper button uses `--copper-deep`
   with a `--white` label. This is the likeliest bug in the palette.
3. **`--mist` is a surface, never an interactive border.** Use `--rule-strong`.
4. **`--copper` is the active-state accent** — CTAs, hover/focus, current step, live status. Not
   decoration, not headings.

---

## 5. Hero scrim

Measured against the lightest card the corridor can produce (`--mist`):

| alpha | `--white` text | `--copper-light` |
|---|---|---|
| 0.50 | 3.72 ✗ | 1.11 ✗ |
| 0.60 | 4.88 ✓ | 1.46 ✗ |
| 0.80 | 8.77 ✓ | 2.61 ✗ |
| 0.96 | 13.49 ✓ | 4.02 ✗ |
| 1.00 | 15.28 ✓ | 4.55 ✓ |

```css
background: linear-gradient(180deg,
  rgb(24 32 47 / .35)  0%,
  rgb(24 32 47 / .70) 42%,
  rgb(24 32 47 / .96) 70%,
  var(--navy)        100%);
```

**HERO COPY MUST STAY BELOW THE 70% LINE.**

**The hero eyebrow is `--white`, not copper.** `--copper-light` is only 4.55:1 on *pure* navy, so it
drops below AA the instant the scrim lets any card through — it never clears over the corridor at
any usable alpha. Copper stays on the CTA, which is its stated job anyway.

---

## 6. Surface hierarchy

| Surface | Where | Foreground |
|---|---|---|
| `--navy` | Hero, credentials strip, footer | `--white`, `--copper-light`, `--slate-light` |
| `--white` | Default ground | `--navy`, `--slate-ink`, `--copper-ink` |
| `--mist` | Alternating band, cards | as white |

Credentials strip is `--navy` like the hero, separated by a 2px `--copper` rule. Copper as a rule
carries no text, so raw copper is legal there.

---

## Implementation notes (appended by Claude Code)

Migrated as a clean break — `--gold`, `--orange`, `--paper`, `--navy-deep` and the R5 `-ink`
variants are gone and not aliased. Zero stale tokens remain in `app/`, `components/` or `lib/`.

The reduced-motion corridor exemption survived untouched, as it has through every migration. It is
the block most likely to be swept up and it has nothing to do with colour.

Verified in browser: hero `rgb(24,32,47)`, body `rgb(250,247,242)`, CTA `#A26241` with a warm white
label, strip hairline raw `#B8734F`, numerals and logo dot `#BA7754`, 12 corridor cards.

Opacity modifiers resolved against `--navy`: eyebrow `/85` = 11.35:1, sub `/80` = 10.18:1, strip
labels `/70` = 8.06:1, ghost border `/40` = 3.58:1, pause control `/60` = 6.32:1. All pass.

Corridor gradients rebuilt from the five, four copper-dominant in twelve, none adjacent. `#2C3A52`
and `#0F1520` are derived mid- and deep-navy, added because twelve gradients from five colours read
as repetitive.

**Still outstanding, unchanged by this:** the R5 §4 logo decision. `#3B498C` on `#18202F` is
**1.86:1** — the wordmark is still effectively invisible on the site's own dark surface, and the
favicon and apple-icon still carry the logo blue. That needs the vector source and a client
decision; it is not a palette question.
