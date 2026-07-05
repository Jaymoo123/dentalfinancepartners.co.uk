# Property Tax Partners — UX/UI Redesign Architecture

**Status:** DESIGN / AWAITING OWNER SIGN-OFF (2026-07-03)
**Scope:** The five core pages — Home, Services, Incorporation, About, Contact — plus the shared design system, chrome (header/footer/sticky), and the conversion/interaction layer.
**Method:** Architected in Opus off an 8-agent parallel design audit (7 surface critiques + 1 trust-safe design-language reference). Build to be executed by Sonnet sub-agents, integrated/QA'd by Opus.
**Non-negotiable:** This is a lead-gen site for a UK property-tax firm. **Credibility is the conversion.** Every visual move must raise perceived authority, never trade it for trend.

---

## 1. Diagnosis — what we've got, and where it's going wrong

The current site is a **deliberately institutional** single-accent system: emerald `#059669` + slate neutrals, Plus Jakarta Sans, hard corners (`--radius: 0rem`), flat white/slate-50 bands, near-zero motion. Its *content and trust architecture are genuinely strong* (honest de-credentialed copy, quantified proof, segment-specific testimonials, mature conversion plumbing with `data-cta` instrumentation, above-average accessibility). But visually it reads as a **flat 2015 government portal / filing cabinet** — the opposite of the "fluid, liquid glass, pop" brief.

Five systemic faults repeat on **every** surface:

