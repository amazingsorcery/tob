import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ChapterNav } from "@/components/reading/chapter-nav";
import { ChapterToc } from "@/components/reading/chapter-toc";
import { InlineMarkdown } from "@/components/reading/inline-markdown";
import { KatexStylesheet } from "@/components/reading/katex-stylesheet";
import { ChapterStructuredData } from "@/components/structured-data";
import { Prose } from "@/components/reading/prose";
import { chapterLabel, neighbours, plainSummary } from "@/components/reading/work-meta";
import { allWorks, chapterBySlug, workBySlug } from "@/lib/works";

/**
 * Chapter page. Server-rendered (KaTeX at build time); only the sticky TOC is a client
 * component. No `loading.tsx`: it would commit a 200 before `notFound()` could run.
 */

export const dynamicParams = false;

export function generateStaticParams(): Array<{ work: string; chapter: string }> {
  return allWorks().flatMap((work) =>
    work.chapters.map((chapter) => ({ work: work.slug, chapter: chapter.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ work: string; chapter: string }>;
}): Promise<Metadata> {
  const { work: workSlug, chapter: chapterSlug } = await params;
  const work = workBySlug(workSlug);
  const chapter = work ? chapterBySlug(work, chapterSlug) : undefined;
  if (!work || !chapter) return {};

  const description = plainSummary(chapter.body);
  return {
    title: `${chapter.heading} — ${work.title}`,
    description,
    openGraph: {
      type: "article",
      title: `${chapter.heading} — ${work.title}`,
      description,
      url: `/${work.slug}/${chapter.slug}`,
    },
  };
}

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ work: string; chapter: string }>;
}) {
  const { work: workSlug, chapter: chapterSlug } = await params;
  const work = workBySlug(workSlug);
  if (!work) notFound();
  const chapter = chapterBySlug(work, chapterSlug);
  if (!chapter) notFound();

  const label = chapterLabel(chapter);
  const { previous, next } = neighbours(work, chapter);

  // Typeset headings on the server; some contain maths, which would show as raw LaTeX.
  const tocEntries = chapter.sections.map((section) => ({
    id: section.id,
    heading: <InlineMarkdown>{section.heading}</InlineMarkdown>,
  }));

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
      {work.hasMath ? <KatexStylesheet /> : null}
      <ChapterStructuredData work={work} chapter={chapter} />

      {/*
       * `min-w-0` stops wide tables from widening the grid (and the page). The 14rem rail
       * and 3rem gap leave a 704px column: text is capped at the measure, and the slack is
       * room for wide tables and equations before they scroll.
       */}
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_14rem] lg:gap-12">
        <article className="min-w-0">
          <nav aria-label="Breadcrumb" className="print-hide">
            <Link
              href={`/${work.slug}`}
              className="inline-flex min-h-11 items-center text-sm text-muted-foreground hover:text-primary"
            >
              <span aria-hidden="true" className="mr-1">
                ←
              </span>
              {work.title}
            </Link>
          </nav>

          <header className="measure mt-2">
            {label ? (
              <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                {label}
              </p>
            ) : null}
            {/* The only `h1` (the parser strips the chapter's `#`). `tabIndex` lets
                route-focus.tsx focus it after client-side navigation. */}
            <h1
              tabIndex={-1}
              className="mt-1 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
            >
              {chapter.title}
            </h1>
            <p className="tabular mt-3 text-sm text-muted-foreground">
              {work.title}
            </p>
          </header>

          {chapter.sections.length > 0 ? (
            // Mobile TOC: a native <details>, closed by default.
            <details className="print-hide mt-8 rounded-lg border border-border lg:hidden">
              <summary className="flex min-h-11 cursor-pointer items-center px-4 text-sm font-medium text-foreground-secondary">
                Sections in this chapter
              </summary>
              <nav aria-label="Sections in this chapter">
                <ol className="border-t border-border px-4 py-2">
                  {chapter.sections.map((section) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        // `block`, not `flex`, so inline maths stays in the text run.
                            className="block min-h-11 py-3 text-sm leading-snug text-foreground-secondary hover:text-primary"
                      >
                        <InlineMarkdown>{section.heading}</InlineMarkdown>
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </details>
          ) : null}

          <Prose className="mt-10">{chapter.body}</Prose>

          <ChapterNav work={work} previous={previous} next={next} />
        </article>

        <aside className="print-hide hidden lg:block">
          <ChapterToc
            sections={tocEntries}
            label="Sections in this chapter, with your position"
          />
          <p className="mt-6 border-t border-border pt-4">
            <Link
              href={`/${work.slug}`}
              className="inline-flex min-h-11 items-center text-sm text-muted-foreground hover:text-primary"
            >
              All chapters
            </Link>
          </p>
        </aside>
      </div>
    </div>
  );
}
