"use client"

import Image from "next/image"
import Link from "next/link"
import { useId, useMemo, useState } from "react"

import type { SheetProject } from "./_sheet-data"

/*
 * The project files — the listing, as engineering dossier sheets.
 *
 * ONE COLUMN at every width. Fifty-seven wide sheets read as a file of
 * records; the same fifty-seven in a three-up card grid read as a gallery,
 * and the evaluator this page exists for is scanning for a road name and a
 * contract value, not browsing thumbnails.
 *
 * There is no sheet numbering anywhere. Decorative 01/02/57 counters would be
 * an invented ordinal — the archive's own package numbers and chainage are
 * real and appear in the record, a position in a filtered list is not.
 *
 * This is a client component so search and filtering need no round trip, but
 * Next still renders it on the server: all fifty-seven sheets are in the
 * initial HTML. With JavaScript off the whole file is present and readable,
 * the disclosure panels are forced open by the <noscript> rule below, and
 * only the filtering is inert.
 */

function Disclosure({
  expanded,
  onToggle,
  panelId,
  title,
}: {
  expanded: boolean
  onToggle: () => void
  panelId: string
  title: string
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={expanded}
      aria-controls={panelId}
      /* A project-specific accessible name. "Expand" fifty-seven times over
       * gives a screen-reader user a list of identical controls. */
      aria-label={`${expanded ? "Hide" : "Show"} record details for ${title}`}
      className="grid h-11 w-11 shrink-0 place-items-center border border-[color:var(--color-rule)] text-[color:var(--color-ink)] transition-colors duration-150 hover:border-[color:var(--color-copper)] hover:text-[color:var(--color-copper-ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-focus)]"
    >
      {/* Plus when collapsed, minus when expanded. Drawn, not typed, so the
       * two states are the same optical weight at any size. */}
      <svg width="15" height="15" viewBox="0 0 15 15" aria-hidden focusable="false">
        <line x1="0.5" y1="7.5" x2="14.5" y2="7.5" stroke="currentColor" strokeWidth="1.5" />
        {!expanded && (
          <line x1="7.5" y1="0.5" x2="7.5" y2="14.5" stroke="currentColor" strokeWidth="1.5" />
        )}
      </svg>
    </button>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-1 border-b border-[color:var(--color-rule)] py-3 last:border-b-0 sm:grid-cols-[minmax(9rem,10rem)_1fr] sm:gap-6">
      <dt className="font-[family-name:var(--font-plex-sans)] text-[length:var(--text-caption)] font-medium tracking-[0.14em] text-[color:var(--color-muted)] uppercase">
        {label}
      </dt>
      {/* min-w-0 + normal wrapping: a 70-character authority name must wrap,
       * never truncate. */}
      <dd className="measurement min-w-0 text-[length:var(--text-base)] leading-relaxed break-words text-[color:var(--color-ink)]">
        {value}
      </dd>
    </div>
  )
}

