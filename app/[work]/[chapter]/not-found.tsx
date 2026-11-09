import { WorkList } from "@/components/work-list";

/**
 * Unknown chapter of a known work. `not-found.tsx` gets no params, so list all works'
 * contents instead of naming the work.
 */
export default function ChapterNotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
      <h1
        tabIndex={-1}
        className="font-display text-3xl font-semibold tracking-tight text-foreground"
      >
        No such chapter
      </h1>
      <p className="mt-4 text-lg text-foreground-secondary">
        That address does not name a chapter of this work. Its table of contents lists every
        chapter and every section.
      </p>
      <h2 id="contents-of" className="mt-12 font-display text-xl font-semibold text-foreground">
        Contents
      </h2>
      <WorkList headingId="contents-of" />
    </div>
  );
}
