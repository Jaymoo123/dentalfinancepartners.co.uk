# Wave 9 discovery log — Session C

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

## D-1 ADJACENT_TOPIC — Brought-forward rental losses pre-FA 2008 origination-year trap is a candidate standalone page

**Surfaced at:** 2026-05-25, RUN-phase, Session C, writing C3.
**Detail:** C3's scenario 5 (pre-FA 2008 brought-forward losses origination-year trap) covers a defensive position that is materially under-played in landlord-facing competitor coverage. The angle has standalone explanatory weight: long-running portfolio landlords with accumulated losses from 2005/06-2007/08 origination years are still utilising those losses against current rental income, and the pre-FA 2008 architecture (loss-claim-as-relief-computation vs assessment) is a live operational defence against HMRC reach-back into the loss-origination year. Currently embedded as a worked scenario + dedicated H2 inside C3, but the topic is large enough for a standalone net-new page if Wave 10+ wants the depth (worked loss-by-loss origination analysis; ITTOIA 2005 s.118 + FA 2008 Sch 39 + Sch 1A amendments; defensive framework against HMRC challenge of utilisation-year reductions where origination-year is closed).
**Recommendation:** Wave 10+ bucket candidate — "Brought-forward rental losses pre-FA 2008 trap: defending the loss-utilisation year against out-of-time HMRC reach". Pool-thinness check needed against existing competitor coverage (likely thin per Stage 2 brief pool-thinness disclosure).

---


## D-2 EXISTING_PAGE_LINK_OPPORTUNITY — W7 B1 (discovery-assessment-time-limits-landlord-tax-enquiries-tma-1970-s29) should back-link to Wave 9 C3 for case-law depth

**Surfaced at:** 2026-05-25, RUN-phase, Session C, writing C3.
**Detail:** W7 B1 is the canonical headline four-bracket framework page (s.34 / s.36 / s.36A). Wave 9 C3 is the post-Tooth case-law depth companion (staleness death + s.29(5) competent-officer + brought-forward losses pre-FA 2008 trap). C3 forward-cites W7 B1 cleanly (workflow internal-link). W7 B1 does NOT yet back-link to C3.
**Recommendation:** at wave-close, manager edits W7 B1 to add a back-link to C3 from the body section that covers the s.29(5) competent-officer test (around line 90-95 of W7 B1) and the Tooth post-2021 section (around line 100). Suggested anchor text: "Our case-law-depth companion walks the post-Tooth staleness reset and the brought-forward losses pre-FA 2008 trap in full." Logged as EXISTING_PAGE_LINK_OPPORTUNITY rather than a stale-figure flag — no factual correction needed on W7 B1; just the back-link.

---

## D-3 EXISTING_PAGE_LINK_OPPORTUNITY — W7 B8 (schedule-24-fa-2007-penalty-behaviour-categories-landlord-enquiries) should back-link to Wave 9 C2 for mitigation-mechanics depth

**Surfaced at:** 2026-05-25, RUN-phase, Session C, writing C2.
**Detail:** W7 B8 is the canonical Sch 24 band-matrix page. Wave 9 C2 is the mitigation-mechanics depth companion (telling/helping/giving operational weighting + para 14 suspension full walk + F-5 named callout). C2 forward-cites W7 B8 for the band matrix; W7 B8 does NOT yet back-link to C2 for the mitigation depth.
**Recommendation:** at wave-close, manager edits W7 B8 to add a back-link to C2 from the body section that covers the para 9 / para 10 disclosure mitigation framework (the existing B8 FAQ on "Can the 30 per cent careless penalty be reduced to zero?" is the obvious anchor point). Suggested anchor text: "Our Schedule 24 penalty-mitigation depth companion walks the para 9 quality-of-disclosure framework, para 14 suspension and the F-5 trap in operational depth."

---

## D-4 EXISTING_PAGE_LINK_OPPORTUNITY — W7 B6 (let-property-campaign-formal-disclosure-route-landlords-undisclosed-rental) should back-link to Wave 9 C1 for applied-penalty-math depth

**Surfaced at:** 2026-05-25, RUN-phase, Session C, writing C1.
**Detail:** W7 B6 is the canonical LPC 3-step process page. Wave 9 C1 is the applied-penalty-math + route-selection depth companion (Sch 41 vs Sch 24 split, prompted-vs-unprompted quantified, four worked scenarios, route-selection decision tree). C1 forward-cites W7 B6; W7 B6 does NOT yet back-link to C1 for the applied math.
**Recommendation:** at wave-close, manager edits W7 B6 to add a back-link to C1 from the body section that introduces the penalty band. Suggested anchor text: "For applied penalty math (Sch 41 vs Sch 24 split, prompted-vs-unprompted quantified, four worked landlord scenarios and the LPC vs WDF vs DDS vs CoP9 route-selection decision tree), see our LPC applied-penalty-math depth companion."

---

## D-5 AUTHORITY_GAP — CC/FS11 + CC/FS7a gov.uk URLs need verification at next wave touch

**Surfaced at:** 2026-05-25, RUN-phase, Session C, writing C1 + C2.
**Detail:** Stage 2 briefs flagged CC/FS11 (Sch 41 failure-to-notify taxpayer-facing factsheet) and CC/FS7a (Sch 24 inaccuracy taxpayer-facing factsheet) URLs as needing write-time verification. C1 + C2 pages opted not to cite CC/FS11 / CC/FS7a directly given the URL-drift risk; HMRC manual references stayed at CH80000+ / CH82420 / CH82460 / CH83110 / CH71000 (all verified live by Stage 2 2026-05-25). The CC/FS taxpayer-facing factsheets are the higher-value link for general readers (plain-language explanation) but the URL stability is currently the limiting factor. Pre-Wave-10 manager hygiene step: verify the current canonical gov.uk URLs for CC/FS11, CC/FS7a, and CC/FS10 (suspension factsheet — C2 cited this one with the standard URL pattern, which returned content on Stage 2 verification but the broader CC/FS family appears to be migrating between gov.uk URL patterns).
**Recommendation:** Wave 10 prep hygiene — sub-agent dispatch with WebFetch on every CC/FS factsheet URL, return the verified canonical URL and the last-updated date, build into a permanent reference table at HP §27 or NETNEW_PROGRAM appendix. Sessions then have a single authoritative source for taxpayer-facing factsheet URLs.

---
