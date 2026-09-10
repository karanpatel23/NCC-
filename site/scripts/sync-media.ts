/*
 * Copies content images into public/ so Next can serve them.
 *
 * R6 §2 keeps photography BESIDE the project that uses it — moving a project
 * moves its images, and deleting one cannot orphan assets. That authoring
 * choice is right, but Next only serves from public/, so the two have to be
 * reconciled somewhere. Here, at build time, rather than by giving up
 * co-location.
 *
 * Drafts (underscore-prefixed) are skipped, matching the loader: an
 * unpublished project should not have its photography on a public URL.
 */
import fs from "node:fs"
import path from "node:path"

const SRC = path.join(process.cwd(), "content", "projects")
const DEST = path.join(process.cwd(), "public", "content", "projects")

function copyDir(from: string, to: string) {
  fs.mkdirSync(to, { recursive: true })
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    const a = path.join(from, entry.name)
    const b = path.join(to, entry.name)
    if (entry.isDirectory()) copyDir(a, b)
    else fs.copyFileSync(a, b)
  }
}

function main() {
  fs.rmSync(DEST, { recursive: true, force: true })
  if (!fs.existsSync(SRC)) {
    console.log("sync-media: no content/projects yet")
    return
  }
  let copied = 0
  for (const dir of fs.readdirSync(SRC, { withFileTypes: true })) {
    if (!dir.isDirectory() || dir.name.startsWith("_")) continue
    const images = path.join(SRC, dir.name, "images")
    if (!fs.existsSync(images)) continue
    copyDir(images, path.join(DEST, dir.name, "images"))
    copied += fs.readdirSync(images).length
  }
  console.log(`sync-media: ${copied} file(s) → public/content/projects/`)
}

main()
