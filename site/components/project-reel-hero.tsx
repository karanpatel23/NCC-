"use client"

import { useCallback, useEffect, useRef, useState } from "react"

/*
 * Project reel hero — adapted from the 21st.dev `scroll-locked-video-hero`
 * (a music player). Three mechanics from it are genuinely good and are kept:
 *
 *   1. Dual-video crossfade instead of the native `loop` attribute. Looping
 *      a <video> natively causes a visible seek-stutter regardless of how
 *      cleanly the file itself loops; two stacked elements fading into each
 *      other over the last second hides it completely.
 *   2. Cursor tilt on the frame.
 *   3. Momentum + detent physics on the list — flick-and-settle, not 1:1 drag.
 *
 * Everything else was dropped, and the reasons matter:
 *
 *   - The original binds `wheel` to WINDOW with preventDefault, so the page
 *     cannot be scrolled at all. On a credentials-led site that is fatal.
 *     Here the wheel is bound to the LIST ELEMENT only; everywhere else in
 *     the hero the page scrolls normally.
 *   - It renders a signature crediting the component author, linking off to
 *     their personal site. That is precisely the failure documented in
 *     docs/03-competitor-maxel.md, where the theme vendor's own socials are
 *     still in the competitor's footer.
 *   - Its video and background load from a third party's GitHub raw URLs.
 *     Replaced with NCC's own drone footage from public/media/.
 *   - All audio removed. Synthesised click, ambient video sound and the
 *     AudioContext unlock-on-first-gesture are gone. Unexpected sound on a
 *     government contractor's site costs credibility, and none of it
 *     survives the main brief §4.4 motion policy anyway.
 *   - Hard-coded CYAN/AMBER replaced with the R7 tokens.
 *
 * Reduced motion PAUSES the reel rather than disabling it, matching the
 * corridor's behaviour and its globals.css exemption.
 */

export type ReelProject = {
  slug: string
  title: string
  client: string
  valueCr: number
  chainage?: string
  district?: string
}

type Props = {
  motto: string
  strapline?: string
  projects: ReelProject[]
  videoSrc?: string
  posterSrc?: string
}

const ROW_HEIGHT = 62
const CROSSFADE_S = 1

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v))
const mod = (n: number, m: number) => ((n % m) + m) % m

