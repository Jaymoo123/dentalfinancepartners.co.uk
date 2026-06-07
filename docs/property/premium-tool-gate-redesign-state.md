# Property — Premium tool + Excel-gate redesign (handoff state)

> ✅ **RESOLVED + DEPLOYED 2026-06-07.** Merged with `property-humanise`, committed, and shipped to production (see STATE.md §0.07). The blog-embed kill-switch was flipped on after a live visual sign-off; both calc-page and blog embeds are live across the 6 enabled categories. This doc is retained as the design/gotchas reference.

**Branch:** `property-calculators-and-geo` → merged to `main` and deployed.
**Blocker (now cleared):** the required merge with the `property-humanise` worktree branch is done.
**Build:** `npm run build` is production-clean (764/764 static pages, exit 0; only 6 non-blocking ESLint warnings, incl. an unused `setScenario` in `PremiumCalculator.tsx`).
**Dev server:** run with `npm run dev -- -p 3004` from `Property/web` (it was stopped to run the build).

## What this work was
Redesigned the two on-page lead-gen modules for the Section 24 category to a clean shadcn aesthetic, and made them render correctly on BOTH the calculator page (`/calculators/section-24-calculator`, wide ~1024px) and inside blog posts (narrow, capped to 65ch ~680px by `.prose-blog`). The original/indexed Section 24 calculator on the calc page is UNTOUCHED.

1. **Premium calculator** (`PremiumCalculator.tsx`) — the "personal vs company" interactive tool (config-driven, maths from `lib/section24.ts`). Rebuilt on shadcn `Input/Label/Slider/Collapsible/Chart`: 3 primary inputs with sliders + an "Advanced options" collapsible (other costs, tax year, portfolio MiniGrid), one headline answer, two scenario tiles, a "Show the workings" collapsible. Emerald + slate + white palette only (no amber).
2. **Excel toolkit gate** (`ResourceGate.tsx` + new `ExcelPreview.tsx`) — email-gated download of the Excel model + guide, with a faithful spreadsheet-styled PREVIEW of the model so visitors see what they get.

## Key architecture / patterns (IMPORTANT — read before editing)
- **`split` (gate) and `full` (premium calc) props default to the BLOG/compact behaviour; only the CALC PAGE opts in.** Set in `CalculatorPageResources.tsx` (`<ResourceGateLazy ... split />`, `<PremiumUpgrade ... full />`). This is deliberate so we NEVER edit `BlogPostRenderer.tsx` (owned by the humanise agent) — the blog gets the default automatically.
  - Gate `split`: side-by-side preview|form via container query (`@container` + `@3xl:grid-cols-[1.1fr_0.9fr]`). Default (blog) = stacked, capped sensibly.
  - Premium `full`: shows the comparison chart + roomier header. Default (blog) = no chart + tight header.
- **`ExcelPreview` table MUST be fixed width `w-[640px]`, NOT `w-full`.** `w-full` lets it stretch to fill wider containers, so the same grid balloons on one page vs another. Fixed width = identical cells everywhere.
- **`.prose-blog` CSS leak (the big gotcha).** `globals.css` has plain `.prose-blog table/th/td/tr` rules (higher specificity than Tailwind classes). Tailwind's `not-prose` does NOT reset them (only resets the typography plugin). They were leaking into the Excel grid on blog posts → stretched cells, dark `th` headers, striped rows. FIXED by scoping those four rules with `:not(.not-prose *)`. If you embed any other `<table>`-based component inside a blog (`.not-prose`), it's now safe.
- **Mobile (`sm` 640px breakpoint):** below `sm`, the premium tool is replaced by a "open on desktop" prompt (`sm:hidden` message + `hidden sm:block` tool), and the gate hides the grid preview to show just the email form. Rationale: mobile is a small share of traffic and the wide tools aren't worth the headache there.
- **No em-dashes** in any user-facing copy (house rule).

## Files touched
- `components/calculators/premium/PremiumCalculator.tsx` — rebuilt; `full?` prop; conditional chart + header padding.
- `components/calculators/premium/MiniGrid.tsx` — restyled to match (rounded cards, shadcn inputs).
- `components/calculators/premium/PremiumUpgrade.tsx` — `full` passthrough; mobile prompt; restyled `ToolLoading`.
- `components/resources/ExcelPreview.tsx` — NEW (section-24 only; topic-gated).
- `components/resources/ResourceGate.tsx` — redesigned; `split?` prop; ExcelPreview; mobile = email-only; condensed copy.
- `components/resources/ResourceGateLazy.tsx` — `split` passthrough.
- `components/resources/CalculatorPageResources.tsx` — passes `split` + `full`.
- `lib/calculators/types.ts` — `CalcField` gained `min?`, `max?`, `advanced?`.
- `lib/calculators/premium/tools/section-24.ts` — slider bounds, advanced flags, trimmed copy, chart colours (slate `#64748b` / emerald `#059669`).
- `lib/resources/registry.ts` — section-24 `magnetTitle` = "Get the Section 24 Excel toolkit"; blurbs reworded.
- `lib/resources/copy.ts` — default blurb reworded.
- `app/globals.css` — the `:not(.not-prose *)` scoping fix.
- `components/ui/{input,label,slider,collapsible}.tsx` — added via shadcn.

