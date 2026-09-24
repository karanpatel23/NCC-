import type { Metadata } from "next"

import { Container, Section, Eyebrow } from "@/components/container"
import { PageHeader, PAGE_SHELL } from "@/components/page-header"
import { Reveal } from "@/components/reveal"
import {
  COMPANY,
  OFFICES,
  TEL_HREF,
  MAILTO_HREF,
} from "@/lib/company"

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact NCC Infraspace. Offices in Ahmedabad and Mehsana. Telephone 02762-255962.",
}

/*
 * /contact — R8.
 *
 * THERE IS NO ENQUIRY FORM, and that is the decision rather than an omission.
 *
 * A form needs somewhere to deliver. Nothing in this repo is configured to
 * send mail: no environment file, no route handler, no provider. The options
 * were therefore a form that posts nowhere and shows a success message, or no
 * form. The first is worse than useless — it silently loses tender enquiries
 * while telling the sender they arrived, and the visitor has no way to know.
 *
 * The old site does POST to
 *   https://i9jz38s1o9.execute-api.us-east-1.amazonaws.com/email-beta/contact-us
 * recovered from the phase-1 bundle. It is NOT wired up here and has not been
 * called — its stage is named "beta", it sits in us-east-1 while the site's
 * other two Lambdas are in ap-south-1, and whether it still delivers, to whom,
 * and with what authentication is all unverified. Finding out means sending
 * mail to a real recipient. Form delivery is flagged as its own decision; see
 * docs/01-requirements-r8.md.
 *
 * Meanwhile the phone and the email are real, confirmed, and one tap each.
 * For a contractor whose enquiries arrive by phone anyway, that is not a
 * downgrade.
 */

/* Prefilled subjects, so an enquiry arrives already sorted. A mailto is not a
 * form: it opens the visitor's own mail client, sends nothing by itself, and
 * cannot pretend to have succeeded. */
const ROUTES = [
  {
    label: "Tenders and project partners",
    body: "Tender documents, pre-qualification, joint ventures, subcontracting and supply. Reach the office directly by phone, or write with the package details.",
    subject: "Tender / project enquiry",
    cta: "Email about a tender",
  },
  {
    label: "Private clients",
    body: "Roads, approaches and structures commissioned directly for industrial, commercial or institutional clients. Describe the site and the scope and the office will come back to you.",
    subject: "Private works enquiry",
    cta: "Email about private works",
  },
]

export default function ContactPage() {
  return (
    <>
      <div className={PAGE_SHELL}>
        <PageHeader
          eyebrow="Contact"
          title="Talk to the office."
          intro="Two offices, one telephone line and one email address. Tender enquiries and private commissions both arrive in the same place."
        />
      </div>

      {/* The two actions, given the weight they actually deserve. */}
      <Section>
        <Container>
          <Eyebrow>Km 0.300 · Direct</Eyebrow>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <a
              href={TEL_HREF}
              className="lift group block border-t-2 border-[color:var(--color-copper)] pt-5"
            >
              <span className="flex items-center gap-2 text-[length:var(--text-caption)] tracking-[0.14em] text-[color:var(--color-muted)] uppercase"> Telephone
              </span>
              <span className="measurement mt-3 block text-[length:var(--text-xl)] text-[color:var(--color-copper-ink)] group-hover:underline">
                {COMPANY.phone}
              </span>
            </a>

            <a
              href={MAILTO_HREF}
              className="lift group block border-t-2 border-[color:var(--color-copper)] pt-5"
            >
              <span className="flex items-center gap-2 text-[length:var(--text-caption)] tracking-[0.14em] text-[color:var(--color-muted)] uppercase"> Email
              </span>
              <span className="mt-3 block text-[length:var(--text-lg)] break-words text-[color:var(--color-copper-ink)] group-hover:underline">
                {COMPANY.email}
              </span>
            </a>
          </div>
        </Container>
      </Section>

      {/* Two enquiry routes, equal weight — R8 serves both audiences alike. */}
      <Section className="bg-[color:var(--color-mist)]">
        <Container>
          <Eyebrow>Km 1.100 · Enquiries</Eyebrow>
          <h2 className="max-w-[22ch] text-[length:var(--text-2xl)] text-pretty">
            What are you getting in touch about?
          </h2>
          <div className="mt-12 grid gap-10 md:grid-cols-2">
            {ROUTES.map((r, i) => (
              <Reveal
                key={r.label}
                delay={i * 70}
                className="flex h-full flex-col border-t-2 border-[color:var(--color-rule-strong)] pt-5"
              >
                <h3 className="text-[length:var(--text-lg)] leading-tight">
                  {r.label}
                </h3>
                <p className="mt-3 max-w-[46ch] text-sm text-[color:var(--color-muted)]">
                  {r.body}
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
                  {/* --copper-deep with a --white label = 4.51:1. Raw copper
                      carries no text at any size — R7 rule 2. */}
                  <a
                    href={`${MAILTO_HREF}?subject=${encodeURIComponent(r.subject)}`}
                    className="inline-block rounded-[3px] bg-[color:var(--color-copper-deep)] px-5 py-2.5 text-sm font-medium text-[color:var(--color-white)] transition-opacity hover:opacity-90"
                  >
                    {r.cta}
                  </a>
                  <a
                    href={TEL_HREF}
                    className="measurement text-sm text-[color:var(--color-copper-ink)] underline-offset-4 hover:underline"
                  >
                    or call {COMPANY.phone}
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Offices. Distinct blocks, each with its own verified map destination. */}
      <Section>
        <Container>
          <Eyebrow>Km 2.000 · Offices</Eyebrow>
          <h2 className="max-w-[22ch] text-[length:var(--text-2xl)] text-pretty">
            Where to find us.
          </h2>
          <div className="mt-12 grid gap-10 md:grid-cols-2">
            {OFFICES.map((office, i) => (
              <Reveal
                key={office.label}
                delay={i * 70}
                className="border-t-2 border-[color:var(--color-copper)] pt-5"
              >
                <address className="not-italic">
                  <h3 className="text-[length:var(--text-lg)] leading-tight">
                    {office.label}
                  </h3>
                  <p className="mt-3 max-w-[38ch] text-[color:var(--color-muted)]">
                    {office.address}
                  </p>
                  {office.mapUrl && (
                    <a
                      href={office.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="measurement mt-4 inline-flex items-center gap-1.5 text-sm text-[color:var(--color-copper-ink)] underline-offset-4 hover:underline"
                    >
                      Directions
                      <span className="sr-only"> to the {office.label} office (opens Google Maps in a new tab)</span>
                    </a>
                  )}
                </address>
              </Reveal>
            ))}
          </div>

          {/*
           * The telephone is listed once, for the company, rather than under
           * one address or repeated under both. It was supplied as "office
           * telephone" without being assigned to a desk; its 02762 STD code is
           * Mehsana's, but inferring the rest of that is a guess, and a wrong
           * number under the wrong office is the kind of small error a tender
           * evaluator notices.
           */}
          <p className="mt-12 max-w-[58ch] text-sm text-[color:var(--color-muted)]">
            Both offices are reachable on{" "}
            <a
              href={TEL_HREF}
              className="measurement text-[color:var(--color-copper-ink)] underline-offset-4 hover:underline"
            >
              {COMPANY.phone}
            </a>{" "}
            and at{" "}
            <a
              href={MAILTO_HREF}
              className="break-words text-[color:var(--color-copper-ink)] underline-offset-4 hover:underline"
            >
              {COMPANY.email}
            </a>
            .
          </p>
        </Container>
      </Section>
    </>
  )
}
