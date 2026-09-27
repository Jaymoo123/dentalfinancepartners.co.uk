import type { Metadata } from "next";
import { BarChart, FileText, Calculator, Building2, TrendingDown } from "lucide-react";
import { siteConfig } from "@/config/site";
import { AudienceStageLayout, type AudienceStage } from "@/components/audience/AudienceStageLayout";

export const metadata: Metadata = {
  title: "Accountants for GP Partners | Partner Tax & Drawings",
  description:
    "Accountants for GP partners: profit share and drawings, partner self assessment, the Type 1 certificate, buying into premises and leaving a partnership.",
  alternates: {
    canonical: `${siteConfig.url}/for-gp-partners`,
    languages: {
      "en-GB": `${siteConfig.url}/for-gp-partners`,
      "x-default": `${siteConfig.url}/for-gp-partners`,
    },
  },
  openGraph: {
    title: "Accountants for GP Partners | Partner Tax & Drawings",
    description:
      "Profit share and drawings, partner self assessment, the Type 1 certificate, buying into premises and leaving a partnership.",
    url: `${siteConfig.url}/for-gp-partners`,
    type: "website",
    images: [{ url: `/api/og?title=${encodeURIComponent("Accountants for GP Partners | Partner Tax & Drawings")}`, width: 1200, height: 630, alt: "Accountants for GP Partners | Partner Tax & Drawings" }],
  },
};

