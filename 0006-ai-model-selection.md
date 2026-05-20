# ADR-0006: AI Model Selection

This ADR centralizes the selection of specific AI vendors and models for v1, abstracting them from the core product and engineering documents. This allows for easier swapping of models and vendors in the future.

## Decisions

### Vision & Reasoning Vendor: Anthropic

For tasks requiring vision analysis and structured data extraction (e.g., `room-dna-extractor`) and for complex reasoning/planning tasks, the v1 implementation will use models from the **Anthropic Claude 3 family**.

### Image Generation Vendor: FLUX

For generative image tasks (e.g., `image-renderer`), the v1 implementation will use **FLUX Kontext**. The PRD and `image-renderer` module are designed to abstract this choice, with a planned v1.1 A/B test against other models.

### Model Usage Strategy: Plan-then-Execute

To balance cost and capability, we employ a **plan-then-execute** pattern. A more powerful, expensive model authors a detailed plan, and a cheaper, faster model executes it.

-   **Planning Model**: A capable model responsible for creating detailed specifications, API designs, and test plans. For v1, this is **Sonnet**.
-   **Execution Model**: A fast, cost-effective model responsible for writing code against the detailed plan. For v1, this is **Haiku**.
-   **Specialist Model**: The most powerful model, reserved for tasks with high ambiguity or where the output is a critical, load-bearing artifact itself (e.g., prompt engineering). For v1, this is **Opus**.

The discipline: **planning artifacts must leave no judgment gaps.** A good plan contains:

1.  Exact interface signatures
2.  Prompt templates verbatim
3.  Enumerated test cases
4.  File-level decisions
5.  Pinned failure-mode behaviour

### Per-Issue Model Allocation

The following table maps each engineering issue to the selected model for its planning and execution phases.

| Issue | Plan | Execute | Notes |
|---|---|---|---|
| #1 Walking skeleton | (done w/ Sonnet) | (done) | Shipped |
| #2 Room DNA + FM1 | **Opus** | Haiku | Opus authors prompt templates + classifier strategy + golden-test plan. This is a specialist task. |
| #3 Intake screen | — | Haiku | `DESIGN.md` + `ADR-0004` are sufficient guidance. |
| #4 Aspirational tier + image-renderer | **Sonnet** | Haiku | Sonnet designs the renderer abstraction. |
| #5 Catalog + product-matcher | **Sonnet** | Haiku | Sonnet specs matcher + FM4 partial-result + test matrix. |
| #6 Doable after-image | — | Haiku | Re-uses #4's plan. |
| #7 Re-roll + rate limit | — | Haiku | Standard pattern. |
| #8 Save-as-PDF | — | Haiku | Library glue. |
| #9 Failure modes (FM2-FM5) | **Sonnet** | Haiku | Sonnet specs the FM state machine + cap-counting rules. |
| #10 Photo override | — | Haiku | Re-uses #4 + #7 plans. |
| #11 Catalog + auto-tag | — | Haiku | Auto-tag re-uses #2 extractor. |
| #12 Affiliate | — | Haiku | Trivial URL wrapping. |
| #13 PWA polish | **Sonnet** | Haiku | Sonnet authors iOS Safari quirks + Lighthouse remediation plan. |
| #14 DESIGN.md | **Sonnet** | Haiku | Sonnet authors `DESIGN.md`; Haiku refactors screens to use it. |

### Mid-issue Escalation

The process for escalating from a cheaper to a more expensive model mid-task remains as defined in the engineering stack ADR.

1.  Multiple test failures with no clear root cause → bump up.
2.  Generated code compiles but feels off (judgment gap) → bump up.
3.  Architectural decision emerges that wasn't in the issue brief → bump up.
4.  Same misunderstanding corrected 3+ times → wrong model for this work → bump up.