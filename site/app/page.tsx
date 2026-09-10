import { Container, Section, Eyebrow } from "@/components/container"
import { MilestonePortalHero } from "@/components/milestone-portal-hero"
import { COMPANY, CREDENTIALS } from "@/lib/company"

/*
 * FINAL palette — docs/01-requirements-r7.md. Five colours, closed by the
 * owner.
 *
 * The credentials strip stays --navy like the hero, separated by a --copper
 * hairline. Copper as a 2px rule is non-text, so raw copper is legal there
 * (rule 1 only bars it from carrying text).
 *
 * The corridor still carries the hero, with a gradient set rebuilt from the
 * five. Photography swap is still pre-launch.
 */
export default function Page() {
  return (
    <>
      {/*
       * Hero — the MILESTONE glyph portal. Replaces the project reel.
       *
       * Owner's instruction: no photography or video in the hero. That
       * reverses R4 §3, which argued real project work IS the credibility
       * claim — so the credentials are now the content you arrive INSIDE the
       * letter, not a band further down. The evidence still lands first,
       * it just lands through the type instead of under a photograph.
       *
       * The reel and the corridor both still exist as components and can
       * carry other pages.
       */}
      <MilestonePortalHero motto={COMPANY.motto} />

      {/* Token proof — swatches carry the role each colour is legal in. */}
      <Section>
        <Container>
          <Eyebrow>Km 1.200 · Design tokens</Eyebrow>
          <h2 className="text-[length:var(--text-2xl)]">Midnight &amp; Copper</h2>
          <p className="mt-4 max-w-[62ch] text-[color:var(--color-muted)]">
            The backbone is unusually strong — navy on warm white measures{" "}
            <strong className="text-[color:var(--color-ink)]">15.28:1</strong>,
            the highest of any revision. Slate and copper are both mid-tones,
            so neither can carry body text on any ground; the{" "}
            <strong className="text-[color:var(--color-copper-ink)]">-ink</strong>{" "}
            variants exist for that and are the same hues at lower lightness.
          </p>
          <p className="mt-4 max-w-[62ch] text-[color:var(--color-muted)]">
            The rule most likely to be broken:{" "}
            <strong className="text-[color:var(--color-copper-ink)]">
              no text colour passes AA on raw copper
            </strong>{" "}
            — white 3.75, warm white 3.51, navy 4.36. A filled copper button
            uses <code className="measurement">--copper-deep</code> with a warm
            white label, which is 4.51:1.
          </p>

          <ul className="mt-10 grid grid-cols-2 gap-px bg-[color:var(--color-rule)] md:grid-cols-3">
            {[
              { n: "--navy", h: "#18202F", r: "surface + body text · 15.28" },
              { n: "--slate", h: "#68748A", r: "structural · never body text" },
              { n: "--mist", h: "#DCE1E6", r: "alt band · surface only" },
              { n: "--white", h: "#FAF7F2", r: "page ground" },
              { n: "--copper", h: "#B8734F", r: "ACTIVE STATE · non-text" },
              { n: "--copper-deep", h: "#A26241", r: "filled CTA · 4.51 label" },
              { n: "--copper-ink", h: "#8E5639", r: "5.55 on white — text-safe" },
              { n: "--slate-ink", h: "#5A6477", r: "5.58 on white — text-safe" },
              { n: "--rule-strong", h: "#6C8196", r: "3.06 on mist — borders" },
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

      {/* Alternating --mist band. */}
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
