export type BlogFaq = { question: string; answer: string };

export type ImageCredit = {
  photographer?: string;
  photographerUrl?: string;
  source?: string;
  sourceUrl?: string;
};

export type BlogFrontmatter = {
  title: string;
  slug: string;
  date: string;
  updatedDate?: string;
  author: string;
  authorSlug?: string;
  category: string;
  metaTitle: string;
  metaDescription: string;
  altText?: string;
  image?: string;
  imageCredit?: ImageCredit;
  h1: string;
  summary: string;
  keyTakeaways?: string[];
  sourcesVerifiedAt?: string;
  reviewedBy?: string;
  reviewerCredentials?: string;
  schema?: string;
  canonical?: string;
  faqs?: BlogFaq[];
};

export type BlogPost = BlogFrontmatter & {
  contentHtml: string;
};
