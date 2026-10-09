# Review B: `/services/landlord-accountant` (draft 2)

Reviewer B, 2026-10-09. Read: rendered `Property/web/.next/server/app/services/landlord-accountant.html` (text, not scripts, plus the JSON-LD), `ANSWER_PATTERN_SPEC_services_2026-10.md`, pack §1, §2, §3, §5, §6 (with `LINKS_APPLIED_2026-10-09.md` for the final anchor wording), `docs/property/house_positions.md`, and `VERIFY_landlord-accountant_draft2.md` (0 BLOCK, 4 WARN). No other review read. Page not edited.

Totals: **2 BLOCK, 26 FIX, 9 NOTE.**

Section keys used below: S0 title and meta · S1 H1 and opening · S2 What a landlord accountant does for you · S3 Landlord tax accountant: the Section 24 and MTD side · S4 Accountants for landlords with one property or a portfolio · S5 Buy to let accountant: personally held and company held · S6 Rental property accountant for investors and agents · S7 Who we work with · S8 How it works · S9 How our fees work · S10 Questions landlords ask (FAQ) · S11 Related guides and services · S12 Speak to an accountant (shared `LeadCTAPanel`) · S13 Where we work.

## Findings

| # | Section | Type | Quote (from the page) | Rule or spec line broken | Replacement |
|---|---|---|---|---|---|
| 1 | S3, worked example "One landlord, one year" | BLOCK | "£50,000 of rent, £8,000 of running costs, £18,000 of mortgage interest." with the caption "Taxed at 40% on that slice, relieved at 20%." | house_positions §4 and §7 (the wedge exists only for a higher or additional-rate landlord; a basic-rate landlord sees none); §21.4 (basic rate band ends at £50,270). As stated, the landlord's only income is £42,000 of taxable rent, all inside the basic rate band, so the £3,600 is wrong for the facts given. standard_terms §4 (every number re-derivable). | "£50,000 of rent, £8,000 of running costs, £18,000 of mortgage interest, on top of a salary that already uses up the basic rate band." |
| 2 | S1, opening | BLOCK | "The first call is free, and the fee is fixed and agreed with you before any work begins." | pack §0 ("the only fee wording is: fixed fees quoted upfront, you approve the fee before work starts"); pack §1 §3.1 item 7 ("the only fee claim allowed until F3 exists"). A paraphrase is how "fixed annual fee in writing" crept back last time. | "The first call is free, our fees are fixed and quoted upfront, and you approve the fee before work starts." |
| 3 | S1, opening | FIX | "...file quarterly Making Tax Digital updates and keep company accounts in order." | house_positions §13 (define abbreviations at first use). "MTD" first appears undefined in the S3 heading. | "...file quarterly Making Tax Digital (MTD) updates and keep company accounts in order." |
| 4 | S1, coverage sentence | FIX | "Landlords across the UK use us without ever visiting an office: everything runs by video call, phone and email, and our city pages for Leeds, Manchester, Birmingham, London and Bristol explain how we work locally in each." | pack §1 §3.1 item 3 (the opening states where: "UK-wide, remote, registered office in Shipley"). Shipley appears only in the footer. | "Landlords across the UK use us without ever visiting an office: our registered office is in Shipley, everything runs by video call, phone and email, and our city pages for Leeds, Manchester, Birmingham, London and Bristol explain how we work locally in each." |
| 5 | S2, all six H3 items | FIX | Item lengths 42, 53, 41, 45, 43 and 52 words (Self Assessment to Undeclared disclosures, counted from the rendered text). | pack §1 §3.1 item 5 ("each 60 to 120 words"). | Do not pad. Swap the label lines that repeat later sections (rows 6 to 11) for item-specific lines, and add one more per item from: "What we need: ..." (the documents for that service) or "When: ..." (the filing date it serves). That lifts each item to about 60 words and removes the repetition in one edit. |
| 6 | S2, H3 Self Assessment for rental income | FIX | "What you see: A figure for each property, not only the total." | Q3: repeats the Portfolio item's definition sentence "We produce a profit and loss for every property you own, next to the single pooled figure your return declares." The Portfolio item keeps it. | "Deadline: We file ahead of 31 January, so the payment date is never a surprise." |
| 7 | S2, H3 Section 24 finance-cost workings | FIX | "The catch: The credit is 20% of the interest, so a higher-rate landlord loses half the relief." | Q3: S3 says "so a higher-rate taxpayer loses half the relief" and the example caption says it a third time. Spec §2 pattern C and writer's card 4 (numbers in a worked example or FAQ answer only). S3 keeps it. | "What you get: The extra tax the rule costs you this year, in pounds, before January." |
| 8 | S2, H3 Section 24 finance-cost workings | FIX | "From April 2027: The credit rises to 22%, alongside new rates on property income." | Q3: S3 ("The new property income rates from April 2027 raise the credit and the rate together") and the example caption ("From April 2027 the rates become 42% and 22%") both repeat it. Spec §2 pattern C. | "What we need: Your lender's annual interest statement for each mortgage." |
| 9 | S2, H3 Making Tax Digital quarterly updates | FIX | "Who is in: Rent plus self-employed income over £50,000, then over £30,000 from April 2027." | Spec §2 pattern C and writer's card 4 (number outside a worked example or FAQ answer); Q3: the MTD FAQ gives the same thresholds and S3 gives the schedule. | "Who is in: Anyone whose rent and self-employed income together pass the threshold; our MTD checker gives your start date." |
| 10 | S2, H3 Buy-to-let company accounts and Corporation Tax | FIX | "Interest: A company takes mortgage interest off its profit in full." | Q3: said four times (here; S5 "mortgage interest comes off the profit in full before Corporation Tax"; FAQ ownership "A company deducts interest in full"; FAQ deductions "while companies deduct it in full"). S5 keeps it. | "Filing: Accounts to Companies House and the Corporation Tax return to HMRC, on the company's own year end." |
| 11 | S2, H3 Portfolio accounts and pooling | FIX | "Why it matters: Pooling hides the property that loses money." | Q3: S4 says it ("a flat that lost money all year simply disappears into it") and the pooling example caption says it again ("the property losing £4,800 a year never appears"). S4 keeps it. | "What we need: Rent, costs and mortgage statements for each property, kept apart." |
| 12 | S3, first sentence | FIX | "As landlord tax accountants, we spend most of our time on the two rules that move your bill furthest: the mortgage interest restriction and quarterly reporting under Making Tax Digital." | house_positions §3 (MTD is a reporting regime; it does not change the tax owed), so "move your bill" is wrong for MTD; "most of our time" is an unverifiable workload claim (standard_terms §4). | "As landlord tax accountants, we handle the two rules that change a landlord's year most: the mortgage interest restriction, which moves the bill, and quarterly reporting under Making Tax Digital, which moves the paperwork." |
| 13 | S3, second paragraph | FIX | "Individual landlords are taxed on the profit before interest and then given a credit at the basic rate, so a higher-rate taxpayer loses half the relief, and the larger profit can also cost child benefit or part of the personal allowance." | Q7: house_positions §4 and §7 (a basic-rate landlord sees no wedge). The section never tells the basic-rate reader, who is most of the one-flat audience, that the rule usually costs them nothing extra. | Add after it: "If all your income stays inside the basic rate band, the credit usually matches the tax and the rule costs you nothing extra." |
| 14 | S4, second paragraph | FIX | "With one property, the job is a correct return and every cost you are entitled to claim, and you may not need an accountant for landlords every year; the questions below say when it starts to pay." | Q4: exists for the body row "accountant for landlords" (pack §2, 78 impressions); "every year" reads as a hedge the reader cannot act on. | "With one property, the job is a correct return and every cost you are entitled to claim, and you may not need an accountant for landlords at all; the questions below say when one starts to pay for itself." |
| 15 | S5, second paragraph | FIX | "...because a repair filed as an improvement is a claim lost this year, and the reverse adds to the gain when you sell." | Accuracy: an improvement filed as a repair is a wrong claim HMRC can disallow with interest and a penalty (house_positions §27 penalty framework); "adds to the gain" describes the side effect, not the risk. | "...because a repair filed as an improvement is a deduction lost this year, and an improvement filed as a repair is a claim HMRC can take back with interest and a penalty." |
| 16 | S5, last paragraph | FIX | "When you sell, a UK resident who owes capital gains tax has to report and pay it within 60 days of completion." | Q7 and persona 3: house_positions §5 (private residence relief; final 9 months always qualify). The accidental landlord selling a former home is the main relief case and the page never names it. | Add after it: "If the property was once your home, private residence relief can cover part or all of the gain, and we work out how much before you report." |
| 17 | S6, first sentence | FIX | "We also act as rental property accountant for two groups whose work goes beyond one tax return: property investors, and the letting agents who manage homes for landlords." | Q4: "act as rental property accountant" (no article) exists for the h2 row "rental property accountant", which the H2 already carries (pack §2). | "We also act for two groups whose work goes beyond one tax return: property investors, and the letting agents who manage homes for landlords." |
| 18 | S6, agents paragraph | FIX | "For letting and managing agents, we keep the agency's own books apart from client money, recognise commission when it is earned, deal with VAT on fees, and run the non-resident landlord scheme where you collect rent for owners abroad." | Q3: the agents FAQ repeats it almost word for word ("recognise commission and management fees when they are earned, deal with VAT on fees, and handle the non-resident landlord scheme where you collect rent for owners abroad"). The FAQ keeps the list (schema answer); the body shortens. | "For letting and managing agents, we keep the agency's own books apart from client money and run the non-resident landlord scheme for owners abroad." |
| 19 | S7, H3 list | FIX | No HMO or multi-let audience. Nearest: "A growing portfolio: You are buying and refinancing, and the question is whether the next purchase belongs in a company." | pack §6 ("The page must answer what these anchors promise"): two applied anchors point here, "Our team of HMO and multi-let accountants" (`audiences.ts:1388`) and "an accountant for HMO landlords" (`hmo-tax-guide...md:189`), LINKS_APPLIED rows 31 and 88. The page never says HMO. | New H3 "HMOs and multi-lets": "You let a house room by room, and the return has to carry the bills, licensing costs and furnishings you pay as the landlord." Link: "HMO and multi-let landlords" to `/for/hmo-and-multi-let-landlords`. |
| 20 | S8, first sentence | FIX | "It works in three steps, the first of them a free call." | Spec §2 pattern A (first sentence under any heading answers it in the first person). | "We work in three steps, and the first is a free call." |
| 21 | S8, H3 Handover, then the year | FIX | "We ask your old accountant for clearance, get authorised with HMRC as your agent and set your records up for quarterly filing." | Q5: contradicts the MTD FAQ ("Property held in a limited company is outside the regime") and the threshold schedule; not every client files quarterly. | "We ask your old accountant for clearance, get authorised with HMRC as your agent and, where Making Tax Digital applies to you, set your records up for quarterly filing." |
| 22 | S9, second paragraph | FIX | "Buy to let accountant fees for one flat with tidy records cover a small job. A buy to let limited company adds accounts and a Corporation Tax return, so the accountant cost is higher." | Q4: two sentences built for the fees_section rows "buy to let accountant fees" and "buy to let limited company accountant cost" (pack §2); "fees ... cover a small job" does not parse as speech. | "For one flat with tidy records, buy to let accountant fees reflect a small job; a buy to let limited company adds accounts and a Corporation Tax return, so its accountant cost is higher." |
| 23 | S9, last paragraph | FIX | "You get the figure after the first call and before anything starts, and you are never signing up to an open hourly rate." | Q2 and Q3: "before anything starts" repeats the section's own first sentence ("you approve the fee before work starts"), S8 step 2 and the cost FAQ. | "We give you the figure after the first call, and you are never signing up to an open hourly rate." |
| 24 | S10, What does a landlord accountant do? | FIX | "We do both, and we tell you the bill before it is due." | Q3: the opening says "We also tell you what the bill will be before it arrives." The opening keeps it. | "We do both, for one flat or a portfolio." |
| 25 | S10, Should I own property personally or through a limited company? | FIX | "We run both routes first." | Spec §2 pattern D (the "we" sentence says what we do with the variables); "run ... first" leaves the reader to guess first before what. Old page: "We model both before you decide." | "We model both routes on your own figures before you decide." |
| 26 | S10, Do I have to file quarterly under Making Tax Digital? | FIX | "It is measured on gross income, not profit, and joint owners count only their share." | Q3: the first sentence of the same answer already says "before expenses"; "started from" in that sentence is also clumsy. | Whole answer: "Yes, if your rental and self-employed income together is over £50,000 before expenses: quarterly updates have applied since 6 April 2026. The threshold drops to £30,000 from April 2027 and £20,000 from April 2028. Joint owners count only their share, and property held in a limited company is outside the regime. Our MTD checker tells you which year applies to you." |
| 27 | S10, Which accounting services does a buy-to-let investor need for tax returns and compliance? | FIX | "We should be able to say on the first call which you need." | Spec §3 owner voice #5 and #6 (promise of behaviour, no hedge); Q3: the answer's first three items repeat the first FAQ's list. | "We will tell you on the first call which of these you need." |
| 28 | S10, What tax deductions can UK landlords claim? | FIX | "...accountancy fees, and replacing furnishings in a furnished let." | Accuracy: replacement of domestic items relief (ITTOIA 2005 s.311A) covers any let dwelling, furnished or not; the wording tells an unfurnished landlord that a new fridge or cooker is not claimable. Not locked in house_positions, so flag rather than cite a section. | "...accountancy fees, and replacing furniture, appliances and other domestic items in a let home." |
| 29 | S1, coverage sentence | NOTE | "...and our city pages for Leeds, Manchester, Birmingham, London and Bristol explain how we work locally in each." | Pack §1 §3.3 coverage statement names the five cities; §3.1 item 13 and writer's card 9 say a city is named only in the locations block. | Keep: the page-specific spec wins and it serves the 18 coverage rows. Cut: the shared rule wins and S13 already links all five. |
| 30 | Whole page, check 14 | NOTE | Flesch 60.0 against a 45 to 55 target. | Spec §1 ("Already easier than the winners. Hold."); writer's card 10 ("Do not simplify"). | Treat as a defect: lengthen the label fragments and FAQ openers back toward 55. Accept: sentence length is in band (21.3), so the score comes from plain words, which the owner-voice sentences use too. |
| 31 | S2, offer list | NOTE | Six offers, none for a sale, although S5 says "We do the calculation and file the report." | Pack §1 §3.3 fixes the six H3s; persona 3 (accidental landlord selling) has no offer to recognise. | Add "Capital gains tax on a sale" as a seventh offer and schema item: matches what the page does. Keep six: the pack fixed the list and the sale work belongs to `/for/selling-a-buy-to-let`. |
| 32 | Whole page, check 12 | NOTE | 12 mismatches: none of the six offer names appear on `/services` or `/`. | VERIFY draft2 check 12. | Fix the other surfaces: consistent entity signals. Leave: `/` is frozen and needs sign-off, and the services index card already links here. |
| 33 | S10, FAQ set | NOTE | No FAQ for the PAA "How to avoid paying 40% income tax on rental property?", mapped to this page (pack §3, "Partly"). Nearest: S3 "model the options if it is pushing you into a higher band." | Pack §3 mapping; FAQ is at the 12-item cap (§3.1 item 10). | Swap it in for the buy-to-let investor FAQ (5 impressions, overlaps the first FAQ). Keep: that question is the assigned faq row and the 40% answer lives in S3. |
| 34 | S6, investors paragraph | NOTE | "If you buy to refurbish and sell, mix residential with commercial property, or invest alongside partners, HMRC's first question is whether you are trading or investing..." | Pack §0 R21 (commercial yes, development no). | Keep: buying to refurbish and sell is property trading, not development, and the trading test is the point. Cut: a reader may read it as a development offer the firm does not make. |
| 35 | S7, H3 Undeclared rental income | NOTE | "Rent went undeclared, by oversight or because the returns stopped, and you want it put right before HMRC asks." | Q3: the same point is in S2 ("Telling HMRC first costs far less than being found.") and the disclosure FAQ ("the penalties are much lower than if HMRC finds it first"). | Keep: §3.1 item 6 wants every audience one sentence here, linking its page. Cut: three statements of one point on one page. |
| 36 | S13, first sentence | NOTE | "We work with landlords in every part of the UK, and with UK landlords who now live abroad." | Q3: the opening coverage sentence and the shared `LocationMap` line ("We act for landlords across the UK, not only in these cities.") say the same thing. | Keep: §3.1 item 13 makes this the local block, and a reader who scrolls here needs it. Cut: it is the third time. |
| 37 | S10, Can you help if I have not declared rental income? | NOTE | "The earlier you come forward, the better your position, so it is worth a call before HMRC writes to you." | Spec §2 pattern E ("No urgency"). | Keep: it is a fact about prompted and unprompted penalties (house_positions §27.6), not sales pressure. Soften: end at "the better your position." |

