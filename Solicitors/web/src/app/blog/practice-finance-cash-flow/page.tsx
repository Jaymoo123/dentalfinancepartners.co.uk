import type { Metadata } from "next";
import { BlogCategoryHub } from "@accounting-network/web-shared/design/blog/BlogCategoryHub";
import { getAllPosts, getAllCategories, calculateReadTime, slugifyCategory } from "@/lib/blog";
import { siteConfig } from "@/config/site";
import { LeadForm } from "@/components/forms/LeadForm";
import { SolicitorsBackdrop } from "@/components/layout/SolicitorsBackdrop";
import { LEAD_PROOF_POINTS } from "@/lib/blog-category-copy";

export const metadata: Metadata = {
  title: "Complete Practice Finance Guide for UK Law Firms | Accounts for Lawyers",
  description:
    "Comprehensive guide to law firm cash flow management, lock-up reduction, working capital, and practice finance options for UK solicitors.",
  alternates: { canonical: `${siteConfig.url}/blog/practice-finance-cash-flow` },
  openGraph: {
    title: "Complete Practice Finance Guide for UK Law Firms",
    description:
      "Comprehensive guide to law firm cash flow management, lock-up reduction, working capital, and practice finance options for UK solicitors.",
    url: `${siteConfig.url}/blog/practice-finance-cash-flow`,
    type: "website",
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: "Complete Practice Finance Guide for UK Law Firms",
    description:
      "Comprehensive guide to law firm cash flow management, lock-up reduction, working capital, and practice finance options for UK solicitors.",
  },
};

const CATEGORY_SLUG = "practice-finance-cash-flow";
const SUBMIT_LABEL = "Request Finance Consultation";

export default function PracticeFinancePillarPage() {
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
          { "@type": "ListItem", position: 3, name: "Practice Finance & Cash Flow" },
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
      categoryName="Practice Finance & Cash Flow"
      heading="Complete Practice Finance Guide for UK Law Firms"
      categorySlug={CATEGORY_SLUG}
      collectionName={metadata.title as string}
      description={metadata.description as string}
      intro="Everything you need to know about law firm cash flow management, lock-up reduction, working capital optimisation, and practice finance options for UK solicitors."
      sections={[
        {
          heading: "Understanding Law Firm Cash Flow",
          paragraphs: [
            "Law firm cash flow differs fundamentally from other businesses due to the time lag between work completion and payment. You incur costs (salaries, overheads, disbursements) immediately but may wait months for payment, creating significant working capital requirements.",
            "Effective cash flow management involves forecasting, monitoring work in progress, accelerating billing, and maintaining adequate reserves. Poor cash flow management causes practice failure more often than lack of profitability.",
          ],
        },
        {
          heading: "Reducing Lock-Up",
          paragraphs: [
            "Lock-up (the time between work completion and cash collection) directly impacts practice cash flow and profitability. Typical law firm lock-up includes:",
          ],
          bullets: [
            "Work in progress (unbilled time and disbursements)",
            "Billed but unpaid fees (debtors)",
            "Time taken to convert enquiries to instructions",
          ],
          trailingParagraphs: [
            "Reducing lock-up improves cash flow without increasing turnover. Strategies include regular billing, payment terms enforcement, interim billing on long matters, and efficient debt collection procedures.",
          ],
        },
        {
          heading: "Working Capital Management",
          paragraphs: [
            "Working capital (current assets minus current liabilities) determines your practice's ability to meet short-term obligations and fund growth. Law firms typically need working capital equivalent to 2-4 months' operating costs, depending on practice area and billing cycles.",
            "Improving working capital involves reducing lock-up, managing partner drawings, timing tax payments, and maintaining appropriate reserves. Strong working capital provides financial stability and enables practice development.",
          ],
        },
        {
          heading: "Practice Finance Options",
          paragraphs: [
            "Law firms can access various finance options to support cash flow and growth:",
          ],
          bullets: [
            "Invoice discounting against unbilled work in progress",
            "Debtor finance for outstanding fees",
            "Business loans for equipment or expansion",
            "Overdraft facilities for short-term cash flow",
            "Partner capital contributions or loans",
          ],
          trailingParagraphs: [
            "Each option has different costs, risks, and suitability depending on your practice circumstances. Specialist advice ensures you choose appropriate finance at competitive rates.",
          ],
        },
        {
          heading: "Cash Flow Forecasting",
          paragraphs: [
            "Regular cash flow forecasting (typically 12 weeks ahead) helps identify potential shortfalls and plan accordingly. Effective forecasting considers work in progress conversion, expected payments, known costs, and seasonal patterns. This forward visibility enables proactive management rather than reactive crisis response.",
          ],
        },
      ]}
      cta={{
        heading: "Need Practice Finance Advice?",
        body: "Our specialist solicitor accountants help law firms optimise cash flow, reduce lock-up, and secure appropriate finance. Get expert guidance on practice finance management.",
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
