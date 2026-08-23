import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { BlogCategoryHub } from "@/components/blog/BlogCategoryHub";
import { PAGE_SUMMARIES } from "@/lib/page-summaries";

const categoryName = "Landlord Tax Essentials";
const categorySlug = "landlord-tax-essentials";
const description = `Essential tax guidance for UK landlords. Self-assessment, rental income tax, VAT, stamp duty, financial planning, and allowable expenses explained.`;

export const metadata: Metadata = {
  title: `${categoryName}`,
  description,
  alternates: {
    canonical: `${siteConfig.url}/blog/${categorySlug}`,
  },
  openGraph: {
    title: `${categoryName} for UK Landlords`,
    description: `Essential tax guidance for UK landlords covering self-assessment, rental income, VAT, and more.`,
    url: `${siteConfig.url}/blog/${categorySlug}`,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${categoryName} for UK Landlords`,
    description: `Essential tax guidance for UK landlords covering self-assessment, rental income, VAT, and more.`,
  },
};

export default function LandlordTaxEssentialsPage() {
  return (
    <BlogCategoryHub
      categoryName={categoryName}
      categorySlug={categorySlug}
      description={description}
      /* One copy, in `PAGE_SUMMARIES`, so the hub intro and every related-
         reading card pointing at this hub cannot drift apart. */
      intro={PAGE_SUMMARIES["/blog/landlord-tax-essentials"]}
      sections={[
        {
          heading: "Income tax for landlords",
          paragraphs: [
            "Rental income in the UK is taxed as part of your total income, meaning it's added to employment earnings, pensions, and other sources before tax bands are applied. Basic-rate taxpayers pay 20% on rental profits, higher-rate taxpayers pay 40%, and additional-rate taxpayers pay 45%. Understanding where your rental income pushes you within these bands is critical for planning. Even a modest portfolio can tip you from basic to higher rate.",
            "Since April 2020, Section 24 has fully restricted mortgage interest relief for individual landlords to a basic-rate tax credit (20%), regardless of your actual tax band. This means higher and additional-rate landlords effectively lose part of their interest deduction, which can turn a cash-flow-positive property into a tax-loss scenario on paper. Incorporation into a limited company is one strategy some landlords use to restore full interest deductibility, though it involves SDLT costs and CGT on transfer.",
          ],
        },
        {
          heading: "Allowable expenses and deductions",
          paragraphs: [
            "HMRC allows landlords to deduct a wide range of expenses from rental income before calculating taxable profit. These include letting agent fees, insurance premiums, maintenance and repair costs, ground rent, service charges, accountancy fees, and the cost of advertising for tenants. For furnished properties, you can claim the replacement of domestic items relief, covering like-for-like replacement of furniture, appliances, and kitchenware.",
            "The distinction between repairs (deductible) and improvements (capital expenditure, not deductible against income) is one of the most common areas of dispute with HMRC. Replacing a broken boiler with a modern equivalent is a repair; upgrading from a standard boiler to a premium system with additional radiators is likely an improvement. Keeping detailed records and photographs of the condition before and after work is the best way to support your claim if HMRC enquires.",
          ],
        },
        {
          heading: "Self-assessment deadlines",
          paragraphs: [
            "If you earn rental income, you must register for self-assessment and file a tax return each year. The key deadlines for the 2025/26 tax year are: 5 October 2026 to register if you're a new landlord, 31 October 2026 for paper returns, and 31 January 2027 for online returns and payment of any tax owed. Late filing attracts an automatic £100 penalty, with additional daily penalties and interest on unpaid tax.",
            "From April 2026, landlords with qualifying income above £50,000 will also need to comply with Making Tax Digital for Income Tax, submitting quarterly digital updates to HMRC through compatible software. This represents a significant shift from annual filing and requires ongoing digital bookkeeping throughout the year. Those with income between £30,000 and £50,000 will follow from April 2027.",
          ],
        },
        {
          heading: "Record keeping requirements",
          paragraphs: [
            "HMRC requires landlords to keep records for at least five years after the 31 January submission deadline for the relevant tax year. This includes rental income received, all expense receipts and invoices, mortgage statements, letting agent statements, and records of any capital expenditure. For CGT purposes, you should also retain purchase costs, solicitor and surveyor fees, and improvement expenditure for the entire period you own each property.",
            "Digital record keeping using cloud accounting software makes MTD compliance far simpler and reduces the risk of lost paperwork. Many landlords use Xero, FreeAgent, or QuickBooks linked to their bank accounts, with rental income and expenses categorised automatically. A specialist property accountant can set up your chart of accounts correctly from the start, saving hours of re-categorisation at year end.",
          ],
        },
        {
          heading: "Joint ownership and tax implications",
          paragraphs: [
            "When a property is jointly owned, most commonly by married couples or civil partners, HMRC's default position is to split rental income and expenses 50/50, regardless of the actual ownership split. However, couples can file a Form 17 declaration with HMRC to be taxed according to their actual beneficial ownership. This is a powerful planning tool: if one partner is a basic-rate taxpayer and the other is higher rate, shifting a greater share of income to the lower earner reduces the overall tax bill.",
            "Form 17 must be accompanied by evidence of unequal beneficial ownership, such as a deed of trust. The declaration remains in force until ownership proportions genuinely change. For unmarried joint owners, HMRC taxes each person on their actual share by default, so Form 17 is not required. Understanding these rules before purchase, and structuring ownership accordingly, can save significant tax over the life of the investment.",
          ],
        },
      ]}
      cta={{
        heading: "Need landlord tax support?",
        body: "From self-assessment filing and allowable expenses to Section 24 planning and joint ownership structures, our specialist property accountants help UK landlords keep more of their rental income. Get in touch for expert, personalised advice.",
        submitLabel: "Request tax consultation",
      }}
    />
  );
}
