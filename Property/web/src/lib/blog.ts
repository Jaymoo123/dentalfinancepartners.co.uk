import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { BlogFrontmatter, BlogPost } from "@/types/blog";
import { addHeadingIds } from "./markdown-utils";
import { assertFrontmatter, STANDARD_MANIFEST } from "@accounting-network/web-shared/lib/frontmatter";
import { getGuideByTopic } from "./resources/content";
import { pageSummary } from "./page-summaries";
import type { RelatedArticleKind } from "@/components/blog/RelatedArticles";

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

/**
 * Related articles from the same category.
 *
 * `category` is matched on the CATEGORY SLUG, not on the raw frontmatter string. Three of
 * our ten categories carry a two-way spelling split in frontmatter ("Making Tax Digital
 * MTD" vs "(MTD)", "Incorporation and Company Structures" vs "&", "Property Types and
 * Specialist Tax" vs "&"), and while raw-string equality was the predicate those three
 * categories were each two disconnected related-article pools that could never reach one
 * another. Same root cause Phase 0.4 fixed for CTA_BY_CATEGORY. Slugifying both sides makes
 * the function immune to any future frontmatter spelling and accepts a slug or a display
 * name from a caller, since slugifying a slug is idempotent.
 */
export function getRelatedPosts(
  currentSlug: string,
  category: string,
  limit = 3,
): BlogPost[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  const wantedCategorySlug = slugifyCategory(category);

  const files = fs.readdirSync(postsDirectory).filter((f) => f.endsWith(".md"));
  const candidates: BlogPost[] = [];

  for (const file of files) {
    const filePath = path.join(postsDirectory, file);
    const raw = fs.readFileSync(filePath, "utf8");
    const { data } = matter(raw);
    const fm = data as Partial<BlogFrontmatter>;

    if (fm.slug === currentSlug) continue;
    if (!fm.category || slugifyCategory(fm.category) !== wantedCategorySlug) continue;
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

/**
 * Opening sentence of a post's body, for the related-article cards.
 *
 * The cards used to render `summary`, which is frontmatter written for search
 * rather than for a reader: across the corpus it ranges from one clean line to a
 * 130-word statute-citing block (`change-landlord-accountants.md`), so at a
 * fixed clamp the cards were a wall of text on some rows and a single line on
 * others. The body's first sentence is written to be read first and is
 * consistently a hook, which is what a card wants.
 *
 * Falls back to `summary` when a post opens on something that is not prose (a
 * table, a figure block), so a card never renders empty.
 */
export function firstSentence(contentHtml: string, fallback = ""): string {
  const text = contentHtml
    // Drop whole blocks that carry no opening prose, before tags are stripped:
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
  // "£3,000." do not cut a sentence in half. Abbreviations ending in a capital
  // (an initial, "U.K.") are rare enough in an opening line to accept.
  const sentences = text.split(/(?<=[.!?])\s+(?=[A-Z£"'(])/);

  // Take sentences until there is enough to be worth reading. 12 posts open on a
  // deliberate one-word answer ("No.", "Short answer.", "Two decades."), which is
  // good writing and a useless card on its own; the line that follows is the one
  // that explains it, so the card gets both.
  let excerpt = "";
  for (const s of sentences) {
    const next = excerpt ? `${excerpt} ${s}` : s;
    // Stop before a sentence that would blow the budget, unless we have nothing.
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

/**
 * Turn a page's curated `{ href, label }` link list into related-article cards,
 * resolving each blog href to its post so the card can carry an opening line.
 *
 * The curated LABEL is kept as the card title rather than the post's own title.
 * Those labels are hand-written anchor text on the site's only authored links
 * out into the blog clusters (carve-out 5), so swapping them for post titles
 * would rewrite the anchor text of every one of them as a side effect of a
 * styling change.
 *
 * An href that is not a blog post (a calculator, a pillar page) or one whose
 * post has since been renamed simply gets no excerpt: the card still renders and
 * the link still works, which is the right failure mode for a link list that
 * outlives any single post.
 */
export function relatedItemsFromLinks(
  links: Array<{ href: string; label: string; kind?: RelatedArticleKind }>,
): Array<{ href: string; title: string; excerpt?: string; kind?: RelatedArticleKind }> {
  return links.map(({ href, label, kind }) => {
    const base = { href, title: label, kind };

    const post = href.match(/^\/blog\/([^/]+)\/([^/?#]+)/);
    if (post) {
      const found = getPostByCategoryAndSlug(post[1], post[2]);
      return found
        ? { ...base, excerpt: firstSentence(found.contentHtml, found.summary) }
        : base;
    }

    // Resolved live rather than duplicated into `PAGE_SUMMARIES`: the guide
    // registry already holds the summary this page's own hero renders.
    const guide = href.match(/^\/resources\/([^/?#]+)/);
    if (guide) {
      const found = getGuideByTopic(guide[1]);
      return found?.summary ? { ...base, excerpt: found.summary } : base;
    }

    return { ...base, excerpt: pageSummary(href) };
  });
}

export function calculateReadTime(html: string): number {
  const text = html.replace(/<[^>]*>/g, " ");
  const words = text.split(/\s+/).filter((w) => w.length > 0).length;
  return Math.max(1, Math.round(words / 238));
}
