import { Container, Section, Eyebrow } from "@/components/container"
import { COMPANY, CREDENTIALS } from "@/lib/company"

/*
 * PHASE A GATE: "Tokens render correctly at all three breakpoints."
 * Palette per docs/01-requirements-r3.md §1 "Brass & Midnight".
 *
 * The image corridor (R3 §2) is NOT built here, deliberately. R3 §4 places it
 * at the new phase D.5, and R3 §2.3 is explicit: with fewer than six usable
 * project photographs the corridor does not ship at all — a half-empty
 * corridor repeating three images looks worse than none. Zero project photos
 * exist (R3 §5 lists 6-12 verticals as a hard build dependency), so the hero
 * below is the specified fallback: a single --onyx band carrying the same
 * scrim structure and the same copy, ready for the corridor to slot behind it.
 *
 * R3 §1 caps a page at three dark moments. This page uses exactly three:
 * hero (onyx), credentials strip (midnight), footer (onyx).
 */
export default function Page() {
  return (
    <>
      {/*
       * Hero. The scrim is R3 §2's exact two-stop wash. Content is anchored to
       * the LOWER band (justify-end) rather than centred, because at the 55%
       * top stop --paper text measures 3.58:1 over a blown-out sky and the
       * --brass-light eyebrow only 2.06:1. Below the 62% stop they are 8.73:1
       * and 5.03:1. Keeping the gradient and moving the copy preserves the
       * corridor's visibility, which darkening the top stop would destroy.
       */}
      <section
        data-dark-hero
        className="on-dark relative flex min-h-[88svh] flex-col justify-end bg-[color:var(--color-onyx)] pt-28 pb-[clamp(3rem,2rem+4vw,6rem)]"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: "var(--hero-scrim)" }}
        />
        <Container className="relative">
          <Eyebrow tone="dark">Est. 1987 · Mehsana, Gujarat</Eyebrow>
          <h1 className="max-w-[16ch] text-[length:var(--text-4xl)]">
            {COMPANY.positioning}
          </h1>
          <p className="mt-6 max-w-[52ch] text-[color:var(--color-paper)]/80">
            Class AA contractor registered with the Government of Gujarat.
            Roads, bridges, irrigation and river protection works.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <span className="rounded-[3px] bg-[color:var(--color-brass-light)] px-6 py-3 text-sm font-medium text-[color:var(--color-onyx)]">
              View projects
            </span>
            <span className="rounded-[3px] border border-[color:var(--color-paper)]/40 px-6 py-3 text-sm font-medium">
              Company profile PDF
            </span>
          </div>
        </Container>
      </section>

      {/* Dark moment 2 of 3 — credentials strip on --midnight, per R3 §1. */}
      <div className="on-dark bg-[color:var(--color-midnight)]">
        <Container width="shell">
          <dl className="grid grid-cols-2 divide-[color:var(--color-paper)]/15 md:grid-cols-4 md:divide-x">
            {CREDENTIALS.map((c) => (
              <div key={c.label} className="px-2 py-8 md:px-6">
                <dt className="text-xs tracking-[0.14em] text-[color:var(--color-paper)]/70 uppercase">
                  {c.label}
                </dt>
                {/* brass-light numerals: 6.52:1 on midnight, legal inside .on-dark */}
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
            All 22 ratios in the R3 §1 table were recomputed and match exactly.
            The two enforcement rules are the load-bearing part:{" "}
            <strong className="text-[color:var(--color-brass-deep)]">
              --brass never carries body text on a light ground
            </strong>{" "}
            (2.99:1), and{" "}
            <strong className="text-[color:var(--color-brass-deep)]">
              --brass-light never appears on a light ground at all
            </strong>{" "}
            (1.73:1).
          </p>

          <ul className="mt-10 grid grid-cols-2 gap-px bg-[color:var(--color-rule)] md:grid-cols-3">
            {[
              { n: "--indigo", h: "#3B498C", r: "7.99:1 on paper" },
              { n: "--midnight", h: "#2A3465", r: "band only" },
              { n: "--onyx", h: "#22201C", r: "hero, footer" },
              { n: "--brass", h: "#B08D3F", r: "marks · never body text" },
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
