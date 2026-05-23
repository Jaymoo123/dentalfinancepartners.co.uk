# Property Wave 4, Session B, start here (MTD ITSA operational details)

**You are Session B.** One of three parallel Claude Opus 4.7 sessions writing NET-NEW Property pages from scratch. Your assignment is **MTD ITSA operational details**, 10 pages covering joint-owner quarterly filings, software-per-scenario, agent involvement (ASA), foreign income inside MTD, late-update + late-payment penalty worked examples, letting-agent who-files, pension funds + rental, spreadsheet+bridging, mid-year cessation, digital-records evidence discipline.

This is **Wave 4** of the Property Net-New Program. Waves 1 + 2 + 3 (91 net-new pages) are on `main` already; Wave 3 Bucket B (10 MTD ITSA pages) is the immediate predecessor and your siblings.

## Worktree

You run inside `C:/Users/user/Documents/Accounting-wt-property-wave4-b/` on branch `property-wave4-b`. **Stay inside that worktree.**

## Read order before touching any code

1. **This file**.
2. **`docs/property/NETNEW_PROGRAM.md`** — §4 brief anatomy, §7 workflow, §8.4 watcher, §16.11-16.22 + §16.27 lessons.
3. **`docs/property/house_positions.md`** — for Wave 4 Session B read **section 3 (headline MTD ITSA position)** + **section 19 (Wave 3 MTD extension)** including the corrected §19.7 (15/30/31 + 3%/3%/10% penalty regime) AND any §19 Wave 4 extension landed by the manager pre-launch (see `wave4_house_positions_extensions.md`). The extension likely covers agent involvement / ASA mechanics, foreign income + FX translation, pension funds + rental, letting-agent who-files, spreadsheet+bridging digital-link rule, mid-year cessation.
4. **Your assigned briefs** at `briefs/property/wave4/*.md`.
5. **`docs/property/wave4_page_tracker.md`** — master tracker.
6. **Wave 3 Session B's 10 pages** at `Property/web/content/blog/mtd-itsa-*.md` are your immediate siblings; READ them before writing your Wave 4 pages. Your Wave 4 pages are the operational-depth siblings, not duplicates.

## Per-page workflow

Same canonical 19-step workflow as Wave 3 Session B (see brief for full detail).

## Wave 2/3 lessons baked into Wave 4

§16.14, §16.15, §16.16, §16.17 — same as Session A doc. Read those.

**Specific to MTD bucket (from Wave 3 Session B [SESSION_B_COMPLETE] handover):**
- §19.7 was freshly corrected to 15/30/31 + 3%/3%/10% (Spring Statement 2025 acceleration). DO NOT use legacy 31/46/91 + 2%/2%/4%.
- F-7 + F-9: three legacy MTD pages (`mtd-rental-income-threshold-exemptions`, `mtd-quarterly-reporting-landlords-step-by-step-guide`, `mtd-penalties-landlords-miss-deadline`) carry 3 factual errors (wrong exit-period, wrong "5th of month" deadlines, legacy 2%/2%/4% penalty schedule). If you read those pages for cannibalisation context, DO NOT carry forward their figures. The §19 house position is the tie-breaker. F-7 + F-9 back-patch is in the post-merge cleanup queue, not your problem to fix.
- F-12: internal-link category-URL verifier hardening recommended. Until the verifier is hardened, manually check that each `/blog/[cat]/[slug]` link's `[cat]` segment matches the destination file's frontmatter `category` field.
- F-10 + F-14: HowTo schema candidates flagged for B6 (action-plan) and A10 (ATED six-step). Wave 4 B5 (late-payment worked examples) and B3 (ASA walkthrough) may also be HowTo candidates. Flag in your work-log if your H2 outline is step-indexed.

## Q&A channel + watcher

`docs/property/wave4_questions_session_B.md`. Watcher pattern identical to Session A doc.

## Universal rules

Voice / lead-gen / FAQs identical to other sessions.

### Anti-templating (MTD bucket)
- 10 operational-mechanics pages cannot read like 10 versions of the same MTD intro. Each brief's framing differentiator says what makes that page distinct. Honour it.
- B1 (joint owner filings) vs Wave 3 B3 (joint owner threshold): Wave 3 B3 was the threshold-test mechanic (who's in); B1 is the quarterly-cycle filing mechanics (how they file once in). Cross-link both directions.
- B5 (penalty worked examples) is the numbers sibling of Wave 3 B6 (HMRC letter action page) and Wave 3 B8 (six-changes overview). B5 holds the worked-example floor; B6 + B8 hold the action/overview floor.
- B2 (software decision tree) is NOT a "best of" listicle. We are a tax firm, not a software reseller. Lead with the decision framework, recommend evaluation criteria, do not name a single "best" product.

### House positions
- §3 + §19 (Wave 3 extension) + any §19 Wave 4 extension. §15 (IHT) is tie-breaker for ANY IHT cross-link (B7 SIPP/SSAS borders pension-IHT; B9 cessation borders CGT-disposal-on-property-sale).

## Cross-bucket coordination flags (set at Stage 1, watch during write)

- **B4 (foreign property income inside MTD) vs Wave 2 `foreign-tax-credit-uk-property-overseas-landlords`:** Distinguish — B4 is MTD-side reporting mechanic; existing Wave 2 page is FTC credit mechanism. Cross-link both directions.
- **B7 (SIPP/SSAS property + MTD) vs Wave 2 `pension-iht-april-2027-landlord-estate-planning`:** Distinguish — B7 is MTD-exclusion mechanic for SIPP-held property; Wave 2 page is IHT-on-pension reform. Both are pension+property edge cases; cross-link.
- **B9 (mid-year cessation) vs Wave 3 B4 (3-year sub-threshold exit):** Wave 3 B4 was income-drop exit; B9 is disposal-driven cessation. Cross-link both directions.

## Your Session B pages (10 assigned)

| # | Slug |
|---|---|
| B1 | mtd-itsa-joint-property-owners-quarterly-filing-mechanics-each-spouse |
| B2 | mtd-itsa-choosing-software-by-landlord-scenario-decision-tree |
| B3 | mtd-itsa-agent-services-account-asa-authorisation-walkthrough |
| B4 | mtd-itsa-foreign-property-income-quarterly-reporting-rules |
| B5 | mtd-itsa-late-submission-points-late-payment-15-30-31-worked |
| B6 | mtd-itsa-letting-agent-managed-portfolio-who-files-quarterly |
| B7 | mtd-itsa-pension-funds-sipp-ssas-holding-rental-property-treatment |
| B8 | mtd-itsa-spreadsheets-with-bridging-software-allowed-mechanics |
| B9 | mtd-itsa-stopping-letting-mid-year-cessation-quarterly-mechanics |
| B10 | mtd-itsa-digital-records-receipts-bank-feeds-what-counts-evidence |

## Continuation prompt boilerplate

Same as Session A doc: commit current page, flip tracker, log 1-line stop point.

## When you're done with all 10

Update tracker summary + append `[SESSION_B_COMPLETE]` to `wave4_site_wide_flags.md`.

Begin with the first row.
