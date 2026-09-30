import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { BlogCategoryHub } from "@/components/blog/BlogCategoryHub";

const categoryName = "Section 24 & Tax Relief";
const categorySlug = "section-24-and-tax-relief";
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

export default function Section24TaxReliefPage() {
  return (
    <BlogCategoryHub
      categoryName={categoryName}
      categorySlug={categorySlug}
      collectionName={`${categoryName} for Property Investors`}
      description={description}
      intro="Navigate Section 24 mortgage interest restrictions with confidence. Comprehensive guides on tax relief changes, calculators, planning strategies, furnished holiday lets, and self-assessment for landlords."
      sections={[
        {
          heading: "Understanding Section 24 mortgage interest restrictions",
          paragraphs: [
            "Section 24 of the Finance (No. 2) Act 2015 fundamentally changed how individual landlords claim tax relief on mortgage interest. Since April 2020, individual landlords can no longer deduct mortgage interest from rental income before calculating tax. Instead, they receive a basic-rate (20%) tax credit on the interest paid.",
            "This means the full rental income is taxed at your marginal rate, with only a 20% credit applied afterwards. For basic-rate taxpayers the effect is neutral, but higher-rate and additional-rate taxpayers face a significantly increased tax bill.",
          ],
        },
        {
          heading: "Impact on higher-rate taxpayers",
          paragraphs: [
            "Higher-rate taxpayers at 40% only receive a 20% tax credit, effectively doubling the cost of mortgage interest. Additional-rate taxpayers at 45% fare even worse. Section 24 can also push basic-rate taxpayers into the higher-rate band because gross rental income, without the mortgage deduction, inflates total taxable income.",
            "This knock-on effect can reduce eligibility for child benefit, erode the personal savings allowance, and remove access to marriage allowance, making the real cost of Section 24 far greater than the headline figures suggest.",
          ],
        },
        {
          heading: "Calculating your Section 24 liability",
          paragraphs: [
            "To calculate your Section 24 position, start with gross rental income and deduct all allowable expenses except finance costs. Apply income tax at your marginal rate to the resulting profit. Then calculate 20% of your total finance costs and deduct this as a tax credit. The difference between these two figures represents your additional tax burden under Section 24.",
            "Landlords with multiple properties should aggregate all rental income and finance costs across their portfolio before performing this calculation, as HMRC treats UK property income as a single business.",
          ],
        },
        {
          heading: "Mitigation strategies: incorporation and partnerships",
          paragraphs: [
            "The most common mitigation strategy is transferring properties to a limited company, which is not affected by Section 24. Companies deduct mortgage interest as a business expense before corporation tax at 25%. However, incorporation triggers capital gains tax and stamp duty land tax on the transfer, so the numbers must be modelled carefully.",
            "Partnership structures can also help where one spouse is a basic-rate taxpayer. By adjusting profit-sharing ratios, more income can be allocated to the lower-earning partner. Some landlords also consider reducing leverage or overpaying mortgages to shrink the finance cost caught by Section 24.",
          ],
        },
        {
          heading: "Furnished holiday lets: FHL regime abolished",
          paragraphs: [
            "The Furnished Holiday Lettings (FHL) tax regime was abolished from 6 April 2025 (1 April 2025 for Corporation Tax) under the Finance Act 2025. Previously, FHLs were treated as trading income, allowing full mortgage interest deduction and bypassing Section 24 entirely. This exemption no longer applies.",
            "From the 2025/26 tax year onwards, holiday let income is taxed identically to standard rental income. Section 24 mortgage interest restrictions now apply, capital allowances on new expenditure are no longer available (only Replacement Domestic Items Relief), and CGT business reliefs such as Business Asset Disposal Relief and rollover relief cannot be claimed. Landlords who previously relied on FHL status should review their tax position and consider whether incorporation or other mitigation strategies are appropriate.",
          ],
        },
      ]}
      cta={{
        heading: "Need Section 24 tax advice?",
        body: "Section 24 has significantly increased the tax burden for many landlords. Our specialist property tax accountants can model your exact position, compare mitigation strategies, and help you make informed decisions about your portfolio's future.",
        submitLabel: "Request a free consultation",
      }}
    />
  );
}
