# Estate Comprehensive Audit — 2026-07-17

Fresh GSC + Bing pulls for all 7 older sites (property, dentists, solicitors, medical, generalist, agency, construction-cis) plus an infrastructure/blind-spot audit. All read-only; time-segmented around intervention dates. GSC data through ~07-15 (2-day lag); Bing is trailing-aggregate only (no pre/post segmentation possible).

## 1. Headline per site

| Site | Verdict | Key number |
|---|---|---|
| Property | **Strongest period ever.** Interventions collectively working. | Clicks ~11/day → ~32/day; record 17-lead week w/c 07-13 |
| Solicitors | Strong growth inflection, but commercial pages don't rank. | Impressions 20x in 10 weeks; homepage pos ~51, money queries 0 clicks |
| Dentists | Healthy maturation; blocked by undeployed backlog. | Impressions 3x/90d; 18 committed pages NOT deployed |
| Generalist | Bing is the site; Google converts nothing. | Bing 25-40 clicks/day vs Google ~1.5/day on 19k impr |
| Agency | Fix wave (07-08) directionally working, too early. | Impressions +43% post-fix; 5 never-crawled pages now impressed |
| Medical | Fix wave (07-06) PARTIALLY working. | New posts index in days; legacy core pages still "unknown to Google" (~11/117 indexed vs 15-20 target) |
| Construction-CIS | Healthy young site. | 143/208 pages impressed at ~1 month; ~30 → ~280 impr/day |

## 2. Intervention statuses

- **Property multistep lead forms (07-09): WORKING (early).** Leads 1.46/day → 2.4/day. Day-28 confirm ~08-06. Day-3 email verdict flagged a 343% error-rate ACTION — confirm it was actioned; day-7 PASS may mask a validation fault.
- **SERP meta batch 2 (07-08, 41 pages / property+dentists+solicitors): WORKING / positive-lean.** Property sitewide CTR 0.70%→0.94% at similar position. Dentists winners (goodwill CTR 0.9%→1.8%). Solicitors pattern = impressions up, clicks flat (position is binding constraint). Formal 28d readout ~08-05; hold those pages until then.
- **Property A/B winners locked (06-30): WORKING.** Click step-change begins exactly w/c 06-29.
- **Gap-discovery pages:** Property 11 live and impressing (leeds 309 impr), 0 clicks yet — normal at day ~7. Dentists 5 / solicitors 9 / generalist 12: written+committed, NOT deployed.
- **GEN-R1 (06-12): impressions POSITIVE (2x lift), clicks NULL.** Confounded with same-day meta batch 1.
- **Agency fix wave (07-08): too early but right signature** — impression breadth up, new pages entering at deep positions (crawl-budget fix working as designed). Checkpoint 07-22: expect impressions holding >50/day.
- **Medical fix wave (07-06): split verdict.** Sitemap lever delivered (re-downloaded 07-09, 97→117 submitted, 0 errors); all 5 new posts "Submitted and indexed" (real crawl-behaviour change); Bing compounding (706→945 impr trailing). BUT every legacy core page (/services, /about, /for-gps, /nhs-pension…) still "URL is unknown to Google". MED-F2 Request Indexing (owner GSC-UI action) shows zero visible effect — **confirm with owner it was actually done** before 07-20. If core pages still unknown at 28d (08-03), the "authority wall" branch triggers (faceless off-site authority path).

## 3. The undeployed-backlog problem (cross-site pattern)

Finished, QA'd, committed content invisible to Google — one `vercel deploy --prod` per site behind:

- **Dentists: 18 pages** (Wave 5 ×16 incl. the 5 gap pages, gap-fill W1/W2 ×2, plus NIC/AMAP back-patches). Pre-deploy edit needed: `/dental-guides/practice-profit-extraction-partnership-vs-ltd` still shows £9,100 ×4 live (structured-data risk).
- **Solicitors: 9 pages** (Wave 3 gap-discovery, committed 07-09, absent from live sitemap).
- **Generalist: 12 gap pages** (also pending image backfill).
- **Medical:** /research routes 404 live; gap-fill pillar 301s to an old post.
- Memory notes claiming "wave 1 uncommitted" for solicitors/medical/dentists are STALE — everything is committed; only deploys pending (owner-G1 gate).

## 4. Stale tax figures still LIVE

- **Generalist: 61 occurrences of 13.8%/£9,100 across 22 live files** — including the P11D page, the site's top Bing landing cluster (~3,400 impr). The 07-05 remediation did not cover NIC. Highest-priority manager-direct sweep.
- **Dentists:** profit-extraction guide £9,100 ×4 (2 other pages already fixed).
- **Solicitors:** AMAP 45p on ~5 live files (locum-expenses etc.); BADR/dividend/NIC clean.
- **Generalist:** badr-after-leaving-role still 14% BADR.
- Agency NIC clean (re-confirmed).

## 5. Top optimisation opportunities (per site, data-backed)

