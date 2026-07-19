import type { Metadata } from "next";
import Link from "next/link";
import { ServiceTiers } from "@accounting-network/web-shared/components/ServiceTiers";
import { StatsBar } from "@accounting-network/web-shared/components/StatsBar";
import { LeadForm } from "@/components/forms/LeadForm";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { btnPrimary, focusRing, siteContainerLg, sectionY, sectionYLoose } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { serviceTiers, siteStats } from "@/config/service-tiers";
import { buildService, buildBreadcrumbJsonLd, buildFaqPage, JsonLd } from "@/lib/schema/index";

export const metadata: Metadata = {
  title: `Specialist Dental Accountants UK | ${siteConfig.name}`,
  description:
    "Specialist dental accountants for UK practices, principals, associates and locum dentists. NHS contract accounting, profit extraction, practice valuation. Fixed fees.",
  alternates: {
    canonical: `${siteConfig.url}/services`,
    languages: {
      "en-GB": `${siteConfig.url}/services`,
      "x-default": `${siteConfig.url}/services`,
    },
  },
  openGraph: {
    title: "Specialist Dental Accountants UK | Dental Finance Partners",
    description:
      "Specialist accountants for UK dental practices, principals, associates and locum dentists. NHS contracts, profit extraction, practice valuation. Fixed fees.",
    url: `${siteConfig.url}/services`,
    type: "website",
  },
};

const services = [
  {
    eyebrow: "Compliance",
    title: "Dental practice accounting",
    description:
      "Monthly management accounts that separate NHS UDA value, private fee income and capitation plan income, so you see where the profit really comes from. Year-end statutory accounts and corporation tax filed on time, every time.",
    features: [
      "Monthly P&L split NHS / private / plan",
      "Associate cost and lab fee analysis",
      "Cash flow forecast and seasonal modelling",
      "Year-end accounts + corporation tax return",
    ],
    href: "/services/practice-accounting",
  },
  {
    eyebrow: "Tax",
    title: "Tax planning for dentists",
    description:
      "Proactive planning across the tax year, not just at year end. We model salary and dividend extraction, NHS Pension interaction, employer pension contributions, and timing decisions for principals, partners and associates working through limited companies.",
    features: [
      "Salary and dividend optimisation 2025/26 rates",
      "Employer pension contributions for principals",
      "Capital allowances on dental equipment",
      "Year-end profit extraction modelling",
    ],
    href: "/blog/practice-finance",
  },
  {
    eyebrow: "Structure",
    title: "Incorporation and partnership structure",
    description:
      "Sole trader, expense-share partnership, full LLP, limited company, holding-company structure. Each shape has different NHS Pension consequences, different goodwill treatment and different exit economics. We model the trade-offs in your specific numbers.",
    features: [
      "Sole trader vs partnership vs Ltd modelling",
      "Section 162 incorporation relief analysis",
      "NHS Pension impact assessment",
      "Holding company and group structures",
    ],
    href: "/blog/practice-finance",
  },
  {
    eyebrow: "Specialist",
    title: "Associate and locum dentist tax",
    description:
      "Self-employment status review against the post-IR35 tests (control, substitution, mutuality of obligation, financial risk, integration). Allowable expenses checklist for associates. Umbrella vs limited company vs self-employed analysis for locums working across NHS practices.",
    features: [
      "BDA model agreement status check",
      "Allowable expenses claim review",
      "IR35 status for locums in NHS engagements",
      "Indemnity, CPD and mileage treatment",
    ],
    href: "/services/associate-tax",
  },
  {
    eyebrow: "Lifecycle",
    title: "Practice purchase and sale support",
    description:
      "Financial due diligence on the seller&apos;s accounts. EBITDA normalisation. Goodwill valuation against current UK dental market multiples. SDLT and CGT planning. Section 162 relief modelling if you&apos;re incorporating before sale. BADR eligibility check.",
    features: [
      "Buy-side financial due diligence",
      "Sell-side practice valuation",
      "Goodwill methodology and asset split",
      "BADR + Section 162 pre-sale planning",
    ],
    href: "/services/practice-valuation",
  },
  {
    eyebrow: "Operations",
    title: "Payroll, pension and CIS",
    description:
      "Practice payroll for nurses, hygienists, therapists, treatment co-ordinators and trainees. Auto-enrolment workplace pension administration. CIS if you&apos;re engaging subcontracted lab technicians or refurb contractors. P11D returns and benefit-in-kind handling.",
    features: [
      "Monthly PAYE and RTI submissions",
      "Workplace pension auto-enrolment",
      "P11D and benefit-in-kind compliance",
      "CIS returns for subcontractor work",
    ],
    href: "/contact",
  },
];

