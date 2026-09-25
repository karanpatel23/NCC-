import type { Metadata } from "next"
import Link from "next/link"

import { PageHeader, PAGE_SHELL } from "@/components/page-header"
import { COMPANY, MAILTO_HREF, TEL_HREF } from "@/lib/company"

/*
 * 404.
 *
 * Next's stock page was being served: an unstyled "404 / This page could not
 * be found." carrying the homepage's title and description. On a contractor's
 * site the likeliest way to land here is a stale tender link to a project
 * that has been renamed, so the page routes straight to the project file
 * rather than apologising.
 */
export const metadata: Metadata = {
  title: "Page not found",
  description: "Explore NCC Infraspace projects, expertise and office contact details.",
  alternates: { canonical: null },
  openGraph: { url: null },
  robots: { index: false, follow: true },
}

const LINKS = [
  { href: "/projects", label: "Project files", note: "Every completed contract" },
  { href: "/capabilities", label: "Expertise", note: "What NCC builds" },
  { href: "/about", label: "About NCC", note: "The company since 1987" },
  { href: "/contact", label: "Contact", note: "Office addresses and enquiries" },
]

export default function NotFound() {
  return (
    <div className={`${PAGE_SHELL} pb-[clamp(4rem,2.5rem+6.5vw,8.75rem)]`}>
      <PageHeader
        eyebrow="Page not found"
        title="That page is not here."
        intro="The address may have changed, or a project record may have been renamed. Find the project portfolio, expertise and office contacts below."
      />

      <div className="mt-8 border-t border-[color:var(--color-rule)] pt-8 lg:mt-10 lg:pt-10">
        <ul className="border-t border-[color:var(--color-rule)]">
          {LINKS.map((l) => (
            <li key={l.href} className="border-b border-[color:var(--color-rule)]">
              <Link
                href={l.href}
                className="flex min-h-[44px] flex-wrap items-baseline gap-x-4 gap-y-1 py-4 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color:var(--color-focus)]"
              >
                <span className="font-[family-name:var(--font-archivo)] text-[length:var(--text-lg)] font-semibold text-[color:var(--color-ink)]">
                  {l.label}
                </span>
                <span className="text-[length:var(--text-sm)] text-[color:var(--color-muted)]">
                  {l.note}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-8 max-w-[62ch] text-[length:var(--text-base)] leading-[1.6] text-[color:var(--color-muted)]">
          If you were sent a link to a specific tender or project, the office
          can point you to the right record. Call{" "}
          <a href={TEL_HREF} className="measurement text-[color:var(--color-copper-ink)] underline underline-offset-2 hover:no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-focus)]">
            {COMPANY.phone}
          </a>{" "}
          or email{" "}
          <a href={MAILTO_HREF} className="break-words text-[color:var(--color-copper-ink)] underline underline-offset-2 hover:no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-focus)]">
            {COMPANY.email}
          </a>
          .
        </p>
      </div>
    </div>
  )
}
