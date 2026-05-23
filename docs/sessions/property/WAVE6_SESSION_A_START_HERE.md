# Property Wave 6, Session A, start here (LtdCo extraction-sequence pillar)

**You are Session A.** One of three parallel Claude Opus 4.7 sessions writing NET-NEW Property pages from scratch. Your assignment is **LtdCo extraction-sequence pillar**. 10 pages covering multi-strand extraction routes from property SPVs (DLA / dividend / salary / employer pension / share buyback / MVL), multi-year sequencing across marginal-relief bands, multi-SPV HoldCo extraction, time-pressure scenarios, mid-incorporation extraction, pre-sale cash-strip, and the trust-owned-SPV extraction edge case.

This is **Wave 6** of the Property Net-New Program. Waves 1-5 (151 net-new pages) are on `main` already (W1-3 deployed; W4 + W5 held pending user decision).

## Q&A discipline (§16.15 + §16.37 CRITICAL — read this first)

When raising a Q to manager, you append to `C:/Users/user/Documents/Accounting/docs/property/wave6_questions_session_A.md` via **ABSOLUTE PATH** from your worktree. **NEVER** append to your worktree's relative-path copy of that file. Manager polls main's path only; questions written to the worktree's relative-path copy are NOT seen by the manager-side watcher and require manual user-side propagation. The same discipline applies to tracker (`wave6_page_tracker.md`), flags (`wave6_site_wide_flags.md`), and discovery (`wave6_discovery_log_session_A.md`) — all absolute-path edits to main. This is §16.15's load-bearing rule; it has been violated in Waves 4 + 5 and §16.37 codifies the prominence requirement.

## Worktree

You run inside `C:/Users/user/Documents/Accounting-wt-property-wave6-a/` on branch `property-wave6-a`. **Stay inside that worktree.** Build commands run from that worktree's root. Sessions BC are in their own worktrees on their own branches; you will never collide.

## Read order before touching any code

1. **This file** (you are reading it).
2. **`docs/property/NETNEW_PROGRAM.md`** — the durable program doc. §0 critical norms, §4 brief anatomy, §7 the 19-step workflow, §8.4 session-side watcher, §11 reasoning-first selection, §13 manager instructions, §16 lessons especially **§16.14 tracker hygiene**, **§16.15 + §16.37 Q&A absolute-path discipline**, **§16.16 word count discipline**, **§16.17 atomic work-unit recovery**, **§16.27 + §16.30 + §16.35 Bill-vs-enacted-Act drift mandatory per-write verification**, **§16.32 cross-bucket sequencing**, **§16.36 statutory cross-check gate**, **§16.38 + §16.39 + §16.40 Wave 6 drift lessons** (the 9+ consecutive drift catch pattern).
3. **`docs/property/house_positions.md`** — the LOCKED factual positions. For Wave 6 Session A: §21 (LtdCo + FIC, Wave 4 base) plus §15.4 (BPR/APR cap for IHT cross-reference) plus §22.13 (Trust-vs-FIC decision boundary, Wave 6 new) plus §22.12 (Settlor-interested IHT, Wave 6 new — A10 only). For A10 you also lean on §22.9-§22.11 to understand the trust-side context cited by B-bucket.
4. **Your assigned briefs** at `briefs/property/wave6/*.md` per the table below. Each brief is your research package: framing differentiator, verified-live competitor URLs (Stage 2 verified URLs at write time), closest-existing pages, authority links, redirect overlap, and the embedded 19-step workflow. Read the brief in full before starting each page.
5. **`docs/property/wave6_page_tracker.md`** — master tracker. Your assigned pages are in the Session A rows.

## Bucket-specific authorities

CTA 2010 (s.18A-18N marginal relief + s.455 + s.464A residual + ss.1030A/1030B liquidation + s.1033 buyback), CTA 2009 (s.54 W&E + s.931A dividend exemption), ITTOIA 2005 (Pt 4 dividends + s.385 + s.396B MVL TAAR per FA 2016), ITEPA 2003 (Pt 2 + s.401), ITA 2007 (Pt 13 Ch 1 TIS + s.479 trust rates + s.682-713), TCGA 1992 (s.10A + s.17 + s.58 + s.122 + s.169I BADR), FA 2004 (pension + Sch 36), FA 2024 (LSA architecture), HMRC manuals (CTM03500-03900 marginal relief, CTM61500+ DLA, CG14430+ connected, SAIM5000+ distributions, PTM042100 employer pension contributions).

