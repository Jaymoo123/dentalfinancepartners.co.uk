# Brief U03 — SPV Company Formation Cost UK

## 1. Unit facts

- **Type:** NEW blog post, `Property/web/content/blog/spv-company-formation-cost-uk.md`.
- **Category:** Incorporation & Company Structures.
- **Priority:** P1.
- **Hub:** formation-mechanics.
- **Questions answered (target):** 6.
- **Intent:** commercial/product — reader is pricing out formation, likely close to converting.

## 2. Dominant query + full variant list

| Query | Type | Data |
|---|---|---|
| how much does it cost to set up an spv | question (dominant) | page_map, autocomplete-blind bucket, no measured volume |
| cost to set up an spv | cost | page_map / demand_corpus |
| cost to set up spv | cost | demand_corpus (appears repeatedly as the mapped-to term for several queries) |
| spv company set up cost | cost | page_map, shared with U01 head family |
| what is a setup fee | cost | demand_corpus ("costs+fees" bucket) |
| how much to form a property limited company | question | page_map variant |
| spv accountant fees | cost | page_map variant |
| is it expensive to run an spv | conversational | page_map variant — note: this is a running-cost framing wearing a setup-cost query; answer briefly then hand off to `property-company-running-costs-annual-budget` per the seam rule |
| what does an spv cost in year one | cost | page_map variant — this is the page's actual framing device (see §8) |
| how much does it cost to set up spv | cost | demand_corpus |
| how spv is formed | question (adjacent, low priority) | demand_corpus — background only, not a cost query, do not force it in |

**Costs bucket is autocomplete-blind** — no reliable volume data exists for most of the above. Additional cost angles mined from demand/competitor data to compensate:

- **Companies House £100 online/software filing fee (£124 paper)** — the one hard, sourced number (facts pack).
- **Agent/formation-agent fees** — implied by `company formation accountant`, `company formation accountants`, `limited company formation accountant` in our_queries.csv (generalist-site data, pos 15.2-22.3, 16-21 impressions/mo) — signals real demand for "who charges what to form this for me."
- **Registered office service cost** — implied by U06's mapped query "virtual address for limited company" (110/mo) and the registered-office page not yet existing; U03 should mention this as a year-one line item and link to U06 once live, not duplicate it.
- **Accountant setup fees** — `fixed fee limited company accountant` (our_queries.csv, generalist, pos 61.2, 50 impressions/mo) and the taxqube/provestor competitor set both surface accountant-fee framing.
- **Ongoing running-costs teaser** — one line only, pointing to `property-company-running-costs-annual-budget` (COVERED, protected) per the seam rule; never a table.

## 3. Our-data baseline

No page in our estate currently targets a cost-specific SPV query directly. Adjacent signals:
- `spv company` (Google) pos 69.5, 10 impressions — the cost variant sits behind this unranked head term.
- `company formation accountant` family (generalist site) pos 15.2-22.3 — proof this exact commercial intent converts attention elsewhere in the estate; U03 is the property-specific equivalent.
- `fixed fee limited company accountant` pos 61.2 — same signal, weaker position, more room.

## 4. Competitor coverage floor

- https://taxqube.co.uk/setting-up-a-special-purpose-vehicle-spv-to-purchase-properties/ — direct SPV formation competitor; check for any cost figures quoted.
- https://taxqube.co.uk/how-to-set-up-your-own-limited-company/ — generic formation cost competitor.
- https://www.provestor.co.uk/pricing/limited-company — direct pricing-page competitor, useful benchmark for what a formation/accountancy cost breakdown looks like from a rival.
- https://www.provestor.co.uk/help/expenses/pre-incorporation-expenses — adjacent: what counts as a deductible pre-incorporation cost, useful for the worked example.
- https://www.hollowaydavies.co.uk/blog/bookkeeping-and-compliance/fixed-fee-accountant-uk-cost-2025-26 — sibling-site cost-comparison-table format benchmark.
- https://www.hollowaydavies.co.uk/blog/incorporation-and-structure/what-does-a-company-formation-accountant-do — DIY vs accountant framing benchmark for the comparison table.

## 5. Seam warnings — MUST-NOT rules

1. **U03 owns YEAR-ONE setup cost only.** `property-company-running-costs-annual-budget` (COVERED, protected) owns the ONGOING annual run rate. U03 may mention an annual-cost figure only as a single forward-referencing sentence with a link — never a running-cost table, never a monthly/annual breakdown of bookkeeping, insurance, accountancy retainer, etc.
2. Do not answer "is it expensive to run an spv" with a running-cost analysis — reframe to "what does it cost to *set up*" and link to the running-costs page for the ongoing answer.
3. Do not restate the Companies House mechanics (IN01, PSC, identity verification process) — that's U02's job; U03 only needs the £100 online (£124 paper) incorporation fee as a cost-table line item with a one-line link to U02 for "how to actually file."
4. Do not restate which SIC codes to use (U09, protected) or explain what an SPV is in depth (blog SPV guide) — cost content only.

## 6. Facts pack (dated; verify against `docs/property/house_positions.md`)

