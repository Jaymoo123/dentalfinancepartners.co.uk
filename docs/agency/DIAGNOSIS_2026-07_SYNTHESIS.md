# Agency Founder Finance — SEO / Indexing / Lead Diagnosis (Owner Report)

Site: www.agencyfounderfinance.co.uk (site_key `agency`, a trading name of Ashfield Trading Ltd, co. 16358723). Author: P4 integrator (Opus), incorporating 5 adversarial skeptic reviews. Date: 2026-07-08.

**Status: FINAL for owner review. Standalone readable version of the ledger `docs/agency/DIAGNOSIS_2026-07.md`. Nothing is fixed yet. Locked: (1) the program STOPS at this synthesis until you have read it; (2) every deploy and every GSC-UI action is per-action owner sign-off; (3) one-variable fix sequencing — the discovery/quality batch ships alone so its signal stays clean.**

Data caveats (read once): GSC data exists 2026-05-17 to 2026-07-06 (51 days; the site earned zero Google impressions before mid-May, a genuine young-domain start, not a tracking gap). Bing (BWT) snapshots 2026-06-12 and 2026-07-08. First-party web_sessions run ~5 weeks; the human-session count is disputed between two filters (39 script vs 107 DB) and BOTH are small — every rate below 20 in the denominator is flagged. Live Google SERP credits (Serper) exhausted; positions read from GSC weighted averages. GA4 not configured. `bing_ai_performance` is empty estate-wide (a method-name bug, see AGY-F13).

---

## 1. The headline

The site is not penalised and it is not undiscovered. It is being **triaged down**.

Google has indexed 18 of 433 pages (4.2%). But unlike medical (where 92% of pages were *unknown* — never queued), agency's fingerprint is different and worse-diagnosing: **214 pages (49%) are "Discovered — currently not indexed"**. Google has these URLs in its queue (the sitemap works, discovery happened) and is *actively declining to crawl or index them*. A further 175 (40%) are still unknown, 26 (6%) were crawled and then rejected. Zero noindex, zero robots blocks, zero fetch failures, zero phantom-canonical contamination. The homepage is indexed (last crawl 2026-06-17), so Google is alive on the domain.

So this is **not a discovery mechanics problem** (the sitemap is processed, 60% of URLs are known to Google) and **not a suppression problem**. It is a **crawl-budget + content-quality triage problem on a weak-authority young domain**: Google has looked, decided most of the estate is not worth spending crawl budget on, and in ~22 cases indexed a page and then withdrew it.

**This is the single most important distinction from medical, and it changes the playbook.** Medical's cure was mechanical (force re-discovery: sitemap resubmit + IndexNow + Request Indexing) because the URLs were simply not queued. Agency's URLs *are* queued and Google is choosing to skip them. Forcing re-fetch alone will not fix a page Google has already decided is low priority; it buys you a re-crawl, and if the page is thin or generic, the crawl ends in the crawled-not-indexed bucket. The medical fixes that transfer are only the ones that *increase per-page and per-domain crawl-worthiness* (sitemap-lastmod hygiene, SSR crawl paths, schema authority, PageRank consolidation, faceless off-site authority). The medical fix that does **not** transfer as a primary lever is "resubmit the sitemap and it will index" — here that is necessary hygiene, not the cure.

---

## 2. Why (root cause, ranked)

### 1. Weak-authority young domain → crawl-budget triage — PRIMARY (strong)
The whole-site signature (60% of URLs known, only 44 ever fetched, 214 discovered-then-skipped, homepage indexed but almost nothing it points to) is textbook crawl-budget rationing. The benchmark seals it: the **generalist** sibling, same age (both live ~April 2026), earned 10x the impressions, 13x the pages-with-impressions and 26x the clicks over the identical calendar window, and was *accelerating* (1,126 → 4,658/week) while agency flatlined at 186–243/week after a one-off first-crawl spike. Same age, same infra, same estate — so this is not youth. Google is rationing crawl budget to this domain specifically because its external authority signals are near zero. Per owner rule, any authority-building must be **faceless** (data-PR, tools, benchmark assets, citations, GEO), never named-expert PR. This is the slow root and it sets the ceiling.

