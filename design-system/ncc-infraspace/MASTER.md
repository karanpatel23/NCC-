# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** NCC Infraspace
**Generated:** 2026-08-25 13:43:48
**Category:** Construction/Architecture
**Design Dials:** Variance 3/10 (Centered / Minimal) | Motion 3/10 (Subtle) | Density 4/10 (Standard)

---

## Global Rules

### Color Palette

> **OVERRIDDEN FROM GENERATED DEFAULT.** The skill proposed a generic industrial
> grey + safety orange palette (`#64748B` / `#EA580C`). Discarded: the client
> already owns a palette, published in the live site's CSS custom properties, and
> swapping it would be an unauthorised rebrand rather than a redesign. Extracted
> from `forensics/out/pages/home.json` → `cssVars`:
>
> | Live token | Value | Kept? |
> |---|---|---|
> | `--primary-blue-color` | `#374991` | ✅ kept as-is — passes at 8.32:1 |
> | `--primary-yellow-color` | `#ee9a08` | ⚠️ non-text only — fails at 2.27:1 |
> | `--secondary-gray-color` | `#b2b4b3` | ⚠️ darkened for text/border use |
> | `--secondary-light-gray-color` | `#ebedec` | ✅ kept as surface fill |
>
> Every ratio below is computed, not estimated (WCAG 2.1 relative luminance,
> sRGB). Derived tokens hold the brand hue (38°) and saturation (93%) and vary
> lightness only, so they still read as the same brand colour.

| Role | Hex | CSS Variable | Contrast | Verdict |
|------|-----|--------------|----------|---------|
| Primary | `#374991` | `--color-primary` | 8.32:1 on white | ✅ AA |
| On Primary | `#FFFFFF` | `--color-on-primary` | 8.32:1 on primary | ✅ AA |
| Secondary | `#5D71C2` | `--color-secondary` | 4.56:1 on white | ✅ AA |
| On Secondary | `#FFFFFF` | `--color-on-secondary` | 4.56:1 on secondary | ✅ AA |
| Accent (graphic) | `#EE9A08` | `--color-accent` | non-text use only | ⚠️ never as text |
| On Accent | `#212529` | `--color-on-accent` | 6.80:1 on accent | ✅ AA |
| Accent Display | `#CB8407` | `--color-accent-display` | 3.07:1 on white | ✅ AA-large (≥24px) |
| Accent Text | `#A46A06` | `--color-accent-text` | 4.52:1 on white | ✅ AA |
| Background | `#FFFFFF` | `--color-background` | — | — |
| Foreground | `#212529` | `--color-foreground` | 15.43:1 on white | ✅ AAA |
| Card | `#FFFFFF` | `--color-card` | — | — |
| Card Foreground | `#212529` | `--color-card-foreground` | 15.43:1 on card | ✅ AAA |
| Muted | `#EBEDEC` | `--color-muted` | — | — |
| Muted Foreground | `#686A69` | `--color-muted-foreground` | 4.63:1 on muted | ✅ AA |
| Border (decorative) | `#EBEDEC` | `--color-border` | dividers only | — |
| Border (interactive) | `#909392` | `--color-border-strong` | 3.10:1 on white | ✅ 1.4.11 |
| Destructive | `#DC2626` | `--color-destructive` | 4.83:1 on white | ✅ AA |
| On Destructive | `#FFFFFF` | `--color-on-destructive` | 4.83:1 on destructive | ✅ AA |
| Ring (focus) | `#374991` | `--color-ring` | 8.32:1 on white | ✅ AA |

**The amber rule — this is the one that gets got wrong.** `#EE9A08` is the
client's brand colour and it is 2.27:1 on white, failing AA *and* AA-large. The
live site currently uses it as 30px heading text ("We are AA class contractor",
"Gandhi Ashram Precinct") — a real, shipped accessibility failure. Do not carry
it forward. Instead:

