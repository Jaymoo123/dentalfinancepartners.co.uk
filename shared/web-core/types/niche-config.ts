/**
 * TypeScript interfaces for niche.config.json
 * Shared type definitions across all niches
 */

export interface NicheConfig {
  niche_id: string;
  display_name: string;
  legal_name: string;
  domain: string;
  tagline: string;
  description: string;
  brand: {
    primary_color: string;
    logo_path: string;
    publisher_logo_url: string;
    accent_color?: string;
  };
  contact: {
    email: string;
    phone: string;
  };
  navigation: Array<{
    label: string;
    href: string;
  }>;
  footer_links: Array<{
    label: string;
    href: string;
  }>;
  locations: Array<{
    slug: string;
    title: string;
    name?: string;
    county?: string;
  }>;
  content_strategy: {
    audience: string;
    categories: string[];
    supabase_table: string;
    source_identifier: string;
  };
  seo: {
    locale: string;
    organization_type: string;
    service_areas: string[];
    google_analytics_id: string;
    google_site_verification: string;
    theme_color: string;
    homepage_title?: string;
    homepage_h1?: string;
    homepage_description?: string;
  };
  lead_form: {
    role_label: string;
    role_options: Array<{
      value: string;
      label: string;
    }>;
    placeholders: {
      name: string;
      email: string;
      phone: string;
      message: string;
    };
  };
  cta: {
    sticky_primary: string;
    sticky_secondary: string;
    sticky_button: string;
  };
  blog: {
    cta_heading: string;
    cta_body: string;
    cta_button: string;
  };
  shared_components_version: string;
  last_sync: string;
}
