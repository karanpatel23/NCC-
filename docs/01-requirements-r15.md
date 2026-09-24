# NCC Infraspace — Brief Revision 15
### `docs/01-requirements-r15.md` · Post-hero editorial introduction, 16 September 2026

**Closed by the owner.** Replaces the R14 machinery-animation proposal, which was **not
implemented**. Hero, logo, navigation, blueprint, all 57 project records, contact details
and other pages are unchanged.

---

## 1. What is there now

An editorial text-and-photograph section occupying the area the portal already reserves,
with the existing credentials in a compact band directly beneath.

**Copy (owner-approved, fixed):**

> **Every journey has a reason.**
>
> To reach work. To bring produce to market. To get home. Roads are part of everyday life,
> connecting people to the places and opportunities that matter.

No subtitle, link, button, project detail, slogan or disclaimer is added. Credential
wording is untouched.

There is **no scroll animation** here — no parallax, scramble or delayed reveal. The
content is present when the section enters view.

---

## 2. The photograph

**`content/projects/bilodara-sihunj-road/images/site-03.jpg`** — 1600×1200, an
owner-confirmed frame from the published Bilodara–Sihunj record.

Chosen over the Bagodara frames because it carries the everyday traffic the brief asked
for and matches the copy: a white van on the finished carriageway, an auto-rickshaw and a
figure further up the road, pedestrian crossings, direction signage, village buildings,
trees and fields. The Bagodara aerials are strong but read as empty highway.

Its 4:3 ratio also crops cleanly — on desktop the column is 590×546 (ratio 1.08), so about
81% of the frame's width is kept with the road centred; on mobile a deliberate 4:5 portrait
crop keeps the carriageway running the full height. Square edges, no card, frame, overlay
or badge. Nothing is generated and no unconfirmed archive photograph is used.

---

## 3. Layout

**Desktop (≥900px):** two columns at `45fr / 55fr`. Heading set large across two lines,
paragraph beneath at a 46ch measure, the text block centred against the photograph, which
fills the right column's full width and height. Credentials sit in a compact band below,
separated by the existing copper rule.

**Mobile:** heading, paragraph, then the photograph immediately beneath at 4:5, then the
credentials. Natural content height — no desktop height is carried down.

### Two spacing bugs worth recording

The section sat in a 152px band of dead space at desktop, and the cause was **not** the
portal's reserved height:

1. **GlyphPortal's own `align-content: center`** wins by source order — its `<style>` is
   injected after this component's. The override repeats the attribute selector
   (`[data-gp-content][data-gp-content]`) to out-specify it.
2. **`margin: auto` on the arrival** absorbed the free space in the grid track and silently
   cancelled the stretch. It is now `margin-inline: auto; margin-block: 0`.

Measured after both fixes: the arrival fills its 700px track, and the only remaining space
above and below is the container's own 100px padding.

---

## 4. The portal boundary — what was NOT touched

`--gp-height` and the portal's `margin-top: calc((--gp-length - 1) * --gp-height)` are
**mechanical**: they position the arrival after the pinned sequence and set the hero's
animation length. Neither was changed. Only the *alignment of content inside* the reserved
box was adjusted.

The "See our credentials" anchor still resolves to a target rendering Established 1987,
Class AA, Turnover FY24 and Credit rating — verified, not assumed.

---

## 5. Verified

| | desktop 1440 | tablet 768 | mobile 390 | 320 |
|---|---|---|---|---|
| unused band above / below | 100 / 100 px *(container padding)* | 54 / 53 | 32 / 32 | 32 / 31 |
| image box | 590×546 | 661×826 | 326×408 | 256×320 |
| horizontal overflow | none | none | none | none |

`object-fit: cover` throughout — no stretching. 200% and 250% zoom: no overflow, heading
and body present. Hero anchor working, credentials wording unchanged, blueprint still
draws `[0,0,0] → [1,1,1]` on scroll. No page errors.

`typecheck` clean · 57 projects valid · production build green · **lint 4 problems,
identical to the existing baseline**.
