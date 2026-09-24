"use client"

import { INDIA_STATES, INDIA_VIEWBOX } from "@/lib/india-states"

/*
 * Where NCC has delivered work.
 *
 * The boundary is the official Survey of India depiction, imported from
 * lib/india-states.ts. See the provenance block in that file.
 *
 * The map shows STATES ONLY. No project names, no lists, no counts, and
 * nothing that appears on hover or tap. Projects are the projects page's job;
 * repeating their names here duplicated that page and dated the section the
 * moment a contract was added.
 *
 * States NCC has worked in are filled; every other state is a hairline, so the
 * country reads as one shape rather than as floating regions.
 */

export function FootprintMap({ states }: { states: string[] }) {
  const worked = new Set(states)
  return (
    <svg
      viewBox={`0 0 ${INDIA_VIEWBOX.width} ${INDIA_VIEWBOX.height}`}
      role="img"
      aria-label={`Map of India. NCC Infraspace has delivered work in ${states.join(
        " and ",
      )}.`}
      className="h-auto w-full"
    >
      {Object.entries(INDIA_STATES).map(([name, d]) => {
        const on = worked.has(name)
        return (
          <path
            key={name}
            d={d}
            vectorEffect="non-scaling-stroke"
            fill={on ? "var(--color-copper)" : "var(--color-mist)"}
            fillOpacity={on ? 0.85 : 0.5}
            stroke="var(--color-rule-strong)"
            strokeWidth={on ? 0.9 : 0.5}
            strokeOpacity={on ? 0.9 : 0.5}
            strokeLinejoin="round"
          />
        )
      })}
    </svg>
  )
}
