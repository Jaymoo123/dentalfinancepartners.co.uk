# SOLICITORS PORT - PHASE 4 BUILD PLAN (calculators)

Planner, read-only, 2026-09-11. Every path and number below was verified against disk in
this session. Where this plan contradicts `docs/solicitors/_port/DISPOSITION_SLICE2.md`,
this plan wins: slice 2 was written 2026-09-10, before phases 2 and 3 landed and before
the owner's hard rule of 2026-09-11.

Binding inputs: playbook sections 3, 4, 5, 6, 10, 12, 14; PORT_FIELD_NOTES in full;
DESIGN_SYSTEM sections 0, 6, 6a; PROPERTY_STANDARD_ROLLOUT F.5 and G; the APPROVED
`docs/solicitors/DESIGN_DELTA.md`; `docs/solicitors/STATE.md` PICKUP.

**THE HARD RULE BINDS EVERY PACKAGE. No copy changes, no SEO changes.** No visible string
rewritten, moved, retitled or DELETED; no `metaTitle`, `metaDescription`, `canonical`,
JSON-LD content, sitemap entry, route, redirect or internal-link href touched. The only
new text permitted is chrome that arrives with a standard component (for example
`FaqSection`'s "FAQ" eyebrow, `LeadCTAPanel`'s "Free consultation" eyebrow). If a design
requirement appears to force a copy change, it is planned around or raised, never absorbed.

---

## 0. FALSE OR STALE PREMISES FOUND (corrections to the brief and to slice 2)

1. **"The two 404 `related` links" is THREE hrefs across TWO files, not two in one.**
   Verified:
   - `src/lib/tools/configs/partner-tax-reserve.ts:152` -> `/calculators/fa2014-salaried-member`
   - `src/lib/tools/configs/partner-tax-reserve.ts:153` -> `/calculators/solicitor-take-home`
   - `src/lib/tools/configs/vat-disbursements-classifier.ts:148` -> `/calculators/solicitor-take-home`
   Real slugs, from the config files themselves: `fa2014-salaried-member.ts:6` declares
   `slug: "fa-2014-salaried-member"`; `solicitor-take-home.ts:7` declares
   `slug: "partnership-vs-llp-take-home"`. The dead hrefs are the FILENAMES, which is the
   mechanism that produced them. Intent is unambiguous, the visible `label` strings do not
   change, and nothing renders these hrefs today, so this is a data defect fix and not a
   link change. No link needs removing: do not stop.
2. **`src/tests/calculator-tabs-crawl-path.test.ts` EXISTS on this site** (13 test files in
   `src/tests/`). Slice 2 section B says it does not. It is currently configured
   `requireLiveUsage: false` and carries a self-test that FAILS LOUDLY the moment any page
   renders `<CalculatorTabs`. That self-test is the acceptance gate for WP3.
3. **7 of 13 configs carry `related`.** The seven are client-account-interest,
   colp-cofa-checker, law-firm-sale-cgt, partner-tax-reserve, practice-cashflow-runway,
   solicitor-hourly-rate-benchmark, vat-disbursements-classifier. Six carry none and will
   render no related section. That is correct; a calculator never gets a related-reading
   card (DS section 2).
4. **The turnaround promises in the capture copy are ALREADY GONE.** Slice 2 A.5 / S6 cites
   `CalcResultCta.tsx:21` and `ResultGateModal.tsx:118`. Both were swept in phase 2:
   `CalcResultCta.tsx` now ends "No obligation" and `ResultGateModal.tsx:118` reads "Thanks,
   we will be in touch. Your result is below." No work here. Do not re-open.
5. **`/calculators/[slug]/page.tsx:77` already says "UK 2026/27".** Slice 2 section 4 item 2
   claims the template and the index disagree on the tax year. Only the index says 2025/26
   (`page.tsx:9, :41, :44`), and under the hard rule it stays 2025/26. Owner item.
6. **Zero manager-direct work in this phase.** `packages/web-shared/tools/components/Calculator.tsx`
   already ships `resultWrapper` at `:42`, `:69`, applied at `:122` around the RESULT COLUMN
   only (landed by generalist phase 4a, `aeec8f13a`). It also already ships
   `--calc-warn-bg` / `--calc-warn-fg` / `--calc-warn-accent` at `:131` and `:141` with the
   amber values as fallbacks (landed by `a8ba84567`), so the approved W1 warning ramp reaches
   every calculator result through three CSS custom properties in
   `Solicitors/web/src/app/globals.css` and NO kit edit. Deriving command:
   `grep -n "resultWrapper\|calc-warn" packages/web-shared/tools/components/Calculator.tsx`.
7. **The `gateCampaign` string prop is real but NOT needed here.**
   `generalist/web/src/components/calculators/EmployerNICalculator.tsx:57-79` needs it because
   a SERVER page selects the gate for it. `LawFirmSaleCgtCalculator` takes no props at all
   (`law-firm-sale-cgt/page.tsx:99` renders `<LawFirmSaleCgtCalculator />`) and already
   imports its own config at `:32`, so it builds its own `ResultGate` wrapper internally with
   `campaign={tool.slug}`. No prop, no boundary problem. Read the pattern, do not copy the prop.
