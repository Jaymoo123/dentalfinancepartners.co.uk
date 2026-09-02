# Brief U28 — EXTEND: Landlord Insurance Guide (add SPV/company section)

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

- **Type:** EXTEND, existing live page `Property/web/content/blog/landlord-insurance-guide-types-costs-tax-deductible.md`.
- **Slug:** `landlord-insurance-guide-types-costs-tax-deductible` (unchanged).
- **Category:** Landlord Tax Essentials.
- **Priority:** P3.
- **Hub:** run-the-company.
- **Questions answered (target, ADD only):** 5.
- **Intent of the ADD:** a landlord who has incorporated, or is about to, asking whether the policy needs to change name, whether a lender will accept it, and why the answer differs from the personal-ownership case.

## 2. Current file: outline of existing H2s

Read from the live file. Current structure, in order:

1. Intro (two paragraphs, sets up "match cover to letting model," signposts the tax-deductibility split to a separate specialist page)
2. H2 — Which landlord insurance do I need? A quick coverage selector (table)
3. H2 — Is landlord insurance a legal requirement?
4. H2 — The core landlord cover types
   - H3 — Buildings insurance
   - H3 — Contents insurance
   - H3 — Property owner's liability
   - H3 — Rent guarantee insurance
   - H3 — Legal expenses insurance
   - H3 — Landlord home emergency
   - aside (CTA)
5. H2 — Cover by property and let type
   - H3 — Standard buy-to-let
   - H3 — Houses in multiple occupation
   - H3 — Commercial and mixed-use
   - H3 — Serviced accommodation and short-term lets
   - H3 — Leasehold flats and the freeholder's policy
6. **H2 — Cover by ownership structure** (already exists, see below)
7. H2 — Are landlord insurance premiums tax deductible?
8. H2 — What drives the cost of cover
9. H2 — An anonymised scenario: from single let to HMO
10. H2 — Claims and documentation
11. H2 — Regulatory changes affecting cover, 2026 to 2028
12. H2 — Working with a specialist

**Important existing-content finding:** the page already has an H2 titled "Cover by ownership structure" (item 6 above). Its current content is thin and general: it says cover types are the same regardless of structure, and that "the tax treatment of premiums does differ between personal and company ownership, and that sits with the tax question below rather than with the cover itself," linking to the buy-to-let limited company guide. **This is the section to deepen for the ADD, not a new H2 to insert elsewhere.** The page_map instruction ("one SPV section") is already half-satisfied structurally; the ADD's job is to make that existing section actually answer the SPV-specific questions instead of deferring them.

## 3. Dominant query + full variant list (the ADD's target queries)

| Query | Type | Data |
|---|---|---|
| landlord insurance for a limited company | dominant (page_map) | page_map |
| landlord building insurance for limited company | variant (page_map) | page_map |
| limited company buy to let insurance | variant (page_map) | page_map |
| does my policy need to be in the company name | variant (page_map) | page_map, the sharpest and most concrete of the set |
| will my insurer cover an spv-owned property | variant (page_map) | page_map |
| limited company landlord insurance reviews | variant (page_map) | page_map, reviews-intent, do not chase with a reviews section (out of scope, no pricing/reviews per site convention) |
| landlord insurance for limited company | questions_corpus | questions_corpus (landlord limited company seed, misc bucket) |
| landlord insurance for limited company uk | questions_corpus | questions_corpus |
| limited company buy to let insurance | questions_corpus | questions_corpus |
| limited company buy to let landlord insurance | questions_corpus | questions_corpus |
| limited company landlord insurance uk | questions_corpus | questions_corpus |
| landlord insurance through limited company | questions_corpus | questions_corpus (ownership-structures bucket: spouse, kids, trusts, holding co, JV) |
| landlord limited company insurance | questions_corpus | questions_corpus (landlord limited company seed, misc bucket) — missing from the original table |
| limited company landlord building insurance | questions_corpus | questions_corpus, same seed — buildings-specific, and buildings is the cover the lender actually insists on, so this phrasing maps directly onto the ADD's lender point |
| limited company buy to let building insurance | questions_corpus | questions_corpus (limited company buy to let seed) |
| limited company buy to let house insurance | questions_corpus | questions_corpus, same seed — note "house insurance" is consumer phrasing for what is really landlord buildings cover; answer the underlying question, do not adopt the wording |

