import type { Chapter, Work } from "@/lib/works";

/**
 * Presentation helpers for the three routes. Pure functions over the parser's output, with no
 * opinions of their own about the corpus — anything that has to be *decided* about a document
 * belongs in `lib/works.ts`, where it is parsed once and tested against the real files.
 */

/** "35,847". Locale pinned so the build and the browser cannot disagree about the separator. */
export function count(value: number): string {
  return new Intl.NumberFormat("en-GB").format(value);
}

/**
 * "47 min" · "2 hr 59 min".
 *
 * The longest work is 179 minutes, and "179 min" asks the reader to do the division. Hours
 * appear only above sixty minutes, so a chapter still reads as a chapter.
 */
export function duration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return rest === 0 ? `${hours} hr` : `${hours} hr ${rest} min`;
}

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
 * The first paragraph of a Markdown block.
 *
 * Used for the lead on the home page. The abstracts are four or five paragraphs and the first
 * one states the claim; taking it whole is what keeps the front page in the author's words
 * instead of a summary somebody invented.
 */
export function firstParagraph(markdown: string): string {
  const paragraph = markdown.trim().split(/\n\s*\n/)[0] ?? "";
  return paragraph.trim();
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

/**
 * How many of a work's parts are chapters.
 *
 * `work.chapters` is every top-level part, which includes the appendix and the bibliography —
 * so the philosophy dissertation's nine parts are eight chapters and a bibliography, and
 * calling that "9 chapters" on the front page would be wrong by one in every work. The table
 * of contents lists all of them; this counts only what the author called a chapter.
 */
export function chapterCount(work: Work): number {
  const numbered = work.chapters.filter((c) => /^Chapter\s+\d+/.test(c.heading)).length;
  return numbered > 0 ? numbered : work.chapters.length;
}

/**
 * "8 chapters · 35,847 words · 2 hr 59 min".
 *
 * One string rather than three, because the three numbers only mean something together: a
 * word count without a reading time asks the reader to estimate, and a reading time without a
 * word count hides how the estimate was made.
 */
export function workLength(work: Work): string {
  const chapters = chapterCount(work);
  const noun = chapters === 1 ? "chapter" : "chapters";
  return `${chapters} ${noun} · ${count(work.words)} words · ${duration(work.minutes)}`;
}
