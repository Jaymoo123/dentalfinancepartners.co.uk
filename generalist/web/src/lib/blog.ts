import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { BlogFrontmatter, BlogPost } from "@/types/blog";
import { addHeadingIds } from "@accounting-network/web-shared/content/markdown-utils";
import { assertFrontmatter, STANDARD_MANIFEST } from "@accounting-network/web-shared/lib/frontmatter";

const postsDirectory = path.join(process.cwd(), "content", "blog");

function parsePostFile(filePath: string): BlogPost {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  // CT-02: throws naming file + field if any required frontmatter is missing.
  assertFrontmatter(data as Record<string, unknown>, STANDARD_MANIFEST, filePath);
  const fm = data as Partial<BlogFrontmatter>;

  const contentWithIds = addHeadingIds(content.trim());

  return {
    title: fm.title!,
    slug: fm.slug!,
    date: fm.date!,
    updatedDate: fm.updatedDate,
    author: fm.author ?? "",
    authorSlug: fm.authorSlug,
    category: fm.category!,
    metaTitle: fm.metaTitle ?? fm.title!,
    metaDescription: fm.metaDescription!,
    altText: fm.altText,
    image: fm.image,
    imageCredit: fm.imageCredit,
    h1: fm.h1 ?? fm.title!,
    summary: fm.summary ?? "",
    keyTakeaways: fm.keyTakeaways,
    schema: fm.schema,
    canonical: fm.canonical,
    faqs: fm.faqs,
    howToSteps: fm.howToSteps,
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

export function getRelatedPosts(
  currentSlug: string,
  category: string,
  limit = 3,
): BlogPost[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const files = fs.readdirSync(postsDirectory).filter((f) => f.endsWith(".md"));
  const candidates: BlogPost[] = [];

  for (const file of files) {
    const filePath = path.join(postsDirectory, file);
    const raw = fs.readFileSync(filePath, "utf8");
    const { data } = matter(raw);
    const fm = data as Partial<BlogFrontmatter>;

    if (fm.slug === currentSlug) continue;
    if (fm.category !== category) continue;
    if (!fm.slug || !fm.title) continue;

    candidates.push(parsePostFile(filePath));
  }

  return candidates
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}

export function slugifyCategory(category: string): string {
  return category
    .toLowerCase()
    .replace(/[()]/g, "")
    .replace(/&/g, "and")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-")
    .trim();
}

export function getCategorySlug(post: BlogPost): string {
  return slugifyCategory(post.category);
}

export function getPostByCategoryAndSlug(
  categorySlug: string,
  articleSlug: string,
): BlogPost | null {
  const post = getPostBySlug(articleSlug);
  if (!post) return null;
  if (getCategorySlug(post) !== categorySlug) return null;
  return post;
}

export function getAllCategories(): Array<{ slug: string; name: string; count: number }> {
  const posts = getAllPosts();
  const categoryMap = new Map<string, { name: string; count: number }>();

  for (const post of posts) {
    const slug = getCategorySlug(post);
    if (categoryMap.has(slug)) {
      categoryMap.get(slug)!.count++;
    } else {
      categoryMap.set(slug, { name: post.category, count: 1 });
    }
  }

  return Array.from(categoryMap.entries())
    .map(([slug, data]) => ({ slug, name: data.name, count: data.count }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Opening sentence of a post, for related-article cards. Ported from Property,
 * where it feeds the same grid: the frontmatter summary is written for search,
 * the opening line is written for a reader.
 */
export function firstSentence(contentHtml: string, fallback = ""): string {
  const text = contentHtml
    // Drop whole blocks that carry no opening prose before tags are stripped:
    // an opening table or list would otherwise contribute its first cell.
    .replace(/<(table|ul|ol|figure|blockquote|pre)[\s\S]*?<\/\1>/gi, " ")
    .replace(/<[^>]*>/g, " ")
    // Markdown leftovers: ATX headings, emphasis, link syntax, list bullets.
    .replace(/^#{1,6}\s+.*$/gm, " ")
    .replace(/^\s*[-*+]\s+/gm, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[*_`]/g, "")
    .replace(/&(nbsp|amp|lt|gt|#39|quot);/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  // Split on a terminator followed by a space and a capital, so "s.9A." and
  // "£3,000." do not cut a sentence in half.
  const sentences = text.split(/(?<=[.!?])\s+(?=[A-Z£"'(])/);

  // Take sentences until there is enough to be worth reading: posts that open
  // on a deliberate one-word answer ("No.") need the line that explains it too.
  let excerpt = "";
  for (const s of sentences) {
    const next = excerpt ? `${excerpt} ${s}` : s;
    if (excerpt && next.length > 320) break;
    excerpt = next;
    if (excerpt.length >= 40) break;
  }
  excerpt = excerpt.trim();

  const fb = fallback.trim();
  const usable = (s: string) => s.length >= 40 && s.length <= 320;
  if (usable(excerpt)) return excerpt;
  if (usable(fb)) return fb;
  return excerpt || fb;
}

export function calculateReadTime(html: string): number {
  const text = html.replace(/<[^>]*>/g, " ");
  const words = text.split(/\s+/).filter((w) => w.length > 0).length;
  return Math.max(1, Math.round(words / 238));
}
