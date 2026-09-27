import type { Metadata } from "next";
import { BarChart, ShieldAlert, PiggyBank, CreditCard, FileText } from "lucide-react";
import { siteConfig } from "@/config/site";
import { AudienceStageLayout, type AudienceStage } from "@/components/audience/AudienceStageLayout";

export const metadata: Metadata = {
  title: "Accountants for Doctors With a Limited Company",
  description:
    "For doctors already trading private or locum work through a company: extraction, IR35, the NHS pension interaction, year end and closing up. 2026/27 rates.",
  alternates: {
    canonical: `${siteConfig.url}/for-medical-companies`,
    languages: {
      "en-GB": `${siteConfig.url}/for-medical-companies`,
      "x-default": `${siteConfig.url}/for-medical-companies`,
    },
  },
  openGraph: {
    title: "Accountants for Doctors With a Limited Company",
    description:
      "Salary versus dividend, IR35 status, the NHS pension interaction, the director's loan account and closing up, on 2026/27 rates.",
    url: `${siteConfig.url}/for-medical-companies`,
    type: "website",
    images: [{ url: `/api/og?title=${encodeURIComponent("Accountants for Doctors With a Limited Company")}`, width: 1200, height: 630, alt: "Accountants for Doctors With a Limited Company" }],
  },
};

