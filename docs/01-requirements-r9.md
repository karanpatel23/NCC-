# NCC Infraspace — Brief Revision 9
### `docs/01-requirements-r9.md` · Visual revision, 11 September 2026

**Closed by the owner.** Supersedes the specific rules named below in R7, R8 and the
earlier logo instructions. Everything not named here is unchanged.

---

## 1. Warm White is withdrawn

`--color-white` moves from **`#FAF7F2` → `#FFFFFF`**. Cream, ivory, beige and warm-white
treatments are removed from the interface. The other four of R7's five are untouched:
`--navy #18202F`, `--slate #68748A`, `--mist #DCE1E6`, `--copper #B8734F`.

### No derived token needed changing, and that is not luck

| token | on `#FAF7F2` | on `#FFFFFF` | on `--mist` |
|---|---|---|---|
| `--navy` | 15.28 | **16.32** | 12.40 |
| `--slate` | 4.41 | 4.72 | 3.58 |
| `--copper` | 3.51 | 3.75 | 2.85 |
| `--copper-ink` | 5.55 | 5.93 | 4.51 |
| `--slate-ink` | 5.58 | 5.96 | 4.53 |
| `--copper-deep` | 4.51 | 4.82 | 3.66 |
| `--rule-strong` | 3.77 | 4.02 | 3.06 |
| `--mist` | 1.23 | 1.32 | — |

Every `-ink` variant was solved against `--mist`, the harder of the two light grounds, and
`--mist` did not move. Pure white only ever adds headroom on the easier ground, so the
whole derived set carries over untouched.

**The four enforcement rules survive intact**, with two figures restated:

- **Rule 2 still holds.** A `--white` label on raw `--copper` went 3.51 → **3.75**, still
  short of AA. A filled copper CTA is still `--copper-deep` with a `--white` label, now
  **4.82** (was 4.51).
- **Rule 1 has one new wrinkle.** `--slate` on pure white is **4.72**, which technically
  clears AA where 4.41 did not. It is still barred. A token that is legal on one of three
  grounds and illegal on the other two is a rule nobody can hold in their head; `-ink` on
  light and `-light` on dark, everywhere, stays the rule.
- **Rule 3 holds.** `--mist` on white is 1.32; still a surface, never a border.

### What changed, exactly

| File | Change |
|---|---|
| `app/globals.css` | `--color-white` → `#ffffff`; corridor depth cue `rgb(250 247 242 / .14)` → `rgb(255 255 255 / .14)`; contrast tables restated |
| `components/milestone-portal-hero.tsx` | credentials label `rgb(250 247 242 / .7)` → pure white |
| `components/project-reel-hero.tsx` | three warm-white `rgb()` values → pure white (dormant component, cleared so the warmth cannot return with it) |
| `app/icon.svg` | monogram stroke `#F8FAFB` → `#FFFFFF` |
| `app/apple-icon.tsx` | wordmark `#FBFAF7` → `#FFFFFF` |

**Verified:** a sweep of every computed `backgroundColor`, `color`, `borderTopColor` and
`outlineColor` on all seven routes returns **zero** warm-white values.

Project photography was not touched. The brass Nataraja was not touched.

---

## 2. The lockup: legacy name out, plate out, ink adaptive

### The displayed identity is now

> **NCC Infraspace Private Limited**

"NATRAJ CONSTRUCTION CO." is removed from the displayed mark. Two company names were
being shown at once; one of them is a predecessor firm that stopped being the legal entity
in 2015. The heritage still belongs on `/about`, in prose, where it can be explained —
which is where it already is.

### No plate, no badge, no backing

R8 put the artwork on a `--white` plate because the supplied lockup **inverts against
itself**: the blue wordmark is 1.96:1 on navy, the grey legacy line 1.95:1 on white. R9
dissolves that problem instead of covering it. With the legacy line gone and the wordmark
taking the page's own ink, nothing is left that cannot be recoloured to suit its ground.

Measured on the built site, header and footer, desktop and mobile:
`background-color: rgba(0,0,0,0)` · `border-width: 0px` · `box-shadow: none`.

### How it is built — and what is *not* a trace

**No vector master exists.** The only source is `site/public/brand/ncc-lockup.webp`,
3208×1182 raster, which is **preserved untouched in the repo**. Two derivatives come off
it, both by extraction:

| Asset | What it is |
|---|---|
| `public/brand/nataraja.webp` | A straight crop of the figure, `(20,4)–(951,1141)`, resampled to 655×800. Never redrawn, never recoloured. Brass stays brass, full figure. |
| `public/brand/ncc-wordmark-mask.png` | The **alpha channel** of the NCC band, `(1061,7)–(3172,717)`, at 1200×404. Painted with `currentColor` through a CSS mask. |

