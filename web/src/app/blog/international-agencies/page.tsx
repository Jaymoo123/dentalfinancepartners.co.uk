import { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, getCategorySlug, calculateReadTime } from "@/lib/blog";
import { LeadForm } from "@/components/forms/LeadForm";
import { BlogPostCard } from "@/components/blog/BlogPostCard";
import { siteConfig } from "@/config/site";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteContainerLg } from "@/components/ui/layout-utils";

const categoryName = "International & UAE Agencies";
const categorySlug = "international-agencies";

export const metadata: Metadata = {
  title: `International and UAE Agency Tax | ${siteConfig.name}`,
  description: `Tax and accounting for UK agencies operating internationally and agency founders relocating to the UAE. Cross-border structures, residency rules, UAE free zones and dual territory tax planning.`,
  alternates: { canonical: `${siteConfig.url}/blog/${categorySlug}` },
  openGraph: {
    title: `International and UAE Agency Tax`,
    description: `Cross-border tax for UK agencies, UAE free zones, residency rules and international agency structures.`,
    url: `${siteConfig.url}/blog/${categorySlug}`,
    siteName: siteConfig.name,
    type: "website",
  },
};

export default function InternationalAgenciesPage() {
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
        name: `International and UAE Agency Tax`,
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
            For agency founders working across borders, whether running a UK agency with international clients, considering a UAE setup, or relocating abroad. International tax for agencies is genuinely complex; getting it wrong creates double taxation, compliance risk and personal liability. We cut through the noise.
          </p>
        </header>

        <div className="mt-8 space-y-6 max-w-4xl">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Setting Up an Agency in the UAE: Free Zones and Tax</h2>
            <p className="text-base leading-relaxed text-slate-600">
              The UAE introduced a 9% corporate tax rate in June 2023. However, businesses established in qualifying UAE free zones (such as DIFC, DMCC or Dubai Media City) can still access a 0% corporate tax rate on qualifying income, provided they meet substance requirements. For UK agency founders considering a UAE entity, the free zone structure is often the most tax-efficient option, but the free zone choice matters significantly depending on your agency type and client base. Agencies with significant GCC clients may benefit from mainland UAE incorporation instead for contractual reasons.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">UK Residency Rules and Leaving the UK</h2>
            <p className="text-base leading-relaxed text-slate-600">
              UK tax residency is determined by the Statutory Residence Test (SRT), introduced in 2013. Broadly, you are UK resident if you spend 183 or more days in the UK in a tax year, or meet certain tie conditions at lower day counts depending on your history. Agency founders who genuinely relocate to the UAE must sever UK tax ties carefully. This includes reducing UK workdays, where a spouse lives, whether you retain a UK home, and whether your employment or directorship creates a UK connection. Spending even 91 days in the UK per year with three ties can maintain UK residency. A clean exit requires planning before you move.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Cross-Border Agency Structures: UK and UAE Together</h2>
            <p className="text-base leading-relaxed text-slate-600">
              Many UK agency founders operate both a UK limited company and a UAE entity, with one handling UK and European clients, and the other handling UAE and international work. The key challenges in this structure are transfer pricing (ensuring intercompany transactions are at arm's length), managing where decisions are made (permanent establishment risk), and ensuring neither entity inadvertently creates a taxable presence in the other territory. The UK-UAE double tax treaty does not exist in a conventional form, which means planning must rely on domestic exemptions rather than treaty relief. Getting this structure right from the outset avoids expensive restructuring later.
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
          <h2 className="text-2xl font-bold text-indigo-900 sm:text-3xl">Operating internationally or considering a UAE move?</h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            Book a free call. We advise agency founders on cross-border structures, UAE free zone setup and UK residency exit planning. Get it right before you make the move.
          </p>
          <div className="mt-8">
            <LeadForm redirectOnSuccess={false} submitLabel="Book a free call" />
          </div>
        </div>
      </div>
    </>
  );
}
