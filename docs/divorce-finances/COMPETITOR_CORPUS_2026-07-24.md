# Competitor Corpus Mining — UK Divorce Finances — 2026-07-24

Read-only mining of competitor domains from
`optimisation_engine/niche_screener/out/divorce-finances_research_export/classify.json`
(SPECIALIST tier 2-3, plus clearly divorce-focused additions). Scope: divorce FINANCES only
(settlements, pensions, maintenance, property, costs, consent orders, Form E, clean break).
Child-arrangements-only, firm news, careers and office pages excluded. Structured data in
`COMPETITOR_CORPUS_2026-07-24.json` alongside this file.

## 1. Domains fetched

18 domains attempted, 15 harvested OK.

| Domain | Status | Method | Approx finance URLs harvested |
|---|---|---|---|
| stowefamilylaw.co.uk | OK | page-sitemap.xml + post-sitemap.xml | ~50 |
| mediateuk.co.uk | OK | post-sitemap1.xml | ~46 |
| divorce-online.co.uk | OK | post-sitemap.xml + page-sitemap.xml | ~75 |
| amicable.io | OK | sitemap.xml (flat) | ~58 |
| wiselaw.co.uk | OK | post-sitemap.xml | ~57 |
| unwildered.co.uk | OK | sitemap_en-GB.xml | ~42 (many non-UK jurisdiction guides filtered) |
| evolvefamilylaw.co.uk | OK | post-sitemap1.xml | ~33 |
| familylawpartners.co.uk | OK | post-sitemap.xml | ~38 |
| harbourfamilylaw.co.uk | OK | post-sitemap.xml | 16 |
| raydensolicitors.co.uk | OK | page-sitemap.xml | 8 (service pages; blog sitemap not mined) |
| divorcesolicitors.com | OK | page-sitemap.xml | 4 (thin site) |
| family-lawfirm.co.uk (Woolley & Co) | OK | blog-sitemap.xml | ~45 |
| onlinedivorce.co.uk | OK | guidance-sitemap.xml | ~31 |
| cleanbreakdivorce.co.uk | OK | blog-posts-sitemap.xml | 8 |
| ribetmyles.co.uk | OK | sitemap.xml (flat) | ~22 |
| crispandco.com | FAILED | HTTP 522 on sitemap (origin down), retried twice | 0 |
| moneyhelper.org.uk | FAILED | HTTP 403 (bot-gated) on hub page and sitemap | 0 |
| nicolawilliams.co.uk | FAILED | HTTP 404 on /sitemap.xml | 0 |

**Domains OK: 15/18. Total finance-relevant URLs/titles harvested: ~530.**

## 2. Topic clusters by domain coverage

Coverage = number of the 15 harvested domains with at least one page in the cluster.

