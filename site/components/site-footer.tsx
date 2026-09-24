import Link from "next/link"

import { BrandLockup } from "@/components/brand-lockup"
import { Container } from "@/components/container"
import { PUBLISHED_LINKS, CONTACT_LINK } from "@/lib/nav"
import { COMPANY, OFFICES, TEL_HREF, MAILTO_HREF } from "@/lib/company"

/*
 * §6.1 item 11: four columns, both offices, CIN, dynamic copyright year.
 *
 * R8 closed §11 item 4, so the phone and email are real and no longer
 * conditional. They are company-level rather than per-office, matching how
 * they were supplied — see the note in lib/company.ts. Everything else here
 * still guards, because §7's rule holds for every field that is still open.
 */
export function SiteFooter() {
  return (
    <footer data-rail-quiet className="mt-auto on-dark bg-[color:var(--color-navy)]">
      <Container width="shell" className="py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            {/* Sits directly on the navy — no plate. The wordmark is
                currentColor, which .on-dark sets to pure white (16.32:1).
                Not decorative here: nothing else names the company in this
                column, so the lockup keeps its own role="img" label. */}
            <BrandLockup size="footer" />
            <p className="mt-5 max-w-[28ch] text-sm text-[color:var(--color-white)]/65">
              {COMPANY.positioning}
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className="measurement text-xs tracking-[0.14em] text-[color:var(--color-copper-light)] uppercase">
              Site
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[...PUBLISHED_LINKS, CONTACT_LINK].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[color:var(--color-white)]/80 transition-colors hover:text-[color:var(--color-copper-light)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="measurement text-xs tracking-[0.14em] text-[color:var(--color-copper-light)] uppercase">
              Offices
            </h2>
            <div className="mt-4 space-y-5">
              {OFFICES.map((office) => (
                <address key={office.label} className="text-sm not-italic">
                  <p className="text-[color:var(--color-white)]">
                    {office.label}
                  </p>
                  <p className="mt-1 text-[color:var(--color-white)]/65">
                    {office.address}
                  </p>
                </address>
              ))}
            </div>
          </div>

          <div>
            <h2 className="measurement text-xs tracking-[0.14em] text-[color:var(--color-copper-light)] uppercase">
              Contact
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a
                  className="measurement transition-colors hover:text-[color:var(--color-copper-light)]"
                  href={TEL_HREF}
                >
                  {COMPANY.phone}
                </a>
              </li>
              <li>
                <a
                  className="break-words transition-colors hover:text-[color:var(--color-copper-light)]"
                  href={MAILTO_HREF}
                >
                  {COMPANY.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-[color:var(--color-white)]/65 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {COMPANY.legalName}. All rights reserved.
          </p>
          <p className="measurement">CIN {COMPANY.cin}</p>
        </div>
      </Container>
    </footer>
  )
}
