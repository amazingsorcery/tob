import Link from "next/link";

import type { Chapter, Work } from "@/lib/works";

import { chapterLabel } from "./work-meta";

/**
 * Previous and next, at the foot of a chapter.
 *
 * Each link names the destination. "Next →" alone is the classic failure: read out of context
 * by a screen reader, or scanned by someone deciding whether to carry on, it says nothing. The
 * direction word is the small type and the chapter title is the large type, because the title
 * is what the reader is actually choosing between.
 *
 * When there is no previous or next part, the slot is left empty rather than filled with a
 * disabled control — there is nothing there, and a greyed-out button says there is.
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
      // The hover fill is `--muted`, not `--accent`. Muted ink on accent measures 4.02:1 in
      // the dark theme, the one pairing tokens.css §4.4 names as forbidden, and the eyebrow
      // below is muted ink. On `--muted` the whole text ramp clears AA (§4.1: 12.32 / 7.30 / 4.82).
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
