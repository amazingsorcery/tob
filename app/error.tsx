"use client";

import { useEffect } from "react";

/** Route error boundary (must be a client component). */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // The digest links to the server-side stack, which Next doesn't send to the browser.
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
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- Full page load so
            the broken React tree isn't reused. */}
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
