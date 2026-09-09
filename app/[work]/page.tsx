import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { InlineMarkdown } from "@/components/reading/inline-markdown";
import { KatexStylesheet } from "@/components/reading/katex-stylesheet";
import { WorkStructuredData } from "@/components/structured-data";
import { Prose } from "@/components/reading/prose";
import {
  chapterLabel,
  plainSummary,
} from "@/components/reading/work-meta";
import { Badge } from "@/components/ui/badge";
import { brand } from "@/config/brand";
import { allWorks, workBySlug } from "@/lib/works";

/**
 * A work's title page: what it argues, how long it is, and every way into it.
 *
 * NOTE THE ABSENCE OF `loading.tsx`, here and everywhere else on this site. Every page is
 * generated at build time from Markdown on disk; there is nothing to suspend on. A
 * `loading.tsx` at or above a segment would also commit an HTTP 200 before the page below it
 * can call `notFound()`, so `/no-such-work` would return a 404 page with a 200 status — which
 * is invisible in a browser and wrong to every crawler and every uptime check.
 */

export const dynamicParams = false;

export function generateStaticParams(): Array<{ work: string }> {
  return allWorks().map((work) => ({ work: work.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ work: string }>;
}): Promise<Metadata> {
  const { work: slug } = await params;
  const work = workBySlug(slug);
  if (!work) return {};
  const description = plainSummary(work.abstract);
  return {
    title: work.title,
    description,
    openGraph: {
      type: "article",
      title: work.title,
      description,
      url: `/${work.slug}`,
    },
  };
}

export default async function WorkPage({ params }: { params: Promise<{ work: string }> }) {
  const { work: slug } = await params;
  const work = workBySlug(slug);
  if (!work) notFound();

  const first = work.chapters[0];

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      {work.hasMath ? <KatexStylesheet /> : null}
      <WorkStructuredData work={work} />

      <article>
        <header className="measure">
          <h1
            tabIndex={-1}
            className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
          >
            {work.title}
          </h1>
          <p className="mt-3 text-xl text-foreground-secondary">{work.subtitle}</p>
          {/* A dissertation's title page carries its author. Rendered only when there is
              one — `config/brand.ts` is explicit that an unattributed page is honest and a
              page attributed to a placeholder is not. */}
          {brand.authorKnown ? (
            <p className="mt-4 text-base text-foreground-secondary">{brand.author}</p>
          ) : null}
          <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2">
            <Badge variant="outline" className="capitalize">
              {work.field}
            </Badge>
          </div>
          {first ? (
            <p className="mt-7">
              <Link
                href={`/${work.slug}/${first.slug}`}
                className="inline-flex min-h-11 items-center gap-2 rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground hover:bg-primary-hover"
              >
                Start reading
                <span aria-hidden="true">→</span>
              </Link>
            </p>
          ) : null}
        </header>

        <section aria-labelledby="abstract" className="mt-16">
          <h2
            id="abstract"
            className="font-display text-2xl font-semibold tracking-tight text-foreground"
          >
            Abstract
          </h2>
          <Prose className="mt-5">{work.abstract}</Prose>
        </section>

        <section aria-labelledby="contents" className="mt-20">
          <h2
            id="contents"
            className="font-display text-2xl font-semibold tracking-tight text-foreground"
          >
            Contents
          </h2>

          <ol className="mt-6 divide-y divide-border border-t border-border">
            {work.chapters.map((chapter) => {
              const label = chapterLabel(chapter);
              return (
                <li key={chapter.slug} className="py-6">
                  <div className="flex flex-wrap items-baseline gap-x-3">
                    <h3 className="font-display text-xl font-semibold tracking-tight">
                      <Link
                        href={`/${work.slug}/${chapter.slug}`}
                        className="text-foreground hover:text-primary"
                      >
                        {label ? (
                          <>
                            <span className="text-muted-foreground">{label}. </span>
                            {chapter.title}
                          </>
                        ) : (
                          chapter.title
                        )}
                      </Link>
                    </h3>
                  </div>

                  {chapter.sections.length > 0 ? (
                    // Two columns from the tablet breakpoint: one work has 25 sections in a
                    // single chapter, and a 1,100px column of links is a page nobody scans.
                    <ul className="mt-2 md:columns-2 md:gap-x-10">
                      {chapter.sections.map((section) => (
                        <li key={section.id} className="break-inside-avoid">
                          <Link
                            href={`/${work.slug}/${chapter.slug}#${section.id}`}
                            // `block` rather than `flex`, so a heading and the mathematics inside it stay
                            // one run of text. See components/reading/chapter-toc.tsx.
                            className="block min-h-11 py-3 text-sm leading-snug text-foreground-secondary hover:text-primary"
                          >
                            {/* Typeset, not printed: eleven of these headings contain LaTeX. */}
                            <InlineMarkdown>{section.heading}</InlineMarkdown>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              );
            })}
          </ol>

        </section>
      </article>
    </div>
  );
}
