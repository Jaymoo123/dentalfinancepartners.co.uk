# Brief U01 — SPV Company Pillar

## 1. Unit facts

- **Type:** NEW root-level app page — `/spv-company` (`src/app/spv-company/page.tsx`), **not** a blog post.
- **Priority:** P1.
- **Role:** pillar / router for the entire SPV-formation programme. Owns the SPV *lifecycle* (form, name, SIC, bank, run, close) at overview depth and hub navigation. Does not own "should I incorporate" (owned by `/incorporation`) and does not own "what is an SPV" (owned by the blog SPV guide).
- **Questions answered (target):** 28.

## 2. Dominant query + full variant list

Head family, tagged:

| Query | Type | Volume / signal |
|---|---|---|
| spv company | conversational/head | 720/mo, verified Google Ads live 2026-09-01 |
| set up spv company | action | (part of head family) |
| spv company set up cost | cost | (part of head family; U03 owns the depth) |
| spv for property | conversational | 210/mo |
| set up a limited company for buy to let | action | 110/mo |
| how to set up an spv | question | page_map dominant_query variant |
| setting up a limited company for buy to let property investment | action | page_map variant |
| property limited company set up | action | page_map variant |
| how do i set up a company to buy rental property | question | page_map variant |
| is an spv worth it for a landlord | question | page_map variant — feeds the "should I" 3-sentence summary, links to /incorporation |
| how spv is formed | question | demand_corpus, formation mechanics bucket |
| how to open spv company | action | demand_corpus |
| why create an spv | question | demand_corpus |
| special purpose vehicle limited company | conversational | our_queries, pos 52.1, 12/mo impressions |
| spv vs holding company | question | our_queries, pos 9.3, 6/mo — routed to structure-planning page, not answered in depth here |
| spv property | conversational | our_queries, pos 46.3, 13/mo — lands on the blog SPV guide today; pillar should absorb the navigational share of this |
| spv company uk | conversational | our_queries, pos 54.9, 6/mo |
| spv mortgages | action | our_queries, pos 15.3, 4/mo — routes to Track B, do not answer |
| spv sic code | question | our_queries, pos 18.5, 7/mo — routes to `sic-code-for-an-spv-property-company` (protected), never answered here |

## 3. Our-data baseline

- We currently rank **Bing pos 6.5-8.0** on `spv` / `what is an spv company` / `spv for property portfolio`, via the existing blog SPV guide (`spv-property-investment-special-purpose-vehicle-guide`) — the pillar must not cannibalise this asset; it links to it for "what is an SPV" depth.
- `spv company` (Google): pos 69.5, 10 impressions — weak, room to move once the pillar exists at root level.
- `spv property` : pos 46.3, 13 impressions.
- `special purpose vehicle limited company`: pos 52.1, 12 impressions.
- `spv vs holding company`: pos 9.3, already decent — pillar routes rather than competes.
- `spv sic code` / `companies house sic code change`: pos 18.5 / 56.9 — both route to the SIC hub, not answered on the pillar.
- No existing page ranks for the bare "spv company" 720/mo Google Ads head term — this is the gap the pillar fills.

## 4. Competitor coverage floor

- https://taxqube.co.uk/setting-up-a-special-purpose-vehicle-spv-to-purchase-properties/ — direct SPV-formation competitor page, generalist accountant framing.
- https://www.provestor.co.uk/propertytaxshow/landlord-mistakes-setting-up-ltd-company — mistakes-framed, adjacent intent.
- https://www.provestor.co.uk/help/limited-companies/closing-a-limited-company — lifecycle end-state coverage a router should link toward (our own U34 owns this on our estate).
- https://taxqube.co.uk/how-to-set-up-your-own-limited-company/ — generic formation competitor, weak on property-SPV specificity — an opportunity: our pillar is property-SPV-specific where they are generic.
- GetGround (getground.co.uk) and propertyspv.co.uk surface repeatedly in the demand corpus as commercial competitors around "spv property" and company-registration terms — check their homepage/pillar structure for the lifecycle framing before drafting the ProcessTimeline.

## 5. Seam warnings — MUST-NOT rules

The pillar is a **router**, not a content page. Every rule below is enforced at the paragraph level, not just the section level.

