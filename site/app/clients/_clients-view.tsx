"use client"

import Image from "next/image"
import { useState } from "react"

import type { ResolvedClient } from "@/lib/content/clients"

/*
 * The client wall.
 *
 * A tile is A MARK AND A NAME, and nothing else — the owner's instruction.
 * There is no disclosure, no expanding panel and no per-client link.
 *
 * The project records behind each client are still loaded and still validated:
 * lib/content/clients.ts FAILS THE BUILD when a project matches zero or more
 * than one client, so a contract still cannot silently detach from its
 * authority. That check is the reason the loader stays; the records are simply
 * not surfaced on this page. /projects is where a record is read.
 *
 * Logos render in their own colour at rest. They were greyscale-until-opened
 * while a tile could be opened — with the disclosure gone that state has no
 * resolution on a touch device, and a wall left permanently grey for every
 * phone visitor is worse than one that just shows the marks.
 *
 * Fourteen marks are approved. The rest are typographic wordmarks set at the
 * same tile size and weight, so a client without a logo does not read as a
 * lesser one.
 */

function Tile({ client }: { client: ResolvedClient }) {
  return (
    <li className="client-glass flex flex-col items-start gap-5 border border-[color:var(--color-rule)] bg-[color:var(--color-white)] p-5">
      {/* Fixed-height mark band. A detailed departmental emblem and a
        * three-letter wordmark have to occupy the same optical space, or the
        * logo tiles read as half empty beside the type-set ones. */}
      <span className="flex h-20 items-center">
        {client.logo ? (
          <Image
            src={`/clients/${client.logo}`}
            alt=""
            aria-hidden
            width={460}
            height={200}
            /* Every mark is scaled to the same INK AREA inside one 460 by 200
              * box, not fitted to the box. Fitting made a square emblem small
              * beside a long wordmark; equal area is what reads as equal
              * weight. */
            className="h-20 w-auto object-contain"
          />
        ) : (
          <span className="font-[family-name:var(--font-archivo)] text-[length:var(--text-xl)] leading-none font-semibold tracking-[-0.02em] text-[color:var(--color-ink)]">
            {client.short}
          </span>
        )}
      </span>

      <span className="block min-w-0 text-[length:var(--text-sm)] leading-snug break-words text-[color:var(--color-ink)]">
        {client.name}
      </span>
    </li>
  )
}

export function ClientsView({
  groups,
}: {
  groups: Array<{ id: string; label: string; blurb: string; clients: ResolvedClient[] }>
}) {
  const [active, setActive] = useState("all")
  const shown = groups.filter((g) => active === "all" || g.id === active)

  return (
    <div>
      <div role="group" aria-label="Filter by client type" className="flex flex-wrap gap-2">
        {[{ id: "all", label: "All" }, ...groups.map((g) => ({ id: g.id, label: g.label }))].map((t) => {
          const on = t.id === active
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setActive(t.id)}
              aria-pressed={on}
              className={`measurement min-h-[44px] border px-4 text-[length:var(--text-sm)] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-focus)] ${
                on
                  ? "border-[color:var(--color-copper-deep)] bg-[color:var(--color-copper-deep)] text-[color:var(--color-white)]"
                  : "border-[color:var(--color-rule-strong)] text-[color:var(--color-ink)] hover:border-[color:var(--color-copper)] hover:text-[color:var(--color-copper-ink)]"
              }`}
            >
              {t.label}
            </button>
          )
        })}
      </div>

      {shown.map((g) => (
        <section key={g.id} className="mt-12 first:mt-10">
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-t border-[color:var(--color-rule-strong)] pt-5">
            <h2 className="font-[family-name:var(--font-archivo)] text-[length:var(--text-xl)] leading-tight font-semibold tracking-[-0.015em] text-pretty">
              {g.label}
            </h2>
          </div>
          <p className="mt-2 max-w-[62ch] text-[length:var(--text-base)] leading-[1.6] text-pretty text-[color:var(--color-muted)]">
            {g.blurb}
          </p>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {g.clients.map((c) => (
              <Tile key={c.id} client={c} />
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
