# bffless

The BFFless landing site — the marketing site served at [bffless.dev](https://bffless.dev).

A static React 18 + Vite + Tailwind site with no backend of its own. Everything dynamic
(chat, telemetry, the forms, the episodes feed, `install.sh`) is served by BFFless proxy
rule sets, authored as code in `.bffless/proxy-rules/` and synced by CI.

Previously lived at `sites/landing/` in [bffless/platform](https://github.com/bffless/platform).

## Develop

```bash
pnpm install
pnpm dev        # http://localhost:5173
pnpm build      # tsc -b && vite build → dist/
pnpm preview
```

The Vite dev server proxies `/api/*` and `/_bffless/*` to the live deployed backends
(see `vite.config.ts`), so there is nothing to run locally. Login redirects to the admin
host, which won't accept `localhost` as a relay target — exercise the full auth flow on a
deployed preview instead.

## Pages

Four entry points, each its own Rollup input: `index.html` (landing), `terms.html`,
`privacy.html`, and `dashboard.html` (auth-gated telemetry dashboard).

## Deploys

| Workflow | Trigger | Result |
| --- | --- | --- |
| `build.yml` | push to `main` | syncs proxy rules, uploads `dist/` to the `landing-production` alias |
| `preview.yml` | any PR | per-PR rule sets + a `landing-pr-<N>` alias, commented on the PR |
| `cleanup-preview.yml` | PR closed | tears the per-PR alias and rule sets down |

### Host and project

Deploys target the **`bffless/bffless.app`** project on the BFFless instance at
`admin.bffless.dev`, and the site is served at `bffless.dev`.

Three names that look like they should match, but don't:

| Thing | Value |
| --- | --- |
| GitHub repo | `bffless/bffless` |
| BFFless project | `bffless/bffless.app` |
| Public URL | `bffless.dev` |

The project keeps its `.app` name because a BFFless project's `owner/name` **cannot be
renamed** — the API only exposes display name, description, and visibility. Renaming it
would mean creating a new project and migrating the deployment, secrets, and pipeline
records to it.

That matters because `upload-artifact` derives the target project from the GitHub repo
context, which would now resolve to `bffless/bffless` and silently deploy to a new empty
project. So the workflows pin `repository: bffless/bffless.app` explicitly, and
`deploy-proxy-rules` pins `project:` the same way. **Don't remove those pins** unless the
project is genuinely renamed.

CI needs a repo variable `LANDING_ASSET_HOST_URL` (`https://admin.bffless.dev`) and a
secret `LANDING_ASSET_HOST_KEY`. `.bffless/config.json` points the local CLI at the same
place.

## Proxy rules as code

`.bffless/proxy-rules/` holds two rule sets — `landing-episodes` and `landing-page-pipeline`
— synced with `prune: true`, so **git is the source of truth: a rule deleted here is deleted
live**. Pruning only ever removes rules within the set being synced; pipeline schemas resolve
by name and are never deleted, so record data is untouched.
