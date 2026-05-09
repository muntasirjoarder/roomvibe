# RoomVibe — Glossary

Terms used by the product, defined precisely so suggestions, prompts, and copy stay aligned. Domain-facing only — no implementation detail.

## logical

The accuracy floor every v1 suggestion must clear: **semantic feasibility**. A suggestion is logical if it makes sense for the room's *type* and *use* — no bathtub in a home office, no desk facing a glare source, no wardrobe blocking the only outlet.

What "logical" does **not** promise at v1:

- **Spatial accuracy** ("will this 2.4m couch fit on this 2m wall") is explicitly out of scope. Photos are uncalibrated; we don't claim measurement-grade reasoning.
- **Buildability** ("can this drywall actually go here per local code") is the builder's job, not the app's.

What "logical" implicitly includes:

- **Aesthetic coherence** — suggestions don't mix incompatible styles (industrial concrete with hamptons wicker). Falls out of competent generation; no separate validation layer needed for v1.

## recommendation

A single design direction for the user's room. v1 produces **two recommendations per session** — *aspirational* and *doable* — intended to be browsed and compared, not merged. The two share a single style direction; they differ along an **ambition axis** (see *ambition tier*). Each recommendation contains:

- An after-image (the WOW)
- A bullet list of changes
- A feasibility tag per change (see *feasibility tier*)

The two-tier choice is deliberate: it maps directly to the *"stunning but doable"* tagline. A "mid" tier was considered and rejected — it had no clear definition (neither structural-permitted nor catalog-anchored) and weakened the story. The discontinuity between aspirational and doable is bridged interactively via *re-roll*, not statically via a middle tier.

## ambition tier

The axis the two recommendations span. Working names (final product copy TBD):

- **Aspirational** — the unconstrained dream. May include `needs builder` items (designer drywall, structural reframing). Hero of the session — shown first, fills the first viewport, biggest visual.
- **Doable** — fully product-anchored: every item is a real SKU at a real retailer (IKEA AU + Bunnings) with a real price (see *doable recommendation*). May feel less stunning than aspirational; the trade is honesty about reachability.

Both target the same *style* — the user is comparing how far to go, not which aesthetic to choose.

## DNA

A structured JSON descriptor of a room's design fingerprint — style tags, key materials, dominant colour, lighting, ceiling, spatial tactics. The shape is a domain artefact (used by prompts, retrieval, and copy), not a transient API contract.

Two flavours, same shape:

- **Room DNA** — extracted from a *user's* uploaded photos. Captures the current state of their actual room.
- **Inspiration DNA** — extracted from *stunning reference projects* (curated/synthetic library). Captures patterns that have been observed to work.

v1 uses room DNA only. Inspiration DNA is a v1.5 capability that lets the suggestion pipeline anchor recommendations to *observed* combinations rather than model-invented ones (see ADR-0002).

## category taxonomy

A single shared taxonomy of item categories (`low-platform bed`, `wall sconce`, `natural-fibre rug`, `accent paint`, …) used by **every** ingestion stream and **every** matching step:

- Inspiration DNA tags items it observes in stunning rooms with these categories.
- Product DNA tags catalog items with these categories.
- Recommendations specify desired changes in these categories.

This is what makes the matcher symmetric — *room DNA → desired DNA → product DNA* is a JSON-shape comparison across one taxonomy, not three separate retrieval systems. Adding a new category requires updating the taxonomy in one place.

## v1 room types

v1 supports **bedroom** and **living room** only. Other room types are detected (room_type classifier output) but the user is told *before upload completes* that they're not yet supported. Bathroom, kitchen, office, outdoor are explicitly out of scope for v1 — see ADR-0002.

## session

A single user encounter with the app: photos in, three recommendations out, user iterates and exports. **Sessions are ephemeral at v1** — no persistence between visits. Within a session the state lives until the browser tab closes; users get a "save as PDF / share" export to convert the ephemeral session into a takeaway.

## intake

The three multiple-choice questions asked alongside photo upload. Working set:

- **Budget cap** — drives catalogue filtering for the doable tier. Buckets TBD (likely `$500-1500 / $1500-5000 / $5000+` for AU, room-type-aware).
- **Mood steering** — `cosy / sharp / calm / fresh`. Steers the style direction without making users learn designer vocabulary.
- **Priority** — `better light / more storage / less clutter / more inviting`. Tells the model what problem to lead with in suggestions.

Intake should take ~30 seconds. No free-text input at v1.

## re-roll

User-initiated regeneration of a *single* recommendation. Costs roughly one-third of a fresh session. Rate-limited per session (working cap: 3 re-rolls per recommendation) so unit economics don't rot when users are picky.

## doable recommendation

One of the two recommendations per session is **doable**: every item it suggests is anchored to a real product from a real retailer the user can actually buy from, with a price. The doable recommendation may be visually less stunning than aspirational, but the gap between image and reality is small. Aspirational, by contrast, is prose-only — no SKUs, no prices.

## doable total

The summed cost of catalog items in the doable recommendation. Rules:

- **Per-item price**: show the exact catalog price — it's a fact.
- **Total**: round to the nearest $50 or $100 (e.g., $1,180 → "~$1,200"). The exact sum looks artificially precise — we don't know shipping/taxes/sales/in-store-only-discounts.
- **Footer**: *"Plus delivery, assembly, and any paint/install extras as needed."* Sets expectations honestly.
- **Budget context**: reference the intake budget bucket — *"~$1,200 (within your $500-1,500 budget)"* — so the total feels respected, not arbitrary.
- **No labour estimates at v1.** Trade rates vary 3x by city/contractor; a ranged estimate would be uninformative noise. v1.5's "talk to a builder" CTA is the honest handoff.

## no prices on aspirational

The aspirational tier shows zero prices at v1 — no per-item, no total, no range. It's a vision, not a quote. Adding speculative prices to prose-only items would be dishonest about what we know and would erode trust in the doable tier's prices, which *are* accurate. Reinforces the two-tier identity: aspirational = feel this (uncosted), doable = do this (costed).

## stunning but doable

The product promise. The user gets aspirational and reachable in the same session, side-by-side, without having to choose between "inspired but defeated" and "practical but bored."

## feasibility tier

A tag attached to each suggested change indicating *what kind of effort it requires*. Working set: `easy weekend` (DIY, no tools beyond a screwdriver) | `needs handyman` (a few hours of paid help) | `needs builder` (trades, permits, possibly structural). Used in suggestion bullets and as an honesty signal alongside the after-image. A doable recommendation contains only `easy weekend` and `needs handyman` items.
