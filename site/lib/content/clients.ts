import { CLIENTS, CLIENT_GROUPS, type ClientGroup } from "@/content/clients"
import { loadProjects } from "./load"

/*
 * Resolves the client register against the project records.
 *
 * Every project must land on exactly one client. A record that matches none,
 * or more than one, FAILS THE BUILD rather than quietly disappearing from the
 * clients page: a contract silently detaching from its authority is the kind
 * of error nobody notices until a tender committee does.
 */

export type ResolvedClient = {
  id: string
  name: string
  short: string
  group: ClientGroup
  groupLabel: string
  logo?: string
  logoSource?: string
  scheme: boolean
  todo?: string
  projectCount: number
  categories: string[]
  states: string[]
  districts: string[]
  offices: string[]
  projects: Array<{ slug: string; title: string; valueCr?: number }>
}

export function loadClients(): ResolvedClient[] {
  const projects = loadProjects()
  const compiled = CLIENTS.map((c) => ({ c, re: new RegExp(c.match, "i") }))

  const buckets = new Map<string, typeof projects>()
  for (const p of projects) {
    const hits = compiled.filter(({ re }) => re.test(p.client))
    /* Zero is impossible for a real record and more than one is ambiguous.
     * Either way the contract would detach from its authority silently, which
     * is the kind of error a tender committee finds before anyone else does. */
    if (hits.length !== 1) {
      throw new Error(
        `Project "${p.slug}" matched ${hits.length} clients for client string ` +
          `"${p.client}"${hits.length ? ` (${hits.map((h) => h.c.id).join(", ")})` : ""}. ` +
          `Fix the match patterns in content/clients.ts.`,
      )
    }
    const id = hits[0].c.id
    buckets.set(id, [...(buckets.get(id) ?? []), p])
  }

  const groupLabel = new Map(CLIENT_GROUPS.map((g) => [g.id, g.label]))

  return CLIENTS.map((c) => {
    const rs = buckets.get(c.id) ?? []
    return {
      id: c.id,
      name: c.name,
      short: c.short ?? c.name,
      group: c.group,
      groupLabel: groupLabel.get(c.group) ?? c.group,
      logo: c.logo,
      logoSource: c.logoSource,
      scheme: c.scheme ?? false,
      todo: c.todo,
      projectCount: rs.length,
      categories: [...new Set(rs.map((p) => p.category))].sort(),
      states: [...new Set(rs.map((p) => p.state))].sort(),
      districts: [...new Set(rs.map((p) => p.district).filter(Boolean))].sort() as string[],
      /* The raw client strings behind this entry, tidied and de-duplicated.
       * For a department with several divisional offices this is what the
       * panel shows instead of pretending they are one office. */
      offices: [
        ...new Set(
          rs
            .map((p) => p.client.replace(/\s+/g, " ").trim())
            .map((c) => c.replace(/^Executive Engineer,?\s*/i, "")),
        ),
      ].sort(),
      projects: rs
        .map((p) => ({ slug: p.slug, title: p.title, valueCr: p.contractValueCr }))
        .sort((a, b) => (b.valueCr ?? 0) - (a.valueCr ?? 0)),
    }
  })
    /* Owner-verified clients with no published record still appear. The 57
     * records are a recovered 2018 to 2023 tender file, not a lifetime
     * history, so absence from them is not absence of the relationship. */
    .sort((a, b) => b.projectCount - a.projectCount)
}

export { CLIENT_GROUPS }
