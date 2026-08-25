# NCC Infraspace — Design & Build Brief
### `docs/01-requirements.md` · Phase 3 deliverable
**Beats:** https://marutiinfracreation.com/ (Maruti Infracreation Pvt Ltd)
**Builds:** a self-maintainable, content-driven site for NCC Infraspace Pvt Ltd

---

## 1. Objective and audience

**Primary job of this site:** establish NCC Infraspace as a credible, current, technically serious
road-and-bridge contractor to people who are deciding whether to trust it with public money.

**Audience, in priority order:**

| # | Audience | What they need | What they do next |
|---|---|---|---|
| 1 | Tender / department evaluators (NHAI, R&B Gujarat, Railways, municipal bodies) | Proof of scale, registration class, completed work of comparable value, live execution capacity | Verify credentials, download profile PDF |
| 2 | JV partners and large subcontractors | Track record, ongoing capacity, financial standing | Contact leadership |
| 3 | Engineers and site staff considering employment | That the company is modern, active, and worth joining | Apply |
| 4 | Suppliers, banks, rating analysts | Legitimacy and current project load | Contact / download |

This is **not** a lead-generation site. Nobody is impulse-buying a highway. Every design decision
should be measured against *"does this make a government evaluator take NCC more seriously?"* —
which, importantly, is a bar that both flashy-and-empty and dated-and-honest sites fail.

---

## 2. Competitor teardown — marutiinfracreation.com

Analysed directly from the live homepage. This is the site to beat, and it is beatable.

### Their stack
WordPress + **Elementor 3.22.3**. Google Fonts. Standard `wp-content/uploads` media. Confirmed from
the `generator` meta tag.

### Their structure (worth studying — it's the right *shape*)
```
Home  ·  Projects  ·  Group Concerns  ·  About Us  ·  Career  ·  Contact Us
```
Homepage flow: hero slogan → company narrative → 4 business segments → animated stat counters →
**Major Completed Projects** (6) → **Major Ongoing Projects** with % progress → leadership (3) →
awards → client logos → footer.

The **ongoing-projects-with-progress-percentage** pattern is genuinely good and is exactly what you
described wanting. Take the pattern; execute it properly.

### Where they are broken — our checklist to beat

| Their failure | Evidence on their live site | What we do |
|---|---|---|
| **Unreplaced template dummy data** | All three leadership cards show `+1 (859) 254-6589` and `info@example.com` — an American demo number on a Gujarat contractor's site | Real contacts, or no contact field at all |
| **Lorem ipsum in production** | Gujarat Conex Awards 2023 card body is `Lorem ipsum dolor sit amet…` | Every field populated or the component doesn't render |
| **Elementor demo copy left in** | "A small river named Duden flows by their place" appears under every director | — |
| **No page title** | `<title>` is literally `marutiinfracreation` | Per-page titles, templated from content |
| **Unrenamed default slug** | Group Concerns lives at `/elementor-10/` | Semantic slugs throughout |
| **Broken stat counters** | Renders "Project Completed **0 +**", "On going Project **1 +**" | Counters animate from real CMS numbers, correct value in HTML for no-JS/crawlers |
| **Unoptimised media** | Project galleries are raw `WhatsApp-Image-2024-08-21-at-11.05.37-AM.jpeg` uploads | CMS image pipeline: AVIF/WebP, responsive srcset, LQIP blur |
| **No alt text** | Nearly every `<img>` ships empty | Alt text required at the CMS level |
| **Stray editor artifacts** | A bare word `business` sits between sections | — |
| **Thin project records** | A title and one sentence of tender scope. No value, no duration, no client, no location, no milestones | Full project schema — §7 |
| **No structured data** | No schema.org markup | Organization + Project + JobPosting JSON-LD |

**Strategic read:** they invested in *having* a website and nothing in maintaining it. Their content
decayed in place because editing an Elementor page is a chore. Our advantage isn't animation — it's
that ours will still be accurate in 2028. Design for that.

