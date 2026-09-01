# U18 — sdlt-incorporation-stamp-duty-twice

## 1. Unit facts

- Verdict: **EXTEND — FULL REWRITE**
- Slug: `sdlt-incorporation-stamp-duty-twice`
- Category: keep current (**Incorporation & Company Structures**)
- Priority: **P1**
- Hub: transfer-in (Hub 3)

## 2. Dominant query + variant skeleton

**Dominant query (owns the H1): "stamp duty on property incorporation uk"** — action form.

| Variant | Type | Our data |
|---|---|---|
| stamp duty on property incorporation uk | action (dominant, owns H1) | GSC, pos **50.3**, 300 impr, 0 clicks |
| do i pay stamp duty twice on incorporation | question | page_map variant — this IS the page's title/verdict question; must be answered head-on in the intro |
| sdlt and business incorporations 3 year trap | conversational | Bing, pos **25.6**, 76 impr, **23 clicks** — high-value, already partly working, protect and strengthen |
| stamp duty when moving property into a company | action | page_map variant |
| is there sdlt relief on incorporation | question | page_map variant; also "incorporation relief stamp duty" GSC pos 19.6, 5 impr; "sdlt incorporation relief" GSC pos 32, 1 impr |
| partnership route to avoid sdlt on incorporation | action | page_map variant — this is Schedule 15/partnership content, owned by this page |
| stamp duty on incorporation of company | action | GSC pos 20.5, 2 impr |
| stamp duty on property incorporation | action | GSC pos 21.0, 1 impr |
| sdlt incorporation relief 3 year rule uk | question | Bing pos 2.0, 4 impr — currently mis-landing on `partnership-sdlt-relief-schedule-15-fa-2003-incorporation-sum-lower-proportions`; this page should cover the 3-year-trap framing and link that page for the SLP mechanics depth |
| how is incorporation relief of a partnership into a limited company from sdlt claimed in the sdlt form | question | Bing pos 5.0, 24 impr — filing-mechanics angle |
| stamp duty land tax incorporating a partnership uk | action | Bing pos 10.0, 16 impr |
| is stamp duty payable on sale of personal name to ltd company? | question | Bing pos 5.0, 3 impr |

FAQ block (10-14) must include: "do I pay stamp duty twice on incorporation", "is there SDLT relief on incorporation", "what is the SDLT 3-year trap on business incorporations", "does the partnership route avoid SDLT on incorporation", "is stamp duty land tax incorporation relief still available", "how do I claim incorporation relief on the SDLT return".

## 3. Our-data baseline

- `stamp duty on property incorporation uk` — GSC pos **50.3**, 300 impressions, 0 clicks. This is the page's dominant target and it does not compete.
- `sdlt and business incorporations 3 year trap` — Bing pos **25.6**, 76 impressions, **23 clicks**. Already converting on Bing at a meaningful rate; the rewrite must not lose this — keep the "3-year trap" framing explicit as its own H2/FAQ entry, not buried.
- `incorporation relief stamp duty` — GSC pos 19.6, 5 impr, 0 clicks.
- `stamp duty on incorporation of company` — GSC pos 20.5, 2 impr, 0 clicks.
- `stamp duty on property incorporation` — GSC pos 21.0, 1 impr, 0 clicks.
- `sdlt incorporation relief` — GSC pos 32.0, 1 impr, 0 clicks.
- Section 8 of PAGE_MAP.md: "Rewrite to reassert the relief/double-charge frame, hard-separate from U15."

## 4. Competitor coverage floor

