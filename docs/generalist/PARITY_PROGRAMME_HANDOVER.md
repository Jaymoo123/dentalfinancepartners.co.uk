# Generalist (Holloway Davies) → Property-standard parity programme — HANDOVER

**Purpose:** hand this programme to a fresh agent with zero prior context. Read this top to bottom before doing anything. It captures the goal, the locked decisions, the locked working rules, exactly what has been done and verified, the current repo/deploy state, and the concrete next steps with file anchors.

**Last updated:** 2026-06-30 (late). **Wave 3 + Wave 3b GEO keyTakeaways backfill COMPLETE — see `wave3_geo_2026-06-30.md`.** keyTakeaways/howToSteps now on **ALL 356 audited posts**: Wave 3 = 74 audit-clean (committed `1e60bf37`); Wave 3b = 282 now-corrected fixed posts (281 via Workflow `wf_377cb19e-2ad` + 1 manager-direct, incl. regenerating 5 stale pilot answer-boxes). `npm run build` green; `npm test` 33/33; render + schema verified. **Wave 3b QA doubled as a second audit and flagged ~60 residual BODY issues** (stale-as-current figures the first remediation missed; answer-boxes are clean) → worklist `docs/generalist/wave3b_body_issues_2026-06-30.md` = **remediation round 2 (manager-direct), owner steer pending.** Earlier work (Waves 0-2 + remediation) in §4-§4c.
**Working branch:** `property-onsite-assistant-mvp` (ALL work UNCOMMITTED in the working tree unless stated; nothing deployed). The change set is now large; a checkpoint commit was offered.
**Owner decision 2026-06-29:** deploy-Wave-0-now vs keep-building → **chose "keep building locally"**. Still undeployed (honeypot lead-loss + credential exposure remain live on prod until a batched deploy — re-surface at the next deploy gate).
**Owner steer 2026-06-30:** **cost-conscious.** After the first fix batch over-spent, owner asked "is this worth it" → method corrected to lean Sonnet-only + grep/build verification (§4c cost lesson). **Confirm scope/cost before launching large multi-post Workflows.**
**The approved plan (your spec):** `.claude/plans/partitioned-prancing-hinton.md` — read it; this handover tracks progress against it.

---

## 0. How to use this doc
1. Read sections 1-3 (thesis, locked decisions, working rules) — they are owner-locked.
2. Read **§4c** (latest: factual-accuracy remediation complete, build green) then §4-§4b for the earlier same-day work. §5 = repo/deploy state.
3. Pick up at **§6 (immediate next step)** for the current open choices. Owner is **cost-conscious (2026-06-30)** — confirm scope before any large multi-post Workflow. Honour the working rules in §3 at all times.

---

## 1. The programme & strategic thesis

Property Tax Partners (`Property/web/`) is the estate's fully-optimised **gold standard** (query-led meta, advanced CRO, proactive assistant, A/B experiments, first-party analytics, deep GEO + schema). Generalist (Holloway Davies, `generalist/web/`, domain `www.hollowaydavies.co.uk`) draws roughly half Property's traffic but had almost none of that optimisation. Goal: bring generalist to Property's standard and rebalance.

**Thesis (data-confirmed, drives everything):**
- **The bottleneck is RANKING, not conversion.** Fresh data (pulled 2026-06-29) — generalist: 44 Google clicks/28d, 14,268 impressions, **weighted avg position 29.2** (page 3), only 35/507 pages earn a click. Property: 229 clicks, pos 10.4 (page 1). **Bing is generalist's real engine** (217 clicks today vs 44 Google). At ~670 non-bot sessions/30d, on-site A/B tests reach significance slowly.
- So: **demand-capture leads** (meta/CTR + GEO + content quality), **cheap CRO runs in parallel**, **heavy CRO is deferred** (Wave 6) until there's traffic to convert.
- **The gap is mostly ACTIVATION, not net-new build.** Generalist already wires most shared machinery (`packages/web-shared/`). In several areas it's *ahead* of Property (full shared schema package incl. named Person @id → `/team/[slug]`, geo-coded `AccountingService`, `Dataset`, `DefinedTerm`; dynamic `llms-full.txt`; styled TL;DR/`speakable` box; `keyTakeaways`; glossary/fundamentals/templates/team hubs; newsletter double opt-in).
- **Competitor-gap net-new is NOT the next step.** Topic pool exhausted (289 topics all `used=true`), content saturated (496 indexed pages). Optimise-existing first; reserve competitor-gap as prep for a *future* net-new wave (Wave F).

This thesis came from an 8-dimension read-only audit (workflow `wf_f94f3113-f80`). Its full output was a temp file (not durable); the conclusions are captured in the plan + this doc + the corepage brief.

---

