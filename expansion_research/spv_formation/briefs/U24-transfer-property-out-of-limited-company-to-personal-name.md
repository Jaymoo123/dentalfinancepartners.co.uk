# U24 — transfer-property-out-of-limited-company-to-personal-name

## 1. Unit facts

- Type: NEW blog post
- Category: Incorporation & Company Structures
- Slug: `transfer-property-out-of-limited-company-to-personal-name`
- Hub: HUB (transfer-in cluster reverse-journey / selling-closing adjacent, under the
  `/spv-company` pillar)
- Priority: P2
- Verdict rationale (`page_map.csv` U24): "Genuine gap: the whole corpus assumes transfer IN.
  transferring-a-business-out-of-a-company is a business-transfer frame, not a single-property
  extraction. Covers s.455, distribution in specie, SDLT on assumed debt, CGT/CT on the
  company disposal."

## 2. Dominant query + full variant list

**Dominant query (owns the H1):** can i transfer property from limited company to individual —
`page_map.csv` U24. No standalone volume figure measured on the exact phrasing; this is a
genuine corpus gap (the whole transfer-property corpus is built around transfer-IN intent) and
the page is justified by the reverse-journey whitespace, not a large measured head term.

| Tag | Phrasing | Volume/source |
|---|---|---|
| dominant | can i transfer property from limited company to individual | page_map.csv U24 |
| action | how to take a property out of my limited company | page_map.csv U24 |
| technical | distribution in specie of property to a director | page_map.csv U24 |
| question | company sell property to director | page_map.csv U24 |
| conversational | can i sell my company property to myself | page_map.csv U24 (also `questions_corpus.csv`, tagged selling+closing) |
| question | what tax do i pay taking a property out of a company | page_map.csv U24 |
| technical | sdlt on transferring property from company to shareholder | page_map.csv U24 |
| question | can company sell property to director | `questions_corpus.csv`, tagged selling+closing |
| adjacent | how do you transfer a property out of a ltd company to individuals | 6 impressions, Bing, pos 8.0, `our_queries.csv`, currently landing on `how-to-transfer-property-into-limited-company-uk` (the transfer-IN page — misrouted, this unit is the correct destination) |

**Zero-volume but real (cover, do not invent extra weight for):** `demand_corpus.csv` returns
only tangential noise for this direction ("transfer of property without possession", "transfer
deed without lawyer") — not this unit's intent, do not cite as supporting volume. This
confirms the page_map.csv verdict: this is a genuine gap with no measured search volume of its
own, built because the reverse journey is a real reader need (directors closing or restructuring
who ask "how do I get the house back into my own name") not because of a keyword cluster.

## 3. Our-data baseline

One directly relevant row in `our_queries.csv`: "how do you transfer a property out of a ltd
company to individuals" — 6 impressions, 0 clicks, Bing, position 8.0, currently landing on
`how-to-transfer-property-into-limited-company-uk`. That page is about the opposite direction
(personal to company); a reader searching the reverse journey landing there and not clicking
(position 8, 0 clicks) is a plausible content-mismatch signal, not proof of demand at scale.
Treat this as one weak corroborating signal, not the basis for the page.

No other our-data rows touch the OUT direction. This unit is being built on the page_map.csv
gap analysis (whole corpus is transfer-IN-shaped) rather than on strong measured demand — say
so plainly in the intro rather than overstating search volume.

## 4. Competitor coverage floor

`competitor_urls.csv` returns nothing on point (a "product transfer rate switches" mortgage
page from needingadvice.co.uk is the closest keyword match and is unrelated — a remortgage
product-switch page, not a company-to-individual property transfer). No competitor in the
corpus owns this reverse journey as a dedicated page. Genuine whitespace.

## 5. Seam MUST-NOTs

This page owns the REVERSE journey: why a director would want to (retirement from the
business, divorce/succession planning, winding down a portfolio one property at a time,
lender/insurance reasons), distribution in specie mechanics, SDLT on the way out, CGT/CT in
the company on the disposal, and when it beats an outright sale to a third party.

**It must NEVER:**
- Duplicate `how-to-close-a-property-limited-company` (CONFIRMED ON DISK). That page owns
  route choice for winding up the WHOLE company (dormant / DS01 / MVL). Extracting a single
  property while the company stays open and trading is a DIFFERENT scenario — flag this
  distinction explicitly in the intro, and link to the closing page only for readers who are
  planning to wind up entirely, not extract one asset.
- Duplicate the MVL analysis on `mvl-members-voluntary-liquidation-property-company-cgt-vs-income-treatment`
  (CONFIRMED ON DISK). If a reader's real intent is "I want to close the company and get the
  properties out via liquidation", that is the MVL page's territory (capital vs income
  treatment of the final distribution) — summarise in 2-4 sentences and link out, do not
  re-argue CGT-vs-income treatment of a liquidation distribution here. This page's distribution
  in specie is a live-company dividend-in-kind, a different mechanism from an MVL distribution.
