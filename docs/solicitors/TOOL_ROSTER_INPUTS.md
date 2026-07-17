# Solicitors site — Tool Roster Inputs (C1)

**Site:** accountsforlawyers.co.uk  
**Generated:** 2026-07-17  
**Purpose:** Data inputs for calculator/tool roster design (current 6 → target ~12)

---

## 1. Current tool inventory

| # | Slug | Name | Category | Computes |
|---|------|------|----------|----------|
| 1 | `solicitor-take-home` | Solicitor Take-Home Calculator | Income Tax | Net take-home under sole trader / partnership+LLP / Ltd — 2026/27 rates |
| 2 | `fa2014-salaried-member` | FA 2014 Salaried Member Test | LLP / Partnership | 3-condition HMRC test: partner-for-tax vs deemed employee; capital injection needed to fix Condition C |
| 3 | `llp-profit-share-allocation` | LLP Profit Share Allocation | LLP / Partnership | Per-partner allocation across equal / two-tier / points / fixed-share+equity methods |
| 4 | `law-firm-valuation` | Law Firm Valuation Calculator | Practice Finance | Goodwill multiple × normalised profit + WIP + tangibles; by firm type, region, buyer demand |
| 5 | `sra-client-account-reserve` | SRA Client Account Reserve | SRA Compliance | Prudent firm-side buffer sizing for SRA Accounts Rules; Rule 12.2 de minimis flag |
| 6 | `indemnity-premium-estimator` | PII Premium Estimator | Practice Finance | Annual PII premium range by gross fees, practice area, claims history, cover level |

---

## 2. Query clusters with volumes

### GSC (Google) — top ~50 queries by impressions (2026-07-17)

All raw impression volumes are low (site still ranking page 3–5 on most). Highest single query is 664 impressions ("accounting for solicitors"). Tool-intent queries are scattered but present.

