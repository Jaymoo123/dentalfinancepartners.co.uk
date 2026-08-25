import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { BlogCategoryHub } from "@/components/blog/BlogCategoryHub";

const categoryName = "Making Tax Digital (MTD)";
const categorySlug = "making-tax-digital-mtd";
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

export default function MakingTaxDigitalMTDPage() {
  return (
    <BlogCategoryHub
      categoryName={categoryName}
      categorySlug={categorySlug}
      collectionName={`${categoryName} for Property Investors`}
      description={description}
      intro="Stay compliant with Making Tax Digital requirements. Practical guidance on MTD for Income Tax, software integration, record-keeping obligations, and digital submission requirements for landlords."
      sections={[
        {
          heading: "MTD for landlords: what you need to know",
          paragraphs: [
            "Making Tax Digital for Income Tax Self Assessment (MTD for ITSA) requires landlords and self-employed individuals with qualifying income over £50,000 to maintain digital records and submit quarterly updates to HMRC. This replaces the single annual self-assessment tax return with ongoing digital reporting throughout the tax year.",
            "For property landlords, qualifying income means gross rental income before expenses. If your combined property and self-employment income exceeds the threshold, you must comply. The threshold drops to £30,000 from April 2027, bringing significantly more landlords into scope.",
          ],
        },
        {
          heading: "Compliance timeline and key deadlines",
          paragraphs: [
            "Landlords with qualifying income over £50,000 must comply from April 2026. Those with income between £30,000 and £50,000 join from April 2027. HMRC has indicated that the threshold may be lowered further in future, potentially capturing all landlords with property income above £20,000.",
            "Quarterly updates are due by the 7th of the month following the end of each quarter, so for a standard April-to-April tax year, deadlines fall on 7 August, 7 November, 7 February, and 7 May. A final end-of-period statement and crystallisation declaration replace the traditional self-assessment return.",
          ],
        },
        {
          heading: "Compatible software for property landlords",
          paragraphs: [
            "HMRC maintains a list of MTD-compatible software that can connect to their systems via API. Options range from full accounting packages like Xero, QuickBooks, and FreeAgent to dedicated landlord tools like Hammock and GoSimpleTax. Spreadsheets alone are not sufficient. You need bridging software or a native MTD application.",
            "When choosing software, consider whether it handles multiple properties, tracks expenses by property, supports the quarterly submission format, and integrates with your accountant's systems. Many landlords find that starting with MTD-ready software well before the mandatory date reduces stress and errors during the transition.",
          ],
        },
        {
          heading: "Quarterly reporting requirements",
          paragraphs: [
            "Each quarterly update must include a summary of rental income received and allowable expenses paid during that period. HMRC does not require individual transaction-level data in the quarterly submission, but you must maintain the underlying digital records in case of enquiry.",
            "Allowable expenses include mortgage interest (as a tax reducer for individuals), letting agent fees, insurance, repairs, council tax (if paid by the landlord), and professional fees. Keeping these categorised correctly throughout the year, rather than at year-end, is the key operational change MTD introduces.",
          ],
        },
        {
          heading: "Penalties and enforcement",
          paragraphs: [
            "HMRC's new points-based penalty regime applies to MTD submissions. Each late quarterly update earns a penalty point. Once you accumulate a threshold number of points (four for quarterly obligations), a £200 penalty is charged, and every subsequent late submission also triggers a £200 fine until the points are reset.",
            "Late payment penalties are separate: 2% of the tax owed at 15 days late, a further 2% at 30 days, and then 4% per annum on any balance outstanding after 30 days. Interest also accrues from the due date. These penalties make timely compliance significantly more important than under the old self-assessment regime.",
          ],
        },
      ]}
      cta={{
        heading: "Need MTD compliance help?",
        body: "Making Tax Digital represents the biggest change to tax reporting in a generation. Our specialist property accountants can help you choose the right software, set up compliant digital records, and ensure you meet every quarterly deadline.",
        submitLabel: "Request MTD consultation",
      }}
    />
  );
}
