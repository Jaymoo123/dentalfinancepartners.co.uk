import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

const routes: Array<{ path: string; priority: number }> = [
  { path: "", priority: 1 },
  { path: "/rent-a-site", priority: 0.9 },
  { path: "/buy-leads", priority: 0.9 },
  { path: "/how-it-works", priority: 0.8 },
  { path: "/brands", priority: 0.8 },
  { path: "/growth", priority: 0.7 },
  { path: "/value", priority: 0.7 },
  { path: "/vision", priority: 0.6 },
  { path: "/insights", priority: 0.6 },
  { path: "/contact", priority: 0.8 },
  { path: "/privacy-policy", priority: 0.2 },
  { path: "/cookie-policy", priority: 0.2 },
  { path: "/terms", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, "");
  const lastModified = new Date();
  return routes.map(({ path, priority }) => ({
    url: `${base}${path}`,
    lastModified,
    changeFrequency: "monthly",
    priority,
  }));
}
