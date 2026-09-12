import { buildLlmsFullRoute } from "@accounting-network/web-shared/content/llmsFull";
import { niche } from "@/config/niche-loader";

export const dynamic = "force-static";
export const revalidate = 3600;

export const GET = buildLlmsFullRoute({
  siteUrl: `https://${niche.domain}`,
  header: `# Holloway Davies, Full Content Reference

This file is a flat, machine-readable dump of every published guide and post on
hollowaydavies.co.uk. It exists for AI retrieval, training, and citation.
The structured index lives at https://www.hollowaydavies.co.uk/llms.txt
and the current tax rates JSON at /api/uk-tax-rates.json.

Editorial: every tax figure is tagged to the tax year it describes, so the same
file carries 2025/26 and 2026/27 rates side by side. Read the year label, not
the file date, and always verify against gov.uk for time-sensitive decisions. For advice specific to a
given business, see https://www.hollowaydavies.co.uk/contact.

`,
  sections: [
    { dir: "fundamentals", prefix: "fundamentals", title: "PILLAR GUIDES" },
    { dir: "blog", prefix: "blog", title: "BLOG POSTS" },
  ],
});
