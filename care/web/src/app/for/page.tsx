import type { Metadata } from "next";
import Link from "next/link";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { careHubs } from "@/data/care-hubs";
export const metadata: Metadata = {
  title: "Care Sector Accountants by Provider Type | Who We Help",
  description: "Specialist care sector finance support by provider type: care homes, domiciliary care, supported living, children's homes and care startups.",
};
export default function ForIndexPage() {
  return (<>
    <section className="border-b border-neutral-200 bg-[#5a4d75] py-16 sm:py-20">
      <div className={siteContainerLg}>
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">Specialist care sector finance for every type of provider.</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">Each type of care provider faces different financial and compliance considerations. We work with all of them.</p>
      </div>
    </section>
    <section className="bg-[#7d6b9e]/5 py-12 sm:py-16 lg:py-20">
      <div className={siteContainerLg}>
        <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {careHubs.map((hub) => (
            <Link key={hub.slug} href={`/for/${hub.slug}`} className="group block bg-white border border-neutral-200 p-5 sm:p-6 transition-all hover:border-[#7d6b9e] hover:shadow-md">
              <span className="text-base font-bold text-neutral-900 group-hover:text-[#7d6b9e] transition-colors">{hub.title}</span>
              <p className="mt-2 text-sm text-neutral-500 line-clamp-2">{hub.headline}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  </>);
}
