import { brand } from "@/config/brand";

/**
 * The site footer.
 *
 * `brand.author` is empty until somebody sets it, and the rule from `config/brand.ts` is that
 * the UI renders NOTHING rather than a placeholder — an unattributed page is honest, a page
 * attributed to "Author Name" is not. So the attribution line appears only when there is one.
 *
 * The colophon is three verifiable facts about how the pages are set. It is here because on a
 * site whose entire content is typography, how the type was chosen is not decoration.
 */
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
        {/*
          The licence, once, in the smallest honest form. The owner's direction is that bots
          may use the work but must always credit it; CC BY 4.0 says exactly that, and the
          link is the canonical machine-readable terms. Everything else about the site is
          deliberately unexplained — this is the one line that has to be explicit, because a
          reuser who cannot find the terms cannot comply with them.
        */}
        <p className="mt-6 text-xs text-muted-foreground">
          {`© ${brand.copyrightYear} ${brand.author}. `}
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
