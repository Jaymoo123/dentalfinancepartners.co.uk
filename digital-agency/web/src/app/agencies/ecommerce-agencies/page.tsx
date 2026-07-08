import type { Metadata } from "next";
import { AgencyTypeLayout } from "@/components/agency-type/AgencyTypeLayout";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Accountants for E-commerce Agencies | ${siteConfig.name}`,
  description: "Specialist accountants for UK e-commerce agency founders. Shopify Plus, Klaviyo partner commissions, project + retainer mix, performance fees. Agency-only focus.",
  alternates: { canonical: `${siteConfig.url}/agencies/ecommerce-agencies` },
  openGraph: {
    title: "Accountants for E-commerce Agencies",
    description: "Specialist tax and accounting for e-commerce agency founders.",
    url: `${siteConfig.url}/agencies/ecommerce-agencies`,
    type: "website",
    images: [{ url: siteConfig.publisherLogoUrl }],
  },
};

export default function EcommerceAgenciesPage() {
  return (
    <AgencyTypeLayout
      slug="ecommerce-agencies"
      title="Accountants for e-commerce agencies"
      hero="Specialist tax and accounting for UK e-commerce agency founders. Shopify Plus partner commissions, Klaviyo and Recharge integrations, project plus retainer billing, performance bonuses tied to client revenue, we handle how e-commerce agencies actually make money."
      sections={[
        {
          heading: "Partner programme commissions",
          body: (
            <p>
              E-commerce agencies often earn meaningful residual revenue from Shopify Plus referral commissions, Klaviyo and Recharge partner programmes, plus performance bonuses tied to client GMV. These are trading income, taxed at corporation tax rates if you're a limited company. The timing matters: most partner programmes pay residual monthly for the client's lifetime, creating a long-tail revenue stream that needs careful management to keep your forecasting honest.
            </p>
          ),
        },
        {
          heading: "Project plus retainer revenue mix",
          body: (
            <p>
              E-commerce agencies typically blend big build projects (Shopify Plus migrations, replatforms) with ongoing CRO and lifecycle retainers. Each has different revenue recognition rules. Build projects need percentage-of-completion accounting to avoid overstating profit. Retainers are recognised as earned each month. Getting this right means your management accounts reflect reality, not just what cash arrived.
            </p>
          ),
        },
        {
          heading: "R&D tax credits for custom commerce work",
          body: (
            <p>
              Custom Shopify apps, bespoke Klaviyo flows beyond template configuration, headless commerce builds, integrations between Shopify and bespoke ERP systems, custom checkout extensions, these often qualify for R&D tax credits under HMRC's SME scheme. We assess every e-commerce client as standard.
            </p>
          ),
        },
      ]}
      faqs={[
        {
          q: "Are Shopify Plus partner commissions trading income?",
          a: "Yes. Partner programme commissions are trading income for your limited company and taxed at corporation tax rates. They're recognised when earned (i.e. when the client's payment to Shopify triggers your commission), not when received. We help e-commerce agencies set up Xero or QuickBooks to track this properly.",
        },
        {
          q: "How do I handle performance bonuses tied to client GMV?",
          a: "Performance bonuses are trading income. The timing of recognition depends on contract terms: if the bonus is contingent on hitting GMV targets, you only recognise it when those targets are confirmed met. Some agencies recognise expected bonuses on an accruals basis. We help structure contracts and accounting treatment so revenue is recognised cleanly.",
        },
        {
          q: "Does building custom Shopify apps qualify for R&D tax credits?",
          a: "Usually yes if there's genuine technical advancement. Bespoke checkout extensions, custom inventory sync to non-standard ERPs, novel personalisation engines, these typically qualify. Pure theme customisation or installing existing apps does not. We assess each build to identify qualifying R&D spend.",
        },
      ]}
      relatedTypes={[
        { label: "Email marketing agencies", href: "/agencies/email-marketing-agencies" },
        { label: "Performance marketing agencies", href: "/agencies/performance-marketing-agencies" },
        { label: "Web design agencies", href: "/agencies/web-design-agencies" },
        { label: "Digital agencies", href: "/agencies/digital-agencies" },
      ]}
    />
  );
}
