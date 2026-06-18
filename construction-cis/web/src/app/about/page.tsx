import type { Metadata } from "next";
import Link from "next/link";
import { btnPrimary, sectionYLoose, siteContainerLg } from "@/components/ui/layout-utils";

export const metadata: Metadata = {
  title: "About | Specialist CIS Accountants for Construction Trades",
  description:
    "Specialist CIS accountants for UK construction trades. We only work with CIS subcontractors and contractors, so we understand the rules that a generalist accountant will not.",
};

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-neutral-200 bg-neutral-900 py-16 sm:py-20">
        <div className={siteContainerLg}>
          <p className="eyebrow text-orange-400">About us</p>
          <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            We only work with the construction industry.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-300">
            Because CIS, gross payment status, the deduction base rules and the EPS reclaim route are specific enough that generalist experience is not the same as specialist experience.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className={`${siteContainerLg} ${sectionYLoose}`}>
          <div className="max-w-3xl space-y-8 text-base leading-relaxed text-neutral-600 sm:text-lg">
            <p>
              We are specialist accountants for CIS subcontractors and contractors. Every client we work with operates in the construction industry under CIS. That focus means we understand the financial specifics of construction work in a way that a general practice does not.
            </p>
            <p>
              The CIS refund position is the clearest example. The 20% deduction is taken before any expenses or allowances are considered. Getting the materials split right on every deduction statement, claiming mileage at the correct rate (55p per mile from April 2026), applying capital allowances correctly on tools and equipment: these are things we work on every week across a large CIS client base.
            </p>
            <p>
              The same applies to gross payment status, contractor CIS300 obligations, the EPS real-time reclaim route for limited company subcontractors, and the April 2026 anti-fraud changes that affected GPS applications. These are not things that come up occasionally for us. They are the core of what we do.
            </p>
            <p>
              We work on a fixed-fee basis. You know what you are paying before we start. We respond within one working day. You deal with specialist CIS accountants, not a call centre.
            </p>
          </div>
          <div className="mt-12">
            <Link href="/contact" className={btnPrimary}>
              Book a free call
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
