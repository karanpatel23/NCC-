# Manual Vercel deployment — NCC Infraspace

This is an owner-operated procedure. No Vercel login, project link, deployment, Git push, domain, or DNS change has been made for this handoff.

## Repository settings

| Setting | Value |
| --- | --- |
| Application folder on this computer | `/Users/karanpatel/Desktop/NCC website rebuild /site` (the parent folder name ends with a space) |
| Vercel Root Directory for a Git import | `site` (relative to the repository root; do not select the repository root) |
| Root for a direct CLI deployment from the app folder | `.` |
| Framework Preset | Next.js |
| Install Command | `npm ci` |
| Build Command | `npm run build` (`prebuild` runs the media sync; the build uses webpack) |
| Output Directory | Leave the Next.js default/automatic value; do not enter `out`, `public`, or `.next` |
| Node.js | 24.x, pinned by `site/package.json` and `site/.nvmrc` |
| Required environment variable names | **None**. No application code reads a user-supplied environment variable. Vercel's own system variables need no manual entry. |

`site/vercel.json` contains the framework, install, and build settings. There was no pre-existing `vercel.json` or local `.vercel/project.json`. This local repository has no configured Git remote, so an existing Vercel project cannot be identified from the files alone. If the project already exists in your Vercel account, link to that project rather than creating a duplicate. The canonical site URL in metadata, sitemap, and robots is `https://nccinfraspace.com`; it is a code constant, not an environment variable. Preview pages intentionally keep the final-domain canonical URL.

**Recommendation:** use the CLI from `site/` if you want to deploy directly from the current local files. Use the Dashboard/Git path if you want future commits and pull requests to deploy automatically. A Dashboard Git import needs a GitHub/GitLab/Bitbucket remote first; none is configured locally.

Vercel documents that the **first deployment of a brand-new project is always marked Production**, even when `vercel deploy` omits `--prod`. This first deployment only receives a Vercel-generated URL while you leave the custom domain disconnected. Make the next deployment a true Preview, verify it, then explicitly deploy the final build to Production and add the domain. On an existing Vercel project, `vercel deploy` immediately creates a Preview. Do not add the custom domain until the final Production deployment has passed QA.

## 1. Dashboard and Git integration

### Existing Git-connected Vercel project (Preview first)

1. In the Vercel Dashboard, select the correct team and existing project. Under **Settings → Git**, confirm the connected repository and Production Branch. Under **Settings → Build and Deployment**, set Root Directory to `site`. Confirm Next.js, Node 24.x, `npm ci`, `npm run build`, and automatic Output Directory. If Dashboard values conflict with `site/vercel.json`, correct the project settings.
2. Commit the finished local files. If your remote is not configured, add **your own** repository URL. Do not put credentials in the remote URL or in a file:

   ```bash
   cd "/Users/karanpatel/Desktop/NCC website rebuild "
   git status --short
   git add -A
   git commit -m "Finish NCC Infraspace website"
   git remote add origin "PASTE_YOUR_GIT_REPOSITORY_URL_HERE"  # only if `git remote -v` shows none
   git push -u origin HEAD:ncc-preview
   ```

3. In **Deployments**, open the deployment from `ncc-preview`; it must show **Preview**. If automatic deployments are disabled, use **Deployments → Create Deployment** and select the `ncc-preview` branch. Review the generated Preview URL and the verification list below.
4. After approval, merge the preview branch into the project's configured Production Branch in your Git provider. That push triggers a Production deployment. Inspect it in Vercel before adding any custom domain. If you want to deploy a specific Git ref manually, use **Deployments → Create Deployment** and choose that ref.

### No Vercel project yet

1. Create an empty Git repository in your own GitHub, GitLab, or Bitbucket account (do not initialize it with a README). The local repository currently has no remote. Substitute your provider's URL in the commands below, then commit and push the ready app to `main`:

   ```bash
   cd "/Users/karanpatel/Desktop/NCC website rebuild "
   git status --short
   git add -A
   git commit -m "Finish NCC Infraspace website"
   git remote add origin "PASTE_YOUR_GIT_REPOSITORY_URL_HERE"
   git push -u origin HEAD:main
   ```
