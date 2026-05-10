# RoomVibe Design System

> The persistent design contract for RoomVibe v1. Every UI screen built against the visual tokens, components, and rules defined here. If you're an AI agent: read this file before any UI work. Skip to the [For AI agents](#for-ai-agents) section first.

---

## 1. Visual theme

**Stunning but doable.** Editorial warmth meets pragmatic clarity.

The brand sits at the intersection of "magazine you'd flip through on a Sunday morning" and "the friend who actually helps you finish the room." We borrow editorial confidence (typography discipline, image-led layouts, generous whitespace) from publications like *Apartment Therapy* and AU's *The Local Project*, and product clarity (no decoration tax, restrained color use) from Linear and Stripe.

Three commitments:

- **Warm earth-tone palette.** Australian domestic — sun-bleached, tactile, not Scandi-cold. Off-white canvas, terracotta accent, sage success.
- **Image-led, type-disciplined.** Photos are the hero. Type frames them, never competes.
- **Discipline over decoration.** No gradients, no glassmorphism, no neumorphism, no decorative motion. If a screen feels plain, that's the brand working.

---

## 2. Color palette + roles

All colors are warm-leaning. Never pure white, never pure black, never cool gray.

### Tokens (drop into `web/app/globals.css`)

```css
@theme {
  /* Surface */
  --color-canvas: #faf7f2;       /* page background — warm off-white */
  --color-surface: #ffffff;       /* card, modal, elevated content */

  /* Text */
  --color-ink: #1c1917;          /* primary text */
  --color-ink-muted: #57534e;    /* secondary text */
  --color-mute: #78716c;         /* tertiary, captions */

  /* Borders / dividers */
  --color-stone-soft: #e7e5e4;   /* subtle dividers, card borders */
  --color-stone-line: #d6d3d1;   /* stronger borders, inputs */

  /* Brand accent — terracotta */
  --color-clay-50: #fbf1ed;
  --color-clay-100: #f5ddd0;
  --color-clay-300: #e0a28a;
  --color-clay-500: #b1593f;     /* primary CTA */
  --color-clay-600: #94432c;     /* hover */
  --color-clay-700: #783522;     /* pressed */

  /* Success — sage */
  --color-sage-100: #e8ede2;
  --color-sage-500: #7a8b6f;     /* budget-met, success affordances */
}
```

### Color roles (where each color may appear)

| Role | Token | Use |
|---|---|---|
| Page background | `bg-canvas` | `<body>` and full-bleed sections |
| Card surface | `bg-surface` | Cards, modals, popovers |
| Primary text | `text-ink` | Headlines, body copy |
| Secondary text | `text-ink-muted` | Subheadings, sub-labels |
| Tertiary text | `text-mute` | Captions, metadata, timestamps |
| Subtle border | `border-stone-soft` | Card borders, section dividers |
| Strong border | `border-stone-line` | Input borders, button borders |
| Primary CTA | `bg-clay-500 text-canvas` | The single most important action on a screen |
| CTA hover | `hover:bg-clay-600` | Hover state for primary CTAs |
| CTA active | `active:bg-clay-700` | Pressed state for primary CTAs |
| Hover surface | `hover:bg-clay-50` | Subtle hover background on tertiary actions |
| Budget-met / success | `text-sage-500` or `bg-sage-100` | Only for budget-fits affordances |
| Focus ring | `focus:ring-clay-500/20` | Keyboard focus on interactive elements |

**Hard rules:**

- Reserve `clay-500` for **the single primary CTA per screen.** Multiple terracotta CTAs = visual noise.
- `sage-500` only for budget/success affordances. Never for general accent decoration.
- No other color values in components — if a needed color isn't here, propose adding it to this file before using it.

---

## 3. Typography

### Fonts

Two fonts only. No third font is added without updating this file.

- **`Geist`** (sans-serif) — UI, body, all functional text. Loaded via `next/font/google`.
- **`Fraunces`** (variable serif) — Reserved for editorial moments only: hero h1 on Landing, aspirational tier title. Loaded via `next/font/google`.

### Tokens

