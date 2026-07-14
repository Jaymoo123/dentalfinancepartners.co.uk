# Gap-Fill Wave Plan — 2026-07-14

Classification of every verified unwritten backlog topic (blog_topics `used=false`, w/ volume + notable null-vol clusters) into content formats, plus prioritised wave order. Read-only analysis; no DB rows touched, no content written.

**Formats:** BLOG / PILLAR (guide) / CALC (calculator-tool) / TEMPLATE (downloadable) / LOCATION / SKIP (nav intent, branded competitor, non-UK, unfulfillable).
**Priority:** P1 (wave 1), P2 (next), P3 (backlog), — (skip).
**Sources:** Supabase blog_topics; live-slug inventories (`Solicitors/web/content/blog`, `construction-cis/web/content/blog`, `contractors-ir35/web/content/blog`, calculator registries in `*/web/src/lib/calculators/tools/`); pool JSONs `expansion_research/tier1_{solicitors,ir35,dentists,trade}/topic_pool_final.json`.

---

## Estate context (governs wave order)

| Site | Unwritten (w/ vol) | Posture |
|---|---|---|
| solicitors | 244 (94) | Live, mature, structural parity complete. Safe to ship. |
| contractors-ir35 | 157 (63) | Built, green, **CLI deploy pending** (user enforces). Write now, ships with launch deploy. |
| construction-cis | 68 (26) | LIVE, fresh, ranking-maturation. Content in is fine; expect slow signal. |
| dentists | 15 (4) | Live. Small backlog, quick wins. |
| medical | 16 (16) | Post-fix watch window (~07-20 / 08-03). **Write only, hold deploy.** Head-term caveat applies (see below). |
| agency | — | EXCLUDED (signal window open, no content in). |
| generalist | — | EXCLUDED (rewrite track). |

---

## contractors-ir35 (63 w/ vol → 6 assets + ~10 blogs, rest folded/skipped)

Live overlap checked against 50 posts incl. `umbrella-company-explained`, `contractor-day-rate-to-take-home`, `deemed-employment-payment-explained`, `off-payroll-working-rules-private-sector`. No umbrella take-home calculator exists (only umbrella-vs-limited / salary-dividend / CT / dividend calcs).

| Topic (cluster) | Vol | Format | Pri | Notes |
|---|---|---|---|---|
| Umbrella take-home calculator (absorbs: umbrella wage calculator 110, take home pay calculator umbrella 90, umbrella take home 70, income 50, tax calculator 50, day rate take-home 110+20+20, paye day rate 10, off payroll calculator 10, deemed employment calc 10+10) | ~480 combined | CALC | P1 | Known asset gap (~430). One tool absorbs ~12 topics. Cannibal-safe: `contractor-day-rate-to-take-home` is a blog, tool complements; interlink. |
| hmrc umbrella company warning | 880 | BLOG | P1 | Highest single vol on site. News/evergreen hybrid; anchor to HMRC list of named schemes. |
| Compliant umbrella / FCSA cluster (umbrella tax compliance 110, fcsa umbrella 90, umbrella compliance 90, compliant umbrella 90, fcsa approved 50) | ~430 | PILLAR | P1 | Known asset gap (~380). One pillar "how to verify a compliant umbrella (FCSA/SafeRec)" + calc + warning post = umbrella authority cluster. |
| umbrella company v paye | 170 | BLOG | P1 | Distinct from live umbrella-vs-limited. |
| cheapest umbrella company uk | 110 | BLOG | P2 | Margin-fee explainer, no named pricing (lead-gen model rule). |
| umbrella advantages / benefit of umbrella | 100 | BLOG | P2 | Flag: partial overlap `umbrella-company-explained` — differentiate as pros/cons decision page. |
| mini umbrella company fraud | 50 | BLOG | P2 | Pairs with HMRC warning post. |
| self employed umbrella company | 50 | BLOG | P2 | |
| is this employment income from inside off-payroll engagements (110) + inside off-payroll (70) + off payroll engagements (70) + ~25 long-tail off-payroll variants (10-30 each: year variants 2020/2021, public sector, overseas, small company exemption, guidance, legislation) | ~400 combined | PILLAR | P2 | ONE "off-payroll working rules hub" pillar absorbs the entire long tail; year-variants are the same query. Flag: `off-payroll-working-rules-private-sector` live — pillar must be the hub, live post becomes child. Do NOT write per-variant posts. |
| off-payroll working examples | 30 | BLOG | P3 | Worked-examples child of hub. |
| list of umbrella company uk | 50 | SKIP | — | Directory intent, unfulfillable without endorsements. |
| Ir35 uk gov | 10 | SKIP | — | Nav intent (gov.uk). |
| Can umbrella company sponsor tier 2 | 10 | BLOG | P3 | Niche Q, low effort. |
| How to write a contractor contract / what can i claim expenses / ir35 investigations per year / ir35 rules self employed / what's ir35 status / is umbrella real / umbrella meaning | 10 ea | BLOG | P3 | Standard long-tail; check `whats-ir35`-adjacent live posts at brief time. |
| Null-vol: Compliance ×60 | — | fold | — | Mostly off-payroll phrasing variants → absorbed by the hub pillar. Do not write individually. |