8. **S1 (the `law-firm-sale-cgt` duplicate) DISSOLVES under the hard rule and the owner's gate
   decision.** Both remedies slice 2 offers are now forbidden: deleting the registry config
   removes the live `/embed/law-firm-sale-cgt` route, and deleting the bespoke route changes a
   live page's copy and its rendered h1. The owner has ruled that embeds are NEVER gated, so an
   ungated copy at `/embed/law-firm-sale-cgt` is the POLICY, not a defect. KEEP BOTH. The
   brief's statement of the fact is correct; its implied call to action is not.
9. **`font-serif` in phase-4 scope is 24 across 5 files**, not 65. Site-wide the count is now
   **180**, not 193 or 194: phases 2 and 3 retired the rest. Per file:
   `law-firm-sale-cgt/page.tsx` 7, `tools/equity-partner-buy-in/page.tsx` 8,
   `calculators/[slug]/page.tsx` 5, `calculators/page.tsx` 2, `embed/page.tsx` 2.
   Deriving command: `grep -ro "font-serif" src | wc -l`.
10. **The "6 calculators" claim is an OWNER ITEM, not work.** Live at
    `src/app/calculators/page.tsx:44` ("Six solicitor-specific calculators") and `:11`
    (`DESCRIPTION`, an SEO string enumerating six), plus slice 1's homepage row. The registry
    holds 13 generic (`src/lib/tools/registry.ts:24-38`). Fixing any of it is a copy or SEO
    change. Do not touch.
11. **`PremiumBarChart` is as slice 2 section D describes, not as the brief's shorter version
    says.** `src/components/tools/premium/PremiumBarChart.tsx:88` sets `aria-hidden="true"` on
    the wrapper AND `:97-99` sets `role="img"` + `aria-label` on the `svg` inside it. The
    subtree is REMOVED, not collapsed. The real defect is that the series values are text
    nowhere reachable.

---

## 1. REALITY CHECK PER SURFACE

| Surface | What renders today | What the standard requires | Where the code ALREADY satisfies it |
|---|---|---|---|
| `/calculators/[slug]` x12 | Crimson full-bleed slab hero, `mx-auto max-w-4xl` body clamp (`:91`), `rounded-2xl border` explainer card, hand-rolled `<dl>` FAQ (`:117`), crimson `rounded-2xl` closing box with a bare `<Link href="/contact">` (`:135-151`), NO gate, NO related section | F.5: schema, navy motif hero, slate-50 tool at full container, white explainer, related, `#get-expert-help` panel, `FaqSection`; results gated | Shared `web-shared/tools` renderer already consumed (ahead of Property). `scroll-mt-24` already on this route family (field notes). Tax year already 2026/27. The `data-cta` triple on the closing link is already correct. |
| `/calculators/law-firm-sale-cgt` | Same shell plus a hand-built gated renderer and an SSR worked-examples block (`:113-134`) | Same F.5 anatomy, gate becomes the shared one | The worked examples exist and are the ONLY `workedExamples` content in the fleet (0 of 13 configs carry the field). `LawFirmSaleCgtCalculator.tsx:51` `useState(true)` deliberately SSRs the gated state. KEEP that behaviour. |
| `/embed/[slug]` x13 | `CalculatorClient variant="embed"`, chrome-free, `robots index:false`, not in sitemap, not in the baseline | Never gated, never changed | Fully satisfied. `enabled` derives from the EXISTING `variant` switch. Do not add a flag. Do not add a link floor. |
| `/embed` gallery | 13 eager `<iframe>` at `embed/page.tsx:59-66`, plain `border` cards, 2 `font-serif` | Standard scale, `rounded-xl ring-1`, lazy iframes | Chrome-free shell bypass already works. |
| `/calculators` index | Crimson slab hero, one flat grid of 13 `rounded-2xl border` cards, no tabs, no ask | F.5 two tiers: Tier 1 tabs + one literal `<a>`, Tier 2 categorised directory keeping all 13 cards | The 13 cards already carry the whole 24-link floor. CollectionPage + BreadcrumbList JSON-LD already emitted, `numberOfItems` already derived from the registry. |
| `/tools/equity-partner-buy-in` | 414 lines, crimson hero, `mx-auto max-w-4xl` clamp (`:179`), `<dl>` FAQ, crimson closing box, 8 `font-serif`, premium calculator UNGATED | Standard anatomy, unclamped, kit FAQ, navy panel | `equity-partner-buyin-page-cta` already carries `data-cta-placement="tool-page"`. |
| Result gate | Nothing on the generic fleet. Two independent module-global `gateModalShownThisSession` flags (`PremiumCalculator.tsx:38`, `LawFirmSaleCgtCalculator.tsx:35`) | Skippable gate on all non-embed generic renders, per-slug persistence | `ResultGateModal.tsx` is ALREADY the right shape: reveals on X, "No thanks", backdrop and Esc; fires `cta_click{result_gate_skip, result_gate}` from JS at `:45-48` with NO `data-cta`, deliberately, so dismissals count. Do not attribute it, do not rename it. |

---

## 2. LINK FLOORS AND DASH CEILINGS (authority: `docs/solicitors/_port/link_baseline.json`)

