"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Clock } from "lucide-react";
import { focusRing } from "../layout-utils";
import { NumberedPagination } from "../primitives/NumberedPagination";

// Lightweight projection only: read times are precomputed server-side by the
// caller (e.g. BlogCategoryHub) so contentHtml never serializes into the
// client payload (the /blog FALLBACK_BODY_TOO_LARGE lesson).
export type HubArticle = {
  slug: string;
  title: string;
  summary?: string;
  readTime: number;
  /** Publication date. Our hubs have always shown one per card; the card meta
   *  row keeps it beside the read time rather than dropping it. */
  date?: string;
};

function formatUkDate(isoDate: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(isoDate));
}

/**
 * The category hub article grid, paginated client-side. Some hubs carry 150+
 * articles; without paging the grid buried the closing LeadCTAPanel a hundred
 * cards down. Page changes jump back to the top of the grid (instant, per the
 * site's reduced-motion posture).
 *
 * CARVE-OUT 5, and the reason this does NOT `slice()`.
 *
 * `NumberedPagination` renders `<button>`, not `<a href>`, so a sliced grid puts
 * pages 2..N behind client state and out of the server HTML entirely. The nine
 * hubs are the only full HTML crawl path to the ~750-post corpus (/blog itself
 * exposes 24), so slicing would have cut that to 108 crawlable article links.
 * The hubs were therefore shipped with paging disabled, which handed the reader
 * a 150-card wall instead.
 *
 * So every card stays in the server HTML and the off-page ones carry the
 * `hidden` attribute: crawlers still see every `<a href>` on first render,
 * assistive tech skips what is not on screen, and the reader gets twelve at a
 * time. Do not "optimise" this back into a slice.
 */
export function HubArticleList({
  posts,
  categorySlug,
  postsPerPage = 12,
}: {
  posts: HubArticle[];
  categorySlug: string;
  postsPerPage?: number;
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const topRef = useRef<HTMLDivElement>(null);

  const totalPages = Math.ceil(posts.length / postsPerPage);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    topRef.current?.scrollIntoView();
  };

  return (
    <div ref={topRef} className="scroll-mt-24">
      <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, i) => (
          <article
            key={post.slug}
            hidden={Math.floor(i / postsPerPage) + 1 !== currentPage}
            className="rounded-xl border border-slate-200 bg-white shadow-sm transition-all hover:border-primary-600 hover:shadow-md"
          >
            <Link
              href={`/blog/${categorySlug}/${post.slug}`}
              className={`flex h-full flex-col p-6 rounded-xl ${focusRing}`}
            >
              {/* Owner-tuned title treatment (see DESIGN_GUIDELINES §12): bold
                  at default tracking with snug leading, close to the
                  essential-guides card look but with enough line separation
                  for titles that run 3-5 lines. The important modifiers are
                  required to beat the unlayered global h1-h6 rule. */}
              <h3 className="text-base sm:text-lg font-bold! tracking-normal! leading-snug! text-slate-900 transition-colors hover:text-primary-700">
                {post.title}
              </h3>
              {post.summary ? (
                // flex-grow lives on the wrapper, not the clamped element:
                // when equal-height cards stretch a line-clamped box, the
                // "clamped" lines past the ellipsis become visible again.
                <div className="mt-3 mb-5 flex-grow">
                  <p className="text-sm leading-6 text-slate-600 line-clamp-3">{post.summary}</p>
                </div>
              ) : null}
              <p className="mt-auto inline-flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-500">
                <span className="inline-flex items-center gap-1.5">
                  <Clock aria-hidden className="h-3.5 w-3.5 text-primary-600" />
                  {post.readTime} min read
                </span>
                {post.date ? (
                  <time dateTime={post.date}>{formatUkDate(post.date)}</time>
                ) : null}
              </p>
            </Link>
          </article>
        ))}
      </div>
      {totalPages > 1 ? (
        <div className="mt-8 sm:mt-12">
          <NumberedPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={goToPage}
          />
        </div>
      ) : null}
    </div>
  );
}