function Sheet({ project }: { project: SheetProject }) {
  const [expanded, setExpanded] = useState(false)
  const panelId = `${useId()}-record`

  /*
   * Expanded rows are metadata the collapsed sheet does not already show.
   * The MDX scope narrative is deliberately NOT repeated here — on most
   * records it restates scopeSummary with a clause or two added, and padding
   * a sheet with near-identical prose is the thing §3 forbids. The full
   * narrative is on the project's own page.
   */
  const rows: Array<[string, string]> = []
  rows.push(["Client", project.client])
  if (project.authority) rows.push(["Authority", project.authority])
  if (project.highway) rows.push(["Highway", project.highway])
  if (project.chainage) rows.push(["Chainage", project.chainage])
  if (project.lengthKm) rows.push(["Length", `${project.lengthKm} km`])
  rows.push(["Location", project.location])

  return (
    <article
      data-sheet
      className="border border-[color:var(--color-rule)] bg-[color:var(--color-white)] p-[18px] transition-colors duration-150 has-[a:hover]:border-[color:var(--color-rule-strong)] sm:p-6 lg:p-8"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="font-[family-name:var(--font-plex-sans)] text-[length:var(--text-caption)] font-medium tracking-[0.16em] text-[color:var(--color-muted)] uppercase">
            {project.categoryLabel}
            <span aria-hidden> · </span>
            {project.location}
          </p>
          {/*
            * The title takes the space the reference gave to an oversized
            * number. It is the dominant element on the sheet and wraps
            * naturally — several of these road names run past 90 characters
            * and must never be truncated.
            */}
          <h2 /* No text-balance here. It is built for short headings; on a
              * 90-character road name it equalises the line lengths and
              * leaves every line short, which reads as ragged rather than
              * balanced. These titles should fill the measure. */
            className="mt-2 font-[family-name:var(--font-archivo)] text-[length:var(--text-lg)] leading-[1.15] font-semibold tracking-[-0.01em] break-words text-[color:var(--color-ink)] min-[360px]:text-[length:var(--text-lg)] sm:text-[length:var(--text-xl)] lg:text-[length:var(--text-xl)]">
            <Link
              href={`/projects/${project.slug}`}
              className="hover:text-[color:var(--color-copper-ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-focus)]"
            >
              {project.title}
            </Link>
          </h2>
          <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[length:var(--text-base)]">
            {/* Value in the accessible copper text token. Raw --copper is
              * 3.51:1 on white and is barred from carrying text. */}
            {project.value && (
              <span className="measurement font-medium text-[color:var(--color-copper-ink)]">
                {project.value}
              </span>
            )}
            {project.value && (
              <span aria-hidden className="text-[color:var(--color-rule-strong)]">
                ·
              </span>
            )}
            <span className="text-[color:var(--color-muted)]">
              {project.statusLabel}
            </span>
          </p>
        </div>
        <Disclosure
          expanded={expanded}
          onToggle={() => setExpanded((v) => !v)}
          panelId={panelId}
          title={project.title}
        />
      </div>

      <hr className="mt-5 border-0 border-t border-[color:var(--color-rule)]" />

      {/*
        * Body. Two columns only when there is a photograph to put in one —
        * a text-only sheet gets the full measure and no empty media frame.
        */}
      <div
        className={
          project.image
            ? "mt-5 grid items-start gap-5 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-8"
            : "mt-5"
        }
      >
        {project.image && (
          <Image
            src={project.image.url}
            alt={project.image.alt}
            width={project.image.width ?? 1600}
            height={project.image.height ?? 900}
            sizes="(min-width: 1024px) 480px, (min-width: 768px) 45vw, 90vw"
            /*
              * Natural aspect ratio, bounded height, object-contain. These are
              * horizontal aerials of roads — a subject that runs across the
              * frame — so a portrait crop would remove the thing photographed.
              * max-h + contain is the guard for any future tall image: it
              * letterboxes rather than crops, and stops one portrait frame
              * dominating the file.
              */
            className="h-auto max-h-[480px] w-full object-contain"
          />
        )}
        <div className="min-w-0">
          {/* break-words, not truncation. Two tokens in the archive cannot
              * fit a 320px measure: the word "Reconstruction" at title size,
              * and a run-together "up to7.00mt.width" in one scope record.
              * Breaking them keeps every character readable; clipping would
              * hide source content. */}
          <p className="max-w-[62ch] text-[length:var(--text-base)] leading-[1.6] break-words text-[color:var(--color-muted)]">
            {project.scopeSummary}
          </p>
          <Link
            href={`/projects/${project.slug}`}
            className="measurement mt-4 inline-flex min-h-[44px] items-center gap-2 text-[length:var(--text-sm)] font-medium text-[color:var(--color-copper-ink)] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-focus)]"
          >
            View project
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>

      <div id={panelId} data-sheet-detail hidden={!expanded}>
        <dl className="mt-1 border-t border-[color:var(--color-rule)] pt-1">
          {rows.map(([k, v]) => (
            <Row key={k} label={k} value={v} />
          ))}
        </dl>
      </div>
    </article>
  )
}

