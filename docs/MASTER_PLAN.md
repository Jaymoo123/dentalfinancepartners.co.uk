# Master plan — Accounting network content strategy

**Last updated:** 2026-05-21
**Owner:** Jeff (jeff@emplifex.com) + Claude Opus 4.7 (orchestrator session)

This is the single source of truth for what's been done, what's parked, and what runs next. Other docs in this repo are referenced from here; do not treat any other file as authoritative.

---

## 1. The network at a glance

Six UK niche-accounting sites (lead-gen handoffs to partner firms; anonymised social proof only, no real client names):

| Site key | Brand | Domain | Posts | GSC visibility |
|---|---|---|---|---|
| `property` | Property Tax Partners | propertytaxpartners.co.uk | 285 | strong (93 pages with GSC data) |
| `dentists` | Dental Finance Partners | dentalfinancepartners.co.uk | ~150 | medium |
| `medical` | Medical Accountants UK | medicalaccounts.co.uk | 46 | thin (4 pages) |
| `solicitors` | Accounts For Lawyers | accountsforlawyers.co.uk | ~150 | medium |
| `agency` | Agency Founder Finance | agencyfounderfinance.co.uk | small | very thin |
| `generalist` | Holloway Davies | hollowaydavies.co.uk | 322 | seed-only |

Plus `contractors-ir35` scaffolded but not launched.

---

## 2. What we did this session (2026-05-21)

### 2.1 Property — multi-session priority rewrite + cleanup pass (DONE, DEPLOYED)

**Priority queue:** 63 pages from `competitor_gap_reports` ranked by `priority_score`.

**Pre-work (session 0):** 17 pages rewritten as reference examples (Peterborough is the gold standard).

**Today's parallel pass:** 3 sessions (A/B/C) tackled the remaining priority queue:
- Session A: 13 effective rewrites + 3 skips (files deleted in earlier consolidation)
- Session B: 13 effective rewrites + 2 skips
- Session C: 14 effective rewrites + 2 skips
- **Total: 54 rewrites + 9 skips across the 63-page priority queue.**

**Cleanup sweeps that landed on top of the rewrites:**
- £10,000 MTD threshold → current £50k / £30k / £20k schedule (~140 file edits)
- Multiple Dwellings Relief abolition fix (1 June 2024) on `sdlt-transfer-property-company-cost.md`
- 22%/42%/47% April 2027 framing aligned to **house position** ("announced in Autumn Budget, scheduled, pending Finance Act 2026 / Royal Assent")
- April-2026 future-tense MTD references reframed as live/past
- PropertyBee references verified absent
- 4 cannibalisation redirects added in `Property/web/src/middleware.ts`:
  - `hmo-licensing-costs-tax-deductible` → fees
  - `property-accounting-software-uk` → 2026 version
  - `landlord-accounting-software-uk-2026` → best-options
  - `2027-property-tax-rates-cgt-capital-gains-changes` → cgt-property-2027-rate-changes
- Obsolete `mtd-10000-threshold-when-does-it-apply` slug retired + redirected

**Monitoring infrastructure:**
- New Supabase table `monitored_pages` (57 rows: 52 rewrites + 5 redirects, 90-day window)
- New detector `detect_monitored_page_regression` in `optimisation_engine/analysis/detectors.py`, wired into the weekly run. 14-day grace, then flags ≥50% click drop or ≥5 position drop on rewrites and ≥1 click leakage on retired slugs.
- Auto-expires past `monitor_until`. Flagged rows stamped so they don't refire weekly.

**Deploy:** Production at https://www.propertytaxpartners.co.uk (deployment URL `property-tax-partners-dz6hzogeh-sitenudge-projects.vercel.app`). Property's Vercel deploy is quirky (rootDirectory=`Property/web`, install needs `cd ../..` for the workspace root); documented in memory.

### 2.2 Medical scaffold (BUILT, PARKED)

We started prepping Medical for the same 3-session pattern. Stopped before launch because:
- Only 4 of 46 medical pages have any GSC data (site is too new for organic signal)
- Pivoting to a thinner niche (Agency / Solicitors) wouldn't help — same problem
- Better play: deepen Property where data + competitive set both exist

**Built and parked (not deleted):**
- 3 git worktrees at `../Accounting-wt-medical-{a,b,c}/` on branches `medical-rewrite-{a,b,c}`
- 46 per-page briefs at `briefs/medical/<slug>.md` (thin scaffold; each lists source path, GSC queries, 3 competitor URLs, cannibalisation context, universal rules, workflow)
- House positions doc at `docs/medical/house_positions.md` (IR35, NHS Pension AA, MTD for ITSA applicability to medics, GP partner vs salaried vs locum, McCloud, partnership goodwill)
- Session START_HERE docs at `docs/sessions/medical/SESSION_{A,B,C}_START_HERE.md`
- Master tracker at `docs/medical/page_rewrite_tracker.md`
- Append-only flags at `docs/medical/site_wide_flags.md`
- Medical added to `brief_for_opus.SITE_RULES` in `optimisation_engine/competitor/brief_for_opus.py`
- Pre-flight: `.prose-blog aside` CSS rule added to `Medical/web/src/app/globals.css`; FAQ schema fallback verified; lead-form role segments verified; baseline `npm run build` clean

