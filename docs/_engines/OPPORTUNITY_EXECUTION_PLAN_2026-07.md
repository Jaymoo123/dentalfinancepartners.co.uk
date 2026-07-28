# Estate Opportunity Execution Program (4 waves + Solicitors route fix)

## Context
The 2026-07-23 estate opportunity audit (all 15 sites, fresh GSC + Bing, 2,151-post inventory) found real uncaptured demand. Owner approved execution of all four waves plus the Solicitors duplicate-route bug fix. Agency expansion and Medical indexation stay PARKED (agency waits for the ~08-05 watch window; Medical indexation is its own program). Calculators are IN: owner confirmed blog tools are fair game; rule = build the calculator as a standalone `/calculators/<slug>` asset, then link it from matching blog posts (the estate's existing embed pattern is contextual anchor links in post bodies, not iframes).

This plan is written for a FRESH agent. Everything needed is referenced by path. Read the audit files before generating anything.

## Inputs (read first)
- Audit synthesis + 15 per-site detail files: `docs/_engines/opportunity_audit_2026-07-23/` (ranked topic lists WITH evidence and per-topic cannibalisation calls; treat these as the topic source of truth).
- Fresh search data: Supabase `gsc_query_data` + `bing_query_data` (project `dhlxwmvmkrfnmcgjbntk`, Management API, `SUPABASE_ACCESS_TOKEN` in root `.env`). GSC latest 07-18/07-20 (normal lag); Bing snapshots 07-20 to 07-23.
- Ground-truth tax facts (memory files, already verified): dividend 2026/27 = 10.75/35.75/39.35; WDA 18%→14% + new 40% FYA (special rate 6%); AMAP 55p first 10k from 6 Apr 2026; employer NIC 15%/£5,000 (LEL 26/27 £6,708); BADR 18% from 6 Apr 2026; Property reducer 22% Apr 2027. FA 2026 enacted 18 Mar 2026.

## Locked rules (apply to every wave)
- Gold-standard A* only; no em-dashes / `&mdash;`; faceless authors; body = raw HTML in frontmatter (NOT markdown).
- **OPUS-ONLY CONTENT (owner ruling 2026-07-23): every blog post body is written by an Opus-tier agent. Sonnet NEVER writes content (too many QA defects). Sonnet may still do mechanical build work (registry entries, config plumbing, redirects); Haiku grunt only.** Subagents run on the INHERITED session model — never pass `model:opus` explicitly (silent-hang gotcha); the implementing session must therefore be launched on an Opus-or-better model, stated in the handoff.
- ULTRACODE ORCHESTRATION: every stage is fanned out to parallel agents (scouts, dedup checkers, writers, verifiers, QA judges), with adversarial verification before anything is accepted. The manager context stays clean: agents return verdicts + file paths, never full content dumps.
- Fan out: one agent per post/topic, parallel; content agents are light (no build) — parallelise freely; local `npm run build` cap = 3 concurrent.
- Manager fact-checks every published figure by grep vs source.
- No auto-commit; cluster pushes per session. Deploy is OWNER-GATED — never deploy without explicit approval.
- Cannibalisation: follow each audit file's per-topic calls (e.g. Property NRL = deepen only; contractors-ir35 = no new IR35 head-term posts; generalist capital allowances = ONE consolidated guide).

## The production pipeline (procedure "to the letter")
Every new post flows: **topic → research/brief → generate → 2-track QA → gate → build → owner deploy gate → index**.

### Step P1 — Seed topics into `blog_topics`
Unified Supabase table `blog_topics` (one table, `site_key` column). Row needs: `site_key`, `topic`, `used=false`; plus `primary_keyword`, `secondary_keywords[]`, `user_intent`, `content_tier` (`cluster`|`pillar`), `publish_priority`, `suggested_slug`, `notes` (put the audit evidence + cannibalisation instruction in `notes`). Seed only topics taken from the audit files. Then enrich: `python scripts/enrich_blog_topics.py <site> --all --apply` (Google Ads volume + KD, re-deciles priority; cache `expansion_research/_enrich_cache_<site>.json`).

### Step P2 — Brief
- Deepen/rewrite topics (Wave 4) and any topic touching an existing page: `python -m optimisation_engine.competitor.brief_for_opus --site <site> --slug <slug>` → `briefs/<site>/<slug>.md`. `SITE_RULES` covers 9 sites (medical, property, generalist, dentists, solicitors, agency, contractors-ir35, construction-cis + 1); for a site not in `SITE_RULES`, DO NOT hack the engine mid-wave — instead have an Opus-tier brief step produce the same brief shape (audience, pillar links, authority links, acceptance criteria) from the site's config + audit file.
- Net-new cluster posts: the audit file entry + topic row `notes` IS the brief; a separate brief doc only for `pillar` tier.

### Step P2.5 — Positivity + no-dupe gate (MANDATORY per topic, before generation)
Risk rule: every change must be understood to be NET-POSITIVE, never duplication of existing equity. For EACH topic, a dedicated verifier agent must confirm and record in the topic `notes`:
1. NO-DUPE: grep the site's full live slug/title inventory (`docs/_engines/opportunity_audit_2026-07-23/` inventory + live `web/content/blog/`) and the pending/unpublished builds for head-term overlap. Overlap ≥ partial → topic becomes a DEEPEN of the incumbent page or is dropped; a new URL is only allowed when the sub-intent is provably distinct (state the disambiguation).
2. DEMAND: cite the query evidence (GSC/Bing rows or audit line) — no evidence, no build.
3. NO-HARM: confirm the new page cannot outrank/split an existing ranking page (check `gsc_query_data`/`bing_query_data` for pages already catching the head term; if one exists, deepen it instead — rewrite-only rule, never collapse).
A topic that fails any check is skipped and logged, not "improved on the fly". The 4-layer cannibalisation protection (source gates + queue dedup + pre-flight audit + apply-time slug check) applies on top.

### Step P3 — Generate (OPUS writers only)
ONE Opus-tier content agent per post (inherited session model — no `model:` override), parallel across separate `.md` files, following the proven hand-path pattern (`docs/_engines/RESEARCH_HANDOFF_2026-07-23.md` §3.1): read 1-2 existing posts on that site to copy the EXACT frontmatter schema + house style; pick an EXISTING category (never invent one); inline `<sup><a href="#ref-N">` citations tied to a Sources `<ol>`; keyTakeaways + faqs (frontmatter-only, no visible FAQ block); `sourcesVerifiedAt` = run date; metaTitle ≤60, metaDescription ≤160; internal links to REAL slugs only; no em-dashes; faceless author.
The `blog_generator` CLI is NOT used for generation in this program (its configs pin Sonnet, which is banned for content). Its supporting machinery IS still used: `blog_topics` queueing, `validation.validate_post`-equivalent checks in QA, enrich script. After a post is written, PATCH its topic row `used=true` + `slug`.

### Step P4 — 2-track QA (locked, before any build sign-off)
- Track 1 adversarial factual: recompute every figure/statute vs primary sources (HMRC, legislation.gov.uk) + grep-verify figures vs any cited JSON.
- Track 2 editorial vs Google helpful-content rubric: voice, thin-content, draft artefacts, em-dash sweep, citation integrity (every `<sup>` ↔ Sources entry), meta lengths, faceless author, internal-link validity, cross-post sameness, cannibalisation vs sibling pages.
Run as read-only Opus-tier sweeps on the inherited session model; fix defects with surgical single-file agents.

### Step P5 — Gate + build
- `python scripts/predeploy_gate.py --site <site> --qa-batch <batch>` (hard gates: internal /blog links, QA verdict cache from `scripts/qa_verdict.py`, brand consistency; `--strict` for em-dashes).
- Content-inclusive `npm run build` per touched site, max 3 concurrent, all green.

### Step P6 — Deploy gate + index (owner-gated)
Present per-site summary; wait for explicit owner "deploy". Then from REPO ROOT: `VERCEL_PROJECT_ID=<id> VERCEL_ORG_ID=team_XF9WAygZX7SGk9Fo4tOAnihH vercel deploy --prod --yes --archive=tgz` (IDs in `memory/vercel_cli_deploy_workflow.md` + `memory/research_authority_program.md`). Post-deploy: verify live 200s, IndexNow (`optimisation_engine/indexing/submit_indexnow.py` or per-site `pipeline/submit_indexnow.py`), give owner the URL list for GSC Request Indexing. Commit (no auto-commit), cluster pushes.

## Wave 1 — FA 2026 backfill (first; gate-free, highest ROI)
1. IMMEDIATE factual fix (manager-direct, per locked backpatch rule): generalist `employee-mileage-45p-tax-free-rules` → AMAP 55p. Sweep each site's audit file for other flagged stale posts and fix the same way.
2. New FA 2026 posts per site from the audit files' FA 2026 items, e.g.: generalist dividend-rates-2026-27 + ONE consolidated capital-allowances guide + employer-NIC/true-cost; Property FA 2026 capital allowances for landlords (delta-scope only) + AMAP 55p; Dentists AMAP + employer NIC payroll posts; Solicitors BADR 18% partner-exit + employer NIC + AMAP; contractors-ir35 MVL + BADR 18%; construction-cis vans/tools CA pillar + AMAP post; hospitality seasonal-staff NIC; startups-tech founder salary-vs-dividend 2026/27; crypto CGT rates/allowances 2026/27 reference. Cross-check every figure vs ground-truth memory files.
3. Pipeline: P1→P2.5→P3 (Opus writers only)→P4→P5. Hold at P6.

## Wave 2 — Young-site clusters
Per audit shortlists (in each `opportunity_<site>.md`, already ranked): ecommerce OSS/IOSS hub (5-6 posts) + Amazon FBA cluster + Vinted/side-hustle letters; care domiciliary pair (agency setup, domiciliary payroll); charities wave-1 six (CIO, registration, Gift Aid higher-rate, thresholds hub, small trading exemption, audit threshold); hospitality tronc trio + delivery-platform VAT; pharmacies locum pension + IR35 + hub-and-spoke; crypto disclosure/SA108 mechanics pair; Dentists sale-price benchmarks + associate SA walkthrough + NHS pension RAS; Solicitors GHR/salary post + disbursement VAT micro-answers + SRA micro-rules; startups-tech R&D subcontractor + enquiry defence + CLN/ASA; construction-cis CIS penalty appeals + job-costing software pillar; contractors-ir35 umbrella JSL 2026 cluster (3 posts) + SoW + overseas. Respect every no-go in the audit files. Same pipeline; batch per site, QA per site, hold at P6.

## Wave 3 — Calculators (standalone asset + blog links)
Pattern (copy exactly, reference = `Property/web/src/lib/calculators/tools/ltt-calculator.ts`):
1. `GenericTool` config in `<site>/web/src/lib/calculators/tools/<slug>.ts` (fields, pure `compute`, oneLiner/intro/faqs, metaTitle/Description) — domain math in a small lib file if non-trivial; add co-located `*.test.ts` golden tests (several sites already do this).
2. Register: 1 import + 1 array entry in `<site>/web/src/lib/calculators/registry.ts` (gallery, sitemap, nav auto-pick it up).
3. Route/schema already generic: `app/calculators/[slug]/page.tsx` + `lib/calculator-schema.ts` (WebApplication JSON-LD) — no new route code needed on Family-A sites.
4. Blog link-in: add contextual anchor links (`<a href="/calculators/<slug>">`) to the matching new/existing posts (the estate embed rule).
Build list (demand-evidenced): charities Gift Aid higher-rate relief calc; crypto CGT calc; startups-tech EMI tax calc (+optionally R&D claim estimator); check FIRST whether Property LBTT is already live — `lbtt` exists in `Property/web/src/lib/calculators/tools/`; if registered and routed, the audit item collapses to Bing-meta/link work, not a build. Verify each calc's rates vs ground-truth memory + HMRC before registry merge. Family-B sites (generalist/Medical/Dentists/Solicitors/agency) use `lib/tools/configs/` + `components/tools/` — follow that site's local pattern if any calc lands there.

## Wave 4 — Deepen-not-new sweep (~50 clusters)
For each cluster listed in the audit files (roofers /for/ page, generalist BiK/P11D + construction-software post, Property sa105/NRL1/VAT-rental/s198/MTD-software, Solicitors abortive-costs + SRA CTR work, Dentists UDA + CGT-selling, care CQC-costs, hospitality menu-pricing/soft-drinks, etc.):
1. `python -m optimisation_engine.competitor.brief_for_opus --site <site> --slug <slug>` (site in SITE_RULES) or Opus brief from the audit evidence otherwise.
2. ONE Opus agent per page applies the brief as an in-place A* deepen (rewrite-only rule: never collapse/redirect; Bing-ranking content is proven demand — deepen it, keep the core answer).
3. P4 QA → P5 gate/build → hold at P6.

## Solicitors duplicate-route fix (small, standalone)
Bug: same slugs live under TWO category paths (`/blog/practice-sale-succession/` AND `/blog/practice-succession-sale/`; also `/blog/vat-compliance/` vs `/blog/vat-and-compliance/`). Investigate `Solicitors/web/src/lib/blog.ts` slugifyCategory (Solicitors uniquely maps `&`→"" — likely root cause interacting with category naming) + the post frontmatter `category` values. Fix = normalise to ONE canonical category string per pair (pick the variant with existing GSC/Bing equity — check `gsc_query_data`/`bing_query_data` page URLs), correct frontmatter, and add 301 redirects from the losing path in `next.config`/`vercel.json` per that site's existing redirect pattern. Do NOT retitle or rewrite content. Verify with build + `scripts/track2_link_audit.py`-style link audit. Also fix generalist exact-dupe slug pairs the same visit (flag to owner before deleting anything; prefer redirect over delete).

## Handoff protocol (deploy-gate = session boundary)
When the implementing session reaches a deploy gate (or the owner says "deploy"/session ends):
1. This plan file is the durable spec: `C:\Users\user\.claude\plans\piped-painting-seahorse.md`. Also keep a repo copy at `docs/_engines/OPPORTUNITY_EXECUTION_PLAN_2026-07.md` (create on first implementation session).
2. Generate/refresh a HANDOFF doc `docs/_engines/OPPORTUNITY_EXECUTION_HANDOFF_<date>.md` in the style of `RESEARCH_HANDOFF_2026-07-23.md`: what is LIVE, what is BUILT+COMMITTED not deployed (with commit hashes), per-wave/per-site status table, exact NEXT ACTIONS, open gates, lessons banked. The owner points the next fresh agent at plan + handoff.
3. Update the memory index entry (`estate-opportunity-audit-2026-07-23`) with status.
4. The implementing session must be launched on an Opus-or-better model (subagents inherit it; never pass `model:opus`).

## Risk controls (non-negotiable)
- Nothing ships that is not understood to be net-positive: every topic passes the P2.5 gate; every deepen preserves the incumbent's proven core answer (Bing equity); no retitles of ranking pages; no redirects/collapses outside the Solicitors bug fix (which is a genuine dupe with an explicit canonical-selection step).
- Adversarial QA before build: independent Opus verifier agents per batch try to REFUTE each post's figures and its no-dupe claim; any refuted item is pulled from the batch, not patched inline under time pressure.
- All deploys owner-gated; everything reversible up to that point (files on a branch, no auto-commit, cluster pushes only after QA green).
- If any check reveals ambiguity about harm (possible cannibalisation, unclear equity), the item is PARKED and listed in the handoff for owner decision — never forced through.

## Execution order + gates for the fresh agent
1. Solicitors route fix + Wave 1 stale-fact fixes (small, immediate).
2. Wave 1 posts → QA → build (hold deploy).
3. Wave 2 (batch by site) → QA → build (hold deploy).
4. Wave 3 calculators → tests + QA → build (hold deploy).
5. Wave 4 deepen sweep (can interleave with 2-3; it touches existing files, so keep per-site serialisation vs waves 1-2 edits on the same site).
6. ONE owner deploy-gate presentation covering everything built, per-site summaries + URL lists. Deploy only on explicit approval, then IndexNow + Request-Indexing handoff, commit + clustered push.

## Verification
- Per post: 2-track QA clean; figures grep-verified; no em-dashes; meta lengths; internal links resolve.
- Per site: `predeploy_gate.py --site <site> --qa-batch <batch>` PASS; content-inclusive `npm run build` green.
- Calculators: golden tests pass (`npm test` in site web/ where configured); JSON-LD present on route; gallery lists the tool.
- Post-deploy (after owner gate): live 200s on new URLs; llms-full.txt carries new posts; IndexNow submitted.
