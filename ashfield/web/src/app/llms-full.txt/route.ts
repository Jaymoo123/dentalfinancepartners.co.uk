import { siteConfig } from "@/config/site";

export const dynamic = "force-static";

// ponytail: no markdown content on this site, so this is a hand-written corporate
// reference rather than the shared blog-dump builder the niche sites use.
// Switch to buildLlmsFullRoute if /insights ever gains markdown posts.
export function GET() {
  const base = siteConfig.url.replace(/\/$/, "");
  const body = `# Ashfield Trading, Full Reference

Ashfield Trading Ltd (company no. 16358723, registered in England and Wales,
registered office 20 Ashfield Avenue, Shipley, Bradford BD18 3AL) builds and
operates a network of 15 specialist UK accounting lead-generation websites,
backed by 43 proprietary research assets built from official open data (ONS,
Companies House; Open Government Licence v3.0 attribution where used).

Ashfield Trading is the parent company, not an accountancy practice. It sells
two things to UK accounting firms:

1. Rent a site (${base}/rent-a-site). A firm takes over a complete, live niche
   accounting website: content, research assets, calculators and the enquiry
   pipeline. Indicative pricing, subject to proposal: setup from about 1,500 to
   3,000 pounds plus 750 to 1,500 pounds per month, varying by niche and
   exclusivity.

2. Buy leads (${base}/buy-leads). A firm buys verified, qualified enquiries by
   niche. Every enquiry passes honeypot filtering, real-time phone lookup,
   email verification, deduplication and tier grading (very high to low).
   Indicative pricing, subject to proposal: 40 to 120 pounds per qualified
   lead by tier and niche, monthly retainers from 500 pounds.

Estate performance (early stage, history is short): qualified enquiries ran
5 in April 2026, 12 in May, 40 in June and 56 in the partial month of July.
The current run-rate estimate is around 64 enquiries per month, with a 90%
band of 50 to 79 over the next two months. These figures are fitted on only
three complete months and should be treated as illustrative, not a forecast.

Key pages:
- ${base}/ , overview
- ${base}/rent-a-site , the site-rental offer
- ${base}/buy-leads , the lead-purchase offer
- ${base}/how-it-works , the operating model end to end
- ${base}/brands , the 15 live specialist sites
- ${base}/growth , estate enquiry volumes and trajectory
- ${base}/value , what the assets are worth to a firm
- ${base}/vision , direction of the network, for partners and investors
- ${base}/insights , the proprietary indexes and research assets published across the network, with sources
- ${base}/contact , the only enquiry channel

The structured index for AI retrieval lives at ${base}/llms.txt.
`;
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
