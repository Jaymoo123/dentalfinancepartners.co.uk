# Review A: `/services/landlord-accountant`

Reviewer A, 2026-10-09. Read: rendered `Property/web/.next/server/app/services/landlord-accountant.html` (built 10:46 UTC, md5 e3e3c6a8), the answer-pattern spec, the pack (§1, §2, §3, §5, §6), `docs/property/house_positions.md` (HP), and the harness report `VERIFY_landlord-accountant_draft2.md`. Line references: spec = `ANSWER_PATTERN_SPEC_services_2026-10.md`, pack = `landlord-accountant.pack.md`.

Count: **1 BLOCK, 26 FIX, 6 NOTE.**

## Findings

| # | Section | Type | Quote (from the page) | Rule broken | Replacement |
|---|---|---|---|---|---|
| 1 | H2 "Landlord tax accountant: the Section 24 and MTD side", worked example (`Section24Wedge`) | BLOCK | "£50,000 of rent, £8,000 of running costs, £18,000 of mortgage interest." with "A year, on identical cash flows. Taxed at 40% on that slice, relieved at 20%." | `standard_terms` §4 (every published number re-derivable); HP §4, §7. On these figures alone the taxable rental profit is £42,000, which with no other income sits inside the personal allowance plus basic-rate band (to £50,270, HP §21.4), so nothing is taxed at 40% and the £3,600 does not arise. The figure only holds if other income already fills the basic-rate band, and the page never says so. The component is shared with `/section-24`, so the fix lands on both pages. | "£50,000 of rent, £8,000 of running costs, £18,000 of mortgage interest, on top of a salary that already uses up the basic-rate band." |
| 2 | Opening | FIX | "The first call is free, and the fee is fixed and agreed with you before any work begins." | Pack line 10 ("the only fee wording is: fixed fees quoted upfront, you approve the fee before work starts"); pack §3.1 item 7 (line 24). A paraphrase of the locked wording. | "The first call is free, and our fees are fixed and quoted upfront: you approve the fee before work starts." |
| 3 | Opening (coverage sentence) | FIX | "Landlords across the UK use us without ever visiting an office: everything runs by video call, phone and email, and our city pages for Leeds, Manchester, Birmingham, London and Bristol explain how we work locally in each." | Spec writer's card 9 (line 93, "Cities appear only in the locations block"); pack §3.1 item 13 (line 30, "the only place a city is named"); pack §3.1 item 3 (line 20) asks the opening to say where, including the registered office in Shipley, which it does not. The pack's own §3.3 coverage wording (line 53) names the cities, so the two pack lines disagree; the spec is the later document. Re-run check 6 afterwards, since this is the sentence it detects. | "Landlords across the UK use us without ever visiting an office: we are registered in Shipley, and everything runs by video call, phone and email." |
| 4 | Opening | FIX | "We prepare the accounts and tax return, work through the mortgage interest restriction, file quarterly Making Tax Digital updates and keep company accounts in order." | HP §13 ("No abbreviations without defining them at first use"). The first "MTD" a reader meets is in the second H2 heading, and it is never spelled out next to its abbreviation. | "We prepare the accounts and tax return, work through the mortgage interest restriction, file quarterly Making Tax Digital (MTD) updates and keep company accounts in order." |
| 5 | H3 "Self Assessment for rental income" | FIX | "What you see: A figure for each property, not only the total." | Reviewer Q3: the same point is made in H3 "Portfolio accounts and pooling" ("We produce a profit and loss for every property you own, next to the single pooled figure your return declares.") and again under H2 3. The H3 for portfolios keeps it. | "Joint owners: Each owner's share goes on their own return, matching how the property is really held." |
| 6 | H3 "Section 24 finance-cost workings" | FIX | "The catch: The credit is 20% of the interest, so a higher-rate landlord loses half the relief." and "From April 2027: The credit rises to 22%, alongside new rates on property income." | Spec §2 pattern C (line 30) and writer's card 4 (line 88): one number per point, in a worked example or FAQ answer. Reviewer Q3: the same 20%/22% point appears in H2 2 ("given a credit at the basic rate, so a higher-rate taxpayer loses half the relief"), in the worked example caption, and in the FAQ "What tax deductions can UK landlords claim?". H2 2 and the example keep it. | "What you see: The extra tax the rule costs you this year, in pounds, before you file." and "Who it hits hardest: Higher-rate landlords; the worked example below shows why." |
| 7 | H3 "Making Tax Digital quarterly updates" | FIX | "Who is in: Rent plus self-employed income over £50,000, then over £30,000 from April 2027." | Writer's card 4 (line 88): numbers belong in the FAQ, which repeats these dates in full ("Do I have to file quarterly under Making Tax Digital?"). The line also leaves out "before expenses", which HP §19.2 calls the point that catches most landlords out ("Gross matters"). | "Who is in: Landlords whose rent plus self-employed income, before expenses, passes the threshold; the FAQ below gives the dates." |
| 8 | H3 "Buy-to-let company accounts and Corporation Tax" | FIX | "Interest: A company takes mortgage interest off its profit in full." | Reviewer Q3: the page says this four times, here, in H2 4 ("mortgage interest comes off the profit in full before Corporation Tax"), in the FAQ on companies ("A company deducts interest in full") and in the deductions FAQ ("companies deduct it in full"). H2 4 keeps it. | "Director's loan: We keep the loan account up to date, because an overdrawn one can bring an extra tax charge on the company." (HP §21.1) |
| 9 | H3 "Portfolio accounts and pooling" | FIX | "Why it matters: Pooling hides the property that loses money." | Reviewer Q3: the same point appears in H2 3 ("a flat that lost money all year simply disappears into it") and in the pooling example caption ("the property losing £4,800 a year never appears"). H2 3 and the example keep it. | "Losses: A loss on one property is set against the others in the same year, and any loss left over carries forward." |
| 10 | H3 "Undeclared rental income disclosures" | FIX | "Why now: Telling HMRC first costs far less than being found." | Reviewer Q3: this repeats the FAQ "Can you help if I have not declared rental income?" ("the penalties are much lower than if HMRC finds it first"). | "Who it is for: Landlords who let in their own name; a company that under-declared uses a different route." (HP §27.6: the Let Property Campaign excludes companies) |
| 11 | H2 "Landlord tax accountant: the Section 24 and MTD side" | FIX | "As landlord tax accountants, we spend most of our time on the two rules that move your bill furthest: the mortgage interest restriction and quarterly reporting under Making Tax Digital." | HP §3 and §19: Making Tax Digital is a reporting regime and does not change the tax owed, so "move your bill furthest" is wrong for half the pair. "Most of our time" is a claim about the practice that nothing on the page backs up. | "As landlord tax accountants, we handle the two rules that have changed landlord tax most: the mortgage interest restriction, which raises the bill, and quarterly reporting under Making Tax Digital, which changes how often you report it." |
| 12 | H2 "Accountants for landlords with one property or a portfolio" | FIX | "With one property, the job is a correct return and every cost you are entitled to claim, and you may not need an accountant for landlords every year; the questions below say when it starts to pay." | Spec §4 (line 80, sentences that exist for a query); pack §2 body row "accountant for landlords". "Every year" implies a part-year need that nothing on the page explains, and "the questions below" points nowhere in particular. | "With one property, the job is a correct return and every cost you are entitled to claim, and you may not need an accountant for landlords at all; the first FAQ below says when one starts to pay." |
| 13 | H2 "Buy to let accountant: personally held and company held" | FIX | "We record the ownership split before the income arises and separate repairs from improvements, because a repair filed as an improvement is a claim lost this year, and the reverse adds to the gain when you sell." | Accuracy (reviewer Q5). The reverse case, an improvement claimed as a repair, is an overclaim. The risk is that HMRC reverses it with interest and a penalty (HP §27), not a larger gain. | "...because a repair filed as an improvement is a claim lost this year, and an improvement claimed as a repair is an overclaim HMRC can reverse, with interest and a penalty." |
| 14 | H2 "Buy to let accountant: personally held and company held" | FIX | "When you sell, a UK resident who owes capital gains tax has to report and pay it within 60 days of completion." | Reviewer Q7 and Q9 (the accidental landlord): the page never says that a former home may be partly free of the gain. HP §5 (Private Residence Relief). | Add after it: "If you once lived in the property, part of the gain can be tax-free, and we work out how much before you report." |
| 15 | H2 "Rental property accountant for investors and agents" | FIX | "We also act as rental property accountant for two groups whose work goes beyond one tax return: property investors, and the letting agents who manage homes for landlords." | Spec §4 (line 80); pack §2 h2 row "rental property accountant". The missing article shows the sentence was built around the phrase. | "We also act as a rental property accountant for two groups whose work goes beyond one tax return: property investors, and the letting agents who manage homes for landlords." |
| 16 | H2 "Rental property accountant for investors and agents" | FIX | "If you buy to refurbish and sell, mix residential with commercial property, or invest alongside partners, HMRC's first question is whether you are trading or investing, because the answer decides the tax and the reliefs." | Accuracy (reviewer Q5). Mixing residential with commercial property, or investing with partners, does not raise the trading question; buying to sell does. | "If you buy to refurbish and sell, HMRC's first question is whether you are trading or investing, because the answer decides the tax and the reliefs; if you mix residential with commercial property or invest alongside partners, the stamp duty and the ownership split come first." |
| 17 | FAQ "Do you act for letting agents and managing agents?" | FIX | "We reconcile the client account, recognise commission and management fees when they are earned, deal with VAT on fees, and handle the non-resident landlord scheme where you collect rent for owners abroad." | Reviewer Q3: nearly word for word the H2 5 sentence "For letting and managing agents, we keep the agency's own books apart from client money, recognise commission when it is earned, deal with VAT on fees, and run the non-resident landlord scheme where you collect rent for owners abroad." The body keeps it; the FAQ answer changes. Change the schema string to match (check 4). | "Yes. We keep the agency's own books and its client account apart, and we run payroll, the annual accounts and the Corporation Tax return as one job, along with the non-resident landlord scheme where you collect rent for owners abroad. Our page for letting agents shows how we work with an agency and the landlords it manages." |
| 18 | H2 "Who we work with" | FIX | (absent) Two applied inbound anchors promise HMO work: "Our [team of HMO and multi-let accountants]" (`audiences.ts:1388`) and "[an accountant for HMO landlords]" (`hmo-tax-guide-rental-income-deductions-multi-tenant.md:189`). The page never mentions HMOs or shared houses. | Pack §6 (line 464, "The page must answer what these anchors promise"). | New H3 "HMOs and shared houses": "You let a house room by room, so the bills you cover, the licence fee and the furnishings you replace all need claiming correctly." Link: "HMO and multi-let landlords" to `/for/hmo-and-multi-let-landlords`. |
| 19 | H2 "How it works" | FIX | "It works in three steps, the first of them a free call." | Spec §2 pattern A (line 28): the first sentence answers in the first person. | "We work in three steps, and the first is a free call." |
| 20 | H3 "Handover, then the year" | FIX | "We ask your old accountant for clearance, get authorised with HMRC as your agent and set your records up for quarterly filing." | Reviewer Q5: this assumes everyone is in quarterly filing, against the FAQ "Do I need an accountant for one rental property?" and the MTD FAQ, which say many landlords are not. | "We ask your old accountant for clearance, get authorised with HMRC as your agent and, if quarterly filing applies to you, set your records up for it." |
| 21 | H2 "How our fees work" | FIX | "Buy to let accountant fees for one flat with tidy records cover a small job." | Spec §4 (line 80); pack §2 fees_section row "buy to let accountant fees". Fees do not "cover" a job; the sentence is built around the phrase. | "One flat with tidy records is a small job, and buy to let accountant fees reflect that." |
| 22 | H2 "How our fees work" | FIX | "So the cost of an accountant for rental property is set by the work, not by a rate card. You get the figure after the first call and before anything starts, and you are never signing up to an open hourly rate." | Spec §4 (line 80); pack §2 fees_section row "cost of accountant for rental property". Reviewer Q3: "set by the work" repeats the section's second paragraph, and the fixed-fee promise appears six times on the page (opening, How it works step 2, this H2 twice, the cost FAQ, the contact panel). | "Whatever the cost of an accountant for rental property turns out to be, you get the figure after the first call and before anything starts, never an open hourly rate." |
| 23 | FAQ "What is the difference between a landlord tax accountant and a general accountant?" | FIX | "The rules have changed almost every year since the interest restriction arrived: the stamp duty surcharge, the 60-day capital gains report, the end of furnished holiday lets, and now quarterly reporting." | HP §6. The furnished holiday lettings tax regime ended, not holiday lets, which still exist. The timeline is also off: the stamp duty surcharge (April 2016) came before the restriction took effect (phased in from April 2017). Change the schema string to match. | "The rules have changed almost every year since the interest restriction was announced: the stamp duty surcharge, the 60-day capital gains report, the end of the furnished holiday lettings tax regime, and now quarterly reporting." |
| 24 | FAQ "Should I own property personally or through a limited company?" | FIX | "Moving property you already own is treated as a sale, so capital gains tax and stamp duty both apply, and incorporation relief must now be claimed for transfers from 6 April 2026. We run both routes first." | HP §5: the answer names the relief without saying what it does (defers the gain). "First" has nothing before it to refer to. Change the schema string to match. | "Moving property you already own is treated as a sale, so capital gains tax and stamp duty both apply, and incorporation relief, which can defer the capital gains tax, now has to be claimed for transfers from 6 April 2026. We run both routes on your own figures before you decide." |
| 25 | FAQ "Which accounting services does a buy-to-let investor need for tax returns and compliance?" | FIX | "We should be able to say on the first call which you need." | Spec §3 owner voice 5 ("We don't wait for you to ask.") and reviewer Q6 (no hedging). The FAQ two places up states the same thing without the hedge ("We will tell you on the first call whether you need us."). | "We will tell you on the first call which of these you need." |
| 26 | FAQ "What tax deductions can UK landlords claim?" | FIX | "...accountancy fees, and replacing furnishings in a furnished let." | Accuracy. Replacement of domestic items relief covers furniture, appliances and furnishings the landlord provides in any residential let, furnished or not. HP has no line on this relief, so log it under HP §14 as a flag. | "...accountancy fees, and replacing furniture, appliances and furnishings you provide." |
| 27 | FAQ "What does a landlord accountant do?" | FIX | "We do both, and we tell you the bill before it is due." | Reviewer Q3: this repeats the opening's "We also tell you what the bill will be before it arrives." The opening keeps it. | "We do both, for one flat or a whole portfolio." |
| 28 | H2 "What a landlord accountant does for you" | NOTE | All six H3 items run 41 to 53 words. | Pack §3.1 item 5 (line 22) asks for 60 to 120 words each. | Lengthen: meets the spec and gives an AI overview more per item. Hold: the page is at 2,378 of the 2,400-word ceiling (check 19), and the teardown shape is one sentence plus short labels; findings 5 to 10 swap lines without adding length. |
| 29 | H2 "Who we work with" | NOTE | "We work with landlords and property investors at every stage, and landlord and property tax is all we do, so you will not have to explain the interest rule to us." | The pack §3.3 H2 order (line 54) puts this sixth, after four audience-shaped H2s; pack §3.1 (line 23) puts it straight after "What we do". | Move up: the reader sorts themselves before the detail. Keep: the pack §3.3 order is the specified H2 set, and moving it changes the anchor flow. |
| 30 | Contact panel (shared `LeadCTAPanel`) against the body | NOTE | Form: "To answer your enquiry, your details may be shared with a firm from our specialist partner network who will contact you." Body: "We ask your old accountant for clearance, get authorised with HMRC as your agent..." | Spec §3 (line 64) has already struck "Your enquiry is not spread across a list." over this same tension. | Keep: the consent line is the legal disclosure, and the panel is shared and excluded from check 8. Change: a reader who reads both may not know who "we" is when they book; this is an owner call on how the site describes itself. |
| 31 | FAQ "Can you help if I have not declared rental income?" | NOTE | "The earlier you come forward, the better your position, so it is worth a call before HMRC writes to you." | Spec §2 pattern E (line 32, "No urgency"). | Keep: it is fact (unprompted disclosure is penalised less, HP §27.6), not pressure. Soften to "Coming forward before HMRC writes to you keeps the penalty lowest." so that it states the fact without the call to act. |
| 32 | FAQ (as a set) | NOTE | (absent) "How much does it cost for someone to do your tax return in the UK?" and "How to avoid paying 40% income tax on rental property?" | Pack §3 maps both PAA questions to this page; neither is asked as a FAQ. | Add: two PAA slots this page owns. Hold: the 12 FAQs are the pack §3.3 list, the FAQ is already 964 words (check 15 WARN), and the fee question has no figure to give until F3. |
| 33 | Site-wide Organization JSON-LD | NOTE | "Property Tax Partners is the UK's specialist accountancy firm for landlords, property investors, commercial property owners and property SPVs." | Spec §4 superlatives (line 79): "the UK's" reads as a ranking. | Change: one word ("a UK specialist accountancy firm"). Leave: it is the shared Organization node, outside this page's file, and belongs to a site-wide pass. |

