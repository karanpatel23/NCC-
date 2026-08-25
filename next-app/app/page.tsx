import { Container, Section, Eyebrow } from "@/components/container"
import { ImageStreamHero } from "@/components/image-stream-hero"
import { COMPANY, CREDENTIALS } from "@/lib/company"

/*
 * Palette per docs/01-requirements-r4.md §1, which deletes --onyx from R3.
 *
 * R4 §2.2 unblocked the corridor by replacing the six-photo gate with
 * deterministic gradients, so the hero is now the real component rather than
 * R3's single-band fallback.
 *
 * R3 §1 caps a page at three dark moments. This page uses exactly three, and
 * they now descend in ONE hue (R4 §1): midnight hero -> indigo credentials
 * strip -> paper body, with the midnight footer closing it.
 */
export default function Page() {
  return (
    <>
      {/*
       * Hero — the image corridor, R4 §2. Now built: R4 §2.2 replaces the
       * six-photo gate with deterministic gradients, so phase D.5 is unblocked.
       *
       * INTERIM. R4 §3 is blunt that this "no longer makes an argument" — a
       * stream of real project work IS the credibility claim, and gradients
       * say nothing about NCC. Swap to photography before launch; see
       * lib/corridor-gradients.ts.
       *
       * Copy sits below the 68% scrim line (justify-end + the hero's own
       * padding). Above it the eyebrow fails AA. See globals.css --hero-scrim.
       */}
      <ImageStreamHero
        cards={9}
        speed={22}
        axis={58}
        className="min-h-[88svh] bg-[color:var(--color-midnight)] pt-28 pb-[clamp(3rem,2rem+4vw,6rem)]"
      >
        <Container>
          <Eyebrow tone="dark">Est. 1987 · Mehsana, Gujarat</Eyebrow>
          <h1 className="max-w-[16ch] text-[length:var(--text-4xl)]">
            {COMPANY.positioning}
          </h1>
          <p className="mt-6 max-w-[52ch] text-[color:var(--color-paper)]/80">
            Class AA contractor registered with the Government of Gujarat.
            Roads, bridges, irrigation and river protection works.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <span className="rounded-[3px] bg-[color:var(--color-brass-light)] px-6 py-3 text-sm font-medium text-[color:var(--color-midnight)]">
              View projects
            </span>
            <span className="rounded-[3px] border border-[color:var(--color-paper)]/40 px-6 py-3 text-sm font-medium">
              Company profile PDF
            </span>
          </div>
        </Container>
      </ImageStreamHero>

      {/*
       * Credentials strip — now --indigo (R4 §1), and now load-bearing.
       * R4 §3.1: with an abstract hero the corridor "no longer makes an
       * argument", so this is the first substantive thing on the page.
       * brass-light numerals are 4.61:1 on indigo. NOTE rule 3: plain --brass
       * here would be 2.67:1 and is prohibited.
       */}
      <div className="on-dark bg-[color:var(--color-indigo)]">
        <Container width="shell">
          <dl className="grid grid-cols-2 divide-[color:var(--color-paper)]/15 md:grid-cols-4 md:divide-x">
            {CREDENTIALS.map((c) => (
              <div key={c.label} className="px-2 py-8 md:px-6">
                <dt className="text-xs tracking-[0.14em] text-[color:var(--color-paper)]/70 uppercase">
                  {c.label}
                </dt>
                {/* brass-light numerals: 4.61:1 on indigo, legal inside .on-dark */}
                <dd className="measurement mt-2 text-[length:var(--text-lg)] text-[color:var(--color-brass-light)]">
                  {c.value}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </div>

      {/* Token proof — swatches carry the role each colour is legal in. */}
      <Section>
        <Container>
          <Eyebrow>Km 1.200 · Design tokens</Eyebrow>
          <h2 className="text-[length:var(--text-2xl)]">Brass &amp; Midnight</h2>
          <p className="mt-4 max-w-[62ch] text-[color:var(--color-muted)]">
            Every published ratio in R3 §1 and R4 §1 was recomputed and matched
            exactly. The three enforcement rules are the load-bearing part:{" "}
            <strong className="text-[color:var(--color-brass-deep)]">
              --brass never carries body text on a light ground
            </strong>{" "}
            (2.99:1),{" "}
            <strong className="text-[color:var(--color-brass-deep)]">
              --brass-light never appears on a light ground at all
            </strong>{" "}
            (1.73:1), and — new in R4 —{" "}
            <strong className="text-[color:var(--color-brass-deep)]">
              --brass never sits on --indigo
            </strong>{" "}
            (2.67:1), which was legal back when the deep band was --onyx.
          </p>

          <ul className="mt-10 grid grid-cols-2 gap-px bg-[color:var(--color-rule)] md:grid-cols-3">
            {[
              { n: "--indigo", h: "#3B498C", r: "7.99:1 · credentials strip" },
              { n: "--midnight", h: "#2A3465", r: "hero, footer" },
              { n: "--rule-strong", h: "#9B9070", r: "3.04:1 — interactive borders" },
              { n: "--brass", h: "#B08D3F", r: "never on indigo — 2.67:1" },
              { n: "--brass-deep", h: "#775C29", r: "6.01:1 — text-safe" },
              { n: "--brass-light", h: "#D9BE7A", r: "on-dark ONLY" },
              { n: "--paper", h: "#FBFAF7", r: "page ground" },
              { n: "--cloud", h: "#F2F0EA", r: "cards, panels" },
              { n: "--sand", h: "#E6E3DA", r: "alternating band" },
            ].map((t) => (
              <li key={t.n} className="bg-[color:var(--color-background)] p-5">
                <span
                  className="block h-14 w-full rounded-[3px] border border-[color:var(--color-rule)]"
                  style={{ backgroundColor: t.h }}
                />
                <p className="measurement mt-3 text-sm">{t.n}</p>
                <p className="measurement text-xs text-[color:var(--color-muted)]">
                  {t.h} · {t.r}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Alternating --sand band, per the R3 §1 surface table. */}
      <Section className="bg-[color:var(--color-sand)]">
        <Container>
          <Eyebrow>Km 2.450 · Card ratio</Eyebrow>
          <h2 className="text-[length:var(--text-2xl)]">18:25 everywhere</h2>
          <p className="mt-4 max-w-[62ch] text-[color:var(--color-muted)]">
            R3 §3.1 propagates the corridor&apos;s card ratio to every project
            image, so the hero&apos;s cards and the index&apos;s cards read as
            the same object at different depths. Corner radius is 3px sitewide.
          </p>
          <ul className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4">
            {["Highways", "Bridges", "Irrigation", "Protection"].map((s) => (
              <li key={s}>
                <div className="aspect-[18/25] rounded-[3px] border border-[color:var(--color-rule)] bg-[color:var(--color-cloud)]" />
                <p className="mt-3 text-sm">{s}</p>
                <p className="measurement text-xs text-[color:var(--color-muted)]">
                  awaiting photography
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  )
}
