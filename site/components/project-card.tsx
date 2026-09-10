import Link from "next/link"

import type { LoadedProject } from "@/lib/content/load"

/*
 * The project card — docs/03-competitor-maxel.md §4.1.
 *
 * Field order is taken from Maxel, who do this one thing better than anyone
 * else in the sector: scope, CLIENT, COST, ruthlessly consistent on every
 * card. Those are the three facts a tender evaluator checks, and the client is
 * the credential for government work, so it is labelled and prominent rather
 * than buried.
 *
 * Cost is ALWAYS in Cr, never lakhs. NCC's own live site publishes
 * "Rs. 7673.90 lakhs" where Maxel publishes "78 Cr." — the second is instantly
 * comparable, the first makes the reader do arithmetic.
 *
 * Chainage and progress are ours, added on top of their three.
 */

const STATUS: Record<
  LoadedProject["status"],
  { label: string; className: string }
> = {
  /* --orange has no equivalent in R7; live status uses --copper, which R7 §4
   * defines as the active-state accent. Raw copper cannot carry text, so the
   * pill is --copper-deep with a --white label at 4.51:1. */
  ongoing: {
    label: "Ongoing",
    className:
      "bg-[color:var(--color-copper-deep)] text-[color:var(--color-white)]",
  },
  completed: {
    label: "Completed",
    className:
      "bg-[color:var(--color-navy)] text-[color:var(--color-white)]",
  },
  awarded: {
    label: "Awarded",
    className:
      "border border-[color:var(--color-rule-strong)] text-[color:var(--color-slate-ink)]",
  },
}

export function ProjectCard({ project }: { project: LoadedProject }) {
  const s = STATUS[project.status]
  const chainage =
    project.chainageFrom && project.chainageTo
      ? `${project.chainageFrom} – ${project.chainageTo}`
      : null

  return (
    <article className="lift group border-t border-[color:var(--color-rule-strong)] pt-5">
      <div className="mb-3 flex items-center gap-3">
        <span
          className={`measurement rounded-[3px] px-2.5 py-1 text-[10px] tracking-[0.12em] uppercase ${s.className}`}
        >
          {s.label}
        </span>
        {project.district && (
          <span className="text-xs text-[color:var(--color-muted)]">
            {project.district}, {project.state}
          </span>
        )}
      </div>

      <h3 className="text-[length:var(--text-lg)] leading-tight">
        <Link
          href={`/projects/${project.slug}`}
          className="transition-colors hover:text-[color:var(--color-copper-ink)]"
        >
          {project.title}
        </Link>
      </h3>

      <p className="mt-3 max-w-[60ch] text-sm text-[color:var(--color-muted)]">
        {project.scopeSummary}
      </p>

      <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3">
        <div>
          <dt className="text-[10px] tracking-[0.14em] text-[color:var(--color-muted)] uppercase">
            Client
          </dt>
          <dd className="mt-1 text-sm">{project.client}</dd>
        </div>
        <div>
          <dt className="text-[10px] tracking-[0.14em] text-[color:var(--color-muted)] uppercase">
            Project cost
          </dt>
          <dd className="measurement mt-1 text-sm text-[color:var(--color-copper-ink)]">
            ₹{project.contractValueCr} Cr
          </dd>
        </div>
        {chainage && (
          <div>
            <dt className="text-[10px] tracking-[0.14em] text-[color:var(--color-muted)] uppercase">
              Chainage
            </dt>
            <dd className="measurement mt-1 text-sm">{chainage}</dd>
          </div>
        )}
      </dl>

      {/*
       * Progress renders only when BOTH the percentage and its date exist.
       * Main brief §8 wants the "as of" stamp precisely so a stale number is
       * embarrassing; an undated percentage looks current forever, which is
       * why the schema rejects one without the other.
       */}
      {project.progressPercent !== undefined && project.progressUpdated && (
        <div className="mt-5">
          <div className="flex items-baseline justify-between text-xs">
            <span className="measurement text-[color:var(--color-copper-ink)]">
              {project.progressPercent}% complete
            </span>
            <span className="measurement text-[color:var(--color-muted)]">
              as of {project.progressUpdated}
            </span>
          </div>
          <div
            className="mt-2 h-1 w-full overflow-hidden rounded-[2px] bg-[color:var(--color-mist)]"
            role="progressbar"
            aria-valuenow={project.progressPercent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${project.title} progress`}
          >
            <div
              className="h-full bg-[color:var(--color-copper)]"
              style={{ width: `${project.progressPercent}%` }}
            />
          </div>
        </div>
      )}
    </article>
  )
}