const included = [
  {
    title: "Dental-only specialists",
    body: "Every client we work with is a dentist, a dental partnership, a corporate group or a locum. We do not split focus across other sectors. That depth shows in the questions we ask and the decisions we model.",
  },
  {
    title: "Response within 24 hours",
    body: "Email or call us with a question. We respond inside 24 hours, usually the same working day. You should not be waiting a week for an answer when a deadline is moving towards you.",
  },
  {
    title: "Fixed fees, no surprises",
    body: "You know exactly what you are paying before you sign. No hourly billing, no scope creep. If your practice grows and the work grows, we tell you before any additional fee applies.",
  },
  {
    title: "Proactive, not just compliance",
    body: "We do not wait to be asked. If your salary and dividend split is leaking tax, if your goodwill amortisation election was missed, if your NHS Pension annual allowance is heading toward a charge, we flag it before you ask.",
  },
  {
    title: "NHS Pension scheme awareness",
    body: "Decisions that look obvious in isolation, incorporating, drawing dividends, employing a spouse, can quietly reduce NHS Pension benefits or trigger annual allowance charges. We factor pension consequences into every structural decision.",
  },
];


const faqs = [
  {
    question: "What does a specialist dental accountant do that a generalist accountant doesn&apos;t?",
    answer:
      "A specialist understands the NHS contract economics (UDA value variance by contract and region), the NHS Pension scheme structure (1995, 2008 and 2015 sections), goodwill amortisation rules for dental goodwill acquired after 1 April 2019, and the IR35 implications of NHS engagement status for locums. A generalist applies UK SME rules without that sector context, which is where most preventable tax leakage happens.",
  },
  {
    question: "How are your fees structured?",
    answer:
      "We work on fixed monthly fees. You agree the scope and price before you sign. If your circumstances change, for example you incorporate, buy a second practice, or take on more associates, we agree any fee change in writing before any extra charge applies. There is no hourly billing and no scope-creep.",
  },
  {
    question: "Do you work with associates as well as practice owners?",
    answer:
      "Yes. Self-employed associates, salaried associates, locums working through limited companies, foundation dentists in their first year, and dental nurses or hygienists running their own businesses. We also work with multi-partner LLPs and corporate dental groups.",
  },
  {
    question: "Can I switch from my current accountant mid-year?",
    answer:
      "Yes. We handle professional clearance with your existing accountant, pull across your records, and pick up from where they finished. The handover typically takes two weeks. We do this regularly and it is no disruption to your filing position.",
  },
  {
    question: "Do you advise on NHS Pension scheme issues?",
    answer:
      "We model the financial impact of pension decisions: annual allowance charges, the tapered allowance interaction with high earnings, McCloud remedy choices for members with 1995 or 2008 section legacy benefits, the dental retainer vs full membership question. For specific pension advice on accessing benefits or making transfer decisions we work alongside an FCA-authorised IFA.",
  },
];

