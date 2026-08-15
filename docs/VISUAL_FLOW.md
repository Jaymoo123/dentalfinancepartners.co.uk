# Optimisation Engine — Visual Flow

How decisions are made at every stage of the pipeline. Read top-to-bottom.

---

## 1. The big picture — 7 stages

```
┌────────────────────────────────────────────────────────────────────┐
│  STAGE 1: INGESTION (data refresh — usually weekly)                 │
│  ─────────────────────────────────────────────────                  │
│   GSC API ──┐                                                       │
│             ├──→ gsc_query_data (page × query × date)               │
│   Google ───┤                                                       │
│   Autocomp. ┘                                                       │
│   DataForSEO ──→ dataforseo_keyword_data + competitor_data          │
│   Serper SERP (on demand, per topic) ──→ research_cache             │
└────────────────────────────────────────────────────────────────────┘
                              ↓
┌────────────────────────────────────────────────────────────────────┐
│  STAGE 2: CROSS-SITE RELEVANCE SCORING (LLM)                        │
│  ─────────────────────────────────────────                          │
│   For each keyword: which of the 4 sites is it actually for?        │
│   Strict gates: commercial/info intent, UK-relevant, on-topic, no   │
│   navigational/branded/consumer-product/US-specific queries.        │
│   Output: relevant_sites[] + primary_site + kept/reject_reason      │
└────────────────────────────────────────────────────────────────────┘
                              ↓
┌────────────────────────────────────────────────────────────────────┐
│  STAGE 3: DETECTION (rule-based, time-stratified)                   │
│  ────────────────────────────────────────────                       │
│   5 detectors run against gsc_query_data + dataforseo_keyword_data: │
│     • detect_ctr_problems          (low CTR + good rank → meta)     │
│     • detect_near_miss_expansion   (pos 8-20 + traffic → expand)    │
│     • detect_content_refresh       (declining trajectory → refresh) │
│     • detect_cannibalisation       (multi-page on same q → realign) │
│     • detect_dataforseo_keyword_gap (no GSC + DFS volume → new)     │
│   Time slicing: last 7d vs prior 21d vs older 90d → trajectory      │
│   14-day re-ship gate: skip pages with recent shipped changes       │
│   Output rows → optimisation_opportunities (status='proposed')      │
└────────────────────────────────────────────────────────────────────┘
                              ↓
┌────────────────────────────────────────────────────────────────────┐
│  STAGE 4: NOISE CLEANUP                                             │
│  ──────────────                                                     │
│   • noise_filter pattern blocklist (vehicle tax, brand lookups,     │
│     US terms, dental-consumer, generic calculators, govt-nav, etc.) │
│   • cross_site_rejection bridge: opportunities whose primary_query  │
│     was rejected by v2 → marked status='rejected'                   │
└────────────────────────────────────────────────────────────────────┘
                              ↓
┌────────────────────────────────────────────────────────────────────┐
│  STAGE 5: ACTION SPECIFIER (LLM)                                    │
│  ─────────────────────────                                          │
│   For each surviving opportunity, decide WHAT TO ACTUALLY DO:       │
│                                                                     │
│      input: opportunity + page body (if exists) + sibling pages     │
│           ↓                                                         │
│      DeepSeek decides 1 of 10 action_kinds:                         │
│        meta_only / in_text_embedding / new_section / faq_addition   │
│        new_page / schema_only / internal_links_only / skip          │
│        glossary_entry / pillar_guide / case_study / comparison_page │
│           ↓                                                         │
│      output → action_plan + action_plan_confidence persisted on opp │
└────────────────────────────────────────────────────────────────────┘
                              ↓
┌────────────────────────────────────────────────────────────────────┐
│  STAGE 6: STANDUP (operator's morning view)                         │
│  ──────────────────────                                             │
│      python -m optimisation_engine.standup                          │
│                                                                     │
│   [1] GSC delta (last 7d vs prior 7d, per site)                     │
│   [2] Shipped changes maturing (7/14/28-day windows)                │
│   [3] Queue matrix: site × action_kind × confidence                 │
│   [4] TACKLE FIRST: top 10 by score × ap_conf                       │
│   [5] Red flags (declining shipped changes, untouched high-conf)    │
└────────────────────────────────────────────────────────────────────┘
                              ↓
┌────────────────────────────────────────────────────────────────────┐
│  STAGE 7: REVIEW & APPLY (operator-driven CLI)                      │
│  ──────────────────────                                             │
│      python -m optimisation_engine.apply.review_and_apply           │
│                                                                     │
│   For each opportunity in queue (sorted by score × ap_conf):        │
│     ┌─────────────────────────────────────────────────────────┐    │
│     │ Build ChangeBrief                                       │    │
│     │   ├─ Read CURRENT STATE of target page                  │    │
│     │   ├─ Research Synthesizer fetches 8-10 authority sources│    │
│     │   ├─ Format-specific writer generates content+citations │    │
│     │   ├─ Fact-checker validates against UK facts catalogue  │    │
│     │   ├─ Citation density + diversity validators            │    │
│     │   ├─ Em-dash post-processor + brand voice checks        │    │
│     │   └─ E-E-A-T schema generated for the frontmatter       │    │
│     │ ↓                                                       │    │
│     │ Print 3-section brief: WHAT / OPPORTUNITY / CHANGE      │    │
│     │ ↓                                                       │    │
│     │ Operator decides: [a]pply / [r]eject / [s]kip / [q]uit  │    │
│     │ ↓                                                       │    │
│     │ On apply: backup → edit → validate → git commit →       │    │
│     │           record optimisation_changes → mark opp shipped │    │
│     └─────────────────────────────────────────────────────────┘    │
└────────────────────────────────────────────────────────────────────┘
                              ↓
                ┌──────────────────────────────┐
                │  ROLLBACK PATH (any change)  │
                │  rollback <change_id> --reason│
                │  Auto-strategy: path_revert  │
                │  or git_revert; new commit;  │
                │  optimisation_changes        │
                │  marked rolled_back=true     │
                └──────────────────────────────┘
```

