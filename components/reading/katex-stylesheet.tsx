/**
 * KaTeX's stylesheet, loaded only on pages that contain mathematics.
 *
 * Two of the three works carry LaTeX and one does not, which is the whole reason
 * `Work.hasMath` exists: the philosophy dissertation should not download 23 kB of CSS
 * describing glyphs it will never render, on every one of its nine chapters.
 *
 * A static `import "katex/dist/katex.min.css"` cannot express that. `app/[work]/[chapter]`
 * is one module serving all thirty-three parts of all three works, so an import at the top
 * of it ships everywhere. The stylesheet is therefore copied into `public/katex/` by
 * `scripts/copy-katex-assets.ts` — regenerated on every build, so it cannot drift from the
 * installed version — and linked from here, conditionally.
 *
 * `precedence` is what makes this work in a Server Component: React 19 hoists a
 * `<link rel="stylesheet" precedence>` into <head>, deduplicates it across the tree, and
 * blocks paint until it has loaded. Without the attribute the tag would stay in the body and
 * the equations would flash unstyled.
 *
 * The font files are fetched by the browser only when a glyph in that face is actually
 * rendered, so a chapter with fifty expressions costs two or three of the twenty faces.
 */
export function KatexStylesheet() {
  return (
    /*
     * The rule below assumes a stylesheet could have been a CSS import, so the bundler could
     * hash and split it. Here it could not: an import is unconditional per route module, and
     * this component exists precisely to make the stylesheet conditional per work.
     */
    // eslint-disable-next-line @next/next/no-css-tags
    <link rel="stylesheet" href="/katex/katex.min.css" precedence="default" />
  );
}