- **Companies House incorporation fee: £100 online/software, £124 paper.** Verified against gov.uk Companies House fees page, updated 2 July 2026. CH fees verified current 2026-09-01, do not change.
- **Confirmation statement fee: £50 online, £110 paper/yr** — the annual filing cost, distinct from the one-off incorporation fee; note clearly which is which in any table.
- Formation-agent/company-formation-accountant fees — no fixed government figure; writer to use a realistic UK market range and mark it clearly as a range, not a quoted price, unless the manager supplies a sourced figure.
- Registered office service — market-rate line item, same treatment (range, sourced if possible, else marked as typical/indicative).
- Accountant setup/onboarding fees — same treatment; cross-check against `fixed-fee-accountant-uk-cost-2025-26` sibling-site benchmark for a defensible range.
- Bank account — most UK SPV-friendly business banking is free to open; note this explicitly to avoid inflating the total unnecessarily.
- Corporation tax registration — free, automatic on incorporation (per U02's existing content) — mention as a zero-cost line to keep the total honest.
- ACSP regime live since 18 March 2025 — relevant only if discussing who can file on the reader's behalf and at what fee tier.
- Identity verification mandatory for directors/PSCs since 18 November 2025 — mention if a verification-service fee is charged by any formation route; keep brief.

## 7. Interlink spec

- `/spv-company` (U01, once live) — up-link to the pillar.
- `how-to-set-up-property-investment-company-uk-guide` (U02) — for the "how to actually file" mechanics, from the CH-fee line item.
- `property-company-formation-cost-uk`'s sibling — `property-company-running-costs-annual-budget` (COVERED) — mandatory link for the ongoing-cost handoff, per the seam rule; do not skip this link, it's the seam itself.
- `spv-company-bank-account` (U05, once live) — from the bank-account cost line (free/near-free).
- `registered-office-address-property-spv` (U06, once live) — from the registered-office cost line.
- `spv-company-name-rules-uk` (U04, once live) — optional, light link if naming/branding cost comes up (e.g. trademark/domain — out of core scope, keep to one line if included at all).
- `/calculators/incorporation-cost-calculator` — embed or strong CTA link; this calculator already models incorporate-vs-personal cost, so U03 should point readers there for a personalised total rather than trying to replicate calculator logic in prose.

## 8. Fresh outline

1. **Intro** — direct answer up top: year-one SPV formation cost range (CH fee + realistic optional-service range), framed against "what does an spv cost in year one."
2. **H2 — What you must pay: the Companies House fee** — £100 online/software fee (£124 paper), what it covers, link to U02 for the filing mechanics. Note the separate £50/yr (£110 paper) confirmation statement as the first recurring cost, with a one-line handoff to the running-costs page — do not build it out into a table here.
3. **H2 — What most people also pay: agent and accountant fees** — DIY vs using a formation agent vs using an accountant, framed as the comparison table (see below).
4. **Comparison table — DIY vs formation agent vs accountant setup**

   | Cost item | DIY (CH direct) | Formation agent | Accountant-led setup |
   |---|---|---|---|
   | Companies House filing | £100 (£124 paper) | Often bundled | Often bundled |
   | Registered office (if not home address) | Separate cost | Sometimes bundled | Sometimes bundled |
   | SIC code / structure advice | None (self-researched) | Minimal | Included |
   | Share structure / alphabet shares set-up | Self-managed | Not usually offered | Included/advised |
   | Bank account introduction | Self-managed | Sometimes offered | Sometimes offered |
   | Ongoing compliance set-up (bookkeeping, calendar) | Self-managed | Not included | Included/advised |
   | Typical total, year one | Lowest (CH fee + own time) | Low-mid | Mid-higher, but includes advice |

   (Writer to source realistic ranges for each cell; mark clearly where a figure is indicative rather than fixed.)
5. **H2 — What a first-year total actually looks like: worked example** — one worked example combining CH fee (£100, or £124 paper) + a realistic mid-range formation/accountant fee + registered office (if applicable) + bank account (£0) + bookkeeping software (typical monthly cost x however many months to year end) = an indicative total, clearly labelled as illustrative. Do NOT extend into the annual running-cost budget — stop at "this is what getting started costs," link to the running-costs page for what happens after (which will include the £50/yr confirmation statement).
6. **H2 — Where the calculator helps** — short section pointing to `/calculators/incorporation-cost-calculator` for a personalised number.
7. **H2 — What's not included here (and where to find it)** — one short section explicitly listing: ongoing annual running costs (link to `property-company-running-costs-annual-budget`), how to actually file (link to U02), which SIC code to use (link to U09), registered office options (link to U06 once live).
8. **FAQ (10-14 questions)** — built from §2's cost-tagged variants plus natural follow-ups: e.g. "how much does it cost to set up an spv," "what is a setup fee," "spv accountant fees," "how much to form a property limited company," "is it expensive to run an spv" (answer briefly + hand off), "what does an spv cost in year one," "do i need an accountant to set up an spv," "is the companies house fee the only mandatory cost," "how much does a registered office service cost," "can i set up an spv for free," "how much do formation agents charge," "does the cost differ for multiple spvs" (touch the associated-companies point lightly, full depth stays on U02/structure-planning pages).
