import type { Metadata } from "next";
import { Briefcase, LineChart, ShieldCheck, Sparkles, Target, TrendingUp } from "lucide-react";
import { siteConfig } from "@/config/site";
import { AudienceStageLayout, type AudienceStage } from "@/components/audience/AudienceStageLayout";

export const metadata: Metadata = {
  title: "Accountant for Growth-Stage Agencies | £500k-£3m Revenue",
  description:
    "Specialist accountants for UK agencies at £500k-£3m revenue. Management accounts, R&D credits, IR35, salary optimisation, growth-stage tax planning. ICAEW qualified.",
  alternates: { canonical: `${siteConfig.url}/for-growth-stage` },
};

const data: AudienceStage = {
  slug: "for-growth-stage",
  stage: "growth-stage",
  displayStage: "Growth-stage founders",
  badge: "£500k to £3m revenue",
  heroImage: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=2000&q=85",
  heroAlt: "Growing agency team in modern office",
  intro: "You're past survival mode. Revenue is consistent, you have a team, and the financial questions are getting harder: R&D credits, IR35 for freelancers, optimal extraction across shareholders, when to think about holding companies and exit. This is where specialist accounting pays for itself many times over.",
  stats: [
    { value: "20-30%", label: "Typical overhead ratio" },
    { value: "50-65%", label: "Healthy gross margin" },
    { value: "£15-150k", label: "Typical R&D claim range" },
    { value: "25%", label: "Main corporation tax rate" },
  ],
  concerns: [
    {
      icon: LineChart,
      title: "Are my management accounts useful?",
      body: "Monthly P&L by client, gross margin per project, utilisation rate, revenue per head. The metrics that actually tell you whether you're building a business or buying a job.",
    },
    {
      icon: Sparkles,
      title: "Am I claiming R&D properly?",
      body: "Most agencies doing custom tech work qualify and don't claim. We've seen £15k-£150k claims for digital, performance, AI, and SaaS-adjacent agencies. Annual assessment as standard.",
    },
    {
      icon: ShieldCheck,
      title: "IR35 risk on freelancers",
      body: "As you scale your contractor base, IR35 risk scales with you. Status determination statements, contract reviews, engagement structure. We handle it.",
    },
    {
      icon: Target,
      title: "Director extraction across shareholders",
      body: "When you have co-founders, alphabet shares, or a spouse on the cap table, salary/dividend optimisation gets complex. We model it across all of you.",
    },
    {
      icon: TrendingUp,
      title: "Should I set up a holding company?",
      body: "If you're thinking about acquiring another agency, taking outside investment, or planning a partial exit, a holding company structure often makes sense. We model it before you commit.",
    },
    {
      icon: Briefcase,
      title: "Forward planning for exit",
      body: "Exit is a 3-5 year project, not a transaction. We help you build a sale-ready business and plan extraction to maximise BADR and minimise CGT.",
    },
  ],
  services: [
    { title: "Monthly management accounts", body: "Real numbers, not just compliance. P&L by client, gross margin tracking, cash flow forecasting, KPI dashboard. Delivered within 10 working days of month end." },
    { title: "Annual R&D claim assessment", body: "We review your year's projects against HMRC qualifying activity tests. Where claims exist, we prepare and submit them. Most clients see £15k-£60k claims; AI/SaaS-leaning agencies often higher." },
    { title: "IR35 compliance for freelancers", body: "Status determination statements, contract structure review, engagement audit. Annual review as standard, plus ad-hoc for new engagements over £30k/year." },
    { title: "Multi-shareholder extraction modelling", body: "Optimal salary/dividend split across all shareholders, factoring in personal tax positions, pensions, spousal income. Re-modelled annually." },
    { title: "Group structure planning", body: "Holding company analysis, group registration for VAT, intercompany agreements, transfer pricing if relevant. Modelled before you commit to changes." },
    { title: "Pre-exit positioning", body: "Build a sale-ready business. Clean accounts, normalised EBITDA, IP review, key-person risk reduction. Start 2-3 years before exit." },
  ],
  faqs: [
    {
      q: "At what revenue does a specialist accountant pay for itself?",
      a: "Usually around £500k revenue. Below that, a generalist is fine for compliance. Above £500k you start hitting situations (R&D credits, IR35, holding companies, exit prep) where specialist knowledge saves multiples of the fee difference. Our typical growth-stage client saves £10k-£50k per year through specialist advice that wouldn't have come from a generalist.",
    },
    {
      q: "How much does a growth-stage agency accountant cost?",
      a: "£3,000-£8,000 per year typically, depending on complexity (number of shareholders, freelancer count, R&D activity, multi-entity structure). We provide fixed-fee quotes after an initial call. No hourly billing.",
    },
    {
      q: "How often should I get management accounts?",
      a: "Monthly. Quarterly is too slow for a growth-stage agency, by the time you spot a margin drop or cash flow issue, you're already two quarters behind. Monthly accounts with a 15-minute review call let you adjust quickly.",
    },
    {
      q: "Should I switch from cash accounting to accruals?",
      a: "Almost certainly yes if you're above £500k revenue. Cash accounting hides revenue recognition issues that matter at scale (deferred income, accrued costs, work-in-progress). Accruals is the standard for limited companies above £632k turnover anyway. We handle the transition.",
    },
    {
      q: "Is R&D credit really worth the hassle?",
      a: "If you're doing genuine custom development, almost always yes. The merged scheme post-April 2023 means a 20% credit on qualifying spend (27% for R&D-intensive SMEs). A typical 6-engineer agency claiming on 60% of dev time can recover £30k-£80k per year. The claim takes us about 3-4 weeks to prepare; the cash usually arrives within 12 weeks of submission.",
    },
  ],
  ctaTitle: "Get specialist accounting for your growth stage",
};

export default function ForGrowthStagePage() {
  return <AudienceStageLayout data={data} />;
}
