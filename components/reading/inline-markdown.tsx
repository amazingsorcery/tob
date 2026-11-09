import type { ReactNode } from "react";
import Markdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

/**
 * Renders a Markdown fragment inline (no paragraph or `.prose`), e.g. section headings that
 * contain maths like `$D(q)$`. Server-rendered and passed to the client TOC as an element.
 * No `remark-gfm` or `rehype-slug`: not needed for headings, and ids would duplicate targets.
 */
export function InlineMarkdown({ children }: { children: string }): ReactNode {
  return (
    <Markdown
      remarkPlugins={[remarkMath]}
      rehypePlugins={[[rehypeKatex, { throwOnError: false, strict: "ignore" }]]}
      components={{
        // Unwrap <p> so this can sit inside <a> or <span>.
        p: ({ children: content }) => <>{content}</>,
      }}
    >
      {children}
    </Markdown>
  );
}
