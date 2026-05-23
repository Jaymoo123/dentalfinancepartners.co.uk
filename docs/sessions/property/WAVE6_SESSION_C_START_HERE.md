# Property Wave 6, Session C, start here (Capital allowances + SBA + FYA (CAA 2001))

**You are Session C.** One of three parallel Claude Opus 4.7 sessions writing NET-NEW Property pages from scratch. Your assignment is **Capital allowances + SBA + FYA (CAA 2001)**. 10 pages covering the CAA 2001 pillar (claimant type x property type x expenditure type decision framework), disposal mechanics (balancing allowance/charge), SBA depth (Part 2A 3% straight-line over 33 years), AIA £1m + associated-co allocation, full expensing (s.45S companies-only) including carve-outs, fixtures s.198 election mechanics for commercial property buyers, HMO common-parts s.35 claim (the one residential-exclusion crack), FHL post-abolition grandfathered pools, land remediation relief 150% (CTA 2009 Pt 14 sister regime), and super-deduction historic 1.3x disposal clawback.

This is **Wave 6** of the Property Net-New Program. Waves 1-5 (151 net-new pages) are on `main` already (W1-3 deployed; W4 + W5 held pending user decision).

## Q&A discipline (§16.15 + §16.37 CRITICAL — read this first)

When raising a Q to manager, you append to `C:/Users/user/Documents/Accounting/docs/property/wave6_questions_session_C.md` via **ABSOLUTE PATH** from your worktree. **NEVER** append to your worktree's relative-path copy of that file. Manager polls main's path only; questions written to the worktree's relative-path copy are NOT seen by the manager-side watcher and require manual user-side propagation. The same discipline applies to tracker (`wave6_page_tracker.md`), flags (`wave6_site_wide_flags.md`), and discovery (`wave6_discovery_log_session_C.md`) — all absolute-path edits to main. This is §16.15's load-bearing rule; it has been violated in Waves 4 + 5 and §16.37 codifies the prominence requirement.

## Worktree

You run inside `C:/Users/user/Documents/Accounting-wt-property-wave6-c/` on branch `property-wave6-c`. **Stay inside that worktree.** Build commands run from that worktree's root. Sessions AB are in their own worktrees on their own branches; you will never collide.

## Read order before touching any code

1. **This file** (you are reading it).
2. **`docs/property/NETNEW_PROGRAM.md`** — the durable program doc. §0 critical norms, §4 brief anatomy, §7 the 19-step workflow, §8.4 session-side watcher, §11 reasoning-first selection, §13 manager instructions, §16 lessons especially **§16.14 tracker hygiene**, **§16.15 + §16.37 Q&A absolute-path discipline**, **§16.16 word count discipline**, **§16.17 atomic work-unit recovery**, **§16.27 + §16.30 + §16.35 Bill-vs-enacted-Act drift mandatory per-write verification**, **§16.32 cross-bucket sequencing**, **§16.36 statutory cross-check gate**, **§16.38 + §16.39 + §16.40 Wave 6 drift lessons** (the 9+ consecutive drift catch pattern).
3. **`docs/property/house_positions.md`** — the LOCKED factual positions. For Wave 6 Session C: **§25.1-§25.10 (Wave 6 NEW cluster) is your PRIMARY anchor.** This is a brand-new house position cluster — no prior wave has touched CAA 2001 depth. Cross-references: §21.5 (FIC mechanics, including FIC-level CA availability where commercial property held). Read §25 in FULL before starting any C-brief.
4. **Your assigned briefs** at `briefs/property/wave6/*.md` per the table below. Each brief is your research package: framing differentiator, verified-live competitor URLs (Stage 2 verified URLs at write time), closest-existing pages, authority links, redirect overlap, and the embedded 19-step workflow. Read the brief in full before starting each page.
5. **`docs/property/wave6_page_tracker.md`** — master tracker. Your assigned pages are in the Session C rows.

## Bucket-specific authorities

CAA 2001 (s.15 qualifying activities post-FA-2025 omissions, s.21 buildings + List A, s.22 structures + List B, s.23 List C carve-back, s.33A integral features special rate 6%, s.35 dwelling-house exclusion + HMO common-parts narrow exception, s.39 FYA gateway, s.45D low-emission cars, s.45EA EV charging points, s.45O Freeport/special tax sites, s.45S full expensing for companies post-1-April-2023, s.45K designated assisted areas, s.46 FYA exclusions, s.51A-N AIA £1m permanent from 1 April 2023 + s.51E associated companies + s.51G shared-premises/similar-activities, s.55-67 disposal mechanics, s.61 disposal events table, s.83 short-life asset election, s.196 fixtures table, s.198 fixtures election, s.270AA-270IH SBA Part 2A with 3% rate uplift FA 2020 + s.270CF residential exclusion + s.270IA allowance statement requirement), CTA 2009 Part 14 (ss.1143-1179 LRR 150%), Finance Acts (FA 2018 SBA introduction, FA 2020 rate uplift, FA 2021 ss.9-10 super-deduction expired 31 March 2023, FA(No.2)2023 s.8 AIA permanent + s.45S full expensing, **FA 2025 Sch 5 FHL abolition** commencement 1 April 2025 CT / 6 April 2025 IT), TCGA 1992 s.37B (SBA cumulative add-back into CGT), HMRC manuals (CA21000+ PMAs, CA22000+ integral features, CA23000+ AIA, CA50000+ FYAs, CA90000+ SBA, CIRD60000 LRR).

