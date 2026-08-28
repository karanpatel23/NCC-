# Content salvage from the phase-1 crawl

**Source:** `forensics/out/pages/project-services-*.json`, harvested 2026-08-26.
**Sanctioned by:** main brief §12 Q5 — *"content salvage only — the extraction crawler still has
value for harvesting existing copy, photos, and contact details."*

**Confidence: Confirmed.** Every field below was rendered by NCC's own live site and captured by the
Playwright crawl. Nothing here is inferred, derived, or invented. Where this disagrees with any other
source, `CLAUDE.md` says the site wins — it is the artifact being reconstructed.

---

## What the live site publishes

| # | Project | Status | Value | Start | Duration |
|---|---|---|---|---|---|
| 1 | Chiloda-Gandhinagar-Sarkhej of NH-147 | ongoing | ₹76.74 Cr | 22.11.2018 | 24 mo |
| 2 | Reconstruction of Major District Roads, MP | ongoing | ₹158.27 Cr | 10.01.2019 | 24 mo |
| 3 | Kheda Dholka Road | ongoing | ₹47.09 Cr | 01.10.2019 | 18 mo |
| 4 | Gandhinagar City — Smart Road 6, 7 & G | ongoing | ₹60.12 Cr | 19.08.2019 | 24 mo |
| 5 | Varna to Jakhada road, Ahmedabad | ongoing | *not stated* | 10.08.2020 | 12 mo |
| 6 | Dholka Bagodara Highway | ongoing | *not stated* | 10.08.2020 | 12 mo |
| 7 | Gandhinagar City — Sector 7, 11, 17, 21, 22 | ongoing | *not stated* | 10.07.2020 | 18 mo |
| 8 | Kheda R&B Division — widening, strengthening & resurfacing | awarded | ₹51.88 Cr | — | — |

Stated total across the five that carry a value: **₹394.10 Cr**.

### Full scope text and authority

1. **Chiloda-Gandhinagar-Sarkhej of NH-147** — "Development of Chiloda-Gandhinagar-Sarkhej of NH-147
   (Old NH-8C) from Km. 0/0 to 44/420 in the State of Gujarat to Six-lane with paved shoulders with
   both side continuous service road on EPC mode. (Job No. 147/GJ/2017-18/607) Package-II
   Km. 16/350 to 31/300."
   *Executive Engineer National Highway Division Ahmedabad.*
2. **Reconstruction of Major District Roads, MP** — upgradation and reconstruction of eight MDR roads
   under NDB-II (Pkg 5), total length **199.13 km**.
   *Executive Engineer PWD MP-Div.No-2.*
3. **Kheda Dholka Road** — "Widening of Kheda Dholka Road Km. 36/600 to 53/200, widening up to four
   lane, strengthening work, hard side shoulder, cross drainage work and miscellaneous work."
   *Executive Engineer, R and B Division, Kheda.*
4. **Gandhinagar City** — "Design and construction of Smart Road of Road No. 6, Road No. 7 & G Road
   including widening of roads in Gandhinagar City."
   *CEO, Gandhinagar Smart City Development Limited.*
5. **Varna to Jakhada road** — "Km 0/0 to 7/200, Ta. Dholka, Dist. Ahmedabad. Pkg. No AHD/SCSP/15."
   *Executive Engineer R and B Panchayat Division Ahmedabad.*
6. **Dholka Bagodara Highway** — "Begva to Gangad Road Km 0/0 to 3/500 (up to Dholka Bagodara
   Highway), Ta. Dholka, Dist. Ahmedabad. Pkg. No AHD/SCSP/20."
   *Executive Engineer R and B Panchayat Division Ahmedabad.*
7. **Gandhinagar City** — "Design and construction of four laning of Sector level roads & approach
   roads of Sector 7, 11, 17, 21, 22 in Gandhinagar City."
   *CEO, Gandhinagar Smart City Development Limited.*
8. **Kheda R&B Division** — "Work of widening, strengthening & resurfacing of various road as and
   when required or in emergency under Kheda R&B Division (Dist. Kheda)."
   *Executive Engineer, Kheda R. & B. Division, Nadiad.*

---

## Three findings the owner should see

**1. The live site's "Completed Projects" page is empty.** Not thin — *empty*. A firm trading since
1987 publishes zero completed work. Every project it shows is ongoing or awarded, and the oldest
started in 2018. For audience #1 — a tender evaluator checking "completed work of comparable value" —
this is the single largest credibility gap on the current site, and it is a content problem rather
than a design one. The rebuild cannot fix it without completed-project records.

**2. Seven of eight projects are dated 2018–2020 and all are still listed "on-hand".** Durations run
12–24 months, so on the site's own figures every one of them was due to finish by 2022. Either the
records are stale, or several are complete and never moved. This is exactly what R6's
`progressUpdated` / "as of" stamp exists to prevent recurring.

**3. One project is outside Gujarat.** The MDR package is in Madhya Pradesh, at ₹158.27 Cr the
largest single value on the site. The schema defaults `state` to `Gujarat`, and the R5 §4 positioning
line is *"Building Gujarat's roads and bridges since 1987"* — worth deciding whether out-of-state work
is surfaced or de-emphasised.

---

## What this does and does not unblock

**Does:** eight real projects with title, client/authority, scope narrative, start date, duration,
chainage where stated, district and state. That is more than the three R6 §6 needs.

**Does not** — these fields are required by `lib/content/schema.ts` and are absent from the crawl:

| Field | Why it blocks | Needed for |
|---|---|---|
| `progressPercent` + `progressUpdated` | Schema refine: ongoing projects require both | all 7 ongoing |
| `heroImage.src` + `alt` (≥10 chars) | Required, no default | all 8 |
| `contractValueCr` | Required, `.positive()` | projects 5, 6, 7 |
| `completionDate` | Schema refine for `completed` status | any completed record |

So the crawl gets a seed roughly 70% of the way. The remaining 30% is: **current progress
percentages, a value for three projects, and photography.** Nothing else.

---

## Not yet harvested

The crawl also holds material not yet mined, if useful later:

- `forensics/out/pages/our-company.json` — company narrative copy, 8 headings, 42 images
- `forensics/out/pages/gallery.json` — gallery structure
- `forensics/out/pages/contact.json` — contact page as rendered
- `forensics/out/assets.json` — every image with its S3 URL and natural dimensions

The four S3 endpoints that back this data are recorded in `forensics/out/network.json`:
`Awarded-proj-data.json`, `Completed-proj-data.json`, `On-hand-proj-data.json`, `Gallery-data.json`.
The crawler logged the requests but not the response bodies, so the JSON itself was reconstructed
from the rendered DOM rather than read directly.
