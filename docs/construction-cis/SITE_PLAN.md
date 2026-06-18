# Trade Tax Specialists — Site Plan

Drafted 2026-06-12. Research base: live UK SERP checks, competitor fetches, GOV.UK FA 2026 policy papers.
Status: **PLAN — awaiting architect implementation.**

---

## 1. Identity

| Field | Value |
|---|---|
| Brand | Trade Tax Specialists |
| Domain | `www.tradetaxspecialists.co.uk` (not yet purchased) |
| Site key (repo dir) | `construction-cis` |
| Storage prefix | `bfp` (not yet registered in estate) |
| Niche | CIS / construction accounting — UK sole traders and limited company directors in construction trades |
| Estimated CPC | £8–18 (lower than cfp's £28.12 but CIS pool is large: 1.4m+ HMRC-registered subs) |
| Pattern | Mirror `contractors-ir35` exactly (first new site after cfp, same machinery) |

---

## 2. Audience

Three buyer personas in priority order:

**A. Sole trader subcontractor (primary)**
Self-employed builder, plumber, electrician, joiner, groundworker, roofer etc. CIS-registered. Typically having 20% deducted each month — usually overpaying by £1,500–3,000/year. Wants that money back, then wants ongoing compliance. Monthly fee: ~£80–150.

**B. Limited company director in construction (secondary)**
CIS-registered as a company. Can reclaim deductions in real time via EPS rather than waiting 18 months via SA. Higher LTV. Monthly fee: £150–250+.

**C. Main contractor (tertiary)**
Runs a construction firm employing subcontractors. Must file CIS300 monthly returns, verify each sub, and from April 2026 must file nil returns. Different content funnel — contractor-side rather than sub-side.

---

## 3. Positioning

**Hook:** "The average CIS subcontractor overpays £2,000 a year in tax deductions. We claim it back — then keep you compliant."

**Differentiator:** Only specialist construction accountant in the estate. Not a generalist with a CIS vertical — every page is construction-only. The refund angle is the front-door lead magnet; the ongoing advisory relationship is the LTV.

**What we deliberately are not:** A tax rebate factory (RIFT). We do the refund as an entry service but the brand is about the full relationship. We are not a directory or aggregator. We do not self-rank in "best CIS accountants" lists (faceless brand rule — no named partners).

---

## 4. Design tokens

| Token | Value | Rationale |
|---|---|---|
| Primary | `#f97316` (construction orange) | Hi-vis energy, trade identity, distinct from all estate sites |
| Dark | `#1e293b` (slate-900) | Professional anchor |
| Accent light | `#fdba74` (orange-300) | On dark backgrounds |
| Background | `#fafaf9` (off-white, stone-50) | Matches estate pattern |
| Distinct from | Property (emerald), cfp (petrol/cyan), Generalist (ink+orange), Dentists (TBC), Solicitors (TBC) | |

Font: Geist Sans (estate standard).

---

## 5. Money keyword map

### Tier 1 — where money changes hands (service pages)

Rule: one owning page per commercial term. Blog never competes against these.

| Keyword | Intent | Owning page |
|---|---|---|
| `CIS accountant` / `construction accountant UK` | Find a specialist firm to engage | **Homepage** `/` |
| `accountant for subcontractors` / `subcontractor accountant` | Hire-intent, construction-specific | **Homepage** (primary) + /services |
| `construction accounting services` | Service bundle | **/services** |
| `CIS tax refund` / `CIS refund accountant` / `how to claim CIS refund` | Immediate task: get money back | **/cis-refund** |
| `CIS gross payment status` / `gross payment status accountant` | Premium: eliminate future deductions | **/gross-payment-status** |

Rationale: The homepage carries the brand head term and subcontractor hire-intent. /services carries the service bundle. /cis-refund is the strongest single commercial differentiator — the refund hook converts cold traffic and is the unique angle RIFT owns at scale but doesn't carry into an advisory relationship (we do). /gross-payment-status is the premium tier play: GPS holders save 20% on every payment, so the willingness to pay for an accountant to help secure it is very high.

### Tier 2 — trade verticals (/for/* pages)

10 dedicated sector pages. Same structure as contractors-ir35's /for/* — each page:
- Owns the `accountant for [trade]` keyword
- Carries trade-specific CIS examples and pain points
- Links to /cis-refund (the refund CTA) and /services
- Must not compete with a sibling page's exact keyword

| Keyword | Owning page |
|---|---|
| `accountant for plumbers` / `CIS accountant plumber` | /for/plumbers |
| `accountant for electricians` | /for/electricians |
| `accountant for joiners` / `accountant for carpenters` | /for/joiners |
| `accountant for groundworkers` | /for/groundworkers |
| `accountant for roofers` | /for/roofers |
| `accountant for builders` / `accountant for general builders` | /for/builders |
| `accountant for gas engineers` / `Gas Safe accountant` | /for/gas-engineers |
| `accountant for painters and decorators` | /for/painters-decorators |
| `accountant for scaffolders` | /for/scaffolders |
| `accountant for civil engineers` / `construction engineer accountant` | /for/civil-engineers |

### Tier 3 — commercial-informational that funnels (blog-owned, wave 1 + 2)

| Keyword | Funnel target |
|---|---|
| `what is CIS` / `how does CIS work` | Homepage → /services |
| `CIS registration` / `how to register for CIS` | /cis-refund (reg'd = 20% not 30%) → /services |
| `CIS deduction rates` | /cis-refund |
| `CIS refund how much` / `how to claim` | /cis-refund |
| `CIS gross payment status how to apply` | /gross-payment-status |
| `CIS sole trader vs limited company` | /services |
| `CIS expenses / allowable expenses` | /services |
| `VAT reverse charge construction` | /services (compliance advisory) |
| `MTD for CIS subcontractors` | /services (urgency: April 2026) |
| `CIS monthly return` / `CIS nil return` | /services (contractor audience) |
| `CIS limited company reclaim EPS` | /services |

---

## 6. Core page mapping (the W1-B brief — implement before or during wave 1)

These are the static service pages. metaTitles: max 62 chars, primary keyword front-loaded, no em-dashes.

| Page | Owned keyword | Recommended metaTitle | Notes |
|---|---|---|---|
| `/` (homepage) | CIS accountant; construction accountant UK; accountant for subcontractors | "CIS Accountants & Construction Tax Specialists \| UK" (51) | H1: "Specialist CIS accountants for UK construction trades." Ensure "CIS accountant" is in the first H2 and the hero sub-line. |
| `/services` | construction accounting services; CIS accounting services | "CIS Accounting Services \| Construction Tax & Compliance" (55) | H1: "CIS accounting services for subcontractors and contractors." |
| `/cis-refund` | CIS tax refund; CIS refund accountant; claim CIS tax back | "CIS Tax Refund Service \| Claim Back Your CIS Deductions" (56) | This is the primary lead conversion page. H1 must use the refund hook ("The average CIS subcontractor is owed £2,000 back"). Must include: how the refund works, how long it takes, what we need from you, the CTA. NOT a blog guide — a service page. |
| `/gross-payment-status` | CIS gross payment status; gross payment status accountant | "CIS Gross Payment Status \| Application & Maintenance Service" (59) | H1: "Get CIS gross payment status — and keep it." Include the April 2026 anti-fraud changes as reason why maintenance matters. Framed as a managed service, not just a how-to. |
| `/for/plumbers` | accountant for plumbers; CIS accountant for plumbers | "Accountants for Plumbers \| CIS Tax & Refund Specialists" (56) | KEEP if auto-generated to this spec. |
| `/for/electricians` | accountant for electricians | "Accountants for Electricians \| CIS Tax & Refund Specialists" (60) | KEEP |
| `/for/joiners` | accountant for joiners; carpenter accountant | "Accountants for Joiners & Carpenters \| CIS Tax Specialists" (58) | KEEP |
| `/for/groundworkers` | accountant for groundworkers | "Accountants for Groundworkers \| CIS Tax & Refund Service" (56) | KEEP |
| `/for/roofers` | accountant for roofers; roofing contractor accountant | "Accountants for Roofers \| CIS Tax & Refund Specialists" (54) | KEEP |
| `/for/builders` | accountant for builders; general builder accountant | "Accountants for Builders \| CIS Tax & Self-Assessment" (53) | KEEP |
| `/for/gas-engineers` | accountant for gas engineers; Gas Safe accountant | "Accountants for Gas Engineers \| CIS & Gas Safe Tax Advice" (57) | KEEP |
| `/for/painters-decorators` | accountant for painters and decorators | "Accountants for Painters & Decorators \| CIS Tax Advice" (55) | KEEP |
| `/for/scaffolders` | accountant for scaffolders | "Accountants for Scaffolders \| CIS Tax & Refund Service" (54) | KEEP |
| `/for/civil-engineers` | accountant for civil engineers | "Accountants for Civil Engineers \| CIS & Construction Tax" (57) | KEEP |

Cross-link rule: every /for/* page links once to /cis-refund and once to /services. /cis-refund and /gross-payment-status link to /for. Homepage links to all.

---

## 7. Wave 1 — 15 proving-wave pages

Tier: 3 pillars (Opus-written), 12 clusters (Sonnet). Haiku banned from content.
Categories: 7 (listed in header row).

Wave-1 live slugs (do NOT overlap in later waves):

| # | slug | working title | category | tier | money keyword supported | primary link target |
|---|---|---|---|---|---|---|
| 1 | what-is-cis | What is the Construction Industry Scheme? A complete guide | CIS Basics | pillar | what is CIS; how does CIS work | /services |
| 2 | cis-gross-payment-status-guide | CIS gross payment status: how to qualify, apply and keep it in 2026 | CIS Compliance | pillar | CIS gross payment status how to apply | /gross-payment-status |
| 3 | cis-sole-trader-vs-limited-company | CIS: sole trader or limited company — which structure works better? | CIS Basics | pillar | CIS sole trader; CIS limited company contractor | /services |
| 4 | how-to-register-for-cis | How to register for CIS as a subcontractor: step by step | CIS Basics | cluster | how to register for CIS | /cis-refund |
| 5 | cis-deduction-rates-explained | CIS deduction rates: 20%, 30% and gross payment status explained | CIS Basics | cluster | CIS deduction rates 2026 | /cis-refund |
| 6 | cis-tax-refund-how-to-claim | How to claim your CIS tax refund from HMRC | CIS Refunds | cluster | CIS tax refund; claim CIS deductions back | /cis-refund |
| 7 | allowable-expenses-cis-subcontractor | Expenses CIS subcontractors can claim: the 2026/27 guide | Expenses | cluster | allowable expenses CIS subcontractor | cis-sole-trader-vs-limited-company |
| 8 | vat-reverse-charge-construction | VAT domestic reverse charge in construction: a practical guide | VAT and MTD | cluster | VAT reverse charge construction | /services |
| 9 | cis-limited-company-reclaim | How CIS limited companies reclaim deductions in real time | CIS Advanced | cluster | CIS limited company reclaim; EPS CIS | cis-sole-trader-vs-limited-company |
| 10 | cis-monthly-return-guide | CIS monthly returns: deadlines, nil returns and penalties (2026) | CIS Compliance | cluster | CIS monthly return; CIS300 | /services |
| 11 | mtd-income-tax-cis | Making Tax Digital and CIS: what subcontractors must do from 2026 | VAT and MTD | cluster | MTD for CIS subcontractors 2026 | /services |
| 12 | cis-subcontractor-verification | How to verify subcontractors under CIS and why it matters | CIS Compliance | cluster | CIS subcontractor verification | cis-monthly-return-guide |
| 13 | what-is-a-cis-accountant | What does a CIS accountant do and do you need one? | CIS Basics | cluster | what is a CIS accountant | /services |
| 14 | cis-vs-paye | CIS vs PAYE: the key differences for construction workers | CIS Basics | cluster | CIS vs PAYE | what-is-cis |
| 15 | cis-nil-return-explained | CIS nil return: the April 2026 rule every contractor must know | CIS Compliance | cluster | CIS nil return 2026 | cis-monthly-return-guide |

Category spread: CIS Basics 5, CIS Compliance 4, CIS Refunds 1, VAT and MTD 2, Expenses 1, CIS Advanced 1, (wave 2 will add: Limited Company Tax, Construction Business). Pillars 3, clusters 12.

Pre-write notes for the wave-1 conductor:
- #1 `what-is-cis` is the topical anchor. Every subsequent cluster that touches CIS mechanics should link UP to it rather than restating the full scheme overview.
- #2 `cis-gross-payment-status-guide` is the informational companion to /gross-payment-status (the service page). The guide explains how GPS works and why it matters; the service page is the CTA to let us handle the application. They must cross-link. The guide must include the April 2026 anti-fraud updates (immediate revocation, 5-year ban, due diligence requirement) — these are new and underserved.
- #6 `cis-tax-refund-how-to-claim` is informational. It explains the process. /cis-refund is the service page. The guide links to /cis-refund as the CTA but does not replace it. Include the £2,000 average refund statistic.
- #8 `vat-reverse-charge-construction` must include worked examples (a sample invoice, a common "end user exception" scenario). Generic DRC guides are thin — this is a gap.
- #11 `mtd-income-tax-cis` is time-sensitive (April 2026 threshold just hit). The CIS-specific nuance: MTD uses gross income, not net after CIS deductions. This is the point most guides miss.
- #15 `cis-nil-return-explained` is a 2026-specific urgency page. Short, punchy, practical. Many contractors are already missing this obligation.

---

## 8. HP lock — ground truth for house_positions.md

All facts below are FA 2026-verified. Lock these before any content is written.

### CIS deduction rates (2026/27 — unchanged)
- Gross Payment Status (GPS): **0%**
- Registered subcontractor: **20%**
- Unregistered subcontractor: **30%**
- **Critical**: deductions apply to **labour only** — the cost of materials is excluded from the deduction base. This is one of the most commonly misunderstood rules; every wave-1 cluster that discusses deductions must state this clearly.

### GPS qualification tests (2026/27)
Three tests, all must be passed:

**1. Business test:** Carries out construction work (or provides labour for it) in the UK, through a bank account.

**2. Turnover test:**
| Entity type | Net annual CIS turnover required |
|---|---|
| Sole trader | £30,000 |
| Partnership | £30,000 per partner OR £100,000 total |
| Limited company | £30,000 per director OR £100,000 total |
| Closely controlled company (5 or fewer controllers) | £30,000 per controller |

"Net" = excludes VAT and cost of materials purchased for jobs. Measurement period: last 12 months of CIS-relevant construction work.

**3. Compliance test:** All tax obligations met on time for the past 12 months — no late SA returns, no overdue tax bills, no PAYE defaults.

### April 2026 GPS anti-fraud changes (Finance Bill 2026, in force 6 April 2026)
- **Immediate revocation:** HMRC can remove GPS without advance notice where a contractor "knew or should have known" about fraudulent connections in the supply chain. The "should have known" standard means failure to carry out due diligence is sufficient — no intent required.
- **Five-year reapplication ban:** GPS removed on fraud grounds triggers a 5-year ban on reapplication (previously 1 year). Cash flow cost: ~£100,000/year for a contractor earning £500k/year under the 20% rate.
- **Director liability:** Finance Bill 2026 ss.62A/62B — individual directors can face penalties up to 30% of tax HMRC considers lost due to fraudulent transactions.
- **Due diligence now essential:** Re-verify CIS status of each subcontractor before payment, Companies House legitimacy check, bank account name verification.

### CIS returns and deadlines
- **CIS300 (monthly return):** Must be filed by the **19th of the following tax month**. Payment by **22nd** (electronic) or **19th** (cheque).
- **Nil returns — mandatory from April 2026:** Contractors must file a CIS300 nil return for months with no payments (or pre-notify HMRC of inactivity). Obligation was removed in 2015 and reinstated from 6 April 2026.
- **Nil return penalty structure:** £100 (1 day late), £200 (2 months), £300 or 5% of liability (6 months), £300 or 100% of liability (12 months).

### CIS registration
- **Contractors** must register before paying the first subcontractor. Non-construction businesses spending £3m+/year on construction work are also classed as contractors.
- **Subcontractors:** Registration is optional but practically essential — unregistered = 30% rate vs 20% for registered.

### VAT domestic reverse charge (DRC) — in force since 1 March 2021, no FA 2026 changes
Applies when ALL of:
1. The supply is a specified CIS service
2. Both supplier and customer are VAT-registered
3. Both are CIS-registered
4. The customer is **not** the end user (they will sell the services on)
5. The supply is standard-rated or reduced-rated (not zero-rated; new-build housing is zero-rated and exempt)

End-user exception: property owners, tenants, developers building for own use are end users — normal VAT rules apply. De minimis: if reverse charge applies to 5% or less of invoice value, normal VAT rules apply.

### Making Tax Digital — Income Tax (MTD ITSA)
- **From April 2026:** Sole traders/partnerships with annual income over **£50,000** must comply — quarterly digital reporting via MTD-compatible software.
- **From April 2027:** Threshold drops to **£30,000**.
- **CIS nuance:** "Income" for MTD purposes is **gross** income (turnover before expenses), not net after CIS deductions. A subcontractor receiving £48,000 after 20% deductions on £60,000 gross is still within the £50,000 MTD threshold on the £60,000 figure.
- **Grace period 2026/27:** HMRC will not issue penalty points for late quarterly updates in year 1, but late annual returns and late payment penalties still apply.

### Public sector CIS exemption (new from April 2026)
Payments to local authorities and public sector bodies are fully exempt from CIS under new Regulation 23A. Contractors on public sector contracts no longer apply CIS deductions or include those payments in monthly returns.

### FA 2026 standard rates (estate-wide, same as other sites)
- **Dividend tax (from 6 April 2026):** Basic 10.75%, Higher 35.75%, Additional 39.35% (FA 2026 s.4). Dividend allowance still £500.
- **AMAP mileage (from 6 April 2026):** 55p per mile (first 10,000), 25p after. (Was 45p/25p.)
- **Employer NIC (from April 2025):** 15% on earnings above £5,000/year (was 13.8%/£9,100).
- **Corporation tax:** 25% main rate (profits over £250k), 19% small profits rate (under £50k), marginal relief between.

### Market data (for content, not guaranteed)
- Average CIS subcontractor annual tax refund: £2,000–£3,000 (Dearne Accountancy reports £1,840 average first-year client refund; RIFT Refunds uses this figure range in marketing).
- HMRC-registered CIS subcontractors: 1.4 million+.
- Monthly fee benchmarks: sole trader CIS return only £20–50/month; sole trader full service £80–150/month; Ltd Co full service £150–250+/month.

---

## 9. Architecture spec

The site mirrors `contractors-ir35` exactly. The architect's reference implementation is the `contractors-ir35/web/` directory. Key structural decisions — do not deviate without good reason:

- **Framework:** Next.js 14 App Router (TypeScript), Tailwind CSS, same package stack as contractors-ir35
- **Config file:** `niche.config.json` with `site_key: "construction-cis"`, `storage_prefix: "bfp"`, brand tokens, 7 category slugs
- **Blog routing:** `blog/[category]/[slug]` (NOT flat routing — this is the nested pattern; solicitors/medical/cfp all use it)
- **Frontmatter:** HTML only (`<p>`, `<h2>` etc.), NOT markdown syntax. The blog renderer does not parse markdown.
- **Service pages:** Homepage + /services + /cis-refund + /gross-payment-status (the two service pages are the key structural difference from contractors-ir35 which had /ir35-status)
- **Trade verticals:** 10 /for/[slug] pages (listed in §6 above)
- **Static pages:** /about, /contact, /for (index)
- **Analytics:** ConsentProvider / AnalyticsProvider / ConsentedScripts, opt-out posture, /api/track via createTrackHandler
- **Lead form:** consent checkbox (mandatory), honeypot, visitor stitching, `source: 'construction-cis'`
- **Console:** /admin/analytics (shared cookie auth), /api/admin/login, /api/og (brand colours)
- **Build checks:** assertFrontmatter, validateNicheConfig, buildSecurityHeaders, feed.xml, llms-full.txt
- **Tests:** Vitest wired into `npm test`
- **Vercel project:** create in estate team (`sitenudge-projects`, team `team_XF9WAygZX7SGk9Fo4tOAnihH`) before deploy

**What differs from contractors-ir35:**
1. Two Tier 1 service pages (`/cis-refund` + `/gross-payment-status`) instead of one (`/ir35-status`)
2. Design tokens (orange primary, not petrol/cyan)
3. 10 /for/* trade pages (same count, different trades)
4. 7 categories (different names from cfp's 7)
5. 15 wave-1 pages (same count as cfp wave 1)

**Database setup:**
- `sites` registry row: `{ site_key: 'construction-cis', site_name: 'Trade Tax Specialists', ... }`
- `sites_site_key_check` constraint update (add 'construction-cis')
- `leads_source_valid` constraint update (add 'construction-cis')
- `blog_topics` seeding: run autocomplete expansion for the 7 categories before wave 1 writes

---

## 10. What NOT to chase

- **"Top 10 CIS accountants" / "best CIS accountant" listicles.** Faceless brand — cannot self-rank. We own the *how-to-choose* and *cost* informational variants instead.
- **"CIS accountant jobs" / "how to become a CIS accountant".** Off-mission (career intent, not client intent).
- **"CIS Ireland" / "CIS India".** Out of geo (UK only).
- **Pure tax rebate factory terms** (`CIS refund claim no accountant needed`, `DIY CIS refund`). Our angle is the ongoing advisory relationship, not a one-shot factory claim.
- **Generic SME / sole trader terms not related to construction.** The brand is construction-only.
- **Architects and quantity surveyors.** Typically outside CIS (professional services). Do not build /for/architects or /for/quantity-surveyors — the CIS angle doesn't hold. Replace with /for/civil-engineers (heavy civil/structural work is CIS-applicable).

---

## 11. Competitor watch

Key incumbents to monitor and differentiate against:

| Firm | URL | Strength | Our angle |
|---|---|---|---|
| Lanop | lanop.co.uk/cis-accountants/ | Deep content, 15yr specialist | We beat them on: April 2026 GPS updates, MTD×CIS specifics, trade sub-pages, transparent pricing |
| TTCA (Treetops) | ttca.co.uk | 379 5-star reviews, ICAEW | Social proof gap is theirs; content depth gap is ours |
| Accurox | accurox.co.uk | "Construction accountants" in brand | Pure-play but no tools, no trade sub-pages |
| DNS Accountants | dnsassociates.co.uk | Scale, 40 offices | Generalist dilution — we beat on specialism |
| RIFT Refunds | riftrefunds.co.uk | CIS refund calculator, national scale | Transactional only — we own the advisory relationship |
| Northern Accountants | northernaccountants.co.uk | Ranks on subcontractor terms | Regional, no GPS/MTD depth |

---

## 12. SERP surprises / ground truth breaks (flag before writing)

1. **April 2026 GPS changes are live and underserved.** The "knew or should have known" fraud standard + 5-year ban + director liability are confirmed from GOV.UK policy papers. Only a handful of accountant blogs mention them. This is a genuine first-mover content opportunity. Every GPS-related page must include these updates.
2. **Nil returns reinstated April 2026** — already being missed by contractors. High urgency, thin coverage. The #15 wave-1 cluster is specifically for this.
3. **MTD ITSA £50k threshold live from April 2026** — many CIS subcontractors are now in scope. The gross-income nuance (not net after deductions) is missed by most existing guides.
4. **DRC end-user exception is widely misunderstood.** Multiple contractor blogs conflate CIS sub/contractor with the end-user rule. A worked example guide will rank for complaint queries.
5. **Dividend rates changed from 6 April 2026** (10.75%/35.75% — see HP §FA 2026 standard rates). All content quoting dividend rates must use 2026/27 figures. Block any page quoting 8.75%/33.75%.
6. **AMAP mileage is now 55p from 6 April 2026.** Any expenses-related page must use 55p, not 45p.
