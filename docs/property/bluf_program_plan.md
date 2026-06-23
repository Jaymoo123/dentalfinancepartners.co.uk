# BLUF Answer-Box Program — Plan & Reference (Property, estate-reusable)

> Status: **DESIGN ONLY.** Nothing is built or shipped by this document. Every prod/code action below is sign-off-gated. Repo root: `C:\Users\user\Documents\Accounting`. Target site first: Property (`propertytaxpartners.co.uk`), then the other 5 sites via the same `--site` engine.
>
> Two deliverable docs when we execute: `docs/_engines/BLUF_PROGRAM.md` (methodology, reusable) and `docs/property/bluf_program_state.md` (Property state/runbook), structured like `docs/_engines/SERP_META_PROGRAM.md`.

---

## 1. Overview & goal

We will add a **BLUF (Bottom Line Up Front) answer box** to high-impression Property blog pages: a self-contained 40–60 word direct answer to each page's dominant real-user query, placed at the top of the article, restyled as a labelled box, and mirrored into JSON-LD (`speakable` + a lead `acceptedAnswer`) so AI Overviews, featured snippets and Bing Copilot can lift it and **cite us**. The goal is not more clicks (those are vanity at this traffic) — it is to **win the zero-click query by becoming the cited source**. This is a *tighten + restyle + machine-liftable* change to an already-rendering `summary` field, not a new build. **Why now:** the same pages that rank page-1 on Google and earn ~0% CTR (Google answers in-SERP) already convert 8–21% on Bing, proving the pages are good answers Google is simply lifting without crediting us — so the lever is the cited answer, and the engine to do it safely already exists 1:1 in the SERP-meta program.

---

## 2. The evidence (verified this session)

**The zero-click-SERP problem.** Live, 28-day window, `site_key='property'`:

- **Google: 6,541 impressions, 14 clicks total** across 259 pages — roughly **0.5 clicks per week** for the entire site (~0.21% CTR).
- Candidate universe at Google **position ≤ 10 AND impressions ≥ 30: only 11 pages**, and **10 of those are zero-click**.
- The reason is structural: for answer-embedded, source-named queries (what / how much / rate / threshold / deadline; HMRC / GOV.UK / SDLT / LTT / CGT), Google answers inside the SERP (AI Overview / featured snippet / official listing), so the page-1 ranking never converts to a click.

**Bing-vs-Google proof the pages are good.** Same window:

- **Bing: 20,456 impressions, 1,561 clicks (7.6% CTR), 81 pages converting.**
- **6 pages are Google pos ≤ 10 / zero-click AND Bing-converting** — the exact BLUF target pattern (the `welsh-ltt` class: Google ~pos 3, 0 clicks over ~117 impressions, but converts on Bing). These pages are demonstrably good answers; Google just answers in-SERP. They are the highest-value cohort and carry a **built-in Bing control**.

**This is tighten + restyle + machine-liftable, not a new build.** Confirmed against the files:

- A `summary` frontmatter field **already renders on-page** as a plain lead paragraph: `Property/web/src/components/blog/BlogPostRenderer.tsx:273-275` (`<p className="mt-4 text-lg text-slate-700 leading-relaxed">`). It is long/narrative (~110 words on `cgt-rates`) and is **not** in the JSON-LD.
- The site already uses an emerald-600 accent + slate-50 box pattern (the header block at `BlogPostRenderer.tsx:225-228`), so the "Quick answer" box restyle reuses existing tokens.
- The schema builder `Property/web/src/lib/schema.ts` already builds BlogPosting + FAQPage with the exact `acceptedAnswer` shape we need (`schema.ts:38-46`), and the renderer prefers the Python `post.schema` `@graph`, falling back to `buildBlogPostingJsonLd` (`BlogPostRenderer.tsx:161-163`).
- So BLUF = **(1)** tighten `summary` (or a new `bluf` field — see §4) to a 40–60 word self-contained answer to the H1/dominant query; **(2)** restyle as a distinct answer box; **(3)** mirror into structured data so engines extract it.

The corpus is **686 blog `.md` files** (verified). The BLUF target set is the high-impression / page-1-Google / ~0-Google-CTR / healthy-Bing-CTR subset — a few dozen pages, not all 686.

---

## 3. Data-driven decisions

This program has three places where a choice could be a gut pick; all three are forced by data.

### 3.1 LAYER 1 — Format decision (box vs inline vs none): a HYBRID, not an on-site A/B

**Headline ruling (data-forced):** an on-site A/B of BLUF format using Google CTR is **impossible** at Property's traffic (0.5 clicks/week; 11 strong pages, 10 zero-click). You cannot power any click-based test on a denominator of ~0.5 conversions/week. The deterministic-hash A/B framework (`Property/web/src/lib/experiments/`) is therefore used only as a **secondary guardrail**, and the **primary decision metric is an off-site, SERP-observed citation/snippet outcome.**

Three measurement tracks, each scoped to what it can actually decide:

**TRACK A (PRIMARY — decides format): off-site AIO / featured-snippet CITATION SHARE via a matched-pair, staggered (stepped-wedge) rollout — NOT a per-visitor A/B.**
- Assignment unit = the **PAGE (URL)**, not the visitor. The decision is about what crawlers lift, and every crawler sees one rendered DOM. Serving format A to Googlebot and B to Bingbot would be **cloaking, which is banned**.
- Arms across pages, in matched triplets:
  - **A** = labelled "Quick answer" box (emerald-600 accent + slate-50, styled like the header block) WITH the answer mirrored into JSON-LD (`speakable` + lead `acceptedAnswer`).
  - **B** = lighter inline bold lead paragraph + SAME JSON-LD.
  - **C** = HOLDOUT (current narrative `summary`, no schema change) so we can separate the "BLUF effect" from secular AIO drift.
- **Stratified matched triplets:** rank candidate pages (see §3.3) and assign within strata (Google position band, Bing-converting yes/no, topic cluster) so A/B/C are balanced on baseline. **~15 triplets (45 pages)** for the proving cohort.
- **Staggered rollout:** ship triplet-by-triplet over 4–6 weeks; each page is its own pre/post control via the `monitored_pages` baseline, AND A-vs-B-vs-C is the cross-page contrast — two independent readings of the same change.

**TRACK B (SUPPORTING — decides "does anything help on-page at all"): the existing zero-dep experiments framework, repurposed as an ON-SITE ENGAGEMENT A/B (not a SERP test).**
- Register one experiment `bluf_format` in `packages/web-shared/experiments/registries/property.ts` (status `running`; three weights, e.g. control 34 / box 33 / inline 33). Use `makeUseExperiment("bluf_format")` in the BLUF component; `props.exp = "bluf_format:<arm>"` auto-stamps every `web_event` → `vw_experiment_results` + the console dashboard panel.
- Metric = answer-box-in-view → scroll-past / time-to-first-action (`section_view` via the existing IntersectionObserver gating). It answers **"does the box harm or help on-page engagement and lead-start"** — a guardrail, not the format verdict.
- Honest caveat baked into the registry meta: this arm will likely **never reach significance on conversion**; it exists to catch a **harm** signal (box buries content, hurts engaged-read or lead-start), not to pick the winner.

**TRACK C (PRIMARY corroboration): Bing AI Performance Report — `bing_ai_performance.ai_citations` per `page_url`** (already ingested from the GEO program). Bing exposes Copilot citation counts per URL directly — the one place we get a real, quantified, per-page "are we cited" number with no manual SERP labour. Pre/post per page, anchored to its ship date, is the strongest single quantitative signal we have.

**Why citation share, not Google clicks or Bing totals:**
- Google clicks = vanity at this volume; the whole problem is the click never happens because Google answers in-SERP. Optimising for the citation *inside* the AIO is the actual lever.
- Raw Bing totals = breadth-inflated (20k impressions across the corpus); a corpus number can rise from unrelated pages. We score **per-page, paired, survivorship-excluded, net-new tagged out** (mirrors `scripts/property_honest_scorecard.sql` discipline).
- Citation share (manual SERP check for AIO/snippet ownership on the dominant query + `bing_ai_performance.ai_citations`) is the only metric on the causal path between "BLUF rendered" and "we win the zero-click query".

### 3.2 Honest power analysis (and where it forces the design)

**The brutal numbers (live, verified, 28-day, `site_key='property'`):** Google 6,541 impr / 14 clicks (~0.5/week); 11 pages at pos ≤ 10 / impr ≥ 30, 10 zero-click; Bing 20,456 impr / 1,561 clicks (7.6% CTR) / 81 converting pages; 6 pages Google-zero-click but Bing-converting.

