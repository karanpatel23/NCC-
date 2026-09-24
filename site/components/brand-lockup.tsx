import Image from "next/image"

import nataraja from "@/public/brand/nataraja.webp"

/*
 * The NCC lockup — R10.
 *
 * ── SOURCE ARTWORK ──────────────────────────────────────────────────────────
 *
 * Cut from public/brand/ncc-lockup-master.png, the LOSSLESS 3208×1182 original
 * recovered from the archived site source (ncc-website/src/menubar/NCC-logo.png).
 * That file is preserved in the repo, unmodified, and is never served.
 *
 * R9 cut these derivatives from a lossy WebP encode of the same artwork. The
 * master replaces it. Measured over the figure's opaque pixels, the WebP cost
 * PSNR 33.4 dB — mean error 4.69/255, 9% of pixels off by more than 8 — which
 * is visible in the brass gradients and nowhere else.
 *
 * Worth knowing before anyone "improves" this again: the WebP's ALPHA channel
 * was already bit-identical to the PNG's. The cutout edge was never degraded,
 * so the wordmark mask — which uses alpha only — gains nothing measurable from
 * the master. It is cut from the master anyway, so both derivatives have one
 * provenance instead of two.
 *
 * ── THE STANDALONE ICON WAS REJECTED, DELIBERATELY ──────────────────────────
 *
 * The archive also contains public/NCC-icon.png, 1245×1377, transparent, which
 * an earlier report recommended as a better Nataraja source. It is NOT used,
 * for two reasons found by inspecting it rather than trusting the report:
 *
 *   1. It is a DIFFERENT STATUE. Set beside the figure in the lockup it has a
 *      round lotus base where the lockup's has a rectangular stepped base, a
 *      different lattice in the flame arch, and a different aspect ratio
 *      (0.867 against 0.819). Adopting it would silently swap the company's
 *      mark for another photograph.
 *   2. It is CLIPPED. Alpha reaches 255 on both its first and last row, so the
 *      artwork runs off the canvas top and bottom.
 *
 * The figure in the lockup master touches no canvas edge and is complete.
 *
 * ── HOW IT IS BUILT ─────────────────────────────────────────────────────────
 *
 *   nataraja.webp          straight crop of the master, (18,2)–(955,1145),
 *                          resampled to 737×900. Never redrawn, autotraced,
 *                          stretched or recoloured. Brass stays brass.
 *   ncc-wordmark-mask.png  the alpha of the master's NCC band, (1061,7)–
 *                          (3172,717), at 1400×471. That band holds ZERO
 *                          non-blue opaque pixels, so its alpha reproduces the
 *                          letterforms exactly. Painted with currentColor.
 *
 * Neither is a vector and neither pretends to be one. No vector master exists:
 * the archive's src/logo.svg is the stock Create React App mark.
 *
 * ── THE SUPPORTING LINE ─────────────────────────────────────────────────────
 *
 * Live text reading "INFRASPACE PVT. LTD." — the wording the original artwork
 * carries, approved at R10 for the VISUAL MARK ONLY. The full legal name,
 * "NCC Infraspace Private Limited", stays everywhere else: the accessible
 * name below, COMPANY.legalName, the footer, /about and the CIN block.
 *
 * It is set in the site's Plex Sans letterspaced caps — the treatment R2 §3
 * took off the letterhead for the sitewide eyebrow.
 *
 * ── PROPORTIONS ─────────────────────────────────────────────────────────────
 *
 * The figure is the tallest element and sets the lockup's height. The wordmark
 * is 0.6244 of it, the master's own ratio (710/1137). Both keep their native
 * aspect — 0.8186 and 2.9724 — with object-contain, which is load-bearing:
 * next/image rounds derivative heights to whole pixels, and without contain
 * the browser default object-fit: fill squeezes the artwork by ~1%.
 *
 * The supporting line runs wider than the three letters above it. That is the
 * ordinary shape of an acronym over its expansion, and the alternative —
 * stretching the text or padding it with tracking until the columns match —
 * is explicitly not wanted.
 */

const FIGURE_RATIO = 934 / 1141 // 0.8186, measured off the master
const WORDMARK_RATIO = 2111 / 710 // 2.9732, measured off the master

type Variant = {
  /** Total artwork height: the figure sets it. */
  figure: string
  wordmark: string
  legal: string
  tracking: string
  gap: string
  stack: string
}

const SIZES: Record<"header" | "footer", Variant> = {
  /*
   * 40px up to lg, 48px from lg, inside the 56px / 72px header bar.
   *
   * The step is at LG, not MD, and that is a measured constraint rather than
   * a taste call. The nav appears at md, so between 768 and 1023 the bar
   * carries the mark, five nav items and the Enquire CTA. At 768 the content
   * needs 720px of the 768 available; a 48px mark overflows it and the CTA
   * clips off the right edge — invisibly, because the header is fixed and so
   * never raises a scrollbar to give the problem away.
   */
  header: {
    figure: "h-10 lg:h-12",
    wordmark: "h-[25px] lg:h-[30px]",
    legal: "text-[length:var(--text-caption)] lg:text-[length:var(--text-caption)]",
    tracking: "tracking-[0.07em] lg:tracking-[0.08em]",
    gap: "gap-[9px] lg:gap-[11px]",
    stack: "mt-[4px] lg:mt-[5px]",
  },
  /* 56px — the footer has vertical room the header does not. */
  footer: {
    figure: "h-14",
    wordmark: "h-[35px]",
    legal: "text-[length:var(--text-xs)]",
    tracking: "tracking-[0.09em]",
    gap: "gap-[13px]",
    stack: "mt-[6px]",
  },
}

export function BrandLockup({
  size = "header",
  priority = false,
  /**
   * True when an ancestor already names this for assistive technology — the
   * header wraps the lockup in a link that carries the name. Without this the
   * link and the image announce the company twice.
   */
  decorative = false,
  className = "",
}: {
  size?: keyof typeof SIZES
  priority?: boolean
  decorative?: boolean
  className?: string
}) {
  const s = SIZES[size]
  return (
    <span
      {...(decorative
        ? { "aria-hidden": true }
        : { role: "img", "aria-label": "NCC Infraspace Private Limited" })}
      className={`inline-flex items-center ${s.gap} ${className}`}
    >
      <Image
        src={nataraja}
        alt=""
        aria-hidden
        priority={priority}
        sizes="80px"
        className={`${s.figure} w-auto object-contain`}
        style={{ aspectRatio: FIGURE_RATIO }}
      />

      <span className="flex flex-col items-start">
        <span
          aria-hidden
          className={`${s.wordmark} block bg-[currentColor]`}
          style={{
            aspectRatio: WORDMARK_RATIO,
            WebkitMaskImage: "url(/brand/ncc-wordmark-mask.png)",
            maskImage: "url(/brand/ncc-wordmark-mask.png)",
            WebkitMaskSize: "contain",
            maskSize: "contain",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskPosition: "left center",
            maskPosition: "left center",
          }}
        />
        <span
          aria-hidden
          className={`${s.legal} ${s.stack} ${s.tracking} block font-[family-name:var(--font-plex-sans)] leading-none font-medium whitespace-nowrap`}
        >
          INFRASPACE PVT. LTD.
        </span>
      </span>
    </span>
  )
}
