import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";

/**
 * Copy KaTeX's stylesheet and fonts out of node_modules into `public/katex/`.
 *
 * WHY THIS EXISTS, rather than `import "katex/dist/katex.min.css"` in a page.
 *
 * Two of the three works carry mathematics; one does not. `Work.hasMath` says which, and
 * the point of that flag is that the philosophy dissertation should not download 23 kB of
 * CSS describing glyphs it will never render. A static CSS import cannot express that:
 * `app/[work]/[chapter]/page.tsx` is ONE module serving all thirty chapters of all three
 * works, so an import at the top of it ships to every one of them unconditionally.
 *
 * A file under `public/` can be linked conditionally — `components/reading/katex-stylesheet.tsx`
 * renders the <link> only when the work has maths — and it is a single immutable asset
 * shared by every maths chapter, so the second chapter a reader opens costs nothing.
 *
 * It is COPIED on every build rather than committed, for the same reason `public/maplibre/`
 * was: a vendored copy drifts from the installed version silently, and the first symptom is
 * a missing glyph in an equation nobody proofreads. The copy is regenerated from whatever
 * `katex` resolves to now, so it cannot disagree with the renderer.
 *
 * The relative `url(fonts/…)` references inside katex.min.css are preserved by keeping the
 * same directory layout, so nothing has to be rewritten.
 */

const require = createRequire(import.meta.url);
const katexDist = dirname(require.resolve("katex/package.json")) + "/dist";
const target = join(process.cwd(), "public", "katex");

const version = (
  JSON.parse(readFileSync(join(dirname(require.resolve("katex/package.json")), "package.json"), "utf8")) as {
    version: string;
  }
).version;

rmSync(target, { recursive: true, force: true });
mkdirSync(target, { recursive: true });

cpSync(join(katexDist, "katex.min.css"), join(target, "katex.min.css"));
cpSync(join(katexDist, "fonts"), join(target, "fonts"), { recursive: true });

/*
 * A marker the tests read, so "did the assets get copied, and from which version" is a
 * question with a checkable answer rather than an assumption.
 */
writeFileSync(join(target, "VERSION"), `${version}\n`, "utf8");

console.log(`katex ${version}: stylesheet and fonts copied to public/katex/`);
