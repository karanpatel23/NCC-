import type { Metadata } from "next"
import Link from "next/link"

import {
  BankProtection,
  BridgeSection,
  CanalSection,
  RoadSection,
} from "@/components/engineering-drawings"
import { CAPABILITIES } from "@/lib/capabilities"
import { loadProjects } from "@/lib/content/load"
import { PageHeader, PAGE_SHELL } from "@/components/page-header"

/*
 * Expertise — /capabilities.
 *
 * "Expertise" is the visitor-facing LABEL; the route is unchanged, because a
 * change of wording is not a reason to break a URL.
 *
 * WHAT NCC DOES comes from lib/capabilities.ts, the owner-approved registry.
 * WHAT NCC HAS BUILT comes from the project records. The two are deliberately
 * separate, and the dependency runs one way only: a project can supply an
 * example to a capability, never create one. Adding a project in a new
 * category adds no service claim to this page.
 *
 * A capability with nothing recorded against it renders its title and its
 * approved description, and then simply stops. No count, no empty list, no
 * "projects coming soon", no note to the visitor about a gap. Bridges,
 * irrigation and river protection are in exactly that state: owner-confirmed
 * capabilities, no example in the recovered 2018-2023 file.
 *
 * Nothing here states a technique, a plant list, a capacity figure or a
 * qualification, because none of those is approved. There is no Turnover,
 * Class AA or Crisil line either — the standing R8 flag in lib/company.ts
 * bars copying those onto a new page.
 */

export const metadata: Metadata = {
  title: "Expertise",
  description:
    "Roads and highways, bridges, irrigation, river protection, urban and municipal roads, water networks, industrial estate infrastructure and rail connectivity.",
}



/*
 * One drawing per capability, and only where it earns its place: the three
 * owner-confirmed capabilities with no photographed project, plus the road
 * section that explains the layers named in the highways description. These
 * are category illustrations, not NCC plant records.
 */
const DRAWING: Partial<
  Record<string, (p: { label: string }) => React.ReactElement>
> = {
  highways: RoadSection,
  bridges: BridgeSection,
  irrigation: CanalSection,
  protection: BankProtection,
}

export default function CapabilitiesPage() {
  const projects = loadProjects()

  /*
   * Evidence lookup. Counted, never typed — both competitors ship "0 +"
   * because a literal was never wired up.
   */
  const sections = CAPABILITIES.map((c) => {
    const evidence = c.category
      ? projects.filter((p) => p.category === c.category)
      : []
    return {
      ...c,
      states: [...new Set(evidence.map((p) => p.state))].sort(),
      examples: evidence.slice(0, 3),
    }
  })


  return (
    <div className={`${PAGE_SHELL} pb-[clamp(4rem,2.5rem+6.5vw,8.75rem)]`}>
      <PageHeader
        eyebrow={'Expertise'}
        title={<>What we build.</>}
        intro={<>NCC Infraspace builds road, bridge, irrigation, water and urban
          infrastructure for government departments, municipal corporations and
          development authorities across India.
          Where a contract is published on this site, it is linked from the
          capability it belongs to.</>}
      />

      <div className="mt-8 border-t border-[color:var(--color-rule)] pt-8 lg:mt-10 lg:pt-10">
        <div className="flex flex-col gap-4 lg:gap-6">
          {sections.map((c) => (
            <section
              key={c.id}
              className="border border-[color:var(--color-rule)] bg-[color:var(--color-white)] p-[18px] sm:p-6 lg:p-8"
            >
              {/* The states line is evidence, so it appears only where there
                * is evidence. A capability with no record shows no location. */}
              {c.states.length > 0 && (
                <p className="font-[family-name:var(--font-plex-sans)] text-[length:var(--text-caption)] font-medium tracking-[0.16em] text-[color:var(--color-muted)] uppercase">
                  {c.states.join(" · ")}
                </p>
              )}
              <div
                className={`flex flex-wrap items-baseline gap-x-4 gap-y-1 ${c.states.length > 0 ? "mt-2" : ""}`}
              >
                <h2 className="font-[family-name:var(--font-archivo)] text-[length:var(--text-lg)] leading-[1.15] font-semibold tracking-[-0.01em] break-words text-[color:var(--color-ink)] min-[360px]:text-[length:var(--text-lg)] sm:text-[length:var(--text-xl)] lg:text-[length:var(--text-xl)] text-pretty">
                  {c.title}
                </h2>
              </div>

              <hr className="mt-5 border-0 border-t border-[color:var(--color-rule)]" />

              {(() => {
                const Drawing = DRAWING[c.id]
                return (
                  <div
                    className={
                      Drawing
                        ? "mt-5 grid items-start gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] md:gap-10"
                        : "mt-5"
                    }
                  >
                    <p className="max-w-[62ch] text-[length:var(--text-base)] leading-[1.6] break-words text-[color:var(--color-muted)]">
                      {c.summary}
                    </p>
                    {Drawing && (
                      <div className="md:justify-self-end">
                        <Drawing label={`${c.title}, typical section`} />
                      </div>
                    )}
                  </div>
                )
              })()}

              {c.examples.length > 0 && (
                <ul className="mt-5 border-t border-[color:var(--color-rule)]">
                  {c.examples.map((p) => (
                    <li
                      key={p.slug}
                      className="border-b border-[color:var(--color-rule)]"
                    >
                      <Link
                        href={`/projects/${p.slug}`}
                        className="flex min-h-[44px] flex-wrap items-center gap-x-4 gap-y-1 py-3 text-[length:var(--text-base)] break-words text-[color:var(--color-ink)] hover:text-[color:var(--color-copper-ink)] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color:var(--color-focus)]"
                      >
                        <span className="min-w-0">{p.title}</span>
                        {p.contractValueCr !== undefined && (
                          <span className="measurement text-[color:var(--color-muted)]">
                            ₹{p.contractValueCr} Cr
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        {/*
          * ONE link, at the end, and it does not promise a filter it cannot
          * apply. A per-section "All highways projects" would have implied
          * that /projects arrives pre-filtered; the category filter is client
          * state, not a URL, so the link would have been a small lie.
          */}
        <Link
          href="/projects"
          className="measurement mt-8 inline-flex min-h-[44px] items-center gap-2 text-[length:var(--text-sm)] font-medium text-[color:var(--color-copper-ink)] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-focus)] lg:mt-10"
        >
          Browse the project files
          <span aria-hidden>→</span>
        </Link>
      </div>
    </div>
  )
}