```css
@theme {
  --font-sans: var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif;
  --font-display: var(--font-fraunces), ui-serif, Georgia, serif;

  /* Type scale (mobile-first, never scale body up on desktop) */
  --text-display: 36px;
  --text-display--line-height: 40px;
  --text-display--letter-spacing: -0.02em;
  --text-display--font-weight: 400;

  --text-title-xl: 30px;
  --text-title-xl--line-height: 36px;
  --text-title-xl--letter-spacing: -0.018em;
  --text-title-xl--font-weight: 600;

  --text-title-lg: 24px;
  --text-title-lg--line-height: 32px;
  --text-title-lg--letter-spacing: -0.015em;
  --text-title-lg--font-weight: 600;

  --text-title: 20px;
  --text-title--line-height: 28px;
  --text-title--letter-spacing: -0.01em;
  --text-title--font-weight: 600;

  --text-body-lg: 18px;
  --text-body-lg--line-height: 28px;

  --text-body: 16px;
  --text-body--line-height: 24px;

  --text-caption: 14px;
  --text-caption--line-height: 20px;

  --text-micro: 12px;
  --text-micro--line-height: 16px;
  --text-micro--font-weight: 500;
  --text-micro--letter-spacing: 0.04em;
}
```

### Type roles

| Role | Class | Font | When |
|---|---|---|---|
| Hero display | `font-display text-display` | Fraunces | Landing h1, aspirational tier title — **only** |
| Page title | `font-sans text-title-xl` | Geist | Top-level h1 on non-landing screens |
| Section title | `font-sans text-title-lg` | Geist | h2 inside a screen |
| Subsection | `font-sans text-title` | Geist | h3, item card titles |
| Lead paragraph | `font-sans text-body-lg text-ink-muted` | Geist | Subtitle under page title |
| Body | `font-sans text-body text-ink` | Geist | Default body text |
| Caption | `font-sans text-caption text-mute` | Geist | Helper text, metadata, footnotes |
| Label | `font-sans text-micro uppercase text-mute` | Geist | Form labels, section dividers |

**Hard rules:**

- Display serif (Fraunces) appears at most twice in the entire app: Landing hero h1, and aspirational tier title on result screen. Don't extend it elsewhere without updating this file.
- Body text size is `16px` always. **Do not scale body text up on desktop.** Only display sizes scale up via responsive variants if needed.
- `tracking-wide` is reserved for `text-micro` uppercase labels. Don't apply tracking to body or titles.

---

## 4. Component stylings

The following are **canonical class strings** — copy these exactly when building components. If a needed variant doesn't exist here, add it to this file first.

### Primary button

```tsx
<button className="inline-flex items-center justify-center w-full bg-clay-500 text-canvas py-4 px-6 rounded-2xl text-body font-semibold tracking-tight active:scale-[0.97] active:bg-clay-700 hover:bg-clay-600 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed">
  {label}
</button>
```

### Secondary button

```tsx
<button className="inline-flex items-center justify-center w-full bg-surface text-ink border border-stone-line py-4 px-6 rounded-2xl text-body font-semibold tracking-tight active:scale-[0.97] hover:bg-stone-soft transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed">
  {label}
</button>
```

### Tertiary / text link

```tsx
<button className="text-clay-700 hover:text-clay-600 underline underline-offset-4 decoration-clay-300 text-body">
  {label}
</button>
```

### Card

```tsx
<div className="bg-surface border border-stone-soft rounded-2xl p-6">
  {/* content */}
</div>
```

### Image-led card (for catalog items, doable tier)

```tsx
<div className="bg-surface border border-stone-soft rounded-2xl overflow-hidden">
  <div className="aspect-square bg-canvas">
    <img src={...} alt={...} className="w-full h-full object-cover" />
  </div>
  <div className="p-5 flex flex-col gap-2">
    <h3 className="text-title text-ink">{name}</h3>
    <p className="text-body text-ink">${price}</p>
    {/* CTA */}
  </div>
</div>
```

### Modal

```tsx
{/* Backdrop */}
<div className="fixed inset-0 bg-ink/50 backdrop-blur-sm z-40" />
{/* Modal */}
<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
  <div className="bg-surface rounded-3xl p-8 max-w-sm w-full shadow-lg flex flex-col gap-6">
    <h2 className="text-title-lg text-ink">{title}</h2>
    <p className="text-body text-ink-muted">{body}</p>
    {/* CTAs */}
  </div>
</div>
```

### Input (text)

```tsx
<input
  type="text"
  className="w-full bg-surface border border-stone-line rounded-xl py-3 px-4 text-body text-ink placeholder:text-mute focus:outline-none focus:border-clay-500 focus:ring-4 focus:ring-clay-500/20 transition-all duration-150"
/>
```

### Radio chip (for intake screen multi-choice)

```tsx
<button
  className={`flex-1 py-3 px-4 rounded-xl text-body font-medium transition-all duration-150 ${
    selected
      ? "bg-clay-500 text-canvas border-2 border-clay-500"
      : "bg-surface text-ink border-2 border-stone-line hover:border-stone-300"
  }`}
>
  {label}
</button>
```

