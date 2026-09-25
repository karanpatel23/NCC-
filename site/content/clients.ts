/*
 * THE CLIENT REGISTER.
 *
 * Edit this file to add, rename or regroup a client. Nothing here is layout,
 * and no page hardcodes a client name.
 *
 * `match` is a case-insensitive regular expression tested against the raw
 * `client` string on each project record. That is what lets one body appear
 * under several spellings in the archive and still resolve to one client
 * here: the Ahmedabad Roads and Buildings division is written three ways
 * across 19 records and is one organisation.
 *
 * `ownerVerified` marks a client the owner has confirmed directly. Several
 * of these have no matching contract in the 57 published records, because
 * that set is a recovered 2018 to 2023 tender file rather than a lifetime
 * history. The owner is the authority on the relationship; the records are
 * only the authority on which published projects link to it. A client with
 * no linked project renders without project links and carries a TODO.
 *
 * PMGSY is a central funding scheme, not an awarding body. It is therefore
 * absent from this client register. Relevant projects name it in their scope.
 *
 * ---------------------------------------------------------------------------
 * LOGOS
 *
 * `logo` points at a file in public/clients/. Every file is stored in this
 * repository. Nothing is hotlinked. `logoSource` records where it came from.
 *
 * All marks are normalised to one 420 by 200 box at 88% fill, so a wide
 * wordmark and a tall emblem carry the same optical weight on the grid. They
 * render monochrome and take their colour on hover or keyboard focus.
 *
 * The nine Roads and Buildings divisions share the department's own mark. They
 * are divisional offices of one department, not separate organisations.
 *
 * GOVERNMENT OF INDIA IS A TYPOGRAPHIC WORDMARK, NOT THE STATE EMBLEM, at the
 * owner's instruction. Use of the State Emblem is restricted by the State
 * Emblem of India (Prohibition of Improper Use) Act 2005.
 *
 * Rendering as wordmarks because no official logo could be sourced:
 *   GIFT SEZ      the only recovered file is 89 by 70 pixels and blurs at any
 *                 usable size; giftgujarat.in serves its mark from script
 *   GUDC          gudcltd.com exposes no logo in its markup
 *   Gandhinagar Smart City, GRIDC   no reachable official domain
 *   Valsad Municipality, Dediyasana Industrial Estate Association   none found
 *   Public Health Works Division Surat, National Highway Division Ahmedabad
 *                 divisional offices, no mark of their own
 * ---------------------------------------------------------------------------
 */


export type ClientGroup =
  | "state-rb"
  | "municipal"
  | "development"
  | "industrial"
  | "state-dept"
  | "rail"
  | "other-state"
  | "national"
  | "private"

export type ClientRecord = {
  id: string
  /** Display name. */
  name: string
  /** Shorter form for the wordmark tile, where the full name will not fit. */
  short?: string
  group: ClientGroup
  /** Matched case-insensitively against each project's `client` field. */
  match: string
  /** Path under /clients/. Omit to render a typographic wordmark. */
  logo?: string
  /** Where the logo file came from. Required whenever `logo` is set. */
  logoSource?: string
  /** Confirmed directly by the owner. */
  ownerVerified?: boolean
  /** Shown as a scheme rather than an awarding body. */
  scheme?: boolean
  /** Set where no published record links to this client yet. */
  todo?: string
}

export const CLIENT_GROUPS: Array<{ id: ClientGroup; label: string; blurb: string }> = [
  {
    id: "state-rb",
    label: "State Roads and Buildings",
    blurb:
      "Divisional offices of the Gujarat Roads and Buildings Department, which award and supervise state highway and district road contracts.",
  },
  {
    id: "municipal",
    label: "Municipal bodies",
    blurb: "City corporations and municipalities, for urban road and drainage networks.",
  },
  {
    id: "development",
    label: "Development authorities",
    blurb: "Urban development authorities and smart city companies.",
  },
  {
    id: "industrial",
    label: "Industrial and SEZ",
    blurb: "Estate and special economic zone infrastructure.",
  },
  { id: "state-dept", label: "State departments", blurb: "Public health and works divisions." },
  { id: "rail", label: "Rail", blurb: "State rail infrastructure corporations." },
  { id: "other-state", label: "Other state governments", blurb: "State public works departments." },
  { id: "national", label: "National institutions", blurb: "Government of India and national infrastructure bodies." },
  { id: "private", label: "Private clients", blurb: "Infrastructure work for private sector organisations." },
]

