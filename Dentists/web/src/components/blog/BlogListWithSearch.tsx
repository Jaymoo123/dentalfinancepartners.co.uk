"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { focusRing } from "@/components/ui/layout-utils";
import type { BlogPost } from "@/types/blog";

type BlogListWithSearchProps = {
  posts: Array<BlogPost & { categorySlug: string }>;
  categories: Array<{ slug: string; name: string; count: number }>;
  readTimes: Map<string, number>;
  activeCategory?: string;
};

type SortOption = "date-desc" | "date-asc" | "title-asc" | "title-desc";

/**
 * The /blog archive list. As of the hub convergence this is its ONLY consumer:
 * the twelve category hubs now render the kit `BlogCategoryHub` + `HubArticleList`
 * instead, so the `categories` and `activeCategory` props are vestigial and kept
 * only because `app/blog/page.tsx` still passes them.
 *
 * Contrast, measured against each control's ACTUAL ground (white, `--surface`):
 * the search box and the sort select rested on `--border` #e2e8f0 at 1.23:1 and
 * focused to `--gold` #b8975d at 2.75:1, and the pagination buttons hovered to
 * the same gold. A form control's boundary needs 3:1 (WCAG 1.4.11) and neither
 * state came close, so the focus indicator on this site's most-used control was
 * effectively invisible. Resting border is now slate-500 (4.76), focus and hover
 * are primary-600 (9.05). The card eyebrow and title hover were
 * `--accent-strong` #9e7f4a at 3.76, a text fail, and are primary-700 (11.64).
 * Gold is barred from carrying text or a boundary on a light ground
 * (docs/dentists/DESIGN_DELTA.md §1); it is not darkened and not deleted.
 */

export function BlogListWithSearch({
  posts,
  categories,
  readTimes,
  activeCategory,
}: BlogListWithSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("date-desc");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 12;

  const filteredAndSortedPosts = useMemo(() => {
    let filtered = posts;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = posts.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.summary.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      );
    }

    const sorted = [...filtered];
    switch (sortBy) {
      case "date-desc":
        sorted.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      case "date-asc":
        sorted.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
      case "title-asc":
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "title-desc":
        sorted.sort((a, b) => b.title.localeCompare(a.title));
        break;
    }

    return sorted;
  }, [posts, searchQuery, sortBy]);

  const totalPages = Math.ceil(filteredAndSortedPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const paginatedPosts = filteredAndSortedPosts.slice(startIndex, endIndex);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleSortChange = (sort: SortOption) => {
    setSortBy(sort);
    setCurrentPage(1);
  };

  return (
    <div>
      {/* Search Bar and Sort */}
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
              onChange={(e) => handleSearchChange(e.target.value)}
              className={`w-full min-h-[48px] pl-12 pr-4 py-3 text-base rounded-lg border-2 border-slate-500 bg-[var(--surface)] text-[var(--ink)] placeholder:text-[var(--muted)] transition-colors focus:border-primary-600 focus:outline-none ${focusRing}`}
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
            onChange={(e) => handleSortChange(e.target.value as SortOption)}
            className={`min-h-[48px] px-4 py-3 text-sm sm:text-base rounded-lg border-2 border-slate-500 bg-[var(--surface)] text-[var(--ink)] transition-colors focus:border-primary-600 focus:outline-none ${focusRing}`}
          >
            <option value="date-desc">Newest First</option>
            <option value="date-asc">Oldest First</option>
            <option value="title-asc">Title A-Z</option>
            <option value="title-desc">Title Z-A</option>
          </select>
        </div>
      </div>

      {/* Results Count */}
      {searchQuery && (
        <p className="mt-4 text-sm text-[var(--muted)]">
          Found {filteredAndSortedPosts.length} article{filteredAndSortedPosts.length !== 1 ? "s" : ""}
          {filteredAndSortedPosts.length === 0 && ` matching "${searchQuery}"`}
        </p>
      )}

      {/* Results */}
      {paginatedPosts.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 text-center">
          <p className="text-base text-[var(--muted)]">
            {searchQuery
              ? `No articles found matching "${searchQuery}". Try a different search term.`
              : "Articles coming soon. Check back shortly."}
          </p>
        </div>
      ) : (
        <>
          <ul className="mt-8 space-y-4 sm:space-y-5">
            {paginatedPosts.map((p) => {
              const readTime = readTimes.get(p.slug) || 0;
              return (
                <li key={p.slug}>
                  <article className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm transition-shadow hover:shadow-md sm:p-6">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-primary-700 sm:text-xs">
                      {p.category}
                    </p>
                    <h2 className="mt-2 font-serif text-lg font-semibold text-[var(--ink)] sm:text-xl">
                      <Link
                        href={`/blog/${p.categorySlug}/${p.slug}`}
                        className={`hover:text-primary-700 transition-colors ${focusRing} rounded`}
                      >
                        {p.title}
                      </Link>
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--muted)] sm:text-base">{p.summary}</p>
                    <div className="mt-4 flex items-center gap-3 text-sm text-[var(--muted)]">
                      {p.date ? (
                        <time dateTime={p.date}>
                          {new Intl.DateTimeFormat("en-GB", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          }).format(new Date(p.date))}
                        </time>
                      ) : null}
                      <span>•</span>
                      <span>{readTime} min read</span>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>

          {totalPages > 1 && !searchQuery && (
            <div className="mt-8 sm:mt-12">
              <nav aria-label="Pagination">
                <div className="flex items-center justify-center gap-2 flex-wrap">
                  {currentPage > 1 && (
                    <button
                      onClick={() => setCurrentPage((p) => p - 1)}
                      className={`flex items-center justify-center min-h-[48px] min-w-[100px] px-4 rounded-lg border-2 border-slate-500 bg-[var(--surface)] text-[var(--ink)] font-medium transition-colors hover:border-primary-600 hover:bg-primary-50 active:scale-95 ${focusRing}`}
                    >
                      Previous
                    </button>
                  )}
                  <span className="text-sm text-[var(--muted)] font-medium px-4 py-2">
                    Page {currentPage} of {totalPages}
                  </span>
                  {currentPage < totalPages && (
                    <button
                      onClick={() => setCurrentPage((p) => p + 1)}
                      className={`flex items-center justify-center min-h-[48px] min-w-[100px] px-4 rounded-lg border-2 border-slate-500 bg-[var(--surface)] text-[var(--ink)] font-medium transition-colors hover:border-primary-600 hover:bg-primary-50 active:scale-95 ${focusRing}`}
                    >
                      Next
                    </button>
                  )}
                </div>
              </nav>
            </div>
          )}
        </>
      )}
    </div>
  );
}
