import { brand } from "@/config/brand";
import type { Chapter, Work } from "@/lib/works";

/**
 * JSON-LD (author, licence) for works and chapters. Rendered as a string child of
 * `<script>`, which React writes unescaped, so no `dangerouslySetInnerHTML` is needed. Data
 * comes from the committed corpus, not user input.
 */

function base(work: Work) {
  return {
    "@context": "https://schema.org",
    author: { "@type": "Person", name: brand.author },
    license: brand.licence.url,
    copyrightHolder: { "@type": "Person", name: brand.author },
    inLanguage: "en",
    isAccessibleForFree: true,
    creditText: `${brand.author}, "${work.title}", ${brand.licence.name}`,
    publisher: { "@type": "Organization", name: brand.name, url: brand.url },
  };
}

export function WorkStructuredData({ work }: { work: Work }) {
  const data = {
    ...base(work),
    "@type": "ScholarlyArticle",
    name: work.title,
    headline: work.title,
    alternativeHeadline: work.subtitle,
    about: work.field,
    url: `${brand.url}/${work.slug}`,
    wordCount: work.words,
    hasPart: work.chapters.map((c) => ({
      "@type": "Chapter",
      name: c.title,
      position: c.number,
      url: `${brand.url}/${work.slug}/${c.slug}`,
    })),
  };
  return <script type="application/ld+json">{JSON.stringify(data)}</script>;
}

export function ChapterStructuredData({ work, chapter }: { work: Work; chapter: Chapter }) {
  const data = {
    ...base(work),
    "@type": "Chapter",
    name: chapter.title,
    headline: chapter.heading,
    position: chapter.number,
    url: `${brand.url}/${work.slug}/${chapter.slug}`,
    isPartOf: {
      "@type": "ScholarlyArticle",
      name: work.title,
      url: `${brand.url}/${work.slug}`,
    },
  };
  return <script type="application/ld+json">{JSON.stringify(data)}</script>;
}
