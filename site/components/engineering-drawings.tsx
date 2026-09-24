/*
 * Engineering line drawings, blueprint convention.
 *
 * CATEGORY ILLUSTRATIONS, NOT ASSET RECORDS. Each one shows the general form
 * of a work type. None carries NCC branding, a model name, a capacity, a
 * drawing number, an approval stamp or project-specific geometry, and none
 * implies NCC owns any particular plant or machine.
 *
 * Convention held across all four: 0.6 hairlines for construction geometry,
 * 1.1 for the subject outline, 45 degree hatching for cut material, arrowed
 * dimension lines with extension lines. Slate for the drawing, copper only on
 * the one dimension that names the subject. Low contrast throughout, so the
 * drawing supports the text beside it and never competes with it.
 *
 * Each drawing has ONE page. They are not reused at another size or colour.
 */

const S = "var(--color-slate)"
const C = "var(--color-copper)"

function Defs() {
  return (
    <defs>
      <pattern id="hatch" width="6" height="6" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
        <line x1="0" y1="0" x2="0" y2="6" stroke={S} strokeWidth="0.5" opacity="0.55" />
      </pattern>
      <marker id="ar" markerWidth="7" markerHeight="7" refX="6" refY="2.4" orient="auto">
        <path d="M0 0 L6 2.4 L0 4.8" fill="none" stroke={C} strokeWidth="0.9" />
      </marker>
      <marker id="al" markerWidth="7" markerHeight="7" refX="0.6" refY="2.4" orient="auto">
        <path d="M6 0 L0 2.4 L6 4.8" fill="none" stroke={C} strokeWidth="0.9" />
      </marker>
    </defs>
  )
}

const wrap = "h-auto w-full max-w-[520px]"

/** Flexible pavement: subgrade, sub-base, base, bituminous courses, shoulders. */
export function RoadSection({ label }: { label: string }) {
  return (
    <svg viewBox="0 0 320 150" role="img" aria-label={label} className={wrap}>
      <Defs />
      <g fill="none" stroke={S} strokeWidth="0.6" opacity="0.85">
        <line x1="8" y1="118" x2="312" y2="118" />
        <line x1="8" y1="104" x2="312" y2="104" />
        <line x1="26" y1="92" x2="294" y2="92" />
        <line x1="40" y1="83" x2="280" y2="83" />
      </g>
      <path d="M40 83 L280 83 L294 92 L26 92 Z" fill="url(#hatch)" opacity="0.5" />
      <path d="M26 92 L294 92 L312 104 L8 104 Z" fill="url(#hatch)" opacity="0.3" />
      {/* carriageway and crown */}
      <path d="M40 83 L158 79 L280 83" fill="none" stroke={S} strokeWidth="1.1" />
      {/* shoulders */}
      <path d="M40 83 L14 96" fill="none" stroke={S} strokeWidth="1.1" />
      <path d="M280 83 L306 96" fill="none" stroke={S} strokeWidth="1.1" />
      {/* centre line */}
      <line x1="158" y1="70" x2="158" y2="79" stroke={C} strokeWidth="0.8" strokeDasharray="3 3" />
      {/* carriageway dimension */}
      <g stroke={C} strokeWidth="0.7">
        <line x1="40" y1="56" x2="280" y2="56" markerStart="url(#al)" markerEnd="url(#ar)" />
        <line x1="40" y1="60" x2="40" y2="79" opacity="0.5" />
        <line x1="280" y1="60" x2="280" y2="79" opacity="0.5" />
      </g>
      <text x="160" y="50" textAnchor="middle" fill={C} style={{ fontSize: 9 }} className="font-[family-name:var(--font-plex-mono)]">
        carriageway
      </text>
      <g fill={S} style={{ fontSize: 7.5 }} className="font-[family-name:var(--font-plex-mono)]" opacity="0.9">
        <text x="300" y="80">surface</text>
        <text x="300" y="90">base</text>
        <text x="300" y="102">sub-base</text>
        <text x="300" y="115">subgrade</text>
      </g>
    </svg>
  )
}

