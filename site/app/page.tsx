import Link from "next/link"

import { Container, Section, Eyebrow } from "@/components/container"
import { ProjectCard } from "@/components/project-card"
import { MilestonePortalHero } from "@/components/milestone-portal-hero"
import { COMPANY } from "@/lib/company"
import { loadProjects, projectsByStatus, projectTotals } from "@/lib/content/load"

/*
 * FINAL palette — docs/01-requirements-r7.md. Five colours, closed by the
 * owner.
 *
 * The credentials strip stays --navy like the hero, separated by a --copper
 * hairline. Copper as a 2px rule is non-text, so raw copper is legal there
 * (rule 1 only bars it from carrying text).
 *
 * The corridor still carries the hero, with a gradient set rebuilt from the
 * five. Photography swap is still pre-launch.
 */
const SEGMENTS = [
  { slug: "highways" as const, title: "Highways", summary: "National and state highway widening, strengthening and resurfacing." },
  { slug: "bridges" as const, title: "Bridges", summary: "Major bridges, ROB and RUB structures, and river crossings." },
  { slug: "irrigation" as const, title: "Irrigation", summary: "Canal works and water distribution infrastructure." },
  { slug: "protection" as const, title: "River & protection", summary: "River front development and bank protection works." },
]

export default function Page() {
  const all = loadProjects()
  const ongoing = projectsByStatus("ongoing")
  const totals = projectTotals()

  return (
    <>
      {/*
       * Hero — the MILESTONE glyph portal. Replaces the project reel.
       *
       * Owner's instruction: no photography or video in the hero. That
       * reverses R4 §3, which argued real project work IS the credibility
       * claim — so the credentials are now the content you arrive INSIDE the
       * letter, not a band further down. The evidence still lands first,
       * it just lands through the type instead of under a photograph.
       *
       * The reel and the corridor both still exist as components and can
       * carry other pages.
       */}
      <MilestonePortalHero />

      {/*
       * §6.1 item 4 — ongoing work. Proves the company is CURRENTLY working,
       * which no static brochure site does, and it is the pattern the main
       * brief §2 singles out as the one thing the competitor does right.
       * Renders from real records; shows nothing rather than filler if none
       * are published.
       */}
      {ongoing.length > 0 && (
        <Section>
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <Eyebrow>Km 1.200 · Under execution</Eyebrow>
                <h2 className="text-[length:var(--text-2xl)]">
                  Work currently on site.
                </h2>
              </div>
              <Link
                href="/projects/ongoing"
                className="measurement text-sm text-[color:var(--color-copper-ink)] underline-offset-4 hover:underline"
              >
                All ongoing projects →
              </Link>
            </div>
            <div className="mt-12 grid gap-12 md:grid-cols-2">
              {ongoing.slice(0, 4).map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/*
       * §6.1 item 5 — capabilities. The four segments are named in the brief
       * and taken as the sector standard, so this needs no content that does
       * not exist. Counts come from real records.
       */}
      <Section className="bg-[color:var(--color-mist)]">
        <Container>
          <Eyebrow>Km 2.450 · Capabilities</Eyebrow>
          <h2 className="text-[length:var(--text-2xl)]">What we build.</h2>
          <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {SEGMENTS.map((seg) => {
              const n = all.filter((p) => p.category === seg.slug).length
              return (
                <li
                  key={seg.slug}
                  className="border-t-2 border-[color:var(--color-rule-strong)] pt-5"
                >
                  <h3 className="text-[length:var(--text-lg)] leading-tight">
                    {seg.title}
                  </h3>
                  <p className="mt-3 text-sm text-[color:var(--color-muted)]">
                    {seg.summary}
                  </p>
                  {n > 0 && (
                    <p className="measurement mt-4 text-xs text-[color:var(--color-copper-ink)]">
                      {n} project{n === 1 ? "" : "s"}
                    </p>
                  )}
                </li>
              )
            })}
          </ul>
        </Container>
      </Section>

      {/*
       * §6.1 item 8 — numbers. Computed from the records, never hardcoded.
       * Both competitor sites render "0 +" in production because their
       * counters animate from a value that was never wired up; arithmetic
       * over real content cannot do that.
       */}
      <Section>
        <Container>
          <Eyebrow>Km 3.100 · On record</Eyebrow>
          <dl className="mt-8 grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              ["Years active", String(new Date().getFullYear() - COMPANY.foundedYear)],
              ["Projects published", String(totals.count)],
              ["Contract value", `₹${totals.valueCr} Cr`],
              ["Under execution", String(totals.ongoing)],
            ].map(([label, value]) => (
              <div key={label} className="border-t-2 border-[color:var(--color-copper)] pt-4">
                <dt className="text-[10px] tracking-[0.14em] text-[color:var(--color-muted)] uppercase">
                  {label}
                </dt>
                <dd className="measurement mt-2 text-[length:var(--text-xl)]">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 max-w-[58ch] text-xs text-[color:var(--color-muted)]">
            Figures are counted from published project records, not entered by
            hand, so they cannot drift out of step with the projects below them.
          </p>
        </Container>
      </Section>

    </>
  )
}
