"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useId, useRef, useState } from "react"
import { ChevronDown, Menu, X } from "lucide-react"

import { BrandLockup } from "@/components/brand-lockup"
import { Container } from "@/components/container"
import { PUBLISHED_NAV, CONTACT_LINK, type NavItem } from "@/lib/nav"

/*
 * "Company" is a disclosure, so it is a real <button> with aria-expanded and
 * aria-controls — never a hover-only menu. Hover alone is unreachable by
 * keyboard, unusable on touch, and hostile to anyone whose pointer wanders.
 *
 * Behaviour: click or Enter/Space opens; Escape closes AND returns focus to
 * the trigger; a click outside closes; choosing a destination closes. The
 * trigger is marked current while any of its children is the current page,
 * so the group shows where you are even while collapsed.
 */
function CompanyMenu({
  item,
  isCurrent,
}: {
  item: NavItem
  isCurrent: (href: string) => boolean
}) {
  const [open, setOpen] = useState(false)
  const wrap = useRef<HTMLDivElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)
  const menuId = `${useId()}-company-menu`
  const childCurrent = (item.children ?? []).some((c) => isCurrent(c.href))

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return
      setOpen(false)
      /* Focus must come back to the control the user opened, or it lands on
       * <body> and the next Tab restarts from the top of the document. */
      trigger.current?.focus()
    }
    const onPointer = (e: PointerEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("keydown", onKey)
    document.addEventListener("pointerdown", onPointer)
    return () => {
      document.removeEventListener("keydown", onKey)
      document.removeEventListener("pointerdown", onPointer)
    }
  }, [open])

  return (
    <div ref={wrap} className="relative">
      <button
        ref={trigger}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={menuId}
        aria-current={childCurrent ? "true" : undefined}
        className={`flex min-h-[44px] items-center gap-1 transition-colors hover:text-[color:var(--nav-hover)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--nav-hover)] ${
          childCurrent ? "text-[color:var(--nav-hover)]" : ""
        }`}
      >
        {item.label}
        <ChevronDown
          size={15}
          aria-hidden
          className={`transition-transform duration-150 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <ul
        id={menuId}
        hidden={!open}
        className="absolute top-full left-0 z-10 mt-2 min-w-[12rem] border border-[color:var(--color-border)] bg-[color:var(--color-background)] py-1 text-[color:var(--color-foreground)] shadow-[0_4px_16px_rgb(24_32_47/0.10)]"
      >
        {(item.children ?? []).map((c) => (
          <li key={c.href}>
            <Link
              href={c.href}
              onClick={() => setOpen(false)}
              aria-current={isCurrent(c.href) ? "page" : undefined}
              className="block px-4 py-2.5 text-sm hover:bg-[color:var(--color-mist)] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color:var(--color-focus)] aria-[current=page]:text-[color:var(--color-copper-ink)]"
            >
              {c.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function SiteHeader() {
  const pathname = usePathname()
  /* A section is current when you are on it OR inside it, so /projects/<slug>
   * still marks Projects. "/" is exact — every path starts with it. */
  const isCurrent = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/")

  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [darkHero, setDarkHero] = useState(false)

  /*
   * The transparent treatment (--paper text, --copper-light logo dot) is only
   * legal when a dark band sits behind the header. the page table gives /contact
   * "--white, no dark band", where --copper-light measures 1.86:1 and
   * breaks enforcement rule 1. Pages opt in by marking their hero
   * [data-dark-hero]; every other page gets the solid treatment immediately.
   */
  useEffect(() => {
    setDarkHero(!!document.querySelector("[data-dark-hero]"))
  }, [])

  /*
   * §6.1: transparent over the hero, solidifies past 80px.
   * passive listener — this fires on every scroll frame and must not block it.
   */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  /* Close the mobile sheet on Escape — keyboard parity with the close button. */
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [open])

  return (
    <header
      /*
       * data-solid is the single switch. It is set when the user has scrolled
       * past 80px OR when the page has no dark hero to sit on. Solid means
       * --paper background, --ink text, --copper-ink dot (5.55:1). Transparent
       * means --paper text (15.58:1 on onyx) and --brass-light dot (8.98:1) —
       * legal only because a dark band is behind it.
       */
      data-solid={scrolled || !darkHero || undefined}
      className="fixed inset-x-0 top-0 z-50 h-14 border-b border-transparent text-[color:var(--color-white)] transition-colors duration-150 [--nav-hover:var(--color-copper-light)] data-[solid]:border-[color:var(--color-border)] data-[solid]:bg-[color:var(--color-background)] data-[solid]:text-[color:var(--color-foreground)] data-[solid]:shadow-[0_1px_2px_rgb(24_32_47/0.06)] data-[solid]:[--nav-hover:var(--color-copper-ink)] md:h-18"
    >
      {/*
       * gap-8 rather than gap-6: R2 §4 puts the lockup's clear space at the
       * height of the "N", 60.1% of the artwork = 26px beside the 44px desktop
       * mark. 32px keeps the nav outside that exclusion zone at the tightest
       * point. --logo-dot is gone with the text mark that used it.
       */}
      <Container width="shell" className="flex h-full items-center justify-between gap-6 lg:gap-8">
        {/* R9: no plate, no badge, no backing. The lockup takes currentColor,
            so it flips with the header's own text colour on [data-solid] —
            pure white over the dark hero, navy once solid. */}
        {/*
         * The link carries the accessible name and the lockup is marked
         * decorative, so the company is announced ONCE rather than by both
         * the link and the image inside it.
         *
         * min-h/min-w 44px is the touch target, not the artwork: the mark is
         * 40px tall on mobile, and a 40px tap target is under the 44×44 floor.
         * The padding is negative-margined back out so the taller hit area
         * does not push the lockup off the header's optical baseline.
         */}
        <Link
          href="/"
          /* WCAG 2.5.3 Label in Name: the accessible name must contain the
             * visible text, which reads "INFRASPACE PVT. LTD.". The spelled-out
             * legal name still appears in the footer, on /about and in
             * COMPANY.legalName. */
          aria-label="NCC Infraspace Pvt. Ltd., home"
          className="-mx-2 flex min-h-[44px] min-w-[44px] shrink-0 items-center px-2"
        >
          <BrandLockup size="header" priority decorative />
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-6 text-sm lg:gap-8">
            {PUBLISHED_NAV.map((item) =>
              item.children ? (
                <li key={item.label}>
                  <CompanyMenu item={item} isCurrent={isCurrent} />
                </li>
              ) : (
                <li key={item.href}>
                  <Link
                    href={item.href!}
                    aria-current={isCurrent(item.href!) ? "page" : undefined}
                    className="flex min-h-[44px] items-center transition-colors hover:text-[color:var(--nav-hover)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--nav-hover)] aria-[current=page]:text-[color:var(--nav-hover)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          {/* R19: the primary navigation button is Contact, and it is the
            * fifth approved nav item rather than a separate CTA with its own
            * wording. Same destination as before. */}
          <Link
            href={CONTACT_LINK.href}
            aria-current={isCurrent(CONTACT_LINK.href) ? "page" : undefined}
            className="hidden min-h-[44px] items-center rounded-[3px] bg-[color:var(--color-primary)] px-5 text-sm font-medium text-[color:var(--color-on-primary)] transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-focus)] md:inline-flex"
          >
            {CONTACT_LINK.label}
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="md:hidden"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </Container>

      {open && (
        <div
          id="mobile-nav"
          className="border-t border-[color:var(--color-border)] bg-[color:var(--color-background)] md:hidden"
        >
          <Container>
            {/* The sheet has room to list the group open rather than nesting
              * a second disclosure inside a disclosure. */}
            <ul className="flex flex-col py-2">
              {PUBLISHED_NAV.map((item) =>
                item.children ? (
                  <li key={item.label}>
                    <p className="border-b border-[color:var(--color-border)] pt-4 pb-2 font-[family-name:var(--font-plex-sans)] text-[length:var(--text-caption)] font-medium tracking-[0.16em] text-[color:var(--color-muted)] uppercase">
                      {item.label}
                    </p>
                    <ul>
                      {item.children.map((c) => (
                        <li key={c.href}>
                          <Link
                            href={c.href}
                            onClick={() => setOpen(false)}
                            aria-current={isCurrent(c.href) ? "page" : undefined}
                            className="block border-b border-[color:var(--color-border)] py-4 text-base aria-[current=page]:text-[color:var(--color-copper-ink)]"
                          >
                            {c.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ) : (
                  <li key={item.href}>
                    <Link
                      href={item.href!}
                      onClick={() => setOpen(false)}
                      aria-current={isCurrent(item.href!) ? "page" : undefined}
                      className="block border-b border-[color:var(--color-border)] py-4 text-base aria-[current=page]:text-[color:var(--color-copper-ink)]"
                    >
                      {item.label}
                    </Link>
                  </li>
                ),
              )}
              <li>
                <Link
                  href={CONTACT_LINK.href}
                  onClick={() => setOpen(false)}
                  aria-current={isCurrent(CONTACT_LINK.href) ? "page" : undefined}
                  className="block py-4 text-base aria-[current=page]:text-[color:var(--color-copper-ink)]"
                >
                  {CONTACT_LINK.label}
                </Link>
              </li>
            </ul>
          </Container>
        </div>
      )}
    </header>
  )
}