No finding by ruling: the footer "Fixed fees, 24hr response" and the form line "We respond within 24 hours" are shared components that pack §3.1 item 9 leaves alone until F5.

## Per-section answers

### S0. Title and meta description

Title: "Landlord Accountant for UK Rental Income and Buy to Let | Property Tax Partners". Meta: "Landlord accountants for UK rental income: Self Assessment, Section 24, MTD quarterly filing, buy-to-let and portfolio accounts. Free first call." (145 characters)

1. Yes. The title's head phrase leads, and the meta's first clause answers it. The page part is 55 characters, inside pack §3.1 item 1's 40 to 55, so the brand truncates and the phrase does not.
2. None. Every meta item names an offer.
3. The meta restates the opening, which is its job. No finding.
4. "and Buy to Let" in the title is there for the pack §2 family; the title is the allowed place for it. No finding.
5. No contradiction. Title is singular and H1 is plural, both pack-specified.
6. Not prose. The meta's "Free first call." matches owner voice 11's short close ("Property tax sorted, your way, with ease.").
7. Nothing the title promises is missing.
8. n/a.

### S1. H1 and opening

H1: "Landlord accountants for UK rental income". First sentence: "We are landlord accountants for anyone with rental income in the UK, from one flat to a portfolio, held personally or through a company."

