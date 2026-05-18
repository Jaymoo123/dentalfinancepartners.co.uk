import type { Metadata } from "next";
import { AudienceStageLayout, type AudienceStage } from "@/components/audience/AudienceStageLayout";
import { siteConfig } from "@/config/site";

const data: AudienceStage = {
  slug: "for-locum-dentists",
  title: "Accountants for Locum Dentists UK",
  metaTitle: "Accountants for Locum Dentists UK | Ltd vs Umbrella vs SE",
  metaDescription:
    "Specialist accountants for UK locum dentists. Ltd company vs umbrella vs self-employed comparison, IR35 on NHS engagements, expenses, NHS Pension.",
  eyebrow: "For locum dentists",
  badge: "Ltd-company locums · Umbrella · Self-employed sole-traders",
  heroHeading: "Get your locum dentist structure right from year one",
  intro:
    "Locum dentists hit a tax structure decision early in working life and live with the consequences for years. Limited company, umbrella, or self-employed sole trader. There is no universally right answer; it depends on your income level, your engagement mix across NHS and private, and the IR35 determinations the practices you work at are issuing.",
  stats: [
    { value: "3", label: "Structures we compare" },
    { value: "£80k+", label: "Typical Ltd-co break-even" },
    { value: "2021", label: "When IR35 rules changed for locums" },
    { value: "Fixed", label: "Monthly fees" },
  ],
  concerns: [
    {
      title: "Should I incorporate or stay self-employed?",
      body: "Below roughly £80,000-£100,000 of sustained locum income, the admin cost of running a limited company rarely beats sole-trader status. Above that, it depends on how many of your engagements sit outside IR35 and your need for tax-planning flexibility (non-working spouse, deferred income).",
    },
    {
      title: "What does 'inside IR35' actually mean for me?",
      body: "Since 6 April 2021, when the engaging practice is a medium or large client, the practice (not your PSC) determines IR35 status. If they issue an inside-IR35 SDS, PAYE-style deductions apply on your fees despite the Ltd-co structure. You receive the net into your company and cannot extract it tax-efficiently.",
    },
    {
      title: "How do I handle the NHS Pension scheme as a locum?",
      body: "Sole-trader locums can access the NHS Pension via the practitioner pensions arrangement. Limited-company locums have more restrictive access. This matters for long-term financial planning and is a real factor in the structural decision.",
    },
    {
      title: "What expenses can I actually claim?",
      body: "Outside IR35: indemnity, GDC retention, CPD, professional subscriptions, motor between practices, instruments, loupes, accountancy. Inside IR35: very limited; deductions essentially restricted to the same items an employee can claim. The structure of your engagements determines what you can claim.",
    },
    {
      title: "What about umbrella companies?",
      body: "An umbrella employs you under contract of employment, runs PAYE on your earnings, deducts tax and NI, pays you the net. Expenses are very restricted. Convenient and low-admin but rarely the most tax-efficient option for a sustained locum income. Suits short-term work and low-volume locuming.",
    },
    {
      title: "I work for multiple practices. What changes?",
      body: "Different practices may issue different IR35 determinations for the same kind of work. Travel between practices is deductible (not home-to-first-practice). Apportioning materials, motor and overhead by engagement matters for accurate tax. We map each engagement against the right structure.",
    },
  ],
  services: [
    {
      title: "Structure comparison: Ltd vs umbrella vs sole-trader",
      body: "We model your specific income mix against all three structures: take-home after tax + NI, administrative cost, NHS Pension access, IR35 implications. The output is a one-page comparison with a recommended structure and reasoning.",
    },
    {
      title: "Annual self-assessment for sole-trader locums",
      body: "All locum income, expense claims, NHS Pension contributions, student loan plan, payment-on-account schedule. Filed inside the deadline. We track expense receipts via a shared bookkeeping system so you are not chasing them in January.",
    },
    {
      title: "Limited company accounting for PSC locums",
      body: "Annual statutory accounts, corporation tax return, personal director self-assessment, PSC payroll for the salary leg, dividend administration, IR35 status tracking per engagement. We handle each component or just the parts you need.",
    },
    {
      title: "IR35 status review per engagement",
      body: "When a practice issues a Status Determination Statement, we review whether it is correctly issued. Most are; some are not. Where the determination is challengeable we draft the appeal. Where it stands, we restructure the income flow to reflect the deduction.",
    },
    {
      title: "Mortgage-ready accounts",
      body: "Lenders want SA302s with consistent income for sole-trader locums or two years of company accounts for Ltd-co locums. We produce both inside 48 hours of request and work with the dental-specialist mortgage advisers who lend on dentist income.",
    },
  ],
  faqs: [
    {
      q: "I'm a newly qualified dentist starting locum work. Should I incorporate from day one?",
      a: "Almost never on day one. Most new-qualified locums earn below the threshold where Ltd-co structure pays back the admin cost. Start as a sole trader, register for self-assessment, file the first return cleanly. Re-look at incorporation after 12-18 months when your sustainable income level is visible. The wrong structure costs more in admin than the right structure saves in tax for the first year.",
    },
    {
      q: "Can I be on the NHS Pension Scheme if I work through a limited company?",
      a: "Access becomes complex. Self-employed sole-trader locums can usually join the NHS Pension via the practitioner pensions arrangement, which is straightforward. Limited-company locums have to navigate the rules around personal service company contracts; the most common workable arrangement is to take a salary from your PSC that runs through NHS Pension contributions, but this only captures the salary portion, not dividend income. Many limited-company locums lose pensionable years they would otherwise have accrued. This is one of the real downsides of incorporating early.",
    },
    {
      q: "If a practice says my engagement is 'inside IR35', what does that mean for my Ltd company?",
      a: "The practice (as fee-payer) will operate PAYE-style deductions on your fees before paying your company. Your company receives the net amount. You cannot extract that net as salary or dividend tax-efficiently because the tax has already been deducted at source. The effect is similar to being a PAYE employee of the practice for that engagement, but with the additional limited-company overhead. You can challenge the SDS if you believe it is wrongly issued, but you cannot ignore it once a fee-payer is operating on it.",
    },
    {
      q: "What's the difference between an umbrella and a recruitment agency?",
      a: "A recruitment agency finds you locum engagements; you can then choose your own structure (Ltd, sole-trader, umbrella) to receive the payment. An umbrella employs you under contract of employment, runs PAYE on your earnings, and pays you the net. Some recruitment agencies have their own umbrella arrangement or refer you to one. They are different things; the agency is the source of work, the umbrella is one way to receive payment.",
    },
    {
      q: "Can I claim my dental school student loan interest?",
      a: "No. Student loan repayments are not an allowable trade expense. They are a separate deduction calculated through self-assessment (Plan 2 or Plan 5 most likely for recent graduates), based on income above the threshold for your plan. The repayment is taken automatically through the assessment; the interest itself is not deductible from your taxable profit.",
    },
  ],
  ctaTitle: "Get your locum structure right",
  ctaBody:
    "30-minute scoping call. We will run the Ltd vs umbrella vs sole-trader comparison on your specific income and engagement mix and tell you which one wins on real numbers.",
  relatedGuides: [
    {
      href: "/services/locum-dentist-tax",
      title: "Locum Dentist Tax Service",
      body: "Ltd vs umbrella vs sole-trader comparison, IR35 management, ongoing tax support.",
    },
    {
      href: "/dental-guides/nhs-pension-scheme-essentials-for-dentists",
      title: "NHS Pension Scheme Essentials",
      body: "1995 / 2008 / 2015 sections, practitioner pensions arrangement for sole-trader locums.",
    },
    {
      href: "/dental-guides/associate-tax-survival-guide",
      title: "Associate Tax Survival Guide",
      body: "Status, expenses, NHS Pension, IR35 risk. Applies to many locum scenarios too.",
    },
  ],
};

export const metadata: Metadata = {
  title: data.metaTitle,
  description: data.metaDescription,
  alternates: {
    canonical: `${siteConfig.url}/for-locum-dentists`,
    languages: {
      "en-GB": `${siteConfig.url}/for-locum-dentists`,
      "x-default": `${siteConfig.url}/for-locum-dentists`,
    },
  },
  openGraph: {
    title: data.metaTitle,
    description: data.metaDescription,
    url: `${siteConfig.url}/for-locum-dentists`,
    type: "website",
  },
};

export default function ForLocumDentistsPage() {
  return <AudienceStageLayout data={data} />;
}
