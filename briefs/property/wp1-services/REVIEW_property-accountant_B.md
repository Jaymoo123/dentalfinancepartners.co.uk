# Review B: `/services/property-accountant` (draft 2)

Reviewer B, 2026-10-09. Read: the rendered page `Property/web/.next/server/app/services/property-accountant.html` (built 10:46), `ANSWER_PATTERN_SPEC_services_2026-10.md`, the pack sections 1, 2, 3, 5 and 6, `docs/property/house_positions.md`, and `VERIFY_property-accountant_draft2.md` (0 BLOCK, 6 WARN). The sibling pages `/services/landlord-accountant` and `/services/property-tax-advice` were opened only to check their H1s, FAQ strings and one repeated worked example. No other review was read. The page was not edited.

**Counts: 3 BLOCK, 23 FIX, 12 NOTE.**

## Findings

| # | Section | Type | Quote (from the page) | Rule or spec line it breaks | Replacement |
|---|---|---|---|---|---|
| 1 | Opening | FIX | "We work remotely from our registered office in Shipley, West Yorkshire." | Pack §1, 3.2 "Opening" row gives two facts: "UK-wide and remote, registered office in Shipley". The sentence turns the registered office into the place the work is done, which the pack does not state. | "We work remotely, and our registered office is in Shipley, West Yorkshire." |
| 2 | Opening | FIX | "We prepare rental accounts, Self Assessment returns, company accounts and Making Tax Digital filings, and plan the tax that goes with them, because property is the only work we do." | Spec §3 owner voice #1 ("We only work on landlord and property tax. Nothing else."): one claim per sentence. The "because" links the scope claim to the tax planning when it does not cause it. | "We prepare rental accounts, Self Assessment returns, company accounts and Making Tax Digital filings, and we plan the tax that goes with them. Property is the only work we do." |
| 3 | Opening (coverage sentence) | NOTE | "...so where you or your properties are makes no difference to the service; our London, Manchester, Birmingham, Leeds and Bristol pages describe how that works in each city." | Spec writer's card 9 and pack §1, 3.1 item 13 say a city is named only in the locations block. Pack §1, 3.2 "Coverage statement" row prescribes this wording. | Keep: it is the prescribed coverage sentence, and check 6 found it. Cut: end the sentence at "makes no difference to the service.", because "Where we work" names and links the five cities. |
| 4 | What a property accountant does for you | NOTE | "In the UK the job is called a property accountant; in the US you will see real estate accountants doing the same work." | Pack §1, 3.2 "Body phrases" row prescribes this sentence for "real estate accountant(s)" (140 a month). Spec §4, "Sentences that exist for a query" (R5). | Keep: it serves the rows the pack placed here. Cut: a UK landlord loses nothing without it, and it is the only sentence in the section written for a query. |
| 5 | What a property accountant does for you, H3 Making Tax Digital quarterly filing | FIX | "When it applies: from 6 April 2026 if your qualifying income is over £50,000, from April 2027 over £30,000, and from April 2028 over £20,000." | Spec writer's card 4 (one number per point, in a worked example or an FAQ answer) and card 3 (name the tax, link the guide). The FAQ "How does Making Tax Digital change what you do for me?" gives the same three thresholds almost word for word. | "When it applies: once your qualifying income passes the threshold, which falls each April from 2026 to 2028; our [Making Tax Digital guide](/making-tax-digital-landlords) has the dates." |
| 6 | What a property accountant does for you, H3 Incorporation and structuring advice | FIX | "What has changed: incorporation relief, which can defer the gain for a genuine property business, now has to be claimed for transfers from 6 April 2026." | Spec writer's card 3 (link the guide). Pack §1, 3.2 "Links out" puts `/incorporation` "inline where the subject comes up", and today it is linked only from Related guides. The fact itself is correct (house_positions §5, s.162). | "What has changed: incorporation relief, which can defer the gain for a genuine property business, now has to be claimed for transfers from 6 April 2026, and our [incorporation guide](/incorporation) explains when it is available." |
| 7 | Specialist property accountants, not a general practice | FIX | "Plenty of firms call themselves property specialist accountants. When comparing accountants that specialise in property, these are the four points worth testing, and the ones we raise first." | Spec §4, "Sentences that exist for a query" (R5). Two body rows ("property specialist accountant", "accountants that specialise in property") are stacked in back-to-back sentences. | "If you are comparing property specialist accountants, test them on these four points; they are the ones we raise first." |
| 8 | Specialist property accountants, not a general practice ("Mortgage interest") | FIX | "It earns a basic rate tax credit instead, which is capped in some years and carried forward." | house_positions §4: "Where the credit is restricted by the cap, the un-credited portion carries forward." What carries forward is the unused part, not the credit. | "It earns a basic rate tax credit instead, which is capped in some years, with the unused part carried forward." |
| 9 | Specialist property accountants, not a general practice ("Joint ownership") | BLOCK | "Joint owners are taxed on a default split unless an election changes it, and the election has to match who really owns what." | house_positions §24.1, critical scope note, and §24.6: the 50/50 default and the Form 17 election apply only to spouses and civil partners. Unmarried co-owners are always taxed on their actual beneficial shares, and "Sessions on unmarried co-owners must NOT cite Form 17." | "Married couples and civil partners who own together are taxed 50/50 unless they elect otherwise, and the election has to match who really owns what; other co-owners are taxed on their actual shares." |
| 10 | Property tax accountant: the planning side | FIX | "A higher rate landlord pays £18,000 of mortgage interest on flats held in their own name." (and the £7,200 / £3,600 / £3,600 sentence after it) | The sibling `/services/landlord-accountant` runs the same example: "£18,000 of mortgage interest ... £3,600 A year". standard_terms §4 says to differentiate overlapping pages. The 2027/28 sentence also omits Scotland's carve-out (house_positions §7). | "A higher rate landlord pays £12,000 of mortgage interest on flats held in their own name. If that interest could still be deducted, it would save £4,800 at 40%; the basic rate credit gives £2,400 for 2026/27, so the restriction costs £2,400 a year. From 2027/28 the credit rises to 22% and the higher rate on property income outside Scotland to 42%, and the gap stays the same. Held in a company, the same interest would be deducted in full." (house_positions §4, §7; arithmetic: 5,040 less 2,640 is 2,400.) |
| 11 | Property tax accountant: the planning side | FIX | "Accounting for property tax this way covers sales and gifts too, while there is still time to change the outcome." | Spec §4, "Sentences that exist for a query" (R5; body row "accounting for property tax"). | "We plan sales and gifts the same way, while there is still time to change the outcome." (The row's terms are still in "Good property tax accounting starts before the return"; rerun check 6.) |
| 12 | Property tax accountant: the planning side, H3 The finance costs | FIX | "Treated as a deduction or as a basic rate tax reducer." | house_positions §4: finance costs on personally held residential lets are "NOT deducted"; only companies deduct (do-not-write: "Mortgage interest is deductible 100%"). It also contradicts the page's own "On property you own personally, the interest is not deducted from rent." | "Relieved as a basic rate credit if you own the property, deducted in full if a company does." |
| 13 | Property tax accountant: the planning side, H3 The ownership | FIX | "Whose name it sits in, and whether a Form 17 election matches that." | Spec §1 jargon target of 1.0 or below (check 14 measures 1.37). house_positions §24.1: Form 17 is for spouses only, so the bare form number misleads other co-owners. | "Whose name it sits in, and whether a married couple's income split matches the real shares." |
| 14 | Property tax accountant: the planning side | FIX | "All four are settled before a general practice accountant opens the property pages in January." | Q2: it can be deleted. Q3: it repeats "by January they are history" from the same section. | Delete. |
| 15 | Accountants for property investors and investment portfolios | NOTE | H2 "Accountants for property investors and investment portfolios" | Pack §1, 3.2 "H2 set": `Accountants for property investors and portfolios`. | Pack wording: reads cleaner, without "investors and investment". Draft wording: the extra word may be what carries the h2 row "property investment accountant" in check 6, so rerun before changing it. |
| 16 | Accountants for property investors and investment portfolios | FIX | "We act as accountants for property company structures as well as for the individual, and plan the two together. That joined up view is what property investment accountants should give a portfolio of any size." | Spec §4, "Sentences that exist for a query" (R5; rows "accountants for property company" and "property investment accountants"). Q3: the FAQ "Do you handle both personally held property and limited companies?" says "we plan them together". | "We act for your companies as well as for you, and plan the two together." (Delete the second sentence.) |
| 17 | Who we work with | FIX | "Our accounting services for property owners share one core, and these pages cover the commonest situations." | Spec §4, "Sentences that exist for a query" (R5). "Share one core" tells the reader nothing. | "Our accounting services for property owners are the same at every size, and the pages below go deeper on five common situations." |
| 18 | How it works | FIX | "It works in three stages, and the opening conversation is free." | Spec §2, pattern A (the first sentence is in the first person). Elsewhere the page always says "first call". | "We work in three steps, and the first call is free." |
| 19 | How it works, H3 Talk it through | NOTE | "...one of our accountants goes through it with you on a free call." | The same page's enquiry disclosure: "your details may be shared with a firm from our specialist partner network who will contact you." | Keep: the spec requires the firm's first-person voice. Change to "we go through it with you on a free call": this makes no staffing claim the disclosure could contradict. |
| 20 | How it works, H3 Agree the fee | FIX | "If you already have an accountant, we ask them for professional clearance and collect your past returns and records, so nothing carried forward is lost." | Q3: it repeats the FAQ "Can you take over from my current accountant mid-year?" ("We contact your current accountant for professional clearance, collect your past returns..."). Q8: a handover is not part of agreeing a fee. | Delete; the FAQ carries it. |
| 21 | How our fees work | FIX | "We charge fixed fees, quoted upfront, and you approve the fee before any work starts. There is no hourly billing; the figure depends on the four things below, not a package picked from a list." | Pack §1, 3.1 item 7: the fixed-fee wording is "the only fee claim allowed until F3 exists", so "There is no hourly billing" is an extra fee claim. Q3: "before any work starts" appears six times on the page (opening, step 2, here, the cost FAQ, the panel twice). | "Your fee depends on the four things below, not a package picked from a list, and we quote it as a fixed fee that you approve before any work starts." (Spec §2, pattern D: the variables, then what we do.) |
| 22 | Questions people ask, "Do landlords need an accountant?" | FIX | "Most landlords bring one in when the tax stops being simple: a second or third property, a limited company, a property owned with someone else, or a sale." | standard_terms §4 (every claim re-derivable). "Most landlords" has no source. | "The usual point to bring one in is when the tax stops being simple: a second or third property, a limited company, a property owned with someone else, or a sale." |
| 23 | Questions people ask, "Do landlords need an accountant?" | FIX | "At that point the rules start to interact, mistakes are harder to spot yourself, and we can show you on the first call what we would do differently." | Spec §2, pattern E and writer's card 7: at most one hand-off per section. The FAQ already has "The first call will show which side of that line you are on." | "At that point the rules start to interact and mistakes are harder to spot yourself." |
| 24 | Questions people ask, "Do landlords need an accountant?" | NOTE | H3 "Do landlords need an accountant?" | Pack §3 maps this PAA to landlord-accountant, which already answers "Do I need an accountant for one rental property?". Pack §1, 3.2 adds it here. house_positions §14 says to flag cannibalisation. | Keep: pack §1 and the 4 PAA terms. Drop or merge into "Do I need a property accountant for one buy-to-let?": two FAQs here and one on the sibling page answer the same question. |
| 25 | Questions people ask | FIX | H3 "How is a property accountant different from a regular accountant?" | Pack §1, 3.2 FAQ row, "Keep from today": `What is the difference between a property accountant and a regular accountant?`. That is the string in today's FAQPage schema (pack §5). | Restore "What is the difference between a property accountant and a regular accountant?" in the H3 and the schema. |
| 26 | Questions people ask, the "regular accountant" answer | FIX | "A property accountant also checks what you have not thought to mention: how the interest restriction applies, whether costs are repairs or improvements, how joint ownership is split, and what a sale or a move into a company will cost." | Q3: it repeats the FAQ "What does a specialist property accountant do?" ("a refurbishment claimed as a repair..., a joint ownership split..., or a sale reported late") and the four tests in the specialist H2. | "A property accountant starts from the property instead: who owns it, how it is financed and what you plan to do next, and that shapes the return, the structure and the timing of any sale." |
| 27 | Questions people ask, "Do you work with non-resident landlords?" | FIX | "We handle the UK returns and the scheme approvals for you, and our non-resident landlord service covers that work in more detail." | Pack §1, 3.2 "Links out": "`/services/non-resident-landlord` from the non-resident FAQ". The phrase renders unlinked. | Same sentence with "[non-resident landlord service](/services/non-resident-landlord)" linked in the visible answer; the schema text stays identical. |
| 28 | Questions people ask | NOTE | "We do all of it, and nothing outside property." / "We work only on property, so these are everyday questions for us." / "Because we only do property, we raise those questions before you ask." | Q3: together with the opening and the specialist H2, the scope claim appears five times. | Keep: each FAQ answer has to stand alone when it is lifted from the schema. Trim: keep it in the opening, the specialist H2 and the first FAQ, and cut the other two FAQ restatements. |
| 29 | Questions people ask | NOTE | H3 "Can you take over from my current accountant mid-year?" | Check 11: the same 8-word strings appear on `/locations/birmingham` and `/locations/bristol`. | Keep here: it is on the pack keep-list. Vary it on the city pages instead: outside this page, so it goes to a later pass. |
| 30 | Related guides and services, card excerpt | FIX | "If you're wondering how much does a property accountant cost, you're not alone." | Spec §2 line 37 (card excerpts count as body text) and spec §4, "Sentences that exist for a query" (R5). | Override the excerpt with: "What firms across the market charge for property accounting, and what each level of fee should include." (This also places the literal body row "property accounting", see #36.) |
| 31 | Related guides and services, card excerpt | FIX | "Filing Self Assessment as a UK landlord involves the SA100 main return, the SA105 UK Property pages, and (if a disposal happened in the year) the SA108 Capital Gains pages." | Spec §2 line 37 (excerpts count as body), spec §2 line 40 (back-office nouns) and spec §1 jargon target. | Override the excerpt with: "How to file a landlord's Self Assessment return step by step, including the property pages and what to add in a year you sell." |
| 32 | Related guides and services | NOTE | Five pillar links, two sibling links and nine article cards (16 links). One card heading, "What Does a Property Accountant Do? Services and Scope for UK Landlords", repeats the first FAQ heading. | Pack §1, 3.1 item 11 ("4 to 6 links") against pack §1, 3.2 "Preserve" (the `feedingPosts` list). | Keep: the preserve list wins. Cut the four cards that duplicate a pillar link in the same section (finance costs and `/section-24`, MTD from April 2026 and `/making-tax-digital-landlords`, buy-to-let companies and `/incorporation`, MTD software). |
| 33 | Where we work | BLOCK | "We work with clients anywhere in the UK from one team, and five city pages describe local work:" | "From one team" is contradicted by the panel disclosure on the same page: "If that firm is unable to help, your details may be passed to another firm in the network". Spec §3 sets the precedent ("Your enquiry is not spread across a list" is "not to lift" because it contradicts the privacy policy). It also repeats the coverage sentence (pack §1, 3.1 item 4 says one sentence). | "Five city pages describe how we work with landlords there:" |
| 34 | Where we work | BLOCK | "Wherever you are, the service, the accountants you deal with and the way we agree fees stay the same." | The same contradiction and the same spec §3 precedent as #33: a promise that "the accountants you deal with" stay the same, against a disclosure that the enquiry may pass to another firm. | "Wherever you are, the service and the way we agree fees stay the same." Delete the next sentence ("If you live outside the UK and let property here, the same applies..."), which repeats "Who we work with" and the non-resident FAQ. |
| 35 | Where we work (against the old page) | NOTE | New: "We work remotely". Old (pack §5): "If you want a face-to-face meeting, we can arrange one." | Q5: a fact the old page stated has been dropped. | Remote-only: simpler, and consistent with the coverage sentence. Restore "If you would rather meet in person, ask on the first call", but only if the owner confirms the firm still offers it. |
| 36 | Whole page (phrases) | NOTE | Absent as literal strings: "property accounting", "residential property accountant", "property owner accountant", "investment property accountant", "property accounting services". | Pack §1, 3.2 "Body phrases" row lists them. Check 6 term-matches them and passes 60/60. | Leave: adding them would create sentences written for queries. Weave only the two with impressions (property accounting 48, residential property accountant 53), and #30 places the first one naturally. |
| 37 | Talk to us (shared `LeadCTAPanel`) | NOTE | Form option "Property developer" | R21 (pack §0): development is not claimed. Pack §1, 3.1 item 12 leaves the panel unchanged. | Leave: the panel is shared and out of WP1 scope. Change: the page says development is not claimed while the form asks developers to apply, so drop the option site-wide. |
| 38 | Schema (shared Organization node) | NOTE | `"sameAs": [..., "https://www.contractortaxaccountants.co.uk", "https://www.medicalaccounts.co.uk", ...]` and the description "the UK's specialist accountancy firm for landlords" | Q5: the page says "we do not take on restaurants, retailers or consultants" and "property is the only work we do". house_positions §13 (no "best"-type claims). | Leave: the node is site-wide and owned by the estate, not by this page. Change: a crawler reads both on this URL; remove the non-property `sameAs` entries and "the UK's" from the property site's node. |

## Section answers

### Title and meta description

1. Title "Property Accountants for UK Landlords and Investors" (51 characters) is pack §1, 3.2's first choice, with the head phrase first. Meta "Specialist property accountants for UK landlords, investors and property companies: rental accounts, company accounts and MTD filing. Free first call." (150 characters) opens with the required words, names three services and includes "free first call". No finding.
2. None. Both are at length and every word carries a placed phrase.
3. The meta repeats the H1 and opening by design. No finding.
4. Both exist for queries by design: they are the title and meta slots. No finding.
5. No contradiction. The schema `Service.name` matches the H1.
6. Not an owner-voice slot. The nearest is #11 ("Property tax sorted, your way, with ease."). The meta's plain noun list matches the register.
7. Nothing the slot promises is missing.
8. Right place.

### H1 and opening (including the coverage sentence)

1. H1 "Property accountants for UK landlords and investors". First sentence: "We are property accountants for landlords, investors and owners of property companies anywhere in the UK." Yes. It is first person and definition-shaped (pattern A).
2. "We work remotely from our registered office in Shipley, West Yorkshire." could go if the coverage sentence stays, but the pack requires the Shipley fact, so the answer is none: fix it (#1) rather than delete it.
3. The coverage sentence and "Where we work" make the same point; the duplicate goes from "Where we work" (#33). The fee sentence recurs six times (#21).
4. The coverage sentence exists for the 18 coverage rows. It is the sanctioned coverage sentence; keep it. The city clause is the open question (#3).
5. Old page: "If you want a face-to-face meeting, we can arrange one." New: "We work remotely" (#35). No contradiction with the schema or house_positions.
6. Nearest: #1 "We only work on landlord and property tax. Nothing else." It matches, except where one sentence carries two claims (#2).
7. Nothing. Who, what, where and the next step are all there in 76 words, inside the 60 to 90 target.
8. Right place.

### What a property accountant does for you (six H3s)

1. Heading "What a property accountant does for you". First sentence: "A property accountant keeps the records, prepares the returns and plans the tax for people who own rental and investment property, and we do all three as one service." Yes.
2. "In the UK the job is called a property accountant; in the US you will see real estate accountants doing the same work." (#4). "Most people use several of the six services below." is also unbacked and could go.
3. The MTD thresholds repeat the MTD FAQ; the body copy goes (#5). "A profit figure for each property, so you can see which one carries the rest" repeats the investors section's "figures for each property"; keep the H3 line (it defines the offer) and let the investors section carry the why.
4. The real estate sentence (#4). "We also act as a commercial property accountant for owners of shops, offices and industrial units." carries a row but reads naturally; keep it.
5. No contradiction. The MTD, CGT 60-day, s.162 claim, company interest and commercial allowances lines all agree with house_positions §3, §4, §5 and §25.
6. Nearest: #6 "If incorporation would save you money, we'll model it." Matches: each H3 opens with "We", with plain nouns and one claim per labelled line. "A director's loan account that reconciles" is the one back-office noun (Q11).
7. Which pillar guide to read on MTD and incorporation: neither H3 links its guide (#5, #6).
8. Right place.

### Specialist property accountants, not a general practice

1. Heading "Specialist property accountants, not a general practice". First sentence: "We are specialists: we work on property accounts and property tax and nothing else, and we do not take on restaurants, retailers or consultants." Yes, and close to owner voice #1 and #8.
2. "Plenty of firms call themselves property specialist accountants." (#7).
3. "Mortgage interest" repeats the planning worked example and the FAQ "one buy-to-let". "Repairs or improvements" and "Joint ownership" repeat the planning H3s (The refurbishment, The ownership) and two FAQs. This section is the better home for all four tests, so the planning timeline goes (Q12).
4. The two consecutive phrase sentences (#7).
5. "Joint ownership" contradicts house_positions §24.1 and §24.6 (#9, BLOCK). "Mortgage interest" is loose against §4 (#8).
6. Nearest: #3 "A generalist accountant will work with what you give them, but that's not the same as understanding how a property portfolio actually operates." Matches: it is fair to the competitor, then names the gap. "Each cost is classed as the money is spent, with the reasons kept on file." is passive where the owner would say "We class each cost as the money is spent and keep the reasons on file."
7. The pack's specialism slot (3.1 item 9) wants incorporation and MTD competence, each with its pillar link. Incorporation is absent here and MTD gets only half a line.
8. Right place.

### Property tax accountant: the planning side (four H3s)

1. Heading "Property tax accountant: the planning side". First sentence: "As your property tax accountant we plan the tax as well as report it, and the accounts and the planning are one engagement, not two." Yes.
2. "All four are settled before a general practice accountant opens the property pages in January." (#14).
3. The four H3s (refurbishment, ownership, finance costs, disposal) restate the specialist section's four tests. The H3 block goes (Q12). The worked example repeats the sibling page's example (#10).
4. "Accounting for property tax this way covers sales and gifts too..." (#11).
5. H3 "The finance costs" contradicts the specialist section's "the interest is not deducted from rent" (#12). The 2027/28 sentence leaves out the Scottish carve-out (#10).
6. Nearest: #5 "We don't wait for you to ask.", which is quoted verbatim here. It matches. The H3 fragments do not: they are labels rather than sentences, and they pull Flesch up (Q11).
7. Where the next purchase should sit, in numbers. The section says "we model where the next purchase should sit" but its only number is the interest restriction, not the personal against company choice. The replacement in #10 adds one plain sentence on the company side.
8. Right place: it follows naturally from "what does a specialist check".

### Accountants for property investors and investment portfolios

1. Heading as quoted. First sentence: "We act as accountants for property investors once one or two lets have become a portfolio, when the question shifts from whether the return is right to which property is earning its keep." Yes.
2. "That joined up view is what property investment accountants should give a portfolio of any size." (#16).
3. The personal-plus-company paragraph repeats the FAQ "Do you handle both..."; the body sentence is trimmed (#16).
4. Three phrase-carrying sentences: "As your property portfolio accountant..." reads naturally, so keep it; "accountants for property company structures" and "property investment accountants" (#16).
5. No contradiction.
6. Nearest: #12 "Give them a straight answer at the desk, run the number in front of them, and forward a page that settles it." Matches in "so a flat that loses money every year stops hiding inside the total"; it slips in the last two sentences.
7. Whether the eight-property owner should incorporate. There is no link to `/incorporation` or to `/for/moving-property-into-a-limited-company` from the section that addresses portfolio owners.
8. Right place, though it overlaps "Who we work with". Both are audience sections. The pack's H2 set keeps both, so this is no finding.

### Who we work with

1. Heading "Who we work with". First sentence: "We work with landlords, property investors, commercial property owners and property companies, from a single buy-to-let in your own name to a portfolio run through a limited company." Yes.
2. None. Each line is one audience and one link (pack §1, 3.1 item 6).
3. The non-resident line repeats the non-resident FAQ and "Where we work" (#34 removes the third mention).
4. "Our accounting services for property owners share one core..." (#17).
5. No contradiction. The links match pack §1, 3.2 (`/for/property-spv-set-up`, `/for/moving-property-into-a-limited-company`, `/for/non-resident-landlords`).
6. Nearest: #10 "If your position is already right, we will say so." Matches in "you will get a straight answer on whether we are the right firm".
7. Nothing the heading implies is missing.
8. Right place.

### How it works (three H3s)

1. Heading "How it works". First sentence: "It works in three stages, and the opening conversation is free." It answers, but not in the first person (#18).
2. "If you already have an accountant, we ask them for professional clearance and collect your past returns and records, so nothing carried forward is lost." (#20).
3. Step 2's fee sentence repeats the opening, the fees H2, the cost FAQ and the panel (#21). Step 1's "If your affairs are simple enough to handle yourself, we will say so." repeats the panel's "If you do not need us, we will tell you."; keep it in step 1, since the panel is shared.
4. None.
5. "One of our accountants" sits against the partner-network disclosure (#19).
6. Nearest: #10 "If your position is already right, we will say so." Matches.
7. How long step 2 takes from call to fee. That is acceptable: no timing is allowed under R7.
8. Right place.

### How our fees work (four H3s)

1. Heading "How our fees work". First sentence: "We charge fixed fees, quoted upfront, and you approve the fee before any work starts." Yes, with the verified wording.
2. "There is no hourly billing" (#21).
3. "Before any work starts" is the sixth occurrence on the page (#21).
4. None.
5. No contradiction. "If your circumstances change during the year, you hear about any extra fee before it is charged." paraphrases owner voice #9 and is R7-safe.
6. Nearest: #9 "If your situation changes mid-year, we will tell you before any additional fees apply." Matches.
7. The figure, which is absent by ruling (R7, F3). The section links the market-fees guide, which is the allowed route.
8. Right place.

### Questions people ask (FAQ, 12 items, as one section)

1. Heading "Questions people ask". First sentence is the first question: "What does a property accountant do?" Check 15 flags that it shares no term with the heading. Pattern B treats the H2 as a label, so no finding. Each answer settles its question within the first five words.
2. The "regular accountant" answer as written, because the specialist answer already covers it; rewrite it (#26) rather than delete it, since the question is on the keep-list.
3. The first FAQ answer repeats the H2 "What a property accountant does for you" opener. The pack serves that row in both places, so keep both. The specialist and regular-accountant answers repeat each other (#26). The MTD thresholds repeat the body (#5). The scope claim recurs (#28).
4. None reads as written for a query. The question strings are PAA strings by design.
5. The changed question string (#25). "Do landlords need an accountant?" overlaps the sibling page (#24). The facts agree with house_positions §3, §5 and §17 (non-resident 60-day filing "whether or not tax is due" is correct per §5).
6. Nearest: #6 "If incorporation would save you money, we'll model it." against "We model your numbers and give you a straight answer, including when it is no." Matches. "Most landlords..." is the one unbacked claim (#22).
7. Selling: no FAQ covers the sale, the decision the accidental-landlord persona arrives with.
8. Order. The specialist question (2nd) and the regular-accountant question (5th) are the same question split by two others; they should sit together. The two "do I need one" questions (3rd, 4th) should merge or sit together (#24).

### Related guides and services (nine article cards)

1. Heading "Related guides and services". First sentence: "These guides go further into the subjects on this page: the guide to landlord tax, the finance cost restriction in full, Making Tax Digital for landlords, incorporation, and this year's property tax rates." Yes.
2. The "MTD software compared" card, which repeats the MTD pillar link (#32).
3. Four cards duplicate pillar links in the same section (#32). The card heading "What Does a Property Accountant Do?..." repeats the first FAQ heading.
4. The cost card excerpt (#30).
5. No contradiction. The sibling anchors match the sibling H1s exactly ("Property tax advice from specialist advisors", "Landlord accountants for UK rental income").
6. Nearest: #7 "Plain English explanations, not accounting jargon." The SA100/SA105/SA108 excerpt breaks it (#31).
7. Nothing missing.
8. Right place.

### Work out your own numbers first (shared calculator block)

1. Heading as quoted. First sentence: "Our free calculators give you a first number on the mortgage interest restriction, the cost of incorporating, whether Making Tax Digital applies to you and profit per property." Yes.
2. None.
3. None.
4. None.
5. No contradiction. It has its own H2 rather than sitting under Related guides as pack §1, 3.2 describes, but the harness treats it as shared and the `#free-tools` anchor resolves. No finding.
6. Nearest: #12. Matches ("Bring the result to the first call.").
7. Nothing.
8. Right place.

### Where we work

1. Heading "Where we work". First sentence: "We work with clients anywhere in the UK from one team, and five city pages describe local work:" It answers, but carries the BLOCK (#33).
2. "If you live outside the UK and let property here, the same applies, with the extra non-resident filings handled for you." (#34).
3. The first sentence repeats the opening's coverage sentence (#33).
4. None.
5. "From one team" and "the accountants you deal with ... stay the same" against the panel disclosure (#33, #34, BLOCK).
6. Nearest: #1. The register matches; the claim does not.
7. Nothing.
8. Right place: pack §1, 3.2 puts it as H2 10.

### Talk to us about your portfolio (shared `LeadCTAPanel`)

Shared component, unchanged per pack §1, 3.1 item 12. The contact facts are rendered only here (R27). The one finding is the "Property developer" form option (#37). Answers 1 to 8: no further finding.

## Whole page

**9. The reader walk.**

*First-time landlord with one flat.* They read the opening, skim the six services, and stop at "Specialist property accountants, not a general practice", which is written for someone who already has an accountant. Their question, "Do I need a property accountant for one buy-to-let?", is the fourth FAQ, most of the way down the page, and its answer ("Often not.") is honest and on-voice. They would click "First-time and accidental landlords" in "Who we work with", or the landlord-accountant sibling line near the bottom, which is probably their real page. They cannot find whether their single mortgaged flat crosses the line without working it out themselves; the Section 24 calculator is the nearest help. They would book only if they are a higher-rate taxpayer with a mortgage, which is the outcome the page intends.

*Eight-property owner deciding on a company.* They read "Incorporation and structuring advice", the planning worked example and "Accountants for property investors", then jump to the FAQ "Will you tell me whether to incorporate?". They would click the Incorporation Calculator in the free-tools block, or `/for/moving-property-into-a-limited-company`. They cannot find a number on the company side of the choice: the only worked example costs the interest restriction, and the incorporation H3 does not link `/incorporation` (#6, #10). They would book; "We model your numbers and give you a straight answer, including when it is no" is the line that does it.

*Accidental landlord about to sell.* They read the opening and "Capital gains tax on sales" ("with the figure ready before you accept an offer"), which is the hook. They would click "Selling a buy-to-let" or "First-time and accidental landlords" in "Who we work with". They cannot find anything on the former-home relief beyond "any relief for a former home", and no FAQ covers selling. They would probably book, because the 60-day deadline line creates a reason to act now without the page pushing urgency.

**10. The ten-second read.** Title, H1 and opening say what the page offers (property accounts, returns, company accounts, MTD, tax planning), for whom (UK landlords, investors, property companies) and what to do next (a free first call, fee approved before work starts). The H2 list is clear, but four of its first five H2s carry near-synonyms of the same noun (property accountant, specialist property accountants, property tax accountant, accountants for property investors), so it reads as phrase coverage rather than as a path. The first FAQ, "What does a property accountant do?", repeats H2 1, so the ten-second reader gets the definition twice and nothing on cost. Verdict: yes, a ten-second reader knows the offer, the audience and the next step. One thing in the shared header undercuts it: the logo text "PropertyAccountants UK" against "Property Tax Partners" in the title and footer.

**11. Register verdict.** Check 14 is on target for sentence length 21.1 (17 to 22), you/your 33.2 (28 to 40), we/our 24.1 (20 to 30; doubled as instructed), statute 0.0 (ceiling 0.5), numbers 19.6 (15 to 25) and question headings 23.5% (20 to 35%). Two measures are off. Flesch is 56.8 against 45 to 55; the page is slightly too easy, and the cause is fragments (the four timeline H3 bodies and the bold-label lines), not plain words. Jargon is 1.37 against 1.0 or below. Check 19 counts 2,574 body words against the 2,400 ceiling, and the probe's own count is 2,197. The three sentences that pull the page furthest from target:
- "Whose name it sits in, and whether a Form 17 election matches that." (a form number, as a fragment)
- "Treated as a deduction or as a basic rate tax reducer." (jargon, a fragment, and wrong on its face; #12)
- "What you get: accounts filed on time, a director's loan account that reconciles, and a plan for drawing money out." (the back-office noun the spec §2 line 40 list warns about)

**12. The single change.** Cut the four-H3 "twelve months" timeline (The refurbishment, The ownership, The finance costs, The disposal, and "All four are settled...") from the planning section, so the specialist section's four tests become the page's only statement of the interest, repairs, ownership and sale points. That removes the page's largest repetition, two of its three worst register sentences and a contradiction with house_positions §4, and takes about 75 words off a body that check 19 puts 174 words over the 2,400 ceiling; the other cuts in this review (#7, #14, #16, #20, #34) cover most of the rest.