## Numbered answers, by section

### S0. Title and meta description

Title: "Landlord Accountant for UK Rental Income and Buy to Let | Property Tax Partners". Meta: "Landlord accountants for UK rental income: Self Assessment, Section 24, MTD quarterly filing, buy-to-let and portfolio accounts. Free first call." (145 characters, in the 140 to 155 band.)

1. Yes. The meta's first clause repeats the title's promise and its list names the services.
2. None. Every clause names a service or the call.
3. The meta repeats the H1 by design (pack §3.3). No action.
4. No. "UK" appears once in each, not stacked.
5. No contradiction. The title matches pack §3.3 exactly; the meta drops "company accounts" from the spec string, which the page does carry. No finding.
6. Not prose; owner voice does not apply.
7. Nothing the title implies is missing.
8. Right place. No finding.

### S1. H1 and opening

H1 "Landlord accountants for UK rental income". First sentence: "We are landlord accountants for anyone with rental income in the UK, from one flat to a portfolio, held personally or through a company."

1. Yes, in the first person and definition-shaped (pattern A). 79 words, in the 60 to 90 band.
2. None. Each sentence carries one of who, what, the advice promise, the call and fee.
3. "We also tell you what the bill will be before it arrives." repeats in FAQ 1 ("we tell you the bill before it is due"); the FAQ line goes (row 24).
4. The coverage sentence exists for the 18 coverage rows, which is its job (§3.1 item 4). It reads as prose. No change beyond row 4.
5. The fee sentence departs from the only allowed fee wording (row 2, BLOCK). "file quarterly Making Tax Digital updates" is unqualified against the MTD FAQ's threshold; acceptable in an opening because the FAQ qualifies it, and row 21 fixes the step that states it as fact.
6. Nearest: #11 "Property tax sorted, your way, with ease." and #5 "We don't wait for you to ask." Register matches: direct address, plain nouns, one claim per sentence.
7. Where the firm is (Shipley), which §3.1 item 3 requires (row 4).
8. Right place.

