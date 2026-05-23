# Property Wave 4, Session A, start here (LtdCo mechanics + FIC depth)

**You are Session A.** One of three parallel Claude Opus 4.7 sessions writing NET-NEW Property pages from scratch. Your assignment is **LtdCo mechanics + FIC depth**, 10 pages covering post-incorporation operational mechanics (directors' loans, share-class structures, year-end choices, charging-rent-to-own-co, salary-vs-dividends) plus a 5-page FIC sub-thread (articles, governance, retirement income, gifting growth shares, blended-family protected legacy).

This is **Wave 4** of the Property Net-New Program. Waves 1 + 2 + 3 (91 net-new pages) are on `main` already.

## Worktree

You run inside `C:/Users/user/Documents/Accounting-wt-property-wave4-a/` on branch `property-wave4-a`. **Stay inside that worktree.** Build commands run from that worktree's root. Sessions B and C are in their own worktrees on their own branches; you will never collide.

## Read order before touching any code

1. **This file** (you are reading it).
2. **`docs/property/NETNEW_PROGRAM.md`** — the durable program doc. Section 4 (brief anatomy), section 7 (19-step workflow), section 8.4 (session-side watcher), section 16 (lessons learned, especially 16.11-16.22 and 16.27).
3. **`docs/property/house_positions.md`** — the LOCKED factual positions. For Wave 4 Session A read **section 11 (Companies House / ECCTA / RoE)** and any §21 LtdCo + FIC extension landed by the manager pre-launch (see Wave 4 house-positions extensions doc `docs/property/wave4_house_positions_extensions.md`). Section 15 (IHT Wave 2 extension) and section 19 (MTD Wave 3 extension) provide cross-bucket context for cross-link discipline; do not invent IHT or MTD positions that contradict §15 / §19.
4. **Your assigned briefs** at `briefs/property/wave4/*.md` per the table below. Each brief is a research package: framing differentiator, source competitor URL (Stage 2 populates 3-5 verified), closest existing pages (Stage 1 Jaccard list; Stage 2 + you reason additionally), authority links (Stage 2 populates). Read the brief in full before starting each page.
5. **`docs/property/wave4_page_tracker.md`** — master tracker. Your assigned pages are in the Session A rows.

## Per-page workflow (canonical version in each brief; summary)

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
17. Append site-wide issues to `docs/property/wave4_site_wide_flags.md`.
18. Append discoveries to `docs/property/wave4_discovery_log_session_A.md`.
19. Claim next page.

## Wave 2/3 lessons baked into Wave 4

**§16.14 (continuation handover hygiene), critical:**
> If you commit a page but feel context-pressured, flip the tracker IMMEDIATELY before stopping. Tracker drift at handover boundaries cost throughput in Wave 2 and required back-patching in every continuation session. Don't repeat that.

**§16.15 (tracker-edits-on-branch anti-pattern):**
> **Tracker edits go to the main repo file via absolute paths only. NEVER commit tracker edits on your session branch.** Branch commits contain ONLY content files (`Property/web/content/blog/*.md`), `middleware.ts` redirect edits where applicable, and brief work-log fills. Use `git add Property/web/content/blog/<slug>.md briefs/property/wave4/<slug>.md`, never include the tracker.

**§16.16 (word count discipline):**
> Write to the topic per the framing differentiator, not to a target. 2,500-3,500 is the typical range; reference pages may sit at the floor; the FIC sub-thread (A6-A10) is likely mid-band, the operational-mechanics pages (A1-A5) similar. Justify any 4,000+ in the work-log.

**§16.17 (atomic work-unit recovery):**
> If you hit a rate limit, finish the current atomic unit (one brief, one section, one verification step) before pausing. Don't half-finish three things.

**§16.14 continuation-prompt back-patch on startup:**
> If you are resuming this session after an interruption, the FIRST action is to scan `wave4_page_tracker.md` for tracker-vs-branch drift (any in_progress or done rows without a commit in the branch, or commits not reflected in the tracker). Fix the drift before claiming a new page.

## Q&A channel + session-side watcher

If you need a manager decision (genuinely cannot proceed without it), append to `docs/property/wave4_questions_session_A.md` with `STATUS: open`.

**Spawn a session-side watcher immediately after appending the question:**

```bash
QFILE="docs/property/wave4_questions_session_A.md"
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

Persistent: false. Timeout: 1 hour. While the watcher runs, continue work on a **different page or a different step on the same page**, do NOT block on the watcher.

## Universal rules (non-negotiable)

### Voice
- **No em-dashes anywhere.** Commas, parentheses, full stops, or middle dots.
- Practical, specific. Exact figures, named legislation.
- Anonymised personas only. No real client names.

### Lead-gen architecture
- `BlogPostRenderer.tsx` auto-injects LeadForm at footer. Never duplicate in body.
- `<aside>` tags styled by global CSS, no classes.
- 1-3 inline asides per page at conversion moments.

### FAQs and schema
- FAQs in frontmatter `faqs:` array. Auto-emits FAQPage JSON-LD. Don't add FAQ schema in body.
- 10-14 FAQs per page.

### Anti-templating (LtdCo + FIC bucket)
- 10 pages cannot read like 10 versions of the same page. Each brief's framing differentiator says what makes that page distinct. Honour it.
- The five FIC pages (A6-A10) are the highest templating risk: articles drafting vs governance discipline vs retirement income vs gifting shares vs blended-family legacy. Vary H2 outlines aggressively.
- A1 (DLA strategy) vs A5 (salary-vs-dividend) both touch extraction; A1 is the loan-account mechanic + sequence, A5 is the marginal-rate analysis. Vary outlines.
- A4 (charging rent to own co) is the only personal-to-corporate-rental page; lead with the connected-party transfer-pricing risk to differentiate from generic extraction pages.

### House positions
- For Wave 4 Session A: §11 + the manager-landed §21 (LtdCo + FIC Wave 4 extension). Note that §15 (IHT) is your tie-breaker for ANY IHT cross-link from FIC pages (A9 + A10 reference IHT mechanics; the IHT factual ground is owned by §15). §19 (MTD) is the tie-breaker for MTD cross-links from A3 (year-end + MTD interaction).
- If a competitor source contradicts a house position, the house position wins. Flag in `wave4_site_wide_flags.md`.

### Quality bar
- Body words: framing-differentiator-led (typically 2,500-3,500).
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

**Flag to `wave4_site_wide_flags.md`:**
- Competitor source contradicts house position, `HOUSE_POSITION_CONFLICT`.
- Two of your Wave 4 siblings overlap, `CANNIBAL`.
- An existing page should link to yours, `INTERNAL_LINK`.
- Non-default schema would help, `SCHEMA`.
- Redirect action, `REDIRECT`.
- Brand / business-model question, `POSITIONING`.
- Build broken by something outside your page, `BUILD_BLOCKER`.
- Calculator or component idea, `CALCULATOR_IDEA` / `COMPONENT_IDEA`.

**Log to `wave4_discovery_log_session_A.md`:**
- Adjacent topics competitors cover that we don't, `ADJACENT_TOPIC`.
- Existing pages with stale figures, `EXISTING_PAGE_STALE`.
- HMRC manuals / case law we never cite, `AUTHORITY_GAP`.
- Cross-niche bridges, `CROSS_NICHE_LINK`.

## Cross-bucket coordination flags (set at Stage 1, watch during write)

- **A8 vs C7:** A8 is FIC for retirement income (drawdown mechanics, marginal-rate-positioning of income strands during life). C7 is FIC as IHT estate-planning value-freeze tool (Bucket C). Both touch FIC + later-life landlord. Distinguish: A8 is "income for me", C7 is "control of value for next generation". Each should link to the other.
- **A9 vs C4:** A9 is FIC growth-share gifting (PET + share valuation + s.165 holdover denial). C4 is direct property gift 7-year clock (CGT s.17 deemed disposal at MV, no holdover for non-business BTL). Both touch the 7-year PET. Distinguish: A9 is the share-vehicle gift, C4 is the direct-property gift. Each should link to the other.
- **A2 (alphabet shares) vs A9 (FIC growth-share gifting):** A2 is the s.624 settlement boundary for dividend-splitting. A9 is the PET-gifting mechanic. Both touch share-class design. Distinguish: A2 is income-tax tactic (now), A9 is IHT planning (next-generation). Cross-link.

## Your Session A pages (10 assigned)

In assignment order. Work top to bottom. Claim ONE at a time.

| # | Slug |
|---|---|
| A1 | btl-spv-directors-loan-repayment-strategy-tax-efficient-extraction |
| A2 | alphabet-shares-property-spv-dividend-splitting-spouse-children |
| A3 | btl-limited-company-year-end-date-changing-tax-planning |
| A4 | charging-market-rent-to-own-property-company-tax-treatment |
| A5 | salary-vs-dividends-property-spv-2026-27-marginal-rate-analysis |
| A6 | fic-articles-of-association-property-control-mechanics |
| A7 | fic-property-corporate-governance-board-meetings-resolutions-discipline |
| A8 | fic-property-retirement-decumulation-mechanics-uk |
| A9 | fic-gifting-shares-children-property-7-year-iht-mechanics |
| A10 | fic-blended-family-protected-legacy-property-second-marriage |

**Sequence note:** A6 (articles) is the structural anchor for the FIC sub-thread; consider writing it first within A6-A10 so A7-A10 can link back. The five FIC pages should interlink densely.

## Continuation prompt boilerplate (read before stopping)

If you run out of context mid-page, before stopping:
1. Commit current page if writable.
2. Flip tracker (todo to done) if commit landed.
3. Write 1-line discovery-log entry with stop point + next slug.

## When you're done with all 10

Update the summary at the top of `wave4_page_tracker.md` and append a `[SESSION_A_COMPLETE]` paragraph to `wave4_site_wide_flags.md`. Then stop.

Begin with the first row in your table.
