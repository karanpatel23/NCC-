# NCC Infraspace — review package

Prepared before any further content change. Nothing in sections 4 to 9 below has been built.

## 0. What is already done, and why it went ahead

You said "go" to the earlier quality pass, and your new brief says to continue already approved
technical fixes independently. That work is complete and is **not** waiting on this package:

| | |
|---|---|
| 57 project descriptions rewritten | 39 were raw tender text. Every road name, chainage, package number, district, scheme and year preserved. Typos fixed: strendhning, Vallbhipur, Strenthening, Dhandhua, lanning, Strengthning |
| Punctuation | Em dash, en dash, semicolon, exclamation, ellipsis: **0 in rendered text on every page** |
| Type system | 86 hardcoded sizes across 13 px values collapsed onto one scale. Added `--text-caption` and `--text-display`. **0 hardcoded sizes remain** |
| Page headers | Two systems (navy band vs white) unified into one `<PageHeader>`. 7 pages, 0 local copies |
| Open Graph | Was absent sitewide. Added, with a generated `opengraph-image` |
| 404 | Was Next's stock page. Now a real page with routes and office contact |
| Accessibility | Fixed `<ul>` containing `<div>` (Reveal now renders as `li`) |
| Chainage rail | Was drawing over the footer. Footer is now a rail-quiet region |
| Dead code | 958 lines removed: image-stream-hero, project-reel-hero, project-card, counter |
| Decorative icons | lucide Phone/Mail/MapPin removed from Contact |
| Homepage | Four identical capability cards replaced with an asymmetric editorial block; closing CTA added |
| Lint | 4 problems to **2** |

Two judgment calls I made and am flagging rather than hiding:

1. **"Every journey has a reason." is untouched.** "journey" is on your banned list, but this is
   owner-approved hero copy marked fixed at R15 and R16, and the whole bridge composition is built
   around it. A later style rule should not silently overwrite a specific approval. **Your call.**
2. **CSR heading changed** from "Commitment beyond the contract." to "Work that outlasts the
   contract." That line was mine, not approved copy, and "beyond" is banned.

---

## 1. Content and asset allocation register

| Subject | Primary page | Source / approval | Image assigned | Duplicate to remove |
|---|---|---|---|---|
| Motto, credentials panel | Home (hero) | Owner, R8 / R16 | bridge-construction-navy.png | — |
| Everyday journeys copy | Home | Owner approved R15 | (none) | — |
| Road plan blueprint | Home | R12 / R13 | SVG, generated | — |
| Four headline capabilities | Home | Registry `lib/capabilities.ts` | (none) | **Also on /about and /capabilities** |
| 57 project sheets | /projects | Archive, R11 | one hero each | **100% duplicated on /projects/completed** |
| Full scope, authority, chainage, gallery | /projects/[slug] | Archive | gallery | listing carries the same hero |
| 8 approved capabilities | /capabilities | Registry, R20 | (none) | shares 4 with Home and /about |
| Origins, heritage, identity | /about | R8 | **highway-01.jpg (belongs to Bagodara)** | image reused from /projects |
| Application route | /careers | Owner R20 | (none) | mailbox shared with footer (permitted) |
| Company support, founder offices | /csr | Recovered source, R20 | (none) | — |
| Offices, telephone, email | /contact | Owner R8 | (none) | addresses repeated in footer |

## 2. Duplicate findings

**Exact duplicates: 80 sentences.** All of them are `/projects` vs `/projects/completed`. Because
all 57 projects are completed, the two routes render **identical** content. This is the largest
single duplication on the site and it is structural, not editorial.

- `/projects/ongoing` renders an empty page with an explanatory paragraph.
- Proposed: keep `/projects` as the file. Make `/projects/completed` and `/projects/ongoing`
  **redirect** to it, or retire them. They were justified in R11 by a competitor teardown that
  assumed a mixed portfolio; with 57/57 completed that reasoning no longer holds. **Needs your
  decision because it changes URLs, which are protected.**

**Near-duplicate (semantic): 1 real cross-page pair.**
- Home CTA "Each one carries its authority, scope and chainage" vs /projects intro "Each sheet
  carries the authority and scope". 0.75 similarity. I wrote the Home line an hour ago. Will fix.

**Duplicate images: 5 files on more than one page.**

| Image | Pages | Fix |
|---|---|---|
| highway-01.jpg | /projects, /projects/completed, **/about**, detail | Remove from /about. About gets portraits instead |
| site-02.jpg | listing, completed, detail | Bilodara has 14 photos. Listing keeps site-02, detail uses the other 13 |
| chiloda-nh147.jpeg | listing, completed, detail | **Single photo.** Per your §4, listing becomes a typographic card, photo exclusive to detail |
| mp-mdr-bridge.jpeg | listing, completed, detail | Single photo. Same treatment |
| kheda-rb-roads.jpeg | listing, completed, detail | Single photo. Same treatment |

`nataraja.webp` appears on all 13 pages. That is the logo, permitted as shared navigation.

## 3. Grep results

**Before:** em dash 17 source / 28 rendered · en dash 23 source / 66 rendered · ellipsis 8 ·
semicolon 0 · exclamation 0 · emoji 0.

**After:** all zero in rendered text on all 13 pages. Remaining source hits are code comments,
CSS `!important`, and HTML entities (`&rsquo;`, `&rarr;`).

