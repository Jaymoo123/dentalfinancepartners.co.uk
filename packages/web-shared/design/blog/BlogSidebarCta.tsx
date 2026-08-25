import { focusRing } from "../layout-utils";

export type BlogSidebarCtaCopy = { heading: string; body: string };

/**
 * Navy conversion card that sits above "On this page" in the desktop sidebar.
 * It borrows the article's own enquiry-form copy (per-category, resolved by
 * the host's article renderer) so the shoutout and the form it points at
 * always say the same thing and cannot drift.
 *
 * The button is an anchor to #enquiry-form rather than a popup on purpose:
 * the site holds one lead form per surface, and a modal would put a second
 * seven-field form in the DOM. The jump lands on the exact form the card
 * quotes, which already carries scroll-mt-24.
 *
 * Headings are plain <p> elements: this is an aside, and it must not inject
 * itself into the article's h2 outline or the table of contents.
 */
export function BlogSidebarCta({ copy }: { copy: BlogSidebarCtaCopy }) {
  return (
    <div className="rounded-xl bg-slate-900 p-6">
      <p className="text-lg font-bold leading-snug text-white">{copy.heading}</p>
      <p className="mt-3 text-sm leading-relaxed text-slate-300">{copy.body}</p>
      <a
        href="#enquiry-form"
        data-cta="blog_sidebar_book"
        data-cta-placement="sidebar"
        data-cta-goal="form"
        className={`mt-5 inline-flex min-h-12 w-full touch-manipulation items-center justify-center rounded-xl bg-primary-600 px-4 py-3 text-base font-bold text-white transition-colors hover:bg-primary-700 active:bg-primary-800 ${focusRing}`}
      >
        Book a call
      </a>
      <p className="mt-3 text-center text-xs text-slate-400">
        Free, no obligation. The form is just below.
      </p>
    </div>
  );
}