export function ProjectsBrowser({
  projects,
  categories,
  emptyNote,
}: {
  projects: SheetProject[]
  categories: Array<{ value: string; label: string; count: number }>
  emptyNote: string
}) {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("all")
  const searchId = useId()
  const selectId = useId()

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return projects.filter(
      (p) =>
        (category === "all" || p.category === category) &&
        (q === "" || p.haystack.includes(q)),
    )
  }, [projects, query, category])

  const tabs = [{ value: "all", label: "All" }, ...categories]

  if (projects.length === 0) {
    return (
      <div className="max-w-[60ch] border-t border-[color:var(--color-rule-strong)] pt-6">
        <p className="text-[length:var(--text-base)] leading-[1.6] text-[color:var(--color-muted)]">
          {emptyNote}
        </p>
      </div>
    )
  }

  return (
    <div>
      {/* JS off: every record stays fully readable rather than locked shut
        * behind a control that cannot run. */}
      <noscript>
        <style>{`[data-sheet-detail][hidden]{display:block!important}`}</style>
      </noscript>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="lg:max-w-[22rem] lg:flex-1">
          <label
            htmlFor={searchId}
            className="block font-[family-name:var(--font-plex-sans)] text-[length:var(--text-caption)] font-medium tracking-[0.16em] text-[color:var(--color-muted)] uppercase"
          >
            Search
          </label>
          <input
            id={searchId}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects"
            className="mt-2 h-11 w-full border border-[color:var(--color-rule-strong)] bg-[color:var(--color-white)] px-3 text-[length:var(--text-base)] text-[color:var(--color-ink)] placeholder:text-[color:var(--color-muted)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-focus)]"
          />
        </div>

        {/* Below 768 a select, not six tabs. Six controls squeezed across a
          * 320px screen are either unreadable or a horizontal scroller. */}
        <div className="md:hidden">
          <label
            htmlFor={selectId}
            className="block font-[family-name:var(--font-plex-sans)] text-[length:var(--text-caption)] font-medium tracking-[0.16em] text-[color:var(--color-muted)] uppercase"
          >
            Category
          </label>
          <select
            id={selectId}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-2 h-11 w-full border border-[color:var(--color-rule-strong)] bg-[color:var(--color-white)] px-3 text-[length:var(--text-base)] text-[color:var(--color-ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-focus)]"
          >
            {tabs.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        <div
          role="group"
          aria-label="Filter by category"
          className="hidden flex-wrap gap-2 md:flex"
        >
          {tabs.map((t) => {
            const on = t.value === category
            return (
              <button
                key={t.value}
                type="button"
                onClick={() => setCategory(t.value)}
                aria-pressed={on}
                className={`measurement min-h-[44px] border px-4 text-[length:var(--text-sm)] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-focus)] ${
                  on
                    ? "border-[color:var(--color-copper-deep)] bg-[color:var(--color-copper-deep)] text-[color:var(--color-white)]"
                    : "border-[color:var(--color-rule-strong)] text-[color:var(--color-ink)] hover:border-[color:var(--color-copper)] hover:text-[color:var(--color-copper-ink)]"
                }`}
              >
                {t.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Announced for screen readers only, and only when a filter is
        * active, so a count never becomes visible copy that goes stale. */}
      <p aria-live="polite" className="sr-only">
        {query.trim() === "" && category === "all"
          ? "Showing all projects"
          : "Filtered project list updated"}
      </p>

      {visible.length === 0 ? (
        <div className="mt-10 border-t border-[color:var(--color-rule-strong)] pt-6">
          <p className="text-[length:var(--text-base)] text-[color:var(--color-ink)]">
            No projects match your search.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("")
              setCategory("all")
            }}
            className="measurement mt-4 inline-flex min-h-[44px] items-center border border-[color:var(--color-rule-strong)] px-4 text-[length:var(--text-sm)] hover:border-[color:var(--color-copper)] hover:text-[color:var(--color-copper-ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-focus)]"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="mt-8 flex flex-col gap-4 lg:mt-10 lg:gap-6">
          {visible.map((p) => (
            <Sheet key={p.slug} project={p} />
          ))}
        </div>
      )}
    </div>
  )
}
