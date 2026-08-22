import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { BlogFrontmatter, BlogPost } from "@/types/blog";
import { addHeadingIds } from "./markdown-utils";
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
    date: fm.date ?? "",
    author: fm.author ?? "",
    category: fm.category ?? "General",
    metaTitle: fm.metaTitle ?? fm.title!,
    metaDescription: fm.metaDescription ?? "",
    altText: fm.altText,
    image: fm.image,
    h1: fm.h1 ?? fm.title!,
    summary: fm.summary ?? "",
    schema: fm.schema,
    canonical: fm.canonical,
    faqs: fm.faqs,
    reviewedBy: fm.reviewedBy,
    reviewerCredentials: fm.reviewerCredentials,
    reviewedAt: fm.reviewedAt,
    dateModified: fm.dateModified,
    howToSteps: fm.howToSteps,
    noindex: fm.noindex,
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

/**
 * Canonical display name per category slug, matching the ten hub pages under
 * /blog/<slug>. Post frontmatter is inconsistent about the same category
 * ("Incorporation & Company Structures" vs "Incorporation and Company
 * Structures", "Making Tax Digital MTD" vs "(MTD)"): the variants all slugify
 * to the same hub, but any card that renders `post.category` verbatim shows
 * whichever variant that file happens to carry. Render this name instead.
 */
const CANONICAL_CATEGORY_NAMES: Record<string, string> = {
  "capital-gains-tax": "Capital Gains Tax",
  "incorporation-and-company-structures": "Incorporation & Company Structures",
  "landlord-tax-essentials": "Landlord Tax Essentials",
  "making-tax-digital-mtd": "Making Tax Digital (MTD)",
  "non-resident-landlord-tax": "Non-Resident Landlord Tax",
  "portfolio-management": "Portfolio Management",
  "property-accountant-services": "Property Accountant Services",
  "property-finance": "Property Finance",
  "property-types-and-specialist-tax": "Property Types & Specialist Tax",
  "section-24-and-tax-relief": "Section 24 & Tax Relief",
};

export function categoryDisplayName(slug: string, fallback: string): string {
  return CANONICAL_CATEGORY_NAMES[slug] ?? fallback;
}

export function getAllCategories(): Array<{ slug: string; name: string; count: number }> {
  const posts = getAllPosts();
  const categoryMap = new Map<string, { name: string; count: number }>();

  for (const post of posts) {
    const slug = getCategorySlug(post);
    if (categoryMap.has(slug)) {
      categoryMap.get(slug)!.count++;
    } else {
      categoryMap.set(slug, { name: categoryDisplayName(slug, post.category), count: 1 });
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
