# NCC Infraspace — Brief Revision 6
### `docs/01-requirements-r6.md` · Supersedes §7 (Content model / CMS) and §8 (Maintenance workflow) of the main brief
**Decision:** no CMS. Content lives in the repo as typed MDX, validated at build time.

---

## 1. Why the answer changed

The Sanity recommendation rested on one assumption: that the client's office staff would edit the
site, and therefore needed an interface a non-developer could use without breaking anything. You're
the only editor, and you work in Claude Code. That assumption is gone, and with it most of Sanity's
value.

| | Sanity | Repo content |
|---|---|---|
| Editing UI for non-developers | ✓ Its main advantage | ✗ |
| Editing speed *for you* | Open browser, log in, click through | Say "set Dharoi to 78%" in Claude Code |
| Content versioned with the code | ✗ Separate history | ✓ Same commit, same diff, same rollback |
| Works offline | ✗ | ✓ |
| Preview before publish | ✓ Draft mode | ✓ `next dev` |
| Image handling | CDN transforms | `next/image` + sharp at build |
| Validation | Studio warnings, publish-time | **Build fails.** Stronger |
| External dependency | Account, API keys, free-tier limits, another service to remember | None |
| Cost | Free tier, then not | £0 forever |

The decisive one is validation. In Sanity, a required field is a warning in an editor someone can
work around. In the repo, a project missing its client or its alt text is a **failed build** — the
site physically cannot deploy in that state. Maruti's site shipped Lorem ipsum and `info@example.com`
because nothing stopped it. This stops it.

**The cost of this choice:** you can't edit from a phone, the client can never edit it themselves
without a migration, and there's no non-technical handover path. If NCC's office might want to
update progress percentages themselves in a year, say so now and we go back to Sanity — the schema
below is designed so that migration is mechanical, but it's still work you'd rather not do twice.

---

## 2. Layout

```text
content/
├── projects/
│   ├── dharoi-4-lane-major-bridge/
│   │   ├── index.mdx            # frontmatter + scope narrative
│   │   └── images/
│   │       ├── hero.jpg
│   │       ├── 01-deck-casting.jpg
│   │       └── 02-completed-span.jpg
│   └── nh58-km82-86-widening/
│       └── …
├── segments/                    # capabilities: highways, bridges, irrigation, protection
├── leadership/
├── clients/                     # name + logo
├── credentials/                 # registrations, certifications, awards
├── careers/
└── site.ts                      # nav, footer, offices, company facts, default SEO
```

Images live beside the project that uses them. Moving a project moves its photography; deleting one
can't orphan assets. `next/image` reads them at build, emits AVIF and WebP at the sizes actually
requested, and generates blur placeholders automatically — the same outcome Sanity's CDN was buying,
without the CDN.

---

## 3. Schema

`lib/content/schema.ts`, Zod. This is the enforcement layer, so it should be read as the rules from
R1 §7 made executable.

```ts
import { z } from 'zod';

export const Milestone = z.object({
  title: z.string().min(3),
  date: z.string().date(),
  description: z.string().min(20),
  status: z.enum(['complete', 'current', 'upcoming']),
  chainage: z.string().optional(),          // 'Km 84/500'
  images: z.array(z.string()).default([]),
});

export const Project = z.object({
  title: z.string().min(6),
  status: z.enum(['ongoing', 'completed', 'awarded']),
  category: z.enum(['highways', 'bridges', 'irrigation', 'protection']),
  client: z.string().min(2),                 // required — Maruti rule
  authority: z.string().optional(),
  contractValueCr: z.number().positive(),    // required — Maruti rule
  scopeSummary: z.string().min(20).max(220),
  chainageFrom: z.string().optional(),
  chainageTo: z.string().optional(),
  lengthKm: z.number().positive().optional(),
  highway: z.string().optional(),            // 'NH-58', 'SH-41'
  district: z.string(),
  state: z.string().default('Gujarat'),
  location: z.tuple([z.number(), z.number()]).optional(),   // [lat, lng]
  startDate: z.string().date().optional(),
  completionDate: z.string().date().optional(),
  expectedDate: z.string().date().optional(),
  progressPercent: z.number().min(0).max(100).optional(),
  progressUpdated: z.string().date().optional(),
  milestones: z.array(Milestone).default([]),
  heroImage: z.object({ src: z.string(), alt: z.string().min(10) }),   // alt required
  gallery: z.array(z.object({
    src: z.string(), alt: z.string().min(10), caption: z.string().optional(),
  })).default([]),
  featured: z.boolean().default(false),
  displayOrder: z.number().int().default(99),
  seo: z.object({ title: z.string().max(60), description: z.string().max(155) }).optional(),
})
.refine(p => p.status !== 'ongoing' || (p.progressPercent !== undefined && p.progressUpdated),
  { message: 'Ongoing projects require progressPercent AND progressUpdated' })
.refine(p => p.status !== 'completed' || p.completionDate,
  { message: 'Completed projects require completionDate' })
.refine(p => !p.featured || p.heroImage.src,
  { message: 'Featured projects appear in the corridor and need a hero image' });
```

Same treatment for the other types. The rules worth carrying over specifically:

- **Alt text minimum 10 characters** on every image. Not `.min(1)` — that just invites `"."`.
- **Leadership requires a real bio** (`.min(80)`) and has **no phone or email field at all**. The
  field that doesn't exist can't ship someone else's demo phone number.
- **Awards require a body** (`.min(40)`). Lorem ipsum is 40+ characters, so this isn't a guarantee —
  but it stops an empty card from rendering, which is the actual failure.

