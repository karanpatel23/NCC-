# Vendored third-party skills

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
