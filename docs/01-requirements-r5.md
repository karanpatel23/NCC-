# NCC Infraspace — Brief Revision 5
### `docs/01-requirements-r5.md` · Supersedes the palette in R3 and R4 in full
**Brass & Midnight is withdrawn.** The four-colour palette below replaces it everywhere.
Everything else — typography, chainage rail, corridor mechanics, motion policy, page structure,
content model — is unchanged.

---

## 1. Audit of the four colours as given

| Colour | Hex | HSV | As text on light | On `#112532` |
|---|---|---|---|---|
| Warm Gold | `#F4B044` | H37 S72 V96 | **1.89 ✗** | **8.35 ✓** |
| Burnt Orange | `#E0680E` | H26 S94 V88 | **3.41 ✗** | **4.61 ✓** |
| Light Slate Blue | `#88A5B7` | H203 S26 V72 | **2.59 ✗** | **6.08 ✓** |
| Dark Blue | `#112532` | H204 S66 V20 | **15.74 ✓** | — |

**The shape of this palette:** it is built for dark surfaces. Three of the four colours are legible
only *on* the navy, and none of them can carry text on a light ground. That's not a flaw — it's a
direction. It means the site leans darker than R4 did, with light sections as relief rather than as
the default.

Two things it doesn't include, which the system needs and I've derived below: **a ground family** and
**text-safe variants of the three accents**.

### The gotcha most likely to ship

**White text on the orange is 3.41:1 — it fails.** Orange buttons take `#112532` text (4.61:1), not
white. This is the single most likely accessibility bug in this palette, because white-on-orange looks
fine to a sighted designer at full size and is the default anyone reaches for.

---

## 2. The token system

```css
:root {
  color-scheme: light;

  /* ── Core four, as given ── */
  --navy:          #112532;  /* deep surface AND body text. Does both jobs */
  --gold:          #F4B044;  /* primary accent */
  --orange:        #E0680E;  /* status accent — see §3 */
  --slate:         #88A5B7;  /* structural / quiet */

  /* ── Text-safe variants (derived — the four above cannot carry text on light) ── */
  --gold-ink:      #7A4E05;  /* 7.19 on white */
  --orange-ink:    #8F3B06;  /* 7.51 on white */
  --slate-ink:     #3F6076;  /* 6.67 on white */

  /* ── Ground family (derived — cool, so warmth stays purely accent) ── */
  --paper:         #F8FAFB;  /* page background */
  --mist:          #E9EEF1;  /* alternating band, cards on paper */
  --rule:          #D3DBE0;  /* decorative hairlines (1.37 — non-text only) */
  --rule-strong:   #9AA9B2;  /* interactive borders, WCAG 1.4.11 (3.06 on paper) */

  /* ── Type ── */
  --ink:           #112532;  /* = navy. 14.9 on paper */
  --muted:         #4E7086;  /* 5.27 on white, 4.93 on paper */

  /* ── Deeper surface for stacking ── */
  --navy-deep:     #0A1720;  /* footer, when it must sit under a navy hero */

  /* ── Function ── */
  --focus:         #8F3B06;  /* orange-ink, 7.51 on light */
  --focus-on-dark: #F4B044;  /* gold, 8.35 on navy */
}
```

### Verified pairings

| | on `--paper` | on `--mist` | on `--navy` |
|---|---|---|---|
| `--ink` / `--navy` | **14.90** | 13.34 | — |
| `--muted` | **4.93** | — | — |
| `--gold-ink` | **7.19** | — | — |
| `--orange-ink` | **7.51** | — | — |
| `--slate-ink` | **6.67** | — | — |
| `--gold` | 1.89 ✗ | — | **8.35** |
| `--orange` | 3.41 ✗ | — | **4.61** |
| `--slate` | 2.59 ✗ | — | **6.08** |
| `--paper` | — | — | **15.03** |

Buttons: navy on gold **8.35** · navy on orange **4.61** · navy on slate **6.08** · paper on navy **15.03**.

---

## 3. Role discipline — four colours is a lot

Gold, orange, slate and navy all competing for the same surfaces will look like a carnival within
three pages. Each gets one job, and the orange one is the important idea:

| Token | Job | Never |
|---|---|---|
| `--navy` | Hero, footer, body text, headings | As an accent on dark |
| `--gold` | **Primary accent.** CTAs, chainage ticks, eyebrows on dark, active nav, focus ring on dark | Large fills; text on light |
| `--orange` | **Status only.** Ongoing-project pills, live progress fills, "in progress" milestones, the `as of` stamp | Decoration, CTAs, section headers |
| `--slate` | **Structural quiet.** Hairlines on dark, secondary surfaces, disabled states, map and diagram linework | Anything that should attract attention |

Giving orange a single semantic meaning — *this is happening right now* — turns the fourth colour from
a decoration problem into an information channel. Ongoing projects glow orange; completed ones are
gold and navy. That reads instantly, and it's the distinction your site is actually built around.

