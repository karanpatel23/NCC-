/*
 * Primary navigation — the owner-approved R19 structure.
 *
 *   Projects · Expertise · Company ▾ · CSR · Contact
 *
 * Lives in lib/ rather than in site-header.tsx because SiteFooter is a server
 * component: a plain constant exported from a "use client" module does not
 * survive the server/client boundary, and the build fails at prerender with
 * "NAV is not iterable". Shared data gets its own module so both sides import
 * it directly.
 *
 * ---------------------------------------------------------------------------
 * THE STRUCTURE IS APPROVED. THE DESTINATIONS ARE NOT ALL BUILT.
 *
 * Every entry carries `published`. The header and footer render only the
 * published ones, so the approved shape is recorded here in full while no
 * visitor is ever handed a link to a 404 or to a page padded out with copy
 * nobody has signed off.
 *
 * Held back, with what each one needs, in docs/01-requirements-r19.md §3:
 *
 *   /credentials  STILL HELD, but for a different and far narrower reason
 *                 than before. The owner has now granted permission to
 *                 DISPLAY the Class AA certificate — and the certificate does
 *                 not exist. pack/00-FINDINGS.md §8 lists it under "what is
 *                 still unavailable", and the only archive file with
 *                 "certificate" in its name is a 1080x1080 decorative icon.
 *                 The same approval explicitly did NOT confirm the
 *                 registration number, the validity, the FY24 turnover or the
 *                 Crisil rating, so the standing R8 flag in lib/company.ts
 *                 still bars the two financial claims from new copy.
 *                 Needs: the certificate file, plus its registration number
 *                 and validity. Permission is no longer the blocker; the
 *                 document is. See docs/01-requirements-r20.md §2.
 *
 * "Expertise" is a LABEL change only. The route stays /capabilities — a
 * visitor-facing word is not a reason to break a URL.
 * ---------------------------------------------------------------------------
 */

export type NavChild = {
  href: string
  label: string
  published: boolean
}

export type NavItem = {
  href?: string
  label: string
  published: boolean
  children?: readonly NavChild[]
}

export const NAV: readonly NavItem[] = [
  { href: "/projects", label: "Projects", published: true },
  { href: "/capabilities", label: "Expertise", published: true },
  {
    /* A disclosure button, not a destination. There is no /company page and
     * none is planned — the label groups the three company destinations. */
    label: "Company",
    published: true,
    children: [
      { href: "/about", label: "About NCC", published: true },
      { href: "/clients", label: "Clients", published: true },
      { href: "/credentials", label: "Credentials", published: false },
      { href: "/careers", label: "Careers", published: true },
    ],
  },
  { href: "/csr", label: "CSR", published: true },
] as const

/* Contact sits outside NAV because the header renders it as the primary
 * button rather than as a nav link, while the footer lists it inline. */
export const CONTACT_LINK = { href: "/contact", label: "Contact" } as const

/** What the header and footer actually render. */
export const PUBLISHED_NAV: readonly NavItem[] = NAV.filter(
  (i) => i.published,
).map((i) =>
  i.children
    ? { ...i, children: i.children.filter((c) => c.published) }
    : i,
)

/** Flat list of every live destination, for the footer and for tests. */
export const PUBLISHED_LINKS: ReadonlyArray<{ href: string; label: string }> =
  PUBLISHED_NAV.flatMap((i) =>
    i.children
      ? i.children.map((c) => ({ href: c.href, label: c.label }))
      : i.href
        ? [{ href: i.href, label: i.label }]
        : [],
  )