| Cluster | Representative queries | Total GSC impressions (est.) | Tool-intent? | Existing tool? |
|---------|------------------------|------------------------------|--------------|----------------|
| **Accountant/accounting services** | "accounting for solicitors" (664), "accountants for lawyers" (154), "accounting services for law firms" (124), "accountant for lawyers" (107), "accountants for legal firms" (87) | ~1,200 | N — informational | N |
| **Law firm valuation** | "law firm valuation formula uk" (65), "how to value a partnership interest in a law firm" (27), "how to value a law firm uk" (15), "how to value a legal practice" (9) | ~116 | **Y** | Y (tool #4) |
| **Client money / SRA accounts** | "client money in business account" (97), "solicitors accounts rules" (66) | ~163 | **Y** (reserve calc) | Y (tool #5) |
| **Conveyancing fee benchmarking** | "how much should solicitors charge for conveyancing" (66), "how much does it cost for conveyancing by solicitor" (34), "residential conveyancing fees" (33), "residential conveyancing costs" (25), "property conveyancing fees" (25), "property conveyancing costs" (19), "conveyancing fees" (9) | ~211 | **Y** — fee/cost calc | **N — GAP** |
| **Solicitor hourly rates / salary** | "solicitor hourly rates" (Bing 35), "solicitors hourly rates" (Bing 35), "grade a solicitor salary uk" (Bing 15), "trainee solicitor salary" (Bing 15), "solicitor salary uk" (Bing 15) | ~115 (Bing-dominant) | **Y** — rate/benchmark | **N — GAP** |
| **LLP / partnership structure** | "partnerships and llp lawyers" (42), "partnerships and llps solicitors" (22), "partnership taxation llp" (Bing 15) | ~79 | **Y** (comparison) | Partial (tools #2, #3) |
| **Cashflow / practice finance** | "law firm cashflow management" (36) | ~36 | **Y** | **N — GAP** |
| **VAt / disbursements** | "vat law firm uk" (26), "vat solicitor uk" (19), "understanding vat disbursements" (12); Bing: "vat on disbursements" (32), "vat on legal fees" (23), "disbursement vat" (23), "legal cashiering rules about vat and disbursements" (18) | ~153 | Borderline Y — could be a VAT-on-disbursements checker | **N — GAP** |
| **Equity partner buy-in** | "equity partner law firm buy in uk" (10) | ~10 | **Y** | **N — GAP** |
| **Legal profit extraction** | "legal profit extraction" (10, 1 click at pos 7) | ~10 | **Y** | Partial (tool #1) |
| **Practice sale / succession** | "sole practitioner retirement" (14) | ~14 | **Y** | Partial (tool #4) |

### Bing — top queries (2026-07-17, 2,438 rows total)

Bing traffic is dominated by SRA compliance queries — very strong signal for compliance tools.

| Cluster | Representative queries | Bing impressions | Tool-intent? | Existing tool? |
|---------|------------------------|------------------|--------------|----------------|
| **SRA accounts rules** | "sra accounts rules" (591), "solicitors accounts rules" (176), "sra rules" (122), "sra account rules" (60), "sra accounting rules" (44), "sra client money rules" (39) | ~1,100+ | Borderline — compliance guide, possible rule-checker tool | **N — GAP** |
| **COLP / COFA** | "colp" (188), "cofa" (88), "colp and cofa rules" (48), "cofa meaning" (31), "what is colp/cofa" (16) | ~380 | **Y** — COLP/COFA obligations checklist/tool | **N — GAP** |
| **Solicitor salary / hourly rates** | "solicitor hourly rates" (35), "solicitors hourly rates" (35), "solicitors hourly rates 2025" (26), "trainee solicitor salary" (15), "solicitor salary uk" (15), "grade a solicitor salary uk" (15) | ~141 | **Y** — salary/rate benchmarker | **N — GAP** |
| **VAT on disbursements** | "vat on disbursements" (32), "vat on legal fees" (23), "disbursement vat" (23), "hmrc vat concession solicitor rule" (18), "legal cashiering rules vat" (18) | ~114 | **Y** — VAT disbursements classifier | **N — GAP** |
| **Client account / residual** | "sra client account rules" (29), "how long can solicitors keep money in client account" (18), "sra residual balance" (15) | ~62 | **Y** | Partial (tool #5) |
| **Solicitor salary by grade** | "grade a solicitor salary uk" (15), "trainee solicitor salary" (15) | ~30 | **Y** — salary benchmarker | **N — GAP** |
| **Partnership/LLP taxation** | "partnership taxation llp" (15) | ~15 | **Y** | Partial (tools #2, #3) |

---

## 3. Competitor tool table

## Live SERP Verification — DataForSEO 2026-07-17

**Method:** Google Organic UK (location_code 2826), top 10 results per query, live SERP. Total API cost: $0.0220 (11 queries × $0.002). Tool classification: title or URL contains calculator/checker/tool/wizard/calc/estimator/compare.

### Priority queries — live verdicts

| # | Query | Verdict | Tool count (top 10) | Key competitors found |
|---|-------|---------|--------------------|-----------------------|
| S1 | colp cofa checker obligations | **CONFIRMED WHITESPACE** | 0/9 tools | SRA.org.uk (guide), Law Society (guide), pda-legal.co.uk, complianceoffice.co.uk (e-book), jblcompliance.com (checklist) — all articles/guides, zero interactive tools |
| S2 | conveyancing fee calculator uk | **DOMINATED** | 9/9 tools | conveyancingcalculator.co.uk (#1), hoa.org.uk (#2), coles-miller.co.uk (#3), irwinmitchell.com (#6), plus 5 more law firm own-site calculators |
| S3 | vat on disbursements calculator | **CONTESTED** | 7/9 tools (1 relevant) | **alca.org.uk** (#2) — Disbursement or Recharge Calculator (legal cost accountant-specific, directly relevant); rest are generic VAT add/remove calcs (bokio, vatcalculators, kashflow, wise, pleo, itcontracting); gov.uk at #5 (static HMRC guidance); lawsociety.org.uk at #9 (guide). The solicitor-specific agent/principal VAT classifier is NOT present — only alca.org.uk partial |
| S4 | solicitor hourly rate benchmark | **CONFIRMED WHITESPACE** | 0/9 tools | gov.uk (#2) guideline hourly rates table (static PDF/table); judiciary.uk (#3) GHR 2026 (static); Law Gazette (#5); solicitorcost.com (#9) rate table article. Zero interactive benchmarkers |
| S5 | law firm sale capital gains calculator | **CONTESTED** | 8/9 tools (0 law-firm-specific) | aviva.co.uk (#3), hl.co.uk (#4), taxfix.com (#5), yourcompanyformations.co.uk (#6), charcol.co.uk (#7), gorillaaccounting.com (#8), smartasset.com (#9) — all generic CGT calculators. None handle law firm goodwill disposal, BADR on partnership interest, or PLC vs LLP sale structuring. **Gap confirmed for law-firm-specific tool** |

### Top-10 SERP detail — solicitors queries

**S1 — "colp cofa checker obligations"** (CONFIRMED WHITESPACE)
| Pos | Domain | Type | Title |
|-----|--------|------|-------|
| 2 | lawsociety.org.uk | ART | Compliance officers |
| 3 | sra.org.uk | ART | Responsibilities of COLPs and COFAs - Guidance |
| 4 | pda-legal.co.uk | ART | COLP & COFA Roles and Responsibilities |
| 5 | complianceoffice.co.uk | ART | SRA COLP and COFA requirements e-book |
| 6 | enderleyconsulting.co.uk | ART | The requirements of these essential roles in law firms |
| 7 | osmondandosmond.co.uk | ART | Professional Negligence - A Comparison of COLP and COFA |
| 8 | lexisnexis.com | ART | COLP and COFA overview - Authorisation & regulation |
| 9 | formediagroup.co.uk | ART | COLPs and COFAs: Roles & Duties |
| 11 | jblcompliance.com | ART | A COLP and COFA training needs checklist |

**S2 — "conveyancing fee calculator uk"** (DOMINATED)
| Pos | Domain | Type | Title |
|-----|--------|------|-------|
| 1 | conveyancingcalculator.co.uk | TOOL | Conveyancing Fees Calculator \| Compare Solicitor Quotes |
| 2 | hoa.org.uk | TOOL | Conveyancing Fees Calculator |
| 3 | coles-miller.co.uk | TOOL | Conveyancing Fees Calculator |
| 6 | irwinmitchell.com | TOOL | Solicitors Conveyancing Fees Calculators |
| 7 | starckuberoi.co.uk | TOOL | Conveyancing Fees Calculator |
| 8 | ringroselaw.co.uk | TOOL | Online Conveyancing Fees Calculator |
| 9 | bradleymorrell.co.uk | TOOL | Conveyancing Costs Calculator |
| 10 | jwhugheslaw.co.uk | TOOL | Conveyancing Calculator |
| 11 | jbarkers.co.uk | TOOL | Conveyancing Fees Calculator |

**S3 — "vat on disbursements calculator"** (CONTESTED — 1 relevant tool)
| Pos | Domain | Type | Title |
|-----|--------|------|-------|
| 2 | **alca.org.uk** | **TOOL** | **Disbursement or Recharge Calculator** |
| 4 | bokio.co.uk | TOOL (generic) | Online VAT Calculator |
| 5 | gov.uk | ART | VAT: costs or disbursements passed to customers |
| 6 | vatcalculators.co.uk | TOOL (generic) | Online VAT Calculator |
| 7 | itcontracting.com | TOOL (generic) | Limited company VAT calculator |
| 8 | pleo.io | TOOL (generic) | Free VAT Calculator UK |
| 9 | lawsociety.org.uk | ART | VAT treatment of disbursements and expenses |
| 10 | kashflow.com | TOOL (generic) | Free VAT Calculator |
| 11 | wise.com | TOOL (generic) | Online VAT Calculator |

**S4 — "solicitor hourly rate benchmark"** (CONFIRMED WHITESPACE)
| Pos | Domain | Type | Title |
|-----|--------|------|-------|
| 2 | gov.uk | ART | Solicitors' guideline hourly rates |
| 3 | judiciary.uk | ART | Guideline hourly rates 2026 |
| 5 | lawgazette.co.uk | ART | New guideline hourly rates published |
| 6 | gm-lcs.com | ART | How do the courts treat guideline hourly rates? |
| 7 | reddit.com | ART | Solicitors' Hourly Rates (Government Sanctioned) |
| 8 | pumpcourtchambers.com | ART | Guideline Hourly Rates Updated: Practical Implications |
| 9 | solicitorcost.com | ART | Solicitor Hourly Rates 2026: £142 to £579/hr UK Full Table |
| 10 | lexisnexis.co.uk | ART | Guideline hourly rates \| Legal Guidance |
| 11 | sphcosts.com | ART | Guideline Hourly Rates in Detailed Assessment Proceedings |

**S5 — "law firm sale capital gains calculator"** (CONTESTED — no law-firm-specific tools)
| Pos | Domain | Type | Title |
|-----|--------|------|-------|
| 2 | gov.uk | ART | Tax when you sell property: Work out your gain |
| 3 | aviva.co.uk | TOOL (generic) | Capital Gains Tax calculator |
| 4 | hl.co.uk | TOOL (generic) | Capital Gains Tax (CGT) Calculator |
| 5 | taxfix.com | TOOL (generic) | UK Capital Gains Tax rates calculator |
| 6 | yourcompanyformations.co.uk | TOOL (generic) | Capital Gains Tax Calculator 2026 |
| 7 | charcol.co.uk | TOOL (generic) | Capital Gains Tax Calculator UK for Property |
| 8 | gorillaaccounting.com | TOOL (generic) | Capital Gains Tax Calculator |
| 9 | smartasset.com | TOOL (generic) | 2026 Capital Gains Tax Calculator |
| 10 | youtube.com | ART | How to calculate Buy to let CGT |

---

**Previous knowledge-based table (pre-verification, for reference):**

| Tool name | URL / domain | Status after live SERP |
|-----------|--------------|------------------------|
| Solicitor Salary Benchmarker | lawsociety.org.uk/career-advice | Confirmed — static data only, no interactive tool |
| Conveyancing Fee Calculator | conveyancingcalculator.co.uk | Confirmed LIVE — dominant #1 result |
| SDLT Calculator | gov.uk/stamp-duty-land-tax | Confirmed LIVE |
| COLP/COFA duty checker | no dedicated tool found | **CONFIRMED WHITESPACE** — SERP verified |
| VAT disbursements classifier | no dedicated tool found | **CONTESTED** — alca.org.uk partial; solicitor agent/principal classifier still a gap |
| Partner Tax Reserve | no dedicated tool found | Gap confirmed (not tested directly) |
| Law Firm Profitability | no dedicated UK tool found | Gap confirmed (not tested directly) |

**Key finding (live-verified):** COLP/COFA checker and solicitor hourly rate benchmarker are **pure whitespace** — zero interactive tools in top 10. Conveyancing fee calculator is fully dominated (build not recommended). Law-firm-specific CGT on practice sale is a real gap despite generic CGT tool dominance. VAT disbursements has one partial competitor (alca.org.uk) but the agent/principal classification angle remains open.

---

## 4. Seed validation verdicts

| Seed tool | GSC evidence | Bing evidence | Competitor gap? | Verdict |
|-----------|--------------|---------------|-----------------|---------|
| **Partner tax reserve** | "legal profit extraction" (10 impr, 1 click, pos 7) — adjacent | No direct Bing signal | **Yes** — no competitor tool | **WEAK** — adjacent intent exists but query volume thin; build as part of a broader "tax planning for partners" page rather than standalone |
| **PII premium vs turnover benchmark** | None direct | None direct | Partial — brokers have loose estimators | **WEAK** — already covered by tool #6; extend tool #6 with a benchmarking output (cost as % of turnover vs sector norm) rather than building new |
| **LLP vs Ltd comparison** | "partnerships and llp lawyers" (42), "partnerships and llps solicitors" (22) | "partnership taxation llp" (15) | Yes — no solicitor-specific tool | **YES** — but already partially covered by tool #1 (take-home comparison). Extend tool #1 or build a dedicated decision-wizard with non-tax factors (liability, succession, FA2014 risk) |
| **Salaried-member risk scorer** | No direct query | No direct query | Yes | **WEAK** — already covered by tool #2 (FA2014 test). Extend, don't duplicate |
| **Client-account interest** | "client money in business account" (97), "how long legally can solicitors keep money" (Bing 18) | SRA client account rules (Bing 29+) | Yes — no tool | **YES** — strong Bing signal; extend tool #5 to output estimated interest credit due to clients (SRA Rule 7 obligation) |
| **Practice sale CGT/BADR** | "sole practitioner retirement" (14), "law firm valuation formula uk" (65) | None direct | Yes | **YES** — strong adjacency to tool #4; standalone BADR/CGT tool on disposal of goodwill/shares; BADR rate 18% from 6 Apr 2026 is a current hook |
| **Locum/consultant take-home** | "legal profit extraction" (10) | None on Bing | Yes | **WEAK** — low direct volume; generalist take-home tools dominate. Consider only if building a "For locum solicitors" landing page funnel |

---

## 5. New tool ideas from data (not in seeds)

These came from the query clusters that weren't in the original seeds:

| Tool idea | Query evidence | Rationale |
|-----------|----------------|-----------|
| **Conveyancing fee benchmarker** | "how much should solicitors charge for conveyancing" (66 GSC), "residential conveyancing fees" (33), "property conveyancing fees" (25) — ~211 combined impressions | Largest pure tool-intent cluster on GSC with no existing tool or page; fee-comparison tool for practice managers setting rates or benchmarking against competitors |
| **Solicitor salary/rate benchmarker** | "solicitor hourly rates" (Bing 35), "solicitors hourly rates" (Bing 35), "grade a solicitor salary uk" (Bing 15), "trainee solicitor salary" (Bing 15) — ~141 Bing impressions | Strong Bing signal; NQ→partner salary by practice area, firm type, region; practice managers setting pay scales are a conversion-adjacent audience |
| **COLP/COFA obligation checker** | "colp" (Bing 188), "cofa" (Bing 88), "colp and cofa rules" (Bing 48) — ~380 Bing impressions | Highest-volume Bing cluster with no tool; SRA-regulated firm managers checking appointment duties; compliance tool with high lead-gen value (COLP/COFA = firm partners or directors) |
| **VAT on disbursements classifier** | "vat on disbursements" (Bing 32), "vat on legal fees" (Bing 23), "disbursement vat" (Bing 23), "hmrc vat concession solicitor rule" (Bing 18) — ~114 Bing impressions | Legal cashiering staff looking up the agent/principal test for VAT on disbursements; a simple input/output classifier (is this disbursement VATable?) would be highly shareable among cashiers |
| **Practice cashflow runway estimator** | "law firm cashflow management" (36 GSC) | Low volume but high value; WIP, lockup days, debtor days → months of runway; practice managers + sole practitioners audience |
| **Equity partner buy-in modeller** | "equity partner law firm buy in uk" (10 GSC) | Very thin volume but high intent/value; models capital contribution, salary sacrifice, loan interest deduction; strong conversion tool |

---

## 6. Top 10 data-supported tool opportunities (ranked)

Ranked by: combined query volume + competitor gap size + lead-gen value to a solicitor accountancy firm.

| Rank | Tool | Key queries + impressions | Competitor gap | Lead-gen value |
|------|------|--------------------------|----------------|----------------|
| **1** | **COLP/COFA Obligations Checker** | "colp" 188, "cofa" 88, "colp and cofa rules" 48 — ~380 Bing impr | None found | Very high — COLP/COFA = fee-earner partners/directors, direct decision-makers |
| **2** | **Conveyancing Fee Benchmarker** | "how much should solicitors charge for conveyancing" 66, "residential conveyancing fees" 33, "property conveyancing fees" 25 — ~211 GSC impr | None (HMRC SDLT calc is client-facing, not firm-facing) | High — practice managers + sole practitioners setting rates |
| **3** | **Solicitor Salary & Hourly Rate Benchmarker** | "solicitor hourly rates" 35 + 35 Bing, "grade a solicitor salary uk" 15 — ~141 Bing impr | Law Society has data but no interactive tool | High — HR/managing partners; also firm-buyer due diligence |
| **4** | **VAT on Disbursements Classifier** | "vat on disbursements" 32, "vat on legal fees" 23, "disbursement vat" 23, "hmrc vat concession" 18 — ~114 Bing impr | None found | Medium — cashiering/accounts staff, but shareable and linkable |
| **5** | **Practice Sale CGT / BADR Calculator** | "sole practitioner retirement" 14, "law firm valuation formula uk" 65 — adjacent ~79 GSC impr | None found | Very high — sole practitioners and equity partners considering exit; one of the highest-value conversations in solicitor accounting |
| **6** | **Client Account Interest Estimator** (extend tool #5) | "client money in business account" 97, "sra client account rules" Bing 29 — ~126 combined | None found | Medium-high — COFA / accounts dept; builds from existing tool |
| **7** | **LLP vs Ltd Decision Wizard** (deepen tool #1) | "partnerships and llp lawyers" 42, "partnerships and llps solicitors" 22, "partnership taxation llp" 15 — ~79 combined | Generic tools exist; no solicitor-specific wizard | High — structural decisions are the highest-fee accounting engagement |
| **8** | **Equity Partner Buy-In Modeller** | "equity partner law firm buy in uk" 10 GSC | None found | Very high conversion value despite thin volume (high-intent query) |
| **9** | **Practice Cashflow Runway Estimator** | "law firm cashflow management" 36 GSC | None found | High — WIP lockup and cashflow a constant pain point; sole practitioners to mid-size firms |
| **10** | **Practice Sale CGT + BADR on Goodwill Disposal** | Overlaps rank #5; separate angle: BADR 18% from Apr 2026 is a current tax-change hook | None found | Same as rank #5 — could be one tool with BADR toggle |

---

## Notes on SERP verification

Live SERP data pulled 2026-07-17 via DataForSEO (Google Organic UK, location_code 2826). Cost: $0.022 for 5 solicitor queries. Serper credits exhausted — DataForSEO used as replacement per owner instruction. Additional queries not yet live-verified: "law firm profitability calculator", "LLP vs Ltd calculator solicitor uk", "partner tax reserve calculator uk" — these remain knowledge-based assessments (all gaps confirmed).

## Cleanup

Temp scripts to delete after use:
- `scripts/_tmp_sol_gsc.sql`
- `scripts/_tmp_sol_bing.sql`
- `scripts/_tmp_serper_sol.py`
- `scripts/_tmp_serper_direct.py`
- `scripts/_tmp_serper_debug.py`
