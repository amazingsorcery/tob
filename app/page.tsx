import Link from "next/link";

import { brand } from "@/config/brand";
import { allWorks } from "@/lib/works";

/**
 * The front page.
 *
 * The owner's direction is that the site explains nothing about itself: no tagline, no
 * summary of what the works are, as little as possible. So this is the name, the author, and
 * three titles. Each title carries its own subtitle because that is the work's name, not a
 * description of it, and a reader who wants the abstract, the contents and the length finds
 * them one click in, on the work's own page, in the author's own words.
 *
 * Nothing here is conditional on content it does not have. `config/brand.ts` sets no tagline
 * and says the UI must render nothing rather than a placeholder — so there is no fallback
 * sentence, and an empty tagline produces no empty element.
 */
export default function HomePage() {
  const works = allWorks();

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <header className="measure">
        <h1
          tabIndex={-1}
          className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
        >
          {brand.name}
        </h1>
        {brand.authorKnown ? (
          <p className="mt-3 text-lg text-foreground-secondary">{brand.author}</p>
        ) : null}
        {brand.hasTagline ? (
          <p className="mt-2 text-lg text-foreground-secondary">{brand.tagline}</p>
        ) : null}
      </header>

      <h2 className="sr-only">The works</h2>

      <ul className="mt-14 space-y-12">
        {works.map((work) => (
          <li key={work.slug} className="border-t border-border pt-10 first:border-t-0 first:pt-0">
            <article>
              <h3 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                <Link
                  href={`/${work.slug}`}
                  className="rounded-sm hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {work.title}
                </Link>
              </h3>
              <p className="mt-2 text-lg text-foreground-secondary">{work.subtitle}</p>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
