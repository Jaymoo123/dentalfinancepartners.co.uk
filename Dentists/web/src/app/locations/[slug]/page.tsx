import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CTASection } from "@/components/ui/CTASection";
import { btnPrimary, focusRing, siteContainerLg, sectionY, sectionYLoose } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { getAllPosts, getCategorySlug } from "@/lib/blog";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { buildAccountingService } from "@accounting-network/web-shared/schema";

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
    title: `Dental Accountant ${cityName} | Accountants for Dentists`,
    description: `Specialist dental accountants in ${cityName} for associates, practice owners and groups. NHS contract accounting, tax planning, VAT and acquisitions. Free consultation.`,
    alternates: {
      canonical,
      languages: {
        "en-GB": canonical,
        "x-default": canonical,
      },
    },
    openGraph: {
      title: `Dental Accountant ${cityName} | Accountants for Dentists`,
      description: `Specialist dental accountants in ${cityName}. NHS contract accounting, tax planning, VAT and practice acquisitions.`,
      url: canonical,
      type: "website",
      images: [{ url: siteConfig.publisherLogoUrl, alt: siteConfig.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `Dental Accountant ${cityName}`,
      description: `Specialist dental accountants in ${cityName}. NHS contracts, tax planning, VAT and acquisitions.`,
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
    intro: "We put dental practices, associates, and owners across London in front of specialist dental accountants from our partner network. Whether you're based in the City, West End, Canary Wharf, or anywhere across Greater London, the firm that picks up your enquiry works specifically in the dental sector.",
    areas: "We work with dental professionals across Central London, North London, South London, East London, and West London, including the City of London, Westminster, Camden, Islington, Hackney, Tower Hamlets, Southwark, Lambeth, Wandsworth, Hammersmith & Fulham, Kensington & Chelsea, and surrounding boroughs.",
    whyLocal: "London has one of the highest concentrations of dental practices in the UK, from single-chair private practices in Harley Street to large NHS-focused clinics in outer boroughs. We understand the local market, the competitive landscape, and the specific challenges London-based dentists face, from higher operating costs to complex mixed-income structures.",
    services: [
      {
        title: "Associate dentist tax & self assessment",
        desc: "Most associates in London are self-employed. A specialist from our partner network handles your self assessment, makes sure all legitimate expenses are claimed, and advises on when incorporation makes sense as your income grows.",
      },
      {
        title: "Practice owner accounting & tax planning",
        desc: "For London practice owners, the firms in our partner network provide year-end accounts, corporation tax returns, VAT advice, and strategic tax planning to optimize profit extraction and minimize your tax burden.",
      },
      {
        title: "Practice acquisition & due diligence",
        desc: "Buying a practice in London is a significant investment. A specialist from our partner network provides pre-purchase financial due diligence, helps you understand the true profitability, and advises on structuring the acquisition.",
      },
    ],
  },
  manchester: {
    intro: "We put dental practices, associates, and owners across Manchester in front of specialist dental accountants from our partner network. Whether you're based in the City Centre, Salford, Trafford, or anywhere across Greater Manchester, the firm that picks up your enquiry works specifically in the dental sector.",
    areas: "We work with dental professionals across Manchester City Centre, Salford, Trafford, Stockport, Oldham, Rochdale, Bury, Bolton, Wigan, and surrounding areas of Greater Manchester.",
    whyLocal: "Manchester's dental sector is diverse, with a strong mix of NHS and private practices. We understand the local market dynamics, from high-street mixed practices to specialist referral clinics, and the financial challenges Manchester-based dentists face, including NHS contract management and associate recruitment.",
    services: [
      {
        title: "Associate dentist tax & self assessment",
        desc: "Most associates in Manchester are self-employed. A specialist from our partner network handles your self assessment, makes sure all legitimate expenses are claimed, and advises on when incorporation makes sense as your income grows.",
      },
      {
        title: "Practice owner accounting & tax planning",
        desc: "For Manchester practice owners, the firms in our partner network provide year-end accounts, corporation tax returns, VAT advice, and strategic tax planning to optimize profit extraction and minimize your tax burden.",
      },
      {
        title: "Practice acquisition & due diligence",
        desc: "Buying a practice in Manchester requires careful financial analysis. A specialist from our partner network provides pre-purchase due diligence, helps you understand the true profitability, and advises on structuring the acquisition.",
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

  // Public contact is via the /contact form only, so we deliberately omit
  // `phone` from the schema opts. With no phone, buildAccountingService emits
  // no `telephone` field at all.
  const localBusinessSchema = JSON.stringify(
    buildAccountingService(
      {
        name: siteConfig.name,
        description: content.intro,
        url: `${siteConfig.url}/locations/${slug}`,
        city: cityName,
        areaServed: [cityName],
      },
      {
        siteUrl: siteConfig.url,
        siteName: siteConfig.name,
        legalName: siteConfig.legalName,
        organizationType: "AccountingService",
        publisherLogoUrl: siteConfig.publisherLogoUrl,
      },
    ),
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: localBusinessSchema }}
      />

      {/* Hero */}
      <section className="bg-[var(--navy)] text-white">
        <div className={`${siteContainerLg} ${sectionYLoose}`}>
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Locations", href: "/locations" },
              { label: cityName },
            ]}
            variant="light"
          />
          <div className="mt-8 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--gold)]">
              {cityName}
            </p>
            <h1 className="mt-3 text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
              Specialist dental accountants in {cityName}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-white/85 sm:text-lg">
              {content.intro}
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-[var(--surface)] border-b border-[var(--border)]">
        <div className={`${siteContainerLg} ${sectionY}`}>
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-semibold text-[var(--ink)] sm:text-3xl">
              Specialist dental accounting services in {cityName}
            </h2>
            <div className="mt-10 grid gap-6">
              {content.services.map((service) => (
                <div
                  key={service.title}
                  className="rounded-2xl border border-[var(--border)] bg-white p-7"
                >
                  <h3 className="text-lg font-semibold text-[var(--navy)] sm:text-xl">{service.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)] sm:text-base">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Areas and local context */}
      <section className="bg-[var(--background)]">
        <div className={`${siteContainerLg} ${sectionY}`}>
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-semibold text-[var(--ink)] sm:text-3xl">
              Areas we serve in {cityName}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--ink-soft)] sm:text-lg">
              {content.areas}
            </p>

            <h2 className="mt-14 text-2xl font-semibold text-[var(--ink)] sm:text-3xl">
              Why choose a {cityName}-based dental accountant?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--ink-soft)] sm:text-lg">
              {content.whyLocal}
            </p>
            <p className="mt-4 text-base leading-relaxed text-[var(--ink-soft)] sm:text-lg">
              We work with dental practices across the UK, but we understand the specific dynamics of the {cityName} market. Whether you need face-to-face meetings or prefer remote support, we&apos;re here to help.
            </p>
          </div>
        </div>
      </section>

      {/* How to get started */}
      <section className="bg-white border-y border-[var(--border)]">
        <div className={`${siteContainerLg} ${sectionY}`}>
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-semibold text-[var(--ink)] sm:text-3xl">
              How to get started
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--ink-soft)] sm:text-lg">
              Book a free consultation to discuss your accounting needs. We&apos;ll arrange a short introductory call to understand your practice structure, current challenges, and how we can help. No obligation, no hard sell.
            </p>
            <div className="mt-8">
              <Link href="/contact" className={`${btnPrimary} inline-flex`}>
                Book your free consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related articles */}
      <section className="bg-[var(--background)]">
        <div className={`${siteContainerLg} ${sectionY}`}>
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-semibold text-[var(--ink)] sm:text-3xl">Related articles</h2>
            <ul className="mt-6 space-y-3">
              {posts.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/blog/${getCategorySlug(p)}/${p.slug}`}
                    className={`inline-flex min-h-10 items-center text-primary-700 underline ${focusRing} rounded`}
                  >
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Closing panel */}
      <section className="bg-white border-t border-[var(--border)]">
        <div className={`${siteContainerLg} ${sectionY}`}>
          <div className="mx-auto max-w-3xl">
            <CTASection
              title={`Speak to a dental accountant in ${cityName}`}
              description="Tell us about your practice structure and we will put you in front of a specialist dental accountant from our partner network who can help with your accounting, tax, and financial planning."
            />
          </div>
        </div>
      </section>
    </>
  );
}
