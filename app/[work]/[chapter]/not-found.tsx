import { WorkList } from "@/components/work-list";

/**
 * Shown when the work exists but the chapter segment does not name one of its parts.
 *
 * It cannot say which work was asked for: a `not-found.tsx` receives no params — it is
 * rendered outside the segment that failed. Rather than guess, it points at the contents of
 * all three, where every chapter of every work is one click away.
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
