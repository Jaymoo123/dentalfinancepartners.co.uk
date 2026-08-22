import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { BlogCategoryHub } from "@/components/blog/BlogCategoryHub";

const categoryName = "Incorporation & Company Structures";
const categorySlug = "incorporation-and-company-structures";
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

export default function IncorporationCompanyStructuresPage() {
  return (
    <BlogCategoryHub
      categoryName={categoryName}
      categorySlug={categorySlug}
      collectionName={`${categoryName} for Property Investors`}
      description={description}
      intro="Master property incorporation and company structures. Comprehensive guides on limited company setup, holdover relief, director loans, dividend strategies, and choosing the right structure for your portfolio."
      sections={[
        {
          heading: "When incorporation makes sense for landlords",
          paragraphs: [
            "Incorporating a property portfolio into a limited company is most beneficial for higher-rate taxpayers with significant mortgage debt. Since Section 24 removed individual landlords' ability to deduct mortgage interest, companies, which still deduct finance costs before corporation tax at 25%, can offer substantial annual savings.",
            "Incorporation tends to work best for landlords who plan to retain profits within the company rather than extract them immediately. If you rely on rental income for day-to-day living expenses, the additional costs of extracting funds via salary or dividends may reduce the advantage. A detailed tax comparison modelling at least 10 years of projected income is essential before committing.",
          ],
        },
        {
          heading: "Limited company vs SPV structures",
          paragraphs: [
            "A special purpose vehicle (SPV) is a limited company set up solely to hold property. Most buy-to-let mortgage lenders prefer SPV structures with SIC code 68100 (buying and selling of own real estate) or 68209 (letting of own property). An SPV keeps property assets ring-fenced from other business activities, simplifying accounting and lending.",
            "A trading limited company can also hold property, but lenders may apply stricter criteria and higher interest rates. For new purchases, an SPV is almost always the preferred route. For existing portfolios being incorporated, the choice depends on whether you have other business activities that could benefit from being combined.",
          ],
        },
        {
          heading: "Holdover relief and stamp duty on transfer",
          paragraphs: [
            "Transferring properties from personal ownership to a company is a disposal for capital gains tax purposes, triggering CGT on any gains at 18% or 24%. However, HMRC incorporation relief under TCGA 1992 s162 may apply if the portfolio qualifies as a business, typically requiring active management of multiple properties rather than passive holding.",
            "Stamp duty land tax (SDLT) applies on the market value of the transferred properties, including the 3% additional dwelling supplement. For large portfolios this can represent a significant upfront cost. Some landlords phase incorporations or use partnership structures as an intermediate step to manage these costs.",
          ],
        },
        {
          heading: "Director loan accounts and dividend extraction",
          paragraphs: [
            "When you transfer properties to your company, the market value less any mortgages creates a director's loan account, money the company owes you. You can withdraw this balance tax-free over time, providing a useful source of income in the early years of incorporation without triggering additional tax.",
            "Once the loan account is exhausted, profits are typically extracted via a combination of salary (up to the NIC threshold) and dividends. For the 2026/27 tax year, the dividend allowance is £500 and rates are 10.75% (basic), 35.75% (higher), and 39.35% (additional). Planning the mix of salary and dividends each year is critical to minimising the overall tax burden.",
          ],
        },
        {
          heading: "Choosing the right structure for your portfolio",
          paragraphs: [
            "The right structure depends on your portfolio size, mortgage levels, income needs, and long-term plans. Landlords building a portfolio to pass to the next generation may benefit from a family investment company (FIC), which offers flexible share classes and inheritance tax planning. Those focused on short-term cash flow may prefer to remain as individuals and use other Section 24 mitigation strategies.",
            "There is no one-size-fits-all answer. A specialist property tax accountant can model the scenarios (personal ownership, SPV, trading company, partnership, or FIC) against your actual numbers and help you choose the structure that delivers the best outcome over the life of your portfolio.",
          ],
        },
      ]}
      cta={{
        heading: "Considering incorporation?",
        body: "Deciding whether to incorporate your property portfolio is one of the biggest financial decisions a landlord can make. Our specialist accountants can model the tax savings, calculate transfer costs, and guide you through the entire process.",
        submitLabel: "Request incorporation consultation",
      }}
    />
  );
}
