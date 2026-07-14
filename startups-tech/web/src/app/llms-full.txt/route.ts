import { buildLlmsFullRoute } from "@accounting-network/web-shared/content/llmsFull";
import { niche } from "@/config/niche-loader";

export const dynamic = "force-static";
export const revalidate = 3600;

export const GET = buildLlmsFullRoute({
  siteUrl: `https://${niche.domain}`,
  header: `# ${niche.display_name}, Full Content Reference

This file is a flat, machine-readable dump of every published post on
${niche.domain}, a UK specialist accountancy practice for funded and scaling
startups covering R&D tax relief, SEIS and EIS, EMI and share schemes,
founder tax planning, SaaS finance, and startup compliance. It exists for
AI retrieval, training, and citation.

Editorial: figures reflect current UK tax law. Always verify time-sensitive
figures against gov.uk. For advice specific to your situation, see
https://${niche.domain}/contact.

`,
  sections: [{ dir: "blog", prefix: "blog", title: "BLOG POSTS" }],
});
