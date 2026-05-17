import { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, getCategorySlug, calculateReadTime } from "@/lib/blog";
import { LeadForm } from "@/components/forms/LeadForm";
import { BlogPostCard } from "@/components/blog/BlogPostCard";
import { siteConfig } from "@/config/site";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { JsonLd, buildCollectionPage } from "@/lib/schema";

const categoryName = "Salary, Dividends & Profit";
const categorySlug = "salary-and-dividends";

export const metadata: Metadata = {
  title: `Salary and Dividends for Agency Founders | ${siteConfig.name}`,
  description: `How to pay yourself as an agency founder. Optimal salary and dividend splits, dividend tax rates, pension contributions and income extraction strategies for limited company agency directors.`,
  alternates: { canonical: `${siteConfig.url}/blog/${categorySlug}` },
  openGraph: {
    title: `Salary and Dividends for Agency Founders`,
    description: `How to pay yourself as an agency founder. Salary and dividend splits, dividend tax rates and income strategies for agency directors.`,
    url: `${siteConfig.url}/blog/${categorySlug}`,
    siteName: siteConfig.name,
    type: "website",
  },
};

export default function SalaryAndDividendsPage() {
  const allPosts = getAllPosts();
  const categoryPosts = allPosts.filter((post) => getCategorySlug(post) === categorySlug);

  const collection = buildCollectionPage({
    name: `Salary and Dividends for Agency Founders`,
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
            How to pay yourself as a limited company agency founder, optimising the salary and dividend split, understanding dividend tax, pension contributions and long-term income strategy.
          </p>
        </header>

        <div className="mt-8 space-y-6 max-w-4xl">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">The Salary and Dividend Strategy</h2>
            <p className="text-base leading-relaxed text-slate-600">
              Most limited company agency founders take a salary up to the National Insurance primary threshold (£12,570 in 2025/26) to avoid both employee and employer NIC, while still qualifying for state pension entitlements. Remaining income is taken as dividends, which attract lower tax rates than salary: 8.75% (basic rate), 33.75% (higher rate) and 39.35% (additional rate) for the 2025/26 tax year.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Dividend Tax Allowance and Planning</h2>
            <p className="text-base leading-relaxed text-slate-600">
              The dividend allowance fell to £500 in 2024/25, down from £2,000 just two years earlier. This means most agency founders with significant dividend income will pay tax from the first £500 onwards. The combination of salary and dividend still typically results in a lower total tax burden than taking all income as salary, but the advantage has narrowed. Annual modelling is essential to find the optimal split for your personal situation.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Using Pension Contributions to Reduce Tax</h2>
            <p className="text-base leading-relaxed text-slate-600">
              Employer pension contributions from your limited company are one of the most tax-efficient ways to extract profit from your agency. Company contributions reduce corporation tax, avoid NIC entirely, and do not count as personal income. For higher-rate taxpayers, this can be significantly more efficient than dividends. The annual allowance is £60,000 (2025/26) across all pension contributions, including any personal contributions.
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
          <h2 className="text-2xl font-bold text-indigo-900 sm:text-3xl">Want us to model your salary and dividend split?</h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            We run the numbers for every client and show you the most tax-efficient way to pay yourself based on your specific situation.
          </p>
          <div className="mt-8">
            <LeadForm redirectOnSuccess={false} submitLabel="Book a free call" />
          </div>
        </div>
      </div>
    </>
  );
}
