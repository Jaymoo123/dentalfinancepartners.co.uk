/**
 * Pillar-guide content loader. Mirrors the blog.ts pattern but reads from
 * Solicitors/web/content/solicitor-guides/ instead of /blog/. Each .md file is a
 * 3,500-5,000 word long-form guide; the route renders at /solicitor-guides/[slug].
 */
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { addHeadingIds } from "./markdown-utils";

export type GuideFaq = { question: string; answer: string };

export type GuideFrontmatter = {
  title: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  date?: string;
  author?: string;
  eyebrow: string;
  summary: string;
  hero: string;
  faqs?: GuideFaq[];
  ctaTitle?: string;
  ctaBody?: string;
};

export type Guide = GuideFrontmatter & {
  contentHtml: string;
  wordCount: number;
};

const guidesDirectory = path.join(process.cwd(), "content", "solicitor-guides");

function parseGuideFile(filePath: string): Guide {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const fm = data as Partial<GuideFrontmatter>;
  if (!fm.slug || !fm.title) {
    throw new Error(`Invalid guide frontmatter in ${filePath}`);
  }
  const contentWithIds = addHeadingIds(content.trim());
  return {
    title: fm.title,
    slug: fm.slug,
    metaTitle: fm.metaTitle ?? fm.title,
    metaDescription: fm.metaDescription ?? "",
    date: fm.date ?? "",
    author: fm.author ?? "Accounts for Lawyers Editorial Team",
    eyebrow: fm.eyebrow ?? "Pillar guide",
    summary: fm.summary ?? "",
    hero: fm.hero ?? "",
    faqs: fm.faqs ?? [],
    ctaTitle: fm.ctaTitle ?? "Talk to a legal-sector specialist",
    ctaBody: fm.ctaBody ?? "30-minute scoping call. We will review your position and tell you honestly whether we are the right fit.",
    contentHtml: contentWithIds,
    wordCount: contentWithIds.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length,
  };
}

export function getAllGuides(): Guide[] {
  if (!fs.existsSync(guidesDirectory)) return [];
  return fs
    .readdirSync(guidesDirectory)
    .filter((f) => f.endsWith(".md"))
    .map((f) => parseGuideFile(path.join(guidesDirectory, f)))
    .sort((a, b) => a.title.localeCompare(b.title));
}

export function getGuideBySlug(slug: string): Guide | null {
  const filePath = path.join(guidesDirectory, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  return parseGuideFile(filePath);
}

export function getGuideSlugs(): string[] {
  if (!fs.existsSync(guidesDirectory)) return [];
  return fs
    .readdirSync(guidesDirectory)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}
