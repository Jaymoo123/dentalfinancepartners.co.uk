# Track 2 brief: annual-investment-allowance-uk

**Site:** property
**Brief type:** Legacy rewrite - gold-reference data-complete brief (Batch 4)
**Source markdown path:** `Property/web/content/blog/annual-investment-allowance-uk.md`
**Live URL:** https://www.propertytaxpartners.co.uk/blog/section-24-and-tax-relief/annual-investment-allowance-uk
**Stage 1 priority:** H - owns the most equity for the generalist head term "annual investment allowance" intent across a 12-page AIA cluster; proven cross-engine demand (Bing pos 3-7 page-1 on the head term) with zero Google visibility (pos 47-84). Rewrite-not-collapse signal is strong.
**Stage 1 date:** 2026-05-30
**Stage 2 enrichment date:** 2026-05-30 (GSC + GA4 pulled via `optimisation_engine.track2.pull_page_data` cache fallback; source markdown + sibling pages read; house_positions §25 + §7 verified)
**Cannibalisation status:** REWRITE (canonical head-term page; differentiate UP to the Wave 6 pillar + s.51 group page; flag six zero/low-equity legacy duplicates for a SEPARATE later cluster-collapse 301 INTO this page - this brief does NOT delete them)

> **Gold-reference depth target.** This brief matches the depth of `briefs/property/track2/trial/cgt-rates-property-2026-27-current-rates-explained.md`. Every data point below is real, pulled at brief-drafting time. The rewrite must hit ~3,400 body words at this section + citation density.

---

## Manager pre-decisions (Stage 1 reasoning)

