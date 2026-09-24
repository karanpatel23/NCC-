"use client"

import { useEffect, useRef } from "react"

import { Container } from "@/components/container"
import { ROAD_PLAN, planTransform, type Plan } from "@/lib/road-plan"

/*
 * "Engineering in focus" — the scroll-drawn road plan, R13.
 *
 * ── HOW THE REVEAL WORKS ────────────────────────────────────────────────────
 *
 * Every line draws along its OWN geometry. R12 swept one rectangular clip
 * across the whole picture, which uncovered the drawing without ever looking
 * like it was being drawn.
 *
 *   solid strokes  pathLength=1 + strokeDasharray=1 + dashoffset 1→0, so the
 *                  stroke grows from its start point along the path.
 *   dashed strokes cannot use that trick — the dash array is already carrying
 *                  the lane pattern. They keep their pattern and are revealed
 *                  through a MASK holding a wide stroked copy of the same path
 *                  with its own dashoffset animation. The mask stroke is much
 *                  wider than the line so the outer edge of a curve is never
 *                  shaved off.
 *   fills          (the bridge deck) have no length to draw, so they fade.
 *
 * ── CONTENT IS NEVER HIDDEN BY THE MARKUP ───────────────────────────────────
 *
 * Every animatable element is authored in its FINISHED state — dashoffset 0,
 * opacity 1. Server HTML, no-JS and reduced-motion all render the complete
 * drawing; JS only ever winds it back, and only after confirming motion is
 * wanted. Heading and copy are plain text and never animate.
 *
 * Progress is measured against the drawing itself so it completes while the
 * plan is still comfortably on screen, and because each variant's wrapper has
 * its own height the desktop and portrait compositions time independently.
 */

const STAGES = {
  /* 1 — the alignment and the structure that organise the composition. */
  s1: [0.0, 0.30],
  /* 2 — carriageways, ramps, bridge detail. */
  s2: [0.22, 0.58],
  /* 3 — service road, drainage, context. */
  s3: [0.48, 0.80],
  /* 4 — annotations settle last, and finish at 0.92 rather than 1.0 so the
   * completed drawing is on screen with a little scroll still in hand. */
  s4: [0.72, 0.92],
} as const
type Stage = keyof typeof STAGES

const C = {
  white: "var(--color-white)",
  mist: "var(--color-mist)",
  copper: "var(--color-copper)",
  navy: "var(--color-navy)",
}

/*
 * A stroke that draws along its own path.
 *
 * Module scope, NOT nested inside Plan: a component declared during render
 * gets a fresh identity every pass, so React unmounts and remounts every line
 * of the drawing on each re-render. That also throws away the dash offsets the
 * scroll handler has been setting.
 */
function Draw({
  d,
  stage,
  stroke,
  width,
  scale,
  uid,
  opacity = 1,
  dash,
}: {
  d: string
  stage: Stage
  stroke: string
  width: number
  scale: number
  uid: string
  opacity?: number
  dash?: string
}) {
  const sw = width / scale
  if (dash) {
    return (
      <g mask={`url(#${uid}-m-${stage})`}>
        <path
          d={d}
          stroke={stroke}
          strokeOpacity={opacity}
          strokeWidth={sw}
          strokeDasharray={dash}
          fill="none"
        />
      </g>
    )
  }
  return (
    <path
      data-draw={stage}
      d={d}
      stroke={stroke}
      strokeOpacity={opacity}
      strokeWidth={sw}
      fill="none"
      pathLength={1}
      strokeDasharray={1}
      strokeDashoffset={0}
      strokeLinecap="round"
    />
  )
}

