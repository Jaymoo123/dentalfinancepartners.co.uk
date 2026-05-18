import type { Metadata } from "next";
import { AudienceStageLayout, type AudienceStage } from "@/components/audience/AudienceStageLayout";
import { siteConfig } from "@/config/site";

const data: AudienceStage = {
  slug: "for-locum-solicitors",
  title: "Accountants for UK Locum and Consultant Solicitors",
  metaTitle: "Locum Solicitor Accountants UK | Ltd vs Umbrella vs Sole Trader",
  metaDescription:
    "Specialist accountants for UK locum solicitors. Ltd company vs umbrella vs sole-trader comparison, IR35 status, PII on own account, fee structures.",
  eyebrow: "For locum + consultant solicitors",
  badge: "Locum solicitors · Consultant solicitors · Interim general counsel",
  heroHeading: "Structure and tax help for locum solicitors",
  intro:
    "Locum and consultant solicitors hit a structure decision early in self-employment and live with it for years. Limited company, umbrella, or sole trader. There is no universal right answer — it depends on income, engagement mix, IR35 determinations, and what you want from PII and pension.",
  stats: [
    { value: "3", label: "Structures we compare" },
    { value: "£80k+", label: "Typical Ltd-co break-even" },
    { value: "2021", label: "Off-payroll private sector reform" },
    { value: "Bespoke", label: "PII on own account" },
  ],
  concerns: [
    {
      title: "Should I incorporate or stay sole-trader?",
      body: "Below roughly £80,000-£100,000 of sustained consulting income, the admin cost of running a limited company rarely beats sole-trader status. Above that, it depends on how many engagements sit outside IR35 and your need for tax-planning flexibility (non-working spouse, deferred income, retained earnings for reinvestment).",
    },
    {
      title: "What does 'inside IR35' actually mean for me?",
      body: "Since 6 April 2021, when the engaging firm is a medium or large client, the firm (not your PSC) determines IR35 status. If they issue an inside-IR35 SDS, PAYE-style deductions apply on your fees despite the Ltd-co structure. Net into your company; cannot extract as dividend tax-efficiently.",
    },
    {
      title: "How do I handle PII on my own account?",
      body: "Sole-trader and Ltd-co consultants typically need their own PII to the SRA Minimum Terms and Conditions. £2m minimum cover. Annual renewals around October. Premiums for solo consultants are generally £1,500-£4,000+ depending on practice area and claims history. Litigation-heavy consultants pay materially more.",
    },
    {
      title: "What expenses can I actually claim?",
      body: "Outside IR35: SRA practising certificate, PII, professional subscriptions, CPD, motor between engaging firms, accountancy fees, professional indemnity excess, office equipment under AIA. Inside IR35: very limited; restricted to the same items an employee can claim. The engagement structure determines what's claimable.",
    },
    {
      title: "What about umbrella companies?",
      body: "Umbrella employs you under contract of employment, runs PAYE on your earnings, deducts tax and NI, pays you net. Expenses very restricted. Convenient and low-admin but rarely the most tax-efficient option for sustained consulting income. Suits short-term work and low-volume locuming.",
    },
    {
      title: "I work for multiple firms. What changes?",
      body: "Different firms may issue different IR35 determinations for similar work. Travel between firms is deductible (not home-to-first-firm). Apportioning materials, motor and overhead by engagement matters for accurate tax. We map each engagement against the right structure.",
    },
  ],
  services: [
    {
      title: "Structure comparison: Ltd vs umbrella vs sole-trader",
      body: "We model your specific income mix against all three structures: take-home after tax + NI, administrative cost, PII availability, IR35 implications. Output is a one-page comparison with a recommended structure and reasoning.",
    },
    {
      title: "Annual self-assessment for sole-trader consultants",
      body: "All consulting income, expense claims, professional subscriptions, payment-on-account schedule, student loan plan if applicable. Filed inside the deadline. Receipts tracked via a shared bookkeeping system so you're not chasing them in January.",
    },
    {
      title: "Limited company accounting for PSC consultants",
      body: "Annual statutory accounts, corporation tax return, personal director self-assessment, PSC payroll for the salary leg, dividend administration, IR35 status tracking per engagement. We handle each component or just the parts you need.",
    },
    {
      title: "IR35 status review per engagement",
      body: "When a firm issues a Status Determination Statement, we review whether it's correctly issued. Most are; some are not. Where the determination is challengeable we support the appeal. Where it stands, we restructure the income flow to reflect the deduction.",
    },
    {
      title: "Mortgage-ready accounts",
      body: "Lenders want SA302s with consistent income for sole-trader consultants or 2 years of company accounts for Ltd-co consultants. We produce both inside 48 hours of request and work with the legal-sector-friendly mortgage advisers who lend on professional income.",
    },
  ],
  faqs: [
    {
      q: "I'm a newly self-employed solicitor. Should I incorporate from day one?",
      a: "Almost never on day one. Most new consultants earn below the threshold where Ltd-co structure pays back the admin cost. Start as a sole trader, register for self-assessment, file the first return cleanly. Re-look at incorporation after 12-18 months when your sustainable income level is visible. The wrong structure costs more in admin than the right structure saves in tax for the first year.",
    },
    {
      q: "Do I need my own PII as a consultant solicitor?",
      a: "Generally yes. If you're providing legal services under your own SRA practising certificate, you need PII to the SRA Minimum Terms and Conditions: £2m minimum cover from a qualifying insurer. Some engagement structures have the engaging firm's PII covering you; clarify this contractually. Most consultants carry their own.",
    },
    {
      q: "If a firm says my engagement is 'inside IR35', what does it mean for my Ltd?",
      a: "The firm (as fee-payer) operates PAYE-style deductions on your fees before paying your company. Your company receives the net amount. You can't extract that net as salary or dividend tax-efficiently because the tax has already been deducted at source. Similar effect to being a PAYE employee for that engagement, with the additional Ltd-co overhead. You can challenge the SDS if you believe it's wrong; you can't ignore it once a fee-payer is operating on it.",
    },
    {
      q: "What's the difference between a consultancy agreement and a locum agreement?",
      a: "Mostly terminology, but consultancy implies a longer engagement (often retainer-based) while locum implies covering specific gaps (parental leave, illness, peak workload). Both can be structured as self-employed or via PSC; both face the same IR35 considerations. The contract wording matters less than the working reality for status determination.",
    },
    {
      q: "How does VAT work for a consultant solicitor?",
      a: "Same as any other UK supplier of legal services: VAT registration required at £90,000 of taxable turnover on a rolling 12-month basis. Legal services are standard-rated at 20%. Disbursements (recharged) generally outside VAT scope if you act as agent rather than principal. Many consultants register voluntarily below the threshold to reclaim input VAT on costs.",
    },
  ],
  ctaTitle: "Get your consultant structure right",
  ctaBody:
    "30-minute scoping call. We run the Ltd vs umbrella vs sole-trader comparison on your specific income and engagement mix and tell you which one wins on real numbers.",
  relatedGuides: [
    {
      href: "/blog/sole-practitioner-tax/sole-practitioner-solicitor-tax-guide",
      title: "Sole-practitioner solicitor tax guide",
      body: "Wider context for solo and consultant-track solicitors.",
    },
    {
      href: "/calculators/partnership-vs-llp-take-home",
      title: "Take-home calculator",
      body: "Annual net comparison across structures.",
    },
    {
      href: "/services/solicitor-accountants",
      title: "Solicitor accountants service",
      body: "What ongoing support looks like once you've chosen a structure.",
    },
  ],
};

export const metadata: Metadata = {
  title: data.metaTitle,
  description: data.metaDescription,
  alternates: {
    canonical: `${siteConfig.url}/for-locum-solicitors`,
    languages: { "en-GB": `${siteConfig.url}/for-locum-solicitors`, "x-default": `${siteConfig.url}/for-locum-solicitors` },
  },
  openGraph: { title: data.metaTitle, description: data.metaDescription, url: `${siteConfig.url}/for-locum-solicitors`, type: "website" },
};

export default function ForLocumSolicitorsPage() {
  return <AudienceStageLayout data={data} />;
}
