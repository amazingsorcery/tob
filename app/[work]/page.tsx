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
 * A work's title page: abstract and contents. No `loading.tsx`: it would commit a 200
 * before `notFound()` could run, so missing works would 404 with a 200 status.
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
          {/* Author, only when set. */}
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
                    // Two columns from the tablet breakpoint; some chapters have many sections.
                    <ul className="mt-2 md:columns-2 md:gap-x-10">
                      {chapter.sections.map((section) => (
                        <li key={section.id} className="break-inside-avoid">
                          <Link
                            href={`/${work.slug}/${chapter.slug}#${section.id}`}
                            // `block`, not `flex`, so inline maths stays in the text run.
                            className="block min-h-11 py-3 text-sm leading-snug text-foreground-secondary hover:text-primary"
                          >
                            {/* Some headings contain LaTeX. */}
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
