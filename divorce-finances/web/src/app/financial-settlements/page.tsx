import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";

/**
 * Pillar STUB (scaffold phase): compiles and renders with neutral copy.
 * Real pillar content lands with the content build.
 */

export const metadata: Metadata = {
  title: `Financial Settlements on Divorce | ${siteConfig.name}`,
  description: "Plain-English guidance is being built now. Free calculators and guides on the money side of divorce and separation in the UK.",
  alternates: { canonical: `${siteConfig.url}/financial-settlements` },
  robots: { index: false, follow: true },
};

export default function PillarPage() {
  return (
    <>
      <section className="bg-neutral-900 py-14 sm:py-20">
        <div className={siteContainerLg}>
          <Breadcrumb
            variant="light"
            items={[{ label: "Home", href: "/" }, { label: "Financial settlements" }]}
          />
          <h1 className="mt-6 max-w-3xl text-3xl font-bold leading-tight text-white sm:text-4xl">
            Financial settlements
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-neutral-300">
            This guide is being built now.
          </p>
        </div>
      </section>
      <section className="bg-white py-12 sm:py-16">
        <div className={siteContainerLg}>
          <p className="text-neutral-600">
            In the meantime, <Link href="/contact" className="underline">get in touch</Link> and a
            specialist will point you in the right direction.
          </p>
        </div>
      </section>
    </>
  );
}
