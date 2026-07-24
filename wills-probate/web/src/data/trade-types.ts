export interface TradeType {
  slug: string;
  segment: "trade" | "business";
  title: string;
  headline: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  stats: Array<{ value: string; label: string }>;
  challenges: Array<{ title: string; body: string }>;
  howWeHelp: Array<{ title: string; body: string }>;
  faqs: Array<{ question: string; answer: string }>;
  testimonial?: { quote: string; attribution: string };
}

/**
 * Real, data-led audience content, sourced from copy-staging/core/for-audiences.md.
 * Interface unchanged so the /for routes keep working generically.
 */
export const tradeTypes: TradeType[] = [
  {
    slug: "executors",
    segment: "trade",
    title: "Executors",
    headline: "Clear guidance for people acting as an executor",
    metaTitle: "First-Time Executor? A Calm, Step-by-Step Starting Point | Probate Compass",
    metaDescription:
      "Named as an executor and not sure where to begin? Plain-English guidance on probate, estate valuation and inheritance tax, with free calculators to do the sums.",
    intro:
      "Being an executor usually arrives at the worst possible moment. You are grieving, and suddenly you are also responsible for someone's entire financial life. It is not enormous once you break it down: it is a sequence of ordinary tasks, done one at a time, and most people manage it without drama.",
    stats: [
      { value: "£325k", label: "Standard nil rate band, tax free" },
      { value: "£526", label: "Probate application fee (estates over £5,000)" },
      { value: "40%", label: "Tax rate above available allowances" },
    ],
    challenges: [
      {
        title: "Registering the death and finding the will",
        body: "The first practical step, done before anything else can move. Once the will is found, the next task is building a picture of the estate: what the person owned, what they owed, and what it is all worth at the date of death.",
      },
      {
        title: "Working out if inheritance tax is due",
        body: "That valuation decides whether inheritance tax is due. Most estates pay none, because everything up to the £325,000 nil rate band is tax free, with further allowances for a home left to children or grandchildren and for anything left to a spouse or civil partner.",
      },
      {
        title: "Paying tax before probate is granted",
        body: "If tax is due, it is charged at 40% on the part above the available allowances, and it generally has to be paid, or started, before probate is granted.",
      },
      {
        title: "Deciding whether to apply yourself",
        body: "The probate application fee is £526 for estates over £5,000 (up from £300 on 13 July 2026), and for many estates you can apply yourself online without paying anyone. Whether you should depends on how complicated things are.",
      },
    ],
    howWeHelp: [
      {
        title: "The numbers",
        body: "Our calculators give you the numbers: what the estate might owe, what probate might cost, whether you are near a tax threshold.",
      },
      {
        title: "The process, in order",
        body: "Our guides walk each stage in order, in plain English, from registering the death through to final distribution.",
      },
      {
        title: "A specialist if you need one",
        body: "If the estate turns out to be genuinely complex, with trusts, businesses or disputes, we can connect you with a vetted probate specialist. No pressure either way.",
      },
    ],
    faqs: [
      {
        question: "Where do I start as a first-time executor?",
        answer:
          "Register the death and find the will, then build a picture of the estate: what the person owned, what they owed, and what it is all worth at the date of death. That valuation decides whether inheritance tax is due. Start with the probate cost estimator and take it from there.",
      },
      {
        question: "Do I have to pay for probate myself as executor?",
        answer:
          "No, but you are responsible for administering the estate correctly. The probate application fee (£526 for estates over £5,000) and any inheritance tax due are paid from the estate, not from your own money.",
      },
    ],
  },
  {
    slug: "surviving-spouses",
    segment: "trade",
    title: "Surviving spouses",
    headline: "Guidance for surviving spouses and civil partners",
    metaTitle: "Inheritance and Tax After Losing Your Spouse | Probate Compass",
    metaDescription:
      "What happens to joint assets, the spouse exemption, and the allowances you inherit. Clear information for widows and widowers, with free calculators.",
    intro:
      "In almost all cases, anything your spouse or civil partner left to you passes free of inheritance tax. The spouse exemption means there is usually no tax bill on what comes to you, however large the estate.",
    stats: [
      { value: "£650k", label: "Combined nil rate band available to your estate" },
      { value: "£350k", label: "Combined residence nil rate band, if a home passes to family" },
      { value: "£1m", label: "Potential tax-free total for many couples" },
    ],
    challenges: [
      {
        title: "Working out what needs probate",
        body: "Jointly owned assets, such as a home held as joint tenants or a joint bank account, normally pass to you automatically by survivorship. Accounts in your spouse's sole name are different: banks each set their own threshold for releasing money without probate.",
      },
      {
        title: "Claiming the transferred allowances",
        body: "When your spouse's allowances go unused because everything passed to you, they do not disappear, they transfer. The transfer has to be claimed properly by your executors, and the paperwork from your spouse's estate makes that far easier if it is kept safe now.",
      },
      {
        title: "Understanding your own estate's position",
        body: "The tax question that matters most is actually about the future: your own estate, especially once the April 2027 pension changes are taken into account.",
      },
    ],
    howWeHelp: [
      {
        title: "Transferable allowance checker",
        body: "Shows what your estate is likely to be able to claim from your spouse's unused nil rate band and residence nil rate band.",
      },
      {
        title: "Inheritance tax calculator",
        body: "Shows where your own estate now stands, which matters again from April 2027 when pensions start counting.",
      },
      {
        title: "Updating your will",
        body: "When you are ready, and only then, a vetted specialist can help you update your own will to match your new situation.",
      },
    ],
    faqs: [
      {
        question: "Do I pay inheritance tax on what my spouse left me?",
        answer:
          "In almost all cases, no. The spouse exemption means anything left to a spouse or civil partner passes free of inheritance tax, however large the estate.",
      },
      {
        question: "What happens to my spouse's unused nil rate band?",
        answer:
          "It transfers. Your estate can claim their unused nil rate band on top of your own, up to £650,000 in total at current 2026/27 figures, and their unused residence nil rate band too, potentially another £350,000 combined if a home passes to children or grandchildren. The transfer has to be claimed properly by your executors.",
      },
    ],
  },
  {
    slug: "blended-families",
    segment: "trade",
    title: "Blended families",
    headline: "Estate planning for blended families",
    metaTitle: "Wills for Blended Families: Why DIY Is Risky | Probate Compass",
    metaDescription:
      "Second marriages, stepchildren and sideways disinheritance. Why blended families need more than a basic mirror will, explained in plain English.",
    intro:
      "If you have remarried, or you and your partner have children from previous relationships, your family is exactly the kind that standard DIY wills fail. Not dramatically, and not immediately. The failure shows up years later, after one of you has died, when it is too late to fix.",
    stats: [
      { value: "£175k", label: "Residence nil rate band, includes stepchildren if written correctly" },
      { value: "0", label: "Automatic inheritance rights for stepchildren under intestacy" },
    ],
    challenges: [
      {
        title: "Sideways disinheritance",
        body: "A couple make simple mirror wills leaving everything to each other, then to \"the children\". The first partner dies and everything passes to the survivor. If the survivor later remarries, their existing will is usually revoked automatically by the marriage, and the first partner's children can end up with nothing at all, entirely legally.",
      },
      {
        title: "Stepchildren have no automatic rights",
        body: "Stepchildren have no automatic inheritance rights under intestacy, so if you die without a will, a stepchild you raised for twenty years may receive nothing.",
      },
      {
        title: "The residence nil rate band and stepchildren",
        body: "The residence nil rate band of £175,000 depends on your home passing to \"direct descendants\", a definition that does include stepchildren, but only if the will is written so they actually inherit.",
      },
    ],
    howWeHelp: [
      {
        title: "See what is at stake",
        body: "Start with our inheritance tax calculator to see what is at stake for your estate.",
      },
      {
        title: "Understand sideways disinheritance",
        body: "Read our sideways disinheritance guide to understand exactly how the common mirror-will mistake happens.",
      },
      {
        title: "A specialist who works with blended families",
        body: "If you want your wills properly built, we can connect you with a vetted specialist who works with blended families and structures like life interest arrangements.",
      },
    ],
    faqs: [
      {
        question: "What is sideways disinheritance?",
        answer:
          "It is what happens when a couple make simple mirror wills leaving everything to each other, then to \"the children\". The surviving partner ends up owning the estate outright, and if they remarry or rewrite their will, the first partner's children can end up with nothing at all, entirely legally.",
      },
      {
        question: "Do stepchildren automatically inherit?",
        answer:
          "No. Stepchildren have no automatic inheritance rights under intestacy. They can qualify as \"direct descendants\" for the residence nil rate band, but only if the will is written so they actually inherit.",
      },
    ],
  },
  {
    slug: "business-owners",
    segment: "business",
    title: "Business owners",
    headline: "Succession and inheritance tax planning for business owners",
    metaTitle: "Inheritance Tax and Succession for Business Owners | Probate Compass",
    metaDescription:
      "Business relief basics, the rules that changed in April 2026, and why business owners should check their exposure now. Free calculators included.",
    intro:
      "For years, many business owners could reasonably assume their trading business would pass on free of inheritance tax, because business relief at 100% took it out of the calculation. That assumption needs rechecking after the April 2026 changes.",
    stats: [
      { value: "£1m", label: "Business and agricultural property still relieved at 100%" },
      { value: "50%", label: "Relief above £1m (effective 20% IHT rate)" },
      { value: "2yr", label: "Typical ownership period required" },
    ],
    challenges: [
      {
        title: "Relief above £2.5 million has changed",
        body: "From April 2026, 100% relief applies only to the first £2.5 million of qualifying business and agricultural property combined (raised from the originally announced £1 million in December 2025); value above that is relieved at 50%, leaving an effective inheritance tax rate of 20% on the excess.",
      },
      {
        title: "Not every business qualifies",
        body: "Relief generally requires a trading business, not one mainly holding investments, and a two-year ownership period usually applies. How you hold the business, and what your will and any shareholders' agreement say, can change the outcome significantly.",
      },
      {
        title: "Binding sale agreements can destroy the relief",
        body: "A common and expensive drafting mistake is a binding sale agreement on death, which can destroy the relief entirely.",
      },
      {
        title: "Succession, not just tax",
        body: "Who runs the business the week after you die? Can your family extract value without a forced sale? Do your will, your articles and your partnership or shareholders' agreement all say the same thing? Many otherwise well-run businesses have never checked.",
      },
    ],
    howWeHelp: [
      {
        title: "Business relief exposure checker",
        body: "Get a first view of exposure under the current rules, including the business relief inputs.",
      },
      {
        title: "2027 pension checker",
        body: "The planning here interacts with pensions from April 2027 as well, so run the pension checker too.",
      },
      {
        title: "A specialist in business succession",
        body: "If the numbers are material, this is specialist territory, and we can connect you with a vetted firm that handles business succession and estate planning together.",
      },
    ],
    faqs: [
      {
        question: "Has business relief changed?",
        answer:
          "Yes. From April 2026, 100% business relief applies only to the first £2.5 million of qualifying business and agricultural property combined (raised from the originally announced £1 million in December 2025). Value above that is relieved at 50%, an effective inheritance tax rate of 20% on the excess.",
      },
      {
        question: "What can destroy business relief?",
        answer:
          "A binding sale agreement on death is a common and expensive drafting mistake that can destroy the relief entirely. How the business is held, and what the will and any shareholders' agreement say, matters significantly.",
      },
    ],
  },
  {
    slug: "pension-holders-2027",
    segment: "business",
    title: "Pension holders (2027 changes)",
    headline: "What the 2027 pension and IHT changes mean for you",
    metaTitle: "Pensions and Inheritance Tax from April 2027: Check Your Exposure | Probate Compass",
    metaDescription:
      "From 6 April 2027 unused pensions are due to count for inheritance tax. Who is affected, who is not, and a free checker to estimate your exposure.",
    intro:
      "For the last decade, defined contribution pensions have sat outside inheritance tax. From 6 April 2027, that changes: most unused pension funds and death benefits will be counted as part of your estate for inheritance tax, with your personal representatives responsible for reporting and paying any tax due. HMRC estimates around 10,500 estates a year will become liable for the first time, and a further 38,500 will pay more, on average around £34,000 more.",
    stats: [
      { value: "6 Apr 2027", label: "Date the rules are due to take effect" },
      { value: "£2m", label: "Estate size where the residence nil rate band starts tapering" },
      { value: "£325k", label: "Single-person threshold worth checking against" },
    ],
    challenges: [
      {
        title: "Money moves inside the 40% net",
        body: "Money you thought was outside the 40% net moves inside it. An estate that currently sits comfortably under the allowances can be pushed over once a pension pot is added.",
      },
      {
        title: "A double effect on the residence nil rate band",
        body: "Because the residence nil rate band tapers away for estates over £2 million, a large pension can also erode an allowance you were counting on for the family home, a double effect that surprises people.",
      },
      {
        title: "Who is less affected",
        body: "Those leaving everything to a spouse or civil partner are less affected, because the spouse exemption continues to apply, though tax may then be a question for the survivor's estate. Death in service benefits from registered pension schemes are excluded from the charge.",
      },
    ],
    howWeHelp: [
      {
        title: "2027 pension exposure checker",
        body: "Enter your estate and pension figures and see whether the change is likely to affect your family, and by roughly how much.",
      },
      {
        title: "Treat planning as provisional",
        body: "The final legislation and HMRC guidance are still bedding in, so treat any planning as provisional and revisit it before April 2027.",
      },
      {
        title: "A specialist if it is material",
        body: "If the exposure is material, we can connect you with a vetted estate planning specialist.",
      },
    ],
    faqs: [
      {
        question: "Will my pension be subject to inheritance tax?",
        answer:
          "From 6 April 2027, most unused defined contribution pension funds and death benefits are due to count as part of your estate for inheritance tax. Anyone with a meaningful pension pot they do not expect to fully spend should check their exposure, especially where the estate including the pension approaches £325,000 for a single person, or around £1 million for a couple.",
      },
      {
        question: "Who is less affected by the 2027 pension changes?",
        answer:
          "Those leaving everything to a spouse or civil partner, because the spouse exemption continues to apply. Death in service benefits from registered pension schemes are excluded from the charge, and pensions remain a highly tax-efficient way to fund your own retirement.",
      },
    ],
  },
  {
    slug: "expats",
    segment: "business",
    title: "Expats",
    headline: "Probate and inheritance tax for expats and UK domicile",
    metaTitle: "UK Inheritance Tax for Expats and Cross-Border Estates | Probate Compass",
    metaDescription:
      "Long-term residence rules from 2025, foreign assets and cross-border wills. Careful, plain-English information for expats with UK connections.",
    intro:
      "Cross-border estates are where confident generalisations go to die, so treat everything here as a starting point rather than an answer. The UK rewrote the foundations in April 2025: inheritance tax exposure now turns on long-term residence, not the old concept of domicile.",
    stats: [
      { value: "10 of 20", label: "Years of UK residence that trigger worldwide exposure" },
      { value: "Apr 2025", label: "Domicile replaced by long-term residence" },
    ],
    challenges: [
      {
        title: "The 10-in-20 test",
        body: "If you have been UK resident for at least 10 of the last 20 tax years, your worldwide assets fall within UK inheritance tax; and after you leave the UK, that worldwide exposure can continue for a tail of several years, longer for those who were resident for longer.",
      },
      {
        title: "UK assets still count if you are not a long-term resident",
        body: "If you are not a long-term UK resident, UK inheritance tax generally reaches only your UK assets, such as UK property and, in many cases, UK company shares. UK residential property is caught even when held through offshore structures.",
      },
      {
        title: "Other countries have their own rules",
        body: "The country where you live, or where your assets sit, may impose its own inheritance or succession taxes, and some countries have forced heirship rules that constrain who can inherit regardless of your will.",
      },
      {
        title: "Coordinating wills across countries",
        body: "A single UK will can be valid for foreign assets, but it is often safer to have coordinated wills in each relevant country, drafted so that neither accidentally revokes the other.",
      },
    ],
    howWeHelp: [
      {
        title: "Size your UK exposure",
        body: "Use our calculator to size your UK exposure under the current rules.",
      },
      {
        title: "First pass on the residence test",
        body: "The residence self-check gives a first pass on the 10-in-20 test.",
      },
      {
        title: "A specialist in cross-border estates",
        body: "Cross-border estates are specialist work, and we can connect you with a vetted firm that handles them.",
      },
    ],
    faqs: [
      {
        question: "Does UK inheritance tax still depend on domicile?",
        answer:
          "No. The UK rewrote the foundations in April 2025. Inheritance tax exposure now turns on long-term residence rather than domicile. Broadly, if you have been UK resident for at least 10 of the last 20 tax years, your worldwide assets fall within UK inheritance tax.",
      },
      {
        question: "What happens to UK inheritance tax exposure after I leave the UK?",
        answer:
          "Worldwide exposure can continue for a tail of several years after you leave, longer for those who were UK resident for longer. If you are not a long-term UK resident, UK inheritance tax generally reaches only your UK assets, including UK residential property even when held through offshore structures.",
      },
    ],
  },
];

export function getTradeType(slug: string): TradeType | undefined {
  return tradeTypes.find((t) => t.slug === slug);
}