## Critical drift catches inherited from Wave 6 Stage 1b + Stage 2 (read before writing any brief that touches these areas)

- **CRITICAL:** CTA 2010 ss.464C/464D **OMITTED in full by FA 2025** with effect from 30 October 2024. A2 brief reframes on s.455 + s.464A residual anti-avoidance; pre-Wave-6 sister pages still citing s.464C/D are stale. Do NOT cite s.464C/D as live statute.
- **CRITICAL:** ITA 2007 s.396B does NOT exist. The MVL anti-phoenix TAAR is at **ITTOIA 2005 s.396B** (inserted by FA 2016 with effect from 6 April 2016). A4 brief uses corrected cite; do NOT propagate the wrong-Act variant.
- **MATERIAL:** CTA 2010 s.18 was omitted FA 2014 then reinstated as **ss.18A-18N by FA 2021**. The "ss.18-44" range is now wrong. Use the specific identities: s.18A (small profits rate), s.18E (associated cos), s.18N (CIHC, per §21.7 program-wide convention). A1/A4/A6/A7 briefs use corrected ranges.
- **MATERIAL:** SDLT connected-co MV rule is **FA 2003 s.53 "Deemed market value where transaction involves connected company"** (NOT Sch 4 para 8 — that is "debt as consideration"). A8 brief uses corrected cite.
- **MATERIAL:** ITTOIA 2005 s.385 is "Person liable" not the POS distribution-treatment authority. A3 brief cites s.385 only as liability anchor; substantive POS-distribution treatment flows via CTA 2010 s.1000 into ITTOIA 2005 Ch 3.
- **MATERIAL:** HMRC CTM61605 is "Assignment and novation of debt" — NOT bed-and-breakfasting. A2 brief flags for session to locate correct CTM chapter (CTM61500+ range).

The pattern: 9+ consecutive Bill-vs-enacted-Act drift catches across the program (§16.22/§16.27/§16.30/§16.35/§16.38/§16.40). Stage 1b caught 5 in the manager's dispatch prompt; Stage 2A caught 6 more in brief-seed authority links. The §16.35 per-write verification mandate exists because the pattern is so reliable. Every numeric tax figure (rate, threshold, allowance, day-trigger) and every statutory section cited in your worked examples MUST be re-verified against current gov.uk + legislation.gov.uk at write time before committing. The brief provides URLs; you verify each figure at write time.

## Per-page workflow (canonical version in each brief; summary)

1. Read house positions doc (once at session start); above tells you which sections.
2. Claim ONE page in the tracker (todo → in_progress + UTC timestamp).
3. Read the brief.
4. Fetch + read each competitor URL with httpx + BeautifulSoup.
5. Read closest-existing pages on our site.
6. Plan H2/H3 outline + meta + FAQs + CTA placements (vary per page, anti-templating).
7. Verify factual claims against authorities. **Per §16.35, WebFetch gov.uk / legislation.gov.uk for every numeric figure and statutory section identity before committing it.**
8. Fetch hero image from Pexels.
9. Write the markdown file at `Property/web/content/blog/<slug>.md`.
10. Build clean: `cd Property/web && npm run build`.
11. **Six verifications must pass:** FAQ schema count match, 0 em-dashes, 0 Tailwind classes, meta title max 62 chars, meta description max 158 chars, internal `/blog/...` links resolve.
12. Apply redirect repointing in `middleware.ts` if brief lists one.
13. Register the new page in `monitored_pages` Supabase table.
14. **Commit on your branch** (per-page commit; do NOT merge to main).
15. Fill in per-page work-log at bottom of brief.
16. **Mark done in tracker** with 1-line Notes (ONLY after step 14).
17. Append site-wide issues to `docs/property/wave6_site_wide_flags.md` (absolute path).
18. Append discoveries to `docs/property/wave6_discovery_log_session_A.md` (absolute path).
19. Claim next page.

## Sequencing constraints (§16.32 cross-bucket + within-bucket priorities for Session A)

