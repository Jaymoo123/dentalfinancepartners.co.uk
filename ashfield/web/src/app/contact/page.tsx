import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { ContactForm } from "@/components/forms/ContactForm";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Contact | Ashfield Trading",
  description:
    "Enquire about renting a niche accounting site or buying qualified leads from the Ashfield estate. We reply within one working day with an anonymised proposal.",
  alternates: { canonical: `${siteConfig.url}/contact` },
};

const steps = [
  {
    n: "01",
    title: "Send the form",
    body: "Tell us whether you want to rent a site, buy leads, or talk partnership, and which niche interests you. A sentence or two is enough to start.",
  },
  {
    n: "02",
    title: "We reply within one working day",
    body: "You hear back from the people who run the estate, not a sales team. We will ask a few questions about your capacity and the clients you want.",
  },
  {
    n: "03",
    title: "Anonymised proposal",
    body: "You receive a written proposal built on real estate data: lead volumes, verification tiers and indicative terms. All figures indicative, subject to proposal.",
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="bg-paper-3 grain border-b border-hairline">
        <div className="mx-auto max-w-[1200px] px-(--gutter) py-24 sm:py-32">
          <div className="max-w-3xl" data-reveal>
            <SectionHeading eyebrow="Contact" as="h1">
              One enquiry point for the whole estate
            </SectionHeading>
            <p className="type-lead measure mt-6 text-ink-70">
              Renting a complete niche site, buying qualified leads, or a
              partnership conversation: it all starts here. No call centre, no
              obligation.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-[1200px] px-(--gutter) py-24 sm:py-32">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
            <div className="min-w-0 lg:col-span-5" data-reveal>
              <h2 className="type-h3">What happens next</h2>
              <ol className="mt-10 space-y-10">
                {steps.map((step, i) => (
                  <li
                    key={step.n}
                    className="flex gap-5"
                    data-reveal
                    style={{ "--i": i } as React.CSSProperties}
                  >
                    <span
                      className="font-display type-h3 text-navy nums-lining tabular-nums"
                      aria-hidden="true"
                    >
                      {step.n}
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-sans text-lg font-semibold text-ink">{step.title}</h3>
                      <p className="type-body mt-2 text-ink-70">{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="rule mt-12" />
              <p className="type-caption mt-6 !text-ink-70">
                Enquiries are handled in-house by Ashfield Trading Ltd and are
                never shared with a third-party firm. Conversations are
                confidential and carry no obligation.
              </p>
            </div>

            <div
              className="min-w-0 border border-hairline bg-white p-6 sm:p-8 lg:col-span-7 lg:p-10"
              data-reveal
            >
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
