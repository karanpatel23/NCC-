import { Container, Section, Eyebrow } from "@/components/container"
import { COMPANY, CREDENTIALS } from "@/lib/company"

/*
 * PHASE A GATE (§10): "Tokens render correctly at all three breakpoints."
 *
 * This is a token proof, not the homepage. §10 phase C builds the real static
 * homepage once content from §11 exists. Nothing here is motion (phase E) or
 * 3D (phase F), and no project data is invented.
 */
export default function Page() {
  return (
    <>
      {/* Hero band — --bitumen, per §6.1 item 2. Chalk on bitumen = 17.41:1. */}
      <section className="bg-[color:var(--color-bitumen)] pt-28 pb-[clamp(4rem,2.5rem+6.5vw,8.75rem)] text-[color:var(--color-chalk)] md:pt-36">
        <Container>
          <Eyebrow>Km 0.000 · Phase A</Eyebrow>
          <h1 className="max-w-[16ch] text-[length:var(--text-4xl)]">
            {COMPANY.positioning}
          </h1>
          <p className="mt-6 max-w-[52ch] text-[color:var(--color-rebar-line)]">
            Class AA contractor registered with the Government of Gujarat.
            Roads, bridges, irrigation and river protection works.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <span className="rounded-[2px] bg-[color:var(--color-retro)] px-6 py-3 text-sm font-medium text-[color:var(--color-on-accent)]">
              View projects
            </span>
            <span className="rounded-[2px] border border-[color:var(--color-chalk)]/30 px-6 py-3 text-sm font-medium">
              Company profile PDF
            </span>
          </div>
        </Container>
      </section>

      {/* §6.1 item 3 — credentials strip, immediately under the fold. */}
      <div className="border-y border-[color:var(--color-border)] bg-[color:var(--color-surface)]">
        <Container width="shell">
          <dl className="grid grid-cols-2 divide-[color:var(--color-border)] md:grid-cols-4 md:divide-x">
            {CREDENTIALS.map((c) => (
              <div key={c.label} className="px-2 py-8 md:px-6">
                <dt className="text-xs tracking-[0.14em] text-[color:var(--color-muted)] uppercase">
                  {c.label}
                </dt>
                <dd className="measurement mt-2 text-[length:var(--text-lg)] text-[color:var(--color-foreground)]">
                  {c.value}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </div>

      {/* Token proof — every swatch carries its computed contrast ratio. */}
      <Section>
        <Container>
          <Eyebrow>Km 1.200 · Design tokens</Eyebrow>
          <h2 className="text-[length:var(--text-2xl)]">Signboard palette</h2>
          <p className="mt-4 max-w-[60ch] text-[color:var(--color-muted)]">
            Ratios are computed against the surface each token actually sits on.
            Two values deviate from §4.1 to clear the §9 accessibility floor —
            both are documented in{" "}
            <code className="measurement text-[color:var(--color-retro-text)]">
              globals.css
            </code>
            .
          </p>

          <ul className="mt-10 grid grid-cols-2 gap-px bg-[color:var(--color-border)] md:grid-cols-3">
            {[
              { name: "--bitumen", hex: "#101315", note: "17.41:1 on chalk" },
              { name: "--signboard", hex: "#0B5D3B", note: "7.42:1 on chalk" },
              { name: "--retro", hex: "#F5C518", note: "11.44:1 on bitumen" },
              { name: "--concrete", hex: "#EAE7E1", note: "surface" },
              { name: "--chalk", hex: "#F8F7F4", note: "page background" },
              { name: "--rebar", hex: "#62666F", note: "5.37:1 · was #8A8F98" },
            ].map((t) => (
              <li key={t.name} className="bg-[color:var(--color-background)] p-5">
                <span
                  className="block h-16 w-full rounded-[2px] border border-[color:var(--color-border)]"
                  style={{ backgroundColor: t.hex }}
                />
                <p className="measurement mt-3 text-sm">{t.name}</p>
                <p className="measurement text-xs text-[color:var(--color-muted)]">
                  {t.hex} · {t.note}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Type scale proof — display expanded, body prose, mono measurements. */}
      <Section className="bg-[color:var(--color-surface)]">
        <Container>
          <Eyebrow>Km 2.450 · Type scale</Eyebrow>
          <h2 className="text-[length:var(--text-3xl)]">Archivo Expanded</h2>
          <h3 className="mt-8 text-[length:var(--text-xl)]">
            IBM Plex Sans carries all prose
          </h3>
          <p className="mt-4 max-w-[60ch] text-[color:var(--color-muted)]">
            Fluid 1.25 ratio, clamped between 390px and 1440px. The H1 above
            caps at 72px desktop and 40px mobile — resize to verify the gate.
          </p>
          <table className="measurement mt-8 w-full max-w-lg text-sm">
            <caption className="sr-only">Sample measurements set in mono</caption>
            <tbody className="divide-y divide-[color:var(--color-border)]">
              {[
                ["Chainage", "Km 82/00 – 86/00"],
                ["Length", "3.300 km"],
                ["Contract value", "₹302.42 Cr"],
                ["Progress", "89%"],
              ].map(([k, v]) => (
                <tr key={k}>
                  <th scope="row" className="py-3 text-left font-normal text-[color:var(--color-muted)]">
                    {k}
                  </th>
                  <td className="py-3 text-right">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Container>
      </Section>
    </>
  )
}
