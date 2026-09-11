import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CalendarClock, Stethoscope, Users } from "lucide-react";
import { Eyebrow } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { CoverageCards } from "@accounting-network/web-shared/design/marketing/CoverageCards";
import { DrawnTickList } from "@accounting-network/web-shared/design/marketing/DrawnTickList";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import { RelatedArticles } from "@accounting-network/web-shared/design/blog/RelatedArticles";
import { btnPrimary, btnOnDark, focusRing, siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { getPostBySlug } from "@/lib/blog";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { MedicalBackdrop } from "@/components/layout/MedicalBackdrop";
import { LeadForm } from "@/components/forms/LeadForm";
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
  const meta = cityMeta[slug];
  return {
    title: `Medical Accountants in ${cityName} for GPs and Consultants`,
    description: meta.description,
    alternates: { canonical },
    openGraph: {
      title: `Medical Accountants in ${cityName} for GPs and Consultants`,
      description: meta.social,
      url: canonical,
      type: "website",
      images: [{ url: siteConfig.publisherLogoUrl, alt: siteConfig.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `Medical Accountants in ${cityName} for GPs and Consultants`,
      description: meta.social,
      images: [siteConfig.publisherLogoUrl],
    },
  };
}

/**
 * Per-city metadata. Written once per city rather than templated off the city
 * name, and phrased to the matching model: the enquiry is matched to a
 * specialist firm, so no line may assert an accountant sitting in the city.
 * The visible body and the JSON-LD below say the same thing.
 */
const cityMeta: Record<string, { description: string; social: string }> = {
  london: {
    description:
      "GPs, consultants and medical practices across London matched with specialist medical accountants. NHS Pension annual allowance, partnership accounts, private practice and locum tax.",
    social:
      "London medical enquiries matched with accountants who work with doctors. NHS Pension, GP partnership accounts, private practice and locum tax.",
  },
  manchester: {
    description:
      "Greater Manchester doctors and GP practices matched with accountants whose work is medical. Partnership accounts, NHS Pension annual allowance, locum tax and private income.",
    social:
      "Greater Manchester medical enquiries matched with accountants who work with doctors. Partnership accounts, NHS Pension and locum tax.",
  },
  birmingham: {
    description:
      "Birmingham and West Midlands doctors matched with specialist medical accountants. GP partnership accounts, PCSE reconciliation, NHS Pension annual allowance and consultant private practice.",
    social:
      "Birmingham and West Midlands medical enquiries matched with accountants who work with doctors. Partnership accounts, NHS Pension and private practice.",
  },
  leeds: {
    description:
      "Leeds and West Yorkshire doctors matched with accountants who work only with medical clients. Partnership accounts, NHS Pension annual allowance, Scheme Pays and locum tax returns.",
    social:
      "Leeds and West Yorkshire medical enquiries matched with accountants who work with doctors. Partnership accounts, NHS Pension and locum tax.",
  },
  bristol: {
    description:
      "Bristol and South West doctors matched with specialist medical accountants. GP partnership accounts, NHS Pension annual allowance, private practice incorporation and locum tax.",
    social:
      "Bristol and South West medical enquiries matched with accountants who work with doctors. Partnership accounts, NHS Pension and private practice.",
  },
};

/**
 * The three service lines are the same three on every city page, so they live
 * once. Only the per-city `desc` varies, and `services` below is indexed
 * against this array. `/services` carries the same three titles and should
 * import this constant; that edit is outside this file's scope.
 */
const SERVICE_LINES = [
  { title: "GP partnership accounting", icon: Users },
  { title: "Consultant tax planning", icon: Stethoscope },
  { title: "Locum doctor tax returns", icon: CalendarClock },
];

/**
 * `related` is three FLAT blog slugs. Medical's blog URLs are `/blog/<slug>`;
 * `/blog/<category>/<slug>` 404s here, so the kind pill is set explicitly
 * rather than derived from the href (the kit derives a one-segment /blog path
 * as a category hub, which these are not).
 *
 * The first slug on every city is that city's own article, so the rail carries
 * one genuinely local link. The other two follow the three service lines above
 * and differ per city, so five competing local pages do not ship an identical
 * three-card block.
 */
const cityContent: Record<string, {
  intro: string;
  areas: string[];
  whyLocal: string;
  services: string[];
  related: string[];
}> = {
  london: {
    intro: "Enquiries from GPs, consultants and medical practice owners across London are matched with specialist medical accountants. Whether you are in Harley Street, the City, Canary Wharf or anywhere across Greater London, you are put in front of a firm that works with doctors rather than a general practice accountant.",
    areas: ["Westminster", "Camden", "Islington", "Hackney", "Tower Hamlets", "Southwark", "Lambeth", "Wandsworth", "Hammersmith and Fulham", "Kensington and Chelsea", "Central London", "North London", "South London", "East London", "West London"],
    whyLocal: "London has the highest concentration of medical professionals in the UK, from GP surgeries in every borough to major teaching hospitals and private consulting rooms. The firms in the network understand the London medical landscape, including higher practice costs, competitive private markets, and the complex mix of NHS and private income streams.",
    services: [
      "London GP practices often have complex partnership structures with multiple partners and salaried GPs. Partnership accounts, profit allocation, tax returns and NHS pension reconciliation are handled together.",
      "For London consultants balancing NHS hospital work with private practice, mixed income streams, tax efficiency and NHS pension annual allowance complexities are read as one position.",
      "London locums working across multiple practices need specialist tax support: self assessment, expense claims, payments on account, and advice on the VAT registration threshold.",
    ],
    related: ["gp-accountant-london", "gp-partnership-tax-complete-guide", "private-practice-tax-nhs-and-private-income"],
  },
  manchester: {
    intro: "Enquiries from GPs, consultants and medical practice owners across Manchester are matched with specialist medical accountants. Whether you are in the City Centre, Salford, Trafford or anywhere across Greater Manchester, you are put in front of a firm whose work is medical.",
    areas: ["Manchester City Centre", "Salford", "Trafford", "Stockport", "Oldham", "Rochdale", "Bury", "Bolton", "Wigan"],
    whyLocal: "Manchester's medical sector is thriving, with a strong mix of NHS GP surgeries, private clinics and teaching hospitals. The firms in the network understand the local healthcare landscape and the specific financial questions Manchester-based doctors bring, from practice management to private work alongside NHS commitments.",
    services: [
      "Manchester GP practices range from small partnerships to large multi-site operations. Partnership accounts, profit shares, tax returns and NHS pension reporting are handled together.",
      "For Manchester consultants with NHS and private income, the tax position, pension contributions and annual allowance calculations are worked through in one place.",
      "Manchester locums need reliable tax support across several income sources: self assessment, expenses claimed properly, and tax set aside before it is due.",
    ],
    related: ["gp-accountant-manchester", "nhs-pension-annual-allowance-complete-guide", "locum-doctor-tax-complete-guide"],
  },
  birmingham: {
    intro: "Enquiries from GPs, consultants and medical practice owners across Birmingham are matched with specialist medical accountants. Whether you are in the City Centre, Edgbaston, Solihull or anywhere across the West Midlands, you are put in front of a firm that works with doctors.",
    areas: ["Birmingham City Centre", "Edgbaston", "Solihull", "Sutton Coldfield", "Dudley", "Sandwell", "Walsall", "Wolverhampton"],
    whyLocal: "Birmingham is a major medical hub with diverse GP practices, teaching hospitals and private clinics. The firms in the network understand the local healthcare economy and the financial questions Birmingham-based doctors bring, from NHS contract income to private practice growth.",
    services: [
      "Birmingham GP practices need specialist accounting for partnership structures, profit allocation and NHS pension reconciliation, with year-round support rather than one conversation a year.",
      "For Birmingham consultants managing NHS and private work, tax returns, pension planning and income structured across several revenue streams are handled together.",
      "Birmingham locums working across the West Midlands need expert tax support: self assessment, expense claims, and a tax position that does not surprise them in January.",
    ],
    related: ["gp-accountant-birmingham", "gp-partner-vs-salaried-gp-tax-comparison", "medical-professional-expenses-what-is-claimable"],
  },
  leeds: {
    intro: "Enquiries from GPs, consultants and medical practice owners across Leeds are matched with specialist medical accountants. Whether you are in the City Centre, Chapel Allerton, Roundhay or anywhere across West Yorkshire, you are put in front of a firm whose work is medical.",
    areas: ["Leeds City Centre", "Chapel Allerton", "Roundhay", "Headingley", "Horsforth", "Wetherby", "Bradford", "Wakefield", "Huddersfield"],
    whyLocal: "Leeds has a strong medical sector with established GP practices, teaching hospitals and growing private healthcare provision. The firms in the network understand the Yorkshire healthcare landscape and the financial priorities Leeds-based doctors bring to a first conversation.",
    services: [
      "Leeds GP practices benefit from specialist accounting for partnership structures, NHS contract income and tax-efficient profit extraction, supported through the year.",
      "For Leeds consultants with NHS hospital roles and private practice work, the tax position, pension contributions and annual allowance calculations are read together.",
      "Leeds locums need reliable tax support across several engagements: self assessment, expenses claimed properly, and payments on account managed rather than discovered.",
    ],
    related: ["gp-accountant-leeds", "gp-partner-drawings-vs-profit-tax-reserving", "nhs-pension-scheme-pays-doctors-deadlines"],
  },
  bristol: {
    intro: "Enquiries from GPs, consultants and medical practice owners across Bristol are matched with specialist medical accountants. Whether you are in Clifton, the City Centre or anywhere across the South West, you are put in front of a firm that works with doctors.",
    areas: ["Bristol City Centre", "Clifton", "Redland", "Westbury-on-Trym", "Bath", "Gloucester", "Cheltenham", "Exeter"],
    whyLocal: "Bristol's medical sector combines established GP practices with newer private healthcare providers. The firms in the network understand the South West healthcare market and the financial questions Bristol-based doctors bring, from practice management to expanding private work.",
    services: [
      "Bristol GP practices need specialist support for partnership accounts, profit allocation and NHS pension planning, with advice available through the year rather than at year end only.",
      "For Bristol consultants managing NHS and private income, tax returns, pension optimisation and income structuring across several roles are handled as one position.",
      "Bristol locums working across the South West need expert tax management: self assessment, expense claims, and a clear view of what to set aside.",
    ],
    related: ["gp-accountant-bristol", "private-practice-incorporation-complete-guide", "locum-doctor-expenses-what-you-can-claim"],
  },
};

/** Hero trust row. Mechanisms only: no fee, no turnaround, no client count,
 *  and nothing implying an in-house team in the city. */
const TRUST_POINTS = [
  "Medical work only",
  "Matched to a specialist firm",
  "NHS pension, practice and personal return read together",
];

/** Closing-panel proof points, same three mechanisms. */
const MEDICAL_PROOF_POINTS = [
  { title: "Medical work only", detail: "NHS pension, practice accounts and private practice" },
  { title: "Matched to a specialist firm", detail: "Your enquiry goes to accountants who work with doctors" },
  { title: "One position, not three", detail: "Practice, pension and personal return read together" },
];

export default async function LocationPage({ params }: Props) {
  const { slug } = await params;
  const loc = siteConfig.locations.find((l) => l.slug === slug);
  if (!loc) {
    notFound();
  }

  const content = cityContent[slug];
  const cityName = slug.charAt(0).toUpperCase() + slug.slice(1);

  // Flat /blog/<slug> only. A slug that ever stops resolving drops out rather
  // than rendering a link to a 404.
  const related = content.related
    .map((s) => getPostBySlug(s))
    .filter((p): p is NonNullable<typeof p> => p !== null)
    .map((p) => ({
      href: `/blog/${p.slug}`,
      title: p.title,
      excerpt: p.summary,
      kind: "article" as const,
    }));

  // AccountingService (LocalBusiness sub-type). Phone is intentionally omitted:
  // the business publishes no public phone, so no telephone is emitted in JSON-LD.
  //
  // The postal-address node the shared builder always attaches is DELETED here.
  // There is no office in this city: an enquiry is matched to a firm in the
  // partner network. A machine-readable addressLocality is a stronger claim than the
  // prose, and it was contradicting it. areaServed (emitted below as City) is
  // the honest construct for "this area is served".
  const service = buildAccountingService(
    {
      name: siteConfig.name,
      description: siteConfig.description,
      city: cityName,
      url: `${siteConfig.url}/locations/${slug}`,
      areaServed: [cityName],
    },
    {
      siteUrl: siteConfig.url,
      siteName: siteConfig.name,
      legalName: siteConfig.legalName,
      description: siteConfig.description,
      publisherLogoUrl: siteConfig.publisherLogoUrl,
    },
  ) as Record<string, unknown>;
  delete service.address;
  const jsonLd = JSON.stringify(service);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      <section className="relative flex min-h-[300px] items-center overflow-hidden bg-slate-900 py-10 sm:min-h-[350px] sm:py-12 lg:py-14">
        <MedicalBackdrop tone="navy" />
        <div className={`${siteContainerLg} relative z-10`}>
          <div className="max-w-3xl">
            {/* Not suppressed: the script above is AccountingService only, so
                this is the page's single BreadcrumbList. */}
            <Breadcrumb
              variant="light"
              items={[
                { label: "Home", href: "/" },
                { label: "Locations", href: "/locations" },
                { label: cityName },
              ]}
            />
            <Eyebrow onDark>{cityName}</Eyebrow>
            <h1 className="text-3xl font-bold leading-[1.15] text-white sm:text-5xl lg:text-6xl">
              GP accountant {cityName}
            </h1>
            <p className="mt-4 text-base leading-7 text-slate-300 sm:mt-6 sm:text-lg">
              {content.intro}
            </p>
            {/* The list inherits its text colour, so it is set here: the kit
                only colours the tick. */}
            <DrawnTickList
              items={TRUST_POINTS}
              className="mt-6 list-none space-y-3 pl-0 text-sm text-slate-200 sm:mt-8 sm:text-base"
            />
            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-4">
              <Link
                href="#book"
                data-cta={`location_${slug}_hero_book`}
                data-cta-placement="location_hero"
                data-cta-goal="form"
                className={btnPrimary}
              >
                Speak to a medical accountant in {cityName}
              </Link>
              <Link
                href="#services"
                data-cta={`location_${slug}_hero_services`}
                data-cta-placement="location_hero"
                className={btnOnDark}
              >
                What the work covers
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12 sm:py-16">
        <div className={siteContainerLg}>
          <Eyebrow>Areas covered</Eyebrow>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Areas we cover in and around {cityName}
          </h2>
          <ul className="mt-6 flex list-none flex-wrap gap-2 pl-0">
            {content.areas.map((area) => (
              <li
                key={area}
                className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 ring-1 ring-slate-200"
              >
                {area}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="services" className="scroll-mt-24 bg-white py-16 sm:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>The work</Eyebrow>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">
            Medical accounting services in {cityName}
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-600 sm:text-lg">
            {content.whyLocal}
          </p>
          <div className="mt-10">
            <CoverageCards
              columns={3}
              tone="slate"
              items={SERVICE_LINES.map((line, i) => ({
                title: line.title,
                body: content.services[i],
                icon: line.icon,
              }))}
            />
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-slate-50 py-16 sm:py-20">
          <div className={siteContainerLg}>
            <Eyebrow>Further reading</Eyebrow>
            {/* Deliberately NOT "articles about {city}". One of the three is the
                city's own article; the other two are topical. The heading only
                claims what the rail actually holds. */}
            <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">
              Guides on the work above
            </h2>
            <RelatedArticles items={related} columns={3} className="mt-8" />
          </div>
        </section>
      )}

      <section className="bg-white py-16 sm:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>Other cities</Eyebrow>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Medical accountants in other UK cities
          </h2>
          <ul className="mt-6 grid list-none gap-3 pl-0 sm:grid-cols-2 lg:grid-cols-4">
            {siteConfig.locations
              .filter((l) => l.slug !== slug)
              .map((l) => {
                const siblingCity = l.slug.charAt(0).toUpperCase() + l.slug.slice(1);
                return (
                  <li key={l.slug}>
                    <Link
                      href={`/locations/${l.slug}`}
                      data-cta={`location_${slug}_sibling_${l.slug}`}
                      data-cta-placement="location_siblings"
                      className={`flex items-center justify-between gap-2 rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200 transition-all hover:shadow-md hover:ring-[var(--copper)] ${focusRing}`}
                    >
                      <span className="text-sm font-bold text-slate-900">{siblingCity}</span>
                      <ArrowRight aria-hidden className="h-4 w-4 shrink-0 text-[var(--copper-deep)]" />
                    </Link>
                  </li>
                );
              })}
          </ul>
        </div>
      </section>

      <div id="book" className="scroll-mt-24">
        <LeadCTAPanel
          contained
          ground="white"
          title={`Book a consultation with a ${cityName} medical accountant`}
          description="Tell us about your role and your financial priorities. Your enquiry is matched with a specialist medical accounting firm for a short introductory call."
          proofPoints={MEDICAL_PROOF_POINTS}
          footnote="No obligation and no hard sell. If the specialist firm thinks your position is already right, they will tell you so."
          form={<LeadForm redirectOnSuccess={false} submitLabel="Request a consultation" />}
        />
      </div>
    </>
  );
}
