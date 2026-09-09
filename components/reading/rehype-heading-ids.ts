import type { Element, ElementContent, Root, RootContent } from "hast";

import { headingSlug } from "@/lib/works";

/**
 * Give every heading the id the parser promised, and make display maths reachable by
 * keyboard. Two small tree passes, kept together because both exist for the same reason:
 * something the default plugin chain gets subtly wrong on THIS corpus.
 */

const HEADING = /^h[1-6]$/;

function isElement(node: RootContent | ElementContent): node is Element {
  return node.type === "element";
}

function classNames(node: Element): readonly string[] {
  // `unknown` rather than hast's `PropertyValue`: the class list arrives as an array from
  // some plugins and a string from others, and narrowing from `unknown` says exactly that
  // without depending on how the upstream union happens to be spelled this release.
  const value: unknown = node.properties?.["className"];
  if (Array.isArray(value)) return value.map((entry) => String(entry));
  if (typeof value === "string") return value.split(/\s+/);
  return [];
}

/**
 * Is this the element `remark-math` produced for a `$…$` or `$$…$$` span?
 *
 * It is `<code class="language-math math-inline">`, NOT `class="math …"` — the shape
 * `rehype-katex` looks for. Matching on the wrong class name is silent: every heading id
 * simply keeps its LaTeX, which is the bug this file exists to prevent, so the three class
 * names are matched explicitly rather than by a prefix that might drift.
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
 * The text of a heading with its mathematics removed.
 *
 * The maths element's only child is the RAW LaTeX — so `hast-util-to-string`, which is what
 * `rehype-slug` uses, sees the macro source and slugs it. That is where `#66-beyond-mathbb-f_3`
 * comes from. Dropping the maths node entirely reproduces exactly what `headingSlug` does to
 * the Markdown source, which is the point: the two sides must agree by construction, not by
 * coincidence.
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
 * Set `id` on every heading using the parser's own slug function.
 *
 * Runs BEFORE `rehype-slug`, which skips any heading that already has an id. `rehype-slug`
 * is still in the chain and still does the work for anything this pass cannot reach — it is
 * the fallback, not the source of truth, because its answer differs from the parser's on
 * fourteen of the corpus's 138 section headings and every one of those is a table-of-contents
 * link that silently goes nowhere.
 *
 * Duplicate slugs within one chapter are disambiguated the way `github-slugger` does it, with
 * a `-1`, `-2` suffix, so the first occurrence — which is the one the table of contents points
 * at — keeps the clean id. The corpus currently has no duplicates; `anchors.test.tsx` asserts
 * that every section id is unique per chapter, so a future collision fails the build rather
 * than quietly stealing an anchor.
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
 * Make an overflowing display equation operable by keyboard.
 *
 * `.katex-display` is given `overflow-x: auto` in `app/reading.css` because several of these
 * equations are wider than a phone. A scroll container that cannot be focused cannot be
 * scrolled with the arrow keys in Safari or Chrome, which is WCAG 2.1.1, so it needs a tab
 * stop. It also needs an accessible name, or the tab stop is an unlabelled region;
 * `role="math"` plus the equation's own LaTeX would read the macro source aloud, so the label
 * is a plain description and the MathML that `rehype-katex` already emits carries the meaning.
 *
 * Runs AFTER `rehype-katex`, since `.katex-display` is that plugin's output.
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
