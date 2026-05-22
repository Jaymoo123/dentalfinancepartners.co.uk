# Property Wave 2 — Session A — start here (IHT)

**You are Session A.** One of three parallel Claude Opus 4.7 sessions writing NET-NEW Property pages from scratch. Your assignment is **IHT** (Inheritance Tax and estate planning). Sessions B (DTAs) and C (Expat / Leaving the UK) have their own pre-assigned lists.

This is **Wave 2** of the Property Net-New Program. Wave 1 (31 SDLT / Ltd Co / VAT / FIC / ATED pages) is on `main` already.

## Worktree

You run inside `C:/Users/user/Documents/Accounting-wt-property-wave2-a/` on branch `property-wave2-a`. **Stay inside that worktree.** Build commands run from that worktree's root. Sessions B and C are in their own worktrees on their own branches; you will never collide.

## Read order before touching any code

1. **This file** (you are reading it).
2. **`docs/property/house_positions.md`** — the LOCKED factual positions. For IHT, you read **§9 (headline IHT positions)** AND **§15 (Wave 2 IHT extension)** which gives you the depth on NRB/RNRB freezes, PETs vs CLTs vs taper relief, GROB (s.102 FA 1986), the April 2026 BPR/APR cap reform, the April 2027 pension IHT inclusion, and the post-April-2025 residence-based IHT regime for non-UK residents. §15.3 is particularly important — it locks the GROB statutory citation (s.102 FA 1986) and the rent-payment escape. §15.4 locks the April 2026 BPR/APR cap mechanics (£1m combined; 50% relief above; AIM rate change) verified against gov.uk on 2026-05-22.
3. **`docs/property/NETNEW_PROGRAM.md`** — the manager handover doc. §4 (brief anatomy), §7 (19-step workflow), §8.4 (session-side watcher — new for Wave 2).
4. **`docs/network_state_and_handover_2026-05-21.md`** — context for what the program is. Skim only.
5. **Your assigned briefs** at `briefs/property/wave2/iht-*.md` and `briefs/property/wave2/serviced-accommodation-bpr-eligibility-pawson-test.md`, etc. Each brief is a research package: framing differentiator, competitor URLs, closest existing pages, authority links.
6. **`docs/property/wave2_page_tracker.md`** — master tracker. Your assigned pages are in the "Session A pages" table.

## Per-page workflow (canonical version in each brief; this is the summary)

Each brief at `briefs/property/wave2/<slug>.md` has the canonical 19-step workflow. The summary:

1. Read house positions doc (once at session start) — §§9-10 headline + §§15-17 Wave 2 detail.
2. Claim ONE page in tracker (`⬜ todo` → `🟡 in_progress` + UTC timestamp).
3. Read the brief.
4. Fetch + read each competitor URL with `httpx` + `BeautifulSoup`.
5. Read closest-existing pages on our site.
6. Plan H2/H3 outline + meta + FAQs + CTA placements (vary per page — anti-templating).
7. Verify factual claims against authorities.
8. Fetch hero image from Pexels.
9. Write the markdown file at `Property/web/content/blog/<slug>.md`.
10. Build clean: `cd Property/web && npm run build`.
11. **Six verifications must pass:** FAQ schema count match, 0 em-dashes, 0 Tailwind classes, meta title ≤62 chars, meta description ≤158 chars, internal `/blog/...` links resolve.
12. Apply redirect repointing in `middleware.ts` if brief lists one.
13. Register the new page in `monitored_pages` Supabase table.
14. **Commit on your branch** (per-page commit; do NOT merge to main).
15. Fill in per-page work-log at bottom of brief.
16. **Mark `✅ done` in tracker** with 1-line Notes (only AFTER step 14 — see below).
17. Append site-wide issues to `docs/property/wave2_site_wide_flags.md`.
18. Append discoveries to `docs/property/wave2_discovery_log_session_A.md`.
19. Claim next page.

**Critical Wave 2 calibration: step 14 (commit) BEFORE step 16 (mark done).** Wave 1 had multiple tracker-ahead-of-branch drift incidents (sessions marked rows ✅ done before committing, causing lost-work risk). For Wave 2 the discipline is baked in: if your build passes but you haven't committed, the row stays `🟡 in_progress`. Commit first, mark done second.

## Q&A channel + session-side watcher (new for Wave 2)

If you need a manager decision (genuinely cannot proceed without it), append to `docs/property/wave2_questions_session_A.md` with `STATUS: open`.

**Wave 2 addition:** immediately after appending the question, spawn a **single Monitor task** watching your question file for the `STATUS: answered` flip on your latest question. While the watcher runs, continue work on a **different page or a different step on the same page** — do NOT block on the watcher. When the answer lands, the watcher fires, you re-read and act.

Sample:

