import { Archivo, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google"

/*
 * Fonts live here rather than inline in layout.tsx because GlyphPortal needs
 * the RESOLVED family name, not the CSS variable.
 *
 * The portal calls document.fonts.check() to decide whether the requested face
 * is actually loaded, and freezes its choice for the mount — a late font swap
 * would move the ink out from under the camera mid-flight. `var(--font-archivo)`
 * is meaningless to that API; `fontDisplay.style.fontFamily` is the real
 * next/font family name and resolves correctly.
 *
 * §9: still self-hosted, still no runtime request to fonts.googleapis.com.
 */
export const fontDisplay = Archivo({
  subsets: ["latin"],
  axes: ["wdth"], // width axis; requires the variable font, so no `weight` here
  variable: "--font-archivo",
  display: "swap",
})

export const fontSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-sans",
  display: "swap",
})

export const fontMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-plex-mono",
  display: "swap",
})

/**
 * PRIMARY family name only, for canvas measurement and document.fonts.check().
 *
 * next/font returns a pair — `Archivo, "Archivo Fallback"` — where the second
 * is a locally-generated metric-adjusted fallback that never loads as a
 * webfont and so reports `unloaded` to the Font Loading API.
 *
 * GlyphPortal decides whether to animate with
 *   stalled = available.length < families.length
 * so handing it the pair makes it count 1 of 2 available, conclude the face is
 * still pending, and freeze the mount static — the whole scroll effect silently
 * turns off. Splitting to the primary alone makes that check pass honestly:
 * Archivo really is loaded, and the component's own fallback stack still
 * applies if it ever is not.
 */
export const DISPLAY_FAMILY = fontDisplay.style.fontFamily.split(",")[0].trim()
