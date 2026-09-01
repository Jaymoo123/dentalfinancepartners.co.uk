# U29 — director-living-in-property-owned-by-limited-company

## 1. Unit facts

- Type: NEW blog post
- Category: Incorporation & Company Structures
- Slug: `director-living-in-property-owned-by-limited-company`
- Hub: run-the-company cluster, under the `/spv-company` pillar
- Priority: P2
- Verdict rationale (`page_map.csv` U29): "Gap. Living-accommodation BIK (ITEPA ss.97-105),
  ATED and the relief clawback, mortgage and lease breach. Existing ATED clawback pages own
  only the ATED slice; cross-link, do not repeat."

## 2. Dominant query + full variant list

**Dominant query (owns the H1):** can i live in a house owned by my limited company —
`page_map.csv` U29 and independently confirmed in `questions_corpus.csv` (tagged
`sell house owned by limited company`, misc). No standalone volume figure measured; this is a
conversational head term with no direct corpus row, sized by the FAQ-cluster weight around it
rather than a single number.

| Tag | Phrasing | Volume/source |
|---|---|---|
| dominant | can i live in a house owned by my limited company | page_map.csv U29, questions_corpus.csv |
| conversational | can i rent a flat through my limited company | page_map.csv U29 |
| conversational | can i live in a buy to let owned by my company | page_map.csv U29 |
| technical | benefit in kind on company-owned accommodation | page_map.csv U29 |
| question | does ated apply if i live in the property | page_map.csv U29 |
| conversational | can my company buy the house i live in | page_map.csv U29 |
| conversational | can my family live in a company property | page_map.csv U29 |
| adjacent | job-related accommodation capital gains tax | 10/mo, `demand_corpus.csv`, tagged transfer-in, `site:uklandlordtax.co.uk` — confirms a competitor already answers a related CGT angle; this unit's BIK/ATED angle is a different question, but flag the adjacency |
| adjacent | living in a property owned by your company | 10/mo, `demand_corpus.csv`, seed: non resident landlord company |
| adjacent | landlord living in buy to let property | 10/mo, `demand_corpus.csv` |
| adjacent | tenant living with landlord / living with landlord-tenant rights | 10/mo each, `demand_corpus.csv` — tenancy-rights angle, not this unit's tax intent; note but do not build FAQ content around it |

**Zero-volume but real (cover, do not invent extra weight for):** "can my company buy the
house I live in", "can my family live in a company property" — page_map.csv candidate
variants with no measured volume; genuine reader questions, keep as FAQ entries.

## 3. Our-data baseline

No rows in `our_queries.csv` match "living in a company property", "benefit in kind
accommodation", "director living", or "ated ... live in" strings — zero existing GSC/Bing
footprint for this unit. One tangential row: "letter requesting benefit in kind information
for employees p11d" (28 impressions, 14 clicks, Bing, position 3.0) lands on Holloway Davies
(generalist site, not Property), confirming BIK/P11D intent exists in the estate's data but is
unrelated to this specific living-accommodation scenario and out of scope for sizing this page.

**Reading:** genuine zero-footprint gap, consistent with page_map.csv's "gap" framing — build
on the corpus/competitor case, not on measured our-data traffic.

## 4. Competitor coverage floor

`competitor_urls.csv` returns no direct competitor page on "director living in company-owned
property" — the accommodation-tagged rows returned by the corpus (needingadvice.co.uk image
assets, "sheltered accommodation" glossary entries, taxd.co.uk's benefit-in-kind case study
and accommodation-tie SRT pages) are either irrelevant (unrelated accommodation topics,
non-resident SRT ties) or too general (taxd.co.uk's director's-loan/BIK case study is about
BIK generally, not living accommodation specifically). No property-SPV-specific competitor
owns this exact scenario. Genuine whitespace, consistent with the page_map.csv gap verdict.

## 5. Seam MUST-NOTs

This page owns: benefit-in-kind for living accommodation provided by the company (ITEPA 2003
ss.97-113, the statutory hooks confirmed present in `house_positions.md` line 3830 for
employer-provided living accommodation generally), the ATED £500,000 trigger (one line + link,
never re-explain bands), and the s.455 close-company loan angle where the director occupies
rent-free or below market rent.

