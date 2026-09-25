
import { pageMetadata } from "@/lib/metadata"
import { PageHeader, PAGE_SHELL } from "@/components/page-header"
import { CLIENT_GROUPS, loadClients } from "@/lib/content/clients"
import { ClientsView } from "./_clients-view"

/* Owner-verified relationships and project-record clients are grouped here.
 * PMGSY is a scheme, so it remains in project scopes only. */

export const metadata = pageMetadata("Clients", "Government departments, municipal corporations, national institutions and private clients NCC Infraspace has worked with.", "/clients")

export default function ClientsPage() {
  const clients = loadClients()
  const groups = CLIENT_GROUPS.map((g) => ({
    ...g,
    clients: clients.filter((c) => c.group === g.id),
  })).filter((g) => g.clients.length > 0)

  return (
    <div className={`${PAGE_SHELL} pb-[clamp(4rem,2.5rem+6.5vw,8.75rem)]`}>
      <PageHeader
        eyebrow="Clients"
        title="Who the work is for."
        intro={
          <>
            Government departments, municipal corporations, development
            authorities, national institutions and private organisations
            have worked with NCC Infraspace. The published contracts are in
            the project files.
          </>
        }
      />
      <div className="mt-8 border-t border-[color:var(--color-rule)] pt-8 lg:mt-10 lg:pt-10">
        <ClientsView groups={groups} />
      </div>
    </div>
  )
}
