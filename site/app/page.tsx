import { pageMetadata } from "@/lib/metadata"
export const metadata = pageMetadata("Road and bridge contractors since 1987", "NCC Infraspace builds roads, bridges, irrigation and water infrastructure across India. Explore the company and its completed projects.", "/")
import Link from "next/link"

import { Container, Section, Eyebrow } from "@/components/container"
import { Reveal } from "@/components/reveal"
import { BlueprintSection } from "@/components/blueprint-section"
import { MilestonePortalHero } from "@/components/milestone-portal-hero"
import { HEADLINE_CAPABILITIES } from "@/lib/capabilities"

/*
 * FINAL palette — docs/01-requirements-r7.md. Five colours, closed by the
 * owner.
 */
/*
 * R20: sourced from the approved capability registry, not a third copy of the
 * same four claims. The grid is fixed at four, so it renders the headline set;
 * the full approved list lives on /capabilities.
 */
const SEGMENTS = HEADLINE_CAPABILITIES.map((c) => ({ title: c.short }))

export default function Page() {
  /* Only the capabilities counts still read from content. */

  return (
    <>
      {/*
       * Hero — the MILESTONE glyph portal. No photography or video, per the
       * owner's standing instruction, reaffirmed at R8.
       */}
      <MilestonePortalHero />

      {/*
       * R12: the blueprint replaces the dark arrival panel that followed the
       * hero. The "Work delivered" listing and the "On record" statistics that
       * used to sit here are gone — project content lives on /projects, which
       * carries all 57 records.
       */}
      <BlueprintSection />

      {/*
       * Capabilities: SHORT LINKS ONLY.
       *
       * Expertise owns the capability descriptions. This section used to
       * repeat all four summaries, which put the same claims on Home, About
       * and Expertise. Home now names them and links; the descriptions,
       * counts and example projects live on one page.
       */}
      <Section className="bg-[color:var(--color-mist)]">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] lg:gap-16">
            <div>
              <Eyebrow>Capabilities</Eyebrow>
              <h2 className="max-w-[16ch] text-[length:var(--text-2xl)] text-pretty">
                What we build.
              </h2>
              <p className="mt-5 max-w-[46ch] text-[length:var(--text-base)] leading-[1.6] text-pretty text-[color:var(--color-muted)]">
                Road, bridge, irrigation, urban and water infrastructure for
                government departments, municipal corporations and development
                authorities.
              </p>
            </div>

            <ul className="border-t border-[color:var(--color-rule-strong)]">
              {SEGMENTS.map((seg, i) => (
                <Reveal
                  key={seg.title}
                  as="li"
                  delay={i * 60}
                  className="border-b border-[color:var(--color-rule)]"
                >
                  <Link
                    href="/capabilities"
                    className="group flex min-h-[44px] items-center justify-between gap-6 py-5 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color:var(--color-focus)]"
                  >
                    <span className="font-[family-name:var(--font-archivo)] text-[length:var(--text-lg)] leading-tight font-semibold text-[color:var(--color-ink)] group-hover:text-[color:var(--color-copper-ink)]">
                      {seg.title}
                    </span>
                    <span
                      aria-hidden
                      className="measurement shrink-0 text-[length:var(--text-sm)] text-[color:var(--color-copper-ink)] transition-transform duration-150 group-hover:translate-x-1"
                    >
                      &rarr;
                    </span>
                  </Link>
                </Reveal>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/*
       * Closing call to action. The page previously ran the capability list
       * straight into the footer with nothing to act on.
       */}
      <Section className="on-dark bg-[color:var(--color-navy)]" >
        <Container>
          <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16">
            <div>
              <Eyebrow tone="dark">Tenders and enquiries</Eyebrow>
              <h2 className="max-w-[20ch] text-[length:var(--text-2xl)] text-pretty">
                Every contract, on record.
              </h2>
              <p className="mt-5 max-w-[52ch] text-[length:var(--text-base)] leading-[1.6] text-pretty text-[color:var(--color-white)]/80">
                Each sheet carries its authority, scope and chainage, with the
                contract value where it is on record. The office answers tender
                and private enquiries on one line.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/projects"
                className="inline-flex min-h-[44px] items-center rounded-[3px] bg-[color:var(--color-copper-deep)] px-5 text-[length:var(--text-sm)] font-medium text-[color:var(--color-white)] transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-focus-on-dark)]"
              >
                Project files
              </Link>
              <Link
                href="/contact"
                className="inline-flex min-h-[44px] items-center rounded-[3px] border border-[color:var(--color-white)]/35 px-5 text-[length:var(--text-sm)] font-medium text-[color:var(--color-white)] transition-colors hover:border-[color:var(--color-white)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-focus-on-dark)]"
              >
                Contact the office
              </Link>
            </div>
          </div>
        </Container>
      </Section>

    </>
  )
}
