# Wave 6 discovery log — Session A

**Created:** 2026-05-23 PM.

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

Discovery logs are FYI; no action needed at session time. Manager reads at wave end, feeds future waves and Track 2 sweep.

---

(Sessions append discoveries below this line.)

## D-1 EXISTING_PAGE_STALE — `extracting-money-from-property-limited-company` wrong-Act cite for s.396B
**Surfaced at:** 2026-05-23 ~21:00 UTC, writing A4 (MVL pillar)
**Detail:** Sibling page FAQ cites "sections 396B and 404A of the Income Tax Act 2007" for the MVL TAAR. ITA 2007 s.396B does not exist; s.404A in ITA 2007 also doesn't appear to be the TAAR section. The correct cite is ITTOIA 2005 s.396B inserted by FA 2016 from 6 April 2016. Flagged as F-1 for wave-merge correction.
**Recommendation:** Wave-merge edit on `extracting-money-from-property-limited-company.md`. Also, since the §16.40-pattern of 9+ consecutive Bill-vs-enacted-Act drift catches is now 10+, recommend a one-off sitewide grep at Wave 6 close for `Income Tax Act 2007.*396B` and variants across all 285+ property pages to catch any other wrong-Act carry-overs.

## D-2 AUTHORITY_GAP — Insolvency Act 1986 Pt IV Ch III not cited elsewhere on the property site
**Surfaced at:** 2026-05-23, writing A4 procedural-mechanics H2
**Detail:** A4 is the first property-site page to cite Insolvency Act 1986 Part IV Chapter III (MVL procedural framework). The act has potential cross-references in lender-default + receivership-vs-MVL territory (e.g. Part III administration; Part IV Ch IV creditors' voluntary liquidation; Part V winding up by court). No existing property page cites these chapters.
**Recommendation:** Adjacent future topic: a "BTL portfolio in distress: administration vs CVL vs LPA receivership" page, owned by the lender-side framing. Not in current Wave 6 scope; flag for future-wave bucket consideration.

## D-3 AUTHORITY_GAP — HMRC CTM36340 on "similar activity" interpretation for s.396B
**Surfaced at:** 2026-05-23, writing A4 TAAR section
**Detail:** A4 is the first site page to cite CTM36340 (the HMRC manual on what counts as "similar trade or activity" for the s.396B TAAR Condition C test). The full CTM36300-36500 range on TAAR for distributions in winding up is potentially exploitable in other Wave 6 buckets (especially anywhere a founder's continued activity is in scope).
**Recommendation:** Add CTM36340 + CTM36345 to the bucket-A authority list for sessions A2 (DLA bed-and-breakfast), A6 (time-pressure extraction), A8 (mid-incorporation phase 2 extraction), A9 (pre-sale strip), A10 (trust-owned SPV) — all of which touch the founder-restart pattern.

## D-4 OTHER — workflow lesson: worktree fresh-install adds ~3 minutes
**Surfaced at:** 2026-05-23, build step on A4
**Detail:** `Property/web/node_modules` was not present in the worktree at first build attempt. Ran `npm install` (139 packages). Subsequent build clean. For Session B + Session C, expect the same one-off install cost on first build per worktree.
**Recommendation:** Optional manager prep step: pre-warm node_modules on each Wave 6 worktree before launching sessions. Not blocking — sessions handle it inline.

## D-5 EXISTING_PAGE_LINK_OPPORTUNITY — `corporation-tax-marginal-relief-property-companies` is the natural CT-side deep link for A1
**Surfaced at:** 2026-05-23, writing A1 marginal-rate-spine H2
**Detail:** A1 references the CT marginal-relief band as the central CT-side decision input but defers depth to `corporation-tax-marginal-relief-property-companies` (Wave 1 B4). The link is in place from A1 → B4. For reverse direction: B4 does NOT currently link to A1. After wave merge, B4 should pick up an INTERNAL_LINK back-link to A1 as the multi-year extraction sequencer that uses the marginal-relief stack as its CT-side framing.
**Recommendation:** Wave-merge edit on B4 to forward-link A1. Not flagged as a wave6_site_wide_flags item because it's a low-priority back-link.

## D-6 OTHER — Competitor URL anti-bot rejection at write time
**Surfaced at:** 2026-05-23, fetching ukpropertyaccountants.co.uk
**Detail:** Stage 2 brief verified `https://www.ukpropertyaccountants.co.uk/extracting-cash-from-property-limited-company/` as HTTP 200 alive. At write time both WebFetch (404) and httpx-with-User-Agent (403) failed. Likely Cloudflare-style anti-bot kicked in between Stage 2 and write time. Pattern worth noting for sessions B + C: Stage 2 verification of competitor URLs does not guarantee write-time fetch success. Have authority-citation backup ready (legislation.gov.uk + HMRC manuals + gov.uk).
**Recommendation:** Continue with legislation-first sourcing approach. Optionally, sessions could pre-cache competitor HTML at Stage 2 (snapshot a copy into briefs/property/wave6/_competitor_cache/ at brief-build time) so it's available at write time even if the live URL is then blocked. Future-wave consideration.

## D-7 EXISTING_PAGE_STALE — site-wide pattern: rate-by-reference statutes need write-time verification of the referenced rate
**Surfaced at:** 2026-05-23, writing A2 — verifying s.455 rate
**Detail:** CTA 2010 s.455 (and s.464A) use the formula "such percentage as corresponds to the dividend upper rate specified in section 8(2) of ITA 2007 for the tax year". ITA 2007 s.8(2) was substituted by Finance Act 2026 s.4(1)(b) to 35.75% for tax year 2026/27 onwards (verified at https://www.legislation.gov.uk/ukpga/2007/3/section/8 on 2026-05-23). Pre-Wave-6 sister pages quoting s.455 at a flat 33.75% are now stale for loans made on or after 6 April 2026. The house position §21.1 also carries the stale 33.75% figure. The pattern is general: rate-by-reference statutes do not need separate amendment when the referenced rate changes; the rate change propagates automatically. **§16.27/§16.30/§16.35/§16.38/§16.40 drift-catch pattern is now at 11+ consecutive surface-and-flag instances.**
**Recommendation:** F-9 flagged at site-wide level for wave-merge sweep. **Broader lesson for the program:** the §16.35 per-write verification rule needs an additional sub-rule: "for any cited rate that is statutorily referenced rather than statutorily fixed, follow the chain to the rate-setting section and verify there." Worth adding to NETNEW_PROGRAM §16.35 as a sub-bullet at next manager edit.

## D-8 EXISTING_PAGE_STALE — pre-Wave-6 DLA pages likely cite ss.464C / 464D as live anti-bed-and-breakfast statutes
**Surfaced at:** 2026-05-23, writing A2 — FA 2025 omission research
**Detail:** Finance Act 2025 s.81(3)(b)-(4) omitted CTA 2010 Part 10 Chapter 3B in full with effect from 30 October 2024. The omission caught ss.464A, 464B, 464C, 464D — but s.464A was simultaneously re-enacted in the surviving Part 10 Chapter 3 architecture (legislation.gov.uk confirms s.464A "is up to date with all changes known to be in force on or before 23 May 2026"). ss.464C and 464D are gone with no equivalent re-enactment. Pre-Wave-6 sister pages that built on the £5,000 30-day or £15,000 anti-arrangement statutory tests need post-FA-2025 reframing.
**Recommendation:** F-10 flagged. Sweep at wave merge for tokens `464C`, `464D`, `30-day rule`, `£15,000.*anti-arrangement`. A2 is the canonical reframe; sister pages should back-link.

## D-9 AUTHORITY_GAP — Finance Act 2026 propagation of dividend rate change to other statutes
**Surfaced at:** 2026-05-23, A2 §16.35 verification
**Detail:** FA 2026 s.4(1)(b) substitutes ITA 2007 s.8(2) "dividend upper rate is 35.75%". This change propagates automatically to any statute referencing the dividend upper rate by reference, not just s.455 and s.464A. Worth a one-off sweep of CTA 2010 / TIOPA 2010 / ITTOIA 2005 / ITEPA 2003 for any other rate-by-reference statutes that now carry a different effective percentage. Quick candidates to check: CTA 2010 s.1024 (loans treated as paid out of profits); CTA 2010 s.461 (relief from charge under s.455); ITTOIA 2005 Part 4 Chapter 1A (dividends to non-UK-residents — usually self-contained but worth checking).
**Recommendation:** Future-wave or Track 2 sweep to identify all rate-by-reference downstream effects of FA 2026 s.4(1)(b). Not blocking for Wave 6.

## D-10 OTHER — C4 shipping before A7 worked via prose forward-link rather than blocking
**Surfaced at:** 2026-05-23, A7 commit and tracker check
**Detail:** §16.32 cross-bucket sequencing for A7 ↔ C4 was specified as "bidirectional, back-patch at wave merge". In practice, C4 shipped first (Session C) with a prose forward-link to A7 ("...covered in our A7 page when it ships"); A7 then shipped with a real `<a href>` forward-link to C4's slug. The prose-then-href pattern worked: neither session blocked the other, and the back-patch from C4's prose to a live `<a href>` is mechanical at wave merge.
**Recommendation:** Pattern worth codifying for future waves: where two pages are bidirectional cross-references and one ships first, the first page uses prose-only forward-link with the slug noted, the second ships with full `<a href>`. Manager replaces the prose with `<a href>` at wave merge. Add as a sub-bullet to NETNEW_PROGRAM §16.32 at next manager edit.

## D-11 EXISTING_PAGE_LINK_OPPORTUNITY — Wave 1 B2 (group relief) should back-link to A7 as personal-extraction overlay
**Surfaced at:** 2026-05-23, writing A7 opener (deferring intra-group group-relief mechanics to B2)
**Detail:** Wave 1 B2 (`property-company-group-relief-corporation-tax`) covers the intra-group CT mechanic (group relief for losses). A7 is now the personal-extraction overlay on the same structure. B2 currently does not forward-link to A7 (A7 did not exist at B2 write time). For a property founder considering a HoldCo structure, B2 + A7 are the complementary corporate-side and extraction-side views.
**Recommendation:** Low-priority wave-merge edit. Add a forward-link from B2's introduction to A7: "For the personal-extraction angle on the same HoldCo group structure (dividend conduit, associated-companies squeeze, alphabet shares at HoldCo level), see our <a href='/blog/incorporation-and-company-structures/multi-company-group-extraction-spv-holding-co-dividend-conduit-mechanics'>HoldCo extraction page</a>." Not raised to wave6_site_wide_flags.md as a high-priority flag.

## D-12 OTHER — Pawson investment-vs-trading line is the shared gate across BPR, BADR, SSE, and CTA 2010 s.1033 POS capital treatment
**Surfaced at:** 2026-05-23, writing A3 (POS depth) H2 "The s.1033 trade-benefit gate" and H2 "The Pawson alignment"
**Detail:** The Pawson v HMRC [2013] UKUT 050 (TCC) trading-test reasoning has become load-bearing across four separate reliefs the property-SPV literature touches: (a) Business Property Relief for IHT (s.105(3) IHTA 1984), (b) Business Asset Disposal Relief for CGT (TCGA 1992 s.169I trading-company requirement, used by both A4 MVL and A3 POS as the working assumption), (c) Substantial Shareholding Exemption for corporate sellers (Sch 7AC TCGA 1992, Wave 1 B3), and (d) the s.1033 CTA 2010 capital-treatment carve-out for purchase of own shares (A3's spine). HMRC applies the line consistently — a company that fails the trading test for one of these reliefs will fail it for the others. This consistency is reliable enough that the page could state "if BPR fails, BADR fails, SSE fails, and s.1033 fails — the assumption flips in lockstep across the four reliefs". The cross-relief alignment is not explicitly stated in any single site page yet.
**Recommendation:** Worth a stand-alone reference page in a future wave: "The Pawson trading line: one investment-vs-trading test, four reliefs that fail in lockstep" — written for property founders who have heard about one or two of these reliefs and want to understand why they all close together. Cross-niche bridge potential too (medical SPVs, professional-services SPVs, contractor SPVs face the same gate structure). Inter-wave queue.

## D-13 AUTHORITY_GAP — CTA 2010 s.1044 (advance clearance for POS capital treatment) not cited elsewhere on the property site
**Surfaced at:** 2026-05-23, writing A3 "When POS makes sense" closing paragraph
**Detail:** A3 is the first property-site page to cite CTA 2010 s.1044 (the advance clearance regime for POS capital treatment). The clearance procedure is a useful planning tool in any borderline case (development trading companies in transition, mixed-use businesses, FICs with active trading subsidiaries) and the s.1044 clearance is part of a wider HMRC advance-clearance toolkit (CTA 2010 s.701 transactions in securities clearance, s.748 anti-arbitrage clearance, ITA 2007 s.682-713 transactions-in-securities clearance, plus the statutory clearance services covered in HMRC's Statement of Practice 3/12). No existing property-site page covers HMRC advance clearances as a category.
**Recommendation:** Adjacent topic for a future wave: "HMRC statutory advance clearances for property-investor transactions" — covering s.1044 (POS), s.701 (TiS), the SoP 3/12 process, and a worked timeline. Distinct reader cohort (founder preparing for a major transaction who wants HMRC sign-off in advance). Cross-references from this future page back into A3 (POS clearance), A4 (MVL TAAR clearance), Wave 1 B3 (SSE), and Wave 4 A1/A5 (extraction-strategy pages). Inter-wave queue.

## D-14 EXISTING_PAGE_STALE — site-wide pattern: pre-Wave-6 pension content carries pre-FA-2024 LTA framing
**Surfaced at:** 2026-05-23, writing A5 (employer pension contributions, post-FA-2024 architecture)
**Detail:** A5 supersedes legacy `property-company-employer-pension-contributions-directors` because the legacy framing is pre-FA-2024. The wider pattern: any property-site page that mentions the lifetime allowance, the £1,073,100 figure as a cap on accumulated fund value, or the "LTA charge" likely carries pre-2024 architecture and needs reframing on LSA / LSDBA. A grep across the property content directory for tokens `lifetime allowance`, `LTA`, `£1,073,100`, `1073100`, and `LTA charge` would surface the wave-merge candidates. Pages plausibly affected include any earlier extraction-content pages, any pension-IHT pages dated before May 2024, and any retirement-planning content.
**Recommendation:** Wave-merge or Track 2 sweep to identify all pre-FA-2024 LTA framings on the property site. The FA 2024 architecture is structurally different (no fund-value ceiling, two new allowances constraining tax-free elements at decumulation), so the rewrites are not just rate updates but framing updates. A5 is the canonical post-FA-2024 reference; sister pages should back-link.

## D-27 EXISTING_PAGE_STALE — ITA 2007 s.491 trust standard rate band abolished 6 April 2024, multiple sister-page sweep candidate
**Surfaced at:** 2026-05-24, writing A10 (trust-owned SPV extraction)
**Detail:** Verification of "ITA 2007 s.491 £1,000 trust standard rate band" at write time confirms the section is OMITTED by FA(No.2) 2023 from 6 April 2024. The £1,000 standard rate band has been replaced by a £500 trust tax-free amount (gov.uk verified) with £100 fragmentation for settlors with 5+ trusts. This is the 12th+ consecutive Wave 6 drift catch on a rate-or-section abolition; flagged as F-25 for site-wide sweep at wave merge. Sister pages likely affected: any pre-Wave-6 trust-content page that walks the trust standard rate band; Wave 6 B-cluster pages (B2 settlements, B4 trifecta) if income-tax-side coverage relied on the £1,000 figure.
**Recommendation:** Wave-merge mechanical grep sweep for tokens "£1,000 trust standard rate band", "standard rate band of £1,000", "ITA 2007 s.491", "s.491 ITA 2007" across Property/web/content/blog/. Each occurrence needs reframing to "£500 trust tax-free amount post-2024, £100 each for 5+ trusts per Sch 1A ITA 2007 inserted by FA(No.2) 2023". Add §22.16 sub-position to house_positions.md codifying the change explicitly.

## D-28 AUTHORITY_GAP — IHTA 1984 s.48ZA (post-FA-2025 long-term-resident excluded property test) thinly referenced across the property site
**Surfaced at:** 2026-05-24, writing A10 (s.48ZA cross-reference for offshore-trust readers)
**Detail:** A10 references IHTA 1984 s.48ZA (the new residence-based excluded property test from 6 April 2025 per FA 2025) at a single-paragraph depth for offshore-based or non-resident founders settling property into trust. Most property-site pages covering offshore trusts or non-resident-settlor structures still frame the IHT-excluded-property test under the pre-2025 domicile concept (s.48(3)-(3F), now OMITTED by FA 2025 s.45). A site-wide audit of offshore-trust content against the new s.48ZA framing would catch material drift; the issue intersects with the wider Wave 6 §16.40 / §22.A inheritance-tax-side house position lock that B-cluster pages covered on the trust-IHT side.
**Recommendation:** Inter-wave audit. Sister pages likely affected: any pre-Wave-6 page citing "non-domiciled trust" / "excluded property trust" / "the 15-of-20 deemed-dom test". Wave 6 B-cluster pages (B4 trifecta) carry the new s.48ZA test on the IHT side; cross-link extension recommended.

## D-29 OTHER — Bucket A close-state observations + Wave 6 program-wide drift-catch tally
**Surfaced at:** 2026-05-24, A10 commit (Bucket A complete)
**Detail:** Bucket A's 10 pages closed with 12+ drift catches at write time, exceeding the program-wide §16.27 / §16.30 / §16.35 / §16.38 / §16.40 / §16.41 pattern by a margin that justifies a Wave 6 retrospective. Pattern decomposition:
1. Bill-vs-enacted-Act drift (rate changes propagating from rate-setting statutes): F-9 (s.455 → 35.75% via ITA 2007 s.8(2)).
2. Section omission drift (post-enactment section removals not reflected in briefs): F-10 (CTA 2010 ss.464C/D omitted FA 2025); F-25 (ITA 2007 s.491 omitted FA(No.2) 2023).
3. Section-attribution drift (briefs name wrong section number): F-21 (SDLTM33500 vs SDLTM09050); F-1 (wrong-Act drift on s.396B from existing site page).
4. Rate-band drift (e.g. £1,000 → £500 trust tax-free amount).
5. Cross-bucket dependency tracking (managed via §16.32; F-2 / F-12 / F-24 / F-26 mechanical back-patches at merge).
Recommendation: Wave 6 manager retrospective should consider whether the §16.36 brief-template statutory-citation cross-check gate needs hardening to programmatically verify section identities, rate citations, and HMRC manual page numbers against gov.uk at brief-build time, not just at session-write time. The §16.35 per-write verification mandate caught every one of these at write time, but doing so consumed roughly 30 minutes of WebFetch verification per page across the session; programmatic Stage 2 hardening would reduce session-time cost and surface drifts earlier.

## D-24 AUTHORITY_GAP — ITA 2007 s.682-713 (TiS counteraction framework) underused across the property site
**Surfaced at:** 2026-05-23, writing A9 (pre-sale extraction)
**Detail:** A9 is the first property-site page to walk the ITA 2007 Part 13 Chapter 1 transactions-in-securities counteraction framework end-to-end (s.682 overview, s.684 substantive counteraction power, s.685 close-company-receipt trigger with Condition A + B, s.686 fundamental-change-of-ownership triple-25% exclusion, s.701 advance-clearance route with the 30-day windows). Wave 1 B3 (SSE for property companies) touches the framework at a paragraph level. No other property-site page covers the framework in depth, despite its load-bearing role in: pre-sale strips (A9), MVL with founder-restart pattern (Wave 6 A4 + the s.396B / s.682-686 boundary), POS where capital-treatment is rejected (Wave 6 A3 + TiS as backstop), and any reorganisation involving a close company. The s.701 clearance route in particular is a standard professional discipline that is under-surfaced for the property-investor audience.
**Recommendation:** Add ITA 2007 ss.682-713 to the §21 house position citation list. Consider a future inter-wave page on "ITA 2007 transactions-in-securities counteraction for property SPVs" as a procedural reference (paired with the HMRC advance-clearance toolkit; cross-link to D-13's adjacent-topic recommendation). Cross-niche bridge potential too (medical SPV exits, professional-services SPV pre-sale strips face the same gate).

## D-25 EXISTING_PAGE_LINK_OPPORTUNITY — Wave 1 B3 (SSE) should pick up a TiS-clearance reference alongside the A9 back-link
**Surfaced at:** 2026-05-23, writing A9 (SSE interaction section)
**Detail:** Wave 1 B3 (`substantial-shareholding-exemption-property-companies.md`) is the SSE-route page for corporate-shareholder share sales. The SSE-route is one of the three exit alternatives for a property SPV, but SSE eligibility (trading-company requirement via Pawson line) does not exempt the seller from TiS counteraction on any pre-sale-strip step run before the share-sale. B3 currently does not surface this point. A9 covers it on the seller-side. B3's coverage would be sharpened by a paragraph noting that SSE protects the corporate-shareholder gain on the share sale but does not protect any pre-sale-strip step from s.684 counteraction.
**Recommendation:** Wave-merge addition to B3 of a sentence in the planning section: "SSE protects the corporate shareholder's gain on the share-sale leg, but any pre-sale-strip step (dividend, in-specie distribution, separate-consideration cash-left-in) sits inside the ITA 2007 Part 13 Chapter 1 transactions-in-securities counteraction framework and may require s.701 clearance regardless of the SSE position on the share sale. See our pre-sale extraction page for the full analysis." Stack with F-23 (B3 → A9 forward-link) at wave merge.

## D-26 OTHER — TiS s.686 fundamental-change-of-ownership exclusion's triple-25% test is a useful structuring anchor underused in competitor coverage
**Surfaced at:** 2026-05-23, writing A9 (TiS framework section)
**Detail:** The s.686 exclusion's triple-25% test (ordinary share capital + distributable entitlement + voting rights) provides a clean structuring anchor: a transaction that meets all three conditions simultaneously is excluded from TiS counteraction; one that misses any single condition is in scope. The test is well-known among M&A tax practitioners but under-surfaced in competitor coverage for property-investor audiences; most property-accountant pages on SPV exits either ignore TiS entirely or treat it as a black-box risk. A9's framing of "exit 100% via clean third-party sale = comfortably outside TiS; retain anything = potentially inside" gives the reader a usable mental model.
**Recommendation:** Future pages covering reorganisations, partial buy-outs, family share transfers, or any structure with continuing seller association with the SPV should explicitly walk the s.686 triple-25% test. Pattern worth codifying in house position §21 alongside the SSE / BADR / TAAR framework. Inter-wave action.

## D-20 OTHER — SPV base-cost step-up on the personal-to-SPV transfer is a structurally interesting under-covered angle
**Surfaced at:** 2026-05-23, writing A8 (mid-incorporation phase-2 extraction)
**Detail:** The TCGA s.17 / s.18 connected-persons MV deeming on the personal-to-SPV transfer leg gives the SPV a base-cost step-up to the MV transfer price (rather than the founder's original acquisition cost). For short-hold transfers (Mike persona: £20k uplift), the step-up is small. For longer-hold transfers across a strong market (£100k+ uplift over 3 years), the SPV-side CGT saving on eventual disposal is material (£25k at 25% main rate); the personal-side CGT cost on the larger gain is paid now vs the deferred SPV-side CGT later. Cash-flow timing analysis often favours the deferred position. This is a quiet structural benefit of the personal-then-sell route not widely surfaced in competitor coverage, which focuses on the DLA credit creation rather than the SPV-side base-cost effect.
**Recommendation:** Worth surfacing in any future property-SPV CGT page that walks SPV-level disposal mechanics. Adjacent topic: how the SPV's CGT base-cost interacts with intra-group transfers under TCGA s.171 / s.179 if the SPV is later moved into a HoldCo (relevant to A7 ↔ A8 cross-link). Inter-wave consideration.

## D-21 AUTHORITY_GAP — FA 2003 s.54 (s.53 carve-outs) not cited elsewhere on the property site
**Surfaced at:** 2026-05-23, writing A8 (SDLT binding constraint section)
**Detail:** A8 cites FA 2003 s.53 as the connected-company MV deeming rule. s.53(5) makes the rule "subject to the exceptions provided for in section 54" (verified via WebFetch 2026-05-23). FA 2003 s.54 covers carve-outs from the connected-company MV deeming, including transactions where the company is acting as a trustee for the connected person and certain partner-to-partnership scenarios. The carve-outs are narrow but materially affect bare-trust nominee structures and partnership routes for portfolio incorporation. No property-site page currently cites s.54 carve-outs in the context of connected-company SDLT mechanics.
**Recommendation:** Add FA 2003 s.54 to the §1 SDLT house position citation list (alongside s.53) and consider surfacing in future pages on bare-trust property structures and partnership incorporation. Cross-references Wave 6 B6 (bare trust vs nominee vs formal trust decision) where the trustee-carve-out angle is potentially relevant. Low priority; A8 carries the s.53 cite without needing s.54 depth.

## D-22 EXISTING_PAGE_LINK_OPPORTUNITY — `incorporation-existing-portfolios-phased-approach` should back-link to A8 as extraction-side companion
**Surfaced at:** 2026-05-23, writing A8 (mid-incorporation extraction)
**Detail:** Existing site page `incorporation-existing-portfolios-phased-approach.md` is the phased-incorporation operational walkthrough on the incorporation side. A8 is the extraction-side companion: same mid-build period, same half-personal half-SPV state, but viewed from the extraction angle rather than the incorporation angle. The two pages form a natural pair. A8 forward-references the phased-approach page in its opener; the reverse direction (incorporation page → extraction page) is missing.
**Recommendation:** Wave-merge add a one-sentence forward-link from the phased-approach page to A8 in its "what happens after the initial s.162 transfer" section: "For the extraction-side route that runs in parallel during the mid-build years (re-mortgage personal property; buy in personal name; sell to SPV at MV; build a tax-free DLA credit), see our <a href='/blog/incorporation-and-company-structures/extraction-while-incorporating-phase-2-acquisition-funded-by-personal-funds'>mid-incorporation phase-2 extraction guide</a>." Low-priority back-link.

## D-23 OTHER — Recurring brief-quality drift pattern on HMRC manual page numbers
**Surfaced at:** 2026-05-23, A8 §16.35 verification (SDLTM33500 was wrong)
**Detail:** The A8 brief authority list named SDLTM33500 for Ramsay anti-avoidance; verification at write time confirms SDLTM33500 covers partnership transfers Para 10, not anti-avoidance. The correct manual is SDLTM09050+ for FA 2003 s.75A. This is the **fourth consecutive Wave 6 brief-quality drift catch** at write time after F-16 (C9 s.1154 vs s.1149), F-18 (C10 triple drift on FA 2021 sections), and now F-21 (A8 SDLTM page number). Pattern: brief author conflates manual-page numbers / statutory-section numbers with adjacent topical numbers in the same hundred-block. The §16.35 per-write verification mandate catches each one but the underlying brief-quality issue persists. Recommendation feeds the existing 16.41 lesson on brief-template citation cross-check.
**Recommendation:** Manager-side post-wave action: extend the §16.36 brief-template statutory-citation cross-check gate to explicitly cover HMRC manual page numbers (not just statutory section numbers). Audit pattern: any brief citation in the form "SDLTM/CTM/CG/IHTM/BIM/PIM/etc. XXXXX (topic)" should be verified at brief-build time by WebFetching the manual page and confirming the topic match. Distinct lesson category from rate drift and section drift; warrants its own bullet in §16.36 / §16.41.

## D-16 AUTHORITY_GAP — ITA 2007 s.812 (income-tax parallel to TCGA s.10A) not cited elsewhere on the property site
**Surfaced at:** 2026-05-23, writing A6 Scenario C (pre-emigration extraction)
**Detail:** A6 is the first property-site page to cite ITA 2007 s.812 ("Treatment as arising in year of return") as the income-tax parallel to TCGA 1992 s.10A. s.812 catches dividends and other income arising during temporary non-residence and deems them to arise in the year of return where the absence is five years or less and the individual was UK-resident in 4 of the 7 prior tax years. The mechanic is load-bearing on pre-emigration dividend-bunching analysis for SPV founders and on post-emigration extraction analysis from UK companies; without s.812 the s.10A framing only addresses CGT, missing the income-side recapture. A6's Wave 2 C1 sibling (pre-departure checklist) does not currently cite s.812 either — only s.10A on the CGT side.
**Recommendation:** Add s.812 to the §17.3 house position citation list (alongside s.10A) and flag for back-patch into Wave 2 C1 (pre-departure checklist) and any other extraction or expat pages that discuss dividends arising during non-residence. Low-priority; A6 carries the cite for now and future pages can lean on it.

## D-17 EXISTING_PAGE_LINK_OPPORTUNITY — Wave 2 A9 (pension IHT April 2027) should back-link to A6 for terminal-illness extraction context
**Surfaced at:** 2026-05-23, writing A6 Scenario B (terminal illness)
**Detail:** Wave 2 A9 (`pension-iht-april-2027-landlord-estate-planning.md` in `landlord-tax-essentials`) covers the April 2027 pension IHT framework from the estate-planning angle. A6 cites A9 in its "April 2027 pension IHT pivot" subsection within the terminal-illness scenario. A9 readers thinking about end-of-life pension extraction (or about the pre-vs-post April 2027 window for terminal illness diagnoses) would benefit from a forward-link to A6's compressed-timeline applied analysis. Reciprocal link is mechanical at wave merge.
**Recommendation:** Low-priority wave-merge add a forward-link from A9 to A6 in the section discussing the use-pension-last strategy or the terminal-illness end-of-life implications.

## D-18 ADJACENT_TOPIC — Pre-divorce SPV asset valuation for matrimonial settlement is a related cohort gap
**Surfaced at:** 2026-05-23, writing A6 Scenario A (pre-divorce extraction)
**Detail:** A6's Scenario A walks the extraction sequence inside the FA(No.2) 2023 s.41 extended window. Adjacent topic that no Wave 6 brief covers: how to value a property SPV for matrimonial financial settlement (Form E disclosure, sworn valuation evidence, minority-discount issues on jointly-held SPV shares, the treatment of retained earnings vs distributable reserves for settlement purposes). This is a Family Procedure Rules 2010 / Matrimonial Causes Act 1973 s.25 territory rather than tax statute, but the tax-side input (CGT base cost, s.58 NGNL treatment, DLA balances, pending CT liability) is what the family lawyer needs from the accountant. Distinct cohort: separating couples with a jointly-held SPV.
**Recommendation:** Future-wave bucket candidate. Likely paired with adjacent pages on pre-divorce property valuation (residential portfolio vs SPV-held portfolio) and the spouse-transfer mechanics outside the SPV (TCGA s.58 on direct-owned BTL). Inter-wave queue.

## D-19 OTHER — Compressed-timeline pattern surfaces a recurring evidence-discipline failure mode
**Surfaced at:** 2026-05-23, writing A6 failure-mode catalogue
**Detail:** Across all three A6 scenarios, the dominant failure mode at HMRC enquiry is the same: retrospectively-dated minutes, extraction events that don't line up with the medical / separation / SRT record, and pension contributions made days before a triggering event. The pattern is consistent enough that it could be its own page: "Why HMRC always wins on retrospectively-dated property SPV minutes" — a procedural-discipline page rather than a tax-statute page. The evidence pack discipline applies equally to non-time-pressure extraction (Wave 6 A1 pillar discusses it briefly), but the compressed scenarios sharpen the failure rate sharply.
**Recommendation:** Inter-wave queue. Could fit a future "compliance and procedural discipline for property SPVs" bucket alongside other process-side pages (board minute mechanics; distributable-reserves evidence; PAYE RTI for sole-director SPVs).

## D-15 AUTHORITY_GAP — HMRC BIM46035 (W&E for controlling-director pension contributions) not cited elsewhere on the property site
**Surfaced at:** 2026-05-23, writing A5 H2 "The CTA 2009 s.54 W&E gateway for single-director SPVs"
**Detail:** A5 is the first property-site page to cite HMRC's BIM46035 (the Business Income Manual chapter on applying the W&E test to pension contributions for controlling directors). The chapter's "unconnected employees performing duties of similar value" comparator framework is the load-bearing element of HMRC's enquiry approach. BIM46000-46099 covers the broader W&E test territory across multiple expense categories. No existing property-site page cites this manual chapter.
**Recommendation:** Add BIM46035 to the bucket-A authority list for sessions A6 (time-pressure extraction, where contributions are made under pressure), A8 (mid-incorporation extraction), and A9 (pre-sale strip, where contributions sweep accumulated reserves). The W&E gate applies on each of these scenarios in different ways. Cross-niche bridge potential too: medical / professional-services SPV pension content faces the same gate.
