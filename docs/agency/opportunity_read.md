# Agency Founder Finance — Opportunity Read (battery step B6)

Author: B6 (opportunity read). Date: 2026-07-08. Raw artifact: `.cache/agency_diag/opportunity_read.json`.
Scope: 314-topic pool diffed against live corpus (306 blog posts + core routes), GSC/Bing query data (90 days), competitor audit (Crunch sampled), and cross-site piggyback from generalist GSC.

---

## CRITICAL: INDEX RECOVERY GATE

> **ALL content opportunities below are GATED behind index recovery if B3 finds a discovery failure.**

The agency site shows **zero clicks across all Google queries in 90 days** despite ~1,000+ impressions. Positions range 14–90 with no page-1 rankings at all. This is the same pattern as the medical site's MED-F11 (Googlebot not discovering/crawling pages). Publishing new content will not produce rankings until crawl health is confirmed. Before acting on any opportunity below, verify in GSC Coverage:
- "Discovered — currently not indexed" volume
- "Crawled — currently not indexed" volume
- Sitemap submission status
- URL Inspection on /agencies/pr-agencies and a recent blog post

---

## DATA TRUST HEADER

- **GSC (Google), 90 days to 2026-07-08:** impressions exist (top query: 202 impr), clicks = 0 across every query. Positions: 14–90. Zero page-1 rankings.
- **Bing, 90 days:** minimal data — top query "vat on client entertainment" at pos 8.7 (7 impr, 0 clicks). Unlike medical (which had Bing working well), agency has no meaningful Bing engagement either.
- **Absolute zero click situation:** both channels dead. High-confidence discovery/ranking failure signal, not a content gap signal.
- **Corpus:** 306 live blog posts + 9 pillar/fundamentals + 3 resources + 20 /agencies/* verticals + 8 calculators + 3 /for-* audience pages + 10 relocation pages + 2 comparison pages (/mazuma-vs, /crunch-alternative).
- **Topic pool:** 314 topics in `blog_topics` table (all status=null, not yet committed/published).

---

## 1. GSC Near-Miss Pool (top signals, 90d)

All positions > 10. Zero clicks on all. Key query clusters:

| Query | Impressions | Avg Position | Dedicated Page? |
|---|---|---|---|
| accountants for pr agencies | 202 | 28.1 | Yes — /agencies/pr-agencies |
| pr agency for accountants | 143 | 40.1 | No (inverse query — PR firms hiring accountants) |
| cis accountant | 138 | 70.3 | No (construction sector, off-brand) |
| accounting for pr agencies | 66 | 24.8 | Yes — /agencies/pr-agencies |
| annual investment allowance | 62 | 69.0 | Yes — AIA blog post |
| annual investment allowance calculator | 51 | 51.4 | **No — calculator gap** |
| aia allowance / investment allowance | 53 | 76.4 | Yes — AIA blog post |
| accountants for creative agencies | 15 | 58.7 | Yes — /agencies/creative-agencies |
| mtd xero / xero mtd | 24 | 56.0 | No — MTD pillar exists, no Xero-specific page |
| annual investment allowance 2024/25 | 9 | **8.5** | Yes — AIA post (nearest to page 1) |
| vat on client entertainment | 7 | **8.7** | Yes — blog post (best Bing signal) |

**Key read:** The PR agency cluster (accountants for pr agencies + accounting for pr agencies + pr accounting) drives ~300 combined impressions but the page sits at pos 25–45. This is the single highest-impression brand-aligned cluster and the page already exists — it's a strengthen-not-create opportunity. The AIA calculator query (51 impr, pos 51) is the clearest net-new tool gap.

---

## 2. Cross-Site Piggyback (generalist GSC → agency relevance)

The generalist site (holloway-davies) top queries are dominated by construction accounting software, CIS, and ACCA/ICAEW qualification comparisons — none relevant to agency. Agency-relevant signals from generalist:

| Generalist Query | Impr | Pos | Agency Relevance |
|---|---|---|---|
| hmrc cgt reporting requirements 2026 | 83 | 15.9 | **High** — exit/BADR cluster; agency has BADR calculator |
| fixed fee accounts | 104 | 64.0 | Medium — pricing signal; agency has no fixed-fee page |
| hmrc cgt reporting deadlines 2026 | 54 | 17.0 | **High** — exit cluster; generalist at page 2 |
| incorporation accounting | 58 | 54.4 | **High** — agency has incorporating-your-agency-pillar |
| sole trader to limited company | 41 | 80.4 | High — incorporation funnel entry |
| reserve a company name companies house | 43 | 26.6 | Medium — incorporation funnel |
| xero vs quickbooks uk | 69 | 90.4 | Medium — MTD/software choice; no page on agency |

**Implication:** The CGT/BADR reporting 2026 queries are live demand the generalist can't fully serve (it's a niche signal for business sellers, not generalist clients). Agency's exit cluster is the right home but needs to be indexed first.

---

## 3. Topic Pool Assessment

314 topics in Supabase `blog_topics` (status=null), 306 already live in `/content/blog/`. Split:

| Category | Pool Count | Rough Live Coverage |
|---|---|---|
| International Agencies | 115 | Partial (10 relocation pages + blog posts) |
| Tax and Compliance | 53 | Good (306 blog posts cover most) |
| Agency Finance Essentials | 26 | Good |
| Growth and Exit | 21 | Good (exit/BADR cluster) |
| Salary and Dividends | 21 | Good |
| Contractors and IR35 | 21 | Good |
| Making Tax Digital | 19 | Partial (pillar + some blogs) |
| Agency Accountant Services | 19 | Good |
| Incorporation and Structure | 19 | Good |

**The international cluster (115 topics, 37% of pool) is the largest uncommitted block.** The site has 10 relocation destination pages but 115 further topics in queue — mostly UAE/Dubai tax mechanics, international founder scenarios.

---

## 4. Competitor Brand-Category Gaps

Crunch sampled (sidekick, mazuma blocked). Key gaps vs agency:

| Category | Crunch has | Agency has |
|---|---|---|
| Generic tax calculators | Self-employed, income tax, NI, dividend, CGT, mileage | Salary-dividend, BADR, take-home, employer NI, R&D, VAT scheme, pension, MTD checker, incorporation cost, agency valuation |
| Downloadable templates | Invoice templates, late payment letters | None |
| Free invoice software guide | Yes | No |
| Sole trader / entry funnel | /accounting-sole-traders | No (agency targets Ltd co founders) |
| Ecommerce vertical | /ecommerce-accounting | No |
| Glossary | Standalone glossary | /glossary route exists |
| Webinars | Yes | No |
| Recruiters and agencies page | /recruiters-and-agencies | /agencies/recruitment-agencies |

**Honest read:** Agency's calculator depth (12 tools) already exceeds Crunch's (6 tools). The template/downloadable gap is a quick win IF the audience (Ltd company agency founders) actually wants invoice templates — debatable for a B2B professional service audience. Crunch's ecommerce vertical is irrelevant to agency's niche. The mileage calculator is the only generic calculator Crunch has that agency clearly lacks.

---

## 5. Existing Agency Content Inventory

| Content type | Count |
|---|---|
| Blog posts (live in /content/blog) | 306 |
| Pillar/fundamentals | 9 |
| Resources (pay-planning, exit, compliance-vat) | 3 |
| /agencies/* verticals | 20 |
| Calculators | 12 |
| /for-* audience pages | 3 (new-founders, growth-stage, pre-exit) |
| Relocation destinations | 10 |
| Comparison pages | 2 (/mazuma-vs, /crunch-alternative) |
| Free health check | 1 |
| Founder stories | 1 (hub) |
| Glossary | 1 (hub, slug-driven) |
| R&D credits | 1 |
| Incorporation | 1 |

**The corpus is large and structurally complete.** The problem is not content volume — 306 posts + 12 calculators + 20 verticals is a substantial estate. The problem is zero Google traction (0 clicks, pos 14–90).

---

## 6. Ranked Opportunity Clusters

**OPP-1 — PR / creative agency vertical strengthening (strongest near-miss, least new work)**
Queries: "accountants for pr agencies" (202 impr, pos 28), "accounting for pr agencies" (66 impr, pos 25), "pr accounting" (11 impr, pos 38). Combined ~280 impressions, all landing on /agencies/pr-agencies which sits page 3. Action: strengthen the page with PR-specific financial substance — retainer VAT treatment, creative vs production cost splits, freelancer IR35 in PR context. Not a new page. Difficulty: LOW effort. Impact: HIGH (highest-impression brand-aligned cluster). Gate: index recovery first.

**OPP-2 — AIA / annual investment allowance calculator (clearest tool gap)**
Queries: "annual investment allowance calculator" (51 impr, pos 51), "annual investment allowance 2024/25" (9 impr, pos 8.5). The pos 8.5 ranking on the date-specific variant proves the AIA post can rank — it just needs a calculator alongside it. 12 calculators already live; adding one more is one component file. Difficulty: LOW (infra exists). Impact: MEDIUM (moderate volume, high intent). Gate: index recovery first.

**OPP-3 — Agency exit / BADR / CGT cluster (content exists, crawl-blocked)**
Queries: the BADR calculator + exit posts exist; generalist shows 83+54 impr on CGT reporting 2026 queries at pos 15–17 (proof the topic has live demand). Agency has BADR calculator + /for-pre-exit + blog exit cluster. Zero clicks because of indexing, not content absence. Action: zero content work — fix index, then monitor. Priority is the index recovery gate, not writing.

**OPP-4 — MTD Xero guide (small, targeted)**
Queries: "mtd xero" (13 impr, pos 57) + "xero mtd" (11 impr, pos 55). Agency has an MTD pillar but no software-specific page. One post: "MTD for agency founders using Xero — step by step." Difficulty: LOW. Impact: LOW-MEDIUM. Gate: index recovery first.

**OPP-5 — UAE corporate tax mechanics depth (international cluster unlock)**
Queries: UAE corporate tax threshold queries (44 combined impr). The site has a /dubai-relocation page but the UAE corporate tax mechanics (9% rate, AED 375k threshold, free zone treatment for agency structures) are not covered as standalone. Topic pool has 115 international topics queued. Difficulty: MEDIUM (requires accurate UAE tax content). Impact: LOW-MEDIUM (niche but zero competitors in agency-accountant space covering UAE). Gate: index recovery first.

---

## 7. Honest Difficulty Read

- The corpus is already large and structurally complete. The binding constraint is not content — it is Google's failure to rank any page (0 clicks, 0 page-1 positions, pos 14–90 across 90 days).
- This mirrors the medical site MED-F11 exactly: content exists, Bing can sometimes surface it, Google cannot.
- Before any content investment, run a B3-equivalent crawl health check: GSC Coverage tab, URL Inspection, sitemap verification.
- If B3 finds a discovery failure: index recovery takes priority over all 5 clusters above.
- If B3 finds no discovery failure: OPP-1 (PR page strengthen) and OPP-2 (AIA calculator) are the two lowest-effort, highest-signal actions.

---

## 8. What NOT to write

- CIS accountant content — 138 impressions but construction sector, off-brand for a digital agency finance site.
- Generic income tax / NI calculators — Crunch has these but agency's audience (Ltd co agency founders) already has the right tools (salary-dividend, take-home).
- Invoice / contract templates — Crunch has these; audience is professional B2B, not the right fit.
- More international relocation pages without index health — 10 relocation pages + 115 queued topics exist; adding more before fixing discovery is noise.
