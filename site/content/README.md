# `content/` — the CMS that isn't

Per `docs/01-requirements-r6.md`. No Sanity, no Studio, no API keys. Content is
typed MDX in the repo, validated at build time by `lib/content/schema.ts`.

## Why this is stricter than a CMS

In a CMS a required field is a warning in an editor someone can work around.
Here a project missing its client, its contract value, or its alt text is a
**failed build** — the site physically cannot deploy in that state. The
competitor shipped `Lorem ipsum` and `info@example.com` to production because
nothing stopped it.

## Layout

```
content/projects/<slug>/
├── index.mdx      frontmatter (validated) + scope narrative
└── images/        photography, beside the project that uses it
```

Images live next to their project on purpose: moving a project moves its
photography, and deleting one cannot orphan assets.

## Checking

```bash
npm run content:check
```

Reports every problem at once. The build itself uses `.parse()` and stops at
the first — this is the friendly front end to the same schema.