1. Yes. One definition-shaped sentence in the first person, as spec pattern A asks. 79 words, inside 60 to 90.
2. "We also tell you what the bill will be before it arrives." could go if it stays in FAQ 1. I keep it here and cut it from the FAQ (finding 27), because the opening is what gets lifted.
3. The fee sentence repeats the How it works and fees sections (finding 22). The coverage sentence repeats "Where we work" ("We work with landlords in every part of the UK"); the opening keeps the national line and the cities go to the locations block (finding 3).
4. The coverage sentence exists for the pack §2 coverage_statement rows, which is its purpose. No literal "near me", so no finding beyond the cities.
5. The fee wording paraphrases the locked wording (finding 2). No other conflict.
6. Nearest is owner voice 1 ("We only work on landlord and property tax. Nothing else."). Direct, plain nouns, one claim per sentence. Matches.
7. Where the firm is: pack §3.1 item 3 asks for the Shipley registered office (finding 3).
8. Right place.

### S2. H2 "What a landlord accountant does for you" (six H3s)

First sentence: "A landlord accountant does the filing and the thinking: we keep the returns right and say, before the year ends, what would lower the bill."

1. Yes. The H3 first sentences all open "We ...", as pattern A asks.
2. "What you see: A figure for each property, not only the total." (finding 5).
3. Yes, heavily. Four of the six H3s carry a label line that repeats a later H2 or a FAQ (findings 5 to 10). The H3s should say what we deliver; the H2s say why.
4. No query-driven sentence. The H3 names are pack-fixed and mirror `hasOfferCatalog`.
5. The MTD line leaves out "before expenses", which the FAQ states (finding 7). No contradiction with HP on 20%/22% (HP §4, §7).
6. Nearest is owner voice 12 ("Give them a straight answer at the desk, run the number in front of them, and forward a page that settles it."). The verb-led openers match. The label fragments ("Who it suits: One property or twenty, owned alone or jointly.") are thinner than the owner's sentences.
7. Nothing about selling: none of the six offers covers a disposal or capital gains tax, though H2 4 does the work (see Q9, persona 3).
8. Right place.

