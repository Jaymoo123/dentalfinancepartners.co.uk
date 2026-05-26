---
slug: vat-on-furnished-holiday-lettings-fhl
category: property-types-and-specialist-tax
intent: Standalone VAT reference page for a former-FHL operator (whose VAT position is structurally unchanged by FHL abolition) and for a prospective new holiday-let owner working out whether they need to register, deal with online-platform-side VAT, opt to tax, manage partial exemption, or use TOMS. No existing site page covers FHL VAT in depth.
---

# MegaWave 1 Stage 2 brief: vat-on-furnished-holiday-lettings-fhl

**Site:** property
**Bucket:** B (SDLT — Scottish / Welsh equivalents + FHL — abolition and transitional rules)
**Session:** B
**Brief type:** Net-new page (no existing site page on FHL VAT in depth; broad rules-overview touches £90k threshold in single FAQ only)
**Source markdown path on launch:** `Property/web/content/blog/vat-on-furnished-holiday-lettings-fhl.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/property-types-and-specialist-tax/vat-on-furnished-holiday-lettings-fhl

---

## Manager pre-decisions

- **Suggested slug:** `vat-on-furnished-holiday-lettings-fhl`
- **Suggested category:** `property-types-and-specialist-tax`
- **Bucket:** B (FHL — abolition and transitional rules)
- **Framing differentiator (Stage 2 extended, 2026-05-26):**

> Standalone VAT-on-FHL reference page. Lead with the **structural separation point**: FHL abolition under Finance Act 2025 Sch 5 is an income-tax / corporation-tax / capital-allowances / CGT reform. It does NOT change the VAT treatment of holiday-accommodation supplies. Holiday accommodation has always been standard-rated by virtue of the carve-out at **VATA 1994 Schedule 9 Group 1 Item 1 paragraph (e)** (NOT paragraph (a) — Stage 2 §16.36 drift catch from Stage 1 seed; verified verbatim at https://www.legislation.gov.uk/ukpga/1994/23/schedule/9 on 2026-05-26). Paragraph (e) is the explicit "grant of any interest in, right over or licence to occupy holiday accommodation" carve-out; paragraph (a) covers buildings and new construction; paragraph (d) is sleeping accommodation in hotels and similar establishments. Note 13 to Group 1 defines "holiday accommodation" as accommodation in a building, hut, caravan, houseboat or tent that is advertised or held out as suitable for holiday or leisure use, excluding hotel-like sleeping accommodation already caught by (d). Post-FA-2025 abolition the standard-rated treatment is unchanged. Body covers: (1) the structural separation (abolition does NOT touch VAT); (2) when registration is required (£90,000 12-month rolling threshold from 1 April 2024 per SI 2024/239); (3) the £90k test on accommodation turnover (gross of platform commission); (4) input-tax recovery on inputs + partial-exemption framework where the operator has exempt long-term lets alongside; (5) opt-to-tax inapplicability for holiday accommodation (already standard-rated); (6) boundary with hotel/B&B/serviced accommodation under Sch 9 Group 1 Item 1(d); (7) TOMS for operators "buying in" travel services and reselling; (8) FA 2024 Sch 8 Digital Platform Information reporting (visibility regime, not a VAT-collection mechanism). Sister page to `serviced-accommodation-tax-fhl-abolition-april-2025` (which owns the income-tax-side trading-vs-property-income split) by lane separation. The site has no other VAT-specific FHL coverage.

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

**Stage 1 manager note:** Cross-link to `serviced-accommodation-tax-fhl-abolition-april-2025` for the income-tax-side trading boundary; cross-link to B13 for individual-owner overview; cross-link to B15 for group-registration considerations.

**Drift-catch carryover (§16.36):** **CRITICAL: VATA 1994 Sch 9 Group 1 Item 1 paragraph (e) is the holiday-accommodation carve-out, NOT paragraph (a).** Stage 1 seed had this wrong; Stage 2 corrected at write time. Confirm at session-side per §16.35 by WebFetching the legislation.gov.uk Sch 9 text and quoting the verbatim paragraph letter.

---

## Competitor URLs (Stage 2 verified live 2026-05-26 per §16.31)

**Fetch + read + extract instruction:** Standard httpx + BeautifulSoup. Competitor coverage of FHL VAT is thin (most pages focus on income-tax abolition). Extract any reader-friendly framings of the £90k threshold + DPI regime + platform-commission gross-vs-net distinction.

- https://www.uklandlordtax.co.uk/furnished-holiday-lets/ — verified live 2026-05-26 (200). Broad FHL coverage; references the £90k VAT threshold but does not develop VAT mechanics. Useful tone reference; does NOT cover partial exemption, TOMS, or the DPI regime.

**Stage 2 catch:** 5 firm URL candidates for VAT-specific FHL coverage tried (BDO, Saffery, Crowe, Mishcon VAT team, ICAEW VAT Faculty) — all 403 / 404. Most VAT-on-FHL content sits on HMRC VAT Notice 709/3 (the official authoritative source); session-side WebSearch should target that notice first.

<!-- competitor section: only 1 live URL surfaced at Stage 2; session-side WebSearch mandatory at write time per §16.31 -->

---

## GSC data

*Net-new page; primary topical queries expected: "VAT on furnished holiday let", "FHL VAT registration", "holiday let VAT threshold", "Airbnb VAT UK", "partial exemption holiday let mixed use". No existing site coverage in this lane.*

---

## Closest existing pages (cannibalisation context)

- `serviced-accommodation-tax-fhl-abolition-april-2025` (Wave 3) — income-tax-side trading-vs-property-income boundary. **Cannib discipline:** sister page; lane-distinct (income tax vs VAT); cross-link as canonical neighbour.
- `furnished-holiday-let-tax-rules-exemptions` (rules overview) — broad post-abolition rules; touches £90k threshold in one FAQ only. **Cannib discipline:** rules-overview retains the one-FAQ mention; this page is the standalone deep treatment.
- `how-much-tax-holiday-let-property-uk` — how-much-tax landing; references £90k threshold in single FAQ. **Cannib discipline:** mirror-link.
- B13 `abolition-of-furnished-holiday-lettings-fhl-what-individual-owners-needs-to-know` — individual-owner checklist; Q8 cross-links HERE for VAT depth.
- B15 `understanding-the-taxation-of-fhls-in-a-company` — company-side architecture; references VAT-group registration consideration. Cross-link.
- B17 `big-tax-changes-ahead-for-furnished-holiday-lettings` — timeline survey; cross-link.

**Cannibalisation decision:** This page OWNS the VAT-on-FHL deep treatment. No overlap requires de-scoping. Mirror-link directional: this page links OUT for income-tax mechanics; sister pages link IN for VAT depth.

---

## Redirect overlap (on launch)

Stage 1 scan: no slug-token overlap with the existing 429 middleware redirects. No middleware edit required.

---

## Authority links worth considering (Stage 2 verified live 2026-05-26, session selects 6-8)

**Statutory:**
- **VATA 1994 Schedule 9 Group 1 Item 1** (exempt grant-of-an-interest-in-land with carve-outs at paragraphs (a)-(n); **paragraph (e)** is the holiday-accommodation carve-out; **paragraph (d)** is hotel-and-similar sleeping accommodation; Note 13 defines "holiday accommodation"): https://www.legislation.gov.uk/ukpga/1994/23/schedule/9 — verified live 2026-05-26.
  - **CRITICAL: paragraph (e), not (a). Stage 1 seed drift catch — confirm verbatim at write time.**
- **VATA 1994 s.4** (scope of VAT — taxable supplies in the course or furtherance of business): https://www.legislation.gov.uk/ukpga/1994/23/section/4
- **VATA 1994 s.5** (meaning of supply): https://www.legislation.gov.uk/ukpga/1994/23/section/5
- **VATA 1994 s.7** (place of supply for land — UK if the property is in the UK regardless of provider residence): https://www.legislation.gov.uk/ukpga/1994/23/section/7
- **VATA 1994 Sch 1 para 1** (registration threshold — £90,000 12-month rolling test from 1 April 2024 per SI 2024/239): https://www.legislation.gov.uk/ukpga/1994/23/schedule/1
- **VATA 1994 s.24** (pre-registration input-tax recovery; goods 4 years, services 6 months): https://www.legislation.gov.uk/ukpga/1994/23/section/24
- **VATA 1994 s.43** (group registration): https://www.legislation.gov.uk/ukpga/1994/23/section/43
- **SI 1995/2518 reg 101** (partial exemption standard method): https://www.legislation.gov.uk/uksi/1995/2518
- **SI 1995/2518 reg 106** (partial exemption de minimis tests): https://www.legislation.gov.uk/uksi/1995/2518/regulation/106
- **SI 1987/1806** (VAT (Tour Operators) Order 1987 — TOMS): https://www.legislation.gov.uk/uksi/1987/1806
- **FA 2024 Schedule 8** (Digital Platform Information reporting regime — DPI; reporting obligations on Airbnb, Vrbo, Booking.com etc; phased commencement from 1 January 2024 reporting period): https://www.legislation.gov.uk/ukpga/2024/3/schedule/8
- **SI 2024/239** (Value Added Tax (Increase of Registration Limits) Order 2024 — uplift of registration threshold to £90,000 from 1 April 2024): https://www.legislation.gov.uk/uksi/2024/239

**HMRC manuals:**
- **VATLP11000** (VAT Land and Property — Hotels and similar establishments under Item 1d): https://www.gov.uk/hmrc-internal-manuals/vat-land-and-property/vatlp11000 — verified live 2026-05-26.
- **VATLP12000** (VAT Land and Property — Holiday accommodation under Item 1e; four subsections: liability, definition, restricted-use dwellings, timeshare): https://www.gov.uk/hmrc-internal-manuals/vat-land-and-property/vatlp12000 — verified live 2026-05-26.
- **HMRC VAT Notice 709/3** (Hotels and holiday accommodation — operational VAT guide; primary HMRC public-facing reference): https://www.gov.uk/guidance/hotels-holiday-accommodation-and-vat-notice-7093 (session: WebFetch to confirm current URL at write time; HMRC notice URLs occasionally re-slug).
- VATPOSV1000+ (partial exemption — VAT Partial Exemption Guidance)
- VATTOS9000+ (TOMS — Tour Operators Margin Scheme)

**Cross-references in house_positions.md:** §6 (FHL abolition macro position — note VAT is unaffected); §25.7 (FA 2025 Sch 5 vs FA 2024 Sch 5 do-not-write — context for the structural separation point); §29 if locked (VAT-on-property framework — Wave 8 mini-lock per HP §29; verify exact section number at write time).

---

## Worked-example data (RUN-phase to render in prose + table)

**Worked example 1 — single-property holiday let below VAT threshold:**

- *Profile:* Individual operator, one Cornish holiday cottage. 2025 calendar-year gross receipts (gross of Airbnb commission): £55,000 (Airbnb commission ~£8,250 at 15% gross-of-VAT; net cash to operator £46,750).
- *Registration test (VATA 1994 Sch 1 para 1):* Taxable turnover for the previous 12 rolling months tested at each month-end. £55,000 < £90,000 threshold; no registration obligation. The £90,000 test is on GROSS receipts (the gross-of-commission amount the guest paid for the supply), not net cash to the operator. Operator does NOT need to register; cannot charge VAT on guest receipts; cannot recover input tax on cleaning, utilities, agent commissions.
- *Voluntary registration consideration:* If operator plans a substantial refurbishment year (new kitchen £18,000, new bathroom £12,000, repaint £4,000 = £34,000 of inputs with £6,800 input tax), voluntary registration would unlock £6,800 of input tax recovery. Cost: charging 20% VAT on guest receipts (£11,000 output tax on £55k receipts) — net cost £4,200. Voluntary registration uneconomic for this profile.

**Worked example 2 — scale-up across threshold:**

- *Profile:* Same operator adds two more holiday cottages in 2026. 12-month rolling gross receipts hit £95,000 in October 2026.
- *Registration trigger:* Operator must notify HMRC within 30 days of the month-end where the threshold was exceeded; registration effective from the FIRST DAY OF THE SECOND MONTH AFTER the test month (per VATA 1994 Sch 1 para 5). Test month: October 2026. Registration effective: 1 December 2026.
- *Post-registration outputs:* All accommodation supplies from 1 December 2026 onwards are standard-rated at 20%. Operator must include VAT on guest receipts (typically absorbing the VAT into the gross price rather than passing it through to guests, which is a price-positioning decision).
- *Post-registration inputs:* Input tax recoverable on cleaning, utilities, agent commissions, accountancy, repairs. Pre-registration input tax recoverable per VATA 1994 s.24 (goods purchased in the prior 4 years still on hand; services in the prior 6 months still being used).
- *Platform-fee mechanic:* Airbnb commission charged from the Irish entity (Airbnb Ireland UC) — non-UK VAT supply. UK VAT-registered operator self-accounts via the reverse charge: include the commission VAT-inclusive amount in both output VAT (Box 1) and input VAT (Box 4), net effect £0 on most quarters, but the gross figures inflate VAT-return totals.

**Worked example 3 — mixed-use partial exemption:**

- *Profile:* Operator holds one Cornish holiday cottage (standard-rated holiday accommodation supply, £75,000 annual gross) and one long-term residential let in Bristol (EXEMPT under Sch 9 Group 1 Item 1 default — rent £18,000 per year, no carve-out applies). Operator is VAT-registered (combined supplies cross threshold via the holiday side).
- *Shared overhead input tax:* Accountancy fees £4,000 + £800 VAT; insurance broker fees £600 + £120 VAT. These inputs cannot be wholly attributed to the holiday or the residential side; they sit in the "non-attributable" bucket under SI 1995/2518 reg 101 standard method.
- *Standard-method recovery percentage:* Taxable supplies (holiday £75,000) ÷ Total supplies (£75,000 holiday + £18,000 residential = £93,000) = ~80.6%. Round UP to next whole percent = 81%. Operator recovers 81% × £920 = £745.20 on non-attributable input tax.
- *De minimis test (SI 1995/2518 reg 106):* Exempt input tax (here approximately the 19% non-recovered share + any directly attributable exempt input tax). If exempt input tax averages below £625 per month AND below 50% of total input tax, full recovery is allowed (the de minimis floor). For this profile the exempt input tax on shared overheads is below threshold; check whether any directly-attributable exempt input tax (e.g. residential-let-specific letting agent fees with VAT) pushes the operator over the de minimis floor.
- *Annual adjustment:* Quarterly recoveries reconciled at year-end; any over- or under-recovery adjusted via Box 4 in the period of annual adjustment.

**Worked example 4 — DPI regime visibility shift:**

- *Profile:* Operator with a single Cornish cottage, 2025 gross receipts £62,000 (just below threshold), pre-DPI under-reporting £15,000 of guest receipts via cash-on-arrival arrangement (illustrative — non-compliant; this worked example exists to explain WHY the DPI changes the risk picture).
- *Pre-2024 visibility:* HMRC had no platform-level data; would only see operator's self-reported income via SA100. Under-reporting was practically undetectable for cash-side supplements.
- *Post-1-January-2024 DPI (FA 2024 Sch 8):* Airbnb / Vrbo / Booking.com required to report UK-resident-host transaction data to HMRC annually. HMRC receives platform-level gross receipts per host per platform. Cross-checked against SA100 + VAT returns. Under-reporting becomes operationally undetectable to operator (the platform reports gross; HMRC matches against operator's return); detected discrepancies trigger compliance enquiry.
- *Operator's practical position:* The DPI regime is a visibility regime, NOT a VAT-collection mechanism (platforms do not collect or remit UK VAT on the host's behalf). Operators must self-assess and self-register at the £90,000 threshold as before; the DPI just makes mis-reporting easier to detect. Genuine compliance becomes more important; under-declaration becomes operationally untenable.

---

## Universal rules (do not skip)

**§16.35 per-write verification (mandatory):** **Single most-important verifications on this brief:** (1) **paragraph (e), not (a)** for the holiday-accommodation carve-out at VATA 1994 Sch 9 Group 1 Item 1 — drift catch corrected at Stage 2; (2) confirm £90,000 VAT registration threshold against current SI / HMRC VAT Notice 700/1 at write time (threshold has moved several times in recent years); (3) confirm FA 2024 Sch 8 commencement and operative dates for the DPI regime; (4) confirm Note 13 definition of "holiday accommodation" against current Sch 9 text; (5) confirm TOMS still operative under SI 1987/1806 (and any current SI amending it).

### Voice
- **No em-dashes.** Commas, parentheses, full stops, middle dots only.
- Practical, specific. Exact figures, named legislation.
- Anonymised personas only.

### Lead-gen architecture
- LeadForm auto-injected at footer; never duplicate.
- `<aside>` styled by global CSS; no Tailwind classes.
- Lead-form role segments emphasise Holiday-let operator + Mixed-portfolio landlord + Adviser.

### CTA placement guidance (per this page)
- 3 inline `<aside>` CTAs:
  - After the structural-separation lead (operator realising VAT is independent of FHL abolition)
  - After the registration-threshold mechanics (operator approaching £90k threshold)
  - After the partial-exemption section (operator with mixed use realising the recovery mechanics)
- Vary opening; do NOT lead with "VAT is a tax on supplies of goods and services..." (definitional).

### Schema
- FAQs in frontmatter; FAQPage JSON-LD auto-emitted.
- **Target: 10-12 FAQs** for this VAT-depth tier.

### Cannibalisation
- Read `serviced-accommodation-tax-fhl-abolition-april-2025` + `furnished-holiday-let-tax-rules-exemptions` + `how-much-tax-holiday-let-property-uk` BEFORE writing.
- Vary worked figures from those pages.
- Link OUT for income-tax-side trading boundary; this page OWNS the VAT-specific decision tree.

### House positions
- §6 (FHL abolition — note VAT unaffected) primary; §25.7 (FA 2025 Sch 5 do-not-write) cross-reference; §29 VAT-on-property framework if locked (verify at write time).

### Quality bar
- Word count: 2,400-2,800.
- FAQs: 10-12.
- External authority links: 6-8.
- Build clean.
- All six verifications pass.

### Anti-templating
- Differentiator: structural separation (abolition does NOT touch VAT) + standalone VAT decision tree. Write to it.
- Lead with the structural separation point ("FHL abolition under Finance Act 2025 Sch 5 is an income-tax, corporation-tax, capital-allowances, and CGT reform; it does NOT change the VAT treatment of holiday-accommodation supplies..."), NOT with a definitional VAT intro.
- Vary H2s from sister FHL pages by using VAT-CATEGORY H2s ("When you have to register", "What counts as taxable turnover", "Partial exemption for mixed-use", "TOMS and the resold-supply question") not REGIME-LED H2s.
- **Anti-templating cross-check (this batch):** do NOT open with "From 6 April 2025..." or "Following the abolition..." — owned by sister pages. Open with the structural-separation point specifically.

---

## FAQ draft (Stage 2 — RUN polishes prose; no further research needed)

1. **Q: Did FHL abolition change the VAT treatment of holiday-let income?** A: No. Finance Act 2025 Schedule 5 is an income-tax, corporation-tax, capital-allowances, and CGT reform. The VAT treatment of holiday-accommodation supplies is governed by VATA 1994 Schedule 9 Group 1 Item 1 paragraph (e), which carves holiday accommodation OUT of the general grant-of-an-interest-in-land exemption, making it standard-rated. That paragraph has not been amended by FA 2025. Holiday accommodation has been standard-rated throughout and remains so. The confusion is common because operators conflate "FHL regime" with "FHL VAT regime" — they were always separate.

2. **Q: When do I have to register for VAT as a holiday-let operator?** A: When taxable turnover in the previous 12 rolling months exceeds £90,000 (the registration threshold from 1 April 2024 per SI 2024/239, verify at write time). The test runs at each month-end on a rolling-12-month basis. Once the threshold is exceeded, registration must take effect from the first day of the second month after the test month (VATA 1994 Sch 1 para 5). For pure-holiday-let operators, holiday-accommodation receipts are taxable turnover; long-term residential let receipts are exempt and do NOT count toward the threshold.

3. **Q: Is the £90,000 threshold based on Airbnb gross or net?** A: Gross. The £90,000 test is on the amount paid by the guest for the supply (the booking price), not on the cash you receive net of platform commission. The platform commission is a separate input-tax-recoverable cost (subject to the reverse-charge mechanic for non-UK platforms like Airbnb Ireland UC). An operator with £85,000 net cash and £15,000 platform commission has £100,000 gross receipts and IS over the registration threshold.

4. **Q: What input tax can I reclaim if I register?** A: Direct inputs attributable to the standard-rated holiday-let supply: utilities, cleaning, agent commissions where invoiced with UK VAT, repairs, replacement furniture (revenue), platform fees via the reverse-charge mechanic for non-UK platforms. Pre-registration input tax under VATA 1994 s.24: goods purchased in the 4 years before registration that are still on hand at registration date; services received in the 6 months before registration that are still being used. Refurbishment input tax incurred just before registration can be material; check timing carefully.

5. **Q: Should I voluntarily register if I am below the threshold?** A: Decision depends on input-tax-recovery vs output-tax-charge balance. Voluntary registration is worth modelling in any year with a substantial input-tax spend (new kitchen, new bathroom, new boiler, full refurbishment, new acquisition with stamp duty on fixtures). Cost: charging 20% VAT on guest receipts. Benefit: recovering 20% input tax on inputs. The numbers usually favour voluntary registration only in heavy-spend years. Reverse: voluntary deregistration permitted under VATA 1994 Sch 1 para 4 if turnover is expected to fall below the £88,000 deregistration threshold.

6. **Q: I also have a long-term residential let. What is the partial-exemption position?** A: Long-term residential let income is EXEMPT under Sch 9 Group 1 Item 1 (default position; not caught by any of the (a)-(n) carve-outs). Mixed operators apply partial exemption: the standard method at SI 1995/2518 reg 101 attributes input tax to taxable, exempt, or non-attributable buckets. Non-attributable input tax is recovered at the taxable-supplies-over-total-supplies percentage (rounded UP to nearest whole percent). The de minimis tests at reg 106 may allow FULL recovery if exempt input tax is below £625 per month average AND below 50% of total input tax. Annual adjustment reconciles quarterly recoveries at year-end.

7. **Q: Should I opt to tax my holiday-let property?** A: No. Opt to tax (VATA 1994 Sch 10 paragraphs 2-3) is the mechanism for converting otherwise-exempt commercial property supplies to taxable. Holiday accommodation is ALREADY standard-rated by virtue of the Sch 9 Group 1 Item 1(e) carve-out; opting adds nothing. Opting becomes relevant only where the operator also holds non-holiday commercial property and wants to recover input tax on that side. The opt-to-tax notice is property-specific; it does not extend to the holiday accommodation supply.

8. **Q: What is the boundary between FHL and "hotel-like" sleeping accommodation?** A: Sch 9 Group 1 Item 1 paragraph (d) carves out "sleeping accommodation in an hotel, inn, boarding house or similar establishment" — also standard-rated. Paragraph (e) covers holiday accommodation. The two carve-outs cover overlapping territory and both produce standard-rated VAT on the headline supply. The categorisation matters more for the income-tax trading-vs-property split (where serviced-accommodation operators with daily housekeeping may achieve trading status) than for VAT. HMRC VATLP11000 covers (d); VATLP12000 covers (e). See `serviced-accommodation-tax-fhl-abolition-april-2025` for the income-tax angle.

9. **Q: Does TOMS (the Tour Operators' Margin Scheme) apply to me?** A: Only if you BUY IN travel services and RESELL to consumers. A typical UK individual or company owning and letting their own holiday cottage is NOT a tour operator and TOMS does not apply. TOMS under SI 1987/1806 catches OTAs reselling third-party-owned holiday lets, UK managers booking accommodation in another EU state and reselling to UK guests, and similar resold-supply arrangements. The operator who owns the cottage and lets it directly is on the standard VAT scheme, not TOMS.

10. **Q: What is the FA 2024 Digital Platform Information regime and does it change my VAT position?** A: FA 2024 Schedule 8 imposes reporting obligations on Airbnb, Vrbo, Booking.com and similar platforms to share UK-resident-host transaction data with HMRC. This is a VISIBILITY regime, NOT a VAT-collection mechanism. The platforms do NOT collect or remit your UK VAT for you. You remain responsible for self-assessing the £90,000 registration threshold and registering when required. The DPI just makes mis-reporting easier for HMRC to detect; HMRC now has platform-level gross-receipts data per host per platform and cross-checks against SA100 + VAT returns. Practical impact: genuine compliance becomes more important; under-declaration is operationally untenable.

11. **Q: My company holds the holiday let in a VAT group — does the £90k threshold apply at company level or group level?** A: At GROUP level. VATA 1994 s.43 group registration treats the whole VAT group as a single taxable person; the £90,000 test is run on group-aggregated taxable turnover. Intra-group supplies are disregarded. For a former-FHL company that joins an existing VAT group (perhaps to consolidate trading entities), the group's combined turnover may already be above threshold; the group's existing VAT registration absorbs the new company's holiday-accommodation supplies from the date of group joining.

12. **Q: How does this page differ from the existing serviced-accommodation page?** A: The existing page (`serviced-accommodation-tax-fhl-abolition-april-2025`) covers the income-tax-side trading-versus-property-income split for operators who provide additional services (daily housekeeping, meals, concierge) that may take their activity beyond passive letting and into a trade for income-tax purposes. This page is the VAT-side neighbour: the VAT treatment of the accommodation supply itself (which is standard-rated regardless of whether the operator reaches trading status for income tax). Different lanes; cross-link.

---

## Workflow (per page; claim ONE page at a time, verbatim 19 steps)

1. Read `house_positions.md` once. §6 + §25.7 primary; §29 (if locked) cross-reference.
2. Claim in tracker.
3. Read brief.
4. Fetch competitor URLs (this brief: only 1 surfaced at Stage 2; session-side WebSearch mandatory).
5. Read closest existing pages: `serviced-accommodation-tax-fhl-abolition-april-2025`, `furnished-holiday-let-tax-rules-exemptions`, B13, B15.
6. Plan H2 outline + meta + FAQ ordering + CTA placements.
7. Verify factual claims; **per §16.35 + §16.36: re-verify VATA 1994 Sch 9 Group 1 Item 1 paragraph LETTER (e, not a — Stage 2 drift catch) + £90,000 registration threshold + FA 2024 Sch 8 DPI commencement + TOMS SI cite + partial-exemption SI 1995/2518 reg 101 + reg 106 de minimis on legislation.gov.uk and HMRC manuals at write time.**
8. Fetch Pexels image (search: "calculator paperwork tax" or "holiday cottage Cornwall").
9. Write markdown with full frontmatter.
10. Build clean.
11. Six verifications.
12. No middleware edit on launch.
13. Register in `monitored_pages`.
14. **Commit on session's branch** (per-page commit).
15. Fill work-log.
16. Mark done.
17. Append flags (F-50..F-99 range).
18. Log discoveries.
19. Next page.

## Session-side watcher pattern

Standard MegaWave 1 Bucket B Q&A pattern; absolute path to main's `megawave1_questions_session_B.md`. Bracketed `## [Q-N]`.

---

## Per-page work-log (fill in as you go)

### Decisions
- **Final slug:**
- **Final category:**
- **H1 chosen:**
- **Meta title chosen:**
- **Why these vs other options:**

### Competitor URLs fetched
- 

### Existing-page review
- 

### Citations added
- 

### Internal links added
- 

### Inline CTA placements
- 

### Build attempts
- 

### Verification
- em-dash count:
- Tailwind utility classes:
- metaTitle length:
- metaDescription length:
- FAQ count:
- Internal links resolve:
- Body word count:

### Flags raised to megawave1_site_wide_flags.md
- 

### 2-3 sentence summary
- 
