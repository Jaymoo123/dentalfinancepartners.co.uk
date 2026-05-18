import type { Metadata } from "next";
import { AudienceStageLayout, type AudienceStage } from "@/components/audience/AudienceStageLayout";
import { siteConfig } from "@/config/site";

const data: AudienceStage = {
  slug: "for-principals",
  title: "Accountants for Dental Practice Principals UK",
  metaTitle: "Accountants for Dental Practice Principals UK | Tax & Structure",
  metaDescription:
    "Specialist accountants for UK dental practice principals. Partnership vs Ltd structure, profit extraction, NHS Pension, capital allowances, exit planning.",
  eyebrow: "For principals",
  badge: "Single-handed · Multi-partner · Multi-site",
  heroHeading: "Accountants for UK dental practice principals",
  intro:
    "Running a dental practice is a clinical job, a business management job and a tax-structure job at the same time. Most principals get clinical training; most do not get the structure training. We sit alongside as the specialist tax and finance partner you need without becoming another full-time role to manage.",
  stats: [
    { value: "13", label: "Categories of dental tax we cover" },
    { value: "24h", label: "Response time guarantee" },
    { value: "Fixed", label: "Monthly fees, no scope creep" },
    { value: "60+", label: "Posts on NHS contract economics" },
  ],
  concerns: [
    {
      title: "Am I taking profit out the most efficient way?",
      body: "Salary, dividend, employer pension, spouse on payroll, retained profits. Each lever has tax cost, NHS Pension implications, and tapered annual allowance interaction at higher earnings. The optimal combination is not the same for every principal.",
    },
    {
      title: "Should I incorporate (if I haven't already)?",
      body: "Incorporation can save corporation tax vs personal income tax above certain profit thresholds, but it triggers Section 162 CGT considerations, changes NHS Pension treatment, and adds compliance. We model your numbers; the answer is not universal.",
    },
    {
      title: "How does the NHS contract affect my structure?",
      body: "UDA contract value, contract reform letters, performance bands and end-of-year clawback all flow into the practice P&L. A material change in NHS contract terms can change the right structure. We map contract documentation to financial impact.",
    },
    {
      title: "When should I start thinking about an exit?",
      body: "Earlier than most principals expect. BADR eligibility needs two years of qualifying ownership. Pre-sale EBITDA normalisation needs 18 months to show in the accounts a buyer will see. If you are five years from exit, the planning starts now.",
    },
    {
      title: "Am I claiming everything on capital allowances?",
      body: "Chairs, compressors, autoclaves, X-ray (including OPG and CBCT), suction units, dental software, computers. AIA covers most of it at 100% relief. Structures and Buildings Allowance at 3% per year applies to qualifying premises spend post-29 October 2018. Many principals miss the fixtures election on practice purchase.",
    },
    {
      title: "How do I manage associate IR35 risk?",
      body: "Since 6 April 2021, when the practice is a medium or large client, the practice (not the associate's PSC) determines IR35 status for limited-company associates. Getting determinations wrong creates HMRC liability for the practice. We help draft defensible Status Determination Statements.",
    },
  ],
  services: [
    {
      title: "Monthly management accounts with NHS/private/plan split",
      body: "Income separated by stream, costs allocated by where they actually fall, margin by line. Reviewed quarterly on a 60-minute call. The point is decisions, not just compliance.",
    },
    {
      title: "Annual profit extraction modelling",
      body: "Salary and dividend optimisation at 2025/26 rates, employer pension contributions modelled against the tapered annual allowance, spouse employment review, holding company assessment if the structure justifies it.",
    },
    {
      title: "Practice valuation refresh annually",
      body: "We refresh the practice valuation each year so you know the realistic exit number. Normalised EBITDA, regional multiple, asset list. This is your real exit value, not the listing price you might dream of.",
    },
    {
      title: "Capital allowance + SBA + fixtures election review",
      body: "We audit your existing capital allowance position on chairs, equipment, premises spend, and fixtures inherited at acquisition. Where claims are missed we file amendments and recover the relief.",
    },
    {
      title: "NHS Pension annual allowance check",
      body: "Pensionable pay vs annual allowance, taper application at high earnings, Scheme Pays modelling. We do not give regulated pension advice; we model the financial impact and refer to an FCA IFA for transfer decisions.",
    },
    {
      title: "Pre-sale planning 18-24 months out",
      body: "BADR eligibility check, Section 162 incorporation relief modelling, EBITDA normalisation, asset list cleanup, spouse-salary normalisation. The work is started early so the accounts a buyer sees in due diligence look clean.",
    },
  ],
  faqs: [
    {
      q: "When does incorporation make sense for a dental practice principal?",
      a: "Most often above £80,000-£100,000 of sustainable practice profit (post-principal-cost), and where the principal does not need all the post-tax profit for immediate personal spending. Corporation tax at 19% or 25% can beat income tax + NI at 40%+ on retained profits, but you have to actually retain or invest those profits to benefit. If you draw everything as dividends, the NI saving disappears and the structure adds admin without payback. We model your numbers before recommending.",
    },
    {
      q: "What's Section 162 incorporation relief and when do I use it?",
      a: "When an unincorporated dental practice transfers to a limited company in exchange for shares, the CGT that would otherwise arise on the goodwill can be deferred into the share base cost (Section 162 TCGA 1992). It applies when the whole business transfers, not just part of it. Useful when a principal wants to incorporate before a 2-5 year exit horizon, because it defers the CGT until the share sale, where BADR may then apply. Not always the right call; we model the alternatives.",
    },
    {
      q: "How does the McCloud remedy affect my NHS Pension as a principal?",
      a: "McCloud remedy applies to NHS Pension scheme members who had benefits in legacy 1995 or 2008 sections during the period 1 April 2015 to 31 March 2022. At retirement, affected members get a choice between legacy section rules and 2015 CARE section rules for that remedy period. The choice can be worth tens of thousands depending on career-earnings profile. We model the financial impact of each choice; we work with an FCA IFA for the regulated advice on the actual selection.",
    },
    {
      q: "I'm two partners in an expense-share arrangement. Are we a partnership for tax?",
      a: "Maybe, maybe not. An expense-share arrangement where each principal bills patients independently and just shares premises and staff costs is not a partnership; each principal files as a sole trader and the shared costs are split. A true partnership exists where the principals share profits as well as costs. HMRC look at the substance of the arrangement, not the label on the door. We review the documentation and the actual cash flows to confirm which you actually have.",
    },
    {
      q: "How do I switch accountant without disrupting payroll?",
      a: "Payroll is the highest-risk handover because RTI submissions run continuously. We schedule the switch for the first day of a new payroll period, take over the PAYE scheme via HMRC's online services, and run the first month in parallel with your previous accountant's records to catch any reconciliation gaps. Most switches happen seamlessly; the few that have had hiccups were when the previous accountant delayed releasing data. We have a process for that.",
    },
  ],
  ctaTitle: "Get a second opinion on your practice structure",
  ctaBody:
    "30-minute scoping call with a dentist-only specialist. We will look at extraction, structure, contract position and pre-exit work, and flag the immediate opportunities.",
  relatedGuides: [
    {
      href: "/dental-guides/practice-profit-extraction-partnership-vs-ltd",
      title: "Practice Profit Extraction: Partnership vs Ltd",
      body: "When each structure wins, NHS Pension impact, and the spouse-employment angle.",
    },
    {
      href: "/dental-guides/nhs-contract-essentials-for-dentists",
      title: "NHS Contract Essentials",
      body: "UDA value variance, GDS vs PDS, regional differences, clawback risk.",
    },
    {
      href: "/dental-guides/goodwill-valuation-and-sale-playbook",
      title: "Goodwill Valuation and Sale",
      body: "Methods, normalisation, BADR + Section 162, pre-sale prep timeline.",
    },
  ],
};

export const metadata: Metadata = {
  title: data.metaTitle,
  description: data.metaDescription,
  alternates: {
    canonical: `${siteConfig.url}/for-principals`,
    languages: {
      "en-GB": `${siteConfig.url}/for-principals`,
      "x-default": `${siteConfig.url}/for-principals`,
    },
  },
  openGraph: {
    title: data.metaTitle,
    description: data.metaDescription,
    url: `${siteConfig.url}/for-principals`,
    type: "website",
  },
};

export default function ForPrincipalsPage() {
  return <AudienceStageLayout data={data} />;
}