2. In the Vercel Dashboard choose **Add New → Project → Import Git Repository**, select that repository, set **Root Directory = `site`**, and confirm the settings table above. Click **Deploy**.
3. **This initial import creates a Production-target deployment on a generated `*.vercel.app` URL.** It does not touch `nccinfraspace.com` if you leave that domain unconnected. Push a non-Production branch after import for a genuine Preview:

   ```bash
   cd "/Users/karanpatel/Desktop/NCC website rebuild "
   git switch -c ncc-preview
   git push -u origin ncc-preview
   ```

   Open its **Preview** deployment in the Dashboard and run the verification list below. For later edits, merge the approved preview branch to `main` in your Git provider; that creates the final Production deployment.
4. If a strict Preview-target deployment must be the first Vercel deployment, Vercel's first-deployment rule prevents that on a new project. Use the seed-then-Preview sequence above; the custom domain remains unchanged throughout.

## 2. Vercel CLI

### Direct deployment from this local app (recommended here)

Run these commands in order. If Node 24 is already installed, `nvm install 24` is harmless. Install `nvm` first if your terminal does not have it, or use another Node 24 installation.

```bash
cd "/Users/karanpatel/Desktop/NCC website rebuild /site"
nvm install 24
nvm use 24
npm ci
npm run lint
npm run typecheck
npm run content:check
npm run build
npx vercel@latest login
npx vercel@latest link
```

At `link`, select the right Vercel team. Choose the **existing** project if it is already in that team; otherwise choose to create a project named `ncc-infraspace` (or your preferred name). For this direct `site/` workflow, confirm the local project/root is `.`. `link` writes `site/.vercel/project.json` locally; it is ignored by Git. No application environment variables need to be entered or pulled.

Then deploy and verify:

```bash
npx vercel@latest deploy --logs
# Copy the generated deployment URL and inspect its target in the Dashboard.
# For a new project this first deployment is Production-target on *.vercel.app.
# For an existing project this is a Preview.
npx vercel@latest deploy --logs
# The second deployment of a new project is a genuine Preview.
# On an existing project, one Preview is sufficient; omit this second command.
npx vercel@latest list
```

Use the Preview URL from the command output for the route and responsive checks below. Preview deployment protection may require you to be signed in or use `vercel curl`:

```bash
PREVIEW_URL="PASTE_THE_PREVIEW_URL_FROM_VERCEL_HERE"
npx vercel@latest curl / --deployment "$PREVIEW_URL"
npx vercel@latest curl /sitemap.xml --deployment "$PREVIEW_URL"
npx vercel@latest curl /robots.txt --deployment "$PREVIEW_URL"
```

When Preview is approved, deploy Production manually:

```bash
npx vercel@latest deploy --prod --logs
npx vercel@latest list
PRODUCTION_URL="PASTE_THE_PRODUCTION_URL_FROM_VERCEL_HERE"
npx vercel@latest curl / --deployment "$PRODUCTION_URL"
npx vercel@latest curl /sitemap.xml --deployment "$PRODUCTION_URL"
npx vercel@latest curl /robots.txt --deployment "$PRODUCTION_URL"
```

There is no need to push a Git remote for this direct CLI path. If you later connect a Git repository and its Vercel project uses Root Directory `site`, Vercel's monorepo CLI guidance is to invoke the CLI from the **repository root**, run `npx vercel@latest link --repo`, select the existing project, then deploy from that root. Do not combine the Git-root `site` setting with a second `site/` source path.

### Existing Git-integrated Vercel project with Root Directory `site`

If the project already points to this entire repository, use this alternative to the direct-folder `link` above:

```bash
cd "/Users/karanpatel/Desktop/NCC website rebuild "
npx vercel@latest login
npx vercel@latest link --repo
# Select the existing NCC project with Root Directory `site`.
npx vercel@latest deploy --logs
# Verify this Preview, then:
npx vercel@latest deploy --prod --logs
```

## Add the domain after Production approval

In the Dashboard open **Project → Settings → Domains**, add `nccinfraspace.com`, and optionally `www.nccinfraspace.com`. Decide which host is primary and configure the other to redirect to it. Vercel will show the exact A/AAAA/CNAME/TXT records, verification steps, and any existing-project conflict. **You** must make any DNS changes at your DNS provider; use the exact records Vercel displays rather than a copied generic address. Keep the current domain setup untouched until you are ready to switch traffic. Wait for Vercel to show the domain as valid and TLS active, then test the final host.

From a linked CLI project, the corresponding commands are:

```bash
npx vercel@latest domains add nccinfraspace.com
npx vercel@latest domains inspect nccinfraspace.com
# Optional only if you intend to serve www:
npx vercel@latest domains add www.nccinfraspace.com
npx vercel@latest domains inspect www.nccinfraspace.com
```

