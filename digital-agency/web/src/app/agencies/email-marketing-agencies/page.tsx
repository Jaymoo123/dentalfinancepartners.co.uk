import type { Metadata } from "next";
import { AgencyTypeLayout } from "@/components/agency-type/AgencyTypeLayout";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Accountants for Email Marketing Agencies | ${siteConfig.name}`,
  description: "Specialist accountants for UK email marketing agency founders. Klaviyo and HubSpot partner commissions, retainer income, R&D credits for automation. ICAEW qualified.",
  alternates: { canonical: `${siteConfig.url}/agencies/email-marketing-agencies` },
  openGraph: {
    title: "Accountants for Email Marketing Agencies",
    description: "Specialist tax and accounting for email marketing agency founders.",
    url: `${siteConfig.url}/agencies/email-marketing-agencies`,
    type: "website",
  },
};

export default function EmailMarketingAgenciesPage() {
  return (
    <AgencyTypeLayout
      slug="email-marketing-agencies"
      title="Accountants for email marketing agencies"
      hero="Specialist tax and accounting for UK email marketing agency founders. Klaviyo and HubSpot partner programme commissions, retainer revenue, deliverability tooling, and the tax angles other accountants miss."
      sections={[
        {
          heading: "Partner programme commissions",
          body: (
            <p>
              Email marketing agencies often earn meaningful revenue from referring clients to Klaviyo, HubSpot, Mailchimp or ActiveCampaign partner programmes. These commissions are trading income, taxable at corporation tax rates if you're a limited company. The timing matters, most partner programmes pay residual commission monthly for the client's lifetime, which means you have a long-tail income stream that needs careful management and accounts treatment to keep your management reports accurate.
            </p>
          ),
        },
        {
          heading: "Retainer revenue and forward visibility",
          body: (
            <p>
              Email marketing agencies are typically retainer-heavy: 70-90% of revenue comes from ongoing monthly engagements. That predictability is a gift for forecasting but a tax risk if you accept large upfront annual payments. Cash-accounting treatment vs. accruals affects when you owe corporation tax. We help email marketing agencies structure invoicing and revenue recognition so the bills don't surprise you.
            </p>
          ),
        },
        {
          heading: "R&D credits for email automation systems",
          body: (
            <p>
              Custom Klaviyo flows, bespoke Zapier integrations, AI-generated subject line testing, deliverability monitoring tooling, these often qualify for R&D tax credits under HMRC's SME scheme. We assess every email marketing client for eligibility, especially those building proprietary email infrastructure beyond what Klaviyo or HubSpot provide out of the box.
            </p>
          ),
        },
      ]}
      faqs={[
        {
          q: "Are Klaviyo or HubSpot partner commissions trading income?",
          a: "Yes. Partner programme commissions are trading income for your limited company and taxed at corporation tax rates. They're not capital and they're not employment income. The accounting timing is what matters, commission is usually recognised when earned (i.e. when the client's payment to Klaviyo triggers the commission), not when received.",
        },
        {
          q: "Should I charge VAT on email marketing retainers to overseas clients?",
          a: "If the overseas client is a business, the supply is usually outside the scope of UK VAT and the client accounts for VAT under the reverse charge mechanism. If they're a consumer, different rules apply. We help email marketing agencies handle EU and non-EU clients differently and correctly.",
        },
        {
          q: "What R&D activity qualifies for credits in an email marketing agency?",
          a: "Custom platform integrations, bespoke flow automation that goes beyond template configuration, AI-driven subject line or send-time optimisation tooling, deliverability monitoring systems and custom reporting platforms all typically qualify. Pure Klaviyo template setup work does not. We assess each project to identify qualifying R&D spend.",
        },
      ]}
      relatedTypes={[
        { label: "Digital agencies", href: "/agencies/digital-agencies" },
        { label: "Marketing agencies", href: "/agencies/marketing-agencies" },
        { label: "Performance marketing agencies", href: "/agencies/performance-marketing-agencies" },
        { label: "Social media agencies", href: "/agencies/social-media-agencies" },
      ]}
    />
  );
}
