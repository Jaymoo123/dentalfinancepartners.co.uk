import { siteConfig } from "@/config/site";

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
 * Real, data-led audience content, sourced from
 * _staging/divorce-core-copy/for-*.md. Interface unchanged so the /for
 * routes keep working generically.
 */
export const tradeTypes: TradeType[] = [
  {
    slug: "divorcing-homeowners",
    segment: "trade",
    title: "Divorcing homeowners",
    headline: "The house is the biggest number on the page. Get it right",
    metaTitle: "Divorce and Your House | Buyouts, Equity and the Joint Mortgage",
    metaDescription:
      "What happens to the house in a divorce. Buyouts, transfer of equity, Mesher orders and the joint mortgage, explained in plain English with free calculators.",
    intro:
      `For most divorcing couples the family home is the largest asset, the biggest emotional weight and the hardest question. Who stays, who goes, who can afford the mortgage alone, and what a fair share of the equity looks like. ${siteConfig.name} explains the options in plain English and gives you free tools to put numbers on each one before you commit to anything.`,
    stats: [
      { value: "No.1", label: "The home is the largest asset in most settlements" },
      { value: "4", label: "Main routes: sell, buyout, transfer, defer" },
      { value: "£628", label: "Divorce application court fee from 13 July 2026" },
    ],
    challenges: [
      {
        title: "Nobody can agree who keeps it",
        body: "There is no automatic answer. Courts start from what each of you needs, especially where children live, not from whose name is on the deeds. Understanding how that reasoning works is the difference between negotiating and just arguing.",
      },
      {
        title: "The joint mortgage does not care that you separated",
        body: "You both stay fully liable for the whole payment until the mortgage is changed, whoever moves out. Missed payments damage both credit files, and lenders will not simply take a name off without checking the remaining person can afford it alone.",
      },
      {
        title: "A buyout is two sums, not one",
        body: "What the equity share is worth, and whether you can raise it. Plenty of buyouts agreed at the kitchen table fall apart at the remortgage stage because the numbers were never tested.",
      },
      {
        title: "Selling has hidden costs and tax angles",
        body: "Agent fees, two sets of moving costs, and capital gains and stamp duty rules that treat transfers between divorcing spouses differently from ordinary sales. The timing of when you transfer can matter.",
      },
    ],
    howWeHelp: [
      {
        title: "Free calculators",
        body: "Put numbers on the whole process: what the divorce itself will cost by route, what a binding consent order costs, and a settlement range estimator that treats the house as part of the whole picture rather than a prize to be won.",
      },
      {
        title: "Plain-English guides",
        body: "Transfers of equity, Mesher orders and deferred sale, who pays the mortgage during separation, and how the capital gains and stamp duty rules apply to divorce transfers. Written from official sources and dated.",
      },
      {
        title: "A route to the right professional",
        body: "When you are ready to make it binding, or you cannot agree, we can introduce you to a vetted family law firm or accredited mediator. Introductions happen only with your consent and you are never obliged to proceed.",
      },
    ],
    faqs: [
      {
        question: "Who gets the house in a divorce?",
        answer:
          "There is no fixed rule. Courts in England and Wales look at the needs of both of you and any children, the length of the marriage, earnings and mortgage capacity, and the rest of the asset pot. Housing children usually comes first. That can mean a sale and split, one person buying the other out, a transfer with a compensating share of other assets, or a deferred sale under a Mesher order. Our guides walk through each route.",
      },
      {
        question: "Do I have to leave the house if it is not in my name?",
        answer:
          "Generally no. If you are married, you have rights to occupy the family home regardless of whose name is on the title, and you can register those rights. Do not move out or sign anything under pressure without speaking to a solicitor first. This is one of the areas where early advice pays for itself.",
      },
      {
        question: "Can I take over the mortgage on my own?",
        answer:
          "Only if the lender agrees, and they will assess your income and outgoings as if you were a new applicant. It is worth testing this early, because a settlement built on a buyout you cannot finance is a settlement that has to be renegotiated. A mortgage broker can tell you quickly whether the numbers are realistic.",
      },
      {
        question: "Will we pay capital gains tax or stamp duty when one of us transfers their share?",
        answer:
          "Often not, but the rules have conditions. Since 2023 transfers between separating spouses benefit from extended no gain, no loss treatment for capital gains tax, and transfers made under a divorce court order or formal agreement are generally exempt from stamp duty land tax. The detail depends on timing and how the transfer is structured, so confirm your position with a professional before you exchange anything.",
      },
    ],
  },
  {
    slug: "business-owners",
    segment: "business",
    title: "Business owners divorcing",
    headline: "Divorce should not have to cost you the business too",
    metaTitle: "Divorce and Your Business | Valuation, Shares and Settlements",
    metaDescription:
      "How a limited company or business is valued and treated in a divorce settlement, and how owners typically keep the business trading through it. Plain-English guides and free tools.",
    intro:
      `When one or both of you own a business, the settlement gets harder in ways that catch people out: the company has to be valued, the value has to be found from somewhere, and the business has to keep trading while all of it happens. ${siteConfig.name} explains how courts treat business assets, what the valuation process involves, and where specialist help genuinely earns its fee.`,
    stats: [
      { value: "Asset", label: "A business is part of the pot, like the house or pensions" },
      { value: "3", label: "Common routes: offset, buy out over time, or share" },
      { value: "Rare", label: "Courts prefer not to force a sale of a trading business" },
    ],
    challenges: [
      {
        title: "The business has to be valued, and valuations are arguable",
        body: "Accounts show history, not value. A company can be valued on earnings, assets or what a buyer would pay, and the figures can be far apart. Where the value is significant or disputed, a single jointly instructed forensic accountant usually values it for both of you.",
      },
      {
        title: "The value is real but the cash is not",
        body: "A company can be worth a large sum on paper while the owner cannot extract that sum without damaging it. Settlements usually solve this by offsetting, one spouse keeps the business while the other takes more of the house, pensions or savings, or by staged payments over time.",
      },
      {
        title: "Liquidity, tax and timing tangle together",
        body: "Pulling money out of a company to fund a settlement has tax consequences, and how and when it is done matters. This is where a family solicitor and an accountant need to work together rather than in sequence.",
      },
      {
        title: "Disclosure is not optional",
        body: "Form E requires full disclosure of business interests, and courts have wide powers where assets are hidden or undervalued. Attempting to make the business look smaller is the most expensive mistake an owner can make in a divorce.",
      },
    ],
    howWeHelp: [
      {
        title: "Plain-English guides",
        body: "How business assets and limited companies are treated in settlements, what forensic accountants do and roughly what they cost, how offsetting works, and what Form E asks of company owners. Written from official sources and dated.",
      },
      {
        title: "Free calculators",
        body: "Our divorce cost and settlement range tools help you see the whole picture the business sits inside, including the cost difference between an agreed settlement and a contested one, which for business owners is usually the largest controllable number.",
      },
      {
        title: "Introductions that fit the problem",
        body: "Business-owner divorces need family solicitors who are comfortable with company assets. When you are ready, we can introduce you to a vetted firm suited to your situation. With your consent, and with no obligation to proceed.",
      },
    ],
    faqs: [
      {
        question: "Will my spouse get half my company?",
        answer:
          "Usually not literally. Courts rarely order a trading business to be broken up or sold, and rarely leave ex-spouses as unwilling business partners. Far more often the business value is offset against other assets, or met through staged payments. What share of the overall pot is fair depends on the usual factors: needs, contributions and the length of the marriage.",
      },
      {
        question: "Does it matter that I built the business before we married?",
        answer:
          "It can. Assets built up before the marriage can be treated differently from those built during it, but the distinction weakens in longer marriages and where the other assets cannot meet both parties' needs. It is an argument, not a shield, and it is exactly the kind of point a specialist solicitor is for.",
      },
      {
        question: "Do I really need a forensic accountant?",
        answer:
          "Not always. Where the business is small, or both of you accept a broad value, a full expert valuation may be disproportionate. Where the company is the biggest asset, or one of you believes the accounts understate it, a jointly instructed expert is often the fastest way to stop the argument. Their fee is usually shared.",
      },
      {
        question: "Can I just keep paying myself less until the divorce is done?",
        answer:
          "Do not. Courts look at earning capacity, not just the current payslip, and judges have seen every version of the conveniently timed pay cut. Artificially suppressing income or value tends to destroy credibility and can affect the outcome. Full, honest disclosure is both the legal obligation and the better strategy.",
      },
    ],
  },
  {
    slug: "separated-parents",
    segment: "trade",
    title: "Separated parents",
    headline: "Two households on the money that used to run one",
    metaTitle: "Separation, Children and Money | Maintenance and the Family Home",
    metaDescription:
      "The money side of separating when you have children. Child maintenance, who pays the mortgage, and running two households, explained calmly and without judgement.",
    intro:
      "When you have children, separation is not a transaction to be won. It is a restructuring of one household into two, on the same money, with the children's stability as the fixed point. This page covers only the financial side: maintenance, the home and the practical arithmetic of the next few years. For arrangements about where children live and how time is shared, Cafcass and gov.uk are the right starting points, not us.",
    stats: [
      { value: "First", label: "Children's housing needs come first in settlements" },
      { value: "gov.uk", label: "The official child maintenance calculator is free" },
      { value: "£500", label: "Family Mediation Voucher towards mediation costs" },
    ],
    challenges: [
      {
        title: "The same income now has to fund two homes",
        body: "This is the hard centre of most parental separations, and no formula makes it painless. What helps is seeing the real numbers early: what each household costs to run, what maintenance is likely to be, and where the shortfalls are, before positions harden.",
      },
      {
        title: "Child maintenance feels opaque until you see the formula",
        body: "It is not. The Child Maintenance Service calculation is a published formula based on the paying parent's gross income, the number of children and how many nights they stay. The official gov.uk calculator gives you the figure in minutes, and most parents simply agree an amount around it without the CMS ever being involved.",
      },
      {
        title: "The house decision is tangled up with the children",
        body: "Courts prioritise keeping children suitably housed, which is why arrangements like a deferred sale (a Mesher order) exist: one parent stays in the home with the children, and the sale or division happens later, at a defined trigger point. It solves one problem and creates others, and it is worth understanding both halves before proposing it.",
      },
      {
        title: "Conflict is expensive, in every currency",
        body: "Every contested step costs money that the two households will need, and research consistently links parental conflict, not separation itself, to worse outcomes for children. Mediation exists precisely for this, it is a fraction of the cost of court, and a £500 voucher scheme currently helps fund it for cases involving children.",
      },
    ],
    howWeHelp: [
      {
        title: "Free calculators",
        body: "What the process will cost by route, whether you qualify for help with court fees, and what mediation costs compared with solicitors and court. Quiet, factual numbers you can look at at your own pace, with no sign-up.",
      },
      {
        title: "Plain-English guides",
        body: "How the CMS formula works with worked examples, who pays the mortgage during separation, how school fees and maintenance interact, and how to make an agreement binding with a consent order. Written from official sources, dated, and free of drama.",
      },
      {
        title: "A calm route to the right help",
        body: "When you need a professional, we can introduce you to a vetted family solicitor or an accredited mediator who can conduct the initial mediation meeting (MIAM) that most court applicants need to attend first. With your consent only, and with no pressure at any stage.",
      },
    ],
    faqs: [
      {
        question: "How much child maintenance will be paid?",
        answer:
          "For most families the starting point is the Child Maintenance Service formula: a percentage of the paying parent's gross weekly income, adjusted for the number of children and the nights they stay with each parent. The official calculator on gov.uk applies the current rates and is free. Many parents agree a family-based arrangement around that figure without involving the CMS at all. Our guide walks through the formula with worked examples.",
      },
      {
        question: "We agree on everything. Do we still need anything formal?",
        answer:
          "Agreement is the best possible starting point, and it is worth protecting. A verbal deal about the house or lump sums is not binding, and financial claims between ex-spouses stay open until a court seals a consent order. Turning your agreement into a consent order is usually quick and comparatively inexpensive, and it means neither of you can reopen the finances years later.",
      },
      {
        question: "Who pays the mortgage until things are sorted out?",
        answer:
          "Legally, everyone named on the mortgage remains fully liable for all of it, whoever is living in the house. Practically, couples usually agree an interim arrangement, sometimes reflected in the eventual settlement. If payments are at risk, talk to the lender early. Missed payments hurt both credit files and shrink everyone's options, including the children's housing options.",
      },
      {
        question: "Is mediation worth trying, or is it just a delay?",
        answer:
          "For parents, it is usually worth trying, and most people who apply to court about finances or children are required to attend a mediation information meeting (MIAM) first anyway. Mediation is private, faster and far cheaper than proceedings, and agreements reached there can be made binding afterwards. It is not suitable in every case. Where there has been domestic abuse, exemptions apply and legal aid may be available. Tell any professional about your circumstances early.",
      },
    ],
  },
  {
    slug: "over-50s",
    segment: "business",
    title: "Divorcing over 50",
    headline: "After 50, the settlement is about the rest of your life",
    metaTitle: "Divorce Over 50 | Pensions, the House and Retirement Plans",
    metaDescription:
      "Later-life divorce changes retirement, not just the present. Pensions, the family home and rebuilding plans after 50, explained in plain English with free tools.",
    intro:
      `Divorce later in life, after a long marriage, has its own financial shape. Pensions often outweigh the house, there are fewer working years left to rebuild, and decisions that a 35 year old could recover from are harder to undo at 58. ${siteConfig.name} explains what matters most in later-life divorce, in plain English, so you can make the big calls with your eyes open.`,
    stats: [
      { value: "Often No.1", label: "In long marriages, pensions can outweigh the house" },
      { value: "3", label: "Ways to deal with pensions: sharing, offsetting, attachment" },
      { value: "50/50", label: "The usual starting point after a long marriage" },
    ],
    challenges: [
      {
        title: "The pension is the asset people undervalue",
        body: "After a long marriage a pension can be worth more than the family home, yet it is the asset most often traded away too cheaply. The transfer value on the statement (the CEV) can seriously understate what a pension, especially a final salary one, is actually worth. Where the sums are significant, a pension expert's report (often called a PODE report) exists precisely to stop that mistake.",
      },
      {
        title: "Keeping the house can mean losing the retirement",
        body: "The most common later-life trade is one spouse keeping the house while the other keeps the pension. It feels intuitive and it is sometimes right, but a house does not pay an income at 70. This trade deserves more scrutiny than any other decision in a later-life divorce.",
      },
      {
        title: "There is less time to rebuild",
        body: "A younger divorcee has decades of earnings ahead. At 55 or 60, the settlement largely is the retirement plan. That changes what a fair outcome looks like, and courts recognise it: needs in later life, including income needs in retirement, weigh heavily.",
      },
      {
        title: "State pension, benefits and wills all shift",
        body: "Divorce can affect what you inherit from an ex-spouse's National Insurance record under old and new state pension rules, ends automatic inheritance in most cases, and quietly invalidates parts of many wills. The settlement is not finished until the paperwork around it catches up.",
      },
    ],
    howWeHelp: [
      {
        title: "Free calculators",
        body: "The cost of the divorce itself by route, a settlement range estimator that includes pensions in the pot, and a mediation vs solicitor comparison. Long-married couples often have the most to lose from a contested fight and the most to gain from an agreed one.",
      },
      {
        title: "Plain-English guides",
        body: "Pension sharing versus offsetting, how pension sharing orders are implemented and how long they take, the remarriage trap, and what later-life divorce means for wills, state pensions and inheritance. Information only, from official sources, dated.",
      },
      {
        title: "The right specialists, in the right order",
        body: "Later-life divorce often needs two professionals: a family solicitor for the settlement, and a regulated financial adviser for what to do with pension rights afterwards. We can introduce you to a vetted solicitor firm, and we will always tell you plainly when a question belongs with a regulated adviser instead. Free, impartial pensions guidance is also available from MoneyHelper.",
      },
    ],
    faqs: [
      {
        question: "How are pensions split in divorce?",
        answer:
          "Three main mechanisms in England and Wales. Pension sharing gives each of you your own separate pension pot by court order, and is the cleanest break. Offsetting trades pension value against other assets, typically the house. Attachment orders redirect part of a pension when it is paid, and are now rare. Which is right depends on the pensions involved and your ages, and what you should then do with any pension rights is a question for a regulated financial adviser, not for us and not for your solicitor.",
      },
      {
        question: "We were married 30 years. Does that change the outcome?",
        answer:
          "Generally, the longer the marriage, the more the court leans towards equal division of everything built up during it, regardless of whose name things are in or who earned what. Arguments about pre-marital assets carry little weight after three decades. The bigger question in long marriages is usually not the split but the structure: how to turn one retirement plan into two liveable ones.",
      },
      {
        question: "Should I keep the house and let my ex keep the pension?",
        answer:
          "Sometimes, but do the arithmetic before the emotion. Compare like with like: what income the pension would produce against what the house is worth to you in real terms, remembering that transfer values can understate final salary pensions badly. This single decision is where later-life divorces most often go wrong, and where a pension expert's report or regulated financial advice is money well spent.",
      },
      {
        question: "Does remarrying affect my financial claims?",
        answer:
          "Yes, and this catches people out. If you remarry before financial claims from your first marriage are resolved, you can permanently lose the right to make most of them, the so-called remarriage trap. Pension sharing survives differently from other claims, but the safe course is simple: get the financial order sealed before anyone remarries. If remarriage is on the horizon, tell your solicitor immediately.",
      },
    ],
  },
];

export function getTradeType(slug: string): TradeType | undefined {
  return tradeTypes.find((t) => t.slug === slug);
}