The `restatements` array contains exactly ONE entry, phase 3, covering 6 routes: five
`/solicitor-guides/*` and `/blog/practice-accounting`, and it restates DASH ceilings only.
**No route in phase-4 scope has been restated.** The `links` and `dashes` maps bind as-is.

| Route | Link floor | Dash ceiling | CTA count today |
|---|---|---|---|
| `/calculators` | **24** | 0 | 2 |
| `/calculators/client-account-interest` | 11 | 0 | 3 |
| `/calculators/colp-cofa-checker` | 11 | 0 | 3 |
| `/calculators/fa-2014-salaried-member` | 11 | 5 | 3 |
| `/calculators/indemnity-premium-estimator` | 11 | 4 | 3 |
| `/calculators/law-firm-sale-cgt` | 11 | 0 | 3 |
| `/calculators/law-firm-valuation` | 11 | 3 | 3 |
| `/calculators/llp-profit-share-allocation` | 11 | 0 | 3 |
| `/calculators/partner-tax-reserve` | 11 | 0 | 3 |
| `/calculators/partnership-vs-llp-take-home` | 11 | 0 | 3 |
| `/calculators/practice-cashflow-runway` | 11 | 0 | 3 |
| `/calculators/solicitor-hourly-rate-benchmark` | 11 | 0 | 3 |
| `/calculators/sra-client-account-reserve` | 11 | 6 | 3 |
| `/calculators/vat-disbursements-classifier` | 11 | 0 | 3 |
| `/tools/equity-partner-buy-in` | 11 | 0 | 3 |
| `/embed`, `/embed/[slug]` x13 | n/a, absent from the baseline by design | n/a | n/a |

**The arithmetic that matters.** All 13 calculator routes sit at exactly 11 and all 11 are
chrome (`/`, `/blog`, `/calculators`, `/contact`, `/cookie-policy`,
`/free-firm-health-check`, `/locations`, `/privacy-policy`, `/services`,
`/solicitor-guides`, `/terms`). There is not one body link on any of them. Every net-new body
link is headroom; the only way to fail is to break chrome. `/contact` is IN the chrome, so
moving the closing `<Link href="/contact">` costs zero unique links, but the `data-cta`
triple on it must survive (WP2).

`/calculators` at 24 is the tight route: 11 chrome + 13 card hrefs. **Tabs must not replace
the directory.** A tabs-only rebuild lands at 11 and fails by 13.

The `/for-*` audience pages (floors 14; dashes 1 / 4 / 1 / 7) are PHASE 5, not phase 4.
Phase 4 builds `CalculatorTabs` and mounts it only on `/calculators` Tier 1.

---

## 3. WORK PACKAGES

Four packages, disjoint file sets. Every package's acceptance tests include
`python scripts/check_dependency_closure.py`, and any new import is declared in
`Solicitors/web/package.json` in the SAME change (T24). `package.json` today declares
`lucide-react ^1.17.0` and `tw-animate-css ^1.4.0`, so `CalculatorTabs`' icons are already
closed; anything else is not.

No builder runs `next build`, `next dev`, or any git write command. Git from the monorepo
ROOT only; the `Solicitors/.git` husk swallows operations silently.

### WP1 - The gate core and the premium a11y floor (runs FIRST, alone)

**Owns:**
- `Solicitors/web/src/components/calculators/ResultGate.tsx` (NEW)
- `Solicitors/web/src/components/calculators/HeldResult.tsx` (NEW)
- `Solicitors/web/src/components/calculators/resultGateStorage.ts` (NEW)
- `Solicitors/web/src/components/tools/CalculatorClient.tsx`
- `Solicitors/web/src/components/tools/LawFirmSaleCgtCalculator.tsx`
- `Solicitors/web/src/components/tools/premium/PremiumCalculator.tsx`
- `Solicitors/web/src/components/tools/premium/PremiumBarChart.tsx`
- `Solicitors/web/src/app/globals.css` (the three `--calc-warn-*` declarations ONLY)

**Port from, with line anchors:**
- `generalist/web/src/components/calculators/ResultGate.tsx:1-106` (whole file)
- `generalist/web/src/components/calculators/HeldResult.tsx:1-90` (whole file)
- `generalist/web/src/components/calculators/resultGateStorage.ts:1-29`
- `generalist/web/src/components/tools/CalculatorClient.tsx:29-47` (the resultWrapper swap)
- `generalist/web/src/components/calculators/EmployerNICalculator.tsx:57-79` (read only, for
  the pattern of gating a hand-written calculator; do NOT copy the prop, section 0 item 7)

**In-repo consumption pattern to copy:**
`Solicitors/web/src/components/tools/premium/ResultGateModal.tsx` is the already-correct local
modal; import it from `@/components/tools/premium/ResultGateModal`, not from the
`calculators/premium` path generalist uses. Button tokens come from
`src/components/ui/layout-utils.ts`, which phase 1 repointed at the kit.

**The work:**
1. Port the three files. Storage key prefix `afl_calc_revealed_` plus the campaign, matching
   the site's existing `afl-embed-height` namespace (`embed/[slug]/page.tsx:30`).
   `sessionStorage`, one key per calculator, never a shared key.
2. `CalculatorClient.tsx`: swap `resultCta` for `resultWrapper`, gated only when
   `variant === "page"`. Four lines. Do NOT add a second flag and do not touch
   `embed/[slug]/page.tsx`.
