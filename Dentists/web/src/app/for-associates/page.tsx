import type { Metadata } from "next";
import { AudienceStageLayout, type AudienceStage } from "@/components/audience/AudienceStageLayout";
import { siteConfig } from "@/config/site";

const data: AudienceStage = {
  slug: "for-associates",
  title: "Accountants for Associate Dentists UK",
  metaTitle: "Accountants for Associate Dentists UK | Tax, Expenses, IR35",
  metaDescription:
    "Specialist accountants for UK dental associates. Self-employment status, expense claims, NHS Pension AVCs, IR35 risk, indemnity treatment.",
  eyebrow: "For associates",
  badge: "Self-employed associates · Ltd-company locums · NHS + private",
  heroHeading: "Accountants who get associate dentist tax right",
  intro:
    "Most generalist accountants treat associate dentists like any other self-employed professional. They miss the BDA model agreement IR35 risk, under-claim indemnity and CPD, ignore the NHS Pension annual allowance, and produce returns that work but leak. We are dental-only. The questions we ask are different.",
  stats: [
    { value: "55p", label: "AMAP rate, first 10,000 miles" },
    { value: "5", label: "IR35 status factors we test" },
    { value: "£60k", label: "Pension annual allowance" },
    { value: "£50k", label: "MTD sign-up threshold, Apr 2026" },
  ],
  concerns: [
    {
      title: "Am I really self-employed?",
      body: "The BDA model contract on file does not automatically mean self-employed status. HMRC and the tribunals test the actual working arrangement against control, substitution, mutuality of obligation, financial risk and integration. We review the reality, not just the paperwork.",
    },
    {
      title: "What expenses can I actually claim?",
      body: "Indemnity, GDC retention, CPD, professional subscriptions, loupes, motor between practices, phone, accountancy. The frequent misses are inter-practice mileage, which runs at 55p a mile for the first 10,000 miles from 6 April 2026, and an annual indemnity premium that never made it onto the return. The last filed return and the current year both get reviewed.",
    },
    {
      title: "Should I be incorporating?",
      body: "Usually no, unless your locum or associate income is sustainably above roughly £80,000-£100,000 AND most engagements sit outside IR35 AND you have tax-planning flexibility (non-working spouse, deferred income horizon). Below those, the Ltd company route adds admin without much real upside.",
    },
    {
      title: "What about the NHS Pension Scheme?",
      body: "Still one of the most valuable schemes in the UK. But high-earning associates can hit the tapered annual allowance and trigger a charge. We model pensionable pay against the threshold and flag where Scheme Pays may make sense.",
    },
    {
      title: "How do I handle multiple practice engagements?",
      body: "Different practices may classify the same locum work differently for IR35. Travel between practices is deductible (not home-to-first-practice). Apportioning materials and motor by practice matters for an accurate return. We map it out per engagement.",
    },
    {
      title: "I'm worried about HMRC challenges",
      body: "HMRC scrutinises three things on dental associate returns: status, expenses, and undeclared private income. We structure your records so each is defensible, and we represent you if HMRC opens an enquiry.",
    },
  ],
  services: [
    {
      title: "Annual self-assessment and tax return",
      body: "All associate income (NHS and private), expense claims, NHS Pension contributions, student loan plan, payment on account positions. Filed inside the deadline, never in January.",
    },
    {
      title: "Status review against the IR35 tests",
      body: "We look at how the work actually runs, not what the contract says. Where status risk exists we tell you and structure to reduce it. If a practice issues an inside-IR35 SDS we walk you through the implications.",
    },
    {
      title: "Expense claim review for past three years",
      body: "An under-claimed return can be amended, and the window reaches back further than most associates expect. The last three filed years are reviewed, amendments go in where the under-claim is material, and the rest is left alone rather than dressed up.",
    },
    {
      title: "Mortgage-ready accounts",
      body: "Lenders want SA302s and the matching HMRC tax year overviews, usually for the two most recent complete tax years, and they read the trend as much as the total. Steady or rising associate income supports the application; a dip needs explaining. Some specialist lenders will work from a single year.",
    },
    {
      title: "Annual planning conversation",
      body: "60-minute call every March covering expense optimisation, NHS Pension headroom, whether incorporation makes sense yet, and the upcoming tax year payments-on-account schedule.",
    },
  ],
  faqs: [
    {
      q: "I'm an associate earning around £75,000. Should I incorporate?",
      a: "Usually not at that level. The administrative cost of running a limited company (formation, separate filings, corporation tax return, PSC payroll, dividend administration) typically outweighs the tax saving below roughly £80,000-£100,000 of sustained associate income. The IR35 reforms have removed much of the historical advantage where engagements are determined inside IR35. We model your specific numbers before recommending the structure.",
    },
    {
      q: "Can I claim my GDC retention fee as an expense?",
      a: "Yes. The GDC annual retention fee is a fully allowable trade expense for self-employed dental associates. Specialist register fees, BDA membership and indemnity premiums (Dental Protection, MDU, MDDUS) are also fully deductible. These should be appearing on every associate return; if they are not, you have probably been under-claiming.",
    },
    {
      q: "What's the difference between Class 2 and Class 4 NI for associates?",
      a: "Class 2 NI was abolished for 2024/25 and later years. Self-employed dental associates now pay Class 4 NI at 6% on profits between £12,570 and £50,270, and 2% on profits above that. There is no separate weekly Class 2 charge any more. You still need to ensure your NI record is maintained for state pension entitlement, which Class 4 NI does automatically when you file your self-assessment.",
    },
    {
      q: "If I'm on the NHS Pension Scheme, can I also have a private pension?",
      a: "Yes. The annual allowance (£60,000 for 2025/26, tapered down to £10,000 at very high adjusted income) is the cap across all your pension arrangements combined, including the NHS Pension Scheme growth and any private pension contributions. We model the total pension input value against your annual allowance and flag where Scheme Pays may apply.",
    },
    {
      q: "How does switching accountant work?",
      a: "We handle professional clearance with your existing accountant. They release your records to us; we pick up from the current position. The handover typically takes two weeks and is no disruption to your filing. You can switch mid-tax-year without any practical complications. We do this every month.",
    },
  ],
  ctaTitle: "Get your associate return done properly",
  ctaBody:
    "30-minute scoping call, free. We look at your current set-up, flag the expenses you're missing, and tell you honestly whether incorporation is on the table yet.",
  relatedGuides: [
    {
      href: "/dental-guides/associate-tax-survival-guide",
      title: "Associate Tax Survival Guide",
      body: "Status, expenses, NHS Pension, IR35 risk. The full picture for self-employed dental associates.",
    },
    {
      href: "/dental-guides/nhs-pension-scheme-essentials-for-dentists",
      title: "NHS Pension Scheme Essentials",
      body: "1995 / 2008 / 2015 sections, McCloud remedy, dental retainer status, annual allowance.",
    },
    {
      href: "/services/associate-tax",
      title: "Associate Tax Service",
      body: "How we structure annual returns and ongoing tax planning for dental associates.",
    },
  ],
};

export const metadata: Metadata = {
  title: data.metaTitle,
  description: data.metaDescription,
  alternates: {
    canonical: `${siteConfig.url}/for-associates`,
    languages: {
      "en-GB": `${siteConfig.url}/for-associates`,
      "x-default": `${siteConfig.url}/for-associates`,
    },
  },
  openGraph: {
    title: data.metaTitle,
    description: data.metaDescription,
    url: `${siteConfig.url}/for-associates`,
    type: "website",
  },
};

export default function ForAssociatesPage() {
  return <AudienceStageLayout data={data} />;
}
