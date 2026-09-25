"use client"

import Image from "next/image"

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
 * palette wants — a pure white page (R9; it was warm white), navy inside
 * the type, navy on arrival.
 *
 * The component ships with green defaults (#0b3b2a). All four variables are
 * overridden below; none of its own colours survive.
 */

const CREDENTIALS = [
  { label: "Established", value: "1987" },
  { label: "Incorporated", value: "2015" },
  { label: "Project records", value: "57" },
  { label: "Portfolio", value: "Across India" },
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
        /*
         * R15. The arrival STRETCHES to the height the portal already
         * reserved rather than centring a small block inside it.
         *
         * --gp-height and the portal's margin-top maths are untouched: that
         * height is mechanical, it is what positions the arrival after the
         * pinned sequence, and it is not ours to shorten. What changes is only
         * how the content sits inside it: align-content stretch instead of
         * the component's default center, so the editorial row grows into
         * the space and the credentials sit directly beneath it.
         */
        /* The attribute is repeated to out-specify GlyphPortal's own rule,
         * which is injected after this block and would otherwise win and keep
         * align-content: center. */
        .ncc-portal [data-gp-content][data-gp-content] {
          align-content: stretch;
        }
/*
         * THE BRIDGE INTRODUCTION
         *
         * One scoped wrapper, two children: a text container holding the
         * heading and all three paragraphs, and an artwork container. The
         * copy is never split across the artwork and is never positioned by
         * percentage except in the wide-desktop regime, where the owner
         * approved exactly that composition.
         *
         * Three regimes, consolidated here rather than layered as override
         * blocks. Everything is driven by the width AVAILABLE TO THE SECTION,
         * so a narrow split-screen window gets the narrow layout.
         *
         *   base        single column, text then artwork, normal flow
         *   >= 768px    two real grid columns, 0.46fr / 0.54fr
         *   >= 1200px   the approved desktop composition, unchanged
         *
         * The artwork is bridge-construction-navy.png, a derivative whose
         * baked ground has been moved onto --color-navy #18202f. The site
         * palette is untouched; it was the ASSET that was adapted. The source
         * ground measured rgb(20,32,54) with a standard deviation under 0.85
         * per channel and a spatial range of 1.6 across the whole raster, so
         * the correction is a flat (+4, 0, -7) applied on a distance ramp.
         * Pixels further than 34 from the ground are bit-identical to the
         * original - verified, max channel change 0 over 21% of the image.
         * That is why this is a recolour and not an alpha key: a misjudged
         * pixel here shifts by 8 levels, where a misjudged key would delete a
         * cable.
         *
         * Consequence: no feathering is needed to hide a seam, because there
         * is no colour difference left to hide.
         */
        [data-intro] {
          /* Mirrors [data-gp-content]'s own padding, clamp(32px, 7%, 100px),
           * so the artwork can reach the screen edge without a nested 100vw
           * that overshoots by the scrollbar width. */
          --intro-bleed: clamp(32px, 7vw, 100px);
          position: relative;
          display: grid;
          gap: 24px;
        }
        [data-intro-copy] {
          min-width: 0;
        }
        [data-intro] h2 {
          margin: 0;
          font-family: var(--font-archivo), sans-serif;
          font-weight: 700;
          font-stretch: 125%;
          font-size: clamp(1.875rem, 8vw, 2.5rem);
          line-height: 1.06;
          letter-spacing: -0.015em;
          color: var(--color-white);
        }
        /* The forced break belongs to the approved desktop setting only;
         * below 1200 the heading wraps to the measure it is given. */
        [data-intro-br] {
          display: none;
        }
        [data-intro] p {
          margin: 0;
          font-size: 1rem;
          line-height: 1.6;
          color: rgb(255 255 255 / 0.82);
        }
        [data-intro] p + p {
          margin-top: 16px;
        }
        [data-intro] p:first-of-type {
          margin-top: 20px;
        }
        [data-intro-art] {
          position: relative;
          margin: 0;
          min-width: 0;
          /* Reaches both screen edges so it reads as the section's own
           * ground rather than an inset photo card. */
          margin-inline: calc(-1 * var(--intro-bleed));
          /*
           * The crop window. The asset is 1.5:1 and its left 30% is empty
           * ground - measured, the leftmost content in ANY horizontal band
           * is x=30.5%. Showing source x 30-100% is a 1.05:1 window, so the
           * container carries that ratio and the image inside is 1/0.70
           * wider than the container and right-anchored. The scale is
           * uniform, the height is derived from the width, and the whole
           * lift survives: girder, hook, slings, crane and pier.
           */
          aspect-ratio: 21 / 20;
          overflow: clip;
        }
        [data-intro-art] img {
          /*
           * The crop is object-fit + object-position ALONE. next/image's
           * fill writes width/height/inset as inline styles, so a stylesheet
           * rule cannot move the box - and it does not need to. At a 21:20
           * container and a 3:2 source, cover shows 1.05/1.5 = exactly the
           * right 70% of the asset, which is source x 30-100%: the empty
           * ground is dropped and the whole lift is kept.
           */
          object-fit: cover;
          object-position: 100% 50%;
        }
        [data-intro-art]::after {
          /*
           * A short navy wash over the excavated ground at the very bottom
           * edge, so the crop does not end on a hard line through terrain.
           * It is painted IN the section colour over background landscape
           * only - it never reaches the crane, the rigging or the girder,
           * which sit in the upper two-thirds.
           */
          content: "";
          position: absolute;
          inset: auto 0 0 0;
          height: 9%;
          background: linear-gradient(
            to bottom,
            rgb(24 32 47 / 0) 0%,
            var(--color-navy) 100%
          );
          pointer-events: none;
        }

        /* --- 768px and up: two real columns ------------------------------ */
        @media (min-width: 768px) {
          [data-intro] {
            grid-template-columns: minmax(0, 0.46fr) minmax(0, 0.54fr);
            gap: clamp(20px, 3vw, 36px);
            align-items: center;
            padding-block: clamp(24px, 4vw, 44px);
          }
          [data-intro-art] {
            margin-inline: 0;
          }
          [data-intro] h2 {
            font-size: clamp(2rem, 3.8vw, 2.75rem);
          }
          [data-intro] p + p {
            margin-top: 18px;
          }
          [data-intro] p:first-of-type {
            margin-top: 22px;
          }
        }

        /* --- 1200px and up: the owner-approved composition ---------------
         * Measured off the approved build and not to be re-tuned: a 3:2
         * full-bleed frame, copy at 3.5% / 19%, reading width min(34%,
         * 560px), artwork uncropped at 62% centre. At 3:2 the frame matches
         * the asset exactly, so the artwork is reproduced 1:1 with no crop.
         */
        @media (min-width: 1200px) {
          [data-intro] {
            display: block;
            /* width MUST stay definite. Left to auto, aspect-ratio resolved
             * the other way round - it took the grid row's stretched height
             * and derived a 918px width inside a 661px column. */
            width: 100vw;
            margin-inline: calc(50% - 50vw);
            align-self: start;
            aspect-ratio: 1536 / 1024;
            overflow: clip;
            padding-block: 0;
          }
          [data-intro-copy] {
            position: absolute;
            left: 3.5%;
            top: 19%;
            width: min(34%, 560px);
            z-index: 1;
          }
          [data-intro-br] {
            display: inline;
          }
          [data-intro-art] {
            position: absolute;
            inset: 0;
            margin-inline: 0;
            aspect-ratio: auto;
          }
          [data-intro-art] img {
            width: 100%;
            left: 0;
            right: auto;
            object-position: 62% center;
          }
          [data-intro-art]::after {
            height: 5%;
          }
          [data-intro] h2 {
            font-size: clamp(1.9rem, 0.6rem + 2.6vw, 3.5rem);
            line-height: 1.04;
          }
          [data-intro] p {
            font-size: max(0.95rem, clamp(0.82rem, 0.52rem + 0.52vw, 1.0625rem));
            max-width: 42ch;
          }
          [data-intro] p + p {
            margin-top: clamp(0.6rem, 1.3vw, 1rem);
          }
          [data-intro] p:first-of-type {
            margin-top: clamp(0.9rem, 1.9vw, 1.6rem);
          }
        }
        /* Credentials, as the thing you arrive inside. */
        /*
         * R15. The arrival STRETCHES to the height the portal already
         * reserved rather than centring a small block inside it.
         *
         * --gp-height and the portal's margin-top maths are untouched: that
         * height is mechanical, it is what positions the arrival after the
         * pinned sequence, and it is not ours to shorten. What changes is only
         * how the content sits inside it: align-content stretch instead of
         * the component's default center, so the editorial row grows into
         * the space and the credentials sit directly beneath it.
         */
        /* The attribute is repeated to out-specify GlyphPortal's own rule,
         * which is injected after this block and would otherwise win and keep
         * align-content: center. */
        .ncc-portal [data-gp-content][data-gp-content] {
          align-content: stretch;
        }
        [data-ncc-arrival] {
          /*
           * One continuous ground for this section. [data-gp-field] paints
           * --navy and a sibling layer paints two radial glows over it
           * (slate at 22%/12%, copper at 80%/24%). That field is pinned to
           * the viewport while the artwork is not, so the glow slid around
           * underneath the raster and the asset read as a lit rectangle.
           *
           * The ::before below sits between the two, in the asset's own
           * measured ground colour, feathered at both ends rather than cut,
           * so it replaces the glow inside this section without drawing an
           * edge against the hero above or the page below. The hero's
           * background outside this section is untouched.
           */
          position: relative;
          isolation: isolate;
          width: min(100%, 1120px);
          /* margin-inline only. A blanket margin:auto absorbs the free
           * space in the grid track and silently cancels the stretch, which
           * is what kept a 152px unused band above and below the content. */
          margin-inline: auto;
          margin-block: 0;
          display: grid;
          /*
           * auto auto + start, NOT 1fr. --gp-height is mechanical and is left
           * alone, but it makes gp-content taller than this content at most
           * tablet sizes. A 1fr first row handed that surplus to the
           * introduction, which centred its columns inside it - at 768 that
           * was 104px of dead space above the heading and another 104px
           * between the artwork and the copper divider. Packing to the start
           * puts the surplus after the credentials, where it reads as the
           * section's own trailing space.
           */
          grid-template-rows: auto auto;
          align-content: start;
          gap: clamp(1.5rem, 4svh, 2.75rem);
        }
        [data-ncc-arrival]::before {
          content: "";
          position: absolute;
          z-index: -1;
          left: calc(50% - 50vw);
          width: 100vw;
          top: -160px;
          bottom: -180px;
          background: linear-gradient(
            to bottom,
            rgb(24 32 47 / 0) 0px,
            var(--color-navy) 160px,
            var(--color-navy) calc(100% - 180px),
            rgb(24 32 47 / 0) 100%
          );
          pointer-events: none;
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
          color: rgb(255 255 255 / 0.7);
        }
        [data-ncc-creds] dd {
          margin: 0.4rem 0 0;
          font-family: var(--font-plex-mono), monospace;
          font-variant-numeric: tabular-nums;
          font-weight: 500;
          font-size: clamp(1rem, 0.9rem + 0.5vw, 1.25rem);
          color: var(--color-copper-light);
        }
        /* Four columns only once each can hold a whole word. At 768 the
         * arrival is 661px, so four columns are 135px and the registration
         * value breaks into fragments; two columns keep it legible. */
        @media (min-width: 1000px) {
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
            {/*
              * The slogan is the page's headline but renders as SVG <text>
              * inside the clip path, so the document had no <h1> at all —
              * bad for §9's per-page semantics and for anyone using a
              * screen reader's heading list. This carries it properly; the
              * visible type is the same words.
              */}
            <h1 className="sr-only">Every milestone is our vision</h1>
            {/* Verified identity only; no pending registration or financial claims. */}
            <p data-ncc-eyebrow>Est. 1987 · Infrastructure contractor</p>
            <p data-ncc-motto>
              Roads, bridges, irrigation and river protection works.
            </p>
          </>
        }
      >
        {/*
          * R12: COMPACTED, not removed.
          *
          * The hero's "See our credentials" action is an anchor the vendored
          * GlyphPortal points at its OWN content container, so this is the
          * only place that destination can live. The long introduction
          * sentence that used to head it is gone — the blueprint section now
          * carries the post-hero introduction — but the four credentials stay,
          * because that is what the link promises to reach.
          *
          * The container's min-height is --gp-height and feeds the portal's
          * own margin-top maths. It is deliberately NOT touched: shrinking it
          * would change the hero's height and timing.
          */}
        <div data-ncc-arrival>
          {/*
            * R15 editorial introduction. Copy is owner-approved and fixed;
            * no subtitle, link, button or disclaimer is added to it.
            *
            * The artwork is bridge-construction-navy.png - the owner-supplied
            * asset with its baked ground moved onto --color-navy. The
            * original raster is kept beside it, untouched.
            *
            * The copy container holds the heading AND all three paragraphs.
            * They are never positioned independently and no paragraph runs
            * under the artwork.
            *
            * data-rail-quiet: the chainage rail shares the left gutter, and
            * its tick labels landed on top of the last paragraph here.
            */}
          <div data-intro data-rail-quiet>
            <div data-intro-copy>
              <h2>
                {/* The break is desktop-only. The explicit space matters:
                  * display:none on the br removes the line break AND the
                  * whitespace around it, which ran the words together as
                  * "journeyhas" at every width below 1200. */}
                Every journey{" "}
                <br data-intro-br />
                has a reason.
              </h2>
              <p>
                A working day begins with a commute. A harvest leaves for
                market. A family makes its way home. Infrastructure is part of
                these everyday journeys, connecting people with the places that
                matter.
              </p>
              <p>
                Roads and bridges become part of a community&rsquo;s daily
                rhythm. People depend on them to reach schools, workplaces,
                healthcare and one another.
              </p>
              <p>
                That everyday purpose is what gives the work its meaning:
                creating connections that people can rely on.
              </p>
            </div>
            <figure data-intro-art>
              <Image
                src="/images/bridge-construction-navy.png"
                alt=""
                aria-hidden
                fill
                sizes="(min-width: 1200px) 100vw, (min-width: 768px) 70vw, 145vw"
                priority
              />
            </figure>
          </div>
          <h2 className="sr-only">Credentials</h2>
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
