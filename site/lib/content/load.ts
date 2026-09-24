import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"

import { Project, type ProjectData } from "./schema"

/*
 * Content loader — docs/01-requirements-r6.md §3.
 *
 * Uses `.parse()`, NOT `.safeParse()`. That is the entire point: a throw at
 * module scope during `next build` stops the deploy rather than rendering half
 * a card. R6 §1 — "In the repo, a project missing its client or its alt text is
 * a failed build — the site physically cannot deploy in that state."
 *
 * Do not "improve" this by catching the error and skipping the bad project.
 * Skipping is exactly the behaviour that lets a broken record ship quietly.
 */

const CONTENT_ROOT = path.join(process.cwd(), "content")

export type LoadedProject = ProjectData & {
  slug: string
  /** MDX body after the frontmatter — the scope narrative. */
  body: string
}

/*
 * A directory prefixed with `_` is a DRAFT and is skipped by the loader and
 * the build.
 *
 * This is not a loophole in R6 §3. The rule is that invalid content cannot
 * ship, and it still cannot: a draft is opted out explicitly, the underscore
 * is visible in the directory name and in every diff, and `content:check`
 * lists drafts separately with the fields they are still missing, so nothing
 * quietly disappears. What it prevents is the opposite failure — a
 * half-gathered project blocking every deploy until the last field arrives,
 * which is the pressure that makes people invent values.
 */
function readDirSafe(dir: string): string[] {
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((e) => e.isDirectory() && !e.name.startsWith("_"))
    .map((e) => e.name)
}

export function loadProjects(): LoadedProject[] {
  const dir = path.join(CONTENT_ROOT, "projects")
  const slugs = readDirSafe(dir)

  const projects = slugs.map((slug) => {
    const file = path.join(dir, slug, "index.mdx")
    if (!fs.existsSync(file)) {
      throw new Error(
        `content/projects/${slug}/ has no index.mdx. Every project directory must contain one.`,
      )
    }
    const raw = fs.readFileSync(file, "utf8")
    const { data, content } = matter(raw)

    /* Throws on invalid content. See the note above — this is deliberate. */
    const parsed = Project.parse(data)

    /*
     * Strip HTML comments from the body.
     *
     * The generated records carry an internal provenance line —
     * `<!-- provenance: archive on-hand ids [...]; source amount ... lakhs -->`
     * — recording which archive rows they came from. The detail page renders
     * the body as plain paragraphs, so that comment was being printed to
     * visitors verbatim on 55 of 57 project pages.
     *
     * The comment stays in the MDX file, which is where the provenance
     * belongs; it simply never reaches the page. Stripping here rather than in
     * the template fixes every consumer at once.
     */
    const body = content.replace(/<!--[\s\S]*?-->/g, "").trim()

    return { ...parsed, slug, body }
  })

  return projects.sort((a, b) => a.displayOrder - b.displayOrder)
}

/** Featured projects, ordered — the corridor's image source once photos exist. */
export function featuredProjects(): LoadedProject[] {
  return loadProjects()
    .filter((p) => p.featured)
    .slice(0, 12) // R3 §2.3 cap
}

/**
 * Hero images for the corridor.
 *
 * R4 §2.2 replaced the six-photo gate with gradients for the interim build, so
 * an empty array here is valid and the corridor fills deterministically. When
 * photography lands, R3 §2.3's rule returns: fewer than six usable photos and
 * the corridor should not ship as a corridor at all.
 */
export function corridorImages(): string[] {
  return featuredProjects()
    .map((p) => p.heroImage?.src)
    .filter((s): s is string => !!s)
}

/** One project by slug, or null. Used by the detail route's generateStaticParams pair. */
export function getProject(slug: string): LoadedProject | null {
  return loadProjects().find((p) => p.slug === slug) ?? null
}

/**
 * Projects filtered by status.
 *
 * docs/03-competitor-maxel.md §4.1: ongoing and completed become real routes
 * rather than only filter state. A tender evaluator wants "finished work of
 * comparable value" as a destination they can bookmark and send to a
 * committee, not a filter they have to set.
 */
export function projectsByStatus(
  status: ProjectData["status"],
): LoadedProject[] {
  return loadProjects().filter((p) => p.status === status)
}

/** Totals for the index headers. Real arithmetic over real records, never a
 * hardcoded counter — the competitor teardowns both show "0 +" in production. */
/*
 * R11: `valueCr` is GONE, deliberately.
 *
 * The owner's instruction is that no aggregate portfolio value is published.
 * The reason is in the evidence: the recovered set is one working file of
 * tender awards from 2018–2023, it is not the company's lifetime record, and
 * summing it produces a number that reads as an order book and is not one.
 * Individual project values are published; their sum is not.
 *
 * Do not reinstate a total here. A helper that exists will end up rendered.
 */
export function projectTotals() {
  const all = loadProjects()
  return {
    count: all.length,
    withValue: all.filter((p) => p.contractValueCr !== undefined).length,
    ongoing: all.filter((p) => p.status === "ongoing").length,
    completed: all.filter((p) => p.status === "completed").length,
    awarded: all.filter((p) => p.status === "awarded").length,
  }
}
