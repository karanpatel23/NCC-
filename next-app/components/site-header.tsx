"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"

import { Container } from "@/components/container"
import { NAV, CONTACT_LINK } from "@/lib/nav"

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

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
      data-scrolled={scrolled || undefined}
      /*
       * §6.1: transparent over the hero, solidifying to --chalk past 80px.
       * The hero is --bitumen, so in the transparent state the header sits on a
       * dark surface and its text must be --chalk (17.41:1). Once solidified the
       * surface is light, so text flips back to --foreground. Without the flip
       * the logo and nav render dark-on-dark and disappear entirely.
       */
      className="fixed inset-x-0 top-0 z-50 h-14 border-b border-transparent text-[color:var(--color-chalk)] transition-colors duration-200 [--nav-hover:var(--color-retro)] [--logo-dot:var(--color-retro)] data-[scrolled]:border-[color:var(--color-border)] data-[scrolled]:bg-[color:var(--color-background)] data-[scrolled]:text-[color:var(--color-foreground)] data-[scrolled]:shadow-[0_1px_2px_rgb(16_19_21/0.06)] data-[scrolled]:[--nav-hover:var(--color-primary)] data-[scrolled]:[--logo-dot:var(--color-primary)] md:h-18"
    >
      <Container width="shell" className="flex h-full items-center justify-between gap-6">
        <Link
          href="/"
          className="font-[family-name:var(--font-archivo)] text-lg font-extrabold tracking-tight"
        >
          {/* Dot flips with the header surface: --signboard is only 2.35:1 on
              --bitumen, so over the hero it uses --retro (11.44:1) instead. */}
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
            className="hidden rounded-[2px] bg-[color:var(--color-primary)] px-5 py-2.5 text-sm font-medium text-[color:var(--color-on-primary)] transition-opacity hover:opacity-90 md:inline-block"
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
