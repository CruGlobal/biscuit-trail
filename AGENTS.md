# Working in this repo (for coding agents)

This is **Digital Biscuit Trail** — a card game that groups play together in a
shared room. It is a TypeScript monorepo that runs as a single container:
`api/` is an Express + Socket.IO server (Redis-backed socket adapter and
sessions), `web/` is a Create React App frontend served as static files. There
is **no database**. The person you're helping may not be a developer — make
good, safe defaults and explain what you're doing in plain language.

> 🔴 **The deploy model changed.** This app used to build and deploy on every
> push to `master` (and to a `staging` branch). It no longer does: merging
> deploys **nothing**, and production moves **only** when a human runs a
> promote. Read *How this app ships* before you touch anything deploy-shaped,
> and distrust any other document in this repo that describes branches or
> labels driving deploys — the README's "Deploy" section in particular.

> 🔴 **This app is dormant.** No functional change has landed in about a year
> and a half. Most nights the pipeline is a complete no-op, which is correct
> and not a fault. If you are here at all, you are probably the first thing to
> touch it in a long time: expect stale dependencies, and expect that nothing
> tells you when you break something (see *There is no test suite*).

## Project layout

```
.
├── AGENTS.md          # this file (CLAUDE.md is a pointer to it)
├── README.md          # what the game is + how to add a translation
├── Dockerfile         # single-stage build of both packages into one image
├── build.sh           # builds the image (CI runs this; you can too)
├── .tool-versions     # pinned Node version
├── api/               # Express + Socket.IO server; room and game state
├── web/               # Create React App frontend (Tailwind, react-app-rewired)
└── .github/workflows/ # see "How this app ships"
```

**Not an npm-workspaces monorepo.** The root `package.json` declares no
dependencies and no `workspaces`; it installs the two packages with a
`postinstall` that `cd`s into each. That is why `.github/dependabot.yml` has a
separate entry per package rather than one at the root — if you ever convert
this to real workspaces, collapse those entries at the same time.

## The loop

1. **Work on a branch** off the default branch and open a **Pull Request** back
   to it. Never push to the default branch.
2. **Write the PR title as a Conventional Commit** (`fix(web): …`,
   `deps(api): …`). The `Validate PR Title` check
   (`.github/workflows/conventional-commits.yml`) enforces it, the title becomes
   the squash-commit subject, and the deploy changelog is read straight from
   those subjects — so the title is what makes a release's diff legible.
   **Squash-merge**; the companion infrastructure makes the repo squash-only and
   takes the commit subject from the PR title, so one PR is one commit and one
   changelog line.
3. **Merging deploys nothing.** See below. Do not expect anything to happen
   because you merged.

Build and run locally:

```bash
npm install          # postinstall installs api/ and web/ too
npm run build:api
npm run build:web
npm run start:api    # :8000
npm run start:web    # CRA dev server, proxied to the API
./build.sh           # build the container image the way CI does
```

The API needs a reachable Redis for the Socket.IO adapter and sessions
(`SESSION_REDIS_HOST` / `_PORT` / `_DB_INDEX`, defaulting to `localhost:6379`).

### There is no test suite

No lint, no typecheck job, no tests run on a PR. `Validate PR Title` is the
**only** required check, and it checks the title, not the code. So:

- **Build the image before you open a PR.** `./build.sh` is the closest thing
  to a real gate this repo has — it type-checks `api/` and runs the full CRA
  production build. A change that breaks either fails the nightly build
  instead, hours later, with nobody watching.
- **Exercise the game by hand** for anything touching rooms, sockets, or game
  state. Open two browsers, create a room, join it, play a round.
- Adding a real `test` / `lint` job is a genuinely useful contribution. If you
  do, it has to be registered as a required check in the companion
  infrastructure repo to become a gate — adding the workflow alone does not
  make it one.

## How this app ships

Pipeline v2: **build once, then promote the artifact.** One
environment-agnostic image is built from the default branch, deployed to
**release-candidate** (the staging surface), and — if it is good — promoted
**byte-for-byte, by digest** to production. Promotion re-points production at a
digest; it never rebuilds.

**What changed, precisely.** Before: push to `master` → build → deploy
**production**. So production was the *first* thing a merge touched. Now a
merge touches **no environment at all**, the nightly build lands on
release-candidate, and production is a separate human action. There is **no
`staging` branch, no `On Staging` label and no merge-bot** in this flow. If you
find those referenced anywhere, the reference is stale.

- **Builds do not run on push.** `.github/workflows/pipeline-v2.yml` is
  `schedule: cron '0 5 * * *'` + `workflow_dispatch` **only** — no `push:`
  trigger, deliberately. The nightly builds whatever the default branch holds.
  Need it sooner than tonight? Dispatch *Pipeline v2* by hand; that is also the
  hotfix path.
- **A quiet night is a true no-op.** The build's no-change guard reuses the
  existing candidate when the branch hasn't moved, and the candidate deploy
  skips a digest release-candidate is already running. For a dormant app that
  is nearly every night. A nightly run that did nothing is a success, not a
  skipped build.
- **A build produces a candidate**, tagged by date and by git sha, and deploys
  it to release-candidate. `release-*` tags — the ones a promote creates — are
  **permanent**; candidates age out.
