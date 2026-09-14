import type { Metadata } from "next";
import Link from "next/link";
import { LeadForm } from "@/components/forms/LeadForm";
import { btnPrimary, siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import ContractorsBackdrop from "@/components/layout/ContractorsBackdrop";

export const metadata: Metadata = {
  title: "Contact | Book a Free Contractor Accountant Call",
  description:
    "Book a free call with a specialist contractor accountant. IR35 status reviews, limited company tax and contractor finances. No obligation.",
  alternates: { canonical: `${siteConfig.url}/contact` },
};

export default function ContactPage() {
  return (
    <>
      {/* Hero. Mono eyebrow hand-rolled from utilities: the `.eyebrow` class is
          `@layer components` in globals.css and pins `color: var(--accent)`
          #0e7490, which measures 3.35-3.69 on this site's dark grounds. Being
          layered, a `text-*` utility now DOES beat it; the hand-roll is kept
          because it needs no override at all. cyan-400 on neutral-900 = 9.92. */}
      <section className="relative overflow-hidden bg-neutral-900 py-12 sm:py-16 lg:py-20">
        <ContractorsBackdrop />
        <div className={`${siteContainerLg} relative z-10`}>
          <div className="max-w-3xl">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.1em] text-primary-400">
              Get in touch
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Book a free call.
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-neutral-300">
              Talk through your IR35 position, your current structure, or any contractor tax question. No hard sell, no obligation.
            </p>
            <Link
              href="#book"
              className={`${btnPrimary} mt-8 rounded-xl`}
              data-cta="hero_book"
              data-cta-placement="hero"
              data-cta-goal="form"
            >
              Book a free call
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#fafaf7] py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
            <div className="min-w-0">
              <h2 className="text-2xl font-bold tracking-tight text-neutral-900">How it works</h2>
              <ol className="mt-8 space-y-8">
                {[
                  {
                    n: "01",
                    title: "Fill in the form",
                    body: "Tell us a little about your situation. What kind of contractor are you, and what do you need help with?",
                  },
                  {
                    n: "02",
                    title: "A specialist gets in touch",
                    body: "A specialist contractor accountant from our partner network will respond to arrange a short call. Not a sales team, not a call centre.",
                  },
                  {
                    n: "03",
                    title: "Free introductory call",
                    body: "We talk through your IR35 position, structure, and any questions. If we are the right fit, we will explain how we work together. No pressure.",
                  },
                ].map((step) => (
                  <li key={step.n} className="flex gap-5">
                    <span className="font-mono text-2xl font-semibold text-primary-600 tabular-nums" aria-hidden>
                      {step.n}
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-lg font-semibold text-neutral-900">{step.title}</h3>
                      <p className="mt-2 text-base leading-relaxed text-neutral-600">{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="mt-12 border-t border-neutral-200 pt-8">
                <p className="text-sm font-medium text-neutral-900">All conversations are confidential and carry no obligation.</p>
              </div>
            </div>

            {/* The form IS this page's closing ask, so there is no LeadCTAPanel
                below it: a second capture surface on the capture page asks a
                reader to do the thing they are already doing. `scroll-mt-24` is
                load-bearing, the sticky header covers the heading without it. */}
            <div id="book" className="scroll-mt-24 min-w-0">
              <div className="rounded-xl bg-white p-6 ring-1 ring-neutral-200/70 sm:p-8 lg:p-10">
                <LeadForm submitLabel="Send enquiry" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
