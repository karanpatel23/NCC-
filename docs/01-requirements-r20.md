# R20 — owner approvals applied: Expertise, Careers, CSR

## 1. What shipped

| Page | State |
|---|---|
| `/capabilities` (Expertise) | **rebuilt** on an explicit approved capability registry |
| `/careers` | **built** |
| `/csr` | **built** |
| `/credentials` | **still held** — see §2 |

Navigation now publishes: Projects · Expertise · Company ▾ (About NCC, Careers) · CSR · Contact.
Every internal link on every page resolves; `/credentials` is linked from nowhere.

## 2. `/credentials` — permission granted, document absent

The owner granted permission to display the Class AA certificate. **The certificate does not
exist in any recovered material.**

- `pack/00-FINDINGS.md` §8 lists it explicitly under *what is still unavailable*, alongside
  certifications and award records.
- The only archive file with "certificate" in its name is
  `src/home/icons/certificate.png` — a 1080×1080 decorative icon, not a document.
- The admin-lambda `uploads/` blobs are not certificates either. One was inspected and is a
  **mailbox-provisioning screenshot** containing a staff `@nccinfraspace.com` address and a
  support telephone number. It is internal, was not copied anywhere, and must not be published.

The same approval explicitly did **not** confirm the registration number, the validity, the FY24
turnover or the Crisil rating, so the standing R8 flag in `lib/company.ts` continues to bar the
two financial claims from new copy.

**The blocker has changed from permission to artifact.** To finish the page:

1. The certificate file itself — a scan or PDF.
2. Its registration number and validity date, which is what makes a registration checkable
   rather than an assertion.
3. Separately, if the page is to carry them: confirmation of the FY24 turnover (₹302 Cr) and the
   Crisil rating (BBB-/Stable · A3, reaffirmed February 2025).

## 3. Expertise — capabilities and portfolio are now separate

`lib/capabilities.ts` is the approved registry and the only thing that decides what NCC says it
does. The dependency runs one way: **a project can supply an example to a capability; it can
never create one.**

The previous version derived its sections from whichever categories appeared in the 57 records,
which made two opposite mistakes at once — it dropped bridges, irrigation and river protection
because the 2018–2023 file has no example of them, and it would have minted a new service claim
the moment anyone added a project in a new category.

Eight approved capabilities, with evidence attached only where it exists:

| Capability | Evidence |
|---|---|
| Roads and highways | 39 completed, 3 examples |
| Bridges and flyovers | none recorded |
| Irrigation | none recorded |
| River and protection works | none recorded |
| Urban and municipal roads | 9 completed, 3 examples |
| Water and drainage networks | 6 completed, 3 examples |
| Industrial estate infrastructure | 2 completed, 2 examples |
| Rail connectivity | 1 completed, 1 example |

The three owner-confirmed capabilities with no recorded project render their title and approved
description and then stop — **no zero count, no empty list, no "projects coming soon", no note to
the visitor about a gap.** Verified in the browser.

No technique, plant list, capacity figure, qualification or specialist credential appears
anywhere on the page, because none is approved.

### Wording consistency

The four headline build types were previously written out three times — on the homepage, on
`/about` and on `/capabilities` — and had already drifted: "ROB and RUB structures" on the
homepage against "rail over- and under-bridges" on `/about`. All three now read from the
registry, so they cannot drift again. Layouts, the hero, the bridge composition and the
blueprint are untouched; the homepage grid still shows its four headline segments and still
suppresses a count where there is no project.

## 4. Careers

Heading "Careers at NCC." and the owner-approved contact sentence verbatim, with a mailto link
and an "Email your CV" button pointing at the approved address in `lib/company.ts`. No mail was
sent.

Deliberately absent, and each for a reason: no vacancies (no `JobOpening` record exists), no
benefits, perks, culture copy or testimonials, no hiring locations (which office hires is not
established), no promise of consideration or response time, and **no form or upload facility** —
there is no backend to receive either, and a control that silently discards a CV is a worse
failure than no control. Verified: the page contains no `<form>` and no file input.

## 5. CSR

Built from the recovered Social Commitment block under the owner's approval to develop
conservative wording from that source.

**The separation is structural, not cosmetic.** The recovered block runs eleven items under one
heading, nine of which are Mr K. K. Patel's own offices. The page is two separately headed
sections — *The company / What NCC Infraspace supports* and *Personal, not corporate / The
founder's public service* — and the personal section opens by saying in plain words that the
offices are held in a personal capacity and are not NCC programmes.

Carried across conservatively. Deliberately **not** carried across:

- **"thousands of students"** — in the source that is the roll of the trust the founder chairs,
  not a count of anyone NCC has helped. Reused as an NCC figure it would be a fabricated outcome.
- **The "8000 Students" figure** attached to Sardar Vidhyabhavan Trust — an unverified headcount.
  The colleges are named without it.
- Any amount, date, duration, beneficiary count or programme name. The source contains none.
- Any photograph. None exists and none was created.

Obvious source typos in institution names were corrected — "Commitee", "Fondation", "Borad of
governer", "Universty", "Trutee". Correcting the spelling of a named institution is editorial,
not a change of claim.

**Still worth the owner's eye:** the company section rests on the single specific the source
offers, Lions Hospital in Mehsana — which also appears in the founder's trusteeships. If the
company's support for it is not separately true, that sentence needs to change, and the company
section would then have no concrete anchor at all.
