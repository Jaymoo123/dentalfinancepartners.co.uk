/**
 * Shared operator console module.
 *
 * Server-only data access (adminData) and auth (consoleAuth) must NOT be
 * imported into client components. Components and journey utilities are safe
 * on both sides.
 */

// Server-only data access layer (parameterised by siteKey).
export * from "./adminData";

// Estate-level (cross-site) data access layer (additive, server-only).
export * from "./estateData";

// Auth utilities (Node crypto — server only).
export * from "./consoleAuth";

// Shared journey / humanise utilities (isomorphic).
export * from "./journey";

// Shared presentational components.
export { SnapshotCard } from "./components/SnapshotCard";
export { Sparkline } from "./components/Sparkline";
export { default as DashboardTabs } from "./components/DashboardTabs";
export { default as CountrySelect } from "./components/CountrySelect";
export { default as VisitorsTable } from "./components/VisitorsTable";
export type { VisitorRow } from "./components/VisitorsTable";
