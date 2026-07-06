import type { Metadata } from "next";
import { Award, Calculator, FileSearch, Handshake, Shield, TrendingUp } from "lucide-react";
import { siteConfig } from "@/config/site";
import { AudienceStageLayout, type AudienceStage } from "@/components/audience/AudienceStageLayout";

export const metadata: Metadata = {
  title: "Accountant for Pre-Exit Agency Founders | Sale Planning & BADR",
  description:
    "Specialist accountants for UK agency founders preparing for sale or MBO. BADR planning, sale-ready accounts, earn-out structuring, due diligence support. Agency-only focus.",
  alternates: { canonical: `${siteConfig.url}/for-pre-exit` },
};

const data: AudienceStage = {
  slug: "for-pre-exit",
  stage: "pre-exit",
  displayStage: "Pre-exit founders",
  badge: "Preparing for sale, MBO, or earn-out",
  heroImage: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=2000&q=85",
  heroAlt: "Senior founder reviewing exit documents in glass-walled office",
  intro: "You're 12-36 months from a sale, MBO, or partial exit. The decisions you make in this window determine whether you keep £600k or £800k of every £1m of sale proceeds. We work with growth-stage agency founders specifically on exit preparation, BADR planning, and the structural changes that protect your tax position.",
  stats: [
    { value: "14%", label: "BADR rate (2025/26)" },
    { value: "£1M", label: "BADR lifetime limit" },
    { value: "18%", label: "BADR rate from 6 Apr 2026" },
    { value: "2 yrs", label: "Minimum BADR holding period" },
  ],
  concerns: [
    {
      icon: Calculator,
      title: "Do I qualify for BADR?",
      body: "5%+ shareholding, officer or employee, held 2+ years before disposal. Plus the company must be trading. Failing any of these costs you up to £100k+ on a £1m sale.",
    },
    {
      icon: Award,
      title: "Sale-ready accounts",
      body: "Clean, normalised, audit-ready. Buyer due diligence will find every weak spot. We prepare 24+ months of management accounts presented the way buyers expect to see them.",
    },
    {
      icon: TrendingUp,
      title: "Normalised EBITDA modelling",
      body: "Buyers value on EBITDA × multiple, but they adjust for owner add-backs, one-offs, and abnormal items. We help you model normalised EBITDA before negotiations so you know the floor.",
    },
    {
      icon: Handshake,
      title: "Earn-out structuring",
      body: "Earn-out terms determine whether you pay 14% CGT (BADR) or 47% income tax + NI. The contract wording is decisive. We review every earn-out clause before signing.",
    },
    {
      icon: FileSearch,
      title: "Due diligence preparation",
      body: "Tax compliance history, director's loan accounts, R&D claim documentation, IR35 status documentation, freelancer contracts. We make sure the data room is clean before buyers see it.",
    },
    {
      icon: Shield,
      title: "Protecting wealth post-sale",
      body: "What happens to the proceeds matters as much as the sale itself. Pension contributions, ISA allowances, investments, property, family investment company structures. We plan the post-sale year too.",
    },
  ],
  services: [
    { title: "Pre-sale tax planning", body: "BADR qualification audit, share class restructuring if needed, alphabet share allocation for family members, dividend extraction timing, pension contribution maximisation in the years before sale." },
    { title: "Sale-ready financial preparation", body: "24 months of management accounts in buyer-expected format, normalised EBITDA modelling, owner add-back schedule, working capital normalisation analysis." },
    { title: "Buyer due diligence support", body: "Data room preparation, response to DD questions, defending valuation positions, supporting your solicitor on warranty and indemnity negotiations." },
    { title: "Earn-out tax review", body: "Every earn-out clause reviewed before signing. Capital treatment (14% BADR) vs income treatment (up to 47%) hinges on contract wording. We protect your position." },
    { title: "Post-sale wealth planning", body: "Pension contribution timing, ISA contributions, investment structure, family investment company options, IHT planning if relevant. We work with your IFA where investment management is needed." },
  ],
  faqs: [
    {
      q: "When should I start exit planning?",
      a: "Ideally 24-36 months before target sale date. BADR requires 2 years of qualifying shareholding, so if you need to restructure (alphabet shares, spousal allocations, etc.), you need the time to bed in. Sale-ready accounts take 12+ months of clean monthly management accounts to build. Buyer DD typically wants 3 years of trading history. Starting earlier always pays back.",
    },
    {
      q: "What's the BADR rate now and going forward?",
      a: "BADR is 14% for disposals from 6 April 2025 (was 10% before then) and rises to 18% from 6 April 2026. The £1m lifetime limit is unchanged. For most founders, completing a sale before 6 April 2026 saves 4 percentage points, on a £1m gain that's £40,000. We track timing for clients with sales in progress.",
    },
    {
      q: "What's the difference between a share sale and an asset sale for me?",
      a: "Share sale: buyer takes the company shell + history, you pay CGT on share proceeds (14% with BADR up to £1m). Asset sale: buyer takes only what they want, the company pays corporation tax on the sale (25%), then you extract the cash (further dividend or capital distribution tax). Share sale is almost always better for sellers; asset sale is almost always better for buyers. We help you negotiate accordingly.",
    },
    {
      q: "How much of the price is typically deferred or earn-out?",
      a: "In UK agency sales: 50-70% paid on completion is typical for a clean sale, with the remainder as earn-out over 12-36 months tied to revenue or EBITDA targets. The tax treatment of the deferred amount depends on contract structure, get it wrong and you pay income tax (47%) instead of CGT (14%). This is the single most important contract review in the deal.",
    },
    {
      q: "Should I use an M&A advisor or just an accountant?",
      a: "Both, ideally. An M&A advisor (corporate finance specialist) handles the deal process, buyer outreach, valuation defence, and negotiations. A specialist accountant handles the tax position, sale-ready accounts, BADR qualification, earn-out review, and post-sale planning. They work together. We can refer to M&A advisors who specialise in agency sales, they know the buyers and the comparable transactions.",
    },
  ],
  ctaTitle: "Plan your agency exit properly",
};

export default function ForPreExitPage() {
  return <AudienceStageLayout data={data} />;
}
