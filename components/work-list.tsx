import Link from "next/link";

import { allWorks } from "@/lib/works";

/** Compact list of every work, used by the not-found pages. */
export function WorkList({ headingId }: { headingId?: string }) {
  return (
    <ul aria-labelledby={headingId} className="mt-6 divide-y divide-border border-y border-border">
      {allWorks().map((work) => (
        <li key={work.slug}>
          <Link
            href={`/${work.slug}`}
            className="flex min-h-11 flex-col justify-center py-4 hover:bg-muted"
          >
            <span className="font-display text-lg font-semibold text-foreground">{work.title}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