1. **vs `/incorporation`:** never argue "should I incorporate" beyond a 3-sentence summary + a link. `/incorporation` owns the feasibility decision and the incorporate-vs-personal calculator depth.
2. **vs the blog SPV guide (`spv-property-investment-special-purpose-vehicle-guide`):** never re-explain what an SPV is, and never restate any of the following — this page owns them and ranks 6.5–8.0 Bing on them today:
   - what makes a company an SPV (single-purpose structure definition)
   - share classes and director-loan-account mechanics
   - buy-to-let mortgage lender criteria (SPV vs trading company underwriting)
   - Corporation Tax rate comparison / worked figures
   - profit-extraction routes with worked percentages (salary vs dividend vs loan)
   - SDLT and ATED treatment
   - "when an SPV does not pay off" analysis
   The pillar may summarise each of these in one sentence with a link out; it may never carry a table, worked example, or FAQ answer that duplicates them.
3. **vs `how-to-set-up-property-investment-company-uk-guide` (U02):** never carry a step-by-step. U02 owns, and the pillar must not re-explain, any of:
   - the "should you set up a company" intro test
   - structure/SPV choice + the SIC code table (68100/68209/68320)
   - share-structure decisions made pre-incorporation
   - the Companies House IN01 walkthrough, identity verification (ECCTA), and the incorporation fee
   - opening the business bank account
   - activating Corporation Tax
   - VAT/PAYE registration triggers
   - the bookkeeping/compliance calendar
   - the "common mistakes" list
   The pillar's formation step in its lifecycle strip gets one line ("form the company — name, SIC codes, Companies House, bank account") plus a link to U02; no sub-detail.
4. **vs `sic-code-for-an-spv-property-company` (U09, protected):** never state which SIC code to use or list the codes — link only.
5. **vs U03 (`spv-company-formation-cost-uk`):** never quote a total formation cost figure or cost breakdown — one line ("formation typically costs £X-£Y in year one") with a link, no table.
6. **vs the two PROTECTED transfer pages (`sdlt-transfer-property-company-cost`, `how-to-transfer-property-into-limited-company-uk`, ranking 1.5-3.9):** the pillar's transfer-in hub card is a LINK and one line of orientation. Never answer "how much SDLT will I pay on a transfer to my company" and never carry a transfer how-to, an SDLT rate table or a market-value worked example. The pillar also must not propose, request or trigger any edit to either page — they are defended, not developed, in this programme. Same rule for the transfer-in hub's FAQ entries: route, do not answer.
7. **What the pillar DOES own and must carry directly:**
   - a compressed lifecycle overview: decide → form → structure and tax → mortgage → run → extract → sell/close, one line each, each linking to its hub/page
   - links to every hub head page in the programme (formation mechanics, SIC/CH admin, transfer-in, run-the-company, selling/closing, ownership structures, non-resident)
   - both calculator embeds (`/calculators/incorporation-cost-calculator`, `/calculators/stamp-duty-calculator`)
   - its own FAQ, built only from the head-family variants in §2, answered briefly with links out for depth — never duplicating an owned page's answer

## 6. Facts pack (dated; verify against `docs/property/house_positions.md` before publish)

- Companies House incorporation fee: **£100 online/software, £124 paper.** Confirmation statement: £50 online, £110 paper/yr. Verified against gov.uk Companies House fees page, updated 2 July 2026. CH fees verified current 2026-09-01, do not change; the live U02 page's £100/£124 figures are correct as-is.
- ACSP (Authorised Corporate Service Provider) regime live since **18 March 2025**; third-party filing becomes ACSP-only from **~November 2026**.
- Identity verification mandatory for directors/PSCs since **18 November 2025** (ECCTA 2023) — note the current U02 FAQ describes this as an ongoing "transition window," which is now closed/closing; the pillar's one-line mention should say verification is mandatory now, not "phasing in."
- SIC codes for property companies: 68100, 68209, 68320 (verify exact set/order against the Track B `sic-code-for-an-spv-property-company` post and `house_positions.md` before publishing — do not invent a fourth code).
- Corporation Tax: 19% small-profits rate (≤£50,000), 25% main rate (>£250,000), marginal relief between.
- Property income tax finance-cost reducer rises to **22% from April 2027** (Finance Act 2026, Royal Assent 18 March 2026) — relevant only to the "should I" one-liner, link to `/section-24` for depth.

## 7. Interlink spec (verify each slug exists on disk before use)

