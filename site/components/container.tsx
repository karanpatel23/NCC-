import type { ReactNode } from "react"

/*
 * §4.6: shell 1280px, content column 1120px, 24px gutters.
 * Two widths rather than one so full-bleed bands can span the shell while
 * prose stays in the narrower measure.
 */
export function Container({
  children,
  width = "content",
  className = "",
}: {
  children: ReactNode
  width?: "content" | "shell"
  className?: string
}) {
  const max = width === "shell" ? "max-w-[1280px]" : "max-w-[1120px]"
  return (
    <div className={`mx-auto w-full ${max} px-6 ${className}`}>{children}</div>
  )
}

/* §4.6: 96–140px section rhythm on desktop, fluid down to 64px on mobile. */
export function Section({
  children,
  className = "",
  bleed = false,
}: {
  children: ReactNode
  className?: string
  bleed?: boolean
}) {
  return (
    <section
      className={`py-[clamp(4rem,2.5rem+6.5vw,8.75rem)] ${className}`}
      data-bleed={bleed || undefined}
    >
      {children}
    </section>
  )
}

/*
 * Eyebrow label — R2 §3.
 *
 * The treatment is lifted straight off the letterhead: the logo's
 * "INFRASPACE PVT. LTD." line is set in widely letterspaced caps, so making
 * that the sitewide eyebrow is what makes the site and the printed stationery
 * visibly belong to each other. Spec: IBM Plex Sans 500, 11px, 0.18em,
 * uppercase. Final palette: --copper-ink on light, --white/85 on dark.
 *
 * NOTE this is Plex SANS, not Plex Mono — it replaces the mono treatment used
 * in phase A. Mono remains correct for measurements in body content (main
 * brief §4.2); the eyebrow is chrome, not a measurement, even when it happens
 * to carry a chainage value.
 *
 * tone="dark" is --white, NOT copper. --copper-light is only 4.55:1 on pure
 * navy and drops below AA the moment the hero scrim lets any card through, so
 * a copper eyebrow over the corridor fails. Copper stays on the CTA, which is
 * its stated job. On light ground the eyebrow is --copper-ink (5.55:1); raw
 * --copper is 3.51:1 and is barred by rule 1.
 */
export function Eyebrow({
  children,
  tone = "light",
}: {
  children: ReactNode
  tone?: "light" | "dark"
}) {
  const color =
    tone === "dark"
      ? "text-[color:var(--color-white)]/85"
      : "text-[color:var(--color-copper-ink)]"
  return (
    <p
      className={`mb-4 font-[family-name:var(--font-plex-sans)] text-[length:var(--text-caption)] font-medium tracking-[0.18em] uppercase ${color}`}
    >
      {children}
    </p>
  )
}
