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
      "IR35 status reviews, limited company vs umbrella analysis, locum expense claims, and NHS pension guidance.",
    url: `${siteConfig.url}/for-locum-doctors`,
    type: "website",
    images: [{ url: `/api/og?title=${encodeURIComponent("Accountants for Locum Doctors | IR35, Ltd Company & Tax Returns")}`, width: 1200, height: 630, alt: "Accountants for Locum Doctors | IR35, Ltd Company & Tax Returns" }],
  },
};

const data: AudienceStage = {
  slug: "for-locum-doctors",
  role: "locum-doctors",
  displayRole: "Locum Doctors",
  displayRoleLower: "locum doctors",
  badge: "Self-employed locums · Limited company · IR35",
  heroHeading: "Accountants for locum doctors across the UK",
  intro:
    "Locum medicine buys clinical flexibility at the price of a genuinely complicated financial position. IR35 status is decided engagement by engagement and by the working arrangement rather than the wording of the contract. Which expenses are allowable depends on your travel pattern, not on a standard list. The choice between a limited company, an umbrella and sole trader status moves your take-home meaningfully and the right answer changes with your earnings level. And NHS Pension accrual on locum work only happens if Forms A and B are actually completed and submitted. An accountant who sees locum doctors regularly gets all four right; one who does not usually gets at least one wrong.",
  // Statutory figures only, each re-derived 2026-09-11 against
  // docs/medical/house_positions.md. The two figures that previously sat here
  // ("100% medical work only", "1 day reply to enquiries") were a client-base
  // claim and a response-time promise: neither is in house_positions and both
  // are barred, so they do not republish.
  stats: [
    // house_positions 6: VAT registration threshold £90,000, taxable
    // (non-exempt) turnover only.
    { target: 90, prefix: "£", suffix: "k", label: "VAT registration, taxable turnover only" },
    // house_positions 9: MTD for Income Tax, £50,000 from 6 April 2026, live.
    { target: 50, prefix: "£", suffix: "k", label: "MTD for Income Tax, live since April 2026" },
    // house_positions 2.C: a freelance locum cannot pension work that ended
    // more than 10 weeks ago.
    { target: 10, suffix: " weeks", label: "Deadline to pension locum work" },
    // house_positions 2.C: top NHS pension member contribution tier for
    // 2026/27, on pensionable pay of £67,669 and above.
    { target: 12.5, decimals: 1, suffix: "%", label: "Top pension contribution tier, 2026/27" },
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
      body: "The right answer depends on your income level, the IR35 status of your engagements, whether you have a spouse or partner with pension headroom, and how much administrative complexity you are willing to manage. The net take-home under all three structures is modelled at your actual earnings level before any recommendation.",
    },
    {
      icon: Receipt,
      title: "What expenses can I claim as a locum?",
      body: "GMC retention, professional subscriptions on HMRC's approved List 3, motor between separate engagements at 55p per mile for the first 10,000 business miles in 2026/27 then 25p (home to first engagement is ordinary commuting and is not allowable), locum booking and agency fees, CPD genuinely relevant to current practice, home office on a defensible apportionment, and medical equipment, usually through capital allowances. Indemnity is worth a second look: since 1 April 2019 the Clinical Negligence Scheme for General Practice has covered NHS general practice clinical negligence in England without a subscription, so your own MDU, MPS or MDDUS cost now mainly relates to private, non-clinical and regulatory cover. Prior returns are reviewed and amended where the under-claim is material.",
    },
    {
      icon: List,
      title: "How do I handle multiple income streams?",
      body: "Locum doctors often receive income from GP agencies, direct practice contracts, bank shifts, private clinics, and out-of-hours providers simultaneously. Each may be treated differently for IR35, NI, and pension purposes. Each income stream is mapped, its tax treatment settled separately, and a single clear self-assessment return produced.",
    },
    {
      icon: Phone,
      title: "Can I pension my locum work, and what is the 10-week rule?",
      body: "Freelance GP locum work in England is pensioned through Forms A and B. Form A is completed for the session and approved by the practice, then Form B goes to PCSE. The trap is the deadline: PCSE will not pension a period of freelance locum work that ended more than 10 weeks ago, and forms received after that are rejected. This is not a late-filing penalty, it is pension accrual lost permanently, which makes it the single most expensive administrative mistake a locum can make. Contributions are then paid over no later than the seventh day of the following month. Bank and trust engagements are different again, usually enrolled as employed membership through payroll.",
    },
    {
      icon: TrendingDown,
      title: "What happens when I earn over the VAT threshold?",
      body: "If your locum income from taxable engagements exceeds £90,000 in a rolling 12-month period, VAT registration is required. Most GP surgery work is VAT-exempt (medical services), but agency fees and certain other services are taxable. The rolling position is monitored and registration made at the right time to avoid penalties.",
    },
  ],
  services: [
    {
      title: "Locum tax returns and self-assessment",
      body: "Complete locum tax return across all income sources: agency, direct, bank, private, out-of-hours. All allowable expenses claimed. Class 4 NI (6% on profits between £12,570 and £50,270, 2% above) calculated correctly. NHS pension contributions reconciled from type 2 certificates or type 1 P60 statements. Filed inside the deadline.",
    },
    {
      title: "IR35 status review per engagement",
      body: "Each engagement is reviewed against the IR35 tests: personal service, control, mutuality of obligation, and integration. Where status is borderline, the options for structuring the engagement differently are set out. HMRC guidance on GP locum status keeps moving, so the review is a standing one rather than a one-off.",
    },
    {
      title: "Limited company setup and ongoing compliance",
      body: "If a limited company is the right structure for your income level and IR35 position, it is set up correctly: shareholder structure, PSC payroll, corporation tax return, company accounts, and dividend extraction read across all your income. The NHS pension interaction is settled alongside it.",
    },
    {
      title: "Locum expense claim review and optimisation",
      body: "Up to three years of prior locum tax returns are reviewed for under-claimed expenses and amendments filed where the gap is material. Indemnity, GMC, CPD and mileage are where the gaps usually sit. Going forward, you get a personalised expense guide and an annual review.",
    },
    {
      title: "VAT registration and compliance",
      body: "Your cumulative taxable turnover is monitored, registration made at the right point, VAT scheme selection weighed (flat rate suits some locums), and quarterly VAT returns handled.",
    },
    {
      title: "NHS pension guidance for locums",
      body: "Your pension entitlement type is clarified, your pensionable earnings reviewed each year, your annual allowance position checked, and whether additional contributions or a separate personal pension sit tax-efficiently alongside the NHS scheme worked through.",
    },
  ],
  faqs: [
    {
      q: "I have been operating as a sole trader. Should I switch to a limited company?",
      a: "It turns on the IR35 status of your main engagements (outside IR35 is needed to benefit from a company at all), on how much of the income you can leave in the company rather than drawing it, and on whether a spouse or partner has pension headroom. There is no income level at which a company is automatically better: corporation tax at 19% up to £50,000 of profit and 25% above £250,000, plus dividend tax at 10.75%, 35.75% or 39.35% for 2026/27, has to beat income tax and Class 4 on the same profit, and the company carries its own compliance cost on top. Your specific numbers are modelled before any recommendation.",
    },
    {
      q: "My agency says I am inside IR35. What does that mean for my tax?",
      a: "If an agency issues a Status Determination Statement (SDS) saying you are inside IR35, the agency is required to deduct income tax and NI from your fees before paying you, as if you were an employee. You cannot run this income through a limited company tax-efficiently. You can challenge the SDS if you believe it is incorrect by using the client-led disagreement process. SDS decisions are reviewed and the prospects of a challenge assessed before one is raised.",
    },
    {
      q: "Can I claim the cost of my car as a locum doctor?",
      a: "Yes, but only the business portion. Travel from home to your first engagement is typically not allowable (it is ordinary commuting). Travel between separate practices or to separate engagements in a day is allowable. If you use your car for both personal and business purposes, you claim either the approved mileage rate (55p per mile for the first 10,000 business miles in 2026/27, then 25p per mile) or the actual business proportion of all running costs and capital allowances. Which method gives the better deduction depends on your vehicle and your mileage, and is assessed before the return is filed.",
    },
    {
      q: "Forms A and B, or a Type 2 certificate? Which applies to me?",
      a: "They are for different people, and mixing them up costs pension. Freelance GP locums use Forms A and B per period of locum work: Form A is approved by the practice, then Form B is submitted to PCSE, and the work must reach PCSE within 10 weeks of the period ending or it cannot be pensioned at all. The Type 2 annual self-assessment is for salaried and solo GPs, and like the Type 1 annual certificate for partners it runs to a 28 February deadline a year in arrears, so the 2025/26 pension year is due by 28 February 2027. Employee contributions are tiered by pensionable pay, with the bands uplifted each 1 April by the previous September's CPI, and the employer rate has been 23.7% of pensionable pay since 1 April 2024. That employer rate is due to be re-set from 1 April 2027 by the 2024 valuation.",
    },
    {
      q: "What records should I keep as a locum doctor?",
      a: "Income: all sessional fee invoices and agency payment summaries, bank statements showing receipts. Expenses: receipts or invoices for all claimed items, a mileage log with dates, locations, and purpose for all professional travel. Pension: type 2 certificates or type 1 P60 statements. The self-assessment record-keeping requirement is five years from the filing deadline. A simple record-keeping template is provided at the start.",
    },
  ],
  ctaTitle: "Talk to an accountant who works with locum doctors",
  ctaBody:
    "A free 30-minute call covering your current structure, your IR35 position engagement by engagement, whether any locum work is at risk of falling outside the 10-week pension window, and the expense claims that look under-made. No obligation.",
  calculatorTabs: ["locumtax"],
  // Literal /calculators/<slug> hrefs. The tabs above them render buttons, not
  // anchors, so this list is what keeps the crawl path (DISPOSITION_SLICE2 B.1).
  relatedCalculators: [
    {
      href: "/calculators/locum-tax-calculator",
      name: "Locum Doctor Tax Calculator",
      desc: "Enter gross locum income, allowable expenses and your student loan plan to see net take-home and the estimated tax bill.",
    },
    {
      href: "/calculators/doctor-expenses-tax-relief",
      name: "Doctor Expenses Tax Relief",
      desc: "Price the relief on indemnity, GMC and BMA fees, CPD, equipment and motor across a locum year.",
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
