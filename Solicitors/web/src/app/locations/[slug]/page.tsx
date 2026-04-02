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
    title: `Solicitor Accountant ${cityName} | Law Firm Accountants UK`,
    description: `Specialist solicitor accountant in ${cityName} for law firms, sole practitioners & legal practices. SRA compliance, partnership tax, LLP conversion. Book free consultation.`,
    alternates: { canonical },
    openGraph: {
      title: `Solicitor Accountant ${cityName} | Accounts for Lawyers`,
      description: `Specialist solicitor accountant in ${cityName}. SRA compliance, partnership tax, practice succession advice.`,
      url: canonical,
      type: "website",
      images: [{ url: siteConfig.publisherLogoUrl, alt: siteConfig.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `Solicitor Accountant ${cityName}`,
      description: `Specialist solicitor accountant in ${cityName} for legal professionals.`,
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
    intro: "We're specialist solicitor accountants serving law firms, sole practitioners, and legal practice owners across London. Whether you're based in the City, West End, Canary Wharf, or anywhere across Greater London, we provide expert legal sector accounting and tax services.",
    areas: "We work with solicitors across Central London, North London, South London, East London, and West London — including the City, Westminster, Camden, Islington, Southwark, Lambeth, Wandsworth, and surrounding boroughs.",
    whyLocal: "London has the highest concentration of law firms in the UK, from Magic Circle firms in the City to high street practices in every borough. We understand the London legal landscape, including complex partnership structures, high practice costs, and the competitive market for legal services.",
    services: [
      {
        title: "SRA compliance & trust accounting",
        desc: "London law firms need rigorous client money handling and SRA Accounts Rules compliance. We provide 5-week reconciliations, Accountant's Reports, and COFA support for practices of all sizes.",
      },
      {
        title: "Partnership & LLP tax",
        desc: "For London law firms with complex partnership structures or considering LLP conversion, we handle partnership tax returns, profit allocations, and structure optimization advice.",
      },
      {
        title: "Practice succession planning",
        desc: "London practices need expert succession planning for partner retirements and practice sales. We provide valuations, tax planning, and exit strategy advice.",
      },
    ],
  },
  manchester: {
    intro: "We're specialist solicitor accountants serving law firms, sole practitioners, and legal practice owners across Manchester. Whether you're based in Spinningfields, the City Centre, or anywhere across Greater Manchester, we provide expert legal sector accounting and tax services.",
    areas: "We work with solicitors across Manchester City Centre, Salford, Trafford, Stockport, Oldham, Rochdale, Bury, Bolton, Wigan, and surrounding areas of Greater Manchester.",
    whyLocal: "Manchester's legal sector is thriving, with major commercial firms in Spinningfields and established high street practices throughout the region. We understand the local legal market and the specific financial challenges Manchester-based solicitors face.",
    services: [
      {
        title: "SRA compliance & trust accounting",
        desc: "Manchester law firms require expert client money handling and SRA compliance. We provide reconciliations, Accountant's Reports, and regulatory support.",
      },
      {
        title: "Partnership & LLP tax",
        desc: "For Manchester law firms navigating partnership taxation or LLP conversion, we handle tax returns, profit allocations, and structure advice.",
      },
      {
        title: "Sole practitioner tax",
        desc: "Manchester sole practitioners need reliable self-assessment and MTD compliance support. We handle tax returns, expense optimization, and quarterly submissions.",
      },
    ],
  },
  birmingham: {
    intro: "We're specialist solicitor accountants serving law firms, sole practitioners, and legal practice owners across Birmingham. Whether you're in Colmore Row, the City Centre, or anywhere across the West Midlands, we provide expert legal sector accounting and tax services.",
    areas: "We work with solicitors across Birmingham City Centre, Colmore Row, Edgbaston, Solihull, Sutton Coldfield, Dudley, Sandwell, Walsall, Wolverhampton, and the wider West Midlands region.",
    whyLocal: "Birmingham is a major legal hub with diverse law firms from large commercial practices to established high street firms. We understand the West Midlands legal market and the financial needs of Birmingham-based solicitors.",
    services: [
      {
        title: "SRA compliance & trust accounting",
        desc: "Birmingham law firms need rigorous SRA Accounts Rules compliance and client money handling. We provide reconciliations, Accountant's Reports, and COFA support.",
      },
      {
        title: "Partnership & LLP tax",
        desc: "For Birmingham law firms with partnership or LLP structures, we handle tax returns, profit allocations, and structure optimization advice.",
      },
      {
        title: "Practice finance & cash flow",
        desc: "Birmingham practices need expert cash flow management and lock-up reduction strategies. We provide working capital advice and partner drawings planning.",
      },
    ],
  },
  leeds: {
    intro: "We're specialist solicitor accountants serving law firms, sole practitioners, and legal practice owners across Leeds. Whether you're in the City Centre, Chapel Allerton, or anywhere across West Yorkshire, we provide expert legal sector accounting and tax services.",
    areas: "We work with solicitors across Leeds City Centre, Chapel Allerton, Headingley, Horsforth, Wetherby, and the wider West Yorkshire region including Bradford, Wakefield, and Huddersfield.",
    whyLocal: "Leeds has a strong legal sector with established commercial firms and thriving high street practices. We understand the Yorkshire legal market and the financial priorities of Leeds-based solicitors.",
    services: [
      {
        title: "SRA compliance & trust accounting",
        desc: "Leeds law firms require expert SRA Accounts Rules compliance and client money management. We provide reconciliations, Accountant's Reports, and regulatory guidance.",
      },
      {
        title: "Partnership & LLP tax",
        desc: "For Leeds law firms with partnership structures or considering LLP conversion, we handle tax returns, profit allocations, and structure advice.",
      },
      {
        title: "Sole practitioner tax",
        desc: "Leeds sole practitioners benefit from specialist self-assessment, MTD compliance, and tax planning support tailored to legal professionals.",
      },
    ],
  },
  bristol: {
    intro: "We're specialist solicitor accountants serving law firms, sole practitioners, and legal practice owners across Bristol. Whether you're in the City Centre, Clifton, or anywhere across the South West, we provide expert legal sector accounting and tax services.",
    areas: "We work with solicitors across Bristol City Centre, Clifton, Redland, Westbury-on-Trym, and the wider South West region including Bath, Gloucester, Cheltenham, and Exeter.",
    whyLocal: "Bristol's legal sector combines established commercial firms with innovative high street practices. We understand the South West legal market and the financial needs of Bristol-based solicitors, from SRA compliance to practice growth.",
    services: [
      {
        title: "SRA compliance & trust accounting",
        desc: "Bristol law firms need rigorous client money handling and SRA compliance. We provide 5-week reconciliations, Accountant's Reports, and COFA support.",
      },
      {
        title: "Partnership & LLP tax",
        desc: "For Bristol law firms managing partnership taxation or LLP structures, we handle tax returns, profit allocations, and structure optimization.",
      },
      {
        title: "Practice succession planning",
        desc: "Bristol practices need expert succession planning for partner retirements and practice transitions. We provide valuations, tax planning, and exit strategies.",
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
  
  const cityName = slug.charAt(0).toUpperCase() + slug.slice(1);
  const content = cityContent[slug];
  
  if (!content) {
    notFound();
  }
  
  const allPosts = getAllPosts();
  const localPosts = allPosts.filter((p) =>
    p.slug.toLowerCase().includes(slug) || p.title.toLowerCase().includes(cityName.toLowerCase())
  );
  
  const localBusinessSchema = buildLocalBusinessJsonLd({
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    description: siteConfig.description,
    url: `${siteConfig.url}/locations/${slug}`,
    logo: `${siteConfig.url}${siteConfig.publisherLogoUrl}`,
    email: siteConfig.contact.email,
    phone: siteConfig.contact.phone,
    areaServed: content.areas,
    city: cityName,
    organizationType: "ProfessionalService",
  });
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: localBusinessSchema }}
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
          {loc.title}
        </h1>
        
        <p className="mt-4 text-base leading-relaxed text-[var(--muted)] sm:text-lg">
          {content.intro}
        </p>
        
        <div className="mt-10 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
          <h2 className="font-serif text-lg font-semibold text-[var(--ink)] sm:text-xl">
            Areas we cover
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)] sm:text-base">
            {content.areas}
          </p>
        </div>
        
        <div className="mt-10">
          <h2 className="font-serif text-2xl font-semibold text-[var(--ink)] sm:text-3xl">
            Why choose a specialist solicitor accountant in {cityName}?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[var(--muted)]">
            {content.whyLocal}
          </p>
        </div>
        
        <div className="mt-10">
          <h2 className="font-serif text-2xl font-semibold text-[var(--ink)] sm:text-3xl">
            Services for {cityName} solicitors
          </h2>
          <div className="mt-6 space-y-6">
            {content.services.map((service, i) => (
              <div key={i} className="card-flat">
                <h3 className="text-lg font-semibold text-[var(--primary)]">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
        
        {localPosts.length > 0 && (
          <div className="mt-12">
            <h2 className="font-serif text-2xl font-semibold text-[var(--ink)] sm:text-3xl">
              {cityName} solicitor accounting guides
            </h2>
            <ul className="mt-6 space-y-4 pl-0">
              {localPosts.slice(0, 5).map((post) => (
                <li key={post.slug} className="list-none">
                  <Link
                    href={`/blog/${getCategorySlug(post)}/${post.slug}`}
                    className={`card-flat block rounded-lg p-4 no-underline transition-shadow hover:shadow-md ${focusRing}`}
                  >
                    <span className="font-semibold text-[var(--primary)]">{post.title}</span>
                    {post.summary && (
                      <span className="mt-2 block text-sm text-[var(--muted)]">{post.summary}</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        <div className="mt-12 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
          <h2 className="font-serif text-lg font-semibold text-[var(--ink)] sm:text-xl">
            Remote service for {cityName} solicitors
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)] sm:text-base">
            While we work with many {cityName}-based solicitors and law firms, all our services are available remotely. SRA compliance reviews, partnership tax returns, and practice succession planning can be handled efficiently with secure document sharing and video calls. You don't need to be based in {cityName} to benefit from specialist legal sector accounting.
          </p>
        </div>
        
        <div className="mt-10 text-center">
          <Link href="/contact" className={btnPrimary}>
            Book free consultation
          </Link>
        </div>
        
        <div className="mt-12">
          <CTASection
            title={`Ready to work with a specialist solicitor accountant in ${cityName}?`}
            description="Book a free consultation to discuss your practice's accounting needs. We'll provide clear advice with no obligation."
          />
        </div>
      </div>
    </>
  );
}
