# NCC Infraspace — Website Reconstruction Intelligence Report
### Phase 0 (partial): remote reconnaissance + extraction plan
**Target:** https://nccinfraspace.com/
**Date of analysis:** 21 August 2026
**Analyst tooling:** server-side HTTP fetch, search-index reconnaissance, third-party corporate records
**Status:** ⚠️ **BLOCKED — on-page content could not be retrieved remotely.** See §1.

---

## 1. Executive overview — read this first

`nccinfraspace.com` is a **100% client-rendered single-page application** built with Create React App. It ships no server-rendered HTML. Every request to every route returns the same ~1 KB shell:

```html
<title>NCC Infraspace Pvt Ltd - Nataraj Construction Company</title>
<meta name="description" content="Nataraj Construction Company">
<meta name="theme-color" content="#000000">
<meta name="viewport" content="width=device-width,initial-scale=1">
<noscript>You need to enable JavaScript to run this app.</noscript>
<div id="root"></div>
```

All copy, navigation, images, layout, and interactions are painted by JavaScript **after** page load. Any tool that reads HTTP responses without executing JS — including my web-fetch tool — sees literally nothing but that shell. I verified this on `/` and on `/contact`; both return byte-identical markup.

Two secondary constraints compounded this:

1. **The site is effectively invisible to search engines' text index.** Only two URLs (`/` and `/contact`) surface at all, and their indexed descriptions are the static shell meta, not rendered copy. There is no discoverable `sitemap.xml`, no indexed sub-pages, no cached text.
2. **My fetch tool is restricted to URLs that already appear in search results,** so I could not pull `/static/js/main.*.js`, `asset-manifest.json`, `robots.txt`, or Wayback CDX listings — all the usual side-doors for extracting a CRA bundle's route table and hard-coded strings.

**Consequence:** sections 3–19 of your brief (sitemap, copy, layout, design system, media, interactions, forms, responsive, SEO, content model, components, routes, templates) **cannot be filled from outside a browser.** Writing them from inference would mean inventing a website, which is the opposite of what a forensic report is for.

**What I've done instead:**
- Documented everything genuinely confirmable remotely (§2, §4).
- Built a full company-intelligence profile from corporate records, which is real, useful, and independent of the site (§3).
- Written you a **Playwright extractor** (`forensic-crawl.mjs`, delivered alongside this file) that renders the site in a real Chromium instance and dumps every single thing sections 3–19 require, in one command. Run it, paste the output back, and I'll produce the complete report (§6).

This is 25 minutes of your time and it converts a blocked analysis into a complete one.

---

## 2. Confirmed technical findings

| Finding | Evidence | Confidence |
|---|---|---|
| Client-rendered SPA, no SSR/SSG | Identical shell + `noscript` fallback on all routes tested | **Confirmed** |
| Built with **Create React App** | `You need to enable JavaScript to run this app.` is CRA's verbatim default `index.html` string; paired with `<div id="root">` and `theme-color #000000` (also CRA default) | **Confirmed** |
| React (not Next.js/Remix/Vue) | CRA implies React; absence of `__NEXT_DATA__` in shell rules out Next.js SSR | **High-confidence inference** |
| `www.nccinfraspace.com` → `nccinfraspace.com` (301/302) | Fetch of www resolved to apex as `final_url` | **Confirmed** |
| HTTPS enabled, valid cert | Fetch over TLS succeeded | **Confirmed** |
| Route `/contact` exists and is client-routed | Returns 200 with the SPA shell; search index shows the rendered title **"Contact us - NCC Infraspace Pvt Ltd"**, which differs from the shell's static `<title>` | **Confirmed** — this also proves a per-route title mechanism (React Helmet or equivalent) |
| Per-route `<title>` is set client-side | As above: shell title ≠ indexed title for `/contact` | **High-confidence inference** |
| SPA fallback routing (any path → shell, HTTP 200) | Standard for CRA on static hosts; consistent with `/contact` behaviour | **High-confidence inference** |
| Custom meta description present (`Nataraj Construction Company`) | CRA default is `Web site created using create-react-app`; this was edited | **Confirmed** |
| **No** Open Graph / Twitter Card tags in the shell | Extraction returned only description, theme-color, viewport | **Possible** — extractor may filter; verify with view-source |
| Theme colour `#000000` | `<meta name="theme-color">` | **Confirmed** — but this is the CRA default, so it is *not* reliable evidence of a black brand palette |

