# Query-ledger per-site agent prompt template (Phase 4)

Fill {site}, {site_dir}, {domain}. Agent type: general-purpose (Sonnet-tier worker).

---

READ-ONLY per-site query-ledger review for {site} ({domain}) in C:\Users\user\Documents\Accounting.

HARD CONSTRAINTS:
- You may write EXACTLY ONE file: docs/_engines/query_ledgers/{site}_ledger.md. Nothing else.
- NEVER edit anything under {site_dir} or any site content, config, git state, or Supabase. This is analysis only.
- Pages flagged hold=true are under active watch windows: do not propose any change to them beyond noting the window-close date.

INPUT: docs/_engines/query_ledgers/{site}_ledger.json (generated today by optimisation_engine/analysis/query_ledger.py). Estate context: docs/_engines/ESTATE_AUDIT_2026-07-17.md.

TASKS:
1. For every page with action="ambiguous" AND impressions_90d >= 30: read the live page source file in {site_dir} (find by slug), look at its owning queries/trajectory/CTR-gap in the JSON, and resolve to ONE concrete action from: meta_fix | expand | refresh | consolidate_candidate | new_page_target | healthy. One-line justification each. These are your calls, tagged action_source="llm" in the md. Ambiguous pages below 30 impressions_90d: bulk-classify as "thin — no action yet" in one summary table (count + total impressions), do NOT read each.
2. Sanity-review the deterministic calls: list any you disagree with under a "Disagreements" section with reasoning — do NOT change the JSON.
3. Write docs/_engines/query_ledgers/{site}_ledger.md:
   - Header: site, date, data window, sampling-loss %, curve note.
   - Section 1 — HOLD pages first: table (page, reason, window closes).
   - Section 2 — Actions grouped by type (meta_fix, expand, refresh, consolidate_candidate [mark owner-approval-required], new_page_target): per page a short evidence table of its top owning queries (query, 90d impr, clicks, position, CTR vs expected).
   - Section 3 — Ambiguous resolutions (your calls + justifications).
   - Section 4 — Disagreements with deterministic calls (if any).
   - Section 5 — Healthy pages: one line each.
   - Section 6 — Unowned queries (new_page_target inputs) table.
   Plain UK-English, no em-dashes, complete sentences in prose parts.

RETURN: counts per action type, number of ambiguous resolved, any disagreements, and the 3 highest-value single actions for this site.
