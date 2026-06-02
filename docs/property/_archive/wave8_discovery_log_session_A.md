# Wave 8 discovery log — Session A

**Created:** 2026-05-25.

Discovery log format (one block per discovery):
```
## D-N {DISCOVERY_TYPE} — {one-line headline}
**Surfaced at:** {timestamp + which page you were writing}
**Detail:** {what you found / what is interesting}
**Recommendation:** {what should happen with it — future wave bucket idea? site-wide back-patch? calculator? component? cross-site link?}
```

Discovery types per NETNEW_PROGRAM §13.4:
- ADJACENT_TOPIC — competitor covers something we do not, not in topic_gaps
- CALCULATOR_IDEA, COMPONENT_IDEA — interactive tool / UI component idea
- EXISTING_PAGE_STALE — existing page with stale figures/framing
- EXISTING_PAGE_LINK_OPPORTUNITY — existing page should link to your new page
- AUTHORITY_GAP — HMRC manual / legislation never cited on our site
- CROSS_NICHE_LINK — opportunity to cross-link to dentists/medical/solicitors/agency
- OTHER — anything else worth recording

Discoveries are FYI for future-wave bucket planning. Never block.

---

## D-1 HOUSE_POSITION_EXTENSION — s.6A(2) twin routes to lose LTR status (not captured in HP §22.X.2)

**Surfaced:** 2026-05-25 at A7 write time, §16.35 verification via WebFetch of https://www.legislation.gov.uk/ukpga/1984/51/section/6A.
**Detail:** HP §22.X.2 presents the s.6A(3) tail-period table as the single route to lose long-term-resident status post-departure. The current legislation.gov.uk text of s.6A(2) provides TWO distinct routes: (a) 10 consecutive non-UK-resident tax years within the prior 19 tax years, OR (b) the table-based consecutive years per s.6A(3) ending with the year before the current tax year. The (a) 10-consecutive route is a freestanding bright-line that always works regardless of prior UK-resident-year count; (b) is the tapered table covered by HP §22.X.2.

For most departing landlords with 14-18 prior UK-resident years, route (b) binds (because the table number 4-8 is shorter than 10 consecutive). Route (a) is the operative cap for 19-20 prior-UK-year individuals (they would otherwise face a 9-10 year tail under the table; route (a) ensures it never exceeds 10).

A7 covers both routes verbatim in body text. HP extension recommended for A8/A9 sessions to reference — the existing §22.X.2 framing is correct as far as it goes but is incomplete by omitting the (a) freestanding route.

**Recommendation:** manager extend §22.X.2 to name both s.6A(2)(a) and s.6A(2)(b) routes, with note that (a) is the 10-consecutive bright-line and (b) is the tapered table at s.6A(3). Closes a §16.36 statutory cross-check gap; small but the kind of detail that hardens the cluster against drift in the A8/A9/A10 dependent pages.

---

## D-2 EXISTING_PAGE_LINK_OPPORTUNITY — `iht-non-resident-uk-property-april-2025-residence-test` should add back-link to A7

**Surfaced:** 2026-05-25 at A7 write time during closest-existing-page review.
**Detail:** The existing IHT non-resident page (the policy headline companion) currently has no forward-link to A7. A7 is now the operational statutory pillar that the headline page can defer to for: the verbatim s.6A(1) test, the full 8-row s.6A(3) table, the s.6A(2) twin loss routes, s.6B young-person variation, and the s.267-omitted counter-narrative. The headline page would tighten if it dropped its own (slightly looser) "two-route" framing and pointed to A7 for the statutory mechanics.

**Recommendation:** add a one-line cross-link from the headline page to A7 at wave close, e.g. in the "The long-term-resident test" H2 section: "For the verbatim statutory text plus the section 6A(2) loss routes and section 6B variation, see the [section 6A pillar](/blog/landlord-tax-essentials/iht-long-term-resident-test-section-6a-tail-period-table-landlords)." Low-priority back-patch (no current page is wrong, A7 just adds precision).

---

## D-3 AUTHORITY_GAP — HMRC IHTM47020 first cite on our site

