import { WorkList } from "@/components/work-list";

/**
 * The site-wide 404.
 *
 * There is no `loading.tsx` anywhere in this tree, and that is what keeps the status code
 * honest: a loading boundary at or above a segment flushes the response — committing HTTP 200
 * — before the page underneath can call `notFound()`. The page then renders as a 404 and the
 * server reports success, which a browser hides and every crawler believes.
 */
export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
      <h1
        tabIndex={-1}
        className="font-display text-3xl font-semibold tracking-tight text-foreground"
      >
        That page is not here
      </h1>
      <p className="mt-4 text-lg text-foreground-secondary">
        The address does not match anything on this site. It may have been mistyped, or it may
        be a link to a page that never existed.
      </p>
      <h2 id="everything" className="mt-12 font-display text-xl font-semibold text-foreground">
        Everything that is here
      </h2>
      <WorkList headingId="everything" />
    </div>
  );
}