Adding a domain to a Vercel project is a separate action from editing DNS. Follow the Dashboard's current instructions at your registrar; this guide makes no DNS changes.

## Verification checklist for Preview and Production

- Open `/`, `/about`, `/capabilities`, `/projects`, `/clients`, `/csr`, `/careers`, `/contact`, and representative project details such as `/projects/bagodara-dhandhuka-fedra-sarangpur` and `/projects/reconstruction-of-major-district-roads-madhya-pradesh`. Confirm the two old listing routes `/projects/completed` and `/projects/ongoing` redirect to `/projects`. A made-up route should show the branded 404 and `noindex`.
- On each important page, inspect the browser tab title, meta description, canonical link, Open Graph title/description/image, and the page's primary heading. The canonical points to `https://nccinfraspace.com` even on a Preview URL; do not mistake that intentional SEO choice for a Preview routing failure. Check `/opengraph-image` loads.
- Open `/sitemap.xml`: it should contain **65 URLs** (eight main pages plus 57 project details), all on the intended canonical domain. Open `/robots.txt`: it should allow crawling and point at that sitemap. These can be checked on Preview before the domain is connected.
- Load project listing and detail photos, client logos, the home hero, and `/icon.svg`; confirm no broken images or font requests. The fonts are local to the app. Check browser developer tools for failed network requests and console errors.
- Inspect phone widths 360–390 px, tablet 768 px, laptop 1024–1440 px, and a wide 1920 px viewport. Confirm readable type, the mobile menu and project filters, image crops, no clipped content or horizontal scrolling, and usable tap targets. Check keyboard focus and tab order.
- After DNS is switched by you, check HTTPS and redirects for the apex and optional `www` host, route metadata on the final domain, and Vercel deployment/build logs. Allow time for DNS and certificate issuance.

## Troubleshooting

| Symptom | Check and remedy |
| --- | --- |
| “No Next.js version detected”, wrong homepage, or 404 on all routes | Git import Root Directory must be `site`; direct CLI root must be `site/`/`.`. Do not deploy `forensics/` or the repository root as the app. |
| Missing package or lockfile | Both `package.json` and `package-lock.json` are in `site/`; confirm root selection and use `npm ci`. |
| `npm ci` says lockfile and package manifest differ | Use the included matching lockfile and manifest. Do not mix a repository-root lockfile with `site/`. If you edit dependencies later, regenerate the lockfile with Node 24 before deploying. |
| Node engine/version mismatch | Set Node.js 24.x in Vercel; `site/package.json` has `engines.node: 24.x` and `site/.nvmrc` has `24`. |
| Build runs Turbopack or fails on a font fetch | Confirm Build Command `npm run build` and current `site/` files. That script uses webpack; fonts are bundled under `site/fonts/`. |
| Missing project images | The build must run `prebuild` (`npm run sync:media`) before Next build. Do not replace the command with bare `next build` or exclude the local project media from the Git/CLI source. |
| `out`/`public` output mismatch or image optimizer failures | Clear Output Directory override and keep Framework Preset Next.js. This project is not configured for static export. |
| Preview is labeled Production on a new project | This is Vercel's documented first-deployment rule. Keep the custom domain disconnected, run a second `vercel deploy`, and use that Preview for QA. |
| CLI links to the wrong project or uploads the wrong folder | Inspect `site/.vercel/project.json` locally and the Vercel Dashboard project/team. For a Git-connected project with Root Directory `site`, use the repository-root `link --repo` workflow. |
| Custom domain says invalid, conflict, or SSL pending | Use **Settings → Domains** or `domains inspect` for the exact provider records and ownership verification. Remove conflicting records at your DNS provider only when you are ready; wait for DNS/TLS propagation. |
| Canonical URL on Preview does not match the Preview host | Expected. SEO metadata intentionally names the planned production domain. Test navigation on the Preview host separately. |

Official references: [Vercel project configuration](https://vercel.com/docs/project-configuration), [Git deployments](https://vercel.com/docs/git), [CLI deployment](https://vercel.com/docs/projects/deploy-from-cli), [CLI first-deployment behavior](https://vercel.com/docs/cli/deploy), [monorepo roots](https://vercel.com/docs/monorepos), [domains](https://vercel.com/docs/domains/working-with-domains/add-a-domain), [Node versions](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions).
