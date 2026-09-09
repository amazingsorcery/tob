"use client";

/**
 * The last resort: an error thrown by the root layout itself, before there is a <body> to put
 * `app/error.tsx` inside. It therefore has to render its own <html> and <body>, and it cannot
 * rely on anything the layout would have set up — including the fonts, which is why this file
 * names no font variable and no token that the base stylesheet does not already apply.
 *
 * It replaces the whole document, so it is deliberately plain. If this renders, something is
 * broken badly enough that a well-typeset apology would be the wrong priority.
 */
export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground">
        <main className="mx-auto max-w-3xl px-4 py-20">
          <h1 className="text-3xl font-semibold tracking-tight">Something went wrong</h1>
          <p className="mt-4 text-lg text-foreground-secondary">
            The site could not be rendered. Reloading the page is worth trying.
          </p>
          {error.digest ? (
            <p className="mt-4 text-sm text-muted-foreground">Reference: {error.digest}</p>
          ) : null}
        </main>
      </body>
    </html>
  );
}