**Property — run the full query-extraction pass NOW** (clean baseline post-07-08/09; hold gap pages + meta-batch-2 pages):
1. CGT-rates cluster cannibalisation: 3 pages splitting ~7 queries at pos 2-6 with 0 clicks — biggest single fix.
2. CGT deadline-page split (390+286 impr, winner pos 11-12).
3. SDLT-incorporation connected-party query: 505 impr, pos 8.6, 0 clicks, rising.
4. May traffic engine decayed to ~0 (cgt-rates 4,074 impr → 0; sdlt-btl 1,246 → 0) — refresh/re-target.
5. www vs non-www duplicate indexing (ties to known 307-redirect defect).
6. "stamp duty scotland" pos 1.0, 64 impr, 0 clicks — pure snippet failure.
7. LBTT non-residential gap (270+ impr, pos 7.5-8.7, no dedicated page).

**Dentists — deploy first, full run ~08-05:** head family ("accountants for dentists" etc., ~3,600 impr, 0 clicks, homepage pos ~50) is the whole commercial prize — consolidation is data-gated, needs owner approval. CTR fix: software-integration page pos ~10, 0 clicks. Goodwill legacy/canonical cannibalisation.

**Solicitors — core-page engine run:** homepage pos 51 / services pos 60 on ~1,100 impr of head terms; "accountant for lawyers" pos 18.7 striking distance. Conveyancing-fee blog vs fee page cannibalisation. AMAP fix.

**Generalist order:** (1) NIC sweep 22 files, (2) deploy 12 gap pages, (3) construction-accounting-software cluster expansion (~1,800 impr pos 20-32, flagged 07-08, still unactioned), (4) CGT-reporting-2026 push, (5) P11D/Bing cluster play (Bing is the only revenue channel). GEN-R2 (16 rewrites unlocked 06-26) never happened — fork not taken.

**Agency — NOTHING until window closes (07-22/08-05):** then AIA-2024/25 title refresh (614 impr, stale tax-year title), pr-agencies rewrite (554 impr pos 32), Dubai cluster links, mine the 127 Bing page-1 queries as Google FAQ targets (zero query overlap between engines — Bing serves long-tail Google won't).

**Construction-CIS:** page-2→1 pushes (what-construction-work-is-not-cis 653 impr pos 8.5, xero/quickbooks-cis, cis-payroll-software); "accountant for roofers" 214 impr pos ~16 with no target page — /for/roofers candidate.

## 6. What is INVISIBLE to the owner's regular "what needs optimising" queries

Ranked blind spots (verified live):
1. **monitored_pages regression detection fully OFF** since workflows disabled 07-13 — 923 pages nominally watched, none checked since 07-09. A tanked rewrite would be invisible.
2. **Medical (07-20) + agency (07-22) watch verdicts NOT automated** — deploy_watch contains only `miniform_multistep`; the two active experiments would silently pass their gates (violates self-driving-follow-ups rule).
3. **Stored Supabase snapshots are 11-13 days stale and unevenly so** (gsc_page_performance 07-06, ga4 07-04, some sites 07-12/14) — cross-site comparisons from stored data actively misleading. Any session reasoning from them without fresh pulls is wrong.
4. **7 expansion sites: zero GSC/Bing rows ever** — cannot distinguish indexing success from failure in the critical post-launch window. **startups-tech has zero web_events ever** (beacon broken or site-key mismatch).
5. **lead-capture-tripwire.yml never landed on main** — the 6-hourly lead-path guard has never run; the failure class it guards (corrupted env in bundle, 06-24) is unguarded.
6. **GA4 covers 4 of 15 sites**; generalist (highest events, 55k) has none. Bing never pulled for contractors-ir35. construction-cis has no GA4 and only 15/57+ pages in monitored_pages.
7. gsc_config.py `enabled: False` for medical/solicitors — stale flags; `get_enabled_niches()` silently skips them (data access itself works fine).
8. 6 presence-audit code defects still unfixed (og-placeholder.svg confirmed still referenced on 4 sites).
9. site_daily_snapshots dead since 05-21.

Restore-visibility quick wins (not implemented): re-enable Weekly Optimisation Engine workflow (one move restores GSC/Bing/monitored_pages); merge tripwire to main; insert deploy_watch rows for medical/agency/meta-batch keys (mailer cron already runs daily); first GSC/Bing verification+pull for 7 expansion sites; debug startups-tech beacon; flip stale enabled flags.

## 7. Memory corrections established this audit

- Medical domain is **medicalaccounts.co.uk** (memory said medicalaccountantsuk.co.uk).
- Dentists/solicitors/medical "wave 1 uncommitted" notes stale — all committed, deploys pending.
- Solicitors gap-discovery: 9 written+committed pages ≠ the 11 pending (un-written) topics in blog_topics.
- Medical Waves 1+2 (27 posts) deployed 06-03 (fa8400ab).

## 8. Recommended sequencing

1. **Now, no gates:** generalist NIC sweep (22 files) + dentists £9,100 fix + solicitors AMAP fix (manager-direct, factual).
2. **On owner deploy word:** dentists (18), solicitors (9), generalist (12+images), medical /research — clears the whole backlog.
3. **Now:** Property full query-extraction optimisation run (hold watched pages). Solicitors core-page engine run.
4. **Before 07-20:** owner confirms/redoes medical Request Indexing on core pages. Wire deploy_watch rows for medical/agency/meta-batch verdicts.
5. **Restore monitoring:** re-enable weekly workflow, merge tripwire, expansion-site GSC/Bing first pull, startups-tech beacon debug.
6. **Hold:** agency untouched until 07-22; dentists full run ~08-05 post-deploy.
