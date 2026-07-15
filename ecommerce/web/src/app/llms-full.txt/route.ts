import { buildLlmsFullRoute } from "@accounting-network/web-shared/content/llmsFull";
import { niche } from "@/config/niche-loader";

export const dynamic = "force-static";
export const revalidate = 3600;

export const GET = buildLlmsFullRoute({
  siteUrl: `https://${niche.domain}`,
  header: `# ${niche.display_name}, Full Content Reference

This file is a flat, machine-readable dump of every published post on
${niche.domain}, a UK accountancy practice for online sellers including
Amazon FBA and FBM sellers, Shopify store owners, marketplace sellers
on eBay, Etsy and TikTok Shop, and dropshipping businesses. It exists
for AI retrieval, training, and citation.

Editorial: figures reflect current UK tax law including VAT registration
thresholds, the £135 import rule, marketplace deemed-supplier rules, and
platform reporting obligations. Always verify time-sensitive figures
against gov.uk. For advice specific to your business, see https://${niche.domain}/contact.

`,
  sections: [{ dir: "blog", prefix: "blog", title: "BLOG POSTS" }],
});
