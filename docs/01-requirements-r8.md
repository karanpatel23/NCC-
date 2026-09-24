# NCC Infraspace — Brief Revision 8
### `docs/01-requirements-r8.md` · Owner decisions, 10 September 2026

**Closed by the owner.** This revision records approvals given at the R8 review and the
work done against them. It supersedes the specific rules named below and nothing else.
R7 remains the live palette; R6 remains the content model.

---

## 1. Decisions, as given

| # | Decision | Supersedes |
|---|---|---|
| 1 | Keep the R7 palette, typography and MILESTONE glyph-portal hero. | — reaffirms R7 |
| 2 | No photography or video in the **homepage hero**. Project photography is used elsewhere. | reaffirms the instruction that reversed R4 §3 |
| 3 | Serve **private clients and government / tender / project partners equally**. | extends main brief §1, which assumed a government-only audience |
| 4 | Every project in the handover and the content-salvage register is **completed**, including Bagodara–Fedra–Sarangpur and Bilodara–Sihunj. | replaces the `ongoing` status those records carried |
| 5 | **Completion dates are not required and must not be displayed.** Do not invent dates. | **deletes** the R6 §3 rule "completed projects require completionDate" |
| 6 | Contact details confirmed (§3 below). | **closes** main brief §11 item 4, blocking since phase 3 |
| 7 | Preserve the motto, "Every Milestone is Our Vision." | reaffirms |
| 8 | Integrate the original NCC logo lockup. | **closes** R2 §4 item 2; item 1, the vector source, stays open |

Decision 4 is a **status** approval for records already reviewed. It does not extend to
projects added later, and it supplies no missing field — a record still needs its client,
value, district and image to publish.

---

## 2. Why the completionDate rule had to go, not be worked around

R6 §3 required `completionDate` on any project with `status: completed`. The rule was
sound in the abstract: a completed project with no date looks unfinished.

It collided with the facts. The reviewed records *are* complete and their handover dates
are not to hand. That left three moves — hold every completed project back indefinitely,
weaken validation generally, or write a plausible date. **The third is what actually
happens under deadline**, and it is the precise failure the main brief §2 teardown exists
to document. A record that is true but thin beats one that is complete and invented.

So the refine is deleted and nothing replaces it. `completionDate` stays in the schema,
any authentic value already stored is retained, and no page renders one.

**Verified, not assumed:** nothing in the codebase sorts by date. `loadProjects()` orders
by `displayOrder`. An absent date cannot reorder a listing or break a render.

---

## 3. Contact details — confirmed, and now published

| | |
|---|---|
| **Ahmedabad** | A-502 Empire Business Hub, Science City Road, Sola, Ahmedabad, Gujarat 380060, India |
| **Mehsana** | 301, 3rd Floor, Orbit Business Hub, Nr. Dena Bank, Radhanpur Road, Mehsana–384002 |
| **Telephone** | 02762-255962 |
| **Email** | ncc_infraspace2015@yahoo.in |

This resolves the three-way address ambiguity main brief §11 item 4 called blocking.
**Royal House is not an NCC office** and is not published; it is also the competitor's
registered address, which is why guessing was dangerous.

Two notes carried forward:

- **The telephone is company-level, not per-office**, because that is how it was supplied.
  Its `02762` STD code is Mehsana's, but inferring which desk it rings from an area code
  is a guess. It is listed once rather than printed under one address or duplicated
  under both.
- **The email is a yahoo.in address.** §11 item 4 asked for a domain address and did not
  get one. It ships exactly as confirmed — inventing `info@nccinfraspace.com` is the §2
  failure verbatim. Still worth raising with the client: a Yahoo address on a Class AA
  contractor's tender correspondence is a credibility cost. **Owner's call, not ours.**

Map destinations are **not** geocoded. They are lifted verbatim from NCC's own live site
via the phase-1 crawl, carrying the Google place IDs `0x395e9cb6b351130b` (Empire) and
`0x395c423328c623df` (Orbit). They are plain links, not embedded iframes — the live site
loads two Google Maps frames on `/contact`, setting third-party cookies before the visitor
asks for a map.

---

## 4. The logo, and what measuring it revealed

Source: `https://nccinfraspace.com/static/media/NCC-logo.5870da8076a2801747e5.webp`,
3208×1182 WebP with alpha, corroborated by the phase-1 crawl before download. Copied to
`site/public/brand/ncc-lockup.webp`; nothing depends on a production hotlink.

### The lockup inverts against itself

Measured off the pixels:

| Element | Colour | on `--white` | on `--navy` |
|---|---|---|---|
| "NCC" + "INFRASPACE PVT. LTD." | `#374990` | **7.80** ✓ | **1.96** ✗ |
| "NATRAJ CONSTRUCTION CO." | `#B2B4B3` | **1.95** ✗ | **7.83** ✓ |

