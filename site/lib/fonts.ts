import localFont from "next/font/local"

// These are the Latin WOFF2 files emitted by the previous successful
// next/font/google build. Keeping the same faces locally makes a clean build
// independent of Google Fonts without changing the site's typography.
export const fontDisplay = localFont({
  src: "../fonts/archivo-latin-variable.woff2",
  variable: "--font-archivo",
  weight: "100 900",
  style: "normal",
  display: "swap",
})

export const fontSans = localFont({
  src: "../fonts/ibm-plex-sans-latin-variable.woff2",
  variable: "--font-plex-sans",
  weight: "400 500",
  style: "normal",
  display: "swap",
})

export const fontMono = localFont({
  src: "../fonts/ibm-plex-mono-latin-500.woff2",
  variable: "--font-plex-mono",
  weight: "500",
  style: "normal",
  display: "swap",
})

// GlyphPortal passes the primary family to document.fonts.check(). The
// generated fallback is not a webfont and must not be counted as one.
export const DISPLAY_FAMILY = fontDisplay.style.fontFamily.split(",")[0].trim()
