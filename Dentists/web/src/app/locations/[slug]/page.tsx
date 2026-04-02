import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CTASection } from "@/components/ui/CTASection";
import { btnPrimary, contentNarrow, focusRing, sectionY } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { getAllPosts, getCategorySlug } from "@/lib/blog";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { buildLocalBusinessJsonLd } from "@/lib/local-business-schema";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return siteConfig.locations.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const loc = siteConfig.locations.find((l) => l.slug === slug);
  if (!loc) {
    return {};
  }
  const cityName = slug.charAt(0).toUpperCase() + slug.slice(1);
  const canonical = `${siteConfig.url}/locations/${loc.slug}`;
  return {
    title: `Dental Accountant ${cityName} | ${siteConfig.name}`,
    description: `Specialist dental accountant in ${cityName} for associates, practice owners & groups. NHS contracts, tax planning, VAT & acquisitions. Book a free consultation.`,
    alternates: { canonical },
    openGraph: {
      title: `Dental Accountant ${cityName} | ${siteConfig.name}`,
      description: `Specialist dental accountant in ${cityName} for associates, practice owners & groups. NHS contracts, tax planning, VAT & acquisitions.`,
      url: canonical,
      type: "website",
      images: [{ url: siteConfig.publisherLogoUrl, alt: siteConfig.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `Dental Accountant ${cityName}`,
      description: `Specialist dental accountant in ${cityName} for associates, practice owners & groups.`,
      images: [siteConfig.publisherLogoUrl],
    },
  };
}

const cityContent: Record<string, {
  intro: string;
  areas: string;
  whyLocal: string;
  services: { title: string; desc: string }[];
}> = {
  london: {
    intro: "We're specialist dental accountants serving dental practices, associates, and owners across London. Whether you're based in the City, West End, Canary Wharf, or anywhere across Greater London, we provide expert accounting and tax services tailored specifically to the dental sector.",
    areas: "We work with dental professionals across Central London, North London, South London, East London, and West London — including the City of London, Westminster, Camden, Islington, Hackney, Tower Hamlets, Southwark, Lambeth, Wandsworth, Hammersmith & Fulham, Kensington & Chelsea, and surrounding boroughs.",
    whyLocal: "London has one of the highest concentrations of dental practices in the UK, from single-chair private practices in Harley Street to large NHS-focused clinics in outer boroughs. We understand the local market, the competitive landscape, and the specific challenges London-based dentists face — from higher operating costs to complex mixed-income structures.",
    services: [
      {
        title: "Associate dentist tax & self assessment",
        desc: "Most associates in London are self-employed. We handle your self assessment, ensure all legitimate expenses are claimed, and advise on when incorporation makes sense as your income grows.",
      },
      {
        title: "Practice owner accounting & tax planning",
        desc: "For London practice owners, we provide year-end accounts, corporation tax returns, VAT advice, and strategic tax planning to optimize profit extraction and minimize your tax burden.",
      },
      {
        title: "Practice acquisition & due diligence",
        desc: "Buying a practice in London is a significant investment. We provide pre-purchase financial due diligence, help you understand the true profitability, and advise on structuring the acquisition.",
      },
    ],
  },
  manchester: {
    intro: "We're specialist dental accountants serving dental practices, associates, and owners across Manchester. Whether you're based in the City Centre, Salford, Trafford, or anywhere across Greater Manchester, we provide expert accounting and tax services tailored specifically to the dental sector.",
    areas: "We work with dental professionals across Manchester City Centre, Salford, Trafford, Stockport, Oldham, Rochdale, Bury, Bolton, Wigan, and surrounding areas of Greater Manchester.",
    whyLocal: "Manchester's dental sector is diverse, with a strong mix of NHS and private practices. We understand the local market dynamics, from high-street mixed practices to specialist referral clinics, and the financial challenges Manchester-based dentists face — including NHS contract management and associate recruitment.",
    services: [
      {
        title: "Associate dentist tax & self assessment",
        desc: "Most associates in Manchester are self-employed. We handle your self assessment, ensure all legitimate expenses are claimed, and advise on when incorporation makes sense as your income grows.",
      },
      {
        title: "Practice owner accounting & tax planning",
        desc: "For Manchester practice owners, we provide year-end accounts, corporation tax returns, VAT advice, and strategic tax planning to optimize profit extraction and minimize your tax burden.",
      },
      {
        title: "Practice acquisition & due diligence",
        desc: "Buying a practice in Manchester requires careful financial analysis. We provide pre-purchase due diligence, help you understand the true profitability, and advise on structuring the acquisition.",
      },
    ],
  },
};

export default async function LocationPage({ params }: Props) {
  const { slug } = await params;
  const loc = siteConfig.locations.find((l) => l.slug === slug);
  if (!loc) {
    notFound();
  }

  const content = cityContent[slug];
  const cityName = slug.charAt(0).toUpperCase() + slug.slice(1);
  const posts = getAllPosts().slice(0, 3);

  const localBusinessSchema = buildLocalBusinessJsonLd({
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    description: content.intro,
    url: `${siteConfig.url}/locations/${slug}`,
    logo: `${siteConfig.url}${siteConfig.publisherLogoUrl}`,
    email: siteConfig.contact.email,
    phone: siteConfig.contact.phone,
    areaServed: content.areas,
    city: cityName,
    organizationType: "AccountingService",
  });

  return (
    <div className={`${contentNarrow} ${sectionY}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: localBusinessSchema }}
      />
      
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Locations", href: "/locations" },
          { label: cityName },
        ]}
      />
      <h1 className="font-serif text-3xl font-semibold leading-tight text-[var(--ink)] sm:text-4xl">
        Dental accountant {cityName}
      </h1>
      <p className="mt-6 text-base leading-relaxed text-[var(--muted)] sm:text-lg">
        {content.intro}
      </p>

      <h2 className="mt-12 font-serif text-2xl font-semibold text-[var(--ink)] sm:text-3xl">
        Specialist dental accounting services in {cityName}
      </h2>
      <div className="mt-8 space-y-8">
        {content.services.map((service) => (
          <div key={service.title} className="card-flat p-6 sm:p-8">
            <h3 className="text-lg font-semibold text-[var(--navy)] sm:text-xl">{service.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-[var(--muted)] sm:text-base">{service.desc}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-12 font-serif text-2xl font-semibold text-[var(--ink)] sm:text-3xl">
        Areas we serve in {cityName}
      </h2>
      <p className="mt-4 text-base leading-relaxed text-[var(--muted)] sm:text-lg">
        {content.areas}
      </p>

      <h2 className="mt-12 font-serif text-2xl font-semibold text-[var(--ink)] sm:text-3xl">
        Why choose a {cityName}-based dental accountant?
      </h2>
      <p className="mt-4 text-base leading-relaxed text-[var(--muted)] sm:text-lg">
        {content.whyLocal}
      </p>
      <p className="mt-4 text-base leading-relaxed text-[var(--muted)] sm:text-lg">
        We work with dental practices across the UK, but we understand the specific dynamics of the {cityName} market. Whether you need face-to-face meetings or prefer remote support, we&apos;re here to help.
      </p>

      <h2 className="mt-12 font-serif text-2xl font-semibold text-[var(--ink)] sm:text-3xl">
        How to get started
      </h2>
      <p className="mt-4 text-base leading-relaxed text-[var(--muted)] sm:text-lg">
        Book a free consultation to discuss your accounting needs. We&apos;ll arrange a short introductory call to understand your practice structure, current challenges, and how we can help. No obligation, no hard sell.
      </p>
      <div className="mt-8">
        <Link href="/contact" className={`${btnPrimary} inline-flex`}>
          Book your free consultation
        </Link>
      </div>

      <h2 className="mt-12 font-serif text-2xl font-semibold text-[var(--ink)] sm:text-3xl">Related articles</h2>
      <ul className="mt-6 space-y-3">
        {posts.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/blog/${getCategorySlug(p)}/${p.slug}`}
              className={`inline-flex min-h-10 items-center text-[var(--accent-strong)] underline ${focusRing} rounded`}
            >
              {p.title}
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-12">
        <CTASection
          title={`Speak to a dental accountant in ${cityName}`}
          description="Tell us about your practice structure and we'll explain how we can help with your accounting, tax, and financial planning."
        />
      </div>
    </div>
  );
}
