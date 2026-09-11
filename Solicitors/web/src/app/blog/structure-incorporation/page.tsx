import type { Metadata } from "next";
import { BlogCategoryHub } from "@accounting-network/web-shared/design/blog/BlogCategoryHub";
import { getAllPosts, getAllCategories, calculateReadTime, slugifyCategory } from "@/lib/blog";
import { siteConfig } from "@/config/site";
import { LeadForm } from "@/components/forms/LeadForm";
import { SolicitorsBackdrop } from "@/components/layout/SolicitorsBackdrop";
import { LEAD_PROOF_POINTS } from "@/lib/blog-category-copy";

export const metadata: Metadata = {
  title: "Law Firm Structure & Incorporation Guide | Accounts for Lawyers",
  description:
    "Expert guidance on law firm structures, LLP conversion, incorporation options, and partnership vs company tax planning for UK solicitors and legal practices.",
  alternates: { canonical: `${siteConfig.url}/blog/structure-incorporation` },
  openGraph: {
    title: "Law Firm Structure & Incorporation Guide",
    description:
      "Expert guidance on law firm structures, LLP conversion, incorporation options, and tax planning for UK solicitors.",
    url: `${siteConfig.url}/blog/structure-incorporation`,
    type: "website",
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: "Law Firm Structure & Incorporation Guide",
    description:
      "Expert guidance on law firm structures, LLP conversion, incorporation options, and tax planning for UK solicitors.",
  },
};

const CATEGORY_SLUG = "structure-incorporation";
const SUBMIT_LABEL = "Request Structuring Consultation";

export default function StructureIncorporationPillarPage() {
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
      categoryName="Structure & Incorporation"
      heading="Law Firm Structure & Incorporation Guide"
      categorySlug={CATEGORY_SLUG}
      collectionName={metadata.title as string}
      description={metadata.description as string}
      intro="Choosing the right business structure is one of the most important financial decisions for any law firm. Whether you're considering LLP conversion, incorporation, or restructuring your partnership, the tax and regulatory implications are significant."
      sections={[
        {
          heading: "Partnership vs LLP vs Limited Company",
          paragraphs: [
            "UK law firms typically operate as traditional partnerships, LLPs, or limited companies. Each structure carries different implications for tax efficiency, partner liability, profit extraction, and regulatory compliance. The best choice depends on your firm's size, growth plans, and partners' personal tax positions.",
            "Traditional partnerships offer simplicity but expose partners to unlimited liability. LLPs combine the tax transparency of partnerships with limited liability protection. Incorporation through a limited company opens up different profit extraction strategies but introduces corporation tax and dividend planning considerations.",
          ],
        },
        {
          heading: "LLP Conversion for Law Firms",
          paragraphs: [
            "Converting from a traditional partnership to an LLP is one of the most common structural changes for growing law firms. Key considerations include:",
          ],
          bullets: [
            "Capital gains tax implications on asset transfers",
            "Stamp duty land tax on property held by the partnership",
            "Updating SRA registration and client notifications",
            "Revising partnership agreements and profit-sharing arrangements",
            "Impact on existing contracts and professional indemnity insurance",
          ],
        },
        {
          heading: "Incorporation Planning",
          paragraphs: [
            "Some law firms benefit from incorporating as a limited company, particularly where corporation tax rates create planning opportunities. However, solicitors must navigate SRA rules on alternative business structures (ABS licensing) and consider the impact on client money handling obligations.",
            "Incorporation planning requires careful modelling of the tax position for both the company and individual directors/shareholders, factoring in salary, dividends, pension contributions, and employers' NI costs.",
          ],
        },
        {
          heading: "Tax Implications of Restructuring",
          paragraphs: [
            "Any change in legal structure triggers potential tax consequences. Capital gains on goodwill, basis period adjustments, and stamp duty obligations must all be modelled before proceeding. A specialist solicitor accountant can prepare detailed financial projections comparing your current structure with alternatives, ensuring the decision is based on solid numbers rather than assumptions.",
          ],
        },
      ]}
      cta={{
        heading: "Considering a Change in Structure?",
        body: "Our specialist solicitor accountants can model the tax implications of LLP conversion, incorporation, or any structural change for your practice. Get expert advice tailored to your firm.",
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
