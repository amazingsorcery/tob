"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * The sticky table of contents, with the reader's position in it.
 *
 * THE ONLY CLIENT COMPONENT ON THE READING SURFACE, and the only one that needs to be: where
 * the reader has got to is a fact about the scroll position, which the server cannot know.
 * Everything else on a chapter page — the prose, the mathematics, the tables, the navigation —
 * is rendered on the server and shipped as HTML.
 *
 * It degrades honestly. Without JavaScript this is a plain list of working links; the only
 * thing lost is the highlight.
 *
 * A scroll listener rather than an IntersectionObserver. The question is not "which headings
 * are on screen" — in a chapter with a 900-word section there are often none — it is "which
 * heading did I last pass", and that is a comparison against a line near the top of the
 * viewport. An observer answers the first question and has to be coaxed into answering the
 * second with rootMargin arithmetic that breaks the moment a section is shorter than the
 * viewport. The listener is throttled to one animation frame, which is as often as the screen
 * can change anyway.
 */

/** Where the "you are here" line sits: just below the 3.5rem sticky header. */
const READING_LINE_PX = 120;

/**
 * One entry. `heading` is a React node, not a string, because eleven section headings in this
 * corpus contain mathematics and it has to be typeset on the SERVER — a Client Component
 * cannot run KaTeX without shipping KaTeX. The page renders each heading with
 * `components/reading/inline-markdown.tsx` and hands the finished element down as a prop,
 * which React Server Components support and which keeps this file's job to one thing: which
 * entry is current.
 */
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
      // At the very foot of the document the last section is the one being read, even though
      // its heading passed the line long ago and a shorter one may have followed it.
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

  /*
   * Keep the highlighted entry visible inside the list's own scroll box. Written against
   * `scrollTop` rather than `scrollIntoView` because that method walks up the ancestor chain
   * and will move the page as well — which would fight the reader for control of the scroll
   * position, the one thing a reading surface must never do.
   */
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
              // `aria-current` and not colour alone: the border rail changes with it, so the
              // reader's position survives a monochrome screen and a screen reader both.
              aria-current={section.id === activeId ? "true" : undefined}
              // `block`, NOT `flex`. A flex container turns a link's text node and the <span>
              // KaTeX produces into two separate flex items: the space between them
              // disappears and a long heading wraps beside its own mathematics instead of
              // around it. Padding reaches the 44px target without changing the layout mode.
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
