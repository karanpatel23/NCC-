/*
 * Company facts.
 *
 * R6 removed the CMS, so this file is the source of truth for identity and
 * contact rather than an interim stand-in for Sanity.
 *
 * RULE, per §7 and the §2 teardown: a field that is not yet verified is
 * `undefined`, never a placeholder. The competitor ships "+1 (859) 254-6589"
 * and "info@example.com" on a Gujarat contractor's site because a template
 * default was never replaced. Components guard every optional field and render
 * nothing rather than a stand-in.
 */

export const COMPANY = {
  legalName: "NCC Infraspace Private Limited",
  tradingName: "NCC Infraspace",
  /*
   * The client's own motto, confirmed again at the R8 review.
   *
   * NOTE what the swap costs. §3's whole argument for the old line was that
   * it stated a checkable fact — 1987, Class AA, Gujarat — where both
   * competitors lead with unverifiable promises ("Creating infrastructure
   * that endures", "Pioneering Construction for a Modern World"). A motto is
   * the same species as those. So the facts do not disappear: they move to
   * the hero eyebrow, which reads "Est. 1987 · Class AA · Mehsana, Gujarat"
   * directly above the motto. The motto leads; the evidence sits under it.
   */
  motto: "Every Milestone is Our Vision.",
  /*
   * R9 removed the location lead. This string renders in the footer, which
   * appears on the landing page, so "Building Gujarat's roads and bridges"
   * was landing-page positioning wherever else it also showed up.
   *
   * It is replaced with a neutral description of the work rather than a
   * bigger claim. "Pan-India" or "leading" would be unverifiable, which is
   * the trap main brief §3 spends its length warning about.
   *
   * SEO NOTE: §9 targets "road contractor Gujarat". That term now survives
   * only in the meta description and in the project records themselves —
   * deliberately, since R9 keeps project geography and the office addresses.
   */
  positioning: "Infrastructure contractor since 1987.",
  cin: "U45200GJ2015PTC082845",
  foundedYear: 1987,
  incorporatedAsPvtLtd: "2015-04-09",
  predecessorFirm: "Natraj Construction Company",

  /*
   * CONFIRMED by the owner, R8. Both were blocking under main brief §11
   * item 4 and are now closed.
   *
   * The telephone is company-level, not per-office, because that is how it
   * was supplied — "Office telephone". Its 02762 STD code is Mehsana's, but
   * inferring from that which desk it rings is exactly the kind of guess §7
   * forbids, so it is listed once for the company rather than printed under
   * one address or duplicated under both.
   *
   * The email is a Yahoo address. That is the address of record and the owner
   * has confirmed it, so it ships as given — §11 item 4 asked for a domain
   * address and did not get one, and inventing info@nccinfraspace.com would
   * be precisely the failure the §2 teardown documents. Still worth raising
   * with the client: a yahoo.in address on a Class AA contractor's tender
   * correspondence is a credibility cost, but that is their call, not ours.
   */
  phone: "02762-255962",
  email: "ncc_infraspace2015@yahoo.in",
} as const

/* Presentation facts retained for compatibility. Unverified turnover,
 * credit ratings and registration have been removed from published copy. */
export const CREDENTIALS = [
  { label: "Established", value: "1987" },
  { label: "Incorporated", value: "2015" },
  { label: "Project records", value: "57" },
  { label: "Portfolio", value: "Across India" },
] as const

export type Office = {
  label: string
  address: string
  /** Verified destination, published by NCC's own site. Never a guess. */
  mapUrl?: string
}

/*
 * CONFIRMED addresses, R8. This closes the three-way ambiguity that main brief
 * §11 item 4 called blocking: Orbit Business Hub and Empire Business Hub on
 * the live site, Royal House in MCA records. The owner has confirmed Orbit and
 * Empire, with unit numbers. Royal House — which is also the competitor's
 * registered address — is not an NCC office and is not published.
 *
 * Order is the owner's own, Ahmedabad then Mehsana. Neither is labelled head
 * office, because which one is has never been established and the registered
 * address in MCA filings does not settle where the business is run from.
 *
 * mapUrl values are lifted verbatim from NCC's live site, recovered from the
 * phase-1 crawl (forensics/out/raw/main.488ac818.js). They carry Google place
 * IDs — 0x395e9cb6b351130b for Empire, 0x395c423328c623df for Orbit — so they
 * resolve to the business the client themselves pinned. No coordinate here was
 * derived, geocoded or guessed.
 *
 * These are plain links, not embedded iframes. The live site embeds two Google
 * Maps frames on /contact, which load third-party script and set cookies
 * before the visitor asks for a map. A link costs the visitor nothing until
 * they click it.
 */
export const OFFICES: Office[] = [
  {
    label: "Ahmedabad",
    address:
      "A-502 Empire Business Hub, Science City Road, Sola, Ahmedabad, Gujarat 380060, India",
    mapUrl:
      "https://www.google.com/maps/dir//Empire+Business+Hub+Sola+Ahmedabad,+Gujarat+380060+India/@23.0730039,72.5132729,16z/data=!4m8!4m7!1m0!1m5!1m1!1s0x395e9cb6b351130b:0xce418d22916f76bd!2m2!1d72.5132729!2d23.0730039",
  },
  {
    label: "Mehsana",
    address:
      "301, 3rd Floor, Orbit Business Hub, Nr. Dena Bank, Radhanpur Road, Mehsana 384002",
    mapUrl:
      "https://www.google.com/maps/dir//Orbit+-+The+Business+Hub+Orbit+business+hub+,+Nr.+Dena+Bank+,+Randhanpur+Road+,+Mehsana-02+Radhanpur+Rd,+Radhanpur+Road+Mehsana,+Gujarat+384002,+India/@23.6073157,72.3778462,17z/data=!4m8!4m7!1m0!1m5!1m1!1s0x395c423328c623df:0x95cfab1340bf2d89!2m2!1d72.3778462!2d23.6073157",
  },
]

/** tel: needs the bare digits; the printed form keeps its separator. */
export const TEL_HREF = `tel:${COMPANY.phone.replace(/[^\d+]/g, "")}`
export const MAILTO_HREF = `mailto:${COMPANY.email}`
