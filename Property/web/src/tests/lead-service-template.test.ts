/**
 * Golden tests for the branded lead-service email shell
 * (src/lib/emails/lead-service-template.ts).
 *
 * The owner-approved previews in docs/property/email-previews are the source
 * of truth for the design: #f6f7f8 canvas, centred 560px white card, the
 * PROPERTY TAX / PARTNERS wordmark header band, green-accented signature
 * block, quiet reply-based footer. Pure function, no network, no DB.
 */

import { describe, it, expect } from "vitest";
import {
  renderLeadServiceEmail,
  type LeadServiceEmail,
} from "@/lib/emails/lead-service-template";

const BASE: LeadServiceEmail = {
  preheader: "Reply with your name and number and a specialist will call you.",
  greeting: "Hi Sarah,",
  paragraphs: [
    "Thanks for your message. The next step is a short call with one of our property tax specialists.",
    "Just reply to this email, anything at all, and we will arrange your call. Even a one-word reply is fine.",
  ],
  signoff: "Speak soon,",
  footerNote:
    "You are receiving this because you submitted an enquiry on propertytaxpartners.co.uk.",
};

const CTA = { label: "Pick a time for your review", href: "https://www.propertytaxpartners.co.uk/book?t=tok123" };
const SECONDARY = { label: "confirm you would like a call", href: "https://www.propertytaxpartners.co.uk/api/leads/confirm/tok456" };
const OPT_OUT_URL = "https://www.propertytaxpartners.co.uk/api/leads/optout/tok789";

describe("branded shell", () => {
  const { html } = renderLeadServiceEmail(BASE);

  it("renders the #f6f7f8 canvas with a centred white card (560px, 1px #e5e7eb border, 8px radius)", () => {
    expect(html).toContain("background-color:#f6f7f8");
    expect(html).toContain("max-width:560px");
    expect(html).toContain("background-color:#ffffff");
    expect(html).toContain("border:1px solid #e5e7eb");
    expect(html).toContain("border-radius:8px");
  });

  it("is table-based with role=presentation, inline styles only", () => {
    expect(html).toContain('role="presentation"');
    expect(html).not.toContain("<style");
    expect(html).not.toContain("class=");
  });

  it("contains no images and no web fonts (system stack only)", () => {
    expect(html).not.toContain("<img");
    expect(html).not.toContain("@font-face");
    expect(html).not.toContain("fonts.googleapis");
    expect(html).toContain("-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif");
  });

  it("body copy uses the approved 16px/1.6 #334155 style", () => {
    expect(html).toContain("font-size:16px;line-height:1.6;color:#334155");
  });

  it("hides the preheader from the rendered body", () => {
    expect(html).toContain("display:none;max-height:0;overflow:hidden");
    expect(html).toContain(BASE.preheader);
  });
});

describe("wordmark header band", () => {
  const { html } = renderLeadServiceEmail(BASE);

  it("renders the PROPERTY TAX / PARTNERS wordmark with 0.22em tracking and the 2px #059669 accent rule", () => {
    expect(html).toContain("PROPERTY&nbsp;TAX");
    expect(html).toContain(">PARTNERS<");
    expect(html).toContain("letter-spacing:0.22em");
    expect(html).toContain("border-top:2px solid #059669");
    expect(html).toContain("color:#0f172a");
  });
});

describe("signature block", () => {
  const { html, text } = renderLeadServiceEmail(BASE);

  it("is present in the html with the 3px #059669 left border and approved lines", () => {
    expect(html).toContain("border-left:3px solid #059669");
    expect(html).toContain(">Junayd<");
    expect(html).toContain('font-weight:600;color:#059669;line-height:1.5;">Property Tax Partners<');
    expect(html).toContain(
      '<a href="https://www.propertytaxpartners.co.uk" style="color:#64748b;text-decoration:none;">propertytaxpartners.co.uk</a>',
    );
    expect(html).toContain("junayd@propertytaxpartners.co.uk");
  });

  it("is present in the plain-text render before the footer lines", () => {
    expect(text).toContain("Junayd\nProperty Tax Partners\npropertytaxpartners.co.uk");
    const sigIdx = text.indexOf("Junayd\nProperty Tax Partners");
    const footerIdx = text.indexOf(BASE.footerNote);
    expect(sigIdx).toBeGreaterThan(-1);
    expect(footerIdx).toBeGreaterThan(sigIdx);
  });

  it("keeps the caller's signoff line ahead of the signature block", () => {
    expect(html.indexOf("Speak soon,")).toBeGreaterThan(-1);
    expect(html.indexOf("Speak soon,")).toBeLessThan(html.indexOf("border-left:3px solid #059669"));
    expect(text.indexOf("Speak soon,")).toBeLessThan(text.indexOf("Junayd\nProperty Tax Partners"));
  });
});