/** Simply supported span on piers, with bearings and deck. */
export function BridgeSection({ label }: { label: string }) {
  return (
    <svg viewBox="0 0 320 150" role="img" aria-label={label} className={wrap}>
      <Defs />
      {/* ground */}
      <line x1="8" y1="128" x2="312" y2="128" stroke={S} strokeWidth="0.6" opacity="0.8" />
      <path d="M8 128 L312 128 L312 140 L8 140 Z" fill="url(#hatch)" opacity="0.28" />
      {/* piers and footings */}
      {[78, 242].map((x) => (
        <g key={x}>
          <rect x={x - 11} y="72" width="22" height="50" fill="url(#hatch)" opacity="0.5" stroke={S} strokeWidth="1.1" />
          <rect x={x - 22} y="122" width="44" height="8" fill="none" stroke={S} strokeWidth="1.1" />
        </g>
      ))}
      {/* abutments */}
      <rect x="10" y="86" width="16" height="36" fill="url(#hatch)" opacity="0.4" stroke={S} strokeWidth="1.1" />
      <rect x="294" y="86" width="16" height="36" fill="url(#hatch)" opacity="0.4" stroke={S} strokeWidth="1.1" />
      {/* deck and girders */}
      <rect x="10" y="62" width="300" height="10" fill="none" stroke={S} strokeWidth="1.1" />
      <g stroke={S} strokeWidth="0.6" opacity="0.8">
        {[40, 120, 200, 272].map((x) => (
          <rect key={x} x={x} y="72" width="14" height="8" fill="none" />
        ))}
      </g>
      {/* bearings */}
      <g stroke={S} strokeWidth="0.6">
        {[78, 242].map((x) => <line key={x} x1={x - 11} y1="72" x2={x + 11} y2="72" />)}
      </g>
      {/* span dimension */}
      <g stroke={C} strokeWidth="0.7">
        <line x1="78" y1="42" x2="242" y2="42" markerStart="url(#al)" markerEnd="url(#ar)" />
        <line x1="78" y1="46" x2="78" y2="62" opacity="0.5" />
        <line x1="242" y1="46" x2="242" y2="62" opacity="0.5" />
      </g>
      <text x="160" y="36" textAnchor="middle" fill={C} style={{ fontSize: 9 }} className="font-[family-name:var(--font-plex-mono)]">
        span
      </text>
      <g fill={S} style={{ fontSize: 7.5 }} className="font-[family-name:var(--font-plex-mono)]" opacity="0.9">
        <text x="150" y="58">deck</text>
        <text x="60" y="100" textAnchor="end">pier</text>
      </g>
    </svg>
  )
}

/** Trapezoidal lined canal section with freeboard and bank. */
export function CanalSection({ label }: { label: string }) {
  return (
    <svg viewBox="0 0 320 150" role="img" aria-label={label} className={wrap}>
      <Defs />
      <path d="M8 60 L96 60 L142 116 L178 116 L224 60 L312 60 L312 140 L8 140 Z" fill="url(#hatch)" opacity="0.32" />
      <path d="M8 60 L96 60 L142 116 L178 116 L224 60 L312 60" fill="none" stroke={S} strokeWidth="1.1" />
      {/* lining */}
      <path d="M100 63 L146 113 L174 113 L220 63" fill="none" stroke={S} strokeWidth="0.6" strokeDasharray="4 3" opacity="0.9" />
      {/* water surface */}
      <line x1="118" y1="82" x2="202" y2="82" stroke={C} strokeWidth="0.8" />
      <g stroke={C} strokeWidth="0.55" opacity="0.7">
        {[128, 146, 164, 182, 196].map((x) => <line key={x} x1={x} y1="82" x2={x + 5} y2="86" />)}
      </g>
      {/* bed width dimension */}
      <g stroke={C} strokeWidth="0.7">
        <line x1="142" y1="130" x2="178" y2="130" markerStart="url(#al)" markerEnd="url(#ar)" />
      </g>
      <text x="160" y="126" textAnchor="middle" fill={C} style={{ fontSize: 9 }} className="font-[family-name:var(--font-plex-mono)]">
        bed
      </text>
      <g fill={S} style={{ fontSize: 7.5 }} className="font-[family-name:var(--font-plex-mono)]" opacity="0.9">
        <text x="230" y="74">side slope</text>
        <text x="206" y="94">water level</text>
      </g>
    </svg>
  )
}

