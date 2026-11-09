"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Moves focus to the page `h1` after client-side navigation, which otherwise leaves focus
 * on `<body>` and announces nothing to screen readers. Renders nothing.
 */
export function RouteFocus() {
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Skip the initial load; the browser already handles focus and deep links.
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // A hash link targets a section, not the heading.
    if (window.location.hash) return;

    const heading = document.querySelector<HTMLElement>("main h1");
    // Next has already set the scroll position.
    heading?.focus({ preventScroll: true });
  }, [pathname]);

  return null;
}
