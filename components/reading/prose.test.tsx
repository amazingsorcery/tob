import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { allWorks } from "@/lib/works";

import { normaliseDisplayMath, Prose } from "./prose";

/** Renderer checks against the real corpus. */

const works = allWorks();
const WORKS_DIR = join(process.cwd(), "content", "works");

function render(markdown: string): string {
  return renderToStaticMarkup(<Prose>{markdown}</Prose>);
}

/** Every `$$…$$` line in the corpus, which is every display equation the author wrote. */
function displayEquationsInSource(): number {
  let total = 0;
  for (const file of readdirSync(WORKS_DIR).filter((f) => f.endsWith(".md"))) {
    const lines = readFileSync(join(WORKS_DIR, file), "utf8").split(/\r?\n/);
    let inFence = false;
    for (const line of lines) {
      if (line.startsWith("```")) inFence = !inFence;
      else if (!inFence && /^\$\$.+\$\$\s*$/.test(line)) total += 1;
    }
  }
  return total;
}

/** The rendered whole corpus, front matter included, as one string per work. */
const rendered = works.map((work) => ({
  work,
  html: [work.abstract, ...work.chapters.map((c) => c.body)].map(render).join("\n"),
}));

const occurrences = (html: string, pattern: RegExp): number => (html.match(pattern) ?? []).length;

describe("display mathematics", () => {
  it("renders every $$…$$ block as display, not inline", () => {
    // micromark-extension-math parses one-line `$$…$$` as inline unless normalised.
    const expected = displayEquationsInSource();
    expect(expected).toBeGreaterThanOrEqual(70);
    const actual = rendered.reduce(
      (n, { html }) => n + occurrences(html, /class="katex-display"/g),
      0,
    );
    expect(actual).toBe(expected);
  });

  it("gives every display equation a keyboard tab stop and a name", () => {
    // Scroll containers need focus to be keyboard-scrollable (WCAG 2.1.1).
    for (const { work, html } of rendered) {
      const displays = occurrences(html, /class="katex-display"/g);
      const stops = occurrences(html, /class="katex-display" tabindex="0"/g);
      expect(stops, `${work.slug}: ${displays - stops} display equations are not focusable`).toBe(
        displays,
      );
      if (displays > 0) expect(html).toContain('aria-label="Displayed equation, scrollable"');
    }
  });

  it("leaves a $$ inside a fenced code block alone", () => {
    const source = "```js\n$$not maths$$\n```\n\n$$x=1$$\n";
    expect(normaliseDisplayMath(source)).toBe("```js\n$$not maths$$\n```\n\n$$\nx=1\n$$\n");
  });

  it("leaves a line holding two separate spans alone", () => {
    // `$$a$$ and $$b$$` is a sentence, not a displayed equation.
    expect(normaliseDisplayMath("$$a$$ and $$b$$")).toBe("$$a$$ and $$b$$");
  });
});

describe("mathematics renders cleanly", () => {
  it("produces no KaTeX error node anywhere in the corpus", () => {
    // e.g. `\tag{…}` is only valid in display mode.
    for (const { work, html } of rendered) {
      expect(occurrences(html, /katex-error/g), `${work.slug} has a KaTeX error`).toBe(0);
    }
  });

  it("emits MathML beside every expression, which is what a screen reader reads", () => {
    for (const { work, html } of rendered) {
      const visual = occurrences(html, /class="katex-html"/g);
      const spoken = occurrences(html, /class="katex-mathml"/g);
      expect(spoken, `${work.slug}: ${visual - spoken} expressions have no MathML`).toBe(visual);
      if (work.hasMath) expect(spoken).toBeGreaterThan(0);
    }
  });

  it("renders no mathematics at all for the work that contains none", () => {
    // This is why `Work.hasMath` gates the KaTeX stylesheet.
    const philosophy = rendered.find(({ work }) => !work.hasMath);
    expect(philosophy).toBeDefined();
    expect(philosophy && occurrences(philosophy.html, /class="katex/g)).toBe(0);
  });
});

describe("nothing overflows the page", () => {
  it("wraps every table in a focusable scroll container", () => {
    // Unwrapped wide tables would make the whole page scroll sideways.
    for (const { work, html } of rendered) {
      const tables = occurrences(html, /<table/g);
      const boxes = occurrences(html, /<div class="scroll-box" tabindex="0" role="group"/g);
      expect(boxes, `${work.slug}: ${tables} tables, ${boxes} scroll containers`).toBeGreaterThanOrEqual(
        tables,
      );
    }
  });

  it("wraps every code listing too", () => {
    const withCode = rendered.filter(({ html }) => html.includes("<pre"));
    expect(withCode.length).toBeGreaterThan(0);
    for (const { work, html } of withCode) {
      expect(html, `${work.slug}`).toContain('aria-label="Code listing, scrollable"');
    }
  });
});

describe("the corpus stays within what this renderer handles", () => {
  it("contains no images", () => {
    // `prose.tsx` has no `img` handling (Markdown has no dimensions for next/image).
    for (const file of readdirSync(WORKS_DIR).filter((f) => f.endsWith(".md"))) {
      const source = readFileSync(join(WORKS_DIR, file), "utf8");
      expect(/!\[[^\]]*\]\(/.test(source), `${file} contains an image`).toBe(false);
    }
  });

  it("contains no raw HTML", () => {
    // Without `rehype-raw`, raw HTML is silently dropped. Only closing and void tags are
    // matched, since inequalities like `$q>2$` look like opening tags.
    for (const file of readdirSync(WORKS_DIR).filter((f) => f.endsWith(".md"))) {
      const source = readFileSync(join(WORKS_DIR, file), "utf8");
      expect(/<\/[a-z][a-z0-9]*\s*>/i.test(source), `${file} contains a closing HTML tag`).toBe(
        false,
      );
      expect(/<(br|hr|img|input)\b[^<>]{0,80}>/i.test(source), `${file} contains a void tag`).toBe(
        false,
      );
    }
  });
});
