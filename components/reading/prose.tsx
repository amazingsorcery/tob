import type { ComponentPropsWithoutRef } from "react";
import Markdown, { type Components } from "react-markdown";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

import { cn } from "@/lib/utils";

import { rehypeHeadingIds, rehypeScrollableMath } from "./rehype-heading-ids";

/**
 * Markdown renderer. Keep it a Server Component so KaTeX runs at build time.
 *
 * Plugin order matters:
 *   remark-gfm      tables, strikethrough, task lists
 *   remark-math     $inline$ and $$display$$ into math nodes
 *   rehypeHeadingIds  ids that match `Section.id`, BEFORE rehype-slug can guess differently
 *   rehype-slug     the fallback for anything the pass above left without an id
 *   rehype-katex    maths into KaTeX markup + MathML
 *   rehypeScrollableMath  a tab stop on each display equation, AFTER katex creates them
 */

const katexOptions = {
  // Render malformed expressions in red instead of failing the build.
  throwOnError: false,
  // Silences warnings (not errors), e.g. for `∎` (U+220E) in three-lemmas.md, which still
  // renders from the fallback font.
  strict: "ignore",
  // The default, explicit: MathML is what screen readers read.
  output: "htmlAndMathml",
} as const;

/**
 * Split a one-line `$$…$$` onto three lines so it parses as display maths.
 * `micromark-extension-math` (under `remark-math`) needs the closing `$$` on its own line,
 * otherwise the block is parsed as inline maths.
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
      // Two separate spans on one line are inline, not display.
      if (body === undefined || body.includes("$$")) return line;
      return `$$\n${body}\n$$`;
    })
    .join("\n");
}

/** Styling comes from `.prose` in `app/reading.css`. */
export interface ProseProps {
  readonly children: string;
  readonly className?: string;
}

const components: Components = {
  // Wide tables scroll in their own box. Focusable for keyboard scrolling (WCAG 2.1.1),
  // with a role and name so the tab stop is announced.
  table({ node: _node, ...props }: ComponentPropsWithoutRef<"table"> & { node?: unknown }) {
    return (
      <div className="scroll-box" tabIndex={0} role="group" aria-label="Table, scrollable">
        <table {...props} />
      </div>
    );
  },

  /* Same for code listings. */
  pre({ node: _node, ...props }: ComponentPropsWithoutRef<"pre"> & { node?: unknown }) {
    return (
      <div className="scroll-box" tabIndex={0} role="group" aria-label="Code listing, scrollable">
        <pre {...props} />
      </div>
    );
  },

  // External links open in a new tab without opener or referrer.
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
