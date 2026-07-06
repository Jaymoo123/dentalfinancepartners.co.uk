/**
 * FAQ set for the Agency Founder Finance SpecialistWidget.
 *
 * 12 Q&As: 3 GENERIC (shown when no topic) + 9 BY_TOPIC (3 per tier).
 * Every answer is short, accurate, HP-traced with tax-year tags, and points
 * to the matching calculator. No em-dashes. No "DJH" mention.
 * No chartered/qualified/ICAEW claim. The firm does not claim named qualifications.
 *
 * HP references (agency niche):
 *   pay-planning: salary/dividend mix, employer NIC, Employment Allowance
 *   exit:         BADR CGT rates, lifetime limit, earn-out timing
 *   compliance-vat: FRS limited cost trader, input VAT comparison
 *   structure:    incorporation triggers, s.455 loan account
 *   rnd:          qualifying R&D activities, SME vs RDEC
 *   international: UAE/overseas relocation tax implications
 */
import type { TopicKey } from "@/lib/intent/taxonomy";

export type Faq = { q: string; a: string };

/** Generic Q&As shown when no topic is known. */
export const GENERIC: Faq[] = [
  {
    q: "How quickly will a specialist reply?",
    a: "Within one working day, and usually sooner. Leave your email and a one-line question and a specialist agency accountant will come back to you personally.",
  },
  {
    q: "Is the first conversation free?",
    a: "Yes. The first call to understand your situation and point you in the right direction is free, with no obligation.",
  },
  {
    q: "What should I have ready?",
    a: "Roughly: your agency structure (sole trader, partnership or limited company), your approximate annual fee income, and the main question you are trying to answer. If you are not sure, we will guide you.",
  },
];

