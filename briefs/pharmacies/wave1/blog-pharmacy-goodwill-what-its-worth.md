---
slug: pharmacy-goodwill-what-its-worth
tier: blog
route: /blog/buying-and-selling/pharmacy-goodwill-what-its-worth
category: buying-and-selling
intent: EVENT-PROBLEM (assist + capture). Buyers and sellers want to understand pharmacy goodwill and what a pharmacy is worth. Method-level valuation only: what drives goodwill (NHS contract, item volume), the two standard method families (EBITDA multiple, pence-per-item), and why the site does NOT quote a multiple without a cited broker source. Funnels to the valuation/goodwill service.
---
# Pharmacy Goodwill: What It Is and What It Is Worth

## Target queries (evidence: LAUNCH_CORE.md, TOPICS.md, DataForSEO UK measured 2026-07-11)

- **Primary:** "pharmacy valuation" 10-20/mo CPC £7.90-15.33, "pharmacy goodwill" no measured volume (autocomplete-real, high-value low-competition).
- **Method intent cluster:** "how are pharmacies valued", "pharmacy goodwill multiple", "what is a pharmacy worth" (autocomplete-real).
- High CPC on "pharmacy valuation" confirms real buyer/seller money at low competition; brokers own listings but not the accounting/valuation-method explainer.

## Search-intent class + play

EVENT-PROBLEM, valuation explainer. The searcher wants to understand how the price is built, whether they are buying or selling, and is suspicious of a broker's headline number. Play: BLUF box stating what goodwill is and what drives it (the NHS contract and item volume dominate; goodwill is most of the price), then the two method families at method level (adjusted-EBITDA multiple, pence-per-item), then the honest wall (the site does not assert a specific multiple without a cited broker source captured at build time), then what changes a valuation, then capture into the valuation/goodwill service. The honest, method-level treatment is the win and the trust signal; a fake multiple would destroy credibility.

**Cannibalisation split (locked at seed):** this blog owns valuation method and the goodwill explainer. The preparing-a-pharmacy-for-sale blog (sibling) owns sale prep and BADR. The share-vs-asset blog (sibling) owns the goodwill CT-relief structuring point. /services/pharmacy-valuation-goodwill owns the hire intent. Keep BADR/CGT out (that is the sale-prep blog).

## Competitors to beat (COMPETITORS.md; domains only at seed, live-URL check is Stage 2)

- **Pharmacy brokers (Hutchings-class):** publish headline multiples and "the market is at X times" content. Beat NOT by inventing a rival number but on the method transparency and the "what actually moves your number" specificity, and by citing any multiple only to a named broker source.
- **Generalist business-valuation posts:** generic EBITDA-multiple explainers with no pharmacy specificity (NHS contract, item volume, Category M margin). Beat on pharmacy specificity.

## Required structure (bodies are RAW HTML: loader does NO markdown conversion; write <h2>/<p>/<ul>/<table>, not markdown syntax)

H2 skeleton:
1. The short answer: goodwill is most of the price, and it is driven by the NHS contract and item volume (BLUF box, cited HP 13)
2. What goodwill actually is in a pharmacy sale (HP 13)
3. Method family 1: a multiple of adjusted EBITDA (what "adjusted" means; method-level only) (HP 16)
4. Method family 2: pence-per-item benchmarks (method-level only) (HP 16)
5. Why the site does not quote a multiple here (the honest wall; a multiple needs a cited broker source) (HP 16)
6. What moves your valuation up or down: item volume, service income, margin story, lease, dependency (HP 8, HP 9)
7. The structuring footnote: goodwill and CT relief on a company purchase (HP 13; link to share-vs-asset blog)
8. Getting a proper valuation view (capture)

FAQ candidates (no answers at seed):
- What is pharmacy goodwill?
- How are pharmacies valued in the UK?
- What multiple do pharmacies sell for?
- Is pharmacy valued on EBITDA or per item?
- What makes a pharmacy worth more?
- Can I claim tax relief on goodwill I buy?

Table/chart opportunities:
- A "what moves the valuation" table: driver (item volume, service/Pharmacy First income, margin/Category M exposure, lease terms, owner dependency, contract type), direction of effect, why. No multiples, no headline prices.
- A method-comparison table (EBITDA multiple vs pence-per-item): what each measures, when each is used, its limitation. Method-level, no numbers.

Calculator/tool embed: the purchase affordability calculator may be linked once (it encodes the arithmetic once you have a price), with the standard note that it does NOT itself value the pharmacy and does not assert a multiple. Do not build or imply a "valuation calculator" that outputs a price.

Internal links (launch core): /services/pharmacy-valuation-goodwill (service, primary capture), /for/selling-a-pharmacy and /for/buying-a-pharmacy (hubs), the preparing-a-pharmacy-for-sale blog (sibling), the share-vs-asset-purchase blog (sibling), /calculators/purchase-affordability (tool, secondary).

## House positions touched (docs/pharmacies/house_positions.md, ONLY figures source)

- **HP 16 (valuation stays method-level; do NOT invent multiples):** pharmacies price on a multiple of adjusted EBITDA and on pence-per-item benchmarks; NEVER assert a specific multiple without a cited broker source captured at build time. The governing rule of this post. Citation: internal position (CALCULATORS.md method), no external rate cited.
- **HP 13 (goodwill dominates; CT relief restricted on company purchase):** goodwill is driven by the NHS contract and item volume; on a company purchase CT relief on goodwill is restricted and only in limited cases at fixed rates. Citation: https://www.gov.uk/guidance/corporation-tax-relief-on-goodwill-and-relevant-assets
- **HP 8 (Drug Tariff / Category M margin):** the margin story is a valuation driver. Citation: https://www.nhsbsa.nhs.uk/pharmacies-gp-practices-and-appliance-contractors/drug-tariff
- **HP 9 (service income, Pharmacy First):** a growing, separately accounted revenue line that lifts valuation. Citation: https://www.england.nhs.uk/primary-care/pharmacy/pharmacy-services/pharmacy-first/

## Hallucination danger zones (enforce)

- DO NOT invent, estimate or "typically it is around X times" a valuation multiple or a pence-per-item figure (HP 16, the hardest rule of this post). Any specific number MUST be attributed to a named, cited broker source captured at build time; if none is captured, state the method and explicitly decline to give a number. A fabricated multiple is the worst failure mode here.
- Do NOT output a headline pharmacy price or price range without a cited source.
- Goodwill CT relief on a company purchase is RESTRICTED and only in limited cases at fixed rates (HP 13). Do not present full/automatic relief.
- Keep everything at ownership/valuation/accounting level; nothing clinical (positioning wall).
- No credential claims, no named individuals (faceless authority; the trust comes from the honest method treatment and the citations, not a named valuer). No em-dashes.
- Body is raw HTML (loader does no markdown conversion): write tags directly.

## Stage 2 TODO

- Decide at build time whether to capture and cite a named broker source for a multiple/pence-per-item range. If captured, cite it explicitly with the source and date; if not, keep the method-only treatment (HP 16). This is the key build decision for this post.
- Re-read the goodwill relief guidance to phrase the CT-relief restriction correctly (HP 13).

## FLAGGED open items

- FLAGGED GAP (deliberate, per HP 16): no valuation multiple or pence-per-item number has a cited source in the house positions. The post ships method-level with NO number unless a broker source is captured and cited at build time. This is the single most important figure gap on the selling cluster and must not be filled by invention.
