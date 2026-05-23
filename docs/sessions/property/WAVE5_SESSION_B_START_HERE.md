# Property Wave 5, Session B, start here (Devolved property tax: Welsh LTT + Scottish LBTT + ADS)

**You are Session B.** One of three parallel Claude Opus 4.7 sessions writing NET-NEW Property pages from scratch. Your assignment is **Devolved property tax**, 10 pages covering Welsh Land Transaction Tax (LTT) and Scottish Land and Buildings Transaction Tax (LBTT) including the Additional Dwelling Supplement (ADS). 5 Welsh + 5 Scottish. Zero existing on-site coverage; you are the entire devolved-tax cluster.

This is **Wave 5** of the Property Net-New Program. Waves 1 + 2 + 3 + 4 (121 net-new pages) are on `main` already (W1-3 deployed, W4 held).

## Worktree

You run inside `C:/Users/user/Documents/Accounting-wt-property-wave5-b/` on branch `property-wave5-b`. **Stay inside that worktree.** Build commands run from that worktree's root. Sessions A and C are in their own worktrees on their own branches; you will never collide.

## Read order before touching any code

1. **This file** (you are reading it).
2. **`docs/property/NETNEW_PROGRAM.md`** — the durable program doc. §0 critical norms, §4 brief anatomy, §7 the 19-step workflow, §8.4 session-side watcher, §11 reasoning-first selection, §13 manager instructions, §16 lessons especially **§16.14 tracker hygiene**, **§16.15 tracker-edits-on-branch anti-pattern**, **§16.16 word count discipline**, **§16.17 atomic work-unit recovery**, **§16.27 / §16.30 / §16.35 verification mandate**, **§16.32 cross-bucket sequencing**, **§16.34 cannibal-corrected pool**.
3. **`docs/property/house_positions.md`** — the LOCKED factual positions. For Wave 5 Session B read:
   - **§1 (SDLT for England + Northern Ireland)** for cross-jurisdictional comparison. Remember: Northern Ireland is NOT devolved for SDLT (NI uses FA 2003 same as England).
   - **§23 (Welsh LTT + Scottish LBTT + ADS, Wave 5 extension, locked 2026-05-23)** is your primary locked position. Read in full. Subsections cover Welsh main rates, Welsh higher rates (post-uplift 5%/8.5%/10%/12.5%/15%/17% from 11 Dec 2024), Welsh MDR (NOT abolished, subsidiary-dwelling carve-out from 7 Feb 2025 + 3% min-rate floor from 13 Feb 2026), Welsh non-residential, Scottish main rates, Scottish ADS (8% from 5 Dec 2024, 36-month replacement window per Coronavirus (Scotland) (No.2) Act 2020), Scottish MDR retained, NI SDLT confirmation, cross-jurisdictional traps + cross-border transaction apportionment.
   - **§22 (IHT estate planning)** for cross-jurisdictional gift-tax interactions where B briefs touch corporate-buyer or family-gift contexts.
4. **Your assigned briefs** at `briefs/property/wave5/*.md` per the table below. Each brief is your research package: framing differentiator, verified-live competitor URLs (Stage 2 verified), closest-existing pages, authority links (Welsh Revenue Authority + Revenue Scotland + legislation.gov.uk), redirect overlap, and the embedded 19-step workflow.
5. **`docs/property/wave5_page_tracker.md`** — master tracker. Your assigned pages are in the Session B rows.

## Per-page workflow (canonical version in each brief; summary)

1. Read house positions doc (once at session start); above tells you which sections.
2. Claim ONE page in the tracker (todo → in_progress + UTC timestamp).
3. Read the brief.
4. Fetch + read each competitor URL with httpx + BeautifulSoup.
5. Read closest-existing pages on our site.
6. Plan H2/H3 outline + meta + FAQs + CTA placements (vary per page, anti-templating).
7. Verify factual claims against authorities. **Per §16.35, WebFetch gov.wales / revenue.scot / legislation.gov.uk for every numeric figure before committing it. Devolved tables change annually with each Welsh / Scottish Budget cycle.**
8. Fetch hero image from Pexels.
9. Write the markdown file at `Property/web/content/blog/<slug>.md`.
10. Build clean: `cd Property/web && npm run build`.
11. **Six verifications must pass:** FAQ schema count match, 0 em-dashes, 0 Tailwind classes, meta title max 62 chars, meta description max 158 chars, internal `/blog/...` links resolve.
12. Apply redirect repointing in `middleware.ts` if brief lists one.
13. Register the new page in `monitored_pages` Supabase table.
14. **Commit on your branch** (per-page commit; do NOT merge to main).
15. Fill in per-page work-log at bottom of brief.
16. **Mark done in tracker** with 1-line Notes (ONLY after step 14).
17. Append site-wide issues to `docs/property/wave5_site_wide_flags.md`.
18. Append discoveries to `docs/property/wave5_discovery_log_session_B.md`.
19. Claim next page.