### One factual note worth knowing
Their registered office is *1st Floor, Royal House, Radhanpur Road, Mehsana – 384002*. One of the
addresses on record for NCC Infraspace is *Royal House, 2nd Floor, Radhanpur Char Rasta, Mehsana*.
Same building. Their Dharoi project gallery also uses filenames beginning `Nat-ConstructionPhotos-`.
Not drawing a conclusion from that — flagging it so you're not blindsided if there's shared history,
a JV, or a family connection you should be handling diplomatically.

---

## 3. Positioning

Maruti leads with *"Pioneering Construction and Development for a Modern World"* — generic, could be
any contractor on earth, and their own copy admits it by following with three paragraphs of
boilerplate.

NCC has two things Maruti's homepage cannot claim as directly:

1. **1987.** The firm has been building continuously since before liberalisation, originally as
   Natraj Construction Company. That's 38 years. Maruti says 1993.
2. **Class AA registration with the Government of Gujarat.** A hard, verifiable credential that
   directly maps to what tender evaluators check first.

**Positioning line to build the site around** (draft — refine with the client):

> Building Gujarat's roads and bridges since 1987.

Concrete, verifiable, dated, and geographically anchored. No adjectives to disbelieve.

---

## 4. Design direction

The brief says animations, 3D, modern layout, fonts, colour. Here's the specific point of view,
rather than "modern" in the abstract. **Every choice below is derived from the subject: highway
engineering in Gujarat.** That's what stops it looking like a template.

### 4.1 Palette — "Signboard"

Sourced from Indian National Highway signage and road materials, not from a generic construction
orange.

| Token | Hex | Role |
|---|---|---|
| `--bitumen` | `#101315` | Deep base. Hero, footer, immersive sections |
| `--signboard` | `#0B5D3B` | Primary brand. Taken from NH directional signage green |
| `--retro` | `#F5C518` | Accent, used *sparingly*. Retroreflective route-shield yellow |
| `--concrete` | `#EAE7E1` | Light surface, cards, alternating sections |
| `--chalk` | `#F8F7F4` | Page background |
| `--rebar` | `#8A8F98` | Hairlines, dividers, muted metadata |

Rules: `--retro` never covers more than ~5% of any viewport — it marks, it doesn't fill. No gradients
on brand surfaces. Green and yellow together only in the chainage rail and progress indicators, where
they carry meaning.

### 4.2 Typography

| Role | Face | Usage |
|---|---|---|
| Display | **Archivo** (variable, Expanded width, 700–800) | Headlines. The expanded width reads as signage, not as a startup landing page |
| Body | **IBM Plex Sans** (400/500) | All prose |
| Data | **IBM Plex Mono** (500) | Chainage, contract values, dates, km, percentages, tender numbers |

Why Plex: the family carries a genuine engineering register, sans and mono are designed together, and
**Plex Devanagari exists** — so a Hindi or Gujarati version later is a font-swap, not a redesign.

Mono for numbers is not decoration. On this site every number is a *measurement* — `Km 82/00 to 86/00`,
`₹302.42 Cr`, `3.300 km`, `89%` — and setting measurements in mono is how engineering documents read.

Scale: 1.25 ratio, `clamp()` fluid from 390px to 1440px. H1 caps at ~72px desktop / 40px mobile.
Display in sentence case, never all-caps except in the chainage rail and eyebrow labels.

### 4.3 Signature element — the chainage rail

**This is the one bold idea. Everything else stays quiet.**

Roads are measured in *chainage* — every NCC tender document reads `Km 88.565`, `Ch. 153.000`,
`Km 90/15–91/1`. So the site's structural device is a road, not a set of numbered cards.

- A thin vertical rail runs down the left gutter on desktop (≥1280px), rendered as a road edge:
  hairline in `--rebar`, tick marks every section, `--retro` chainage numbers in mono.
