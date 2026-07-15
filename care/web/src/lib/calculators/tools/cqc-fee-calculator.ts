import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { gbp } from "@accounting-network/web-shared/tools/format";

// CQC annual regulatory fee scheme 2024/25 — current published scheme as at July 2026
// Source 1 (fee tables): https://www.cqc.org.uk/guidance-providers/fees/provider-fees-payable-social-care-services
//   Page last updated 10 June 2024. Scheme year labelled "Regulatory fee 2024/25".
// Source 2 (hub): https://www.cqc.org.uk/guidance-regulation/fees
//   Hub last updated 14 May 2025.
// Retrieved: 2026-07-15. CQC states rates are unchanged as at this date.
// FLAG: verify the current scheme at the above URLs before each budget cycle.
// CQC's invoice to the provider is the definitive figure — this tool is an estimator.

export const CQC_FEE_SCHEME_YEAR = "2024/25";
export const CQC_FEE_SCHEME_NOTE = "current published CQC scheme (2024/25 rates, unchanged as at July 2026)";

// --- RESIDENTIAL / NURSING HOMES and SPECIALIST COLLEGES ---
// Banded by maximum service users on the registration certificate (registered places).
// Boundary rule: lower bound inclusive, upper bound inclusive.
// e.g. band "4-10" covers exactly 4, 5, 6, 7, 8, 9, 10 registered places.
// Band <4 means 1, 2, or 3 registered places.
// Band >90 means 91 or more.
export const RESIDENTIAL_BANDS: { max: number; fee: number }[] = [
  { max: 3,   fee: 313 },
  { max: 10,  fee: 816 },
  { max: 15,  fee: 1643 },
  { max: 20,  fee: 2388 },
  { max: 25,  fee: 3268 },
  { max: 30,  fee: 4270 },
  { max: 35,  fee: 5023 },
  { max: 40,  fee: 5779 },
  { max: 45,  fee: 6533 },
  { max: 50,  fee: 7289 },
  { max: 55,  fee: 8037 },
  { max: 60,  fee: 8792 },
  { max: 65,  fee: 10048 },
  { max: 70,  fee: 11050 },
  { max: 75,  fee: 12058 },
  { max: 80,  fee: 13062 },
  { max: 90,  fee: 14069 },
  { max: Infinity, fee: 15710 },
];

export function residentialFee(registeredPlaces: number): number {
  const n = Math.max(0, Math.round(registeredPlaces));
  // 0 places: treat as smallest band (registered but not yet operating)
  // ponytail: using min-band for zero rather than error; provider is still registered
  if (n === 0) return RESIDENTIAL_BANDS[0].fee;
  const band = RESIDENTIAL_BANDS.find((b) => n <= b.max);
  return band ? band.fee : RESIDENTIAL_BANDS[RESIDENTIAL_BANDS.length - 1].fee;
}

// --- COMMUNITY SOCIAL CARE ---
// Per location: £239 + (service users × £54.305), capped at £92,558 (reached at 1,700+ service users).
// Rounding: the £54.305 multiplier is applied with full float precision per location, then the
// per-location total is rounded to the nearest integer (Math.round) before summing across locations.
// This avoids sub-penny accumulation in multi-location scenarios while staying close to CQC's invoice.
// ponytail: per-location round then sum; if CQC invoices on raw float, difference is <£1 per location.
export const COMMUNITY_BASE = 239;
export const COMMUNITY_PER_USER = 54.305;
export const COMMUNITY_CAP = 92558;
export const COMMUNITY_CAP_THRESHOLD = 1700; // cap kicks in at exactly 1,700 service users

export function communityFeePerLocation(serviceUsers: number): number {
  const n = Math.max(0, Math.round(serviceUsers));
  if (n >= COMMUNITY_CAP_THRESHOLD) return COMMUNITY_CAP;
  return Math.round(COMMUNITY_BASE + n * COMMUNITY_PER_USER);
}

// --- COMMUNITY HEALTHCARE / NURSES AGENCIES ---
// Banded by NUMBER OF LOCATIONS (not service users).
// Boundary rule: lower bound inclusive, upper bound inclusive.
export const NURSES_AGENCY_BANDS: { max: number; fee: number }[] = [
  { max: 1,   fee: 2192 },
  { max: 3,   fee: 6093 },
  { max: 6,   fee: 12184 },
  { max: 12,  fee: 24370 },
  { max: 25,  fee: 48740 },
  { max: Infinity, fee: 97476 },
];

export function nursesAgencyFee(locations: number): number {
  const n = Math.max(1, Math.round(locations));
  const band = NURSES_AGENCY_BANDS.find((b) => n <= b.max);
  return band ? band.fee : NURSES_AGENCY_BANDS[NURSES_AGENCY_BANDS.length - 1].fee;
}

