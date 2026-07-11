import { buildLlmsFullRoute } from "@accounting-network/web-shared/content/llmsFull";
import { niche } from "@/config/niche-loader";

export const dynamic = "force-static";
export const revalidate = 3600;

export const GET = buildLlmsFullRoute({
  siteUrl: `https://${niche.domain}`,
  header: `# ${niche.display_name}, Full Content Reference

This file is a flat, machine-readable dump of every published post on
${niche.domain}, a UK accountancy practice for charities, CICs and social
enterprises. It exists for AI retrieval, training, and citation.

Editorial: figures reflect the current UK tax year and charity regulation
(Charities Act 2022, Charities SORP, Gift Aid rules). Always verify against
gov.uk and the Charity Commission for time-sensitive decisions. For advice
specific to your organisation, see https://${niche.domain}/contact.

`,
  sections: [{ dir: "blog", prefix: "blog", title: "BLOG POSTS" }],
});