### 2. Content-quality triage on already-crawled pages — PRIMARY-ADJACENT (moderate-strong, actionable)
26 pages are crawled-not-indexed and ~22 of the 40 pages that once had GSC impressions have been **deindexed** (indexed then withdrawn). That withdrawal is Google's active quality judgement, not budget starvation — it reached these pages and declined them. Bing corroborates the quality read from a different angle: agency's Bing content ranks at position 4–8 but on **generic tax-mechanics queries** (AIA on second-hand assets, VAT on client entertaining, capital allowances on vans) where it competes head-to-head with hmrc.gov.uk and AccountingWeb with no differentiated angle. 120 of 124 Bing queries are generic; only 4 are agency-niche. **The corpus reads like generalist tax advice wearing an agency label.** That is precisely the profile Google's quality triage deprioritises. This is the lever most under our control.

### 3. Crawl-path + PageRank leaks make the budget go further than it should — CONTRIBUTING, ACTIONABLE (moderate)
Four technical defects each waste the scarce crawl budget:
- **Blog index is JS-only (AG-T-001):** /blog server-renders 12 category/nav links and **zero of 306 post links**. Googlebot's first pass sees no path to the posts. Identical to the medical defect.
- **Sitemap lastmod churn (AG-T-002):** 118 URLs stamp `new Date()` at build time, so every deploy tells Google 118 pages "changed". Google is documented to distrust churning sitemaps and discount them for scheduling — actively counterproductive on a budget-starved domain.
- **Apex 307 not 308 (AG-T-004):** the apex→www redirect is Temporary, leaking PageRank instead of consolidating it — the opposite of what a low-authority domain needs.
- **Organization schema has no `sameAs` (AG-T-003):** no Companies House / LinkedIn link, so no entity-authority signal to the knowledge graph.

### 4. Topic leakage wastes what little visibility exists (moderate, ranking not indexing)
"cis accountant" (138 impressions, pos 70) is Construction Industry Scheme — wrong sector entirely, bleeding from the /glossary/cis page or the construction-cis sibling. "pr agency for accountants" (143 impr) is the *reverse* intent (PR firms hiring accountants). The site's own head cluster "accountants for pr agencies" sits at pos 28 with zero clicks. So even the impressions it earns are substantially mis-targeted.

### 5. Internal-link structure is a weak secondary lever, not the cause (weak — see §3b)
163/439 routes (37%) are editorial orphans (glossary 100%, founder-stories 100%, guides 100%, locations 100%, calculators 7/8, 11/20 agency verticals). But B3's contingency test found **no orphan→unknown correlation** — the unknown set actually has a *lower* orphan rate (32.6%) than the known set (41.1%). Linking is not the blocker. It matters only as a tie-breaker for the 57 orphan+unknown pages that have no recovery path except the sitemap.

---

## 3. Tensions reconciled (the four the brief flagged)

