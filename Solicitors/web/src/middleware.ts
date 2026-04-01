import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const GUIDE_TO_CATEGORY_MAP: Record<string, string> = {
  "sra-compliance": "sra-compliance-trust-accounting",
  "partnership-tax": "partnership-llp-accounting",
  "sole-practitioner-tax": "sole-practitioner-tax",
  "practice-succession": "practice-succession-sale",
  "practice-finance": "practice-finance-cash-flow",
  "vat-compliance": "vat-compliance",
};

const SLUG_TO_CATEGORY_MAP: Record<string, string> = {
  "accountant-for-solicitors": "practice-finance-cash-flow",
  "basis-period-reform-law-firms": "partnership-llp-accounting",
  "best-accountant-for-solicitors": "practice-finance-cash-flow",
  "client-money-accounting-solicitors": "sra-compliance-trust-accounting",
  "cofa-responsibilities-accounting": "sra-compliance-trust-accounting",
  "counsel-fees-vat-guide-uk-law-firms": "vat-compliance",
  "disbursements-vat-treatment-uk-law-firms": "vat-compliance",
  "how-to-find-a-solicitor-accountant": "practice-finance-cash-flow",
  "law-firm-accountant-guide": "practice-finance-cash-flow",
  "law-firm-accountant-leeds": "practice-finance-cash-flow",
  "law-firm-accountant-manchester": "practice-finance-cash-flow",
  "law-firm-accounting-services": "practice-finance-cash-flow",
  "law-firm-accounting-software-guide-uk-solicitors": "practice-finance-cash-flow",
  "law-firm-benchmarking-uk": "practice-finance-cash-flow",
  "law-firm-bookkeeping-services-uk-guide": "practice-finance-cash-flow",
  "law-firm-cash-flow-forecasting-guide": "practice-finance-cash-flow",
  "law-firm-cash-flow-management": "practice-finance-cash-flow",
  "law-firm-debt-management": "practice-finance-cash-flow",
  "law-firm-drawings-vs-profit": "partnership-llp-accounting",
  "law-firm-goodwill-valuation": "practice-succession-sale",
  "law-firm-lock-up-reduction": "practice-finance-cash-flow",
  "law-firm-partnership-tax-guide": "partnership-llp-accounting",
  "law-firm-payroll-services": "practice-finance-cash-flow",
  "law-firm-profit-extraction": "partnership-llp-accounting",
  "law-firm-succession-planning-guide-uk": "practice-succession-sale",
  "law-firm-valuation-guide-uk-solicitors": "practice-succession-sale",
  "leap-accounting-integration-guide": "practice-finance-cash-flow",
  "llp-conversion-tax-guide-uk-law-firms": "structure-incorporation",
  "llp-employer-ni-2026": "partnership-llp-accounting",
  "llp-member-taxation-guide-uk-law-firms": "partnership-llp-accounting",
  "llp-vs-partnership-tax": "partnership-llp-accounting",
  "making-tax-digital-solicitors": "sole-practitioner-tax",
  "mtd-for-income-tax-solicitors": "sole-practitioner-tax",
  "mtd-income-tax-solicitors": "sole-practitioner-tax",
  "partner-profit-allocation-uk-law-firms": "partnership-llp-accounting",
  "partner-retirement-planning-guide-uk-law-firms": "practice-succession-sale",
  "partner-retirement-planning-tax-financial-strategies": "partnership-llp-accounting",
  "sole-practitioner-solicitor-tax-guide-2025": "sole-practitioner-tax",
  "sole-practitioner-solicitor-tax-guide": "sole-practitioner-tax",
  "sole-practitioner-tax-deductions-guide": "sole-practitioner-tax",
  "solicitor-accountant-birmingham": "practice-finance-cash-flow",
  "solicitor-accountant-bristol": "partnership-llp-accounting",
  "solicitor-accountant-cost": "practice-finance-cash-flow",
  "solicitor-accountant-fees": "practice-finance-cash-flow",
  "solicitor-accountant-london": "partnership-llp-accounting",
  "solicitor-accountant-near-me": "practice-finance-cash-flow",
  "solicitor-accountant": "practice-finance-cash-flow",
  "solicitor-allowable-expenses-uk-tax-guide": "sole-practitioner-tax",
  "solicitor-client-account-reconciliation": "sra-compliance-trust-accounting",
  "solicitor-expenses-claims-tax-relief-guide": "sole-practitioner-tax",
  "solicitor-expenses-claims": "sole-practitioner-tax",
  "solicitor-partnership-accounting-guide": "partnership-llp-accounting",
  "solicitor-practice-exit-strategy": "practice-succession-sale",
  "solicitor-practice-finance-options": "practice-finance-cash-flow",
  "solicitor-practice-management-software": "practice-finance-cash-flow",
  "solicitor-practice-sale-guide": "practice-succession-sale",
  "solicitor-practice-valuation-guide": "practice-succession-sale",
  "solicitor-practice-working-capital": "practice-finance-cash-flow",
  "solicitor-professional-fees-tax": "sole-practitioner-tax",
  "solicitor-self-assessment-guide-uk-legal-professionals": "sole-practitioner-tax",
  "solicitor-self-assessment-uk-tax-guide": "sole-practitioner-tax",
  "solicitor-tax-return-guide": "sole-practitioner-tax",
  "solicitor-trust-accounting-guide": "sra-compliance-trust-accounting",
  "solicitor-vat-accounting-guide": "vat-compliance",
  "sra-accountants-report": "sra-compliance-trust-accounting",
  "sra-accounts-rules-compliance-guide": "sra-compliance-trust-accounting",
  "vat-on-legal-services": "vat-compliance",
  "vat-registration-solicitors": "vat-compliance",
  "what-does-a-solicitor-accountant-do": "sra-compliance-trust-accounting",
  "xero-for-solicitors": "practice-finance-cash-flow",
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/guides") {
    return NextResponse.redirect(new URL("/blog", request.url), 301);
  }

  if (pathname.startsWith("/guides/")) {
    const guideTopic = pathname.replace("/guides/", "");
    const categorySlug = GUIDE_TO_CATEGORY_MAP[guideTopic];
    if (categorySlug) {
      return NextResponse.redirect(new URL(`/blog/${categorySlug}`, request.url), 301);
    }
  }

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

  return NextResponse.next();
}

export const config = {
  matcher: ["/blog/:path*", "/guides/:path*"],
};
