import type { Metadata } from "next"

import { ProjectsIndexView } from "../_index-view"
import { projectsByStatus } from "@/lib/content/load"

export const metadata: Metadata = {
  title: "Completed projects",
  description:
    "Completed road, bridge and irrigation works delivered by NCC Infraspace for government authorities in Gujarat.",
}

/*
 * The most important page on the site for audience #1.
 *
 * docs/02-content-salvage.md: NCC's current live site publishes ZERO completed
 * projects, and docs/03-competitor-maxel.md: the nearest competitor publishes
 * ~₹761 Cr across nine. A tender evaluator checking "completed work of
 * comparable value" is the primary visitor, and this is the page they open.
 *
 * The empty state therefore says what is missing rather than rendering a bare
 * heading over nothing, which is exactly what both competitors do. Keep that
 * copy customer-facing — an earlier draft cited an internal docs/ path, which
 * has no business on a page a tender evaluator reads.
 */
export default function CompletedProjectsPage() {
  return (
    <ProjectsIndexView
      eyebrow="Km 0.000 · Completed"
      title="Work delivered and handed over."
      intro="Completed contracts with their authority, value and scope."
      projects={projectsByStatus("completed")}
      emptyNote="Completed project records are being compiled and will be published here."
    />
  )
}
