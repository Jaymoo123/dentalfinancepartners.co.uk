# Launch core — Crypto traders & investors (R3)

Date: 2026-07-11. **Volumes/KD are NOT available this run** ($0 DataForSEO, guard exhausted
and not raised). Every pick below is evidenced by SERP behaviour (34 verified commercial
SERPs, `raw/serp_raw.json` + `raw/verify_evidence.json`) and autocomplete demand signals
(`raw/autocomplete_raw.json`); volume/KD confirmation is queued in DOSSIER "TODO — paid
pulls" and may re-rank the queue (not the architecture).

## Site architecture: audience hubs (/for/*)

One audience family (people with cryptoasset tax problems), segmented the way rivals segment
and the way HMRC's rules split (CGT vs income vs disclosure) — same /for/* architecture the
estate already runs:

```
/                          Crypto tax accountants (head; 22 dedicated rivals contest it)
/for/investors             buy-hold-swap CGT: s104 pools, AEA, swaps-are-disposals
/for/day-traders           investor-vs-trader status, high-volume reconciliation, forex/CFD adjacency
/for/defi-and-staking      the honest-uncertainty wedge (CRYPTO61000): LP entries, staking income
/for/nft-creators-and-flippers  income vs CGT split, royalties
/for/miners                receipt-value income + second-leg CGT
/for/businesses            companies holding/accepting crypto: CT not CGT, balance sheet, VAT
/services/hmrc-disclosure  nudge letters, Cryptoasset Disclosure Facility, penalties — flagship lane
/calculators/*             fleet per CALCULATORS.md (CGT estimator, staking/mining, disclosure, status checker)
/research/crypto-tax-gap-index   flagship asset (DATA_ASSET.md)
/blog/*                    clusters below
```

BUSINESS-audience rule honoured: /for/businesses carries the employer/company frame (paying
staff in tokens, treasury holdings); lead forms get segment-specific optional fields
(exchanges used, approx. transaction count, software used, nudge-letter received y/n).

## Intent classes

1. **HIRE** (lead pages): "crypto tax accountant uk" family + segment heads. Evidence: all 34
   SERP queries returned paying rivals (22 dedicated brands = sustained commercial value).
2. **DISTRESS** (highest-value capture): nudge letter / disclosure / investigation queries.
   Evidence: a legal flank (barristers, tax solicitors) ranks here — lawyers don't chase
   worthless SERPs; CARF deadline hard-dated on gov.uk (31 May 2027 first reports).
3. **RECONCILIATION**: "koinly accountant", "software says X" — only accountants can serve it;
   SERP is thin firm-listings (verified in sweep).
4. **DIY-INFORMATIONAL** (software-shadowed): rates/allowance/how-to questions. Koinly-class
   owns these; use for authority, GEO/AI-answer citations and calculator funnels only.

## Launch core (24 pages + 4 tools + 1 asset)

**Hubs (8):** homepage + the 6 /for/* pages + /services/hmrc-disclosure. Evidence per pick:
investors/traders/DeFi/NFT/miners/business all have dedicated rival pages or segment pages
(yourcryptoaccountant.co.uk segments identically; cryptotaxaccountant.uk has day-trader and
developer pages) — the segmentation is market-proven; disclosure gets hub status because the
legal flank + Menzies CDF page prove value and no dedicated brand owns it end-to-end.

**Money/service pages (4):**
- Crypto self assessment & SA108 filing — "crypto self assessment accountant" SERP verified;
  productised-fee precedent (bitcoinaccountant.co.uk £350) proves a price-anchored page works.
- Koinly/Recap/CTC report review & reconciliation — reconciliation intent; house positions 4-5
  (UK pooling vs software FIFO defaults) are the technical hook no software page can copy.
- Crypto CGT planning (spouse transfers, loss harvesting, negligible value) — house positions
  3, 7; Lanop's blog cluster proves the demand surface.
- Investor-vs-trader status opinion — "am i a crypto trader hmrc" SERP verified; pairs with
  the status-checker tool.

**Blog clusters at launch (12 posts, 2 per hub lane):** swaps-are-disposals explainer;
same-day/30-day rules worked example; DeFi lending/LP disposals under CRYPTO61000; staking
rewards two-step (income then CGT); mining £1,000 allowance boundary; NFT income-vs-CGT; lost
records & exchange-collapse (negligible value claims); nudge-letter anatomy + CDF walkthrough;
CARF countdown explainer; paying staff in crypto (PAYE/NIC, readily convertible assets);
company crypto treasury accounting; forex/spread-betting tax three-way (adjacent lane). All
map to clusters in `topic_pool_final.json` and cite the 30/30 fetch-verified sources in
HOUSE_POSITIONS_OUTLINE.md.

**Tools at launch (4):** per CALCULATORS.md launch tier — crypto CGT estimator (s104
simplified), staking & mining income estimator, HMRC disclosure/penalty estimator, investor
vs trader status checker. Scenario-tools-not-Koinly framing is locked there.

**Asset:** UK Crypto Tax Gap & Compliance Index (DATA_ASSET.md) — FCA wave data + CARF
countdown; v1 may ship as the countdown + headline model with per-region splits as
fast-follow, keeping launch scope honest.

## Queue (post-launch, from pool)

~500-800 curated page topics (TOPICS.md working range): calculator queue tier 5-9
(loss-harvesting, bed-and-breakfast matcher, forex estimator, token-salary PAYE, gift/IHT),
per-exchange/per-coin long-tail ONLY where a real tax angle exists (never thin "Binance tax
UK" template pages — drpaccountants' 2,000-URL programmatic play conflicts with the
gold-standard bar and is our quality gap to exploit, not copy), the DIY question layer for
GEO/AI-answer presence.

## Success criteria note

Head DIY terms will look unwinnable on dashboards (software owns them). Judge the site on
disclosure/reconciliation/segment-hub leads and tool-assisted conversions — the same
judge-on-leads lesson as hospitality's takeaway leg. Volume/KD from the paid pulls will
re-rank the blog queue; the hub architecture should not change.
