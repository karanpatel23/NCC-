import { ImageResponse } from "next/og"

import { COMPANY } from "@/lib/company"

/*
 * The social card, generated rather than stored, so it cannot drift from the
 * company facts in lib/company.ts.
 *
 * Deliberately typographic. There is no photograph that represents all 57
 * projects, and choosing one would be an editorial claim about which job
 * matters most. The brand navy, the wordmark and two checkable facts.
 */
export const runtime = "nodejs"
export const alt = "NCC Infraspace, road and bridge contractors since 1987"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#18202f",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 22,
              letterSpacing: 6,
              color: "#ba7754",
              textTransform: "uppercase",
            }}
          >
            Est. 1987 · Infrastructure contractor
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 104,
              lineHeight: 1.02,
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: -2,
            }}
          >
            NCC Infraspace
          </div>
          <div
            style={{
              marginTop: 20,
              fontSize: 36,
              color: "rgba(255,255,255,0.82)",
            }}
          >
            {COMPANY.positioning}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "2px solid #b8734f",
            paddingTop: 24,
            fontSize: 24,
            color: "rgba(255,255,255,0.72)",
          }}
        >
          <span>Roads · Bridges · Irrigation · Urban · Water</span>
          <span>nccinfraspace.com</span>
        </div>
      </div>
    ),
    size,
  )
}
