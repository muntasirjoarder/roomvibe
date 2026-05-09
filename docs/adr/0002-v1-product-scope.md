# v1 product scope: tagline, tiers, geography, retailers, corpus, catalog, rooms

The v1 product is **"stunning but doable"**: a room photo in, three design recommendations out — one of them anchored to real, buyable products with prices. This ADR bundles the scope decisions that fall out of that promise, recorded together because they're tightly coupled and re-litigating one usually re-opens the others.

## Decisions

- **Two recommendations per session, varying along an ambition axis** (`aspirational` / `doable`). Both share one style direction; users compare *how far to go*, not *which aesthetic*. The two-tier shape maps directly to the *"stunning but doable"* tagline. A `mid` tier was initially considered and rejected: no clear definition (neither structural-permitted nor catalog-anchored), weakened the story, added 33% to per-session cost and latency for unclear value. The aspirational↔doable gap is bridged interactively via *re-roll*. Also rejected: style-flavour axis (forces aesthetic + reachability into one choice), price-tier axis (precision trap on cost claims), problem-framing axis (orthogonal to a doable tier).
- **AU-only at v1.** Australian residential conventions, AUD pricing, AU retailer catalogue. Rejected international-with-locales because catalog integration is the hardest engineering dependency and solving it once is hard enough.
- **Catalogue retailers: IKEA AU and Bunnings.** IKEA covers furniture/storage/textiles where the doable tier is most visible; Bunnings covers paint/lighting/hardware/finishing. Rejected Bunnings-only (catalog gap on furniture); rejected adding more retailers at v1 (each is its own integration project).
- **Corpus mechanism: M3 — foundation-model knowledge only.** No inspiration corpus is built or ingested at v1. The model's pretraining carries the "stunning" vocabulary; prompts surface it. Considered M3.5-synth (synthetic stunning rooms run through a DNA extractor — clean rights story, real differentiation) — scheduled for **v1.5**. Rejected M1 (fine-tuning, research project), M2 (RAG over scraped images, legal exposure), M3.5-scrape (scraped Houzz/Pinterest, same legal exposure with extra brittleness).
- **Catalog acquisition: C2 — manual curation, ~200 items at v1.** A human picks items, captures URL/SKU/price/dimensions, hotlinks images from the retailer CDN. Item-level *tagging* is auto-extracted by re-running the room-DNA prompt against the product image (symmetric pipeline). Rejected scraping (legal/brittle), rejected Google Shopping API (premature integration friction), rejected hybrid (v1.5 evolution).
- **Rooms in v1: bedroom and living room only.** Aesthetic-renovation dominant, photographs cleanly, IKEA-rich. Rejected bathroom (small/mirrored/harsh-light photos, narrow doable scope), kitchen (structural complexity violates L2 floor), office (smaller market, v1.1 candidate), outdoor (different visual problem).

## Why this bundle is one ADR

These decisions were made one by one in a grilling session, but they're load-bearing on each other. Removing AU-only changes the catalog story. Removing the doable tier kills the catalog requirement. Pulling M3.5-scrape into v1 reopens the corpus question. The future reader who wonders "why are we AU-only?" is the same reader who wonders "why only IKEA + Bunnings?" — they need to find the rationale together.

## Consequences

- The pipeline is **symmetric** — same DNA shape for user rooms, inspiration references (when added in v1.5), and catalog products. The matcher is JSON-shape comparison, not three separate retrieval systems. See *category taxonomy* in CONTEXT.md.
- v1 cannot honestly say it's "trained on a curated corpus of stunning rooms" — that promise is delivered by the foundation model, and is true at the foundation-model layer. v1.5 unlocks "trained on our curated corpus" copy honestly.
- Unsupported room types (bathroom, kitchen, etc.) need to be detected and refused *before* the user invests in upload + analysis. Honest pre-upload copy beats post-analysis apology.
- Catalog freshness has a human in the loop. At ~200 items, this is fine (IKEA core-line price drift is months, not days). It becomes a problem somewhere around 1000+ items, which is a v2 problem.