- Touch the "can I sell my house to my own company" trap family (`PAGE_MAP.md` §9.9, U36) —
  that is transfer-IN intent wearing a sale verb and belongs on U15/U16 as an FAQ block. This
  page is the genuine OUT direction (company already owns the property, individual wants it
  back); do not blur the two, and do not build any content answering "can I buy my own
  company's house" as if it were this page's topic.

## 6. Facts pack (dated 2026-09-01, verified vs `docs/property/house_positions.md`)

- **Mechanism: distribution in specie.** A company can transfer an asset (the property) to a
  shareholder/director as a dividend paid in kind instead of cash — a distribution in specie —
  provided the company has sufficient distributable reserves to cover the market value of the
  property being distributed (Companies Act 2006 general distribution rules; the company's
  accounts must show adequate realised profits). **Verify at write time:** the specific CA 2006
  distributable-reserves provisions (s.830 is the general rule) before citing a section number
  — house_positions.md carries no locked citation for this mechanic; flag as needing
  verification rather than guessing a paragraph reference.
- **Income tax on the recipient.** A distribution in specie is taxed on the shareholder as a
  dividend, at market value of the property received, under the normal dividend tax rules —
  2026/27 dividend rates are **10.75% basic, 35.75% higher, 39.35% additional** on top of the
  £500 dividend allowance (basic and higher rates rose 2 percentage points from 6 April 2026;
  2025/26 and earlier rates were 8.75%/33.75%/39.35% — do not use the older figures for a
  2026/27-onwards example). `house_positions.md` line 1206, verified gov.uk 2026-05-23. A
  large single-property distribution can push the recipient into higher/additional rate for
  that year — flag this as the single biggest practical cost.
- **SDLT on the way out.** Where the individual takes on any outstanding company mortgage debt
  attached to the property (assumption of debt), that assumed debt counts as chargeable
  consideration for SDLT even though no cash is paid — the transaction is not automatically
  SDLT-free just because it is a dividend in kind. If there is no debt (property owned outright
  by the company), there may be no chargeable consideration and no SDLT return may be needed —
  but connected-party market-value deeming rules that apply to transfers INTO a company do not
  mechanically apply in the same way to a genuine nil-consideration distribution OUT; **verify
  at write time** against current SDLT guidance (SDLTM manual) rather than assuming the market
  value substitution rule mirrors the transfer-in direction, since house_positions.md's SDLT
  section (§1) is written from the transfer-in perspective and does not carry a locked position
  on this reverse case.
- **CGT/CT on the company's disposal.** The company itself makes a disposal at market value for
  Corporation Tax purposes (deemed market value on a distribution to a connected person,
  standard TCGA/CTA transfer-pricing-adjacent treatment) — any gain over the company's base
  cost is taxed at the company's Corporation Tax rate (19% small profits rate / 25% main rate
  with marginal relief between £50,000 and £250,000 profits, per the standard CT rate
  structure referenced elsewhere in the SPV programme, e.g. U27's facts pack) BEFORE the
  property leaves the company. This is a real cost that a landlord contemplating "just take it
  back out" often misses — flag prominently.
- **When it beats an outright sale to a third party:** avoids estate agency fees and open-market
  marketing, keeps the property in the family/director's hands rather than selling to a
  stranger, and can be timed to use a particular tax year's dividend allowance or lower income
  year. It does NOT avoid CGT/CT in the company or SDLT on any assumed debt — the tax cost is
  real, just different in shape from a sale (dividend tax + company CT/CGT vs sale proceeds
  minus CT/CGT). Frame the "why" section around this honest trade-off rather than implying the
  route is a tax-saving trick.

