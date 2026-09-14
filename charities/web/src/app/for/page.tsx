import type { Metadata } from "next";
import Link from "next/link";
import { btnPrimary } from "@/components/ui/layout-utils";
import { HubSection, LinkCardGrid, PageHero } from "@/components/hubs/HubParts";
import { charityTypes } from "@/data/charity-types";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Sectors We Work With | Charities, CICs and Social Enterprises",
  description:
    "Specialist charity accounting for community interest companies, social enterprises, charitable incorporated organisations, and registered charities of all sizes.",
  alternates: { canonical: `${siteConfig.url}/for` },
};

export default function ForIndexPage() {
  return (
    <>
      <PageHero
        eyebrow="Sectors"
        title="Specialist accounting for charities, CICs and social enterprises."
        crumbs={[{ label: "Home", href: "/" }, { label: "Sectors" }]}
      >
        <p>
          Each sector has different accounting requirements, regulatory obligations and tax
          treatment. We know the specific position for each and where the compliance risks and
          opportunities actually are.
        </p>
      </PageHero>

      <HubSection eyebrow="The sectors" title="Sectors we work with" ground="slate">
        <LinkCardGrid
          columns={2}
          items={charityTypes.map((type) => ({
            href: `/for/${type.slug}`,
            title: type.title,
            // First sentence of the intro, with the inline anchors stripped:
            // the card body renders as text, so raw markup would show through.
            body: `${type.intro.replace(/<[^>]+>/g, "").split(".")[0]}.`,
          }))}
        />
      </HubSection>

      <HubSection eyebrow="Why it matters" title="Each sector has its own rules.">
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-slate-700 sm:text-lg">
          <p>
            A registered charity, a community interest company and a social enterprise may all
            pursue similar purposes but they operate under different legislation, file with
            different regulators and have different tax positions. The accounting requirements are
            not the same.
          </p>
          <p>
            Getting the structure wrong at the outset creates compliance problems that take years to
            unwind. Getting the accounts wrong means failed independent examinations, Charity
            Commission queries and funder reporting issues. We work with all three sectors week in,
            week out.
          </p>
        </div>
        {/* The published page closed on this button rather than a separate CTA
            band, so it stays where it was: adding a closing band here would be
            authoring new copy, not porting the design. */}
        <div className="mt-8">
          <Link href="/contact" className={btnPrimary}>
            Get in touch
          </Link>
        </div>
      </HubSection>
    </>
  );
}