- **Filled amber block with `#212529` text on top** → 6.80:1. Preferred treatment.
- **Amber as text ≥24px** → `--color-accent-display` (`#CB8407`).
- **Amber as body text or a link** → `--color-accent-text` (`#A46A06`).
- **`#EE9A08` raw** → rules, underlines, icon fills, chart series, block
  backgrounds. Never letterforms.

`--secondary-gray-color` `#b2b4b3` has the same defect (2.08:1) and must never
carry text either; it is demoted to decorative-divider duty.

### Typography

> **OVERRIDDEN FROM GENERATED DEFAULT.** The skill proposed Inter + Playfair
> Display, whose own database entry reads *"editorial, poster, luxury,
> type-as-hero, manifesto"* and *"Best For: creative brand flagships, reading
> platforms, luxury mobile experiences."* Wrong register for a Class-AA
> government roads-and-bridges contractor. A targeted re-query returned a pairing
> built for this exact audience.

- **Heading Font:** Lexend
- **Body Font:** Source Sans 3
- **Pairing:** "Corporate Trust" — *Best For: enterprise, government, healthcare,
  finance, accessibility-focused.* Skill note: *"Lexend designed for readability.
  Excellent accessibility."*
- **Why it fits:** customers are government agencies; the site's job is
  credibility and credentials, not consumer appeal. Lexend was designed to
  measurably improve reading proficiency, which suits tender-facing credential
  tables and recruitment copy.

**CSS Import:**
```css
@import url('https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700&family=Source+Sans+3:wght@300;400;500;600;700&display=swap');
```

**Tailwind config:**
```js
fontFamily: {
  heading: ['Lexend', 'sans-serif'],
  body:    ['Source Sans 3', 'sans-serif'],
}
```

**Two families, replacing five.** The live site loads Montserrat, PT Sans and
Roboto from Google Fonts while 291 elements still render in the `system-ui`
fallback stack and 15 render in **Times** — i.e. genuinely unstyled.

### Spacing Variables

*Density: 4/10 — Standard*

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | `4px` / `0.25rem` | Tight gaps |
| `--space-sm` | `8px` / `0.5rem` | Icon gaps, inline spacing |
| `--space-md` | `16px` / `1rem` | Standard padding |
| `--space-lg` | `24px` / `1.5rem` | Section padding |
| `--space-xl` | `32px` / `2rem` | Large gaps |
| `--space-2xl` | `48px` / `3rem` | Section margins |
| `--space-3xl` | `64px` / `4rem` | Hero padding |

### Shadow Depths

| Level | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Subtle lift |
| `--shadow-md` | `0 4px 6px rgba(0,0,0,0.1)` | Cards, buttons |
| `--shadow-lg` | `0 10px 15px rgba(0,0,0,0.1)` | Modals, dropdowns |
| `--shadow-xl` | `0 20px 25px rgba(0,0,0,0.15)` | Hero images, featured cards |

---

## Component Specs

### Buttons

```css
/* Primary Button */
.btn-primary {
  background: #EA580C;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 200ms ease;
  cursor: pointer;
}

.btn-primary:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

/* Secondary Button */
.btn-secondary {
  background: transparent;
  color: #64748B;
  border: 2px solid #64748B;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 200ms ease;
  cursor: pointer;
}
```

### Cards

```css
.card {
  background: #F8FAFC;
  border-radius: 12px;
  padding: 24px;
  box-shadow: var(--shadow-md);
  transition: all 200ms ease;
  cursor: pointer;
}

.card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}
```

### Inputs

```css
.input {
  padding: 12px 16px;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 200ms ease;
}

.input:focus {
  border-color: #64748B;
  outline: none;
  box-shadow: 0 0 0 3px #64748B20;
}
```

### Modals

```css
.modal-overlay {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}

.modal {
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: var(--shadow-xl);
  max-width: 500px;
  width: 90%;
}
```

---

## Style Guidelines

**Style:** Minimalism & Swiss Style

**Keywords:** Clean, simple, spacious, functional, white space, high contrast, geometric, sans-serif, grid-based, essential

**Best For:** Enterprise apps, dashboards, documentation sites, SaaS platforms, professional tools

