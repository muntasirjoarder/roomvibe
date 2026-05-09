# v1 user flow

The end-to-end PWA experience, screen-by-screen. Operationalises the decisions in ADR-0001, ADR-0002, ADR-0003, and the failure-mode handling captured in ADR-0004 (when written).

This is the *shape*; visual design, copy polish, and motion are downstream of this and out of scope for the grill.

---

## Screen 1 — Landing

- Logo + tagline: *"Stunning but doable"*
- Teaser: *"Upload your room. Get two redesigns — one to dream about, one you can actually do."*
- Single CTA: **Redesign my room**

## Screen 2 — Upload

- Header: *"Upload your room"*
- Subtitle: *"Up to 3 photos. Different angles work best — wide shots beat close-ups."*
- Camera + gallery affordance (PWA capture APIs).
- Photos appear as thumbnails as they load.
- **Continue** button — disabled until at least one photo loaded.
- *Background:* room-type classifier runs on the first photo as soon as it lands (FM1 pre-check, ~$0.001). Silent unless it triggers Screen 2a.

### Screen 2a — Room not supported (FM1, conditional)

- Modal: *"We currently support bedrooms and living rooms. Bathroom support coming soon. [Try a different room]"*
- Clears photos, returns to Screen 2.

## Screen 3 — Intake

Single screen, three multiple-choice questions, all with adaptive-default pre-selection (R3). No skip path. Aesthetic-before-practical ordering.

- Header: *"Tell us a little about your space"*
- Subtitle: *"This helps us make the redesign yours."*

| Question | Options | Default |
|---|---|---|
| Mood | Cosy / Sharp / Calm / Fresh | **Calm** |
| Focus on | Better light / More storage / Less clutter / More inviting | **More inviting** |
| Budget | $500-1,500 / $1,500-5,000 / $5,000+ | **$1,500-5,000** |

- **Generate** CTA at bottom.

## Screen 4 — Result

Single scrolling screen, progressive reveal so render latency feels like anticipation rather than dead time.

1. Initial loading: *"Designing your space..."* (~5-15s while room DNA extracts and first image generation starts).
2. **Aspirational hero** appears as it renders (~10-20s):
   - Full-width after-image
   - 3-5 prose bullets
   - No prices, no buy links
   - ♻ Re-roll affordance
3. Skeleton below: *"Working on the doable version..."*
4. **Doable section** scrolls in below as it renders (~10-20s after aspirational):
   - After-image (smaller than aspirational hero)
   - Item cards stacked: thumbnail + name + exact price + Buy-at-IKEA / Buy-at-Bunnings link
   - **Total** (rounded): *"~$1,200 (within your $1,500-5,000 budget)"*
   - Footnote: *"Plus delivery, assembly, and any paint/install extras as needed."*
   - ♻ Re-roll affordance
5. Footer: **📄 Save as PDF** CTA.

### Screen 4a — Mixed-use override (FM2, conditional)

If the room was classified as mixed-use (bedroom + workspace, living + dining), an inline banner appears above the hero:

*"Treating this as a bedroom — was it primarily a workspace? [Switch]"*

One-tap switch re-runs both recommendations under the corrected room type.

### Screen 4b — Low-confidence tip (FM3, conditional)

If room DNA confidence is below threshold (working: 0.65), a gentle inline tip appears alongside the result — not blocking, not apologising:

*"Tip: a wider, brighter photo will give sharper results next time."*

The result is still produced, just with conservatively-tuned prompts.

## Screen 5 — Re-roll exhaustion (FM5, conditional)

After 3 re-rolls on either tier, the re-roll button on that tier morphs into **"Try a fresh take →"**. Tap returns to Screen 3 (intake) with photos retained but re-roll counts reset. New session begins.

## Failure-mode summary

| Failure mode | Where it surfaces | Behaviour |
|---|---|---|
| FM1 — Unsupported room type | Screen 2a (pre-pipeline) | Refuse with friendly modal, don't burn DNA + image-gen |
| FM2 — Mixed-use room | Screen 4a (post-result) | Auto-pick dominant function, surface override |
| FM3 — Low DNA confidence | Screen 4b (alongside result) | Proceed with conservative prompts, tip for next time |
| FM4 — Budget impossible | Inline in doable section | Show what fits, flag what didn't, offer "widen budget?" link to re-intake |
| FM5 — Re-roll exhaustion | Screen 5 (post-cap) | Redirect to fresh-intake; no upsell at v1 |

## Open UX decisions outside the grill

These are real questions that will need answering during build, but they are *design* and *engineering* decisions, not architecture:

- Visual treatment of the "♻ Re-roll" affordance (button vs floating action vs swipe gesture)
- Animation choreography of the progressive reveal
- The exact copy of intake questions and CTAs (this doc uses working copy)
- The mixed-use override banner styling (banner vs toast vs modal)
- PDF export layout (header/footer, item table styling, branding)
- Empty/error states for image generation API failures
- iOS Safari PWA quirks (add-to-home-screen prompt, capture quality)