**Variant sweep note (2026-09-02).** A full pass over the three corpora for insurance terms confirms the set above is complete for the company/SPV angle. Everything else in the corpora under "insurance" is either National Insurance (`calculate tax and national insurance deductions`, `limited company one director uk paying ni`), vehicle-related (`car tax and insurance check`), commercial-property cover already handled by the existing page's commercial and mixed-use H3, or SIC-code queries that merely contain the word insurance (`sic code insurance agency`). **None of it belongs in this ADD**, and the National Insurance rows in particular are a homograph trap, not demand for this page.

## 4. Our-data baseline

No page in the estate currently targets any company/SPV insurance variant with substantive content; the existing "Cover by ownership structure" H2 exists but defers the SPV-specific answer rather than giving it. No GSC/Bing signal currently attaches to these variants specifically.

## 5. Competitor coverage floor

- No dedicated competitor SPV-insurance page identified in `competitor_urls.csv`; treat as a coverage gap consistent with page_map's verdict that a standalone page would sit directly on top of the existing guide.
- The existing page's own house style (no premium figures quoted, "we do not quote figures on this site," discovery-call CTA instead) must be preserved in the ADD; do not introduce numeric premium ranges here even though the query set implies cost curiosity.

## 6. Seam warnings — MUST-NOT rules

1. **EXTEND, not NEW.** Page_map is explicit: "not enough distinct intent for a page, and a new page would sit directly on top of it." All ADD content lands inside the existing "Cover by ownership structure" H2, deepened, not as a new top-level section elsewhere on the page.
2. **The ADD must cover exactly three things and no more:** the policy in the company's name, the lender requirement, and why a personal-name policy fails. This is the precise scope handed down; do not expand into a full company-insurance-types comparison (the existing "core landlord cover types" and "cover by property and let type" sections already establish that cover types do not change by ownership structure, and that finding still holds, it does not need re-litigating for a company).
3. Do not build a premium-comparison or cost table for company vs personal ownership. The page's house style explicitly avoids quoting figures; the ADD must match this, not introduce a new numeric section that breaks the page's established voice.
4. Do not re-explain SPV formation, SIC codes or company naming. This page is insurance only; if the reader's real question is "should I even set up an SPV," point to the buy-to-let limited company guide (already linked from the existing section) in one line, do not re-argue it.

## 7. Facts pack for the ADD (dated; verify against `docs/property/house_positions.md`, else verify-at-write)

