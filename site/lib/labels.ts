/*
 * Display labels, deliberately free of server-only imports.
 *
 * These used to live in app/projects/_sheet-data.ts, which also imports the
 * image resolver and therefore node:fs. Any client component that wanted a
 * category label dragged the filesystem into the browser bundle and the build
 * failed with "the chunking context does not support external modules".
 */

export const CATEGORY_LABEL: Record<string, string> = {
  highways: "Highways",
  bridges: "Bridges",
  irrigation: "Irrigation",
  protection: "Protection",
  urban: "Urban",
  water: "Water",
  industrial: "Industrial",
  rail: "Rail",
}

export const STATUS_LABEL: Record<string, string> = {
  ongoing: "Ongoing",
  completed: "Completed",
  awarded: "Awarded",
}
