/**
 * Loader for the gated written guides (one Markdown file per category under
 * content/resources/<topic>.md). SERVER-ONLY (reads the filesystem).
 *
 * The guides are rendered by the resources/[topic] route as NOINDEX pages; they
 * are the value behind the gate, deliberately kept out of the index so they never
 * compete with the ranking blog pages.
 */
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { addHeadingIds, extractHeadings } from "@/lib/markdown-utils";
import { enabledGuideTopics } from "@/lib/resources/registry";
import type { TopicKey } from "@/lib/intent/taxonomy";

const guidesDirectory = path.join(process.cwd(), "content", "resources");

export interface GuideFrontmatter {
  topic: string;
  title: string;
  summary?: string;
  version?: string;
  lastReviewed?: string;
}

export interface Guide {
  frontmatter: GuideFrontmatter;
  title: string;
  summary: string;
  html: string;
  headings: Array<{ id: string; text: string; level: number }>;
}

/**
 * Read + parse the guide for a topic. Returns null when the file is missing so
 * callers can 404 cleanly. The body is treated as HTML (the same convention as
 * the blog: frontmatter carries the metadata, the body is raw HTML).
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
      version: fm.version,
      lastReviewed: fm.lastReviewed,
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
export function publishedGuideTopics(): TopicKey[] {
  return enabledGuideTopics().filter((t) =>
    fs.existsSync(path.join(guidesDirectory, `${t}.md`)),
  );
}
