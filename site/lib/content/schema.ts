import { z } from "zod"

/*
 * YAML frontmatter auto-parses an unquoted `2026-08-01` into a JS Date, while a
 * quoted "2026-08-01" stays a string. z.string().date() rejects the former, so
 * a perfectly valid date in frontmatter fails validation depending purely on
 * whether the author happened to quote it. That is a trap, not a rule.
 *
 * dateString accepts either and normalises to an ISO yyyy-mm-dd string.
 */
const dateString = z.preprocess(
  (v) => (v instanceof Date ? v.toISOString().slice(0, 10) : v),
  z.string().date(),
)

/*
 * Content schema — docs/01-requirements-r6.md §3.
 *
 * R6 supersedes the main brief §7 (Sanity) and §8 (maintenance workflow). No
 * CMS: content lives in the repo as typed MDX, validated at build time.
 *
 * THIS FILE IS THE ENFORCEMENT LAYER. R6 §1 is explicit that validation is the
 * decisive reason for the change: in a CMS a required field is a warning in an
 * editor someone can work around; here a project missing its client or its alt
 * text is a FAILED BUILD, and the site physically cannot deploy in that state.
 *
 * The main brief §2 records that the competitor shipped `Lorem ipsum` and
 * `info@example.com` to production because nothing stopped it. These rules are
 * what stop it.
 */

export const Milestone = z.object({
  title: z.string().min(3),
  date: dateString,
  description: z.string().min(20),
  status: z.enum(["complete", "current", "upcoming"]),
  chainage: z.string().optional(), // 'Km 84/500'
  images: z.array(z.string()).default([]),
})

export const Project = z
  .object({
    title: z.string().min(6),
    status: z.enum(["ongoing", "completed", "awarded"]),
    /*
     * R11: widened from the original four. The recovered portfolio is not only
     * roads — it contains municipal resurfacing, sewer and water-supply
     * networks, industrial-estate infrastructure and a port rail link. Four
     * values could not describe 56 real records without forcing most of them
     * into "highways", which would have been a silent falsehood in the data.
     *
     * bridges / irrigation / protection are RETAINED even though no recovered
     * record uses them. Their absence from this dataset is not evidence the
     * company lacks the capability — it is one working file covering 2018–2023.
     */
    category: z.enum([
      "highways",
      "bridges",
      "irrigation",
      "protection",
      "urban",
      "water",
      "industrial",
      "rail",
    ]),

    /* Required — the Maruti rule. Their project records carry a title and one
     * sentence of tender scope and nothing else. */
    client: z.string().min(2),
    authority: z.string().optional(),
    /*
     * R11: OPTIONAL. Was required.
     *
     * The owner's instruction is that a value may be omitted when unresolved,
     * and that nothing may be invented to fill it. Bilodara–Sihunj has no
     * value on record; a 0, an empty string or a guessed figure would each be
     * worse than the field simply not existing. Consumers omit the row.
     *
     * .positive() still holds when a value IS given, so 0 cannot slip in as a
     * stand-in for "unknown".
     */
    contractValueCr: z.number().positive().optional(),

    scopeSummary: z.string().min(20).max(220),

    chainageFrom: z.string().optional(),
    chainageTo: z.string().optional(),
    lengthKm: z.number().positive().optional(),
    highway: z.string().optional(), // 'NH-58', 'SH-41'
    /*
     * R11: OPTIONAL. Was required. 30 of the 56 recovered records never state
     * a district in their scope text.
     *
     * It must NOT be inferred from the awarding authority's office — "R and B
     * Panchayat Division, Ahmedabad" is where the department sits, not where
     * the road is. Several Ahmedabad-issued packages are works in other
     * talukas entirely.
     */
    district: z.string().optional(),
    state: z.string().default("Gujarat"),
    location: z.tuple([z.number(), z.number()]).optional(), // [lat, lng]

    startDate: dateString.optional(),
    completionDate: dateString.optional(),
    expectedDate: dateString.optional(),

    progressPercent: z.number().min(0).max(100).optional(),
    progressUpdated: dateString.optional(),

    milestones: z.array(Milestone).default([]),

    /*
     * Alt text minimum 10 characters, not .min(1) — R6 §3 is direct that
     * .min(1) just invites "." . The competitor ships nearly every <img> with
     * an empty alt.
     */
    /*
     * R11: OPTIONAL. Was required, and was the binding blocker on publishing
     * the recovered portfolio — 51 of 57 projects have no owner-approved
     * photograph, and inventing an association or substituting stock imagery
     * is forbidden.
     *
     * The alt-text floor is unchanged and still applies to any image that IS
     * supplied: min(10), because .min(1) just invites ".".
     */
    heroImage: z.object({ src: z.string(), alt: z.string().min(10) }).optional(),
    gallery: z
      .array(
        z.object({
          src: z.string(),
          alt: z.string().min(10),
          caption: z.string().optional(),
        }),
      )
      .default([]),

    featured: z.boolean().default(false),
    displayOrder: z.number().int().default(99),
    seo: z
      .object({ title: z.string().max(60), description: z.string().max(155) })
      .optional(),
  })
  /*
   * RELAXED from R6 §3, deliberately and narrowly.
   *
   * R6 §3 required an ongoing project to carry BOTH progressPercent and
   * progressUpdated. That blocked recording an ongoing project at all when the
   * percentage was not to hand, and the owner's instinct was to drop the
   * progress feature entirely to get unblocked.
   *
   * Dropping it would cost a lot: R5 §3 gives --orange exactly one job, status,
   * and without progress the fourth colour has no semantic role left — rule 4
   * forbids it as decoration. The main brief §2 also calls the
   * ongoing-with-percentage pattern the one thing the competitor does right.
   *
   * So progress becomes OPTIONAL, and the half that actually prevents the
   * failure is kept: a percentage without a date is still rejected. That is the
   * anti-staleness guarantee — main brief §8 wants a visible "as of" stamp
   * precisely so a stale number is embarrassing. An undated 73% is worse than
   * no number, because it looks current forever.
   *
   * Net effect: a project can be ongoing with no bar (the component renders
   * nothing, per §7), but it can never show a bar with no date.
   */
  .refine((p) => p.progressPercent === undefined || !!p.progressUpdated, {
    message:
      "progressPercent requires progressUpdated. An undated percentage looks current forever",
  })
  /*
   * REMOVED at R8, by the owner's decision: completion dates are not required
   * and are not displayed.
   *
   * The rule was sound in the abstract — a completed project with no date
   * looks unfinished — but it collided with the facts. The reviewed records
   * ARE complete and their handover dates are not to hand, so the rule left
   * only three moves: hold every completed project back, weaken the whole
   * schema, or write a plausible date. The third is the one that actually
   * happens under deadline, and it is the exact failure the §2 teardown
   * exists to prevent. A record that is true but thin beats one that is
   * complete and invented.
   *
   * `completionDate` remains in the schema and any authentic date already
   * stored is retained. It is simply not required, and app/projects/[slug]
   * does not render it this phase.
   *
   * Nothing sorts by date — loadProjects() orders by displayOrder — so an
   * absent date cannot reorder or break a listing. Verified, not assumed.
   */
  .refine((p) => !p.featured || !!p.heroImage?.src, {
    message: "Featured projects appear in the corridor and need a hero image",
  })

