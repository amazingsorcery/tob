import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";

/**
 * Copy KaTeX's stylesheet and fonts into `public/katex/` so `katex-stylesheet.tsx` can link
 * it only for works with maths (a CSS import would ship on every chapter). Regenerated each
 * build so it matches the installed version. The directory layout keeps the relative
 * `url(fonts/…)` references working.
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

/* Version marker (read by the Docker build check). */
writeFileSync(join(target, "VERSION"), `${version}\n`, "utf8");

console.log(`katex ${version}: stylesheet and fonts copied to public/katex/`);
