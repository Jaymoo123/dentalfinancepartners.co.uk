# Wave 7 brief: sdlt-group-relief-schedule-7-fa-2003-claw-back-connected-party-recovery-depth

**Site:** property
**Bucket:** C (Specialist transactional + trust depth)
**Session:** TBD (manager-assigned at Stage 3 dispatch)
**Brief type:** Net-new page (no existing markdown file)
**Source markdown path on launch:** `Property/web/content/blog/sdlt-group-relief-schedule-7-fa-2003-claw-back-connected-party-recovery-depth.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/incorporation-and-company-structures/sdlt-group-relief-schedule-7-fa-2003-claw-back-connected-party-recovery-depth

---

## Manager pre-decisions

- **Suggested slug:** `sdlt-group-relief-schedule-7-fa-2003-claw-back-connected-party-recovery-depth`
- **Suggested category:** `incorporation-and-company-structures`
- **Bucket:** C (Specialist transactional + trust depth)
- **HP-lock anchor:** §1.G (SDLT group relief Sch 7 paras 1-5 — verbatim mini-lock added 2026-05-24 commit `6cbb0ed`)
- **Framing differentiator (~50 words, Stage 1a-locked, REPLACED original C6 SDLT cladding pick at Stage 1b after HP-lock drift catch #13 identified FA 2003 s.58C is zero-carbon-homes relief, not cladding):**

> FA 2003 Sch 7 paras 1-5 group relief: para 1 75% three-limb test (75% direct + indirect ordinary-share-capital ownership AND 75% beneficial entitlement to distributable profits AND 75% beneficial entitlement to assets on winding-up); para 2 arrangements anti-avoidance (relief denied if arrangements for transferee to leave group); **para 3 3-year claw-back from effective date** (transferee leaves group while still owning property → claw-back); para 5 connected-party recovery (vendor / parent / **controlling director personal liability**). Three mitigation routes: SPA defensive covenant pack, retention of beneficial ownership, in-group restructure timing. SDLTM23000+ HMRC manual. Interaction with s.75A general anti-avoidance (statute-authorised relief but s.75A overrides if scheme abusive). NOT re-writing the headline "what is group relief" (existing site page covers).

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

**Stage 1 manager note:** C6 was REPLACED at Stage 1b — original SDLT cladding-relief pick was based on a non-existent statutory provision (FA 2003 s.58C is "Relief for new zero-carbon homes", not cladding remediation). Manager verified 2026-05-24 PM; user replaced with this group-relief depth pick. §1.G mini-lock added at commit `6cbb0ed`. This brief differentiates on **claw-back + recovery + SPA defensive pack depth** versus the existing site page `sdlt-group-relief-for-corporate-landlord-portfolios` (0.17 cannibal — covers what group relief is at broader level).

**HOUSE_POSITION_CONFLICT signal context:** §1.G is the primary verbatim mini-lock. Para 3 claw-back runs from **effective date** (not date of claim, not date of return) — this is the operationally critical anchor point. Para 5 recovery extends to **controlling director personal liability** — surface as silent risk. Carve-outs at para 3(2) are narrow (insolvency / court order) and must not be over-stated.

---

## Competitor URLs (Stage 2 fetch + extract)

**Fetch + read + extract instruction:** For each URL below, fetch with httpx (follow_redirects=True, timeout=30, User-Agent "Mozilla/5.0"), parse with BeautifulSoup (lxml). Extract H2/H3 outline, treatment of 75% three-limb test, treatment of para 3 3-year claw-back, treatment of para 5 connected-party recovery, treatment of SPA defensive pack.

- https://www.ukpropertyaccountants.co.uk/sdlt-group-relief-claw-back-mechanics/
- https://www.uklandlordtax.co.uk/sdlt-group-relief-3-year-claw-back/
- https://www.shipleys.com/insights/sdlt-group-relief-anti-avoidance/
- https://www.haines-watts.com/insight/sdlt-group-relief-corporate-restructuring/

**Borrowable patterns:** TBD at Stage 2 write time. Our differentiator: explicit 75% three-limb test verbatim (all three limbs required, most competitors paraphrase as 75% generic); explicit para 3 claw-back-from-effective-date anchor; explicit para 5 controlling-director personal liability surface; explicit SPA covenant defensive-pack practical template (most competitor pieces stop at "claw-back risk" without going to operational mitigation).

---

## GSC data

*This is a net-new page; no GSC data exists for it yet. Primary topical queries: "SDLT group relief claw-back", "Sch 7 group relief 3 year", "para 3 group relief leaving group", "SDLT group relief connected party recovery".*

---

## Closest existing pages

- `sdlt-group-relief-for-corporate-landlord-portfolios` (0.17 cannibal — existing site page; C6 differentiates on **claw-back + recovery + SPA defensive pack depth** which the existing page does not reach).
- `how-to-transfer-property-into-limited-company-uk` (0.18 cannibal — incorporation focus; cross-link for "group restructuring after initial incorporation").
- `sdlt-sub-sale-relief-mechanics` (0.16 cannibal — adjacent SDLT mechanic; clean separation).
- `section-162-incorporation-relief-property-landlords` (0.16 cannibal — incorporation relief; cross-link).
- C5 (Wave 7 linked transactions) — cross-link for connected-persons CTA 2010 s.1122 context.
- C9 (Wave 7 partnership SDLT relief) — cross-link for corporate restructuring scenarios.

**Cannibalisation discipline:**
- C6 is the **claw-back + recovery + defensive pack** depth piece. The existing site `sdlt-group-relief-for-corporate-landlord-portfolios` page is the headline page. Cross-link both directions; do not re-walk headline-rule territory.
- C6 must not stray into FA 2003 s.75A general anti-avoidance Ramsay territory (SDLTM09050+) — group relief is a statute-authorised relief but s.75A can override if scheme abusive; surface the interaction but do not write the s.75A page in this brief.

---

## Redirect overlap (on launch)

Stage 1 scan: no old-slug redirect overlap. No middleware edit required at launch. Confirm the existing `sdlt-group-relief-for-corporate-landlord-portfolios` page is left in place (do NOT redirect it to C6; they are complementary).

---

## Authority links worth considering (Stage 2 populated, session selects 5-8)

**Statutory:**
- FA 2003 Sch 7 paras 1-5 verbatim (group relief + anti-avoidance + claw-back + recovery): https://www.legislation.gov.uk/ukpga/2003/14/schedule/7
- CTA 2010 s.1119 (ordinary share capital definition — preference shares excluded for 75% test): https://www.legislation.gov.uk/ukpga/2010/4/section/1119
- CTA 2010 ss.1155-1157 (indirect-ownership calculation through intermediaries): https://www.legislation.gov.uk/ukpga/2010/4/section/1155
- FA 2003 s.75A (general anti-avoidance — interaction with statute-authorised reliefs): https://www.legislation.gov.uk/ukpga/2003/14/section/75A
- FA 2003 Sch 11A (overpayment claim time limits — 12-month return-window): https://www.legislation.gov.uk/ukpga/2003/14/schedule/11A

**HMRC manuals:**
- SDLTM23000+ (group relief HMRC manual): https://www.gov.uk/hmrc-internal-manuals/stamp-duty-land-tax-manual/sdltm23000
- SDLTM23070 (claw-back operational tariff): https://www.gov.uk/hmrc-internal-manuals/stamp-duty-land-tax-manual/sdltm23070
- SDLTM23090 (connected-party recovery): https://www.gov.uk/hmrc-internal-manuals/stamp-duty-land-tax-manual/sdltm23090
- SDLTM09050+ (s.75A general anti-avoidance — for interaction context only): https://www.gov.uk/hmrc-internal-manuals/stamp-duty-land-tax-manual/sdltm09050

**Cross-references in house_positions.md:** §1.G (primary verbatim mini-lock — added 2026-05-24); §1 (main SDLT bands for the relief-value context); §1.A (Sch 15 partnership relief — adjacent corporate restructure context).

---

## Universal rules (do not skip)

**§16.35 per-write verification (mandatory):** Verify 75% test verbatim against Sch 7 para 1(3) — all three limbs required. Verify para 3 claw-back runs from **effective date** (Sch 7 para 3(1)). Verify para 5 recovery wording. Verify SDLTM23000+ is correct primary manual reference.

### Voice
- **No em-dashes.** Commas, parentheses, full stops, or middle dots instead.
- Practical, specific. Exact figures, named legislation. Anonymised personas only.

### Lead-gen architecture
- LeadForm auto-injected at footer. Never duplicate in body.
- `<aside>` styled by global CSS. You add no classes, just `<aside><p>headline</p><p>body</p></aside>`.

### CTA placement guidance (per this page)
- 2-3 inline `<aside>` CTAs. Conversion moments:
  - After the 75% three-limb test walkthrough (high-intent: "do we satisfy the test?")
  - After the para 3 claw-back risk section (high-intent: "we are within the 3-year window; mitigation?")
  - After the SPA defensive-pack template (high-value: practical handover moment)
- Avoid: opening with an aside; aside inside a worked example; >3 total.

### Schema
- FAQs in frontmatter `faqs:` array (10-14). Template auto-emits FAQPage JSON-LD.

### Cannibalisation
- C6 is the claw-back + recovery + defensive-pack depth piece. Read existing `sdlt-group-relief-for-corporate-landlord-portfolios` page before writing. Forward-link, don't duplicate.

### House positions
- **§1.G is your primary working detail (verbatim mini-lock).** §1.G internal do-not-write items: claw-back is from effective date (not date of return); recovery is statutory not discretionary; controlling-director personal liability is real (not theoretical).
- **CRITICAL drift to avoid:** Do NOT cite FA 2003 s.58C as cladding relief (it's zero-carbon-homes relief — HP-lock drift catch #13). Do NOT over-state the para 3(2) narrow carve-outs (insolvency / court order). Do NOT paraphrase 75% test as single-limb (three limbs all required).

### Quality bar
- Word count: 2,800-3,500 body.
- FAQs: 12-14.
- New external authority links: 6-8.
- Build clean: `cd Property/web && npm run build`.
- FAQ schema count matches frontmatter; zero em-dashes; zero Tailwind classes; meta title ≤62 chars; meta description ≤158 chars.

### Anti-templating
- Vary H2 structure per page. Vary opening 2-3 sentences. Vary FAQ phrasing.
- Open with the operational risk (your relief can be clawed back for 3 years — here is what triggers it and how to defend against it), not with "What is group relief".

---

## Workflow (per page; claim ONE page at a time, verbatim 19 steps)

1. Read `docs/property/house_positions.md` once at session start; §1 + §1.A-§1.F + §1.G is your primary working detail for Bucket C Wave 7 SDLT cluster.
2. Claim the page in `docs/property/wave7_page_tracker.md`, change Status from todo to in_progress, add today UTC timestamp.
3. Read the brief (this file).
4. Fetch each competitor URL using httpx with follow_redirects True, timeout 30, User-Agent Mozilla/5.0, then BeautifulSoup with lxml.
5. Read the closest existing pages on our site (especially the existing group-relief page — confirm C6 differentiation).
6. Plan the write before touching markdown.
7. Verify factual claims against HMRC manuals / legislation.gov.uk / gov.uk. **Per §16.35: verify 75% three-limb test + para 3 claw-back from effective date + para 5 recovery scope at write time.**
8. Fetch a hero image from Pexels via fetch_image_for_post.
9. Write the markdown file at `Property/web/content/blog/<slug>.md` with full frontmatter.
10. Build: `cd Property/web && npm run build`. Must pass clean.
11. Verify (all six checks must pass): FAQ schema count match, 0 em-dashes, 0 Tailwind classes, meta title max 62 chars, meta description max 158 chars, internal links resolve.
12. Apply redirect repointing in `middleware.ts` if brief lists overlap. (None for this brief.)
13. Register the new page in `monitored_pages` via the Supabase _db helper.
14. Commit on your branch. Per-page commit. **CRITICAL: commit BEFORE marking done in tracker.** Do NOT include the tracker in your branch commit.
15. Fill in the per-page work-log at the bottom of this brief.
16. Mark done in `docs/property/wave7_page_tracker.md` with a 1-line Notes summary.
17. Append any site-wide flags to `docs/property/wave7_site_wide_flags.md`.
18. Log discoveries to `docs/property/wave7_discovery_log_session_<X>.md`.
19. Next page.

## Session-side watcher pattern

When you append a STATUS open question to your Q&A file, spawn a Monitor task on that file watching for the STATUS answered flip. Keep working on another step / another page while you wait.

---

## Per-page work-log (fill in as you go, supports resumability if interrupted)

### Decisions
- **Final slug / category:**
- **H1 chosen:**
- **Meta title chosen:** (max 62 chars)
- **Meta description chosen:** (max 158 chars)
- **Why these vs other options:**

### Competitor URLs fetched

### Existing-page review (from "Closest existing pages")

### Citations added (external authority)

### Internal links added (to our existing pages)

### Inline CTA placements

### Build attempts

### Verification
- em-dash count:
- Tailwind utility classes in markdown:
- metaTitle length:
- metaDescription length:
- FAQ count:
- Internal links resolve:
- Body word count:

### Flags raised to wave7_site_wide_flags.md

### 2-3 sentence summary
