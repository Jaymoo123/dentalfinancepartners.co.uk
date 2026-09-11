import type { Metadata } from "next";
import { BlogCategoryHub } from "@accounting-network/web-shared/design/blog/BlogCategoryHub";
import { getAllPosts, getAllCategories, calculateReadTime, slugifyCategory } from "@/lib/blog";
import { siteConfig } from "@/config/site";
import { LeadForm } from "@/components/forms/LeadForm";
import { SolicitorsBackdrop } from "@/components/layout/SolicitorsBackdrop";
import { LEAD_PROOF_POINTS } from "@/lib/blog-category-copy";

export const metadata: Metadata = {
  title: "Complete SRA Compliance Guide for UK Law Firms | Accounts for Lawyers",
  description:
    "Comprehensive guide to SRA Accounts Rules compliance, client money handling, trust accounting, and annual accountant reports for UK solicitors and law firms.",
  alternates: { canonical: `${siteConfig.url}/blog/sra-compliance-trust-accounting` },
  openGraph: {
    title: "Complete SRA Compliance Guide for UK Law Firms",
    description:
      "Comprehensive guide to SRA Accounts Rules compliance, client money handling, trust accounting, and annual accountant reports for UK solicitors.",
    url: `${siteConfig.url}/blog/sra-compliance-trust-accounting`,
    type: "website",
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: "Complete SRA Compliance Guide for UK Law Firms",
    description:
      "Comprehensive guide to SRA Accounts Rules compliance, client money handling, trust accounting, and annual accountant reports for UK solicitors.",
  },
};

const CATEGORY_SLUG = "sra-compliance-trust-accounting";
const SUBMIT_LABEL = "Request SRA Compliance Consultation";

export default function SRACompliancePillarPage() {
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
      categoryName="SRA Compliance & Trust Accounting"
      heading="Complete SRA Compliance Guide for UK Law Firms"
      categorySlug={CATEGORY_SLUG}
      collectionName={metadata.title as string}
      description={metadata.description as string}
      intro="Everything you need to know about SRA Accounts Rules compliance, client money handling, trust accounting, and annual accountant reports for UK solicitors and law firms."
      sections={[
        {
          heading: "Understanding SRA Accounts Rules",
          paragraphs: [
            "The SRA Accounts Rules govern how solicitors handle client money and maintain financial records. These rules exist to protect client funds and maintain public confidence in the legal profession. Every law firm holding client money must comply, regardless of size.",
            "The rules cover client account operation, record-keeping requirements, reconciliation procedures, and the annual accountant's report. Understanding these requirements is essential for every COFA (Compliance Officer for Finance and Administration) and practice manager.",
          ],
        },
        {
          heading: "Client Money Handling",
          paragraphs: [
            "Client money must be kept separate from practice funds at all times. This separation protects client funds and ensures compliance with SRA requirements. Proper client money handling involves:",
          ],
          bullets: [
            "Maintaining separate client and office bank accounts",
            "Recording all client money transactions promptly and accurately",
            "Performing regular reconciliations (at least monthly)",
            "Ensuring client accounts never go overdrawn",
            "Transferring money between accounts only when authorised",
          ],
        },
        {
          heading: "Trust Accounting Requirements",
          paragraphs: [
            "Trust accounting for solicitors involves maintaining detailed records of all client money movements. Your accounting system must provide a complete audit trail showing:",
          ],
          bullets: [
            "Individual client ledgers showing all transactions",
            "Matter-specific records for each case or transaction",
            "Bank account records reconciled to ledger balances",
            "Regular statements to clients holding money",
          ],
        },
        {
          heading: "Annual Accountant's Report",
          paragraphs: [
            "Law firms holding client money must obtain an annual accountant's report from a qualified accountant. This report confirms that your systems and records comply with SRA Accounts Rules. The accountant examines:",
          ],
          bullets: [
            "Client account procedures and controls",
            "Record-keeping systems and accuracy",
            "Reconciliation procedures and frequency",
            "Compliance with specific SRA requirements",
          ],
        },
        {
          heading: "COFA Responsibilities",
          paragraphs: [
            "The Compliance Officer for Finance and Administration (COFA) holds personal responsibility for ensuring the firm complies with SRA Accounts Rules. This role requires understanding both the technical requirements and the systems needed to maintain ongoing compliance. A specialist solicitor accountant can provide essential support to COFAs in meeting these obligations.",
          ],
        },
      ]}
      cta={{
        heading: "Need SRA Compliance Support?",
        body: "Our specialist solicitor accountants help law firms maintain SRA compliance while optimising their financial performance. Get expert guidance tailored to your practice.",
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
