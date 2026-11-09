/**
 * Brand strings. Renaming the site or author is a change to this file only; nothing else
 * should hardcode them.
 */

/* ------------------------------------------------------------------ *
 * The only lines that change on a rename
 * ------------------------------------------------------------------ */

const TITLE = "TOB";
const DOMAIN = "wrath.rip";
const AUTHOR = "Iris Mnemon";

/* ------------------------------------------------------------------ */

export const brand = {
  /** Shown in the header, the browser tab and social cards. */
  name: TITLE,

  /** Author name. If empty, the UI renders nothing (no placeholder). */
  author: AUTHOR,
  authorKnown: AUTHOR.length > 0,

  /** Empty by design: no tagline. The UI renders nothing, not a fallback. */
  tagline: "",
  hasTagline: false,

  /** Meta description and social card: just name and author, no summary. */
  description: `${TITLE} — ${AUTHOR}`,

  domain: DOMAIN,
  url: `https://${DOMAIN}`,


  /**
   * Licence for the works: any use, with attribution. Surfaced in the footer, JSON-LD,
   * `<link rel="license">` and `/llms.txt`.
   */
  licence: {
    name: "CC BY 4.0",
    fullName: "Creative Commons Attribution 4.0 International",
    url: "https://creativecommons.org/licenses/by/4.0/",
    /** The credit a reuser must give. Author, then the work's own title where applicable. */
    creditLine: `${AUTHOR}, licensed CC BY 4.0`,
  },
} as const;

export type Brand = typeof brand;

export default brand;
