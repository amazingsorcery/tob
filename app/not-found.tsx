import { WorkList } from "@/components/work-list";

/**
 * Site-wide 404. Don't add a `loading.tsx` anywhere: it flushes a 200 before `notFound()`
 * can run.
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
