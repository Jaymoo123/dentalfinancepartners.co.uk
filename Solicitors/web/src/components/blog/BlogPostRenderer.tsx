import Link from "next/link";
import type { BlogPost } from "@/types/blog";
import { LeadForm } from "@/components/forms/LeadForm";
import { buildBlogPostingJsonLd } from "@/lib/schema";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { niche } from "@/config/niche-loader";

type BlogPostRendererProps = {
  post: BlogPost;
  related?: { slug: string; title: string; summary: string }[];
};

function formatUkDate(isoDate: string): string {
  const d = new Date(isoDate);
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

export function BlogPostRenderer({ post, related = [] }: BlogPostRendererProps) {
  const jsonLd =
    post.schema?.trim() ||
    buildBlogPostingJsonLd(post, `/blog/${post.slug}`);

  return (
    <>
      <article className="bg-white py-12 sm:py-16">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />

        <div className={siteContainerLg}>
          <div className="max-w-4xl mx-auto">
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Blog", href: "/blog" },
                { label: post.title },
              ]}
            />
            <header className="border-l-4 border-[var(--medical-teal)] bg-[var(--surface)] p-8 mt-6">
              <p className="text-xs font-bold uppercase tracking-wider text-[var(--coral)]">
                {post.category}
              </p>
              <h1 className="mt-3 text-3xl font-bold leading-tight text-[var(--ink)] sm:text-4xl md:text-5xl">
                {post.h1}
              </h1>
              <p className="mt-3 text-sm text-[var(--muted)]">
                {post.date && (
                  <time dateTime={post.date}>{formatUkDate(post.date)}</time>
                )}
                {post.author ? (
                  <>
                    {" · "}
                    <span>{post.author}</span>
                  </>
                ) : null}
              </p>
              {post.summary ? (
                <p className="mt-4 text-lg text-[var(--ink-soft)] leading-relaxed">{post.summary}</p>
              ) : null}
            </header>

            {post.image ? (
              <img
                src={post.image}
                alt={post.altText || post.title}
                className="mt-10 w-full border-2 border-[var(--border)] object-cover shadow-sm"
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
                <h2 id="faq-heading" className="text-3xl font-bold text-[var(--ink)] mb-8">
                  Frequently asked questions
                </h2>
                <dl className="space-y-4">
                  {post.faqs.map((faq, i) => (
                    <div key={i} className="border-l-4 border-[var(--medical-teal)] bg-[var(--surface)] p-6">
                      <dt className="text-lg font-bold text-[var(--ink)]">{faq.question}</dt>
                      <dd className="mt-3 text-base text-[var(--ink-soft)] leading-relaxed">{faq.answer}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            ) : null}

            <div className="mt-16 bg-[var(--medical-teal)] p-8 sm:p-10 text-white rounded-2xl">
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                {niche.blog.cta_heading}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/90">
                {niche.blog.cta_body}
              </p>
              <div className="mt-8">
                <LeadForm redirectOnSuccess={false} submitLabel={niche.blog.cta_button} />
              </div>
            </div>

            {related.length > 0 ? (
              <section className="mt-16" aria-labelledby="related-heading">
                <h2 id="related-heading" className="text-2xl font-bold text-[var(--ink)] mb-8">
                  Related articles
                </h2>
                <ul className="space-y-4">
                  {related.map((r) => (
                    <li key={r.slug}>
                      <Link
                        href={`/blog/${r.slug}`}
                        className="block border-l-4 border-[var(--border)] bg-[var(--surface)] p-6 transition-all hover:border-[var(--medical-teal)] hover:bg-white hover:shadow-md"
                      >
                        <h3 className="text-lg font-bold text-[var(--ink)]">{r.title}</h3>
                        <p className="mt-2 text-sm text-[var(--muted)]">{r.summary}</p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
          </div>
        </div>
      </article>
    </>
  );
}
