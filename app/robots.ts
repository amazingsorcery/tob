import type { MetadataRoute } from "next";

import { brand } from "@/config/brand";

/**
 * Everything here is published work meant to be read and found. There is nothing private on
 * the site — no accounts, no database, no request-time data of any kind — so there is nothing
 * to disallow, and inventing a rule would only be a rule to get wrong later.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${brand.url}/sitemap.xml`,
  };
}
