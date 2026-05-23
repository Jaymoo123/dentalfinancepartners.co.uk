# Property Wave 5, Session A, start here (VAT topical-gap deepening)

**You are Session A.** One of three parallel Claude Opus 4.7 sessions writing NET-NEW Property pages from scratch. Your assignment is **VAT topical-gap deepening**, 10 pages covering the property-VAT topics not yet on-site (option-to-tax mechanics, Capital Goods Scheme, partial-exemption for mixed portfolios, mixed-use purchase apportionment, dilapidations VAT, conversion zero-rate routes, developer pre-registration input tax, long-stay TOMS deepening, cladding-remediation relief, and the umbrella decision framework).

This is **Wave 5** of the Property Net-New Program. Waves 1 + 2 + 3 + 4 (121 net-new pages) are on `main` already (W1-3 deployed, W4 held).

## Worktree

You run inside `C:/Users/user/Documents/Accounting-wt-property-wave5-a/` on branch `property-wave5-a`. **Stay inside that worktree.** Build commands run from that worktree's root. Sessions B and C are in their own worktrees on their own branches; you will never collide.

## Read order before touching any code

1. **This file** (you are reading it).
2. **`docs/property/NETNEW_PROGRAM.md`** — the durable program doc. §0 critical norms, §4 brief anatomy, §7 the 19-step workflow, §8.4 session-side watcher, §11 reasoning-first selection, §13 manager instructions, §16 lessons especially **§16.14 tracker hygiene**, **§16.15 tracker-edits-on-branch anti-pattern**, **§16.16 word count discipline**, **§16.17 atomic work-unit recovery**, **§16.27 Bill-vs-enacted-Act drift verification**, **§16.30 mandatory pre-wave verification (now per-write per §16.35)**, **§16.32 cross-bucket sequencing**, **§16.34 cannibal-corrected pool**, **§16.35 per-write verification mandate**.
3. **`docs/property/house_positions.md`** — the LOCKED factual positions. For Wave 5 Session A:
   - **Bucket A has NO dedicated house position section.** VAT is UK-wide statute, statute-isolated from devolved tax and Form 17. Your authorities are **VATA 1994** directly, **VAT Regulations 1995**, **HMRC VAT Notices** (708 buildings, 706/2 CGS, 706 partial exemption, 742 land + property, 709/3 hotels), and **HMRC VAT Manuals** (VATSC, VATLAND, PE, VIT).
   - **§16.35 per-write verification mandate is paramount for this bucket.** Every numeric VAT figure (rates, scheme thresholds, day-triggers, percentages, register positions) MUST be verified against current gov.uk at write time before being baked into a worked example. The pre-wave statute verification did not cover Bucket A figures because no §15-§24 covers VAT. You are the per-write defence.
4. **Your assigned briefs** at `briefs/property/wave5/*.md` per the table below. Each brief is your research package: framing differentiator, verified-live competitor URLs (Stage 2 verified ~13% of seed URLs were dead and replaced), closest-existing pages, authority links, redirect overlap, and the embedded 19-step workflow. Read the brief in full before starting each page.
5. **`docs/property/wave5_page_tracker.md`** — master tracker. Your assigned pages are in the Session A rows.

## Per-page workflow (canonical version in each brief; summary)

1. Read house positions doc (once at session start); above tells you which sections.
2. Claim ONE page in the tracker (todo → in_progress + UTC timestamp).
3. Read the brief.
4. Fetch + read each competitor URL with httpx + BeautifulSoup.
5. Read closest-existing pages on our site.
6. Plan H2/H3 outline + meta + FAQs + CTA placements (vary per page, anti-templating).
7. Verify factual claims against authorities. **Per §16.35, WebFetch gov.uk for every numeric VAT figure before committing it.**
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
18. Append discoveries to `docs/property/wave5_discovery_log_session_A.md`.
19. Claim next page.

## Wave 4 lessons baked into Wave 5