## construction-cis (26 w/ vol → 2 templates + ~5 blogs)

Live overlap: `cis-payment-deduction-statements-guide`, `cis-monthly-return-guide`, `cis-invoice-splitting-labour-materials`, 3× VAT reverse-charge posts. Calc fleet already strong (8 tools). No downloadable assets exist.

| Topic (cluster) | Vol | Format | Pri | Notes |
|---|---|---|---|---|
| CIS deduction statement template (40) + download, editable, payment-and-deduction download, tax-deduction certificate, free statement, subcontractor statement (10 ea) | ~90 | TEMPLATE | P1 | Known asset gap. One landing page + downloadable (PDF/XLSX) absorbs 7 topics. Live statements *guide* explains; template *fulfils* — interlink, no cannibalisation. |
| CIS subcontractor invoice template uk (30) + invoice template subcontractor (10) + vat invoice with cis deduction (10) + invoice template with vat and cis (10) | ~60 | TEMPLATE | P1 | Second download: CIS invoice template incl. VAT/reverse-charge variant. Flag: `cis-invoice-splitting` live covers the concept, template page links it. |
| cis return login (140) | 140 | SKIP | — | Pure nav intent (HMRC login). Highest vol on site but unfulfillable. |
| unallocated credit cis deduction reclaimed | 20 | BLOG | P2 | Real pain-point Q, weak SERP. |
| cis end of year return | 10 | BLOG | P2 | Flag: `cis-monthly-return-guide` live — angle is year-end reconciliation/P35-successor, not monthly filing. |
| paying cis subcontractor tax hmrc | 10 | BLOG | P3 | |
| cis umbrella payroll / cis payroll contracts | 20 | BLOG | P3 | One post: CIS via umbrella/payroll models. |
| cis reverse charge vat return example | 10 | BLOG | P3 | Worked box-by-box example; flag 3 live reverse-charge posts — must be the *worked example* child, not another explainer. |
| hmrc cis return online / return help / contact number | 30 | SKIP | — | Nav intent. |
| eebs / riddingtons / hudson / indigo cis payroll | 40 | SKIP | — | Branded competitor terms. |
| Null-vol: Locations ×7 | — | LOCATION | P3 | Hold until site has ranking signal; location pages on a zero-authority domain waste crawl budget. |

## solicitors (94 w/ vol → 1 flagship pillar + 3 pillars + ~8 blogs + 1 template; heavy skip/fold)

Live overlap heavy: 30+ SRA/COFA/client-account/cashier posts + 6 guides checked.

