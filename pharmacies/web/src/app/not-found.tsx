import type { Metadata } from "next";
import Link from "next/link";
import { btnPrimary, sectionY } from "@/components/ui/layout-utils";
import { CONSOLE_NOINDEX_META } from "@accounting-network/web-shared/console/consoleAuth";

// A 404 inherits the layout's canonical/JSON-LD/meta by default, which makes
// it look like a real indexable page (P0B #12/#6). noindex is enough here;
// no canonical is needed on a page that doesn't exist.
export const metadata: Metadata = CONSOLE_NOINDEX_META;

export default function NotFound() {
  return (
    <div className={`mx-auto w-full max-w-lg min-w-0 px-4 sm:px-6 lg:px-8 ${sectionY} text-center`}>
      <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">Page not found</h1>
      <p className="mt-4 text-base leading-relaxed text-slate-500">
        The page you requested does not exist or has moved.
      </p>
      <p className="mt-8 flex justify-center">
        <Link href="/" className={`${btnPrimary} w-full max-w-xs sm:w-auto`}>
          Back to homepage
        </Link>
      </p>
    </div>
  );
}
