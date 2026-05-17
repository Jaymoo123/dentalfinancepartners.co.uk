import { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, getCategorySlug, calculateReadTime } from "@/lib/blog";
import { LeadForm } from "@/components/forms/LeadForm";
import { BlogPostCard } from "@/components/blog/BlogPostCard";
import { siteConfig } from "@/config/site";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteContainerLg } from "@/components/ui/layout-utils";

const categoryName = "Agency Accountant Services";
const categorySlug = "agency-accountant-services";

export const metadata: Metadata = {
  title: `Specialist Agency Accountant Services | ${siteConfig.name}`,
  description: `What a specialist agency accountant does and why it matters. Management accounts, R&D tax credits, cash flow forecasting and financial advisory services built for agency founders.`,
  alternates: { canonical: `${siteConfig.url}/blog/${categorySlug}` },
  openGraph: {
    title: `Specialist Agency Accountant Services`,
    description: `What specialist agency accountants do: management accounts, R&D tax credits, cash flow forecasting and more.`,
    url: `${siteConfig.url}/blog/${categorySlug}`,
    siteName: siteConfig.name,
    type: "website",
  },
};

export default function AgencyAccountantServicesPage() {
  const allPosts = getAllPosts();
  const categoryPosts = allPosts.filter((post) => getCategorySlug(post) === categorySlug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${siteConfig.url}/blog` },
          { "@type": "ListItem", position: 3, name: categoryName },
        ],
      },
      {
        "@type": "CollectionPage",
        name: `Specialist Agency Accountant Services`,
        description: metadata.description as string,
        url: `${siteConfig.url}/blog/${categorySlug}`,
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
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
            What a specialist agency accountant actually does, and why a general practice firm that handles everything from corner shops to care homes will not give you the same result. Agencies have specific financial rhythms, margin structures and tax opportunities that require specialist knowledge to navigate properly.
          </p>
        </header>

        <div className="mt-8 space-y-6 max-w-4xl">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Management Accounts Built for Agencies</h2>
            <p className="text-base leading-relaxed text-slate-600">
              Statutory accounts tell you what happened last year. Management accounts tell you what is happening now and where you are heading. For agencies, meaningful management accounts go beyond a basic P&L: they track gross margin by client or service line, utilisation rates, revenue per head, and pipeline conversion. Monthly management accounts, prepared to a consistent format, give you the visibility to make pricing, hiring and growth decisions with confidence rather than instinct.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">R&D Tax Credits for Creative and Digital Agencies</h2>
            <p className="text-base leading-relaxed text-slate-600">
              Many agency founders are surprised to learn their work qualifies for R&D tax credits. HMRC's definition of R&D is broader than most people assume: if your team is developing new software, tools, processes, or technology that advances the field beyond what is publicly available, that may qualify. Creative technology agencies, digital product studios and agencies building proprietary software or AI-driven workflows are common claimants. The merged R&D scheme (from April 2024) offers a 20% above-the-line credit, which reduces your tax bill directly. Claims must be substantiated with technical documentation, not just a financial summary.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Why Sector Specialism Matters in an Accountant</h2>
            <p className="text-base leading-relaxed text-slate-600">
              A generalist accountant will file your accounts and returns on time. A specialist agency accountant understands that your utilisation rate affects your gross margin, that your retainer mix affects your valuation multiple, that your contractor cost structure affects your IR35 exposure, and that your exit timeline should be shaping your structure today. The difference in advice quality and tax saved is significant. When choosing an accountant, ask specifically how many agency clients they work with, what typical margins look like across their client base, and whether they can model your salary and dividend split before the year ends.
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
          <h2 className="text-2xl font-bold text-indigo-900 sm:text-3xl">Looking for a specialist agency accountant?</h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            Book a free call. We work exclusively with agency founders and we will show you exactly how we are different from a generalist firm, with real examples.
          </p>
          <div className="mt-8">
            <LeadForm redirectOnSuccess={false} submitLabel="Book a free call" />
          </div>
        </div>
      </div>
    </>
  );
}
