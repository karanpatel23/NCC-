import { z } from "zod"

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
  date: z.string().date(),
  description: z.string().min(20),
  status: z.enum(["complete", "current", "upcoming"]),
  chainage: z.string().optional(), // 'Km 84/500'
  images: z.array(z.string()).default([]),
})

export const Project = z
  .object({
    title: z.string().min(6),
    status: z.enum(["ongoing", "completed", "awarded"]),
    category: z.enum(["highways", "bridges", "irrigation", "protection"]),

    /* Required — the Maruti rule. Their project records carry a title and one
     * sentence of tender scope and nothing else. */
    client: z.string().min(2),
    authority: z.string().optional(),
    contractValueCr: z.number().positive(),

    scopeSummary: z.string().min(20).max(220),

    chainageFrom: z.string().optional(),
    chainageTo: z.string().optional(),
    lengthKm: z.number().positive().optional(),
    highway: z.string().optional(), // 'NH-58', 'SH-41'
    district: z.string(),
    state: z.string().default("Gujarat"),
    location: z.tuple([z.number(), z.number()]).optional(), // [lat, lng]

    startDate: z.string().date().optional(),
    completionDate: z.string().date().optional(),
    expectedDate: z.string().date().optional(),

    progressPercent: z.number().min(0).max(100).optional(),
    progressUpdated: z.string().date().optional(),

    milestones: z.array(Milestone).default([]),

    /*
     * Alt text minimum 10 characters, not .min(1) — R6 §3 is direct that
     * .min(1) just invites "." . The competitor ships nearly every <img> with
     * an empty alt.
     */
    heroImage: z.object({ src: z.string(), alt: z.string().min(10) }),
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
  .refine(
    (p) =>
      p.status !== "ongoing" ||
      (p.progressPercent !== undefined && p.progressUpdated),
    { message: "Ongoing projects require progressPercent AND progressUpdated" },
  )
  .refine((p) => p.status !== "completed" || p.completionDate, {
    message: "Completed projects require completionDate",
  })
  .refine((p) => !p.featured || p.heroImage.src, {
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
  validUntil: z.string().date().optional(),
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
