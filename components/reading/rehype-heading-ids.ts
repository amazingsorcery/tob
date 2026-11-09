import type { Element, ElementContent, Root, RootContent } from "hast";

import { headingSlug } from "@/lib/works";

/** Rehype passes: heading ids that match the parser, and keyboard-focusable display maths. */

const HEADING = /^h[1-6]$/;

function isElement(node: RootContent | ElementContent): node is Element {
  return node.type === "element";
}

function classNames(node: Element): readonly string[] {
  // Plugins set className as either an array or a string.
  const value: unknown = node.properties?.["className"];
  if (Array.isArray(value)) return value.map((entry) => String(entry));
  if (typeof value === "string") return value.split(/\s+/);
  return [];
}

/**
 * Whether this is a `remark-math` node (`<code class="language-math math-inline">`, not
 * `class="math …"`). Class names are matched explicitly.
 */
function isMath(node: Element): boolean {
  const classes = classNames(node);
  return (
    classes.includes("math-inline") ||
    classes.includes("math-display") ||
    classes.includes("language-math")
  );
}

/**
 * Heading text with maths removed, matching what `headingSlug` does to the source. (Maths
 * nodes hold raw LaTeX, which `rehype-slug` would otherwise slug.)
 */
function textWithoutMath(node: Element | ElementContent): string {
  if (node.type === "text") return node.value;
  if (!isElement(node)) return "";
  if (isMath(node)) return "";
  return node.children.map(textWithoutMath).join("");
}

function visit(node: Root | RootContent, fn: (element: Element) => void): void {
  if (node.type === "element") fn(node);
  if ("children" in node) for (const child of node.children) visit(child, fn);
}

/**
 * Set heading ids with the parser's slug function. Runs before `rehype-slug` (which skips
 * headings that already have an id and acts as a fallback). Duplicates get `-1`, `-2`
 * suffixes like `github-slugger`.
 */
export function rehypeHeadingIds() {
  return (tree: Root): void => {
    const seen = new Map<string, number>();
    visit(tree, (element) => {
      if (!HEADING.test(element.tagName)) return;
      const base = headingSlug(textWithoutMath(element));
      if (!base) return;
      const count = seen.get(base) ?? 0;
      seen.set(base, count + 1);
      element.properties = { ...element.properties, id: count === 0 ? base : `${base}-${count}` };
    });
  };
}

/**
 * Make scrollable display equations keyboard-focusable (WCAG 2.1.1) with a plain label;
 * the MathML carries the content. Runs after `rehype-katex`.
 */
export function rehypeScrollableMath() {
  return (tree: Root): void => {
    visit(tree, (element) => {
      if (!classNames(element).includes("katex-display")) return;
      element.properties = {
        ...element.properties,
        tabIndex: 0,
        role: "group",
        "aria-label": "Displayed equation, scrollable",
      };
    });
  };
}
