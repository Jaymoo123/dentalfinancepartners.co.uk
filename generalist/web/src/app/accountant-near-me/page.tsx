import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { siteContainerLg, btnOnDark } from "@/components/ui/layout-utils";
import { Breadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";
import { Eyebrow, Prose } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { FaqSection } from "@accounting-network/web-shared/design/primitives/FaqSection";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import { DrawnTickList } from "@accounting-network/web-shared/design/marketing/DrawnTickList";
import { ProcessTimeline } from "@accounting-network/web-shared/design/marketing/ProcessTimeline";
import { GeneralistBackdrop } from "@/components/layout/GeneralistBackdrop";
import { LeadForm } from "@/components/forms/LeadForm";
import { LEAD_PROOF_POINTS } from "@/lib/blog-cta-map";
import { JsonLd, buildAccountingService, buildFaqPage, type FaqEntry } from "@/lib/schema";
import { siteConfig } from "@/config/site";
import { CITIES } from "../locations/[slug]/data";

const pageUrl = `${siteConfig.url}/accountant-near-me`;

export const metadata: Metadata = {
  title: `Accountant near me`,
  description:
    "Specialist accountants serving UK businesses in every major town and city. Find an accountant near you across 190+ UK locations. Remote-first, fixed fees, in-person on request.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: `Accountant near me | ${siteConfig.name}`,
    description: "Specialist accountants serving UK businesses in every major town and city.",
    url: pageUrl,
    type: "website",
  },
};

/** How a remote-first practice actually onboards and runs an account. */
const PROCESS_STEPS = [
  {
    n: "01",
    title: "A first call, by phone or video",
    body:
      "Thirty minutes on how the business is structured, when your year end falls, what is already filed and what is late. Nothing to prepare and nothing to bring. You leave the call knowing what we would do and what it would cost.",
  },
  {
    n: "02",
    title: "Engagement, ID checks and HMRC authorisation",
    body:
      "The engagement letter is signed electronically and the anti-money-laundering identity checks are done online. We then file agent authorisation so HMRC lets us act on your corporation tax, VAT, PAYE and self assessment records.",
  },
  {
    n: "03",
    title: "Handover from your current accountant",
    body:
      "If you already have one, we write for professional clearance and request the handover file: last accounts, tax computations, capital allowances pools and payroll history. You do not chase anyone. Switching mid-year is normal and does not reset your year end.",
  },
  {
    n: "04",
    title: "One shared ledger, both of us in it",
    body:
      "We work in your bookkeeping software rather than ours, so the subscription and the data stay yours. Bank feeds and receipt capture are connected once, then the figures we look at are the figures you look at, on the same day.",
  },
  {
    n: "05",
    title: "Quarterly reviews while the year is still open",
    body:
      "We look at the numbers each quarter, when a decision on salary, dividends, a hire or a purchase can still change the outcome. Where Making Tax Digital for Income Tax applies, the quarterly updates go to HMRC from the same software.",
  },
  {
    n: "06",
    title: "Year end, filed and explained",
    body:
      "Accounts and the corporation tax return go to Companies House and HMRC, personal returns are filed ahead of 31 January, and you get a plain-English walkthrough of what the numbers say. In-person is available on request if you would rather do that face to face.",
  },
];

const FAQS: FaqEntry[] = [
  {
    question: "Do I actually need an accountant in my own town?",
    answer:
      "For almost every UK limited company, contractor and sole trader, no. The work happens in your bookkeeping software and in HMRC's and Companies House's online systems, none of which care where either of us sits. What matters is that your accountant answers, files on time and tells you what a decision costs before you make it. Proximity is not what produces any of that.",
  },
  {
    question: "How do we meet, and can we ever meet in person?",
    answer:
      "Day to day we work by phone, video and email, with a scheduled review each quarter. In-person meetings are available on request across the major UK cities, and most clients use them for the year-end conversation rather than routine work.",
  },
  {
    question: "Which bookkeeping software do you work with?",
    answer:
      "Xero, FreeAgent and QuickBooks are the three we see most, and we work inside whichever one you already use. The subscription stays in your name and you keep the login, so if you ever leave, your records leave with you.",
  },
  {
    question: "Can you take over from my current accountant part way through the year?",
    answer:
      "Yes. We write to them for professional clearance and the handover file, refile the HMRC agent authorisation in our name, and pick up from the last position they filed. Your accounting year end does not move and nothing has to be redone.",
  },
  {
    question: "Does working with a remote accountant change anything for HMRC?",
    answer:
      "No. HMRC deals with a registered agent through its own online services, and the filings, deadlines and penalties are identical either way. The only practical difference is that authorisation is set up online rather than in a meeting.",
  },
  {
    question: "What does Making Tax Digital for Income Tax mean for me?",
    answer:
      "Making Tax Digital for Income Tax applies to sole traders and landlords from 6 April 2026 where qualifying income is above £50,000, from 6 April 2027 above £30,000, and from 6 April 2028 above £20,000. It means digital records and quarterly updates to HMRC from compatible software rather than one return a year. If you are inside it, the software we already share with you is what sends those updates.",
  },
];

