# RoomVibe v1 — Product Requirements Document

**Status:** Ready for engineering pickup. Design is locked in [CONTEXT.md](../CONTEXT.md), [ADR-0001](adr/0001-semantic-accuracy-floor.md), [ADR-0002](adr/0002-v1-product-scope.md), [ADR-0003](adr/0003-v1-runtime-and-ux-shape.md), [ADR-0004](adr/0004-v1-input-cost-and-failure-handling.md), and [v1-user-flow.md](v1-user-flow.md).

---

## Problem Statement

A regular person has a messy bedroom or living room they want to make beautiful, but they're stuck:

- They don't know where to start. Pinterest and Houzz are full of stunning rooms, but every one feels impossibly far from their actual reality.
- They can't afford an interior designer, and even if they could, they'd want a sense of direction first before committing.
- They're afraid of making the room boring, generic, or wrong.
- They want to see *both* what's possible (the dream) and what they could realistically afford and execute. Most inspiration tools only show the dream — the gap between dream and reality is left as an exercise for the user, and that gap is exactly where motivation dies.

## Solution

The user uploads up to 3 photos of their bedroom or living room from a phone, answers three quick multiple-choice questions (mood, focus area, budget) — all with sensible defaults pre-selected — and within ~30–60 seconds receives **two design recommendations** for their actual room:

- An **aspirational** version: a stunning after-image with prose-level change suggestions. The dream — possibly including structural changes, designer touches, and items beyond their stated budget. No prices.
- A **doable** version: an after-image plus a list of specific items from IKEA AU and Bunnings, each with an exact price and a click-through link to buy. The total cost is rounded and references the user's chosen budget bucket.

The user can re-roll any single recommendation if they're not happy (rate-limited), save the result as a PDF, or click through to retailer sites to act on the doable version. Sessions are ephemeral — the PDF is the takeaway.

The product promise is *"stunning but doable"* — closing the gap between aspiration and action in a single session, not as separate apps.

## User Stories

### Photo upload and intake

1. As a user, I want to upload up to 3 photos of my room, so that the app can analyze it from multiple angles.
2. As a user, I want to take photos directly with my phone camera or pick from my photo gallery, so that I can use whichever is most convenient.
3. As a user, I want the app to detect my room type immediately and tell me if it isn't supported, so that I'm not made to wait through a long analysis only to be refused at the end.
4. As a user, I want a soft cap of 3 photos with a hint to upload "different angles", so that I get good results without uploading my entire camera roll.
5. As a user, I want to specify my budget upfront, so that the doable suggestions fit what I can actually spend.
6. As a user, I want sensible defaults pre-selected for all intake questions, so that I don't feel like I'm filling out a form before I can even see anything.
7. As a regular user without design vocabulary, I want to pick a mood (cosy / sharp / calm / fresh) instead of a style name like "japandi" or "scandi", so that I don't need to learn designer jargon.
8. As a regular user, I want to pick what to focus on (better light / more storage / less clutter / more inviting), so that the suggestions feel personalized to my biggest pain rather than generic.
9. As a user, I want my photos to be retained when I navigate between intake and result screens, so that I don't have to re-upload.

### Aspirational tier

10. As a user, I want to see the aspirational redesign first as a hero image at the top of the result screen, so that I get inspired immediately and the WOW moment lands.
11. As a user, I want the aspirational tier to feel ambitious and dreamy, including bold changes I might not be able to do myself, so that I get a sense of what's truly possible.
12. As a user, I want the aspirational tier to be deliberately uncosted, so that I understand it's a vision rather than a quote and I'm not misled by speculative numbers.
13. As a user, I want a clear bullet list of the aspirational changes alongside the image, so that I understand what I'm looking at and can describe it to a contractor or partner.
14. As a user, I want to re-roll the aspirational tier if it doesn't speak to me, so that I can try a different creative direction.

### Doable tier