/** Topic-specific Q&As. */
export const BY_TOPIC: Partial<Record<TopicKey, Faq[]>> = {
  "pay-planning": [
    {
      q: "What is the most tax-efficient salary for a director in 2026/27?",
      a: "For a single-director company with no Employment Allowance, £12,570 is typically optimal: you stay below the employee NIC primary threshold, get a State Pension qualifying year, and the salary reduces the company's taxable profit. If your company qualifies for Employment Allowance (requires at least one additional employee), a higher salary of up to around £60,000 is usually better.",
    },
    {
      q: "What dividend rates apply in 2026/27?",
      a: "Under the Finance Act 2026, the rates from 6 April 2026 are 10.75 per cent (basic rate), 35.75 per cent (higher rate) and 39.35 per cent (additional rate). The dividend allowance stays at £500. If you are still using 8.75 per cent or 33.75 per cent in your model, update your figures.",
    },
    {
      q: "Does employer NIC at 15 per cent change the optimal salary?",
      a: "Yes. Employer NIC is now 15 per cent above the secondary threshold of £5,000 (from 6 April 2025). For a single-director company, a salary at £12,570 still makes sense because the employer NIC cost (roughly £1,136) is offset by the corporation tax saving on the deductible salary. The salary and dividend planner calculates the net effect automatically.",
    },
  ],
  exit: [
    {
      q: "What CGT rate applies to an agency share sale in 2026/27?",
      a: "Without Business Asset Disposal Relief, the standard CGT rate for higher-rate taxpayers on business assets is 24 per cent. With BADR, the rate is 18 per cent for 2026/27 disposals (up from 14 per cent in 2025/26; the historic 10 per cent rate applied to disposals up to 5 April 2025). The lifetime BADR limit remains £1,000,000.",
    },
    {
      q: "Do I qualify for BADR on my agency sale?",
      a: "The main conditions are: you must be an officer or employee of the company, hold at least 5 per cent of ordinary shares and voting rights, and have done so throughout the 24 months ending on the disposal date. Most founder-directors of digital agencies qualify, but it is worth confirming your shareholding structure and any share option exercises before proceeding.",
    },
    {
      q: "If my sale includes an earn-out, how does the CGT work?",
      a: "Earn-outs are complex. The initial payment and the earn-out may be treated as separate disposals in different tax years. The BADR rate is typically assessed on the initial disposal date, but earn-out payments received in later years are taxed in those years at prevailing rates. This makes the CGT position on a sale with significant deferred consideration different from a clean upfront exit.",
    },
  ],
  "compliance-vat": [
    {
      q: "Should my agency use the VAT Flat Rate Scheme?",
      a: "It depends on your goods spend. Most digital agencies qualify as limited cost traders because their expenditure on goods is below 2 per cent of gross turnover or below £1,000 per year. The limited cost trader flat rate is 16.5 per cent, which typically produces a higher VAT payment than standard accounting. If your goods spend is high enough to avoid the limited cost trader test, the standard 12.5 per cent sector rate may save money.",
    },
    {
      q: "What counts as 'goods' for the limited cost trader test?",
      a: "Broadly, physical goods used exclusively for the business: office supplies, physical media, small equipment. Software subscriptions and digital services do not count as goods for this test. Most agency inputs (SaaS, professional fees, subcontractors) are services, which is why most agencies fail the goods test and face the 16.5 per cent LCT rate on the Flat Rate Scheme.",
    },
    {
      q: "What input VAT can my agency reclaim under standard VAT?",
      a: "Under standard accounting, you can reclaim VAT on business costs with a VAT invoice: software subscriptions with a UK VAT registration, professional fees, office rent, equipment and similar. You cannot reclaim input VAT on exempt supplies or private use portions. The VAT scheme comparator tool takes your estimated annual input VAT figure to compare the two schemes.",
    },
  ],
  structure: [
    {
      q: "At what profit level should I incorporate my agency?",
      a: "There is no single threshold, but the corporation tax advantage starts to become meaningful at profits above around £50,000 to £60,000 per year. Below that, the administrative costs of running a limited company (accountancy, annual filing, Companies House fees) can outweigh the tax saving. The take-home pay calculator models both structures side by side.",
    },
    {
      q: "What is the section 455 charge on an overdrawn director's loan?",
      a: "A close company loan that is still overdrawn nine months and one day after the accounting year end triggers a section 455 charge on the company at 35.75 per cent (for loans made from 6 April 2026). The charge is repayable once the loan is repaid, but the relief is deferred. A loan exceeding £10,000 is also a benefit in kind, with income tax and NIC implications for the director.",
    },
    {
      q: "Can I pay myself a pension contribution through my agency?",
      a: "Yes, employer pension contributions from your company to an approved pension scheme are generally deductible for corporation tax and are not subject to employer NIC. This makes pension funding through the company more efficient than paying additional salary. The contribution counts toward your annual allowance (currently £60,000 per year, or lower if you have a high adjusted income).",
    },
  ],
  rnd: [
    {
      q: "Can a digital agency claim R&D tax credits?",
      a: "Many can, but the qualifying test is specific: the work must seek to achieve an advance in science or technology, not just improve a business process. Custom software development that solves a technical problem that was not already solved by available tools may qualify. Standard web design, digital marketing and content work typically does not.",
    },
    {
      q: "What changed with R&D tax credits from April 2024?",
      a: "Most companies now use the merged Research and Development Expenditure Credit (RDEC) scheme from accounting periods beginning on or after 1 April 2024. The main RDEC rate is 20 per cent on qualifying expenditure. Loss-making companies can use the enhanced R&D intensive support (ERIS) scheme if at least 30 per cent of their total costs are qualifying R&D expenditure.",
    },
    {
      q: "What expenditure qualifies for R&D relief in an agency?",
      a: "Broadly: staff costs (salaries, employer NIC, pension) for employees directly engaged in qualifying R&D; software licences used for the qualifying project; externally provided workers (EPW), generally restricted to 65 per cent; and consumable items. Contractor and EPW treatment changed under the merged scheme for accounting periods beginning on or after 1 April 2024, so check which rules your period falls under. Subcontracted R&D to connected parties is treated differently from third-party subcontracting. Pure project management, commercial testing and routine software maintenance do not qualify.",
    },
  ],
  international: [
    {
      q: "If I move abroad and my agency stays UK-registered, do I still pay UK tax?",
      a: "Broadly, a UK-resident company pays UK corporation tax on its worldwide profits regardless of where the directors are. If you become non-UK tax resident but your company remains UK-resident, you would pay UK corporation tax as a company shareholder when dividends are paid, and you may owe tax in your new country on those dividends. The position depends heavily on the tax treaty between the UK and your destination.",
    },
    {
      q: "What is the UAE tax position for a digital agency founder?",
      a: "The UAE introduced a federal corporate tax of 9 per cent from June 2023 (on profits above AED 375,000). Individuals in employment or operating as sole proprietors generally fall outside it unless their income exceeds the free zone qualifying thresholds. The specific structure matters significantly: a UAE branch, a free zone entity and a mainland company are treated differently. UK tax treaty implications also depend on your UK residency status. These UAE figures are indicative only: take UAE specialist advice before relying on them.",
    },
    {
      q: "Do I lose UK CGT exemptions on my agency if I move abroad?",
      a: "Departing the UK does not crystallise a CGT disposal, but if you sell your agency within the temporary non-residence rules (broadly, returning to the UK within five years), any gains made while non-resident on assets held before departure are brought back into UK CGT on your return. BADR qualification is based on the position at the time of disposal. Specific advice before a relocation followed by a planned exit is strongly recommended.",
    },
  ],
};

/** Returns topic-specific Q&As, or GENERIC when none are defined. */
export function faqForTopic(topic: TopicKey | null | undefined): Faq[] {
  if (!topic) return GENERIC;
  return BY_TOPIC[topic] ?? GENERIC;
}