**Enforcement rules** (replacing R4's three — put these in `globals.css` and the audit script):

1. `--gold`, `--orange`, `--slate` never carry text on `--paper` or `--mist`. Use the `-ink` variants.
2. `--gold-ink`, `--orange-ink`, `--slate-ink` never appear on `--navy` (all under 3:1).
3. **Orange buttons take `--navy` text, never white.**
4. `--orange` appears only in status contexts per the table above.

---

## 4. The logo problem — needs a decision

This palette contains **no colour from the logo.** And the hard number: your wordmark blue `#3B498C`
on `#112532` is **1.89:1**. The logo is close to invisible on the navy — which is now the hero and the
footer, i.e. both places the logo has to appear.

The gold is a bright cousin of the Nataraja's brass and sits happily beside it. The indigo is the
problem: `#3B498C` (H230) against navy `#112532` and slate `#88A5B7` (both H203) is the classic
two-blues collision — near enough to look like a mistake, far enough not to harmonise.

Three ways out:

| | Approach | Cost |
|---|---|---|
| **1** | **Mono logo on dark.** Full-colour lockup on light surfaces only; a single-colour `--paper` or `--gold` version in the hero and footer. Statue keeps its brass everywhere | None. Ships today. Standard practice for any brand with a dark mode |
| **2** | **Recolour the wordmark to `--navy`** across all uses, statue stays brass/gold. The system becomes fully coherent and the gold flatters the statue better than the indigo ever did | Brand decision — needs the client's sign-off, and the letterhead would eventually follow |
| **3** | Keep indigo as a fifth token used only in the logo | Cheapest, but the two-blues tension stays visible forever |

**Recommendation: 1 now, 2 as the conversation to have with the client.** Option 1 requires no
permission and no rework, and if the client later agrees to 2, nothing built breaks.

Either way this needs the vector source, which is still outstanding.

---

## 5. Corridor gradients — rebuilt

Replaces R4 §2.2 wholesale. Same rules: deterministic by index, every stop from the token set, blue
and warm interleaved so the corridor pulses rather than clumps.

```ts
export const GRADIENTS = [
  'linear-gradient(145deg, #1B3A4E 0%, #112532 100%)',
  'linear-gradient(145deg, #F4B044 0%, #E0680E 100%)',
  'linear-gradient(145deg, #88A5B7 0%, #3F6076 100%)',
  'linear-gradient(145deg, #112532 0%, #0A1720 100%)',
  'linear-gradient(145deg, #E0680E 0%, #8F3B06 100%)',
  'linear-gradient(145deg, #3F6076 0%, #112532 100%)',
  'linear-gradient(145deg, #F4B044 0%, #7A4E05 100%)',
  'linear-gradient(145deg, #88A5B7 0%, #112532 100%)',
  'linear-gradient(145deg, #1B3A4E 0%, #E0680E 100%)',
  'linear-gradient(145deg, #0A1720 0%, #3F6076 100%)',
  'linear-gradient(145deg, #E0680E 0%, #F4B044 100%)',
  'linear-gradient(145deg, #112532 0%, #1B3A4E 100%)',
] as const;
```

Four warm cards in twelve, spaced so no two sit adjacent on the same rail. `#1B3A4E` is a derived
mid-navy, added because twelve gradients built from only four colours read as repetitive.

The `::after` radial highlight from R4 stays, retinted:
`radial-gradient(120% 90% at 30% 15%, rgb(248 250 251 / .14), transparent 62%)`.

### Scrim — recomputed for navy

Navy is darker than the old midnight, so this gets easier. Against the lightest card the corridor can
now produce (`#F4B044`):

| Alpha | `--paper` text | `--gold` eyebrow |
|---|---|---|
| 0.60 | 6.15 ✓ | 3.41 ✗ |
| 0.70 | 7.84 ✓ | 4.35 ~ |
| 0.80 | 9.96 ✓ | 5.53 ✓ |
| 1.00 | 15.03 ✓ | 8.35 ✓ |

```css
background: linear-gradient(180deg,
  rgb(17 37 50 / .35)  0%,
  rgb(17 37 50 / .65) 42%,
  rgb(17 37 50 / .94) 68%,
  var(--navy)        100%);
```

The gold eyebrow still binds, so **the content anchor below the 68% line stays**. But the top stop
can lift from 0.40 to 0.35, meaning more of the corridor is visible than under R4. Keep the CSS
comment recording why.

---

## 6. Surface hierarchy and page treatments

| Surface | Where | Foreground |
|---|---|---|
| `--navy` | Hero, footer, credentials strip | `--paper` text, `--gold` accents, `--slate` hairlines |
| `--navy-deep` | Footer only when it directly follows a navy section | as navy |
| `--paper` | Default ground | `--ink`, `--muted`, `--*-ink` accents |
| `--mist` | Alternating band, cards | as paper |

Note the change from R4: the credentials strip is now **navy, not a separate blue** — this palette has
no mid-blue surface, and inventing one would add a fifth colour. Instead the strip is separated from
the hero by a `--gold` hairline. Simpler and stronger.

| Page | Hero |
|---|---|
| Home | Corridor, `min-h-[88svh]`, navy |
| Projects index | Navy band 200px, title + filters |
| Project detail | One static card at exit size, navy scrim |
| Capabilities / About / Credentials / Careers | Navy band 240px, title + one line |
| Contact | `--paper`, no dark band |

---

## 7. Migration notes for Claude Code

- Token rename is wholesale: `--midnight`/`--onyx`/`--indigo`/`--brass*`/`--cloud`/`--sand` all go.
  Don't alias old names to new values — a clean break makes stragglers fail loudly instead of
  rendering the wrong colour quietly.
- `[data-dark-hero]` header branching is unchanged in mechanism; the transparent-state logo dot becomes
  `--gold` (8.35 on navy) and the solid-state dot becomes `--navy`.
- The reduced-motion corridor exemption from Phase A must survive this migration untouched. It has
  nothing to do with colour and it is the thing most likely to get swept up in a large edit.
- Re-run the enforcement audit with §3's four rules replacing the old three.
- `--rule` is 1.37 on paper — decorative only, exactly as before. `--rule-strong` is the interactive one.

---

## 8. Outstanding

| Item | Status |
|---|---|
| **§12 Q1 — client's staff editing the site, or only you?** | **Still blocking phase B.** Asked three times now |
| Logo vector + §4 decision (mono-on-dark vs recolour) | Blocking phase C polish |
| Project data | Blocking phase D |
| Project photography | Pre-launch |
| Contact details + domain email | Pre-launch |

---

## Implementation notes (appended by Claude Code, not part of the owner's brief)

### §1, §5 and the core §2 values verify exactly

The four core colours, all three `-ink` variants, the `--navy`/`--gold`/`--orange`/`--slate`
pairings, and **the entire §5 scrim table** recompute to the published figures. The §1 gotcha is
confirmed precisely: white on orange is **3.41:1** and fails; navy on orange is **4.61:1** and
passes.

Enforcement rule 2 is also confirmed — the three `-ink` variants on `--navy` measure 2.19, 2.10 and
2.36, all under 3:1, so the prohibition is correct.

### One real defect: `--rule-strong`

Given as `#9AA9B2`. Measured **2.31:1 on paper and 2.07:1 on mist** — below the 3:1 that WCAG 1.4.11
requires of a boundary identifying a UI component, which is the only reason the token exists.

Corrected to **`#778B98`** — 3.38 on paper, 3.03 on mist, hue and saturation preserved. This is the
third revision running in which the interactive-border token shipped below its own threshold (R3
`--rule` 1.39, R4 inherited, R5 `#9AA9B2` 2.31). Worth checking first next time.

### A basis discrepancy worth knowing, not a defect

The §2 "Verified pairings" table is headed **on `--paper`** but carries §1's **white**-based figures.
Paper (`#F8FAFB`) is fractionally darker than white, so the real values run ~0.3 lower:

| Token | §2 says | on real `--paper` |
|---|---|---|
| `--gold-ink` | 7.19 | **6.87** |
| `--orange-ink` | 7.51 | **7.17** |
| `--slate-ink` | 6.67 | **6.38** |
| `--gold` | 1.89 | **1.80** |
| `--orange` | 3.41 | **3.26** |
| `--slate` | 2.59 | **2.47** |

Every one still lands the same side of its threshold, so nothing changes. Recorded so a future reader
doesn't "correct" the working values back to the white-based ones.

Two entries were stated conservatively rather than optimistically: `--ink` on paper is 15.03 (§2 says
14.90) and `--muted` on paper is 5.03 (§2 says 4.93).

### §7 migration, as specified

Clean break — `--midnight`, `--onyx`, `--indigo`, `--brass*`, `--cloud` and `--sand` are gone and
**not aliased**, so a straggler fails loudly. Zero remain in `app/`, `components/` or `lib/`.

The reduced-motion corridor exemption survived untouched, as §7 asked. It is the block most likely to
be swept up in a token migration, and it has nothing to do with colour.

Verified in browser: hero `rgb(17,37,50)`, body `rgb(248,250,251)`, eyebrow and logo dot `#F4B044`,
CTA gold with **navy** text, credentials strip navy with a 2px gold hairline, gold numerals, 12
corridor cards. The four-rule audit returns clean on rules 1–3; rule 4's only hit is the `--orange`
swatch in the token proof, which documents the colour rather than using it, now marked `data-swatch`.

### §4 — the logo decision is NOT made

Deliberately left open. `#3B498C` on `--navy` is **1.89:1**, confirmed — the wordmark is effectively
invisible on both surfaces it must appear on.

The favicon and apple-touch-icon still use the logo blue and are therefore **off-palette**. They were
not recoloured: option 2 (recolouring the wordmark) is a brand decision needing the client's sign-off,
and changing a company's mark without that is not ours to make. Option 1 (mono lockup on dark) is the
recommendation and needs no permission, but it governs the LOCKUP, not the monogram.

The `⚠️ PENDING R5 §4 DECISION` note is in `site/app/icon.svg`. Resolving §4 needs the vector source,
which is still outstanding.
