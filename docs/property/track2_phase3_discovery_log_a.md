# Track 2 Phase 3 — Worktree A discovery log

Append-only. Worktree A sub-agent appends execution-time discoveries (not blocking, but worth surfacing) here. Manager reads at Phase 3 close + feeds into post-Phase-3 backlog.

**Critical:** edits via ABSOLUTE PATH `C:/Users/user/Documents/Accounting/docs/property/track2_phase3_discovery_log_a.md` only.

**Format:** `D-A<N> | YYYY-MM-DD HH:MMZ | TAG | summary` plus optional sub-bullets.

**Tags:** `EXISTING_PAGE_STALE` (adjacent residual page surfaced drift while reading for cross-link), `ADJACENT_TOPIC` (a topic gap surfaced that's worth a future net-new brief), `CALCULATOR_IDEA`, `COMPONENT_IDEA`, `INTERNAL_LINK_OPPORTUNITY` (sibling page would benefit from a forward-link to your fresh rewrite), `AUTHORITY_GAP` (a citation source the brief didn't surface), `CROSS_TRACK_LINK` (Wave 5/6/7 page should cross-link in or out), `HOUSE_POSITION_GAP` (suggests new house position needed), `BUILD_QUIRK` (npm run build edge case worth noting for future executions).

**monitored_pages staging entries:** append separately to discovery log at brief completion:
`monitored_pages row needed: slug=<slug>, tracking_type=rewrite_post, baseline_imp=<X>, baseline_clicks=<Y>, window=90d, brief_id=<row id>`

**No discoveries yet.** Worktree A sub-agent appends D-A1, D-A2, ... as work proceeds.
