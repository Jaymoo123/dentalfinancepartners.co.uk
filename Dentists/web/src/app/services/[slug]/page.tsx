import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { LeadForm } from "@/components/forms/LeadForm";
import { btnPrimary, focusRing, sectionY, sectionYLoose, siteContainerLg } from "@/components/ui/layout-utils";
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
    alternates: {
      canonical: url,
      languages: { "en-GB": url, "x-default": url },
    },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: page.metaTitle,
      description: page.metaDescription,
    },
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
    category: "Specialist Dental Accountancy Services",
  });
  const breadcrumbSchema = JSON.parse(buildBreadcrumbJsonLd(breadcrumbItems));
  const faqSchema = buildFaqPage(page.faqs);
  const schemaPayload = faqSchema
    ? [serviceSchema, breadcrumbSchema, faqSchema]
    : [serviceSchema, breadcrumbSchema];

  return (
    <>
      <JsonLd data={schemaPayload} />

      {/* Hero */}
      <section className="bg-[var(--navy)] text-white">
        <div className={`${siteContainerLg} ${sectionYLoose}`}>
          <Breadcrumb items={breadcrumbItems} variant="light" />
          <div className="mt-8 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--gold)]">
              {page.eyebrow}
            </p>
            <h1 className="mt-3 font-serif text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
              {page.hero.heading}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-white/85 sm:text-lg">
              {page.hero.intro}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className={btnPrimary}>
                Book a free scoping call
              </Link>
              <Link
                href="/free-practice-health-check"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/30 bg-white/5 px-6 py-3 text-sm font-semibold tracking-tight text-white backdrop-blur-sm transition-all duration-200 hover:border-white/60 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold)]"
              >
                Take the practice health check
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="bg-[var(--surface)]">
        <div className={`${siteContainerLg} ${sectionY}`}>
          <div className="mx-auto grid gap-12 lg:grid-cols-[1fr_320px]">
            <div className="space-y-12">
              {page.sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="font-serif text-2xl font-semibold text-[var(--ink)] sm:text-3xl">
                    {section.heading}
                  </h2>
                  <div className="mt-6 space-y-4 text-base leading-relaxed text-[var(--ink-soft)] sm:text-lg">
                    {section.body.map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                  {section.bullets && section.bullets.length > 0 && (
                    <ul className="mt-6 space-y-3 text-base leading-relaxed text-[var(--ink-soft)] sm:text-lg">
                      {section.bullets.map((b, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="mt-1.5 inline-flex h-2 w-2 flex-shrink-0 rounded-full bg-[var(--gold)]" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}

              {page.workedExample && (
                <section className="rounded-2xl border-l-4 border-[var(--gold)] bg-[var(--gold-soft)] p-6 sm:p-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--gold-strong)]">
                    Worked example
                  </p>
                  <h2 className="mt-3 font-serif text-xl font-semibold text-[var(--ink)] sm:text-2xl">
                    {page.workedExample.heading}
                  </h2>
                  <div className="mt-4 space-y-4 text-base leading-relaxed text-[var(--ink-soft)]">
                    {page.workedExample.body.map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-2xl border border-[var(--border)] bg-white p-6">
                <h3 className="font-serif text-lg font-semibold text-[var(--ink)]">
                  Who this is for
                </h3>
                <ul className="mt-4 space-y-2 text-sm text-[var(--ink-soft)]">
                  {page.whoFor.map((w, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1 inline-flex h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--gold)]" />
                      <span>{w}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-[var(--border)] bg-white p-6">
                <h3 className="font-serif text-lg font-semibold text-[var(--ink)]">
                  Related services
                </h3>
                <ul className="mt-4 space-y-3 text-sm">
                  {page.relatedServices.map((r) => (
                    <li key={r.href}>
                      <Link
                        href={r.href}
                        className={`font-semibold text-[var(--gold-strong)] hover:text-[var(--gold)] ${focusRing} rounded`}
                      >
                        → {r.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-[var(--gold)] bg-[var(--gold-soft)] p-6">
                <h3 className="font-serif text-lg font-semibold text-[var(--ink)]">
                  Useful next step
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)]">
                  Use the free practice health check to see where the immediate
                  opportunities sit in your specific position.
                </p>
                <Link
                  href="/free-practice-health-check"
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--gold-strong)] hover:text-[var(--gold)]"
                >
                  Start the health check →
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[var(--background)] border-t border-[var(--border)]">
        <div className={`${siteContainerLg} ${sectionY}`}>
          <div className="mx-auto max-w-3xl">
            <h2 className="font-serif text-2xl font-semibold text-[var(--ink)] sm:text-3xl">
              Frequently asked
            </h2>
            <dl className="mt-10 space-y-6">
              {page.faqs.map((faq) => (
                <div key={faq.question} className="rounded-2xl border border-[var(--border)] bg-white p-6 sm:p-7">
                  <dt className="font-serif text-lg font-semibold text-[var(--ink)]">
                    {faq.question}
                  </dt>
                  <dd className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)] sm:text-base">
                    {faq.answer}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--navy)] text-white">
        <div className={`${siteContainerLg} ${sectionYLoose}`}>
          <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-2 lg:gap-16 items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--gold)]">
                Free scoping call
              </p>
              <h2 className="mt-3 font-serif text-2xl font-semibold leading-tight text-white sm:text-3xl lg:text-4xl">
                {page.ctaHeading}
              </h2>
              <p className="mt-5 text-base leading-relaxed text-white/85 sm:text-lg">
                {page.ctaBody}
              </p>
            </div>
            <div className="rounded-2xl border-t-4 border-[var(--gold)] bg-white p-6 shadow-xl sm:p-8 lg:p-10">
              <h3 className="font-serif text-xl font-semibold text-[var(--ink)]">Book your free call</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">We will be in touch within 24 hours.</p>
              <div className="mt-6">
                <LeadForm redirectOnSuccess={false} submitLabel="Book a free call" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
