# R17 — responsive correction to the bridge introduction

Supersedes R16's responsive behaviour. The wide-desktop composition is unchanged.

## 1. Structure

One scoped wrapper, two children — a text container holding the heading **and all three
paragraphs**, and an artwork container. Paragraphs are never positioned independently and
never run under the artwork.

| Regime | Layout |
|---|---|
| base (< 768px) | single column, normal flow: text, then artwork |
| ≥ 768px | `grid-template-columns: minmax(0, 0.46fr) minmax(0, 0.54fr)`, gap `clamp(20px, 3vw, 36px)` |
| ≥ 1200px | the owner-approved composition: 3:2 full-bleed frame, copy overlaid at 3.5% / 19% |

Percentage positioning of text exists **only** at ≥1200px. Everything keys off the width
available to the section, so a narrow split-screen window gets the narrow layout.

Verified across 21 widths from 320 to 1536: text/artwork rectangle overlap is **0 px²** at
every width below 1200, no horizontal overflow, no clipped text.

## 2. The artwork and its crop

`bridge-construction-navy.png` — a derivative, with `bridge-construction.png` preserved beside
it untouched.

Below 1200px the artwork container is `aspect-ratio: 21 / 20` and the image is
`object-fit: cover; object-position: 100% 50%`. At a 1.05 container and a 1.5 source, cover
shows exactly the right **70%** of the asset — source x 30–100%. Measured on the raster, the
leftmost content in **any** horizontal band is x = 30.5%, so this drops empty ground only and
keeps the whole lift: girder, hook, slings, crane and pier.

Sizing is width-driven: height comes from the container's aspect ratio, never from a stretched
grid row. Measured artwork aspect is exactly **1.050** below 1200 and **1.500** at and above
it — no non-uniform scaling at any width.

`next/image`'s `fill` writes width/height/inset as **inline** styles, so a stylesheet cannot
move the box. It does not need to; the crop is `object-fit` and `object-position` alone.

## 3. The background seam

The site palette is untouched. It was the **asset** that was adapted.

The asset's baked ground measured `rgb(20, 32, 54)` with a per-channel standard deviation
under 0.85 and a spatial range of 1.6 across the whole raster — effectively a flat colour. The
derivative applies a flat `(+4, 0, −7)` correction onto `--color-navy` `#18202f`, on a
distance ramp: pixels further than 34 from the ground are **bit-identical** to the original
(verified — maximum channel change 0 over the 21% of the image that is confident foreground).

This is a recolour, not an alpha key, deliberately: a misjudged pixel here shifts by 8 levels,
where a misjudged key would delete a cable.

Two competing layers also had to be handled. `[data-gp-field]` paints `--navy`, and a sibling
paints two radial glows over it (slate at 22%/12%, copper at 80%/24%). That field is pinned to
the viewport while the artwork is not, so the glow slid underneath the raster. A backdrop on
`[data-ncc-arrival]::before`, in `--color-navy`, sits between the two and is feathered 160px
top / 180px bottom so it replaces the glow inside this section without drawing an edge. The
hero's own treatment outside the section is untouched.

Measured across the artwork boundary at 390, 768, 1024 and 1536: outside the artwork is exactly
`(24, 32, 47)`; inside is within **2–3 levels** — WebP quantisation. No boundary is detectable.

## 4. Spacing

`[data-ncc-arrival]` is `grid-template-rows: auto auto` with `align-content: start`, not
`1fr auto`. `--gp-height` is mechanical and untouched, but it makes `gp-content` taller than
this content at most tablet sizes; a `1fr` first row handed that surplus to the introduction,
which centred its columns inside it — at 768 that was 104px of dead space above the heading
and another 104px between the artwork and the divider. Packing to the start puts the surplus
after the credentials.

## 5. Other fixes

- **One copper divider.** `[data-intro-rule]` is deleted; `[data-ncc-creds]`'s `border-top` is
  the only one. On desktop the removed rule had been crossing the pier.
- **Credentials** go to four columns at **1000px**, not 768. At 768 the arrival is 661px, so
  four columns are 135px and "Class AA — Govt. of Gujarat" broke into fragments.
- **The forced heading break is desktop-only.** `display: none` on a `<br>` removes the line
  break *and* the surrounding whitespace, which ran the words together as "journeyhas" at
  every width below 1200. An explicit `{" "}` fixes it.
- **Desktop body floor.** `max(0.95rem, …)` — 1440 (15.81px) and 1536 (16.31px) are unchanged;
  1200 stops falling to 14.56px.
- **A duplicate `[data-ncc-arrival]` block** (verbatim, pre-existing) was removed.

## 6. Known limitation, stated plainly

There is a blank stretch of roughly 700px of scrolling between the end of the glyph sequence
and the introduction becoming visible. It is **GlyphPortal's own reveal curve**: `--gp-reveal`
stays at 0 until about 78% through the pinned sequence while `[data-gp-content]` already fills
the viewport. It is not spacing, padding or a spacer element — measured, `gp-content`'s top is
already 540px into the viewport while its opacity is still 0.

Closing it means changing the hero's reveal timing, which this correction is scoped out of.
The section's own ground is flat navy from 160px above the arrival, and the ramp from the
hero's glow into it is continuous with no step.
