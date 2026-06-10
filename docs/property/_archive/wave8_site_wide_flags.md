# Wave 8 site-wide flags

**Created:** 2026-05-25. **Status:** Pre-launch (no flags yet).

Sessions raise flags here when they surface site-wide issues during their work — existing-page stale figures, brief drift catches, cross-bucket forward-link needs, house-position extensions, etc. Flags do NOT block; sessions continue work after flagging.

**Discipline reminder (§16.15, §16.37):** session-time flag edits go to THIS file in main via absolute path `C:/Users/user/Documents/Accounting/docs/property/wave8_site_wide_flags.md`. NEVER commit flag edits on a worktree branch.

Flag types per NETNEW_PROGRAM §13.2:
- EXISTING_PAGE_STALE — existing page with stale figures/framing (logs to discovery too)
- BRIEF_DRIFT — Stage 1a / Stage 2 brief contains a statutory or factual error caught at write time per §16.35 / §16.36
- INTERNAL_LINK — existing page should back-link to new Wave 8 page
- CROSS_BUCKET — forward-link from your bucket to another's pages (hyperlinks needing back-patch at wave merge per §16.32)
- REDIRECT — legacy slug should repoint to your new page
- HOUSE_POSITION_EXTENSION — house position needs new sub-section or clarification (manager closes)
- AUTHORITY_GAP — HMRC manual / legislation page never cited on our site, manager should consider adding

Flags never block. Sessions continue work after flagging.

---

(Sessions append flags below this line. Manager closes via in-place edit + commit at wave-close step 4.)

---

## F-1 BRIEF_DRIFT — Session A A7: all 5 Stage 2 competitor URLs return 404/403

**Surfaced:** 2026-05-25 14:35Z by Session A on A7 step 4 (competitor fetch).
**Brief:** `briefs/property/wave8/iht-long-term-resident-test-section-6a-tail-period-table-landlords.md`
**Detail:** All five "Stage 2 populated" competitor URLs in the brief are dead (4× HTTP 404, 1× HTTP 403). URLs listed:
- saffery.com/insights/articles/iht-long-term-resident-test/ (404)
- bdo.co.uk/en-gb/insights/tax/private-client/iht-long-term-residence (403)
- rsmuk.com/insights/private-client-services/iht-long-term-resident-test (404)
- evelyn.com/insights-and-events/insights/iht-long-term-uk-resident-test/ (404)
- taylorwessing.com/en/insights-and-events/insights/2024/iht-long-term-residence (404)

These look like Stage 2 sub-agent hallucinated slugs (well-formed firm domains + plausible-looking URL paths but no live content). Per §16.31 the brief carries "URL liveness verified at fetch time" disclaimer; URLs were not live-verified at Stage 2 generation.

**Action taken (no block):** Session A proceeding without competitor input — the A7 differentiator (full 8-row table + 15-year-landlord worked example + s.6B coverage + s.267-gone counter-narrative) is our own depth, not competitor-borrowed. Falling back to one targeted WebSearch for live coverage breadth-check, then writing.

**Recommendation to manager:** Stage 2 sub-agent URL-population guardrail needed — require sub-agent to WebFetch each URL before listing in brief, OR drop the populated-URL section in favour of "session does its own search at write time". Sessions B + C may hit the same pattern. Worth a Bucket B/C pre-emptive spot-check of populated URLs before they hit the same step.

---

## F-2 INTERNAL_LINK — Session A A7 back-patch: forward-links to A8/A9/A10 deferred

**Surfaced:** 2026-05-25 by Session A on A7 step 11 (link-resolve verification).
**Page:** `iht-long-term-resident-test-section-6a-tail-period-table-landlords.md`
**Detail:** A7 publishes first in within-bucket sequencing (pillar). Per §16.32 ordering, A8 (EPT settlor-LTR pivot), A9 (s.18 spouse exemption + s.267ZC), and A10 (returning to UK + s.10A) ship after A7. A7's natural cross-links to those three sibling pages cannot exist as resolvable hyperlinks at A7's commit time. A7 currently describes the three companion territories in text without anchor tags ("Dedicated sibling pages on each topic publish alongside this pillar"). The "Related reading" and "What this page does not cover" sections likewise reference siblings by topic without hyperlink.

