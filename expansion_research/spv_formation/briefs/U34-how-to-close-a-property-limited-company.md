# U34 — how-to-close-a-property-limited-company

## 1. Unit facts

- Type: NEW blog post
- Category: Incorporation & Company Structures
- Slug: `how-to-close-a-property-limited-company`
- Hub: HUB 5, selling-closing (child of the `/spv-company` pillar, P1)
- Priority: P1
- Verdict rationale (`page_map.csv` U34): "Largest genuinely-uncovered head term in the
  map. Seam: mvl-members-voluntary-liquidation-property-company owns the CGT-vs-income
  analysis of the FINAL DISTRIBUTION; file-dormant-accounts owns dormancy. This page owns
  ROUTE CHOICE (dormant / DS01 strike-off / MVL) plus DS01 mechanics and the GBP 25,000
  pre-dissolution distribution limit. The writer must not re-argue the MVL tax maths."
  **Citation corrected at brief review 2026-09-01:** page_map.csv cites "s.1013 CTA 2010".
  That is wrong. The correct authority is **CTA 2010 s.1030A** (with s.1030B as the
  counterpart charging provision). Use s.1030A throughout; never cite s.1013.

## 2. Dominant query + full variant list

**Dominant query (owns the H1):** closing a limited company — **2,400/mo**, the single
biggest uncovered head term in the whole SPV formation programme (`page_map.csv` U34,
volume column). Secondary measured term: strike off application, 110/mo.

| Tag | Phrasing | Volume/source |
|---|---|---|
| dominant | closing a limited company | 2,400/mo, page_map.csv U34 |
| action | how to close down a property company | page_map.csv U34 |
| action | application to strike off a company | 110/mo, page_map.csv U34 |
| technical/action | ds01 strike off property company | page_map.csv U34 |
| question | do i need an mvl to close my spv | page_map.csv U34 |
| question | what happens to the property when i close the company | page_map.csv U34 |
| question | closing a limited company tax | 20/mo, demand_corpus.csv:4913 |
| question | closing a limited company capital gains tax | 10/mo, demand_corpus.csv:5620 |
| conversational | can i just make my spv dormant instead | page_map.csv U34 |
| question | how to close a company | questions_corpus.csv |
| action | how to close down a company | questions_corpus.csv |
| action | companies house how to close a company | questions_corpus.csv |
| action | company house dissolve company | questions_corpus.csv |
| technical/action | company strike off form / form to close a limited company | questions_corpus.csv |
| question | reasons for dissolving a company | questions_corpus.csv |
| question | accounts for dissolved company | questions_corpus.csv (final-accounts angle, feeds H2 6) |

