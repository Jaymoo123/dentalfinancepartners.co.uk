import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { ComparisonLayout, type Comparison } from "@/components/comparison/ComparisonLayout";

export const metadata: Metadata = {
  title: "Specialist vs Generalist Accountant for Agencies | Comparison",
  description:
    "Should you use a generalist high-street accountant or a specialist agency accountant? Honest comparison covering services, expertise, fees, and the £ impact for UK agency founders.",
  alternates: { canonical: `${siteConfig.url}/specialist-vs-generalist-accountant` },
};

const data: Comparison = {
  slug: "specialist-vs-generalist-accountant",
  competitorName: "Generalist accountant",
  pageTitle: "Specialist vs generalist accountant for UK agencies",
  intro: "Most UK agency founders start with a generalist high-street accountant who handles everything from butchers to consultants. As the agency grows, the question becomes whether a specialist agency accountant pays back the fee difference. This is the honest answer.",
  honestyParagraph: "Generalist accountants are not bad — most are highly competent at compliance work and personable to deal with. The real question is whether the agency-specific complexity in your business has outgrown what a generalist sees on average across their client base. A generalist handling 200 mixed-sector clients sees an agency-tax decision once every few years. A specialist sees it every week.",
  comparisonTable: [
    { feature: "Annual accounts + CT600", competitor: true, us: true },
    { feature: "VAT returns", competitor: true, us: true },
    { feature: "Self-assessment", competitor: true, us: true },
    { feature: "Bookkeeping", competitor: true, us: "Optional add-on" },
    { feature: "Payroll", competitor: true, us: "Optional add-on" },
    { feature: "Agency-specific tax expertise", competitor: "Limited", us: "Daily practice" },
    { feature: "R&D claim preparation (digital/AI/SaaS)", competitor: "Generally outsourced", us: "In-house, annual review" },
    { feature: "IR35 status determinations for freelancers", competitor: "Generic templates", us: "Agency-specific structuring" },
    { feature: "BADR exit planning", competitor: "Occasional", us: "Regular" },
    { feature: "Holding company / group structure modelling", competitor: "Reactive", us: "Proactive" },
    { feature: "Multi-shareholder salary/dividend optimisation", competitor: "Annual at best", us: "Annual + ad-hoc on changes" },
    { feature: "Management accounts (by client, gross margin)", competitor: "Generic P&L", us: "Agency-specific KPIs" },
    { feature: "UAE / international tax integration", competitor: false, us: true },
    { feature: "Knows competitor agency benchmarks", competitor: false, us: true },
    { feature: "ICAEW qualified", competitor: "Often", us: true },
    { feature: "Typical annual fee (growth-stage agency)", competitor: "£1,500-£3,500", us: "£3,000-£8,000" },
  ],
  whoIsRightFor: {
    competitor: {
      audience: "Agencies under £150k revenue with simple structures.",
      whenToChoose: [
        "Sole trader or single-director limited company",
        "No employees or freelancers",
        "Standard service model (no R&D, no exit plans, no IR35 exposure)",
        "You value local relationship over specialist depth",
        "You have a long-standing relationship with a trusted generalist",
      ],
    },
    us: {
      audience: "Agency founders where specialist advice changes the financial outcome materially.",
      whenToChoose: [
        "Revenue above £150k with consistent growth",
        "You engage freelancers (IR35 exposure)",
        "You build custom tech (R&D credit eligibility)",
        "Multiple shareholders or co-founders",
        "You're planning a sale, MBO, or significant exit",
        "International element (UAE, US clients, cross-border)",
        "You want one accountant who actually understands your business model",
      ],
    },
  },
  faqs: [
    {
      q: "What does a specialist actually do differently?",
      a: "Three concrete things. (1) Sees the patterns: knowing that 7 in 10 digital agencies qualify for R&D credits, that recruitment agencies face specific IR35 mass-determination risk, that creative agencies often mis-value goodwill on sale. (2) Proactive advice: not waiting for you to ask. If your salary split is suboptimal, we model it without prompting. (3) Specialist judgement on edge cases that generalists encounter rarely.",
    },
    {
      q: "What's the typical £ saving?",
      a: "Variable. Our typical growth-stage agency client (£500k-£2m revenue) sees £10k-£50k per year in directly attributable tax savings vs a generalist setup. R&D credits account for the largest share. BADR-eligible exits can save six figures. Smaller agencies may not see specialist-pays-for-itself returns yet.",
    },
    {
      q: "What if my current generalist accountant is good?",
      a: "Many are. The test isn't whether they're good at compliance — most are. The test is whether they're spotting agency-specific opportunities and risks (R&D, IR35, BADR, multi-shareholder extraction, group structures). If they've never proactively flagged an R&D opportunity, never suggested alphabet shares, and never modelled an exit, you may be leaving money on the table.",
    },
    {
      q: "How do I tell if I need a specialist now?",
      a: "Three triggers: (1) you've hit £200k+ revenue and want strategic advice, not just filing; (2) something specialist is coming up (R&D claim, IR35 enquiry, holding co, exit conversation); (3) you've started spending too much of your own time on financial decisions because your accountant can't answer them quickly. Any one is enough.",
    },
  ],
};

export default function SpecialistVsGeneralistPage() {
  return <ComparisonLayout data={data} />;
}
