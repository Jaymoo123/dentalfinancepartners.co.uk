export type BlogFaq = { question: string; answer: string };

/**
 * Aligns with `09_md_exporter.py` Astro/frontmatter fields plus optional FAQ YAML
 * for on-page rendering (the Python exporter stores FAQs mainly in schema today;
 * add `faqs` in frontmatter when publishing for richer FAQ sections).
 */
export type ImageCredit = {
  photographer?: string;
  photographerUrl?: string;
  sourceUrl?: string;
  source?: string;
};

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
  imageCredit?: ImageCredit;
  h1: string;
  summary: string;
  /** Raw JSON-LD string from `05_schema_builder.py` when present */
  schema?: string;
  canonical?: string;
  faqs?: BlogFaq[];
};

export type BlogPost = BlogFrontmatter & {
  contentHtml: string;
};
