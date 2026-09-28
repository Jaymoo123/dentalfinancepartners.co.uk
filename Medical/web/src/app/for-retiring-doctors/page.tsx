import type { Metadata } from "next";
import { List, TrendingDown, PiggyBank, Building2 } from "lucide-react";
import { siteConfig } from "@/config/site";
import { AudienceStageLayout, type AudienceStage } from "@/components/audience/AudienceStageLayout";

export const metadata: Metadata = {
  title: "NHS Pension Retirement for Doctors | Accountants",
  description:
    "Accountants for doctors approaching retirement: partial retirement, retire and return, annual allowance charges, leaving a practice and private income.",
  alternates: {
    canonical: `${siteConfig.url}/for-retiring-doctors`,
    languages: {
      "en-GB": `${siteConfig.url}/for-retiring-doctors`,
      "x-default": `${siteConfig.url}/for-retiring-doctors`,
    },
  },
  openGraph: {
    title: "NHS Pension Retirement for Doctors | Accountants",
    description:
      "Partial retirement, retire and return, annual allowance charges, capital account settlements and private income for doctors approaching retirement.",
    url: `${siteConfig.url}/for-retiring-doctors`,
    type: "website",
    images: [{ url: `/api/og?title=${encodeURIComponent("NHS Pension Retirement for Doctors | Accountants")}`, width: 1200, height: 630, alt: "NHS Pension Retirement for Doctors | Accountants" }],
  },
};