Must link to:
- `/incorporation` (should-I decision)
- `spv-property-investment-special-purpose-vehicle-guide` (what is an SPV / ongoing SPV depth)
- `/section-24` (why SPVs exist)
- `how-to-set-up-property-investment-company-uk-guide` (U02, formation mechanics)
- `spv-company-formation-cost-uk` (U03, once live)
- `spv-company-bank-account`, `registered-office-address-property-spv`, `spv-company-name-rules-uk` (formation hub siblings, once live)
- `sic-code-for-an-spv-property-company` (U09, protected — SIC hub head)
- `spv-first-year-accounts-and-filing-timeline` (U12, once live)
- `sdlt-transfer-property-company-cost`, `how-to-transfer-property-into-limited-company-uk` (transfer-in hub head)
- `incorporation-existing-portfolios-phased-approach` (transfer-in, portfolio route)
- `limited-company-buy-to-let-allowable-expenses` (U27, once live — run-the-company hub)
- `extracting-cash-from-property-spv-extraction-sequence-pillar-2026-27` (extraction, one-line link only per §5 rule 2)
- `how-to-close-a-property-limited-company` (U34, once live — selling/closing hub)
- `selling-a-property-spv-share-sale-vs-asset-sale` (U35, once live)
- `property-investment-company-structure-planning` (ownership structures hub)
- `offshore-company-owning-uk-property` (U44, once live — non-resident hub)
- Track B mortgage cluster: `spv-mortgages-explained`, `buy-to-let-limited-company-mortgage-options`, `buy-to-let-mortgages-guide`
- Protected transfer pages: `sdlt-transfer-property-company-cost`, `how-to-transfer-property-into-limited-company-uk`
- `/incorporation` again for the calculator context
- Calculator embeds: `/calculators/incorporation-cost-calculator`, `/calculators/stamp-duty-calculator`

Note: several targets above (U03, U05, U06, U12, U27, U34, U35, U44) are not yet built — link only once live; do not 404-link at publish time. Manager to sequence pillar publish after enough hub heads exist, or use conditional/staged linking.

## 8. Section-by-section skeleton (modelled on `src/app/incorporation/page.tsx`)

1. **Hero** — `heroCreamSurface`, H1 "SPV Company: The Complete UK Property Investment Company Hub" (or similar — writer to finalise against the 720/mo head term). Two CTAs: hero_book (enquiry) and hero_calculator (jump to embedded calculator), matching the incorporation page's CTA pattern (`data-cta`, `data-cta-placement`).
2. **StatsCounter** — 2-4 stats pulled from the facts pack: e.g. "£100 CH filing fee", "19-25% Corporation Tax", "68209 core SPV SIC code", "22% from April 2027" (verify each against house_positions.md; do not invent).
3. **PromptMarquee** — even-count list of conversational prompts drawn from §2's conversational-tagged queries ("is an spv worth it for a landlord", "spv vs holding company", "spv for property", "special purpose vehicle limited company", etc.) — 4 or 6 items, must be even.
4. **CoverageCards — the lifecycle** — one card per lifecycle stage (decide, form, structure & tax, get a mortgage, run it, extract profit, sell or close), each card = one line + link to the owning page/hub per §7. This is the section that carries the "router" job; keep every card to the length used on `/incorporation`'s `whenItMakesSense`/`whenItDoesNot` cards.
5. **Calculator embed(s)** — `IncorporationCostCalculator` (reuse the component from `/incorporation`) plus a link/embed to the stamp duty calculator; mirror the `/incorporation` page's calculator section structure.
6. **CoverageCards — hub navigation** — a second CoverageCards block, one card per hub (formation mechanics, SIC/CH admin, transfer-in, run the company, selling & closing, ownership structures, non-resident), each linking to that hub's head page.
7. **ProcessTimeline** — the formation-to-close lifecycle as a timeline component (reuse `ProcessTimeline`), high-level only: decide → form → open bank account → activate CT → run/file → extract → sell/close. No IN01-field-level detail (that's U02's job) — one line per timeline step.
8. **FaqSection** — built strictly from §2's head-family and question-tagged variants, each answer 2-4 sentences with a link out to the owning page where depth exists (per §5). No answer may exceed what the owning page hasn't already published, i.e. do not answer ahead of the page it's supposed to route to.
