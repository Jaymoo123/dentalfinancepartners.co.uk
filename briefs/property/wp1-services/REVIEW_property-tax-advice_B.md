# Review B: `/services/property-tax-advice` (draft 2)

Reviewer B, 2026-10-09. Read: the rendered `Property/web/.next/server/app/services/property-tax-advice.html` (text of `<main>`, plus the JSON-LD), `ANSWER_PATTERN_SPEC_services_2026-10.md`, the pack `property-tax-advice.pack.md` §1, §2, §3, §5, §6, `docs/property/house_positions.md`, and `VERIFY_property-tax-advice_draft2.md`. To check two findings I also opened the matcher (`scripts/track2_query_coverage.py` `classify_query`, `scripts/service_page_verify.py` checks 6 and 14) and the applied link set the pack points to (`LINKS_APPLIED_2026-10-09.md`). Nothing else.

Harness baseline: 0 BLOCK, 5 WARN. Body 2,393 words excluding the FAQ (ceiling 2,400). Probe: sentence_len 22.5, flesch 55.6, we 30.4, numbers 26.8 per 1,000, all slightly outside target; everything else inside.

Counts: **1 BLOCK, 23 FIX, 12 NOTE.**

## Findings

| # | Section | Type | Quote (from the page) | Rule broken | Replacement |
|---|---|---|---|---|---|
| B1 | H2 "Tax advice for landlords: what a consultation covers", H3 "Capital gains tax planning on a sale or gift" | BLOCK | "Gifts count: a gift to family is taxed as if you had sold, so the bill can arrive with no cash to pay it." | `house_positions.md` §5 Reliefs: "Spouse / civil partner transfers: no-gain-no-loss under s.58 TCGA 1992" (and §24.4). A spouse is family; a gift to a spouse is not taxed as a sale. The page itself sends spouse moves to us ("Moving property between spouses ... touches four taxes"), so the reader is likely to read this as covering them. | "Gifts count: a gift to anyone except your spouse or civil partner is taxed as if you had sold it at market value, so the bill can arrive with no cash to pay it." |
| F1 | H1 and opening | FIX | "Your accounts stay where they are, and we work by video call across the UK." | Pack §1, 3.1 item 3: the opening says who the page is for and where, "(UK-wide, remote, registered office in Shipley)". The 78-word opening never names landlords or investors and leaves out Shipley. | Sentences 2 and 3 become: "We work only on property tax, for landlords and investors: bring us one decision, from a purchase or gift to an HMRC letter, and we cost each option before you commit. Your accounts stay where they are; we work by video call across the UK from our registered office in Shipley, West Yorkshire." (about 89 words in total, inside the 60 to 90 limit; sentence 1 is left alone, see N3) |
| F2 | H2 "Tax advice for landlords: what a consultation covers", all six H3s | FIX | e.g. "We work out whether your properties belong in your own name, joint names or a company, and what a move costs. What we model: the stamp duty and capital gains tax a move triggers, against the yearly saving." (38 words) | Pack §1, 3.1 item 5: "each 60 to 120 words". Rendered H3 bodies run 38, 64, 55, 40, 40 and 42 words. None says what the reader leaves with, which the old page did (pack §5: "The ownership structure that fits your numbers, and what moving to it would cost."). | Add one bold-label outcome line to each H3: Incorporation: "What you get: the structure that fits your numbers, and the year a move would pay for itself." Section 24: "What you get: the fixes worth making for your exposure, and the ones that are not." Stamp duty: "What you get: the stamp duty on each way of buying, before you are committed to one." Inheritance tax: "What you get: a gifting order, and a clear view of what your executors will face." HMRC: see F4. Capital gains: see F3. |
| F3 | Same H2, H3 "Capital gains tax planning on a sale or gift" | FIX | "We plan when you sell or give away a property, and in what order, so the gain lands in the cheapest year." | Q7 / persona 3. The old page (pack §5) covered "how to use main residence relief and private residence elections properly". The draft drops it, and that relief is the first question an accidental landlord asks. Facts: `house_positions.md` §5 (PRR, final 9 months). | Add: "If you once lived there: we work out how much of the gain main residence relief still covers, including your last nine months of ownership." |
| F4 | Same H2, H3 "HMRC enquiries and undeclared income disclosures" | FIX | "The usual route: the Let Property Campaign, for undeclared rent." / "Why timing matters: telling HMRC first generally costs less than being found." | Q3. Both lines are said again two sections later ("we prepare the disclosure through the Let Property Campaign") and in the FAQ ("a disclosure you make before HMRC asks normally ends better than one they prompt"). Spec writer's card 10: "Cut repetition, not substance." | Delete both lines. Add: "What you get: the reply or the disclosure, agreed with you before anything goes to HMRC." |
| F5 | H2 "Property tax specialists for the decisions that cost most" | FIX | "HMRC has written to youWhat you say first shapes the whole enquiry, so we settle your position before you reply." | Q3. This is the third of four statements of one point: H3 "We settle your position before you answer HMRC", H2 5 "agree the reply before it goes", FAQ "settle your position before you reply, because your first answer shapes the rest of the enquiry". The H2 5 section and the FAQ keep it. | "HMRC has written to you: The letter has a reply date. We check the figures behind it before you answer." |
| F6 | Same H2 | FIX | "Someone has sold you a schemeWe check a proposed structure before you commit money, and say where it holds and where it fails." | Q5, the section contradicts itself: "sold you" means the money is already committed, and the next sentence says "before you commit money". The old label (pack §5) was "I have been offered a scheme". | "Someone has offered you a scheme: We check a proposed structure before you commit money, and say where it holds and where it fails." |
| F7 | Same H2 | FIX | "Moving property between spouses or into a company touches four taxes at once; we model them together." | Spec §2 pattern F ("Name the tax, link the guide, stop"). "Four taxes" leaves the reader to guess which four. | "Moving property between spouses or into a company touches capital gains tax, stamp duty, income tax and inheritance tax at once; we model them together." |
| F8 | Same H2 | FIX | "A landlord tax specialist is worth most before the event, so call while it is still a choice." | Q3: it repeats the section's first sentence ("each cheaper to get right before than to unpick after"). Q4: it exists for the pack §2 body row "landlord tax specialist". All three terms occur elsewhere on the page, so check 6 still passes without it (`classify_query` matches terms, not a literal string). | Delete. The "Book a consultation" button below it remains the section's one hand-off. |
| F9 | H2 "Property tax advisor or accountant: which do you need?" | FIX | "We change what happens next, which is why a buy-to-let tax advisor earns their keep before a purchase, a disposal or an incorporation." | Q4: written for the pack §2 row "buy-to-let tax advisor". The voice also switches from "we" to "their" within one sentence (spec writer's card 1). | "We change what happens next, so as a buy-to-let tax advisor we earn our keep before a purchase, a disposal or an incorporation." (keeps the terms check 6 needs) |
| F10 | Same H2 | FIX | "Many landlords keep their accountant and use us only for the decision." | Q3. The FAQ says the same thing: "Many of the landlords we advise stay with their existing accountant for the annual return and come to us only for the decision that sits outside it." The FAQ copy is also schema copy and has to stand alone, so the body line is the one to cut. | Delete. |
| F11 | H2 "Who we work with" | FIX | "We work only on property tax. We do not advise trading businesses or payroll." | Q3: the opening already says "We work only on property tax:". Also, "advise ... payroll" does not parse. Owner-voice #8 ("We do not serve restaurants, retailers or consultants.") is the model. | "We do not advise trading businesses, and we do not run payroll." |
| F12 | Same H2 | FIX | "Small landlords with one or two properties, where our small landlord tax advice often ends in “change nothing”." | Q4: the phrase is repeated to serve the pack §2 row "small landlord tax advice". "Small" stays on the page through the FAQ heading, so check 6 still passes. Pack §1 3.1 item 6 asks for each audience to link its `/for/*` page, and this line has no link. | "Landlords with one or two properties, where our advice often ends in “change nothing”; our page for <a href=/for/first-time-and-accidental-landlords>first-time and accidental landlords</a> covers the basics." |
| F13 | H2 "How an engagement works" | FIX | "The first call is free and commits you to nothing." | Q3, said twice already in the same section: "the first one costs nothing" and "Nothing ties you to us afterwards." | Delete. |
| F14 | Same H2, deliverables list | FIX | "A follow-up call to challenge the answer before you act" | Q2/Q3: step 03 already says it ("then a call so you can push back"). | Delete this list item. |
| F15 | H2 "What advice costs" | FIX | "How much property tax consultants charge turns on four things: how many properties, how they are owned, how many taxes the decision touches, and how much modelling it takes." | Q4: the query string from the pack §2 `fees_section` row ("how much do property tax consultants charge") is used as the subject of the sentence. Spec §4: "Sentences that exist for a query". | "What we charge as property tax consultants turns on four things: how many properties, how they are owned, how many taxes the decision touches, and how much modelling it takes." (has all five query terms, so check 6 holds) |
| F16 | FAQ "What does a property tax consultation cost?" | FIX | "A single sale is a small job; a portfolio split across spouses and a company is a large one." | Q3: near-verbatim of the fees H2 ("Timing the sale of one flat is a small job; restructuring a portfolio across two spouses and a company is a large one."). Spec writer's card 10. | Delete it from the FAQ answer and from `FAQPage` together. The answer drops to about 51 words, still inside 40 to 90. |
| F17 | H2 "The rules your advice has to work around in 2026/27" | FIX | "The rules your advice has to work around are moving, and several changes already in law land by April 2028." | Q1: the sentence repeats the heading back and names no rule. Spec §2 pattern A: the first sentence answers the heading. | "Five changes already in law shape the advice we give this year and next: new rates on rental income, a higher mortgage interest credit, Making Tax Digital, a claim rule for incorporation relief and frozen inheritance tax bands." |
| F18 | Same H2, table | FIX | "Rises from 20% to 22%, matching the new basic rate, so the higher-rate gap stays at 20 points" | Q3: the worked example above it ("The gap between relief and rate stays at 20 points") and the FAQ ("so a higher-rate landlord's gap stays at 20 points") say the same. Spec §2 "Rate sets repeated"; check 14 numbers_per_1k 26.8 against a ceiling of 25. | Delete the "Tax credit for mortgage interest" row. The worked example carries the point in the body and the April 2027 FAQ carries it in the schema. |
| F19 | FAQ "Do you give advice on incorporation?" | FIX | "Our buy-to-let incorporation guide explains the test and has a calculator for a first number." | Spec writer's card 3 ("link the guide"); pack 3.4 links out to `/incorporation`. The answer refers to a guide and does not link it. | Same sentence, with "buy-to-let incorporation guide" linked to `/incorporation` in the visible answer (the schema string is unchanged). |
| F20 | H2 "Related guides and services" | FIX | "For the yearly returns and accounts rather than one decision, see our landlord accountants for UK rental income , or the property accountant service linked near the top of this page." | Pack §1 3.1 item 11: name both siblings by their H1s. "linked near the top of this page" is a pipeline artefact showing in copy (`standard_terms` §4, editorial track). | "For the yearly returns and accounts rather than one decision, see our landlord accountants for UK rental income, or, where the property sits in a company, our property accountants for UK landlords and investors." (link the second if the one-link-per-source rule allows it; otherwise leave it as plain text) |
| F21 | H2 "Where we work" | FIX | (position) "Where we work" renders after the `#book` panel and the form. | Pack §1 3.1 item 12: "the `LeadCTAPanel` that already closes the page". | Move the H2 "Where we work" above "Related guides and services" and leave its copy unchanged. |
| F22 | H2 "Where we work" | FIX | "Each consultation runs the same way wherever you are: a free call, a fixed quote, then the note." | Q2/Q3: this repeats "How an engagement works" in nine words. | Delete. Keep the Scotland and Wales sentence. |
| F23 | H2 "Advice, not another set of accounts" | FIX | "Plenty of people use both. Plenty use only one." | Q2: the second sentence adds nothing. | "Plenty of people use both." |
| N1 | Title | NOTE | "Property Tax Advice from Specialist Advisors \| Property Tax Partners" | Pack 3.4 gives the title as `Property Tax Advice \| Specialist Property Tax Advisors UK`, with this one as the fallback. | For the spec title: it puts the head phrase "property tax specialist" (146 impressions, the title row) closer to its literal form. For keeping the fallback: it is the live title ChatGPT has indexed (pack 3.4), and it passes check 1. |
| N2 | Meta description | NOTE | "...incorporation, CGT timing, Section 24, stamp duty, IHT, HMRC enquiries..." | `house_positions.md` §13: "No abbreviations without defining them at first use." | For spelling them out: a searcher reads plain names. For keeping them: at 153 characters there is no room, and the body spells both out. |
| N3 | H1 and opening; H2 "Advice, not another set of accounts" | NOTE | "Whether you are deciding how to own a property, when to sell it or whether to incorporate, a free consultation scopes the question, quotes a fixed fee, and tells you if you do not need us." / "Most property tax is lost at the point of a decision, not at the point of filing." | Spec §2 pattern A: first sentence in the first person, definition-shaped. | For rewriting: "We give one-off property tax advice to landlords and investors on the decision in front of them." is the shape AI overviews lift. For keeping: both are kept sentences that may be in the ChatGPT fact map (check 18 WARN, no map supplied), and pack 3.4 says cited sentences stay unchanged. |
| N4 | H3 "HMRC enquiries ..." and H2 "Property tax consultants for HMRC enquiries and disclosures" | NOTE | "We settle your position before you answer HMRC about a nudge letter, an enquiry or undeclared rent." / "We act as property tax consultants when HMRC is already involved: ..." | Q3, but the pack requires both (3.4 H3 list item 6 and H2 item 5). | For folding H2 5 into the H3 and the FAQ: it saves about 90 words and one restatement. For keeping both: H2 5 carries the "property tax consultants" h2 row, and the H3 is in `hasOfferCatalog`. |
| N5 | FAQ | NOTE | "What does a property tax consultation cost?" / "Is a property tax specialist worth it for a small portfolio?" | Spec §2 pattern B: the FAQ H3 is the People Also Ask string word for word. Pack §3 maps "How much does tax advice cost?", "Is it worth having a tax advisor?", "How to find a good tax advisor in the UK?" and "Do accountants give free advice?" to this page; the last two are not asked anywhere. | For the verbatim PAA strings: they match what people type. For keeping these: pack 3.4 kept these strings by name, and 12 is the cap. |
| N6 | H2 "The rules your advice has to work around in 2026/27" | NOTE | "*Note: Example figures displayed" | The note sits under a table of enacted rates, so it reads as though the rates are examples. | For moving it under the £12,000 worked example, which is the only example figure there. For leaving it: owner rule 33 and pack 3.4 Preserve put `ExampleFigureNote` on the figure table. |
| N7 | H3 "Background reading before you book" and H2 "Related guides and services" | NOTE | "Our guides on the questions consultations most often turn on." / "These guides cover the ground most of our consultations start from." | Q3/Q8: two reading lists, eight cards then six links, introduced with almost the same sentence. | For merging into one list: less scrolling, one introduction. For keeping both: `backgroundReading` 8 is a preserve item, and 3.1 item 11 requires Related guides. |
| N8 | H2 "Advice, not another set of accounts" | NOTE | "...that is a different service and it lives on our property accountant page ." | Persona 1, and pack §6 row "PTA:504-508", which proposed adding "If you hold property personally and only need the returns, our [landlord accountant service] covers that." here. Not applied. | For moving the landlord-accountant link up here: the one-flat reader finds the right sibling at the moment they ask. For leaving it at the foot: it satisfies 3.1 item 11 and one link per source. |
| N9 | Headings throughout | NOTE | H2 "Property tax advisor or accountant: which do you need?" | Five applied inbound anchors say "property tax adviser" (LINKS_APPLIED rows 11, 27, 51, 58, 60); the page has "adviser" only in the panel H2. | For a second "adviser" in body prose: it matches what the links promise. For leaving it: pack 3.4 asks for "adviser" once, and "advisor" is the live title's spelling. |
| N10 | `#book` panel (shared) | NOTE | "Property developer" (form option) | R21 and spec §3 ("names developers, which `entity.firm` does not"). | For removing it site-wide: the page should not invite a group the firm does not claim. For leaving it: it is a shared component and outside this rewrite. |
| N11 | H3 "Section 24 and finance-cost planning" | NOTE | "Section 24 and finance-cost planning" | Spec §1 jargon (1.0 or below; the page is at 0.51) and writer's card 3. | For a plain name ("Mortgage interest relief planning"), which the H3's own first sentence already uses. For keeping it: it is the pack 3.4 offer name and has to match `hasOfferCatalog`. |
| N12 | Shared footer (outside `<main>`, renders on this page) | NOTE | "PropertyAccountants UK" / "Fixed fees, 24hr response." | Brand name and pack 3.1 item 9 (the 24-hour line stays until F5). | For fixing the footer brand: "Property Tax Partners" is the brand everywhere else. For leaving it: it is site-wide, outside this page's scope, and needs its own sign-off. |

## Section answers

### 1. Title and meta description

1. Title "Property Tax Advice from Specialist Advisors" promises advice from specialists. The meta, "Specialist property tax advice for UK landlords: incorporation, CGT timing, Section 24, stamp duty, IHT, HMRC enquiries. Written advice, free first call.", delivers that. Yes.
2. None. Every clause names an offer or the next step.
3. None that matters (the meta is meant to sum up the page).
4. The title is the pack fallback, not the spec title (N1). No sentence exists only for a query.
5. No contradiction. The six offers in the meta match the six H3s and `hasOfferCatalog`.
6. Matches owner-voice #11 ("Property tax sorted, your way, with ease."): short and flat. Abbreviations are the only drift (N2).
7. Nothing the title implies is missing.
8. n/a.

### 2. H1 and opening

1. H1 "Property tax advice from specialist advisors". First sentence: "Whether you are deciding how to own a property, when to sell it or whether to incorporate, a free consultation scopes the question, quotes a fixed fee, and tells you if you do not need us." It describes the service, not the firm. The definition sentence comes second (N3).
2. None. The three sentences carry what, how and where.
3. "We work only on property tax" is repeated in "Who we work with". That one goes (F11).
4. "we work by video call across the UK" serves the coverage rows as prose. Fine.
5. No contradiction with the FAQ, the schema (`Service.description` "One-off property tax advice for UK landlords and investors ...") or house positions.
6. "We work only on property tax" is owner-voice #1, close to verbatim. Matches.
7. Who it is for (landlords, investors) and the Shipley base (F1).
8. Right place.

### 3. H2 "Advice, not another set of accounts"

1. "Most property tax is lost at the point of a decision, not at the point of filing." It answers the contrast in the heading (N3 for the first-person point).
2. "Plenty use only one." (F23).
3. The property accountant pointer is restated in H2 4 and twice in the FAQ. This one stays because it is the section's link source; the H2 4 line goes (F10).
4. None.
5. "It is a defined piece of work with a fixed fee, not a retainer." agrees with "What advice costs" and with pack 3.1 item 7.
6. "Plenty of people use both." is close to owner-voice #3 (fair to the alternative). Matches.
7. Nothing missing. The note it promises is described under "How an engagement works".
8. Right place.

### 4. H2 "Tax advice for landlords: what a consultation covers" (six H3s)

1. "Our landlord tax advice covers six decisions, and one consultation can take in one or several." Yes. Each H3 also opens with a "We ..." definition, which is pattern A done right.
2. "The usual route: the Let Property Campaign, for undeclared rent." (F4).
3. The HMRC H3 repeats H2 5 and the FAQ (F4, N4). "Incorporation ... against the yearly saving" is repeated in the incorporation FAQ, which is acceptable because the FAQ has to stand alone. "The deadline: where tax is due, the return and the payment are both due 60 days after completion." is repeated in the "already bought or sold" FAQ. I would keep both: the body is the planning case and the FAQ is the after-sale case.
4. "We give stamp duty advice before you exchange" serves the "stamp duty advice" row in natural prose. No finding.
5. "Gifts count: a gift to family is taxed as if you had sold" conflicts with `house_positions.md` §5 on spouses (B1). Other lines check out: Section 24 credit (§4), 60 days where tax is due (§5), no BPR for rental property (§9), pensions in the estate from April 2027 (§9, §15.5).
6. Bold-label lines ("The catch: rental property is an investment, so business relief rarely applies.") are one claim per sentence and close to owner-voice #6. The H3 name "Section 24 and finance-cost planning" is the one back-office term (N11).
7. What the reader receives for each offer, and whether main residence relief helps on a sale (F2, F3).
8. Right place: offers come straight after the positioning.

### 5. H2 "Property tax specialists for the decisions that cost most"

1. "As property tax specialists we see six moments again and again, each cheaper to get right before than to unpick after." Yes.
2. "A landlord tax specialist is worth most before the event, so call while it is still a choice." (F8).
3. The HMRC card repeats the H3, H2 5 and the FAQ (F5). "Your accountant only files" previews H2 4. I would keep it: it is the trigger, and H2 4 is the comparison.
4. "You do not need a property tax expert for every question, but you do for these." serves the "property tax expert" row. It reads as prose, and it is the only place "expert" appears, so keep it. F8's sentence is the query one.
5. "Someone has sold you a scheme" conflicts with "before you commit money" in the same card (F6).
6. "Filing and planning are different jobs. If nobody has modelled your position in years, we will." is close to owner-voice #5 ("We don't wait for you to ask."). Matches.
7. Which four taxes a restructure touches (F7).
8. Acceptable. A reader who has just seen the offers asks "is now the time?", and this answers that.

### 6. H2 "Property tax advisor or accountant: which do you need?"

1. "You need a property tax advisor when a decision is still open, and an accountant when a return is due." Yes, and it is the best first sentence on the page.
2. "Many landlords keep their accountant and use us only for the decision." (F10).
3. The same as H2 1's last paragraph and the FAQs "difference" and "switch accountants". The table stays; F10's line goes.
4. "which is why a buy-to-let tax advisor earns their keep" (F9).
5. No contradiction. The table row "A fixed fee for one defined question" matches "What advice costs".
6. "An accountant reports what has happened. We change what happens next." is owner-voice #3 in shape. Matches.
7. Nothing missing.
8. It answers the question H2 1 raises. It would read better straight after H2 1, but the pack fixes the order, so no finding.

### 7. H2 "Property tax consultants for HMRC enquiries and disclosures"

1. "We act as property tax consultants when HMRC is already involved: a nudge letter about rental income, a formal enquiry into a return, or a disclosure you would rather make before anyone asks." Yes.
2. None. Three sentences: the case, what we do, the route.
3. This section is the owner of the HMRC point; the others go (F4, F5, N4).
4. "property tax consultants" sits in prose. No finding.
5. No contradiction with the FAQ or with `/for/rental-income-disclosure`.
6. "We read the letter with you, work out which years and figures are in question, and agree the reply before it goes." is close to owner-voice #12 (three verbs, the reader's task). Matches.
7. Roughly what a disclosure costs in penalties or interest. That is guide depth, and the `/for` link carries it. Fine.
8. Right place after the triggers.

### 8. H2 "Who we work with"

1. "We work with landlords and property investors facing a tax decision, from one buy-to-let to a portfolio in a company." Yes.
2. "We work only on property tax." (F11).
3. That sentence, against the opening (F11).
4. "Small landlords ... small landlord tax advice" (F12). "Investors who want property investment tax advice before the next purchase, not after it." is borderline but reads as prose. No finding.
5. The commercial line agrees with R21 and the commercial FAQ.
6. "We do not advise trading businesses..." sits close to owner-voice #8. Matches once F11 fixes the grammar.
7. Where a first-time or accidental landlord goes next (F12).
8. Right place.

### 9. H2 "How an engagement works"

1. "An engagement works in three steps, and the first one costs nothing." Yes.
2. "The first call is free and commits you to nothing." (F13).
3. "A follow-up call to challenge the answer before you act" against step 03 (F14).
4. None.
5. "Nothing starts until you approve it." matches the verified fee wording (pack 3.1 item 7). The old page's "turnaround" in step 2 is rightly gone (F5, response time).
6. "If you do not need a consultation, we say so there and then." is owner-voice #10. Matches.
7. Nothing missing (turnaround is withheld by ruling).
8. Right place.

### 10. H2 "What advice costs"

1. "What advice costs depends on the question, and we quote it as a fixed fee before any work begins." Yes, pattern D: the variables follow and then a "we" sentence.
2. None.
3. Near-verbatim with the cost FAQ (F16).
4. "How much property tax consultants charge turns on four things" (F15).
5. "We do not bill by the hour and there is no retainer." agrees with the old page ("No hourly billing and no open-ended engagement").
6. "If the question changes, we tell you before any extra fee applies." is owner-voice #9 almost word for word. Matches.
7. Any figure. That is withheld by R7 until F3, so no finding.
8. Right place.

### 11. H2 "Run the numbers yourself first"

1. "Before you book, you can size several of these questions yourself with our free calculators." Yes.
2. None.
3. "you may not need us at all" is the fifth "we will say if you do not need us" (see Q12). Keep it: it is owner-voice #10 at the point where it applies.
4. None.
5. None.
6. Matches owner-voice #10.
7. Nothing missing.
8. Right place after fees.

### 12. H2 "The rules your advice has to work around in 2026/27" (with H3 "Background reading before you book")

1. "The rules your advice has to work around are moving, and several changes already in law land by April 2028." No, it echoes the heading (F17).
2. The "Tax credit for mortgage interest" table row (F18).
3. The 20-point gap appears three times (F18). Incorporation relief "must be claimed" also appears in the incorporation FAQ. I would keep both: one is a table cell and the other is an answer.
4. None.
5. All rows check against house positions: §7 (22/42/47, Scotland carve-out, Wales included), §4 (credit at 22% from 2027/28), §3 (50k/30k/20k), §5 (s.162 claim from 6 April 2026), §9 (bands frozen to 5 April 2031). The worked example is arithmetically right (20% of £12,000 = £2,400; 22% = £2,640).
6. "We advise on the rules as they will stand." is owner-voice #5 in length. Matches.
7. What the 2-point rise costs a higher-rate landlord in pounds. The example states the credit and stops short of the net.
8. Acceptable as the last body section before the FAQ. The "Background reading" H3 is not a rule and belongs with Related guides (N7).

### 13. FAQ "Questions about a consultation"

1. The first question, "What does a property tax advisor do?", opens "A property tax advisor works out the tax cost of a property decision before you make it." Yes. Every answer's first five words settle the question (pattern B). All twelve run 62 to 78 words.
2. In the cost answer: "A single sale is a small job; a portfolio split across spouses and a company is a large one." (F16).
3. Cost against the fees H2 (F16). HMRC against H2 5 (F5 removes the body duplicate instead). Keep-your-accountant against H2 4 (F10).
4. None. The new April 2027 question serves the PAA "Rachel Reeves' plan" in plain words.
5. The commercial answer, "Gains on commercial property are taxed at the same 18% and 24% rates as residential ones.", contradicts the old page's "different capital gains treatment" (pack §5). The new page is right (`house_positions.md` §5, aligned from 30 October 2024), so no action, but it is a correction worth recording. The April 2027 answer agrees with §7 ("These rates are already law, not a proposal."). The incorporation answer agrees with §5.
6. "Yes, and it happens often." / "Sometimes not, and we will say so." are owner-voice #10. Matches.
7. Two mapped PAA questions go unanswered: how to find a good tax advisor, and whether advice is free (N5). There is also no link for the incorporation guide (F19).
8. Right place.

### 14. H2 "Related guides and services"

1. "These guides cover the ground most of our consultations start from." Yes.
2. None.
3. Its introduction repeats the Background reading H3 introduction (N7).
4. None.
5. Guide labels match the pages' titles, with one exception: "Mortgage interest relief for landlords, explained" against `/section-24`'s "Section 24 Explained: Mortgage Interest Relief for Landlords". That is acceptable under writer's card 3.
6. Neutral register. No finding.
7. Nothing missing.
8. Right place, but "Where we work" should come before it (F21).

### 15. H2 "Get specialist advice from a property tax adviser on the decision in front of you" (shared panel)

1. "Tell us the decision you are weighing up." Yes.
2 to 8. A shared component, excluded from checks 8 and 14. The only findings are N10 and the "adviser" spelling (N9). "If your position is already right, we will say so." is owner-voice #10 verbatim.

### 16. H2 "Where we work"

1. "We advise landlords anywhere in the UK by video call and phone, so your postcode makes no difference to the service; our pages for London, Manchester, Birmingham, Leeds and Bristol describe the local work." Yes. It is the pack's coverage sentence, close to verbatim.
2. "Each consultation runs the same way wherever you are: a free call, a fixed quote, then the note." (F22).
3. Same sentence, against "How an engagement works".
4. The coverage sentence serves the 14 coverage rows without any "near me" string. That is correct by R5.
5. No contradiction. "Where Scotland or Wales has its own version of a tax, such as stamp duty, we advise on that version." agrees with `house_positions.md` §23.
6. Matches owner-voice #12 (plain, the reader's task).
7. Nothing missing.
8. It sits after the panel that is meant to close the page (F21).

## Whole page

**9. Reader walk.**

*First-time landlord with one flat.* They read the opening and H2 1. "If what you actually need is someone to run the annual return ..." tells them they may be on the wrong page, and they click "property accountant page". For a single flat held personally, the better sibling is the landlord-accountant page, and that link sits at the foot (N8). If they stay, the "Who we work with" line and the FAQ "Is a property tax specialist worth it for a small portfolio?" ("Sometimes not, and we will say so.") answer their real question. What they cannot find: a link to the first-time and accidental landlord page (F12). They would book only if a sale or a purchase is coming. That is the right outcome, and the page says so plainly.

*Eight-property owner deciding on a company.* They read the incorporation H3, which is thin at 38 words (F2). They click the Incorporation Calculator under "Run the numbers yourself first", or "Should I incorporate my buy-to-let?", or the `/for/moving-property-into-a-limited-company` link. The incorporation FAQ gives them the claim rule and the break-even framing. They cannot find what the written note on incorporation contains: the break-even year, the stamp duty route, and whether their letting counts as a business. They also cannot find a fee band, which is withheld by R7. They are the most likely of the three to book, because "fixed fee, approve before work starts" and the free call cover the two risks they care about.

*Accidental landlord about to sell.* The opening's "when to sell it" and the CGT H3 hold them, and the 60-day line creates urgency. They click "selling a buy-to-let" or "Cost of selling a house: the full bill". They cannot find whether main residence relief covers part of the gain from when they lived there, which the old page mentioned and this one dropped (F3). They also cannot find whether they owe anything at all. They would stop at the CGT H3 or the "already bought or sold" FAQ. They would book if the sale is near, because the FAQ says "bring the completion date to the first call".

**10. Ten-second read.** Title, H1, the opening, fourteen H2s and the first FAQ. A reader learns that this is one-off property tax advice from a property-only firm, with a free call, a fixed fee and no need to move their accounts. They learn it is for anyone with a property decision or an HMRC letter, and the next step is to book. That works. Two weaknesses: the opening never says "landlords" (F1), and three back-to-back H2s open with keyword variants ("Property tax specialists ...", "Property tax advisor or accountant ...", "Property tax consultants ..."), so the H2 list reads more query-led than the prose under it. Pack 3.4 fixed those headings, so this is a note, not a finding.

**11. Register verdict.** Close to target, and the overshoots are small: sentence_len 22.5 (target 17 to 22), flesch 55.6 (45 to 55), we 30.4 (20 to 30), numbers 26.8 (15 to 25). The sentence-length figure is inflated by tables and lists with no full stops, which the probe joins into single sentences (the rules table becomes one 131-word "sentence", the comparison table 98, the DecisionWindow 86). The prose itself is short, and the spec says "Do not shorten". Flesch is 0.6 too easy. Hold, and do not complicate the copy to fix it. "We" is 0.4 over; F11 and F13 take a few out. Numbers are the real drift. In my count, the rules section holds 41 of the 82 number tokens in the FAQ-excluded body, and its table holds 26. F18 alone brings the page back under 25. The three sentences that pull the page furthest from target:
- "22%, 42% and 47% replace 20%, 40% and 45% in England, Wales and Northern Ireland; Scottish taxpayers stay on Holyrood's rates" (a rate set the spec sends to `/property-tax-rates`; six numbers in one cell).
- "Quarterly updates for qualifying income over £50,000, then over £30,000, then over £20,000" (Making Tax Digital is not one of this page's six offers; the guide and the MTD checker carry it).
- "If what you actually need is someone to run the annual return, the rental schedules, the company accounts and the quarterly Making Tax Digital submissions, that is a different service and it lives on our property accountant page ." (39 words, the longest prose sentence on the page; it could end at "different service" and keep the link).

**12. The single change.** Say each point once: the page tells the reader four times that we settle the HMRC reply first, five times that they can keep their accountant, twice what drives the fee and three times that the 20-point gap holds, and cutting those repeats (F4, F5, F10, F16, F18) frees the words the six offer H3s need to reach the spec's 60 and say what each one delivers (F2).
