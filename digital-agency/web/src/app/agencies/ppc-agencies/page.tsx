import type { Metadata } from "next";
import { AgencyTypeLayout } from "@/components/agency-type/AgencyTypeLayout";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Accountants for PPC Agencies | ${siteConfig.name}`,
  description: "Specialist accountants for UK PPC agency founders. Media spend pass-through, performance-based fees, Google and Meta commission models. Agency-only specialists.",
  alternates: { canonical: `${siteConfig.url}/agencies/ppc-agencies` },
  openGraph: {
    title: "Accountants for PPC Agencies",
    description: "Specialist tax and accounting for PPC agency founders.",
    url: `${siteConfig.url}/agencies/ppc-agencies`,
    type: "website",
    images: [{ url: siteConfig.publisherLogoUrl }],
  },
};

export default function PPCAgenciesPage() {
  return (
    <AgencyTypeLayout
      slug="ppc-agencies"
      title="Accountants for PPC agencies"
      hero="Specialist tax, accounts and financial advice for UK PPC agency founders. We understand media spend pass-through, performance-based fees, and the scaling complexity that comes with running paid media at six and seven figures."
      sections={[
        {
          heading: "Media spend that's not your revenue",
          body: (
            <p>
              Running ads through your agency's accounts means six figures of client ad budget flowing through your P&L every month. That spend is not your revenue and should not inflate your turnover or your VAT-able sales. The right accounting treatment depends on whether you're invoicing for ad spend separately, marking it up, or running it through a client-billed media account. Get the structure wrong and your turnover looks 4-5x what it actually is, which distorts your VAT registration position, your management accounts and your valuation at exit.
            </p>
          ),
        },
        {
          heading: "Performance fees, retainers and management fees",
          body: (
            <p>
              PPC agencies often blend retainer income, percentage-of-spend management fees, and performance bonuses tied to CPA or ROAS. Each is recognised differently for accounting purposes and each carries different VAT treatment for international clients. We help you structure pricing, contracts and revenue recognition so your real economic position is reflected in your numbers and your tax bill.
            </p>
          ),
        },
        {
          heading: "R&D credits for PPC technology",
          body: (
            <p>
              Many PPC agencies build proprietary attribution tooling, automated bid management, or AI-powered creative testing systems. That work often qualifies for R&D tax credits under HMRC's SME scheme. We assess every PPC client for R&D eligibility as standard, including custom Google Ads scripts, Meta API integrations, and bespoke reporting platforms.
            </p>
          ),
        },
      ]}
      faqs={[
        {
          q: "Should I include client ad spend in my agency's turnover?",
          a: "Usually no. If you're billing clients separately for ad spend (or they pay Google/Meta directly), that spend is not your revenue. If you mark up ad spend or bundle it with your management fee, only the markup is your revenue. Getting this wrong inflates your turnover, can trigger early VAT registration, and distorts your gross margin reporting.",
        },
        {
          q: "Do I charge VAT on Google Ads or Meta Ads management fees to clients?",
          a: "If your client is UK-based and VAT registered, yes, 20% standard rate. For overseas business clients, the supply is usually outside UK VAT scope and the client accounts for VAT under the reverse charge mechanism. We help PPC agencies structure invoicing correctly for international client books.",
        },
        {
          q: "Are performance bonuses tied to CPA or ROAS taxed differently?",
          a: "No, they're trading income like your management fees. But the timing of revenue recognition matters. If a performance bonus is contingent on month-end metrics, you can only recognise it when the conditions are met. We help PPC founders structure contracts so revenue recognition is clean and audit-ready.",
        },
      ]}
      relatedTypes={[
        { label: "SEO agencies", href: "/agencies/seo-agencies" },
        { label: "Performance marketing agencies", href: "/agencies/performance-marketing-agencies" },
        { label: "Digital agencies", href: "/agencies/digital-agencies" },
        { label: "Social media agencies", href: "/agencies/social-media-agencies" },
      ]}
    />
  );
}