### Inline tip (for FM3 low-confidence)

```tsx
<div className="bg-sage-100/40 border-l-4 border-sage-500 rounded-r-lg p-4 flex flex-col gap-1">
  <p className="text-micro uppercase text-sage-500">Tip</p>
  <p className="text-body text-ink">{message}</p>
</div>
```

### Affiliate disclosure footer

```tsx
<p className="text-caption text-mute italic">
  We earn a small commission when you buy through these links — it helps keep
  RoomVibe free.
</p>
```

---

## 5. Layout

### Content frame

| Breakpoint | Max width | Horizontal padding |
|---|---|---|
| Mobile (≤767px) | `max-w-sm` (384px) | `px-6` |
| Tablet (768-1023px) | `max-w-md` (448px) | `px-8` |
| Desktop (≥1024px) | `max-w-2xl` (672px) for image-heavy screens; `max-w-md` otherwise | `px-8` |

Default container pattern:

```tsx
<main className="flex flex-col flex-1 px-6 py-12 sm:px-8 sm:py-16">
  <div className="max-w-sm sm:max-w-md w-full mx-auto flex flex-col gap-8">
    {/* content */}
  </div>
</main>
```

### Vertical rhythm

| Spacing | Token | Use |
|---|---|---|
| Within content (paragraph stacks) | `gap-2` (8px) | Title → caption pairs |
| Between content groups | `gap-6` (24px) | Card to card, section to section |
| Between major sections | `gap-12` (48px) | Hero → body, section break |
| Hero → content | `mb-16` (64px) | Below the fold transitions |

### Hero images (aspirational tier)

- **Full-bleed** on mobile (escape the content frame): `-mx-6 sm:mx-0`
- 4:3 aspect ratio on mobile, 16:10 on tablet+
- Rounded corners only on tablet+ (`sm:rounded-2xl`)
- Image immediately followed by 3-5 `change_bullets[]` with `gap-3`

### Doable images

- **Inset** within content frame, never full-bleed
- 16:10 aspect ratio
- `rounded-2xl` always
- Smaller than aspirational hero (per ADR-0003)

---

## 6. Depth / elevation

Three levels only. No multi-shadow, no inset, no colored shadows.

| Level | Class | Use |
|---|---|---|
| 0 (flat) | (none) | Default. Most elements. |
| 1 (subtle lift) | `shadow-sm` | Cards floating above canvas |
| 2 (modal/sheet) | `shadow-lg` | Modals, action sheets, dropdowns |

**Hard rules:**

- Use **either** a `border` **or** a `shadow` per surface — never both.
- No `shadow-2xl`, `shadow-xl`, no `shadow-inner`.
- No tinted shadows (no `shadow-clay-500/20`). Shadows are neutral, subtle.

---

## 7. Do's and don'ts

### DO

