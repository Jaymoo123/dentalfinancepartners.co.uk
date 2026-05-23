# Property Wave 5, Session C, start here (Form 17 + joint ownership + spouse-mechanics)

**You are Session C.** One of three parallel Claude Opus 4.7 sessions writing NET-NEW Property pages from scratch. Your assignment is **Form 17 + joint ownership + spouse-mechanics**, 10 pages covering the canonical Form 17 mechanic page (closes the Wave 2 Stage 2 AUTHORITY_GAP), the underlying joint-tenants-vs-tenants-in-common choice, declaration-of-trust mechanics, applied tax-planning decisions, civil-partner equality, unmarried co-owners, CGT main-residence relief with joint ownership, IHT joint ownership structures, the SDLT joint-owner spousal-aggregation surcharge mechanic, and the retirement-stage Form 17 shift.

This is **Wave 5** of the Property Net-New Program. Waves 1 + 2 + 3 + 4 (121 net-new pages) are on `main` already (W1-3 deployed, W4 held).

## Worktree

You run inside `C:/Users/user/Documents/Accounting-wt-property-wave5-c/` on branch `property-wave5-c`. **Stay inside that worktree.** Build commands run from that worktree's root. Sessions A and B are in their own worktrees on their own branches; you will never collide.

## Read order before touching any code

1. **This file** (you are reading it).
2. **`docs/property/NETNEW_PROGRAM.md`** — the durable program doc. §0 critical norms, §4 brief anatomy, §7 the 19-step workflow, §8.4 session-side watcher, §11 reasoning-first selection, §13 manager instructions, §16 lessons especially **§16.14 tracker hygiene**, **§16.15 tracker-edits-on-branch anti-pattern**, **§16.16 word count**, **§16.17 atomic work-unit recovery**, **§16.27 / §16.30 / §16.35 verification mandate**, **§16.32 cross-bucket sequencing**, **§16.34 cannibal-corrected pool**.
3. **`docs/property/house_positions.md`** — the LOCKED factual positions. For Wave 5 Session C read:
   - **§24 (Form 17 + joint ownership + spouse-mechanics, Wave 5 extension, locked 2026-05-23)** is your primary locked position. Read in full. Subsections cover 50/50 default under ITA 2007 s.836, Form 17 mechanics (60-day filing, joint tenancy bar, beneficial-ownership match requirement), declaration of trust as underlying document + SDLT chargeable-consideration trap on assumed debt, TCGA 1992 s.58 no-gain-no-loss + FA 2023 3-year separation extension, cross-mechanism interactions (§4 + §15 + §19.4 + §22.5 + §23.5), unmarried co-owners, adult/minor child co-ownership + settlements legislation, HMRC enquiry pattern, citations.
   - **§4 (Section 24 finance cost restriction)** — touches C4 directly.
   - **§15.2 (GROB family-home)** — touches C7 + C8 indirectly.
   - **§15.5 (IHT spousal exemption)** — touches C8.
   - **§19.4 (MTD joint-owner threshold gross-share rule)** — touches C4 + C10.
   - **§21.2 (settlements legislation Arctic Systems carve-out)** — touches multi-generation C-bucket candidates.
   - **§22.5 (transferable NRB + RNRB)** — touches C8 directly.
   - **§23.5 (ADS joint-buyer trigger)** — touches C9 cross-bucket.
   - **§1 (SDLT)** — touches C9 directly (FA 2003 Sch 4ZA).
4. **Your assigned briefs** at `briefs/property/wave5/*.md` per the table below. Each brief is your research package.
5. **`docs/property/wave5_page_tracker.md`** — master tracker. Your assigned pages are in the Session C rows.

## Existing on-site joint-ownership inventory (read for cannibal context)

- **`section-24-joint-property-ownership-tax-split`** (recently back-patched 2026-05-23 with correct §24 Form 17 framing per F-1). C1 + C4 forward-link to this as cousin-applied content.
- **`cgt-property-transfer-spouse`** — sibling to C7.
- **`mtd-itsa-jointly-owned-property-threshold-split`** (Wave 3 B3) — MTD-specific applied page.
- **`mtd-itsa-joint-property-owners-quarterly-filing-mechanics-each-spouse`** (Wave 4 B1) — quarterly operational mechanics.
- **`iht-spouse-exemption-second-death-property-portfolio-window-mechanics`** (Wave 4 C2) — IHT second-death window mechanic (C8 cites as downstream mechanic).
- **`alphabet-shares-property-spv-dividend-splitting-spouse-children`** (Wave 4 A2) — alphabet shares + settlements legislation s.624 boundary.
- **`fic-property-retirement-decumulation-mechanics-uk`** (Wave 4 A8) — FIC retirement alternative-route sibling to C10.

## Per-page workflow (summary)

