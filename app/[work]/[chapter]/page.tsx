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
 * The reading surface.
 *
 * A Server Component, and everything it renders except the sticky table of contents is one
 * too. There are up to 400 mathematical expressions in a single chapter here; KaTeX runs at
 * build time and the browser is handed finished HTML. Client-side rendering would put a
 * visible reflow at the top of a forty-minute read.
 *
 * NO `loading.tsx`. Every one of these pages exists as a file before the server starts, so
 * there is nothing to suspend on — and a `loading.tsx` at or above this segment would commit
 * an HTTP 200 before the page could call `notFound()`, turning a missing chapter into a 404
 * page served with a success status.
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

  /*
   * Section headings are typeset here, on the server, and handed to the table of contents as
   * finished elements. Eleven headings in this corpus contain mathematics — "A.1 Exhaustive
   * search for $\kappa_r(q)$" — and passing them as strings printed the LaTeX source in the
   * rail beside a chapter that renders the same expression properly two inches away.
   */
  const tocEntries = chapter.sections.map((section) => ({
    id: section.id,
    heading: <InlineMarkdown>{section.heading}</InlineMarkdown>,
  }));

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
      {work.hasMath ? <KatexStylesheet /> : null}
      <ChapterStructuredData work={work} chapter={chapter} />

      {/*
       * `min-w-0` on the prose column is load-bearing. A grid item defaults to a minimum
       * width of its content, so the nine-column table in the kakeya appendix would widen
       * the column, then the grid, then the page — and the body text would scroll sideways
       * with it. With this, the table scrolls inside its own box and the page never does.
       */}
      {/*
       * The rail is 14rem and the gap 3rem, which leaves the prose column 704px inside the
       * 1024px container. That is deliberate arithmetic, not a default: the text is capped
       * at the measure (533px) by `app/reading.css`, and the 171px of slack is what a wide
       * table or a long displayed equation gets to use before it has to scroll.
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
            {/*
             * The one `h1` on this page. The document's own `#` heading was consumed by the
             * parser, so `chapter.body` starts at `##` and cannot produce a second one.
             * `tabIndex` lets `components/route-focus.tsx` move focus here after a
             * client-side navigation.
             */}
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
            /*
             * The mobile table of contents: a native disclosure, closed by default, so it
             * costs one line of screen instead of a third of it. No JavaScript, keyboard
             * operable, and it is the same list the sticky rail shows on a wide screen.
             */
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
                        // `block` rather than `flex`, so a heading and the mathematics inside it stay
                            // one run of text. See components/reading/chapter-toc.tsx.
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
