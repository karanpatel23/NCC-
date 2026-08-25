import type { Metadata } from "next"
import { Archivo, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

/*
 * §9: fonts self-hosted via next/font. These are build-time downloads emitted
 * from our own origin, not a runtime request to fonts.googleapis.com — which
 * also removes the render-blocking font stylesheet the current live site loads.
 *
 * §4.2: Archivo is variable across weight AND width, so the expanded display
 * width is a font-variation-setting rather than a second font file.
 */
const fontDisplay = Archivo({
  subsets: ["latin"],
  axes: ["wdth"], // width axis; requires the variable font, so no `weight` here
  variable: "--font-archivo",
  display: "swap",
})

const fontSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-sans",
  display: "swap",
})

const fontMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-plex-mono",
  display: "swap",
})

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
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fontDisplay.variable} ${fontSans.variable} ${fontMono.variable}`}
    >
      <body className="flex min-h-dvh flex-col">
        <ThemeProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  )
}