1. **A4 ships FIRST on A-branch (within-bucket).** Session C's C2 brief (balancing-charge-on-disposal) cites A4's MVL distribution-in-specie mechanic as a CAA 2001 s.61 event 8 trigger. A4 first means C2 has a live link target at write time.
2. **A7 ships BEFORE A8-A10 (within-bucket).** A7 is the HoldCo pillar; A8 (mid-incorporation phase 2 extraction), A9 (pre-sale strip), and A10 (trust-owned SPV) all cite A7 for HoldCo context.
3. **A10 ships LAST (within-bucket).** A10 has a HARD GATE at workflow step 2: "CONFIRM B4 + B7 ARE SHIPPED ON B-BRANCH BEFORE STARTING (manager-side check)". A10 cites Session B's B4 (settlor-interested IHT+CGT trifecta) and B7 (settlor-interest + GROB double-trap) for trust-side IHT/CGT context. Do NOT start A10 until B4 + B7 are visible on the B-branch tracker. If B4 + B7 are slow, work on A8/A9 instead.
4. **A7 ↔ C4 + C5 bidirectional (cross-bucket).** C4 cites A7 for AIA shared-allowance across associated SPVs; C5 cites A7 for intra-group transfer of full-expensed assets. Manager applies back-patches at wave merge per §16.32 — no in-session coordination needed beyond ensuring A7's "AIA across associated SPVs" + "full expensing intra-group transfer carve-out" subsections are present (per A7 brief H2 spine items 5+6).

## Wave 5 lessons baked into Wave 6 (in addition to drift discipline above)

**§16.14 (continuation handover hygiene), critical:**
> If you commit a page but feel context-pressured, flip the tracker IMMEDIATELY before stopping. Tracker drift at handover boundaries cost throughput in Wave 2 and required back-patching in every continuation session. Do not repeat that. The continuation prompt for this session has back-patch-on-startup as its first action.

**§16.16 (word count discipline):**
> Write to the framing differentiator, not to a target. 2,500-3,500 body words typical. Reference pages may sit at floor; depth pages may sit higher. Justify any 4,000+ in the work-log.

**§16.17 (atomic work-unit recovery):**
> If you hit a rate limit, finish the current atomic unit (one brief, one section, one verification step) before pausing. Do not half-finish three things.

## Q&A channel + session-side watcher

If you need a manager decision (genuinely cannot proceed without it), append to `C:/Users/user/Documents/Accounting/docs/property/wave6_questions_session_A.md` (ABSOLUTE PATH) with `STATUS: open`.

**Spawn a session-side watcher immediately after appending:**

```bash
QFILE="C:/Users/user/Documents/Accounting/docs/property/wave6_questions_session_A.md"
LATEST_Q=$(grep -oE '^## Q-[0-9]+' "$QFILE" | tail -1)
echo "Watching for answer to $LATEST_Q..."
while true; do
  if grep -q "$LATEST_Q" "$QFILE" && grep -A2 "$LATEST_Q" "$QFILE" | grep -q "STATUS: answered"; then
    echo "ANSWER_LANDED $LATEST_Q"
    break
  fi
  sleep 20
done
```

Persistent: false. Timeout: 1 hour. While the watcher runs, continue work on a different page or a different step on the same page; do NOT block on the watcher.

## Universal rules (non-negotiable)

### Voice
- **No em-dashes anywhere.** Commas, parentheses, full stops, or middle dots.
- Practical, specific. Exact figures, named legislation, verbatim section titles where load-bearing.
- Anonymised personas only. No real client names.

### Lead-gen architecture
- `BlogPostRenderer.tsx` auto-injects LeadForm at footer. Never duplicate in body.
- `<aside>` tags styled by global CSS, no classes.
- 1-3 inline asides per page at conversion moments.

### FAQs and schema
- FAQs in frontmatter `faqs:` array. Auto-emits FAQPage JSON-LD. Do NOT add FAQ schema in body.
- 10-14 FAQs per page.

### Anti-templating
- 10 pages in the same bucket cannot read like 10 versions of the same page. Each brief's framing differentiator owns a distinct primary mechanic. Vary H2 outlines aggressively. Vary openings. Vary FAQ phrasing.
- Stop after page 3 and manager-spot-check; confirm no templating drift before proceeding to page 4-10.

### House positions
- For Wave 6 Session A: §21 (LtdCo + FIC, Wave 4 base) plus §15.4 (BPR/APR cap for IHT cross-reference) plus §22.13 (Trust-vs-FIC decision boundary, Wave 6 new) plus §22.12 (Settlor-interested IHT, Wave 6 new — A10 only).
- If a competitor source contradicts a locked house position, the house position wins. Flag in `wave6_site_wide_flags.md`.

