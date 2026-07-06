import type { Metadata } from "next";
import { AgencyTypeLayout } from "@/components/agency-type/AgencyTypeLayout";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Accountants for Influencer Marketing Agencies | ${siteConfig.name}`,
  description: "Specialist accountants for UK influencer marketing agency founders. Cross-border creator payments, IR35 risk, VAT on international fees. Agency-only specialists.",
  alternates: { canonical: `${siteConfig.url}/agencies/influencer-marketing-agencies` },
  openGraph: {
    title: "Accountants for Influencer Marketing Agencies",
    description: "Specialist tax and accounting for influencer marketing agency founders.",
    url: `${siteConfig.url}/agencies/influencer-marketing-agencies`,
    type: "website",
  },
};

export default function InfluencerMarketingAgenciesPage() {
  return (
    <AgencyTypeLayout
      slug="influencer-marketing-agencies"
      title="Accountants for influencer marketing agencies"
      hero="Specialist tax and accounting for UK influencer marketing agency founders. Creator payments, cross-border tax compliance, IR35 risk and the messy reality of paying talent across 30 countries, we handle it."
      sections={[
        {
          heading: "Paying creators across borders",
          body: (
            <p>
              Influencer marketing agencies pay talent in dozens of countries, often through a mix of bank transfer, PayPal, Wise and platform escrow. Each payment route has different VAT, tax and compliance implications. UK-resident creators are typically self-employed but may be edge-case IR35 risks if your agency directs the work. Non-UK creators are usually outside scope for UK VAT but may need to be reported under HMRC's overseas worker rules in some scenarios.
            </p>
          ),
        },
        {
          heading: "IR35 risk with creator engagements",
          body: (
            <p>
              The line between an influencer contractor and a deemed employee gets blurry when your agency dictates the brief, the content style, the posting schedule and the metrics. If HMRC reclassifies a creator as a deemed employee under IR35, your agency is liable for PAYE and NI on every payment ever made to them. We help influencer marketing agencies structure contracts and engagement practices to keep creators safely outside IR35.
            </p>
          ),
        },
        {
          heading: "Talent management revenue and commission models",
          body: (
            <p>
              Some influencer agencies act as talent managers, taking a commission on brand deals their creators sign. That commission income has specific VAT and accounting treatment, especially when the deal is between the brand and the creator directly with your agency facilitating. We help you structure these revenue streams cleanly so HMRC can't argue you're operating an employment agency by accident.
            </p>
          ),
        },
      ]}
      faqs={[
        {
          q: "Do I need to put UK influencers on PAYE if my agency pays them regularly?",
          a: "Probably not, but it depends on the engagement. If your agency dictates the work, schedules, deliverables and the creator only works for you, HMRC could argue they are a deemed employee. The risk is highest with high-value, exclusive creator deals. We review engagement patterns and contracts to keep creators safely outside IR35 where possible.",
        },
        {
          q: "Do I charge VAT on influencer fees I pay to overseas creators?",
          a: "You don't charge VAT on payments to creators, they're invoicing you, not the other way around. But you may need to account for VAT on the supply received under the reverse charge mechanism if the creator is in another country. The rules differ for EU vs non-EU creators. We handle this for influencer marketing agencies with global creator books.",
        },
        {
          q: "What's the tax treatment for talent management commission?",
          a: "Commission income from facilitating brand-creator deals is trading income for your agency, taxed at corporation tax rates if you're a limited company. The VAT treatment depends on whether you're invoicing the brand or the creator. We structure this so it's clean for HMRC and for any future agency sale.",
        },
      ]}
      relatedTypes={[
        { label: "Performance marketing agencies", href: "/agencies/performance-marketing-agencies" },
        { label: "Social media agencies", href: "/agencies/social-media-agencies" },
        { label: "PR agencies", href: "/agencies/pr-agencies" },
        { label: "Branding agencies", href: "/agencies/branding-agencies" },
      ]}
    />
  );
}