export default function AccountantNearMePage() {
  const allCities = Object.values(CITIES).sort((a, b) => a.name.localeCompare(b.name));
  const office = siteConfig.company.registeredOffice;
  const accountingService = buildAccountingService({
    city: office.city,
    url: "/accountant-near-me",
    name: siteConfig.name,
    description:
      "Specialist accountants for UK limited companies, contractors, sole traders, partnerships and small businesses. Remote-first across the United Kingdom, with in-person meetings on request.",
    address: {
      streetAddress: [office.line1, office.line2].filter(Boolean).join(", "),
      addressLocality: office.city,
      postalCode: office.postcode,
      addressCountry: "GB",
    },
    areaServed: ["United Kingdom"],
  });
  // Identical binding to the FaqSection below, so markup and schema cannot drift.
  const faqPage = buildFaqPage(FAQS);

  return (
    <>
      {/* BreadcrumbList is emitted by the kit <Breadcrumb> below. */}
      <JsonLd data={faqPage ? [accountingService, faqPage] : [accountingService]} />

      <section className="relative flex min-h-[300px] items-center overflow-hidden bg-slate-900 py-10 sm:min-h-[350px] sm:py-12 lg:py-14">
        <GeneralistBackdrop tone="navy" />
        <div className={`${siteContainerLg} relative z-10`}>
          <div className="max-w-3xl">
            <Breadcrumb
              siteUrl={siteConfig.url}
              onDark
              items={[{ label: "Home", href: "/" }, { label: "Accountant near me" }]}
            />
            <Eyebrow onDark>UK-wide coverage</Eyebrow>
            <h1 className="text-3xl font-bold leading-[1.15] text-white text-balance sm:text-4xl lg:text-5xl">
              Looking for an accountant near you?
            </h1>
            <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">
              {siteConfig.name} is a specialist accountancy firm serving UK limited companies,
              contractors, sole traders, partnerships and small businesses in every major town and
              city. We work remote-first, with in-person meetings available on request.{" "}
              {allCities.length} dedicated location pages, one for each town and city we serve.
            </p>
            <DrawnTickList
              className="mt-6"
              items={["Experienced team", "Fixed fees", `${allCities.length} UK locations`]}
            />
            <a
              href="#book"
              data-cta="near_me_hero"
              data-cta-placement="hero"
              data-cta-goal="form"
              className={`${btnOnDark} mt-6`}
            >
              Book a free call
            </a>
          </div>
        </div>
      </section>

      {/* How remote-first works */}
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>Remote-first</Eyebrow>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">
            How does a remote-first accountant work?
          </h2>
          <Prose>
            <p>
              You probably don&rsquo;t actually need an accountant physically next door. You need
              someone who returns your calls, files your accounts on time, and tells you what to do
              about MTD, R&amp;D, dividends or your next hire. We do all that over phone and video,
              with in-person meetings on request in the major UK cities. Every invoice, return and
              discussion lives in a shared cloud workspace (Xero, FreeAgent, QuickBooks, whichever
              you use). You see the same numbers we see, in real time, from anywhere.
            </p>
            <p>
              For most UK limited companies, contractors and sole traders, remote-first is the
              better service model: lower fees because we are not paying for a high-street office,
              faster response because we are not booking meeting rooms, and the same senior
              accountant on your account year after year.
            </p>
          </Prose>
          <div className="mt-10 sm:mt-12">
            <ProcessTimeline steps={PROCESS_STEPS} />
          </div>
        </div>
      </section>

      {/* Alphabetical city directory */}
      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>Locations</Eyebrow>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">
            Find your nearest location page
          </h2>
          <p className="mt-4 max-w-3xl text-base text-slate-600">
            Each page covers local sectors, named employers, an anonymised case study, and
            frequently asked questions for that town. The full index lives on{" "}
            <Link href="/locations" className="font-semibold text-primary-700 underline">
              the locations page
            </Link>
            .
          </p>
          <div className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {allCities.map((c) => (
              <Link
                key={c.slug}
                href={`/locations/${c.slug}`}
                className="group flex min-h-[44px] items-center justify-between gap-2 rounded-xl border-2 border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 transition-colors hover:border-primary-600 hover:text-primary-700"
              >
                <span className="truncate font-medium">{c.name}</span>
                <ArrowRight
                  aria-hidden
                  className="h-3 w-3 shrink-0 transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div id="book" className="scroll-mt-24">
        <LeadCTAPanel
          title="Don’t see your town?"
          description={`We serve UK businesses nationwide, not just the ${allCities.length} cities listed. Book a free 30-minute call and we will explain how the remote-first service works for your situation. No jargon, no obligation.`}
          proofPoints={LEAD_PROOF_POINTS}
          form={<LeadForm submitLabel="Book a free call" redirectOnSuccess={false} />}
          backdrop={<GeneralistBackdrop tone="navy" />}
          footnote="If a local firm is genuinely the better answer for your situation, we will say so on the call."
        />
      </div>

      <FaqSection faqs={FAQS} className="bg-white py-12 sm:py-16 lg:py-20" />
    </>
  );
}
