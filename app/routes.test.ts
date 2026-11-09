import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { brand } from "@/config/brand";
import { allWorks } from "@/lib/works";

import { generateStaticParams as chapterParams } from "./[work]/[chapter]/page";
import { generateStaticParams as workParams } from "./[work]/page";

const APP = join(process.cwd(), "app");
const works = allWorks();

/** Every file under a directory, as paths relative to it. */
function filesUnder(dir: string): string[] {
  return readdirSync(dir, { recursive: true, encoding: "utf8" }).filter((entry) =>
    /\.(tsx|ts)$/.test(entry),
  );
}

describe("static generation covers the corpus", () => {
  it("generates a page for every work", () => {
    expect(workParams()).toEqual(works.map((work) => ({ work: work.slug })));
  });

  it("generates a page for every chapter of every work", () => {
    const expected = works.flatMap((work) =>
      work.chapters.map((chapter) => ({ work: work.slug, chapter: chapter.slug })),
    );
    expect(chapterParams()).toEqual(expected);
    // Guard against the list silently shrinking.
    expect(expected.length).toBeGreaterThanOrEqual(30);
  });

  it("refuses to serve a slug it did not generate", () => {
    // `dynamicParams = false` 404s unknown slugs instead of rendering on demand.
    for (const route of ["[work]/page.tsx", "[work]/[chapter]/page.tsx"]) {
      const source = readFileSync(join(APP, route), "utf8");
      expect(source, `${route} does not set dynamicParams`).toContain(
        "export const dynamicParams = false",
      );
      expect(source, `${route} does not call notFound()`).toContain("notFound()");
    }
  });
});

describe("boundaries", () => {
  it("has no loading.tsx anywhere", () => {
    // A `loading.tsx` streams the 200 status before `notFound()` can run, so 404s would
    // ship as 200. Nothing here suspends anyway.
    const loading = filesUnder(APP).filter((entry) => /(^|[\\/])loading\.tsx$/.test(entry));
    expect(loading).toEqual([]);
  });

  it("has an error boundary and a not-found for every level that can miss", () => {
    const files = filesUnder(APP);
    for (const expected of [
      "error.tsx",
      "global-error.tsx",
      "not-found.tsx",
      join("[work]", "not-found.tsx"),
      join("[work]", "[chapter]", "not-found.tsx"),
    ]) {
      expect(files, `app/${expected} is missing`).toContain(expected);
    }
  });
});

describe("the renaming contract", () => {
  /** Brand values must only appear in `config/brand.ts`, never as literals elsewhere. */
  const literals = [brand.name, brand.author].filter((value) => value.length >= 3);

  it("has values worth checking for", () => {
    expect(literals.length).toBeGreaterThan(0);
  });

  it.each(literals)("no file under app/ or components/ hardcodes %s", (literal) => {
    const offenders: string[] = [];
    for (const root of ["app", "components"]) {
      const dir = join(process.cwd(), root);
      for (const entry of filesUnder(dir)) {
        const source = readFileSync(join(dir, entry), "utf8");
        if (source.includes(literal)) offenders.push(`${root}/${entry}`);
      }
    }
    expect(
      offenders,
      `these files contain "${literal}" as a literal. Import it from config/brand.ts instead.`,
    ).toEqual([]);
  });
});