**There is no flat ground in the palette on which all three tiers read.** The lockup
therefore always sits on a `--white` plate: a no-op on light surfaces, a restrained
backing card on navy. One code path, nothing to flicker as the header solidifies.

This **inverts R2 §4's prediction**. R2 asked for a one-colour lockup for dark bands
"since the brass statue won't hold up reversed out of indigo". The statue holds up
beautifully on navy — it is the *wordmark* that disappears. A recoloured one-colour
version is not the fix, and would need the vector source and the client's sign-off anyway.

### A 1% distortion, introduced by rounding

`next/image` rounds derivative heights to whole pixels: the 200w candidate returns
200×73, ratio 2.7397, against the artwork's true 2.7140. Under the browser default
`object-fit: fill` that bitmap is squeezed **1.03% horizontally** into the layout box.

One percent is invisible. It is also a distortion of a religious icon, introduced by a
rounding rule rather than a decision, and it changes with every candidate width the
browser might pick. `object-contain` is applied so the figure's proportions survive
whichever derivative is chosen. **Do not remove it as redundant.**

### Clear space

R2 §4 sets it at the height of the "N" — measured at 60.1% of the artwork's height, so
26px beside the 44px desktop mark. That is read as an **exclusion zone for other
elements**, which is how brand clear space is normally specified, and the header gap is
set to keep the nav outside it. Reading it as viewport padding would force the header
lockup down to ~32px, at which the third tier is 3px tall.

**Unchanged and still non-negotiable:** never rotate, distort, recolour, animate, crop
partially, or use the Nataraja as a decorative watermark.

---

## 5. Photography

R3 §3.1 made 18:25 the corridor's ratio and the project gallery inherited it. Applied to
the real photography that is a **destructive crop**: the sets are 1600×900 and 1600×1200
aerials, and squeezing 16:9 into 18:25 keeps 26% of the width. On an aerial of a road — a
subject that runs horizontally across the frame — that throws away the road.

The corridor keeps 18:25, which is structural to a component where cards fly along Z. The
gallery does not, and each photograph now renders at its own aspect ratio with intrinsic
`width`/`height` read from the file header at build time, so nothing reflows as images
load.

**Also fixed:** `heroImage` is required by the schema, and the project detail template
resolved its URL into a variable and never rendered it. Every project demanded a hero
image no visitor ever saw.

---

## 6. Flagged, not changed

R8 bars unconfirmed financial figures, credit ratings, headcount, awards, certifications,
leadership details and institutional titles from new copy, and says to **flag** existing
instances rather than expand them.

| Claim | Where | Status |
|---|---|---|
| "Turnover FY24 ₹302 Cr" | hero credentials strip | **flagged** — sourced off-site (MCA/Crisil/D&B), not from the client |
| "Credit rating Crisil BBB-/Stable · A3" | hero credentials strip | **flagged** — same |
| "Class AA — Govt. of Gujarat" | hero credentials strip, hero eyebrow | **flagged** — a registration, not client-confirmed |
| "Established 1987" | hero, /about, footer | fine — the live site's own copy |

These four are duplicated in `lib/company.ts` (`CREDENTIALS`) and
`components/milestone-portal-hero.tsx`, which is where they actually render. **They were
deliberately not copied onto /about.** Confirm them with the client or remove them.

**Headcount is not published anywhere** and should not be: the sources disagree by an
order of magnitude — 54 in statutory filings against 101–500 self-reported.

---

## 7. Form delivery — a separate decision, deliberately deferred

`/contact` has **no enquiry form**. A form needs somewhere to deliver, and nothing in this
repo is configured to send mail: no environment file, no route handler, no provider. The
options were a form that posts nowhere and shows a success message, or no form. The first
silently loses tender enquiries while telling the sender they arrived.

The old site does POST to
`https://i9jz38s1o9.execute-api.us-east-1.amazonaws.com/email-beta/contact-us`, recovered
from the phase-1 bundle. **It has not been called.** Its stage is named `beta`, it sits in
`us-east-1` while the site's other two Lambdas are in `ap-south-1`, and whether it still
delivers, to whom, and with what authentication is entirely unverified. Establishing that
means sending mail to a real recipient.

Decide separately: revive that endpoint, add a provider, or stay with phone and email.

---

## 8. Still blocking

1. **Completed project records** — the eight in `docs/02-content-salvage.md` are confirmed
   copy but carry no photography, and `heroImage` is required. Seeding them needs either
   photographs or a schema change the owner has asked to preserve. **Highest value.**
2. **Bilodara–Sihunj** needs `contractValueCr` and `district`. Two fields promote a draft
   to a live record; 14 photographs are already in place waiting on them.
3. **Logo vector source** (R2 §4 item 1) — still open. `icon-512.png` stays unattempted.
4. `icon.svg` and `apple-icon.tsx` still carry `#3B498C`, off the R7 palette. A brand
   decision, unchanged since R5 §4.
5. `/capabilities`, `/credentials`, `/careers` are linked in `lib/nav.ts` and **404**.
