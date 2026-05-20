import { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, getCategorySlug, calculateReadTime } from "@/lib/blog";
import { LeadForm } from "@/components/forms/LeadForm";
import { BlogPostCard } from "@/components/blog/BlogPostCard";
import { siteConfig } from "@/config/site";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { JsonLd, buildCollectionPage } from "@/lib/schema";

const categoryName = "Tax & Compliance";
const categorySlug = "tax-and-compliance";

export const metadata: Metadata = {
  title: `Tax & Compliance for Agency Founders | ${siteConfig.name}`,
  description: `Corporation tax, VAT, PAYE and HMRC deadlines explained for agency founders. Practical compliance guidance from specialist agency accountants.`,
  alternates: { canonical: `${siteConfig.url}/blog/${categorySlug}` },
  openGraph: {
    title: `Tax & Compliance for Agency Founders`,
    description: `Corporation tax, VAT, PAYE and HMRC deadlines explained for agency founders.`,
    url: `${siteConfig.url}/blog/${categorySlug}`,
    siteName: siteConfig.name,
    type: "website",
  },
};

export default function TaxAndCompliancePage() {
  const allPosts = getAllPosts();
  const categoryPosts = allPosts.filter((post) => getCategorySlug(post) === categorySlug);

  const collection = buildCollectionPage({
    name: `Tax & Compliance for Agency Founders`,
    description: metadata.description as string,
    path: `/blog/${categorySlug}`,
  });

  return (
    <>
      <JsonLd data={collection} />
      <div className={`${siteContainerLg} py-12`}>
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: categoryName },
          ]}
        />

        <header className="mt-6 mb-10 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">{categoryName}</h1>
          <p className="text-xl text-slate-600">
            Corporation tax, VAT, PAYE and HMRC deadlines, explained plainly for agency founders. Staying compliant is the baseline; paying the right amount of tax is the goal.
          </p>
        </header>

        <div className="mt-8 space-y-6 max-w-4xl">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Corporation Tax for Agency Limited Companies</h2>
            <p className="text-base leading-relaxed text-slate-600">
              Agency limited companies pay corporation tax on taxable profits. The main rate is 25% for profits above £250,000. Companies with profits below £50,000 pay the small profits rate of 19%. There is marginal relief between £50,000 and £250,000. Corporation tax is due nine months and one day after your accounting period ends, so if your year end is 31 March, payment is due by 1 January.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">VAT for Agencies: Registration and Schemes</h2>
            <p className="text-base leading-relaxed text-slate-600">
              You must register for VAT when your taxable turnover exceeds £90,000 in a rolling 12-month period (2024/25 threshold). Many agencies register voluntarily before this point to reclaim VAT on costs. The Flat Rate Scheme can simplify administration and sometimes reduce the overall VAT bill for agencies. The rate for marketing and advertising services is 11%, but eligibility criteria apply and the benefit varies by agency type and cost structure.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">HMRC Deadlines Every Agency Director Should Know</h2>
            <p className="text-base leading-relaxed text-slate-600">
              Missing HMRC deadlines triggers automatic penalties. Key dates for limited company agency founders include: company accounts filing (9 months after year end), corporation tax return (12 months after year end), corporation tax payment (9 months and 1 day after year end), VAT returns (quarterly, 1 month and 7 days after period end), PAYE and NIC payments (19th of each month), and personal self assessment (31 January). We track all of these for our clients.
            </p>
          </section>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
          {categoryPosts.map((post) => (
            <BlogPostCard
              key={post.slug}
              post={post}
              categorySlug={categorySlug}
              readTime={calculateReadTime(post.contentHtml)}
            />
          ))}
        </div>

        {categoryPosts.length === 0 && <p className="text-slate-600 text-center py-12">Articles coming soon.</p>}

        <div className="mt-10">
          <Link href="/blog" className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium">
            ← Back to all articles
          </Link>
        </div>

        <div className="mt-12 border-2 border-indigo-600/20 bg-indigo-50 p-8 sm:p-10 max-w-4xl">
          <h2 className="text-2xl font-bold text-indigo-900 sm:text-3xl">Need help with your agency's tax?</h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            Book a free call. We will review your current tax position and identify any immediate risks or opportunities.
          </p>
          <div className="mt-8">
            <LeadForm redirectOnSuccess={false} submitLabel="Book a free call" />
          </div>
        </div>
      </div>
    </>
  );
}
