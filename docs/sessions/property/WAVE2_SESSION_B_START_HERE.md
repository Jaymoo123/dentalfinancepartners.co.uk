# Property Wave 2 — Session B — start here (DTAs)

**You are Session B.** One of three parallel Claude Opus 4.7 sessions writing NET-NEW Property pages from scratch. Your assignment is **Double Taxation Agreements (DTAs / tax treaties)**. Sessions A (IHT) and C (Expat / Leaving the UK) have their own pre-assigned lists.

This is **Wave 2** of the Property Net-New Program. Wave 1 (31 SDLT / Ltd Co / VAT / FIC / ATED pages) is on `main` already.

## Worktree

You run inside `C:/Users/user/Documents/Accounting-wt-property-wave2-b/` on branch `property-wave2-b`. **Stay inside that worktree.** Build commands run from that worktree's root.

## Read order before touching any code

1. **This file** (you are reading it).
2. **`docs/property/house_positions.md`** — the LOCKED factual positions. For DTAs, you read **§10 (headline DTA positions)** AND **§16 (Wave 2 DTAs extension)**. §16 gives you the OECD Model 2017 article map, the Art 6 / Art 13 / Art 4 tie-breaker detail, the **NRCGT statutory override over treaty allocations** (critical clarification — UK NRCGT applies whether or not the treaty assigns UK taxing rights), and notes on specific UK bilateral treaties (US, France, Spain, India, China, UAE, Italy, Crown Dependencies). §16.6 confirms the NRL scheme is statutory, NOT treaty-based.
3. **`docs/property/NETNEW_PROGRAM.md`** — manager handover doc. §4 (brief anatomy), §7 (19-step workflow), §8.4 (session-side watcher — new for Wave 2).
4. **Your assigned briefs** at `briefs/property/wave2/<dta-slug>.md`. Each brief is a research package.
5. **`docs/property/wave2_page_tracker.md`** — your assigned pages are in the "Session B pages" table.

## Per-page workflow

Each brief at `briefs/property/wave2/<slug>.md` has the canonical 19-step workflow. Summary:

1. Read house positions doc once at session start — §§9-10 + §§15-17.
2. Claim ONE page (`⬜ todo` → `🟡 in_progress`).
3. Read the brief.
4. Fetch competitor URLs with httpx + BeautifulSoup.
5. Read closest-existing pages.
6. Plan H2/H3 + meta + FAQs + CTA placements.
7. Verify factual claims.
8. Fetch hero image from Pexels.
9. Write markdown at `Property/web/content/blog/<slug>.md`.
10. Build clean.
11. Six verifications.
12. Redirect repointing if brief lists one.
13. Register in `monitored_pages`.
14. **Commit on your branch.**
15. Fill work-log.
16. **Mark `✅ done` in tracker** (only AFTER step 14).
17. Site-wide flags.
18. Discoveries.
19. Claim next page.

**Critical Wave 2 calibration: step 14 (commit) BEFORE step 16 (mark done).** If your build passes but you haven't committed, the row stays `🟡 in_progress`.

## Q&A channel + session-side watcher

If blocked, append to `docs/property/wave2_questions_session_B.md` with `STATUS: open`. Immediately spawn a Monitor task watching for the `STATUS: answered` flip on your latest question. Keep working on a different page or step while waiting.

```bash
QFILE="docs/property/wave2_questions_session_B.md"
LATEST_Q=$(grep -oE '^## \[Q-[0-9]+\]' "$QFILE" | tail -1)
while true; do
  if grep -q "$LATEST_Q.*STATUS: answered" "$QFILE"; then
    echo "ANSWER_LANDED $LATEST_Q"
    break
  fi
  sleep 20
done
```

## Universal rules (non-negotiable)

(Same as Sessions A and C — see those START_HERE docs or the brief itself. Voice: no em-dashes. Specific. Anonymised. Lead-gen: LeadForm auto-injected, asides classless. CSS: semantic HTML only. FAQ: 10-14, frontmatter array, auto-emitted schema. House positions: tie-breaker, flag on conflict. Quality: ~2,500-3,500 body words non-pillar; build clean; 6 verifications pass.)

## Anti-templating (especially important for DTAs)

