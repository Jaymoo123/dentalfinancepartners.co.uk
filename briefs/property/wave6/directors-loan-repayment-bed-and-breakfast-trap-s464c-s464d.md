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

## Per-page work-log (fill in as you go, supports resumability if interrupted)

### Decisions
- **Final slug:**
- **Final category:**
- **H1 chosen:**
- **Meta title chosen:**
- **Meta description chosen:**
- **Why these vs other options:**

### Competitor URLs fetched

### Existing-page review (from "Closest existing pages")

### Citations added (external authority)

### Internal links added (to our existing pages)

### Inline CTA placements

### Build attempts

### Verification

### §16.35 numeric verification log (every figure cited)

### Flags raised to wave6_site_wide_flags.md

### 2-3 sentence summary
