# v1 input handling, cost presentation, and failure modes

This ADR captures the input-side and edge-case decisions that complete the v1 design. Bundled because they're all about *how the product gracefully handles the messy reality of user input* rather than the happy path. Read alongside ADR-0001/0002/0003 and the operational flow in `docs/v1-user-flow.md`.

## Decisions

### Multi-photo handling (Q13)

- **Cap: up to 3 photos per session.** Below that hurts DNA quality; above that has diminishing extraction returns and inflates token cost.
- **Auto-pick the main photo (S1).** A vision pre-pass selects the widest-angle, best-lit photo as the base for FLUX Kontext image-conditioning. Other photos inform the DNA but aren't the visual base.
- **One-tap override at result time.** If the auto-pick produced a "wrong angle" feel, the user can switch the base photo from the result screen — triggers a re-roll with the new base. Same UX pattern as FM2's mixed-use override. Don't add intake friction by asking the user upfront.
- Rejected: forcing the user to pick a main photo at upload (S2 — friction at the wrong moment); generating after-images per uploaded photo (S3 — costs scale linearly with upload generosity, wrong incentive).

### Cost presentation (Q14)

- **Per-item prices**: exact catalog prices, displayed as fact.
- **Doable total**: rounded to the nearest $50 or $100 ($1,180 → "~$1,200"). Exact sums look artificially precise — we don't know shipping, tax, sales, in-store-only discounts.
- **Budget reference**: the rounded total references the intake budget bucket — *"~$1,200 (within your $1,500-5,000 budget)"* — closing the loop on intake.
- **Footer**: *"Plus delivery, assembly, and any paint/install extras as needed."* Sets honest expectations.
- **No labour estimates at v1.** Local trade rates vary 3x by city and contractor; a range would be uninformative. v1.5's "talk to a builder" CTA is the honest handoff (deferred per ADR-0003).
- **No prices on aspirational tier at all.** Aspirational is prose-only (M3 — no catalog backing); speculative prices would be model-hallucinated and would erode trust in the doable tier's *real* prices. Reinforces the two-tier identity: aspirational = feel this (uncosted), doable = do this (costed).
- Rejected: F2 (catalog total + ranged labour estimate — adds intake friction with low informational payoff), F3 (single all-in number — classic precision trap).

### Intake required-vs-optional (R3)

- **All three intake questions (mood, priority, budget) use adaptive defaults.** Each has a sensible bucket pre-selected — `Calm` mood, `More inviting` priority, `$1,500-5,000` budget. User can change with one tap; cannot unset.
- This is effectively required without *feeling* like a form. The default announces what we're assuming, so users who skip don't get blindsided by a silent guess.
- Rejected: R1 (true-required with no defaults — three "pick one" walls in a row, feels like an interrogation), R2 (skip path — creates the worst class of user complaint when the silently-defaulted result doesn't match their actual preference).

### Failure modes (Q15)

| Code | Failure | Behaviour |
|---|---|---|
| FM1 | Unsupported room type uploaded (bathroom, kitchen, office, outdoor) | Detect *before* the expensive pipeline runs. Cheap room-type classifier on first photo (~$0.001). Refuse with friendly modal: *"We currently support bedrooms and living rooms — bathroom support coming soon."* Don't burn DNA + image-gen on a room we won't support. |
| FM2 | Mixed-use room (bedroom + workspace, living + dining) | Auto-pick dominant function, proceed normally. One-tap override on result screen: *"Treating this as a bedroom — was it primarily a workspace?"* Same pattern as photo-base override (Q13). |
| FM3 | Low-confidence DNA / cluttered or unclear photo | Don't refuse. Proceed with conservatively-tuned prompts. Surface a gentle inline tip alongside the result: *"Tip: a wider, brighter photo will give sharper results next time."* Result is the teaching moment. |
| FM4 | Budget impossible (chosen budget can't fit needed items) | Show what fits, gently flag what didn't: *"We focused on the 4 most impactful changes within your $500 budget. A sofa swap was out of reach this round — want to widen the budget?"* The link re-runs intake with one number changed. Never refuse outright. |
| FM5 | Re-roll exhaustion (3-roll cap reached on a tier) | Don't grey the button silently. Don't upsell paid re-rolls at v1 (premature commerce). Morph the button into *"Try a fresh take →"* — tap returns to intake with photos retained but counts reset. Free escape valve. Paid re-rolls become a v1.1 monetisation candidate. |

## Why bundled

These five-ish decisions are about input edge-handling and cost honesty — together they define how the product *behaves under stress* rather than how it works in the demo. They're not deeply coupled to ADR-0001/2/3 but they're tightly coupled to each other (e.g., FM4 only makes sense given the R3 budget intake; FM2 reuses the override UX pattern from Q13's photo selection). One ADR is the right granularity.

## Consequences

- The v1 product is *graceful* almost everywhere except FM1. The only hard refusal is "wrong room type" — every other failure produces a usable result with honest framing. This is the right trade for a v1 trying to convert curious users into engaged users.
- The "widen the budget" link on FM4 implies budget changes can re-trigger doable generation alone, not the full session — mid-session intake editing. Engineering needs to support this without blowing through re-roll caps.
- The vision room-type classifier (FM1 pre-check) is now load-bearing infrastructure — needs reliable accuracy on AU-typical room photos. Low confidence on the classifier itself becomes a meta-failure mode worth thinking about during build (probably: graceful "we couldn't tell what room this is — proceed anyway?" path).
- The pre-selected defaults in intake (R3) are a **product copy decision** — picking the wrong defaults will quietly skew the entire user base toward calm/inviting/$3K rooms. These should be A/B-tested post-launch and revised as data comes in.
