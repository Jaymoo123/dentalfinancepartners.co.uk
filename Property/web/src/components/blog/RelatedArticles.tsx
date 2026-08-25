import Link from "next/link";

/**
 * The one article-card grid used by every "Related reading" / "Related articles"
 * block on the site.
 *
 * Before this existed there were four of them, none matching: the blog post foot
 * rendered rounded slate cards with a three-line summary, /locations/[slug]
 * rendered square cards with the same summary, and the two service pages
 * rendered bare title pills with no excerpt at all. Same job, four designs, and
 * three different hover treatments (border swap, ring swap, shadow lift).
 *
 * The card is a plain block, not a `<Link>` wrapping everything: an anchor is
 * inline by default, so a padded card built on one overlaps its neighbours (the
 * same trap `CalculatorLinkCards` documents). The title carries the link and a
 * `::after` stretches its hit area over the whole card, which keeps one link per
 * card in the accessibility tree while the whole card stays clickable.
 *
 * `excerpt` is the article's opening sentence via `firstSentence`, not the
 * frontmatter summary. Callers that only hold a curated {href, label} pair pass
 * the label as `title` deliberately: those labels are hand-written anchor text
 * carrying topical equity (carve-out 5), so they are NOT replaced with the post's
 * own title.
 *
 * Server component. The glow is CSS hover, so there is no JavaScript here at all.
 */
/**
 * What the card points at, shown as a pill above the title.
 *
 * The pill exists so a reader can tell at a glance that a card is something to
 * READ rather than another section of the page they are on. It is derived from
 * the href rather than chosen per card, so it can never disagree with where the
 * link actually goes.
 *
 * It is deliberately NOT always "Article". These grids mix blog posts with
 * calculators, hubs and service pages, and labelling a calculator "Article"
 * would be a worse lie than no label at all. A target that is none of the known
 * kinds simply gets no pill.
 */
export type RelatedArticleKind = "article" | "calculator" | "guide" | "service";

const KIND_LABELS: Record<RelatedArticleKind, string> = {
  article: "Article",
  calculator: "Calculator",
  guide: "Guide",
  service: "Service",
};

/** Derive the pill from the destination. Exported so callers can reuse it. */
export function kindFromHref(href: string): RelatedArticleKind | undefined {
  const path = href.split(/[?#]/)[0];
  // Two segments under /blog is a post. ONE segment is a category hub, which is
  // an index of articles rather than an article itself, so it must not say
  // "Article" — it is a collection of guides, and reads as one.
  if (/^\/blog\/[^/]+\/[^/]+/.test(path)) return "article";
  if (/^\/blog\/[^/]+\/?$/.test(path)) return "guide";
  if (/^\/calculators\/[^/]+/.test(path)) return "calculator";
  if (/^\/resources\/[^/]+/.test(path)) return "guide";
  if (/^\/services\/[^/]+/.test(path)) return "service";
  return undefined;
}

export type RelatedArticleItem = {
  href: string;
  title: string;
  /** Opening sentence. Omitted when the target is not a blog post. */
  excerpt?: string;
  /** Overrides the href-derived pill. Omit unless the derivation is wrong. */
  kind?: RelatedArticleKind;
};

export function RelatedArticles({
  items,
  columns = 2,
  className = "",
}: {
  items: RelatedArticleItem[];
  /** 2 on a full-width section, 3 where the row has the space for it. */
  columns?: 2 | 3;
  className?: string;
}) {
  if (items.length === 0) return null;

  return (
    <ul
      className={`grid gap-4 sm:gap-5 ${
        columns === 3 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2"
      } ${className}`}
    >
      {items.map((item) => {
        const kind = item.kind ?? kindFromHref(item.href);
        return (
        <li key={item.href} className="relative flex">
          <div className="related-card relative flex h-full w-full flex-col rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
            {kind ? (
              <p className="mb-2.5 inline-flex w-fit items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-600">
                {/* Decorative dot only: the label beside it already carries the
                    meaning, and a second announced element would just repeat it. */}
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                {KIND_LABELS[kind]}
              </p>
            ) : null}
            <h3 className="text-base font-bold! leading-snug! tracking-normal! text-slate-900 sm:text-lg">
              <Link
                href={item.href}
                className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
              >
                {item.title}
              </Link>
            </h3>
            {item.excerpt ? (
              <p className="mt-2.5 text-sm leading-6 text-slate-600 line-clamp-3">{item.excerpt}</p>
            ) : null}
          </div>
        </li>
        );
      })}
    </ul>
  );
}
