import Link from "next/link"

import { Container } from "@/components/container"
import { NAV, CONTACT_LINK } from "@/lib/nav"
import { COMPANY, OFFICES } from "@/lib/company"

/*
 * §6.1 item 11: four columns, both offices, CIN, dynamic copyright year.
 *
 * Contact fields deliberately render conditionally. §2 records that the
 * competitor ships "+1 (859) 254-6589" and "info@example.com" on a Gujarat
 * contractor's site because a template default was never replaced. §7's rule
 * is that an incomplete field renders nothing rather than a placeholder, so
 * every optional value here is guarded.
 */
export function SiteFooter() {
  return (
    <footer className="mt-auto on-dark bg-[color:var(--color-navy)]">
      <Container width="shell" className="py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-[family-name:var(--font-archivo)] text-lg font-extrabold">
              NCC<span className="text-[color:var(--color-copper-light)]">.</span>
            </p>
            <p className="mt-3 max-w-[28ch] text-sm text-[color:var(--color-white)]/65">
              {COMPANY.positioning}
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className="measurement text-xs tracking-[0.14em] text-[color:var(--color-copper-light)] uppercase">
              Site
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[...NAV, CONTACT_LINK].map((item) => (
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

          {OFFICES.map((office) => (
            <address key={office.label} className="text-sm not-italic">
              <h2 className="measurement text-xs tracking-[0.14em] text-[color:var(--color-copper-light)] uppercase">
                {office.label}
              </h2>
              <p className="mt-4 text-[color:var(--color-white)]/65">
                {office.address}
              </p>
              {office.phone && (
                <a
                  className="measurement mt-2 block transition-colors hover:text-[color:var(--color-copper-light)]"
                  href={`tel:${office.phone.replace(/\s/g, "")}`}
                >
                  {office.phone}
                </a>
              )}
              {office.email && (
                <a
                  className="mt-1 block transition-colors hover:text-[color:var(--color-copper-light)]"
                  href={`mailto:${office.email}`}
                >
                  {office.email}
                </a>
              )}
            </address>
          ))}
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
