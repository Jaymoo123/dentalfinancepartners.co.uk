export type BlogFaq = { question: string; answer: string };

export type BlogFrontmatter = {
  title: string;
  slug: string;
  date: string;
  author: string;
  category: string;
  metaTitle: string;
  metaDescription: string;
  altText?: string;
  image?: string;
  h1: string;
  summary: string;
  schema?: string;
  canonical?: string;
  faqs?: BlogFaq[];
  /**
   * WS8 surface: key takeaways to render above the article body.
   * Optional: 0/73 posts have this field currently; the surface tolerates
   * absence gracefully and falls back to rendering post.summary.
   */
  keyTakeaways?: string[];
  /**
   * WS8 surface: date the article was last updated (ISO date string).
   * Optional. When present and different from `date`, shows an "Updated" line.
   */
  updatedDate?: string;
  /**
   * WS8 surface: date figures were last verified against primary sources
   * (HMRC, legislation.gov.uk, NHS BSA). ISO date string.
   * Optional: 0/73 posts have this field currently.
   */
  sourcesVerifiedAt?: string;
};

export type BlogPost = BlogFrontmatter & {
  contentHtml: string;
};