export type ProviderType = "residential" | "community" | "nurses-agency";

export interface CqcFeeResult {
  providerType: ProviderType;
  annualFee: number;
  bandLabel: string;
}

export function calcCqcFee(
  providerType: ProviderType,
  registeredPlaces: number,
  serviceUsers: number,
  locations: number,
): CqcFeeResult {
  if (providerType === "residential") {
    const places = Math.max(0, Math.round(registeredPlaces));
    const fee = residentialFee(places);
    const band = RESIDENTIAL_BANDS.find((b) => Math.max(1, places) <= b.max);
    const bandLabel =
      band?.max === Infinity
        ? "More than 90 registered places"
        : band?.max === 3
          ? "Fewer than 4 registered places"
          : `Up to ${band?.max} registered places`;
    return { providerType, annualFee: fee, bandLabel };
  }

  if (providerType === "community") {
    const locs = Math.max(1, Math.round(locations));
    const users = Math.max(0, Math.round(serviceUsers));
    const feePerLoc = communityFeePerLocation(users);
    const total = feePerLoc * locs;
    const bandLabel =
      users >= COMMUNITY_CAP_THRESHOLD
        ? `${users.toLocaleString()} service users (cap applies), ${locs} location${locs > 1 ? "s" : ""}`
        : `${users.toLocaleString()} service users, ${locs} location${locs > 1 ? "s" : ""}`;
    return { providerType, annualFee: total, bandLabel };
  }

  // nurses-agency
  const locs = Math.max(1, Math.round(locations));
  const fee = nursesAgencyFee(locs);
  const band = NURSES_AGENCY_BANDS.find((b) => locs <= b.max);
  const bandLabel =
    band?.max === Infinity
      ? `More than 25 locations`
      : `Up to ${band?.max} location${band?.max === 1 ? "" : "s"}`;
  return { providerType, annualFee: fee, bandLabel };
}