const data: AudienceStage = {
  slug: "for-medical-companies",
  role: "medical-companies",
  displayRole: "Doctors With a Limited Company",
  displayRoleLower: "doctors running a medical limited company",
  badge: "Salary vs dividend · IR35 · NHS pension accrual",
  heroHeading: "Accountants for doctors running a medical limited company",
  intro:
    "You already have the company. Private clinics, medico-legal reports or locum work run through it, and the question is no longer whether to incorporate but how to run it properly. That means four decisions that repeat every year: how much comes out as salary and how much as dividend, whether a locum engagement is inside IR35 and so never really company income at all, what the company costs you in NHS pension accrual, and when the corporation tax is actually due. A fifth arrives once, when the company is closed and the money either leaves as capital or is taxed as income. Each is set out below on 2026/27 rates, because the dividend rates and the loan charge both moved on 6 April 2026.",
  // Statutory figures from docs/medical/_wave1/medical-companies.json.
  // "19% to 25%" and "9 months and 1 day" are ranges/durations, not single
  // counted-up numbers, so both render as text stats (target 0, value in the
  // label). 35.75% and £200 are single figures and use StatsCounter normally.
  stats: [
    { target: 0, label: "19% to 25%: corporation tax 2026/27, marginal relief between £50,000 and £250,000" },
    { target: 35.75, decimals: 2, suffix: "%", label: "Dividend upper rate 2026/27, and the s.455 loan charge rate on loans made from 6 April 2026" },
    { target: 0, label: "9 months and 1 day: corporation tax payment deadline after your period end" },
    { target: 200, prefix: "£", label: "First late-filing penalty on a company tax return" },
  ],
  concerns: [
    {
      icon: BarChart,
      title: "How much salary and how much dividend, this year?",
      body: "The arithmetic changed on 6 April 2026. Dividends are taxed at 10.75%, 35.75% and 39.35% for 2026/27 above a £500 allowance, on profit that has already borne corporation tax: 19% to £50,000, 25% above £250,000, an effective 26.5% between. Salary is deductible, but the company pays employer National Insurance at 15% above a £5,000 secondary threshold, and the £10,500 Employment Allowance is not available to a single-director company. Which way the <a href=\"/blog/salary-vs-dividend-medical-limited-company-2026\">salary versus dividend comparison</a> falls depends on how much you need to draw.",
    },
    {
      icon: ShieldAlert,
      title: "Is this locum engagement inside IR35?",
      body: "Company income from locum work is only company income if the engagement is outside IR35. Public bodies including NHS Trusts have decided status since 6 April 2017; medium and large private hirers took it on from 6 April 2021. Each issues a Status Determination Statement, and the fee-payer operates PAYE against it. Only a small private client leaves the decision with your own company. Doctors across several hirers hold inside and outside determinations at once, so the extraction plan rests on the outside-IR35 share alone.",
    },
    {
      icon: PiggyBank,
      title: "The company costs you NHS pension accrual",
      body: "Money taken through the company as dividends is not NHS-pensionable, whatever the company is, so NHS work stays where it is and the company takes private and outside-IR35 work. A GMS contract can sit with a company limited by shares, but only one whose shareholders all qualify under the NHS Act 2006 conditions with a medical practitioner among them, which an ordinary personal service company does not. For a consultant only the substantive NHS post is pensionable, so a tax comparison alone flatters the company.",
    },
    {
      icon: CreditCard,
      title: "The director's loan account, and the date the charge attaches",
      body: "A medical company is a close company, so an overdrawn director's loan still outstanding 9 months and 1 day after the period end carries a section 455 charge: 35.75% on loans made on or after 6 April 2026, 33.75% on loans made in 2025/26 or earlier. Date-band by when the loan was made, not when it fell due. Section 458 gives it back once the loan is cleared, but that relief is deferred by another 9 months and 1 day. Worked through in <a href=\"/blog/consultant-directors-loan-account-s455-medical-company\">the director's loan account guide</a>.",
    },
    {
      icon: FileText,
      title: "Two deadlines in the wrong order, and cash that stays put",
      body: "Corporation tax is payable 9 months and 1 day after the period end; the return is not due for 12 months. Payment first, filing second, and that ordering is what directors get wrong. Late filing costs £200, not the £100 Self Assessment figure. Profit left behind needs its own plan: dividends a UK company receives are normally exempt under Part 9A of the Corporation Tax Act 2009, but the cash is still trapped, and holding investments loses business relief. Options in <a href=\"/blog/surplus-cash-medical-limited-company-options\">surplus cash in a medical company</a>.",
    },
  ],
  services: [
    {
      title: "Your extraction mix, modelled before the year end",
      body: "A specialist reviews expected profit, your other income, the outside-IR35 share and any spouse shareholding, then models salary, dividend and employer pension contribution at your own numbers while they can still change. First pass yourself with the <a href=\"/calculators/private-practice-incorporation\">private practice incorporation calculator</a>.",
    },
    {
      title: "Year-end accounts and the company tax return prepared",
      body: "Statutory accounts and the CT600 are prepared, the director's loan account reconciled to the charge date, capital allowances on equipment checked, and the payment figure given to you well before the 9 month and 1 day deadline.",
    },
    {
      title: "Each engagement read for IR35 separately",
      body: "Determinations are reviewed one engagement at a time against personal service, control, mutuality and integration, and a statement you disagree with is assessed before the client-led disagreement process is used. Inside-IR35 income then stays out of the plan.",
    },
    {
      title: "Closing the company planned before the first distribution",
      body: "Whether a final distribution is capital or income turns on the winding-up rule, and for doctors the condition that bites is similar work within two years. That is tested against your intentions before anything is distributed.",
    },
  ],
  faqs: [
    {
      q: "Is it still worth running my private work through a company in 2026/27?",
      a: "At typical private-income levels the tax saving is modest, and the rates that took effect on 6 April 2026 narrowed it further. What justifies it now is usually something else: keeping private income outside pensionable pay to manage the annual allowance taper, retaining profit you do not need to draw, family shareholding and limited liability. Against that sit the compliance cost and the NHS accrual lost on dividends.",
    },
    {
      q: "How much salary should I pay myself?",
      a: "There is no single right figure. Employer National Insurance starts at 15% above the £5,000 secondary threshold, and a single-director company cannot claim the £10,500 Employment Allowance, so many set salary at or near that threshold and take the rest as dividend. That shifts if you genuinely employ a spouse at market rate, or want salary behind a pension contribution or mortgage.",
    },
    {
      q: "My director's loan account is overdrawn. What happens now?",
      a: "If the balance is still outstanding 9 months and 1 day after the period end, the company pays a section 455 charge at 35.75% for loans made on or after 6 April 2026 and 33.75% for earlier ones. Section 458 gives it back when the loan is repaid, but only 9 months and 1 day after the end of that period, so it is a real cash cost meanwhile. Repaying and immediately redrawing does not work: repayments are matched against new borrowing under the 30-day and arrangements rules.",
    },
    {
      q: "What happens to the money when I close the company?",
      a: "A distribution in a winding up is treated as income rather than capital where four conditions are all met, and the one that catches doctors is continuing or becoming involved in the same or a similar trade within two years of the distribution. Resuming private work, in any vehicle, sits squarely within it. Where the rule applies the distribution is taxed at dividend rates, and Business Asset Disposal Relief at 18% goes with it.",
    },
    {
      q: "Can the company pay into my pension instead of paying me?",
      a: "Often it is the most efficient route. An employer contribution to a registered scheme carries no National Insurance on either side, where the same money as salary carries employer National Insurance at 15% plus employee National Insurance, and it is deductible unless there is a non-trade purpose. The catch is the annual allowance: an NHS defined benefit input amount may already have used it, and a contribution beyond it brings a charge at your marginal rate.",
    },
  ],
  ctaTitle: "Talk to an accountant about running your company",
  ctaBody:
    "A call with a regulated firm from our specialist partner network, covering your salary and dividend mix, the IR35 status of your engagements, and the director's loan account or corporation tax deadlines. Scope and fees are agreed with that firm, and enquiring commits you to nothing.",
  relatedCalculators: [
    {
      href: "/calculators/private-practice-incorporation",
      name: "Private Practice Incorporation Calculator",
      desc: "Compare sole trader against limited company take-home on private practice income, and what the company route costs in pension accrual.",
    },
  ],
  relatedGuides: [
    {
      href: "/blog/salary-vs-dividend-medical-limited-company-2026",
      title: "Salary vs Dividend in a Medical Limited Company, 2026/27",
      body: "The corporation tax and dividend arithmetic after the 6 April 2026 rate changes.",
    },
    {
      href: "/blog/consultant-directors-loan-account-s455-medical-company",
      title: "The Director's Loan Account and Section 455",
      body: "When the charge attaches, the rate by loan date, and how section 458 relief works.",
    },
    {
      href: "/blog/surplus-cash-medical-limited-company-options",
      title: "Surplus Cash in a Medical Limited Company: Your Options",
      body: "What to do with profit you do not need to draw, and the business relief trap of holding investments.",
    },
  ],
};

export default function ForMedicalCompaniesPage() {
  return <AudienceStageLayout data={data} />;
}
