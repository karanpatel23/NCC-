import type { ProjectData } from "./content/schema"

/*
 * THE APPROVED CAPABILITY REGISTRY — R20.
 *
 * This list is the ONLY thing that decides what NCC says it does. It is
 * owner-approved, hand-maintained, and deliberately decoupled from the project
 * content tree.
 *
 * Why the separation matters. /capabilities previously derived its sections
 * from whichever categories happened to appear in the 57 records. That made
 * two mistakes at once, in opposite directions:
 *
 *   - It DROPPED bridges, irrigation and river protection, which NCC does
 *     undertake, purely because the recovered 2018-2023 file contains no
 *     example of them. The owner has now confirmed all three.
 *   - It would have MINTED A NEW SERVICE CLAIM the instant anyone added a
 *     project in a new category. A capability is a statement about the
 *     company; a project is evidence. Evidence cannot create the claim.
 *
 * So: adding a project can add an EXAMPLE to a capability. It can never add a
 * capability. Removing every project from a capability leaves the capability
 * standing, with its examples and count quietly omitted.
 *
 * `category` is the project category that supplies supporting examples, or
 * null where nothing is recorded yet. Null is not a gap to apologise for and
 * renders no count, no empty list and no explanation to the visitor.
 *
 * Summaries are restrained and limited to owner-confirmed scope. No
 * techniques, equipment, plant, capacity figures, qualifications or
 * specialist credentials appear here, because none of those is approved.
 */

export type Capability = {
  id: string
  /** Full title, used on /capabilities and /about. */
  title: string
  /** Short title, for the four-up homepage grid where space is tight. */
  short: string
  summary: string
  /** Project category supplying examples, or null where none is recorded. */
  category: ProjectData["category"] | null
  /** One of the four segments the homepage grid shows. */
  headline: boolean
}

export const CAPABILITIES: readonly Capability[] = [
  {
    id: "highways",
    title: "Roads and highways",
    short: "Highways",
    summary:
      "National and state highway widening, strengthening and resurfacing, including service roads and junction works.",
    category: "highways",
    headline: true,
  },
  {
    id: "bridges",
    title: "Bridges and flyovers",
    short: "Bridges",
    summary:
      "Major bridges, flyovers, rail over- and under-bridges, and river crossings.",
    category: null,
    headline: true,
  },
  {
    id: "irrigation",
    title: "Irrigation",
    short: "Irrigation",
    summary: "Canal works and water distribution infrastructure.",
    category: null,
    headline: true,
  },
  {
    id: "protection",
    title: "River and protection works",
    short: "River & protection",
    summary: "River front development and bank protection.",
    category: null,
    headline: true,
  },
  {
    id: "urban",
    title: "Urban and municipal roads",
    short: "Urban",
    summary:
      "City and municipal road networks, including sector roads, precinct development, regrading and resurfacing.",
    category: "urban",
    headline: false,
  },
  {
    id: "water",
    title: "Water and drainage networks",
    short: "Water",
    summary:
      "Sewer collecting networks, underground drainage, house gutter connections and water distribution.",
    category: "water",
    headline: false,
  },
  {
    id: "industrial",
    title: "Industrial estate infrastructure",
    short: "Industrial",
    summary:
      "Roads, approaches and estate infrastructure inside industrial and special economic zones.",
    category: "industrial",
    headline: false,
  },
  {
    id: "rail",
    title: "Rail connectivity",
    short: "Rail",
    summary: "Rail connectivity works, including port terminal links.",
    category: "rail",
    headline: false,
  },
] as const

/** The four the homepage grid shows. Its layout is fixed at four. */
export const HEADLINE_CAPABILITIES = CAPABILITIES.filter((c) => c.headline)