function Plan({ p, variant }: { p: Plan; variant: "desktop" | "mobile" }) {
  const uid = `bp-${variant}`
  const t = planTransform(p)
  const w = (px: number) => px / p.scale
  const P = p.paths as Record<string, string>
  const SET = p.paths as Record<string, string[]>

  return (
    <svg
      viewBox={`0 0 ${p.w} ${p.h}`}
      role="img"
      aria-label="Plan of a divided carriageway crossing a road on a bridge, with connecting ramps, a service road and a drainage channel."
      className="w-full"
      data-plan={variant}
    >
      <defs>
        <pattern id={`${uid}-grid`} width="26" height="26" patternUnits="userSpaceOnUse">
          <path d="M26 0 L0 0 0 26" fill="none" stroke={C.mist} strokeOpacity="0.055" strokeWidth="0.6" />
        </pattern>
        {/*
          * One mask per stage for the dashed lines. The stroke inside is far
          * wider than anything it reveals, so a curve's outer edge is never
          * clipped as the mask sweeps along it.
          */}
        {(Object.keys(STAGES) as Stage[]).map((s) => (
          <mask key={s} id={`${uid}-m-${s}`} maskUnits="userSpaceOnUse">
            <g transform={t} fill="none">
              {[P.main_centre, P.low_edgeL, P.drain_main].map((d, i) => (
                <path
                  key={i}
                  data-maskdraw={s}
                  d={d}
                  stroke="#fff"
                  strokeWidth={w(46)}
                  strokeLinecap="round"
                  pathLength={1}
                  strokeDasharray={1}
                  strokeDashoffset={0}
                />
              ))}
            </g>
          </mask>
        ))}
      </defs>

      <rect width={p.w} height={p.h} fill={C.navy} />
      <rect width={p.w} height={p.h} fill={`url(#${uid}-grid)`} />

      <g transform={t} fill="none" strokeLinecap="round">
        {/* context */}
        {SET.contoursSet.map((d, i) => (
          <Draw key={`c${i}`} d={d} stage="s3" stroke={C.mist} width={0.8} opacity={0.15} scale={p.scale} uid={uid} />
        ))}

        {/* lower road — drawn before the deck so the deck can mask it */}
        <Draw d={P.low_edgeL} stage="s1" stroke={C.white} width={1.3} opacity={0.6} scale={p.scale} uid={uid} />
        <Draw d={P.low_edgeR} stage="s1" stroke={C.white} width={1.3} opacity={0.6} scale={p.scale} uid={uid} />
        <Draw d={p.dashed.low_centre} stage="s1" stroke={C.white} width={0.8} opacity={0.42}
              dash={`${w(7)} ${w(7)}`} scale={p.scale} uid={uid} />

        {/* the deck masks the roadway beneath it */}
        <path data-fade="s1" d={P.deck_fill} fill={C.navy} stroke="none" opacity={1} />

        {/* ramps */}
        {["ramp_off_L", "ramp_off_R", "ramp_on_L", "ramp_on_R"].map((k) => (
          <Draw key={k} d={P[k]} stage="s2" stroke={C.white} width={1.2} opacity={0.7} scale={p.scale} uid={uid} />
        ))}

        {/* service road */}
        <Draw d={P.serv_L} stage="s3" stroke={C.mist} width={1} opacity={0.5} scale={p.scale} uid={uid} />
        <Draw d={P.serv_R} stage="s3" stroke={C.mist} width={1} opacity={0.5} scale={p.scale} uid={uid} />

        {/* drainage + culvert */}
        <Draw d={P.drain_main} stage="s3" stroke={C.mist} width={0.85} opacity={0.4}
              dash={`${w(4)} ${w(4)}`} scale={p.scale} uid={uid} />
        <Draw d={P.drain_spur} stage="s3" stroke={C.mist} width={0.85} opacity={0.4}
              dash={`${w(4)} ${w(4)}`} scale={p.scale} uid={uid} />
        <Draw d={P.culvert} stage="s3" stroke={C.copper} width={1.5} opacity={0.9} scale={p.scale} uid={uid} />

        {/* earthworks */}
        {SET.hatchSet.map((d, i) => (
          <Draw key={`h${i}`} d={d} stage="s3" stroke={C.mist} width={0.7} opacity={0.28} scale={p.scale} uid={uid} />
        ))}

        {/* main carriageway */}
        <Draw d={P.main_shL} stage="s2" stroke={C.mist} width={0.8} opacity={0.42} scale={p.scale} uid={uid} />
        <Draw d={P.main_shR} stage="s2" stroke={C.mist} width={0.8} opacity={0.42} scale={p.scale} uid={uid} />
        <Draw d={P.main_edgeL} stage="s2" stroke={C.white} width={1.8} scale={p.scale} uid={uid} />
        <Draw d={P.main_edgeR} stage="s2" stroke={C.white} width={1.8} scale={p.scale} uid={uid} />
        <Draw d={P.main_medL} stage="s2" stroke={C.white} width={1} opacity={0.72} scale={p.scale} uid={uid} />
        <Draw d={P.main_medR} stage="s2" stroke={C.white} width={1} opacity={0.72} scale={p.scale} uid={uid} />
        <Draw d={p.dashed.main_laneL} stage="s2" stroke={C.white} width={0.85} opacity={0.55}
              dash={`${w(6)} ${w(6)}`} scale={p.scale} uid={uid} />
        <Draw d={p.dashed.main_laneR} stage="s2" stroke={C.white} width={0.85} opacity={0.55}
              dash={`${w(6)} ${w(6)}`} scale={p.scale} uid={uid} />
        <Draw d={P.main_centre} stage="s1" stroke={C.copper} width={1.5}
              dash={`${w(10)} ${w(4)} ${w(2)} ${w(4)}`} scale={p.scale} uid={uid} />

        {/* structure on top */}
        {["deck_edgeL", "deck_edgeR", "abut0", "abut1"].map((k) => (
          <Draw key={k} d={P[k]} stage="s1" stroke={C.white} width={2.6} scale={p.scale} uid={uid} />
        ))}
        <Draw d={P.parapetL} stage="s2" stroke={C.copper} width={1.2} opacity={0.9} scale={p.scale} uid={uid} />
        <Draw d={P.parapetR} stage="s2" stroke={C.copper} width={1.2} opacity={0.9} scale={p.scale} uid={uid} />
      </g>

      {/* annotations */}
      <g>
        {p.annotations.map((a) => {
          const below = a.ly > a.ay
          return (
            <g key={a.key} data-fade="s4" opacity={1}>
              <line x1={a.ax} y1={a.ay} x2={a.lx} y2={a.ly} stroke={C.copper}
                    strokeOpacity="0.75" strokeWidth="0.9" />
              <circle cx={a.ax} cy={a.ay} r="2" fill={C.copper} />
              <text
                x={a.lx}
                y={a.ly + (below ? 14 : -8)}
                textAnchor="middle"
                fill={C.white}
                fillOpacity="0.9"
                style={{
                  font: `500 11px var(--font-plex-sans), sans-serif`,
                  letterSpacing: "0.13em",
                }}
              >
                {a.label.toUpperCase()}
              </text>
            </g>
          )
        })}
      </g>
    </svg>
  )
}

