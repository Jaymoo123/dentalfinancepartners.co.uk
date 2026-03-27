import type { Metadata } from "next";
import Link from "next/link";
import { contentNarrow, focusRing, sectionY } from "@/components/ui/layout-utils";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "UK dental accounting and tax articles for associates, practice owners, and managers — NHS/private mixes, compliance, and profit.",
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <div className={`${contentNarrow} ${sectionY}`}>
      <h1 className="font-serif text-3xl font-semibold text-[var(--ink)] sm:text-4xl">Insights for UK dental practices</h1>
      <p className="mt-4 text-base leading-relaxed text-[var(--muted)] sm:text-lg">
        Practical notes on tax, accounts, and practice economics — written for dentists and owners, not generic SMEs.
      </p>
      <ul className="mt-8 space-y-4 sm:mt-10 sm:space-y-5">
        {posts.map((p) => (
          <li key={p.slug}>
            <article className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm sm:p-6">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-[var(--accent-strong)] sm:text-xs">
                {p.category}
              </p>
              <h2 className="mt-2 font-serif text-lg font-semibold text-[var(--ink)] sm:text-xl">
                <Link
                  href={`/blog/${p.slug}`}
                  className={`hover:text-[var(--accent-strong)] ${focusRing} rounded`}
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
    </div>
  );
}
