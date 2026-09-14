import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteConfig } from "@/config/site";
import { cryptoHubs, getCryptoHub } from "@/data/crypto-hubs";
import { TopicPageLayout } from "@/components/templates/TopicPageLayout";

export function generateStaticParams() { return cryptoHubs.map((h) => ({ slug: h.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const hub = getCryptoHub(slug);
  if (!hub) return {};
  return { title: { absolute: hub.metaTitle }, description: hub.metaDescription, alternates: { canonical: `${siteConfig.url}/for/${slug}` } };
}

export default async function CryptoHubPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const hub = getCryptoHub(slug);
  if (!hub) notFound();
  const audience = hub.title.toLowerCase();
  return (
    <TopicPageLayout
      breadcrumb={[{ label: "Home", href: "/" }, { label: "Holder types", href: "/for" }, { label: hub.title }]}
      eyebrow={`For ${audience}`}
      headline={hub.headline}
      intro={hub.intro}
      stats={hub.stats}
      challengesHeading={`What makes ${audience} tax different.`}
      challenges={hub.challenges}
      howWeHelpHeading={`How we help ${audience}.`}
      howWeHelp={hub.howWeHelp}
      faqs={hub.faqs}
      ctaHeading="Speak to a crypto tax specialist."
      ctaBody={`Tell us about your ${audience} situation and we will explain what is involved.`}
    />
  );
}
