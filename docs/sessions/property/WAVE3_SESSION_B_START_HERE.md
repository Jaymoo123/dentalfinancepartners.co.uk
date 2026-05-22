# Property Wave 3, Session B, start here (MTD ITSA)

**You are Session B.** One of three parallel Claude Opus 4.7 sessions writing NET-NEW Property pages from scratch. Your assignment is **MTD for Income Tax Self Assessment (MTD ITSA)**. Sessions A (ATED), B (MTD ITSA), and C (Renters' Rights Act 2025 / Tenancies) have their own pre-assigned lists.

This is **Wave 3** of the Property Net-New Program. Waves 1 + 2 (61 net-new pages, 31 SDLT/Ltd Co/VAT/FIC/ATED + 30 IHT/DTAs/Expat) are on `main` already.

## Worktree

You run inside `C:/Users/user/Documents/Accounting-wt-property-wave3-b/` on branch `property-wave3-b`. **Stay inside that worktree.** Build commands run from that worktree's root. Sessions A and C are in their own worktrees on their own branches; you will never collide.

## Read order before touching any code

1. **This file** (you are reading it).
2. **`docs/property/house_positions.md`** , the LOCKED factual positions. For MTD ITSA, you read **section 3 (headline MTD ITSA positions)** AND **section 19 (Wave 3 MTD extension)** which gives you the mandate timeline (50k / 30k / 20k, verified gov.uk 2026-05-22), the qualifying-income gross-vs-net mechanic, the excluded categories (Ltd Cos out, partnerships deferred), joint-property owner threshold split, the three-year exit rule, software requirements, quarterly cycle dates, the points-based late-submission regime (4 points = £200), the Spring Statement 2025 doubled late-payment regime (3% / 3% / 10%, verified note in section 19.7), and the abandoned £10k threshold history. Section 19.2 anchors B1; section 19.4 anchors B3; section 19.5 anchors B4 and B9; section 19.3 anchors B5; section 19.7 is the penalty depth across the bucket. Section 19.8 is critical for B10.
3. **`docs/property/NETNEW_PROGRAM.md`** , the manager handover doc. Section 4 (brief anatomy), section 7 (19-step workflow), section 8.4 (session-side watcher), section 16 (lessons learned, especially 16.11-16.17 which capture the Wave 2 retrospective).
4. **Your assigned briefs** at `briefs/property/wave3/*.md` per the table below. Each brief is a research package: framing differentiator, competitor URL (Stage 2 fills more), closest existing pages (Stage 2 fills the precise list), authority links. Stage 2 has populated the briefs with reasoning-based closest-existing analysis and additional competitor URLs after live verification; **read the brief in full before starting each page**.
5. **`docs/property/wave3_page_tracker.md`** , master tracker. Your assigned pages are in the Session B rows.

## Per-page workflow (canonical version in each brief; this is the summary)

Each brief at `briefs/property/wave3/<slug>.md` has the canonical 19-step workflow. The summary:

1. Read house positions doc (once at session start), bucket pointer above tells you which sections.
2. Claim ONE page in tracker (todo to in_progress + UTC timestamp).
3. Read the brief.
4. Fetch + read each competitor URL with httpx + BeautifulSoup.
5. Read closest-existing pages on our site.
6. Plan H2/H3 outline + meta + FAQs + CTA placements (vary per page, anti-templating).
7. Verify factual claims against authorities.
8. Fetch hero image from Pexels.
9. Write the markdown file at `Property/web/content/blog/<slug>.md`.
10. Build clean: `cd Property/web && npm run build`.
11. **Six verifications must pass:** FAQ schema count match, 0 em-dashes, 0 Tailwind classes, meta title max 62 chars, meta description max 158 chars, internal `/blog/...` links resolve.
12. Apply redirect repointing in `middleware.ts` if brief lists one.
13. Register the new page in `monitored_pages` Supabase table.
14. **Commit on your branch** (per-page commit; do NOT merge to main).
15. Fill in per-page work-log at bottom of brief.
16. **Mark done in tracker** with 1-line Notes (only AFTER step 14, see below).
17. Append site-wide issues to `docs/property/wave3_site_wide_flags.md`.
18. Append discoveries to `docs/property/wave3_discovery_log_session_B.md`.
19. Claim next page.

## Wave 2 lessons baked into Wave 3 (read these carefully)

**Section 16.14 (continuation handover hygiene), critical rule:**
> If you commit a page but feel context-pressured, flip the tracker IMMEDIATELY before stopping. Tracker drift at handover boundaries cost 5-10% throughput in Wave 2 and required back-patching as the first action in every continuation session. Don't repeat that.

**Section 16.15 (tracker-edits-on-branch anti-pattern):**
> **Tracker edits go to the main repo file via absolute paths only. NEVER commit tracker edits on your session branch.** Wave 2 had merge conflicts on Branch B because Session B's session committed tracker edits on its branch, conflicting with main's live tracker at merge time. Branch commits should contain ONLY content files (`Property/web/content/blog/*.md`), `middleware.ts` redirect edits where applicable, and brief work-log fills. Use `git add Property/web/content/blog/<slug>.md briefs/property/wave3/<slug>.md` , never include the tracker.

**Section 16.16 (word count discipline):**
> Write to the topic per the framing differentiator, not to a target. 2,500-3,500 is the typical range; pillar pages run to 3,500-4,500 if the topic genuinely demands depth; reference pages may sit at the floor. Justify any 4,000+ non-pillar in the work-log Decisions block. Don't pad to hit a number; don't trim if the topic needs the depth. Framing-differentiator-led discipline.

**Section 16.17 (atomic work-unit recovery):**
> If you hit a rate limit, finish the current atomic unit (one brief, one section, one verification step) before pausing. Don't half-finish three things; the recovery cost is asymmetric.

## Q&A channel + session-side watcher

If you need a manager decision (genuinely cannot proceed without it), append to `docs/property/wave3_questions_session_B.md` with `STATUS: open`.

**Spawn a session-side watcher immediately after appending the question:**

```bash
QFILE="docs/property/wave3_questions_session_B.md"
LATEST_Q=$(grep -oE '^## \[Q-[0-9]+\]' "$QFILE" | tail -1)
echo "Watching for answer to $LATEST_Q..."
while true; do
  if grep -q "$LATEST_Q.*STATUS: answered" "$QFILE"; then
    echo "ANSWER_LANDED $LATEST_Q"
    break
  fi
  sleep 20
done
```

Persistent: false. Timeout: 1 hour. While the watcher runs, continue work on a **different page or a different step on the same page**, do NOT block on the watcher. When the answer lands, the watcher fires, you re-read and act.

## Universal rules (non-negotiable)

### Voice
- **No em-dashes anywhere.** Commas, parentheses, full stops, or middle dots.
- Practical, specific. Exact figures, named legislation.
- Anonymised personas only. No real client names.

### Lead-gen architecture
- `BlogPostRenderer.tsx` auto-injects LeadForm at footer. Never duplicate in body.
- `<aside>` tags styled by global CSS, no classes, just `<aside><p>...</p><p>...</p></aside>`.
- 1-3 inline asides per page at conversion moments.

### CSS in markdown
- Semantic HTML only. No Tailwind classes.

### FAQs and schema
- FAQs in frontmatter `faqs:` array. Auto-emits FAQPage JSON-LD. Don't add FAQ schema in body.
- 10-14 FAQs per page.

### Anti-templating (MTD ITSA bucket)
- 10 MTD ITSA pages cannot read like 10 versions of the same page. Each brief's framing differentiator says what makes that page distinct. Honour it.
- Vary opening 2-3 sentences.
- Vary H2 structure per page. Mechanic pages (B1/B3/B4), persona pages (B2), comparison pages (B5/B7), process page (B6), the bucket pillar (B8), pilot page (B9), and policy history (B10) should NOT share an outline.
- Vary FAQ phrasing. Don't repeat "Does MTD apply to me?" across multiple pages.

### House positions
, the LOCKED factual positions. For MTD ITSA, you read **section 3 (headline MTD ITSA positions)** AND **section 19 (Wave 3 MTD extension)** which gives you the mandate timeline (50k / 30k / 20k, verified gov.uk 2026-05-22), the qualifying-income gross-vs-net mechanic, the excluded categories (Ltd Cos out, partnerships deferred), joint-property owner threshold split, the three-year exit rule, software requirements, quarterly cycle dates, the points-based late-submission regime (4 points = £200), the Spring Statement 2025 doubled late-payment regime (3% / 3% / 10%, verified note in section 19.7), and the abandoned £10k threshold history. Section 19.2 anchors B1; section 19.4 anchors B3; section 19.5 anchors B4 and B9; section 19.3 anchors B5; section 19.7 is the penalty depth across the bucket. Section 19.8 is critical for B10. If a competitor source contradicts a house position, the house position wins, flag in `wave3_site_wide_flags.md`. Verified-2026-05-22 stamps in section 18 / 19 / 20 mark positions we have checked against legislation.gov.uk and gov.uk.

### Quality bar
- Body words: roughly competitor median, framing-differentiator-led (typically 2,500-3,500). See section 16.16 lesson.
- FAQs 10-14.
- 4-7 external authority links per page.
- Build clean.

## What to handle yourself vs flag

**Handle yourself:**
- Em-dash removals, FAQ count discipline, Tailwind avoidance.
- HMRC manual / legislation.gov.uk / gov.uk citations.
- Inline aside CTA placements.
- Cannibalisation via differentiation + linking to closest-existing.
- Factual statements matching house positions.

**Flag to `wave3_site_wide_flags.md`:**
- Competitor source contradicts house position, `HOUSE_POSITION_CONFLICT`.
- Two of your Wave 3 siblings overlap, `CANNIBAL`.
- An existing page should link to yours, `INTERNAL_LINK`.
- Non-default schema would help, `SCHEMA`.
- Redirect action, `REDIRECT`.
- Brand / business-model question, `POSITIONING`.
- Build broken by something outside your page, `BUILD_BLOCKER`.
- Calculator or component idea, `CALCULATOR_IDEA` / `COMPONENT_IDEA`.

**Log to `wave3_discovery_log_session_B.md`:**
- Adjacent topics competitors cover that we don't, `ADJACENT_TOPIC`.
- Existing pages with stale figures, `EXISTING_PAGE_STALE`.
- HMRC manuals / case law we never cite, `AUTHORITY_GAP`.
- Cross-niche bridges, `CROSS_NICHE_LINK`.

**Q&A channel** (only when blocked):
- Genuine blocker not answerable from brief / house positions / your judgement.

## Your Session B pages (10 assigned)

In assignment order. Work top to bottom. Claim ONE at a time.

| # | Slug |
|---|---|
| B1 | mtd-itsa-qualifying-income-test-gross-vs-net |
| B2 | mtd-itsa-accidental-landlords-do-i-need-to-file-digitally |
| B3 | mtd-itsa-jointly-owned-property-threshold-split |
| B4 | mtd-itsa-exit-rule-income-drops-three-year-test |
| B5 | mtd-itsa-vs-limited-company-cohort-different-rules |
| B6 | mtd-itsa-letter-from-hmrc-what-to-do-next |
| B7 | mtd-itsa-comparison-current-self-assessment-vs-mtd-cycle |
| B8 | mtd-itsa-overview-six-changes-residential-landlords |
| B9 | mtd-itsa-pilot-trial-volunteer-2025-26-experience |
| B10 | mtd-itsa-major-tax-reform-context-policy-history |

**Critical sequence note:** B8 (six-changes overview) and B10 (policy history) both have CANNIBAL-WATCH flags against existing pages (`mtd-quarterly-reporting-landlords-step-by-step-guide` and `how-to-register-mtd-landlord-step-by-step-guide` respectively). The framing differentiators are the cannibalisation defences, scope discipline is critical. Consider writing B1 / B2 first to warm up, then tackle the CANNIBAL-WATCH pages (B8, B10) with full attention.

**MTD ITSA bucket discipline:** all 10 pages are MTD ITSA. They MUST be distinguishable by topic, not by template. Mechanic (B1/B3/B4) vs persona (B2) vs comparison (B5/B7) vs process-letter (B6) vs pillar (B8) vs pilot (B9) vs policy (B10). If two pages share an H2 outline, stop and rework.

## Continuation prompt boilerplate (read before stopping)

If you run out of context mid-page, before stopping:
1. Commit current page if writable.
2. Flip tracker (todo to done) if commit landed.
3. Write 1-line discovery-log entry with stop point + next slug.

Then stop. Do NOT keep pushing through if quality is degrading; the section 14 self-awareness rule applies.

## When you're done with all 10

Update the summary at the top of `wave3_page_tracker.md` and append a `[SESSION_B_COMPLETE]` paragraph to `wave3_site_wide_flags.md`. Then stop.

Begin with the first row in your table.