**§16.14 (continuation handover hygiene), critical:**
> If you commit a page but feel context-pressured, flip the tracker IMMEDIATELY before stopping. Tracker drift at handover boundaries cost throughput in Wave 2 and required back-patching in every continuation session. Do not repeat that.

**§16.15 (tracker-edits-on-branch anti-pattern):**
> Tracker edits go to the main repo file via absolute paths only. NEVER commit tracker edits on your session branch. Branch commits contain ONLY content files (`Property/web/content/blog/*.md`), `middleware.ts` redirect edits where applicable, and brief work-log fills.

**§16.16 (word count discipline):**
> Write to the framing differentiator, not to a target. 2,500-3,500 body words typical. Reference pages may sit at floor; depth pages may sit higher. Justify any 4,000+ in the work-log.

**§16.17 (atomic work-unit recovery):**
> If you hit a rate limit, finish the current atomic unit (one brief, one section, one verification step) before pausing. Do not half-finish three things.

**§16.27 / §16.30 / §16.35 (per-write verification mandate, CRITICAL for VAT bucket):**
> Five and six consecutive Bill-vs-enacted-Act drifts caught across F-6, F-11, F-12+F-13, F-18, F-19, F-20. The §16.27 pre-wave statute verification sub-agent is now a backstop, NOT the primary defence. **Every numeric VAT figure (rates, scheme thresholds, day-triggers, percentages, registers) that you cite in a worked example MUST be verified against current gov.uk at write time before committing.** Failure to do so risks shipping a 7th consecutive drift. The brief provides authority URLs; you verify each figure at write time.

**§16.14 continuation-prompt back-patch on startup:**
> If you are resuming this session after an interruption, the FIRST action is to scan `wave5_page_tracker.md` for tracker-vs-branch drift (any in_progress or done rows without a commit, or commits not reflected in the tracker). Fix the drift before claiming a new page.

## Q&A channel + session-side watcher

If you need a manager decision (genuinely cannot proceed without it), append to `docs/property/wave5_questions_session_A.md` with `STATUS: open`.

**Spawn a session-side watcher immediately after appending:**

