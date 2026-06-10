import { describe, it, expect } from "vitest";
import { validateNicheConfig } from "./niche-config";

// ---------------------------------------------------------------------------
// Minimal valid config used as base for mutation tests
// ---------------------------------------------------------------------------
function validConfig(): Record<string, unknown> {
  return {
    niche_id: "test",
    display_name: "Test Site",
    legal_name: "Test Legal Ltd",
    domain: "www.test.co.uk",
    tagline: "A tagline",
    description: "A description",
    brand: { primary_color: "#000000", logo_path: "/logo.svg", publisher_logo_url: "/pub-logo.png" },
    contact: { email: "hello@test.co.uk", phone: "01234 567890" },
    navigation: [{ label: "Home", href: "/" }],
    footer_links: [{ label: "Privacy", href: "/privacy" }],
    locations: [],
    content_strategy: {
      audience: "UK SMEs",
      categories: ["Tax", "VAT"],
      supabase_table: "blog_topics",
      site_key: "test",
      source_identifier: "test",
    },
    seo: {
      locale: "en-GB",
      organization_type: "AccountingService",
      service_areas: ["UK"],
      google_analytics_id: "",
      theme_color: "#000000",
    },
    lead_form: {
      role_label: "I am a...",
      role_options: [
        { value: "director", label: "Director" },
        { value: "sole-trader", label: "Sole trader" },
      ],
      placeholders: {
        name: "Full name",
        email: "Email address",
        phone: "Phone number",
        message: "Your message",
      },
    },
    cta: { sticky_primary: "Get started", sticky_secondary: "Learn more", sticky_button: "Contact us" },
    blog: { cta_heading: "Need help?", cta_body: "Talk to an expert.", cta_button: "Get in touch" },
    shared_components_version: "1.0.0",
    last_sync: null,
  };
}

describe("validateNicheConfig", () => {
  it("accepts a fully valid config without throwing", () => {
    expect(() => validateNicheConfig(validConfig())).not.toThrow();
  });

  // 1. Missing top-level required field
  it("throws naming the path when a top-level required field is missing", () => {
    const cfg = validConfig();
    delete (cfg as Record<string, unknown>).domain;
    expect(() => validateNicheConfig(cfg)).toThrow(/"domain"/);
  });

  // 2. Missing nested field (contact.email)
  it("throws naming 'contact.email' when that nested field is missing", () => {
    const cfg = validConfig();
    (cfg.contact as Record<string, unknown>).email = "";
    expect(() => validateNicheConfig(cfg)).toThrow(/"contact\.email"/);
  });

  // 3. Wrong type — navigation supplied as an object instead of an array
  it("throws naming 'navigation' when it is not an array", () => {
    const cfg = validConfig();
    (cfg as Record<string, unknown>).navigation = { label: "Home", href: "/" };
    expect(() => validateNicheConfig(cfg)).toThrow(/"navigation"/);
  });

  // 4. Empty-string required field
  it("throws naming the path when a required string field is empty", () => {
    const cfg = validConfig();
    (cfg as Record<string, unknown>).legal_name = "";
    expect(() => validateNicheConfig(cfg)).toThrow(/"legal_name"/);
  });

  // 5. Malformed array entry — role_options[1] missing label
  it("throws naming 'lead_form.role_options[1].label' when that entry lacks a label", () => {
    const cfg = validConfig();
    const opts = (cfg.lead_form as Record<string, unknown>).role_options as Array<Record<string, unknown>>;
    opts[1] = { value: "contractor" }; // label missing
    expect(() => validateNicheConfig(cfg)).toThrow(/"lead_form\.role_options\[1\]\.label"/);
  });
});