15. As a user, I want to see specific products with thumbnails, names, and exact prices in the doable tier, so that I know exactly what to buy.
16. As a user, I want each doable item to be clickable through to IKEA AU or Bunnings, so that I can act on the recommendations in seconds.
17. As a user, I want to see a rounded total cost ("~$1,200") rather than a precisely-summed number, so that I understand it's an estimate.
18. As a user, I want the total to reference my chosen budget bucket, so that I feel my budget was respected.
19. As a user, I want a footer reminding me about delivery, assembly, and possible paint/install extras, so that I'm not surprised by additional costs.
20. As a user, I want the doable tier to share the same style direction as the aspirational tier, so that the two feel like one design at two intensities, not two different ideas.
21. As a user, I want to re-roll the doable tier if it doesn't feel right, so that I can try different items in the same style.

### Result presentation and progressive reveal

22. As a user, I want the aspirational image to appear as soon as it's ready (even while doable is still computing), so that I'm not staring at a spinner for 60 seconds.
23. As a user, I want the result to be a single scrolling page (not tabs or carousel), so that I can take a screenshot of the whole thing.
24. As a user, I want to compare aspirational and doable side-by-side by scrolling, so that I can see the gap between dream and reality.

### Failure handling

25. As a user, I want a friendly modal when I upload a bathroom or kitchen photo telling me what's supported and when more types are coming, so that I'm not confused or frustrated by silent refusal.
26. As a user with a mixed-use room (bedroom plus desk, living plus dining), I want the app to handle it gracefully and let me override its assumption with one tap, so that mixed-use isn't a failure mode.
27. As a user with a poor-quality photo, I want a gentle tip alongside my result rather than a refusal, so that the experience is still delivered and I learn how to get sharper results next time.
28. As a user with a tight budget, I want to see whatever fits within budget along with a gentle note about what didn't fit, plus an easy way to widen the budget, so that I'm never blocked.
29. As a user who has used up my re-roll allowance on a tier, I want to be redirected to a fresh intake (with photos retained) rather than greyed out, so that I always have a path forward.
30. As a user, I want the auto-detected "primary view" photo to be overrideable from the result screen, so that I can see the redesign from a different angle if I prefer.

### Calls-to-action and takeaway

31. As a user, I want to save the entire session as a PDF, so that I can keep it after closing the app, share it with a partner or contractor, and refer back to it later.
32. As a user, I want the PDF to include both recommendations, item details, prices, and the after-images, so that it stands alone as a takeaway document.
33. As a user, I want the affiliate relationship with retailers disclosed clearly, so that I trust the recommendations are honest.

### Platform and access

34. As a user on a phone, I want to use the app from my browser without installing anything, so that I can try it instantly via a shared link.
35. As a user, I want the option to "add to home screen" so that the app feels native after I've decided I like it.
36. As a desktop user, I want a graceful experience even though the app is mobile-first, so that I'm not blocked from using it.

### Catalog operations (admin / off-stage)

37. As an admin, I want to add and update items in the catalog (SKU, price, image URL, dimensions, category, DNA tags), so that the doable tier stays fresh and accurate.
38. As an admin, I want catalog items auto-tagged with DNA via the same vision pipeline used for room photos, so that I'm only doing curation work, not data entry.
39. As an admin, I want to verify catalog price/URL freshness on a periodic refresh, so that users don't see outdated information.

## Implementation Decisions

### Module decomposition

The system decomposes into eight modules. Boundaries chosen to maximize testability of the load-bearing logic and to abstract vendor dependencies for future swap.

**Deep modules** (encapsulate complex logic behind simple, stable interfaces):