export function BlueprintSection() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const draws = Array.from(root.querySelectorAll<SVGElement>("[data-draw], [data-maskdraw]"))
    const fades = Array.from(root.querySelectorAll<SVGElement>("[data-fade]"))
    if (!draws.length) return

    let raf = 0
    let live = false

    const apply = () => {
      raf = 0
      /* Only the visible composition drives progress, so the desktop and
       * portrait plans time on their own heights rather than sharing one. */
      /* The two compositions are switched with CSS classes, not the hidden
       * attribute, so pick whichever one actually has a box right now. */
      const shown = Array.from(
        root.querySelectorAll<HTMLElement>("[data-plan-wrap] > div"),
      ).find((el) => el.getBoundingClientRect().height > 0)
      const box = (shown ?? root).getBoundingClientRect()
      const vh = window.innerHeight

      /*
       * The window is defined by where the drawing should START and FINISH,
       * not by a fraction of its height.
       *
       * A height-derived window finished the desktop plan only once its top
       * had already scrolled past the viewport — 758px of drawing inside a
       * 900px viewport leaves almost no slack, so "height + a bit" always
       * overshot. Solving for the finish position instead makes the last
       * stroke land while the whole plan is on screen, and it self-adjusts
       * between the landscape and portrait compositions rather than needing
       * two hand-tuned constants.
       */
      const startTop = vh * 0.92
      const endTop = Math.min(
        Math.max(vh - box.height - 48, 24),
        vh * 0.22,
      )
      const travel = Math.max(120, startTop - endTop)
      const p = Math.min(1, Math.max(0, (startTop - box.top) / travel))

      const local = (s: Stage) => {
        const [a, b] = STAGES[s]
        return Math.min(1, Math.max(0, (p - a) / (b - a)))
      }
      for (const el of draws) {
        const s = (el.dataset.draw ?? el.dataset.maskdraw) as Stage
        el.setAttribute("stroke-dashoffset", String(1 - local(s)))
      }
      for (const el of fades) {
        el.setAttribute("opacity", String(local(el.dataset.fade as Stage)))
      }
    }

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(apply)
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !live) {
          live = true
          window.addEventListener("scroll", onScroll, { passive: true })
          window.addEventListener("resize", onScroll)
          apply()
        } else if (!e.isIntersecting && live) {
          live = false
          window.removeEventListener("scroll", onScroll)
          window.removeEventListener("resize", onScroll)
        }
      },
      { rootMargin: "130% 0px 130% 0px" },
    )
    io.observe(root)
    apply()

    /* The hero settles its height after mount and moves this section down the
     * page; body catches that where documentElement does not. */
    const ro = new ResizeObserver(onScroll)
    ro.observe(document.body)
    ro.observe(root)
    window.addEventListener("load", onScroll)
    const settle = [150, 500, 1200].map((ms) => window.setTimeout(onScroll, ms))

    return () => {
      io.disconnect()
      ro.disconnect()
      settle.forEach(clearTimeout)
      window.removeEventListener("load", onScroll)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section
      ref={ref}
      /* data-rail-quiet: the decorative chainage rail lives in the same left
       * gutter and its ticks collide with this drawing. It hides itself while
       * this section owns the viewport; its behaviour elsewhere is untouched. */
      data-rail-quiet
      className="on-dark overflow-hidden bg-[color:var(--color-navy)] py-[clamp(3.5rem,2rem+5vw,6rem)]"
    >
      <Container width="shell">
        {/* Heading sits with the drawing rather than above a large empty band. */}
        <div className="lg:flex lg:items-end lg:justify-between lg:gap-16">
          <div className="lg:max-w-[30ch]">
            <p className="mb-4 font-[family-name:var(--font-plex-sans)] text-[length:var(--text-caption)] font-medium tracking-[0.18em] text-[color:var(--color-white)]/85 uppercase">
              Engineering in focus
            </p>
            <h2 className="text-[length:var(--text-2xl)] text-pretty">
              Every road begins with a line.
            </h2>
          </div>
          <p className="mt-5 max-w-[42ch] text-[color:var(--color-white)]/75 lg:mt-0 lg:pb-2">
            A closer look at the elements that shape a road.
          </p>
        </div>

        <div data-plan-wrap className="mt-8 md:mt-10">
          <div className="hidden lg:block">
            <Plan p={ROAD_PLAN.desktop} variant="desktop" />
          </div>
          <div className="lg:hidden">
            <Plan p={ROAD_PLAN.mobile} variant="mobile" />
          </div>
        </div>
      </Container>
    </section>
  )
}