- **No dedicated house_positions lock exists for landlord-insurance-and-company-ownership mechanics, and no authoritative single public source exists to lock one against** (checked 2026-09-02 as part of this wave's source-verification pass; unlike the Companies House fees and the devolved registration schemes, there is no gov.uk or regulator page that states the corporate-landlord insurance position). This is an insurance-market practice question resting on general insurance-contract law, not a tax or statutory one, so the substantive content stays **verify-at-write** against insurer and broker guidance current at time of writing. **Treat the insurable-interest principle as safe and everything about market practice as needing a current check; do not manufacture a false citation to fill the gap.**
- **The policy must be in the name of the legal owner of the property.** Where the property is held by a limited company (an SPV), the insurable interest sits with the company, not with the individual director or shareholder. A policy taken out in a director's personal name over a company-owned property is very likely to fail at claim stage because the policyholder does not hold the insurable interest in the property being insured. **This is the core answer to "does my policy need to be in the company name" and "why a personal-name policy fails" — mark the precise legal-doctrine framing (insurable interest) as verify-at-write for current insurer/FCA-conduct-rules phrasing, but the underlying principle (cover follows legal ownership) is safe to state plainly.**
- **Lenders financing an SPV-owned property will typically require the buildings insurance policy to be arranged in the company's name**, with the lender noted as an interested party or having its interest noted on the policy, mirroring the existing page's own point (in the core cover types section) that "it is the cover lenders insist on... with the lender named on the policy." Extend that existing fact to the company context: the named policyholder is the company, not the individual.
- **Cover types do not change; only the policyholder identity does.** This restates and reinforces the existing section's current (correct but underdeveloped) claim that "the core cover types are the same whether you hold property personally, in a partnership or through a limited company." The ADD should keep this framing but make it concrete with the three specific points (policy name, lender requirement, personal-name failure) rather than leaving it abstract.
- **Portfolio/multi-SPV insurers.** Insurers offering multi-property and portfolio policies (already mentioned on the existing page) commonly accommodate a single company holding multiple properties, or a group structure with several SPVs, under one arrangement or a linked set of policies; verify current market practice at write time if the writer wants to state this with more confidence than "commonly."
- **Companies House incorporation fee: £100 online/software, £124 paper** (per `house_positions.md` §42) — not directly relevant to insurance, do not include in the ADD.

## 8. Interlink spec for the ADD (verified against files on disk)

- `/spv-company` (U01 pillar, live route) — check whether the existing "Cover by ownership structure" section links up to the pillar; add if missing.
- `buy-to-let-limited-company-complete-guide-uk` (already linked from the existing "Cover by ownership structure" section per the live file's text) — keep this link, do not remove it, it is the correct handoff for "should I incorporate."
- `sic-code-for-an-spv-property-company` (U09, live) — not directly relevant, do not link.
- `how-to-set-up-property-investment-company-uk-guide` (U02, live) — optional one-line link if the deepened section needs to gesture at "once your SPV is formed" without re-explaining formation.

## 9. Precise ADD spec

**Deepen the existing "Cover by ownership structure" H2 (do not rename it, do not move it). Current content stays as the opening framing (cover types are structure-agnostic); append the following as the section's substantive close, replacing the current one-line deferral of the ownership question with the actual answer.**

Content to cover, roughly 200-300 words added to the existing section:

1. Direct answer: yes, if the property is held by a limited company, the buildings (and any other) insurance policy should be arranged in the company's name, because the company is the legal owner and holds the insurable interest, not the director or shareholder personally.
2. One paragraph: what a lender financing the SPV typically requires (policy in the company's name, lender's interest noted), mirroring and extending the existing buildings-insurance H3's point about lenders insisting on cover.
3. One paragraph: why a policy left in a director's personal name over a company-owned property is a real and common gap, framed the same way the existing "anonymised scenario" section on the page frames the single-let-to-HMO gap (a described failure mode, no numbers, no client names, consistent with the site's anonymised-scenario convention already established on this page).
4. Keep the existing closing sentence's link to the buy-to-let limited company guide for the tax-treatment handoff; do not duplicate tax content here.

**FAQ additions (append 5 to the existing `faqs` frontmatter array, do not remove or renumber existing FAQs):**

- "Does my landlord insurance need to be in my company's name?" — yes, direct answer, insurable-interest framing.
- "Will my insurer cover a property owned by my SPV?" — yes, provided the policy is correctly arranged in the company's name; standard buy-to-let and portfolio insurers write cover for corporate landlords.
- "What happens if my insurance policy is in my own name but the company owns the property?" — the claim risk explained in point 3 above, one paragraph.
- "Does a lender require the insurance to be in the company's name for an SPV mortgage?" — yes, typically, with the lender's interest noted; cross-reference rather than duplicate the existing buildings-insurance FAQ on lender requirements.
- "Do I need different insurance if I transfer my property from personal ownership into a limited company?" — no different cover type, but the policy must be re-arranged in the new company's name at the point of transfer; do not leave the old personal-name policy running past completion.