1. **Flat depth / hard corners.** `--radius: 0rem` globally; depth is faked with `border-l-4 border-emerald-600` stripes + `shadow-sm`. Everything sits on one visual plane. Three *contradictory* corner languages already coexist (global `0rem`, blog cards `rounded-lg`, shadcn `card.tsx` `rounded-xl`, form inputs `rounded-lg`) — which reads as unfinished, not minimal.
2. **Near-zero motion.** The single `fadeInUp` keyframe in `globals.css` is *never even applied* on these pages. No scroll-reveal, no hover-lift, modals appear instantly with no easing. This is the biggest driver of the "static/dated" feel.
3. **The brand never pops.** Emerald appears only as thin edges and small fills; 90%+ of every screen is white/slate. The amber tokens are defined but unused. No gradient, no tint, no glass anywhere.
4. **Emoji-as-iconography.** `📊 📅 🏢 💼` service icons + literal `✓` text glyphs render inconsistently per-OS, read consumer-grade, and quietly undercut authority on a tax-advice page. (`lucide-react` is already imported and unused for these.)
5. **Conversion buried / inconsistent.** On Home, About and Incorporation the only real lead form/CTA sits at the very bottom of very long pages. The Incorporation page's on-page calculator doesn't even fire its `resultCta` at peak intent. The conversion overlay layer (assistant widget, modals, sticky) is behaviourally excellent but visually off-brand from its own homepage (rounded flat buttons vs. the site's pressable `btnPrimary`).

Plus one outright **brand bug**: the home hero's primary CTA *and* eyebrow badge are hardcoded `bg-blue-600` (`page.tsx:316, 326`) — the single most important button on the site is an off-brand blue.

**What must be preserved (do not regress):** the trust/authority copy, quantified proof, anonymised testimonials, the de-credentialed posture, the full JSON-LD entity graph, the mature journey/consent conversion engine, the honeypot silent-drop fix, and the strong a11y baseline (skip link, focus rings, ARIA dialogs, reduced-motion scaffold, 44–48px targets).

---

## 2. Design language — "Emerald Glass: Precision Depth"

**Thesis.** Borrow the depth/gradient/glass vocabulary of top fintech (Stripe's layered mesh gradients, Linear's soft-shadow cards, Mercury's crisp border-highlights) but **ration literal "glass" (backdrop-blur) to floating chrome only** — never to the content or data a landlord reads to decide whether to trust us. Deliver the premium lift mostly through **opaque depth**: layered soft shadows, subtle emerald gradient tints, hairline sheen borders, and a real radius scale. "Pop" comes from confident emerald→emerald/teal gradients on primary CTAs and a couple of full-bleed brand bands, plus disciplined 120–260ms spring micro-interactions — **not** from neon or translucency over text. Every effect degrades to a clean flat state under `prefers-reduced-motion`, `prefers-reduced-transparency`, and no-`backdrop-filter`. Net read: *modern, expensive, engineered* — a firm that is precise with your numbers.

**Core principles**
- **Authority first, delight second.** Any glass/motion that competes with the numbers or the form loses.
- **Depth via opacity, not transparency.** ~90% of the premium lift is layered shadows + gradient tints + border-highlights on *opaque* surfaces. Real backdrop-blur is a garnish.
- **Glass is chrome, not content.** Allowed: sticky header, assistant/booking widget, modal scrims, pinned CTA. Banned: body cards, blog prose, tables, calculators, form fields.
- **Contrast is never conditional.** Text always on a solid / ≥92%-opacity fill — never over a live gradient/photo through blur.
- **Evolution, not rebrand.** Keep emerald `#059669` + slate + amber and Plus Jakarta Sans. A returning landlord must instantly recognise PTP.
- **Motion signals quality, not playfulness.** 120–260ms transform/opacity springs, one-shot reveals. No looping, parallax, or elastic overshoot.
- **Performance is a trust signal.** `backdrop-filter` capped; GPU-only animated props; effects vanish on low-end/mobile.
- **Everything has a flat fallback.** The flat state is the real product; the effect is progressive enhancement.

---

## 3. Token specifications (land in `globals.css` / `layout-utils.ts`)

### Radius scale (replaces `--radius: 0rem`)
- `--radius-sm: 8px` (inputs, chips) · `--radius-md: 12px` (cards, buttons) · `--radius-lg: 16px` (panels, modals) · `--radius-xl: 24px` (hero graphic, feature tiles) · `--radius-pill: 999px` (badges, avatars).
- Keep hairline *rules* sharp. Body-copy containers stay at `md` (12px) — no juvenile large radii on text blocks. Reconciles the shadcn `card.tsx` contradiction.

### Elevation scale (layered soft shadows — the main premium driver, zero blur cost)
- `--shadow-sm: 0 1px 2px rgba(15,23,42,.04), 0 1px 3px rgba(15,23,42,.06)`
- `--shadow-md: 0 2px 4px rgba(15,23,42,.04), 0 8px 16px -6px rgba(15,23,42,.10)` (default card)
- `--shadow-lg: 0 4px 8px rgba(15,23,42,.05), 0 16px 32px -12px rgba(15,23,42,.14)` (card hover)
- `--shadow-xl: 0 8px 16px rgba(15,23,42,.06), 0 24px 48px -16px rgba(15,23,42,.18)` (featured)
- Always dual-layer (tight ambient + soft directional); slate-tinted, alpha ≤0.18 (never pure black).

### Colour derivations (added on top of existing tokens — no brand hex replaced)
- **Teal companion (gradients/accents only, never flat text):** `#14b8a6`, `#2dd4bf`.
- **Glass tints:** `--glass-white: rgba(255,255,255,.72)`, `--glass-slate: rgba(15,23,42,.04)`, `--glass-emerald: rgba(5,150,105,.06)`.
- **Sheen / rings:** `--sheen: rgba(255,255,255,.65)` (card top-border highlight), `--ring-emerald: rgba(5,150,105,.35)`.
- **Dark hero base:** `#0b1220`.
- **Amber** stays a rare warm accent (badges, "popular", one focal stat), capped ~5% of any viewport. **One primary action colour only: emerald.**

### Signature gradients
- **CTA:** `linear-gradient(135deg,#059669,#047857)`; hover → `(#047857,#065f46)`; white text always (≥4.9:1).
- **Hero mesh (one dark band, decorative, text only on the solid `#0b1220` zone at ≥7:1):**
  `#0b1220` base + `radial-gradient(1200px 600px at 15% 10%, rgba(5,150,105,.28), transparent 60%)`, `radial-gradient(1000px 700px at 85% 20%, rgba(20,184,166,.20), transparent 55%)`, `radial-gradient(900px 900px at 50% 120%, rgba(4,120,87,.30), transparent 60%)`. Pure CSS — **no WebGL/canvas.**
- **Light section wash:** `radial-gradient(600px 400px at 100% 0, rgba(5,150,105,.05), transparent)` or `linear-gradient(180deg,#fff,#f8fafc)`.
- **Glass chrome:** `background: rgba(255,255,255,.72); backdrop-filter: blur(12px) saturate(140%)` + 1px sheen top-border + soft shadow. Wrap in `@supports (backdrop-filter: blur(1px))` with an opaque `#fff` fallback. Blur ≤12px desktop / ≤8px mobile.

### Motion system (all `prefers-reduced-motion`-gated)
- **Button hover/press:** `transform 160ms cubic-bezier(.22,1,.36,1)`, shadow md→lg, gradient darkens; press `translateY(0) scale(.99)`. Optional one-shot emerald sheen sweep on hover.
- **Card hover lift:** `translateY(-3px)` + shadow lg→xl + emerald border alpha .2→.35 (reduced-motion: keep shadow/border only).
- **Scroll-reveal:** IntersectionObserver `.in-view` → opacity 0→1, `translateY(16px→0)`, 500ms `cubic-bezier(.16,1,.3,1)`, 60–80ms stagger, **runs once**, never on above-the-fold LCP content, default-visible if JS/observer absent.
- **Sticky header:** class-toggle to frosted-glass past hero (fade layer opacity/background — never animate the filter value).
- **Field focus/validation:** focus → emerald border + ring over 150ms; error → 120ms colour fade + single 200ms 3px shake (reduced-motion: colour only); success tick → 180ms scale 0.9→1.
- **Widget/modal entrance:** spring `translateY(12px)+scale(.98)→1`, 200–260ms; scrim `blur(4px)` fade (the one place transient content-blur is allowed).

---

## 4. Reusable primitives to build

- **`GlassCard` / elevated-card primitive** — radius-md, `--shadow-md` (→lg on hover), 1px `#e9edf2` border + inset sheen top-highlight; `featured` variant with emerald gradient-border (`::before` ring). Opaque. Replaces the `border-l-4 + shadow-sm` panels estate-wide.
- **`Reveal` utility/hook** — IntersectionObserver wrapper (once, reduced-motion-safe, default-visible fallback). Also refactor `StickyCTA` off its raw scroll listener onto rAF/observer.
- **`GlassChrome` treatment** — the frosted token for sticky header (scroll-state), assistant widget header, sticky CTA pill, modal scrim only.
- **Button evolution (`layout-utils.ts`)** — evolve `btnPrimary` to radius-md + emerald gradient + layered shadow + the spring hover/press, *keeping* the tactile press identity. Unify the conversion layer onto this one button language.
- **Icon set** — replace all emoji + `✓` glyphs with emerald `lucide` stroke icons (already a dependency); decorative marks `aria-hidden`.
- **Section eyebrow / `.section-label`** — actually use the existing utility to break heading monotony.

---

## 5. Per-page direction

**Home** — Fix the blue hero CTA/badge → emerald gradient. Apply hero mesh (or optimised self-hosted image) with entrance reveal. Emoji → lucide. Cards → GlassCard with stagger-reveal. Add a **mid-page inline capture** after the calculators/testimonials (currently the only form is at the very bottom). Vary section rhythm (one visual climax, a stats strip, asymmetric split) instead of ~8 identical centered bands. Compress/earn the decorative mid-page photo band.

**Services** — GlassCard + reveal across service/tier/"what's included" cards. Emerald→teal gradient on hero scrim + featured tier; amber only on the "Most Popular" badge. Emphasise featured tier by elevation, not `scale-105` (avoids clip/blur). Make service + audience cards **clickable** to the matching calculator/contact (they're dead-ends today). **Fix the broken `#calculators` anchor** on the DIY tier CTA.

**Incorporation** — **Turn on `resultCta`** on the on-page calculator (one-prop change, biggest conversion lever — fires a booking prompt the instant the landlord sees their personal £ upfront cost + break-even). Concentrate glass/gradient depth on the **two money zones** (calculator + final CTA) only; keep the honest decision content calm. Render "makes sense vs doesn't" as a side-by-side green/muted contrast; process steps as a connected timeline (breaks the 5× identical `border-l-4` monotony). Repoint the leaking "View services" secondary CTA. Add one faceless proof artefact (anonymised worked example / blurred sample-report).

**About** — Add a **hero CTA and a mid-page CTA after the stats bar** (today the only CTA is ~1000px down). Emoji → lucide (or numbered pillars). Emerald tonal gradient on the stats bar; frosted panel behind the hero H1. Consider a founder/lead-adviser proof block for the "same accountant every time" promise. **Substantiate or scope the "£2.4M+" and "qualified accountant" claims** (estate credential-risk hygiene). Give differentiators visual primacy.

**Contact** — Float the lead form as a soft glass card (real elevation + faint emerald glow) over one subtle emerald→slate gradient band; 150–200ms focus/hover transitions. Reconcile radius (inputs already `rounded-lg`). Rework the one-word "Contact" hero → benefit headline + eyebrow; brighten/gradient-scrim the 85%-obscured photo; lift the form toward the fold. Add one honest, substantiated trust proof beside the form. Consider trimming/progressive-disclosing the two extra required free-text questions (A/B — friction vs lead quality).

**Chrome + conversion layer** — Scroll-state frosted-glass header (glass debuts here safely). Upgrade `CTASection` from flat `emerald-50` slab to an elevated gradient/tinted-glass panel with a one-shot attention micro-motion. Turn `StickyCTA` from a full-width dark "cookie-banner" bar into a rounded floating glass pill with a one-line trust cue. Give the assistant widget/modals spring entrances, a 3-step elevation scale (replace blanket `shadow-2xl`), frosted header only, one emerald-gradient primary action, recolour the red ping badge to brand, add a session-level interruption budget + success-state follow-on CTAs, and add modal focus-trap/Escape.

---

## 6. Guardrails (blocking at QA)

**Trust** — no text on live gradient/photo-through-blur; exactly one primary CTA colour (emerald); financial data/calculators/tables/forms stay flat white; glass ≤1–2 surfaces/viewport on floating chrome only; no looping/parallax/overshoot; compliance copy never dressed in glass; instantly recognisable as PTP.

**A11y / perf** — all text ≥ WCAG AA (hero/dark-glass ≥7:1), verified *against the fill*; `backdrop-filter` ≤1–2 elements, ≤12px desktop/≤8px mobile, `@supports`-gated with opaque fallback, never animated; `prefers-reduced-motion` + `prefers-reduced-transparency` + `forced-colors` all resolve to a fully usable flat state; hero mesh static CSS (protect LCP); reveals exclude above-the-fold; animate transform/opacity only (protect INP); test scroll FPS on a mid-range Android; visible emerald focus rings ≥3:1 on glass.

**Anti-patterns to reject in review:** full-section frosted glass; text over translucent moving content; animated WebGL mesh; rainbow/high-chroma glass; glass on calculators/rate tables/form fields; neon glows / 40px+ blur; looping/bouncing motion; per-frame `backdrop-filter`/shadow-blur animation; two competing bright CTAs; any effect shipped without a flat fallback; 24px+ radius on text containers; amber over-use.

---

## 7. Build sequencing (proposed — pending owner scope decision)

**Phase 0 — Foundation (design-system slice).** `globals.css` tokens (radius/shadow/glass/gradient), `layout-utils.ts` button evolution, `Reveal` utility + `GlassCard` primitive, icon swap helper. No page rewrites yet. Build green + a11y/CWV sanity.

**Phase 1 — Home as flagship reference page.** Rebuild Home fully on the new system; this becomes the pattern library every other page copies. Verify (build/lint/vitest/Lighthouse/contrast). Checkpoint with owner.

**Phase 2 — Roll out** to Services, Incorporation, About, Contact in parallel Sonnet slices (non-overlapping files), each reusing Phase-0 primitives + Phase-1 patterns.

**Phase 3 — Chrome + conversion layer** (header glass-on-scroll, CTASection, StickyCTA pill, widget/modals motion+elevation, interruption budget).

**Phase 4 — QA sweep + deploy gate.** Full verification; local-first; explicit owner sign-off before any Vercel deploy (per house rule).

---

## 8. Open decisions for the owner (before Phase 0)
1. **Intensity** — restrained/trust-safe (recommended) vs. balanced vs. bold/expressive glass+motion.
2. **Palette** — add teal-in-gradients + amber accent (recommended) vs. purist emerald+slate only.
3. **Imagery** — keep photos (self-hosted/optimised) vs. replace decorative photo bands with CSS gradient-mesh / brand panels.
4. **Scope this pass** — foundation + Home flagship first (recommended) vs. all five pages in one sweep vs. design-system + chrome only.

*All prior work preserved as-is; this is an additive evolution. Local-first, no deploy without sign-off.*
