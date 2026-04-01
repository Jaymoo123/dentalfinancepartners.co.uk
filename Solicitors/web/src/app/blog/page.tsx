import type { Metadata } from "next";
import Link from "next/link";
import { contentNarrow, focusRing, sectionY } from "@/components/ui/layout-utils";
import { getAllPosts } from "@/lib/blog";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Medical Accounting Blog | GP Tax & NHS Pension Advice",
  description:
    "Expert articles on GP tax planning, NHS pension annual allowance, locum tax returns, and private practice accounting. Written by medical accounting specialists for UK doctors.",
  alternates: { canonical: `${siteConfig.url}/blog` },
  openGraph: {
    title: "Medical Accounting Blog | GP Tax & NHS Pension Advice",
    description:
      "Expert articles on GP tax planning, NHS pension annual allowance, locum tax returns, and private practice accounting for UK doctors.",
    url: `${siteConfig.url}/blog`,
    type: "website",
  },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <div className={`${contentNarrow} ${sectionY}`}>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Blog" },
        ]}
      />
      <h1 className="font-serif text-3xl font-semibold text-[var(--ink)] sm:text-4xl">
        Medical accounting insights for UK doctors
      </h1>
      <p className="mt-4 text-base leading-relaxed text-[var(--muted)] sm:text-lg">
        In-depth guidance on GP tax planning, NHS pension complexities, locum tax returns, and private practice structures. Written specifically for medical professionals navigating UK tax regulations.
      </p>
      {posts.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 text-center">
          <p className="text-base text-[var(--muted)]">Articles coming soon. Check back shortly.</p>
        </div>
      ) : (
        <ul className="mt-8 space-y-4 sm:mt-10 sm:space-y-5">
          {posts.map((p) => (
            <li key={p.slug}>
              <article className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm transition-shadow hover:shadow-md sm:p-6">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-[var(--accent-strong)] sm:text-xs">
                  {p.category}
                </p>
                <h2 className="mt-2 font-serif text-lg font-semibold text-[var(--ink)] sm:text-xl">
                  <Link
                    href={`/blog/${p.slug}`}
                    className={`hover:text-[var(--accent-strong)] transition-colors ${focusRing} rounded`}
                  >
                    {p.title}
                  </Link>
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)] sm:text-base">{p.summary}</p>
                <p className="mt-4 text-sm text-[var(--muted)]">
                  {p.date ? (
                    <time dateTime={p.date}>
                      {new Intl.DateTimeFormat("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      }).format(new Date(p.date))}
                    </time>
                  ) : null}
                </p>
              </article>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
