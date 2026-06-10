/**
 * Curated, topic-aware FAQ for the specialist widget. Deliberately general +
 * accurate (no personal calculations); every path ends at "ask a specialist for
 * your numbers". Figures follow the house ground truth (FA 2026). Keep answers
 * short and honest; when in doubt, point to the matching calculator.
 */
import type { TopicKey } from "@/lib/intent/taxonomy";

export type Faq = { q: string; a: string };

const GENERIC: Faq[] = [
  {
    q: "How quickly will a specialist reply?",
    a: "Within one working day, and usually much sooner. Leave your email and a one-line question and a property tax specialist will come back to you personally.",
  },
  {
    q: "Is the first conversation free?",
    a: "Yes. The initial call to understand your situation and point you in the right direction is free and with no obligation.",
  },
  {
    q: "What should I have ready?",
    a: "Roughly: how many properties you hold, whether they're owned personally or through a company, your approximate rental income, and any mortgages. If you're not sure, we'll guide you.",
  },
];

const BY_TOPIC: Partial<Record<TopicKey, Faq[]>> = {
  "section-24": [
    {
      q: "What is Section 24?",
      a: "Since April 2020 individual landlords can no longer deduct mortgage interest from rental profit. Instead you get a basic-rate (20%) tax credit on the interest, rising to 22% from April 2027. It can push you into higher-rate tax even when your real profit hasn't changed.",
    },
    {
      q: "Does it affect limited companies?",
      a: "No. Companies still deduct mortgage interest in full, which is one reason landlords look at incorporating. Whether that's worthwhile depends on your numbers — the Section 24 and incorporation calculators give you a first view.",
    },
    {
      q: "How do I work out my own exposure?",
      a: "Use the Section 24 calculator for a quick estimate, then send us your figures and we'll confirm the real impact and the options.",
    },
  ],
  incorporation: [
    {
      q: "Should I move my rentals into a company?",
      a: "Sometimes. A company avoids Section 24 and can be more efficient if you retain profit, but transferring property can trigger Capital Gains Tax and Stamp Duty, and a company has its own running costs. It's very situation-specific.",
    },
    {
      q: "What are the upfront costs?",
      a: "Typically CGT on any gain to date and SDLT on the market value transferred, plus setup. The incorporation calculator estimates these and the break-even; we then sanity-check it for your case.",
    },
  ],
  "capital-gains": [
    {
      q: "What CGT will I pay when I sell?",
      a: "Residential property gains are taxed at 18% (basic rate) and 24% (higher rate), after your annual exempt amount (£3,000 for 2024/25). Private Residence Relief can reduce it if the property was once your home.",
    },
    {
      q: "When is CGT due?",
      a: "A UK residential property disposal must be reported and the tax paid within 60 days of completion. The CGT calculator gives an estimate; we'll confirm reliefs that apply to you.",
    },
  ],
  "stamp-duty": [
    {
      q: "Will I pay the surcharge?",
      a: "Buying an additional residential property usually adds a 5% SDLT surcharge on top of standard rates in England and NI. Non-UK residents may pay a further 2%. Scotland (LBTT) and Wales (LTT) have their own rules.",
    },
    {
      q: "Is there first-time-buyer relief?",
      a: "Yes, for eligible first-time buyers up to a price cap. The stamp duty calculator handles the surcharge, relief and the non-resident addition; ask us if your situation is unusual.",
    },
  ],
  mtd: [
    {
      q: "Does Making Tax Digital apply to me?",
      a: "MTD for Income Tax starts in April 2026 for landlords and sole traders with qualifying income over £50,000, with lower thresholds following in later years. It means digital records and quarterly updates.",
    },
    {
      q: "What do I need to do?",
      a: "Keep digital records and file quarterly through compatible software. The MTD checker tells you if and when it applies to you; we can set you up so it's painless.",
    },
  ],
  "landlord-essentials": [
    {
      q: "What can I deduct against rental income?",
      a: "Allowable running costs (letting fees, repairs, insurance, ground rent, etc.) reduce taxable profit. Mortgage interest is treated differently under Section 24. The property allowance can cover very small rental income.",
    },
    {
      q: "Do I need to file a tax return?",
      a: "Usually yes once rental income passes the reporting threshold. We can check whether you need to register for Self Assessment and make sure nothing's missed.",
    },
  ],
};

export function faqForTopic(topic: string | null): Faq[] {
  return (topic && BY_TOPIC[topic as TopicKey]) || GENERIC;
}