| # | Topic cluster | Coverage | Example titles/URLs | Note |
|---|---|---|---|---|
| 1 | Pensions on divorce (sharing, offsetting, earmarking, CETV, state pension, armed forces/police schemes) | 13 | mediateuk "Ultimate Guide to Pensions on Divorce"; divorce-online "Pension offsetting", "Pension valuation"; familylawpartners 4-part armed forces series; stowe "What is a CETV" | **MUST-HAVE.** Deepest cluster in the niche; several domains run 5+ page sub-clusters |
| 2 | Family home and property division (who gets the house, Mesher/Martin orders, force sale, transfer of equity, joint mortgage) | 12 | mediateuk "Who gets the house in a divorce UK"; evolve "Valuing property in your divorce"; divorce-online "Transfer of equity after divorce"; stowe "Property adjustment orders" | **MUST-HAVE.** Highest commercial intent; every serious domain covers it |
| 3 | Financial settlement basics (what am I entitled to, is it 50/50, fair split, matrimonial vs non-matrimonial, section 25 factors) | 11 | divorce-online "Typical UK fair divorce settlement examples"; mediateuk "Divorce 70-30 asset split"; stowe "Needs and sharing explained"; flp "Waggott v Waggott earning capacity" | **MUST-HAVE.** The head-term cluster; needs a pillar plus question-level satellites |
| 4 | Spousal maintenance (entitlement, calculation, duration, variation, cohabitation effect, lump sum vs ongoing) | 11 | mediateuk "How spousal maintenance is calculated"; family-lawfirm "Nominal spousal maintenance order"; flp "RPI and CPI maintenance indexing"; wiselaw "Lump sum or maintenance" | **MUST-HAVE.** Calculation angle is the strongest fit for a calculator asset |
| 5 | Divorce costs and funding (how much, who pays legal fees, cheap routes, paying for divorce, fee help) | 11 | mediateuk "The realistic costs of divorce UK"; family-lawfirm "Divorce costs UK: who pays"; onlinedivorce "Help with court fees"; flp "How can I fund my family law case" | **MUST-HAVE.** High-volume head terms; cost tables date fast so annual refresh wins |
| 6 | Financial disclosure and Form E (what it is, compulsory, refusal, D81, non-disclosure consequences) | 11 | stowe "What is Form E"; evolve "Is Form E compulsory"; mediateuk "Guide to the new Form D81"; wiselaw "Can I refuse financial disclosure" | **MUST-HAVE.** Form-level content (E, A, D81) is a distinct, underexploited sub-cluster |
| 7 | Prenups, postnups and asset protection before marriage | 11 | family-lawfirm "Are prenups legally binding in the UK"; evolve "Prenups for pensioners"; wiselaw "Write your own prenup"; divorce-online "Postnuptial agreements" | High coverage; adjacent to core divorce-finance but consistently present |
| 8 | Consent orders (what, cost, process, timeline, rejected, breached, changing, DIY) | 9 | mediateuk 11-page consent order cluster; cleanbreakdivorce entire site; onlinedivorce guidance cluster; amicable "Can I draft my own consent order" | **MUST-HAVE.** Multiple domains build whole businesses on this cluster alone |
| 9 | Business assets and company divorce (valuation, limited company protection, shareholder agreements, family business) | 9 | stowe "Limited company divorce"; mediateuk "Business assets in divorce"; unwildered "Divorce business valuation UK"; flp "Shareholder agreements and divorce" | **MUST-HAVE for an accountancy-led brand.** Strong authority fit; most legal sites cover it thinly |
| 10 | Clean break orders (what, importance, vs maintenance, ex refuses to sign, no assets) | 8 | stowe "Clean break orders"; divorce-online "Do you need a clean break order if you have no assets"; mediateuk "Ex won't sign a clean break order" | **MUST-HAVE.** Overlaps consent orders but ranks as its own keyword family |
| 11 | Crypto and digital assets in divorce (hiding, tracing, NFTs) | 8 | stowe "Cryptocurrency and divorce"; ribetmyles "Cryptoassets, NFTs and digital assets"; unwildered "Suspect your hubby is hiding crypto"; divorce-online "Hidden cryptocurrency assets" | Fast-growing; still fresh enough to win on depth |
| 12 | Post-divorce claims and finality (ex claims money years later, remarriage trap, reopening or appealing settlements, Wyatt v Vince) | 7 | divorce-online "The remarriage trap explained"; harbour "Can my ex claim money after divorce"; evolve "Reopening a financial claim"; unwildered "Barder events" | Strong fear-driven search intent; pairs naturally with clean break cluster |
| 13 | Inheritance, gifts and family money (inheritance ring-fencing, bank of mum and dad, gifted deposits, family loans) | 7 | amicable "Inheritance and divorce"; evolve "Treatment of family loans"; flp "The bank of mum and dad"; wiselaw "Early inheritance and divorce" | Good accountancy fit; treatment-of-money questions, not pure law |
| 14 | Separation and cohabitation agreements (legally binding, unmarried couple property rights, equitable accounting) | 7 | family-lawfirm "Separation agreements: are they legally binding"; mediateuk "Non-married couple property rights"; flp "Equitable accounting for unmarried cohabitants" | Adjacent audience (unmarried splits) most divorce sites serve half-heartedly |
| 15 | Hidden assets and enforcement (finding hidden accounts, penalties, freezing orders, forensic accountants, ex lied) | 6 | evolve "How are lawyers able to find hidden assets"; stowe "Six red flags of fraud and asset hiding"; wiselaw "Find hidden bank account spouse"; ribetmyles "Hiding assets: a costly mistake" | Forensic-accountant angle is a natural credential-safe hook for this estate |
| 16 | Financial court process (Form A, financial remedy proceedings, FDR appointments, final hearings, lump sum and property adjustment orders) | 6 | flp "Final financial hearings: what to expect"; mediateuk "What happens after Form A is filed"; divorce-online "Financial remedy order and proceedings"; stowe "Guide to financial dispute resolution" | Mid-funnel process content; lower volume, high trust value |
| 17 | Mortgages and credit after divorce (joint mortgage, removing ex from mortgage/deeds, credit score impact, remortgaging) | 6 | stowe "What happens to joint mortgage when you divorce"; wiselaw "Remove ex from mortgage and title deeds"; ribetmyles "Divorce and credit score" | Finance-native cluster; legal sites treat it as an afterthought |
| 18 | High net worth divorce (Duxbury calculations, trusts, share options, bonuses, private equity, freezing injunctions) | 6 | ribetmyles "Duxbury calculations", "Divorce and private equity"; stowe "Trusts during divorce"; flp "Will I have to share my bonus payments" | Ribetmyles owns this; whitespace at the explainer level (Duxbury tables) |
| 19 | Tax on divorce (CGT and separation, stamp duty, tax implications of settlements, is maintenance taxable income) | 5 | amicable "Capital gains tax and divorce"; flp "CGT recent changes for separating couples"; wiselaw "How stamp duty is affected when divorcing"; mediateuk "Is spousal maintenance classed as income" | **WHITESPACE + must-have for this estate.** Thin everywhere; our core competence |
| 20 | Child maintenance finance edges (school fees, Schedule 1, offshore income, savings in CM calculations) | 5 | stowe "Who pays school fees after divorce"; mediateuk "What is a Schedule 1 application"; wiselaw "Savings count towards child maintenance" | Keep finance-angle only; avoid the custody swamp |
| 21 | Money after divorce (budgeting, affording to live alone, income impact, rebuilding) | 5 | amicable "How to budget following separation"; unwildered "How can I afford to live on my own after divorce"; evolve "The impact of divorce on your income" | Soft-intent nurture content; low competition |
| 22 | Debt and divorce (how debt is divided, liability for ex's debt, joint bills during divorce) | 4 | stowe "How is debt divided in divorce"; divorce-online "Am I responsible for my ex's debt"; amicable "Debt and divorce" | **WHITESPACE-ish.** Only 4 domains; clear demand |
| 23 | Later-life divorce (silver splitters, divorcing near retirement, lifetime mortgages, state pension at 60+) | 4 | divorce-online "Silver splitters divorce explained"; amicable "Silver splitters state pensions"; divorce-online "Financial consequences of divorcing later in life" | **WHITESPACE.** Demographic trend cluster; strong pension/tax crossover |
| 24 | Pension sharing implementation mechanics (4-month rule, how long it takes, implementing the order) | 3 | unwildered "Pension sharing order: the four month rule"; onlinedivorce "How long does pension sharing take"; divorce-online "How to implement a pension sharing order" | **WHITESPACE.** Post-order mechanics almost nobody explains properly |
| 25 | Interim support (maintenance pending suit, financial support before divorce granted, legal services payment orders) | 3 | unwildered "Maintenance pending suit"; wiselaw "Legal services payment orders"; family-lawfirm "Financial support even before divorce is granted" | **WHITESPACE.** Real need at the panic stage of a split |
| 26 | Financial abuse in divorce | 3 | amicable "Financial abuse and divorce"; stowe "Financial abuse: signs"; wiselaw "Financial abuse family proceedings" | Sensitive; cover carefully with signposting |
| 27 | Employment money events in settlements (redundancy pay, bonuses, future earning capacity) | 3 | stowe "Redundancy financial settlement"; wiselaw "How bonuses are treated in divorce"; flp "Earning capacity as a shareable asset" | **WHITESPACE.** Discrete questions, near-zero dedicated coverage |
| 28 | Settlement calculators and worked examples | 2 | divorce-online "Divorce settlement calculator"; amicable "Divorce court fees calculator"; divorce-online "Typical fair settlement examples" | **WHITESPACE + tool play.** Only 2 domains have any calculator; estate calculator engine is a direct advantage |
| 29 | Benefits and divorce (universal credit, benefit entitlement changes on separation) | 1 | wiselaw "How does divorce affect universal credit" | **WHITESPACE.** One domain; obvious demand for lower-income searchers |
| 30 | Insurance after divorce (life cover behind maintenance orders, health insurance) | 1 | wiselaw "Life insurance and health insurance after divorce" | **WHITESPACE.** Life cover securing maintenance is standard practice, barely written about |

## 3. Summary

- **Domains fetched OK:** 15 of 18 (failed: crispandco.com HTTP 522, moneyhelper.org.uk HTTP 403 bot-gate, nicolawilliams.co.uk sitemap 404).
- **Topic clusters identified:** 30.
- **Must-have pool candidates (coverage 8+):** pensions on divorce (13), family home and property (12), settlement basics (11), spousal maintenance (11), divorce costs (11), disclosure and Form E (11), prenups/postnups (11), consent orders (9), business assets (9), clean break (8), crypto assets (8).
- **Whitespace finds (finance-adjacent, low coverage, plausible demand):** tax on divorce (CGT/stamp duty/maintenance taxation, 5 and thin), settlement calculators and worked examples (2), later-life divorce (4), debt division (4), pension sharing implementation mechanics (3), interim support (3), redundancy/bonus/earning capacity (3), benefits and universal credit (1), life insurance securing maintenance (1).
- **Strategic note:** the whitespace skews exactly toward money-mechanics (tax, calculators, pensions implementation, debt, benefits) rather than law, which matches this estate's accountancy authority and calculator engine. Legal-heavy incumbents dominate settlement law; nobody owns the numbers layer.
