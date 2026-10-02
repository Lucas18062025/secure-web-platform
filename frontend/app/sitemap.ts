import type { MetadataRoute } from "next";

const BASE = "https://frontend.lucaslean1806.workers.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: BASE, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/dashboard`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/analysis/new`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];
}
