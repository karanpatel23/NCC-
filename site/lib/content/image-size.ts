import fs from "node:fs"

/*
 * Intrinsic image dimensions, read from the file header at build time.
 *
 * WHY THIS EXISTS. The gallery used to force every photograph into an 18:25
 * portrait tile with object-cover, because R3 §3.1 made 18:25 the corridor's
 * ratio and the gallery inherited it. Applied to the actual photography that
 * is a destructive crop: the project sets are 1600×900 aerials and 1600×1200
 * drone frames, and squeezing 16:9 into 18:25 keeps 26% of the width. On an
 * aerial of a road — a subject that runs horizontally across the frame — that
 * throws away the road.
 *
 * Knowing the real dimensions lets each photograph render at its own aspect
 * ratio, and lets next/image receive explicit width and height so the layout
 * does not shift as images load.
 *
 * Scope is deliberately narrow: JPEG and WebP, which is everything in
 * content/. An unreadable or unsupported file returns null and the caller
 * falls back rather than throwing — a missing dimension should degrade the
 * layout, not fail the build. Genuinely broken CONTENT still fails the build,
 * via the Zod schema, which is where that belongs.
 */

export type Dimensions = { width: number; height: number }

/* JPEG: scan segments for a start-of-frame marker, which carries the size. */
function jpegSize(buf: Buffer): Dimensions | null {
  if (buf.length < 4 || buf[0] !== 0xff || buf[1] !== 0xd8) return null
  let i = 2
  while (i < buf.length - 9) {
    if (buf[i] !== 0xff) {
      i++
      continue
    }
    const marker = buf[i + 1]
    /* Standalone markers carry no length payload. */
    if (marker === 0xd8 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) {
      i += 2
      continue
    }
    const len = buf.readUInt16BE(i + 2)
    /* SOF0–SOF15, excluding DHT (c4), JPG (c8) and DAC (cc). */
    const isSOF =
      marker >= 0xc0 &&
      marker <= 0xcf &&
      marker !== 0xc4 &&
      marker !== 0xc8 &&
      marker !== 0xcc
    if (isSOF) {
      return {
        height: buf.readUInt16BE(i + 5),
        width: buf.readUInt16BE(i + 7),
      }
    }
    i += 2 + len
  }
  return null
}

/* WebP: RIFF container, three payload flavours each storing size differently. */
function webpSize(buf: Buffer): Dimensions | null {
  if (buf.length < 30) return null
  if (buf.toString("ascii", 0, 4) !== "RIFF") return null
  if (buf.toString("ascii", 8, 12) !== "WEBP") return null
  const fourcc = buf.toString("ascii", 12, 16)
  if (fourcc === "VP8 ") {
    return {
      width: buf.readUInt16LE(26) & 0x3fff,
      height: buf.readUInt16LE(28) & 0x3fff,
    }
  }
  if (fourcc === "VP8L") {
    const bits = buf.readUInt32LE(21)
    return {
      width: (bits & 0x3fff) + 1,
      height: ((bits >> 14) & 0x3fff) + 1,
    }
  }
  if (fourcc === "VP8X") {
    return {
      width: (buf.readUIntLE(24, 3) & 0xffffff) + 1,
      height: (buf.readUIntLE(27, 3) & 0xffffff) + 1,
    }
  }
  return null
}

const cache = new Map<string, Dimensions | null>()

export function imageSize(absolutePath: string): Dimensions | null {
  const hit = cache.get(absolutePath)
  if (hit !== undefined) return hit

  let out: Dimensions | null = null
  try {
    const fd = fs.openSync(absolutePath, "r")
    /* 64 KB is past the EXIF block on every file in content/ and far short of
     * reading whole multi-megabyte photographs. */
    const buf = Buffer.alloc(65536)
    const read = fs.readSync(fd, buf, 0, 65536, 0)
    fs.closeSync(fd)
    const slice = buf.subarray(0, read)
    out = jpegSize(slice) ?? webpSize(slice)
  } catch {
    out = null
  }

  cache.set(absolutePath, out)
  return out
}