export const CLIENTS: ClientRecord[] = [
  /*
   * ONE department, not nine clients.
   *
   * The archive names ten divisional offices of the Gujarat Roads and
   * Buildings Department, written several ways, including three spellings of
   * the Ahmedabad division alone. They are divisional offices of a single
   * department that shares one mark, so nine tiles carrying the same emblem
   * read as a fault rather than as a client list. The divisions appear inside
   * this client, against the work each awarded.
   */
  {
    id: "gujarat-rb",
    name: "Roads and Buildings Department, Government of Gujarat",
    short: "Gujarat R&B",
    group: "state-rb",
    match:
      "r\\s*and\\s*b\\s*panchayat\\s*division|r and b division|r&b\\)division|r&b division|kheda r\\. & b\\. division|r and b div modasa|^r and b$",
    logo: "gujarat-rb.png",
    logoSource:
      "Recovered from the previous nccinfraspace.com client slider",
    ownerVerified: true,
  },

  /* --- municipal ---------------------------------------------------------- */
  { id: "amc", name: "Amdavad Municipal Corporation", short: "AMC", group: "municipal", match: "municipal commissioner ahmedabad|ahmedabad municipal commissioner", logo: "amc.png", logoSource: "Recovered from the previous nccinfraspace.com client slider", ownerVerified: true },
  { id: "gmc", name: "Gandhinagar Municipal Corporation", short: "GMC", group: "municipal", match: "gandhinagar municipal corporation", logo: "gmc.png", logoSource: "Recovered from the previous nccinfraspace.com client slider", ownerVerified: true },
  { id: "valsad", name: "Valsad Municipality", group: "municipal", match: "valsad municipality", ownerVerified: true },

  /* --- development authorities -------------------------------------------- */
  { id: "auda", name: "Ahmedabad Urban Development Authority", short: "AUDA", group: "development", match: "ahmedabad urban development authority", logo: "auda.png", logoSource: "Recovered from the previous nccinfraspace.com client slider", ownerVerified: true },
  { id: "gscdl", name: "Gandhinagar Smart City Development", short: "Gandhinagar Smart City", group: "development", match: "gandhinagar smart city", ownerVerified: true },
  { id: "gudc", name: "Gujarat Urban Development Company", short: "GUDC", group: "development", match: "gudc", ownerVerified: true },

  /* --- industrial and SEZ -------------------------------------------------- */
  /* The recovered GIFT City logo is 89 by 70 pixels, too small to set beside
   * the others without softening. It renders as a wordmark until a usable
   * file is supplied. */
  { id: "gift-sez", name: "GIFT SEZ, Gandhinagar", short: "GIFT SEZ", group: "industrial", match: "gift sez", ownerVerified: true },
  { id: "gidc-baroda", name: "Gujarat Industrial Development Corporation, Baroda", short: "GIDC Baroda", group: "industrial", match: "gidc baroda", logo: "gidc.png", logoSource: "https://gidc.gujarat.gov.in/Content/assets/images/logo.jpg", ownerVerified: true },
  { id: "dediyasana", name: "Dediyasana Industrial Estate Association", short: "Dediyasana Estate", group: "industrial", match: "dediyasan", ownerVerified: true },

  /* --- other --------------------------------------------------------------- */
  { id: "phw-surat", name: "Public Health Works Division, Surat", short: "PHW Surat", group: "state-dept", match: "public health works", ownerVerified: true },
  { id: "girdc", name: "Gujarat Rail Infrastructure Development Corporation", short: "GRIDC", group: "rail", match: "gujarat rail infrastructure", ownerVerified: true },
  { id: "mp-pwd", name: "Public Works Department, Madhya Pradesh", short: "MP PWD", group: "other-state", match: "pwd mp", logo: "mp-pwd.png", logoSource: "Recovered from the previous nccinfraspace.com client slider", ownerVerified: true },
  { id: "nh-ahmedabad", name: "National Highway Division, Ahmedabad", short: "NH Division Ahmedabad", group: "state-rb", match: "national highway division", ownerVerified: true },

  /* --- national bodies and schemes, confirmed by the owner ----------------
   * `match` is a pattern no client string can satisfy, so these attach to no
   * published record. They render without project links and carry a TODO
   * until the owner attaches the work. */
  { id: "nhai", name: "National Highways Authority of India", short: "NHAI", group: "national", match: "(?!)", logo: "nhai.png", logoSource: "https://www.nhai.gov.in/assets/images/mainLogo-inner.png", ownerVerified: true, todo: "Attach NHAI projects" },
  { id: "morth", name: "Ministry of Road Transport and Highways", short: "MoRTH", group: "national", match: "(?!)", logo: "morth.png", logoSource: "Recovered from the previous nccinfraspace.com client slider", ownerVerified: true, todo: "Attach MoRTH projects" },
  /* Wordmark, never the State Emblem: its use by a private company is
   * restricted by the State Emblem of India (Prohibition of Improper Use)
   * Act 2005. */
  { id: "govt-of-india", name: "Government of India", short: "Government of India", group: "national", match: "(?!)", ownerVerified: true, todo: "Attach Government of India projects" },
  { id: "nabard", name: "National Bank for Agriculture and Rural Development", short: "NABARD", group: "national", match: "(?!)", logo: "nabard.png", logoSource: "Recovered from the previous nccinfraspace.com client slider", ownerVerified: true, todo: "Attach NABARD funded projects" },
  { id: "up-pwd", name: "Public Works Department, Uttar Pradesh", short: "UP PWD", group: "other-state", match: "(?!)", logo: "up-pwd.png", logoSource: "Recovered from the previous nccinfraspace.com client slider", ownerVerified: true, todo: "Attach Uttar Pradesh projects" },
  { id: "adani", name: "Adani", short: "Adani", group: "private", match: "(?!)", logo: "adani.png", logoSource: "Recovered from the previous nccinfraspace.com client slider", ownerVerified: true, todo: "Attach Adani projects" },
]