### SEO posture (confirmed, and it is bad)
- No server-rendered content means crawlers that don't execute JS index an empty page.
- Only 2 URLs discoverable across search; effectively zero organic surface for a company with ₹300 cr+ turnover.
- One shared static meta description across the whole site.
- No discoverable XML sitemap.
- **This is the single largest technical liability of the current site** and should be a non-negotiable requirement in the rebuild brief (SSR/SSG, per-route meta, sitemap, structured data).

### Unknown / cannot be determined from public website
Everything else. Explicitly: hosting provider and CDN, analytics, tag manager, pixels, cookie platform, form backend, maps embed, chat widget, CSS framework, icon library, font stack, animation library, carousel library, image CDN, build date, bundle size, number of routes, and the entire content and design layer.

---

## 3. Company understanding (from corporate records, **not** from the website)

Everything below is sourced off-site and should be treated as *background for the rebuild brief*, not as extracted site copy. Where the website's own claims differ, the website wins.

### Identity
| Field | Value | Source |
|---|---|---|
| Trading name (on site) | NCC Infraspace Pvt Ltd | Site `<title>` |
| Site tagline | **"Nataraj Construction Company"** | Site `<title>` + `<meta description>` |
| Legal name | NCC Infraspace Private Limited | MCA / IndiaFilings |
| Predecessor firm | Set up **1987** as partnership firm **Natraj Construction Company** — note the spelling differs from the site's "Nataraj" | Crisil Ratings, Feb 2025 |
| Reconstituted as Pvt Ltd | **April 2015** (incorporated 09-04-2015) | Crisil / MCA |
| CIN | U45200GJ2015PTC082845 | MCA |
| Registrar | RoC-Ahmedabad | MCA |
| Status | Active | MCA |
| Website of record | https://www.nccinfraspace.com | TheCompanyCheck |

> **Brand note for the rebuild:** the site brands as "NCC Infraspace" but carries "Nataraj Construction Company" as the tagline — a 1987 heritage line. There's a real story here (38 years of continuity) that the current site reduces to a meta description. Also worth flagging: "NCC" collides hard with NCC Limited (Nagarjuna, ₹15,700 cr, listed) and NCC AB (Sweden) in search. Any SEO strategy must fight that.

### What they actually do
- Civil and infrastructure construction, **primarily roads and bridges** (Crisil).
- **Class AA contractor registered with the Government of Gujarat** (Crisil) — this is a significant credential and is prime homepage material.
- Customers are **government agencies** (Crisil) — so the site's job is credibility and tender/recruitment support, not lead-gen in the commercial sense.
- IndiaMART listings: Highways Construction Service, Highway Road Construction Service, Redevelopment Services, plus a charcoal/hardwood-coal trading line.
- HSN codes declared: 995428 (general construction of other civil engineering works), 730890 / 73089090 (iron & steel structures — bridges, bridge sections, towers, lattice masts).

### Locations
| Type | Address | Source |
|---|---|---|
| Registered office | 3rd Floor, 301 Orbit Business Hub, Nr. Dena Bank, Radhanpur Road, Mehsana, Gujarat 384002, India | IndiaFilings/MCA |
| Alternate listed address | Royal House, 2nd Floor, Radhanpur Char Rasta, Mehsana, Gujarat 384002 | Dun & Bradstreet |
| Facebook page location | Ahmedabad, India | Facebook |

### People
- Promoters: **Mr Kantibhai K Patel** and **Mr Akshay Kantilal Patel** and family (Crisil; corroborated by TheCompanyCheck as directors).
- IndiaMART contact person: "A Patel (Director)".
- Promoters have **30+ years of experience in construction** (Crisil).

### Numbers (useful for a stats band — verify before publishing)
| Metric | Value | Period | Source |
|---|---|---|---|
| Operating income | ₹302.42 crore | FY2024 | Crisil |
| Operating income | ₹296.80 crore | FY2023 | Crisil |
| PAT | ₹7.50 crore | FY2024 | Crisil |
| Net worth | ₹69.92 crore | 31-Mar-2024 | Crisil |
| Operating margin | 6.5–8.0% | FY22–FY24 | Crisil |
| Credit rating | Crisil BBB-/Stable (long term), Crisil A3 (short term), reaffirmed 20-Feb-2025 | 2025 | Crisil |
| Rated bank facilities | ₹130.71 crore (lender: Bank of Baroda) | 2025 | Crisil |
| Employees | 54 (FY23 filings) / "101 to 500" (IndiaMART self-reported) — **contradictory** | — | TheCompanyCheck / IndiaMART |
| Authorised capital | ₹2.00 crore | — | MCA |
| Paid-up capital | ₹96,73,860 | — | MCA |
| GST registration | 24…2ZO, registered 2017 | — | IndiaMART |

