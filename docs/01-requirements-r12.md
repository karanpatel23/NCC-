# NCC Infraspace — Brief Revision 12
### `docs/01-requirements-r12.md` · Homepage blueprint section, 14 September 2026

**Closed by the owner.** Homepage only. Palette, logo, hero, header, navigation, contact and
all 57 project pages are unchanged.

---

## 1. What changed on the homepage

| | |
|---|---|
| **Added** | `components/blueprint-section.tsx` — a scroll-drawn road plan, immediately after the hero |
| **Added** | `lib/road-plan.ts` — the alignment geometry |
| **Removed** | "Work delivered and handed over", including its project feature and card grid |
| **Removed** | "On record", including the counters and the caveat paragraph |
| **Compacted** | the hero's arrival panel — the long introduction sentence is gone; the four credentials stay |
| **Kept** | the capabilities section and the footer, for the next design phase |

Nothing replaced the removed sections: no project cards, no counters, no logo carousel.

---

## 2. The hero boundary, and why the credentials stayed put

The dark panel after the hero was **not a sibling section** — it is GlyphPortal's own
`children`, and the hero's "See our credentials" action is an internal anchor pointing at
that same container (`href="#{uid}-content"`). The vendored component exposes no way to
retarget it.

So the panel's **content** was compacted rather than the container moved: the introduction
sentence went, the four credentials stayed, and the anchor still resolves to real
credentials content. **The container's `min-height` is `--gp-height`, which feeds the
portal's own `margin-top` maths — it was deliberately not touched.** Shrinking it would
have changed the hero's height and timing.

Verified: the link reads "See our credentials", resolves to an existing target, and that
target renders Established 1987 · Class AA · Turnover FY24 · Credit rating.

---

## 3. The drawing

**Editable vector geometry, not a raster.** The alignment is a conventional
tangent/circular-arc chain, the way a road centreline is actually set out, emitted as real
SVG `L`/`A` commands — about 1.9 KB for the whole desktop plan.

**Offsets are exact.** A tangent offsets to a tangent; an arc of radius R about centre C
offsets to an arc of radius R−d about the **same** centre. Nothing is a copy nudged
sideways, which is why the shoulders stay parallel through the reversing curves instead of
pinching. Cross-section half-widths are a standard divided four-lane: median 1.75 m, lane
line 5.25, carriageway edge 8.75, shoulder 11.25, side drain 13.0. Cross-drainage ties run
perpendicular between the drains.

**No invented data.** No dimensions, coordinates, chainage values, scale bar or approval
block. It is a generic illustration of road elements, not a named NCC project, and it
implies no design service. That is recorded here and in the source header, not on the page.

Palette: navy ground, fine white and mist linework, copper for the centreline, the culverts
and the annotation leaders. A 24-unit grid at 8.5% opacity. Archivo for the heading, Plex
Sans for the annotations.

Only three annotations: **Alignment · Roadway · Drainage.**

---

## 4. The animation

Three stages, tied to ordinary scrolling, reversing naturally:

1. centreline and median — the alignment
2. carriageway edges, lane markings, shoulders — the roadway
3. side drains and cross-drainage ties

**A clip wipe, not `stroke-dashoffset`.** The lane marking is itself a dashed line; using
dasharray for the reveal would have forced it to render solid until the animation finished
and then snap into its real pattern. Each stage is a `<clipPath>` holding one rect, and
progress moves that rect's width (desktop) or height (mobile).

**Progress is measured against the drawing, not the section.** Measuring the section meant
the wipe only completed after the drawing had already scrolled off the top — the finished
plan was never actually on screen. Keyed to the drawing's own box it completes with the
plan fully in view, over roughly 720 px of scroll. No pin, no snap, no hijack, no timer,
no loop, no controls.

Annotations fade in once their own geometry is ~55% drawn.

---

## 5. Graceful degradation

**The clip rects are authored at full extent.** Server HTML, no-JS and reduced-motion all
render the finished drawing; JS only ever narrows them, and only after confirming motion is
wanted. Content cannot be left hidden by the markup — the same rule the reveal layer
follows.

Heading and supporting sentence are plain text, never animated.

The scroll listener is attached only while the section is near the viewport and is removed
with the observer, the ResizeObserver and the settle timers on unmount.

Accessibility: one concise `role="img"` label on each SVG, so the decorative geometry and
annotations are not announced individually.

---

## 6. Responsive

Two compositions, not one scaled down. Desktop is a 1200×330 landscape plan; below `lg` a
430×560 portrait plan with the road running down the page and the wipe running vertically.
Both carry all three annotations at readable size.

Verified with no horizontal overflow and no clipped labels at 320, 390, 768, 1024 and 1440,
and at 200% zoom.