export type ProjectData = z.infer<typeof Project>

/*
 * Leadership — R6 §3.
 * NO phone or email field exists, deliberately. The competitor's three
 * leadership cards all show `+1 (859) 254-6589` and `info@example.com`, an
 * American demo number on a Gujarat contractor's site, because the template
 * had those fields and nobody filled them. The field that does not exist
 * cannot ship someone else's demo phone number.
 */
export const Leader = z.object({
  name: z.string().min(3),
  role: z.string().min(2),
  bio: z.string().min(80), // a real bio, not "A small river named Duden"
  photo: z.object({ src: z.string(), alt: z.string().min(10) }).optional(),
  order: z.number().int().default(99),
})

/* Awards require a body. Lorem ipsum is 40+ chars so this is not a guarantee,
 * but it stops an EMPTY card rendering, which is the actual failure mode. */
export const Award = z.object({
  title: z.string().min(4),
  body: z.string().min(40),
  year: z.number().int().min(1987).max(2100),
  image: z.object({ src: z.string(), alt: z.string().min(10) }).optional(),
  project: z.string().optional(), // slug reference
})

export const Segment = z.object({
  title: z.string().min(3),
  slug: z.enum(["highways", "bridges", "irrigation", "protection"]),
  summary: z.string().min(40),
  order: z.number().int().default(99),
})

export const Client = z.object({
  name: z.string().min(2),
  fullName: z.string().optional(),
  logo: z.object({ src: z.string(), alt: z.string().min(10) }).optional(),
})

export const Certification = z.object({
  name: z.string().min(3),
  issuer: z.string().min(2),
  number: z.string().optional(),
  validUntil: dateString.optional(),
  document: z.string().optional(),
})

export const JobOpening = z.object({
  title: z.string().min(3),
  department: z.string().min(2),
  location: z.string().min(2),
  experience: z.string().min(2),
  description: z.string().min(80),
  responsibilities: z.array(z.string().min(10)).min(1),
  open: z.boolean().default(true),
})

/*
 * Offices. `phone` and `email` are optional because they are genuinely not
 * known yet (main brief §11 item 4), and §7's rule is that an incomplete field
 * renders nothing rather than a placeholder. Components guard them.
 */
export const Office = z.object({
  label: z.string().min(2),
  address: z.string().min(10),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  location: z.tuple([z.number(), z.number()]).optional(),
  hours: z.string().optional(),
})

export const SCHEMAS = {
  project: Project,
  leader: Leader,
  award: Award,
  segment: Segment,
  client: Client,
  certification: Certification,
  job: JobOpening,
  office: Office,
} as const
