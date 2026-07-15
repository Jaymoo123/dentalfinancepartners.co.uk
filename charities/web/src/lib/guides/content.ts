import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { addHeadingIds, extractHeadings } from "@/lib/markdown-utils";

const guidesDirectory = path.join(process.cwd(), "content", "guides");

export interface GuideFrontmatter {
  slug?: string;
  title: string;
  summary?: string;
  version?: string;
  lastReviewed?: string;
  howToSteps?: { name: string; text: string }[];
}

export interface GuideHeading {
  id: string;
  text: string;
  level: number;
}

export interface Guide {
  slug: string;
  frontmatter: GuideFrontmatter;
  title: string;
  summary: string;
  html: string;
  headings: GuideHeading[];
  lastReviewed?: string;
  howToSteps?: { name: string; text: string }[];
}

export function getGuideBySlug(slug: string): Guide | null {
  const filePath = path.join(guidesDirectory, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const fm = data as Partial<GuideFrontmatter>;

  if (!fm.title) throw new Error(`Invalid guide frontmatter (missing title) in ${filePath}`);

  const html = addHeadingIds(content.trim());

  return {
    slug,
    frontmatter: {
      slug: fm.slug ?? slug,
      title: fm.title,
      summary: fm.summary,
      version: fm.version == null ? undefined : String(fm.version),
      lastReviewed: fm.lastReviewed == null ? undefined : String(fm.lastReviewed),
    },
    title: fm.title,
    summary: fm.summary ?? "",
    html,
    headings: extractHeadings(html),
    lastReviewed: fm.lastReviewed == null ? undefined : String(fm.lastReviewed),
    howToSteps: fm.howToSteps,
  };
}

export function getAllGuideSlugs(): string[] {
  if (!fs.existsSync(guidesDirectory)) return [];
  return fs.readdirSync(guidesDirectory).filter((f) => f.endsWith(".md")).map((f) => f.replace(/\.md$/, ""));
}

export function getAllGuides(): Guide[] {
  return getAllGuideSlugs().map((slug) => getGuideBySlug(slug)).filter((g): g is Guide => g !== null);
}