### S3. H2 "Landlord tax accountant: the Section 24 and MTD side"

First sentence: "As landlord tax accountants, we spend most of our time on the two rules that move your bill furthest: the mortgage interest restriction and quarterly reporting under Making Tax Digital."

1. Yes for scope, but the sentence overclaims for MTD (finding 11).
2. "and our guide explains how the interest rule works" could go. The calculator link in the same sentence already hands off, and Related guides links `/section-24` again. Low cost; I would keep it as the guide link that pattern F asks for.
3. "so a higher-rate taxpayer loses half the relief" repeats the H3 "The catch" line; this section keeps it (finding 6). "We work out your start year, set up software ... and send each update." repeats the MTD H3's first sentence. Keep it here as the "how"; the H3 keeps the "what".
4. "As landlord tax accountants" carries the pack §2 h2 row, and it reads naturally. No finding.
5. The worked example's 40% slice is not re-derivable from the stated figures (finding 1, BLOCK). HP §7's "gap unchanged" framing is followed correctly.
6. Nearest is owner voice 6 ("If incorporation would save you money, we'll model it."); "model the options if it is pushing you into a higher band" matches it closely.
7. Whether the interest rule's cap and carry-forward apply to them (HP §4). That is guide depth, rightly left to `/section-24`.
8. Right place: S2 names the offer, and this section explains the two hardest ones.

