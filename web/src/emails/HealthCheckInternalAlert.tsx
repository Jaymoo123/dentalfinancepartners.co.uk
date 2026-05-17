import { Section, Text } from "@react-email/components";
import * as React from "react";
import { EmailLayout } from "./EmailLayout";
import type { HealthCheckAnswers, Opportunity } from "@/lib/health-check/types";

type Props = {
  answers: HealthCheckAnswers;
  opportunities: Opportunity[];
  submissionId: string;
};

export default function HealthCheckInternalAlert({
  answers,
  opportunities,
  submissionId,
}: Props) {
  const high = opportunities.filter((o) => o.severity === "high");
  return (
    <EmailLayout preview={`New health check submission — ${answers.name}`}>
      <Section>
        <Text style={h1}>New health check submission</Text>
        <Text style={p}>
          <strong>{answers.name}</strong>
          {answers.company ? ` · ${answers.company}` : ""} ·{" "}
          <a href={`mailto:${answers.email}`} style={link}>
            {answers.email}
          </a>
        </Text>
        <Text style={p}>
          {answers.agencyType} · {answers.revenueBand} · {answers.entity} ·
          exit {answers.exitHorizon}
        </Text>
        <Text style={meta}>Ref: {submissionId}</Text>

        <Text style={h2}>Priority items flagged</Text>
        {high.length === 0 ? (
          <Text style={p}>No high-priority items.</Text>
        ) : (
          <ul style={ul}>
            {high.map((o) => (
              <li key={o.id} style={li}>
                <Text style={p}>
                  <strong>{o.title}</strong>
                  {o.estimatedSaving ? ` — ${o.estimatedSaving}` : ""}
                </Text>
              </li>
            ))}
          </ul>
        )}

        {answers.topConcern && (
          <>
            <Text style={h2}>Top concern (verbatim)</Text>
            <Text style={quote}>&ldquo;{answers.topConcern}&rdquo;</Text>
          </>
        )}
      </Section>
    </EmailLayout>
  );
}

const h1: React.CSSProperties = {
  fontSize: "20px",
  fontWeight: 700,
  color: "#0f172a",
  margin: "0 0 12px",
};
const h2: React.CSSProperties = {
  fontSize: "14px",
  fontWeight: 700,
  color: "#0f172a",
  margin: "16px 0 8px",
};
const p: React.CSSProperties = {
  fontSize: "14px",
  lineHeight: "22px",
  color: "#1e293b",
  margin: "0 0 8px",
};
const meta: React.CSSProperties = {
  fontSize: "12px",
  color: "#94a3b8",
  margin: "4px 0 0",
};
const ul: React.CSSProperties = { paddingLeft: "20px", margin: "0 0 8px" };
const li: React.CSSProperties = { marginBottom: "4px" };
const quote: React.CSSProperties = {
  fontSize: "14px",
  fontStyle: "italic",
  color: "#475569",
  borderLeft: "3px solid #e2e8f0",
  paddingLeft: "12px",
  margin: "8px 0",
};
const link: React.CSSProperties = { color: "#4f46e5" };
