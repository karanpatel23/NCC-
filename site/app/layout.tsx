import type { Metadata } from "next"
import { fontDisplay, fontSans, fontMono } from "@/lib/fonts"
import { COMPANY, OFFICES } from "@/lib/company"

import "./globals.css"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ChainageRail } from "@/components/chainage-rail"

export const metadata: Metadata = {
  metadataBase: new URL("https://nccinfraspace.com"),
  title: {
    /* R9: the phrase R9 names is gone from the landing page's title too.
     * The meta description below KEEPS its geography — that is project fact
     * and search signal, not positioning, and R9 preserves both. */
    default: "NCC Infraspace, road and bridge contractors since 1987",
    template: "%s · NCC Infraspace",
  },
  description:
    "NCC Infraspace builds roads, bridges, irrigation and water infrastructure across India. Explore the company and its completed projects.",

  /*
   * Open Graph and Twitter cards. Previously absent on every page, so a link
   * shared to WhatsApp or LinkedIn rendered as a bare URL. Per-page metadata
   * inherits and overrides title and description automatically; only the
   * shared defaults live here.
   *
   * The card image is the site's own logo lockup on the brand navy. There is
   * no photograph that represents all 57 projects, and picking one would be
   * an editorial claim about which job matters most.
   */
  openGraph: {
    type: "website",
    siteName: "NCC Infraspace",
    locale: "en_IN",

    title: "NCC Infraspace, road and bridge contractors since 1987",
    description:
      "NCC Infraspace builds roads, bridges, irrigation and water infrastructure across India. Explore the company and its completed projects.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "NCC Infraspace" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "NCC Infraspace, road and bridge contractors since 1987",
    description:
      "NCC Infraspace builds roads, bridges, irrigation and water infrastructure across India. Explore the company and its completed projects.",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    /*
     * R2 §1: dark mode is REMOVED, not defaulted to light. next-themes, the
     * ThemeProvider and the theme toggle are all deleted, and with them the
     * `suppressHydrationWarning` that only existed to cover next-themes'
     * pre-hydration class write.
     *
     * The site still has DARK BANDS — the navy hero, credentials strip
     * and footer. That is a
     * SURFACE, not a theme. Foregrounds flip via `.on-dark` scoped to those
     * sections. R2 is explicit that surface-scoped rather than theme-scoped is
     * what prevents the phase-A bug where dark text rendered on a dark hero.
     */
    <html
      lang="en"
      className={`${fontDisplay.variable} ${fontSans.variable} ${fontMono.variable}`}
    >
      <body className="flex min-h-dvh flex-col">
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({"@context":"https://schema.org","@type":"Organization",name:COMPANY.legalName,url:"https://nccinfraspace.com",email:COMPANY.email,telephone:COMPANY.phone,foundingDate:String(COMPANY.foundedYear),address:OFFICES.map(o=>({"@type":"PostalAddress",streetAddress:o.address,addressCountry:"IN"}))}).replace(/</g,"\\u003c")}} />
        <ChainageRail />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  )
}