### S4. H2 "Accountants for landlords with one property or a portfolio"

First sentence: "We act as accountants for landlords with a single let and for landlords with twenty, and the work changes shape as you grow."

1. Yes.
2. None. The one-property and portfolio paragraphs each carry a distinct point.
3. "a flat that lost money all year simply disappears into it" repeats the pooling example caption. The prose and the example sit side by side, so the H3 line goes (finding 9) and these two stay.
4. "you may not need an accountant for landlords every year" (finding 12).
5. No contradiction. "All your UK lets count as one property business" matches the old page (pack §5, "UK residential lets pool into a single property business").
6. Nearest is owner voice 10 ("If your position is already right, we will say so."); "you may not need an accountant" carries the same permission not to buy. Matches.
7. What one-property landlords should do themselves (records, deadlines). The FAQ partly answers it.
8. Right place.

### S5. H2 "Buy to let accountant: personally held and company held"

First sentence: "Whichever way you hold a buy to let (BTL), in your own name, jointly or in a limited company, we do the accounts and returns that go with it, and the job is different for each."

1. Yes, and BTL is defined at first use (HP §13).
2. "As accountants for buy-to-let landlords with a company, we prepare the accounts, the Corporation Tax return and your own return together, so what you draw is planned, not guessed." repeats the company H3 ("Drawing money: Salary, dividends or a director's loan, planned before the year ends."). One of them can go. Keep this one; the H3 label changes (finding 8).
3. "mortgage interest comes off the profit in full before Corporation Tax" is the fourth statement of that point (finding 8). This one stays.
4. "BTL accounting" and "accountants for buy-to-let landlords" are pack §2 body rows, woven in naturally enough. No finding.
5. The repair/improvement trade-off is misstated (finding 13). Incorporation as a sale for CGT and SDLT matches HP §5 and the FAQ. The 60-day rule matches HP §5 ("where CGT is due").
6. Nearest is owner voice 6; "We model the whole cost, the way out included, before you decide." is the same shape. Matches.
7. For a seller: whether living there once reduces the gain (finding 14).
8. Right place. It is the decision section after the portfolio section.