**(a) Which medical fixes transfer.** TRANSFER: sitemap-lastmod pin (AGY-F2/AG-T-002), blog-index SSR (AGY-F1/AG-T-001), apex 308 (AGY-F4), faceless off-site authority (AGY-F11), the "content is gated behind index recovery" sequencing rule, and the converting-surface guardrail. DO NOT TRANSFER as a *cure*: "resubmit sitemap + Request Indexing → it indexes." Here that is hygiene that earns a re-crawl; whether the re-crawl sticks depends on per-page quality (root cause #2), which medical did not have. NEW to agency, no medical analogue: the content-quality-strengthening response (§AGY-F8) and the topic-leakage fix.

**(b) 37% orphans (B7) vs no orphan/index correlation (B3) — what role does linking play?** Almost none as a *lever on indexing*. B3's contingency table is decisive: linked pages are no more likely to be indexed than orphans; 67% of unknown pages are already linked. The binding constraint is upstream (crawl budget), so pouring links onto unknown pages does not move them. Linking earns exactly one narrow job: giving the **57 orphan+unknown** pages a second recovery path besides the sitemap, and consolidating PageRank into the handful of pages we *want* crawled. It is a batch-3 hardening step, never a headline fix.

**(c) Funnel "dies at conversion" (B5) with growing traffic vs near-zero search clicks — where is the human traffic from, and does it change priorities?** Reconciled: the two search channels agree the site earns ~2 Google clicks/51d and ~1 Bing click. The 107 (or 39) human sessions are **mostly not from ranked search** — 78% are direct/unknown, only 4 Google + 12 Bing + 3 ChatGPT identified. **50% of ALL human traffic lands on ONE post — capital-allowances-on-vans (54 sessions)** — a generic SME tax topic that is not agency-founder content and has no CTA path to the form. So the "growing traffic" is a single generic post pulling low-intent readers, plus direct/AI trickle, not the commercial funnel warming up. It does NOT change priorities: indexing/quality repair stays first. It adds one cheap parallel win (a CTA on the high-traffic post) and confirms the GEO/AI surface is worth protecting.

**(d) Does the ~22-page indexed-then-deindexed cohort support a content-quality signal, and what falsifies it?** It supports it moderately: deindexing-after-crawl is Google's post-crawl quality/relevance rejection, distinct from never-crawled budget starvation, and it aligns with the Bing "ranks but only on generic queries" read. **What would falsify it:** if those ~22 pages recover to indexed *purely* from the sitemap-hygiene + SSR + authority batch with **zero content change**, quality was not the operative cause (budget/scheduling was). If they stay deindexed until content is strengthened, quality is confirmed. This is a clean testable fork — see §7.

## 3b. The lead paradox (answered)

Zero leads ever (source='agency'). The funnel dies at **conversion**, but the denominator is tiny and the traffic is mis-shaped, so "conversion defect" is only half the truth. The form itself is **clean** (honeypot is `enquiry_ref`, NOT Property's buggy `company_url`; consent gate present; email notify + partner CC wired correctly and will fire on the first real lead). The real story: the form is invisible to ~91% of arrivals because they land on informational blog posts (one generic vans post = 50% of traffic) with no conversion prompt, and the homepage (which has the form) gets ~9% of traffic. 3 ChatGPT sessions with high engagement (21–47 events) are the most promising signal. Priority: index/quality repair first; then a CTA on the high-traffic post and GEO protection. **We do not chase conversion optimisation on a 107-session base — it is under the trust floor.**

---

## 4. Fix backlog (nothing ships without your sign-off)

Class key: site-code, content, engine-code, gsc-ui [OWNER], deploy [OWNER], spend [OWNER], read-only.

| id | title | root cause | severity | effort | class | one-variable batch |
|---|---|---|---|---|---|---|
| **AGY-F1** | Blog index SSR: render first 12 posts as static `<a>` links above `BlogListWithSearch` (AG-T-001) | 3 | HIGH | S | site-code + deploy [OWNER] | **Batch A (crawl/quality)** |
| **AGY-F2** | Pin sitemap `lastModified` to stable dates; stop `new Date()` churn on 118 URLs (AG-T-002); also use `updatedDate` for blog (AG-T-006) | 3 | HIGH | S | site-code + deploy [OWNER] | **Batch A** |
| **AGY-F3** | Add Organization `sameAs` (Companies House 16358723 + LinkedIn) (AG-T-003) | 3 | HIGH | S | site-code + deploy [OWNER] | **Batch A** |
| **AGY-F4** | Apex 307→308 permanent in Vercel settings (AG-T-004) | 3 | HIGH | S | deploy [OWNER] (Vercel config, no code) | **Batch A** |
| **AGY-F5** | GSC sitemap resubmit + Request Indexing on ~10 priority pages (homepage-linked verticals, /services, /r-and-d-credits, /agencies/pr-agencies, /blog hub, 2 recent posts) | 1,3 | HIGH | S | gsc-ui [OWNER] | **Batch A** (ship AFTER F1–F4 deploy so the re-crawl sees the fixed pages) |
| **AGY-F6** | Fix topic leakage: audit /glossary/cis + any CIS content; noindex or re-scope off-brand construction pages bleeding "cis accountant" | 4 | MED | S | site-code + content + deploy [OWNER] | **ship alone** (own signal: CIS impressions drop) |
| **AGY-F7** | Cross-link the 57 orphan+unknown pages + /for-* + relocation hubs + calculators from relevant blog bodies; consolidate PageRank | 5 | MED | M | content + site-code + deploy [OWNER] | **Batch C (hardening)** — AFTER Batch A signal window |
| **AGY-F8** | Content-quality strengthening on the ~22 deindexed + 26 crawled-not-indexed cohort: differentiate from generic tax advice with agency-specific substance; gold-standard bar, no thin/near-dup | 2 | HIGH | L | content + deploy [OWNER] | **Batch B (quality)** — the deindexed cohort is the falsification test; ship as its own tranche, own signal |
| **AGY-F9** | Stale-figure sweep: ~45 posts employer NIC 13.8%/£9,100→**15%/£5,000 (Apr 2025)**; 2 pages BADR 10%→**14% now / 18% Apr 2026**; `remittance-basis-dubai` FIG flag | 2 | MED | M | content + deploy [OWNER] | fold into Batch B (factual half of quality strengthening) |
| **AGY-F10** | Van-post CTA: add agency-specific inline CTA / mini-form to capital-allowances-on-vans (50% of human traffic, no CTA) | 3b | MED | S | site-code + deploy [OWNER] | **ship alone** (own signal: form_start on that post) |
| **AGY-F11** | Faceless off-site authority: data-PR / benchmark assets (agency-gross-margin-benchmarks archetype) / citations / GEO — raise domain crawl-worthiness | 1 | HIGH | L | content + owner | **standing, parallel** (slow lever, no signal-window conflict) |
| **AGY-F12** | Protect converting surface (freeze homepage form + /contact CTAs); guardrail, no deploy | 3b | MED | S | guardrail (read-only) | standing guardrail |
| **AGY-F13** | Fix `bing_ai_performance` ingest: `GetAiPerformance` 404s estate-wide — try `GetCopilotStats` / correct BWT method name in `bing_query_client.py` | infra | LOW | S | engine-code | independent lane |
| **AGY-F14** | llms.txt header rate claim "2025/26"→acknowledge FA2026 2026/27 figures (AG-T-008); llms-full.txt track in source (AG-T-007); og:image fallback on 19 agency + 8 calc pages (AG-T-005) | 3 | LOW | S | site-code + deploy [OWNER] | fold into Batch C |
| **AGY-F15** | Serper credit top-up (only unblocks live Google SERP probes; diagnosis stands without it) | diag | LOW | S | spend [OWNER] | optional, off critical path |
| **AGY-F16** | Deferred content wave (B6 OPP-1..5): PR-vertical strengthen, AIA calculator, exit/BADR monitor, MTD-Xero, UAE corp tax — **GATED behind proven index recovery** | opp | LOW (gated) | L | content + deploy [OWNER] | **GATE** — do not start until Batch A/B move indexed count |

### Sequencing (one-variable discipline)
- **Batch A — crawl/quality hygiene (ship together, one shared signal = indexed/discovered count from a coverage re-sweep):** AGY-F1 + F2 + F3 + F4, then F5 *after* those deploy so the forced re-crawl inspects the fixed pages. All four raise crawl-worthiness without touching page content, so the indexed-count signal stays clean. Keep content changes OUT of this window.
- **Batch B — content quality (own tranche, own signal):** AGY-F8 + F9 on the deindexed/crawled-not-indexed cohort. This is the **falsification test** for root cause #2 — ship it separately from Batch A so we can tell budget-fix from quality-fix.
- **Batch C — hardening, AFTER Batch A signal reads:** AGY-F7 (linking) + F14. Never inside the Batch A measurement window.
- **Ship alone:** AGY-F6 (topic leakage, own CIS signal), AGY-F10 (van-post CTA, own form_start signal).
- **Standing/parallel:** AGY-F11 (off-site authority, slow), AGY-F12 (guardrail), AGY-F13 (engine bug, no site impact).
- **Gated:** AGY-F16 content wave. **Optional:** AGY-F15.

---

## 5. Adversarial verification record (5 skeptics — done in §6)

Two verdicts materially changed the story; three held. Corrections applied above.

| Skeptic | Verdict | What changed |
|---|---|---|
| S1 quality-not-discovery vs young-domain lag | **HOLDS (with correction)** | The generalist same-age benchmark (10x, accelerating vs flat) rules out "normal lag"; but the 214 alone can't prove *quality* vs pure *budget* — so quality is now stated as a **falsifiable fork** (§3d, §7), not asserted. |
| S2 internal-linking not the lever | **HOLDS** | B3 contingency is clean (inverse correlation, family effects don't rescue it — see §6). Linking demoted to Batch C tie-breaker only. |
| S3 funnel dies at conversion | **DOWNGRADE** | 107 (disputed vs 39) sessions is under the trust floor; reframed from "conversion defect" to "traffic is mis-shaped + form invisible to 91%"; no conversion optimisation until denominator grows. |
| S4 fix ordering contaminates the signal | **SUSTAINED → fixed** | Split content (Batch B) out of the crawl-hygiene window (Batch A) so budget-fix and quality-fix are separable; F5 sequenced after F1–F4 deploy. |
| S5 completeness — unmeasured killers | **SUSTAINED → new checks** | No lane checked Vercel firewall/Googlebot bot-block, GSC manual-actions panel, or GSC Sitemaps-API fetch status. Added as owner pre-batch verification (§6). |

---

## 6. Skeptic corrections (the adversarial pass, in full)

**S1 — "Could the 214 discovered-not-indexed just be normal young-domain lag?"**
Attack: young domains routinely sit in discovered-not-indexed for weeks; 12 weeks old, maybe it just needs time. Evidence against: the generalist sibling is the *same age on the same infrastructure* and earned 10x impressions, 13x pages-with-impressions, on an *accelerating* curve, while agency went flat immediately after its one first-crawl spike. Equal-age, same-estate benchmark is the strongest available control and it removes "youth" as the explanation. **Verdict: SUSTAINED that this is not mere lag.** Correction applied: I cannot from this data separate "budget starvation" from "quality rejection" for the 214 (only the ~22 *deindexed* pages are unambiguous quality signals). So the synthesis now frames quality as a **testable fork** (does the cohort recover from Batch A alone, or only after Batch B?) rather than an assertion. The primary root cause is stated as budget-triage; quality is the actionable adjacent cause proven only for the deindexed cohort.

**S2 — "Is the orphan/index contingency confounded (family effects)?"**
Attack: maybe orphan status is confounded — e.g. glossary is 100% orphaned AND happens to be low-priority for other reasons, so the aggregate inverse correlation is a Simpson's-paradox artifact hiding a real within-family linking effect. Check: even granting that, the direction is wrong for the linking hypothesis (unknowns are *less* orphaned than knowns), and 67% of unknown pages already have ≥1 editorial inlink — so links are demonstrably not sufficient for indexing regardless of family mix. The mechanism (crawl budget upstream) is family-independent. A within-family effect, if any, would be second-order. **Verdict: HOLDS.** Linking stays a Batch C tie-breaker for the 57 orphan+unknown pages only. (Honest limit: we did not run a stratified per-family test; flagged as a cheap future check, not story-changing.)

**S3 — "Is 107 sessions enough to claim the funnel dies at conversion?"**
Attack: two filters disagree (39 vs 107), and even 107 sessions with a ~9% homepage share means maybe ~10 homepage sessions — far under 20. Claiming a *conversion defect* on that base is a denominator error. **Verdict: SUSTAINED.** Correction: reframed from "conversion is the broken stage" to "traffic is mis-shaped (one generic post = 50%) and the form is structurally invisible to 91% of arrivals" — a routing/surface fact, not a rate claim. Explicitly barred conversion-rate optimisation until the denominator clears the trust floor. AGY-F10 (van-post CTA) is framed as a cheap structural fix with its own binary signal (does any form_start fire), not a CRO play.

**S4 — "Does anything in the backlog contaminate the discovery/quality signal window?"**
Attack: if content strengthening (F8/F9) or link injection (F7) ship inside the same window as the crawl-hygiene batch, and indexed count moves, you can't tell whether hygiene, links or content did it — destroying the very fork S1 demands. **Verdict: SUSTAINED — reordered.** Batch A (F1–F5) is content-frozen crawl hygiene only. Batch B (F8/F9, content) ships as a separate tranche so its indexed-count delta is attributable to quality. Batch C (linking) waits until after Batch A reads. F5 (Request Indexing) sequenced *after* F1–F4 deploy so the re-crawl inspects fixed pages.

**S5 — "What did NO lane measure that could invalidate the whole story?"**
Attack: the story assumes Google *can* reach the pages and is *choosing* not to index. Nobody verified: (a) **Vercel Firewall / bot management is not silently challenging or rate-limiting Googlebot** (the DDG probe WAS bot-blocked by anomaly.js — is Googlebot hitting a similar wall on deeper paths?); (b) **GSC Manual Actions / Security Issues panel is clean** (no lane opened it); (c) **GSC Sitemaps API last-fetch status** — B3 explicitly did not call `webmasters.sitemaps.list`, so "the sitemap works" is inferred from 60%-known, not confirmed fetched-OK; (d) no **regression check for a noindex header** on deeper templates (B4 confirmed no noindex only on sampled page types, not the 214). Any of these would rewrite the root cause from "quality/budget triage" to "we are accidentally blocking Google." **Verdict: SUSTAINED.** Correction: added an **owner pre-Batch-A verification gate** — before shipping anything, confirm in GSC UI: Manual Actions = none, Sitemaps panel shows a recent successful fetch, and URL-inspect one discovered-not-indexed page for its live crawl-block reason; and confirm Vercel Firewall has no rule matching Googlebot user-agents/ASNs. If any fails, the diagnosis changes and Batch A is deferred.

---

## 7. How we will know if this is right

**Baselines:** indexed 18/433; GSC ~32 impressions/day, 2 clicks in 51d; Bing 150 impr / 1 click / 18 pages; leads 0 all-time; ~107 (disputed 39) human sessions, 0 form_submit ever.

- **14d (if right):** after Batch A deploy + F5, sitemap shows a fresh successful fetch; the ~10 Request-Indexed pages move toward crawled/indexed; discovered-not-indexed starts converting; indexed count 18 → ~30+. Leads too small to move (expect 0). CIS impressions falling if F6 shipped.
- **28d:** coverage re-sweep shows indexed count 40–80+; discovered-not-indexed mass shrinking; impressions/day past 32 toward 60+; first Google clicks plausible on long-tail. Batch B tranche read begins on the ~22 deindexed cohort.
- **56d:** indexed count a clear majority-progress (100+); Google clicks establishing; head commercial terms likely still deep (authority-gated, expected). AGY-F11 off-site authority beginning to lift crawl cadence.

**What would prove the root-cause theory RIGHT:** Batch A (crawl hygiene, no content change) converts a meaningful slice of the 214 discovered-not-indexed into indexed within 28d → confirms budget/scheduling was the primary block and the hygiene fixes were the right levers. AND the ~22 deindexed cohort recovers *only* after Batch B content strengthening → confirms the quality-triage second cause.

**What would prove it WRONG (falsification):**
- Batch A ships, sitemap re-fetches clean, pages re-crawled, yet indexed count stays ≤25 at 28d → the block is deeper (authority wall or an S5 hidden block), not crawl mechanics; escalate to AGY-F11 authority + re-open S5 checks.
- The ~22 deindexed pages recover from Batch A *alone* with zero content change → the quality-triage theory (#2) is falsified; deindexing was budget/scheduling churn.
- Bing keeps climbing while Google flatlines through 56d despite every lever → a Google-specific trust problem only faceless off-site authority can move.
- If Batch B content lifts Google clicks while indexed count stays flat → falsifies "content is gated behind indexing" and the sequencing rule.

---

*Evidence pointers: `docs/agency/{google_read,bing_read,index_coverage,technical_sweep,lead_read,opportunity_read,inlink_read}.md`. Raw artifacts in `.cache/agency_diag/`. Ledger of record: `docs/agency/DIAGNOSIS_2026-07.md`.*
