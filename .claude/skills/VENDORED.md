# Vendored third-party skills

Only **one** upstream is vendored into this repo. `/plugin` is unavailable in
this environment, so it was reviewed and copied by hand.

| Skills | Upstream | Version | License | Where |
|---|---|---|---|---|
| `ui-ux-pro-max`, `design`, `design-system`, `brand`, `ui-styling`, `banner-design`, `slides` | nextlevelbuilder/ui-ux-pro-max-skill | 2.13.0 | MIT | vendored here |
| `21st-*` (7 skills) | 21st.dev | — | Apache-2.0 | **global**, not vendored |

---

## 2. 21st.dev (`21st-*`) — installed globally, deliberately not vendored

Install command (reproducible — re-run it on a new machine):

```bash
npx @21st-dev/cli install-skill
```

That installs 7 skills into `~/.claude/skills/` (and `~/.cursor/skills`,
`~/.codex/skills`): `21st-cli-use`, `21st-ai`, `21st-registry`,
`21st-design-sync`, `21st-ui-build`, `21st-ui-explore`, `21st-ui-review`.
It touches nothing inside this repo.

**Why they are not vendored.** Four of them were briefly copied into
`.claude/skills/` from `21st-dev/claude-code-plugin@887200a` before the official
installer was run. That was a mistake: project skills shadow global ones, and
the vendored `21st-registry` was stale (7.8 KB vs the installer's 18 KB), so the
repo copy would have silently overridden the newer one. The copies were removed.
Use the install command above instead.

### ⚠️ Two of the seven PUBLISH PUBLICLY

- **`21st-design-sync`** runs `21st publish-theme`, which uploads the project's
  CSS variables and colour tokens to the 21st.dev **public community gallery**.
- **`21st-registry`** publishes components, themes and template listings to
  21st.dev, and can rewrite the account's public profile page.

This is a **client project**. `design-system/ncc-infraspace/MASTER.md` holds NCC
Infraspace's brand palette. Publishing it to a public gallery would disclose a
client's brand system without their consent. Do not invoke either skill without
explicit, per-action authorisation from the repo owner. Neither has been run.

The other five only pull inward: `21st-ai` and `21st-cli-use` (search/generate),
plus `21st-ui-build`, `21st-ui-explore` and `21st-ui-review`.

### ⚠️ Do NOT install ui-ux-pro-max through the 21st CLI

`21st skills catalog` lists exactly one curated external skill: `ui-ux-pro-max`
pinned at **v2.5.0**, installed via `npx uipro-cli@2.5.0` into
`.claude/skills/ui-ux-pro-max` — the same directory used below. That is a
**downgrade** from the v2.13.0 vendored here, and it would overwrite the version
the design system was built with. Update ui-ux-pro-max from its own upstream
instead.

### MCP server

`.mcp.json` at the project root registers the remote `21st` HTTP MCP server
(`https://21st.dev/api/mcp`), written by
`npx @21st-dev/cli init --client claude --write`. It authenticates with an
`x-api-key` header read from the `API_KEY_21ST` environment variable — the file
stores the `${API_KEY_21ST}` placeholder, never a literal secret, so it is safe
to commit. The key must be set by the repo owner; get one at
https://21st.dev/settings/api-keys. Until it is set and Claude is restarted, the
server is registered but inactive.

---

## 1. ui-ux-pro-max

Source:  https://github.com/nextlevelbuilder/ui-ux-pro-max-skill
Commit:  e353a508767c6d39f0e7698b084dbfc8699fffd3 (2026-08-25)
Version: 2.13.0
License: MIT

Installed by copying the repo's `.claude/skills/` directory verbatim. The
upstream install path (`npx ui-ux-pro-max-cli init`) and the plugin marketplace
route were both unavailable in the session that installed this, so the files
were vetted and copied directly.

## Pre-install review

- Shipped runtime scripts (`ui-ux-pro-max/scripts/core.py`, `search.py`) are
  offline CSV search. No network calls, no `eval`/`exec`, no subprocess.
- `validate_data.py` imports `urllib.parse` for URL parsing only, not fetching.
- `ui-styling/scripts/shadcn_add.py` DOES shell out to the `shadcn` CLI via
  subprocess. Unused by this project; review before invoking that skill.
- `stack/.mcp.json` upstream declares playwright / chrome-devtools / shadcn MCP
  servers. That file was NOT copied here and no MCP server was registered.

## Path caveat

Upstream SKILL.md files invoke scripts via `${CLAUDE_PLUGIN_ROOT}`. That
variable is only set for marketplace-installed plugins, not for project skills.
Invoke the scripts by absolute path instead:

    python3 .claude/skills/ui-ux-pro-max/scripts/search.py "<query>" --domain <domain>

To update: re-clone upstream and re-copy. Do not hand-edit these files.