### S6. H2 "Rental property accountant for investors and agents"

First sentence: "We also act as rental property accountant for two groups whose work goes beyond one tax return: property investors, and the letting agents who manage homes for landlords."

1. Yes, minus the article (finding 15).
2. None.
3. The agents sentence duplicates the agents FAQ (finding 17).
4. Finding 15.
5. The trading question is attached to the wrong activities (finding 16). The commercial property mention is allowed (R21).
6. Nearest is owner voice 3 ("A generalist accountant will work with what you give them..."): concrete and fair. The section matches, though it is list-heavy.
7. What an agency gets from us that is different from its current firm. The link to `/for-letting-agents` carries that.
8. A reader who finished the buy-to-let section would not ask about letting agents next. The pack §3.3 H2 set fixes it here; no move proposed.

### S7. H2 "Who we work with" (five H3s)

First sentence: "We work with landlords and property investors at every stage, and landlord and property tax is all we do, so you will not have to explain the interest rule to us."

1. Yes.
2. None. Each H3 is one sentence and a link, as pack §3.1 item 6 asks.
3. "Undeclared rental income" is the third pass at the Let Property Campaign (H3 offer, here, FAQ). Here it is an audience pointer to `/blog/...let-property-campaign...`, which is fine; no change.
4. None.
5. "landlord and property tax is all we do" matches owner voice 1 and the D3 wording. No "every client" form, so no conflict.
6. Nearest is owner voice 2 ("...you don't have to explain what Section 24 is."), which this sentence restates almost verbatim. Matches.
7. HMO landlords, whom two inbound anchors promise (finding 18).
8. See NOTE 29.