## 2. Locked owner decisions (do not re-litigate)
- **Sequence:** demand-capture first; defer the heavy CRO port (intent engine, proactive assistant, modals) to Wave 6, gated on traffic.
- **Credentials:** **full site-wide strip** of ICAEW/chartered/qualified-accountant self-claims (DONE for generalist — section 4). Keep the visible **"James Holloway" name**; drop only his credential designation.
- **Consent:** keep the blocking consent checkbox on the lead form **for now** (generalist's scope in the DJH partner deal is undecided). Only the honeypot bug was fixed. Revisit consent when deal scope is settled.
- **About-page hero** micro-edit "classically qualified" → **"technically rigorous"** is approved/kept.

**Open owner inputs still needed (non-blocking until the relevant step):**
- Holloway Davies **GA4 property ID** (or confirm none → skip GA4; first-party Supabase is system of record).
- Confirm `hollowaydavies.co.uk` is verified in Bing Webmaster + GSC under the estate account.
- Set **`ADMIN_DASHBOARD_KEY`** in the generalist Vercel project (only gates the admin console, not the public site).
- Whether generalist leads are in the DJH partner deal (drives the consent model + email routing).
- Per-deploy **sign-off** (deploys are always gated).

---

## 3. Locked WORKING RULES (owner-corrected mid-session — follow exactly)
1. **Same-day fresh data.** GSC + Bing must be pulled **today** before ANY data-driven decision (meta selection, intent matching, rewrite scoring). Anything not pulled today is stale. (Memory: [[feedback_gsc_freshness_gap_diagnosis]].) Data was last pulled **2026-06-29** — if you are reading this on a later day, re-pull before Waves 2/4.
2. **Reasoning-first rewrites, NEVER scripted.** Every meta title/description and every content rewrite is written by an LLM reading that specific page + its fresh queries + live SERP intent. NO grep/sed/python-templated bulk content edits, NO formula auto-applied. Engine scripts only *select* pages and *surface* queries; an LLM does the writing with judgement (Sonnet writer → Opus QA; or manager-direct for factual back-patches). (Memory: [[feedback_rewrite_a_star_overhaul_standard]].) The ONLY exception used so far: correcting identical *structured metadata field values* (e.g. `reviewedBy`) across files, which is metadata not prose.
3. **Gold-standard A\*.** Genuinely authoritative; never thin/AI-scammy. **No em-dashes** in user-facing copy (commas, parentheses, full stops, middle dots). (Memory: [[feedback_gold_standard_quality_bar]], [[feedback_no_em_dashes]].)
4. **Local-first; deploys gated.** Build locally; every prod action (Vercel deploy, Vercel env, GA4 grant, Supabase changes) needs explicit owner sign-off. No auto-deploy.
5. **Model tiering.** Opus = architect (briefs, QA, gates, integration). Sonnet = workers (content/meta writing, component wiring, build slices). Haiku = pure grunt only (counts, mechanical verification). No DeepSeek. (Memory: [[feedback_no_deepseek_opus_only]].)
6. **Keep context clean.** Run big read/edit fan-outs as `Workflow`s (Sonnet workers) and hold only structured results + gate decisions. The owner explicitly values this.
7. **Confirm before big/expanded-scope actions** even though the owner is often away. (The credential strip ballooned from "65 posts" to "315 files" — that was within the approved "full site-wide strip", but flag scope jumps.)

---

## 4. What is DONE (this session) — all staged local, build GREEN, NOTHING deployed

### Wave 1 — engine onboarding + corepage brief (COMPLETE)
- `optimisation_engine/corepage/config.py` — added `CORE_PAGES['generalist']['homepage']` (head terms: small business accountant / accountant for small business / limited company accountant / online accountant / contractor accountant / sole trader accountant / fixed fee accountant; geo_modifiers; `root_tokens` + `main_keyword_terms`).
- `optimisation_engine/corepage/term_analysis.py` — parameterised the property-hardcoded `ROOT_TOKENS` + "main keyword" rollup to read from config (`keyword_stats`/`analyse_page`/`run_term_analysis` now take `main_terms`/`root_tokens`; render label uses them). **Property behaviour preserved** via explicit config fields on its entry.
- `optimisation_engine/competitor/brief_for_opus.py` — added `SITE_RULES['generalist']` (11 fundamentals pillar pages, 9 general-business HMRC/Companies House authority links) so blog-competitor briefs work in later waves.
- **Corepage brief generated:** `briefs/generalist/homepage/index.md` (+ `_analysis_pack.md`, `_brief_scaffold.md`). This is the spec for the Wave 2 homepage rewrite. Headline diagnosis: homepage owns **1 of 440** head-family queries, **H1 is a keyword-less slogan**, **482 words vs competitor median 1,202**, schema missing AccountingService/Service/BreadcrumbList. NOT cannibalisation — it's a relevance problem (local/niche intent is correctly held by location/niche pages).

### Fresh data pulled 2026-06-29 (Supabase, shared project `dhlxwmvmkrfnmcgjbntk`)
- `gsc_query_data` (site_key='generalist'): 4,640 rows, through 2026-06-29.
- `gsc_page_performance` (niche='generalist'): 4,023 rows.
- `bing_query_data` (site_key='generalist'): 1,501 rows, snapshot 2026-06-29.
- Commands used (run from repo root): `python -m optimisation_engine.ingestion.ingest_gsc_queries generalist --days 90`; `python -m optimisation_engine.ingestion.ingest_gsc_pages generalist --days 90`; `python -m optimisation_engine.clients.bing_query_client generalist`.

### Wave 0 — foundation: measurement on + landmines cleared (COMPLETE)
**Credential de-credentialing (owner: full site-wide strip) — VERIFIED:**
- `optimisation_engine/apply/_schema_generator.py` — generalist author jobTitle "Chartered Accountant (ACA, ICAEW)" → "Senior accountant" (last source ICAEW string; reviewer/org were already clean from commit `1a6f8c02`). **Stops re-stamping on any future content apply.**
- ~26 source TSX/TS files (`generalist/web/src/**`) + `generalist/niche.config.json` (tagline, description, "ICAEW qualified" sticky CTA) — de-credentialed (7-worker workflow).
- 65 baked-schema blog posts — `schema:` frontmatter blanked → clean JS fallback (or surgical) + the vestigial `reviewedBy`/`reviewerCredentials` fields corrected to "Holloway Davies Editorial Team" / "Reviewed against legislation.gov.uk and HMRC guidance". (NOTE: those two fields are **unused by the generalist renderer** — verified — they were just carrying the false claim.)
- 315 content files (blog + fundamentals) — firm-voice prose self-claims ("we are ICAEW-qualified accountants") stripped (21-worker reasoning-first workflow; required a resume after a mid-run session limit).
- **VERIFIED end state:** machine-readable ICAEW claims = **0**; firm-voice self-claims = **0**. ~200 remaining ICAEW mentions across 94 files are all **legitimate educational/comparison/reader-advice** (e.g. `icaew-vs-acca-vs-aat-accountant.md`, `director-sign-off-...-non-icaew.md`, "check your accountant is ICAEW/ACCA/AAT qualified") — correctly KEPT. "James Holloway" name kept; only credential dropped.

**Other Wave 0 items:**
- **Honeypot fix:** `generalist/web/src/components/forms/LeadForm.tsx` — `company_url` → `enquiry_ref` (label "Reference (leave blank)"). Stops the autofill silent-drop lead loss.
- **Freshness:** `generalist/web/public/llms.txt` + `generalist/web/src/app/llms-full.txt/route.ts` — "2025/26 UK figures" → "2026/27", and removed the ICAEW brand claim in llms.txt.
- **PECR:** created `generalist/web/src/components/analytics/ConsentToggle.tsx` (ports Property's; imports the shared `@accounting-network/web-shared/analytics/consent` module) and wired it into `generalist/web/src/components/layout/SiteFooter.tsx` footer.
- **`/blog/stage/*`** — already in `robots.ts` disallow (no action needed).
- **Analytics ingest — verified LIVE in prod** (1,659 generalist sessions, 670 non-bot/30d, latest today). Ingest was never broken; only `ADMIN_DASHBOARD_KEY` (Vercel env) gates the admin console.

**Build:** `cd generalist/web && npm run build` → green (EXIT=0) after all the above.

### Memory updated this session
- `estate_credential_claim_risk.md` — recorded generalist full de-credential (supersedes the old "James Holloway ACA/ICAEW left by choice" note).
- `feedback_rewrite_a_star_overhaul_standard.md` — added the reasoning-first/never-scripted rule (covers meta + content + factual sweeps).
- `feedback_gsc_freshness_gap_diagnosis.md` — added the same-day fresh-pull requirement.

### Deferred / still open (NOT blocking Wave 0 deploy)
- Admin **experiments tab** in `generalist/web/src/app/admin/analytics/page.tsx` (~lines 757-769) still shows stale "not operated" copy; fix to read `vw_experiment_funnel` for `site_key='generalist'`. No effect until `ADMIN_DASHBOARD_KEY` is set, so bundled with console access.
- Broad ICAEW review of the few non-comparison files among the remaining 94 (spot-check confirmed they're educational; low risk).
- One worker uncertainty: `accountant-cost-limited-company-2025-26.md` line ~167 "market rates from ICAEW-qualified firms" (market description, kept; change to "specialist firms" if owner prefers).
- Estate-wide (other sites, separate effort): Dentists 40 + agency 30 live md still assert the credential (their source profiles are fixed).

---

## 4a. Wave 2 progress (2026-06-29 cont.) — core pages DONE, build green, local-only

**All verified, build green (`cd generalist/web && npm run build` EXIT=0), nothing deployed.**

- **Homepage core-page rewrite (DONE+VERIFIED)** — `generalist/web/src/app/page.tsx`, per `briefs/generalist/homepage/index.md`.
  - Title now `Small Business Accountants UK | Holloway Davies` (head keyword leads; used `title: { absolute }` to stop the layout template double-stamping the brand). Keyword-bearing H1 (slogan demoted to sub-headline). Word count **482 → 1,329** (rendered).
  - New sections: keyword intro + "Who we help" segment cards (pillar links), "What we handle" coverage (6 lines, each with a `/fundamentals` pillar link + an HMRC/Companies House authority link = 6 external authority links), sole-trader-vs-Ltd decision table → pillar, areas-served links (`/locations`, `/accountant-near-me`), "How fixed fees work", FAQs 4 → 10 (zero-click head queries).
  - **Schema 3 → 7 nodes (this also completes the Wave 3 homepage-schema item):** Organization, WebSite, WebPage, AccountingService (areaServed Country, priceRange, parentOrganization, openingHours — `Object.assign` overrides like the locations page), Service + hasOfferCatalog (8 offers), BreadcrumbList, FAQPage. Verified in rendered HTML.
  - Acceptance: 0 em-dashes, **0 ICAEW/chartered/qualified-accountant claims** (Risk 1 already handled by Wave 0 — verified, not re-added), "James Holloway" name kept.
- **Services page (DONE)** — `src/app/services/page.tsx`: title `Services` → `Small Business Accounting Services` (brand-less string; template adds brand once), keyword-rich description + OG, and **added a `LeadForm`** (the closing CTA is now copy + a "Request a fixed-fee quote" form card).
- **Locations formula (DONE — fixed a real bug)** — `src/app/locations/[slug]/page.tsx`: the string title included the brand AND the layout template appended it, so all **193 location pages rendered a doubled brand** ("Accountant in X | Holloway Davies | Holloway Davies"). Fixed by making the title brand-less (template adds it once → single brand). Description now leads with "Small business accountant in {city}" + service-intent. (Idiomatic rule learned: page title strings must NOT include the brand; the root layout template `%s | Holloway Davies` adds it. The homepage used `{ absolute }` instead — both are valid.)
- **Blog OG `modifiedTime` (DONE)** — `src/app/blog/[category]/[slug]/page.tsx`: added `modifiedTime: post.updatedDate ?? post.date` (generalist field is `updatedDate`, not Property's `dateModified`).
- **Deferred from Wave 2 homepage brief:** the conservative catcher-page link-ups (exact-match "small business accountants" links UP to the homepage from cis/vets blogs + named location pages) → folded into **Wave 4** (cis/vets are Wave-4 rewrite candidates; adding the link during their A* rewrite avoids double-touching). The location template was deliberately NOT given a site-wide boilerplate homepage link (193 identical exact-match anchors would read as manipulative, not "conservative"). Location pages already link home via global nav.

### SERP-meta batch 2 — DEFERRED to post-2026-07-10 (data-driven; see Task #3)
Ran `python scripts/meta_worklist.py --site generalist --days 90 --cap 200 --min-impressions 5` (data fresh today). Worklist = 200 pages; **56 are batch-1 cooldown** (shipped 06-12, 17 days ago, locked to ~07-10 — worklist does NOT auto-exclude them; the 61 batch-1 files are in `optimisation_changes.files_changed` where `change_type='title_meta_rewrite'`, `created_at::date='2026-06-12'`; `target_slug` is null so filter by `files_changed`). Of the **144 eligible (new)** pages, only **6 have clicks** (genuine meta-fixable CTR shortfall), ~13 are zero-click pos≤3 informational SERPs (**GEO not meta**), and the rest sit at **pos 5-49 with 0 clicks** = a **ranking** problem meta can't fix. **This validates the program thesis: the bottleneck is RANKING, not CTR.** Batch 1 already harvested the real CTR wins 17 days ago. Decision: **do NOT run a blanket meta batch now** (would be the exact "blanket meta program" the SEO-eval memory warns against); **defer the substantive batch to post-07-10** (cooldown lifts + 28d verdicts mature). Curated shortlist for then (saved `.cache/meta_program/generalist/eligible_batch2.json`; register `docs/generalist/opportunity_register_meta_2026-06-29.md`): `how-much-corporation-tax-do-i-pay` (pos2/154impr/1.9%), `how-to-claim-rd-tax-credits` (pos4/94impr), `accountant-for-uber-drivers` (pos1/27impr), `accountant-fees-small-business-2025-26` (pos2, +stale "2025-26" year to fix). Zero-click page-1 informational pages → addressed by **Wave 3 GEO** (keyTakeaways/answer-box/schema), which is why we pivot to Wave 3 next.

### Wave 3 (GEO + schema) progress — schema/code DONE, content backfill IN PROGRESS

- **Services page schema (DONE):** `Service` + `hasOfferCatalog` + `BreadcrumbList` added to `src/app/services/page.tsx` (was zero schema).
- **Category-hub schema (DONE):** `BreadcrumbList` + `CollectionPage` added to `src/app/blog/[category]/page.tsx` (was zero). Also de-doubled its title and fixed the stale "2025/26" → "2026/27" in its description.
- **Blog GEO route (DONE):** added `id="answer-box"` to BOTH TL;DR branches in `BlogPostRenderer.tsx` (the `speakable` schema already targets `.tldr`). **DELIBERATELY SKIPPED `export const dynamicParams = false`** on the blog slug route: that route has a `permanentRedirect` fallback for wrong-category-but-valid-slug URLs, and `dynamicParams=false` would turn those into 404s (loses link equity). Better trade to keep the redirect. Documented deviation.
- **llms.txt (DONE):** added a "Key Facts (UK, 2026/27)" block (CT 19%/25% + marginal relief; VAT £90k; dividends 10.75/35.75/39.35 + £500; PA £12,570 / HRT £50,270; employer NIC 15%/£5k + EA £10,500; BADR 18%/£1M; AIA £1M + WDA 14% + full expensing; AMAP 55p/25p; MTD ITSA Apr 2026) plus `/uk-tax-rates` + `/calculators` links. Left the dynamic `llms-full.txt` route as-is (it already points to `llms.txt` + `/api/uk-tax-rates.json`; avoids fact drift). **Verify `/api/uk-tax-rates.json` is itself current 2026/27 (the canonical machine source) — not checked this session.**
- **Homepage schema (DONE earlier):** 3 → 7 nodes, completed inside the homepage rewrite.
- **Content GEO backfill (PILOT DONE; rollout GATED):** keyTakeaways pilot on the **top 10 GEO-priority posts** ran via Workflow (Sonnet writers, fact-derived from each body). **9 accurate posts shipped** (build green; answer-box `.tldr` + "Key takeaways" render; 10 posts now have keyTakeaways vs 1 before). The 10th, `hmrc-cgt-reporting-requirements-2026`, was caught in QA as a **FABRICATED post** (see the CRITICAL flag below) — its keyTakeaways were reverted.
  - **CRITICAL LEARNING (gates the rollout):** keyTakeaways AMPLIFY whatever the body says straight into the answer-box / featured-snippet slot. The corpus is largely `generator: unverified/claude-era`, and 1 of 10 top-traffic posts contained a fabricated tax rule. So **DO NOT scale keyTakeaways to 30-50 posts + `howToSteps` to ~20 procedural posts until the high-traffic `unverified/claude-era` posts get a factual-accuracy pass.** The rollout is otherwise mechanically ready (Workflow script: `…/workflows/scripts/generalist-keytakeaways-pilot-wf_bf2de831-464.js`).
  - **Freshness flag (lower severity):** the `icaew-vs-acca-vs-aat-accountant` keyTakeaways repeat a stale **£10.2m** audit-exemption turnover threshold (rose to **£15m** for periods beginning on/after 6 Apr 2025). Body figure is stale; patch the body then the takeaway.

> ## ⚠️ CRITICAL — LIVE FABRICATED POST (owner decision needed)
> `generalist/web/content/blog/hmrc-cgt-reporting-requirements-2026.md` is **wholly premised on a tax rule that does not exist**: it claims that "from 6 April 2026, all UK property disposals (including commercial and land) must be reported and paid within **30 days**." The real rule is **60 days for UK residential property** (since 27 Oct 2021; commercial property and land are reported via self assessment, not a 60/60-day window). The whole article (title, metaTitle/description, body, worked example, FAQs) asserts the fabrication. It is an `unverified/claude-era` post and is **live + indexed on prod** (this working-tree session is undeployed; the fabrication predates it). This actively misinforms readers about a tax deadline. **I reverted the keyTakeaways I had added but did NOT rewrite/redirect/unpublish the post itself (that is an owner-gated content/SEO decision).** Recommendation: **301-redirect it to `uk-capital-gains-tax-rates-residential-property-2026`** (which states the correct 60-day rule) since the post's premise is false and serves no legitimate query; alternatively a full A* rewrite around the true rule. **Strongly recommend a corpus-wide factual-accuracy audit of the `unverified/claude-era` posts** (this one was found only because it was in the top-10 GEO pilot).

### Sitewide title-doubling bug — DISCOVERED + FIXED (build-verified: 0 doubled titles)
The root layout sets `title.template = "%s | Holloway Davies"`. Many pages set a MAIN `metadata.title` that ALSO included the brand, so the rendered `<title>` **doubled** it ("X | Holloway Davies | Holloway Davies"). This was sitewide. Fixed everywhere; the authoritative check is `grep -rlE "Holloway Davies \| Holloway Davies" .next/server/app --include="*.html"` → now **0**.
- Homepage: `title: { absolute: ... }`.
- 193 location pages (`locations/[slug]`), services, category hub, locations index, and 9 static pages (accountant-near-me, glossary, guides, calculators, blog index, templates, blog/stage, blog/stage/[stage]): MAIN title made brand-less (template adds the brand once). OG/twitter titles KEPT the brand (they are not templated).
- 2 TSX pages used a LITERAL "Holloway Davies" (embed, newsletter/unsubscribed) — a `${siteConfig.name}` grep misses these; only the rendered-HTML doubling grep caught them.
- 4 blog posts baked the brand into `metaTitle` frontmatter (ir35-contract-review-service, accountant-for-content-creators-uk, accountant-for-crypto-traders, accountant-for-medical-professionals) — stripped. (3 of those also still have a stale "2025/26" in their H1/`title`; left for a freshness/rewrite pass.)
- **Rule learned (likely estate-wide — other sites may share the same layout-template + branded-title pattern):** page title strings must NOT include the brand; the layout template adds it. Verify by grepping rendered `.next/server/app/**/*.html` `<title>` for the doubled brand (catches all causes: `siteConfig.name`, literal brand, baked `metaTitle`).

## 4b. Session 2026-06-30 — factual-accuracy audit (PARTIAL) + 2026/27 freshness fixes

**Why partial:** the account hit its session/usage limit (resets 2pm Europe/London) mid-run, cutting off two background workflows. Nothing is broken; resume after the limit resets. The limit is account-wide, so a fresh agent does NOT bypass it.

### DONE + verified (local, uncommitted, `npm test` green 33/33)
- **Canonical rates module → 2026/27** — `generalist/web/src/lib/uk-tax-rates.ts`: dividend rates **8.75/33.75 → 10.75/35.75** (FA 2026 s.4), taxYear/start/end → 2026-27, lastUpdated 2026-06-30, student-loan Plans 1/2/4 → **26,900 / 29,385 / 33,795**, Class 2 SPT 6,845→**7,105**, Class 2 voluntary weekly 3.50→**3.65**. All volatile 2026/27 figures primary-source verified (gov.uk/legislation.gov.uk) this session; everything else confirmed frozen. This module feeds the LLM-citable `/api/uk-tax-rates.json`, the `/uk-tax-rates` page, `llms-full.txt`, AND the calculators.
- **Code bug fixed** — `generalist/web/src/lib/tools/compute/pension.ts` was HARD-CODING 2025/26 dividend rates (0.0875/0.3375); now sources `dividendTax` from `uk-tax-rates.ts` so it cannot drift. (salary-dividend.ts already read the module.)
- **Tests** — `compute.test.ts`: 2 salary-dividend expectations recomputed by hand for the new dividend rate (2948.73 / 37551.28 / 38861.95). `cd generalist/web && npm test` → 33/33 pass.

### Factual-accuracy audit — PARTIAL (161/356 posts)
- Audited 161 of the 356 `unverified/claude-era`+`deepseek-chat/legacy-bulk` posts vs `docs/generalist/house_positions.md` before the limit. Durable output:
  - `docs/generalist/factual_audit_2026-06-30.md` (human report) + `docs/generalist/factual_audit_2026-06-30.errors.json` (machine).
  - **42 clean** (passed the Wave 3 keyTakeaways gate). **119 posts with confirmed/flagged errors: 30 critical, 116 high, 131 medium.** (verify stage partly cut off → some critical/high carry `verdict:null` = finder-flagged, not yet independently confirmed; re-verify on resume.)
  - **15 posts carry CRITICAL findings** (fabricated/contradictory rules) incl. `accountant-for-airbnb-hosts-uk`, `accountant-for-beauty-therapists`, `accountant-for-farmers`, `accountant-for-landlords-uk-property-investors`, `accountant-for-property-investor-uk`, `accountant-for-pubs-and-bars-uk`, `badr-accountant`, `badr-claim-after-leaving-director-role`, `capital-allowances-on-property`, `capital-gains-tax-and-property-guide-2025-26`, `corporation-tax-deadline-31-march-2026`, `corporation-tax-marginal-relief-2025-26`, `correct-confirmation-statement-error`, `england-tax-bands` (full detail in the report).
  - **Recurring patterns** (expect across the un-audited 195 too): FHL regime shown as live (abolished Apr 2025); Class 2 NIC shown as payable (abolished Apr 2024); Class 4 at 9% (now 6%); employer NIC 13.8%/£9,100 (now 15%/£5,000); dividend 8.75/33.75 (now 10.75/35.75); BADR date-band errors; stale "2025/26" labels.
  - **195 posts still un-audited** — list in `.cache/audit_remaining.json`.

### NOT done — RESUME HERE (after 2pm reset)
1. **Finish the audit** — run the audit workflow over `.cache/audit_remaining.json` (195 posts). Reuse `…/workflows/scripts/generalist-factual-audit-wf_8ea67fd0-559.js` (repoint its discovery agent to read `.cache/audit_remaining.json` instead of the full list). Merge into the 06-30 report.
2. **2026/27 freshness sweep of non-blog surfaces (task #7) — 0 done.** Re-run `…/workflows/scripts/generalist-freshness-sweep-wf_fb2a074c-205.js` fresh. Targets + judgment rules are in the script (keep historical year-selector options but flip DEFAULT to 2026/27; FLAG the intrinsic "2025/26 year-end planning" guide rather than auto-bumping).
3. **Fix confirmed factual errors (task #2)** — criticals manager-direct (incl. the §4a fabricated CGT post `hmrc-cgt-reporting-requirements-2026` → 301 to `uk-capital-gains-tax-rates-residential-property-2026` or A* rewrite); high/medium batched (Sonnet writer→Opus QA, or manager-direct factual back-patch). Build green after.
4. **Wave 3 GEO backfill (task #3)** — keyTakeaways ONLY on audit-clean posts (gate; 42 known clean so far, more after the audit finishes).
5. **Waves 4 (GEN-R2 rewrites) + 5 (cheap CRO).**

### Build state
Working tree = §4a Wave-2 work + this session's 3-file edits (uk-tax-rates.ts, pension.ts, compute.test.ts). `npm test` green.

---

## 4c. Session 2026-06-30 (cont.) — factual-accuracy remediation COMPLETE (local, build green, NOT deployed)

**Audit: all 356 unverified/legacy posts audited** (part-1 161 + part-2 195, completed via lean finder-only Workflows reading `.cache/audit_remaining*.json`, writing per-post findings to `.cache/audit_part2/`). Result: **282 error posts, 73 clean (Wave-3 eligible), 1 bespoke**.

**Fixes applied (surgical, reasoning-first, NOTHING deployed):**
- **~281 posts surgically corrected** by Sonnet fixers (each self-validates every finding vs the ground-truth fact sheet, then makes minimal date-tagged edits + recomputes worked examples; the `notApplicable` logs confirm fixers correctly SKIP correctly-date-tagged historical figures). Per-post findings staged in `.cache/audit_fix/<slug>.json`.
- **3 whole-premise fabrications rewritten on their existing URLs** (owner chose rewrite over redirect): `hmrc-cgt-reporting-requirements-2026` (invented "30-day all-property" rule → correct 60-day residential / Self-Assessment-for-commercial), `mtd-itsa-april-2026-deadline-mixed-member-partnerships` + `mtd-itsa-april-2026-deadline-partnerships-corporate-members` (invented "partnerships mandated into MTD ITSA from April 2026" → correct deferral position).
- **Freshness sweep (task #7) done:** 24 non-blog `src/` surfaces to 2026/27 (97 edits). Fixed 1 test-golden regression it caused (student-loan plan2 threshold 28470→29385: SL 2755.35 / net 42602.05). Manager-review flags it raised (NOT auto-changed): `guides/[slug]/data.ts` `tax-year-end-checklist` guide is intrinsically 2025/26 (rewrite-or-archive + 7 stale figures inside); `welcome-series.ts` Step 4 (MTD-now-live reframe); EmployerNI EA label.

**Verification (cheap, sufficient — proved Opus-QA-per-post was unnecessary):** grep-residual across all edited posts = 0 em-dashes, 0 stale `13.8%`/`£9,100`/`8.75%-as-current`/`45p`/`Class 2 and Class 4`/`within 30 days`/`12.5%`/`10.2m`, 0 credential reintroduction. Complex criticals hand-verified correct (marginal-relief table regen + "never below 19%", BADR 24-month not 12, CT600 12-month-return vs 9-month-payment split, FHL-abolished recast). Frontmatter YAML re-validated (5 fixer-introduced unquoted-colon values quoted + 1 BOM stripped). **`npm run build` GREEN, `npm test` 33/33.**

**Cost lesson (owner flagged mid-session):** the FIRST fix batch over-spent (~4.8M tokens) because it used Opus-QA-on-every-post AND hit the `args`-arrives-as-a-string gotcha (gotcha #9), which fanned it across all 178 posts at once instead of the intended 32-post criticals batch. Corrected to **lean Sonnet-only fixers + grep/build verification** (no Opus QA). Lean fixer = `.cache/wf_fix_factual.js` (reads `.cache/fix_pending.json`; NO args, to avoid the string bug). Audit script = `.cache/wf_audit_remaining.js`.

**Duplicate slug families noted** (8 CGT-rate variants, multiple sole-trader-vs-ltd-calculator + R&D + payroll near-duplicates) — a future **DEDUP opportunity**, NOT actioned (locked rule: rewrite-only, no collapse without data-gating + per-cluster owner approval).

**NEXT:** ~~Wave 3 GEO backfill is now UNBLOCKED for the 73 audit-clean posts~~ **DONE 2026-06-30** — keyTakeaways (411) on all 74 audit-clean posts (69 authored via Workflow `wf_cd61bf16-546`, Sonnet author → Opus adversarial QA, deterministic apply; 5 pilot pre-existing) + howToSteps on 9 procedural posts. Build green, tests 33/33, answer-box/speakable/HowTo schema verified in prerendered HTML. Full record: `docs/generalist/wave3_geo_2026-06-30.md`. **Wave 3b DONE 2026-06-30** (282 fixed posts now have answer-boxes; run `wf_377cb19e-2ad`, resumed once after a session-limit cut-off). **NEW: its ground-truth-checked QA surfaced ~60 residual BODY issues** (worklist `wave3b_body_issues_2026-06-30.md`) = remediation round 2 (manager-direct, owner steer pending). Then Waves 4 (GEN-R2 rewrites, needs same-day GSC pull) + 5 (cheap CRO).
**Spend posture update 2026-06-30:** owner upgraded plan; spend is no longer the hard constraint (optimise for exhaustive/correct, still no waste). Wave 3 used Opus-QA-per-post deliberately (answer-box = featured-snippet slot). Memory [[feedback_spend_posture_upgraded]].

---

## 5. Current repo / deploy state
- Branch `property-onsite-assistant-mvp`, all Wave 0 + Wave 1 work **uncommitted** in the working tree. Build green. **Nothing deployed.**
- The owner's default is **commit only when asked** — do not commit/push unless told. (You may offer a clean checkpoint commit.)
- Deploy is **Vercel CLI, gated**: GitHub auto-deploy is OFF. Recipe: `cd generalist && vercel deploy --prod` (from the site dir; see memory [[vercel_cli_deploy_workflow]] for project IDs). Property has deployed from a dirty working tree before, so committing is not a deploy prerequisite (but cleaner).

---

## 6. Immediate next step (as of 2026-06-30 evening)
Factual remediation is DONE and build is green (§4c). Waves 0-2 + GEO schema/code are also done (§4-§4a). Nothing is deployed. **Owner is cost-conscious; confirm scope before any large multi-post Workflow.** Open choices, roughly in priority order:

1. **Checkpoint commit** of the large uncommitted change set (offered; owner default is commit-only-when-asked).
2. ~~**Wave 3 GEO backfill** + **Wave 3b**~~ **BOTH DONE 2026-06-30** — keyTakeaways on ALL 356 audited posts (`wave3_geo_2026-06-30.md`). **Follow-on now top priority: remediation round 2** — fix the ~60 residual body issues Wave 3b's QA flagged (`wave3b_body_issues_2026-06-30.md`), manager-direct factual back-patch. Owner steer pending.
3. **Freshness follow-ups** (cheap, manager-direct): the `tax-year-end-checklist` guide in `generalist/web/src/app/guides/[slug]/data.ts` is intrinsically 2025/26 (rewrite-or-archive + 7 stale figures inside); `welcome-series.ts` Step 4 MTD reframe; EmployerNI EA label.
4. **Dedup** the duplicate slug families surfaced by the audit (8 CGT-rate variants, multiple sole-trader-vs-Ltd-calculator / R&D / payroll near-duplicates) — STRATEGIC + GATED (locked rule: rewrite-only, no collapse without GSC/Bing data + per-cluster owner approval; see [[feedback_data_gated_consolidation]]).
5. **Waves 4 (GEN-R2 rewrites)** — needs a same-day GSC/Bing pull first — and **5 (cheap CRO)**.
6. **Deploy** (Wave 0 + everything since) — gated; `cd generalist && vercel deploy --prod`; set `ADMIN_DASHBOARD_KEY` in Vercel env; verify per §10.

### (historic) The original deploy-vs-build decision
Owner chose "keep building locally" on 2026-06-29; Wave 0 (honeypot fix, credential strip, consent toggle, llms freshness) remains undeployed and batches into a later gated deploy.

---

## 7. Engine readiness & data connectivity (for Waves 2/4/F)
- **GSC + Bing + DataForSEO**: wired for `generalist`. SERP-meta program onboarded (batch 1 shipped 2026-06-12, 61 pages). Corepage engine onboarded this session. Competitor engine `SITE_RULES['generalist']` added this session.
- **GA4**: NOT connected for generalist (`ga4_config.py` has it commented out). Optional — first-party Supabase is system of record. Needs a property ID + OAuth grant if wanted.
- **DataForSEO budget**: `optimisation_engine/config.py` `DATAFORSEO_SITE_BUDGETS['generalist']=0.10`. `SITE_PLANS['generalist']` in `ingest_dataforseo.py` is minimal — upgrade to `do_competitors=True` before competitor-gap work (Wave F).
- **Corepage engine uses DuckDuckGo (free)** + capped Serper fallback — generating its brief costs ~nothing. The $0.10 DataForSEO budget is for the *competitor* engine.
- **Supabase read-only SQL** (counts, verification): Management API pattern — `SUPABASE_ACCESS_TOKEN` in `.env`, POST to `https://api.supabase.com/v1/projects/dhlxwmvmkrfnmcgjbntk/database/query`. Column notes: `gsc_query_data`/`bing_query_data` use `site_key`; `gsc_page_performance` uses `niche`; `web_sessions` uses `started_at` (not created_at).

---

## 8. Remaining waves (full detail in the plan; concrete tasks here)

### Wave 2 — Meta & intent targeting (reasoning-first, per page) — biggest CTR/ranking lever
- **Core pages first (high impact, from the corepage brief `briefs/generalist/homepage/index.md`):**
  - Homepage `generalist/web/src/app/page.tsx` — front-load a head keyword (currently brand-led; recommended title `Small Business Accountants UK | Holloway Davies`), keyword-bearing H1 (slogan → sub-headline), grow ~482→~1,200-1,500 words, add the schema nodes (overlaps Wave 3). **The brief's Risk 1 (the homepage credential claim) is already handled by the Wave 0 strip — verify, don't re-add.**
  - `generalist/web/src/app/services/page.tsx` — title is literally "Services"; make keyword-rich + add a LeadForm.
  - `generalist/web/src/app/locations/[slug]/page.tsx` — fold service-intent into the 193-city title/description formula.
- **SERP-meta batch 2:** `python scripts/meta_worklist.py --site generalist --min-impressions 5` SELECTS pages + surfaces fresh queries (28d cooldown auto-enforced on the 59 already done). Then **reasoning-first** per-page title/description (Sonnet writer → Opus QA) for the ~307 unprocessed posts + 10 fundamentals, in reviewable batches. `register_monitored_batch.py` for 28-day verdicts. **Re-pull GSC/Bing same-day first** if not today.
- Add `modifiedTime` to blog OG block in `generalist/web/src/app/blog/[category]/[slug]/page.tsx`.

### Wave 3 — GEO + schema parity (wire already-imported shared builders + content backfill)
- Homepage schema 3→7 nodes in `page.tsx` (add AccountingService, Service+hasOfferCatalog, BreadcrumbList, WebPage — builders already in `generalist/web/src/lib/schema.ts`).
- Category-hub schema in `generalist/web/src/app/blog/[category]/page.tsx` (BreadcrumbList + CollectionPage — currently zero).
- Services page schema (Service + BreadcrumbList).
- `llms.txt` enrichment: add a Key Facts block (2026/27 rates), calculator links, `/uk-tax-rates`.
- Content backfill (infra already wired; `speakable` targets `.tldr`): `keyTakeaways` on top 30-50 GSC posts; `howToSteps` on ~20 procedural posts.
- `export const dynamicParams = false` on the blog slug route; `id="answer-box"` on the TL;DR box.

### Wave 4 — Content-quality rewrites (ready now)
- **GEN-R2 (13 pages), unblocked since 2026-06-26.** Re-score against today's fresh pull first (`rewrite_worklist.py --site generalist`), then bespoke reasoning-first A* overhauls (Sonnet writer → Opus QA), anchored to `docs/generalist/house_positions.md` (locked). Engine: `docs/_engines/REWRITE_PROGRAM.md` + `optimisation_engine/track2/`. Register in monitored_pages.
- Then re-run the worklist after ~2026-07-10 (GSC maturation) for the next tier of the 344 watch-list pages. Do NOT add net-new pages.

### Wave 5 — Cheap/safe CRO wins (parallel with 2-4; independent files)
- Calculator result-CTA: wire `resultCta` on `generalist/web/src/components/tools/CalculatorClient.tsx` (shared `Calculator` already accepts it). Port `MiniCapture` from Property if needed.
- Activate `generalist/web/src/components/ui/StickyCTA.tsx` (currently a no-op stub; stripped scroll-threshold version, no intent layer).
- Blog conversion surface in `generalist/web/src/components/blog/BlogPostRenderer.tsx`: per-category CTA copy, `decorateAsides()`, skip-to-form anchor, mid-scroll inline lead form, reviewer row (AuthorByline already accepts `reviewerSlug`).
- LeadForm on homepage + services page. Exit-intent qualified-lead variant on `/blog/*` + `/calculators/*` (keep newsletter modal on low-intent routes). 1-2 homepage calculators.
- Consent stays a checkbox (owner decision); honeypot already fixed.

### Wave 6 — DEFERRED heavy CRO port (gated on traffic)
Port Property's `lib/intent/` + `components/intent/` (taxonomy adapted to generalist categories), then `SpecialistWidget` + `opener.ts`, then `ResultGateModal` experiment. Also unlocks `deriveTopic` for analytics topic segmentation. Don't start until Wave 5 surfaces are converting and analytics confirm volume.

### Wave F — Future/optional
- Competitor-gap pull (`optimisation_engine/competitor/`) — only as prep for a future net-new wave, after GEN-R2 + watch-list rewrites. Cheap alternative: `generalist/pipeline/gsc_cross_niche_analysis.py` (sibling-GSC mining, zero DataForSEO).
- Data-PR flagship (XL): a "UK SME Tax Burden / Business Formation Index" (`/research/...`, Dataset JSON-LD + CSV) reusing `optimisation_engine/ingestion/ingest_landlord_data.py` + Property's research page pattern.

---

## 9. Operational gotchas (learned this session)
- **Workflow `args` arrives as a JSON STRING**, not an array. Parse defensively: `const FILES = Array.isArray(args) ? args : JSON.parse(args)`. (The corpus sweep crashed once on this.)
- **Workflow resume**: `Workflow({scriptPath, resumeFromRunId, args})` re-runs only failed/new agents; completed ones return cached. Used to recover the corpus sweep after a session-limit mid-run. Persisted workflow scripts live under `C:\Users\user\.claude\projects\<session>\workflows\scripts\` (NOT the repo `.claude`).
- **Bash cwd persists** between calls and `cd` inside a command changes it for later calls — prefer absolute paths; run builds with `cd generalist/web && npm run build`.
- **Don't re-credential:** the generator source is fixed; future content apply/BLUF is clean for generalist. Don't reintroduce ICAEW/chartered self-claims in any new generalist copy.
- Property (`Property/web/`) is the reference implementation for every port — read the equivalent Property file before building a generalist version.
- `.cache/` holds throwaway helper scripts from this session (gitignored): `_selfclaim_list.py`, `selfclaim_list.json`, `_fix_reviewer_*.py`, `_an_check*.py`, `_freshness_*.py`, `_topq*.py`. Safe to ignore/delete.

---

## 10. Verification recipe (per wave, before any deploy)
- **Data freshness:** confirm GSC/Bing rows carry today's date before data-driven work.
- **Build:** `cd generalist/web && npm run build` green.
- **Schema/credentials:** view-source + Google Rich Results / schema.org validator on homepage, a blog post, a category hub, a calculator, a location page — confirm expected types and **zero ICAEW credential claims**. Quick residual check: `rg -n "we are (an )?ICAEW|our ICAEW|as ICAEW[- ]qualified|ICAEW Senior Reviewer|Chartered Accountant \(ACA" generalist/web` should be empty.
- **Honeypot + analytics:** synthetic lead submit lands a `leads` row; `web_sessions` rows for `site_key='generalist'` in prod (synthetic_ prefix isolates test data).
- **Ranking outcome (lagging):** monitored_pages 28-day GSC/Bing verdicts ~4 weeks post-deploy; watch CTR + avg position; re-pull before declaring wins.

---

## 11. Key pointers
- **Plan:** `.claude/plans/partitioned-prancing-hinton.md`
- **Corepage brief (Wave 2 homepage spec):** `briefs/generalist/homepage/index.md`
- **Generalist factual anchor (locked):** `docs/generalist/house_positions.md`
- **Generalist state + rewrite worklist:** `docs/generalist/STATE.md`, `docs/generalist/rewrite_worklist_2026-06-12.md`
- **Engines:** `docs/_engines/REWRITE_PROGRAM.md`, `docs/_engines/SERP_META_PROGRAM.md`, `docs/_engines/AI_SEARCH_GEO_PROGRAM.md`, `docs/_engines/ENGINE_MAP_AND_ONBOARDING.md`
- **Memory (auto-loaded each session):** `estate_credential_claim_risk`, `feedback_rewrite_a_star_overhaul_standard`, `feedback_gsc_freshness_gap_diagnosis`, `feedback_gold_standard_quality_bar`, `feedback_no_em_dashes`, `feedback_no_deepseek_opus_only`, `vercel_cli_deploy_workflow`, `property_program_state`, `generalist_site_current_state`.
- **Gold-standard reference site:** `Property/web/` (port patterns from here).
