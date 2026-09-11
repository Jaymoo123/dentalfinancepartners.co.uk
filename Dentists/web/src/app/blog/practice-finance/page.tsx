import type { Metadata } from "next";
import { DentalCategoryHub } from "@/components/blog/DentalCategoryHub";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Complete Dental Practice Finance Guide",
  description:
    "Comprehensive guide to dental practice finance, including cash flow management, profitability analysis, practice loans, equipment finance, and financial planning for UK dental practices.",
  alternates: { canonical: `${siteConfig.url}/blog/practice-finance` },
  openGraph: {
    title: "Complete Dental Practice Finance Guide",
    description:
      "Comprehensive guide to dental practice finance, including cash flow management, profitability analysis, practice loans, and financial planning for UK practices.",
    url: `${siteConfig.url}/blog/practice-finance`,
    type: "website",
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: "Complete Dental Practice Finance Guide",
    description:
      "Comprehensive guide to dental practice finance, including cash flow management, profitability analysis, practice loans, and financial planning for UK practices.",
  },
};

/**
 * Converged onto the shared hub. The route, the h1, the standfirst and every
 * word of the five essay sections below are the published copy, moved and not
 * rewritten: this package restyles, it does not re-author. The page-level
 * BreadcrumbList @graph is gone because the hub's own Breadcrumb emits one, and
 * carrying both made this page emit BreadcrumbList twice.
 */
export default function PracticeFinancePillarPage() {
  return (
    <DentalCategoryHub
      categorySlug="practice-finance"
      categoryName="Practice Finance"
      heading="Complete Dental Practice Finance Guide"
      collectionName={metadata.title as string}
      description={metadata.description as string}
      intro="Everything you need to know about dental practice finance, including cash flow management, profitability analysis, practice loans, equipment finance, and financial planning for UK dental practices."
      sections={[
        {
          heading: "Cash Flow Management",
          paragraphs: [
            "Effective cash flow management ensures your practice can meet its obligations while investing in growth. Dental practices face unique cash flow challenges from NHS payment timing, private patient payment terms, and laboratory costs. Understanding your cash cycle helps you plan for lean periods and capitalise on opportunities.",
            "Regular cash flow forecasting identifies potential shortfalls before they become problems. Your accountant can help you implement systems to monitor cash flow and make informed decisions about expenditure timing.",
          ],
        },
        {
          heading: "Profitability Analysis",
          paragraphs: [
            "Understanding practice profitability requires looking beyond the bottom line. Key metrics for dental practices include:",
          ],
          bullets: [
            "Gross profit margin by income stream (NHS, private, plans)",
            "Associate performance and contribution margins",
            "Treatment profitability analysis",
            "Overhead ratio and expense control",
            "Principal take-home after all costs",
          ],
        },
        {
          heading: "Practice Loans and Financing",
          paragraphs: [
            "Dental practices often require financing for acquisitions, expansions, refurbishments, or equipment purchases. Specialist dental practice loans offer competitive rates and terms designed for the profession. Lenders assess practice performance, contract security, and personal guarantees.",
            "Your accountant can help prepare financial information for lenders and model the impact of borrowing on practice cash flow. Proper financial planning ensures borrowing supports growth without creating unmanageable debt.",
          ],
        },
        {
          heading: "Equipment Finance Options",
          paragraphs: [
            "Dental equipment represents significant investment. Finance options include outright purchase, hire purchase, leasing, and rental agreements. Each option has different tax implications and cash flow impacts.",
            "Leasing can preserve cash for working capital, while purchase enables capital allowances claims. Your accountant can model different scenarios to identify the most tax-efficient approach for your circumstances.",
          ],
        },
        {
          heading: "Financial Planning and Strategy",
          paragraphs: [
            "Strategic financial planning helps practice owners achieve their personal and professional goals. This includes retirement planning, practice exit strategies, expansion funding, and wealth accumulation. A specialist dental accountant provides both technical expertise and strategic guidance, helping you build a financially successful practice that supports your lifestyle objectives.",
          ],
        },
      ]}
    />
  );
}
