import type { Metadata } from "next";
import { DentalCategoryHub } from "@/components/blog/DentalCategoryHub";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Complete Dental Practice Accounting Guide",
  description:
    "Comprehensive guide to dental practice accounting, including bookkeeping, financial reporting, NHS contract accounting, Making Tax Digital compliance, and accounting software for UK dental practices.",
  alternates: { canonical: `${siteConfig.url}/blog/practice-accounting` },
  openGraph: {
    title: "Complete Dental Practice Accounting Guide",
    description:
      "Comprehensive guide to dental practice accounting, including bookkeeping, financial reporting, NHS contract accounting, and Making Tax Digital compliance.",
    url: `${siteConfig.url}/blog/practice-accounting`,
    type: "website",
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: "Complete Dental Practice Accounting Guide",
    description:
      "Comprehensive guide to dental practice accounting, including bookkeeping, financial reporting, NHS contract accounting, and Making Tax Digital compliance.",
  },
};

/** Converged onto the shared hub; published copy moved, not rewritten. */
export default function PracticeAccountingPillarPage() {
  return (
    <DentalCategoryHub
      categorySlug="practice-accounting"
      categoryName="Practice Accounting"
      heading="Complete Dental Practice Accounting Guide"
      collectionName={metadata.title as string}
      description={metadata.description as string}
      intro="Everything you need to know about dental practice accounting, including bookkeeping, financial reporting, NHS contract accounting, Making Tax Digital compliance, and accounting software for UK dental practices."
      sections={[
        {
          heading: "Bookkeeping Fundamentals",
          paragraphs: [
            "Accurate bookkeeping forms the foundation of practice financial management. Dental practices must record all income from NHS, private, and plan patients, along with all practice expenses. Proper bookkeeping enables you to monitor profitability, manage cash flow, and meet tax obligations.",
            "Modern cloud accounting software designed for dental practices can automate much of the bookkeeping process. Integration with practice management systems reduces manual data entry and improves accuracy.",
          ],
        },
        {
          heading: "NHS Contract Accounting",
          paragraphs: [
            "NHS contract accounting requires specific knowledge of UDA tracking, contract value recognition, and clawback provisions. Key considerations include:",
          ],
          bullets: [
            "Monthly UDA performance monitoring against contract",
            "Income recognition timing (delivered vs contracted)",
            "Clawback risk assessment and provisioning",
            "Contract variations and mid-year adjustments",
            "Multiple contract management and reporting",
          ],
        },
        {
          heading: "Financial Reporting and Analysis",
          paragraphs: [
            "Regular financial reporting helps practice owners make informed decisions. Monthly management accounts should show income by source, expense categories, profitability, and cash position. Understanding your key performance indicators enables proactive management.",
            "Year-end accounts must comply with accounting standards and tax requirements. Specialist dental accountants can provide both compliance and advisory support, helping you understand what your numbers mean for your practice.",
          ],
        },
        {
          heading: "Making Tax Digital Compliance",
          paragraphs: [
            "Making Tax Digital (MTD) requires dental practices to keep digital records and submit VAT returns through compatible software. Practices above the VAT threshold must comply with MTD for VAT, and MTD for Income Tax affects self-employed dentists and partnerships.",
            "Choosing MTD-compatible accounting software and establishing digital record-keeping processes ensures compliance while improving efficiency. Your accountant can help implement MTD requirements smoothly.",
          ],
        },
        {
          heading: "Accounting Software Selection",
          paragraphs: [
            "Selecting the right accounting software for your dental practice depends on your size, structure, and requirements. Cloud-based solutions offer accessibility and automatic backups. Integration with practice management systems eliminates duplicate data entry. A specialist dental accountant can recommend software suited to your practice and provide training and ongoing support.",
          ],
        },
      ]}
    />
  );
}
