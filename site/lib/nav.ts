/*
 * Primary navigation, per the §5 sitemap.
 *
 * Lives in lib/ rather than in site-header.tsx because SiteFooter is a server
 * component: a plain constant exported from a "use client" module does not
 * survive the server/client boundary, and the build fails at prerender with
 * "NAV is not iterable". Shared data gets its own module so both sides import
 * it directly.
 */
export const NAV = [
  { href: "/projects", label: "Projects" },
  { href: "/capabilities", label: "Capabilities" },
  { href: "/about", label: "About" },
  { href: "/credentials", label: "Credentials" },
  { href: "/careers", label: "Careers" },
] as const

/* Contact sits outside NAV because the header renders it as the Enquire CTA
 * rather than as a nav link, while the footer lists it inline. */
export const CONTACT_LINK = { href: "/contact", label: "Contact" } as const
