import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { BlogCategoryHub } from "@/components/blog/BlogCategoryHub";

const categoryName = "Property Finance";
const categorySlug = "property-finance";
const description =
  "How buy-to-let, limited company, commercial, bridging and development finance work for UK property, and the tax questions each one raises.";

export const metadata: Metadata = {
  title: `${categoryName} for UK Landlords and Investors`,
  description,
  alternates: {
    canonical: `${siteConfig.url}/blog/${categorySlug}`,
  },
  openGraph: {
    title: `${categoryName} for UK Landlords and Investors`,
    description,
    url: `${siteConfig.url}/blog/${categorySlug}`,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${categoryName} for UK Landlords and Investors`,
    description,
  },
};

export default function PropertyFinancePage() {
  return (
    <BlogCategoryHub
      categoryName={categoryName}
      categorySlug={categorySlug}
      collectionName={`${categoryName} for UK Landlords and Investors`}
      description={description}
      intro="How landlords, investors and developers fund property. Buy-to-let and limited company mortgages, commercial lending, bridging, development finance, and the tax question that sits alongside each one."
      sections={[
        {
          heading: "Buy-to-let and limited company mortgages",
          paragraphs: [
            "Most landlord borrowing is a buy-to-let mortgage, priced and stress-tested very differently from a residential loan. Lenders assess the rent against an interest coverage ratio (ICR), typically 125% for a basic-rate or company borrower and 145% for a higher-rate individual, at a notional stress rate rather than the pay rate. Deposit requirements usually start at 20% to 25% of value, and rates are driven by loan-to-value, product type and whether the borrower is an individual or a limited company.",
            "Since Section 24 removed full interest relief for personally held lettings, many higher-rate landlords hold property through a special purpose vehicle (SPV) company, where interest is still deducted in full before corporation tax. That is a finance decision with a large tax overlay, and the two need to be read together rather than in isolation.",
          ],
        },
        {
          heading: "Commercial mortgages",
          paragraphs: [
            "Commercial and semi-commercial mortgages fund shops, offices, industrial units and mixed-use property, whether owner-occupied by a trading business or held as an investment. Lending is assessed on the strength of the business or the tenant covenant rather than a simple rent multiple, terms are usually shorter than residential, and many facilities are on a variable or margin-over-base basis. These are business loans and are not regulated in the way a residential mortgage is.",
            "The tax treatment is distinct too. Section 24 does not apply to commercial property, so interest is fully relievable, and capital allowances, the structures and buildings allowance and VAT (including the option to tax) all shape the real cost of ownership.",
          ],
        },
        {
          heading: "Bridging finance",
          paragraphs: [
            "Bridging finance is short-term, interest-first lending used to move quickly: buying at auction inside the 28-day completion window, funding a refurbishment before refinancing onto a term mortgage (a bridge-to-let), breaking a chain, or securing a below-market-value purchase. It is priced monthly, secured on the asset, and repaid from a defined exit such as a sale or a remortgage. Investment and business bridging is unregulated lending, distinct from a regulated bridge secured on someone's own home.",
            "The tax questions bridging raises are frequently overlooked, in particular whether the interest is an allowable finance cost and how it interacts with the eventual term financing. That is where the numbers are won or lost.",
          ],
        },
        {
          heading: "Development finance",
          paragraphs: [
            "Development finance funds ground-up construction and heavy refurbishment, released in stages against build progress rather than as a single lump sum. Lenders size facilities against gross development value (GDV) and loan-to-cost (LTC), retain an interest roll-up, and look closely at the developer's experience and the exit. Development exit finance can then replace a development loan once a scheme is complete but not yet sold, easing cash flow and reducing the rate.",
            "Development profits are usually taxed as trading income, not capital gains, so the funding structure and the tax structure of a scheme should be planned together from the outset.",
          ],
        },
        {
          heading: "Portfolio finance and capital raising",
          paragraphs: [
            "Portfolio landlords face their own lending rules, including aggregate stress testing across all mortgaged properties and lender caps on portfolio size. Remortgaging to release equity is the usual way to fund the next purchase, but capital raised for a genuine business purpose is treated very differently from borrowing drawn for personal use, both for lending and for the finance-cost relief calculation. Getting that distinction right protects both the deal and the tax position.",
          ],
        },
      ]}
      cta={{
        heading: "Planning the tax side of a property finance decision?",
        body: "Every financing choice, from an SPV buy-to-let mortgage to bridging or a development facility, carries a tax question alongside it: interest relief, incorporation, capital allowances, and how the borrowing is structured. Our property tax specialists can help you read the finance and the tax together before you commit.",
        submitLabel: "Request a property tax consultation",
      }}
    />
  );
}
