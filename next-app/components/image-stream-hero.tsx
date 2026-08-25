"use client"

import { useEffect, useState } from "react"
import { Pause, Play } from "lucide-react"

import { buildCards, type StreamCard } from "@/lib/corridor-gradients"

/*
 * The image corridor — docs/01-requirements-r4.md §2, replacing R3 §6.1 hero.
 *
 * Cards travel toward the viewer along Z inside a perspective container.
 *
 * Depth spacing is GEOMETRIC, not linear: each card sits a fixed fraction
 * further along than the last, which is what stops the ribbon tearing as
 * cards approach the camera. Linear spacing bunches near the exit and gaps at
 * the far end.
 *
 * The corridor is full on frame one because each card carries a NEGATIVE
 * animation-delay, dropping it in mid-flight rather than waiting its turn.
 * Without this the hero starts empty and fills over one whole cycle.
 *
 * REDUCED MOTION PAUSES, IT DOES NOT DISABLE (R3 §2, R4 §2.3). Freezing
 * mid-flight leaves a composed still; disabling the animation collapses every
 * card onto the axis into a single stack. globals.css carries a matching
 * exemption from the global reduced-motion reset, which would otherwise force
 * animation-duration to 0.01ms and cause exactly that collapse.
 */

type Props = {
  images?: string[]
  cards?: number
  speed?: number
  axis?: number
  className?: string
  children?: React.ReactNode
}

export function ImageStreamHero({
  images = [],
  cards = 9,
  speed = 22,
  axis = 58,
  className = "",
  children,
}: Props) {
  /* R4 §2.3 item 3: fewer cards and slower travel on mobile. 18 animated
   * layers on a mid-range Android is a thermal problem, not a design one. */
  const [isMobile, setIsMobile] = useState(false)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)")
    const sync = () => setIsMobile(mq.matches)
    sync()
    mq.addEventListener("change", sync)
    return () => mq.removeEventListener("change", sync)
  }, [])

  const count = isMobile ? 6 : cards
  const duration = isMobile ? 26 : speed
  const deck: StreamCard[] = buildCards(count * 2, images)

  return (
    <section
      data-dark-hero
      className={`on-dark relative isolate flex flex-col justify-end overflow-hidden ${className}`}
    >
      <div
        aria-hidden
        className="corridor pointer-events-none absolute inset-0"
        data-paused={paused || undefined}
        style={{ perspective: "1100px", perspectiveOrigin: `50% ${axis}%` }}
      >
        {deck.map((card, i) => (
          <div
            key={i}
            className="corridor-card"
            style={{
              /* geometric depth — each card 1/N of the cycle further out */
              animationDuration: `${duration}s`,
              ["--corridor-duration" as string]: `${duration}s`,
              animationDelay: `${-(duration / deck.length) * i}s`,
              /* deterministic lateral scatter, no Math.random (R4 §2.1) */
              ["--x" as string]: `${((i * 37) % 100) - 50}%`,
              ["--y" as string]: `${((i * 53) % 70) - 35}%`,
            }}
          >
            {card.src ? (
              <img
                src={card.src}
                alt=""
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            ) : (
              <div
                className="h-full w-full"
                style={{ background: card.gradient }}
              />
            )}
          </div>
        ))}
      </div>

      {/*
       * Scrim — R4 §2.4 exactly. The eyebrow is the binding constraint, not
       * the headline: --brass-light needs alpha >= 0.90 to clear AA where
       * --paper clears at 0.70. Content anchors below the 68% line where the
       * wash is effectively solid.
       *
       * DO NOT lighten these stops to "show more of the corridor". Measured
       * against the lightest gradient stop (#D9BE7A), the 96% stop gives
       * --paper 10.44:1 and --brass-light 6.02:1. At 40% they are 3.38 and
       * 1.95 — both failing.
       */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgb(42 52 101 / .40) 0%, rgb(42 52 101 / .70) 42%, rgb(42 52 101 / .96) 68%, var(--color-midnight) 100%)",
        }}
      />

      <div className="relative z-10">{children}</div>

      {/*
       * R4 §2.3 item 2 — pause control, still required. Motion rushing toward
       * the viewer is a vestibular trigger, and prefers-reduced-motion only
       * helps people who already found that setting. If anything the abstract
       * version is a stronger trigger than photographs: there is no detail to
       * fixate on.
       */}
      <button
        type="button"
        onClick={() => setPaused((v) => !v)}
        aria-pressed={paused}
        className="absolute right-5 bottom-5 z-20 rounded-[3px] p-2 text-[color:var(--color-paper)]/60 transition-colors hover:text-[color:var(--color-paper)]"
      >
        {paused ? <Play size={16} /> : <Pause size={16} />}
        <span className="sr-only">
          {paused ? "Resume background animation" : "Pause background animation"}
        </span>
      </button>
    </section>
  )
}
