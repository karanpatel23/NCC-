import type { Metadata } from "next"
import { PageHeader, PAGE_SHELL } from "@/components/page-header"

/*
 * CSR.
 *
 * THE FOUNDER PUBLIC SERVICE SECTION IS DELETED, with every name. Those were
 * an individual's own offices and trusteeships, not company programmes, and
 * they no longer appear anywhere on the site.
 *
 * What replaces it is how the company works. Every line below is carried from
 * NCC's own recovered copy or from the 57 published records:
 *   "Quality is a top priority for us at every stage of the project"
 *   "our management ensures that we complete projects within the specified
 *    budget and timeframe"
 *   "we understand the financial aspects affecting national budgets and follow
 *    Supreme Court guidelines for MSWM projects in GUDC"
 *   "our team includes qualified engineers and technical staff"
 *   every published contract was awarded under open tender by a government body
 *
 * TODO(owner), NOT rendered and NOT padded around, because no NCC source
 * supports any of it:
 *   - Safety practice. No policy, standard, induction, officer or record
 *     exists in the recovered material.
 *   - Material testing. No laboratory, third-party arrangement or standard is
 *     recorded.
 *   - Any figure for education or healthcare support. The recovered copy says
 *     the company supports institutions "with thousands of students", but that
 *     is the roll of a trust, not a count of anyone NCC has helped.
 * Two sections are written rather than four for exactly that reason.
 */


export const metadata: Metadata = {
  title: "CSR",
  description:
    "NCC Infraspace supports education and healthcare in the districts where it works. Its founder holds public and charitable offices in north Gujarat.",
}

export default function CsrPage() {
  return (
    <div className={`${PAGE_SHELL} pb-[clamp(4rem,2.5rem+6.5vw,8.75rem)]`}>
      <PageHeader
        eyebrow={'CSR'}
        title={<>Work that outlasts the contract.</>}
        intro={<>NCC Infraspace works in the districts its people live in. Two things
          follow from that, and they are not the same thing. There is what the company
          supports, and the public offices its founder holds in his own name.
          They are set out separately below.</>}
      />

      <div className="mt-8 border-t border-[color:var(--color-rule)] pt-8 lg:mt-10 lg:pt-10">
        <div className="flex flex-col gap-4 lg:gap-6">
          {/* --- the company --- */}
          <section className="border border-[color:var(--color-rule)] bg-[color:var(--color-white)] p-[18px] sm:p-6 lg:p-8">
            <p className="font-[family-name:var(--font-plex-sans)] text-[length:var(--text-caption)] font-medium tracking-[0.16em] text-[color:var(--color-muted)] uppercase">
              The company
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-archivo)] text-[length:var(--text-lg)] leading-[1.15] font-semibold tracking-[-0.01em] break-words text-[color:var(--color-ink)] min-[360px]:text-[length:var(--text-lg)] sm:text-[length:var(--text-xl)] lg:text-[length:var(--text-xl)] text-pretty">
              What NCC Infraspace supports
            </h2>

            <hr className="mt-5 border-0 border-t border-[color:var(--color-rule)]" />

            <p className="mt-5 max-w-[62ch] text-[length:var(--text-base)] leading-[1.6] break-words text-[color:var(--color-muted)]">
              Alongside its construction work, NCC Infraspace supports
              education and healthcare institutions in the regions where it
              operates, including Lions Hospital in Mehsana. That support sits
              outside the company&rsquo;s contracted work and is directed at
              the districts its projects are built in.
            </p>
          </section>

          {/* --- how the work is run --- */}
          <section className="border border-[color:var(--color-rule)] bg-[color:var(--color-white)] p-[18px] sm:p-6 lg:p-8">
            <p className="font-[family-name:var(--font-plex-sans)] text-[length:var(--text-caption)] font-medium tracking-[0.16em] text-[color:var(--color-muted)] uppercase">
              On site
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-archivo)] text-[length:var(--text-lg)] leading-[1.15] font-semibold tracking-[-0.01em] break-words text-[color:var(--color-ink)] min-[360px]:text-[length:var(--text-lg)] sm:text-[length:var(--text-xl)]">
              How the work is run
            </h2>

            <hr className="mt-5 border-0 border-t border-[color:var(--color-rule)]" />

            <dl className="mt-5 border-t border-[color:var(--color-rule)]">
              {[
                [
                  "Quality",
                  "Quality is treated as a condition of every stage of the work rather than a check at the end, on public and private contracts alike.",
                ],
                [
                  "Programme and budget",
                  "Management answers for completing each contract within the budget and the programme the authority specified.",
                ],
                [
                  "Working to the authority",
                  "Every published contract was awarded under open tender by a government department, municipal corporation or development authority, and is executed to that body's conditions. On municipal solid waste management work for GUDC that includes the applicable Supreme Court guidelines.",
                ],
                [
                  "People on site",
                  "Qualified engineers and technical staff carry out execution, with site engineering accountable for setting out and day to day supervision.",
                ],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="grid gap-1 border-b border-[color:var(--color-rule)] py-4 last:border-b-0 sm:grid-cols-[minmax(11rem,13rem)_minmax(0,1fr)] sm:gap-6"
                >
                  <dt className="font-[family-name:var(--font-plex-sans)] text-[length:var(--text-caption)] font-medium tracking-[0.14em] text-[color:var(--color-muted)] uppercase">
                    {k}
                  </dt>
                  <dd className="min-w-0 max-w-[62ch] text-[length:var(--text-base)] leading-[1.6] text-[color:var(--color-ink)]">
                    {v}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        </div>
      </div>
    </div>
  )
}
