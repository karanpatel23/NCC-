# NCC Infraspace — Brief Revision 13
### `docs/01-requirements-r13.md` · Blueprint artwork rework, 14 September 2026

**Closed by the owner.** Replaces the R12 artwork, which was rejected visually. Hero,
header, logo, credentials anchor, capabilities, footer and all 57 project pages unchanged.

---

## 1. What was wrong with R12, and what replaced it

| R12 | R13 |
|---|---|
| A thin S-road occupying a fraction of the canvas | A composition that fills the frame diagonally |
| Large empty grid | Drawing sized to the canvas; heading sits beside it, not above a blank band |
| Mobile was a horizontal ribbon in a tall canvas | A genuinely portrait plan, road running lower-left to upper-right |
| Three labels naming near-identical parallel lines | Four labels on four genuinely distinct features |
| Detached copper strokes; chainage rail collisions | Parapets belong to a legible deck; the rail stands down locally |
| One rectangular clip swept across the picture | Every line draws along its own geometry |

---

## 2. The composition

One coherent top-down layout: a **divided main carriageway** running diagonally, a
**grade-separated crossing** as the focal point, **one pair of connecting ramps**, a
**service road** parallel to the main, a **drainage channel** with a **culvert** crossing
beneath, and sparse **contours** and **earthwork hatching** for context.

**The crossing is built to read as a structure.** Deck edges run along the main; the lower
roadway is masked beneath a navy deck fill drawn over it and under the main; parapets sit
just inside the deck edges; and **abutment end-lines** close each end. Those end-lines are
the detail that matters — without them a deck in plan is two strokes beside a road and
reads as nothing.

**Geometry is exact, and the primitives are reusable.** Alignments are tangent/circular-arc
chains, the way a centreline is set out. Offsets are true parallels: a tangent offsets to a
tangent, an arc of radius R about centre C to radius R−d about the **same** centre. Ramps
leave the carriageway tangentially, turn through the **shorter** of the two bearings to the
lower road, then run straight to meet it — the naive bearing choice produced a 180° sweep
that flew off the canvas instead of connecting anything.

Cross-sections: main median 2.0 m, lane line 5.5, carriageway edge 9.0, shoulder 11.5;
lower road 5.5; ramps 3.75; service road 3.25; deck half-width 13.5.

**Conceptual artwork.** No dimensions, coordinates, chainage, project name or approval
block. Recorded in the source header, never on the page.

---

## 3. Motion

Four stages: alignment and structure → carriageways, ramps and bridge detail → service
road, drainage and context → annotations.

**Each line draws along its own path** — `pathLength=1` with an animated `stroke-dashoffset`,
so a stroke grows from its start rather than being uncovered by a moving rectangle.

**Dashed lines keep their pattern.** Lane markings, the lower road's centre line and the
drainage channel already use `stroke-dasharray` for their pattern, so the draw-on trick is
unavailable. They are revealed through a **mask** holding a wide stroked copy of the same
path with its own dashoffset. The mask stroke is far wider than the line it reveals so the
outer edge of a curve is never shaved off.

**Timing is solved by position, not by height.** The window is defined by where the drawing
should start and finish on screen. A height-derived window finished the desktop plan only
after its top had scrolled away — 697 px of drawing in a 900 px viewport leaves almost no
slack — so the last stroke landed off-screen. Solving for the finish position instead
completes both compositions with the whole plan visible, and self-adjusts between landscape
and portrait rather than needing two hand-tuned constants.

No pin, no snap, no hijack, no timer, no loop, no controls, no blank spacer. Reverse scroll
is symmetric.

**Nothing is hidden by the markup.** Every animatable element is authored finished —
dashoffset 0, opacity 1. Server HTML, no-JS and reduced-motion render the complete drawing;
JS only winds it back, and only after confirming motion is wanted.

---

## 4. The chainage rail

The decorative rail occupies the same left gutter and its ticks landed on the drawing. It
now hides while a `[data-rail-quiet]` section owns the viewport middle, and restores
immediately after. Its behaviour everywhere else is untouched; the hero is not modified.

---

## 5. Verified

Desktop and mobile inspected at full size. No overflow, no clipped labels and four
annotations present at 320, 390, 768, 1024 and 1440, and at 200% zoom. Reverse scroll
symmetric. Reduced motion and no-JS both render the complete drawing. Rail opacity 0 inside
the section, 1 below it. `typecheck` clean, 57 projects valid, production build green, lint
unchanged from baseline.

**One React fix found by lint:** the stroke component was declared inside the plan
component, giving it a fresh identity on every render — which remounts every line and
discards the dash offsets the scroll handler had set. Hoisted to module scope.
