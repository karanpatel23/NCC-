import type { Metadata } from "next"
import Link from "next/link"

import { FootprintMap } from "@/components/footprint-map"
import { PageHeader, PAGE_SHELL } from "@/components/page-header"
import { Reveal } from "@/components/reveal"
import { LEADERSHIP, TIMELINE } from "@/content/timeline"
import { COMPANY } from "@/lib/company"
import { loadProjects } from "@/lib/content/load"

/*
 * About.
 *
 * Rebuilt. It owns origins, leadership, the vision and the footprint, and
 * nothing else. What it deliberately does NOT carry any more:
 *
 *   - The four build types. Expertise owns capabilities now; this page links.
 *   - The client-type breakdown. /clients owns that.
 *   - A project photograph. highway-01.jpg belongs to Bagodara and was
 *     appearing on three pages; the footprint map is this page's own image.
 *   - Class AA, turnover and the Crisil rating, which stay in the hero panel
 *     under the standing flag.
 *
 * Every date comes from content/timeline.ts and only three sources are
 * allowed in it. Leadership is text only until both portraits exist, and the
 * titles are TODO placeholders for the owner.
 */

export const metadata: Metadata = {
  title: "About",
  description:
    "NCC Infraspace has built roads, bridges and flyovers since 1987, working for government, semi-government and private clients across India.",
}

const IDENTITY: Array<[string, string]> = [
  ["Legal name", COMPANY.legalName],
  ["Founded", String(COMPANY.foundedYear)],
  ["Originally", COMPANY.predecessorFirm],
  ["Incorporated", "9 April 2015"],
  ["CIN", COMPANY.cin],
]

