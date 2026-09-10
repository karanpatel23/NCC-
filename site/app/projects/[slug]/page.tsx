import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

import { Container, Section, Eyebrow } from "@/components/container"
import { getProject, loadProjects } from "@/lib/content/load"

/*
 * Project detail — main brief §6.3, "the template that matters most".
 *
 * Order is: hero image + status → key facts in mono → scope narrative →
 * milestone timeline → gallery. The facts table comes before the prose
 * deliberately; an evaluator checks value, authority and chainage first and
 * may never read the narrative at all.
 *
 * Every optional field is guarded. §7's rule is that an incomplete field
 * renders nothing rather than a placeholder — the §2 teardown exists because
 * the competitor ships "+1 (859) 254-6589" and Lorem ipsum in production.
 */

export function generateStaticParams() {
  return loadProjects().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return {}
  return {
    title: project.seo?.title ?? project.title,
    description: project.seo?.description ?? project.scopeSummary,
  }
}

const STATUS_LABEL = {
  ongoing: "Ongoing",
  completed: "Completed",
  awarded: "Awarded",
} as const

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  /* Only rows with a value are built, so the table never shows an empty cell. */
  const facts: Array<[string, string]> = []
  facts.push(["Client", project.client])
  if (project.authority && project.authority !== project.client) {
    facts.push(["Authority", project.authority])
  }
  facts.push(["Contract value", `₹${project.contractValueCr} Cr`])
  if (project.highway) facts.push(["Highway", project.highway])
  if (project.chainageFrom && project.chainageTo) {
    facts.push(["Chainage", `${project.chainageFrom} – ${project.chainageTo}`])
  }
  if (project.lengthKm) facts.push(["Length", `${project.lengthKm} km`])
  facts.push(["Location", `${project.district}, ${project.state}`])
  if (project.startDate) facts.push(["Started", project.startDate])
  if (project.completionDate) facts.push(["Completed", project.completionDate])
  if (project.expectedDate) facts.push(["Expected", project.expectedDate])
  if (project.progressPercent !== undefined && project.progressUpdated) {
    facts.push([
      "Progress",
      `${project.progressPercent}% as of ${project.progressUpdated}`,
    ])
  }

  const heroSrc = `/content/projects/${project.slug}/${project.heroImage.src.replace(/^\.?\//, "")}`

  return (
    <>
      <div className="on-dark border-b-2 border-[color:var(--color-copper)] bg-[color:var(--color-navy)] pt-28 pb-14 md:pt-36">
        <Container>
          <p className="mb-4 font-[family-name:var(--font-plex-sans)] text-[11px] font-medium tracking-[0.18em] text-[color:var(--color-white)]/85 uppercase">
            <Link href="/projects" className="hover:text-[color:var(--color-copper-light)]">
              Projects
            </Link>{" "}
            · {STATUS_LABEL[project.status]}
          </p>
          <h1 className="max-w-[24ch] text-[length:var(--text-3xl)]">
            {project.title}
          </h1>
          <p className="mt-5 max-w-[62ch] text-[color:var(--color-white)]/80">
            {project.scopeSummary}
          </p>
        </Container>
      </div>

      <Section>
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1fr_360px]">
            <div>
              {/* Scope narrative — the MDX body. */}
              {project.body && (
                <div className="max-w-[62ch]">
                  <Eyebrow>Scope</Eyebrow>
                  {project.body.split(/\n{2,}/).map((para, i) => (
                    <p
                      key={i}
                      className="mt-4 text-[color:var(--color-muted)] first:mt-0"
                    >
                      {para.replace(/\s+/g, " ").trim()}
                    </p>
                  ))}
                </div>
              )}

              {/* Milestone timeline — §6.3. Renders only with real milestones. */}
              {project.milestones.length > 0 && (
                <div className="mt-16">
                  <Eyebrow>Milestones</Eyebrow>
                  <ol className="mt-6 border-l-2 border-[color:var(--color-rule-strong)]">
                    {project.milestones.map((m, i) => (
                      <li key={i} className="relative pb-8 pl-6 last:pb-0">
                        <span
                          aria-hidden
                          className="absolute top-1.5 -left-[7px] block h-3 w-3 rounded-[9999px]"
                          style={{
                            background:
                              m.status === "current"
                                ? "var(--color-copper)"
                                : m.status === "complete"
                                  ? "var(--color-navy)"
                                  : "var(--color-mist)",
                            outline:
                              m.status === "upcoming"
                                ? "2px solid var(--color-rule-strong)"
                                : undefined,
                          }}
                        />
                        <div className="measurement text-xs text-[color:var(--color-muted)]">
                          {m.date}
                          {m.chainage ? ` · ${m.chainage}` : ""}
                        </div>
                        <h3 className="mt-1 text-[length:var(--text-lg)] leading-tight">
                          {m.title}
                        </h3>
                        <p className="mt-2 max-w-[58ch] text-sm text-[color:var(--color-muted)]">
                          {m.description}
                        </p>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>

            {/* Key facts, in mono. §4.2: every number here is a measurement. */}
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <Eyebrow>Key facts</Eyebrow>
              <dl className="border-t-2 border-[color:var(--color-copper)]">
                {facts.map(([k, v]) => (
                  <div
                    key={k}
                    className="flex justify-between gap-6 border-b border-[color:var(--color-rule)] py-3"
                  >
                    <dt className="text-xs tracking-[0.1em] text-[color:var(--color-muted)] uppercase">
                      {k}
                    </dt>
                    <dd className="measurement text-right text-sm">{v}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          </div>
        </Container>
      </Section>

      {/* Gallery. R3 §3.1: every project image is 18:25, the corridor's ratio. */}
      {project.gallery.length > 0 && (
        <Section className="bg-[color:var(--color-mist)]">
          <Container>
            <Eyebrow>Photography</Eyebrow>
            <ul className="mt-8 grid grid-cols-2 gap-5 md:grid-cols-4">
              {project.gallery.map((img) => (
                <li key={img.src}>
                  <div className="relative aspect-[18/25] overflow-hidden rounded-[3px] bg-[color:var(--color-navy)]">
                    <Image
                      src={`/content/projects/${project.slug}/${img.src.replace(/^\.?\//, "")}`}
                      alt={img.alt}
                      fill
                      sizes="(min-width: 768px) 25vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                  {img.caption && (
                    <p className="mt-2 text-xs text-[color:var(--color-muted)]">
                      {img.caption}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      )}
    </>
  )
}
