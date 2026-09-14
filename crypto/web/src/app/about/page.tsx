import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { siteContainerLg, sectionY, btnPrimary } from "@/components/ui/layout-utils";
import { PageHero } from "@/app/_parts/PageHero";
import { Eyebrow } from "@accounting-network/web-shared/design/primitives/page-blocks";

export const metadata: Metadata = {
  title: "About | UK Cryptoasset Tax Specialists",
  description: `${siteConfig.name} are specialist UK tax accountants for cryptoasset holders.`,
  alternates: { canonical: `${siteConfig.url}/about` },
};

/**
 * What we handle. Was one comma-run sentence in the body copy; same five items,
 * now a ruled statement list so a reader can take them one at a time. Nothing
 * added, nothing dropped.
 */
const whatWeHandle = [
  "CGT s104 pool calculations, including the same-day and 30-day rules",
  "HMRC disclosure, through the route that fits the facts",
  "Self Assessment, including the SA108 cryptoasset pages",
  "Staking and mining income classification",
  "DeFi transaction review",
];

export default function AboutPage() {
  const co = siteConfig.company;
  return (
    <>
      <PageHero
        eyebrow="Who we are"
        title="We only work with cryptoasset holders and businesses."
        items={[{ label: "Home", href: "/" }, { label: "About" }]}
      >
        <p className="mt-4 text-lg leading-relaxed text-slate-300">
          CGT pooling rules, HMRC disclosure routes, staking income treatment and the CARF
          compliance deadline are specific enough that general accounting experience is not the
          same as specialist experience.
        </p>
        {/* The hero had no ask at all, so a reader convinced by the first screen
            had to scroll the whole page to act. Points at the panel on this page
            rather than /contact, so the enquiry is taken where the reader is.
            Written out rather than composed on `btnPrimary`: that recipe's ground
            is --btn-ground, which on this site IS the navy this section paints, so
            the button would vanish into its own band. `btnOnDark` is the kit's
            ghost outline (border-white/40, bg-white/5) and is a legitimate
            alternative, but it is the estate's SECONDARY weight and this is the
            page's only hero ask, so the solid white is kept at the kit's button
            metrics (rounded-xl, min-w-[10rem], text-base, font-bold) instead. */}
        <div className="mt-8">
          <Link
            href="#book"
            className="inline-flex min-h-12 min-w-[10rem] touch-manipulation items-center justify-center rounded-xl bg-white px-8 py-3.5 text-base font-bold text-[#0e1a3a] transition-colors hover:bg-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Tell us about your position
          </Link>
        </div>
      </PageHero>

      <section className="bg-white">
        <div className={`${siteContainerLg} ${sectionY}`}>
          <div className="max-w-3xl">
            <Eyebrow>Why we exist</Eyebrow>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Specialist, not general
            </h2>
            <div className="mt-6 space-y-6 text-base leading-relaxed text-slate-700 sm:text-lg">
              <p>
                We are specialist tax accountants for UK cryptoasset holders: investors, day
                traders, DeFi and staking participants, NFT creators, miners, and businesses that
                hold or accept crypto.
              </p>
              <p>
                The CARF reporting framework means exchanges will report your data to HMRC for the
                first time between January and May 2027, covering activity from 1 January 2026.
                Holders who have not kept accurate records need to act before that data lands.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50">
        <div className={`${siteContainerLg} ${sectionY}`}>
          <div className="max-w-3xl">
            <Eyebrow>The work</Eyebrow>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              What we handle
            </h2>
          </div>
          <ul className="mt-8 max-w-3xl">
            {whatWeHandle.map((item) => (
              <li
                key={item}
                className="border-t border-slate-200 py-5 text-base leading-relaxed text-slate-700 last:border-b sm:text-lg"
              >
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-3xl text-base leading-relaxed text-slate-700 sm:text-lg">
            Tell us about your position and we will explain what is involved.
          </p>
          <div className="mt-10 max-w-3xl border-t border-slate-200 pt-8 text-sm text-slate-600">
            <p>
              {co.tradingName} is a trading name of {co.legalName}, registered in{" "}
              {co.placeOfRegistration} (company no. {co.number}). Registered office:{" "}
              {co.registeredOfficeLine}.
            </p>
          </div>
        </div>
      </section>

      {/* The page's closing ask. It is a LINK to /contact, not a form.
          Adding a lead-capture surface to a page that had none is an owner
          gate (capture-surface scope), so this page keeps the invitation and
          sends the reader to the one form that already existed. If the owner
          approves a form here, the kit's LeadCTAPanel with proofPoints={[]}
          is the drop-in: crypto publishes neither a fee nor a turnaround, and
          inventing replacements is how a removed claim comes back. */}
      <section className="bg-white py-16 sm:py-20">
        <div id="book" className="mx-auto max-w-3xl scroll-mt-24 px-6">
          <Eyebrow>Free call</Eyebrow>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-[#0e1a3a] sm:text-3xl">
            Tell us where you are
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-700">
            Send us the shape of your position: what you hold, how you came by
            it, and which tax years are open. You do not need your figures
            ready.
          </p>
          <a
            href="/contact"
            className={`${btnPrimary} mt-8`}
          >
            Get in touch
          </a>
          <p className="mt-4 text-sm text-slate-600">
            No obligation and no hard sell. If your position is already right,
            we will say so.
          </p>
        </div>
      </section>
    </>
  );
}
