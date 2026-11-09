import { describe, expect, it } from "vitest";

import { allWorks, chapterBySlug, workBySlug } from "./works";

/** Parser tests against the real corpus, so a document that stops matching fails here. */

const works = allWorks();

describe("the corpus", () => {
  it("finds every document, so a passing suite is not an empty one", () => {
    expect(works.length).toBeGreaterThanOrEqual(3);
  });

  it.each(works.map((w) => [w.slug, w] as const))("%s parses into a whole work", (_slug, work) => {
    expect(work.title).not.toBe("");
    expect(work.subtitle).not.toBe("");
    expect(work.abstract.length).toBeGreaterThan(200);
    expect(work.field).not.toBe("unknown");
    // A dissertation with one chapter means the delimiter stopped matching.
    expect(work.chapters.length).toBeGreaterThan(3);
  });

  it.each(works.map((w) => [w.slug, w] as const))("%s numbers chapters contiguously", (_s, work) => {
    expect(work.chapters.map((c) => c.number)).toEqual(
      work.chapters.map((_, i) => i + 1),
    );
  });

  it.each(works.map((w) => [w.slug, w] as const))("%s gives every chapter a unique slug", (_s, w) => {
    const slugs = w.chapters.map((c) => c.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) expect(slug).toMatch(/^\d+-[a-z0-9-]+$/);
  });

  it.each(works.map((w) => [w.slug, w] as const))("%s keeps chapter bodies non-empty", (_s, work) => {
    for (const chapter of work.chapters) {
      expect(chapter.body.length, `${chapter.heading} is empty`).toBeGreaterThan(100);
    }
  });

  it.each(works.map((w) => [w.slug, w] as const))("%s strips the Chapter N prefix", (_s, work) => {
    for (const chapter of work.chapters) {
      expect(chapter.title).not.toMatch(/^Chapter\s+\d+/);
      expect(chapter.title).not.toBe("");
    }
  });

  it("detects which works carry mathematics", () => {
    // Gates the KaTeX stylesheet per work.
    const byMath = Object.fromEntries(works.map((w) => [w.slug, w.hasMath]));
    expect(byMath["three-lemmas"]).toBe(true);
    expect(byMath["kakeya-multiplicity"]).toBe(true);
    expect(byMath["where-concepts-come-apart"]).toBe(false);
  });

  it("does not mistake a comment inside a code fence for a chapter", () => {
    // `#` lines inside fenced code are not headings.
    for (const work of works) {
      for (const chapter of work.chapters) {
        expect(chapter.heading).not.toMatch(/^\s*(\/\/|const |let |function )/);
      }
    }
  });

  it("resolves a work and a chapter by slug, and refuses an unknown one", () => {
    const first = works[0];
    expect(first).toBeDefined();
    if (!first) return;
    expect(workBySlug(first.slug)?.title).toBe(first.title);
    expect(workBySlug("no-such-work")).toBeUndefined();
    const chapter = first.chapters[0];
    expect(chapter).toBeDefined();
    if (!chapter) return;
    expect(chapterBySlug(first, chapter.slug)?.heading).toBe(chapter.heading);
    expect(chapterBySlug(first, "99-nonexistent")).toBeUndefined();
  });

  it("estimates reading time from prose, not from notation", () => {
    // LaTeX shouldn't count as words.
    for (const work of works) {
      expect(work.minutes).toBeGreaterThan(0);
      expect(work.words).toBeGreaterThan(1000);
    }
  });
});
