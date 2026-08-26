import { Container, Section, Eyebrow } from "@/components/container"
import { ImageStreamHero } from "@/components/image-stream-hero"
import { COMPANY, CREDENTIALS } from "@/lib/company"

/*
 * Palette per docs/01-requirements-r5.md §2, which withdraws Brass & Midnight
 * in full.
 *
 * R5 §6 changes the composition: there is no mid-blue surface in this palette,
 * so the credentials strip is --navy like the hero rather than a separate
 * band, and the two are separated by a --gold hairline instead. Simpler and
 * stronger than inventing a fifth colour.
 *
 * The corridor still carries the hero (R4 §2.2 unblocked it with gradients;
 * R5 §5 replaces the gradient set).
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
        className="min-h-[88svh] bg-[color:var(--color-navy)] pt-28 pb-[clamp(3rem,2rem+4vw,6rem)]"
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
            <span className="rounded-[3px] bg-[color:var(--color-gold)] px-6 py-3 text-sm font-medium text-[color:var(--color-navy)]">
              View projects
            </span>
            <span className="rounded-[3px] border border-[color:var(--color-paper)]/40 px-6 py-3 text-sm font-medium">
              Company profile PDF
            </span>
          </div>
        </Container>
      </ImageStreamHero>

      {/*
       * Credentials strip — R5 §6: --navy, not a separate blue. This palette
       * has no mid-blue surface and inventing one would add a fifth colour, so
       * the strip is separated from the hero by a --gold hairline instead.
       *
       * Still load-bearing: with an abstract hero the corridor "no longer
       * makes an argument" (R4 §3.1), so this is the first substantive thing
       * on the page. Gold numerals are 8.35:1 on navy.
       */}
      <div className="on-dark border-t-2 border-[color:var(--color-gold)] bg-[color:var(--color-navy)]">
        <Container width="shell">
          <dl className="grid grid-cols-2 divide-[color:var(--color-slate)]/28 md:grid-cols-4 md:divide-x">
            {CREDENTIALS.map((c) => (
              <div key={c.label} className="px-2 py-8 md:px-6">
                <dt className="text-xs tracking-[0.14em] text-[color:var(--color-paper)]/70 uppercase">
                  {c.label}
                </dt>
                {/* --gold numerals: 8.35:1 on navy, legal inside .on-dark */}
                <dd className="measurement mt-2 text-[length:var(--text-lg)] text-[color:var(--color-gold)]">
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
          <h2 className="text-[length:var(--text-2xl)]">Four colours, four jobs</h2>
          <p className="mt-4 max-w-[62ch] text-[color:var(--color-muted)]">
            R5 §3 gives each colour exactly one job, because four accents
            competing for the same surfaces looks like a carnival within three
            pages. The one that earns its keep is{" "}
            <strong className="text-[color:var(--color-orange-ink)]">
              orange as status only
            </strong>{" "}
            — ongoing work glows orange, completed work is gold and navy. That
            turns a fourth colour from a decoration problem into an information
            channel, and it is the distinction this site is built around.
          </p>
          <p className="mt-4 max-w-[62ch] text-[color:var(--color-muted)]">
            The rule most likely to be broken:{" "}
            <strong className="text-[color:var(--color-orange-ink)]">
              orange buttons take navy text, never white
            </strong>
            . White on orange is 3.41:1 and fails; navy on orange is 4.61:1.
          </p>

          <ul className="mt-10 grid grid-cols-2 gap-px bg-[color:var(--color-rule)] md:grid-cols-3">
            {[
              { n: "--navy", h: "#112532", r: "surface + body text" },
              { n: "--gold", h: "#F4B044", r: "primary accent · 8.35 on navy" },
              { n: "--orange", h: "#E0680E", r: "STATUS ONLY · 4.61 on navy" },
              { n: "--slate", h: "#88A5B7", r: "structural quiet · 6.08" },
              { n: "--gold-ink", h: "#7A4E05", r: "6.87 on paper — text-safe" },
              { n: "--orange-ink", h: "#8F3B06", r: "7.17 on paper — text-safe" },
              { n: "--slate-ink", h: "#3F6076", r: "6.38 on paper — text-safe" },
              { n: "--paper", h: "#F8FAFB", r: "page ground" },
              { n: "--mist", h: "#E9EEF1", r: "alternating band, cards" },
            ].map((t) => (
              <li key={t.n} className="bg-[color:var(--color-background)] p-5">
                {/* data-swatch: this is the colour being DOCUMENTED, not used.
                    The R5 §3 rule-4 audit skips these, or every token proof
                    reads as an orange-outside-status violation. */}
                <span
                  data-swatch
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

      {/* Alternating --mist band, per the R5 §6 surface table. */}
      <Section className="bg-[color:var(--color-mist)]">
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
                <div className="aspect-[18/25] rounded-[3px] border border-[color:var(--color-rule)] bg-[color:var(--color-mist)]" />
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
