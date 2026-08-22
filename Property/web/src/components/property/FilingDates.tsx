/**
 * The filing calendar as a figure. Every date, threshold and rate here is
 * already stated in the prose beside it — this adds a scannable index of them,
 * it does not replace the text, which carries the search terms.
 *
 * Two registers, kept apart on purpose: dates that recur every year, and dates
 * that are coming once. Mixing them is what makes people file the 31 July
 * payment on account against an April MTD deadline.
 *
 * Server component, no JavaScript.
 *
 * CARVE-OUT 1, applied in Phase 6.7. `AHEAD` stopped at April 2027 / £30,000.
 * House positions section 3 locks a third step, £20,000 from 6 April 2028, and
 * report 03 section 8.4 item 4 records the missing step as a defect on both
 * sides everywhere except /making-tax-digital-landlords. The April 2028 tile is
 * added rather than the ladder being left two thirds written, because the page
 * this figure indexes states all three steps in its own prose and rule 34 says
 * a figure's numbers must match the page's copy.
 */

const ANNUAL = [
  {
    month: "January",
    day: "31",
    title: "File and pay",
    detail:
      "Online filing and payment for the tax year that ended the previous 5 April, plus the first payment on account.",
  },
  {
    month: "July",
    day: "31",
    title: "Second payment on account",
    detail: "Due where the previous year's liability was more than £1,000.",
  },
];

/**
 * A tear-off desk calendar page: binding holes, month band, then the figure.
 *
 * The month sits before the figure in the DOM, so a screen reader announces
 * "January 31" or "April 2026" as ordinary text and the tile needs no
 * alternative label. Only the binding holes are hidden, being pure decoration.
 *
 * `tone` separates the two registers at a glance: emerald for the dates that
 * come round every year, navy for the one-off changes ahead. Without it, eight
 * identical tiles would read as eight equivalent deadlines.
 */
function CalendarTile({
  month,
  figure,
  tone = "emerald",
}: {
  month: string;
  figure: string;
  tone?: "emerald" | "navy";
}) {
  return (
    <div className="w-[4.5rem] shrink-0 overflow-hidden rounded-lg bg-white shadow-md ring-1 ring-slate-200">
      <div aria-hidden className="flex items-center justify-center gap-3 bg-slate-100 py-1">
        <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
        <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
      </div>
      <div
        className={`py-1 text-center text-[10px] font-bold uppercase tracking-wider text-white ${
          tone === "navy" ? "bg-slate-900" : "bg-emerald-600"
        }`}
      >
        {month}
      </div>
      {/* A four-digit year cannot carry the day's type size in a 4.5rem tile. */}
      <div
        className={`py-2.5 text-center font-bold leading-none text-slate-900 ${
          figure.length > 2 ? "text-xl" : "text-3xl"
        }`}
      >
        {figure}
      </div>
    </div>
  );
}

const AHEAD = [
  {
    month: "April",
    year: "2026",
    title: "Making Tax Digital at £50,000",
    detail: "Quarterly updates in compatible software once qualifying income passes £50,000.",
  },
  {
    month: "April",
    year: "2027",
    title: "MTD at £30,000, and new property rates",
    detail:
      "MTD extends to qualifying income over £30,000. Property income is taxed at 22%, 42% and 47%, and the finance cost reducer rises to 22%.",
  },
  {
    month: "April",
    year: "2028",
    title: "MTD at £20,000",
    detail: "The last step of the ladder: quarterly updates once qualifying income passes £20,000.",
  },
];

export function FilingDates() {
  return (
    <div className="mt-8 sm:mt-10">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Every year, UK dates</p>
      <div className="mt-3 grid gap-4 sm:grid-cols-2 sm:gap-5">
        {ANNUAL.map((item) => (
          <div
            key={item.title}
            className="flex items-start gap-4 rounded-xl bg-white p-6 ring-1 ring-slate-200/70 sm:gap-5 sm:p-7"
          >
            <CalendarTile month={item.month} figure={item.day} />
            <div className="min-w-0">
              <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-700">{item.detail}</p>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-8 text-xs font-semibold uppercase tracking-wide text-slate-500">Already in the diary</p>
      <ol className="mt-3 grid gap-4 sm:grid-cols-2 sm:gap-5">
        {AHEAD.map((item) => (
          <li
            key={item.year}
            className="flex items-start gap-4 rounded-xl bg-white p-6 ring-1 ring-slate-200/70 sm:gap-5 sm:p-7"
          >
            <CalendarTile month={item.month} figure={item.year} tone="navy" />
            <div className="min-w-0">
              <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-700">{item.detail}</p>
            </div>
          </li>
        ))}
      </ol>

      <p className="mt-6 text-[11px] leading-relaxed text-slate-500">
        Living abroad does not move any of these dates, and neither does using an agent.
      </p>
    </div>
  );
}
