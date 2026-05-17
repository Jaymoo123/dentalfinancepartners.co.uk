import { Button, Section, Text } from "@react-email/components";
import * as React from "react";
import { EmailLayout } from "./EmailLayout";

type Props = {
  firstName: string;
  topThreeTitles: string[];
};

export default function HealthCheckDelivery({ firstName, topThreeTitles }: Props) {
  return (
    <EmailLayout
      preview={`Your Agency Finance Health Check is attached, ${firstName}.`}
    >
      <Section>
        <Text style={greeting}>Hi {firstName},</Text>
        <Text style={p}>
          Your personalised Agency Finance Health Check is attached to this
          email as a PDF.
        </Text>
        {topThreeTitles.length > 0 && (
          <>
            <Text style={p}>The top items we&rsquo;d look at first:</Text>
            <ul style={ul}>
              {topThreeTitles.map((t, i) => (
                <li key={i} style={li}>
                  <Text style={liText}>{t}</Text>
                </li>
              ))}
            </ul>
          </>
        )}
        <Text style={p}>
          The PDF runs through each one in detail with the indicative impact and
          the action we&rsquo;d recommend.
        </Text>
        <Text style={p}>
          If you want to talk any of it through, the next step is a 60-minute
          call with an ICAEW qualified accountant on the team. No obligation,
          no follow-up sales drip.
        </Text>
        <Button href="https://www.agencyfounderfinance.co.uk/contact" style={button}>
          Book a 60-minute call
        </Button>
        <Text style={sign}>— Agency Founder Finance</Text>
      </Section>
    </EmailLayout>
  );
}

const greeting: React.CSSProperties = {
  fontSize: "16px",
  color: "#0f172a",
  margin: "0 0 16px",
};
const p: React.CSSProperties = {
  fontSize: "15px",
  lineHeight: "24px",
  color: "#1e293b",
  margin: "0 0 14px",
};
const ul: React.CSSProperties = { paddingLeft: "20px", margin: "0 0 14px" };
const li: React.CSSProperties = { marginBottom: "6px" };
const liText: React.CSSProperties = {
  fontSize: "15px",
  color: "#1e293b",
  margin: 0,
};
const button: React.CSSProperties = {
  backgroundColor: "#4f46e5",
  color: "#ffffff",
  padding: "12px 24px",
  borderRadius: "6px",
  fontWeight: 600,
  textDecoration: "none",
  display: "inline-block",
  fontSize: "15px",
  marginTop: "8px",
};
const sign: React.CSSProperties = {
  fontSize: "14px",
  color: "#475569",
  margin: "24px 0 0",
};
