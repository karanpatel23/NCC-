/*
 * Company facts — interim source of truth until Sanity lands in phase B (§7),
 * at which point this file is replaced by the `siteSettings` and `office`
 * documents and deleted.
 *
 * RULE, per §7 and the §2 teardown: a field that is not yet verified is
 * `undefined`, never a placeholder. The competitor ships "+1 (859) 254-6589"
 * and "info@example.com" on a Gujarat contractor's site because a template
 * default was never replaced. Components here guard every optional field and
 * render nothing rather than a stand-in.
 */

export const COMPANY = {
  legalName: "NCC Infraspace Private Limited",
  tradingName: "NCC Infraspace",
  /*
   * The client's own motto. Replaces the "Building Gujarat's roads and
   * bridges since 1987" line, which was always flagged in main brief §3 as a
   * draft for refinement with the client.
   *
   * NOTE what the swap costs. §3's whole argument for the old line was that
   * it stated a checkable fact — 1987, Class AA, Gujarat — where both
   * competitors lead with unverifiable promises ("Creating infrastructure
   * that endures", "Pioneering Construction for a Modern World"). A motto is
   * the same species as those. So the facts do not disappear: they move to
   * the hero eyebrow, which now reads "Est. 1987 · Class AA · Mehsana,
   * Gujarat" directly above the motto, and to the credentials strip below.
   * The motto leads; the evidence sits immediately under it.
   */
  motto: "Every milestone is our vision.",
  /* Kept for the meta description and SEO, where the checkable facts still
   * do the work — §9 targets "road contractor Gujarat", not the motto. */
  positioning: "Building Gujarat's roads and bridges since 1987.",
  cin: "U45200GJ2015PTC082845",
  foundedYear: 1987,
  incorporatedAsPvtLtd: "2015-04-09",
  predecessorFirm: "Natraj Construction Company",
} as const

/* §6.1 item 3 — credentials strip. Every value here is externally verifiable,
 * which is the entire point: audience #1 checks these first. */
export const CREDENTIALS = [
  { label: "Established", value: "1987" },
  { label: "Registration", value: "Class AA — Govt. of Gujarat" },
  { label: "Turnover FY24", value: "₹302 Cr" },
  { label: "Credit rating", value: "Crisil BBB-/Stable · A3" },
] as const

export type Office = {
  label: string
  address: string
  /* BLOCKED — §11 item 4. Not published until the client supplies them. */
  phone?: string
  email?: string
}

/*
 * Addresses as they appear on the current live site, recovered from the phase 1
 * crawl (forensics/out/raw/main.488ac818.js, Google Maps directions links).
 *
 * UNRESOLVED, and §11 item 4 makes it blocking: three names are in evidence
 * across sources — Orbit Business Hub and Empire Business Hub on the live site,
 * and Royal House in MCA records. The brief's §2 note observes that Royal House
 * is also the competitor's registered address. Do not publish until confirmed.
 */
export const OFFICES: Office[] = [
  {
    label: "Mehsana",
    address:
      "Orbit — The Business Hub, Nr. Dena Bank, Radhanpur Road, Mehsana, Gujarat",
  },
  {
    label: "Ahmedabad",
    address: "Empire Business Hub, Sola, Ahmedabad, Gujarat 380060",
  },
]
