# Topic universe — Charities & non-profits pilot (R3)

Date: 2026-07-11. Pool files: `topic_pool.json` (raw dedup output), `topic_pool_final.json`
(judged final, machine-readable). Raw sources under `raw/`.

## Derivation (no rounding — every step auditable)

| Step | Count | Evidence |
|---|---|---|
| Google Autocomplete sweep (25 charity seeds × a-z suffixes, en-GB) | 2,752 unique suggestions | `raw/autocomplete_raw.json` |
| DataForSEO keyword_suggestions (8 seeds, UK) | 632 rows | `raw/dfs_keyword_suggestions.json` |
| DataForSEO ranked_keywords (charityaccountants.co.uk, kgaccountantsblog.com, charityaccountant.co.uk, iel.org.uk; top 500 by volume each) | 565 rows | `raw/dfs_ranked_keywords.json` |
| Rival sitemap crawl (18 verified rivals; 14 crawlable, 3,836 URLs) → slug-derived topics | 396 kept | `raw/rival_sitemaps.json` (doorway/location pages filtered by the charity-term gate) |
| **Union after relevance filter + in-pool exact dedup** | **3,345 raw terms** | `topic_pool.json.raw_pool_size` |
| Estate dedup gate: exact + fuzzy (difflib ≥0.90 drop, 0.78-0.90 borderline) vs **8,000+ estate titles** (all 2,760 live sitemap URLs in `own_estate_exclusion.json` + 2,035 Supabase `blog_topics` rows, read-only dump `raw/estate_blog_topics.json`) | −12 fuzzy, 136 borderline flagged | `topic_pool.json` |
| Judgment pass on every fuzzy/borderline pair | **10 of 12 fuzzy drops RESTORED** (CIC↔CIS sorted-token false positives, e.g. "cic registration" ↔ "cis registration"); 2 confirmed true dupes; borderline pairs all false positives (cross-niche city/pattern collisions, e.g. "charity accountants birmingham" ↔ "birmingham property accountant") | `s5b_finalise.py` RESTORE list |
| Junk sweep (career/job intent, non-UK geo, app/login noise) | −51 | `topic_pool_final.json.junk_terms` |
| **Final keyword pool** | **2,832 keywords** | `topic_pool_final.json` |
| Greedy page-level clustering (difflib ≥0.85 on sorted-token norm) | **1,660 topic clusters** | `topic_pool_final.json.clusters` |

**Honest content-volume number: 1,660 page-level topics**, of which **291 carry measured UK
search volume** (22 at ≥1,000/mo, 121 at 100-999/mo, 148 at 10-99/mo). The remaining ~1,369 are
long-tail/autocomplete- and sitemap-derived topics with no measured volume — they are queue
material to be volume-checked in batches at wave time, not guaranteed pages. Treat **~300
volume-evidenced topics** as the defensible core corpus and 1,660 as the ceiling.

## Why the estate dup rate is ~0% here (vs 47% historical)

The dedup gate found only **2 true estate collisions** — both against the SAME generalist page
family: hollowaydavies.co.uk has live pages `accountant-for-charities-uk` and
`accountant-for-churches-uk` (blog_topics rows + sitemap, and hollowaydavies actually surfaced
in this sweep's SERPs and was hard-filtered). The charity niche is genuinely virgin territory
for the estate; the 47% historical rate came from intra-adjacent niches. **The two generalist
pages are a launch decision, not a pool problem**: they target the pilot's head term, so at S-launch
the owner must choose migrate/301-to-new-site vs de-optimise vs coexist (data-gated
consolidation rules apply — see DOSSIER.md open questions).

## Source quality notes

- kgaccountantsblog.com ranked_keywords is the richest single source: it proves the CIC
  informational cluster is winnable by a specialist blog (cic 12,100/mo KD10; community interest
  company 6,600/mo KD18; cic34 form 480/mo KD0).
- accountantsforcharities.org.uk and finspireaccounting.co.uk sitemaps are ~90% programmatic
  location doorways — filtered out; their topical content contribution is near zero.
- Autocomplete contributes bulk long-tail; per the intent lens (LAUNCH_CORE.md) much of it is
  trustee-DIY intent — usable as BLUF/answer-box content, not lead pages.
