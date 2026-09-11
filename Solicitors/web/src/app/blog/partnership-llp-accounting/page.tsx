import type { Metadata } from "next";
import { BlogCategoryHub } from "@accounting-network/web-shared/design/blog/BlogCategoryHub";
import { getAllPosts, getAllCategories, calculateReadTime, slugifyCategory } from "@/lib/blog";
import { siteConfig } from "@/config/site";
import { LeadForm } from "@/components/forms/LeadForm";
import { SolicitorsBackdrop } from "@/components/layout/SolicitorsBackdrop";
import { LEAD_PROOF_POINTS } from "@/lib/blog-category-copy";

export const metadata: Metadata = {
  title: "Complete Partnership & LLP Tax Guide for UK Law Firms | Accounts for Lawyers",
  description:
    "Comprehensive guide to partnership taxation, LLP conversion, profit allocation, and multi-partner firm accounting for UK solicitors and law firms.",
  alternates: { canonical: `${siteConfig.url}/blog/partnership-llp-accounting` },
  openGraph: {
    title: "Complete Partnership & LLP Tax Guide for UK Law Firms",
    description:
      "Comprehensive guide to partnership taxation, LLP conversion, profit allocation, and multi-partner firm accounting for UK solicitors.",
    url: `${siteConfig.url}/blog/partnership-llp-accounting`,
    type: "website",
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: "Complete Partnership & LLP Tax Guide for UK Law Firms",
    description:
      "Comprehensive guide to partnership taxation, LLP conversion, profit allocation, and multi-partner firm accounting for UK solicitors.",
  },
};

const CATEGORY_SLUG = "partnership-llp-accounting";
const SUBMIT_LABEL = "Request Partnership Tax Consultation";

export default function PartnershipTaxPillarPage() {
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
      categoryName="Partnership & LLP Accounting"
      heading="Complete Partnership & LLP Tax Guide for UK Law Firms"
      categorySlug={CATEGORY_SLUG}
      collectionName={metadata.title as string}
      description={metadata.description as string}
      intro="Everything you need to know about partnership taxation, LLP structures, profit allocation, and multi-partner firm accounting for UK solicitors and law firms."
      sections={[
        {
          heading: "Partnership vs LLP: Tax Differences",
          paragraphs: [
            "Traditional partnerships and Limited Liability Partnerships (LLPs) have different tax treatments and legal implications. While both are tax-transparent (partners pay tax individually rather than the entity paying corporation tax), LLPs offer limited liability protection similar to companies.",
            "The choice between partnership and LLP affects National Insurance treatment, profit extraction flexibility, and succession planning options. Many law firms convert to LLP status to protect partners from unlimited liability while maintaining partnership tax treatment.",
          ],
        },
        {
          heading: "LLP Conversion Considerations",
          paragraphs: [
            "Converting from traditional partnership to LLP involves several tax and legal considerations:",
          ],
          bullets: [
            "Capital Gains Tax implications on asset transfer",
            "Stamp Duty Land Tax on property transfers",
            "Changes to National Insurance treatment for members",
            "Impact on existing partnership agreements and profit sharing",
            "SRA notification requirements and regulatory compliance",
          ],
          trailingParagraphs: [
            "Recent changes to Employer National Insurance for LLP members (April 2026) make conversion timing particularly important. Specialist advice ensures you convert at the optimal time and structure the LLP correctly.",
          ],
        },
        {
          heading: "Profit Allocation & Distribution",
          paragraphs: [
            "Partnership profit allocation affects both tax efficiency and partner relationships. Key considerations include:",
          ],
          bullets: [
            "Fixed share vs performance-based allocation",
            "Salaried partners vs equity partners",
            "Tax implications of different profit share arrangements",
            "Timing of profit distributions and cash flow management",
            "Impact on individual partners' tax positions",
          ],
        },
        {
          heading: "Partnership Tax Returns & Compliance",
          paragraphs: [
            "Partnerships and LLPs must file annual partnership tax returns (SA800) showing total profits and each partner's share. Individual partners then report their share on personal tax returns (SA100). This dual reporting creates complexity, particularly when:",
          ],
          bullets: [
            "Partners join or leave during the tax year",
            "Profit shares change mid-year",
            "The partnership year end differs from the tax year",
            "Partners have other income sources or multiple partnerships",
          ],
        },
        {
          heading: "Partner Retirement Planning",
          paragraphs: [
            "Partner retirement involves complex tax planning around capital extraction, goodwill payments, and succession arrangements. Early planning ensures tax-efficient exit while maintaining practice continuity. Consider pension contributions, capital gains treatment, and the impact of retirement on remaining partners.",
          ],
        },
      ]}
      cta={{
        heading: "Need Partnership Tax Advice?",
        body: "Our specialist solicitor accountants help law firm partnerships and LLPs optimise their tax position while ensuring compliance. Get expert guidance on profit allocation, LLP conversion, and partner tax planning.",
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