### Wiring it to the build

`lib/content/load.ts` reads the directory, parses frontmatter with `gray-matter`, and runs
`Project.parse()` — not `safeParse`. A throw at module scope during `next build` is the point: a
malformed project stops the deploy rather than rendering half a card.

Add `npm run content:check` that validates everything and prints a readable report, so you can catch
it before pushing rather than in Vercel's log.

---

## 4. Your actual workflow

**Add a project:** in Claude Code —

> "Add a project: Dharoi 4-lane major bridge, R&B Gujarat, ₹42 Cr, NH-58 Km 82/00–86/00, 3.3 km,
> Mehsana district, started March 2024, ongoing at 73% as of August 2026. Photos are in ~/Desktop/dharoi."

It creates the folder, writes validated frontmatter, copies and renames the images, and tells you
which required fields you didn't give it. Commit, push, Vercel builds in ~60 seconds.

**Update progress:** change one number and `progressUpdated`, commit, push. About twenty seconds of
work. This is the thing you'll do monthly, so it had to be cheaper than opening a browser and logging
into something — and it is.

**Add a milestone:** append an object to the `milestones` array. It appears in the timeline and on the
chainage rail automatically.

**Preview:** `next dev`. Real preview of the real thing, no draft mode required.

The `Progress as of [date]` stamp from the main brief §8 stays. Same two reasons: it's honest, and a
visibly stale date creates pressure to update in a way a stale page never does.

---

## 5. Migration path, if the client ever takes over

The schema is deliberately CMS-shaped — flat fields, arrays of objects, no MDX-specific structures
except the one narrative body. Migration is a script that reads each `index.mdx`, maps frontmatter to
Sanity documents, and uploads the images. A day's work, not a rebuild.

**Don't pre-build for this.** Adding a CMS abstraction layer now to make a migration you may never do
slightly easier is exactly the kind of speculative complexity that makes projects rot. If it happens,
write the script then.

---

## 6. Phase B, revised

| | Old (Sanity) | New |
|---|---|---|
| Deliverable | Sanity project, schemas, Studio at `/studio`, seed content | `content/` tree, Zod schemas, loader, `content:check`, three real projects seeded |
| Gate | "You can add a project in the Studio" | **Add a project by talking to Claude Code, see it live in `next dev`, and watch `content:check` reject a deliberately broken one** |

That second half of the gate matters — verify the validation actually fails the build, because a
validation layer nobody has seen fail is a validation layer nobody knows is wired up.

**`/studio` is removed from the route map.** So is the CMS row in the tech stack table.

---

## 7. Outstanding

| Item | Status |
|---|---|
| ~~§12 Q1 — who edits~~ | **Answered. Phase B unblocked** |
| Logo vector + R5 §4 decision (mono-on-dark vs recolour) | Blocking phase C polish |
| **Project data** | **Now the critical path.** Phase B seeds three real projects — it needs three real ones |
| Project photography | Pre-launch; gates the corridor swap |
| Contact details + domain email | Pre-launch |
| Domain DNS control → Vercel | Pre-launch |

---

## Implementation notes (appended by Claude Code, not part of the owner's brief)

### Built

| Item | Status |
|---|---|
| `content/` tree + `content/README.md` | ✅ |
| `lib/content/schema.ts` — Zod, all eight types | ✅ |
| `lib/content/load.ts` — `.parse()`, throws at module scope | ✅ |
| `npm run content:check` | ✅ exits 1 on failure |
| Three real projects seeded | ❌ **blocked — see below** |

`zod`, `gray-matter` and `tsx` added. Sanity, `next-sanity` and `@sanity/*` were never installed, so
there was nothing to remove; `/studio` was never routed.

### The gate's second half is verified — the first half is blocked

R6 §6 splits the gate in two. The half that could be proven, was:

A deliberately invalid project was written to `content/projects/`, and `content:check` reported every
violation at once and exited **1**:

```
✗ deliberately-broken  title: Too small: expected string to have >=6 characters
✗ deliberately-broken  client: Invalid input: expected string, received undefined
✗ deliberately-broken  contractValueCr: Too small: expected number to be >0
✗ deliberately-broken  scopeSummary: Too small: expected string to have >=20 characters
✗ deliberately-broken  heroImage.alt: Too small: expected string to have >=10 characters
✗ deliberately-broken  gallery.0.alt: Too small: expected string to have >=10 characters
```

Both Maruti-specific rules fired: the missing `client`, and an alt text of `"."` rejected — which is
exactly why §3 specifies `.min(10)` rather than `.min(1)`.

Separately confirmed that `loadProjects()` **throws** rather than skipping, so `next build` cannot
complete with a malformed project. The fixture was then removed and the build verified clean.

**The first half — "add a project and see it live" — cannot be done.** It needs three real projects,
and §7 now lists project data as the critical path. Seeding invented ones would be precisely the
failure this whole schema exists to prevent.

### One Zod behaviour worth knowing

The three `.refine()` rules — ongoing-requires-progress, completed-requires-completionDate,
featured-requires-hero — only run **after** the base object parses. A project failing a field-level
rule reports the field errors and the refines stay silent until those are fixed. Not a defect, but it
means `content:check` can need two passes on a badly broken record.

### Image existence is checked outside the schema

Zod validates that `heroImage.src` is a string; it cannot know whether the file exists.
`content:check` resolves each `src` against the project directory and reports missing files, because
a valid-but-broken image path is still a broken page.