describe("cta behaviour", () => {
  it("cta absent: no button and no button-only styles", () => {
    const { html, text } = renderLeadServiceEmail(BASE);
    expect(html).not.toContain("border-radius:6px");
    expect(html).not.toContain(CTA.href);
    expect(html).not.toContain(CTA.label);
    expect(text).not.toContain(CTA.href);
  });

  it("cta present: renders a solid #059669 button with white text and 6px radius", () => {
    const { html, text } = renderLeadServiceEmail({ ...BASE, cta: CTA });
    expect(html).toContain(`href="${CTA.href}"`);
    expect(html).toContain(CTA.label);
    expect(html).toContain("background-color:#059669");
    expect(html).toContain("color:#ffffff");
    expect(html).toContain("border-radius:6px");
    expect(html).toContain("display:inline-block");
    expect(text).toContain(`${CTA.label}: ${CTA.href}`);
  });
});

describe("secondary behaviour", () => {
  it("secondary absent: no confirm link", () => {
    const { html } = renderLeadServiceEmail(BASE);
    expect(html).not.toContain("confirm here");
    expect(html).not.toContain(SECONDARY.href);
  });

  it("secondary present: renders the one-tap confirm link", () => {
    const { html, text } = renderLeadServiceEmail({ ...BASE, secondary: SECONDARY });
    expect(html).toContain(`Or ${SECONDARY.label}:`);
    expect(html).toContain(`<a href="${SECONDARY.href}" style="color:#059669;">confirm here</a>`);
    expect(text).toContain(`${SECONDARY.label}: ${SECONDARY.href}`);
  });
});

describe("footer", () => {
  it("renders the receiving-because note over a 1px #e5e7eb top rule in 12px #64748b", () => {
    const { html } = renderLeadServiceEmail(BASE);
    expect(html).toContain("border-top:1px solid #e5e7eb");
    expect(html).toContain("font-size:12px;line-height:1.6;color:#64748b");
    expect(html).toContain(BASE.footerNote);
  });

  it("optOutUrl set: shows the reply STOP line in html and text but never renders the URL", () => {
    const { html, text } = renderLeadServiceEmail({ ...BASE, optOutUrl: OPT_OUT_URL });
    expect(html).toContain("To opt out, just reply STOP.");
    expect(text).toContain("To opt out, just reply STOP.");
    expect(html).not.toContain(OPT_OUT_URL);
    expect(text).not.toContain(OPT_OUT_URL);
  });

  it("optOutUrl absent: no reply STOP line", () => {
    const { html, text } = renderLeadServiceEmail(BASE);
    expect(html).not.toContain("reply STOP");
    expect(text).not.toContain("reply STOP");
  });
});

describe("no em/en dashes in output", () => {
  it("full-feature render (cta + secondary + opt-out) is dash-clean in html and text", () => {
    const { html, text } = renderLeadServiceEmail({
      ...BASE,
      cta: CTA,
      secondary: SECONDARY,
      optOutUrl: OPT_OUT_URL,
    });
    expect(html).not.toContain("—");
    expect(html).not.toContain("–");
    expect(text).not.toContain("—");
    expect(text).not.toContain("–");
  });
});

describe("escaping", () => {
  it("escapes html-sensitive characters in caller copy", () => {
    const { html } = renderLeadServiceEmail({
      ...BASE,
      paragraphs: ["Rates < 20% & reliefs > nothing"],
    });
    expect(html).toContain("Rates &lt; 20% &amp; reliefs &gt; nothing");
    expect(html).not.toContain("Rates < 20%");
  });
});
