# Review A: `/services/property-accountant` (draft 2)

Reviewer A, 2026-10-09. Read: rendered `Property/web/.next/server/app/services/property-accountant.html` (text and JSON-LD), `ANSWER_PATTERN_SPEC_services_2026-10.md`, `property-accountant.pack.md` §1, §2, §3, §5, §6, `house_positions.md`, `VERIFY_property-accountant_draft2.md`. Line numbers below are to those files ("spec", "pack", "HP", "verify"). Page source was opened read-only to check one citation comment (`page.tsx:539-542`); nothing was edited.

Totals: **2 BLOCK, 25 FIX, 7 NOTE.**

## Findings

| # | Section | Type | Quote (verbatim from the page) | Rule broken | Replacement |
|---|---|---|---|---|---|
| 1 | Specialist property accountants, not a general practice (point "Joint ownership") | BLOCK | "Joint owners are taxed on a default split unless an election changes it, and the election has to match who really owns what." | HP §24.1 critical scope note (HP:1573): the 50/50 default and the Form 17 election apply to spouses and civil partners only; HP §24.6 (HP:1663): unmarried co-owners have no Form 17 route and are taxed on actual beneficial shares. Pack §0 (pack:9): no house-positions citation sits next to this sentence (`page.tsx:539-542` has none, unlike its neighbours). | "Married couples and civil partners who own jointly are taxed 50/50 unless they elect otherwise, and the election has to match who really owns what; other co-owners are taxed on their actual shares. We check that the returns, any election and the title agree." |
| 2 | Where we work | BLOCK | "We work with clients anywhere in the UK from one team, and five city pages describe local work:" and "Wherever you are, the service, the accountants you deal with and the way we agree fees stay the same." | Spec §3 (spec:64): do not lift copy that contradicts the privacy line "More than one firm may receive your enquiry". The form on this same page says "If that firm is unable to help, your details may be passed to another firm in the network for the same purpose." `SCHEMA_F_report.md`: "One team" is a staffing claim with no source. | "We work with clients anywhere in the UK, and five city pages describe local work:" and "Wherever you are, the service and the way we agree fees stay the same." |
| 3 | H1 and opening | FIX | "We prepare rental accounts, Self Assessment returns, company accounts and Making Tax Digital filings, and plan the tax that goes with them, because property is the only work we do." | Spec owner voice #1 (spec:51): scope stated as a limit, in flat sentences; Q6, one claim per sentence. The "because" clause gives a false reason for the list. | "We prepare rental accounts, Self Assessment returns, company accounts and Making Tax Digital filings, and we plan the tax that goes with them. Property is the only work we do." |
| 4 | H1 and opening | FIX | "We work remotely from our registered office in Shipley, West Yorkshire." | Pack §3.2 opening (pack:52) asks for two facts, "UK-wide and remote" and "registered office in Shipley". Fused, the sentence says staff work from that address, which edges into the deferred office-address fact (R7). | "We work remotely, and our registered office is in Shipley, West Yorkshire." |
| 5 | What a property accountant does for you > Property company and SPV accounts | FIX | "Why it differs: a company deducts its mortgage interest in full, so its planning differs from property held personally." | Q6, plain nouns and one claim: "differs ... differs" says nothing the label does not. | "Why it differs: a company deducts its mortgage interest in full, which changes where your next purchase should sit." |
| 6 | What a property accountant does for you > Making Tax Digital quarterly filing | FIX | "When it applies: from 6 April 2026 if your qualifying income is over £50,000, from April 2027 over £30,000, and from April 2028 over £20,000." | Spec pattern C (spec:30) and writer's card 4 (spec:88): one number per point, in a worked example or FAQ answer. The FAQ "How does Making Tax Digital change what you do for me?" carries the same three thresholds word for word (Q3). | "When it applies: from April 2026 once your qualifying income passes £50,000, with the threshold lower each April to 2028; our [Making Tax Digital guide](/making-tax-digital-landlords) has the steps." |
| 7 | Specialist property accountants, not a general practice | FIX | "Plenty of firms call themselves property specialist accountants. When comparing accountants that specialise in property, these are the four points worth testing, and the ones we raise first." | Spec §4 (spec:80), R5: sentences that exist for a query (pack §2 body rows "property specialist accountants", "accountants that specialise in property"). The coverage matcher is term-based (verify check 6 passes with "property owner accountant" and "residential property accountant" absent as literals), so the first string can go. | "If you are comparing accountants that specialise in property, test them on these four points. They are the ones we raise first." |
| 8 | Specialist property accountants, not a general practice (point "Mortgage interest") | FIX | "On property you own personally, the interest is not deducted from rent." | HP §4 (HP:187): the restriction is "locked mechanics for individual residential landlords". The page courts commercial owners (Commercial H3, Who we work with), whose personal interest is still deducted. | "On homes you let in your own name, the interest is not deducted from rent." |
| 9 | Specialist property accountants, not a general practice (point "Deadlines outside the tax return") | FIX | "A sale with tax to pay has its own 60-day return, and quarterly MTD updates sit outside the January deadline." | HP §5 (HP:205, 215): the UK-resident 60-day return is for residential property where CGT is due. The page's own CGT H3 already says "residential sale". | "A residential sale with tax to pay has its own 60-day return, and quarterly MTD updates sit outside the January deadline." |
| 10 | Property tax accountant: the planning side | FIX | "Here is what that means in numbers." | Q2: deletable with no loss; writer's card 10 (spec:94). | Delete. The paragraph opens "A higher rate landlord pays £18,000 of mortgage interest..." |
| 11 | Property tax accountant: the planning side | FIX | "Accounting for property tax this way covers sales and gifts too, while there is still time to change the outcome." | Spec §4 (spec:80), R5: the phrase "accounting for property tax" (pack §2 body row, 62 impressions) is bolted on as the sentence subject. | "We plan sales and gifts the same way, before they happen, which is the part of accounting for property tax that can still change the outcome." |
| 12 | Property tax accountant: the planning side (TaxYearGap block) | FIX | "The twelve months where the bill is decided" / "January, when it is typed up", the four H3s "The refurbishment", "The ownership", "The finance costs", "The disposal", and "All four are settled before a general practice accountant opens the property pages in January." | Q3: the four H3s restate the four points of the section above (repairs or improvements, joint ownership, mortgage interest, the sale), and the closing line restates this section's own "by January they are history". Spec §1 length (spec:11) against verify check 19 (2,574 body words, target 1,600 to 2,400). The two labels render as one fragment to a crawler. | Delete the block: both labels, the four H3s and the closing line. |
| 13 | Property tax accountant: the planning side (if row 12 is not taken) | FIX | "Treated as a deduction or as a basic rate tax reducer." and "Whose name it sits in, and whether a Form 17 election matches that." | Verify check 14 jargon 1.37 against a ceiling of 1.0; "reducer" is one of the three hits. The section above calls the same thing a "basic rate tax credit". The line reads as a choice the landlord makes (HP §4 do-not-write, HP:201). "Form 17" is undefined (HP §13). | "Deducted in full in a company, or a 20% tax credit in your own name." and "Whose name it sits in, and whether the income split matches who owns it." |
| 14 | Accountants for property investors and investment portfolios | FIX | "We act as accountants for property company structures as well as for the individual, and plan the two together. That joined up view is what property investment accountants should give a portfolio of any size." | Spec §4 (spec:80), R5: two query strings ("accountants for property company", "property investment accountants", pack §2, 2 and 1 impressions). The second sentence is a generic "should" claim that Q2 deletes with no loss. | "We do the company accounts and your personal return together, so the plan for one never undoes the other." |
| 15 | Accountants for property investors and investment portfolios (heading) | FIX | H2 "Accountants for property investors and investment portfolios" | Pack §3.2 H2 set item 4 (pack:54) specifies `Accountants for property investors and portfolios`. The added "investment" stacks a second query word into a plain label (writer's card 6). | H2 "Accountants for property investors and portfolios" (the id changes with it; nothing links to the old id). |
| 16 | Who we work with | FIX | "Our accounting services for property owners share one core, and these pages cover the commonest situations." | Spec §4 (spec:80), R5: the phrase "accounting services for property owners" is the subject, and "share one core" means nothing to a reader. | "These pages cover the situations we see most often, and the accounting services for property owners behind them are the same." |
| 17 | Who we work with | FIX | "We work with landlords, property investors, commercial property owners and property companies, from a single buy-to-let in your own name to a portfolio run through a limited company." | Pack §3.1 item 6 (pack:23): each audience gets a sentence linking its `/for/*` page. The opening names portfolio and company owners, but none of the five entries serves someone who already has a company. Pack §6 also points the profit-extraction anchor "property company accountant" here. | Add: "[Accountants for property company directors taking money out](/for/property-company-profit-extraction): your company makes a profit and you want it out at the lowest tax." |
| 18 | How it works | FIX | "It works in three stages, and the opening conversation is free." | Spec pattern A (spec:28): the first sentence is first person. Every other section calls it "the first call". | "We work in three stages, and the first call is free." |
| 19 | How it works > Agree the fee | FIX | "If you already have an accountant, we ask them for professional clearance and collect your past returns and records, so nothing carried forward is lost." | Q8: a step headed "Agree the fee" should not carry the handover. Q3: the FAQ "Can you take over from my current accountant mid-year?" says the same. | Move it to the start of "Run the year": "If you already have an accountant, we take over from them so nothing carried forward is lost. Then we keep the records current, ..." |
| 20 | Questions people ask | FIX | H3 "How is a property accountant different from a regular accountant?" | Pack §3.2 FAQ (pack:57) "Keep from today: ... `What is the difference between a property accountant and a regular accountant?`"; writer's card 6 (spec:90). The rewrite changes a question string Google already holds (pack §5). | H3 and schema `name`: "What is the difference between a property accountant and a regular accountant?" |
| 21 | Questions people ask | FIX | "A property accountant also checks what you have not thought to mention: how the interest restriction applies, whether costs are repairs or improvements, how joint ownership is split, and what a sale or a move into a company will cost." | Q3: this is the fourth time the same list appears (the specialist section's four points, the planning H3s, and the FAQ "What does a specialist property accountant do?": "a refurbishment claimed as a repair ..., a joint ownership split ..., or a sale reported late"). The specialist FAQ keeps the examples, and this answer changes to the planning difference. | "A property accountant also plans ahead: where the next purchase should sit, when a sale is best timed, and whether a company would save you money, before any of it happens." |
| 22 | Questions people ask | FIX | "or qualifying income above £50,000, which brings quarterly Making Tax Digital filing from April 2026." | HP §3 (HP:172): the threshold falls to £20,000 from 6 April 2028. A one-flat landlord with more than £20,000 of rent reads this answer as "MTD is not for me". | "or qualifying income above £50,000 from April 2026, falling to £20,000 by April 2028, which brings quarterly Making Tax Digital filing." |
| 23 | Questions people ask | FIX | "At that point the rules start to interact, mistakes are harder to spot yourself, and we can show you on the first call what we would do differently." | Spec pattern E (spec:32): one hand-off at most. The next answer ends "The first call will show which side of that line you are on." | "At that point the rules start to interact, and mistakes are harder to spot yourself." (schema text to match) |
| 24 | Questions people ask | FIX | "We handle the UK returns and the scheme approvals for you, and our non-resident landlord service covers that work in more detail." | Pack §3.2 Links out (pack:58): "`/services/non-resident-landlord` from the non-resident FAQ". The visible answer has no link. | Same sentence with "[non-resident landlord service](/services/non-resident-landlord)" linked; schema text unchanged. |
| 25 | Related guides and services | FIX | Nine article cards, from "What Does a Property Accountant Do? Services and Scope for UK Landlords" to "Filing a landlord Self Assessment return". | Pack §3.1 item 11 (pack:28): 4 to 6 links. Verify check 19 length overrun. "Filing Self Assessment as a UK landlord involves the SA100 main return, the SA105 UK Property pages, and (if a disposal happened in the year) the SA108 Capital Gains pages." brings back-office nouns and a jargon hit ("disposal"), and card excerpts count as body text (spec:37). | Keep six: the explainer, how to choose, the cost guide, changing accountants, finance costs, buy-to-let limited companies. Cut "MTD software compared" (software, R5 and HP §14), "MTD for landlords from April 2026" (already linked inline as "Making Tax Digital for landlords"), and "Filing a landlord Self Assessment return". |
| 26 | Related guides and services | FIX | "If you're wondering how much does a property accountant cost, you're not alone." | Spec §2 (spec:37), card excerpts count as body text; spec §4 (spec:80), a sentence that exists for a query ("how much does a property accountant cost"). | Card description: "What firms across the market charge, and what each level of fee should include." |
| 27 | Where we work | FIX | "If you live outside the UK and let property here, the same applies, with the extra non-resident filings handled for you." | Q3: the "Non-resident landlords" entry under Who we work with and the FAQ "Do you work with non-resident landlords?" both say this. | Delete. |
| 28 | What a property accountant does for you | NOTE | "In the UK the job is called a property accountant; in the US you will see real estate accountants doing the same work." | Pack §3.2 body phrases (pack:56) mandates this one mention. | Keep: it is the sanctioned home for the "real estate accountant(s)" rows (140 a month each). Cut or move: it is a US aside in the first paragraph a UK reader reads, and Q2 would delete it. |
| 29 | Whole page (fee wording) | NOTE | "we quote a fixed fee for you to approve before any work starts" (opening); "quote a fixed fee for your approval before any work starts" (How it works); "you approve the fee before any work starts" (fees H2); "you approve it before any work starts" (FAQ); twice more in the contact panel. | Pack §3.1 item 7 (pack:24): this is the only verified fee wording. | Keep: each slot is mandated, and it is the only fee fact we have. Trim: six times in one page reads as reassurance, not information; How it works step 2 could say "We set the scope and quote the fee." |
| 30 | Whole page (pack §6 anchors) | NOTE | No sentence on the page mentions VAT or holiday lets. | Pack §6 (pack:115): "The page must answer what these anchors promise". Rows `vat-calculation-calculator.md:117` ("specialist property accountant who deals with VAT"), `vat-dilapidations-...md:130` ("VAT-aware property accountant") and `holiday-let-and-serviced-accommodation (:1232)` point here. | Add: if the firm does VAT on commercial property, add one line to the Commercial H3 ("VAT: whether the building is opted to tax, and what that means for rent and a sale"). Re-aim: if it does not, point those anchors elsewhere or drop them. |
| 31 | Talk to us about your portfolio, footer, Organization schema (shared components) | NOTE | Form option "Property developer"; footer "PropertyAccountants UK" and "Fixed fees, 24hr response"; schema `description` "the UK's specialist accountancy firm". | R21 (development not claimed); spec §4 response-time row (spec:73); HP §13 superlatives. Verify check 8 excludes these as shared. | Leave: they sit outside this build, and F5 is pending. Fix: a crawler reads them as this page's copy, and the footer brand differs from the title brand "Property Tax Partners". |
| 32 | Opening coverage sentence and FAQ (verify check 11) | NOTE | "We work with landlords and investors across the UK by video call, phone and email, ..." shares an 8-gram with `/locations/london`; "Can you take over from my current accountant mid-year?" with Birmingham and Bristol. | Verify check 11 WARN. | Leave: the coverage sentence is pack-mandated, and the same question on several pages is normal. Vary: change the London page's sentence rather than this one. |
| 33 | Work out your own numbers first (placement) | NOTE | "Our free calculators give you a first number on the mortgage interest restriction, the cost of incorporating, whether Making Tax Digital applies to you and profit per property." | Pack §3.2 H2 set (pack:54): CalculatorTabs sits under the related-guides H2, guarded by `calculator-tabs-crawl-path.test.ts:104-107`. | Leave: the pack and the test fix the position. Move: straight after the planning worked example, the reader is ready to run their own number; after the reading list they are leaving. |
| 34 | Questions people ask ("Do landlords need an accountant?") | NOTE | "No law says a landlord must use an accountant, and you can file your own return." | Pack §3 table (pack PAA row "Do landlords need an accountant?") maps this PAA to landlord-accountant; pack §3.2 adds it here. | Keep: the pack asks for it, and four terms carry it. Watch: it sits next to "Do I need a property accountant for one buy-to-let?" with the same "you can do it yourself until..." shape, and it competes with the landlord page's own version. |

## Per-section answers

### Title and meta description

Title "Property Accountants for UK Landlords and Investors | Property Tax Partners" (51-character page part); meta "Specialist property accountants for UK landlords, investors and property companies: rental accounts, company accounts and MTD filing. Free first call." (150).

1. Yes. The title is the head phrase plus the audience. The meta opens with the pack's required string (pack:51) and names three services and the free first call.
2. None. Both are at their spec length, and every clause is a pack requirement.
3. The meta's service list repeats the opening paragraph. That is expected for a meta description, so no finding.
4. "UK" in the title serves the "uk property accountants" title rows (pack §2). That is the sanctioned place. No finding.
5. No contradiction. The schema `Service.name` equals the H1. The old title was singular (pack §5), and the plural is the pack's ruling.
6. Not prose. The meta is plain nouns with no adjectives, so the register is in line.
7. Nothing missing for a snippet.
8. n/a.

### H1 and opening

H1 "Property accountants for UK landlords and investors"; first sentence "We are property accountants for landlords, investors and owners of property companies anywhere in the UK."

1. Yes. It is definition-shaped and first person (spec pattern A, spec:28). The paragraph is 76 words, inside 60 to 90.
2. None. Every sentence carries a pack §3.2 opening item (who, what, where, call). The fixes are row 3 and row 4, not deletions.
3. "anywhere in the UK" (sentence 1) and "across the UK" (the coverage sentence) say the same thing. The coverage sentence is mandated by R5, so both stay. "we quote a fixed fee for you to approve before any work starts" recurs five more times (row 29).
4. The coverage sentence is the sanctioned R5 vehicle. No other query sentence.
5. Row 2: the opening says "We work remotely", and "Where we work" goes on to promise the same accountants. No contradiction with the schema (`areaServed` United Kingdom).
6. Nearest is owner voice #1, "We only work on landlord and property tax. Nothing else." The register matches, except the "because" clause (row 3).
7. Whether a one-flat landlord is someone this firm takes on. The opening names "landlords" but sizes nothing.
8. Right place.

### What a property accountant does for you (six H3s)

First sentence: "A property accountant keeps the records, prepares the returns and plans the tax for people who own rental and investment property, and we do all three as one service."

1. Yes. It is definition first, then "we" in the same sentence. All six H3s open with a "We ..." sentence, each H3 is 61 to 77 words (spec 60 to 120), and the names match `hasOfferCatalog` exactly (verify check 5).
2. The real estate sentence (row 28). It is kept by pack ruling.
3. The MTD thresholds repeat the MTD FAQ (row 6). "a profit figure for each property" repeats the investors section's "we produce figures for each property". Keep the one here, because the investors section can point back to it.
4. "We also act as a commercial property accountant for owners of shops, offices and industrial units." serves pack §2 "commercial property accountant", but it reads as prose. No finding. The real estate sentence is row 28.
5. No contradiction. The incorporation-relief line matches HP §5 (HP:224), the CGT line matches HP §5 (HP:215), and the MTD "Who is outside it" line matches HP §3.
6. Nearest is owner voice #6, "If incorporation would save you money, we'll model it." The match is close: "We tell you whether ... and we cost a move before you make it." Row 5 is the one slip.
7. Whether VAT on commercial property is part of the commercial item (row 30).
8. Right place.

### Specialist property accountants, not a general practice

First sentence: "We are specialists: we work on property accounts and property tax and nothing else, and we do not take on restaurants, retailers or consultants."

1. Yes.
2. "Plenty of firms call themselves property specialist accountants." (row 7).
3. All four points recur: as the planning H3s (row 12), in the FAQ "What does a specialist property accountant do?", and in the FAQ on the regular accountant (row 21). This section is the one that keeps them.
4. Row 7.
5. Row 1 (joint ownership against HP §24), row 8 (mortgage interest against HP §4 scope), row 9 (60-day return against HP §5 scope).
6. Nearest are owner voice #8, "We do not serve restaurants, retailers or consultants." (nearly verbatim) and #4 ("rarely meets the same property problem twice"). The register matches well.
7. How the reader can tell whether their current accountant got these wrong. The hand-off ("Bring your last return to the first call") answers that, so nothing is missing.
8. Right place.

### Property tax accountant: the planning side

First sentence: "As your property tax accountant we plan the tax as well as report it, and the accounts and the planning are one engagement, not two."

1. Yes.
2. "Here is what that means in numbers." (row 10).
3. "All four are settled before a general practice accountant opens the property pages in January." repeats "by January they are history" in the same section, and the four H3s repeat the section above (row 12).
4. "Accounting for property tax this way covers sales and gifts too, ..." (row 11). "Good property tax accounting starts before the return" carries a query string but reads as prose; no finding.
5. The worked example checks against HP §4 and §7: £18,000 × 40% = £7,200, × 20% = £3,600, gap £3,600; 2027/28: × 42% = £7,560, × 22% = £3,960, gap £3,600. "The finance costs: Treated as a deduction or as a basic rate tax reducer." sits awkwardly against the section above's "basic rate tax credit" (row 13).
6. Nearest is owner voice #5, "We don't wait for you to ask.", lifted verbatim and fitting. The section is thin on "we": 3 of 241 words.
7. What the planning produces for the reader (a model, a recommendation, a figure), and what it would show for a move into a company.
8. Right place: after "what goes wrong" comes "how we stop it".

### Accountants for property investors and investment portfolios

First sentence: "We act as accountants for property investors once one or two lets have become a portfolio, when the question shifts from whether the return is right to which property is earning its keep."

1. Yes.
2. "That joined up view is what property investment accountants should give a portfolio of any size." (row 14).
3. Per-property figures repeat the Rental accounts H3. "plan the two together" repeats the FAQ "Do you handle both personally held property and limited companies?" ("we plan them together").
4. Five pack §2 strings in 161 words: "accountants for property investors", "property portfolio accountant", "Multi-property portfolio accounting", "accountants for property company", "property investment accountants". The last two are row 14. The first three read as prose.
5. No contradiction.
6. Nearest is owner voice #3, "... that's not the same as understanding how a property portfolio actually operates." The first paragraph matches. The third paragraph slides into query voice.
7. What changes at, say, eight properties: when a company starts to make sense, and what it costs to move. The section names the question and leaves it.
8. It belongs either before "Property tax accountant: the planning side" (so the worked example lands on an investor) or folded into "Who we work with" as an entry. As placed it is acceptable, because the pack fixes the H2 order (pack:54).

### Who we work with

First sentence: "We work with landlords, property investors, commercial property owners and property companies, from a single buy-to-let in your own name to a portfolio run through a limited company."

1. Yes.
2. "Our accounting services for property owners share one core, ..." (row 16). Reword it rather than delete it.
3. The non-resident entry repeats the FAQ and "Where we work" (row 27, which removes the third copy).
4. Row 16.
5. No contradiction. `SCHEMA_F_report.md` calls the heading "Who we work with" softer than "Our clients", and the pack mandates it.
6. Nearest is owner voice #12 ("Give them a straight answer at the desk, ..."): the reader's situation, then the task. The entries match ("an offer is on the table and you want to know what you keep after tax").
7. Where an existing company owner or a couple splitting rent goes (row 17).
8. Right place.

### How it works

First sentence: "It works in three stages, and the opening conversation is free."

1. It answers the heading, but not in the first person (row 18).
2. None. Three steps, each needed.
3. The handover sentence repeats the mid-year FAQ (row 19). "If your affairs are simple enough to handle yourself, we will say so." is said again three times in the contact panel. The panel is shared, so this one stays.
4. None.
5. "one of our accountants goes through it with you" is verified against `entity.howItWorks[1]` (`SCHEMA_F_report.md`). The partner-network disclosure softens it, but it is sourced. No finding.
6. Nearest is owner voice #10, "If your position is already right, we will say so." It matches.
7. What happens between the call and the quote: how long it takes, and what the reader sends.
8. Right place.

### How our fees work

First sentence: "We charge fixed fees, quoted upfront, and you approve the fee before any work starts."

1. Yes, in the verified wording (pack:24).
2. None. The four drivers are the whole content of the slot.
3. The four drivers repeat the FAQ "How much does a property accountant cost?", and "what firms across the market charge and what each level should include" appears in both. Both are mandated (fees slot, PAA answer), so no finding beyond row 29.
4. None.
5. No contradiction. "If your circumstances change during the year, you hear about any extra fee before it is charged." is owner voice #9.
6. Nearest is #9. It matches.
7. A figure. That is deferred by R7 (F3), and the page says so honestly.
8. Right place.

### Questions people ask (FAQ, 12 items, as one section)

First item: H3 "What does a property accountant do?", answer "A property accountant prepares the accounts and tax returns for rental and investment property and plans the tax around them."

1. Yes. Every answer settles the question in its first five words ("Often not.", "Yes.", "You can, ...", "It depends on ..."). Answers run 60 to 79 words (spec 40 to 90). The schema matches the visible text (verify check 4). The check 15 note ("first sentence shares no term with its heading") is a harness artefact of a FAQ H2; no finding.
2. The closing hand-off in "Do landlords need an accountant?" (row 23).
3. Rows 21 and 22. "How does Making Tax Digital change ..." repeats the MTD H3: keep the numbers here, cut them there (row 6). "Can you take over ..." overlaps How it works (row 19).
4. None that reads as query-first. "What does a specialist property accountant do?" is a pack R23 PAA string, answered as prose.
5. Rows 20 and 22. The non-resident answer ("reported within 60 days whether or not tax is due") matches HP §5 (HP:217). The incorporation answer matches HP §5 and §1.
6. Nearest is owner voice #6, "If incorporation would save you money, we'll model it." against "We model your numbers and give you a straight answer, including when it is no." It matches.
7. Nothing the heading promises is missing.
8. Right place.

### Related guides and services

First sentence: "These guides go further into the subjects on this page: the guide to landlord tax, the finance cost restriction in full, Making Tax Digital for landlords, incorporation, and this year's property tax rates."

1. Yes.
2. "If you're wondering how much does a property accountant cost, you're not alone." (row 26).
3. Three cards duplicate inline links already in the first sentence, or elsewhere (row 25).
4. Row 26.
5. No contradiction. The sibling line names both siblings by their H1s ("property tax advice from specialist advisors", "landlord accountants for UK rental income"), as pack:28 asks.
6. No "we" in 278 words. The nearest owner sentence, #12, would phrase the sibling line as the reader's task, which it already does. The card excerpts are not in our voice at all.
7. Nothing.
8. Right place.

### Work out your own numbers first

First sentence: "Our free calculators give you a first number on the mortgage interest restriction, the cost of incorporating, whether Making Tax Digital applies to you and profit per property."

1. Yes.
2. None.
3. None.
4. None.
5. No contradiction. Zero per-tool links, as the test requires.
6. Nearest is #12. It matches ("Bring the result to the first call.").
7. Nothing.
8. See row 33.

### Where we work

First sentence: "We work with clients anywhere in the UK from one team, and five city pages describe local work:"

1. Yes, but with an unsourced staffing claim (row 2).
2. The non-resident sentence (row 27).
3. The opening coverage sentence already names the five cities. Both are pack-mandated (pack:53, 54).
4. The section exists for R5 coverage, and pack §3.1 item 13 sanctions it.
5. Row 2: it contradicts the partner-network disclosure in the form directly below.
6. Nearest is owner voice #1, flat scope. It matches once row 2 is applied.
7. Nothing.
8. Right place.

### Talk to us about your portfolio (shared `LeadCTAPanel`)

Outside this build (verify check 8). Its first sentence, "A free consultation, a straight answer about whether you need us, and a fixed fee quoted before any work starts if you do.", answers the heading. It says "if you do not need us, we will tell you" in three forms. Row 31 covers the shared-component items for the owner.

## Whole page

**9. Reader walk.**

*First-time landlord, one flat.* The opening suits them until "company accounts" and "Making Tax Digital filings", and the first six H3s then lean towards company and incorporation work. Their question, "Do I need a property accountant for one buy-to-let?", is the fourth FAQ, roughly 1,700 words down, so most will stop in the specialist section and click "First-time and accidental landlords" or the sibling "landlord accountants for UK rental income" link. They could not find whether the firm takes one-flat clients at all. They would also come away thinking MTD is not for them, because the answer stops at £50,000 (row 22). They would probably not book from this page; they would book from the landlord page if anywhere.

*Eight-property owner deciding on a company.* This reader is served best. They read the services list, "Incorporation and structuring advice" ("we cost a move before you make it"), the planning worked example and the FAQ "Will you tell me whether to incorporate?". They would click "Moving property into a limited company", the incorporation guide or the incorporation calculator. They could not find a worked example of the decision itself, a transfer cost set against the yearly saving: the one worked example prices Section 24, not the move. They would likely book, because every section hands them to the call with a reason.

*Accidental landlord about to sell.* They find "Capital gains tax on sales" early ("with the figure ready before you accept an offer", the 60-day rule, "any relief for a former home"), then stop and click "Selling a buy-to-let" under Who we work with. They could not find what the former-home relief is worth or how it works, which is guide depth and rightly elsewhere. They might book straight from the CGT item, but the hand-off is after all six items rather than at the sale.

**10. Ten-second read.** The title, H1 and opening say what (accounts, returns, MTD, planning), for whom (landlords, investors, property companies, UK-wide) and the next step (free first call, fee approved first). The H2 list then reads as three restatements of the head phrase ("Specialist property accountants, not a general practice", "Property tax accountant: the planning side", "Accountants for property investors and investment portfolios") before the plain labels. The first FAQ repeats H2 1. A ten-second reader still knows the offer, the audience and the next step. They do not learn why this firm rather than another, beyond "specialist".

**11. Register verdict.** Against spec §1 and verify check 14: body words 2,197 by the probe (in target) but 2,574 by check 19 (over the 2,400 ceiling); sentence length 21.1 (in); Flesch 56.8 (over the 55 ceiling, too easy, which the spec says not to chase by simplifying); question headings 23.5% (in); you 33.2 (in); we 24.1 (in, doubled from 12.6 as the spec asked); statute 0.0 (in); jargon 1.37 (over the 1.0 ceiling); numbers 19.6 (in). No paragraph runs over 80 words. The "we" average hides two thin sections: planning (3 in 241 words) and related guides (0 in 278). The three sentences that pull hardest from the target:
- "Treated as a deduction or as a basic rate tax reducer." (a jargon hit, and a fragment that pushes Flesch up)
- "Filing Self Assessment as a UK landlord involves the SA100 main return, the SA105 UK Property pages, and (if a disposal happened in the year) the SA108 Capital Gains pages." (a jargon hit and back-office nouns, in card text that counts as body)
- "If you're wondering how much does a property accountant cost, you're not alone." (query voice, no "we", spec §4)

Check 20's list includes "£50,000" and "£20,000" as dropped, but both render ("over £50,000,", "over £20,000."). That is a tokeniser artefact in the harness, not a page fault. The dropped rate sets (dividend rates, BADR 18%, the 14%/40% allowances, the IHT freeze to 2031) were cut on purpose by spec §2.

**12. The single change.** Delete the TaxYearGap block under the planning H2 (four fragment H3s that restate the section above and carry the page's "reducer" and "Form 17"), and spend those words on a second worked example that sets the cost of moving property into a company against its yearly saving, which is the decision the investor reader came for and the page never prices.
