import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { Clock } from "lucide-react";
import {
  btnOnCream,
  btnPrimary,
  focusRing,
  heroCreamSurface,
  siteContainerLg,
} from "@/components/ui/layout-utils";
import { Eyebrow, InlineLink } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { ExampleFigureNote } from "@accounting-network/web-shared/design/primitives/ExampleFigureNote";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import { MedicalBackdrop } from "@/components/layout/MedicalBackdrop";
import { getAllPosts, getAllCategories, slugifyCategory, calculateReadTime } from "@/lib/blog";
import { blogCtaFor } from "@/lib/blog-cta";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteConfig } from "@/config/site";
import { LeadForm } from "@/components/forms/LeadForm";

const CATEGORY_NAME = "NHS Pension Planning";
const CATEGORY_SLUG = "nhs-pension-planning";
const PAGE_TITLE = "NHS Pension Explained: How the Scheme Works for Doctors";
const PAGE_DESCRIPTION =
  "How the NHS pension scheme works for doctors and GPs: the 1995, 2008 and 2015 sections, how contributions and accrual work, what the scheme pays, and when a tax charge arises. An NHS pension scheme guide.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: `${siteConfig.url}/blog/${CATEGORY_SLUG}` },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: `${siteConfig.url}/blog/${CATEGORY_SLUG}`,
    siteName: siteConfig.name,
    type: "website",
    images: [{ url: `/api/og?title=${encodeURIComponent(PAGE_TITLE)}`, width: 1200, height: 630, alt: PAGE_TITLE }],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  },
};

const faqs: { q: string; a: string }[] = [
  {
    q: "How does NHS pension scheme work for a doctor joining today?",
    a: "A doctor joining today builds benefits only in the 2015 section, because every active member moved into it on 1 April 2022. Each year you bank 1/54th of that year's pensionable pay as future annual pension, and the banked amount is uprated while you keep working by the Consumer Prices Index plus 1.5%. Nothing is invested on your behalf and there is no pot with a balance. Your normal pension age is your State Pension age, or 65 if that is later, and the minimum age at which you can draw anything is 55.",
  },
  {
    q: "How does NHS pension work if you move to part time or less than full time?",
    a: "Part-time work reduces the pensionable pay you actually receive, so each year you bank 1/54th of the lower figure and your pension grows more slowly. Your contribution tier is set on your actual pensionable pay, not on the whole-time equivalent salary, which is why dropping sessions can also drop you a tier. Freelance locum work is treated differently again through annualisation, the process of scaling short engagements up to a notional full-year rate to decide which tier applies. Ask for the tier calculation in writing when your sessions change.",
  },
  {
    q: "Is the NHS pension a good deal, or should you opt out?",
    a: "For most doctors it remains the single most valuable part of the package. A further 23.7% of pensionable pay is credited on the member's behalf on top of their own tiered 5.2% to 12.5% for 2026/27, of which the employer bears 14.38% and the remaining 9.4% is funded centrally, and the benefit is a guaranteed inflation-linked income rather than a market return. Opting out to avoid an annual allowance charge is usually the wrong lever, because Scheme Pays can settle the charge without giving up accrual. Opting out is a regulated financial decision and belongs with an authorised adviser, not with a tax calculation alone.",
  },
  {
    q: "What happens to your NHS pension when you die?",
    a: "The scheme pays a death-in-service lump sum and an ongoing survivor pension to a qualifying partner and dependent children, with the amounts set by the section your service sits in. Since 6 April 2024 the relevant tax test is the Lump Sum and Death Benefit Allowance of £1,073,100, which caps the tax-free lump sums payable in life and on death combined. Keeping your nomination form current with NHS Pensions matters more than the tax point, because an out-of-date nomination is the most common cause of the wrong person receiving the lump sum.",
  },
  {
    q: "Can you get a refund of NHS pension contributions if you leave?",
    a: "A refund of contributions is only possible where you have less than two years of qualifying membership and have not transferred other pension rights in, and it is claimed on form RF12 through NHS Pensions. Past two years your benefits stay in the scheme as deferred benefits and are revalued until you take them, which is almost always worth more than a taxed cash refund. Freelance locums face a harder deadline than a refund question: work not submitted on locum form B within 10 weeks of ending cannot be pensioned at all.",
  },
  {
    q: "What is superannuation on your payslip?",
    a: "Superannuation is the NHS payslip word for your own NHS pension scheme contributions, deducted before income tax so that tax relief is given automatically at your marginal rate. The deduction is a tiered percentage of pensionable pay, between 5.2% and 12.5% from 1 April 2026, and it is not the same thing as the amount your pension grew that year. Annual allowance tax is measured on growth in the value of your benefits, so a payslip deduction of a few thousand pounds can sit alongside a pension input amount many times larger.",
  },
];

