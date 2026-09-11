"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Clock } from "lucide-react";
import { focusRing } from "@/components/ui/layout-utils";
import { NumberedPagination } from "@accounting-network/web-shared/design/primitives/NumberedPagination";

/**
 * Lightweight projection: the only fields this list renders. Declared here
 * because this file IS the server/client boundary for /blog. `BlogPost`
 * carries `contentHtml` (src/lib/blog.ts), so passing posts through whole
 * serialised the full HTML body of all 88 articles into the RSC flight
 * payload of the index route (2.65 MB of HTML before this change).
 *
 * Kit note: `design/blog/BlogListWithSearch` builds nested `/blog/<category>/<slug>`
 * hrefs and `slice()`s the off-page cards away. Medical's blog URLs are FLAT and
 * /blog is this site's only full crawl path to the corpus, so the card recipe,
 * the search/sort band and `NumberedPagination` are consumed from the kit while
 * the href shape and the hidden-not-sliced rule stay local.
 */
export type BlogListItem = {
  slug: string;
  title: string;
  summary: string;
  category: string;
  categorySlug: string;
  date: string;
  readTime: number;
};

type SortOption = "date-desc" | "date-asc" | "title-asc" | "title-desc";

export function BlogListWithSearch({ posts }: { posts: BlogListItem[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("date-desc");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 12;

  // Every post is rendered on every render, in sorted order, and the ones that
  // are filtered out or off the current page carry the `hidden` attribute.
  // Crawlers see all 88 <a href> on first paint, assistive tech skips what is
  // not on screen, the reader gets twelve at a time. Do NOT turn this into a
  // slice(): NumberedPagination renders <button>, not <a>, so a sliced list
  // would put 76 of 88 articles behind client state and out of the HTML.
  const sorted = useMemo(() => {
    const out = [...posts];
    switch (sortBy) {
      case "date-desc":
        out.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      case "date-asc":
        out.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
      case "title-asc":
        out.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "title-desc":
        out.sort((a, b) => b.title.localeCompare(a.title));
        break;
    }
    return out;
  }, [posts, sortBy]);

  const query = searchQuery.trim().toLowerCase();
  const matches = (p: BlogListItem) =>
    !query ||
    p.title.toLowerCase().includes(query) ||
    p.summary.toLowerCase().includes(query) ||
    p.category.toLowerCase().includes(query);

  const matchCount = sorted.filter(matches).length;
  const totalPages = Math.ceil(matchCount / postsPerPage);
  const page = Math.min(currentPage, Math.max(1, totalPages));

  // Running rank among matching posts, so "page 2" means the 13th to 24th
  // match rather than the 13th to 24th element of the unfiltered list.
  let rank = -1;

  const resetPage = () => setCurrentPage(1);

  return (
    <div className="scroll-mt-24">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-4">
        <div className="flex-1">
          <label htmlFor="blog-search" className="sr-only">
            Search articles
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <svg className="w-5 h-5 text-[var(--muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              id="blog-search"
              type="search"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                resetPage();
              }}
              className={`w-full min-h-[48px] pl-12 pr-4 py-3 text-base rounded-xl border-2 border-[var(--border)] bg-[var(--surface)] text-[var(--ink)] placeholder:text-[var(--muted)] transition-colors focus:border-[var(--primary)] focus:outline-none ${focusRing}`}
            />
          </div>
        </div>

        <div className="flex items-center gap-2 sm:flex-shrink-0">
          <label htmlFor="blog-sort" className="text-sm font-medium text-[var(--ink)] whitespace-nowrap">
            Sort:
          </label>
          <select
            id="blog-sort"
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value as SortOption);
              resetPage();
            }}
            className={`min-h-[48px] px-4 py-3 text-sm sm:text-base rounded-xl border-2 border-[var(--border)] bg-[var(--surface)] text-[var(--ink)] transition-colors focus:border-[var(--primary)] focus:outline-none ${focusRing}`}
          >
            <option value="date-desc">Newest first</option>
            <option value="date-asc">Oldest first</option>
            <option value="title-asc">Title A-Z</option>
            <option value="title-desc">Title Z-A</option>
          </select>
        </div>
      </div>

      {query ? (
        <p className="mt-4 text-sm text-[var(--muted)]">
          Found {matchCount} article{matchCount !== 1 ? "s" : ""}
          {matchCount === 0 ? ` matching "${searchQuery}"` : ""}
        </p>
      ) : null}

      {matchCount === 0 ? (
        <div className="mt-8 rounded-xl bg-white p-8 text-center ring-1 ring-slate-200/70">
          <p className="text-base text-[var(--muted)]">
            No articles found matching &quot;{searchQuery}&quot;. Try a different search term.
          </p>
        </div>
      ) : null}

      <ul className="mt-8 space-y-4 sm:space-y-5">
        {sorted.map((p) => {
          const isMatch = matches(p);
          if (isMatch) rank += 1;
          const onPage = isMatch && Math.floor(rank / postsPerPage) + 1 === page;
          return (
            <li key={p.slug} hidden={!onPage}>
              <article className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200/70 transition-shadow hover:shadow-md sm:p-7">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-primary-700 sm:text-xs">
                  {p.category}
                </p>
                <h3 className="mt-3 text-base font-bold! tracking-normal! leading-snug! text-slate-900 sm:text-lg">
                  <Link
                    href={`/blog/${p.slug}`}
                    className={`transition-colors hover:text-primary-700 ${focusRing} rounded`}
                  >
                    {p.title}
                  </Link>
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-600 line-clamp-3 sm:text-base sm:leading-7">
                  {p.summary}
                </p>
                <p className="mt-4 inline-flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-500">
                  <span className="inline-flex items-center gap-1.5">
                    <Clock aria-hidden className="h-3.5 w-3.5 text-primary-600" />
                    {p.readTime} min read
                  </span>
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
          );
        })}
      </ul>

      {totalPages > 1 ? (
        <div className="mt-8 sm:mt-12">
          <NumberedPagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      ) : null}
    </div>
  );
}