/** Pitched bank protection with toe and filter layer. */
export function BankProtection({ label }: { label: string }) {
  return (
    <svg viewBox="0 0 320 150" role="img" aria-label={label} className={wrap}>
      <Defs />
      <path d="M8 46 L128 46 L236 124 L312 124 L312 142 L8 142 Z" fill="url(#hatch)" opacity="0.3" />
      <path d="M8 46 L128 46 L236 124 L312 124" fill="none" stroke={S} strokeWidth="1.1" />
      {/* pitching blocks along the slope */}
      <g stroke={S} strokeWidth="0.6" opacity="0.95">
        {Array.from({ length: 11 }, (_, i) => {
          const t = i / 11
          const x = 128 + (236 - 128) * t
          const y = 46 + (124 - 46) * t
          return <rect key={i} x={x} y={y - 6} width="11" height="9" transform={`rotate(35.8 ${x} ${y})`} fill="none" />
        })}
      </g>
      {/* filter layer */}
      <path d="M131 51 L239 129" fill="none" stroke={S} strokeWidth="0.55" strokeDasharray="3 3" opacity="0.85" />
      {/* toe */}
      <rect x="232" y="118" width="26" height="14" fill="url(#hatch)" opacity="0.6" stroke={S} strokeWidth="1.1" />
      {/* water */}
      <line x1="248" y1="104" x2="312" y2="104" stroke={C} strokeWidth="0.8" />
      <g stroke={C} strokeWidth="0.55" opacity="0.7">
        {[258, 274, 290].map((x) => <line key={x} x1={x} y1="104" x2={x + 5} y2="108" />)}
      </g>
      <text x="196" y="66" fill={C} style={{ fontSize: 9 }} className="font-[family-name:var(--font-plex-mono)]">
        pitching
      </text>
      <g fill={S} style={{ fontSize: 7.5 }} className="font-[family-name:var(--font-plex-mono)]" opacity="0.9">
        <text x="252" y="142">toe</text>
        <text x="30" y="40">bank</text>
      </g>
    </svg>
  )
}

/** Tripod-mounted level, for the Careers page. */
export function SurveyInstrument({ label }: { label: string }) {
  return (
    <svg viewBox="0 0 320 180" role="img" aria-label={label} className={wrap}>
      <Defs />
      <line x1="20" y1="162" x2="300" y2="162" stroke={S} strokeWidth="0.6" opacity="0.8" />
      {/* tripod legs */}
      <g stroke={S} strokeWidth="1.1" fill="none">
        <path d="M160 74 L112 160" /><path d="M160 74 L208 160" /><path d="M160 74 L166 158" />
        <path d="M126 132 L196 132" strokeWidth="0.6" opacity="0.7" />
      </g>
      {/* tribrach and body */}
      <rect x="140" y="62" width="40" height="12" fill="none" stroke={S} strokeWidth="1.1" />
      <rect x="146" y="40" width="28" height="22" fill="url(#hatch)" opacity="0.35" stroke={S} strokeWidth="1.1" />
      {/* telescope */}
      <rect x="120" y="44" width="80" height="12" rx="1" fill="none" stroke={S} strokeWidth="1.1" />
      <line x1="120" y1="50" x2="112" y2="50" stroke={S} strokeWidth="1.1" />
      <circle cx="204" cy="50" r="4" fill="none" stroke={S} strokeWidth="1.1" />
      {/* line of collimation */}
      <line x1="204" y1="50" x2="300" y2="50" stroke={C} strokeWidth="0.7" strokeDasharray="6 4" markerEnd="url(#ar)" />
      <text x="248" y="42" textAnchor="middle" fill={C} style={{ fontSize: 9 }} className="font-[family-name:var(--font-plex-mono)]">
        line of sight
      </text>
      {/* instrument height */}
      <g stroke={C} strokeWidth="0.7">
        <line x1="72" y1="50" x2="72" y2="162" markerStart="url(#al)" markerEnd="url(#ar)" />
      </g>
      <text x="66" y="106" textAnchor="end" fill={C} style={{ fontSize: 9 }} className="font-[family-name:var(--font-plex-mono)]">
        height
      </text>
    </svg>
  )
}
