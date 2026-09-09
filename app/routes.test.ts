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
    // Thirty-three parts across three documents. A params list that quietly shrank to one
    // work would still pass a "returns an array" assertion.
    expect(expected.length).toBeGreaterThanOrEqual(30);
  });

  it("refuses to serve a slug it did not generate", () => {
    // `dynamicParams = false` is what turns an unknown slug into a 404 at the routing layer,
    // before the page renders. Without it Next would try to render on demand — which on a
    // fully static deployment means a request the site cannot answer.
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
    /*
     * THE 200-BEFORE-404 TRAP, and the reason it is asserted rather than remembered.
     *
     * A `loading.tsx` at or above a segment makes Next stream the response: the status line
     * goes out with the shell, before the page underneath has run. When that page then calls
     * `notFound()`, the 404 renders inside a response that already said 200. A browser hides
     * it completely; a crawler, a link checker and an uptime monitor all believe the 200.
     *
     * Nothing on this site can suspend — every page is built from Markdown on disk — so there
     * is no cost to this rule and no case where a loading state would show.
     */
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
  /**
   * `config/brand.ts` promises that renaming the site is a change to that file and no other.
   * A promise nobody checks is a promise that is already broken somewhere — so this looks for
   * the current values as literals in everything that renders.
   */
  const literals = [brand.name, brand.author].filter((value) => value.length >= 3);

  it("has values worth checking for", () => {
    expect(literals.length).toBeGreaterThan(0);
  });

  it.each(literals)("no file under app/ or components/ hardcodes %s", (literal) => {
    const offenders: string[] = [];
    for (const root of ["app", "components"]) {
      const dir = join(process.cwd(), root);
      for (const entry of filesUnder(dir)) {
        // This file reads the values out of the config, so it never contains them itself;
        // excluding it anyway would hide a real hardcoding in a future test.
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
