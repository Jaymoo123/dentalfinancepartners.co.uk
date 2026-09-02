# Brief U23 — EXTEND: SDLT Group Relief for Corporate Landlord Portfolios (add plain-language opening H2)

## Editorial conventions (hard rules, every brief)

- £nnn always. Per cent in prose, % in tables.
- Hyphenated compound modifiers.
- Sentence-case H2s.
- No em-dashes anywhere in the body copy.
- No templated second paragraph.
- FAQs must be distinct questions, never restatements of the same query.
- No build narration, no inline citation codes.
- Citations verified against `docs/property/house_positions.md` where a lock exists; else flagged verify-at-write.
- Tables use `<thead>`/`<tbody>`. Asides wrap text in `<p>`.

## 1. Unit facts

- **Type:** EXTEND, existing live page `Property/web/content/blog/sdlt-group-relief-for-corporate-landlord-portfolios.md`.
- **Slug:** `sdlt-group-relief-for-corporate-landlord-portfolios` (unchanged).
- **Category:** Incorporation & Company Structures.
- **Priority:** P3.
- **Hub:** transfer-in cluster.
- **Questions answered (target, ADD only):** 2.
- **Intent of the ADD:** a reader typing the plain phrasing "transfer property between limited companies" who has no landing point today, needing a fast plain-language orientation before the page's existing technical Schedule 7 depth.

## 2. Current file: outline of existing H2s

Read from the live file. Current structure, in order:

1. Intro (two paragraphs, sets up the practical scenarios: development-stage SPV to long-hold vehicle, refinancing move, planning-consent reorganisation)
2. H2 — The four qualifying conditions
3. H2 — The 75% subsidiary test: direct and indirect ownership (table)
4. H2 — The commercial-purpose test
   - aside (CTA)
5. H2 — How the SDLT return is filed
6. H2 — The 3-year clawback rule
7. H2 — Exceptions to the clawback
8. H2 — Worked example: four-SPV portfolio restructure (table)
   - aside (CTA)
9. H2 — Common failure patterns on group relief claims
10. H2 — Interaction with other SDLT routes (table)
11. H2 — Internal links and further reading

The page opens directly into the four qualifying conditions with no plain-language framing first. A reader who searched "transfer property between limited companies" and landed here would hit "Schedule 7," "75% subsidiary," and "commercial purpose test" in the first two paragraphs with no orientation.

## 3. Dominant query + full variant list (the ADD's target queries)

| Query | Type | Data |
|---|---|---|
| transfer property between limited companies | dominant (page_map) | page_map, "currently has no landing point" |
| moving a property from one of my companies to another | variant (page_map) | page_map, plain-language phrasing |
| intra-group property transfer sdlt | variant (page_map) | page_map, semi-technical phrasing |
| sdlt group relief clawback | variant (page_map) | already well covered by the existing page's clawback H2, no ADD content needed for this variant |
| transfer property to a holding company | variant (page_map) | page_map, adjacent phrasing (holding company specifically, not sister-to-sister) — **handle with care, see the holding-company warning below** |
| transfer property between limited companies | our-data | demand_corpus, mapped exactly to this slug already (bucket "transfer-in (CGT, SDLT, s162)") — confirms this page is the intended destination, the ADD closes the on-page landing gap, not a routing gap |

**Holding-company warning (added 2026-09-02 from a corpus sweep).** The "transfer property to a holding company" variant sits next to a dense and already-hosted holding-company cluster: `close-investment-holding-company-property` and `types-of-property-company-structure-uk-guide` on Property, and `holding-company-structure-uk-tax` on the generalist site, all live and all carrying real Bing impressions (`close investment holding company` 20 imp, `does a holding company in the uk pay corporation tax`, `amn spv within a holding company`, `can you have a holding company with just one property`). The new opening section may use "holding company" as one plain-language way of describing a group parent, in passing. **It must not explain what a holding company is, why you would use one, or how a group is structured for tax.** That is three other pages' territory and the ADD is 150-250 words. Keep the section on the SDLT question the page owns: property already in one company, moving to another in the same group.

