import path from "node:path"

import { imageSize, type Dimensions } from "./image-size"

/*
 * Resolves a project image reference to something next/image can render.
 *
 * Frontmatter writes paths relative to the project, `./images/highway-01.jpg`,
 * because R6 §2 keeps photography beside the project that uses it. Next only
 * serves from public/, and scripts/sync-media.ts reconciles the two at build
 * time. This is the read side of that arrangement: it maps an authored path to
 * the public URL and reads the file's real dimensions off disk.
 *
 * Returning the intrinsic size matters for two reasons. next/image can reserve
 * the right box before the bytes arrive, so nothing shifts as photographs
 * load; and callers can lay each photograph out at its own aspect ratio
 * instead of cropping everything into one tile shape.
 */

export type ResolvedImage = {
  /** Public URL, what next/image requests. */
  url: string
  alt: string
  caption?: string
} & Partial<Dimensions>

export function resolveProjectImage(
  slug: string,
  image: { src: string; alt: string; caption?: string },
): ResolvedImage {
  const rel = image.src.replace(/^\.?\//, "")
  const url = `/content/projects/${slug}/${rel}`
  /* public/ is the synced copy; the originals beside the project are never
   * served. Both are the same bytes, so either gives the same dimensions —
   * reading the served copy keeps this honest about what ships. */
  const onDisk = path.join(process.cwd(), "public", url.replace(/^\//, ""))
  const size = imageSize(onDisk)
  return {
    url,
    alt: image.alt,
    caption: image.caption,
    ...(size ?? {}),
  }
}
