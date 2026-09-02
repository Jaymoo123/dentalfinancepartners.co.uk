# Brief U14 — EXTEND: Landlord VAT Registration (add SPV/company section)

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

- **Type:** EXTEND, existing live page `Property/web/content/blog/landlord-vat-registration-when-required.md`.
- **Slug:** `landlord-vat-registration-when-required` (unchanged).
- **Category:** Landlord Tax Essentials.
- **Priority:** P3.
- **Hub:** sic-companies-house-admin cluster (page_map cluster label for this row).
- **Questions answered (target, ADD only):** 3.
- **Intent of the ADD:** a landlord who has already incorporated, or is deciding whether to, asking whether the company changes the VAT answer.

## 2. Current file: outline of existing H2s

Read from the live file. Current structure, in order:

1. Intro (two paragraphs, direct-answer style)
2. H2 — The VAT Position of Different Rental Income Streams (table)
3. H2 — The £90,000 Registration Threshold (2026/27)
   - H3 — Worked example: holiday-let landlord crossing the threshold mid-year
   - aside (CTA)
4. H2 — The Option to Tax (Commercial Property)
   - H3 — Why opt
   - H3 — Why not
   - H3 — Anti-avoidance disapplication
5. H2 — Holiday Accommodation VAT (Unchanged by FHL Abolition)
6. H2 — Bundled Services and the Single Supply / Multiple Supply Test
7. H2 — MTD for VAT: Mandatory From Day One
8. H2 — De-registration: The £88,000 Threshold
   - aside (CTA)
9. H2 — Common Landlord VAT Mistakes
10. H2 — When to Register (Decision Summary, table)
11. H2 — Related Reading

No section currently addresses company/SPV ownership at all. The whole page is written as if the reader owns personally.

## 3. Dominant query + full variant list (the ADD's target queries)

| Query | Type | Data |
|---|---|---|
| limited company vat registration | dominant (page_map) | page_map, 390/mo |
| does an spv need to register for vat | variant (page_map) | page_map |
| vat on rental income in a limited company | variant (page_map) | page_map |
| limited company vat threshold | variant (page_map) | page_map |
| do i charge vat on residential rent through a company | variant (page_map) | page_map |
| buy to let limited company vat registration | variant | questions_corpus (tax in company bucket) |
| can an spv be vat registered | variant | questions_corpus (spv seed, "tax in company" bucket) — **the sharpest SPV-specific phrasing in the corpus and it was missing from this table.** Note it asks CAN, not MUST, and the honest answer is a genuine yes-but: a company with no taxable supplies cannot register on a compulsory basis and has nothing to reclaim, so the answer is not simply "no". Cover it in the new section's direct answer and make one of the three FAQ additions carry this phrasing. |

**Variant sweep note (2026-09-02).** A full pass over the three corpora for VAT terms found no further company/SPV VAT phrasings beyond those above. The adjacent VAT volume in the corpora is sole-trader-to-limited-company transition demand (`can i keep my vat number from sole trader to limited company`, `change of vat status from sole trader to limited company`, `can you transfer your sole trader vat number to a limited company`, several with live Bing impressions) which already resolves to the generalist site's `how-to-switch-from-sole-trader-to-limited-company` page. **Do not pull that intent onto this page.** A property landlord incorporating is not a VAT-registered sole trader transferring a registration, and answering it here would both duplicate a live page on another estate site and dilute the residential-exemption answer this ADD exists to give.

**Seam-critical finding:** every one of these variants has the same honest answer as the personal-ownership case, because VAT exemption for residential letting (VATA 1994 Sch 9 Group 1) is a property-and-supply test, not an ownership-structure test. The £90,000 threshold, the option to tax, and the exempt/standard-rated distinctions already fully explained on this page apply identically whether the landlord is an individual or a company. **This is precisely why page_map verdicts this EXTEND rather than a new page: the honest answer is short.**

## 4. Our-data baseline

No page in the estate currently targets any company/SPV VAT variant directly. The existing page's own GSC/Bing performance (whatever it is at write time) is the baseline to preserve; the ADD should not disturb ranking on the existing personal-landlord queries by diluting the page's focus.

## 5. Competitor coverage floor

- https://taxqube.co.uk/setting-up-a-special-purpose-vehicle-spv-to-purchase-properties/ — check whether it addresses VAT for an SPV at all (likely a brief mention given the same "residential is exempt" answer).
- No dedicated "SPV VAT" competitor page identified in `competitor_urls.csv`; this supports the page_map instruction not to build a standalone page, since even competitors are not treating it as a distinct topic.

## 6. Seam warnings — MUST-NOT rules

1. **NEVER build a separate SPV-VAT page.** Residential letting is VAT-exempt regardless of ownership structure, so the honest answer is short: this is a section on the existing page, not a new unit. Page_map is explicit on this and it is locked.
2. **The ADD is one company/SPV section, not a parallel structure running through every existing H2.** Do not rewrite the threshold, option-to-tax, holiday-accommodation or bundled-services sections to add "...and this applies to companies too" caveats throughout; that duplicates content and bloats the page. Say it once, in the new section, and let the rest of the page's mechanics stand as already correct for any VAT-registered person, individual or company.
3. Do not turn the new section into a Corporation Tax or Section 24 comparison. The existing page already stays narrowly on VAT; the ADD must do the same. If the reader's real question is "should I incorporate," that is out of scope here entirely, point to `limited-company-vs-personal-ownership-tax-comparison-2026` in one line if needed.
4. Do not restate SIC codes, formation mechanics or company naming. This page is VAT only.

