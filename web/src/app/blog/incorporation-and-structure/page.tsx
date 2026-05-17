import { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, getCategorySlug, calculateReadTime } from "@/lib/blog";
import { LeadForm } from "@/components/forms/LeadForm";
import { BlogPostCard } from "@/components/blog/BlogPostCard";
import { siteConfig } from "@/config/site";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteContainerLg } from "@/components/ui/layout-utils";

const categoryName = "Incorporation & Business Structure";
const categorySlug = "incorporation-and-structure";

export const metadata: Metadata = {
  title: `Incorporation for Agency Founders | ${siteConfig.name}`,
  description: `Sole trader vs limited company, holding companies, alphabet shares and group structures for agency founders. Practical guidance on when and how to incorporate your agency.`,
  alternates: { canonical: `${siteConfig.url}/blog/${categorySlug}` },
  openGraph: {
    title: `Incorporation & Business Structure for Agency Founders`,
    description: `Sole trader vs limited company, holding companies and group structures for agency founders.`,
    url: `${siteConfig.url}/blog/${categorySlug}`,
    siteName: siteConfig.name,
    type: "website",
  },
};

export default function IncorporationAndStructurePage() {
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
        name: `Incorporation & Business Structure for Agency Founders`,
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
            Whether you are a freelancer considering going limited, an agency founder thinking about a holding company, or a multi-agency group considering restructuring, this is where we cover the structural decisions that shape how your business is taxed and owned.
          </p>
        </header>

        <div className="mt-8 space-y-6 max-w-4xl">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Sole Trader vs Limited Company for Agencies</h2>
            <p className="text-base leading-relaxed text-slate-600">
              Operating as a sole trader is simple but exposes your personal income to income tax at 20%, 40% or 45% depending on your earnings. A limited company pays corporation tax at 19% or 25% on profits, and you choose when and how much to extract as salary and dividends. Once your agency is generating consistent profit above your personal living costs, incorporation is typically worthwhile. The break-even point varies but is often around £30,000–40,000 of profit retained in the business annually.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Holding Companies and Group Structures</h2>
            <p className="text-base leading-relaxed text-slate-600">
              A holding company sits above your trading agency and receives dividends from it free of further corporation tax (under the substantial shareholding exemption in most cases). This allows profits to accumulate in the holding company for reinvestment or acquisition without personal tax leakage. Many growth-stage agency founders move to a holding company structure before making acquisitions or bringing in investors, as it protects retained cash from trading risks.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Alphabet Share Structures for Agency Founders</h2>
            <p className="text-base leading-relaxed text-slate-600">
              Alphabet share structures allow companies to issue multiple classes of shares (A shares, B shares, C shares etc.) with different rights over dividends. This enables flexible dividend allocation between shareholders, for example paying more to a lower-earning spouse or to shareholders at different tax rates. HMRC's settlements legislation (Section 624 ITTOIA 2005) applies, so the structure must be commercially justified. We help clients design compliant structures that pass HMRC scrutiny.
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
          <h2 className="text-2xl font-bold text-indigo-900 sm:text-3xl">Thinking about incorporating or restructuring your agency?</h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            Book a free call. We will assess your current structure and model the options with real numbers, not generalisations.
          </p>
          <div className="mt-8">
            <LeadForm redirectOnSuccess={false} submitLabel="Book a free call" />
          </div>
        </div>
      </div>
    </>
  );
}
