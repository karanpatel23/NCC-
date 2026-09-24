# R19 — approved navigation, and the completion plan for the remaining pages

## 1. The approved structure

    Projects · Expertise · Company ▾ · CSR · Contact

Recorded in full in `site/lib/nav.ts`. Every entry carries `published`; the header and footer
render only the published ones, so the approved shape is stored while no visitor is handed a
link to a 404.

| Item | Destination | State |
|---|---|---|
| Projects | `/projects` | **live** |
| Expertise | `/capabilities` | **live** — built this phase |
| Company ▾ | disclosure, no page of its own | **live** |
| → About NCC | `/about` | **live** |
| → Credentials | `/credentials` | held — §3.1 |
| → Careers | `/careers` | held — §3.2 |
| CSR | `/csr` | held — §4 |
| Contact | `/contact` | **live**, primary navigation button |

**"Expertise" is a label change only.** The route stays `/capabilities`. A visitor-facing word is
not a reason to break a URL.

**The Company dropdown currently holds one destination.** That is the honest consequence of
holding Credentials and Careers, not an oversight. It is a real disclosure rather than a link to
`/about` because the approved structure says so and because the group fills the moment either
held page is cleared — `nav.ts` is a one-word change per item.

## 2. Navigation behaviour — all verified in a browser

- Logo artwork, proportions and palette untouched; the mark still steps 40px → 48px at `lg`, not
  `md`, which is load-bearing for the 768–1023 band.
- Company is a real `<button>` with `aria-expanded` and `aria-controls` pointing at a menu that
  exists. **Not hover.** Click, Enter and Space all toggle it.
- **Escape closes it and returns focus to the trigger** — verified, `document.activeElement` is
  the button afterwards. Without that, focus lands on `<body>` and the next Tab restarts at the
  top of the document.
- Outside `pointerdown` closes it. Choosing a destination closes it.
- Current page is marked with `aria-current="page"` and a copper tint. The Company trigger is
  marked current while any of its children is current, so the group shows where you are while
  collapsed. A project detail route still marks Projects.
- Measured at 320 / 390 / 640 / 767 / 768 / 800 / 900 / 1023 / 1024 / 1280 / 1440 / 1536: no
  overflow, the Contact button is never clipped, the tightest nav-to-button gap is 113px at 768,
  and the open menu stays inside the viewport at every width.
- The mobile sheet lists the group expanded under a "Company" label rather than nesting a second
  disclosure inside the first.

## 3. Held pages, and exactly what each one needs

### 3.1 `/credentials` — blocked by a standing decision, not by effort

The four credential facts are Established 1987, Class AA — Govt. of Gujarat, Turnover FY24
₹302 Cr, and Crisil BBB-/Stable · A3.

R8 bars unconfirmed financial figures and credit ratings from **new** copy. The flag in
`lib/company.ts` says in terms: *"Do not copy these onto /about or any new page until the owner
confirms them."* `/about` already declined them for exactly that reason, recording that
*"copying them onto a second page is expanding them"*. A page whose entire subject is those
claims is the largest possible expansion of them.

Strip the barred two and what remains — 1987, Class AA, CIN, the legal identity — is already
published in the hero credentials panel, the footer and `/about`. The page would restate the
homepage and tell a tender evaluator nothing new.

**To finish it, the owner needs to confirm:**
1. FY24 turnover — ₹302 Cr, currently sourced from MCA/D&B, not from NCC.
2. The Crisil rating and its date — BBB-/Stable and A3, reaffirmed February 2025.
3. The Class AA registration **number and validity**, which is what makes a registration
   checkable rather than an assertion.
4. Whether any certificate documents may be published, and in what form.

Items 1 and 2 also govern whether the four may stay in the homepage panel; they are flagged
there and this phase did not disturb them.

### 3.2 `/careers` — nothing exists

No `JobOpening` record has ever been authored. There is no approved recruitment mailbox. The R8
contact email is the general office address, and being reachable is not the same as being an
approved CV destination — the brief is explicit on that point and so is §7's rule against
inventing a field.

**To finish it, the owner needs to supply either:**
1. At least one confirmed opening — title, department, location, experience, responsibilities;
   the `JobOpening` schema already exists and validates all of it — **or**
2. An approved recruitment contact and process, if the intent is a standing "we accept CVs" page
   rather than a vacancy list.

No benefits, testimonials, culture copy or photographs are proposed, because none is approved.