- uklandlordtax.co.uk — `tax-guide/project-blue-and-incorporating-a-partnership-to-save-stamp-duty-land-tax-sdlt/` (the partnership-route competitor page — direct overlap with this page's owned intent)
- mfbrokers.co.uk — `resources/blogs/introduction-to-ltd-incorporation-relief`
- mfbrokers.co.uk — `resources/blogs/the-costs-and-risks-of-incorporation`
- provestor.co.uk — `propertytaxshow/llps-partnerships-incorporation`

## 5. Seam warnings — MUST-NOT rules

**U15 (`sdlt-transfer-property-company-cost`) vs U18 — the highest cannibalisation risk in the whole map, per PAGE_MAP.md §9.1.**

- `sdlt-transfer-property-company-cost` **owns the CHARGE** on a connected-party transfer — the "how much SDLT will I pay" question, market-value rule, rate tables. It ranks 1.5-3.9. It is **PROTECTED**.
- U18 **owns the DOUBLE-CHARGE question and the relief framing** — "do I pay stamp duty twice", the 3-year trap, whether relief exists, the partnership route.
- **NEVER answer "how much SDLT will I pay on a connected-party transfer" on this page.** No rate table walkthrough, no worked "you owe £X" calculation of the base SDLT charge — that intent belongs entirely to `sdlt-transfer-property-company-cost`. Link to it for the charge calculation; this page's worked examples should focus on the *relief/no-relief delta* (partnership route achieving nil vs standard market-value charge), not on restating the base SDLT bands.
- If the rewrite needs to state the 5% surcharge or market-value rule at all, do it in one or two sentences as context, then link out — never build a standalone "here's how SDLT is calculated" section.

**Also respect:**

- Never restate the full s.162 CGT statutory test — that belongs to `incorporate-rental-property-without-cgt` (U20) / `section-162-incorporation-relief-property-landlords`. This page's CGT content should be limited to how SDLT and CGT interact/combine, not the CGT relief conditions themselves.
- The linear step-by-step incorporation checklist belongs to `incorporating-property-portfolio-uk-2026` (U19) — do not duplicate it here.
- **Never touch or compete with the two PROTECTED transfer pages**: `sdlt-transfer-property-company-cost`, `how-to-transfer-property-into-limited-company-uk`.

## 6. Facts pack (verify each against `docs/property/house_positions.md`; flag any conflict)

- **Property income tax reducer rises to 22% (the new property basic rate) from 6 April 2027** (FA 2026 Sch 1, enacted 18 March 2026). Not primary to this page but relevant if timing/cash-flow framing touches income tax. — confirmed house_positions.md ~§7 / lines 197, 253-257.
- **s.162 TCGA 1992 incorporation relief must be positively claimed for transfers on or after 6 April 2026.** Mention briefly where SDLT and CGT interact; do not restate the full test. — confirmed line ~228.
- **SDLT company/additional-dwellings surcharge is 5%**, since 31 October 2024. — confirmed §1 house_positions.md.
- **Connected-party transfers are charged SDLT on market value — s.53 FA 2003.** This is the page's core statutory hook for "why do I pay stamp duty at all on incorporation" — a self-transfer to your own connected NewCo is deemed to happen at market value, so full SDLT (plus 5% surcharge) applies as if selling to a stranger. State this once, precisely, then move to the relief/mitigation question (the page's real job).
- **Multiple Dwellings Relief was abolished 1 June 2024** (Finance (No.2) Act 2024) — the current live page already carries this correction (verified in the live file's summary and FAQ). Keep it; do not let the rewrite regress to citing MDR as available.
- **Genuine partnership incorporation route — FA 2003 Sch 15 para 18** (transfer FROM a partnership to a connected person): chargeable consideration = market value × (1 − SLP%), where SLP = sum of the lower proportions (para 20). 100% SLP = zero chargeable consideration = zero SDLT. Requires a real, pre-existing letting partnership (partnership tax returns, partnership accounting, joint borrowing) — not a paper contrivance entered into just before incorporation, or HMRC will attack it under the s.75A Ramsay general anti-avoidance rule (SDLTM09050+). Para 10 is the mirror rule for transfers INTO a partnership (SLP at para 12) and is frequently misquoted as the incorporation rule — do not confuse the two. HMRC manual anchor: **SDLTM33500+**, not SDLTM09050+ for the mechanics. — confirmed house_positions.md §1 and §1.A in detail.
- **Six-dwellings rule (s.116(7) FA 2003):** six or more dwellings in a single transaction are automatically non-residential for SDLT (0%/2%/5% bands, no surcharge) — a statutory deeming, no election required. Relevant to portfolio-scale incorporations; mention briefly as a mitigation route alongside the partnership route.
- **Corporation tax: 19% small profits / 25% main / marginal relief taper to 26.5% effective (£50k-£250k)** — background only if the page compares post-incorporation running costs. — confirmed line ~1204.
- **Dividend rates 2026/27: 10.75% / 35.75% / 39.35%** — background only, unlikely to be central to this page.

No conflicts found between the above and house_positions.md at review time. Flag rather than guess if the writer finds a discrepancy.

## 7. Interlink spec

**Existing slugs — verified present on disk:**

- `sdlt-transfer-property-company-cost` (PROTECTED — link for the charge calculation, never restate)
- `how-to-transfer-property-into-limited-company-uk` (PROTECTED — link only)
- `incorporate-rental-property-without-cgt` (U20 — sibling brief; link for CGT relief depth)
- `section-162-incorporation-relief-property-landlords` (link for statutory CGT test depth)
- `incorporating-property-portfolio-uk-2026` (U19 — link for the step-by-step checklist)
- `incorporation-existing-portfolios-phased-approach` (U17 — sibling brief; link for phased-strategy angle)
- `partnership-sdlt-relief-schedule-15-fa-2003-incorporation-sum-lower-proportions` — **VERIFIED PRESENT on disk 2026-09-01**; it is the deep-dive link for the Sch 15 SLP mechanics this page summarises.

**Wave-1 siblings that will exist (link forward once live; note as TBD if not yet published):**

- `/spv-company` (pillar)
- `spv-company-formation-cost-uk`
- `limited-company-buy-to-let-allowable-expenses`
- `how-to-close-a-property-limited-company`

## 8. Current-file outline: what changes vs. stays

Current H2s (from live file, `Property/web/content/blog/sdlt-incorporation-stamp-duty-twice.md`):

| Current H2 | Verdict | Why |
|---|---|---|
| The Default Rule: Market-Value SDLT on Connected-Party Transfer | **REWRITE → compress** | State the s.53 market-value rule once, briefly, then pivot fast to relief/mitigation — this is not the page's job to fully explain (that's U15's job); risk of drifting into "how much will I pay" per §5 |
| What Is No Longer Available: Multiple Dwellings Relief | **KEEP** | Correct, current, prevents a live misinformation trap competitors still carry |
| The Partnership Route (FA 2003 Sch 15) | **KEEP, expand** | This is the page's core owned content — the relief/mitigation answer to "do I pay twice" |
| Worked Example: £1m Six-Flat Portfolio | **KEEP, refocus** | Keep as the relief-delta worked example (partnership route saving vs standard charge), not a base-rate calculation |
| Worked Example: £600,000 Two-Flat Husband-and-Wife Portfolio | **KEEP, refocus** | Same refocus as above; ensure it doesn't become a duplicate SDLT-rate-table walkthrough |
| SDLT, CGT s.162 Incorporation Relief, and the Combined Cost | **REWRITE → compress CGT side** | Keep the SDLT+CGT interaction framing; cut the s.162 statutory test detail and link to U20/`section-162-incorporation-relief-property-landlords` instead |
| The Filing and Land Registry Steps | **KEEP, tighten** | Directly answers the filing-mechanics variant ("how is incorporation relief... claimed in the sdlt form") |
| When Incorporation Is and Is Not Worth the SDLT | **KEEP** | Decision-framing section, valuable |
| When Does Stamp Duty Apply, and Who Pays It? | **REWRITE → compress or merge** | Overlaps with the opening market-value section; risk of drifting toward U15's territory — merge into a tight intro rather than a standalone H2 |
| Stamp Duty on Additional Property: The Rules in Brief | **DROP or heavily compress** | This is base-rate SDLT territory that belongs to U15/`stamp-duty-buy-to-let-surcharge` (slug corrected at brief review 2026-09-01; `stamp-duty-buy-to-let-rates-surcharge-guide-2025` does not exist on disk); a standalone "rules in brief" section here risks exactly the cannibalisation §5 warns against |
| Can You Avoid Stamp Duty on a Buy-to-Let? | **REWRITE** | Reframe explicitly as "can you avoid SDLT on **incorporation**" (the partnership route + six-dwellings rule), not general BTL SDLT avoidance |
| Related Reading | **REWRITE** | Update per §7 interlink spec |
| **ADD** | Explicit H2 or FAQ: "Do I pay stamp duty twice on incorporation?" (the page's title question, answered directly) | Required — currently implied, not asked-and-answered head-on |
| **ADD** | Explicit H2 or FAQ: "SDLT and business incorporations: the 3-year trap" (protect the 23-click Bing query) | Required per §3 |
| **ADD** | FAQ 10-14 per §2 | Required |

**Full overhaul rule:** dominant-query intent ("stamp duty on property incorporation uk" / the double-charge and relief question) owns the H1. Comparison table (standard charge vs partnership-route relief), worked examples with real figures, FAQ 10-14, depth = full.
