# Vendored third-party skills

Two upstreams are vendored here. Neither was installed through the plugin
marketplace — `/plugin` is unavailable in this environment — so both were
reviewed and copied by hand.

| Skills | Upstream | Version | License |
|---|---|---|---|
| `ui-ux-pro-max`, `design`, `design-system`, `brand`, `ui-styling`, `banner-design`, `slides` | nextlevelbuilder/ui-ux-pro-max-skill | 2.13.0 | MIT |
| `21st-ai`, `21st-cli-use`, `21st-registry`, `21st-design-sync` | 21st-dev/claude-code-plugin | 0.4.0 | Apache-2.0 |

---

## 2. 21st.dev (`21st-*`)

Source:  https://github.com/21st-dev/claude-code-plugin
Commit:  887200a32152ad2a4af240d4ebb2f2da631f1c23 (2026-07-10)
Version: 0.4.0
License: Apache-2.0

Copied from `plugins/21st/skills/`. No `${CLAUDE_PLUGIN_ROOT}` references —
these skills shell out to the `@21st-dev/cli` npm package via npx, so they work
unchanged as project skills.

### ⚠️ Two of these four PUBLISH PUBLICLY

- **`21st-design-sync`** runs `21st publish-theme`, which uploads the project's
  CSS variables and colour tokens to the 21st.dev **public community gallery**.
- **`21st-registry`** publishes components, themes and template listings to
  21st.dev, and can rewrite the account's public profile page.

This is a **client project**. `design-system/ncc-infraspace/MASTER.md` holds NCC
Infraspace's brand palette. Publishing it to a public gallery would disclose a
client's brand system without their consent. Do not invoke either skill without
explicit, per-action authorisation from the repo owner. Neither has been run.

The other two (`21st-ai`, `21st-cli-use`) only search and pull code inward.

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
