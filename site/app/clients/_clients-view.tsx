"use client"

import Image from "next/image"
import Link from "next/link"
import { useId, useState } from "react"

import type { ResolvedClient } from "@/lib/content/clients"
import { CATEGORY_LABEL } from "@/lib/labels"

/*
 * The client wall.
 *
 * Interaction is a DISCLOSURE, not a hover reveal. Hover cannot be tapped and
 * cannot be reached by keyboard, and this page exists for evaluators who will
 * open it on a phone as often as a desktop. Each tile is a real button with
 * aria-expanded and aria-controls; the detail it opens is in the DOM either
 * way, so the page still works with JavaScript off.
 *
 * Logos are monochrome at rest and take their colour on hover or focus. Only
 * six are approved. The rest are typographic wordmarks set at the same tile
 * size and weight, so a client without a logo does not read as a lesser one.
 */

function Tile({ client }: { client: ResolvedClient }) {
  const [open, setOpen] = useState(false)
  const panelId = `${useId()}-client`

  return (
    <li className="border border-[color:var(--color-rule)] bg-[color:var(--color-white)] transition-colors duration-150 has-[button:hover]:border-[color:var(--color-rule-strong)]">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        className="group flex h-full min-h-[168px] w-full flex-col items-start justify-between gap-5 p-5 text-left transition-colors duration-150 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color:var(--color-focus)]"
      >
        {/* Fixed-height mark band. A detailed departmental emblem and a
          * three-letter wordmark have to occupy the same optical space, or
          * the logo tiles read as half empty beside the type-set ones. */}
        <span className="flex h-20 items-center">
          {client.logo ? (
            <Image
              src={`/clients/${client.logo}`}
              alt=""
              aria-hidden
              width={460}
              height={200}
              /* Monochrome at rest so eighteen marks read as one set, colour
               * on hover and on keyboard focus alike. */
              /* Every mark is scaled to the same INK AREA inside one 460 by
                * 200 box, not fitted to the box. Fitting made a square emblem
                * small beside a long wordmark; equal area is what actually
                * reads as equal weight. */
              className="h-20 w-auto object-contain grayscale transition duration-150 group-hover:grayscale-0 group-focus-visible:grayscale-0"
            />
          ) : (
            <span className="font-[family-name:var(--font-archivo)] text-[length:var(--text-xl)] leading-none font-semibold tracking-[-0.02em] text-[color:var(--color-ink)] transition-colors group-hover:text-[color:var(--color-copper-ink)]">
              {client.short}
            </span>
          )}
        </span>

        <span className="flex w-full items-end justify-between gap-3">
          <span className="min-w-0">
            <span className="block text-[length:var(--text-sm)] leading-snug text-[color:var(--color-muted)]">
              {client.name}
            </span>
            {/* A client the owner has confirmed but whose published records
              * are not yet attached shows its type instead of a count of
              * zero. Nothing renders "0 projects". */}
            <span className="measurement mt-1 block text-[length:var(--text-caption)] text-[color:var(--color-copper-ink)]">
              {client.scheme ? "Scheme" : client.groupLabel}
            </span>
          </span>
          <span
            aria-hidden
            className="grid h-8 w-8 shrink-0 place-items-center border border-[color:var(--color-rule)] text-[color:var(--color-ink)] transition-colors group-hover:border-[color:var(--color-copper)]"
          >
            <svg width="13" height="13" viewBox="0 0 13 13" focusable="false">
              <line x1="0.5" y1="6.5" x2="12.5" y2="6.5" stroke="currentColor" strokeWidth="1.5" />
              {!open && <line x1="6.5" y1="0.5" x2="6.5" y2="12.5" stroke="currentColor" strokeWidth="1.5" />}
            </svg>
          </span>
        </span>
      </button>

      <div id={panelId} data-client-detail hidden={!open} className="border-t border-[color:var(--color-rule)] px-5 pt-4 pb-5">
        {client.projectCount === 0 ? (
          <p className="text-[length:var(--text-sm)] leading-[1.6] text-[color:var(--color-muted)]">
            {client.scheme
              ? "A central funding scheme. Projects delivered under it name it in their scope."
              : "Published project records for this client are not attached yet."}
          </p>
        ) : (
        <>
        <dl className="flex flex-wrap gap-x-8 gap-y-2">
          <div>
            <dt className="font-[family-name:var(--font-plex-sans)] text-[length:var(--text-caption)] font-medium tracking-[0.14em] text-[color:var(--color-muted)] uppercase">
              Work
            </dt>
            <dd className="measurement text-[length:var(--text-sm)] text-[color:var(--color-ink)]">
              {client.categories.map((c) => CATEGORY_LABEL[c] ?? c).join(", ")}
            </dd>
          </div>
          {client.offices.length > 1 && (
            <div className="min-w-0 basis-full">
              <dt className="font-[family-name:var(--font-plex-sans)] text-[length:var(--text-caption)] font-medium tracking-[0.14em] text-[color:var(--color-muted)] uppercase">
                Offices
              </dt>
              <dd className="measurement text-[length:var(--text-sm)] break-words text-[color:var(--color-ink)]">
                {client.offices.join(" · ")}
              </dd>
            </div>
          )}
          {client.districts.length > 0 && (
            <div className="min-w-0">
              <dt className="font-[family-name:var(--font-plex-sans)] text-[length:var(--text-caption)] font-medium tracking-[0.14em] text-[color:var(--color-muted)] uppercase">
                Districts
              </dt>
              <dd className="measurement text-[length:var(--text-sm)] break-words text-[color:var(--color-ink)]">
                {client.districts.join(", ")}
              </dd>
            </div>
          )}
        </dl>

        <ul className="mt-4 border-t border-[color:var(--color-rule)]">
          {client.projects.map((p) => (
            <li key={p.slug} className="border-b border-[color:var(--color-rule)] last:border-b-0">
              <Link
                href={`/projects/${p.slug}`}
                className="flex min-h-[44px] flex-wrap items-center gap-x-4 gap-y-1 py-2.5 text-[length:var(--text-sm)] break-words text-[color:var(--color-ink)] hover:text-[color:var(--color-copper-ink)] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color:var(--color-focus)]"
              >
                <span className="min-w-0">{p.title}</span>
                {p.valueCr !== undefined && (
                  <span className="measurement text-[color:var(--color-muted)]">₹{p.valueCr} Cr</span>
                )}
              </Link>
            </li>
          ))}
        </ul>
        </>
        )}
      </div>
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
      <noscript>
        <style>{`[data-client-detail][hidden]{display:block!important}`}</style>
      </noscript>

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
