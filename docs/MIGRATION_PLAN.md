# Migrate IHG to Next.js + Go, all Vercel-deployable

## Status (as of 2026-08-02)

Phases 1 and 2 have cut over: the legacy `frontend/` (CRA) and `server/`
(Express) directories have been deleted from the repo. The Go API
(`cmd/server`, `api/`, `pkg/`) and Next.js app (repo root) are now the only
frontend/backend.

- [x] Go toolchain installed locally
- [x] `/api` Go module scaffolded (`go.mod`, Mongo client singleton in `pkg/db`)
- [x] Models ported (`pkg/models`)
- [x] Route handlers ported (`pkg/handlers`)
- [x] Auth/error/CORS middleware ported (`pkg/middleware`)
- [x] Baseline Go tests written and passing (`go test ./...`)
- [x] `cmd/server/main.go` added for running the Go API locally (`go run ./cmd/server`)
- [x] Cut prod over to the Go backend, delete `server/`
- [x] Scaffolded via `create-next-app` (TS, App Router, Tailwind v4) + `shadcn/ui` init
- [x] Brand theme ported: custom breakpoints/colors in `app/globals.css`'s
      `@theme`, `TheNextFont`/Lato via `next/font/*`
- [x] Shared layout (`NavBar`, `Footer`, `BoxDivider`) and typed server-only
      API client (`lib/api.ts`, `lib/instagram.ts`)
- [x] Static/marketing pages ported and verified against the live Go API +
      Mongo data: `home`, `about`, `contact` (incl. working enquiry submit via
      a Server Action), `documents`, `gallery`
- [x] Cut prod over to the Next.js frontend, delete `frontend/`
- [ ] `schedule` and `results` pages (data-driven, step 2 below)
- [ ] Admin flow + httpOnly-cookie auth (step 3 below) - `NavBar` is
      currently public-links-only, no auth/logout wired up yet
- [ ] Phase 3 (consolidation/cleanup, see below) — not started

---

## Context

The repo currently ships:
- **Frontend** (`frontend/`): Create React App 3.0.1 (dead, unmaintained), React 16.8.6, Material-UI v4 (EOL, incompatible with React ≥18), react-router-dom v5, plain JS, no TS, no SSR — pure client-side SPA.
- **Backend** (`server/`): Express 4 + Mongoose 5 (MongoDB) as a single Vercel Node serverless function (`server/api/index.js`), plain JS, no tests.
- **Deploy**: `server/vercel.json` builds the Express app as one `@vercel/node` function; a root `config.json` (looks like a stale/duplicate vercel config) rewrites `/api/*` to it and everything else to `frontend/build`.

Goal: modernize to React@latest/TypeScript@latest via **Next.js (App Router, SSR)**, rewrite the backend in **Go**, keep **MongoDB** as the datastore, replace MUI with **Tailwind + shadcn/ui**, and add baseline test coverage — while staying Vercel-deployable throughout.

Confirmed architecture: Next.js owns rendering/pages/SSR only. Go owns all business logic — MongoDB access (via `go.mongodb.org/mongo-driver`, the Go analog of Mongoose), auth, validation — exposed as `/api/*`. Next.js Server Components call the Go API server-side at request time, so pages are still genuinely server-rendered with live data. Vercel supports both in one project: a Next.js app at the repo root plus a top-level `/api/*.go` directory, which Vercel auto-builds with the Go runtime alongside the Next.js build — no separate project/service needed. This mirrors the current single-catch-all-function pattern, just swapping Express→Go and CRA→Next.js.

Strategy: **incremental, phased**. Each phase ships a working, deployed state before the next starts, so the site is never broken mid-migration.

---

## Phase 1 — Go backend (parity rewrite), frontend untouched

Replace `server/` with a Go backend that preserves the exact existing REST contract, so the current CRA frontend keeps working against it unchanged (just point its API base URL at the new deployment).

**Layout** (new, alongside untouched `frontend/` and `server/` until cutover):
```
/api/
  index.go                 # single entry Handler, routes via Go 1.22+ net/http.ServeMux
  internal/
    models/                # Hall, Schedule, Sport, Admin, Enquiry, Traffic structs (bson tags)
    handlers/               # one file per resource, mirrors server/routes/*.js
    middleware/             # admin JWT auth, panic-recovery (replaces express-async-errors + middleware/error.js)
    db/                     # Mongo client singleton
/go.mod
```

