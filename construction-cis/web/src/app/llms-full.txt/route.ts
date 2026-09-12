import { buildLlmsFullRoute } from "@accounting-network/web-shared/content/llmsFull";
import { niche } from "@/config/niche-loader";
import { GLOSSARY } from "@/app/glossary/[slug]/data";
import { allTools } from "@/lib/calculators/registry";

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

/**
 * The calculator fleet, derived from the registry. It used to be a hand-typed
 * list and had drifted to 8 of the 12 live tools, so four calculators were
 * invisible to every AI retrieval of this file. Derived means it cannot drift
 * again: adding a tool to the registry adds it here.
 */
function buildCalculatorSection(domain: string): string {
  return allTools()
    .map((t) => `
- ${t.name} · https://${domain}/calculators/${t.slug}
  ${t.oneLiner}`)
    .join("");
}

const glossarySection = buildGlossarySection(niche.domain);
const calculatorSection = buildCalculatorSection(niche.domain);

export const GET = buildLlmsFullRoute({
  siteUrl: `https://${niche.domain}`,
  header: `# ${niche.display_name}, Full Content Reference

This file is a flat, machine-readable dump of every published post on
${niche.domain}. It exists for AI retrieval, training, and citation.
The structured index lives at https://${niche.domain}/llms.txt.

Editorial: each article states the tax year and the rates it is written against.
Rates change, and an older article may describe a superseded position, so always
check the date on the article and verify against gov.uk before acting. For advice
specific to your CIS position and tax affairs, see https://${niche.domain}/contact.

## FREE CIS CALCULATORS

The following free calculators are available on this site:
${calculatorSection}
${glossarySection}`,
  sections: [
    { dir: "blog", prefix: "blog", title: "BLOG POSTS" },
  ],
  // Calculator fleet listed in header above (they are dynamic routes, not markdown files)
});