### S2. What a landlord accountant does for you (six H3 items)

First sentence: "A landlord accountant does the filing and the thinking: we keep the returns right and say, before the year ends, what would lower the bill."

1. Yes. Each H3 also opens with a "We ..." definition sentence, as pattern A wants.
2. "Why it matters: Pooling hides the property that loses money." (S4 makes the point in full). Rows 6 to 11 list the other label lines that repeat later sections.
3. Yes, five label lines repeat S3, S4, S5 or the FAQ (rows 6 to 11). The H3s are the short form, so the label lines go and the long sections keep the points.
4. None. The H3 names are the pack's offer names and match `hasOfferCatalog`.
5. No contradiction. 20% now, 22% from April 2027 and the £50,000 and £30,000 thresholds match house_positions §3, §4 and §7.
6. Nearest: #12 "Give them a straight answer at the desk, run the number in front of them, and forward a page that settles it." The definition sentences match (verb, object, no adjective). The label lines are fragments, which is the AI-overview shape §3.1 item 5 asks for.
7. What each service needs from the reader and when it lands; every item falls short of the 60-word floor (row 5).
8. Right place (§3.1 item 5).

### S3. Landlord tax accountant: the Section 24 and MTD side

First sentence: "As landlord tax accountants, we spend most of our time on the two rules that move your bill furthest: the mortgage interest restriction and quarterly reporting under Making Tax Digital."

