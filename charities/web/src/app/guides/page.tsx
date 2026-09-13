import type { Metadata } from "next";
import { getAllGuides } from "@/lib/guides/content";
import { HubSection, LinkCardGrid, PageHero } from "@/components/hubs/HubParts";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Charity Finance Guides | Trustee Tax",
  description:
    "Free guides on charity accounts, independent examination, Gift Aid, charity VAT and trustee compliance from Trustee Tax.",
  alternates: { canonical: `${siteConfig.url}/guides` },
};

export default function GuidesIndexPage() {
  const guides = getAllGuides();

  return (
    <>
      <PageHero
        eyebrow="Guides"
        title="Charity finance guides."
        crumbs={[{ label: "Home", href: "/" }, { label: "Guides" }]}
      >
        <p>
          Plain-English guides to charity accounts, independent examination, Gift Aid, VAT and
          trustee compliance.
        </p>
      </PageHero>

      <HubSection
        eyebrow="The library"
        // Derived, not typed: the corpus is whatever is in content/guides.
        title={`${guides.length} ${guides.length === 1 ? "guide" : "guides"}`}
        ground="slate"
      >
        {guides.length === 0 ? (
          <p className="mt-8 text-slate-600">Guides coming soon.</p>
        ) : (
          <LinkCardGrid
            columns={3}
            items={guides.map((guide) => ({
              href: `/guides/${guide.slug}`,
              title: guide.title,
              body: guide.summary || undefined,
              meta: guide.lastReviewed ? `Updated: ${guide.lastReviewed}` : undefined,
            }))}
          />
        )}
      </HubSection>
    </>
  );
}