### Contact points found off-site
- `ncc_infraspace2015@yahoo.in` (MCA correspondence address — a Yahoo address on record for a ₹300 cr contractor; the rebuild should surface a proper domain-based email)
- IndiaMART masked line: +91 8047638430
- Facebook: facebook.com/people/NCC-InfraSpace-PvtLtd/100054236827293/ (66 likes)
- Pinterest: in.pinterest.com/infraspacepvtltd/
- JustDial listing: Mehsana, Radhanpur Road, 5 ratings
- DevelopmentAid organisation profile #150516
- **Unknown:** the website's own phone numbers, emails, office hours, and map embed — these are behind the JS layer.

---

## 4. Route knowledge (incomplete)

```text
/                    Confirmed — SPA shell, title "NCC Infraspace Pvt Ltd - Nataraj Construction Company"
└── /contact         Confirmed — rendered title "Contact us - NCC Infraspace Pvt Ltd"
```

Everything else — `/about`, `/projects`, `/services`, `/gallery`, `/career`, detail routes, legal pages — is **Unknown**. The route table exists inside the JS bundle and will fall out of the crawl in one pass.

---

## 5. Sections of your brief that remain unanswered

Marked against your numbering so nothing gets lost:

| § | Deliverable | Status |
|---|---|---|
| 1 | Complete sitemap | ❌ Unknown |
| 2 | Company information *as stated on site* | ❌ Unknown (off-site proxy in §3 above) |
| 3 | All website copy (page → section → element) | ❌ Unknown |
| 4 | Page-by-page layout analysis | ❌ Unknown |
| 5 | Design system (colour, type, spacing, components) | ❌ Unknown |
| 6 | Image & media inventory | ❌ Unknown |
| 7 | Navigation & IA | ❌ Unknown |
| 8 | Interactions & functionality | ❌ Unknown |
| 9 | Forms | ❌ Unknown |
| 10 | Responsive behaviour | ❌ Unknown |
| 11 | Technical stack | ⚠️ Partial — §2 |
| 12 | SEO | ⚠️ Partial — §2 |
| 13 | Content model | ❌ Unknown (derivable once §1–3 exist) |
| 14 | Feature inventory | ❌ Unknown |
| 15 | Page inventory | ⚠️ 2 of N routes |
| 16 | Component inventory | ❌ Unknown |
| 17 | Route structure | ⚠️ Partial — §4 |
| 18 | Template/duplication analysis | ❌ Unknown |
| 19 | Small details (radii, shadows, hovers, transitions) | ❌ Unknown |

---

## 6. What I need from you — the unblock

Run the extractor I've delivered next to this file. It renders the site in headless Chromium, crawls every internal link it finds, and dumps exactly what sections 1–19 need.

```bash
mkdir ncc-forensics && cd ncc-forensics
npm init -y
npm i playwright
npx playwright install chromium
# drop forensic-crawl.mjs in this folder
node forensic-crawl.mjs https://nccinfraspace.com/
```

**What it produces in `./out`:**

| Output | Feeds report section |
|---|---|
| `HANDOFF-INPUT.md` | Everything — this is the file you paste back to me |
| `pages/*.json` | Full copy, headings with computed type, section maps, links, forms |
| `shots/*.1440.png` `.834.png` `.390.png` | Layout analysis + responsive behaviour + visual design read |
| `tokens.json` (inside handoff) | Colour, font, size, weight, radius, shadow, spacing frequency tables — the actual design system, measured not guessed |
| `assets.json` | Every image + alt + natural/rendered dimensions + reuse across routes |
| `network.json` | Third-party hosts → analytics, fonts, maps, chat, form backends, CDN |
| `raw/main.*.js` | The bundle — route table, hard-coded strings, library fingerprints |
| `raw/robots.txt`, `sitemap.xml`, `asset-manifest.json` | SEO + build metadata |
| Interaction probe (in handoff) | Sticky header, hover deltas, dropdowns, mobile menu, scroll reveals |

**Then send me back:**
1. `out/HANDOFF-INPUT.md` (paste or attach)
2. `out/shots/*.1440.png` and `out/shots/*.390.png` (attach — I read these directly for visual design)
3. `out/raw/main.*.js` if it's under ~5 MB (optional but it settles the library question definitively)

I'll turn that into the full 25-section report plus the RECONSTRUCTION HANDOFF, in the format your brief specifies.

### Zero-install fallback
If you'd rather not install Playwright:
1. Open the site, DevTools → Elements → right-click `<html>` → **Copy outer HTML** → paste into a file, one per route.
2. Full-page screenshots at 1440 and 390 for every route.
3. View-source → open `/static/js/main.*.js` → save it.
4. DevTools → Network → reload → screenshot the request list (gives me the third-party stack).

