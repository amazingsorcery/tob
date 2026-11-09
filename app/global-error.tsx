"use client";

/**
 * Errors thrown by the root layout. Renders its own <html>/<body> and can't rely on anything
 * the layout sets up (e.g. fonts), so it's kept plain.
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
