import type { MetadataRoute } from "next";

import { brand } from "@/config/brand";

/** Everything is public, so nothing is disallowed. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${brand.url}/sitemap.xml`,
  };
}