## 4. `/csr` — proposed copy, for owner review only. NOT PUBLISHED.

### 4.1 What the source actually contains

`pack/content-inventory.md` `/our-company` carries a Social Commitment block. Read carefully, it
is **two different things**, and the brief is right to require they be separated:

**(a) The founder's personal offices and trusteeships** — nine entries, all Mr K. K. Patel's own
roles, not company programmes:

> Vice Chairman, The Mehsana Urban Co-op Bank Ltd., Mehsana · Vice-Chairman, Gujarat Contractor
> Association · President, Dharti Parivar Mehsana · Trustee, Umiya Mataji Sansthan Unjha ·
> Trustee and Managing Committee Member, Vishva Umiya Foundation · Ex-president, Kedvani Mandal,
> Jay Umiya Masik · Managing Trustee, Sardar Vidhyabhavan Trust · Trustee and Ex-Board of
> Governors, Ganpat University · Trustee, Lions Hospital, Mehsana

**(b) Two company-level sentences**, both unquantified: that NCC participates in "various social
initiatives, educational programs, and healthcare projects", and that it supports "educational
institutions with thousands of students" and "healthcare facilities such as Lions Hospital in
Mehsana".

`pack/decisions-for-owner.md` item 9 — *"The Social Commitment section names trusteeships and
offices held. Republish?"* — **is still unanswered.**

### 4.2 Why none of it ships yet

- (a) is personal biography, not corporate social responsibility. Publishing a director's
  trusteeships under a company CSR heading implies the company sits behind those institutions.
  That is a different claim from the one the source makes.
- (b) names no programme, no period, no beneficiary count and no amount. "Thousands of students"
  is the trust's roll, not an NCC contribution.
- The Lions Hospital link appears in both lists — the founder is a trustee **and** the company is
  said to contribute. Which of those is the publishable fact needs the owner to say.
- No CSR photograph exists. None would be created.

### 4.3 Proposed copy — for approval, verbatim, before any of it is built

> **Eyebrow:** CSR
> **H1:** Commitment beyond the contract.
>
> **Company paragraph (needs confirmation of every specific):**
> NCC Infraspace supports education and healthcare in the districts where it works. [OWNER:
> name the institutions the *company* supports, and in what form — funding, construction at
> cost, materials, or another arrangement. Without at least one specific this paragraph should
> not be published at all.]
>
> **Founder's public service — separate section, separately headed:**
> Beyond the company, its founder Mr K. K. Patel holds a number of public and charitable
> offices in Mehsana and north Gujarat, including trusteeships in education, healthcare and
> cooperative banking. [OWNER: approve publishing the named list, approve a summary sentence
> only, or decline.]

Three questions decide the page: **(i)** may the trusteeships be republished at all; **(ii)** are
they presented as the founder's personal service, clearly separated from company activity; and
**(iii)** is there one concrete, confirmable company contribution to anchor the company section.
Without (iii) there is no company CSR page — only a director's biography, which belongs on
`/about` if anywhere.

## 5. `/capabilities` — Expertise, built this phase

Every claim is derived from the 57 approved project records. Categories are the ones actually
used, counts are counted, states are the states on the records, and each capability links to the
records behind it. No services list, no sector claim, no process narrative — none of that is
approved copy.

Live: Highways 39 · Urban 9 · Water 6 · Industrial 2 · Rail 1, across Gujarat and Madhya Pradesh.

**Deliberately absent: bridges, irrigation and river protection.** All three are in the schema
and all three appear on `/about` as things NCC builds. None has a single record in the recovered
2018–2023 portfolio. CLAUDE.md is explicit that their absence "is not evidence the company lacks
the capability", so they are not denied — they are simply not presented as *evidenced* capability
on a page whose premise is delivered work. The page reads the content tree, so the moment a
record exists they appear on their own.

**Review list for the owner:**
1. Confirm bridges, irrigation and river protection as current capabilities, and if so supply one
   reference project each — or accept that `/about` claims four build types the portfolio
   evidences none of.
2. The recovered `/our-company` copy names PMGSY, NABARD, N.H., EPC, Hudco, GMC smart city, GUDC
   MSWM and SSPA & DPEP programmes. These are programme names, not categories, and are not
   published here. Confirm before use.
3. The same copy claims four states — Gujarat, Madhya Pradesh, Uttar Pradesh and Rajasthan —
   while the founder biography on the same page says three. The records evidence two. Unresolved;
   the page states only the two it can show.
