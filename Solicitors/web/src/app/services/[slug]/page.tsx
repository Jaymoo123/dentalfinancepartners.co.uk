import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { LeadForm } from "@/components/forms/LeadForm";
import { btnPrimary, btnOnCream, focusRing, sectionY, siteContainerLg, heroCreamSurface } from "@/components/ui/layout-utils";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import { ExampleFigureNote } from "@accounting-network/web-shared/design/primitives/ExampleFigureNote";
import { SolicitorsBackdrop } from "@/components/layout/SolicitorsBackdrop";
import { siteConfig } from "@/config/site";
import {
  buildService,
  buildBreadcrumbJsonLd,
  buildFaqPage,
  JsonLd,
} from "@/lib/schema/index";
import { SERVICE_SUB_PAGES, SERVICE_SLUGS } from "./data";

export function generateStaticParams() {
  return SERVICE_SLUGS.map((slug) => ({ slug }));
}

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const page = SERVICE_SUB_PAGES[slug];
  if (!page) return { title: `Service | ${siteConfig.name}` };
  const url = `${siteConfig.url}/services/${slug}`;
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: url, languages: { "en-GB": url, "x-default": url } },
    openGraph: { title: page.metaTitle, description: page.metaDescription, url, type: "website" },
    twitter: { card: "summary_large_image", title: page.metaTitle, description: page.metaDescription },
  };
}

export default async function ServiceSubPage({ params }: { params: Params }) {
  const { slug } = await params;
  const page = SERVICE_SUB_PAGES[slug];
  if (!page) notFound();

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: page.title.split(":")[0] },
  ];

  const serviceSchema = buildService({
    name: page.title,
    description: page.metaDescription,
    path: `/services/${slug}`,
    serviceType: page.eyebrow,
    category: "Specialist Legal Sector Accountancy Services",
  });
  const breadcrumbSchema = JSON.parse(buildBreadcrumbJsonLd(breadcrumbItems));
  const faqSchema = buildFaqPage(page.faqs);
  const schemaPayload = faqSchema ? [serviceSchema, breadcrumbSchema, faqSchema] : [serviceSchema, breadcrumbSchema];

  return (
    <>
      <JsonLd data={schemaPayload} />

      {/* Hero. Cream ground plus the ledger motif, matching /services and the
          pillar guides. Copy byte-identical. */}
      <section
        className={`relative flex min-h-[350px] items-center overflow-hidden py-10 sm:py-12 lg:py-14 ${heroCreamSurface}`}
      >
        <SolicitorsBackdrop tone="cream" />
        <div className={`${siteContainerLg} relative z-10`}>
          <div className="max-w-3xl">
            <Breadcrumb items={breadcrumbItems} />
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
              {page.eyebrow}
            </p>
            <h1 className="mt-3 text-3xl font-bold leading-[1.15] text-slate-900 sm:text-5xl lg:text-6xl">
              {page.hero.heading}
            </h1>
            <p className="mt-4 text-base leading-7 text-slate-700 sm:mt-6 sm:text-lg">
              {page.hero.intro}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-4">
              <Link
                href="/contact"
                data-cta="services_sub_hero_book"
                data-cta-placement="services"
                data-cta-goal="form"
                className={btnPrimary}
              >
                Book a free scoping call
              </Link>
              <Link href="/free-firm-health-check" className={btnOnCream}>
                Take the firm health check
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Body. The 1fr/320px split stays: the aside is the sanctioned
          useful-thing-beside-it, not a measure clamp. */}
      <section className="bg-white">
        <div className={`${siteContainerLg} ${sectionY}`}>
          <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
            <div className="space-y-12">
              {page.sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                    {section.heading}
                  </h2>
                  <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-600 sm:text-lg">
                    {section.body.map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                  {section.bullets && section.bullets.length > 0 && (
                    <ul className="mt-6 space-y-3 text-base leading-relaxed text-slate-600 sm:text-lg">
                      {section.bullets.map((b, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="mt-1.5 inline-flex h-2 w-2 flex-shrink-0 rounded-full bg-[var(--primary)]" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}

              {page.workedExample && (
                <section className="rounded-xl border-l-4 border-[var(--primary)] bg-slate-50 p-6 ring-1 ring-slate-200/70 sm:p-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary-700">
                    Worked example
                  </p>
                  <h2 className="mt-3 text-xl font-bold text-slate-900 sm:text-2xl">
                    {page.workedExample.heading}
                  </h2>
                  <div className="mt-4 space-y-4 text-base leading-relaxed text-slate-600">
                    {page.workedExample.body.map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                  <ExampleFigureNote className="mt-4" />
                </section>
              )}
            </div>

            {/* Sidebar */}
            <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-xl bg-slate-50 p-6 ring-1 ring-slate-200/70">
                <h3 className="text-lg font-bold text-slate-900">Who this is for</h3>
                <ul className="mt-4 space-y-2 text-sm text-slate-600">
                  {page.whoFor.map((w, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1 inline-flex h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--primary)]" />
                      <span>{w}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl bg-slate-50 p-6 ring-1 ring-slate-200/70">
                <h3 className="text-lg font-bold text-slate-900">Related services</h3>
                <ul className="mt-4 space-y-3 text-sm">
                  {page.relatedServices.map((r) => (
                    <li key={r.href}>
                      <Link
                        href={r.href}
                        className={`font-semibold text-primary-700 hover:underline ${focusRing} rounded`}
                      >
                        &rarr; {r.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl bg-[var(--primary)]/5 p-6 ring-1 ring-[var(--primary)]/30">
                <h3 className="text-lg font-bold text-slate-900">Useful next step</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  Use the free firm health check to see where the immediate opportunities sit in your specific position.
                </p>
                <Link
                  href="/free-firm-health-check"
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary-700 hover:underline"
                >
                  Start the health check &rarr;
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* FAQ. Slate ground against the white body above, white cards, and no
          body clamp: siteContainerLg is the measure. */}
      <section className="bg-slate-50">
        <div className={`${siteContainerLg} ${sectionY}`}>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Frequently asked</h2>
          <dl className="mt-10 grid gap-6 lg:grid-cols-2">
            {page.faqs.map((faq) => (
              <div
                key={faq.question}
                className="rounded-xl bg-white p-6 ring-1 ring-slate-200/70 sm:p-7"
              >
                <dt className="text-lg font-bold text-slate-900">{faq.question}</dt>
                <dd className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                  {faq.answer}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Closing ask. Contained on a white ground because the FAQ above is
          already slate and the footer below is slate-900: navy never touches
          navy. ctaHeading and ctaBody are the page's own strings. */}
      <div id="book" className="scroll-mt-24">
        <LeadCTAPanel
          eyebrow="Free scoping call"
          title={page.ctaHeading}
          description={page.ctaBody}
          proofPoints={[]}
          formTitle="Book your free call"
          // Restores the subline this page published before the port. Adopting
          // the shared panel would otherwise have deleted it, and the owner's
          // rule of 2026-09-11 forbids removing published copy.
          formSubtitle="We will be in touch."
          form={<LeadForm redirectOnSuccess={false} submitLabel="Book a free call" />}
          contained
          ground="white"
          footnote={
            <Link
              href="/contact"
              data-cta="services_sub_book"
              data-cta-placement="services"
              data-cta-goal="form"
              className="font-semibold text-primary-700 hover:underline"
            >
              Book a free scoping call
            </Link>
          }
        />
      </div>
    </>
  );
}