The NCC band was checked before cutting: it contains **zero non-blue opaque pixels**, so
its alpha reproduces the original letterforms *exactly*. Nothing was autotraced and
nothing is presented as a vector — the mask is raster and is named as such. **If a vector
master ever turns up, both derivatives should be replaced by it.**

The supporting line is **live text**, not extracted, because the wording changed: the
artwork says "INFRASPACE PVT. LTD." and R9 requires the full legal name. It is set in the
site's own Plex Sans letterspaced caps — the treatment R2 §3 lifted off the letterhead for
the sitewide eyebrow, so it belongs to the same family as the artwork above it. **"NCC" is
not repeated in it**: the wordmark already says it.

### Colour, with one asset

Both the mask and the legal line take `currentColor`. The header already flips its own
text colour on `[data-solid]`, so the mark follows it across the scroll transition with no
second asset and nothing to swap. Verified:

| Context | Ink | Ratio |
|---|---|---|
| Header, solid (white) | `rgb(24,32,47)` navy | **16.32:1** |
| Header, transparent over navy | `rgb(255,255,255)` | **16.32:1** |
| Footer (navy) | `rgb(255,255,255)` | **16.32:1** |

### Proportions and legibility

`object-contain` is retained — R8 measured a 1.03% horizontal squeeze caused by
`next/image` rounding derivative heights to whole pixels, and that is still live. Measured
rendered ratios against the master's 0.8188 (figure) and 2.9732 (wordmark): **0.8188–0.8200
and 2.9706–2.9739.** No distortion.

**The legal line is sized for legibility, not fidelity.** Deriving it from the master's
proportions put it at **6.5px** in the mobile header — a texture, not a name. It is set at
a floor of **8px mobile / 8.5px desktop / 10px footer**, which runs the line wider than
the wordmark above it. That is the ordinary shape of an acronym over its expansion, and it
is the honest trade: the line is new wording anyway, so matching the proportions of the
line it replaces buys nothing.

Rendered lockup: **169×30** mobile header, **194×40** desktop header, **234×52** footer.

---

## 3. Location wording out of the landing page

| Where | Before | After |
|---|---|---|
| Hero eyebrow | Est. 1987 · Class AA · **Mehsana, Gujarat** | Est. 1987 · Class AA Contractor |
| Hero line | …river protection works **in Gujarat**. | …river protection works. |
| Arrival h2 | for **Gujarat's** authorities since 1987 | for public authorities and private clients since 1987 |
| Footer tagline (`COMPANY.positioning`) | **Building Gujarat's roads** and bridges since 1987. | Road and bridge construction since 1987. |
| Landing `<title>` | NCC Infraspace — **Building Gujarat's roads** and bridges since 1987 | NCC Infraspace — Road and bridge contractors since 1987 |

**Nothing replaces the geography.** No "pan-India", no "leading", no "global". An
unsupported reach would be the main brief §2 failure in a new costume.

**Deliberately kept**, per R9's own carve-outs:

- `Class AA — Govt. of Gujarat` in the credentials strip — a registration authority, not a
  location claim, and R9 left the credentials alone.
- Both office addresses, in the footer and on `/contact`.
- All project geography — district, state, chainage — on the project records.

### Two judgement calls worth challenging

1. **The meta description still says Gujarat.** §9 targets "road contractor Gujarat" and
   R9 preserves project geography; a description is search signal and project fact, not
   landing-page positioning. If it should go too, say so.
2. **`/about` still reads "Building Gujarat's roads since 1987."** as its `<h1>`. R9 is
   scoped to the landing page, and `/about` is where heritage and geography belong. It is
   the same phrase, though, so it is flagged rather than silently kept.

---

## 4. Unchanged by this revision

The MILESTONE glyph-portal hero, the motto, Archivo / IBM Plex, the layout structure, the
chainage rail, the reveal failsafe, server-rendered counters, and the font-loading fix all
survive with colour adjustments only.

Explicitly **not** done, being separate proposals: portfolio/schema changes, hiding
navigation items, removing the financial credentials.

---

## 5. Still open

1. **Vector master for the logo.** R2 §4 item 1, still outstanding. Both derivatives are
   raster and should be replaced if one appears.
2. `app/icon.svg` and `app/apple-icon.tsx` still carry **`#3B498C`** as their ground —
   off-palette, a brand decision open since R5 §4. Only their warm-white foregrounds were
   corrected here.
3. `/capabilities`, `/credentials`, `/careers` are linked in `lib/nav.ts` and **404**.
4. The transparent-header path is **currently unreachable**: only `image-stream-hero` and
   `project-reel-hero` declare `[data-dark-hero]`, and neither is mounted. The path was
   verified directly against the stylesheet and works; it simply has no page using it.