## Critical drift catches inherited from Wave 6 Stage 1b + Stage 2 (read before writing any brief that touches these areas)

- **CRITICAL:** **FHL abolition is FA 2025 Sch 5** (NOT FA 2024 Sch 5 — that is museum and gallery exhibitions). Commencement 1 April 2025 CT / 6 April 2025 IT per FA 2025 Sch 5 Part 5 paragraph 12. Pre-Wave-6 advice citing FA 2024 Sch 5 for FHL is wrong. C8 brief uses corrected cite; do not propagate the wrong-Sch variant.
- **CRITICAL:** **SBA residential exclusion is CAA 2001 s.270CF "Exclusion: residential use"** (NOT s.270BG — that is the land-acquisition exclusion, a different exclusion entirely). Both exist; both bite; conflating them is a hard error. C3 brief uses s.270CF correctly + cross-references s.270BG separately for land-acquisition.
- **CRITICAL:** **FYA section identities (commonly conflated):** s.45D = low-emission cars; s.45EA = electric vehicle CHARGING points; s.45O = special tax sites (Freeports / Investment Zones); s.45S = full expensing for companies post-1-April-2023; s.45K = plant in designated assisted areas (NOT EV charging). C5 + C10 briefs cite the correct identities; do NOT shuffle them.
- **MATERIAL:** **AIA is £1m PERMANENT from 1 April 2023** (made permanent by Finance (No. 2) Act 2023 s.8). Do NOT cite £200k or describe as "temporarily" raised. Cars are excluded from AIA (separate FYA at s.45D for low-emission cars).
- **MATERIAL:** **SBA rate is 3% straight-line over 33 1/3 years from 1 April 2020 CT / 6 April 2020 IT** (FA 2020 uplift from 2%). 10% rate over 10 years for special tax site qualifying expenditure (Freeports/Investment Zones). SBA does NOT generate a balancing event on disposal — allowance period inherits to successor owner; CGT-side TCGA s.37B add-back is the disposal mechanism.
- **MATERIAL:** **S.35 dwelling-house restriction is the cluster's central misconception.** Residential lettings do NOT qualify for P&M allowances except plant in common parts of HMOs (CAA 2001 s.35 narrow exception). C7 brief is the depth page for this exception.
- **MATERIAL:** **Super-deduction (130% FYA) expired 31 March 2023.** The 1.3x disposal-value clawback still bites on assets claimed in the 1 April 2021 - 31 March 2023 window. C10 brief is the depth page for the historic clawback.
- **MATERIAL:** **Full expensing (s.45S) is COMPANY-ONLY** (not available to individuals, partnerships, or LLPs). Made permanent by Autumn Statement 2023; section text has no sunset clause. PENDING: Autumn Budget 2024 announced extension to leased plant; commencement appointment order not on legislation.gov.uk as of 2026-05-23, do not assume in force.

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
18. Append discoveries to `docs/property/wave6_discovery_log_session_C.md` (absolute path).
19. Claim next page.

## Sequencing constraints (§16.32 cross-bucket + within-bucket priorities for Session C)

1. **C1 ships FIRST (within-bucket).** C1 is the pillar; C2-C10 cite C1 as upstream and forward-link to it.
2. **C2 cites A4 (cross-bucket).** A4 (Session A, MVL exit) ships FIRST on A-branch. C2 references A4 as the MVL distribution-in-specie source for the CAA 2001 s.61 event 8 example. Before claiming C2, check the A-branch tracker for A4 status; if A4 not yet committed, include forward-link placeholder for manager hyperlink at wave merge.
3. **C4 + C5 cite A7 (cross-bucket).** A7 (Session A, HoldCo extraction) ships before A8-A10 on A-branch. C4 cites A7 for AIA shared-allowance across associated SPVs; C5 cites A7 for intra-group transfer of full-expensed assets (s.45BB carve-out + Sch A1 connected-co restrictions). Manager applies bidirectional back-patches at wave merge per §16.32; no in-session block needed beyond placeholder forward-links.
4. **C8 uses FA 2025 Sch 5 commencement dates.** Do NOT use earlier-dated framings for FHL abolition. Per-write verification mandate per §16.35.
5. **C9 (LRR) is a CTA 2009 Part 14 sister regime** to the CAA 2001 cluster. Brief notes the bucket-fit; sessions use CTA 2009 Pt 14 statutory text + CIRD60000 as primary references rather than CAA 2001.

