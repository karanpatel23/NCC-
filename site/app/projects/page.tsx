import { pageMetadata } from "@/lib/metadata"

import { ProjectsIndexView } from "./_index-view"
import { loadProjects } from "@/lib/content/load"
import { CATEGORY_LABEL } from "@/lib/labels"

/*
 * The count AND the list of infrastructure types are DERIVED, in the metadata
 * and in the visible intro alike.
 *
 * Both were typed: "Explore 57 completed road, municipal, water, industrial
 * and rail infrastructure project records". When the portfolio was filtered to
 * contracts at or above a value, the number went stale and three of the five
 * named types stopped existing on the page — the description was advertising
 * water, industrial and rail work to a search engine that would then land the
 * visitor on a list containing none of it. That is the §2 failure reached by
 * neglect rather than by invention, which makes it no better.
 *
 * Derived, the sentence cannot describe a portfolio the page is not showing,
 * whatever is published or withdrawn next.
 */
function typesPhrase(categories: string[]): string {
  const names = categories.map((c) => (CATEGORY_LABEL[c] ?? c).toLowerCase())
  if (names.length === 0) return "infrastructure"
  if (names.length === 1) return `${names[0]} infrastructure`
  return `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]} infrastructure`
}

/* Ordered by how many records carry each type, so the sentence leads with the
 * work the published portfolio is actually weighted toward. */
function publishedCategories(): string[] {
  const counts = new Map<string, number>()
  for (const p of loadProjects()) counts.set(p.category, (counts.get(p.category) ?? 0) + 1)
  return [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([c]) => c)
}

const CATEGORIES = publishedCategories()
const TYPES = typesPhrase(CATEGORIES)

export const metadata = pageMetadata(
  "Projects",
  `Explore ${loadProjects().length} completed ${TYPES} project records from NCC Infraspace.`,
  "/projects",
)

export default function ProjectsPage() {
  return (
    <ProjectsIndexView
      eyebrow="Projects"
      title="The project files."
      intro={`${TYPES.charAt(0).toUpperCase()}${TYPES.slice(1)} contracts executed for state, municipal and development authorities. Each sheet carries the authority and scope, with the contract value and chainage where they are on record.`}
      projects={loadProjects()}
      emptyNote="No projects are published yet."
    />
  )
}