---

## 2. The Action Specifier decision tree

When the system has a proposed opportunity, it must decide what kind of
change to make. This is the most important decision in the system:

```
                  [proposed opportunity]
                          │
                          ▼
            ┌─────────────────────────────┐
            │ Was this page shipped a     │
            │ change in last 14 days?     │
            └─────────────────────────────┘
                  │                │
              YES │            NO  │
                  ▼                ▼
            action_kind        ┌──────────────────────┐
            = 'skip'           │ Does the target_url  │
            (recency gate)     │ point at an existing │
                               │ markdown page?       │
                               └──────────────────────┘
                                  │            │
                              NO  │       YES  │
                                  ▼            ▼
                          ┌──────────┐   ┌────────────────────────┐
                          │ no page  │   │ Is the page already    │
                          │ exists   │   │ ranking well (pos 1-5) │
                          │ for this │   │ but losing CTR?        │
                          └──────────┘   └────────────────────────┘
                              │              │           │
                              ▼          YES │       NO  │
                       ┌──────────────┐      ▼           ▼
                       │ Is volume    │  meta_only   ┌──────────────────────┐
                       │ high (200+)? │              │ Does the page have   │
                       │              │              │ the topic but lack   │
                       └──────────────┘              │ depth (pos 8-20)?    │
                          │       │                  └──────────────────────┘
                       YES│    NO │                      │           │
                          ▼       ▼                  YES │       NO  │
                       new_page   skip                  ▼            ▼
                                  (low-volume       expand_page    intent_realignment
                                   noise floor)     OR new_section  OR rewrite_meta
```

---

## 3. The Research Synthesizer source pyramid

When a `new_page` / `new_section` / `pillar_guide` / etc is being built,
the synthesizer harvests claims from a tiered pyramid:

