# Property Track 1 — site-wide flags (append-only)

**Append-only.** Each session adds to the bottom with timestamp + session ID. Never edit existing entries.

**Format:** `## [TIMESTAMP] [SESSION_ID] [CATEGORY] Title` then a body paragraph describing the issue, impact, and recommendation.

**Categories:**
- `FACTUAL` — factual issue or conflict with a competitor source
- `CANNIBAL` — cannibalisation concern with an existing or sibling Track 1 page
- `POSITIONING` — brand / lead-gen positioning question
- `HOUSE_POSITION_CONFLICT` — competitor evidence contradicts the locked house position
- `REDIRECT` — middleware redirect action needed at launch (or already applied)
- `INTERNAL_LINK` — propose adding a back-link from an existing page to your new page
- `SCHEMA` — non-default schema type (HowTo, Course, etc) might add SERP value
- `CALCULATOR_IDEA` — page would benefit from an interactive calculator we don't have
- `COMPONENT_IDEA` — competitor uses a UI pattern (comparison table style, decision matrix, downloadable template) we lack
- `CROSS_NICHE_LINK` — topic bridges niches (Property ↔ Medical / Solicitors / etc) — flag for cross-network linking
- `BUILD_BLOCKER` — build is breaking for a reason that isn't your own page (mid-edit YAML in a sibling session, etc) — needs orchestrator
- `OTHER` — anything else (general observations belong in your session's discovery log, not here)

**When to use this file vs the discovery log:**
- **Flags file (this file):** issues that need orchestrator action or resolution. Cross-session blockers, factual conflicts, missing pages causing 404s, etc.
- **Discovery log** (`docs/property/track1_discovery_log_session_<X>.md`): observations and ideas that compound into future waves but don't need immediate action. Adjacent topics, component ideas, authority gaps, etc.

---

## [Sessions: append below this line]
