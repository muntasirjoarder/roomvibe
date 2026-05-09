# Semantic accuracy is the v1 floor; spatial accuracy is not promised

The product needs to feel "logical" but the spec ("may not need to be super perfect") gives permission to scope this. We commit to **semantic feasibility** as the v1 floor — suggestions must respect the room's type and use (no bathtub in a home office, no desk facing glare). We explicitly do **not** promise **spatial accuracy** ("does this couch fit on this wall") because reliable dimension reasoning from uncalibrated phone photos is a research problem the well-funded incumbents (Houzz, Modsy) have already conceded. Aesthetic coherence is implicit and falls out of competent generation.

## Considered Options

- **Spatial floor (L1)** — measurements load-bearing, suggestions guaranteed to fit. Rejected: photos are uncalibrated, failures would be visible and trust-destroying on the first wrong call.
- **Semantic floor (L2) — chosen.** Highest trust per dollar; failures are rare and recoverable.
- **Aesthetic-only floor (L3)** — style coherence with no functional checks. Rejected as too thin; semantic mistakes (suggesting a wardrobe in front of an outlet) would feel like the app didn't understand the room.

## Consequences

- The app makes no claim that any specific suggestion will physically fit the user's room.
- Whether "major" changes (drywall, structural) are in scope is **not** settled by this ADR — it's a separate scoping decision that depends on whether v1's primary outcome is buildable (where major needs spatial backing) or aspirational (where major is fine as inspiration).