3. `LawFirmSaleCgtCalculator.tsx`: delete the module-global at `:35` and the
   gated/revealed/gateOpen trio at `:51-57`; wrap the result column in
   `<ResultGate campaign={tool.slug} ground="navy">`. `useState(true)` at `:51` is deliberate
   live behaviour (it SSRs the gated state so the figure never flashes), and `ResultGate`
   preserves the equivalent because `revealed` and `converted` both start false and only
   `useEffect` can raise them. Keep the live id: pass `dataCta="see_result"` through
   `HeldResult`'s existing `dataCta` prop so the series does not fork. Retire `CalcResultCta`
   from `:163` only.
4. `PremiumCalculator.tsx`: delete the module-global at `:38`, re-key its once-per-session
   memory onto `wasRevealed`/`rememberRevealed(config.id)`. Premium ids all end `-premium`, so
   they cannot collide with a generic slug. `:653`'s `data-cta="see_result"` and `:494`'s
   `placement === "blog"` gate condition stay exactly as they are (S5 exemption, risk R7).
5. `PremiumBarChart.tsx`: delete `role="img"` and `aria-label` from `:97-99` (dead under the
   `aria-hidden` parent at `:88`); keep `:88`; add a visually hidden table sibling emitting
   every group label and series value as TEXT NODES through the existing `formatValue` helper
   at `:24`, so bars and text cannot disagree (T16, T17).
6. `globals.css`: add `--calc-warn-bg`, `--calc-warn-fg`, `--calc-warn-accent` on the approved
   W1 ladder from DESIGN_DELTA section 1, and record which step each takes. Three
   declarations, no kit edit.

**OFF LIMITS:** every `page.tsx` anywhere; `CalculatorTabs.tsx`; `src/tests/**`;
`src/lib/tools/**`; `CalcResultCta.tsx` (survives untouched for the blog island at
`PremiumCalculator.tsx:664`); `ResultGateModal.tsx`; `src/components/resources/**`;
anything under `packages/web-shared/`.

**Acceptance:**
- `python scripts/check_dependency_closure.py` -> OK across 19 sites.
- `cd Solicitors/web && npx tsc --noEmit` -> clean.
- `cd Solicitors/web && npm test` -> 16 files / 208 tests or better, 0 failures.
- `grep -rn "gateModalShownThisSession" Solicitors/web/src` -> 0 hits.
- `grep -rn 'data-cta="see_result"' Solicitors/web/src` -> still 2 hits.
- `grep -n "result_gate_skip" .../premium/ResultGateModal.tsx` -> still exactly 1, and still
  no `data-cta` on any dismiss control.
- `grep -n 'role="img"' .../premium/PremiumBarChart.tsx` -> 0.
- Report the storage key literal and prove it is per-campaign.

### WP2 - The calculator page template, the bespoke page and the `related` data fix

**Owns:**
- `Solicitors/web/src/app/calculators/[slug]/page.tsx`
- `Solicitors/web/src/app/calculators/law-firm-sale-cgt/page.tsx`
- `Solicitors/web/src/components/resources/CalculatorPageResources.tsx`
- `Solicitors/web/src/lib/tools/configs/partner-tax-reserve.ts`
- `Solicitors/web/src/lib/tools/configs/vat-disbursements-classifier.ts`

**Port from:** `generalist/web/src/app/calculators/[slug]/page.tsx` (the whole F.5 template,
commit `fcd61b7b3`); `PROPERTY_STANDARD_ROLLOUT.md` F.5 for the rendered order; DS 6a for the
full-container rule.

**In-repo consumption pattern to copy:** `Solicitors/web/src/app/solicitor-guides/page.tsx`,
the phase-3 file that already does all of it: kit `LeadCTAPanel` at `:141-148` with
`proofPoints` from `LEAD_PROOF_POINTS` (`@/lib/blog-category-copy`), a
`form` of `<LeadForm redirectOnSuccess={false} />`, a `backdrop` of
`<SolicitorsBackdrop tone="navy" />`, kit `Eyebrow`, `siteContainerLg`, and the light band at
`:151-163` that keeps navy off the navy footer.

**The work, in rendered order:**
1. JSON-LD unchanged in CONTENT. Keep `buildWebApplication` + `buildFaqPage` on `tool.faqs`.
   Adding a `BreadcrumbList` node is an SEO change: do NOT. Owner item (R6).
2. Hero: navy motif band, `bg-slate-900 relative overflow-hidden py-12 sm:py-16`, content
   `relative z-10`, `<SolicitorsBackdrop tone="navy" />`, replacing the `bg-[var(--primary)]`
   slab at `:65-66` and `sectionYLoose`. Kit `Breadcrumb onDark`. Kit `Eyebrow onDark`
   carrying the EXISTING string from `:77` verbatim. h1 to the section 4b scale, `font-serif`
   dropped. Standfirst keeps its `max-w-3xl`, the one surviving clamp.
   NO net-new hero CTA. Slice 2 section 1 item 7 proposes one with an authored label.
3. Tool section `bg-slate-50`, `mx-auto max-w-4xl` at `:91` DELETED, `siteContainerLg` is the
   measure (DS 6a). `CalculatorClient slug variant="page"` unchanged; the gate reaches this
   page from WP1 with no edit here.