const data: AudienceStage = {
  slug: "for-retiring-doctors",
  role: "retiring-doctors",
  displayRole: "Doctors Approaching Retirement",
  displayRoleLower: "doctors approaching retirement",
  badge: "Partial retirement · Annual allowance · Capital account",
  heroHeading: "Accountants for doctors approaching retirement",
  intro:
    "Within a few years of drawing your NHS pension the decision stops being a date and becomes a set of trade-offs. Partial retirement lets you take 20% to 100% of your accrued benefits in up to two events and carry on working, provided your pensionable pay or commitment falls by at least 10% for the first 12 months. Retiring fully and returning later is a different route with different paperwork. Anything drawn before your normal pension age carries a permanent actuarial reduction. Around that sit the annual allowance charges your highest-earning years produce, the capital account if you are leaving a partnership, and the private work you intend to keep. The decisions move each other, so your retirement date is what sequences them.",
  // Statutory figures from docs/medical/_wave1/retiring-doctors.json, checked
  // against docs/medical/house_positions.md §2.E, §2.B, §18. "20% to 100%" is
  // a range and "£268,275" and "6 April 2028" are not single counted-up
  // numbers, so all three render verbatim via StatsCounter's `value` (target
  // 0, value carries the figure, label carries the description) rather than
  // through the count-up.
  stats: [
    { target: 0, value: "20% to 100%", label: "Benefits you can draw at partial retirement" },
    { target: 60, prefix: "£", suffix: "k", label: "Pension annual allowance, 2026/27" },
    { target: 0, value: "£268,275", label: "Lump sum allowance on tax-free lump sums" },
    { target: 0, value: "6 April 2028", label: "Minimum pension age rises from 55 to 57" },
  ],
  concerns: [
    {
      icon: List,
      title: "Which route fits: partial retirement or retire and return?",
      body: "Partial retirement has been open to all sections since 1 October 2023. You draw between 20% and 100% of what you have accrued, in up to two events, keep working, and keep accruing in the 2015 section, so long as your pensionable pay or commitment drops by at least 10% for the first year. Retiring and returning means taking your benefits, breaking NHS employment for at least 24 hours, then re-engaging on new terms. <a href=\"/blog/nhs-pension-partial-retirement-doctors-guide\">The partial retirement guide</a> sets out the mechanics.",
    },
    {
      icon: TrendingDown,
      title: "Taking benefits early costs you permanently",
      body: "Minimum pension age is 55 today and rises to 57 for benefits taken on or after 6 April 2028, under Finance Act 2022 s.10. Access at 55 after that date needs an unqualified right under the scheme rules on 4 November 2021. Normal pension age is 60 for 1995 service, 65 for 2008 service and State Pension Age for 2015 service. Anything drawn earlier carries an actuarial reduction on NHSBSA factors, and it does not reverse later.",
    },
    {
      icon: PiggyBank,
      title: "Your biggest annual allowance charges arrive last",
      body: "Growth is measured as the input amount, the capitalised increase in your benefits, not as contributions paid, so a pay uplift or a jump in partnership profits lands as a large figure in one year. The allowance is £60,000 for 2026/27, and it tapers by £1 for each £2 of adjusted income over £260,000 once threshold income also clears £200,000, and the floor is £10,000. Scheme Pays can settle a charge, but that election closes once all your benefits are taken.",
    },
    {
      icon: Building2,
      title: "What actually changes hands when you leave a practice",
      body: "NHS goodwill has been unsellable since 1 April 2004, now under the Primary Medical Services (Prohibition on the Sale of Goodwill) Regulations 2019. A retiring GP partner is paid out on tangible assets, working capital, any owned premises share and the capital account, never on a goodwill multiple. Premises usually sit in a separate property partnership, and the last partner standing can hold the whole liability. <a href=\"/blog/retiring-from-gp-partnership-tax-capital-account\">The capital account and cessation position</a> is where the tax falls.",
    },
  ],
  services: [
    {
      title: "Side by side modelling of the retirement routes",
      body: "Each route is costed on your own figures: full retirement, partial retirement at several drawdown percentages, and retire and return at reduced sessions. The model shows income year by year, the accrual you keep or forgo, and the lump sum against the £268,275 lump sum allowance.",
    },
    {
      title: "Annual allowance position for your final working years",
      body: "Input amounts are gathered for the open years, carry forward from the previous three tax years is calculated, and the taper tested on both threshold and adjusted income. Where a charge arises, the self-assessment entry is prepared and mandatory Scheme Pays checked for availability. The <a href=\"/calculators/nhs-pension-annual-allowance\">annual allowance calculator</a> gives you a first read.",
    },
    {
      title: "Scheme Pays elections filed inside the right window",
      body: "A 2026/27 charge must be elected by 31 July 2028 under Finance Act 2004 s.237BA. Where NHSBSA issues a revised savings statement on or after 2 May, the window runs to the earlier of three months from it or six years from the end of the tax year. It closes early once you are entitled to all your benefits, under s.237B(6), so deadlines are tracked against your retirement date.",
    },
    {
      title: "Cessation and capital account work when you leave a partnership",
      body: "Your final year is reconciled: closing capital account, any overlap or transition profits still open, the premises share and its capital gains treatment, and balancing adjustments on equipment. Type 1 certification runs a year in arrears, so your final certificate falls due the 28 February after that pension year ends. The deed is read against the accounts before the payout is agreed.",
    },
  ],
  faqs: [
    {
      q: "Can I take part of my NHS pension and keep working?",
      a: "Yes. Partial retirement has been available in all sections since 1 October 2023. You can take between 20% and 100% of the benefits you have built up, in up to two events, and carry on working with further accrual in the 2015 section. The condition is that your pensionable pay or commitment falls by at least 10% for the first 12 months, and your employer agrees to that reduction.",
    },
    {
      q: "Will I lose money by drawing benefits before my normal pension age?",
      a: "Benefits taken before normal pension age are reduced permanently, on factors set by NHSBSA and the Government Actuary. Those factors are revised periodically, so the only reliable number is the one on your own statement rather than a percentage quoted elsewhere. Whatever the factor, the reduction then applies for life.",
    },
    {
      q: "Why has my annual allowance charge jumped in my last few years?",
      a: "Defined benefit growth is measured by the increase in the capitalised value of your pension, not by what you paid in, so a pay uplift or a profit jump produces a large input amount in the year it lands. For 2026/27 the allowance is £60,000, cut by £1 for each £2 of adjusted income over £260,000 once threshold income has also passed £200,000, and it stops falling at £10,000. Carry forward from the previous three years is applied first.",
    },
    {
      q: "Should I use Scheme Pays or settle the charge myself?",
      a: "Scheme Pays moves the charge to the scheme in exchange for a permanent benefit reduction, so it is a cash flow choice with a lifetime cost. Mandatory Scheme Pays needs a charge above £2,000 and input above the standard £60,000 allowance in the NHS scheme alone; a charge caused only by the taper is voluntary. A 2026/27 charge must be elected by 31 July 2028. <a href=\"/blog/nhs-pension-scheme-pays-doctors-deadlines\">The Scheme Pays deadlines</a> are set out in full.",
    },
    {
      q: "What do I get paid for my share when I retire from a GP partnership?",
      a: "Your share of tangible assets, working capital and any owned premises, plus whatever the capital account shows, settled on the terms in the deed. NHS goodwill cannot be sold, so no goodwill element arises on the NHS side. Payment is often staged over months or years, and the deed rather than the accounts usually sets the valuation basis.",
    },
    {
      q: "I am keeping my private work. Does any of it count for the NHS pension?",
      a: "No. Private practice, medico-legal work, insurance medicals and occupational health are not NHS-pensionable, and dividends from a company are never pensionable. If you are selling the private practice instead, Business Asset Disposal Relief runs at 18% from 6 April 2026 against a 24% main rate for a higher-rate taxpayer, within a £1m lifetime limit and subject to the two-year conditions.",
    },
  ],
  ctaTitle: "Talk to an accountant about your retirement route",
  ctaBody:
    "A call with a regulated firm from our specialist partner network, covering partial retirement against retire and return, your annual allowance position in your final working years, and any capital account settlement if you are leaving a partnership. Scope and fees are agreed with that firm, and enquiring commits you to nothing.",
  relatedCalculators: [
    {
      href: "/calculators/nhs-pension-annual-allowance",
      name: "NHS Pension Annual Allowance Calculator",
      desc: "Work out your tapered allowance and any charge on your final working years, from your NHSBSA pension savings statement figures.",
    },
  ],
  relatedGuides: [
    {
      href: "/blog/nhs-pension-partial-retirement-doctors-guide",
      title: "NHS Pension Partial Retirement: A Doctor's Guide",
      body: "Drawdown percentages, the 10% pay-reduction condition, and how partial retirement compares with retire and return.",
    },
    {
      href: "/blog/retiring-from-gp-partnership-tax-capital-account",
      title: "Retiring from a GP Partnership: Tax and the Capital Account",
      body: "What is settled on exit, the premises share, and the cessation position on your final return.",
    },
    {
      href: "/blog/nhs-pension-scheme-pays-doctors-deadlines",
      title: "NHS Pension Scheme Pays: The Deadlines",
      body: "Mandatory and voluntary Scheme Pays, the 31 July election window, and when it closes early on retirement.",
    },
  ],
};

export default function ForRetiringDoctorsPage() {
  return <AudienceStageLayout data={data} />;
}
