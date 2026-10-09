# Review A: `/services/property-tax-advice` (draft 2)

Reviewer A, 2026-10-09. Read: rendered `Property/web/.next/server/app/services/property-tax-advice.html` (text and JSON-LD), `ANSWER_PATTERN_SPEC_services_2026-10.md`, `property-tax-advice.pack.md` §1, §2, §3, §5, §6, `docs/property/house_positions.md`, `VERIFY_property-tax-advice_draft2.md` (0 BLOCK, 5 WARN). Cross-checks made against the rendered sibling pages (`landlord-accountant.html`, `property-accountant.html`), the rendered guide H1s and `LINKS_APPLIED_2026-10-09.md`. Shared components (`LeadCTAPanel` form, calculator modals, footer) are reviewed only where they change what this page tells a reader.

Totals: **3 BLOCK, 27 FIX, 11 NOTE.**

## Findings

| # | Section | Type | Quote (from the page) | Rule broken | Replacement |
|---|---|---|---|---|---|
| B1 | H3 "Capital gains tax planning on a sale or gift" | BLOCK | "Gifts count: a gift to family is taxed as if you had sold, so the bill can arrive with no cash to pay it." | `house_positions.md` §5 Reliefs: spouse and civil partner transfers are no-gain-no-loss (s.58). The page also tells readers to use "a spouse's share" (H3 Section 24) and to move "property between spouses" (H2 3), so a reader would wrongly expect a CGT bill on that move. | "Gifts count: a gift to anyone except your spouse or civil partner is taxed as if you had sold at market value, so the bill can arrive with no cash to pay it." |
| B2 | H2 "Who we work with" | BLOCK | "We work only on property tax. We do not advise trading businesses or payroll." | Wrong about the firm. The sibling `/services/landlord-accountant` FAQ says of letting agencies (trading businesses): "Payroll, the agency's annual accounts and its Corporation Tax return are part of the same job." `/for-letting-agents` exists. The first sentence also repeats the opening's "We work only on property tax" (Q3). | "We do not serve restaurants, retailers or consultants." (spec §3 owner-voice #8, verbatim from `/about`) |
| B3 | FAQ "What does a property tax consultation cost?" | BLOCK | "It depends on the question, and we quote before we start." | Contradicts the opening: "a free consultation scopes the question, quotes a fixed fee", and the panel H3 "Book your free consultation". The page uses "consultation" for the free call and for the paid work, so a reader cannot tell whether "Book a consultation" costs money (pack §1 3.1 items 7 and 8, line 24 to 25: what is free and what is fixed must be plain). The answer also repeats the fees section almost word for word (Q3). | Answer: "The first call is free; the advice after it is a fixed fee we quote before we start. A single sale is a small job; a portfolio split across spouses and a company is a large one, and the quote reflects that. Nothing starts until you approve the fee, and the free call commits you to nothing." (57 words). Also step 1: "If you do not need a consultation, we say so there and then." becomes "If you do not need advice, we say so there and then." |
| F1 | Meta description | FIX | "Specialist property tax advice for UK landlords: incorporation, CGT timing, Section 24, stamp duty, IHT, HMRC enquiries. Written advice, free first call." | Pack §3.4 line 50: the spec wording carries "One-off written advice, no tie-in", the page's one differentiator (keep your accountant). The rendered meta drops "One-off". | "Specialist property tax advice for UK landlords: incorporation, CGT, Section 24, stamp duty, IHT, HMRC enquiries. One-off written advice, free first call." (154 characters) |
| F2 | Opening | FIX | "Your accounts stay where they are, and we work by video call across the UK." | Pack §1 3.1 item 3 (line 20): the opening names who it is for and where, including "registered office in Shipley". It never says "landlord" and never names Shipley. Item 4 (line 21): the coverage statement belongs in the opening or first section; today it sits in the last H2. | "Your accounts stay where they are, and we advise landlords anywhere in the UK by video call from our registered office in Shipley." (opening becomes 86 words, inside 60 to 90) |
| F3 | H2 "Advice, not another set of accounts" | FIX | "Plenty of people use both. Plenty use only one." (last sentences; the only sibling link here is to the property accountant page) | `LINKS_APPLIED_2026-10-09.md` line 141 handed this sentence (pack §6, PTA:504-508) to the writer. It is missing, so a one-flat landlord who only needs returns is sent to the portfolio service. | Add after "Plenty use only one.": "If you hold property in your own name and only need the returns, our [landlord accountant service](/services/landlord-accountant) covers that." |
| F4 | H3 "Incorporation and structuring advice" | FIX | "We work out whether your properties belong in your own name, joint names or a company, and what a move costs." (whole item: 38 words) | Pack §1 3.1 item 5 (line 22): each item 60 to 120 words. | Add: "First we test whether your letting counts as a business, because incorporation relief depends on it. If the numbers do not work, we say so and the properties stay where they are." |
| F5 | H3 "Capital gains tax planning on a sale or gift" | FIX | "We plan when you sell or give away a property, and in what order, so the gain lands in the cheapest year." | Q7: main residence relief, on the old page ("how to use main residence relief and private residence elections properly"), is gone (harness check 20). It is the first thing an accidental landlord needs. `house_positions.md` §5 Reliefs (PRR, final 9 months). | Add a third label line: "If you once lived there: the years you lived in it, and the last nine months you owned it, usually come off the gain." |
| F6 | H3 "Section 24 and finance-cost planning" | FIX | "What we test: pensions, a spouse's share, refinancing and a company." (item: 55 words) | Pack line 22, 60-word floor. | Add: "Near £100,000 of income: we check the personal allowance taper as well, because rental profit counts towards it before the credit." (`house_positions.md` §4) |
| F7 | H3 "Stamp duty land tax on purchases and transfers" | FIX | "What we check: whether the higher rates for additional homes apply, and what a transfer into a company would cost." (item: 40 words) | Pack line 22, 60-word floor. | Add: "Outside England: in Scotland and Wales a different land tax applies, with its own rates for additional homes, and we advise on that version." (`house_positions.md` §23) |
| F8 | H3 "Inheritance tax and succession planning for portfolios" | FIX | "We plan how a portfolio passes on: the order of gifts, the seven-year clock, family companies and trusts." (item: 40 words) | Pack line 22, 60-word floor. Q7: the reader is not told what the seven-year clock does. | Add: "The clock: a gift you survive by seven years leaves your estate, so the earlier it starts the more it saves. We show what the estate pays under each option." (`house_positions.md` §15.2) |
| F9 | H3 "HMRC enquiries and undeclared income disclosures" | FIX | "Why timing matters: telling HMRC first generally costs less than being found." | Repeats the FAQ "a disclosure you make before HMRC asks normally ends better than one they prompt" and H2 5 (Q3); "generally" is a hedge (spec §3). The item is 42 words (pack line 22). | Replace with: "Commercial rent: the campaign covers residential lets only, so undeclared commercial rent goes through HMRC's general disclosure route, and we prepare that instead." (`house_positions.md` §27.6) |
| F10 | H2 "Property tax specialists for the decisions that cost most" | FIX | "You do not need a property tax expert for every question, but you do for these." | Written for the query "property tax expert" (pack §2 body row). Also says you need us, against the FAQ "Sometimes not, and we will say so" (Q5). | "These six are where a property tax expert earns the fee; for most other questions the calculators below, or your own accountant, may be enough." |
| F11 | H2 "Property tax specialists for the decisions that cost most" | FIX | "Someone has sold you a scheme" | Contradicts its own line "We check a proposed structure before you commit money": if it has been sold, the money is committed. Old page: "I have been offered a scheme". | "Someone has offered you a scheme" |
| F12 | H2 "Property tax specialists for the decisions that cost most" | FIX | "You are restructuring: Moving property between spouses or into a company touches four taxes at once; we model them together." | Q7: the reader is not told which four. Spec writer's card 10 (cut repetition, not substance). | "...touches capital gains tax, stamp duty, income tax and inheritance tax at once; we model them together." |
| F13 | H2 "Property tax specialists for the decisions that cost most" | FIX | "A landlord tax specialist is worth most before the event, so call while it is still a choice." | Spec §2 pattern A and owner-voice #5: the firm speaks as "we", not in the third person. The sentence exists for the query "landlord tax specialist" (pack §2 body). | "As landlord tax specialists we are worth most before the event, so call while it is still a choice." |
| F14 | H2 "Property tax advisor or accountant: which do you need?" | FIX | Table caption "A property accountant compared with a property tax advisor"; "An accountant reports what has happened." | Contradicts the firm's own sibling `/services/property-accountant`: "As your property tax accountant we plan the tax as well as report it ... We do not wait for you to ask." A reader arriving from that page is told property accountants only report. | Caption and column: "An accountant who only files your returns compared with a property tax advisor"; sentence: "An accountant who only files reports what has happened." |
| F15 | H2 "Property tax advisor or accountant: which do you need?" | FIX | "We change what happens next, which is why a buy-to-let tax advisor earns their keep before a purchase, a disposal or an incorporation." | Written for "buy-to-let tax advisor" (pack §2 body). It switches from "we" to "their" in one sentence (spec writer's card 1). | "We change what happens next, so the time to call a buy-to-let tax advisor is before a purchase, a disposal or an incorporation." |
| F16 | H2 "Property tax advisor or accountant: which do you need?" | FIX | "Many landlords keep their accountant and use us only for the decision." | Third statement of the same point: H2 1 "Plenty of people use both. Plenty use only one." and FAQ "Many of the landlords we advise stay with their existing accountant". | Delete; the CTA follows the table directly. |
| F17 | H2 "Property tax consultants for HMRC enquiries and disclosures" | FIX | "We act as property tax consultants when HMRC is already involved: a nudge letter about rental income, a formal enquiry into a return, or a disclosure you would rather make before anyone asks." | 33 words. One of the sentences pushing the average to 22.5 (harness check 14; spec §1 target 17 to 22). | "We act as property tax consultants once HMRC is involved. That covers a nudge letter about rental income, a formal enquiry into a return, or a disclosure you would rather make before anyone asks." |
| F18 | H2 "Who we work with" | FIX | "Small landlords with one or two properties, where our small landlord tax advice often ends in “change nothing”." and "Investors who want property investment tax advice before the next purchase, not after it." | Pack §1 3.1 item 6 (line 23): each audience links to its `/for/*` page. Neither line links. `/for/gifting-property-to-family` and `/for/inherited-property` both link in to this page (`LINKS_APPLIED` rows 23, 27), but this page does not name or link either audience. | "Small landlords with one or two properties, including [first-time and accidental landlords](/for/first-time-and-accidental-landlords), where our small landlord tax advice often ends in “change nothing”." Add: "Families [gifting property](/for/gifting-property-to-family) or dealing with an [inherited property](/for/inherited-property)." |
| F19 | H2 "How an engagement works" | FIX | "An engagement works in three steps, and the first one costs nothing." | Spec §2 pattern A: the first sentence starts in the first person. | "We work in three steps, and the first one costs nothing." |
| F20 | H3 "Modelling and the written note" | FIX | "We run the options on your figures and send a note with each one costed and our recommendation, then a call so you can push back." | Repeats the tick list right under it: "A follow-up call to challenge the answer before you act". | "We run the options on your figures and send a note with each one costed and our recommendation." |
| F21 | H2 "What advice costs" | FIX | "How much property tax consultants charge turns on four things: how many properties, how they are owned, how many taxes the decision touches, and how much modelling it takes." | Written for the query "how much do property tax consultants charge" (pack §2 `fees_section`). It reads as the search string. Re-run check 6 after the change. | "Like other property tax consultants, we charge by the job, and how much turns on four things: how many properties, how they are owned, how many taxes the decision touches, and how much modelling it takes." |
| F22 | H2 "What advice costs" | FIX | "Timing the sale of one flat is a small job; restructuring a portfolio across two spouses and a company is a large one." | Repeats the FAQ cost answer "A single sale is a small job; a portfolio split across spouses and a company is a large one." B3 keeps the FAQ copy. | Delete here. |
| F23 | H2 "The rules your advice has to work around in 2026/27" | FIX | "The rules your advice has to work around are moving, and several changes already in law land by April 2028. We advise on the rules as they will stand." | Spec §2 pattern A: the first sentence repeats the heading; the "we" sentence comes second. | "We advise on the rules as they will stand, and several changes already in law land between April 2026 and April 2028." (replaces both sentences) |
| F24 | Rules table, rows "Tax credit for mortgage interest" and "Making Tax Digital for landlords" | FIX | "Rises from 20% to 22%, matching the new basic rate, so the higher-rate gap stays at 20 points"; "Quarterly updates for qualifying income over £50,000, then over £30,000, then over £20,000 / April 2026, 2027, 2028" | The 20-point gap is stated three times (worked example, this row, FAQ 2027). MTD is compliance, not one of the six offers, and its row holds 6 of the page's numbers. Harness check 14 numbers_per_1k 26.8 (target 15 to 25); spec writer's card 4 ("Rate sets live on `/property-tax-rates`"). | Row 2: "Rises from 20% to 22%, matching the new basic rate". Delete the MTD row; the MTD guide stays in Related guides. Takes numbers to about 23 per 1,000. |
| F25 | FAQ "Do you give advice on incorporation?" | FIX | "Our buy-to-let incorporation guide explains the test and has a calculator for a first number." | Names a guide but gives no link (spec writer's card 3: "link the guide"). Schema parity is on text, so a link in the visible answer does not break check 4. | Link "buy-to-let incorporation guide" to `/incorporation` in the visible answer. |
| F26 | H2 "Related guides and services" | FIX | "<a /section-24>Mortgage interest relief for landlords, explained</a>"; "<a /landlord-tax>Landlord tax explained: what UK landlords pay in 2026/27</a>"; "<a /incorporation>Should I incorporate my buy-to-let?</a>"; and "or the property accountant service linked near the top of this page." | Pack §1 3.1 item 11 (line 28): links "by their real titles", and one sentence linking both siblings by their H1s. Rendered H1s: "Section 24 explained: mortgage interest relief for landlords", "Landlord tax explained: what you pay on UK rental property in 2026/27", "Should you incorporate your buy-to-let portfolio?". The property accountant sibling is pointed at, not linked. | Use the three H1s as anchors. Sibling sentence: "For the yearly returns and accounts rather than one decision, see our [landlord accountants for UK rental income](/services/landlord-accountant), or [property accountants for UK landlords and investors](/services/property-accountant) for accounts and planning together." |
| F27 | H2 "Where we work" | FIX | "Each consultation runs the same way wherever you are: a free call, a fixed quote, then the note." | Repeats the three steps of "How an engagement works" and uses "consultation" for the whole process (see B3). | Delete; keep the coverage sentence and the Scotland and Wales sentence. |
| N1 | Title | NOTE | "Property Tax Advice from Specialist Advisors" (44) | Pack §3.4 line 49 prefers "Property Tax Advice \| Specialist Property Tax Advisors UK"; the title-placement head phrase "property tax specialist" (210 a month, pack §2 row 1) is in neither. | Keep: the live title is what ChatGPT has indexed, and it renders in full with the brand. Change: the preferred title adds "advisors UK" but truncates the brand and still lacks the head phrase. |
| N2 | Opening sentence 1; H2 1 sentences 1 and 4 | NOTE | "Whether you are deciding how to own a property, when to sell it or whether to incorporate, a free consultation scopes the question, quotes a fixed fee, and tells you if you do not need us." | Spec §2 pattern A: the opening leads with a definition-shaped "we" sentence; this one is 36 words and calls the free call a "consultation" (B3). Pack line 52 protects ChatGPT-cited sentences here and in H2 1, but harness check 18 had no fact map, so nobody can yet say which are cited. | Keep until the fact map confirms. Change: lead with "We work only on property tax: bring us one decision, from a purchase or gift to an HMRC letter, and we cost each option before you commit.", and say "a free first call" in sentence 1. |
| N3 | H2 2 to H2 5 | NOTE | H2s "Property tax specialists for...", "Property tax advisor or accountant...", "Property tax consultants for..." in a row | The six decisions (H2 2) and the six moments (H2 3) overlap item for item; advice against accounts is made in H2 1, H2 4 and FAQ 2; HMRC is covered in H3 6, H2 3, H2 5 and the FAQ. | Keep: pack §3.4 line 54 fixes the H2 set for query placement. Change: fold H2 3 into H2 2 and H2 5 into H3 6, saving about 300 words of repetition. |
| N4 | H2 "Property tax advisor or accountant: which do you need?" | NOTE | the heading | Spec writer's card 6: "Body H2s are plain statements." | Keep: pack line 54 names this exact string and it matches a PAA shape. Change: "Property tax advisor or accountant: the difference". |
| N5 | Rules section | NOTE | "*Note: Example figures displayed" (under the table of enacted rates) | The only example on the page is the £12,000 paragraph above the table, so the note labels statutory rates as examples. | Keep: pack line 61 preserves `ExampleFigureNote` on the figure table (owner rule 33). Move: put it under the worked-example paragraph. |
| N6 | FAQ (dropped item) | NOTE | old: "If there is a hard deadline, a completion date, a 60-day capital gains report or an HMRC response date, tell us on the first call and we will work to it." | Dropping "How quickly can I get advice?" was right (F5, response time). This sentence promises a behaviour, not a time, and was lost with it. | Keep out until F5. Reinstate it as the last sentence of "What should I bring to the first call?". |
| N7 | FAQ "Will you tell me if I should do nothing?"; "Who we work with" | NOTE | "Yes, and it happens often." / "it is the right one for many landlords" / "often ends in “change nothing”" | `standard_terms` §4: claims must be re-derivable; no count backs "often" or "many". | Keep: the old page said "a common one", and it is owner-voice #10 territory. Change: "Yes. Leaving things as they are is a proper recommendation." |
| N8 | Whole page against pack §6 anchors | NOTE | (absent) | Link-ins promise things the page never mentions: leasehold premium stamp duty (`LINKS_APPLIED` row 11), "the inheritance tax and capital tax position on the land" (row 12), adjusted net income and child benefit (row 51), lettings partnerships (row 21). | Keep: a service page need not name every source topic. Add: one "Who we work with" line for leaseholders extending a lease and for landed estates. |
| N9 | Cross-surface (harness check 12) | NOTE | 6 offer names absent from `/services` and `/` | Out of this page's file. | Leave to the conductor. Or name the six offers on the services index card. |
| N10 | Shared Incorporation Cost Calculator, rendered in this page's HTML | NOTE | "CGT (21%)£21,018" | A crawler reads it as page text. 21% is not a house rate (`house_positions.md` §5: 18% and 24%); it may be a blended default. | Out of scope for this rewrite. Check the component's default label separately. |
| N11 | "Background reading before you book" | NOTE | 8 card H3s, e.g. "What the 2027 rate changes do to mortgage interest relief" | They are not the posts' titles (H1: "April 2027 Property Tax Rates and Section 24: The Enacted Position for UK Landlords"), and they account for 8 of the page's 31 H3s. | Keep: `backgroundReading` 8 is preserved (pack line 61) and the old labels were editorial too. Change: render them as list links rather than H3s. |

## Per-section answers

### S0. Title and meta description
1. Title "Property Tax Advice from Specialist Advisors" answers the query that lands here (pack §2 h1 row). Meta first clause "Specialist property tax advice for UK landlords" does too. No finding beyond F1.
2. Meta: "Written advice" is the weakest phrase; F1 makes it "One-off written advice".
3. The meta repeats the H1 phrase, which is expected. No finding.
4. No sentence written only for a query.
5. No contradiction with the schema: Service `name` equals the H1.
6. Nearest owner sentence: #11 "Property tax sorted, your way, with ease." The register matches: plain and short.
7. The meta does not say "no need to change accountant", the page's main differentiator (F1).
8. Correct place.

### S1. H1 and opening
1. H1 "Property tax advice from specialist advisors"; first sentence "Whether you are deciding how to own a property, when to sell it or whether to incorporate, a free consultation scopes the question, quotes a fixed fee, and tells you if you do not need us." It answers what the service does, but in process terms, not as "we do X for Y" (N2).
2. None. All three sentences carry a distinct fact (process, scope, where).
3. "We work only on property tax" also appears in "Who we work with" (B2 removes that copy).
4. No.
5. "a free consultation" contradicts the FAQ cost answer (B3, N2).
6. Nearest: #1 "We only work on landlord and property tax. Nothing else." Sentence 2 matches. Sentence 1 is the longest on the page and does not.
7. Who it is for: "landlord" never appears. The reader also does not learn where the firm is (F2).
8. Correct place.

### S2. H2 "Advice, not another set of accounts"
1. Heading "Advice, not another set of accounts"; first sentence "Most property tax is lost at the point of a decision, not at the point of filing." It answers by premise. It is possibly cited, so leave it (N2).
2. None safely: pack line 52 protects cited sentences in this section.
3. "Plenty of people use both. Plenty use only one." repeats in H2 4 and FAQ 3. Keep it here (F16).
4. No.
5. No contradiction.
6. Nearest: #3 "A generalist accountant will work with what you give them, but that's not the same as understanding how a property portfolio actually operates." It matches: fair to the other service, then the gap.
7. Which sibling fits a one-property landlord (F3).
8. Correct: the positioning before the list.

### S3. H2 "Tax advice for landlords: what a consultation covers" and six H3s
1. Heading promise: what a consultation covers. First sentence: "Our landlord tax advice covers six decisions, and one consultation can take in one or several." Yes. Each H3 opens with a "We..." definition sentence, as spec pattern A asks.
2. "The usual route: the Let Property Campaign, for undeclared rent." duplicates H2 5's "we prepare the disclosure through the Let Property Campaign". Delete it if F9 goes in.
3. Incorporation "What we model: the stamp duty and capital gains tax a move triggers, against the yearly saving." against FAQ "We model the capital gains tax and the stamp duty cost of moving the properties against the yearly saving". Keep both: the FAQ is lifted standalone. The 60-day line repeats FAQ 6; keep both for the same reason. HMRC: F9.
4. "We give stamp duty advice before you exchange" carries "stamp duty advice" (pack §2 body) but reads as prose. No finding.
5. B1 (gifts to family, against `house_positions.md` §5).
6. Nearest: #6 "If incorporation would save you money, we'll model it." It matches: condition, then what we do, label lines short.
7. Five of six items are under the 60-word floor (F4, F6 to F9). An accidental landlord does not learn about main residence relief (F5).
8. Correct: the services list follows the positioning.

### S4. H2 "Property tax specialists for the decisions that cost most"
1. Heading promise: which decisions. First sentence: "As property tax specialists we see six moments again and again, each cheaper to get right before than to unpick after." Yes.
2. "You do not need a property tax expert for every question, but you do for these." (F10).
3. "HMRC has written to you ... we settle your position before you reply" repeats H3 6, H2 5 and FAQ 10. The six-item list must stay even-length (pack line 61, `triggerPrompts`), so cut the H3 line instead (F9).
4. "You do not need a property tax expert..." ("property tax expert"); "A landlord tax specialist is worth most..." ("landlord tax specialist"). Rewritten as prose in F10 and F13.
5. "but you do for these" against FAQ 8 "Sometimes not, and we will say so" (F10). "sold you a scheme" against "before you commit money" (F11).
6. Nearest: #4 "Most accountants can't answer these questions off the top of their head because they don't see enough landlord clients." Close, apart from the third-person close (F13).
7. Which four taxes a restructure touches (F12).
8. It overlaps S3 item for item. A reader who has just read six decisions gets six moments (N3).

### S5. H2 "Property tax advisor or accountant: which do you need?"
1. First sentence: "You need a property tax advisor when a decision is still open, and an accountant when a return is due." It answers the question directly.
2. "Many landlords keep their accountant and use us only for the decision." (F16).
3. The section restates S2's thesis in table form. It is pack-mandated (N3).
4. "...which is why a buy-to-let tax advisor earns their keep..." (F15).
5. The "property accountant" column contradicts the sibling property-accountant page (F14).
6. Nearest: #3. The table rows match it (plain nouns, one claim per cell).
7. Whether the firm can do both jobs: the PA sibling says it can, and this section implies not (F14).
8. It sits after S4 and repeats S2. It belongs directly after S2, or merged into it.

### S6. H2 "Property tax consultants for HMRC enquiries and disclosures"
1. First sentence: "We act as property tax consultants when HMRC is already involved: ..." Yes, first person.
2. "When an enquiry opens, HMRC asks for records and explanations." It states the obvious; it could go.
3. "we read the letter with you" against FAQ 10 "we read it with you and settle your position before you reply". Keep the FAQ copy; the body could keep only the disclosure sentence.
4. "We act as property tax consultants" carries "property tax consultants" (pack §2 h2), but reads naturally. No finding.
5. No contradiction. LPC framing matches `house_positions.md` §27.6.
6. Nearest: #12 "Give them a straight answer at the desk, run the number in front of them, and forward a page that settles it." Sentence 2 matches (three verbs, the reader's task).
7. What the outcome usually looks like (lower penalties when unprompted), stated without a figure.
8. It repeats H3 6. Its natural home is inside H3 6 (N3).

### S7. H2 "Who we work with"
1. First sentence: "We work with landlords and property investors facing a tax decision, from one buy-to-let to a portfolio in a company." Yes.
2. "We work only on property tax." (B2).
3. Repeats the opening (B2).
4. "Investors who want property investment tax advice before the next purchase, not after it." and "...our small landlord tax advice often ends in “change nothing”." Both exist for pack §2 body rows. The first is acceptable prose; the second carries N7's "often". F18 keeps the phrases and adds the links.
5. B2 contradicts the landlord-accountant sibling.
6. Nearest: #8 "We do not serve restaurants, retailers or consultants." The section should end on that sentence (B2).
7. Whether the firm helps with an inherited or gifted property (F18).
8. Correct place per pack §1 3.1 item 6.

### S8. H2 "How an engagement works" (three steps and deliverables)
1. First sentence: "An engagement works in three steps, and the first one costs nothing." It answers, but it echoes the heading (F19).
2. "A follow-up call to challenge the answer before you act" or step 3's "then a call so you can push back": one goes (F20).
3. Same as 2.
4. No.
5. Step 1 "If you do not need a consultation" uses "consultation" for the paid work (B3).
6. Nearest: #9 "If your situation changes mid-year, we will tell you before any additional fees apply." Step 2 "Nothing starts until you approve it." matches.
7. How long the note takes. Deferred by F5 (N6).
8. Correct place.

### S9. H2 "What advice costs"
1. Heading promise: cost. First sentence: "What advice costs depends on the question, and we quote it as a fixed fee before any work begins." It answers within R7. Spec §2 pattern D is met in sentence 2.
2. "Timing the sale of one flat is a small job..." (F22).
3. Same as 2.
4. "How much property tax consultants charge turns on four things..." (F21).
5. No contradiction with R7: no figure.
6. Nearest: #9. "If the question changes, we tell you before any extra fee applies." is almost word for word owner voice #9. Matches.
7. Whether there is any range at all. That waits for F3 by ruling.
8. Correct place.

### S10. H2 "Run the numbers yourself first"
1. First sentence: "Before you book, you can size several of these questions yourself with our free calculators." Yes.
2. None.
3. "you may not need us at all" is the sixth "you may not need us" on the page (opening, scoping step, FAQ 8, FAQ 12, panel). Keep this one, because it comes with a tool.
4. No.
5. No.
6. Nearest: #10 "If your position is already right, we will say so." It matches.
7. Nothing missing.
8. Correct after fees.

### S11. H2 "The rules your advice has to work around in 2026/27" and background reading
1. First sentence: "The rules your advice has to work around are moving, and several changes already in law land by April 2028." It repeats the heading (F23).
2. The table clause "so the higher-rate gap stays at 20 points" (F24).
3. The 20-point gap appears three times (F24). The 22/42/47 row repeats FAQ 11; pack line 54 asks for both, so keep both.
4. No.
5. All facts match `house_positions.md`: §7 (22/42/47 in England, Wales and NI, Scotland only carved out; reducer at 22%), §5 (incorporation relief claimed from 6 April 2026), §3 (MTD £50k/£30k/£20k), §9 (nil-rate bands to 5 April 2031). The worked example adds up: £12,000 × 20% = £2,400; × 22% = £2,640. The old page's guide excerpt said "for England and Northern Ireland"; the new page is right.
6. Nearest: #2 "It also means the conversation is more efficient: you don't have to explain what Section 24 is." The worked example matches. The table is reference register.
7. Nothing the heading implied.
8. It is placed after the tools. A reader who has decided to book does not need it; it would fit before "Questions" as it is now, or as reading after the FAQ. No change.

### S12. FAQ "Questions about a consultation"
1. Heading "Questions about a consultation"; first question "What does a property tax advisor do?" It shares no term with the heading (harness check 15). The heading is pack-fixed, so leave it. The answer's first sentence settles the question.
2. None: each item maps to a pack §3.4 FAQ entry.
3. FAQ 4 against the fees section (B3, F22). FAQ 10 against H2 5. FAQ 11 against the rules table.
4. No.
5. B3 (cost against the opening). FAQ 9 "Gains on commercial property are taxed at the same 18% and 24% rates" corrects the old page's "different capital gains treatment" (pack §5), and matches `house_positions.md` §5. Correct.
6. Nearest: #10. FAQ 12 matches. All 12 answers are 62 to 78 words and answer first (spec pattern B).
7. "How to find a good tax advisor in the UK?" and "Do accountants give free advice?" (pack §3, both mapped here) are answered only implicitly.
8. Correct place.

### S13. H2 "Related guides and services"
1. First sentence: "These guides cover the ground most of our consultations start from." Yes.
2. None.
3. The property accountant sibling is referred back to rather than linked (F26).
4. No.
5. No.
6. Nearest: #12. It matches.
7. Nothing.
8. Correct place.

### S14. H2 "Get specialist advice from a property tax adviser on the decision in front of you" (`LeadCTAPanel`)
1. First sentence: "Tell us the decision you are weighing up." Yes.
2–8. A shared component, excluded by check 8. "If your position is already right, we will say so." is owner voice #10 verbatim. No finding. The "We respond within 24 hours" line and the "Property developer" option are shared and out of scope by pack §1 item 9.

### S15. H2 "Where we work"
1. First sentence: "We advise landlords anywhere in the UK by video call and phone, so your postcode makes no difference to the service; our pages for London ... describe the local work." Yes. It is the coverage statement (check 6).
2. "Each consultation runs the same way wherever you are..." (F27).
3. Same as 2.
4. The coverage sentence serves the 14 `coverage_statement` rows without literal strings, as R5 requires. No finding.
5. No contradiction.
6. Nearest: #1. It matches.
7. Nothing.
8. It sits after the contact panel, as pack §1 3.1 item 13 allows. With F2 the opening carries the national line too.

## Whole page

**9. Reader walk.**

*First-time landlord, one flat.* Reads the opening and H2 1, sees "property accountant page" and probably clicks it, which is the wrong sibling for one flat (F3). If they stay, "Who we work with" tells them small landlords often change nothing, and FAQ 8 confirms it. They would use the Section 24 or MTD calculator and leave. They could not find a direct route to the landlord accountant service until the Related guides block at the bottom. They would not book, and that is the right outcome, provided the landlord accountant link is higher up.

*Eight-property owner deciding on a company.* Reads the opening ("whether to incorporate"), H3 "Incorporation and structuring advice" (38 words, thin), then jumps to FAQ "Do you give advice on incorporation?". Would click the incorporation calculator and `/for/moving-property-into-a-limited-company`. Could not find whether eight properties is likely to count as a business for incorporation relief (F4), or how long the note takes (N6). Would book: the page gives every reason to, and "Book a consultation" is never more than one section away. B3 matters most for this reader, because they will ask on the call what "consultation" cost them.

*Accidental landlord about to sell.* Reads the opening ("when to sell it"), the CGT H3 (60-day deadline, gifts), and the "You are about to buy or sell" moment. Would click `/for/selling-a-buy-to-let` and "Cost of selling a house". Could not find the one relief that usually matters most to them, the years they lived there and the final nine months (F5). There is also no accidental-landlord audience line (F18). Would probably book because of the 60-day deadline, but with less confidence than the page could give.

**10. Ten-second read.** Title and H1 say property tax advice from specialists. The opening says one decision, a fixed fee and a free first call, but it never says "landlord" and calls the free call a "consultation" (F2, B3). The H2 list reads as three query variants in a row ("Property tax specialists...", "Property tax advisor...", "Property tax consultants...") before it reaches "Who we work with", "How an engagement works" and "What advice costs" (N3). The first FAQ, "What does a property tax advisor do?", answers the definition question well. Verdict: yes on what is offered and what to do next (book the free call); partly on who it is for, which is implied by the decisions and not stated until H2 2.

**11. Register verdict.** Against spec §1 and harness check 14: words 1,976 by the probe (2,393 by check 19, inside 1,600 to 2,400); sentence length 22.5 (target 17 to 22, over); Flesch 55.6 (45 to 55, slightly over); question headings 28.9% (in range); you/your 29.9 (in range); we/our 30.4 (target 20 to 30, at the ceiling, which is a success against the old 8.1 to 10.6); statute 0.0 (on target); jargon 0.51 (on target); numbers 26.8 (15 to 25, over). The page is bimodal: short label fragments push Flesch up while a handful of 30-plus-word sentences push the average length up. The three sentences that pull hardest:
- "If what you actually need is someone to run the annual return, the rental schedules, the company accounts and the quarterly Making Tax Digital submissions, that is a different service and it lives on our property accountant page." (39 words. It is in H2 1, so it is protected until the fact map exists, N2.)
- "We act as property tax consultants when HMRC is already involved: a nudge letter about rental income, a formal enquiry into a return, or a disclosure you would rather make before anyone asks." (33 words; F17 splits it.)
- "Quarterly updates for qualifying income over £50,000, then over £30,000, then over £20,000" with "April 2026, 2027, 2028" (6 numbers outside a worked example; F24 deletes the row and brings numbers to about 23 per 1,000.)

**12. The single change.** Make "consultation" mean one thing: call the free step "the first call" and the paid work "the advice" throughout, starting with the FAQ cost answer (B3), so a reader knows that "Book a consultation" costs nothing.
