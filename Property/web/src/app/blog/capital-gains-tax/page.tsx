import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { BlogCategoryHub } from "@/components/blog/BlogCategoryHub";

const categoryName = "Capital Gains Tax";
const categorySlug = "capital-gains-tax";
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

export default function CapitalGainsTaxPage() {
  return (
    <BlogCategoryHub
      categoryName={categoryName}
      categorySlug={categorySlug}
      collectionName={`${categoryName} for Property Investors`}
      description={description}
      intro="Navigate capital gains tax with confidence. Expert guidance on CGT calculations, reliefs, disposal strategies, and tax-efficient property investment planning."
      sections={[
        {
          heading: "CGT on property disposals",
          paragraphs: [
            "When you sell a residential property that is not your main home, capital gains tax applies to the profit, the difference between the sale price and your acquisition cost (including allowable purchase costs, improvement expenditure, and selling fees). For the 2026/27 tax year, residential property gains are taxed at 18% for basic-rate taxpayers and 24% for higher and additional-rate taxpayers.",
            "The rate that applies depends on your total taxable income in the year of disposal. If the gain, when added to your other income, falls within the basic-rate band, the portion within that band is taxed at 18% and the remainder at 24%. Timing a disposal to fall in a lower-income year can therefore reduce the effective CGT rate.",
          ],
        },
        {
          heading: "Principal private residence relief",
          paragraphs: [
            "Principal private residence (PPR) relief exempts gains on the sale of your main home from CGT entirely. If you have lived in the property as your only or main residence for the entire period of ownership, the full gain is exempt. Where you lived in the property for part of the ownership period, the gain is apportioned, and the final nine months of ownership are always treated as deemed occupation, regardless of whether you lived there.",
            "Nominating which property is your main residence is critical for landlords who own multiple properties. HMRC allows a nomination within two years of acquiring a second property. Strategic nomination can maximise PPR relief on the property with the largest expected gain.",
          ],
        },
        {
          heading: "Lettings relief",
          paragraphs: [
            "Lettings relief applies where a property that qualifies for PPR relief has also been let as residential accommodation. Since April 2020, lettings relief is only available if you shared occupation of the property with your tenant. Simply letting out a former home no longer qualifies.",
            "Where it does apply, the relief is capped at the lower of: £40,000, the amount of PPR relief given, or the gain attributable to the letting period. In practice, this relief now benefits very few landlords, but it remains relevant for those who let rooms in their own home or live in part of a property they also let.",
          ],
        },
        {
          heading: "Annual exempt amount and tax-free allowance",
          paragraphs: [
            "Every individual has an annual exempt amount (AEA) for capital gains, currently £3,000 for the 2026/27 tax year. Gains up to this threshold are tax-free. The AEA cannot be carried forward to future years, so if you do not use it, it is lost.",
            "For couples who jointly own investment properties, each person has their own £3,000 AEA, giving a combined £6,000 exemption. Transferring a share of a property to a spouse before sale (which is a no-gain, no-loss event) can therefore double the tax-free allowance available on the disposal.",
          ],
        },
        {
          heading: "CGT reporting and the 60-day rule",
          paragraphs: [
            "Since April 2020, UK residents who sell a residential property at a gain must report the disposal and make a payment on account of CGT within 60 days of completion. This applies to all residential property disposals where CGT is due, including buy-to-let sales, inherited properties, and second homes.",
            "The 60-day report is submitted through HMRC's online CGT on UK property service, separate from the self-assessment system. Failure to report within 60 days triggers late filing penalties under the same points-based regime used for other HMRC obligations. The disposal must still be included on your self-assessment return for the relevant tax year, with credit given for any payment on account already made.",
          ],
        },
      ]}
      cta={{
        heading: "Need CGT planning advice?",
        body: "Capital gains tax on property requires careful planning, from timing disposals to maximising reliefs. Our specialist property tax accountants can calculate your exact liability, identify available reliefs, and help you structure disposals tax-efficiently.",
        submitLabel: "Request CGT consultation",
      }}
    />
  );
}
