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
};

export type BlogPost = BlogFrontmatter & {
  contentHtml: string;
};
