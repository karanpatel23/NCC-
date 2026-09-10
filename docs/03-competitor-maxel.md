# Competitor teardown 2 — maxelprocon.com
### Extends the main brief §2. Read alongside it: the synthesis in §4 is the deliverable.

**Studied:** 2026-08-26, live site, all primary routes.
**Confidence:** Confirmed unless marked otherwise. Everything quoted is on their live site.

---

## 1. Who they are — and why this one matters more than Maruti

| | NCC Infraspace | Maxel Procon | Maruti Infracreation |
|---|---|---|---|
| Founded | **1987** (Natraj Construction Co.) | 1993 (Varun Construction Co.) | 1993 |
| Pvt Ltd | 2015 | 2015 (Varun Procon) | — |
| Renamed | — | → Maxel Procon (recent) | — |
| Class | AA, Govt. of Gujarat | AA Government Contractor | — |
| Largest single project | ₹158.27 Cr | **₹306.00 Cr** | — |
| Ongoing book (published) | ~₹394 Cr | **~₹684 Cr** | — |
| Completed (published) | **zero** | **~₹761 Cr, 9 projects** | **zero** |
| States | Gujarat, MP | Gujarat, Maharashtra, Lakshadweep | Gujarat |

**Maxel is the more dangerous comparison.** Maruti is a lookalike that shipped badly. Maxel is a
larger firm with a near-identical origin story — 1993 partnership → 2015 pvt ltd → AA class, roads
and bridges — competing directly in NCC's home district:

- *Widening into Four Lane of Shihori-Patan-Unjha-Visnagar road, Ta. Mehsana Visnagar, **Dist. Mehsana*** — ₹29.74 Cr
- *Upgradation of Industrial Infrastructure at Dediyasan G.I.D.C., **Dist. Mehsana*** — ₹25.15 Cr
- *Iconic Development and Beautification of **Radhanpur Road** under MMC area* — ₹54.21 Cr

Radhanpur Road is the street NCC's own registered office is on.

They also work **as a subcontractor to PSP Projects Ltd** (four projects) and for **Adani** (Mundra
Port, Mumbai airport shore piling) — a route into larger work that NCC's site does not evidence.

**NCC's one clear advantage over both is 1987.** Maxel says "Trusted Infrastructure Partners Since
1993" and "33+ years". NCC is six years older, and R5 §4's positioning line already leads with it.
That is the single defensible claim neither competitor can copy.

---

## 2. What Maxel does well — this is the "workflow" worth taking

### 2.1 Ongoing and Completed as separate routes, not filters

```
PROJECTS ▾
  ONGOING PROJECT     /projects/ongoing-projects/
  COMPLETED PROJECTS  /projects/completed-projects/
```

Our brief specced filter chips on one index (`?status=ongoing`). Maxel's split is arguably better
for audience #1: a tender evaluator wants "show me finished work of comparable value" as a
destination they can bookmark and send, not a filter state they have to set. **Recommendation:
do both** — real routes that are also filter states, so `/projects/completed` and
`/projects?status=completed` resolve to the same page.

### 2.2 The project card — three fields, ruthlessly consistent

Every card on both pages is exactly:

> **[Scope of work, verbatim from the tender]**
> **Client Name** — Executive Engineer, R & B Division, Bharuch
> **Project Cost** — 78 Cr.

That is the whole card. No hero image, no dates, no progress. And it works, because those three
facts are precisely what a tender evaluator checks. Two details worth copying:

- **Cost in Cr., never lakhs.** NCC's own live site publishes "Rs. 7673.90 lakhs". Maxel publishes
  "78 Cr." The second is instantly comparable; the first requires arithmetic.
- **The client is labelled and prominent.** For government work the awarding authority *is* the
  credential. Maruti buries it; Maxel leads with it.

### 2.3 A populated Completed page

The single biggest thing Maxel has that neither NCC nor Maruti does. Nine projects, ~₹761 Cr,
including two NH upgrades at ₹306 Cr and ₹208 Cr. Against that, an empty Completed page does not
read as "new firm" — it reads as "no track record".

### 2.4 An FAQ that answers tender questions

On `/business`, and it is genuinely well targeted:

- *Is Maxel Procon an AA Class Government Contractor?* — **Yes.**
- *Which states does Maxel Procon operate in?*
- *What construction equipment does Maxel Procon own?* — asphalt and concrete batch mix plants, wet
  mix plants, sensor-controlled paver finishers, vibratory rollers, transit mixers, excavators,
  loaders, motor graders, tippers.

That equipment answer is the strongest paragraph on their site. Main brief §11 already lists plant
and machinery as "nice to have… genuinely impressive to evaluators and something Maruti doesn't
show." Maxel shows it. It should move to **needed**.

### 2.5 Structure worth noting

`Home · About Us · Business · Projects (Ongoing|Completed) · Gallery · Clients · CSR · Contact Us`

**CSR as a top-level route** is a real signal for government work — public-sector clients increasingly
weight it. Neither NCC nor Maruti has one.

---

## 3. Where Maxel is broken — and it is worse than Maruti

Maxel runs **WordPress 7.1 + Elementor**, on a theme literally named **Framework** (`wp-theme-framework`,
by AxiomThemes). The demo content was never removed.

