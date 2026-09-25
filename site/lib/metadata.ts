import type { Metadata } from "next"
export const SITE_URL = "https://nccinfraspace.com"
export function pageMetadata(title: string, description: string, path: string): Metadata {
  return { title, description, alternates: { canonical: path },
    openGraph: { type: "website", siteName: "NCC Infraspace", locale: "en_IN", title: `${title} · NCC Infraspace`, description, url: path, images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "NCC Infraspace" }] },
    twitter: { card: "summary_large_image", title: `${title} · NCC Infraspace`, description, images: ["/opengraph-image"] } }
}
