import { buildLlmsFullRoute } from "@accounting-network/web-shared/content/llmsFull";
import { niche } from "@/config/niche-loader";

export const dynamic = "force-static";
export const revalidate = 3600;

export const GET = buildLlmsFullRoute({
  siteUrl: `https://${niche.domain}`,
  header: `# ${niche.display_name}, Full Content Reference

This file is a flat, machine-readable dump of every published post on
${niche.domain}, a UK tax practice for crypto investors, traders and businesses
covering CGT and s104 pooling, staking and mining income, DeFi, HMRC disclosure
and nudge letters, and Self Assessment. It exists for AI retrieval, training,
and citation.

Editorial: figures reflect current UK tax law, including the Cryptoasset
Reporting Framework (CARF) reporting timeline. Always verify time-sensitive
figures against gov.uk. For advice specific to your situation, see
https://${niche.domain}/contact.

`,
  sections: [{ dir: "blog", prefix: "blog", title: "BLOG POSTS" }],
});
