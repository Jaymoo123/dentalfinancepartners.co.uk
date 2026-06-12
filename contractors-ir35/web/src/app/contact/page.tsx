import type { Metadata } from "next";
import { LeadForm } from "@/components/forms/LeadForm";
import { siteContainerLg, sectionYLoose } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact | Book a Free Contractor Accountant Call",
  description:
    "Book a free call with a specialist contractor accountant. IR35 status reviews, limited company tax and contractor finances. We respond within one working day.",
};

export default function ContactPage() {
  return (
    <>
      <section className="border-b border-neutral-200 bg-neutral-900 py-16 sm:py-20">
        <div className={siteContainerLg}>
          <p className="eyebrow text-teal-400">Get in touch</p>
          <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Book a free call.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-300">
            Talk through your IR35 position, your current structure, or any contractor tax question. No hard sell, no obligation.
          </p>
        </div>
      </section>

      <section className="bg-[#fafaf7]">
        <div className={`${siteContainerLg} ${sectionYLoose}`}>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
            <div className="min-w-0">
              <h2 className="text-2xl font-semibold tracking-tight">How it works</h2>
              <ol className="mt-8 space-y-8">
                {[
                  {
                    n: "01",
                    title: "Fill in the form",
                    body: "Tell us a little about your situation. What kind of contractor are you, and what do you need help with?",
                  },
                  {
                    n: "02",
                    title: "We are in touch within 24 hours",
                    body: "A specialist contractor accountant will respond to arrange a short call. Not a sales team, not a call centre.",
                  },
                  {
                    n: "03",
                    title: "Free introductory call",
                    body: "We talk through your IR35 position, structure, and any questions. If we are the right fit, we will explain how we work together. No pressure.",
                  },
                ].map((step) => (
                  <li key={step.n} className="flex gap-5">
                    <span className="font-mono text-2xl font-semibold text-teal-600 tabular-nums" aria-hidden>
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
                <p className="text-sm font-medium text-neutral-900">Prefer to contact us directly?</p>
                <p className="mt-2 text-sm text-neutral-600">
                  Email:{" "}
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="text-teal-700 underline underline-offset-2 hover:text-teal-800"
                  >
                    {siteConfig.contact.email}
                  </a>
                </p>
                <p className="mt-1 text-xs text-neutral-500">
                  All conversations are confidential and carry no obligation.
                </p>
              </div>
            </div>

            <div className="border border-neutral-200 bg-white p-6 sm:p-8 lg:p-10">
              <LeadForm submitLabel="Send enquiry" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
