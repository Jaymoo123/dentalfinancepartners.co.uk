import type { Metadata } from "next";
import { DentalCategoryHub } from "@/components/blog/DentalCategoryHub";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Complete Guide to Buying a Dental Practice",
  description:
    "Comprehensive guide to buying a dental practice, including valuations, due diligence, financing options, legal considerations, and post-acquisition integration for UK dentists.",
  alternates: { canonical: `${siteConfig.url}/blog/buying-a-practice` },
  openGraph: {
    title: "Complete Guide to Buying a Dental Practice",
    description:
      "Comprehensive guide to buying a dental practice, including valuations, due diligence, financing options, and legal considerations for UK dentists.",
    url: `${siteConfig.url}/blog/buying-a-practice`,
    type: "website",
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: "Complete Guide to Buying a Dental Practice",
    description:
      "Comprehensive guide to buying a dental practice, including valuations, due diligence, financing options, and legal considerations for UK dentists.",
  },
};

/** Converged onto the shared hub; published copy moved, not rewritten. */
export default function BuyingAPracticePillarPage() {
  return (
    <DentalCategoryHub
      categorySlug="buying-a-practice"
      categoryName="Buying a Practice"
      heading="Complete Guide to Buying a Dental Practice"
      collectionName={metadata.title as string}
      description={metadata.description as string}
      intro="Everything you need to know about buying a dental practice, including valuations, due diligence, financing options, legal considerations, and post-acquisition integration for UK dentists."
      sections={[
        {
          heading: "Practice Valuation Fundamentals",
          paragraphs: [
            "Understanding dental practice valuations is essential before making an offer. Practices are typically valued based on multiples of adjusted earnings, with NHS and private practices valued differently. Key factors affecting valuation include patient list quality, location, equipment condition, lease terms, and growth potential.",
            "Professional valuation helps ensure you pay a fair price and can secure appropriate financing. Independent valuations also provide reassurance to lenders and protect your investment.",
          ],
        },
        {
          heading: "Due Diligence Process",
          paragraphs: [
            "Thorough due diligence protects you from unexpected problems after purchase. Your due diligence should cover:",
          ],
          bullets: [
            "Financial records review (at least 3 years of accounts)",
            "NHS contract analysis and UDA performance",
            "Patient list verification and retention rates",
            "Equipment condition and replacement requirements",
            "Lease terms and property condition",
            "Staff contracts and employment obligations",
            "CQC compliance and regulatory status",
          ],
        },
        {
          heading: "Financing Your Purchase",
          paragraphs: [
            "Most dental practice purchases require financing. Options include specialist dental practice loans, commercial mortgages, and vendor finance arrangements. Lenders typically require 20-30% deposit and assess your ability to service the debt from practice earnings.",
            "Your accountant can help prepare financial projections for lenders and structure the purchase tax-efficiently. Consider both the acquisition structure and ongoing financing costs when evaluating affordability.",
          ],
        },
        {
          heading: "Legal and Structural Considerations",
          paragraphs: [
            "The legal structure of your purchase affects tax, liability, and future flexibility. You can buy as a sole practitioner, partnership, or through a limited company. Each structure has different tax implications and regulatory requirements.",
            "Asset purchases versus share purchases also have significant tax and legal differences. Your solicitor and accountant should work together to structure the transaction optimally.",
          ],
        },
        {
          heading: "Post-Acquisition Integration",
          paragraphs: [
            "Successfully integrating a newly purchased practice requires careful planning. Focus on maintaining patient relationships, retaining key staff, and implementing your vision gradually. Financial systems, banking arrangements, and accounting processes need updating. A specialist dental accountant can ensure smooth transition while maintaining compliance with NHS and CQC requirements.",
          ],
        },
      ]}
    />
  );
}