**To unpark:** the GSC bottleneck doesn't go away by waiting, but if we ever decide Medical is worth the rewrite effort despite thin GSC, the scaffold is ready. Launch by opening 3 fresh Opus sessions and pointing each at its START_HERE doc.

### 2.3 Property Track 1 — competitor topic gap analysis (DONE)

The decision was: instead of pivoting to Medical, double down on Property and become the comprehensive #1 resource. Track 1 is "what topics do top competitors cover that we don't?".

**Pipeline:**
1. Pulled top 10 specialist property-accountant competitor domains from `competitor_serps` appearances (ukpropertyaccountants, uklandlordtax, landlordstax, alexander-ene, propertyaccountant + 10 more).
2. Fetched competitor sitemaps (`scripts/property_topic_gap_finder.py`) — 5 of the top 10 returned usable sitemaps (1846 + 800 + 624 + 266 + 16 + ...).
3. First-cut filter: dropped news / firm-admin / calculators / loose-match-covered (`scripts/property_topic_gap_filter.py`). 682 evergreen gap candidates remaining across 35 themes.
4. **Manager reclassification of the 'Other' bucket** (`scripts/property_other_reclassify.py`) — Opus 4.7 read all 346 entries and assigned to existing or new buckets, or discarded as noise. 114 reclassified, 228 noise, 4 still other. 19 new buckets created (FICs, Let Property Campaign, Serviced accommodation / OTAs, Land Remediation Relief, SBA, Double Taxation Agreements, Build to Rent, SIPP/SSAS, Shared ownership, Companies House reforms / ECCTA, Joint ownership / Form 17, Leaving the UK / expat, Penalties / HMRC nudges, Accidental landlords, Second homes / council tax premium, Planning permission / change of use, Lease extensions / variation, Pre-letting expenses, Capital vs revenue / repair vs improvement).
5. **Cannibalisation check** (`scripts/property_cannibalisation_check.py`) — for each remaining gap, compared against all 285 current Property pages (slug + title + h1 + metaTitle tokens). Threshold 0.55 = covered, 0.30 = partial, <0.30 = net-new.
6. **Redirected-slug overlap report** (`scripts/property_redirect_overlap_check.py`) — for each net-new proposal, flagged any of the 429 middleware redirects with token overlap ≥ 0.30. 24 hits worth repointing when the new pages launch.

**Output:**
- `docs/property/topic_gaps_final.md` — final ranked gap list (53 buckets, 429 net-new + 21 partial overlap)
- `docs/property/topic_gaps_other_resolved.md` — audit trail for the 'Other' reclassification
- `docs/property/topic_gaps_redirect_overlap.md` — repoint-the-redirect-on-launch hits
- `docs/property/topic_gaps_first_cut.md` — intermediate (kept for reference)

**Top 10 buckets by net-new opportunity:**

| Bucket | Net-new pages |
|---|---|
| SDLT — surcharges and reliefs | 54 |
| Limited company / BTL operation | 27 |
| VAT for landlords | 25 |
| Family Investment Companies (FICs) | 25 |
| IHT and estate planning | 20 |
| ATED | 20 |
| Property accountant — cities/regions | 19 |
| Double Taxation Agreements (DTAs) | 14 |
| Leaving the UK / expat landlord | 14 |
| SDLT — Scottish (LBTT/ADS) / Welsh (LTT) | 12 |

**Known limitations of the cannibalisation check:**
- Token-level only — doesn't read body content. Body-level cannibalisation needs a session-level second pass at brief stage.
- Threshold tuning is imperfect — at least 1 partial-overlap miss confirmed in spot-check (FIC complete guide scored 0.29 vs our existing FIC page; classifier needed 0.30 to flag as partial).
- ~5% miss rate expected — sessions doing the rewrite should naturally catch these during their brief verification.

---

## 3. What runs next (tomorrow morning)

### 3.1 Track 2 — mechanical sweep on 234 untouched Property pages (BACKGROUND)

The 54 priority rewrites covered ~63 of 285 Property pages. The other 234 weren't touched and almost certainly carry the same errors (£10k MTD, 3% SDLT, MDR, em-dashes, LTA £1.073m references, April 2026 future tense, PropertyBee). Same regex sweep that worked this morning, plus a build verification.

