import type { Metadata } from "next";
import Link from "next/link";
import { btnPrimary, sectionYLoose, siteContainerLg } from "@/components/ui/layout-utils";

export const metadata: Metadata = {
  title: "About | The Money Side of Divorce, Explained",
  description:
    "Plain-English guidance on the financial side of divorce and separation in the UK. Free calculators and guides, with a route to specialist help when you need it.",
};

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-neutral-200 bg-neutral-900 py-16 sm:py-20">
        <div className={siteContainerLg}>
          <p className="eyebrow text-orange-400">About us</p>
          <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            We only cover the money side of divorce.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-300">
            Because settlements, pensions and tax on separation are specific enough that general guidance is not the same as focused guidance.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className={`${siteContainerLg} ${sectionYLoose}`}>
          <div className="max-w-3xl space-y-8 text-base leading-relaxed text-neutral-600 sm:text-lg">
            <p>
              We focus on the financial side of divorce and separation. That focus means the guides and calculators here deal with the specifics, not generalities.
            </p>
            <p>
              Placeholder: real copy lands with the content build.
            </p>
            <p>
              Placeholder: real copy lands with the content build. 
            </p>
            <p>
              We respond within one working day, and the first conversation is always free.
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
