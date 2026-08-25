# PACK E2: how-to-sell-a-manufacturing-business — REFRAME

Derived 2026-08-25 from FROZEN dossier `../retail_product_2026-08-25.md` only. Reads with
`language_spec.md` (lead structure: **deal-stage-led**). Fifth surface of the manufacturing hub.

## 1. Target and permission level

- Seed: `generalist/web/content/blog/how-to-sell-a-manufacturing-business.md`.
- Grade **REFRAME** (dossier §5): Bing 0/0, Google 0 clicks / 9 impressions / pos 7.4. The dossier
  states it explicitly: **position 7.4 on nine impressions is immature, not equity.** Everything
  writable, `depth=full`.
- Frozen-ground check before edit; verify against the live `monitored_pages` table.
- Revert path: `git revert` on the single file.
- C1 gate: row 73, no C1 restriction. CLEAR.
- Ground truth: **§5** (capital gains tax and Business Asset Disposal Relief, BADR **18% from
  6 April 2026**, 14% for 2025/26, 10% before, £1m lifetime limit), **§3** (corporation tax, for the
  asset-sale route), **§1** (structures), **§8** (balancing charges on plant disposed of with the
  business), **§6** (partnership changes, where relevant), **§10** (pensions, only if the page
  touches what the seller does with the proceeds, and see fences).
- **Query set gate (dossier §6):** E2's target keyword set is to be drawn from the N3 harvest at
  pack derivation. That harvest is **delta D1 and was gate-blocked**, so the slice in §3 below is
  the honest measured position and is thinner than it should be. Re-check after D1 runs.

## 2. Equity register

Effectively none: 9 impressions, 0 clicks, no Bing. **Do-not-lose:** whatever exit-related phrasings
the page currently attracts must remain matchable post-rewrite. Run a page-level GSC query pull on
this exact URL before writing and record the result; the dossier's stage0 pull is single-dimension
(delta D5) so the 9 impressions are not attributed to named queries yet.

## 3. Market keyword slice (measured, thin, D1-gated)

No ledger row assigns measured volume to this surface: the manufacturing rows in the ledger belong
to the pillar (N3) and the costing page (N4). The exit topic is carried on the seed's own 9
impressions and on consensus-shape evidence from the tier1 pool.

**Coverage over selection: volume is not a gate.** The commercial case is intent quality, not
volume. A manufacturer researching an exit is the highest-value reader in the cluster, and the
dossier's own model is lead-gen, not traffic.

## 4. Competitor teardown (fetched 2026-08-25, free)

No manufacturing-exit page appears in the fetched specialist field:

- **skynet `/manufacturing-accountant/`** (p11) and **`/common-manufacturing-accounting-issues/`**
  (p7-11) contain no exit, sale, succession or disposal content at all. Skynet's ten named problems
  are all operational.
- The institutional tier (MHA, Azets, PKF Francis Clark) does publish corporate-finance and exit
  content, and it is genuinely good, but it is written for advisers and mid-market deals and it is
  brand-defended rather than page-defended.
- The general "how to sell a business" head terms are held by business-sale marketplaces and broker
  sites, which have a commercial interest in not leading with tax.

Honest limitation, stated per the language spec's method: **no manufacturing-exit competitor was
fetched because none surfaced in the free sweep for this cluster.** The teardown above is a
negative finding, not an observation of a page.

## 5. Whitespace

- **Tax attached to each deal stage**, which the marketplace and broker field structurally avoids:
  grooming (what to fix in the accounts a year out, and why stock and work-in-progress policy
  matters at diligence), heads of terms, the share-sale versus asset-sale fork, completion accounts,
  earn-outs, and post-completion.
- **The share-sale versus asset-sale fork worked with numbers**, which is the entire decision: the
  seller usually wants a share sale (capital gains treatment, BADR), the buyer often wants an asset
  sale (base cost, no history), and the tax difference is large and computable.
- **BADR at the dated rate**, done correctly: 18% from 6 April 2026, 14% for 2025/26, 10% before,
  the £1m lifetime limit, and the qualifying conditions. Most published content still quotes 10%.
