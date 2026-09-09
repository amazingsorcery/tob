import Link from "next/link";

import { brand } from "@/config/brand";

/**
 * The site header.
 *
 * Deliberately one link. The home page is the index of works, so a "Works" item beside the
 * wordmark would be a second route to the same place, and there is nothing else here to
 * navigate to. Chapter-level navigation belongs on the chapter page, next to the reading,
 * not in a bar that follows the reader down 36,000 words.
 *
 * Sticky, and short: 3.5rem. `app/reading.css` sets `scroll-margin-top` on every heading to
 * clear it, which is what stops a table-of-contents link landing its target underneath the
 * bar and appearing to do nothing.
 */
export function SiteHeader() {
  return (
    // Opaque, not a translucent blur: text over a semi-transparent bar sits on a composite
    // no token describes and no contrast check can measure (tokens.css §4.5).
    <header className="print-hide sticky top-0 z-[var(--z-sticky)] border-b border-border bg-background">
      <div className="mx-auto flex h-14 max-w-5xl items-center gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="rounded-sm font-display text-base font-semibold tracking-tight text-foreground hover:text-primary"
        >
          {brand.name}
        </Link>
        {/*
         * `config/brand.ts` currently sets no tagline and says the UI must render nothing
         * rather than a placeholder or a fallback sentence. So this is conditional, not a
         * `||` with something reassuring behind it: an empty <p> is a stray 20px of nothing
         * on every page, and a fallback sentence is a claim the owner did not make.
         */}
        {brand.hasTagline ? (
          <p className="hidden truncate text-sm text-muted-foreground sm:block">{brand.tagline}</p>
        ) : null}
      </div>
    </header>
  );
}
