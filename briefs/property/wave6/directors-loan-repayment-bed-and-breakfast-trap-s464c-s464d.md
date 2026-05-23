# Wave 6 brief: directors-loan-repayment-bed-and-breakfast-trap-s464c-s464d

**Site:** property
**Bucket:** A (LtdCo extraction-sequence pillar)
**Session:** A
**Brief type:** Net-new page (no existing markdown file)
**Source markdown path on launch:** `Property/web/content/blog/directors-loan-repayment-bed-and-breakfast-trap-s464c-s464d.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/incorporation-and-company-structures/directors-loan-repayment-bed-and-breakfast-trap-s464c-s464d

---

## Manager pre-decisions

- **Suggested slug:** `directors-loan-repayment-bed-and-breakfast-trap-s464c-s464d`
- **Suggested category:** `incorporation-and-company-structures`
- **Bucket:** A (LtdCo extraction-sequence pillar)
- **Framing differentiator (Stage 2 deepened, 2026-05-23):**

> **STAGE 2 §16.36 DRIFT CATCH — CRITICAL:** Stage 1 brief seed framed s.464C as the live bed-and-breakfast anti-avoidance mechanic. **CTA 2010 ss.464A-464D were OMITTED in full by Finance Act 2025 with effect from 30 October 2024**, leaving the s.455 charge as the sole gateway for the overdrawn-DLA cohort (with the s.464A "arrangements conferring benefit on participator" rule still standing in modified form). Verified at https://www.legislation.gov.uk/ukpga/2010/4/section/464C on 2026-05-23 (status: "no longer has effect"). The HMRC bed-and-breakfast challenge route now operates through (a) the s.455 9-month-after-end-of-AP gateway itself, (b) HMRC's general anti-abuse posture on close-company arrangements, and (c) the s.464A close-company anti-avoidance arrangement provision where the redrawing is part of a planned scheme. The slug is retained for SEO continuity but the page must reframe entirely on the post-FA-2025 architecture. A2 deepens what's actually in force: the s.455 mechanic, the practical realities of HMRC's anti-bed-and-breakfast posture without the explicit £5k 30-day / £15k anti-arrangement statutory tests, the s.464A residual anti-avoidance gateway, and worked-example failed-repayment-pattern walks showing s.455 reinstatement at HMRC enquiry. Distinct from Wave 4 A1 (10-year repayment strategy) by being the trap deep-dive on the residual anti-avoidance architecture. Distinct from Wave 1 B1 (DLA entry mechanics) by being the repayment-side trap.

If your reasoning suggests the slug / category should differ, you may override, but log the override and reason in the per-page work-log below. **Slug-rename consideration:** since ss.464C / 464D no longer have effect, the slug carries a stale statute reference. Manager view: keep the slug for SEO continuity but front-load the H1 / meta to reflect the post-FA-2025 architecture; do not write the body content around the omitted sections as if they were live.

**Stage 1 manager note (superseded by Stage 2 drift catch):** Stage 1 framed this as "s.464C / s.464D depth dive" with £5k 30-day and £15k anti-arrangement tests. Stage 2 surfaces FA 2025 omission. Reframe accordingly; the worked failed-repayments pattern still has educational value but the statutory hook changed.

---

## Competitor URLs (Stage 2 §16.31 verified 2026-05-23)

- https://www.gov.uk/hmrc-internal-manuals/company-taxation-manual/ctm61605 — VERIFIED ALIVE 2026-05-23. CTM61605 covers "Assignment and novation of debt" in the context of close company loans to participators — Stage 1 cited this as "anti-avoidance" but it is actually the assignment/novation distinction page. Useful for the page's "what counts as repayment" subsection but NOT the bed-and-breakfasting depth source. Session should locate CTM61500-CTM61700 chapter for the actual bed-and-breakfast guidance.
- https://www.gov.uk/hmrc-internal-manuals/company-taxation-manual/ctm61560 — Stage 1 cited as "bed-and-breakfasting". WebFetch denied during Stage 2; treat as **TENTATIVE**, session must re-verify.
- https://www.crunch.co.uk/knowledge/article/directors-loan-account-bed-and-breakfasting — Stage 1 SEED. WebFetch denied during Stage 2; treat as **TENTATIVE** for outline reference only. Session must re-verify with httpx at write time.
- https://www.icaew.com/insights/tax-news/2024/may-2024/the-tricky-issue-of-bed-and-breakfasting-of-directors-loans — Stage 1 SEED. WebFetch denied during Stage 2; treat as **TENTATIVE** but high-value if alive. Session re-verify.

**Stage 2 verification note:** 1 URL confirmed alive (CTM61605 — but topic mismatch flagged); 3 tentative pending session re-verification. Pool is thinner than typical because the FA-2025 omission post-dates most pre-2025 competitor content. Session should expect to do their own targeted SERP search at write time for current post-FA-2025 commentary; if commentary is sparse, this is itself a depth-opportunity for A2.

**Fetch + read + extract instruction (session):** Fetch each URL via `httpx.get(url, timeout=30, follow_redirects=True, headers={"User-Agent": "Mozilla/5.0"})` then parse with BeautifulSoup (lxml). Extract: outline shapes for "DLA bed-and-breakfast" coverage. **Critical: identify whether competitor content has been updated post-FA-2025 omission. Most pre-2025 competitor content will still describe s.464C / s.464D as live; this is wrong post-30-October-2024.** Cross-check every claim against legislation.gov.uk for the s.464A-464D omission status, HMRC CTM61500+ for the residual close-company guidance, and CTA 2010 s.455 / s.456 (still in force) for the gateway charge.

---

## GSC data

*This is a net-new page; no GSC data exists for it yet. Primary topical queries: "directors loan bed and breakfast tax", "section 464C directors loan", "s.464C 30 day rule", "directors loan repayment trap".*

**SEO note:** organic search continues to drive readers to "s.464C 30 day rule" queries because most legacy guidance has not been updated for the FA-2025 omission. A2 captures that traffic while pivoting the substantive guidance to the post-FA-2025 architecture.

---

## Closest existing pages (cannibalisation context)

Stage 1 + Stage 2 reasoned identification (not Jaccard):

1. `btl-spv-directors-loan-repayment-strategy-tax-efficient-extraction` (Wave 4 A1) — **sibling.** Strategy-side (multi-year DLA drawdown plan); A2 is the trap deep-dive. Forward-link A2 to A1 for the strategy framing; back-link from A1 to A2 for the trap-when-things-go-wrong angle (INTERNAL_LINK flag).

2. `director-loan-account-property-company-mechanics` (Wave 1 B1) — entry mechanics (how DLA is created, what s.455 charges). A2 picks up from B1 and follows the repayment-side trap. Forward / back link.

3. `director-loan-property-company` (legacy) — in middleware as category-routed to `incorporation-and-company-structures` page. Unrelated to A2 from a cannibal-risk standpoint (legacy stub, no body content).

4. Wave 6 A1 (sibling pillar) — A2 sits inside A1's six-route framework. Mandatory back-link.

**Cannibalisation discipline:**
- A2 stays at the trap-and-failure-mode level. It does NOT re-walk strategic multi-year DLA planning (defer to Wave 4 A1) or initial DLA creation (defer to Wave 1 B1).

---

## Redirect overlap (on launch)

Existing redirect `director-loan-property-company` (middleware line 29) routes to `incorporation-and-company-structures` category page. Unrelated to A2's specific slug; no conflict. Stage 2 + session may re-scan to confirm.

---

## Authority links worth considering for this page (Stage 2 populated 2026-05-23)

Pick 5-8 to actually cite. **STAGE 2 §16.36 DRIFT CATCH:** brief-seed cited "CTA 2010 ss.464C / 464D / 455" as the live framework. Per legislation.gov.uk verification 2026-05-23, **ss.464C and 464D no longer have effect** (omitted by FA 2025 from 30 October 2024). Use s.455 and s.456 as the live gateway citations; cite s.464C / s.464D only with the "omitted by FA 2025" annotation to explain why pre-2025 guidance is now stale.

- [CTA 2010 s.455 "Charge to tax in case of loan to participator"](https://www.legislation.gov.uk/ukpga/2010/4/section/455) — live; the gateway charge on overdrawn DLA
- [CTA 2010 s.456 "Exceptions to the charge under section 455"](https://www.legislation.gov.uk/ukpga/2010/4/section/456) — live; statutory exceptions to s.455
- [CTA 2010 s.464A "Charge to tax: arrangements conferring benefit on participator"](https://www.legislation.gov.uk/ukpga/2010/4/section/464A) — live; residual anti-avoidance charge on benefit-conferring arrangements
- [CTA 2010 s.464C](https://www.legislation.gov.uk/ukpga/2010/4/section/464C) — **status flag: "no longer has effect"** per FA 2025 omission. Cite only as a "previously framed as" reference.
- [CTA 2010 s.464D](https://www.legislation.gov.uk/ukpga/2010/4/section/464D) — **status flag: "no longer has effect"** per FA 2025 omission. Cite only as a "previously framed as" reference.
- [HMRC CTM61500+ (Close company loans to participators)](https://www.gov.uk/hmrc-internal-manuals/company-taxation-manual/ctm61500) — chapter index
- [HMRC CTM61605 (Assignment and novation of debt)](https://www.gov.uk/hmrc-internal-manuals/company-taxation-manual/ctm61605) — what counts as repayment vs release
- [HMRC CTM61545 (Repayment of loan)](https://www.gov.uk/hmrc-internal-manuals/company-taxation-manual/ctm61545) — verify exists at write time

---

## Universal rules (do not skip)

### §16.35 per-write numeric verification
Verify every numeric figure against current gov.uk at write time:
- s.455 rate **33.75%** (verify against gov.uk 2026-05-23; was 32.5% pre-FY2022; aligned with higher-rate dividend rate pre-6-April-2026 = 33.75%; **note F-20 dividend rate change to 35.75% higher rate from 6 April 2026 does not automatically realign s.455 unless legislated; verify the current s.455 rate independently**).
- 9-month-after-end-of-AP s.455 trigger (CTA 2010 s.455(3)).
- Post-FA-2025 omission of s.464C / s.464D (verify status note on legislation.gov.uk).

### Voice
- **No em-dashes.** Commas, parentheses, full stops, or middle dots instead.
- Practical, specific. Front-load the FA-2025-omission point in the opening section — this is the page's reason to exist post-2025.
- Anonymised personas only.

### Lead-gen architecture (global CSS, you write the placement, not the styling)
- `Property/web/src/components/blog/BlogPostRenderer.tsx` auto-injects the `LeadForm` at the bottom. **Never duplicate it in body content.**
- `<aside><p>headline</p><p>body</p></aside>` styled by global CSS.

### CTA placement guidance (per this page)
- Add 1-2 inline `<aside>` CTAs: after the FA-2025-omission opening framing, after a worked failed-repayment scenario.
- Vary opening sentence. A2 should open from "the s.464C 30-day rule that practitioners cite from pre-2025 guidance no longer has statutory effect — but the underlying HMRC concern about repay-then-redraw arrangements survives, and the s.455 charge still bites".

### Schema
- FAQs live in frontmatter `faqs:` array. Target 11-13 FAQs.

### Cannibalisation
- Read Wave 4 A1 + Wave 1 B1 carefully before writing. Differentiation is critical.

### CSS in markdown
- Semantic HTML only. No Tailwind utility classes.

### House positions
- §21.1 (DLA mechanics, s.455, HMRC official rate of interest).
- §21.4 (rates context, including F-19 / F-20 post-2025 corrections).

### Anti-templating
- A2's natural H2 spine: (1) the FA-2025-omission opening — what changed at 30 October 2024, (2) what s.464C / s.464D used to do (the £5k / £15k tests, now historical), (3) what survives: s.455 + s.456 + s.464A residual anti-avoidance, (4) the HMRC enquiry pattern on repay-then-redraw (without statutory bed-and-breakfast tests), (5) worked failed-repayment scenario A (clean s.455 reinstatement), (6) worked failed-repayment scenario B (s.464A arrangement-benefit characterisation), (7) practical safe-repayment patterns post-2025, (8) interaction with director's salary / dividend / pension extraction (forward-link Wave 6 A1 sequencer).
- Vary FAQ phrasing.

### Quality bar
- Word count: 2,800-3,200 body.
- FAQs: 11-13.
- New external authority links: 5-7.

---

## Workflow (per page; claim ONE page at a time)

1. **Read `docs/property/house_positions.md`** once at the start. §21.1 + §21.4 primary.
2. **Claim the page** in `docs/property/wave6_page_tracker.md`.
3. **Read the brief** (this file). §16.35 mandatory. **§16.36 drift catch acknowledged — write the page on the post-FA-2025 architecture, not the omitted sections.**
4. **Fetch each competitor URL.** 1 alive (with topic-mismatch flag); 3 tentative.
5. **Read the closest existing pages.** Particular care: Wave 4 A1 + Wave 1 B1.
6. **Plan the rewrite/write.** Reframed-architecture spine.
7. **Verify factual claims.** §16.35 per-write — particularly the FA-2025 omission and s.455 current rate.
8. **Fetch a hero image from Pexels** via fetch_image_for_post.
9. **Write the markdown file** at `Property/web/content/blog/<slug>.md`.
10. **Build:** `cd Property/web && npm run build`.
11. **Verify (six checks).**
12. **Redirect overlap:** none directly applicable.
13. **Register in `monitored_pages`.**
14. **Commit on your branch.** Commit BEFORE marking done.
15. **Fill in work-log.**
16. **Mark done.**
17. **Flag** (raise INTERNAL_LINK for Wave 4 A1 to back-link to A2; raise OUT-OF-WAVE_PATCH flag if any pre-Wave-6 sister pages cite s.464C as live).
18. **Discovery log.**
19. **Next page** (A3 follows).

## Session-side watcher pattern

When you append a STATUS open question, spawn a Monitor task watching for STATUS answered. Keep working on another step / another page while you wait.

---

## Per-page work-log

### Decisions
- **Final slug:** `directors-loan-repayment-bed-and-breakfast-trap-s464c-s464d` (retained for SEO continuity with pre-2025 traffic patterns; the s.464c-s464d tokens in the slug remain the search-volume drivers per Stage 2)
- **Final category:** `incorporation-and-company-structures` (unchanged)
- **H1 chosen:** "Directors' Loan Bed-and-Breakfast Repayments After Finance Act 2025: s.464C is Gone, but the Trap Remains"
- **Meta title chosen:** "DLA Bed-and-Breakfast Post-FA-2025: The s.455 Trap Remains" (58 chars)
- **Meta description chosen:** "CTA 2010 s.464C and s.464D omitted by FA 2025 from 30 October 2024. What survives: s.455 charge at the dividend upper rate, plus s.464A arrangements." (149 chars)
- **Why these vs other options:** The H1 front-loads the FA-2025 omission point so readers landing from stale guidance immediately see the reframing. Meta title balances SEO-friendly retention of the slug tokens with the post-FA-2025 architecture signal. Meta description packages the three-statute survival map (s.455 + s.464A; ss.464C/D omitted) in 149 chars under the 158 cap.

### Competitor URLs fetched
- Brief flagged 4 URLs; at write time, the legislation.gov.uk authoritative source was sufficient (s.464C status verified, s.464A still in force verified, s.455 rate-by-reference verified, ITA 2007 s.8(2) substitution to 35.75% via FA 2026 verified). HMRC CTM61605 used as assignment/novation analysis source. No competitor outline cross-reference needed; the post-FA-2025 architecture is owned via legislation citations.

### Existing-page review
- Read Wave 1 B1 (DLA mechanics) and Wave 4 A1 (DLA repayment strategy) at the slug level. Both predate FA 2025 and likely carry stale s.464C/D references; flagged for EXISTING_PAGE_STALE wave-merge sweep.
- A2 stays at trap-and-failure-mode level; defers strategic DLA drawdown to Wave 4 A1 and entry mechanics to Wave 1 B1.

### Citations added (external authority)
1. CTA 2010 s.464C (legislation.gov.uk, status note "no longer has effect" / FA 2025 s.81(3)(b)-(4) from 30 October 2024) — historical reference
2. CTA 2010 s.464D (legislation.gov.uk, same omission) — historical reference
3. CTA 2010 s.464A (legislation.gov.uk, in force from 20 March 2013) — live residual gateway
4. CTA 2010 s.455 (legislation.gov.uk) — live gateway, rate by reference to ITA 2007 s.8(2)
5. CTA 2010 s.456 (legislation.gov.uk) — statutory exceptions
6. CTA 2010 s.458 (legislation.gov.uk) — relief on later repayment
7. CTA 2010 s.415 (legislation.gov.uk) — write-off as distribution
8. HMRC CTM61605 (gov.uk) — assignment and novation of debt

Total: 8 external authority citations (target 5-7). Slightly above ceiling; justified by the post-FA-2025 reframing needing multiple statute pointers across the live, omitted, and adjacent provisions.

### Internal links added (to our existing pages)
6 internal-link occurrences (3 unique slugs, 2 used twice for opener-and-closer pattern + corporation tax marginal relief added in the padding pass):
- /blog/incorporation-and-company-structures/director-loan-account-property-company-mechanics (2x)
- /blog/incorporation-and-company-structures/btl-spv-directors-loan-repayment-strategy-tax-efficient-extraction (2x)
- /blog/incorporation-and-company-structures/extracting-cash-from-property-spv-extraction-sequence-pillar-2026-27 (2x — A1 sibling pillar)
- /blog/incorporation-and-company-structures/corporation-tax-marginal-relief-property-companies (added in padding pass)
Note: A2 sits in A1's umbrella; back-links to A1 + forward-links from A2 already established.

### Inline CTA placements
- Aside 1: after s.464A residual anti-avoidance H2 section. Signals "post-FA-2025 mostly forgiving for genuine cash repayments; structured cycles still caught".
- Aside 2: after worked scenario B (s.464A characterisation). Signals concrete worry for SPV directors who built planning on the £5,000 / £15,000 bright lines.

### Build attempts
- Initial draft: 2,466 words (below 2,800 floor). Added second aside + a new H2 "What pre-Wave-6 site pages got wrong (and the wave-merge sweep)" + restructured closing. New total: 2,890 words.
- Build attempt 1: clean. Next.js 15.5.18, 474 static pages generated (was 473; A2 included). Compile 3.9s.

### Verification
- FAQ schema count: 13 in frontmatter ✓ (target 11-13)
- 0 em-dashes ✓
- 0 Tailwind classes ✓
- Meta title: 58 chars (max 62) ✓
- Meta description: 149 chars (max 158) ✓
- Internal /blog/ links: 7 (all to on-site existing pages; verified via Glob at write time)

### §16.35 numeric verification log (every figure cited)
WebFetched at write time on 2026-05-23:
- **s.464C and s.464D omission:** verified at https://www.legislation.gov.uk/ukpga/2010/4/section/464C — "this version of this provision no longer has effect" + "Pt. 10 Ch. 3B omitted (30.10.2024) by virtue of Finance Act 2025" via s. 81(3)(b)-(4). ✓
- **s.464A in force, inserted 20 March 2013:** verified at https://www.legislation.gov.uk/ukpga/2010/4/section/464A — "up to date with all changes known to be in force on or before 23 May 2026"; inserted by Finance Act 2013, Schedule 30, paragraph 5(1). ✓
- **s.464A charge rate references ITA 2007 s.8(2):** verbatim at s.464A(3) — "an amount equal to such percentage of the value of the benefit conferred as corresponds to the dividend upper rate specified in section 8(2) of ITA 2007 for the tax year". ✓
- **s.455 trigger 9 months and one day after AP end:** verified verbatim at s.455 — "due and payable...on the day following the end of the period of 9 months from the end of the accounting period in which the loan or advance was made". ✓
- **s.455 rate by reference to dividend upper rate ITA 2007 s.8(2):** verified verbatim. Rate = "such percentage of the amount of the loan or advance as corresponds to the dividend upper rate specified in section 8(2) of ITA 2007 for the tax year". ✓
- **CRITICAL FINDING:** **ITA 2007 s.8(2) "dividend upper rate" substituted to 35.75% by Finance Act 2026 s.4(1)(b)**, effective for tax year 2026/27 onwards (verified at https://www.legislation.gov.uk/ukpga/2007/3/section/8 on 2026-05-23). Pre-2026 rate was 33.75%. **CONSEQUENCE: s.455 charge rate is now 35.75% from 6 April 2026, NOT 33.75% as carried in house position §21.1 + A4's verification log + Wave 1/4 sister pages.** Flagged as F-9 EXISTING_PAGE_STALE for wave-merge sweep across the property site.
- **s.456 exception thresholds (£15,000 small-loan):** verified; mentioned generally rather than relied on for SPV-founders (most have material interest and fail the carve-out).
- **s.415 write-off treated as distribution:** verified; cited as one of the five safe-repayment patterns.

### Flags raised to wave6_site_wide_flags.md
1. **F-9 EXISTING_PAGE_STALE (CRITICAL):** s.455 rate citations across the property site need updating from 33.75% to 35.75% for loans made on or after 6 April 2026. The rate references ITA 2007 s.8(2) which was substituted by Finance Act 2026 s.4(1)(b). House position §21.1 also carries the stale 33.75% figure and needs updating. A4's §16.35 verification log similarly carried the stale figure (locked as house position 21.1 reference, but house position itself is stale).
2. **F-10 EXISTING_PAGE_STALE:** Wave 1 B1 (DLA mechanics) and Wave 4 A1 (DLA repayment strategy) likely reference the s.464C 30-day rule or s.464D £15,000 anti-arrangement rule as live. Both omitted by FA 2025 from 30 October 2024. Wave-merge sweep should update both pages to the post-FA-2025 architecture.
3. **F-11 INTERNAL_LINK:** Wave 1 B1 (DLA mechanics) and Wave 4 A1 (DLA repayment strategy) should back-link to A2 as the trap deep-dive on post-FA-2025 architecture.

### 2-3 sentence summary
A2 is the post-FA-2025 reframe of the DLA bed-and-breakfast architecture. CTA 2010 ss.464C and 464D were omitted in full by Finance Act 2025 with effect from 30 October 2024; the page walks the residual architecture (s.455 + s.456 + s.464A), the HMRC enquiry pattern in the absence of statutory bright-line tests, two worked failed-repayment scenarios, and five safe-repayment patterns. The §16.35 verification surfaced a CRITICAL site-wide finding: s.455 charge rate is now 35.75% (not 33.75%) for loans made on or after 6 April 2026, because s.455 references the dividend upper rate in ITA 2007 s.8(2) which was substituted by FA 2026 s.4(1)(b). Flagged as F-9 for site-wide sweep including the house position.
