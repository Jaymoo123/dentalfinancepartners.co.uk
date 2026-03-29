import Link from "next/link";

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  href: string;
}

function ServiceCard({ icon, title, description, href }: ServiceCardProps) {
  return (
    <Link href={href} className="service-icon-card group">
      <div className="service-icon group-hover:scale-110 transition-transform duration-200">
        {icon}
      </div>
      <h3 className="group-hover:text-emerald-700 transition-colors">{title}</h3>
      <p>{description}</p>
      <span className="mt-auto text-sm font-semibold text-emerald-600 group-hover:text-emerald-700">
        Learn more →
      </span>
    </Link>
  );
}

export function ServiceIconGrid() {
  const services = [
    {
      icon: "📊",
      title: "Section 24 Planning",
      description: "Calculate your tax impact and explore mitigation strategies for mortgage interest restriction.",
      href: "/calculators#section-24",
    },
    {
      icon: "🏢",
      title: "Incorporation Analysis",
      description: "Full feasibility modeling with CGT, SDLT costs, and break-even timeline for your portfolio.",
      href: "/incorporation",
    },
    {
      icon: "📱",
      title: "MTD Compliance",
      description: "Quarterly reporting setup and software integration for the April 2026 deadline.",
      href: "/calculators#mtd",
    },
    {
      icon: "💷",
      title: "CGT Planning",
      description: "Property disposal strategies, PPR relief, and tax-efficient exit planning.",
      href: "/services",
    },
    {
      icon: "📈",
      title: "Portfolio Reporting",
      description: "Property-level profitability analysis, yield tracking, and management accounts.",
      href: "/calculators#yield",
    },
    {
      icon: "🔍",
      title: "Acquisition Support",
      description: "Due diligence, structuring advice, and financial modeling for new purchases.",
      href: "/services",
    },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <ServiceCard key={service.title} {...service} />
      ))}
    </div>
  );
}
