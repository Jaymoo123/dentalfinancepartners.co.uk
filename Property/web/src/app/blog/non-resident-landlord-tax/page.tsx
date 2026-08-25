import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { BlogCategoryHub } from "@/components/blog/BlogCategoryHub";

const categoryName = "Non-Resident Landlord Tax";
const categorySlug = "non-resident-landlord-tax";
const description =
  "UK tax for non-resident landlords and overseas property investors: NRL scheme, withholding tax, non-resident CGT, double taxation, ATED and compliance.";

export const metadata: Metadata = {
  title: "Non-Resident Landlord Tax Guides",
  description,
  alternates: {
    canonical: `${siteConfig.url}/blog/${categorySlug}`,
  },
  openGraph: {
    title: `${categoryName} | ${siteConfig.name}`,
    description: `UK tax obligations for non-resident landlords: NRL scheme, withholding tax, non-resident CGT, and compliance.`,
    url: `${siteConfig.url}/blog/${categorySlug}`,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${categoryName}`,
    description: `UK tax obligations for non-resident landlords: NRL scheme, withholding tax, CGT, and compliance.`,
  },
};

export default function NonResidentLandlordTaxPage() {
  return (
    <BlogCategoryHub
      categoryName={categoryName}
      categorySlug={categorySlug}
      description={description}
      intro="UK tax obligations for overseas landlords and non-resident property investors. From the NRL scheme and withholding tax to non-resident CGT and compliance requirements."
      sections={[
        {
          heading: "The Non-Resident Landlord Scheme",
          paragraphs: [
            "The Non-Resident Landlord (NRL) scheme requires UK letting agents and tenants to deduct basic rate tax (20%) from rental payments to landlords whose usual place of abode is outside the UK. The deduction is made at source and paid to HMRC quarterly, unless the landlord has applied to receive rent gross through HMRC's NRL1 approval process.",
            "Obtaining NRL approval to receive rent without deduction does not remove the tax liability. It simply shifts the payment obligation to self-assessment. Most non-resident landlords with good compliance history can obtain approval, which improves cash flow and simplifies rent collection. The landlord must still file a UK self-assessment return declaring the rental income and any allowable deductions.",
          ],
        },
        {
          heading: "Non-resident capital gains tax",
          paragraphs: [
            "Since April 2015, non-UK residents have been liable to CGT on disposals of UK residential property. From April 2019, this was extended to all UK property, including commercial property and indirect disposals through shares in property-rich companies. The gain is calculated from the date of acquisition or from 5 April 2015 (whichever is later), unless the taxpayer elects to use the original acquisition cost.",
            "Non-resident CGT must be reported within 60 days of completion using the same CGT on UK property service as UK residents. Non-residents can claim the annual exempt amount (£3,000 for 2026/27) and most of the same reliefs as UK residents, including principal private residence relief where the property was their main home during a period of UK residence.",
          ],
        },
        {
          heading: "Double taxation and treaty relief",
          paragraphs: [
            "Non-resident landlords may face tax on the same rental income in both the UK and their country of residence. The UK has double taxation agreements with over 130 countries, most of which give the UK the primary right to tax income from UK property. The landlord's country of residence then provides relief, either by exempting the UK income or by giving a credit for UK tax paid.",
            "The mechanism varies by country. Some treaties use the exemption method (the income is simply excluded from the home country tax base), while others use the credit method (the income is included but a credit is given for UK tax already paid). Understanding which treaty applies and how relief is claimed in both jurisdictions is essential to avoid paying tax twice on the same income.",
          ],
        },
        {
          heading: "ATED and the Register of Overseas Entities",
          paragraphs: [
            "The Annual Tax on Enveloped Dwellings (ATED) applies to UK residential properties worth over £500,000 held by companies, partnerships with corporate members, or collective investment schemes. Non-resident companies owning UK residential property must file an ATED return annually and pay the charge (which ranges from approximately £4,400 to over £269,000 depending on property value), unless a relief applies.",
            "Since August 2022, overseas entities that own or wish to buy UK land must register with Companies House on the Register of Overseas Entities and provide information about their beneficial owners. Failure to register prevents the entity from buying, selling, transferring, or granting a lease over UK land, and the entity's existing registrable interests are noted on the Land Registry title.",
          ],
        },
        {
          heading: "Structuring options for non-resident investors",
          paragraphs: [
            "Non-resident landlords face a choice between holding UK property personally, through a UK company, or through an overseas company. Each structure has different tax implications: personal ownership subjects rental income to UK income tax with NRL withholding; a UK company pays corporation tax at 19-25% with full mortgage interest deductions but faces ATED and potential double taxation on profit extraction; an overseas company now pays UK corporation tax on UK property income (since April 2020) and faces the additional compliance burden of the overseas entities register.",
          ],
        },
      ]}
      cta={{
        heading: "Non-resident landlord? Get expert UK tax advice",
        body: "Navigating UK property tax as an overseas investor requires specialist knowledge of the NRL scheme, double taxation treaties, and cross-border structuring. Our property tax accountants work with non-resident landlords worldwide.",
        submitLabel: "Request non-resident consultation",
      }}
    />
  );
}