export default function AboutPage() {
  const projects = loadProjects()
  /* States only. No project names, no counts. */
  const footprint = [...new Set(projects.map((p) => p.state))].sort()

  const bySlug = new Map(projects.map((p) => [p.slug, p]))

  return (
    <div className={`${PAGE_SHELL} pb-[clamp(4rem,2.5rem+6.5vw,8.75rem)]`}>
      <PageHeader
        eyebrow="About"
        title="Roads and bridges since 1987."
        intro={
          <>
            NCC Infraspace builds highways, urban roads, water networks and rail
            connectivity for government departments, municipal corporations and
            development authorities. The company was founded as a partnership
            firm in 1987 and incorporated in 2015.
          </>
        }
      />

      {/* ---------- identity ---------- */}
      <section className="mt-10 border-t border-[color:var(--color-rule)] pt-8 lg:mt-14 lg:pt-10">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] lg:gap-16">
          <div>
            <h2 className="font-[family-name:var(--font-archivo)] text-[length:var(--text-xl)] leading-tight font-semibold tracking-[-0.015em] text-pretty">
              The company
            </h2>
            <p className="mt-4 max-w-[54ch] text-[length:var(--text-base)] leading-[1.6] text-pretty text-[color:var(--color-muted)]">
              The business began in 1987 as Natraj Construction Company, a
              partnership firm taking road and bridge work for government
              departments. It was incorporated as NCC Infraspace Private Limited
              on 9 April 2015. Both names are still on the mark at the top of
              this page. The older one is not decoration. Contracts, references
              and site boards carry it.
            </p>
          </div>
          <dl className="border-t border-[color:var(--color-rule-strong)]">
            {IDENTITY.map(([k, v]) => (
              <div
                key={k}
                className="grid gap-1 border-b border-[color:var(--color-rule)] py-3 sm:grid-cols-[minmax(9rem,10rem)_1fr] sm:gap-6"
              >
                <dt className="font-[family-name:var(--font-plex-sans)] text-[length:var(--text-caption)] font-medium tracking-[0.14em] text-[color:var(--color-muted)] uppercase">
                  {k}
                </dt>
                <dd className="measurement min-w-0 text-[length:var(--text-base)] break-words text-[color:var(--color-ink)]">
                  {v}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ---------- timeline ---------- */}
      <section className="mt-14 border-t border-[color:var(--color-rule)] pt-8 lg:mt-20 lg:pt-10">
        <h2 className="font-[family-name:var(--font-archivo)] text-[length:var(--text-xl)] leading-tight font-semibold tracking-[-0.015em] text-pretty">
          Record to date
        </h2>
        <ol className="mt-8 border-t border-[color:var(--color-rule-strong)]">
          {TIMELINE.map((t, i) => (
            <Reveal
              key={t.year}
              as="li"
              delay={i * 60}
              className="grid gap-x-8 gap-y-3 border-b border-[color:var(--color-rule)] py-6 sm:grid-cols-[7rem_minmax(0,1fr)]"
            >
              <span className="measurement text-[length:var(--text-lg)] leading-none font-medium text-[color:var(--color-copper-ink)]">
                {t.year}
              </span>
              <div className="min-w-0">
                <h3 className="font-[family-name:var(--font-archivo)] text-[length:var(--text-lg)] leading-tight font-semibold text-pretty">
                  {t.title}
                </h3>
                {t.body && (
                  <p className="mt-2 max-w-[58ch] text-[length:var(--text-base)] leading-[1.6] text-[color:var(--color-muted)]">
                    {t.body}
                  </p>
                )}
                {t.projects && t.projects.length > 0 && (
                  <ul className="mt-3 flex flex-col gap-1">
                    {t.projects.map((slug) => {
                      const p = bySlug.get(slug)
                      if (!p) return null
                      return (
                        <li key={slug}>
                          <Link
                            href={`/projects/${slug}`}
                            className="inline-flex min-h-[32px] items-center text-[length:var(--text-sm)] break-words text-[color:var(--color-copper-ink)] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-focus)]"
                          >
                            {p.title}
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                )}
              </div>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* ---------- how the company is led ---------- */}
      <section className="mt-14 border-t border-[color:var(--color-rule)] pt-8 lg:mt-20 lg:pt-10">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.38fr)_minmax(0,0.62fr)] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="font-[family-name:var(--font-archivo)] text-[length:var(--text-xl)] leading-tight font-semibold tracking-[-0.015em] text-pretty">
              How the company is led
            </h2>
            <p className="mt-4 max-w-[46ch] text-[length:var(--text-base)] leading-[1.6] text-pretty text-[color:var(--color-muted)]">
              Responsibility runs from the board through management to the
              engineers on site. Each level answers for a different part of the
              contract.
            </p>
          </div>
          <ol className="border-t border-[color:var(--color-rule-strong)]">
            {LEADERSHIP.map((l, i) => (
              <Reveal
                key={l.level}
                as="li"
                delay={i * 60}
                className="grid gap-x-8 gap-y-2 border-b border-[color:var(--color-rule)] py-6 sm:grid-cols-[minmax(10rem,12rem)_minmax(0,1fr)]"
              >
                <h3 className="font-[family-name:var(--font-archivo)] text-[length:var(--text-lg)] leading-tight font-semibold text-pretty">
                  {l.level}
                </h3>
                <div className="min-w-0">
                  <p className="max-w-[58ch] text-[length:var(--text-base)] leading-[1.6] text-[color:var(--color-muted)]">
                    {l.accountable}
                  </p>
                  {l.people && l.people.length > 0 && (
                    <ul className="mt-3 flex flex-col gap-1">
                      {l.people.map((person) => (
                        <li
                          key={person.name}
                          className="measurement text-[length:var(--text-sm)] text-[color:var(--color-ink)]"
                        >
                          {person.name}
                          <span className="text-[color:var(--color-muted)]">
                            {" "}
                            {person.title}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- vision, published verbatim by owner decision ---------- */}
      <section className="mt-14 border-t border-[color:var(--color-rule)] pt-8 lg:mt-20 lg:pt-10">
        <h2 className="font-[family-name:var(--font-archivo)] text-[length:var(--text-xl)] leading-tight font-semibold tracking-[-0.015em] text-pretty">
          Vision
        </h2>
        {/*
          * VERBATIM. The owner has approved this wording as final and exempted
          * it from the house style rules. It is reproduced exactly as recovered
          * from NCC's own previous site, including "almost satisfaction" and
          * "state of art". Do not correct, rephrase or tidy it.
          */}
        <blockquote className="mt-6 max-w-[56ch] border-l-2 border-[color:var(--color-copper)] pl-6">
          <p className="font-[family-name:var(--font-archivo)] text-[length:var(--text-lg)] leading-[1.45] font-medium text-pretty text-[color:var(--color-ink)]">
            Striving for perfection in order to establish a prominent position,
            by exemplary performance, state of art quality work, thereby
            providing almost satisfaction to all the stakeholders
          </p>
        </blockquote>
      </section>

      {/* ---------- footprint ---------- */}
      <section className="mt-14 border-t border-[color:var(--color-rule)] pt-8 lg:mt-20 lg:pt-10">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.5fr)_minmax(0,0.5fr)] lg:gap-16">
          <div>
            <h2 className="font-[family-name:var(--font-archivo)] text-[length:var(--text-xl)] leading-tight font-semibold tracking-[-0.015em] text-pretty">
              Where the work has been
            </h2>
            <p className="mt-4 max-w-[46ch] text-[length:var(--text-base)] leading-[1.6] text-pretty text-[color:var(--color-muted)]">
              NCC Infraspace takes on work anywhere in India. The states marked
              on the map are where contracts have been delivered so far.
            </p>
            <p className="measurement mt-6 flex flex-wrap gap-x-3 gap-y-1 text-[length:var(--text-sm)] text-[color:var(--color-copper-ink)]">
              {footprint.map((s, i) => (
                <span key={s}>
                  {s}
                  {i < footprint.length - 1 && (
                    <span aria-hidden className="text-[color:var(--color-rule-strong)]">
                      {" "}
                      ·
                    </span>
                  )}
                </span>
              ))}
            </p>
            <Link
              href="/projects"
              className="measurement mt-6 inline-flex min-h-[44px] items-center gap-2 text-[length:var(--text-sm)] font-medium text-[color:var(--color-copper-ink)] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-focus)]"
            >
              Browse the project files
              <span aria-hidden>&rarr;</span>
            </Link>
          </div>
          {/* The map is the section's image. items-center keeps the two
            * columns optically balanced instead of leaving a tail of space
            * under the shorter one. */}
          <div className="mx-auto w-full max-w-[420px] lg:max-w-none">
            <FootprintMap states={footprint} />
          </div>
        </div>
      </section>

      {/* ---------- closing ---------- */}
      <section className="mt-14 border-t-2 border-[color:var(--color-copper)] pt-8 lg:mt-20 lg:pt-10">
        <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16">
          <div>
            <h2 className="max-w-[20ch] font-[family-name:var(--font-archivo)] text-[length:var(--text-xl)] leading-tight font-semibold tracking-[-0.015em] text-pretty">
              What we build, and who for
            </h2>
            <p className="mt-4 max-w-[52ch] text-[length:var(--text-base)] leading-[1.6] text-pretty text-[color:var(--color-muted)]">
              The capability list and the client register are kept on their own
              pages so each stays current.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/capabilities"
              className="inline-flex min-h-[44px] items-center rounded-[3px] bg-[color:var(--color-copper-deep)] px-5 text-[length:var(--text-sm)] font-medium text-[color:var(--color-white)] transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-focus)]"
            >
              Expertise
            </Link>
            <Link
              href="/clients"
              className="inline-flex min-h-[44px] items-center rounded-[3px] border border-[color:var(--color-rule-strong)] px-5 text-[length:var(--text-sm)] font-medium text-[color:var(--color-ink)] transition-colors hover:border-[color:var(--color-copper)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-focus)]"
            >
              Clients
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
