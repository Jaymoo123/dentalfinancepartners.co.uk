import type { Metadata } from "next";
import Link from "next/link";
import { Scale, Users, Building2, Handshake } from "lucide-react";
import { LeadForm } from "@/components/forms/LeadForm";
import { focusRing, sectionY, sectionYLoose, siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { SolicitorsBackdrop } from "@/components/layout/SolicitorsBackdrop";
import { CoverageCards } from "@accounting-network/web-shared/design/marketing/CoverageCards";
import { WhatToExpectCard } from "@accounting-network/web-shared/design/marketing/WhatToExpectCard";

export const metadata: Metadata = {
  title: "Contact | Speak to a Solicitor Accountant",
  description: `Get in touch with ${siteConfig.name} to discuss SRA compliance, partnership tax or LLP conversion for your firm. Fixed-fee quotes.`,
  alternates: { canonical: `${siteConfig.url}/contact` },
  openGraph: {
    title: `Contact ${siteConfig.name}`,
    description: "Speak to a specialist solicitor accountant about SRA compliance, partnership tax and LLP advice.",
    url: `${siteConfig.url}/contact`,
    type: "website",
  },
};

/**
 * F.7 anatomy: navy motif hero, then the `#book` capture band, then the
 * existing "Common enquiries" grid.
 *
 * Three deliberate departures from F.7, all forced by the phase-6 hard rule
 * (no copy changes):
 *  - No `Eyebrow` above the h1. The eyebrow would be net-new published text on
 *    an indexed route whose word multiset is frozen.
 *  - No WhoWeAre / WhyChooseUs / WhatWeCover bands. This site has no
 *    `MarketingSections` module, so the bands could only be authored, and
 *    authoring them is new copy.
 *  - No `TestimonialsSection`. Its defaults are Property's landlord copy and
 *    there are no anonymisable quotes here.
 *
 * The page-level Organization JSON-LD was deleted: `layout.tsx` already emits
 * the same `@id` on every page, so this removed a duplicate node and changed no
 * JSON-LD content.
 *
 * `WhatToExpectCard` receives EXPLICIT `title` and `items` taken from this
 * route's own "What happens next?" card. Its defaults are four Property strings
 * ("Instant text and email from us...") and letting them render is the phase-5
 * defaulted-prop failure repeating.
 */

/** The four existing "Common enquiries" subjects, verbatim. Icons are decorative. */
const COMMON_ENQUIRIES = [
  {
    icon: Scale,
    title: "SRA Accounts Rules Compliance",
    body: "Client money handling, trust accounting, 5-week reconciliations, and annual Accountant's Reports. We help solicitors meet SRA requirements and avoid breaches.",
  },
  {
    icon: Users,
    title: "Partnership & LLP Tax",
    body: "Partnership tax returns, LLP member allocations, profit extraction strategies, and Basis Period Reform navigation for law firm partners.",
  },
  {
    icon: Building2,
    title: "LLP Conversion",
    body: "Tax implications of converting from partnership to LLP. Structure analysis, conversion planning, and ongoing compliance for law firms.",
  },
  {
    icon: Handshake,
    title: "Practice Succession Planning",
    body: "Practice valuations, goodwill calculations, partner retirement planning, and practice sale tax implications for legal practices.",
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-slate-900">
        <div className={`${siteContainerLg} ${sectionYLoose} relative z-10`}>
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Contact" },
            ]}
            variant="light"
          />
          <div className="mt-8 max-w-3xl">
            <h1 className="text-3xl font-bold leading-[1.15] text-white sm:text-4xl lg:text-5xl">
              Contact us
            </h1>
            <p className="mt-5 text-base leading-relaxed text-slate-300 sm:text-lg">
              Whether you&apos;re a sole practitioner managing SRA compliance, a law firm partner navigating LLP conversion, or a COFA ensuring client money rules are met, we&apos;re here to help. Fill in the form below or contact us directly.
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">
              New here? Start with our{" "}
              {/* rose-300 measures 9.44 on slate-900; the brand hex measures 3.06
                  there and must never carry text on navy. */}
              <Link className={`text-rose-300 underline hover:text-white ${focusRing} rounded`} href="/services">
                accountants for solicitors and lawyers
              </Link>{" "}
              service overview to see how we work and what fixed-fee engagement fits your firm.
            </p>
          </div>
        </div>
        <SolicitorsBackdrop tone="navy" />
      </section>

      {/* The ask is the first thing under the hero: this is the route a reader
          arrives on already intending to enquire. */}
      <section id="book" className="scroll-mt-24 bg-slate-50">
        <div className={`${siteContainerLg} ${sectionY}`}>
          <div className="grid gap-8 sm:gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
            {/* White card on a slate-50 section: a slate card here would have no
                edge. The form is never inside a coloured/tinted card. */}
            <div className="rounded-xl bg-white p-6 ring-1 ring-slate-200/70 sm:p-8 lg:p-10">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                Book your free consultation
              </h2>
              <p className="mt-3 text-base leading-relaxed text-slate-700">
                Tell us about your situation and we&apos;ll arrange a short call to discuss how we can help.
              </p>
              <div className="mt-6">
                <LeadForm redirectOnSuccess submitLabel="Send enquiry" />
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-xl bg-white p-6 ring-1 ring-slate-200/70 sm:p-8">
                <h2 className="text-lg font-bold text-slate-900">Get in touch</h2>
                <dl className="mt-6 space-y-5 text-sm">
                  <div>
                    <dt className="font-semibold text-slate-900">Send a message</dt>
                    <dd className="mt-2">
                      <Link
                        className={`inline-flex min-h-10 items-center text-primary-700 underline ${focusRing} rounded`}
                        href="/contact"
                      >
                        Use the form below
                      </Link>
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-slate-900">What happens next</dt>
                    <dd className="mt-2 text-slate-700">
                      A specialist reads your enquiry and comes back to you
                    </dd>
                  </div>
                </dl>
              </div>

              <WhatToExpectCard
                title="What happens next?"
                items={[
                  "We'll review your enquiry and come back to you",
                  "Brief introductory call to understand your practice structure and compliance needs",
                  "Clear recommendations with fixed-fee quote if you choose to proceed",
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className={`${siteContainerLg} ${sectionY}`}>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Common enquiries</h2>
          {/* slate cards on a white section. */}
          <CoverageCards items={COMMON_ENQUIRIES} tone="slate" columns={2} />
        </div>
      </section>
    </>
  );
}