## Wave 4 lessons baked into Wave 5

**§16.14 (continuation handover hygiene), critical:**
> If you commit a page but feel context-pressured, flip the tracker IMMEDIATELY before stopping.

**§16.15 (tracker-edits-on-branch anti-pattern):**
> Tracker edits go to the main repo file via absolute paths only. NEVER commit tracker edits on your session branch.

**§16.16 (word count discipline):**
> Write to the framing differentiator. 2,500-3,500 body words typical.

**§16.17 (atomic work-unit recovery):**
> Finish the current atomic unit before pausing.

**§16.27 / §16.30 / §16.35 (per-write verification mandate, CRITICAL for devolved-tax bucket):**
> Devolved property tax figures change annually with each Welsh / Scottish Budget cycle. The §23 drafter flagged three explicit verify-at-write hedges:
> - Welsh LTT MDR 3% minimum-rate floor from 13 Feb 2026 — SI commencement cite not on legislation.gov.uk at 2026-05-23 lock time; re-verify before writing B3.
> - Scottish LBTT MDR minimum-rate floor — set by SSI, periodically revised; verify current value when writing B6 or B10.
> - Scottish ADS rate-step SSIs (3% → 4% → 6% → 8%) — precise SSI cites only partially captured; verify if rate-history is included in B7.
> Every numeric figure (rates, bands, surcharge percentages, thresholds, replacement-window months, MDR floors) MUST be verified against current gov.wales / revenue.scot / legislation.gov.uk at write time before being baked into a worked example. The brief provides authority URLs; you verify each figure.

## Q&A channel + session-side watcher

If you need a manager decision (genuinely cannot proceed without it), append to `docs/property/wave5_questions_session_B.md` with `STATUS: open`.

**Spawn a session-side watcher immediately after appending:**

