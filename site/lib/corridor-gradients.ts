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
 * Rebuilt for the FINAL palette. Every stop is in the token system; no hue
 * appears here that is not. The ORDER is load-bearing: FOUR copper-dominant
 * cards in twelve, spaced so no two sit adjacent, so the corridor pulses
 * between cool and warm rather than clumping. Do not sort these into colour
 * runs — the interleave is the point.
 *
 * #2C3A52 and #0F1520 are derived mid- and deep-navy, added because twelve
 * gradients built from five colours read as repetitive.
 */
export const GRADIENTS = [
  "linear-gradient(145deg, #2C3A52 0%, #18202F 100%)",
  "linear-gradient(145deg, #B8734F 0%, #8E5639 100%)",
  "linear-gradient(145deg, #68748A 0%, #2C3A52 100%)",
  "linear-gradient(145deg, #18202F 0%, #0F1520 100%)",
  "linear-gradient(145deg, #A26241 0%, #B8734F 100%)",
  "linear-gradient(145deg, #7C879C 0%, #18202F 100%)",
  "linear-gradient(145deg, #8E5639 0%, #2C3A52 100%)",
  "linear-gradient(145deg, #DCE1E6 0%, #68748A 100%)",
  "linear-gradient(145deg, #2C3A52 0%, #B8734F 100%)",
  "linear-gradient(145deg, #0F1520 0%, #68748A 100%)",
  "linear-gradient(145deg, #B8734F 0%, #DCE1E6 100%)",
  "linear-gradient(145deg, #18202F 0%, #2C3A52 100%)",
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
