import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { allWorks, type Chapter, type Work } from "@/lib/works";

import { Prose } from "./prose";

/**
 * Renders every chapter through `Prose` and checks that each `Section.id` the TOC links to
 * exists in the HTML. Headings with maths or non-ASCII letters are where `rehype-slug` alone
 * disagrees with the parser.
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
    // Maths in a heading, a LaTeX macro in a fragment, and a non-ASCII letter.
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
