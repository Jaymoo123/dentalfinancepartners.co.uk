/**
 * Canonical hub/guide pages, one per major topic. Single source of truth so the
 * homepage ("tax areas a property accountant handles") and the /blog index
 * ("Essential guides") link to the SAME canonical hub for each topic. This is
 * the navigation-level consolidation: satellites point up to these hubs rather
 * than competing with them. Edit here to re-point a topic everywhere at once.
 */
export type EssentialGuide = { title: string; href: string; blurb: string };

export const essentialGuides: EssentialGuide[] = [
  {
    title: "Section 24 finance-cost relief",
    href: "/blog/section-24-and-tax-relief/section-24-tax-relief-complete-guide",
    blurb: "Mortgage interest has not been a deductible expense since 6 April 2020. We model the 20% basic-rate credit and the higher-rate wedge so you see your true taxable profit, not just your cash profit.",
  },
  {
    title: "Making Tax Digital for Income Tax",
    href: "/blog/making-tax-digital-mtd/making-tax-digital-property-income-2026-complete-guide",
    blurb: "Quarterly digital filing has been live since 6 April 2026 for landlords over £50,000, dropping to £30,000 in 2027 and £20,000 in 2028. We handle software, category mapping, and the quarterly submissions.",
  },
  {
    title: "Capital gains tax on disposals",
    href: "/blog/capital-gains-tax/capital-gains-tax-property-complete-guide-uk",
    blurb: "Residential gains are taxed at 18% and 24% and must be reported and paid within 60 days of completion. We prepare the computation, apply any reliefs, and file inside the window.",
  },
  {
    title: "Stamp Duty Land Tax",
    href: "/blog/landlord-tax-essentials/sdlt-buy-to-let-rates-surcharge-guide-2025",
    blurb: "The 5% additional-dwellings surcharge (since 31 October 2024) and the 17% enveloped-dwelling rate change the maths on every purchase and transfer. We cost it before you commit.",
  },
  {
    title: "Incorporation and limited companies",
    href: "/blog/incorporation-and-company-structures/buy-to-let-limited-company-complete-guide-uk",
    blurb: "We run the corporation tax saving against the SDLT and CGT cost of transferring properties in, then handle company accounts, CT600s, and tax-efficient profit extraction.",
  },
  {
    title: "Inheritance tax and succession",
    href: "/blog/landlord-tax-essentials/inheritance-tax-rental-property-uk-guide",
    blurb: "Property is illiquid and routinely pushes an estate over the nil-rate band. We plan lifetime gifting, trusts, and share transfers alongside your ownership structure, not in isolation.",
  },
  {
    title: "VAT on commercial and mixed-use",
    href: "/blog/landlord-tax-essentials/landlord-vat-registration-when-required",
    blurb: "Commercial lettings, the option to tax, and conversions carry VAT treatment that residential lets do not. We get the registration, recovery, and option-to-tax decisions right.",
  },
  {
    title: "Non-Resident Landlord Scheme",
    href: "/blog/non-resident-landlord-tax/non-resident-landlord-scheme-uk-complete-guide",
    blurb: "Overseas landlords can receive rents gross under the NRLS instead of suffering 20% withholding. We register you (NRL1 or NRL2) and keep the UK filing in order.",
  },
  {
    title: "ATED on company-held property",
    href: "/blog/incorporation-and-company-structures/ated-complete-guide-2026-27",
    blurb: "Residential property over £500,000 held in a company needs an annual ATED return, with relief for genuine lettings filed by 30 April. We file the relief return on time so no charge arises.",
  },
  {
    title: "Let Property Campaign disclosures",
    href: "/blog/landlord-tax-essentials/let-property-campaign-disclosure-mechanics-undeclared-rental-income-2026",
    blurb: "If rental income has gone unreported, the HMRC Let Property Campaign is the route to regularise it on the best available terms. We manage the disclosure from first contact to settlement.",
  },
  {
    title: "Capital allowances",
    href: "/blog/property-types-and-specialist-tax/capital-allowances-on-property",
    blurb: "Fixtures and integral features in qualifying property carry allowances that are easy to miss. We separate revenue repairs from capital improvements and claim what is genuinely due.",
  },
  {
    title: "Self Assessment and rental schedules",
    href: "/blog/landlord-tax-essentials/sa105-property-income-form-2026-complete-guide",
    blurb: "SA105 property pages, every allowable expense captured, and a return that stands up to an HMRC enquiry. The annual baseline we get right for every landlord client.",
  },
];