- As you scroll the homepage, the rail ticks through chainage values and the current section label
  sticks to it. Sections aren't "01 / 02 / 03" — they're `Km 0.000`, `Km 1.200`, `Km 2.450`.
- **On a project page, the rail stops being a metaphor and becomes real data**: the actual chainage
  range of that project, with milestone markers positioned at their real chainage, and the completed
  portion filled to the true progress percentage.
- Below 1280px the rail collapses into a slim top progress bar. It is decorative-only to screen
  readers (`aria-hidden`), and section headings carry the real semantics.

This is defensible because it encodes something true about the content. Numbered markers wouldn't.

### 4.4 Motion policy

Framer Motion (`motion`) throughout. Orchestrated moments, not scattered effects.

| Where | Behaviour |
|---|---|
| Page load | Single staged reveal: rail draws in → headline words rise 12px staggered 40ms → hero media fades. ~900ms total, once |
| Scroll | `whileInView` reveals, 24px rise + fade, 500ms, `ease-out`, **once: true** — never re-animate on scroll-back |
| Stat counters | Count up on first view from the real CMS value. The correct number is in the HTML from the start; JS only animates toward it |
| Progress bars | Fill to real % on view, 800ms, mono label counts with it |
| Cards | Hover: 1.5px lift, hairline shifts `--rebar` → `--signboard`, image scales 1.03 inside `overflow:hidden`. 200ms |
| Client logos | Continuous marquee, pauses on hover and on `prefers-reduced-motion` |
| Route change | 200ms crossfade, no layout slide |

**Hard rule:** `prefers-reduced-motion: reduce` disables all transform and opacity animation, kills the
marquee, kills the 3D scene, and jumps counters straight to final values. Non-negotiable.

### 4.5 3D — where it earns its place

Straight answer: **3D everywhere would hurt this site.** The audience is government staff on Indian
mobile networks and office desktops running old Chrome. A heavy WebGL hero costs you LCP, battery, and
credibility with exactly the people you're trying to impress. Maruti's site is bad, but it is *fast*.

So 3D goes in **one place, where it carries information**:

**The Project Map.** An interactive extruded map of Gujarat (plus the out-of-state projects —
Nagpur, Jhabua) with every project as a pin, height-coded by contract value and colour-coded by
status. Rotate, tap a pin, deep-link to that project. This is genuinely useful — it answers
"where do they work and how much have they done" in one glance — and it is the section people will
screenshot and send to a colleague.

Implementation contract:
- React Three Fiber + drei, dynamically imported, **below the fold**, `ssr: false`
- Hard budget: **≤400 KB gzipped** for the 3D chunk, **≤60 KB** for geometry
- Static rendered PNG fallback with the same pins as `<a>` links — shown on `prefers-reduced-motion`,
  on `navigator.connection.saveData`, on WebGL failure, and to crawlers
- Never blocks LCP. If it isn't visible, it isn't downloaded

Optional second use, later: a scroll-driven ROB (rail-over-bridge) cross-section that assembles as you
scroll on one flagship project page. Phase 2 only, and only if the map ships clean.

### 4.6 Layout

- Container 1280px, content column 1120px, generous 96–140px section rhythm on desktop
- 12-column grid, 24px gutters; collapses to 6 at 834px, 4 at 390px
- Asymmetry is deliberate: project cards alternate 7/5 and 5/7 splits rather than sitting in a tidy
  3-across grid. Roads aren't symmetrical
- Border radius: **2px**. Effectively square. Infrastructure isn't soft. The only rounded thing on the
  site is the map pin
- Shadows: almost none. Depth comes from hairlines and surface colour shifts. One shadow token
  (`0 1px 2px rgb(16 19 21 / 0.06)`) for the sticky header only

---

## 5. Sitemap

