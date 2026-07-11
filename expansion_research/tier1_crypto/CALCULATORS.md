# Calculator fleet — Crypto traders & investors site (R3, 2026-07-11)

Pattern: property calculator-fleet engine (config-driven, 1 file + 1 import per tool).
Demand evidence: 229 "calculator" autocomplete suggestions (`raw/autocomplete_raw.json`)
PLUS measured DFS volumes/KD/CPC pulled late 2026-07-11 (`raw/dfs_head_volumes.json`, UK
location 2826). Launch tier re-ranked by measured volume; membership unchanged.

## Honest framing constraint (read first)

The full "upload your CSV, get your tax bill" job is Koinly/Recap/CTC's product — hundreds of
exchange integrations, per-transaction pooling across thousands of trades. We do NOT compete
with that; a browser calculator that pretends to is AI-scammy and fails the gold-standard bar.
Our tools are **scenario/estimate tools that end at "your situation has X complexity →
speak to us"** — the same conversion job the property fleet does. Each tool states the
simplification openly (e.g. "assumes disposals matched against your s104 pool only; same-day
and 30-day matching can change the answer — that is exactly the work we do").

## Launch tier (4) — re-ranked by measured volume (DFS 2026-07-11)

Measured per-tool demand:
- CGT estimator: "crypto tax calculator uk" 390/mo KD 0 CPC £7.56; "crypto tax calculator"
  1,000/mo KD 22; "crypto capital gains tax calculator" 50/mo KD 7 CPC £26.21 (highest CPC
  measured anywhere in the pull); "cgt on crypto calculator" below threshold. Clear #1.
- Disclosure/penalty estimator: "hmrc penalty calculator" 260/mo KD 0 CPC £1.56 — moves
  from #3 to #2 on data.
- Status checker: "day trading tax calculator uk" 40/mo KD 10 CPC £14.04; paired head
  "day trader tax uk" 170/mo KD 0 — #3.
- Staking & mining estimator: "crypto staking tax calculator" 10/mo; "bitcoin mining tax
  calculator" returned no volume (below DFS threshold). Moves from #2 to #4. FLAG: the
  weakest launch-tier pick on measured data; retained on autocomplete evidence + hub-lane
  coverage (miners + defi-and-staking hubs need a tool), not on volume. If launch scope
  tightens, this is the one to defer to the queue.

1. **Crypto CGT estimator (s104 pooling, simplified)** — user enters per-token totals
   (total bought £, total sold £, units) + income band; tool computes pooled average cost,
   gain, AEA offset, 18%/24% split across the band boundary. Explicitly flags same-day/30-day
   as out-of-scope of the estimate. Evidence: "crypto capital gains tax calculator",
   "cgt on crypto calculator", "section 104 pool calculation" (autocomplete);
   "crypto tax calculator uk" head cluster is the demand magnet even where intent is DIY —
   it earns links/GEO citations and feeds the complex-case funnel.
2. **HMRC crypto disclosure estimator (nudge-letter triage)** — behaviour band (reasonable
   care / careless / deliberate) → years assessable, penalty range %, interest flag; output is
   a range + "disclosure route" explainer, not a promise. Evidence: "hmrc penalty calculator"
   260/mo KD 0 (measured); "hmrc crypto disclosure facility", "hmrc disclosure how many
   years", "crypto nudge letter" (autocomplete). This is THE accountant-seeking tool —
   highest lead value per use.
3. **Investor vs trader status checker** — badges-of-trade questionnaire (frequency,
   organisation, intention...) → "almost certainly investor (CGT)" default with honest
   "exceptional circumstances" trader outcome; doubles for day-trader/forex content lane.
   Evidence: "day trading tax calculator uk" 40/mo KD 10 CPC £14.04 + "day trader tax uk"
   170/mo KD 0 (measured); "how much tax do day traders have to pay", "forex trading tax uk"
   cluster (47 + 32 autocomplete rows).
4. **Staking & mining income estimator** — receipts valued at receipt date, misc-income vs
   £1,000 allowance, marginal-rate income tax, plus the second-leg CGT base-cost explainer.
   Evidence: "crypto staking tax calculator" 10/mo (measured; mining variant below
   threshold — weakest launch pick, see flag above); "crypto staking rewards uk tax",
   "hmrc crypto staking", "bitcoin mining tax calculator" (autocomplete).

## Queue (5)

5. Crypto loss-harvesting / negligible-value checker (67 "loss" rows; rug-pull angle).
6. Same-day/30-day (bed-and-breakfast) matcher for a SINGLE token's recent trades — the one
   pooling edge we can do properly at small scale (5 autocomplete rows, high complexity-signal).
7. Forex/day-trader tax estimator (CGT vs income vs spread-bet-exempt three-way).
8. Crypto salary/payment-in-tokens PAYE estimator (employer + employee view).
9. Crypto gift/IHT scenario tool (spouse NGNL vs connected-person market value).

## Rejected

- Full portfolio import/API sync tool — that is a software product, not a calculator; ceded to
  Koinly-class. Never build a worse Koinly.
- "Which crypto tax software?" comparison tool — affiliate-listicle pattern, off-brand for a
  firm site; a comparison GUIDE page is fine, a tool is not.

## HMRC pooling complexity — honest note

True s104 computation requires full transaction history ordering with same-day then 30-day
then pool matching, per token, including fork base-cost splits (CRYPTO22300). A stateless
web calculator cannot do this correctly for an active trader, and we say so on-page. That
admission is itself the conversion mechanism and the credibility differentiator vs the
"instant accurate tax report" claims of the software layer.
