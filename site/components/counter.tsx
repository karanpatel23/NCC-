"use client"

import { useEffect, useRef } from "react"

/*
 * Stat counter — main brief §4.4.
 *
 * "Count up on first view from the real CMS value. The correct number is in
 * the HTML from the start; JS only animates toward it."
 *
 * That second sentence is the whole design. The final value is rendered
 * server-side as the element's text, and JS overwrites it temporarily while
 * animating, then restores it exactly. So:
 *
 *   - crawlers and no-JS visitors read the true figure
 *   - a failed or skipped animation leaves the true figure
 *   - reduced motion leaves the true figure untouched
 *
 * Both competitor sites render "Project Completed 0 +" in production because
 * their counters animate from a hardcoded zero that was never wired to data.
 * Starting from the truth makes that failure mode impossible: the worst case
 * here is a number that does not animate, not a number that is wrong.
 */

export function Counter({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  className = "",
}: {
  value: number
  prefix?: string
  suffix?: string
  decimals?: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const final = `${prefix}${value.toFixed(decimals)}${suffix}`

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    if (!Number.isFinite(value) || value <= 0) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()

        const DURATION = 900
        const start = performance.now()
        let raf = 0
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / DURATION)
          /* ease-out cubic, matching §4.4's reveal easing */
          const eased = 1 - (1 - t) ** 3
          el.textContent = `${prefix}${(value * eased).toFixed(decimals)}${suffix}`
          if (t < 1) raf = requestAnimationFrame(tick)
          /* Restore the exact server-rendered string. Never leave a rounded
           * approximation behind. */
          else el.textContent = final
        }
        raf = requestAnimationFrame(tick)
        return () => cancelAnimationFrame(raf)
      },
      { rootMargin: "0px 0px -15% 0px" },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [value, prefix, suffix, decimals, final])

  /* The true value ships in the HTML. */
  return (
    <span ref={ref} className={className}>
      {final}
    </span>
  )
}