4. `CalculatorPageResources`: restyle ONLY. Slice 2 says to retire the "Go deeper" strip
   (`:46-53`) and the second `ResourceGate` (`:55-60`). Both are visible copy and a live
   capture surface. Keep both; `rounded-2xl border` becomes `rounded-xl ring-1 ring-slate-200/70`.
5. Explainer: white section at FULL container, h2 `text-2xl font-bold text-slate-900 sm:text-4xl`,
   kit `Prose`. The `rounded-2xl border` card at `:96` retires.
6. `RelatedArticles` from `tool.related` on `bg-slate-50`, rendering nothing on the six configs
   that carry none. Prerequisite: the three dead hrefs in section 0 item 1 are repointed in the
   SAME change, labels untouched.
7. Closing ask: kit `LeadCTAPanel` at `id="get-expert-help"` with `scroll-mt-24`, `title` = the
   existing h2 verbatim, `description` = the existing paragraph verbatim, `proofPoints` =
   `LEAD_PROOF_POINTS`, `form` = `<LeadForm redirectOnSuccess={false} />`, `backdrop` =
   `<SolicitorsBackdrop tone="navy" />`.
   KEEP the existing `<Link href="/contact">` verbatim inside the panel's `footnote`, with
   `data-cta="calculator-page-cta"`, `data-cta-goal="form"`, `data-cta-placement="calculator"`
   and its existing label expression untouched. `LeadForm` carries no `data-cta`, so this is
   the only way the live `vw_cta_performance` series survives (T22).
8. Kit `FaqSection tone="white"` replacing the `<dl>` at `:112-133`, fed the SAME `tool.faqs`
   array that feeds `buildFaqPage` (T17). Its default title "Frequently asked questions"
   matches the existing h2 exactly; the "FAQ" eyebrow is permitted component chrome. That
   light section is what keeps the navy panel off the navy footer (DS section 9).
9. `law-firm-sale-cgt/page.tsx`: same treatment, plus the worked-examples block at `:113-134`
   KEPT VERBATIM, restyled to `rounded-xl ring-1` cards with kit `ExampleFigureNote` beneath.
   Its closing panel takes its own existing h2 "Planning an exit or succession?" and its own
   paragraph, verbatim, and its own `data-cta="calculator-page-cta"` link in the footnote.
10. Grounds oscillate, a card's ground opposes its section's. Tail: white explainer, slate-50
    related, navy panel, white FAQ, footer.

**OFF LIMITS:** `src/components/calculators/**`; `CalculatorClient.tsx`;
`LawFirmSaleCgtCalculator.tsx`; `src/components/tools/premium/**`;
`src/app/calculators/page.tsx`; `src/app/embed/**`; `src/app/tools/**`; `src/tests/**`;
`globals.css`; the other 11 tool configs; anything under `packages/web-shared/`.