1. It answers the heading but misstates MTD as moving the bill (row 12).
2. "The new property income rates from April 2027 raise the credit and the rate together, which leaves that gap exactly where it is." The example caption says the same with figures ("From April 2027 the rates become 42% and 22%, so the wedge is unchanged."). Keep one; the caption is the more concrete.
3. Yes: "loses half the relief" and the April 2027 point both repeat the S2 H3 (rows 7, 8). This section keeps them.
4. "As landlord tax accountants" serves the body row "landlord tax accountants" (8 impressions). It reads as prose; keep.
5. The worked example contradicts house_positions §4 and §7 for the facts as stated (row 1, BLOCK). The rest matches: 2027 reducer at 22%, wedge unchanged, child benefit and personal allowance effects (§4).
6. Nearest: #6 "If incorporation would save you money, we'll model it." "We run this working on your own figures every year, show you the result before January, and model the options if it is pushing you into a higher band." matches: condition, then what we do.
7. Whether a basic-rate landlord is affected at all (row 13).
8. Right place: after the services list, the first question a landlord has is what the interest rule costs.

### S4. Accountants for landlords with one property or a portfolio

First sentence: "We act as accountants for landlords with a single let and for landlords with twenty, and the work changes shape as you grow."

1. Yes.
2. "The portfolio profitability calculator gives you that view on your own numbers." could go (the calculators block repeats the tool), but it is the per-tool link the tests need (pack §3.3). None, for that reason.
3. "a flat that lost money all year simply disappears into it" repeats the S2 portfolio label and the example caption; this section keeps it and the S2 line goes (row 11).
4. "you may not need an accountant for landlords every year" (row 14).
5. No contradiction. "All your UK lets count as one property business" matches the old page's pooling text (pack §5).
6. Nearest: #10 "If your position is already right, we will say so." "you may not need an accountant" is the same permission not to buy. Register matches.
7. Nothing major; the reader learns what changes with scale.
8. Right place.