| Topic (cluster) | Vol | Format | Pri | Notes |
|---|---|---|---|---|
| **sra principles** | **2,400** | PILLAR | P1 | Estate's biggest single gap. No live page targets it (live corpus = accounts rules, not the 7 Principles). Flagship guide: all 7 principles + accounts-rules crossover angle. |
| Legal aid billing cluster (legal aid billing 30 + codes/manual/handbook/guide/guidance/online/criminal ×8 @10) | ~110 | PILLAR | P1 | One "legal aid billing guide (LAA codes, CCMS)" absorbs 9 topics. Live `legal-aid-laa-work-vat-and-cash-flow` is VAT-angle, different — interlink. |
| Law firm profitability cluster (7 topics @10: model, analysis, associate, matter, economics, improve) | ~70 | PILLAR | P2 | One pillar. Practice Finance category also has 10 null-vol siblings to fold in. |
| Legal cashier cluster (senior 50, duties 30, part-time 30, outsourced 20, junior 20, training/freelance/meaning/manager/test 10 ea) | ~200 | PILLAR | P2 | One "legal cashier: role, duties, career, outsourcing" pillar. Flag: `what-does-a-legal-cashier-do-sra-requirements` + `outsourced-legal-cashiering-guide` live — pillar hubs them, briefs must differentiate or this is a rewrite not a net-new. Location variants (glasgow/edinburgh/scotland) = job-search intent, SKIP. |
| do solicitors keep interest on client accounts (50) + earn interest (30) + probate interest (20) + client account interest rules (10) | ~110 | BLOG | P1 | One consumer-facing post. Flag: `handling-client-money-interest-sra-rules` live is firm-facing — differentiate audience explicitly in brief. |
| can solicitors check / find / access bank accounts | 40 | BLOG | P2 | One post, consumer Q, traffic play. |
| Solicitors accounts rules year-variants (2019 20, + 2018/2016/2020/2021/2011/1998/regulations/pdf/summary/book ×~20 @10) | ~220 | SKIP/fold | — | CANNIBAL: `sra-accounts-rules-explained` + `sra-accounts-rules-compliance-guide` live own this head term. Fold a "rule versions history" H2 into the live pillar at next optimisation pass instead. Non-UK (singapore) SKIP. |
| solicitors accounts rules scotland | 10 | BLOG | P3 | Distinct regime (Law Society of Scotland), genuinely uncovered. |
| LPC/study cluster (lpc notes, revision, cheat sheet, exercises, double entry, agency/principal method ×~12 @10) | ~120 | BLOG | P3 | ONE study-guide post "solicitors accounts for LPC/SQE". New audience (students) — deliberate breadth play, flag as non-lead-gen traffic. |
| sra cofa (50) + cofa meaning (20) + colp/cofa variants (×6 @10) | ~130 | SKIP | — | CANNIBAL: 4 live cofa posts + cofa-fundamentals guide. Exception: `sra cofa application` (10) could be a narrow child post, P3. |
| law firm chart of accounts sample + quickbooks chart of accounts | 20 | TEMPLATE | P2 | Downloadable sample chart of accounts (XLSX). Mirrors CIS template play. |
| letting agent client account rules | 10 | BLOG | P3 | Adjacent-audience, distinct regime (client money protection). |
| designated client account rules | 10 | BLOG | P3 | Flag: `office-account-vs-client-account` live partial. |
| hmrc tax solicitor / solicitors tax advice | 40 | SKIP | — | Transactional head terms → belongs to /for-* service pages, not blog. Check /for-* coverage, don't write posts. |
| solicitor withholding money | 10 | BLOG | P3 | Consumer complaint Q; traffic-only, weak lead fit. |
| Null-vol: Accounts General ×34, SRA Compliance ×40 | — | fold | — | Phrasing variants of the above clusters; absorbed, not written. |

## dentists (15 unwritten, 4 w/ vol)

Calc fleet exists incl. `associate-take-home` — no new calculator needed; the salary gap is a benchmark article.

| Topic | Vol | Format | Pri | Notes |
|---|---|---|---|---|
| dentist salary uk after tax | 20 | BLOG | P1 | Known gap. Benchmark article (associate/principal/NHS bands) linking existing associate-take-home calc. |
| dental practice chart of accounts | 10 | TEMPLATE | P2 | Same template play as solicitors/CIS. |
| is buying a dental practice worth it / questions to ask / without a broker / first practice / business plan (5 topics) | 20+null | BLOG | P2 | Practice Purchase cluster: 2-3 posts max, check live 209-post corpus per slug at brief time (large corpus = high dupe risk, gap-discovery 47% dupe caveat). |
| dental practice cash flow forecasting | 0 | BLOG | P3 | |
| pension advice / xero / dental finance / goodwill funding / squat business plan / scotland allowances | null | BLOG | P3 | Standard long-tail. |
| dental accountant northern ireland | null | LOCATION | P3 | Only if /for-*/location pattern exists on site. |

