import type { Metadata } from "next";
import { DentalCategoryHub } from "@/components/blog/DentalCategoryHub";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Complete Associate Dentist Tax Guide",
  description:
    "Comprehensive guide to associate dentist tax, self-assessment, expenses, National Insurance, and tax planning strategies for UK dental associates.",
  alternates: { canonical: `${siteConfig.url}/blog/associate-tax` },
  openGraph: {
    title: "Complete Associate Dentist Tax Guide",
    description:
      "Comprehensive guide to associate dentist tax, self-assessment, expenses, National Insurance, and tax planning strategies for UK dental associates.",
    url: `${siteConfig.url}/blog/associate-tax`,
    type: "website",
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: "Complete Associate Dentist Tax Guide",
    description:
      "Comprehensive guide to associate dentist tax, self-assessment, expenses, National Insurance, and tax planning strategies for UK dental associates.",
  },
};

/** Converged onto the shared hub; published copy moved, not rewritten. */
export default function AssociateTaxPillarPage() {
  return (
    <DentalCategoryHub
      categorySlug="associate-tax"
      categoryName="Associate Tax"
      heading="Complete Associate Dentist Tax Guide"
      collectionName={metadata.title as string}
      description={metadata.description as string}
      intro="Everything you need to know about associate dentist tax obligations, self-assessment, allowable expenses, National Insurance contributions, and tax planning strategies for UK dental associates."
      sections={[
        {
          heading: "Understanding Associate Tax Status",
          paragraphs: [
            "Associate dentists typically operate as self-employed professionals, which means you are responsible for managing your own tax affairs. This status brings both flexibility and responsibility. Unlike employed dentists, you must register for self-assessment, track your income and expenses, and submit annual tax returns.",
            "Your tax position depends on your working arrangements. Most associates work under self-employed contracts, but some arrangements may create employed status. Understanding your correct status is crucial for compliance and tax efficiency.",
          ],
        },
        {
          heading: "Self-Assessment and Tax Returns",
          paragraphs: [
            "As a self-employed associate dentist, you must complete an annual self-assessment tax return. This return reports your dental income, allowable expenses, and calculates your tax liability. Key requirements include:",
          ],
          bullets: [
            "Registering for self-assessment with HMRC",
            "Keeping accurate records of all income and expenses",
            "Submitting your tax return by 31 January each year",
            "Making tax payments on account (advance payments)",
            "Understanding payment dates and avoiding penalties",
          ],
        },
        {
          heading: "Allowable Expenses for Associates",
          paragraphs: [
            "Associate dentists can claim various business expenses to reduce their tax bill. Common allowable expenses include:",
          ],
          bullets: [
            "Professional indemnity insurance and defence organisation fees",
            "GDC registration and professional subscriptions",
            "Continuing professional development (CPD) courses",
            "Professional journals and publications",
            "Accountancy and professional fees",
            "Travel between practices (not home to work)",
            "Equipment and instruments purchased for your work",
          ],
        },
        {
          heading: "National Insurance Contributions",
          paragraphs: [
            // CORRECTED, not restyled. The published sentence read "you pay Class 2
            // and Class 4 ... Class 2 NICs are a fixed weekly amount", which has been
            // wrong since 6 April 2024 and is the exact thing house_positions §8
            // tells writers never to say ("do NOT tell associates to pay a weekly
            // Class 2 charge"). Figures: house_positions.md lines 374 and 384.
            "Self-employed associate dentists pay Class 4 National Insurance on their profits, which for 2026/27 is 6% between £12,570 and £50,270 and 2% above that. Class 2 has not been a separate weekly charge since 6 April 2024: where your profits reach the small profits threshold of £7,105 you are treated as having paid it, and below that you can pay voluntary Class 2 at £3.65 a week to keep your record intact.",
            "Your National Insurance record affects your entitlement to state pension and certain benefits. Ensuring you pay the correct contributions protects your future entitlements while avoiding overpayment.",
          ],
        },
        {
          heading: "Tax Planning for Associates",
          paragraphs: [
            "Effective tax planning helps associate dentists minimise their tax liability legally. Strategies include timing income and expenses, maximising pension contributions, considering incorporation when appropriate, and understanding the impact of multiple income sources. A specialist dental accountant can help you structure your affairs efficiently while maintaining full compliance.",
          ],
        },
      ]}
    />
  );
}