### S5. Buy to let accountant: personally held and company held

First sentence: "Whichever way you hold a buy to let (BTL), in your own name, jointly or in a limited company, we do the accounts and returns that go with it, and the job is different for each."

1. Yes, and it defines BTL at first use (house_positions §13).
2. "We model the whole cost, the way out included, before you decide." is load-bearing. None.
3. "mortgage interest comes off the profit in full before Corporation Tax" is the fourth statement of that point; this one stays (row 10). The incorporation-as-sale sentence repeats in the ownership FAQ; acceptable, because the FAQ answer has to stand alone in schema.
4. "As accountants for buy-to-let landlords with a company" serves the body row "accountants for buy-to-let landlords" (115 impressions). It is slightly stilted but reads as prose; keep. "BTL accounting" serves its row once, as the pack asked.
5. No contradiction. The 60-day rule "who owes capital gains tax" matches house_positions §5 (only where tax is due). The repair and improvement clause misstates the risk (row 15).
6. Nearest: #3 "A generalist accountant will work with what you give them, but that's not the same as understanding how a property portfolio actually operates." Matches: reason given, no hedging stack.
7. Private residence relief for a former home being sold (row 16).
8. Right place.

### S6. Rental property accountant for investors and agents

First sentence: "We also act as rental property accountant for two groups whose work goes beyond one tax return: property investors, and the letting agents who manage homes for landlords."