const data: AudienceStage = {
  slug: "for-gp-partners",
  role: "gp-partners",
  displayRole: "GP Partners",
  displayRoleLower: "GP partners",
  badge: "Profit share · Drawings · Type 1 certificate",
  heroHeading: "Accountants for GP partners",
  intro:
    "Joining a GP partnership, or finishing your first full year as one, is when the tax bill becomes real. Salary and PAYE stop. You take drawings against an anticipated profit share, and that share is taxed on you personally through self assessment whether or not you actually drew it. Your NHS pension moves from the Type 2 self-assessment for salaried GPs to the Type 1 Annual Certificate of Pensionable Profits, which you sign. A buy-in buys a share of net assets and, where the practice owns its building, a share of the premises. The partnership accounts and the PCSE reconciliation sit on <a href=\"/for-gps\">GP practice accountants</a>.",
  // Statutory figures from docs/medical/_wave1/gp-partners.json. "28 February"
  // and "6% and 2%" are not single counted-up numbers, so they render as text
  // stats (target 0, value in the label). £130.07 and 12.5% are single
  // figures and use StatsCounter normally.
  stats: [
    { target: 130.07, decimals: 2, prefix: "£", label: "Global Sum per weighted patient, 2026/27" },
    { target: 0, label: "28 February: Type 1 certificate deadline, a year in arrears" },
    { target: 12.5, decimals: 1, suffix: "%", label: "Top NHS pension contribution tier, 2026/27" },
    { target: 0, label: "6% and 2%: Class 4 NIC on partnership profits, 2026/27" },
  ],
  concerns: [
    {
      icon: BarChart,
      title: "Drawings are not your income, and the gap is where the tax bill hides",
      body: "Partner income is a profit share, not a salary. Drawings are monthly payments against a profit the practice has not finished earning, trued up when the accounts are signed. You are taxed on your allocated share, including what stays in the practice as working capital or builds your capital account. The mechanics are in <a href=\"/blog/gp-partner-drawings-vs-profit-tax-reserving\">how drawings differ from profit</a>.",
    },
    {
      icon: FileText,
      title: "Your first self assessment as a partner carries more than one year",
      body: "The January after your first full partnership year can ask for the balancing payment plus the first payment on account for the next, each interim payment being half the prior year's liability where that bill topped £1,000 and less than 80% was collected at source. Class 4 National Insurance follows at 6% on profits from £12,570 to £50,270 and 2% beyond. Class 2 has not been a required payment since 6 April 2024.",
    },
    {
      icon: Calculator,
      title: "The Type 1 certificate is yours to sign and it runs a year behind",
      body: "As a GP provider you move onto the Type 1 Annual Certificate of Pensionable Profits, filed through PCSE, covering your NHS-derived profit including locum or solo income. Filing runs a year behind, each 28 February, so the 2025/26 pension year falls due on 28 February 2027. Contributions are tiered on pensionable pay, reaching 12.5% at £67,669 and above for 2026/27, bands are re-set every 1 April in line with the previous September's CPI.",
    },
    {
      icon: Building2,
      title: "What a buy-in buys, and why none of it is NHS goodwill",
      body: "The sale of NHS general practice goodwill has been prohibited since 1 April 2004, currently under the 2019 Prohibition on the Sale of Goodwill Regulations, so the dental playbook does not translate. A buy-in pays for tangible assets, working capital and any owned premises. Premises often sit in a separate property partnership, supported by notional rent assessed at current market rent by the District Valuer. Financing is in <a href=\"/blog/financing-gp-partnership-buy-in-tax-relief\">buying into a partnership</a>.",
    },
    {
      icon: TrendingDown,
      title: "Leaving is a capital account settlement, not a sale",
      body: "What comes back on retirement is your capital account: your share of net assets as the accounts state them, less anything owed, on the terms the deed sets. A premises share is a separate disposal and may produce a gain, with the annual exempt amount at £3,000 for 2026/27. Weigh one risk before you sign anything: being the last partner left holding the whole building liability.",
    },
  ],
  services: [
    {
      title: "Partnership pages and your personal return prepared together",
      body: "Your allocated profit share, any private or locum income, employment income from any salaried months and your pension contributions go onto one return. A specialist reconciles that share to the signed accounts, so the figure you are taxed on is what the practice allocated rather than a rounded drawings total.",
    },
    {
      title: "A drawings and tax reserve schedule reviewed each year",
      body: "A monthly reserve figure comes off the expected profit share, the payments on account due and your pension tier, and is revisited once the accounts are final. The <a href=\"/calculators/gp-partner-drawings-planner\">drawings planner</a> gives you a first pass on your own numbers beforehand.",
    },
    {
      title: "The Type 1 certificate checked before you sign it",
      body: "The pensionable profit figure is read against the accounts and the practice's Estimate of Pensionable Profits, locum and solo income confirmed as included, and the tier applied in-year tested. Tiers can be revised in-year, so the rate first applied is not always the final one. Where an annual allowance charge looks likely, the position is modelled ahead of the Scheme Pays election deadline.",
    },
    {
      title: "Buy-in and exit numbers prepared before the deed is signed",
      body: "What you are buying is split into net assets, working capital and any premises share, and the borrowing behind it is reviewed for interest relief. On the way out, a specialist prepares the capital account settlement and any premises disposal, including the CGT position, in <a href=\"/blog/retiring-from-gp-partnership-tax-capital-account\">retiring from a partnership</a>.",
    },
  ],
  faqs: [
    {
      q: "I move from salaried GP to partner mid-year. What changes on my return?",
      a: "The year splits. Your salaried months stay employment income under PAYE and go on the employment pages. From the date you join you are self-employed in partnership, so your allocated profit share goes on the partnership pages and carries Class 4 National Insurance at 6% and 2% for 2026/27. Your pension record splits at the same date, from the Type 2 self-assessment to the Type 1 certificate.",
    },
    {
      q: "Why is my tax bill higher than the money I actually took out?",
      a: "Because you are taxed on your share of the profit the partnership made, not on the cash you drew. Profit retained to fund working capital, equipment or your capital account is still yours for tax purposes. Most practices set drawings conservatively so the year-end true-up is a credit, not a debt, which widens the gap. Reserving a fixed percentage of every drawing is the usual answer.",
    },
    {
      q: "Can I claim tax relief on the loan I took out to buy in?",
      a: "Interest on a loan taken out to contribute capital to a partnership in which you are a partner is generally relievable, which makes how the borrowing is structured and evidenced worth getting right at the outset rather than reconstructing later. The relief sits on your personal return, not in the practice accounts, so the paperwork is reviewed alongside the deed.",
    },
    {
      q: "Should I incorporate my GP income?",
      a: "Income routed through a company is not NHS-pensionable, and for a partner whose income is mostly NHS that usually settles it. The contract sits with GPs, their partnerships, or a company limited by shares that satisfies the shareholder conditions in the NHS Act 2006, which an ordinary personal service company cannot. Incorporation is a private-work question, and any tax saving has to be set against the pension accrual lost.",
    },
    {
      q: "Does the practice not owning its premises make joining safer?",
      a: "It removes one risk and adds another. With no owned building there is no mortgage share to buy and no disposal on exit, but the partnership holds a lease, and a lease outlives partners. Ask who carries the remaining term if partners leave before it ends, because the exposure on a final remaining partner is the same problem in different clothes.",
    },
    {
      q: "What should I ask to see before I agree to join?",
      a: "Three years of signed partnership accounts, the deed, the current and capital account pages for every partner, the premises position including any mortgage and the notional rent assessment, and recent Type 1 certificates. Add the list size, since the Global Sum is £130.07 per weighted patient for 2026/27 and what differs between practices is the weighted population.",
    },
  ],
  ctaTitle: "Talk to an accountant who works with GP partners",
  ctaBody:
    "A call with a regulated firm from our specialist partner network, covering your drawings and tax reserve, your Type 1 certificate, and any buy-in or exit numbers. Scope and fees are agreed with that firm, and enquiring commits you to nothing.",
  relatedCalculators: [
    {
      href: "/calculators/gp-partner-drawings-planner",
      name: "GP Partner Drawings Planner",
      desc: "Set a monthly drawings and tax reserve figure against your expected profit share and payments on account.",
    },
  ],
  relatedGuides: [
    {
      href: "/blog/gp-partner-drawings-vs-profit-tax-reserving",
      title: "GP Partner Drawings vs Profit: Tax Reserving",
      body: "Why the true-up bill lands, and how to reserve against it through the year.",
    },
    {
      href: "/blog/financing-gp-partnership-buy-in-tax-relief",
      title: "Financing a GP Partnership Buy-In",
      body: "What a buy-in actually buys, and the tax relief on the loan behind it.",
    },
    {
      href: "/blog/retiring-from-gp-partnership-tax-capital-account",
      title: "Retiring from a GP Partnership: Tax and the Capital Account",
      body: "What is settled on exit, the premises share, and the cessation position on your final return.",
    },
  ],
};

export default function ForGpPartnersPage() {
  return <AudienceStageLayout data={data} />;
}