Key ports (source → target):
- `server/model/*.js` (Hall, Schedule, Sport, Admin, Enquiry, Traffic) → Go structs with `bson`/`json` tags in `api/internal/models`. Note: `hall.js`'s Joi validation is already dead/broken (`schema = {}`, `Joi` import commented out) — port the *actual runtime behavior* (i.e., no real validation), don't silently add stricter validation that could reject previously-accepted data.
- `server/routes/*.js` → `api/internal/handlers/*.go`, same paths/methods/response shapes. Preserve one-off business logic exactly as-is even where it looks like a hardcoded hack (e.g. the CNY date-window special case in `schedules.js`) — this is a migration, not a behavior change.
- `server/middleware/admin.js` (JWT check) → Go middleware using `golang-jwt/jwt/v5`.
- `bcryptjs` → `golang.org/x/crypto/bcrypt`.
- `server/startup/cors.js` → likely droppable: once Next.js and the Go API share one Vercel project/domain, calls are same-origin. Keep a thin CORS header fallback only if anything still needs cross-origin access.
- `config` (node-config, `server/config/*.json`) → plain `os.Getenv` for `DB_URL`/JWT secret; no config layering needed for a single-env serverless deploy.
- **Mongo connection reuse**: initialize the `*mongo.Client` once at package scope, reused across warm serverless invocations — do not reconnect per-request (classic Go-on-Vercel + Mongo gotcha).

**Tests** (baseline, table-driven): handler tests via `httptest` against a mocked collection interface; unit tests for the schedule date-window logic and any other non-trivial business rules found while porting.

**Verify & cut over**: deploy as a Vercel preview, diff responses endpoint-by-endpoint against the live Node API, point a preview build of the *existing* CRA frontend at it and smoke-test the whole site (public pages + admin login/forms). Once confirmed, promote to prod, delete `server/`.

---

## Phase 2 — Next.js + TypeScript + Tailwind/shadcn frontend (Go backend unchanged)

Replace `frontend/` with a Next.js (latest, App Router, TS strict) app at the repo root, calling the now-stable Go API.

- Scaffold via `create-next-app` + Tailwind + shadcn/ui init.
- Typed API client (`lib/api.ts`) with TS types mirroring the Go handlers' response DTOs.
- Migrate pages roughly by risk order:
  1. Static/marketing pages first (`about`, `contact`, `documents`, `gallery`, `home`) as Server Components — no auth, lowest risk.
  2. Data-driven pages (`schedule`, `results`) as Server Components fetching from the Go API server-side; re-check `recharts`/chart usage for React 19 compatibility (bump as needed), and drop `react-responsive` in favor of Tailwind breakpoints.
  3. Admin flow (`admin/login`, `scheduleForm`, `scoreForm`, `standingForm`): login posts credentials to the Go API, backend issues a JWT, Next.js sets it as an **httpOnly cookie** (a real security improvement over today's client-readable `jwt-decode` + `react-cookies` storage); a `middleware.ts` guards `/admin/*` server-side, replacing the client-side `protectedRoute.jsx` check. Forms become Client Components using shadcn form primitives.
- Rebuild shared components (`BoxDivider`, `card`, `footer`, `navBar`, `slider`, `resultBar*`, `resultRow*`, `resultsTable`, `scheduleBox`, `sportsList`) as Tailwind/shadcn TSX — this is the bulk of the visual-parity work since it's a UI-library swap, not just a JS→TS port.
- react-router-dom v5 routes → Next.js file-based routing under `/app`.

**Tests**: Vitest + React Testing Library smoke tests for the key pages (home, schedule, results) and the admin login/auth-guard flow.

**Verify & cut over**: deploy as a Vercel preview against the live Go API, manually walk every public page and the full admin flow (login → create/edit schedule/score/standing). Once confirmed, promote to prod, delete `frontend/`.

---

## Phase 3 — Consolidation & cleanup

- [x] Collapsed deploy config to one root `vercel.json`; removed the stale root `config.json`.
- Update `README.md`: new local dev instructions (install Go, `go run`/Vercel dev for `/api`, `next dev` for the app instead of the old manual MongoDB Compass/`nodemon` steps).
- Optional follow-up (flag, don't block on): add a GitHub Actions workflow running `go test ./...` and the frontend test/lint suite on PRs, since this is the first time either side of the repo will have tests worth gating on.

---

## Risks / things to watch

- **Auth model change**: moving from client-stored JWT to httpOnly cookies is intentionally more secure but changes the login/session flow — needs careful manual QA in Phase 2, not just visual parity.
- **Mongo + serverless**: connection pool sizing/cold starts on Vercel Go functions need the singleton-client pattern above; verify under the same Atlas tier currently in use.
- **Dependency compatibility**: `recharts` and any other MUI-era libs must be re-verified against React 19 during Phase 2; expect some to need version bumps or replacement.
- Local machine currently has no Go toolchain installed — first concrete step in Phase 1 is installing Go.

## Verification approach (both phases)

- Phase 1: automated response diffing (old Node API vs new Go API) per endpoint, plus manual smoke test of the *existing* frontend pointed at the new backend.
- Phase 2: manual walkthrough of every page + the full admin CRUD flow against the live Go backend, plus the new Vitest/RTL suite.
- Both: deploy to a Vercel preview URL before promoting to production; never cut over based on local-only testing.
