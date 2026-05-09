# v1 runtime and UX shape: PWA, ephemeral sessions, vertical-scroll presentation, two-tier output

This ADR captures the runtime and UX-shape decisions that fall out of ADR-0002's product scope. Recorded together because they're load-bearing on each other — each decision constrains or unlocks the others.

## Decisions

- **Session shape: P2 — one-shot with light intake + per-recommendation re-roll.** Photos plus three multiple-choice intake questions (budget cap, mood steering, priority). Two recommendations are produced per session. User can re-roll any single recommendation (rate-limited). Sessions are ephemeral — no accounts, no persistence between visits. A "save as PDF / share" export converts ephemerality into a takeaway. Rejected: P1 (pure one-shot, too brittle if all three miss), P3 (persistent projects with auth, scope creep for v1).

- **Platform: Progressive Web App (PWA), mobile-first.** Single codebase, distributed via link, no app-store approval friction. Camera and upload via web APIs. Adequate for v1's job-to-be-done at ~20% the build cost of native. Rejected: native iOS+Android (slowest to ship, app-store latency on every iteration, scope creep), web-first responsive (wrong for a camera-first product).

- **Output collapsed from three to two recommendations.** Aspirational + Doable, no Mid tier. Maps directly to the *"stunning but doable"* tagline. Mid had no coherent definition (neither structural-permitted nor catalog-anchored), weakened the story, and cost ~33% extra per session for unclear value. The aspirational↔doable gap is bridged interactively via re-roll, not statically via a middle tier. (Amended into ADR-0002 in place; documented here because it shaped the presentation pattern below.)

- **Presentation pattern: vertical scroll with aspirational as hero.** Aspirational fills the first viewport and lands the WOW immediately. Doable scrolls in below. The two render *progressively* — aspirational appears as soon as it's done while doable is still computing — so total render latency (~20-40s) feels like anticipation rather than dead time. Rejected: horizontal carousel (loading-state awkwardness, comparison requires repeated swipes), hero+tabs hybrid (real upgrade once data shows comparison is the dominant action — saved for v1.5).

- **CTAs at v1: per-item buy links (D), per-recommendation re-roll (E), save-as-PDF export (A).** Native share (B) deferred to v1.1 fast-follow once the share-card visual is designed properly. "Talk to a builder" affiliate (C) deferred to v1.5 — needs partnership, legal copy, and tracking infrastructure that's premature now.

## Consequences

- **Ephemeral session + PDF export** is the v1 substitute for accounts. Users who want to "save" their result get a PDF; users who want to "return later" must re-upload. This is a known tension and the right v1 trade — accounts are a v2 conversation.
- **D (buy links) introduces a light commerce surface.** Affiliate sign-up with IKEA AU is required before launch. Tracking IDs go in product URLs. Affiliate disclosure copy lives in the doable tier (legal + trust requirement).
- **The doable tier is now visibly more interactive than the aspirational tier** — items are tappable, prices are visible, links go out to retailers. Aspirational is mostly a static image. This asymmetry is intentional: "feel this" vs "do this."
- **Rate limits on re-roll** must be enforced server-side (working cap: 3 re-rolls per recommendation per session) — without this, gen costs scale linearly with picky users and unit economics break.
- **iOS Safari PWA quirks** are an accepted v1 tax. If user research shows iOS share is dominant *and* PWA-on-iOS feels broken, native iOS becomes the v1.5 priority over Android.
- **Mobile-first viewport assumed everywhere** — no desktop-specific design at v1. Desktop users get a graceful-degradation responsive layout but it's not the target.
