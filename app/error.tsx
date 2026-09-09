"use client";

import { useEffect } from "react";

/**
 * The error boundary for every route below it.
 *
 * `"use client"` is not a choice here: React requires an error boundary to be a client
 * component, because the reset callback runs in the browser. It is the only such file in the
 * app and it wraps nothing that renders on a healthy page.
 *
 * On a site whose pages are all static Markdown there is very little that can throw at
 * request time, which is exactly why this exists: whatever does throw will be something
 * nobody predicted, and the alternative to a boundary is an unstyled stack trace.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // The digest is the only handle on the server-side stack, which Next deliberately does
    // not send to the browser. Logging it is what makes a production report actionable.
    console.error("Unhandled error rendering a page", error.digest ?? error.message);
  }, [error]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
      <h1
        tabIndex={-1}
        className="font-display text-3xl font-semibold tracking-tight text-foreground"
      >
        Something went wrong
      </h1>
      <p className="mt-4 text-lg text-foreground-secondary">
        This page could not be rendered. Nothing you did caused it, and nothing was lost.
      </p>
      {error.digest ? (
        <p className="mt-4 text-sm text-muted-foreground">
          <span>Reference: </span>
          <code className="font-mono">{error.digest}</code>
        </p>
      ) : null}
      <div className="mt-8 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={reset}
          className="inline-flex min-h-11 items-center rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground hover:bg-primary-hover"
        >
          Try again
        </button>
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- Deliberate full
            page load. A soft navigation from inside an error boundary re-renders the same
            broken React tree, and the whole value of this link is that it starts over. */}
        <a
          href="/"
          className="inline-flex min-h-11 items-center rounded-md border border-input px-5 text-sm font-medium text-foreground hover:bg-muted"
        >
          Go to the list of works
        </a>
      </div>
    </div>
  );
}
