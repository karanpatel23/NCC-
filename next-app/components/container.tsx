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
 * Eyebrow label. §4.2 permits all-caps only here and in the chainage rail.
 * Set in mono because these read as document references, not prose.
 */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="measurement mb-4 text-[color:var(--color-primary)] text-xs tracking-[0.14em] uppercase">
      {children}
    </p>
  )
}
