import type { Metadata } from "next";
import Link from "next/link";
import { HealthCheckWizard } from "@/components/health-check/Wizard";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { focusRing, sectionY, sectionYLoose, siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import {
  buildBreadcrumbJsonLd,
  buildFaqPage,
  buildService,
  JsonLd,
} from "@/lib/schema/index";

const TITLE = "Free Practice Health Check for UK Dentists";
const DESCRIPTION =
  "10-minute diagnostic for UK dentists: associate, principal, partner or locum. We flag the tax structure, NHS Pension, IR35, BADR and goodwill items most relevant to your specific position.";

const FAQS = [
  {
    question: "What does the practice health check cover?",
    answer:
      "10 dental-specific questions covering your role (associate, principal, partner, locum), practice type (NHS / private mix), UDA volume, entity structure, NHS Pension status, goodwill / sale plans, and your current accountancy arrangement. The output is a prioritised list of structural, tax, pension, and exit-planning items most relevant to your specific position.",
  },
  {
    question: "How long does it take?",
    answer:
      "10 minutes for most people. Six steps; the last is a review screen before you submit. You can skip the optional fields without affecting the report quality materially.",
  },
  {
    question: "Is the report personalised tax advice?",
    answer:
      "No. The report is generated automatically from your inputs and is directional only. It flags the items most worth looking at for someone in your position, but the specific numbers and decisions require a conversation with a dental-specialist accountant on your actual figures. The follow-up scoping call is where the personalised advice begins.",
  },
  {
    question: "Will you spam me afterwards?",
    answer:
      "No. We follow up once with the report and an offer of a 30-minute scoping call. If you don't reply, we don't chase. No drip sequences, no remarketing, no list-selling.",
  },
  {
    question: "Is this only for principals?",
    answer:
      "No. Associates, locums, partners, foundation trainees and specialists all benefit from the structural and pension review. Different roles will see different items flagged; the rules engine routes each profile to the items most relevant to them.",
  },
];

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: `${siteConfig.url}/free-practice-health-check`,
    languages: {
      "en-GB": `${siteConfig.url}/free-practice-health-check`,
      "x-default": `${siteConfig.url}/free-practice-health-check`,
    },
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${siteConfig.url}/free-practice-health-check`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function FreePracticeHealthCheckPage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Free practice health check" },
  ];

  const serviceSchema = buildService({
    name: "Free Practice Health Check",
    description: DESCRIPTION,
    path: "/free-practice-health-check",
    serviceType: "Dental Practice Diagnostic",
    category: "Specialist Dental Accountancy Services",
  });
  const breadcrumbSchema = JSON.parse(buildBreadcrumbJsonLd(breadcrumbItems));
  const faqSchema = buildFaqPage(FAQS);
  const schemaPayload = faqSchema
    ? [serviceSchema, breadcrumbSchema, faqSchema]
    : [serviceSchema, breadcrumbSchema];

  return (
    <>
      <JsonLd data={schemaPayload} />

      {/* Hero */}
      <section className="bg-[var(--navy)] text-white">
        <div className={`${siteContainerLg} ${sectionYLoose}`}>
          <Breadcrumb items={breadcrumbItems} variant="light" />
          <div className="mt-8 max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-[var(--gold)]/15 border border-[var(--gold)]/30 px-3 py-1.5 text-xs font-semibold text-[var(--gold)] uppercase tracking-[0.16em]">
              Free · 10 minutes · No obligation
            </div>
            <h1 className="mt-5 font-serif text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
              Free practice health check for UK dentists
            </h1>
            <p className="mt-5 text-base leading-relaxed text-white/85 sm:text-lg">
              10 dental-specific questions. We&apos;ll flag the structural, tax,
              NHS Pension, IR35, BADR and goodwill items most worth reviewing in
              your specific position. The output is on-screen plus a follow-up
              email — no PDF wall, no sales drip.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <Stat value="6" label="Steps" />
              <Stat value="10 min" label="To complete" />
              <Stat value="20+" label="Diagnostic rules" />
              <Stat value="Free" label="No charge" />
            </div>
          </div>
        </div>
      </section>

      {/* Wizard */}
      <section className="bg-[var(--surface)]">
        <div className={`${siteContainerLg} ${sectionY}`}>
          <div className="mx-auto max-w-3xl">
            <HealthCheckWizard />
          </div>
        </div>
      </section>

      {/* Trust + how this works */}
      <section className="bg-white border-y border-[var(--border)]">
        <div className={`${siteContainerLg} ${sectionY}`}>
          <div className="mx-auto max-w-4xl">
            <h2 className="font-serif text-2xl font-semibold text-[var(--ink)] sm:text-3xl">
              How the check works
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              <Step
                num="1"
                title="Answer 10 questions"
                body="Six short steps covering your role, practice, structure, NHS Pension status, and any sale or purchase plans. Optional notes at the end if you want to flag a specific concern."
              />
              <Step
                num="2"
                title="On-screen findings"
                body="20+ diagnostic rules run on your answers. Items are prioritised: Priority (impactful + actionable), Notable, Tweaks, FYI. You see the top five immediately."
              />
              <Step
                num="3"
                title="Follow-up call (optional)"
                body="We follow up to your email once with the full report and offer a 30-minute scoping call to put real numbers against the items. If you don't reply, we don't chase."
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[var(--background)]">
        <div className={`${siteContainerLg} ${sectionY}`}>
          <div className="mx-auto max-w-3xl">
            <h2 className="font-serif text-2xl font-semibold text-[var(--ink)] sm:text-3xl text-center">
              Frequently asked
            </h2>
            <dl className="mt-10 space-y-5">
              {FAQS.map((f) => (
                <div
                  key={f.question}
                  className="rounded-2xl border-l-4 border-[var(--gold)] bg-white p-6 sm:p-7"
                >
                  <dt className="font-serif text-lg font-semibold text-[var(--ink)]">
                    {f.question}
                  </dt>
                  <dd className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)] sm:text-base">
                    {f.answer}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Related guides */}
      <section className="bg-[var(--navy)] text-white">
        <div className={`${siteContainerLg} ${sectionY}`}>
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--gold)]">
                Want to read first?
              </p>
              <h2 className="mt-3 font-serif text-2xl font-semibold text-white sm:text-3xl">
                Background reading from our pillar library
              </h2>
            </div>
            <div className="mt-10 grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {RELATED_GUIDES.map((g) => (
                <Link
                  key={g.href}
                  href={g.href}
                  className={`group block rounded-2xl border border-white/15 bg-white/5 p-5 transition-all hover:border-[var(--gold)] hover:bg-white/10 ${focusRing}`}
                >
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--gold)] mb-2">
                    Pillar guide
                  </p>
                  <h3 className="font-serif text-base font-semibold text-white group-hover:text-[var(--gold)]">
                    {g.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-white/70">
                    {g.body}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

const RELATED_GUIDES = [
  {
    href: "/dental-guides/nhs-pension-scheme-essentials-for-dentists",
    title: "NHS Pension Scheme Essentials",
    body: "1995 / 2008 / 2015 sections, McCloud, retainer membership, the incorporated principal pension trap.",
  },
  {
    href: "/dental-guides/practice-profit-extraction-partnership-vs-ltd",
    title: "Partnership vs Limited Company",
    body: "When each structure wins at 2025/26 rates. Spouse employment, retained earnings, sale planning.",
  },
  {
    href: "/dental-guides/goodwill-valuation-and-sale-playbook",
    title: "Goodwill Valuation and Sale Playbook",
    body: "EBITDA multiples by region, BADR rate change, Section 162 incorporation relief, 24-month pre-sale timeline.",
  },
];

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-serif text-2xl font-semibold text-white sm:text-3xl">
        {value}
      </div>
      <div className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--gold)]/90">
        {label}
      </div>
    </div>
  );
}

function Step({ num, title, body }: { num: string; title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-white p-6">
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--gold-soft)] font-serif text-base font-semibold text-[var(--gold-strong)]">
        {num}
      </div>
      <h3 className="mt-4 font-serif text-lg font-semibold text-[var(--ink)]">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">{body}</p>
    </div>
  );
}
