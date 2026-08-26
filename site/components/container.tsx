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
 * uppercase, --brass-deep.
 *
 * NOTE this is Plex SANS, not Plex Mono — it replaces the mono treatment used
 * in phase A. Mono remains correct for measurements in body content (main
 * brief §4.2); the eyebrow is chrome, not a measurement, even when it happens
 * to carry a chainage value.
 *
 * tone="dark" switches to --brass-light, legal ONLY on a dark ground (1.73:1
 * on paper vs 6.52:1 on midnight — enforcement rule 2). On light ground the
 * eyebrow uses --brass-deep at 6.01:1, never --brass itself, which is 2.99:1.
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
      ? "text-[color:var(--color-brass-light)]"
      : "text-[color:var(--color-brass-deep)]"
  return (
    <p
      className={`mb-4 font-[family-name:var(--font-plex-sans)] text-[11px] font-medium tracking-[0.18em] uppercase ${color}`}
    >
      {children}
    </p>
  )
}
