import type { Metadata } from "next";
import { AgencyTypeLayout } from "@/components/agency-type/AgencyTypeLayout";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Accountants for Video Production Agencies | ${siteConfig.name}`,
  description: "Specialist accountants for UK video and film production agency founders. Capital allowances on kit, project accounting, talent costs, IR35 for crew. Agency-only focus.",
  alternates: { canonical: `${siteConfig.url}/agencies/video-production-agencies` },
  openGraph: {
    title: "Accountants for Video Production Agencies",
    description: "Specialist tax and accounting for video production agency founders.",
    url: `${siteConfig.url}/agencies/video-production-agencies`,
    type: "website",
  },
};

export default function VideoProductionAgenciesPage() {
  return (
    <AgencyTypeLayout
      slug="video-production-agencies"
      title="Accountants for video production agencies"
      hero="Specialist tax and accounting for UK video and film production agency founders. Capital allowances on kit, project accounting with long shooting schedules, freelance crew with IR35 implications, location and talent costs, we handle the financial reality of production work."
      sections={[
        {
          heading: "Capital allowances on production kit",
          body: (
            <p>
              Cameras, lenses, lighting rigs, audio kit, drones, gimbals, editing workstations, production agencies have significant capital expenditure. Most kit qualifies for the Annual Investment Allowance (£1M per year), meaning the full cost is deductible against profits in the year of purchase. Specialist kit may qualify for additional First Year Allowances. We help video agencies plan kit purchases to maximise tax relief, especially around year-end.
            </p>
          ),
        },
        {
          heading: "Project accounting for long production schedules",
          body: (
            <p>
              A typical commercial shoot spans 4-12 weeks from pre-production through to delivery. Invoicing 50% upfront, 25% on shoot completion and 25% on delivery means revenue must be recognised as work is performed, not as cash is received. Deferred revenue sits on your balance sheet until earned. Getting this right keeps your management accounts honest and your corporation tax bill correct.
            </p>
          ),
        },
        {
          heading: "Freelance crew, IR35 and talent payments",
          body: (
            <p>
              Production agencies engage DPs, sound recordists, editors, gaffers, runners, often booked for short, specific gigs. Most are genuinely self-employed but the engagement structure matters for IR35 purposes if your agency is medium or large. Talent payments to actors and presenters have additional withholding and reporting considerations. We help production agencies handle crew engagements cleanly and stay compliant.
            </p>
          ),
        },
      ]}
      faqs={[
        {
          q: "Can I claim full tax relief on a £30,000 camera purchase?",
          a: "Yes, almost certainly. Most production kit qualifies for the Annual Investment Allowance, which lets you deduct the full cost (up to £1M per year) against profits in the year of purchase. So a £30,000 camera reduces your taxable profit by £30,000 in year 1, saving you roughly £7,500 in corporation tax at the 25% main rate. We help production agencies time kit purchases for maximum tax efficiency.",
        },
        {
          q: "When do I recognise revenue on a 3-month commercial shoot?",
          a: "Revenue is recognised as the work is performed, not as cash arrives. For a 3-month shoot with 50% upfront, 25% on shoot wrap and 25% on delivery, you'd recognise revenue gradually across the project as defined milestones complete. The upfront cash sits as deferred revenue on the balance sheet until earned. We set this up properly for production agencies in Xero or QuickBooks.",
        },
        {
          q: "Do freelance crew count as employees for IR35?",
          a: "Usually no. Most production crew are genuinely self-employed with multiple clients, supplying their own kit, working short-form engagements. But if you engage the same DP or editor full-time for 6+ months on exclusive terms, IR35 risk increases. We help production agencies structure crew contracts to keep status clear.",
        },
      ]}
      relatedTypes={[
        { label: "Creative agencies", href: "/agencies/creative-agencies" },
        { label: "Advertising agencies", href: "/agencies/advertising-agencies" },
        { label: "Branding agencies", href: "/agencies/branding-agencies" },
        { label: "Social media agencies", href: "/agencies/social-media-agencies" },
      ]}
    />
  );
}
