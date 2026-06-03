# Dentists — program state (living heartbeat)

The single living state doc for the Dentists site (Dental Finance Partners). The
methodology lives in the shared engines (`docs/_engines/NETNEW_PROGRAM.md`,
`REWRITE_PROGRAM.md`, `ENGINE_MAP_AND_ONBOARDING.md`); this doc holds only the
site-specific WHAT and the heartbeat. Ground-truth facts live in
`docs/dentists/house_positions.md`, never here.

Last updated: 2026-06-03.

## Site facts
- Brand: Dental Finance Partners · domain `www.dentalfinancepartners.co.uk`
- Vercel: project `prj_f3tGDR4zozATcYOSLMmCqO2ZInNV` (org `team_XF9WAygZX7SGk9Fo4tOAnihH`), project.json at `Dentists/web/.vercel/project.json`
- GA4: `G-273RJY0LZQ` · IndexNow key `0d90ff23794225ef49bd56fdaad369f1`
- GSC property: `sc-domain:dentalfinancepartners.co.uk` (canonical; see Onboarding below)
- Audience: UK dental practice owners and associate dentists
- Existing corpus: 150 blog posts (~12 categories), 6 dental-guides, `/for-{associates,principals,practice-buyers,locum-dentists}`, `/free-practice-health-check`, `/calculators`, `/locations/{london,manchester}`

## Onboarding status (engine-readiness) — 2026-06-03

**Done**
- GSC property canonicalised to `sc-domain:dentalfinancepartners.co.uk` (was a URL-prefix property; the old `dentistaccountants.co.uk` in the code map was dead). Fixed `sites.gsc_property_url` + `gsc_page_client._SITE_URL_MAP`. Re-ingested 90d: 1086 rows / 136 queries / 3342 impressions / 2 clicks.
- `sites/dentists.json` wave-runner config created + validated (all paths resolve; buildDir + Vercel project.json exist).
- Cannibalisation checker generalised: `scripts/wave_cannibalisation_check.py` (site-neutral entry) + `check-cannib.ps1` generic fallback. Already `--site`-driven.
- Link-resolution floor parameterised for `--site` and tested on dentists (baseline: 0 HARD 404s, 0 SOFT): `scripts/track2_link_audit.py`, `scripts/predeploy_gate.py`, `scripts/deploy-and-index.ps1` (pre-deploy gate now runs for any site, not property-only).
- All wave PS scripts confirmed `-Site` parameterised (`slice-megawave`, `scaffold-wave`, `dispatch-stage`, `prepare-wave`, `launch-wave`, `close-wave`, `rolling-orchestrator`, `megawave-autopilot`).

**Done (cont.)**
- `docs/dentists/house_positions.md` authored: 10 sections + 6 sub-sections, 18 primary sources, lock-dated 2026-06-03. Caught + corrected drift in the existing guides: dividend rises 8.75→10.75% / 33.75→35.75% (FA 2026 c.11 s.4, from 6 Apr 2026), VAT threshold £90k (corpus had £85k/£90k mix), goodwill 6.5% relief qualifying-IP + 6× cap (CTA 2009 Ch 15A). One `VERIFY` flag: §3 NHS clawback ~96% threshold (frame as "materially below target" until confirmed).

**In progress**
- Discovery engine: `scripts/topic_gap_finder.py` / `topic_gap_filter.py` generalised + `sites/dentists.discovery.json` (competitors SERP-derived; + architecture/tools + sitemap-lastmod harvest). Producing `docs/dentists/topic_gaps_first_cut.md`.

**Deferred / not on the net-new critical path**
- Bing: 0 rows ingested for dentists. Needed for the rewrite ROI worklist later, not for net-new (which feeds off competitor crawls). Set up Bing Webmaster + ingest before running the rewrite engine here.
- Formal `/run-netnew-wave <site> <wave>` conductor command: codify after the proving wave from real experience. Driving Wave 1 manually as conductor for now.
- `SITE_RULES[dentists]` (competitor/brief_for_opus.py) + `CORE_PAGES[dentists]` (corepage/config.py): add when first running the rewrite / core-page engines for dentists.

## Known content debt
- 181 lines across the legacy 150 posts contain em-dashes (U+2014). Non-blocking warning today; sweep before enabling `predeploy_gate.py --strict`. New wave pages enforce 0 em-dashes via the six-check floor.
- 3 legacy posts carry hourly-rate mentions (lead-gen sites carry no pricing) — review opportunistically.
- Blog category frontmatter has minor case/spacing variance ("Associate Tax" vs "Associate tax"); cosmetic only — `slugifyCategory` lowercases so routes still resolve (link audit clean).

## Signal read (why net-new first)
Dentists is indexed and earning impressions for its head family ("accountants for dentists" 658 impr, "dental accountants" 655 impr, "specialist dental accountants" 416 impr) but ranks at positions ~49-78 (page 4-7) with ~2 clicks in 90d. Own-site organic is too thin for the rewrite/core-page engines to bite yet; net-new (which derives its gap pool from competitor crawls + cannibal-checks against the 150 indexed posts) is the right lead engine to build the topical depth needed to climb. The captured head-keyword family also seeds the core-page engine later.

