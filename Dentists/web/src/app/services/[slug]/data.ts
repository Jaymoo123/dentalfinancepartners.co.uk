/**
 * Service sub-page content. Each entry renders at /services/[slug] via
 * the [slug]/page.tsx component. Targets one specific GSC query cluster.
 *
 * The /services/dental-accountants entry is the single most important
 * landing page on the site — it targets the 1,842 90-day impressions
 * the home page currently absorbs at position 65-83.
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
      "What a specialist dental accountant does that a generalist doesn't. NHS contract reporting, associate tax, profit extraction, practice valuation. Fixed fees.",
    eyebrow: "Specialist dental accountants",
    hero: {
      heading: "Dental accountants for UK practices, principals and associates",
      intro:
        "We work only with dentists. Every client is a dental practice, a dental partnership, a corporate dental group, or a self-employed associate or locum. That focus is the point. Specialist work needs specialist context.",
    },
    sections: [
      {
        heading: "Why a specialist dental accountant, not a generalist",
        body: [
          "Most generalist accountants in the UK have a handful of dental clients on their book. The work gets done, but the sector-specific decisions get missed because the accountant has no pattern to compare against.",
          "A specialist dental accountant sees the same questions weekly. NHS UDA contract values that differ between regions. The 1995 vs 2008 vs 2015 sections of the NHS Pension Scheme. Goodwill amortisation rules for goodwill acquired post-1 April 2019. The associate self-employment tests after the IR35 reforms. The VAT borderline between exempt clinical work and standard-rated cosmetic treatment.",
          "Those are not advanced techniques. They are baseline competence for working with dentists. If your accountant cannot quote the current UDA value range across England, Wales and Northern Ireland from memory, they are learning on your account.",
        ],
      },
      {
        heading: "What we actually do across a year",
        body: [
          "Compliance is the floor, not the work. The work is the decisions that compliance reveals.",
        ],
        bullets: [
          "Monthly or quarterly management accounts that separate NHS UDA income, private fee income, capitation/plan income and lab fee recharges so you see where margin actually sits",
          "Annual statutory accounts and corporation tax return for limited companies, partnership return and partners' self-assessment for partnerships, sole-trader self-assessment for unincorporated practices",
          "Salary and dividend extraction modelling each year at the 2025/26 rates, including the NHS Pension contribution interaction and the tapered annual allowance for higher earners",
          "Goodwill amortisation tracking, capital allowance claims on chairs / compressors / X-ray units / autoclaves, Structures and Buildings Allowance for post-October-2018 premises spend",
          "VAT scope review for mixed NHS/private practices, including the borderline cases (tooth whitening, clear aligners, cosmetic bonding)",
          "BADR pre-sale planning, Section 162 incorporation relief modelling, sale-and-leaseback structuring for principals approaching exit",
        ],
      },
      {
        heading: "How we are different from corporate dental accountants",
        body: [
          "Some dental accountancy firms have grown into corporate-style operations that allocate junior staff to client work and only escalate up the chain when something goes wrong. The named partner is rarely on the call.",
          "Our model is the opposite. The senior accountant working on your account is the senior accountant. The same person who reviews your year-end is the person you email when an NHS contract reform letter arrives or a buyer wants due diligence by Friday.",
          "We deliberately stay small enough to keep that real.",
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
      heading: "How we work with a typical mixed practice",
      body: [
        "A two-surgery NHS-and-private practice in the West Midlands. One principal, two associates, three nurses, one hygienist on a self-employed contract. NHS UDA contract worth around £180,000 per year, private fee income around £140,000.",
        "Day one: we map the existing accounts, the NHS contract documentation, associate agreements, payroll structure and the principal's personal tax position. Within 30 days we produce a baseline management report showing margin by income stream.",
        "Month one: we identify that the principal is drawing salary above the optimal NI threshold and is missing roughly £4,200/year in NI by doing so. We adjust the payroll. We also identify that goodwill from a 2021 partial buy-out has not had the 6.5% amortisation claim made; we file the amendment for the recoverable years.",
        "Ongoing: monthly management accounts, quarterly review call, year-end accounts and CT return inside the deadline, personal self-assessment for the principal and a salary-and-dividend annual review every March.",
      ],
    },
    faqs: [
      {
        question: "What makes you a 'specialist' dental accountant?",
        answer:
          "Every client we work with is a dentist, a dental practice or a dental group. We are not a general accountancy firm with a dental department. That focus shows in the questions we know to ask, the decisions we model, and the pace at which we work because we have seen the same shape of practice before.",
      },
      {
        question: "I'm already with a specialist dental firm. Why would I switch?",
        answer:
          "Most often, fee structure or response time. We work on fixed monthly fees with a stated scope; you should never get a year-end surprise invoice. We respond inside 24 hours, usually same day. If your current firm meets both standards and you are getting proactive advice, there is no reason to switch.",
      },
      {
        question: "Do you work with associates as well as practice owners?",
        answer:
          "Yes. Self-employed associates, limited-company locums and salaried associates with side income. Associates often need lighter-touch support (self-assessment, expenses, indemnity treatment, NHS Pension AVCs) but the dental specifics still matter, particularly around employment-status risk after the IR35 reforms.",
      },
      {
        question: "How much do you charge?",
        answer:
          "Fixed monthly fees scaled by practice size and service tier. Associates and single-handed sole-trader practices typically sit in the Essentials tier. Multi-associate limited-company practices fall into the Growth tier. Multi-site groups and exit-stage principals work in the Specialist tier. We quote a fixed fee after a 30-minute scoping call so you know the cost before signing.",
      },
      {
        question: "Can you help with NHS Pension Scheme decisions?",
        answer:
          "We model the financial impact of NHS Pension decisions: annual allowance interaction, tapered allowance at higher earnings, McCloud remedy implications for members with legacy 1995 or 2008 section benefits, and the dental retainer vs full membership choice. For regulated advice on accessing pension benefits we work alongside an FCA-authorised IFA.",
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
      "30-minute scoping call, no obligation. We will review your current position, flag the immediate opportunities, and tell you honestly whether we are the right fit.",
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
          "Generalist accounting allocates costs by type — salaries, rates, light and heat. That tells you the total, not the relevant detail.",
          "We allocate the costs that vary by income mix: associate fee splits against the income they generate, lab fees against the treatment that triggered them, materials against private vs NHS volume, surgery rent against surgery utilisation. The result is a real margin by income stream, not a notional average.",
        ],
      },
      {
        heading: "Monthly review, quarterly conversation",
        body: [
          "Management accounts you do not read are wasted. We package the monthly output as a one-page summary with three to five lines of analysis, plus the underlying detail if you want to drill in. Once a quarter we book a 60-minute call to walk through the trend.",
          "The point of the call is decisions: are you over-staffing on the dental nurse side, is your private margin growing or stagnating, is your UDA volume trending toward year-end clawback risk, is associate utilisation high enough to justify the split.",
        ],
      },
      {
        heading: "Year-end without the year-end scramble",
        body: [
          "If management accounts run cleanly month by month, the statutory year-end is a tidy-up, not an event. We close limited company year-ends and file corporation tax returns inside the deadline, not in the last week. Same for partnership returns, partner self-assessments and sole-trader returns.",
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
          "Monthly for practices on the Growth or Specialist tier. Quarterly for practices on the Essentials tier. We deliver the report within 15 working days of the month-end close. Quarterly review calls happen in the second week of the following month.",
      },
      {
        question: "Do you use specific software (Xero, FreeAgent, QuickBooks)?",
        answer:
          "We work with whatever you currently use. Most of our practices run on Xero, but we also support FreeAgent and QuickBooks. If you are still on spreadsheets, we will recommend Xero and handle the migration. The software matters less than the chart of accounts; that is what makes the dental-specific reporting possible.",
      },
      {
        question: "Can you support multi-site dental groups?",
        answer:
          "Yes. Consolidated group accounts plus per-site management accounts so each principal sees their own performance. Intra-group recharges (head-office costs, central marketing, shared lab arrangements) handled correctly so each site's margin is comparable.",
      },
      {
        question: "What about MTD for Income Tax?",
        answer:
          "MTD for Income Tax becomes mandatory from 6 April 2026 for sole-trader and landlord income above £50,000. Many sole-trader dental practices are caught by this. We handle the digital record-keeping setup and quarterly submissions inside the standard fee, not as an add-on.",
      },
    ],
    relatedServices: [
      { href: "/services/dental-accountants", label: "Dental accountants overview" },
      { href: "/services/associate-tax", label: "Associate tax" },
      { href: "/services/practice-valuation", label: "Practice valuation" },
    ],
    ctaHeading: "See your practice in proper detail",
    ctaBody:
      "Book a 30-minute call. We will look at your last set of accounts and tell you what the structure is hiding.",
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
        "Associate dentist tax looks simple until it isn't. Self-employment status, expense claims, the NHS Pension interaction, indemnity treatment, IR35 risk for limited-company locums on NHS contracts. We see all of it weekly and structure your return so you keep what you are entitled to keep, without picking a fight you would lose with HMRC.",
    },
    sections: [
      {
        heading: "Self-employment status: still the right answer for most associates, but no longer automatic",
        body: [
          "Most dental associates are self-employed, work under a BDA-style model agreement, file self-assessment and claim expenses. That is the right shape for the majority of associate engagements.",
          "But HMRC and the tribunals have made clear that the paperwork alone does not determine status. They test the actual working arrangement against five factors: control, substitution, mutuality of obligation, financial risk, integration into the practice. If your day-to-day working arrangement looks like employment (fixed hours, no realistic substitution, practice-supplied materials, practice equipment, no real downside risk), the BDA model contract on file will not save you.",
          "We review the working arrangement, not just the contract, and flag where status risk sits.",
        ],
      },
      {
        heading: "Allowable expenses an associate should be claiming",
        body: [
          "The genuine commercial expenses an associate incurs are deductible in the self-assessment return. Most associates we onboard are claiming roughly half of what they should be.",
        ],
        bullets: [
          "Indemnity insurance (Dental Protection, MDU, MDDUS) — fully allowable trade expense",
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
          "We model umbrella vs limited-company vs sole-trader for a locum dentist's specific income mix and engagement type. There is no single right answer; the right answer depends on the practices you work at, how they classify status, and how much of your work falls inside vs outside IR35.",
        ],
      },
      {
        heading: "NHS Pension scheme: still valuable, but watch the annual allowance",
        body: [
          "Many associates default into the NHS Pension Scheme and stay there without reviewing. The default is usually right — the scheme remains one of the most valuable in the UK. But high-earning principals and high-earning associates with significant private income on top can hit the tapered annual allowance and trigger a tax charge.",
          "We model pensionable pay against the tapered allowance threshold and flag where Scheme Pays may make sense. We do not give regulated pension advice; for transfer or access decisions we work with an FCA-authorised IFA.",
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
        question: "How much can a dental associate typically save by switching to a specialist accountant?",
        answer:
          "Varies. The most common single saving is missed expenses on indemnity, CPD, and motor on a sole-trader return where the previous accountant was conservative. We have seen four-figure refunds on amended returns where the previous claims were under-stated. Switching is rarely about saving £X this year specifically; it is about not leaking that £X every year going forward.",
      },
      {
        question: "Do I need to incorporate as an associate?",
        answer:
          "Usually not. Incorporation only typically benefits associates earning above roughly £80,000–£100,000 sustainably, and even then the NHS Pension Scheme interaction can change the answer. We model your specific numbers before recommending the structure.",
      },
      {
        question: "What about IR35 if I work through a limited company?",
        answer:
          "Since 6 April 2021, when the engaging practice is a medium or large client (most are), the practice determines your IR35 status, not your PSC. If a practice tells you the engagement is inside IR35, you pay PAYE-style deductions despite the company structure. We will look at the determinations across your practices and model the realistic post-tax outcome before any structural decision.",
      },
      {
        question: "Can I claim my dental school student loan interest as an expense?",
        answer:
          "No. Student loan repayments are not an allowable trade expense. They are a separate deduction taken through the self-assessment based on income level and student loan plan. Plan 2 and Plan 5 repayment thresholds differ; we apply the correct plan on your return.",
      },
    ],
    relatedServices: [
      { href: "/services/dental-accountants", label: "Dental accountants overview" },
      { href: "/services/locum-dentist-tax", label: "Locum dentist tax" },
      { href: "/services/practice-accounting", label: "Practice accounting" },
    ],
    ctaHeading: "Get your associate return right",
    ctaBody:
      "30-minute scoping call. We will look at your current self-assessment and tell you what you are missing.",
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
        heading: "How dental practices actually get valued in 2025/26",
        body: [
          "There are two common methods. Earnings-based valuation multiplies normalised EBITDA by a sector-and-region-specific multiple. Percentage-of-fee-income applies a percentage to the gross fee income. Some buyers use a hybrid.",
          "EBITDA multiples in UK dental in 2025/26 typically range from around 0.6× for NHS-heavy single-handed practices in low-demand regions to 1.4× or higher for private-focused multi-surgery practices in high-demand regions. Corporate buyers benchmark differently again. We model both approaches and reconcile.",
          "Goodwill typically represents 60-80% of the total practice purchase price. Tangible assets (chairs, lights, X-ray, compressors, sterilisation) make up the balance.",
        ],
      },
      {
        heading: "Normalising EBITDA before the buyer does",
        body: [
          "Buyers will normalise the seller's EBITDA. They will strip out the principal's drawings (replacing them with market-rate principal cost), the practice manager who is actually the principal's spouse on above-market pay, the personal expenses that ran through the business, the one-off goodwill amortisation from a previous buy-out.",
          "We normalise first, so the seller knows the realistic figure and the buyer is not the one delivering the surprise. Common normalisation adjustments:",
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
          "BADR (Business Asset Disposal Relief) is the lever that matters. For 2025/26 disposals it gives 14% CGT on qualifying gains up to a £1m lifetime limit. From 6 April 2026 the rate rises to 18%. A practice sale completing the day before vs the day after that date is materially different on the tax bill.",
          "BADR eligibility requires two years of qualifying ownership, employment or officer status, and the qualifying-asset tests. We check this 24 months out, not in the week before completion. If the structure is wrong, fixing it usually takes 12 months minimum because of the two-year qualifying period.",
          "If you are still unincorporated, Section 162 incorporation relief can defer CGT on goodwill when you transfer the whole unincorporated trade to a company in exchange for shares. This is sometimes a sensible move before sale, sometimes not. We model it.",
        ],
      },
      {
        heading: "Buy-side: what to ask the seller before you sign",
        body: [
          "Most buy-side first-time dental practice buyers see one practice they like, get attached, and skim the diligence. We see the second deal go better than the first because they ask the right questions the second time. We bring the second-time approach to first-time buyers.",
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
          "Asset sale: the seller's company sells specific assets and goodwill to the buyer. Share sale: the buyer acquires the seller's company outright. Share sales are more buyer-friendly on stamp duty (0.5% on shares vs SDLT scale on practice premises) but more seller-risky because hidden liabilities transfer with the company. Most UK dental sales settle as asset sales for that reason. We model both structures against the buyer's preferred approach.",
      },
      {
        question: "What multiple should I expect on EBITDA?",
        answer:
          "Range, not a single number. In 2025/26 UK dental, NHS-heavy single-handed practices in regions with low buyer demand can sit at 0.6×-0.8× normalised EBITDA. Private-focused multi-surgery practices in high-demand regions (London, South East, prime South Coast and West Country) can reach 1.4× or higher. Corporate buyers will pay a premium for fit. Quote a single multiple and you will mis-set expectations on either side.",
      },
      {
        question: "Do you handle the legal side of the sale?",
        answer:
          "No, that needs a dental specialist solicitor. We work alongside them, providing the financial work (valuation, EBITDA normalisation, tax structuring, post-completion reconciliation) while they handle the contract, completion accounts and legal due diligence.",
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
          "A limited company route earns its administrative cost above roughly £80,000–£100,000 of locum income sustainably, AND when most engagements sit clearly outside IR35, AND when the locum has tax-planning flexibility (e.g. a non-working spouse, deferred income horizon, employer pension capacity).",
          "Below those thresholds, or with most engagements inside IR35, the Ltd company route delivers little advantage over sole-trader status, and you carry the extra administrative cost and compliance burden for no real upside.",
        ],
      },
      {
        heading: "IR35 for locum dentists: what changed in 2021",
        body: [
          "From 6 April 2021, when the engaging practice is a medium or large client (which most NHS practices and dental groups are), the practice determines IR35 status for the engagement, not the locum's PSC. If the practice issues a Status Determination Statement saying 'inside IR35', PAYE-style deductions apply on the fees despite the Ltd co structure.",
          "In practice this means: a locum with five different practice engagements may have some engagements determined inside IR35 and others outside, with different tax treatment for each. We help work out the realistic post-tax outcome before any structural decision, not after.",
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
          "Travel between practices: deductible (not home-to-first-practice — that is commute)",
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
          "Not automatically. Below roughly £80,000–£100,000 of sustained locum income, the administrative cost of running a limited company rarely beats sole-trader status post-tax. The IR35 reforms have removed much of the historical advantage for locums whose engagements are now determined inside IR35. We model your specific income and engagement mix before recommending.",
      },
      {
        question: "Can I access the NHS Pension Scheme as a locum?",
        answer:
          "Self-employed sole-trader locums working under NHS contracts can usually access the NHS Pension Scheme via the practitioner pensions arrangement. Limited-company locums and umbrella locums face more restrictive access. This is a real factor in the structural decision and we factor it in.",
      },
      {
        question: "What happens if a practice issues me a 'inside IR35' determination?",
        answer:
          "If you're working through a limited company, the practice will operate PAYE-style deductions on your fees before paying your company. Your company receives the net. You pay no salary or dividend from the inside-IR35 engagement (drawing it out would be double-taxation). The result is similar to being PAYE-employed by the practice for that engagement, but with the additional Ltd-co overhead. You can challenge the determination but most are correctly issued.",
      },
      {
        question: "I work for an umbrella. What does the umbrella actually do?",
        answer:
          "The umbrella employs you under a contract of employment, runs PAYE on your earnings, deducts income tax and employee NI, and pays you the net. The engaging practice pays the umbrella, not you. The umbrella takes a fee (commonly £15-£30 per week or 1-2% of gross). Allowable expenses are very limited under umbrella arrangements. Umbrella is convenient and low-admin; tax-efficient it is not.",
      },
    ],
    relatedServices: [
      { href: "/services/dental-accountants", label: "Dental accountants overview" },
      { href: "/services/associate-tax", label: "Associate tax" },
      { href: "/services/practice-accounting", label: "Practice accounting" },
    ],
    ctaHeading: "Get your locum structure right",
    ctaBody:
      "Book a 30-minute scoping call. We will model your income against all three structures and tell you which one wins on real numbers.",
  },
};

export const SERVICE_SLUGS = Object.keys(SERVICE_SUB_PAGES);