- Use `bg-canvas` (#FAF7F2), not `bg-white`, as the page background
- Lead with imagery on result screens — type frames the image, never competes
- Apply rounding from the scale: `rounded-xl` (12px) for inputs, `rounded-2xl` (16px) for buttons + cards, `rounded-3xl` (24px) for modals — nothing else
- Reserve `bg-clay-500` for **the single primary CTA per screen**
- Use `text-micro uppercase` only for labels above form groups or section dividers
- Maintain ≥4.5:1 contrast on all body text
- Apply `active:scale-[0.97]` and `transition-all duration-150` for tactile feedback on touchable elements
- Use `gap-*` (Flexbox/Grid) over margin where possible — it's more predictable

### DON'T

- ❌ Don't use gradients on backgrounds, buttons, text, or borders
- ❌ Don't use glassmorphism (translucent + backdrop-blur surfaces). Backdrop-blur is allowed **only** on modal backdrops over `bg-ink/50`.
- ❌ Don't use neumorphism (soft inset shadows simulating raised buttons)
- ❌ Don't put two `bg-clay-500` CTAs on the same screen
- ❌ Don't use serif fonts for body or UI text — only the two designated display moments
- ❌ Don't use emoji as decoration (only as functional iconography, e.g., the success ✓ on result)
- ❌ Don't use `box-shadow` with color tints
- ❌ Don't add motion exceeding `duration-200`
- ❌ Don't add decorative motion (sparkles, particles, looping animations)
- ❌ Don't apply `tracking-wide` or `tracking-wider` to body or titles
- ❌ Don't introduce new colors, fonts, or radii outside this file. Update this file first if a new token is genuinely needed.
- ❌ Don't create one-off components inline — if it's reusable, add it to `web/components/` and document it here.

---

## 8. Responsive behavior

### Breakpoint policy

| Breakpoint | Tailwind | Width | Treatment |
|---|---|---|---|
| Mobile | (default) | 0-767px | Primary canvas. Test everything here first. |
| Tablet | `sm:` | 768-1023px | Slightly wider content frame, increase hero image height by 1.2× |
| Desktop | `md:` | 1024px+ | Wider frame for image-heavy screens (`max-w-2xl`), otherwise stay at tablet width |
| Wide | `lg:` and up | 1280px+ | No additional changes at v1 — the app is a phone-first PWA |

### Touch targets

- Minimum height **44px** for any interactive element (Apple HIG)
- Buttons use `py-4` (32px vertical padding + ~24px line-height = ~56px tall) — comfortably above the minimum
- Radio chips use `py-3` (24px + 24px = 48px) — at minimum, never below

### Media queries baked into components

- `aspect-[4/3] sm:aspect-[16/10]` — hero images
- `px-6 sm:px-8` — horizontal padding
- `max-w-sm sm:max-w-md` — content frame
- `py-12 sm:py-16` — vertical padding

---

## 9. For AI agents

You are an AI agent (Claude Haiku, typically) executing a UI issue. **Read this section carefully — these are non-negotiable execution rules.**

### Before writing any UI code

1. Read this entire file. The 8 sections above are your constraint set.
2. Identify which canonical components in [Section 4](#4-component-stylings) the screen needs. Copy class strings verbatim.
3. Identify which tokens in [Sections 2–3](#2-color-palette--roles) the screen needs. Use ONLY those tokens.
4. Plan the layout per [Section 5](#5-layout) — start mobile-first, layer responsive variants.

### While writing UI code

- **Use canonical class strings.** Don't paraphrase. Copy from Section 4.
- **Use only colors from Section 2.** No `bg-blue-500`, no `text-red-600` — only the tokens defined here.
- **Use only fonts and type sizes from Section 3.** No ad-hoc `text-[19px]`.
- **Use only the radii in Section 7.** `rounded-xl`, `rounded-2xl`, `rounded-3xl` — nothing else.
- **Apply the depth rules in Section 6.** Border or shadow, never both.
- **Honor the don'ts in Section 7.** They're not suggestions.

### When you need something that's not in this file

This is where most AI agents go wrong. **Do not invent tokens or styles inline.** Instead:

1. Stop coding the screen.
2. Propose the new token / component to the user, with rationale and where it fits in this file.
3. Wait for approval, then update DESIGN.md first.
4. Resume coding using the now-canonical token.

The whole point of DESIGN.md is that it stays prescriptive over time. If you add ad-hoc styles to "just get it working," the system rots.

### Verification checklist before submitting UI work

- [ ] Every color used appears in Section 2's table
- [ ] Every font/size used appears in Section 3's table
- [ ] Every component used matches a canonical class string in Section 4 (verbatim, except for content props)
- [ ] Layout follows the content frame and rhythm rules in Section 5
- [ ] Depth follows Section 6 (border XOR shadow, never both)
- [ ] No gradients, glassmorphism, neumorphism, emoji decoration, or motion >200ms
- [ ] Mobile screen tested first; tablet/desktop are extensions, not the canvas
- [ ] Touch targets ≥44px

### Common failure modes (and the corrections)

| Failure | Correction |
|---|---|
| "Made the page bg pure white" | Use `bg-canvas` (#FAF7F2). |
| "Added two `bg-clay-500` CTAs" | Demote one to secondary (`bg-surface text-ink border border-stone-line`). |
| "Used serif font for body text" | Body is always `font-sans` (Geist). Serif is reserved for two specific places. |
| "Picked `text-[19px]` because it 'felt right'" | Use the closest token (`text-body-lg` = 18px or `text-title` = 20px). |
| "Added a gradient for visual interest" | Remove. Visual interest comes from typography hierarchy + image quality, not gradients. |
| "Added a decorative bouncing animation" | Remove. Motion is `duration-150` ease-out tactile feedback only. |

When in doubt: **less decoration, more discipline.** A screen that feels "plain" against your training data is probably correct against this brand.

---

## Maintenance

This file is updated only when:

- A new component variant is genuinely needed (proposed by an agent, approved by the maintainer)
- A token needs adjusting based on real usage feedback
- Brand direction changes (post-v1 only)

Don't add tokens speculatively. Each entry in this file should be backed by an actual usage in the app.
