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

    return { ...parsed, slug, body: content.trim() }
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
  return featuredProjects().map((p) => p.heroImage.src)
}
