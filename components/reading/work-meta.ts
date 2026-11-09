import type { Chapter, Work } from "@/lib/works";

/** Presentation helpers over the parser's output. Parsing decisions belong in `lib/works.ts`. */

/**
 * "Chapter 3" / "Appendix A" from the heading, or null. `Chapter.number` is a position, so
 * it isn't used (it would label the bibliography as a chapter).
 */
export function chapterLabel(chapter: Chapter): string | null {
  const match = /^(Chapter\s+\d+|Appendix\s+[A-Z])/.exec(chapter.heading);
  return match ? (match[1] ?? null) : null;
}

/** The previous and next parts of the document, for the foot of a chapter. */
export function neighbours(
  work: Work,
  chapter: Chapter,
): { previous: Chapter | null; next: Chapter | null } {
  const index = work.chapters.findIndex((c) => c.slug === chapter.slug);
  return {
    previous: index > 0 ? (work.chapters[index - 1] ?? null) : null,
    next: index >= 0 ? (work.chapters[index + 1] ?? null) : null,
  };
}

/**
 * Plain text for `<meta name="description">`. Maths is removed (not unwrapped); truncates at
 * a word boundary with an ellipsis.
 */
export function plainSummary(markdown: string, maxLength = 200): string {
  const text = markdown
    .replace(/\$\$[\s\S]*?\$\$/g, " ")
    .replace(/\$[^\n$]*\$/g, " ")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/[*_`#>]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  if (text.length <= maxLength) return text;
  const cut = text.slice(0, maxLength);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > 0 ? cut.slice(0, lastSpace) : cut).replace(/[,;:.]$/, "")}…`;
}

