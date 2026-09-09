import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { allWorks, type Chapter, type Work } from "@/lib/works";

import { Prose } from "./prose";

/**
 * THE TABLE OF CONTENTS MUST LAND.
 *
 * `Work.chapters[].sections[].id` is what every table-of-contents link on this site points
 * at. Nothing in the parser's own suite renders Markdown, so nothing there could tell whether
 * those ids exist in the HTML — and when this file was first written, fourteen of them did
 * not. `rehype-slug` slugs the *rendered* heading, and a rendered heading still contains the
 * raw LaTeX of its maths: "6.6 Beyond $\mathbb F_3$" became `#66-beyond-mathbb-f_3` while the
 * parser promised `#66-beyond`. Eleven maths headings and three headings containing "Erdős"
 * were silently dead links.
 *
 * So this renders every chapter of every work through the real component with the real plugin
 * chain, and checks the anchors against the real corpus. It is slow by the standards of this
 * suite and worth every second: a table of contents whose links do nothing is worse than no
 * table of contents, because the reader believes it.
 */

const works = allWorks();

/** Heading ids, in document order, exactly as the browser will see them. */
function renderedHeadingIds(markdown: string): string[] {
  const html = renderToStaticMarkup(<Prose>{markdown}</Prose>);
  return [...html.matchAll(/<h[1-6][^>]*\sid="([^"]*)"/g)].map((match) => match[1] ?? "");
}

const chapters: ReadonlyArray<readonly [string, Work, Chapter]> = works.flatMap((work) =>
  work.chapters.map((chapter) => [`${work.slug}/${chapter.slug}`, work, chapter] as const),
);

describe("section anchors resolve", () => {
  it("covers the whole corpus, so a passing suite is not an empty one", () => {
    expect(chapters.length).toBeGreaterThanOrEqual(30);
    expect(chapters.reduce((n, [, , c]) => n + c.sections.length, 0)).toBeGreaterThanOrEqual(130);
  });

  it.each(chapters)("%s: every section id exists in the rendered HTML", (_name, _work, chapter) => {
    const rendered = renderedHeadingIds(chapter.body);
    for (const section of chapter.sections) {
      expect(
        rendered,
        `"${section.heading}" is linked as #${section.id}, which the rendered chapter does not contain`,
      ).toContain(section.id);
    }
  });

  it.each(works.map((w) => [w.slug, w] as const))(
    "%s: section ids are unique within each chapter",
    (_slug, work) => {
      for (const chapter of work.chapters) {
        const ids = chapter.sections.map((s) => s.id);
        expect(new Set(ids).size, `${chapter.heading} has a duplicate section id`).toBe(ids.length);
      }
    },
  );

  it.each(works.map((w) => [w.slug, w] as const))(
    "%s: no section id is empty or needs percent-encoding in a URL",
    (_slug, work) => {
      for (const chapter of work.chapters) {
        for (const section of chapter.sections) {
          expect(section.id, `"${section.heading}" produced an empty anchor`).not.toBe("");
          expect(encodeURIComponent(section.id)).toBe(section.id);
        }
      }
    },
  );

  it("regression: the headings that rehype-slug alone gets wrong", () => {
    // Named explicitly so the three shapes of the bug cannot come back unnoticed: maths in a
    // heading, a LaTeX macro leaking into a fragment, and a non-ASCII letter.
    const threeLemmas = works.find((w) => w.slug === "three-lemmas");
    expect(threeLemmas).toBeDefined();
    if (!threeLemmas) return;

    const capSets = threeLemmas.chapters.find((c) => c.heading.includes("Cap Sets"));
    expect(capSets?.sections.some((s) => s.id === "66-beyond")).toBe(true);
    expect(capSets?.sections.some((s) => s.id.includes("mathbb"))).toBe(false);
    expect(capSets && renderedHeadingIds(capSets.body)).toContain("66-beyond");

    const residues = threeLemmas.chapters.find((c) => c.heading.includes("Sums of Residues"));
    expect(residues?.sections.some((s) => s.id === "35-erdsginzburgziv")).toBe(true);
    expect(residues && renderedHeadingIds(residues.body)).toContain("35-erdsginzburgziv");
  });
});
