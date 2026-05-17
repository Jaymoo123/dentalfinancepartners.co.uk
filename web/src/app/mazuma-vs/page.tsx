import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { ComparisonLayout, type Comparison } from "@/components/comparison/ComparisonLayout";

export const metadata: Metadata = {
  title: "Mazuma Accountants vs Agency Founder Finance | Honest Comparison",
  description:
    "Considering Mazuma for your UK agency? Here's an honest, even-handed comparison versus a specialist agency accountant. When each is the right choice.",
  alternates: { canonical: `${siteConfig.url}/mazuma-vs` },
};

const data: Comparison = {
  slug: "mazuma-vs",
  competitorName: "Mazuma",
  pageTitle: "Mazuma vs Agency Founder Finance",
  intro: "If you're weighing Mazuma against a specialist agency accountant, this is the honest comparison. Both have a place. The right answer depends on what stage your agency is at and how much specialist advice you actually need.",
  honestyParagraph: "Mazuma is a well-known online accountancy service serving thousands of UK small businesses. They do compliance work cheaply, reliably, and at scale. We are a specialist firm working exclusively with UK and UAE agency founders. The comparison is fair only at the level of what each does best, they are not really the same product.",
  comparisonTable: [
    { feature: "Pricing model", competitor: "From ~£25/mo fixed", us: "Fixed fee £1,200-£8,000/year depending on complexity" },
    { feature: "Annual accounts + CT600", competitor: true, us: true },
    { feature: "Personal self-assessment", competitor: true, us: true },
    { feature: "Bookkeeping handled for you", competitor: true, us: "Optional add-on" },
    { feature: "Agency-only focus", competitor: false, us: true },
    { feature: "Monthly management accounts", competitor: false, us: true },
    { feature: "R&D tax credit claim preparation", competitor: false, us: true },
    { feature: "IR35 status determination support", competitor: false, us: true },
    { feature: "Salary & dividend modelling for shareholders", competitor: "Generic", us: "Per-shareholder, annual" },
    { feature: "Exit planning + BADR support", competitor: false, us: true },
    { feature: "Direct accountant relationship", competitor: "Shared support team", us: "Same named ICAEW accountant every time" },
    { feature: "24-hour response time", competitor: "Standard SLA", us: true },
    { feature: "ICAEW qualified accountants", competitor: "Mixed (some ICB / AAT)", us: true },
  ],
  whoIsRightFor: {
    competitor: {
      audience: "Founders prioritising low monthly cost over specialist depth.",
      whenToChoose: [
        "You're pre-revenue or in your first 3 months trading",
        "You only need basic compliance: accounts + CT600 + self-assessment",
        "Your business model is simple (no R&D, no contractors, no exit plans)",
        "You don't need strategic financial advice",
        "Annual revenue under £150k with low complexity",
      ],
    },
    us: {
      audience: "Agency founders past first-year compliance who need advice that pays back the fee multiple times over.",
      whenToChoose: [
        "Annual revenue above £150k or growing fast",
        "You engage freelancers (IR35 exposure)",
        "You build custom tech (R&D credit eligibility)",
        "You have co-founders or family shareholders",
        "You're thinking about a holding company, MBO or exit",
        "You want one named ICAEW accountant who knows your agency",
      ],
    },
  },
  faqs: [
    {
      q: "Will I really save more than the fee difference?",
      a: "Our typical client saves £10k-£50k per year through specialist advice that wouldn't have come from a generalist online service. R&D credits alone (which most agencies are entitled to and most generalists don't pursue) often cover the fee gap several times over. If you're not doing any specialist activity, the fee difference may not pay back. We'll tell you honestly in the free health check.",
    },
    {
      q: "Can I switch back to a cheaper service later?",
      a: "Yes. Switching accountants in either direction is straightforward, your data lives in Xero/QuickBooks/FreeAgent, not with your accountant. We provide full handover support if you decide to switch to a cheaper service later (or to a different specialist). We won't lock you in.",
    },
    {
      q: "How do you keep fees competitive vs Mazuma?",
      a: "We can't compete on price for pure compliance work, Mazuma's volume model is genuinely efficient. We compete on specialist value: R&D claims, IR35 work, multi-shareholder extraction, exit planning. For agency founders past the early stage, the specialist value is several multiples of the fee differential.",
    },
    {
      q: "Do you do basic bookkeeping?",
      a: "Yes, as an optional add-on. Most of our growth-stage clients have an in-house bookkeeper or use a separate bookkeeper. We can handle bookkeeping ourselves if it's simpler for you, with the fee adjusted accordingly.",
    },
  ],
};

export default function MazumaVsPage() {
  return <ComparisonLayout data={data} />;
}