```text
/
├── /about                          Company story, 1987 heritage, leadership, certifications
├── /projects                       Filterable index — the centrepiece
│   ├── /projects/[slug]            Project detail w/ timeline, gallery, chainage rail
│   ├── ?status=ongoing             Filter state, shareable URL
│   ├── ?category=bridges           Highways · Bridges · Irrigation · Urban & Protection
│   └── ?client=nhai
├── /capabilities                   Business segments, plant & machinery, technical capacity
│   └── /capabilities/[slug]        Segment detail
├── /careers                        Why NCC + open roles
│   └── /careers/[slug]             Role detail + application form
├── /contact                        Offices, map, enquiry form
├── /credentials                    Registrations, certifications, awards, rating, downloads
├── /privacy  /terms                Legal
├── /sitemap.xml  /robots.txt       Generated
└── /studio                         CMS admin (noindex)
```

---

## 6. Page specifications

### 6.1 Homepage

1. **Header** — logo left, nav centre, phone + "Enquire" right. Transparent over hero, solidifies to
   `--chalk` with hairline on scroll past 80px. 72px tall, 56px mobile.
2. **Hero** — full-viewport. Muted looping site footage or a single strong photograph under a
   `--bitumen` 55% scrim. H1: the 1987 positioning line. Sub: one sentence naming roads, bridges,
   Gujarat. Two CTAs: *View projects* (primary), *Company profile PDF* (ghost). Chainage rail begins
   at `Km 0.000`.
3. **Credentials strip** — immediately under the fold, `--bitumen` band, mono: `Est. 1987` ·
   `Class AA — Govt. of Gujarat` · `₹302 Cr turnover FY24` · `Crisil BBB-/A3`. This is the single
   highest-value section for audience #1 and it is above where Maruti puts anything comparable.
4. **Ongoing projects** — 3–4 cards with live progress. Chainage range, client, value, % complete,
   last-updated date. Proves the company is *currently working*, which no static brochure site does.
5. **Capabilities** — four segments. Take Maruti's categories as the sector standard: Highways,
   Bridges (ROB/RUB/river), Irrigation & Canals, River Front & Protection.
6. **Project map** — the 3D moment. §4.5.
7. **Completed work** — 6 flagship projects, alternating asymmetric layout, link to full index.
8. **Numbers** — animated counters from real CMS values. Projects completed, km delivered, structures
   built, years active.
9. **Clients** — logo marquee: MoRTH, NHAI, R&B Department Gujarat, Western Railway, etc.
10. **Careers teaser** — one line, count of open roles, link.
11. **Footer** — 4 columns, both office addresses, phone, domain email, socials, CIN, copyright with
    dynamic year.

### 6.2 Projects index

Filter chips (status, category, client, state) writing to URL query params so filtered views are
shareable — a real advantage when someone is sending a link to a tender committee. Sort by value,
completion date, or chainage length. Cards show status pill, title, client, value, location,
progress bar if ongoing. Empty state names what to clear.

### 6.3 Project detail — the template that matters most

Hero image + status pill → key facts table in mono (client, authority, contract value, scope,
chainage range, length, start date, completion/expected, current progress) → scope narrative →
**milestone timeline** (this is the "timeline details" you asked for: each milestone has date, title,
description, optional photos, and marks complete/current/upcoming) → gallery with lightbox →
location map → related projects.

### 6.4 Careers

Roles from CMS with department, location, experience, description, responsibilities. Application form
with CV upload. Include an anti-fraud notice — a serious contractor's careers page should state that
NCC never charges candidates a fee, which is standard practice for Indian infrastructure firms and
reads as institutional maturity.

---

## 7. Content model

**Recommended CMS: Sanity.** Reasons that matter for your specific requirement:
hosted Studio you don't maintain, a genuinely good editing UI for non-developers (so the client's
office staff can update progress percentages, not just you), a built-in image CDN with on-the-fly
transforms (which is what fixes the WhatsApp-photo problem structurally), array-of-object fields that
model milestone timelines cleanly, and a free tier that comfortably covers this.

*Alternative if you want everything self-hosted:* Payload 3 runs inside the Next app with Postgres.
More control, more ops. Pick Sanity unless you have a reason.

