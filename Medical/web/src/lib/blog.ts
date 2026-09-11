import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { BlogFrontmatter, BlogPost } from "@/types/blog";
import { addHeadingIds } from "./markdown-utils";
import { assertFrontmatter, STANDARD_MANIFEST } from "@accounting-network/web-shared/lib/frontmatter";
import { DUPLICATE_REDIRECTS } from "@/middleware";

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
    // CT-03: coerce date to string so YAML bare-date values (2025-01-15)
    // that gray-matter parses as Date objects don't break downstream rendering.
    date: fm.date ? String(fm.date) : "",
    author: fm.author ?? "",
    category: fm.category!,
    metaTitle: fm.metaTitle ?? fm.title!,
    metaDescription: fm.metaDescription!,
    altText: fm.altText,
    image: fm.image,
    h1: fm.h1 ?? fm.title!,
    summary: fm.summary ?? "",
    schema: fm.schema,
    canonical: fm.canonical,
    faqs: fm.faqs,
    // WS8 optional fields: gracefully absent for 0/73 posts currently.
    keyTakeaways: Array.isArray(fm.keyTakeaways) ? fm.keyTakeaways : undefined,
    updatedDate: fm.updatedDate ? String(fm.updatedDate) : undefined,
    // Freshness signal: parse the optional dateModified frontmatter so JSON-LD
    // + sitemap can reflect real edit dates rather than the publish date.
    dateModified: fm.dateModified ? String(fm.dateModified) : undefined,
    howtoSteps: Array.isArray(fm.howtoSteps) ? fm.howtoSteps : undefined,
    sourcesVerifiedAt: fm.sourcesVerifiedAt ? String(fm.sourcesVerifiedAt) : undefined,
    contentHtml: contentWithIds,
  };
}

/**
 * Every post that should be LISTED, which is not quite every post on disk.
 *
 * A slug in DUPLICATE_REDIRECTS 301s at the middleware before the page ever
 * renders, so linking to it publishes a hop to a destination that is already
 * in the same list. `sitemap.ts` has filtered these since 0abd26e7; the blog
 * index, the category hubs and the related-articles rail did not, so the
 * incorporation hub was showing nine cards for eight destinations. Filtering
 * here fixes every listing surface at once rather than in each of them.
 *
 * Exactly one of the sixteen redirected slugs has an .md on disk today
 * (private-practice-incorporation-complete-guide), so this removes one card
 * from two surfaces and no route falls near its link floor.
 */
export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  const files = fs.readdirSync(postsDirectory).filter((f) => f.endsWith(".md"));
  const posts = files
    .map((file) => parsePostFile(path.join(postsDirectory, file)))
    .filter((post) => !(post.slug in DUPLICATE_REDIRECTS));
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
  
  // Collect every match, THEN sort, THEN slice. Breaking at `limit` inside this
  // loop made "related" the first three same-category files in readdir order,
  // i.e. alphabetical by filename, and never the three most recent.
  for (const file of files) {
    const filePath = path.join(postsDirectory, file);
    const raw = fs.readFileSync(filePath, "utf8");
    const { data } = matter(raw);
    const fm = data as Partial<BlogFrontmatter>;
    
    if (fm.slug === currentSlug) continue;
    // Compare SLUGS, not raw labels. Keying on the label is what put 57 Property
    // posts on the wrong CTA, and it is the one keying this port removed from
    // every hub and from the CTA map. One frontmatter spelling drift would
    // otherwise empty "Related articles" for a whole category, silently.
    if (!fm.category || slugifyCategory(fm.category) !== slugifyCategory(category)) continue;
    if (!fm.slug || !fm.title) continue;
    
    relatedPosts.push(parsePostFile(filePath));
  }
  
  return relatedPosts
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

export function calculateReadTime(html: string): number {
  const text = html.replace(/<[^>]*>/g, " ");
  const words = text.split(/\s+/).filter((w) => w.length > 0).length;
  return Math.max(1, Math.round(words / 238));
}