- `room-dna-extractor` — Takes 1–3 input photos and returns a structured `RoomDNA` JSON object. Wraps the Anthropic Claude Vision call and prompt that the PoC already proved works. Pure mapping function from images to JSON; same module is later used to extract product DNA from catalog images and (in v1.5) inspiration DNA from synthetic stunning rooms — this symmetry is deliberate per ADR-0002.
- `room-dna-extractor` — Takes 1–3 input photos and returns a structured `RoomDNA` JSON object. Wraps the selected vision vendor's API call (see ADR-0006) and prompt. Pure mapping function from images to JSON; same module is later used to extract product DNA from catalog images and (in v1.5) inspiration DNA from synthetic stunning rooms — this symmetry is deliberate per ADR-0002.
- `room-type-classifier` — Lightweight variant that takes a single photo and returns `{type, confidence}`. Used by FM1 for the pre-pipeline gate (it must run before any expensive work). Kept as a separate module rather than folded into `room-dna-extractor` because the latency and cost profiles differ — it must complete in roughly one second.
- `recommendation-generator` — Takes `RoomDNA` plus `Intake` plus a `tier` parameter (`aspirational` or `doable`) and returns a `Recommendation`. Single module parameterized by tier; the prompt structure differs per tier but the surrounding orchestration is identical. Encapsulates the load-bearing prompt engineering.
- `product-matcher` — Takes a `DesiredDNA` (categories of changes the recommendation calls for) plus a `BudgetBucket` and returns `CatalogItem[]` that satisfy both constraints. Pure function over the catalog. This is the core "stunning but doable" magic — a poor matcher will silently degrade output quality.
- `image-renderer` — Wraps the chosen image-generation vendor (see ADR-0006) behind a vendor-agnostic interface: `generate(basePhoto, prompt, params) -> Image`. Required so that future vendor swaps are a one-day implementation change rather than a quarter of work — see ADR-0003.
- `pdf-exporter` — Takes a `SessionResult` and produces a downloadable PDF blob.

**Coordination / shallow modules**:

