import type { Metadata } from "next";
import { AgencyTypeLayout } from "@/components/agency-type/AgencyTypeLayout";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Accountants for Social Media Agencies | ${siteConfig.name}`,
  description: "Specialist accountants for UK social media agency founders. Content production costs, influencer collabs, paid social spend treatment, retainer cash flow. ICAEW qualified.",
  alternates: { canonical: `${siteConfig.url}/agencies/social-media-agencies` },
  openGraph: {
    title: "Accountants for Social Media Agencies",
    description: "Specialist tax and accounting for social media agency founders.",
    url: `${siteConfig.url}/agencies/social-media-agencies`,
    type: "website",
  },
};

export default function SocialMediaAgenciesPage() {
  return (
    <AgencyTypeLayout
      slug="social-media-agencies"
      title="Accountants for social media agencies"
      hero="Specialist tax and accounting for UK social media agency founders. Content production accounting, influencer collaborations, paid social ad spend, retainer cash flow — we handle the tangled financial reality of running a modern social media agency."
      sections={[
        {
          heading: "Content production costs and capital vs revenue",
          body: (
            <p>
              Social media agencies spend heavily on content production: photographer day rates, video editor freelancers, equipment hire, studio rental, props, paid talent. Most of this is revenue expenditure (deductible immediately against profits), but equipment purchases over the Annual Investment Allowance threshold may need different treatment. Getting the classification right reduces your corporation tax bill and keeps your management accounts honest about the true cost of delivery.
            </p>
          ),
        },
        {
          heading: "Influencer collaborations and gifting tax",
          body: (
            <p>
              When your social media agency arranges gifted product collaborations or paid influencer partnerships on behalf of clients, there are tax angles to navigate. The gifted product value is taxable income to the influencer (HMRC has been increasingly active here), and your agency's facilitation role can trigger reporting obligations. We help social media agencies handle gifting and paid collab structures cleanly.
            </p>
          ),
        },
        {
          heading: "Paid social spend management",
          body: (
            <p>
              If you manage Meta, TikTok, LinkedIn or X ad spend on behalf of clients, that spend should not inflate your turnover. We help structure invoicing so ad budgets pass through cleanly without distorting your VAT registration position, your gross margin, or your valuation at exit. We also help you reclaim VAT on UK-sourced ad spend correctly and handle the reverse charge on Meta/TikTok which are typically billed from Ireland.
            </p>
          ),
        },
      ]}
      faqs={[
        {
          q: "How do I account for content production costs in a social media agency?",
          a: "Most content production costs (freelancer fees, equipment hire, location costs, paid talent) are revenue expenses, deducted immediately against profits. Equipment purchases over £1,000 may need capital allowance treatment. We help social media agencies set up a chart of accounts that separates content costs by client/project so you can see true gross margin.",
        },
        {
          q: "Is gifted product to an influencer tax-deductible for my agency?",
          a: "If your agency buys product to gift to creators, those costs are usually deductible business expenses. The influencer themselves may have a tax obligation on the value of gifted product they receive — HMRC has been clear that gifted product for promotion is taxable income to the creator. We help social media agencies handle the reporting side cleanly.",
        },
        {
          q: "Do I charge VAT on social media management retainers to overseas clients?",
          a: "For business clients outside the UK, the supply is usually outside UK VAT scope and the client accounts for VAT under the reverse charge mechanism. For UK clients, standard 20% VAT applies once you're registered. We help social media agencies structure invoicing for international client books correctly.",
        },
      ]}
      relatedTypes={[
        { label: "Influencer marketing agencies", href: "/agencies/influencer-marketing-agencies" },
        { label: "Performance marketing agencies", href: "/agencies/performance-marketing-agencies" },
        { label: "PPC agencies", href: "/agencies/ppc-agencies" },
        { label: "Marketing agencies", href: "/agencies/marketing-agencies" },
      ]}
    />
  );
}
