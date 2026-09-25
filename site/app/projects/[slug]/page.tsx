import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

import { getProject, loadProjects } from "@/lib/content/load"
import { resolveProjectImage } from "@/lib/content/media"
import { formatValue } from "../_sheet-data"
import { CATEGORY_LABEL } from "@/lib/labels"
import { PAGE_SHELL } from "@/components/page-header"
import { pageMetadata } from "@/lib/metadata"

/*
 * Project detail — main brief §6.3, "the template that matters most", now in
 * the same engineering-dossier language as the listing: white ground, navy
 * type, fine slate rules, copper only on the value and the active link.
 *
 * Order is: back link → title block → facts → scope → photography. The facts
 * come before the prose deliberately; an evaluator checks value, authority
 * and chainage first and may never read the narrative at all.
 *
 * Every optional field is guarded. §7's rule is that an incomplete field
 * renders nothing rather than a placeholder — the §2 teardown exists because
 * the competitor ships "+1 (859) 254-6589" and Lorem ipsum in production.
 * There is no fabricated technical table, no drawing number, no download.
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
  const title = project.seo?.title ?? project.title
  const description =
    /* Capped at 155 characters. A scope summary can run to 220, and Google
     * truncates the tail mid-word in the result snippet. */
    project.seo?.description ??
      (project.scopeSummary.length > 155
        ? project.scopeSummary.slice(0, 152).replace(/[\s,;:.]+\S*$/, "") + "."
        : project.scopeSummary)
  return pageMetadata(title, description, `/projects/${slug}`)
}

const STATUS_LABEL = {
  ongoing: "Ongoing",
  completed: "Completed",
  awarded: "Awarded",
} as const

