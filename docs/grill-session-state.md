# Grill session state — complete

Session ran via `/grill-with-docs` against `appidea.md`. **Status: complete.** All queued questions resolved; v1 design captured across CONTEXT.md and four ADRs.

## Where the design lives

| Artifact | What it captures |
|---|---|
| [CONTEXT.md](../CONTEXT.md) | Glossary — every load-bearing domain term defined precisely |
| [ADR-0001](adr/0001-semantic-accuracy-floor.md) | Semantic accuracy is the v1 floor; spatial accuracy is not promised |
| [ADR-0002](adr/0002-v1-product-scope.md) | v1 product scope: tagline, tiers, geography, retailers, corpus, catalog, rooms |
| [ADR-0003](adr/0003-v1-runtime-and-ux-shape.md) | Runtime + UX shape: PWA, ephemeral sessions, vertical-scroll presentation, two-tier output, CTAs |
| [ADR-0004](adr/0004-v1-input-cost-and-failure-handling.md) | Multi-photo handling, cost presentation, intake defaults, failure modes |
| [v1-user-flow.md](v1-user-flow.md) | End-to-end PWA flow, screen-by-screen |

## Questions resolved (Q1 → Q15)

| # | Question | Answer |
|---|---|---|
| Q1 | Primary v1 outcome — mood-board, buildable brief, or shoppable cart? | Aspirational mood-board, refined to **"stunning but doable"** |
| Q2 | Accuracy floor — spatial / semantic / aesthetic? | **L2 (semantic)** floor; L3 (aesthetic) implicit; L1 (spatial) explicitly NOT promised |
| Q3 | What axis spans the recommendations? | **Ambition tier** — collapsed from three tiers to **two** (aspirational + doable) |
| Q4 | Geographic + retailer scope? | **AU-only at v1**; **IKEA AU + Bunnings** |
| Q5 | Inspiration corpus mechanism? | **M3** (foundation-model knowledge only) for v1; **M3.5-synth** scheduled for v1.5 |
| Q6 | Catalog acquisition mechanism? | **C2** — manual curation, ~200 items, hotlinked images, auto-tagged via DNA prompt |
| Q7 | Which room types ship at v1? | **Bedroom + Living Room only** |
| Q8 | After-image generation model? | **FLUX Kontext** behind a thin abstraction |
| Q9 | Session shape? | **P2** — one-shot with light intake + per-recommendation re-roll, ephemeral |
| Q10 | Platform? | **PWA**, mobile-first |
| Q11 | Presentation pattern? | **Vertical scroll with aspirational as hero**; progressive reveal |
| Q12 | CTAs at v1? | **Per-item buy links + per-rec re-roll + save-as-PDF**. Native share v1.1; "talk to a builder" v1.5 |
| Q13 | Multi-photo handling? | **Auto-pick main photo + manual override + cap at 3 photos** |
| Q14 | Cost format? | **F1** — per-item exact, total rounded, no aspirational prices, no labour estimates |
| Q14b | Intake required vs optional? | **R3 — adaptive defaults** for all three intake questions |
| Q15 | Failure modes? | FM1-FM5 defaults all accepted (see ADR-0004) |

## What's NOT in scope of the grill (deliberately)

These are real questions that will need answering, but not now:
- Pricing model (free / freemium / subscription / per-room)
- Auth flow (none at v1, but how to bridge to v2 accounts)
- Privacy / image retention policy
- Distribution (App Store, Play Store, web — relevant if going native at v1.5+)
- Brand naming (currently "RoomVibe" in PoC)
- Visual design, copy polish, motion choreography
- Specific copy for intake questions, CTAs, error states
- iOS Safari PWA-specific quirks
- Affiliate program signup with IKEA AU + Bunnings
- Catalog content (which 200 items, specifically)
- Engineering plan (architecture, tech stack, hosting, observability)

## Natural next steps

Choose one:

1. **PRD** — Run `/to-prd` to synthesize this design into a Product Requirements Document.
2. **Issues** — Run `/to-issues` to break it into independently-grabbable build tickets.
3. **Prototype** — Run `/prototype` to spin up a throwaway prototype against this design.
4. **Engineering plan** — A separate planning pass on architecture/tech-stack/hosting decisions.
5. **Build** — Just start.
