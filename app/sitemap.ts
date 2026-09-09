import type { MetadataRoute } from "next";

import { brand } from "@/config/brand";
import { allWorks } from "@/lib/works";

/**
 * Every URL on the site, generated from the corpus at build time.
 *
 * No `lastModified`. The only date available is the file's mtime, which changes when the repo
 * is cloned, checked out or copied, and a sitemap that claims a document was revised because
 * a build machine touched it is worse than one that says nothing. Omission is allowed here;
 * invention is not.
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
