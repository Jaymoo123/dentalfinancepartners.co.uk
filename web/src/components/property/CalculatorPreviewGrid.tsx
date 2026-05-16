import Link from "next/link";

const calculators = [
  {
    id: "section24",
    icon: "📊",
    title: "Section 24 Tax Calculator",
    description: "Calculate how much Section 24 mortgage interest restriction is costing you each year.",
    demoInput: "£50k rental income, £20k mortgage interest",
    demoOutput: "Extra tax: £4,400/year",
    href: "/calculators#section24",
  },
  {
    id: "incorporation",
    icon: "🏢",
    title: "Incorporation Cost Calculator",
    description: "Work out the upfront CGT and SDLT costs of transferring properties to a limited company.",
    demoInput: "£400k property value, £200k mortgage",
    demoOutput: "Total cost: £28,000 (CGT + SDLT)",
    href: "/calculators#incorporation",
  },
  {
    id: "mtd",
    icon: "📅",
    title: "MTD Checker",
    description: "Find out if you need Making Tax Digital from April 2026 based on your income.",
    demoInput: "£55k rental + £20k employment income",
    demoOutput: "MTD required: YES (over £50k)",
    href: "/calculators#mtd",
  },
  {
    id: "portfolio",
    icon: "💼",
    title: "Portfolio Profitability",
    description: "Track net profit and yield for each property in your portfolio.",
    demoInput: "5 properties, £120k total income",
    demoOutput: "Avg net yield: 6.2%",
    href: "/calculators#portfolio",
  },
];

export function CalculatorPreviewGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {calculators.map((calc) => (
        <Link
          key={calc.id}
          href={calc.href}
          className="group rounded-xl border-2 border-slate-200 bg-white p-6 transition-all hover:border-emerald-600 hover:shadow-lg"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-50 text-2xl">
            {calc.icon}
          </div>
          <h3 className="mt-4 text-lg font-bold text-slate-900">{calc.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">{calc.description}</p>
          <div className="mt-4 rounded-lg bg-emerald-50 p-4">
            <div className="text-xs font-bold text-emerald-900 mb-2">Example:</div>
            <div className="text-xs text-slate-700 mb-2">{calc.demoInput}</div>
            <div className="text-sm font-bold text-emerald-700">{calc.demoOutput}</div>
          </div>
          <div className="mt-4 text-sm font-bold text-emerald-700 group-hover:text-emerald-600 transition-colors">
            Try calculator →
          </div>
        </Link>
      ))}
    </div>
  );
}
