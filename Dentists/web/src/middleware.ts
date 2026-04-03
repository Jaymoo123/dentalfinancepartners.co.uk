import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SLUG_TO_CATEGORY_MAP: Record<string, string> = {
  "associate-dentist-agreements-financial-clauses": "associate-tax",
  "associate-dentist-expenses-tax-deductions": "associate-tax",
  "associate-dentist-maternity-leave-financial-planning": "associate-tax",
  "associate-dentist-tax-calculator-uk": "associate-tax",
  "associate-dentist-tax-guide-uk": "associate-tax",
  "associate-dentist-tax-self-assessment-uk": "associate-tax",
  "associate-dentist-vat-registration-uk": "vat-and-compliance",
  "associate-to-practice-owner-financial-planning-uk": "buying-a-practice",
  "associate-to-practice-owner-financial-transition-guide": "buying-a-practice",
  "business-asset-disposal-relief-dentists-what-qualifies": "practice-finance",
  "capital-allowances-dental-equipment-tax-relief-guide-2026": "practice-accounting",
  "capital-gains-tax-selling-dental-practice-uk": "practice-finance",
  "corporation-tax-dental-limited-companies-guide": "practice-accounting",
  "cost-setting-up-dental-practice-uk": "practice-finance",
  "cqc-inspection-costs-tax-deductible-expenses-uk-dentists": "vat-and-compliance",
  "dental-accountant-london-how-to-choose-specialist": "practice-accounting",
  "dental-accountant-manchester-specialist-knowledge": "practice-accounting",
  "dental-associate-vs-self-employed-tax-employment-status": "associate-tax",
  "dental-group-structure-multiple-sites-uk": "practice-finance",
  "dental-practice-accountant-manchester": "practice-accounting",
  "dental-practice-benchmarking-profitable": "practice-finance",
  "dental-practice-corporation-tax-rates-2026-small-profits-main-rate": "practice-accounting",
  "dental-practice-exit-planning-uk": "practice-finance",
  "dental-practice-financial-planning-strategic-management-guide": "practice-finance",
  "dental-practice-goodwill-buying-selling": "buying-a-practice",
  "dental-practice-insurance-business-expense-claims": "practice-accounting",
  "dental-practice-insurance-tax-deductible-expenses-guide": "practice-accounting",
  "dental-practice-lease-vs-buy-decision-framework": "buying-a-practice",
  "dental-practice-management-accounts-metrics-tracking": "practice-accounting",
  "dental-practice-overhead-costs-management-control": "practice-finance",
  "dental-practice-profit-extraction-uk": "practice-finance",
  "dental-practice-profit-margin-benchmarking-optimization-uk": "practice-finance",
  "dental-practice-rd-tax-credits-eligibility-claims": "practice-accounting",
  "dental-practice-software-accounting-integration": "practice-accounting",
  "dental-practice-valuation-methods-uk": "buying-a-practice",
  "dental-practice-vat-compliance-guide-uk": "vat-and-compliance",
  "dental-practice-vat-registration-threshold-changes-2026": "vat-and-compliance",
  "dental-practice-vat-registration-threshold-requirements": "vat-and-compliance",
  "dentist-pension-contributions-tax-relief-uk": "associate-tax",
  "dentist-self-assessment-filing-guide-2026": "associate-tax",
  "dentist-student-loan-repayment-tax-planning-guide": "associate-tax",
  "dentist-student-loan-repayment-tax-implications": "associate-tax",
  "equipment-finance-dental-practices-tax-implications": "practice-finance",
  "facial-aesthetics-vat-uk-dental-practices": "vat-and-compliance",
  "hiring-associate-dentist-costs-uk-financial-planning": "practice-finance",
  "hiring-first-associate-costs-structure-uk-dental": "practice-finance",
  "how-to-choose-dental-accountant-uk": "practice-accounting",
  "how-to-pay-yourself-dental-practice-owner-uk": "practice-finance",
  "inter-company-loans-dividends-dental-groups-uk": "practice-accounting",
  "ir35-dentists-associate-agreements-uk": "associate-tax",
  "laboratory-costs-dental-accounts-uk": "practice-accounting",
  "making-tax-digital-dental-practices-mtd-compliance": "vat-and-compliance",
  "making-tax-digital-dental-practices-mtd-guide": "vat-and-compliance",
  "maternity-paternity-leave-associate-dentists-uk": "associate-tax",
  "nhs-contract-payments-accounting-uk-dentists": "practice-accounting",
  "nhs-dental-contract-accounting-payment-processing": "practice-accounting",
  "nhs-private-mix-dental-accounts": "practice-accounting",
  "nhs-superannuation-pension-annual-allowance-dentists": "associate-tax",
  "nhs-superannuation-pension-annual-allowance-uk-dentists": "associate-tax",
  "nhs-uda-rates-2026-27-practice-finances": "practice-finance",
  "payment-on-account-uk-dentists-guide": "associate-tax",
  "pension-contributions-dentists-tax-relief-annual-allowance": "associate-tax",
  "practice-acquisition-financial-due-diligence": "buying-a-practice",
  "private-dental-practice-tax-complete-financial-guide": "practice-accounting",
  "r-and-d-tax-credits-dental-practices-eligibility-uk": "practice-accounting",
  "reading-dental-practice-profit-loss-account-uk": "practice-accounting",
  "reasonable-profit-margin-dental-practice-uk": "practice-finance",
  "self-assessment-registration-dentist-uk": "associate-tax",
  "sole-trader-vs-limited-company-dentists-uk": "practice-finance",
  "student-loan-repayments-dentists-calculation": "associate-tax",
  "when-does-dental-practice-need-audit-uk": "practice-accounting",
};