export const cqcFeeCalculatorTool: GenericTool = {
  kind: "generic",
  slug: "cqc-fee-calculator",
  name: "CQC Registration Fee Calculator",
  category: "CQC and Financial Compliance",
  oneLiner:
    "Find your annual CQC regulatory fee for residential homes, community social care, or nurses agencies. Based on the current published CQC fee scheme (2024/25 rates, unchanged as at July 2026).",
  metaTitle: "CQC Registration Fee Calculator | Annual Regulatory Fee 2024/25",
  metaDescription:
    "Calculate your annual CQC regulatory fee for care homes, domiciliary providers or nurses agencies. Banded by registered places or service-user capacity. Based on the current published CQC fee scheme (2024/25 rates). CQC invoice is definitive.",
  intro:
    "The CQC annual regulatory fee is a mandatory recurring cost for every CQC-registered provider in England. It is banded by the scale of your regulated activity: registered places for care and nursing homes, or service-user capacity for community and domiciliary providers. Enter your registration details to estimate your annual fee.",
  ctaLabel: "Get help with CQC registration costs and care home accounts",
  embedHeight: 680,
  fields: [
    {
      id: "providerType",
      label: "Service type",
      type: "select",
      default: "residential",
      options: [
        { value: "residential", label: "Residential or nursing home (banded by registered places)" },
        { value: "community",   label: "Community or domiciliary social care (banded by service users per location)" },
        { value: "nurses-agency", label: "Community healthcare or nurses agency (banded by number of locations)" },
      ],
      help: "Select the type that matches your CQC registration. Each type uses a different fee-banding structure.",
    },
    {
      id: "registeredPlaces",
      label: "Registered places (maximum service users on certificate)",
      type: "number",
      default: 20,
      step: 1,
      min: 0,
      help: "The maximum number of service users stated on your CQC registration certificate. This is the figure CQC uses to band the fee, not your current occupancy.",
    },
    {
      id: "serviceUsers",
      label: "Service users at this location",
      type: "number",
      default: 50,
      step: 1,
      min: 0,
      help: "Number of service users registered at this location. The fee formula is £239 + (service users x £54.305) per location, capped at £92,558 (1,700 or more service users).",
    },
    {
      id: "locations",
      label: "Number of registered locations",
      type: "number",
      default: 1,
      step: 1,
      min: 1,
      help: "For community providers: the fee is calculated per location and then summed. For nurses agencies: the total number of locations determines the fee band.",
    },
  ],
  compute: (v) => {
    const providerType = (v.providerType as ProviderType) ?? "residential";
    const r = calcCqcFee(
      providerType,
      Math.max(0, Number(v.registeredPlaces)),
      Math.max(0, Number(v.serviceUsers)),
      Math.max(1, Number(v.locations)),
    );

    const typeLabel =
      providerType === "residential"
        ? "Residential or nursing home"
        : providerType === "community"
          ? "Community social care"
          : "Nurses agency";

    return {
      headline: {
        label: "Estimated annual CQC regulatory fee",
        value: gbp(r.annualFee),
        sub: `${typeLabel} — ${r.bandLabel} — ${CQC_FEE_SCHEME_YEAR} scheme`,
        tone: "default",
      },
      rows: [
        { label: "Service type", value: typeLabel },
        { label: "Fee band", value: r.bandLabel },
        { label: "Annual regulatory fee", value: gbp(r.annualFee), strong: true },
        { label: "Fee scheme year", value: CQC_FEE_SCHEME_YEAR },
      ],
      note:
        `Based on the ${CQC_FEE_SCHEME_NOTE}. CQC sets and publishes this fee scheme; the figure above is an estimate based on your inputs. Your CQC invoice states the definitive fee. Fees apply to providers registered in England only (CQC does not regulate in Scotland, Wales or Northern Ireland). Verify the current scheme at https://www.cqc.org.uk/guidance-providers/fees/provider-fees-payable-social-care-services before making financial decisions.`,
    };
  },
  explainer: {
    heading: "What is the CQC annual regulatory fee and how is it calculated?",
    paragraphs: [
      "The CQC regulatory fee is a statutory annual charge that every provider registered with the Care Quality Commission in England must pay. It is not a one-off registration application cost; it is a recurring overhead payable every year your service remains registered. The fee funds CQC's inspection and regulatory work.",
      "For care homes and nursing homes, the fee is banded by the maximum number of service users stated on your registration certificate, which represents the registered capacity of the service. A larger registered capacity means a higher band and a higher annual fee. Actual occupancy does not change the band; CQC uses the maximum stated on the certificate.",
      "For community and domiciliary social care providers, the fee is calculated per registered location using the formula: a fixed base charge plus a per-service-user amount. The total per location is capped. If your service operates across multiple locations, the per-location fee is applied to each and summed. This makes multi-site community providers subject to a much larger aggregate fee than a single-location equivalent.",
      "For community healthcare and nurses agencies, the fee is banded by the number of locations, not by service-user capacity. The bands jump significantly at the boundary points, so understanding which band you fall into matters for budgeting.",
      "The CQC fee is a separate and unavoidable cost from business rates (which residential homes pay on their property), from any accountancy or consultancy fees, and from the costs of achieving or maintaining registration. It is a permanent cost of being a registered care provider in England and should be treated as a fixed annual overhead in any care business financial model.",
    ],
  },
  faqs: [
    {
      question: `What is the CQC registration fee for 2024/25?`,
      answer: `The current published scheme is labelled 2024/25 and the rates are unchanged as at July 2026. Residential home fees run from £313 (fewer than 4 registered places) to £15,710 (more than 90 places). Community social care fees are calculated per location at £239 plus £54.305 per service user, capped at £92,558. Nurses agency fees run from £2,192 (1 location) to £97,476 (more than 25 locations). Verify the definitive current figures at https://www.cqc.org.uk/guidance-providers/fees/provider-fees-payable-social-care-services before using them for budgeting; CQC's invoice to you is the definitive figure.`,
    },
    {
      question: "How is the CQC fee calculated for a care home?",
      answer:
        "For a care or nursing home, CQC bands the annual fee by the maximum number of service users on your registration certificate (your registered capacity, not your current occupancy). The bands cover ranges of registered places, from fewer than 4 at the lowest to more than 90 at the highest. Find your band using this calculator or on CQC's published fee-scheme page.",
    },
    {
      question: "Is the CQC fee a one-off or annual cost?",
      answer:
        "Annual. The CQC regulatory fee is charged every year your service remains registered with CQC. It is not a one-off application fee; it is a recurring overhead that continues for as long as you operate as a registered care provider in England.",
    },
    {
      question: "Does the CQC fee depend on the number of beds?",
      answer:
        "For residential and nursing homes, yes: the fee is banded by the maximum number of service users (registered places) on your CQC registration certificate. More registered places means a higher fee band. For community providers, the fee depends on service-user capacity per location. For nurses agencies, the fee depends on the number of registered locations.",
    },
    {
      question: "Is the CQC fee the same across the UK?",
      answer:
        "No. CQC only regulates adult social care and health services in England. Scotland is regulated by the Care Inspectorate, Wales by Care Inspectorate Wales (CIW), and Northern Ireland by the Regulation and Quality Improvement Authority (RQIA). Each has its own registration and fee regime. This calculator covers England only.",
    },
  ],
};
