# NCC Infraspace — Brief Revision 11
### `docs/01-requirements-r11.md` · Full portfolio publication, 14 September 2026

**Closed by the owner.** Supersedes the mandatory-field and curated-subset restrictions
below. Palette, logo, hero, navigation and contact are untouched.

---

## 1. Owner approvals implemented

| # | Approval | Effect |
|---|---|---|
| 1 | Publish **all** distinct projects, not a curated subset | 57 published |
| 2 | All live and archived projects are **Completed**, including the Awarded record | every record `status: completed` |
| 3 | Completion dates neither required nor displayed | unchanged from R8; verified absent |
| 4 | MP package value is **₹158.27 Cr**; archive ids 1 and 27 are **ONE** project | one page, one value |
| 5 | Photographs, district and contract value may be **omitted** when unresolved | schema fields made optional |
| 6 | Three hash-matched photo associations confirmed | attached; nothing else inferred |
| 7 | Existing Bagodara (4) and Bilodara (14) photographs remain valid | untouched |

**Historical dataset labels do not override this.** Every recovered record came from a file
named `on-hand-proj-data`; the owner's confirmation, not the filename, sets status.

---

## 2. The canonical register

| | |
|---|---|
| Archive rows | 57 |
| Exact-scope duplicate groups | 1 — ids **1 and 27** |
| **Distinct archive projects** | **56** |
| Bagodara (archive id 5) | already published; **inside** the 56, not additional |
| Bilodara–Sihunj | not in the archive; **additional** |
| **Canonical published projects** | **57** |

**No further identity conflict was found.** Two near-duplicate pairs were checked at 0.99
text similarity and kept separate, correctly:

- ids **41 / 42** — sewer network Package-III and Package-IV, ₹37.39 Cr and ₹19.77 Cr
- ids **48 / 49** — Dholka SCSP packages `MMGSY/SCSP/08` and `/09`, ₹1.96 Cr and ₹2.29 Cr

Ward groups are likewise separate: ids **36 / 37 / 38** are Dyce-3, Dyce-2 and Dyce-1 wards
of North Zone, and id **55** is the package-B wards — same authority, four contracts.
Five sections of the Bagodara–Dhandhuka–Vallabhipur–Bhavnagar corridor (ids 5, 7, 22, 23,
24) stay separate because they are different chainage packages.

The eight live records (7 On-hand + 1 Awarded) **overlap** the archive and were not added
again; they map to archive ids 16, 26, 27, 28, 29, 30, 31, 33.

**Provenance** — archive ids and source lakhs — is recorded as an HTML comment inside each
MDX file. It is not visitor copy.

---

## 3. Schema changes

`heroImage`, `district` and `contractValueCr` are **optional**. Still validated: `title`,
`status`, `client`, `scopeSummary`, `category`, alt-text floor of 10 characters on any
image that is supplied, and `.positive()` on any value that is supplied — so **0 cannot
enter as a stand-in for "unknown"**.

**No substitutes are used anywhere**: no zero, no empty string, no fabricated date, no
"Unknown", no "TBC". A missing field is absent from the record and omitted from the page.

**District is never inferred from the awarding authority's office.** "R and B Panchayat
Division, Ahmedabad" is where the department sits, not where the road is; several
Ahmedabad-issued packages are works in other talukas. 31 of 57 records carry no district
and display none.

### Category enum widened

From four to eight: `highways`, `bridges`, `irrigation`, `protection`, **`urban`**,
**`water`**, **`industrial`**, **`rail`**. The recovered portfolio is not only roads, and
four values would have forced most records into `highways` — a silent falsehood in the
data. `bridges`, `irrigation` and `protection` are **retained** although no recovered
record uses them: their absence from one 2018–2023 working file is not evidence the
company lacks the capability.

Published spread: highways 39 · urban 9 · water 6 · industrial 2 · rail 1.

---

## 4. Money

Normalised from source **lakhs** with exact decimal arithmetic — `Decimal(lakhs) / 100`,
rounded **once**, **half-up**, to two decimals. Never float. The one row that is an exact
tie, id 24 at `14500.5 lakhs = 145.005 Cr`, displays **₹145.01 Cr** under half-up; Python's
default banker's rounding would have given ₹145.00.

MP uses the owner-confirmed **₹158.27 Cr**. Both historical source rows are preserved
unchanged in the extraction evidence.

**No aggregate portfolio value is published anywhere.** `projectTotals().valueCr` was
deleted from the loader so it cannot be rendered by accident, the listing header shows the
count only, and the homepage value tile is gone. The published set is a recovered
2018–2023 tender file; a total over it reads as an order book and is not one.

The surviving count tile is labelled **"Projects listed on this site"**.

---

## 5. Photography

Five projects carry images. Nothing else was attached.

| Project | Images | Source of the association |
|---|---|---|
| Bagodara–Fedra–Sarangpur | 4 | owner-supplied, pre-existing |
| Bilodara–Sihunj | 14 | owner-supplied, pre-existing |
| Chiloda–Gandhinagar–Sarkhej NH-147 | 1 | `Highway.jpeg`, hash-matched, owner-confirmed |
| MP Major District Roads | 1 | `Bridge.jpeg`, hash-matched, owner-confirmed |
| Various road works, Kheda R&B Division | 1 | `Kheda-Dholka-Road.jpeg`, hash-matched, owner-confirmed |

**`Kheda-Dholka-Road.jpeg` belongs to archive id 16 — the Kheda R&B various-road works —
and NOT to the separate Kheda–Dholka Road project (id 28).** The filename is misleading;
the live dataset's own association is authoritative. Do not "correct" this by filename.

**The Gandhi-statue image is not attached to anything.** The live source labels
`Sabarmati-Ashram-2.jpg` as "Gandhinagar City" — a monument photograph against a
four-laning contract, in the wrong city. It is not used.

The other retrieved Chiloda frames and `ltltkq0h_test.jpeg` are **not** approved and are
not used.

**52 projects have no image and render text-led** — no empty frames, no placeholders, no
stock photography, no generated scenes, no "image coming soon".

---

## 6. Unchanged

Pure-white / navy / slate / mist / copper · R10 transparent lockup with
`INFRASPACE PVT. LTD.` · original Nataraja · MILESTONE glyph-portal hero · navigation
breakpoint at `lg` · confirmed contact details · no geographic positioning in the hero.

Not bundled in, still separate decisions: leadership biographies, client-logo strip, the
milestone timeline, contact-form delivery, new credentials, `/capabilities`,
`/credentials`, `/careers`.