Note: the corpora contain **no cost-form variant** for this unit ("how much does it cost to
close a limited company" and equivalents return nothing). That is a genuine corpus absence,
not a coverage miss — cover cost inside the DS01/MVL comparison table, do not invent a
cost-form H2 to fill the slot.

Note: `demand_corpus.csv` rows for "closing a limited company tax" and "closing a limited
company capital gains tax" carry `site:provestor.co.uk;site:uklandlordtax.co.uk` /
`site:propertyspv.co.uk` site-restricted origin tags — read these as confirming
competitor coverage exists on the tax-angle long tail, not as independent volume outside
the head term. Do not double-count them against the 2,400/mo head figure.

**Trap (do not build a page on this):** `page_map.csv` U36 flags 13 deduped "can i sell my
house to my own limited company" questions as transfer-IN intent wearing a sale verb —
that belongs on U15/U16 as an FAQ block, never here and never as a new page. This unit
(U34) is about closing/dissolving the company itself, not selling into it.

## 3. Our-data baseline

No rows for `how-to-close-a-property-limited-company` or "closing a limited company" in
`our_queries.csv` — zero existing GSC/Bing footprint (checked: no match on "closing" or
"strike off" strings in that file). One adjacent our-data row worth noting:
`our_queries.csv:1665` — "closing down a limited company uk using members' voluntary
liquidation (mvl)" is a Bing query (2 impressions, 0 clicks, position 3.0) landing on
**Holloway Davies (generalist)**, not Property: `hollowaydavies.co.uk/blog/exit-and-capital-gains/members-voluntary-liquidation-explained`.
That is a different site in the estate; it confirms MVL-close intent exists in the wild
but is out of scope for sizing this Property page.

## 4. Competitor coverage floor

- provestor.co.uk — `help/limited-companies/closing-a-limited-company` (direct competitor
  on the exact dominant query)
- propertyspv.co.uk — `services/company-dissolution-strike-off/` (property-SPV-specific
  competitor, confirms the vertical-specific angle is contestable)
- uklandlordtax.co.uk — `company-strike-off-can-you-just-let-a-company-be-struck-off-by-not-filing-at-companies-house`
  (answers the "can I just walk away" question directly — the honest answer is no,
  non-filing risks penalties, disqualification and the strike-off being contested by
  creditors/HMRC; this page must cover that explicitly as it is a live competitor angle)

None of these are property-SPV route-choice hubs that also own DS01 mechanics AND link
out cleanly to MVL tax and dormancy — that combination is the whitespace.

## 5. Seam MUST-NOTs

**Seam 8 (`PAGE_MAP.md` §9.8):** This page owns ROUTE CHOICE (dormant vs strike-off DS01
vs MVL) plus DS01 mechanics and the **CTA 2010 s.1030A** £25,000 limit on pre-dissolution
distributions of share capital.

**It must NEVER:**
- Re-argue the CGT-vs-income tax analysis of the FINAL DISTRIBUTION. That belongs to
  `mvl-members-voluntary-liquidation-property-company-cgt-vs-income-treatment` (confirmed
  on disk). Summarise in 2-4 sentences ("an MVL distribution is normally taxed as a
  capital gain, which can be materially cheaper than income treatment for a
  higher-rate director, especially with BADR — see the dedicated MVL page for the full
  mechanics") and link out.
- Duplicate dormancy mechanics. That belongs to `file-dormant-accounts-a-complete-guide`
  (confirmed on disk). Summarise dormancy as ONE of the three routes in the route-choice
  section, with the mechanics (what "dormant" means, AA02 filing, still-must-file
  confirmation statement) linked out, not repeated in full.
- Present dormancy as a genuine "closing" option without the caveat that it keeps the
  company open (still filing, still on the register) — the honest answer for "can i just
  make my spv dormant instead" is: yes if you might use the SPV again, but it is not
  closure, it is pause. That distinction is the whole point of this FAQ entry.

## 6. Facts pack (dated 2026-09-01, verified vs `docs/property/house_positions.md`)

- **Three routes, ordered by property/asset situation:**
  1. **Dormant** — company stops trading but stays on the register; still files a
     confirmation statement and dormant (AA02) accounts. Only sensible if there are no
     leftover assets to deal with and the landlord might reuse the vehicle.
  2. **DS01 voluntary strike-off** — for a company with no assets/liabilities left (all
     properties already sold or transferred out, debts settled). Cheap and quick, but
     **CTA 2010 s.1030A** caps distributions of share capital made in anticipation of
     dissolution (under CA 2006 s.1000 or s.1003) at **£25,000 in total** — within that
     limit the distribution is not treated as an income distribution, i.e. it gets
     capital treatment; above it, **s.1030B** applies and the whole amount is taxed as an
     income distribution, not just the excess. s.1030A also imposes Condition A: the
     company must intend to secure payment of sums due to it and to satisfy its debts and
     liabilities. **Verified against legislation.gov.uk (CTA 2010 s.1030A) on 2026-09-01.**
     `house_positions.md` carries no row on this — it is a genuine gap in the house
     positions file, not a conflict. `page_map.csv`'s "s.1013 CTA 2010" citation is WRONG;
     do not reproduce it.
  3. **MVL (Members' Voluntary Liquidation)** — needed where there are still meaningful
     assets (typically over £25,000, or a property that has not been sold/transferred)
     or where the shareholders want a formal capital-treatment distribution regardless of
     value. This is where BADR becomes relevant (see below) and where the CGT-vs-income
     analysis lives on the dedicated MVL page.
- **BADR 18% from 6 April 2026** (was 14% from 6 April 2025, 10% before) — house_positions.md
  §BADR (line 226): BADR does NOT apply to investment property disposals directly, but IS
  potentially relevant to the disposal of TRADING company shares in an MVL context where
  the s.165A "trading company" test is met (house_positions.md line 4042-4044). A pure
  buy-to-let SPV is very unlikely to meet the trading-company test — flag this honestly;
  do not imply BADR is a given on an MVL of a rental-holding SPV. Cross-reference the MVL
  page's own treatment rather than asserting a BADR outcome here.
- **Corporation Tax on any final trading profit** before liquidation: 19%/25% with
  marginal relief as per U27 facts pack, same house_positions.md source.
- **Do not** state a DS01 government fee figure without checking it at write time (Companies
  House fees change; verify against gov.uk at the point of writing rather than trusting
  this pack).

## 7. Interlink spec

Verify slugs on disk before linking (all three confirmed present):
- `mvl-members-voluntary-liquidation-property-company-cgt-vs-income-treatment` — CONFIRMED
  ON DISK. Owns the final-distribution tax analysis.
- `file-dormant-accounts-a-complete-guide` — CONFIRMED ON DISK. Owns dormancy mechanics.
- **Up-link (required):** `/spv-company` (new pillar, once built) — hub navigation, sits
  in HUB 5 selling-closing alongside U35 (selling-a-property-spv-share-sale-vs-asset-sale,
  not yet built — do not link a page that does not exist; add the cross-link once U35
  ships).
- **Extraction cross-link (context, not the analysis):** `extracting-money-from-property-limited-company`
  for readers deciding whether to extract before closing rather than via the final
  distribution.
- **Property-out cross-link:** `transfer-property-out-of-limited-company-to-personal-name`
  (U24, if built) is a DIFFERENT scenario — taking one property out while keeping the
  company open — flag as a sibling concept, not to be confused with closing the whole
  company; link only once U24 exists on disk.

## 8. Fresh outline

**H1:** How to close a property limited company

**H2 skeleton (from the variant list):**
1. The three ways to close (or pause) a property company: dormant, DS01 strike-off, MVL
   (verdict-up-top decision table: which route for which situation)
2. Can I just make my SPV dormant instead? (honest answer: that's a pause, not a close;
   link to file-dormant-accounts)
3. DS01 strike-off: step by step, eligibility (no assets/liabilities), the £25,000
   pre-dissolution distribution limit under CTA 2010 s.1030A (and the s.1030B
   all-or-nothing income treatment above it), timeline, cost
4. What happens to the property when I close the company? (must be sold or transferred
   out BEFORE strike-off; a property still owned by the company blocks a clean DS01)
5. When you need an MVL instead of a DS01 (asset value threshold, wanting formal capital
   treatment) — 2-4 sentence summary of the tax picture, then link to the MVL page
6. Closing a limited company tax: what actually happens to CT, VAT deregistration, final
   accounts, PAYE closure (mechanics, not the MVL distribution tax analysis)
7. Comparison table: dormant vs DS01 vs MVL (cost, timeline, when appropriate, what
   happens to remaining assets, formality)
8. Worked example: a single-property SPV that has sold its one property, settled its
   mortgage/liabilities, and has £18,000 left in the bank (under the £25,000 DS01 limit)
   vs a portfolio SPV with £120,000 left (needs MVL)
9. FAQ (10-14 entries): how to close down a property company, application to strike off a
   company, ds01 strike off property company, do i need an mvl to close my spv, what
   happens to the property when i close the company, closing a limited company tax, can i
   just make my spv dormant instead, what if the company still owes money, can HMRC object
   to a strike-off, how long does DS01 take, do I need an accountant to close a company,
   what if I want to reopen the company later.