### Schemas

```ts
// project — the core content type
{
  name: 'project',
  fields: [
    { name: 'title',            type: 'string',  validation: required },
    { name: 'slug',             type: 'slug',    source: 'title' },
    { name: 'status',           type: 'string',  options: ['ongoing', 'completed', 'awarded'] },
    { name: 'category',         type: 'reference', to: 'segment' },      // highways | bridges | irrigation | protection
    { name: 'client',           type: 'reference', to: 'client' },       // NHAI, R&B Gujarat, Western Railway…
    { name: 'contractValueCr',  type: 'number',  description: '₹ crore' },
    { name: 'scopeSummary',     type: 'text',    rows: 3 },              // the one-line tender scope
    { name: 'description',      type: 'array',   of: [block] },          // rich text
    { name: 'chainageFrom',     type: 'string',  description: 'e.g. Km 82/00' },
    { name: 'chainageTo',       type: 'string' },
    { name: 'lengthKm',         type: 'number' },
    { name: 'highway',          type: 'string',  description: 'e.g. NH-58, SH-41' },
    { name: 'district',         type: 'string' },
    { name: 'state',            type: 'string',  initialValue: 'Gujarat' },
    { name: 'location',         type: 'geopoint' },                      // drives the 3D map pin
    { name: 'startDate',        type: 'date' },
    { name: 'completionDate',   type: 'date' },
    { name: 'expectedDate',     type: 'date',    hidden: status !== 'ongoing' },
    { name: 'progressPercent',  type: 'number',  validation: min 0 max 100, hidden: status !== 'ongoing' },
    { name: 'progressUpdated',  type: 'date',    description: 'Shown on site as "as of"' },
    { name: 'milestones',       type: 'array',   of: [{
        title, date, description, status: ['complete','current','upcoming'], chainage, images[]
    }]},
    { name: 'heroImage',        type: 'image',   options: { hotspot: true }, fields: [alt: required] },
    { name: 'gallery',          type: 'array',   of: [image + alt + caption] },
    { name: 'featured',         type: 'boolean', description: 'Show on homepage' },
    { name: 'displayOrder',     type: 'number' },
    { name: 'seo',              type: 'seo' },
  ]
}
```

Supporting types: `segment` (capabilities), `client` (name, logo, fullName), `leader` (name, role,
bio, photo, order — **with no dummy phone fields, deliberately**), `award` (title, body, year, image,
project ref), `certification` (name, issuer, number, validUntil, document), `jobOpening`,
`office` (label, address, phone, email, geopoint, hours), `siteSettings` (nav, footer, social,
company facts, default SEO), `page` (about/legal, portable text).

**Validation rules that prevent Maruti's failure mode:** alt text required on every image; a project
can't publish without client, value, and at least one image; `progressPercent` requires
`progressUpdated`; leadership requires a real bio (min 80 chars). If it's incomplete, it doesn't
render — the component returns null rather than shipping a placeholder.

---

## 8. Your maintenance workflow

This is the requirement that decides whether the site is still good in two years.

**Adding a project:** log in at `nccinfraspace.com/studio` → Projects → Create → fill fields → Publish.
A webhook fires `revalidateTag('project')`, the affected pages rebuild in ~2 seconds, and it's live on
the homepage, the index, the map, and the counters. No deploy, no code, no you.

**Updating progress on an ongoing project:** open the project, change `progressPercent`, set
`progressUpdated`, publish. ~15 seconds. This is the thing that will need doing monthly, so it has to
be that cheap or it won't happen.

**Adding a milestone:** open the project → Milestones → Add item → title, date, description, photos.
It slots into the timeline and the chainage rail automatically.

The site also surfaces a **"Progress as of [date]"** stamp on every ongoing project. Two purposes:
it's honest, and it creates visible pressure to keep the data fresh. A stale date is embarrassing in a
way a stale page is not.

---

