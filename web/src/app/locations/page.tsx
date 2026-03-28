import type { Metadata } from "next";
import Link from "next/link";
import { CTASection } from "@/components/ui/CTASection";
import { contentNarrow, focusRing, sectionY } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

export const metadata: Metadata = {
  title: "Locations",
  description: `${siteConfig.name} — specialist dental practice finance and accounting across the UK. Explore our locations.`,
  alternates: { canonical: `${siteConfig.url.replace(/\/$/, "")}/locations` },
};

const cityLabel: Record<string, string> = {
  london: "London",
  manchester: "Manchester",
};

export default function LocationsHubPage() {
  return (
    <div className={`${contentNarrow} ${sectionY}`}>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Locations" },
        ]}
      />
      <h1 className="font-serif text-3xl font-semibold leading-tight text-[var(--ink)] sm:text-4xl">Locations</h1>
      <p className="mt-4 text-base leading-relaxed text-[var(--muted)] sm:text-lg">
        We work with dental practices across the UK. Start from a local page for context — then get in touch for advice
        tailored to your structure.
      </p>

      <ul className="mt-10 grid list-none gap-4 pl-0 sm:mt-12 sm:grid-cols-2 sm:gap-6">
        {siteConfig.locations.map((loc) => (
          <li key={loc.slug}>
            <Link
              href={`/locations/${loc.slug}`}
              className={`card-premium block rounded-xl p-6 no-underline shadow-sm transition-shadow hover:shadow-md ${focusRing}`}
            >
              <span className="font-serif text-xl font-semibold text-[var(--ink)]">
                {cityLabel[loc.slug] ?? loc.slug}
              </span>
              <span className="mt-2 block text-sm leading-relaxed text-[var(--muted)]">{loc.title}</span>
              <span className="mt-4 inline-flex min-h-10 items-center text-sm font-semibold text-[var(--accent-strong)]">
                View local page →
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-12">
        <CTASection
          title="Not sure which page fits?"
          description="Tell us where you are based and whether you are an associate or owner — we will point you to the right next step."
        />
      </div>
    </div>
  );
}