**Acceptance:**
- `python scripts/check_dependency_closure.py` -> OK across 19 sites.
- `npx tsc --noEmit` clean; `npm test` 0 failures.
- `grep -rn "max-w-4xl|max-w-5xl|contentNarrow" src/app/calculators` (use -E) -> 0 hits (DS 6a).
- `grep -rn "font-serif" src/app/calculators` -> only `src/app/calculators/page.tsx` remains
  (that file is WP3's); 12 of the 24 retire here.
- `grep -rn "fa2014-salaried-member|/calculators/solicitor-take-home" src/lib/tools` -> 0 hits.
- Visible-word-multiset diff of `/calculators/partner-tax-reserve` and
  `/calculators/law-firm-sale-cgt` before and after: every pre-existing word still present.
  Phase 3 used exactly this test and it is what proved the hard rule held.
- Manager crawl after build: all 13 routes at or above 11 unique internal links, dashes at or
  under section 2's ceilings, and the `data-cta` TRIPLE diffed against the pre-port render,
  not the count (T22).

### WP3 - `CalculatorTabs`, the two-tier index, the crawl guard, the embed gallery

**Owns:**
- `Solicitors/web/src/components/tools/CalculatorTabs.tsx` (NEW)
- `Solicitors/web/src/app/calculators/page.tsx`
- `Solicitors/web/src/tests/calculator-tabs-crawl-path.test.ts`
- `Solicitors/web/src/app/embed/page.tsx`

**Port from, with line anchors:**
- `generalist/web/src/components/tools/CalculatorTabs.tsx:1-267`: WAI-ARIA tablist, roving
  tabindex, Arrow/Home/End, hash deep link, `next/dynamic` panels with a sized `loading`
  placeholder at `:32-36` (zero CLS), and the LITERAL column map (Tailwind scans literals, not
  computed strings). Its bespoke `employerni` tab exception at `:47-59` has no Solicitors
  equivalent: every tab here mounts `CalculatorClient` by slug, never a second copy of a tool.
- `Property/web/src/components/calculators/CalculatorTabs.tsx:1-257` is the origin. Where
  Property and the generalist copy disagree, Property wins.
- `generalist/web/src/app/calculators/page.tsx` (commit `fcd61b7b3`) for the two-tier index.
- `generalist/web/src/app/embed/page.tsx` (commit `a8ba84567`) for lazy loading on the preview
  iframe AND inside the published snippet.

**In-repo consumption pattern to copy:** `src/app/solicitor-guides/page.tsx:56-59` is the house
way of deriving a tool subset (`genericTools().slice(0, 5)`) instead of hand-keeping a second
list, and `:154-163` shows kit `Eyebrow` plus the section-scale h2 on `bg-slate-50`.

**The work:**
1. `CalculatorTabs.tsx`, LOCAL. There is no shared twin: `CalculatorTabs` is Property-local and
   generalist built its own. Tab keys map to VERIFIED slugs: `clientreserve` ->
   `sra-client-account-reserve`, `salariedmember` -> `fa-2014-salaried-member`, `takehome` ->
   `partnership-vs-llp-take-home`, `valuation` -> `law-firm-valuation`, `profitshare` ->
   `llp-profit-share-allocation`. Five is the bundle ceiling; every listed panel mounts and
   downloads, so do not pad. Icons from `lucide-react`, already declared in `package.json`.
2. `/calculators`: EVERY string on the page stays byte-identical, including `TITLE`,
   `DESCRIPTION`, the eyebrow at `:41`, the h1 at `:42`, and the standfirst at `:44` with its
   "Six solicitor-specific calculators" and its "no data collected unless you choose to follow
   up with us". Structure only: navy motif hero, a white Tier 1 band rendering the tabs, then a
   `bg-slate-50` Tier 2 categorised directory keeping ALL 13 cards on
   `rounded-xl border-2 border-slate-200 bg-white p-3 sm:p-4 hover:border-primary-400` with an
   icon badge `h-9 w-9 sm:h-11 sm:w-11 rounded-xl`.
   If Tier 1 cannot be built without authoring a heading, ship the tabs alone and raise it. Do
   not invent a sentence, and do not move a sentence in from another page: a copy MOVE is also
   forbidden.
3. THE LITERAL CRAWL HREF. Tabs emit tab BUTTONS, so the page owes one literal anchor
   `<a href="/calculators/sra-client-account-reserve">`. The guard is a SOURCE SCAN: the Tier 2
   directory emits all 13 hrefs but through a template literal it cannot read. Spell one out.
4. `calculator-tabs-crawl-path.test.ts`: flip `requireLiveUsage: true` and replace the
   "no page renders the tabs component yet" self-test, which fails BY DESIGN the moment the tag
   lands. Both exemption lists stay EMPTY.
5. Category buckets, verified from the configs: Practice Finance 5, SRA Compliance 3,
   LLP / Partnership 3, Income Tax 1, Succession and Sale 1. Five buckets, no merge needed. Add
   a literal `CATEGORY_ORDER` constant and assert exhaustiveness, so a new config cannot silently
   vanish from the directory and drop the route below its floor of 24.
6. NO net-new `/embed` tail link and NO net-new closing `LeadCTAPanel`. Slice 2 section 4 items 6
   and 7 propose authored sentences, and `LeadCTAPanel` has REQUIRED `title` and `description`
   props with no existing strings on this page to fill them. Owner items.
7. `/embed` gallery: lazy loading on the 13 preview iframes at `:59-66` and inside the emitted
   snippet; cards to `rounded-xl ring-1 ring-slate-200/70`; its 2 `font-serif` retire. Copy
   verbatim. Not in the baseline, gains no floor, stays noindex and out of the sitemap.

**OFF LIMITS:** `src/app/calculators/[slug]/**`; `src/app/calculators/law-firm-sale-cgt/**`;
`src/app/embed/[slug]/**`; `src/app/tools/**`; `src/components/calculators/**`;
`src/components/tools/CalculatorClient.tsx`; `src/components/tools/premium/**`;
`src/components/resources/**`; `src/lib/tools/**`; `globals.css`; the other 12 test files;
anything under `packages/web-shared/`.

**Acceptance:**
- `python scripts/check_dependency_closure.py` -> OK across 19 sites.
- `npx tsc --noEmit` clean.
- `npm test` -> `calculator-tabs-crawl-path` GREEN with `requireLiveUsage: true`. PROVE the
  guard bites: remove the literal anchor, watch it FAIL, restore it (T9). Report both outputs.
- A grep for the literal string `href="/calculators/` in `src/app/calculators/page.tsx` returns
  at least one hit.
- Visible-word-multiset diff of `/calculators` before and after: IDENTICAL.
- Manager crawl: `/calculators` at 24 or above unique internal links, dashes 0.

### WP4 - `/tools/equity-partner-buy-in`

**Owns:**
- `Solicitors/web/src/app/tools/equity-partner-buy-in/page.tsx` (414 lines)
- `Solicitors/web/src/app/tools/equity-partner-buy-in/EquityPartnerCalculator.tsx`

**Port from:** the same F.5 anatomy as WP2, and the same
`src/app/solicitor-guides/page.tsx:141-163` consumption pattern for `LeadCTAPanel` plus
`SolicitorsBackdrop` plus the light tail band.

**The work:**
1. Navy motif hero replacing the crimson slab; kit `Breadcrumb`; the existing "Free interactive
   tool" chip at `:196-200` becomes a kit `Eyebrow` carrying that string verbatim; h1 to the
   section 4b scale. NO net-new hero CTA (authored label, forbidden).
2. `mx-auto max-w-4xl space-y-16` at `:179` DELETED. `siteContainerLg` with explicit per-section
   `py-12 sm:py-16 lg:py-20` and oscillating grounds. `space-y-16` is not a section rhythm.
3. The prose-only intro at `:182-192` needs a visual (DS 0.2). DERIVE it, never type it: a
   three-column `CoverageCards` built from the existing `routeLabel` values at `:133`, so the
   figure cannot drift from the model and no new sentence is authored.
4. Worked examples at `:205-342` KEPT VERBATIM, tables restyled, kit `ExampleFigureNote` under
   each (DS 0.3 requires it on derived and statutory figures too).
5. Methodology at `:345-363` KEPT. `:360` publishes a full 2026/27 rate set: re-derive every
   figure against `docs/solicitors/house_positions.md` section 3 and REPORT the derivation. If a
   figure is not in house positions, STOP and report it. Do not change it silently and do not
   delete it: either is a copy change.
6. The hand-rolled FAQ list at `:373-387` becomes kit `FaqSection` on the same array that feeds
   `buildFaqPage`.
7. The closing crimson `rounded-2xl` box at `:391-407` becomes `LeadCTAPanel` at
   `id="get-expert-help"` with `scroll-mt-24`, its existing h2 as `title`, its existing paragraph
   as `description`, and the existing `/contact` link kept verbatim in the `footnote` carrying
   `data-cta="equity-partner-buyin-page-cta"` with `data-cta-placement="tool-page"` unchanged.
8. 8 `font-serif` and 4 `rounded-2xl` retire on this page.
9. `EquityPartnerCalculator.tsx` mounts `PremiumCalculator placement="calculator"`, which is
   ungated. LEAVE IT UNGATED (S5 exemption, R7). Tokens and radii only.

**OFF LIMITS:** everything under `src/app/calculators/**`, `src/app/embed/**`,
`src/components/**`, `src/lib/**`, `src/tests/**`, `globals.css`, `packages/web-shared/**`.

**Acceptance:**
- `python scripts/check_dependency_closure.py` -> OK across 19 sites.
- `npx tsc --noEmit` clean; `npm test` 0 failures.
- A grep -E for `max-w-4xl|max-w-5xl|font-serif` in
  `src/app/tools/equity-partner-buy-in/page.tsx` returns 0 hits.
- Visible-word-multiset diff of `/tools/equity-partner-buy-in` before and after: identical,
  except any figure the house-positions re-derivation forces, which is REPORTED and not shipped
  without the manager approving it.
- Manager crawl: floor 11, dashes 0, and the `data-cta` triple
  `equity-partner-buyin-page-cta` / `tool-page` / unchanged goal still present.

---

## 4. SEQUENCING AND DEPENDENCIES

- **WP1 first, alone.** It is the only package that changes rendered behaviour on every generic
  calculator at once, WP3 tab panels inherit their gate from it, and it owns `globals.css`,
  which nothing else may touch this phase.
- **WP2, WP3 and WP4 run in parallel** after WP1 lands. Their file sets are disjoint and each
  OFF LIMITS list names the others.
- Soft dependency WP1 -> WP3: the tab panels mount `CalculatorClient`, so they are gated for
  free once WP1 is in. WP3 does not edit `CalculatorClient` and must not.
- WP2 owns the two tool configs; WP3 reads the registry and edits no config. No conflict.
- **MANAGER-DIRECT PACKAGES: NONE.** No phase-4 work touches `packages/web-shared/`. Both hooks
  this phase needs (`resultWrapper`, the `--calc-warn-*` custom properties) already shipped with
  generalist phase 4. Before believing that, run
  `git log --oneline -5 -- packages/web-shared/` from the monorepo ROOT to check no sibling port
  has changed the file since (playbook section 13 item 6).
- Manager builds, serially, after each round. Builders never build (T1), and a verified-green
  build can predate the files it claims to cover (T2): check `BUILD_ID` mtime.
- Re-review after every gap fix. Phase 4 on generalist is the canonical T7 case: the fix pass
  gated one page and left the same component ungated in the tab strip on the two
  highest-traffic surfaces. Ask "where else does this component render?" every time.

---

## 5. RISKS AND AMBIGUITIES, EACH WITH MY RECOMMENDED RESOLUTION

**R1. S20, the highest-profile one.** `/calculators/page.tsx:44` promises "no data collected
unless you choose to follow up with us", the approved gate asks for an email before the figure,
and the hard rule forbids changing that sentence.
RECOMMENDATION: SHIP THE GATE AND TOUCH NOTHING. The sentence is a claim about DATA COLLECTION,
and the gate collects nothing on a skip: backdrop, Esc, X and "No thanks" all reveal and store
only a local reveal flag (`ResultGateModal.tsx:45-48, :56-63, :71-73, :81-100`). Submitting the
form IS choosing to follow up. The sentence stays true. Disclose the reading to the owner in the
phase bundle; a one-word change remains his to make.

**R2. Kit `FaqSection` is a Radix collapsible**, so closed answers are NOT in the server HTML.
On 12 indexed calculator pages that changes what a crawler sees in the body.
RECOMMENDATION: ADOPT IT. F.5 mandates it, Property does it, and the `FAQPage` JSON-LD carrying
every answer verbatim is unchanged and is what crawlers actually consume (T8). Verify the JSON-LD
in the BUILT output before and after and prove both answer sets match exactly. If the owner
treats SSR body text as an SEO surface, the fallback is the restyled hand-rolled list, a two-line
revert. Disclose either way. Note the dash ceilings on `/calculators/fa-2014-salaried-member` (5)
and `/calculators/sra-client-account-reserve` (6) may DROP as a side effect, which is fine: they
are ceilings.

**R3. `LeadCTAPanel` REQUIRES `title`, `description` and `proofPoints`, all visible copy.**
RECOMMENDATION: `title` and `description` come verbatim from each page existing closing h2 and
paragraph. `proofPoints` reuses `LEAD_PROOF_POINTS` from `@/lib/blog-category-copy`, already
shipped and already live on `/blog`, `/solicitor-guides` and seven hubs, so it is not new copy on
this site. Nothing is authored.

**R4. Moving `data-cta="calculator-page-cta"` out of the page body would fork the live
`vw_cta_performance` series (T22), and `LeadForm` carries no `data-cta` at all** (verified: the
only knobs at `LeadForm.tsx:29-35` are `redirectOnSuccess` and `submitLabel`).
RECOMMENDATION: keep the existing `<Link href="/contact">` verbatim inside the panel `footnote`.
Id, placement, goal, href and label all survive on the same element type. Diff the FULL triple,
never the count.

**R5. Slice 2 instructs four changes the hard rule now forbids**: delete the "Go deeper" strip,
delete the second `ResourceGate`, correct the "6 calculators" claim, correct the 2025/26 tax year
on the index.
RECOMMENDATION: restyle only, and put all four in the owner bundle. Slice 2 predates the rule.

**R6. Slice 2 adds a `BreadcrumbList` node to the calculator routes JSON-LD.**
RECOMMENDATION: do not. Structured data is SEO. Phase 3 already had one SEO change slip through
and it had to be restored verbatim from `b11ba12a~1` at cost. Owner item.

**R7. The two `placement="calculator"` premium surfaces are ungated while the blog one gates**
(`PremiumCalculator.tsx:494`). Gating them adds two capture interstitials.
RECOMMENDATION: record the exemption, do not gate. The approved capture scope for this port is
the generic-fleet ResultGate, and DESIGN_DELTA section 4 says no new interruptive surfaces.

**R8. `/calculators` Tier 1 cannot meet F.5 without a heading, and every candidate heading is
authored prose.**
RECOMMENDATION: build Tier 1 from the tabs plus component chrome only. If a reviewer calls it
unfinished, that is an owner commission, not a licence to write a sentence. Same precedent as
phase 3 and the 17 hub essentials briefings.

**R9. Two module-globals named `gateModalShownThisSession` in two independent modules is the
unlock-one-unlock-all class, and a shared storage key would recreate it.**
RECOMMENDATION: per-campaign `sessionStorage` keys, prefix `afl_calc_revealed_`.
`PremiumCalculator` keys on `config.id` (all five premium ids end in `-premium`), the generic
gate keys on the tool slug, so the namespaces cannot collide. Assert it with a grep, not an
argument.

**R10. `LawFirmSaleCgtCalculator.tsx:51` is `useState(true)` on purpose**, and phase 2 already
burned time on a false alarm about exactly this route.
RECOMMENDATION: preserve the SSR-gated first paint, which `ResultGate` gives for free, and say so
in the commit message so the next reviewer does not re-litigate it.

**R11. Any crawl or CTA diff can silently measure a different site or a stale build** (the
three-wrong-site incident; the stale `C:/port-base` worktree).
RECOMMENDATION: read the bound port out of the server log, assert the served page title, and
prove the before-server age with a string whose commit date you know, before quoting any number.

**R12. `workedExamples` is absent from all 13 configs (S2) and `related` from 6 of 13 (S4).**
RECOMMENDATION: both are content commissions and authoring them is out of bounds. The template
renders nothing where the data is empty. Two owner items, not two defects.

---

## 6. OWNER BUNDLE PRODUCED BY THIS PHASE (items, not work)

1. The index says "Six solicitor-specific calculators" and "UK 2025/26" against a registry of 13
   on 2026/27 rates, in three places site-wide. Copy and SEO. Frozen.
2. The "Go deeper" strip and the second `ResourceGate` on calculator pages: a second capture
   surface and a second form on one page, against the standard one-form rule.
3. `BreadcrumbList` JSON-LD absent from all 15 calculator and tool routes.
4. `workedExamples` empty on 13 of 13 configs; `related` empty on 6 of 13.
5. `/calculators` Tier 1 and the `/embed` tail link ship without a heading or an invitation,
   because writing one is out of bounds.
6. The S20 standfirst sentence, disclosed with the reading in R1.
7. `/calculators/law-firm-sale-cgt` is served by a bespoke route while the same tool remains a
   registry config serving `/embed/law-firm-sale-cgt`. Both stay. The standard never-a-second-copy
   rule is breached by DATA, not by rendering, and every remedy is a route change.
8. `FaqSection` adoption removes closed FAQ answers from the server HTML on 12 indexed pages
   (R2), with the JSON-LD unchanged.
