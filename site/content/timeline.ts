/*
 * THE COMPANY TIMELINE.
 *
 * Edit this file to add an entry. Nothing here is layout.
 *
 * ONLY THREE SOURCES ARE ALLOWED IN THIS FILE, by the owner's decision:
 *   1987          the founding of the partnership firm
 *   2015-04-09    incorporation as a private limited company, MCA record
 *   2021 to 2024  the milestone list recovered from NCC's own previous site,
 *                 src/home/milestoneslider/MilestoneSlider.js, which names a
 *                 project per year
 *
 * No other date is published. Where a year names a project, `projects` links
 * to the record on this site rather than restating its scope, so the timeline
 * cannot drift from the project files.
 */

export type TimelineEntry = {
  year: string
  title: string
  body?: string
  /** Slugs under /projects. Verified against content/projects at build time. */
  projects?: string[]
}

export const TIMELINE: TimelineEntry[] = [
  {
    year: "1987",
    title: "Natraj Construction Company is founded",
    body: "The business starts as a partnership firm, taking road and bridge work for government departments.",
  },
  {
    year: "2015",
    title: "Incorporated as NCC Infraspace Private Limited",
    body: "The partnership becomes a private limited company on 9 April 2015, under CIN U45200GJ2015PTC082845.",
  },
  {
    year: "2021",
    title: "Gandhinagar smart city roads",
    projects: ["smart-roads-no-6-no-7-and-g-road-gandhinagar"],
  },
  {
    year: "2022",
    title: "Kheda to Dholka four-laning",
    projects: ["kheda-dholka-road-km-36-600-to-53-200-four-laning"],
  },
  {
    year: "2023",
    title: "Madhya Pradesh district roads, and four-laning in Sabarkantha",
    projects: [
      "reconstruction-of-major-district-roads-madhya-pradesh",
      "naroda-dehgam-harsol-dhansura-road-sh-68-km-35-600-to-61-000",
    ],
  },
  {
    year: "2024",
    title: "Gandhi Ashram precinct, and the Fedra to Sarangpur four-laning",
    projects: [
      "gandhi-ashram-precinct-development-sardar-patel-stadium-ward",
      "bagodara-dhandhuka-fedra-sarangpur",
    ],
  },
]

/*
 * HOW THE COMPANY IS LED.
 *
 * NO NAMES. Every director and founder name is removed from the site at the
 * owner's instruction. This section describes the structure and what each
 * level is accountable for, not who holds the post.
 *
 * SOURCED, each line, from NCC's own recovered copy:
 *   "our team includes qualified engineers and technical staff dedicated to
 *    project execution"
 *   "our management ensures that we complete projects within the specified
 *    budget and timeframe"
 *   "Quality is a top priority for us at every stage of the project"
 *   "we understand the financial aspects affecting national budgets and follow
 *    Supreme Court guidelines for MSWM projects in GUDC"
 * plus the 57 published records, every one of which was won under open tender
 * from a government body.
 *
 * TODO(owner), NOT rendered, because no NCC source supports any of it:
 *   - Safety practice. No policy, standard, officer or record exists in the
 *     recovered material. It is named in the brief but cannot be written.
 *   - Client relationship management. Who holds the authority relationship
 *     during execution is not stated anywhere.
 *   - Material testing. No laboratory, arrangement or standard is recorded.
 *   - Headcount at any level. Statutory filings say 54, self-reporting says
 *     101 to 500, and the two cannot both be right.
 *   - Named titles and portraits. Add them to LEADERSHIP below when ready;
 *     the component renders a `name` and `title` as soon as they are present.
 */

export type LeadershipLevel = {
  /** What this level is called. */
  level: string
  /** What it is accountable for, in plain terms. */
  accountable: string
  /** Optional, for when the owner adds people. Nothing renders while empty. */
  people?: Array<{ name: string; title: string; portrait?: string }>
}

export const LEADERSHIP: LeadershipLevel[] = [
  {
    level: "Board of directors",
    accountable:
      "Which work the company tenders for, and the commitment behind every bid. Contracts are taken under open tender from government departments, municipal corporations and development authorities.",
  },
  {
    level: "Management",
    accountable:
      "Delivery of each contract within its specified budget and programme, and compliance with the conditions the awarding authority sets. On municipal solid waste management work for GUDC that includes the applicable Supreme Court guidelines.",
  },
  {
    level: "Project management",
    accountable:
      "Running the contract on the ground: programme, plant, subcontractors and the flow of work between the site and the authority's engineers.",
  },
  {
    level: "Site engineering",
    accountable:
      "Setting out, day to day supervision and quality at every stage of the work. Qualified engineers and technical staff carry out execution on site.",
  },
]