### Quality bar
- Body words: framing-differentiator-led (typically 2,500-3,500; depth pages higher).
- FAQs 10-14.
- 4-7 external authority links per page (legislation.gov.uk + HMRC manuals + gov.uk).
- Build clean.
- **§16.35 per-write verification on every numeric figure and statutory section identity.**

## What to handle yourself vs flag

**Handle yourself:**
- Em-dash removals, FAQ count discipline, Tailwind avoidance.
- Statutory citations + HMRC manual citations.
- Inline aside CTA placements.
- Cannibalisation via differentiation + linking to closest-existing.
- Factual statements verified against current gov.uk at write time (§16.35).

**Flag to `wave6_site_wide_flags.md` (absolute path):**
- Competitor source contradicts a locked house position: `HOUSE_POSITION_CONFLICT`.
- Two of your Wave 6 siblings overlap: `CANNIBAL`.
- An existing page should link to yours: `INTERNAL_LINK`.
- Non-default schema would help: `SCHEMA`.
- Redirect action: `REDIRECT`.
- Brand / business-model question: `POSITIONING`.
- Build broken by something outside your page: `BUILD_BLOCKER`.
- Calculator or component idea: `CALCULATOR_IDEA` / `COMPONENT_IDEA`.
- Existing page on-site carries stale figure or omitted section identity (Wave 6 program has caught 9+; expect more): `EXISTING_PAGE_STALE`.

**Log to `wave6_discovery_log_session_A.md` (absolute path):**
- Adjacent topics competitors cover that we do not: `ADJACENT_TOPIC`.
- Existing pages with stale figures: `EXISTING_PAGE_STALE`.
- HMRC manuals / case law we never cite: `AUTHORITY_GAP`.
- Cross-niche bridges: `CROSS_NICHE_LINK`.

## Your Session A pages (10 assigned)

In assignment order. Within-bucket priorities marked in the notes column. Claim ONE at a time.

| # | Slug | Notes |
|---|---|---|
| A1 | `extracting-cash-from-property-spv-extraction-sequence-pillar-2026-27` | Pillar — multi-year sequencer across six extraction routes; ships first to anchor cross-links |
| A2 | `directors-loan-repayment-bed-and-breakfast-trap-s464c-s464d` | DLA trap depth, REFRAMED post-FA-2025 (s.464C/D omitted); slug retained for SEO |
| A3 | `property-spv-share-buyback-out-of-distributable-reserves-mechanics` | POS depth; CTA 2010 s.1033(2) trade-benefit gate failing for investment SPVs is the spine |
| A4 | `mvl-members-voluntary-liquidation-property-company-cgt-vs-income-treatment` | MVL exit; **SHIPS FIRST in A-branch** (C2 cross-bucket dependency) |
| A5 | `property-spv-employer-pension-contributions-wholly-and-exclusively-test-mechanics` | Pension extraction; rebuilt on post-FA-2024 LSA/LSDBA architecture |
| A6 | `time-pressure-extraction-divorce-illness-emigration-sequence-12-month-window` | Three-scenario compressed-timeline applied |
| A7 | `multi-company-group-extraction-spv-holding-co-dividend-conduit-mechanics` | HoldCo; **ships before A8-A10** (within-bucket dep); A7 ↔ C4/C5 cross-bucket |
| A8 | `extraction-while-incorporating-phase-2-acquisition-funded-by-personal-funds` | Mid-incorporation extraction; corrected SDLT s.53 cite for connected-co MV |
| A9 | `pre-sale-extraction-strip-cash-before-spv-share-sale-vs-buyer-discount` | Pre-sale strip; ITA 2007 s.682-713 TiS anti-avoidance |
| A10 | `directors-of-trust-owned-spv-extraction-rules-settlor-interested-trap` | Trust-owned SPV; **SHIPS LAST in A-branch** with hard gate on B4 + B7 confirmation |

## Continuation prompt boilerplate (read before stopping)

If you run out of context mid-page, before stopping:
1. Commit current page if writable.
2. Flip tracker (in_progress → done) if commit landed (absolute path to main).
3. Write 1-line discovery-log entry with stop point + next slug (absolute path).

## When you are done with all 10

Update the summary at the top of `wave6_page_tracker.md` (absolute path) and append a `[SESSION_A_COMPLETE]` paragraph to `wave6_site_wide_flags.md` (absolute path). Then stop.

Begin with the first row in your table (subject to within-bucket priorities above).
