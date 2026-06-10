/**
 * llms-full.txt route factory for AI retrieval surfaces.
 * Returns a Next.js App Router GET handler.
 *
 * Usage in a route file:
 *
 *   export const dynamic = "force-static";
 *   export const revalidate = 3600;
 *   export const GET = buildLlmsFullRoute({
 *     siteUrl: "https://www.example.co.uk",
 *     header: "# My Site, Full Content Reference\n\n...",
 *     sections: [
 *       { dir: "fundamentals", prefix: "fundamentals", title: "PILLAR GUIDES" },
 *       { dir: "blog",         prefix: "blog",         title: "BLOG POSTS" },
 *     ],
 *   });
 */

import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type LlmsSection = {
  /** Sub-directory of content/ to read, e.g. "blog" or "fundamentals". */
  dir: string;
  /** URL prefix segment after the domain, e.g. "blog" or "fundamentals". */
  prefix: string;
  /** Section heading in the output, e.g. "BLOG POSTS". */
  title: string;
};

export type BuildLlmsFullRouteOptions = {
  siteUrl: string;
  /** Site-specific introductory header block (plain text). */
  header: string;
  sections: LlmsSection[];
};

function flattenMarkdown(md: string): string {
  return md
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/!\[[^\]]*]\([^)]*\)/g, "")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/\[([^\]]+)]\([^)]+\)/g, "$1")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function readMarkdownDir(
  contentRoot: string,
  rel: string,
  siteUrl: string,
  prefix: string,
): string {
  const dir = path.join(contentRoot, rel);
  if (!fs.existsSync(dir)) return "";
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
  const parts: string[] = [];
  const base = siteUrl.replace(/\/$/, "");
  for (const file of files) {
    const raw = fs.readFileSync(path.join(dir, file), "utf8");
    const { data, content } = matter(raw);
    const slug = (data.slug as string) || file.replace(/\.md$/, "");
    const title = (data.title as string) || slug;
    const summary =
      (data.summary as string) || (data.metaDescription as string) || "";
    const url = `${base}/${prefix}/${slug}`;
    parts.push(
      [
        "",
        "================================================================",
        `URL: ${url}`,
        `Title: ${title}`,
        summary ? `Summary: ${summary}` : null,
        "================================================================",
        "",
        flattenMarkdown(content),
      ]
        .filter(Boolean)
        .join("\n"),
    );
  }
  return parts.join("\n\n");
}

export function buildLlmsFullRoute(opts: BuildLlmsFullRouteOptions) {
  return async function GET() {
    const contentRoot = path.join(process.cwd(), "content");
    const generatedAt = new Date().toISOString();
    const parts: string[] = [opts.header, `Generated: ${generatedAt}\n`];

    for (const section of opts.sections) {
      const content = readMarkdownDir(
        contentRoot,
        section.dir,
        opts.siteUrl,
        section.prefix,
      );
      if (content) {
        parts.push(`\n\n## ${section.title}\n\n`, content);
      }
    }

    return new Response(parts.join(""), {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        "X-Robots-Tag": "all",
      },
    });
  };
}