| Failure | Evidence, verbatim from the live site |
|---|---|
| **Theme demo copy in production** | "At **Framework**, we turn visions into reality…", "Trust **Framework** to bring your project to life", "**About Framework**" — the theme's name, presented as the company's |
| **Wrong founding year** | "Founded in **2010**, Framework has grown to lead the field" — their own About page says 1993 |
| **Theme author's socials in the footer** | Footer links point to `x.com/ThemesAxiom` and `instagram.com/axiom_themes` — **the site links to its theme vendor, not to the client** |
| **Placeholder project names on the homepage** | "Modern urban highrise", "Sleek city skyline view", "Contemporary office lobby", "Innovative campus design", "Sustainable builds" — none are real Maxel projects |
| **Broken stat counters** | Renders "YEARS OF EXPERIENCE **0 +**", "MAJOR PROJECTS **0 +**", and "**0%**" — same bug as Maruti |
| **Services that aren't theirs** | "Residential building", "Commercial construction" cards sit between the real highway/bridge/irrigation ones |
| **Empty Clients page** | `/clients` renders the word "CLIENTS" and nothing else |
| **Wrong client on a ₹306 Cr credential** | The Bagodara-Limbdi NH 8A upgrade is attributed to "Chief General Manager, **Chandigarh Smart City Limited**" — copy-pasted from the row above. A Gujarat NH job credited to a Chandigarh authority |
| **Duplicate rows** | Ambaji-Gabbar (₹41 Cr) listed twice on Ongoing; Dediyasan GIDC (₹25.15 Cr) twice on Completed |
| **Wrong FAQ answer** | *"What types of clients does Maxel Procon serve?"* is answered with "Reach out by email or phone with your project needs…" |

**The ₹306 Cr wrong-client error is the instructive one.** Maruti's failures are obviously fake —
nobody believes a Gujarat contractor's phone number is `+1 (859) 254-6589`. Maxel's error is
*plausible*, sits on their largest credential, and a diligent evaluator who checks it will conclude
the number is unreliable. **Data errors on real credentials do more damage than obvious placeholders.**

That is the argument for R6's schema in one example. Under our validation, the duplicate rows and
the mismatched client would still get through — nothing can catch a wrong-but-well-formed value —
but the empty Clients page, the zero counters and the "Founded 2010" could not ship.

---

## 4. The synthesis — best of both

### 4.1 Take from Maxel

| | Why |
|---|---|
| **Ongoing / Completed as real routes** | Bookmarkable, sendable. Keep filter params as aliases |
| **Three-field project card** | Scope · Client · Cost. Add our chainage and progress on top |
| **Cost in Cr., always** | Never lakhs. One decimal |
| **Client labelled and prominent** | For government work the authority is the credential |
| **A populated Completed page** | The single biggest gap on NCC's current site |
| **Tender FAQ on /capabilities** | AA class, states, clients, equipment |
| **Plant & machinery list** | Promote from "nice to have" to **needed** — §11 |
| **CSR route** | Signals public-sector maturity; neither competitor rival has one |

### 4.2 Take from Maruti

| | Why |
|---|---|
| **Progress % on ongoing projects** | Still the one thing Maruti does that Maxel doesn't. Proves current activity |
| **Leadership section** | Maxel has none. Ours has no phone/email fields, by schema |
| **Awards** | Maxel has none |
| **Client logos** | Maxel's Clients page is empty — beating it is trivial |

### 4.3 Take from neither

The failure both share, in the same order: **theme demo content, broken counters, empty pages,
unverified data on real credentials.** Our defences already exist — R6's Zod schema, the
counters-render-real-values-in-HTML rule, and §7's "incomplete renders nothing".

One rule to add from this teardown: **a project's client must be validated against a known client
list**, not free text. That is what would have caught Maxel's ₹306 Cr Chandigarh error. Cheap to add
— `client` becomes a slug reference into `content/clients/` and an unknown client fails the build.

### 4.4 Revised sitemap

```text
/
├── /about                    1987 heritage, leadership, certifications
├── /capabilities             segments + plant & machinery + tender FAQ   ← Maxel
│   └── /capabilities/[slug]
├── /projects
│   ├── /projects/ongoing     real route, progress %                      ← both
│   ├── /projects/completed   real route, POPULATED                       ← Maxel
│   └── /projects/[slug]      detail, chainage rail, milestones
├── /clients                  logos + authorities. Beat an empty page     ← Maxel, done right
├── /credentials              AA class, Crisil, registrations, downloads
├── /csr                                                                  ← Maxel
├── /careers
└── /contact
```

### 4.5 Positioning, sharpened by this

Maxel leads with *"Creating infrastructure that endures / On time. Every time."* — a promise, and an
unverifiable one. Maruti leads with *"Pioneering Construction and Development for a Modern World"* —
generic.

R5 §4's line still wins because it is the only one of the three that states a checkable fact:

> **Building Gujarat's roads and bridges since 1987.**

One caveat now visible: NCC's largest project is in **Madhya Pradesh** and Maxel competes across
three states. "Gujarat" is the honest anchor and the SEO target, but the About page should make the
out-of-state capability explicit rather than let the strapline cap it.

---

## 5. What this changes in our plan

| Item | Change |
|---|---|
| §5 sitemap | Add `/csr`; make ongoing/completed real routes, not only filters |
| §6.2 projects index | Split into two populated routes |
| §6.3 project detail | Card fields reordered: scope, **client**, **cost in Cr** first |
| §7 schema | `client` becomes a validated reference, not free text — catches Maxel's ₹306 Cr error |
| §11 supply list | Plant & machinery list moves from "nice to have" to **needed** |
| §11 supply list | **Completed project records** promoted to the top blocker, above photography |
| Capabilities page | Add tender FAQ block |

**The highest-value content you can supply has changed.** It is no longer photography — it is
**completed project records**. Maxel publishes ₹761 Cr of finished work; NCC currently publishes
none. The rebuild cannot close that with design.
