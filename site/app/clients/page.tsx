import type { Metadata } from "next"

import { PageHeader, PAGE_SHELL } from "@/components/page-header"
import { CLIENT_GROUPS, loadClients } from "@/lib/content/clients"
import { ClientsView } from "./_clients-view"

/*
 * Clients.
 *
 * Every client here awarded at least one of the 57 published contracts. The
 * list is derived from the records, so it cannot drift from them, and a client
 * with no project does not appear at all.
 *
 * What is NOT here matters as much: NHAI, NABARD, MORTH, the Government of
 * India emblem, UP PWD and Adani. Logos for all six sat in the old site's
 * client slider and not one of the 57 records evidences a contract with any of
 * them. PMGSY is a central funding scheme and appears in project scope, not
 * as a client.
 */

export const metadata: Metadata = {
  title: "Clients",
  description:
    "The government departments, municipal corporations and development authorities that awarded NCC Infraspace its published contracts.",
}

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
            authorities and estate bodies award NCC Infraspace its work under
            open tender. Open any client to see what they commissioned.
          </>
        }
      />
      <div className="mt-8 border-t border-[color:var(--color-rule)] pt-8 lg:mt-10 lg:pt-10">
        <ClientsView groups={groups} />
      </div>
    </div>
  )
}