Owner: Claude (manager session, no need for parallel sessions).
ETA: ~30–60 minutes wall time including the build.
Risk: low; sweep is well-tested.

### 3.2 Track 1 execution — write the net-new pages (PARALLEL SESSIONS)

Take the 429 net-new proposals from `docs/property/topic_gaps_final.md` and write them with 3 parallel Opus sessions. Recommended split for tomorrow's first batch (10-15 pages per session):

- **Session A:** SDLT depth — surcharge refund claims, six-dwellings election, partnership incorporation route, sub-sale relief, leaving-the-UK SDLT consequences, ATED-specific SDLT interactions (~12 pages)
- **Session B:** Limited company / BTL operation — director loans, group relief, dividend extraction routes, retained profits strategy, FIC complete guide (the partial-overlap one — expand existing rather than write new), corporation-tax marginal relief mechanics (~12 pages)
- **Session C:** Specialist reliefs the network is missing — Land Remediation Relief (LRR), Structures & Buildings Allowance (SBA), CIL & Section 106, Let Property Campaign + voluntary disclosure, GROB / IHT reservation of benefit (~12 pages)

**Worktree setup needed:** the existing `Accounting-wt-medical-{a,b,c}/` worktrees should be repurposed (or new property worktrees created — `Accounting-wt-property-track1-{a,b,c}` on `property-track1-{a,b,c}` branches). Recommendation: create new property worktrees rather than reuse the medical ones, so the medical scaffold stays clean.

**Pre-launch checklist for each Track 1 session:**
1. Worktree exists on its own branch from `main`
2. House positions doc for Property (NEEDS WRITING — see open question 4.1)
3. Session START_HERE doc generated with assigned 10-15 pages
4. Each page in their list has a brief in `briefs/property/topic_gap_<slug>.md` (NEEDS GENERATING — adapt `medical_brief_runner.py`)

### 3.3 Monitoring (PASSIVE)

The `detect_monitored_page_regression` detector starts firing meaningful results from ~2026-06-04 (14-day grace after rewrites). Manual recheck point: 2026-06-18. No action needed before then.

---

## 4. Open questions / not-yet-decided

1. **Property house positions doc.** Property doesn't have a locked house positions doc yet — we relied on session-by-session reasoning today, which is what caused the 22/42/47% inter-session disagreement. Before launching Track 1, write `docs/property/house_positions.md` covering: SDLT bands and surcharges post-1-April-2025, MDR abolition, ATED bands, 5% surcharge mechanics, MTD-for-ITSA threshold + applicability, S24 (mortgage interest restriction), CGT 18%/24% rates and 60-day reporting, FHL abolition transition, 2027 income tax surcharge framing.
2. **Repoint redirects on launch.** Track 1 will write pages on topics where 24 redirected old slugs token-overlap. Manager decision on each (which redirect should point at the new page vs. stay on the broader keeper) needs to happen at launch time, not at brief-generation time. Process: as each new page goes live, run `scripts/property_redirect_overlap_check.py` to find its overlap, then update `Property/web/src/middleware.ts`.
3. **Track 1 brief generator.** The `medical_brief_runner.py` works for Medical's existing pages (it reads `Medical/web/content/blog/*.md`). Track 1 is different: net-new pages that don't exist yet. Need a new brief generator that:
   - takes a proposed slug + competitor URLs from `docs/property/topic_gaps_final.md`
   - produces a brief that lists the competitor URLs + cannibalisation context + house positions + workflow
   - tells the session: "this page doesn't exist yet — create the markdown from scratch, decide the slug + frontmatter, set up redirects on launch if there's a redirect overlap, then build + verify"
4. **Categorisation of new pages.** Each new page needs a `category:` for the URL nesting (`/blog/[category]/[slug]`). Currently the categories are: capital-gains-tax, incorporation-and-company-structures, landlord-tax-essentials, making-tax-digital-mtd, non-resident-landlord-tax, portfolio-management, property-accountant-services, property-types-and-specialist-tax, section-24-and-tax-relief. Some new pages (LRR, SBA, DTAs, FICs) don't fit cleanly — may need new categories or careful re-mapping.

---

## 5. State of the world (where everything lives)

### Repo layout

