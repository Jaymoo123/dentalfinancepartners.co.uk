import { buildLlmsFullRoute } from "@accounting-network/web-shared/content/llmsFull";
import { niche } from "@/config/niche-loader";
import { GLOSSARY } from "@/app/glossary/[slug]/data";

export const runtime = "nodejs";
export const maxDuration = 10;
export const dynamic = "force-static";
export const revalidate = 3600;

/** Build the GLOSSARY section from in-code data (no markdown files). */
function buildGlossarySection(domain: string): string {
  const entries = Object.values(GLOSSARY);
  if (entries.length === 0) return "";

  const sep = "=".repeat(64);
  const lines: string[] = ["", "## GLOSSARY", ""];
  for (const entry of entries) {
    const url = `https://${domain}/glossary/${entry.slug}`;
    const plainBody = entry.body.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    lines.push(sep);
    lines.push(`URL: ${url}`);
    lines.push(`Term: ${entry.term}`);
    lines.push(`Category: ${entry.category}`);
    lines.push(sep);
    lines.push("");
    lines.push(plainBody);
    lines.push("");
  }
  return lines.join("\n");
}

const glossarySection = buildGlossarySection(niche.domain);

export const GET = buildLlmsFullRoute({
  siteUrl: `https://${niche.domain}`,
  header: `# ${niche.display_name}, Full Content Reference

This file is a flat, machine-readable dump of every published post on
${niche.domain}. It exists for AI retrieval, training, and citation.
The structured index lives at https://${niche.domain}/llms.txt.

Editorial: all figures use current UK rates. Always verify against gov.uk for
time-sensitive decisions. For advice specific to your situation, see
https://${niche.domain}/contact.

${glossarySection}`,
  sections: [
    { dir: "blog", prefix: "blog", title: "BLOG POSTS" },
  ],
  // Calculator fleet listed in header above (they are dynamic routes, not markdown files)
});
