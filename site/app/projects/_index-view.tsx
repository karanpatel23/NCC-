import type { Metadata } from "next"

import { ProjectsBrowser } from "./_projects-browser"
import { categoryCounts, toSheet } from "./_sheet-data"
import type { LoadedProject } from "@/lib/content/load"
import { PageHeader } from "@/components/page-header"

/*
 * Shared body for /projects, /projects/ongoing and /projects/completed.
 *
 * docs/03-competitor-maxel.md §4.1 wants ongoing and completed to be REAL
 * routes, not filter state — bookmarkable, sendable to a tender committee.
 * They render the same view with a different slice, so the layout lives here
 * once rather than three times. The in-page search and category controls are
 * a convenience on top of those routes, not a replacement for them.
 *
 * Underscore-prefixed so Next does not treat it as a route segment.
 *
 * The page is pure white with navy type. The navy band this used to open with
 * is gone: the sheets are the page, and a dark header band above a file of
 * white sheets reads as a different site's hero bolted on top.
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
  const sheets = projects.map(toSheet)

  return (
    /*
     * The container is local rather than <Container>, because this page has
     * its own padding scale — 40 / 28 / 20 / 16 — and <Container> is fixed at
     * 24px. Max width and centring match it exactly.
     */
    <div className="mx-auto w-full max-w-[1120px] px-4 pb-[clamp(4rem,2.5rem+6.5vw,8.75rem)] min-[360px]:px-5 md:px-7 lg:px-10">
      {/* Clears the fixed header — h-14 on mobile, h-18 from md — with room
        * above the eyebrow rather than the heading sitting under the bar. */}
      <PageHeader
        eyebrow={eyebrow}
        title={<>{title}</>}
        intro={<>{intro}</>}
      />

      <div className="mt-8 border-t border-[color:var(--color-rule)] pt-8 lg:mt-10 lg:pt-10">
        <ProjectsBrowser
          projects={sheets}
          categories={categoryCounts(sheets)}
          emptyNote={emptyNote}
        />
      </div>
    </div>
  )
}

export function indexMetadata(title: string, description: string): Metadata {
  return { title, description }
}