1. Yes, but phrased for the query (row 17).
2. None. Investors and agents each get one paragraph.
3. The agents list repeats the agents FAQ (row 18).
4. The first sentence (row 17).
5. No contradiction with house_positions. The investors paragraph sits near R21's "development no" line (NOTE 34).
6. Nearest: #8 "We do not serve restaurants, retailers or consultants." Concrete groups, plain nouns. Matches.
7. What an investor actually receives (a written view before purchase?) is implied by "We answer it before you buy" but not named. Minor; no finding.
8. Right place, though "Who we work with" (S7) follows with overlapping audiences. A reader finishing S6 would next ask how to start, so S7 could sit before S6. Not worth moving; the pack fixed the order.

### S7. Who we work with

First sentence: "We work with landlords and property investors at every stage, and landlord and property tax is all we do, so you will not have to explain the interest rule to us."

1. Yes.
2. None. Each H3 is one sentence and one link, as §3.1 item 6 asks.
3. "Undeclared rental income" repeats S2 and the disclosure FAQ (NOTE 35).
4. None.
5. "landlord and property tax is all we do" is consistent with the D3 wording and owner voice #1; it avoids the banned "landlords only". No contradiction.
6. Nearest: #2 "It also means the conversation is more efficient: you don't have to explain what Section 24 is." Near verbatim in spirit. Matches.
7. HMO and multi-let landlords, whom two inbound anchors send here (row 19).
8. Right place.

