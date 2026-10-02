import type { MetadataRoute } from "next";

const BASE = "https://frontend.lucaslean1806.workers.dev";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${BASE}/sitemap.xml`,
  };
}
