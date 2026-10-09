/**
 * Row shape for a Property `/for/[slug]` segment page (LEADS_250 §13 S4a).
 * Writers fill this via the S3 manifest and the S4a wave integrator; empty
 * here so T1 (the route) builds cleanly before any page is written.
 */
export interface Audience {
  slug: string;
  title: string;
  headline: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  stats: Array<{ value: string; label: string }>;
  challenges: Array<{ title: string; body: string }>;
  howWeHelp: Array<{ title: string; body: string }>;
  faqs: Array<{ question: string; answer: string }>;
  /** Sources for `stats`/claims, per house_positions.md. Not rendered. */
  sources?: string[];
}

// Source: docs/property/_wave1/*.json (15 rows, QA READY 2026-09-27). LEADS_250_PROGRAMME_2026-09-27.md section 13, S4a.
export const audiences: Audience[] = [
  {
    "slug": "moving-property-into-a-limited-company",
    "title": "Landlords Moving Property Into a Limited Company",
    "headline": "Accountants for landlords moving property into a limited company",
    "metaTitle": "Accountant to Transfer Property Into a Company",
    "metaDescription": "Moving your buy-to-lets into a limited company? A specialist reviews the SDLT, the CGT and the refinancing before anything moves. For UK landlords.",
    "intro": "You already own buy-to-lets in your own name and you are working out whether to move them into a limited company, and what that would cost. The real question is whether the stamp duty and capital gains tax on the way in are worth the corporation tax treatment afterwards. One of our property tax specialists starts with the market value and debt on each property, how the lettings are actually run, and who your lender is. Those answers decide whether section 162 incorporation relief is in play and whether a partnership route is open. By the end of it you know the cost of entry, which route fits and where HMRC would push back.",
    "stats": [
      {
        "value": "5%",
        "label": "Additional dwellings SDLT surcharge the company pays on the transfer"
      },
      {
        "value": "18% / 24%",
        "label": "CGT rates on residential gains in 2026/27"
      },
      {
        "value": "3 years",
        "label": "Anti-withdrawal window after a partnership transfer"
      },
      {
        "value": "22% / 42% / 47%",
        "label": "Property income tax rates from 6 April 2027"
      }
    ],
    "challenges": [
      {
        "title": "Stamp duty is charged on market value, not on what you pay yourself",
        "body": "Selling to your own company is a connected-party transaction, so SDLT is worked out on the open market value of each property whatever figure sits on the transfer deed. The company also pays the 5% additional dwellings surcharge on top of the standard bands, and a single dwelling above £500,000 can fall into the 17% flat rate for non-natural persons. Put your own numbers through the <a href=\"/calculators/stamp-duty-calculator\">stamp duty calculator</a> first."
      },
      {
        "title": "The partnership route is narrower than the commentary suggests",
        "body": "Where the lettings are genuinely run as a partnership, the sum of the lower proportions calculation in Schedule 15 of the Finance Act 2003 can reduce the chargeable consideration, and at 100% it removes it. That needs a real partnership with substance: filed returns, records, joint borrowing. One created weeks before the transfer is the pattern HMRC challenges. Cohabiting unmarried couples are not connected persons, and withdrawing capital within three years is itself chargeable."
      },
      {
        "title": "Incorporation relief now has to be claimed, and it has to be earned",
        "body": "The transfer is a disposal at market value, so the gain since purchase is chargeable at 18% or 24% with a 3,000 pound annual exempt amount against it. Section 162 relief rolls that gain into the base cost of your shares, but only where you transfer a business as a going concern with all its assets other than cash for shares. Since 6 April 2026 it must also be claimed, by the first anniversary of the 31 January following the tax year of transfer."
      },
      {
        "title": "Your lender has to agree, and the new borrowing costs more",
        "body": "A personal buy-to-let mortgage does not follow the property into a company. Each loan is redeemed and refinanced onto limited company terms: early repayment charges, arrangement fees, new valuations and a personal guarantee from you as director. Company products typically price above equivalent personal ones, and this is the part most likely to stop the plan."
      },
      {
        "title": "A company is a permanent running cost, not a one-off decision",
        "body": "Afterwards you have annual accounts, a CT600, confirmation statements and identity verification at Companies House, and you no longer own the rent personally. Taking money out means a director's loan repayment, a dividend or salary. The loan account credit created on incorporation is the cheapest route and it runs out. Dividends above the 500 pound allowance are taxed at 10.75%, 35.75% and 39.35%."
      }
    ],
    "howWeHelp": [
      {
        "title": "A cost of entry you can check line by line",
        "body": "One of our <a href=\"/services/property-tax-advice\">property tax specialists</a> reviews each property's market value, base cost and outstanding debt, then prices the SDLT the company would pay and the CGT you would face without relief. You get figures per property, not one portfolio total, because the answer is often that some should move and others should not. Sanity-check it first with the <a href=\"/calculators/incorporation-cost-calculator\">incorporation cost calculator</a>."
      },
      {
        "title": "A written view on whether section 162 is available to you",
        "body": "Your accountant prepares an assessment of whether your lettings amount to a business on the evidence that exists: hours spent, number of properties, who deals with tenants and repairs, what your records show. A strong case is documented so it can be defended. A thin one is put to you plainly."
      },
      {
        "title": "The partnership question answered before it is relied on",
        "body": "Where a partnership already operates, a specialist reviews the returns, the income profit shares and the connected-person positions, and works the sum of the lower proportions through to a figure. Where none exists, you are told what a genuine one would require and how long it would need to have run."
      },
      {
        "title": "The structure, the filings and the timetable",
        "body": "The share structure, the director's loan account position and the transfer timetable are prepared alongside your solicitor and broker, so the refinancing, the conveyancing and the filings line up. That covers the 60-day capital gains return where tax is due, the section 162 claim where it applies, and how money comes out afterwards."
      }
    ],
    "faqs": [
      {
        "question": "Do I pay stamp duty when I transfer my own property to my own company?",
        "answer": "Yes, in almost every case. The company is a connected party, so SDLT is calculated on the open market value of the property rather than any price you put on the transfer, and there is no relief simply because you own both sides. The company pays the residential bands plus the 5% additional dwellings surcharge. The main exception is a genuine partnership transfer under Schedule 15, where the sum of the lower proportions can reduce or remove the charge."
      },
      {
        "question": "Does incorporation relief mean I pay no capital gains tax?",
        "answer": "It means the gain is rolled into the base cost of the shares you receive rather than taxed on transfer, so the tax is deferred rather than cancelled, and you meet it if you later sell the shares. You must transfer a business as a going concern, all its assets other than cash must go across, and the consideration must be wholly or partly shares. Since 6 April 2026 it must be claimed rather than applying automatically."
      },
      {
        "question": "Is my rental portfolio a business for section 162 purposes?",
        "answer": "It depends on the activity, not the number of doors alone. HMRC looks for evidence of a business being carried on: active management, time committed, decisions made, work done on tenancies and repairs rather than an agent doing everything while you receive a statement. A larger portfolio under hands-on management is the stronger case; one or two lets run by an agent usually is not."
      },
      {
        "question": "Should I incorporate before the 2027 property income tax rates start?",
        "answer": "The change raises property income rates to 22%, 42% and 47% from 6 April 2027 in England, Wales and Northern Ireland, and lifts the Section 24 finance cost reducer to 22% at the same time. A basic-rate landlord sees no new gap. For a higher-rate landlord the finance cost gap stays the width it is now, so the rate rises without a new penalty on borrowing. More on <a href=\"/blog/incorporation-and-company-structures/2027-tax-rates-incorporation-decision-property-landlords\">the 2027 rates and the incorporation decision</a>."
      },
      {
        "question": "How long does transferring a portfolio into a company take?",
        "answer": "Plan on several months rather than weeks for a portfolio of any size. Company formation and identity verification at Companies House are quick. The slow parts are market valuations for every property, the refinancing offer from a limited company lender, and the conveyancing on each title. Where capital gains tax is payable, a return and payment are due within 60 days of completion. The <a href=\"/blog/incorporation-and-company-structures/how-to-transfer-property-into-limited-company-uk\">step-by-step transfer sequence</a> is set out separately."
      }
    ],
    "sources": [
      "house_positions.md 1 (SDLT residential bands 2026/27, 5% additional dwellings surcharge from 31 Oct 2024, Sch 4A 17% flat rate over 500k for non-natural persons)",
      "house_positions.md 1.A (FA 2003 Sch 15 paras 18-20 sum of lower proportions on transfer from a partnership to a connected company, paras 10-13 the mirror rule for transfers into a partnership, para 17A three-year anti-withdrawal rule, CTA 2010 s.1122 connected persons and cohabitants, genuine-partnership substance requirement)",
      "house_positions.md 1.B (FA 2003 s.108 linked transactions, aggregation of consideration)",
      "house_positions.md 4 (Section 24 finance cost restriction, 20% reducer 2026/27, 22% from 2027/28, does not apply to companies)",
      "house_positions.md 5 (CGT 18%/24% residential from 30 Oct 2024, 3,000 pound annual exempt amount, 60-day reporting where tax is due, s.162 incorporation relief must be claimed for transfers on or after 6 Apr 2026 and the claim deadline, business test)",
      "house_positions.md 7 (property income rates 22%/42%/47% from 6 April 2027 for England, Wales and NI; reducer tracks 22%; wedge does not widen)",
      "house_positions.md 11 (Companies House reforms, identity verification)",
      "house_positions.md 21.1 (director's loan account credit created on s.162 transfer, repayment order, DLA exhaustion, s.455 charge 35.75% for loans made on or after 6 Apr 2026)",
      "house_positions.md 21.4 (dividend rates 2026/27: 500 pound allowance, 10.75%/35.75%/39.35%)",
      "docs/property/coverage_map_2026-09.json, situation 'Landlord moving personally held buy-to-lets into a limited company'"
    ]
  },
  {
    "slug": "selling-a-buy-to-let",
    "title": "Landlords Selling a Buy-to-Let",
    "headline": "Accountants for landlords selling a buy-to-let",
    "metaTitle": "CGT Accountant for Selling a Buy-to-Let Property",
    "metaDescription": "Selling a rental property or a former home that was let? Get the 60-day CGT return, the gain computation and the reliefs handled by a property tax specialist.",
    "intro": "You are selling a buy-to-let, or a home you lived in and later let out, and you want to know who to contact about the capital gains tax. Where tax is due, the return and the payment are owed within 60 days of completion. One of our property tax specialists looks first at the exchange date, because that fixes the tax year, the completion date, because that starts the 60-day clock, and whether the property was ever your only or main home, because that moves the figure most. The gain computation comes to you line by line, the return is prepared and filed, and the same figures carry into your self assessment.",
    "stats": [
      {
        "value": "60 days",
        "label": "From completion to file and pay, where CGT is due"
      },
      {
        "value": "18% / 24%",
        "label": "Residential CGT rates, basic and higher rate"
      },
      {
        "value": "£3,000",
        "label": "Annual exempt amount per person, 2026/27"
      },
      {
        "value": "9 months",
        "label": "Final period of ownership covered by Private Residence Relief"
      }
    ],
    "challenges": [
      {
        "title": "The 60-day return, and two dates that differ",
        "body": "If you are UK resident and tax is due on a UK residential disposal, the return and the payment are owed within 60 days of completion. Where the gain is fully covered by relief, losses or the annual exempt amount, no 60-day return is needed. Non-residents file for every UK land disposal either way. The disposal itself happens at exchange, so a March exchange with a May completion is a gain in the earlier tax year with the clock running from May. The <a href=\"/blog/capital-gains-tax/cgt-payment-deadlines-property-sales-2026\">deadline sequence and the penalties are here</a>."
      },
      {
        "title": "Working out the gain and what you can actually deduct",
        "body": "The list of deductible selling costs is a closed one: professional fees for a surveyor, valuer, auctioneer, accountant, agent or legal adviser, transfer costs including stamp duty, advertising for a buyer, and valuation costs needed for the computation. Improvement spending still reflected in the property at sale is deductible separately. Removals, storage, cleaning, cosmetic work, mortgage interest and early redemption charges are not. Start with the <a href=\"/calculators/capital-gains-tax-calculator\">capital gains tax calculator</a> for a first figure."
      },
      {
        "title": "A former home, Private Residence Relief and lettings relief",
        "body": "If the property was at some point your only or main residence, relief covers the periods of occupation plus the final nine months of ownership, with further deemed occupation in defined situations such as working away. Lettings relief is the part people still get wrong: since 6 April 2020 it only applies where you shared occupation with the tenant, so a landlord who moved out and let the whole house gets none."
      },
      {
        "title": "Rates and the annual exempt amount for 2026/27",
        "body": "Residential gains are taxed at 18% in the basic rate band and 24% above it, with trustees and personal representatives at 24% throughout. The annual exempt amount is £3,000 per person, down from £6,000 and from £12,300 before that, so an older worked example will understate your bill. It is per person and per tax year, which is why joint ownership and the exchange date both matter."
      },
      {
        "title": "Selling before or after incorporation, and company-held property",
        "body": "Section 162 incorporation relief is no longer automatic: for transfers on or after 6 April 2026 it must be claimed, and the election to disapply it has been repealed. Where the property already sits in a company there is no annual exempt amount and the company pays corporation tax on the gain, so selling the shares rather than the property changes the tax for both sides. That fork is <a href=\"/blog/incorporation-and-company-structures/selling-a-property-spv-share-sale-vs-asset-sale\">set out here</a>."
      }
    ],
    "howWeHelp": [
      {
        "title": "A first review of the disposal before you commit",
        "body": "A specialist reviews the ownership history, the occupation periods, the intended exchange and completion dates and how the property is held. That tells you whether a 60-day return is required at all, which tax year the gain lands in, and whether the timing changes the outcome. Most useful before contracts are exchanged."
      },
      {
        "title": "The gain computation, built line by line",
        "body": "Your accountant prepares the computation from documents rather than estimates: completion statements for purchase and sale, improvement spending you can evidence, the closed list of allowable selling costs, and the relief apportionment for any period the property was your main home. You get the working, not just a number."
      },
      {
        "title": "The 60-day return prepared and filed",
        "body": "Where tax is due, a <a href=\"/services/property-accountant\">capital gains tax accountant who works only on property</a> sets up the property account if you do not have one, prepares the return, tells you the payment figure and the date it is owed, and files inside the window. Where the gain is covered by relief, losses or the allowance, you get that conclusion in writing instead."
      },
      {
        "title": "Carried through to your self assessment",
        "body": "The 60-day payment is on account, not the end of it. The same disposal goes on your self assessment for the year and the two must agree. Your <a href=\"/services/landlord-accountant\">buy-to-let accountant</a> carries the computation forward, sets the payment against the final liability, and picks up capital losses brought forward or realised elsewhere."
      }
    ],
    "faqs": [
      {
        "question": "Do I have to report the sale within 60 days if I made no profit?",
        "answer": "Not if you are UK resident and no capital gains tax is due. Where the gain is fully covered by Private Residence Relief, by capital losses or by the annual exempt amount, there is no 60-day filing requirement, though you may still report the disposal on your self assessment return. Non-residents must file within 60 days for every disposal of UK land, whether or not any tax is payable."
      },
      {
        "question": "I exchanged in March and completed in May. Which tax year is the gain in?",
        "answer": "The earlier one. The disposal happens when the contract is made, so a March exchange puts the gain in the tax year ending that 5 April, and that year's allowance and rate bands apply. The 60-day reporting and payment clock runs from completion in May instead. The two dates follow different rules and often sit in different tax years, which is why the exchange date is checked first."
      },
      {
        "question": "Can I deduct the agent's fee and the mortgage early repayment charge?",
        "answer": "The sale commission yes, the early repayment charge no. Deductible selling costs are a closed statutory list: professional fees, transfer costs including stamp duty, advertising for a buyer, and valuation costs for the computation. Interest and mortgage redemption charges are excluded, as are removals, storage and cosmetic work. If you cannot recover the VAT on a fee, deduct it inclusive of VAT. Letting agent management fees go against rental income, never against the gain."
      },
      {
        "question": "I lived in the house before letting it out. How much relief do I get?",
        "answer": "Relief covers the period you occupied it as your only or main residence, plus the final nine months of ownership, with additional deemed occupation in defined circumstances such as working away. The remaining period is chargeable, apportioned by time. Lettings relief is narrow now: since 6 April 2020 it applies only where you shared occupation with your tenant. The <a href=\"/blog/capital-gains-tax/principal-private-residence-relief-landlords\">relief is explained in more detail here</a>."
      },
      {
        "question": "Should I sell now or move the property into a company first?",
        "answer": "Different transactions with different tax, and the answer turns on your portfolio rather than a rule of thumb. A transfer to your own company is itself a disposal at market value, with stamp duty on the company's acquisition. Incorporation relief can defer the gain but must be claimed for transfers on or after 6 April 2026, and it needs a genuine business rather than a single let. The <a href=\"/blog/capital-gains-tax/cgt-calculation-selling-buy-to-let-property-step-by-step\">worked calculation for a straight sale is here</a>."
      }
    ],
    "sources": [
      "docs/property/house_positions.md section 5 (CGT on UK residential property 2026/27): rates 18%/24%, annual exempt amount 3,000, 60-day return and payment where tax is due, non-resident filing for every disposal, penalty ladder, PRR final 9 months, lettings relief shared-occupation only from 6 April 2020, TCGA 1992 s.58 no-gain-no-loss spousal transfers, s.162 incorporation relief must be claimed for transfers on/after 6 April 2026 with the s.162A election repealed by FA 2026 s.39",
      "docs/property/house_positions.md section 5.B (disposal date and incidental costs of disposal): TCGA 1992 s.28(1) exchange fixes the disposal date, FA 2019 Sch 2 para 3(1)(b) 60-day trigger at completion, s.38(1)(c) and s.38(2) exhaustive selling-cost list, s.38(1)(b) enhancement expenditure, s.38(3) interest never deductible, CG14300 VAT-inclusive deduction where no set-off, letting-agent management fees revenue not capital",
      "docs/property/house_positions.md sections 39 and 39.A: trustees and personal representatives at 24%",
      "Primary law (source gap closed at QA, not in house_positions): companies pay corporation tax on chargeable gains and get no annual exempt amount - TCGA 1992 s.1A(3) and s.1K (AEA is for individuals), CTA 2009 s.2(1)-(2); transfer of property to a connected company is a disposal at market value - TCGA 1992 s.17(1)/s.18, with SDLT on the company's acquisition - FA 2003 s.42",
      "docs/property/coverage_map_2026-09.json: row working_title 'Accountants for landlords selling a buy-to-let', situation 'Landlord selling a buy-to-let or a former home', target_query 'cgt accountant property sale', wave 1, hp_anchors 5 / 5.B / 39",
      "Internal links used: /calculators/capital-gains-tax-calculator, /blog/capital-gains-tax/cgt-payment-deadlines-property-sales-2026, /blog/capital-gains-tax/principal-private-residence-relief-landlords, /blog/capital-gains-tax/cgt-calculation-selling-buy-to-let-property-step-by-step, /blog/incorporation-and-company-structures/selling-a-property-spv-share-sale-vs-asset-sale"
    ]
  },
  {
    "slug": "portfolio-landlords-incorporating-a-partnership",
    "title": "Portfolio Landlords Incorporating a Lettings Partnership",
    "headline": "Accountants for portfolio landlords incorporating a lettings partnership",
    "metaTitle": "Property Partnership Incorporation: Portfolio Landlords",
    "metaDescription": "For portfolio landlords moving an established lettings partnership into a company: the SDLT, CGT and mortgage questions a specialist reviews first.",
    "intro": "You run a lettings portfolio of roughly 10 to 40 properties with your spouse, civil partner or family as partners, the partnership has filed its own returns for years, and you are weighing a move into a limited company. That is a different problem from moving one or two personally held flats. Everything rests on a prior question: whether a partnership genuinely exists in law, and how long it has run. Both reliefs depend on the answer, partnership treatment for stamp duty under FA 2003 Schedule 15 and section 162 incorporation relief for the capital gain. Below, each of those in turn, then the lender problem and the cost of running the company.",
    "stats": [
      {
        "value": "2 years",
        "label": "Working safe harbour of genuine partnership operation before a Schedule 15 transfer"
      },
      {
        "value": "3 years",
        "label": "Anti-withdrawal window after a Sch 15 transfer"
      },
      {
        "value": "5%",
        "label": "Additional dwellings SDLT surcharge where partnership treatment does not apply"
      },
      {
        "value": "6 dwellings",
        "label": "Point at which one transaction is treated as non-residential for SDLT"
      }
    ],
    "challenges": [
      {
        "title": "Does a partnership actually exist, and since when?",
        "body": "Joint ownership of let property does not by itself create a partnership. The Partnership Act 1890 asks for people carrying on a business in common with a view of profit, and section 2(1) says co-ownership is not enough. What supports the position is the record: SA800 returns filed year on year, partnership accounts, joint borrowing, an agreement. Around two years of genuine operation is the working safe harbour. The full test is in <a href=\"/blog/incorporation-and-company-structures/does-your-business-qualify-as-a-partnership\">does your property business qualify as a partnership</a>."
      },
      {
        "title": "Schedule 15 and the sum of the lower proportions",
        "body": "On a transfer out of a genuine partnership to a connected company, chargeable consideration is market value reduced by the sum of the lower proportions. Where the partners are connected and the shares line up, that sum can reach 100% and the stamp duty falls to nil. Otherwise the balance is chargeable at residential rates plus the 5% surcharge, or at non-residential rates where six or more dwellings move together. The calculation turns on income profit shares, not capital or voting shares. The mechanics are in <a href=\"/blog/incorporation-and-company-structures/partnership-sdlt-relief-schedule-15-fa-2003-incorporation-sum-lower-proportions\">the sum of lower proportions guide</a>, and the <a href=\"/calculators/stamp-duty-calculator\">stamp duty calculator</a> sizes the wider bill."
      },
      {
        "title": "Incorporation relief and the business test",
        "body": "Section 162 rolls the gain into the shares rather than taxing it on transfer, but only where a business moves as a going concern with all assets other than cash. Letting is not automatically a business: the evidence is active management across the portfolio. For transfers on or after 6 April 2026 the relief must be claimed, and that claim is due twelve months after the 31 January that follows the tax year of transfer. Background in <a href=\"/blog/incorporation-and-company-structures/section-162-incorporation-relief-property-landlords\">does section 162 incorporation relief apply to property landlords</a>."
      },
      {
        "title": "Lenders, consents and the refinancing cost",
        "body": "The company is a new borrower. Buy to let mortgages do not travel with the properties, so every charged property needs lender consent or a fresh company facility, usually at a different rate and with personal guarantees."
      },
      {
        "title": "Running the company and drawing money out",
        "body": "Inside a company the finance cost restriction stops biting and profits meet corporation tax at 19% up to £50,000 and 25% above £250,000, with a marginal band between. The director's loan account created on incorporation can be drawn tax free until it runs out, after which dividends are taxed at 10.75%, 35.75% and 39.35% for 2026/27, against 8.75% and 33.75% on the first two bands the year before."
      }
    ],
    "howWeHelp": [
      {
        "title": "A partnership substance review before anything moves",
        "body": "Everything turns on the agreement, the SA800 filing history, the accounts, the borrowing and how decisions have been taken. Read together they show whether the partnership would stand up to an enquiry and from what date. Where the substance is thin, the review says what would have to change."
      },
      {
        "title": "A modelled stamp duty and capital gains position",
        "body": "The sum of the lower proportions is computed from the income profit shares as they stand, the portfolio is valued, and any residual stamp duty is set against the position without the partnership route. The gain is computed property by property. The <a href=\"/calculators/incorporation-cost-calculator\">incorporation cost calculator</a> gives a first pass on the whole cost."
      },
      {
        "title": "The claim, the returns and the filings",
        "body": "The section 162 claim is prepared and diarised to its deadline alongside the land transaction returns, the partnership cessation return, the personal returns for the year of transfer and the company's first accounting period. Forming the company, director and PSC identity verification and the first confirmation statement run in the same sequence."
      },
      {
        "title": "A drawings plan with the three-year rule in it",
        "body": "A specialist maps the loan account balance against what the household needs to draw, marks the point where it runs out, and checks any capital withdrawn from the partnership against the three-year para 17A rule. Salary, dividend and pension routes are modelled at your profit level, not a standard mix."
      },
      {
        "title": "A written recommendation you can act on or decline",
        "body": "The output of our <a href=\"/services/property-tax-advice\">incorporation advice</a> is a written report: the numbers, the risks named, the sequence and the dates. Incorporation is not right for every portfolio, and where the modelling says stay as you are, the report says that. Where you want the work done, our team does it."
      }
    ],
    "faqs": [
      {
        "question": "Our portfolio is jointly owned by my wife and me. Is that a partnership?",
        "answer": "Not on its own. Joint ownership of let property is expressly not a partnership under the Partnership Act 1890, and HMRC's guidance on jointly owned property follows the same line. What turns co-ownership into a partnership is a business carried on in common: an agreement, SA800 returns, partnership accounts, joint borrowing and joint decisions over a period. A specialist reviews what exists today."
      },
      {
        "question": "How long must the partnership have run before we incorporate?",
        "answer": "There is no statutory period, but around two years of genuine operation with filed partnership returns is the working safe harbour. Shorter periods invite an enquiry, and HMRC's standard line is that the partnership was a paper arrangement entered into to reach the stamp duty treatment. The question is not how long the document has existed, but how long the business has run as one."
      },
      {
        "question": "Will we pay stamp duty on the transfer into the company?",
        "answer": "It depends on the sum of the lower proportions. Where the partnership is genuine and the partners are connected with each other and with the company, the chargeable consideration can fall to nil. Where the profit shares do not line up, or a partner is not connected, part of the market value stays chargeable at residential rates plus the 5% surcharge, or at non-residential rates for six or more dwellings. Cohabiting couples are not connected here."
      },
      {
        "question": "Does section 162 incorporation relief apply to a lettings partnership?",
        "answer": "It can, where the letting amounts to a business transferred as a going concern with all assets other than cash. That is a question of evidence rather than property count: active management, hours worked, how the portfolio is run. For transfers on or after 6 April 2026 a claim is required, due one year on from the 31 January that follows the tax year in which the transfer takes place."
      },
      {
        "question": "What happens to our existing buy to let mortgages?",
        "answer": "They do not move with the properties. The company borrows in its own name, so each charged property needs lender consent or a new company facility, typically with personal guarantees from the directors. Expect early repayment charges, new valuations, arrangement fees and legal costs, with the lending timetable driving the completion date."
      }
    ],
    "sources": [
      "docs/property/house_positions.md section 1 (SDLT bands 2026/27, 5% additional dwellings surcharge, six-dwellings rule s.116(7) FA 2003, genuine partnership incorporation under FA 2003 Sch 15)",
      "docs/property/house_positions.md section 1.A (Sch 15 paras 10-20 and 34, sum of the lower proportions, income-profit-share definition, CTA 2010 s.1122 connected persons, cohabitants not connected, para 17A three-year anti-withdrawal rule, two-year genuine-operation safe harbour, HMRC SDLTM33500+)",
      "docs/property/house_positions.md section 5 (s.162 incorporation relief, claim required for transfers on or after 6 April 2026, s.162A election repealed by FA 2026 s.39, business test and Ramsay v HMRC [2013])",
      "docs/property/house_positions.md section 11.C (PA 1890 s.1 four tests, s.2(1) co-ownership negative, HMRC BIM72015 and PIM1030, SA800 obligation TMA 1970 s.12AA)",
      "docs/property/house_positions.md sections 21.1 and 21.4 (director's loan account on incorporation, CT 19%/25% with marginal band, dividend rates 10.75%/35.75%/39.35% for 2026/27 against 8.75%/33.75% previously)",
      "docs/property/house_positions.md sections 11 and 11.A (Companies House director and PSC identity verification, confirmation statement)",
      "FA 2003 Schedule 15 at https://www.legislation.gov.uk/ukpga/2003/14/schedule/15 (partnership transfers, paras 10-20, 17A, 34)",
      "docs/property/coverage_map_2026-09.json (situation row: Portfolio landlord incorporating an established lettings partnership; wave 1 segment page)"
    ]
  },
  {
    "slug": "non-resident-landlords",
    "title": "Non-Resident and Overseas Landlords",
    "headline": "Accountants for non-resident and overseas landlords",
    "metaTitle": "Non-Resident Landlord Accountants | Overseas",
    "metaDescription": "For landlords letting or selling UK property from abroad. NRL scheme and NRL1, self assessment from overseas, non-resident CGT and the 60-day return.",
    "intro": "You let a UK property and you no longer live in the UK. Perhaps you took a job overseas and kept the flat, retired abroad, or are moving back after five years away with nobody having looked at the returns since. Your letting agent may already be taking 20% off the rent. A specialist settles the residence position first: whether you are non-resident for each tax year under the statutory residence test, whether you hold gross payment approval under the Non-Resident Landlord Scheme, and whether every year since you left has actually been filed. What comes back is a written position: what is outstanding, what can be reclaimed, what a sale would cost. The scheme mechanics are on the <a href=\"/services/non-resident-landlord\">non-resident landlord service page</a>.",
    "stats": [
      {
        "value": "20%",
        "label": "Basic rate withheld from your rent without gross payment approval"
      },
      {
        "value": "60 days",
        "label": "To report and pay on a UK land disposal, whether or not tax is due"
      },
      {
        "value": "£100 a week",
        "label": "Rent above which a tenant with no UK agent must withhold"
      },
      {
        "value": "5 April 2015",
        "label": "Default rebasing date for non-resident residential gains"
      }
    ],
    "challenges": [
      {
        "title": "The scheme starts working on you before you apply to it",
        "body": "The Non-Resident Landlord Scheme is statutory, under ITA 2007 ss.971-972. Once your address is outside the UK, a letting agent withholds basic rate tax from the rent and accounts quarterly, and where there is no agent a tenant paying over £100 a week must do the same. Gross payment approval is applied for on NRL1 as an individual, NRL2 as a company or NRL3 as trustees, and only where your UK tax affairs are up to date, so it and the outstanding returns are one job."
      },
      {
        "title": "Self assessment continues, and the allowance position is not automatic",
        "body": "Being non-resident does not end your UK filing. Profit from UK property stays taxable here at 20%, 40% and 45% for 2026/27, with the section 24 reducer as a 20% basic rate credit. Whether you keep the personal allowance depends on nationality or treaty: UK and EEA nationals retain it under domestic law, others depend on the specific treaty. Sketch the profit with the <a href=\"/calculators/rental-income-tax-calculator\">rental income tax calculator</a>, or read the <a href=\"/blog/non-resident-landlord-tax/uk-property-income-expats-tax-obligations-explained\">expat obligation map</a>."
      },
      {
        "title": "Selling from abroad puts you on a 60-day clock",
        "body": "A non-resident must file a UK property disposal return and pay within 60 days of completion for every UK land disposal, including commercial land, indirect disposals of property-rich shares, and disposals where no tax is due. A UK resident files only where tax is due, so the rule you knew before you left is now the wrong one. Residential gains are charged at 18% and 24%, with a £3,000 annual exempt amount."
      },
      {
        "title": "Rebasing decides how much of the gain is even in charge",
        "body": "Non-residents came into UK capital gains on residential property from 6 April 2015 and on non-residential land and property-rich shares from 6 April 2019. The gain defaults to market value on 5 April 2015 or 5 April 2019 rather than what you paid, so a property bought long before you left can carry a far smaller chargeable gain than the headline. Apportionment and the full historic gain are the alternatives. The <a href=\"/calculators/capital-gains-tax-calculator\">capital gains tax calculator</a> gives a first number."
      },
      {
        "title": "A treaty allocates the tax, it does not remove it",
        "body": "Treaties are widely misread as an exemption. Under the immovable property article the UK keeps primary taxing rights over UK rental income and property gains, whatever your residence. The treaty decides how your country of residence relieves the double charge, and gives a tie-breaker for the year you are arguably resident in both. Foreign tax credit is never automatic: it is claimed on a return, and each filing is prepared knowing what the other says."
      }
    ],
    "howWeHelp": [
      {
        "title": "Your residence position, year by year",
        "body": "A specialist works the statutory residence test for each tax year separately, because leaving in one year settles nothing about the next, and checks whether split-year treatment applies to the year you left. Where you were resident in both countries on domestic rules, the treaty tie-breaker is worked through and written down with the day counts."
      },
      {
        "title": "Gross payment approval and the years behind you",
        "body": "Your accountant prepares the NRL1, NRL2 or NRL3 alongside any outstanding self assessment years, because approval depends on the UK record being up to date. Where the Let Property Campaign is the right route for undeclared years, the disclosure goes with it. Approval usually takes around six weeks, so ordering matters."
      },
      {
        "title": "The annual return, and the tax already taken off",
        "body": "The return is prepared from your agent statements and NRL6 certificates, with withheld tax set against the liability and over-deductions reclaimed, not left with HMRC. Foreign tax credit is handled at the final declaration, and where Making Tax Digital applies, quarterly updates continue from overseas."
      },
      {
        "title": "Disposals planned before the contract, not after",
        "body": "When you are selling, a specialist reviews the rebasing options and valuation evidence, works private residence relief for any period you lived there, and sets the 60-day return and payment against completion. Where you are moving back, the temporary non-residence rules are checked before the sale date is fixed."
      }
    ],
    "faqs": [
      {
        "question": "I have just moved abroad and kept my flat. What has to happen first?",
        "answer": "Tell your letting agent your new address, because they must start withholding basic rate tax from the rent once you are outside the UK, then apply for gross payment approval on the NRL1 if you want the rent in full. Register for self assessment if you are not already in it. Your first year abroad may be a split year, which changes what is taxable, so settle the residence position first."
      },
      {
        "question": "Can I still get the UK personal allowance against my rental profit?",
        "answer": "It depends on your nationality and the treaty with the country you live in. UK and EEA nationals keep the personal allowance under domestic law. For other nationalities it turns on what the specific treaty gives, and some give nothing. It is checked case by case, because the return is built on the answer and an assumed allowance produces an underpayment that carries interest."
      },
      {
        "question": "Do I have to file a 60-day return if I make no gain on the sale?",
        "answer": "Yes. A non-resident must report every UK land disposal within 60 days of completion, whether or not tax is due, and that covers commercial land and indirect disposals of property-rich shares as well as a residential let. It is the most missed deadline for overseas owners, because it differs from the rule that applied while you were UK resident. The <a href=\"/blog/non-resident-landlord-tax/non-resident-cgt-selling-uk-property-overseas-guide\">full guide to non-resident CGT</a> sets out the mechanics."
      },
      {
        "question": "If I sell while I am abroad and then move back, is the gain gone?",
        "answer": "Not necessarily. UK land sits inside the non-resident charge anyway, so the disposal is taxable here when it happens. Separately, if your period of non-residence is five years or less and you were UK resident in four or more of the seven tax years before you left, temporary non-residence rules can pull gains into the year you return. Check the dates before fixing completion."
      },
      {
        "question": "I let the place for years and never filed anything. How bad is that?",
        "answer": "It is a common starting point, not an unusual one. The Let Property Campaign exists for exactly this, and an unprompted disclosure gets better penalty treatment than one made after HMRC writes to you. The years are reconstructed, the profit recalculated with expenses that were never claimed, and the tax your agent already withheld comes off the total. Gross payment approval follows once the record is clean."
      }
    ],
    "sources": [
      "docs/property/house_positions.md 16.6 (NRL scheme statutory basis: ITA 2007 ss.971-972 + SI 1995/2902; treaty does not displace NRL)",
      "docs/property/house_positions.md 17.5 (NRL1/NRL2/NRL3, NRLQ/NRLY, NRL6, £100 a week tenant threshold, approval around six weeks)",
      "docs/property/house_positions.md 17.4 (NRCGT at TCGA 1992 s.1A and Schs 1A/1B/4AA; 6 Apr 2015 residential, 6 Apr 2019 non-residential and indirect; rebasing defaults; 60-day return for every disposal; 18%/24%; £3,000 AEA)",
      "docs/property/house_positions.md 17.1, 17.2, 17.3 (statutory residence test, split-year Cases 1-8, temporary non-residence TCGA 1992 s.10A five-year test)",
      "docs/property/house_positions.md 17.7 (personal allowance by nationality or treaty; self assessment continues; 60-day return separate from self assessment; SRT applied each tax year)",
      "docs/property/house_positions.md 16.2, 16.3, 16.4 (Art 6 UK source taxing rights, Art 13 NRCGT override, Art 4 tie-breaker cascade; foreign tax credit claimed not automatic)",
      "docs/property/house_positions.md 5 (CGT 18%/24%, £3,000 AEA, private residence relief, 60-day reporting)",
      "docs/property/house_positions.md 7 and 4 (2026/27 property income at 20/40/45; section 24 finance cost reducer at 20% for 2026/27)",
      "docs/property/house_positions.md 19.11 (foreign property income inside MTD, SA106 software support, foreign tax credit at final declaration, NRL interaction)",
      "gov.uk 'Paying tax on rent to landlords abroad', fetched 2026-09-27 (£100 a week tenant threshold, basic rate deduction, quarterly remittance)",
      "docs/property/coverage_map_2026-09.json (map row: situation, target query 'non resident landlord accountant', hp anchors 17, 17.4, 17.5)"
    ]
  },
  {
    "slug": "property-spv-set-up",
    "title": "Setting Up a Property SPV",
    "headline": "Accountants for landlords setting up a property SPV",
    "metaTitle": "SPV Accountant for Property Investors | UK",
    "metaDescription": "Setting up a property SPV to buy your first or next buy-to-let? Specialist support on SIC codes, SDLT, director's loans, corporation tax and first-year filings.",
    "intro": "You have decided the next property goes into a company, and now the company itself has to be right before completion, whether this is a first buy-to-let or an addition to a portfolio you hold personally. What you set up on day one is expensive to unpick later. Four decisions sit ahead of formation: who holds the shares and in what classes, which SIC code the company registers under and whether your lender accepts it, how the deposit reaches the company and how it comes back out, and what corporation tax looks like once associated companies are in the picture. All four are settled before the company is formed, so the formation record stands up to a lender and to HMRC, the 2026/27 extraction model is set, and the first-year filing dates are already on a calendar.",
    "stats": [
      {
        "value": "5%",
        "label": "SDLT additional dwellings surcharge on a company residential purchase"
      },
      {
        "value": "19% to 25%",
        "label": "Corporation tax on SPV profits in 2026/27, 26.5% effective in the marginal band"
      },
      {
        "value": "£50,000",
        "label": "Small profits rate limit, shared across associated companies"
      },
      {
        "value": "35.75%",
        "label": "Section 455 charge on an overdrawn director's loan made on or after 6 April 2026"
      }
    ],
    "challenges": [
      {
        "title": "SIC codes and what a buy-to-let lender expects",
        "body": "The SIC code you register at Companies House is the first thing an underwriter reads, and a code describing development or management when you intend to let can stall an application weeks before completion. Pick it before the company exists, because changing it later has to be explained. Detail sits in the guide to <a href=\"/blog/property-finance/sic-code-for-an-spv-property-company\">SIC codes an SPV lender accepts</a>."
      },
      {
        "title": "The 5% surcharge applies to the company's first purchase",
        "body": "A company gets no first-property exemption. The additional dwellings surcharge of 5% applies on top of the standard residential rates from the first pound of a company residential purchase, for transactions on or after 31 October 2024. Above £500,000 a flat 17% rate for non-natural persons under Schedule 4A FA 2003 also comes into view, with relief where the interest is acquired exclusively as a source of rents in a qualifying property rental business. Model it with the <a href=\"/calculators/stamp-duty-calculator\">stamp duty calculator</a>."
      },
      {
        "title": "Getting the deposit in, and planning how it comes back out",
        "body": "Most first SPVs are funded by the director lending the deposit to the company. That creates a credit balance on the director's loan account, and repayment of it is a return of your own capital rather than income. The balance is finite: drawing against it monthly can exhaust it within a few years, after which extraction moves to dividends. An overdrawn account unpaid nine months after year end attracts a section 455 charge of 35.75%."
      },
      {
        "title": "Corporation tax, and the rule that catches multi-company portfolios",
        "body": "An SPV pays corporation tax at 19% on profits to £50,000, 25% above £250,000, and an effective 26.5% between. The trap for one-property-per-company plans is that both limits are divided by the number of associated companies plus one, so five SPVs under common control get a £10,000 small profits limit each. Close investment-holding company status removes the small profits rate, but commercial letting to unconnected tenants keeps most SPVs out. Check it on the <a href=\"/calculators/corporation-tax-calculator\">corporation tax calculator</a>."
      },
      {
        "title": "First-year filings start sooner than most new directors expect",
        "body": "Formation starts three clocks: a confirmation statement, first accounts at Companies House, and a corporation tax return once HMRC is told the company is trading. Directors and people with significant control also verify their identity with Companies House, directly or through an authorised corporate service provider, now that regime is mandatory. Dates are in the <a href=\"/blog/incorporation-and-company-structures/spv-first-year-accounts-and-filing-timeline\">SPV first-year filing timeline</a>."
      }
    ],
    "howWeHelp": [
      {
        "title": "A structure review before the company is formed",
        "body": "The review starts with what you are buying, how many properties you expect to hold in three years, who needs to receive income, and whether a spouse or adult child should hold shares. The output is a written note on share classes, director appointments and whether one company or several fits the plan."
      },
      {
        "title": "Formation records a lender and HMRC can follow",
        "body": "Your accountant prepares the formation pack: the SIC code checked against your lender's criteria, the share register, the director's loan agreement, and identity verification for each director and person with significant control. The accounting reference date and HMRC registrations are set so first-year deadlines miss a completion week."
      },
      {
        "title": "The corporation tax and extraction model for 2026/27",
        "body": "A specialist models profit after mortgage interest, which is deductible in a company and not restricted the way it is on personally held residential property, then sets out the tax at your expected profit level including associated companies. Alongside it sits the extraction order: director's loan repayment first, then dividends at 10.75%, 35.75% and 39.35%, then salary and pension contributions."
      },
      {
        "title": "A first-year calendar, and the deal checked against it",
        "body": "The first-year calendar is dated obligation by obligation, with our <a href=\"/services/property-accountant\">accountancy service for property investors</a> ready to file against it, and bookkeeping is set up so rent, mortgage interest and the director's loan are recorded separately, because a lender refinancing in year two will ask for accounts. A specialist also reviews the purchase itself, starting from the <a href=\"/calculators/buy-to-let-cashflow-calculator\">buy-to-let cashflow calculator</a>."
      }
    ],
    "faqs": [
      {
        "question": "Should I buy my first property through an SPV or in my own name?",
        "answer": "It turns on your marginal income tax rate, whether you need the rent to live on, and how long you intend to hold. A company pays corporation tax on profit after full mortgage interest relief, while personally held residential property is restricted to a basic-rate credit on finance costs. Against that, taking money out is a second tax event and company mortgage pricing is usually higher. A higher-rate taxpayer reinvesting the rent often does better in a company; someone drawing the income often does not."
      },
      {
        "question": "Does my company pay the 5% stamp duty surcharge on its first property?",
        "answer": "Yes. The surcharge does not depend on how many properties the buyer already owns when the buyer is a company; it applies from the first transaction, at 5% on top of the standard rates, for transactions on or after 31 October 2024. Above £500,000 a company residential purchase also meets a 17% flat rate under Schedule 4A FA 2003, with relief where the property is acquired exclusively as a source of rents in a qualifying rental business."
      },
      {
        "question": "If I buy each property in a separate company, does each get the 19% rate?",
        "answer": "No, and this is the most common misunderstanding about multi-SPV portfolios. Where companies are associated, meaning broadly under common control, the £50,000 lower limit and the £250,000 upper limit are divided by the number of associated companies plus one. Five SPVs under your control means a £10,000 small profits band each, and dormant companies are excluded. Lender requirements can still justify separate companies, but a lower tax rate rarely does."
      },
      {
        "question": "What does the company have to file in its first year?",
        "answer": "A confirmation statement, a first set of accounts at Companies House, and a corporation tax return and payment for the first accounting period. The first accounts period runs from incorporation to the accounting reference date, which Companies House sets automatically, so it is often longer than twelve months and splits into two corporation tax returns. Directors and people with significant control also complete identity verification."
      },
      {
        "question": "Can a newly formed company with no trading history get a mortgage?",
        "answer": "Usually yes. Buy-to-let lenders that work with SPVs underwrite the property's rental cover and the directors' personal circumstances rather than company accounts, and most expect personal guarantees. What they do check is the SIC code, that the directors and shareholders match the application, and that the source of the deposit is documented."
      }
    ],
    "sources": [
      "docs/property/house_positions.md §1 - residential SDLT bands 2026/27, 5% additional dwellings surcharge from 31 October 2024, Sch 4A FA 2003 flat rate 17% for non-natural persons over £500k, devolved LBTT/LTT note",
      "docs/property/house_positions.md §11 - ECCTA 2023, Companies House identity verification for directors and PSCs, ACSP route",
      "docs/property/house_positions.md §21.1 - director's loan credit balances, repayment order, DLA exhaustion trap, s.455 at 35.75% for loans made on or after 6 April 2026",
      "docs/property/house_positions.md §21.2 - alphabet shares and the settlements legislation (share-class framing only)",
      "docs/property/house_positions.md §21.4 - dividend rates 2026/27 10.75% / 35.75% / 39.35%, employer pension contributions as an extraction route",
      "docs/property/house_positions.md §21.5 and §21.A - CIHC status and the s.18N(3) connected-tenant exclusion",
      "docs/property/house_positions.md §21.A - 19% / 25% / 26.5% three-figure CT framework, £50,000 and £250,000 limits, associated-companies divisor (1 + N), dormant companies excluded",
      "docs/property/house_positions.md §4 - Section 24 finance cost restriction, used as the contrast with corporate interest deductibility",
      "legislation.gov.uk FA 2003 Sch 4A paras 3 and 5, verified 2026-09-27 - flat rate 17%, para 5 relief for a qualifying property rental business",
      "docs/property/coverage_map_2026-09.json - map row, situation 'Investor setting up an SPV to buy a first or next property', target query 'spv accountant', hp_anchors 21 / 21.4 / 21.A"
    ]
  },
  {
    "slug": "gifting-property-to-family",
    "title": "Gifting Property to Family",
    "headline": "Accountants for owners gifting property to family",
    "metaTitle": "Accountants for Gifting Property to Children",
    "metaDescription": "Gifting a property or a share of it to your children? Specialist help with CGT on the gift, the seven-year clock, SDLT on assumed debt and the paperwork.",
    "intro": "You are thinking about giving a property, or a share of one, to your children or another family member. Perhaps it is a rental you no longer want to run, perhaps it is the family home and the point is keeping it out of a future inheritance tax bill. Either way the tax lands before any money moves, because a gift between connected people is treated as a disposal at market value even though nothing is paid. The review turns on the capital gains position on the gift, whether you keep any benefit afterwards, and whether a mortgage travels with it. Two numbers decide it: the cost of gifting now and the cost of doing nothing. The filing dates come with them.",
    "stats": [
      {
        "value": "18% or 24%",
        "label": "CGT rates on a residential gain, 2026/27"
      },
      {
        "value": "£3,000",
        "label": "Capital gains annual exempt amount per person"
      },
      {
        "value": "60 days",
        "label": "To report and pay, where CGT is due on the gift"
      },
      {
        "value": "7 years",
        "label": "Survival period before a lifetime gift leaves your estate"
      }
    ],
    "challenges": [
      {
        "title": "Capital gains tax falls due even though no money changes hands",
        "body": "A transfer to a child or other connected person is a disposal at market value under TCGA 1992 s.17 and s.286. The gain is that value less what you paid and your allowable costs, and residential gains are taxed at 18% and 24% in 2026/27 after an annual exempt amount of £3,000. Only a spouse or civil partner transfer escapes it, and an ordinary buy to let has no holdover, so the tax is payable in cash. The <a href=\"/calculators/capital-gains-tax-calculator\">CGT calculator</a> sizes it."
      },
      {
        "title": "Keeping any benefit undoes the inheritance tax saving",
        "body": "An outright gift to an individual leaves your estate if you survive seven years, with taper reducing the tax on gifts above the nil rate band from year three. But if you carry on living there, or keep a slice of the rent, FA 1986 s.102 makes it a gift with reservation and the property sits back in your estate at its death value. The <a href=\"/blog/landlord-tax-essentials/gift-with-reservation-of-benefit\">reservation of benefit rules</a> are where most family gifts fail."
      },
      {
        "title": "The shared-occupation carve-out is narrower than it looks",
        "body": "There are three ways out. Pay a full open-market rent to the new owners, evidenced and reviewed. Move out entirely. Or use the FA 1986 s.102B(4) carve-out: gift an undivided share, both of you genuinely occupy the property as a home, and you take no benefit from the recipient connected with the gift. Only the third lets you stay rent free, and it fails if the recipient does not live there."
      },
      {
        "title": "Stamp duty appears when a mortgage moves with the property",
        "body": "A gift of an unencumbered property carries no stamp duty, because the charge falls on what is paid. It appears when the recipient takes on the mortgage: FA 2003 Sch 4 para 8 treats the assumed debt as chargeable consideration at residential rates, capped at market value. Where the recipient already owns a home the 5% surcharge can apply. The <a href=\"/blog/capital-gains-tax/gifting-property-and-deed-of-gift-tax-implications\">deed of gift and SDLT position</a> has the detail."
      }
    ],
    "howWeHelp": [
      {
        "title": "The cost of the gift, before you sign anything",
        "body": "One of our property tax specialists reviews your acquisition cost, improvement spend and any period the property was your main home, then sets the gain against a current valuation. You see the figure, the date it is payable, and how it moves if the gift is split across two tax years or two owners. The work is <a href=\"/services/property-tax-advice\">one-off property tax advice</a>, with no need to move your accounts to us."
      },
      {
        "title": "A reservation of benefit review before the deed is drawn",
        "body": "The review covers what actually happens after the gift: who lives there, who collects the rent, who pays the bills, and whether money comes back to you. That is measured against FA 1986 s.102, s.102A and s.102B and the pre-owned assets charge. Where you need to stay, your accountant prepares the rent calculation and its evidence."
      },
      {
        "title": "The stamp duty position on any debt that travels",
        "body": "Where a mortgage or a share of one is taken over, a specialist calculates the chargeable consideration, checks whether the surcharge catches the recipient, and confirms whether a return is notifiable at all. That figure often decides whether the mortgage is redeemed first or moved. The <a href=\"/calculators/stamp-duty-calculator\">stamp duty calculator</a> gives a first pass."
      },
      {
        "title": "Filings, records and the order of a larger handover",
        "body": "The 60-day capital gains return is prepared where tax arises, the disposal is reported again at self assessment, and the gift is recorded with its date and valuation so your executors can evidence the seven-year position. Where a portfolio is passing down, the <a href=\"/blog/incorporation-and-company-structures/gifting-property-to-adult-children-decision-tree-cgt-iht-occupancy-mechanics\">order of the transfers</a> is written down with dates."
      }
    ],
    "faqs": [
      {
        "question": "Do I pay capital gains tax if I give my rental property to my son?",
        "answer": "Yes, in almost every case. A gift to a child is a disposal to a connected person, so the gain is worked out on market value on the day of the gift, not the nil price paid. In 2026/27 residential gains are taxed at 18% for basic rate and 24% for higher rate, after an annual exempt amount of £3,000. An ordinary buy to let has no holdover, so the tax is payable in cash."
      },
      {
        "question": "Can I give my house to my children and carry on living in it?",
        "answer": "You can, but it usually achieves nothing for inheritance tax. Under FA 1986 s.102 a gift where you keep possession or any benefit is a gift with reservation, so the house stays in your estate at its value on the date of death and the seven-year clock never starts. The exits are narrow: pay a full market rent, move out completely, or gift a share where you both genuinely live there."
      },
      {
        "question": "Is there stamp duty on a gifted property?",
        "answer": "Not on the gift itself, because stamp duty is charged on what is paid and a gift has no price. The charge appears where a mortgage moves with the property: FA 2003 Sch 4 para 8 treats the debt the recipient takes on as chargeable consideration, taxed at residential rates and limited to market value. Where the recipient already owns a home the surcharge can apply on top."
      },
      {
        "question": "What happens if I die within seven years of the gift?",
        "answer": "The gift comes back into the inheritance tax calculation against your nil rate band, which is £325,000 per person and frozen until 5 April 2031. Within that band there is no tax on the gift, though it reduces the band left for your estate. Above it, taper reduces the tax due, not the value of the gift: 80% of the full rate at three to four years, then 60%, 40% and 20% by year seven."
      },
      {
        "question": "Does my child pay tax on the property once they own it?",
        "answer": "They pay income tax on their share of the rent from the date of the gift, and they take your market value at that date as the base cost for a future sale. If they live in it as their only or main home, private residence relief may cover most of the later gain. If your child is under 18, the settlements rules attribute the rent back to you until they turn 18."
      },
      {
        "question": "Does gifting into a trust change the position?",
        "answer": "It changes both taxes. A gift into most trusts is a chargeable lifetime transfer rather than a potentially exempt transfer, with a 20% entry charge on value above the nil rate band and ten-year charges after. In exchange, holdover under TCGA 1992 s.260 can defer the gain, provided neither you nor your spouse can benefit. A bare trust sits outside that regime."
      }
    ],
    "sources": [
      "docs/property/house_positions.md §5 (residential CGT 18%/24% 2026/27; AEA £3,000; 60-day return where tax is due; s.58 spouse no-gain-no-loss)",
      "docs/property/house_positions.md §15.1 (NRB £325,000 per person, frozen to 5 April 2031)",
      "docs/property/house_positions.md §15.2 (PETs, CLT 20% entry charge, seven-year clock, taper 80/60/40/20)",
      "docs/property/house_positions.md §15.3 and §22.11 (GROB: FA 1986 s.102, s.102A, s.102B(4) shared-occupation carve-out; full-market-rent and cease-occupation exits; POAT FA 2004 Sch 15). Verified at legislation.gov.uk 2026-05-22/23.",
      "docs/property/house_positions.md §22.12 (TCGA 1992 s.260 holdover, settlor-interested exclusion ss.169B-169G, bare trust outside the relevant property regime; relevant property ten-year charge)",
      "docs/property/house_positions.md §24.7 (connected-person disposal at market value TCGA 1992 s.17 + s.286; no holdover for non-business buy to let; ITTOIA 2005 s.624 attribution to age 18)",
      "docs/property/house_positions.md §24.6 (rental income follows beneficial ownership)",
      "docs/property/house_positions.md §1.P (FA 2003 Sch 4 para 8 assumed debt as chargeable consideration; market-value cap)",
      "docs/property/house_positions.md §1 (5% additional dwellings surcharge from 31 October 2024)",
      "docs/property/coverage_map_2026-09.json (wave 1 row 'Accountants for owners gifting property to family'; hp_anchors 15, 15.3, 22.11)"
    ]
  },
  {
    "slug": "couples-splitting-rental-income",
    "title": "Couples Splitting Rental Income",
    "headline": "Accountants for couples splitting rental income between them",
    "metaTitle": "Form 17 & Declaration of Trust Accountants",
    "metaDescription": "Splitting rental income between spouses or civil partners? Form 17, declarations of trust, joint tenants and the 60-day window, explained for UK landlords.",
    "intro": "You own a rental property together, one of you pays higher-rate tax and the other pays basic rate or has no income, and the rent is taxed half each. Married couples and civil partners have a route to change that; unmarried co-owners are often pointed at Form 17 when it does not apply. A specialist starts with the title, not the tax: joint tenants or tenants in common, and what the deeds and contributions show. The split follows from that. A declaration of trust sets the beneficial shares, Form 17 tells HMRC about them, and the mortgage and stamp duty consequences are checked before signing. Sometimes the answer is that the change is shut to you, or costs more than it saves; that comes back in writing too.",
    "stats": [
      {
        "value": "50/50",
        "label": "50/50 default for spouses and civil partners living together"
      },
      {
        "value": "60 days",
        "label": "Deadline for Form 17 to reach HMRC after the last signature"
      },
      {
        "value": "No gain, no loss",
        "label": "CGT treatment of a transfer between spouses living together"
      },
      {
        "value": "3 tax years",
        "label": "Window for no-gain-no-loss treatment after a couple separates"
      }
    ],
    "challenges": [
      {
        "title": "The 50/50 default applies whatever the deeds say",
        "body": "Where a married couple or civil partners living together jointly own a property, ITA 2007 s.836 taxes the rent as if it arises in equal shares, even if one of you put in the whole deposit. Within that situation the route out is a joint declaration on Form 17, and only where your beneficial interests really are unequal. The <a href=\"/calculators/rental-income-tax-calculator\">rental income tax calculator</a> shows what the current split costs the higher-rate partner."
      },
      {
        "title": "Form 17 declares a split, it does not create one",
        "body": "This is the point that fails most often under enquiry. Form 17 reports beneficial ownership that already exists; it cannot turn a 50/50 property into a 90/10 one. To be taxed unequally you change the ownership first, normally by a written declaration of trust, then file Form 17. A form with nothing underneath it is invalid and 50/50 continues."
      },
      {
        "title": "Joint tenants have nothing to declare",
        "body": "Joint tenants own the whole property together rather than measurable shares, so there is nothing to put on the form. You sever to tenants in common first, in England and Wales by notice under Law of Property Act 1925 s.36(2). Severance also changes what happens on death: a tenant in common's share passes under the will, not to the survivor."
      },
      {
        "title": "The 60-day window is strict",
        "body": "Form 17 must reach HMRC within 60 days of the date the last of you signs. Late forms are invalid and you are back to 50/50. It takes effect from that signature date, not the start of the tax year, so timing decides how much of the year is split. It is not an annual form."
      },
      {
        "title": "Moving a mortgage share can trigger stamp duty",
        "body": "A declaration of trust between spouses attracts no SDLT, LTT or LBTT of itself, because nothing is paid. If the receiving partner takes on a share of the mortgage, that assumed debt is chargeable consideration and duty can fall due, at higher rates where that partner owns another dwelling. It is the most common error on a sound split."
      },
      {
        "title": "Unmarried couples are in a different regime",
        "body": "If you are not married or in a civil partnership, neither the 50/50 default nor Form 17 applies. Your rental income follows your actual beneficial shares, evidenced by the deed, deposit and mortgage. A transfer between you sits outside TCGA 1992 s.58: it is a disposal at market value, so capital gains tax can arise on the move. The <a href=\"/blog/landlord-tax-essentials/unmarried-co-owners-property-tax-rental-income-split-actual-beneficial-share\">guide to unmarried co-owners</a> sets out what HMRC looks for."
      }
    ],
    "howWeHelp": [
      {
        "title": "A review of how the property is actually held",
        "body": "One of our property tax specialists begins at the register and the deeds: joint tenants or tenants in common, whose names are on the title, whose money went in, and whether a trust deed exists. That settles whether an unequal split is open to you, and whether severance comes first."
      },
      {
        "title": "The order of the steps, written down",
        "body": "Severance where it is needed, then the declaration of trust, then Form 17 inside the 60 days, then the change to how each of you reports the rent. An <a href=\"/services/landlord-accountant\">accountant for landlords who co-own</a> sets out that sequence and the dates before anything is executed, because a form signed ahead of the deed is what HMRC challenges."
      },
      {
        "title": "The change modelled both ways",
        "body": "The comparison runs both ways: rental profit and finance costs at the current shares against the proposed shares, at both marginal rates. Finance costs must follow the same shares as the income, so each of you gets a different <a href=\"/calculators/section-24-calculator\">Section 24 calculator</a> figure once the split moves."
      },
      {
        "title": "The duty, gains and evidence check before signing",
        "body": "Any movement of mortgage share is costed for SDLT, LTT or LBTT, and the base cost passing across on a no-gain-no-loss transfer is recorded so a later sale holds no surprise. Your accountant keeps the deed, the contributions and the rent account together, which is what HMRC asks for on enquiry."
      }
    ],
    "faqs": [
      {
        "question": "Can we split the rental income 90/10 because one of us is a higher-rate taxpayer?",
        "answer": "Not on its own. The tax split has to match the beneficial ownership. If you own the property equally you are taxed equally, whatever you agree between yourselves. To be taxed 90/10 you have to own it 90/10, which means a declaration of trust changing the beneficial shares, and where you hold as joint tenants, a severance to tenants in common first. Form 17 is the last step, not the first."
      },
      {
        "question": "What is a declaration of trust, and do we need a solicitor?",
        "answer": "It is a written document in which the legal owners record that they hold the property on trust for themselves in stated unequal shares, say 75 per cent and 25 per cent. Law of Property Act 1925 s.53(1)(b) requires writing, and it should name the property, the owners, the shares and the date of effect. HMRC can ask to see it. Drafting is conveyancing work, so a solicitor prepares the deed while a specialist confirms the shares."
      },
      {
        "question": "We hold the property as joint tenants. What has to change?",
        "answer": "Joint tenancy is undivided ownership: each of you owns the whole thing jointly rather than a defined share, so there is no percentage to enter on Form 17. You sever into a tenancy in common first, in England and Wales by written notice under Law of Property Act 1925 s.36(2). Once you hold defined shares, a declaration of trust can set them unequally and Form 17 can declare them."
      },
      {
        "question": "Will transferring a share to my spouse create a capital gains tax bill?",
        "answer": "Not while you are living together. Such transfers are treated under TCGA 1992 s.58 as producing neither a gain nor a loss. The receiving partner takes over the original base cost rather than the value on the day, so the gain is deferred rather than removed. If you have separated, the same treatment can still apply to transfers under a court order or formal separation agreement, for up to three tax years after the year of separation."
      },
      {
        "question": "Could stamp duty be due on a transfer between us?",
        "answer": "It can. A declaration of trust between spouses is not a purchase, so with no money changing hands there is usually nothing to charge. The exception is the mortgage. If the partner receiving a share also takes on borrowing, that assumed debt counts as chargeable consideration for SDLT, and for LTT and LBTT in Wales and Scotland. Higher rates can apply where that partner owns another dwelling."
      }
    ],
    "sources": [
      "ITA 2007 s.836 (50/50 default for spouses and civil partners): https://www.legislation.gov.uk/ukpga/2007/3/section/836 (house_positions.md 24.1)",
      "HMRC PIM1030, joint property income split: https://www.gov.uk/hmrc-internal-manuals/property-income-manual/pim1030 (house_positions.md 24.1, 24.5, 24.6)",
      "HMRC Form 17, declaration of beneficial interests in joint property and income: https://www.gov.uk/government/publications/income-tax-declaration-of-beneficial-interests-in-joint-property-and-income-17 (house_positions.md 24.2)",
      "HMRC TSEM9851 and TSEM9852: 60-day window, evidence requirement, effective date, joint tenancy bar (house_positions.md 24.2, 24.8)",
      "Law of Property Act 1925 s.36(2) severance and s.53(1)(b) declaration of trust formalities (house_positions.md 24.2, 24.3)",
      "TCGA 1992 s.58, no-gain-no-loss transfers between spouses: https://www.legislation.gov.uk/ukpga/1992/12/section/58; s.58(1A)-(1D) three-tax-year post-separation window inserted by Finance (No. 2) Act 2023 c.30 s.41(2)(6) (house_positions.md 24.3, 24.4)",
      "FA 2003 Sch 4 para 8, assumed mortgage debt as chargeable consideration for SDLT, with LTTA 2017 and LBTT(S)A 2013 equivalents (house_positions.md 24.3)",
      "TCGA 1992 s.17 and s.286, market-value disposal between unmarried co-owners (house_positions.md 24.6)",
      "HMRC PIM1030 income-and-finance-cost correspondence rule for apportioned shares (house_positions.md 24.5)"
    ]
  },
  {
    "slug": "landlord-self-assessment-and-mtd",
    "title": "Landlord Self Assessment and MTD Filing",
    "headline": "Accountants filing landlord self assessment and MTD quarterly updates",
    "metaTitle": "Landlord Self Assessment & MTD Filing Service",
    "metaDescription": "Landlord self assessment and MTD for Income Tax quarterly updates filed for you. Thresholds, deadlines, SA105 and joint ownership explained for UK landlords.",
    "intro": "You let property, you do not want to file the return yourself, and from 6 April 2026 the job got bigger: landlords with qualifying income above £50,000 move from one annual return to four quarterly updates plus a final declaration. This page is for the landlord who wants someone else to hold that calendar. One of our property tax specialists reviews three things first: your gross rents before deductions, which is what the threshold is tested on, not profit; how each property is owned, because joint owners are tested on their own share; and what your records look like today, because MTD needs digital records in compatible software. One person then holds the start date, the filing calendar, the quarterly updates, the year-end statements and the SA105 pages. Check your own position with the <a href=\"/calculators/mtd-checker\">MTD checker</a>.",
    "stats": [
      {
        "value": "£50,000",
        "label": "Qualifying income bringing landlords into MTD from 6 April 2026"
      },
      {
        "value": "£30,000",
        "label": "Threshold from 6 April 2027, then £20,000 from 6 April 2028"
      },
      {
        "value": "5 filings",
        "label": "Four quarterly updates plus the year-end declaration each tax year"
      },
      {
        "value": "£200",
        "label": "Fixed penalty on reaching 4 late-submission points"
      }
    ],
    "challenges": [
      {
        "title": "Are you in MTD, and from which April?",
        "body": "Mandation follows gross qualifying income tested against a past return: from 6 April 2026 it covers landlord and sole-trader income above £50,000, tested on your 2024/25 return. The threshold drops to £30,000 from 6 April 2027 and £20,000 from 6 April 2028. Qualifying income is gross rents plus gross turnover before deductions, added together, so high rents with high costs still bring you in. Limited companies are outside MTD for Income Tax altogether and general partnerships are deferred with no confirmed date. HMRC writes to those who look in scope, but the obligation is yours either way."
      },
      {
        "title": "Four quarterly updates and one final declaration",
        "body": "The quarters run with the tax year: 6 April to 5 July filed by 7 August, 6 July to 5 October by 7 November, 6 October to 5 January by 7 February, and 6 January to 5 April by 7 May. A quarterly update is a cumulative summary of income and expenses by category, not a tax calculation, so no tax falls due on it. The year is closed by the end-of-period statement and the final declaration, both due 31 January after the tax year ends."
      },
      {
        "title": "SA105 and what goes in which box",
        "body": "The SA105 property pages are still where UK rental income lands, and the MTD categories map onto them: gross rents, agent commission and management fees, repairs, insurance, council tax, finance costs and other allowable expenses. Gross rent means what the tenant paid, not what the agent transferred after commission, so commission is an expense rather than a reduction in income. Mortgage interest is not an expense for individual residential landlords; it runs through the basic-rate finance-cost reducer. A profit-based estimate therefore misleads, and the <a href=\"/calculators/rental-income-tax-calculator\">rental income tax calculator</a> is the faster check."
      },
      {
        "title": "Deadlines and penalties, which now bite sooner",
        "body": "Outside MTD the familiar dates hold: 5 October after the tax year to tell HMRC if it is your first return, 31 October for paper, 31 January for the online return and the payment, 31 July for a payment on account. Inside MTD each late submission earns a point, with £200 charged on reaching four points. Late payment is faster too: for 2026/27, 3% of the tax outstanding at day 15, a further 3% at day 30 and 10% a year from day 31, though in your first year under the new penalties you get 30 days from the due date before the day 15 charge applies."
      },
      {
        "title": "Jointly owned property and Form 17",
        "body": "Joint owners test the threshold on their own share of gross rents, not the property's total. A Form 17 election splitting 75/25 pulls the larger share in earlier, so one of you can be filing quarterly while the other still files annually. Nor does the letting agent file for you: the landlord is the filer, managed portfolio or not."
      }
    ],
    "howWeHelp": [
      {
        "title": "A written position on your start date",
        "body": "A specialist reviews your last filed return, your gross rents, any sole-trade turnover and how each property is owned, then sets out which April you are mandated from and on which figure. Where you sit near a threshold, or a Form 17 election changes the split, that is stated plainly."
      },
      {
        "title": "Records and software ready before quarter one",
        "body": "Your accountant sets up the bookkeeping: categories matching the quarterly update lines and the SA105 pages, bank feeds or a spreadsheet with a compliant bridging route, and the digital links between them. Software you already use is checked against HMRC's recognised list, including foreign property fields, rather than replaced for the sake of it."
      },
      {
        "title": "Quarterly updates prepared and filed on time",
        "body": "Each quarter our <a href=\"/services/landlord-accountant\">landlord accountancy service</a> categorises the figures, reconciles agent statements to gross rents, and submits the update by the 7th of the month after the quarter end. You approve rather than assemble. Calendar quarter-ends can be elected instead at the start of the year, from 6 April 2026."
      },
      {
        "title": "Year-end statement, final declaration and SA105",
        "body": "At year end the end-of-period statement and final declaration carry the adjustments that never appear in a quarterly update: the finance-cost reducer, capital allowances where available, the property allowance where it applies, other income and any claims. The SA105 pages come from the same records, so quarterly and annual figures agree."
      }
    ],
    "faqs": [
      {
        "question": "Do I still file a self assessment return once I am in MTD?",
        "answer": "In a changed form, yes. The annual return is replaced by the end-of-period statement and the final declaration, both due 31 January after the tax year ends. The quarterly updates sit in front of them and carry no tax calculation, so you file every quarter instead of once a year, with January still the point at which the bill is settled."
      },
      {
        "question": "My rental profit is small. Am I really in MTD?",
        "answer": "Probably, if your rents are large. The threshold is tested on gross income before deductions, not on profit. A landlord receiving £52,000 in rent with £40,000 of allowable costs has £12,000 of profit and is still mandated from 6 April 2026, and sole-trade turnover is added to the same test. Gross-high, net-low is the most common reason a landlord is surprised to be in scope."
      },
      {
        "question": "We own the properties jointly. Do we both have to join?",
        "answer": "You are each tested on your own share of gross rents, not the property's total. On a default 50/50 split, £100,000 of joint gross rents means £50,000 each, so both sit on the April 2026 boundary. Each of you files your own quarterly updates and there is no joint submission. The mechanics for each spouse are worked through in the <a href=\"/blog/making-tax-digital-mtd/mtd-itsa-joint-property-owners-quarterly-filing-mechanics-each-spouse\">joint-owner filing guide</a>."
      },
      {
        "question": "Can I keep my spreadsheet?",
        "answer": "Yes, provided bridging software from HMRC's recognised list submits from it and the figures move by a digital link rather than by hand. A digital link is a cell reference, formula, linked table or API extract. Copy-paste and manual re-keying are not acceptable. The spreadsheet also has to categorise entries the way the quarterly update and the SA105 pages do, so the columns usually need reworking first."
      },
      {
        "question": "What happens if a quarterly update is late?",
        "answer": "Each missed submission earns one point. On reaching four points a £200 penalty is charged, and a further £200 applies for every later miss while you stay at the threshold. Points clear only after twelve months of compliance and once every submission due in the preceding 24 months has been made."
      }
    ],
    "sources": [
      "docs/property/house_positions.md §3 (mandate dates, £50,000 / £30,000 / £20,000 thresholds, joint-owner share test, limited companies and partnerships out of scope, points regime, £200 at 4 points)",
      "docs/property/house_positions.md §19.1 (threshold tested against 2024/25, 2025/26 and 2026/27 returns; HMRC letters)",
      "docs/property/house_positions.md §19.2 (qualifying income gross before deductions; £52,000 rent / £40,000 costs worked example; excluded income types)",
      "docs/property/house_positions.md §19.3 (limited companies, general partnerships, LLPs, trustees)",
      "docs/property/house_positions.md §19.4 (joint owners, £100,000 at 50/50, Form 17 75/25)",
      "docs/property/house_positions.md §19.5 (three consecutive years to exit; voluntary opt-in bound by the cycle)",
      "docs/property/house_positions.md §19.6 (HMRC recognised software list, bridging, quarterly deadlines 7 August / 7 November / 7 February / 7 May, EoPS and final declaration 31 January, calendar-quarter election)",
      "docs/property/house_positions.md §19.7 (£200 on reaching 4 points and each further miss, 12-month plus 24-month reset test, 3%/3%/10% at days 15/30/31 bounded to 2026-27, first-year 30-day concession)",
      "docs/property/house_positions.md §19.10 (Agent Services Account is the mandatory MTD agent route, not the 64-8)",
      "docs/property/house_positions.md §19.11 (foreign property income in MTD; SA106 software support)",
      "docs/property/house_positions.md §19.13 (letting agent managed portfolios: the landlord is the filer; gross collected, not net paid)",
      "docs/property/house_positions.md §19.14 (digital link definition; SA105 spreadsheet column categories)",
      "docs/property/house_positions.md §4 (finance costs not deducted from rental profit; 20% basic-rate reducer)",
      "docs/property/house_positions.md §41 (ITTOIA 2005 Part 6A property allowance; unavailable in a year the s.24 reducer applies)",
      "gov.uk 'Self Assessment tax returns: Deadlines', fetched 2026-09-27 (register by 5 October, paper 31 October, online return and payment 31 January, payment on account 31 July)"
    ]
  },
  {
    "slug": "first-time-and-accidental-landlords",
    "title": "First-Time and Accidental Landlords",
    "headline": "Accountants for first-time and accidental landlords",
    "metaTitle": "Accountant for First Time Landlords | Former Home",
    "metaDescription": "Letting a former home? Specialist help for first-time and accidental landlords: telling HMRC, expenses, Section 24, MTD records and relief when you sell.",
    "intro": "You did not plan to be a landlord. You moved in with a partner, relocated for work, inherited a house, or could not sell, and now your old home is let. HMRC treats you as a landlord from the first day of the tenancy, with a return, records and a deadline attached. A specialist looks at four things first: when the letting began and whether HMRC has been told in time, whether your rent sits above or below the £1,000 property allowance, how the mortgage interest runs through Section 24, and how long the property was your own home, because that decides the relief when you sell. That sequence is set out below in the order the dates fall, ending with a call with one of our accountants.",
    "stats": [
      {
        "value": "5 October",
        "label": "Deadline to tell HMRC after your first tax year of letting"
      },
      {
        "value": "£1,000",
        "label": "Property allowance, per person, per tax year"
      },
      {
        "value": "20%",
        "label": "Section 24 finance cost credit for 2026/27"
      },
      {
        "value": "£50,000",
        "label": "MTD for Income Tax threshold from 6 April 2026"
      }
    ],
    "challenges": [
      {
        "title": "Telling HMRC and registering in time",
        "body": "Rental income does not reach HMRC through your payroll, so the duty to notify is yours. The deadline is 5 October after the end of the tax year the letting started in, and the return and payment follow by the next 31 January. Miss it and Schedule 41 Finance Act 2008 failure-to-notify penalties run as a percentage of the tax, though an unprompted disclosure of a non-deliberate failure within twelve months can reach nil. Background sits in <a href=\"/blog/landlord-tax-essentials/accidental-landlord-taxes-a-complete-guide\">the accidental landlord guide</a> and <a href=\"/blog/landlord-tax-essentials/first-time-landlord-tax-guide-everything-you-need-to-know\">the first-time landlord guide</a>."
      },
      {
        "title": "The property allowance against real expenses",
        "body": "Where your share of gross rent is £1,000 or less, the property allowance covers it and there is normally nothing to report. Above that you choose each year: the flat £1,000 instead of your costs, or the real expenses. It is per person, so joint owners have one each. The trap is that the allowance and the Section 24 credit cannot both be used in the same tax year, so a mortgaged former home usually claims real expenses. The <a href=\"/calculators/rental-income-tax-calculator\">rental income tax calculator</a> compares the two."
      },
      {
        "title": "Section 24 and the 20% credit on a first return",
        "body": "Mortgage interest is not deducted from rental profit. You get a basic rate tax credit instead, 20% for 2026/27, capped at the lowest of 20% of the finance costs, 20% of the rental profit before finance costs, and 20% of your income above the personal allowance. What the cap blocks carries forward. For an employed landlord it can lift total income into higher rate territory. The <a href=\"/calculators/section-24-calculator\">Section 24 calculator</a> puts a number on it."
      },
      {
        "title": "Consent to let and the mortgage",
        "body": "A residential mortgage usually needs the lender's consent to let before the tenancy starts, and the lender may add a rate premium or move you to buy-to-let terms. That is a lending question, not a tax one: it changes neither the property business nor the notification deadline. It does change your figures, because the new interest runs through Section 24."
      },
      {
        "title": "Records that will satisfy Making Tax Digital",
        "body": "Making Tax Digital for Income Tax is mandatory from 6 April 2026 above £50,000 of qualifying income, from 6 April 2027 above £30,000, and from 6 April 2028 above £20,000. Qualifying income is gross rent plus any gross self-employment turnover, before deductions, so a small profit does not keep you out, and joint owners test their own share. The <a href=\"/calculators/mtd-checker\">MTD checker</a> tests your figures."
      },
      {
        "title": "Selling later, and relief for the years it was home",
        "body": "The gain is split across your whole period of ownership. Years it was genuinely your main residence are covered by private residence relief, and the final nine months always qualify where it was your main home at some point. Letting relief applies only where you shared occupation with the tenant. Residential rates for 2026/27 are 18% and 24% after the £3,000 annual exempt amount, and where tax is due you report and pay within 60 days."
      }
    ],
    "howWeHelp": [
      {
        "title": "The first return, from the start date",
        "body": "The starting point is when the letting began, whether notification is already late, and which tax year the first return belongs in. One of our <a href=\"/services/landlord-accountant\">accountants for landlords</a> prepares the registration, the property pages and the computation, and sets out what is payable and when."
      },
      {
        "title": "Allowance against expenses, on your figures",
        "body": "The rent, finance costs, repairs, agent fees, insurance and the pre-letting spending that is often missed all go into one schedule, and the £1,000 allowance is then compared against real expenses on your own figures for the year."
      },
      {
        "title": "A record system that carries into MTD",
        "body": "Your gross figures decide whether you fall into the April 2026, 2027 or 2028 cohort, and a jointly owned property is tested on your share rather than the whole. From there the digital records and the quarterly filing pattern are set up in recognised software before the first quarter runs."
      },
      {
        "title": "The four facts that settle the first return",
        "body": "The letting start date, your share of the gross rent, the mortgage interest and the years the property was your own home are the four facts that drive everything else on this page. Have those to hand and the first return, the allowance choice and the Making Tax Digital start date can be settled in one pass."
      }
    ],
    "faqs": [
      {
        "question": "Do I have to tell HMRC if I only let my old home for part of the year?",
        "answer": "Yes, if your share of the rent is more than £1,000 for the tax year. A part-year letting still creates a property business for the months it ran. You have until 5 October after the end of that tax year to notify HMRC, and the return follows by 31 January. At or below £1,000, the property allowance normally covers it."
      },
      {
        "question": "Is the property allowance worth taking?",
        "answer": "It depends on your costs. If real expenses come to less than £1,000 and there is no mortgage, the flat allowance is simpler and usually better. With a mortgage it is usually worse, because the allowance and the Section 24 credit cannot both be used in the same tax year. It is per person, so joint owners have £1,000 each."
      },
      {
        "question": "Will letting my old home cost me capital gains tax relief?",
        "answer": "It reduces relief over time rather than removing it. The gain is apportioned across your ownership, the years it was your main residence stay covered by private residence relief, and the final nine months always qualify where it was your main home at some point. Only the letting years outside that are exposed, taxed at 18% or 24% in 2026/27 after the £3,000 annual exempt amount."
      },
      {
        "question": "When does Making Tax Digital apply to me as a new landlord?",
        "answer": "From 6 April 2026 where qualifying income is above £50,000, from 6 April 2027 above £30,000, and from 6 April 2028 above £20,000. Qualifying income is gross rent plus any gross self-employment turnover, before deductions, so a landlord with £52,000 of rent and £40,000 of costs is in scope. Joint owners test their own share rather than the property total."
      },
      {
        "question": "What if I have been letting for years and never told HMRC?",
        "answer": "It is fixable, and disclosing before HMRC contacts you matters. Failure to notify is penalised as a percentage of the tax under Schedule 41 Finance Act 2008, but an unprompted disclosure of a non-deliberate failure within twelve months can reach a nil penalty. The Let Property Campaign is the standard disclosure route for residential landlords with undisclosed rent."
      }
    ],
    "sources": [
      "house_positions.md 3 and 19.1: MTD for ITSA thresholds 6 Apr 2026 above 50,000, 6 Apr 2027 above 30,000, 6 Apr 2028 above 20,000; 19.2 qualifying income is gross and aggregated; 19.4 joint owners test their share; 19.6 quarterly updates and final declaration 31 January",
      "house_positions.md 4: Section 24 finance costs given as a 20% basic rate credit for 2026/27, three-part cap, unused amount carries forward",
      "house_positions.md 5: residential CGT 18% and 24%, annual exempt amount 3,000, private residence relief final 9 months, letting relief only on shared occupation, 60-day UK property reporting where tax is due",
      "house_positions.md 41: property income allowance 1,000 per person per tax year (ITTOIA 2005 Part 6A s.783BD), full relief at or below 1,000, and PIM4460 that the allowance and the Section 24 reducer are mutually exclusive in a tax year",
      "house_positions.md 27.3 and the Let Property Campaign position: Schedule 41 Finance Act 2008 failure to notify, TMA 1970 s.7 six-month notification obligation, unprompted non-deliberate disclosure floor of 0% within 12 months",
      "https://www.gov.uk/register-for-self-assessment fetched 2026-09-27: 'You must tell HM Revenue and Customs (HMRC) by 5 October 2026 if you need to complete a tax return for the previous tax year'",
      "Property/web/src/config/site.ts:39 partner network consent wording, quoted verbatim in howWeHelp",
      "docs/property/coverage_map_2026-09.json row 'Accountants for first-time and accidental landlords', target query 'accountant for first time landlord', hp_anchors 4, 5, 19"
    ]
  },
  {
    "slug": "inherited-property",
    "title": "Executors and Beneficiaries",
    "headline": "Accountants for executors and beneficiaries of an inherited property",
    "metaTitle": "Probate Property Tax | Executors & Beneficiaries",
    "metaDescription": "Inherited a house or a rental property? Specialist help with probate base cost, CGT on a sale, rental income and deeds of variation.",
    "intro": "You have inherited a property, or you are the executor holding one, and you need to decide whether to keep it, let it or sell it. A specialist starts with the probate value, because that figure becomes the capital gains base cost for whoever eventually sells and it is the number the inheritance tax position was built on. Next comes who sells and when: the estate, before the property is passed on, or the beneficiaries after. If it is let, the review covers whose rental income it is in each period and who registers for self assessment. That leaves a written position on the fork in front of you, and the figures your accountant prepares the returns from. The deadlines in it are law's, not yours.",
    "stats": [
      {
        "value": "24%",
        "label": "CGT rate for personal representatives on residential gains, 2026/27"
      },
      {
        "value": "£3,000",
        "label": "Estate exempt amount for death year plus two more"
      },
      {
        "value": "60 days",
        "label": "To report and pay CGT on a UK residential disposal where tax is due"
      },
      {
        "value": "2 years",
        "label": "Window from the date of death to redirect an inheritance by deed of variation"
      }
    ],
    "challenges": [
      {
        "title": "The probate value becomes the base cost",
        "body": "Death is not a disposal. The personal representatives are treated as acquiring the property at its market value at the date of death, and a beneficiary who later receives it takes that same figure as their base cost. Only growth after the death can be taxed. That makes the probate valuation a tax number, not a formality: a low figure holds inheritance tax down and hands the family a larger capital gain later. A defensible open market value, evidenced at the date of death, is what a specialist reviews first; the <a href=\"/blog/capital-gains-tax/cgt-on-inherited-property-uk-probate-base-cost\">guide to the probate base cost</a> sets out the mechanics."
      },
      {
        "title": "Selling from the estate or selling after distribution",
        "body": "If the personal representatives sell, the estate pays at the rate set for personal representatives and uses the estate's annual exempt amount, which runs for the year of death and the two following tax years only. If the property is passed to the beneficiaries first, each has their own annual exempt amount and a basic rate taxpayer may fall in the lower band. With several beneficiaries the second route often produces the smaller bill, but it has to be settled before the property is marketed."
      },
      {
        "title": "Letting it, and registering for self assessment",
        "body": "Rent arising before the property is passed on is the estate's income; rent arising afterwards belongs to the beneficiaries in their shares, and each reports their own. A beneficiary receiving rent for the first time usually has to register for self assessment, the deadline running from the tax year the income first arises. Mortgage interest on a let residential property is a basic rate reducer, not a deduction from profit, so the tax on inherited rent is often higher than a first calculation suggests."
      },
      {
        "title": "Joint executors, joint beneficiaries and deeds of variation",
        "body": "With more than one personal representative, a sale of the land or a contract for one needs all of them to concur, unless probate was granted to only some of the named executors. Disagreement is what most often collapses a probate sale late on. Separately, a beneficiary can redirect what they inherit within two years of the death, and with the right elections it reads back to the deceased for both inheritance tax and capital gains. It must be for no consideration, or it is only a gift with a seven year clock of its own."
      }
    ],
    "howWeHelp": [
      {
        "title": "The probate valuation reviewed as a tax figure",
        "body": "A <a href=\"/services/property-tax-advice\">property tax adviser</a> from our team re-reads the date of death valuation, the evidence behind it, and how it sits against the inheritance tax the estate reported. Where the property has since sold for less, they check whether substituting the sale price is worth the base cost it costs you."
      },
      {
        "title": "Keep, let or sell, compared in figures",
        "body": "The estate selling, the beneficiaries selling and keeping the property let are modelled side by side on your numbers, including the annual exempt amounts open to each party and the band each beneficiary sits in. Sanity check the disposal side with the <a href=\"/calculators/capital-gains-tax-calculator\">capital gains tax calculator</a> first."
      },
      {
        "title": "Returns and deadlines prepared and filed",
        "body": "Where a UK residential disposal creates tax, your accountant prepares the 60 day return and the payment, then the self assessment entries that follow. If the property is let, they handle registration and the property pages for each beneficiary."
      },
      {
        "title": "Deeds of variation checked before signing",
        "body": "Where the family wants to redirect a share, a specialist checks the proposed variation against the two year window, the no consideration rule and the wording of the elections, and confirms what it does to the estate and to the beneficiary giving the share up. The <a href=\"/calculators/rental-income-tax-calculator\">rental income tax calculator</a> covers the other fork, keeping it let."
      }
    ],
    "faqs": [
      {
        "question": "How long do I have to report the tax after a probate property is sold?",
        "answer": "Where a UK residential property is sold and capital gains tax is due, the return and the payment are both due within 60 days of completion. That applies to personal representatives and to beneficiaries selling in their own names. If the gain is fully covered by losses, private residence relief or the annual exempt amount, a UK resident needs no 60 day return. Where one is due, the gain still appears on the self assessment return for the year, so the two filings are not alternatives."
      },
      {
        "question": "What happens to inheritance tax if the house sells for less than the probate value?",
        "answer": "Where the personal representatives sell land within three years of the death for less than the probate figure, they can claim to substitute the sale price for the value used at death and cut the estate's inheritance tax. It is only worth making if the estate bore inheritance tax, and it has a cost: once a value has been ascertained for inheritance tax it becomes the capital gains base cost, so the claim removes the capital loss on the sale."
      },
      {
        "question": "Do I have to tell HMRC about rent from an inherited property?",
        "answer": "Yes, once the income is yours. Rent arising while the estate still holds the property is the estate's; rent arising after your share has been passed to you is yours, in your share of the ownership. Most beneficiaries in that position register for self assessment and file property pages each year. The <a href=\"/blog/capital-gains-tax/inheriting-uk-rental-property-executors-step-by-step\">executor's step by step guide to an inherited rental</a> sets out the order these steps run in."
      },
      {
        "question": "Can we change who inherits the property after the death?",
        "answer": "Within two years of the death a beneficiary can redirect their inheritance by deed of variation, and with the right elections in the document it reads back to the deceased for inheritance tax and capital gains. It cannot be done for consideration, and everyone giving something up has to agree. Families use it to pass a property to the next generation or to route part of an estate to charity. See <a href=\"/blog/landlord-tax-essentials/deed-of-variation-property-estate-redirecting-inheritance-iht-saving\">deeds of variation for landlord estates</a>."
      },
      {
        "question": "Can the executors sell before probate is granted?",
        "answer": "The property devolves on the personal representatives, not on the beneficiaries, and gov.uk is explicit that you should not put a property on the market until probate has been granted. With more than one personal representative, a sale of the land, or a contract for one, needs all of them to concur unless probate was granted to only some of the named executors. Inheritance tax normally has to start being paid before the grant issues, which is why property rich estates stall here."
      }
    ],
    "sources": [
      "TCGA 1992 s.62(1) and s.62(4): death is not a disposal; PRs acquire at market value at death; a legatee takes the PRs' acquisition. house_positions.md §39.",
      "PR annual exempt amount for the year of death and the two following tax years, then nil. house_positions.md §39; statutory basis TCGA 1992 s.1K(7) per §39.A.",
      "CGT annual exempt amount £3,000 for 2026/27 and the 24% trustee/PR rate from 6 April 2026: https://www.gov.uk/capital-gains-tax/rates, verified 2026-09-27. Matches house_positions.md §39 and §39.A.",
      "Residential CGT rates 18% and 24%; 60-day UK property return and payment where tax is due; no 60-day return for a UK resident where the gain is covered by PRR, losses or the AEA; PRR under TCGA 1992 ss.222-226. house_positions.md §5.",
      "IHTA 1984 s.191 (sale of land below probate value within three years of death) and TCGA 1992 s.274 (ascertained value as CGT base cost, which kills the expected CGT loss). house_positions.md §39.",
      "AEA 1925 s.1(1), s.1(3) and s.2(2): real estate devolves on the PRs; a conveyance or a contract for one needs all PRs to concur unless probate was granted to only some named executors. No statutory pre-grant sale bar; gov.uk 'Applying for probate' on not marketing before the grant and paying IHT before probate. house_positions.md §39.A.",
      "Deed of variation, IHTA 1984 s.142 with TCGA 1992 s.62(6): two years from death, no consideration, election required in the document. house_positions.md §22.2.",
      "Section 24 finance cost restriction operating as a basic rate reducer on residential letting. house_positions.md §4.",
      "Map rows matched on situation 'Beneficiary or executor with an inherited property' in docs/property/coverage_map_2026-09.json; hp_anchors 39, 39.A, 15."
    ]
  },
  {
    "slug": "property-company-profit-extraction",
    "title": "Property Company Directors Taking Money Out",
    "headline": "Accountants for property company directors taking money out",
    "metaTitle": "Property Company Profit Extraction Accountant",
    "metaDescription": "Taking money out of your property company? Get the salary, dividend, loan and pension order reviewed and the paperwork prepared by a property tax specialist.",
    "intro": "You own a property company, profit has built up inside it, and you want it out without paying more tax than you need to. The order you draw in matters more than the total: a director's loan balance comes back to you with no personal tax, dividends are taxed at the 2026/27 rates on top of corporation tax already paid, and salary carries employer National Insurance the company must fund. A specialist looks first at what your director's loan account really stands at, whether the company keeps the small profits rate, and how much profit you actually need to draw. You finish with an extraction order for the tax year and the paperwork prepared to match.",
    "stats": [
      {
        "value": "10.75% / 35.75% / 39.35%",
        "label": "Dividend rates from 6 April 2026"
      },
      {
        "value": "£500",
        "label": "Dividend allowance, 2026/27"
      },
      {
        "value": "35.75%",
        "label": "Section 455 charge on a loan made on or after 6 April 2026"
      },
      {
        "value": "9 months",
        "label": "After year end before an overdrawn loan is charged"
      }
    ],
    "challenges": [
      {
        "title": "Dividends against salary at the 2026/27 rates",
        "body": "From 6 April 2026 the dividend rates are 10.75% basic, 35.75% higher and 39.35% additional, after an allowance of only £500. Basic and higher each rose by two percentage points from the 8.75% and 33.75% of 2025/26, so a mix settled two years ago is no longer the same answer. Salary is deductible against corporation tax, but the company pays employer National Insurance at 15% above the £5,000 secondary threshold, and a sole-director company cannot claim the Employment Allowance. The <a href=\"/calculators/property-company-extraction-calculator\">extraction calculator</a> compares the routes."
      },
      {
        "title": "The director's loan balance you can repay without tax",
        "body": "If you transferred properties into the company, it almost certainly owes you money, and repaying that credit balance costs no personal tax. It is usually the first route. The trap is exhaustion: drawing monthly against a balance created at incorporation can run a large credit down within four or five years, and the year it empties is the year you move to higher-rate dividends."
      },
      {
        "title": "When the loan runs the other way",
        "body": "Take out more than the company owes you and the account goes overdrawn, making you a participator with a loan from a close company. Where it is still outstanding nine months and one day after the year end, the company pays a section 455 charge under CTA 2010: 35.75% for loans made on or after 6 April 2026, 33.75% for earlier loans, because the rate follows the dividend upper rate at ITA 2007 s.8(2). It is refunded once you repay, but slowly."
      },
      {
        "title": "What the company pays before you take anything",
        "body": "Profit is taxed inside the company first: 19% up to £50,000, 25% above £250,000, and marginal relief in between at an effective 26.5%, with the thresholds divided between associated companies. A close investment-holding company loses the small profits rate and pays 25% throughout. Most buy-to-let companies are not caught, because letting land commercially to unconnected tenants is a permitted purpose under CTA 2010 s.18N, but letting to a connected person, or to their spouse or a relative, falls outside it. <a href=\"/calculators/corporation-tax-calculator\">Check the company figure</a> first."
      }
    ],
    "howWeHelp": [
      {
        "title": "A review of the extraction order for this tax year",
        "body": "A specialist reviews the company's profit, your other personal income, the director's loan account, the share classes and whether an employer pension contribution is available, then sets out the order to draw in and what each step costs. The output is a sequence with figures attached rather than one number, because the right mix depends on your income outside the company."
      },
      {
        "title": "The director's loan account rebuilt from the records",
        "body": "Where the loan account has drifted, a <a href=\"/services/property-accountant\">property company accountant</a> reconstructs it from the incorporation paperwork, the bank statements and the expenses you paid personally, and tells you what the balance really is. That figure decides how much can come out with no personal tax, whether a section 455 exposure is building, and the year the credit balance runs out."
      },
      {
        "title": "Payroll, dividend paperwork and the filings that follow",
        "body": "Your accountant prepares the payroll for any salary drawn, the board minutes and dividend vouchers for each distribution, the section 455 entries on the corporation tax return, and the dividend pages of your self assessment. Accounts and personal return come from the same figures. The <a href=\"/blog/incorporation-and-company-structures/extracting-cash-from-property-spv-extraction-sequence-pillar-2026-27\">sequencing guide</a> shows how this runs across several years."
      },
      {
        "title": "What the enquiry needs from you",
        "body": "Describe the company and what you want to take out, and the three figures that matter come first: the director's loan credit balance, the profit already taxed at 19% to 25%, and your income outside the company. Those set whether the next pound leaves as a loan repayment, a dividend or an employer pension contribution."
      }
    ],
    "faqs": [
      {
        "question": "Is it better to take salary or dividends from a property company in 2026/27?",
        "answer": "Neither on its own, because they are taxed in different places. Salary reduces the company's corporation tax but costs employer National Insurance at 15% above the £5,000 secondary threshold, which a sole-director company cannot cover with the Employment Allowance. Dividends come out of profit already taxed at 19% to 25%, then are taxed on you at 10.75%, 35.75% or 39.35% above the £500 allowance. The crossover depends on your other income."
      },
      {
        "question": "Can I take money out of my property company tax free?",
        "answer": "Only where the company owes it to you. If you funded the company or transferred properties into it, the director's loan credit balance is a debt the company repays, and a repayment is not income, so no personal tax arises. Reimbursed business expenses work the same way. Everything else is salary, a dividend, a pension contribution or a loan, and each carries a tax consequence."
      },
      {
        "question": "What happens if my director's loan account goes overdrawn?",
        "answer": "The company owes a section 455 charge on any balance still outstanding nine months and one day after its year end. For loans made on or after 6 April 2026 the rate is 35.75%, matching the dividend upper rate; earlier loans carry 33.75%. The charge is refunded after you repay, but the refund follows the company's tax cycle. Repaying shortly before the deadline and redrawing after it is caught by anti-avoidance rules."
      },
      {
        "question": "Can the company pay into my pension instead of paying me a dividend?",
        "answer": "It can, and for many property company owners it is the cheapest route out. An employer contribution is deductible against corporation tax where it meets the wholly and exclusively test, carries no National Insurance, and is not taxed on you when paid. The annual allowance is £60,000, and unused allowance from earlier years can sometimes be carried forward. The money is locked until pension age."
      },
      {
        "question": "Should I put my spouse on the shares to use their dividend allowance?",
        "answer": "An outright gift of ordinary shares to a spouse is effective for dividend purposes because of the spouse exception in the settlements legislation, and it is a common property company structure. It has to be a real gift of real shares with full rights, not a paper arrangement leaving you with the income. Shares held for a child under eighteen are different: that income is treated as yours."
      },
      {
        "question": "How much dividend tax will I pay on what I draw this year?",
        "answer": "It depends on your total income, because dividends sit on top of it. After the £500 allowance, dividends in the basic rate band are taxed at 10.75%, in the higher rate band at 35.75%, and above the additional rate threshold at 39.35%. That sits on top of corporation tax the company has already paid. The <a href=\"/calculators/dividend-tax-calculator\">dividend tax calculator</a> gives the personal figure."
      }
    ],
    "sources": [
      "docs/property/house_positions.md section 21.1 (directors' loan accounts): credit balances from s.162 incorporation repayable with no personal tax, repayment order loan then dividends then salary then pension, s.455 CTA 2010 charge at the dividend upper rate (33.75% for loans made before 6 April 2026, 35.75% on or after), charge on amounts unpaid 9 months after year end and refundable on repayment, DLA exhaustion trap",
      "docs/property/house_positions.md section 21.2 (share classes and the settlements legislation): ITTOIA 2005 s.624 with the s.626 spouse exception per Jones v Garnett [2007] UKHL 35, minor-child shares settlor-attributed",
      "docs/property/house_positions.md section 21.4 (salary vs dividends in a property SPV 2026/27): CT 19% to 50,000, 25% above 250,000, marginal relief effective 26.5%, CTA 2010 Part 3A ss.18A-18N and the associated-company divisor; employer NI 15% above the 5,000 secondary threshold with the sole-director Employment Allowance exclusion; dividend allowance 500; employer pension contributions deductible against CT with a 60,000 annual allowance; s.455 at 35.75% for 2026/27",
      "docs/property/house_positions.md section 21.9 (dividend rates 2026/27 numeric lock, manager source-verified 2026-07-08): ITA 2007 s.8 as in force from 6 April 2026, ordinary 10.75%, upper 35.75%, additional 39.35%, FA 2026 s.4 amended only the ordinary and upper rates; CTA 2010 s.18N CIHC carve-out for commercial letting to unconnected persons, connectedness condition stated",
      "docs/property/coverage_map_2026-09.json: row working_title 'Accountants for property company directors taking money out', situation 'Owner extracting profit from an existing property company', target_query 'property company accountant profit extraction', wave 1, hp_anchors 21.1 / 21.4 / 21.9; the four sibling COVERED rows for the same situation (extraction-sequence pillar, property-company-dividend-tax, the BTL director's loan repayment post, how-to-close-a-property-limited-company) are pointed at rather than repeated",
      "CTA 2010 ss.464C-464D (repayment, bed-and-breakfasting and arrangements rules): source for the FAQ statement that repaying shortly before the section 455 deadline and redrawing after it is caught by anti-avoidance rules; primary law, house positions is silent",
      "Property/web/src/lib/calculators/registry.ts: property-company-extraction-calculator, dividend-tax-calculator and corporation-tax-calculator are all live generic tools, so all three linked calculator slugs exist",
      "Property/web/src/config/site.ts line 39: partner network consent wording, quoted verbatim in howWeHelp"
    ]
  },
  {
    "slug": "rental-income-disclosure",
    "title": "Landlords Making an HMRC Rental Income Disclosure",
    "headline": "Accountants for landlords making an HMRC rental income disclosure",
    "metaTitle": "Let Property Campaign Accountant for Landlords",
    "metaDescription": "Undeclared rental income? Specialist help with Let Property Campaign and Digital Disclosure Service disclosures: years, penalty bands, interest and payment.",
    "intro": "You have rental income that was never declared, and either an HMRC letter has arrived or you have decided to come forward before one does. That distinction is the first thing a specialist reviews, because it sets your penalty floor: an unprompted disclosure of a non-deliberate failure to notify can reach 0%, while the same facts disclosed after HMRC makes contact start at 10% under Schedule 41 FA 2008. Next comes the route: residential rental income goes through the Let Property Campaign, commercial or mixed-use property through the Digital Disclosure Service. Then behaviour, which fixes how many years you reconstruct. Your accountant prepares the notification, the year-by-year computation of tax, interest and penalty, and the disclosure inside the 90-day window. Nothing is signed until the route is settled, the number is checkable and the payment position is known.",
    "stats": [
      {
        "value": "4, 6 or 20 years",
        "label": "How far HMRC can assess: ordinary, careless, deliberate"
      },
      {
        "value": "0% to 10%",
        "label": "Failure-to-notify penalty floor, unprompted against prompted"
      },
      {
        "value": "90 days",
        "label": "To disclose and pay once HMRC acknowledges your notification"
      },
      {
        "value": "Since Sept 2013",
        "label": "The Let Property Campaign has run with no announced end date"
      }
    ],
    "challenges": [
      {
        "title": "Which route fits, and why it is not a free choice",
        "body": "Residential landlords, UK resident and non-UK resident, with undisclosed rental income can use the Let Property Campaign. It does not cover companies, trusts or commercial property. Commercial and mixed-use letting goes through the Digital Disclosure Service instead, on the same notify, disclose and pay pattern. Where offshore income or assets are involved, the Worldwide Disclosure Facility and the Failure to Correct rules apply and the penalties change sharply. The <a href=\"/blog/landlord-tax-essentials/let-property-campaign-disclosure-mechanics-undeclared-rental-income-2026\">disclosure mechanics guide</a> walks through each step."
      },
      {
        "title": "How many years you have to go back",
        "body": "There is no single answer, and six years is the most common wrong one. Under TMA 1970 the ordinary window is 4 years, with no behaviour element. Careless behaviour extends it to 6 years under section 36(1) and deliberate behaviour to 20 years under section 36(1A). Offshore matters carry a separate 12-year window under section 36A, even where nobody was careless. <a href=\"/blog/landlord-tax-essentials/discovery-assessment-time-limits-landlord-tax-enquiries-tma-1970-s29\">How discovery assessments work</a> sets out the tests."
      },
      {
        "title": "Prompted against unprompted, and what it is worth",
        "body": "Where you never told HMRC you were chargeable, Schedule 41 FA 2008 applies: maximum penalties of 30% for non-deliberate behaviour, 70% for deliberate and 100% for deliberate and concealed. Disclosure mitigates within those bands: unprompted floors of 0% for a non-deliberate failure disclosed within 12 months of the liability arising, then 20% and 30%; prompted floors of 10%, 35% and 50%. Where returns were filed but wrong, Schedule 24 FA 2007 applies, with a 15% prompted floor for careless behaviour."
      },
      {
        "title": "Rebuilding income and expenses without the records",
        "body": "Few landlords hold clean books going back six or twenty years. Bank statements, tenancy agreements, agent statements, mortgage interest certificates and deposit scheme records are the usual reconstruction sources. Expenses matter as much as income: repairs, agent fees, insurance and the finance cost restriction all reduce what you disclose, and HMRC expects a reasoned basis, not round numbers. Income tax records run to 5 years after the 31 January following the tax year."
      },
      {
        "title": "Interest, and paying what you owe",
        "body": "Interest runs on the unpaid tax from the date it was originally due, not from the date you disclose, so on old years it is larger than most expect. It is not a penalty, and coming forward does not reduce it. Tax, interest and penalty go in as one figure, payable on submission. Size the tax on a year first with the <a href=\"/calculators/rental-income-tax-calculator\">rental income tax calculator</a>."
      }
    ],
    "howWeHelp": [
      {
        "title": "A first review that fixes the route and the years",
        "body": "That review covers what income was received, what property it came from, whether any of it is offshore, whether returns were filed, and what HMRC has already sent you. That settles the route and the behaviour category. Nothing is notified until both are, because notification starts a clock."
      },
      {
        "title": "Notification and the 90-day window",
        "body": "Our team prepares and submits the notification. HMRC acknowledges it and issues a disclosure reference, and the 90 days to disclose and pay run from that acknowledgement. Notifying does not create penalty exposure. The work is planned backwards from that deadline, so the computation and payment position are ready in time."
      },
      {
        "title": "A year-by-year computation you can check",
        "body": "Your <a href=\"/services/landlord-accountant\">landlord tax accountant</a> prepares a schedule per tax year: rental income, allowable expenses, the finance cost position, tax due, interest to the disclosure date and the penalty at the band claimed. Where records are missing, the assumptions are written down and evidenced, so the basis is visible and defensible."
      },
      {
        "title": "The mitigation case, and what follows",
        "body": "The penalty band is argued, not filled in. Telling, helping and giving access move a penalty within its band, and the disclosure is prepared so your co-operation is evident from it. Where the facts support suspension of a careless penalty or a reasonable excuse, the point is made at the time rather than on appeal."
      }
    ],
    "faqs": [
      {
        "question": "Is it better to come forward before HMRC writes to me?",
        "answer": "It usually lowers the penalty floor, the part of the bill you can influence. A disclosure is unprompted only where you had no reason to believe HMRC had discovered it, or was about to. For a failure to notify chargeability, an unprompted non-deliberate disclosure made within 12 months of the liability arising has a 0% floor, against 10% prompted. The tax and interest are the same either way."
      },
      {
        "question": "How many years will I have to disclose?",
        "answer": "It depends on behaviour, not on the campaign. The ordinary window is 4 years, careless behaviour takes it to 6 and deliberate behaviour to 20, with a 12-year window for offshore matters even without carelessness. A specialist reviews each year separately, because the category can differ between them and the honest characterisation is what the computation rests on."
      },
      {
        "question": "What if I have no records for the early years?",
        "answer": "Reconstruction is normal and HMRC expects it. Bank statements, agent statements, tenancy agreements and mortgage interest certificates usually carry most of the picture. Where a figure has to be estimated, the method is stated and applied consistently across years rather than left as a round number. Expenses are reconstructed as carefully as income, because leaving them out overstates what you pay."
      },
      {
        "question": "HMRC has already written to me. Can I still use the campaign?",
        "answer": "Often yes, but the disclosure is then prompted and the floor rises. What the letter is matters more than that it arrived. A nudge letter asking you to check your position is not an assessment, and the reply and its timing carry weight: see the <a href=\"/blog/landlord-tax-essentials/hmrc-nudge-letter-response-playbook-landlords-property-income\">nudge letter playbook</a>. An opened enquiry is different again, so a specialist reads the letter first."
      },
      {
        "question": "What if I cannot pay in full within 90 days?",
        "answer": "The disclosure is still made on time and a time to pay arrangement is requested alongside it. HMRC asks about your income, outgoings, assets and why payment in full is not possible, then decides case by case. Interest continues to run on the balance. Disclosing and asking beats missing the window the mitigated penalty was agreed against."
      },
      {
        "question": "Could HMRC prosecute me?",
        "answer": "Criminal prosecution sits outside the campaign routes, and no route other than the Contractual Disclosure Facility carries immunity from it. The campaigns exist for civil settlement. What a specialist can do is match the route to the facts: where deliberate behaviour with prosecution exposure is present, the <a href=\"/blog/landlord-tax-essentials/cop9-contractual-disclosure-facility-landlord-tax-fraud-investigation\">Code of Practice 9 track</a>, with its 60-day acceptance window, is the correct step."
      }
    ],
    "sources": [
      "docs/property/house_positions.md section 27.1 (TMA 1970 s.29, s.34, s.36, s.36A: 4, 6, 20 and 12 year assessment windows; verified at legislation.gov.uk/ukpga/1970/9/section/36)",
      "docs/property/house_positions.md section 27.2 (Schedule 24 FA 2007 maxima 30/70/100% and disclosure floors 0/20/30% unprompted, 15/35/50% prompted; F-5 correction: no 12-month qualifier on the Sch 24 careless-unprompted floor; verified at legislation.gov.uk/ukpga/2007/11/schedule/24/paragraph/10)",
      "docs/property/house_positions.md section 27.3 (Schedule 41 FA 2008 maxima 30/70/100% and para 13 floors 0/20/30% unprompted with the 12-month limb on the non-deliberate 0%, 10/35/50% prompted; verified at legislation.gov.uk/ukpga/2008/9/schedule/41)",
      "docs/property/house_positions.md section 27.5 (Code of Practice 9 and the Contractual Disclosure Facility: HMRC-initiated, 60-day acceptance window, immunity limited to matters disclosed)",
      "docs/property/house_positions.md section 27.6 (Let Property Campaign open since 9 September 2013 with no announced end date, residential-only eligibility, notify then disclose and pay within 90 days of acknowledgement, notification carries no penalty consequence; Digital Disclosure Service for other UK matters; Worldwide Disclosure Facility and FA 2017 Sch 18 Failure to Correct for offshore)",
      "docs/property/house_positions.md section 27.7 (TMA 1970 s.12B record retention: 5 years after the 31 January following the tax year for income tax)",
      "docs/property/coverage_map_2026-09.json (row working_title 'Accountants for landlords making an HMRC rental income disclosure', target query 'let property campaign accountant', hp_anchors 27, 27.6, 27.2)"
    ]
  },
  {
    "slug": "holiday-let-and-serviced-accommodation",
    "title": "Holiday Let and Serviced Accommodation Operators",
    "headline": "Accountants for holiday let and serviced accommodation operators",
    "metaTitle": "Holiday Let Accountant | Serviced Accommodation",
    "metaDescription": "Run a holiday let, Airbnb or serviced accommodation unit after FHL abolition? A specialist reviews the tax treatment, VAT and capital allowances position.",
    "intro": "You let a cottage, an apartment or a block of units on short stays through Airbnb, Booking.com or your own site, and the tax treatment stopped being simple when the furnished holiday lettings rules ended in April 2025. What you are asking is what you lost, what you kept and what you now have to file. A specialist starts with how each property is run and what services you provide, what sat in your capital allowances pool at abolition, and your gross takings across every channel last year. Those answers decide whether Section 24 restricts your interest, whether your pooled allowances still write down, and whether VAT registration is close. The output is a written read of your 2026/27 position and the reliefs that survived.",
    "stats": [
      {
        "value": "6 April 2025",
        "label": "Date the furnished holiday lettings regime was abolished"
      },
      {
        "value": "£90,000",
        "label": "VAT registration threshold on rolling twelve-month taxable turnover"
      },
      {
        "value": "140 / 70 nights",
        "label": "England business rates test: available to let and actually let"
      },
      {
        "value": "20%",
        "label": "Section 24 basic-rate credit on finance costs in 2026/27"
      }
    ],
    "challenges": [
      {
        "title": "What ended on 6 April 2025, and what carried over",
        "body": "Finance Act 2025 Schedule 5 removed the furnished holiday lettings regime, so your properties are now an ordinary UK property business: no capital allowances on new spending inside a dwelling, no Business Asset Disposal Relief on holiday let status alone, and profits that are no longer relevant earnings for pensions. Three transitional points survived. Pooled plant and machinery brought forward keeps writing down, unused losses are ring-fenced against future property profits, and transitional rules preserve capital gains relief where the trading period predates abolition. Fuller walkthrough in <a href=\"/blog/landlord-tax-essentials/abolition-of-furnished-holiday-lettings-fhl-what-individual-owners-needs-to-know\">the FHL abolition guide</a>."
      },
      {
        "title": "Mortgage interest is now a restricted credit, not a deduction",
        "body": "Finance costs on a qualifying holiday let once came off profit in full. They now fall under the Section 24 restriction like any other residential let: a credit against the tax bill, not a deduction. In 2026/27 that credit is 20%, leaving a higher-rate operator a 20 percentage point gap and an additional-rate operator a 25 point gap between the rate paid and the relief given. Check your figures with the <a href=\"/calculators/section-24-calculator\">Section 24 calculator</a>."
      },
      {
        "title": "Capital allowances against replacement of domestic items",
        "body": "New plant and machinery spending in a dwelling is blocked by the dwelling-house restriction in the Capital Allowances Act 2001, so a replacement oven is not a claim. Available instead is replacement domestic items relief under section 311A ITTOIA 2005, covering furniture, furnishings, appliances and kitchenware replaced with a broadly equivalent item where the old one leaves. Replacements only, and fixtures are excluded. The pre-abolition pool still writes down, and a disposal out of it can trigger a balancing charge. The <a href=\"/calculators/capital-allowances-calculator\">capital allowances calculator</a> sizes the spend."
      },
      {
        "title": "Short stays are standard-rated once you cross the VAT threshold",
        "body": "Holiday and serviced accommodation is a carve-out from the exempt land treatment, so your takings are standard-rated supplies. Registration is compulsory once taxable turnover over any rolling twelve months exceeds £90,000, or when you expect to exceed it in the next 30 days. Count the gross amount guests pay across every channel, not the net figure a platform transfers. HMRC can direct that units split across different names are one business."
      },
      {
        "title": "Business rates or council tax, and the premium if you get it wrong",
        "body": "A self-catering property in England moves to business rates only where it was available to let commercially for at least 140 nights in the previous twelve months, actually let for at least 70, and intended to be available for 140 in the coming twelve. Wales sets a higher bar at 252 available and 182 let. Fall short and it returns to council tax, where many billing authorities now charge a second homes premium."
      }
    ],
    "howWeHelp": [
      {
        "title": "A written read of where abolition left you",
        "body": "A <a href=\"/services/property-accountant\">specialist property accountant</a> reviews your last filed return against the current rules and sets out, property by property, the Section 24 position, the pooled allowances carried across, the ring-fenced losses, and the transitional capital gains position."
      },
      {
        "title": "A VAT position tested against your real takings",
        "body": "A rolling twelve-month turnover schedule is built from your channel statements, gross of commission, and it identifies the month you would cross the threshold. Where several units or entities exist, the separation question is examined before it is relied on."
      },
      {
        "title": "The claims that still exist, evidenced",
        "body": "A specialist separates what falls under replacement domestic items relief from what belongs in the grandfathered pool, and checks whether a balancing charge is waiting on an asset already sold. Where a property has a genuinely commercial element, the wider claim base is tested rather than assumed away."
      },
      {
        "title": "Returns, records and the rates position kept in step",
        "body": "Filing runs off the same record: the self assessment property pages or the company return, reconciled to what your platforms reported to HMRC, with the occupancy evidence behind your rates position kept current. Check your headline tax with the <a href=\"/calculators/rental-income-tax-calculator\">rental income tax calculator</a>."
      }
    ],
    "faqs": [
      {
        "question": "Is my holiday let still taxed as a business after the FHL rules ended?",
        "answer": "It is taxed as part of an ordinary UK property business. From 6 April 2025 the furnished holiday lettings regime was abolished by Finance Act 2025 Schedule 5. Section 24 now restricts your finance costs, new plant and machinery spending inside a dwelling no longer qualifies for capital allowances, and profits are no longer relevant pension earnings. Property business status is not trading status, and nothing in the change deems a holiday let to be a trade."
      },
      {
        "question": "Do I keep the capital allowances I claimed before abolition?",
        "answer": "The balance on your existing pool carries into the ordinary property business and keeps writing down, so the claim is not cancelled. What stopped is new qualifying expenditure, because spending on plant and machinery in a dwelling after abolition is caught by the dwelling-house restriction. Disposals out of the transferred pool can create a balancing charge, and replacement spending is handled under replacement domestic items relief instead."
      },
      {
        "question": "When does a holiday let business have to register for VAT?",
        "answer": "Once taxable turnover across any rolling twelve-month period exceeds £90,000, or as soon as you expect to exceed it within the next 30 days. Holiday and serviced accommodation is standard-rated rather than exempt, so almost all of your takings count. Measure the gross amount guests pay, including cleaning and booking fees, rather than the net sum a platform transfers, and add every channel. Units held in different names may still be one business."
      },
      {
        "question": "Can I still claim Business Asset Disposal Relief when I sell?",
        "answer": "Not on holiday let status alone. The relief applied to qualifying furnished holiday lettings only until 5 April 2025, and no rule after abolition treats short-let property as a trade. Serviced accommodation can qualify where the service level genuinely amounts to a trade on first principles, but that is fact-specific and the bar is high. Transitional rules preserve eligibility for some disposals where the trading period predates abolition. The rate is 18% from 6 April 2026."
      },
      {
        "question": "HMRC already has my Airbnb figures. Does that change how I file?",
        "answer": "Digital platforms have collected seller information since 1 January 2024 and report it to HMRC by the 31 January following each calendar year, so a figure for your bookings exists before you file. Differences are usually explainable: platform data is often gross of commission and does not know a property is jointly owned. Reconciling as you file stops that becoming an enquiry. How the income is taxed is covered in <a href=\"/blog/property-types-and-specialist-tax/airbnb-tax-uk-short-term-rental-income-taxed\">the short-let income guide</a>."
      }
    ],
    "sources": [
      "house_positions.md section 6 (FHL abolition 6 April 2025; transitional pooled allowances, ring-fenced losses, anti-forestalling, Form 17)",
      "house_positions.md sections 25.1 and 25.7 (CAA 2001 s.15(1)(c) and (da) omitted by FA 2025 Sch 5 Part 3; grandfathered pool balances; s.35 dwelling-house restriction; CGT transitional preserved at Part 4)",
      "house_positions.md sections 4 and 7 (Section 24 finance-cost reducer is a 20% basic-rate credit for 2026/27; 20/40/45 rates on property income in 2026/27)",
      "house_positions.md sections 5 and 5.A (BADR applied to FHL only until 5 April 2025; rate 18% from 6 April 2026; no post-abolition deeming of holiday lets as trades; service level tested on first principles)",
      "house_positions.md sections 29.2, 29.8 and 29.12 (holiday accommodation is a Sch 9 Group 1 carve-out from exempt land; £90,000 registration threshold; artificial separation directions under Sch 1 para 2)",
      "gov.uk VAT registration guidance, verified 2026-09-27 (£90,000 rolling twelve-month threshold and the 30-day forward look test)",
      "gov.uk business rates guidance, self-catering and holiday let accommodation, verified 2026-09-27 (England 140 nights available and 70 nights let; Wales 252 and 182)",
      "gov.uk guidance, selling goods or services on a digital platform, verified 2026-09-27 (platforms collecting from 1 January 2024, reported to HMRC by the following 31 January)",
      "legislation.gov.uk ITTOIA 2005 s.311A, verified 2026-09-27 (replacement domestic items relief: conditions A to D, domestic item definition, fixtures excluded)",
      "legislation.gov.uk Local Government Finance Act 1992 s.11C (as inserted by Levelling-up and Regeneration Act 2023 s.79), verified 2026-09-27 (billing authorities in England may charge a council tax premium on dwellings occupied periodically, from 1 April 2025)"
    ]
  },
  {
    "slug": "hmo-and-multi-let-landlords",
    "title": "HMO and Multi-Let Landlords",
    "headline": "Accountants for HMO and multi-let landlords",
    "metaTitle": "HMO Accountant | Multi-Let and Student Landlords",
    "metaDescription": "Specialist accounting for UK HMO, student and small commercial landlords: licensing costs, bills-included rents, council tax, capital allowances and structure.",
    "intro": "If you run an HMO, a student let or a small mixed-use building, your tax position looks nothing like a single buy to let. Rent arrives per room, the bills sit with you rather than the tenant, licensing and fire safety work runs alongside ordinary repairs, and a shop on the ground floor pulls a second set of rules into the same return. Four questions come first: which conversion, fire safety and licensing costs are revenue and which are capital, whether your common parts and non-dwelling space carry a capital allowances claim, how council tax or business rates are landing on the building, and whether the profit is better held personally or in a company. Those four are written up against your own figures, and our team prepares the returns.",
    "stats": [
      {
        "value": "5 or more",
        "label": "Occupants in two or more households: the mandatory HMO licensing test"
      },
      {
        "value": "£40,000",
        "label": "Maximum civil penalty per licensing offence from 1 May 2026"
      },
      {
        "value": "One bill",
        "label": "One council tax bill, owner liable, since Dec 2023"
      },
      {
        "value": "£1m",
        "label": "Annual Investment Allowance, permanent, for qualifying plant"
      }
    ],
    "challenges": [
      {
        "title": "Which HMO costs are revenue and which are capital",
        "body": "This line decides your bill, and HMO work sits right on it. Replacing a worn fire door like for like is normally a repair against this year's rent. Fitting fire doors, an alarm system and a protected escape route into a house that never had them, as part of turning it into an HMO, is improvement expenditure that goes to your capital base and waits for a sale."
      },
      {
        "title": "Bills-included rent and what you can deduct",
        "body": "Multi-let rents are usually quoted with gas, electricity, water, broadband and sometimes cleaning built in. The whole rent is taxable income, and the bills are deductible where they are incurred wholly and exclusively for the rental business, so you are taxed on the margin rather than the headline. Two things catch people out: once rooms are empty you still carry the utilities and the council tax on the whole building, and any part you or your family occupy comes out of the claim. The <a href=\"/calculators/portfolio-profitability-calculator\">portfolio profitability calculator</a> runs the real numbers before you set next year's room rates."
      },
      {
        "title": "Council tax and business rates on an HMO",
        "body": "Since 1 December 2023 an HMO in England is treated as a single dwelling for council tax, with one band and one bill, and the liability sits with you as owner rather than with the tenants. Older per-room bandings stay on the list until reviewed. Because the bill is yours, void-period council tax is a genuine deductible cost. Where a building has a real commercial element, that part can fall into business rates instead, a separate assessment with its own reliefs."
      },
      {
        "title": "Capital allowances on common parts and mixed-use space",
        "body": "Plant inside a dwelling-house is barred from capital allowances in a property business by CAA 2001 s.35. HMOs and mixed-use buildings are the exception worth checking. Plant in the common parts, such as a communal boiler, a lift or stair lighting, can qualify, and so can integral features in space that is genuinely not a dwelling: a ground floor shop, office or commercial unit. From April 2026 the main pool writing-down allowance is 14%, the special rate pool stays at 6%, and the Annual Investment Allowance is £1m. Size a claim with the <a href=\"/calculators/capital-allowances-calculator\">capital allowances calculator</a>, and the mechanics sit in <a href=\"/blog/property-types-and-specialist-tax/hmo-common-parts-capital-allowances-s35-claim-mechanics-multi-tenant-property\">the s.35 common parts guide</a>."
      },
      {
        "title": "Whether a company suits a high-yield portfolio",
        "body": "HMOs are geared and yield-heavy, so the Section 24 finance cost restriction bites hard. As an individual you do not deduct mortgage interest from rental profit; you get a basic rate reducer instead, 20% for 2026/27 and rising to the new 22% property basic rate from 2027/28. A company deducts interest in full before corporation tax. That is not the whole answer: incorporating triggers capital gains tax and stamp duty land tax unless a relief applies, and companies under common control share one set of corporation tax limits rather than a full £50,000 band each. The <a href=\"/calculators/rental-income-tax-calculator\">rental income tax calculator</a> gives the personal side first."
      }
    ],
    "howWeHelp": [
      {
        "title": "A review of conversion and refurbishment spend",
        "body": "A specialist works through the invoices behind each building and splits them into repairs, improvements and qualifying plant, with a note against each judgement, documented at the time rather than reconstructed later if HMRC asks."
      },
      {
        "title": "A capital allowances position for non-dwelling space",
        "body": "Where a building has communal plant, integral features or a commercial unit, a specialist identifies the qualifying expenditure and checks the s.35 boundary, and on a commercial purchase checks whether a s.198 fixtures election was agreed inside the two-year window."
      },
      {
        "title": "A structure comparison before you commit",
        "body": "A specialist models personal ownership against a company on your actual rents, interest and drawings, and prices the move itself: capital gains tax, stamp duty land tax, and the corporation tax limits shared across associated companies."
      },
      {
        "title": "Returns, accounts and quarterly filings prepared",
        "body": "Our <a href=\"/services/landlord-accountant\">team of HMO and multi-let accountants</a> prepares the self assessment or the company accounts and corporation tax return, keeps licensing fees and running costs in the right period, and sets up the digital records Making Tax Digital for Income Tax needs before your start date."
      }
    ],
    "faqs": [
      {
        "question": "Does every HMO need a licence?",
        "answer": "No. Mandatory licensing applies to an HMO occupied by five or more people forming two or more households, anywhere in England. Below that, a licence is needed only where your local authority has designated an additional scheme for smaller HMOs, or a selective licensing area covering all private rentals. Around seventy authority areas operate selective licensing. Wales, Scotland and Northern Ireland run separate regimes, so a portfolio spread across borders is checked authority by authority."
      },
      {
        "question": "Are HMO licence fees tax deductible?",
        "answer": "Yes. A licence fee is a running cost of the rental business and is deductible as a revenue expense. Fines and civil penalties are not. From 1 May 2026 the civil penalty for a licensing offence is capped at £40,000 per offence, and a tenant or the local authority can apply for a rent repayment order covering up to two years of rent where a property was let unlicensed."
      },
      {
        "question": "Who pays the council tax on an HMO?",
        "answer": "You do, as the owner. An HMO in England is treated as a single dwelling with one band and one bill, and the liability regulations put that bill on the owner rather than the residents. Because it is your cost, council tax you pay during voids is deductible against rental profit. If every occupant is a full-time student the property can be exempt, but a mixed household of students and non-students is not."
      },
      {
        "question": "Should I move my HMO portfolio into a limited company?",
        "answer": "It depends on your gearing, your other income and how long you intend to hold. Companies deduct mortgage interest in full, which matters more for HMOs than for low-yield lets, but the transfer is a disposal for capital gains tax and usually a stamp duty land tax charge, and associated companies share one set of corporation tax thresholds. Model both positions on your own figures before deciding."
      },
      {
        "question": "My building has a shop downstairs. Does that change anything?",
        "answer": "It changes several things at once. The commercial part can open up capital allowances the flats above cannot, it may be assessed for business rates rather than council tax, rent from it can carry VAT where the property is opted to tax, and buying the whole building may fall under the mixed-use stamp duty land tax rates rather than the residential rates."
      }
    ],
    "sources": [
      "house_positions.md 26.9 HMO and selective licensing, Housing Act 2004 Parts 2 and 3: s.254 HMO definition, s.61 with SI 2018/221 five-person mandatory test, s.249A civil penalty of £40,000 per offence from 1 May 2026 (SI 2026/319 reg.2), rent repayment orders up to two years (RRA 2025), about 70 selective licensing areas, licence fees deductible under ITTOIA 2005 s.272, penalties not deductible (BIM38500+)",
      "house_positions.md 30.5 SI 2023/1175 in force 1 December 2023: article 3C of SI 1992/549 treats an HMO as a single dwelling; SI 1992/551 Class C owner liability; void council tax deductible; pre-December-2023 per-room bandings remain until reviewed",
      "house_positions.md 30.3 Class N all-student exemption against a partly-student household; 30.6 Wales, Scotland and Northern Ireland divergence (Northern Ireland uses domestic rates)",
      "house_positions.md 25.2 and 38: CAA 2001 s.35 dwelling-house bar with the common parts carve-out, s.33A integral features, s.198 fixtures election and the two-year window, main pool WDA 14% from April 2026 (FA 2026 s.28), special rate pool 6%, AIA £1,000,000 permanent (F(No.2)A 2023 s.8)",
      "house_positions.md 25.4 CAA 2001 s.270CF(a)(iii): purpose-built student accommodation is residential use and excluded from the structures and buildings allowance",
      "house_positions.md 4: Section 24 finance cost restriction, 20% reducer for 2026/27 rising to the 22% property basic rate from 2027/28 (FA 2026 Sch 1); does not apply to companies",
      "house_positions.md 21.A: CTA 2010 s.18A, s.18D and s.18E, £50,000 lower limit and £250,000 upper limit for 2026/27, each divided by one plus the number of associated companies",
      "house_positions.md 19.2, 19.4 and 19.14: MTD for ITSA qualifying income is gross rental and trading turnover before expenses, joint owners count their own share, and spreadsheets need a digital link to filing software",
      "house_positions.md 34: ITTOIA 2005 s.272 import gateway and the s.34 wholly-and-exclusively test for allowable running costs",
      "Existing Property posts complemented rather than repeated: /blog/property-types-and-specialist-tax/hmo-common-parts-capital-allowances-s35-claim-mechanics-multi-tenant-property, /blog/property-types-and-specialist-tax/government-to-end-council-tax-on-hmo-rooms, /blog/property-types-and-specialist-tax/hmo-licensing-fees-tax-deductible-uk-landlords, /blog/property-types-and-specialist-tax/hmo-tax-guide-rental-income-deductions-multi-tenant, /blog/incorporation-and-company-structures/incorporating-an-hmo-into-a-limited-company-pros-and-cons",
      "Mixed-use FAQ, primary law (house positions silent): VATA 1994 Sch 10 option to tax on commercial rent; FA 2003 s.55 Table B non-residential and mixed-use SDLT rates on a whole building; LGFA 1988 s.41/s.42 non-domestic rating list for the commercial part",
      "coverage_map_2026-09.json row: working_title 'Accountants for HMO and multi-let landlords', situation 'HMO, student and commercial landlord', target_query 'hmo accountant', wave 1, hp_anchors 26.9 / 25 / 30.5"
    ]
  },
  {
    "slug": "landlord-retirement-and-succession",
    "title": "Landlords Planning Retirement and Succession",
    "headline": "Accountants for landlords planning retirement and succession",
    "metaTitle": "Landlord Succession Planning Accountant | UK",
    "metaDescription": "Specialist support for landlords retiring or passing on a portfolio: selling down, gifting, trusts, family investment companies and the 2026 IHT position.",
    "intro": "You spent decades building a rental portfolio and you are now deciding what happens to it. Selling down, passing property to your children, or moving the portfolio into a structure the family can inherit are three different tax problems, and the order you take them in changes the bill. The routes need setting out in numbers before anything is signed. The shape of the estate comes first: what each property cost, what it is worth now, how it is owned, what is still mortgaged, and whether the estate sits above the point where the residence nil-rate band begins to taper. Only then are disposal timing, gifts and structures compared. Where the estate stands, and the tax attaching to each route, then sits on one page. The documents your accountant prepares for your solicitor follow from it.",
    "stats": [
      {
        "value": "£325,000",
        "label": "Nil-rate band, frozen until 5 April 2031"
      },
      {
        "value": "£175,000",
        "label": "Residence nil-rate band, withdrawn £1 for every £2 of estate above £2m"
      },
      {
        "value": "£2.5m",
        "label": "Combined business and agricultural property relief allowance from 6 April 2026"
      },
      {
        "value": "18% / 24%",
        "label": "Residential capital gains tax rates, basic and higher, 2026/27"
      }
    ],
    "challenges": [
      {
        "title": "Selling down over several tax years rather than in one",
        "body": "Four disposals in one tax year stack every gain on one income base, push most of it through the 24% higher rate and use a single £3,000 annual exempt amount. Spread over three or four years, each year's exemption is used and part of each gain can fall in the 18% band. Every disposal where tax is due still carries a 60-day return. Size it on the <a href=\"/calculators/capital-gains-tax-calculator\">capital gains tax calculator</a>."
      },
      {
        "title": "Gifting and the seven-year clock",
        "body": "An outright gift to a child is a potentially exempt transfer, free of inheritance tax if you survive seven years. Two things catch landlords out. It is still a disposal at market value for capital gains tax, so tax can fall due on a transfer that raised no cash. And taper relief reduces the tax, not the value. The note on the <a href=\"/blog/landlord-tax-essentials/iht-7-year-clock-property-gifting-mid-life-landlord-strategy\">seven-year clock</a> walks the timing."
      },
      {
        "title": "Family investment companies and growth shares",
        "body": "You keep preference shares carrying a fixed coupon, the next generation holds growth shares taking future growth, and your estate holds a value that stops rising. The seven-year clock runs from the gift of the growth shares, not from the day the company is formed. Moving property in is a disposal at market value, with no holdover for investment company shares."
      },
      {
        "title": "Trusts, the entry charge and the ten-year charge",
        "body": "Property into a discretionary trust is a chargeable lifetime transfer, not a potentially exempt one. Inheritance tax of 20% falls at once on value above your available nil-rate band, more if you die within seven years, and the trust faces up to 6% at each ten-year anniversary. Against that, holdover relief is available on the way in where neither you nor your spouse can benefit."
      },
      {
        "title": "Incorporating late in life, and the uplift on death",
        "body": "Incorporation relief can roll the gain into the shares where the letting activity is genuinely a business, but since 6 April 2026 it must be claimed. Set against that, assets you still hold at death are acquired by your personal representatives at market value, so the lifetime gain is never charged, and transferring now can create a cost that holding would not. The <a href=\"/calculators/incorporation-cost-calculator\">incorporation cost calculator</a> prices the route."
      },
      {
        "title": "Keeping income in retirement versus passing on capital",
        "body": "Giving away the highest-yielding properties lowers the estate and starves the income at once. A workable plan names which properties are income for life, which are for the family, and which are sold to clear debt."
      }
    ],
    "howWeHelp": [
      {
        "title": "An estate and portfolio position on paper",
        "body": "One of our property tax specialists works through ownership of every property, original cost and improvement spend, current values, borrowing and how each title is held. That produces the two numbers the plan turns on: the latent gain across the portfolio, and the estate value against the nil-rate bands."
      },
      {
        "title": "A disposal timetable across tax years",
        "body": "Where selling down is part of the plan, a specialist sets out which properties go in which tax year, the expected cost of each, and where the 60-day deadlines fall. Private residence relief on anything once your home, and spousal no-gain-no-loss transfers before a sale, are checked in advance."
      },
      {
        "title": "A structure comparison rather than a single answer",
        "body": "Gift, trust and family investment company are modelled side by side: entry cost, filing burden, what happens if you die within seven years, and control retained. Doing nothing is included, and below the allowances it is often cheapest. Where business or agricultural property is in the mix, the <a href=\"/calculators/bpr-apr-allowance-calculator\">business and agricultural relief calculator</a> shows how the £2.5m allowance is used up."
      },
      {
        "title": "The filings and claims your accountant prepares",
        "body": "Incorporation relief claims, holdover claims, 60-day property returns, self assessment, company accounts, and the inheritance tax forms that follow a death. Wills, articles, shareholders' agreements and deeds of variation are drafted by your solicitor; a specialist supplies the tax position they must reflect and reviews the drafts."
      }
    ],
    "faqs": [
      {
        "question": "Should I sell my rental properties before I die or leave them in my estate?",
        "answer": "It depends which tax you are trying to reduce. Assets you still own at death are acquired by your personal representatives at market value, so the gain built up over your ownership is never charged. Selling in your lifetime crystallises that gain at 18% or 24% on residential property, but leaves cash you can spend or gift. Holding keeps the full value in the estate at 40% above your allowances, so below the nil-rate bands it is often cheaper."
      },
      {
        "question": "Does my buy-to-let portfolio qualify for business property relief?",
        "answer": "Almost certainly not. Collecting rent from residential lettings counts as investment rather than trading, and Pawson v HMRC settled it. Holiday lets lost their separate treatment in April 2025 and do not qualify either. Serviced accommodation with substantial services can qualify, but the bar is high. From 6 April 2026 relief that does apply is capped by a combined £2.5m business and agricultural allowance, with 50% relief above it."
      },
      {
        "question": "Can I give a property to my children and carry on collecting the rent?",
        "answer": "No, not without losing the benefit of the gift. Continuing to receive the rent, or to occupy a property you have given away, makes it a gift with reservation of benefit under section 102 Finance Act 1986. It stays in your estate however long ago the gift was made, so the seven-year clock never starts. The routes out are to give up the income entirely, or to pay a full market rent for any occupation."
      },
      {
        "question": "How much can I pass on before inheritance tax is due?",
        "answer": "The nil-rate band is £325,000 per person, frozen until 5 April 2031. A residence nil-rate band of £175,000 can apply where a home passes to children, grandchildren or other direct lineal descendants, but it is withdrawn by £1 for every £2 of estate above £2m and is gone by £2.35m. Unused bands transfer to a surviving spouse on a claim. Above the allowances, the rate is 40%."
      },
      {
        "question": "What happens to my pension in all of this?",
        "answer": "From 6 April 2027 unused defined contribution pension funds are brought into the estate for inheritance tax, reported and paid by the personal representatives, with death-in-service benefits excluded. That matters twice over. Living off the rent and leaving the pension as a tax-free legacy stops working, and the fund counts when the estate is tested against the £2m taper."
      }
    ],
    "sources": [
      "docs/property/house_positions.md 9 and 15.1: NRB 325,000 and RNRB 175,000, both frozen to 5 April 2031; taper 1 for every 2 above 2,000,000, extinguished at 2,350,000 for a single estate; IHT rate 40%",
      "docs/property/house_positions.md 15.2: PETs and CLTs, taper relief reduces the tax not the value, 3,000 annual exemption",
      "docs/property/house_positions.md 15.3: gift with reservation of benefit, s.102 FA 1986, market-rent route out",
      "docs/property/house_positions.md 15.4 and 9: combined BPR and APR allowance 2,500,000 from 6 April 2026 per IHTA 1984 s.124D inserted by FA 2026 Sch 12 para 4, 50% relief above; the gov.uk announcement summary still citing 1m is stale and was not used",
      "docs/property/house_positions.md 15.5: unused defined contribution pension funds in the estate from 6 April 2027, personal representatives report and pay, death-in-service excluded, pension counted for the 2m RNRB taper",
      "docs/property/house_positions.md 5: residential CGT 18% and 24%, annual exempt amount 3,000, 60-day return where tax is due, private residence relief, s.58 TCGA 1992 spousal no-gain-no-loss, s.162 incorporation relief must be claimed for transfers on or after 6 April 2026",
      "docs/property/house_positions.md 21.5 and 22.6: FIC mechanics, preference and growth shares, value freeze, seven-year clock runs from the share gift, no s.165 holdover for investment FICs",
      "docs/property/house_positions.md 22.1: Pawson v HMRC [2013] UKUT 050 (TCC), pure BTL fails BPR; FHL abolished April 2025",
      "docs/property/house_positions.md 22.4: CLT 20% entry charge above the NRB, periodic charge up to 6% every ten years, exit charges, s.260 holdover unavailable for settlor-interested trusts",
      "docs/property/house_positions.md 22.5: transferable NRB and RNRB, claimed by the personal representatives",
      "TCGA 1992 s.62(1), verified at https://www.legislation.gov.uk/ukpga/1992/12/section/62 on 2026-09-27: assets deemed acquired by the personal representatives at market value at the date of death, and not deemed disposed of by the deceased",
      "docs/property/coverage_map_2026-09.json, row working_title 'Accountants for landlords planning retirement and succession', hp_anchors 22, 22.6, 15.4"
    ]
  }
];

export function getAudience(slug: string): Audience | undefined {
  return audiences.find((a) => a.slug === slug);
}
