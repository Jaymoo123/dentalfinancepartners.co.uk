/**
 * Welcome series content. Five emails spaced over ~14 days after double opt-in.
 *
 * Tone: editorial peer-to-peer, plain-text-feel, one CTA each.
 * Cadence (days after confirm): 0, 2, 5, 9, 14.
 */

export type WelcomeStep = {
  step: number;
  delayHours: number; // hours after confirm before sending
  subject: string;
  preview: string;
  greeting: string;
  paragraphs: string[];
  ctaLabel: string;
  ctaUrl: string;
  sign: string;
};

const BASE = "https://www.agencyfounderfinance.co.uk";

export const WELCOME_SERIES: WelcomeStep[] = [
  {
    step: 1,
    delayHours: 0,
    subject: "You're in — what to expect from the Tax Brief",
    preview: "Quick orientation, one calculator to try, one link worth bookmarking.",
    greeting: "Welcome to the Tax Brief.",
    paragraphs: [
      "You'll get one email a week, on a Thursday morning. Plain text, one tax or finance idea worth your time, no banner ads, no upsell.",
      "Two things to do right now:",
      "First, bookmark the 2025/26 UK tax rates page. It's the canonical reference we use internally — corporation tax, dividend tax, BADR, VAT, MTD ITSA dates, R&D rates, everything. Updated when HMRC changes anything.",
      "Second, run the salary–dividend optimiser with your numbers. Most founders pay themselves the wrong way — too much salary or too much dividend — and the difference is usually £2,000–£6,000 a year.",
      "Next email Friday-ish: the one R&D mistake almost every digital agency makes.",
    ],
    ctaLabel: "Open the salary–dividend optimiser",
    ctaUrl: `${BASE}/calculators/salary-dividend-optimiser`,
    sign: "— James, Agency Founder Finance",
  },
  {
    step: 2,
    delayHours: 48,
    subject: "The R&D claim mistake almost every digital agency makes",
    preview: "Build vs research — and why the line moves in 2024/25.",
    greeting: "Quick one on R&D.",
    paragraphs: [
      "Agencies that build software-adjacent things — AI tooling, custom integrations, scraping, automations — often assume the build itself is the R&D. It isn't.",
      "HMRC pays for the resolution of *scientific or technological uncertainty* — the bits where a competent professional in the field couldn't have predicted the outcome. The bespoke build for a client usually isn't that. The new method you had to invent to make it work might be.",
      "The merged R&D scheme (accounting periods on/after 1 April 2024) tightened this further: subcontractor R&D shifts to the customer's claim in many cases, the headline rate dropped, and ERIS only applies to loss-making R&D-intensive SMEs (30%+ of total expenditure on R&D).",
      "If you've claimed before and the numbers feel rough, it's worth a 20-minute conversation. If you've never claimed, the eligibility checklist is below.",
    ],
    ctaLabel: "R&D eligibility checklist",
    ctaUrl: `${BASE}/r-and-d-credits`,
    sign: "— James",
  },
  {
    step: 3,
    delayHours: 120,
    subject: "Pillar guides — pick whichever is most relevant",
    preview: "Nine deep guides, in the order most founders need them.",
    greeting: "If you only read one thing on the site this week.",
    paragraphs: [
      "We have nine pillar guides. Each is the long version of a question agency founders ask all the time. In rough order of who needs them:",
      "If you're just starting: Agency Finance Fundamentals, then Incorporating Your Agency.",
      "If you're paying yourself and not sure if it's right: Paying Yourself as an Agency Founder.",
      "If you're hiring contractors or being one: IR35 for Agencies.",
      "If MTD ITSA is on your radar: Making Tax Digital for Agency Founders.",
      "If you're thinking about international clients, a UAE move, or a digital nomad year: International Agency Operations.",
      "If exit is anywhere on the horizon: Selling Your Agency.",
      "If you're shopping for an accountant: Choosing an Agency Accountant.",
      "If you need the full picture: Agency Tax & Compliance — the complete guide.",
    ],
    ctaLabel: "Browse pillar guides",
    ctaUrl: `${BASE}/fundamentals`,
    sign: "— James",
  },
  {
    step: 4,
    delayHours: 216,
    subject: "If a Dubai move is on your mind",
    preview: "What the relocation actually requires — beyond the LinkedIn version.",
    greeting: "On Dubai.",
    paragraphs: [
      "Every quarter we get a wave of agency founders asking about a UAE move. The LinkedIn version is: 0% personal income tax, golden visa, palm trees. The real version is more nuanced.",
      "You need to actually break UK tax residence (Statutory Residence Test, 16/46/91-day limits depending on your ties). You need to set up a UAE entity that holds up if HMRC ever asks. You need to manage UK client contracts so they don't drag you into UK source income. Most importantly, you need to plan it as a multi-year programme, not a quarter.",
      "Our Dubai relocation page is the most detailed UK→UAE resource we know of for agency founders specifically. If a move is on your one-to-three year horizon, this is where to start.",
      "If a move isn't on your radar but you're curious about the other low-tax routes — Portugal NHR 2.0, Cyprus non-dom, Spain Beckham Law, Singapore, Malta, Italy impatriate, Estonia, Greece, Switzerland — there's a page for each.",
    ],
    ctaLabel: "Dubai relocation for UK agency founders",
    ctaUrl: `${BASE}/dubai-relocation`,
    sign: "— James",
  },
  {
    step: 5,
    delayHours: 336,
    subject: "Free agency finance health check — your slot",
    preview: "60 minutes, your numbers, a written summary. No sales pitch.",
    greeting: "One last thing.",
    paragraphs: [
      "If anything in the last two weeks has made you wonder whether you've got the structure right, the salary/dividend split right, the R&D claim right, or the exit clock running, you can book a free agency finance health check.",
      "It's 60 minutes, on a call, with a qualified accountant on the team. You get a written summary by email afterwards with anything specific we'd recommend. No sales pitch — half the founders we speak to we tell to stay with their current accountant and just change one thing.",
      "The emails will now drop to one a week (Thursday morning) — the regular Tax Brief. You can unsubscribe any time using the link at the bottom of every email.",
    ],
    ctaLabel: "Claim a free health check",
    ctaUrl: `${BASE}/free-health-check`,
    sign: "— James",
  },
];
