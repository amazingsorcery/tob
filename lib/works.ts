import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

/**
 * Parses `content/works/*.md` at build time. Each file has a fixed shape:
 *
 *   # Title
 *   ## Subtitle
 *   *A dissertation in <field>*
 *   ...front matter (Abstract, Contents, Notation)...
 *   # Chapter 1. Name
 *   ## 1.1 Section
 *
 * A `#` heading opens a chapter; everything before the first is front matter.
 * `works.test.ts` checks this holds for every file.
 */

const WORKS_DIR = join(process.cwd(), "content", "works");

export interface Section {
  /** "1.1 The method" — the heading text with its number, as written. */
  readonly heading: string;
  /** URL fragment. The renderer sets the same value on the heading — see `headingSlug`. */
  readonly id: string;
}

export interface Chapter {
  /** Position in the document, 1-based, used for the URL. Front matter is 0. */
  readonly number: number;
  /** URL segment: "1-introduction". */
  readonly slug: string;
  /** "Chapter 1. Introduction" — as written in the document. */
  readonly heading: string;
  /** "Introduction" — the heading with its "Chapter N." prefix removed, for navigation. */
  readonly title: string;
  /** The chapter's Markdown, excluding its own `#` heading line. */
  readonly body: string;
  readonly sections: readonly Section[];
  /** Rough reading time in minutes, from a 200 wpm estimate over the prose. */
  readonly minutes: number;
}

export interface Work {
  readonly slug: string;
  readonly title: string;
  readonly subtitle: string;
  /** "mathematics" | "philosophy" — taken from the italic line under the subtitle. */
  readonly field: string;
  /** The abstract, as Markdown. */
  readonly abstract: string;
  /** Everything before the first chapter, excluding the title block. */
  readonly frontMatter: string;
  readonly chapters: readonly Chapter[];
  readonly words: number;
  readonly minutes: number;
  /** True when the work contains LaTeX, so the page can load KaTeX's stylesheet only then. */
  readonly hasMath: boolean;
}

/**
 * Heading slug, close to `github-slugger` but with maths stripped and non-ASCII dropped:
 *
 *   "5.3 A lower bound on $D(q)$"  ->  53-a-lower-bound-on       (rehype-slug: …-on-dq)
 *   "6.6 Beyond $\mathbb F_3$"     ->  66-beyond                 (rehype-slug: 66-beyond-mathbb-f_3)
 *   "3.5 Erdős–Ginzburg–Ziv"       ->  35-erdsginzburgziv        (rehype-slug: 35-erdősginzburgziv)
 *
 * Exported so `rehype-heading-ids.ts` sets the same ids on rendered headings
 * (checked by `anchors.test.tsx`).
 */
export function headingSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/\$[^$]*\$/g, "")
    .replace(/[*_`]/g, "")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

/** Prose word count, ignoring maths and code. */
function countWords(markdown: string): number {
  return markdown
    .replace(/\$\$[\s\S]*?\$\$/g, " ")
    .replace(/\$[^\n$]*\$/g, " ")
    .replace(/```[\s\S]*?```/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
}

const WORDS_PER_MINUTE = 200;
const minutesFor = (words: number): number => Math.max(1, Math.round(words / WORDS_PER_MINUTE));

function parse(slug: string, source: string): Work {
  const lines = source.split(/\r?\n/);

  // Chapters are delimited by level-one headings. The first one closes the front matter.
  const starts: number[] = [];
  let inFence = false;
  for (const [index, line] of lines.entries()) {
    if (line.startsWith("```")) inFence = !inFence;
    // Ignore `#` lines inside code fences.
    if (!inFence && /^# /.test(line)) starts.push(index);
  }
  if (starts.length < 2) {
    throw new Error(
      `content/works/${slug}.md has ${starts.length} level-one heading(s). The parser expects ` +
        `a title heading followed by at least one "# Chapter N." heading.`,
    );
  }

  const [titleLine, ...rest] = starts;
  const title = (lines[titleLine ?? 0] ?? "").replace(/^#\s+/, "").trim();

  const frontMatterLines = lines.slice((titleLine ?? 0) + 1, rest[0]);
  const subtitle = (frontMatterLines.find((l) => l.startsWith("## ")) ?? "")
    .replace(/^##\s+/, "")
    .trim();
  const fieldLine = frontMatterLines.find((l) => /^\*A .+\*$/.test(l.trim())) ?? "";
  const field = fieldLine.replace(/^\*A dissertation in\s*/, "").replace(/\*$/, "").trim();

  const abstractStart = frontMatterLines.findIndex((l) => /^#{2,3}\s+Abstract/i.test(l));
  const abstractEnd = frontMatterLines.findIndex(
    (l, i) => i > abstractStart && /^(#{2,3}\s+|---\s*$)/.test(l),
  );
  const abstract =
    abstractStart === -1
      ? ""
      : frontMatterLines
          .slice(abstractStart + 1, abstractEnd === -1 ? undefined : abstractEnd)
          .join("\n")
          .replace(/^-+$/gm, "")
          .trim();

  const chapters: Chapter[] = rest.map((start, i) => {
    const end = rest[i + 1] ?? lines.length;
    const heading = (lines[start] ?? "").replace(/^#\s+/, "").trim();
    const body = lines.slice(start + 1, end).join("\n").trim();
    const sections = body
      .split(/\r?\n/)
      .filter((l) => /^## /.test(l))
      .map((l) => {
        const text = l.replace(/^##\s+/, "").trim();
        return { heading: text, id: headingSlug(text) };
      });
    const words = countWords(body);
    return {
      number: i + 1,
      slug: `${i + 1}-${headingSlug(heading.replace(/^Chapter\s+\d+\.\s*/, "")) || "chapter"}`,
      heading,
      title: heading.replace(/^Chapter\s+\d+[.:]\s*/, "").trim() || heading,
      body,
      sections,
      minutes: minutesFor(words),
      words,
    } satisfies Chapter & { words: number };
  });

  const words = chapters.reduce((n, c) => n + countWords(c.body), 0);

  return {
    slug,
    title,
    subtitle,
    field: field || "unknown",
    abstract,
    frontMatter: frontMatterLines.join("\n").trim(),
    chapters,
    words,
    minutes: minutesFor(words),
    hasMath: /\$\$[\s\S]*?\$\$|(?<!\$)\$(?!\$)[^\n$]+\$(?!\$)/.test(source),
  };
}

let cache: readonly Work[] | null = null;

/** Every work, longest first. */
export function allWorks(): readonly Work[] {
  if (cache) return cache;
  const files = readdirSync(WORKS_DIR).filter((f) => f.endsWith(".md"));
  const works = files
    .map((file) => parse(file.replace(/\.md$/, ""), readFileSync(join(WORKS_DIR, file), "utf8")))
    .sort((a, b) => b.words - a.words);
  cache = works;
  return works;
}

export function workBySlug(slug: string): Work | undefined {
  return allWorks().find((w) => w.slug === slug);
}

export function chapterBySlug(work: Work, chapterSlug: string): Chapter | undefined {
  return work.chapters.find((c) => c.slug === chapterSlug);
}
