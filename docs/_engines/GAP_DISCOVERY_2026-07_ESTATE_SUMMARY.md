# Estate Gap Discovery — 2026-07-08 — Consolidated Summary

First estate-wide query-driven + sitemap-driven content gap run. Two lanes per site:
GSC lane (queries we surface for, triaged SERVED_WELL / SERVED_WEAK / WRONG_PAGE / UNSERVED, DDG-verified)
and sitemap lane (competitor content we lack entirely, the unseen-demand signal).
All recommendations adversarially verified (title-match dedupe, cross-estate ownership pass).
Per-site detail: `docs/<site>/gap_discovery_2026-07.md` + `docs/<site>/sitemap_gap_discovery_2026-07.md`.

## Status: AWAITING OWNER APPROVAL
Nothing committed to git; nothing written to blog_topics. Approve per site, then run
`python -m optimisation_engine.discovery.batch_builder --site <site> --commit-topics`
(medical/agency stay gated until watch windows close; ir35/cis pools seed at launch).

## Per-site outcomes

| Site | Net-new topics | Improve/structural actions | Gate |
|---|---|---|---|
| property | ~23 (2 GSC + 21 sitemap incl. non-resident-landlord cluster, Let Property Campaign, dnsassociates addendum) | 4 (software-page rewrite, services-page improve, VAT retitle, NRL synonym linking) | none |
| dentists | ~14 (T2 locations, T5-T9 + 9 sitemap: NHS pension, succession, associate IR35, DCP classification) | T1: CONSOLIDATE 6-7 fragmented "dental accountants" pages into one canonical service landing page (~3,500 impr; single biggest win of the run) | none |
| medical | 14 (4 GSC: hospital-doctor tax, Type 2 certificates, MTD for GPs, GPs-moving-abroad; 8+2 sitemap) | homepage/service routing fixes | HOLD until ~2026-08-03 (indexing watch) |
| solicitors | ~13 (5 GSC + 8 sitemap: legal cashiering cluster, fee-earner finance training, forensic accounting) | Sol-1: CONSOLIDATE law-firm-accountants fragments before any new canonical page | none |
| generalist | ~13 (2 GSC + 11 sitemap v2: cash-flow, UTR, business bank account, balance sheet + v1 BIK cluster) | 40+ geo queries → /locations/ architecture decision, not blog posts | owner cost-conscious; Gen-3 struck (ir35 owns IT-contractor) |
| agency | 14 provisional sitemap topics (valuation/exit, director pay, billing models, IR35 for agencies) | 3 improve-existing + 2 WRONG_PAGE routing fixes; 0 GSC net-new (indexing artifact) | HOLD until ~2026-08-05 (signal window; no content into it) |
| contractors-ir35 | 33 launch-pool (2 GSC + 31 sitemap, Tier-1 top 10 defined) | owns IT-contractor audience estate-wide | site pre-deploy; pool seeds at launch |
| construction-cis | 9 launch-pool sitemap topics (trade-specific guides, payments on account) | GSC survivor struck (existing page found by title match) | site pre-deploy |

Estate total: ~130 verified net-new topics + 2 consolidation programmes + ~10 improve/routing actions.

## Cross-estate ownership rulings
- IT-contractor content: contractors-ir35 owns it; generalist links, does not build.
- Leaving-UK/emigration tax: dentists page exists; medical's version must be NHS-pension/GP-specific.

## Systemic findings fixed this run (engine)
- Competitor-universe quality was the dominant failure mode: property v1 had ZERO real rivals (incl. our own generalist site as a "competitor"); generalist v1 was 7/8 junk. Both rebuilt (v2) → property 0→21 topics, generalist ~4→11. Own-estate exclusion now hardcoded in derive_competitor_universe.py.
- Slug-only Jaccard dedupe missed 3 duplicates; title-match added to batch_builder (max of slug/title/combined Jaccard).
- robots.txt fetched with default Python UA → false robots-blocked on ~7 domains; fixed in _fetch.py.
- batch_builder rebuilds now preserve appended `## Sonnet review` / `## Cross-estate` sections.
- Triage WRONG_PAGE over-fire on abbreviation queries fixed (position checked before Jaccard).
- New triage sources wired: `--source autocomplete` (needs a volume source before actionable: all rows carry 0 GSC impressions so the floor cuts them) and `--source bing-delta` (low yield; Bing mostly re-serves GSC-served pages).

