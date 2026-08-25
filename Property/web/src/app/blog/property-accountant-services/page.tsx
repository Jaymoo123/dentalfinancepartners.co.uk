import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { BlogCategoryHub } from "@/components/blog/BlogCategoryHub";

const categoryName = "Property Accountant Services";
const categorySlug = "property-accountant-services";
const description =
  "Find and compare specialist property accountants across the UK. Pricing guides, service comparisons, location recommendations and career insights.";

export const metadata: Metadata = {
  title: `${categoryName}`,
  description,
  alternates: {
    canonical: `${siteConfig.url}/blog/${categorySlug}`,
  },
  openGraph: {
    title: `${categoryName} for UK Landlords`,
    description: `Find and compare specialist property accountants across the UK.`,
    url: `${siteConfig.url}/blog/${categorySlug}`,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${categoryName} for UK Landlords`,
    description: `Find and compare specialist property accountants across the UK.`,
  },
};

export default function PropertyAccountantServicesPage() {
  return (
    <BlogCategoryHub
      categoryName={categoryName}
      categorySlug={categorySlug}
      description={description}
      intro="Find the right property accountant for your portfolio. Location guides, pricing breakdowns, service comparisons, and expert advice on choosing a specialist landlord accountant."
      sections={[
        {
          heading: "Why use a specialist property accountant?",
          paragraphs: [
            "Property taxation in the UK is significantly more complex than standard self-assessment. Between Section 24 finance cost restrictions, Capital Gains Tax reliefs, Stamp Duty surcharges, and the distinct rules for furnished holiday lets, a general high-street accountant can easily miss savings or, worse, file incorrectly. A specialist property accountant works with landlord clients day in, day out and understands the nuances that directly affect your bottom line.",
            "Specialist firms also stay ahead of regulatory changes such as Making Tax Digital for Income Tax, which will require quarterly digital reporting from landlords with qualifying income above £50,000 from April 2026. Proactive advice on structuring purchases, timing disposals, and choosing the right ownership vehicle can save thousands over a portfolio's lifetime.",
          ],
        },
        {
          heading: "Services a property accountant provides",
          paragraphs: [
            "A dedicated property accountant typically handles annual self-assessment tax returns, rental income schedules, and year-end accounts for landlords operating through limited companies. Beyond compliance, they advise on tax planning, including incorporation analysis, capital allowances claims, and loss relief strategies across your portfolio.",
            "Many firms also offer bookkeeping support, VAT registration and returns for commercial landlords, mortgage and refinancing projections, and CGT computations on disposals. If you hold property jointly or through a trust, your accountant should prepare the partnership or trust returns and advise on profit-sharing ratios that reflect each party's actual economic interest.",
          ],
        },
        {
          heading: "Choosing the right accountant",
          paragraphs: [
            "Look for a firm with demonstrable property sector experience, not just a handful of landlord clients but a genuine specialism. Check whether they are ACCA, ICAEW, or CIOT qualified and hold professional indemnity insurance. Client testimonials and case studies specific to property investors are more meaningful than generic reviews.",
            "Communication matters as much as technical skill. Your accountant should be accessible when you need them, especially around the 31 January self-assessment deadline or when you're mid-way through a purchase. Ask about their technology stack: cloud accounting (Xero, FreeAgent, QuickBooks) and digital record-keeping are essential for MTD compliance and real-time visibility of your portfolio finances.",
          ],
        },
        {
          heading: "Cost and fee structures",
          paragraphs: [
            "Property accountancy fees vary widely based on portfolio size, company structure, and the scope of work. A straightforward personal tax return with a single buy-to-let might cost £250 to £400, while a limited company with ten-plus properties, VAT registration, and quarterly management accounts could run to £2,000 to £4,000 per year. Most specialist firms offer fixed-fee packages so you know exactly what you'll pay.",
            "When comparing quotes, look beyond the headline fee. Some firms charge separately for ad hoc tax advice, HMRC correspondence, or CGT computations, while others bundle everything into an annual retainer. A slightly higher fixed fee that includes unlimited queries often delivers better value than a low base price with costly add-ons.",
          ],
        },
        {
          heading: "When to switch accountants",
          paragraphs: [
            "If your current accountant is simply filing what you give them without offering proactive tax-saving advice, it may be time to move. Other red flags include missed deadlines, slow responses during critical periods, lack of familiarity with property-specific reliefs, or an inability to support limited company structures and MTD-compatible software.",
            "Switching is straightforward: your new accountant handles the professional clearance process and obtains your records from the outgoing firm. The best time to transition is after your annual accounts have been filed, giving the new firm a clean starting point. Most landlords who switch to a specialist report recouping the cost of fees through improved tax efficiency within the first year.",
          ],
        },
      ]}
      cta={{
        heading: "Looking for a property accountant?",
        body: "Our specialist property accountants work exclusively with UK landlords and property investors. From tax returns and company accounts to incorporation advice and CGT planning, we provide the expert support your portfolio needs. Get in touch to see how we can help.",
        submitLabel: "Request a free consultation",
      }}
    />
  );
}
