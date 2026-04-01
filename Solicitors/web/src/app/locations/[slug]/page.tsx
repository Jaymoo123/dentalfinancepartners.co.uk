import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CTASection } from "@/components/ui/CTASection";
import { btnPrimary, contentNarrow, focusRing, sectionY } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { getAllPosts } from "@/lib/blog";
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
    title: `GP Accountant ${cityName} | Medical Accountants UK`,
    description: `Specialist GP accountant in ${cityName} for doctors, consultants & medical practices. NHS pension planning, locum tax, private practice incorporation. Book free consultation.`,
    alternates: { canonical },
    openGraph: {
      title: `GP Accountant ${cityName} | Medical Accountants UK`,
      description: `Specialist GP accountant in ${cityName}. NHS pension planning, locum tax, private practice advice.`,
      url: canonical,
      type: "website",
      images: [{ url: siteConfig.publisherLogoUrl, alt: siteConfig.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `GP Accountant ${cityName}`,
      description: `Specialist GP accountant in ${cityName} for medical professionals.`,
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
    intro: "We're specialist medical accountants serving GPs, consultants, and medical practice owners across London. Whether you're based in Harley Street, the City, Canary Wharf, or anywhere across Greater London, we provide expert GP accounting and tax services tailored to medical professionals.",
    areas: "We work with doctors across Central London, North London, South London, East London, and West London — including Westminster, Camden, Islington, Hackney, Tower Hamlets, Southwark, Lambeth, Wandsworth, Hammersmith & Fulham, Kensington & Chelsea, and surrounding boroughs.",
    whyLocal: "London has the highest concentration of medical professionals in the UK, from GP surgeries in every borough to major teaching hospitals and private consulting rooms. We understand the London medical landscape, including higher practice costs, competitive private markets, and the complex mix of NHS and private income streams.",
    services: [
      {
        title: "GP partnership accounting",
        desc: "London GP practices often have complex partnership structures with multiple partners and salaried GPs. We handle partnership accounts, profit allocation, tax returns, and NHS pension reconciliation.",
      },
      {
        title: "Consultant tax planning",
        desc: "For London consultants balancing NHS hospital work with private practice, we manage your mixed income streams, optimize tax efficiency, and handle NHS pension annual allowance complexities.",
      },
      {
        title: "Locum doctor tax returns",
        desc: "London locums working across multiple practices need specialist tax support. We handle self assessment, expense claims, payment on account, and advise on VAT registration thresholds.",
      },
    ],
  },
  manchester: {
    intro: "We're specialist medical accountants serving GPs, consultants, and medical practice owners across Manchester. Whether you're based in the City Centre, Salford, Trafford, or anywhere across Greater Manchester, we provide expert GP accounting and tax services for medical professionals.",
    areas: "We work with doctors across Manchester City Centre, Salford, Trafford, Stockport, Oldham, Rochdale, Bury, Bolton, Wigan, and surrounding areas of Greater Manchester.",
    whyLocal: "Manchester's medical sector is thriving, with a strong mix of NHS GP surgeries, private clinics, and teaching hospitals. We understand the local healthcare landscape and the specific financial challenges Manchester-based doctors face, from practice management to private work alongside NHS commitments.",
    services: [
      {
        title: "GP partnership accounting",
        desc: "Manchester GP practices range from small partnerships to large multi-site operations. We handle partnership accounts, profit shares, tax returns, and NHS pension reporting.",
      },
      {
        title: "Consultant tax planning",
        desc: "For Manchester consultants with NHS and private income, we manage your tax position, optimize pension contributions, and handle annual allowance calculations.",
      },
      {
        title: "Locum doctor tax returns",
        desc: "Manchester locums need reliable tax support for multiple income sources. We handle self assessment, expense optimization, and quarterly tax planning.",
      },
    ],
  },
  birmingham: {
    intro: "We're specialist medical accountants serving GPs, consultants, and medical practice owners across Birmingham. Whether you're in the City Centre, Edgbaston, Solihull, or anywhere across the West Midlands, we provide expert GP accounting and tax services for medical professionals.",
    areas: "We work with doctors across Birmingham City Centre, Edgbaston, Solihull, Sutton Coldfield, Dudley, Sandwell, Walsall, Wolverhampton, and the wider West Midlands region.",
    whyLocal: "Birmingham is a major medical hub with diverse GP practices, teaching hospitals, and private clinics. We understand the local healthcare economy and the financial needs of Birmingham-based doctors, from NHS contract management to private practice growth.",
    services: [
      {
        title: "GP partnership accounting",
        desc: "Birmingham GP practices need specialist accounting for partnership structures, profit allocation, and NHS pension reconciliation. We provide year-round support and strategic tax advice.",
      },
      {
        title: "Consultant tax planning",
        desc: "For Birmingham consultants managing NHS and private work, we handle tax returns, pension planning, and income optimization across multiple revenue streams.",
      },
      {
        title: "Locum doctor tax returns",
        desc: "Birmingham locums working across the West Midlands need expert tax support. We manage self assessment, expense claims, and tax efficiency strategies.",
      },
    ],
  },
  leeds: {
    intro: "We're specialist medical accountants serving GPs, consultants, and medical practice owners across Leeds. Whether you're in the City Centre, Chapel Allerton, Roundhay, or anywhere across West Yorkshire, we provide expert GP accounting and tax services for medical professionals.",
    areas: "We work with doctors across Leeds City Centre, Chapel Allerton, Roundhay, Headingley, Horsforth, Wetherby, and the wider West Yorkshire region including Bradford, Wakefield, and Huddersfield.",
    whyLocal: "Leeds has a strong medical sector with established GP practices, teaching hospitals, and growing private healthcare provision. We understand the Yorkshire healthcare landscape and the financial priorities of Leeds-based doctors.",
    services: [
      {
        title: "GP partnership accounting",
        desc: "Leeds GP practices benefit from specialist accounting for partnership structures, NHS contract management, and tax-efficient profit extraction. We provide comprehensive year-round support.",
      },
      {
        title: "Consultant tax planning",
        desc: "For Leeds consultants with NHS hospital roles and private practice work, we manage your tax position, pension contributions, and annual allowance calculations.",
      },
      {
        title: "Locum doctor tax returns",
        desc: "Leeds locums need reliable tax support for multiple engagements. We handle self assessment, expense optimization, and payment on account management.",
      },
    ],
  },
  bristol: {
    intro: "We're specialist medical accountants serving GPs, consultants, and medical practice owners across Bristol. Whether you're in Clifton, the City Centre, or anywhere across the South West, we provide expert GP accounting and tax services for medical professionals.",
    areas: "We work with doctors across Bristol City Centre, Clifton, Redland, Westbury-on-Trym, and the wider South West region including Bath, Gloucester, Cheltenham, and Exeter.",
    whyLocal: "Bristol's medical sector combines established GP practices with innovative private healthcare providers. We understand the South West healthcare market and the financial needs of Bristol-based doctors, from practice management to private work expansion.",
    services: [
      {
        title: "GP partnership accounting",
        desc: "Bristol GP practices need specialist support for partnership accounts, profit allocation, and NHS pension planning. We provide strategic tax advice and year-round financial guidance.",
      },
      {
        title: "Consultant tax planning",
        desc: "For Bristol consultants managing NHS and private income, we handle tax returns, pension optimization, and income structuring across multiple roles.",
      },
      {
        title: "Locum doctor tax returns",
        desc: "Bristol locums working across the South West need expert tax management. We handle self assessment, expense claims, and tax efficiency planning.",
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

  const jsonLd = buildLocalBusinessJsonLd({
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    description: siteConfig.description,
    city: cityName,
    url: `${siteConfig.url}/locations/${slug}`,
    logo: `${siteConfig.url}${siteConfig.publisherLogoUrl}`,
    email: siteConfig.contact.email,
    phone: siteConfig.contact.phone,
    areaServed: cityName,
    organizationType: "ProfessionalService",
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
      <div className={`${contentNarrow} ${sectionY}`}>
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Locations", href: "/locations" },
            { label: cityName },
          ]}
        />
        <h1 className="font-serif text-3xl font-semibold leading-tight text-[var(--ink)] sm:text-4xl">
          GP Accountant {cityName}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-[var(--muted)] sm:text-lg">
          {content.intro}
        </p>

        <div className="mt-10 rounded-2xl border border-[var(--medical-teal)]/20 bg-gradient-to-br from-[var(--medical-teal)]/5 to-transparent p-6 sm:mt-12 sm:p-8">
          <h2 className="font-serif text-lg font-semibold text-[var(--ink)] sm:text-xl">
            Areas we serve in {cityName}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)] sm:text-base">
            {content.areas}
          </p>
        </div>

        <section className="mt-12 sm:mt-16">
          <h2 className="font-serif text-2xl font-semibold text-[var(--ink)] sm:text-3xl">
            Medical accounting services in {cityName}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[var(--muted)]">
            {content.whyLocal}
          </p>
          <div className="mt-8 space-y-6 sm:mt-10">
            {content.services.map((service) => (
              <div key={service.title} className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
                <h3 className="font-serif text-lg font-semibold text-[var(--ink)] sm:text-xl">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--muted)] sm:text-base">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {posts.length > 0 && (
          <section className="mt-12 sm:mt-16">
            <h2 className="font-serif text-xl font-semibold text-[var(--ink)] sm:text-2xl">
              Related articles
            </h2>
            <ul className="mt-6 space-y-4">
              {posts.map((p) => (
                <li key={p.slug}>
                  <article className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6">
                    <p className="text-xs font-semibold uppercase tracking-wide text-[var(--accent-strong)]">
                      {p.category}
                    </p>
                    <h3 className="mt-2 font-serif text-base font-semibold text-[var(--ink)] sm:text-lg">
                      <Link
                        href={`/blog/${p.slug}`}
                        className={`hover:text-[var(--accent-strong)] transition-colors ${focusRing} rounded`}
                      >
                        {p.title}
                      </Link>
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{p.summary}</p>
                  </article>
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="mt-12 sm:mt-16">
          <CTASection
            title={`Book a consultation with a ${cityName} medical accountant`}
            description="Tell us about your role and financial priorities. We'll arrange a short introductory call to discuss how we can support your medical practice."
          />
        </div>
      </div>
    </>
  );
}
