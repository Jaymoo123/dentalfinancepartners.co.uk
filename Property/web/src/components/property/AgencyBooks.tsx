import { Building2, Landmark } from "lucide-react";

/**
 * An agency's two sets of books, side by side.
 *
 * The section's own first line is the best diagram on the page: an agency keeps
 * its own money and other people's, and almost every obligation an agent gets
 * wrong sits on one side or the other.
 *
 * Structure does the explaining here, so it is drawn rather than implied. Each
 * side is a closed panel with its own header strip, and inside it every row is
 * the same shape — a short label, then one sentence — separated by a rule that
 * runs the full width of the panel. Bodies are kept to a single line each: two
 * columns of ragged multi-sentence text is what made the earlier version read
 * as a wall rather than a comparison.
 *
 * Not a chart. No quantities here, so no scale and no palette — the emerald and
 * slate headers are the site's own, doing the job of telling the sides apart.
 */

type Entry = { label: string; detail: string };

const OWN_BOOKS: Entry[] = [
  { label: "Commission and management fees", detail: "Recognised when earned, not when the rent clears." },
  { label: "VAT on fees", detail: "Including fees disbursed on behalf of a landlord." },
  { label: "Payroll for negotiators", detail: "Commission, and employer NI at 15% above £5,000." },
];

const CLIENT_MONEY: Entry[] = [
  { label: "Client account reconciliations", detail: "A regulatory problem before it is a tax one." },
  { label: "Rent held for landlords", detail: "Passes through without ever being agency income." },
  { label: "Non-resident landlord scheme", detail: "You deduct and report for overseas landlords." },
];

function Panel({
  icon: Icon,
  label,
  caption,
  entries,
  accent,
}: {
  icon: typeof Building2;
  label: string;
  caption: string;
  entries: Entry[];
  accent: "emerald" | "slate";
}) {
  const header =
    accent === "emerald"
      ? "border-emerald-100 bg-emerald-50 text-emerald-800"
      : "border-slate-200 bg-slate-100 text-slate-700";
  const badge = accent === "emerald" ? "text-emerald-600" : "text-slate-500";

  return (
    <div className="overflow-hidden rounded-xl ring-1 ring-slate-200">
      <div className={`flex items-center gap-3 border-b px-5 py-4 ${header}`}>
        <Icon aria-hidden className={`h-5 w-5 shrink-0 ${badge}`} strokeWidth={1.75} />
        <span className="min-w-0">
          <span className="block text-sm font-bold leading-tight">{label}</span>
          <span className="block text-xs leading-tight opacity-80">{caption}</span>
        </span>
      </div>
      <ul className="divide-y divide-slate-100 bg-white">
        {entries.map((entry) => (
          <li key={entry.label} className="px-5 py-4">
            <p className="text-sm font-bold text-slate-900">{entry.label}</p>
            <p className="mt-1 text-xs leading-relaxed text-slate-600">{entry.detail}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function AgencyBooks() {
  return (
    <div className="mt-8 grid gap-5 md:grid-cols-2 md:gap-6">
      <Panel
        icon={Building2}
        label="The agency's own books"
        caption="Your money"
        entries={OWN_BOOKS}
        accent="emerald"
      />
      <Panel
        icon={Landmark}
        label="The client account"
        caption="Other people's money"
        entries={CLIENT_MONEY}
        accent="slate"
      />
    </div>
  );
}
