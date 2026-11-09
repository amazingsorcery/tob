import Link from "next/link";

import type { Chapter, Work } from "@/lib/works";

import { chapterLabel } from "./work-meta";

/**
 * Previous/next links at the foot of a chapter. Each names its destination; a missing side
 * is left empty rather than shown disabled.
 */
export function ChapterNav({ work, previous, next }: ChapterNavProps) {
  if (!previous && !next) return null;

  return (
    <nav aria-label="Chapter" className="print-hide mt-16 border-t border-border pt-8">
      <ul className="grid gap-4 sm:grid-cols-2">
        <li>
          {previous ? <NavLink work={work} chapter={previous} direction="Previous" /> : null}
        </li>
        <li className="sm:text-right">
          {next ? <NavLink work={work} chapter={next} direction="Next" /> : null}
        </li>
      </ul>
    </nav>
  );
}

export interface ChapterNavProps {
  readonly work: Work;
  readonly previous: Chapter | null;
  readonly next: Chapter | null;
}

function NavLink({
  work,
  chapter,
  direction,
}: {
  work: Work;
  chapter: Chapter;
  direction: "Previous" | "Next";
}) {
  const label = chapterLabel(chapter);
  return (
    <Link
      href={`/${work.slug}/${chapter.slug}`}
      // Hover on `--muted`, not `--accent`: muted ink on accent is 4.02:1 in dark (§4.4).
      className="block rounded-lg border border-border p-4 hover:border-input hover:bg-muted"
    >
      <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {direction === "Previous" ? "← Previous" : "Next →"}
      </span>
      <span className="mt-1 block font-display text-lg font-semibold text-foreground">
        {label ? `${label}. ${chapter.title}` : chapter.title}
      </span>
      <span className="tabular mt-1 block text-sm text-foreground-secondary">
      </span>
    </Link>
  );
}