**Back-patch obligation:** when A8, A9, A10 are committed, retro-edit A7 to add resolved anchor tags pointing to the live URLs:
- A8: `/blog/landlord-tax-essentials/excluded-property-trust-long-term-resident-settlor-pivot-landlords` (or whatever final category route)
- A9: `/blog/landlord-tax-essentials/iht-spouse-exemption-long-term-resident-section-18-section-267zc-election`
- A10: `/blog/leaving-uk-and-expat-landlords/returning-to-uk-after-non-residence-section-10a-recapture-fig-eligibility`

Session A will handle this back-patch in-session once A10 is committed (the latest of the three within-bucket dependents). Reciprocal back-link from A8/A9/A10 → A7 is the sibling pages' responsibility at their own write time (A7 will exist by then).

**STATUS: CLOSED 2026-05-25.** All three forward-links converted to live hyperlinks at commit 4514b5f. Note: A10 landed at category `non-resident-landlord-tax` rather than the brief's anticipated `leaving-uk-and-expat-landlords` — the live URL is `/blog/non-resident-landlord-tax/returning-to-uk-after-non-residence-section-10a-recapture-fig-eligibility` and the A7 hyperlink uses that route. A8 and A9 land at `landlord-tax-essentials` matching the existing IHT-page convention; their A7-back-link targets are also live. Each of A8/A9/A10 carries reciprocal back-links to A7 in their own bodies.

---

## F-3 BRIEF_DRIFT — §28.9 + §28.11 still carry stale "RPDT repealed FA 2024 s.81" text

**Surfaced:** 2026-05-25T12:50Z by Session B at B1 PILLAR §16.35 per-write verification.

**Detail:** §28.7 was corrected on 2026-05-25 (Stage 2b) to state RPDT is IN FORCE per FA 2022 Part 2 ss.31-53 (4% surcharge above £25m group allowance). But the same §28 cluster still carries the old "repealed FA 2024 s.81" framing in two downstream places: (a) §28.9 Citations list line "FA 2022 Part 2 ss.31-53 (RPDT — repealed FA 2024 s.81)"; (b) §28.11 do-not-write entry "RPDT is current law (false — repealed FA 2024 s.81 for accounting periods beginning on or after 1 April 2024; only historical / straddling-AP relevance)".

**Verification (per §16.35):** Session B WebFetched https://www.legislation.gov.uk/ukpga/2022/3/part/2 on 2026-05-25 and confirmed the page shows "There are currently no known outstanding effects for the Finance Act 2022, PART 2" — no repeal, no outstanding amendments. RPDT is live. The §28.7 corrected position is right; §28.9 + §28.11 stale text needs in-place fix.

**Recommended manager action:** edit §28.9 citation entry to drop "repealed FA 2024 s.81" wording and replace with "in force per FA 2022 s.51 — APs beginning on or after 1 April 2022; no outstanding effects per legislation.gov.uk 2026-05-25". Flip §28.11 do-not-write — the current "RPDT is current law (false)" entry needs to invert to "RPDT is repealed (false)" or be dropped.

**Site-wide grep candidate:** any existing page citing RPDT as repealed needs the same flip. Suggest sub-agent dispatch per §16.43 for STALE sweep on "RPDT repealed", "FA 2024 s.81", "Residential Property Developer Tax repealed". Adjacent existing page `residential-property-developer-tax-uk` should be checked — B1 cross-links to it but did not edit it.

**Does not block B-bucket session work.** B1 + B3 + B10 use the in-force position per §28.7 corrected text.

---

## F-4 WAVE_WIDE_CATEGORY_DRIFT — Bucket C category `vat-for-landlords` does not exist as a live route

**Surfaced:** 2026-05-25T15:00Z by Session C at C1 step 2 (tracker claim), before any writing.
**Affected picks:** all 9 Bucket C (C1, C2, C3, C5, C6, C7, C8, C9, C10).
**Detail:** Bucket C tracker assigns category `vat-for-landlords`; Bucket C briefs assign category `vat-and-property`. **Neither exists** as a route. The only live blog categories per `Property/web/src/app/blog/<category>/page.tsx` are: `capital-gains-tax`, `incorporation-and-company-structures`, `landlord-tax-essentials`, `making-tax-digital-mtd`, `non-resident-landlord-tax`, `portfolio-management`, `property-accountant-services`, `property-types-and-specialist-tax`, `section-24-and-tax-relief`. Without override, C1-C10 canonical URLs would route to non-existent category pages.

