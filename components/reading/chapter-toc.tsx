"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Sticky table of contents that highlights the current section. Without JS it's a plain
 * list of links.
 *
 * Uses a rAF-throttled scroll listener rather than IntersectionObserver: the question is
 * "which heading did I last pass", and long sections often have no heading on screen.
 */

/** The "current position" line, just below the sticky header. */
const READING_LINE_PX = 120;

/** `heading` is a node typeset on the server (some contain maths), not a string. */
export interface TocEntry {
  readonly id: string;
  readonly heading: ReactNode;
}

export interface ChapterTocProps {
  readonly sections: readonly TocEntry[];
  readonly className?: string;
  /** Distinguishes this navigation landmark from the one in the mobile disclosure. */
  readonly label: string;
}

export function ChapterToc({ sections, className, label }: ChapterTocProps) {
  const [activeId, setActiveId] = useState<string | null>(sections[0]?.id ?? null);
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    if (sections.length === 0) return;
    const headings = sections.map((section) => document.getElementById(section.id));
    let frame = 0;

    const update = () => {
      frame = 0;
      let current = sections[0]?.id ?? null;
      for (const [index, heading] of headings.entries()) {
        if (heading && heading.getBoundingClientRect().top <= READING_LINE_PX) {
          current = sections[index]?.id ?? current;
        }
      }
      // At the bottom of the page, the last section is current.
      const atEnd =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8;
      if (atEnd) current = sections[sections.length - 1]?.id ?? current;
      setActiveId(current);
    };

    const onScroll = () => {
      if (frame === 0) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame !== 0) window.cancelAnimationFrame(frame);
    };
  }, [sections]);

  // Keep the active entry visible in the list. Uses `scrollTop` because `scrollIntoView`
  // would also scroll the page.
  useEffect(() => {
    const list = listRef.current;
    if (!list || activeId === null) return;
    const entry = list.querySelector<HTMLElement>(`[data-section="${CSS.escape(activeId)}"]`);
    if (!entry) return;
    const top = entry.offsetTop;
    const bottom = top + entry.offsetHeight;
    if (top < list.scrollTop) list.scrollTop = top;
    else if (bottom > list.scrollTop + list.clientHeight) {
      list.scrollTop = bottom - list.clientHeight;
    }
  }, [activeId]);

  if (sections.length === 0) return null;

  return (
    <nav aria-label={label} className={cn("toc-sticky", className)}>
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        On this page
      </p>
      <ol ref={listRef} className="mt-3 border-l border-border">
        {sections.map((section) => (
          <li key={section.id} data-section={section.id}>
            <a
              href={`#${section.id}`}
              aria-current={section.id === activeId ? "true" : undefined}
              // `block`, not `flex`: flex would split text and KaTeX spans into separate items.
              className="toc-link -ml-px block min-h-11 border-l-2 border-transparent py-3 pl-4 text-sm leading-snug text-muted-foreground hover:border-l-input hover:text-foreground-secondary"
            >
              {section.heading}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