## Net-new program heartbeat
- Wave 1 (proving wave): 9 pages WRITTEN + VERIFIED 2026-06-03, awaiting user deploy approval. Build GREEN (208/208 static pages, the 9 new ones generated), repo-wide link floor 0 HARD 404, six-check floor passed (0 new em-dashes). Buckets: A practice-sale/exit (3), B incorporation post-FA-2026 (3), C extraction mechanics (3). HP extended at the gate (§4.A disposal-timing, §5.A s455, §5 employer-cost, §2.B carry-forward, §2.C principal hedge). Not yet committed or deployed.
- Pages live (net-new): 0 (9 pending deploy).
- Pipeline PROVEN end-to-end for dentists: GSC fix → discovery (440 pool) → picks + cannib GREEN → 3-bucket briefs → conductor HP-lock gate → 9 pages → six-check + link floor + green build. Ready to scale to full ~30-page waves after deploy.
- Wave 2 (15 pages, CLUSTER-BY-CLUSTER): VAT §6 (5), capital allowances §7 (5), NHS pension §2 (5). Written + verified (link floor 0 HARD 404, build green), parked uncommitted. Each cluster gated one HP area; gates extended/corrected house_positions: §6.A-C + Item 2A, §7 WDA 18→14% correction + §7.A-E, §2.C provider refinement + §2.D Scheme Pays + §2.E retirement. house_positions surfaced + fixed its own stale 18% WDA at the §7 gate.
- TOTAL net-new written (uncommitted, pending deploy): Wave 1 (9) + Wave 2 (15) = 24 dentist pages. Plus a parallel rewrite batch de-staling existing pages (FA-2026 rate-currency + legacy em-dashes, 181→139). Single committer (manager) at deploy.
- DEPLOY CADENCE (user decision, this session): HOLD — do NOT deploy in batches; let waves accumulate for one larger deploy later. WATCH the Vercel ISR `blog.fallback` ~19 MB size limit as the corpus grows past ~200 pages (fix: dynamicParams=false + BYPASS env var, per Property); apply before the eventual deploy.
- SCALING (user directive): drive net-new toward WAVE 15 (multi-session). Model: one CONDUCTOR SUB-AGENT per wave that COMPOSES its picks from the prior wave's farm + cannib-checks GREEN, then runs cluster-by-cluster (self-gating + source-verifying against the mature house_positions). NOTE: spawned sub-agents have NO Agent tool (cannot nest) — the conductor does brief+page writing itself. Manager reviews each report compactly + relaunches the next wave.
- WAVE 3 COMPLETE (15 pages, verified): clusters locum/foundation (§1/§8), NHS contract/UDA (§3), practice finance (§5). 39 net-new total (W1 9 + W2 15 + W3 15), all uncommitted. Gate-locked §1.B (DFT £42,408 from 1 Apr 2025), §11 (SRT FA2013 Sch45), §3.A (UDA 96% clawback + 4% carry-forward), §5.B (finance-cost deductibility + CIR £2m). RESOLVED 2 hedges: §3 96% clawback, §2.C NPE=43.9% of TCV (NHSBSA KA-02063). >> MANAGER RE-VERIFY AT DEPLOY REVIEW: the 43.9% NPE figure (conductor resolved a deliberate hedge) + spot-check Wave-3 gate locks.
- Rewrite hit-list additions from W3: dental-foundation-training-pay-scales (£42,408), nhs-dental-contract-clawback-explained + managing-uda-shortfall (96%/4%), nhs-pension-pensionable-pay + incorporated-principal (43.9% NPE).
- WAVE 4 COMPLETE + VERIFIED (2026-06-04; recovered cleanly after a session-limit interrupt then a rate-limit interrupt — the conductors finished the work before each error, only the tracker rows were left stale). Clusters: ownership transitions/financing (locks §12, §12.A), mobility/residence (locks §11.A temp-non-residence, §11.B FIG-from-6-Apr-2025, §11.C DTT tie-breaker), staff/systems (locks §13 payroll/auto-enrolment, §13.A trivial benefits). Link floor 0 HARD 404, build exit 0.
- CONFIRMED net-new on disk (verified, uncommitted): W1 (9) + W2 (15) + W3 (15) + W4 (15) = 54 pages.
- >> RESUME at WAVE 5: one self-composing conductor seeded by the W4 farm (the wave4 tracker discovery log + prior reports), cannib GREEN, cluster-by-cluster, holding deploys.
- RATE-LIMIT NOTE: server-side throttling appears under heavy CONCURRENCY (multiple long conductors + the rewrite + solicitors + medical agents at once). Mitigate: run fewer simultaneous long-runners / space waves out. Recovery-from-interrupt is proven (assess on-disk state via globs + predeploy_gate + build, then complete the remainder).
- DEPLOY-REVIEW re-verify list (conductor self-gated locks): W3 43.9% NPE; W4 §11.A-C, §13, §13.A.
- Wave 1 surfaced a rewrite-engine backlog (FA-2026 rate-currency staleness: BADR 10% pages, sole-trader-vs-ltd "saves £5k", pre-FA-2026 dividend pages) — see wave1_page_tracker flags F-1..F-4.