**Existing-inventory survey (15 live VAT-on-property pages):** 12 sit under `Property Types & Specialist Tax` (Wave 5 + Wave 6 + Wave 7 VAT pages, plus the Wave 5 mechanics companion to C1); 3 sit under `Landlord Tax Essentials` (`vat-dilapidations-payments-...`, `vat-on-rental-income-...`, `vat-partial-exemption-...`). No precedent for `vat-for-landlords`.

**Cross-bucket observation:** Bucket A tracker also carries non-existent categories (`leaving-uk-and-expat-landlords`, `inheritance-tax-and-estate-planning`). Session A's F-2 already shows them in use without flagging. Worth confirming Session A is overriding to live routes consistently. Bucket B tracker correctly uses `property-types-and-specialist-tax`.

**Action taken on C1 (no block):** category overridden in C1 frontmatter to `"Property Types & Specialist Tax"` (literal casing per Wave 5 mechanics companion). Canonical URL `/blog/property-types-and-specialist-tax/option-to-tax-vata-1994-schedule-10-commercial-property-20-year-lock`. Build clean. Page generated successfully into the SSG path list.

**Manager decision needed:** confirm C2-C10 should follow same override to `Property Types & Specialist Tax`, or specify alternative. Recommendation: override all 9 to `Property Types & Specialist Tax` for routing parity with the Wave 5 mechanics companion (option-to-tax cluster lives end-to-end in that category). If the wave-prep intent was actually to create a new `vat-for-landlords` route, that requires (a) a new `Property/web/src/app/blog/vat-for-landlords/page.tsx` index file, (b) migrating 12 existing VAT pages to keep the option-to-tax cluster together, and (c) a sitemap regen. Out of scope for in-session Bucket C work; flag for post-merge hygiene queue if confirmed as wave intent.

**Session C action plan:** override C2-C10 to `Property Types & Specialist Tax` consistently as I work through them, unless manager directs otherwise. Same canonical pattern. Reciprocal back-link patches between siblings will all live in the same category, simplifying cross-link discipline.

---

## F-5 HOUSE_POSITION_EXTENSION + BRIEF_DRIFT — §29.3 + §29.9 + C1 brief mis-attribute VAT1614B / F / G / H form numbers

**Surfaced:** 2026-05-25T15:00Z by Session C at C1 step 7 (per-write statute verification per §16.35), before writing.

**Verification:** I WebFetched each VAT1614 form's gov.uk publication page on 2026-05-25. The verified mapping is:

| Form | Verified verbatim title (gov.uk 2026-05-25) | Operative use |
|---|---|---|
| VAT1614A | "Tell HMRC about an option to tax land and buildings" | Standard option notification, 30-day window |
| VAT1614B | "Stop being a relevant associate to an option to tax" | Relevant-associate-cessation (NOT prior permission) |
| VAT1614C | "Revoke an option to tax within 6-month cooling off period" | Sch 10 para 23 cooling-off revocation |
| VAT1614D | "Certificate to disapply the option to tax buildings" | Sch 10 para 6 recipient-certified residential conversion |
| VAT1614E | "Opting to tax land and buildings: notification of a real estate election" | Sch 10 para 21 REE notification |
| VAT1614F | "Exclude a new building from an option to tax" | Sch 10 para 21(3)-(5) new-building exclusion from REE |
| VAT1614G | "Disapply the option to tax land sold to housing associations" | Sch 10 para 10 housing-association disapply |
| VAT1614H | "Apply for permission to opt to tax land or buildings" | Sch 10 paras 28-30 prior permission (NOT 1614B) |
| VAT1614J | "Revoke an option to tax after 20 years" | Sch 10 para 25 20-year revocation |

**Drift catches against house_positions.md §29.3 + §29.9 + C1 brief authority list:**