/** Mirrors `HubSection` in `@accounting-network/web-shared/design/blog/BlogCategoryHub`,
 *  plus a local `figure` slot. Field names are kept identical so this page can be
 *  handed to the kit component unchanged the moment its article list can emit a
 *  FLAT `/blog/<slug>` href (see the header comment on `ArticleLibrary` below). */
type HubSection = {
  heading: string;
  paragraphs: ReactNode[];
  bullets?: ReactNode[];
  trailingParagraphs?: ReactNode[];
  figure?: ReactNode;
};

/** One figure shell for the hub: a caption, then a table or a card set.
 *  ponytail: two shapes in one component, not two components. Every figure is
 *  built from a claim the prose beside it already makes, or from
 *  `docs/medical/house_positions.md` §2 to §2.E; nothing here is new. */
function Figure({
  title,
  headers,
  rows,
  cards,
  note,
}: {
  title: string;
  headers?: string[];
  rows?: string[][];
  cards?: Array<{ title: string; detail: string }>;
  note?: string;
}) {
  return (
    <figure className="mt-6 rounded-xl bg-slate-50 p-5 ring-1 ring-slate-200/70 sm:p-6">
      <figcaption className="text-sm font-bold text-slate-900">{title}</figcaption>
      {headers && rows ? (
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[30rem] border-collapse text-left text-sm">
            <thead>
              <tr>
                {headers.map((h) => (
                  <th key={h} scope="col" className="border-b border-slate-300 pb-2 pr-4 font-bold text-slate-900">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r[0]}>
                  <th scope="row" className="border-b border-slate-200 py-2.5 pr-4 align-top font-semibold text-slate-900">
                    {r[0]}
                  </th>
                  {r.slice(1).map((c, i) => (
                    <td key={i} className="border-b border-slate-200 py-2.5 pr-4 align-top text-slate-600">
                      {c}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
      {cards ? (
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {cards.map((c) => (
            <li key={c.title} className="rounded-xl bg-white p-4 ring-1 ring-slate-200/70">
              <p className="text-sm font-bold text-slate-900">{c.title}</p>
              <p className="mt-1 text-sm leading-6 text-slate-600">{c.detail}</p>
            </li>
          ))}
        </ul>
      ) : null}
      {note ? <ExampleFigureNote className="mt-4" label={note} /> : null}
    </figure>
  );
}

const SECTIONS: HubSection[] = [
  {
    heading: "What is the NHS pension scheme, and how does the NHS pension scheme work?",
    paragraphs: [
      "It is a statutory defined benefit scheme for NHS staff in England and Wales, administered by the NHS Business Services Authority. The 1995 and 2008 sections were made under the Superannuation Act 1972; the 2015 section was made under the Public Service Pensions Act 2013 and its current rules sit in SI 2015/94.",
      "The mechanism is simple even though the paperwork is not. You pay a tiered percentage of your pensionable pay, a further 23.7% is credited on your behalf on top of that, and in exchange the scheme promises you a fixed fraction of your earnings for every year you are a member. In the 2015 section that fraction is 1/54th, banked each year and then uprated by the Consumer Prices Index plus 1.5% for as long as you remain active.",
      "Understanding NHS pensions starts there, with the difference between a promise and a pot. Nothing in the scheme is invested for you, no balance is quoted to you, and the annual statement you receive shows an entitlement rather than a fund value. That single distinction explains most of what follows, including why a pay rise can create a tax bill.",
    ],
    // ponytail: the "A promise, not a pot" card set that sat here restated the three
    // paragraphs above almost word for word, so it was length without information.
    // The one fact it carried that the prose does not (the 14.38% / 9.4% split of the
    // 23.7%) is stated in the contributions section below.
  },
  {
    heading: "How does the NHS pension work if you have 1995, 2008 and 2015 service?",
    paragraphs: [
      "Most senior doctors hold benefits in more than one section, and each section pays on its own terms at its own normal pension age. The 1995 section is final salary, accrues at 1/80th and pays an automatic tax-free lump sum of three times the pension, with a normal pension age of 60. The 2008 section is also final salary, accrues at 1/60th with no automatic lump sum, and has a normal pension age of 65.",
      "The 2015 section is career average revalued earnings, or CARE, so it values each year's pay separately rather than linking everything to your final salary. Its normal pension age tracks your State Pension age, or 65 if that is later. From 1 April 2022 every active member accrues in the 2015 section regardless of any protection they previously held.",
      "A consultant or GP partner in post since the 1990s typically holds 1995 and 2015 benefits; someone who joined between 2008 and 2015 can hold entitlements in all three. Because the sections have different retirement ages, different commutation terms and different early-retirement factors, a projection built on one section alone will be wrong. Reading your Total Reward Statement section by section is the first practical step.",
    ],
    figure: (
      <Figure
        title="The three sections on their own terms"
        headers={["Section", "Basis", "Accrual", "Automatic lump sum", "Normal pension age"]}
        rows={[
          ["1995", "Final salary", "1/80th", "Three times the pension", "60"],
          ["2008", "Final salary", "1/60th", "None", "65"],
          [
            "2015",
            "Career average revalued earnings",
            "1/54th, uprated by CPI plus 1.5% while active",
            "None",
            "State Pension age, or 65 if that is later",
          ],
        ]}
        note="Scheme terms by section. Every active member accrues in the 2015 section from 1 April 2022"
      />
    ),
  },
  {
    heading: "What is the NHS pension contribution, and what is the NHS pension percentage of your pay?",
    paragraphs: [
      "Member contributions are tiered, so the rate you pay depends on which pay band your pensionable pay falls into, and both the bands and the tier you land in change. NHS scheme dates run from 1 April while the tax year starts on 6 April, so a contribution band and an allowance never share a start date.",
      "Two points routinely catch doctors out. The tier is charged on pensionable pay only, so private practice, medico-legal work and dividends never push you up a band. Contributions are deducted before income tax, so relief comes automatically at your marginal rate rather than through a claim. On the other side, 23.7% of pensionable pay has been credited on the member's behalf since 1 April 2024, of which an employer bears 14.38% and 9.4% is funded centrally.",
      <>
        {"The 2026/27 band table, the six rates that go with it and your own tier against a specific salary all sit on the "}
        <InlineLink href="/calculators/nhs-superannuation-tiered-contribution">
          tiered contribution calculator
        </InlineLink>
        {", which is where that figure is maintained. For how relief interacts with a GP partner's profit share see "}
        <InlineLink href="/blog/gp-pension-contributions-tax-relief">
          GP pension contributions and tax relief
        </InlineLink>
        {"."}
      </>,
    ],
    figure: (
      <Figure
        title="Four rules that decide the tier you actually pay"
        cards={[
          { title: "Tiered on pensionable pay only", detail: "The 2026/27 bands, in force from 1 April 2026 and capable of being revised in-year, run six rates from 5.2% to 12.5% on pensionable pay alone, so private practice, medico-legal work and dividends never push you up a band." },
          { title: "Relief is automatic", detail: "Contributions come out before income tax, so relief lands at your marginal rate. The deduction is not the same figure as the pension input amount your annual allowance is tested on." },
          { title: "Two different clocks", detail: "Scheme bands run from 1 April, uprated by the previous September's CPI and correctable in-year, while the tax year starts on 6 April." },
          { title: "Credited on top", detail: "23.7% of pensionable pay since 1 April 2024, of which an employer bears 14.38% and 9.4% is funded centrally." },
        ]}
      />
    ),
  },
  {
    heading: "What would 30 years of service actually build?",
    paragraphs: [
      "Because accrual is a fixed fraction, the answer is arithmetic rather than forecasting. Thirty years at 1/54th is 30/54 of your career-average revalued earnings, which is close to 55.6% of them.",
      "Take Dr A, an illustrative hospital consultant whose 2015 section pensionable pay averages £100,000 across a 30-year career once each year has been revalued. Each year banks £100,000 divided by 54, which is £1,852. Thirty of those years give £1,852 multiplied by 30, or roughly £55,600 of annual pension for life, payable from her normal pension age. If she also holds 10 years of 1995 service on a final salary of £100,000, that adds £100,000 divided by 80 multiplied by 10, which is £12,500 a year, plus an automatic lump sum of three times that figure, £37,500. What changes the answer most is not investment performance but the earnings path: years of lower part-time pay are banked at that lower level and stay there.",
      "Figures above are illustrative and rounded, and a real projection has to use your own revalued earnings for each year. The point of the arithmetic is that the scheme is knowable in advance, which is why the tax planning around it can be done years ahead rather than in the month a statement arrives.",
    ],
    figure: (
      <Figure
        title="Dr A, step by step"
        headers={["Step", "Figure"]}
        rows={[
          ["Average revalued 2015 pensionable pay", "£100,000"],
          ["Banked each year at 1/54th", "£1,852"],
          ["Thirty years of that accrual", "Roughly £55,600 of annual pension for life"],
          ["As a share of career-average revalued earnings", "30/54, close to 55.6%"],
          ["Plus 10 years of 1995 service at 1/80th", "£12,500 a year"],
          ["Automatic 1995 lump sum, three times the pension", "£37,500"],
        ]}
        note="Example figures displayed"
      />
    ),
  },
  {
    heading: "What NHS pension benefits do you get beyond the pension itself?",
    paragraphs: [
      "The income is the headline, and the ancillary cover is a large part of the value. Membership carries a death-in-service lump sum, survivor pensions for a qualifying partner and dependent children, and ill-health retirement benefits on two tiers depending on whether you are unable to do your own job or any regular employment.",
      "Members can also buy more. Added Pension buys extra defined benefit accrual inside the scheme, while Money Purchase Additional Voluntary Contributions build a separate defined contribution pot alongside it. Both attract income tax relief and both count towards the annual allowance, so neither is a way around a charge.",
      <>
        {"Tax-free cash is now capped by allowance rather than by fund size. The lifetime allowance was abolished on 6 April 2024 and replaced by a Lump Sum Allowance of £268,275 and a Lump Sum and Death Benefit Allowance of £1,073,100. Older protections such as Fixed, Enhanced and Individual Protection still change those limits, so check whether you hold one before deciding how much pension to commute. The "}
        <InlineLink href="/nhs-pension">NHS pension hub</InlineLink>
        {" covers the scheme administration and benefit detail."}
      </>,
    ],
    figure: (
      <Figure
        title="The cover you already hold, what you can buy, and the two allowances"
        cards={[
          { title: "Death in service", detail: "A lump sum, with the amount set by the section your service sits in." },
          { title: "Survivor pensions", detail: "For a qualifying partner and dependent children." },
          { title: "Ill-health retirement", detail: "Two tiers, depending on whether you are unable to do your own job or any regular employment." },
          { title: "Added Pension", detail: "Extra defined benefit accrual inside the scheme." },
          { title: "Money Purchase AVCs", detail: "A separate defined contribution pot alongside the scheme. Both this and Added Pension count towards the annual allowance." },
          { title: "Lump Sum Allowance", detail: "£268,275, capping tax-free pension lump sums since the lifetime allowance was abolished on 6 April 2024." },
          { title: "Lump Sum and Death Benefit Allowance", detail: "£1,073,100, covering tax-free lump sums payable in life and on death combined." },
          { title: "Older protections", detail: "Fixed, Enhanced and Individual Protection still change those limits, so check before commuting pension for cash." },
        ]}
        note="Allowance figures for 2026/27"
      />
    ),
  },
  {
    heading: "When can you retire, and what does going early cost?",
    paragraphs: [
      "The earliest you can normally draw benefits is 55, against normal pension ages of 60 for 1995 service, 65 for 2008 service and State Pension age for 2015 service. Taking benefits before a section's normal pension age applies a permanent actuarial reduction set by the scheme actuary, and those factors are revised periodically, so take the current figure from NHS Pensions rather than an older article. In the 2015 section, Early Retirement Reduction Buy Out lets you pay extra now to buy out part of that reduction later.",
      <>
        {"Partial retirement has been available in all sections since 1 October 2023. You can draw between 20% and 100% of accrued benefits in up to two events, then keep working and keep accruing in the 2015 section. There is a condition: pensionable pay or commitment must fall by at least 10% for the first 12 months. That is the part most people miss, and it is covered in full in the "}
        <InlineLink href="/blog/nhs-pension-partial-retirement-doctors-guide">
          partial retirement guide for doctors
        </InlineLink>
        {"."}
      </>,
      "A retirement plan also has to sit alongside your state pension, which is payable from State Pension age and not before, plus any personal pension, ISA or non-NHS defined benefit rights. The order in which those are drawn changes the tax paid, and for anyone weighing a private-practice income against NHS accrual it changes the answer on both sides at once.",
    ],
    figure: (
      <Figure
        title="The ages, the reduction and the partial-retirement condition"
        headers={["Point", "Position"]}
        rows={[
          ["Earliest you can normally draw", "55"],
          ["Normal pension age, 1995 service", "60"],
          ["Normal pension age, 2008 service", "65"],
          ["Normal pension age, 2015 service", "State Pension age"],
          ["Drawing before normal pension age", "A permanent actuarial reduction on scheme-actuary factors, which are revised periodically"],
          ["Early Retirement Reduction Buy Out", "In the 2015 section, pay extra now to buy out part of that reduction later"],
          ["Partial retirement, since 1 October 2023", "Draw 20% to 100% of accrued benefits in up to two events and keep accruing"],
          ["The partial-retirement condition", "Pensionable pay or commitment must fall by at least 10% for the first 12 months"],
        ]}
        note="Scheme ages and conditions. Reduction factors are set by the scheme actuary and revised periodically"
      />
    ),
  },
  {
    heading: "Are you affected by the annual allowance or the tapered annual allowance?",
    paragraphs: [
      "The annual allowance is £60,000 for 2026/27 and caps the pension growth that can be built each year with tax relief. In a defined benefit scheme the measured amount is the pension input amount, which is the increase in the capital value of your promised benefits over the year, not the contributions you paid. A pay rise, extra sessions, a seniority increment or a Clinical Excellence Award can all produce an input amount far larger than anything visible on a payslip.",
      "The taper is a two-part test, and both parts have to be failed before your allowance is reduced at all. Reading only the adjusted income limb is the most common way doctors reach the wrong answer about whether the taper reaches them, and a consultant can have a very large adjusted income and still not be tapered.",
      <>
        {"Unused allowance can be carried forward from the previous three tax years, current year first, which is why modelling before the tax year ends is worth more than reacting after it. The two income tests, the thresholds and the calculation itself, including how to work out threshold and adjusted income, belong to the "}
        <InlineLink href="/calculators/nhs-pension-annual-allowance">
          NHS pension annual allowance calculator
        </InlineLink>
        {", the "}
        <InlineLink href="/medical-guides/nhs-pension-annual-allowance">
          NHS pension annual allowance guide
        </InlineLink>
        {", the "}
        <InlineLink href="/blog/nhs-pension-annual-allowance-complete-guide">
          complete annual allowance guide
        </InlineLink>
        {" and the "}
        <InlineLink href="/blog/nhs-pension-tapered-annual-allowance-calculator">
          tapered annual allowance worked calculation
        </InlineLink>
        {"."}
      </>,
    ],
    figure: (
      <Figure
        title="The allowance, and the two tests that taper it"
        headers={["Test or figure", "2026/27 position"]}
        rows={[
          ["Annual allowance", "£60,000"],
          ["What is measured", "The pension input amount, the increase in the capital value of your promised benefits, not the contributions you paid"],
          ["Taper test one, threshold income", "Over £200,000"],
          ["Taper test two, adjusted income", "Over £260,000"],
          ["Both must be failed", "Failing the adjusted income limb alone does not taper you"],
          ["Rate of reduction", "£1 of allowance for every £2 of adjusted income above £260,000"],
          ["Minimum tapered allowance", "£10,000"],
          ["Carry-forward", "Unused allowance from the previous three tax years, current year used first"],
        ]}
        note="Annual allowance figures for the 2026/27 tax year"
      />
    ),
  },
  {
    heading: "What is Scheme Pays, and when can the scheme settle the charge for you?",
    paragraphs: [
      "Scheme Pays means NHS Pensions settles your annual allowance charge with HMRC and permanently reduces your future benefits in exchange, with the reduction calculated on scheme-set factors that carry an interest cost. That makes it a deferral rather than a waiver, and the cost of the deferral is the thing to weigh.",
      <>
        {"There are two routes, mandatory and voluntary, and a doctor tipped into a charge by the taper alone is often on the voluntary one without realising it. There is also an election deadline with two limbs, the second of which a revised pension savings statement can move. Both tests, both deadline limbs and the statutory references sit on the "}
        <InlineLink href="/calculators/nhs-pension-scheme-pays">Scheme Pays calculator</InlineLink>
        {", with the dates worked through on the "}
        <InlineLink href="/blog/nhs-pension-scheme-pays-doctors-deadlines">
          Scheme Pays deadlines page
        </InlineLink>
        {"."}
      </>,
    ],
    figure: (
      <Figure
        title="Which route you are on, and by when you must elect"
        headers={["Point", "Position"]}
        rows={[
          ["Mandatory route", "The charge exceeds £2,000 and the NHS scheme input amount exceeds the standard £60,000 annual allowance"],
          ["Voluntary route", "Where those two conditions are not both met, including a charge driven by the taper alone"],
          ["Election deadline", "31 July in the year following the year the charge crystallised, so a 2026/27 charge is elected by 31 July 2028"],
          ["Extended limb", "Where a revised pension savings statement is issued on or after 2 May, the earlier of three months from that statement or six years from the end of the tax year"],
          ["Brought-forward limb", "No election can be made once all your benefits have been taken"],
          ["What it costs", "A permanent reduction in future benefits on scheme-set factors carrying an interest cost, so a deferral rather than a waiver"],
        ]}
        note="Scheme Pays conditions and deadlines for a 2026/27 charge"
      />
    ),
  },
  {
    heading: "The McCloud remedy, and the tax reconciliation it left behind",
    paragraphs: [
      "The McCloud remedy is the fix for age discrimination in the protections applied when the 2015 section launched. It moved affected members' service between 1 April 2015 and 31 March 2022 back into their legacy 1995 or 2008 section, from 1 October 2023, and it reaches a narrower group than doctors assume: two membership dates decide eligibility rather than simply having worked through the remedy period.",
      <>
        {"Two live consequences follow, on different clocks. The benefit choice between legacy and 2015 terms is deferred to retirement, so most doctors have nothing to elect now. The tax consequence is immediate, because rolled-back service produces revised pension input amounts that can restate prior-year annual allowance positions in either direction. The eligibility dates, the two statements, the remedy-year deadlines and how refunds, rebates and re-elections work are set out in the "}
        <InlineLink href="/blog/mccloud-remedy-nhs-pension-doctors-explained">
          McCloud remedy explainer
        </InlineLink>
        {" and in "}
        <InlineLink href="/blog/nhs-pension-tax-charges-how-to-minimize">NHS pension tax charges</InlineLink>
        {"."}
      </>,
    ],
    figure: (
      <Figure
        title="The two membership dates, and the two clocks"
        headers={["Point", "Position"]}
        rows={[
          ["Remedy period", "1 April 2015 to 31 March 2022"],
          ["Rolled back into the legacy section from", "1 October 2023"],
          ["Eligibility, first date", "Joined the scheme on or before 31 March 2012"],
          ["Eligibility, second date", "An active member on 1 April 2015"],
          ["The benefit choice", "Deferred to retirement, so most doctors have nothing to elect now"],
          ["The tax consequence", "Immediate. Revised pension input amounts can restate prior-year annual allowance positions in either direction"],
        ]}
        note="Remedy dates and eligibility conditions"
      />
    ),
  },
  {
    heading: "Dividends are not pensionable, and no calculator will tell you that",
    paragraphs: [
      "A doctor's ordinary personal service company cannot hold a GMS or PMS contract, and income routed through a company is not NHS-pensionable. Those contracts sit with GPs, their partnerships, or a company limited by shares whose shareholders all qualify. Private practice, medico-legal work or locum income taken as dividends therefore builds no NHS accrual at all, however efficient the corporation tax position looks in isolation. For a hospital consultant, only the NHS employment is pensionable; private work never is, in any structure.",
      "That makes incorporation a two-sided calculation. A saving measured against the 45% additional rate above £125,140 has to be set against 1/54th of the lost pensionable pay for every year the arrangement runs, plus the 23.7% credited on top of it. The pension side is the half that gets left out, and it is usually the larger number over a career.",
    ],
    figure: (
      <Figure
        title="The half of the incorporation sum that gets left out"
        cards={[
          { title: "Who can hold the contract", detail: "GPs, their partnerships, or a company limited by shares whose shareholders all qualify. A doctor's ordinary personal service company cannot." },
          { title: "What is not pensionable", detail: "Income routed through a company. Private practice, medico-legal work or locum income taken as dividends builds no NHS accrual at all." },
          { title: "For a hospital consultant", detail: "Only the NHS employment is pensionable. Private work never is, in any structure." },
          { title: "The saving side", detail: "Measured against the 45% additional rate of income tax above £125,140." },
          { title: "The cost side", detail: "1/54th of the lost pensionable pay for every year the arrangement runs, plus the 23.7% credited on the member's behalf on top of it." },
          { title: "Which is larger", detail: "Over a career, usually the pension side." },
        ]}
        note="Income tax additional rate threshold for 2026/27"
      />
    ),
  },
  {
    heading: "NHS pension scheme guides for your role",
    paragraphs: [
      "How your pensionable pay is worked out depends on whether the scheme treats you as a practitioner or an officer. A GP partner is a Type 1 medical practitioner, meaning a GP provider or partner whose pensionable earnings derive from net NHS-derived profit. That profit is certified each year on the Type 1 Annual Certificate of Pensionable Profits, filed through Primary Care Support England, the body that administers GP pension records and payments in England. Wales uses the local health board, and Scotland and Northern Ireland have separate arrangements.",
      "A salaried GP is a Type 2 medical practitioner and completes the Type 2 self-assessment instead. Both run to a 28 February deadline a year in arrears, so the 2025/26 pension year is due by 28 February 2027. Freelance GP locums record and pay contributions on their locum earnings using locum forms A and B, submitted through Primary Care Support England, and are bound by a much shorter clock.",
      <>
        {"Work that ended more than 10 weeks ago cannot be pensioned, which is a permanent loss of accrual rather than a late-filing penalty. These NHS pension scheme guides go deeper by role: "}
        <InlineLink href="/blog/nhs-pension-for-locums-form-a-form-b">locum forms A and B</InlineLink>
        {", "}
        <InlineLink href="/for-gps">accounting for GPs</InlineLink>
        {", "}
        <InlineLink href="/for-consultants">hospital consultants</InlineLink>
        {" and "}
        <InlineLink href="/for-junior-doctors">doctors in training</InlineLink>
        {"."}
      </>,
    ],
    figure: (
      <Figure
        title="Your role, your form, and the clock it runs to"
        headers={["Role", "Form", "Deadline"]}
        rows={[
          [
            "GP provider or partner, Type 1",
            "Type 1 Annual Certificate of Pensionable Profits, filed through Primary Care Support England",
            "28 February a year in arrears, so the 2025/26 pension year is due by 28 February 2027",
          ],
          [
            "Salaried GP, Type 2",
            "Type 2 self-assessment, filed through Primary Care Support England",
            "28 February a year in arrears",
          ],
          [
            "Freelance GP locum",
            "Locum forms A and B, submitted through Primary Care Support England",
            "Work that ended more than 10 weeks ago cannot be pensioned at all",
          ],
        ]}
        note="Certification deadlines for the 2025/26 pension year"
      />
    ),
  },
];

const PROOF_POINTS = [
  { title: "Pension figures checked, not assumed", detail: "The input amount, then the taper test, then carry-forward" },
  { title: "Matched to a specialist firm", detail: "Your enquiry goes to an accountant who works with doctors" },
  { title: "Modelled on your figures", detail: "Your own pensionable pay and income mix, not a template" },
];

export default function NHSPensionPlanningPillarPage() {
  // Keyed on the SLUG, never the raw frontmatter label. Property put 57 posts on
  // the wrong CTA and 228 pages on the wrong related list by keying on the label.
  const articles = getAllPosts()
    .filter((p) => slugifyCategory(p.category) === CATEGORY_SLUG)
    .map((p) => ({
      slug: p.slug,
      title: p.title,
      summary: p.summary,
      date: p.date,
      readTime: calculateReadTime(p.contentHtml),
    }));
  const otherTopics = getAllCategories().filter((c) => c.slug !== CATEGORY_SLUG);
  const cta = blogCtaFor(CATEGORY_SLUG);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${siteConfig.url}/blog` },
          { "@type": "ListItem", position: 3, name: CATEGORY_NAME },
        ],
      },
      {
        "@type": "CollectionPage",
        name: PAGE_TITLE,
        description: metadata.description,
        url: `${siteConfig.url}/blog/${CATEGORY_SLUG}`,
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section
        className={`relative flex items-center overflow-hidden py-10 sm:py-12 lg:py-14 min-h-[360px] sm:min-h-[420px] lg:min-h-[440px] ${heroCreamSurface}`}
      >
        <MedicalBackdrop tone="cream" />
        <div className={`${siteContainerLg} relative z-10`}>
          <div className="max-w-3xl">
            <Breadcrumb
              suppressJsonLd
              items={[
                { label: "Home", href: "/" },
                { label: "Blog", href: "/blog" },
                { label: CATEGORY_NAME },
              ]}
            />
            <Eyebrow>{CATEGORY_NAME}</Eyebrow>
            <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl lg:text-6xl">
              NHS Pension Explained for Doctors &amp; GPs
            </h1>
            <p className="mt-4 text-base leading-7 text-slate-700 sm:text-lg sm:leading-8">
              The NHS pension scheme is a defined benefit pension, which means it pays a guaranteed
              income for life based on your earnings and your years of service, not on an investment
              pot that can rise or fall. Every active member now builds benefits in the 2015 section at
              1/54th of each year&apos;s pensionable pay, on top of any 1995 or 2008 service already
              banked. This page is the map; the detail sits on the pages it links to.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-4">
              <Link
                href="#enquiry-form"
                data-cta={`blog_hub_${CATEGORY_SLUG}_book`}
                data-cta-placement="blog_hero"
                data-cta-goal="form"
                className={btnPrimary}
              >
                Book free consultation
              </Link>
              <Link
                href="#articles"
                data-cta={`blog_hub_${CATEGORY_SLUG}_articles`}
                data-cta-placement="blog_hero"
                className={btnOnCream}
              >
                Browse {articles.length} {articles.length === 1 ? "article" : "articles"}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>{CATEGORY_NAME}</Eyebrow>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">The essentials</h2>
          <div className="mt-8 sm:mt-12">
            {SECTIONS.map((s) => (
              <div
                key={s.heading}
                className="grid gap-3 border-t border-slate-200 py-8 first:border-t-0 first:pt-0 last:pb-0 lg:grid-cols-[1fr_2fr] lg:gap-12"
              >
                <h3 className="text-lg font-bold text-slate-900 sm:text-xl">{s.heading}</h3>
                <div className="space-y-4">
                  {s.paragraphs.map((p, i) => (
                    <p key={i} className="text-base leading-7 text-slate-600">
                      {p}
                    </p>
                  ))}
                  {s.bullets && s.bullets.length > 0 ? (
                    <ul className="list-disc space-y-2 pl-5 text-base leading-7 text-slate-600">
                      {s.bullets.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  ) : null}
                  {s.trailingParagraphs?.map((p, i) => (
                    <p key={`t${i}`} className="text-base leading-7 text-slate-600">
                      {p}
                    </p>
                  ))}
                  {s.figure}
                </div>
              </div>
            ))}
          </div>

          {/* The FAQ stays a plain <dl>, server-rendered, and stays inside the white
              essentials band rather than taking a ground of its own: the kit
              FaqSection is a Radix accordion whose closed answers never reach the
              pre-hydration HTML (DESIGN_DELTA §3). The FAQPage JSON-LD above is fed
              from this same array, so the two cannot disagree. */}
          <div className="mt-12 border-t border-slate-200 pt-10 sm:mt-16">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">
              NHS pension explained: questions doctors ask
            </h2>
            <dl className="mt-8 space-y-4">
              {faqs.map((f) => (
                <div key={f.q} className="rounded-xl bg-slate-50 p-5 ring-1 ring-slate-200/70 sm:p-6">
                  <dt className="text-base font-bold text-slate-900 sm:text-lg">{f.q}</dt>
                  <dd className="mt-3 text-base leading-7 text-slate-600">{f.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <ArticleLibrary articles={articles} categoryName={CATEGORY_NAME} />

      <div id="enquiry-form" className="scroll-mt-24">
        <LeadCTAPanel
          title={cta.heading}
          description={cta.body}
          proofPoints={PROOF_POINTS}
          form={<LeadForm redirectOnSuccess={false} submitLabel={cta.button} />}
          backdrop={<MedicalBackdrop />}
          footnote="No obligation and no hard sell. If the specialist firm thinks your position is already right, they will tell you so."
        />
      </div>

      <OtherTopics topics={otherTopics} />
    </>
  );
}

/**
 * The article library. Deliberately NOT the kit's `HubArticleList`, and this is
 * the one place these four hubs diverge from `BlogCategoryHub`.
 *
 * `packages/web-shared/design/blog/HubArticleList.tsx:85` builds every card href
 * as `/blog/${categorySlug}/${slug}`, a NESTED path. Medical's blog URLs are FLAT
 * (`/blog/<slug>`, DISPOSITION_SLICE1 §C.0) and there is no route at the nested
 * shape: `/blog/nhs-pension-planning/gp-pension-contributions-tax-relief` returns
 * 404 against the running production build, verified. Consuming the kit list as
 * it stands would therefore turn every article link on all eight hubs into a dead
 * link. The component exposes no href override, so this mirrors its markup with a
 * flat href instead of editing the kit.
 *
 * The crawl-path rule is kept exactly: every post is in the server HTML. Never
 * `slice()`, and nothing is hidden: all eight hubs render every article visibly,
 * because `hidden` without a reveal control leaves those items permanently
 * unreachable to a reader while the heading still claims the full count. The
 * 12-visible rule returns together with the kit's pagination control, the moment
 * the kit's article list can emit a flat `/blog/<slug>` href.
 */
function ArticleLibrary({
  articles,
  categoryName,
}: {
  articles: Array<{ slug: string; title: string; summary?: string; date?: string; readTime: number }>;
  categoryName: string;
}) {
  return (
    <section id="articles" className="scroll-mt-24 bg-slate-50 py-16 sm:py-20">
      <div className={siteContainerLg}>
        <Eyebrow>The library</Eyebrow>
        <h2 className="mb-2 text-2xl font-bold text-slate-900 sm:text-4xl">
          Every {categoryName} article
        </h2>
        <p className="mb-8 text-base text-slate-600 sm:text-lg">
          {articles.length} {articles.length === 1 ? "guide" : "guides"} in this topic.
        </p>
        {articles.length > 0 ? (
          <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((post) => (
              <article
                key={post.slug}
                className="rounded-xl bg-white shadow-sm ring-1 ring-slate-200/70 transition-all hover:shadow-md hover:ring-primary-600"
              >
                <Link href={`/blog/${post.slug}`} className={`flex h-full flex-col rounded-xl p-6 ${focusRing}`}>
                  <h3 className="text-base font-bold! leading-snug! tracking-normal! text-slate-900 transition-colors hover:text-primary-700 sm:text-lg">
                    {post.title}
                  </h3>
                  {post.summary ? (
                    <div className="mt-3 mb-5 flex-grow">
                      <p className="line-clamp-3 text-sm leading-6 text-slate-600">{post.summary}</p>
                    </div>
                  ) : null}
                  <p className="mt-auto inline-flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-500">
                    <span className="inline-flex items-center gap-1.5">
                      <Clock aria-hidden className="h-3.5 w-3.5 text-primary-600" />
                      {post.readTime} min read
                    </span>
                    {post.date ? (
                      <time dateTime={post.date}>
                        {new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" }).format(
                          new Date(post.date),
                        )}
                      </time>
                    ) : null}
                  </p>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <p className="rounded-xl bg-white p-8 text-center text-slate-600 ring-1 ring-slate-200/70">
            No articles in this topic yet. Check back shortly.
          </p>
        )}
      </div>
    </section>
  );
}

/** Sibling navigation. The hubs had none, so each was a crawl cul-de-sac back to /blog. */
function OtherTopics({ topics }: { topics: Array<{ slug: string; name: string; count: number }> }) {
  return (
    <section className="bg-slate-50 py-16 sm:py-20">
      <div className={siteContainerLg}>
        <Eyebrow>Keep exploring</Eyebrow>
        <h2 className="mb-8 text-2xl font-bold text-slate-900 sm:text-4xl">Browse other topics</h2>
        <div className="flex flex-wrap gap-3">
          {topics.map((topic) => (
            <Link
              key={topic.slug}
              href={`/blog/${topic.slug}`}
              data-cta={`blog_hub_topic_${topic.slug}`}
              data-cta-placement="blog_other_topics"
              className={`inline-flex min-h-12 items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-900 shadow-sm ring-1 ring-slate-200/70 transition-all hover:text-primary-700 hover:shadow-md hover:ring-primary-600 sm:text-base ${focusRing}`}
            >
              {topic.name}
              <span className="text-xs font-semibold text-slate-500">{topic.count}</span>
            </Link>
          ))}
        </div>
        <Link
          href="/blog"
          data-cta="blog_hub_all_articles"
          data-cta-placement="blog_other_topics"
          className={`mt-8 inline-flex items-center gap-1.5 rounded py-1 text-sm font-bold text-primary-700 transition-colors hover:text-primary-800 sm:text-base ${focusRing}`}
        >
          All articles and guides
        </Link>
      </div>
    </section>
  );
}