1. Read house positions doc (once at session start); above tells you which sections.
2. Claim ONE page in the tracker (todo → in_progress + UTC timestamp).
3. Read the brief.
4. Fetch + read each competitor URL with httpx + BeautifulSoup.
5. Read closest-existing pages on our site (especially the section-24 back-patched page for C1 + C4).
6. Plan H2/H3 outline + meta + FAQs + CTA placements (vary per page, anti-templating).
7. Verify factual claims against authorities. **Per §16.35, WebFetch gov.uk + legislation.gov.uk for every numeric figure before committing it.**
8. Fetch hero image from Pexels.
9. Write the markdown file at `Property/web/content/blog/<slug>.md`.
10. Build clean.
11. Six verifications must pass.
12. Apply redirect repointing in `middleware.ts` if brief lists one.
13. Register the new page in `monitored_pages` Supabase table.
14. **Commit on your branch** (per-page commit; do NOT merge to main).
15. Fill in per-page work-log at bottom of brief.
16. **Mark done in tracker** with 1-line Notes (ONLY after step 14).
17. Append site-wide issues to `docs/property/wave5_site_wide_flags.md`.
18. Append discoveries to `docs/property/wave5_discovery_log_session_C.md`.
19. Claim next page.

## Wave 4 lessons baked into Wave 5

**§16.14 / §16.15 / §16.16 / §16.17** as for Sessions A and B.

**§16.27 / §16.30 / §16.35 (per-write verification mandate):**
> Statutory figures in §24 (deemed-split fractions, 60-day window, 3-year FA-2023 separation extension, NRB/RNRB amounts) are stable; verify against legislation.gov.uk at write time anyway per §16.35 discipline. Cross-mechanism interactions (S24 + PPR + IHT + SDLT + MTD) carry their own per-write verification load: every figure cited from cross-mechanism positions (§4 / §15 / §19.4 / §22.5 / §23.5) must be re-verified at write time. F-19 + F-20 = 5th + 6th consecutive Bill-vs-enacted drift; the §16.35 mandate exists because the pattern is so reliable.

## Q&A channel + session-side watcher

If you need a manager decision (genuinely cannot proceed without it), append to `docs/property/wave5_questions_session_C.md` with `STATUS: open`.

**Spawn a session-side watcher immediately after appending:**

