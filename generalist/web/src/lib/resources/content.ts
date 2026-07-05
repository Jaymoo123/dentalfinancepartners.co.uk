/**
 * Loader for the gated written guides (one Markdown file per category under
 * content/resources/<topic>.md). SERVER-ONLY (reads the filesystem).
 *
 * Uses gray-matter to split frontmatter from the HTML body, then addHeadingIds()
 * from the shared package (same helper used by lib/blog.ts) so in-page anchors
 * work. The generalist site does not have a local @/lib/markdown-utils; instead
 * we route through @accounting-network/web-shared/content/markdown-utils.
 *
 * TOC: we provide a minimal local heading extractor since we cannot guarantee
 * extractHeadings is exported from the shared package without confirming at
 * build time.
 */
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { addHeadingIds } from "@accounting-network/web-shared/content/markdown-utils";
import { publishedGuideTopics } from "@/lib/resources/registry";

const guidesDirectory = path.join(process.cwd(), "content", "resources");

export interface GuideFrontmatter {
  topic: string;
  title: string;
  summary?: string;
  version?: string;
  lastReviewed?: string;
}

export interface GuideHeading {
  id: string;
  text: string;
  level: number;
}

export interface Guide {
  frontmatter: GuideFrontmatter;
  title: string;
  summary: string;
  html: string;
  headings: GuideHeading[];
}

/** Minimal heading extractor — parses id + text from h2/h3 tags in the HTML. */
function extractHeadings(html: string): GuideHeading[] {
  // Capture the whole opening tag, then pull id out of it separately: the
  // single-regex optional id group can mis-anchor when other attributes
  // surround id (QA finding).
  const re = /<h([23])([^>]*)>([^<]*)<\/h[23]>/gi;
  const headings: GuideHeading[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    const level = parseInt(m[1], 10);
    const idMatch = /id="([^"]*)"/.exec(m[2]);
    const id = idMatch?.[1] ?? "";
    const text = m[3].replace(/<[^>]+>/g, "").trim();
    if (text) headings.push({ id, text, level });
  }
  return headings;
}

/**
 * Read + parse the guide for a topic. Returns null when the file is missing so
 * callers can 404 cleanly.
 */
export function getGuideByTopic(topic: string): Guide | null {
  const filePath = path.join(guidesDirectory, `${topic}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const fm = data as Partial<GuideFrontmatter>;

  if (!fm.title) {
    throw new Error(`Invalid guide frontmatter (missing title) in ${filePath}`);
  }

  const html = addHeadingIds(content.trim());

  return {
    frontmatter: {
      topic: fm.topic ?? topic,
      title: fm.title,
      summary: fm.summary,
      version: fm.version == null ? undefined : String(fm.version),
      lastReviewed: fm.lastReviewed == null ? undefined : String(fm.lastReviewed),
    },
    title: fm.title,
    summary: fm.summary ?? "",
    html,
    headings: extractHeadings(html),
  };
}

/**
 * The topic slugs that have an ENABLED guide AND an authored Markdown file.
 * Used for generateStaticParams so the route only prerenders real guides.
 */
export function publishedGuideTopicsWithFile(): string[] {
  return publishedGuideTopics().filter((t) =>
    fs.existsSync(path.join(guidesDirectory, `${t}.md`)),
  );
}
