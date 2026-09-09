import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, Source_Serif_4 } from "next/font/google";

import { RouteFocus } from "@/components/route-focus";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { brand } from "@/config/brand";

import "./globals.css";

/**
 * THE FACES.
 *
 * The `-loaded` suffix is required and is not a naming preference: `app/tokens.css` defines
 * `--font-serif` as `var(--font-serif-loaded), ui-serif, …`. Handing next/font the token name
 * itself would make the token reference itself and lose its whole fallback stack.
 *
 * Source Serif 4 is the reading face. It is a variable font, so one file covers the regular,
 * the semibold that sets every theorem label, and everything between.
 *
 * IBM Plex Sans is interface chrome only — header, navigation, table cells, metadata. Prose
 * is the serif; the product around it is not.
 *
 * IBM Plex Mono is `preload: false` deliberately. Three code listings exist in the entire
 * corpus, on two pages out of thirty-three. Preloading a face for the other thirty-one is a
 * request a reader pays for and never uses; without the preload the browser fetches it only
 * when a `<code>` actually needs it.
 */
const serif = Source_Serif_4({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif-loaded",
});

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
  variable: "--font-sans-loaded",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  preload: false,
  variable: "--font-mono-loaded",
});

export const metadata: Metadata = {
  metadataBase: new URL(brand.url),
  title: {
    default: brand.name,
    template: `%s · ${brand.name}`,
  },
  description: brand.description,
  applicationName: brand.name,
  openGraph: {
    type: "website",
    siteName: brand.name,
    title: brand.name,
    description: brand.description,
    url: brand.url,
  },
  /*
   * The author is deliberately unset in `config/brand.ts`. An unattributed page is honest;
   * a page attributed to a placeholder is not, so the field is omitted entirely rather than
   * filled with something plausible.
   */
  ...(brand.authorKnown ? { authors: [{ name: brand.author }] } : {}),
};

export const viewport: Viewport = {
  /*
   * `--background` in the dark theme. Stated as a literal here because a <meta> tag cannot
   * read a custom property, and it is the same value tokens.css §1 gives `--slate-900`.
   * `app/theme-colour.test.ts` asserts the two agree.
   */
  themeColor: "#0b0f15",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} ${mono.variable}`}>
      <body className="min-h-dvh bg-background text-foreground antialiased">
        {/*
         * First thing in the tab order, hidden until focused. Without it, reaching a
         * 36,000-word chapter by keyboard means tabbing past the whole header on every
         * navigation.
         */}
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <RouteFocus />
        <div className="flex min-h-dvh flex-col">
          <SiteHeader />
          {/* `tabIndex` so the skip link actually moves focus here; without it the browser
              scrolls to the target and leaves focus in the header. */}
          <main id="main" tabIndex={-1} className="flex-1 outline-none">
            {children}
          </main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
