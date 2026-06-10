export type MedicalGuide = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  summary: string;
  readTime: string;
  audience: string[];
  sections: {
    heading: string;
    body: string;
  }[];
  keyPoints: string[];
  relatedGuides: string[];
  relatedPosts?: { href: string; title: string }[];
};

export const MEDICAL_GUIDES: MedicalGuide[] = [
  {
    slug: "nhs-pension-annual-allowance",
    title: "NHS Pension Annual Allowance: A Complete Guide for UK Doctors",
    metaTitle: "NHS Pension Annual Allowance Guide for Doctors | GP & Consultant Tax",
    metaDescription:
      "Everything UK doctors need to know about the NHS pension annual allowance: pension input amounts, the tapered allowance, Scheme Pays elections, and carry-forward claims. Updated for 2025/26.",
    eyebrow: "NHS pension",
    summary:
      "The NHS pension annual allowance is one of the most misunderstood areas of medical finance. This guide explains pension input amounts, the tapered allowance, Scheme Pays, and carry-forward in plain terms.",
    readTime: "12 min",
    audience: ["GP Partners", "Salaried GPs", "Hospital Consultants", "Locum Doctors"],
    sections: [
      {
        heading: "What is the annual allowance?",
        body: "The annual allowance (AA) is the maximum amount of pension savings that can grow in a tax year without triggering an income tax charge. For 2025/26, the standard annual allowance is £60,000. This applies to all your pension savings combined, including both the deemed growth in your NHS Pension Scheme entitlement and any contributions to personal pensions or additional voluntary contributions.\n\nFor defined benefit schemes like the NHS Pension Scheme, the pension input is not simply what you pay in. Instead, it is calculated as the increase in your pension entitlement over the pension input period, multiplied by a factor of 16 (for the 1995 and 2008 sections) or 1/54th of pensionable pay for the 2015 section, then revalued and compared to the opening value. This means your pension input can increase significantly in years where your salary grows substantially.",
      },
      {
        heading: "How the NHS Pension Scheme calculates pension input",
        body: "The NHS Pension Scheme is a defined benefit scheme. Your pension input amount (PIA) is calculated by the NHS Business Services Authority (NHSBSA) using the following method:\n\n1995 section: (closing pension x 16) minus (opening pension x 16 x CPI adjustment)\n2008 section: (closing pension x 16) minus (opening pension x 16 x CPI adjustment)\n2015 section: (closing pension entitlement x 16) minus (opening pension entitlement x 16 x CPI adjustment)\n\nThe NHSBSA issues Pension Savings Statements when your pension input exceeds the standard annual allowance. However, these statements are not issued proactively for everyone who may be affected by the tapered annual allowance (TAA), which has a lower threshold. You should not wait for a statement: we calculate your pension input from your pensionable pay data each year.",
      },
      {
        heading: "The tapered annual allowance for high earners",
        body: "The tapered annual allowance (TAA) reduces the annual allowance for individuals with high incomes. For 2025/26, the taper works as follows:\n\nThreshold income: £200,000. If your threshold income (broadly, total income before pension contributions) is below £200,000, you are not subject to tapering regardless of your adjusted income.\n\nAdjusted income: £260,000. If your adjusted income (threshold income plus the value of all employer pension contributions and pension input amounts) exceeds £260,000, your annual allowance is reduced by £1 for every £2 of adjusted income above £260,000. The minimum tapered allowance is £10,000.\n\nFor GP partners with significant pensionable pay growth, the interaction of partnership income, the NHS pension growth, and other income can push adjusted income above the taper threshold even without feeling particularly high-earning. We model this calculation annually for all affected clients.",
      },
      {
        heading: "Carry-forward: using unused allowances from prior years",
        body: "If you have not used your full annual allowance in the three previous tax years, you can carry forward the unused amount to the current year. This can significantly increase your effective allowance if you have been under the threshold in previous years.\n\nCarry-forward is particularly useful for GPs and consultants who have seen large increases in pensionable pay in recent years: the prior years' unused allowances may offset a current-year charge. To use carry-forward, you must have been a member of a registered pension scheme in each year from which you carry forward. The NHS Pension Scheme qualifies. We calculate carry-forward availability as part of our annual allowance review for every client it affects.",
      },
      {
        heading: "Scheme Pays: deferring an annual allowance charge",
        body: "If you have an annual allowance charge of £2,000 or more AND your pension input amount exceeds the annual allowance, you can elect for the NHS Pension Scheme to pay the charge on your behalf. The scheme then reduces your eventual pension entitlement at retirement to recoup the charge, based on actuarial factors.\n\nScheme Pays is often the right choice for doctors who face a charge but do not want to make a lump-sum payment to HMRC now. However, it is not always optimal: the actuarial reduction applied to your pension at retirement may cost you more in pension value than the tax charge would have cost you in cash, depending on how long you live and when you retire. We model both scenarios before recommending Scheme Pays or a direct HMRC payment.",
      },
      {
        heading: "What to do if you receive a Pension Savings Statement",
        body: "If your pension input amount exceeds the standard annual allowance (£60,000 for 2025/26), the NHSBSA should issue you a Pension Savings Statement. You should not assume this statement is correct: known errors exist, particularly for members who changed scheme sections, had part-year changes to pensionable pay, or whose records include corrections. If you receive a statement, bring it to us before doing anything else. We verify the underlying data, check carry-forward availability, assess the TAA position, and advise on Scheme Pays vs direct payment.",
      },
    ],
    keyPoints: [
      "Standard annual allowance for 2025/26 is £60,000 across all pension arrangements.",
      "NHS Pension Scheme pension input is based on the growth in your defined benefit entitlement, not your contributions.",
      "The tapered annual allowance reduces your limit to as low as £10,000 if adjusted income exceeds £260,000.",
      "Carry-forward allows unused allowances from the three prior years to offset a current-year excess.",
      "Scheme Pays defers the charge against your eventual pension, but may not always be the cheapest option.",
      "NHSBSA Pension Savings Statements are not always accurate: verify the underlying data before acting.",
    ],
    relatedGuides: [
      "gp-partnership-accounts",
      "consultant-private-practice-tax",
      "locum-limited-company-vs-umbrella",
    ],
    relatedPosts: [
      { href: "/blog/nhs-pension-annual-allowance-complete-guide", title: "NHS Pension Annual Allowance Complete Guide" },
      { href: "/blog/nhs-pension-tapered-annual-allowance-calculator", title: "NHS Pension Tapered Annual Allowance Calculator" },
      { href: "/blog/nhs-pension-tax-charges-how-to-minimize", title: "NHS Pension Tax Charges: How to Minimise Them" },
      { href: "/blog/gp-pension-contributions-tax-relief", title: "GP Pension Contributions and Tax Relief" },
    ],
  },
  {
    slug: "consultant-private-practice-tax",
    title: "Consultant Private Practice Tax: A Complete Guide",
    metaTitle: "Consultant Private Practice Tax Guide | NHS & Private Income for Consultants",
    metaDescription:
      "How UK hospital consultants should handle private practice income for tax: income treatment, private practice company structures, medico-legal work, NHS pension interaction, and expense claims. Updated 2025/26.",
    eyebrow: "Consultant tax",
    summary:
      "Managing NHS salary alongside private practice income creates a complex tax picture. This guide covers the right income treatment, when to incorporate your private practice, medico-legal work, and NHS pension planning for consultants.",
    readTime: "10 min",
    audience: ["Hospital Consultants", "GP Principals with Private Work"],
    sections: [
      {
        heading: "How private practice income is taxed",
        body: "Private patient fees earned directly by a consultant (not through a company) are taxable as self-employment income on self-assessment. They do not go through the same PAYE system as your NHS salary. This means you are responsible for declaring them on your tax return, paying Class 4 National Insurance contributions (6% on profits between £12,570 and £50,270, 2% above) and making payments on account twice annually.\n\nThe combination of NHS PAYE income and self-employment private practice income affects your overall marginal rate and your payment on account schedule. Many consultants we onboard are surprised to find that HMRC is owed significantly more than expected, either because private income was not factored into their payment on account calculation or because their tax code did not reflect additional income.",
      },
      {
        heading: "Setting up a private practice company",
        body: "Incorporating your private practice into a limited company can reduce your income tax and National Insurance if the following conditions broadly hold: your private income is consistently above £80,000-£100,000 per year, you have a non-working or lower-earning spouse or adult child who could be a shareholder, and you have flexibility over when you draw income from the company.\n\nThe company pays corporation tax at 25% (for profits above £250,000; smaller profits attract relief). You can then draw a low salary (reducing NI) and take the remainder as dividends taxed at lower rates than employment income. The differential between employment tax rates and dividend rates provides the saving.\n\nHowever, private practice income remains outside the NHS Pension Scheme regardless of whether it is paid personally or through a company. This is an important consideration: if growing your NHS pension is a priority, keeping private income personal and managing the tax position differently may be a better strategy. We model both approaches at your actual income levels.",
      },
      {
        heading: "Medico-legal income: the correct treatment",
        body: "Income from expert witness reports, medico-legal assessments, and court appearance fees is self-employment income, not employment income. It sits on self-assessment schedule D (trading income), attracts Class 4 NI, and has its own allowable expense profile.\n\nHMRC's position on VAT for medico-legal work has evolved. Pure expert witness services (preparing reports for use in legal proceedings) are generally exempt from VAT as medical services. However, some advisory or investigative services that do not meet the narrow definition of a medical service for healthcare purposes may be taxable. If your medico-legal income is approaching £90,000 from taxable activities, we assess the position and register for VAT if required.\n\nAllowable expenses for medico-legal work include: proportion of professional indemnity covering medico-legal activities, specialist software, dictation equipment, home office proportion, and motor travel for appointments.",
      },
      {
        heading: "NHS pension interaction with private practice",
        body: "Your NHS Pension Scheme membership is based on your NHS employment. Private practice income does not contribute to your NHS pension entitlement regardless of how it is paid.\n\nHowever, private income significantly affects your annual allowance position. High private income increases your threshold income and adjusted income, potentially pulling you into the tapered annual allowance even if your NHS pension growth alone would not. If you are also growing your NHS pension through substantial pay increases, the combination can generate significant annual allowance charges.\n\nSome consultants with high private income choose to reduce or cease NHS Pension Scheme membership (opting out) and direct pension saving to a personal pension or SIPP. This is a significant decision with long-term implications. We model the lifetime pension value comparison before recommending it.",
      },
      {
        heading: "Allowable expenses for hospital consultants",
        body: "Consultants working privately (whether personally or through a company) can claim a range of expenses that are often under-claimed:\n\nProfessional indemnity: MDU, MPS, or MDDUS premiums attributable to private practice activities. If you have a single indemnity policy covering both NHS and private work, the private proportion is claimable.\n\nRoyal College subscriptions and GMC retention: fully allowable.\n\nCPD and conference costs: travel, registration, accommodation for medical education events. Claimable for private practice activities.\n\nConsulting room costs: if you consult from home, a proportion of relevant costs is claimable. If you use a private hospital's rooms and pay a facility fee, those fees are a direct business expense.\n\nTravel: mileage between NHS base and private hospitals, to medico-legal appointments, to educational events. Home-to-NHS-base travel is not claimable.",
      },
    ],
    keyPoints: [
      "Private practice fees earned personally are taxed as self-employment income with Class 4 NI.",
      "A private practice company saves tax when private income is consistently above £80,000-£100,000 with appropriate shareholder structure.",
      "Medico-legal income is self-employment income; its VAT status depends on the nature of the work.",
      "Private income increases your adjusted income and can trigger the tapered annual allowance.",
      "Professional indemnity, GMC, Royal College subscriptions, and CPD are allowable expenses.",
      "NHS pension growth and private income interact: model both before making structural changes.",
    ],
    relatedGuides: [
      "nhs-pension-annual-allowance",
      "medical-expenses-tax-treatment",
      "gp-partnership-accounts",
    ],
    relatedPosts: [
      { href: "/blog/private-practice-tax-nhs-and-private-income", title: "Private Practice Tax: NHS and Private Income" },
      { href: "/blog/medical-practice-incorporation-step-by-step", title: "Medical Practice Incorporation Step by Step" },
      { href: "/blog/gp-limited-company-tax-benefits-drawbacks", title: "GP Limited Company: Tax Benefits and Drawbacks" },
    ],
  },
  {
    slug: "gp-partnership-accounts",
    title: "GP Partnership Accounts: What Every GP Partner Needs to Know",
    metaTitle: "GP Partnership Accounts Guide | Tax & Accounts for GP Practices",
    metaDescription:
      "How GP partnership accounts work: profit allocation, NHS superannuation, notional rent, basis period reform, and individual tax returns for GP partners. Updated for 2025/26.",
    eyebrow: "GP accounts",
    summary:
      "GP partnership accounts are more complex than most accountants assume. This guide covers profit allocation, NHS superannuation, notional rent, the basis period reform, and how individual partners file their tax returns.",
    readTime: "9 min",
    audience: ["GP Partners", "Salaried GPs considering Partnership"],
    sections: [
      {
        heading: "What goes into GP partnership accounts?",
        body: "GP partnership accounts are financial statements prepared for the practice as a whole. They include all income received by the practice (General Medical Services contract income, enhanced services income, dispensing income if applicable, private clinical income, and any rental income from property), all expenditure (staff costs, premises, drugs, equipment, locum costs), and the resulting profit available for distribution among the partners.\n\nPartnership accounts for NHS GP practices must also deal with specific items that do not appear in most business accounts:\n\nNHS superannuation: NHS employer and employee pension contributions, which must be correctly deducted from the practice's reimbursable income before the net profit is calculated.\n\nNotional rent: where the practice occupies premises it owns, NHSE pays notional rent reimbursement. This is income for the partnership but does not constitute trading income in the same way as GMS income.\n\nDrug dispensing income and reconciliation: for dispensing practices, the reimbursement system involves complex reconciliations between drug costs and payments received.",
      },
      {
        heading: "How profit is allocated between partners",
        body: "GP partnerships typically allocate profit according to a partnership agreement, which may specify equal shares, differential shares based on sessions worked, or a formula that includes a guaranteed minimum plus a variable element based on performance.\n\nProfit allocation becomes complex when:\n\nPartners join or leave during the year, requiring apportionment of the annual profit to each partner's period of membership.\n\nSome partners reduce their sessions (e.g., parental leave or clinical commitments outside the practice) and the partnership agreement has provisions for adjusted shares.\n\nThe practice earns income from enhanced services or clinical work that is attributable to specific partners rather than shared equally.\n\nWe prepare individual partner profit share schedules as part of the annual accounts, which feed directly into each partner's self-assessment return.",
      },
      {
        heading: "The basis period reform and its implications for GP partners",
        body: "From 2023/24 onwards, all self-employed individuals (including GP partners) are taxed on the profits arising in the tax year (6 April to 5 April), regardless of their accounting year-end. This change eliminated the old 'current year basis' and associated overlap profits.\n\nFor GP practices with an accounting year-end other than 31 March or 5 April, the transition year (2023/24) required apportionment of profits from two sets of accounts to create a tax-year basis figure. There was also a transitional relief that spread any additional taxable profits from the transition over five years.\n\nGoing forward, practices with a non-tax-year-end will need to apportion profits each year, which adds complexity to the accounts preparation process. We handle this apportionment and coordinate it with each partner's self-assessment filing.",
      },
      {
        heading: "NHS superannuation and the annual certificate",
        body: "GP partners pay NHS pension contributions at tiered rates on their NHS pensionable earnings. The pensionable earnings for GP partners are calculated from the practice's NHS income (net of practice expenses as defined by NHS England) rather than from the partner's profit share directly.\n\nEach year, GP partners must complete a pensionable pay certificate to submit to the NHSBSA. This is based on the practice accounts figures, adjusted for NHS superannuation purposes. Errors in the pensionable pay certificate can result in incorrect pension input amounts, which then affect the annual allowance calculation.\n\nWe prepare the pensionable pay certificates as part of our annual accounts service for GP partnerships.",
      },
      {
        heading: "Admitting new partners: the tax implications",
        body: "When a new GP partner joins the practice, several things need to happen from an accounting and tax perspective:\n\nThe partnership agreement is updated to reflect the new partner's share and join date.\n\nThe practice accounts are prepared showing the profit allocation for the period before and after the new partner's entry, so each partner is taxed only on their proportionate share.\n\nThe new partner begins paying NHS superannuation on their pensionable earnings from the date of entry.\n\nThe new partner must register for self-assessment (if not already registered) and file their first partnership return.\n\nWe coordinate the admission paperwork, accounts preparation, and individual return filing to ensure the transition is handled without gaps or errors.",
      },
    ],
    keyPoints: [
      "GP partnership accounts include GMS income, enhanced services, dispensing income, and notional rent, alongside NHS superannuation and other expenditure.",
      "Profit allocation follows the partnership agreement and must be apportioned when partners join or leave mid-year.",
      "From 2023/24, GP partners are taxed on a tax-year basis regardless of the practice's accounting year-end.",
      "Pensionable pay certificates must be submitted annually to the NHSBSA; errors affect annual allowance calculations.",
      "New partner admissions require updated accounts, individual self-assessment registration, and NHS pension enrolment.",
    ],
    relatedGuides: [
      "nhs-pension-annual-allowance",
      "medical-expenses-tax-treatment",
      "consultant-private-practice-tax",
    ],
    relatedPosts: [
      { href: "/blog/gp-partnership-tax-complete-guide", title: "GP Partnership Tax Complete Guide" },
      { href: "/blog/gp-partnership-profit-sharing-tax-planning", title: "GP Partnership Profit Sharing and Tax Planning" },
      { href: "/blog/becoming-gp-partner-financial-implications", title: "Becoming a GP Partner: Financial Implications" },
      { href: "/blog/gp-partner-vs-salaried-gp-tax-comparison", title: "GP Partner vs Salaried GP: Tax Comparison" },
    ],
  },
  {
    slug: "locum-limited-company-vs-umbrella",
    title: "Locum Doctor: Limited Company vs Umbrella vs Sole Trader",
    metaTitle: "Locum Doctor Ltd Company vs Umbrella | Locum Tax Structure Guide",
    metaDescription:
      "Which locum tax structure is right for you? Compare limited company, umbrella company, and sole trader for locum doctors. IR35 interaction, take-home comparison, and NHS pension. Updated 2025/26.",
    eyebrow: "Locum structure",
    summary:
      "The choice between limited company, umbrella, and sole trader determines how much of your locum income you keep. This guide explains when each structure wins, how IR35 interacts with the decision, and what the real take-home difference looks like.",
    readTime: "11 min",
    audience: ["Locum Doctors", "Junior Doctors with Locum Income"],
    sections: [
      {
        heading: "The three structures: what they mean in practice",
        body: "Sole trader (self-employed): You work as an individual, invoice practices or agencies directly, and report income on self-assessment. You pay income tax at your marginal rate plus Class 4 NI (6% on profits between £12,570 and £50,270, 2% above). You can claim all allowable business expenses. This is the simplest structure and suits most locums earning below £70,000-£80,000 from outside-IR35 engagements.\n\nLimited company: You incorporate a company, which receives the locum fees. The company pays corporation tax (19% up to £50,000 profit; 25% above £250,000; marginal relief applies between). You draw a salary (usually set at the NI primary threshold to minimise NI) and dividends. Dividends are taxed at lower rates than employment income (8.75% basic, 33.75% higher rate for 2025/26), creating a tax saving over sole trader status.\n\nUmbrella company: An umbrella employs you on an employment contract, processes your income through PAYE, and charges a margin (typically £15-£30 per week). You have employment rights but pay income tax and NI as an employee. Umbrellas are often used for inside-IR35 engagements where working through your own company is not tax-efficient.",
      },
      {
        heading: "How IR35 interacts with the structure choice",
        body: "IR35 is the legislation that treats certain self-employed workers as employees for tax purposes if their working arrangements resemble employment. For locum doctors, the IR35 assessment depends on the nature of each engagement:\n\nDirect GP locum work (sessional, not through an agency): HMRC has historically viewed most direct GP locum engagements as outside IR35, primarily because of the lack of substitution restrictions and the way NHS practices engage sessional GPs. However, this is a factual assessment: the actual working arrangements must support outside-IR35 status.\n\nAgency-introduced NHS work: Where you work through an NHS staffing agency and the agency has issued a Status Determination Statement (SDS) saying you are inside IR35, you cannot run the income through a limited company tax-efficiently. The agency must deduct income tax and NI at source.\n\nPrivate hospital or independent sector work: Status depends on the contract and working arrangements. We review each engagement separately.\n\nIf most of your engagements are outside IR35, a limited company may significantly improve your take-home. If most are inside IR35, a limited company adds compliance cost without tax benefit, and the umbrella or sole trader route may be more practical.",
      },
      {
        heading: "Take-home comparison at typical locum income levels",
        body: "The following comparison illustrates the approximate net take-home under each structure for a locum doctor with £100,000 of outside-IR35 income in 2025/26, single person, no other income:\n\nSole trader: After income tax (including the 60% effective rate on income between £100,000-£125,140 due to personal allowance withdrawal), Class 4 NI, and pension contributions, net take-home is approximately £55,000-£60,000 depending on pension contributions and allowable expenses.\n\nLimited company (optimised extraction): Salary of £12,570 (below NI threshold), remainder as dividends across director and spouse shareholders (if applicable). Corporation tax plus dividend tax combined is typically lower than sole trader income tax plus NI, giving net take-home of approximately £65,000-£70,000 on the same gross income.\n\nUmbrella: Treated as employment, so income tax, employee NI, and employer NI all apply. Umbrella fee also deducted. Net take-home is typically the lowest of the three structures, often £50,000-£55,000.\n\nThese figures are illustrative. The actual difference depends on your spouse's income, pension contributions, allowable expenses, and whether you have a mixed inside/outside-IR35 portfolio. We model the exact numbers for your specific situation.",
      },
      {
        heading: "NHS pension access across the three structures",
        body: "Sole trader GP locums: Can join the NHS Pension Scheme as a type 2 medical practitioner for direct sessional work with GP practices. The practice deducts your employee contribution from the sessional fee; you pay the employer contribution (currently 23.7% of pensionable earnings) via self-assessment.\n\nLimited company directors: NHS pension access depends on the nature of your engagement. If working through a limited company on outside-IR35 basis directly with GP practices, access to the type 2 scheme may still be possible but requires careful structuring. For most limited company locums, NHS pension access is lost, making a separate personal pension (SIPP or personal pension) the alternative.\n\nUmbrella employees: Where the umbrella is engaged on an NHS contract, you may retain access to the NHS Pension Scheme as a type 1 member (employee), depending on the umbrella's NHSBSA registration.\n\nThe NHS Pension Scheme is one of the most valuable employer pension schemes in the UK. Losing access to it is a significant cost that must be included in any take-home comparison.",
      },
      {
        heading: "When to switch structures",
        body: "The right time to incorporate is when all of the following broadly apply:\n\n1. Your sustained locum income from outside-IR35 engagements is consistently above £80,000-£100,000.\n2. You have a shareholder structure that allows income splitting (spouse or adult child with lower income).\n3. You can afford to leave some income inside the company, building reserves over time rather than extracting everything annually.\n4. You have either accepted that NHS pension access may be restricted, or you have a plan for alternative pension provision.\n\nBelow £80,000 in outside-IR35 income, the tax saving from a limited company typically does not justify the additional accounting fees, company compliance requirements, director duties, and loss of NHS pension access. We review the threshold annually and advise proactively when the case for incorporation becomes clear.",
      },
    ],
    keyPoints: [
      "Sole trader suits most locums earning below £80,000 from outside-IR35 work; it is the simplest structure.",
      "A limited company saves approximately £5,000-£15,000 annually for locums earning £80,000-£150,000 from outside-IR35 engagements with appropriate shareholder structure.",
      "Umbrella is typically the lowest-take-home option but may be required for inside-IR35 engagements.",
      "NHS pension access may be restricted for limited company directors; factor this into the take-home comparison.",
      "IR35 status is determined engagement by engagement, not by your overall structure choice.",
    ],
    relatedGuides: [
      "ir35-for-locums",
      "medical-expenses-tax-treatment",
      "nhs-pension-annual-allowance",
    ],
    relatedPosts: [
      { href: "/blog/locum-doctor-limited-company-pros-and-cons", title: "Locum Doctor Limited Company: Pros and Cons" },
      { href: "/blog/locum-doctor-umbrella-company-2026-reforms", title: "Locum Doctor Umbrella Company: 2026 Reforms" },
      { href: "/blog/locum-doctor-tax-complete-guide", title: "Locum Doctor Tax Complete Guide" },
      { href: "/blog/locum-doctor-self-assessment-filing-guide", title: "Locum Doctor Self-Assessment Filing Guide" },
    ],
  },
  {
    slug: "medical-expenses-tax-treatment",
    title: "Medical Expenses: What Doctors Can Claim on Tax",
    metaTitle: "Medical Professional Tax Expenses Guide | What Doctors Can Claim",
    metaDescription:
      "Complete guide to allowable tax expenses for UK doctors: GMC, BMA, indemnity, CPD, equipment, motor, home office, and clothing. What HMRC accepts and what it does not. Updated 2025/26.",
    eyebrow: "Medical expenses",
    summary:
      "Most doctors we onboard are under-claiming expenses. This guide lists what HMRC accepts for GPs, consultants, locums, and junior doctors, with the supporting rules and common pitfalls.",
    readTime: "8 min",
    audience: [
      "GP Partners",
      "Salaried GPs",
      "Hospital Consultants",
      "Locum Doctors",
      "Junior Doctors",
    ],
    sections: [
      {
        heading: "Professional registration and memberships",
        body: "GMC annual retention fee: Fully allowable as a trade expense for self-employed doctors, and as an employment expense (under PAYE) where the fee is not reimbursed by your employer. For employed doctors whose GMC fee is not reimbursed by their Trust, a claim can be made via self-assessment or via the HMRC portal.\n\nBMA membership: Allowable where you are self-employed or where the membership relates to your professional practice. Generally fully allowable for GPs and locum doctors working in private/self-employed capacity.\n\nRoyal College subscriptions (RCGP, RCS, RCP, RCPsych, etc.): Fully allowable professional subscriptions. HMRC maintains an approved list of professional bodies for employment expenses; all major medical Royal Colleges are included.\n\nNHS Pension Scheme membership: Your employee contributions to the NHS Pension Scheme are taken from pre-tax pay and reduce your taxable income automatically. No additional claim is required.",
      },
      {
        heading: "Medical indemnity insurance",
        body: "Premiums paid personally to MDU, MPS, or MDDUS for clinical indemnity are fully allowable as a trade expense for self-employed doctors (GPs, locums, private practice consultants). For employed consultants or salaried GPs whose indemnity is not provided or reimbursed by their employer, the premium can be claimed as an employment expense.\n\nWhere you have a single policy covering both NHS and private work, you can claim the full premium if the policy is specifically required for your professional practice and cannot be separated. Where the policy explicitly identifies a private practice premium loading, that portion is the minimum allowable.\n\nLocum doctors who subscribe to Urgent Medicine Service (UMS) or similar emergency locum cover schemes can also claim those premiums as business expenses.",
      },
      {
        heading: "CPD, conferences, and medical education",
        body: "Course fees, conference registration, and related travel and accommodation for medical education events are allowable expenses where the purpose is to maintain or update knowledge relevant to your current practice.\n\nThe event must be connected to your existing work, not training for a new career. A GP attending a diabetes management update relevant to their practice: allowable. The same GP attending an introductory cosmetic medicine course where they have not yet started cosmetic work: more complex, and HMRC may challenge this as pre-commencement training.\n\nMedical journals and reference materials: subscriptions to journals relevant to your specialty are allowable. Physical books and reference works are allowable where the specific content is required for your work, though HMRC may disallow general medical texts it considers personal rather than professional.",
      },
      {
        heading: "Equipment and technology",
        body: "Medical equipment used in your professional work is an allowable expense through capital allowances or the Annual Investment Allowance (AIA), which allows immediate 100% deduction for most equipment purchases.\n\nStethoscope, ophthalmoscope, otoscope, and similar diagnostic equipment: allowable where purchased personally and used in your work.\n\nLoupes (magnification lenses for surgical or dental work): allowable as capital expenditure.\n\nSoftware: clinical management software, dictation software, telemedicine platforms, and billing software used for your professional work are allowable.\n\nLaptop and mobile phone: claimable to the extent they are used for professional purposes. HMRC requires an apportionment for mixed personal/professional use. If the device is used predominantly for work, a high proportion (80-90%) may be claimable. Keep records of professional versus personal use if challenged.",
      },
      {
        heading: "Motor and travel expenses",
        body: "The allowable motor expense rules for doctors depend on whether you are employed or self-employed:\n\nSelf-employed doctors (GPs, locums, private practice): You can claim either the HMRC approved mileage rate (45p per mile for the first 10,000 miles per tax year, 25p thereafter) or the actual business proportion of all motor costs (fuel, insurance, road tax, servicing, depreciation). You cannot combine both methods; you choose one and stick with it for that vehicle.\n\nTravel between separate professional locations is allowable. Travel from home to your regular base of work is not (ordinary commuting). Home visits, travel to hospital sessions, travel to separate practice locations, and travel to CPD events are allowable.\n\nEmployed doctors claiming travel under HMRC's employment expense rules: The rules are narrower. You can claim travel for duties that take you away from your usual place of work, but not ordinary commuting. Multi-site employed consultants travelling between NHS sites can claim the costs of those journeys above their ordinary commute distance.",
      },
      {
        heading: "Home consulting room and home office",
        body: "If you use a dedicated room at home exclusively and genuinely for professional work (GP consultations, medico-legal report writing, private patient administration), a proportion of your household running costs is claimable:\n\nAllowable proportion: typically calculated as (consulting room floor area / total home floor area) x (hours used professionally / total hours in the year). HMRC accepts this method.\n\nCosts included: mortgage interest (not capital repayment, and subject to finance cost restrictions for landlords), rent, council tax, heat, light, internet, buildings insurance.\n\nImportant: where a dedicated room is claimed, HMRC may argue that any gain on sale of the home is partially a business gain, losing private residence relief on that proportion. We advise on whether this risk is significant given your property value and how to document the claim.",
      },
    ],
    keyPoints: [
      "GMC, BMA, and Royal College subscriptions are fully allowable for self-employed doctors.",
      "Medical indemnity premiums (MDU, MPS, MDDUS) are allowable trade expenses.",
      "CPD must relate to existing practice, not career changes, to be fully allowable.",
      "Equipment and software are claimable through Annual Investment Allowance (100% first-year deduction).",
      "Mileage rate: 45p/mile for first 10,000 miles, 25p thereafter (2025/26 rates).",
      "Home consulting room claims require exclusive professional use and carry a private residence relief consideration.",
    ],
    relatedGuides: [
      "nhs-pension-annual-allowance",
      "gp-partnership-accounts",
      "locum-limited-company-vs-umbrella",
    ],
    relatedPosts: [
      { href: "/blog/medical-professional-expenses-what-is-claimable", title: "Medical Professional Expenses: What Is Claimable" },
      { href: "/blog/locum-doctor-expenses-what-you-can-claim", title: "Locum Doctor Expenses: What You Can Claim" },
      { href: "/blog/gp-home-office-expenses-tax-relief", title: "GP Home Office Expenses and Tax Relief" },
      { href: "/blog/gp-tax-deductions-complete-list-2026", title: "GP Tax Deductions: Complete List 2026" },
    ],
  },
  {
    slug: "ir35-for-locums",
    title: "IR35 for Locum Doctors: Status, Risk, and Practical Guidance",
    metaTitle: "IR35 for Locum Doctors | Status Review & Practical Guide 2025/26",
    metaDescription:
      "How IR35 applies to locum doctors in the UK: the five employment tests, NHS agency SDS process, how to challenge an inside-IR35 decision, and structuring to protect outside-IR35 status. Updated 2025/26.",
    eyebrow: "IR35 compliance",
    summary:
      "IR35 is one of the most misunderstood areas of locum doctor tax. This guide explains how the tests apply to medical engagements, what the NHS agency SDS process means for you, and what to do if you receive an inside-IR35 determination.",
    readTime: "10 min",
    audience: ["Locum Doctors", "Junior Doctors with Locum Income"],
    sections: [
      {
        heading: "What is IR35 and why does it matter for locums?",
        body: "IR35 is shorthand for the off-payroll working rules introduced in 2000 and significantly reformed for the public sector in 2017 and the private sector in 2021. The legislation requires that individuals who would be employees if they contracted directly with an end-client (instead of through an intermediary such as a limited company) should pay broadly the same tax and NI as employees.\n\nFor locum doctors, IR35 matters because:\n\nIf you work through a limited company and your engagements are determined to be inside IR35, the tax advantage of the company structure is largely eliminated. The agency or end-client must apply PAYE deductions to your fee.\n\nIf you are a sole trader and your engagements are inside IR35, there is no separate tax impact (you already pay income tax and NI as a self-employed person), but the determination affects how the payer accounts for your income and NI.",
      },
      {
        heading: "The five employment tests applied to locum medicine",
        body: "IR35 status is determined by considering whether the working arrangement resembles employment, using five key tests:\n\n1. Personal service: Must you personally provide the services, or can you send a substitute? In medical practice, professional registration requirements mean substitution is constrained by law and by clinical governance. However, HMRC accepts that practical substitution constraints in regulated professions do not automatically create employment status if the contractual right exists.\n\n2. Control: Does the end-client control what you do, how you do it, and when you work? Locum GPs exercising independent clinical judgment within a practice setting generally have significant control over how they work, though the practice sets the hours and location.\n\n3. Mutuality of obligation: Is there an ongoing obligation for the practice to offer work and for you to accept it? In true sessional locum arrangements (booked session by session, no guarantee of future work, no obligation to accept every session), mutuality is low, which supports outside-IR35.\n\n4. Financial risk: Do you have the opportunity to profit and the risk of loss? Running your own equipment, carrying your own indemnity, and potentially losing money if sessions are cancelled support self-employment.\n\n5. Integration: Are you integral to the business, or a service provider brought in for a specific purpose? A locum filling a gap is less integrated than a regular partner.",
      },
      {
        heading: "The NHS agency SDS process",
        body: "From April 2021, medium and large end-clients (including NHS trusts and GP practices above the size threshold) are responsible for issuing Status Determination Statements (SDS) when engaging workers through limited companies or other intermediaries.\n\nIn practice, many NHS staffing agencies issue SDS determinations on behalf of the end-client. If you receive an SDS saying you are inside IR35, the agency must:\n\nDeduct income tax and NI from your gross fee before paying you.\nPay employer NI on your fee.\nPay you only the net-of-deductions amount.\n\nYou cannot then run this income through your limited company tax-efficiently: the tax has already been deducted at employment rates, and using the company to receive income that has already been PAYE-processed creates double taxation issues.\n\nA key point: the SDS must be reasonably reached. If you believe the determination is wrong, you can challenge it through the client-led disagreement process.",
      },
      {
        heading: "Challenging an inside-IR35 SDS",
        body: "If you receive an SDS saying you are inside IR35 and you believe it is incorrect, you have the right to raise a formal disagreement under HMRC's client-led disagreement process. The agency or end-client must then consider your representations and respond within 45 days.\n\nGrounds for challenge typically include:\n\nThe contract does not reflect the actual working arrangement (for example, the SDS assumed no substitution right when in practice you have agreed this with the practice).\n\nThe determination relied on incorrect factual assumptions about how the sessions operate.\n\nThe end-client has applied a blanket SDS policy without considering your specific engagement.\n\nWe review SDS determinations and advise whether a challenge has reasonable prospects. HMRC's CEST (Check Employment Status for Tax) tool can be used to document the position, though it is not binding.",
      },
      {
        heading: "Structuring to protect outside-IR35 status",
        body: "For locum doctors operating through a limited company who want to maintain outside-IR35 status, the following practical steps help:\n\nEnsure your contract includes a genuine right of substitution (subject to relevant clinical qualifications), even if you rarely exercise it.\n\nOperate session by session rather than on a rolling or open-ended basis. Avoid arrangements where the practice expects you to attend every week and there is an implicit obligation of continuity.\n\nCary your own professional indemnity insurance (which covers you personally, not the practice).\n\nMaintain records showing that your invoices are submitted professionally, that you use your own equipment, and that you exercise independent clinical judgment.\n\nDo not accept integration into the practice's staff systems (same email domain, listed on the staff directory as a permanent team member, use of the practice's uniform or equipment) without considering whether this changes your status.\n\nWe review client engagements annually for IR35 risk and advise proactively if any arrangement shows signs of drift toward employment status.",
      },
    ],
    keyPoints: [
      "IR35 applies engagement by engagement, not to you as a person: some of your work may be inside while other engagements are outside.",
      "The five tests (personal service, control, mutuality of obligation, financial risk, integration) are applied to the actual working arrangement, not just the contract.",
      "NHS agencies issuing inside-IR35 SDS must deduct PAYE tax and NI from your fee.",
      "You can formally challenge an inside-IR35 SDS through the client-led disagreement process within 45 days.",
      "Maintaining a genuine substitution right, session-by-session working, and your own professional indemnity helps preserve outside-IR35 status.",
    ],
    relatedGuides: [
      "locum-limited-company-vs-umbrella",
      "medical-expenses-tax-treatment",
      "nhs-pension-annual-allowance",
    ],
    relatedPosts: [
      { href: "/blog/locum-doctor-ir35-what-you-need-to-know", title: "Locum Doctor IR35: What You Need to Know" },
      { href: "/blog/locum-doctor-limited-company-pros-and-cons", title: "Locum Doctor Limited Company: Pros and Cons" },
    ],
  },
];

export function getGuideBySlug(slug: string): MedicalGuide | undefined {
  return MEDICAL_GUIDES.find((g) => g.slug === slug);
}

export function getAllGuideSlugs(): string[] {
  return MEDICAL_GUIDES.map((g) => g.slug);
}