- **On-site Google-CTR A/B: power ≈ zero — DO NOT attempt.** To detect even a large absolute CTR lift (0.2% → 1.0%) per page at α=0.05, power 0.8, you need ~thousands of impressions per arm per page. The strongest single candidate has ~117 impressions over the window; pooling all 11 strong pages gives a few hundred impressions/arm with 14 total clicks as the denominator. Time-to-significance: **years.** Excluded by design.
- **On-site engagement A/B (Track B): underpowered for conversion, adequate as a HARM tripwire.** Usable on-site traffic is mostly Bing-sourced; the box might see low-hundreds of in-view exposures/week across all treated pages, split 3 ways. A conversion test needs hundreds of conversions/arm — not reachable. But a proximal, high-base-rate guardrail (box-in-view → engaged-read, base rate ~50–80%) **can** detect a meaningful harm (e.g. a 10–15pt drop) in ~4–8 weeks. Track B is scoped to "does the box hurt engagement", which IS powerable, not "which box converts better", which is not.
- **Track A (citation share / stepped-wedge): the realistic primary, with stated limits.** N is tiny (~11–20 genuinely strong pages), so this is a **precision-weighted observational readout, not a classically-powered RCT.** We do not claim p-values on a 15-triplet design. The decision rests on **effect direction + consistency** across matched triplets and per-page pre/post, plus the Bing `ai_citations` delta — not statistical significance.

**Honest framing (carried into the doc verbatim):** *"We are choosing the format that most consistently wins/holds AIO + featured-snippet ownership and grows `bing_ai_performance.ai_citations` across a small, hand-verified cohort, corroborated by an on-site no-harm guardrail. We explicitly cannot, and do not, claim a significance-tested Google-CTR uplift at this traffic level."*

