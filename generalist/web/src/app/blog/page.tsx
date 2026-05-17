import type { Metadata } from "next";
import Link from "next/link";
import { siteContainerLg, sectionY, btnPrimary } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { SignupForm } from "@/components/newsletter/SignupForm";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Plain-English guidance on UK business tax, structure, payroll, VAT and exit planning. Written by ICAEW-qualified accountants.",
  alternates: { canonical: `${siteConfig.url}/blog` },
  openGraph: {
    title: `Insights | ${siteConfig.name}`,
    description:
      "Plain-English guidance on UK business tax, structure, payroll, VAT and exit planning.",
    url: `${siteConfig.url}/blog`,
    type: "website",
  },
};

export default function BlogIndexPage() {
  return (
    <section className={`${sectionY} bg-[#fafaf7]`}>
      <div className={siteContainerLg}>
        <div className="max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-widest text-orange-500">
            Insights
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl">
            Reading material, in preparation.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-neutral-600 max-w-2xl">
            We&apos;re writing a small library of plain-English guides on UK business tax,
            VAT and Making Tax Digital, payroll, incorporation, R&amp;D credits and exit
            planning. Every article will be written or reviewed by an ICAEW-qualified
            accountant and updated against current HMRC rates.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-neutral-600 max-w-2xl">
            In the meantime, the calculators and guides below are live. Book a call if you
            need answers sooner.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/calculators" className={btnPrimary}>
              Free calculators
            </Link>
            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center justify-center border border-neutral-900 bg-transparent px-7 py-3.5 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-900 hover:text-white"
            >
              Book a free call
            </Link>
          </div>
        </div>

        <div className="mt-20 max-w-2xl">
          <SignupForm
            source="blog-stub"
            variant="card"
            heading="The Director&rsquo;s Brief"
            body="Get notified when new guides land. Weekly note on UK business tax and structure, plain text, unsubscribe one click."
            ctaLabel="Subscribe"
          />
        </div>
      </div>
    </section>
  );
}