### S8. H2 "How it works" (three H3s)

First sentence: "It works in three steps, the first of them a free call."

1. Yes, but not in the first person (finding 19).
2. None.
3. Step 3's clearance and agent authorisation repeat the switching FAQ. The FAQ stands alone in schema, so both stay.
4. None.
5. Step 3 assumes quarterly filing for all (finding 20).
6. Step 1 ("We say what needs doing and, just as plainly, what does not.") matches owner voice 10. Step 2 uses owner voice 9 verbatim. A strong section.
7. How long a handover takes. That is not on the page, and fine to leave out under R7 if no verified figure exists.
8. Right place.

### S9. H2 "How our fees work"

First sentence: "Our fees are fixed and quoted upfront for the work you need, and you approve the fee before work starts."

1. Yes, in the locked wording.
2. "So the cost of an accountant for rental property is set by the work, not by a rate card." (finding 22).
3. The fixed-fee promise appears six times on the page (finding 22). This section is its home; How it works step 2 keeps the mid-year sentence.
4. "Buy to let accountant fees for one flat with tidy records cover a small job." (finding 21) and the "So the cost..." sentence (finding 22).
5. No conflict. No figure, as R7 requires.
6. Nearest is owner voice 9 ("If your situation changes mid-year, we will tell you before any additional fees apply."). The first and last sentences match; the middle paragraph is query-shaped.
7. Any figure. That is deferred to F3, so by ruling.
8. Right place.

### S10. FAQ "Questions landlords ask" (12 items, 964 words)

First question: "What does a landlord accountant do?" First sentence: "A landlord accountant prepares your rental accounts and tax return, applies the mortgage interest restriction correctly, and files quarterly Making Tax Digital updates where they apply."

1. Yes for all twelve. The first five words settle each one, per pattern B ("Not always.", "Yes.", "Not really.", "Four things decide it").
2. In "What does a landlord accountant do?", "We do both, and we tell you the bill before it is due." (finding 27). In the buy-to-let investor FAQ, its first sentence largely restates FAQ 1. The query row needs the question, so the answer stays but is hedged (finding 25).
3. Agents FAQ against H2 5 (finding 17); FAQ 1 against the opening (finding 27); deductions FAQ against the Section 24 H3 (finding 6, resolved by changing the H3).
4. "Which accounting services does a buy-to-let investor need for tax returns and compliance?" exists for the pack §2 faq row. It is phrased naturally, so it is right in the FAQ.
5. FHL wording and timeline (finding 23); the incorporation relief answer is incomplete (finding 24); the furnishings scope (finding 26). The MTD answer matches HP §3 and §19.4 exactly.
6. Nearest is owner voice 4 ("Most accountants can't answer these questions off the top of their head because they don't see enough landlord clients."), for the generalist FAQ. Fair to the competitor, then the gap. Matches. Hedge in finding 25.
7. Two PAA questions this page owns are not asked (NOTE 32).
8. Right place. Check 15 flags 964 words; findings 17, 23, 24 and 27 change length by under 20 words in total.

### S11. H2 "Related guides and services"

First sentence: "These are the guides we send landlords to most often."

1. Yes.
2. None.
3. `/section-24` and `/making-tax-digital-landlords` are also linked in H2 2. Pack §3.1 item 11 wants them here by title, so no change.
4. None.
5. None. The sibling sentence matches pack §3.1 item 11.
6. Nearest is owner voice 12 ("...forward a page that settles it."). Matches.
7. Nothing.
8. Right place.

### S12. H2 "Speak to an accountant about your rental income" (shared `LeadCTAPanel`)

First sentence: "Tell us about your rental income: what you own and how it is held."

1. Yes.
2. None in the page-owned text.
3. "Fixed fees, quoted upfront / You approve the fee before work starts" is the sixth fee statement. It is shared and pack-preserved, so no finding here (see finding 22).
4. None.
5. The consent line against the body's "we" (NOTE 30).
6. "If your position is already right, we will say so." is owner voice 10 verbatim.
7. Nothing.
8. Right place. It is the pack §3.1 item 12 close.

### S13. H2 "Where we work"

First sentence: "We work with landlords in every part of the UK, and with UK landlords who now live abroad."

