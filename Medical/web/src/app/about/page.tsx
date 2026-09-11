import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow, Prose } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import { LeadForm } from "@/components/forms/LeadForm";
import { MedicalBackdrop } from "@/components/layout/MedicalBackdrop";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import {
  btnOnCream,
  btnPrimary,
  btnSecondary,
  focusRing,
  heroCreamSurface,
  siteContainerLg,
} from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { buildOrganizationJsonLd } from "@/lib/organization-schema";

export const metadata: Metadata = {
  title: "About: Specialist Medical Tax Publisher and Enquiry Service",
  description:
    "What Medical Accountants UK is: a medical-only tax and accounting publisher for UK doctors, and an enquiry service that matches your enquiry to a regulated firm from our specialist partner network. NHS pension, locum tax, GP partnership and private practice.",
  alternates: { canonical: `${siteConfig.url}/about` },
  openGraph: {
    title: "About Medical Accountants UK",
    description:
      "A medical-only tax and accounting publisher for UK doctors, and an enquiry service that matches your enquiry to a regulated firm from our specialist partner network.",
    url: `${siteConfig.url}/about`,
    type: "website",
    images: [{ url: siteConfig.publisherLogoUrl, alt: siteConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Medical Accountants UK",
    description:
      "A medical-only tax and accounting publisher for UK doctors, and an enquiry service that matches your enquiry to a regulated firm from our specialist partner network.",
  },
};

/* What actually happens to an enquiry, in the order it happens. Traced to the
   call site, not written from the old marketing copy: LeadForm renders
   siteConfig.leadConsentText, which says a firm from the specialist partner
   network makes contact, and the privacy policy caps the network at six firms.
   No turnaround, no fee, no named accountant: none of those are ours to state. */
const ENQUIRY_STEPS = [
  {
    title: "You tell us your position",
    body: "Your role, how your income is structured and what is actually on your mind: an annual allowance charge, locum status, a partnership, private work, or a practice you are buying into or leaving.",
  },
  {
    title: "We match it to a specialist firm",
    body: "Your details go to a regulated firm from our specialist partner network that works with doctors. If that firm cannot help, they may go to another firm in the network for the same purpose, within the cap set out in our privacy policy.",
  },
  {
    title: "That firm contacts you",
    body: "The firm makes contact by phone or email and takes it from there. Scope, engagement and fees are agreed with them. We are not a party to that, and nothing you send us creates a relationship with an accountant on its own.",
  },
];

/* The publishing side, which is the part of the proposition we do run. Each
   tile is a live route, so this section is also the page's crawl path. */
const WHAT_WE_PUBLISH = [
  {
    href: "/calculators",
    title: "Calculators",
    body: "NHS pension annual allowance, locum tax, doctor expenses and private practice incorporation, with the workings shown rather than a bare number.",
  },
  {
    href: "/medical-guides",
    title: "Guides",
    body: "Long-form positions on the questions doctors ask most, from IR35 for locums to GP partnership accounts and consultant private practice tax.",
  },
  {
    href: "/research",
    title: "Research",
    body: "Our annual allowance pension tax index, built from published HMRC and NHS scheme statistics and republished as a machine-readable series.",
  },
  {
    href: "/nhs-pension",
    title: "NHS pension",
    body: "The scheme side in one place: pension input amounts, tapering, carry forward and Scheme Pays elections.",
  },
];

/* Closing-panel proof points. Mechanisms only: no fee, no turnaround, no client
   count, and nothing that implies an in-house team does the work. Same rule the
   blog hubs were written to in Phase 3. */
const MEDICAL_PROOF_POINTS = [
  { title: "Medical work only", detail: "NHS pension, practice accounts and private practice" },
  { title: "Matched to a specialist firm", detail: "Your enquiry goes to accountants who work with doctors" },
  { title: "One position, not three", detail: "Practice, pension and personal return read together" },
];

export default function AboutPage() {
  const orgSchema = buildOrganizationJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />

      <section
        className={`relative flex items-center overflow-hidden py-10 sm:py-12 lg:py-14 min-h-[360px] sm:min-h-[420px] lg:min-h-[440px] ${heroCreamSurface}`}
      >
        <MedicalBackdrop tone="cream" />
        <div className={`${siteContainerLg} relative z-10`}>
          <div className="max-w-3xl">
            <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "About" }]} />
            <Eyebrow>About</Eyebrow>
            <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl lg:text-6xl">
              About Medical Accountants UK
            </h1>
            <p className="mt-4 text-base leading-7 text-slate-700 sm:text-lg sm:leading-8">
              We are a medical-only tax and accounting publisher, and an enquiry service. We write the
              guides and build the calculators on this site, and when you send an enquiry we match it to
              a regulated firm from our specialist partner network that works with doctors, rather than
              to a generalist who will meet your position for the first time.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-4">
              <Link
                href="#enquiry"
                data-cta="about_hero_enquiry"
                data-cta-placement="about_hero"
                data-cta-goal="form"
                className={btnPrimary}
              >
                Send an enquiry
              </Link>
              <Link
                href="#what-we-publish"
                data-cta="about_hero_publish"
                data-cta-placement="about_hero"
                className={btnOnCream}
              >
                See what we publish
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>Plainly</Eyebrow>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">What this site is</h2>
          <Prose>
            <p>
              Everything here is about one thing: the tax and accounting position of UK medical
              professionals. NHS pension annual allowance, locum status and expenses, mixed NHS and
              private income, GP partnership accounts, and private practice incorporation. Nothing on
              this site is written for a general small business, because a general small business does
              not have a pension input amount or a Performers List entry.
            </p>
            <p>
              We are not the firm that files your return. We publish the research and we route the
              enquiry. The advice, the engagement letter and the fees all sit between you and the firm
              you end up speaking to, and what that firm charges is a matter for them.
            </p>
            <p>
              That split is the honest version of the proposition, and it is also the useful one. It
              means the guidance on this site is written to be right rather than to sell a service, and
              it means an enquiry lands with a firm that already does this work instead of with whoever
              happens to answer.
            </p>
          </Prose>
        </div>
      </section>

      <section id="how-it-works" className="scroll-mt-24 bg-slate-50 py-16 sm:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>The handoff</Eyebrow>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">How an enquiry works</h2>
          <ol className="mt-8 grid list-none gap-6 pl-0 sm:grid-cols-3">
            {ENQUIRY_STEPS.map((step, i) => (
              <li key={step.title} className="rounded-xl bg-white p-6 ring-1 ring-slate-200/70">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary-50 text-sm font-bold text-primary-700 ring-1 ring-primary-100">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-lg font-bold text-slate-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">{step.body}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-sm leading-relaxed text-slate-700">
            The detail, including how many firms your details can reach and how to opt out, is in our{" "}
            <Link href="/privacy-policy" className={`font-semibold text-primary-700 underline ${focusRing} rounded`}>
              privacy policy
            </Link>
            .
          </p>
        </div>
      </section>

      <section id="why-medical-only" className="scroll-mt-24 bg-white py-16 sm:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>Focus</Eyebrow>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">Why medical only</h2>
          <Prose>
            <p>
              Doctors face financial questions that do not arise in other sectors. The pension input
              amount on a defined benefit scheme, tapering, carry forward and Scheme Pays elections.
              Locum IR35 status. Reconciling NHS and private income. Partnership profit sharing, and
              what a medical professional can actually claim against tax.
            </p>
            {/* house_positions.md §2.B, locked 2026-06-03, figures re-verified
                2026-08-26. The one house-position claim on the page. */}
            <p>
              The lifetime allowance was abolished on 6 April 2024 and replaced by the Lump Sum
              Allowance and the Lump Sum and Death Benefit Allowance, which is what the retirement side
              of the planning now works to. Positions like that one are written down before anything is
              published here, with a source and a date, and the published pages are corrected when the
              figures move.
            </p>
            <p>
              A generalist can process the numbers. Spotting that pension growth is about to trigger an
              annual allowance charge, or that incorporating private work will cut a GP&apos;s
              pensionable pay, is a different job, and it is the reason the enquiry goes where it goes.
            </p>
          </Prose>
        </div>
      </section>

      <section id="what-we-publish" className="scroll-mt-24 bg-slate-50 py-16 sm:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>Open to read</Eyebrow>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">What we publish</h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-700">
            All of it is free to read and none of it sits behind a paywall, which makes it the fastest
            way to judge whether we know the subject before you send us anything.
          </p>
          <ul className="mt-8 grid list-none gap-6 pl-0 sm:grid-cols-2">
            {WHAT_WE_PUBLISH.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`block h-full rounded-xl bg-white p-6 ring-1 ring-slate-200/70 transition-all hover:shadow-md hover:ring-primary-600 ${focusRing}`}
                >
                  <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">{item.body}</p>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm leading-relaxed text-slate-700">
            The{" "}
            <Link href="/blog" className={`font-semibold text-primary-700 underline ${focusRing} rounded`}>
              blog
            </Link>{" "}
            carries the rest. Good places to start are{" "}
            <Link
              href="/blog/nhs-pension-annual-allowance-complete-guide"
              className={`font-semibold text-primary-700 underline ${focusRing} rounded`}
            >
              NHS pension annual allowance planning
            </Link>{" "}
            and the{" "}
            <Link
              href="/blog/locum-doctor-tax-complete-guide"
              className={`font-semibold text-primary-700 underline ${focusRing} rounded`}
            >
              locum doctor tax guide
            </Link>
            .
          </p>
        </div>
      </section>

      {/* One closing ask, contained so a navy panel never meets the navy footer.
          The retired CTASection's two links survive verbatim as the footnote, so
          `cta-section-primary` keeps its id, label and href and no live
          vw_cta_performance series forks. */}
      <div id="enquiry" className="scroll-mt-24">
        <LeadCTAPanel
          contained
          ground="white"
          title="Tell us where you are"
          description="Your role, your structure and your priorities for the year. We read it and match it to a regulated firm in our specialist partner network that works with doctors."
          proofPoints={MEDICAL_PROOF_POINTS}
          formTitle="Send an enquiry"
          form={<LeadForm redirectOnSuccess={false} submitLabel="Send enquiry" />}
          footnote={
            <span className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/contact"
                className={`${btnPrimary} w-full min-w-0 sm:w-auto`}
                data-cta="cta-section-primary"
              >
                Speak to a specialist
              </Link>
              <Link href="/services" className={`${btnSecondary} w-full min-w-0 sm:w-auto`}>
                View services
              </Link>
            </span>
          }
        />
      </div>
    </>
  );
}
