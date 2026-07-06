import type { Metadata } from "next";
import { AgencyTypeLayout } from "@/components/agency-type/AgencyTypeLayout";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Accountants for Performance Marketing Agencies | ${siteConfig.name}`,
  description: "Specialist accountants for UK performance marketing agency founders. Multi-channel attribution, revenue-share deals, media spend treatment. Agency-only specialists.",
  alternates: { canonical: `${siteConfig.url}/agencies/performance-marketing-agencies` },
  openGraph: {
    title: "Accountants for Performance Marketing Agencies",
    description: "Specialist tax and accounting for performance marketing agency founders.",
    url: `${siteConfig.url}/agencies/performance-marketing-agencies`,
    type: "website",
  },
};

export default function PerformanceMarketingAgenciesPage() {
  return (
    <AgencyTypeLayout
      slug="performance-marketing-agencies"
      title="Accountants for performance marketing agencies"
      hero="Specialist tax and accounting for UK performance marketing agency founders. Multi-channel attribution, revenue-share pricing, media spend treatment and R&D credits for attribution tooling, we handle the edges that generalist accountants don't see."
      sections={[
        {
          heading: "Revenue recognition for performance-based pricing",
          body: (
            <p>
              Performance marketing agencies often blend retainer income, percentage-of-spend fees and outcome-based revenue share. Each revenue stream is recognised differently. Revenue share tied to client conversions or CPA cannot be recognised until the conditions are met. Retainers are recognised as earned. Media management fees are recognised as billed. Getting this wrong overstates your profit, accelerates corporation tax bills and distorts your management accounts.
            </p>
          ),
        },
        {
          heading: "Media spend across multiple channels",
          body: (
            <p>
              Running paid search, paid social, programmatic, affiliate and email through your client books means hundreds of thousands of pounds flowing through your agency's accounts each month. We help you structure your client invoicing and chart of accounts so this spend doesn't artificially inflate your turnover, your VAT position, or your valuation at exit.
            </p>
          ),
        },
        {
          heading: "R&D credits for attribution and tooling",
          body: (
            <p>
              Most performance marketing agencies that go beyond off-the-shelf platforms qualify for R&D tax credits. Custom attribution models, multi-touch reporting builds, API integrations between ad platforms and CRM systems, and bespoke optimisation tooling all typically qualify under HMRC's SME R&D scheme. We assess every performance marketing client for eligibility as standard.
            </p>
          ),
        },
      ]}
      faqs={[
        {
          q: "How do I account for revenue share with clients?",
          a: "Revenue share is recognised when the underlying conditions are met (e.g. client conversion delivered, sale completed). If you invoice in advance based on projected revenue share, the early income is deferred until earned. We help performance marketing agencies structure contracts and invoicing so revenue recognition matches HMRC and accounting standards.",
        },
        {
          q: "Should performance bonuses be paid as salary or dividend?",
          a: "For director-shareholders, both are options. Salary is deductible by the company but creates employer NI and income tax. Dividends are paid from post-tax profits. The right choice depends on your overall tax position. We model both for each client annually.",
        },
        {
          q: "What's the VAT treatment for affiliate or programmatic media costs?",
          a: "Most UK-based affiliate networks and programmatic exchanges charge VAT, which you can reclaim if VAT registered. International suppliers (especially US-based) often don't charge VAT, but you may need to account for it under the reverse charge mechanism. We handle this for performance marketing agencies with global supplier books.",
        },
      ]}
      relatedTypes={[
        { label: "PPC agencies", href: "/agencies/ppc-agencies" },
        { label: "SEO agencies", href: "/agencies/seo-agencies" },
        { label: "Digital agencies", href: "/agencies/digital-agencies" },
        { label: "Influencer marketing agencies", href: "/agencies/influencer-marketing-agencies" },
      ]}
    />
  );
}