**Surfaced:** 2026-05-25 at A7 write time during external-authority research.
**Detail:** A7 cites HMRC IHTM47020 (the IHT manual page on the long-term UK residence test) as a primary external authority. Grep of `Property/web/content/blog/` showed this URL was not cited anywhere on our site before. The manual page is HMRC's published interpretation of the s.6A test and corroborates the s.6A(3) table verbatim. Worth tracking — A8/A9 pages can also cite IHTM47020 as the operational HMRC view.

**Recommendation:** add IHTM47020 to HP §22.X.7 citations list at next house-position housekeeping. Same status for any other IHTM47000-series page that surfaces during A8/A9/A10 — likely IHTM47030 (s.6A(2) loss routes) and IHTM47040 (s.6B young-person variation) exist but I did not verify at A7 time.

---

## D-4 HOUSE_POSITION_EXTENSION — s.267ZA and s.267ZB scheduled for repeal 6 April 2032 (contradicts HP §22.X.5)

**Surfaced:** 2026-05-25 at A8 write time, §16.35 verification of FA 2025 Sch 13 via legislation.gov.uk.
**Detail:** HP §22.X.5 currently states: "s.267ZA has no automatic repeal date; it remains available indefinitely for qualifying legacy spousal-connection cases (where the spouse / civil partner was UK-domiciled before 6 April 2025)." The verbatim FA 2025 Sch 13 para 45 (commencement) provides: "Most Part 1 amendments take effect 6 April 2025. The repeal of sections 267ZA and 267ZB is deferred to 6 April 2032." So s.267ZA + s.267ZB DO have an automatic repeal date — 6 April 2032 — even though commencement of the rest of the regime is 6 April 2025. The seven-year deferred repeal preserves the legacy spousal-election gateway through to the 2031-32 tax year, then closes.

A8 covers the 6 April 2032 deferral verbatim. A9 (spouse exemption + s.267ZC election) is the directly-affected sibling page and will need to reflect the 2032 close-out for s.267ZA route advice.

**Recommendation:** manager update HP §22.X.5 to substitute "scheduled for repeal on 6 April 2032 per FA 2025 Sch 13 para 45 (deferred-repeal route preserving legacy spousal-connection elections for 7 years after the main regime change)" for the current "no automatic repeal date" framing. Same correction applies in HP §22.7 citations (also currently silent on the 2032 date for s.267ZA).

---

## D-5 HOUSE_POSITION_EXTENSION — Schedule A1 IHTA 1984 extended to UK agricultural property per s.48ZA(10)

**Surfaced:** 2026-05-25 at A8 write time, §16.35 verification of new IHTA s.48ZA via legislation.gov.uk.
**Detail:** HP §22.X.4 currently mentions Schedule A1 as the "enveloped UK residential property look-through" carrying "from 6 April 2017" continuity unaffected by FA 2025. The new s.48ZA(10) text reads: "Subsections (2) to (4) are subject to Schedule A1 (overseas property with value attributable to UK residential property or UK agricultural property)." So Schedule A1 has been EXTENDED by FA 2025 to cover UK agricultural property held via offshore structures, in addition to the historic UK residential look-through.

The existing IHT non-resident page (`iht-non-resident-uk-property-april-2025-residence-test`) already mentions the agricultural extension in its November 2025 anti-avoidance section, but treats it as forthcoming Budget 2025 publication rather than enacted. Confirmed: the extension is enacted as part of FA 2025 (effective 6 April 2025 per the FA 2025 s.45 commencement); the November 2025 anti-avoidance package was a separate further-extension package on different aspects (the situs-change-on-LTR-cessation trust exit charge; charity gift restrictions).

**Recommendation:** manager update HP §22.X.4 to:
1. State Schedule A1 covers UK residential AND (from 6 April 2025) UK agricultural property per s.48ZA(10) verbatim.
2. Distinguish the FA 2025 (April 2025) agricultural extension from the November 2025 Budget anti-avoidance package (situs-change trust exit + charity exemption tightening), which are separate provisions.
3. Suggest existing iht-non-resident page wording update at wave close to align with the enacted-not-forthcoming framing.

---

## D-6 HOUSE_POSITION_EXTENSION — HP §22.X.4 should reference s.48ZA as trust-side operative section (currently only refers to s.6)

