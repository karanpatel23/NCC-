import type { MetadataRoute } from "next"
import { loadProjects } from "@/lib/content/load"
import { SITE_URL } from "@/lib/metadata"
export default function sitemap(): MetadataRoute.Sitemap {
 const pages=["/","/projects","/about","/capabilities","/clients","/csr","/careers","/contact"]
 return [...pages.map(path=>({url:`${SITE_URL}${path}`,changeFrequency:"monthly" as const,priority:path==="/"?1:.7})),...loadProjects().map(p=>({url:`${SITE_URL}/projects/${p.slug}`,changeFrequency:"yearly" as const,priority:.5}))]
}