### S8. How it works

First sentence: "It works in three steps, the first of them a free call."

1. It answers, but not in the first person (row 20).
2. None. The link to "changing landlord accountants" earns its place for the switcher.
3. Step 3's clearance and agent authorisation repeat the switching FAQ. The FAQ answers a timing question and keeps a shorter list; acceptable.
4. None.
5. Step 3 contradicts the MTD FAQ (row 21). Step 2 uses the verified fee wording and owner voice #9 verbatim.
6. Nearest: #9 "If your situation changes mid-year, we will tell you before any additional fees apply." Used verbatim. Step 1's "We say what needs doing and, just as plainly, what does not." matches #10.
7. Nothing.
8. Right place (§3.1 item 7).

### S9. How our fees work

First sentence: "Our fees are fixed and quoted upfront for the work you need, and you approve the fee before work starts."

1. Yes, with the verified wording.
2. "You get the figure after the first call and before anything starts, and you are never signing up to an open hourly rate." half repeats the first sentence (row 23).
3. The fee wording appears in S1, S8, S9 twice and the cost FAQ. S9 is its home; the S9 repeat goes (row 23).
4. Yes: two sentences for the fees_section rows (row 22). "So the cost of an accountant for rental property is set by the work, not by a rate card." also serves a row but reads naturally; keep.
5. No contradiction. No figure, as R7 requires.
6. Nearest: #9. Matches: commitment without a figure. Pattern D is followed: three variables, then what we do.
7. A figure, which R7 defers until F3. Correct to be absent.
8. Right place (§3.1 item 8).

### S10. Questions landlords ask (FAQ, 12 items)

First answer: "A landlord accountant prepares your rental accounts and tax return, applies the mortgage interest restriction correctly, and files quarterly Making Tax Digital updates where they apply."

1. Yes, for all twelve: each answer settles the question in its first five words or follows pattern D. All are 63 to 80 words (40 to 90 band). Visible and schema strings match (check 4).
2. In the MTD answer, "It is measured on gross income, not profit" (row 26).
3. FAQ 1's last sentence repeats the opening (row 24); FAQ 11 repeats FAQ 1's list (row 27); the agents answer repeats S6 (row 18).
4. "Which accounting services does a buy-to-let investor need for tax returns and compliance?" exists for the faq row (5 impressions) and overlaps FAQ 1 (NOTE 33). "What tax deductions can UK landlords claim?" is the pack's wording, not the PAA verbatim ("...landlords in the UK make?"); the pack governs, no finding.
5. No contradiction with house_positions: incorporation relief must be claimed from 6 April 2026 (§5), MTD thresholds and joint-owner share (§3), credit 20% rising to 22% (§4), FHL ended (§6). The deductions answer narrows replacement of domestic items relief (row 28). The ownership answer's last sentence is weaker than the old page's (row 25).
6. Nearest: #3, in the generalist answer ("A generalist can be competent and still miss one, and the cost sits with you."). Matches. Register slips in FAQ 11's hedge (row 27).
7. The 40% question mapped here (NOTE 33) and "How much does it cost for someone to do your tax return?" (pack §3, "No"), which cannot be answered without a figure until F3.
8. Right place. The deductions question would read better straight after FAQ 2 ("Do I need an accountant for one rental property?"), since the same one-flat reader asks both. Optional.

### S11. Related guides and services

First sentence: "These are the guides we send landlords to most often."

1. Yes.
2. None.
3. `/section-24` and `/making-tax-digital-landlords` are also linked in S3; expected for the outbound-equity block.
4. None. The sibling sentence uses the §3.1 item 11 wording.
5. No contradiction.
6. Nearest: #12. Matches.
7. Nothing.
8. Right place (§3.1 item 11). No finding.

### S12. Speak to an accountant about your rental income (shared `LeadCTAPanel`)

Shared component, excluded by the harness (check 8) and by §3.1 item 12 ("unchanged"). Read for contradiction only: "Fixed fees, quoted upfrontYou approve the fee before work starts" matches the verified wording; "If your position is already right, we will say so." is owner voice #10. No finding.

### S13. Where we work

First sentence: "We work with landlords in every part of the UK, and with UK landlords who now live abroad."

