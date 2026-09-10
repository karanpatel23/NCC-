import type { Metadata } from "next"

import { ProjectsIndexView } from "../_index-view"
import { projectsByStatus } from "@/lib/content/load"

export const metadata: Metadata = {
  title: "Ongoing projects",
  description:
    "Road and bridge projects NCC Infraspace is currently executing for government departments in Gujarat.",
}

export default function OngoingProjectsPage() {
  return (
    <ProjectsIndexView
      eyebrow="Km 0.000 · Ongoing"
      title="Work currently under execution."
      intro="Live projects with their authority, contract value and chainage. Where a progress figure is published it carries the date it was measured."
      projects={projectsByStatus("ongoing")}
      emptyNote="No ongoing projects are published yet."
    />
  )
}
