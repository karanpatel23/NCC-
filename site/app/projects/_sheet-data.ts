import type { LoadedProject } from "@/lib/content/load"
import { resolveProjectImage } from "@/lib/content/media"
import { CATEGORY_LABEL, STATUS_LABEL } from "@/lib/labels"

export { CATEGORY_LABEL }

/*
 * View model for the project sheets.
 *
 * The listing is a client component so that search and filtering work without
 * a round trip, but image dimensions are read off disk with node:fs. This is
 * the seam: the server resolves everything a sheet needs into a plain,
 * serialisable object, and the client only ever renders it.
 *
 * Nothing here invents a value. Optional fields stay optional all the way
 * through, and the sheet omits the row rather than printing 0, "N/A" or a
 * guess — R11, and the §2 teardown that rule exists because of.
 */

export type SheetImage = {
  url: string
  alt: string
  width?: number
  height?: number
}

export type SheetProject = {
  slug: string
  title: string
  category: string
  categoryLabel: string
  status: string
  statusLabel: string
  client: string
  authority?: string
  /* Formatted here, once, so the listing and the detail page cannot drift.
   * The stored number is printed verbatim — the values were rounded half-up
   * when the portfolio was compiled and must not be re-rounded here. */
  value?: string
  scopeSummary: string
  location: string
  district?: string
  state: string
  highway?: string
  chainage?: string
  lengthKm?: number
  image?: SheetImage
  /** Pre-lowered haystack, so filtering never re-derives it per keystroke. */
  haystack: string
}

export function formatValue(cr: number): string {
  return `₹${cr} Cr`
}

export function toSheet(p: LoadedProject): SheetProject {
  const chainage =
    p.chainageFrom && p.chainageTo
      ? `${p.chainageFrom} to ${p.chainageTo}`
      : undefined
  const location = p.district ? `${p.district}, ${p.state}` : p.state

  const sheet: SheetProject = {
    slug: p.slug,
    title: p.title,
    category: p.category,
    categoryLabel: CATEGORY_LABEL[p.category] ?? p.category,
    status: p.status,
    statusLabel: STATUS_LABEL[p.status] ?? p.status,
    client: p.client,
    authority:
      p.authority && p.authority !== p.client ? p.authority : undefined,
    value: p.contractValueCr !== undefined ? formatValue(p.contractValueCr) : undefined,
    scopeSummary: p.scopeSummary,
    location,
    district: p.district,
    state: p.state,
    highway: p.highway,
    chainage,
    lengthKm: p.lengthKm,
    image: p.heroImage
      ? (() => {
          // Use a gallery alternate where available, preserving the project association.
          const listingImage = p.gallery.length ? p.gallery[0] : p.heroImage
          const r = resolveProjectImage(p.slug, listingImage)
          return {
            url: r.url,
            alt: r.alt,
            width: r.width,
            height: r.height,
          }
        })()
      : undefined,
    haystack: "",
  }

  /* §6: search matches title, scope, client and location. Authority, highway
   * and chainage are included too — an evaluator searching "SH-68" or a
   * division name is doing the same thing. */
  sheet.haystack = [
    p.title,
    p.scopeSummary,
    p.client,
    p.authority,
    p.district,
    p.state,
    p.highway,
    chainage,
    sheet.categoryLabel,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase()

  return sheet
}

/** Counts come from the records actually being listed, never a hardcoded map. */
export function categoryCounts(
  sheets: SheetProject[],
): Array<{ value: string; label: string; count: number }> {
  const counts = new Map<string, number>()
  for (const s of sheets) counts.set(s.category, (counts.get(s.category) ?? 0) + 1)
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([value, count]) => ({
      value,
      label: CATEGORY_LABEL[value] ?? value,
      count,
    }))
}