```
Accounting/
├── docs/
│   ├── MASTER_PLAN.md                   ← this file
│   ├── competitor_rewrite_playbook.md   ← system-wide playbook (Property → other niches)
│   ├── AGENTS_DIRECTORY_AUDIT.md
│   ├── MULTI_SITE_INFRASTRUCTURE.md
│   ├── property/
│   │   ├── page_rewrite_tracker.md          ← 63-page priority queue, completed
│   │   ├── site_wide_flags.md               ← append-only flags from sessions
│   │   ├── rewrite_progress_2026-05-21.md
│   │   ├── topic_gaps_first_cut.md          ← intermediate, kept for ref
│   │   ├── topic_gaps_final.md              ← FINAL net-new list, 429 pages
│   │   ├── topic_gaps_other_resolved.md     ← 'Other' reclassification audit
│   │   ├── topic_gaps_redirect_overlap.md   ← 24 repoint-on-launch hits
│   │   └── house_positions.md               ← TO WRITE before Track 1 launch
│   ├── medical/
│   │   ├── house_positions.md               ← locked (parked)
│   │   ├── page_rewrite_tracker.md          ← parked
│   │   └── site_wide_flags.md               ← parked
│   └── sessions/
│       ├── property/{SESSION_A,B,C}_START_HERE.md
│       └── medical/{SESSION_A,B,C}_START_HERE.md
├── briefs/
│   ├── property/
│   │   ├── _competitor_urls.json            ← raw sitemap scrape (gitignored)
│   │   ├── _other_bucket.txt                ← intermediate
│   │   ├── _other_resolved.json             ← classified (gitignored)
│   │   └── _redirect_overlap.json           ← redirect-overlap report data (gitignored)
│   └── medical/
│       └── <46 slug>.md                     ← per-page thin scaffolds (parked)
├── scripts/
│   ├── populate_monitored_pages.py
│   ├── property_topic_gap_finder.py
│   ├── property_topic_gap_filter.py
│   ├── property_other_reclassify.py
│   ├── property_cannibalisation_check.py
│   ├── property_redirect_overlap_check.py
│   └── _dump_other_bucket.py
├── optimisation_engine/
│   ├── analysis/detectors.py                ← incl. detect_monitored_page_regression
│   ├── competitor/
│   │   ├── brief_for_opus.py                ← SITE_RULES (property + medical)
│   │   ├── medical_brief_runner.py          ← thin-brief generator
│   │   ├── deep_extract.py                  ← optional structured HTML extractor (sessions can call)
│   │   ├── serp_runner.py
│   │   ├── _fetch.py                        ← robots-respecting fetcher
│   │   └── _db.py                           ← Supabase Management API helper
│   └── ingestion/
│       ├── ingest_gsc_queries.py
│       └── ingest_gsc_pages.py
├── Property/ ... Medical/ ... etc.          ← per-site Next.js apps
└── ../Accounting-wt-medical-{a,b,c}/        ← parked medical worktrees
```

### Supabase tables of note

| Table | Purpose |
|---|---|
| `sites` | Source of truth for site registry (site_key, gsc_property_url, etc) |
| `gsc_query_data` | Query-level GSC data per page per day |
| `gsc_page_performance` | Page-level GSC data per day |
| `ga4_page_data` | GA4 engagement / conversion data |
| `competitor_serps` | One row per (site_key, query, fetch_date) |
| `competitor_pages` | One row per competitor URL per SERP |
| `page_content_map` | Extracted text-level signals |
| `competitor_gap_reports` | Per-page gap analysis + improvement brief |
| `monitored_pages` | Today's 52 rewrites + 5 redirects, 90-day window |
| `optimisation_opportunities` | Detector outputs queued for review/apply |

### Memory entries (auto-memory) of note

- `vercel_cli_deploy_workflow.md` — Property's quirky deploy path documented
- `monitored_pages_system.md` — table + detector exists
- `competitor_analysis_workflow.md` — DeepSeek for analysis, Opus for verification + writing (system as built; the Medical pivot dropped DeepSeek from the brief generator, sessions now reason end-to-end on real HTML)
- `feedback_no_em_dashes.md` — universal rule
- `agency_lead_gen_model.md` — all 5 sites are lead-gen handoffs, anonymised social proof only
- `feedback_infrastructure_first.md` — user prefers engine/infra work over outreach

---

## 6. Tomorrow's open-loop summary (read this first when you resume)

1. **Track 2** — mechanical sweep on 234 untouched Property pages. Runs in background, fast.
2. **Write Property house positions doc** — needed before Track 1 sessions launch.
3. **Adapt brief generator for net-new pages** (Track 1 needs a different brief shape than Medical's "rewrite existing").
4. **Spin up 3 Property Track 1 worktrees + sessions** — recommended split: SDLT depth / Limited company depth / Specialist reliefs.
5. **Monitor Property's monitored_pages detector** — first meaningful firing window from 2026-06-04, manual recheck 2026-06-18.
6. **Medical stays parked** until / unless we decide to invest the rewrite effort despite thin GSC. Scaffold is intact.

---

*If you're a fresh Claude session opening this file: read sections 1, 2, 3, and 5 first. Then check `docs/property/topic_gaps_final.md` and `docs/property/house_positions.md` (or write the latter if it doesn't yet exist). Then check current `git status` and `git log -5` for any work in progress before starting.*
