import type { Chapter, Work } from "@/lib/works";

/**
 * Presentation helpers for the three routes. Pure functions over the parser's output, with no
 * opinions of their own about the corpus — anything that has to be *decided* about a document
 * belongs in `lib/works.ts`, where it is parsed once and tested against the real files.
 */

/**
 * "Chapter 3", or null.
 *
 * `Chapter.number` is a POSITION in the document, not the number printed on the chapter. Every
 * work ends with an appendix and a bibliography, which the parser numbers 10 and 11 along with
 * everything else; labelling the bibliography "Chapter 11" would be a fact the document does
 * not contain. So the label is read back out of the heading the author wrote, and parts that
 * are not chapters simply do not get one.
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
 * Markdown reduced to a plain sentence run, for a `<meta name="description">`.
 *
 * Maths is REMOVED rather than unwrapped: a search result reading "A Kakeya set in the affine
 * plane \kappa_r(q) over the field" is worse than one that stops short. Truncation is at a word
 * boundary and adds an ellipsis, so a cut description reads as cut rather than as a typo.
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