**Seam-critical finding:** the plain-language query already resolves (per demand_corpus's own mapping) to this exact page. The problem is not routing, it is that the page currently gives that reader no plain-language entry point before the statutory depth begins. The ADD fixes the landing experience, not the SEO destination.

## 4. Our-data baseline

- `transfer property between limited companies` — demand_corpus row, mapped to this slug's cluster (`transfer-in (CGT, SDLT, s162)`), confirming intent-match already exists at the routing level.
- No separate volume figure captured in the page_map row for this query (marked "-" for volume_if_any); treat as a coverage/experience fix, not a volume-recovery play.

## 5. Competitor coverage floor

- No new competitor research needed for the ADD; the existing brief's competitor floor (if any was set at original build) still governs the technical depth, which is untouched. If a plain-language competitor example is wanted for the opening section's framing, taxqube.co.uk's general SPV-formation content is the nearest comparator on disk (`competitor_urls.csv`), but this ADD does not require new competitor citations.

## 6. Seam warnings — MUST-NOT rules

1. **The ADD is an opening H2 in plain language, nothing more.** It answers "can I move a property from one of my companies to another, and does it cost SDLT" in everyday terms, then hands off to the existing technical content. It does not duplicate the four qualifying conditions, the 75% test or the clawback mechanics; it previews them in one sentence each and links down to the existing H2s using in-page anchors where the CMS supports them, or plain prose pointers if not.
2. **Technical Schedule 7 content stays exactly as is.** Do not simplify, shorten or rewrite the existing qualifying-conditions, 75%-test, commercial-purpose, clawback or worked-example sections. This is an addition, not a rewrite.
3. Do not turn the new opening section into a second worked example. The page already has one (the four-SPV Greenholt restructure); the new section illustrates with one or two short plain-language sentences, not a new named scenario.
4. Do not conflate this page's group-relief route with incorporation relief or the SLP partnership route. The existing page already distinguishes these in its "Interaction with other SDLT routes" table; the new opening section may gesture at "this is for property already owned by a company moving to another company in the same group, not for bringing personally-owned property into a company for the first time" in one sentence, but must not re-explain incorporation relief.

## 7. Facts pack for the ADD (dated; verify against `docs/property/house_positions.md`, else verify-at-write)

- **The plain-language answer, restated from the existing page's own locked content:** a transfer between companies in the same 75%-owned group can happen free of SDLT under Section 62 and Schedule 7 Finance Act 2003, subject to a commercial-purpose test and a 3-year clawback if the receiving company later leaves the group still holding the property. This is not new content, it is the plain-English compression of what the page already establishes; the ADD's job is to say this in one paragraph before the statutory build-out begins.
- **§1.G mini-lock (`house_positions.md`)** confirms the same core facts already on the live page: 75% test on ordinary share capital, distributable profits and winding-up assets (all three limbs); anti-avoidance under para 2; 3-year clawback under para 3; recovery from connected parties under para 5. No new facts needed for the plain-language opener beyond what the page already carries correctly.
- **Distinguish from a transfer INTO the group from a third party (not covered by group relief at all).** The existing page's own FAQ already makes this point ("Does the relief work for a transfer into the group (third-party seller)? No."). The new opening section should flag this distinction early, in plain language, since "moving a property from one of my companies to another" implies both companies already exist and are already grouped, which is exactly the scenario the relief is built for, whereas a reader who actually means "I want to move a personally-owned property into a company" needs a different page (`how-to-set-up-property-investment-company-uk-guide` / incorporation relief content) and should be redirected there in one sentence, not left to read the whole Schedule 7 page under a false premise.

## 8. Interlink spec for the ADD (verified against files on disk)

- `/spv-company` (U01 pillar, live route) — check the existing page's current links; add if missing from the up-link chain.
- `how-to-set-up-property-investment-company-uk-guide` (U02, live) — mandatory link from the "if you mean moving personally-owned property into a company, that's a different question" redirect sentence.
- Existing internal anchors already on the page (four-qualifying-conditions H2, 75%-test H2, clawback H2) — the new opening section should point down to these using descriptive link text or anchor links if the CMS renders in-page anchors; verify anchor-link support in the live rendering pipeline before committing to `#anchor` syntax, otherwise use plain prose signposting ("the four conditions below," "the clawback rule further down this page").

## 9. Precise ADD spec

**Insert one new H2 immediately after the existing intro paragraphs and before "The four qualifying conditions" (item 2 in §2 above).**

**H2 — Can I transfer a property between my limited companies without paying SDLT?**

Content to cover, in plain language, roughly 150-250 words:

1. Direct answer up top: usually yes, if both companies are in the same corporate group (one owns at least 75% of the other, or both are 75%-owned by a common parent), and the transfer is genuinely commercial rather than tax-engineered. This is SDLT group relief, and it can reduce the SDLT due on the transfer to nil.
2. One sentence distinguishing this from bringing personally-owned property into a company for the first time (that is incorporation relief, a different regime, link to U02).
3. One sentence flagging the catch that trips people up: the relief can be clawed back if the receiving company later leaves the group within 3 years while still holding the property, so this is not a decision to make without checking the exit plan.
4. A short signpost sentence pointing to what follows: the four conditions that must all be met, the 75% test, the commercial-purpose test and the clawback rule are set out in full below.
5. No new table for this section.

**FAQ additions (append 2 to the existing `faqs` frontmatter array, do not remove or renumber existing FAQs):**

- "Can I move a property from one of my limited companies to another without paying SDLT?" — plain-language restatement of the direct answer, distinct wording from the existing "What is the 75% subsidiary test" FAQ, cross-reference rather than duplicate.
- "Is moving property between my own companies the same as transferring it into a company for the first time?" — no, distinguishes group relief (existing company-to-company) from incorporation relief (personal-to-company), link to U02.
