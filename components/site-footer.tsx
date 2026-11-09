import { brand } from "@/config/brand";

/** Site footer: attribution (only if an author is set), licence and colophon. */
export function SiteFooter() {
  return (
    <footer className="print-hide mt-24 border-t border-border">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <p className="text-sm text-foreground-secondary">
          {brand.authorKnown ? `${brand.name} — ${brand.author}` : brand.name}
        </p>
        {brand.hasTagline ? (
          <p className="mt-1 text-sm text-muted-foreground">{brand.tagline}</p>
        ) : null}
        {/* Licence link, so reusers can find the attribution terms. */}
        <p className="mt-6 text-xs text-muted-foreground">
          {`${brand.author}. `}
          <a
            href={brand.licence.url}
            rel="license noopener"
            className="underline underline-offset-4 hover:text-foreground-secondary"
          >
            {brand.licence.name}
          </a>
          {" — reuse freely, with credit. Set in Source Serif 4 and IBM Plex; mathematics by KaTeX."}
        </p>
      </div>
    </footer>
  );
}