## Decisions locked this session
- **Keep BOTH calculators on the calc page.** The original is the server-rendered, Google-indexed calculator the page ranks on; the premium tool is `ssr:false` (not reliably indexed) and answers a different question (personal vs company). Removing the original = SEO risk. Not doing it.

## Update — 2026-06-06 (session 2)
- **Lint fixed:** removed the unused `setScenario` setter in `PremiumCalculator.tsx`.
- **ExcelPreview now covers all 6 flagship categories.** Refactored `ExcelPreview.tsx` from one hardcoded section-24 block to a data-driven renderer with two layouts: `paired` (left/right blocks, e.g. section-24, capital-gains, incorporation) and `single` (one label+value column, e.g. stamp-duty, landlord-essentials, mtd). Each category has a `PreviewSpec` (file name, sheet tabs, rows, emerald headline). The figures are the models' DEFAULT-scenario outputs, taken from the same pure libs the builders import (verified by running each `compute()` on the builder's default blue-cell inputs): SDLT surcharge +£17,500 on £350k; CGT £23,984; landlord income tax £2,746 / net £6,254; incorporation upfront £41,018 / saving £4,320 / break-even 9.5 yrs; MTD qualifying £55,000 / mandatory 6 Apr 2026. Section-24 preview is visually unchanged.
- **Over-long calculators fixed with a scroll panel (not collapse).** `PremiumCalculator.tsx` now wraps the inputs in a capped, scrollable panel on the COMPACT (blog) layout only: `!full && "max-h-[360px] overflow-y-auto pr-2"`. Short tools (section-24 3 inputs, stamp-duty 2, mtd 3) never reach the cap so they don't scroll and are unchanged. The 3 complex tools had their per-field `advanced` flags REMOVED (so every input is visible and scrollable, in order) — incorporation leads with property value → purchase price → rent → interest. The `advanced`/Collapsible mechanism still exists (section-24 + the MiniGrid use it); it just isn't used to hide scalar inputs on the big tools anymore. Calc pages (`full`) are uncapped (room for a 2-col layout).
- **The "404" on the section-24 / incorporation blog posts was NOT a real bug** — those pages render the full article. Cause was the stale prod server (below). Note: with `dynamicParams = false`, the blog route streams a 200 whose RSC payload contains the not-found boundary string "Page not found" on EVERY page (working ones too), so grepping for it is a false signal.

### Gotchas learned this session (READ before debugging "my change isn't showing")
- **A stale `next start` (production server) on port 3004 silently blocks `next dev`.** `npm run dev -- -p 3004` fails with `EADDRINUSE` *in the background log only*, so the port keeps serving a FROZEN production build and no edits ever appear. Symptom: repeated edits make zero visible difference. Fix: `netstat -ano | grep :3004` to find the listener PID, `taskkill //F //PID <pid>`, then start dev and CONFIRM the log shows `✓ Ready`, not `EADDRINUSE`. A production build never hot-reloads — only use `next dev` while iterating.
- Premium calculator is `dynamic(ssr:false)`, so its markup is NOT in server HTML (curl only sees the `ToolLoading` placeholder + the "Free interactive tool" label). Verify tool changes in a real browser, or check the built client chunk — not curl'd SSR HTML. The email gate / ExcelPreview ARE server-rendered, so curl-verifiable.

## Open / next steps
- **Build verified green** on the current state (2026-06-06): `npm run build` = 764/764 pages, exit 0; only the pre-existing non-blocking lint warnings. Re-run after the merge.
- Optional polish: the comparison CHARTS on the capital-gains / landlord / incorporation / stamp-duty / mtd calc pages still use amber (`#f59e0b`); section-24's chart was moved to slate+emerald in the redesign. Charts only show on calc pages (`full`), not blogs.
- **Merge with `property-humanise` is clean (verified).** That branch forked at `e49a4d73` and only diverges on `.md` content + the injection wiring (`BlogPostRenderer.tsx`, `CalculatorPageResources.tsx`) + voice scripts; this branch's calc-component edits touch a disjoint file set (zero overlap). Calc fixes are still UNCOMMITTED — commit before merging. The calculator is injected by the renderer (not stored in the `.md`), so content rewrites can't break it; placement follows the article's first `<h2>` (end-fallback otherwise), and a post's `category` decides which tool injects. After merge: `npm run build` + spot-check one rewritten post in a calc category.
- Deploy gated on user (Vercel CLI from repo root; do not auto-deploy).
