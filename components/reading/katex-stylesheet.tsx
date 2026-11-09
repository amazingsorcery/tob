/**
 * KaTeX stylesheet, rendered only for works with `hasMath`. A CSS import would ship on every
 * page of the shared route, so the file is copied to `public/katex/` at build time
 * (`scripts/copy-katex-assets.ts`) and linked here. `precedence` makes React 19 hoist it into
 * <head>, dedupe it and block paint until loaded.
 */
export function KatexStylesheet() {
  return (
    // Must be conditional per work, which a CSS import can't be.
    // eslint-disable-next-line @next/next/no-css-tags
    <link rel="stylesheet" href="/katex/katex.min.css" precedence="default" />
  );
}
