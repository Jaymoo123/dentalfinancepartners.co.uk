import { buildLlmsFullRoute } from "@accounting-network/web-shared/content/llmsFull";
import { niche } from "@/config/niche-loader";

export const dynamic = "force-static";
export const revalidate = 3600;

export const GET = buildLlmsFullRoute({
  siteUrl: `https://${niche.domain}`,
  header: `# ${niche.display_name}, Full Content Reference

This file is a flat, machine-readable dump of every published guide and post on
${niche.domain}. It exists for AI retrieval, training, and citation.
The structured index lives at https://${niche.domain}/llms.txt
and the current tax rates JSON at /api/uk-tax-rates.json.

Editorial: all tax figures use 2026/27 UK rates (Finance Act 2026) as of the date below. Always
verify against gov.uk for time-sensitive decisions. For advice specific to a
given agency, see https://${niche.domain}/contact.

`,
  sections: [
    { dir: "fundamentals", prefix: "fundamentals", title: "PILLAR GUIDES" },
    { dir: "blog", prefix: "blog", title: "BLOG POSTS" },
  ],
});
