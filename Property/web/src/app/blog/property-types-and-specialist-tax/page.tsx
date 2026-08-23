import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { BlogCategoryHub } from "@/components/blog/BlogCategoryHub";
import { PAGE_SUMMARIES } from "@/lib/page-summaries";

const categoryName = "Property Types & Specialist Tax";
const categorySlug = "property-types-and-specialist-tax";
const description =
  "Tax guidance for specialist property types: HMOs, commercial property, serviced accommodation, holiday lets, student housing and development.";

export const metadata: Metadata = {
  title: `${categoryName} for UK Landlords`,
  description,
  alternates: {
    canonical: `${siteConfig.url}/blog/${categorySlug}`,
  },
  openGraph: {
    title: `${categoryName} for UK Landlords`,
    description: `Tax guidance for specialist property types: HMOs, commercial, serviced accommodation, holiday lets, and development.`,
    url: `${siteConfig.url}/blog/${categorySlug}`,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${categoryName} for UK Landlords`,
    description: `Tax guidance for specialist property types: HMOs, commercial, serviced accommodation, and development.`,
  },
};

export default function PropertyTypesPage() {
  return (
    <BlogCategoryHub
      categoryName={categoryName}
      categorySlug={categorySlug}
      collectionName={`${categoryName} for UK Landlords`}
      description={description}
      /* One copy, in `PAGE_SUMMARIES`, so the hub intro and every related-
         reading card pointing at this hub cannot drift apart. */
      intro={PAGE_SUMMARIES["/blog/property-types-and-specialist-tax"]}
      sections={[
        {
          heading: "HMOs and multi-tenant properties",
          paragraphs: [
            "Houses in multiple occupation carry unique tax considerations beyond standard buy-to-let. Licensing costs, communal area expenses, room-by-room income allocation, and higher maintenance requirements all affect the tax position. HMOs may also attract business rates rather than council tax depending on the property configuration and local authority rules.",
            "Section 24 mortgage interest restrictions hit HMO landlords particularly hard because higher gross rents often push total income into higher tax bands, while the restricted relief remains at the basic rate. Understanding how to structure HMO income and expenses correctly is essential for accurate tax returns and effective planning.",
          ],
        },
        {
          heading: "Commercial property",
          paragraphs: [
            "Commercial property investment operates under a different tax framework from residential. Section 24 mortgage interest restrictions do not apply to commercial property held personally, so full interest deductions remain available. Capital allowances on plant and machinery, structures and buildings allowance (SBA), and the treatment of business rates create additional planning opportunities that residential landlords do not have.",
            "VAT is a critical consideration for commercial property. Most commercial rents are exempt from VAT unless the landlord has opted to tax the property, which locks in for 20 years but allows recovery of input VAT on costs. The decision to opt to tax should be made carefully, considering the VAT status of tenants and the long-term implications.",
          ],
        },
        {
          heading: "Serviced accommodation and holiday lets",
          paragraphs: [
            "The furnished holiday lettings (FHL) tax regime was abolished from April 2025, removing several significant tax advantages that short-term rental operators previously enjoyed. Former FHL properties no longer qualify for capital allowances on furniture, business asset disposal relief on sale, or the ability to make pension contributions based on rental profits.",
            "Post-abolition, serviced accommodation income is taxed as property income under the same rules as standard buy-to-let, including Section 24 mortgage interest restrictions. However, if the operation involves substantial services (cleaning, meals, concierge), it may be classified as a trading activity rather than property income, which changes the tax treatment significantly.",
          ],
        },
        {
          heading: "Property development",
          paragraphs: [
            "Property development profits are typically treated as trading income rather than capital gains. This distinction is critical: trading profits are subject to income tax (or corporation tax for companies) at marginal rates, with no annual exempt amount and no access to CGT reliefs. HMRC applies the “badges of trade” tests to determine whether an activity constitutes development trading or property investment.",
            "Developers may need to register for the Construction Industry Scheme (CIS), account for VAT on new-build sales, and consider whether profits should flow through a company or personal structure. The correct classification of each project (investment, development, or mixed) determines which tax regime applies and which deductions are available.",
          ],
        },
        {
          heading: "Student housing",
          paragraphs: [
            "Purpose-built student accommodation and converted houses let to students have specific tax and rates implications. Properties let entirely to students may be exempt from council tax, but this depends on all occupants being full-time students. Where a property is classified as an HMO, business rates may apply instead. Student lets often generate higher yields but come with shorter tenancy cycles and higher turnover costs, all of which affect the net tax position.",
          ],
        },
      ]}
      cta={{
        heading: "Need specialist property tax advice?",
        body: "HMOs, commercial property, serviced accommodation, and development projects each carry unique tax challenges. Our specialist property tax accountants can assess your specific situation and ensure you are claiming every available relief.",
        submitLabel: "Request specialist consultation",
      }}
    />
  );
}
