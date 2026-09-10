# PORT BLUEPRINT - SOLICITORS SLICE 2: CALCULATORS, SERVICES, LOCATIONS, AUDIENCE

Sources read directly 2026-09-10: `docs/property/DESIGN_SYSTEM.md` §0/§0.4/§2/§6/§6a, `docs/_engines/PROPERTY_STANDARD_ROLLOUT.md` appendices D, E, F, G, `docs/_engines/DESIGN_PORT_PLAYBOOK.md` (full), `docs/generalist/_port/DISPOSITION_SLICE2.md`, `docs/solicitors/house_positions.md`, `docs/solicitors/_port/link_baseline.json`, Property + generalist + Solicitors source, and the running pre-port production server at `http://localhost:3121`.

Site: `Solicitors/web`, Accounts for Lawyers, `source_identifier: solicitors`.

---

## 0. Standing conversions (stated once, apply to every row below)

Every disposition row assumes these; they are not repeated per row.

1. **Serif retires.** Every `font-serif` in scope becomes Plus Jakarta Sans weight-bearing type. Site total is **193 occurrences** (brief said 194; the real count is `grep -ro "font-serif" src | wc -l` = 193), of which **65 are in this slice's files**. Headings take the §4b scale: h1 `text-3xl sm:text-4xl lg:text-6xl font-bold`, h2 `text-2xl font-bold sm:text-4xl`, h3 `text-lg sm:text-xl font-bold`. `font-semibold tracking-tight` retires with it.
2. **Brand ramp.** `#c41e3a` stays primary via ROSE; buttons ground `rose-700`. Warning / duty / penalty / breach semantics move OFF red onto amber-700 / orange-700 / fuchsia-700 / violet-700. Every `text-[var(--primary)]` used to signal a *penalty or duty* (not a brand accent) is a ramp move, not a token swap. Blocks all `headline.tone`/`verdict.tone` result colouring in the 13 configs until S0 lands.
3. **Body-clamp ban (§0.1, §6a).** Delete every `mx-auto max-w-4xl`, `max-w-5xl`, `contentNarrow` and centred `max-w-3xl` wrapper round a page body, table, FAQ or link list. `max-w-3xl` survives only on hero copy and on an Eyebrow+h2+standfirst block above a full-width grid. Instances in scope, all removed: `calculators/[slug]:91`, `calculators/law-firm-sale-cgt:98`, `tools/equity-partner-buy-in:179`, `services/[slug]:215`, `services/page:355`, `locations/page:38`, `locations/[slug]:195`, `AudienceStageLayout:130,163,212`.
4. **Tokens.** `sectionY` is already canonical-adjacent (`py-12 sm:py-16 md:py-20`) but writes `md:` where the standard writes `lg:`; pages write the standard `py-12 sm:py-16 lg:py-20` literally. `sectionYLoose` (`py-16 sm:py-20 md:py-24 lg:py-28`) retires - hero is `py-12 sm:py-16` or a `min-h-` motif hero.
5. **Radii and edges.** `rounded-2xl` + `border border-[var(--border)]` is the pre-redesign recipe everywhere in this slice. Becomes `rounded-xl ring-1 ring-slate-200/70`. `rounded-2xl` survives ONLY on the sanctioned `HeldResult` prompt card and the `LeadCTAPanel` inner form card.
6. **Card ground opposes section ground** (§0.1). Every `bg-white` card in scope currently sits on `bg-[var(--surface)]`; keep that pairing, but a card on a white section flips to `bg-slate-50`.
7. **FAQs.** Every hand-rolled `<dl>` becomes kit `FaqSection` + `buildFaqPageJsonLd(faqs)` **on the same array binding** (T17). Five `<dl>` instances in scope: `calculators/[slug]:117`, `calculators/law-firm-sale-cgt:143`, `tools/equity-partner-buy-in:373`, `services/page:385`, `services/[slug]:196`, `AudienceStageLayout:189`. That is six. All six.
8. **Every section carries a visual (§0.2).** Prose-only sections in scope get a figure. Named per row.
9. **`ExampleFigureNote` on every figure carrying figures**, statutory ones included (§0.3). The single exemption is `StatsCounter` (our own proof strip). The four `for-*` stats strips are NOT that exemption - they carry statutory figures (`£12,570`, `£50,270`, `£1m`, `14%→18%`) and each needs the note.
10. **British English.** `optimization` appears at `locations/[slug]:62, :85, :100, :120` (and its siblings). Becomes `optimisation`. This is a rule sweep, not a search for one token.
11. **No em-dashes.** See §F for the per-route dash budget and the one route where the recorded baseline is already wrong.

---

## 1. `/calculators/[slug]` - 12 live generic pages, ONE file

**Smallest edit point: one template.** `src/app/calculators/[slug]/page.tsx` (157 lines) renders every generic tool. The registry holds **13** configs, but `law-firm-sale-cgt` is shadowed by a static route (§3), so this template serves **12**. Do not touch 12 files.

Link floor **11** for every one of them, and the floor is **100% chrome** (verified live: `/`, `/blog`, `/calculators`, `/contact`, `/cookie-policy`, `/free-firm-health-check`, `/locations`, `/privacy-policy`, `/services`, `/solicitor-guides`, `/terms`). There is not one body link on any calculator page today. Anything added is headroom; nothing can be lost except by breaking chrome.

Final rendered order:

