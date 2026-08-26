/*
 * Corridor card fills — docs/01-requirements-r4.md §2.2.
 *
 * INTERIM. R4 §3 is explicit that these are decoration, not an argument: a
 * stream of real project photography IS the credibility claim, and gradients
 * say nothing about NCC. They ship now only because photography is deferred.
 *
 *   >>> SWAP TO PROJECT PHOTOGRAPHY BEFORE LAUNCH. <<<
 *
 * R4 §3: "An abstract gradient hero on a road contractor's site is a
 * placeholder that looks finished, which is exactly the kind of thing that
 * ships by accident and stays for three years." The StreamCard type keeps the
 * `src` branch alive so photography drops in with no rewrite.
 *
 * NOT Math.random() — R4 §2.1. Random per render desynchronises server and
 * client markup and trips React hydration, and a hero that differs on every
 * reload reads as instability rather than variety. Assignment is
 * GRADIENTS[i % 12], deterministic and identical on every render.
 *
 * Every stop is already in the token palette; no hue appears here that is not
 * in the system. The ORDER is load-bearing: the sequence interleaves
 * blue-dominant and brass-dominant cards so the corridor pulses between the
 * two brand colours as it rushes. Three brass cards in twelve, the same
 * restraint ratio as the rest of the site. Do not sort these into colour
 * runs — the interleave is the point.
 */
export const GRADIENTS = [
  "linear-gradient(145deg, #3B498C 0%, #2A3465 100%)",
  "linear-gradient(145deg, #2A3465 0%, #1C2447 100%)",
  "linear-gradient(145deg, #775C29 0%, #B08D3F 100%)",
  "linear-gradient(145deg, #3B498C 0%, #775C29 100%)",
  "linear-gradient(145deg, #4A5699 0%, #2A3465 100%)",
  "linear-gradient(145deg, #B08D3F 0%, #D9BE7A 100%)",
  "linear-gradient(145deg, #2A3465 0%, #775C29 100%)",
  "linear-gradient(145deg, #5A68A8 0%, #3B498C 100%)",
  "linear-gradient(145deg, #1C2447 0%, #3B498C 100%)",
  "linear-gradient(145deg, #775C29 0%, #2A3465 100%)",
  "linear-gradient(145deg, #D9BE7A 0%, #B08D3F 100%)",
  "linear-gradient(145deg, #3B498C 0%, #1C2447 100%)",
] as const

/* R4 §2.3 — signature preserved so photography swaps in without a rewrite. */
export type StreamCard = {
  src?: string
  gradient?: string
  alt?: string
}

/**
 * Build `count` cards. With no images supplied, fills deterministically from
 * GRADIENTS by index. Once `project.heroImage` values exist they are passed
 * through as `src` and the gradient becomes the fallback for any shortfall.
 */
export function buildCards(count: number, images: string[] = []): StreamCard[] {
  return Array.from({ length: count }, (_, i) => {
    const src = images[i]
    return src
      ? { src, alt: "" }
      : { gradient: GRADIENTS[i % GRADIENTS.length] }
  })
}
