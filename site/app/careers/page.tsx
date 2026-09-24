import type { Metadata } from "next"
import Link from "next/link"

import { SurveyInstrument } from "@/components/engineering-drawings"
import { COMPANY, MAILTO_HREF } from "@/lib/company"
import { PageHeader, PAGE_SHELL } from "@/components/page-header"

/*
 * Careers — R20.
 *
 * The owner has approved ONE thing here: that career enquiries may use the
 * existing company email. That is the whole of the approved content, and it
 * is the whole of this page.
 *
 * DELIBERATELY ABSENT, because none of it is approved and all of it is the
 * kind of thing a template invents:
 *   - No vacancies. No JobOpening record has ever been authored, and a
 *     fabricated opening is worse than an empty page.
 *   - No benefits, perks, culture copy or employee testimonials.
 *   - No hiring locations. NCC has two offices and works across two states;
 *     which of those hires is not established.
 *   - No promise of consideration, acknowledgement or response time. "We
 *     review every application" is a commitment the company has not made.
 *   - No application form and no upload facility. There is no backend to
 *     receive either, and a form that silently discards a CV is a worse
 *     failure than no form at all — the §2 teardown is full of controls that
 *     do nothing.
 *
 * The mailto is the approved address from lib/company.ts, not a new one, and
 * it was not tested by sending mail.
 */

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Career enquiries at NCC Infraspace. Email your CV and area of interest to the company office.",
}

export default function CareersPage() {
  return (
    <div className={`${PAGE_SHELL} pb-[clamp(4rem,2.5rem+6.5vw,8.75rem)]`}>
      <PageHeader
        eyebrow={'Careers'}
        title={<>Careers at NCC.</>}
        intro={<>NCC Infraspace has built road, bridge and urban infrastructure for
          government authorities since 1987. Engineering, site and technical
          staff carry out that work on contracts across India.</>}
      />

      <div className="mt-8 border-t border-[color:var(--color-rule)] pt-8 lg:mt-10 lg:pt-10">
        <section className="grid items-start gap-8 border border-[color:var(--color-rule)] bg-[color:var(--color-white)] p-[18px] sm:p-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:gap-12 lg:p-8">
          <div>
          <h2 className="font-[family-name:var(--font-archivo)] text-[length:var(--text-lg)] leading-[1.15] font-semibold tracking-[-0.01em] break-words text-[color:var(--color-ink)] min-[360px]:text-[length:var(--text-lg)] sm:text-[length:var(--text-xl)] lg:text-[length:var(--text-xl)] text-pretty">
            How to apply
          </h2>

          <hr className="mt-5 border-0 border-t border-[color:var(--color-rule)]" />

          {/* Owner-approved wording, verbatim. */}
          <p className="mt-5 max-w-[62ch] text-[length:var(--text-base)] leading-[1.6] break-words text-[color:var(--color-ink)]">
            For career enquiries and applications, email your CV and area of
            interest to{" "}
            <a
              href={MAILTO_HREF}
              className="break-words text-[color:var(--color-copper-ink)] underline underline-offset-2 hover:no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-focus)]"
            >
              {COMPANY.email}
            </a>
            .
          </p>

          <a
            href={MAILTO_HREF}
            className="measurement mt-6 inline-flex min-h-[44px] items-center rounded-[3px] bg-[color:var(--color-copper-deep)] px-5 text-[length:var(--text-sm)] font-medium text-[color:var(--color-white)] transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-focus)]"
          >
            Email your CV
          </a>
          </div>
          <div className="lg:justify-self-end">
            <SurveyInstrument label="Tripod-mounted surveying level, showing the line of sight and instrument height" />
          </div>
        </section>

        <p className="mt-8 max-w-[62ch] text-[length:var(--text-base)] leading-[1.6] text-[color:var(--color-muted)]">
          The work itself is on the{" "}
          <Link
            href="/projects"
            className="text-[color:var(--color-copper-ink)] underline underline-offset-2 hover:no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-focus)]"
          >
            project files
          </Link>{" "}
          and the{" "}
          <Link
            href="/capabilities"
            className="text-[color:var(--color-copper-ink)] underline underline-offset-2 hover:no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-focus)]"
          >
            expertise
          </Link>{" "}
          pages.
        </p>
      </div>
    </div>
  )
}
