import type { Metadata } from "next";
import { Check } from "lucide-react";
import { HeroBrickBackdrop } from "@/components/layout/HeroBrickBackdrop";
import { LeadForm } from "@/components/forms/LeadForm";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { niche, isPackagesMode } from "@/config/niche-loader";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Eyebrow } from "@/components/ui/page-blocks";

export const metadata: Metadata = {
  // Ours (c218d7a6): brand-suffix dedupe, and a description that fits the snippet.
  title: `Contact Us`,
  description: `Contact ${siteConfig.name} for landlord accounting enquiries: Section 24, MTD, incorporation, portfolio management. 24-hour response via our form.`,
  alternates: { canonical: `${siteConfig.url}/contact` },
  openGraph: {
    title: `Contact ${siteConfig.name}`,
    description: "Book free consultation for landlord accounting. 24-hour response time.",
    url: `${siteConfig.url}/contact`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Contact ${siteConfig.name}`,
    description: "Book free consultation for landlord accounting. 24-hour response time.",
  },
};

export default function ContactPage() {
  return (
    <>
      <section className="relative flex items-center py-10 sm:py-12 lg:py-14 min-h-[300px] sm:min-h-[350px] overflow-hidden bg-slate-900">
        <HeroBrickBackdrop />
        <div className={`${siteContainerLg} relative z-10`}>
          <div className="max-w-3xl">
            <Breadcrumb
              onDark
              items={[
                { label: "Home", href: "/" },
                { label: "Contact" },
              ]}
            />
            <h1 className="mt-4 sm:mt-6 text-2xl font-bold text-white sm:text-4xl lg:text-6xl">Contact</h1>
            <p className="mt-3 sm:mt-4 text-base sm:text-xl text-white">
              New enquiries by form. We aim to reply within one working day.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="grid gap-8 sm:gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
            <div className="space-y-6 sm:space-y-8">
              <div className="rounded-xl bg-slate-50 p-6 sm:p-8">
                <Eyebrow>Speak to us</Eyebrow>
                <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl mb-4 sm:mb-6">Get in touch</h2>
                <p className="text-base text-slate-700 leading-relaxed">
                  Fill in the form and we&apos;ll get back to you within 24 hours, usually same day. We&apos;ll text and email you straight away, and a quick reply to that locks in your callback.
                </p>
                {/* Ours (7ab42441). The only instrumented CTA on this route and the
                    only carrier of data-cta-goal="pricing" anywhere on the site
                    (report 07 §2.3). Restyled into their rounded-xl slate card. */}
                {isPackagesMode(niche) ? (
                  <p className="mt-4 text-base text-slate-700 leading-relaxed">
                    Looking for ongoing accounting? Our fixed monthly plans start at £29 a month.{" "}
                    <Link
                      href="/pricing"
                      data-cta="contact_pricing_link"
                      data-cta-placement="contact"
                      data-cta-goal="pricing"
                      data-cta-variant={niche.cta.variant}
                      className="font-bold text-emerald-700 underline hover:text-emerald-800"
                    >
                      See plans and pricing
                    </Link>
                  </p>
                ) : null}
              </div>

              <div className="rounded-xl bg-slate-900 p-6 sm:p-8 text-white">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">What to expect</h3>
                <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-slate-200">
                  <li className="flex items-start gap-2 sm:gap-3">
                    <Check aria-hidden className="mt-0.5 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 text-emerald-400" strokeWidth={3} />
                    <span>Instant text and email from us. Reply to confirm your callback</span>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3">
                    <Check aria-hidden className="mt-0.5 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 text-emerald-400" strokeWidth={3} />
                    <span>Initial call to understand your situation</span>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3">
                    <Check aria-hidden className="mt-0.5 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 text-emerald-400" strokeWidth={3} />
                    <span>Clear recommendations with no obligation</span>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3">
                    <Check aria-hidden className="mt-0.5 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 text-emerald-400" strokeWidth={3} />
                    <span>Fixed fee quote if you decide to proceed</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="rounded-xl bg-white border-2 border-slate-200 p-6 sm:p-8 lg:p-10">
              <Eyebrow>No obligation</Eyebrow>
              {/* Ours (7ab42441): the heading follows the live CTA variant. Their
                  h2 classes, our ternary wrapped back around the text. */}
              <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl mb-4 sm:mb-6">
                {isPackagesMode(niche) ? "Send your enquiry" : "Book your free consultation"}
              </h2>
              <LeadForm redirectOnSuccess submitLabel="Send enquiry" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
