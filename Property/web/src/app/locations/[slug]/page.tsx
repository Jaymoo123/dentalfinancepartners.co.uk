import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CTASection } from "@/components/ui/CTASection";
import { btnPrimary, siteContainerLg } from "@/components/ui/layout-utils";
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
    title: `Property Accountant ${cityName} | ${siteConfig.name}`,
    description: `Specialist property accountant in ${cityName} for landlords and investors. Section 24 planning, MTD compliance, incorporation analysis. Book a free consultation.`,
    alternates: { canonical },
    openGraph: {
      title: `Property Accountant ${cityName} | ${siteConfig.name}`,
      description: `Specialist property accountant in ${cityName} for landlords and investors. Section 24, MTD, incorporation.`,
      url: canonical,
      type: "website",
      images: [{ url: siteConfig.publisherLogoUrl, alt: siteConfig.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `Property Accountant ${cityName}`,
      description: `Specialist property accountant in ${cityName} for landlords. Section 24, MTD, incorporation.`,
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
    intro: "Specialist property accountants serving landlords and investors across London. Whether you're based in Central London, Zone 2-6, or Greater London, we provide expert accounting and tax services tailored specifically to property investors.",
    areas: "We work with landlords across all London boroughs — from Central London (Westminster, City, Camden) to North (Barnet, Enfield), South (Croydon, Bromley), East (Tower Hamlets, Newham), and West London (Ealing, Hounslow).",
    whyLocal: "London has the UK's most active property market, with unique challenges: high property values, complex Section 24 implications, and significant incorporation costs due to CGT and SDLT. We understand the London market dynamics and help you make informed decisions.",
    services: [
      {
        title: "Section 24 tax planning",
        desc: "London landlords are hit hardest by Section 24 due to high property values and mortgage levels. We calculate your specific impact and model whether incorporation makes financial sense.",
      },
      {
        title: "MTD compliance (April 2026)",
        desc: "Quarterly digital reporting becomes mandatory from 6 April 2026. We set you up with the right software and handle submissions so you avoid penalties.",
      },
      {
        title: "Incorporation feasibility",
        desc: "Transferring London properties to a limited company triggers significant CGT and SDLT. We model the upfront costs vs. long-term savings and give you a clear recommendation.",
      },
    ],
  },
  manchester: {
    intro: "Specialist property accountants serving landlords and investors across Manchester. Whether you're based in the City Centre, Salford, Trafford, or Greater Manchester, we provide expert accounting and tax services tailored specifically to property investors.",
    areas: "We work with landlords across Manchester City Centre, Salford, Trafford, Stockport, Oldham, Rochdale, Bury, Bolton, Wigan, and surrounding areas of Greater Manchester.",
    whyLocal: "Manchester's property market offers strong rental yields and growing capital appreciation. We help Manchester landlords navigate Section 24, MTD compliance, and incorporation decisions specific to the local market dynamics.",
    services: [
      {
        title: "Section 24 tax planning",
        desc: "Calculate your Section 24 impact and explore ways to reduce the tax hit. We model your specific situation and recommend the most tax-efficient structure.",
      },
      {
        title: "MTD compliance (April 2026)",
        desc: "Get ready for Making Tax Digital quarterly reporting. We handle software setup, quarterly submissions, and ensure you're compliant before the deadline.",
      },
      {
        title: "Portfolio accounting",
        desc: "Track profitability property-by-property. We produce quarterly reports showing which properties are making money and which need attention.",
      },
    ],
  },
  birmingham: {
    intro: "Specialist property accountants serving landlords and investors across Birmingham. Whether you're based in the City Centre, Edgbaston, Solihull, or anywhere across the West Midlands, we provide expert accounting and tax services tailored specifically to property investors.",
    areas: "We work with landlords across Birmingham City Centre, Edgbaston, Harborne, Solihull, Sutton Coldfield, and surrounding areas of the West Midlands.",
    whyLocal: "Birmingham's property market offers excellent value for buy-to-let investors. We help Birmingham landlords with Section 24 planning, MTD compliance, and incorporation analysis.",
    services: [
      {
        title: "Section 24 tax planning",
        desc: "Calculate your Section 24 impact and explore tax-efficient structures for your Birmingham portfolio.",
      },
      {
        title: "MTD compliance",
        desc: "Quarterly digital reporting from April 2026. We handle setup and submissions.",
      },
      {
        title: "Incorporation analysis",
        desc: "Model the costs and benefits of transferring your Birmingham properties to a limited company.",
      },
    ],
  },
  leeds: {
    intro: "Specialist property accountants serving landlords and investors across Leeds. Whether you're based in the City Centre, Headingley, Chapel Allerton, or anywhere across West Yorkshire, we provide expert accounting and tax services tailored specifically to property investors.",
    areas: "We work with landlords across Leeds City Centre, Headingley, Chapel Allerton, Roundhay, Horsforth, and surrounding areas of West Yorkshire.",
    whyLocal: "Leeds has a strong rental market driven by students and young professionals. We help Leeds landlords navigate Section 24, MTD, and incorporation decisions.",
    services: [
      {
        title: "Section 24 tax planning",
        desc: "Calculate your Section 24 impact for your Leeds portfolio and explore mitigation strategies.",
      },
      {
        title: "MTD compliance",
        desc: "Get ready for quarterly digital reporting from April 2026.",
      },
      {
        title: "Portfolio management",
        desc: "Track profitability across your Leeds properties with property-level reporting.",
      },
    ],
  },
  bristol: {
    intro: "Specialist property accountants serving landlords and investors across Bristol. Whether you're based in the City Centre, Clifton, Redland, or anywhere across the South West, we provide expert accounting and tax services tailored specifically to property investors.",
    areas: "We work with landlords across Bristol City Centre, Clifton, Redland, Southville, Bedminster, and surrounding areas of the South West.",
    whyLocal: "Bristol's property market combines strong capital growth with solid rental yields. We help Bristol landlords with Section 24 planning, MTD compliance, and strategic tax advice.",
    services: [
      {
        title: "Section 24 tax planning",
        desc: "Calculate your Section 24 impact for your Bristol portfolio and model tax-efficient structures.",
      },
      {
        title: "MTD compliance",
        desc: "Quarterly digital reporting from April 2026. We handle the setup and submissions.",
      },
      {
        title: "Incorporation feasibility",
        desc: "Model whether transferring your Bristol properties to a limited company makes financial sense.",
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
  if (!content) {
    notFound();
  }

  const cityName = slug.charAt(0).toUpperCase() + slug.slice(1);
  const posts = getAllPosts().slice(0, 5);

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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: localBusinessSchema }}
      />
      
      <section className="relative h-[350px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1200&q=85"
          alt={`${cityName} property`}
          fill
          priority
          sizes="100vw"
          className="object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-slate-900/85" />
        <div className={`${siteContainerLg} relative z-10 h-full flex items-center`}>
          <div className="max-w-3xl">
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Locations", href: "/locations" },
                { label: cityName },
              ]}
            />
            <h1 className="mt-6 text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
              Property accountant {cityName}
            </h1>
            <p className="mt-4 text-xl text-white">
              Specialist property accountants serving landlords across {cityName}.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg leading-relaxed text-slate-700">
              {content.intro}
            </p>

            <h2 className="mt-12 text-3xl font-bold text-slate-900">
              Specialist property accounting services in {cityName}
            </h2>
            <div className="mt-8 space-y-6">
              {content.services.map((service) => (
                <div key={service.title} className="border-l-4 border-emerald-600 bg-slate-50 p-8">
                  <h3 className="text-xl font-bold text-slate-900">{service.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-slate-700">{service.desc}</p>
                </div>
              ))}
            </div>

            <h2 className="mt-16 text-3xl font-bold text-slate-900">
              Areas we serve in {cityName}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-700">
              {content.areas}
            </p>

            <h2 className="mt-16 text-3xl font-bold text-slate-900">
              Why choose a {cityName}-based property accountant?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-700">
              {content.whyLocal}
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-700">
              We work with landlords across the UK, but we understand the specific dynamics of the {cityName} property market. Remote support with local market knowledge.
            </p>

            <div className="mt-12 bg-emerald-50 border-l-4 border-emerald-600 p-8">
              <h2 className="text-2xl font-bold text-slate-900">
                How to get started
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-700">
                Book a free consultation to discuss your property tax situation. We&apos;ll give you clear recommendations — no obligation, no hard sell.
              </p>
              <div className="mt-6">
                <Link href="/contact" className={`${btnPrimary} inline-flex text-base px-8 py-3.5`}>
                  Book your free consultation
                </Link>
              </div>
            </div>

            {posts.length > 0 && (
              <>
                <h2 className="mt-16 text-3xl font-bold text-slate-900">Related articles</h2>
                <ul className="mt-8 space-y-4">
                  {posts.map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={`/blog/${getCategorySlug(p)}/${p.slug}`}
                        className="block border-l-4 border-slate-300 bg-slate-50 p-6 transition-all hover:border-emerald-600 hover:bg-white hover:shadow-md"
                      >
                        <h3 className="text-lg font-bold text-slate-900">{p.title}</h3>
                        <p className="mt-2 text-sm text-slate-600">{p.summary}</p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 sm:py-20">
        <div className={siteContainerLg}>
          <CTASection
            title={`Speak to a property accountant in ${cityName}`}
            description="Tell us about your portfolio and we'll explain how we can help with Section 24, MTD, and incorporation planning."
          />
        </div>
      </section>
    </>
  );
}
