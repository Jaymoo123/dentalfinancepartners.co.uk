import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteConfig } from "@/config/site";
import { cryptoServices, getCryptoService } from "@/data/crypto-services";
import { TopicPageLayout } from "@/components/templates/TopicPageLayout";

export function generateStaticParams() { return cryptoServices.map((s) => ({ slug: s.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getCryptoService(slug);
  if (!service) return {};
  return { title: { absolute: service.metaTitle }, description: service.metaDescription, alternates: { canonical: `${siteConfig.url}/services/${slug}` } };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getCryptoService(slug);
  if (!service) notFound();
  return (
    <TopicPageLayout
      breadcrumb={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: service.title }]}
      eyebrow="Crypto tax service"
      headline={service.headline}
      intro={service.intro}
      stats={service.stats}
      challengesHeading="The challenges clients face."
      challenges={service.challenges}
      howWeHelpHeading="How we help."
      howWeHelp={service.howWeHelp}
      faqs={service.faqs}
      ctaHeading="Speak to a crypto tax specialist."
      ctaBody="Tell us about your situation and we will come back to you."
    />
  );
}
