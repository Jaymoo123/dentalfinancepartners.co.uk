import type { Metadata } from "next";
import Link from "next/link";
import { btnPrimary, siteContainerLg } from "@/components/ui/layout-utils";

export const metadata: Metadata = {
  title: "Thank you | We'll be in touch",
  description:
    "Thank you for contacting Contractor Tax Accountants. We have received your enquiry and a specialist contractor accountant will be in touch shortly.",
  robots: { index: false },
};

export default function ThankYouPage() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className={siteContainerLg}>
        <div className="max-w-xl">
          <span className="inline-block h-1 w-12 bg-cyan-700" aria-hidden />
          <h1 className="mt-8 text-4xl font-semibold tracking-tight sm:text-5xl">
            Thank you.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-neutral-600">
            We have received your enquiry and will come back to you within one working day. You will hear from a specialist contractor accountant, not a sales team.
          </p>
          <p className="mt-4 text-base leading-relaxed text-neutral-600">
            In the meantime, you might find our IR35 guides useful.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/blog" className={btnPrimary}>
              Browse IR35 guides
            </Link>
            <Link
              href="/"
              className="inline-flex min-h-12 items-center text-sm font-medium text-neutral-700 underline decoration-cyan-700 underline-offset-4 hover:text-neutral-900"
            >
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
