import type { Metadata } from "next";
import { DentalCategoryHub } from "@/components/blog/DentalCategoryHub";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Complete VAT & Compliance Guide for Dental Practices",
  description:
    "Comprehensive guide to VAT registration, compliance, exemptions, and Making Tax Digital for UK dental practices. Understand when to register, what to charge, and how to comply.",
  alternates: { canonical: `${siteConfig.url}/blog/vat-and-compliance` },
  openGraph: {
    title: "Complete VAT & Compliance Guide for Dental Practices",
    description:
      "Comprehensive guide to VAT registration, compliance, exemptions, and Making Tax Digital for UK dental practices.",
    url: `${siteConfig.url}/blog/vat-and-compliance`,
    type: "website",
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: "Complete VAT & Compliance Guide for Dental Practices",
    description:
      "Comprehensive guide to VAT registration, compliance, exemptions, and Making Tax Digital for UK dental practices.",
  },
};

/** Converged onto the shared hub; published copy moved, not rewritten. */
export default function VatAndCompliancePillarPage() {
  return (
    <DentalCategoryHub
      categorySlug="vat-and-compliance"
      categoryName="VAT & Compliance"
      heading="Complete VAT & Compliance Guide for Dental Practices"
      collectionName={metadata.title as string}
      description={metadata.description as string}
      intro="Everything you need to know about VAT registration, compliance, exemptions, and Making Tax Digital for UK dental practices. Understand when to register, what to charge, and how to comply."
      sections={[
        {
          heading: "VAT Registration for Dental Practices",
          paragraphs: [
            "Dental practices must register for VAT when their taxable turnover exceeds the registration threshold (currently £90,000). Most dental treatment is VAT-exempt, but certain services and sales are taxable. Understanding what counts towards the threshold prevents late registration penalties.",
            "Voluntary VAT registration may benefit practices with significant taxable income or high input VAT costs. However, registration brings compliance obligations and administrative burden. Specialist advice helps you determine the right approach.",
          ],
        },
        {
          heading: "Exempt vs Taxable Dental Services",
          paragraphs: [
            "Understanding which dental services are VAT-exempt and which are taxable is crucial for compliance. Key principles include:",
          ],
          bullets: [
            "NHS dental treatment is always VAT-exempt",
            "Private dental treatment for oral health is VAT-exempt",
            "Cosmetic dentistry (teeth whitening, veneers) is usually taxable",
            "Dental product sales (toothbrushes, whitening kits) are taxable",
            "Orthodontics can be exempt or taxable depending on purpose",
          ],
        },
        {
          heading: "VAT Compliance Requirements",
          paragraphs: [
            "VAT-registered dental practices must maintain detailed records, submit quarterly VAT returns, and charge VAT correctly on taxable supplies. Compliance requirements include:",
          ],
          bullets: [
            "Issuing VAT invoices for taxable supplies",
            "Recording all income and expenses with VAT analysis",
            "Submitting VAT returns through MTD-compatible software",
            "Making VAT payments on time",
            "Maintaining VAT records for at least 6 years",
          ],
        },
        {
          heading: "Partial Exemption and Input VAT",
          paragraphs: [
            "Dental practices with both exempt and taxable income face partial exemption rules. These rules limit the input VAT you can recover on overhead costs. Calculating your recoverable input VAT requires careful analysis of your income mix and expense allocation.",
            "Partial exemption calculations can be complex, especially for multi-surgery practices with varying income streams. Specialist dental accountants ensure you claim the maximum allowable input VAT while maintaining compliance.",
          ],
        },
        {
          heading: "Making Tax Digital for VAT",
          paragraphs: [
            "Making Tax Digital (MTD) requires VAT-registered dental practices to keep digital records and submit returns through compatible software. Compliance involves choosing appropriate software, establishing digital record-keeping processes, and submitting returns electronically. A specialist dental accountant can help implement MTD requirements efficiently while ensuring your systems support both compliance and practice management needs.",
          ],
        },
      ]}
    />
  );
}
