import type { Metadata } from "next";
import { AgencyTypeLayout } from "@/components/agency-type/AgencyTypeLayout";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Accountants for Branding Agencies | ${siteConfig.name}`,
  description: "Specialist accountants for UK branding and identity agency founders. Project revenue recognition, IP rights, deposits and long sales cycles. Agency-only specialists.",
  alternates: { canonical: `${siteConfig.url}/agencies/branding-agencies` },
  openGraph: {
    title: "Accountants for Branding Agencies",
    description: "Specialist tax and accounting for branding agency founders.",
    url: `${siteConfig.url}/agencies/branding-agencies`,
    type: "website",
    images: [{ url: siteConfig.publisherLogoUrl }],
  },
};

export default function BrandingAgenciesPage() {
  return (
    <AgencyTypeLayout
      slug="branding-agencies"
      title="Accountants for branding agencies"
      hero="Specialist tax and accounting for UK branding and identity agency founders. Long project cycles, IP rights, deposit-heavy invoicing and creative team scaling, handled by specialist agency accountants who understand how a branding studio actually earns."
      sections={[
        {
          heading: "Project revenue recognition for long branding engagements",
          body: (
            <p>
              Branding projects often span 4-6 months from kick-off to delivery. If you invoice 50% upfront, 25% at concept and 25% on final delivery, none of that money is fully earned at the point of invoicing. UK GAAP requires revenue to be recognised as work is performed, not as cash is received. Getting this right matters for accurate management accounts, fair corporation tax bills, and a clean balance sheet at exit. We model project completion percentages and deferred revenue properly for branding agencies.
            </p>
          ),
        },
        {
          heading: "IP rights and design royalties",
          body: (
            <p>
              Whether your studio assigns full IP to the client or retains licensing rights changes how revenue is taxed and how the studio is valued. Royalty income from design IP is taxable as trading income but may attract specific reliefs. Pre-sale IP rights audits often add to the agency's valuation. We help branding agency founders structure IP ownership and licensing terms so the commercial and tax positions align.
            </p>
          ),
        },
        {
          heading: "Cash flow management for deposit-heavy businesses",
          body: (
            <p>
              Branding agencies often have huge cash inflows at project start and quiet months in between. That feast-or-famine pattern creates real risks: paying corporation tax on cash you've received but not yet earned, salary commitments through dry months, freelancer bills coming due before client payments land. We build forward cash flow forecasts and help branding founders manage deferred revenue, retained profits, and director extraction across uneven months.
            </p>
          ),
        },
      ]}
      faqs={[
        {
          q: "When should I recognise revenue on a six-month branding project?",
          a: "Revenue is recognised as the work is performed, not as cash is received. For a typical six-month branding engagement with 50% upfront, you'd recognise revenue gradually across the project as defined milestones are completed. The upfront cash sits on the balance sheet as deferred revenue until earned. We help branding agencies set this up properly in Xero or QuickBooks.",
        },
        {
          q: "Are design royalties taxed as income or capital?",
          a: "Almost always as trading income for a UK limited company, taxed at corporation tax rates. Royalties are not generally capital. The only exception is if the IP itself is sold (not licensed), in which case capital gains rules may apply. We structure royalty arrangements so the position is clear and the tax treatment is correct.",
        },
        {
          q: "What's the tax treatment of project deposits I haven't earned yet?",
          a: "Deposits sit on your balance sheet as a liability (deferred revenue) until you've performed the work they relate to. You don't pay corporation tax on them until they're recognised as revenue. Getting this wrong is the most common mistake we see when branding agencies move from a small accountant to us, they've been paying tax on cash, not on earned revenue.",
        },
      ]}
      relatedTypes={[
        { label: "Creative agencies", href: "/agencies/creative-agencies" },
        { label: "Web design agencies", href: "/agencies/web-design-agencies" },
        { label: "Marketing agencies", href: "/agencies/marketing-agencies" },
        { label: "Advertising agencies", href: "/agencies/advertising-agencies" },
      ]}
    />
  );
}
