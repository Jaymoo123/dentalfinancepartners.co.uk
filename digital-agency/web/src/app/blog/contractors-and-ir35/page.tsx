import { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, getCategorySlug, calculateReadTime } from "@/lib/blog";
import { LeadForm } from "@/components/forms/LeadForm";
import { BlogPostCard } from "@/components/blog/BlogPostCard";
import { siteConfig } from "@/config/site";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { JsonLd, buildCollectionPage } from "@/lib/schema";

const categoryName = "Contractors & IR35";
const categorySlug = "contractors-and-ir35";

export const metadata: Metadata = {
  title: `IR35 and Contractors for Agencies | ${siteConfig.name}`,
  description: `IR35 rules for agency owners and contractors working in the agency sector. How to assess employment status, set up compliant contractor relationships and avoid HMRC investigations.`,
  alternates: { canonical: `${siteConfig.url}/blog/${categorySlug}` },
  openGraph: {
    title: `IR35 and Contractors for Agencies`,
    description: `IR35 employment status rules, off-payroll working and compliant contractor structures for agency founders and freelancers.`,
    url: `${siteConfig.url}/blog/${categorySlug}`,
    siteName: siteConfig.name,
    type: "website",
  },
};

export default function ContractorsAndIr35Page() {
  const allPosts = getAllPosts();
  const categoryPosts = allPosts.filter((post) => getCategorySlug(post) === categorySlug);

  const collection = buildCollectionPage({
    name: `IR35 and Contractors for Agencies`,
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
            IR35 and off-payroll working rules affect agencies in two ways: as a business engaging contractors, and as a founder who may themselves be contracting. We cover both perspectives, including how to stay compliant, how to structure contractor relationships, and how to assess status correctly.
          </p>
        </header>

        <div className="mt-8 space-y-6 max-w-4xl">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">IR35 for Agency Founders Operating Through a Limited Company</h2>
            <p className="text-base leading-relaxed text-slate-600">
              If you operate your agency through a limited company and provide services to a medium or large end client, the off-payroll working rules (Chapter 10, ITEPA 2003) may apply. The client is responsible for assessing your employment status using CEST (Check Employment Status for Tax) or an equivalent process and issuing a Status Determination Statement. If caught inside IR35, your company must treat the relevant income as employment income and deduct PAYE and NIC. For agency founders serving multiple clients with genuine business risk and substitution rights, outside IR35 is often defensible, but it must be documented.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Engaging Freelancers and Contractors in Your Agency</h2>
            <p className="text-base leading-relaxed text-slate-600">
              Many agencies use a mix of employees and freelancers. When your agency engages freelancers through their own limited companies, you are the fee-payer and potentially the end client. If your agency is a medium or large business (two of: turnover over £10.2m, balance sheet over £5.1m, over 50 employees), you must carry out employment status determinations for contractors you engage. Small agencies (below these thresholds) are exempt, but the contractor's personal service company must still self-assess. Misclassification risk, treating employees as self-employed freelancers, is a separate, older issue that HMRC also investigates actively.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Structuring Compliant Contractor Relationships</h2>
            <p className="text-base leading-relaxed text-slate-600">
              The key IR35 tests are: substitution (can the individual send someone else to do the work?), control (who controls how, when and where the work is done?), and mutuality of obligation (is there an obligation to offer and accept ongoing work?). Agencies can strengthen outside-IR35 positions by using proper contracts with substitution clauses, avoiding exclusive working arrangements, ensuring freelancers can work for multiple clients, and not treating contractors like employees day-to-day. Status arguments are undermined by integrated working practices that mirror employment regardless of what the contract says.
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
          <h2 className="text-2xl font-bold text-indigo-900 sm:text-3xl">Not sure where you stand with IR35?</h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            Book a free call. We will review your contractor arrangements and give you a clear view of your exposure and how to manage it.
          </p>
          <div className="mt-8">
            <LeadForm redirectOnSuccess={false} submitLabel="Book a free call" />
          </div>
        </div>
      </div>
    </>
  );
}