- **Slug:** kept as `annual-investment-allowance-uk`. It is the cleanest exact-match for the generalist head query "annual investment allowance" / "annual investment allowance uk" and already carries the most cluster equity. No redirect of THIS page.
- **Category:** kept as `Section 24 & Tax Relief` (canonical path `/blog/section-24-and-tax-relief/annual-investment-allowance-uk`). Do NOT migrate the category or the slug at this rewrite - a path change would force a 301 and reset the (already proven on Bing) equity. The Wave 6 modern cluster sits in `Property Types & Specialist Tax`; this page deliberately keeps its existing home and forward-links across.
- **Gap-mode tag:** `STALE_FACTS` (primary, load-bearing) + `INVISIBLE` (primary - Google pos 47-84) + `CANNIBAL` (structural - ~9 near-duplicate legacy AIA pages) + `CTR_FAIL` (secondary - Bing page-1, 0 clicks) + `THIN_DEPTH` (1,453 words vs 3,400 target) + `STRUCTURE` (dead authority link, broken internal link, no statute spine, 4 FAQs).
- **"Why this rewrite" angle:** The page is materially WRONG on its core fact. It frames the £1m AIA cap four times as a *temporary* cap "set to remain until at least 31 March 2026" (frontmatter FAQ #1; body lines 38, 88, 122). That is pre-Finance (No. 2) Act 2023 framing: the £1m was made **permanent** with no sunset by F(No.2)A 2023 s.8 (substituting CAA 2001 s.51A(5)), effective for chargeable periods beginning on/after 1 April 2023, and the live gov.uk page confirms £1m permanent from 1 April 2023. A "plan your purchases before the deadline" page that has no deadline is actively misleading and will read as stale to both users and Google. Layered on top: a false "40% first-year allowance for plant purchased after 1 January 2026" claim (line 77 - no such relief exists), a dead `aka.hmrc.gov.uk` source link, a broken `/incorporation` internal link, and an April 2027 rate assertion that needs re-stating as ENACTED law (see §7 conflict block). The rewrite corrects every stale fact, builds the proper CAA 2001 statute spine, owns the head-term intent, and forward-links UP to the Wave 6 pillar and s.51 group page instead of duplicating them.

---

## Current page snapshot (Stage 2 - read from filesystem + frontmatter)

- **Source word count:** ~1,453 body words (diagnosis figure; confirmed broadly by read - 12 H2 sections, mostly list-led, light per-section depth).
- **Current H2 outline (12 H2s, 1-line summaries):**
  1. What Is the Annual Investment Allowance? - definition + the STALE "£1m until 31 March 2026" claim
  2. How Does the AIA Work for Property Investors? - list of asset types; period-of-purchase rule; HP contracts
  3. What Qualifies for the AIA? - plant vs building distinction (correct in outline, thin)
  4. AIA Limits and Accounting Periods - pro-rating short periods; single AIA for commonly-controlled companies (correct but undeveloped)
  5. AIA and the Cash Basis - cash-basis restriction (cars only)
  6. Other Capital Allowances to Consider - full expensing (OK) + FALSE "40% FYA from Jan 2026" + super-deduction (expired, OK)
  7. Practical Example: AIA for a Commercial Property Investor - Manchester worked example (uses CT rates + 40% IT; arithmetic OK but no s.35 caveat)
  8. Key Dates and Future Changes - STALE "£1m until 31 March 2026" + bare April 2027 rate assertion
  9. How to Claim the AIA - 4-step claim list
  10. Common Mistakes to Avoid - building-vs-plant, timing, single-company, cash basis
  11. Is the AIA Right for Your Property Business? - segmentation (commercial/SA/improvements/company)
  12. Final Thoughts - repeats STALE deadline; repeats FALSE 40% FYA
- **Current meta title:** "Annual Investment Allowance UK: Property Investor Guide" (54 chars; generic, no differentiator, no "£1m permanent" hook).
- **Current meta description:** "Learn how the annual investment allowance UK works for property investors. Claim up to £1m on plant & machinery. Includes examples and key dates." (143 chars; "key dates" promise points at the stale deadline framing).
- **Current FAQ count (frontmatter `faqs:` array):** 4 (target 12-14). FAQ #1 is STALE ("£1m ... in place since 1 January 2019 and is currently set to remain until at least 31 March 2026").
- **Outbound authority links:** 3 in a Sources list, of which **ref-1 is DEAD** (`http://aka.hmrc.gov.uk/capital-allowances/fya/water.htm` - legacy `aka.` redirect domain pointing at the abolished water-FYA page; non-https). ref-2 (gov.uk/capital-allowances/annual-investment-allowance) is live and correct; ref-3 (icaew.com) is live. NO legislation.gov.uk citations anywhere.
- **Internal links:** 6 - `/incorporation` (**BROKEN - not a blog route; no such page**), `/blog/section-24-and-tax-relief/landlord-tax-deductions-uk-2026-complete-list` (live), `/blog/section-24-and-tax-relief/rental-income-tax-uk-complete-guide-landlords` (live), `/blog/landlord-tax-essentials/property-investment-tax-uk-complete-guide-2026` (live), `/blog/property-accountant-services/what-does-a-property-accountant-do` (live), `/contact` + `/services` (site routes).
- **Schema present:** Y (FAQPage auto-emitted from frontmatter `faqs:` - never hand-add in body).
- **Last meaningful edit:** `dateModified: 2026-05-20` (frontmatter; recent date but stale content - a partial-touch artefact, not a genuine refresh).

---

## GSC angle (last 90 days) - REAL DATA from `pull_page_data` (cache fallback; Supabase API 503 at pull, cache served)

**Pulled 2026-05-30. Google query-page-day grain.**

**Google aggregate:** 12 distinct queries, ~55 impressions, **0 clicks**, average position **47-84** (buried pages 5-9). Effectively INVISIBLE on Google.

### Google top queries (full)

| imp | clk | avg pos | CTR | query |
|---:|---:|---:|---:|---|
| 14 | 0 | 78.73 | 0.00% | annual investment allowance |
| 11 | 0 | 67.83 | 0.00% | annual investment allowance calculator |
| 7 | 0 | 82.17 | 0.00% | can you claim capital allowances on investment property |
| 7 | 0 | 57.90 | 0.00% | investment allowance |
| 5 | 0 | 72.33 | 0.00% | capital allowances on investment property in uk |
| 3 | 0 | 76.50 | 0.00% | aia allowance |
| 2 | 0 | 70.00 | 0.00% | annual investment allowance uk |
| 2 | 0 | 47.00 | 0.00% | what is annual investment allowance |
| 1 | 0 | 84.00 | 0.00% | what is the annual investment allowance |
| 1 | 0 | 62.00 | 0.00% | aia limit |
| 1 | 0 | 66.00 | 0.00% | capital allowances annual investment allowance |
| 1 | 0 | 69.00 | 0.00% | investing account investment allowance |

### Bing query_data (latest snapshot) - the proven-demand signal

| imp | clk | avg pos | CTR | query |
|---:|---:|---:|---:|---|
| 13 | 0 | 5.0 | 0.00% | annual investment allowance |
| 2 | 0 | 5.0 | 0.00% | aia company different accounting periods |
| 1 | 0 | 3.0 | 0.00% | aia annual investment allowance |
| 1 | 0 | 5.0 | 0.00% | are there capital allowances on investment property |
| 1 | 0 | 7.0 | 0.00% | how does annual investment allowance work |

### Pattern analysis

- **Google = INVISIBLE.** Every query sits pos 47-84. The page has the right answer shape but no authority/depth/freshness signal to climb. The stale "until 31 March 2026" framing actively suppresses it: it is a wrong-fact page on a fact Google can verify against gov.uk.
- **Bing = proven page-1 demand.** Identical head term "annual investment allowance" ranks pos 3-5 on Bing with real impressions and zero clicks. Per §16.T2/the diagnosis, a near-page-1 cross-engine position is a clear **rewrite-not-collapse** signal: the core answer works; deepen it and lift Google.
- **Intent classes visible in the data:** (a) head-term definitional ("annual investment allowance", "what is annual investment allowance", "aia allowance", "aia limit"); (b) tool intent ("annual investment allowance calculator" - 11 imp, pos 67.83 - we have NO calculator; build a worked-allocation walkthrough + an answer-shaped limit table that satisfies this without a JS tool); (c) property-applied intent ("can you claim capital allowances on investment property", "capital allowances on investment property in uk" - these are the s.35 dwelling-house question, which is the page's single biggest value-add over gov.uk); (d) period-mechanics ("aia company different accounting periods" - Bing - the pro-rating + s.51 group-share question).

### GA4 engagement signal (real data from cache)

- 2 sessions / 2 active users / 1 engaged session in 90 days; engagement rate 0.50; bounce 0.50; **avg duration 0.7s**; 0 conversions.

**Read:** unlike the cgt-rates gold-reference (161s avg - well-read by the few who arrive), this page has essentially no real readership yet (0.7s ≈ bot/bounce). The limiter is upstream: nobody arrives because Google buries it. The rewrite's job is to earn the Google climb (fix the stale fact + build depth + statute spine + answer-shaped tables) so the Bing-proven demand starts converting on Google too. Realistic target: move the head term from pos 70-78 toward page 2-3 and capture the property-applied long tail ("can you claim capital allowances on investment property") where gov.uk does NOT give a property-specific answer.

---

## Gap-mode diagnosis (Stage 1 reasoning, refined with Stage 2 data)

**Primary 1 - STALE_FACTS (load-bearing, must fix first).** The page asserts the £1m cap is temporary and expires 31 March 2026 in FOUR places (frontmatter FAQ #1; body lines 38, 88, 122). This is wrong: F(No.2)A 2023 s.8 made the £1m **permanent** (CAA 2001 s.51A(5), effective chargeable periods beginning on/after 1 April 2023), confirmed live on gov.uk. House position §25.10 explicitly lists "AIA is £1m temporarily" and "AIA cap is £200,000" as do-not-write items. Every "until 31 March 2026 / temporary / plan before the deadline" assertion must be removed and replaced with the permanent-cap framing + the s.51A + F(No.2)A 2023 s.8 citation. A second stale fact: line 77's "40% first-year allowance for plant purchased after 1 January 2026" is **false** - no 40% FYA exists; the FYA menu is the company-only 100% full expensing (s.45S) + 50% special-rate companion + the EV/Freeport carve-outs (§25.5). Delete the 40% claim entirely.

**Primary 2 - INVISIBLE (Google pos 47-84).** The data shows the page never surfaces on Google despite a clean exact-match slug. This is the diagnosis's "buried yet proven on Bing" pattern. The fix is depth + freshness + authority signal, not a meta tweak (the page barely has impressions to convert).

**Structural - CANNIBAL (dominant structural problem).** This slug sits in a ~12-page capital-allowances cluster with ~9 near-duplicate legacy AIA pages all chasing the same head intent. THIS page is the canonical generalist head-term answer (most equity). The distinctness plan (below) keeps this page as the head-term owner, differentiates UP to the Wave 6 pillar + s.51 group page (no duplication of their four-axis framework / s.51 group-allocation depth), and flags the zero/low-equity duplicates for a SEPARATE later collapse brief. This brief does NOT delete or 301 anything - it only documents the collapse direction (weaker → stronger, per §16.T2).

**Secondary - CTR_FAIL.** Bing page-1, 0 clicks. The meta title is generic ("Property Investor Guide") with no differentiator and no "£1m permanent" hook. Once the body earns a Google climb, an answer-led meta ("£1m permanent cap + what property qualifies") gives the page a click reason gov.uk's generic title does not.

**Secondary - THIN_DEPTH + STRUCTURE.** 1,453 words vs 3,400 target; 4 FAQs vs 12-14; dead authority link; broken internal link; zero statute citations. The page is list-led, not worked-example-led. Competitors (gov.uk, ukpropertyaccountants, rossmartin) all run deeper on the property-applied s.35 angle.

**Load-bearing fix sequence (ordered by ROI):**

1. **Strip every STALE fact.** Remove all four "until 31 March 2026 / temporary" assertions; reframe as £1m permanent from 1 April 2023 (F(No.2)A 2023 s.8 → CAA 2001 s.51A(5)). Delete the false 40% FYA. Re-verify and correctly state the EV/Freeport FYA sunset (31 March 2027 CT / 5 April 2027 IT, Treasury-extendable) if mentioned at all.
2. **Build the CAA 2001 statute spine** (see Statute spine section) as inline legislation.gov.uk citations. Replace the dead `aka.hmrc.gov.uk` ref-1 and add s.51A, s.51E/G, s.35, s.21/22/23, s.33A.
3. **Own the property-applied intent gov.uk cannot.** Lead the s.35 dwelling-house restriction prominently (the "can you claim capital allowances on investment property" query, 7 imp, is the page's biggest differentiator). Standard residential BTL = blocked; commercial + HMO common parts (s.35 carve-out) + former-FHL grandfathered pools = the claim base.
4. **Body lift to ~3,400 words** with 3-4 worked numerical examples (commercial fit-out within cap; spend above £1m cap rolling to main pool; short accounting period pro-rating; SPV group sharing one AIA under s.51E).
5. **FAQ 4 → 12-14**, each targeting a verbatim GSC query (head term, "what is annual investment allowance", "aia limit", "can you claim capital allowances on investment property", "aia company different accounting periods", "annual investment allowance calculator" framed as a worked walkthrough).
6. **Forward-link UP** to the Wave 6 pillar (full CAA framework + s.35 dwelling-house rule) and the s.51 group page (HoldCo/SPV sharing) - do NOT duplicate their depth. Fix the broken `/incorporation` link to the real BTL ltd-co guide.
7. **Re-state April 2027 as enacted law** per §7 conflict block (FA 2026, RA 18 March 2026), not as a bare assertion and not hedged-as-Bill.
8. **Meta title + description rewrite** with the £1m-permanent + property-qualifies hook.

---

## Competitor URLs (Stage 2 - VERIFY LIVE at execution per §16.31; not WebFetched at brief time)

| URL | Expected status | What to borrow | What to differentiate against |
|---|---|---|---|
| https://www.gov.uk/capital-allowances/annual-investment-allowance | 200 (verify) | The authoritative £1m-permanent-from-1-April-2023 framing + pro-rating rule + single-allowance-for-commonly-controlled-companies rule. This is the source of truth for the rate; cite + link to it (controlled link-out for users who want gov.uk authority). | gov.uk gives NO property-specific answer (no s.35 dwelling-house treatment, no BTL-vs-commercial split, no SPV group examples). That is our entire differentiator. |
| https://www.ukpropertyaccountants.co.uk/types-of-capital-allowance-for-property-investors/ | 200 (verify) | Property-investor framing + the plant-vs-building distinction applied to real property scenarios. | Likely no permanent-cap precision, no s.51E group worked example, no FA 2025 FHL-abolition transitional. Beat on statute precision + worked examples. |
| https://www.rossmartin.co.uk/property-income/810-capital-expenditure-allowances | 200 (verify; may be paywalled/partial) | Practitioner-grade structure of the capital-expenditure-vs-revenue boundary. | Adviser-facing tone, not consumer-applied; we add the property-investor worked examples + lead-gen CTA. |
| https://www.gov.uk/capital-allowances | 200 (verify) | The overview of the allowance menu (AIA vs WDA vs FYA vs full expensing) for the "other allowances" section. | Same as above - no property application; link as authority, build the property layer ourselves. |

**Competitor depth ceiling for this query class:** the two gov.uk pages are authoritative but generic (no property application, no statute section numbers, no worked examples). The specialist competitors run property-applied but typically without precise CAA section citations or SPV group examples. Our ~3,400 words + 12-14 FAQs + full CAA 2001 statute spine + 3-4 property worked examples + s.35 dwelling-house lead puts the page decisively best-in-class for the property-investor cut of the head term - not catch-up.

---

## Cannibalisation universe check (Stage 2)

**Cannibalisation Index snapshot:** `docs/property/track2_cannib_index_2026-05-23.md` (latest refreshed snapshot at brief time). The diagnosis flagged this cluster as the DOMINANT structural problem (§F-4 trial flag: residual contains 4-way duplicates in the AIA cluster).

| Source | Slug | Category | Equity (diagnosis) | Status | Resolution |
|---|---|---|---|---|---|
| Residual (own) | annual-investment-allowance-uk | Section 24 & Tax Relief | Bing pos 3-7 head term; Google pos 47-84; most cluster equity | **REWRITE** | Self - canonical head-term owner. Rewrite in place; keep slug + category + canonical. |
| Wave 6 (modern, 2026-05-23) | capital-allowances-property-investors-complete-pillar-2026-27-caa-2001-decision-framework | Property Types & Specialist Tax | Modern pillar | PILLAR - link UP | Do NOT duplicate its four-axis CAA decision framework or s.35 dwelling-house deep-dive. Forward-link to it as "the full CAA 2001 framework". Add reciprocal link from pillar at execution (flag, do not edit Wave 6 page in this brief). |
| Wave 6 (modern, 2026-05-23) | aia-1m-cap-property-investors-allocation-strategy-and-association-rules-cta-2010 | Property Types & Specialist Tax | Modern deep group page | DEEP-GROUP - link UP | Owns the s.51 group-allocation + association-rules (HoldCo/SPV sharing) depth. THIS page introduces the single-allowance rule briefly + forward-links there for the deep mechanics. Do NOT reproduce s.51B-N allocation depth. |
| Residual duplicate | annual-investment-allowance-2025 | Landlord Tax Essentials | 1,162w, 0 GSC | COLLAPSE-CANDIDATE (later) | Zero equity. Flag for later 301 INTO this page (weaker → stronger). NOT touched by this brief. |
| Residual duplicate | annual-investment-allowance-2024-25 | Section 24 & Tax Relief | 1,188w, 15 imp pos 42 | COLLAPSE-CANDIDATE (later) | Low equity. Flag for later 301 INTO this page. NOT touched. |
| Residual duplicate | aia-capital-allowances | Property Types & Specialist Tax | 1,442w, 0 GSC | COLLAPSE-CANDIDATE (later) | Zero equity. Flag for later 301 INTO this page. NOT touched. |
| Residual duplicate | what-is-aia-in-tax | Section 24 & Tax Relief | 1,850w, 0 GSC | COLLAPSE-CANDIDATE (later) | Zero equity but exact "what is aia" intent overlap. Flag for later 301 INTO this page. NOT touched. |
| Residual duplicate | aia-capital-allowance-property-landlords | Section 24 & Tax Relief | 1,574w | COLLAPSE-CANDIDATE (later) | Flag for later 301 INTO this page. NOT touched. |
| Residual duplicate | capital-allowance-aia-property-landlords | Property Types & Specialist Tax | 1,456w | COLLAPSE-CANDIDATE (later) | Flag for later 301 INTO this page. NOT touched. |
| Residual (related, NOT collapse) | annual-investment-allowance-landlords-uk | Section 24 & Tax Relief | 1,635w, 32 imp pos 64 | RE-DIAGNOSE separately | Has its own (low) GSC signal; landlord-specific cut. Separate Track 2 diagnosis decides REWRITE-as-applied-sibling vs collapse. Not pre-judged here. |
| Residual (related, NOT collapse) | aia-allowance-uk-property-investors | Property Types & Specialist Tax | 1,678w, 8 imp pos 25 | RE-DIAGNOSE separately | Best-ranked of the duplicates (pos 25). Do NOT collapse blind - its pos-25 equity must be checked by the collapse guard before any 301 (§16.T2 reversed-equity hazard). Separate brief. |
| Residual (related, NOT collapse) | landlord-capital-allowances-tax-relief | Section 24 & Tax Relief | 1,409w | RE-DIAGNOSE separately | Broader "landlord capital allowances" intent, not pure AIA. Separate diagnosis. |

**Conclusion:** REWRITE in place. This page is the deliberate canonical head-term owner. Distinctness achieved by (a) keeping this page focused on "what is AIA, £1m permanent cap, qualifying P&M, how to claim, property-investor application, timing" and (b) forward-linking UP to the Wave 6 pillar (full CAA framework + s.35 dwelling-house deep-dive) and the s.51 group page (SPV/HoldCo association rules) rather than reproducing them. Six zero/low-equity legacy duplicates are flagged COLLAPSE-CANDIDATE (later, separate cluster-collapse brief, weaker → stronger). Three related pages with their own residual signal are flagged RE-DIAGNOSE-SEPARATELY and must NOT be collapsed blind (the collapse guard must run on `aia-allowance-uk-property-investors` pos-25 before any 301, per §16.T2). **No REDIRECT-PROPOSED in this brief. No FLAG-MANAGER beyond the documented collapse-candidate list.**

---

## Closest existing pages (Stage 2 - internal-link partners)

To-and-from links this rewrite should carry (all confirmed live in corpus):

- **Wave 6 pillar (link UP):** `capital-allowances-property-investors-complete-pillar-2026-27-caa-2001-decision-framework` - the master forward-link for "the full CAA 2001 decision framework + s.35 dwelling-house rule". Place in the intro and in the "how AIA fits the wider allowance menu" section.
- **s.51 group page (link UP):** `aia-1m-cap-property-investors-allocation-strategy-and-association-rules-cta-2010` - forward-link from the "single AIA for commonly-controlled companies / SPV groups" section for the deep allocation + association-rules mechanics.
- **Full expensing sibling:** `full-expensing-50-percent-fya-commercial-property-spvs-mechanics-fa-2023` - forward-link from the "other allowances" section (replaces the deleted false-40%-FYA bullet).
- **HMO common-parts s.35 carve-out:** `hmo-common-parts-capital-allowances-s35-claim-mechanics-multi-tenant-property` - forward-link from the s.35 dwelling-house section (the one residential context where plant in common parts qualifies).
- **Commercial property allowances:** `capital-allowances-commercial-property-what-can-claim` - forward-link from the "what qualifies" section.
- **Disposal mechanics:** `balancing-allowance-balancing-charge-on-disposal-property-capital-allowances-mechanics` - forward-link from a new "what happens on disposal" paragraph (claw-back awareness).
- **Second-hand assets:** `can-you-claim-aia-on-second-hand-assets` - forward-link from the "what qualifies" section (full expensing bars second-hand; AIA allows it - a real differentiator FAQ).
- **FHL transitional:** `fhl-capital-allowances-post-april-2025-grandfathered-claims-mechanics` - forward-link from the FHL-mention (the source still says "before abolition in April 2025"; correct it and link to the transitional page).
- **Landlord deductions (kept):** `landlord-tax-deductions-uk-2026-complete-list` - kept.
- **Rental income tax guide (kept):** `rental-income-tax-uk-complete-guide-landlords` - kept (cash-basis section).
- **BTL ltd-co guide (FIX broken link):** the source's `/incorporation` link is broken; repoint to `buy-to-let-limited-company-complete-guide-uk` (real slug) for the company-structure / SPV context.
- **Property investment tax pillar (kept):** `property-investment-tax-uk-complete-guide-2026` - kept (for the April 2027 cross-reference).

---

## House-position references (Stage 1)

- **§25.3 Annual Investment Allowance (CAA 2001 ss.51A-51N)** [LOCKED 2026-05-23] - the primary spine. £1m permanent cap (s.51A(5)); single AIA per company (s.51B); parent/subsidiary single AIA (s.51C); common-control + related single AIA (s.51E); control (s.51F); related-companies test (s.51G shared-premises / similar-activities NACE); allocation (s.51K); cars excluded from AIA; AIA blocked by s.35 for residential dwelling-house plant.
- **§25.1 Qualifying activity (CAA 2001 s.15 + s.270CA)** [LOCKED 2026-05-23] - AIA available only for a qualifying activity (UK/overseas property business, trade); FHL s.15(1)(c)/(da) OMITTED by FA 2025 Sch 5 Part 3 from 1 April 2025 (CT) / 6 April 2025 (IT).
- **§25.2 Plant and machinery + s.35 dwelling-house restriction** [LOCKED 2026-05-23] - s.21 (buildings/List A), s.22 (structures/List B), s.23 (List C carve-back), s.33A (integral features, special rate 6%), and the load-bearing **s.35 dwelling-house exclusion** (plant in a dwelling-house barred; narrow carve-out for common parts of a multi-let building).
- **§25.5 First-Year Allowances** [LOCKED 2026-05-23] - full expensing s.45S is **company-only**, 100% main rate, from 1 April 2023, unused-and-not-second-hand only; 50% special-rate companion; EV/Freeport FYAs sunset 31 March 2027 (CT) / 5 April 2027 (IT). **No 40% FYA exists** - the source's line 77 is invented.
- **§25.8 Recent reforms + verification anchors** [LOCKED 2026-05-23] - AIA permanent £1m via F(No.2)A 2023 s.8; full expensing permanent (no sunset); super-deduction expired 31 March 2023; FHL abolition FA 2025 Sch 5 (NOT FA 2024 Sch 5).
- **§25.10 Do not write** [LOCKED 2026-05-23] - "AIA is £1m temporarily" / "AIA cap is £200,000" / "full expensing available to individual landlords" / "full expensing is temporary, set to expire" / "super-deduction is the current 130% FYA" / "plant in a residential dwelling is claimable under AIA" / "cars are AIA-qualifying" - all banned. The current page violates the "AIA is £1m temporarily" rule four times.
- **§7 April 2027 property income tax** [LOCKED 2026-05-30 - ENACTED] - see conflict block below. FA 2026 (RA 18 March 2026) ss.6-7: property income (England + NI) taxed 22% basic / 42% higher / 47% additional from 6 April 2027; the s.24 reducer rises to 22% (NO new wedge). State as enacted law.
- **§21.5 FIC mechanics (FIC-side AIA availability)** [LOCKED, Wave 4] - where a FIC owns commercial property, AIA is available; a pure-investment FIC owning residential BTL is blocked by s.35. Cross-reference in the SPV/group section.

---

## House-position conflict flag (Stage 2)

**CONFIRMED conflict 1 - STALE_FACTS (the load-bearing rewrite job).** The published page contradicts §25.3 + §25.8 + §25.10 directly: it frames the £1m cap as temporary, expiring 31 March 2026, in four places (frontmatter FAQ #1; body lines 38, 88, 122). §25.10 expressly lists "AIA is £1m temporarily" as do-not-write. The £1m is permanent from 1 April 2023 (F(No.2)A 2023 s.8 → CAA 2001 s.51A(5)), verified live on gov.uk. This is the rewrite's first job: remove every temporary/deadline assertion.

**CONFIRMED conflict 2 - STALE_FACTS (invented relief).** Body line 77 asserts a "40% first-year allowance for plant purchased after 1 January 2026". No such allowance exists (§25.5 FYA menu has no 40% rate). Delete entirely; replace with the company-only full expensing forward-link.

**CONFIRMED conflict 3 - April 2027 rate framing (now ENACTED, the F-37 pattern resolved as enacted).** Body line 89 asserts "From April 2027, separate property income tax rates will apply: 22% basic, 42% higher, 47% additional" as a bare fact. Per §7 [LOCKED 2026-05-30] this is now **correct as enacted law** - FA 2026 (Royal Assent 18 March 2026), ss.6-7, England + NI, from 6 April 2027 - but the page must (a) state it as enacted (cite FA 2026, RA 18 March 2026) not as a bare unsourced assertion, (b) note it applies to England + NI only (Scotland/Wales set their own per FA 2026 s.8 / Sch 2), and (c) correctly explain the AIA interaction: AIA reduces *taxable profit*, so the value of an AIA deduction for an individual landlord tracks the marginal property-income rate from 2027/28; the source's bare assertion needs this nuance. **Re-verify §7 enacted status against legislation.gov.uk at write time per §16.T1/F-37 discipline** (the program's 13-consecutive-catch Bill-vs-enacted rule still applies - confirm Royal Assent before asserting).

**Flag to `track2_site_wide_flags.md`** (Batch 4, next available F-number) as: **HIGH | annual-investment-allowance-uk | STALE_FACTS | Quadruple "£1m temporary until 31 March 2026" assertion (FAQ#1 + lines 38/88/122) contradicts §25.10; permanent per F(No.2)A 2023 s.8. PLUS invented 40% FYA (line 77). PLUS dead aka.hmrc.gov.uk ref-1 + broken /incorporation internal link. April 2027 rate now ENACTED (FA 2026 RA 18 Mar 2026) - state as enacted, England+NI only, re-verify at write time.**

**Cross-cluster note (manager attention, not this brief's job):** the "£1m temporary / expires 2026" stale framing is HIGH-probability site-wide across the ~9 legacy AIA duplicates (they predate or echo the same source). Recommend a §16.43 STALE-sweep across `annual-investment-allowance-2025`, `-2024-25`, `aia-capital-allowances`, `what-is-aia-in-tax`, `aia-capital-allowance-property-landlords`, `capital-allowance-aia-property-landlords` BEFORE the later cluster-collapse brief, so the survivors (if any are kept) are not stale at the moment of 301.

---

## Statute spine (every section with its Act - VERIFY each against legislation.gov.uk at write time)

| Statute citation | What it anchors in the rewrite | Verify status |
|---|---|---|
| CAA 2001 s.51A(5) | The £1,000,000 AIA maximum (verbatim "The maximum allowance is £1,000,000") | Verify live: https://www.legislation.gov.uk/ukpga/2001/2/section/51A |
| Finance (No. 2) Act 2023 s.8 | Made the £1m cap PERMANENT (substituted s.51A(5)), effective chargeable periods on/after 1 April 2023 - the load-bearing correction. **Verify the Act's Royal Assent date** per F-37 discipline. | Verify live (F(No.2)A 2023) |
| CAA 2001 s.51B | Single AIA across a company's qualifying activities | Verify: .../section/51B |
| CAA 2001 s.51C | Parent + subsidiaries share a single AIA | Verify: .../section/51C |
| CAA 2001 s.51E | Companies under common control AND related share a single AIA (the SPV-group trap) | Verify: .../section/51E |
| CAA 2001 s.51F | Definition of "control" | Verify: .../section/51F |
| CAA 2001 s.51G | "Related" test - shared-premises OR similar-activities (NACE first-level, >50% turnover overlap) | Verify: .../section/51G |
| CAA 2001 s.51K | Allocation mechanics within shared-AIA groups | Verify: .../section/51K |
| CAA 2001 s.15 | Qualifying activity gateway (UK/overseas property business, trade); FHL (c)/(da) omitted from 1 Apr / 6 Apr 2025 | Verify: .../section/15 |
| CAA 2001 s.35 | Dwelling-house restriction - plant in a dwelling-house barred from P&M allowances (the property differentiator) | Verify: .../section/35 |
| CAA 2001 s.21 / s.22 / s.23 | Buildings (List A) / structures (List B) excluded; List C carve-back restores plant-like items | Verify: .../section/21, /22, /23 |
| CAA 2001 s.33A | Integral features (electrical, cold water, heating/ventilation, lifts, external solar shading) - special-rate 6%, AIA-eligible | Verify: .../section/33A |
| CAA 2001 s.45S | Full expensing - company-only, 100% main-rate FYA, from 1 April 2023 (the "no cap, but companies only" alternative above the £1m) | Verify: .../section/45S |
| Finance (No. 2) Act 2023 (insertion of s.45S) | Full expensing enacted + made permanent (no sunset) | Verify (F(No.2)A 2023) |
| Finance Act 2021 ss.9-10 | 130% super-deduction - EXPIRED 31 March 2023 (mention only as expired) | Verify (FA 2021) |
| Finance Act 2025 Sch 5 Part 3 | FHL abolition - s.15(1)(c)/(da) omitted, 1 Apr 2025 (CT) / 6 Apr 2025 (IT). NOT FA 2024 Sch 5. | Verify (FA 2025 Sch 5) |
| Finance Act 2026 ss.6-7 (RA 18 March 2026) | April 2027 property income rates 22/42/47 (England + NI), s.24 reducer to 22%. State as enacted; re-verify RA at write time. | Verify (FA 2026 c.11) |

**Authority/cross-reference URLs (link in body, verify 200 at execution):**
- https://www.gov.uk/capital-allowances/annual-investment-allowance (live, correct - keep as ref-2; this is the user-facing authority cross-link)
- https://www.gov.uk/capital-allowances (allowance-menu overview)
- https://www.legislation.gov.uk/ukpga/2001/2/section/51A (AIA maximum, primary statutory cite)
- **REMOVE** the dead `http://aka.hmrc.gov.uk/capital-allowances/fya/water.htm` (ref-1) entirely - abolished water-FYA on a legacy redirect domain.
- icaew.com capital-allowances page (ref-3) - keep if still 200; verify at execution.

---

## Competitor depth benchmark (Stage 2)

| Dimension | gov.uk AIA page | Specialist competitors (ukpropertyaccountants / rossmartin) | THIS rewrite target |
|---|---|---|---|
| Word count | ~600-900 (generic) | ~1,200-2,000 | ~3,400 |
| Property application (s.35) | None | Partial | Lead section - the core differentiator |
| Statute section numbers | None | Sparse | Full CAA 2001 spine (15+ cites) |
| Worked examples | 1 (pro-rating) | 0-1 | 3-4 (within-cap fit-out; above-cap roll to main pool; short-period pro-rating; s.51E SPV-group share) |
| SPV / group allocation | Single-allowance rule stated, no example | Rare | Worked example + forward-link to s.51 group page |
| FAQs | 0 | 0-3 | 12-14, each on a verbatim GSC query |
| Permanent-cap precision | Yes (£1m from 1 Apr 2023) | Often stale | Yes + statutory citation (the correction the legacy page failed) |

**Decisive-best-in-class, not catch-up:** no competitor combines the authoritative permanent-cap precision + a full CAA statute spine + property-applied s.35 lead + SPV-group worked example + 12-14 query-matched FAQs in one page.

---

## metaTitle / metaDescription / h1 plan

- **metaTitle (test 2-3, ≤ 62 chars; lead with the £1m-permanent + property hook):**
  - "Annual Investment Allowance UK 2026/27: £1m Permanent Cap" (56)
  - "Annual Investment Allowance: £1m Cap for Property Investors" (58)
  - "AIA UK: £1m Permanent Cap + What Property Qualifies" (51)
  (Avoid the generic current "Property Investor Guide"; lead with the permanent £1m - the corrected fact - as the differentiator vs gov.uk's generic title.)
- **metaDescription (≤ 158 chars; named differentiator + property-applied hook + no pricing):**
  - "The Annual Investment Allowance gives a permanent £1m write-off on qualifying plant and machinery. What property qualifies, the s.35 trap, and how to claim." (157)
  (Drop the current "key dates" promise - there is no expiry date. Lead with "permanent £1m" + the s.35 property angle.)
- **h1:** "Annual Investment Allowance UK: A Property Investor's Guide to the £1m Permanent Cap" - keeps the exact head-term phrase ("annual investment allowance uk") at the front (matches the top Google + Bing query) while signalling the corrected permanent-cap fact and the property cut.

---

## Universal rules (do not skip)

(Inherited - see TRACK2_PROGRAM §4 section 13 pointer block.) **Critical for this brief:** NO em-dashes anywhere (use commas, parentheses, full stops, middle dots). NO pricing / fees (the Manchester worked example may keep tax-saving arithmetic since that is a relief calculation, NOT a fee quote - but no "we charge / typical accountant fee" language). NO real client names; anonymised social proof only (e.g., "a Manchester commercial-unit investor"). LeadForm auto-injected by `BlogPostRenderer.tsx` - never duplicate; 1-3 inline `<aside>` CTAs at conversion moments only. Body is raw HTML (`<p>`, `<h2>`), never markdown `##`. FAQs in frontmatter `faqs:` array only; FAQPage schema auto-emitted; never hand-add FAQ schema in body. NO Tailwind utility classes in markdown body.

---

## 19-step workflow (legacy-rewrite adaptation - inherits NETNEW §7 with Track 2 deltas)

1. Read `house_positions.md` §25.1-§25.10 + §25.8 + §7 + §21.5 in full at session start.
2. Claim this brief in `track2_page_tracker.md` (mark 🟡 stage2_drafting / execution).
3. Read this brief end-to-end.
4. **Verify the statute spine against legislation.gov.uk** - every CAA 2001 section + F(No.2)A 2023 s.8 + the FA 2026 Royal Assent date (§16.T1 deterministic-floor; F-37 Bill-vs-enacted discipline). This is the load-bearing pre-rewrite step.
5. Re-fetch the 4 competitor URLs + the 3 authority URLs; reject non-200; replace the dead `aka.hmrc.gov.uk` link.
6. Read the current `annual-investment-allowance-uk.md` source in full.
7. Read the Wave 6 pillar + s.51 group page (to differentiate UP, not duplicate) + the 4-5 sibling CA pages listed in Closest existing pages.
8. Plan outline: 12-14 H2s, ~3,400 body words, 12-14 FAQs, 3-4 worked examples, rates/limit table near top.
9. **Rewrite markdown at existing path** (NOT new file). Keep slug + canonical + category + image. Update `dateModified` to write date + `sourcesVerifiedAt`. Update `sourceDomains` (remove `aka.hmrc.gov.uk`; add `legislation.gov.uk`). Rewrite metaTitle + metaDescription + h1 per the plan above. Fix the `/incorporation` link to `buy-to-let-limited-company-complete-guide-uk`.
10. Run site build: `cd Property/web && npm run build`. Must pass.
11. Six checks: FAQ schema count = frontmatter `faqs:` length; em-dash count = 0; Tailwind class count = 0; meta title ≤ 62; meta description ≤ 158; all internal links resolve (especially the fixed `/incorporation`). Plus: `grep "31 March 2026"` returns 0 in the body; `grep "40%"` returns 0 false-FYA matches; `grep "aka.hmrc"` returns 0.
12. Confirm no redirect needed for THIS page (none - slug kept). Document the six collapse-candidate duplicates in the discovery log for a SEPARATE later collapse brief (do NOT 301 them here; do NOT collapse `aia-allowance-uk-property-investors` pos-25 without the collapse guard per §16.T2).
13. Update / insert `monitored_pages` Supabase row: 180-day window from write date (INVISIBLE-baseline page per F-11 - Google pos 47-84 reads artificially low; needs the longer window).
14. Commit on `main`: `git commit -m "Track 2A: rewrite annual-investment-allowance-uk (STALE £1m-permanent fix + CANNIBAL head-term ownership + depth lift)"`.
15. Update `track2_page_tracker.md`: mark ✅ executed.
16. Update `track2_site_wide_flags.md` with the STALE_FACTS flag + the cluster STALE-sweep recommendation.
17. Update `TRACK2_PROGRAM.md` §3 heartbeat.
18. Log discoveries (the six collapse-candidates + the cross-cluster STALE-sweep) for inter-batch awareness.
19. Next page in batch (or end batch).

---

## Per-page work-log (for execution session - empty template)

### House-position alignment
- §25.3 AIA £1m permanent (s.51A(5) + F(No.2)A 2023 s.8): __
- §25.2 / s.35 dwelling-house restriction surfaced: __
- §25.5 full expensing company-only (s.45S); NO 40% FYA: __
- §25.1 / FHL transitional (FA 2025 Sch 5, not FA 2024): __
- §7 April 2027 - enacted status re-verified at write: __ (FA 2026 RA 18 Mar 2026, England+NI)
- §25.10 do-not-write scan (no "temporary" / "£200k" / "cars qualify" / "individual full expensing"): __

### Comparison: before vs after
- Word count: 1,453 → __
- H2 count: 12 → __
- FAQ count: 4 → __
- Authority links: 3 (1 dead) → __ (target 4-5, all 200, with legislation.gov.uk)
- Statute citations: 0 → __ (target 15+)
- Worked examples: 1 → __ (target 3-4)
- Inline CTAs: 0 → __ (target 1-2)
- Broken internal links: 1 (`/incorporation`) → 0
- Stale "31 March 2026" assertions: 4 → 0
- False "40% FYA" assertions: 1 → 0

### Visibility-lift hypothesis test
- Pre-rewrite GSC baseline: head term "annual investment allowance" pos 78.73, 0 clicks (Google); Bing pos 5.0 proven demand.
- Post-rewrite target: Google head term toward page 2-3; capture property-applied long tail ("can you claim capital allowances on investment property"); first non-zero Google clicks. Verify at +30 / +60 / +90 / +180 days via monitored_pages detector (180-day window for INVISIBLE baseline).

### Flags raised
- STALE_FACTS (carried from brief): __ resolved
- Cluster STALE-sweep recommendation logged: __
- Six collapse-candidate duplicates logged (no 301 in this pass): __
- Any new flags: __

### 2-3 sentence summary
- (populated at execution time)