## Content-engine audit — DONE 2026-07-08 (handoff step 1)
Three-agent audit of blog_generator + wave machinery + competitor brief pipeline. Verdict: GREEN to generate.
- blog_generator: all 8 site_configs on anthropic/claude-sonnet-4-6; Haiku verify-only (never writes); no dead imports; routing safety 3-layer. FIXED: contractors_ir35.py routed to banned DeepSeek → anthropic/sonnet-4-6.
- Generalist prompts: NOT agency-worded (loads its own generalist/pipeline/config_supabase.py) — old suspicion cleared.
- Wave machinery: core orchestration (slice-megawave/rolling-orchestrator/scaffold-wave PS1, track2 writer/QA .wf.js, cannib checks, topic_gap_finder) already site-parameterised via sites/<site>.json — safe for 6 sites. Property-hardcoded pieces are only the LEGACY brief builders (property_track1/wave2_brief_builder.py — do NOT reuse cross-site) and voice_rewrite.wf.js (humanise, property-only SITES map, out of scope here).
- Brief pipeline: page_parser fixes confirmed present (H1 pre-strip capture, @graph FAQ/schema flattening, dl/dt/dd). Briefs now stamp a generated-date header (brief_for_opus.py) so post-fix briefs are distinguishable. ALL briefs dated pre-2026-07-08 remain SUSPECT — regenerate rather than reuse.
- Noted, not changed: gap_analyser/brief_generator intermediate analysis runs Sonnet direct-API; the actual brief reasoning/rewrite is Opus in-session consuming briefs/<site>/<slug>.md (brief_for_opus is data assembly only). Consistent with tiering intent.
Acceptance: all engine modules import clean; provider/model verified per site.