## Wave 5 lessons baked into Wave 6 (in addition to drift discipline above)

**§16.14 (continuation handover hygiene), critical:**
> If you commit a page but feel context-pressured, flip the tracker IMMEDIATELY before stopping. Tracker drift at handover boundaries cost throughput in Wave 2 and required back-patching in every continuation session. Do not repeat that. The continuation prompt for this session has back-patch-on-startup as its first action.

**§16.16 (word count discipline):**
> Write to the framing differentiator, not to a target. 2,500-3,500 body words typical. Reference pages may sit at floor; depth pages may sit higher. Justify any 4,000+ in the work-log.

**§16.17 (atomic work-unit recovery):**
> If you hit a rate limit, finish the current atomic unit (one brief, one section, one verification step) before pausing. Do not half-finish three things.

## Q&A channel + session-side watcher

If you need a manager decision (genuinely cannot proceed without it), append to `C:/Users/user/Documents/Accounting/docs/property/wave6_questions_session_C.md` (ABSOLUTE PATH) with `STATUS: open`.

**Spawn a session-side watcher immediately after appending:**

```bash
QFILE="C:/Users/user/Documents/Accounting/docs/property/wave6_questions_session_C.md"
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
- For Wave 6 Session C: **§25.1-§25.10 (Wave 6 NEW cluster) is your PRIMARY anchor.** This is a brand-new house position cluster — no prior wave has touched CAA 2001 depth.
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

**Log to `wave6_discovery_log_session_C.md` (absolute path):**
- Adjacent topics competitors cover that we do not: `ADJACENT_TOPIC`.
- Existing pages with stale figures: `EXISTING_PAGE_STALE`.
- HMRC manuals / case law we never cite: `AUTHORITY_GAP`.
- Cross-niche bridges: `CROSS_NICHE_LINK`.

## Your Session C pages (10 assigned)

In assignment order. Within-bucket priorities marked in the notes column. Claim ONE at a time.

| # | Slug | Notes |
|---|---|---|
| C1 | `capital-allowances-property-investors-complete-pillar-2026-27-caa-2001-decision-framework` | Pillar (cluster spine) — claimant x property x expenditure decision framework |
| C2 | `balancing-allowance-balancing-charge-on-disposal-property-capital-allowances-mechanics` | Disposal mechanics; cites A4 MVL distribution-in-specie as s.61 event 8 |
| C3 | `structures-and-buildings-allowance-sba-3-percent-claim-mechanics-fa-2018-onward` | SBA depth; 3% straight-line; s.270CF residential exclusion (not s.270BG) |
| C4 | `aia-1m-cap-property-investors-allocation-strategy-and-association-rules-cta-2010` | AIA + associated-co allocation; A7 cross-reference for HoldCo group |
| C5 | `full-expensing-50-percent-fya-commercial-property-spvs-mechanics-fa-2023` | Full expensing s.45S carve-outs; A7 cross-reference for intra-group transfer |
| C6 | `commercial-property-fixtures-claim-s198-election-purchase-mechanics` | Fixtures regime + s.198 election + 2-year pooling gate |
| C7 | `hmo-common-parts-capital-allowances-s35-claim-mechanics-multi-tenant-property` | HMO common-parts s.35 narrow exception |
| C8 | `fhl-capital-allowances-post-april-2025-grandfathered-claims-mechanics` | FHL post-abolition pools; **cites FA 2025 Sch 5** (NOT FA 2024) |
| C9 | `land-remediation-relief-150-percent-claim-mechanics-ltdco-developer-investor` | LRR 150% (sister regime CTA 2009 Pt 14) |
| C10 | `super-deduction-130-percent-transitional-disposal-balancing-charge-mechanics-fa-2021` | Super-deduction historic 1.3x disposal clawback |

## Continuation prompt boilerplate (read before stopping)

If you run out of context mid-page, before stopping:
1. Commit current page if writable.
2. Flip tracker (in_progress → done) if commit landed (absolute path to main).
3. Write 1-line discovery-log entry with stop point + next slug (absolute path).

## When you are done with all 10

Update the summary at the top of `wave6_page_tracker.md` (absolute path) and append a `[SESSION_C_COMPLETE]` paragraph to `wave6_site_wide_flags.md` (absolute path). Then stop.

Begin with the first row in your table (subject to within-bucket priorities above).
