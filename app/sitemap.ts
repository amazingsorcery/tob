import type { MetadataRoute } from "next";

import { brand } from "@/config/brand";
import { allWorks } from "@/lib/works";

/**
 * Every URL on the site. No `lastModified`: file mtimes change on clone/checkout and don't
 * reflect real revisions.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const works = allWorks();
  return [
    { url: brand.url, changeFrequency: "yearly", priority: 1 },
    ...works.map((work) => ({
      url: `${brand.url}/${work.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
    ...works.flatMap((work) =>
      work.chapters.map((chapter) => ({
        url: `${brand.url}/${work.slug}/${chapter.slug}`,
        changeFrequency: "yearly" as const,
        priority: 0.6,
      })),
    ),
  ];
}
