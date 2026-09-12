import type { Metadata } from "next";
import { BlogCategoryHub } from "@accounting-network/web-shared/design/blog/BlogCategoryHub";
import { getAllPosts, getAllCategories, calculateReadTime, slugifyCategory } from "@/lib/blog";
import { siteConfig } from "@/config/site";
import { LeadForm } from "@/components/forms/LeadForm";
import { SolicitorsBackdrop } from "@/components/layout/SolicitorsBackdrop";
import { LEAD_PROOF_POINTS } from "@/lib/blog-category-copy";

export const metadata: Metadata = {
  title: "Complete Sole Practitioner Tax Guide for UK Solicitors | Accounts for Lawyers",
  description:
    "Comprehensive guide to sole practitioner tax, self-assessment, Making Tax Digital, allowable expenses, and tax planning for UK solicitors.",
  alternates: { canonical: `${siteConfig.url}/blog/sole-practitioner-tax` },
  openGraph: {
    title: "Complete Sole Practitioner Tax Guide for UK Solicitors",
    description:
      "Comprehensive guide to sole practitioner tax, self-assessment, Making Tax Digital, allowable expenses, and tax planning for UK solicitors.",
    url: `${siteConfig.url}/blog/sole-practitioner-tax`,
    type: "website",
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: "Complete Sole Practitioner Tax Guide for UK Solicitors",
    description:
      "Comprehensive guide to sole practitioner tax, self-assessment, Making Tax Digital, allowable expenses, and tax planning for UK solicitors.",
  },
};

const CATEGORY_SLUG = "sole-practitioner-tax";
const SUBMIT_LABEL = "Request Tax Planning Consultation";

export default function SolePractitionerTaxPillarPage() {
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

  // Page-level BreadcrumbList, restored verbatim from the pre-port page so this
  // route emits exactly the structured data it emitted before. The kit's
  // <Breadcrumb> emits a second one; that duplication is the published state and
  // the ten derived hubs still carry it, so it stays.
  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${siteConfig.url}/blog` },
          { "@type": "ListItem", position: 3, name: "Sole Practitioner Tax" },
        ],
      },
    ],
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

    <BlogCategoryHub
      categoryName="Sole Practitioner Tax"
      heading="Complete Sole Practitioner Tax Guide for UK Solicitors"
      categorySlug={CATEGORY_SLUG}
      collectionName={metadata.title as string}
      description={metadata.description as string}
      intro="Everything you need to know about sole practitioner tax, self-assessment, Making Tax Digital compliance, allowable expenses, and tax planning for UK solicitors."
      sections={[
        {
          heading: "Understanding Sole Practitioner Taxation",
          paragraphs: [
            "Sole practitioner solicitors operate as self-employed individuals, paying Income Tax and National Insurance on their practice profits. Unlike partnerships or companies, you're personally responsible for all tax obligations and benefit directly from all profits after tax.",
            "Your tax position depends on practice profits, allowable expenses, pension contributions, and other income sources. Effective tax planning can significantly reduce your tax burden while maintaining full compliance with HMRC requirements.",
          ],
        },
        {
          heading: "Self-Assessment Requirements",
          paragraphs: [
            "Sole practitioners must complete annual self-assessment tax returns (SA100) showing practice income, allowable expenses, and tax calculations. Key requirements include:",
          ],
          bullets: [
            "Maintaining accurate records of all income and expenses",
            "Filing returns by 31 January following the tax year end",
            "Making payments on account for the following year",
            "Understanding basis period rules and overlap relief",
            "Claiming all available tax reliefs and allowances",
          ],
        },
        {
          heading: "Making Tax Digital Compliance",
          paragraphs: [
            "From April 2026, sole practitioners with income over £50,000 must use Making Tax Digital compatible software and submit quarterly updates to HMRC. This represents a significant change to how you manage practice finances and report tax information.",
            "MTD compliance requires digital record-keeping, compatible accounting software, and quarterly submissions showing income and expenses. Early preparation ensures smooth transition and avoids penalties for non-compliance.",
          ],
        },
        {
          heading: "Allowable Expenses & Tax Deductions",
          paragraphs: [
            "Sole practitioners can claim tax relief on business expenses incurred wholly and exclusively for practice purposes. Common allowable expenses include:",
          ],
          bullets: [
            "Professional indemnity insurance and regulatory fees",
            "Office rent, utilities, and equipment",
            "Professional subscriptions and continuing education",
            "Marketing, website, and practice development costs",
            "Accountancy and legal fees",
            "Proportion of home office costs (if working from home)",
          ],
        },
        {
          heading: "Tax Planning Strategies",
          paragraphs: ["Effective tax planning for sole practitioners involves:"],
          bullets: [
            "Maximising pension contributions for tax relief",
            "Timing income and expenses to optimise tax position",
            "Claiming all available capital allowances",
            "Using spouse or civil partner for tax-efficient income splitting",
            "Considering incorporation when appropriate",
          ],
        },
      ]}
      cta={{
        heading: "Need Sole Practitioner Tax Advice?",
        body: "The specialist solicitor accountants we match you with help sole practitioners optimise their tax position while ensuring compliance with HMRC and SRA requirements. Get expert guidance tailored to your practice.",
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
    </>
  );
}
