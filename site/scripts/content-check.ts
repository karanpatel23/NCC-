/*
 * `npm run content:check` — docs/01-requirements-r6.md §3.
 *
 * Validates every content file and prints a readable report, so problems are
 * caught before pushing rather than in Vercel's build log.
 *
 * Unlike the loader this uses safeParse, because the job here is to report ALL
 * the problems at once rather than to stop at the first. The build still uses
 * .parse() and still fails hard — this is the friendly front end to the same
 * schema, not a softer alternative to it.
 */
import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"

import { Project } from "../lib/content/schema"

const ROOT = path.join(process.cwd(), "content", "projects")

type Problem = { slug: string; field: string; message: string }

function main() {
  if (!fs.existsSync(ROOT)) {
    console.log("content/projects/ does not exist yet — nothing to check.")
    console.log(
      "Phase B seeds three real projects; see docs/01-requirements-r6.md §6.",
    )
    process.exit(0)
  }

  const all = fs
    .readdirSync(ROOT, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
  /* `_`-prefixed directories are drafts: skipped by the build, still reported
   * here so an incomplete project cannot be quietly forgotten. */
  const slugs = all.filter((s) => !s.startsWith("_"))
  const drafts = all.filter((s) => s.startsWith("_"))

  if (slugs.length === 0) {
    console.log("content/projects/ is empty — nothing to check.")
    process.exit(0)
  }

  const problems: Problem[] = []
  let ok = 0

  for (const slug of slugs) {
    const file = path.join(ROOT, slug, "index.mdx")
    if (!fs.existsSync(file)) {
      problems.push({ slug, field: "-", message: "missing index.mdx" })
      continue
    }
    const { data } = matter(fs.readFileSync(file, "utf8"))
    const result = Project.safeParse(data)
    if (result.success) {
      ok++
      // Image existence is not the schema's job, but a broken src is a broken
      // page, so check it here where we have the directory in hand.
      const imgs = [
        result.data.heroImage.src,
        ...result.data.gallery.map((g) => g.src),
      ]
      for (const src of imgs) {
        const abs = path.join(ROOT, slug, src.replace(/^\.?\//, ""))
        if (!fs.existsSync(abs)) {
          problems.push({ slug, field: "image", message: `not found: ${src}` })
        }
      }
    } else {
      for (const issue of result.error.issues) {
        problems.push({
          slug,
          field: issue.path.join(".") || "-",
          message: issue.message,
        })
      }
    }
  }

  console.log(`\ncontent:check — ${slugs.length} project(s)\n`)

  if (drafts.length) {
    console.log(`  ${drafts.length} draft(s), skipped by the build:`)
    for (const d of drafts) {
      const f = path.join(ROOT, d, "index.mdx")
      let missing = "—"
      if (fs.existsSync(f)) {
        const r = Project.safeParse(matter(fs.readFileSync(f, "utf8")).data)
        if (!r.success) {
          missing = [...new Set(r.error.issues.map((i) => i.path.join(".") || "-"))].join(", ")
        } else {
          missing = "valid — rename to publish"
        }
      }
      console.log(`    · ${d.replace(/^_/, "")}  needs: ${missing}`)
    }
    console.log()
  }

  if (problems.length === 0) {
    console.log(`  ✓ all ${ok} valid\n`)
    process.exit(0)
  }

  const width = Math.max(...problems.map((p) => p.slug.length), 4)
  for (const p of problems) {
    console.log(`  ✗ ${p.slug.padEnd(width)}  ${p.field}: ${p.message}`)
  }
  console.log(
    `\n  ${problems.length} problem(s) across ${slugs.length - ok} project(s).`,
  )
  console.log("  The build will fail on these. Fix them before pushing.\n")
  process.exit(1)
}

main()
