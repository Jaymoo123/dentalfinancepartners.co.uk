import type { Metadata } from "next";
import { BlogCategoryHub } from "@accounting-network/web-shared/design/blog/BlogCategoryHub";
import { getAllPosts, getAllCategories, calculateReadTime, slugifyCategory } from "@/lib/blog";
import { siteConfig } from "@/config/site";
import { LeadForm } from "@/components/forms/LeadForm";
import { SolicitorsBackdrop } from "@/components/layout/SolicitorsBackdrop";
import { LEAD_PROOF_POINTS } from "@/lib/blog-category-copy";

export const metadata: Metadata = {
  title: "Complete VAT Guide for UK Law Firms | Accounts for Lawyers",
  description:
    "Comprehensive guide to VAT compliance for UK solicitors. Registration, rates, disbursements, counsel fees, and compliance requirements for legal services.",
  alternates: { canonical: `${siteConfig.url}/blog/vat-compliance` },
  openGraph: {
    title: "Complete VAT Guide for UK Law Firms",
    description:
      "Comprehensive guide to VAT compliance for UK solicitors. Registration, rates, disbursements, counsel fees, and compliance requirements.",
    url: `${siteConfig.url}/blog/vat-compliance`,
    type: "website",
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: "Complete VAT Guide for UK Law Firms",
    description:
      "Comprehensive guide to VAT compliance for UK solicitors. Registration, rates, disbursements, counsel fees, and compliance requirements.",
  },
};

const CATEGORY_SLUG = "vat-compliance";
const SUBMIT_LABEL = "Request VAT Consultation";

export default function VATCompliancePillarPage() {
  // Slug equality, not the raw-label filter this page used to run: a
  // frontmatter label differing by an ampersand or a case dropped the post out
  // of its own hub silently.
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
      categoryName="VAT & Compliance"
      heading="Complete VAT Guide for UK Law Firms"
      categorySlug={CATEGORY_SLUG}
      collectionName={metadata.title as string}
      description={metadata.description as string}
      intro="Everything you need to know about VAT compliance for UK solicitors, including registration requirements, rates, disbursements, counsel fees, and compliance obligations for legal services."
      sections={[
        {
          heading: "VAT Registration for Law Firms",
          paragraphs: [
            "Law firms must register for VAT when taxable turnover exceeds £90,000 (2026/27 threshold). Registration can be voluntary below this threshold, which may benefit practices that incur significant VAT on expenses.",
            "Once registered, you charge VAT on legal services (typically 20% standard rate), reclaim VAT on business expenses, and submit regular VAT returns to HMRC. Registration timing affects cash flow and pricing, so plan carefully before crossing the threshold.",
          ],
        },
        {
          heading: "VAT on Legal Services",
          paragraphs: [
            "Most legal services are standard-rated for VAT (20%), but some services are exempt or zero-rated:",
          ],
          bullets: [
            "Standard-rated (20%): Most legal advice and services",
            "Exempt: Some financial services and insurance-related work",
            "Zero-rated: Certain international services under place of supply rules",
          ],
          trailingParagraphs: [
            "Understanding which rate applies to each service ensures correct VAT treatment and avoids costly errors or HMRC challenges.",
          ],
        },
        {
          heading: "Disbursements & VAT Treatment",
          paragraphs: [
            "Disbursements (payments made on behalf of clients) have special VAT treatment. True disbursements aren't subject to VAT if they meet specific conditions:",
          ],
          bullets: [
            "Made on behalf of the client (not for your own benefit)",
            "Client is responsible for payment",
            "Client authorises the payment",
            "Recorded separately in your accounts",
            "Recharged at exact cost without markup",
          ],
          trailingParagraphs: [
            "Common disbursements include court fees, Land Registry fees, search fees, and expert witness fees. Counsel fees have specific VAT treatment rules that differ from other disbursements.",
          ],
        },
        {
          heading: "Counsel Fees VAT Rules",
          paragraphs: [
            "Counsel fees involve complex VAT treatment. When you instruct counsel on behalf of a client, the VAT treatment depends on whether counsel invoices you or the client directly, and whether you're acting as principal or agent.",
            "Most firms treat counsel fees as disbursements, but HMRC has specific requirements about when this treatment is valid. Incorrect treatment can result in VAT assessments and penalties.",
          ],
        },
        {
          heading: "VAT Returns & Compliance",
          paragraphs: [
            "VAT-registered law firms must submit quarterly VAT returns (or monthly if you reclaim more than you charge). Making Tax Digital for VAT requires compatible software and digital record-keeping. Accurate VAT accounting requires proper systems, regular reconciliation, and understanding of legal sector specific rules.",
          ],
        },
      ]}
      cta={{
        heading: "Need VAT Compliance Support?",
        body: "Our specialist solicitor accountants help law firms navigate VAT requirements and ensure compliance. Get expert guidance on registration, disbursements, and VAT accounting.",
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
