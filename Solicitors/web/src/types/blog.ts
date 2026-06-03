export type BlogFaq = { question: string; answer: string };

export type BlogImageCredit = {
  photographer?: string;
  photographerUrl?: string;
  source?: string;
  sourceUrl?: string;
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
  h1: string;
  summary: string;
  schema?: string;
  canonical?: string;
  faqs?: BlogFaq[];
  /** Optional: ISO date the post was last substantively updated. */
  updatedDate?: string;
  /** Optional: 3 to 5 short "key takeaways" bullets shown above the body. */
  keyTakeaways?: string[];
  /** Optional: image attribution shown in the hero. */
  imageCredit?: BlogImageCredit;
};

export type BlogPost = BlogFrontmatter & {
  contentHtml: string;
};
