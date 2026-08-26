"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"

import { Container } from "@/components/container"
import { NAV, CONTACT_LINK } from "@/lib/nav"

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [darkHero, setDarkHero] = useState(false)

  /*
   * The transparent treatment (--paper text, --gold logo dot) is only
   * legal when a dark band sits behind the header. R5 §6 gives /contact
   * "--paper, no dark band", where --gold measures 1.80:1 and
   * breaks R5 §3 enforcement rule 1. Pages opt in by marking their hero
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
       * --paper background, --ink text, --navy dot (15.03:1). Transparent
       * means --paper text (15.58:1 on onyx) and --brass-light dot (8.98:1) —
       * legal only because a dark band is behind it.
       */
      data-solid={scrolled || !darkHero || undefined}
      className="fixed inset-x-0 top-0 z-50 h-14 border-b border-transparent text-[color:var(--color-paper)] transition-colors duration-200 [--nav-hover:var(--color-gold)] [--logo-dot:var(--color-gold)] data-[solid]:border-[color:var(--color-border)] data-[solid]:bg-[color:var(--color-background)] data-[solid]:text-[color:var(--color-foreground)] data-[solid]:shadow-[0_1px_2px_rgb(17_37_50/0.06)] data-[solid]:[--nav-hover:var(--color-navy)] data-[solid]:[--logo-dot:var(--color-navy)] md:h-18"
    >
      <Container width="shell" className="flex h-full items-center justify-between gap-6">
        <Link
          href="/"
          className="font-[family-name:var(--font-archivo)] text-lg font-extrabold tracking-tight"
        >
          {/* R5 §7: dot is --gold over the navy hero (8.35:1) and --navy once
              the header solidifies. Gold on light is 1.80:1 — rule 1. */}
          NCC<span className="text-[color:var(--logo-dot)]">.</span>
          <span className="sr-only"> Infraspace — home</span>
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-8 text-sm">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="transition-colors hover:text-[color:var(--nav-hover)]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="hidden rounded-[3px] bg-[color:var(--color-primary)] px-5 py-2.5 text-sm font-medium text-[color:var(--color-on-primary)] transition-opacity hover:opacity-90 md:inline-block"
          >
            Enquire
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
            <ul className="flex flex-col py-2">
              {[...NAV, CONTACT_LINK].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-[color:var(--color-border)] py-4 text-base last:border-0"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </div>
      )}
    </header>
  )
}
