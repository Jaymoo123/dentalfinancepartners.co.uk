/**
 * COLP/COFA compliance officer duty checker (pure logic).
 *
 * Rule anchors (SRA Standards and Regulations 2019, in force with amendments):
 * - SRA Authorisation of Firms Rules, rule 8.1: every authorised body must at
 *   all times have an SRA-approved COLP and COFA.
 * - SRA Code of Conduct for Firms, paras 9.1 (COLP duties) and 9.2 (COFA duties).
 * - SRA Code of Conduct for Firms, para 3.9: firms must report promptly to the
 *   SRA facts capable of amounting to a serious breach.
 * - SRA Accounts Rules, rule 12.1 (accountant's report) and rule 12.2
 *   (de minimis exemption: average balance <= 10,000 GBP AND maximum <= 250,000 GBP).
 */

export type FirmType = "sole" | "partnership" | "llp" | "company" | "abs";
export type Appointments = "none" | "colp-only" | "cofa-only" | "both";
export type PracticeArea = "conveyancing" | "private-client" | "litigation" | "commercial" | "mixed";
export type FirmSize = "1" | "2-10" | "11-50" | "51+";

export interface ColpCofaInput {
  firmType: FirmType;
  firmSize: FirmSize;
  appointments: Appointments;
  holdsClientMoney: boolean;
  practiceArea: PracticeArea;
}

export interface ObligationRow {
  label: string;
  value: string;
  strong?: boolean;
}

export interface ColpCofaResult {
  compliant: boolean;
  missing: ("COLP" | "COFA")[];
  verdictText: string;
  headlineValue: string;
  headlineSub: string;
  rows: ObligationRow[];
  note: string;
}

const HIGH_RISK_AREAS: PracticeArea[] = ["conveyancing", "private-client", "mixed"];

export function checkColpCofa(input: ColpCofaInput): ColpCofaResult {
  const { firmType, firmSize, appointments, holdsClientMoney, practiceArea } = input;

  const missing: ("COLP" | "COFA")[] = [];
  if (appointments === "none" || appointments === "cofa-only") missing.push("COLP");
  if (appointments === "none" || appointments === "colp-only") missing.push("COFA");
  const compliant = missing.length === 0;

  const isAbs = firmType === "abs";
  const isSole = firmType === "sole" && firmSize === "1";

  const rows: ObligationRow[] = [
    {
      label: "COLP required (Authorisation of Firms Rules, rule 8.1)",
      value: missing.includes("COLP") ? "Yes, not yet appointed" : "Yes, appointed",
      strong: missing.includes("COLP"),
    },
    {
      label: "COFA required (Authorisation of Firms Rules, rule 8.1)",
      value: missing.includes("COFA") ? "Yes, not yet appointed" : "Yes, appointed",
      strong: missing.includes("COFA"),
    },
    {
      label: "One person holding both roles",
      value:
        "Permitted if eligible for both. The COLP must be a lawyer and a manager or employee; the COFA must be a manager or employee but need not be a lawyer.",
    },
    {
      label: "SRA approval of the individual(s)",
      value: isSole
        ? "Sole practitioners are typically deemed approved as COLP and COFA of their own recognised sole practice (confirm current SRA approval rules for your structure)."
        : "Formal SRA approval application required for each nominated individual before they take up the role.",
    },
    {
      label: "Serious breach reporting",
      value:
        "Report promptly to the SRA (Code of Conduct for Firms, para 3.9; COLP/COFA duties, paras 9.1-9.2). 'Serious' is judged on impact, pattern, intent and remediation.",
    },
    {
      label: "Non-serious breach handling",
      value:
        "Recordable, not reportable: log every breach in the firm's breach register and review for patterns. A run of minor breaches can become serious in aggregate.",
    },
    {
      label: "Accountant's report (Accounts Rules, rule 12.1)",
      value: holdsClientMoney
        ? "Required: obtain within 6 months of the accounting period end; deliver to the SRA only if qualified. Rule 12.2 exempts firms whose average client balance was £10,000 or less AND maximum £250,000 or less."
        : "Not required while the firm holds no client money (keep evidence that no client money is held).",
      strong: holdsClientMoney,
    },
  ];

  if (isAbs) {
    rows.push({
      label: "ABS (licensed body) terminology",
      value:
        "In the Legal Services Act 2007 (ss. 91-92) the statutory roles are HOLP and HOFA; the SRA applies its COLP/COFA regime to the licensed bodies it regulates.",
    });
  }

  if (holdsClientMoney && HIGH_RISK_AREAS.includes(practiceArea)) {
    rows.push({
      label: "Risk profile for the COFA",
      value:
        "Conveyancing and private client work carry elevated client money risk (misdirected funds, residual balances, fraud). Expect closer SRA scrutiny of reconciliations and the breach register.",
    });
  }

  const verdictText = compliant
    ? "Core appointments in place. Review the duty matrix below."
    : `Action needed: appoint a ${missing.join(" and ")}`;

  return {
    compliant,
    missing,
    verdictText,
    headlineValue: compliant
      ? "Both officers appointed"
      : `${missing.length} appointment${missing.length > 1 ? "s" : ""} outstanding`,
    headlineSub: holdsClientMoney
      ? "Firm holds client money: full Accounts Rules and accountant's report obligations apply."
      : "Firm holds no client money: reduced Accounts Rules footprint, COLP/COFA still mandatory.",
    rows,
    note: "Every SRA-authorised body needs both officers regardless of size. This tool summarises the framework; it is not a substitute for reading the SRA Authorisation of Firms Rules, Code of Conduct for Firms and Accounts Rules, or for advice on your firm's specific position.",
  };
}
