// No active middleware. Keep file present in case routes/i18n added later.
// Empty matcher means middleware does not run on any request.
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(_request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [],
};