```
                    ┌─────────────────────────────┐
                    │   TIER 1: CANONICAL (18)    │
                    │   gov.uk · hmrc.gov.uk      │
                    │   legislation.gov.uk · ONS  │
                    │   OBR · BoE · Parliament    │
                    │                             │  scored 80-100
                    │   These set the source of   │
                    │   truth — Google trusts     │
                    │   these intrinsically       │
                    └─────────────────────────────┘
                                  ▲
                                  │
                    ┌─────────────────────────────┐
                    │   TIER 2: AUTHORITY (33)    │
                    │   ICAEW · CIOT · IFS · BDA  │
                    │   NRLA · FCA · GDC · ACAS   │
                    │                             │  scored 70-95
                    │   Professional bodies,      │
                    │   regulators, research      │
                    │   institutions              │
                    └─────────────────────────────┘
                                  ▲
                                  │
                    ┌─────────────────────────────┐
                    │   TIER 3: INDUSTRY (35)     │
                    │   Tax Journal · Big-4 · ATT │
                    │   AccountingWEB · Rossmartin│
                    │   Estates Gazette · BDIA    │
                    │                             │  scored 60-80
                    │   Specialist trade press    │
                    │   and Big-4 commentary      │
                    └─────────────────────────────┘
                                  ▲
                                  │
                    ┌─────────────────────────────┐
                    │   TIER 4: PRESS (15)        │
                    │   FT · BBC · Telegraph      │
                    │   Reuters · Bloomberg       │
                    │                             │  scored 55-80
                    │   Cite only when topical    │
                    │   AND recent                │
                    └─────────────────────────────┘

For each tier, Serper site: queries return top N organic results from each
domain. Pages are fetched, parsed via BeautifulSoup, and DeepSeek extracts
up to 6 SPECIFIC, CITABLE claims per source.

Claims are then passed into the content writer with strict citation rules:
  • [n] markers inline
  • Minimum 1 citation per 200 words
  • Minimum 5 unique sources across the page
  • Minimum 2 tier types represented
  • Canonical tier MUST be cited at least once
```

---

## 4. What the operator sees on screen

When you run `python -m optimisation_engine.apply.review_and_apply`:

```
################################################################################
# OPPORTUNITY 1/10
################################################################################
================================================================================
 CHANGE BRIEF  [meta_only]  site=property
================================================================================
target_url:  https://www.propertytaxpartners.co.uk/blog/.../my-page
file_path:   Property/web/content/blog/my-page.md
opp_id:      f3a2b1c0-...

[1] WHAT IT IS — current state
--------------------------------------------------------------------------------
  slug: 'my-page'
  metaTitle: 'Old Title'
  metaDescription: 'Old description...'
  ...

[2] THE OPPORTUNITY — signal + reasoning
--------------------------------------------------------------------------------
  Page ranks well but earns no clicks — meta needs front-loaded query.

  primary_query: 'uk cgt rates 2026'
  page_impressions_28d: 100
  page_ctr_28d: 0.0
  best_position_28d: 2.3
  trajectory: improving
  detector_confidence: high
  action_specifier_confidence: 92

[3] THE CHANGE — what will be modified
--------------------------------------------------------------------------------
summary: Rewrite metaTitle + metaDescription on my-page

files_to_modify:
  - Property/web/content/blog/my-page.md

  metaTitle_before: 'Old Title'
  metaTitle_after: 'UK CGT Rates 2026: 18% & 24% Explained'
  metaDescription_before: 'Old description...'
  metaDescription_after: 'UK CGT rates for 2026/27...'

--------------------------------------------------------------------------------
DECISION: READY TO APPLY

validators:
  [PASS] file_exists
  [PASS] metaTitle_char_limit
  [PASS] metaTitle_no_banned_chars
  [PASS] metaTitle_contains_query_token
  [PASS] metaDescription_char_limit
  [PASS] metaDescription_no_banned_chars
  [PASS] change_is_meaningful
================================================================================

[a]pply / [r]eject / [s]kip / [q]uit >
```

**At the prompt the operator says: "apply this one" → agent presses `a`**

What happens behind the scenes when `a` is pressed:
1. File is backed up to `.bak` sibling
2. YAML frontmatter is updated (new metaTitle + metaDescription; old values pushed to `_prev`)
3. E-E-A-T schema regenerated, `dateModified` set to today, `reviewedBy` stamped
4. File round-trip parse verified (still valid YAML + markdown)
5. `git add <file>` + `git commit -m "..."` (per-change message)
6. Insert row into `optimisation_changes` with: target_url, change_type, before/after snapshot, git commit hash, gsc_baseline, 28-day review_due_at
7. Mark `optimisation_opportunities` row as `status='shipped'` + `applied_change_id`
8. `.bak` deleted

