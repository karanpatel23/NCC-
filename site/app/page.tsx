import { Container, Section, Eyebrow } from "@/components/container"
import { ProjectReelHero, type ReelProject } from "@/components/project-reel-hero"
import { COMPANY, CREDENTIALS } from "@/lib/company"
import { loadProjects } from "@/lib/content/load"

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
  /*
   * Real project records drive the reel. loadProjects() throws on invalid
   * content by design (R6 §3), so this is also the point where the homepage
   * starts depending on the schema — a malformed project now fails the build
   * rather than only failing content:check.
   */
  const reel: ReelProject[] = loadProjects().map((p) => ({
    slug: p.slug,
    title: p.title,
    client: p.client,
    valueCr: p.contractValueCr,
    chainage: p.chainageFrom && p.chainageTo ? `${p.chainageFrom}–${p.chainageTo}` : undefined,
    district: p.district,
  }))

  return (
    <>
      {/*
       * Hero — the project reel. Adapted from the 21st.dev
       * scroll-locked-video-hero; see components/project-reel-hero.tsx for
       * what was kept and what was stripped, and why.
       *
       * Fed from content/, so the reel shows real projects with real client
       * names and real contract values. Falls back to no reel if none
       * validate, rather than inventing rows.
       *
       * The corridor (R3 §2 / R4 §2) is superseded here as the homepage hero.
       * It still exists in components/image-stream-hero.tsx and can carry a
       * different page.
       */}
      <ProjectReelHero
        motto={COMPANY.motto}
        strapline="Class AA contractor registered with the Government of Gujarat. Roads, bridges, irrigation and river protection works since 1987."
        projects={reel}
      />

      {/*
       * Credentials strip — --navy like the hero, separated by a --copper
       * hairline. Copper as a 2px rule carries no text, so raw copper is legal
       * here; rule 1 only bars it from letterforms.
       *
       * Still load-bearing: with an abstract hero the corridor "no longer
       * makes an argument" (R4 §3.1), so this is the first substantive thing
       * on the page. Copper-light numerals are 4.55:1 on navy.
       */}
      <div className="on-dark border-t-2 border-[color:var(--color-copper)] bg-[color:var(--color-navy)]">
        <Container width="shell">
          <dl className="grid grid-cols-2 divide-[color:var(--color-slate-light)]/35 md:grid-cols-4 md:divide-x">
            {CREDENTIALS.map((c) => (
              <div key={c.label} className="px-2 py-8 md:px-6">
                <dt className="text-xs tracking-[0.14em] text-[color:var(--color-white)]/70 uppercase">
                  {c.label}
                </dt>
                {/* --copper-light numerals: 4.55:1 on navy, legal inside .on-dark */}
                <dd className="measurement mt-2 text-[length:var(--text-lg)] text-[color:var(--color-copper-light)]">
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
