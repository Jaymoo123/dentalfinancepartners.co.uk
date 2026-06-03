import type { Metadata } from "next";
import { ShieldAlert, List, Receipt, Building2, Phone, TrendingDown } from "lucide-react";
import { siteConfig } from "@/config/site";
import { AudienceStageLayout, type AudienceStage } from "@/components/audience/AudienceStageLayout";

export const metadata: Metadata = {
  title: "Locum Accountant | IR35, Ltd Company & Tax Returns for Locum Doctors",
  description:
    "Specialist locum accountant services for UK locum doctors. IR35 status reviews, limited company vs umbrella analysis, locum tax returns, expense claims, and NHS pension guidance. Medical-only focus.",
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
  },
};

const data: AudienceStage = {
  slug: "for-locum-doctors",
  role: "locum-doctors",
  displayRole: "Locum Doctors",
  badge: "Self-employed locums · Limited company · IR35",
  heroHeading: "Locum accountant and tax specialists for UK locum doctors",
  intro:
    "Locum medicine gives you clinical flexibility, but the financial side is genuinely complicated: IR35 status varies by engagement, expense claims depend on your working pattern, the limited company vs umbrella vs sole trader decision affects your take-home significantly, and your NHS pension entitlement depends on which type of engagement you hold. Most accountants who have not worked extensively with locums get at least one of these wrong.",
  stats: [
    { value: "100%", label: "Medical-only client base" },
    { value: "5", label: "IR35 factors we review" },
    { value: "24h", label: "Response guarantee" },
    { value: "£0", label: "Hidden fees" },
  ],
  concerns: [
    {
      icon: ShieldAlert,
      title: "What is my IR35 status and does it matter?",
      body: "For NHS work, HMRC has long indicated that most GP locum engagements sit outside IR35 due to the lack of substitution clauses and the way NHS practices operate. However, status is determined by the actual working arrangement, not the contract alone. We review each engagement type, advise on structuring to maintain outside-IR35 status where appropriate, and keep you informed as HMRC guidance evolves.",
    },
    {
      icon: Building2,
      title: "Should I be a limited company, sole trader, or use an umbrella?",
      body: "The right answer depends on your income level, the IR35 status of your engagements, whether you have a spouse or partner with pension headroom, and how much administrative complexity you are willing to manage. We model the net take-home under all three structures at your actual earnings level before making a recommendation.",
    },
    {
      icon: Receipt,
      title: "What expenses can I claim as a locum?",
      body: "GMC retention, MDU/MPS/MDDUS indemnity, professional subscriptions, motor between separate engagements (not home-to-first), locum booking fees and agency costs, CPD and conference costs, home office where genuinely used for administration, and medical equipment. We review new clients' previous returns and typically find meaningful under-claims.",
    },
    {
      icon: List,
      title: "How do I handle multiple income streams?",
      body: "Locum doctors often receive income from GP agencies, direct practice contracts, bank shifts, private clinics, and out-of-hours providers simultaneously. Each may be treated differently for IR35, NI, and pension purposes. We map each income stream, ensure correct tax treatment, and produce a single clear self-assessment return.",
    },
    {
      icon: Phone,
      title: "Am I entitled to the NHS Pension Scheme as a locum?",
      body: "GP locums working for practices can join the NHS Pension Scheme as a type 2 medical practitioner, which covers solo self-employed GPs. Bank locums contracted through NHS trusts are usually enrolled as a type 1 (employee). The pension treatment and contribution rates differ. We confirm your entitlement and ensure you are not missing pensionable service.",
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
      a: "Yes, but only the business portion. Travel from home to your first engagement is typically not allowable (it is ordinary commuting). Travel between separate practices or to separate engagements in a day is allowable. If you use your car for both personal and business purposes, you claim either the approved mileage rate (45p per mile up to 10,000 miles, 25p thereafter) or the actual business proportion of all running costs and capital allowances. We assess which method gives you the better deduction based on your vehicle and mileage.",
    },
    {
      q: "How does the NHS Pension Scheme type 2 certificate work?",
      a: "As a self-employed GP locum working directly with practices (not through an NHS trust), you complete a type 2 certificate after each locum session. The practice deducts your tiered employee contribution from your sessional fee. You later pay the employer contribution (currently 23.7%) via your self-assessment. We include this in your return and ensure you are not overpaying or underpaying employer contributions.",
    },
    {
      q: "What records should I keep as a locum doctor?",
      a: "Income: all sessional fee invoices and agency payment summaries, bank statements showing receipts. Expenses: receipts or invoices for all claimed items, a mileage log with dates, locations, and purpose for all professional travel. Pension: type 2 certificates or type 1 P60 statements. The self-assessment record-keeping requirement is five years from the filing deadline. We provide a simple record-keeping template when you join.",
    },
  ],
  ctaTitle: "Get your locum tax done right",
  ctaBody:
    "30-minute call, free. We review your current structure, check your IR35 exposure, and identify any expense claims you are missing. No obligation.",
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
