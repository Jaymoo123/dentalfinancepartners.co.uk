/**
 * Curated, topic-aware FAQ for the Solicitors specialist widget.
 *
 * General + accurate (no personal calculations). Every path ends at
 * "ask a specialist for your firm's numbers". Figures follow the house
 * ground truth (HP §§ as noted). Compliance-aware tone: client money is
 * operational context, never tax; SRA enforcement questions go to the firm's
 * COFA and the SRA, not to us.
 *
 * No em-dashes, no partner name, no chartered/qualified/named-author claim.
 */
import type { TopicKey } from "@/lib/intent/taxonomy";

export type Faq = { q: string; a: string };

export const GENERIC: Faq[] = [
  {
    q: "How quickly will a specialist reply?",
    a: "Within one working day, and usually sooner. Leave your email and a one-line question and a specialist solicitors' accountant will come back to you personally.",
  },
  {
    q: "Is the first conversation free?",
    a: "Yes. The first call to understand your firm and point you in the right direction is free and with no obligation.",
  },
  {
    q: "What should I have ready?",
    a: "Roughly: your firm's structure (sole practitioner, partnership, LLP or incorporated), whether you hold client money, your approximate fee income, and your year end. If you are not sure, we will guide you.",
  },
];

export const BY_TOPIC: Partial<Record<TopicKey, Faq[]>> = {
  "sra-compliance": [
    {
      q: "When does my firm need an accountant's report?",
      a: "If you held or received any client money during the accounting period, the Rule 12.1 trigger applies and you must obtain an accountant's report within six months of the period end. A firm that holds no client money at all does not meet the trigger. This is separate from the small-balance exemption below.",
    },
    {
      q: "Is my firm exempt from the accountant's report?",
      a: "There is a Rule 12.2 exemption for a firm that did hold client money but only small balances: where the client-account balance did not exceed an average of £10,000 AND a maximum of £250,000 in the period. Both limbs must be met. It is not any £250 figure. We can help you check where you fall.",
    },
    {
      q: "How often must I reconcile the client account?",
      a: "At least every five weeks (Rule 8.3), reconciling the client ledger total to the cash book to the bank statement, signed off by the COFA or a manager. Records are kept for at least six years.",
    },
    {
      q: "Can I use the client account to move money for a client?",
      a: "No. Rule 3.3 prohibits using a client account to provide banking facilities: every payment in, transfer or withdrawal must relate to the delivery of regulated services. This is one of the most common breaches. We can help you set up compliant processes, though enforcement questions are for your COFA and the SRA.",
    },
    {
      q: "Do I have to pay clients interest on money I hold?",
      a: "Rule 7 requires you to account for a fair sum of interest on client money held, judged by amount and duration, unless there is a contrary written agreement. It is a fairness test, not a fixed rate.",
    },
  ],
  "sole-practitioner": [
    {
      q: "How am I taxed as a sole practitioner or partner?",
      a: "On your profit share, not your drawings: income tax at 20, 40 or 45 percent bands plus Class 4 National Insurance at 6 percent between £12,570 and £50,270 and 2 percent above (2025/26 basis). Class 2 was removed from April 2024. Our take-home calculator gives you a first view.",
    },
    {
      q: "Should I incorporate my practice?",
      a: "Sometimes, but not automatically. A company pays corporation tax and you extract profit as salary and dividends taxed again, and from April 2026 dividend tax rose to 10.75, 35.75 or 39.35 percent, which narrows the gap. An SRA-regulated firm also cannot incorporate freely: it must be a recognised body or a licensed ABS. It is very firm-specific.",
    },
  ],
  "partnership-llp": [
    {
      q: "Are partners taxed on drawings or profit share?",
      a: "On your allocated profit share, whether or not you have drawn it. Drawings are advances against that share. An LLP is tax-transparent and pays no corporation tax on its trading profit; each member is taxed as a self-employed partner.",
    },
    {
      q: "Could I be caught by the salaried member rules?",
      a: "Possibly. Under the FA 2014 rules a member is treated as an employee for tax if all three conditions are met: at least 80 percent of reward is disguised salary, no significant influence, and a capital contribution below 25 percent of that reward. Failing any one keeps you self-employed. Our FA 2014 test tool walks through it.",
    },
  ],
  "succession-sale": [
    {
      q: "How is the sale of my firm taxed?",
      a: "A partnership or LLP has no shares, so it is sold as a business: goodwill is a capital asset taxed to Capital Gains Tax, while work in progress and debtors are trading income taxed at income-tax rates. Business Asset Disposal Relief can reduce the CGT on qualifying gains to 18 percent from April 2026, within a £1,000,000 lifetime limit; gains above that or outside the relief are taxed at 18 or 24 percent after the £3,000 annual exempt amount.",
    },
    {
      q: "Do I pay tax on my work in progress when I sell?",
      a: "Yes, separately from the goodwill gain. Unbilled work in progress realised on a sale is an income receipt (ITTOIA 2005 ss.182 to 185), not part of the capital gain, so a sale usually mixes income tax and CGT. The sale agreement should split goodwill from WIP and debtors clearly.",
    },
  ],
  "practice-finance": [
    {
      q: "How do I improve my firm's cash flow?",
      a: "The core lever is lock-up: the days your money sits as unbilled work in progress plus debtor days. Billing sooner and collecting faster releases cash without new work. We can review your lock-up and the working-capital picture with you.",
    },
  ],
};

export function faqForTopic(topic: string | null): Faq[] {
  return (topic && BY_TOPIC[topic as TopicKey]) || GENERIC;
}
