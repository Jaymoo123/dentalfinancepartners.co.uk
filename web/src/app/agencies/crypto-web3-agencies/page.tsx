import type { Metadata } from "next";
import { AgencyTypeLayout } from "@/components/agency-type/AgencyTypeLayout";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Accountants for Crypto & Web3 Agencies | ${siteConfig.name}`,
  description: "Specialist accountants for UK crypto and Web3 agency founders. Token payments, stablecoin invoicing, smart contract IP, regulatory edge cases. ICAEW qualified.",
  alternates: { canonical: `${siteConfig.url}/agencies/crypto-web3-agencies` },
  openGraph: {
    title: "Accountants for Crypto and Web3 Agencies",
    description: "Specialist tax and accounting for crypto and Web3 agency founders.",
    url: `${siteConfig.url}/agencies/crypto-web3-agencies`,
    type: "website",
  },
};

export default function CryptoWeb3AgenciesPage() {
  return (
    <AgencyTypeLayout
      slug="crypto-web3-agencies"
      title="Accountants for crypto and Web3 agencies"
      hero="Specialist tax and accounting for UK crypto and Web3 agency founders. Token payments from clients, stablecoin invoicing, smart contract development, NFT project work and the regulatory edge cases generalist accountants don't see. ICAEW qualified."
      sections={[
        {
          heading: "Token payments and stablecoin revenue",
          body: (
            <p>
              When a client pays you in USDC, ETH or a project token, HMRC treats it as a barter transaction. You record revenue at the fair market value of the token at the moment of receipt, denominated in GBP. Subsequent price movements create capital gains or losses if you hold the tokens, or income if you convert them as part of normal trading. Getting this wrong creates either understated revenue or unexpected CGT bills. We help crypto agencies set up wallet-to-Xero workflows that track this cleanly.
            </p>
          ),
        },
        {
          heading: "Smart contract development and IP",
          body: (
            <p>
              Smart contracts your agency builds for clients sit on-chain and are typically open-source by default. That changes the IP and licensing conversation significantly. Whether you retain rights to the underlying patterns, get royalty fees from contract usage, or transfer everything to the client materially affects your agency's valuation and tax position. We help crypto agencies structure contract development engagements so the commercial and tax treatment align.
            </p>
          ),
        },
        {
          heading: "R&D credits and the regulatory edge",
          body: (
            <p>
              Novel smart contract patterns, ZK-proof implementations, custom DAO tooling, bridge security work, MEV-resistant ordering systems — these typically qualify for R&D tax credits where genuine technical uncertainty exists. The regulatory environment for crypto in the UK is also evolving rapidly (FCA marketing rules, MiCA in the EU). We help crypto agencies stay compliant on both the tax and regulatory marketing sides without getting blindsided.
            </p>
          ),
        },
      ]}
      faqs={[
        {
          q: "How do I account for being paid in USDC or ETH?",
          a: "Record revenue at the GBP fair market value of the tokens at the moment of receipt. If you hold the tokens rather than converting immediately, subsequent price moves create capital gains or losses. Most crypto agencies convert to fiat quickly to avoid this. We set up wallet tracking integrated with Xero so the GBP equivalent is captured automatically.",
        },
        {
          q: "Are smart contract development costs R&D-qualifying?",
          a: "Often yes if there's genuine technical uncertainty. Novel contract patterns, security-critical bridge work, ZK-proof implementations, custom DAO tooling, MEV-resistance systems — these typically qualify under HMRC's SME R&D scheme. Standard ERC-20 deployment or basic contract templating does not. We assess project-by-project.",
        },
        {
          q: "What about FCA financial promotion rules for crypto agencies?",
          a: "If your agency promotes crypto investments (even client tokens) to UK consumers, you may be caught by the FCA's financial promotion regime. Promoting a client's token sale without proper sign-off can carry serious penalties. We're not regulated to give FCA-specific advice but we flag the risk and refer to specialists where you need it. The tax side we handle directly.",
        },
      ]}
      relatedTypes={[
        { label: "SaaS agencies", href: "/agencies/saas-agencies" },
        { label: "AI agencies", href: "/agencies/ai-agencies" },
        { label: "Digital agencies", href: "/agencies/digital-agencies" },
        { label: "Web design agencies", href: "/agencies/web-design-agencies" },
      ]}
    />
  );
}
