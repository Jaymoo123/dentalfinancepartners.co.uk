import Link from "next/link";
import type { BlogPost } from "@/types/blog";
import { LeadForm } from "@/components/forms/LeadForm";
import { buildBlogPostingJsonLd } from "@/lib/schema";
import { contentNarrow, focusRing } from "@/components/ui/layout-utils";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { niche } from "@/config/niche-loader";

type BlogPostRendererProps = {
  post: BlogPost;
  related?: { slug: string; title: string; summary: string }[];
};

/**
 * Renders posts produced by the Python pipeline (`02_blog_generator.py` → `03_content_parser.py` → `09_md_exporter.py`).
 * Expected shape: frontmatter fields + HTML body in the Markdown file; optional `schema` JSON-LD string from `05_schema_builder.py`.
 */
export function BlogPostRenderer({ post, related = [] }: BlogPostRendererProps) {
  const jsonLd =
    post.schema?.trim() ||
    buildBlogPostingJsonLd(post, `/blog/${post.slug}`);

  return (
    <article className={`${contentNarrow} py-10 sm:py-14`}>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: post.title },
        ]}
      />
      <header className="border-b border-[var(--border)] pb-6 sm:pb-8">
        <p className="text-sm font-medium uppercase tracking-wide text-[var(--accent-strong)]">
          {post.category}
        </p>
        <h1 className="mt-2 font-serif text-[1.65rem] font-semibold leading-tight tracking-tight text-[var(--ink)] sm:text-4xl md:text-[2.25rem]">
          {post.h1}
        </h1>
        <p className="mt-2 text-sm text-[var(--muted)]">
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
          <p className="mt-4 text-lg text-[var(--ink-soft)]">{post.summary}</p>
        ) : null}
      </header>

      {post.image ? (
        // eslint-disable-next-line @next/next/no-img-element -- CMS / static export URLs
        <img
          src={post.image}
          alt={post.altText || post.title}
          className="mt-10 w-full rounded-xl border border-[var(--border)] object-cover"
          width={1200}
          height={630}
        />
      ) : null}

      <div
        className="article-body prose-blog mt-10"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />

      {post.faqs && post.faqs.length > 0 ? (
        <section className="mt-12" aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="font-serif text-2xl font-semibold text-[var(--ink)]">
            Frequently asked questions
          </h2>
          <dl className="mt-6 space-y-6">
            {post.faqs.map((faq, i) => (
              <div key={i} className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
                <dt className="font-semibold text-[var(--ink)]">{faq.question}</dt>
                <dd className="mt-2 text-[var(--muted)]">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </section>
      ) : null}

      <div className="mt-12 rounded-2xl border border-[var(--border)] bg-[var(--background)] p-6 sm:p-8">
        <h2 className="font-serif text-xl font-semibold text-[var(--navy)] sm:text-2xl">
          {niche.blog.cta_heading}
        </h2>
        <p className="mt-3 text-base leading-relaxed text-[var(--muted)]">
          {niche.blog.cta_body}
        </p>
        <div className="mt-6">
          <LeadForm redirectOnSuccess={false} submitLabel={niche.blog.cta_button} />
        </div>
      </div>

      {related.length > 0 ? (
        <section className="mt-14" aria-labelledby="related-heading">
          <h2 id="related-heading" className="font-serif text-xl font-semibold text-[var(--ink)]">
            Related articles
          </h2>
          <ul className="mt-4 space-y-4">
            {related.map((r) => (
              <li key={r.slug}>
                <Link
                  href={`/blog/${r.slug}`}
                  className={`block min-h-[3.25rem] rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 transition-colors hover:border-[var(--accent)] ${focusRing}`}
                >
                  <span className="font-medium text-[var(--ink)]">{r.title}</span>
                  {r.summary ? (
                    <span className="mt-1 block text-sm text-[var(--muted)]">
                      {r.summary}
                    </span>
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <SchemaScript schema={jsonLd} />
    </article>
  );
}

function formatUkDate(iso: string) {
  try {
    return new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

function SchemaScript({ schema }: { schema: string }) {
  const trimmed = schema.trim();
  if (!trimmed) return null;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: trimmed }}
    />
  );
}
