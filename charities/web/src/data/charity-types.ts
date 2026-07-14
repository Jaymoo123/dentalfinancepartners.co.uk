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
  {
    slug: "cics",
    title: "Community Interest Companies",
    headline: "Accounts and compliance for community interest companies",
    metaTitle: "Accountants for CICs | Community Interest Company Accounts | Trustee Finance Partners",
    metaDescription:
      "Specialist accountants for community interest companies. CIC34 filing, annual accounts, Corporation Tax and asset lock compliance for CIC directors.",
    intro:
      "A community interest company is a limited company registered at Companies House and regulated by the <a href=\"https://www.gov.uk/government/organisations/office-of-the-regulator-of-community-interest-companies\">Office of the Regulator of Community Interest Companies</a>. CICs pay <a href=\"https://www.gov.uk/government/organisations/office-of-the-regulator-of-community-interest-companies\">Corporation Tax normally</a> and cannot claim Gift Aid or charitable rate relief. Every CIC must file annual accounts together with a community interest report (CIC34) demonstrating it has operated for community benefit. Directors also carry standard Companies Act duties alongside the additional obligations imposed by the CIC Regulations.",
    stats: [
      { value: "CIC34", label: "Community interest report filed with annual accounts at Companies House" },
      { value: "9 months", label: "Accounts filing deadline (Companies House private company rule)" },
      { value: "Statutory asset lock", label: "Assets and profits committed to community benefit, not private distribution" },
    ],
    challenges: [
      {
        title: "CIC34 filing alongside annual accounts",
        body: "Every CIC must file a CIC34 community interest report at the same time as its annual accounts at Companies House. The report must describe activities carried out for community benefit, explain how directors have consulted the community, and demonstrate how assets and profits have been applied. A <a href=\"https://www.gov.uk/government/publications/community-interest-companies-business-activities\">filing fee applies</a>. Generalist accountants who do not work regularly with CICs frequently miss these requirements or conflate them with charity reporting obligations.",
      },
      {
        title: "The asset lock and dividend restrictions",
        body: "The <a href=\"https://www.gov.uk/government/publications/community-interest-companies-how-to-form-a-cic\">statutory asset lock</a> means CIC assets must be retained for community benefit and can only be transferred to another asset-locked body. CICs limited by shares are also subject to a dividend cap set by the CIC Regulator, limiting what shareholders can receive. Directors need to understand the boundaries and document that distributions comply with the cap, since breach triggers regulatory action.",
      },
      {
        title: "Corporation Tax: no charity reliefs",
        body: "Unlike charities, CICs receive no charity tax reliefs. They pay Corporation Tax on trading profits normally, cannot claim Gift Aid on income received, and are not eligible for <a href=\"https://www.gov.uk/apply-for-business-rate-relief/charitable-rate-relief\">charitable rate relief</a>. If a CIC sits alongside a connected charity and channels profits to it, the tax treatment of that arrangement needs careful analysis under the trading subsidiary rules.",
      },
      {
        title: "Directors from community and voluntary backgrounds",
        body: "Many CIC directors come from the voluntary or community sector rather than a commercial background. They may be unfamiliar with Companies Act duties, confirmation statement deadlines, or the consequences of late filing. The CIC Regulator can take action for failures that sit alongside Companies House enforcement, so compliance gaps carry two sets of consequences.",
      },
    ],
    howWeHelp: [
      {
        title: "Annual accounts and CIC34",
        body: "We prepare the annual accounts and the community interest report (CIC34) together, and manage the <a href=\"https://www.gov.uk/government/publications/community-interest-companies-business-activities\">Companies House filing</a> within the nine-month private company deadline. The CIC34 narrative is drafted to meet the Regulator's expectations on community benefit, consultation and asset application.",
      },
      {
        title: "Corporation Tax and trading structure",
        body: "We calculate and file the Corporation Tax return, advise on the VAT treatment of the CIC's activities, and where appropriate explain the trading subsidiary model for organisations that sit alongside a connected charity.",
      },
      {
        title: "Asset lock and director compliance",
        body: "We advise CIC directors on the <a href=\"https://www.gov.uk/government/publications/community-interest-companies-how-to-form-a-cic\">asset lock rules</a> and dividend restrictions, help document that distributions comply with the cap set by the Regulator, and flag upcoming Companies House deadlines so nothing is missed.",
      },
    ],
    faqs: [
      {
        question: "Can a CIC claim Gift Aid?",
        answer: "No. CICs are not charities and cannot claim Gift Aid on income. They also do not qualify for <a href=\"https://www.gov.uk/apply-for-business-rate-relief/charitable-rate-relief\">charitable rate relief</a>. These reliefs are available only to bodies recognised as charities by HMRC. If Gift Aid eligibility matters to your organisation, the legal structure would need to be a registered charity rather than a CIC.",
      },
      {
        question: "What is the CIC34 and when must it be filed?",
        answer: "The CIC34 is a community interest report that every CIC must file at Companies House alongside its annual accounts. It sets out the activities carried out for community benefit during the year, explains how the directors have consulted the community, and shows how assets and profits have been applied. A <a href=\"https://www.gov.uk/government/publications/community-interest-companies-business-activities\">filing fee applies</a>. The deadline follows the standard Companies House private company rule: nine months after the accounting reference date.",
      },
      {
        question: "Does a CIC pay Corporation Tax?",
        answer: "Yes. A CIC pays Corporation Tax on its trading profits in the same way as any other limited company. There are no special charity-equivalent reliefs. CICs are regulated by the <a href=\"https://www.gov.uk/government/organisations/office-of-the-regulator-of-community-interest-companies\">Office of the Regulator of Community Interest Companies</a>, not the Charity Commission, and HMRC treats them as standard companies for tax purposes.",
      },
      {
        question: "What is the CIC asset lock?",
        answer: "The <a href=\"https://www.gov.uk/government/publications/community-interest-companies-how-to-form-a-cic\">statutory asset lock</a> means that CIC assets and profits must be used for community benefit. Assets can only be transferred to another asset-locked body. CICs limited by shares are also subject to a dividend cap restricting what shareholders can be paid, with the cap set by the CIC Regulator. Breaching the asset lock or the dividend cap exposes directors to regulatory action.",
      },
    ],
  },
  {
    slug: "social-enterprises",
    title: "Social Enterprises",
    headline: "Accounts and tax advice for social enterprises, whatever your legal form",
    metaTitle: "Accountants for Social Enterprises | Trustee Finance Partners",
    metaDescription:
      "Accounts, Corporation Tax and structure advice for social enterprises: CICs, charitable companies, CIOs and mission-led trading organisations across England and Wales.",
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
        body: "We explain the accounting and tax implications of CIC, charitable company, CIO and other structures, drawing on the <a href=\"https://www.gov.uk/guidance/charity-types-how-to-choose-a-structure\">Charity Commission's structure guidance</a>. Where a trading subsidiary or restructure is relevant, we model the tax position and advise on implementation.",
      },
      {
        title: "Annual accounts and regulatory filings",
        body: "We prepare annual accounts under the applicable standard, whether FRS 102 small company accounts, Charities SORP (for registered charities), or CIC-specific accounts including the CIC34 community interest report. We manage Companies House and, where applicable, Charity Commission filing deadlines.",
      },
      {
        title: "Corporation Tax, VAT and Gift Aid",
        body: "We calculate and file Corporation Tax returns, advise on VAT registration obligations (the standard <a href=\"https://www.gov.uk/vat-charities\">£90,000 taxable turnover threshold applies</a> unless specific reliefs apply), and handle <a href=\"https://www.gov.uk/claim-gift-aid\">Gift Aid</a> registration and claims for organisations that are registered charities.",
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
];

export function getCharityType(slug: string): CharityType | undefined {
  return charityTypes.find((t) => t.slug === slug);
}