If ANY step fails, the file is restored from backup and the brief surfaces
the failure. Nothing is left half-applied.

---

## 5. Validators — what blocks a change

Every apply module has its own validator set. **Any failure blocks apply.**

### meta_only validators
- File exists on disk
- metaTitle: 15-60 chars, no em-dashes, no hype phrases, contains primary query token
- metaDescription: 120-170 chars, no em-dashes, no hype phrases
- New values differ from current (change_is_meaningful)

### new_section validators (research-grounded)
- File exists; insertion point found in body
- Heading 10-100 chars, no em-dashes, no hype, not duplicating existing H2
- Research bundle returned >= 1 source
- LLM-generated body coherent (auto_applicable from runner)
- **Citation density >= 4 per 1000 words**
- **Citation diversity: 3+ unique sources across 2+ tiers**
- **Canonical source present in bundle**
- Fact-check: all numeric claims match UK facts catalogue
- Post-edit markdown still valid (matched HTML tags)

### new_page validators (full page)
- Slug present + does not already exist
- Primary H1 10-100 chars + no banned chars
- Section outline has 3+ entries
- Word count 500-4000 target
- Research bundle returned >= 1 canonical source
- Generated metaTitle <= 60 chars; metaDescription 130-170 chars
- 5+ FAQs (3-8 valid range)
- **Citation density >= 5 per 1000 words**
- **Citation diversity: 5+ unique sources across 2+ tiers**
- Generated body >= 50% of target word count
- Fact-check on body and summary

### pillar_guide validators (the stand-out flagship)
- All new_page validators PLUS:
- Body >= 2500 words
- **Citation density >= 6 per 1000 words**
- **Citation diversity: 6+ unique sources across 3+ tiers**
- Quick-reference table HTML present (`<table>`)
- 5-7 FAQs

---

## 6. Failure modes and recovery

| Failure | What happens | Operator action |
|---|---|---|
| Validator catches em-dash | Apply blocked at brief stage; can_apply=False | Reject or re-run; em-dash post-processor will strip on next try |
| Generated body too short | Apply blocked; word count visible in brief | Reject; increase target_word_count in opp.action_plan, retry |
| Citation density too low | Apply blocked | Reject; reseed research with broader query |
| Fact-check mismatch (LLM hallucinated a rate) | Apply blocked; brief shows the wrong claim + expected fact_ids | Always reject — never ship hallucinated facts |
| Recency gate fires | Brief returns action_kind=skip with reason | Move on; page is in measurement window |
| File doesn't exist | Pre-apply file_exists fails | Reject; opportunity is stale (page deleted?) |
| Git commit fails (e.g. pre-commit hook) | File restored from backup; ApplyError surfaced | Investigate the hook failure |
| Slug already exists (new_page) | Apply blocked before generation | Reject; route to expand_page or skip |
| HEAD check fails on external link | Apply blocked at validator | Reject; suggester picks alternative URL on next run |

---

## 7. Quick reference: when the operator says X

| Operator says | Run this command |
|---|---|
| "What's the state of things?" | `python -m optimisation_engine.standup` |
| "Let me walk the queue" | `python -m optimisation_engine.apply.review_and_apply` |
| "Just show me — don't actually apply" | add `--dry-run` |
| "Only high-confidence Property opps" | `--site property --min-confidence 85` |
| "Show me the proposed prose without applying" | `--dry-run` (brief includes generated body) |
| "Undo that change" | `apply.rollback --recent` then `apply.rollback <id> --reason "..."` |
| "Refresh all the data" | the Standard Refresh sequence in OPERATOR_RUNBOOK.md |
| "Build me a pillar guide on X" | manually insert opp with `action_kind='pillar_guide'` (see runbook) |
| "Why did X get flagged" | `apply/dispatcher.build_brief_for(<opp>)` shows full reasoning |

---

This document and `OPERATOR_RUNBOOK.md` together cover every command and decision.