## 9. Technical stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | **Next.js 15, App Router, TypeScript** | Server components by default. Fixes the current site's fatal SEO problem outright |
| Styling | **Tailwind CSS** + CSS custom properties for the tokens in §4.1 | Tokens live in `globals.css`, Tailwind reads them — one source of truth |
| Motion | **Framer Motion** (`motion` package) | §4.4 |
| 3D | **React Three Fiber + drei** | Lazy, budgeted, fallback — §4.5 |
| CMS | **Sanity** + embedded Studio at `/studio` | §7 |
| Images | `next/image` + Sanity CDN, AVIF/WebP, LQIP blur | |
| Forms | Server Actions + Resend, honeypot + rate limit | No third-party form SaaS |
| Analytics | Vercel Analytics or Plausible | Cookieless — avoids a consent banner entirely |
| Hosting | **Vercel** | You already run Orvix there |
| Fonts | `next/font` self-hosted, `display: swap`, subset | No Google Fonts request |

### Performance budgets — enforce these, they're the competitive edge
- LCP < 2.0s on 4G mobile · CLS < 0.05 · INP < 200ms
- Initial JS < 180 KB gzipped, **excluding** the lazy 3D chunk
- Lighthouse ≥ 95 across all four categories on mobile
- Every page must render its full content with JavaScript disabled

### Accessibility floor
WCAG 2.1 AA. Visible keyboard focus (`--retro` 2px ring). All interactive elements reachable by
keyboard. Reduced motion fully respected. Colour contrast ≥ 4.5:1 for body — check `--rebar` on
`--chalk` and darken it if it fails. The chainage rail is `aria-hidden`.

### SEO requirements
Per-page `title`/`description` from CMS · canonical URLs · OG + Twitter images generated per project
via `next/og` · JSON-LD: `Organization` sitewide, `Project`-as-`CreativeWork` per project,
`JobPosting` per role · generated `sitemap.xml` and `robots.txt` · semantic slugs.

Target queries: *road contractor Gujarat*, *bridge construction Mehsana*, *Class AA contractor
Gujarat*, *ROB construction contractor*. Do **not** try to rank for "NCC" — that's a fight against
NCC Limited and NCC AB you cannot win.

---

## 10. Build sequence for Claude Code

Phased so you can review at each gate rather than getting 40 files at once.

| Phase | Deliverable | Gate |
|---|---|---|
| A | Next.js + TS + Tailwind scaffold, design tokens, font loading, layout primitives, header/footer | Tokens render correctly at all three breakpoints |
| B | Sanity project, all schemas, Studio at `/studio`, seed 3 real projects | You can add a project and see it in the Studio |
| C | Static homepage with real content, no motion | Content and hierarchy right before anything moves |
| D | Projects index + detail template + milestone timeline | The core template works with real data |
| E | Motion layer: chainage rail, scroll reveals, counters, progress, marquee | Reduced-motion verified |
| F | 3D project map + static fallback | Budget verified: ≤400 KB gz, LCP unaffected |
| G | About, capabilities, careers, contact, credentials, legal | |
| H | SEO, JSON-LD, OG images, sitemap, a11y audit, Lighthouse | All budgets in §9 met |

### Using your installed skills
- **ui/ux pro max** — invoke at phase C and again at E for layout critique and interaction polish.
  Give it §4 as constraints, not a blank brief, or it'll drift toward its own defaults.
- **21st.dev** — best used at phase E for individual animated components (marquee, counters, reveal
  wrappers, card hovers). Pull components in, then **re-skin them to the §4.1 tokens and 2px radius**.
  Do not accept their default palette or rounded corners; that's how a site starts looking generic.
- Both skills will happily produce something that looks like every other AI-built site. The chainage
  rail, the mono-for-measurements rule, and the signboard palette are what make it NCC's. Hold those.

---

## 11. What you need to supply

The site's quality ceiling is set by content, not code. Maruti's site fails mostly because it has no
real content in it. Ours will fail the same way if this list is empty.

