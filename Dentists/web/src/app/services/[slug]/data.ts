/**
 * Service sub-page content. Each entry renders at /services/[slug] via
 * the [slug]/page.tsx component. Each targets one query cluster.
 *
 * SERVICE_SLUGS at the foot of this file is the single source of truth for
 * which children exist: the route's generateStaticParams and app/sitemap.ts
 * both derive from it, so the two cannot drift.
 */

export type ServiceFaq = { question: string; answer: string };

export type ServiceSubPage = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  hero: {
    heading: string;
    intro: string;
  };
  sections: Array<{
    heading: string;
    body: string[];
    bullets?: string[];
  }>;
  whoFor: string[];
  workedExample?: {
    heading: string;
    body: string[];
  };
  faqs: ServiceFaq[];
  relatedServices: Array<{ href: string; label: string }>;
  ctaHeading: string;
  ctaBody: string;
};

export const SERVICE_SUB_PAGES: Record<string, ServiceSubPage> = {
  "dental-accountants": {
    slug: "dental-accountants",
    title: "Dental Accountants UK: What a Specialist Actually Does",
    metaTitle: "Dental Accountants UK: Specialist Tax & Practice Support",
    metaDescription:
      "What a specialist dental accountant does that a generalist doesn't. NHS contract reporting, associate tax, profit extraction, practice valuation.",
    eyebrow: "Specialist dental accountants",
    hero: {
      heading: "Dental accountants for UK practices, principals and associates",
      intro:
        "Dentistry is the whole remit here. The work our partner network is set up for is NHS contract reporting, associate and locum tax, practice accounts, profit extraction and sale preparation. That focus is the point, because the decisions that cost a dentist money are rarely the ones a general tax checklist asks about.",
    },
    sections: [
      {
        heading: "Why a specialist dental accountant, not a generalist",
        body: [
          "A generalist practice covers every trade at once, and the compliance gets done. What tends to get missed is the sector-specific decision, because there is no dental pattern to read the numbers against.",
          "The recurring ground is narrow and knowable. UDA values that are contract-specific rather than national. The 1995, 2008 and 2015 sections of the NHS Pension Scheme, with everyone accruing in the 2015 section since 1 April 2022. Fixed-rate goodwill relief at 6.5% a year for goodwill acquired on or after 1 April 2019, with its qualifying-IP condition. Associate employment status after the off-payroll reforms. The VAT borderline between exempt clinical care and standard-rated cosmetic work.",
          "None of that is advanced technique. It is the baseline for working with dentists. A useful test before you appoint anyone: ask them why there is no national UDA value, and see whether the answer arrives without a pause.",
        ],
      },
      {
        heading: "What the work covers across a year",
        body: [
          "Compliance is the floor, not the work. The work is the decisions that compliance reveals.",
        ],
        bullets: [
          "Monthly or quarterly management accounts that separate NHS UDA income, private fee income, capitation/plan income and lab fee recharges so you see where margin actually sits",
          "Annual statutory accounts and corporation tax return for limited companies, partnership return and partners' self-assessment for partnerships, sole-trader self-assessment for unincorporated practices",
          "Salary and dividend extraction modelling each year at the rates for the year in question, including the dividend ordinary and upper rates of 10.75% and 35.75% that apply from 6 April 2026, the NHS Pension contribution interaction and the tapered annual allowance for higher earners",
          "Goodwill amortisation tracking, capital allowance claims on chairs / compressors / X-ray units / autoclaves, Structures and Buildings Allowance for post-October-2018 premises spend",
          "VAT scope review for mixed NHS/private practices, including the borderline cases (tooth whitening, clear aligners, cosmetic bonding)",
          "BADR pre-sale planning, Section 162 incorporation relief modelling, sale-and-leaseback structuring for principals approaching exit",
        ],
      },
      {
        heading: "How a specialist firm differs from a corporate dental accountant",
        body: [
          "Accountancy firms differ in how the work is staffed. In some, the person who reviews the year-end and the person who answers the email are two different people, and the second one has to go and ask the first.",
          "The firms in our partner network are built the other way round. The accountant who does the technical work on your account is the accountant you deal with directly, so an NHS contract letter or a buyer's diligence request goes to someone who already knows your numbers.",
          "That is a decision about how the work is organised. It is not a promise about how fast anything is turned around, and you should ask any firm that contacts you what a realistic timetable looks like for the job in front of you.",
        ],
      },
    ],
    whoFor: [
      "Single-handed practice principals",
      "Multi-partner dental practices (partnership, LLP, or limited company)",
      "Corporate dental groups with two or more practices",
      "Self-employed associates earning above the personal allowance",
      "Limited-company locum dentists working across NHS practices",
      "Foundation dentists in their first year of practice",
    ],
    workedExample: {
      heading: "Goodwill relief on a practice bought after April 2019",
      body: [
        "An illustration of the arithmetic, not an account of a client. A limited company buys a dental practice and £600,000 of the price is attributed to goodwill. Because the acquisition completed on or after 1 April 2019, fixed-rate relief at 6.5% a year is in point, which is £39,000 of relief a year against corporation tax, running down over roughly fifteen years.",
        "The condition people miss is that the relief applies only where the business acquisition also includes qualifying intellectual property assets, and it is capped at six times that qualifying-IP expenditure. A purchase agreement that never identifies those assets leaves the claim exposed, which is a drafting point at the time of the deal rather than something to discover at the first year end.",
        "Timing does more work here than price. Goodwill acquired between 8 July 2015 and 31 March 2019 attracts no amortisation relief at all, so two otherwise identical practices bought either side of 1 April 2019 carry a materially different tax cost.",
      ],
    },
    faqs: [
      {
        question: "What makes you a 'specialist' dental accountant?",
        answer:
          "The test is whether the firm works in dental detail without being walked through it. A specialist should already know that a UDA value is contract-specific, that dividends are not pensionable for an incorporated associate, that goodwill relief on a post-April-2019 purchase carries a qualifying-IP condition, and that a mixed practice crossing into standard-rated work brings partial exemption with it. Ask about those before you ask about anything else.",
      },
      {
        question: "I'm already with a specialist dental firm. Why would I switch?",
        answer:
          "Often there is no reason to, and that is a fine answer. The situations worth a second opinion are narrower: an NHS Pension certificate nobody has reconciled to the ARR, a UDA shortfall nobody warned you about before year end, an incorporation modelled on the tax saving alone with no pensionable-pay figure beside it, or a practice purchase where the fixtures election was left to completion. If none of those apply and the advice arrives before you ask for it, stay where you are.",
      },
      {
        question: "Do you work with associates as well as practice owners?",
        answer:
          "Yes. Self-employed associates, limited-company locums and salaried associates with side income. Associates often need lighter-touch support (self-assessment, expenses, indemnity treatment, NHS Pension AVCs) but the dental specifics still matter, particularly around employment-status risk after the IR35 reforms.",
      },
      {
        question: "What decides how much dental accountancy work costs?",
        answer:
          "Complexity, and it is worth knowing which parts of yours are driving it. A single self-assessment return for a sole-trader associate sits at one end. Add a limited company, payroll with percentage-split associate payments, VAT registration with a partial exemption calculation, an NHS Pension certificate and an annual reconciliation report, and a second site, and each of those is genuinely more work rather than a bolted-on charge. Ask any firm to price against a written scope listing those items, so you are comparing the same job.",
      },
      {
        question: "Can you help with NHS Pension Scheme decisions?",
        answer:
          "A specialist from our partner network models the financial impact of NHS Pension decisions: annual allowance interaction, tapered allowance at higher earnings, McCloud remedy implications for members with legacy 1995 or 2008 section benefits, and the dental retainer vs full membership choice. For regulated advice on accessing pension benefits they work alongside an FCA-authorised IFA.",
      },
    ],
    relatedServices: [
      { href: "/services/practice-accounting", label: "Practice accounting" },
      { href: "/services/associate-tax", label: "Associate tax" },
      { href: "/services/practice-valuation", label: "Practice valuation" },
      { href: "/services/locum-dentist-tax", label: "Locum dentist tax" },
    ],
    ctaHeading: "Talk to a dentist-only specialist",
    ctaBody:
      "30-minute scoping call, no obligation. A specialist from our partner network will review your current position, flag the immediate opportunities, and tell you honestly whether they are the right fit.",
  },

  "practice-accounting": {
    slug: "practice-accounting",
    title: "Dental Practice Accounting: NHS, Private & Plan Income",
    metaTitle: "Dental Practice Accounting: NHS + Private + Plan Income",
    metaDescription:
      "Monthly management accounts that split NHS UDA, private fee income and plan revenue so you see where dental practice profit really comes from.",
    eyebrow: "Practice accounting",
    hero: {
      heading: "Practice accounting for NHS, private and plan-mix dentists",
      intro:
        "The point of practice accounting is not to satisfy HMRC. The point is to tell you, accurately and monthly, where the profit is coming from and where it is leaking. NHS UDA, private fee, capitation plan, lab recharges, associate splits and overhead allocation all need to be separated cleanly before any of it means anything.",
    },
    sections: [
      {
        heading: "Income streams reported separately, always",
        body: [
          "A dental practice does not have one revenue line. It has at least four, often more. Lumping them together hides the real picture.",
        ],
        bullets: [
          "NHS UDA payments (gross of clawback risk and end-of-year reconciliation)",
          "Private fee income, split by treatment category where it matters (general, ortho, implant, cosmetic)",
          "Capitation and membership plan income (Denplan, Practice Plan, Whitecross, internal schemes)",
          "Patient-paid laboratory recharges (frequently mistreated as net income when they should be flagged separately)",
          "Domiciliary, sedation, referral and other one-off treatment income",
          "Sundry and non-clinical income (room rent to a hygienist on a self-employed contract, photo licensing for case studies, etc.)",
        ],
      },
      {
        heading: "Cost allocation that matches how a dental practice actually runs",
        body: [
          "Generalist accounting allocates costs by type: salaries, rates, light and heat. That tells you the total, not the relevant detail.",
          "A specialist allocates the costs that vary by income mix: associate fee splits against the income they generate, lab fees against the treatment that triggered them, materials against private vs NHS volume, surgery rent against surgery utilisation. The result is a real margin by income stream, not a notional average.",
        ],
      },
      {
        heading: "Monthly review, quarterly conversation",
        body: [
          "Management accounts you do not read are wasted. The monthly output is packaged as a one-page summary with a short written read on what moved, plus the underlying detail if you want to drill in. Quarterly, the trend gets walked on a call rather than the month.",
          "The point of the call is decisions: are you over-staffing on the dental nurse side, is your private margin growing or stagnating, is your UDA volume trending toward year-end clawback risk, is associate utilisation high enough to justify the split.",
        ],
      },
      {
        heading: "Year-end without the year-end scramble",
        body: [
          "If management accounts run cleanly month by month, the statutory year-end is a tidy-up rather than a reconstruction. Company accounts and corporation tax returns, partnership returns, partner self-assessments and sole-trader returns are all built from numbers that have already been reviewed once, which is the part that keeps a year-end calm. Filing dates are statutory, and the timetable for meeting yours is something the firm agrees with you rather than something quoted here.",
        ],
      },
    ],
    whoFor: [
      "Mixed NHS and private dental practices",
      "Private-heavy practices with capitation plan income",
      "Multi-associate practices needing income-stream margin analysis",
      "Multi-site groups with consolidated and per-site reporting needs",
    ],
    faqs: [
      {
        question: "How often will I see management accounts?",
        answer:
          "As often as the agreed scope calls for. Monthly suits a practice tracking margin by income stream through the year, particularly where UDA delivery is running close to the 96% reconciliation line. Quarterly suits a steadier cycle. Reporting dates and review calls are timetabled together when the scope is set, so the date is one you have agreed rather than one you wait on.",
      },
      {
        question: "Do you use specific software (Xero, FreeAgent, QuickBooks)?",
        answer:
          "Firms in our partner network work with whatever you currently use. Most dental practices run on Xero, and FreeAgent and QuickBooks are supported too. If you are still on spreadsheets, expect Xero to be recommended and the migration handled for you. The software matters less than the chart of accounts; that is what makes the dental-specific reporting possible.",
      },
      {
        question: "Can you support multi-site dental groups?",
        answer:
          "Yes. Consolidated group accounts plus per-site management accounts so each principal sees their own performance. Intra-group recharges (head-office costs, central marketing, shared lab arrangements) handled correctly so each site's margin is comparable.",
      },
      {
        question: "What about MTD for Income Tax?",
        answer:
          "MTD for Income Tax has applied since 6 April 2026 where qualifying income (gross trading plus property income, tested on the prior year's return) exceeds £50,000, and the threshold drops to £30,000 from 6 April 2027 and £20,000 from 6 April 2028. Most full-time unincorporated principals and associates are inside it already. Limited companies are not: MTD for Income Tax is an income tax regime, not a corporation tax one. Digital record-keeping setup and the quarterly submissions are compliance scope, so ask for them to be listed explicitly in any engagement letter, ours included.",
      },
    ],
    relatedServices: [
      { href: "/services/dental-accountants", label: "Dental accountants overview" },
      { href: "/services/associate-tax", label: "Associate tax" },
      { href: "/services/practice-valuation", label: "Practice valuation" },
    ],
    ctaHeading: "See your practice in proper detail",
    ctaBody:
      "Book a 30-minute call. A specialist from our partner network will look at your last set of accounts and tell you what the structure is hiding.",
  },

  "associate-tax": {
    slug: "associate-tax",
    title: "Associate Dentist Tax: Self-Employment, Expenses & IR35",
    metaTitle: "Associate Dentist Tax: Self-Employment, Expenses, IR35",
    metaDescription:
      "Specialist tax support for UK dental associates: self-employment status, allowable expenses, NHS Pension AVCs, indemnity treatment and IR35 risk.",
    eyebrow: "Associate & locum tax",
    hero: {
      heading: "Tax support for dental associates and locums",
      intro:
        "Associate dentist tax looks simple until it isn't. Self-employment status, expense claims, the NHS Pension interaction, indemnity treatment, and off-payroll risk for limited-company locums on NHS engagements. The aim is a return that claims everything you are properly entitled to claim, on a basis that still looks right when HMRC asks how you arrived at it.",
    },
    sections: [
      {
        heading: "Self-employment status: still the right answer for most associates, but no longer automatic",
        body: [
          "Most dental associates are self-employed, work under a BDA-style model agreement, file self-assessment and claim expenses. That is the right shape for the majority of associate engagements.",
          "But HMRC and the tribunals have made clear that the paperwork alone does not determine status. They test the actual working arrangement against five factors: control, substitution, mutuality of obligation, financial risk, integration into the practice. If your day-to-day working arrangement looks like employment (fixed hours, no realistic substitution, practice-supplied materials, practice equipment, no real downside risk), the BDA model contract on file will not save you.",
          "A specialist from our partner network reviews the working arrangement, not just the contract, and flags where status risk sits.",
        ],
      },
      {
        heading: "Allowable expenses an associate should be claiming",
        body: [
          "The genuine commercial expenses an associate incurs are deductible in the self-assessment return. The ones that go missing are rarely exotic: mileage between practices, the annual indemnity premium, and a phone apportionment nobody ever documented.",
        ],
        bullets: [
          "Indemnity insurance (Dental Protection, MDU, MDDUS): fully allowable trade expense",
          "GDC retention fee and any specialist register fees",
          "CPD courses, online and in-person, where genuinely relevant to your clinical practice",
          "Professional subscriptions to BDA, college memberships, specialty associations",
          "Loupes, magnification equipment, instruments where you have purchased your own",
          "Motor expenses for travel between practices (not home-to-first-practice; that is commute)",
          "Phone and internet apportioned to clinical use (a sensible percentage, documented)",
          "Accountancy fees and professional advice fees",
        ],
      },
      {
        heading: "Locum dentists working through a limited company",
        body: [
          "Limited-company locums working on NHS engagements have to confront the post-April-2021 IR35 rules: when the engaging practice is a medium or large client, the practice (not the locum's PSC) determines IR35 status. Inside-IR35 means PAYE-style deductions despite the company structure.",
          "A specialist from our partner network models umbrella vs limited-company vs sole-trader for a locum dentist's specific income mix and engagement type. There is no single right answer; the right answer depends on the practices you work at, how they classify status, and how much of your work falls inside vs outside IR35.",
        ],
      },
      {
        heading: "NHS Pension scheme: still valuable, but watch the annual allowance",
        body: [
          "Many associates default into the NHS Pension Scheme and stay there without reviewing. The default is usually right, because the scheme remains one of the most valuable in the UK. But high-earning principals and high-earning associates with significant private income on top can hit the tapered annual allowance and trigger a tax charge.",
          "A specialist from our partner network models pensionable pay against the tapered allowance threshold and flags where Scheme Pays may make sense. None of that is regulated pension advice; for transfer or access decisions they work with an FCA-authorised IFA.",
        ],
      },
    ],
    whoFor: [
      "Self-employed dental associates on BDA-style agreements",
      "Salaried associates with private income on the side",
      "Limited-company locum dentists on NHS contracts",
      "Sole-trader locums working across multiple practices",
      "Foundation dentists transitioning to associate work",
    ],
    faqs: [
      {
        question: "Where does an associate actually lose money on a self-assessment return?",
        answer:
          "Three places, and none of them is a clever scheme. First, expenses left off because nobody asked: motor between practices, CPD, an annual indemnity premium, professional subscriptions. Second, the mileage rate, which rose to 55p for the first 10,000 business miles from 6 April 2026, so a return still built on 45p understates the claim. Third, the payments-on-account schedule, which is not a saving but decides whether a correct bill arrives as a shock. An under-claimed return can be amended for earlier years, so a review looks backwards as well as forwards.",
      },
      {
        question: "Do I need to incorporate as an associate?",
        answer:
          "Usually not, and the reason is not the one people expect. At typical associate profits the pure tax saving from incorporating is small, and the dividend ordinary and upper rates rising to 10.75% and 35.75% from 6 April 2026 narrowed it further. Against that sits the NHS Pension Scheme: for an incorporated associate only the PAYE salary is pensionable and dividends are not, so accrual can fall sharply. The tax comparison on its own is not the answer. It has to be run beside the pension figure, on your numbers.",
      },
      {
        question: "What about IR35 if I work through a limited company?",
        answer:
          "Since 6 April 2021, when the engaging practice is a medium or large client (most are), the practice determines your IR35 status, not your PSC. If a practice tells you the engagement is inside IR35, you pay PAYE-style deductions despite the company structure. A specialist from our partner network will look at the determinations across your practices and model the realistic post-tax outcome before any structural decision.",
      },
      {
        question: "Can I claim my dental school student loan interest as an expense?",
        answer:
          "No. Student loan repayments are not an allowable trade expense. They are a separate deduction taken through the self-assessment based on income level and student loan plan. Plan 2 and Plan 5 repayment thresholds differ, so the correct plan has to be applied on your return.",
      },
    ],
    relatedServices: [
      { href: "/services/dental-accountants", label: "Dental accountants overview" },
      { href: "/services/locum-dentist-tax", label: "Locum dentist tax" },
      { href: "/services/practice-accounting", label: "Practice accounting" },
    ],
    ctaHeading: "Get your associate return right",
    ctaBody:
      "30-minute scoping call. A specialist from our partner network will look at your current self-assessment and tell you what you are missing.",
  },

  "practice-valuation": {
    slug: "practice-valuation",
    title: "Dental Practice Valuation: Goodwill, EBITDA & Sale Tax",
    metaTitle: "Dental Practice Valuation UK: Goodwill, EBITDA & Sale Tax",
    metaDescription:
      "Practice valuation for UK dentists planning a sale or buy-in. Goodwill methodology, EBITDA multiples, BADR planning, Section 162 incorporation relief.",
    eyebrow: "Practice purchase & sale",
    hero: {
      heading: "Practice valuation, sale preparation and buy-side due diligence",
      intro:
        "Whether you are selling, buying, bringing in a partner or thinking about a corporate exit five years out, the valuation work is the same: normalised EBITDA, goodwill methodology, asset list, contract review, tax structure. The right number is the one that holds up under buyer due diligence.",
    },
    sections: [
      {
        heading: "How dental practices actually get valued",
        body: [
          "There are two common methods. Earnings-based valuation multiplies normalised EBITDA by a sector-and-region-specific multiple. Percentage-of-fee-income applies a percentage to the gross fee income. Some buyers use a hybrid.",
          "Indicative 2025/26 UK dental ranges: roughly 0.6 to 0.9 times normalised EBITDA for NHS-heavy single-handed practices in lower-demand regions, roughly 0.9 to 1.2 for mixed multi-surgery practices in normal-demand areas, and roughly 1.1 to 1.4 for private-focused practices in high-demand regions, with corporate strategic premiums capable of sitting above that. Treat each as a range and date-tag it, because they move. A specialist from our partner network models both methods and reconciles them.",
          "Goodwill typically represents 60-80% of the total practice purchase price. Tangible assets (chairs, lights, X-ray, compressors, sterilisation) make up the balance.",
        ],
      },
      {
        heading: "Normalising EBITDA before the buyer does",
        body: [
          "Buyers will normalise the seller's EBITDA. They will strip out the principal's drawings (replacing them with market-rate principal cost), the practice manager who is actually the principal's spouse on above-market pay, the personal expenses that ran through the business, the one-off goodwill amortisation from a previous buy-out.",
          "Normalising first means the seller knows the realistic figure and the buyer is not the one delivering the surprise. Common normalisation adjustments:",
        ],
        bullets: [
          "Replace principal drawings with market-rate principal salary + dividend equivalent",
          "Adjust spouse salary to market rate for the actual role performed",
          "Strip out one-off items: COVID restart, equipment refresh, premises buy-out costs",
          "Add back amortisation of goodwill from previous acquisitions",
          "Strip out personal use items (vehicles, subscriptions, family-related expenses)",
          "Normalise rent to open-market value if the principal owns the premises personally",
        ],
      },
      {
        heading: "Tax planning before a practice sale",
        body: [
          "BADR (Business Asset Disposal Relief) is the lever that matters, and its rate has moved twice. It was 10% to 5 April 2025, 14% for disposals from 6 April 2025 to 5 April 2026, and 18% for disposals from 6 April 2026. The £1m lifetime limit per individual is unchanged. Note also that the date of disposal for CGT is the date of the contract where that contract is unconditional, not completion, so the exchange date can decide which rate band a sale falls into.",
          "BADR eligibility requires the qualifying conditions to be held throughout the two years to disposal: a trading business or company, and for a share sale 5% of ordinary share capital and 5% of voting rights plus officer or employee status. That is worth checking around 24 months out rather than in the week before completion, because the two-year clock cannot be shortened. Correcting a structure late does not shorten the period; it moves the earliest date you can sell with the relief in hand.",
          "If you are still unincorporated, Section 162 incorporation relief can defer CGT on goodwill when you transfer the whole unincorporated trade to a company in exchange for shares. This is sometimes a sensible move before sale, sometimes not, and it needs modelling on your numbers first.",
        ],
      },
      {
        heading: "Buy-side: what to ask the seller before you sign",
        body: [
          "The risk on a first purchase is attachment. Once a buyer has decided this is the practice, diligence quietly turns into confirmation. The questions below are the ones that are awkward to ask in that frame of mind, which is exactly why they belong on a list written before you view anything.",
        ],
        bullets: [
          "Three years of accounts plus the latest management accounts",
          "NHS contract documentation, including the most recent UDA reconciliation and any contract variation letters",
          "Associate agreements (all of them, current and recent past) with the fee splits and notice provisions",
          "Lease or freehold documentation, with planning consent for D1/E-class use",
          "Equipment inventory with age, service records and remaining useful life estimate",
          "Patient record system audit (PMS export, recall compliance, treatment plan completion rates)",
          "Compliance documentation: CQC registration, CQC inspection history, radiation reports, employment contracts, GDC registrations of all clinical staff",
        ],
      },
    ],
    whoFor: [
      "Principals planning a practice sale 1-3 years out",
      "Principals approaching retirement and considering MBO or corporate sale",
      "Multi-partner practices restructuring or buying out a partner",
      "First-time practice buyers needing buy-side diligence support",
      "Corporate dental groups acquiring single-practice targets",
    ],
    faqs: [
      {
        question: "How long before sale should I start planning?",
        answer:
          "Realistically 24 months. BADR eligibility hinges on two years of qualifying conditions, and pre-sale normalisation work (taking spouse salary back to market rate, cleaning out personal expenses from the P&L, regularising associate agreements) needs at least 18 months to show in the accounts that the buyer will see.",
      },
      {
        question: "What's the difference between asset sale and share sale?",
        answer:
          "Asset sale: the seller's company sells specific assets and goodwill to the buyer. Share sale: the buyer acquires the seller's company outright, and the NHS contract stays inside the company rather than needing novation with commissioner consent. The trade-off is risk, because on a share sale the buyer inherits the company's history including liabilities nobody surfaced, which is why buyers scope diligence differently on the two routes. Stamp taxes also differ between buying shares and buying premises. A specialist from our partner network models both structures against the buyer's preferred approach.",
      },
      {
        question: "What multiple should I expect on EBITDA?",
        answer:
          "A range, not a single number. On indicative 2025/26 UK dental benchmarks, NHS-heavy single-handed practices in lower-demand regions sit around 0.6 to 0.9 times normalised EBITDA, mixed multi-surgery practices in normal-demand areas around 0.9 to 1.2, and private-focused practices in high-demand regions around 1.1 to 1.4, with corporate buyers sometimes paying a strategic premium above that for a practice that fits their map. Quote a single multiple and you mis-set expectations on one side or the other.",
      },
      {
        question: "Do you handle the legal side of the sale?",
        answer:
          "No, that needs a dental specialist solicitor. The firms in our partner network work alongside them, providing the financial work (valuation, EBITDA normalisation, tax structuring, post-completion reconciliation) while the solicitor handles the contract, completion accounts and legal due diligence.",
      },
    ],
    relatedServices: [
      { href: "/services/dental-accountants", label: "Dental accountants overview" },
      { href: "/services/practice-accounting", label: "Practice accounting" },
      { href: "/services/locum-dentist-tax", label: "Locum dentist tax" },
    ],
    ctaHeading: "Get the valuation right before you list",
    ctaBody:
      "A pre-sale review 18-24 months out is the difference between hitting your number and accepting the buyer's. Book a 30-minute scoping call.",
  },

  "locum-dentist-tax": {
    slug: "locum-dentist-tax",
    title: "Locum Dentist Tax UK: Limited Co vs Umbrella vs Sole Trader",
    metaTitle: "Locum Dentist Tax: Ltd Co vs Umbrella vs Self-Employed",
    metaDescription:
      "Tax support for UK locum dentists. Limited company vs umbrella vs sole-trader comparison, IR35 on NHS engagements, allowable expenses, indemnity treatment.",
    eyebrow: "Locum & sessional",
    hero: {
      heading: "Tax support for UK locum and sessional dentists",
      intro:
        "Locum dentists hit a tax structure decision early in their working life and live with it for years. Limited company, umbrella, or self-employed sole trader. The right answer depends on your income level, the engagement mix across NHS and private, and the IR35 determinations the practices you work at are issuing.",
    },
    sections: [
      {
        heading: "The three structures available to a UK locum dentist",
        body: [
          "Each has trade-offs on tax efficiency, administrative burden, IR35 risk and access to the NHS Pension scheme. None is universally right.",
        ],
        bullets: [
          "Self-employed sole trader: simplest admin, full expense claims, NHS Pension access via the practitioner pensions arrangement. Personal liability for tax. NI Class 4 at 6%/2%.",
          "Limited company (Personal Service Company): tax-efficient at higher income levels via salary-and-dividend extraction. Subject to IR35 on every engagement; the engaging practice determines status if it's a medium or large client. Inside IR35 = PAYE deductions despite the Ltd. NHS Pension access becomes more complex.",
          "Umbrella company: simplest of all from the locum's perspective. The umbrella employs you and runs PAYE. No expense claims (with very limited exceptions). Effectively a PAYE employment relationship for tax purposes. Suits short-term and low-volume locuming.",
        ],
      },
      {
        heading: "When the limited company route makes sense",
        body: [
          "The company route has to clear three hurdles at once, and income level is only the first. Profit has to be high enough and steady enough that retaining some of it inside the company is worth the running cost. Most engagements have to sit clearly outside IR35, because an inside-IR35 engagement is taxed broadly as employment income whatever the company structure says. And there has to be something to plan with: a genuinely employed spouse, a deferred income horizon, employer pension capacity.",
          "Miss any one of the three and the company earns nothing. The pure tax saving at ordinary locum profits was never large, and the dividend ordinary and upper rates rising to 10.75% and 35.75% from 6 April 2026 shaved it again, so what is left is the extra filing, the extra records and the extra cost.",
        ],
      },
      {
        heading: "IR35 for locum dentists: what changed in 2021",
        body: [
          "From 6 April 2021, when the engaging practice is a medium or large client (which most NHS practices and dental groups are), the practice determines IR35 status for the engagement, not the locum's PSC. If the practice issues a Status Determination Statement saying 'inside IR35', PAYE-style deductions apply on the fees despite the Ltd co structure.",
          "In practice this means: a locum with five different practice engagements may have some engagements determined inside IR35 and others outside, with different tax treatment for each. A specialist from our partner network helps work out the realistic post-tax outcome before any structural decision, not after.",
        ],
      },
      {
        heading: "Allowable expenses for self-employed and Ltd-co locums",
        body: [
          "Outside IR35 (sole trader or PSC), genuine commercial expenses are deductible. Inside IR35 (deemed-employment engagements), only limited expenses apply.",
        ],
        bullets: [
          "Indemnity insurance: deductible regardless of structure (genuinely necessary cost)",
          "GDC retention: deductible",
          "CPD courses, conferences and learning materials: deductible if clinically relevant",
          "Travel between practices: deductible (not home-to-first-practice, which is commute)",
          "Loupes, instruments, lab coats and clinical equipment: deductible",
          "Subscriptions to clinical journals and specialty associations: deductible",
          "Accountancy fees: deductible",
        ],
      },
    ],
    whoFor: [
      "Limited-company locum dentists working across NHS practices",
      "Self-employed sole-trader locums",
      "Newly qualified dentists choosing a structure for their first locum year",
      "Practice principals engaging locums and needing IR35 determination support",
    ],
    faqs: [
      {
        question: "Should I incorporate as a locum?",
        answer:
          "Not automatically, and no single income figure decides it. Start with your engagement mix: since 6 April 2021 a medium or large practice issues the status determination, and every engagement it puts inside IR35 is taxed broadly as employment income regardless of the company. Then the NHS Pension position, which is more restrictive for a company locum than for a sole-trader locum on the practitioner route. Then, last, the tax arithmetic, which at 2026/27 dividend rates is a smaller factor than either of the first two. A specialist from our partner network runs all three on your numbers before recommending anything.",
      },
      {
        question: "Can I access the NHS Pension Scheme as a locum?",
        answer:
          "Self-employed sole-trader locums working under NHS contracts can usually access the NHS Pension Scheme via the practitioner pensions arrangement. Limited-company locums and umbrella locums face more restrictive access. This is a real factor in the structural decision and it has to be weighed alongside the tax arithmetic.",
      },
      {
        question: "What happens if a practice issues me a 'inside IR35' determination?",
        answer:
          "If you're working through a limited company, the practice will operate PAYE-style deductions on your fees before paying your company. Your company receives the net. You pay no salary or dividend from the inside-IR35 engagement (drawing it out would be double-taxation). The result is similar to being PAYE-employed by the practice for that engagement, but with the additional Ltd-co overhead. You can challenge the determination but most are correctly issued.",
      },
      {
        question: "I work for an umbrella. What does the umbrella actually do?",
        answer:
          "The umbrella employs you under a contract of employment, runs PAYE on your earnings, deducts income tax and employee NI and pays you the net. The engaging practice pays the umbrella, not you. The umbrella keeps a margin for doing it, and umbrellas quote that margin differently, some as a weekly amount and some as a percentage of gross, so ask for it in writing both ways before you sign, and check whether employer NIC and the apprenticeship levy are also coming out of the assignment rate. Allowable expenses are very limited under umbrella arrangements. Umbrella is convenient and low-admin. Tax-efficient it is not.",
      },
    ],
    relatedServices: [
      { href: "/services/dental-accountants", label: "Dental accountants overview" },
      { href: "/services/associate-tax", label: "Associate tax" },
      { href: "/services/practice-accounting", label: "Practice accounting" },
    ],
    ctaHeading: "Get your locum structure right",
    ctaBody:
      "Book a 30-minute scoping call. A specialist from our partner network will model your income against all three structures and tell you which one wins on real numbers.",
  },
};

export const SERVICE_SLUGS = Object.keys(SERVICE_SUB_PAGES);
