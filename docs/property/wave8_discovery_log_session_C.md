# Wave 8 discovery log — Session C

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

## D-1 EXISTING_PAGE_LINK_OPPORTUNITY — Wave 5 mechanics companion should back-link to C1 framework pillar

**Surfaced:** 2026-05-25 at C1 step 5 (closest-existing review).
**Detail:** `vat-option-to-tax-commercial-property-mechanics-election-revocation.md` (Wave 5) is the operational-mechanics companion to C1's framework pillar. The two pages are now designed to be read together. The Wave 5 page's opening paragraph and "Related Reading" should both link forward to C1 once C1 is on main, so readers entering at the mechanics page can step up to the framework architecture. Wave 5 page currently has neither.
**Recommendation:** at wave-close back-patch step, manager (or session-end sweep) edits Wave 5 page to add (a) one inline link in opening paragraph to C1 as the framework companion, (b) one entry in "Related Reading" section. Format consistent with the rest of the Wave 5 page's anchor style.

## D-2 AUTHORITY_GAP — HMRC VBNB73000 (relevant associate) and VATLP25000 (real estate elections) not cited on the site

**Surfaced:** 2026-05-25 at C1 step 7 (statute verification).
**Detail:** Two HMRC internal-manual citation points consistently absent from existing inventory: (a) **VBNB73000+** (the relevant-associate sub-manual within VAT Land and Property — defines the para 3 "relevant associate" test that joins body-corporate opters together for paragraph 2 purposes); (b) **VATLP25000+** (the real-estate-elections sub-manual — operational guidance on paragraph 21). Both are referenced by Notice 742A but not directly linked anywhere on the Property site that I could find with grep.
**Recommendation:** worth adding as additional authority links on C1 (PILLAR) at next revision, or as standard authority adds on C2 / C7 (which both reference paragraphs that interact with relevant-associate scope). Not blocking for C1 — Notice 742A is the primary HMRC anchor and is cited.

## D-3 COMPONENT_IDEA — option-to-tax decision flowchart

**Surfaced:** 2026-05-25 at C1 step 6 (outline planning).
**Detail:** The opt-decision framework (input recovery vs tenant cost vs SDLT vs CGS overlay vs anti-avoidance traps) has the structure of a 5-question decision tree that would render well as an interactive component (a series of question cards that gate which downstream considerations apply). Each branch terminates in a recommendation ("opt — clean tenant covenant, material recovery"; "do not opt — substantially-exempt tenant, rent depression exceeds recovery"; "prior permission required first"; etc.). Would sit naturally on C1 PILLAR or on the Wave 5 mechanics page.
**Recommendation:** consider as a calculator/component build for the post-Wave-8 hygiene queue. Not urgent — the H2 "economic decision" section + the "When the option is the wrong answer" list together do the same work in static form for now. The component would be a clear UX upgrade if/when interactive elements are prioritised on Property.

## D-4 CROSS_NICHE_LINK — option-to-tax is a Dentists / Medical / Solicitors cluster too

**Surfaced:** 2026-05-25 at C1 step 9 (writing the "When the option is the wrong answer" section).
**Detail:** Paragraph 12 anti-avoidance and the substantially-exempt-tenant rent-depression problem are particularly acute for connected-occupier scenarios in the regulated-professional niches. A dentist or GP renting from a connected SIPP/SSAS / family-trust holding company is the textbook paragraph 12 trap (the tenant's substantially-exempt economic activity means below-80% recovery, voiding the option). Same with solicitors operating through connected property-holding SPVs.
**Recommendation:** a cross-niche cross-link from C1 / C7 to existing Dentists / Medical / Solicitors VAT pages (if any exist) would be high-value for the connected-party-trap audience. Worth grepping the niche sites for VAT option-to-tax content and surfacing the cross-link opportunity. Out of scope for in-session work; flag for post-wave hygiene if niche-site content exists.
