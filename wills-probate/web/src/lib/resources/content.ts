/**
 * Loader for the gated written guides (one Markdown file per topic under
 * content/resources/<topic>.md). SERVER-ONLY (reads the filesystem).
 *
 * Uses gray-matter to split frontmatter from the HTML body, then addHeadingIds()
 * from the site-local @/lib/markdown-utils (which exports addHeadingIds and
 * extractHeadings). Both are imported directly from the local module.
 *
 * Loader coerces dates via String() to handle YAML date objects gracefully.
 * generateStaticParams from publishedGuideTopicsWithFile(): only guides that
 * are enabled AND have a file on disk are pre-rendered; 404 when the file is missing.
 */
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { addHeadingIds, extractHeadings } from "@/lib/markdown-utils";
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
      // Coerce YAML date objects to string: String(date) is safe for both string + Date.
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
