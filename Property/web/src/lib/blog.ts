import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { BlogFrontmatter, BlogPost } from "@/types/blog";

const postsDirectory = path.join(process.cwd(), "content", "blog");

function parsePostFile(filePath: string): BlogPost {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const fm = data as Partial<BlogFrontmatter>;

  if (!fm.slug || !fm.title) {
    throw new Error(`Invalid blog frontmatter in ${filePath}`);
  }

  return {
    title: fm.title,
    slug: fm.slug,
    date: fm.date ?? "",
    author: fm.author ?? "",
    category: fm.category ?? "General",
    metaTitle: fm.metaTitle ?? fm.title,
    metaDescription: fm.metaDescription ?? "",
    altText: fm.altText,
    image: fm.image,
    h1: fm.h1 ?? fm.title,
    summary: fm.summary ?? "",
    schema: fm.schema,
    canonical: fm.canonical,
    faqs: fm.faqs,
    contentHtml: content.trim(),
  };
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  const files = fs.readdirSync(postsDirectory).filter((f) => f.endsWith(".md"));
  const posts = files.map((file) =>
    parsePostFile(path.join(postsDirectory, file)),
  );
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(postsDirectory, `${slug}.md`);
  if (!fs.existsSync(filePath)) {
    return null;
  }
  return parsePostFile(filePath);
}

export function getRelatedPosts(
  currentSlug: string,
  category: string,
  limit = 3,
): BlogPost[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  
  const files = fs.readdirSync(postsDirectory).filter((f) => f.endsWith(".md"));
  const relatedPosts: BlogPost[] = [];
  
  for (const file of files) {
    if (relatedPosts.length >= limit) break;
    
    const filePath = path.join(postsDirectory, file);
    const raw = fs.readFileSync(filePath, "utf8");
    const { data } = matter(raw);
    const fm = data as Partial<BlogFrontmatter>;
    
    if (fm.slug === currentSlug) continue;
    if (fm.category !== category) continue;
    if (!fm.slug || !fm.title) continue;
    
    relatedPosts.push(parsePostFile(filePath));
  }
  
  return relatedPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}
