import type { Metadata } from "next";
import { ShieldAlert, List, Receipt, Building2, Phone, TrendingDown } from "lucide-react";
import { siteConfig } from "@/config/site";
import { AudienceStageLayout, type AudienceStage } from "@/components/audience/AudienceStageLayout";

// Retitled 2026-08-26. The old title led with "locum accountant" (2 impr, 90d)
// and buried the phrase that actually carries the demand: "accountants for
// locum doctors", 106 impressions at position 60.5, caught by the HOMEPAGE
// rather than this page. Leading with the doctor-specific phrase, keeping
// "locum accountant" as the second phrase so neither is lost.
export const metadata: Metadata = {
  title: "Accountants for Locum Doctors | Locum Accountant, IR35 & Tax",
  description:
    "Accountants for locum doctors across the UK. IR35 status per engagement, limited company versus umbrella modelled on your earnings, locum expense claims, self-assessment, and NHS Pension Forms A and B.",
  alternates: {
    canonical: `${siteConfig.url}/for-locum-doctors`,
    languages: {
      "en-GB": `${siteConfig.url}/for-locum-doctors`,
      "x-default": `${siteConfig.url}/for-locum-doctors`,
    },
  },
  openGraph: {
    title: "Accountants for Locum Doctors | IR35, Ltd Company & Tax Returns",
    description:
      "IR35 status reviews, limited company vs umbrella analysis, locum expense claims, and NHS pension guidance. 100% medical focus.",
    url: `${siteConfig.url}/for-locum-doctors`,
    type: "website",
    images: [{ url: `/api/og?title=${encodeURIComponent("Accountants for Locum Doctors | IR35, Ltd Company & Tax Returns")}`, width: 1200, height: 630, alt: "Accountants for Locum Doctors | IR35, Ltd Company & Tax Returns" }],
  },
};