## medical (16 unwritten, all w/ vol) — WRITE-ONLY, DEPLOY HELD

Head-term caveat confirmed: 14 of 16 are 392-560-vol **transactional** variants of "gp accountant / accountant + service" — these ARE the homepage/service-page head terms. Blog posts targeting them would cannibalise core pages on a site whose fix wave is in a watch window. Site also in post-fix deploy caution until ~08-03.

| Topic | Vol | Format | Pri | Notes |
|---|---|---|---|---|
| private practice incorporation complete guide | 700 | PILLAR | P1 (write), deploy after watch verdict | Only informational topic in the set; genuine gap; safe. |
| affordable/specialist/local gp accountant, accountant tax return/bookkeeping/tax advice/tax planning/corporation tax/vat/payroll/financial planning, gp accounting system, gp accountant access (13 topics) | 560 ea | SKIP | — | CANNIBAL with homepage + service pages. If service-page coverage is thin, that is core-page engine work (`optimisation_engine/corepage/`), not blog topics. Recommend marking these used=false→skip status in a later DB pass (not done here). |
| gp tax accountant bristol / best gp accountant manchester | 392 ea | LOCATION | P3, post-watch | Only if a /locations pattern is added; not blog posts. |

---

## Recommended wave order (estate)

1. **Wave 1 (now)** — mixed estate wave, below.
2. **Wave 2 (~1-2 wks)** — ir35 P2 blogs + off-payroll hub pillar; solicitors legal-cashier + profitability pillars + chart-of-accounts template; CIS P2 blogs; dentists practice-purchase cluster.
3. **Wave 3 (post 08-03, medical watch verdict)** — medical incorporation pillar deploy + location decision; solicitors P3 long-tail; CIS location pages if ranking signal has arrived; medical head-term question routed to core-page engine.
4. **Continuous** — solicitors null-vol pools stay folded; revisit after Wave 1-2 GSC data (fresh-pull rule before any traffic conclusion).

## Wave 1 composition (14 items, batch size 1 per topic, parallel sub-agents per locked rules)

| # | Site | Item | Format | Vol |
|---|---|---|---|---|
| 1 | solicitors | SRA Principles pillar | PILLAR | 2,400 |
| 2 | contractors-ir35 | Umbrella take-home calculator | CALC | ~480 |
| 3 | contractors-ir35 | Compliant umbrella / FCSA pillar | PILLAR | ~430 |
| 4 | contractors-ir35 | HMRC umbrella company warning | BLOG | 880 |
| 5 | contractors-ir35 | Umbrella company vs PAYE | BLOG | 170 |
| 6 | construction-cis | CIS deduction statement template (download page + asset) | TEMPLATE | ~90 |
| 7 | construction-cis | CIS subcontractor invoice template (incl. VAT/reverse-charge variant) | TEMPLATE | ~60 |
| 8 | solicitors | Legal aid billing pillar (LAA codes/CCMS) | PILLAR | ~110 |
| 9 | solicitors | Do solicitors keep interest on client accounts (consumer) | BLOG | ~110 |
| 10 | dentists | Dentist salary UK after tax benchmark (links associate-take-home calc) | BLOG | 20 |
| 11 | medical | Private practice incorporation pillar (**write only, deploy held**) | PILLAR | 700 |
| 12 | contractors-ir35 | Mini umbrella company fraud | BLOG | 50 |
| 13 | construction-cis | Unallocated credit / CIS deduction reclaimed | BLOG | 20 |
| 14 | contractors-ir35 | Cheapest umbrella company UK (no named pricing) | BLOG | 110 |

Wave-1 rationale: front-loads the two known asset gaps (umbrella calc + templates) and the single largest keyword on the estate (sra principles), builds ir35's umbrella authority cluster as one coherent unit before its launch deploy, and stays entirely clear of agency, generalist, and medical deploys.

**Standard gates apply per NETNEW_PROGRAM.md:** per-topic cannibalisation pre-check against current main at brief time (mandatory given 47% historical dupe rate), HP-lock before content, six-check verification floor, monitored_pages registration, no em-dashes, FA 2026 / NIC 15% / AMAP 55p ground truth.
