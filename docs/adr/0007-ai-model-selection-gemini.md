# ADR-0007: AI Model Selection (Gemini Alternative)

This ADR documents an alternative AI model selection strategy for v1, using Google's Gemini models. It is a parallel to ADR-0006 and can be swapped in to change the underlying AI vendor.

## Decisions

### Vision & Reasoning Vendor: Google

For tasks requiring vision analysis and structured data extraction (e.g., `room-dna-extractor`) and for complex reasoning/planning tasks, this alternative implementation will use models from the **Google Gemini family**.

### Image Generation Vendor: Google

For generative image tasks (e.g., `image-renderer`), this alternative implementation will use **Google Imagen 3**. The PRD and `image-renderer` module are designed to abstract this choice, allowing for A/B tests against other models.

### Model Usage Strategy: Plan-then-Execute

To balance cost and capability, we employ a **plan-then-execute** pattern. A more powerful, expensive model authors a detailed plan, and a cheaper, faster model executes it.

-   **Planning Model**: A capable model responsible for creating detailed specifications, API designs, and test plans. For this alternative, this is **Gemini 1.5 Pro**.
-   **Execution Model**: A fast, cost-effective model responsible for writing code against the detailed plan. For this alternative, this is **Gemini 1.5 Flash**.
-   **Specialist Model**: The most powerful model, reserved for tasks with high ambiguity or where the output is a critical, load-bearing artifact itself (e.g., prompt engineering). For this alternative, this is **Gemini 1.5 Pro**.

The discipline: **planning artifacts must leave no judgment gaps.** A good plan contains:

1.  Exact interface signatures
2.  Prompt templates verbatim
3.  Enumerated test cases
4.  File-level decisions
5.  Pinned failure-mode behaviour

### Per-Issue Model Allocation

The following table maps each engineering issue to the selected model for its planning and execution phases under this Gemini-based strategy.

| Issue | Plan | Execute | Notes |
|---|---|---|---|
| #1 Walking skeleton | (done w/ Gemini 1.5 Pro) | (done) | Shipped |
| #2 Room DNA + FM1 | **Gemini 1.5 Pro** | Gemini 1.5 Flash | Gemini 1.5 Pro authors prompt templates + classifier strategy + golden-test plan. This is a specialist task. |
| #3 Intake screen | — | Gemini 1.5 Flash | `DESIGN.md` + `ADR-0004` are sufficient guidance. |
| #4 Aspirational tier + image-renderer | **Gemini 1.5 Pro** | Gemini 1.5 Flash | Gemini 1.5 Pro designs the renderer abstraction. |
| #5 Catalog + product-matcher | **Gemini 1.5 Pro** | Gemini 1.5 Flash | Gemini 1.5 Pro specs matcher + FM4 partial-result + test matrix. |
| #6 Doable after-image | — | Gemini 1.5 Flash | Re-uses #4's plan. |
| #7 Re-roll + rate limit | — | Gemini 1.5 Flash | Standard pattern. |
| #8 Save-as-PDF | — | Gemini 1.5 Flash | Library glue. |
| #9 Failure modes (FM2-FM5) | **Gemini 1.5 Pro** | Gemini 1.5 Flash | Gemini 1.5 Pro specs the FM state machine + cap-counting rules. |
| #10 Photo override | — | Gemini 1.5 Flash | Re-uses #4 + #7 plans. |
| #11 Catalog + auto-tag | — | Gemini 1.5 Flash | Auto-tag re-uses #2 extractor. |
| #12 Affiliate | — | Gemini 1.5 Flash | Trivial URL wrapping. |
| #13 PWA polish | **Gemini 1.5 Pro** | Gemini 1.5 Flash | Gemini 1.5 Pro authors iOS Safari quirks + Lighthouse remediation plan. |
| #14 DESIGN.md | **Gemini 1.5 Pro** | Gemini 1.5 Flash | Gemini 1.5 Pro authors `DESIGN.md`; Gemini 1.5 Flash refactors screens to use it. |

### Mid-issue Escalation

The process for escalating from a cheaper to a more expensive model mid-task remains as defined in the engineering stack ADR.

1.  Multiple test failures with no clear root cause → bump up.
2.  Generated code compiles but feels off (judgment gap) → bump up.
3.  Architectural decision emerges that wasn't in the issue brief → bump up.
4.  Same misunderstanding corrected 3+ times → wrong model for this work → bump up.