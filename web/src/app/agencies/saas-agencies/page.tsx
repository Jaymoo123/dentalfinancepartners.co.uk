import type { Metadata } from "next";
import { AgencyTypeLayout } from "@/components/agency-type/AgencyTypeLayout";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Accountants for SaaS & Software Agencies | ${siteConfig.name}`,
  description: "Specialist accountants for UK SaaS and software agency founders. Product vs services revenue split, R&D credits, deferred revenue, exit valuations. ICAEW qualified.",
  alternates: { canonical: `${siteConfig.url}/agencies/saas-agencies` },
  openGraph: {
    title: "Accountants for SaaS and Software Agencies",
    description: "Specialist tax and accounting for SaaS and software agency founders.",
    url: `${siteConfig.url}/agencies/saas-agencies`,
    type: "website",
  },
};

export default function SaaSAgenciesPage() {
  return (
    <AgencyTypeLayout
      slug="saas-agencies"
      title="Accountants for SaaS and software agencies"
      hero="Specialist tax and accounting for UK SaaS and software agency founders. Product versus services revenue split, R&D tax credits on custom builds, deferred revenue for subscriptions, valuation multiples that reward recurring revenue — we know how to structure software agencies for tax and exit."
      sections={[
        {
          heading: "Product vs services revenue split",
          body: (
            <p>
              SaaS and software agencies often run a hybrid model: bespoke client builds (services) alongside a productised tool or subscription offering (product). The two have different revenue recognition rules and different exit valuation multiples. Services revenue typically trades at 1-2× annual revenue. Recurring product revenue (ARR) trades at 4-8× or more. Structuring the split cleanly in your accounts materially affects what your agency is worth at exit. We help SaaS-leaning agencies set this up from day one.
            </p>
          ),
        },
        {
          heading: "Deferred revenue for subscriptions",
          body: (
            <p>
              When a client pays annually upfront for your tool or service, that cash is not yet earned. It sits on your balance sheet as deferred revenue and is released to the P&L over the period of the subscription. Getting this wrong overstates current profit, accelerates corporation tax bills, and distorts your management accounts. We set up Xero or QuickBooks with proper subscription billing treatment so monthly P&Ls reflect reality.
            </p>
          ),
        },
        {
          heading: "R&D tax credits on custom builds",
          body: (
            <p>
              Custom software development that involves genuine technical advancement typically qualifies for R&D tax credits under HMRC's SME scheme. Building novel architecture, custom integrations between systems that don't have off-the-shelf connectors, performance optimisations that exceed published benchmarks, bespoke developer tooling — these all often qualify. We assess every software client as standard and have processed claims into six figures.
            </p>
          ),
        },
      ]}
      faqs={[
        {
          q: "How should I split product and services revenue for tax purposes?",
          a: "Both are trading income for corporation tax purposes, so the tax treatment is the same. The split matters for management accounts, investor reporting, R&D claims (services work is usually more R&D-qualifying than product) and especially exit valuation. We help SaaS agencies set up a chart of accounts that cleanly separates the two from day one.",
        },
        {
          q: "When do I recognise revenue on an annual subscription paid upfront?",
          a: "Spread it across the 12 months of the subscription. The cash sits on your balance sheet as deferred revenue and is released to the P&L each month as earned. Don't recognise it all in month one — that overstates profit and creates a corporation tax bill on cash you haven't really earned yet. Standard SaaS accounting treatment.",
        },
        {
          q: "Does my custom software work qualify for R&D tax credits?",
          a: "Usually yes if there's genuine technical uncertainty or advancement. Custom architecture, novel integrations, performance optimisations beyond published benchmarks, bespoke developer tooling — these typically qualify. Pure CMS implementation, theme customisation, or wiring up off-the-shelf APIs without technical advancement does not. We assess project-by-project.",
        },
      ]}
      relatedTypes={[
        { label: "AI agencies", href: "/agencies/ai-agencies" },
        { label: "Digital agencies", href: "/agencies/digital-agencies" },
        { label: "Web design agencies", href: "/agencies/web-design-agencies" },
        { label: "E-commerce agencies", href: "/agencies/ecommerce-agencies" },
      ]}
    />
  );
}
