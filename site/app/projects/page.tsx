import type { Metadata } from "next"

import { ProjectsIndexView } from "./_index-view"
import { loadProjects } from "@/lib/content/load"

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Road, bridge, irrigation and river protection projects delivered by NCC Infraspace for government departments across Gujarat.",
}

export default function ProjectsPage() {
  return (
    <ProjectsIndexView
      eyebrow="Km 0.000 · Projects"
      title="Every project we have on record."
      intro="Roads, bridges, irrigation and river protection works, executed for state and national authorities. Ongoing and completed work each have their own page."
      projects={loadProjects()}
      emptyNote="No projects are published yet."
    />
  )
}
