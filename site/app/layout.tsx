import type { Metadata } from "next"
import { fontDisplay, fontSans, fontMono } from "@/lib/fonts"

import "./globals.css"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ChainageRail } from "@/components/chainage-rail"

export const metadata: Metadata = {
  metadataBase: new URL("https://nccinfraspace.com"),
  title: {
    default: "NCC Infraspace — Building Gujarat's roads and bridges since 1987",
    template: "%s · NCC Infraspace",
  },
  description:
    "Class AA contractor registered with the Government of Gujarat. Roads, bridges, irrigation and river protection works across Gujarat since 1987.",
  alternates: { canonical: "/" },
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
        <ChainageRail />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  )
}
