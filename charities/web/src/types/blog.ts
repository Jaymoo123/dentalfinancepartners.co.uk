export type BlogFaq = { question: string; answer: string };

/** Attribution for a hero image (e.g. a Pexels photo). */
export type ImageCredit = {
  photographer?: string;
  photographerUrl?: string;
  source?: string;
  sourceUrl?: string;
};

/**
 * Aligns with the estate-wide blog frontmatter shape (same as other sites).
 */
export type BlogFrontmatter = {
  title: string;
  slug: string;
  date: string;
  /** Date the post was last meaningfully edited/verified. Falls back to `date`. */
  updatedDate?: string;
  author: string;
  /** Optional slug for a future /team/[slug] author page; otherwise `author` is the label. */
  authorSlug?: string;
  category: string;
  metaTitle: string;
  metaDescription: string;
  altText?: string;
  image?: string;
  imageCredit?: ImageCredit;
  h1: string;
  summary: string;
  /**
   * Optional 3-5 bullet "Key takeaways" shown above the article and useful for
   * AI/voice extraction. Falls back to `summary` when absent.
   */
  keyTakeaways?: string[];
  /** Date the figures were last checked against primary sources; renders a trust line. */
  sourcesVerifiedAt?: string;
  /** Faceless editorial reviewer label (e.g. "<Brand> Editorial Review"). */
  reviewedBy?: string;
  /** Reviewer credentials, becomes the reviewer jobTitle in JSON-LD (e.g. "ICAEW-qualified review"). */
  reviewerCredentials?: string;
  /**
   * JSON-LD from frontmatter. YAML mappings parse to an object, so three posts
   * carry an object here while the schema builder emits a string. The blog post
   * renderer serialises the object case.
   */
  schema?: string | Record<string, unknown>;
  canonical?: string;
  faqs?: BlogFaq[];
  howToSteps?: { name: string; text: string }[];
};

export type BlogPost = BlogFrontmatter & {
  contentHtml: string;
};
