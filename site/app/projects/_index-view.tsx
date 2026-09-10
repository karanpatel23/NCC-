import type { Metadata } from "next"

import { Container, Section, Eyebrow } from "@/components/container"
import { ProjectCard } from "@/components/project-card"
import type { LoadedProject } from "@/lib/content/load"

/*
 * Shared body for /projects, /projects/ongoing and /projects/completed.
 *
 * docs/03-competitor-maxel.md §4.1 wants ongoing and completed to be REAL
 * routes, not filter state — bookmarkable, sendable to a tender committee.
 * They render the same view with a different slice, so the layout lives here
 * once rather than three times.
 *
 * Underscore-prefixed so Next does not treat it as a route segment.
 */

export function ProjectsIndexView({
  eyebrow,
  title,
  intro,
  projects,
  emptyNote,
}: {
  eyebrow: string
  title: string
  intro: string
  projects: LoadedProject[]
  emptyNote: string
}) {
  const total =
    Math.round(projects.reduce((s, p) => s + p.contractValueCr, 0) * 100) / 100

  return (
    <>
      <div className="on-dark border-b-2 border-[color:var(--color-copper)] bg-[color:var(--color-navy)] pt-28 pb-14 md:pt-36">
        <Container>
          <p className="mb-4 font-[family-name:var(--font-plex-sans)] text-[11px] font-medium tracking-[0.18em] text-[color:var(--color-white)]/85 uppercase">
            {eyebrow}
          </p>
          <h1 className="text-[length:var(--text-3xl)]">{title}</h1>
          <p className="mt-5 max-w-[58ch] text-[color:var(--color-white)]/80">
            {intro}
          </p>
          {projects.length > 0 && (
            <p className="measurement mt-8 text-sm text-[color:var(--color-copper-light)]">
              {projects.length} project{projects.length === 1 ? "" : "s"} · ₹
              {total} Cr
            </p>
          )}
        </Container>
      </div>

      <Section>
        <Container>
          {projects.length === 0 ? (
            /*
             * An honest empty state, naming what is missing.
             *
             * Both competitors ship a bare heading over nothing — Maruti's
             * completed page and Maxel's /clients each render a title and no
             * content, which reads as "no track record" rather than "not
             * published yet". Saying so is better than implying it.
             */
            <div className="max-w-[60ch] border-t-2 border-[color:var(--color-rule-strong)] pt-6">
              <p className="text-[color:var(--color-muted)]">{emptyNote}</p>
            </div>
          ) : (
            <div className="grid gap-12 md:grid-cols-2">
              {projects.map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
          )}
        </Container>
      </Section>
    </>
  )
}

export function indexMetadata(title: string, description: string): Metadata {
  return { title, description }
}
