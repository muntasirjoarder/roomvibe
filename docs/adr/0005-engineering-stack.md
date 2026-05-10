# v1 engineering stack and hosting

This ADR captures the engineering-stack decisions made as part of issue #1 (walking skeleton). The grilling deliberately deferred this question (see `docs/grill-session-state.md` — "Engineering plan" listed as out-of-scope), so the walking-skeleton slice is where the stack gets locked in.

## Decisions

### Frontend: Next.js (App Router) + React + TypeScript

- **Next.js App Router** as the PWA shell.
- **React + TypeScript** end-to-end.
- **Mobile-first**: Tailwind CSS for styling, responsive starts at the phone viewport and scales up.
- **PWA**: Web App Manifest + minimal service-worker stub at v1 (offline support is not a v1 promise — see ADR-0003 which calls for ephemeral sessions, not offline operation). The manifest is what makes the "Add to Home Screen" affordance work, which is what we actually need for v1.

### Backend: Next.js Route Handlers (TypeScript) on Vercel

- **API routes co-located** with the frontend in the same Next.js app. No separate backend service at v1.
- **Multipart photo upload** via standard `Request.formData()` in a Route Handler.
- **Image storage**: Vercel Blob for v1 — simplest path, fits the ephemeral-session model in ADR-0003 (objects can be TTL-deleted).
- **No database at v1**: sessions are ephemeral and held in Vercel KV (Redis-compatible) keyed by session ID, with a short TTL (e.g., 24h). Matches the ADR-0003 ephemerality commitment.

### Hosting: Vercel

