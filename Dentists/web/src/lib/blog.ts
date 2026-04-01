import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { BlogFrontmatter, BlogPost } from "@/types/blog";
import { addHeadingIds } from "./markdown-utils";

const postsDirectory = path.join(process.cwd(), "content", "blog");

function parsePostFile(filePath: string): BlogPost {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const fm = data as Partial<BlogFrontmatter>;

  if (!fm.slug || !fm.title) {
    throw new Error(`Invalid blog frontmatter in ${filePath}`);
  }

  const contentWithIds = addHeadingIds(content.trim());

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
    contentHtml: contentWithIds,
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

export function getPostByCategoryAndSlug(categorySlug: string, articleSlug: string): BlogPost | null {
  const post = getPostBySlug(articleSlug);
  if (!post) return null;
  
  const postCategorySlug = slugifyCategory(post.category);
  if (postCategorySlug !== categorySlug) {
    return null;
  }
  
  return post;
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

export function slugifyCategory(category: string): string {
  return category
    .toLowerCase()
    .replace(/&/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function getCategorySlug(post: BlogPost): string {
  return slugifyCategory(post.category);
}

export function getAllCategories(): Array<{
  slug: string;
  name: string;
  count: number;
}> {
  const posts = getAllPosts();
  const categoryMap = new Map<string, { name: string; count: number }>();

  for (const post of posts) {
    const existing = categoryMap.get(post.category);
    if (existing) {
      existing.count++;
    } else {
      categoryMap.set(post.category, { name: post.category, count: 1 });
    }
  }

  return Array.from(categoryMap.entries())
    .map(([_, data]) => ({
      slug: slugifyCategory(data.name),
      name: data.name,
      count: data.count,
    }))
    .sort((a, b) => b.count - a.count);
}

export function calculateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const text = content.replace(/<[^>]*>/g, " ");
  const words = text.split(/\s+/).filter((w) => w.length > 0).length;
  return Math.ceil(words / wordsPerMinute);
}