**Surfaced:** 2026-05-25 at A8 write time during HP cross-reference work.
**Detail:** HP §22.X.4 ("Excluded property regime under LTR (IHTA 1984 s.6)") works the post-FA-2025 excluded-property framework through section 6 alone. The verbatim s.6(1) text quoted at §22.X.4 is the INDIVIDUAL-level excluded property rule ("Property situated outside the United Kingdom is excluded property if the person beneficially entitled to it is an individual who is not a long-term UK resident"). The TRUST-SIDE excluded property framework lives at a separate statutory location: new IHTA 1984 s.48ZA, inserted by FA 2025 s.45, which covers settled property and has its own 11-subsection architecture distinct from s.6.

For trust-side mechanics (which is the core of A8, parts of A9, and much of any future Bucket-A IHT page), s.6 is not the operative section; s.48ZA is. The HP §22.X.4 framing risks pulling future sessions toward s.6 citations for trust-side analysis where s.48ZA is the correct anchor.

**Recommendation:** manager extend HP §22.X.4 (or add new §22.X.4a) to set out the s.48ZA framework explicitly:
- Title: "Excluded property regime under LTR — INDIVIDUAL scope (IHTA 1984 s.6) vs TRUST scope (IHTA 1984 s.48ZA)"
- For individuals: s.6 is operative (LTR-based test for property held directly by individuals).
- For settled property: s.48ZA is operative (settlor-LTR-based test, with 4 subsections covering live settlor, post-2025 deceased settlor, pre-2025 deceased settlor preserved test, and IIP-beneficiary carve-outs).
- s.6(1) and (1A) are explicitly displaced for offshore settled property by s.48ZA(1) opening words.

Closes a §16.36 statutory cross-check gap that the F-6 brief drift surfaced. Same recommendation applies to any A9 brief that walks spouse-exemption mechanics through s.6 — A9 mechanics flow through s.18 (gift-side) plus s.48ZA (where the gift is into trust), not through s.6 directly.

---

## D-7 HOUSE_POSITION_EXTENSION — HP §17.8 condition (c) framing of s.845B(4) "disqualified" is wrong; actual definition is parliamentary

**Surfaced:** 2026-05-25 at A1 write time, §16.35 verification of ITTOIA 2005 s.845B via legislation.gov.uk.
**Detail:** HP §17.8 lists four cumulative conditions for FIG qualifying new resident status, with condition (c) framed as: "(c) individual is not disqualified per s.845B(2) (typically: previously claimed FIG / remittance basis for over-quota period)". The actual definition at s.845B(4) (subsection number also slightly off in HP — disqualification is at (4) not (2)) is verbatim: "disqualified" means "regarded as a member of the House of Commons or House of Lords (under section 41 of the Constitutional Reform and Governance Act 2010) for any part of that tax year". The carve-out is narrow and parliamentary; it has nothing to do with "previously claimed FIG / remittance basis". The historic-claim-prevention concept is embedded elsewhere in s.845B (via the 10-year prior-non-residence test at condition (c), now numbered correctly).

The A2 brief (FIG election mechanics) and A3 brief (year-5 cliff) may both carry the same framing error if they reference the s.845B(4) definition; sessions writing those should verify against legislation.gov.uk per the same §16.35 discipline.

**Recommendation:** manager update HP §17.8 in-place:
1. Renumber the four conditions to match verbatim s.845B(1) lettering: (a) UK resident; (b) not disqualified per s.845B(4); (c) not UK resident for each of the 10 tax years before; (d) at least 10 years old at commencement.
2. Replace "previously claimed FIG / remittance basis for over-quota period" parenthetical with "narrow parliamentary carve-out for MPs and members of the House of Lords per CRAGA 2010 s.41".
3. Note the s.845B(2) confusion: subsection (2) provides the four-year duration of relief, NOT the disqualification definition. Disqualification is at s.845B(4).

Same error in the A1 brief, A2 brief, A3 brief (Stage 2 sub-agent appears to have lifted the same framing from HP §17.8 without re-verification). All three briefs may need spot-correction at Wave 8 close, or sessions writing A2 + A3 should treat the brief's s.845B(4) framing as unreliable and verify at write time.
