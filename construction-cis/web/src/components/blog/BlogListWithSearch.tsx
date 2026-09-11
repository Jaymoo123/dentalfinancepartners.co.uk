"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
/**
 * Card metadata only. The list must never receive `contentHtml`: this is a client
 * component, so anything on the prop is serialized into the flight payload.
 */
export type BlogListPost = {
  title: string;
  summary: string;
  category: string;
  slug: string;
  date: string;
  categorySlug: string;
};

type BlogListWithSearchProps = {
  posts: BlogListPost[];
  categories: Array<{ slug: string; name: string; count: number }>;
  readTimes: Map<string, number>;
  activeCategory?: string;
};

type SortOption = "date-desc" | "date-asc" | "title-asc" | "title-desc";

const fieldClass =
  "border border-neutral-300 bg-white px-3.5 py-3 text-base text-neutral-900 placeholder:text-neutral-400 transition-colors focus:border-orange-500 focus:outline-none";

export function BlogListWithSearch({
  posts,
  categories: _categories,
  readTimes,
  activeCategory,
}: BlogListWithSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("date-desc");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 12;

  const filteredAndSortedPosts = useMemo(() => {
    let filtered = posts;

    if (activeCategory) {
      filtered = filtered.filter((p) => p.categorySlug === activeCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
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
  }, [posts, searchQuery, sortBy, activeCategory]);

  const totalPages = Math.ceil(filteredAndSortedPosts.length / postsPerPage);

  // DESIGN_SYSTEM.md 4e: paginate by HIDING, never by slicing. Pagination is
  // client state behind <button>s, so a sliced grid leaves cards 13..N out of the
  // server HTML and the corpus uncrawlable from its own index. Every card is
  // rendered; `visibleOrder` carries each card's position in the filtered and
  // sorted order, which drives both the `hidden` attribute and the CSS `order`
  // (the DOM order stays the server's, so sorting still works while hiding).
  const visibleOrder = useMemo(
    () => new Map(filteredAndSortedPosts.map((p, i) => [p.slug, i])),
    [filteredAndSortedPosts]
  );

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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-4">
        <div className="flex-1">
          <label htmlFor="blog-search" className="sr-only">Search articles</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              id="blog-search"
              type="search"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className={`w-full min-h-[48px] pl-12 pr-4 py-3 text-base ${fieldClass}`}
            />
          </div>
        </div>

        <div className="flex items-center gap-2 sm:flex-shrink-0">
          <label htmlFor="blog-sort" className="text-sm font-medium text-neutral-900 whitespace-nowrap">Sort:</label>
          <select
            id="blog-sort"
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value as SortOption)}
            className={`min-h-[48px] px-4 py-3 text-sm sm:text-base ${fieldClass}`}
          >
            <option value="date-desc">Newest first</option>
            <option value="date-asc">Oldest first</option>
            <option value="title-asc">Title A-Z</option>
            <option value="title-desc">Title Z-A</option>
          </select>
        </div>
      </div>

      {searchQuery && (
        <p className="mt-4 text-sm text-neutral-500">
          Found {filteredAndSortedPosts.length} article{filteredAndSortedPosts.length !== 1 ? "s" : ""}
          {filteredAndSortedPosts.length === 0 && ` matching "${searchQuery}"`}
        </p>
      )}

      {filteredAndSortedPosts.length === 0 ? (
        <div className="mt-8 rounded-xl border border-neutral-200 bg-[var(--hero-cream)] p-8 text-center">
          <p className="text-base text-neutral-500">
            {searchQuery
              ? `No articles found matching "${searchQuery}". Try a different search term.`
              : "Articles coming soon. Check back shortly."}
          </p>
        </div>
      ) : (
        <>
          <ul className="mt-8 flex flex-col gap-4 sm:gap-5">
            {posts.map((p) => {
              const readTime = readTimes.get(p.slug) ?? 0;
              const visibleIndex = visibleOrder.get(p.slug);
              const offPage =
                visibleIndex === undefined ||
                Math.floor(visibleIndex / postsPerPage) + 1 !== currentPage;
              return (
                <li key={p.slug} hidden={offPage} style={{ order: visibleIndex ?? 0 }}>
                  <article className="rounded-xl border border-neutral-200 bg-[var(--hero-cream)] p-5 sm:p-6 transition-shadow hover:shadow-md">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-orange-700">
                      {p.category}
                    </p>
                    <h2 className="mt-2 text-lg font-bold text-neutral-900 sm:text-xl">
                      <Link
                        href={`/blog/${p.categorySlug}/${p.slug}`}
                        className="hover:text-orange-700 transition-colors"
                      >
                        {p.title}
                      </Link>
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-neutral-500 sm:text-base">{p.summary}</p>
                    {/* --ink-whisper (#737373), not text-neutral-400: #a3a3a3 on the
                        --hero-cream card measures 2.47, below the 4.5 text floor, on
                        every card of /blog and all 8 hubs. --ink-whisper is 4.64 there
                        and was retargeted in Phase 1 for exactly this. */}
                    <div className="mt-4 flex items-center gap-3 text-sm text-[var(--ink-whisper)]">
                      {p.date ? (
                        <time dateTime={p.date}>
                          {new Intl.DateTimeFormat("en-GB", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          }).format(new Date(p.date))}
                        </time>
                      ) : null}
                      <span aria-hidden>·</span>
                      <span>{readTime} min read</span>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>

          {/* Search results paginate too. The pager used to carry `&& !searchQuery`,
              which meant a search matching more than 12 articles rendered 12 and
              offered no way to the rest: cards 13..N keep `hidden`, so they are
              unreachable by scroll and by browser find. `handleSearchChange` already
              resets to page 1, and `totalPages` is computed off the filtered list,
              so clearing the search returns to the unfiltered first page. */}
          {totalPages > 1 && (
            <nav className="mt-8 sm:mt-12" aria-label="Pagination">
              <div className="flex items-center justify-center gap-2 flex-wrap">
                {currentPage > 1 && (
                  <button
                    onClick={() => setCurrentPage((p) => p - 1)}
                    className="min-h-[48px] min-w-[100px] px-4 border border-neutral-300 bg-white text-neutral-900 font-medium text-sm transition-colors hover:border-orange-500 hover:bg-orange-50"
                  >
                    Previous
                  </button>
                )}
                <span className="text-sm text-neutral-500 font-medium px-4 py-2">
                  Page {currentPage} of {totalPages}
                </span>
                {currentPage < totalPages && (
                  <button
                    onClick={() => setCurrentPage((p) => p + 1)}
                    className="min-h-[48px] min-w-[100px] px-4 border border-neutral-300 bg-white text-neutral-900 font-medium text-sm transition-colors hover:border-orange-500 hover:bg-orange-50"
                  >
                    Next
                  </button>
                )}
              </div>
            </nav>
          )}
        </>
      )}
    </div>
  );
}