- **Balancing charges on plant**, which a capital-intensive seller is routinely blindsided by and
  which connects this page to N5.
- A recomputable 2026/27 worked example: one factory sale run both ways, share and asset, to a
  net-of-tax figure.

## 6. Fences (binding)

- **No investment, pension or wealth advice on the proceeds.** The page stops at the tax on the
  sale. What the seller then does with the money is out of scope, and one signposting sentence to
  regulated advice is the ceiling. This is a standing estate fence and it bites hardest on exit
  content.
- **No business-valuation multiples and no valuation figures.** What drives value may be described;
  a multiple may not be published.
- **No broker or marketplace referral, and no introducer arrangement implied.**
- **BADR is always date-tagged**: 18% from 6 April 2026. A bare "10% BADR" is an automatic QA fail.
- **Assignment split:** the hire framing is N3's; capital allowances and balancing-charge mechanics
  are N5's beyond one paragraph; stock and WIP valuation policy is N4's beyond the diligence point.
- No house-position citations in reader copy (report only): cite TCGA 1992, the gov.uk BADR page and
  the relevant HMRC manual codes instead. No em-dashes. 2025/26 income tax and Class 4 figures carry
  the "still current when checked August 2026" hedge.

## 7. Acceptance criteria (deterministic)

1. Queries answerable as H1, H2 or FAQ: how to sell a manufacturing business; tax on selling a
   manufacturing business; share sale or asset sale; what BADR is worth on a factory sale; what
   happens to capital allowances when the business is sold; how to prepare a factory for sale.
   Plus every query the pre-write page-level GSC pull attributes to this URL.
2. Figures, date-tagged and recomputable: BADR **18% from 6 April 2026** (14% for 2025/26, 10%
   before) with the **£1m lifetime limit**; CGT main rates; annual exempt amount; corporation tax
   25% / 19% with the £50,000 and £250,000 limits on the asset-sale route; balancing charge
   arithmetic tied to the §8 rates.
3. **One worked example run both ways** (share sale and asset sale) to a net-of-tax figure, every
   line re-derivable. This is the page's competitive claim.
4. Structure follows the deal-stage lead for the opening 40%. No H2 phrasing shared with N3, N4 or
   N5.
5. Links: N3, N4, N5. Resolver-clean, zero invented slugs. §4 floors plus equity floor plus coverage
   floor pass.
6. Pre-write page-level GSC query pull recorded in the delivery report; D1 re-check noted as
   outstanding.

## 8. Expectation

Low measured volume, highest intent quality in the cluster, and an unoccupied tax-first angle on a
topic the commercial field deliberately avoids. Realistic: hold the existing 9 impressions and
broaden onto exit-tax phrasings within a quarter; Bing earlier. This surface is judged on lead
quality and impression breadth, not on head-term position. Maturity caveat: a reframed page is new
surface, judge at 28d Bing / 90d Google. Failure trigger: zero impressions at 90d post-index, or any
currently-attributed query unmatchable. **Standing risk:** BADR is on a legislated rate path and has
moved twice; the rate paragraph is built as one replaceable block for a dated back-patch.

## 9. Cannibalisation notes

| Existing page | Overlap | Resolution |
|---|---|---|
| `how-to-sell-a-ecommerce-business.md` | selling a business, same title formula | **Differentiate, do not collapse.** Both are "how to sell a X business" pages on the same site. E2 must not reuse that page's H2 sequence or its worked example shape, and must lead on manufacturing-specific ground (plant balancing charges, stock and WIP at diligence, machinery-heavy asset sales). Cross-link is optional; a shared skeleton is a QA fail. **Recorded as a live sameness risk for editorial QA.** |
| `how-to-sell-a-care-home-business.md` | same title formula | Same treatment: no shared skeleton, no shared worked example. |
| N2 (this wave), buy-or-sell-a-shop section | selling a business | Different trade and different scale; N2's fork is a section, E2 is the page. No shared phrasing. |
| N5 (this wave) | balancing charges | E2 carries one paragraph and links. |