const DUPLICATE_REDIRECTS: Record<string, string> = {
  "associate-dentist-expenses-tax-deductions": "/blog/associate-tax/associate-dentist-tax-guide-uk",
  "associate-dentist-maternity-leave-financial-planning": "/blog/associate-tax/maternity-paternity-leave-associate-dentists-uk",
  "associate-dentist-tax-self-assessment-uk": "/blog/associate-tax/associate-dentist-tax-guide-uk",
  "associate-to-practice-owner-financial-planning-uk": "/blog/buying-a-practice/associate-to-practice-owner-financial-transition-guide",
  "dental-practice-accountant-manchester": "/blog/practice-accounting/dental-accountant-manchester-specialist-knowledge",
  "dental-practice-benchmarking-profitable": "/blog/practice-finance/dental-practice-profit-margin-benchmarking-optimization-uk",
  "dental-practice-insurance-business-expense-claims": "/blog/practice-accounting/dental-practice-insurance-tax-deductible-expenses-guide",
  "dental-practice-vat-registration-threshold-changes-2026": "/blog/vat-and-compliance/dental-practice-vat-registration-threshold-requirements",
  "dentist-student-loan-repayment-tax-implications": "/blog/associate-tax/student-loan-repayments-dentists-calculation",
  "hiring-associate-dentist-costs-uk-financial-planning": "/blog/practice-finance/hiring-first-associate-costs-structure-uk-dental",
  "making-tax-digital-dental-practices-mtd-compliance": "/blog/vat-and-compliance/making-tax-digital-dental-practices-mtd-guide",
  "nhs-dental-contract-accounting-payment-processing": "/blog/practice-accounting/nhs-contract-payments-accounting-uk-dentists",
  "nhs-superannuation-pension-annual-allowance-dentists": "/blog/associate-tax/nhs-superannuation-pension-annual-allowance-uk-dentists",
  "pension-contributions-dentists-tax-relief-annual-allowance": "/blog/associate-tax/dentist-pension-contributions-tax-relief-uk",
  "r-and-d-tax-credits-dental-practices-eligibility-uk": "/blog/practice-accounting/dental-practice-rd-tax-credits-eligibility-claims",
  "reasonable-profit-margin-dental-practice-uk": "/blog/practice-finance/dental-practice-profit-margin-benchmarking-optimization-uk",
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const oldBlogMatch = pathname.match(/^\/blog\/([^\/]+)$/);
  if (oldBlogMatch) {
    const slug = oldBlogMatch[1];
    const categorySlug = SLUG_TO_CATEGORY_MAP[slug];
    if (categorySlug) {
      return NextResponse.redirect(new URL(`/blog/${categorySlug}/${slug}`, request.url), 301);
    }
  }

  const oldCategoryMatch = pathname.match(/^\/blog\/category\/([^\/]+)$/);
  if (oldCategoryMatch) {
    const categorySlug = oldCategoryMatch[1];
    return NextResponse.redirect(new URL(`/blog/${categorySlug}`, request.url), 301);
  }

  const nestedMatch = pathname.match(/^\/blog\/[^\/]+\/([^\/]+)$/);
  if (nestedMatch) {
    const slug = nestedMatch[1];
    const target = DUPLICATE_REDIRECTS[slug];
    if (target) {
      return NextResponse.redirect(new URL(target, request.url), 301);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/blog/:path*"],
};