const data: AudienceStage = {
  slug: "for-locum-doctors",
  role: "locum-doctors",
  displayRole: "Locum Doctors",
  badge: "Self-employed locums · Limited company · IR35",
  heroHeading: "Accountants for locum doctors across the UK",
  intro:
    "Locum medicine buys clinical flexibility at the price of a genuinely complicated financial position. IR35 status is decided engagement by engagement and by the working arrangement rather than the wording of the contract. Which expenses are allowable depends on your travel pattern, not on a standard list. The choice between a limited company, an umbrella and sole trader status moves your take-home meaningfully and the right answer changes with your earnings level. And NHS Pension accrual on locum work only happens if Forms A and B are actually completed and submitted. An accountant who sees locum doctors regularly gets all four right; one who does not usually gets at least one wrong.",
  stats: [
    { value: "100%", label: "Medical work only" },
    { value: "1 day", label: "Reply to enquiries" },
    { value: "£90k", label: "VAT threshold, taxable turnover only" },
    { value: "£50k", label: "MTD for Income Tax, live since Apr 2026" },
  ],
  concerns: [
    {
      icon: ShieldAlert,
      title: "What is my IR35 status, and who actually decides it?",
      body: "First, IR35 only engages if you work through a personal service company. A sole trader locum has no intermediary, so IR35 does not apply and status is judged on the ordinary employed-versus-self-employed factors instead. If you do use a company, who decides depends on the hirer. NHS Trusts and other public bodies have determined status themselves since 6 April 2017, and medium and large private hirers since 6 April 2021, issuing a Status Determination Statement with reasons that the fee-payer then operates PAYE against. Only small private-sector clients leave the decision with your own company. A locum across several hirers routinely holds a mix of inside and outside determinations at the same time, and a determination you disagree with can be challenged through the client-led disagreement process.",
    },
    {
      icon: Building2,
      title: "Should I be a limited company, sole trader, or use an umbrella?",
      body: "The right answer depends on your income level, the IR35 status of your engagements, whether you have a spouse or partner with pension headroom, and how much administrative complexity you are willing to manage. We model the net take-home under all three structures at your actual earnings level before making a recommendation.",
    },
    {
      icon: Receipt,
      title: "What expenses can I claim as a locum?",
      body: "GMC retention, professional subscriptions on HMRC's approved List 3, motor between separate engagements at 55p per mile for the first 10,000 business miles in 2026/27 then 25p (home to first engagement is ordinary commuting and is not allowable), locum booking and agency fees, CPD genuinely relevant to current practice, home office on a defensible apportionment, and medical equipment, usually through capital allowances. Indemnity is worth a second look: since 1 April 2019 the Clinical Negligence Scheme for General Practice has covered NHS general practice clinical negligence in England without a subscription, so your own MDU, MPS or MDDUS cost now mainly relates to private, non-clinical and regulatory cover. Prior returns are reviewed and amended where the under-claim is material.",
    },
    {
      icon: List,
      title: "How do I handle multiple income streams?",
      body: "Locum doctors often receive income from GP agencies, direct practice contracts, bank shifts, private clinics, and out-of-hours providers simultaneously. Each may be treated differently for IR35, NI, and pension purposes. We map each income stream, ensure correct tax treatment, and produce a single clear self-assessment return.",
    },
    {
      icon: Phone,
      title: "Can I pension my locum work, and what is the 10-week rule?",
      body: "Freelance GP locum work in England is pensioned through Forms A and B. Form A is completed for the session and approved by the practice, then Form B goes to PCSE. The trap is the deadline: PCSE will not pension a period of freelance locum work that ended more than 10 weeks ago, and forms received after that are rejected. This is not a late-filing penalty, it is pension accrual lost permanently, which makes it the single most expensive administrative mistake a locum can make. Contributions are then paid over no later than the seventh day of the following month. Bank and trust engagements are different again, usually enrolled as employed membership through payroll.",
    },
    {
      icon: TrendingDown,
      title: "What happens when I earn over the VAT threshold?",
      body: "If your locum income from taxable engagements exceeds £90,000 in a rolling 12-month period, VAT registration is required. Most GP surgery work is VAT-exempt (medical services), but agency fees and certain other services are taxable. We monitor your position and register you at the right time to avoid penalties.",
    },
  ],
  services: [
    {
      title: "Locum tax returns and self-assessment",
      body: "Complete locum tax return across all income sources: agency, direct, bank, private, out-of-hours. All allowable expenses claimed. Class 4 NI (6% on profits between £12,570 and £50,270, 2% above) calculated correctly. NHS pension contributions reconciled from type 2 certificates or type 1 P60 statements. Filed inside the deadline.",
    },
    {
      title: "IR35 status review per engagement",
      body: "We review each of your engagements against the IR35 tests: personal service, control, mutuality of obligation, and integration. Where status is borderline, we advise on structuring changes. We keep you updated as HMRC guidance on GP locum status evolves.",
    },
    {
      title: "Limited company setup and ongoing compliance",
      body: "If a limited company is the right structure for your income level and IR35 position, we set it up correctly: shareholder structure, PSC payroll, corporation tax return, company accounts, and dividend extraction optimised across all your income. We also handle the NHS pension interaction.",
    },
    {
      title: "Locum expense claim review and optimisation",
      body: "We review up to three years of prior locum tax returns for under-claimed expenses and file amendments where the gap is material. New locum clients typically see a meaningful recovery from missed indemnity, GMC, CPD, and mileage claims. Going forward, we provide a personalised expense guide and review annually.",
    },
    {
      title: "VAT registration and compliance",
      body: "We monitor your cumulative taxable turnover, register you at the right point, advise on VAT scheme selection (flat rate may be beneficial for locums), and handle quarterly VAT returns.",
    },
    {
      title: "NHS pension guidance for locums",
      body: "We clarify your pension entitlement type, review your pensionable earnings each year, check annual allowance position, and advise on whether additional pension contributions or a separate personal pension sit alongside your NHS pension in a tax-efficient way.",
    },
  ],
  faqs: [
    {
      q: "I have been operating as a sole trader. Should I switch to a limited company?",
      a: "The case for switching depends on three things: your sustained locum income level (above roughly £80,000 per year), the IR35 status of your main engagements (outside IR35 is needed to benefit from the company structure), and whether you have flexibility over when you draw income or a spouse/partner with pension headroom. Below £80,000, the administrative burden of running a company usually outweighs the tax saving. We model your specific numbers before making a recommendation.",
    },
    {
      q: "My agency says I am inside IR35. What does that mean for my tax?",
      a: "If an agency issues a Status Determination Statement (SDS) saying you are inside IR35, the agency is required to deduct income tax and NI from your fees before paying you, as if you were an employee. You cannot run this income through a limited company tax-efficiently. You can challenge the SDS if you believe it is incorrect by using the client-led disagreement process. We review SDS decisions and advise whether a challenge is warranted.",
    },
    {
      q: "Can I claim the cost of my car as a locum doctor?",
      a: "Yes, but only the business portion. Travel from home to your first engagement is typically not allowable (it is ordinary commuting). Travel between separate practices or to separate engagements in a day is allowable. If you use your car for both personal and business purposes, you claim either the approved mileage rate (55p per mile for the first 10,000 business miles in 2026/27, then 25p per mile) or the actual business proportion of all running costs and capital allowances. We assess which method gives you the better deduction based on your vehicle and mileage.",
    },
    {
      q: "Forms A and B, or a Type 2 certificate? Which applies to me?",
      a: "They are for different people, and mixing them up costs pension. Freelance GP locums use Forms A and B per period of locum work: Form A is approved by the practice, then Form B is submitted to PCSE, and the work must reach PCSE within 10 weeks of the period ending or it cannot be pensioned at all. The Type 2 annual self-assessment is for salaried and solo GPs, and like the Type 1 annual certificate for partners it runs to a 28 February deadline a year in arrears, so the 2025/26 pension year is due by 28 February 2027. Employee contributions are tiered by pensionable pay, with the bands uplifted each 1 April by the previous September's CPI, and the employer rate has been 23.7% of pensionable pay since 1 April 2024. That employer rate is due to be re-set from 1 April 2027 by the 2024 valuation.",
    },
    {
      q: "What records should I keep as a locum doctor?",
      a: "Income: all sessional fee invoices and agency payment summaries, bank statements showing receipts. Expenses: receipts or invoices for all claimed items, a mileage log with dates, locations, and purpose for all professional travel. Pension: type 2 certificates or type 1 P60 statements. The self-assessment record-keeping requirement is five years from the filing deadline. We provide a simple record-keeping template when you join.",
    },
  ],
  ctaTitle: "Talk to an accountant who works with locum doctors",
  ctaBody:
    "A free 30-minute call covering your current structure, your IR35 position engagement by engagement, whether any locum work is at risk of falling outside the 10-week pension window, and the expense claims that look under-made. No obligation.",
  relatedCalculators: [
    {
      href: "/calculators/locum-tax-calculator",
      name: "Locum Doctor Tax Calculator",
      desc: "Enter your gross locum income, allowable expenses, and student loan plan. See your net take-home and estimated tax bill. 2025/26 and 2026/27 rates.",
    },
  ],
  relatedGuides: [
    {
      href: "/medical-guides/locum-limited-company-vs-umbrella",
      title: "Locum Doctor: Ltd Company vs Umbrella vs Sole Trader",
      body: "Net take-home comparison, IR35 interaction, admin burden, and when each structure makes sense.",
    },
    {
      href: "/medical-guides/ir35-for-locums",
      title: "IR35 for Locum Doctors",
      body: "The five tests, NHS agency SDS process, how to challenge an inside-IR35 decision.",
    },
    {
      href: "/medical-guides/medical-expenses-tax-treatment",
      title: "Medical Expenses: What Doctors Can Claim",
      body: "GMC, indemnity, motor, CPD, and home office. The full locum expense guide.",
    },
  ],
};

export default function ForLocumDoctorsPage() {
  return <AudienceStageLayout data={data} />;
}
