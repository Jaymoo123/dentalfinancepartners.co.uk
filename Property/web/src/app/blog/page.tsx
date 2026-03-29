import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { getAllPosts } from "@/lib/blog";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Blog | Property Tax Insights for UK Landlords",
  description:
    "Property tax articles for UK landlords — Section 24, MTD, incorporation, portfolio management. Written by specialist property accountants.",
  alternates: { canonical: `${siteConfig.url}/blog` },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <>
      <section className="relative h-[350px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1554995207-c18c203602cb?w=2000&q=85"
          alt="UK property"
          fill
          className="object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-slate-900/85" />
        <div className={`${siteContainerLg} relative z-10 h-full flex items-center`}>
          <div className="max-w-3xl">
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Blog" },
              ]}
            />
            <h1 className="mt-6 text-4xl font-bold text-white sm:text-5xl lg:text-6xl">Property tax insights</h1>
            <p className="mt-4 text-xl text-white">
              Practical notes on tax, accounts, and property economics — written for landlords, not generic SMEs.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-4xl mx-auto">
            <ul className="space-y-6">
              {posts.map((p) => (
                <li key={p.slug}>
                  <article className="border-l-4 border-slate-300 bg-slate-50 p-8 transition-all hover:border-emerald-600 hover:bg-white hover:shadow-md">
                    <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                      {p.category}
                    </p>
                    <h2 className="mt-3 text-2xl font-bold text-slate-900">
                      <Link
                        href={`/blog/${p.slug}`}
                        className="hover:text-emerald-700 transition-colors"
                      >
                        {p.title}
                      </Link>
                    </h2>
                    <p className="mt-3 text-base leading-relaxed text-slate-700">{p.summary}</p>
                    {p.date && (
                      <p className="mt-4 text-sm text-slate-500">
                        <time dateTime={p.date}>
                          {new Intl.DateTimeFormat("en-GB", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          }).format(new Date(p.date))}
                        </time>
                      </p>
                    )}
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
