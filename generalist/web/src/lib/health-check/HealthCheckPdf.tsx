import * as React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import type { HealthCheckAnswers, Opportunity } from "./types";
import {
  AGENCY_TYPE_OPTIONS,
  ENTITY_OPTIONS,
  EXIT_OPTIONS,
  REVENUE_BAND_OPTIONS,
} from "./questions";

// We rely on the built-in Helvetica family to keep PDF generation
// dependency-free on Vercel. No external font fetches at render time.
Font.registerHyphenationCallback((word) => [word]);

const BRAND = "#4f46e5";
const INK = "#0f172a";
const MUTED = "#475569";
const FAINT = "#94a3b8";
const HAIR = "#e2e8f0";

const styles = StyleSheet.create({
  page: {
    paddingTop: 56,
    paddingBottom: 56,
    paddingHorizontal: 48,
    fontFamily: "Helvetica",
    fontSize: 10,
    color: INK,
    lineHeight: 1.45,
  },
  brand: {
    color: BRAND,
    fontSize: 9,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  h1: { fontSize: 26, fontWeight: 700, color: INK, marginTop: 8 },
  h2: { fontSize: 16, fontWeight: 700, color: INK, marginTop: 24, marginBottom: 8 },
  h3: { fontSize: 12, fontWeight: 700, color: INK, marginBottom: 4 },
  sub: { fontSize: 11, color: MUTED, marginTop: 6 },
  meta: { fontSize: 9, color: FAINT, marginTop: 8 },
  rule: { borderBottomWidth: 1, borderBottomColor: HAIR, marginVertical: 16 },

  pillRow: { flexDirection: "row", marginTop: 24, gap: 8 },
  pillHigh: {
    backgroundColor: "#fef2f2",
    borderColor: "#fecaca",
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontSize: 9,
    color: "#991b1b",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  pillMedium: {
    backgroundColor: "#fffbeb",
    borderColor: "#fde68a",
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontSize: 9,
    color: "#92400e",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  pillLow: {
    backgroundColor: "#f0fdf4",
    borderColor: "#bbf7d0",
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontSize: 9,
    color: "#166534",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  pillInfo: {
    backgroundColor: "#eff6ff",
    borderColor: "#bfdbfe",
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontSize: 9,
    color: "#1e40af",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  oppBlock: {
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: HAIR,
  },
  oppHead: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 6,
  },
  oppTitle: { fontSize: 12, fontWeight: 700, color: INK, flex: 1, paddingRight: 12 },
  oppLabel: { fontSize: 9, color: MUTED, marginTop: 4 },
  oppBody: { fontSize: 10, color: INK, marginTop: 4 },
  oppAction: { fontSize: 10, color: BRAND, marginTop: 6, fontWeight: 700 },
  oppSaving: { fontSize: 9, color: "#166534", marginTop: 4, fontWeight: 700 },

  facts: { marginTop: 10 },
  factRow: { flexDirection: "row", paddingVertical: 4 },
  factLabel: { fontSize: 10, color: MUTED, width: 180 },
  factValue: { fontSize: 10, color: INK, flex: 1, fontWeight: 700 },

  footer: {
    position: "absolute",
    bottom: 24,
    left: 48,
    right: 48,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 8,
    color: FAINT,
    borderTopWidth: 1,
    borderTopColor: HAIR,
    paddingTop: 8,
  },

  cta: {
    backgroundColor: "#eef2ff",
    borderLeftColor: BRAND,
    borderLeftWidth: 3,
    padding: 12,
    marginTop: 24,
  },
  ctaTitle: { fontSize: 12, fontWeight: 700, color: INK },
  ctaBody: { fontSize: 10, color: INK, marginTop: 4 },
  ctaLink: { fontSize: 10, color: BRAND, marginTop: 6, fontWeight: 700 },

  disclaimer: {
    fontSize: 8,
    color: MUTED,
    marginTop: 24,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: HAIR,
  },
});

type Props = {
  answers: HealthCheckAnswers;
  opportunities: Opportunity[];
  generatedAt: Date;
  submissionId: string;
};

function gbp(n: number): string {
  return `£${Math.round(n).toLocaleString("en-GB")}`;
}

function labelFor<T extends { value: string; label: string }>(
  options: T[],
  value: string,
): string {
  return options.find((o) => o.value === value)?.label ?? value;
}

function pillStyle(sev: Opportunity["severity"]) {
  switch (sev) {
    case "high":
      return styles.pillHigh;
    case "medium":
      return styles.pillMedium;
    case "low":
      return styles.pillLow;
    case "info":
      return styles.pillInfo;
  }
}

function pillText(sev: Opportunity["severity"]): string {
  switch (sev) {
    case "high":
      return "Priority";
    case "medium":
      return "Notable";
    case "low":
      return "Tweak";
    case "info":
      return "FYI";
  }
}

export function HealthCheckPdf({ answers, opportunities, generatedAt, submissionId }: Props) {
  const dateStr = generatedAt.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const highCount = opportunities.filter((o) => o.severity === "high").length;
  const mediumCount = opportunities.filter((o) => o.severity === "medium").length;
  const lowCount = opportunities.filter((o) => o.severity === "low").length;

  return (
    <Document
      title="Agency Finance Health Check"
      author="Agency Founder Finance"
      subject={`Health check for ${answers.company || answers.name}`}
      creator="Agency Founder Finance"
      producer="Agency Founder Finance"
    >
      {/* ── Cover ────────────────────────────────────────────────── */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.brand}>Agency Founder Finance · Health Check</Text>
        <Text style={styles.h1}>Your agency finance health check</Text>
        <Text style={styles.sub}>
          {answers.company ? `${answers.company} · ` : ""}
          Prepared for {answers.name} on {dateStr}.
        </Text>
        <Text style={styles.meta}>Submission reference: {submissionId}</Text>

        <View style={styles.rule} />

        <Text style={styles.h2}>What we found</Text>
        <Text style={styles.oppBody}>
          We ran your answers through {opportunities.length}+ checks across extraction,
          structure, VAT, R&amp;D, IR35, exit, international and pension. Here&apos;s
          what we&apos;d look at first:
        </Text>

        <View style={{ marginTop: 12 }}>
          <View style={styles.factRow}>
            <Text style={styles.factLabel}>Priority opportunities</Text>
            <Text style={styles.factValue}>{highCount}</Text>
          </View>
          <View style={styles.factRow}>
            <Text style={styles.factLabel}>Notable items</Text>
            <Text style={styles.factValue}>{mediumCount}</Text>
          </View>
          <View style={styles.factRow}>
            <Text style={styles.factLabel}>Smaller tweaks</Text>
            <Text style={styles.factValue}>{lowCount}</Text>
          </View>
        </View>

        <Text style={styles.h2}>Your inputs</Text>
        <View style={styles.facts}>
          <View style={styles.factRow}>
            <Text style={styles.factLabel}>Agency type</Text>
            <Text style={styles.factValue}>
              {labelFor(AGENCY_TYPE_OPTIONS, answers.agencyType)}
            </Text>
          </View>
          <View style={styles.factRow}>
            <Text style={styles.factLabel}>Annual revenue band</Text>
            <Text style={styles.factValue}>
              {labelFor(REVENUE_BAND_OPTIONS, answers.revenueBand)}
            </Text>
          </View>
          <View style={styles.factRow}>
            <Text style={styles.factLabel}>Entity</Text>
            <Text style={styles.factValue}>
              {labelFor(ENTITY_OPTIONS, answers.entity)}
            </Text>
          </View>
          <View style={styles.factRow}>
            <Text style={styles.factLabel}>Profit before tax</Text>
            <Text style={styles.factValue}>{gbp(answers.profitPreTax)}</Text>
          </View>
          <View style={styles.factRow}>
            <Text style={styles.factLabel}>Current salary</Text>
            <Text style={styles.factValue}>{gbp(answers.currentSalary)}</Text>
          </View>
          <View style={styles.factRow}>
            <Text style={styles.factLabel}>Current dividends</Text>
            <Text style={styles.factValue}>{gbp(answers.currentDividend)}</Text>
          </View>
          <View style={styles.factRow}>
            <Text style={styles.factLabel}>Exit horizon</Text>
            <Text style={styles.factValue}>
              {labelFor(EXIT_OPTIONS, answers.exitHorizon)}
            </Text>
          </View>
          {answers.topConcern ? (
            <View style={styles.factRow}>
              <Text style={styles.factLabel}>Top concern</Text>
              <Text style={styles.factValue}>{answers.topConcern}</Text>
            </View>
          ) : null}
        </View>

        <View style={styles.cta}>
          <Text style={styles.ctaTitle}>Talk it through</Text>
          <Text style={styles.ctaBody}>
            The opportunities flagged here are directional. To put real numbers
            against each one, the next step is a 60-minute call with an ICAEW
            qualified accountant on the Agency Founder Finance team. No
            obligation, no follow-up sales drip.
          </Text>
          <Text style={styles.ctaLink}>
            agencyfounderfinance.co.uk/contact
          </Text>
        </View>

        <View style={styles.footer} fixed>
          <Text>Agency Founder Finance · Specialist accountants for UK + UAE agency founders</Text>
          <Text render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} />
        </View>
      </Page>

      {/* ── Opportunities ────────────────────────────────────────── */}
      <Page size="A4" style={styles.page} wrap>
        <Text style={styles.brand}>Findings · {opportunities.length} items</Text>
        <Text style={styles.h2}>Opportunities, in priority order</Text>

        {opportunities.map((o) => (
          <View key={o.id} style={styles.oppBlock} wrap={false}>
            <View style={styles.oppHead}>
              <Text style={styles.oppTitle}>{o.title}</Text>
              <Text style={pillStyle(o.severity)}>{pillText(o.severity)}</Text>
            </View>
            <Text style={styles.oppLabel}>{o.category.replace("-", " ").toUpperCase()}</Text>
            <Text style={styles.oppBody}>{o.detail}</Text>
            <Text style={styles.oppAction}>What to do: {o.action}</Text>
            {o.estimatedSaving ? (
              <Text style={styles.oppSaving}>Indicative impact: {o.estimatedSaving}</Text>
            ) : null}
            {o.reference ? (
              <Text style={styles.oppLabel}>
                Reference: agencyfounderfinance.co.uk{o.reference}
              </Text>
            ) : null}
          </View>
        ))}

        <Text style={styles.disclaimer}>
          Editorial: this report is generated from the answers you supplied and is
          intended as a directional review, not personalised tax advice. For
          decisions specific to your agency, book a call with the Agency Founder
          Finance team. All UK figures use 2025/26 rates. Generated automatically
          on {dateStr}.
        </Text>

        <View style={styles.footer} fixed>
          <Text>Agency Founder Finance · Specialist accountants for UK + UAE agency founders</Text>
          <Text render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} />
        </View>
      </Page>
    </Document>
  );
}