```bash
QFILE="docs/property/wave5_questions_session_A.md"
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

Persistent: false. Timeout: 1 hour. While the watcher runs, continue work on a different page or a different step on the same page; do NOT block on the watcher.

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
- FAQs in frontmatter `faqs:` array. Auto-emits FAQPage JSON-LD. Do NOT add FAQ schema in body.
- 10-14 FAQs per page.

### Anti-templating (VAT bucket)
- 10 pages all VAT cannot read like 10 versions of the same page. Each brief's framing differentiator owns a distinct primary mechanic. Vary H2 outlines aggressively. Vary openings. Vary FAQ phrasing.
- **A1 (OTT mechanic)** is the foundational page in the bucket; A2 (CGS) + A3 (partial-exemption) cite A1 as upstream election.
- **A6 (conversion)** differentiates from existing `vat-on-new-builds-residential-property` (new-build = VATA 1994 Sch 8 Group 5 Item 1(a)) and `diy-housebuilders-vat-refund-scheme` (DIY claim mode); A6 covers Group 5 Item 1(b) zero-rate + Sch 7A Group 6 reduced-rate.
- **A8 (long-stay TOMS)** is the deepening of existing `toms-vat-serviced-accommodation`; cross-link as framework page, your A8 covers the 28-day-rule long-stay deepening only.
- **A10 (umbrella decision-framework)** is the entry-level page that links out to A1 + A3 for depth; explicit cross-link to existing `landlord-vat-registration-when-required`.

### House positions
- For Wave 5 Session A: no dedicated §X locked position (VAT is UK-wide statute). Authorities are VATA 1994, VAT Regulations 1995, HMRC VAT Notices, HMRC VAT Manuals.
- If a competitor source contradicts a statutory provision, the statute wins. Flag in `wave5_site_wide_flags.md`.

### Quality bar
- Body words: framing-differentiator-led (typically 2,500-3,500).
- FAQs 10-14.
- 4-7 external authority links per page.
- Build clean.
- **§16.35 per-write verification on every numeric figure.**

## What to handle yourself vs flag

**Handle yourself:**
- Em-dash removals, FAQ count discipline, Tailwind avoidance.
- VATA 1994 / VAT Regulations 1995 / HMRC manual citations.
- Inline aside CTA placements.
- Cannibalisation via differentiation + linking to closest-existing.
- Factual statements verified against current gov.uk at write time (§16.35).

**Flag to `wave5_site_wide_flags.md`:**
- Competitor source contradicts statute or HMRC manual: `HOUSE_POSITION_CONFLICT` (against the implied UK-wide VAT position even though no §X is locked).
- Two of your Wave 5 siblings overlap: `CANNIBAL`.
- An existing page should link to yours: `INTERNAL_LINK`.
- Non-default schema would help: `SCHEMA`.
- Redirect action: `REDIRECT`.
- Brand / business-model question: `POSITIONING`.
- Build broken by something outside your page: `BUILD_BLOCKER`.
- Calculator or component idea: `CALCULATOR_IDEA` / `COMPONENT_IDEA`.

**Log to `wave5_discovery_log_session_A.md`:**
- Adjacent topics competitors cover that we do not: `ADJACENT_TOPIC`.
- Existing pages with stale figures: `EXISTING_PAGE_STALE`.
- HMRC manuals / case law we never cite: `AUTHORITY_GAP`.
- Cross-niche bridges: `CROSS_NICHE_LINK`.

## Cross-bucket coordination flags

- **A ↔ B (low risk):** VAT is UK-wide statute; devolved property tax is land-transaction-tax. No expected overlap. Session B does not touch VAT.
- **A ↔ C (low risk):** VAT is statute-isolated from Form 17 / joint ownership mechanics. Session C may reference VAT in passing on a joint-portfolio mixed-supplies page; cross-link to A3 (partial-exemption) where Session C does.
- **Within-bucket:** A6 conversion ↔ existing new-build + DIY pages (differentiation noted above); A8 long-stay TOMS ↔ existing framework TOMS page (sibling deepening); A10 umbrella ↔ existing registration page (entry-level vs depth).

## Your Session A pages (10 assigned)

In assignment order. Work top to bottom. Claim ONE at a time.

| # | Slug |
|---|---|
| A1 | vat-option-to-tax-commercial-property-mechanics-election-revocation |
| A2 | vat-capital-goods-scheme-property-businesses-10-year-adjustment-mechanics |
| A3 | vat-partial-exemption-landlords-mixed-residential-commercial-portfolios-standard-method |
| A4 | vat-mixed-use-property-purchase-residential-commercial-element-apportionment |
| A5 | vat-dilapidations-payments-tenant-landlord-vat-treatment-supply-or-damages |
| A6 | vat-property-conversion-residential-to-commercial-or-commercial-to-residential-zero-rate-reduced-rate |
| A7 | vat-developer-pre-registration-input-tax-recovery-property-development-projects |
| A8 | vat-toms-long-term-stays-hotel-aparthotel-28-day-rule-mechanics |
| A9 | vat-cladding-remediation-relief-residential-building-safety-act-section-30a-mechanics |
| A10 | vat-on-rental-income-residential-vs-commercial-landlord-vat-status-decision-framework |

**Sequence note:** A1 (OTT) is the foundational mechanic; consider writing first so A2 (CGS) + A3 (partial-exemption) can cite A1 as the upstream election. A6 (conversion) before A4 (mixed-use) is also useful, but no strict sequencing constraint.

## Continuation prompt boilerplate (read before stopping)

If you run out of context mid-page, before stopping:
1. Commit current page if writable.
2. Flip tracker (in_progress → done) if commit landed.
3. Write 1-line discovery-log entry with stop point + next slug.

## When you are done with all 10

Update the summary at the top of `wave5_page_tracker.md` and append a `[SESSION_A_COMPLETE]` paragraph to `wave5_site_wide_flags.md`. Then stop.

Begin with the first row in your table.