You have 10 DTA pages and they MUST be distinguishable. The risk: all 10 read like "country X has a treaty with the UK, here are the articles". They don't. Each brief's framing differentiator pins a distinct angle:

- **B1 (tax-treaties-property-investors-treaty-framework-guide):** the framework pillar — OECD model article-by-article + NRCGT statutory override.
- **B2 (UK-US):** US saving clause — citizen-based US taxation regardless of treaty residence.
- **B3 (UK-France):** Art 24A elimination + French CSG/CRDS + UK-France IHT treaty (1963).
- **B4 (UK-Spain):** bilateral two-way scenarios (UK landlord in Spain; Spanish landlord in UK) + Spanish wealth tax.
- **B5 (UK-India):** older 1993 treaty — no Art 13(4) indirect-disposal — UK NRCGT applies anyway.
- **B6 (UK-UAE):** asymmetric — UAE has no income tax — credit mechanism is one-way.
- **B7 (UK-Italy):** Art 4 tie-breaker applied — specific dual-residence dispute scenarios.
- **B8 (DTA tie-breaker generic):** Art 4 cascade mechanics — generic four-stage walkthrough.
- **B9 (foreign tax credit):** UK FTC claim mechanics, TIOPA 2010, FIG-regime context.
- **B10 (Crown Dependencies):** consolidated Jersey / Guernsey / Isle of Man — end of historic shelter.

If two pages share an H2 outline or you find yourself reaching for the same opening, stop and rework. Vary the opening, vary the FAQ phrasing.

## What to handle yourself vs flag

**Handle yourself:** voice / CSS / FAQ discipline; citations; aside placements; cannibalisation differentiation; statements matching house positions.

**Flag to `wave2_site_wide_flags.md`:** `HOUSE_POSITION_CONFLICT`, `CANNIBAL`, `INTERNAL_LINK`, `SCHEMA`, `REDIRECT`, `POSITIONING`, `BUILD_BLOCKER`, `CALCULATOR_IDEA`, `COMPONENT_IDEA`.

**Log to `wave2_discovery_log_session_B.md`:** `ADJACENT_TOPIC`, `EXISTING_PAGE_STALE`, `AUTHORITY_GAP`, `CROSS_NICHE_LINK`.

**Q&A** only when genuinely blocked.

## Cannibalisation watch

The token-overlap check flagged B1 (tax-treaties framework) vs `non-resident-landlord-scheme-uk-complete-guide` (0.44). The framing differentiator separates them: B1 is treaty-framework (residence allocation + credit relief); the existing NRL guide is statutory-scheme (20% withholding). Link bidirectionally. Don't repeat the NRL-statutory content.

The token-overlap check also flagged B3 (UK-France) vs `cgt-inherited-rental-property-calculation-uk` (0.33) — this is a false positive (shared tokens are "cgt + property + rental + income" with no topical overlap). Ignore.

## Your Session B pages (10 assigned — DTAs)

In assignment order. Work top to bottom. Claim ONE at a time.

| # | Slug |
|---|---|
| B1 | tax-treaties-property-investors-treaty-framework-guide |
| B2 | uk-us-dta-property-tax-implications-landlords |
| B3 | uk-france-dta-property-rental-income-cgt |
| B4 | uk-spain-dta-property-uk-resident-spanish-holiday-home |
| B5 | uk-india-dta-property-rental-income-treatment |
| B6 | uk-uae-dta-property-no-tax-jurisdiction-asymmetry |
| B7 | uk-italy-dta-tie-breaker-property-residence-disputes |
| B8 | dta-tie-breaker-test-dual-residence-property-owners |
| B9 | foreign-tax-credit-uk-property-overseas-landlords |
| B10 | uk-jersey-guernsey-isle-of-man-dtas-property-investors |

**Sequence note:** B1 is the framework pillar. Consider writing it first so B2-B10 can link back. B8 (tie-breaker generic) is closely related to B7 (UK-Italy tie-breaker applied) — be careful to differentiate (B7 = specific Italy mechanics; B8 = generic Art 4 cascade with a different worked example).

## When you're done with all 10

Update the summary at the top of `wave2_page_tracker.md` and append a `[SESSION_B_COMPLETE]` paragraph to `wave2_site_wide_flags.md`. Then stop.

Begin with B1 (`tax-treaties-property-investors-treaty-framework-guide`).
