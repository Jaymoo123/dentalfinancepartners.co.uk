import type { Metadata } from "next";
import Link from "next/link";
import { LeadForm } from "@/components/forms/LeadForm";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { JsonLd, referencedOrganization } from "@/lib/schema";
import { niche } from "@/config/niche-loader";
import { isPackagesMode } from "@accounting-network/web-shared/lib/niche-config";
import { Breadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";
import { Eyebrow } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { WhatToExpectCard } from "@accounting-network/web-shared/design/marketing/WhatToExpectCard";
import { GeneralistBackdrop } from "@/components/layout/GeneralistBackdrop";
import {
  WhoWeAreSection,
  WhyChooseUsSection,
  WhatWeCoverSection,
} from "@/components/marketing/HomeSections";
import { pageSummary } from "@/lib/page-summaries";

export const metadata: Metadata = {
  title: `Contact`,
  description: `Speak to an accountant about your UK business. Same-day response, fixed fees, no obligation.`,
  alternates: { canonical: `${siteConfig.url}/contact` },
  openGraph: {
    title: `Contact | ${siteConfig.name}`,
    description: "Speak to an accountant. Same-day response, fixed fees, no obligation.",
    url: `${siteConfig.url}/contact`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Contact | ${siteConfig.name}`,
    description: "Speak to an accountant. Same-day response, fixed fees, no obligation.",
  },
};

export default function ContactPage() {
  const contactPage = {
    "@context": "https://schema.org",
    "@type": "ContactPage" as const,
    "@id": `${siteConfig.url}/contact#page`,
    name: `Contact ${siteConfig.name}`,
    url: `${siteConfig.url}/contact`,
    description: "Contact form and direct line for new enquiries.",
    inLanguage: "en-GB",
    about: referencedOrganization(),
    mainEntity: {
      "@type": "Organization",
      "@id": `${siteConfig.url}#organization`,
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  return (
    <>
      <JsonLd data={contactPage} />

      <section className="relative flex min-h-[300px] items-center overflow-hidden bg-slate-900 py-10 sm:min-h-[350px] sm:py-12 lg:py-14">
        <GeneralistBackdrop />
        <div className={`${siteContainerLg} relative z-10`}>
          <div className="max-w-3xl">
            <Breadcrumb
              siteUrl={siteConfig.url}
              onDark
              items={[{ label: "Home", href: "/" }, { label: "Contact" }]}
            />
            <Eyebrow onDark>Talk to an accountant</Eyebrow>
            <h1 className="text-3xl font-bold leading-[1.15] text-white text-balance sm:text-4xl lg:text-5xl">
              Start with a short call.
            </h1>
            <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">
              {/* Single-sourced from PAGE_SUMMARIES so the hero and any card
                  pointing at this route cannot drift apart. */}
              {pageSummary("/contact")}
            </p>
          </div>
        </div>
      </section>

      {/* The form stays the first thing under the hero: a reader who arrives
          here already intends to enquire, so the argument bands sit below it. */}
      <section id="book" className="scroll-mt-24 bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="grid gap-8 sm:gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
            <div className="space-y-6 sm:space-y-8">
              {/* bg-white, not bg-slate-50: a slate card on a slate section has
                  no edge (DESIGN_SYSTEM §4a rule 3). */}
              <div className="rounded-xl bg-white p-6 sm:p-8">
                <Eyebrow>Speak to us</Eyebrow>
                <h2 className="mb-4 text-2xl font-bold text-slate-900 sm:mb-6 sm:text-4xl">
                  Get in touch
                </h2>
                <p className="text-base leading-relaxed text-slate-700">
                  Tell us where the business sits today, what is and isn&rsquo;t working, and
                  we&rsquo;ll come back with a short note on what the engagement would look like and
                  what it would cost. No pitch, no follow-up sequence.
                </p>

                {isPackagesMode(niche) ? (
                  <p className="mt-4 text-base leading-relaxed text-slate-700">
                    Already know what you need? Our fixed monthly plans start at £24 a month and you
                    can{" "}
                    <Link
                      href="/pricing"
                      className="font-bold text-primary-700 underline hover:text-primary-800"
                      data-cta="contact_pricing_link"
                      data-cta-placement="contact"
                      data-cta-goal="pricing"
                      data-cta-variant={niche.cta.variant}
                    >
                      sign up online in a couple of minutes
                    </Link>
                    .
                  </p>
                ) : null}
              </div>

              {/* The four "what happens next" lines, as the shared card the
                  post-submit pages also render. */}
              <WhatToExpectCard
                title="What happens next"
                items={[
                  "Reply within one working day, usually same day",
                  "A short call to understand your situation and what you need",
                  "Plain-English recommendations, with or without us",
                  "Fixed-fee quote in writing if we are a fit",
                ]}
              />
            </div>

            <div className="rounded-xl border-2 border-slate-200 bg-white p-6 sm:p-8 lg:p-10">
              <Eyebrow>No obligation</Eyebrow>
              <h2 className="mb-4 text-2xl font-bold text-slate-900 sm:mb-6 sm:text-4xl">
                Send an enquiry
              </h2>
              {/* The old line here read "We don't share your details", which
                  privacy-policy §5 contradicts: an enquiry is shared with
                  regulated firms from the specialist partner network, up to six
                  of them. Reassurance beside a capture field must not say
                  something the policy denies. */}
              <p className="mb-6 text-sm text-slate-600">
                Takes about a minute. Who receives your enquiry, and what we share, is set out in
                our{" "}
                <Link
                  href="/privacy-policy"
                  className="font-semibold text-primary-700 underline underline-offset-2 hover:text-primary-800"
                >
                  privacy policy
                </Link>
                .
              </p>
              <LeadForm redirectOnSuccess submitLabel="Send enquiry" />
            </div>
          </div>
        </div>
      </section>

      {/* The homepage's argument, rendered from the shared components rather
          than copied, so the two cannot drift. Grounds top to bottom: navy hero,
          slate-50 form, white, slate-50, white, navy footer. No two touching
          sections share a ground and nothing navy lands on the navy footer.
          TestimonialsSection is omitted site-wide (DESIGN_DELTA §4b): no real
          quotes exist and none are invented. */}
      <WhoWeAreSection />
      <WhyChooseUsSection />
      <WhatWeCoverSection />
    </>
  );
}
