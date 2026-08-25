import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Thank you | Ashfield Trading",
  description: "Your enquiry has been received. We reply within one working day.",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <section className="bg-paper-3 grain">
      <div className="mx-auto max-w-[1200px] px-(--gutter) py-28 sm:py-40">
        <div className="max-w-2xl" data-reveal>
          <SectionHeading eyebrow="Enquiry received" as="h1">
            Thank you, your enquiry is in
          </SectionHeading>
          <p className="type-lead measure mt-6 text-ink-70">
            We reply within one working day, usually sooner.
          </p>

          <div className="rule mt-12" />
          <h2 className="type-h3 mt-10">What happens next</h2>
          <ul className="mt-6 space-y-4">
            <li className="type-body text-ink-70">
              We read your enquiry and come back with a few questions about
              your capacity and the clients you want.
            </li>
            <li className="type-body text-ink-70">
              You then receive an anonymised written proposal built on real
              estate data: lead volumes, verification tiers and indicative
              terms. Figures are indicative, subject to proposal.
            </li>
            <li className="type-body text-ink-70">
              No obligation at any point. If the fit is not right, we say so.
            </li>
          </ul>

          <div className="mt-12 flex flex-wrap gap-4">
            <Button href="/">Back to the homepage</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
