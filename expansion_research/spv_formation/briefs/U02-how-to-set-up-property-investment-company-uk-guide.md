# Brief U02 — How to Set Up a Property Investment Company (UK Guide) — EXTEND

## 1. Unit facts

- **Type:** EXTEND existing file `Property/web/content/blog/how-to-set-up-property-investment-company-uk-guide.md` (live, 276 lines, category "Incorporation & Company Structures").
- **Priority:** P1.
- **Hub:** formation-mechanics.
- **Questions answered (target):** 22.
- **Gap being closed:** the page is strategy-shaped (should-you, tax comparison, high-level steps). It is missing the literal Companies House mechanics a reader needs to actually file: IN01 field-by-field detail, share capital choice, PSC statement content, ECCTA identity verification process, a realistic timeline, and what a lender wants to see on day one.

## 2. Dominant query + full variant list

| Query | Type | Data |
|---|---|---|
| how to set up an spv company | question (dominant) | page_map, 30/mo |
| how to set up spv | question | page_map variant |
| how to open spv company | question | demand_corpus |
| set up spv companies house | action | page_map / demand_corpus |
| how to start a property limited company | question | page_map variant |
| set up an spv limited company | action | page_map / demand_corpus |
| how to start an spv | question | questions_corpus.csv |
| how to register spv company | action | questions_corpus.csv |
| how to set up spv company | question | questions_corpus.csv |
| how spv is formed | question | demand_corpus, formation mechanics bucket |
| setting up a spv to buy property | conversational | demand_corpus |
| setting up a property limited company | action | page_map variant, phrasing family |
| what do i need to register an spv | question | page_map variant |
| set up limited company for property investment | action | our_queries.csv, GSC, pos 72.1, 26/mo — the live page's own ranking query, currently weak |
| create btl limited company uk | action | our_queries.csv, pos 61.4, 31/mo |
| company formation accountant / company formation accountants / limited company formation accountant | conversational (adjacent) | our_queries.csv (generalist site data), "how to set up" bucket — signals the service-adjacent framing to keep in the aside/CTA |
| how spv works / how does an spv company work | question | demand_corpus, formation mechanics/misc — background context, do not let this pull the page back toward "what is an SPV" (owned elsewhere) |

## 3. Our-data baseline

- The live page's own tracked query, **"set up limited company for property investment"**, sits at **GSC pos 72.1, 26 impressions/mo** — the page exists but is not competing; the ADD content targets this directly (mechanics depth is what's missing versus competitors ranking above it).
- **"create btl limited company uk"** — pos 61.4, 31 impressions/mo, same page.
- No cost/mechanics-specific query from our own data currently outranks pos 60; this is a genuine content-depth gap, not a cannibalisation risk.

## 4. Competitor coverage floor

- https://taxqube.co.uk/how-to-set-up-your-own-limited-company/ — direct mechanics competitor.
- https://taxqube.co.uk/setting-up-a-special-purpose-vehicle-spv-to-purchase-properties/ — direct SPV-formation competitor, property-specific.
- https://www.provestor.co.uk/propertytaxshow/landlord-mistakes-setting-up-ltd-company — mechanics-adjacent, mistakes-framed.
- https://www.provestor.co.uk/help/limited-companies/what-is-a-confirmation-statement — CH admin depth benchmark for the mechanics section.
- https://www.hollowaydavies.co.uk/blog/incorporation-and-structure/what-does-a-company-formation-accountant-do — generalist-site sibling ranking pos 15.2-22.3 on "company formation accountant" phrasing; benchmark for how much IN01 detail a competing page in the same estate already carries.
- https://www.hollowaydavies.co.uk/blog/incorporation-and-structure/register-limited-company-uk-non-resident-director — benchmark for field-level CH mechanics depth (non-resident director angle not in scope here, but the mechanics detail level is the bar).

## 5. What to ADD (seam rule)

Keep all existing strategy content (should-you test, tax comparison, share-structure planning, alphabet shares, VAT/PAYE triggers, ATED, MTD, common mistakes) intact. ADD the literal Companies House mechanics walkthrough currently missing:

