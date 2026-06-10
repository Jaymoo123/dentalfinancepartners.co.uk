import { referencedOrganization } from "./organization";
import { buildOgImageUrl } from "./og";
import type { ArticleInput, SchemaThing, SiteSchemaOpts } from "./types";

const SPEAKABLE = {
  "@type": "SpeakableSpecification" as const,
  cssSelector: [".tldr", "h1"],
};

/**
 * BlogPosting for individual blog posts. Includes Person author (pre-resolved by
 * the caller), speakable specification on the TL;DR box, dateModified from
 * `updatedDate`/`dateModified` (fallback to `date`), and `isAccessibleForFree`.
 *
 * Pair with `buildFaqPage` from a post's `faqs` to produce both records.
 */
export function buildBlogPosting(
  post: ArticleInput,
  path: string,
  opts: SiteSchemaOpts,
  author: SchemaThing,
): SchemaThing {
  const url = `${opts.siteUrl}${path}`;
  const imageUrl = post.image
    ? post.image.startsWith("http")
      ? post.image
      : `${opts.siteUrl}${post.image}`
    : buildOgImageUrl(post.h1, opts, post.category);

  const dateModified = post.dateModified ?? post.updatedDate ?? post.date;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: post.h1,
    description: post.metaDescription,
    image: imageUrl,
    datePublished: post.date,
    dateModified,
    author,
    ...(post.reviewedBy?.trim()
      ? {
          reviewedBy: {
            "@type": "Person",
            name: post.reviewedBy,
            ...(post.reviewerCredentials?.trim()
              ? { jobTitle: post.reviewerCredentials }
              : {}),
          },
        }
      : {}),
    publisher: referencedOrganization(opts),
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    articleSection: post.category,
    inLanguage: "en-GB",
    speakable: SPEAKABLE,
    isAccessibleForFree: true,
  };
}
