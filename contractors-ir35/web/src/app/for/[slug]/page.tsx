import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Quote } from "lucide-react";
import {
  btnPrimary,
  focusRing,
  siteContainerLg,
} from "@/components/ui/layout-utils";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import { LeadForm } from "@/components/forms/LeadForm";
import { contractorTypes, getContractorType } from "@/data/contractor-types";
import { siteConfig } from "@/config/site";

/* Hand-rolled eyebrows: `.section-label` and `.eyebrow` are UNLAYERED rules in
   globals.css that pin their own colour and cannot be overridden by a utility. */
const eyebrowDark =
  "font-mono text-xs font-medium uppercase tracking-[0.1em] text-primary-400";
const eyebrowLight =
  "font-mono text-xs font-medium uppercase tracking-[0.1em] text-primary-700";

export function generateStaticParams() {
  return contractorTypes.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const type = getContractorType(slug);
  if (!type) return {};
  return {
    title: type.metaTitle,
    description: type.metaDescription,
    // Self-canonical per persona. This template used to point every persona at
    // the homepage, which excluded 11 URLs from Google. Fixed 2026-09-12; do
    // not regress it.
    alternates: { canonical: `${siteConfig.url}/for/${type.slug}` },
  };
}

export default async function ContractorTypePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const type = getContractorType(slug);
  if (!type) notFound();

  return (
    <>
      {/* HOOK. */}
      <section className="bg-neutral-900 py-16 sm:py-20">
        <div className={siteContainerLg}>
          <Link
            href="/for"
            className={`inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-300 uppercase tracking-wider hover:text-primary-400 transition-colors mb-6 ${focusRing}`}
          >
            <ArrowRight aria-hidden className="h-3 w-3 rotate-180" />
            All contractor types
          </Link>
          {/* Narrow measure on hero copy only. */}
          <div className="max-w-3xl">
            <p className={`${eyebrowDark} mb-6`}>Contractor accounting</p>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              {type.headline}.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-300">
              {type.intro}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              {/* Primary CTA stays on the page. Only the header CTA and the
                  sticky banner leave for /contact. */}
              <Link
                href="#book"
                className={`${btnPrimary} rounded-xl text-base px-8 py-3.5 text-center`}
                data-cta="hero_book"
                data-cta-placement="hero"
                data-cta-goal="form"
              >
                Book a free call
              </Link>
              <Link
                href="/ir35-status"
                className={`inline-flex min-h-12 items-center justify-center rounded-xl border border-white/30 bg-white/10 px-8 py-3.5 text-base font-medium text-white hover:bg-white/20 transition-colors text-center ${focusRing}`}
              >
                IR35 contract review
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Sector stats. primary-700 ground: white 7.27, cyan-100 labels 6.49. */}
      <section className="bg-primary-700 py-8 sm:py-10">
        <div className={siteContainerLg}>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-8">
            {type.stats.map((stat) => (
              <div key={stat.label} className="flex flex-col sm:text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white font-mono">{stat.value}</div>
                <div className="mt-1 text-xs sm:text-sm font-semibold text-cyan-100 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROBLEM. */}
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-3xl">
            <p className={`${eyebrowLight} mb-4`}>The specific challenges</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
              What makes {type.title.toLowerCase()} accounting different.
            </h2>
          </div>
          <div className="mt-10 sm:mt-14 grid gap-6 md:grid-cols-2 md:gap-8">
            {type.challenges.map((item) => (
              <article
                key={item.title}
                className="rounded-xl bg-neutral-50 p-6 ring-1 ring-neutral-200/70 sm:p-8"
              >
                <h3 className="text-xl font-bold text-neutral-900">{item.title}</h3>
                <p className="mt-4 text-base leading-relaxed text-neutral-600">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PROOF. Composite snapshot, disclaimed in place: nothing here asserts a
          named real client. */}
      {type.testimonial && (
        <section className="bg-neutral-50 py-12 sm:py-16">
          <div className={siteContainerLg}>
            <figure className="relative rounded-xl bg-white p-8 ring-1 ring-neutral-200/70 sm:p-10">
              <Quote className="absolute top-6 right-6 h-8 w-8 text-primary-200" aria-hidden />
              <blockquote className="text-lg sm:text-xl leading-relaxed text-neutral-800 font-medium pr-10">
                &ldquo;{type.testimonial.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 pt-4 border-t border-neutral-200 text-sm font-semibold text-neutral-600">
                {type.testimonial.attribution}
              </figcaption>
            </figure>
            {/* slate/neutral-400 measured 2.42 on this ground and failed the
                4.5 floor. neutral-600 is 7.49. */}
            <p className="mt-4 text-xs text-neutral-600">
              Composite snapshot based on client patterns. Name and figures anonymised. The tax mechanics are real.
            </p>
          </div>
        </section>
      )}

      {/* SCOPE. */}
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-3xl">
            <p className={`${eyebrowLight} mb-4`}>How we help</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
              What we do for {type.title.toLowerCase()}.
            </h2>
          </div>
          <div className="mt-10 sm:mt-14 grid gap-6 md:grid-cols-3 md:gap-8">
            {type.howWeHelp.map((item) => (
              <div
                key={item.title}
                className="rounded-xl bg-neutral-50 p-6 ring-1 ring-neutral-200/70 sm:p-8"
              >
                <h3 className="text-lg font-bold text-neutral-900">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">{item.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Link
              href="/services"
              className={`inline-flex items-center gap-2 text-primary-700 hover:text-primary-800 font-semibold text-sm sm:text-base transition-colors ${focusRing}`}
            >
              View all services
              <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ. Native <details>, deliberately NOT the kit's FaqSection: that
          component keeps closed answers out of the server HTML. */}
      {type.faqs.length > 0 && (
        <section className="bg-neutral-50 py-12 sm:py-16 lg:py-20">
          <div className={siteContainerLg}>
            <h2 className="text-2xl font-bold text-neutral-900 text-center mb-8 sm:mb-12 sm:text-3xl">
              Questions from {type.title.toLowerCase()}
            </h2>
            <div className="space-y-3 sm:space-y-4">
              {type.faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group rounded-xl bg-white ring-1 ring-neutral-200/70"
                >
                  <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-5 font-semibold text-neutral-900 hover:text-primary-700 transition-colors list-none">
                    <span>{faq.question}</span>
                    <span
                      className="flex-shrink-0 text-primary-600 transition-transform group-open:rotate-45"
                      aria-hidden
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                      </svg>
                    </span>
                  </summary>
                  <div className="px-6 pb-6 text-neutral-600 leading-relaxed border-t border-neutral-200 pt-4">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Sibling personas. Five crawlable links plus the index: the link floor
          on this template is binding. */}
      <section className="bg-white py-12 sm:py-16">
        <div className={siteContainerLg}>
          <p className={`${eyebrowLight} mb-5`}>Other contractor types</p>
          <div className="grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
            {contractorTypes
              .filter((t) => t.slug !== slug)
              .slice(0, 5)
              .map((t) => (
                <Link
                  key={t.slug}
                  href={`/for/${t.slug}`}
                  className={`group block rounded-xl bg-neutral-50 p-4 ring-1 ring-neutral-200/70 transition-colors hover:ring-primary-600/40 ${focusRing}`}
                >
                  <span className="text-sm font-semibold text-neutral-800 group-hover:text-primary-700 transition-colors">
                    {t.title}
                  </span>
                  <ArrowRight aria-hidden className="mt-2 h-3.5 w-3.5 text-neutral-500 group-hover:text-primary-600 group-hover:translate-x-0.5 transition-all" />
                </Link>
              ))}
          </div>
          <div className="mt-5">
            <Link
              href="/for"
              className={`inline-flex items-center gap-1.5 text-sm font-semibold text-primary-700 hover:text-primary-800 transition-colors ${focusRing}`}
            >
              See all contractor types
              <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ASK. `contained` keeps a dark band off the dark footer; `ground="slate"`
          alternates against the white section above. `proofPoints` intentionally
          EMPTY: Property's call site passes a fee claim and a turnaround
          promise, both banned on this site. */}
      <div id="book" className="scroll-mt-24">
        <LeadCTAPanel
          contained
          ground="slate"
          eyebrow="Free call"
          title={`Talk to a specialist ${type.title.toLowerCase()} accountant`}
          description="Book a free call. We will talk through your IR35 position, your structure and whether there is anything worth changing. No hard sell, no obligation."
          proofPoints={[]}
          formTitle="Book your free call"
          form={<LeadForm submitLabel="Request a callback" />}
          footnote={
            /* KNOWN CONTRACT: PanelBody renders `footnote` inside a <p>, so a
               <div> here would be a block in a paragraph and a hydration
               mismatch. Span only. */
            <span>
              Contractor work only, not a general practice sideline, so a contractor specialist reviews your enquiry. If you would rather write to us first, use the{" "}
              <Link
                href="/contact"
                className="font-semibold text-primary-700 underline hover:text-primary-800"
              >
                contact form
              </Link>
              .
            </span>
          }
        />
      </div>
    </>
  );
}
