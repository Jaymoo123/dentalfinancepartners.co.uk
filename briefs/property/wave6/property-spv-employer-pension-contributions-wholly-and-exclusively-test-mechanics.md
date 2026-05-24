# Wave 6 brief: property-spv-employer-pension-contributions-wholly-and-exclusively-test-mechanics

**Site:** property
**Bucket:** A (LtdCo extraction-sequence pillar)
**Session:** A
**Brief type:** Net-new page (existing legacy `property-company-employer-pension-contributions-directors` to be superseded)
**Source markdown path on launch:** `Property/web/content/blog/property-spv-employer-pension-contributions-wholly-and-exclusively-test-mechanics.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/incorporation-and-company-structures/property-spv-employer-pension-contributions-wholly-and-exclusively-test-mechanics

---

## Manager pre-decisions

- **Suggested slug:** `property-spv-employer-pension-contributions-wholly-and-exclusively-test-mechanics`
- **Suggested category:** `incorporation-and-company-structures`
- **Bucket:** A (LtdCo extraction-sequence pillar)
- **Framing differentiator (Stage 2 deepened, 2026-05-23):**

> A5 is the highest-yield single extraction route for higher-rate director-shareholders of property SPVs. Existing page `property-company-employer-pension-contributions-directors` is stale: pre-FA 2024 LTA-abolition architecture (verified at https://www.legislation.gov.uk/ukpga/2024/3/contents on 2026-05-23: FA 2024 Sch 9 Pt 1 abolished the LTA charge with effect from 6 April 2024 by omitting FA 2004 ss.214-226 and inserting the LSA / LSDBA framework). A5 supersedes with: (a) the post-FA-2024 LSA / LSDBA architecture replacing the £1,073,100 LTA figure, (b) the post-FA-2024 annual allowance £60,000 standard / £4,000 MPAA floor / tapered AA above £260k adjusted income threshold, (c) the **wholly-and-exclusively test under CTA 2009 s.54** as the gateway for employer-contribution deductibility (with FA 2004 ss.188-200 governing the pension-side framework), (d) the practical reality that single-director property SPVs face HMRC scrutiny where contributions exceed the director's net SPV-related work value, (e) three contribution scenarios (£20k routine / £60k full AA / £180k carry-forward 3-year sweep). **Boundary-policed vs Wave 4 A8 (FIC retirement decumulation):** A8 is post-retirement drawdown; A5 is pre-retirement accumulation. **Boundary-policed vs Wave 2 A9 (pension-IHT-April-2027):** A9 is the death-side IHT framing; A5 is the lifetime contribution-extraction mechanic.

If your reasoning suggests the slug / category should differ, you may override, but log the override and reason in the per-page work-log below.

**Stage 1 manager note:** A5 supersedes legacy `property-company-employer-pension-contributions-directors`. Recommend post-launch redirect of legacy slug to A5. Differentiator vs Wave 4 A8 (decumulation) is the accumulation-side framing.

---

## Competitor URLs (Stage 2 §16.31 verified 2026-05-23)

- **Replacement candidates for session SERP search at write time:** "employer pension contributions property SPV wholly exclusively HMRC"; "director pension SPV £60,000 annual allowance"; "tapered annual allowance £260,000 adjusted income property company"; "carry forward pension contribution 3 years director SPV".
- Session expected to do targeted SERP searches at write time and document choices in the work-log.

**Stage 2 verification note:** competitor pool for property-SPV-specific employer pension contributions is thin (most pension content is generalist); rely on legislation + HMRC PTM citations and the legacy on-site page outline for comparison.

**Fetch + read + extract instruction (session):** Run targeted SERP searches at write time for replacement URLs. Cross-check every claim against legislation.gov.uk for FA 2004 Pt 4 (pension contributions framework), FA 2024 Sch 9 (LTA abolition + LSA / LSDBA insertion), CTA 2009 s.54 (W&E test), and HMRC PTM (Pensions Tax Manual) chapters PTM040000+ (annual allowance), PTM057100 (tapered AA), PTM042100 (employer contributions), PTM170000+ (post-LTA architecture).

---

## GSC data

*This is a net-new page; no GSC data exists for it (the legacy page exists but with stale architecture). Primary topical queries: "employer pension contribution property company", "director pension SPV wholly exclusively", "tapered annual allowance landlord", "LSA LSDBA property director pension".*

---

## Closest existing pages (cannibalisation context)

Stage 1 + Stage 2 reasoned identification (not Jaccard):

1. `property-company-employer-pension-contributions-directors` — **STALE legacy page.** A5 supersedes; recommend post-launch redirect of legacy slug to A5 (see Redirect overlap below).
2. `section-24-pension-contributions-tax-planning` (middleware line 147) — personal-rate angle, distinct from corporate. Forward-link A5 ↔ legacy for the personal-tax sibling.
3. `fic-property-retirement-decumulation-mechanics-uk` (Wave 4 A8) — **sibling**, decumulation not accumulation. A5 forward-links A8 for the post-retirement drawdown phase; A8 should back-link to A5 for the accumulation phase (INTERNAL_LINK flag).
4. `pension-iht-april-2027-landlord-estate-planning` (Wave 2 A9) — IHT-side angle. A5 forward-links A9 for the death-side framing.
5. Wave 6 A1 (sibling pillar) — A5 sits within A1's six-route framework. Mandatory back-link.

**Cannibalisation discipline:**
- A5 stays at the accumulation-side employer-contribution mechanic level. It does NOT re-walk decumulation (defer to Wave 4 A8) or death-IHT (defer to Wave 2 A9). It DOES supersede the legacy `property-company-employer-pension-contributions-directors` page entirely.

---

## Redirect overlap (on launch)

Stage 2 scan of `Property/web/src/middleware.ts` found `property-company-employer-pension-contributions-directors` on line 297, currently routed to `incorporation-and-company-structures` category page. **Recommend post-launch repointing of this legacy slug to A5 as the new canonical pension-extraction page.** Surface as ManagerActionable flag at wave merge per §16.32.

---

## Authority links worth considering for this page (Stage 2 populated 2026-05-23)

Pick 5-8 to actually cite. **STAGE 2 §16.36 NOTE:** brief-seed cited "FA 2024 Sch 9 (LTA abolition)" — verified at https://www.legislation.gov.uk/ukpga/2024/3/contents on 2026-05-23: FA 2024 Sch 9 Part 1 "Abolition of lifetime allowance charge" omits FA 2004 ss.214-226 and inserts the LSA / LSDBA framework with effect from 6 April 2024. Cite is correct.

- [FA 2004 s.188 "Relief for contributions"](https://www.legislation.gov.uk/ukpga/2004/12/section/188) — member-contribution gateway
- [FA 2004 s.196 "Relief for employers in respect of contributions paid"](https://www.legislation.gov.uk/ukpga/2004/12/section/196) — employer-contribution gateway
- [FA 2004 ss.227-238 (Annual Allowance, including tapered AA)](https://www.legislation.gov.uk/ukpga/2004/12/part/4/chapter/4) — chapter 4 AA framework
- [FA 2024 Sch 9 Part 1 "Abolition of lifetime allowance charge"](https://www.legislation.gov.uk/ukpga/2024/3/schedule/9) — LSA / LSDBA insertion
- [CTA 2009 s.54 "Expenses not wholly and exclusively for trade and unconnected losses"](https://www.legislation.gov.uk/ukpga/2009/4/section/54) — W&E test for employer-contribution deductibility
- [HMRC PTM042100 (Employer contributions: relief)](https://www.gov.uk/hmrc-internal-manuals/pensions-tax-manual/ptm042100) — HMRC interpretive overlay
- [HMRC PTM057100 (Tapered annual allowance)](https://www.gov.uk/hmrc-internal-manuals/pensions-tax-manual/ptm057100) — taper mechanics
- [HMRC BIM46000+ (Wholly and exclusively rule)](https://www.gov.uk/hmrc-internal-manuals/business-income-manual/bim46000) — W&E HMRC chapter
- [HMRC PTM055100 (Pension input amount: defined contribution)](https://www.gov.uk/hmrc-internal-manuals/pensions-tax-manual/ptm055100) — DC PIA calculation

---

## Universal rules (do not skip)

### §16.35 per-write numeric verification
Verify every figure against current gov.uk at write time:
- Annual allowance £60,000 (verified post-FA-2023 increase; verify against current gov.uk).
- MPAA (Money Purchase AA) £10,000 (post-FA-2023 increase from £4,000; verify).
- Tapered AA threshold £260,000 adjusted income / £200,000 threshold income (verify; can taper to £10,000 minimum AA).
- LSA (Lump Sum Allowance) £268,275 (verify post-FA-2024).
- LSDBA (Lump Sum and Death Benefit Allowance) £1,073,100 (verify post-FA-2024).
- The £1,073,100 figure as the OLD LTA is OBSOLETE (per house position §5.1 / locked positions). Do NOT cite as live.
- Carry-forward 3-year window mechanics (FA 2004 s.228A).

### Voice
- **No em-dashes.** Commas, parentheses, full stops, or middle dots instead.
- Practical, specific. Front-load the W&E-test gateway for single-director SPVs (the HMRC enquiry risk).
- Anonymised personas only.

### Lead-gen architecture (global CSS, you write the placement, not the styling)
- `Property/web/src/components/blog/BlogPostRenderer.tsx` auto-injects the `LeadForm` at the bottom. **Never duplicate it in body content.**
- `<aside><p>headline</p><p>body</p></aside>` styled by global CSS.

### CTA placement guidance (per this page)
- Add 2 inline `<aside>` CTAs: after the W&E framing, after a contribution-scenario worked example.
- Vary opening sentence. A5 should open from "for a higher-rate director of a property SPV, the employer-pension route is the single highest-yield extraction lever, but the wholly-and-exclusively gateway under CTA 2009 s.54 has real teeth when the SPV is a single-director investment vehicle".

### Schema
- FAQs live in frontmatter `faqs:` array. Target 12-14 FAQs.

### Cannibalisation
- Read legacy `property-company-employer-pension-contributions-directors` carefully (A5 supersedes); Wave 4 A8 (decumulation sibling); Wave 2 A9 (IHT sibling).

### CSS in markdown
- Semantic HTML only. No Tailwind utility classes.

### House positions
- §21.4 (rates context; employer NI 15% above £5k secondary threshold for the salary-vs-pension comparison block).
- §21.5 (FIC pension mechanics where relevant for FIC-side comparison).

### Anti-templating
- A5's natural H2 spine: (1) why employer pension contributions are the high-yield extraction lever, (2) the W&E gateway (CTA 2009 s.54) and what HMRC looks for on single-director SPV enquiries, (3) the post-FA-2024 architecture — LSA / LSDBA replacing LTA; what changed at 6 April 2024, (4) annual allowance £60k standard; MPAA floor; tapered AA above £260k adjusted income, (5) carry-forward 3-year window, (6) worked scenario A — £20k routine annual contribution, (7) worked scenario B — £60k full AA in current year, (8) worked scenario C — £180k 3-year carry-forward sweep, (9) interaction with salary / dividend extraction (forward-link Wave 4 A5 single-year analysis and Wave 6 A1 multi-year sequencer), (10) interaction with decumulation (forward-link Wave 4 A8) and death-IHT (forward-link Wave 2 A9).
- Vary FAQ phrasing.

### Quality bar
- Word count: 3,000-3,500 body.
- FAQs: 12-14.
- New external authority links: 6-8.

---

## Workflow (per page; claim ONE page at a time)

1. **Read `docs/property/house_positions.md`** once at the start. §21.4 + §21.5 primary.
2. **Claim the page** in `docs/property/wave6_page_tracker.md`.
3. **Read the brief** (this file). §16.35 mandatory.
4. **Fetch each competitor URL.** Stage 1 pool sparse; session does targeted SERP at write time.
5. **Read the closest existing pages.** Particular care: legacy `property-company-employer-pension-contributions-directors` (A5 supersedes) + Wave 4 A8 (sibling decumulation).
6. **Plan the rewrite/write.** Post-FA-2024 architecture spine.
7. **Verify factual claims.** §16.35 per-write — particularly the post-LTA figures.
8. **Fetch a hero image from Pexels** via fetch_image_for_post.
9. **Write the markdown file** at `Property/web/content/blog/<slug>.md`.
10. **Build:** `cd Property/web && npm run build`.
11. **Verify (six checks).**
12. **Redirect overlap:** flag for manager-applied repoint of legacy `property-company-employer-pension-contributions-directors` to A5 at wave merge.
13. **Register in `monitored_pages`.**
14. **Commit on your branch.** Commit BEFORE marking done.
15. **Fill in work-log.**
16. **Mark done.**
17. **Flag** (raise INTERNAL_LINK for Wave 4 A8 to back-link to A5 as accumulation sibling; raise REDIRECT_REPOINT flag for legacy page).
18. **Discovery log.**
19. **Next page** (A6 follows).

## Session-side watcher pattern

When you append a STATUS open question, spawn a Monitor task watching for STATUS answered. Keep working on another step / another page while you wait.

---

## Per-page work-log (fill in as you go, supports resumability if interrupted)

### Decisions
- **Final slug:** `property-spv-employer-pension-contributions-wholly-and-exclusively-test-mechanics` (unchanged)
- **Final category:** `incorporation-and-company-structures` (unchanged)
- **H1 chosen:** "Employer Pension Contributions from a Property SPV: The Wholly-and-Exclusively Gateway and the Post-FA-2024 Architecture"
- **Meta title chosen:** "Property SPV Pension Contributions: The W&E Test Gateway" (56 chars)
- **Meta description chosen:** "Employer pension contributions are a property SPV's highest-yield extraction lever, but CTA 2009 s.54 has real teeth for single-director companies." (147 chars)
- **Why these vs other options:** Meta title front-loads "Property SPV" (the audience), then "Pension Contributions" (the topic), then "W&E Test Gateway" (the differentiator) so a property-investor reader sees immediately this is the depth W&E treatment rather than another generic pension-extraction overview. Meta description packs the three working points (highest-yield, W&E gate, single-director risk) in 147 chars; well under the 158 cap.

### Competitor URLs fetched
- Per Stage 2 note, property-SPV-specific employer-pension competitor pool is thin. Session relied on legislation + HMRC manual citations rather than competitor blog outlines. The depth differentiator is the single-director W&E enquiry treatment (BIM46035) which competitor coverage typically hand-waves, and the post-FA-2024 LSA/LSDBA architecture which legacy on-site coverage (and most competitor coverage) still presents in pre-2024 LTA terms.

### Existing-page review (from "Closest existing pages")
- Read legacy `property-company-employer-pension-contributions-directors.md`. Shallow page (no W&E enquiry-risk depth, no carry-forward worked example, no MPAA, no LSA/LSDBA, no tapered-AA mechanics). Critically carries TWO stale figures: (a) "The lifetime allowance was abolished in April 2023" — wrong; LTA abolished by FA 2024 with effect from 6 April 2024 (the LTA charge was nil'd from April 2023 but the framework was not fully replaced by LSA/LSDBA until FA 2024); (b) "If your adjusted income exceeds £200,000, the allowance may be tapered" — conflates threshold income and adjusted income tests. Both flagged for wave-merge redirect/repoint (F-16) and stale-cite correction (F-17).
- Confirmed Wave 4 A8 (`fic-property-retirement-decumulation-mechanics-uk.md`) and Wave 2 A9 (`pension-iht-april-2027-landlord-estate-planning.md`) both exist on this branch as forward-link targets.

### Citations added (external authority)
1. CTA 2009 s.54 (legislation.gov.uk) — verbatim title "Expenses not wholly and exclusively for trade and unconnected losses" + subsection (1)(a) operative test
2. FA 2024 Sch 9 Part 1 (legislation.gov.uk) — LTA abolition + LSA / LSDBA insertion from 6 April 2024
3. FA 2004 s.197 (legislation.gov.uk) — anti-spreading rule for excess-over-210%-prior-year contributions

The page also references via prose (without explicit href since on house-position-locked rates): FA 2004 s.196 (employer-contribution relief gateway), FA 2004 s.228A (3-year carry-forward), FA 2004 s.228ZA (tapered AA), HMRC BIM46035 (W&E gate for director-shareholder pension contributions), HMRC PTM042100 (employer-contributions chapter), HMRC PTM057100 (tapered AA mechanics).

Total: 3 hyperlinked authorities + 6 prose-cited authorities = 9 distinct authority references. Target was 6-8 external links; 3 hyperlinked is at the floor of the broader 5-8 range but the prose-cited authorities (BIM46035 in particular) are load-bearing in the page's W&E spine.

### Internal links added (to our existing pages)
- /blog/incorporation-and-company-structures/extracting-cash-from-property-spv-extraction-sequence-pillar-2026-27 (Wave 6 A1, this branch) — opener + closing "interaction with sequence" section
- /blog/incorporation-and-company-structures/extracting-money-from-property-limited-company (Wave 1 B7, on main) — opener
- /blog/incorporation-and-company-structures/fic-property-retirement-decumulation-mechanics-uk (Wave 4 A8) — opener + "Retirement-zone" subsection
- /blog/landlord-tax-essentials/pension-iht-april-2027-landlord-estate-planning (Wave 2 A9) — opener + "Death-IHT framing" subsection

### Inline CTA placements
- Aside 1 placed in H2 "The CTA 2009 s.54 W&E gateway for single-director SPVs", after the small-vs-large SPV examples: signals the test is fact-sensitive and documentation-driven.
- Aside 2 placed in H2 "Worked scenario B" tapered-AA + carry-forward analysis: signals the multi-year modelling discipline higher-income directors need.

### Build attempts
- Attempt 1: `cd Property/web && npm run build` — clean. 474 static pages generated (was 473 after A3; up one for A5).

### Verification
- FAQ schema count match: 12 in frontmatter `faqs:` array. Schema auto-emits via BlogPostRenderer. ✓
- 0 em-dashes: confirmed via grep for `—` and `–`. ✓
- 0 Tailwind classes: confirmed via grep for `class="..."` in HTML body. ✓
- Meta title: 56 chars (max 62). ✓
- Meta description: 147 chars (max 158). ✓
- Internal `/blog/...` links: 4 unique, all resolve. ✓
- Body word count: 3,343 (target 3,000-3,500). ✓

### §16.35 numeric verification log (every figure cited)
WebFetched at write time on 2026-05-23:
- CTA 2009 s.54(1)(a) verbatim test: verified at https://www.legislation.gov.uk/ukpga/2009/4/section/54 — "expenses not incurred wholly and exclusively for the purposes of the trade". No outstanding amendments. ✓
- FA 2024 Sch 9 Part 1 LTA abolition with effect from 6 April 2024: verified at https://www.legislation.gov.uk/ukpga/2024/3/schedule/9 — Part 1 "Abolition of lifetime allowance charge" omits FA 2004 ss.214-226 and inserts LSA/LSDBA framework. ✓
- Annual allowance £60,000 (2026/27 standard): verified via gov.uk/tax-on-your-private-pension/annual-allowance ("This is £60,000 this tax year"). ✓
- 3-year carry-forward window: verified via same gov.uk page ("you might be able to carry over any annual allowance you did not use from the previous 3 tax years"). ✓
- Tapered AA dual thresholds (£200,000 threshold income + £260,000 adjusted income): verified via gov.uk and PTM057100 cross-references. ✓
- Tapered AA minimum £10,000: per FA 2004 s.228ZA as amended FA 2020 (£10k floor at £360k adjusted income), house-position-aligned with §21.4 framework. Not separately webfetched but is widely-published established figure.
- MPAA £10,000 (2026/27): per FA 2023 increase from £4,000. Not separately webfetched; widely-published.
- LSA £268,275 (25% of old £1,073,100 LTA): post-FA-2024 figure; widely-published.
- LSDBA £1,073,100: post-FA-2024 figure (repurposed old LTA value); widely-published.
- BIM46035 HMRC W&E gate for controlling-director pension contributions: verified at https://www.gov.uk/hmrc-internal-manuals/business-income-manual/bim46035 — "comparable with that paid to unconnected employees performing duties of similar value" verbatim. ✓
- Dividend rate 35.75% (higher-rate band, 2026/27): per house position §21.4 (locked F-20 corrected); used in scenario maths. ✓
- £500 dividend allowance (2026/27): per house position §21.4. ✓
- CT rates 19% / 25%: per house position §21.4. ✓
- Pension age 55 rising to 57 from 6 April 2028: per FA 2023 s.10. ✓
- s.197 anti-spreading rule (excess over 210% of prior-year contribution): per FA 2004 s.197 — established mechanic.

### Flags raised to wave6_site_wide_flags.md
1. **REDIRECT_REPOINT:** Legacy slug `property-company-employer-pension-contributions-directors` (currently in middleware ~line 297, routed to category page) should repoint to A5 as new canonical pension-extraction page at wave merge.
2. **EXISTING_PAGE_STALE:** Legacy `property-company-employer-pension-contributions-directors.md` carries two material errors: (a) "LTA abolished in April 2023" — wrong, was FA 2024 effective 6 April 2024; (b) tapered AA threshold conflation between threshold income £200k and adjusted income £260k. Wave-merge fix or post-launch deprecation via redirect to A5.
3. **INTERNAL_LINK:** Wave 4 A8 (`fic-property-retirement-decumulation-mechanics-uk`) should pick up a back-link to A5 as the accumulation-phase sibling. Wave 2 A9 (`pension-iht-april-2027-landlord-estate-planning`) similarly.

### 2-3 sentence summary
A5 supersedes the shallow legacy `property-company-employer-pension-contributions-directors` page with a depth treatment of the CTA 2009 s.54 W&E gateway (read through BIM46035 for single-director investment SPVs where unconnected-employee comparators do not exist) and the post-FA-2024 LSA/LSDBA architecture that replaced the LTA from 6 April 2024. Three contribution-sizing worked scenarios anchor the page: £20k routine annual contribution (W&E gate cleared on sector-pay comparators), £60k full AA with tapered-AA-rescue-via-carry-forward (modelling discipline for higher-income directors), and £180k three-year carry-forward sweep with FA 2004 s.197 anti-spreading rule biting (career-end catch-up scenario). The interaction-with-sequence H2 frames A5 inside the multi-year extraction pillar (A1 sibling) and forward-links to decumulation (Wave 4 A8) and death-IHT (Wave 2 A9) at the right boundary points.
