"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Move focus to the page heading after a client-side navigation.
 *
 * A React router replaces the document body without a page load, so the browser's own
 * behaviour — reset focus to the top of the new document — never happens. Focus stays on the
 * link that was clicked, that link unmounts, and focus falls back to `<body>`. A screen reader
 * user then hears nothing about having arrived somewhere new, and a keyboard user's next Tab
 * starts from the top of the page rather than from where they were reading.
 *
 * This renders nothing. It is a client component because there is no server-side equivalent
 * of "a navigation just happened", and it is the ONLY client component in the layout — the
 * header, the footer and every page below it stay server-rendered.
 */
export function RouteFocus() {
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  useEffect(() => {
    // On first paint the browser has already done the right thing. Stealing focus here would
    // scroll a reader who deep-linked to a section back to the top of the chapter.
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // Same reason: a link to `/three-lemmas/2-three-lemmas#23-the-zeros-lemma` is a request to
    // be at that section, not at the chapter heading.
    if (window.location.hash) return;

    const heading = document.querySelector<HTMLElement>("main h1");
    // `preventScroll` because Next has already restored or reset the scroll position, and
    // focusing an element the browser considers off-screen would undo that.
    heading?.focus({ preventScroll: true });
  }, [pathname]);

  return null;
}