/* Shared with the listing so the two cannot drift apart. */
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
  /* Omitted entirely when unresolved — never 0, never "Unknown". The stored
   * number is printed verbatim; it was rounded half-up when the portfolio was
   * compiled and must not be re-rounded here. */
  if (project.contractValueCr !== undefined) {
    facts.push(["Contract value", formatValue(project.contractValueCr)])
  }
  if (project.highway) facts.push(["Highway", project.highway])
  if (project.chainageFrom && project.chainageTo) {
    facts.push(["Chainage", `${project.chainageFrom} to ${project.chainageTo}`])
  }
  if (project.lengthKm) facts.push(["Length", `${project.lengthKm} km`])
  facts.push([
    "Location",
    project.district ? `${project.district}, ${project.state}` : project.state,
  ])
  if (project.startDate) facts.push(["Started", project.startDate])
  /*
   * completionDate is deliberately NOT rendered — R8. The owner's decision is
   * that completion dates are neither required nor displayed, so the field
   * stays in the schema and keeps any authentic value, but no page prints one
   * until that decision is revisited.
   */
  if (project.expectedDate) facts.push(["Expected", project.expectedDate])
  if (project.progressPercent !== undefined && project.progressUpdated) {
    facts.push([
      "Progress",
      `${project.progressPercent}% as of ${project.progressUpdated}`,
    ])
  }

  /*
   * R11: photography renders ONLY where an owner-approved association exists.
   * There is no placeholder, no empty frame and no stock substitute — 52 of
   * 57 projects have no cleared image, and a grey box repeated 52 times would
   * read as a broken site rather than an honest one. A text-only project gets
   * a text-led composition, not a gap where a picture should be.
   */
  const hero = project.heroImage
    ? resolveProjectImage(project.slug, project.heroImage)
    : null
  // The first gallery image appears on the listing when an alternate exists.
  // Keep it there and show the remaining images with this detail record.
  const gallery = project.gallery.slice(project.heroImage ? 1 : 0).map((g) =>
    resolveProjectImage(project.slug, g),
  )
  const scopeParagraphs = project.body?.split(/\n{2,}/).map(p => p.replace(/\s+/g, " ").trim()) ?? []
  const scopeBullets = project.body?.split("\n").map(p => p.trim()).filter(p => p.startsWith("•")) ?? []

  return (
    <div className={`project-detail ${PAGE_SHELL} pb-[clamp(4rem,2.5rem+6.5vw,8.75rem)]`}>
      <div className="pt-[calc(3.5rem+2.5rem)] md:pt-[calc(4.5rem+3.5rem)]">
        <Link
          href="/projects"
          className="measurement inline-flex min-h-[44px] items-center gap-2 text-[length:var(--text-sm)] text-[color:var(--color-copper-ink)] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-focus)]"
        >
          <span aria-hidden>←</span> Back to projects
        </Link>

        <p className="mt-4 font-[family-name:var(--font-plex-sans)] text-[length:var(--text-caption)] font-medium tracking-[0.16em] text-[color:var(--color-muted)] uppercase">
          {CATEGORY_LABEL[project.category] ?? project.category}
          <span aria-hidden> · </span>
          {project.district
            ? `${project.district}, ${project.state}`
            : project.state}
          <span aria-hidden> · </span>
          {STATUS_LABEL[project.status]}
        </p>

        <h1 className="mt-3 font-[family-name:var(--font-archivo)] text-[length:var(--text-display)] leading-[1.08] font-semibold tracking-[-0.02em] break-words text-[color:var(--color-ink)]">
          {project.title}
        </h1>

        {project.contractValueCr !== undefined && (
          <p className="measurement mt-4 text-[length:var(--text-lg)] font-medium text-[color:var(--color-copper-ink)]">
            {formatValue(project.contractValueCr)}
          </p>
        )}
      </div>

      {hero && (
        <figure className="mt-10 border border-[color:var(--color-rule)] p-2 md:p-3">
          <Image
            src={hero.url}
            alt={hero.alt}
            width={hero.width ?? 1600}
            height={hero.height ?? 900}
            priority
            sizes="(min-width: 1120px) 1040px, 100vw"
            /* Natural aspect ratio, bounded, never cropped — these are
             * horizontal aerials and a portrait crop removes the road. */
            className="h-auto max-h-[72svh] w-full object-contain"
          />
        </figure>
      )}

      {/*
        * Desktop puts the facts beside the scope; mobile stacks them in
        * normal document flow. The facts come first in the DOM on both, so a
        * screen reader and a no-CSS render meet them in the intended order.
        */}
      <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)] lg:gap-14">
        <section aria-labelledby="record-heading">
          <h2
            id="record-heading"
            className="font-[family-name:var(--font-plex-sans)] text-[length:var(--text-caption)] font-medium tracking-[0.18em] text-[color:var(--color-copper-ink)] uppercase"
          >
            Record
          </h2>
          <dl className="mt-4 border-t border-[color:var(--color-rule-strong)]">
            {facts.map(([k, v]) => (
              <div
                key={k}
                className="grid gap-1 border-b border-[color:var(--color-rule)] py-3"
              >
                <dt className="font-[family-name:var(--font-plex-sans)] text-[length:var(--text-caption)] font-medium tracking-[0.14em] text-[color:var(--color-muted)] uppercase">
                  {k}
                </dt>
                {/* Wraps. A 70-character authority name must never truncate. */}
                <dd className="measurement min-w-0 text-[length:var(--text-base)] leading-relaxed break-words text-[color:var(--color-ink)]">
                  {v}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <div className="min-w-0">
          <h2 className="font-[family-name:var(--font-plex-sans)] text-[length:var(--text-caption)] font-medium tracking-[0.18em] text-[color:var(--color-copper-ink)] uppercase">
            Scope
          </h2>
          {/*
            * The narrative when there is one, the summary when there is not —
            * never both. On most records the MDX body opens by restating
            * scopeSummary almost word for word, so printing the pair reads as
            * a stutter. The body is the fuller of the two, so it wins.
            */}
          {project.body ? (
            <div className="max-w-[64ch]">
              {scopeParagraphs.filter(p => !p.startsWith("•")).map((para, i) => (
                <p
                  key={i}
                  className="mt-4 text-[length:var(--text-base)] leading-[1.65] break-words text-[color:var(--color-ink)] first:mt-4"
                >
                  {para}
                </p>
              ))}
              {scopeBullets.length > 0 && <ul className="mt-4 list-disc space-y-2 pl-5">{scopeBullets.map(b => <li key={b} className="text-[length:var(--text-base)] leading-[1.6]">{b.slice(1).trim()}</li>)}</ul>}
            </div>
          ) : (
            <p className="mt-4 max-w-[64ch] text-[length:var(--text-base)] leading-[1.65] break-words text-[color:var(--color-ink)]">
              {project.scopeSummary}
            </p>
          )}

          {/* Milestone timeline — §6.3. Renders only with real milestones. */}
          {project.milestones.length > 0 && (
            <div className="mt-14">
              <h2 className="font-[family-name:var(--font-plex-sans)] text-[length:var(--text-caption)] font-medium tracking-[0.18em] text-[color:var(--color-copper-ink)] uppercase">
                Milestones
              </h2>
              <ol className="mt-6 border-l border-[color:var(--color-rule-strong)]">
                {project.milestones.map((m, i) => (
                  <li key={i} className="relative pb-8 pl-6 last:pb-0">
                    <span
                      aria-hidden
                      className="absolute top-1.5 -left-[5px] block h-2.5 w-2.5"
                      style={{
                        background:
                          m.status === "current"
                            ? "var(--color-copper)"
                            : m.status === "complete"
                              ? "var(--color-navy)"
                              : "var(--color-mist)",
                        outline:
                          m.status === "upcoming"
                            ? "1px solid var(--color-rule-strong)"
                            : undefined,
                      }}
                    />
                    <div className="measurement text-xs text-[color:var(--color-muted)]">
                      {m.date}
                      {m.chainage ? ` · ${m.chainage}` : ""}
                    </div>
                    <h3 className="mt-1 font-[family-name:var(--font-archivo)] text-[length:var(--text-lg)] leading-tight font-semibold">
                      {m.title}
                    </h3>
                    <p className="mt-2 max-w-[58ch] text-[length:var(--text-base)] leading-[1.6] text-[color:var(--color-muted)]">
                      {m.description}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </div>

      {/*
        * Gallery. Each photograph keeps its own shape — the sets are 16:9 and
        * 4:3 aerials with one 660×1600 vertical, and forcing 16:9 into a
        * portrait tile keeps 26% of the width. Column flow absorbs the ragged
        * heights. width/height come from the file headers, so the boxes are
        * reserved before the bytes land and nothing reflows as it loads.
        */}
      {gallery.length > 0 && (
        <section className="mt-16 border-t border-[color:var(--color-rule-strong)] pt-10">
          <h2 className="font-[family-name:var(--font-plex-sans)] text-[length:var(--text-caption)] font-medium tracking-[0.18em] text-[color:var(--color-copper-ink)] uppercase">
            Photography
          </h2>
          <ul
            className="gallery-grid mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {gallery.map((img) => (
              <li key={img.url} className="min-w-0">
                <Image
                  src={img.url}
                  alt={img.alt}
                  width={img.width ?? 1600}
                  height={img.height ?? 1200}
                  sizes="(min-width: 1024px) 340px, (min-width: 640px) 45vw, 90vw"
                  className="h-auto w-full border border-[color:var(--color-rule)]"
                />
                {img.caption && (
                  <p className="mt-2 text-[length:var(--text-sm)] leading-[1.5] text-[color:var(--color-muted)]">
                    {img.caption}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
