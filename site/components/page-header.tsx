import type { ReactNode } from "react"

/*
 * The page header, used by every content page.
 *
 * There used to be two of these. /about and /contact opened with a navy band
 * and a "Km 0.000 ·" eyebrow; /projects, /capabilities, /careers, /csr and the
 * project detail template opened white with a plain eyebrow. Same role, two
 * treatments, and the chainage prefix appeared on two pages out of eight. One
 * component now, so a page cannot invent a third.
 *
 * The shell is repeated rather than imported from <Container> because this
 * family of pages carries its own padding scale, 40 / 28 / 20 / 16, against
 * Container's fixed 24px.
 */

export const PAGE_SHELL =
  "mx-auto w-full max-w-[1120px] px-4 min-[360px]:px-5 md:px-7 lg:px-10"

export function PageHeader({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string
  title: ReactNode
  intro?: ReactNode
  children?: ReactNode
}) {
  return (
    /* Clears the fixed header, h-14 on mobile and h-18 from md, with room
     * above the eyebrow rather than the heading sitting under the bar. */
    <div className="pt-[calc(3.5rem+2.5rem)] md:pt-[calc(4.5rem+3.5rem)]">
      <p className="font-[family-name:var(--font-plex-sans)] text-[length:var(--text-caption)] font-medium tracking-[0.18em] text-[color:var(--color-copper-ink)] uppercase">
        {eyebrow}
      </p>
      <h1 className="mt-3 max-w-[20ch] font-[family-name:var(--font-archivo)] text-[length:var(--text-display)] leading-[1.02] font-semibold tracking-[-0.02em] text-pretty break-words text-[color:var(--color-ink)] md:max-w-[24ch]">
        {title}
      </h1>
      {intro && (
        <p className="mt-4 max-w-[62ch] text-[length:var(--text-base)] leading-[1.6] text-pretty text-[color:var(--color-muted)]">
          {intro}
        </p>
      )}
      {children}
    </div>
  )
}
