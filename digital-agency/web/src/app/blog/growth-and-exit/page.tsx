import { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, getCategorySlug, calculateReadTime } from "@/lib/blog";
import { LeadForm } from "@/components/forms/LeadForm";
import { BlogPostCard } from "@/components/blog/BlogPostCard";
import { siteConfig } from "@/config/site";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { JsonLd, buildCollectionPage } from "@/lib/schema";

const categoryName = "Growing & Exiting Your Agency";
const categorySlug = "growth-and-exit";

export const metadata: Metadata = {
  title: `Growing and Exiting Your Agency | ${siteConfig.name}`,
  description: `How to scale an agency profitably, prepare for sale, and exit tax-efficiently. BADR, goodwill valuation, earn-outs and MBO structures explained for agency founders.`,
  alternates: { canonical: `${siteConfig.url}/blog/${categorySlug}` },
  openGraph: {
    title: `Growing and Exiting Your Agency`,
    description: `How to scale an agency profitably, prepare for sale, and exit tax-efficiently. BADR, goodwill valuation and earn-outs explained.`,
    url: `${siteConfig.url}/blog/${categorySlug}`,
    siteName: siteConfig.name,
    type: "website",
  },
};

export default function GrowthAndExitPage() {
  const allPosts = getAllPosts();
  const categoryPosts = allPosts.filter((post) => getCategorySlug(post) === categorySlug);

  const collection = buildCollectionPage({
    name: `Growing and Exiting Your Agency`,
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
            Whether you are scaling towards your first £1m revenue or thinking about what an exit looks like in five years, this is where we cover the financial decisions that shape how your agency grows and what you ultimately take out of it.
          </p>
        </header>

        <div className="mt-8 space-y-6 max-w-4xl">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Selling Your Agency: What Buyers Actually Pay For</h2>
            <p className="text-base leading-relaxed text-slate-600">
              Agency valuations are typically based on EBITDA multiples (earnings before interest, tax, depreciation and amortisation). Creative and marketing agencies typically trade at 4–7x EBITDA depending on recurring revenue, client concentration, team dependency on the founder, and growth trajectory. The single biggest value driver is recurring revenue: retainer-based agencies command significantly higher multiples than project-based ones. Preparing for sale is ideally a three-to-five year process, not a six-month one.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Business Asset Disposal Relief and the 18% CGT Rate</h2>
            <p className="text-base leading-relaxed text-slate-600">
              Business Asset Disposal Relief (BADR, formerly Entrepreneurs' Relief) reduces capital gains tax on qualifying business disposals to 18% from 6 April 2026 (it was 14% in 2025/26 and 10% before April 2025). The lifetime limit is £1 million. To qualify, you must have owned at least 5% of the ordinary share capital, been an officer or employee, and held the shares for at least two years before disposal. Planning your exit structure well in advance, including how shares are held and whether to use an EMI scheme for key employees, can significantly affect your post-exit tax position.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Earn-Outs, Goodwill and MBO Structures</h2>
            <p className="text-base leading-relaxed text-slate-600">
              Many agency acquisitions include an earn-out: deferred consideration paid over one to three years based on future performance. Earn-outs are taxed as income if linked to continued employment, or as capital gains if structured as a true purchase price adjustment. The difference in tax treatment is substantial. Management buyouts (MBOs) allow your senior team to acquire the business using a combination of equity, bank debt and seller financing. Each structure has different tax, legal and practical implications that must be planned carefully before heads of terms are signed.
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
          <h2 className="text-2xl font-bold text-indigo-900 sm:text-3xl">Planning to grow or exit your agency?</h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            Book a free call. We work with agency founders at every stage, from structuring for growth to exit planning and sale preparation.
          </p>
          <div className="mt-8">
            <LeadForm redirectOnSuccess={false} submitLabel="Book a free call" />
          </div>
        </div>
      </div>
    </>
  );
}