- **Preview deploys per PR** + **production deploys on push to main** — Vercel's default behaviour, no extra CI to wire.
- Region: Sydney (`syd1`) for the AU-only v1 (ADR-0002).
- **Plan**: start on Hobby; upgrade to Pro ($20/mo) only when the FLUX Kontext call (issue #6) requires the longer function timeout.

### Long-running AI calls: queue + poll, not synchronous

- FLUX Kontext + Claude Vision can take 30–60s. Vercel Hobby caps function execution at 60s; Pro at 300s. Neither is a comfortable fit for synchronous request/response from a phone over flaky mobile networks.
- **Pattern**: client `POST /api/sessions` returns a session ID immediately; client polls `GET /api/sessions/:id` (or subscribes via SSE) until the recommendation is ready. Worker uses Vercel's background functions (or a dedicated `/api/worker/*` route triggered by the initial POST).
- This pattern is **not** required for the walking skeleton (issue #1 — stub response only) but the API contract should be designed so issue #5 onwards can adopt it without breaking changes.

### Package management: pnpm

- Faster than npm, stricter than yarn classic, well-supported on Vercel.

### Linting/formatting: ESLint (Next.js default config) + Prettier

- Next.js ships ESLint configured out of the box. Add Prettier on top.

### Observability at v1: Vercel built-ins only

- Vercel Logs + Vercel Analytics. No Sentry, no Datadog at v1.

### Model selection per issue (Claude)

Claude usage costs scale steeply across the family (Haiku → Sonnet → Opus is roughly 1× → 3.75× → 19× input cost). To stay disciplined: pick the cheapest model that comfortably handles each issue's complexity. Default-to-Sonnet is wasteful; default-to-Haiku is risky on architectural work.

| Issue | Model | Justification |
|---|---|---|
| #1 Walking skeleton | Sonnet (done) | Stack decisions, cross-cutting |
| #2 Room DNA + FM1 gate | Sonnet | Vision prompt design + golden-file tests + `room-dna-extractor` interface (reused in #11) |
| #3 Intake screen | Haiku | UI + state + API extension, pattern-following |
| #4 Aspirational tier + `image-renderer` | Sonnet | `image-renderer` abstraction is load-bearing for #6 and v1.5 Nano Banana A/B |
| #5 Catalog + product-matcher | Sonnet | Matching logic + FM4 partial-result + table-driven tests |
| #6 Doable after-image | Haiku | Re-uses #4's renderer; orchestration only |
| #7 Per-tier re-roll + rate limit | Haiku | Standard endpoint + counter |
| #8 Save-as-PDF | Haiku | Library glue (pdf-lib / react-pdf) |
| #9 Failure modes (FM2-FM5) | Sonnet | Four conditionals × ensuring no double-counting against re-roll cap |
| #10 Photo override | Haiku | Small, contained UI |
| #11 Catalog expansion + auto-tag tool | Haiku | Tool is glue; curation is human |
| #12 IKEA affiliate | Haiku | Admin-heavy; code is trivial URL wrapping |
| #13 PWA polish + design review | Sonnet | iOS Safari quirks + Lighthouse + design judgment |
| #14 DESIGN.md adoption | Sonnet | Design system authorship is judgment-heavy |

**Opus is reserved**, not defaulted-to. Use it ad-hoc when stuck on hard bugs or when a critical abstraction needs deeper reasoning. Don't pre-assign it to issues.

**Process:** start each session with `/model haiku` (or `sonnet`) before opening the issue. Don't switch mid-issue — the model that picked the approach should finish it.

## Why this combination

- **Closest to running URL.** Next.js + Vercel + GitHub gives free preview deploys per PR with zero CI configuration. Walking-skeleton-first means time-to-deployed-URL matters more than long-term flexibility.
- **One language, one repo, one deploy pipeline.** Solo / small team — every additional service is overhead. TypeScript both ends means no schema-duplication between client and server.
- **Vercel Blob + KV** are the lowest-effort answers for ephemeral image + session storage and don't require running our own infra. They are commodity choices we can swap later (R2/S3 + Upstash) if cost or lock-in becomes a real problem.
- **AU-only v1**: Vercel `syd1` region keeps latency tight without needing a CDN strategy.

## Trade-offs and what we're *not* picking up

- **Vercel function timeouts**: 60s on Hobby, 300s on Pro. FLUX Kontext can blow through both. Mitigated by the queue+poll pattern above; not a stack-changer. If FLUX waits ever exceed 5min we revisit (probably move the worker to Cloudflare Durable Objects or a Fly.io machine, keep the frontend on Vercel).
- **Cold starts** on Vercel functions add ~200-500ms to the first call after idle. Acceptable for a session-create call where the user is already on a "tap → wait" beat.
- **Vendor lock-in to Vercel**: Vercel Blob + KV + Build pipeline are all Vercel-flavoured. Mitigated by the abstraction in ADR-0002 around the FLUX call (already pattern-established) — apply the same shape to storage. We're not building portability for its own sake; we will pay the porting cost the day we need to.
- **No native mobile app at v1**: PWA only. ADR-0003 already locks this in.
- **No edge runtime / Workers**: Node.js runtime only, for AI SDK compatibility (Anthropic SDK + FLUX SDK both prefer Node).

## Consequences

- Issues #1, #4, #6 can all assume Next.js Route Handlers as the API surface.
- Issue #7 (per-tier re-roll with rate limits) gets Vercel KV for free as the rate-limit store.
- Issue #13 (PWA polish) is constrained to what Next.js's manifest + service-worker tooling can express — likely fine, but worth checking the iOS Safari quirks list against `next-pwa` capabilities.
- The first time we hit a Vercel function timeout in anger, we revisit this ADR rather than papering over it.

## Rejected alternatives

- **SvelteKit + Cloudflare Pages/Workers**: cheaper at scale and good Sydney edge presence, but more glue work for long-running AI calls (Workers CPU limits force Durable Objects or queue-and-poll on day one, not deferred). Fewer batteries included than Next.js. Revisit if Vercel costs become a problem.
- **Vite + React PWA + separate FastAPI/Node on Fly.io**: full control, no function timeouts, but doubles the deploy pipeline complexity and forces a CORS dance between two origins. Right answer for a service that mostly does long-running compute; wrong shape for a v1 PWA where the API is mostly thin.
- **Python backend** (matching `roomvibe_poc.py`): the PoC is explicitly *not* a design constraint per `project_roomvibe` memory. TypeScript end-to-end avoids language switching and lets us share types between client and server.