## 7. Facts pack for the ADD (dated; verify against `docs/property/house_positions.md`, else verify-at-write)

- **VAT exemption is a supply test, not an ownership test.** VATA 1994 Sch 9 Group 1 exempts the grant of an interest in or right over residential land, regardless of whether the grantor is an individual, a partnership or a company. Same statutory basis the existing page already cites (§3183 in-file per its own text, and consistent with `house_positions.md` §29.12's VATA 1994 Sch 1 / Sch 9 Group 1 architecture references).
- **The £90,000 registration threshold and £88,000 de-registration threshold apply per legal person, not per property.** For a landlord running multiple SPVs, each company is normally assessed separately against the threshold (each SPV is its own VAT-registrable legal person), unlike the Corporation Tax small-profits-rate divisor mechanic at `house_positions.md` §21.A (associated companies share the CT small-profits band; VAT registration does not work that way). **This distinction (VAT is per-company, not shared across a group like the CT SPR divisor) is worth one clear sentence, because landlords used to the CT associated-company rule may wrongly assume VAT thresholds are shared too.** Verify the VAT group-registration exception at write time: companies under common control CAN apply for VAT group registration (treated as one entity for VAT), which is the one scenario where thresholds are effectively combined; this is opt-in, not automatic, and out of scope for anything beyond a one-line mention.
- **Anti-disaggregation (single-taxable-person direction) risk.** `house_positions.md` §29.12 locks VATA 1994 Sch 1 paras 1A and 2: HMRC can direct that artificially separated businesses (including multiple SPVs structured mainly to keep each under the VAT threshold) be treated as a single taxable person. This is directly relevant to a multi-SPV landlord asking "does an spv need to register for vat" if the real driver is threshold-avoidance via fragmentation. Mention briefly with a link to the existing site's artificial-separation content if it exists (`artificial-separation-and-vat-key-insights-from-cases.md` is live on disk); do not build out the case law here, one sentence plus a link.
- **Option to tax works the same for a company-owned commercial property** as for an individual, per the existing page's own Sch 10 content; no different mechanics for a corporate landlord.
- **Companies House incorporation fee: £100 online/software, £124 paper** (per `house_positions.md` §42) — not directly relevant to VAT, do not include; flagged here only to confirm the writer should not conflate incorporation cost with VAT registration cost (there is no separate VAT registration fee at all, for either individual or company; confirm this remains true at write time).

## 8. Interlink spec for the ADD (verified against files on disk)

- `/spv-company` (U01 pillar, live route) — add if not already linked from this page; check the live file's Related Reading section and add if missing.
- `sdlt-group-relief-for-corporate-landlord-portfolios` (U23, live, being extended in this same wave) — not directly relevant to VAT, do not link.
- `artificial-separation-and-vat-key-insights-from-cases` (live at `Property/web/content/blog/artificial-separation-and-vat-key-insights-from-cases.md`) — link from the anti-disaggregation sentence.
- `limited-company-vs-personal-ownership-tax-comparison-2026` (referenced live in `sic-code-for-an-spv-property-company.md`, confirm it exists on disk before linking) — one-line link if the reader's real question is the incorporation decision, not VAT.
- `how-to-set-up-property-investment-company-uk-guide` (U02, live) — optional, only if the new section needs to gesture at "if you're setting up an SPV" without re-explaining formation.

## 9. Precise ADD spec

**Insert one new H2, positioned after "The VAT Position of Different Rental Income Streams" (item 2 in §2 above) and before "The £90,000 Registration Threshold" (item 3), since the company question is best answered immediately after the reader understands what counts as taxable at all, and before the mechanics of the threshold that then apply identically.**

**H2 — Does it make a difference if I hold the property through a limited company?**

Content to cover, honestly and briefly (this section should not exceed roughly 200-300 words of prose, consistent with the page_map instruction that "the honest answer is short"):

1. Direct answer: no, VAT exemption for residential letting depends on the supply (what is let and how), not on who owns it. An SPV holding and letting residential property is in exactly the same VAT position as an individual landlord: no taxable supplies, no registration possible or needed, on a pure residential portfolio.
2. One sentence: the £90,000/£88,000 thresholds apply per company where a landlord runs multiple SPVs, each assessed on its own taxable supplies (which, for most residential-only SPVs, will always be nil).
3. One sentence plus link: HMRC can direct that artificially separated SPVs be treated as one taxable person under anti-disaggregation rules, if the separation exists mainly to avoid VAT registration; link to `artificial-separation-and-vat-key-insights-from-cases`.
4. One sentence: where the company holds commercial property or a mix (holiday lets, commercial with option to tax), the same rules already explained above apply without modification, no need to repeat them here.
5. No table needed for this section; the existing page's tables already cover the substance.

**FAQ additions (append 3 to the existing `faqs` frontmatter array, do not remove or renumber existing FAQs):**

- "Does an SPV need to register for VAT on residential rent?" — no, same exemption as personal ownership, one paragraph.
- "Do I charge VAT on rent if I own through a limited company?" — no for residential, same answer, cross-reference the existing exemption FAQ rather than duplicating its full explanation.
- "Does each SPV in my portfolio have its own VAT threshold?" — yes, per company, subject to the anti-disaggregation caveat; link to the artificial-separation page.
