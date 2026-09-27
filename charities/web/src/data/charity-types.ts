export interface CharityType {
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
}

export const charityTypes: CharityType[] = [
  // Wave 1 replacement, docs/charities/_wave1/cics.json, 2026-09-27, LEADS_250_PROGRAMME S4a
  {
    slug: "cics",
    title: "Community Interest Companies",
    headline: "Accounts and tax for community interest companies",
    metaTitle: "CIC Accountant | CIC Accounts and Tax | Trustee Tax",
    metaDescription: "Looking for a CIC accountant? Corporation tax, the asset lock and dividend cap, CIC34 filing, grant income and payroll for community interest company directors.",
    intro: "Company rules, not charity rules, govern a CIC's money, and the first question is what it owes. A CIC is not a charity. It pays corporation tax on its profits like any other company, it cannot claim Gift Aid on donations, and it gets no charitable rate relief. Grant income still has to be recognised correctly, though none of it carries a tax claim. Each year the company files a CIC34 community interest report with its accounts at Companies House, and the asset lock plus the dividend cap on share capital CICs decide what may leave the company at all. If Gift Aid is what you are missing, that is a structure question, and converting to a charity or a CIO is the route. Payroll runs on the ordinary employer rules. Accounts and the CIC34 fall due together, so the year end sets the timetable.",
    stats: [
      {
        value: "CIC34",
        label: "Community interest report filed with the annual accounts at Companies House every year",
      },
      {
        value: "Nine months",
        label: "Companies Act 2006 s442 filing period for a private company after the accounting reference date",
      },
      {
        value: "No Gift Aid",
        label: "CICs get no charity tax reliefs and pay corporation tax normally",
      },
      {
        value: "15%",
        label: "Employer National Insurance for 2026/27 above the £5,000 secondary threshold",
      },
    ],
    challenges: [
      {
        title: "Is the corporation tax position really the same as any other company?",
        body: "In substance, yes, and that surprises most boards. Trading surpluses are taxable and community purpose changes nothing. What moves the figure is the ordinary company toolkit: when grant and contract income is recognised, which costs are allowable, what the capital spend qualifies for, and whether losses carry forward. Directors often expect relief that does not exist here, and the gap arrives as an unbudgeted bill.",
      },
      {
        title: "What can the asset lock and the dividend cap let you pay out?",
        body: "The asset lock keeps assets and profits inside the company or moving only to another asset locked body. A CIC limited by shares faces a dividend cap on top, so a payment that would be routine elsewhere can be a breach here. Directors can draw a reasonable salary through payroll; shareholders cannot simply take the surplus. Choosing between salary, a capped dividend and reinvestment is a board decision that needs the numbers.",
      },
      {
        title: "Will the CIC34 you file satisfy the Regulator?",
        body: "It is not a formality bolted to the accounts. The report must describe activities carried out for community benefit, show how directors consulted the people affected, and account for how assets and profits were applied, including any dividend within the cap. A filing fee applies. Reports come back for thin narrative and for numbers that do not reconcile. Our <a href=\"/blog/cics-and-social-enterprises/cic34-form-guide\">CIC34 filing guide</a> works through each section, and the <a href=\"/blog/cics-and-social-enterprises/orcic-cic-regulator-explained\">CIC Regulator</a> sets the expectations.",
      },
      {
        title: "How should grants and donations sit in the accounts?",
        body: "Funders restrict money, stage it across years, claw it back on conditions and want reporting that ties to the statutory figures. None of it is Gift Aid, so the accounting treatment does all the work, and income recognised in the wrong period distorts the result and the tax computation together. See <a href=\"/blog/cics-and-social-enterprises/cic-funding-and-grants\">where CIC funding comes from</a>.",
      },
      {
        title: "Would converting to a charity or a CIO be worth it?",
        body: "This is the decision behind most CIC enquiries. Charitable status opens Gift Aid and rate relief, and brings Charity Commission registration, trustee duties and restricted objects with it. Conversion must also respect the asset lock. Test it against your own income mix: a CIC earning mainly contract income can gain less than the extra reporting costs. The <a href=\"/guides/cic-complete-guide\">complete CIC guide</a> and our <a href=\"/blog/cics-and-social-enterprises/cic-vs-charity\">CIC or charity comparison</a> set the structures side by side.",
      },
    ],
    howWeHelp: [
      {
        title: "Annual accounts and the CIC34 prepared together",
        body: "Your accountant prepares the statutory accounts and drafts the community interest report from the same records, so the narrative on community benefit, consultation and asset application reconciles to the figures, both filed inside the nine month window.",
      },
      {
        title: "Corporation tax return reviewed and filed",
        body: "A specialist reviews how trading, contract and grant income has been recognised, checks allowable costs and capital claims, prepares the computation and CT600, and gives you the liability and date early enough to budget.",
      },
      {
        title: "Payout options set out against the cap",
        body: "Before the board decides, a specialist reviews what the asset lock and any dividend cap permit and puts salary, capped dividend and reinvestment side by side.",
      },
      {
        title: "Payroll, and a structure comparison for the board",
        body: "Payroll is operated under RTI, with employer National Insurance at 15% above the £5,000 secondary threshold for 2026/27. Where Gift Aid is the reason you are asking, a specialist reviews your income mix and prepares a written CIC against charity or CIO comparison.",
      },
    ],
    faqs: [
      {
        question: "Does a community interest company pay corporation tax?",
        answer: "Yes. A CIC pays corporation tax on its profits in the same way as any other limited company, and community purpose does not create an exemption. What changes the figure is ordinary company tax work: when income is recognised, allowable expenditure, capital allowances and losses brought forward. A CIC is regulated by the Office of the Regulator of Community Interest Companies rather than the Charity Commission, and HMRC treats it as a standard company.",
      },
      {
        question: "Can a CIC claim Gift Aid on donations it receives?",
        answer: "No. Gift Aid and charitable rate relief are open only to bodies HMRC recognises as charities, and a CIC is not one. Donations to a CIC are accounted for as income with no tax claim attached, and the same applies to most grants. Where Gift Aid matters enough to change the plan, the question is whether to convert to a charity or a CIO.",
      },
      {
        question: "What has to go in the CIC34, and when is it due?",
        answer: "The CIC34 is the community interest report every CIC files at Companies House with its annual accounts, online or by post, and a filing fee applies. It covers the activities carried out for community benefit, how directors consulted the people affected, and how assets and profits were applied, including remuneration and any dividend paid within the cap. Under Companies Act 2006 section 442 a private company has nine months from its accounting reference date to file.",
      },
      {
        question: "How much can a CIC pay its directors and shareholders?",
        answer: "Directors can be paid a reasonable salary for work they actually do, run through payroll like any employee, with employer National Insurance at 15% above the £5,000 secondary threshold in 2026/27. Shareholders sit differently. A CIC limited by shares can only pay dividends within the cap set under the CIC regulations, and the asset lock keeps the rest of the value in the company or with another asset locked body. Remuneration and any dividend are both reported in the CIC34.",
      },
      {
        question: "How should grant income appear in CIC accounts?",
        answer: "Grants are recognised according to the conditions attached to them, so restricted funding and money staged across years can land in a different period from the one the cash arrived in. That moves the reported result and the taxable profit together. Funders want reporting that reconciles to the filed accounts, which is far easier when income is tracked by fund from the start rather than rebuilt at the year end.",
      },
      {
        question: "Who regulates a CIC, and what happens if we miss a filing?",
        answer: "The Office of the Regulator of Community Interest Companies, based at Companies House, approves formation, applies the community interest test and enforces the asset lock. The Charity Commission has no role here. Because a CIC is also an ordinary company, a late filing can bring a Companies House penalty and the Regulator's attention at once, while HMRC deadlines run alongside. One calendar covering all three avoids most of it.",
      },
    ],
  },
  {
    slug: "social-enterprises",
    title: "Social Enterprises",
    headline: "Accounts and tax advice for social enterprises, whatever your legal form",
    metaTitle: "Accountants for Social Enterprises | Trustee Tax",
    metaDescription:
      "Accounts, Corporation Tax and structure advice for social enterprises: CICs, charitable companies, CIOs and mission-led trading organisations.",
    intro:
      "Social enterprise is a description of purpose, not a legal form. The structure your organisation uses determines its accounting standards, tax treatment, regulatory obligations and whether it can access reliefs such as Gift Aid. CICs pay Corporation Tax normally and receive no charity tax reliefs. Registered charities, including charitable incorporated organisations and charitable companies, access a different set of reliefs and report under different rules. Getting the structure right from the start, or understanding exactly what your current structure means for tax and reporting, is where the accounting work begins.",
    stats: [
      { value: "£5,000", label: "Income threshold above which an England and Wales charity must register with the Charity Commission" },
      { value: "80%", label: "Mandatory charitable rate relief for charities, rising to 100% at council discretion" },
      { value: "25p per £1", label: "Gift Aid top-up on donations to registered charities recognised by HMRC" },
    ],
    challenges: [
      {
        title: "Structure confusion and tax consequences",
        body: "A CIC, a charitable company and a charitable incorporated organisation each face different tax treatment, regulatory oversight and filing obligations. CICs pay Corporation Tax normally and cannot claim <a href=\"https://www.gov.uk/charities-and-tax\">charity tax reliefs</a>. Registered charities pay no tax on most income used for charitable purposes and may claim Gift Aid. Choosing or inheriting the wrong structure has real cost consequences that compound over time.",
      },
      {
        title: "Trading income and when tax is due",
        body: "For registered charities, primary-purpose trading income is tax-exempt. Non-primary-purpose trading is only exempt within the <a href=\"https://www.gov.uk/guidance/charities-and-trading\">small trading exemption limits</a> (which depend on the charity's total income). Exceed the limit and tax is due on all profits from that trade, not just the excess. For CICs and non-charitable social enterprises, all trading profits are taxable. Understanding which rules apply to your income mix is essential.",
      },
      {
        title: "When a charity needs a trading subsidiary",
        body: "Charities that generate significant taxable trading income often route it through a wholly owned trading subsidiary. When the subsidiary donates its profits to the parent charity, <a href=\"https://www.gov.uk/guidance/charities-and-trading\">no Corporation Tax is due on those payments</a>. Setting up and accounting for this structure correctly, including the gift aid payment mechanism from subsidiary to charity, requires care to achieve the intended tax outcome.",
      },
      {
        title: "Blended income and funder reporting",
        body: "Social enterprises routinely combine grants, earned trading income, social investment and donations. Each has different accounting treatment, VAT implications and reporting obligations. Funders often require management accounts or impact-linked reporting that draws on financial data. Accounts need to be structured from the start in a way that makes this reporting straightforward rather than retrospectively reconstructed.",
      },
    ],
    howWeHelp: [
      {
        title: "Structure and tax advice",
        body: "We explain the accounting and tax implications of CIC, charitable company, CIO and other structures, drawing on the <a href=\"https://www.gov.uk/guidance/charity-types-how-to-choose-a-structure\">Charity Commission's structure guidance</a>. Where a trading subsidiary or restructure is relevant, we model the tax position and set out the implementation steps.",
      },
      {
        title: "Annual accounts and regulatory filings",
        body: "We prepare annual accounts under the applicable standard, whether FRS 102 small company accounts, Charities SORP (for registered charities), or CIC-specific accounts including the CIC34 community interest report. We manage Companies House and, where applicable, Charity Commission filing deadlines.",
      },
      {
        title: "Corporation Tax, VAT and Gift Aid",
        body: "We calculate and file Corporation Tax returns, assess VAT registration obligations (the standard <a href=\"https://www.gov.uk/vat-charities\">£90,000 taxable turnover threshold applies</a> unless specific reliefs apply), and handle <a href=\"https://www.gov.uk/claim-gift-aid\">Gift Aid</a> registration and claims for organisations that are registered charities.",
      },
    ],
    faqs: [
      {
        question: "Can a social enterprise claim Gift Aid?",
        answer: "Only if the organisation is a registered charity recognised by HMRC. A charitable incorporated organisation or a charitable company limited by guarantee registered with the Charity Commission can claim Gift Aid on eligible donations. A CIC cannot: CICs receive no charity tax reliefs and are not registered with the Charity Commission. If Gift Aid eligibility matters, the legal structure needs to be a registered charity.",
      },
      {
        question: "Is a social enterprise the same as a charity?",
        answer: "No. Social enterprise describes a trading organisation with a social or community purpose. It is not a legal form. The organisation could be a CIC, a registered charity, a charitable company, or another structure entirely. Only organisations registered with the Charity Commission (and recognised by HMRC) are charities and access charity tax reliefs. CICs and other non-charitable social enterprises pay Corporation Tax normally.",
      },
      {
        question: "When does a charity need a trading subsidiary?",
        answer: "When a charity's non-primary-purpose trading income exceeds the <a href=\"https://www.gov.uk/guidance/charities-and-trading\">small trading exemption limits</a>, tax becomes due on all profits from that trade. The typical solution is a wholly owned trading subsidiary that conducts the taxable activity and donates its profits to the parent charity. When that donation is made correctly, no Corporation Tax is due on the payment. The structure requires careful accounting to work as intended.",
      },
    ],
  },
  // Wave 1 append, docs/charities/_wave1/cios.json, 2026-09-27, LEADS_250_PROGRAMME S4a
  {
    slug: "cios",
    title: "Charitable Incorporated Organisations",
    headline: "Accounts and tax for charitable incorporated organisations",
    metaTitle: "Accountants for CIOs | CIO Accounts | Trustee Tax",
    metaDescription: "CIO accounts, the Charity Commission annual return, examination and audit thresholds, converting into a CIO, trading subsidiaries and VAT.",
    intro: "A charitable incorporated organisation reports to one regulator. Your CIO registers with the Charity Commission whatever its income and files nothing at Companies House, so there is no confirmation statement and no company accounts. What you do file is an annual return within 10 months of your financial year end, with the trustees' annual report and accounts attached once gross income passes £25,000. The format of those accounts follows your income band, and external scrutiny begins at the same point. Trustees converting an unincorporated charity or a charitable company face a second question: what moves across, and what has to be set up again. Still choosing a structure? See <a href=\"/guides/charity-structures-which-to-choose\">the structures comparison</a> first.",
    stats: [
      {
        value: "Commission only",
        label: "A CIO registers with the Charity Commission and not with Companies House",
      },
      {
        value: "Any income",
        label: "A CIO must register whatever its income, where other England and Wales charities register above £5,000",
      },
      {
        value: "10 months",
        label: "Deadline for the annual return after the end of the financial year",
      },
      {
        value: "£25,000",
        label: "Gross income above which trustees must arrange an independent examination or an audit (£40,000 for financial years ending on or after 30 September 2026)",
      },
    ],
    challenges: [
      {
        title: "One regulator, but the filing is not as light as it looks",
        body: "Dropping Companies House removes a filing, not the workload. The Commission expects an annual return within 10 months of your year end, and above £25,000 of gross income the trustees' annual report and accounts go with it. Below £10,000 the return asks for income and spending figures alone; from £10,000 up to £25,000 there is a set of return questions to complete as well. Trustees arriving from a company background usually find the report itself takes the time.",
      },
      {
        title: "The accounts format changes with your income band",
        body: "Because a CIO is not a company, it can prepare receipts and payments accounts while gross income stays at or below £250,000, rising to £500,000 for accounting years ending on or after 30 September 2026. Above that, accruals accounts under the Charities SORP are required, and a charitable company never has the simpler option at any size. Crossing the boundary brings a change of basis, restated comparatives and different disclosures, all easier handled before the year end.",
      },
      {
        title: "Scrutiny steps up twice, and the second step has two limbs",
        body: "Above £25,000 of gross income trustees must arrange an independent examination or an audit. An audit becomes mandatory where gross income exceeds £1m, or where income exceeds £250,000 and gross assets exceed £3.26m. Both of those figures rise for accounting years ending on or after 30 September 2026. The asset limb catches CIOs holding a building on modest income. <a href=\"/calculators/independent-examination-vs-audit-checker\">Check which applies to your year</a>.",
      },
      {
        title: "Converting into a CIO runs on two very different routes",
        body: "A charitable company converts directly, and the Commission's guidance is that the charity continues to exist in a different form, keeping its name, its charity number and its existing bank accounts. An unincorporated charity does not convert. A new CIO is registered, assets transfer to it and the old charity closes, so expect a new charity number and a set-up-again list that runs well past the accounts.",
      },
      {
        title: "Trading and VAT do not get simpler",
        body: "Primary-purpose trading is exempt without limit. Non-primary-purpose trading is exempt only inside the small trading limits, a three-tier scale set by total income, and breaching it taxes all that trade's profits, not the excess. That is what pushes a growing CIO towards <a href=\"/blog/gift-aid/charity-trading-subsidiary-gift-aid\">a trading subsidiary</a>, which is a company and does file at Companies House. VAT follows the normal rules, compulsory above £90,000 of taxable turnover.",
      },
    ],
    howWeHelp: [
      {
        title: "Accounts in the format your band actually requires",
        body: "Receipts and payments or SORP accruals accounts are prepared according to gross income and your governing document, every SORP statement is dated to the accounting period it belongs to, and the trustees' annual report is drafted so the narrative matches the numbers.",
      },
      {
        title: "The annual return and the Commission filing",
        body: "Filing is handled end to end: the return questions, then the report and accounts where income requires them, inside the 10 month window. Trustee details and the figures on the public register are reconciled to the accounts, because that entry is what funders read first.",
      },
      {
        title: "Independent examination or the audit file",
        body: "Which scrutiny level your year falls into is settled first, including the asset limb an income-only reading hides, and whether your examiner must belong to one of the bodies listed in the Charities Act. Where an examination applies, the file is prepared to the examiner's directions. <a href=\"/guides/audit-vs-independent-examination\">The examination and audit guide</a> sets out the difference.",
      },
      {
        title: "The conversion year and what follows it",
        body: "For a conversion, or a transfer into a newly registered CIO, closing and opening positions are prepared together, the asset transfer is recorded, and the set-up-again list is worked through: HMRC recognition, Gift Aid, bank mandates, payroll and VAT. <a href=\"/guides/set-up-a-charity-cio\">Setting up a CIO</a> covers the registration side.",
      },
    ],
    faqs: [
      {
        question: "Does a CIO file accounts at Companies House?",
        answer: "No. A CIO registers with the Charity Commission only, which is its main structural difference from a charitable company. There is no confirmation statement, no Companies House accounts and no company number. Everything goes to the Commission through the annual return, due within 10 months of your year end, with the report and accounts attached once gross income is above £25,000. A trading subsidiary is a separate company and files at Companies House.",
      },
      {
        question: "When does a CIO need an independent examination or an audit?",
        answer: "Gross income decides it. Up to £25,000 the Charities Act requires none, and that ceiling rises to £40,000 for accounting years ending on or after 30 September 2026, although your governing document may require one anyway. An audit is mandatory above £1m of gross income, or above £250,000 with gross assets over £3.26m, becoming £1.5m, or £500,000 with assets over £5m, for years ending on or after 30 September 2026.",
      },
      {
        question: "Can a CIO prepare receipts and payments accounts?",
        answer: "Yes, while gross income stays at or below £250,000, because a CIO is not a company. That boundary rises to £500,000 for accounting years ending on or after 30 September 2026. Above it, accruals accounts under the Charities SORP are required. Funders sometimes ask for accruals accounts regardless of your income, so check grant conditions before settling the format.",
      },
      {
        question: "What happens to Gift Aid and bank accounts when we become a CIO?",
        answer: "It depends on the route. A charitable company converts directly and the Commission's guidance is that it keeps its name, charity number and existing bank accounts. An unincorporated charity is different: a new CIO is registered, assets transfer and the old charity closes, so there is a new charity number and a fresh application for HMRC recognition before the CIO can claim Gift Aid. Mandates, contracts and staff all need moving deliberately.",
      },
      {
        question: "How is a CIO different from a charitable company?",
        answer: "Both give trustees a corporate body, so the organisation itself owns what it owns and signs what it signs. A charitable company registers with the Commission and Companies House; a CIO reports to the Commission alone. A charitable company must always prepare accruals accounts, while a CIO under the income boundary may use receipts and payments. Charity law scrutiny applies to both alike, so the saving sits in duplicated filing.",
      },
      {
        question: "Does a CIO need a trading subsidiary?",
        answer: "Only when non-primary-purpose trading outgrows the small trading exemption. That exemption runs on three tiers set by total income, and going over the limit makes all that trade's profits taxable, not only the excess, so the decision is taken ahead of the breach. A subsidiary's profits can be donated up to the parent CIO with no corporation tax due.",
      },
    ],
  },
  // Wave 1 append, docs/charities/_wave1/small-charities.json, 2026-09-27, LEADS_250_PROGRAMME S4a
  {
    slug: "small-charities",
    title: "Small Charities",
    headline: "Accounts, Gift Aid and filing for small charities under the examination threshold",
    metaTitle: "Accountants for Small Charities | Trustee Tax",
    metaDescription: "What a small charity under the £25,000 examination threshold has to file, how Gift Aid and GASDS work, and when growth changes the answer.",
    intro: "You run a small charity on volunteer time, your income sits below the independent examination threshold, and you want to know whether you need an accountant at all. At or below £25,000 gross income the Charities Act asks for no external scrutiny of your accounts, so nothing obliges you to buy one. Plenty still applies: the annual return falls due within 10 months of your financial year end, your trustees have to stand behind the accounts, Gift Aid claims have to survive an HMRC check, and your governing document may impose an examination the law does not. Charities this size usually want a light-touch arrangement rather than a full service, with someone who sets the records up once and is reachable at the year end. Below is what the Commission and HMRC require under the threshold, and the point at which growing income changes the answer.",
    stats: [
      {
        value: "£5,000",
        label: "Income above which a charity in England and Wales must register with the Charity Commission",
      },
      {
        value: "£25,000",
        label: "Gross income above which trustees must arrange an independent examination or an audit (£40,000 for accounting years ending on or after 30 September 2026)",
      },
      {
        value: "10 months",
        label: "Deadline for the annual return after the end of the financial year",
      },
      {
        value: "£8,000",
        label: "Small donations a year that can carry a GASDS top-up, worth up to £2,000",
      },
    ],
    challenges: [
      {
        title: "Working out whether anyone has to look at your accounts",
        body: "The scrutiny requirement switches on above £25,000 of gross income; for years ending on or after 30 September 2026 the gate moves to £40,000. Two things override that comfort: your governing document may require an examination whatever your income, and a funder can write one into a grant agreement. Scotland requires scrutiny at any income.",
      },
      {
        title: "Receipts and payments accounts, and who may not use them",
        body: "A charity that is not a company, with gross income of £250,000 or less, can prepare receipts and payments accounts: cash in, cash out, and a statement of assets and liabilities. Charitable companies cannot use it at any size, because company law requires accruals accounts.",
      },
      {
        title: "Filing something every year even when income is tiny",
        body: "Registration bites once income exceeds £5,000, and a charitable incorporated organisation registers whatever its income. Every registered charity files an annual return within 10 months of its year end, with tiered content: income and spending under £10,000, the return questions between £10,000 and £25,000, and above that the trustees' annual report and accounts attached too. <a href=\"/blog/trustee-compliance/annual-report-vs-annual-return\">Report and return are separate filings</a>.",
      },
      {
        title: "Gift Aid records that were never really kept",
        body: "Gift Aid is worth 25p for every £1 donated, but only where a valid declaration exists. It names the charity and the donor, gives the donor's home address, and states that the donor must pay at least as much UK income or capital gains tax as every charity will reclaim. Records run six years from the end of the accounting period, and unsupported claims are repaid.",
      },
      {
        title: "The small donations scheme and its matching rule",
        body: "GASDS tops up cash and contactless gifts of £30 or less where no declaration is held, on up to £8,000 of donations a tax year. It is not claimed on the same donations as Gift Aid, and cannot exceed ten times the donations you do claim Gift Aid on that year. See <a href=\"/blog/gift-aid/gasds-rules\">the full GASDS rules</a>.",
      },
    ],
    howWeHelp: [
      {
        title: "Setting the records up once, properly",
        body: "How money currently gets recorded is worked through once, then a receipts and payments structure goes in that a volunteer can keep running: fund columns separating restricted from unrestricted money, a donations log that feeds the Gift Aid claim.",
      },
      {
        title: "Year-end accounts, the return and the thresholds",
        body: "The accounts and the statement of assets and liabilities are drawn up, then what the annual return asks at your income level is assembled. Income is tracked against the scrutiny and accounts gates using your accounting year end as the test date, so a threshold is flagged while there is still a year to plan around it.",
      },
      {
        title: "Gift Aid and GASDS claims reviewed before they go",
        body: "Declaration wording and coverage are checked, the claim is tested against the donor benefit limits, and the matching rule is applied so the top-up requested is one HMRC will pay. Run the numbers with the <a href=\"/calculators/gift-aid-calculator\">Gift Aid calculator</a>, then have the claim reviewed before submission rather than after a repayment request.",
      },
      {
        title: "A light-touch arrangement rather than a full service",
        body: "Most charities under the threshold want one fixed annual touchpoint and somewhere to send a question. Introductions from this page are made on that footing, to a firm that works with charities of your size.",
      },
    ],
    faqs: [
      {
        question: "Does a small charity legally need an accountant?",
        answer: "No. Nothing in charity law requires a charity to appoint one, and below £25,000 gross income the Charities Act requires no external scrutiny of the accounts. Trustees stay responsible for proper records, the accounts and filing the annual return on time. What an accountant buys a charity this size is the first set-up, a second pair of eyes on Gift Aid, and someone to call when a grant or a threshold changes the picture.",
      },
      {
        question: "What is the independent examination threshold and is it changing?",
        answer: "Once gross income exceeds £25,000, trustees must arrange external scrutiny: an independent examination, or an audit where the audit thresholds are met. For accounting years ending on or after 30 September 2026 the gate rises to £40,000. Because the rule attaches to the accounting year end rather than the date you happen to look, two charities with identical income can sit on opposite sides of it. <a href=\"/blog/independent-examination-and-audit/what-is-an-independent-examination\">What an examination involves</a> is worth reading first.",
      },
      {
        question: "Can we use receipts and payments accounts?",
        answer: "If your charity is not a company and gross income is £250,000 or less, yes. These accounts record cash in and cash out across the year, with a statement of assets and liabilities at the end, and no accruals or depreciation. For accounting years ending on or after 30 September 2026 that boundary rises to £500,000. Charitable companies are the exception and prepare accruals accounts at any size, because the obligation comes from company law rather than charity law.",
      },
      {
        question: "How much should a small charity hold in reserves?",
        answer: "There is no statutory figure, and a level that suits a grant-funded project will not suit a charity running a building. What matters is a stated policy, reasoned from your own commitments and income pattern, and accounts that show the unrestricted reserves genuinely available rather than total funds. Funders ask for it, and once income passes £25,000 the trustees' annual report is where it gets written down. Our research on <a href=\"/blog/charity-finance/how-much-should-a-charity-hold-in-reserves\">reserves by cause</a> shows the ranges comparable charities report.",
      },
      {
        question: "Can we claim GASDS in our first year?",
        answer: "Yes. The separate two-year track record test went for donations collected after 6 April 2017. What remains is the matching rule: small donations claimed on cannot exceed ten times the donations you claim Gift Aid on in the same tax year. A first-year charity therefore has to make a Gift Aid claim that year to unlock any GASDS at all. The ceiling is £8,000 of small donations, worth up to £2,000, and claims run out two years after the tax year ends.",
      },
      {
        question: "What changes when our income grows past the threshold?",
        answer: "Passing £25,000 brings external scrutiny and a fuller annual return. Passing £250,000 ends receipts and payments accounts for non-company charities and limits who may examine them to members of the professional bodies listed in the Charities Act. An audit becomes mandatory above £1 million of income, or above £250,000 of income where gross assets exceed £3.26 million. Each figure also rises for accounting years ending on or after 30 September 2026.",
      },
    ],
  },
  // Wave 1 append, docs/charities/_wave1/trustees-and-treasurers.json, 2026-09-27, LEADS_250_PROGRAMME S4a
  {
    slug: "trustees-and-treasurers",
    title: "Charity Trustees and Treasurers",
    headline: "Accounts and filing support for charity trustees and treasurers",
    metaTitle: "Accountants for Charity Trustees | Trustee Tax",
    metaDescription: "Support for trustees and volunteer treasurers filing charity accounts and the annual return: accounts format, examination or audit, deadlines.",
    intro: "You keep the books of a registered charity in England or Wales and the filing year is coming round. Three things decide the work: which accounts format applies, receipts and payments or accruals under the Charities SORP; whether the charity needs an independent examination, an audit, or neither; and what the trustees' annual report must contain. Non-company charities with gross income of £250,000 or less may prepare receipts and payments accounts; charitable companies always prepare accruals accounts. External scrutiny starts once gross income passes £25,000, and an audit is mandatory above £1 million of income, or above £250,000 of income where gross assets exceed £3.26 million. The annual return itself is due 10 months after the year end. The <a href=\"/calculators/independent-examination-vs-audit-checker\">examination versus audit checker</a> settles the scrutiny question. Thresholds rise for accounting years ending on or after 30 September 2026, so check your year end.",
    stats: [
      {
        value: "£25,000",
        label: "Gross income above which trustees must arrange an independent examination or audit (£40,000 for accounting years ending on or after 30 September 2026)",
      },
      {
        value: "10 months",
        label: "Deadline for the Charity Commission annual return, measured from the financial year end",
      },
      {
        value: "£250,000",
        label: "Income ceiling for receipts and payments accounts at a non-company charity (£500,000 for accounting years ending on or after 30 September 2026)",
      },
      {
        value: "£1 million",
        label: "Income above which a statutory audit is mandatory, or £250,000 of income with gross assets over £3.26 million",
      },
    ],
    challenges: [
      {
        title: "Picking the wrong accounts format",
        body: "Receipts and payments accounts are a cash summary with a statement of assets and liabilities. Accruals accounts follow the Charities SORP: a statement of financial activities, a balance sheet and notes. A non-company charity may use receipts and payments only up to £250,000 of gross income. Every charitable company prepares accruals accounts whatever its size, because company law requires it. Treasurers who inherit a spreadsheet tend to continue the format their predecessor used rather than the one the charity now needs.",
      },
      {
        title: "Reading the audit gate as an income test only",
        body: "That rule has two limbs. Income over £1 million triggers an audit on its own. So does income over £250,000 combined with gross assets above £3.26 million. A charity with £400,000 of income and a £4 million building is in the audit band even though its income sits in the examination range. Check income alone and you commission an examination that cannot satisfy the requirement. Governing documents and funders can also force an audit below these gates.",
      },
      {
        title: "The annual return and the annual report are different filings",
        body: "One is an online form, the other a narrative prepared with the accounts. At income under £10,000 the return carries two totals and nothing else. From £10,000 to £25,000 the return questions have to be answered. Above £25,000 the trustees' annual report and accounts are attached as well, and a missing attachment leaves the filing incomplete on the public register. The <a href=\"/blog/trustee-compliance/charity-commission-annual-return-guide\">annual return guide</a> sets out the split.",
      },
      {
        title: "A thin trustees' annual report",
        body: "Your report must cover what the charity did in the year, how that delivered public benefit, who the trustees are and how they were appointed, and how the charity is governed. Reserves, risks and a financial review are expected as income grows. First-time reports are often two paragraphs of activity with no public benefit statement, the omission a case worker notices first.",
      },
      {
        title: "Working out which SORP edition applies",
        body: "A new edition of the Charities SORP applies to accounting periods beginning on or after 1 January 2026, so charities cross that boundary at different times. The edition follows the accounting period, not the date of preparation, and comparatives and disclosure notes hang off it.",
      },
    ],
    howWeHelp: [
      {
        title: "Settling the format and scrutiny level first",
        body: "Before figures are drafted, a specialist reviews your income, gross assets, legal form, year end and governing document, then confirms which accounts format applies and whether an examination or an audit is needed. Because the England and Wales thresholds rise for accounting years ending on or after 30 September 2026, the year end is checked, not assumed.",
      },
      {
        title: "Preparing the accounts",
        body: "Your accountant prepares receipts and payments or SORP accruals accounts from your records, keeps restricted and unrestricted funds apart, and reconciles income back to source. Where the accruals route applies, the SORP edition is fixed to the accounting period at the start so the notes are built once.",
      },
      {
        title: "Drafting the trustees' annual report with you",
        body: "The narrative comes from what the charity actually did: objects, activities, public benefit, governance, trustee appointments, reserves and risks, at the depth your income calls for. Trustees review and approve it. For the section-by-section shape, see the <a href=\"/blog/trustee-compliance/trustees-annual-report-guide\">guide to the trustees' annual report</a>.",
      },
      {
        title: "Arranging external scrutiny",
        body: "Where an examination is needed, an independent examiner carries out the work and issues the report. Above £250,000 of gross income that examiner must belong to one of the professional bodies named in the Charities Act, so eligibility is confirmed before the engagement starts. The <a href=\"/services/independent-examination\">independent examination service</a> covers how that runs.",
      },
      {
        title: "Filing, then the year ahead",
        body: "The annual return goes in with the report and accounts attached where income requires it, inside the 10 month window. Afterwards you get a short note on next year: the threshold you sit closest to, the effect of the higher figures once your year end passes 30 September 2026, and what to record differently.",
      },
    ],
    faqs: [
      {
        question: "Does our charity need an independent examination or an audit?",
        answer: "It turns on gross income and gross assets. At or below £25,000 the Charities Act requires no external scrutiny, though your governing document or a funder still can. Above £25,000 trustees must arrange an examination or an audit. An audit is mandatory once income exceeds £1 million, or income exceeds £250,000 and gross assets exceed £3.26 million. For accounting years ending on or after 30 September 2026 those figures become £40,000, £1.5 million, £500,000 and £5 million.",
      },
      {
        question: "Can we prepare receipts and payments accounts?",
        answer: "Only if the charity is not a company and its gross income is £250,000 or less, rising to £500,000 for accounting years ending on or after 30 September 2026. Receipts and payments accounts summarise money in and out with a statement of assets and liabilities. Charitable companies prepare accruals accounts whatever their size, because the Companies Act requires it. Charitable incorporated organisations are not companies, so the income test decides.",
      },
      {
        question: "When is the annual return due?",
        answer: "Within 10 months of the end of the charity's financial year, so a 31 March year end falls due by 31 January. What goes with it depends on income: two totals only under £10,000, the return questions in the £10,000 to £25,000 band, and over £25,000 the trustees' annual report and accounts as attachments.",
      },
      {
        question: "Which version of the Charities SORP applies to us?",
        answer: "The edition follows your accounting period. The new SORP applies to periods beginning on or after 1 January 2026, so a charity with a 31 December year end crosses over a year before one with a 30 June year end. Fix the period first, then the edition, then the disclosures. The <a href=\"/blog/charity-accounts-and-sorp/charity-sorp-2026-changes\">write-up of the 2026 SORP changes</a> covers what moves. Receipts and payments accounts do not follow the SORP at all.",
      },
      {
        question: "We are a Scottish charity. Do these figures apply?",
        answer: "No. These are the England and Wales rules set by the Charity Commission. Scottish charities come under OSCR under separate regulations, where every charity needs external scrutiny whatever its income, and where the recent threshold change runs from financial years beginning on or after 1 January 2026 rather than from year ends. Tell us the country of registration at the outset and the work is scoped to that regime.",
      },
    ],
  },
  // Wave 1 append, docs/charities/_wave1/grant-making-trusts-and-foundations.json, 2026-09-27, LEADS_250_PROGRAMME S4a
  {
    slug: "grant-making-trusts-and-foundations",
    title: "Grant-Making Trusts and Foundations",
    headline: "Accounts and tax for grant-making trusts and foundations",
    metaTitle: "Grant-Making Charity Accountants | Trustee Tax",
    metaDescription: "Accounts, annual returns and tax for grant-making trusts and family foundations: endowment, total return, grant commitments and related-party grants.",
    intro: "An endowment that is held, invested and given away as income changes what the accounts have to show. Investment income and gains are exempt from tax while the money is applied to charitable purposes, so most years bring no tax bill and no return unless HMRC asks or non-charitable expenditure arises. The reporting is where the work sits: which funds are permanent endowment and what trustees may spend, whether the charity invests on a total return basis, when a grant becomes a liability rather than a plan, and how grants to connected people are disclosed. All of it has to hold together before the annual return and the trustees' annual report go in.",
    stats: [
      {
        value: "£25,000",
        label: "Fund market value above which Commission authority is needed before spending permanent endowment",
      },
      {
        value: "25%",
        label: "Most a charity may borrow from its permanent endowment without Commission authority, repayable within 20 years",
      },
      {
        value: "10 months",
        label: "Deadline for the Charity Commission annual return after the financial year end",
      },
      {
        value: "1 January 2026",
        label: "Charities SORP 2026 applies to accounting periods beginning on or after this date",
      },
    ],
    challenges: [
      {
        title: "Knowing what the endowment actually permits",
        body: "Permanent endowment is property the charity must keep rather than spend. Sections 281 to 284D of the Charities Act 2011 give trustees a power to release it, but the route turns on the market value of the whole fund, not the sum you want to spend. At £25,000 or less trustees can resolve to spend it themselves; above that the Commission must authorise it.",
      },
      {
        title: "Total return and the unapplied balance",
        body: "Investing on a total return basis stops the split between income and capital and lets trustees allocate from one pot each year. The accounts must then show the trust for investment, the unapplied total return, and the allocation made. Where a foundation adopted total return years ago and the records thinned out, rebuilding that balance comes first.",
      },
      {
        title: "When a grant becomes a commitment",
        body: "Awarding a grant and paying it are different events, and the accounts follow neither the board minute nor the bank statement automatically. A liability arises when the charity has an obligation the recipient can rely on, so multi-year awards, milestone-conditional awards and withdrawable awards land differently. Get it wrong and expenditure shifts between years, distorting reserves.",
      },
      {
        title: "Grants to connected people and organisations",
        body: "Family foundations often give to bodies a trustee founded, chairs or works for. That is not prohibited, but it is a related party matter and accruals accounts must disclose it. The conflict needs minuting before the award, and any benefit flowing back to a trustee tested separately.",
      },
      {
        title: "Investment costs, VAT and non-charitable expenditure",
        body: "Management charges on the portfolio belong with the cost of generating funds, not buried inside charitable activity, and there is no blanket VAT exemption for charities, so those fees are usually a cost you carry. The tax exemptions are conditional too: grants outside the objects, and certain loans and investments, count as non-charitable expenditure.",
      },
    ],
    howWeHelp: [
      {
        title: "Annual accounts under the right framework",
        body: "Which framework applies is settled first: receipts and payments where the law still allows it, otherwise accruals accounts under the Charities SORP, applying in its 2026 edition to periods beginning on or after 1 January 2026. See <a href=\"/blog/charity-accounts-and-sorp/charity-sorp-2026-changes\">what changed in SORP 2026</a>.",
      },
      {
        title: "Endowment and total return review",
        body: "A specialist reads the trust deed against the statutory powers, separates permanent endowment from expendable funds, and records what trustees may release without Commission authority. Where the charity invests on a total return basis, the unapplied total return is reconstructed and the allocation evidenced.",
      },
      {
        title: "Grant accounting and related-party disclosure",
        body: "Awards are tested against the point a commitment becomes a liability, multi-year and conditional grants scheduled, and payments to connected parties picked up from the trustee register. The notes then show who received what, on what terms.",
      },
      {
        title: "Annual return, trustees' report and external scrutiny",
        body: "Figures for the annual return and the trustees' annual report come together in one pass, filed within the ten months allowed. Where income triggers independent examination or audit, the file is built for the examiner rather than handed over raw. Start with <a href=\"/calculators/independent-examination-vs-audit-checker\">the scrutiny checker</a> and the <a href=\"/blog/trustee-compliance/trustees-annual-report-guide\">trustees' annual report guide</a>.",
      },
      {
        title: "Tax position and HMRC recognition",
        body: "Recognition by HMRC is separate from registration with the Commission, and the exemptions depend on it. The income mix and the portfolio are checked for anything falling outside those exemptions, a view taken on whether a return is due, and any loan or investment that would count as non-charitable expenditure flagged.",
      },
    ],
    faqs: [
      {
        question: "Does a grant-making charity pay tax on its investment income?",
        answer: "Generally no. Charities pay no tax on most types of income, investment income included, while the money is used for charitable purposes and the charity is recognised by HMRC. The exemption is conditional: income that does not qualify for relief, or income spent on non-charitable purposes, can bring tax and a return. HMRC can also issue a notice to file at any time.",
      },
      {
        question: "Can trustees spend permanent endowment?",
        answer: "Sometimes, and the route depends on the size of the fund rather than the spend. Where the market value of the whole fund is £25,000 or less, trustees can resolve to spend it if satisfied the charity's purposes would be met more effectively that way. Above £25,000 the Commission must authorise the release. Trustees can also borrow up to 25% of the fund's value, repaying within 20 years.",
      },
      {
        question: "What is total return investment and does our foundation need it?",
        answer: "It lets trustees treat income and capital growth as one return and decide each year how much to allocate to spending, instead of being limited to dividends and interest. That suits a foundation wanting a steady spending rate from a growth portfolio. It carries reporting consequences: the trust for investment, the unapplied total return and the allocation all appear in the accounts. It is not automatically right for a small fund.",
      },
      {
        question: "When does a grant we have awarded go into the accounts?",
        answer: "Expenditure is recognised when the charity has an obligation the recipient can rely on, usually once the award is communicated with no conditions left in the charity's own control. An award still subject to trustee discretion, or dependent on a future condition, is generally not yet a liability. Multi-year awards are split, with amounts payable after twelve months shown separately. Award letters decide this, not minutes.",
      },
      {
        question: "Do we have to disclose grants to organisations our trustees are involved with?",
        answer: "Yes, where the accounts are on an accruals basis. Grants to a body a trustee controls, founded, chairs or significantly influences are related party transactions and belong in the notes with enough detail to be understood. The grant itself is usually lawful. What draws criticism is an undisclosed one, or one awarded without the conflicted trustee standing back.",
      },
      {
        question: "Does a small grant-making trust still have to file an annual return?",
        answer: "Every registered charity in England and Wales files something. Under £10,000 of income only two totals are entered; the £10,000 to £25,000 band adds the annual return questions; over £25,000 the trustees' annual report and accounts go with it. The deadline is ten months after the year end in every case. Our <a href=\"/blog/trustee-compliance/charity-commission-annual-return-guide\">annual return walkthrough</a> covers what catches trustees out.",
      },
      {
        question: "Does our foundation need an independent examination?",
        answer: "It depends on gross income. In England and Wales an examination becomes a legal requirement above £25,000 of gross income, and for accounting years ending on or after 30 September 2026 that gate rises to £40,000. Above the audit thresholds an examination is not enough and a statutory audit is required. A trust deed or funder can require scrutiny the law would not.",
      },
    ],
  },
];

export function getCharityType(slug: string): CharityType | undefined {
  return charityTypes.find((t) => t.slug === slug);
}