## Topic commit + collision verify — DONE 2026-07-08 (handoff step 2 prep)
- batch_builder commit path fixed before first use: dual done-markers (used=false AND status='pending'), site_key set (NOT NULL — old code would have 400'd), unified `blog_topics` table forced (sites config still carries dropped legacy names), per-topic tier/priority/notes, curated-list path (`briefs/<site>/discovery_2026-07/curated_topics.json` wins over raw GSC survivors — raw commit would have missed the whole sitemap lane and ignored Sonnet strikes).
- Curated batches committed for property/dentists/solicitors/generalist (medical/agency held; ir35/cis at launch). Then a page-level collision verify (one Sonnet reader per site, page-by-page vs live corpus) found **15/59 topics were true duplicates of existing pages** — incl. most of property's "new NRL pillar family" (NRL CGT, NRL SA, DTA cluster, residency/domicile all already covered) and 5/11 dentists topics. Rejected in DB (status='rejected', used=true, audit note naming the duplicate page); DISTINCT survivors carry a one-line framing differentiator in `notes`.
- **Final pending pool: 44** — property 14 (1 pillar: portfolio landlord tax planning), dentists 6, solicitors 11, generalist 13. Filter: `keyword_source='gap_discovery_2026-07' AND status='pending'`.
- **Lesson for next cycle:** discovery's title-match dedupe missed same-intent/different-title pages estate-wide (25% dupe rate). Next run: add a page-level verify lane vs own corpus before recommending, not just slug/title Jaccard.
- **Wave 10 composed:** `briefs/property/wave10/picks.yaml` — 14 picks, single bucket, batchSize 1 (owner ruling 2026-07-08: no A/B/C lanes, one sub-agent per topic, parallel; `sites/property.json` updated). NEXT = fresh session runs the wave via /run-wave: Stage 1/2 briefs → 1b/2b gates (new HP sections: NRL IHT situs, Sch 15 SDLT, VATA Sch 8 Grp 5, s.57 ITTOIA) → parallel writers → independent QA → WRAP. Plan: `.claude/plans/no-i-suppose-let-s-happy-lerdorf.md`.

## HANDOFF → next session (content generation)

The natural follow-on. Owner-agreed structure (2026-07-08):
1. **Content-engine audit FIRST** (same treatment this run gave the discovery engine): `optimisation_engine/blog_generator/` + wave machinery. Known suspects before reading a line: deprecated model IDs in site_configs (partially fixed this run — verify), `.wf.js` writer/QA scripts property-hardcoded (unsafe for other sites), generalist config prompts still agency-worded, brief-generation quality vs the now-fixed parser signals (briefs written before 2026-07-08 used broken H1/FAQ/schema extraction — treat as suspect). Acceptance-check every fix; nothing generates until green.
2. **Then feed the approved topic batches** from this run into the engine's own topic→brief→write pipeline, one site at a time (start dentists or property), pillar-first per NETNEW_PROGRAM.md rolling architecture: new cluster → pillar ruling before blogs. Briefs must carry: competitor page teardown (parser now returns real signals), keyword seed set (cluster query variants from triage.json + GSC/Bing), format spec (schema, tables, blog-rendered calc embeds where relevant, lead-form segment, internal links).
3. **Consolidations are EXCLUDED from the content agent's remit** (dentists T1, solicitors Sol-1): separate track under the data-gated-consolidation rules (GSC+Bing guard, Bing veto, per-cluster owner approval). New-page work is additive/reversible; consolidation is not.
4. Gates unchanged: medical ~08-03, agency ~08-05, ir35/cis at their launch runbooks, A* quality bar, no auto-commit, Sonnet writes / Opus judges / Haiku never writes content.

## Open items / next cycle
1. Owner approvals per site → `--commit-topics`.
2. Consolidation programmes (dentists, solicitors) need their own plans; they are collapse-adjacent so apply the data-gated-consolidation rules (GSC+Bing guard, Bing veto, per-cluster approval).
3. WAF-walled competitor sitemaps (~10 domains incl. danbro, gorillaaccounting, thp, hivebusiness): only reachable with a rendering fetch; decide whether worth building.
4. Autocomplete lane: join dataforseo volume so candidates carry demand estimates; re-run property then estate.
5. propertytax.co.uk parked domain — remove from property universe next derive.
6. Piggyback regexes over-match (Leicester property queries leaked into ir35) — tighten before next pre-launch seeding.
7. Medical/agency: re-triage after watch windows close (~08-03 / ~08-05) with clean post-fix GSC data.
8. Cadence: this run should repeat monthly-ish; universes now curated so subsequent runs are cheap.


## HANDOFF -> next session (dentists / solicitors / generalist waves)

Property Wave 10 is the REFERENCE RUN (deployed 2026-07-09, 11 pages live; full record in docs/property/STATE.md heartbeat + docs/property/wave10_* artifacts). Repeat the same pipeline per site, in this order: **dentists (6 topics) -> solicitors (11) -> generalist (13)**. Topics are in blog_topics (`keyword_source='gap_discovery_2026-07' AND status='pending'` per site_key), each carrying a framing differentiator in `notes`.

### Pipeline per site (as run on property, with the two process upgrades)
1. **Wave composition:** build `briefs/<site>/wave<N>/picks.yaml` from the pending topics (single bucket, batchSize 1 = one sub-agent per pick, parallel — locked owner ruling). **UPGRADE 1: pre-select 2-4 competitor URLs per pick** from the site's sitemap_gap_discovery report source domains and put them in picks/briefs (property lacked this and needed a separate benchmark pass).
2. **Cannibalisation gate:** scaffold-wave.ps1 + check-cannib.ps1 -Wave N (templates may need copying from docs/<site>/_archive). **UPGRADE 2: verify vs ALL corpus siblings, not nearest-Jaccard only** — property lost 3 more picks at this gate + 1 at WRAP (18/59 discovery topics were dupes overall). Read the actual pages before ruling.
3. **Stage 1 seeds -> Stage 1b HP-lock gate -> Stage 2 full briefs -> Stage 2b drift gate.** Dispatch Sonnet sub-agents via the Agent tool with inline prompts adapted from templates/rolling/stage{1,2}.tmpl.md (property-flavoured examples — retune CTA personas/lead-form segments per site). Conductor (Opus tier) verifies every statutory anchor at primary source and writes HP locks manager-direct as isolated commits into docs/<site>/house_positions.md. Sign-off flags in briefs/<site>/wave<N>/_signals/.
4. **RUN:** one Sonnet writer per pick, Agent tool with isolation: worktree; page+commit in worktree, tracker/flags/Q&A to main via ABSOLUTE path. No per-page npm build (one WRAP build). Frontmatter contract: copy an existing live page of that site; generator provenance field; faceless reviewedBy convention; NO body-FAQ sections (templates render frontmatter faqs — property shipped 7 double-renders that had to be stripped). Check the site's renderer emits fallback FAQPage JSON-LD like property's before assuming.
5. **WRAP:** merge lanes --no-ff, link audit (site-aware: medical is FLAT routing - scripts/medical_flat_link_audit.py; others nested), ONE green build, then the QA stack: (a) independent per-page QA agents (arithmetic re-derivation + statute WebFetch, verdicts via scripts/qa_verdict.py), (b) comparative tone review vs 3 established live pages of THAT site, (c) GEO polish (answer-first openers, figure-bearing summaries), (d) competitor benchmark per page (should be light if UPGRADE 1 done). Register pages: scripts/register_monitored_batch.py --site <site> --rewrite-type net_new --commit --slugs ...
6. **Deploy gate (explicit owner word), then** deploy-and-index.ps1 -Site <site> (now has --archive=tgz + root .vercelignore; PURGE agent worktrees first — they ballooned property's upload to 2.8GB), manual IndexNow if the drain queue is empty: python -m optimisation_engine.indexing.submit_indexnow --site <site> <urls>.

### Per-site notes
- **Dentists (first):** 6 topics, no new-pillar rulings needed (all slot into existing clusters). house_positions.md exists with verification log; wave templates in docs/dentists/_archive (waves 1-4). sites/dentists.json wave config: set batchSize 1 / single bucket like sites/property.json.
- **Solicitors:** 11 topics; Wave 1 (9 pages) from June is WRITTEN/UNCOMMITTED — check for overlap with the new batch before composing (batch_builder draft-slug check covered picks.yaml but re-verify). Sol-1 consolidation stays EXCLUDED (data-gated track).
- **Generalist:** 13 topics; owner is cost-conscious on this site; site has its own design system + config_supabase prompts (verified clean of agency wording).
- **Gates:** medical ~08-03, agency ~08-05 (no content into signal windows); ir35/cis at launch runbooks; consolidations excluded estate-wide; A* bar, no em-dashes, faceless authority, no auto-commit of anything the engine doesn't commit, deploy only on explicit owner word.