```bash
QFILE="docs/property/wave5_questions_session_B.md"
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

Persistent: false. Timeout: 1 hour. While the watcher runs, continue work on a different page; do NOT block.

## Universal rules (non-negotiable)

### Voice
- **No em-dashes anywhere.** Commas, parentheses, full stops, or middle dots.
- Practical, specific. Exact figures, named legislation.
- Anonymised personas only.

### Lead-gen architecture
- `BlogPostRenderer.tsx` auto-injects LeadForm at footer. Never duplicate in body.
- `<aside>` tags styled by global CSS, no classes.
- 1-3 inline asides per page at conversion moments.

### FAQs and schema
- FAQs in frontmatter `faqs:` array. Auto-emits FAQPage JSON-LD.
- 10-14 FAQs per page.

### Anti-templating (Devolved bucket, CRITICAL)

**The within-bucket parallel pairs are the single biggest templating risk in this wave.** Three parallel-pair risks identified by Stage 1:
- **B1 (Welsh main rates) ↔ B6 (Scottish main rates)** — both are "rates and bands by jurisdiction" pillars
- **B2 (Welsh higher rates) ↔ B7 (Scottish ADS)** — both are "additional dwellings surcharge by jurisdiction"
- **B4 (Welsh FTB-absence) ↔ B8 (Scottish FTB relief)** — both are "first-time-buyer treatment by jurisdiction"

**Each brief MUST own a POSITIVE-framing of the specific Welsh / Scottish mechanic with its own statutory anchor + own worked example with Welsh- or Scottish-specific figures. NOT "the Welsh equivalent of England's SDLT X" framing. Each page is its own thing, not a mirror page.**

**Manager spot-check after your first 3 pages.** Stop after B3 (or B6 if you write Welsh first) and manager will verify no templating drift. If drift detected, manager intervenes before you proceed.

Other anti-templating notes:
- **B3 (Welsh MDR survival)** contrasts against `sdlt-multiple-dwellings-relief-abolition-impact-bulk-buyers-2024-2025` (England MDR abolition); lead with the survival framing, not the contrast.
- **B5 (Welsh derelict refund)** is the Bewley-equivalent Welsh refund route; cross-link `sdlt-9-residential-mixed-use-classification` (England parallel via Bewley).
- **B9 (Scottish corporate-buyer pathway)** is the absence-of-equivalent-to-FA-2003-Sch-4A-15%-rate framing; cross-link `ated-15-percent-flat-rate-sdlt-interaction` (England-specific).

### House positions

For Wave 5 Session B: §1 (SDLT for England + NI cross-jurisdictional comparison) + §23 (Welsh LTT + Scottish LBTT + ADS Wave 5 extension, primary locked position). §23 is the authority for rates, bands, reliefs, surcharges, replacement-windows. Verify at write time per §16.35.

If a competitor source contradicts a §23 position, the house position wins. Flag in `wave5_site_wide_flags.md`.

### Quality bar
- Body words: framing-differentiator-led (typically 2,500-3,500).
- FAQs 10-14.
- 4-7 external authority links per page (Welsh Revenue Authority + Revenue Scotland + legislation.gov.uk primary).
- Build clean.
- **§16.35 per-write verification on every numeric figure.**

## What to handle yourself vs flag

**Handle yourself:**
- Em-dash removals, FAQ count discipline, Tailwind avoidance.
- LTTA 2017 / LBTT(S)A 2013 / Welsh + Scottish regulation citations.
- gov.wales / revenue.scot per-write verification per §16.35.
- Inline aside CTA placements.
- Cannibalisation via differentiation + cross-link to England SDLT pages.

**Flag to `wave5_site_wide_flags.md`:**
- Competitor source contradicts §23 or §1: `HOUSE_POSITION_CONFLICT`.
- Two of your Wave 5 siblings overlap: `CANNIBAL`.
- An existing page should link to yours: `INTERNAL_LINK`.
- Non-default schema would help: `SCHEMA`.
- Redirect action: `REDIRECT`.
- Brand / business-model question: `POSITIONING`.
- Build broken outside your page: `BUILD_BLOCKER`.

**Log to `wave5_discovery_log_session_B.md`:**
- Adjacent topics competitors cover that we do not: `ADJACENT_TOPIC`.
- Existing pages with stale figures: `EXISTING_PAGE_STALE`.
- HMRC manuals / SSIs / Welsh tribunal decisions we never cite: `AUTHORITY_GAP`.
- Cross-niche bridges: `CROSS_NICHE_LINK`.

## Cross-bucket coordination flags (§16.32 sequencing)

**CRITICAL — B2 + B7 must ship BEFORE Session C's C9:**

- **B2** (`welsh-ltt-higher-rates-residential-second-homes-additional-properties-surcharge-mechanics`) and **B7** (`scottish-lbtt-additional-dwelling-supplement-ads-mechanics-second-home-buyers`) are devolved-jurisdiction counterparts to Session C's C9 (`second-home-sdlt-additional-dwellings-surcharge-joint-owners-spouse-aggregation-rules`). All three cover the spousal-aggregation question across England (C9 = FA 2003 Sch 4ZA), Wales (B2 = LTTA 2017 Sch 5), and Scotland (B7 = LBTT(S)A 2013 Sch 2A).
- **Bake into B2 + B7:** include a "Cross-jurisdictional parallel" section noting that Session C's C9 covers the English SDLT spousal-aggregation question; flag for cross-link at merge.
- **Session C's C9 launch prompt explicitly references this**: C9 must verify B2 + B7 are committed before launching, or include forward-link placeholders that manager hyperlinks at merge.
- If you ship B2 and B7 early in your sequence (e.g. B2 second after B1, B7 immediately after B6), you minimise the coordination risk.

Within-bucket: B1↔B6, B2↔B7, B4↔B8 parallel pairs require POSITIVE differentiator framing per the anti-templating section above.

## Your Session B pages (10 assigned)

In assignment order. Work top to bottom. Claim ONE at a time.

| # | Slug |
|---|---|
| B1 | welsh-land-transaction-tax-ltt-rates-bands-2026-27-residential-buyers |
| B2 | welsh-ltt-higher-rates-residential-second-homes-additional-properties-surcharge-mechanics |
| B3 | welsh-ltt-multiple-dwellings-relief-bulk-purchases-mechanics-survives-vs-sdlt-abolition |
| B4 | welsh-ltt-first-time-buyer-relief-mechanics-eligibility-comparison-england-scotland |
| B5 | welsh-ltt-derelict-uninhabitable-property-refund-relief-claim-mechanics |
| B6 | scottish-lbtt-rates-bands-2026-27-residential-buyers-complete-guide |
| B7 | scottish-lbtt-additional-dwelling-supplement-ads-mechanics-second-home-buyers |
| B8 | scottish-lbtt-first-time-buyer-relief-eligibility-mechanics |
| B9 | scottish-lbtt-corporate-buyer-15-percent-flat-rate-or-ads-pathway-decision |
| B10 | scottish-lbtt-bare-trust-acquisition-relief-corporate-restructuring-mechanics |

**Sequence note:** B1 (Welsh main rates) is the Welsh-cluster pillar; consider writing first so B2-B5 can cite. B6 (Scottish main rates) is the Scottish-cluster pillar; consider writing first within the Scottish sub-bucket. The §16.32 sequencing for C9 means B2 + B7 should ship early; B2 second + B7 sixth (immediately after B6) is the recommended order.

## Continuation prompt boilerplate (read before stopping)

If you run out of context mid-page, before stopping:
1. Commit current page if writable.
2. Flip tracker (in_progress → done) if commit landed.
3. Write 1-line discovery-log entry with stop point + next slug.

## When you are done with all 10

Update the summary at the top of `wave5_page_tracker.md` and append a `[SESSION_B_COMPLETE]` paragraph to `wave5_site_wide_flags.md`. Then stop.

Begin with the first row in your table.
