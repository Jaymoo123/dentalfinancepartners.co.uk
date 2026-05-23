# Track 2 — Property Legacy Rewrite Briefs + Sitemap-Driven Candidate Discovery

**Owner:** Jeff (jeff@emplifex.com) + rolling Claude Opus 4.7 Track 2 manager sessions.

**Status as of 2026-05-23:** Trial phase. Stage 0 complete (universe + cannib index + this manager doc). 3 hand-drafted Track 2A briefs pending. Track 2B sub-agent dispatch pending.

**Purpose:** Single source of truth for the parallel Track 2 program — drafting Wave-grade rewrite briefs for the 234 untouched legacy pages (Track 2A) and mining 56 cached competitor sitemaps for net-new candidates feeding Wave 6+ (Track 2B). Mirrors `docs/property/NETNEW_PROGRAM.md` structure. Read first if you are a fresh Track 2 manager session.

---

## §0 Read first if you are a fresh Track 2 manager

You are taking over the orchestrator role for an ongoing program. Do this before responding to the user:

1. **Read this entire doc** (~10-15 min). It is the durable context.
2. **Read** `docs/property/NETNEW_PROGRAM.md` §0 + §14 + §16.18 + §16.31 (the parent program's read-only-against-Wave-N discipline + reasoning-first + URL-verification lessons that Track 2 inherits).
3. **Run these commands to see current state:**
   ```
   git log --oneline -20
   git status --short
   ls docs/property/track2_*
   ls briefs/property/track2/
   ```
4. **Read the most recent §3 heartbeat** (below). It tells you the last batch's state.
5. **Read** `docs/property/wave5_page_tracker.md` (the live Wave 5 state — Track 2 is parallel to this).
6. **Acknowledge the user with one short message:** *"Picked up. Track 2 phase: [trial / Phase 2 / Phase 3]. [N] briefs drafted, [M] candidates in 2B output. Ready for next instruction."* — nothing longer.

**Critical norms before you do anything:**

- **Track 2 is parallel to Wave 5.** Read-only against every Wave 5 file. Never edit `NETNEW_PROGRAM.md`, `house_positions.md`, any `wave*_*` file, or `topic_gaps_final.md`.
- **Output to `track2_*`-prefixed files only.** No collisions with Wave 5 file paths.
- **Self-awareness about your own context.** When context fills, write a §3 heartbeat below and stop. See §14.
- **Reasoning-first selection per §16.18.** No Jaccard scripts for cannib decisions; the LLM reasons semantically against the Cannibalisation Index.
- **URL liveness mandatory per §16.31.** Every competitor URL in a brief is fetched + status-checked + date-stamped at Stage 2.
- **Wave 5 heartbeat re-read at every batch.** Open `wave5_page_tracker.md`, `wave5_site_wide_flags.md`, and `NETNEW_PROGRAM.md` §3 before dispatching any Stage 2 batch. Catch back-patch collisions early.

---

## §1 The goal

Compound the value of completed Wave 1-4 + 2026-05-21 rewrites by drafting **execution-ready briefs** for the ~234 remaining legacy pages, so a future execution wave can pick them up without re-doing analysis. In parallel, mine untapped competitor sitemap signal so the next net-new wave (Wave 6+) has a richer candidate pool than the original 5-sitemap `topic_gaps_final.md` analysis.

**Two sub-tracks:**

- **Track 2A — Legacy rewrite briefs.** ~234 pages. Output: per-page `briefs/property/track2/<slug>.md`. Format: adapted from Wave 5 brief format with legacy-specific extras (current snapshot, GSC angle, gap-mode diagnosis, cannibalisation universe check, house-position conflict flag).
- **Track 2B — Sitemap-driven candidate discovery.** 56 cached competitor sitemaps in `briefs/property/_sitemap_cache_v2/`. Output: scored candidate list at `docs/property/track2b_competitor_sitemap_gaps_<date>.md` for Wave 6+ planning.

Both LLM-reasoning-led. Both read-only against Wave 5.

---

## §2 Scope and universe definition

**Track 2A universe:** the 234 "untouched legacy" pages = blog .md files on `main` MINUS (Wave 1 net-new 31 + Wave 2 net-new 30 + Wave 3 net-new 30 + Wave 4 net-new 30 + 2026-05-21 rewrites 52). Authoritative sources: `track2_universe_2026-05-23.md` + `track2_exclusion_audit_2026-05-23.md` + `_tmp_track2_excluded_slugs.txt`.

**Track 2B input:** 56 competitor sitemap JSONs at `briefs/property/_sitemap_cache_v2/*.json`. The full v2 universe catalogues 235 specialist domains — 56 are pre-cached, the remaining 179 can be fetched in Phase 2 if the trial proves valuable.

**Exclusion drift:** when Wave 5 merges (30 pages × ~3 batches), the universe drops to ~204 truly untouched. Re-run the exclusion arithmetic at the start of Phase 2.

---

## §3 Where we are right now (heartbeat — updates every batch)

**Last updated:** 2026-05-23 PM — Trial phase complete (manager-side); awaiting Track 2B sub-agent return.

**Stage 0 deliverables status:**
- ✅ `docs/property/track2_universe_2026-05-23.md` — 234 residual slugs
- ✅ `docs/property/track2_exclusion_audit_2026-05-23.md` — per-bucket exclusion source citation
- ✅ `docs/property/track2_cannib_index_2026-05-23.md` — 5-source Cannibalisation Index
- ✅ `docs/property/TRACK2_PROGRAM.md` — this doc
- ✅ `docs/property/track2_page_tracker.md` — seeded with 3 trial-pick rows + reference to residual universe doc
- ✅ `docs/property/track2_site_wide_flags.md` — 4 trial-phase flags raised (F-1 to F-4)
- ✅ 3 hand-drafted Track 2A trial briefs:
  - `briefs/property/track2/airbnb-tax-uk-short-term-rental-income-taxed.md` (DEPTH)
  - `briefs/property/track2/birmingham-property-accountant.md` (CTR-FAIL)
  - `briefs/property/track2/2027-property-tax-rates-section-24-relief-uk-landlords.md` (CANNIBAL)
- ✅ Track 2B sub-agent — RETURNED 2026-05-23 17:33Z after ~2h15m. Output at `docs/property/track2b_competitor_sitemap_gaps_2026-05-23.md` (505 lines, 67KB). 15,275 URLs mined from 55 sitemaps (cache had 55 not 56). **65 NEW candidates** surfaced across 17 topic clusters. Dedup yield: ~150 DUPE-EXISTING + ~33 DUPE-IN-FLIGHT + ~210 DUPE-ALREADY-CANDIDATE. Yield falls inside expected 50-200 range (skewed low because topic_gaps_final.md already absorbed `ukpropertyaccountants.co.uk` at v1, and Wave 5 absorbed the natural VAT/Devolved/Form17 slots).

**Track 2B top-line for Wave 6 planning:**
- Top 5 NEW candidates by competitor frequency: EPC C-rating 2030 cap (5/55), IHT TRS landlord compliance (4/55), cladding remediation cost recovery (4/55), rent-to-rent business model (3/55), IHT life interest trust IPDI (2/55)
- NEW count by cluster: SDLT 8, CGT 7, IHT 9, BTL Ltd Co 4, MTD 3, RRA 0, VAT 3, Form 17 3, Devolved 0, Leasehold 4, Commercial 2, HMO/SA/FHL/STL 5, Niche specialisms (EPC/EV/cladding/BSA/DAC7) 7, Capital Allowances/SBA 2, NRL/DTA 2, Penalties 4, Property Finance 2
- **28 of 65 NEW candidates need new house positions locked first.** Wave 6 manager should plan ~8-10 new HP lock sessions covering: Building Safety Act 2022 / Cladding, EPC C regime, Rent-to-Rent, Trust Registration Service, IPDI/QIIP trusts, EV chargepoint allowances, SIPP/SSAS commercial property, DAC7 platform reporting, Section 198 elections, partnership SDLT relief (Sch 15)

**5 cross-track manager-attention conflicts surfaced by Track 2B:**
1. `sdlt-incorporation-partnership-vehicle-zero-charge-mechanics` — adjacent to rewritten `sdlt-incorporation-stamp-duty-twice` (different angle: Sch 15 partnership relief). Verify before commissioning.
2. `sdlt-non-uk-resident-2-percent-surcharge` day-counting angle — adjacent to Wave 1 SDLT-NR page. Verify legacy page's SRT day-counting depth before commissioning new sibling.
3. EOT Property SPV candidate — flag whether topic_gaps_final.md §"Trusts" was already going to cover EOT property-exit.
4. EPC candidates — `epc-energy-performance-certificates-epc` is oddly categorised under FIC in topic_gaps_final.md; re-cluster before commissioning the new EPC C-rating page.
5. Wave 5 §23 + §24 LOCKED 2026-05-23 — verified at heartbeat; no NEW-candidate collisions.

**Trial-phase flags raised (4):**
- **F-1 (HIGH)** birmingham-property-accountant pricing leak — likely site-wide pattern on residual city pages; Phase 2 audit needed
- **F-2 (HIGH)** 2027 Section 24 page Bill-vs-enacted hedge discipline — applies to all 2027-rate pages; Phase 2 audit needed
- **F-3 (MEDIUM)** 2027 cluster cannibalisation — REDIRECT-PROPOSED 2 siblings to the rewritten page (manager decision)
- **F-4 (LOW)** Residual contains 4-way duplicates in VAT-calculator + AIA clusters; Phase 2 cluster audit

**Quality gate results on 3 trial briefs:**
- URL liveness: deferred (briefs name "pending live verification at execution" per §16.31 discipline — appropriate for trial)
- Citation reality: all `§N.M` references resolve to real `house_positions.md` sections
- Cannibalisation snapshot match: all 3 cite the 2026-05-23 index snapshot
- House-position reference validity: PASS
- Section completeness: PASS (all 14 required sections present in each brief)
- Anti-templating spot check: PASS (briefs are starkly different in gap-mode diagnosis, fix sequencing, and depth)
- Wave 5 collision scan: re-read at brief close — no new collisions surfaced

**Next actions:**
- Awaiting Track 2B sub-agent return (running in background) → **RETURNED, 65 NEW candidates folded into topic_gaps_final.md addendum**
- Trial-phase report to user (this turn) → **DELIVERED**
- **Gold-reference exercise completed 2026-05-23 PM:** pivoted from airbnb (zero GSC signal) to cgt-rates-property-2026-27-current-rates-explained (895 imp / 25 queries / 1 click — strongest CTR-fail signal in residual). Real data baked into brief. **4 additional flags raised (F-5 → F-8) including one new gap-mode code (INTENT-MISMATCH) added to §20 glossary.** Gold-reference brief is the Phase 2 sub-agent depth match-target.
- User decides Phase 2 scale-up (separate decision per plan)

**Batch 1 PREP COMPLETE 2026-05-23 PM** — all 5 prep tasks landed:
1. ✅ Folder reorg: helper scripts moved to `optimisation_engine/track2/` and consolidated into one parameterised script (`pull_page_data.py --slug <slug>`); 3 scratch `_tmp_*.py` files deleted; scratch `_tmp_track2_excluded_slugs.txt` deleted (track2_exclusion_audit doc is canonical); `briefs/property/track2/trial/` + `briefs/property/track2/batch1_cgt/` subdirs created; 4 trial briefs moved into `trial/`.
2. ✅ Rule-propagation refactor: `TRACK2_PROGRAM.md §10` (tracker convention) + §4 sections 13 + 14 (universal rules + workflow) all converted to pointers into `NETNEW_PROGRAM.md` + `competitor_rewrite_playbook.md`. Parent program rule changes now auto-propagate; only Track 2-specific deltas restated.
3. ✅ Tracker upgrade: 5 columns added (Batch, Sub-bucket, Framing 1-liner, Branch, Commit), 3 sections added (worktree/sub-agent assignment, pre-flight checklist, summary), restructured into batch sub-sections (`## Trial phase` + `## Batch 1 — CGT cluster`) mirroring wave5_page_tracker.md.
4. ✅ Cannibalisation Index refresh: §1 grew 406→436 (Wave 5 shipped); §2 grew 121→151 (Wave 5 added to shipped pool); §4 reshaped from Wave 5 candidates to Wave 6 candidates with full 30-slug list + status; cross-track interlock flagged between Wave 6 Bucket C (Capital allowances) and residual AIA cluster (~12 pages) — implication noted for future-batch AIA cluster work.
5. ✅ Fresh GSC + GA4 pull: 3,829 GSC rows + 251 GA4 rows refreshed 2026-05-23 PM (90-day window).

**Universe at Batch 1 dispatch:** 436 blog .md files / 233 residual legacy / Wave 6 mid-execution (10 of 30 shipped on feature branches).

**House positions at Batch 1 dispatch:** §1-§25 LOCKED. New §25 CAA 2001 cluster locked 2026-05-23. Critical recent catch: Wave 6 F-9 caught s.455 rate substitution 33.75% → 35.75% per FA 2026 — this implies FA 2026 IS enacted, which means earlier "Bill-vs-enacted" flags on the April 2027 surcharge may now be resolvable as enacted-with-citation rather than Bill-form-hedge. Batch 1 sub-agents must verify §7 status against legislation.gov.uk freshly.

**Batch 1 ready to dispatch:** 9 CGT pages in 3 sub-buckets of 3. **Launch prompts written** at `docs/sessions/property/TRACK2_BATCH1_LAUNCH_PROMPTS.md` — user opens 3 separate Claude Code terminals (one per sub-bucket) and pastes one prompt per terminal. This avoids flooding manager context with 3 concurrent sub-agent transcripts. Manager idles while sub-agents run; polls main's tracker / flags / Q&A files for progress. Q&A coordination files seeded (`track2_questions_batch1_sub_{a,b,c}.md`); discovery logs seeded (`track2_discovery_log_batch1_sub_{a,b,c}.md`).

**Batch 1 LAUNCHED 2026-05-23 PM** by user across 3 separate terminals. **Batch 1 CLOSED 2026-05-24 00:30Z.**

**Batch 1 results:**
- 9 briefs drafted (all 🟢): 3 REWRITE (sub-bucket A: CGT reliefs/planning) + 3 REDIRECT-PROPOSED (sub-bucket B: cluster collapse to rewritten `cgt-payment-deadlines-property-sales-2026` canonical) + 3 REWRITE (sub-bucket C: CGT scenarios — divorce / inherited / spouse)
- 12 flags raised (F-9 to F-20). Two HIGH-severity caught hallucinations on shipped work (F-13 + F-18) — back-patched commit `a103a04`.
- Methodology findings: 3 new gap-mode codes (INTENT-MISMATCH, INVISIBLE, TAIL-SIGNAL); cluster-collapse pattern proven; D-9 hypothesis (generic-suffix invisibility) partially supported.

**Post-Batch-1 work also closed:**
- Cross-residual drift audit (B): commit `7be7cb0`. Pattern hypothesis narrower than predicted; only 1 NEW page needs back-patch outside existing scope (`incorporate-rental-property-without-cgt.md` 28% → 24%). F-19 and F-20 confirmed NOT site-wide.

**Three commits landed on main:**
- `0ec60ba` Batch 1 close (30 files, 5,871 insertions)
- `a103a04` F-13 + F-18 back-patches (2 files, 5/5)
- `7be7cb0` Cross-residual drift audit (1 file, 182 insertions)

**Open decisions awaiting user (next manager session can pick up):**
1. Back-patch `incorporate-rental-property-without-cgt.md` 28% → 24%? (~2 min, 1-line fix; could be 4th commit now or fold into Batch 2)
2. Lock TMA 1970 s.43 4-year claim deadline as a house position? (Wave-manager-level decision; would propagate to 6 affected loss/claim/disposal pages)
3. Decide Batch 2 scope: continue CGT cluster (F-16 candidates: 3 more 60-day-CGT collapse candidates), or pivot to different cluster (Section 24, city accountants, AIA cluster, etc.)
4. Phase 3 execution scheduling: when do the 9 Batch 1 briefs (6 REWRITE + 3 REDIRECT) get executed?

**Manager pickup doc for next session:** `docs/property/TRACK2_MANAGER_PICKUP.md`.

**Trial-phase complete summary (post-gold-reference):**

| Brief | Approach | Gap-mode | Data state | Quality outcome |
|---|---|---|---|---|
| airbnb-tax-uk-short-term-rental-income-taxed | Hand-drafted, structure-only | DEPTH (originally claimed) | Real data showed page has ZERO GSC + 1 GA4 session = effectively invisible | Template handled the "invisible page" case; revealed need to defer or skip pages with no GSC signal until they get traffic |
| birmingham-property-accountant | Hand-drafted, structure-only | CTR-FAIL | Not pulled | F-1 pricing leak caught — likely site-wide pattern |
| 2027-property-tax-rates-section-24-relief-uk-landlords | Hand-drafted, structure-only | CANNIBAL | Not pulled | F-2 Bill-vs-enacted + F-3 cluster REDIRECT-PROPOSED surfaced |
| **cgt-rates-property-2026-27-current-rates-explained** | **Hand-drafted, gold-reference, fully data-populated** | **CTR-FAIL + INTENT-MISMATCH + STRUCTURE** | **Real GSC (25 queries, 895 imp, 1 click, pos 5.4) + real GA4 (3 sessions, 161s avg duration) + 3 verified competitor URLs + verified gov.uk authority** | **F-5 (5th Bill-vs-enacted) + F-6 (new gap-mode code) + F-7 (PIM4101 hallucination caught by §16.31) + F-8 (TCGA s.4 substituted by FA 2019) — best-in-class signal richness, ready as Phase 2 sub-agent match-target** |

**Wave 5 state at heartbeat:** Wave 5 actively executing on feature branches (6 of 30 ✅ done: A1, A2, B1, B2, C1, C2; 2 in-progress: A3, C3). None merged to main yet. House positions §23 + §24 LOCKED 2026-05-23.

---

## §4 Brief anatomy — Track 2A template

Each Track 2A brief lives at `briefs/property/track2/<slug>.md`. Section outline (Stage 1 reasoning vs Stage 2 data-enriched marked):

1. **`# Track 2 brief: <slug>`** (H1)
2. **Header block** *(Stage 1)* — Site, Brief type ("Legacy rewrite"), Source markdown path, Live URL, Stage 1 priority H/M/L, Stage 1 date, Stage 2 enrichment date, Cannibalisation status (one of REWRITE / REDIRECT-PROPOSED / SKIP-NO-ACTION / FLAG-MANAGER).
3. **`## Manager pre-decisions`** *(Stage 1 reasoning)* — current slug (kept unless redirect proposed), category, gap-mode tag (one or more: `DEPTH` / `CTR-FAIL` / `CANNIBAL` / `VOICE-FRESHNESS` / `STRUCTURE`), "why this rewrite" angle (distinct from net-new "why a new page" angle).
4. **`## Current page snapshot`** *(Stage 2 — read source markdown + frontmatter)* — word count, H2 outline (1-line summary each), meta title + description, FAQ count from frontmatter `faqs:` array, outbound authority links count, schema present (Y/N), last meaningful edit date from `dateModified`.
5. **`## GSC angle (last 90 days)`** *(Stage 2 — read `gsc_query_data` Supabase)* — highest-impression query (impressions + CTR + avg position), top 5 queries impressions-but-no-clicks, queries where avg position 5-15 with CTR <50% of position-expected, GA4 engagement signal from `ga4_page_data`.
6. **`## Gap-mode diagnosis`** *(Stage 1 reasoning, refined Stage 2)* — narrative explanation of which gap mode dominates and the load-bearing fix. **Anti-templating discipline:** this section MUST differ per page; manager spot-checks at batch close.
7. **`## Competitor URLs`** *(Stage 2)* — 3-5 URLs from `competitor_serps` rows. Every URL fetched + status-checked + date-stamped per §16.31. What to borrow / what to differentiate against per URL.
8. **`## Cannibalisation universe check`** *(Stage 2)* — explicit table citing the Cannibalisation Index snapshot timestamp. Compare against (a) Wave 1-4 net-new, (b) 2026-05-21 rewrites, (c) Wave 5 candidates (refreshed snapshot), (d) intra-residual siblings. Conclusion: pillar / applied-local / redirect / no-conflict.
9. **`## Closest existing pages`** *(Stage 2)* — internal-link partners and how this rewrite should link to/from them.
10. **`## House-position references`** *(Stage 1)* — list of `house_positions.md` sections this rewrite must thread, each tagged `[LOCKED <date>]` or `[PENDING — Wave N working]`.
11. **`## House-position conflict flag`** *(Stage 2)* — does the current published page contradict any locked house position? If yes, this is the rewrite's first job.
12. **`## Authority links worth considering`** *(Stage 2)* — 4-7 statutory / HMRC / gov.uk URLs with liveness dates.
13. **`## Universal rules — inherited from parent program (do not restate)`** *(static pointer block)*:
    - **Voice rules** — `NETNEW_PROGRAM.md §4` voice block (no em-dashes, anonymised social proof only, no pricing, exact figures + named statute) AND `docs/competitor_rewrite_playbook.md §5` "Universal site rules" (no em-dashes anywhere; lead-gen architecture; CSS in markdown; FAQs and schema; cannibalisation discipline)
    - **Lead-gen architecture** — `competitor_rewrite_playbook.md §5` "Lead-gen architecture" subsection (LeadForm auto-injected by `BlogPostRenderer.tsx`, never duplicated; 1-3 inline `<aside>` CTAs at conversion moments)
    - **CSS in markdown** — `competitor_rewrite_playbook.md §5` "CSS in markdown" subsection (no Tailwind utility classes in markdown body; semantic HTML only; `.prose-blog aside` rule handles inline-CTA styling)
    - **FAQs and schema** — `competitor_rewrite_playbook.md §5` "FAQs and schema" subsection (frontmatter `faqs:` array, target 10-14; `buildBlogPostingJsonLd` auto-emits FAQPage; never manually add FAQ schema in body)
    - **Anti-templating discipline** — `NETNEW_PROGRAM.md §10` anti-templating discipline (briefs must differ per page; manager spot-checks at batch close)
    - **Quality bar** — `competitor_rewrite_playbook.md §4.3` six-check verification
    - **Statute citation discipline** — Track 2 site-wide flag F-8 (statute content can be removed by amendment even when URL is live — TCGA 1992 s.4 substituted by FA 2019 is the canonical case)
    - **§16 lessons** (all of them) — `NETNEW_PROGRAM.md §16`, particularly §16.18 (reasoning-first selection), §16.31 (URL liveness mandatory), §16.22/§16.27/§16.30/§16.33/§16.40+ (Bill-vs-enacted-Act drift pattern), §16.14/§16.15 (tracker hygiene)

    If any of those parent rules change, Track 2 inherits automatically.

14. **`## 19-step workflow — inherited from parent program (Wave 5) with Track 2 deltas`** *(static pointer + delta block)*:
    - **Inherits:** the full 19-step workflow from `NETNEW_PROGRAM.md §7` (or equivalent Wave-N file). Read that.
    - **Track 2 deltas** (these supersede the inherited steps where listed):
      - **Step 9:** "Rewrite markdown at existing path" (Track 2 modifies existing files; parent program writes new files)
      - **Step 12:** "Confirm no redirect needed (or propose one)" (Track 2 can propose `REDIRECT-PROPOSED` status; parent program does not)
      - **Step 13:** "Update existing `monitored_pages` Supabase row OR insert new one if not yet tracked" (Track 2 rewrites pages that may already be monitored from earlier rewrite passes; parent program always inserts new)

15. **`## Per-page work-log`** *(empty template)* — for the future execution-time session.

**Sections 3, 6, 10** are Stage 1 reasoning. **Sections 4, 5, 7, 8, 9, 11, 12** are Stage 2 data-enriched. **Sections 13, 14, 15** are static (Sections 13 + 14 are now POINTERS into the parent program, not duplications).

---

## §5 Brief anatomy — Track 2B candidate format

Single output doc: `docs/property/track2b_competitor_sitemap_gaps_<YYYY-MM-DD>.md`. Grouped by topic cluster (SDLT, CGT, IHT, BTL ltd-co, MTD ITSA, RRA 2025, Form 17, devolved tax, leasehold, niche specialisms). Each candidate row:

- **Proposed slug** (draft, not final — Wave 6 manager finalises)
- **Topic cluster**
- **Frequency signal** — count of cached sitemaps (out of 56) carrying a similar topic
- **Top 3 competitor URLs** that surfaced the gap
- **Closest on-site existing page** (for cannibalisation)
- **Cannibalisation status** (NEW / DUPE-EXISTING / DUPE-IN-FLIGHT / DUPE-ALREADY-CANDIDATE)
- **House-position fit** — which `house_positions.md` section governs the topic, locked or pending
- **One-sentence rationale**

**Expected yield:** 50-200 NEW candidates after de-duplication. Wave 6 manager picks up later; Track 2B does NOT touch `topic_gaps_final.md` (Wave 5's territory until close).

---

## §6 House-positions deference rules

Track 2 briefs **cite** `house_positions.md` by section number (`§24.5`) and lock-date stamp (`[LOCKED 2026-05-23]`). Never paraphrase — the section number is the contract.

Track 2 NEVER edits `house_positions.md`. If a brief drafting surfaces a position-shaped conflict (e.g., a legacy page contradicts §24.2 Form 17 framing), the manager flags it to `track2_site_wide_flags.md` and the Wave 5 / future-wave manager handles the actual lock.

**House-position state at trial start (2026-05-23):**
- §1-§22: LOCKED (Waves 1-4 extensions)
- §23 (Welsh LTT / Scottish LBTT / ADS): LOCKED 2026-05-23 (Wave 5 pre-launch)
- §24 (Form 17 / joint ownership / spouse): LOCKED 2026-05-23 (Wave 5 pre-launch)
- No PENDING sections — all Track 2A briefs can cite with date-stamped LOCKED status.

**Re-check rule:** if Wave 5 amends §23.x or §24.y during a Stage 2 batch (catchable via NETNEW_PROGRAM §3 heartbeat), briefs citing the amended sub-section are flagged ⚠️ collision for re-reasoning.

---

## §7 Cannibalisation Index protocol

See `docs/property/track2_cannib_index_2026-05-23.md` for the full index. Track 2A and Track 2B sub-agents both consult it before proposing anything.

**Refresh cadence:**
- §1 (existing pages), §2 (W1-4), §3 (rewrites), §5 (inter-wave queue) — frozen at trial; refresh only if Wave 5 ships
- §4 (Wave 5 candidates) — refresh at the start of every Stage 2 batch
- §7 (append-only in-flight) — appended-to during each Stage 2 batch

**Reasoning protocol (§16.18, no Jaccard scripts):** sub-agent reads index, reasons semantically about the proposed slug + primary query, assigns one of the 4 status codes (Track 2A) or 4 status codes (Track 2B).

---

## §8 Stage 0 → Stage 1 → Stage 2 pipeline

**Stage 0 (manager, deterministic, ~30-60 min, one-shot):**
- Build exclusion set + universe doc + Cannibalisation Index + this manager doc + tracker + flags log
- Done at trial start (2026-05-23)

**Stage 1 (sub-agent reasoning, batch of 20 per dispatch, ~30-45 min/batch in Phase 2):**
- Sub-agent reads 20 slugs + GSC summary + page_content_map summary, ranks by priority H/M/L, drafts `## Manager pre-decisions` + `## Gap-mode diagnosis` + `## House-position references` per slug.
- Output: 20 Stage 1 stub files at `briefs/property/track2/_stage1_stubs/<slug>.md` + chat-returned batch summary.
- **Not run in trial.** Trial uses hand-drafted briefs by manager directly.

**Stage 2 (sub-agent reasoning, batch of 10 per dispatch, ~2 hours/batch in Phase 2):**
- Sub-agent reads 10 Stage 1 stubs + GSC raw data + competitor_serps + page_content_map + Wave 5 candidate snapshot
- Verifies competitor URL liveness, expands stubs to full briefs, populates cannib table, flags house-position conflicts.
- Output: 10 full briefs at `briefs/property/track2/<slug>.md` + chat-returned batch summary.
- **Not run in trial.** Trial uses hand-drafted briefs.

---

## §9 Sub-agent dispatch patterns

**Track 2B Sitemap Miner (trial-phase single dispatch):**

> You are the Track 2B Sitemap Mining sub-agent. Read `docs/property/TRACK2_PROGRAM.md` §5 and §7, then read `docs/property/track2_cannib_index_2026-05-23.md`. Mine all 56 competitor sitemaps at `briefs/property/_sitemap_cache_v2/*.json`. Group surfaced URLs by topic cluster. For each cluster, identify candidates we don't cover. Score by competitor frequency × house-position fit × topical adjacency to our high-performing existing pages. De-duplicate against the Cannibalisation Index sections §1, §2, §3, §4, §5. Also de-duplicate against `docs/property/topic_gaps_final.md` (the 429 candidates already in the net-new pool — read but do not edit). Output to `docs/property/track2b_competitor_sitemap_gaps_2026-05-23.md` following §5 format. Return a chat summary listing cluster headers + candidate counts + top-5 NEW candidates per cluster + any flagged conflicts. Do NOT touch any wave5_* file. Do NOT touch topic_gaps_final.md. Do NOT touch NETNEW_PROGRAM.md.

**Phase 2 Track 2A Stage 1 Prioritiser** (deferred):

> You are the Track 2A Stage 1 prioritisation sub-agent. Read TRACK2_PROGRAM.md §4 and §6. Read house_positions.md once. For each of the 20 slugs in the attached list, produce a Stage 1 stub file using the §4 template (manager pre-decisions + gap-mode diagnosis + house-position references). Output one file per slug at `briefs/property/track2/_stage1_stubs/<slug>.md`. Return a batch summary listing each slug with H/M/L bucket + one-line gap-mode rationale. Do NOT fetch URLs. Do NOT query DataForSEO. Reason only from the inputs provided.

**Phase 2 Track 2A Stage 2 Brief Drafter** (deferred):

> You are the Track 2A Stage 2 brief-drafting sub-agent. Read TRACK2_PROGRAM.md §4, §7, §15. Read house_positions.md. Read the 10 Stage 1 stubs. For each: fetch + verify 3-5 competitor URLs (reject non-200), expand the stub to a full brief at `briefs/property/track2/<slug>.md` following §4, populate the cannibalisation table against the snapshot, flag any house-position conflicts. Append each drafted slug to the Cannibalisation Index §7. Return a batch summary listing the 10 slugs with status (drafted / blocked / skipped) and surfaced flags.

---

## §10 Tracker convention

**INHERITS from parent program — DO NOT restate elsewhere:**
- **Tracker hygiene** — `docs/property/NETNEW_PROGRAM.md §16.14` (tracker edits to main repo file via absolute paths only, NEVER as branch commits)
- **Branch HEAD verification on handover** — `NETNEW_PROGRAM.md §16.15` (manager handover after wave-prep commits land on main must verify each worktree branch HEAD matches main HEAD before sessions are launched)
- **Tracking discipline** — `NETNEW_PROGRAM.md §15` (track what's needed, not everything; compact summaries over verbose narration; use TaskCreate sparingly)
- **Concurrency safety** — wave tracker pattern (`wave5_page_tracker.md`): only edit your own assigned rows; mark in-progress BEFORE starting work; mark done only after quality gates pass + commit; if discoveries affect other rows, append to site-wide flags log

If the parent rules change in NETNEW_PROGRAM.md or wave tracker conventions, Track 2 inherits automatically by reading the same source.

**Track 2-specific deltas** (these supersede or extend the parent — restate only here):

- **Tracker file path:** `docs/property/track2_page_tracker.md`
- **Status legend extended to 7 codes** (vs wave pattern's 4) to support the multi-stage pipeline:
  - ⬜ todo — in universe, not yet Stage 1'd
  - 🟦 stage1_done — Stage 1 stub drafted
  - 🟡 stage2_drafting — claimed by a Stage 2 sub-agent (or manager hand-drafting trial)
  - 🟢 brief_drafted — full brief passed quality gates
  - ⏭️ skip — page should not be rewritten (TSX / dead / redirect candidate); reason noted
  - ✅ executed — future wave shipped the rewrite (back-filled later)
  - ⚠️ collision — Wave N touched this page; needs re-reasoning
- **Columns extended** (vs wave pattern): adds `Batch` (which test batch), `Sub-bucket` (A/B/C within batch), `Framing 1-liner` (one-line page purpose), `Branch` (Phase 3 execution worktree branch, blank during brief drafting), `Commit` (Phase 3 commit hash, blank during brief drafting). Wave-pattern columns retained: `#`, `Slug`, `Status`, `Notes`.
- **Multi-batch structure** — tracker organised into batch sub-sections (`## Trial phase`, `## Batch 1 — <topic> (<date>)`, etc.) each with sub-bucket sub-sections (`### Sub-bucket A — <theme>`). Mirrors `wave5_page_tracker.md` Session A/B/C pattern within each batch.
- **Pre-flight section per batch** (mirrors wave tracker "Pre-flight (orchestrator-completed)" section): manager lists what was done before sub-agents dispatched.
- **Summary section at bottom** (mirrors wave tracker pattern): aggregate counts across all batches.

---

## §11 Anti-templating discipline

The 234 legacy pages span many gap modes (DEPTH, CTR-fail, CANNIBAL, VOICE-FRESHNESS, STRUCTURE). Briefs MUST vary per page — do not paste a single template across all 234. The gap-mode diagnosis section is the spine of brief differentiation.

**Trial validates this** by picking 3 trial briefs across 3 distinct gap modes (see §3 picks). If all 3 briefs read identically, the template is wrong and we redesign before Phase 2.

**Manager spot-check at batch close:** read 2 random briefs from each batch, confirm gap-mode diagnosis differs. If templating drift detected, refresh the Stage 2 prompt with negative examples.

---

## §12 Interlock with Wave 5

**Files Track 2 reads at the start of every batch (Wave 5 heartbeat):**
- `docs/property/NETNEW_PROGRAM.md` §3 (F-flag back-patches that may collide)
- `docs/property/wave5_page_tracker.md` (Wave 5 candidate list + status)
- `docs/property/wave5_stage1_candidates_2026-05-23.md` (Wave 5 candidate detail)
- `docs/property/wave5_site_wide_flags.md` (newly surfaced cross-program flags)
- `docs/property/house_positions.md` (newly locked sections)
- `docs/property/page_rewrite_tracker.md` (rewrite list still definitive)

**Files Track 2 NEVER touches:**
- `NETNEW_PROGRAM.md`, `house_positions.md`, `topic_gaps_final.md`
- Any `wave*_*` file
- The 121 net-new pages or 52 rewritten pages on `Property/web/content/blog/` (read-only for cannib reference)
- Wave 5 worktrees

**Collision protocol:**
- Track 2A candidate slug appears in `wave5_stage1_candidates_*.md` → ⚠️ collision; don't draft brief; surface to §3 for human decision.
- Track 2A candidate's primary query overlaps Wave 5 candidate's primary query semantically → flag for cannib re-reasoning at Stage 2 close.
- Track 2A page back-patched by F-flag during drafting window → ⚠️ collision; manager (not sub-agent) decides if F-flag was surgical (brief still valid) or substantive (re-diagnosis needed).

---

## §13 Manager instructions for sub-agents

Sub-agent prompts go through the manager (this Track 2 session). Don't dispatch a sub-agent without:

1. The relevant sections of TRACK2_PROGRAM.md cited in the prompt
2. House_positions.md and Cannibalisation Index pinned as required reading
3. Explicit DO-NOT-TOUCH list for Wave 5 files
4. A precise output path (e.g., `briefs/property/track2/<slug>.md` or `_stage1_stubs/<slug>.md`)
5. A defined return-summary format

**Sub-agent timeout discipline:** if a Stage 2 sub-agent returns flagging an unresolvable issue (e.g., the legacy page no longer exists; or it cites a non-existent competitor URL), manager either resolves manually or skips that brief and flags. Never force the sub-agent to proceed against its own flags.

---

## §14 Manager self-awareness and handover

When context tightens (per NETNEW_PROGRAM §14.1 signs: response quality drift, repeated re-reading, struggling to hold cross-file state), write the following block to §3 above and stop:

```
### Handover snapshot <date> <time>
- Current phase: <Trial / Phase 2 / Phase 3>
- Last completed batch: <Stage X batch N, M briefs drafted>
- In-flight: <none / Stage X batch N+1 dispatched at <time>, awaiting return>
- Open ⚠️ collision rows: <list of slugs>
- Open §3 decisions: <bullets>
- Wave 5 heartbeat as of handover: <list of files re-read + their timestamps>
- Next manager: start at §0, then read this snapshot, then resume.
```

Also update §16 (Lessons learned) and §17 (Risk register) before stopping. Don't touch in-flight sub-agent tasks — they complete or time out independently.

---

## §15 Quality gates (per batch close)

Manager runs these end-of-batch, before marking briefs 🟢:

1. **URL liveness** — every competitor URL has 200 status + date stamp; manager re-checks 5% sample independently.
2. **Citation reality** — every gov.uk / legislation.gov.uk / HMRC URL resolves; cross-check page title against section reference (catches hallucinated CG-manual numbers per §16.31).
3. **Cannibalisation snapshot match** — brief cites the Cannib Index timestamp matching the batch-start snapshot.
4. **House-position reference validity** — every `§N.M` cited exists in current `house_positions.md`.
5. **Section completeness** — all required Stage 2 sections present and non-empty.
6. **Anti-templating spot check** — manager reads 2 random briefs and confirms gap-mode diagnosis differs.
7. **Wave 5 collision scan** — re-read `wave5_stage1_candidates_*.md` fresh at batch close; new collisions surface here.

For the trial: gates apply to the 3 hand-drafted briefs and the Track 2B output.

---

## §16 Lessons learned (running log)

(Empty at trial start. Populated post-trial and post-each-Phase-2-batch.)

---

## §17 Risk register

1. **Wave 5 back-patches collide with Track 2A candidates.** Heartbeat re-read at every batch + ⚠️ collision status. Manager decides resolution.
2. **Cannibalisation drift mid-batch.** Index is append-only within a batch; §4 Wave 5 section refreshes per batch.
3. **Sub-agent template drift across 234 pages.** Trial validates by hand-drafting 3 briefs across 3 gap modes before any sub-agent runs.
4. **Sub-agent URL hallucination (§16.31).** URL liveness as quality gate; manager re-checks 5% sample independently.
5. **House-position late-lock changes.** Briefs carry lock-date stamps; future execution wave re-reads only the cited sections that changed.
6. **Universe under/over-counting.** Stage 0 exclusion audit is line-by-line auditable; if Stage 1 finds an unreconcilable slug, flag to manager.
7. **DeepSeek-era brief contamination.** Track 2A sub-agents instructed not to read deprecated briefs at `briefs/property/<slug>.md` (top level, the 63 from 2026-05-21) unless explicitly cited as starter signal.
8. **Wave 5 merges mid-Phase-2.** When Wave 5 lands its 30 net-new on `main`, the universe drops to ~204. Re-run exclusion arithmetic and refresh the Cannibalisation Index at the boundary.

---

## §18 File map

**Created by Track 2 manager:**
- `docs/property/TRACK2_PROGRAM.md` — this doc
- `docs/property/track2_universe_2026-05-23.md` — residual universe
- `docs/property/track2_exclusion_audit_2026-05-23.md` — exclusion audit
- `docs/property/track2_cannib_index_2026-05-23.md` — cannibalisation index
- `docs/property/track2_page_tracker.md` — Track 2A tracker
- `docs/property/track2_site_wide_flags.md` — append-only flag log
- `docs/property/_tmp_track2_excluded_slugs.txt` — 173 excluded slugs (helper)

**Created by Track 2A sub-agents (Phase 2):**
- `briefs/property/track2/_stage1_stubs/<slug>.md` — Stage 1 stubs
- `briefs/property/track2/<slug>.md` — full briefs
- `briefs/property/track2/_stage1_batch_<N>.md` — batch summary
- `briefs/property/track2/_stage2_batch_<N>.md` — batch summary

**Created by Track 2B sub-agent:**
- `docs/property/track2b_competitor_sitemap_gaps_<date>.md` — scored candidate list

**Read-only sources (never edited):**
- `docs/property/NETNEW_PROGRAM.md`
- `docs/property/house_positions.md`
- `docs/property/topic_gaps_final.md`
- `docs/property/wave{1-5}_*` files
- `docs/property/page_rewrite_tracker.md`
- `briefs/property/wave{4,5}/<slug>.md` (Wave brief format reference)
- `briefs/property/_sitemap_cache_v2/*.json` (Track 2B input)
- `Property/web/content/blog/*.md` (the 406 published blog pages)

**Deprecated, do not consume (the 63 DeepSeek-era briefs at `briefs/property/<slug>.md` top-level):**
- These existed for the 2026-05-21 rewrite session. Per `docs/competitor_rewrite_playbook.md` §6 they have known parser bugs. Track 2A drafts a fresh brief; does not consume the deprecated brief except as historical reference if a sub-agent needs to understand prior framing decisions.

---

## §19 Open decisions

1. **Phase 2 scale (post-trial):** how many briefs to draft in Phase 2 (all 234 or top-30 first)? Decided after user reviews 3 trial briefs.
2. **Track 2B expansion (post-trial):** keep mining limited to 56 cached sitemaps, or fetch the remaining 179 v2-universe domains? Decided after seeing the 56-domain candidate yield.
3. **Stage 1 vs single-stage:** for Phase 2, is the Stage 1 stub step worth the overhead, or should Stage 2 sub-agents draft full briefs directly? Decided after first Phase 2 batch.
4. **GSC data freshness:** if Wave 5 doesn't ship before Phase 2 begins, do we re-pull GSC data per-batch or rely on a single snapshot? Decided based on Wave 5 timing.
5. **DataForSEO selective use:** trial-phase decision was zero; if trial briefs are thin on signal for low-GSC pages, revisit a $5-10 scoped budget for ~30 thin-GSC pages.

---

## §20 Glossary

- **Gap-mode codes:** `DEPTH` (page covers <70% of competitor depth), `CTR-FAIL` (ranks top 10, CTR <50% of position-expected), `CANNIBAL` (primary query overlaps another on-site page), `VOICE-FRESHNESS` (page tone is generic/AI-feeling, or figures outdated), `STRUCTURE` (page lacks H2 sections / FAQs / schema vs competitor pattern), `INTENT-MISMATCH` *(new, surfaced 2026-05-23 by gold-reference exercise on cgt-rates page)* — page surfaces for queries where a meaningful fraction of impression volume is irrecoverable (users explicitly searching for a competing authoritative source like gov.uk, or queries satisfied by AI Overview / Featured Snippets without click-through). Realistic post-rewrite CTR target for INTENT-MISMATCH pages should be tempered (5-10× current, not full position-CTR-benchmark).
- **Cannib status codes (Track 2A):** `REWRITE` / `REDIRECT-PROPOSED` / `SKIP-NO-ACTION` / `FLAG-MANAGER`.
- **Cannib status codes (Track 2B):** `NEW` / `DUPE-EXISTING` / `DUPE-IN-FLIGHT` / `DUPE-ALREADY-CANDIDATE`.
- **Status legend (tracker):** ⬜ todo / 🟦 stage1_done / 🟡 stage2_drafting / 🟢 brief_drafted / ⏭️ skip / ✅ executed / ⚠️ collision.
- **Heartbeat:** §3 of this doc, updated by manager every batch.
- **Wave 5 heartbeat:** the act of re-reading `wave5_*` files + NETNEW_PROGRAM §3 + `house_positions.md` at the start of every Stage 2 batch.
- **Trial phase:** Stage 0 + template + 3 hand-drafted Track 2A briefs + Track 2B sub-agent dispatch on 56 cached sitemaps. Defined in `C:\Users\user\.claude\plans\let-s-really-think-this-rustling-canyon.md`.
- **§16.18 / §16.31 / §16.32:** Lessons from NETNEW_PROGRAM.md §16 that Track 2 inherits — reasoning-first selection, URL-liveness mandatory, cross-bucket sequencing.
