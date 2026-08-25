import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { BlogCategoryHub } from "@/components/blog/BlogCategoryHub";

const categoryName = "Portfolio Management";
const categorySlug = "portfolio-management";
const description = `Expert guidance on ${categoryName.toLowerCase()} for UK property investors. Practical advice, tax planning strategies, and compliance insights.`;

export const metadata: Metadata = {
  title: `${categoryName} for Property Investors`,
  description,
  alternates: {
    canonical: `${siteConfig.url}/blog/${categorySlug}`,
  },
  openGraph: {
    title: `${categoryName} for Property Investors`,
    description: `Expert guidance on ${categoryName.toLowerCase()} for UK property investors.`,
    url: `${siteConfig.url}/blog/${categorySlug}`,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${categoryName} for Property Investors`,
    description: `Expert guidance on ${categoryName.toLowerCase()} for UK property investors.`,
  },
};

export default function PortfolioManagementPage() {
  return (
    <BlogCategoryHub
      categoryName={categoryName}
      categorySlug={categorySlug}
      collectionName={`${categoryName} for Property Investors`}
      description={description}
      intro="Build and manage your property portfolio effectively. Expert insights on accounting services, tax planning, compliance, financial management, and choosing the right accountant for your needs."
      sections={[
        {
          heading: "Portfolio growth strategies",
          paragraphs: [
            "Growing a property portfolio in the UK requires a clear acquisition strategy that balances yield, capital appreciation, and risk. Many investors start with a single buy-to-let and scale into multi-unit freehold blocks or HMOs to improve returns per square foot. Each expansion decision carries tax consequences, from additional Stamp Duty Land Tax surcharges (currently 5% on second-plus properties) to the way finance costs are relieved under Section 24.",
            "A phased approach, targeting one or two acquisitions per year while reinvesting net rental income, lets you build equity steadily without over-leveraging. Working with a specialist property accountant at each stage ensures new purchases are structured in the most tax-efficient vehicle from day one.",
          ],
        },
        {
          heading: "Financing and leverage",
          paragraphs: [
            "Mortgage finance is the primary lever for portfolio landlords, but lenders apply stricter stress tests once you hold four or more mortgaged properties. Portfolio underwriting typically requires a full schedule of assets and liabilities, projected rental income across every unit, and evidence that your interest cover ratio (ICR) meets minimum thresholds, usually 125% to 145% at a stressed rate.",
            "Limited company borrowing has become more attractive since Section 24 removed full mortgage interest relief for higher-rate individual landlords. Company structures retain full interest deductibility, though lender rates tend to be 0.5 to 1% higher. Bridging finance and commercial loans can unlock opportunities such as auction purchases or refurbishment projects, but the costs must be modelled carefully against projected returns.",
          ],
        },
        {
          heading: "Self-management vs letting agent",
          paragraphs: [
            "Deciding whether to manage properties yourself or appoint a letting agent affects both your cash flow and your time. Self-managing saves the typical 8 to 12% management fee, but demands hands-on involvement in tenant sourcing, maintenance coordination, deposit protection, and compliance with regulations like the Homes (Fitness for Human Habitation) Act 2018.",
            "As a portfolio grows beyond five or six units, most landlords find the operational burden outweighs the fee saving. A hybrid approach, self-managing nearby properties while appointing agents for geographically distant ones, can strike an effective balance. Whichever route you choose, agent fees and associated management costs are fully deductible against rental income for tax purposes.",
          ],
        },
        {
          heading: "Portfolio diversification",
          paragraphs: [
            "Concentration risk is one of the biggest threats to a rental portfolio. Holding every property in the same postcode, the same tenant type, or the same price band exposes you to localised market downturns, regulatory changes, or sector-specific voids. Diversifying across residential, student, and short-term holiday lets spreads both income and void risk.",
            "Geographic diversification, investing in areas with different economic drivers, smooths returns further. Each property type brings distinct tax treatment: furnished holiday lets (FHLs) qualify for capital allowances and Business Asset Disposal Relief, while standard buy-to-lets do not. Understanding these differences is essential when choosing where to allocate your next deposit.",
          ],
        },
        {
          heading: "Exit strategies and succession planning",
          paragraphs: [
            "Every portfolio needs an exit plan, whether that means a phased sell-down in retirement, a transfer to the next generation, or a bulk disposal to an institutional buyer. Capital Gains Tax (CGT) applies on disposal, with residential property gains taxed at 18% (basic rate) or 24% (higher rate) after the annual exempt amount.",
            "Timing disposals across multiple tax years and using spousal transfers to utilise both partners' CGT allowances can substantially reduce the overall tax bill. For longer-term succession, transferring properties into a family investment company or trust may be appropriate, though Inheritance Tax and ongoing compliance costs must be weighed up. Early planning, ideally five to ten years before the intended exit, gives maximum flexibility.",
          ],
        },
      ]}
      cta={{
        heading: "Need portfolio management advice?",
        body: "Whether you're scaling from one property to ten or restructuring an established portfolio, our specialist property accountants can help you minimise tax, optimise financing, and plan for the future. Get in touch for tailored advice on your portfolio.",
        submitLabel: "Request portfolio consultation",
      }}
    />
  );
}
