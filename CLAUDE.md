# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository state

This was migrated from a legacy CRA + Express/Mongoose stack to Next.js (App
Router) + Go. **The migration is complete**: the old `frontend/` and
`server/` directories (and the empty `apps/` Nx leftover) have been deleted.
The active stack is:

- **Frontend**: repo root `app/` (Next.js 16 App Router, React 19, TS),
  `components/` (Tailwind v4 + shadcn/ui)
- **Backend**: `api/` + `pkg/` (Go, `go.mongodb.org/mongo-driver/v2`)

`README.md` and `docs/MIGRATION_PLAN.md` are **stale** — both still document
the old `frontend/`/`server/` layout and pre-cutover setup steps (MongoDB
Compass install, `nodemon`, CRA's `npm start`, etc.) that no longer apply.
Don't follow their setup instructions or treat their "status" checklists as
current; the migration plan doc is still useful for historical *why* on
ported business logic (see below), but not for repo structure or current
commands. `config.json` at the root is likewise a stale duplicate of the old
`server/vercel.json` deploy config — the live one is `vercel.json`.

Admin flow (login, schedule/score/standing forms, httpOnly-cookie auth) is
**not yet built** in the Next.js frontend — the Go API supports it
(`POST /api/admin`, `RequireAdmin`-gated routes), but there's no `app/admin`
or `middleware.ts` route guard yet.

When touching business logic, preserve exact existing runtime behavior even
where it looks like a hardcoded hack — e.g. the CNY term-break date window in
`pkg/handlers/schedules.go` (`cnyStart`/`cnyEnd`/`cnyWinLo`/`cnyWinHi`) is a
deliberate port of an AY19/20-specific rule, not a bug.

## Commands

**Go API** (repo root):
```
go run ./cmd/server              # local dev server on :3900 (PORT env overrides), loads .env.local
go test ./...                    # run all Go tests
go test ./pkg/handlers/...       # single package
go test ./pkg/handlers/ -run TestParseJSDate   # single test
go vet ./...
```

**Next.js frontend** (repo root): always use `bun` for installs/scripts
(`bun install`, `bun run dev`, etc.) — fall back to the `npm` equivalent only
if `bun` isn't available in the environment.
```
bun install
bun run dev                      # next dev
bun run build                    # next build
bun run lint                     # oxlint
```

## Environment setup

Copy `.env.example` → `.env` (Go API) and fill in `DB_URL` (MongoDB Atlas
connection string) and `PRIVATE_KEY` (JWT signing secret for admin auth —
**if left unset, `RequireAdmin` skips auth entirely** and admin routes become
publicly writable; this is an intentional dev-mode escape hatch, never leave
it unset in prod). For the Next.js app, also set `API_URL` pointing at the Go
API (e.g. `http://localhost:3900/api`) for local dev — see `.env.example`
for the full list including `DB_NAME`, `INSTAGRAM_API_URL`, `ACADEMIC_YEAR`.

## Architecture

### Split of responsibilities

Next.js owns rendering/pages/SSR only; it holds no business logic or direct
DB access. Go owns all business logic — MongoDB access, auth, validation —
exposed as `/api/*`. Next.js Server Components/Actions call the Go API
server-side at request time via `lib/api.ts`, so pages are genuinely
server-rendered with live data (not client-fetched).

On Vercel both live in one project: Next.js at the repo root plus `/api/*.go`,
auto-built with the Go runtime alongside the Next.js build. `vercel.json`
rewrites `/api/(.*)` → `/api`. In that deployment, `lib/api.ts` resolves the
API base URL from `VERCEL_URL` (same-origin) rather than `API_URL`, so every
preview deploy hits its own API — `API_URL` is a local-dev-only override and
must **not** be set in Vercel project env vars, or it'll override the
same-origin resolution and point requests at the wrong deployment.

### Go API (`api/`, `pkg/`)

- `api/index.go` — single Vercel Go serverless entry point (`Handler`),
  the entire route table for the app. Builds a `net/http.ServeMux` once
  (`sync.Once`) wiring every route, wrapped in
  `middleware.Recover(middleware.CORS(mux))`.
- `cmd/server/main.go` — runs that exact same `Handler` as a plain local HTTP
  server (loads `.env.local`, listens on `:3900` by default) — not a
  separate implementation, just a local runner for Vercel-parity dev.
- `pkg/db/db.go` — process-wide Mongo client/database singleton
  (`sync.Once`), reused across warm serverless invocations. **Never
  reconnect per-request** — this is the standard Go-on-Vercel + Mongo
  connection-pooling gotcha. Collection accessors (`db.Halls()`,
  `db.Schedules()`, etc.) are the only way handlers should reach Mongo.
- `pkg/models` — structs with `bson`/`json` tags, one file per resource
  (Hall, Schedule, Sport, Admin, Enquiry, Traffic).
- `pkg/handlers` — one file per resource (halls, schedules, sports,
  enquiries, admins, traffic). Has matching `*_test.go` table-driven tests
  (via `httptest` + a mocked collection interface) — when adding a handler,
  add its test file too.
- `pkg/middleware/middleware.go` — `RequireAdmin` (JWT check via
  `x-auth-token` header, no-`PRIVATE_KEY`-means-no-auth escape hatch),
  `Recover` (panic → 500), `CORS` (permissive, allow-all).
- Admin auth uses `golang-jwt/jwt/v5` (HS256) and
  `golang.org/x/crypto/bcrypt` for password hashing.

### Next.js frontend (repo root `app/`, `components/`, `lib/`)

- App Router, Server Components by default; pages fetch data server-side via
  `lib/api.ts` (marked `import "server-only"` — never bundled for the
  browser, reads server-only env vars).
- `lib/api.ts` is the single typed client for the Go API: request helper
  (`apiFetch`) plus one function + TS type per resource (`getHalls`,
  `getSchedulesAsc`, `getResults`, `getSports`, `createEnquiry`, ...). Add
  new Go endpoints here rather than calling `fetch` ad hoc from pages.
  Per-call caching is controlled via Next's `next.revalidate` (e.g. halls/
  sports revalidate daily, schedules/results every 60s); omitting it defaults
  to `no-store`.
- `lib/instagram.ts` — server-side fetch for gallery Instagram photos
  (`INSTAGRAM_API_URL`), same server-only pattern as `lib/api.ts`.
- UI built with Tailwind v4 (`app/globals.css` `@theme` holds the brand
  colors/breakpoints, `TheNextFont`/Lato via `next/font`) + shadcn/ui
  (`components/ui/*`, config in `components.json` — path aliases `@/*` map
  to repo root per `tsconfig.json`).
- Current pages: `home`, `about`, `contact` (enquiry submit via a Server
  Action), `documents`, `gallery`, `schedule`, `results`. No admin pages yet
  (see above).
