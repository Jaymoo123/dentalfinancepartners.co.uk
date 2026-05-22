# Property Wave 3, Session A, start here (ATED)

**You are Session A.** One of three parallel Claude Opus 4.7 sessions writing NET-NEW Property pages from scratch. Your assignment is **ATED (Annual Tax on Enveloped Dwellings)**. Sessions A (ATED), B (MTD ITSA), and C (Renters' Rights Act 2025 / Tenancies) have their own pre-assigned lists.

This is **Wave 3** of the Property Net-New Program. Waves 1 + 2 (61 net-new pages, 31 SDLT/Ltd Co/VAT/FIC/ATED + 30 IHT/DTAs/Expat) are on `main` already.

## Worktree

You run inside `C:/Users/user/Documents/Accounting-wt-property-wave3-a/` on branch `property-wave3-a`. **Stay inside that worktree.** Build commands run from that worktree's root. Sessions B and C are in their own worktrees on their own branches; you will never collide.

## Read order before touching any code

1. **This file** (you are reading it).
2. **`docs/property/house_positions.md`** , the LOCKED factual positions. For ATED, you read **section 2 (headline ATED positions)** AND **section 18 (Wave 3 ATED extension)** which gives you the 2025/26 + 2026/27 bands (verified gov.uk 2026-05-22), the chargeable-persons cohort, the s.133/s.137-s.150 FA 2013 relief catalogue with statutory citations, the 30 April return mechanic, the five-yearly + acquisition valuation rules including the 1 April 2027 revaluation date, the ATED-CGT abolition framing, the RoE compliance interaction, and the HMRC OTM compliance campaign signal. Section 18.3 is particularly important for relief-mechanic pages (A3/A4); section 18.4 for process pages (A5/A10); section 18.7 for the OTM signal in A8.
3. **`docs/property/NETNEW_PROGRAM.md`** , the manager handover doc. Section 4 (brief anatomy), section 7 (19-step workflow), section 8.4 (session-side watcher), section 16 (lessons learned, especially 16.11-16.17 which capture the Wave 2 retrospective).
4. **Your assigned briefs** at `briefs/property/wave3/*.md` per the table below. Each brief is a research package: framing differentiator, competitor URL (Stage 2 fills more), closest existing pages (Stage 2 fills the precise list), authority links. Stage 2 has populated the briefs with reasoning-based closest-existing analysis and additional competitor URLs after live verification; **read the brief in full before starting each page**.
5. **`docs/property/wave3_page_tracker.md`** , master tracker. Your assigned pages are in the Session A rows.

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
18. Append discoveries to `docs/property/wave3_discovery_log_session_A.md`.
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

If you need a manager decision (genuinely cannot proceed without it), append to `docs/property/wave3_questions_session_A.md` with `STATUS: open`.

**Spawn a session-side watcher immediately after appending the question:**

```bash
QFILE="docs/property/wave3_questions_session_A.md"
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

### Anti-templating (ATED bucket)
- 10 ATED pages cannot read like 10 versions of the same page. Each brief's framing differentiator says what makes that page distinct. Honour it.
- Vary opening 2-3 sentences (no "Many landlords ask about..." across the wave).
- Vary H2 structure per page. The strategic pillar (A1), the rates reference (A2), the relief mechanics (A3/A4), the process pages (A5/A10), and the appeal page (A9) should NOT share an outline.
- Vary FAQ phrasing.

### House positions
, the LOCKED factual positions. For ATED, you read **section 2 (headline ATED positions)** AND **section 18 (Wave 3 ATED extension)** which gives you the 2025/26 + 2026/27 bands (verified gov.uk 2026-05-22), the chargeable-persons cohort, the s.133/s.137-s.150 FA 2013 relief catalogue with statutory citations, the 30 April return mechanic, the five-yearly + acquisition valuation rules including the 1 April 2027 revaluation date, the ATED-CGT abolition framing, the RoE compliance interaction, and the HMRC OTM compliance campaign signal. Section 18.3 is particularly important for relief-mechanic pages (A3/A4); section 18.4 for process pages (A5/A10); section 18.7 for the OTM signal in A8. If a competitor source contradicts a house position, the house position wins, flag in `wave3_site_wide_flags.md`. Verified-2026-05-22 stamps in section 18 / 19 / 20 mark positions we have checked against legislation.gov.uk and gov.uk.

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

**Log to `wave3_discovery_log_session_A.md`:**
- Adjacent topics competitors cover that we don't, `ADJACENT_TOPIC`.
- Existing pages with stale figures, `EXISTING_PAGE_STALE`.
- HMRC manuals / case law we never cite, `AUTHORITY_GAP`.
- Cross-niche bridges, `CROSS_NICHE_LINK`.

**Q&A channel** (only when blocked):
- Genuine blocker not answerable from brief / house positions / your judgement.

## Your Session A pages (10 assigned)

In assignment order. Work top to bottom. Claim ONE at a time.

| # | Slug |
|---|---|
| A1 | ated-overview-companies-holding-uk-residential-property-2026-27 |
| A2 | ated-rates-2026-27-bands-table-worked-examples |
| A3 | ated-relief-clawback-occupation-non-qualifying-individual |
| A4 | ated-relief-related-persons-market-rent-test |
| A5 | ated-return-amendment-corrections-procedure |
| A6 | ated-mixed-use-property-apportionment-treatment |
| A7 | ated-valuation-date-rules-2027-revaluation |
| A8 | ated-overseas-companies-voluntary-compliance-otm-letters |
| A9 | ated-late-filing-penalty-appeal-reasonable-excuse |
| A10 | ated-six-step-compliance-walkthrough-uk-non-natural-persons |

**Critical sequence note:** A1 (overview pillar) is intentionally the strategic anchor for the bucket. Consider writing it first or second so A2-A10 can link back. A1 has a CANNIBAL-WATCH against existing `ated-complete-guide-2026-27` , the framing differentiator (strategic positioning vs deep mechanic) is the cannibalisation defence; hold the scope line carefully.

**ATED bucket discipline:** all 10 pages are ATED. They MUST be distinguishable by topic, not by template. Pillar (A1) vs rates reference (A2) vs relief mechanic (A3/A4) vs process (A5/A10) vs apportionment (A6) vs valuation (A7) vs cohort-compliance (A8) vs appeal (A9). If two pages share an H2 outline, stop and rework.

## Continuation prompt boilerplate (read before stopping)

If you run out of context mid-page, before stopping:
1. Commit current page if writable.
2. Flip tracker (todo to done) if commit landed.
3. Write 1-line discovery-log entry with stop point + next slug.

Then stop. Do NOT keep pushing through if quality is degrading; the section 14 self-awareness rule applies.

## When you're done with all 10

Update the summary at the top of `wave3_page_tracker.md` and append a `[SESSION_A_COMPLETE]` paragraph to `wave3_site_wide_flags.md`. Then stop.

Begin with the first row in your table.