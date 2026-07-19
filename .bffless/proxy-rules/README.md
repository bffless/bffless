# The backend for bffless.dev

You've landed in the backend of [bffless.dev](https://bffless.dev). There is no
server — no Express app, no Lambda, no container. Every dynamic endpoint on the
landing page is one of the YAML files below, running as a **BFFless pipeline**.

This folder is the thing the landing page's "the backend is a folder in your
repo" section is talking about. It's real, it's what's live in production, and
you're reading it.

## How it works

A **rule** maps an incoming path to either a proxy target or a **pipeline** — an
ordered chain of handlers (validate a form, write a DB row, call an HTTP API,
send an email, ask an LLM, respond). Handlers are configured in YAML; when a
step needs real logic it points at a `.fn.js` file sitting next to the rule.

The path on disk *is* the route:

```
rules/api/feedback-form/any.rule.yaml   →   ANY  /api/feedback-form
rules/api/episodes/get/rule.yaml        →   GET  /api/episodes
rules/install.sh/get/rule.yaml          →   GET  /install.sh
```

`any.rule.yaml` matches any method; `get`/`post` directories scope a rule to
that verb.

## What's in here

Three rule sets, each a directory with a `ruleset.yaml` at its root.

### `landing-page-pipeline/`

| Route | What it does |
| --- | --- |
| `/api/feedback-form` | Validates the form (with a honeypot), writes a `feedback` record, emails the team. |
| `/api/pricing-form` | Same shape, for the pricing enquiry form. |
| `/api/tos-form` | Same shape, for the terms/contact form. |
| `/api/demo` | Demo request form → `demo` record. |
| `/api/developer-review` | Collects developer reviews/testimonials for CE. |
| `/api/hits` | Reads a counter row out of the `key-store` table. |
| `/api/chat` | Proxies to `chat.bffless.dev` — this is the page's live AI chat. |
| `/api/telemetry` (POST) | Appends an install-telemetry row; IP and UA are captured server-side. |
| `/api/telemetry/stats` (GET) | Aggregated telemetry for the admin dashboard. `gate.fn.js` rejects anyone without an admin session before `aggregate.fn.js` runs. |
| `/install.sh` | `classify_ua.fn.js` decides CLI vs browser; a CLI gets the real install script fetched from the CE repo, a browser gets a friendly message. Either way a post-step logs the hit. |

`schemas/` holds the data-table definitions (`feedback`, `demo`, `pricing`,
`install_telemetry`, …). Rules reference them **by name** — `schemaId:
$schema:feedback` — which is resolved on push, so the YAML never carries an
environment-specific ID.

### `landing-episodes/`

One route, [`/api/episodes`](https://bffless.dev/api/episodes) — go and hit it,
that JSON is this rule set responding. It fetches the YouTube Docs playlist,
reshapes it in `shape.fn.js` (parse the episode number out of the title, sort
newest-first), and serves the result with a 1-hour cache. If YouTube is down it
returns 503 rather than failing the page.

The API key comes from `secrets.YOUTUBE_API_KEY` — secrets are referenced by
name and resolved server-side, never committed here.

Note `shape.fn.test.yaml` next to it: handler functions are unit-testable, with
cases declared as YAML fixtures.

### `youtube-subscriber-watch/`

A **cron pipeline**, not a public endpoint. A BFFless *pipeline schedule* fires
its one rule on a cadence; each run polls the YouTube Data API for the
[@bffless](https://www.youtube.com/@bffless) subscriber count, compares it to
the newest `youtube_subscribers` row, and — only when the count changed —
appends a new row (count, previous, delta) and emails a notification.
`decide.fn.js` does the comparison and is covered by `decide.fn.test.yaml`.

The set is intentionally **not attached to any alias**: the schedule triggers
the pipeline directly by rule id, so the route never needs to be reachable
(and attaching it would let anyone spam the email step). The schedule itself
(cron expression, timezone) is not part of this export — it's managed in the
dashboard under Pipeline Schedules, pointed at this rule.

## How it gets deployed

`.bffless/config.json` at the repo root points at the project and globs these
sets. On merge to `main`, `.github/workflows/build.yml` runs
[`bffless/deploy-proxy-rules`](https://github.com/bffless/deploy-proxy-rules)
with `prune: true` — **git is the source of truth**, so a rule deleted here is
deleted in production. Pruning only ever removes rules within the set being
synced; schemas resolve by name and are never dropped, so record data is safe.

Locally, the [`bffless` CLI](https://github.com/bffless/ce/tree/main/packages/cli)
does the same two things:

```bash
bffless rules diff           # what's different between this branch and live
bffless rules push --prune   # make live match this branch
```

## Learn more

- [Rules-as-code recipe](https://docs.bffless.dev/recipes/proxy-rules-as-code/) — the full CLI and CI flow
- [Pipelines docs](https://docs.bffless.dev/) — the complete handler vocabulary
- [BFFless CE](https://github.com/bffless/ce) — self-host the whole thing