```bash
QFILE="docs/property/wave5_questions_session_C.md"
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
- `BlogPostRenderer.tsx` auto-injects LeadForm at footer.
- `<aside>` tags styled by global CSS.
- 1-3 inline asides per page.

### FAQs and schema
- FAQs in frontmatter `faqs:` array.
- 10-14 FAQs per page.

### Anti-templating (Form 17 + joint ownership bucket)

- 10 pages all on Form 17 + joint ownership cannot read like 10 versions. Each brief's framing differentiator owns a distinct primary mechanic.
- **C1 (Form 17 mechanic) is the foundational page**. C5 (civil-partner-applied) + C4 (applied decision framework) cite C1 as upstream.
- **C2 (joint tenants vs tenants in common)** is the structural ownership-law choice; distinct from C1 (the spouse-only override) by being the underlying property-law page.
- **C3 (declaration of trust)** is the underlying document mechanic; distinct from C1 (the tax declaration) by being the deed.
- **C4 (applied decision framework)** is the marginal-rate / S24 / MTD interaction page; cites C1 + C3 as upstream mechanic.
- **C5 (civil-partner-applied)** is cohort-specific, same mechanic as C1 with CPA 2004 framing + dissolution edge cases.
- **C6 (unmarried co-owners)** is the non-spouse cohort; explicitly NO Form 17 route.
- **C7 (CGT main residence relief)** is the CGT-side mechanic; distinct from C1 (income-tax mechanic).
- **C8 (IHT joint ownership structural choice)** is the JT-vs-TIC IHT consequences page; cites Wave 4 C2 (second-death window mechanic).
- **C9 (SDLT spousal aggregation)** is the SDLT-applied one-off charge mechanic.
- **C10 (retirement Form-17 shift)** is the retirement persona applied page; cross-links Wave 4 A8 as FIC alternative.

### House positions

For Wave 5 Session C: §24 (primary). §4 / §15 / §19.4 / §22.5 / §23.5 / §1 / §21.2 / §15.2 for cross-mechanism interactions per the §24.5 thread.

If a competitor source contradicts §24 (or any of the cross-mechanism positions), the house position wins. Flag in `wave5_site_wide_flags.md`.

### Quality bar
- Body words: framing-differentiator-led (typically 2,500-3,500).
- FAQs 10-14.
- 4-7 external authority links per page (legislation.gov.uk statutes + HMRC manuals).
- Build clean.
- **§16.35 per-write verification on every numeric figure.**

## What to handle yourself vs flag

**Handle yourself:**
- Em-dash removals, FAQ count discipline, Tailwind avoidance.
- ITA 2007 / ITTOIA 2005 / TCGA 1992 / FA 2003 / IHTA 1984 + HMRC TSEM / PIM citations.
- gov.uk + legislation.gov.uk per-write verification per §16.35.
- Cross-mechanism interactions cited from precise § subsections (§19.4 not §19; §22.5 not §22).

**Flag to `wave5_site_wide_flags.md`:**
- Competitor source contradicts §24 or cross-mechanism §X position: `HOUSE_POSITION_CONFLICT`.
- Two siblings overlap: `CANNIBAL`.
- An existing page should link to yours: `INTERNAL_LINK`.
- Other tags as per Wave 4.

**Log to `wave5_discovery_log_session_C.md`:**
- `ADJACENT_TOPIC`, `EXISTING_PAGE_STALE`, `AUTHORITY_GAP`, `CROSS_NICHE_LINK`.

## Cross-bucket coordination flags (§16.32 sequencing) — CRITICAL

**Two §16.32 sequencing constraints apply to your bucket:**

### 1. C1 must ship BEFORE C5 (within-Session sequencing)

C5 (`civil-partnerships-joint-property-ownership-tax-treatment-form-17-equality`) is a cohort-specific applied page that cites C1 (`form-17-declaration-beneficial-interest-property-mechanics-filing-revocation`) as the upstream mechanic page. **Write C1 first** OR if you write in parallel, include a forward-link placeholder in C5 that the manager hyperlinks at merge.

### 2. B2 + B7 ship before C9 (cross-Session B/C sequencing)

C9 (`second-home-sdlt-additional-dwellings-surcharge-joint-owners-spouse-aggregation-rules`) covers the English SDLT side of the spousal-aggregation question (FA 2003 Sch 4ZA). The devolved equivalents are Session B's B2 (Welsh LTT higher rates, LTTA 2017 Sch 5) and B7 (Scottish ADS, LBTT(S)A 2013 Sch 2A).

**Coordinate with Session B:**
- Check `wave5_page_tracker.md` before claiming C9; verify B2 + B7 are committed (Session B rows show `✅ done` with branch commit references).
- If B2 + B7 are NOT yet shipped when you reach C9, include forward-link placeholders in C9's body (`<a href="/blog/{category}/welsh-ltt-higher-rates-...">Welsh LTT counterpart</a>` etc.). Manager hyperlinks at merge once B2 + B7 land.
- Alternative: claim and write C9 LAST in your sequence (after C1-C8 + C10), to maximise the chance B2 + B7 are committed by then.

### 3. C8 ↔ Wave 4 C2 cross-wave coordination

C8 (`iht-joint-ownership-property-spouse-exemption-transferable-allowances-jointly-tic-vs-jt`) extends Wave 4 C2 (`iht-spouse-exemption-second-death-property-portfolio-window-mechanics`). Wave 4 C2 is on `main`; you can cite directly. C8 covers structural choice (JT vs TIC); Wave 4 C2 covers second-death window mechanic. Keep boundary tight.

### 4. C10 ↔ Wave 4 A8 cross-wave coordination

C10 (`retirement-planning-spousal-rental-income-shift-form-17-marginal-rate-restructure`) and Wave 4 A8 (`fic-property-retirement-decumulation-mechanics-uk`) are sibling retirement applied pages. Cross-link Wave 4 A8 as the alternative-route via FIC corporate structure.

## Your Session C pages (10 assigned)

In assignment order. Work top to bottom. Claim ONE at a time.

| # | Slug |
|---|---|
| C1 | form-17-declaration-beneficial-interest-property-mechanics-filing-revocation |
| C2 | joint-tenants-vs-tenants-in-common-property-tax-consequences-uk-landlords |
| C3 | declaration-of-trust-property-beneficial-ownership-mechanics-evidence-form-17 |
| C4 | unequal-rental-income-split-spouses-tax-planning-form-17-vs-default-50-50-decision |
| C5 | civil-partnerships-joint-property-ownership-tax-treatment-form-17-equality |
| C6 | unmarried-co-owners-property-tax-rental-income-split-actual-beneficial-share |
| C7 | cgt-main-residence-relief-joint-ownership-pra-election-spouses-mechanics |
| C8 | iht-joint-ownership-property-spouse-exemption-transferable-allowances-jointly-tic-vs-jt |
| C9 | second-home-sdlt-additional-dwellings-surcharge-joint-owners-spouse-aggregation-rules |
| C10 | retirement-planning-spousal-rental-income-shift-form-17-marginal-rate-restructure |

**Sequence note:** C1 (Form 17 mechanic) MUST ship first. C2 (JT vs TIC) + C3 (declaration of trust) are structural underpinnings — write next. C4-C10 cite C1/C2/C3 as upstream. C9 last in sequence is recommended to maximise B2/B7 coordination.

## Continuation prompt boilerplate (read before stopping)

If you run out of context mid-page, before stopping:
1. Commit current page if writable.
2. Flip tracker (in_progress → done) if commit landed.
3. Write 1-line discovery-log entry with stop point + next slug.

## When you are done with all 10

Update the summary at the top of `wave5_page_tracker.md` and append a `[SESSION_C_COMPLETE]` paragraph to `wave5_site_wide_flags.md`. Then stop.

Begin with the first row in your table.
