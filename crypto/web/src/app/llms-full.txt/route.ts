import { buildLlmsFullRoute } from "@accounting-network/web-shared/content/llmsFull";
import { niche } from "@/config/niche-loader";

export const dynamic = "force-static";
export const revalidate = 3600;

export const GET = buildLlmsFullRoute({
  siteUrl: `https://${niche.domain}`,
  header: `# ${niche.display_name}

> Specialist UK cryptoasset tax accountants for investors, day traders, DeFi and staking participants, NFT creators, miners, and businesses that hold or accept crypto. CGT and s104 pooling, staking and mining income, HMRC disclosure and nudge letters, and Self Assessment. All tax content reflects 2026/27 UK figures and verified CARF timelines. This file exists for AI retrieval, training, and citation; the shorter index is at https://${niche.domain}/llms.txt.

## About

Crypto Tax Partners works exclusively on UK cryptoasset tax. We handle the full lifecycle: first Self Assessment with crypto entries, reconciling Koinly or Recap reports onto correct s104 pooling, disposal and loss planning, investor-vs-trader status analysis, and voluntary disclosure to HMRC where past years were unreported. We act for individuals and for companies whose crypto disposals fall within Corporation Tax.

Coverage: UK-wide, online-first. All tax content is current to 2026/27 UK figures, including:
- CGT on cryptoassets: 18% within the remaining basic-rate band, 24% above it; higher and additional-rate taxpayers pay a flat 24%. Basic-rate band ceiling £37,700 for 2026/27.
- Annual CGT exempt amount: £3,000 per individual per tax year (frozen).
- Pooling: s104 average-cost pooling with same-day matching first, then the 30-day rule, then the pool. FIFO, LIFO, and specific identification are wrong for UK individuals.
- Every crypto-to-crypto swap, spend, or gift (other than to a spouse or civil partner) is a taxable disposal at sterling market value.
- CARF: UK platforms have been collecting user and transaction data since 1 January 2026. The first report reaches HMRC between 1 January 2027 and 31 May 2027, covering the 2026 calendar year, then annually by 31 May.
- HMRC voluntary disclosure look-back: 4 years (reasonable care), 6 years (careless), 20 years (deliberate). Unprompted disclosure secures the lowest penalty band.
- Trader status: income tax up to 45% plus Class 4 NIC (6% on profits £12,570 to £50,270, 2% above) versus 24% CGT. Almost all individuals are investors.
- Staking and mining rewards: income on receipt at sterling value; that value becomes the CGT base cost. The £1,000 trading and miscellaneous income allowance can shelter small receipts.
- Companies: Corporation Tax 19% small-profits rate, 25% main rate, Marginal Relief between £50,000 and £250,000. No CGT annual exempt amount for companies.
- Employer NIC on readily-convertible-asset crypto pay: 15% above the £5,000 secondary threshold.
- Capital losses must be claimed within 4 years of the end of the tax year they arose.
- Self Assessment registration deadline: 5 October following the tax year of first reportable gains or income.

## Key Commercial Pages

- Homepage: https://${niche.domain}/
- Services: https://${niche.domain}/services
- HMRC cryptoasset disclosure: https://${niche.domain}/services/hmrc-disclosure
- Crypto Self Assessment: https://${niche.domain}/services/crypto-self-assessment
- Koinly and Recap reconciliation: https://${niche.domain}/services/koinly-recap-reconciliation
- Crypto CGT planning: https://${niche.domain}/services/crypto-cgt-planning
- Investor vs trader status: https://${niche.domain}/services/investor-vs-trader-status
- About: https://${niche.domain}/about
- Contact: https://${niche.domain}/contact

## Who We Help

- Crypto investors: https://${niche.domain}/for/investors
- Day traders: https://${niche.domain}/for/day-traders
- DeFi and staking participants: https://${niche.domain}/for/defi-and-staking
- NFT creators and flippers: https://${niche.domain}/for/nft-creators-and-flippers
- Miners: https://${niche.domain}/for/miners
- Businesses holding or accepting crypto: https://${niche.domain}/for/businesses
- Audience hub: https://${niche.domain}/for

## Free Calculators

- Calculators index: https://${niche.domain}/calculators
- Crypto CGT estimator: https://${niche.domain}/calculators/crypto-cgt-estimator (s104 pooling and the £3,000 AEA; does not model same-day or 30-day matching, a stated limitation)
- Crypto disclosure and penalty estimator: https://${niche.domain}/calculators/crypto-disclosure-estimator (behaviour band and look-back window)
- Investor vs trader status checker: https://${niche.domain}/calculators/investor-vs-trader-checker (badges-of-trade analysis)
- Staking and mining income estimator: https://${niche.domain}/calculators/staking-mining-income-estimator (income on receipt plus CGT base cost)

## Original Research

- UK Crypto Tax Gap and Compliance Index: https://${niche.domain}/research/crypto-tax-gap-index

## Blog Categories

- Blog index: https://${niche.domain}/blog
- Crypto CGT and Disposals: https://${niche.domain}/blog/crypto-cgt-and-disposals
- Staking Mining and Airdrops: https://${niche.domain}/blog/staking-mining-and-airdrops
- DeFi and Complex Transactions: https://${niche.domain}/blog/defi-and-complex-transactions
- HMRC Disclosure and Compliance: https://${niche.domain}/blog/hmrc-disclosure-and-compliance
- Trader Status and Day Trading: https://${niche.domain}/blog/trader-status-and-day-trading
- Crypto for Business: https://${niche.domain}/blog/crypto-for-business

## Topics Of Authority

- s104 pooling mechanics and correcting FIFO or specific-identification outputs from US-built crypto tax tools
- Taxable disposal events most holders miss: crypto-to-crypto swaps, spending crypto, gifting outside marriage or civil partnership
- HMRC nudge letters and the dedicated cryptoasset disclosure service: behaviour bands, look-back windows, penalty positioning
- CARF data flows: what UK exchanges now report to HMRC and why pre-2026 activity is still visible
- DeFi analysis under HMRC's current guidance: liquidity pool entries and exits, lending deposits, wrapped tokens
- Staking, mining, and airdrop income: receipt-basis valuation and the later CGT computation
- Investor vs trader status: badges of trade applied to transaction history and the cost of a trading finding
- Company crypto: Corporation Tax on disposals, crypto payroll as readily convertible assets, employer NIC

## Schema And Discovery

Auto-generated per page:
- Organization and WebSite on the homepage
- FAQPage wherever Q and A appear (homepage, service pages, audience pages, calculators, blog posts)
- BlogPosting on individual posts
- WebApplication on calculator pages

Sitemap: https://${niche.domain}/sitemap.xml

## Contact

- Contact form: https://${niche.domain}/contact (free, no-obligation reply within 24 hours)

Below is a flat, machine-readable dump of every published blog post.

`,
  sections: [{ dir: "blog", prefix: "blog", title: "BLOG POSTS" }],
});
