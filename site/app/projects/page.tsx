import type { Metadata } from "next"

import { ProjectsIndexView } from "./_index-view"
import { loadProjects } from "@/lib/content/load"

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Road, bridge, municipal, water and industrial infrastructure contracts delivered by NCC Infraspace for government authorities.",
}

export default function ProjectsPage() {
  return (
    <ProjectsIndexView
      eyebrow="Projects"
      title="The project files."
      intro="Road, municipal, water, industrial and rail infrastructure contracts executed for state, municipal and development authorities. Each sheet carries the authority and scope, with the contract value and chainage where they are on record."
      projects={loadProjects()}
      emptyNote="No projects are published yet."
    />
  )
}
