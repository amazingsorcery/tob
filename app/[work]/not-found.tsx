import { WorkList } from "@/components/work-list";

/** Shown when the first path segment does not name one of the works. */
export default function WorkNotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
      <h1
        tabIndex={-1}
        className="font-display text-3xl font-semibold tracking-tight text-foreground"
      >
        No such work
      </h1>
      <p className="mt-4 text-lg text-foreground-secondary">
        This site holds three long-form works, and the address does not name any of them.
      </p>
      <h2 id="the-works" className="mt-12 font-display text-xl font-semibold text-foreground">
        The three works
      </h2>
      <WorkList headingId="the-works" />
    </div>
  );
}
