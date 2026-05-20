import { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, getCategorySlug, calculateReadTime } from "@/lib/blog";
import { LeadForm } from "@/components/forms/LeadForm";
import { BlogPostCard } from "@/components/blog/BlogPostCard";
import { siteConfig } from "@/config/site";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { JsonLd, buildCollectionPage } from "@/lib/schema";

const categoryName = "Making Tax Digital";
const categorySlug = "making-tax-digital";

export const metadata: Metadata = {
  title: `Making Tax Digital for Agency Founders | ${siteConfig.name}`,
  description: `MTD for Income Tax and MTD for VAT explained for agency founders. Deadlines, compatible software and what you need to do to comply. Practical guidance from specialist agency accountants.`,
  alternates: { canonical: `${siteConfig.url}/blog/${categorySlug}` },
  openGraph: {
    title: `Making Tax Digital for Agency Founders`,
    description: `MTD for Income Tax and VAT: deadlines, software and compliance steps for agency founders.`,
    url: `${siteConfig.url}/blog/${categorySlug}`,
    siteName: siteConfig.name,
    type: "website",
  },
};

export default function MakingTaxDigitalPage() {
  const allPosts = getAllPosts();
  const categoryPosts = allPosts.filter((post) => getCategorySlug(post) === categorySlug);

  const collection = buildCollectionPage({
    name: `Making Tax Digital for Agency Founders`,
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
            HMRC is digitising the tax system. Making Tax Digital affects agency founders across VAT and income tax. Here we explain what is changing, when it applies, what software you need, and how to stay compliant without it disrupting how you run your agency.
          </p>
        </header>

        <div className="mt-8 space-y-6 max-w-4xl">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">MTD for VAT: Already Mandatory</h2>
            <p className="text-base leading-relaxed text-slate-600">
              Making Tax Digital for VAT has applied to all VAT-registered businesses since April 2022. If your agency is VAT registered, you must already be keeping digital records and submitting VAT returns through MTD-compatible software. Compatible options include Xero, QuickBooks, Sage and FreeAgent. Paper records and manual spreadsheet submissions (without bridging software) are no longer acceptable. If you are still using a non-MTD-compatible process, this needs to be addressed immediately, as HMRC can levy penalties for non-compliance.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">MTD for Income Tax: What Agency Founders Need to Know</h2>
            <p className="text-base leading-relaxed text-slate-600">
              MTD for Income Tax Self Assessment (MTD for ITSA) replaces the annual self assessment return with quarterly digital submissions. It applies to sole traders and landlords with qualifying income above £50,000 from April 2026, and above £30,000 from April 2027. If you are a limited company agency founder paying yourself primarily via salary and dividends, MTD for ITSA does not directly affect your company, but it may affect your personal tax reporting if you have additional self-employment or rental income above the threshold. Sole trader agency founders will be directly in scope.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Choosing the Right Accounting Software for MTD</h2>
            <p className="text-base leading-relaxed text-slate-600">
              The right accounting software depends on the size and complexity of your agency. Xero is the most widely used among growing agencies. It integrates well with payroll software, Dext (receipt capture), and project management tools. QuickBooks is a strong alternative and is often better value for smaller agencies. FreeAgent suits freelancers and very small agencies with simpler needs. All three are MTD-compatible for both VAT and the upcoming ITSA requirements. Whichever you choose, ensure your records are structured in a way that makes management reporting and tax preparation straightforward, not just compliance-ready.
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
          <h2 className="text-2xl font-bold text-indigo-900 sm:text-3xl">Need help getting MTD-ready?</h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            Book a free call. We will review your current setup and make sure you are using the right software in the right way, before HMRC catches up.
          </p>
          <div className="mt-8">
            <LeadForm redirectOnSuccess={false} submitLabel="Book a free call" />
          </div>
        </div>
      </div>
    </>
  );
}
