import { referencedOrganization } from "./organization";
import { buildOgImageUrl } from "./og";
import type { ArticleInput, SchemaThing, SiteSchemaOpts } from "./types";

const SPEAKABLE = {
  "@type": "SpeakableSpecification" as const,
  cssSelector: [".tldr", "h1"],
};

/**
 * Article schema for pillar guides and evergreen long-form content. More
 * authoritative than BlogPosting; signals evergreen content to crawlers.
 */
export function buildArticle(
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
    "@type": "Article",
    "@id": `${url}#article`,
    headline: post.h1,
    description: post.metaDescription,
    image: imageUrl,
    datePublished: post.date,
    dateModified,
    author,
    publisher: referencedOrganization(opts),
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    articleSection: post.category,
    inLanguage: "en-GB",
    speakable: SPEAKABLE,
    isAccessibleForFree: true,
  };
}
