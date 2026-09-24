# R21 — owner decisions implemented

## 1. Routes
`/projects` is canonical. `/projects/completed` and `/projects/ongoing` are **301** redirects
(`statusCode: 301`, not Next's default 308). Both page files are deleted. The `ongoing` status
stays in `lib/content/schema.ts` and in `projectTotals()`, so adding ongoing work is a content
change and the redirect comes out.

## 2. Clients
New page at `/clients`, in the Company menu. Data in `content/clients.ts`, loader in
`lib/content/clients.ts`.

**All 14 logos are owner-verified and published**, including NHAI, MoRTH, NABARD, the Government
of India emblem, UP PWD and Adani. The earlier flag is withdrawn: the owner is the authority on
the relationship, and the 57 records are a recovered 2018 to 2023 tender file rather than a
lifetime history. Seven clients carry no linked record and render without project links, each
with a `todo` for the owner to attach the work.

The three spellings of the Ahmedabad Roads and Buildings division are merged into one client
covering 19 projects. PMGSY is labelled a scheme, not an awarding body.

The loader **fails the build** if any project matches zero or more than one client, so a contract
cannot silently detach from its authority.

GIFT City renders as a wordmark: the recovered logo is 89 by 70 pixels.

## 3. Hero copy
`Every journey has a reason.` untouched.

## 4. Vision
Published on `/about` verbatim, including "state of art" and "almost satisfaction", with a code
comment recording that it is owner-approved and exempt from the house rules.

## 5. Credentials — one item held, see the flag below
Hero panel untouched. **There is no credentials duplicate in the footer**: the footer carries the
CIN, the offices, the phone and the email, and none of the four credential facts. Nothing was
removed because nothing matched.

## 6. Capabilities
Expertise owns them. Home renders four short links only. About no longer mentions them.

## 7. Leadership
Text-only cards in `content/timeline.ts`, both roles and responsibilities as `TODO(owner)`
placeholders. No portraits.

## 8. Timeline
`content/timeline.ts`, six entries: 1987, 2015, and the 2021 to 2024 milestones recovered from
`src/home/milestoneslider/MilestoneSlider.js`, which names the year against each project. Every
slug verified against `content/projects`.

## 9. Illustrations
`components/engineering-drawings.tsx`: road section, bridge section, canal section, bank
protection on Expertise, surveying level on Careers. One page each, no branding, no model names,
no capacities, no drawing numbers. A plant schematic is not drawn, per the owner's condition.

## 10. Geographic positioning
Removed from positioning copy, metadata, Open Graph and alt text. `COMPANY.positioning` is now
"Infrastructure contractor since 1987."

The footprint map on `/about` is drawn at **India scale** from `content/footprint.ts`; adding a
state is one line. The outline is generated from coarse longitude and latitude boundary points so
the shape and the markers share one projection. It is framed as work delivered to date.

38 mentions of Gujarat or Madhya Pradesh remain in rendered text. Every one is a project
location, a client's legal name, the Class AA issuing authority, the registered office address,
a footprint figure or a founder's named office. None is a positioning statement.

## Content work carried in the same pass
**43 MDX bodies removed.** They were the raw tender text the rewritten `scopeSummary` fields were
derived from, and the detail template prints the body when one exists, so the detail pages were
still showing unedited tender prose. Every fact already survives in the summary. 14 hand-written
bodies are kept.
