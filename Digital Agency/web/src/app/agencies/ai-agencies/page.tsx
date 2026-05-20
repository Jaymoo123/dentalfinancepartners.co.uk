import type { Metadata } from "next";
import { AgencyTypeLayout } from "@/components/agency-type/AgencyTypeLayout";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Accountants for AI Agencies | ${siteConfig.name}`,
  description: "Specialist accountants for UK AI agency founders. R&D tax credits for ML and LLM work, model training costs, API spend treatment, IP ownership. ICAEW qualified.",
  alternates: { canonical: `${siteConfig.url}/agencies/ai-agencies` },
  openGraph: {
    title: "Accountants for AI Agencies",
    description: "Specialist tax and accounting for AI agency founders.",
    url: `${siteConfig.url}/agencies/ai-agencies`,
    type: "website",
  },
};

export default function AIAgenciesPage() {
  return (
    <AgencyTypeLayout
      slug="ai-agencies"
      title="Accountants for AI agencies"
      hero="Specialist tax and accounting for UK AI agency founders. R&D tax credits for ML and LLM work, GPU and API cost treatment, IP ownership, model licensing, we handle the financial complexity of running an AI services business."
      sections={[
        {
          heading: "R&D tax credits for AI work",
          body: (
            <p>
              AI agencies are often sitting on significant unclaimed R&D tax credit value. HMRC's SME scheme applies where you're advancing science or technology in a way that's not readily deducible to a competent professional. Custom model training, novel prompt engineering systems, RAG pipelines, fine-tuned LLMs for specific industries, AI-driven attribution platforms, agent orchestration tooling, all typically qualify. We assess every AI client for R&D eligibility as standard and have seen claims from £15k to over £150k per year.
            </p>
          ),
        },
        {
          heading: "Model training and API costs",
          body: (
            <p>
              OpenAI, Anthropic, AWS Bedrock and GPU compute can run to six figures per year. Most of this is revenue expenditure deductible against profits in the year incurred. But token-purchase prepayments and committed reservation pricing can need careful accrual treatment to match the period of use. We help AI agencies structure their chart of accounts so these costs are properly categorised, claimable and visible in management accounts.
            </p>
          ),
        },
        {
          heading: "IP, model ownership and licensing revenue",
          body: (
            <p>
              When your agency builds a custom model, fine-tunes a foundation model on client data, or develops proprietary prompt systems, IP ownership decisions matter. Whether the model stays as your agency's asset (potentially licensable as future revenue) or transfers to the client materially affects valuation at exit and current corporation tax position. We help AI founders structure IP terms so the commercial reality matches the legal and tax reality.
            </p>
          ),
        },
      ]}
      faqs={[
        {
          q: "Does building custom AI for clients qualify for R&D tax credits?",
          a: "Usually yes if there's genuine technical uncertainty. Fine-tuning a foundation model for a novel use case, building bespoke RAG systems, developing agent orchestration tooling, custom evaluation frameworks, these typically qualify. Pure prompt engineering or wrapping an off-the-shelf API without technical advancement does not. We assess eligibility per project.",
        },
        {
          q: "How do I account for OpenAI or Anthropic API spend?",
          a: "API token costs are revenue expenses, deductible in the year incurred. If you pre-purchase tokens or commit to reserved pricing, you'd typically accrue the cost across the period of use rather than expensing upfront. Get this wrong and your monthly P&L swings unhelpfully. We set up the chart of accounts and accrual treatment so AI agencies have clean, predictable margins month-on-month.",
        },
        {
          q: "Should my AI agency keep IP ownership of custom models?",
          a: "Depends on client terms and your commercial model. Keeping IP gives potential licensing revenue and increases agency valuation at exit. Transferring IP can win bigger projects but reduces long-term asset value. Most AI agencies negotiate this case-by-case; we help model both scenarios financially.",
        },
      ]}
      relatedTypes={[
        { label: "SaaS agencies", href: "/agencies/saas-agencies" },
        { label: "Web design agencies", href: "/agencies/web-design-agencies" },
        { label: "Digital agencies", href: "/agencies/digital-agencies" },
        { label: "Performance marketing agencies", href: "/agencies/performance-marketing-agencies" },
      ]}
    />
  );
}
