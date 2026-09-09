import type { ComponentPropsWithoutRef } from "react";
import Markdown, { type Components } from "react-markdown";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

import { cn } from "@/lib/utils";

import { rehypeHeadingIds, rehypeScrollableMath } from "./rehype-heading-ids";

/**
 * The Markdown renderer for every word on this site.
 *
 * A Server Component, and it must stay one. There are roughly 3,700 maths expressions in
 * the corpus and up to 400 in a single chapter; rendering them in the browser is a visible
 * reflow on a page somebody is about to read for forty minutes. KaTeX runs here, at build
 * time, and the browser receives finished HTML.
 *
 * PLUGIN ORDER IS LOAD-BEARING:
 *   remark-gfm      tables (232 of them across the three works), strikethrough, task lists
 *   remark-math     $inline$ and $$display$$ into math nodes
 *   rehypeHeadingIds  ids that match `Section.id`, BEFORE rehype-slug can guess differently
 *   rehype-slug     the fallback for anything the pass above left without an id
 *   rehype-katex    maths into KaTeX markup + MathML
 *   rehypeScrollableMath  a tab stop on each display equation, AFTER katex creates them
 */

const katexOptions = {
  /*
   * A malformed expression renders in red rather than taking the page down with it. Nothing
   * in the corpus currently needs this — `prose.test.tsx` asserts the whole corpus renders
   * without a single `katex-error` node — but a build that dies on one bad brace in a 36,000
   * word document is worse than one that shows where the bad brace is.
   */
  throwOnError: false,
  /*
   * `strict: "ignore"` suppresses KaTeX's *warnings* about LaTeX-incompatible input; it does
   * not suppress errors, and `throwOnError` above governs those. Two display equations in
   * `three-lemmas.md` end `\qquad∎`, and U+220E is not a symbol KaTeX knows, so every build
   * printed two warnings per equation. The glyph still renders from the fallback font. The
   * real fix is `\blacksquare` in the source, which is a content edit, not a rendering one —
   * see the note in the handover.
   */
  strict: "ignore",
  /*
   * The default. Stated explicitly because it is the accessibility contract: every equation
   * ships as visually-hidden MathML alongside the visual KaTeX markup, which is what a screen
   * reader reads. Dropping to "html" would silence 3,700 expressions.
   */
  output: "htmlAndMathml",
} as const;

/**
 * Put a one-line `$$…$$` block on three lines, so it is parsed as DISPLAY mathematics.
 *
 * THE BUG THIS FIXES. The corpus writes 77 display equations as `$$…$$` on a line of their
 * own — the form Pandoc, MathJax and every LaTeX author in the world treats as display.
 * `micromark-extension-math`, which is what `remark-math` is built on, does not: its flow
 * construct wants the closing `$$` on a separate line, so a one-line block falls through to
 * the *text* construct and comes out as inline maths. Every one of those 77 equations
 * rendered inline-sized, mid-paragraph, and the seven of them carrying `\tag{…}` — which
 * KaTeX only accepts in display mode — rendered as a red error message. `display: 0,
 * inline: 3637` was the measurement before this function existed.
 *
 * Normalising the source is a whitespace change to an unambiguous construct: a line whose
 * entire content is one `$$…$$` span. It restores the author's meaning rather than
 * reinterpreting it, and it puts the equations through the ordinary `math` → `math-display` →
 * `.katex-display` path, so everything downstream — the scroll container, the tab stop, the
 * print rule — works without a special case.
 */
export function normaliseDisplayMath(markdown: string): string {
  let inFence = false;
  return markdown
    .split("\n")
    .map((line) => {
      // `#` and `$$` inside a fenced block are program text, not document structure.
      if (line.startsWith("```")) {
        inFence = !inFence;
        return line;
      }
      if (inFence) return line;
      const match = /^\$\$(.+?)\$\$\s*$/.exec(line);
      const body = match?.[1];
      // A line holding two separate spans is a sentence, not a displayed equation. Left alone.
      if (body === undefined || body.includes("$$")) return line;
      return `$$\n${body}\n$$`;
    })
    .join("\n");
}

/**
 * `class` on the wrapper rather than a plugin: the reading styles live in `app/reading.css`
 * under `.prose`, so the whole typographic system is one file a designer can read, instead of
 * several hundred utility classes spread across component overrides.
 */
export interface ProseProps {
  readonly children: string;
  readonly className?: string;
}

const components: Components = {
  /*
   * Wide tables scroll inside their own box. Without this the widest table in the corpus
   * (eleven columns) forces the whole page to scroll sideways on a phone, which takes the
   * body text with it.
   *
   * `tabIndex` because a scroll container that cannot be focused cannot be scrolled from the
   * keyboard (WCAG 2.1.1), and a focusable non-control needs a role and a name, or a screen
   * reader announces an anonymous stop.
   */
  table({ node: _node, ...props }: ComponentPropsWithoutRef<"table"> & { node?: unknown }) {
    return (
      <div className="scroll-box" tabIndex={0} role="group" aria-label="Table, scrollable">
        <table {...props} />
      </div>
    );
  },

  /* Same treatment for code listings; two of the works carry program text. */
  pre({ node: _node, ...props }: ComponentPropsWithoutRef<"pre"> & { node?: unknown }) {
    return (
      <div className="scroll-box" tabIndex={0} role="group" aria-label="Code listing, scrollable">
        <pre {...props} />
      </div>
    );
  },

  /*
   * The corpus contains no links today (`prose.test.tsx` asserts it, so this stays honest).
   * If one is ever authored, an external one must not hand the destination a window handle
   * or a referrer it did not need.
   */
  a({ node: _node, href, children, ...props }: ComponentPropsWithoutRef<"a"> & { node?: unknown }) {
    const external = typeof href === "string" && /^https?:\/\//i.test(href);
    return (
      <a
        href={href}
        {...(external ? { rel: "noopener noreferrer", target: "_blank" } : {})}
        {...props}
      >
        {children}
      </a>
    );
  },
};

export function Prose({ children, className }: ProseProps) {
  return (
    <div className={cn("prose", className)}>
      <Markdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[
          rehypeHeadingIds,
          rehypeSlug,
          [rehypeKatex, katexOptions],
          rehypeScrollableMath,
        ]}
        components={components}
      >
        {normaliseDisplayMath(children)}
      </Markdown>
    </div>
  );
}
