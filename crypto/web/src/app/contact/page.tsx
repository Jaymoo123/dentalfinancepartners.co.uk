import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { LeadForm } from "@/components/forms/LeadForm";
import { PageHero } from "@/app/_parts/PageHero";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { Eyebrow } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { WhatToExpectCard } from "@accounting-network/web-shared/design/marketing/WhatToExpectCard";

export const metadata: Metadata = {
  title: "Contact us",
  description: `Speak to ${siteConfig.name} about crypto tax, HMRC disclosure or Self Assessment.`,
  alternates: { canonical: `${siteConfig.url}/contact` },
};

/**
 * Property's contact anatomy: hero, then the form as the FIRST thing under it,
 * with the reassurance card beside it rather than above it.
 *
 * `items` is passed to `WhatToExpectCard` explicitly and always. Its
 * `DEFAULT_ITEMS` end on "Fixed fee quote if you decide to proceed", and crypto
 * publishes no fees; the four below are each already published elsewhere on this
 * site (the partner-network disclosure in the privacy policy, and the booking
 * picker's own "no obligation" / "about 20 minutes" copy). No turnaround promise
 * and no fee: phase 0 removed every one of those from this site.
 *
 * Exactly ONE lead-capture mount on this route, same as before the port.
 */
export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Speak to us"
        title="Contact us"
        items={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      >
        <p className="mt-4 text-lg leading-relaxed text-white/80">
          Tell us about your crypto tax situation. Whether it is a disclosure, a Self Assessment
          with cryptoasset pages or years of unreconciled swaps, start with the form and we will
          take it from there.
        </p>
      </PageHero>

      <section id="book" className="scroll-mt-24 bg-slate-50 py-16 sm:py-20">
        <div className={siteContainerLg}>
          <div className="grid gap-8 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
            <div className="space-y-6">
              <div className="border border-neutral-200 bg-white p-6 sm:p-8">
                <Eyebrow>What we need</Eyebrow>
                <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
                  What to tell us
                </h2>
                <p className="mt-4 text-base leading-relaxed text-neutral-700">
                  Roughly what you hold, how you came by it, and which tax years are open. You do
                  not need your figures ready. If you use Koinly, Recap or a similar tool, say so,
                  it changes where we start.
                </p>
              </div>

              <WhatToExpectCard
                items={[
                  "A specialist firm from our partner network reads your enquiry",
                  "An initial call to understand your position, with no obligation",
                  "The call takes about 20 minutes",
                  "You pick the callback window that suits you",
                ]}
              />
            </div>

            <div className="border border-neutral-200 bg-white p-6 sm:p-8 lg:p-10">
              <Eyebrow>No obligation</Eyebrow>
              <h2 className="mb-6 text-2xl font-semibold tracking-tight text-neutral-900">
                Send your enquiry
              </h2>
              <LeadForm redirectOnSuccess submitLabel="Send enquiry" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
