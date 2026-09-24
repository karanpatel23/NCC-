# R16 — the approved bridge composition

Supersedes the R15 artwork and column layout. R15's copy is unchanged and still
owner-approved; only the composition around it changes.

## 1. The artwork

`site/public/images/bridge-construction.png` — owner-supplied, 1536×1024, RGB, text-free.
Ground is `rgb(21, 33, 54)`; the section is `#18202F`. That three-value difference is why the
image carries a top/bottom mask fade: without it the asset's edge shows as a seam against the
section ground.

The bright structure occupies **x 42.7%–94%, y 2.3%–90.6%**, which is what leaves the left
~42% clear for the copy. The copy column is therefore placed against the artwork's own empty
region, not against an arbitrary grid fraction.

## 2. Composition

The artwork runs across the **whole** composition — full-bleed out of the 1120px arrival
container — rather than being penned into a right-hand column as R15 had it.

| | Value |
|---|---|
| Frame | `width: 100vw`, `margin-inline: calc(50% - 50vw)`, `aspect-ratio: 1536 / 1024` |
| Copy | `left: 3.5%`, `top: 19%`, `width: min(34%, 560px)` |
| Rule | copper, `left/right: 3.5%`, `bottom: 7.5%`, 1px |
| Artwork | `object-fit: cover`, `object-position: 62% center` |

At 1.5 aspect the frame matches the asset exactly, so no crop, scale or distortion is applied
at desktop. Verified by overlay: over the bridge-and-crane core the render differs from the
source by **mean 2.77/255, max 30** — WebP quantisation only, no geometric shift.

Contrast measured against the artwork pixels actually under the copy, not estimated:
heading (white) **14.99:1** worst case, body (80% white) **10.10:1** worst case.

## 3. Mobile (< 900px)

Copy first, then a deliberate crop of the artwork at `4 / 3` with `object-position: 72% center`,
which keeps the crane and the suspended girder in shot. The mask is dropped — there is no
seam to hide once the figure has a boundary.

## 4. Four things that will look wrong and are not

- **The figure is `position: absolute; inset: 0`, not a block in flow.** Left static, the
  `fill` image anchored to `[data-intro]` instead of to the figure, the two decoupled, and a
  hard seam appeared down the composition at the figure's column edge.
- **`[data-intro-rule]` is `display: none` on mobile, not restyled.** `[data-ncc-creds]`
  already draws a 2px copper `border-top`; stacked, the two read as a mistake.
- **`[data-intro]` carries `data-rail-quiet`.** The chainage rail shares the left gutter and
  its tick labels landed on top of the last paragraph.
- **The mobile figure is `width: 100%`, not full-bleed.** A nested `100vw` full-bleed
  overflowed horizontally once a vertical scrollbar was present.

## 5. Provenance comment fix

`lib/content/load.ts` strips HTML comments from MDX bodies before rendering:

```ts
const body = content.replace(/<!--[\s\S]*?-->/g, "").trim()
```

Provenance comments were rendering as visible text on 55 of 57 project pages. Verified: 57
pages checked, **0 leaking**, scope prose intact.
