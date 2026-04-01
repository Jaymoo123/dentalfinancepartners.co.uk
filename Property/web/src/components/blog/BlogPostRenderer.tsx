import Link from "next/link";
import type { BlogPost } from "@/types/blog";
import { LeadForm } from "@/components/forms/LeadForm";
import { buildBlogPostingJsonLd } from "@/lib/schema";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { niche } from "@/config/niche-loader";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { ReadingProgress } from "@/components/blog/ReadingProgress";
import { extractHeadings } from "@/lib/markdown-utils";
import { calculateReadTime } from "@/lib/blog";

type BlogPostRendererProps = {
  post: BlogPost;
  categorySlug: string;
  related?: { slug: string; title: string; summary: string; categorySlug: string }[];
};

function formatUkDate(isoDate: string): string {
  const d = new Date(isoDate);
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

export function BlogPostRenderer({ post, categorySlug, related = [] }: BlogPostRendererProps) {
  const headings = extractHeadings(post.contentHtml);
  const readTime = calculateReadTime(post.contentHtml);
  const jsonLd =
    post.schema?.trim() ||
    buildBlogPostingJsonLd(post, `/blog/${categorySlug}/${post.slug}`);

  return (
    <>
      <ReadingProgress />
      <article className="bg-white py-12 sm:py-16">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />

        <div className={siteContainerLg}>
          <div className="max-w-4xl mx-auto lg:max-w-7xl lg:grid lg:grid-cols-[1fr_250px] lg:gap-12">
            <div className="max-w-4xl">
              <Breadcrumb
                items={[
                  { label: "Home", href: "/" },
                  { label: "Blog", href: "/blog" },
                  { label: post.category, href: `/blog/${categorySlug}` },
                  { label: post.title },
                ]}
              />
              <header className="border-l-4 border-emerald-600 bg-slate-50 p-8 mt-6">
                <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                  {post.category}
                </p>
                <h1 className="mt-3 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl md:text-5xl">
                  {post.h1}
                </h1>
                <p className="mt-3 text-sm text-slate-500">
                  {post.date && (
                    <time dateTime={post.date}>{formatUkDate(post.date)}</time>
                  )}
                  {post.author ? (
                    <>
                      {" · "}
                      <span>{post.author}</span>
                    </>
                  ) : null}
                  {readTime > 0 && (
                    <>
                      {" · "}
                      <span>{readTime} min read</span>
                    </>
                  )}
                </p>
                {post.summary ? (
                  <p className="mt-4 text-lg text-slate-700 leading-relaxed">{post.summary}</p>
                ) : null}
              </header>

              <div className="lg:hidden mt-8">
                <TableOfContents headings={headings} />
              </div>

              {post.image ? (
                <img
                  src={post.image}
                  alt={post.altText || post.title}
                  className="mt-10 w-full border-2 border-slate-200 object-cover shadow-sm"
                  width={1200}
                  height={630}
                />
              ) : null}

              <div
                className="article-body prose-blog mt-10"
                dangerouslySetInnerHTML={{ __html: post.contentHtml }}
              />

              {post.faqs && post.faqs.length > 0 ? (
                <section className="mt-16" aria-labelledby="faq-heading">
                  <h2 id="faq-heading" className="text-3xl font-bold text-slate-900 mb-8">
                    Frequently asked questions
                  </h2>
                  <dl className="space-y-4">
                    {post.faqs.map((faq, i) => (
                      <div key={i} className="border-l-4 border-slate-300 bg-slate-50 p-6">
                        <dt className="text-lg font-bold text-slate-900">{faq.question}</dt>
                        <dd className="mt-3 text-base text-slate-700 leading-relaxed">{faq.answer}</dd>
                      </div>
                    ))}
                  </dl>
                </section>
              ) : null}

              <div className="mt-16 bg-slate-900 p-8 sm:p-10 text-white">
                <h2 className="text-2xl font-bold text-white sm:text-3xl">
                  {niche.blog.cta_heading}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-slate-200">
                  {niche.blog.cta_body}
                </p>
                <div className="mt-8">
                  <LeadForm redirectOnSuccess={false} submitLabel={niche.blog.cta_button} />
                </div>
              </div>

              {related.length > 0 ? (
                <section className="mt-16" aria-labelledby="related-heading">
                  <h2 id="related-heading" className="text-2xl font-bold text-slate-900 mb-8">
                    Related articles
                  </h2>
                  <ul className="space-y-4">
                    {related.map((r) => (
                      <li key={r.slug}>
                        <Link
                          href={`/blog/${r.categorySlug}/${r.slug}`}
                          className="block border-l-4 border-slate-300 bg-slate-50 p-6 transition-all hover:border-emerald-600 hover:bg-white hover:shadow-md"
                        >
                          <h3 className="text-lg font-bold text-slate-900">{r.title}</h3>
                          <p className="mt-2 text-sm text-slate-600">{r.summary}</p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}
            </div>

            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <TableOfContents headings={headings} />
              </div>
            </aside>
          </div>
        </div>
      </article>
    </>
  );
}
