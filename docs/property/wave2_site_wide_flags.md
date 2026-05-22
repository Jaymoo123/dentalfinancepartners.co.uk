# Property Wave 2 — site-wide flags (append-only)

Sessions append flags here when they encounter cross-session or post-merge issues. **Never blocks** a session — flag and continue.

## Flag categories

- `HOUSE_POSITION_CONFLICT` — competitor evidence contradicts a house position (sessions trust the doc by default; flag if you believe the doc is wrong)
- `CANNIBAL` — two sibling Wave 2 pages overlap such that one shouldn't ship
- `INTERNAL_LINK` — existing Property page should be edited to link to your new page
- `SCHEMA` — non-default schema type (HowTo, Course) might help SERP
- `REDIRECT` — redirect action taken (or not taken) and why
- `POSITIONING` — brand or lead-gen model question
- `BUILD_BLOCKER` — build failing for a non-own-page reason
- `CALCULATOR_IDEA`, `COMPONENT_IDEA`, `CROSS_NICHE_LINK`, `FACTUAL` — also valid

## Format

```
## [F-N] [YYYY-MM-DDThh:mmZ] [CATEGORY] Title
- **Session:** A / B / C
- **Page:** <slug if relevant>
- **Detail:** <2-4 lines>
- **Action taken (if any):** <text>
- **Authorisation needed?** <yes / no — manager fills>
```

---

(flags below — none yet)