1. Yes.
2. "We act for landlords across the UK, not only in these cities." (the `LocationMap` footer line). The first sentence already says it.
3. The first sentence repeats the opening's coverage sentence. Both are allowed (pack §3.1 items 4 and 13), but the cities belong here only (finding 3).
4. None.
5. "Income tax on rent works the same way across England, Wales and Northern Ireland, while Scottish taxpayers pay Scottish rates." matches HP §7 (only Scotland is carved out). LBTT and LTT match HP §23.
6. Nearest is owner voice 8 ("We do not serve restaurants, retailers or consultants."): concrete and plain. Matches.
7. Nothing.
8. Right place under pack §3.1 item 13, after the contact panel.

## Whole page

### 9. Reader walk

**First-time landlord, one flat.** They get "from one flat" in the opening and see themselves in "Self Assessment for rental income". They may stall at H2 2, since Section 24 and MTD may not apply to them, and skip to H2 3, whose "the questions below say when it starts to pay" sends them to the FAQ. "Do I need an accountant for one rental property?" ("Not always.") is the answer they came for. They would click "First-time and accidental landlords" or the rental income calculator. They could not find what the first year involves (registering, the January deadline) or any sense of cost, which is deferred by ruling. They would book only if the FAQ triggers apply. The "we will tell you on the first call whether you need us" line and the free call make that low-risk, so a likely yes for anyone with a mortgage near a band edge.

**Eight-property owner deciding on a company.** This is the strongest walk. H2 4 tells them a transfer counts as a sale for CGT and stamp duty, and "We model the whole cost, the way out included, before you decide." Then the FAQ on companies (pattern D) and "A growing portfolio" lead to SPV set-up. They would click the incorporation calculator, `/incorporation` and "moving property into a limited company". They could not find what incorporation relief does or when a portfolio qualifies (finding 24), or the old page's point that new purchases are a different question from existing ones (pack §5, dropped). They would book: the page offers exactly the modelling they need.

**Accidental landlord about to sell.** Nothing in the opening or the six offers mentions selling. "Your first rental property ... perhaps a home you moved out of" is the first hook, deep in H2 6, and the 60-day rule sits in the last paragraph of a buy-to-let section they may not think applies to them. They would stop at "Who we work with" and click "First-time and accidental landlords" or, if they found it, "selling a buy-to-let". They could not find whether the years they lived there reduce the gain (finding 14), or the rates. They would probably leave for the `/for/` page rather than book from here.

### 10. Ten-second read

Title, H1, opening, the H2 list, the first FAQ: yes. A reader knows the page offers returns, Section 24, MTD and company accounts for UK landlords with one property or many, and that the next step is a free call with a fixed fee. Two weak points. Four of the H2s read as search labels ("Landlord tax accountant: the Section 24 and MTD side", "Rental property accountant for investors and agents"), which makes the list longer than the offer. And the first FAQ repeats the opening, so the ten-second reader learns nothing new from it.

### 11. Register verdict

Harness check 14: sentence length 21.3 (target 17 to 22), you 38.0 (28 to 40), we 26.1 (20 to 30), statute 0.0, jargon 0.0 and question headings 30.8% (20 to 35) are all on target. Two are off. Flesch is 60.0 against 45 to 55: too easy, driven by the label fragments, and the spec says do not simplify. Numbers are 28.6 per 1,000 against 15 to 25, because rates and thresholds repeat outside the worked examples and the FAQ. Body is 2,378 words, inside 1,600 to 2,400 but at the ceiling. The three sentences that most pull the page off target:

1. "Who it suits: One property or twenty, owned alone or jointly." (a label fragment; six H3s use this shape, which lifts Flesch and thins the voice)
2. "Who is in: Rent plus self-employed income over £50,000, then over £30,000 from April 2027." (numbers in a body label, repeated in the FAQ; the same holds for the 20%/22% lines in the Section 24 H3)
3. "Buy to let accountant fees for one flat with tidy records cover a small job." (a sentence that exists for a query, the spec §4 habit)

### 12. The single change

Make each fact appear once: rewrite the label lines under the six "What we do" items so they say what the reader gets, and leave the rates, thresholds and mechanisms to H2s 2 to 5, the worked examples and the FAQ. That one pass removes most of the repetition, brings numbers per 1,000 and Flesch back toward target, and frees words under the 2,400 ceiling.