```bash
QFILE="docs/property/wave2_questions_session_A.md"
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

Persistent: false. Timeout: 1 hour. The whole point: you never sit idle waiting for the manager.

## Universal rules (non-negotiable)

### Voice
- **No em-dashes anywhere.** Commas, parentheses, full stops, or middle dots.
- Practical, specific. Exact figures, named legislation (s.102 FA 1986, IHTA 1984 ss.18-23, Pawson [2013] UKUT 050, etc).
- Anonymised personas only. No real client names.

### Lead-gen architecture
- `BlogPostRenderer.tsx` auto-injects LeadForm at footer. Never duplicate in body.
- `<aside>` tags styled by global CSS — no classes, just `<aside><p>...</p><p>...</p></aside>`.
- 1-3 inline asides per page at conversion moments.

### CSS in markdown
- Semantic HTML only. No Tailwind classes (Tailwind v4 scans src/** only).

### FAQs and schema
- FAQs in frontmatter `faqs:` array. Auto-emits FAQPage JSON-LD. Don't add FAQ schema in body.
- 10-14 FAQs per page.

### Anti-templating (especially important for an all-IHT session)
- 10 IHT pages cannot read like 10 versions of the same page. Each brief's framing differentiator says what makes that page distinct. Honour it.
- Vary opening 2-3 sentences (no "Many landlords ask about..." across the wave).
- Vary H2 structure per page. The IHT pillar (A1 decision framework), the mechanism deep-dives (A2 GROB, A3 lifetime gifts), and the event-driven pages (A4 April 2026 cap, A9 April 2027 pensions) should NOT share an outline.
- Vary FAQ phrasing.

### House positions
- Read `house_positions.md` once at start. §§9 + 15 are your sections. If a competitor source contradicts a house position, the house position wins — flag in `wave2_site_wide_flags.md`. Verified-2026-05-22 stamps in §15 mark positions we've checked against legislation.gov.uk and gov.uk.

### Quality bar
- Body words: ~2,500-3,500 non-pillar; 3,500-4,500 if genuinely pillar (A1 is a pillar; A4 is event-driven, shorter is fine).
- FAQs 10-14.
- 4-7 external authority links per page (from the brief's authority list + others you find).
- Build clean.

## What to handle yourself vs flag

**Handle yourself:**
- Em-dash removals, FAQ count discipline, Tailwind avoidance.
- HMRC manual / legislation.gov.uk / gov.uk citations.
- Inline aside CTA placements.
- Cannibalisation via differentiation + linking to closest-existing.
- Factual statements matching house positions.

**Flag to `wave2_site_wide_flags.md`:**
- Competitor source contradicts house position → `HOUSE_POSITION_CONFLICT`.
- Two of your Wave 2 IHT siblings overlap → `CANNIBAL`.
- An existing page should link to yours → `INTERNAL_LINK`.
- Non-default schema would help → `SCHEMA`.
- Redirect action → `REDIRECT`.
- Brand / business-model question → `POSITIONING`.
- Build broken by something outside your page → `BUILD_BLOCKER`.
- Calculator or component idea → `CALCULATOR_IDEA` / `COMPONENT_IDEA`.

**Log to `wave2_discovery_log_session_A.md`:**
- Adjacent IHT topics competitors cover that we don't → `ADJACENT_TOPIC`.
- Existing pages with stale figures → `EXISTING_PAGE_STALE`.
- HMRC manuals / case law we never cite → `AUTHORITY_GAP`.
- Cross-niche bridges → `CROSS_NICHE_LINK`.

**Q&A channel** (only when blocked):
- Genuine blocker not answerable from brief / house positions / your judgement.

## Your Session A pages (10 assigned — IHT)

In assignment order. Work top to bottom. Claim ONE at a time.

| # | Slug |
|---|---|
| A1 | iht-property-investors-decision-framework-2026-onwards |
| A2 | iht-gifts-with-reservation-of-benefit-property |
| A3 | iht-lifetime-gifts-7-year-rule-property-taper |
| A4 | iht-april-2026-bpr-apr-cap-property-impact |
| A5 | serviced-accommodation-bpr-eligibility-pawson-test |
| A6 | iht-non-resident-uk-property-april-2025-residence-test |
| A7 | inheriting-uk-rental-property-executors-step-by-step |
| A8 | iht-residence-nil-rate-band-2m-taper-property-portfolios |
| A9 | pension-iht-april-2027-landlord-estate-planning |
| A10 | agricultural-property-relief-mixed-estate-1m-cap |

**Critical sequence note:** A1 (decision framework) is the pillar. Consider writing it first or second so A4, A8, A9 (event-driven dependants) can link back. A7 (inheriting / executors angle) is partial-overlap-flagged against existing `inheritance-tax-rental-property-uk-guide` (score 0.33) — see brief, framing differentiator is the executor's process angle (which the existing page doesn't cover); link bidirectionally.

**IHT bucket discipline:** all 10 pages are IHT. They MUST be distinguishable by topic, not by template. Pillar (A1) vs mechanism (A2/A3/A8) vs reform-event (A4/A9) vs role-based (A5 serviced-accom, A10 agri) vs jurisdictional (A6 non-resident) vs process (A7 executors). If two pages share an H2 outline, stop and rework.

## When you're done with all 10

Update the summary at the top of `wave2_page_tracker.md` and append a `[SESSION_A_COMPLETE]` paragraph to `wave2_site_wide_flags.md`. Then stop.

Begin with A1 (`iht-property-investors-decision-framework-2026-onwards`).
