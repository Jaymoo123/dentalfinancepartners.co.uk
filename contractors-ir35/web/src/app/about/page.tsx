import type { Metadata } from "next";
import Link from "next/link";
import { btnPrimary, sectionYLoose, siteContainerLg } from "@/components/ui/layout-utils";

export const metadata: Metadata = {
  title: "About | Specialist Contractor Accountants",
  description:
    "Specialist accountants for UK contractors and IR35. We only work with contractors, so we understand the rules that a generalist accountant will not.",
};

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-neutral-200 bg-neutral-900 py-16 sm:py-20">
        <div className={siteContainerLg}>
          <p className="eyebrow text-cyan-400">About us</p>
          <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            We only work with contractors.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-300">
            Because IR35, off-payroll working and PSC tax are specific enough that generalist experience is not the same as specialist experience.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className={`${siteContainerLg} ${sectionYLoose}`}>
          <div className="max-w-3xl space-y-8 text-base leading-relaxed text-neutral-600 sm:text-lg">
            <p>
              We are specialist accountants for UK contractors and limited company directors. Every client we work with operates through a PSC or is considering doing so. That focus means we understand the financial specifics of contracting in a way that a general practice does not.
            </p>
            <p>
              IR35 is the clearest example. The rules are specific, the rules changed in April 2021, and getting them wrong is expensive. A generalist accountant can read the guidance. We see the practical application of those rules across a large contractor client base every week, so we know where the risks and opportunities actually are.
            </p>
            <p>
              The same applies to salary and dividend planning, contractor expenses, PSC pension strategy, and the mechanics of the off-payroll rules. These are not things that come up occasionally for us. They are the core of what we do.
            </p>
            <p>
              We work on a fixed-fee basis. You know what you are paying before we start. We respond within one working day. You deal with specialist accountants, not a call centre.
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
