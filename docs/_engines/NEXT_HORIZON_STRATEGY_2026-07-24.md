# Next-horizon strategy — win/loss dissection + where to build next
Date: 2026-07-24. Source: 4-agent research fan-out (internal post-mortem, estate economics, external vertical scan, product scan). Blue-sky session, no decisions locked.

## 1. Why Property won / Medical + Agency lost (evidence-based)

Scoreboard (docs/PORTFOLIO_LEAD_AUDIT_2026-07-10.md): Property 697 posts, 318 June clicks, 56 leads Apr–Jul at 10.9% click→lead, £70.2k est. first-year pipeline. Everything else: 0–7 leads over the same window.

Causal split:
- **~60% niche-intrinsic**: Property is the only niche where the audience DIY-searches its own tax questions AND the long-tail SERPs had zero specialists. Winnable queries = lead-producing queries. Dentists/Medical demand is real but locked in head terms ("accountants for dentists" 1,081 imp) owned by decades-old specialist firms — a multi-year YMYL authority war. Agency's actual query footprint was generic tax mechanics vs HMRC/AccountingWeb, plus a small audience (~150k agencies vs 2.3M landlords).
- **~25% execution**: conversion machinery (calculators, mini-forms, CRO) — Solicitors ranks pos 1–2 but converts at 1.2% vs Property 10.9%, proving conversion is playbook, not niche magic. Agency execution was actively negative (9 duplicate AIA posts, 114 off-brand Dubai posts = 37% of site burning crawl budget).
- **Rest structural/technical**: Medical (92% of pages never crawled; Bing indexed fine from identical HTML = Google-specific crawl-budget starvation on a zero-authority domain, aggravated by sitemap lastMod churn, phantom canonicals, JS-only blog index). Medical/Agency are partly broken clocks, not pure niche verdicts — but 07-23 pulls (agency 0 Google clicks/28d) lean pessimistic.

**Could it have been known in advance? Yes.** phase9 DataForSEO SERP scoring predicted it: buy-to-let top-10 = 0 specialists (Property scored 18/25, ~90/100 on the later scorecard); contractors-ir35 scored 9/10 specialist density and was correctly never deployed. The repeatable instrument exists: **niche-selection scorecard in docs/PORTFOLIO_LEAD_AUDIT_2026-07-10.md** — DIY-searchable pain (25), long-tail winnability (20), head-SERP composition (15), audience size (15), tool-ability (15), lead value (10). Plus lessons: day-one technical hygiene on zero-authority domains, brand focus, ship conversion stack WITH content (construction-cis is the template).

## 2. Economics context (OWNER'S DOMAIN — excluded from priority analysis per owner feedback 2026-07-24)

Lead delivery, invoicing, DJH test phase, Reflex terms are handled manually by the owner and are out of Claude scope. Repo data understates actuals (30-day roll rate 50+ Property leads, many forwarded). Useful context only: buyer capacity eventually matters at 10x scale; excess leads are a good problem.

## 3. External verticals (property-pattern clones, regulatory-gated)

Regulatory gates: PI/med-neg = LASPO referral ban + FCA CMC authorisation (DO NOT TOUCH). Mortgages/equity release/insurance = financial promotions regime, workable via IAR of one partner firm. Legal (non-PI), insolvency, HR, immigration, wills = unregulated for lead selling.

Top 5:
1. **Wills/probate/IHT estate planning** — closest Property clone; pensions into IHT April 2027 = guaranteed rule-churn moat; reuses tax authority; fragmented buyers; ungated. Case values £2k–£10k+, leads ~£25+ market rate.
2. **Insolvency/business rescue** — highest lead value (case values £3k–£20k), desperate 11pm searchers, DLA/HMRC-debt overlap with existing corpus, ungated. Competition stronger (Begbies-funded sites).
3. **Business immigration for employers (sponsor licences)** — £3.5k–£7k matters + recurring compliance, extreme rule churn, reuses employer-cost content muscle, ungated.
4. **Employment law/HR for SME employers** — Employment Rights Act rollout 2025–27 = years of churn; Peninsula-model buyers pay £50–£150/lead for £k LTV retainers.
5. **Specialist mortgages (ltd-co BTL/bridging)** — fastest to first revenue: monetises EXISTING Property traffic (£30+/lead, Unbiased £65). Needs IAR setup. Bolt-on, not new estate.

Near-top: leasehold enfranchisement (LFRA 2024 staged commencement; pairs with Property estate). Kills: R&D advisory (shrinking, HMRC blitz), mainstream conveyancing (£4–7/lead commodity), DB pension transfers, anything CMC-gated.

## 4. Product plays

1. **WINNER: MTD ITSA decision layer** (not filing software) — 864k landlords/sole traders mandated April 2026, gross-income threshold so cohort bigger than it feels; first-ever quarterly deadline **7 Aug 2026 (two weeks away)**; £30k wave (much bigger) chooses software over next 9 months. Current SERP winners (letavo, rentalbux, bricktax, mtd.digital) are thin faceless sites — beatable at A* bar. Build on Property flagship + generalist: mandation-checker tool, software-matcher quiz, comparison content, canonical machine-readable recognised-software list (AI-citation asset). Dual monetisation: affiliate (£20–100+/conversion) + existing partner lead handoff. Unregulated. Live inside 30 days on existing rails.
2. **Landlord tax workbook app (descoped)** — freemium saved-calculator suite / year-end pack, £3–5/mo. NO HMRC APIs, no filing (full MTD software = kill: price floor near zero, Hammock £8/mo, recognition compliance burden). Phase 2 of the same funnel, demand-gated (kill if <5% account-creation rate).
3. AI answer-engine structured data = channel amplifier for the above, already the research-authority program thesis. Free embed-with-attribution calculators = 2-day backlink tactic.
4. Kills: engine-as-SaaS, paid calculator licensing, landlord↔accountant marketplace (conflicts with DJH exclusivity; revisit as "second buyer" only).

## 5. Synthesis — recommended sequence (proposed, not approved)

- **Layer 1 (weeks 1–4): MTD decision hub** on Property flagship + generalist, timed to 7 Aug deadline panic. New revenue line (affiliate) + more partner leads from existing traffic.
- **Layer 2 (weeks 2–8): specialist-mortgage bolt-on** to Property traffic once one IAR relationship is set up — second revenue line from traffic already owned.
- **Layer 3 (month 2+): ONE new vertical pilot**, scorecard-gated before build (run the phase9 SERP-sampling instrument first). Lead candidate: wills/probate/IHT. Second: insolvency. Not 15–20 sites — the post-mortem says 1 winner + conversion playbook beats 15 seeds; construction-cis launch pattern (conversion stack at day one) is the template.
- Workbook app: phase 2 of Layer 1 only if save-rate proves demand.

Open owner decisions: DJH backlog push vs Haines Watts priority; IAR partner selection for mortgage bolt-on; which vertical pilot first; whether MTD hub lives on Property domain or generalist or new domain.
