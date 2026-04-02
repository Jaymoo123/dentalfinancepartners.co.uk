import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const DUPLICATE_REDIRECTS: Record<string, string> = {
  "accountant-bookkeeping-medical-professionals": "/blog/gp-bookkeeping-guide-uk",
  "accountant-corporation-tax": "/blog/gp-corporation-tax",
  "accountant-financial-planning-uk-medical-professionals": "/blog/gp-financial-planning",
  "accountant-payroll-services": "/blog/gp-payroll-services",
  "accountant-tax-advice-medical-professionals": "/blog/gp-tax-advice",
  "accountant-tax-planning-medical-professionals": "/blog/gp-tax-advice",
  "accountant-tax-return": "/blog/gp-tax-return",
  "accountant-vat-registration": "/blog/gp-vat-registration",
  "affordable-gp-accountant": "/blog/gp-accountant",
  "best-gp-accountant-manchester": "/blog/gp-accountant-manchester",
  "gp-accountant-access": "/blog/gp-accountant",
  "gp-accounting-system": "/blog/gp-accounting-software",
  "gp-tax-accountant-bristol": "/blog/gp-accountant-bristol",
  "local-gp-accountant": "/blog/gp-accountant",
  "private-practice-incorporation-complete-guide": "/blog/medical-practice-incorporation-step-by-step",
  "specialist-gp-accountant": "/blog/gp-accountant",
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const blogMatch = pathname.match(/^\/blog\/([^\/]+)$/);
  if (blogMatch) {
    const slug = blogMatch[1];
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
