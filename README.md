# bffless.app

The BFFless landing site — the marketing site served at [bffless.app](https://bffless.app).

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

### The `bffless/platform` project

Deploys target the BFFless **project** `bffless/platform`, not this repo's name. The live
aliases, the `bffless.app` domain, and every pipeline record (telemetry, feedback, pricing,
terms) live under that project. `upload-artifact` would otherwise derive the project from
the GitHub context, so the workflows pin `repository: bffless/platform` explicitly — don't
remove that without migrating the data first.

CI needs a repo variable `LANDING_ASSET_HOST_URL` and a secret `LANDING_ASSET_HOST_KEY`.

## Proxy rules as code

`.bffless/proxy-rules/` holds two rule sets — `landing-episodes` and `landing-page-pipeline`
— synced with `prune: true`, so **git is the source of truth: a rule deleted here is deleted
live**. Pruning only ever removes rules within the set being synced; pipeline schemas resolve
by name and are never deleted, so record data is untouched.
