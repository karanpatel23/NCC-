"use client"

import GlyphPortal from "@/components/ui/glyph-portal"
import { DISPLAY_FAMILY } from "@/lib/fonts"

/*
 * The homepage hero — GlyphPortal, skinned to R7 and NCC's content.
 *
 * WORD: the whole slogan, "EVERY MILESTONE IS OUR VISION", with the camera
 * flying through the O of MILESTONE.
 *
 * A milestone is a physical roadside marker — the object a road contractor
 * installs — so the letter you enter through is also the subject of the
 * sentence. Twenty-nine characters on one line means the type sets much
 * smaller than a single word would; the trade is that the visitor reads the
 * whole claim before the camera moves, rather than one noun out of context.
 *
 * NO PHOTOGRAPHY OR VIDEO, per the owner's instruction. The field behind the
 * letters is a token gradient. Worth recording that this reverses R4 §3,
 * which argued the opposite — that a stream of real project work IS the
 * credibility claim and abstraction "says nothing about NCC". The evidence
 * therefore has to land immediately after the portal, which is why the
 * credentials are the content you arrive in rather than a section further
 * down.
 *
 * PALETTE. The mechanic is that the letters are windows: --gp-paper is the
 * page the word sits on, --gp-field is what shows THROUGH the letterforms and
 * then fills the screen. Mapping that onto R7 gives exactly the descent the
 * palette wants — warm white page, navy inside the type, navy on arrival.
 *
 * The component ships with green defaults (#0b3b2a). All four variables are
 * overridden below; none of its own colours survive.
 */

const CREDENTIALS = [
  { label: "Established", value: "1987" },
  { label: "Registration", value: "Class AA — Govt. of Gujarat" },
  { label: "Turnover FY24", value: "₹302 Cr" },
  { label: "Credit rating", value: "Crisil BBB-/Stable · A3" },
]

/*
 * The slogan IS the type now, so the motto is no longer passed in — it is the
 * `word` below. Kept as a named export with no props so page.tsx stays simple.
 */
export function MilestonePortalHero() {
  return (
    <>
      <style>{`
        .ncc-portal [data-gp-caption] {
          font-family: var(--font-plex-sans), sans-serif;
          letter-spacing: 0.02em;
        }
        .ncc-portal [data-gp-enter] {
          border: 1px solid var(--color-copper);
          border-radius: 3px;
          padding: 0 20px;
          background: var(--color-copper-deep);
          color: var(--color-white);
          font-size: 13px;
          font-weight: 500;
          transition: opacity 0.18s;
        }
        .ncc-portal [data-gp-enter]:hover { opacity: 0.9; }
        .ncc-portal [data-gp-hint] {
          font-family: var(--font-plex-sans), sans-serif;
          color: var(--color-slate-ink);
        }
        /* Eyebrow and motto sit above the word in the opening frame. */
        [data-ncc-eyebrow] {
          position: absolute;
          inset: auto 24px calc(100% - var(--gp-word-top, 35%) + 34px);
          margin: 0;
          text-align: center;
          font-family: var(--font-plex-sans), sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--color-copper-ink);
        }
        [data-ncc-motto] {
          position: absolute;
          inset: calc(var(--gp-word-bottom, 50%) + 30px) 24px auto;
          margin: 0;
          text-align: center;
          font-family: var(--font-plex-sans), sans-serif;
          font-size: clamp(15px, 2.2vw, 19px);
          line-height: 1.5;
          color: var(--color-slate-ink);
        }
        /* Credentials, as the thing you arrive inside. */
        [data-ncc-arrival] {
          width: min(100%, 1120px);
          margin: auto;
          display: grid;
          gap: clamp(2rem, 5svh, 3.5rem);
        }
        [data-ncc-arrival] h2 {
          margin: 0;
          max-width: 20ch;
          font-family: var(--font-archivo), sans-serif;
          font-weight: 700;
          font-stretch: 125%;
          font-size: clamp(1.9rem, 1.1rem + 2.4vw, 3rem);
          line-height: 1.05;
          letter-spacing: -0.015em;
        }
        [data-ncc-creds] {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 1.75rem 2.5rem;
          margin: 0;
          border-top: 2px solid var(--color-copper);
          padding-top: 1.75rem;
        }
        [data-ncc-creds] dt {
          font-family: var(--font-plex-sans), sans-serif;
          font-size: 11px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgb(250 247 242 / 0.7);
        }
        [data-ncc-creds] dd {
          margin: 0.4rem 0 0;
          font-family: var(--font-plex-mono), monospace;
          font-variant-numeric: tabular-nums;
          font-weight: 500;
          font-size: clamp(1rem, 0.9rem + 0.5vw, 1.25rem);
          color: var(--color-copper-light);
        }
        @media (min-width: 768px) {
          [data-ncc-creds] { grid-template-columns: repeat(4, minmax(0, 1fr)); }
        }
      `}</style>

      <GlyphPortal
        word="EVERY MILESTONE IS OUR VISION"
        /*
         * The whole slogan is the type, and the camera flies through one
         * letter of it — the O of MILESTONE.
         *
         * focusChar takes the FIRST match, and the first O in this string is
         * MILESTONE's. That is the one worth entering: the milestone is the
         * subject, and the other two Os sit in "OUR" and "VISION", which are
         * grammar rather than substance. Spaces carry no ink, so the
         * component's own scan skips them and their letter-buttons disable
         * themselves.
         */
        focusChar="O"
        fontFamily={DISPLAY_FAMILY}
        fontWeight={900}
        scrollLength={2.6}
        enterLabel="See our credentials"
        className="ncc-portal"
        style={{
          /* R7. The component's green defaults are fully replaced. */
          "--gp-paper": "var(--color-white)",
          "--gp-ink": "var(--color-navy)",
          "--gp-field": "var(--color-navy)",
          "--gp-foreground": "var(--color-white)",
        }}
        background={
          /* Token gradient, not photography — the owner's instruction. Scales
           * with --gp-field-scale so the field breathes as the camera moves. */
          <div
            style={{
              position: "absolute",
              inset: 0,
              transform: "scale(var(--gp-field-scale,1))",
              background:
                "radial-gradient(circle at 22% 12%, rgb(104 116 138 / 0.45), transparent 38%)," +
                "radial-gradient(circle at 80% 24%, rgb(184 115 79 / 0.28), transparent 32%)," +
                "radial-gradient(circle at 50% 82%, rgb(10 15 24 / 0.55), transparent 46%)," +
                "linear-gradient(135deg, #18202F 0%, #223046 48%, #10161F 100%)",
            }}
          />
        }
        front={
          <>
            <p data-ncc-eyebrow>Est. 1987 · Class AA · Mehsana, Gujarat</p>
            <p data-ncc-motto>
              Roads, bridges, irrigation and river protection works in Gujarat.
            </p>
          </>
        }
      >
        <div data-ncc-arrival>
          <h2>Thirty-eight years of roads, bridges and river works in Gujarat.</h2>
          <dl data-ncc-creds>
            {CREDENTIALS.map((c) => (
              <div key={c.label}>
                <dt>{c.label}</dt>
                <dd>{c.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </GlyphPortal>
    </>
  )
}

export default MilestonePortalHero
