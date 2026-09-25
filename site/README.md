# NCC Infraspace website

The application lives in this `site/` directory. It is a Next.js 16 App Router project with 57 statically generated project detail pages.

## Local setup

Use Node.js 24 (`.nvmrc` and `package.json` pin it), then run:

```bash
cd "/Users/karanpatel/Desktop/NCC website rebuild /site"
nvm use 24
npm ci
npm run dev
```

The local site opens at `http://localhost:3000`. `predev` and `prebuild` synchronize the project's 21 media files into `public/content/projects/`.

## Release checks

```bash
npm run lint
npm run typecheck
npm run content:check
npm run build
```

The build uses webpack, which is the configuration validated for this project. Fonts are bundled under `fonts/`; compilation does not need Google Fonts access.

## Deployment settings

Use **`site` as the Root Directory relative to the repository** for a Vercel Git import. For direct CLI deployment from this folder, the root is `.`. The checked-in `vercel.json` sets the Next.js framework preset, `npm ci`, and `npm run build`. Leave Output Directory at the Next.js default; do not set it to `out`, `public`, or `.next`. Node.js is pinned to 24.x. The application requires **no user-supplied environment variables**.

See [the manual Vercel deployment guide](../docs/06-manual-vercel-deployment.md) for Dashboard and CLI steps, Preview-first deployment, custom domain setup, verification, and troubleshooting. Deployment is performed manually by the project owner.
