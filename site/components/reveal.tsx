"use client"

import { useEffect, useRef, type ReactNode } from "react"

/*
 * Scroll reveal — main brief §4.4 and R3 §3.2.
 *
 * Spec: 24px rise AND scale 0.985 → 1, 500ms, ease-out, once: true. R3 §3.2
 * added the scale so section entrances read as a continuation of the
 * corridor's z-motion rather than a different vocabulary. Nothing on this site
 * slides laterally.
 *
 * CONTENT IS VISIBLE BY DEFAULT. The hidden state is applied by JS, never by
 * the stylesheet, so a visitor with no JavaScript — or one where the observer
 * never fires — sees the content rather than a blank page. §9 requires every
 * page to render its full content with JavaScript disabled, and the usual way
 * reveal animations break that is by hiding things in CSS and relying on JS to
 * un-hide them.
 *
 * once: true is literal — the observer disconnects after firing, so a section
 * never re-animates on scroll-back.
 */

export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode
  delay?: number
  className?: string
  /*
   * The element to render. Defaults to a div, but inside a list the wrapper
   * has to BE the <li>: a div between <ul> and <li> breaks list semantics
   * even with display:contents, which Lighthouse flags and screen readers
   * announce wrongly. Previously this wrapped each <li> in a contents-div and
   * the homepage capability list was reported as malformed.
   */
  as?: "div" | "li"
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    /* §4.4 hard rule: reduced motion disables transform and opacity animation
     * outright. Leave the element in its final state and never touch it. */
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    /*
     * Already on screen at mount? Never hide it. Hiding content that is
     * currently being looked at, purely to animate it back in, is the wrong
     * trade — and it is how above-the-fold content flashes.
     */
    const box = el.getBoundingClientRect()
    if (box.top < window.innerHeight && box.bottom > 0) return

    el.dataset.reveal = "pending"

    let failsafe = 0
    const show = () => {
      el.style.transitionDelay = delay ? `${delay}ms` : ""
      el.dataset.reveal = "in"
      io.disconnect() // once: true
      clearTimeout(failsafe)
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) show()
      },
      { rootMargin: "0px 0px -12% 0px" },
    )
    io.observe(el)

    /*
     * FAILSAFE. Once JS has set `pending` the element is hidden, and if the
     * observer never fires it stays hidden — permanently, with no error.
     * That is not hypothetical: IntersectionObserver callbacks do not run
     * while a document is hidden, so a page opened in a background tab can
     * finish loading with its whole body at opacity 0.
     *
     * Visible-but-unanimated always beats animated-but-invisible, so reveal
     * unconditionally after 1.2s regardless of what the observer is doing.
     */
    failsafe = window.setTimeout(show, 1200)

    return () => {
      io.disconnect()
      clearTimeout(failsafe)
    }
  }, [delay])

  return (
    <Tag ref={ref as never} className={className}>
      {children}
    </Tag>
  )
}
