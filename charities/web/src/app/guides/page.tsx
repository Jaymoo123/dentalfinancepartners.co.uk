import type { Metadata } from "next";
import Link from "next/link";
import { getAllGuides } from "@/lib/guides/content";
import { siteContainerLg } from "@/components/ui/layout-utils";

export const metadata: Metadata = {
  title: "Charity Finance Guides | Trustee Finance Partners",
  description:
    "Free guides on charity accounts, independent examination, Gift Aid, charity VAT and trustee compliance from Trustee Finance Partners.",
};

export default function GuidesIndexPage() {
  const guides = getAllGuides();

  return (
    <>
      <section className="border-b border-neutral-200 bg-[#1a5c4a] py-16 sm:py-20">
        <div className={siteContainerLg}>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">Charity finance guides.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
            Plain-English guides to charity accounts, independent examination, Gift Aid, VAT and trustee compliance.
          </p>
        </div>
      </section>

      <section className="bg-[#fafaf9] py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          {guides.length === 0 ? (
            <p className="text-neutral-500">Guides coming soon.</p>
          ) : (
            <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
              {guides.map((guide) => (
                <Link key={guide.slug} href={`/guides/${guide.slug}`} className="group block bg-white border border-neutral-200 p-6 sm:p-8 shadow-sm hover:shadow-md hover:border-[#1a5c4a] transition-all">
                  <h2 className="text-xl font-bold tracking-tight text-neutral-900 group-hover:text-[#1a5c4a] transition-colors">{guide.title}</h2>
                  {guide.summary && <p className="mt-3 text-sm leading-relaxed text-neutral-600 line-clamp-3">{guide.summary}</p>}
                  {guide.lastReviewed && <p className="mt-4 text-xs text-neutral-400">Updated: {guide.lastReviewed}</p>}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
