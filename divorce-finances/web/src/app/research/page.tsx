import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";

/**
 * Research index STUB (scaffold phase): no data reports exist yet.
 * Original data assets land with the content build.
 */

export const metadata: Metadata = {
  title: `Research and data | ${siteConfig.name}`,
  description:
    "Original, sourced data on divorce and the money side of separation in the UK, built from official open data. Free to read and cite.",
  alternates: { canonical: `${siteConfig.url}/research` },
  robots: { index: false, follow: true },
};

export default function ResearchIndexPage() {
  return (
    <>
      <section className="bg-neutral-900 py-14 sm:py-20">
        <div className={siteContainerLg}>
          <Breadcrumb
            variant="light"
            items={[{ label: "Home", href: "/" }, { label: "Research" }]}
          />
          <h1 className="mt-6 max-w-3xl text-3xl font-bold leading-tight text-white sm:text-4xl">
            Research and data
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-neutral-300">
            Original data reports on divorce and the money side of separation are being built now.
          </p>
        </div>
      </section>
      <section className="bg-white py-12 sm:py-16">
        <div className={siteContainerLg}>
          <p className="text-neutral-600">
            Nothing published yet. In the meantime, see the{" "}
            <Link href="/blog" className="underline">
              guides
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