**Minimum cohort / duration (defensible, stated as such):** proving cohort = 15 matched triplets = **45 pages** (15 box / 15 inline / 15 holdout), stratified. Maturation window: AIO/snippet ownership and Bing citations need crawl + re-rank time — read at **28 days (early signal)** and **56 days (verdict)**, anchored per page to its ship date (matches `monitored_pages` 90-day watch and the meta program's 28d-verdict cadence). SERP labour budget: manual AIO/snippet check on each dominant query at T0, T+28, T+56 (45 × 3 = **135 checks**). This labour is the rate-limiter, which is why the cohort is capped at 45, not the whole corpus.

### 3.3 LAYER 3 — Target-page selection (data-driven SQL: rank-but-no-CTR first)

Two patterns the data confirmed this session:

- **Pattern 1 — Google rank-but-zero-click** (the in-SERP-answered pages BLUF is built for): Google weighted position ≤ 10, impressions ≥ threshold, CTR far below the position-expected CTR (ideally 0 clicks).
- **Pattern 2 — Google-zero-click but Bing-CONVERTING** (the highest-value subset; proves the page IS good): the above AND the same URL earns Bing clicks. **6 such pages exist** (welsh-ltt class). These rank FIRST in the cohort — clearest upside + built-in Bing control.

**SQL approach (READ-only; run via `python scripts/_q.py <file.sql>`).** Mirrors `scripts/property_honest_scorecard.sql` discipline (per-page aggregation, position-weighted, survivorship-aware) and `meta_worklist.py`'s GSC+Bing merge:

```sql
-- bluf_candidates.sql  — pages that rank on Google but get ~0 click (BLUF targets)
WITH g AS (
  SELECT page_url,
         SUM(impressions) g_impr, SUM(clicks) g_clk,
         SUM(position*impressions)/NULLIF(SUM(impressions),0) g_wpos
  FROM gsc_query_data
  WHERE site_key='property' AND date >= current_date - 90
  GROUP BY page_url
),
b AS (
  SELECT page_url,
         SUM(impressions) b_impr, SUM(clicks) b_clk,
         SUM(position*impressions)/NULLIF(SUM(impressions),0) b_wpos
  FROM bing_query_data
  WHERE site_key='property' AND date >= current_date - 90
  GROUP BY page_url
),
-- the single dominant (highest-impression, answer-embedded) query per URL
dom AS (
  SELECT DISTINCT ON (page_url) page_url, query AS dominant_query,
         (clicks::numeric/NULLIF(impressions,0)) AS dom_ctr, impressions AS dom_impr
  FROM (
    SELECT page_url, query, SUM(impressions) impressions, SUM(clicks) clicks
    FROM gsc_query_data WHERE site_key='property' AND date >= current_date-90
    GROUP BY page_url, query
  ) q
  ORDER BY page_url, impressions DESC
),
-- position-expected CTR curve (rough UK organic baseline; tune as needed)
expected AS (
  SELECT page_url,
    CASE WHEN g_wpos<=1 THEN 0.28 WHEN g_wpos<=2 THEN 0.15 WHEN g_wpos<=3 THEN 0.10
         WHEN g_wpos<=5 THEN 0.06 WHEN g_wpos<=10 THEN 0.03 ELSE 0.01 END AS exp_ctr
  FROM g
)
SELECT g.page_url, d.dominant_query,
       g.g_impr, g.g_clk, round(g.g_wpos,1) g_pos,
       round((g.g_clk::numeric/NULLIF(g.g_impr,0)),4) g_ctr,
       e.exp_ctr,
       round(e.exp_ctr - g.g_clk::numeric/NULLIF(g.g_impr,0),4) ctr_gap,
       COALESCE(b.b_impr,0) b_impr, COALESCE(b.b_clk,0) b_clk, round(b.b_wpos,1) b_pos,
       (CASE WHEN COALESCE(b.b_clk,0)>0 THEN 'P2_bing_converting' ELSE 'P1_zeroclick' END) AS pattern,
       round( (e.exp_ctr - g.g_clk::numeric/NULLIF(g.g_impr,0)) * g.g_impr
              * (1 + CASE WHEN COALESCE(b.b_clk,0)>0 THEN 1.0 ELSE 0 END), 1) AS priority_score
FROM g
JOIN expected e USING (page_url)
JOIN dom d      ON d.page_url = g.page_url
LEFT JOIN b     ON b.page_url = g.page_url
WHERE g.g_wpos <= 10
  AND g.g_impr >= 20
  AND g.g_clk::numeric/NULLIF(g.g_impr,0) < e.exp_ctr * 0.4
ORDER BY priority_score DESC;
```

**Practical knobs (low volume):** impressions threshold = **20** (not 100) — the whole corpus is low-volume; this session's pos≤10/impr≥30 set was only 11 pages, so a hard high threshold would starve the cohort. **Cohort build:** take the top ~15 by `priority_score`, **force-include all 6 `P2_bing_converting` pages**, then stratify into matched triplets. **Resolve `page_url` → repo `.md`** with the same slug-matching logic `meta_worklist.py` already implements; feed the resolved files into `bluf_worklist.py`.

### 3.4 LAYER 2 — Is the BLUF COPY itself data-driven? (yes — from the page's dominant real query)

**Principle:** each page's BLUF is not "summarise the page." It is **"answer, in 40–60 self-contained words, the SPECIFIC question real users are already asking THIS URL"**, using only figures already present in the page body. Two data sources, one grounding constraint.

**Derivation pipeline (mirrors the meta program's model tiering):**
1. **PYTHON (data) — `scripts/bluf_worklist.py`** (new, modelled on `scripts/meta_worklist.py`): for each candidate URL, pull the **dominant query** (merge `gsc_query_data` + `bing_query_data` per (page, query), last 90d, sum impressions across engines, keep best position; dominant = highest-impression query that is also answer-embedded / source-named). Record top 1 + 2–3 runners-up (for speakable/FAQ secondary lines). Cross-reference `bing_ai_performance.grounding_queries` (jsonb) for that URL — literally the queries Bing's Copilot is grounding on, the highest-signal "answer this" list available. **Extract candidate answer facts** from the page body: harvest the numeric/date/rate spans already in the HTML so the writer is constrained to on-page truth. Emit a per-page brief `{dominant_query, runner_queries, grounding_queries, body_facts[], current_summary}`.
2. **OPUS (copy):** writes the 40–60 word BLUF that **directly answers `dominant_query`**, leads with the single most-asked figure, uses only `body_facts` (no fabrication), UK English, tax years as `2026/27`, **no em-dashes**, faceless (no named expert). Opus also writes the schema mirror: a `speakable` cssSelector pointing at the box + a lead `acceptedAnswer` identical to the BLUF.
3. **SONNET (QA):** deterministic checks — word count 40–60; **every number in the BLUF exists verbatim in the page body (fail-closed if not — the anti-fabrication gate)**; contains the dominant-query head token; no banned chars/phrases (reuse `optimisation_engine/apply/validators.py`); answers the H1/dominant query (not generic). Reject → back to manager patch.
4. **MANAGER (gate):** spot-reads, approves the batch.

**Anti-fabrication enforcement (hard):** the body-facts harvest (step 1) plus the "every BLUF number must exist verbatim in body" validator (step 3) mean the BLUF can only ever restate what the page already proves. If a dominant query demands a figure the page does not contain, the engine **flags the page as "needs body update first"** rather than inventing the number — a content gap, not a BLUF.

### 3.5 The decision rule (pre-registered before any page ships)

Pre-registered so the choice is not a post-hoc gut pick. Evaluated at the **T+56 verdict** per format arm across the 15-page cohort.

**Inputs:**
1. **CITATION-WIN RATE (primary):** fraction of pages where, on the dominant query, we OWN the featured snippet OR are a NAMED citation inside the Google AI Overview at T+56, given we did not at T0. Manual SERP check.
2. **BING AI CITATIONS DELTA (primary corroboration):** median per-page change in `bing_ai_performance.ai_citations` (T0 28d vs T+56 28d), survivorship-excluded.
3. **ENGAGEMENT GUARDRAIL (Track B):** box arm's engaged-read / box-scroll-past rate must not be materially below holdout (no-harm gate).
4. **REGRESSION GUARDRAIL:** zero `monitored_pages` regressions attributable to the cohort (`detect_monitored_page_regression` on Google AND Bing baselines).

**Rule (in order):**
- **GATE 0 (safety, blocking):** if ANY treated page triggers a `monitored_pages` regression on its **Bing** baseline that survives the 14-day noise window → **PAUSE** the program and roll back that page (Bing is Property's revenue engine — protect it above all). The format decision does not proceed while a Bing regression is open.
- **STEP 1:** compare BOX vs INLINE vs HOLDOUT on citation-win rate.
  - If BOTH box and inline beat holdout by ≥ **+20pp** → proceed to STEP 2.
  - If NEITHER beats holdout by ≥ +10pp at T+56 AND Bing `ai_citations` delta is flat/negative → **VERDICT = NONE.** Do not roll BLUF to the corpus; the lever is the schema/answer content — revisit; do not restyle 686 pages for nothing.
- **STEP 2 (pick format):** choose the higher citation-win rate, requiring: margin ≥ **+13pp** (≈ 2 of 15 pages decisive) over the other arm, AND non-negative Bing `ai_citations` delta, AND engagement guardrail not breached.
  - If box wins on citations but breaches engagement → **prefer INLINE** (don't trade the on-site reader for a SERP feature).
  - If the two arms are within 13pp (a TIE — the likely outcome at n=15) → **default to BOX** (the labelled box is the stronger machine-readable signal for AIO/snippet extraction and is more conservative to style consistently); recorded as a **documented tie-break with a stated mechanism (machine-readability), not a measured win.**
- **STEP 3 (scale gate, sign-off-gated):** roll the chosen format to the next ~30 candidate pages ONLY after user sign-off, re-running the same verdict on the new cohort before any corpus-wide rollout. **Never apply to all 686 pages in one shot.**

---

## 4. The BLUF agent / engine

Mirrors `SERP_META_PROGRAM` 1:1 — `--site` parameterised, dry-run default, sign-off gated.

### 4.1 New scripts (the meta-engine triplet)

- `scripts/bluf_worklist.py --site property [--days 90] [--cap N] [--min-impressions 10] [--zero-click-only]` — always read-only.
- `scripts/bluf_apply.py --site property --proposals <json> [--execute]` — **dry-run default**, identical pattern to `meta_apply.py`.
- `scripts/register_bluf_batch.py` — thin wrapper / new `--change-kind bluf` flag on `register_monitored_batch.py`.

### 4.2 Pipeline (stages)

**STAGE 0 — SEQUENCING GUARD (manager, before any BLUF work).** The **528 uncommitted files** (the 518-page reviewer-claim removal + `Property/niche.config.json`) are local on the working tree. BLUF must NOT tangle with them. Manager first commits/deploys that change (user sign-off), confirms `git status --porcelain Property/web/content/blog` is clean, then branches `bluf-program`. Hard precondition: **`bluf_apply.py` refuses to run if `git status --porcelain Property/web/content/blog` shows pre-existing modifications it did not make** (prevents diff entanglement).

**STAGE 1 — DATA LAYER (Python, free).** `bluf_worklist.py` reuses `meta_worklist.py` machinery verbatim (`_merge_queries` GSC 90d + Bing latest, `_build_slug_index` over `Property/web/content/blog`, `_resolve_page_url`, `_expected_ctr`). BLUF-specific scoring (target = zero-click answer loss, not generic CTR shortfall). Per resolved page compute `dominant_query`, `google_pos/impr/clicks/ctr`, `bing_pos/impr/clicks/ctr`, plus:
- `zero_click_signal = (google_pos <= 5) AND (google_ctr < 0.02) AND (google_impr >= min-impressions)`
- `bing_converts = bing_ctr >= 0.05`
- `answer_extractability` = is the dominant_query answer-embedded/source-named (regex: starts with what/how much/when/is/are/rate/threshold/deadline, or names HMRC/GOV.UK/SDLT/LTT/CGT) — the queries AIO/snippets steal.
- `Score = google_impr * (expected_ctr(google_pos) - google_ctr) * extractability_weight`, strong boost when `bing_converts`.
- `bluf_already_present` flag (idempotency).
- Pull current `summary`, `h1`, dominant_query, and extract **`body_figures`** (regex over HTML body: `%`, `£`, dates, tax-year tokens, rates like 18%/24%, thresholds) — the allowlist of figures that legitimately exist on the page.
- Writes `.cache/bluf_program/property/worklist.json` + `docs/property/bluf_register_<YYYY-MM-DD>.md` (register-only, no action; lists zero-click winners, extractability, Bing-conversion proof, and EXCLUDED rows: net-new <90d, already-bluf'd, TSX-routed core/HP-lock, no body figures). `welsh-ltt` is the canonical example row.

**STAGE 2 — FORMAT DECISION (data-driven; see §3.1/§3.5).** Register `bluf_format` in `packages/web-shared/experiments/registries/property.ts`. `BlogPostRenderer` calls `useExperiment("bluf_format")`; the render branches on the arm; exposure auto-stamps `exp` on every `web_event`. The **content layer is format-agnostic** — the `bluf` data is written once; the component renders whichever arm the visitor/page is assigned. Format ships site-wide only after the §3.5 verdict.

**STAGE 3 — COPY (Opus 4.8, ONE batched subagent, never per page).** Input: `worklist.json` (dominant_query, h1, current summary, `body_figures` allowlist, page body). Output `.cache/bluf_program/property/proposals.json`: one 40–60 word self-contained BLUF per page that directly answers the H1/dominant query, leads with the specific figure, uses ONLY `body_figures` (no fabrication), UK English, tax years `2026/27`, no em/en-dash, no hype, faceless. Also emits a short `blufAnswer` schema string (may be tighter than the on-page box for speakable/Q&A) + the `primary_query` it targets.

**STAGE 4 — QA (Sonnet, ONE adversarial subagent).** Per proposal, fail-closed: length 40–60 words; every figure ∈ `body_figures`; answers the dominant_query (token alignment); self-contained (no "as above"/"this guide"); no protected-title/reviewer/credential claim; no em-dash/hype; UK English; tax-year format; meaningfully different from current summary; not a duplicate of metaDescription. Verdicts → `.cache/bluf_program/property/qa_verdicts.json`. **Manager adjudicates "fix" verdicts and patches `proposals.json` directly via a Write-tool script (no second Opus round)**, per `SERP_META_PROGRAM` step 4. Manager context stays FLAT (agents return counts + flags, not prose). Gotcha: **never pipe £/non-ASCII Python through PowerShell stdin** — write patch scripts to files.

**STAGE 5 — APPLY (Python, sign-off gated).** `bluf_apply.py` dry-run default; `--execute` applies. `OPTIMISATION_AUTO_COMMIT` default-off respected.

**STAGE 6 — BASELINE.** `register_bluf_batch.py` captures 90-day Google + Bing baselines into `monitored_pages` (change-kind `bluf`); `detect_monitored_page_regression` watches for 90 days. Additionally snapshot `bing_ai_performance.ai_citations` per target URL as the GEO/citation baseline (the real win condition).

**STAGE 7 — SHIP (user sign-off, NOT auto).** `npm run build` in `Property/web` green; `scripts/track2_link_audit.py` + predeploy gate; one commit on `bluf-program`; merge; `vercel deploy --prod` (Property project, Root Directory `Property/web`); spot-check live rendered box + view-source JSON-LD; IndexNow via `scripts/deploy-and-index.ps1`.

**STAGE 8 — READ RESULTS (honesty-locked).** Verdict at 28d/56d/90d on: (1) `bing_ai_performance.ai_citations` delta on BLUF'd URLs (primary); (2) AIO/featured-snippet citation share where observable; (3) paired like-for-like Google CTR vs a matched untouched control, survivorship-excluded, net-new tagged out; (4) engagement/lead hold via the experiment. **NOT** raw Google clicks (vanity) and **NOT** raw Bing totals (breadth-inflated). `weekly_run` step 5 auto-reviews `optimisation_changes` outcomes at 28d.

### 4.3 Model tiering (locked)

- **PYTHON (free, deterministic):** all data/validation/apply/baselines — `bluf_worklist.py`, `bluf_apply.py`, `register_bluf_batch.py`. No LLM touches data selection or apply (reproducible, auditable).
- **OPUS 4.8:** the 40–60 word BLUF copy, ONE batched subagent per site (never per page). The BLUF is the load-bearing liftable answer (gold-standard bar; hardest reasoning slice) — Opus is the only model allowed to author it.
- **SONNET:** independent adversarial QA + any one-off tooling authorship, ONE subagent. Never writes shipping copy; only red-teams it.
- **MANAGER:** orchestrate, sequence around the uncommitted credential change, run Python, dispatch the two subagents, adjudicate QA fixes by patching `proposals.json` directly, run build + link audit + predeploy, hold the deploy at the user sign-off gate. Context stays flat.
- **HAIKU:** banned from all content writing (estate rule).
- **Rationale for sign-off (not full-auto):** the GEO full-auto override does **not** cover BLUF; given the cautious tone and a 686-page corpus, every prod/code change (apply `--execute`, build, deploy) is sign-off-gated. Local-first throughout; dry-run default.

### 4.4 Data model (storage)

**ADD a new `bluf` frontmatter field; do NOT overload `summary`.** Reasons grounded in the code:
1. `summary` is already doing a distinct job — it renders as the narrative lead paragraph (`BlogPostRenderer.tsx:273-275`) AND is reused as the card teaser on listing/related pages (`page.tsx:88-91` passes `r.summary` into related cards). Tightening `summary` to 40–60 words would degrade card teasers and erase the narrative intro. Keeping both lets the answer box and the human intro coexist (or the box can replace the intro per arm without touching the teaser source).
2. A dedicated field is cleaner for idempotency, rollback (`bluf_prev`) and the worklist's `bluf_already_present` skip.

**Frontmatter shape (new fields, all optional → 686 pages unaffected until touched):**
```yaml
bluf: "<40-60 word self-contained direct answer>"
blufQuery: "<the dominant query this answers>"   # provenance / alignment audit
bluf_prev: "<previous value>"                     # rollback; set only on re-apply
# dateModified is already stamped by the lifecycle
```

**Type change — `Property/web/src/types/blog.ts`, extend `BlogFrontmatter`:**
```ts
bluf?: string;
blufQuery?: string;
bluf_prev?: string;
```
Additive optional fields; no existing page breaks. Mirror later into the other 5 sites' `blog.ts`.

### 4.5 Render + schema changes (verified against the files)

**Current flow:** `app/blog/[category]/[slug]/page.tsx` → `BlogPostRenderer` (`dynamicParams=false`, all 686 prebuilt). Inside: `jsonLd = post.schema?.trim() || buildBlogPostingJsonLd(post, path)` (`161-163`), injected via `<script type="application/ld+json">` (`209-212`). Header renders `summary` as a plain `<p>` (`273-275`) with emerald-700 accents nearby. **One injection point, one place to add the box — both in `BlogPostRenderer`**; per-page `page.tsx` files are not in the dynamic-route path.

**Render changes (`BlogPostRenderer` only):**
1. Add an answer-box render under the header meta `div`, before/around the summary `<p>` (~line 273), with **`id="bluf"`** so `speakable` cssSelector and `section_view` can target it.
2. Branch presentation on `useExperiment("bluf_format")` — **control** = today's summary paragraph; **A** = labelled emerald/slate-50 "Quick answer" box (small eyebrow label + the 40–60 word answer + `aria-label`); **B** = bold inline lead merged into the lead paragraph. Server/first-render returns null (control) per the hook's hydration-safe contract → no hydration mismatch.
3. Instrument the box with the existing `section_view` IntersectionObserver pattern (stable id `bluf`) so view → engagement is captured.
4. **Guard:** render the box only when `post.bluf` is non-empty; otherwise **byte-for-byte current behaviour** (zero regression on untouched pages).

**Schema changes (two paths, MUST agree):**
- **Fallback builder — `schema.ts` `buildBlogPostingJsonLd`:** when `post.bluf` set, (i) add `speakable: { @type: SpeakableSpecification, cssSelector: ["#bluf"] }` to the BlogPosting, and (ii) **prepend a lead Q&A** to the FAQPage `mainEntity` (Question = `post.blufQuery || post.h1`, `acceptedAnswer.text = post.bluf`); if no faqs exist, emit a single-entry FAQPage from the BLUF. Reuses the existing `acceptedAnswer` shape (`schema.ts:38-46`).
- **Python EEAT path — `optimisation_engine/apply/_schema_generator.build_eeat_schema`:** inject the identical `speakable` selector + lead `acceptedAnswer` from `fm['bluf']/fm['blufQuery']` into its `@graph`, because `stamp_trust_signals` regenerates `fm['schema']` when canonical exists — **without this, the lifecycle would silently drop the BLUF from the graph.**

**Net component/type footprint (surgical):** 1 types file (+3 optional fields), 1 component (box render + `section_view` id), 1 fallback schema builder (speakable + lead Q&A), 1 Python schema generator (same injection), 1 experiment registry entry. **No new route, no body edits.**

**Wiring validation:** after a dry-run/local apply on a handful (`welsh-ltt` + cgt cohort), `npm run build` green, then view-source / a tiny node assertion that the rendered `<script type=ld+json>` contains `speakable` + the `acceptedAnswer` text, on BOTH a page using `post.schema` and one using the fallback builder. Google Rich Results / Schema validator spot-check on `welsh-ltt` before the full batch. **Faceless:** the box and schema carry NO named reviewer/credential; the lead Q&A uses only the question + body-grounded answer.

### 4.6 Apply lifecycle (reuse the meta_only pattern; surgical frontmatter, never a body edit, no auto-commit)

`bluf_apply.py` is a near-clone of `meta_apply.py` with `change_type = "bluf_answer_box"`:
1. Input `proposals.json`: `[{slug, file, bluf, blufQuery, primary_query, rationale}]`.
2. **Validation (fail-closed; reuse `optimisation_engine/apply/validators.py` + new BLUF checks):** file_exists; frontmatter readable; **word count 40–60** (new word-count validator); `no_banned_chars` (em/en-dash); `no_banned_phrases` + extend BANNED with credential/protected-title tokens (`ICAEW`, `Chartered`, "our expert", named-reviewer) so a credential claim can never leak; `contains_token(bluf, blufQuery)` alignment; **figures-in-body grounding** (every £/%/year token in BLUF appears in the page body — Python re-verifies the QA grounding at apply time, independent of the LLM); meaningful-change (`bluf != current summary`, `bluf != metaDescription`).
3. **Apply via `run_apply_lifecycle` + an inline `_edit_fn` over `fm_read/fm_write`** (atomic temp + `os.replace`), mirroring `meta_apply._apply_one`:
   - if `fm['bluf']` exists, move it to `fm['bluf_prev']` (rollback path).
   - set `fm['bluf']` = new, `fm['blufQuery']` = query.
   - stamp `dateModified` (today) + refresh the machine-liftable schema **via a BLUF-specific edit that does NOT re-run the EEAT reviewer rebuild** (see Safety §6 — the landmine). The schema gets the `speakable` + lead Q&A only.
   - **BODY passed through untouched** (`before_body`) — never edited. Enforced: a post-write assert that body bytes are unchanged.
4. **Lifecycle guarantees inherited for free:** `backup_file` before edit; restore on exception; atomic write; `optimisation_changes` audit row (`change_type='bluf_answer_box'`, `auto_applied` per flag) with before/after snapshots; `OPTIMISATION_AUTO_COMMIT` default-off. Backups cleaned on success, restored on failure.
5. **Dry-run default:** validates + prints the would-be answer per page and writes `.cache/bluf_program/property/apply_results.json {applied, rejected:[{slug,reasons}]}`; `--execute` required to write.

**The component/type/schema code changes** (`types/blog.ts`, `BlogPostRenderer.tsx`, `schema.ts`, `_schema_generator.py`, experiments registry) are a **one-time code change** on `bluf-program`, applied by the manager directly (NOT by `bluf_apply.py` — the script only ever touches frontmatter). They ship once; thereafter every batch is pure frontmatter. This keeps the "surgical frontmatter + one component" boundary clean, and the content rollback story (`bluf_prev`) is independent of the code change (`git revert` of the branch).

**Scope exclusions enforced by the worklist (HP-lock + safety):** homepage, `/for-*`, calculators, any TSX-routed core page never enter proposals (no resolvable `.md`); net-new pages <90d tagged out (ranking-maturation); pages already carrying `bluf` skipped unless `--re-bluf`.

### 4.7 Idempotency, resumability, candidate-list driven, dry-run default

**Invocation (one cycle, from repo root):**
1. Manager: confirm git clean (Stage-0 guard) + on `bluf-program`.
2. `python scripts/bluf_worklist.py --site property` → `worklist.json` + `docs/property/bluf_register_<date>.md`.
3. Opus subagent → `proposals.json`; Sonnet subagent → `qa_verdicts.json`; manager patches `proposals.json`.
4. `python scripts/bluf_apply.py --site property --proposals .cache/bluf_program/property/proposals.json` (dry-run: validates, prints, writes `apply_results.json`, changes nothing).
5. `python scripts/bluf_apply.py --site property --proposals ... --execute` (frontmatter only, after sign-off).
6. `python scripts/register_bluf_batch.py --site property --slugs <applied> --commit` (baselines).
7. `npm run build` (Property/web) + link audit + predeploy gate → sign-off → deploy → IndexNow.

**Idempotency:** worklist deterministic from DB + repo state (re-run overwrites; `bluf_already_present` per page; `--re-bluf` to re-include). Apply: re-applying an identical proposal is a no-op (`meaningful-change` validator); `bluf_prev` set only on real change → repeated runs never corrupt the rollback field. `register_bluf_batch` inherits `register_monitored_batch.py` idempotency (`SKIP(exists)`). Dedupe proposals by `file` (keep highest-scored) before apply (same gotcha as the meta engine).

**Resumability:** the cycle is file-staged in `.cache/bluf_program/property/` (`worklist → proposals → qa_verdicts → apply_results`). A crash resumes from the last artifact; `apply_results.json {applied}` lets a re-run process only the remainder. No in-memory state across stages.

**Candidate-list driven:** nothing is edited that is not an explicit row in `proposals.json` (derived from `worklist.json`, which excludes core/HP-lock/net-new/no-figure pages). `docs/property/bluf_register_<date>.md` is the human-readable, action-free record of what was selected and excluded and why.

---

## 5. Phased rollout (canary → waves)

The corpus is **686 pages**; the BLUF target set is a few dozen (most pages are not zero-click-afflicted). Never touch the whole corpus at once.

- **WAVE 0 — SHADOW / DRY-RUN (0 pages live):** run the full engine over the entire candidate set in dry-run; produce the proposals + rejects manifests; eyeball every proposal. No writes. Confirms the data pick and surfaces near-dupes / stale figures / credential poison before anything is touched.
- **WAVE 1 — CANARY (N = 3–5 pages):** the highest-signal cleanest exemplars (`welsh-ltt` cluster; `cgt-rates`). Apply → all per-execute + per-wave gates → user sign-off → deploy → IndexNow → `register_monitored_batch` (Google+Bing 90-day baselines) → `bluf_format` experiment live. **Monitor window:** hold ≥ 14 days (grace) + ideally 28d for a CTR/citation read before expanding. Expand only if `detect_monitored_page_regression` is clean AND citation-share/paired-CTR is not negative.
- **WAVE 2 — SMALL EXPANSION (~10–15 pages):** only if Wave 1's window is green. Same gate chain, own monitored batch, own commit, own deploy sign-off. (This + Wave 1 build toward the **45-page / 15-triplet proving cohort** of §3.)
- **WAVE 3+ — ROLLING WAVES (~20–30/wave):** continue only while each prior wave's verdict is non-negative; never start a wave while a prior wave is inside its grace window unflagged. Each wave is an isolated git commit + its own monitored batch + its own experiment cohort, so blast radius is always one wave. **Corpus-wide rollout is itself a separate sign-off gate after the §3.5 STEP 3 verdict.**

Because edits are frontmatter-only and body-sha-locked, the maximum technical blast radius of a bad apply is "summary/schema fields on the pages in the current wave", recoverable by `git revert` of one commit.

---

## 6. Safety — "nothing gets destroyed"

### 6.1 "Destroyed" defined + failure-mode taxonomy (HARD = block batch)

"Destroyed" = any state where a BLUF apply leaves a page worse than before in a way the operator did not consent to.

| # | Failure mode | Detection (HARD unless noted) |
|---|---|---|
| 1 | **Body loss/mutation** (any byte of raw-HTML body changes) | In `_edit_fn`, capture `before_body` and `after_body`; **assert `sha256(before)==sha256(after)`** → raise → lifecycle restores `.bak`. The single strongest guarantee; a literal assertion, not a comment. |
| 2 | **Frontmatter/YAML corruption** (unparseable, lost fields, date/list coercion) | `yaml_round_trip()` post-write; key-set diff assert `set(before_fm) ⊆ set(after_fm)`; every pre-existing key except `{bluf, bluf_prev, blufQuery, schema, dateModified}` byte-identical. (Re-order/re-quote is benign; value mutation is not.) |
| 3 | **Broken/stale JSON-LD or RE-INTRODUCED ICAEW claim** | `json.loads(after_fm['schema'])` parses; **credential-poison scan**: serialized schema + frontmatter must NOT contain `ICAEW`, `Chartered Accountant (ACA`, `Qualified Senior Reviewer`, `icaew.com`. **This is the #1 landmine — see §6.6.** |
| 4 | **Build break** | `npm run build` in `Property/web` exits 0 after the wave's files written, before any commit/deploy. |
| 5 | **Broken internal links** | `scripts/track2_link_audit.py` / predeploy gate = 0 HARD 404 (runs regardless; BLUF can't create links but the gate is the deploy contract). |
| 6 | **Ranking/CTR regression** (slow killer) | Post-deploy, time-gated: `register_monitored_batch` per wave, then `detect_monitored_page_regression` after `grace_days=14`: clicks_drop_ratio 0.5, position_drop 5, **bing_position_drop 3**. Bing is the PRIMARY signal. |
| 7 | **Duplicate-content / cannibalisation** (near-identical BLUFs) | Cross-batch near-dup detector: normalise each proposed BLUF, pairwise token Jaccard + 5-gram shingle overlap across the proposal set AND vs all shipped BLUFs; flag any pair > 0.80 for rework before apply. |
| 8 | **Stale-figure re-introduction** | Figure-in-body validator (every £/%/year token in BLUF appears verbatim in body) PLUS a stale-figures denylist scan (13.8%/£9,100 employer NIC, `45p` mileage, superseded dividend rates per ground-truth memories) — any hit = HARD reject. |
| 9 | **Em-dash / hype** | Reuse `validators.no_banned_chars` (— –) + `no_banned_phrases`. |
| 10 | **Over-truncation / meaning loss** | Length-band (40–60 HARD); self-containment lint (no leading demonstrative/pronoun); Opus QA confirms no material caveat dropped. WARNING + human gate, not silent auto-pass. |
| 11 | **Protected-field clobber** (title/h1/metaTitle/metaDescription/slug/canonical) | `no-protected-title` validator: those fields byte-identical before vs after. |
| 12 | **Partial-batch / torn state** | Per-file `.bak` (lifecycle), idempotent re-run (`bluf_prev` presence = already done), and the `git tag` baseline as the floor. |

### 6.2 Pre-flight gates (ordered, fail-closed)

**PRE-FLIGHT (once, before the program):**
- **P0 — CLEAN BASELINE:** the 528 uncommitted files (518-page credential fix + `niche.config.json`) MUST be committed first (§6.6). Then `git tag bluf-baseline-pre <sha>` and record the sha in the state doc. `git status` clean before any BLUF batch — every BLUF diff isolated and revertable.
- **P1 — FIX THE LANDMINE (§6.6):** patch `optimisation_engine/apply/_schema_generator.py` property `reviewer` block to remove ICAEW/Chartered strings + drop ICAEW `memberOf` — OR (preferred) give BLUF a bespoke `_edit_fn` that writes `summary`/`bluf` + a minimal `speakable`/`acceptedAnswer` schema patch only, and **never calls the EEAT reviewer/schema rebuild.** Gated by the credential-poison scan (#3).

**PER-BATCH DRY-RUN GATES (default mode, writes nothing):** G1 file_exists + fm_read parses; G2 length 40–60 + self-containment + no_banned_chars + no_banned_phrases; G3 figure-in-body; G4 stale-figures denylist (0 hits); G5 credential-poison scan on BLUF AND schema patch (0 hits); G6 near-duplicate vs batch + shipped (0 pairs > 0.80); G7 no-protected-title; G8 change_is_meaningful. Any G-failure → slug REJECTED to manifest, batch continues (per-page isolation).

**PER-EXECUTE GATES (only on `--execute`, per file):** E1 `.bak` written; E2 **body sha256 before==after** (HARD, raises → restore); E3 protected fields byte-identical (HARD); E4 `yaml_round_trip` + `json.loads(schema)` post-write (HARD); E5 `bluf_prev` preserved.

**PER-WAVE GATES (after files written, before commit/deploy):** W1 `npm run build` green; W2 `predeploy_gate.py --site property` exit 0; W3 JSON-LD validates (Rich Results structural parse); W4 Opus QA sign-off on the wave's BLUFs; **W5 explicit USER SIGN-OFF before `vercel deploy --prod`.**

### 6.3 Validators (reuse, don't reinvent)

A new `optimisation_engine/apply/bluf_validators.py` composed with the shared validators. **Reused as-is:** `no_banned_chars`, `no_banned_phrases`, `char_limit` (adapted), `file_exists`, `yaml_round_trip`; `frontmatter_utils` read/write (atomic, body-preserving), `verify_round_trip`; `base.py` `backup_file`/`restore_file`/`run_apply_lifecycle`. **New (each returns `(ok, detail)`, fail-closed):** `body_unchanged` (sha256 — the keystone), `protected_fields_unchanged`, `word_count_band(40,60)`, `self_contained`, `figures_in_body`, `no_stale_figures`, `no_credential_poison` (run on BLUF AND serialized schema — guards #3), `schema_json_valid`, `near_duplicate(threshold=0.80)`, `summary_meaningful`.

### 6.4 Blast radius

Canary → waves, never the corpus at once (see §5). Cross-cutting controls: per-page `.bak` (instant single-page revert), per-wave git commit (wave-level revert), the `bluf-baseline-pre` tag (program-level floor).

### 6.5 Rollback (four nested layers, fastest first)

- **LAYER 1 — PER-PAGE INSTANT (no git):** every applied page carries `bluf_prev`. `python scripts/bluf_apply.py --site property --revert <slug>` swaps `bluf ← bluf_prev`, restores the pre-BLUF schema, re-runs body-sha + yaml gates, writes a `reverted` audit row. Mid-apply, the lifecycle `.bak` auto-restores any file whose `_edit_fn` raised.
- **LAYER 2 — PER-WAVE GIT REVERT:** each wave is one commit. `git revert <wave_sha>` (or `git checkout bluf-baseline-pre -- <wave files>`) backs out a whole wave cleanly. Then re-build + re-deploy + IndexNow the reverted URLs.
- **LAYER 3 — PROGRAM FLOOR:** `git checkout bluf-baseline-pre -- Property/web/content/blog` restores every page's frontmatter to pre-BLUF in one command (the documented nuclear option).
- **LAYER 4 — MONITORING-DRIVEN AUTO-FLAG:** `detect_monitored_page_regression` in `weekly_run` flags a page; the operator triages (engine never auto-reverts — per the detectors-triage-then-Claude-reasons rule).

**Rollback decision criteria (any one, after `grace_days=14`, ideally at 28d):** Google clicks −50% vs baseline OR Google avg position +5 places; **Bing position +3 places (Bing is primary)**; paired/like-for-like CTR (survivorship-excluded, net-new out) net-negative across the wave; AIO/featured-snippet citation share FELL (`bing_ai_performance` citations down — thesis failed for that page). **Any structural alarm at any time** (build break post-deploy, invalid JSON-LD, a credential-poison/stale-figure string found live, broken link) → immediate Layer 1/2 revert, no waiting. **Bing-first circuit breaker:** any sustained Bing regression past the 14-day window PAUSES the whole program and rolls back that page ahead of any Google consideration. If neither format A nor B beats control on citation-share + CTR → revert the wave and stop the program.

### 6.6 Sequencing around the uncommitted credential fix (BLOCKING)

The **528 uncommitted files** = the credential fix (518 pages: `reviewedBy`/`reviewerCredentials` ICAEW → editorial-team) + `Property/niche.config.json`. BLUF MUST sequence around it:

- **STEP 1 — LAND THE CREDENTIAL FIX FIRST.** Do NOT start BLUF on an uncommitted 518-page diff. Recommended: **commit-first** — review the 528-file diff (confirm it only touches `reviewedBy`/`reviewerCredentials` + the config), get user sign-off, commit on `property-credential-fix`, build green, then deploy or merge to the BLUF baseline; then `git tag bluf-baseline-pre`. (Alternative: branch-isolate BLUF off the credential-fix commit — still requires the fix committed first.) Reason: a BLUF apply + the credential edit on the same file would produce an entangled, un-bisectable diff, and a failed body-sha would be ambiguous.
- **STEP 2 — KILL THE RE-POISON SOURCE (blocking, before any apply).** `optimisation_engine/apply/_schema_generator.py` property profile still hardcodes the removed ICAEW reviewer (name `ICAEW Qualified Senior Reviewer`, jobTitle `Chartered Accountant (ACA, ICAEW)...`, org `memberOf` ICAEW, ~lines 72, 85–86). `base.py` `stamp_trust_signals()` rebuilds `reviewedBy` + the JSON-LD `schema` from this profile on EVERY apply. If BLUF reuses the stock lifecycle unchanged, it would **silently re-stamp the exact strings the credential fix removed** onto every page it touches — undoing STEP 1 page by page. Fix: (i) patch the property profile to editorial-team values + drop ICAEW `memberOf` (estate hygiene), AND/OR (ii, preferred) give BLUF a bespoke `_edit_fn` that writes ONLY `bluf` + a minimal `speakable`/`acceptedAnswer` schema node and never calls the reviewer/EEAT rebuild. The credential-poison validator (G5/E-gate) is the backstop that HARD-fails if the regression sneaks back.
- **STEP 3 —** only after STEP 1 (clean tagged baseline) + STEP 2 (no re-poison) → Wave 0 dry-run → Wave 1 canary.

---

## 7. Monitoring & success

### 7.1 Baselines (captured per page BEFORE each wave; anchored to each page's go-live)

Stored via existing `monitored_pages` machinery + one additive manual-audit layer:
1. **Google:** clicks / impressions / impression-weighted position (trailing 90d GSC). Reuse `register_monitored_batch.py gsc_baseline()` → `monitored_pages.baseline_*`. The survivorship anchor: a page enters the paired comparison only if it has GSC impressions in BOTH pre and post windows.
2. **Bing:** clicks / impressions / weighted position (latest `bing_query_data`). Reuse `bing_baseline()` → `monitored_pages.baseline_bing_*`. **Bing is the PRIMARY organic-CTR guardrail** (pages convert 8–21% there).
3. **Bing AI / Copilot citations:** `ai_citations` + `grounding_queries` from `bing_ai_performance` (the closest machine-readable proxy for AI-answer ownership). Pre-go-live row = the baseline (weekly snapshots accrue via `BingAiPerformanceFetcher` in `weekly_run`).
4. **Google AIO / featured-snippet ownership:** NO API gives this → capture MANUALLY per page at baseline into a new lightweight `bluf_serp_audit` register: `slug, dominant_query, date, aio_present, aio_cites_us, aio_other_sources[], featured_snippet_present, fs_owner (us/competitor/none), serp_screenshot_path`, plus the assigned format arm + BLUF word count + experiment key. Logged-out UK SERP (Serper `gl=gb` where it returns the block, else manual incognito; record method per row).
5. **On-site engagement:** trailing-28d baseline from `web_sessions`/`web_events` per treated `page_url` — scroll-depth (`section_view`), median time-on-page, lead-form starts/submissions stitched to the page.

Registering a wave = `register_monitored_batch.py --slugs ... --commit` (notes `'BLUF wave N'`) for Google+Bing+regression baselines, then one `bluf_serp_audit` baseline row per page. Net-new pages tagged OUT (notes ILIKE `'%net-new%'`).

### 7.2 Success metrics (REAL vs VANITY; 28d signal / 56–90d verdict, anchored per page)

**PRIMARY (REAL) — AIO / featured-snippet CITATION SHARE.** Google CTR here is near-zero and underpowered, so clicks cannot be the headline. Two reads:
- **(a) Manual SERP audit:** % of treated pages that gain an AIO citation OR own the featured snippet for the dominant query, vs the T0 baseline (typically ~0 cited / competitor-owned). **Target: 28d ≥ 25% of treated pages gain a citation/snippet; 56–90d ≥ 40%.** Powered by share-of-pages, so a small wave still yields a readable number.
- **(b) Bing AI / Copilot citations (REAL, machine-read):** net change in `ai_citations` treated vs untreated over matched windows; report as **delta-of-deltas** so an estate-wide Copilot trend cannot masquerade as a BLUF win.

**SECONDARY (REAL) — paired CTR change, treated vs untreated, like-for-like.** `property_honest_scorecard.sql` discipline: per-page symmetric pre/post, survivorship-excluded, net-new out, MEDIAN per-page delta as headline (mean/weighted shown but not headline), matched untreated control. Target: treated median CTR delta beats untreated by a positive margin at 90d. Never chase raw Google click totals.

**SECONDARY (REAL) — Bing organic CTR HOLD.** Bing is where these pages convert: the bar is "do no harm" — Bing CTR and position stay within noise. A BLUF that wins Google AIO but dents Bing is a net loss.

**SECONDARY (REAL) — on-site engagement + leads.** Treated-page scroll-depth, time-on-page, lead-form starts/submissions hold or rise. Leads are the ground-truth business metric; target = treated lead rate ≥ baseline (the box must not satisfy the user in-box and suppress the scroll to the CTA).

**FORMAT-DECISION METRIC (REAL, gates rollout):** the A-vs-B choice decided via the experiments framework, ordering: (1) does either arm lift AIO/FS citation share or Bing AI citations, then (2) engagement/lead hold. Pick the arm that wins citation share without hurting engagement/leads.

**VANITY (track but NEVER headline, explicitly labelled):** raw Google clicks/impressions totals (underpowered + zero-click distorted); raw Bing totals (breadth-inflated); total estate AIO appearances unadjusted for the control; word-count / "pages shipped".

### 7.3 Regression guardrails ("nothing destroyed across 686 pages")

Mostly REUSE `detect_monitored_page_regression` (wired into `weekly_run`), so BLUF pages inherit the net once registered:
1. **Google CTR/clicks/position drop** — existing thresholds: clicks −50% OR position +5, after 14-day grace → opportunity surfaced; manager reviews; revert candidate.
2. **Bing position/CTR drop** — Bing arm, position +3; **higher severity than Google; pause further waves until triaged.**
3. **Impressions collapse** — impressions −50% on a treated page = red flag for schema/duplicate problem → immediate manual SERP + GSC coverage check.
4. **Engagement / scroll drop** (self-inflicted: BLUF answers so well they leave) — weekly query over `web_events` vs the engagement baseline; flag if median scroll-depth or lead-start rate drops > 20% with stable sessions → favours Format B if Format A is the culprit.
5. **Build / schema break** — BLOCKING predeploy gate (`npm run build` + JSON-LD validity; BLUF must not duplicate/conflict with the existing FAQ `acceptedAnswer`). A gate, not a watch.
6. **Link break** — `scripts/track2_link_audit.py` in the predeploy gate (BLOCKING).
7. **Duplicate-content / boilerplate** — enforce per-page-unique BLUF (no shared template sentence); watch GSC coverage ("Duplicate without user-selected canonical") + impressions collapse → any duplicate flag pauses the wave; offending BLUF rewritten unique.
8. **Fabrication guard** — pre-apply BLOCKING: every figure in the BLUF already in the body; no em-dashes; UK English; tax years `2026/27`; faceless. Fails block the apply.

**Global rollback:** `meta_apply.py`-style lifecycle (`bluf_prev`, `dateModified`, atomic write, audit row) → any page reverts to its exact prior value. Waves small and staged → a regression is contained to one cohort. All prod deploys SIGN-OFF GATED.

### 7.4 Manual AIO-citation audit (the PRIMARY-metric source)

No API returns Google AIO citation share, so this is a disciplined manual/Serper process feeding `bluf_serp_audit`.
- **Cadence:** per page at T0 (baseline, before go-live), T1 (28d), T2 (56–90d), plus a wave-level spot re-check at the weekly report if a page newly flips ownership.
- **Unit:** one dominant query per page (the query the H1/BLUF answers), locked at baseline so T0/T1/T2 are comparable.
- **Procedure per page (reproducible):** (1) pull the SERP for the dominant query, **UK locale, logged-out, desktop** (Serper `gl=gb` where it returns the block; else manual incognito; record method per row); (2) record `aio_present`, `aio_cites_us`, `aio_other_sources[]`, `featured_snippet_present`, `fs_owner`, screenshot path; (3) derive per-wave **CITATION SHARE = count(aio_cites_us OR fs_owner=us at T1/T2) / count(treated)**, and **GAIN = share − T0 share** (report gain, not absolute, so pre-owned snippets don't inflate); (4) cross-check with `bing_ai_performance.ai_citations` + `grounding_queries` over the matched window — if Google manual reads and Bing Copilot citations move together, confidence is high; if they diverge, flag for human re-judgement.
- **Sampling for scale:** a 10–15-page proving wave is audited 100% at T0/T1/T2. For larger waves, audit 100% at T0 (cheap, one-time) and a fixed random + all-high-impression sample at T1/T2, with Bing AI citations covering the full cohort machine-side. Keep the audited sample stable across T1/T2.
- **Honesty rules baked in:** always report GAIN vs a matched untreated control audited the same way; exclude net-new; label as human-judged with screenshot evidence; never substitute raw Google clicks for the citation metric.

### 7.5 Cadence

- **WEEKLY (automated, low-cost, inside `weekly_run`):** surfaces (a) any `detect_monitored_page_regression` flags on BLUF pages (Google + Bing + impressions), (b) the fresh `bing_ai_performance.ai_citations` snapshot treated vs untreated, (c) the engagement/lead-hold query. Exceptions report: green unless a guardrail trips. No manual SERP weekly except spot-checks.
- **T+14d per wave (grace gate):** no CTR/position verdict reported before T+14 — only build/schema/link/engagement health.
- **T+28d per wave (signal report):** first real verdict — PRIMARY manual citation-share GAIN (T1 vs T0) treated vs control; Bing AI citation delta-of-deltas; SECONDARY paired CTR (honest scorecard); Bing CTR/position hold; engagement + leads hold; A/B format-arm read. Each line tagged REAL/VANITY. **Gates the format decision and the go/no-go on widening.**
- **T+56–90d per wave (verdict report):** durable read at T2; full honest scorecard; `monitor_until` reached → cohort auto-expires. Declares win/neutral/loss on the PRIMARY citation-share metric with secondary corroboration.

**Honest-scorecard discipline (locked into every CTR line):** `property_honest_scorecard.sql` contract — per-page symmetric pre/post anchored to go-live, survivorship-excluded, net-new out, MEDIAN headline (weighted/mean shown but not headline), matched untreated control. Never headline raw Google clicks or raw Bing totals.

**Gating:** every report reviewed by the manager (Opus). Prod deploy of the next wave is SIGN-OFF GATED (outside the GEO full-auto override). **Model tiering:** Python data + detectors; Opus copy + report/format judgement; Sonnet QA; manager holds the gates.

---

## 8. Risks & mitigations

| Risk | Likelihood | Mitigation |
|---|---|---|
| **The format experiment never reaches significance** (true at this traffic) | Certain | Designed for it: Track A decides on direction + consistency of citation-share + Bing citations (observational, not RCT); Track B is a harm tripwire only; pre-registered tie-break (default to BOX) with a stated mechanism. We do not claim a p-value. |
| **Re-poisoning the 518 pages with ICAEW claims via `stamp_trust_signals`** (the #1 landmine) | High if unguarded | §6.6 STEP 2: BLUF uses a bespoke `_edit_fn` that never calls the EEAT rebuild; estate-hygiene patch to `_schema_generator.py`; credential-poison validator (G5/E-gate) HARD-fails any leak; #3 detection scans schema + frontmatter. |
| **Diff entanglement with the uncommitted credential fix** | High if not sequenced | §6.6 STEP 1: land + tag the credential fix first; `bluf_apply.py` refuses to run on a dirty `content/blog` tree. |
| **BLUF cannibalises the page** (user satisfied in-box, never scrolls to CTA) | Medium | Engagement guardrail (Track B + regression #4); if box is the culprit, prefer inline (Format B); leads-hold target. |
| **Fabricated / stale figures in the BLUF** | Medium | Body-figures allowlist (Stage 1) + figures-in-body validator (G3, re-checked at apply) + stale-figures denylist (G4); engine flags "needs body update first" rather than inventing. |
| **AIO attribution is volatile / not RCT-grade** | Certain | HOLDOUT arm + per-page pre/post; corroborate with Bing `ai_citations`; report as observational; matched untreated control differences out market-wide AIO drift. |
| **`bing_ai_performance.ai_citations` sparse for Property** | Unknown | Open decision #5 — confirm ingestion before relying on it; fallback to manual AIO observation + paired CTR if sparse. |
| **Body mutation / YAML corruption mid-apply** | Low | Body-sha assertion (#1, the keystone), yaml round-trip (#2), per-file `.bak` + atomic write + restore-on-exception (#12). |
| **Duplicate boilerplate across pages** | Medium | Per-page-unique enforcement + near-duplicate detector (#7, threshold 0.80) across batch and shipped. |
| **Restyling 686 pages for no gain** | Real | The decision rule's VERDICT=NONE branch + the staged scale gate (never all 686 at once); the lever may turn out to be schema/content, not styling. |

---

## 9. Open decisions for the owner (human call before execution)

1. **Sequencing of the uncommitted 518-page credential fix:** commit + deploy first / keep staged and branch BLUF off it / deploy separately. **Recommendation: commit + deploy the credential fix first** (it is a trust-correctness fix), then branch `bluf-program` off the clean tagged baseline.
2. **A/B-to-decide vs ship-a-format:** run the format experiment to decide (slower, rigorous, honours the data-driven mandate — recommended) vs ship Format A directly and only A/B if it underperforms.
3. **Decision-metric weighting:** format winner judged primarily on lead conversion (commercial) or AIO/Bing citation share (GEO). **Recommendation: citation share is the WIN condition; conversion is the tiebreaker.**
4. **Batch 1 size:** start with a tight proving cohort (~15–20 zero-click winners incl. `welsh-ltt` + the CGT cluster) before scaling. **Recommendation: yes** (mirror the meta engine's "smaller truthful batch first"). The full 45-page/15-triplet cohort is reached via Waves 1–2.
5. **`bing_ai_performance` data availability:** confirm `BingAiPerformanceFetcher` is populating `ai_citations` for Property (table exists; ingestion may be intermittent). If sparse, the GEO win-metric leans on AIO observation + paired CTR — need the fallback measurement plan.
6. **`speakable` scope:** sparsely-supported schema type; fine as a low-cost signal but the load-bearing path is the lead `acceptedAnswer` Q&A. Confirm we are comfortable emitting the `speakable` cssSelector (no downside found).
7. **Estate rollout trigger:** Property-first, then a per-site onboarding checklist (each site needs `blog.ts` + its `BlogPostRenderer`/schema equivalents extended; **Medical uses FLAT routing; digital-agency has split schema modules under `src/lib/schema/`**). Confirm Property-first.
8. **Word-count bound:** 40–60 words spec — hard-reject outside the band (recommended, for snippet-liftability) vs warn-only.

---

## 10. RESUME HERE TOMORROW

Ordered first concrete steps (still DESIGN/PREP until the build sign-off):

1. **Get owner calls on the §9 open decisions** — at minimum #1 (sequencing), #2 (A/B vs ship), #3 (metric weighting), #5 (Bing AI data availability). These gate everything.
2. **Land the credential fix (§6.6 STEP 1):** review the 528-file diff (confirm it only touches `reviewedBy`/`reviewerCredentials` + `niche.config.json`), get sign-off, commit on `property-credential-fix`, `npm run build` green, deploy or merge → then `git tag bluf-baseline-pre <sha>` and record the sha in `docs/property/bluf_program_state.md`. Confirm `git status` clean.
3. **Confirm the landmine fix path (§6.6 STEP 2):** read `optimisation_engine/apply/_schema_generator.py` (property reviewer block, ~lines 72, 85–86) + `base.py stamp_trust_signals`; decide bespoke `_edit_fn` (preferred) and/or profile patch; this is a hard precondition before any apply.
4. **Verify `bing_ai_performance` for Property (open decision #5):** `python scripts/_q.py` a quick count of `ai_citations`/`grounding_queries` rows for `site_key='property'` to confirm the primary corroboration metric is populated; note the fallback if sparse.
5. **Write the candidate SQL and run it READ-only:** create `scripts/bluf_candidates.sql` (§3.3) and run `python scripts/_q.py scripts/bluf_candidates.sql` to produce the live candidate list; confirm the 6 `P2_bing_converting` pages and the `welsh-ltt` row appear.
6. **Author the two reference docs** (still design): `docs/_engines/BLUF_PROGRAM.md` (methodology, reusable `--site`) + `docs/property/bluf_program_state.md` (state/runbook), structured like `SERP_META_PROGRAM.md`, embedding this plan.
7. **Only after sign-off:** scaffold `scripts/bluf_worklist.py` (clone `meta_worklist.py`), then the one-time code change (types + renderer box + schema mirror + `_schema_generator` injection + `bluf_format` registry entry) on the `bluf-program` branch → Wave 0 dry-run → Wave 1 canary (3–5 pages incl. `welsh-ltt`).

> Reminder: nothing in steps 6–7 ships without the per-wave gate chain (§6.2) and an explicit user deploy sign-off. The safe default of the entire engine is "show me what would happen."

---

## Appendix: Open decisions (structured)

- Sequencing of the uncommitted 518-page credential fix: commit+deploy first (recommended) vs keep staged and branch BLUF off it vs deploy separately. BLUF cannot begin while git status shows the 528 unstaged files.
- A/B-to-decide vs ship-a-format: run the bluf_format experiment to decide (rigorous, honours the data-driven mandate, recommended) vs ship Format A (Quick answer box) directly and only A/B if it underperforms.
- Decision-metric weighting: judge the format winner primarily on lead conversion (commercial) or on AIO/Bing citation share (GEO). Recommendation: citation share is the WIN condition, conversion is the tiebreaker.
- Batch 1 size: start with a tight ~15-20 page proving cohort (welsh-ltt + CGT cluster) before scaling (recommended) vs a larger first wave.
- bing_ai_performance.ai_citations data availability for Property must be confirmed (ingestion may be intermittent); if sparse, the GEO win-metric falls back to manual AIO observation + paired CTR.
- speakable scope: confirm comfort emitting the speakable cssSelector (sparsely supported but no downside found); the load-bearing liftable path is the lead acceptedAnswer Q&A.
- Estate rollout trigger: Property-first then per-site onboarding (Medical uses FLAT routing; digital-agency has split schema modules) vs a different order.
- Word-count bound: hard-reject BLUFs outside 40-60 words (recommended for snippet-liftability) vs warn-only.


## Appendix: Resume-tomorrow checklist (structured)

1. Get owner calls on the open decisions, at minimum sequencing (#1), A/B-vs-ship (#2), metric weighting (#3), and Bing AI data availability (#5) - these gate everything.
2. Land the credential fix first: review the 528-file diff (confirm it only touches reviewedBy/reviewerCredentials + niche.config.json), sign-off, commit on property-credential-fix, npm run build green, deploy/merge, then git tag bluf-baseline-pre <sha> and record the sha; confirm git status clean.
3. Confirm the landmine fix path: read optimisation_engine/apply/_schema_generator.py property reviewer block (~lines 72, 85-86) + base.py stamp_trust_signals; decide bespoke BLUF _edit_fn (preferred) and/or profile patch BEFORE any apply.
4. Verify bing_ai_performance for Property: python scripts/_q.py a count of ai_citations/grounding_queries rows for site_key='property' to confirm the primary corroboration metric is populated; note the fallback if sparse.
5. Write scripts/bluf_candidates.sql (the target-selection SQL) and run it READ-only via python scripts/_q.py to produce the live candidate list; confirm the 6 P2_bing_converting pages and welsh-ltt appear.
6. Author the two reference docs (design): docs/_engines/BLUF_PROGRAM.md (reusable --site methodology) and docs/property/bluf_program_state.md (state/runbook), structured like SERP_META_PROGRAM.md.
7. Only after sign-off: scaffold scripts/bluf_worklist.py (clone meta_worklist.py), then the one-time code change (blog.ts +3 optional fields, BlogPostRenderer box render with id=bluf + section_view, schema.ts speakable+lead Q&A, _schema_generator injection, bluf_format registry entry) on branch bluf-program, then Wave 0 dry-run then Wave 1 canary (3-5 pages incl. welsh-ltt).
