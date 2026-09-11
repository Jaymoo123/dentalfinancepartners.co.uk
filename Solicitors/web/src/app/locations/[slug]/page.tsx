import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Video } from "lucide-react";
import {
  btnPrimary,
  btnSecondary,
  focusRing,
  sectionY,
  sectionYLoose,
  siteContainerLg,
} from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { getAllPosts, getCategorySlug } from "@/lib/blog";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { JsonLd } from "@/lib/schema/index";
import { SolicitorsBackdrop } from "@/components/layout/SolicitorsBackdrop";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import { LeadForm } from "@/components/forms/LeadForm";
import { Eyebrow } from "@accounting-network/web-shared/design/primitives/page-blocks";
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
  // ponytail: `county` is in niche.config.json for all five cities but absent
  // from the shared NicheConfig type, which is off limits this phase. Local
  // cast, guarded, rather than a type edit in packages/web-shared.
  const county = (loc as { county?: string } | undefined)?.county;

  if (!content) {
    notFound();
  }

  const allPosts = getAllPosts();
  const localPosts = allPosts.filter((p) =>
    p.slug.toLowerCase().includes(slug) || p.title.toLowerCase().includes(cityName.toLowerCase())
  );

  // The areas sentence, re-presented as a chip row: same words, same order, a
  // different presentation instead of a wall of commas. Everything up to and
  // including " across " stays prose; the rest splits on the commas the
  // sentence already carries. No word is added or dropped, which is what the
  // 2026-09-11 hard rule requires. Falls back to the plain sentence if a
  // future city string has no " across " clause.
  const acrossAt = content.areas.indexOf(" across ");
  const areaLead = acrossAt === -1 ? content.areas : content.areas.slice(0, acrossAt + 8);
  const areaChips =
    acrossAt === -1 ? [] : content.areas.slice(acrossAt + 8).split(/,\s+/).filter(Boolean);

  // No public phone number is published, so phone is intentionally omitted:
  // the builder then emits no `telephone` field in the LocalBusiness JSON-LD.
  const localBusinessSchema = buildAccountingService(
    {
      name: `${siteConfig.name} - ${cityName}`,
      description: siteConfig.description,
      url: `${siteConfig.url}/locations/${slug}`,
      city: cityName,
      areaServed: [cityName],
    },
    {
      siteUrl: siteConfig.url,
      siteName: siteConfig.name,
      legalName: siteConfig.legalName,
      publisherLogoUrl: siteConfig.publisherLogoUrl,
      email: siteConfig.contact.email,
    },
  );

  return (
    <>
      <JsonLd data={localBusinessSchema} />

      <section className="relative overflow-hidden bg-slate-900">
        <div className={`${siteContainerLg} ${sectionYLoose} relative z-10`}>
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Locations", href: "/locations" },
              { label: cityName },
            ]}
            variant="light"
          />
          {/* Narrow measure on hero copy only; every body section below is
              siteContainerLg. The eyebrow is the county from siteConfig,
              existing data rather than new prose. */}
          <div className="mt-8 max-w-3xl">
            {county && <Eyebrow onDark>{county}</Eyebrow>}
            <h1 className="text-3xl font-bold leading-[1.15] text-white sm:text-4xl lg:text-5xl">
              {loc.title}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-slate-300 sm:text-lg">
              {content.intro}
            </p>
          </div>
        </div>
        <SolicitorsBackdrop tone="navy" />
      </section>

      <section className="bg-slate-50">
        <div className={`${siteContainerLg} ${sectionY}`}>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Areas we cover</h2>
          {areaChips.length > 0 ? (
            <>
              <p className="mt-3 text-base leading-relaxed text-slate-600">{areaLead.trim()}</p>
              <ul className="mt-5 flex list-none flex-wrap gap-2 pl-0">
                {areaChips.map((area) => (
                  <li
                    key={area}
                    className="inline-flex items-center rounded-xl bg-white px-4 py-2 text-sm text-slate-700 ring-1 ring-slate-200/70"
                  >
                    {area}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="mt-3 text-base leading-relaxed text-slate-600">{content.areas}</p>
          )}
        </div>
      </section>

      <section className="bg-white">
        <div className={`${siteContainerLg} ${sectionY}`}>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Why choose a specialist solicitor accountant in {cityName}?
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-600">
            {content.whyLocal}
          </p>
        </div>
      </section>

      {/* Slate ground so the white .card-flat tiles oppose it. globals.css
          already carries the standard card recipe (ring, 4px radius): do not
          inline it here. */}
      <section className="bg-slate-50">
        <div className={`${siteContainerLg} ${sectionY}`}>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Services for {cityName} solicitors
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {content.services.map((service, i) => (
              <div key={i} className="card-flat h-full">
                <h3 className="text-lg font-bold text-slate-900">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dead on this corpus: the filter matches no post for any of the five
          cities. Left in place deliberately - picking a fallback hub would add
          links and a heading that do not exist today (owner item). */}
      {localPosts.length > 0 && (
        <section className="bg-white">
          <div className={`${siteContainerLg} ${sectionY}`}>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              {cityName} solicitor accounting guides
            </h2>
            <ul className="mt-6 grid list-none gap-6 pl-0 md:grid-cols-2">
              {localPosts.slice(0, 5).map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${getCategorySlug(post)}/${post.slug}`}
                    className={`group block h-full rounded-xl bg-slate-50 p-6 no-underline ring-1 ring-slate-200/70 transition-shadow hover:shadow-md ${focusRing}`}
                  >
                    <span className="font-bold text-slate-900 group-hover:text-primary-700">
                      {post.title}
                    </span>
                    {post.summary && (
                      <span className="mt-2 block text-sm text-slate-600">{post.summary}</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="bg-white">
        <div className={`${siteContainerLg} ${sectionY}`}>
          <div className="rounded-xl bg-slate-50 p-6 ring-1 ring-slate-200/70 sm:p-8">
            <span
              className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600 ring-1 ring-primary-100"
              aria-hidden
            >
              <Video className="h-6 w-6" strokeWidth={1.75} />
            </span>
            <h2 className="mt-4 text-2xl font-bold text-slate-900 sm:text-3xl">
              Remote service for {cityName} solicitors
            </h2>
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-600">
              While we work with many {cityName}-based solicitors and law firms, all our services are available remotely. SRA compliance reviews, partnership tax returns, and practice succession planning can be handled efficiently with secure document sharing and video calls. You don't need to be based in {cityName} to benefit from specialist legal sector accounting.
            </p>
          </div>
        </div>
      </section>

      {/* One closing ask where there were two stacked (a bare button and a
          CTASection). The button's own label becomes the panel's form title
          and the CTASection pair becomes the footnote, so every existing
          string, href and data-cta id survives unchanged. */}
      <div id="book" className="scroll-mt-24">
        <LeadCTAPanel
          contained
          ground="white"
          title={`Ready to work with a specialist solicitor accountant in ${cityName}?`}
          description="Book a free consultation to discuss your practice's accounting needs. We'll provide clear advice with no obligation."
          formTitle="Book free consultation"
          proofPoints={[]}
          form={<LeadForm redirectOnSuccess={false} />}
          footnote={
            <span className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/contact"
                className={`${btnPrimary} w-full min-w-0 sm:w-auto`}
                data-cta="cta-section-primary"
              >
                Speak to a specialist
              </Link>
              <Link
                href="/services"
                className={`${btnSecondary} w-full min-w-0 sm:w-auto`}
                data-cta="cta-section-secondary"
              >
                View services
              </Link>
            </span>
          }
        />
      </div>
    </>
  );
}
