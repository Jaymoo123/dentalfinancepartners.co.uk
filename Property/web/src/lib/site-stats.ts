import type { StatItem } from "@/components/property/StatsCounter";

/**
 * The firm's headline figures, in one place.
 *
 * These used to be copied into the homepage and /about with a comment on each
 * asking the next person to keep them in sync by hand. They are a marketing
 * claim that appears in several places and changes as the practice grows, so
 * they get a single source instead.
 */
export const siteStats: StatItem[] = [
  { target: 100, suffix: "+", label: "Landlords served" },
  { target: 24, suffix: "hr", label: "Response time" },
  // DECISION L, owner-approved 2026-08-22. Replaced "£2.4M+ Tax savings identified", which
  // was not reconstructable from any record in the estate. This one is, and the query is
  // below so it stays re-derivable.
  //
  // WHAT IT MEANS: properties represented by property enquiries we have received. It is a
  // guaranteed UNDERSTATEMENT, not an estimate: `leads.role` is a self-declared portfolio
  // band present on 158 of 158 rows, every band is counted at its BOTTOM edge, and
  // "Property developer" and "Other" contribute zero.
  //
  // WORDING IS BINDING: say enquiries. Never clients, advises, manages or serves. Property
  // is lead-gen - enquiries are qualified and handed to a partner firm, and no client
  // records exist anywhere in the estate. Full working: tmp/design_migration/reports/
  // 15_property_value_claim.md.
  //
  // Re-derived 2026-08-22 (run below verbatim): enquiries 158, unique_people 154,
  // properties_floor 280, properties_floor_qualified 162, data through 2026-08-21.
  // Bands that day: Individual landlord 80, Other 40, Portfolio owner 20,
  // Large portfolio 12, Property developer 6. It rises ~30/month and only ever rises, so
  // re-run before changing it and always round DOWN.
  //
  //   -- runner: python scripts/_q.py <file.sql>  (read-only, project dhlxwmvmkrfnmcgjbntk)
  //   -- bands come from Property/niche.config.json lead_form.role_options
  //   with base as (
  //     select *
  //     from leads
  //     where source = 'property'
  //       and coalesce(is_test, false) = false
  //       and (extras->>'suspected_spam') is distinct from 'true'
  //       and coalesce(role, '') <> 'resource'
  //   )
  //   select
  //     count(*)                     as enquiries,
  //     count(distinct lower(email)) as unique_people,
  //     sum(case role
  //           when 'Individual landlord' then 1     -- band is 1-3
  //           when 'Portfolio owner'     then 4     -- band is 4-10
  //           when 'Large portfolio'     then 10    -- band is 10+
  //           else 0 end)            as properties_floor,
  //     min(created_at)::date        as first_enquiry,
  //     max(created_at)::date        as data_through
  //   from base;
  { target: 280, suffix: "+", label: "Properties enquired about" },
  { target: 100, suffix: "%", label: "Property-only focus" },
];