1. **§29.3 + §29.9 + C1 brief.** "Prior permission required (Sch 10 para 28-30): ... VAT 1614B form" — **WRONG**. Prior permission form is **VAT1614H**. VAT1614B is for ceasing to be a relevant associate. The Wave 5 companion page `vat-option-to-tax-commercial-property-mechanics-election-revocation.md` correctly cites VAT1614H, so this drift is in HP-lock + brief, not in existing inventory.
2. **§29.9.** "1614F (revoke real estate election)" — **WRONG**. VAT1614F is "Exclude a new building from an option to tax" (the paragraph 21(3)-(5) carve-out from an REE for new buildings). There is no separate "revoke REE" form per gov.uk; REE revocation is by Commissioner direction only under para 21(5) for non-compliance.
3. **§29.9.** "1614G (grant of permission)" — **WRONG**. VAT1614G is the housing-association disapplication certificate (paragraph 10). There is no "grant of permission" form (HMRC permission decisions on VAT1614H come back as a letter, not a numbered form).
4. **§29.9.** "1614H (notification)" — **WRONG**. VAT1614H is the prior-permission application form (paragraphs 28-30), not "notification". Standard notification is VAT1614A.

**Brief-level drift:** C1 brief's "Authority links" section names VAT 1614B for prior permission with URL `https://www.gov.uk/government/publications/vat-1614b-request-for-permission-to-opt-to-tax-land-andor-buildings`. That URL returns HTTP 404. The correct prior-permission URL is `https://www.gov.uk/government/publications/vat-application-for-permission-to-opt-vat1614h`.

**Cross-bucket implication:** C2 (revocation), C7 (disapplication), and other Bucket C pages all depend on §29.3 form-attribution correctness. Sessions writing those picks should reference this F-5 verification table rather than §29.9 as authoritative until §29 is corrected in-place by manager. Session C will use the verified table for C2-C10 write-time citations.

**Existing-page check (per §16.36):** the Wave 5 companion page `vat-option-to-tax-commercial-property-mechanics-election-revocation.md` already cites VAT1614H correctly for prior permission ("Where prior permission is required you apply on VAT1614H rather than VAT1614A"), so no existing-page back-patch is needed for the prior-permission point. Suggest manager grep existing inventory for any "VAT 1614B" reference linked to prior permission for sweep cleanup. Author's spot-grep finds no other existing page misattributes prior-permission to 1614B.

**Action taken on C1:** C1 PILLAR uses the verified form-attribution mapping throughout. Specifically the H2 "Prior permission under Schedule 10 paragraphs 28 to 30" section cites VAT1614H (with the correct gov.uk URL); the editorial note records the form-attribution verification timestamped 2026-05-25; the authorities footer links to VAT1614H at the correct URL. No reliance on §29.9's stale form mapping.

**Manager action:** correct §29.3 + §29.9 of `house_positions.md` in-place at wave-close step 4. Verified mapping above is ready to lift.

---

## F-6 BRIEF_DRIFT — Session A A8: Stage 2 brief mis-attributes substantive offshore-trust pivot to Sch 13 paras 40-46; actual pivot is new IHTA 1984 s.48ZA

**Surfaced:** 2026-05-25 by Session A on A8 step 7 (§16.35 per-write statute verification via legislation.gov.uk).
**Brief:** `briefs/property/wave8/excluded-property-trust-long-term-resident-settlor-pivot-landlords.md`
**Severity:** Major statutory architectural mis-attribution that would have led the page to cite wrong source-of-law throughout if accepted at face value.

**Detail:** The Stage 2 brief's framing differentiator (paragraph (a) and forward) instructs sessions to cite **FA 2025 s.45 + Sch 13 paras 40-46** as the location of the substantive settlor-LTR pivot for offshore trusts. The actual substantive provision is at a different statutory location:

- **FA 2025 s.45 DELETES IHTA 1984 s.48(3) to (3F) in full** (the historic domicile-at-settlement machinery).
- **FA 2025 s.45 INSERTS A NEW SECTION 48ZA** ("Excluded property: property situated outside the UK etc") containing 11 subsections that perform the substantive settlor-LTR pivot.
- **The pre-2025 trust preservation lives at s.48ZA(4)**, NOT in Sch 13 paras 40-46. s.48ZA(4): "If the settlor died before 6 April 2025, the property is excluded property if the settlor was not domiciled in the United Kingdom when the property became comprised in the settlement." This preserves the historic test in full for pre-reform deceased settlors.
- **Sch 13 paras 40-46 are predominantly administrative.** Paras 40-43 amend the Excepted Estates Regulations 2004; para 44 amends the Excepted Settlements Regulations 2008; para 45 is commencement (including the s.267ZA + s.267ZB scheduled repeal at 6 April 2032, see Session A discovery D-4); para 46 is the pre-commencement-emigrants exemption (3 cumulative conditions). None of these paras contains the substantive offshore-trust settlor-LTR pivot.

**Authorities verified at write time (legislation.gov.uk 2026-05-25):**
- https://www.legislation.gov.uk/ukpga/1984/51/section/48 (shows s.48(3)-(3F) "omitted" by FA 2025 s.45(2)(b))
- https://www.legislation.gov.uk/ukpga/1984/51/section/48ZA (full 11-subsection text of new section)
- https://www.legislation.gov.uk/ukpga/2025/8/section/45 (amending Act; inserts s.48ZA; commencement 6 April 2025)
- https://www.legislation.gov.uk/ukpga/2025/8/schedule/13 (admin/commencement/emigrants exemption — confirmed mostly regulation amendments)

**Action taken on A8 (no block):** A8 uses correct architecture throughout — s.48ZA as primary statutory anchor, with Sch 13 paras 40-46 cited only for the para 46 pre-commencement-emigrants exemption and para 45 commencement / 2032 deferred repeal. Body word count 3024; FAQ count 12; all six verifications pass. A8's opening H2 explicitly flags the location-of-pivot to counter the popular mis-attribution.

**Cross-bucket implication for A9:** Same Stage 2 sub-agent author. A9 brief (spouse exemption + s.267ZC) may carry similar architectural mis-attributions. Suggest pre-write spot-check of A9's statutory location claims (especially around s.18(2A) by-reference Sch 1 NRB, the s.267ZC SPOUSAL Conditions A/B, and any reliance on Sch 13 paras for substantive provisions). Session A will run write-time verification on A9 statute citations per the same §16.35 discipline.

**Manager action recommended:** house position housekeeping update at wave close — extend HP §22.X.4 to add explicit pointer to s.48ZA as the trust-side operative section (distinct from s.6 which is individual-side); update HP §22.X.5 to reflect the 6 April 2032 deferred repeal date for s.267ZA + s.267ZB rather than "no automatic repeal date" framing. See Session A discovery D-4 + D-6.


---

## F-4 EXISTING_PAGE_STALE — existing LRR page uses "150% relief" shorthand + 1143-1181 range drift

**Surfaced:** 2026-05-25T15:40Z by Session B at B9 step 5 (cannibalisation context review).

**Page:** `Property/web/content/blog/land-remediation-relief-150-percent-claim-mechanics-ltdco-developer-investor.md` (Wave 7 page, committed 2026-05-23).

**Detail:** Two drift catches in the existing page:
1. Framing — page uses bare "150% relief" / "150% deduction" framing throughout (title, metaTitle, body), which HP §25.12.9 do-not-write specifically forbids ("Land Remediation Relief gives 150% relief (technically true as a popular shorthand but misframes the architecture)"). HP requires additive 100% + 50% framing. B9 anchors on the additive framing per HP.
2. Range — existing page states "sections 1143 to 1181"; verified Part 14 ends at s.1175. HP §25.12.1 confirms 1143-1175 range; Stage 1 drift catch instruction. The "to 1181" reference appears in the summary block and in FAQ-1 answer.

**Recommended manager action:** at Wave 8 close, edit existing page to (a) reframe the headline as additive ("100% standard deduction at s.1147/s.1148 + 50% additional deduction at s.1149 = 150% total"); (b) correct range to ss.1143-1175 per legislation.gov.uk verification. Single-page edit; existing operational worked-claims content can be retained. B9 supersedes for HP framings.

**Does not block B-bucket session work.** B9 anchors on the corrected position and cross-links the existing page as a companion.

