import { ImageResponse } from "next/og"

/*
 * R2 §4: apple-touch-icon, 180x180, full NCC wordmark on --indigo, 20px padding.
 *
 * Generated rather than committed as a binary so it stays in sync with the
 * tokens and needs no design-tool round trip. Safari wants a PNG, which is what
 * ImageResponse emits.
 *
 * This uses the WORDMARK, not the monogram — at 180px there is room for it, and
 * not the Nataraja, which R2 §4 rules out at icon sizes.
 */

export const size = { width: 180, height: 180 }
export const contentType = "image/png"

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#3B498C", // --indigo
          padding: 20, // R2 §4
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 62,
            fontWeight: 800,
            letterSpacing: "-0.02em",
            color: "#FFFFFF", // R9: was warm white #FBFAF7
          }}
        >
          NCC
        </div>
      </div>
    ),
    size,
  )
}
