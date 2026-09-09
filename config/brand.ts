/**
 * BRAND STRINGS — THE RENAMING CONTRACT
 *
 * Renaming this site must be a change to THIS FILE AND NO OTHER FILE. No component, route,
 * page title or test may contain the site's name as a literal; import it from here.
 *
 * The site is a personal collection of long-form academic work. `TITLE` is the site's name
 * and `AUTHOR` the pen name it is published under; changing either is this file alone.
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

  /**
   * The author's name. Empty until set, and the UI must render nothing rather than a
   * placeholder — an unattributed page is honest, a page attributed to "Author Name" is not.
   */
  author: AUTHOR,
  authorKnown: AUTHOR.length > 0,

  /**
   * Deliberately empty. The owner's direction: no taglines, as little explanation as
   * possible. The site is the name, the works and the author, and nothing that tells a
   * visitor what to make of them. The UI must render nothing here — not a placeholder,
   * not a fallback sentence.
   */
  tagline: "",
  hasTagline: false,

  /**
   * The meta description and social card. Kept to the bare attribution for the same
   * reason: a search snippet or a link preview should show the name and the author, not
   * a summary. Search engines that want more will draw one from the page.
   */
  description: `${TITLE} — ${AUTHOR}`,

  domain: DOMAIN,
  url: `https://${DOMAIN}`,


  /**
   * The licence the works are published under.
   *
   * The owner's direction: bots may use the work, and must always credit it. CC BY 4.0 is
   * exactly that — any use, commercial or not, on condition of attribution — and it is the
   * licence crawlers and AI systems actually parse, because it has a canonical URL. It is
   * expressed four ways so no reader, human or machine, can miss it: the footer credit,
   * JSON-LD on every work and chapter, a `<link rel="license">` in the document head, and
   * `/llms.txt`. Changing the licence is this block alone.
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