1. **JSON-LD** `buildCalculatorJsonLd` + `buildFaqPageJsonLd` + **BreadcrumbList** (net-new; the kit `Breadcrumb` emits its own). Renames `buildWebApplication`/`buildFaqPage` (`:6`) so the FAQ array is provably the FaqSection array. Replaces `:50-63`.
2. **Navy motif hero** `bg-slate-900 relative overflow-hidden py-12 sm:py-16`, content `relative z-10`. Replaces the flat `bg-[var(--primary)]` slab (`:65-66`) and `sectionYLoose`. Reason: a crimson full-bleed slab is decoration; the navy+motif hero is the standard ground and stops brand red doing structural work.
3. **Kit `Breadcrumb onDark`** replacing `Breadcrumb variant="light"` (`:67-74`).
4. **`Eyebrow onDark`** "Free calculator · 2026/27 rates" replacing the raw `<p class="text-[10px] ...">` pill (`:76-78`).
5. **h1** conforming scale, serif dropped (`:79-81`).
6. **Standfirst** `max-w-3xl text-base sm:text-lg text-slate-300` (`:82-84`) - the one surviving clamp.
7. **NET-NEW hero CTA** `${btnOnDark}` -> `#get-expert-help`, label "Ask an accountant about your figure". §0.5: a page a reader can scroll to the bottom of without meeting an ask is not finished, and today's only ask is a bare button at the very foot.
8. **Tool section** `bg-slate-50`, UNCLAMPED (`:89-93`). `CalculatorClient slug variant="page"` KEPT - Solicitors already consumes the shared `web-shared/tools` renderer and is ahead of Property (§4.6.3). The gate is wired **inside `CalculatorClient`, not here** (§A).
9. **Premium island**, reduced. `CalculatorPageResources` (`:110`) keeps the `PremiumUpgrade` mount and **RETIRES two things**: the "Go deeper" crimson pill strip (`CalculatorPageResources.tsx:46-53`) and the second capture `ResourceGate` (`:55-60`). One form per page (Property's own file records both removals). Below `sm` the slot becomes a link to `#get-expert-help`.
10. **White explainer at FULL container**, `h2 text-2xl sm:text-4xl` + `Prose`, replacing the `rounded-2xl border` card (`:95-106`). The `border-l-4` card recipe is reserved for the tool body.
11. **Worked examples** - `tool.workedExamples` does not exist on any of the 13 configs (verified: `we=0` on all). GEO field, S2.
12. **`RelatedArticles` from `tool.related`** on `bg-slate-50`. **7 of 13 configs carry `related`, 6 carry none** - the section renders nothing on those six, and per §2 you never substitute a calculator link-card. **BLOCKER before this ships: `partner-tax-reserve.ts:152` and `:153` point at `/calculators/fa2014-salaried-member` and `/calculators/solicitor-take-home`, both of which return HTTP 404** (verified by curl). They do not render today because the template never renders `related`; the moment it does, this page emits two dead links. The real slugs are `fa-2014-salaried-member` and `partnership-vs-llp-take-home`. Fix the data, not the template. Also: `related` entries pointing at other calculators must render as a `CalculatorTabs` block or a plain link, never a `RelatedArticles` card (§2 standing rule, "a calculator never gets a card").
13. **`#get-expert-help` `LeadCTAPanel` navy `redirectOnSuccess={false}`**, replacing the navy `rounded-2xl` box holding a bare `<Link href="/contact">` (`:135-151`). §0.5: the closing ask is `LeadCTAPanel`, never a bare button, and only the header and StickyCTA leave for `/contact`.
14. **Kit `FaqSection`** replacing the `<dl>` (`:112-133`), `tone="white"` - and that light section is what keeps the navy panel off the navy footer.

`Wiring:` `calc_hero_help` (hero, goal `form`) · `calc_see_result` (result_gate) and `calc_confirm_figure` (result_shown) come from `ResultGate` itself · the existing `calculator-page-cta` id at `:146` MOVES onto the `LeadCTAPanel` submit surface, id preserved so the `vw_cta_performance` series does not fork. Zero `/contact` links in the body.
`RETIRED:` `sectionYLoose` on this route · `focusRing` per-call-site (kit buttons carry it) · the "Go deeper" pill · `ResourceGate` on calculator pages · the `<dl>` · `font-serif` x5.
`JSON-LD:` SoftwareApplication + FAQPage (same array) + BreadcrumbList.

---

## 2. `/calculators/law-firm-sale-cgt` - bespoke, 181 lines

**PREMISE CORRECTION.** The brief calls this one of "the 2 bespoke calculator pages". It is that, but it is also a **live duplicate**: `lawFirmSaleCgtTool` is in the registry `tools` array (`registry.ts:32`), so `/calculators/[slug]`'s `generateStaticParams` emits `law-firm-sale-cgt` AND the static route exists. The static route wins at `/calculators/law-firm-sale-cgt` (verified: h1 renders "Practice Sale CGT Calculator" and the gate button is absent from the SSR HTML), but **`/embed/law-firm-sale-cgt` serves the registry copy, ungated, HTTP 200** (verified). Appendix G: "never a second copy of a calculator". This is generalist's G1 recurring verbatim. **S1 decides**: keep the bespoke gated renderer and delete the registry config (losing the embed), or delete the bespoke route and let `ResultGate` (§A) do the gating the bespoke file was written for.

If the bespoke route survives, order is §1 with these deltas:

1. `LawFirmSaleCgtCalculator` (`:99`) KEPT but **its private gate deleted** and replaced by the shared `ResultGate`. Its own module-global `gateModalShownThisSession` (`LawFirmSaleCgtCalculator.tsx:35`) is the documented "unlock one, unlock all" bug in a second module, and its pre-reveal state is a bare "Your figure is ready" panel, not the real result behind frosted glass.
2. **Worked examples block KEPT** (`:113-134`), restyled to card + `ExampleFigureNote`. It is the only `workedExamples` content that exists anywhere in the fleet and is the model for S2.
3. `CalculatorPageResources` (`:136`) same reduction as §1.9.

Link floor **11** (chrome only). Dash budget 0.
`Wiring:` `calculator-page-cta` preserved · `CalcResultCta` at `LawFirmSaleCgtCalculator.tsx:163` RETIRED (§A).
`JSON-LD:` SoftwareApplication + FAQPage + BreadcrumbList.

---

## 3. `/tools/equity-partner-buy-in` - bespoke premium, 414 lines

Route floor **11** (chrome only), dashes 0. The heaviest single file in the slice and the one the standard changes most.

1. JSON-LD gains **BreadcrumbList** (`:150` emits WebApplication + FAQPage only).
2. Navy motif hero, kit Breadcrumb, `Eyebrow onDark` "Premium tool · 2026/27 rates", conforming h1, `max-w-3xl` standfirst, **NET-NEW hero CTA -> `#get-expert-help`** (`:153-175`).
3. Body unclamped: `mx-auto max-w-4xl space-y-16` (`:179`) becomes `siteContainerLg` with explicit per-section `py-12 sm:py-16 lg:py-20` and oscillating grounds. `space-y-16` is not a section rhythm.
4. Intro prose section (`:182-192`) gains a figure - §0.2 forbids a prose-only section. Use a three-column `CoverageCards` naming the three funding routes, derived from `routeLabel` (`:133`) so it cannot drift from the model.
5. The "Free interactive tool" crimson chip (`:196-200`) becomes `Eyebrow`. `EquityPartnerCalculator` (`:201`) KEPT; it mounts `PremiumCalculator ... placement="calculator"`, which means **it is ungated today** (§A, this is the T7 surface).
6. Worked examples (`:205-342`) KEPT verbatim, tables restyled, **`ExampleFigureNote` added to each** - every figure here is model-derived, and §0.3 requires the note even on derived and statutory figures.
7. Methodology section (`:345-363`) KEPT. `:360` publishes 2026/27 income-tax rates: re-derive against `house_positions.md` §3 before it ships (S12).
8. `<dl>` FAQ (`:373-387`) -> `FaqSection` on the same array.
9. Closing crimson `rounded-2xl` box with a bare `/contact` link (`:391-407`) -> `#get-expert-help` `LeadCTAPanel` navy, `redirectOnSuccess={false}`.

`Wiring:` `equity-partner-buyin-page-cta` id PRESERVED, moved onto the panel; `data-cta-placement` stays `tool-page`.
`RETIRED:` 8 x `font-serif`, `sectionYLoose`, the body clamp, the `<dl>`, the bare-button CTA box.
`JSON-LD:` SoftwareApplication + FAQPage + BreadcrumbList.

---

## 4. `/calculators` index - 74 lines

Link floor **24** = 11 chrome + 13 tool cards. **The 13 cards cannot be replaced by tabs.** A tabs-only rebuild drops this route to 11 and fails the floor by 13. Two tiers, per F.5.

1. Navy motif hero `min-h-[300px] sm:min-h-[350px]`, kit Breadcrumb, `Eyebrow onDark` (`:37-48`).
2. **Copy defect, fix before design.** `:44` reads "Six solicitor-specific calculators ... built on UK 2025/26 tax rates". The registry holds **13 generic + 5 premium**. `:9` TITLE and `:41` eyebrow also say 2025/26 while `/calculators/[slug]:77` says 2026/27. `:11` DESCRIPTION enumerates six. All become 13 and 2026/27. (The homepage carries the same "6 calculators" at `src/app/page.tsx:488` - that is slice 1's row; the registry count confirmed here is 13 generic + 5 premium, and `config/service-tiers.ts:12` already says 13, so the site contradicts itself in three places.)
3. **Standfirst clause "no data collected unless you choose to follow up" is the S20 blocker.** It is not literally "no email gate" but it makes the same promise, and a modal asking for an email before a figure makes it read false. Either the copy changes ("no sign-up, and you can always skip straight to the number") or the gate does not ship on this site.
4. **Tier 1**, white: "Run one now" head block + `CalculatorTabs tabs={INDEX_HEADLINE_TABS}` + **one literal spelled-out `<a href="/calculators/sra-client-account-reserve">`**. The guard is a source scan and cannot see through a constant (§0.4, §6). A link to `/calculators` alone does NOT satisfy it.
5. **Tier 2**, `bg-slate-50`: the categorised directory, **all 13 cards retained**, `rounded-xl border-2 border-slate-200 bg-white p-3 sm:p-4 hover:border-primary-400`, icon badge `h-9 w-9 sm:h-11 sm:w-11 rounded-xl`, replacing the flat `rounded-2xl` grid (`:52-69`). **Five categories exist and no merge is needed** (verified from configs): Practice Finance (5), SRA Compliance (3), LLP / Partnership (3), Income Tax (1), Succession & Sale (1). Add a literal `CATEGORY_ORDER` constant.
6. **Net-new tail link to `/embed`.** The embed gallery is orphaned - zero inbound links site-wide. "Run a legal-sector site? Embed any of these calculators for free."
7. **Net-new `#get-expert-help` `LeadCTAPanel contained`** (`bg-slate-100 rounded-xl p-6 sm:p-10 lg:p-14 ring-1 ring-slate-200`). The index has zero ask today. Contained, not full-bleed navy: nothing follows it and navy must not touch the navy footer.

`Wiring:` net-new `calc_index_help`. Do NOT reuse the homepage's `home_calculators_all`.
`JSON-LD:` CollectionPage KEPT (`:26-31`) with `numberOfItems` now 13 + BreadcrumbList (already present, `:32`).

---

## 5. `/embed` and `/embed/[slug]` - 13 routes, NOT in the baseline

Structurally unchanged and deliberately so. Neither route appears in `link_baseline.json` (correct - `robots index:false` at `embed/[slug]:17` and `embed/page:8`, absent from the sitemap, never IndexNow'd). No link floor applies; do not add one.

- **Embeds are NEVER gated.** `CalculatorClient` already receives `variant="embed"` from `embed/[slug]:32`. §A derives `enabled` from that existing switch. **Do not add a second flag.**
- Gallery (`embed/page.tsx`) restyled to the standard scale and `rounded-xl ring-1`. Chrome-free via the existing shell bypass.
- **S3:** the gallery mounts **13 live `<iframe>`s at once** (`:59-66`), each at `tool.embedHeight`. Lazy-load or go snippet-only.

---

## 6. `/services` - 422 lines, the pricing page

Link floor **16** = 11 chrome + 5 sub-page hrefs. Dash budget **3**. Note the six `SERVICES` cards resolve to only **five distinct destinations** (`llp-accounts` is used twice, `:50` and `:102`), while `:318` claims "Six service areas" and `config/service-tiers.ts:14` claims "6 Service specialisms". Five sub-pages exist. The brief's "5, not 6" is confirmed and the six-card grid is the reason the site keeps saying six.

1. **Cream `TopicHero`** `min-h-[360px] sm:min-h-[420px] lg:min-h-[440px]` + cream motif + kit Breadcrumb, h1 to the pillar scale (`:236-248`). Hero primary -> **`#book`** (was `/contact`, `:250`); secondary `${btnOnCream}` -> `/free-firm-health-check` kept (`:253`). The `style={{background:"white"}}` inline override at `:250` retires - a per-call-site inline style on a shared button class is how a design system dies.
2. **White `StatsCounter` strip** `py-5 sm:py-7 border-b` directly under the hero. Sources from `config/service-tiers.ts` `siteStats` **after S8**: `:15` currently publishes "Same-day / Response on regulatory questions", a turnaround promise, and `:14` publishes a count that is wrong.
3. **PRICING TIERS SECTION REBUILT, NOT DELETED** (`:261-308`). Per owner decision 3 the price line goes and what-you-get replaces it, so the reader can still choose a level.
   - `:294` renders `tier.monthly`. The field and its three values (`:110` "From £180/mo", `:122` "From £450/mo", `:136` "Bespoke") are **deleted from `PRICING_TIERS`**, not blanked.
   - Replace each with a **scope line**: who the tier is for and where the boundary sits ("Sole practitioner or up to three fee-earners; compliance floor only" / "Multi-partner LLP; management accounts and partner-level planning" / "Transactional: sale, acquisition, ABS conversion").
   - **RECOMMENDED: adopt the shared `packages/web-shared/components/ServiceTiers.tsx` here and delete the local grid.** It already exists, the site already imports it (`src/app/page.tsx:464`), and `config/service-tiers.ts` already holds a three-tier array. That kills the duplicate rather than restyling it. Pass `featuredBadge=""` to keep the featured tier's ring while suppressing the badge - **and read T13: omitting the prop leaves the shared default "Most Popular" rendering.** The homepage currently passes `featuredBadge="Most chosen"`, which is a client-behaviour assertion; so is `:287`'s "Most chosen" pill here, and so is `:272` "Most firms start on Essentials or Growth". All three go.
   - `config/service-tiers.ts:47` "Fixed monthly fee from £180/mo" is a **fourth live price**, inside the shared-component data. It must go in the same edit or the price simply moves to the homepage.
4. **Service cards -> `CoverageCards columns={3}`** on white (`:310-350`), copy verbatim, `rounded-2xl` -> `rounded-xl ring-1`. Decide S9 (six cards / five destinations) before writing the count into the h2.
5. **"What's included" -> `DrawnTickList`** on `bg-slate-50` with `tickClassName="text-emerald-600"` (`:352-376`; the ✓-in-a-crimson-circle pattern and the `border-y` divider both retire). `:150` "Same-day response on regulatory or SRA-deadline questions" is a **turnaround promise** and comes out (S8). `:151` "Fixed monthly fees, no hourly billing on routine work" is a fee-model statement, not a price - S7 decides whether the fee-model vocabulary survives at all.
6. **`ProcessTimeline` net-new** between the cards and the ask: the annual cycle the hero promises has no visual anywhere on the page. S10 = authored copy.
7. **FAQ -> `FaqSection`** on the same array as the schema (`:378-397`, `:228`). Four answers are rule breaches, all in `FAQS`: `:162` "the bulk of the book" (client-count), `:167` "aim to issue clean reports 4-6 weeks ahead" (turnaround), `:182` "Most firms benefit" (most-qualify framing), `:197` the whole fee-structure answer (pricing). Rewrite, do not delete the questions.
8. **Closing crimson band -> `#book` `LeadCTAPanel` navy, `redirectOnSuccess` TRUE** (`:399-419`). `:407` "30-minute scoping call ... what the fee would be" survives as the panel description minus the fee clause.

`Wiring:` `hero_book`, `hero_health_check`, `services_book`. The current section has no `data-cta` attributes at all (`:410`, `:413`) - these are net-new, and a net-new id needs a deploy-watch baseline restatement in the same commit.
`RETIRED:` `PRICING_TIERS.monthly` · the "Most chosen" pill · `sectionYLoose` x2 · `font-serif` x11 · the `<dl>` · the local tier grid (if S9 adopts the shared one) · `bg-[var(--background)]`/`--surface` alternation in favour of explicit white/slate-50.
`JSON-LD:` Organization + Service (**+OfferCatalog from the service titles, no `offers`, no `priceRange`**) + AccountingService + BreadcrumbList + FAQPage. All five already emit (`:229`); keep the `@id` pointer to the site-wide Organization node (`:212`), it is correct.

---

## 7. `/services/[slug]` - 5 pages, ONE file, and they are missing from the sitemap

**PREMISE CORRECTION, and this is the most important finding in the slice.** The brief says to quote the link floor for every route in scope. **These five routes are not in `link_baseline.json` at all** - and they are not in the baseline because **they are not in the sitemap**. Verified: `curl http://localhost:3121/sitemap.xml | grep services` returns `/services` and four blog posts. Nothing else. All five sub-pages return HTTP 200 and are linked from `/services`, so they are crawlable, but they are excluded from the sitemap, from the link-floor safety net, and from the em-dash budget.

This is a **live SEO defect, not design work**. Every one of them was built to target a named GSC cluster (`data.ts:5-12`). Fix belongs to whichever slice owns `src/app/sitemap.ts`; flagged here because Slice 2 is where it was found.

Floors measured live at the pre-port SHA, to be used as this slice's floor since the baseline has none:

| Route | Unique internal links (measured) | Em-dashes (measured) |
|---|---|---|
| `/services/solicitor-accountants` | 18 | 4 |
| `/services/sra-accounts-rules` | 18 | 6 |
| `/services/llp-accounts` | 19 | 10 |
| `/services/practice-valuation` | 18 | 8 |
| `/services/cofa-compliance-support` | 18 | 14 |

**42 em-dashes across five unprotected pages.** They must all go, and no baseline would have caught them.

Template order (`src/app/services/[slug]/page.tsx`, 239 lines, renders all five):

1. Cream `TopicHero` + motif + kit Breadcrumb (`:62-89`); hero primary -> **`#book`** (was `/contact`, `:77`), secondary keeps `/free-firm-health-check`.
2. Body unclamped; the `lg:grid-cols-[1fr_320px]` two-column with a sticky aside (`:94`, `:137`) is KEPT - it is the §0.1-sanctioned "something useful beside it" answer, not a clamp.
3. `page.sections` (`:96-117`) - **prose + bullets only, on every one of the five pages.** §0.2 violation x5. Each section takes a figure derived from its own copy: the SRA-report sections take a `ProcessTimeline`, the FA 2014 sections take a `PenaltyLadder`-shaped condition ladder on the **amber/orange/fuchsia** ramp (not red), the valuation section takes a `ComparisonTable`. The bullet `<li>` dot rows become `DrawnTickList`.
4. `workedExample` block (`:119-133`) KEPT, `border-l-4` retained (it is the sanctioned figure recipe), **`ExampleFigureNote` added**.
5. Aside cards: "Who this is for" and "Related services" KEPT as-is (they carry the internal links that make the floor); `rounded-2xl` -> `rounded-xl ring-1`. The `→` glyph prefix on link labels (`:163`, `:181`) becomes a real icon or nothing.
6. FAQ `<dl>` (`:196-207`) -> `FaqSection` on the `page.faqs` binding already fed to `buildFaqPage` at `:55`.
7. Closing crimson section holding a bare `LeadForm` in a white card (`:213-236`) -> `#book` `LeadCTAPanel` navy, `redirectOnSuccess` currently `false` (`:231`) **flips TRUE** - this is a pillar page, not a calculator surface, and false costs the booking-picker step. **S16.**
   - `:229` "We will be in touch within 24 hours." is a **turnaround promise**. Delete.
   - The form ground is already a white card on the navy panel, which satisfies the D.1 invariant (labels are slate-900). Re-verify on the rendered DOM anyway; the invisible-label bug is what this check exists for.

**Content breaches in `data.ts` (the data file, not the template):**

| Line | Rule | Text |
|---|---|---|
| `:93` | our pricing | "Fixed monthly fee around £1,800-£2,200 depending on scope. Specialist work ... priced separately" |
| `:100` | turnaround | "We aim to issue clean reports 4-6 weeks ahead of that deadline" |
| `:105` | client-count | "the bulk of the book is solicitors, LLPs..." |
| `:110` | client-behaviour | "Most of our clients run Xero or QuickBooks" |
| `:113-115` | our pricing | "How much do you charge?" / "Essentials tier from £180/month ... Growth tier from £450/month ... typically £4,000-£12,000 ... All fixed-fee, no hourly billing" |
| `:126` | pricing-adjacent | "what the fee would be" |
| `:205` | turnaround | "We aim to issue your report 4-6 weeks ahead of the deadline as a routine matter" |
| `:221` | pricing-adjacent | "a fixed fee for the report and any control improvements" |
| `:306` | pricing-adjacent | "quote a fixed monthly fee" |

`:113-115` is the answer to "How much do you charge?", so it cannot be blanked - replace with what changes between levels, per owner decision 3. **Separate our-price from statutory-threshold by RULE**: `docs/solicitors/house_positions.md` §5.G carries the SRA Rule 12.2 £10,000/£250,000 exemption and there are ~686 `£` figures on this site that are statutory and stay. The nine rows above were found by pattern (`£N/mo`, `From £`, `per month`, `fee`, `charge`, `hourly billing`), not by searching for `£`.

`Wiring:` `hero_book`, `services_sub_book`, `sidebar_health_check`. No `data-cta` exists on this template today; all net-new.
`JSON-LD:` Service + BreadcrumbList + FAQPage (all three already emit, `:56`). Add nothing; no `offers`, no `priceRange`.

---

## 8. `/locations` index - 89 lines

Link floor **16** = 11 chrome + 5 city cards. Recorded dash budget **0** - **and that is already wrong**: `curl http://localhost:3121/locations | grep -c '—'` returns **1**. The em-dash lives in the metadata description at `locations/page.tsx:11` (`${siteConfig.name} — specialist...`), which the baseline capture evidently did not count. **The verification crawl will report a false regression on this route until this is fixed.** Fix the source; do not raise the budget.

1. Navy motif hero replacing the bare `contentNarrow` block with no hero at all (`:38-50`). Kit Breadcrumb, `Eyebrow onDark` "UK-wide coverage", conforming h1, `max-w-3xl` standfirst, **NET-NEW hero CTA -> `#book`**.
2. Body unclamped: `contentNarrow` (`:38`) is a `max-w-3xl` body clamp on the whole page.
3. City cards (`:52-69`): `card-premium rounded-xl` -> standard `rounded-xl bg-slate-50 p-6 sm:p-8 ring-1 ring-slate-200/70 hover:border-primary-600` on a white section. All five retained. Add the county from `niche.config.json` `locations[].county` as the sub-line - it is already in the data, unused, and it is what makes a card worth reading.
4. "Remote service" box (`:71-78`) KEPT, `rounded-2xl border` -> `rounded-xl ring-1`. Gains a `ProcessTimeline` figure (remote engagement: onboarding, shared ledger, quarterly, year end) - §0.2, it is prose-only today.
5. `CTASection` (`:80-85`) -> **`#book` `LeadCTAPanel contained`**. Rationale is Property's own recorded one: someone whose city has no page converts instead of bouncing off a list that excludes them.
6. **Raw `<script type="application/ld+json">` with `dangerouslySetInnerHTML`** (`:34-37`) -> the kit `JsonLd` component the rest of the site uses. Add **BreadcrumbList + WebPage**; today the page emits Organization only.

`Wiring:` net-new `locations_book`.
`RETIRED:` `contentNarrow` · `CTASection` on this route · `card-premium` · `font-serif` x3 · the em-dash at `:11`.

---

## 9. `/locations/[slug]` - 5 pages, ONE file

Link floor **12** each (11 chrome + `/locations` back-link, and on London one more), dashes: London 1, the rest 0. Five cities from `Solicitors/niche.config.json` `locations` - confirmed (`london, manchester, birmingham, leeds, bristol`), reached through `siteConfig.locations` (`:14`, `:19`, `:150`).

Property's template (`Property/web/src/app/locations/[slug]/page.tsx`) records that the inner `max-w-4xl` clamp was DELIBERATELY removed and `contained` used because the section above is light. Mirror both decisions.

1. Navy motif hero: kit Breadcrumb, `Eyebrow onDark` = the county from niche config (`content.areas` currently buries it in prose), h1 from `loc.title`, standfirst `content.intro`, `DrawnTickList` trust row, **NET-NEW hero CTA "Speak to an accountant in {cityName}" -> `#book`** (`:195-210`).
2. `contentNarrow` (`:195`) removed - body runs `siteContainerLg`.
3. "Areas we cover" (`:212-219`) -> white section, chips `rounded-full bg-white ring-1 ring-slate-200 text-xs font-semibold text-slate-600` parsed from `content.areas`, not a paragraph. **London's `:53` em-dash disappears with the prose.**
4. "Why choose a specialist" (`:221-228`) -> `bg-slate-50`, prose + a figure. §0.2.
5. Services (`:230-246`) -> white `CoverageCards columns={2}`, `card-flat` retired. **The three-service array is inline per city and duplicates `/services`' service lines.** Lift to a module constant shared with `/services` so the two cannot drift. **British English: `optimization` at `:62`, `:100`, `:120` and `optimization` in "expense optimization" `:85`.**
6. Local posts list (`:248-269`) -> `RelatedArticles columns={3}`, `slice(0,5)` kept. Note the filter (`:164-166`) matches on the city name appearing in a post slug or title, which on this corpus returns **zero posts for all five cities** - the section never renders. **S17: pick a fallback hub** (the category hub matching the city's dominant sector) or the section is dead code on all five pages.
7. "Remote service" box (`:271-278`) KEPT. `:276` "While we work with many {cityName}-based solicitors and law firms" is a **client-count claim**. Rewrite to the capability, not the book.
8. Bare `btnPrimary -> /contact` (`:280-284`) + `CTASection` (`:286-291`) -> ONE `#book` `LeadCTAPanel contained`. Two asks stacked at the foot, one of them a bare button, is the §0.5 failure twice over.
9. Schema (`:170-193`): `buildAccountingService` enrichment KEPT wholesale (`areaServed`, city, no `telephone` - the comment at `:168` is correct and the omission is deliberate). Add **BreadcrumbList + FAQPage**. There is no FAQ on these pages today; five city-specific FAQs are net-new content (**S18**), and a light FAQ after the panel is also what keeps navy off the navy footer.

`Wiring:` `hero_book_{city}` is wrong (never reuse an id across routes with a per-route suffix that forks the view) - use `location_hero_book` and `location_book`, both with `data-cta-placement="location"`.
`RETIRED:` `contentNarrow`, `CTASection`, `card-flat`, the double ask, `font-serif` x6.

---

## 10. The four `/for-*` audience pages - ONE shared layout

`src/components/audience/AudienceStageLayout.tsx` (251 lines) renders all four. The four `page.tsx` files (126 lines each) are pure data. **Edit the layout once and the data files only where copy breaches a rule.** Floor **14** on all four (11 chrome + 3 `relatedGuides`). Dashes: `for-partners` 7, `for-junior-solicitors` 4, `for-firm-buyers` 1, `for-locum-solicitors` 1.

1. Hero (`:56-75`): navy motif, kit Breadcrumb, `Eyebrow onDark`. The `badge` pill (`:61-63`) and the `eyebrow` `<p>` (`:64-66`) are two eyebrows stacked; the badge becomes a `DrawnTickList` trust row and the eyebrow becomes the kit `Eyebrow`. **NET-NEW hero CTA -> `#book`.**
2. **Stats strip** (`:77-93`): currently `bg-[var(--primary-dark)]`, a second dark band immediately under a dark hero - two touching sections sharing a ground (§0.1). Moves to a **white `StatsCounter` strip `py-5 sm:py-7 border-b`**. Every value is a statutory figure, so **`ExampleFigureNote` is required** (`StatsCounter`'s exemption is for our own proof claims only, and these are not that). **T15: any animated counter must SSR its true value.** `for-partners:20` `"14%→18%"` and `:19` `"£1m"` must be re-derivable from `house_positions.md` §9 (BADR 18% from 6 Apr 2026 is confirmed in the ground-truth memory); `for-junior-solicitors:18-20` publishes 2025/26 thresholds on a 2026/27 site (**S13**); `for-locum-solicitors:18` "£80k+ Typical Ltd-co break-even" is an unsourced generalisation (**S14**).
3. Concerns grid (`:95-125`) KEPT as `CoverageCards columns={3}`; numbered circular badges retire (a grid of six equivalent concerns is correctly a grid, but the numbering implies a sequence it does not have). `for-partners:25` "Most fixed-share partners pass; some don't" is **most-qualify framing** - rewrite to the test, not the odds.
4. "How we work" numbered `border-l-4` rows (`:127-158`) -> **`ProcessTimeline`**. A numbered list of stages IS a sequence, and §0.2 says a grid actively contradicts one. Body clamp `max-w-4xl` (`:130`) removed.
5. **Health-check CTA section** (`:160-180`): `rounded-3xl border-2 bg-[var(--accent-soft)]` card holding a bare `LeadForm` -> **`#book` `LeadCTAPanel`**. §0.5: never a bare `LeadForm` in a coloured card. The current ground is light so labels render (D.1 satisfied) - **re-verify on the rendered DOM, then move it.** `redirectOnSuccess={false}` (`:176`) flips **TRUE** (S16). `:166` "Free 10-minute practice health check" is a duration claim about our own process, not a turnaround promise; it stays.
6. FAQ `<dl>` (`:182-206`) -> `FaqSection` on the `data.faqs` binding already fed to `buildFaqPage` at `:44`.
7. **Related guides (`:208-248`) - the §0.4 row.** The section is a crimson full-bleed band of link cards, and **on all four pages one of the three cards points at a calculator**: `for-firm-buyers:107` `/calculators/law-firm-valuation`, `for-junior-solicitors:107` and `for-locum-solicitors:102` `/calculators/partnership-vs-llp-take-home`, `for-partners:107` `/calculators/llp-profit-share-allocation`. §2 standing rule: **a calculator never gets a related-reading card.** Each becomes a live `CalculatorTabs` block with a one-tab list, and the two remaining guide cards become `RelatedArticles columns={2}` on `bg-slate-50`.
   - **The tabs block emits no crawlable link, so each of the four pages owes one literal spelled-out `<a href="/calculators/<slug>">` in its own markup.** Four different slugs, four literal hrefs, because the guard is a source scan. Losing the card and not replacing the link drops each route from 14 to 13 and fails the floor.
   - The band's crimson ground retires; the "Browse all pillar guides" button (`:241`) stays and keeps `/solicitor-guides` in the count.

`Wiring:` `audience_hero_book`, `audience_book`, plus `calc_*` ids emitted by the tabs' own `CalculatorClient`. No `data-cta` exists on this layout today.
`JSON-LD:` BreadcrumbList + FAQPage already emit (`:48`). Add **Service** naming the audience.
`RETIRED:` `sectionYLoose`, `bg-[var(--primary-dark)]` stats band, `rounded-3xl`, `border-l-4` numbered rows, the `<dl>`, `font-serif` x9, the four calculator link-cards.

---

## A. RESULT-GATE DECISION (capture-surface change, owner sign-off)

### A.1 The single edit point, and the T7 trap

**Wire the gate in `src/components/tools/CalculatorClient.tsx` and nowhere else.** That file is the one client boundary every generic-fleet render passes through: `/calculators/[slug]:93`, `/embed/[slug]:32`, and every future `CalculatorTabs` panel (the tabs mount `CalculatorClient` by slug, per §6 "never a second copy"). Putting the gate in a page file is exactly the phase-4 generalist failure: gated on one page, ungated in the tab strip on the two highest-traffic surfaces.

The change is four lines, copied from `generalist/web/src/components/tools/CalculatorClient.tsx:34-47`: swap the `resultCta` prop for `resultWrapper`. **The hook already exists** - `packages/web-shared/tools/components/Calculator.tsx:42` declares `resultWrapper = (node) => node` defaulting to identity and applies it at `:122`, wrapping the RESULT COLUMN only. No shared-package edit is needed for this slice. (Verified; the brief's premise is correct.)

`enabled` derives from the **existing** `variant === "embed"` switch. Do not add a second flag.

### A.2 Every place a calculator renders, and its gate state

| Surface | File | Renders via | Gate |
|---|---|---|---|
| `/calculators/[slug]` (12 pages) | `calculators/[slug]/page.tsx:93` | `CalculatorClient variant="page"` | **GATED** |
| `/embed/[slug]` (13 routes) | `embed/[slug]/page.tsx:32` | `CalculatorClient variant="embed"` | **NEVER** |
| `/embed` gallery previews | `embed/page.tsx:59` | iframes into `/embed/<slug>` | **NEVER** (inherits) |
| `CalculatorTabs` panels (net-new: `/calculators` Tier 1, four `/for-*` pages) | new `components/tools/CalculatorTabs.tsx` | `CalculatorClient` by slug | **GATED** (automatically, via the same boundary) |
| `/calculators/law-firm-sale-cgt` bespoke | `LawFirmSaleCgtCalculator.tsx` | its own renderer | **GATED** - replace its private module-global gate with `ResultGate` |
| `/tools/equity-partner-buy-in` | `EquityPartnerCalculator.tsx:6` | `PremiumCalculator placement="calculator"` | **UNGATED TODAY.** S5. |
| `/calculators/[slug]` premium island | `CalculatorPageResources.tsx:54` | `PremiumUpgrade placement="calculator"` | **UNGATED TODAY.** S5. |
| Blog premium island | `BlogPostRenderer.tsx:213` | `PremiumUpgrade placement="blog"` | gated by `ResultGateModal`, module-global once-per-session |

The last three rows are the T7 shape already present in the codebase: `PremiumCalculator.tsx:494` reads `const gated = placement === "blog" && !isConverted()`, so **two of the three premium surfaces are ungated and one is**, and the two ungated ones are calculator pages.

### A.3 Persistence keys must NOT be shared

Port `resultGateStorage.ts` from `generalist/web/src/components/calculators/` with the key prefix **changed for this site** (`afl_calc_revealed_${campaign}`, matching the site's existing `afl-embed-height` namespace). Then:

- The new generic `ResultGate` uses `wasRevealed/rememberRevealed(slug)` - one key per calculator.
- The premium `ResultGateModal` path keeps its own separate memory. **Do not point `PremiumCalculator` at the same key.** A shared key re-creates the "unlock one, unlock all" bug named verbatim in Property's `ResultGate.tsx:20-22`.
- `PremiumCalculator.tsx:38` `let gateModalShownThisSession = false` and `LawFirmSaleCgtCalculator.tsx:35` (a **second, independent** module-global with the same name) are both that bug at module scope. Re-key each onto a per-campaign entry in its own namespace. Two modules, two globals, two fixes.

### A.4 Files to build local (port from generalist, ~180 lines total)

`src/components/calculators/ResultGate.tsx`, `HeldResult.tsx`, `resultGateStorage.ts`, ported from `generalist/web/src/components/calculators/`. Deltas for this site:
- `ResultGateModal` import points at the existing `@/components/tools/premium/ResultGateModal` (it is already the correct shape: reveals on X, "No thanks", backdrop and Esc; fires `cta_click{result_gate_skip}`; `MiniCapture` on a white ground).
- `HeldResult` prompt copy: "Your figure is ready. Have a specialist confirm it, or skip straight to the numbers."
- `HeldResult` `ground="navy"` everywhere in this slice; `btnPrimary`/`btnSecondary` come from the site's `layout-utils` (both exist, `:20` and `:24`).
- The revealed CTA lives **inside the same div as the result** (`ResultGate.tsx:91-96`); it is a documented layout trap, not a style choice.

### A.5 What retires

`src/components/tools/CalcResultCta.tsx` loses its two calculator call sites (`CalculatorClient.tsx:32`, `LawFirmSaleCgtCalculator.tsx:163`) and survives only for the blog premium island (`PremiumCalculator.tsx:664`), exactly as Property does it. Property's measured argument: an always-visible capture below an already-satisfied reader converts at roughly 4% of the gate's rate.

**Its copy is a live rule breach regardless of the gate decision:** `CalcResultCta.tsx:21` ends "we reply within one working day", and `ResultGateModal.tsx:118` `successText` reads "we will be in touch within one working day". Both are turnaround promises. **S6.**

### A.6 The blocker

**S20: `/calculators/page.tsx:44` promises "All run in your browser; no data collected unless you choose to follow up with us."** A modal asking for an email before a figure makes that read false. Either the copy changes or the gate does not ship. Owner decides. Everything else in §A is ready to build.

**Full capture sign-off list:** ResultGate x12 generic + 1 bespoke · CalcResultCta removed from 2 calculator call sites · ResourceGate removed from the calculator island · two premium module-globals re-keyed · premium `placement="calculator"` surfaces gated or explicitly exempted (S5) · `redirectOnSuccess` flips on `/services/[slug]` x5 and `/for-*` x4 (S16) · six net-new `LeadCTAPanel` mounts on routes that have no on-page form today.

---

## B. CALCULATOR-TABS MAP

Build LOCAL at `src/components/tools/CalculatorTabs.tsx`. **There is no shared twin** - `CalculatorTabs` is Property-local (`Property/web/src/components/calculators/CalculatorTabs.tsx`) and generalist built its own (`generalist/web/src/components/tools/CalculatorTabs.tsx`). Confirmed: Solicitors imports **zero** modules from `packages/web-shared/design/` today (verified, `grep -rn "web-shared/design" src | wc -l` = 0), so this slice's kit adoption is all net-new.

Shape, from Property via generalist: WAI-ARIA tablist, roving tabindex, Arrow/Home/End, `#hash` deep link, `next/dynamic` panels with a sized `loading` placeholder (zero CLS), a **literal** `TABLIST_COLUMNS` map (Tailwind scans literals, not computed strings), tab `rounded-xl border-2 p-3 sm:p-4`, selected `border-primary-600 bg-primary-600 shadow-md`, icon badge `h-9 w-9 sm:h-11 sm:w-11 rounded-xl`, panels `mt-6 sm:mt-8`. Every tab renders `CalculatorClient` by slug - **never a second copy of a tool.**

`TabKey` union (6, one per adoption site plus the index set):

| Key | Slug | Rendered on |
|---|---|---|
| `clientreserve` | `sra-client-account-reserve` | `/calculators` Tier 1 |
| `salariedmember` | `fa-2014-salaried-member` | `/calculators` Tier 1 |
| `takehome` | `partnership-vs-llp-take-home` | `/calculators` Tier 1, `/for-junior-solicitors`, `/for-locum-solicitors` |
| `valuation` | `law-firm-valuation` | `/calculators` Tier 1, `/for-firm-buyers` |
| `profitshare` | `llp-profit-share-allocation` | `/calculators` Tier 1, `/for-partners` |
| `reserve` | `partner-tax-reserve` | (spare; not mounted in this slice) |

`INDEX_HEADLINE_TABS` (5, the bundle ceiling - every listed panel mounts and downloads, so do not pad): `clientreserve, salariedmember, takehome, valuation, profitshare`.

**Crawl-path obligation, one literal `<a href>` per rendering page** (§0.4; the guard is a source scan and cannot see through a constant):

| Page | Literal href it owes |
|---|---|
| `/calculators` | `/calculators/sra-client-account-reserve` |
| `/for-partners` | `/calculators/llp-profit-share-allocation` |
| `/for-junior-solicitors` | `/calculators/partnership-vs-llp-take-home` |
| `/for-locum-solicitors` | `/calculators/partnership-vs-llp-take-home` |
| `/for-firm-buyers` | `/calculators/law-firm-valuation` |

**Guard test net-new:** `src/tests/calculator-tabs-crawl-path.test.ts`, the site-parameterised consumption of `@accounting-network/web-shared/design/guards/calculator-tabs-crawl-path`, copied from `generalist/web/src/tests/calculator-tabs-crawl-path.test.ts` with `toolRoutePrefix: "/calculators/"`, `toolIndexRoute: "/calculators"`, and **both exemption lists empty**. Solicitors has no `src/tests/calculator-tabs-crawl-path.test.ts` and no `CalculatorLinkCards` component today; the guard names `linkCardsTag` in its failure message as the remedy, so `linkCardsTag: "<CalculatorLinkCards"` stays configured even with no such component in the tree.

**No tabs on** `/services`, `/services/[slug]`, `/locations`, `/locations/[slug]`, `/calculators/[slug]` (the tool's own page), or the two bespoke tool pages. A pillar or location page is not about a calculation; it gets a plain nav link.

---

## C. KIT-VS-LOCAL (slice 2)

**ADOPT FROM KIT** (all net-new to this site): `layout-utils` (retires the divergent local `sectionY`/`sectionYLoose`/`contentNarrow`), `globals-standard.css`, page-blocks, `FaqSection`, `Breadcrumb` (retires the local `src/components/ui/Breadcrumb`), `Eyebrow`/`EyebrowRule`, `Prose`, `ExampleFigureNote`, `NoticeCard`, `LeadCTAPanel` (retires the local `CTASection`), `TopicHero`, `CoverageCards`, `ProcessTimeline`, `DrawnTickList`, `StatsCounter`, `ComparisonTable`, `RelatedArticles`, `JsonLd` schema builders where they exist.

**KEEP:** the shared `web-shared/tools` renderer and its existing `resultWrapper` prop - Solicitors is ahead of Property on shared consumption (§4.6.3) and nothing about this slice changes that. `MiniCapture` (shared, `web-shared/leads/MiniCapture`). `buildAccountingService` on the location pages (already shared, already correct, already omits `telephone`).

**ADOPT AND FIX:** `packages/web-shared/components/ServiceTiers.tsx` on `/services` - it is already imported by this site's homepage, and adopting it deletes the local `PRICING_TIERS` grid rather than restyling a duplicate. Pass `featuredBadge=""` explicitly (T13). **Never edit the kit component to fix a Solicitors problem** - that changes Property and 14 other sites (T12, and the manager-direct carve-out).

**BUILD LOCAL:** `CalculatorTabs`, `ResultGate`/`HeldResult`/`resultGateStorage`, the navy/cream motif backdrop (slice 1 owns the file; slice 2 consumes it), `lib/page-summaries.ts`, `src/tests/calculator-tabs-crawl-path.test.ts`.

**RETIRE:** `CalcResultCta` at its two calculator call sites (file survives for the blog island) · `ResourceGate` on calculator pages · `CTASection` · the local `PRICING_TIERS` grid · `card-premium` / `card-flat` CSS classes on these routes · the six hand-rolled `<dl>` FAQs · `sectionYLoose` · `contentNarrow` · 65 `font-serif` uses.

**KEEP-RESTYLE:** the premium fleet (`PremiumCalculator`, `PremiumUpgrade`, `PremiumBarChart`, `MobileToolSlot`, `ResultGateModal`) - tokens, radii, gate re-key and the a11y fix only. Do not rewrite.

---

## D. `PremiumBarChart` disposition (T16) - and a correction

**The brief's premise is half right.** `src/components/tools/premium/PremiumBarChart.tsx:97` does set `role="img"` on the `<svg>`. But the **wrapping `<div>` at `:88` already carries `aria-hidden="true"`**, so the subtree is not merely collapsed to one label - it is removed from the accessibility tree entirely. `role="img"` on `:97` is dead code sitting inside an `aria-hidden` container.

So the accurate finding is: **the chart is deliberately decorative, and it is the only rendering of its data.** `PremiumCalculator.tsx:638` renders it between `ScenarioTiles` and `Workings`, and `Workings` (`:411`) puts the rows inside a collapsed `<details>` - so a screen-reader user reaches the numbers only by opening "Show the workings", and the chart's own series values are never text anywhere.

Disposition:
1. **Delete `role="img"` and `aria-label` from the `<svg>` (`:97-99`).** They do nothing under an `aria-hidden` parent and their presence is what makes the file look already-handled.
2. **Keep `aria-hidden="true"` on the wrapper (`:88`)** and keep the bars decorative. That is the correct answer once the values are reachable elsewhere.
3. **Add a visually-hidden `<table>` sibling** (or a `<figcaption>` list) emitting each group label and each series value as **text nodes**, using the existing `formatValue` helper (`:24`) so the accessible text and the drawn bars cannot disagree. This is the "values as text nodes, decorative bars aria-hidden" rule from T16, applied where it actually bites.
4. `ExampleFigureNote` under the chart (§0.3).

Not a design gate; it is an accessibility floor (§0.7) and ships with the premium restyle.

---

## E. LINK FLOORS FOR EVERY ROUTE IN SCOPE

From `docs/solicitors/_port/link_baseline.json` (274 routes), plus five measured live because the baseline omits them.

| Route | Floor | Dash budget | Note |
|---|---|---|---|
| `/calculators` | **24** | 0 | 11 chrome + 13 tool cards. Tabs must NOT replace the directory. |
| `/calculators/client-account-interest` | 11 | 0 | chrome only |
| `/calculators/colp-cofa-checker` | 11 | 0 | chrome only |
| `/calculators/fa-2014-salaried-member` | 11 | **5** | chrome only |
| `/calculators/indemnity-premium-estimator` | 11 | **4** | chrome only |
| `/calculators/law-firm-sale-cgt` | 11 | 0 | bespoke route (S1) |
| `/calculators/law-firm-valuation` | 11 | **3** | chrome only |
| `/calculators/llp-profit-share-allocation` | 11 | 0 | chrome only |
| `/calculators/partner-tax-reserve` | 11 | 0 | its `related` holds 2 dead slugs |
| `/calculators/partnership-vs-llp-take-home` | 11 | 0 | chrome only |
| `/calculators/practice-cashflow-runway` | 11 | 0 | chrome only |
| `/calculators/solicitor-hourly-rate-benchmark` | 11 | 0 | chrome only |
| `/calculators/sra-client-account-reserve` | 11 | **6** | chrome only |
| `/calculators/vat-disbursements-classifier` | 11 | 0 | chrome only |
| `/tools/equity-partner-buy-in` | 11 | 0 | chrome only |
| `/services` | **16** | **3** | 11 chrome + 5 sub-pages |
| `/services/solicitor-accountants` | **18** (measured) | **4** (measured) | not in baseline |
| `/services/sra-accounts-rules` | **18** (measured) | **6** (measured) | not in baseline |
| `/services/llp-accounts` | **19** (measured) | **10** (measured) | not in baseline |
| `/services/practice-valuation` | **18** (measured) | **8** (measured) | not in baseline |
| `/services/cofa-compliance-support` | **18** (measured) | **14** (measured) | not in baseline |
| `/locations` | **16** | **0 (WRONG, see §8)** | live count is 1 |
| `/locations/birmingham` | 12 | 0 | |
| `/locations/bristol` | 12 | 0 | |
| `/locations/leeds` | 12 | 0 | |
| `/locations/london` | 12 | 1 | |
| `/locations/manchester` | 12 | 0 | |
| `/for-firm-buyers` | **14** | 1 | 11 chrome + 3 guide cards; one card becomes tabs |
| `/for-junior-solicitors` | **14** | **4** | as above |
| `/for-locum-solicitors` | **14** | 1 | as above |
| `/for-partners` | **14** | **7** | as above |
| `/embed`, `/embed/[slug]` x13 | **n/a** | n/a | noindex, not in sitemap, not in baseline. Correct. |

**The floor arithmetic that matters:** the `/for-*` pages sit at 14 with exactly 3 body links each. Converting one guide card to a tabs block removes one anchor. If the literal `<a href>` (§B) is not added in the same edit, all four routes fail by one. And the 12 generic calculator pages sit at 11 with **zero** body links, so every net-new body link in §1 is headroom - but a broken chrome link would be immediately fatal.

---

## F. OWNER GATES (S0-S20)

| # | Gate |
|---|---|
| **S0** | Warning ramp sign-off (amber-700 / orange-700 / fuchsia-700 / violet-700). Blocks all result tones, verdict tones, and the FA 2014 condition ladders on `/services/[slug]`. |
| **S1** | `law-firm-sale-cgt` exists twice: registry generic (live at `/embed/law-firm-sale-cgt`) AND bespoke route. Delete the config or delete the route. Live standard breach either way. |
| **S2** | 0 of 13 configs carry `workedExamples`. Thirteen content commissions, or the GEO field stays absent. |
| **S3** | `/embed` gallery mounts 13 live iframes at once. Lazy-load, or snippet-only. |
| **S4** | 6 of 13 configs carry no `related[]`. The RelatedArticles section renders nothing on those six; a calculator link-card is never the substitute (§2). Commission six, or accept six bare pages. |
| **S5** | Two premium surfaces (`/tools/equity-partner-buy-in`, the `/calculators/[slug]` island) run `placement="calculator"` and are UNGATED while the blog one gates. Gate them, or record the exemption. |
| **S6** | Turnaround promises in capture copy: `CalcResultCta.tsx:21` and `ResultGateModal.tsx:118` both say "within one working day"; `services/[slug]/page.tsx:229` says "within 24 hours". Removing them changes conversion copy on every capture surface. |
| **S7** | Fee-model vocabulary. Owner decision 3 removes prices; does "fixed monthly fees / no hourly billing" survive as a positioning claim? It appears in `services/page.tsx:10,151,197,247`, `page.tsx:23,27`, and three `ctaBody` strings. |
| **S8** | `config/service-tiers.ts` audit: `:15` "Same-day" response is a turnaround promise, `:14` "6 Service specialisms" is wrong (five destinations), `:47` carries a fourth live price. This file feeds the homepage too. |
| **S9** | Six service cards, five destinations, three places claiming "six". Add a sixth sub-page, or drop to five cards and correct the count. |
| **S10** | `/services` `ProcessTimeline` copy (the annual cycle). Authored content. |
| **S11** | `/services` FAQ rewrites: four of eight answers breach a locked rule. |
| **S12** | `/tools/equity-partner-buy-in:360` publishes a full 2026/27 rate set. Re-derive against `house_positions.md` §3 or it does not publish. |
| **S13** | `/for-junior-solicitors:18-20` publishes 2025/26 thresholds. Update to 2026/27, or scope the label. |
| **S14** | `/for-locum-solicitors:18` "£80k+ Typical Ltd-co break-even" is unsourced. Derive or strike. |
| **S15** | `partner-tax-reserve.ts:152-153` link to two slugs that 404. Data fix; blocks §1.12. |
| **S16** | `redirectOnSuccess` flips false -> true on `/services/[slug]` x5 and `/for-*` x4. Measurable funnel change on 9 routes; false currently costs the booking-picker step. |
| **S17** | `/locations/[slug]` local-post filter returns zero posts on all five cities, so the section is dead code. Pick a fallback hub or delete it. |
| **S18** | `/locations/[slug]` FAQs are net-new content x5, and five city pages competing in local search may not share the first 60 characters of any answer. |
| **S19** | Sitemap defect: five `/services/[slug]` pages render 200, are linked from `/services`, and are **absent from `sitemap.ts`** and therefore from the link baseline. Not design work; needs an owner call on whether it ships inside the port or as a separate fix. |
| **S20** | **Highest risk.** `/calculators:44` promises "no data collected unless you choose to follow up". A result gate asking for an email makes that false. Change the copy, or the gate does not ship. |

**Standing verifications, not gates:** re-verify the rendered ground of every `LeadForm` before and after it moves (D.1 invisible-label invariant; three surfaces in scope: `services/[slug]:231`, `AudienceStageLayout:176`, and the six net-new panels) · `leadConsentText` is a carve-out and this slice does not touch it (T19) · the em-dash budget on `/locations` is recorded as 0 and is actually 1, so fix the source rather than raise the budget · re-run the full crawl after every content change, not once.

---

## G. PREMISES IN THE BRIEF THAT WERE FALSE

1. **"Services sub-pages: 5, not 6 ... verify and state the real count."** Confirmed correct: five keys at `data.ts:34, :129, :224, :309, :420`, `SERVICE_SLUGS` at `:522`. But **the five routes are absent from `sitemap.ts` and from `link_baseline.json`** - the brief assumed a floor existed for them. Measured floors supplied in §E.
2. **"`PremiumBarChart.tsx` around :97 marks a chart `role="img"`, which collapses the whole subtree."** Half true. The `role="img"` is there, but the wrapping `<div>` at `:88` already sets `aria-hidden="true"`, so the subtree is removed entirely, not collapsed to one label. The real defect is that the chart's values exist as text nowhere reachable. Disposition rewritten in §D.
3. **"Generic fleet: 13 tools ... Bespoke calculator pages: `calculators/law-firm-sale-cgt` and `tools/equity-partner-buy-in`."** Both true, but they are not disjoint: `law-firm-sale-cgt` is **also** the 13th registry config, so `/calculators/[slug]` serves 12 pages and `/embed/law-firm-sale-cgt` serves an ungated second copy of a tool the bespoke page exists to gate. S1.
4. **"194 `font-serif` uses to retire."** The real count is **193** occurrences site-wide, 65 of them in this slice.
5. **"`packages/web-shared/tools/components/Calculator.tsx` gained an additive `resultWrapper?` prop."** Correct and verified (`:42`, `:69`, applied at `:122`). No shared-package edit is required for this slice - worth stating plainly, because it removes the manager-direct carve-out from the critical path.
6. **`/calculators` link floor.** The brief says calculator pages "sit near the site floor (several at 11-18 unique internal links)". In fact **all 13 sit at exactly 11, and all 11 are chrome**. There is not one body link on any calculator page today.
