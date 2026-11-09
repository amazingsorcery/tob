import Link from "next/link";

import { brand } from "@/config/brand";

/**
 * Sticky 3.5rem header with a single home link (the home page is the index of works).
 * `scroll-padding-top` in `app/globals.css` keeps anchored headings clear of it.
 */
export function SiteHeader() {
  return (
    // Opaque background: text over a translucent bar has unmeasurable contrast (tokens.css §4.5).
    <header className="print-hide sticky top-0 z-[var(--z-sticky)] border-b border-border bg-background">
      <div className="mx-auto flex h-14 max-w-5xl items-center gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="rounded-sm font-display text-base font-semibold tracking-tight text-foreground hover:text-primary"
        >
          {brand.name}
        </Link>
        {/* No tagline by default; render nothing rather than a fallback. */}
        {brand.hasTagline ? (
          <p className="hidden truncate text-sm text-muted-foreground sm:block">{brand.tagline}</p>
        ) : null}
      </div>
    </header>
  );
}