export default function ServicesPage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Services" },
  ];
  const serviceSchema = buildService({
    name: "Specialist Dental Accountancy Services",
    description:
      "Accounting, tax, payroll and advisory services for UK dental practices, principals, associates, locum dentists and dental groups. NHS contract reporting, profit extraction, practice purchase and sale support.",
    path: "/services",
    serviceType: "Dental Accountancy",
    category: "Specialist Accounting Services",
  });
  const breadcrumbSchema = JSON.parse(buildBreadcrumbJsonLd(breadcrumbItems));
  const faqSchema = buildFaqPage(faqs);
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
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--gold)]">
              Specialist dental accountancy
            </p>
            <h1 className="mt-3 font-serif text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
              Accountants who actually understand dental practices
            </h1>
            <p className="mt-5 text-base leading-relaxed text-white/85 sm:text-lg">
              We work only with UK dentists. Principals, partners, associates, locums and corporate dental groups. From NHS contract reporting through profit extraction to practice purchase and sale.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className={btnPrimary}>
                Book a free scoping call
              </Link>
              <Link
                href="/free-practice-health-check"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/30 bg-white/5 px-6 py-3 text-sm font-semibold tracking-tight text-white backdrop-blur-sm transition-all duration-200 hover:border-white/60 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold)]"
              >
                Take the practice health check
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <div className={`${siteContainerLg} py-8`}>
        <StatsBar stats={siteStats} />
      </div>

      {/* Service tiers */}
      <section className="bg-[var(--surface)] border-b border-[var(--border)]">
        <div className={`${siteContainerLg} ${sectionY}`}>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-2xl font-semibold text-[var(--ink)] sm:text-3xl">
              Three service tiers
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--ink-soft)] sm:text-lg">
              Start with compliance essentials, add monthly management accounts as you grow, move to specialist advisory as you scale or plan an exit. You can move tier at any month-end.
            </p>
          </div>
          <div className="mt-12">
            <ServiceTiers tiers={serviceTiers} featuredBadge="Most popular" />
          </div>
        </div>
      </section>

      {/* Service detail */}
      <section className="bg-[var(--background)]">
        <div className={`${siteContainerLg} ${sectionY}`}>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-2xl font-semibold text-[var(--ink)] sm:text-3xl">
              What we actually do for dentists
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--ink-soft)] sm:text-lg">
              These are the six areas of work that come up across our book of dental clients. Click any heading to read the deep-dive page for that service.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {services.map((service) => (
              <article
                key={service.title}
                className="flex flex-col rounded-2xl border border-[var(--border)] bg-white p-7 transition-shadow hover:shadow-md"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--gold-strong)]">
                  {service.eyebrow}
                </p>
                <h3 className="mt-2 font-serif text-xl font-semibold text-[var(--ink)]">
                  <Link
                    href={service.href}
                    className={`hover:text-[var(--accent-strong)] transition-colors ${focusRing} rounded`}
                  >
                    {service.title}
                  </Link>
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)]">
                  {service.description}
                </p>
                <ul className="mt-6 space-y-2.5">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-[var(--ink-soft)]">
                      <span className="mt-0.5 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[var(--gold-soft)] text-[11px] font-bold text-[var(--gold-strong)]">
                        ✓
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 pt-5 border-t border-[var(--border)]">
                  <Link
                    href={service.href}
                    className={`inline-flex items-center gap-1 text-sm font-semibold text-[var(--gold-strong)] hover:text-[var(--gold)] ${focusRing} rounded`}
                  >
                    Read more
                    <span aria-hidden>→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="bg-white border-y border-[var(--border)]">
        <div className={`${siteContainerLg} ${sectionY}`}>
          <div className="mx-auto max-w-3xl">
            <h2 className="font-serif text-2xl font-semibold text-[var(--ink)] sm:text-3xl">
              What is included with every engagement
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--ink-soft)] sm:text-lg">
              The things that should be baseline at any specialist firm. Plenty are not.
            </p>
            <div className="mt-10 space-y-6">
              {included.map((item) => (
                <div
                  key={item.title}
                  className="flex gap-5 rounded-xl border-l-4 border-[var(--gold)] bg-[var(--gold-soft)] p-6"
                >
                  <div className="flex-shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--gold)] text-[var(--navy)] font-bold">
                      ✓
                    </div>
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-[var(--ink)]">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)] sm:text-base">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[var(--background)]">
        <div className={`${siteContainerLg} ${sectionY}`}>
          <div className="mx-auto max-w-3xl">
            <h2 className="font-serif text-2xl font-semibold text-[var(--ink)] sm:text-3xl">
              Frequently asked
            </h2>
            <dl className="mt-10 space-y-6">
              {faqs.map((faq) => (
                <div key={faq.question} className="rounded-2xl border border-[var(--border)] bg-white p-6 sm:p-7">
                  <dt
                    className="font-serif text-lg font-semibold text-[var(--ink)]"
                    dangerouslySetInnerHTML={{ __html: faq.question }}
                  />
                  <dd
                    className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)] sm:text-base"
                    dangerouslySetInnerHTML={{ __html: faq.answer }}
                  />
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--navy)] text-white">
        <div className={`${siteContainerLg} ${sectionYLoose}`}>
          <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-2 lg:gap-16 items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--gold)]">
                Free scoping call
              </p>
              <h2 className="mt-3 font-serif text-2xl font-semibold leading-tight text-white sm:text-3xl lg:text-4xl">
                30 minutes, free, no obligation
              </h2>
              <p className="mt-5 text-base leading-relaxed text-white/85 sm:text-lg">
                We will review your practice structure, NHS contract position and current accountant set-up, then give you clear recommendations. If we are not the right fit, we will tell you and suggest who is.
              </p>
              <ul className="mt-8 space-y-3 text-sm text-white/85">
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[var(--gold)] text-[11px] font-bold text-[var(--navy)]">
                    ✓
                  </span>
                  <span>Reviewed by a dentist-only specialist, not a generalist</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[var(--gold)] text-[11px] font-bold text-[var(--navy)]">
                    ✓
                  </span>
                  <span>Written summary of recommendations after the call</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[var(--gold)] text-[11px] font-bold text-[var(--navy)]">
                    ✓
                  </span>
                  <span>Response within 24 hours of your enquiry</span>
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border-t-4 border-[var(--gold)] bg-white p-6 shadow-xl sm:p-8 lg:p-10">
              <h3 className="font-serif text-xl font-semibold text-[var(--ink)]">Book your free call</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">We will be in touch within 24 hours.</p>
              <div className="mt-6">
                <LeadForm redirectOnSuccess={false} submitLabel="Book a free call" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
