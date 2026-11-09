import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

/**
 * `app/reading.css` §6 copies part of the light palette for print. Every token it sets must
 * match `[data-theme="light"]` exactly, so the tokens.css §4.1 ratios cover print too.
 */

const tokens = readFileSync(join(process.cwd(), "app", "tokens.css"), "utf8");
const reading = readFileSync(join(process.cwd(), "app", "reading.css"), "utf8");

/** `--name: value;` pairs inside the first `{ … }` following a header. */
function declarationsIn(source: string, startPattern: RegExp): Map<string, string> {
  const start = source.search(startPattern);
  expect(start, `could not find ${startPattern} in the stylesheet`).toBeGreaterThan(-1);
  const open = source.indexOf("{", start);
  let depth = 0;
  let end = open;
  for (let i = open; i < source.length; i += 1) {
    if (source[i] === "{") depth += 1;
    if (source[i] === "}") {
      depth -= 1;
      if (depth === 0) {
        end = i;
        break;
      }
    }
  }
  const block = source.slice(open + 1, end).replace(/\/\*[\s\S]*?\*\//g, "");
  const out = new Map<string, string>();
  for (const match of block.matchAll(/(--[a-z0-9-]+)\s*:\s*([^;]+);/g)) {
    const [, name, value] = match;
    if (name && value) out.set(name, value.trim());
  }
  return out;
}

const light = declarationsIn(tokens, /\[data-theme="light"\]\s*\{/);
const print = declarationsIn(reading, /@media print\s*\{\s*:root\s*\{/);

describe("the print theme is the light theme", () => {
  it("declares something, so a passing test is not an empty one", () => {
    expect(print.size).toBeGreaterThanOrEqual(10);
    expect(light.size).toBeGreaterThanOrEqual(30);
  });

  it("gives every re-declared token exactly the light theme's value", () => {
    const drifted: string[] = [];
    for (const [name, value] of print) {
      // `color-scheme` is a CSS property, not a palette token; the loop only sees customs.
      const expected = light.get(name);
      if (expected === undefined) {
        drifted.push(`${name} is set for print but does not exist in the light theme`);
      } else if (expected !== value) {
        drifted.push(`${name}: print says ${value}, light theme says ${expected}`);
      }
    }
    expect(
      drifted,
      "app/reading.css §6 has drifted from app/tokens.css §3. Every contrast ratio in the " +
        "§4.1 matrix was computed for the light theme's values; a print block that sets " +
        "different ones is an unmeasured palette on paper.",
    ).toEqual([]);
  });

  it("covers every token the reading surface actually paints with", () => {
    // A colour token missing from the print block keeps its dark value on paper.
    const used = new Set(
      [...reading.matchAll(/var\((--[a-z0-9-]+)\)/g)].map((match) => match[1] ?? ""),
    );
    const palette = [...used].filter(
      (name) =>
        // Geometry, type and motion are theme-invariant; only colour changes for print.
        !/^--(measure|prose-|radius|font|duration|ease|z|text|shadow)/.test(name) &&
        // Primitives are the values the print block is made of, not tokens it must set.
        !/^--(slate|paper|azure|mint|green|amber|clay|red)-\d+$/.test(name),
    );
    const missing = palette.filter((name) => !print.has(name));
    expect(
      missing,
      "these colour tokens are used by the reading surface but keep their dark value when " +
        "the chapter is printed",
    ).toEqual([]);
  });
});
