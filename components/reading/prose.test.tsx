import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { allWorks } from "@/lib/works";

import { normaliseDisplayMath, Prose } from "./prose";

/**
 * What the renderer must do to the real corpus.
 *
 * Every assertion here started as a defect found by measuring the output rather than reading
 * the code, which is the only way any of them could have been found: all of them render
 * *something*, and something is what a screenshot shows.
 */

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
    /*
     * REGRESSION. `micromark-extension-math` only treats `$$` as a display fence when the
     * closing delimiter is on its own line, so all 77 of the corpus's one-line `$$…$$`
     * equations parsed as inline maths: `display: 0, inline: 3637`. They rendered at inline
     * size, mid-paragraph, with inline-style fractions — and nothing threw, which is why
     * only counting the output finds it.
     */
    const expected = displayEquationsInSource();
    expect(expected).toBeGreaterThanOrEqual(70);
    const actual = rendered.reduce(
      (n, { html }) => n + occurrences(html, /class="katex-display"/g),
      0,
    );
    expect(actual).toBe(expected);
  });

  it("gives every display equation a keyboard tab stop and a name", () => {
    // Some of these are wider than a phone and scroll horizontally. A scroll container that
    // cannot be focused cannot be scrolled from the keyboard — WCAG 2.1.1.
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
    /*
     * REGRESSION. Seven equations carried `\tag{4.1}`, which KaTeX accepts in display mode
     * and rejects in inline mode. While the blocks above were being parsed as inline, those
     * seven rendered as red error text in the middle of a proof.
     */
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
    // The reason `Work.hasMath` exists: this work must not load KaTeX's stylesheet either.
    const philosophy = rendered.find(({ work }) => !work.hasMath);
    expect(philosophy).toBeDefined();
    expect(philosophy && occurrences(philosophy.html, /class="katex/g)).toBe(0);
  });
});

describe("nothing overflows the page", () => {
  it("wraps every table in a focusable scroll container", () => {
    // 232 tables, the widest with nine columns of set-builder notation. Unwrapped, that one
    // widens the grid column, then the page, and the body text scrolls sideways with it.
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
    /*
     * There is no `img` override in `prose.tsx`, because Markdown carries no dimensions and
     * `next/image` requires them. The corpus has none today. If one is ever authored this
     * fails, which is the point: the decision about how to size it should be made once, by a
     * person, and not discovered as a layout shift.
     */
    for (const file of readdirSync(WORKS_DIR).filter((f) => f.endsWith(".md"))) {
      const source = readFileSync(join(WORKS_DIR, file), "utf8");
      expect(/!\[[^\]]*\]\(/.test(source), `${file} contains an image`).toBe(false);
    }
  });

  it("contains no raw HTML", () => {
    /*
     * `react-markdown` does not render raw HTML unless `rehype-raw` is added, and it is not
     * added — so authored HTML is silently DROPPED rather than escaped or rendered, and a
     * sentence would go missing with nothing to show for it.
     *
     * Matched on closing and void tags only. An opening-tag pattern gives false positives all
     * over this corpus, because `$k+l-2<p$` and `$q>2$` are mathematics, not markup — the
     * first version of this test failed on three inequalities in three-lemmas.
     */
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
