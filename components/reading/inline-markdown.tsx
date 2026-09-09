import type { ReactNode } from "react";
import Markdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

/**
 * A fragment of Markdown rendered INLINE — no paragraph, no block wrapper, no `.prose`.
 *
 * WHAT THIS IS FOR. `Section.heading` is the heading text exactly as written, and eleven of
 * the corpus's 138 section headings contain mathematics:
 *
 *   A.1 Exhaustive search for $\kappa_r(q)$
 *   A.4 The direction-determination number $D(q)$
 *
 * Rendered as a plain string — which is what every table of contents on this site did until
 * a screenshot showed it — the reader gets `$\kappa_r(q)$` in the rail beside a chapter whose
 * body renders the same expression properly. It is the one place on the site where the source
 * leaked through to the page.
 *
 * `remark-gfm` is deliberately absent: a heading is never a table or a task list, and the
 * plugin is not free. `rehype-slug` too — an id inside a link would be a second target for
 * the same text.
 *
 * The result is passed to `components/reading/chapter-toc.tsx`, a Client Component, as an
 * already-rendered element. That is the whole reason this exists as a separate component:
 * KaTeX must run on the server, and the client component only owns which entry is current.
 */
export function InlineMarkdown({ children }: { children: string }): ReactNode {
  return (
    <Markdown
      remarkPlugins={[remarkMath]}
      rehypePlugins={[[rehypeKatex, { throwOnError: false, strict: "ignore" }]]}
      components={{
        // Unwrap the paragraph react-markdown puts around a bare line, so this can sit
        // inside an <a> or a <span> without producing invalid nesting.
        p: ({ children: content }) => <>{content}</>,
      }}
    >
      {children}
    </Markdown>
  );
}