- **IN01 fields, field-by-field:** what the online-equivalent form actually asks for at each screen (company name check, registered office + registered email, SIC codes, director details incl. service address vs residential address distinction, statement of capital detail — nominal value, currency, class, amount unpaid, articles of association choice — model vs bespoke, PSC statement content).
- **Share capital choice, explained as a decision:** how many shares to issue and at what nominal value (e.g. 1 share of £1 vs 100 shares of £1) and why it matters for later share transfers/alphabet shares — mechanics only, the tax-planning angle stays where the alphabet-shares guide owns it.
- **PSC statement:** what "significant control" means in filing terms (25%+ shares/voting rights, right to appoint/remove majority of directors, significant influence) and what gets entered on the form.
- **ECCTA identity verification — the actual process:** direct verification via GOV.UK One Login vs verification through an ACSP; what documents are needed; when it happens in the filing sequence (this is now mandatory, not "transitional" — see facts pack).
- **Realistic timeline:** name-check → filing → certificate of incorporation → bank account → CT activation, with realistic day-counts at each stage (not just the "24 hours" CH processing figure already on the page — the ADD content should thread the whole sequence, including bank account approval lag, which the current page doesn't estimate).
- **What a lender wants to see on day one:** SIC codes matching a clean property SPV, registered office not obviously a residential address if avoidable, PSC/director identity verification complete, no unrelated trading activity — written as a short subsection so a reader forming the company with a mortgage in mind knows what "lender-ready" looks like at incorporation, distinct from the existing "lenders prefer an SPV" strategy paragraph already on the page.

## 6. Facts pack (dated; verify against `docs/property/house_positions.md`)

- **Companies House incorporation fee: £100 online/software, £124 paper.** Verified against gov.uk Companies House fees page, updated 2 July 2026. CH fees verified current 2026-09-01, do not change. The live page's existing £100/£124 figures are correct — do not touch them.
- **Confirmation statement fee: £50 online, £110 paper.**
- ACSP regime live since **18 March 2025**; third-party filing becomes ACSP-only from **~November 2026** — relevant to the "who can file for you" mechanics.
- Identity verification mandatory for directors/PSCs **since 18 November 2025** — the existing FAQ answer ("existing directors must verify in the transition window... typically by their next confirmation statement") should be checked against current status: if the transition window has closed by publish date, the language needs updating to reflect verification as a live, not phasing, requirement.
- SIC codes 68100/68209/68320 — page already states these correctly per the page_map/house_positions cross-reference; do not change without checking Track B's SIC post first.
- Corporation Tax 19%/25%/marginal relief — already correct on the page.
- Finance Act 2026 reducer to 22% from April 2027 — already correct on the page.

## 7. Interlink spec

The page already links extensively (Section 24 guide, section-24-vs-incorporation, buy-to-let-limited-company-complete-guide-uk, alphabet-shares guide, property-investment-company-structure-planning, salary-vs-dividends, incorporating-property-portfolio-uk-2026, MTD guide, property-accountant-services pages, spv-property-investment-special-purpose-vehicle-guide). Keep all of these. ADD:

- `/spv-company` (U01, once live) — as the pillar/hub link, likely from the intro or a "see the full SPV hub" callout.
- `spv-company-formation-cost-uk` (U03, once live) — link from the CH fee section ("for the full year-one cost picture including accountant and bank fees, see...").
- `spv-company-bank-account` (U05, once live) — link from Step 4 (bank account) once built, replacing/supplementing the generic bank-account paragraph.
- `spv-company-name-rules-uk` (U04, once live) — link from the company-name bullet in Step 1.
- `registered-office-address-property-spv` (U06, once live) — link from the registered-office bullet in Step 1.
- `spv-first-year-accounts-and-filing-timeline` (U12, once live) — link from Step 7 (bookkeeping/compliance calendar).

## 8. Current H2 outline — KEEP / ADD

| Section | Action |
|---|---|
| Intro (no H2) | KEEP |
| H2 Should you set up a property investment company at all? | KEEP |
| H3 How a property company is taxed, in brief | KEEP |
| H2 Step 1: Choose your structure and decide on an SPV | KEEP, minor ADD: fold in "what a lender wants to see on day one" as a short closing paragraph or callout within this step |
| H3 Choosing the right SIC codes for a property company | KEEP |
| H2 Step 2: Decide your share structure before you incorporate | KEEP, ADD: the share-capital-choice mechanics (nominal value, number of shares) as new content under this H2 — currently this section is planning-only, not mechanics |
| H2 Step 3: Register your property company with Companies House | ADD (major): this is the primary ADD location — expand into full IN01 field-by-field walkthrough, PSC statement mechanics, ECCTA identity-verification process. Fee table stays £100 online/software and £124 paper (both verified current 2026-09-01) — the £50 figure is the CONFIRMATION STATEMENT fee, never the incorporation fee; do not conflate them. |
| H3 What you need to register a property company | KEEP, but rewrite as the field-by-field list rather than a bare bullet list, absorbing the IN01 detail |
| H3 Identity verification is now mandatory | ADD: expand into the actual verification process (One Login vs ACSP route, documents, timing), correcting "transition window" language if closed by publish |
| H3 The Companies House registration fee | KEEP figures as-is (£100 online / £124 paper, verified current); ADD a realistic end-to-end timeline (name check → filing → certificate → bank → CT) here or as a new H3 |
| H2 Step 4: Open a business bank account | KEEP, minor ADD: link to U05 once live |
| H2 Step 5: Activate Corporation Tax (CT41G is no longer used) | KEEP |
| H2 Step 6: VAT, PAYE and employer obligations | KEEP |
| H2 Step 7: Set up bookkeeping and a compliance calendar | KEEP, minor ADD: link to U12 once live |
| Aside (CTA) | KEEP |
| H2 What about properties you already own personally? | KEEP |
| H2 Higher-value properties: the ATED point most new owners miss | KEEP |
| H2 Does Making Tax Digital apply to a property company? | KEEP |
| H2 Common mistakes when setting up a property company | KEEP, consider ADD one bullet: "getting the IN01 details wrong / mismatched PSC statement" if it fits naturally |
| H2 Getting your property company set up correctly (summary) | KEEP, correct the £100/£124 fee reference in the numbered list |
| FAQ (frontmatter) | ADD 3-5 new Q&As covering: IN01 field specifics, ECCTA verification process detail, realistic timeline, what a lender wants on day one, share-capital-choice mechanics. The existing "How much does it cost to register" FAQ answer is correct as-is (£100/£124) — do not change |