**It must NEVER:**
- Re-explain ATED bands, rates, or filing mechanics. `house_positions.md` §2 and the estate's
  20+ ATED pages own that. This page states the trigger in one line ("if the property is worth
  over £500,000 and a non-natural person — your company — owns it, ATED applies unless a
  relief is claimed; occupation by a director/connected person is the classic relief-clawback
  trigger") and links to `ated-complete-guide-2026-27` (bands/rates) and
  `ated-relief-clawback-occupation-by-a-non-qualifying-occupation` (the clawback mechanics for
  exactly this scenario) — CONFIRMED ON DISK, both.
- Restate the mechanics of `charging-market-rent-to-own-property-company-tax-treatment`
  (CONFIRMED ON DISK). That page owns HOW to charge market rent (the mechanics of setting and
  documenting a market-rent lease between company and director). This page covers the
  DECISION and the tax consequence of NOT charging market rent (or charging below it) —
  summarise the "charge market rent instead" alternative in 2-4 sentences and link out, do not
  reproduce its mechanics.
- Present the ATED relief-for-related-persons/market-rent test as a fresh analysis — link to
  `ated-relief-for-related-persons-and-market-rent-a-complete-guide` (CONFIRMED ON DISK) for
  readers who want the full related-persons relief test, rather than rebuilding it here.

## 6. Facts pack (dated 2026-09-01, verified vs `docs/property/house_positions.md`)

- **Benefit in kind — statutory hook.** ITEPA 2003 ss.97-113 (living accommodation BIK) is
  confirmed as the correct statutory range in `house_positions.md` line 3830 ("employer-
  provided live-in accommodation ... per ITEPA 2003 ss.97-113"), cited there in the context of
  property managers rather than director-shareholders, but the same statutory range is the
  general living-accommodation BIK code and applies to a director occupying company property.
  **Verify at write time:** the detailed BIK valuation mechanics (annual value basis under
  s.105, the "additional yearly rent" charge under s.106 for properties costing over £75,000,
  and the general rule that a director's BIK is based on the higher of the property's gross
  rating value/annual value or actual rent paid by the company) are NOT locked in
  house_positions.md beyond the statutory-hook citation — do not state a specific £75,000
  additional-charge threshold, valuation formula, or exemption condition without checking
  current HMRC guidance (EIM11400+ manual) and legislation.gov.uk at the point of writing.
- **Rent-free or below-market-rent occupation triggers the BIK charge** on the director as
  employment income (reported via P11D, company pays Class 1A NIC on the value) UNLESS the
  director pays full market rent to the company, in which case there is no BIK (this is the
  link-out point to the market-rent mechanics page).
- **s.455 angle.** If the company effectively funds the director's occupation without adequate
  rent (e.g. the director owes the company money in respect of unpaid "rent" that HMRC would
  treat as a loan), an overdrawn director's loan account can trigger the s.455 CTA 2010 charge
  at **35.75% for loans/overdrawn balances arising on or after 6 April 2026** (33.75% before
  that date) — `house_positions.md` line 1185/1207, verified gov.uk. This is a DIFFERENT charge
  from the BIK charge (BIK taxes the value of occupying the property; s.455 taxes an overdrawn
  loan balance) — the writer must not conflate the two; a director can face both simultaneously
  if rent is neither paid nor properly charged as a debt owed to the company that stays
  unpaid beyond 9 months after the company's year end.
- **ATED trigger — one line, then link.** ATED applies to a company (non-natural person)
  holding a UK residential dwelling worth over **£500,000**; occupation by a director or
  connected person is the classic scenario that fails the "let to an unconnected tenant on
  commercial terms" relief and can trigger a clawback if the relief was previously claimed —
  `house_positions.md` §2 (bands, mechanics) and the ATED clawback pages own the detail; do not
  reproduce the ATED band table or clawback mechanics here.
- **Mortgage and lease breach angle.** Most standard buy-to-let mortgages (personal or limited
  company) prohibit the borrower or a connected person from occupying the property — occupation
  by the director is very likely a breach of the mortgage terms (residential owner-occupier
  underwriting is different from BTL underwriting) and can also breach the terms of any assured
  shorthold tenancy framework the property was let under. Flag this as a practical/lender risk
  alongside the tax risk — not a house_positions.md tax fact, a market/lending-practice point;
  do not present a specific lender's policy as universal, frame as "check your mortgage terms
  before a director moves in, most BTL products prohibit connected-person occupation."

## 7. Interlink spec

Verify slugs on disk before linking (all four confirmed present):
- `charging-market-rent-to-own-property-company-tax-treatment` — CONFIRMED ON DISK. Owns the
  market-rent mechanics; link as the "avoid the BIK charge" route.
- `ated-complete-guide-2026-27` — CONFIRMED ON DISK. Owns ATED bands/rates/mechanics.
- `ated-relief-clawback-occupation-by-a-non-qualifying-occupation` — CONFIRMED ON DISK. Owns
  the clawback mechanics for exactly this occupation scenario.
- `ated-relief-for-related-persons-and-market-rent-a-complete-guide` — CONFIRMED ON DISK. Owns
  the related-persons/market-rent relief test in full.
- **Up-link (required):** `/spv-company` (U01 pillar; route VERIFIED ON DISK 2026-09-01 at `Property/web/src/app/spv-company/page.tsx`, so the path is `/spv-company` at the site root, NOT under `/services/` — the link target is safe to write now, the U01 rewrite does not move it) — hub navigation, run-the-
  company cluster.

## 8. Editorial conventions (hard rules)

£nnn always (never "£nnn.00", never a bare number for currency); "per cent" in prose, % only in
tables; hyphenated compounds (benefit-in-kind charge, below-market-rent occupation,
market-rent lease, buy-to-let, connected-person occupation); sentence-case H2s; no em-dashes
anywhere in the copy; no templated second paragraph (do not open with a rephrased restatement of
the H1, the pattern Wave 1 QA flagged across multiple posts); every FAQ answer distinct in
substance, not a rephrasing of a body section; no build or pipeline narration in the copy
("verify at build", inline house-position codes, "as covered above"); every citation either
verified against `house_positions.md` or explicitly flagged for the factual QA pass.

**Citation status, stated explicitly so the writer does not over-claim.** ITEPA 2003 ss.97-113 is
the correct statutory range for living-accommodation benefit in kind and IS confirmed in
`house_positions.md` (line 3830) — cite the range. **Everything inside that range is
VERIFY-AT-WRITE, not asserted**: the annual-value basis, the additional-yearly-rent charge, the
£75,000 cost threshold, and any exemption condition are NOT locked in `house_positions.md` and
must be checked against HMRC EIM11400+ and legislation.gov.uk before publishing. Write the
section so it remains correct at the framework level (there is a BIK charge, it is valued by
statute, it disappears if full market rent is paid) and only add the detailed valuation
mechanics once verified. Do not present any specific threshold or formula as settled on the
strength of this brief.

## 9. Fresh outline

**H1:** Can I live in a house owned by my limited company?

**H2 skeleton (from the variant list):**
1. Short answer: yes, but it almost never makes tax sense without charging market rent
   (verdict-up-top)
2. Benefit in kind on company-owned accommodation: how HMRC taxes rent-free or below-market
   occupation (ITEPA 2003 ss.97-113)
3. Charging market rent instead: the alternative that avoids the BIK charge (2-4 sentence
   summary, link to the mechanics page)
4. Does ATED apply if I live in the property? (one-line trigger + link to the ATED guide and
   clawback page)
5. The s.455 angle: what happens if "rent" becomes an unpaid director's loan
6. Can I rent a flat through my limited company / can I live in a buy to let owned by my
   company? (the general BIK answer, restated for the flat/BTL framing)
7. Mortgage and lease breach: why most BTL products prohibit this and what to check first
8. Comparison table: rent-free occupation vs below-market rent vs full market rent (BIK
   exposure, s.455 exposure, ATED relief eligibility)
9. Worked example: a director occupying a company-owned £600,000 flat rent-free for a year,
   showing the BIK charge, the ATED trigger, and the market-rent alternative side by side
10. FAQ (10-14 entries): can i live in a house owned by my limited company, can i rent a flat
    through my limited company, can i live in a buy to let owned by my company, benefit in
    kind on company-owned accommodation, does ated apply if i live in the property, can my
    company buy the house i live in, can my family live in a company property, what if i pay
    some rent but not full market rent, does this affect the company's mortgage, what happens
    if i stop occupying the property, can a director's family member live there instead, is
    this different from a normal company car benefit in kind.
