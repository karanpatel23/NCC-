"use client"

import { useEffect, useRef, useState } from "react"

/*
 * The chainage rail — main brief §4.3, "the one bold idea".
 *
 * Roads are measured in chainage. Every NCC tender document reads Km 88.565,
 * Ch. 153.000, Km 90/15–91/1. So the site's structural device is a road, and
 * sections are not "01 / 02 / 03" but Km 0.000, Km 1.200, Km 2.450 — which is
 * why the section eyebrows already carry those values. This reads them off the
 * page rather than duplicating them, so the rail and the headings can never
 * disagree.
 *
 * §4.3 specifics honoured here:
 *   - desktop only, ≥1280px; below that it collapses to a slim top progress bar
 *   - hairline in the muted rule colour, ticks per section, chainage in mono
 *   - the current section's value sticks to the rail as you scroll
 *   - aria-hidden throughout: it is decorative, and the section headings carry
 *     the real semantics. A screen reader announcing "Km 2.450" as navigation
 *     would be noise.
 *
 * R7 note: §4.3 was written for the withdrawn palette, where ticks were
 * --retro and the travelled portion --indigo. The equivalents are --copper
 * (the active-state accent, R7 rule 4) and --slate for the untravelled rail.
 */

type Mark = { km: string; label: string; top: number }

export function ChainageRail() {
  const [marks, setMarks] = useState<Mark[]>([])
  const [progress, setProgress] = useState(0)
  const [activeIndex, setActiveIndex] = useState(0)
  /*
   * Sections that own the left gutter can ask the rail to stand down. The
   * homepage blueprint is a full-bleed navy drawing in exactly this space, and
   * the rail's ticks and labels landed on top of it. Marked sections set
   * [data-rail-quiet]; everywhere else the rail behaves as before.
   */
  const [quiet, setQuiet] = useState(false)
  const raf = useRef(0)

  useEffect(() => {
    /*
     * Read the chainage values already rendered in the section eyebrows.
     * Format is "Km 1.200 · Under execution". Deriving from the DOM keeps one
     * source of truth — a new section gets a rail tick for free, and a renamed
     * one cannot leave the rail pointing at a heading that no longer exists.
     */
    const collect = () => {
      const found: Mark[] = []
      document.querySelectorAll<HTMLElement>("p, h1, h2").forEach((el) => {
        const m = el.textContent?.match(/^\s*(Km\s[\d.]+)\s*·\s*(.+?)\s*$/i)
        if (!m) return
        const rect = el.getBoundingClientRect()
        found.push({
          km: m[1],
          label: m[2],
          top: rect.top + window.scrollY,
        })
      })
      found.sort((a, b) => a.top - b.top)
      setMarks(found)
    }
    collect()
    window.addEventListener("resize", collect)
    return () => window.removeEventListener("resize", collect)
  }, [])

  useEffect(() => {
    if (marks.length === 0) return
    const onScroll = () => {
      if (raf.current) return
      raf.current = requestAnimationFrame(() => {
        raf.current = 0
        const max = document.body.scrollHeight - window.innerHeight
        setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0)
        const line = window.scrollY + window.innerHeight * 0.4
        let idx = 0
        marks.forEach((m, i) => {
          if (m.top <= line) idx = i
        })
        setActiveIndex(idx)

        const mid = window.innerHeight * 0.5
        setQuiet(
          Array.from(document.querySelectorAll("[data-rail-quiet]")).some((el) => {
            const r = el.getBoundingClientRect()
            return r.top < mid && r.bottom > mid
          }),
        )
      })
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [marks])

  if (marks.length === 0) return null
  const active = marks[activeIndex]

  return (
    <>
      {/*
       * Below 1280px the rail collapses to a slim top progress bar, per §4.3.
       * Same information, no gutter required.
       */}
      <div
        aria-hidden
        className="fixed inset-x-0 top-0 z-[60] h-[2px] bg-transparent transition-opacity duration-300 xl:hidden"
        style={{ opacity: quiet ? 0 : 1 }}
      >
        <div
          className="h-full origin-left bg-[color:var(--color-copper)] transition-[width] duration-150 ease-out"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      {/* Desktop rail, left gutter, ≥1280px only. */}
      <div
        aria-hidden
        className="pointer-events-none fixed top-0 left-6 z-40 hidden h-screen w-[86px] transition-opacity duration-300 xl:block"
        style={{ opacity: quiet ? 0 : 1 }}
      >
        <div className="relative flex h-full flex-col justify-center">
          {/* the road edge */}
          <div className="absolute top-[18%] bottom-[18%] left-[10px] w-px bg-[color:var(--color-slate)]/45" />
          {/* travelled portion */}
          <div
            className="absolute left-[10px] w-px bg-[color:var(--color-copper)] transition-[height] duration-150 ease-out"
            style={{ top: "18%", height: `${progress * 64}%` }}
          />

          <ol className="relative flex flex-col gap-7">
            {marks.map((m, i) => {
              const isActive = i === activeIndex
              return (
                <li key={`${m.km}-${i}`} className="flex items-center gap-3">
                  <span
                    className="block h-px transition-all duration-200"
                    style={{
                      width: isActive ? 20 : 11,
                      marginLeft: isActive ? 1 : 5,
                      background: isActive
                        ? "var(--color-copper)"
                        : "var(--color-slate)",
                      opacity: isActive ? 1 : 0.6,
                    }}
                  />
                  <span
                    className="measurement text-[length:var(--text-caption)] whitespace-nowrap transition-colors duration-150"
                    style={{
                      color: isActive
                        ? "var(--color-copper-ink)"
                        : "var(--color-slate-ink)",
                      opacity: isActive ? 1 : 0.55,
                    }}
                  >
                    {m.km}
                  </span>
                </li>
              )
            })}
          </ol>

          {/* current section label, sticking to the rail */}
          <p
            className="measurement absolute left-[10px] max-w-[84px] text-[length:var(--text-caption)] leading-tight tracking-[0.1em] text-[color:var(--color-copper-ink)] uppercase"
            style={{ top: "calc(50% + 120px)" }}
          >
            {active.label}
          </p>
        </div>
      </div>
    </>
  )
}