1. Yes.
2. None inside the section; the section as a whole repeats the coverage sentence (NOTE 36).
3. See NOTE 36.
4. None. No "near me", no stacked "UK".
5. "Income tax on rent works the same way across England, Wales and Northern Ireland, while Scottish taxpayers pay Scottish rates." matches house_positions §7 (only Scotland carved out for 2027/28). LBTT and LTT line matches §23.
6. Nearest: #1 "We only work on landlord and property tax. Nothing else." Flat, two clauses. Matches.
7. Nothing.
8. Right place (§3.1 item 13).

## Whole page

### 9. Reader walk

**First-time landlord, one flat.** Reads the opening and the Self Assessment item, then hits S3, whose worked example tells them they lose £3,600 a year without saying the example assumes a higher-rate taxpayer; a basic-rate reader either panics or stops trusting the page here (row 1, row 13). If they keep going, S4's "you may not need an accountant" sends them to FAQ 2, which is honest and good. They would click "First-time and accidental landlords" in S7. They could not find whether the interest rule affects them at basic rate, or when they have to register for Self Assessment. They might book the call, and the page has made not booking respectable, which is right.

**Eight-property owner deciding on a company.** Reads S2, skips to S5, where "Moving properties you already own into a company counts as selling them for capital gains tax and buying them for stamp duty, both at once. We model the whole cost, the way out included, before you decide." is exactly their question. They would click the incorporation guide, "moving property into a limited company", and the Incorporation Calculator; then FAQ 6. They could not find whether eight properties is enough to count as a business for incorporation relief, or that new purchases are a different question from existing ones (the old FAQ said so; pack §5). They would book; S5's modelling promise is the strongest hook on the page.

**Accidental landlord about to sell.** Reads the opening, finds nothing about selling until the last paragraph of S5 (60 days), then the "Your first rental property" H3 ("perhaps a home you moved out of"). They would click "selling a buy-to-let" and leave for that page. They could not find private residence relief, which is the biggest number in their sale (row 16), or a sale offer in the services list (NOTE 31). They would probably book from the `/for` page, not this one.

### 10. The ten-second read

Title, H1 and opening say what (returns, the interest rule, MTD, company accounts), for whom (anyone with UK rental income, one flat to a portfolio, personal or company) and what next (free call, fixed fee). The H2 list reads as a plain table of contents, though four of the twelve begin with a query phrase ("Landlord tax accountant:", "Buy to let accountant:", "Rental property accountant for", "Accountants for landlords with"). FAQ 1 restates the opening, so the fifth element adds nothing new (row 24). Verdict: yes, a ten-second reader knows the offer, the audience and the next step.

### 11. Register verdict

Check 14: sentence length 21.3 (target 17 to 22, in), Flesch 60.0 (45 to 55, over), question headings 30.8% (20 to 35, in), you 38.0 per 1,000 (28 to 40, in), we 26.1 (20 to 30, in), statute 0.0 (in), jargon 0.0 (in), numbers 28.6 per 1,000 (15 to 25, over). The voice targets are met; the misses are numbers and ease. Check 14 counts 2,028 words, check 19 counts 2,378; the gap may be the shared blocks, not verified. The probe may also count the step markers 01 to 03 and the city markers 1 to 5 as numbers, not verified. The three sentences that pull the page furthest from target:

1. "Who is in: Rent plus self-employed income over £50,000, then over £30,000 from April 2027." (numbers outside an example or FAQ; repeated in the FAQ)
2. "The catch: The credit is 20% of the interest, so a higher-rate landlord loses half the relief." (number outside an example; third statement of the point)
3. "From April 2027: The credit rises to 22%, alongside new rates on property income." (number outside an example; the caption repeats it with 42% and 22%)

All three are S2 label lines. Removing them (rows 7 to 9) cuts the number density without touching the worked examples or the FAQ, where pattern C wants the numbers. The Flesch overshoot comes from the same short label fragments and the two-word FAQ openers ("Not always.", "Not really."); see NOTE 30.

### 12. The single change

Rewrite the bold label lines under the six "What we do" items so each says what that service needs from the reader and when it lands, instead of restating rates, thresholds and pooling points the later sections already make; that one edit removes most of the page's repetition, brings numbers per 1,000 toward target and lifts each item toward the 60-word floor.