That gets me ~85% of the way there. The script gets me 100% and takes less of your time.

---

## 7. Things worth deciding before the rebuild brief

Not recommendations about design — just gaps you'll need to fill from your own knowledge or the client's, because the public site can't tell either of us:

1. **Who is the audience?** Government tender committees, private developers, job applicants, or suppliers? Their customers are government agencies, which usually means the site's real jobs are *credibility, credentials, and recruitment* — a very different brief from a lead-gen site.
2. **Do they have a project list with photos, values, clients, and completion dates?** This is the highest-value content type for a contractor site and is almost certainly the spine of the content model.
3. **Certifications and registrations.** Class AA Gujarat registration is confirmed; ISO certifications, PWD/NHAI/GSRDC registrations, and safety accreditations are unknown and are exactly what tender evaluators look for.
4. **Which name leads — NCC Infraspace or Nataraj Construction?** The 1987 heritage is an asset; the current site buries it.
5. **Contact reality:** current email of record is a Yahoo address. Confirm the real inbox, phone numbers, office addresses (Mehsana vs Ahmedabad), and hours.
6. **Careers:** 54–500 employees and active government projects implies real hiring. Is a careers section in scope?
7. **Assets:** do you have original logo files, project photography, and any brand guide, or does everything need to be pulled from the live site / reshot?
8. **Language:** any Gujarati/Hindi requirement, now or later?

---

## RECONSTRUCTION HANDOFF (Phase 0 — provisional)

> Paste this block into a fresh conversation to bring it up to speed. **It is incomplete by design** — the content and design layers are pending extraction.

**Target site:** https://nccinfraspace.com/ (`www` 301s to apex)

**Company:** NCC Infraspace Private Limited, trading as NCC Infraspace, tagline "Nataraj Construction Company". CIN U45200GJ2015PTC082845. Founded 1987 as partnership firm Natraj Construction Company; incorporated as Pvt Ltd 09-Apr-2015. Based Mehsana, Gujarat (registered office: 3rd Floor, 301 Orbit Business Hub, Nr. Dena Bank, Radhanpur Road, Mehsana 384002; alternate listed address Royal House, 2nd Floor, Radhanpur Char Rasta, Mehsana). Promoters: Kantibhai K Patel, Akshay Kantilal Patel (30+ years' construction experience). Civil and infrastructure construction, primarily **roads and bridges**; Class AA contractor registered with Government of Gujarat; customers are predominantly government agencies. FY24 operating income ₹302.42 cr, PAT ₹7.50 cr, net worth ₹69.92 cr. Crisil BBB-/Stable & A3 (Feb 2025), ₹130.71 cr facilities with Bank of Baroda. Employees 54 (filings) to 101–500 (self-reported). Also lists redevelopment services and a charcoal/coal trading line on IndiaMART.

**Existing site — confirmed technical profile:**
- Create React App, client-rendered React SPA, **no SSR**. All routes return an identical 1 KB shell containing `<div id="root">` and the CRA `noscript` string.
- Static shell `<title>`: `NCC Infraspace Pvt Ltd - Nataraj Construction Company`; `<meta description>`: `Nataraj Construction Company`; `<meta theme-color>`: `#000000` (CRA default, not necessarily brand).
- Per-route titles are set client-side (React Helmet or similar) — `/contact` renders as `Contact us - NCC Infraspace Pvt Ltd`.
- SPA fallback routing: unknown paths return 200 + shell.
- **SEO is critically broken:** only `/` and `/contact` are indexed anywhere; one shared meta description sitewide; no discoverable sitemap; no server-rendered content.

**Confirmed routes:** `/`, `/contact`. All others unknown.

**Unknown (pending browser-rendered extraction):** complete sitemap, all copy, all layouts, colour palette, typography, spacing/grid, every component, all imagery and media, navigation structure and dropdowns, mobile menu, all interactions and animations, all forms and their backends, responsive breakpoints, analytics/tag manager/pixels, fonts, icon and animation libraries, hosting/CDN, maps, chat, content model, templates.

**Next action:** run `forensic-crawl.mjs` against the live site; feed `out/HANDOFF-INPUT.md` + screenshots back to complete sections 1–19 of the forensic brief.

**Standing rule:** do not rebuild, redesign, or write production code until the extraction is complete and the client's requirements for the new site have been stated.

---

*Confidence key used throughout: **Confirmed** = directly observed. **High-confidence inference** = strongly implied by observed evidence. **Possible** = plausible, unverified. **Unknown** = cannot be determined from the public website.*
