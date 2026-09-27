import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import {
  btnPrimary,
  siteContainerLg,
  sectionYLoose,
} from "@/components/ui/layout-utils";
import { PageHero } from "@/components/hubs/HubParts";
import { EntityBlock } from "@accounting-network/web-shared/design/marketing/EntityBlock";
import { niche } from "@/config/niche-loader";

export const metadata: Metadata = {
  title: "About | Specialist Charity Accountants",
  description: `${siteConfig.name} is a specialist accountancy practice for UK charities, CICs and social enterprises. Accounts, independent examination, Gift Aid and trustee compliance.`,
  alternates: { canonical: `${siteConfig.url}/about` },
};

export default function AboutPage() {
  return (
    <>
      {/* One hero vocabulary: the same PageHero the ported hubs use, dark tone,
          which is the ground generalist gives /about and the nearest reading of
          the primary-600 block this replaces. Heading and standfirst strings are
          byte-identical to what shipped; this is a visual change only. The
          eyebrow is the page name, because PageHero requires one and a label is
          not the place to make a claim. */}
      <PageHero
        eyebrow="About"
        tone="dark"
        title="We only work with charities, CICs and social enterprises."
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      >
        <p>
          Because the Charities SORP, fund accounting, Gift Aid and independent examination are specific enough that general accounting experience is not the same as specialist experience.
        </p>
      </PageHero>

      <section className="bg-white">
        <div className={`${siteContainerLg} ${sectionYLoose}`}>
          <div className="min-w-0 space-y-6 text-base leading-relaxed text-slate-700 sm:text-lg">
            <p>We are specialist accountants for charities, community interest companies and social enterprises. That focus means we understand the financial specifics of charitable organisations in a way that a general practice does not.</p>
            <p>The independent examination is the clearest example. Many trustees do not know what the examiner is looking for, what the examiner needs the accounts to include, or how to make the examination process straightforward. We prepare the accounts with the examination in mind and connect you with an independent examiner.</p>
            <p>The same applies to Gift Aid and GASDS claims, fund accounting for restricted grants, the Charities SORP presentation requirements, and the Charity Commission annual return. These are not things that come up occasionally for us. They are the core of what we do.</p>
          </div>
        </div>
      </section>

      {niche.entity ? <EntityBlock {...niche.entity} /> : null}

      <section className="bg-white">
        <div className={siteContainerLg}>
          <div className="pt-10">
            <Link href="/contact" className={btnPrimary}>Get in touch</Link>
          </div>
        </div>
      </section>
    </>
  );
}
