import type { HubSection } from "@accounting-network/web-shared/design/blog/BlogCategoryHub";

/**
 * Authored "essentials briefing" copy for the eleven /blog/<category> hubs.
 *
 * Keyed on the output of slugifyCategory() in src/app/blog/page.tsx, so the hub
 * page can look its own briefing up by the slug it already routes on. The shape
 * matches what BlogCategoryHub consumes: `intro` is the hero standfirst (it
 * replaces the auto-generated sentence) and `sections` are the ruled h3 rows.
 *
 * Figures: qualitative unless the exact value was verified in
 * docs/generalist/house_positions.md while writing, in which case the section
 * carries an "HP section N" comment above the string. Nothing else is numeric.
 */
export type HubBriefing = { intro: string; sections: HubSection[] };

export const blogHubBriefings: Record<string, HubBriefing> = {
  "limited-company-tax": {
    intro:
      "A company is a separate taxpayer with its own bill, its own deadlines and its own rules about how money leaves it.",
    sections: [
      {
        heading: "The company pays first, you pay second",
        paragraphs: [
          "Profit is taxed inside the company before any of it reaches you. Whatever is left can then be drawn as salary, as dividends or as employer pension contributions, and each of those routes carries a different personal tax and National Insurance outcome. Almost every question that starts as a company tax question ends up being a question about the order in which those two layers are settled.",
        ],
      },
      {
        heading: "Payment and filing are not the same deadline",
        paragraphs: [
          // HP section 3 (corrected 2026-09-09: payment 9m+1d, CT600 filing 12m)
          "Corporation tax is payable nine months and one day after the accounting period ends. The company tax return itself is not due until twelve months after the period end, which is why the money is often gone before the return that computes it is anywhere near finished. Larger companies pay earlier, by instalments, and the switch catches growing businesses out.",
          "Payroll and VAT run on their own clocks in the meantime, so a company can be profitable and short of cash in the same month.",
        ],
      },
      {
        heading: "Where owners lose money",
        paragraphs: [
          "Drawing cash through the year without deciding what it was is the common one. Money taken before a salary or a dividend is declared sits in a director's loan account, and what matters is not the balance at the year end but the balance still outstanding nine months and one day after it. Cleared inside that window, there is no charge on the company. Left there, there is.",
          // HP section 3
          "The other is opening a second company without counting the cost. The profit limits that set the corporation tax rate are shared out across companies under common control, so the first company can move up a rate without its own profit changing at all.",
        ],
      },
      {
        heading: "The four things worth settling before the year end",
        paragraphs: [
          "Capital spending claimed in the right pool and the right year. Losses used against the profits carrying the highest rate rather than the nearest ones. An extraction mix tested against the current dividend and National Insurance position. And a director's loan account looked at while there is still time to clear it.",
        ],
      },
    ],
  },

  "sole-trader-and-self-employment": {
    intro:
      "Why does the first profitable year of self-employment cost so much more than the profit suggests? Because the timing, not the rate, is what catches people.",
    sections: [
      {
        heading: "You and the business are one person",
        paragraphs: [
          "There is no company between you and the trade. Profit is taxed as your income, with Class 4 National Insurance on top, and the liabilities of the business are your own.",
          "That simplicity is a real advantage while profits are modest. It stops being an advantage at the point where liability exposure or retained profit starts to matter.",
        ],
      },
      {
        heading: "The January problem",
        paragraphs: [
          // HP section 2.B
          "The balancing payment for the year falls on 31 January, and payments on account towards the next year fall on 31 January and 31 July. Each payment on account is half the previous year's bill, and they become due once that prior liability passes the small-liability threshold with most of the tax not already collected at source. In a first profitable year the balancing payment and the first payment on account land together, which is the double bill everyone remembers.",
        ],
      },
      {
        heading: "The habits that cost most",
        paragraphs: [
          "Running the business through a personal current account, keeping no mileage log, and treating the drive to a regular workplace as business travel. Each one is small until a year of them has to be reconstructed from a bank statement.",
          // HP section 2.A
          "A year end that is not 31 March or 5 April is the quieter cost. Since the tax-year basis took effect, an off-cycle accounting date means apportioning two sets of accounts every year for no benefit.",
        ],
      },
      {
        heading: "Where a review of the figures usually starts",
        paragraphs: [
          "With the expenses actually claimed, tested against the way you really work rather than against a template. Capital purchases come next, because they are the ones most often put through as if they were running costs, and profit level comes last: at some point a company is worth modelling, and the only way to know is to model it.",
        ],
      },
    ],
  },

  "vat-and-making-tax-digital": {
    intro:
      "VAT is the tax most businesses join by accident, and the scheme you land on afterwards decides how much it costs you to run.",
    sections: [
      {
        heading: "Registration runs on a moving twelve-month window",
        paragraphs: [
          // HP section 7
          "You must register once taxable turnover crosses £90,000 in any rolling twelve months, or when you expect to cross it within the next thirty days. Because the first test looks backwards over a window that moves with you, a good quarter can trigger it in a month you were not watching.",
          "Registering voluntarily below the threshold is possible and sometimes sensible, particularly where your customers are themselves VAT registered and your costs carry input VAT.",
        ],
      },
      {
        heading: "The scheme choice is the money",
        paragraphs: [
          "Cash accounting shifts VAT onto the date you are paid rather than the date you invoice, which matters if your customers are slow. Flat rate trades input VAT recovery for a single percentage of VAT-inclusive turnover.",
          // HP section 7
          "The flat rate scheme has a trap in it. A business that spends very little on goods is a limited cost business and pays 16.5%, which usually makes the scheme the wrong answer for labour-only and service work.",
        ],
      },
      {
        heading: "Making Tax Digital is a records duty",
        paragraphs: [
          // HP section 7
          "MTD for VAT has applied to every VAT-registered business since April 2022, whatever the turnover. It requires digital records and digital links through to the return, not just a figure typed into a portal at the end of the quarter.",
          // HP verification log, MTD for Income Tax
          "MTD for Income Tax is a separate regime on its own timetable, starting from 6 April 2026 for those above £50,000 of qualifying income, then £30,000 from 6 April 2027 and £20,000 from 6 April 2028. It catches sole traders and landlords rather than companies.",
        ],
      },
      {
        heading: "The three things worth re-testing",
        paragraphs: [
          "The registration date, because a late one carries backdated tax on sales already made. The scheme, because it was chosen for a business that has since changed shape. And the rate applied to what you actually sell: liability errors on mixed supplies are the ones that build up quietly across years.",
        ],
      },
    ],
  },

  "payroll-and-paye": {
    intro:
      "Payroll is the one obligation that repeats every month and penalises lateness by default, whether you employ thirty people or only yourself.",
    sections: [
      {
        heading: "Report on or before payday",
        paragraphs: [
          "PAYE runs on Real Time Information: a submission on or before each payday, tax and employee National Insurance deducted at source, and payment across to HMRC on the monthly or quarterly cycle. Late submissions carry penalties scaled by headcount.",
          "A director-only company is still an employer with the same duties. Being the only person on the payroll removes none of the filing.",
        ],
      },
      {
        heading: "A hire costs more than the wage",
        paragraphs: [
          // HP section 9 / HP section 4 (15% above £5,000 secondary threshold, from 6 April 2025)
          "On top of salary sit employer National Insurance at 15% above the secondary threshold of £5,000 a year (from 6 April 2025), a minimum employer pension contribution on qualifying earnings, the cost of running payroll, holiday pay and statutory pay exposure. Employers' liability insurance is compulsory. Budgeting a hire on the headline salary is the most common miscalculation in this category, and it usually shows up in the third month.",
        ],
      },
      {
        heading: "Auto-enrolment is not optional",
        paragraphs: [
          "Eligible staff must be enrolled into a qualifying scheme, contributions must meet the minimum, a declaration of compliance is due, and the whole exercise repeats roughly every three years on re-enrolment.",
          "Employees can opt out of their own accord. An employer inducing them to is prohibited, and The Pensions Regulator enforces that.",
        ],
      },
      {
        heading: "The allowance question, and what follows from it",
        paragraphs: [
          // HP section 4
          "Whether the Employment Allowance is being claimed where it is available comes first, remembering that a company whose only employee is a single director cannot claim it. The director's own salary level then follows from that answer rather than being set independently of it.",
          "Second comes anything paid outside payroll that should have been inside it, which is where status questions and casual arrangements tend to surface.",
        ],
      },
    ],
  },

  "corporation-tax": {
    // HP section 3 (19% small profits rate, 25% main rate, marginal relief between)
    intro:
      "Most owner-managed companies never see the 25% rate and still pay more than 19%, because the band between them is where the money sits.",
    sections: [
      {
        heading: "The rate depends on the profit",
        paragraphs: [
          // HP section 3
          "The small profits rate of 19% applies where profits do not exceed £50,000 and the main rate of 25% applies above £250,000, with marginal relief tapering between the two. In that band the effective marginal rate is higher than either headline figure, so a pound of extra profit is not always taxed at the rate on the front of the return.",
        ],
      },
      {
        heading: "Associated companies share the limits",
        paragraphs: [
          // HP section 3
          "The £50,000 and £250,000 limits are divided by the number of associated companies and time-apportioned for short periods. Set up a second company and the first one can move up a rate without its profit changing at all.",
          "Owners with a trading company and a separate holding or property company are the usual case, and it is rarely spotted before the return.",
        ],
      },
      {
        heading: "Timing moves profit between rates",
        paragraphs: [
          "Bringing capital spending forward, deciding when income is recognised and choosing a year end all move profit between periods that may be taxed at different rates. A short period does not simply halve the bill, because the limits move too.",
          "Payment timing is its own small lever, and an asymmetric one. Paying early earns interest from HMRC, paying late costs interest to HMRC, and the late-payment rate sits several points above the credit rate rather than mirroring it. Both float with the Bank of England base rate, so the gap is worth checking rather than remembering.",
        ],
      },
      {
        heading: "The order the review runs in",
        paragraphs: [
          "Associated company counts first, then capital allowances, then loss relief and the order in which losses are set against periods. Losses used against a low-rate year when a high-rate year was available is the quiet, recoverable mistake.",
        ],
      },
    ],
  },

  "randd-tax-credits": {
    intro:
      "The boundary between genuine technical advance and ordinary good work is where every R&D claim is decided.",
    sections: [
      {
        heading: "What the relief is actually for",
        paragraphs: [
          "The test is an advance in science or technology, achieved by resolving a scientific or technological uncertainty that a competent professional in the field could not readily work out. Commercial novelty is not the test, and a product being new to your market does not settle it.",
          "Routine design, standard compliance work and applying known techniques in the usual way fall outside, however difficult or expensive the project was.",
        ],
      },
      {
        heading: "How the relief is given",
        paragraphs: [
          // HP verification log, R&D merged scheme + ERIS
          "For accounting periods beginning on or after 1 April 2024 the merged scheme gives a 20% expenditure credit, with Enhanced R&D Intensive Support available to loss-making SMEs meeting the 30% intensity threshold.",
          "The credit is taxable in its own right, so the headline percentage overstates what actually reaches the company.",
        ],
      },
      {
        heading: "Why claims fail",
        paragraphs: [
          "Usually because the technical narrative was written after the fact by someone who was not in the room, and the qualifying costs were assembled from a general ledger rather than from project records. HMRC's compliance activity in this area has been heavy.",
          "Treat any adviser who tells you the qualification question is straightforward before looking at the work as a reason for caution rather than comfort.",
        ],
      },
      {
        heading: "What a claim has to survive",
        paragraphs: [
          "Whether the project genuinely sought an advance, whether staff time was recorded well enough to support the apportionment, and whether subcontracted and externally provided worker costs have been treated correctly.",
        ],
      },
    ],
  },

  "incorporation-and-structure": {
    intro:
      "Sole trader, partnership, LLP or limited company is a trade-off between tax, liability and administration, not a ladder you climb.",
    sections: [
      {
        heading: "Each structure buys something different",
        paragraphs: [
          "A sole trader has the least administration and unlimited personal liability. A general partnership is tax transparent, so each partner is taxed on their own profit share, and liability is joint and several. An LLP keeps the transparency and limits the liability. A company is a separate legal person with its own tax and its own filing burden.",
          "There is no universally correct answer. Profit level, liability exposure, how much profit stays in the business and what you intend to do with it eventually all pull in different directions.",
        ],
      },
      {
        heading: "Incorporation is a calculation",
        paragraphs: [
          // HP section 1.A
          "Incorporation relief under section 162 can defer the capital gains tax on the transfer of a trade into a company, but it is a gated relief rather than an automatic one: the whole business has to be transferred as a going concern, with all its assets other than cash, wholly or partly in exchange for shares, and cash consideration restricts the relief pro rata. Deferral is also not cancellation, because the gain rolls into the base cost of the shares and resurfaces when you sell them.",
          "At typical owner-managed profit levels the annual saving is more modest than the figures usually quoted, and the rise in dividend rates has narrowed it further.",
        ],
      },
      {
        heading: "The parts people forget",
        paragraphs: [
          "VAT registration does not travel automatically, PAYE has to be set up afresh, and capital allowances need an election if the assets are not to be treated as sold at market value. Existing contracts, bank mandates and insurance all name the old entity, and every one of them is easier to move before the incorporation than six months after it.",
        ],
      },
      {
        heading: "What to settle before the shares are issued",
        paragraphs: [
          "The share classes and who holds them, because a structure set up for this year's tax position is also the structure a future sale has to qualify under. Then the transfer itself: what is going across, on what date, and at what value, since the relief conditions turn on exactly that.",
        ],
      },
    ],
  },

  "exit-and-capital-gains": {
    intro:
      "The tax on a sale is largely decided in the two years before it, because the reliefs that matter most run on conditions you have to have held throughout that period rather than met on the day.",
    sections: [
      {
        heading: "Shares or assets is the fork",
        paragraphs: [
          // HP section 5
          "On a share sale you dispose of the shares, which is a single capital gains event and can qualify for Business Asset Disposal Relief. On an asset sale the company sells its assets, pays tax on the gains inside the company, and you are then taxed again when the proceeds are extracted.",
          "Buyers generally prefer assets and sellers generally prefer shares. Because the two routes tax so differently, the price is not comparable until both have been modelled.",
        ],
      },
      {
        heading: "The relief has conditions you have to have already met",
        paragraphs: [
          // HP section 5
          "Business Asset Disposal Relief is capped at a £1,000,000 lifetime limit per person, and the qualifying conditions must have been held throughout the two years to disposal: a personal company holding with the required share and voting percentages, and the seller an officer or employee, with the company trading.",
          // HP section 5
          "The rate has also been moving. It was 14% for disposals between 6 April 2025 and 5 April 2026 and is 18% from 6 April 2026, so completion date has a real effect on the number.",
        ],
      },
      {
        heading: "Where value leaks",
        paragraphs: [
          "Surplus cash and investment assets sitting in a trading company can put the trading status in question. Shares issued to a spouse the month before a sale will not have met a two-year condition. Company records that cannot survive due diligence turn into price reductions and indemnities, and every one of those is fixable early and expensive late.",
        ],
      },
      {
        heading: "What due diligence will find first",
        paragraphs: [
          "The share register and the officer and employee history, then the balance sheet's composition, then the timing of completion against the rate steps. Where the exit is a wind-up rather than a sale, the anti-avoidance rules on capital distributions need looking at before anything is distributed.",
        ],
      },
    ],
  },

  "bookkeeping-and-compliance": {
    intro:
      "Records are not a tidiness exercise. They are the evidence for every figure you have already told HMRC is true.",
    sections: [
      {
        heading: "The records are the position",
        paragraphs: [
          "A deduction you cannot evidence is a deduction you may not keep. Bank feeds, invoices in and out, a mileage log, and a stock or work-in-progress figure where the business holds either: that is the substance of the obligation, whatever software sits over the top.",
          "Digital record-keeping duties now apply on top, and they are about how records are kept and linked, not only about what is filed.",
        ],
      },
      {
        heading: "A calendar you did not choose",
        paragraphs: [
          "Payroll every month, VAT every quarter, a confirmation statement and accounts at Companies House annually, and a tax return with its own deadline. The dates come from the entity and the registrations rather than from your preferences.",
          "Missing one is rarely a single penalty. Late accounts and a late return usually arrive together, because the same underlying work was outstanding for both.",
        ],
      },
      {
        heading: "Where it goes wrong",
        paragraphs: [
          "A personal card used for business, a bank reconciliation that has not balanced since spring, and a director's loan account nobody has looked at. The cost is not only the reconstruction work at the year end, which routinely runs to more than the bookkeeping would have. It is that an HMRC enquiry can reach back over years, and a year you cannot evidence is argued on HMRC's assumptions rather than your records.",
          "Software helps with the arithmetic and not with the judgement. Automatic categorisation is a suggestion, and it is wrong often enough to matter.",
        ],
      },
      {
        heading: "Where a clean-up starts",
        paragraphs: [
          "With the balance sheet, tested against something real rather than against last year's balance sheet. Then the VAT control account, which either agrees to the returns filed or explains why not. Then the director's loan account, checked before the year end rather than after it.",
        ],
      },
    ],
  },

  "director-pay-and-dividends": {
    intro:
      "How you pay yourself out of your own company is a yearly decision, and last year's answer stops being right when the rates move.",
    sections: [
      {
        heading: "Two routes, taxed differently",
        paragraphs: [
          "Salary is deductible for the company and taxable on you as employment income, with National Insurance on both sides. Dividends come out of profit that has already borne corporation tax, carry no National Insurance, and are taxed at their own rates.",
          // HP section 4
          "Those dividend rates rose from 6 April 2026 to 10.75% at the ordinary rate and 35.75% at the upper rate, with the additional rate unchanged at 39.35%. The gap between the two routes is narrower than it was.",
        ],
      },
      {
        heading: "The right salary depends on one question",
        paragraphs: [
          // HP section 4
          "Whether the company can claim the Employment Allowance. A company whose only employee is a single director cannot, which is why such companies often set salary at the secondary threshold. A company with a genuine second employee usually goes higher, because the allowance absorbs the employer National Insurance.",
          "Where a spouse is on the payroll, the pay has to be genuine and commensurate with the work actually done. Illusory salaries are disallowed and the point is not arguable.",
        ],
      },
      {
        heading: "A dividend needs distributable profit and paperwork",
        paragraphs: [
          "Dividends can only be paid out of distributable profits, evidenced by accounts, with a board minute and a voucher. A payment made when the profits were not there is unlawful and gets recharacterised, usually as a loan.",
          // HP section 4.A
          "An overdrawn director's loan account still outstanding nine months and one day after the year end triggers a charge on the company at the dividend upper rate for the year the loan was made. It is repayable when the loan is, but the repayment of the charge is deferred, so the cash is gone for a long time.",
        ],
      },
      {
        heading: "This year's mix, not last year's",
        paragraphs: [
          "The split tested against the rates now in force, whether employer pension contributions should be doing more of the work than they are, and whether the loan account needs clearing before the year end rather than explaining after it.",
        ],
      },
    ],
  },

  "business-finance": {
    intro:
      "Borrowing decisions are commercial decisions, but the accounting and tax treatment of what you borrow shapes the true cost of it.",
    sections: [
      {
        heading: "Match the term to the purpose",
        paragraphs: [
          "Working-capital gaps, an asset purchase and a growth plan are three different problems, and financing one with an instrument built for another is where the pressure comes from. Short facilities funding long assets is the classic version, and the accounts show it before the bank statement does: the repayments sit in a single year while the asset earns across several, so the profit the borrowing was meant to support is the profit it consumes.",
          "Which product to take is a commercial call, and a broker or lender is the right place to test it. What follows is the accounting side of the same decision: how the borrowing lands in the accounts, in the tax charge and in what a lender sees next year.",
        ],
      },
      {
        heading: "Interest and capital are treated differently",
        paragraphs: [
          "Interest and finance charges are generally deductible against profit. Capital repayments are not, because they settle a balance sheet liability rather than an expense. A business that budgets tax around total repayments will be short.",
          "How an asset finance agreement is structured also decides whether capital allowances are available on the asset, so the paperwork matters more than the monthly figure suggests.",
        ],
      },
      {
        heading: "Lenders read the accounts you filed",
        paragraphs: [
          "Filleted accounts that show as little as the law allows, a director's loan account in the wrong direction, and a late filing history all price into the decision before anyone reads your plan. Lenders also look at trend across years rather than at your best one.",
          "That is an argument for getting the accounts done early rather than for dressing them up, which is a different thing and not one we do.",
        ],
      },
      {
        heading: "The three numbers a lender recalculates",
        paragraphs: [
          "Whether the forecast supporting the application reconciles to the accounts, whether the tax charge inside it is realistic, and whether the covenant tests survive an ordinary bad quarter rather than only a good one.",
        ],
      },
    ],
  },
};