- **Promote and rollback are human actions**, run from the `CruGlobal/cru-deploy`
  repo or the `cru` CLI (`cru app promote` / `cru app rollback`). They check
  that you have push permission on this repo — the pipeline authorizes the
  human who asked, not the workflow. An agent cannot promote to production on
  its own.
- **Deploy, promote, rollback and failure notifications** go to a Slack channel
  configured in the companion infrastructure, not here.
- **The image is environment-agnostic.** The only build-baked value is
  `DD_VERSION` (from the `VERSION` build arg at the end of the `Dockerfile`).
  Everything else — Redis host, ports, secrets — arrives at runtime, because
  the same bytes run on both environments.
- **No database, no migrations.** The companion infrastructure declares
  migrations disabled, so the deploy has no migration step at all. Redis is a
  cache/transport, not a schema — nothing to migrate.
- **The v1 workflow is parked, not removed.**
  `.github/workflows/build-deploy-ecs.yml` has no `push:` trigger and is
  dispatch-only. Leave it that way. It is an escape hatch until the companion
  infrastructure change is applied, and a readable record of how the app used
  to ship after that.

### 🔴 Promoting or rolling back drops every game in progress

Game and room state lives **in memory in a single container** — there is one
replica in production, deliberately, and it is not stateless. Redis carries the
Socket.IO adapter and sessions, **not** the game state.

So any deploy, promote, or rollback **ends every game currently being played**.
Players lose their room. This is a property of the app, not a bug in the
pipeline, and no amount of rolling-deploy care avoids it with one replica
holding the state.

**Time promotes accordingly.** Prefer a window when nobody is playing. If
someone asks you to promote, say this out loud first — it is the single most
surprising thing about shipping this app. The same applies to a rollback: it is
not a free undo.

If you want to fix this properly, the change is moving room and game state out
of process (Redis is already there and already connected) — at which point more
than one replica becomes possible too.

### 🔴 The nginx sidecar serves the frontend — don't remove the VOLUMEs

Unlike most apps in the fleet, this one does **not** front itself. The
container writes the built React app to `/home/node/webapp/public` and exposes
it as a `VOLUME`; a shared nginx sidecar mounts that volume, serves the static
files, and proxies API and WebSocket traffic to the Node process on port
**8000**. The load balancer points at **nginx**, not at the app container.

Two consequences:

- **Do not delete the `VOLUME` lines from the `Dockerfile`**, and do not move
  the built frontend out of `/home/node/webapp/public`, without changing the
  companion infrastructure in the same breath. Either alone takes the site
  down: nginx would serve an empty directory.
- **Do not "modernise" this to nginx-off** because other apps are. The fleet
  default is now the app serving its own static files; this app is a deliberate
  exception until someone teaches the Express server to serve `web/build`.
  That is a reasonable change to make — it is just a real change, not a
  cleanup.

### Feature flags

Flags are served by the pipeline's own flag service and reach the container as
runtime configuration. Don't add a second flag mechanism.

## Infrastructure & secrets

Everything about this app's environments — the container service, DNS,
certificates, the nginx wiring, the Slack destination, repository settings and
the branch ruleset — lives in **`CruGlobal/cru-terraform`** under this app's
directory, not in this repo. Changes there go through their own PR and are
applied by a human.

Runtime configuration and secrets are managed with the `cru` CLI
(`cru app secrets list` / `write`). They are not in this repo and must not be
committed here. Note that `api/` reads `SESSION_REDIS_*` with localhost
defaults — a missing value fails open to localhost rather than erroring, so
check the configured value rather than trusting a healthy boot.

## Leftovers you can ignore

Real cruft, listed so you don't act on it:

- **The README's "Deploy" section** describes pushing to Heroku and a Netlify
  URL. Both are dead. The `Procfile` at the repo root is Heroku's, and nothing
  reads it. The deploy story is *How this app ships*, above.
- **`api/package.json` is named `thryve-backend-api`** — a copy-paste from
  another project. It is not published anywhere and the name has no effect;
  renaming it is harmless but pointless churn.
- **Stale branches: `staging` and `ecs-multi-container`.** `ecs-multi-container`
  is already merged; `staging` belonged to the old push-to-deploy flow and has
  no meaning now. Neither is a base for new work.
- **The `On Staging` issue label**, if you see it, is a v1 artifact. Nothing
  reads it.
- **`web/src/styles/tailwind.css` is generated** (git-ignored, built by
  `build:style`). Don't hand-edit it.
- **The base image is a long-EOL Node line.** Dependabot will offer the bump.
  It is worth taking, and it is a real upgrade with real risk — CRA and the
  Socket.IO stack here are both old. Treat it as a change to test by playing
  the game, not as a routine dependency bump.

## If you're not sure what to do

- **Don't promote to production.** Ask the human. Especially given that a
  promote ends live games.
- **Don't re-add a `push:` trigger** to any workflow, and don't add one to
  `pipeline-v2.yml`. Nightly-plus-dispatch is the intended cadence.
- **Don't change the nginx wiring or the `VOLUME`s** on one side only.
- **Build the image** (`./build.sh`) before you open a PR — it is the only real
  check this repo has.
- When a document in this repo contradicts this file about how the app ships,
  **this file is right** and the other document is stale.