/* Dual-video crossfade. The one technique worth lifting wholesale. */
function SeamlessLoopVideo({
  src,
  poster,
  playing,
}: {
  src: string
  poster: string
  playing: boolean
}) {
  const aRef = useRef<HTMLVideoElement>(null)
  const bRef = useRef<HTMLVideoElement>(null)
  const activeRef = useRef<"a" | "b">("a")
  const fadingRef = useRef(false)
  const [aOp, setAOp] = useState(1)
  const [bOp, setBOp] = useState(0)

  /*
   * `muted` MUST be set imperatively, not only as a JSX prop.
   *
   * React's declarative `muted` does not reliably reach the DOM property on
   * first render, so the browser sees an unmuted <video>, refuses autoplay,
   * and the play() promise rejects. With a bare .catch() that failure is
   * silent — the hero just sits on its poster frame looking like a still.
   *
   * The original component set this imperatively inside its volume effect;
   * removing the audio path removed the assignment with it. Hence this.
   */
  useEffect(() => {
    ;[aRef.current, bRef.current].forEach((v) => {
      if (v) v.muted = true
    })
  }, [])

  useEffect(() => {
    const active = activeRef.current === "a" ? aRef.current : bRef.current
    if (!active) return
    if (playing) {
      active.muted = true
      active.play().catch(() => {})
    } else active.pause()
  }, [playing])

  /*
   * Resume on return to the tab.
   *
   * Browsers pause media in a backgrounded tab, and play() is not re-issued
   * on its own — so without this a visitor who switches away and comes back
   * finds the hero frozen on a still frame, with no way to restart it short
   * of a reload. Cheap to fix, invisible when it works, and easy to miss
   * because it never reproduces while you are looking at the page.
   */
  useEffect(() => {
    const onVisible = () => {
      if (document.visibilityState !== "visible" || !playing) return
      const active = activeRef.current === "a" ? aRef.current : bRef.current
      if (active?.paused) {
        active.muted = true
        active.play().catch(() => {})
      }
    }
    document.addEventListener("visibilitychange", onVisible)
    return () => document.removeEventListener("visibilitychange", onVisible)
  }, [playing])

  useEffect(() => {
    const a = aRef.current
    const b = bRef.current
    if (!a || !b) return
    a.muted = true
    b.muted = true
    a.play().catch(() => {})
    let raf = 0
    const tick = () => {
      const active = activeRef.current === "a" ? a : b
      const idle = activeRef.current === "a" ? b : a
      if (active.duration) {
        const remaining = active.duration - active.currentTime
        if (!fadingRef.current && remaining <= CROSSFADE_S) {
          fadingRef.current = true
          idle.currentTime = 0
          idle.muted = true
          idle.play().catch(() => {})
        }
        if (fadingRef.current) {
          const t = clamp(1 - remaining / CROSSFADE_S, 0, 1)
          if (activeRef.current === "a") {
            setAOp(1 - t)
            setBOp(t)
          } else {
            setBOp(1 - t)
            setAOp(t)
          }
          if (remaining <= 0.03) {
            active.pause()
            fadingRef.current = false
            activeRef.current = activeRef.current === "a" ? "b" : "a"
          }
        }
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  const base: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
  }
  /* muted + playsInline are required for autoplay; there is no audio path. */
  return (
    <>
      <video ref={aRef} src={src} poster={poster} muted playsInline preload="metadata" style={{ ...base, opacity: aOp }} />
      <video ref={bRef} src={src} poster={poster} muted playsInline preload="none" style={{ ...base, opacity: bOp }} />
    </>
  )
}

export function ProjectReelHero({
  motto,
  strapline,
  projects,
  videoSrc = "/media/hero-reel.mp4",
  posterSrc = "/media/hero-poster.jpg",
}: Props) {
  const listRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const rowRefs = useRef<(HTMLDivElement | null)[]>([])
  const offsetRef = useRef(0)
  const velocityRef = useRef(0)
  const snapRef = useRef<number | null>(null)
  const draggingRef = useRef(false)
  const lastYRef = useRef(0)
  const lastTRef = useRef(0)

  const [activeIndex, setActiveIndex] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [coarse, setCoarse] = useState(false)
  const [reduced, setReduced] = useState(false)

  const n = projects.length

  useEffect(() => {
    const mqCoarse = window.matchMedia("(pointer: coarse)")
    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)")
    const sync = () => {
      setCoarse(mqCoarse.matches || window.innerWidth < 768)
      setReduced(mqReduce.matches)
    }
    sync()
    window.addEventListener("resize", sync)
    mqReduce.addEventListener("change", sync)
    return () => {
      window.removeEventListener("resize", sync)
      mqReduce.removeEventListener("change", sync)
    }
  }, [])

  /* Render loop — coverflow lean, same maths as the original. */
  useEffect(() => {
    if (!n) return
    let raf = 0
    const render = () => {
      const centre = offsetRef.current / ROW_HEIGHT
      rowRefs.current.forEach((el, i) => {
        if (!el) return
        let d = i - centre
        d = mod(d + n / 2, n) - n / 2
        const abs = Math.abs(d)
        el.style.transform = `translateY(${d * ROW_HEIGHT}px) translateZ(${-abs * 18}px) rotateX(${clamp(d * 9, -22, 22)}deg) scale(${clamp(1 - abs * 0.1, 0.72, 1)})`
        el.style.opacity = String(clamp(1 - abs * 0.4, 0, 1))
        el.style.pointerEvents = abs < 0.5 ? "auto" : "none"
        el.style.zIndex = String(1000 - Math.round(abs * 10))
      })
      /* Round before wrapping — rounding a value near n can land exactly on
       * n, one past the last valid index. */
      const nearest = mod(Math.round(centre), n)
      setActiveIndex((p) => (p === nearest ? p : nearest))
      raf = requestAnimationFrame(render)
    }
    raf = requestAnimationFrame(render)
    return () => cancelAnimationFrame(raf)
  }, [n])

  /* Physics — flick and settle. No audio detent; the click is gone. */
  useEffect(() => {
    let raf = 0
    const step = () => {
      if (snapRef.current !== null) {
        const t = snapRef.current
        offsetRef.current += (t - offsetRef.current) * 0.22
        if (Math.abs(t - offsetRef.current) < 0.4) {
          offsetRef.current = t
          snapRef.current = null
        }
      } else if (!draggingRef.current) {
        offsetRef.current += velocityRef.current
        velocityRef.current *= 0.93
        if (Math.abs(velocityRef.current) < 0.02) velocityRef.current = 0
      }
      raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [])

  /*
   * Wheel is bound to the LIST, not the window, and only cancels the page
   * scroll while the pointer is actually over the list. The original bound it
   * to window with preventDefault, which trapped the page permanently.
   */
  useEffect(() => {
    const el = listRef.current
    if (!el) return
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      snapRef.current = null
      velocityRef.current = clamp(velocityRef.current + e.deltaY * 0.045, -14, 14)
    }
    const onDown = (e: PointerEvent) => {
      draggingRef.current = true
      snapRef.current = null
      velocityRef.current = 0
      lastYRef.current = e.clientY
      lastTRef.current = performance.now()
      el.setPointerCapture(e.pointerId)
    }
    const onMove = (e: PointerEvent) => {
      if (!draggingRef.current) return
      const dy = lastYRef.current - e.clientY
      offsetRef.current += dy
      const t = performance.now()
      velocityRef.current = (dy / Math.max(1, t - lastTRef.current)) * 16
      lastYRef.current = e.clientY
      lastTRef.current = t
    }
    const onUp = () => {
      draggingRef.current = false
    }
    el.addEventListener("wheel", onWheel, { passive: false })
    el.addEventListener("pointerdown", onDown)
    el.addEventListener("pointermove", onMove)
    el.addEventListener("pointerup", onUp)
    el.addEventListener("pointercancel", onUp)
    return () => {
      el.removeEventListener("wheel", onWheel)
      el.removeEventListener("pointerdown", onDown)
      el.removeEventListener("pointermove", onMove)
      el.removeEventListener("pointerup", onUp)
      el.removeEventListener("pointercancel", onUp)
    }
  }, [])

  const onTilt = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (coarse || reduced) return
      const el = frameRef.current
      const rect = el?.getBoundingClientRect()
      if (!el || !rect) return
      const px = (e.clientX - rect.left) / rect.width - 0.5
      const py = (e.clientY - rect.top) / rect.height - 0.5
      el.style.transition = "transform 0.05s linear"
      el.style.transform = `scale(1.06) rotateY(${px * 7}deg) rotateX(${-py * 5}deg)`
    },
    [coarse, reduced],
  )

  const onTiltEnd = useCallback(() => {
    const el = frameRef.current
    if (!el) return
    el.style.transition = "transform 0.6s cubic-bezier(.2,.8,.2,1)"
    el.style.transform = "scale(1.06) rotateY(0deg) rotateX(0deg)"
  }, [])

  const goStep = (dir: 1 | -1) => {
    snapRef.current = (Math.round(offsetRef.current / ROW_HEIGHT) + dir) * ROW_HEIGHT
    velocityRef.current = 0
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault()
      goStep(1)
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault()
      goStep(-1)
    }
  }

  const active = projects[activeIndex]
  const reelPlaying = playing && !reduced

  return (
    <section
      data-dark-hero
      className="on-dark relative isolate flex min-h-[92svh] flex-col justify-end overflow-hidden bg-[color:var(--color-navy)] pt-28 pb-[clamp(3rem,2rem+4vw,6rem)]"
    >
      {/* Drone footage. Oversized and tilting inside a frame clipped at the
          section edge, so no background is ever revealed. */}
      <div
        ref={frameRef}
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ transform: "scale(1.06)", transformStyle: "preserve-3d" }}
      >
        <SeamlessLoopVideo src={videoSrc} poster={posterSrc} playing={reelPlaying} />
      </div>

      {/*
       * Scrim, R7 §5 exactly. Against the lightest frame the footage can
       * produce, --white clears AA from alpha 0.60; the wash reaches 0.96 by
       * the 70% line. HERO COPY MUST STAY BELOW THE 70% LINE.
       */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "var(--hero-scrim)" }}
      />

      <div
        className="relative z-10 mx-auto flex w-full max-w-[1280px] flex-col gap-10 px-6 lg:flex-row lg:items-end lg:justify-between"
        onPointerMove={onTilt}
        onPointerLeave={onTiltEnd}
      >
        <div className="max-w-[46ch]">
          <p className="mb-4 font-[family-name:var(--font-plex-sans)] text-[11px] font-medium tracking-[0.18em] text-[color:var(--color-white)]/85 uppercase">
            Est. 1987 · Class AA · Mehsana, Gujarat
          </p>
          <h1 className="text-[length:var(--text-4xl)]">{motto}</h1>
          {strapline && (
            <p className="mt-6 max-w-[52ch] text-[color:var(--color-white)]/80">
              {strapline}
            </p>
          )}
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="/projects"
              className="rounded-[3px] bg-[color:var(--color-copper-deep)] px-6 py-3 text-sm font-medium text-[color:var(--color-white)] transition-opacity hover:opacity-90"
            >
              View projects
            </a>
            <a
              href="/credentials"
              className="rounded-[3px] border border-[color:var(--color-white)]/40 px-6 py-3 text-sm font-medium transition-colors hover:border-[color:var(--color-copper-light)]"
            >
              Credentials
            </a>
          </div>
        </div>

        {/* The reel. Replaces the original's track list — same physics,
            real project records instead of invented songs. */}
        {n > 0 && (
          <div className="w-full lg:w-[420px]">
            <div
              ref={listRef}
              tabIndex={0}
              role="listbox"
              aria-label="Project reel. Use up and down arrow keys to browse."
              aria-activedescendant={active ? `reel-${active.slug}` : undefined}
              onKeyDown={onKeyDown}
              className="reel-mask relative h-[248px] cursor-grab touch-none overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-copper-light)] active:cursor-grabbing"
              style={{ perspective: "1400px", perspectiveOrigin: "50% 40%" }}
            >
              <div
                className="absolute inset-x-0 top-1/2 h-0"
                style={{ transformStyle: "preserve-3d" }}
              >
                {projects.map((p, i) => (
                  <div
                    key={p.slug}
                    id={`reel-${p.slug}`}
                    role="option"
                    aria-selected={i === activeIndex}
                    ref={(el) => {
                      rowRefs.current[i] = el
                    }}
                    className="absolute inset-x-0 flex items-center gap-3 rounded-[3px] px-4"
                    style={{
                      top: -ROW_HEIGHT / 2,
                      height: ROW_HEIGHT,
                      transformOrigin: "center center",
                      willChange: "transform, opacity",
                      background:
                        i === activeIndex ? "rgb(24 32 47 / 0.55)" : "transparent",
                      backdropFilter: i === activeIndex ? "blur(10px)" : undefined,
                      boxShadow:
                        i === activeIndex
                          ? "inset 0 0 0 1px var(--color-copper)"
                          : undefined,
                    }}
                  >
                    <div className="min-w-0 flex-1">
                      <div
                        className="truncate text-sm"
                        style={{
                          fontWeight: i === activeIndex ? 600 : 400,
                          color:
                            i === activeIndex
                              ? "var(--color-white)"
                              : "rgb(250 247 242 / 0.6)",
                          textShadow: "0 1px 8px rgb(0 0 0 / 0.7)",
                        }}
                      >
                        {p.title}
                      </div>
                      <div
                        className="truncate text-[11px]"
                        style={{ color: "rgb(250 247 242 / 0.55)" }}
                      >
                        {p.client}
                      </div>
                    </div>
                    <div
                      className="measurement shrink-0 text-sm"
                      style={{
                        color:
                          i === activeIndex
                            ? "var(--color-copper-light)"
                            : "rgb(250 247 242 / 0.45)",
                      }}
                    >
                      ₹{p.valueCr} Cr
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-3 flex items-center gap-2">
              <button
                type="button"
                onClick={() => goStep(-1)}
                aria-label="Previous project"
                className="rounded-[3px] border border-[color:var(--color-white)]/25 p-2 transition-colors hover:border-[color:var(--color-copper-light)]"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M6 6h2v12H6zM20 6 10 12l10 6z" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => goStep(1)}
                aria-label="Next project"
                className="rounded-[3px] border border-[color:var(--color-white)]/25 p-2 transition-colors hover:border-[color:var(--color-copper-light)]"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M16 6h2v12h-2zM4 6l10 6-10 6z" />
                </svg>
              </button>
              {/* Pause control, required by R4 §2.3. Motion toward the viewer
                  is a vestibular trigger and prefers-reduced-motion only helps
                  people who already found that setting. */}
              <button
                type="button"
                onClick={() => setPlaying((p) => !p)}
                aria-pressed={!playing}
                aria-label={playing ? "Pause background footage" : "Play background footage"}
                className="ml-auto rounded-[3px] border border-[color:var(--color-white)]/25 p-2 transition-colors hover:border-[color:var(--color-copper-light)]"
              >
                {playing ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <rect x="6" y="5" width="4" height="14" rx="1" />
                    <rect x="14" y="5" width="4" height="14" rx="1" />
                  </svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M7 5v14l12-7z" />
                  </svg>
                )}
              </button>
            </div>

            <p aria-live="polite" className="sr-only">
              {active ? `${active.title}, ${active.client}, ₹${active.valueCr} crore` : ""}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

export default ProjectReelHero
