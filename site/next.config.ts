import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /*
   * /projects is the single canonical listing.
   *
   * All 57 records are completed, so /projects/completed rendered a
   * byte-for-byte copy of /projects, and /projects/ongoing rendered an empty
   * page. Both are now permanent redirects, which preserves any link already
   * sent to a tender committee while collapsing the duplicate.
   *
   * The `ongoing` status stays in the schema and in the loader. When ongoing
   * work is added, /projects/ongoing becomes a real route again and this
   * redirect comes out.
   */
  async redirects() {
    return [
      /* 301, not Next's default 308. Both are permanent; 301 is what the
       * owner specified and what every crawler and proxy understands. */
      { source: "/projects/completed", destination: "/projects", statusCode: 301 },
      { source: "/projects/ongoing", destination: "/projects", statusCode: 301 },
    ]
  },
}

export default nextConfig