- `session-orchestrator` — Drives the end-to-end flow per request: receive photos → run room-type-classifier (FM1 gate) → on continue, run room-dna-extractor → receive intake → run recommendation-generator twice (aspirational + doable) → for doable, run product-matcher → for both, run image-renderer → assemble session result → stream to frontend. Stateful per session (re-roll counts, photos, intake answers). Selection of the "main photo" for image generation also lives here as a small inline step (folded from the original `main-photo-selector` because it's a one-shot vision call without enough complexity to deserve a module).
- `pwa-frontend` — The mobile-first PWA implementing the screens documented in [v1-user-flow.md](v1-user-flow.md). Image upload, intake form, scroll-with-progressive-reveal result layout, re-roll triggers, PDF download. Framework choice (React, Svelte, etc.) deferred to engineering.

**Storage**:

- `catalog-store` — Holds the ~200-item curated catalog. Each item carries its SKU, name, retailer, retailer URL (with affiliate ID), CDN-hotlinked image URL, AUD price, dimensions, category, and DNA tags. Read-mostly during user sessions, write-heavy during curation. SQLite at v1 (file-based, simple to operate); migration to Postgres deferred until concurrent admin writes become a real need. Affiliate-link wrapping (URL parameter injection) lives here, not in a separate module.

### Module interfaces (API contracts)

Stable across implementations; the *shape* of the contract is part of the architecture.

- `room-dna-extractor.extract(photos: Image[]) -> RoomDNA`
- `room-type-classifier.classify(photo: Image) -> { type: RoomType, confidence: number }`
- `recommendation-generator.generate(roomDNA: RoomDNA, intake: Intake, tier: 'aspirational' | 'doable') -> Recommendation`
- `product-matcher.match(desiredDNA: DesiredDNA, budget: BudgetBucket) -> CatalogItem[]`
- `image-renderer.generate(basePhoto: Image, prompt: string, params: RenderParams) -> Image`
- `pdf-exporter.export(session: SessionResult) -> Blob`
- `catalog-store.queryByDNA(criteria: DNACriteria, budget: BudgetBucket) -> CatalogItem[]`

### Schema sketches

`RoomDNA` retains the shape proven in the PoC (`roomvibe_poc.py`): `room_type`, `room_type_confidence`, `estimated_sqm`, `observed_issues[]`, `mood_suggestion`, `dna { natural_light, ceiling_height, style_tags, key_materials, dominant_colour, spatial_tactics }`, `confidence`. Field-level refinements expected during build but the shape is stable.

`Intake` is a three-field record: `{ mood: 'cosy' | 'sharp' | 'calm' | 'fresh', priority: 'better_light' | 'more_storage' | 'less_clutter' | 'more_inviting', budget: '500-1500' | '1500-5000' | '5000+' }`. Adaptive defaults at the UI layer per ADR-0004 (`calm` / `more_inviting` / `1500-5000`).

`CatalogItem` carries: `sku`, `name`, `retailer: 'ikea' | 'bunnings'`, `retailer_url` (with affiliate parameters), `image_url` (CDN-hotlinked), `price_aud`, `dimensions { w, d, h }`, `category` (from the unified `category taxonomy` per CONTEXT.md), and `dna { style_tags[], materials[], dominant_colour, mood, suitable_rooms[] }` (same shape as room DNA, applied to a product).

`Recommendation` differs slightly per tier. Both share `style_direction`, `prose_summary`, `change_bullets[]`, `after_image_url`. Doable additionally carries `items: CatalogItem[]` and `total_aud_rounded` plus `budget_bucket_reference`.

`SessionResult` is the assembled output streamed to the frontend: `{ session_id, room_dna, intake, recommendations: [aspirational, doable], reroll_counts }`.

### Architectural decisions

- **Frontend platform**: PWA, mobile-first. Service worker for "add to home screen" prompt and offline shell. Single codebase; framework choice (React / Svelte / Vue) deferred to engineering with no architectural preference at PRD time.
- **Backend shape**: stateless API server hosting the orchestrator and module interfaces. Session state lives in a server-side store keyed by session ID, expiring after a short TTL (working: 24 hours). Language choice deferred.
- **Vision vendor**: See ADR-0006. Used by `room-dna-extractor`, `room-type-classifier`, and offline by the catalog-curation pipeline to auto-tag product images.
- **Image-generation vendor**: See ADR-0006. Accessed via a hosting partner (engineering's call based on latency and pricing). Behind `image-renderer` abstraction to support future A/B tests.
- **Catalog storage**: SQLite at v1. ~200 items, read-mostly during user sessions, refreshed monthly via the curation workflow.
- **Image hosting**: product images hotlinked from retailer CDNs (IKEA's `images.ikea.com` is stable; Bunnings less so — fall back to a cached copy on our object storage if hotlinking breaks). After-images stored on our object storage, served via CDN.
- **Affiliate**: IKEA AU affiliate program signup required before launch. Tracking parameters injected by `catalog-store` when serving URLs. Affiliate disclosure copy lives in the doable tier per ADR-0003.

### Specific interactions

- **FM1 timing**: `room-type-classifier` runs on the *first* photo as soon as it loads on Screen 2 — before the user even taps "Continue". If unsupported, the modal blocks before intake. This budget allocation (~$0.001 to refuse early) is deliberate per ADR-0004.
- **Generation order on Screen 4**: aspirational and doable both kick off after intake is submitted. They render in parallel where possible, but the frontend's progressive reveal always shows aspirational first as the hero — even if doable happens to finish slightly earlier, doable waits its turn at the lower scroll position. This preserves the WOW-first experience per ADR-0003.
- **Re-roll**: server-side rate limit of 3 per recommendation per session. Counter stored in session state. When the cap is hit, the frontend morphs the re-roll button into "Try a fresh take →" which routes back to intake with photos retained but counts reset (effectively starting a new session).
- **Mid-session intake editing** (FM4 "widen budget"): re-running just the doable tier with a different budget is supported — does not consume a re-roll, does not reset other state. Engineering note: this is a separate code path from re-roll; needs care to not double-count against caps.
- **Photo override** (Q13): the auto-picked main photo can be overridden from the result screen. Override triggers a re-roll on whichever tier the user is viewing, with the new base photo. Counts against the re-roll cap.

## Testing Decisions

### What makes a good test

- **External behavior, not implementation details.** A test that asserts "the function returns a JSON object with these keys" is good; a test that asserts "the function calls Claude with this exact prompt string" is bad — prompts will iterate continuously and shouldn't break tests.
- **Mock vendor APIs at the test boundary.** Anthropic, FLUX Kontext, and any other paid API should be mocked in unit tests to keep them fast and deterministic. A nightly integration test suite exercises the real vendors against fixed fixtures to catch contract regressions.
- **Mock vendor APIs at the test boundary.** The selected vision and image generation vendors (see ADR-0006) and any other paid API should be mocked in unit tests to keep them fast and deterministic. A nightly integration test suite exercises the real vendors against fixed fixtures to catch contract regressions.
- **Use fixture data for golden-file comparisons.** Two sample bedroom photos already exist in the repo; these become the seed fixtures.
- **Pin shapes, not strings.** Output JSON should be validated against schemas (or TypeScript types) — content-level assertions should be limited to non-prose fields (numbers, enums, presence/absence of keys).

### Modules with prescribed test coverage at v1

1. **`room-dna-extractor`** — Golden-file tests over fixture room photos. Verify shape conformance, presence of all required keys, sensible value ranges (confidence 0–1, room_type in enum). Mock the Anthropic call; record-and-replay an actual Claude response as the golden file.
2. **`product-matcher`** — Table-driven tests over a small fixture catalog (~10 items). Cover: happy match, FM4 (impossible budget — should return partial set with a flag), category-gap edge cases (no rug exists in catalog), mood/style filtering, no-result fallback path.
1. **`room-dna-extractor`** — Golden-file tests over fixture room photos. Verify shape conformance, presence of all required keys, sensible value ranges (confidence 0–1, room_type in enum). Mock the vision vendor call; record-and-replay an actual response as the golden file.
2. **`product-matcher`** — Table-driven tests over a small fixture catalog (~10 items). Cover: happy match, FM4 (impossible budget — should return partial set with a flag), category-gap edge cases (no rug exists in catalog), mood/style filtering, no-result fallback path.
3. **`image-renderer`** — Interface-contract tests with a mocked vendor. Verify the contract holds (input shape, output shape, error shape) when a stub vendor is swapped in. This is the test that protects future A/B tests.
4. **`recommendation-generator`** — Light pinning tests over fixture intakes; verify shape, length of `change_bullets`, presence of `style_direction` and `after_image_prompt` (the prompt handed to image-renderer). Don't assert specific copy.
5. **`pdf-exporter`** — Snapshot tests over a fixture `SessionResult`. Verify PDF metadata (page count, fixed elements like header/footer) without asserting visual fidelity pixel-by-pixel.

### Modules NOT prescribed unit tests at v1

- **`session-orchestrator`** — One integration test covering the full happy path (upload → classify → DNA → intake → both recs → result). Granular orchestrator tests over-couple to the workflow's internal sequence and have low leverage.
- **`pwa-frontend`** — Human review until UI stabilizes. End-to-end Playwright tests deferred to v1.5 once the UI isn't churning.
- **`catalog-store`** — CRUD operations are simple enough to be exercised via the curation workflow itself. Manual verification at v1.
- **`room-type-classifier`** — Folds into `room-dna-extractor`'s test suite; the type/confidence output is a strict subset of the DNA fields.

### Prior art

This is a greenfield codebase — the PoC is a smoke test, not production code. There is no test infrastructure to inherit. Recommend establishing the test framework as part of the first module built, which is most naturally `room-dna-extractor` (since it's a refactor of the PoC's existing logic). The patterns set there will inform the rest.

## Out of Scope

Documented across the ADRs and reproduced here for one-stop reference:

### Hard out of scope at v1

- **Room types other than bedroom and living room.** Bathroom, kitchen, office, outdoor explicitly refused at the FM1 gate. Per ADR-0002.
- **Spatial accuracy of suggestions** ("does this couch fit on this wall"). The L2 floor in ADR-0001 commits us to *semantic* feasibility only — we do not promise that any specific suggestion will physically fit the room.
- **Major structural changes detailed at a buildable level**. The aspirational tier may *mention* designer drywall or structural changes in prose, but does not specify dimensions, locations, costs, or any spatially-grounded detail.
- **Inspiration corpus / curated reference image bank** (M3.5 paths). v1 uses foundation-model knowledge only (M3). Synthetic-corpus M3.5-synth is scheduled for v1.5; scraped M3.5-scrape is rejected outright.
- **Labour cost estimates**. No "$200–500 for assembly" or similar. The "talk to a builder" affiliate handoff is the v1.5 mechanism for getting the user real labour numbers.
- **"Talk to a builder" affiliate CTA**. Deferred to v1.5 — needs partnership, legal copy, tracking infrastructure.
- **Native share sheet**. Deferred to v1.1 fast-follow once share-card visual treatment is designed properly.
- **Native iOS / Android apps**. PWA only at v1.
- **User accounts, authentication, persistent projects**. Sessions are ephemeral. PDF export is the takeaway. v2+ for accounts.
- **Multi-room or whole-house projects**. Single room per session.
- **International markets**. AU only. AUD only.
- **Catalog beyond ~200 items**.
- **Paid re-rolls**. v1 caps free re-rolls at 3; redirect to fresh-intake when exhausted. Paid re-rolls are a v1.1 monetization candidate.
- **User-selectable specific style names** ("japandi", "scandi"). The user steers via *mood* (cosy / sharp / calm / fresh); the model picks the specific style direction.

### Out of scope for the PRD itself (but real questions for the team)

- Pricing model for the app (free / freemium / subscription / per-room).
- Privacy and image retention policy. Photos of homes are sensitive — needs a clear stance before launch.
- Distribution channels (just the web URL at v1, but App Store / Play Store paths for v1.5+).
- Brand / product naming. Currently "RoomVibe" in the PoC — open to change.
- Visual design, copy polish, motion choreography. The user flow is locked; the look-and-feel is the designer's canvas.
- Engineering plan: specific tech stack, hosting provider, observability stack, CI/CD shape. Deferred to a separate engineering planning pass.
- Specific catalog content (which 200 items). Curation work to do before launch.
- iOS Safari PWA quirks (add-to-home-screen prompt copy, capture quality fallbacks).

## Further Notes

- **The PoC at `roomvibe_poc.py` is a smoke test for Claude Vision API access**, not a design constraint. Its specific JSON shape, Australian framing in prompts, and `room_type` enum are pre-grill artefacts. Engineering should refactor freely; the only thing to preserve is the working API call pattern.
- **The PoC at `roomvibe_poc.py` is a smoke test for the vision vendor's API access**, not a design constraint. Its specific JSON shape, Australian framing in prompts, and `room_type` enum are pre-grill artefacts. Engineering should refactor freely; the only thing to preserve is the working API call pattern.
- **All v1 design decisions are captured in the ADRs**. Any decision the engineering team would change should be captured as a superseding ADR — don't quietly diverge.
- **"Stunning but doable" is the load-bearing tagline** and a useful test for any product decision: does this make the result more *stunning*? More *doable*? Or does it dilute one for the other? If neither, reconsider.
- **v1.5 roadmap items already mentally allocated** (not commitments, but the natural next moves):
  - Synthetic inspiration corpus (M3.5-synth) — pre-generate stunning rooms with the selected image generation vendor, run them through `room-dna-extractor` to build a curated DNA library, condition `recommendation-generator` on observed-good combinations.
  - Native share sheet with a designed share-card.
  - Hero-plus-tabs UI evolution if data shows comparison is the dominant action.
  - Broader catalog (more items, possibly Google Shopping API supplement).
  - "Talk to a builder" affiliate CTA via hipages or similar.
  - Paid re-rolls if free-cap exhaustion proves to be a real funnel problem.
  - Native iOS app if iOS Safari PWA quirks degrade the experience meaningfully.
  - Additional room types: bathroom and home office most likely first.

---

*Generated from the design grilling session captured in [docs/grill-session-state.md](grill-session-state.md). Apply the `ready-for-agent` triage label when this PRD is converted to a tracker issue (run `/to-issues` once a GitHub repo and tracker are configured via `/setup-matt-pocock-skills`).*