**Banned vocabulary after:** one term remains, "journey" ×2 on Home, held pending your decision.
No banned structures anywhere.

## 4. Proposed: Our Clients

32 distinct client strings exist in the records, but many are the same body written three ways:
`Executive Engineer R and B Panchayat Division Ahmedabad` appears as three spellings totalling
14 projects. Real distinct bodies: roughly 20.

**Grouped, with project counts from the records:**

| Group | Projects | Bodies |
|---|---|---|
| State Roads and Buildings divisions | 33 | Ahmedabad, Botad, Anand, Bhavnagar, Kheda, Navsari, Chhotaudepur, Himatnagar, Modasa, Nadiad |
| Municipal bodies | 9 | Amdavad Municipal Corporation, Gandhinagar Municipal Corporation, Valsad Municipality |
| Development authorities | 5 | AUDA, Gandhinagar Smart City Development Ltd, GUDC |
| Industrial and SEZ | 3 | GIDC Baroda, GIFT SEZ, Dediyasana Industrial Estate Association |
| State departments | 2 | Public Health Works Division, Surat |
| Rail | 1 | Gujarat Rail Infrastructure Development Corporation |
| Other state governments | 1 | PWD Madhya Pradesh |
| National Highway | 1 | National Highway Division, Ahmedabad (a state division) |

**Logos: 14 recovered. Only 6 are safe to use.**

Verified against the 57 records: Gujarat R&B ✓ · Amdavad Municipal Corporation ✓ · Gandhinagar
Municipal Corporation ✓ · AUDA ✓ · GIFT City ✓ · MP PWD ✓

**Must NOT ship as clients, no record evidences them:** NHAI, NABARD, MORTH, Government of India
emblem, UP PWD, **Adani**. `decisions-for-owner.md` item 7 raised exactly this. PMGSY is a scheme,
not a client, and 3 records reference it. Using a national emblem as a client logo on a
tender-facing page is the specific risk.

**Proposed interaction:** a grouped grid, monochrome wordmarks and logos at equal weight, colour
on hover or tap. Selecting a client reveals project count, work types, districts and links to the
records. Filter by group. Data in `content/clients/*.mdx` so you can edit without touching layout.

## 5. Proposed: About rebuild

Current page is the only one still on the old layout and it reuses a Bagodara photograph.

Proposed structure: opening statement (who, what, where, one image) · timeline of real dates ·
leadership in NCC roles only · approved vision · footprint map of districts derived from the 57
records, linking to projects · closing CTA.

**Blocked on two things:**
- **Portraits.** Recovered: K. K. Patel at 736×1016, usable. Akshay Patel at 183×244, **too small
  to publish**. A new photograph is needed, or leadership ships with one portrait.
- **Timeline dates.** Only 1987 (founding) and 9 April 2015 (incorporation) are established. The
  recovered site has a 2021 to 2024 milestone list naming a project per year, which is usable, but
  every other date would be invented.

Vision statement, recovered verbatim: *"Striving for perfection in order to establish a prominent
position, by exemplary performance, state of art quality work, thereby providing almost
satisfaction to all the stakeholders."* It contains a likely typo, "almost" for "utmost", and
"state of art" is on your banned list. **Publish corrected, publish verbatim, or omit?**

## 6. Proposed: illustration subjects

One page each, navy/slate/copper line work, no NCC branding, no model names or capacities.

| Subject | Page | Why there |
|---|---|---|
| Road cross section, layers and shoulders | /capabilities, Roads and highways | Explains the specs beside it |
| Bridge or culvert section | /capabilities, Bridges | The one capability with no photograph |
| Canal section | /capabilities, Irrigation | Same |
| Bank protection section | /capabilities, River protection | Same |
| Surveying instrument study | /careers | Your suggestion, and Careers has no image |
| District footprint map | /about | Derived from real record geography |

Not on CSR, Contact or Credentials, per your §8.

## 7. Fonts

Archivo (display) + IBM Plex Sans (body) + IBM Plex Mono (figures). Not Inter or Poppins. Plex Sans
and Plex Mono are one superfamily, so this is arguably two. **I recommend keeping all three**: the
mono carries the chainages, values and package numbers and is most of the engineering character.
Dropping it would cost more than it gains. Type scale is now one system with tabular numerals.

## 8. Changes touching protected content, flagged not made

1. `/projects/completed` and `/projects/ongoing` duplicate or empty. Fixing changes URLs.
2. The homepage credentials panel repeats Established, Class AA, Turnover and Crisil, which also
   appear in the footer and are barred from new pages by the standing R8 flag. Consolidation needs
   your approval before I touch the hero.
3. The four headline capabilities appear on Home, /about and /capabilities. Under your §3 only one
   page may own them. Removing them from Home means editing the approved hero's neighbouring
   section.

## 9. TODO, real content I need from you

1. Class AA certificate file, plus registration number and validity. Permission granted, document
   absent. It is listed as unavailable in the archive findings.
2. Confirmation of FY24 turnover and the Crisil rating, or instruction to drop both.
3. A publishable photograph of Mr Akshay Patel.
4. NCC titles and responsibilities for both directors.
5. Real milestone dates for the About timeline.
6. Decision on the vision statement wording.
7. Client logo confirmation, and whether NHAI, NABARD, MORTH, UP PWD and Adani have any basis.
8. Decision on `/projects/completed` and `/projects/ongoing`.
9. Decision on "Every journey has a reason."
