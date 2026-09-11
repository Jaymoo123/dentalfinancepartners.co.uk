import type { Metadata } from "next";
import { BlogCategoryHub } from "@accounting-network/web-shared/design/blog/BlogCategoryHub";
import { getAllPosts, getAllCategories, calculateReadTime, slugifyCategory } from "@/lib/blog";
import { siteConfig } from "@/config/site";
import { LeadForm } from "@/components/forms/LeadForm";
import { SolicitorsBackdrop } from "@/components/layout/SolicitorsBackdrop";
import { LEAD_PROOF_POINTS } from "@/lib/blog-category-copy";

export const metadata: Metadata = {
  title: "Complete Practice Succession Guide for UK Law Firms | Accounts for Lawyers",
  description:
    "Comprehensive guide to law firm succession planning, practice valuation, sale preparation, and exit strategies for UK solicitors planning retirement or exit.",
  alternates: { canonical: `${siteConfig.url}/blog/practice-succession-sale` },
  openGraph: {
    title: "Complete Practice Succession Guide for UK Law Firms",
    description:
      "Comprehensive guide to law firm succession planning, practice valuation, sale preparation, and exit strategies for UK solicitors.",
    url: `${siteConfig.url}/blog/practice-succession-sale`,
    type: "website",
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: "Complete Practice Succession Guide for UK Law Firms",
    description:
      "Comprehensive guide to law firm succession planning, practice valuation, sale preparation, and exit strategies for UK solicitors.",
  },
};

const CATEGORY_SLUG = "practice-succession-sale";
const SUBMIT_LABEL = "Request Succession Planning Consultation";

export default function PracticeSuccessionPillarPage() {
  // Slug equality, not the raw-label filter this page used to run.
  const posts = getAllPosts()
    .filter((p) => slugifyCategory(p.category) === CATEGORY_SLUG)
    .map((p) => ({
      slug: p.slug,
      title: p.title,
      summary: p.summary,
      date: p.date,
      readTime: calculateReadTime(p.contentHtml),
    }));

  return (
    <BlogCategoryHub
      categoryName="Practice Succession & Sale"
      heading="Complete Practice Succession Guide for UK Law Firms"
      categorySlug={CATEGORY_SLUG}
      collectionName={metadata.title as string}
      description={metadata.description as string}
      intro="Everything you need to know about law firm succession planning, practice valuation, sale preparation, and exit strategies for UK solicitors planning retirement or practice exit."
      sections={[
        {
          heading: "Why Succession Planning Matters",
          paragraphs: [
            "Practice succession planning ensures continuity for clients, protects practice value, and provides financial security for retiring partners. Without proper planning, practices often sell for significantly less than their potential value, or fail to find buyers at all.",
            "Successful succession typically requires 3-5 years of planning. This allows time to develop junior partners, improve practice systems, optimise profitability, and identify suitable buyers or successors. Early planning maximises value and reduces stress during transition.",
          ],
        },
        {
          heading: "Practice Valuation Methods",
          paragraphs: [
            "Law firm valuation involves several approaches:",
          ],
          bullets: [
            "Multiple of recurring fees (typically 0.8-1.5x annual fees)",
            "Goodwill valuation based on client relationships and practice reputation",
            "Asset-based valuation for work in progress and physical assets",
            "Discounted cash flow analysis for larger practices",
            "Market comparison with recent similar practice sales",
          ],
          trailingParagraphs: [
            "Practice area, client retention rates, fee earner stability, and systems quality all affect valuation. Specialist legal sector accountants understand these factors and can provide realistic valuations.",
          ],
        },
        {
          heading: "Preparing Your Practice for Sale",
          paragraphs: [
            "Maximising practice value requires preparation across several areas:",
          ],
          bullets: [
            "Clean financial records and systems documentation",
            "Reducing key person dependency and developing junior fee earners",
            "Improving profitability and reducing lock-up",
            "Ensuring SRA compliance and clean regulatory record",
            "Documenting client relationships and matter management systems",
            "Addressing any outstanding issues or liabilities",
          ],
        },
        {
          heading: "Tax-Efficient Exit Strategies",
          paragraphs: [
            "Practice sale proceeds may qualify for Business Asset Disposal Relief (formerly Entrepreneurs' Relief), reducing Capital Gains Tax to 18% (from 6 April 2026) on qualifying gains up to the £1 million lifetime limit. Structuring the sale correctly ensures maximum tax efficiency.",
            "Consider phased retirement, earn-out arrangements, and pension contributions as part of your exit strategy. Each approach has different tax implications and risk profiles. Specialist advice ensures you choose the optimal structure for your circumstances.",
          ],
        },
        {
          heading: "Internal Succession Options",
          paragraphs: [
            "Internal succession to junior partners or employees often provides better outcomes than external sale. It maintains client relationships, preserves practice culture, and can be structured flexibly over several years. However, it requires developing successors with both technical capability and commercial acumen, plus financing arrangements for the purchase.",
          ],
        },
      ]}
      cta={{
        heading: "Planning Your Practice Exit?",
        body: "Our specialist solicitor accountants help law firm owners plan tax-efficient exits and maximise practice value. Get expert guidance on succession planning, valuation, and sale preparation.",
        submitLabel: SUBMIT_LABEL,
      }}
      posts={posts}
      categories={getAllCategories()}
      siteUrl={siteConfig.url}
      proofPoints={LEAD_PROOF_POINTS}
      libraryNote={`${posts.length} ${posts.length === 1 ? "guide" : "guides"} for UK solicitors and law firms.`}
      form={<LeadForm redirectOnSuccess={false} submitLabel={SUBMIT_LABEL} />}
      heroBackdrop={<SolicitorsBackdrop tone="cream" />}
      ctaBackdrop={<SolicitorsBackdrop tone="navy" />}
    />
  );
}