**Key Effects:** Subtle hover (200-250ms), smooth transitions, sharp shadows if any, clear type hierarchy, fast loading

### Page Pattern

**Pattern Name:** Hero-Centric Design — *adapted for credibility, not conversion*

> **PARTIALLY OVERRIDDEN.** The generated pattern optimises for a single
> conversion CTA. That is the wrong goal here. Per `CLAUDE.md`: customers are
> predominantly government agencies, and *"the site's job is credibility,
> credentials, and recruitment, not commercial lead generation."* A tender
> officer evaluating a contractor is not a funnel to be converted — they are
> verifying that this firm is real, registered, solvent, and has built things
> before. The hero structure is kept; the CTA strategy is replaced.

- **Primary goal:** substantiate the firm. Credentials must be visible without
  scrolling, and reachable without JS.
- **CTA strategy:** *two* co-equal paths, not one — **"View our projects"**
  (credibility) and **"Work with us"** (recruitment). Contact is a utility link
  in the header, not a conversion target.
- **Section order:**
  1. Hero — firm name, what it builds, where. No marketing abstraction.
  2. **Credentials strip** — Class AA contractor (Gujarat), CIN, Crisil rating,
     "since 1987". This is the single highest-value block on the site and is
     currently buried; it is what a tender officer is looking for.
  3. Proof — completed/ongoing project counts with real named projects.
  4. Capability — roads, bridges (matches the existing `projecttype` taxonomy).
  5. Recruitment + contact.
- **Retain the 1987 heritage in body copy.** `CLAUDE.md` records that the
  Natraj Construction Company origin currently survives only as a meta
  description tagline. A 39-year track record is a credibility asset for exactly
  this audience and should be stated on the page, not hidden in `<head>`.

**Anti-pattern for this client:** sticky "Get a Quote" nav CTAs, urgency
language, and testimonial carousels. Government procurement does not respond to
them and they cost credibility.

---

## Motion

**Scroll Reveal** (Subtle) — Trigger: scroll (viewport enter) | Duration: 300-400ms | Easing: `power1.out`

```js
gsap.from(el, { opacity: 0, y: 12, duration: 0.35, ease: 'power1.out', scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none reverse' } });
```

**Framework notes:** Requires the ScrollTrigger plugin registered once via gsap.registerPlugin(ScrollTrigger); Use matchMedia('(prefers-reduced-motion: reduce)') to skip non-essential motion and render the final state immediately

- ✅ Keep the y offset small (8-16px) so it reads as a fade, not a slide
- ❌ Don't reveal below-the-fold content needed for SEO/crawlers as invisible-by-default without a no-JS fallback
- ⚡ toggleActions 'play none none reverse' avoids re-triggering on every scroll direction change

---

## Anti-Patterns (Do NOT Use)

- ❌ 2D-only layouts
- ❌ Poor image quality
- ❌ AI purple/pink gradients

### Additional Forbidden Patterns

- ❌ **Emojis as icons** — Use SVG icons (Heroicons, Lucide, Simple Icons)
- ❌ **Missing cursor:pointer** — All clickable elements must have cursor:pointer
- ❌ **Layout-shifting hovers** — Avoid scale transforms that shift layout
- ❌ **Low contrast text** — Maintain 4.5:1 minimum contrast ratio
- ❌ **Instant state changes** — Always use transitions (150-300ms)
- ❌ **Invisible focus states** — Focus states must be visible for a11y

---

## Pre-Delivery Checklist

Before delivering any UI code, verify:

- [ ] No emojis used as icons (use SVG instead)
- [ ] All icons from consistent icon set (Heroicons/Lucide)
- [ ] `cursor-pointer` on all clickable elements
- [ ] Hover states with smooth transitions (150-300ms)
- [ ] Light mode: text contrast 4.5:1 minimum
- [ ] Focus states visible for keyboard navigation
- [ ] `prefers-reduced-motion` respected
- [ ] Responsive: 375px, 768px, 1024px, 1440px
- [ ] No content hidden behind fixed navbars
- [ ] No horizontal scroll on mobile