## 7. Interlink spec

Verify slugs on disk before linking (both confirmed present):
- `how-to-close-a-property-limited-company` — CONFIRMED ON DISK. Link for readers whose real
  intent is winding up the whole company rather than extracting one property; do not duplicate
  its route-choice content.
- `mvl-members-voluntary-liquidation-property-company-cgt-vs-income-treatment` — CONFIRMED ON
  DISK. Link for readers whose real intent is a formal liquidation distribution; summarise in
  2-4 sentences, do not restate the CGT-vs-income analysis.
- **Up-link (required):** `/spv-company` (U01 pillar; route VERIFIED ON DISK 2026-09-01 at `Property/web/src/app/spv-company/page.tsx`, so the path is `/spv-company` at the site root, NOT under `/services/` — the link target is safe to write now, the U01 rewrite does not move it) — hub navigation.
- **Sibling cross-link:** `transfer-property-to-limited-company-conveyancing` (U21, if built) —
  flag as the forward journey (personal into company); link as "if you're moving a property
  INTO your company instead, see..." once U21 exists on disk.
- **Sibling cross-link:** `how-to-transfer-property-into-limited-company-uk` (CONFIRMED ON
  DISK) — the transfer-IN tax how-to, useful contrast link for readers confirming they have the
  right page.

## 8. Editorial conventions (hard rules)

£nnn always (never "£nnn.00", never a bare number for currency); "per cent" in prose, % only in
tables; hyphenated compounds (distribution-in-specie route, market-value disposal,
connected-party transfer, buy-to-let, close-company loan charge); sentence-case H2s; no
em-dashes anywhere in the copy; no templated second paragraph (do not open with a rephrased
restatement of the H1, the pattern Wave 1 QA flagged across multiple posts); every FAQ answer
distinct in substance, not a rephrasing of a body section; no build or pipeline narration in the
copy ("verify at build", inline house-position codes, "as covered above"); every citation either
verified against `house_positions.md` or explicitly flagged for the factual QA pass. **Two
citations in §6 are flagged UNVERIFIED and must be checked at write time or written around: the
CA 2006 distributable-reserves section number, and the SDLT treatment of a genuine
nil-consideration distribution out.** Do not publish either as a stated section reference
without checking it.

## 9. Fresh outline

**H1:** Transferring a property out of your limited company and back into your own name

**H2 skeleton (from the variant list):**
1. Why a director wants to take a property back out of the company (retirement, succession,
   winding down a portfolio one asset at a time, lender/insurance reasons) — verdict-up-top:
   this is a taxable event on both sides, not a free reversal
2. Distribution in specie: the mechanism (dividend paid in property instead of cash,
   distributable reserves requirement)
3. What tax do I pay taking a property out of a company? Income tax on the shareholder at
   dividend rates, on the property's market value
4. SDLT on transferring property from company to shareholder: only where debt is assumed
5. CGT and Corporation Tax inside the company on the deemed-market-value disposal (before the
   property even reaches you)
6. Can company sell property to director / can I sell my company property to myself? (the sale
   route as an alternative to a distribution in specie — same CT exposure in the company, plus
   the director pays real consideration instead of dividend tax; compare the two)
7. When this beats selling to a third party (and when it doesn't)
8. Comparison table: distribution in specie vs sale to the director vs sale on the open market
   (tax treatment, cash needed, speed, keeps it "in the family")
9. Worked example: a director extracting one mortgage-free rental property via distribution in
   specie, showing dividend tax on the director's side and the CT charge on the company's gain
10. FAQ (10-14 entries): can i transfer property from limited company to individual, how to
    take a property out of my limited company, distribution in specie of property to a
    director, company sell property to director, can i sell my company property to myself,
    what tax do i pay taking a property out of a company, sdlt on transferring property from
    company to shareholder, do i need a solicitor for this, does the company need distributable
    reserves, what if the company still has a mortgage on the property, is this different from
    closing the company, can i do this with more than one property, what if there's more than
    one shareholder, how is the property valued for the distribution.
