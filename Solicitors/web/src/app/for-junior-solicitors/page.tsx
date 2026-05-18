import type { Metadata } from "next";
import { AudienceStageLayout, type AudienceStage } from "@/components/audience/AudienceStageLayout";
import { siteConfig } from "@/config/site";

const data: AudienceStage = {
  slug: "for-junior-solicitors",
  title: "Accountants for UK Junior Solicitors and Trainees",
  metaTitle: "Accountants for Junior Solicitors UK | Trainee + Associate Tax",
  metaDescription:
    "Tax help for UK trainee solicitors and junior associates. SQE expenses, training contract income, salary banding, professional fees, first-time self-assessment.",
  eyebrow: "For junior solicitors + trainees",
  badge: "Trainees · Newly-qualified · 2-5 years PQE · SQE candidates",
  heroHeading: "Tax support for junior solicitors and trainees",
  intro:
    "The tax position changes fast in the first 5 years. Trainee on PAYE. SQE costs (sometimes employer-funded, sometimes not). Newly-qualified with significant student debt and a higher salary band. Associate bonuses that trigger higher-rate tax for the first time. We help you stay on top of all of it.",
  stats: [
    { value: "100%", label: "SQE prep costs (if employer pays)" },
    { value: "£12,570", label: "Personal allowance 2025/26" },
    { value: "£50,270", label: "Higher-rate threshold" },
    { value: "£100k", label: "Personal allowance taper begins" },
  ],
  concerns: [
    {
      title: "What can I claim against my training contract income?",
      body: "Almost nothing if you're a PAYE trainee. Employee expenses are restricted to costs 'wholly, exclusively and necessarily' for the duties of employment. Course materials, travel to the training office, professional subscriptions are claimable if you pay them and the employer doesn't reimburse. SQE costs you pay yourself can be relievable depending on the structure.",
    },
    {
      title: "I'm doing SQE alongside work. Are my course fees deductible?",
      body: "Depends on the structure. If your employer pays SQE costs, no tax issue for you (they get the corporation tax deduction). If you pay yourself and your employer is contractually obliged to reimburse, similar position. If you pay yourself with no reimbursement, the relief depends on whether the SQE constitutes 'training for current employment duties' (relievable) or 'training for new employment / qualification' (generally not relievable). It's not a clean answer.",
    },
    {
      title: "I just qualified. My salary jumped to higher-rate. What do I do?",
      body: "Most newly-qualified solicitors hit higher-rate tax for the first time. Pension contributions become more attractive (40% relief instead of 20%). Salary-sacrifice schemes (if your firm offers them) save the higher-rate tax on the sacrificed amount. Charitable gift aid extends your basic-rate band. We help model the year.",
    },
    {
      title: "I have £80k of student loan debt. How does it interact with my salary?",
      body: "Plan 2 (most common for solicitors who studied in England post-2012): 9% of salary above £27,295 (2025/26 threshold). Plan 1 (pre-2012): 9% above £24,990. Plan 5 (post-Aug 2023): 9% above £25,000 over 40 years. The deduction is automatic through PAYE; we help you understand the long-term cost and whether voluntary repayments make sense.",
    },
    {
      title: "Can I claim mileage to court / client sites?",
      body: "If you travel from your normal office to a court or client site as part of your duties, yes (the office is your 'permanent workplace', the rest is business travel). Home-to-office is not deductible. We help calibrate the boundary for solicitors who increasingly work hybrid.",
    },
    {
      title: "Bonuses are pushing me over £100k. What's the personal allowance taper?",
      body: "Adjusted net income above £100,000 reduces the £12,570 personal allowance by £1 for every £2 over. Fully tapered at £125,140. Effective marginal rate in the band: 60%. Pension contributions or gift aid bring adjusted net income back below £100k — one of the highest-ROI tax moves available.",
    },
  ],
  services: [
    {
      title: "First-time self-assessment (if needed)",
      body: "Most trainees and junior solicitors are PAYE-only and don't need self-assessment. But if you have any side income, taxable benefits over £3,000, or savings/investment income above thresholds, SA filing becomes required. We onboard you cleanly and avoid the £100 late-filing penalty trap.",
    },
    {
      title: "Higher-rate transition planning",
      body: "The year you move from basic to higher rate, several things change. Pension contributions become 40% relievable. Gift aid extends your basic-rate band. Personal savings allowance halves from £1,000 to £500. We model the year so you don't leave reliefs on the table.",
    },
    {
      title: "Personal allowance taper management",
      body: "If bonuses push your adjusted net income towards £100,000, pension and gift aid moves can preserve the personal allowance. The effective 60% marginal rate in this band makes these moves disproportionately valuable.",
    },
    {
      title: "Student loan + savings strategy",
      body: "Plan 2 / Plan 5 student loan repayment modelling against your salary trajectory. Voluntary repayment makes sense for some, doesn't for others. We model both alongside ISA / SIPP / mortgage-deposit goals.",
    },
    {
      title: "Salary sacrifice + benefits review",
      body: "Many firms offer salary sacrifice for pension, EV cars, cycle-to-work, holiday-purchase. The tax efficiency varies materially. We model what's actually worthwhile for your specific position.",
    },
  ],
  faqs: [
    {
      q: "Do I need an accountant as a trainee solicitor?",
      a: "Most don't. PAYE handles your tax automatically; HMRC doesn't expect a self-assessment unless you have side income or specific reliefs to claim. The case for an accountant gets stronger when you qualify, hit higher rate, start receiving bonuses, or begin building an investment portfolio. A 30-minute call with us at qualification is usually enough to set the trajectory.",
    },
    {
      q: "Can I claim my SQE costs against tax?",
      a: "Depends on the structure. If your employer pays, you don't have a tax claim (your employer does). If you pay yourself with no employer reimbursement, the relief is harder — generally only available where the SQE is 'training for current employment duties' (continuing professional development) rather than 'training to qualify for a new employment' (initial qualification training). The line is fact-specific. We can review your specific position.",
    },
    {
      q: "Should I make pension contributions as a junior associate?",
      a: "Yes, especially once you hit higher rate. Employer contributions via auto-enrolment are typically 3% employer + 5% employee minimum; many firms match higher. Higher-rate (40%) relief on personal pension contributions means a £1,000 contribution costs £600 net. Compounded over 30-40 years, early contributions are disproportionately valuable.",
    },
    {
      q: "I have a flat / Airbnb / freelance income. What changes?",
      a: "You'll need to file self-assessment. Property income reports on the SA105 supplement; trading income (freelance work, consulting) on SA103. The PAYE on your main salary continues unchanged; the SA brings in the other income and any tax due on it. The £1,000 trading allowance and £1,000 property allowance can simplify small amounts.",
    },
    {
      q: "I'm planning to leave a firm. Anything to think about tax-wise?",
      a: "If you're leaving for another firm: typically smooth, PAYE moves with your P45. If you're going self-employed (consultant / locum solicitor): much bigger change — register for self-assessment, possibly Ltd company structure, professional indemnity insurance on your own account, VAT registration above £90,000 turnover. Plan the transition 3-6 months out.",
    },
  ],
  ctaTitle: "Get your tax strategy right early",
  ctaBody:
    "30-minute scoping call. We tell you whether you need an accountant at all (often not), and where the leverage actually sits.",
  relatedGuides: [
    {
      href: "/solicitor-guides/fee-share-vs-equity-partner",
      title: "Fee-share vs Equity Partner",
      body: "Where the senior career path leads on tax terms.",
    },
    {
      href: "/blog/sole-practitioner-tax/solicitor-expenses-claims-tax-relief-guide",
      title: "Allowable expenses for solicitors",
      body: "What you can and can't claim across the various stages.",
    },
    {
      href: "/calculators/partnership-vs-llp-take-home",
      title: "Partnership vs LLP take-home",
      body: "Model the future state — what partner-level take-home looks like.",
    },
  ],
};

export const metadata: Metadata = {
  title: data.metaTitle,
  description: data.metaDescription,
  alternates: {
    canonical: `${siteConfig.url}/for-junior-solicitors`,
    languages: { "en-GB": `${siteConfig.url}/for-junior-solicitors`, "x-default": `${siteConfig.url}/for-junior-solicitors` },
  },
  openGraph: { title: data.metaTitle, description: data.metaDescription, url: `${siteConfig.url}/for-junior-solicitors`, type: "website" },
};

export default function ForJuniorSolicitorsPage() {
  return <AudienceStageLayout data={data} />;
}