**Blocking — cannot build phase C/D without:**
1. Project list: for each — title, tender scope line, client/authority, contract value, chainage,
   length, district, dates, and for ongoing ones the current % and last-update date.
2. Project photography. Site photos, drone shots, completed structures. Even phone photos are fine if
   they're recent and real — but they need to be originals, not WhatsApp-compressed forwards.
3. Logo files — vector if it exists anywhere.
4. Real contact details: office addresses (resolve Orbit Business Hub vs Royal House), phone numbers,
   and a **domain email** to replace the Yahoo address on public record.

**Needed before launch:**
5. Certifications and registrations — Class AA certificate, ISO if any, NHAI/R&B/Railway registrations.
6. Leadership: names, titles, photos, real bios.
7. Client list and logos.
8. Awards, if any.
9. Company profile PDF for the hero CTA download.

**Nice to have:** site video footage for the hero, employee count, safety record, plant and machinery
list (genuinely impressive to evaluators and something Maruti doesn't show).

---

## 12. Open questions

1. **Does the client's office staff need to edit the site, or only you?** Changes the CMS choice and
   how much guardrailing the schemas need.
2. **Is there an existing project list in a document somewhere**, or does it need compiling from
   scratch? This is the long pole.
3. **Domain and hosting** — who controls the DNS for nccinfraspace.com, and can it point at Vercel?
4. **Gujarati or Hindi version** — needed now, later, or never? Cheap to plan for, expensive to retrofit.
5. **Is anything on the current site worth keeping?** Content salvage only — the extraction crawler
   still has value for harvesting existing copy, photos, and contact details, even though the design
   is being replaced entirely.

---

*This document supersedes the Phase 0 report's "pending requirements" gate. Once questions in §12 are
answered and §11 items 1–4 are supplied, phase A can begin.*

---

## Implementation notes (appended by Claude Code, not part of the owner's brief)

### Deviations from §4.1 / §9, with computed evidence

Two token values as specified fail the WCAG 2.1 AA floor that §9 itself mandates. Both are
implemented with hue-preserving corrections and documented inline in `next-app/app/globals.css`.

| Token | As specified | Measured | Implemented |
|---|---|---|---|
| `--rebar` on `--chalk` | `#8A8F98` | **3.03:1** — fails 4.5:1 | `#62666F` (5.37:1); original kept as `--rebar-line` for non-text hairlines |
| `--rebar` on `--concrete` | `#8A8F98` | **2.63:1** — fails 4.5:1 | as above (4.66:1) |
| `--retro` as focus ring on `--chalk` | `#F5C518` | **1.52:1** — fails 3:1 (WCAG 1.4.11) | `--focus` = `#AF8A08` on light, flips to `#F5C518` on dark (11.44:1) |

§9 anticipated the `--rebar` failure. The `--retro` focus-ring failure was not anticipated and is the
more serious of the two: as literally specified, the keyboard focus indicator would have been
invisible on every light surface on the site.

Passing as specified, for reference: `--bitumen` on `--chalk` 17.41:1 · `--signboard` on `--chalk`
7.42:1 · `--retro` on `--bitumen` 11.44:1 · `--bitumen` on `--retro` 11.44:1.

One further measurement, found while building the header: `--signboard` on `--bitumen` is **2.35:1**,
so the brand green cannot be used for marks or text on the hero band. The logo dot and nav hover
colour flip to `--retro` while the header is transparent over the hero.

### Phase A status

Complete and verified in a real browser at 390 / 834 / 1440 in both colour schemes. H1 measures
40.01px at 390px and 72px at 1440px, matching §4.2 exactly. No breakpoint scrolls horizontally. Both
routes prerender as static.

Not yet built, and deliberately so: the chainage rail (§4.3) is phase E, the 3D map (§4.5) is phase F,
and no project content is invented anywhere — §11 items 1–4 remain outstanding, so contact fields in
`next-app/lib/company.ts` are `undefined` and guarded at the component level rather than filled with
placeholders.
